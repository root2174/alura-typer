let tempoInicial = $("#tempo-digitacao").text();
const campo = $(".campo-digitacao");

//--------------------------------------------------------------------------------------------------------------------//
//This function will be called as soon as the page is loaded.
$(function() {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    atualizaPlacar();
    $("#botao-reiniciar").click(reiniciaJogo);
    $('#usuarios').selectize({
        create: true,
        sortField: 'text'
    });
    $(".tooltip").tooltipster({
        trigger: "custom"
    });
});

//--------------------------------------------------------------------------------------------------------------------//
//This function will take the current text of the game, will split it and put the sentences
//in an array and get the array size, updating the sentence size on the html.
function atualizaTamanhoFrase() {
    const frase = $(".frase").text();
    const numPalavras = frase.split(" ").length;
    const tamanhoFrase = $("#tamanho-frase");

    tamanhoFrase.text(numPalavras);
}

//--------------------------------------------------------------------------------------------------------------------//
//This function will take the current value of the textarea upon input and will update the counters (words and char sizes)
//using the split() function on the textarea with regex.
function inicializaContadores() {
    campo.on("input", function() {
        const conteudo = campo.val();

        $("#contador-palavras").text(conteudo.split(/\S+/).length - 1);
        $("#contador-caracteres").text(conteudo.split(/[^ ]/).length - 1);
    });
}

//--------------------------------------------------------------------------------------------------------------------//
//This function will compare the text of the game with the current text being typed in the textarea.
//If their value are the same, the border of the textarea will be green, else it`ll be red.
function inicializaMarcadores() {
    campo.on("input", function() {
    const frase = $(".frase").text();
        const digitado = campo.val();
        const comparavel = frase.substr(0, digitado.length);

        if (digitado === comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}

//--------------------------------------------------------------------------------------------------------------------//
//This function will begin the countdown to the end of the game, using the setInverval() function.
function inicializaCronometro() {
    campo.one("focus", function() {
    let tempoRestante = $("#tempo-digitacao").text();
        const cronometroID = setInterval(function () {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000);
    });
}

//--------------------------------------------------------------------------------------------------------------------//
//This function will be called when the timer hits zero, ending the game.
function finalizaJogo() {
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

//--------------------------------------------------------------------------------------------------------------------//
//This function will be called when the player hits the restart button, setting all it's attributes to default.
function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text(0);
    $("#contador-caracteres").text(0);
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}

//--------------------------------------------------------------------------------------------------------------------//

function atualizaTempoInicial(tempo) {
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);

}

//--------------------------------------------------------------------------------------------------------------------//


