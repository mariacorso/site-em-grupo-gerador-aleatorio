/* ==========================================
   Roleta de Desafios - lógica do site
   ========================================== */

// 1) LISTA DE DESAFIOS (8 desafios, um para cada fatia da roleta)
const desafios = [
  "Faça 10 polichinelos agora!",
  "Conte uma piada para o grupo.",
  "Fale um trava-língua sem errar.",
  "Imite um animal por 10 segundos.",
  "Cante o refrão da sua música favorita.",
  "Fique 20 segundos em uma perna só.",
  "Diga 3 qualidades de cada colega.",
  "Faça uma dancinha de 15 segundos."
];

// 2) PEGANDO OS ELEMENTOS DO HTML (os IDs são os mesmos do index.html)
const roleta = document.getElementById("roleta");
const botao = document.getElementById("botao-girar");
const textoDesafio = document.getElementById("desafio");
const textoContador = document.getElementById("contador");

// 3) VARIÁVEIS DO PROGRAMA
const DURACAO = 4000;                               // tempo da animação em milissegundos (4 segundos)
const anguloFatia = 360 / desafios.length;          // tamanho de cada fatia em graus (45)
let contador = 0;                                   // quantos sorteios já foram concluídos
let rotacaoAtual = 0;                               // quanto a roleta já girou no total (em graus)
let girando = false;                                // true enquanto a roleta está girando

// 4) CRIA OS NÚMEROS DENTRO DE CADA FATIA
function criarRotulos() {
  for (let i = 0; i < desafios.length; i++) {
    const rotulo = document.createElement("span");
    rotulo.className = "rotulo";
    rotulo.textContent = i + 1;

    // ângulo do meio da fatia i (o gradiente começa no topo)
    const anguloMeio = i * anguloFatia + anguloFatia / 2;

    // centraliza, gira até o ângulo da fatia e afasta do centro
    rotulo.style.transform =
      "translate(-50%, -50%) rotate(" + anguloMeio + "deg) translateY(calc(var(--tamanho-roleta) * -0.34))";

    roleta.appendChild(rotulo);
  }
}

// 5) FUNÇÃO QUE GIRA A ROLETA (roda quando o botão é clicado)
function girarRoleta() {
  // Se já estiver girando, não faz nada (proteção extra contra cliques repetidos)
  if (girando) {
    return;
  }

  // Trava o botão durante a animação
  girando = true;
  botao.disabled = true;
  botao.textContent = "Girando...";
  textoDesafio.textContent = "Sorteando...";

  // Sorteia o número da fatia vencedora (de 0 até 7)
  const indice = Math.floor(Math.random() * desafios.length);

  // Calcula o ângulo do meio da fatia, com um pequeno desvio aleatório
  // para a seta não parar sempre exatamente no centro
  const desvio = (Math.random() - 0.5) * anguloFatia * 0.6;
  const anguloAlvo = indice * anguloFatia + anguloFatia / 2 + desvio;

  // Quanto a roleta precisa girar para esse ponto ficar embaixo da seta (no topo)
  const posicaoAtual = rotacaoAtual % 360;
  const falta = (360 - anguloAlvo - posicaoAtual + 720) % 360;

  // Soma 5 voltas completas para ficar bonito e acumula na rotação total
  rotacaoAtual = rotacaoAtual + 5 * 360 + falta;

  // Aplica a animação (a transição suave faz o giro acontecer)
  roleta.style.transition = "transform " + DURACAO + "ms cubic-bezier(0.17, 0.67, 0.12, 1)";
  roleta.style.transform = "rotate(" + rotacaoAtual + "deg)";

  // Quando a animação acabar, mostra o resultado
  setTimeout(function () {
    finalizarSorteio(indice);
  }, DURACAO + 100);
}

// 6) FUNÇÃO QUE MOSTRA O RESULTADO (roda quando a roleta para)
function finalizarSorteio(indice) {
  // Mostra o desafio sorteado
  textoDesafio.textContent = "Desafio " + (indice + 1) + ": " + desafios[indice];

  // Aumenta o contador em 1 e atualiza na tela
  contador = contador + 1;
  textoContador.textContent = contador;

  // Libera o botão de novo
  girando = false;
  botao.disabled = false;
  botao.textContent = "Girar roleta";
}

// 7) INICIO: cria os números e liga o botão à função
criarRotulos();
botao.addEventListener("click", girarRoleta);