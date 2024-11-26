// script.js

// Função para gerar números aleatórios dentro de um intervalo
// min: valor mínimo do intervalo
// max: valor máximo do intervalo
// quantidade: número de valores desejados
function gerarNumerosAleatorios(min, max, quantidade) {
    const numeros = [];
    while (numeros.length < quantidade) {
        const numero = Math.floor(Math.random() * (max - min + 1)) + min;
        // Adiciona o número apenas se ele ainda não estiver na lista
        if (!numeros.includes(numero)) {
            numeros.push(numero);
        }
    }
    return numeros;
}

// Função para exibir "Bingo!" e desabilitar as células
function exibirBingo() {
    const indicador = document.getElementById("bingo-indicador");
    indicador.classList.remove("oculto"); // Torna o indicador visível

    // Desabilita as células
    const celulas = document.querySelectorAll(".celula");
    celulas.forEach(celula => celula.classList.add("desabilitado"));

    // Remove o indicador após 5 segundos
    setTimeout(() => {
        indicador.classList.add("oculto");
    }, 5000);
}

// Função para verificar se há Bingo
function verificarBingo() {
    const tamanho = 5; // Tamanho da grade (5x5)
    const celulas = document.querySelectorAll(".celula"); // Seleciona todas as células
    const grade = Array.from(celulas).map(celula => celula.classList.contains("marcada") ? 1 : 0);

    // Verifica linhas
    for (let linha = 0; linha < tamanho; linha++) {
        const linhaCompleta = grade.slice(linha * tamanho, (linha + 1) * tamanho);
        if (linhaCompleta.every(celula => celula === 1)) {
            exibirBingo();
            return;
        }
    }

    // Verifica colunas
    for (let coluna = 0; coluna < tamanho; coluna++) {
        const colunaCompleta = Array.from({ length: tamanho }, (_, i) => grade[i * tamanho + coluna]);
        if (colunaCompleta.every(celula => celula === 1)) {
            exibirBingo();
            return;
        }
    }

    // Verifica diagonais
    const diagonal1 = Array.from({ length: tamanho }, (_, i) => grade[i * tamanho + i]);
    const diagonal2 = Array.from({ length: tamanho }, (_, i) => grade[(i + 1) * tamanho - (i + 1)]);
    if (diagonal1.every(celula => celula === 1) || diagonal2.every(celula => celula === 1)) {
        exibirBingo();
        return;
    }
}

// Função para gerar a cartela de bingo
function gerarCartelaBingo() {
    const grade = document.getElementById("grade-bingo");
    grade.innerHTML = ""; // Limpa a grade antes de gerar

    // Intervalos de números para cada coluna
    const intervalos = [
        [1, 15],    // Coluna 1
        [16, 30],   // Coluna 2
        [31, 45],   // Coluna 3
        [46, 60],   // Coluna 4
        [61, 75],   // Coluna 5
    ];

    // Gera os números para cada coluna
    const colunas = intervalos.map(intervalo => gerarNumerosAleatorios(intervalo[0], intervalo[1], 5));

    // Preenche a grade linha por linha
    for (let linha = 0; linha < 5; linha++) {
        for (let coluna = 0; coluna < 5; coluna++) {
            const celula = document.createElement("div");
            celula.classList.add("celula");
            celula.dataset.indice = `${linha}-${coluna}`; // Identificador da célula

            // Adiciona o ícone na célula central
            if (coluna === 2 && linha === 2) {
                celula.innerHTML = "⭐";
                celula.classList.add("icone");
            } else {
                celula.textContent = colunas[coluna][linha];
            }

            // Adiciona evento de clique para marcar a célula
            celula.addEventListener("click", function () {
                if (!celula.classList.contains("icone")) {
                    celula.classList.toggle("marcada"); // Alterna entre marcada e não marcada
                    verificarBingo(); // Verifica se há Bingo após cada clique
                }
            });

            grade.appendChild(celula); // Adiciona a célula na grade
        }
    }
}

// Gera a cartela ao carregar a página
window.onload = gerarCartelaBingo;
