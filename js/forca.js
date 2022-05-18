const categoria = document.querySelector("#category"); // Elementos HTML referente a categoria.
const letrasErradas = document.querySelector(".wrongLetters"); // Elementos HTML referente a lista de letras erradas.
const palavraInterface = document.querySelector(".dashes"); // Elemento HTML referente a palavra escondida. Além disso, vamos usar para passar mensagens do jogo.
const olhos = Array.from(document.querySelectorAll(".eyes")); // Array que contém os elementos que criam os ohos do personagem.
let btNovoJogo = document.querySelector(".buttonNewGame"); // Acessando o botão de novo jogo.

let partesBoneco= Array.from(document.querySelectorAll("#person div")); // Array com elementos que criam as partes do corpo.
partesBoneco = partesBoneco.slice (2, partesBoneco.length);

let palavraProposta; // Palavra atual.
let letrasErradasArray = []; // Array com a lista das letras erradas.
let indiceBoneco=0; // Indice que mostra as partes do corpo.
const numTentativas = 7; // Número de chances do jogador.
const opacidadeOlhos = 0.3; // Indice de transparência dos olhos.

const  categorias = {
  PAISES: ["BRASIL","HOLANDA","JAMAICA","ARGENTINA","URUGUAI","CHILE","NORUEGA","DINAMARCA","PARAGUAI","HONDURAS"],
  CARROS: ["GOLF","PUNTO","GOL","UNO","VOYAGE","SANDERO","Q5","Z4","TUCSON","SPORTAGE"],
  FRUTA: ["BANANA","ABACAXI","MORANGO","UVA","MANGA","JABUTICABA","GOIABA","LARANJA","MAMAO","MELAO"],
  ANIMAIS: ["MACACO","TIGRE","CACHORRO","GATO","HIPOPOTAMO","GIRAFA","LEAO","ELEFANTE","COBRA","CROCODILO"],
  PROFISSOES: ["ADVOGADO","MEDICO","ENGENHEIRO","ADMINISTRADOR","PINTOR","ENCANADOR","MECANICO","BOMBEIRO","ENFERMEIRA","DENTISTA"],
  ESPORTES: ["BASQUETE","VOLEI","FUTEBOL","CORRIDA","SALTO","CURLIN","PATINACAO","SNOWBOARD","SURF","CANOAGEM"],
  CORES: ["AZUL","AMARELO","VERMELHO","ROSA","PRETO","BRANCO","ROXO","CINZA","VERDE","MARROM"],
  ALEATORIO: []
};
// A função abaixo, retorna cada uma das categorias de palavras.
function retornaArrayCategorias() {
  return Object.keys(categorias);
}

// A função abaixo, escolhe a categoria a qual pertence a palavra oculta.
function retornaCategoria() {
  const arrayCategorias = retornaArrayCategorias();
  let indiceCategoria = Math.floor(Math.random() * arrayCategorias.length);
  return arrayCategorias[indiceCategoria];
}
// A função abaixo, pega a categoria escolhida e mostra na tela do jogo.
function exibeCategoria() {
  categoria.innerHTML = retornaCategoria();

}

function definePalavraProposta() {
  const arrayPalavras = categorias[categoria.innerHTML];
  let indicePalavra = Math.floor(Math.random() * arrayPalavras.length);
  palavraProposta = arrayPalavras[indicePalavra];
  console.log(palavraProposta);
  ocultaPalavra();

}

function ocultaPalavra() {
  let palavraOcultada = "";
  for (let i = 0; i < palavraProposta.length; i++) {
    palavraOcultada += "-";

  }
  exibePalavraInterface(palavraOcultada);

}

function exibePalavraInterface(palavra) {

  palavraInterface.innerHTML = palavra;
}


function tentativa(letra) {
  if (palavraProposta.includes(letra)) {
    atualizaPalavraInterface(letra);

  } else {
    letrasErradasArray.push(letra);
    letrasErradas.innerHTML = "Letras erradas:" + letrasErradasArray;
    if (partesBoneco.length > indiceBoneco) {
      desenhaBoneco();
    }

  }
  verificaFimDeJogo();
}

function verificaFimDeJogo() {
  if (!palavraInterface.innerHTML.includes("-")) {
    exibePalavraInterface("VOCÊ VENCEU! PARABÉNS!");
    window.removeEventListener("Keypress", retornaLetra);
  } else if (letrasErradasArray.length >= numTentativas) {
    desenhaOlhos();
    exibePalavraInterface("FIM DE JOGO! VOCÊ PERDEU!");
    window.removeEventListener("Keypress", retornaLetra);
  }
}

function atualizaPalavraInterface(letra) {
  let palavraAux = "";
  for (let i=0; i < palavraProposta.length; i++) {
    if (palavraProposta[i] === letra) {
      palavraAux += letra;
    } else if (palavraInterface.innerHTML[i] != "-") {
      palavraAux += palavraInterface.innerHTML[i];
    } else {
      palavraAux += "-";
    }
  }
  exibePalavraInterface(palavraAux);
}

function retornaLetra(a){
  tentativa(a.key.toUpperCase());
}

function desenhaBoneco(){
  partesBoneco[indiceBoneco].classList.remove("hide");
  indiceBoneco++;

}

function desenhaOlhos(){
  olhos.forEach((olho => {
    olho.style.opacity = 1;
    olho.style.zIndex = 10;
  }));
}

function ocultaBoneco(){
  olhos.forEach((olho => {
    olho.style.opacity = opacidadeOlhos;
  }));
  partesBoneco.forEach(parteBoneco => {
    parteBoneco.classList.add("hide");
  });
}





function iniciaJogo() {
  letrasErradasArray = [];
  exibeCategoria();
  definePalavraProposta();
  letrasErradas.innerHTML = "Letras Erradas:";
  window.addEventListener("keypress", retornaLetra);
}
window.addEventListener("Load", iniciaJogo);
