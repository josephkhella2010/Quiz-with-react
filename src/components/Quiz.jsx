import React, { useState } from "react";
import { questions } from "./QuestionsArr"; // Ensure this file contains your questions array

export default function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current question index
  const [score, setScore] = useState(0);
  const [List, setallList] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false); // Track whether the quiz is over
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  let uptodatescore;
  let allanswer;

  // Handle moving to the next question
  function handleCurrentIndex() {
    console.log("hi");
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1); // Move to the next question
      setButtonsDisabled(false);
    } else {
      setQuizFinished(true);
    }
  }
  //////////////////////////////////////////////////
  function handleBtn(e, answer, question) {
    const correctAnswer = answer.find((item) => item.correct === "true").text;
    let p = document.createElement("p");
    const Div = e.currentTarget.parentElement;
    setButtonsDisabled(true);
    const correctBtn = Array.from(
      e.currentTarget.parentElement.querySelectorAll("button")
    ).find((button) => button.dataset.correct === "true");
    correctBtn.style.background = "green";
    allanswer = {
      question: question,
      correctAnswer: correctAnswer,
      userAnswer: e.target.innerHTML
    };
    setallList((c) => [...c, allanswer]);

    //////////////////////////////////////////////
    if (e.target.dataset.correct === "true") {
      uptodatescore = score + 10;
      setScore(uptodatescore);

      p.innerHTML = ` well done your answer is correct and u have score : ${uptodatescore} `;
    } else {
      uptodatescore = score;

      setScore(uptodatescore);
      e.target.style.background = "red";
      p.innerHTML = `  your answer is wrong the correct answer is ${correctAnswer} and u have score : ${uptodatescore} `;
      p.style.color = "red";
    }
    Div.append(p);
  }
  //////////////////////////////////////////////
  function handleReset() {
    window.location.reload();
  }

  ////////////////////////////////////////////////////////////////
  return (
    <div className="wrapper">
      {!quizFinished ? (
        questions &&
        questions.map((item, index) => {
          return (
            <div
              className={`container ${index === currentIndex ? "active" : ""}`}
              key={index}
            >
              <h1 className="question">
                {index + 1}- Question: {item.question}
              </h1>
              <div className="btn-container">
                {item.answer.map((ans, i) => (
                  <button
                    data-correct={ans.correct}
                    key={i}
                    disabled={buttonsDisabled}
                    onClick={(e) => handleBtn(e, item.answer, item.question)}
                  >
                    {ans.text}
                  </button>
                ))}
              </div>
              <button
                className="next"
                onClick={handleCurrentIndex}
                disabled={!buttonsDisabled}
              >
                Next
              </button>
            </div>
          );
        })
      ) : (
        <div className="score-container">
          <h2>Slutpoäng: {score}</h2>
          <ul class="ul">
            {List &&
              List.map((item, index) => {
                return (
                  <li key={index}>
                    Fråga {index + 1}: {item.question}
                    <p>
                      {" "}
                      Du svarade :( {item.userAnswer}){" "}
                      <p>
                        Correct Answer: , rätt svar är( {item.correctAnswer}){" "}
                      </p>{" "}
                    </p>
                  </li>
                );
              })}
          </ul>
          <button onClick={handleReset}>Reset</button>
        </div>
      )}
    </div>
  );
}
