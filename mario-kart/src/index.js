const player1 = {
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};

const player2 = {
  NOME: "Luigi",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
};

const player3 = {
  NOME: "Peach",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 3,
  PONTOS: 0,
};

const player4 = {
  NOME: "Yoshi",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 4,
  PONTOS: 0,
};

const player5 = {
  NOME: "Bowser",
  VELOCIDADE: 5,
  MANOBRABILIDADE: 2,
  PODER: 5,
  PONTOS: 0,
};

const player6 = {
  NOME: "Donkey Kong",
  VELOCIDADE: 5,
  MANOBRABILIDADE: 3,
  PODER: 4,
  PONTOS: 0,
};

function rolldice() {
  return Math.floor(Math.random() * 6) + 1;
  //Math: uma função matematica do js.
  //Random: para gerar numero aleatoriamente.
  //math.floor: arredonda o numero para baixo
}

//função para exibir o resultado do dado e do bloco sorteado de maneira mais clean.
async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 Rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}‼️\n`,
  );
  //passando para o atributo o valor do dado mais o valor da habilidade do personagem, para mostrar o resultado.
}

//função para sortear um bloco aleatorio. (reta, curva ou confronto)
function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }
  return result;
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁🚨 Rodada: ${round} 🚨🏁`);

    let block = await getRandomBlock();
    console.log(`Bloco sorteado: ${block}‼ \n`);
    //sortear bloco, chamando a função getRandomBlock para gerar,
    //utilizando await para esperar a função terminar antes de prosseguir com a execução do código.

    //resultado dos dados
    let diceResult1 = await rolldice();
    let diceResult2 = await rolldice();

    //testes de habilidades irão guardar o valor da habilidade e do dado.
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

      //passagem dos dados para a função de exibição do resultado.
      await logRollResult(
        character1.NOME,
        "Velocidade",
        diceResult1,
        character1.VELOCIDADE,
      );
      await logRollResult(
        character2.NOME,
        "Velocidade",
        diceResult2,
        character2.VELOCIDADE,
      );
    }

    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

      await logRollResult(
        character1.NOME,
        "Manobrabilidade",
        diceResult1,
        character1.MANOBRABILIDADE,
      );
      await logRollResult(
        character2.NOME,
        "Manobrabilidade",
        diceResult2,
        character2.MANOBRABILIDADE,
      );
    }
    if (block === "CONFRONTO") {
      let powerResult1 = diceResult1 + character1.PODER;
      let powerResult2 = diceResult2 + character2.PODER;

      console.log(`${character1.NOME} confrontou com ${character2.NOME} \n`);

      await logRollResult(
        character1.NOME,
        "Poder",
        diceResult1,
        character1.PODER,
      );
      await logRollResult(
        character2.NOME,
        "Poder",
        diceResult2,
        character2.PODER,
      );

      if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
        console.log(
          `${character1.NOME} venceu o confronto! ${character2.NOME} perdeu um ponto! 🐢`,
        );
        character2.PONTOS--;
      }

      if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
        console.log(
          `${character2.NOME} venceu o confronto! ${character1.NOME} perdeu um ponto! 🐢`,
        );
        character1.PONTOS--;
      }

      //IF TERNÁRIOS,
      //character2.PONTOS -=
      //powerResult1 > powerResult2 && character2.PONTOS > 0 ? 1 : 0;
      //character1.PONTOS -=
      //powerResult2 > powerResult1 && character1.PONTOS > 0 ? 1 : 0;

      console.log(
        powerResult2 === powerResult1
          ? `‼️🥊 CONFRONTO EMPATADO, NENHUM PONTO PERDIDO! 🥊‼️\n`
          : "",
      );
    }

    //VERIFICAÇÃO DO VENCEDOR.

    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`🏁🚨 ${character1.NOME} marcou um ponto! 🚨🏁\n`);
      character1.PONTOS++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`🏁🚨 ${character2.NOME} marcou um ponto! 🚨🏁\n`);
      character2.PONTOS++;
    }
  }

  console.log("---------------------------------------------\n");
}

//função para declaração do vencedor.
async function declareWinner(character1, character2) {
  console.log(`RESULTADO FINAL:`);
  console.log(`${character1.NOME}: ${character1.PONTOS} pontos`);
  console.log(`${character2.NOME}: ${character2.PONTOS} pontos \n`);

  if (character1.PONTOS > character2.PONTOS)
    console.log(`🏆🎉 ${character1.NOME} é o vencedor! 🎉🏆\n`);
  else if (character2.PONTOS > character1.PONTOS)
    console.log(`🏆🎉 ${character2.NOME} é o vencedor! 🎉🏆\n`);
  else console.log(`‼️🤝 A CORRIDA TERMINOU EM EMPATE! 🤝‼️`);
}

//função principal (main) que chama / faz referencia para todas outras funções.
//Colocar essa função entre paresenteses e adicionar () no final para que ela seja executada imediatamente, sem a necessidade de chama-la.
(async function main() {
  //utilizar crase para poder adicionar o sifrão e chaves para chamar o nome do jogador dentro da string
  console.log(
    `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...🚨🏁 \n`,
  );

  //passar parametros para a função playRaceEngine, que é onde toda a lógica do jogo vai acontecer
  //await: para esperar a função playRaceEngine terminar antes de continuar a execução do código. Por isso utilizamos funções async.
  await playRaceEngine(player1, player2);

  await declareWinner(player1, player2);
})();
