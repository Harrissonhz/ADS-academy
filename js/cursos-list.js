(function() {
  'use strict';

  function createElementFromHTML(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
  }

  function formatPriceCop(value) {
    const numeric = typeof value === 'number' ? value : 50000; // fallback simple
    return `$${numeric.toLocaleString('es-CO')} COP`;
  }

  function getCourseUrl(course) {
    const codeFirst = course.codigo || course.slug || course.id;
    return `login.html?curso=${encodeURIComponent(codeFirst)}`;
  }

  function getDetailUrl(course) {
    const slugOrId = course.slug || course.id || course.codigo;
    return `curso-detalle.html?curso=${encodeURIComponent(slugOrId)}`;
  }

  function renderCourses(data) {
    const grid = document.getElementById('courses-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const cursos = Array.isArray(data && data.cursos) ? data.cursos : [];
    cursos.forEach((curso) => {
      const priceValue = (typeof curso.precio === 'number') ? curso.precio : 50000;
      const priceText = formatPriceCop(priceValue);
      const badgeLabel = (curso && curso.badgeLabel) ? curso.badgeLabel : 'En Construcción';
      const badgeClass = (curso && (curso.badgeClass || (badgeLabel === 'En Construcción' ? 'bg-danger' : 'bg-primary')));
      const card = createElementFromHTML(
        '<div class="col-md-4">\
           <div class="card">\
             <div class="position-relative">\
               <img src="' + (curso.portada || 'img/Educacion.jpg') + '" class="card-img-top" alt="' + (curso.titulo || '') + '">\
               <span class="badge ' + badgeClass + ' position-absolute top-0 start-0 m-2">' + badgeLabel + '</span>\
             </div>\
             <div class="card-body">\
               <h5 class="card-title">' + (curso.titulo || '') + '</h5>\
               <p class="card-text">' + (curso.descripcion || '') + '</p>\
               <div class="text-center mb-3">\
                 <h5 class="fw-bold">' + priceText + '</h5>\
               </div>\
               <div class="d-flex justify-content-center">\
                 <div class="d-flex gap-2" data-codigo="' + (curso.codigo || '') + '">\
                   <a href="' + getCourseUrl(curso) + '" class="btn btn-outline-primary">Ingresar</a>\
                   <button class="btn btn-primary" data-action="add-to-cart">Agregar al Carrito</button>\
                 </div>\
               </div>\
             </div>\
           </div>\
         </div>'
      );
      // Hook de carrito inline (compatible con cart.js que liga por texto)
      // No agregar listener aquí; cart.js maneja por delegación (data-action="add-to-cart")
      grid.appendChild(card);
    });
  }

  function init() {
    if (window.CURSOS_DATA && Array.isArray(window.CURSOS_DATA.cursos)) {
      renderCourses(window.CURSOS_DATA);
    } else {
      // Fallback: intentar fetch cuando no hay datos embebidos
      fetch('data/cursos.json', { cache: 'no-cache' })
        .then(r => r.ok ? r.json() : { cursos: [] })
        .then(renderCourses)
        .catch(() => renderCourses({ cursos: [] }));
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();


