import React, { useState, useEffect } from "react"; // useEffect? might need later, for showing a countdown timer (not sure how to yet)
import { Form, Button } from "react-bootstrap";

const allWords = { //list of possible words
  pays: [
    "Canada", "Mexico", "Greece", "Ecuador", "Italy", "Spain", "France",
    "England", "India", "China", "Australia", "Ireland", "Switzerland",
    "Denmark", "Russia", "Germany", "Turkey", "Kenya", "Morocco", "Bangladesh"
  ],
  couleurs: [
    "pink", "magenta", "lilac", "brown", "mauve", "burgundy", "yellow", "green", "red", "blue",
    "teal", "orange", "maroon", "black", "white", "tan", "navy", "cyan", "ivory", "purple"
  ],
  corps: [
    "finger", "knuckle", "ear", "head", "eyes", "knee", "hair", "nose", "thigh", "elbow", "neck",
    "toe", "tooth", "lips", "cheek", "chin", "shoulder", "foot", "hips", "back"
  ]
};

const levelTimes = { 1: 20000, 2: 15000, 3: 10000 }; //timers, different for each level. MILISECONDS: 20s, 15s, 10s

function shuffle(array) { //shuffle the words, froman algorithm
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getRandomWords(category) { 
  const words = [...allWords[category]];
  return shuffle(words).slice(0, 8); // use shuffle function, to then pick only first 8
}

function Wordgame(){
     const [level, setLevel] = useState(1); // ldefault level
     const [category, setCategory] = useState("pays"); //default category is countries
     const [currentWords, setcurrentWords] = useState(); // default no words (only when game starts)
     const [showWords, setShowWords] = useState(false); //default doesn't show words
     const [inputs, setInputs] = useState(Array(8).fill("")); //default shows the 8 words, only implemented after game starts
     const [score, setScore] = useState(null); //default player has no points!
     const [gameStarted, setGameStarted] = useState(false); //to indicate if game started, default is not
     
     const startGame = () => { //step by step what happens in game
          const selectedWords = getRandomWords(category); //get8 words
          setcurrentWords(selectedWords); //save

          setInputs(Array(8).fill("")); // make sure cleared game, and that empty array of 8 ready for guesses
          setScore(null); 

          setGameStarted(true); 
          setShowWords(true); 
          // after timer, hide words
          setTimeout(() => {
               setShowWords(false);
          }, levelTimes[level]);
     };
     const handleInputChange = (value, index) => {
     const updated = [...inputs];
     updated[index] = value;
     setInputs(updated);
     };

     const checkIfRight = () => {
          const lowercaseWords = [...currentWords.map(w => w.toLowerCase())];
          const differentWords = [...new Set(inputs.map(i => i.trim().toLowerCase()))];

          const correct = differentWords.filter(word => {
          const index = lowercaseWords.indexOf(word);
          if (index !== -1) {
               lowercaseWords.splice(index, 1); // should ensure correct is not counted twice, bc can be matched true only once
               return true;
          }
          return false;
          });
          setScore(correct.length); //score is how many they got correct, out of 8 score
     };

     // Reset the game back to the starting screen
     const resetGame = () => {
          setGameStarted(false);
          setcurrentWords([]);
          setInputs(Array(8).fill(""));
          setScore(null);
     };

     return (

          <div className="container mt-5 d-flex flex-column align-items-center text-center"> 

          {/* add brain picture?? revisit because looks plain right now */}

          <h1 className="mb-4"> Test your skills! How good is your memory? </h1>

          {/* start button */}
          {!gameStarted && (
               <Button variant="dark" onClick={startGame} className="mb-4">
               Start Game
               </Button>
          )}

          {/* show words to memorize */}
          {gameStarted && showWords && (
               <div className="mb-4"> 
               <h4> Memorize these words:</h4>
               <div className="d-flex flex-wrap gap-3 mt-2">
                    {currentWords.map((word, i) => (
                    <div key={i} className="p-2 border rounded bg-light">{word}</div>
                    ))}
               </div>
               </div>
          )}

          {/* place to input, after words disappear */}
          {gameStarted && !showWords && (
               <>
               <h4 className="mt-4">You think you remember all the words? Enter as many as you remember! :</h4>
               {inputs.map((val, i) => (
                    <Form.Control
                    key={i}
                    className="my-2"
                    type="text"
                    placeholder={`Word ${i + 1}`} //shows up to 8
                    value={val}
                    onChange={(e) => handleInputChange(e.target.value, i)}
                    />
               ))}

               <Button variant="success" onClick={checkIfRight} className="mt-3">
                    Check your answers... you think you got them all?
               </Button>
               </>
          )}

           {/* display the score and reset game */}
          {score !== null && (
               <div className="mt-4">
               <h5> You remembered {score} out of 8 words!</h5>
               <Button onClick={resetGame} variant="secondary" className="mt-2">
                    Play again?
               </Button>
               </div>
          )}

          <br></br> 

          {/* pick level */}
          <Form.Group className="mb-4">
          <Form.Label><strong>Choose Level:</strong></Form.Label>
          <div className="d-flex gap-2">
          <input
               type="radio"
               className="btn-check"
               name="level"
               id="easyLevel"
               autoComplete="off"
               checked={level === 1}
               onChange={() => setLevel(1)}
          />
          <label className="btn btn-outline-success" htmlFor="easyLevel">Easy</label>
          <input
               type="radio"
               className="btn-check"
               name="level"
               id="mediumLevel"
               autoComplete="off"
               checked={level === 2}
               onChange={() => setLevel(2)}
          />
          <label className="btn btn-outline-success" htmlFor="mediumLevel">Medium</label>
          <input
               type="radio"
               className="btn-check"
               name="level"
               id="hardLevel"
               autoComplete="off"
               checked={level === 3}
               onChange={() => setLevel(3)}
          />
          <label className="btn btn-outline-success" htmlFor="hardLevel">Hard</label>
          </div>
          </Form.Group>

          {/* pick category */}
          <Form.Group className="mb-4">
          <Form.Label><strong>Choose Category:</strong></Form.Label>
          <div className="d-flex gap-2 flex-wrap">
          <input
               type="radio"
               className="btn-check"
               name="category"
               id="pays"
               autoComplete="off"
               checked={category === "pays"}
               onChange={() => setCategory("pays")}
          />
          <label className="btn btn-outline-success" htmlFor="pays">Countries</label>
          <input
               type="radio"
               className="btn-check"
               name="category"
               id="couleurs"
               autoComplete="off"
               checked={category === "couleurs"}
               onChange={() => setCategory("couleurs")}
          />
          <label className="btn btn-outline-success" htmlFor="couleurs">Colors</label>
          <input
               type="radio"
               className="btn-check"
               name="category"
               id="corps"
               autoComplete="off"
               checked={category === "corps"}
               onChange={() => setCategory("corps")}
          />
          <label className="btn btn-outline-success" htmlFor="corps">Body parts</label>
          </div>
          </Form.Group>

      </div>
     );

}

export default Wordgame;