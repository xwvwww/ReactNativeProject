import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const WORDS = ["hello", "world", "react", "native", "javascript", "mobile"]; // массив слов для угадывания
const MAX_GUESSES = 10; // максимальное количество попыток

const Game = () => {
  const [currentWord, setCurrentWord] = useState(
    WORDS[Math.floor(Math.random() * WORDS.length)]
  ); // загаданное слово
  const [guess, setGuess] = useState(""); // текущее предположение пользователя
  const [guesses, setGuesses] = useState([]); // массив предыдущих попыток пользователя

  const handleGuess = () => {
    if (guess === "") {
      return; // пользователь ничего не ввел, ничего не делаем
    }

    if (guesses.includes(guess)) {
      return; // пользователь уже вводил это слово, ничего не делаем
    }

    const newGuesses = [...guesses, guess];
    setGuesses(newGuesses);

    if (currentWord.includes(guess)) {
      // правильный ответ
      if (
        currentWord.split("").every((letter) => newGuesses.includes(letter))
      ) {
        alert(
          `Поздравляем, вы выиграли! Загаданное слово: ${currentWord.toUpperCase()}`
        );
        startNewGame();
      } else {
        setGuess("");
      }
    } else {
      // неправильный ответ
      setGuess("");
      if (newGuesses.length === MAX_GUESSES) {
        alert(
          `Вы проиграли. Загаданное слово было "${currentWord.toUpperCase()}". Попробуйте еще раз!`
        );
        startNewGame();
      }
    }
  };

  const startNewGame = () => {
    setCurrentWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
    setGuess("");
    setGuesses([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Word Guesser</Text>
      <View style={styles.wordContainer}>
        {currentWord.split("").map((letter, index) => (
          <View key={index} style={styles.letterContainer}>
            <Text style={styles.letter}>
              {guesses.includes(letter) ? letter.toUpperCase() : " "}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={guess}
          onChangeText={setGuess}
          maxLength={1}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Button title="Guess" onPress={handleGuess} />
      </View>

      <View style={styles.guessesContainer}>
        {guesses.map((guess, index) => (
          <View key={index} style={styles.guessContainer}>
            <Text style={styles.guess}>{guess.toUpperCase()}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.chances}>{`${
        MAX_GUESSES - guesses.length
      } chances left`}</Text>
      <Button title="New Game" onPress={startNewGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 24
  },
  wordContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24
  },
  letterContainer: {
    width: 50,
    height: 50,
    backgroundColor: "lightgray",
    borderRadius: 25,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  letter: {
    fontSize: 24
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    width: 50,
    height: 50,
    fontSize: 24,
    textAlign: "center",
    marginRight: 10
  },
  guessesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24
  },
  guessContainer: {
    backgroundColor: "gray",
    borderRadius: 5,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  guess: {
    color: "white",
    fontSize: 18
  },
  chances: {
    fontSize: 18,
    marginBottom: 24
  }
});

export default Game;
