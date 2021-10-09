import React, { useState } from "react";
import { useGlobalContext } from "./context";
import SetupForm from "./components/SetupForm";
import Loading from "./components/Loading";
import Modal from "./components/Modal";
function App() {
  const {
    loading,
    showModal,
    setShowModal,
    questions,
    currentIndexQuestion,
    setCurrentIndexQuestion,
    score,
    setScore,
  } = useGlobalContext();
  if (loading) {
    return <Loading />;
  }

  if (currentIndexQuestion > 9) {
    return <Modal />;
  }

  if (questions.length === 0) {
    return <SetupForm />;
  } else {
    //destructing
    console.log(questions[9]);
    const { answers, question, correct_answer } =
      questions[currentIndexQuestion];

    //shuffling
    let shuffled = answers.sort(() => 0.5 - Math.random());

    //matching answers
    const findAnswer = (value) => {
      if (value === correct_answer) {
        setScore(score + 1);
      }
      setCurrentIndexQuestion(currentIndexQuestion + 1);
    };

    return (
      <>
        <main>
          {showModal ? (
            <Modal />
          ) : (
            <section className="quiz">
              <p className="correct-answers">
                {score} correct from {questions.length} questions
              </p>
              <article className="container">
                <h2>
                  {currentIndexQuestion + 1}. {question}
                </h2>
                <div className="btn-container">
                  {shuffled.map((ans, index) => {
                    return (
                      <button
                        className="answer-btn"
                        onClick={(e) => findAnswer(e.target.innerText, index)}
                        key={index}
                      >
                        {ans}
                      </button>
                    );
                  })}
                </div>
              </article>
              <button
                className="next-question"
                onClick={() =>
                  setCurrentIndexQuestion(currentIndexQuestion + 1)
                }
              >
                next question
              </button>
            </section>
          )}
        </main>
      </>
    );
  }
}

export default App;
