/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  Keyboard
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {FilledTextField} from 'rn-material-ui-textfield';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [gasolineOrAlcohol, setGasolineOrAlcohol] = useState(null);

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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

  /*
  console.log(WELCOME_MESSAGE);
  askUserAboutValues();

  while (userIsUsingTheApp === true) {
    handleUserIteration();
  }
  */

  function handleUserIteration() {
    let result = calcGasolineOrAlcohol();
    let bestOption = checkTheBestOption(result);
    showAtConsoleTheBestOption(bestOption);
    /*
    if (checkIfUserWantsContinueUsingTheApp()) {
      askUserAboutValues();
    } else {
      sayByeEndFinish();
    }
     */
  }

  function askUserAboutValues() {
    //  gasolineValue = prompt(WRITE_GASOLINE_MESSAGE);
    //  alcoholValue = prompt(WRITE_ALCOHOL_MESSAGE);
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
      updateUIToGasolineBestOption();
    } else {
      if (result === IS_ALCOHOL_BEST) {
        console.log(ALCOHOL_IS_THE_BEST_MESSAGE);
        updateUIToAlcoolBestOption();
      } else {
        console.log(GASOLINE_OR_ALCOHOL_MESSAGE);
        updateUIToGasolineOrAlcool();
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

  // UI Funcions

  function onGasolineTextChange(value) {
    gasolineValue = value;
  }

  function onAlcoholTextChange(value) {
    alcoholValue = value;
  }

  function onPressCalcButton() {
    Keyboard.dismiss();
    handleUserIteration();
  }

  function updateUIToAlcoolBestOption() {
    setGasolineOrAlcohol(IS_ALCOHOL_BEST);
  }

  function updateUIToGasolineBestOption() {
    setGasolineOrAlcohol(IS_GASOLINE_BEST);
  }

  function updateUIToGasolineOrAlcool() {
    setGasolineOrAlcohol(IS_GASOLINE_OR_ALCOHOL);
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <FilledTextField
          style={styles.textInput}
          containerStyle={styles.textInputContainer}
          inputContainerStyle={styles.textInputContainer}
          labelTextStyle={styles.styleLabel}
          label="Digite o preço da gasolina"
          baseColor="#000"
          tintColor="#000"
          onChangeText={value => onGasolineTextChange(value)}
        />

        <FilledTextField
          style={styles.textInput}
          containerStyle={styles.secondTextInputContainer}
          inputContainerStyle={styles.textInputContainer}
          labelTextStyle={styles.styleLabel}
          label="Digite o preço do álcool"
          baseColor="#000"
          tintColor="#000"
          keyboardType="number-pad"
          onChangeText={value => onAlcoholTextChange(value)}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => onPressCalcButton()}>
          <Text>Calcular</Text>
        </TouchableOpacity>
        <Text style={styles.textStyle}>
          {gasolineOrAlcohol === IS_GASOLINE_OR_ALCOHOL
            ? 'Você pode escolher o que achar melhor'
            : ' É mais vantajoso comprar:'}
        </Text>

        {gasolineOrAlcohol == null ? null : gasolineOrAlcohol ===
          IS_GASOLINE_BEST ? (
          <View style={styles.fuelContainer}>
            <Text style={styles.alcoholText}>Gasolina</Text>
            <Image
              source={{
                uri: 'https://img2.icarros.com/dbimg/imgnoticia/4/28901_1',
              }}
              style={{height: 320, width: 320}}
            />
          </View>
        ) : gasolineOrAlcohol === IS_ALCOHOL_BEST ? (
          <View style={styles.fuelContainer}>
            <Text style={styles.alcoholText}>Alcool (Etanol)</Text>
            <Image
              source={{
                uri:
                  'https://cdn2.ecycle.com.br/images/materias/Atitude/2013-06/etanol-celulosico-750.jpg',
              }}
              style={{height: 320, width: 320}}
            />
          </View>
        ) : (
          <View style={styles.fuelContainer}>
            <Text style={styles.alcoholText}>Alcool (Etanol) Ou Gasolina</Text>
            <Image
              source={{
                uri:
                  'https://twt-thumbs.washtimes.com/media/image/2015/11/30/Ethanol_in_Gasoline.JPEG-0066e_c0-90-4632-2790_s885x516.jpg?885f51d3ff156c696d5c7e5e96e5c7c63f281cf6',
              }}
              style={{height: 320, width: 320}}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  textInput: {
    marginTop: 20,
  },
  textInputContainer: {
    height: 50,
    backgroundColor: '#fff',
    marginTop: 24,
  },
  secondTextInputContainer: {
    height: 50,
    backgroundColor: '#fff',
    marginTop: 32,
  },
  styleLabel: {
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0.32,
    color: '#171b21',
  },
  sendButton: {
    marginTop: 64,
    height: 48,
    marginLeft: 24,
    marginRight: 24,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    marginTop: 32,
    fontSize: 20,
    alignSelf: 'center',
  },
  fuelContainer: {
    alignItems: 'center',
    marginTop: 28,
  },
  alcoholText: {
    fontSize: 18,
    color: '#33cc33',
    fontWeight: 'bold',
  },
});

export default App;
