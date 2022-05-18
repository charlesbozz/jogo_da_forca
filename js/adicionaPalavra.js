// Capturando os dados da adição de palvras

const btn = document.querySelector("#adiciona");

btn.addEventListener('click', function(event){
  event.preventDefault();
  const palavra = document.querySelector("#input-texto");
  const palavraAdicionada = palavra.value;
  categorias.ALEATORIO.push(palavraAdicionada.toUpperCase());
  palavra.value="";
  console.log(palavraAdicionada);
  console.log(categorias.ALEATORIO);
})
