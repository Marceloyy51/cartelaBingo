// Função para verificar se há cartela cheia
function verificarBingo() {
    const celulas = document.querySelectorAll(".celula"); // Seleciona todas as células

    // Verifica se todas as células (exceto a célula central) estão marcadas
    const todasMarcadas = Array.from(celulas).every(celula => 
        celula.classList.contains("marcada") || celula.classList.contains("icone")
    );

    if (todasMarcadas) {
        exibirBingo();
    }
}
