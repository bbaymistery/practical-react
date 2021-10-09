import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
// https://opentdb.com/api.php?amount=10&category=23&difficulty=medium&type=multiple

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  //
  const [setupQuiz, setSetupQuiz] = useState({
    amount: "10",
    category: "sports",
    difficulty: "easy",
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentIndexQuestion, setCurrentIndexQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const fetchDatasFromApi = async (e) => {
    e.preventDefault();
    //arrangements of url
    const API_ENDPOINT = "https://opentdb.com/api.php?";
    const AMOUNT = `amount=${setupQuiz.amount}&`;
    const CATEGORY = `category=${table[setupQuiz.category]}&`;
    const DIFFICULTY = `difficulty=${setupQuiz.difficulty}&`;
    const BASEURL = `${API_ENDPOINT}${AMOUNT}${CATEGORY}${DIFFICULTY}type=multiple`;

    //FETCHING DATAS
    setLoading(true);
    const response = await axios.get(BASEURL);

    //if thereis no questions
    if (response.data.results.length === 0) {
      setError("Can't Generate Questions, Please Try Different Options");
    } else {
      //take the questions
      const QUESTIONS = response.data.results.map((result) => {
        const { question, correct_answer, incorrect_answers } = result;
        return {
          question,
          correct_answer,
          answers: [...incorrect_answers, correct_answer],
        };
      });
      console.log(QUESTIONS);
      setQuestions(QUESTIONS);
    }

    setLoading(false);
  };

  const playAgain = (par) => {
    console.log(par);
    window.location.reload();
  };
  return (
    <AppContext.Provider
      value={{
        setSetupQuiz,
        setupQuiz,
        fetchDatasFromApi,
        loading,
        setLoading,
        showModal,
        setShowModal,
        error,
        questions,
        currentIndexQuestion,
        setCurrentIndexQuestion,
        score,
        setScore,
        playAgain,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
/**
 *
 *

 *        //  setQuestions(QUESTIONS)
      //   //take answers from api result
      //   const ANSWERS = response.data.results.map((result) => {
      //     return {
      //       correctAnswer: result.correct_answer,
      //       incorrectAnswers: result.incorrect_answers,
      //     };
      //   });
 *
 *       //   setAnswers(ANSWERS);

      //   setQuestions(...questions, response.data.results.question);
      //   console.log(questions);
 */
