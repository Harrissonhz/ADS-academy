// Objeto que contiene los quizzes para cada módulo
const quizzesPorModulo = {
    introduccion: {
        titulo: "Introducción a la Lógica de Programación",
        preguntas: [
            {
                pregunta: "¿Qué es un algoritmo?",
                opciones: [
                    { texto: "Un lenguaje de programación", correcta: false },
                    { texto: "Un conjunto de instrucciones para resolver un problema", correcta: true },
                    { texto: "Un tipo de variable", correcta: false },
                    { texto: "Un error en el código", correcta: false }
                ]
            },
            {
                pregunta: "¿Cuál es la diferencia entre pseudocódigo y un lenguaje de programación?",
                opciones: [
                    { texto: "El pseudocódigo es más difícil de entender", correcta: false },
                    { texto: "El pseudocódigo es independiente de cualquier lenguaje de programación", correcta: true },
                    { texto: "El pseudocódigo no puede ser ejecutado", correcta: false },
                    { texto: "El pseudocódigo es más rápido de escribir", correcta: false }
                ]
            },
            {
                pregunta: "¿Qué es el pensamiento algorítmico?",
                opciones: [
                    { texto: "La capacidad de escribir código en cualquier lenguaje", correcta: false },
                    { texto: "La habilidad para resolver problemas de manera estructurada y paso a paso", correcta: true },
                    { texto: "El conocimiento de múltiples lenguajes de programación", correcta: false },
                    { texto: "La capacidad de memorizar algoritmos", correcta: false }
                ]
            },
            {
                pregunta: "¿Por qué es importante la lógica de programación?",
                opciones: [
                    { texto: "Solo es importante para programadores profesionales", correcta: false },
                    { texto: "Es fundamental para desarrollar el pensamiento estructurado y resolver problemas", correcta: true },
                    { texto: "Solo es necesaria para lenguajes de programación específicos", correcta: false },
                    { texto: "Es un requisito opcional para programar", correcta: false }
                ]
            },
            {
                pregunta: "¿Cuál es el primer paso al resolver un problema de programación?",
                opciones: [
                    { texto: "Escribir el código directamente", correcta: false },
                    { texto: "Entender completamente el problema y planificar la solución", correcta: true },
                    { texto: "Elegir el lenguaje de programación", correcta: false },
                    { texto: "Buscar soluciones en internet", correcta: false }
                ]
            }
        ]
    },
    algoritmos: {
        titulo: "Algoritmos y Pseudocódigo",
        preguntas: [
            {
                pregunta: "¿Qué es un diagrama de flujo?",
                opciones: [
                    { texto: "Un tipo de código fuente", correcta: false },
                    { texto: "Una representación gráfica de un algoritmo", correcta: true },
                    { texto: "Un lenguaje de programación visual", correcta: false },
                    { texto: "Un error en el programa", correcta: false }
                ]
            },
            {
                pregunta: "¿Cuál es el símbolo correcto para representar una decisión en un diagrama de flujo?",
                opciones: [
                    { texto: "Un rectángulo", correcta: false },
                    { texto: "Un rombo", correcta: true },
                    { texto: "Un círculo", correcta: false },
                    { texto: "Una flecha", correcta: false }
                ]
            },
            {
                pregunta: "¿Qué representa una flecha en un diagrama de flujo?",
                opciones: [
                    { texto: "Una operación matemática", correcta: false },
                    { texto: "El flujo o dirección del proceso", correcta: true },
                    { texto: "Una variable", correcta: false },
                    { texto: "Un comentario", correcta: false }
                ]
            },
            {
                pregunta: "¿Cuál es la ventaja principal de usar pseudocódigo?",
                opciones: [
                    { texto: "Es más rápido de ejecutar que otros lenguajes", correcta: false },
                    { texto: "Permite expresar algoritmos de manera clara y comprensible sin depender de un lenguaje específico", correcta: true },
                    { texto: "Es más fácil de compilar", correcta: false },
                    { texto: "Tiene más funcionalidades que otros lenguajes", correcta: false }
                ]
            },
            {
                pregunta: "¿Qué elemento NO es parte de un diagrama de flujo?",
                opciones: [
                    { texto: "Símbolos geométricos", correcta: false },
                    { texto: "Flechas de dirección", correcta: false },
                    { texto: "Código fuente completo", correcta: true },
                    { texto: "Texto descriptivo", correcta: false }
                ]
            }
        ]
    },
    estructurasSecuenciales: {
        titulo: "Estructuras Secuenciales",
        preguntas: [
            {
                pregunta: "¿Qué son las estructuras secuenciales?",
                opciones: [
                    { texto: "Instrucciones que se ejecutan en orden, una después de otra", correcta: true },
                    { texto: "Instrucciones que se ejecutan en paralelo", correcta: false },
                    { texto: "Instrucciones que se ejecutan al azar", correcta: false },
                    { texto: "Instrucciones que se ejecutan en orden inverso", correcta: false }
                ]
            },
            {
                pregunta: "¿Cuál es la característica principal de una estructura secuencial?",
                opciones: [
                    { texto: "Permite saltar entre instrucciones", correcta: false },
                    { texto: "Cada instrucción se ejecuta una sola vez y en orden", correcta: true },
                    { texto: "Permite ejecutar instrucciones en bucle", correcta: false },
                    { texto: "Permite ejecutar instrucciones condicionalmente", correcta: false }
                ]
            },
            {
                pregunta: "¿Qué tipo de problemas se resuelven mejor con estructuras secuenciales?",
                opciones: [
                    { texto: "Problemas que requieren decisiones complejas", correcta: false },
                    { texto: "Problemas que requieren repetición de pasos", correcta: false },
                    { texto: "Problemas que siguen un flujo lineal y predecible", correcta: true },
                    { texto: "Problemas que requieren múltiples caminos de ejecución", correcta: false }
                ]
            },
            {
                pregunta: "¿Cuál es un ejemplo de estructura secuencial?",
                opciones: [
                    { texto: "Un bucle while", correcta: false },
                    { texto: "Una declaración if-else", correcta: false },
                    { texto: "Una serie de cálculos matemáticos en orden", correcta: true },
                    { texto: "Una función recursiva", correcta: false }
                ]
            },
            {
                pregunta: "¿Por qué es importante entender las estructuras secuenciales?",
                opciones: [
                    { texto: "Son la base para entender estructuras más complejas", correcta: true },
                    { texto: "Son las únicas estructuras que se usan en programación", correcta: false },
                    { texto: "Son más eficientes que otras estructuras", correcta: false },
                    { texto: "Son las más difíciles de implementar", correcta: false }
                ]
            }
        ]
    },
    tiposDatos: {
        titulo: "Tipos de Datos y Variables",
        preguntas: [
            {
                pregunta: "¿Qué es una variable en programación?",
                opciones: [
                    { texto: "Un espacio en memoria que almacena un valor que puede cambiar", correcta: true },
                    { texto: "Un valor constante que no puede modificarse", correcta: false },
                    { texto: "Un tipo de error en el código", correcta: false },
                    { texto: "Una función predefinida", correcta: false }
                ]
            },
            {
                pregunta: "¿Cuál de los siguientes NO es un tipo de dato básico?",
                opciones: [
                    { texto: "Entero (int)", correcta: false },
                    { texto: "Cadena (string)", correcta: false },
                    { texto: "Matriz (array)", correcta: true },
                    { texto: "Booleano (boolean)", correcta: false }
                ]
            },
            {
                pregunta: "¿Qué es la declaración de una variable?",
                opciones: [
                    { texto: "El proceso de asignar un valor inicial a la variable", correcta: false },
                    { texto: "El proceso de reservar espacio en memoria para la variable", correcta: true },
                    { texto: "El proceso de eliminar la variable", correcta: false },
                    { texto: "El proceso de cambiar el tipo de la variable", correcta: false }
                ]
            },
            {
                pregunta: "¿Qué es la inicialización de una variable?",
                opciones: [
                    { texto: "El proceso de reservar espacio en memoria", correcta: false },
                    { texto: "El proceso de asignar un valor inicial a la variable", correcta: true },
                    { texto: "El proceso de declarar la variable", correcta: false },
                    { texto: "El proceso de cambiar el nombre de la variable", correcta: false }
                ]
            },
            {
                pregunta: "¿Por qué es importante especificar el tipo de dato de una variable?",
                opciones: [
                    { texto: "Para que el programa sepa cómo interpretar y manipular los datos", correcta: true },
                    { texto: "Solo es importante en lenguajes antiguos", correcta: false },
                    { texto: "Para hacer el código más largo", correcta: false },
                    { texto: "Para que el programa sea más lento", correcta: false }
                ]
            }
        ]
    },
    operadores: {
        titulo: "Operadores y Expresiones",
        preguntas: [
            {
                pregunta: "¿Qué es un operador en programación?",
                opciones: [
                    { texto: "Un símbolo que realiza una operación específica sobre uno o más operandos", correcta: true },
                    { texto: "Una variable que almacena resultados", correcta: false },
                    { texto: "Un tipo de dato", correcta: false },
                    { texto: "Un error en el código", correcta: false }
                ]
            },
            {
                pregunta: "¿Cuál de los siguientes NO es un operador aritmético?",
                opciones: [
                    { texto: "+ (suma)", correcta: false },
                    { texto: "- (resta)", correcta: false },
                    { texto: "&& (AND lógico)", correcta: true },
                    { texto: "* (multiplicación)", correcta: false }
                ]
            },
            {
                pregunta: "¿Qué es la precedencia de operadores?",
                opciones: [
                    { texto: "El orden en que se ejecutan las operaciones en una expresión", correcta: true },
                    { texto: "La velocidad de ejecución de los operadores", correcta: false },
                    { texto: "El número de operadores en una expresión", correcta: false },
                    { texto: "La cantidad de memoria que usa cada operador", correcta: false }
                ]
            },
            {
                pregunta: "¿Cuál es el resultado de la expresión: 5 + 3 * 2?",
                opciones: [
                    { texto: "16", correcta: false },
                    { texto: "11", correcta: true },
                    { texto: "13", correcta: false },
                    { texto: "10", correcta: false }
                ]
            },
            {
                pregunta: "¿Qué operador se usa para obtener el residuo de una división?",
                opciones: [
                    { texto: "/", correcta: false },
                    { texto: "%", correcta: true },
                    { texto: "//", correcta: false },
                    { texto: "\\", correcta: false }
                ]
            }
        ]
    },
    estructurasCondicionales: {
        titulo: "Estructuras Condicionales",
        preguntas: [
            {
                pregunta: "¿Qué son las estructuras condicionales?",
                opciones: [
                    { texto: "Instrucciones que permiten ejecutar código basado en condiciones", correcta: true },
                    { texto: "Instrucciones que se ejecutan en orden secuencial", correcta: false },
                    { texto: "Instrucciones que se repiten indefinidamente", correcta: false },
                    { texto: "Instrucciones que se ejecutan en paralelo", correcta: false }
                ]
            },
            {
                pregunta: "¿Cuál es la estructura condicional más básica?",
                opciones: [
                    { texto: "if-else", correcta: true },
                    { texto: "switch-case", correcta: false },
                    { texto: "while", correcta: false },
                    { texto: "for", correcta: false }
                ]
            },
            {
                pregunta: "¿Qué hace la estructura 'else if'?",
                opciones: [
                    { texto: "Permite evaluar una nueva condición si la anterior es falsa", correcta: true },
                    { texto: "Ejecuta el código sin importar la condición", correcta: false },
                    { texto: "Termina la ejecución del programa", correcta: false },
                    { texto: "Repite el código anterior", correcta: false }
                ]
            },
            {
                pregunta: "¿Cuándo se usa la estructura 'switch'?",
                opciones: [
                    { texto: "Cuando hay múltiples condiciones que dependen de un mismo valor", correcta: true },
                    { texto: "Cuando solo hay una condición simple", correcta: false },
                    { texto: "Cuando necesitamos repetir código", correcta: false },
                    { texto: "Cuando queremos terminar el programa", correcta: false }
                ]
            },
            {
                pregunta: "¿Qué es un operador ternario?",
                opciones: [
                    { texto: "Una forma abreviada de escribir una estructura if-else simple", correcta: true },
                    { texto: "Un operador que solo puede tener tres valores", correcta: false },
                    { texto: "Un tipo de bucle", correcta: false },
                    { texto: "Un operador matemático", correcta: false }
                ]
            }
        ]
    },
    estructurasRepetitivas: {
        titulo: "Estructuras Repetitivas",
        preguntas: [
            {
                pregunta: "¿Qué son las estructuras repetitivas?",
                opciones: [
                    { texto: "Instrucciones que permiten ejecutar código múltiples veces", correcta: true },
                    { texto: "Instrucciones que se ejecutan una sola vez", correcta: false },
                    { texto: "Instrucciones que terminan el programa", correcta: false },
                    { texto: "Instrucciones que se ejecutan en paralelo", correcta: false }
                ]
            },
            {
                pregunta: "¿Cuál es la diferencia principal entre 'while' y 'do-while'?",
                opciones: [
                    { texto: "do-while ejecuta el código al menos una vez, while puede no ejecutarlo", correcta: true },
                    { texto: "while es más rápido que do-while", correcta: false },
                    { texto: "do-while solo funciona con números", correcta: false },
                    { texto: "while solo funciona con texto", correcta: false }
                ]
            },
            {
                pregunta: "¿Cuándo se usa el bucle 'for'?",
                opciones: [
                    { texto: "Cuando sabemos cuántas veces se debe repetir el código", correcta: true },
                    { texto: "Cuando no sabemos cuántas veces se repetirá", correcta: false },
                    { texto: "Cuando queremos terminar el programa", correcta: false },
                    { texto: "Cuando queremos ejecutar código en paralelo", correcta: false }
                ]
            },
            {
                pregunta: "¿Qué es un bucle infinito?",
                opciones: [
                    { texto: "Un bucle que se ejecuta indefinidamente porque su condición nunca se hace falsa", correcta: true },
                    { texto: "Un bucle que se ejecuta una sola vez", correcta: false },
                    { texto: "Un bucle que termina inmediatamente", correcta: false },
                    { texto: "Un bucle que solo funciona con números grandes", correcta: false }
                ]
            },
            {
                pregunta: "¿Qué es un contador en un bucle?",
                opciones: [
                    { texto: "Una variable que se incrementa o decrementa para controlar las repeticiones", correcta: true },
                    { texto: "Un error en el código", correcta: false },
                    { texto: "Un tipo de dato especial", correcta: false },
                    { texto: "Una función predefinida", correcta: false }
                ]
            }
        ]
    },
    arreglosMatrices: {
        titulo: "Arreglos y Matrices",
        preguntas: [
            {
                pregunta: "¿Qué es un arreglo en programación?",
                opciones: [
                    { texto: "Una estructura de datos que almacena múltiples valores del mismo tipo", correcta: true },
                    { texto: "Un tipo de variable simple", correcta: false },
                    { texto: "Un error en el código", correcta: false },
                    { texto: "Una función predefinida", correcta: false }
                ]
            },
            {
                pregunta: "¿Qué es una matriz?",
                opciones: [
                    { texto: "Un arreglo de dos o más dimensiones", correcta: true },
                    { texto: "Un arreglo de una sola dimensión", correcta: false },
                    { texto: "Un tipo de dato simple", correcta: false },
                    { texto: "Una función matemática", correcta: false }
                ]
            },
            {
                pregunta: "¿Qué es el índice de un arreglo?",
                opciones: [
                    { texto: "La posición de un elemento en el arreglo", correcta: true },
                    { texto: "El valor almacenado en el arreglo", correcta: false },
                    { texto: "El tamaño del arreglo", correcta: false },
                    { texto: "El tipo de dato del arreglo", correcta: false }
                ]
            },
            {
                pregunta: "¿Cuál es la diferencia entre un arreglo y una matriz?",
                opciones: [
                    { texto: "Una matriz tiene múltiples dimensiones, un arreglo tiene una", correcta: true },
                    { texto: "Un arreglo es más rápido que una matriz", correcta: false },
                    { texto: "Una matriz solo puede almacenar números", correcta: false },
                    { texto: "Un arreglo solo puede almacenar texto", correcta: false }
                ]
            },
            {
                pregunta: "¿Qué es un arreglo dinámico?",
                opciones: [
                    { texto: "Un arreglo cuyo tamaño puede cambiar durante la ejecución del programa", correcta: true },
                    { texto: "Un arreglo que se mueve por la memoria", correcta: false },
                    { texto: "Un arreglo que solo almacena números", correcta: false },
                    { texto: "Un arreglo que se ejecuta más rápido", correcta: false }
                ]
            }
        ]
    },
    funcionesModularizacion: {
        titulo: "Funciones y Modularización",
        preguntas: [
            {
                pregunta: "¿Qué es una función en programación?",
                opciones: [
                    { texto: "Un bloque de código reutilizable que realiza una tarea específica", correcta: true },
                    { texto: "Un tipo de variable", correcta: false },
                    { texto: "Un error en el código", correcta: false },
                    { texto: "Una estructura de control", correcta: false }
                ]
            },
            {
                pregunta: "¿Qué es la modularización?",
                opciones: [
                    { texto: "Dividir un programa en módulos o funciones más pequeñas y manejables", correcta: true },
                    { texto: "Combinar todo el código en una sola función", correcta: false },
                    { texto: "Eliminar funciones del programa", correcta: false },
                    { texto: "Hacer el código más largo", correcta: false }
                ]
            },
            {
                pregunta: "¿Qué son los parámetros de una función?",
                opciones: [
                    { texto: "Valores que se pasan a la función para que los use", correcta: true },
                    { texto: "Errores en la función", correcta: false },
                    { texto: "Variables globales", correcta: false },
                    { texto: "Tipos de datos", correcta: false }
                ]
            },
            {
                pregunta: "¿Qué es el valor de retorno de una función?",
                opciones: [
                    { texto: "El resultado que la función devuelve al ser llamada", correcta: true },
                    { texto: "El número de parámetros que acepta", correcta: false },
                    { texto: "El tiempo que tarda en ejecutarse", correcta: false },
                    { texto: "El nombre de la función", correcta: false }
                ]
            },
            {
                pregunta: "¿Por qué es importante la modularización?",
                opciones: [
                    { texto: "Mejora la organización, mantenimiento y reutilización del código", correcta: true },
                    { texto: "Hace el programa más lento", correcta: false },
                    { texto: "Aumenta el tamaño del código", correcta: false },
                    { texto: "Dificulta la lectura del código", correcta: false }
                ]
            }
        ]
    },
    manejoArchivos: {
        titulo: "Manejo de Archivos",
        preguntas: [
            {
                pregunta: "¿Qué es el manejo de archivos en programación?",
                opciones: [
                    { texto: "La capacidad de leer y escribir datos en archivos del sistema", correcta: true },
                    { texto: "La organización de archivos en el computador", correcta: false },
                    { texto: "La eliminación de archivos", correcta: false },
                    { texto: "La copia de archivos", correcta: false }
                ]
            },
            {
                pregunta: "¿Qué es un archivo de texto?",
                opciones: [
                    { texto: "Un archivo que contiene caracteres legibles por humanos", correcta: true },
                    { texto: "Un archivo que solo contiene números", correcta: false },
                    { texto: "Un archivo que solo contiene imágenes", correcta: false },
                    { texto: "Un archivo que solo contiene código", correcta: false }
                ]
            },
            {
                pregunta: "¿Qué es un archivo binario?",
                opciones: [
                    { texto: "Un archivo que contiene datos en formato no legible directamente", correcta: true },
                    { texto: "Un archivo que solo contiene texto", correcta: false },
                    { texto: "Un archivo que solo contiene números", correcta: false },
                    { texto: "Un archivo que solo contiene código", correcta: false }
                ]
            },
            {
                pregunta: "¿Qué es un buffer en el manejo de archivos?",
                opciones: [
                    { texto: "Un área temporal de memoria para almacenar datos durante la lectura/escritura", correcta: true },
                    { texto: "Un error al abrir un archivo", correcta: false },
                    { texto: "Un tipo de archivo", correcta: false },
                    { texto: "Un método de compresión", correcta: false }
                ]
            },
            {
                pregunta: "¿Por qué es importante cerrar los archivos después de usarlos?",
                opciones: [
                    { texto: "Para liberar recursos y asegurar que los datos se guarden correctamente", correcta: true },
                    { texto: "Para hacer el programa más rápido", correcta: false },
                    { texto: "Para eliminar el archivo", correcta: false },
                    { texto: "Para cambiar el nombre del archivo", correcta: false }
                ]
            }
        ]
    },
    proyectoFinal: {
        titulo: "Proyecto Final",
        preguntas: [
            {
                pregunta: "¿Qué es una calculadora básica en programación?",
                opciones: [
                    { texto: "Un programa que realiza operaciones matemáticas fundamentales", correcta: true },
                    { texto: "Un dispositivo físico", correcta: false },
                    { texto: "Un tipo de variable", correcta: false },
                    { texto: "Un error en el código", correcta: false }
                ]
            },
            {
                pregunta: "¿Qué conceptos se aplican en el proyecto final?",
                opciones: [
                    { texto: "Todos los conceptos aprendidos durante el curso", correcta: true },
                    { texto: "Solo operaciones matemáticas", correcta: false },
                    { texto: "Solo manejo de archivos", correcta: false },
                    { texto: "Solo estructuras condicionales", correcta: false }
                ]
            },
            {
                pregunta: "¿Por qué es importante el proyecto final?",
                opciones: [
                    { texto: "Integra y aplica todos los conocimientos adquiridos en el curso", correcta: true },
                    { texto: "Es solo un ejercicio opcional", correcta: false },
                    { texto: "Sirve para aprobar el curso", correcta: false },
                    { texto: "Es un requisito administrativo", correcta: false }
                ]
            },
            {
                pregunta: "¿Qué es la transición práctica en programación?",
                opciones: [
                    { texto: "El proceso de aplicar conceptos teóricos en proyectos reales", correcta: true },
                    { texto: "Cambiar de un lenguaje a otro", correcta: false },
                    { texto: "Modificar el código existente", correcta: false },
                    { texto: "Eliminar código innecesario", correcta: false }
                ]
            },
            {
                pregunta: "¿Qué habilidades se desarrollan en el proyecto final?",
                opciones: [
                    { texto: "Pensamiento lógico, resolución de problemas y programación práctica", correcta: true },
                    { texto: "Solo habilidades matemáticas", correcta: false },
                    { texto: "Solo habilidades de diseño", correcta: false },
                    { texto: "Solo habilidades de documentación", correcta: false }
                ]
            }
        ]
    }
    // Agregar más módulos según sea necesario
};

