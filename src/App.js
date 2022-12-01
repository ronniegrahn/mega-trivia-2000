import React, {useState, useHook} from 'react';
import './App.css';


function App() {
  const url = 'https://opentdb.com/api.php?amount=1&type=multiple';
  
  async function getTrivia() {
    let response = await fetch(url);
    let data = await response.json();
  
    return data;
  }
  
  getTrivia().then((data) => {
    const results = data.results;

    console.log(results);
    //console.log(results[0].question);



  });

  return (
    <div className="App">
      <header className="App-header">

      </header>
    </div>
  );
}

export default App;