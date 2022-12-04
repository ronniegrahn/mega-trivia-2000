import React, { useState, useEffect } from "react";
import Logo from "./quiztime.png";
import "./App.css";

function App() {
  const url = "https://opentdb.com/api.php?amount=5&type=multiple";
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [showCorrect, setShowCorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) =>
        setQuestions(
          json.results.map(function (question) {
            return {
              category: question.category,
              question: question.question,
              options: question.incorrect_answers
                .concat([question.correct_answer])
                .map((value) => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value),
              correct_answer: question.correct_answer,
            };
          })
        )
      );
  }, []);

  function nextQuestion() {
    if (index + 1 < questions.length) {
      setIndex((prevState) => prevState + 1);
      setShowCorrect(false);
    }
  }
  function checkAnswer(event) {
    if (!showCorrect) {
      if (questions[index].options[event.target.value] === questions[index].correct_answer) {
        setScore(score + 1);
      } else {
        event.target.style.backgroundColor = "pink";
      }
      setShowCorrect(true);
      if (index + 1 === questions.length) {
        setGameOver(true);
      }
    }
  }

  function newGame() {
    window.location.reload(false);
  }

  function verdict() {
    if (score === questions.length) {
      return "Awesome!";
    } else if (score / questions.length > 0.75) {
      return "Good job!";
    } else if (score / questions.length > 0.5) {
      return "Alright, not too bad.";
    } else if (score === 0) {
      return "You know nothing John Snow";
    } else {
      return "Not good, not good at all...";
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <img src={Logo} id="logo-img" alt="logo"></img>
        </div>
        {questions.map((item, i) => (
          // This is where the magic happens, div hidden..
          <div hidden={i !== index}>
            <div className="div__category">
              ({index + 1}/{questions.length}) {item.category}{" "}
            </div>
            <div dangerouslySetInnerHTML={{ __html: item.question }} className="div__question"></div>
            <div className="div__answers">
              {item.options.map((opt, optIndex) => (
                <button
                  value={optIndex}
                  key={optIndex}
                  dangerouslySetInnerHTML={{ __html: opt }}
                  onClick={checkAnswer}
                  style={{ background: questions[index].options[optIndex] === questions[index].correct_answer && showCorrect ? "lightgreen" : "" }}
                ></button>
              ))}
            </div>
          </div>
        ))}
        <div className="div__correct">
          {gameOver || <button onClick={nextQuestion}>Next question</button>}
          {gameOver && (
            <div>
              <p>
                Your score is {score}/{questions.length}!
              </p>
              <p>{verdict()}</p>
              <p>
                <button onClick={newGame}>New Game</button>
              </p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
export default App;
