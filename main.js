const desafiosIniciais = [
    { texto: "Imite um famoso.", categoria: "Engraçados" },
    { texto: "Conte uma piada para o grupo.", categoria: "Engraçados" },
    { texto: "Fale por 30 segundos com uma voz engraçada.", categoria: "Engraçados" },
    { texto: "Faça uma pose de modelo.", categoria: "Engraçados" },

    { texto: "Dance por 15 segundos sem música.", categoria: "Dança e imitação" },
    { texto: "Imite um animal até alguém adivinhar.", categoria: "Dança e imitação" },
    { texto: "Invente um passo de dança.", categoria: "Dança e imitação" },
    { texto: "Imite uma cena de filme.", categoria: "Dança e imitação" },

    { texto: "Qual foi a coisa mais engraçada que aconteceu com você?", categoria: "Perguntas" },
    { texto: "Para onde você viajaria agora?", categoria: "Perguntas" },
    { texto: "Qual talento você gostaria de aprender?", categoria: "Perguntas" },
    { texto: "Conte uma curiosidade sobre você.", categoria: "Perguntas" },

    { texto: "Faça um elogio sincero à pessoa à sua direita.", categoria: "Entre amigos" },
    { texto: "Invente um aperto de mão com alguém.", categoria: "Entre amigos" },
    { texto: "Crie um slogan engraçado para o grupo.", categoria: "Entre amigos" },
    { texto: "Escolha alguém para fazer uma pose engraçada com você.", categoria: "Entre amigos" }
];

// Copia os desafios iniciais para a lista principal.
let desafios = desafiosIniciais.map(desafio => ({ ...desafio }));

let historico = [];
let contador = 0;
let rotacaoAtual = 0;
let girando = false;

// Busca os elementos do HTML.
const roleta = document.getElementById("roleta");
const girarBtn = document.getElementById("girarBtn");
const desafioAtual = document.getElementById("desafioAtual");
const categoriaAtual = document.getElementById("categoriaAtual");
const contadorElemento = document.getElementById("contador");
const historicoElemento = document.getElementById("historico");
const filtroCategoria = document.getElementById("filtroCategoria");
const formDesafio = document.getElementById("formDesafio");
const novoDesafio = document.getElementById("novoDesafio");
const novaCategoria = document.getElementById("novaCategoria");
const avisoFormulario = document.getElementById("avisoFormulario");
const limparBtn = document.getElementById("limparBtn");
const mensagem = document.getElementById("mensagem");

// Filtra os desafios conforme a categoria selecionada.
function obterDesafiosFiltrados() {
    const categoriaEscolhida = filtroCategoria.value;

    if (categoriaEscolhida === "Todas") {
        return desafios;
    }

    if (categoriaEscolhida === "Criados por você") {
        return desafios.filter(desafio => desafio.criadoPorUsuario);
    }

    return desafios.filter(
        desafio => desafio.categoria === categoriaEscolhida
    );
}

// Sorteia um desafio e gira a roleta.
function girarRoleta() {
    if (girando) {
        return;
    }

    const listaDisponivel = obterDesafiosFiltrados();

    if (listaDisponivel.length === 0) {
        mensagem.textContent = "Adicione um desafio para essa categoria!";
        return;
    }

    girando = true;
    girarBtn.disabled = true;
    mensagem.textContent = "Girando...";

    // Escolhe um desafio aleatoriamente.
    const indice = Math.floor(Math.random() * listaDisponivel.length);
    const sorteado = listaDisponivel[indice];

    // Faz a roleta dar várias voltas.
    const grausAleatorios = Math.floor(Math.random() * 360);
    rotacaoAtual += 360 * 5 + grausAleatorios;

    roleta.style.transform = `rotate(${rotacaoAtual}deg)`;

    // Aguarda o fim da animação para mostrar o resultado.
    setTimeout(() => {
        desafioAtual.textContent = sorteado.texto;
        categoriaAtual.textContent = sorteado.categoria;

        contador++;
        contadorElemento.textContent = contador;

        historico.unshift({
            texto: sorteado.texto,
            categoria: sorteado.categoria
        });

        atualizarHistorico();

        mensagem.textContent = "Desafio sorteado! Sua vez!";

        girando = false;
        girarBtn.disabled = false;
    }, 4100);
}

// Atualiza o histórico na tela.
function atualizarHistorico() {
    historicoElemento.innerHTML = "";

    if (historico.length === 0) {
        const itemVazio = document.createElement("li");

        itemVazio.className = "historico-vazio";
        itemVazio.textContent =
            "Seus desafios sorteados aparecerão aqui.";

        historicoElemento.appendChild(itemVazio);
        return;
    }

    historico.forEach(desafio => {
        const item = document.createElement("li");

        item.textContent = desafio.texto;

        const categoria = document.createElement("span");
        categoria.className = "historico-categoria";
        categoria.textContent = desafio.categoria;

        item.appendChild(categoria);
        historicoElemento.appendChild(item);
    });
}

// Adiciona novos desafios escritos pelo usuário.
formDesafio.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const texto = novoDesafio.value.trim();

    if (texto === "") {
        avisoFormulario.textContent =
            "Digite um desafio antes de adicionar.";
        return;
    }

    desafios.push({
        texto: texto,
        categoria: novaCategoria.value,
        criadoPorUsuario: true
    });

    avisoFormulario.textContent =
        "Desafio adicionado com sucesso!";

    novoDesafio.value = "";
});

// Limpa o histórico dos sorteios.
limparBtn.addEventListener("click", function() {
    if (girando) {
        return;
    }

    historico = [];
    atualizarHistorico();

    mensagem.textContent = "Histórico limpo!";
});

// Executa o sorteio quando o botão é clicado.
girarBtn.addEventListener("click", girarRoleta);

// Atualiza a mensagem quando a categoria muda.
filtroCategoria.addEventListener("change", function() {
    const quantidade = obterDesafiosFiltrados().length;

    mensagem.textContent =
        `${quantidade} desafio(s) disponível(is) nessa categoria.`;
});