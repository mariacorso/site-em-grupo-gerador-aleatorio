const desafios = [
    "Imite um animal!",
    "Conte uma piada!",
    "Dance por 10 segundos!",
    "Cante um trecho de música!",
    "Fale uma palavra em inglês!",
    "Faça uma careta!",
    "Imite alguém famoso!",
    "Conte uma curiosidade!",
    "Fique em uma perna por 10 segundos!",
    "Faça uma pose engraçada!"
];

let contador = 0;
let rotacao = 0;
let girando = false;

const roleta = document.getElementById("roleta");
const botao = document.getElementById("sortear");
const resultado = document.getElementById("resultado");
const textoContador = document.getElementById("contador");

botao.addEventListener("click", function() {
    if (girando) {
        return;
    }

    girando = true;
    botao.disabled = true;

    const numero = Math.floor(Math.random() * desafios.length);
    const desafioEscolhido = desafios[numero];

    rotacao += 720 + Math.floor(Math.random() * 360);
    roleta.style.transform = "rotate(" + rotacao + "deg)";

    resultado.textContent = "Girando...";

    setTimeout(function() {
        resultado.textContent = desafioEscolhido;

        contador++;
        textoContador.textContent = contador;

        girando = false;
        botao.disabled = false;
    }, 2000);
});