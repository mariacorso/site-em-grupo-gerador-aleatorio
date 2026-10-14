const personagens = [
  {
    nome: "Seraphine", estilo: "AVENTUREIRA",
    personalidade: "Determinada e curiosa",
    poder: "Manipular elementos", cor: "Azul escuro",
    frase: "Ela encontra possibilidades onde todos veem o caos.",
    imagem: "photo-1534528741775-53994a69daeb"
  },
  {
    nome: "Kael", estilo: "MAGO",
    personalidade: "Reservado e inteligente",
    poder: "Ler pensamentos", cor: "Violeta",
    frase: "Seus maiores segredos estão além do olhar.",
    imagem: "photo-1500648767791-00dcc994a43e"
  },
  {
    nome: "Elys", estilo: "EXPLORADORA",
    personalidade: "Livre e criativa",
    poder: "Teletransporte", cor: "Prata",
    frase: "Nenhum horizonte é distante demais para ela.",
    imagem: "photo-1524504388940-b1c1722653e1"
  },
  {
    nome: "Darian", estilo: "GUARDIÃO",
    personalidade: "Leal e corajoso",
    poder: "Controlar o tempo", cor: "Preto",
    frase: "Ele protege aquilo que o mundo esquece.",
    imagem: "photo-1506794778202-cad84cf45f1d"
  }
];

let atual = null;
let quantidade = 0;
let favoritos = [];

function gerar() {
  atual = personagens[Math.floor(Math.random() * personagens.length)];

  document.getElementById("nome").textContent = atual.nome;
  document.getElementById("estilo").textContent = atual.estilo;
  document.getElementById("personalidade").textContent = atual.personalidade;
  document.getElementById("poder").textContent = atual.poder;
  document.getElementById("cor").textContent = atual.cor;
  document.getElementById("frase").textContent = "“" + atual.frase + "”";

  const retrato = document.getElementById("portrait");
  retrato.style.backgroundImage =
    `url(https://images.unsplash.com/${atual.imagem}?auto=format&fit=crop&w=700&q=80)`;
  retrato.textContent = "";

  quantidade++;
  document.getElementById("contador").textContent =
    quantidade + " personagens descobertos";
  document.getElementById("aviso").textContent = "";
}

function favoritar() {
  if (!atual) {
    document.getElementById("aviso").textContent =
      "Gere um personagem primeiro.";
    return;
  }

  if (favoritos.some(p => p.nome === atual.nome)) {
    document.getElementById("aviso").textContent =
      "Esse personagem já está nos favoritos.";
    return;
  }

  favoritos.push(atual);

  document.getElementById("favoritos").textContent =
    favoritos.map(p => p.nome + " — " + p.estilo).join("  |  ");

  document.getElementById("total").textContent = favoritos.length;
  document.getElementById("aviso").textContent = "Favorito salvo!";
}

document.getElementById("gerar").addEventListener("click", gerar);
document.getElementById("favoritar").addEventListener("click", favoritar);