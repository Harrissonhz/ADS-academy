(function(){
  'use strict';

  function createElementFromHTML(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
  }

  function formatPriceCop(value) {
    const numeric = typeof value === 'number' ? value : 0;
    return `$${numeric.toLocaleString('es-CO')} COP`;
  }

  function getLoginUrlForCourse(course) {
    const code = course.codigo || course.slug || course.id;
    return `login.html?curso=${encodeURIComponent(code)}`;
  }

  function pickFeatured(cursos) {
    // Estrategia simple: tomar los 3 primeros, o por portada disponible
    return cursos.slice(0, 3);
  }

  function renderFeatured(data) {
    const grid = document.getElementById('featured-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const cursos = Array.isArray(data && data.cursos) ? data.cursos : [];
    const destacados = pickFeatured(cursos);
    destacados.forEach(curso => {
      const badgeLabel = (curso && curso.badgeLabel) ? curso.badgeLabel : 'En Construcción';
      const badge = (curso && (curso.badgeClass || (badgeLabel === 'En Construcción' ? 'bg-danger' : 'bg-primary')));
      const priceText = formatPriceCop(curso.precio || 0);
      const card = createElementFromHTML(
        '<div class="col-md-4">\
           <div class="card">\
             <img src="' + (curso.portada || 'img/Educacion.jpg') + '" class="card-img-top" alt="' + (curso.titulo || '') + '">\
             <div class="card-body">\
               <h5 class="card-title">' + (curso.titulo || '') + '</h5>\
               <div class="text-start mb-2"><span class="fw-bold">' + priceText + '</span></div>\
               <p class="card-text">' + (curso.descripcion || '') + '</p>\
              <div class="d-flex justify-content-between align-items-center">\
                <span class="badge ' + badge + '">' + badgeLabel + '</span>\
                 <a href="' + getLoginUrlForCourse(curso) + '" class="btn btn-outline-primary">Iniciar Curso</a>\
               </div>\
             </div>\
           </div>\
         </div>'
      );
      grid.appendChild(card);
    });
  }

  function init(){
    if (window.CURSOS_DATA && Array.isArray(window.CURSOS_DATA.cursos)) {
      renderFeatured(window.CURSOS_DATA);
    } else {
      fetch('data/cursos.json', { cache: 'no-cache' })
        .then(r => r.ok ? r.json() : { cursos: [] })
        .then(renderFeatured)
        .catch(() => renderFeatured({ cursos: [] }));
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();


