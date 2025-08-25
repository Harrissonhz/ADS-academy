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
                opt.classList.remove('selected');
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
    
    const lecciones = [
        'videoIntroductorio', 'logicaProgramacion', 'pensamientoAlgoritmico', 'lenguajesVsLogica', 'herramientasCurso',
        'definicionAlgoritmo', 'pseudocodigoBasico', 'ejemplosCotidianos', 'actividadAlgoritmo',
        'simbolosNormas', 'conversionPseudocodigo', 'actividadDrawio',
        'tiposDatosBasicos', 'declaracionInicializacion', 'entradaSalidaDatos', 'actividadQuizPseint',
        'operadoresAritmeticos', 'precedenciaOperadores', 'actividadEjerciciosCombinados',
        'estructurasIf', 'condicionesAnidadas', 'actividadAlgoritmoDecisiones',
        'estructurasWhile', 'casosUso', 'actividadFactorialPrimos',
        'declaracionUso', 'recorridosCalculos', 'actividadSumaElementos',
        'conceptoFuncion', 'parametrosRetorno', 'actividadModularizacion',
        'enfoquePasoPaso', 'analisisPruebas', 'actividadProblemaReal',
        'calculadoraBasica', 'proyectoFinal', 'introduccionPython', 'transicionPractica',
        'aplicacionPython', 'buenasPracticas', 'actividadReescribirPython'
    ];

    // Encontrar la lección actual
    const leccionesVisibles = document.querySelectorAll('.lesson-content');
    console.log('Lecciones encontradas:', leccionesVisibles.length);
    
    let leccionActual = null;
    leccionesVisibles.forEach(leccion => {
        console.log('Lección:', leccion.id, 'Display:', leccion.style.display);
        if (leccion.style.display === 'block') {
            leccionActual = leccion.id;
        }
    });
    
    console.log('Lección actual:', leccionActual);

    if (!leccionActual) {
        console.log('No se encontró lección actual');
        return;
    }

    // Pausar el video actual si está reproduciéndose
    const videoActual = document.querySelector(`#${leccionActual} iframe`);
    if (videoActual) {
        // Enviar mensaje al iframe para pausar el video
        try {
            // Intentar pausar usando la API de YouTube
            videoActual.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            // También intentar pausar usando el método nativo del iframe
            videoActual.contentWindow.postMessage('{"method":"pause"}', '*');
            // Establecer el src a vacío para asegurar que el video se detenga
            videoActual.src = '';
        } catch (e) {
            console.log('Error al intentar pausar el video:', e);
        }
    }

    const indiceActual = lecciones.indexOf(leccionActual);
    console.log('Índice actual:', indiceActual);

    if (direccion === 'siguiente' && indiceActual < lecciones.length - 1) {
        console.log('Navegando a siguiente:', lecciones[indiceActual + 1]);
        mostrarContenido(lecciones[indiceActual + 1]);
    } else if (direccion === 'anterior' && indiceActual > 0) {
        console.log('Navegando a anterior:', lecciones[indiceActual - 1]);
        mostrarContenido(lecciones[indiceActual - 1]);
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
        
        // Clonar el contenedor de recursos y quiz si no existe en la lección actual
        const recursosQuizContainer = contenidoSeleccionado.querySelector('.resources-container');
        if (!recursosQuizContainer) {
            const recursosQuizTemplate = document.querySelector('#videoIntroductorio .resources-container');
            if (recursosQuizTemplate) {
                const recursosQuizClone = recursosQuizTemplate.cloneNode(true);
                contenidoSeleccionado.appendChild(recursosQuizClone);
            }
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
    const questions = document.querySelectorAll('.quiz-question');
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
    } else if (porcentaje >= 60) {
        mensaje = `¡Bien! Has acertado ${correctas} de ${questions.length} respuestas`;
        icono = 'success';
    } else {
        mensaje = `Necesitas practicar más. Has acertado ${correctas} de ${questions.length} respuestas`;
        icono = 'error';
    }

    // Mostrar resultado final con opción de reintentar
    Swal.fire({
        title: 'Resultado del Quiz',
        text: mensaje,
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