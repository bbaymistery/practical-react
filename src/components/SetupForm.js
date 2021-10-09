import React from "react";
import { useGlobalContext } from "../context";
const SetupForm = () => {
  const { setupQuiz, setSetupQuiz, fetchDatasFromApi, error } =
    useGlobalContext();

  return (
    <main>
      <section className="quiz quiz-small">
        <form className="setup-form">
          <h2>setup quiz</h2>
          <div className="form-control">
            <label htmlFor="amount">number of questions</label>
            <input
              type="number"
              name="amount"
              id="amount"
              className="form-input"
              min="1"
              max="50"
              value={setupQuiz.amount}
              onChange={(e) =>
                setSetupQuiz({ ...setupQuiz, amount: e.target.value })
              }
            />
          </div>
          <div className="form-control">
            <label htmlFor="category">category</label>
            <select
              name="category"
              onChange={(e) =>
                setSetupQuiz({ ...setupQuiz, category: e.target.value })
              }
              id="category"
              className="form-input"
            >
              <option value="sports">sports</option>
              <option value="history">history</option>
              <option value="politics">politics</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="difficulty">select difficulty</label>
            <select
              name="difficulty"
              onChange={(e) =>
                setSetupQuiz({ ...setupQuiz, category: e.target.value })
              }
              id="difficulty"
              className="form-input"
            >
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>
          {error && (
            <p className="error">
              can't generate questions, please try different options
            </p>
          )}
          <button
            type="submit"
            className="submit-btn"
            onClick={fetchDatasFromApi}
          >
            start
          </button>
        </form>
      </section>
    </main>
  );
};

export default SetupForm;
