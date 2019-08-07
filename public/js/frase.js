
//--------------------------------------------------------------------------------------------------------------------//

$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

//--------------------------------------------------------------------------------------------------------------------//

function fraseAleatoria() {
    $("#spinner").show();
    $(".frase").hide();
    $.get("http://localhost:3000/frases", trocaFraseAleatoria)
        .fail(() => {
            $("#erro").show();
            setTimeout(() => {
                $("#erro").fadeOut();
            }, 1500);
        }).always(() => {
            $("#spinner").hide();
            $(".frase").show();
    });
}

//--------------------------------------------------------------------------------------------------------------------//

function trocaFraseAleatoria(data) {
    let frase = $(".frase");
    let numeroAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}

//--------------------------------------------------------------------------------------------------------------------//

function buscaFrase() {
    $("#spinner").show();
    $(".frase").hide();
    const fraseId = $("#frase-id").val();
    const dados = {
        id: fraseId
    };
    $.get("http://localhost:3000/frases", dados, trocaFrase)
        .fail(() => {
            $("#erro").show();
            setTimeout(() => {
                $("#erro").fadeOut();
            }, 1500);
        }).always(() => {
        $("#spinner").hide();
        $(".frase").show();
    });
}

//--------------------------------------------------------------------------------------------------------------------//

function trocaFrase(data) {
    let frase = $(".frase");
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}