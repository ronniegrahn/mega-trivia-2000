import React, { useState, useHook, useEffect, useRef } from "react";
import "./App.css";
import Logo from "./quiztime.png";

function App() {
  const url = "https://opentdb.com/api.php?amount=1&type=multiple";
  const [question, setQuestion] = useState([]);
  const [sortedOptions, setSortedOptions] = useState([]);
  const [index, setIndex] = useState(0);
  const [showCorrect, setShowCorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [answerOptions, setAnswerOptions] = useState([]);
  const renderAfterCalled = useRef(false);

  // useEffect(() => {
  //   if (!renderAfterCalled.current) {
  //     fetch(url)
  //       .then((res) => res.json())
  //       .then((json) => console.log(json.results));
  //       // console.log(question);
  //   }

  //   renderAfterCalled.current = true;
  // }, []);

  const q = [
    {
      category: "History",
      type: "multiple",
      difficulty: "medium",
      question: "What historical event was Tchaikovsky's 1812 Overture referencing?",
      correct_answer: "The Napoleonic Wars",
      incorrect_answers: ["The American War of 1812", "The Russian Revolution", "The Charge of the Light Brigade (Crimean War)"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "medium",
      question: "What did the name of the Tor Anonymity Network orignially stand for?",
      correct_answer: "The Onion Router",
      incorrect_answers: ["The Only Router", "The Orange Router", "The Ominous Router"],
    },
    {
      category: "Entertainment: Video Games",
      type: "multiple",
      difficulty: "easy",
      question: "Which eSports team came first place in The International Dota 2 Championship 2016?",
      correct_answer: "Wings Gaming",
      incorrect_answers: ["Digital Chaos", "Evil Geniuses", "Fnatic"],
    },
    {
      category: "General Knowledge",
      type: "multiple",
      difficulty: "medium",
      question: "According to the United States' CDC, one in how many Americans die annually due to smoking?",
      correct_answer: "Five",
      incorrect_answers: ["Twenty", "Ten", "One hundred"],
    },
    {
      category: "Science & Nature",
      type: "multiple",
      difficulty: "medium",
      question: "What is the Linnean name of the domestic apple tree?",
      correct_answer: "Malus pumila",
      incorrect_answers: ["Malus americana", "Pomus domestica", "Appelus delectica"],
    },
  ];

  function nextQuestion() {
    setIndex((prevState) => prevState + 1);
    setShowCorrect(false);
  }

  function checkAnswer(event) {
    if (event.target.value === q[index].correct_answer) {
      console.log("Correct!");
      setScore(score + 1);
    } else {
      event.style={background: "red"};
    }

    setShowCorrect(true);

    if (index + 1 === q.length) {
      console.log("Game over!");
      setGameOver(true);
    }
  }

  function shuffle(array) {
    if (!showCorrect) {
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }
    }
    return array;
  }

  const options = q[index].incorrect_answers.concat(q[index].correct_answer);

  useEffect(() => {
    if (!showCorrect) {
      setSortedOptions(q[index].incorrect_answers.concat(q[index].correct_answer));
      setSortedOptions((prevState) => shuffle(prevState));
    }
  }, [showCorrect]);

  // let options2 = !showCorrect ? shuffle(options) : options2;

  return (
    <div className="App">
      <header className="App-header">
      <div><img src={Logo} id="logo-img"></img></div>
        <div className="div__category">{q[index].category}</div>
        <div className="div__question">{q[index].question}</div>
        <div className="div__answers">
          {sortedOptions.map((answer) => (
            <button
              value={answer}
              onClick={checkAnswer}
              disabled={showCorrect}
              style={{ background: answer === q[index].correct_answer && showCorrect ? "lightgreen" : "" }}
            >
              {answer}
            </button>
          ))}
        </div>
        {showCorrect && (
          <div className="div__correct">
            {gameOver || <button onClick={nextQuestion}>Next question</button>}
            {gameOver && (
              <span>
                You got {score}/{q.length} correct!
              </span>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
