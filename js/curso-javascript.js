// Variables globales
let leccionActual = 'queEsJavaScript';
let progresoCurso = 0;

// Inicializar el comportamiento de colapso/expansión de módulos
document.addEventListener('DOMContentLoaded', function() {
    const moduleItems = document.querySelectorAll('.module-item');
    
    moduleItems.forEach(item => {
        const moduleTitle = item.querySelector('a');
        if (moduleTitle) {
            moduleTitle.addEventListener('click', function(e) {
                e.preventDefault();
                const isActive = item.classList.contains('active');
                
                // Cerrar todos los módulos
                moduleItems.forEach(mod => mod.classList.remove('active'));
                
                // Si el módulo no estaba activo, lo activamos
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Inicializar el progreso al cargar la página
    actualizarProgreso();
});

// Función para mostrar el contenido de una lección específica
function mostrarContenido(idContenido) {
    // Ocultar todos los contenidos de lecciones
    const lecciones = document.querySelectorAll('.lesson-content');
    lecciones.forEach(leccion => {
        leccion.style.display = 'none';
    });

    // Mostrar el contenido seleccionado
    const contenidoSeleccionado = document.getElementById(idContenido);
    if (contenidoSeleccionado) {
        contenidoSeleccionado.style.display = 'block';
    }
}

// Función para actualizar el módulo activo en el sidebar
function actualizarModuloActivo() {
    document.querySelectorAll('.module-item').forEach(modulo => {
        modulo.classList.remove('active');
    });

    const moduloContenedor = document.querySelector(`.module-content a[onclick*="${leccionActual}"]`).closest('.module-item');
    if (moduloContenedor) {
        moduloContenedor.classList.add('active');
    }
}

// Función para navegar entre lecciones
function navegarLeccion(direccion) {
    // Obtener todas las lecciones
    const lecciones = Array.from(document.querySelectorAll('.lesson-content'));
    
    // Encontrar la lección actual (la que está visible)
    const leccionActual = lecciones.find(leccion => leccion.style.display === 'block');
    
    if (!leccionActual) return;
    
    // Obtener el índice de la lección actual
    const indiceActual = lecciones.indexOf(leccionActual);
    
    // Calcular el nuevo índice
    let nuevoIndice;
    if (direccion === 'siguiente') {
        nuevoIndice = indiceActual + 1;
    } else if (direccion === 'anterior') {
        nuevoIndice = indiceActual - 1;
    }
    
    // Verificar que el nuevo índice sea válido
    if (nuevoIndice >= 0 && nuevoIndice < lecciones.length) {
        // Ocultar la lección actual
        leccionActual.style.display = 'none';
        
        // Mostrar la nueva lección
        lecciones[nuevoIndice].style.display = 'block';
    }
}

// Función para actualizar el progreso del curso
function actualizarProgreso() {
    const barraProgreso = document.querySelector('.progress-bar-fill');
    if (barraProgreso) {
        barraProgreso.style.width = '28%';
    }
    
    const textoProgreso = document.querySelector('.progress-bar + span');
    if (textoProgreso) {
        textoProgreso.textContent = '28% Completado';
    }
}

// Función para marcar una lección como completada
function marcarLeccionCompletada(leccionId) {
    const leccion = document.querySelector(`.module-content a[onclick*="${leccionId}"]`);
    if (leccion && !leccion.classList.contains('completada')) {
        leccion.classList.add('completada');
        actualizarProgreso();
    }
}

// Función para descargar archivos
function descargarArchivo(ruta, nombreArchivo) {
    const link = document.createElement('a');
    link.href = ruta;
    link.download = nombreArchivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Función para verificar respuestas del quiz
function verificarRespuestas() {
    const opciones = document.querySelectorAll('.quiz-option');
    let respuestasCorrectas = 0;
    let totalPreguntas = 0;

    opciones.forEach(opcion => {
        if (opcion.classList.contains('selected')) {
            totalPreguntas++;
            if (opcion.getAttribute('data-correct') === 'true') {
                respuestasCorrectas++;
                opcion.classList.add('correct');
            } else {
                opcion.classList.add('incorrect');
            }
        }
    });

    // Mostrar resultado
    alert(`Has acertado ${respuestasCorrectas} de ${totalPreguntas} preguntas.`);
}

// Agregar event listeners para las opciones del quiz
document.addEventListener('DOMContentLoaded', function() {
    const opciones = document.querySelectorAll('.quiz-option');
    opciones.forEach(opcion => {
        opcion.addEventListener('click', function() {
            // Remover selección previa de la misma pregunta
            const pregunta = this.closest('.quiz-question');
            pregunta.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Seleccionar la opción actual
            this.classList.add('selected');
        });
    });
}); 