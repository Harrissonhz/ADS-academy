// Script para manejar la interacción del curso
document.addEventListener('DOMContentLoaded', function() {
    // Manejar la selección de opciones del quiz
    const quizOptions = document.querySelectorAll('.quiz-option');
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            quizOptions.forEach(opt => opt.classList.remove('selected'));
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
            videoActual.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
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

function verificarRespuestas() {
    const preguntas = document.querySelectorAll('.quiz-question');
    let respuestasCorrectas = 0;
    let totalPreguntas = preguntas.length;

    preguntas.forEach(pregunta => {
        const opciones = pregunta.querySelectorAll('.quiz-option');
        let respuestaSeleccionada = false;

        opciones.forEach(opcion => {
            if (opcion.classList.contains('selected')) {
                respuestaSeleccionada = true;
                if (opcion.dataset.correct === 'true') {
                    respuestasCorrectas++;
                    opcion.classList.add('correct');
                } else {
                    opcion.classList.add('incorrect');
                }
            }
        });

        if (!respuestaSeleccionada) {
            alert('Por favor, responde todas las preguntas');
            return;
        }
    });

    // Mostrar resultado
    const resultado = `Has respondido correctamente ${respuestasCorrectas} de ${totalPreguntas} preguntas`;
    alert(resultado);
} 