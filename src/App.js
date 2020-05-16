import React from "react";
import "./App.css";
import { Prompts } from "./components/Prompts.js";
import { Quizzes } from "./components/Quizzes.js";

const App = () => {
  const [studyType, setStudyType] = React.useState("quiz");

  const handleStudyChange = (type) => {
    setStudyType(type);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Application to study for AWS Cloud Practitioner Exam</h2>
      </header>
      <main>
        <div className="buttons">
          <button
            className={
              studyType === "prompt" ? "flashcardDeck active" : "flashcardDeck"
            }
            onClick={() => handleStudyChange("prompt")}
          >
            Flashcards
          </button>
          <button
            className={studyType === "quiz" ? "quizDeck active" : "quizDeck"}
            onClick={() => handleStudyChange("quiz")}
          >
            Quizzes
          </button>
        </div>
        {studyType === "quiz" && <Quizzes />}
        {studyType === "prompt" && <Prompts />}
      </main>
    </div>
  );
};

export default App;
