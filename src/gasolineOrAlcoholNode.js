let gasolineValue = null;
let alcoholValue = null;
const WRITE_GASOLINE_MESSAGE = 'Insira o valor da gasolina';
const WRITE_ALCOHOL_MESSAGE = 'Insira o valor do alcohol';
const WELCOME_MESSAGE = 'BEM VINDO CARO USUÁRIO';
const BYE_MESSAGE = 'Muito Obrigado, volte novamente';
const GASOLINE_IS_THE_BEST_MESSAGE = 'Gasolina é a melhor opção';
const ALCOHOL_IS_THE_BEST_MESSAGE = 'Álcool é a melhor opção';
const GASOLINE_OR_ALCOHOL_MESSAGE =
  'Você pode comprar tanto Álcool ou Gasolina';
const TRY_AGAIN_MESSAGE =
  '\n \n Você gostaria de usar o aplicativo novamente? \n Escreva sim ou não';
const TRY_AGAIN_MESSAGE_ERROR = 'Sua resposta foi diferente de sim ou não';

const GASOLINE_ALCOHOL_CONSTANT = 0.7;
const IS_GASOLINE_BEST = 1;
const IS_ALCOHOL_BEST = -1;
const IS_GASOLINE_OR_ALCOHOL = 0;
let userIsUsingTheApp = true;

console.log(WELCOME_MESSAGE);
askUserAboutValues();

while (userIsUsingTheApp === true) {
  handleUserIteration();
}

function handleUserIteration() {
  let result = calcGasolineOrAlcohol();
  let bestOption = checkTheBestOption(result);
  showAtConsoleTheBestOption(bestOption);
  if (checkIfUserWantsContinueUsingTheApp()) {
    askUserAboutValues();
  } else {
    sayByeEndFinish();
  }
}

function askUserAboutValues() {
  gasolineValue = prompt(WRITE_GASOLINE_MESSAGE);
  alcoholValue = prompt(WRITE_ALCOHOL_MESSAGE);
}

function sayByeEndFinish() {
  userIsUsingTheApp = false;
  console.log(BYE_MESSAGE);
}

function calcGasolineOrAlcohol() {
  if (isNaN(gasolineValue) || gasolineValue < 0) {
    return null;
  }
  if (isNaN(alcoholValue) || alcoholValue < 0) {
    return null;
  }

  return alcoholValue / gasolineValue;
}

function showAtConsoleTheBestOption(result) {
  if (result === IS_GASOLINE_BEST) {
    console.log(GASOLINE_IS_THE_BEST_MESSAGE);
  } else {
    if (result === IS_ALCOHOL_BEST) {
      console.log(ALCOHOL_IS_THE_BEST_MESSAGE);
    } else {
      console.log(GASOLINE_OR_ALCOHOL_MESSAGE);
    }
  }
}

function checkTheBestOption(resultOfAlcoholDividedByGasoline) {
  if (isGasolineBestOption(resultOfAlcoholDividedByGasoline)) {
    return IS_GASOLINE_BEST;
  } else {
    if (isAlcoholBestOption(resultOfAlcoholDividedByGasoline)) {
      return IS_ALCOHOL_BEST;
    } else {
      return IS_GASOLINE_OR_ALCOHOL;
    }
  }
}

function isGasolineBestOption(resultOfAlcoholDividedByGasoline) {
  return resultOfAlcoholDividedByGasoline > GASOLINE_ALCOHOL_CONSTANT;
}

function isAlcoholBestOption(resultOfAlcoholDividedByGasoline) {
  return resultOfAlcoholDividedByGasoline < GASOLINE_ALCOHOL_CONSTANT;
}

function checkIfUserWantsContinueUsingTheApp() {
  let answer = '';
  while (answer !== 'sim' || answer !== 'nao') {
    answer = prompt(TRY_AGAIN_MESSAGE);
    answer = answer.toString().toLowerCase().trim();

    if (answer !== 'sim' && answer !== 'não') {
      console.log(TRY_AGAIN_MESSAGE_ERROR);
    } else {
      break;
    }
  }

  return answer === 'sim';
}
