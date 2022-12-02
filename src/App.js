import React, { useState, useHook, useEffect } from "react";
import "./App.css";

function App() {
  const url = "https://opentdb.com/api.php?amount=1&type=multiple";
  const [question, setQuestion] = useState([]);
  const [index, setIndex] = useState(0);
  const [showCorrect, setShowCorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // useEffect(() => {
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((json) => setQuestion(json.results));
  // }, []);

  const q = [
    {
      category: "History",
      type: "multiple",
      difficulty: "medium",
      question: "What historical event was Tchaikovsky&#039;s 1812 Overture referencing?",
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
      question: "According to the United States&#039; CDC, one in how many Americans die annually due to smoking?",
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
    setIndex(prevState => prevState + 1)
    setShowCorrect(prevState => !prevState)
  }

  function checkAnswer(event) {
    // console.log(event.target.value);
    // console.log(q.correct_answer);

    if (event.target.value === q[index].correct_answer) {
      console.log("Correct!");
    } else {
      console.log("Wrong!");
    }
  
    setShowCorrect(prevState => !prevState)

    if(index + 1 === q.length) {
      console.log("Game over!")
      setGameOver(true);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="div__category">{q[index].category}</div>
        <div className="div__question">{q[index].question}</div>
        <div className="div__answers">
          {q[index].incorrect_answers.concat(q[index].correct_answer).map((answer) => (
            <button value={answer} onClick={checkAnswer}>
              {answer}
            </button>
          ))}
        </div>
        {showCorrect && <div className="div__correct">{q[index].correct_answer}{gameOver || <button onClick={nextQuestion}>Next question</button>}</div>}
      </header>
    </div>
  );
}

export default App;