// Función para cargar el quiz del módulo actual
function cargarQuizModulo(moduloId) {
    const quiz = quizzesPorModulo[moduloId];
    const quizContent = document.querySelector('.quiz-content');
    
    if (!quizContent) {
        console.error('No se encontró el contenedor del quiz');
        return;
    }

    if (!quiz) {
        quizContent.innerHTML = '<p class="text-center">No hay evaluación disponible para este módulo.</p>';
        return;
    }

    let html = `
        <h4 class="mb-4">${quiz.titulo}</h4>
        <div class="quiz-questions">
    `;

    quiz.preguntas.forEach((pregunta, index) => {
        html += `
            <div class="quiz-question mb-4">
                <h5 class="mb-3">${index + 1}. ${pregunta.pregunta}</h5>
                <div class="quiz-options">
        `;

        pregunta.opciones.forEach((opcion, opcionIndex) => {
            html += `
                <div class="quiz-option" data-correct="${opcion.correcta}">
                    <input type="radio" name="pregunta${index}" id="opcion${index}${opcionIndex}" class="d-none">
                    <label for="opcion${index}${opcionIndex}" class="w-100">
                        ${opcion.texto}
                    </label>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;
    });

    html += `
        </div>
        <div class="text-center mt-4">
            <button class="btn btn-primary" onclick="verificarRespuestas()">
                Enviar Respuestas
            </button>
        </div>
    `;

    quizContent.innerHTML = html;

    // Agregar event listeners a las opciones
    const quizOptions = document.querySelectorAll('.quiz-option');
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            const question = this.closest('.quiz-question');
            question.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
        });
    });
}

// Función para verificar las respuestas
function verificarRespuestas() {
    const quizQuestions = document.querySelectorAll('.quiz-question');
    let respuestasCorrectas = 0;
    let totalPreguntas = quizQuestions.length;

    quizQuestions.forEach(question => {
        const selectedOption = question.querySelector('.quiz-option.selected');
        if (selectedOption && selectedOption.dataset.correct === 'true') {
            respuestasCorrectas++;
        }
    });

    // Mostrar resultados
    const quizContent = document.querySelector('.quiz-content');
    const resultadoHTML = `
        <div class="quiz-result text-center">
            <h4 class="mb-3">Resultados</h4>
            <p class="mb-2">Respuestas correctas: ${respuestasCorrectas} de ${totalPreguntas}</p>
            <p class="mb-4">Porcentaje: ${Math.round((respuestasCorrectas / totalPreguntas) * 100)}%</p>
            <button class="btn btn-primary" onclick="cargarQuizModulo(currentModule)">Reintentar Quiz</button>
        </div>
    `;

    quizContent.innerHTML = resultadoHTML;
}

// Variable para mantener el módulo actual
let currentModule = 'introduccion';

// Inicializar el quiz cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    cargarQuizModulo(currentModule);
}); 