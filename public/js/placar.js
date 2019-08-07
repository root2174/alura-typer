$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(syncPlacar);
const placar = $(".placar");

//--------------------------------------------------------------------------------------------------------------------//

function inserePlacar() {
    const corpoTabela = placar.find("tbody");
    const usuario = $("#usuarios").val();
    const numPalavras = $("#contador-palavras").text();

    const linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);
    corpoTabela.append(linha);
    placar.slideToggle(900);
    scrollPlacar();
}

//--------------------------------------------------------------------------------------------------------------------//

function novaLinha(usuario, palavras) {
    const linha = $("<tr>");
    const colunaUsuario = $("<td>").text(usuario);
    const colunaPalavras = $("<td>").text(palavras);
    const colunaRemover = $("<td>");

    const link = $("<a>").addClass("botao-remover").attr("href", "#");
    const icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

//--------------------------------------------------------------------------------------------------------------------//

function removeLinha() {
    event.preventDefault();
    const linha = $(this).parent().parent();
    linha.fadeOut();
    setInterval(() => {
        linha.remove();
    }, 400);
}

//--------------------------------------------------------------------------------------------------------------------//

function mostraPlacar() {
    placar.stop().slideToggle(900);
}

//--------------------------------------------------------------------------------------------------------------------//

function scrollPlacar() {
    let top = placar.offset().top;
    $("body").animate({
        scrollTop: `${top}px`,
    }, 1000)
}

//--------------------------------------------------------------------------------------------------------------------//

function syncPlacar() {
    let placar = [];
    let linhas = $("tbody>tr");
    linhas.each(function () {
        let usuario = $(this).find("td:nth-child(1)").text();
        let palavras = $(this).find("td:nth-child(2)").text();

        let score = {
            usuario: usuario,
            pontos: palavras
        };
        placar.push(score);
    });
    let dados = {
        placar: placar
    };
    $.post("http://localhost:3000/placar", dados, () => {
        console.log("Postou no servidor.");
        $(".tooltip").tooltipster("open");
    }).always(function() {
        setTimeout(function () {
        $(".tooltip").tooltipster("close");
        },3000);
    }).fail(function () {
        $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar, tente novamente!");

    });
}

//--------------------------------------------------------------------------------------------------------------------//

function atualizaPlacar(){
    $.get("http://localhost:3000/placar",(data)=> {
        $(data).each(function(){
            let linha = novaLinha(this.usuario, this.pontos);
            $("tbody").append(linha);
            linha.find(".botao-remover").click(removeLinha);
        });
    });
}

