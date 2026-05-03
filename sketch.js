let estado = "inicio"
//dados das cartas
let cartas = []
let tamanhoCarta = 100
let larguraCarta = 100

// dados para jogar
let primeira = null;
let segunda = null;
let podeClicar = true;

//sistema de pontos 
let pontos = 0
let acertos = 0

largura = 800
altura = 800
function setup() {
  createCanvas(largura, altura);
}

function draw() {
  background("white");
// mudança de telas
  if (estado === "inicio") {
    telaInicio();
  } else if (estado === "instrucoes") {
    telaInstrucoes();
  } else if (estado === "jogando") {
    telaJogo();
  } else if (estado === "gameover") {
    telaGameOver();
  }
}
//captação de mouse por tela
function mousePressed(){
  if (estado === "inicio") 
    cliqueInicio();
  else if (estado === "instrucoes") 
    cliqueInstrucoes();
  else if (estado === "jogando") 
    cliqueJogo();
  else if (estado === "gameover") 
    cliqueGameOver();
  
}

//loby
function telaInicio (){
  //titulo
  textAlign(CENTER)
  textSize (40)
  text ("JOGO DA MEMÓRIA", largura/2,100)
  
  //INICIO
  fill("green")
  rect(largura/4,200,largura/2,100)
  textAlign(CENTER)
  textSize (40)
  fill("black")
  text ("JOGAR",largura/2,250)
  
  //REGRAS
  fill("green")
  rect(largura/4,400,largura/2,100)
  textAlign(CENTER)
  textSize (40)
  fill("black")
  text (" INTRUÇÕES",largura/2,450)
  
}
//mouse loby
function cliqueInicio (){
  //jogar
    if (mouseX > 200 && mouseX < 600 && mouseY > 200 && mouseY < 300) {
      criarCartas ();
    //zerar pontos
      pontos = 0;
      acertos = 0;
    estado = "jogando";
    }else if (mouseX > 200 && mouseX < 600 && mouseY > 400 && mouseY < 500) {
    
    estado = "instrucoes";
  
}
  
}
//tela de intruções
function telaInstrucoes(){
  textAlign(CENTER)
  textSize(30)
  text("Escolha: Clique em uma carta para revelá-la. \nCombine: Clique em uma segunda carta para encontrar o par. \nResultado: Se forem iguais, você marca pontos e elas permanecem abertas. Se forem diferentes, elas se fecharão para uma nova tentativa.",100,150,600)
  //voltar
  fill("green")
  rect(largura/4,600,largura/2,100)
  textAlign(CENTER)
  textSize (40)
  fill("black")
  text (" VOLTAR",largura/2,650)
}

//mouse instruções
function cliqueInstrucoes (){
  if (mouseX > 200 && mouseX < 600 && mouseY > 600 && mouseY < 700){
    estado = "inicio"
      
      }  
}
//tela da partida
function telaJogo (){
  background (100,100,100);
  desenharCarta()
  
  //pontuação atual
  fill("white");
  textSize(25);
  textAlign(LEFT);
  text("Pontos: " + pontos, 20, 40);
  
}
//criar cartas
function desenharCarta (){
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {

      let posX = 125 + x * 150;
      let posY = 100 + y * 150;
      
//carta escolhida/ encontrada
     if (cartas[y][x].virada || cartas[y][x].encontrada) {
      fill("white");
      rect(posX, posY, tamanhoCarta, larguraCarta);

      //personalizando os pares
       if (cartas[y][x].valor == 1){
         fill ("red");
         circle(posX + tamanhoCarta / 2,posY + larguraCarta/ 2,50,50)
       } else if (cartas[y][x].valor == 2){
         fill("blue")
         circle(posX + tamanhoCarta / 2,posY + larguraCarta/ 2,50,50)
       }  else if (cartas[y][x].valor == 3){
         fill("yellow")
         circle(posX + tamanhoCarta / 2,posY + larguraCarta/ 2,50,50)
       } else if (cartas[y][x].valor == 4){
         fill("pink")
         circle(posX + tamanhoCarta / 2,posY + larguraCarta/ 2,50,50)
       } else if (cartas[y][x].valor == 5){
         fill("green")
         circle(posX + tamanhoCarta / 2,posY + larguraCarta/ 2,50,50)
       } else if (cartas[y][x].valor == 6){
         fill("purple")
         circle(posX + tamanhoCarta / 2,posY + larguraCarta/ 2,50,50)
       } else if (cartas[y][x].valor == 7){
         fill("orange")
         circle(posX + tamanhoCarta / 2,posY + larguraCarta/ 2,50,50)
       } else if (cartas[y][x].valor == 8){
         fill("black")
         circle(posX + tamanhoCarta / 2,posY + larguraCarta/ 2,50,50)
       }
// cara virada para baixo
    } else {
      fill("black");
      rect(posX, posY, tamanhoCarta, larguraCarta);
}
    }
  }
}
// jogabilidade
function cliqueJogo(){
//impede escolher uma  terceira carta enquanto função executa
  if (!podeClicar) return;
//procura carta escolhida
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {

      let posX = 125 + x * 150;
      let posY = 100 + y * 150;

      if (
        mouseX > posX &&
        mouseX < posX + tamanhoCarta &&
        mouseY > posY &&
        mouseY < posY + larguraCarta
      ) {
// guarda carta escolhida
        let carta = cartas[y][x];
// verifica se ela é valida
        if (!carta.virada && !carta.encontrada) {

          carta.virada = true;
// primeira carta
          if (primeira === null) {
            primeira = carta;
          } 
//segunda carta
          else if (segunda === null) {
            segunda = carta;
            podeClicar = false;
// tempo para ver
            setTimeout(verificarPar, 1000);
          }

        }

      }

    }
  }

}
//cria e guarda quais os pares de cartas
function criarCartas() {
  cartas = [];

  let valores = [];

  // cria pares (1 a 8)
  for (let i = 1; i <= 8; i++) {
    valores.push(i);
    valores.push(i);
  }

  // embaralha
  valores = shuffle(valores);

  let contador = 0;
//espalha os pares
  for (let y = 0; y < 4; y++) {
    let linha = [];

    for (let x = 0; x < 4; x++) {
      linha.push({
        valor: valores[contador],
        virada: false,
        encontrada: false
      });

      contador++;
    }
// add as propriedades as cartas
    cartas.push(linha);
  }
}
// verifica jogada
function verificarPar() {

  if (primeira.valor === segunda.valor) {
    primeira.encontrada = true;
    segunda.encontrada = true;
    
    pontos += 10
    acertos += 1
    //terminou partida
    if (acertos === 8){
      estado = "gameover"
        }
  } else {
    primeira.virada = false;
    segunda.virada = false;
    pontos -= 2
  }
//esconde cartas de volta
  primeira = null;
  segunda = null;
  podeClicar = true;
}
//tela de fim de jogo
function telaGameOver() {
  background("white");

  textAlign(CENTER);
  textSize(40);
  fill("black");
  text("FIM DE JOGO", largura/2, 250);

  textSize(30);
  text("Pontuação: " + pontos, largura/2, 320);

  // botão voltar
  fill("green");
  rect(largura/4, 450, largura/2, 100);

  fill("black");
  textSize(30);
  text("REINICIAR", largura/2, 510);
}
//mouse fim de jogo
function cliqueGameOver() {
  if (mouseX > 200 && mouseX < 600 && mouseY > 450 && mouseY < 550) {
    estado = "inicio";
  }
}