(function(){
  'use strict';

  function getStoredJson(key, fallback){
    try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; } catch(e){ return fallback; }
  }

  const AuthUtils = {
    isLoggedIn: function(){ return localStorage.getItem('isLoggedIn') === 'true'; },
    getUser: function(){
      return {
        name: localStorage.getItem('userName') || '',
        cursosPermitidos: getStoredJson('cursosPermitidos', [])
      };
    },
    saveSession: function(user){
      localStorage.setItem('isLoggedIn','true');
      if (user && user.nombre) localStorage.setItem('userName', user.nombre);
      if (user && Array.isArray(user.cursosPermitidos)) {
        localStorage.setItem('cursosPermitidos', JSON.stringify(user.cursosPermitidos));
      }
    },
    logout: function(){
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userName');
      localStorage.removeItem('cursosPermitidos');
      window.location.href = 'index.html';
    },
    requireAuthForCourse: function(cursoCodigo){
      if (!cursoCodigo) return true; // si no hay curso, no forzar
      if (!this.isLoggedIn()) {
        window.location.href = 'login.html?curso=' + encodeURIComponent(cursoCodigo);
        return false;
      }
      const user = this.getUser();
      if (Array.isArray(user.cursosPermitidos) && user.cursosPermitidos.length > 0) {
        if (!user.cursosPermitidos.includes(cursoCodigo)) {
          alert('No tienes permisos para este curso.');
          window.location.href = 'cursos.html';
          return false;
        }
      }
      return true;
    }
  };

  window.AuthUtils = AuthUtils;
})();


