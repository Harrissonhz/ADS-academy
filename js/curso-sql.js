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

    const leccionActual = document.querySelector('.lesson-content[style="display: block;"]').id;
    const indiceActual = lecciones.indexOf(leccionActual);

    if (direccion === 'siguiente' && indiceActual < lecciones.length - 1) {
        mostrarContenido(lecciones[indiceActual + 1]);
    } else if (direccion === 'anterior' && indiceActual > 0) {
        mostrarContenido(lecciones[indiceActual - 1]);
    }
}

function mostrarContenido(idContenido) {
    // Ocultar todos los contenidos principales
    document.querySelectorAll('.lesson-content').forEach(contenido => {
        contenido.style.display = 'none';
    });
    
    // Mostrar el contenido principal seleccionado
    const contenidoSeleccionado = document.getElementById(idContenido);
    if (contenidoSeleccionado) {
        contenidoSeleccionado.style.display = 'block';
    }

    // Mostrar el contenedor de recursos y quiz
    const recursosQuiz = document.getElementById('recursosQuizContainer');
    if (recursosQuiz) {
        recursosQuiz.style.display = 'block';
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