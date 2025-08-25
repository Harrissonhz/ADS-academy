// Script para manejar la interacción del curso
document.addEventListener('DOMContentLoaded', function() {
    // Manejar la selección de opciones del quiz
    const quizOptions = document.querySelectorAll('.quiz-option');
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Encontrar la pregunta padre de la opción seleccionada
            const question = this.closest('.quiz-question');
            // Remover la clase 'selected' solo de las opciones de la misma pregunta
            question.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('selected', 'correct', 'incorrect');
            });
            // Agregar la clase 'selected' a la opción clickeada
            this.classList.add('selected');
        });
    });

    // Manejar la navegación entre módulos
    const moduleItems = document.querySelectorAll('.module-item');
    moduleItems.forEach(item => {
        item.addEventListener('click', function() {
            moduleItems.forEach(mod => mod.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Mostrar el contenido del video introductorio por defecto
    mostrarContenido('videoIntroductorio');
});

// Función para navegar entre lecciones
function navegarLeccion(direccion) {
    console.log('Dirección:', direccion);
    
    // Definir la estructura de módulos y sus lecciones
    const estructuraModulos = {
        modulo1: [
            'videoIntroductorio', 'logicaProgramacion', 'pensamientoAlgoritmico', 
            'lenguajesVsLogica', 'herramientasCurso', 'quizModulo1'
        ],
        modulo2: [
            'definicionAlgoritmo', 'pseudocodigoBasico', 'ejemplosCotidianos', 
            'actividadAlgoritmo'
        ],
        modulo3: [
            'simbolosNormas', 'conversionPseudocodigo', 'actividadDrawio', 
            'quizModulo3'
        ],
        modulo4: [
            'tiposDatosBasicos', 'declaracionInicializacion', 'entradaSalidaDatos', 
            'actividadQuizPseint'
        ],
        modulo5: [
            'operadoresAritmeticos', 'precedenciaOperadores', 
            'actividadEjerciciosCombinados', 'quizModulo5'
        ]
    };

    // Encontrar la lección actual
    const leccionesVisibles = document.querySelectorAll('.lesson-content');
    let leccionActual = null;
    leccionesVisibles.forEach(leccion => {
        if (leccion.style.display === 'block') {
            leccionActual = leccion.id;
        }
    });

    if (!leccionActual) {
        console.log('No se encontró lección actual');
        return;
    }

    // Pausar el video actual si está reproduciéndose
    const videoActual = document.querySelector(`#${leccionActual} iframe`);
    if (videoActual) {
        try {
            videoActual.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            videoActual.contentWindow.postMessage('{"method":"pause"}', '*');
            videoActual.src = '';
        } catch (e) {
            console.log('Error al intentar pausar el video:', e);
        }
    }

    // Encontrar el módulo actual y la posición de la lección
    let moduloActual = null;
    let indiceEnModulo = -1;
    let siguienteLeccion = null;

    for (const [modulo, lecciones] of Object.entries(estructuraModulos)) {
        const indice = lecciones.indexOf(leccionActual);
        if (indice !== -1) {
            moduloActual = modulo;
            indiceEnModulo = indice;
            break;
        }
    }

    if (moduloActual) {
        const leccionesModulo = estructuraModulos[moduloActual];
        
        if (direccion === 'siguiente') {
            if (indiceEnModulo < leccionesModulo.length - 1) {
                // Siguiente lección en el mismo módulo
                siguienteLeccion = leccionesModulo[indiceEnModulo + 1];
            } else {
                // Buscar el siguiente módulo
                const modulos = Object.keys(estructuraModulos);
                const indiceModulo = modulos.indexOf(moduloActual);
                if (indiceModulo < modulos.length - 1) {
                    siguienteLeccion = estructuraModulos[modulos[indiceModulo + 1]][0];
                }
            }
        } else if (direccion === 'anterior') {
            if (indiceEnModulo > 0) {
                // Lección anterior en el mismo módulo
                siguienteLeccion = leccionesModulo[indiceEnModulo - 1];
            } else {
                // Buscar el módulo anterior
                const modulos = Object.keys(estructuraModulos);
                const indiceModulo = modulos.indexOf(moduloActual);
                if (indiceModulo > 0) {
                    const leccionesModuloAnterior = estructuraModulos[modulos[indiceModulo - 1]];
                    siguienteLeccion = leccionesModuloAnterior[leccionesModuloAnterior.length - 1];
                }
            }
        }
    }

    if (siguienteLeccion) {
        mostrarContenido(siguienteLeccion);
        refrescarMiniatura(siguienteLeccion);
    }
}

function mostrarContenido(idContenido) {
    // Ocultar todos los contenidos de lecciones
    const lessonContents = document.querySelectorAll('.lesson-content');
    lessonContents.forEach(content => {
        content.style.display = 'none';
    });
    
    // Mostrar el contenido seleccionado
    const contenidoSeleccionado = document.getElementById(idContenido);
    if (contenidoSeleccionado) {
        contenidoSeleccionado.style.display = 'block';
        
        // Asegurarse de que la miniatura del video esté visible
        const videoThumbnail = contenidoSeleccionado.querySelector('.video-thumbnail');
        if (videoThumbnail) {
            videoThumbnail.style.display = 'block';
            const videoImg = videoThumbnail.querySelector('img');
            if (videoImg) {
                videoImg.style.display = 'block';
            }
        }
        
        // Verificar si ya existe la sección de recursos
        let recursosSection = contenidoSeleccionado.querySelector('.resources-section');
        
        // Si no existe, clonar la sección de recursos de la primera lección
        if (!recursosSection) {
            const recursosTemplate = document.querySelector('#videoIntroductorio .resources-section');
            if (recursosTemplate) {
                recursosSection = recursosTemplate.cloneNode(true);
                // Insertar antes del final del contenido
                contenidoSeleccionado.appendChild(recursosSection);
            }
        }

        // Actualizar el menú lateral
        const moduleItems = document.querySelectorAll('.module-item');
        moduleItems.forEach(item => {
            // Remover la clase active de todos los módulos
            item.classList.remove('active');
            
            // Verificar si el contenido actual pertenece a este módulo
            const moduleContent = item.querySelector('.module-content');
            if (moduleContent) {
                const moduleLinks = moduleContent.querySelectorAll('a');
                const belongsToModule = Array.from(moduleLinks).some(link => 
                    link.getAttribute('onclick').includes(idContenido)
                );
                
                if (belongsToModule) {
                    item.classList.add('active');
                }
            }
        });
    }
}

function refrescarMiniatura(idLeccion) {
    // Buscar la miniatura por diferentes selectores posibles
    const videoThumbnail = document.querySelector(`#${idLeccion} .video-thumbnail`) || 
                          document.querySelector(`#${idLeccion} [id^="videoThumbnail"]`) ||
                          document.querySelector(`#${idLeccion} .video-container > div`);
    
    if (videoThumbnail) {
        // Forzar un reflow del elemento
        videoThumbnail.style.display = 'none';
        videoThumbnail.offsetHeight; // Forzar reflow
        videoThumbnail.style.display = 'block';
        
        // Si hay una imagen dentro de la miniatura, también la refrescamos
        const thumbnailImg = videoThumbnail.querySelector('img');
        if (thumbnailImg) {
            const currentSrc = thumbnailImg.src;
            thumbnailImg.src = '';
            thumbnailImg.src = currentSrc;
        }

        // Si es una miniatura con background-image, refrescamos el estilo
        if (videoThumbnail.style.backgroundImage) {
            const currentBg = videoThumbnail.style.backgroundImage;
            videoThumbnail.style.backgroundImage = 'none';
            videoThumbnail.offsetHeight; // Forzar reflow
            videoThumbnail.style.backgroundImage = currentBg;
        }
    }
}

function descargarArchivo(ruta, nombreArchivo) {
    // Prevenir el comportamiento predeterminado del enlace
    event.preventDefault();
    
    // Crear un enlace temporal
    const link = document.createElement('a');
    link.href = ruta;
    link.download = nombreArchivo;
    
    // Simular clic en el enlace
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Verifica las respuestas del quiz
 * 
 * Esta función:
 * 1. Verifica que todas las preguntas tengan una respuesta seleccionada
 * 2. Valida si las respuestas seleccionadas son correctas
 * 3. Muestra retroalimentación visual para cada respuesta
 * 4. Calcula y muestra la puntuación final
 * 
 * @returns {void}
 */
function verificarRespuestas() {
    // Obtener el módulo actual basado en el contenido visible
    const contenidoVisible = document.querySelector('.lesson-content[style="display: block;"]');
    if (!contenidoVisible) return;

    // Obtener solo las preguntas del módulo actual
    const questions = contenidoVisible.querySelectorAll('.quiz-question');
    let correctas = 0;
    let preguntasSinResponder = [];

    questions.forEach((question, index) => {
        // Buscar la opción seleccionada en la pregunta actual
        const selectedOption = question.querySelector('.quiz-option.selected');
        const options = question.querySelectorAll('.quiz-option');
        
        // Limpiar retroalimentación visual previa
        options.forEach(opt => {
            opt.classList.remove('correct', 'incorrect');
        });

        if (!selectedOption) {
            // Si no hay opción seleccionada, agregar a la lista de preguntas sin responder
            preguntasSinResponder.push(index + 1);
            // Agregar efecto visual de error
            question.classList.add('shake');
            setTimeout(() => question.classList.remove('shake'), 500);
        } else {
            // Verificar si la respuesta seleccionada es correcta usando el atributo data-correct
            const isCorrect = selectedOption.getAttribute('data-correct') === 'true';
            
            // Mostrar retroalimentación visual para todas las opciones
            options.forEach(opt => {
                if (opt.getAttribute('data-correct') === 'true') {
                    opt.classList.add('correct');
                } else if (opt === selectedOption && !isCorrect) {
                    opt.classList.add('incorrect');
                }
            });

            if (isCorrect) {
                correctas++;
                selectedOption.classList.add('correct');
            }
        }
    });

    // Si hay preguntas sin responder, mostrar mensaje de error
    if (preguntasSinResponder.length > 0) {
        let mensajeError = preguntasSinResponder.length === 1 
            ? `La pregunta ${preguntasSinResponder[0]} no ha sido respondida.`
            : `Las preguntas ${preguntasSinResponder.join(', ')} no han sido respondidas.`;

        Swal.fire({
            title: '¡Atención!',
            text: mensajeError,
            icon: 'warning',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    // Calcular y mostrar el resultado final
    const porcentaje = (correctas / questions.length) * 100;
    let mensaje, icono;
    
    if (porcentaje === 100) {
        mensaje = '¡Excelente! Has acertado todas las respuestas';
        icono = 'success';
    } else if (porcentaje >= 80) {
        mensaje = '¡Muy bien! Has acertado la mayoría de las respuestas';
        icono = 'success';
    } else if (porcentaje >= 60) {
        mensaje = '¡Bien! Has aprobado el quiz';
        icono = 'info';
    } else {
        mensaje = 'Necesitas repasar el contenido del módulo';
        icono = 'error';
    }

    Swal.fire({
        title: 'Resultado del Quiz',
        text: `${mensaje} (${correctas}/${questions.length} correctas)`,
        icon: icono,
        showCancelButton: true,
        confirmButtonText: 'Reintentar',
        cancelButtonText: 'Cerrar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Limpiar todas las selecciones y retroalimentación visual
            questions.forEach(question => {
                const options = question.querySelectorAll('.quiz-option');
                options.forEach(opt => {
                    opt.classList.remove('selected', 'correct', 'incorrect');
                });
            });
        }
    });
} 