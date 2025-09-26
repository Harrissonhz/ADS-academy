(function() {
  'use strict';

  function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  function createElementFromHTML(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
  }

  // --- Progreso por usuario en localStorage ---
  function getUserProgressStoreKey() {
    const user = (localStorage.getItem('userName') || 'anon').trim() || 'anon';
    return 'progress:' + user;
  }

  function loadProgress() {
    try {
      const raw = localStorage.getItem(getUserProgressStoreKey());
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveProgress(store) {
    try {
      localStorage.setItem(getUserProgressStoreKey(), JSON.stringify(store || {}));
    } catch (e) {
      // ignore
    }
  }

  function markLessonCompleted(courseId, lessonId) {
    if (!courseId || !lessonId) return;
    const store = loadProgress();
    if (!store[courseId]) store[courseId] = { completedLessonIds: [] };
    const arr = store[courseId].completedLessonIds;
    if (!arr.includes(lessonId)) arr.push(lessonId);
    saveProgress(store);
  }

  function getCompletedLessonsForCourse(courseId) {
    const store = loadProgress();
    const arr = (store[courseId] && Array.isArray(store[courseId].completedLessonIds)) ? store[courseId].completedLessonIds : [];
    return arr;
  }

  function computeCourseProgressPercent(curso) {
    const allLessons = [];
    (curso.modulos || []).forEach(m => (m.lecciones || []).forEach(lec => allLessons.push(lec.id)));
    const total = allLessons.length || 1;
    const completed = getCompletedLessonsForCourse(curso.id).filter(id => allLessons.includes(id));
    const pct = Math.round((completed.length / total) * 100);
    return Math.max(0, Math.min(100, pct));
  }

  async function fetchCursos() {
    // Modo estático: si existen datos embebidos, usarlos
    if (window.CURSOS_DATA && Array.isArray(window.CURSOS_DATA.cursos)) {
      return window.CURSOS_DATA;
    }
    // Fallback: intentar fetch (útil si se sirve por HTTP)
    const response = await fetch('data/cursos.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error('No se pudo cargar cursos.json');
    return await response.json();
  }

  function encontrarCurso(data, idOrSlugOrCodigo) {
    if (!idOrSlugOrCodigo) return null;
    return data.cursos.find(c => c.id === idOrSlugOrCodigo || c.slug === idOrSlugOrCodigo || c.codigo === idOrSlugOrCodigo) || null;
  }

  function renderHeader(curso) {
    document.getElementById('curso-titulo').textContent = curso.titulo;
    document.getElementById('curso-descripcion').textContent = curso.descripcion || '';
    const progreso = computeCourseProgressPercent(curso);
    document.getElementById('curso-progreso').style.width = progreso + '%';
    document.getElementById('curso-progreso-text').textContent = progreso + '% Completado';
    const cta = document.getElementById('curso-cta');
    cta.textContent = (curso.cta && curso.cta.texto) ? curso.cta.texto : 'Continuar Curso';
    cta.addEventListener('click', function() {
      // Ir a la primera lección disponible
      const primera = obtenerPrimeraLeccionId(curso);
      if (primera) navegarALeccion(curso.id, primera);
    });
  }

  function obtenerPrimeraLeccionId(curso) {
    for (const modulo of (curso.modulos || [])) {
      if (modulo.lecciones && modulo.lecciones.length > 0) {
        return modulo.lecciones[0].id;
      }
    }
    return null;
  }

  function renderSidebar(curso, leccionActualId) {
    const contenedor = document.getElementById('sidebar-contenido');
    contenedor.innerHTML = '';
    (curso.modulos || []).forEach(modulo => {
      const moduloEl = createElementFromHTML(
        '<div class="module-item">\
           <div class="fw-semibold"><i class="fas fa-play-circle me-2"></i>' + modulo.titulo + '</div>\
           <div class="module-content">\
             <ul class="list-unstyled ms-4 mt-2" data-modulo-id="' + modulo.id + '"></ul>\
           </div>\
         </div>'
      );
      contenedor.appendChild(moduloEl);
      const ul = moduloEl.querySelector('ul');
      (modulo.lecciones || []).forEach(lec => {
        const icon = lec.tipo === 'quiz' ? 'fa-question-circle text-warning' : 'fa-video text-primary';
        const a = createElementFromHTML(
          '<li><i class="fas ' + icon + ' me-2"></i><a href="#" class="text-decoration-none text-dark" data-leccion-id="' + lec.id + '">' + lec.titulo + '</a></li>'
        );
        if (lec.id === leccionActualId) {
          a.querySelector('a').classList.add('fw-bold');
        }
        a.querySelector('a').addEventListener('click', function(e) {
          e.preventDefault();
          navegarALeccion(curso.id, lec.id);
        });
        ul.appendChild(a);
      });
    });
  }

  function navegarALeccion(cursoId, leccionId) {
    const url = new URL(window.location.href);
    url.searchParams.set('id', cursoId);
    url.searchParams.set('leccion', leccionId);
    window.history.pushState({}, '', url.toString());
    // Re-render
    inicializar();
  }

  function renderVideo(leccion) {
    const cont = document.getElementById('contenedor-leccion');
    cont.innerHTML = '';
    // Detectar proveedor de video (YouTube / Dailymotion / URL)
    function parseVideo(lecc) {
      // Prioridades explícitas
      if (lecc.youtubeId) {
        return { provider: 'youtube', id: lecc.youtubeId };
      }
      if (lecc.dailymotionId) {
        return { provider: 'dailymotion', id: lecc.dailymotionId };
      }
      const url = lecc.videoUrl || '';
      if (url.includes('youtu.be/') || url.includes('youtube.com')) {
        // Extraer id de YouTube
        try {
          let id = '';
          if (url.includes('v=')) { id = new URL(url).searchParams.get('v') || ''; }
          else { id = url.split('/').pop() || ''; }
          id = id.replace(/[^a-zA-Z0-9_-]/g, '');
          if (id) return { provider: 'youtube', id };
        } catch (e) {}
      }
      if (url.includes('geo.dailymotion.com/player.html')) {
        // Formato: https://geo.dailymotion.com/player.html?video=<ID>
        try {
          const u = new URL(url);
          const idParam = u.searchParams.get('video') || '';
          const id = (idParam || '').replace(/[^a-zA-Z0-9]/g, '');
          if (id) return { provider: 'dailymotion', id };
        } catch (e) {}
      }
      if (url.includes('dailymotion.com/video/') || url.includes('dai.ly/')) {
        // Extraer id de Dailymotion
        try {
          let id = '';
          if (url.includes('dailymotion.com/video/')) {
            id = url.split('dailymotion.com/video/')[1].split(/[?_#]/)[0];
          } else {
            id = url.split('dai.ly/')[1].split(/[?_#]/)[0];
          }
          id = id.replace(/[^a-zA-Z0-9]/g, '');
          if (id) return { provider: 'dailymotion', id };
        } catch (e) {}
      }
      return { provider: 'unknown', id: '', url: url };
    }
    const video = parseVideo(leccion);
    const thumbUrl = (video.provider === 'youtube')
      ? ('https://img.youtube.com/vi/' + video.id + '/maxresdefault.jpg')
      : (video.provider === 'dailymotion')
        ? ('https://www.dailymotion.com/thumbnail/video/' + video.id)
        : 'img/Educacion.jpg';
    const embedBase = (video.provider === 'youtube')
      ? ('https://www.youtube.com/embed/' + video.id + '?autoplay=1&origin=' + window.location.origin)
      : (video.provider === 'dailymotion')
        ? ('https://www.dailymotion.com/embed/video/' + video.id + '?autoplay=1')
        : (video.url ? video.url : 'about:blank');
    const videoHtml =
      '<div class="video-section">\
         <h2>' + leccion.titulo + '</h2>\
         <div class="video-container">\
           <div id="thumb-' + leccion.id + '" style="position:absolute;top:0;left:0;width:100%;height:100%;cursor:pointer;background-image:url(\'' + thumbUrl + '\');background-size:cover;background-position:center;">\
             <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);">\
               <i class="fas fa-play-circle" style="font-size:64px;color:white;text-shadow:2px 2px 4px rgba(0,0,0,0.5);"></i>\
             </div>\
           </div>\
           <iframe id="iframe-' + leccion.id + '" style="position:absolute;top:0;left:0;width:100%;height:100%;display:none;" src="about:blank" title="' + leccion.titulo + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\
         </div>\
         <h4 class="mt-3">Descripción</h4>\
         <p>' + (leccion.descripcion || '') + '</p>\
         <div class="d-flex justify-content-center gap-2 mt-3 mb-3">\
           <button class="btn btn-outline-primary" id="btn-anterior"><i class=\"fas fa-arrow-left me-2\"></i>Anterior</button>\
           <button class="btn btn-primary" id="btn-siguiente">Siguiente<i class=\"fas fa-arrow-right ms-2\"></i></button>\
         </div>\
         <div id="recursos-container" class="resources-section mt-4"></div>\
       </div>';
    cont.appendChild(createElementFromHTML(videoHtml));
    const thumb = document.getElementById('thumb-' + leccion.id);
    const iframe = document.getElementById('iframe-' + leccion.id);
    if (thumb && iframe) {
      thumb.addEventListener('click', function() {
        thumb.style.display = 'none';
        iframe.style.display = 'block';
        iframe.src = embedBase;
        // Marcar esta lección como completada al iniciar reproducción
        try {
          const id = getQueryParam('id') || getQueryParam('curso');
          if (id) markLessonCompleted(id, leccion.id);
        } catch (e) {}
      });
    }
    renderRecursos(leccion);
  }

  function renderRecursos(leccion) {
    const recursos = leccion.recursos || [];
    if (!recursos.length) return;
    const container = document.getElementById('recursos-container');
    if (!container) return;
    const list = document.createElement('div');
    list.className = 'resources-list';
    const grupos = [
      { id: 'archivos', icon: 'fa-file-code', titulo: 'Ejemplos y Archivos', filtro: r => r.tipo === 'archivo' },
      { id: 'enlaces', icon: 'fa-link', titulo: 'Enlaces de Referencia', filtro: r => r.tipo === 'link' }
    ];
    grupos.forEach(g => {
      const items = recursos.filter(g.filtro);
      if (!items.length) return;
      const block = createElementFromHTML(
        '<div class="resource-item mt-3">\
           <div class="resource-header" data-bs-toggle="collapse" data-bs-target="#rec-' + g.id + '">\
             <i class="fas ' + g.icon + ' me-2"></i>' + g.titulo + '\
             <i class="fas fa-chevron-down float-end"></i>\
           </div>\
           <div class="collapse" id="rec-' + g.id + '">\
             <div class="resource-content p-3"></div>\
           </div>\
         </div>'
      );
      const content = block.querySelector('.resource-content');
      items.forEach(it => {
        if (it.tipo === 'archivo') {
          const a = createElementFromHTML('<a href="#" class="btn btn-outline-primary btn-sm me-2 mb-2"><i class="fas fa-download me-2"></i>' + it.nombre + '</a>');
          a.addEventListener('click', function(e) {
            e.preventDefault();
            descargarArchivo(it.ruta, it.nombre);
          });
          content.appendChild(a);
        } else if (it.tipo === 'link') {
          const a = createElementFromHTML('<a class="btn btn-outline-primary btn-sm me-2 mb-2" target="_blank"><i class="fas fa-external-link-alt me-2"></i>' + it.nombre + '</a>');
          a.href = it.url;
          content.appendChild(a);
        }
      });
      list.appendChild(block);
    });
    container.appendChild(list);
  }

  function descargarArchivo(ruta, nombre) {
    const link = document.createElement('a');
    link.href = ruta;
    link.download = nombre || '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function renderQuiz(leccion, curso) {
    const cont = document.getElementById('contenedor-leccion');
    cont.innerHTML = '';
    const preguntas = leccion.preguntas || [];
    const quizHtml =
      '<div class="quiz-section">\
         <div class="quiz-image mb-4">\
           <img src="img/Quiz.jpg" alt="Quiz" class="img-fluid rounded">\
         </div>\
         <div class="quiz-instructions mb-4">\
           <p class="lead text-center">\
             <i class="fas fa-info-circle me-2 text-primary"></i>Este quiz consta de ' + preguntas.length + ' preguntas de opción múltiple.\
           </p>\
         </div>\
         <div class="d-flex justify-content-center gap-2 mt-2 mb-3">\
           <button class="btn btn-outline-primary" id="btn-anterior-quiz"><i class=\"fas fa-arrow-left me-2\"></i>Anterior</button>\
           <button class="btn btn-primary" id="btn-siguiente-quiz">Siguiente<i class=\"fas fa-arrow-right ms-2\"></i></button>\
         </div>\
         <div class="quiz-container mt-3" id="quiz-container"></div>\
         <div class="text-center mt-3">\
           <button class="btn btn-primary" id="btn-enviar">Enviar Respuestas</button>\
         </div>\
       </div>';
    cont.appendChild(createElementFromHTML(quizHtml));
    const container = document.getElementById('quiz-container');
    preguntas.forEach((p, idx) => {
      const q = createElementFromHTML(
        '<div class="quiz-question mb-4">\
           <p class="fw-bold">' + (idx + 1) + '. ' + p.enunciado + '</p>\
           <div class="quiz-options" data-index="' + idx + '"></div>\
         </div>'
      );
      const opts = q.querySelector('.quiz-options');
      p.opciones.forEach((opt, i) => {
        const optEl = createElementFromHTML(
          '<div class="form-check mb-2">\
             <input class="form-check-input" type="radio" name="q-' + idx + '" id="q' + idx + '-opt' + i + '" value="' + i + '">\
             <label class="form-check-label" for="q' + idx + '-opt' + i + '">' + opt + '</label>\
           </div>'
        );
        opts.appendChild(optEl);
      });
      container.appendChild(q);
    });
    document.getElementById('btn-enviar').addEventListener('click', function() {
      verificarRespuestasGenerico(preguntas, curso, leccion.id);
    });
  }

  function verificarRespuestasGenerico(preguntas, cursoOpt, leccionIdOpt) {
    const seleccionadas = preguntas.map((_, idx) => {
      const checked = document.querySelector('input[name="q-' + idx + '"]:checked');
      return checked ? parseInt(checked.value, 10) : -1;
    });
    let correctas = 0;
    preguntas.forEach((p, i) => {
      if (seleccionadas[i] === p.correcta) correctas++;
    });
    const total = preguntas.length;
    Swal.fire({
      icon: 'info',
      title: 'Resultados',
      html: 'Tu puntaje: <b>' + correctas + '</b> de <b>' + total + '</b>',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      if (total > 0 && correctas === total && cursoOpt && leccionIdOpt) {
        try {
          // Marcar quiz como completado
          markLessonCompleted(cursoOpt.id, leccionIdOpt);
          const orden = [];
          (cursoOpt.modulos || []).forEach(m => (m.lecciones || []).forEach(lec => orden.push(lec.id)));
          const idx = orden.indexOf(leccionIdOpt);
          const nextId = idx >= 0 && idx < orden.length - 1 ? orden[idx + 1] : null;
          if (nextId) {
            navegarALeccion(cursoOpt.id, nextId);
          }
        } catch (e) {
          console.error('No fue posible avanzar a la siguiente lección', e);
        }
      }
    });
  }

  function renderLeccion(curso, leccionId) {
    // encontrar la lección
    let elegida = null;
    for (const modulo of (curso.modulos || [])) {
      const l = (modulo.lecciones || []).find(x => x.id === leccionId);
      if (l) { elegida = l; break; }
    }
    if (!elegida) {
      // fallback a primera
      const primera = obtenerPrimeraLeccionId(curso);
      if (primera) navegarALeccion(curso.id, primera);
      return;
    }
    // render según tipo
    if (elegida.tipo === 'video') {
      renderVideo(elegida);
    } else if (elegida.tipo === 'quiz') {
      renderQuiz(elegida, curso);
    } else {
      const cont = document.getElementById('contenedor-leccion');
      cont.innerHTML = '<h2>' + elegida.titulo + '</h2><p>' + (elegida.descripcion || '') + '</p>';
      const nav = createElementFromHTML(
        '<div class="d-flex justify-content-center gap-2 mt-3 mb-3">\
           <button class="btn btn-outline-primary" id="btn-anterior-generic"><i class=\"fas fa-arrow-left me-2\"></i>Anterior</button>\
           <button class="btn btn-primary" id="btn-siguiente-generic">Siguiente<i class=\"fas fa-arrow-right ms-2\"></i></button>\
         </div>'
      );
      cont.appendChild(nav);
    }
    renderSidebar(curso, elegida.id);

    // Enlazar navegación Anterior/Siguiente
    try {
      const orden = [];
      (curso.modulos || []).forEach(m => (m.lecciones || []).forEach(lec => orden.push(lec.id)));
      const idx = orden.indexOf(leccionId);
      const prevId = idx > 0 ? orden[idx - 1] : null;
      const nextId = idx >= 0 && idx < orden.length - 1 ? orden[idx + 1] : null;

      const bind = (btnId, targetId) => {
        const btn = document.getElementById(btnId);
        if (!btn) return;
        if (!targetId) {
          btn.disabled = true;
          btn.classList.add('disabled');
          return;
        }
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          navegarALeccion(curso.id, targetId);
        });
      };

      // Video
      bind('btn-anterior', prevId);
      bind('btn-siguiente', nextId);
      // Quiz
      bind('btn-anterior-quiz', prevId);
      bind('btn-siguiente-quiz', nextId);
      // Genérico
      bind('btn-anterior-generic', prevId);
      bind('btn-siguiente-generic', nextId);

      // Actualizar visualmente el progreso tras cualquier acción de navegación/entrada
      try {
        const pct = computeCourseProgressPercent(curso);
        document.getElementById('curso-progreso').style.width = pct + '%';
        document.getElementById('curso-progreso-text').textContent = pct + '% Completado';
      } catch (e) {}
    } catch (e) {
      console.error('Error al enlazar navegación de lecciones', e);
    }
  }

  async function inicializar() {
    try {
      const id = getQueryParam('id') || getQueryParam('curso');
      const lec = getQueryParam('leccion');
      const data = await fetchCursos();
      const curso = encontrarCurso(data, id);
      if (!curso) {
        document.getElementById('curso-titulo').textContent = 'Curso no encontrado';
        document.getElementById('contenedor-leccion').innerHTML = '<p>No se encontró el curso solicitado.</p>';
        return;
      }
      // Guard de autenticación/permisos si está disponible
      if (window.AuthUtils) {
        const ok = window.AuthUtils.requireAuthForCourse(curso.codigo || curso.id || curso.slug);
        if (!ok) return;
      }
      renderHeader(curso);
      const leccionId = lec || obtenerPrimeraLeccionId(curso);
      renderLeccion(curso, leccionId);
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo cargar el curso.' });
    }
  }

  window.addEventListener('popstate', inicializar);
  document.addEventListener('DOMContentLoaded', inicializar);
})();


