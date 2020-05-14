import React from "react";

const Quiz = ({ question, options, answer, setSelected, selection }) => {
  const handleSelection = (event) => {
    setSelected(event.target.value);
  };

  return (
    <div className="quiz">
      <h2>{question}</h2>
      <div className="card">
        <ul>
          {options.map((option, index) => {
            return (
              <li
                className={
                  selection && selection === option && option === answer
                    ? "correct selection"
                    : selection && option === answer
                    ? "correct"
                    : selection && selection === option
                    ? "incorrect"
                    : ""
                }
                key={index}
              >
                <input
                  id={`option-${index}`}
                  key={index}
                  value={option}
                  checked={
                    selection && +selection === option && option === answer
                  }
                  onChange={handleSelection}
                  type="checkbox"
                  disabled={selection}
                />
                <label className="option" htmlFor={`option-${index}`}>
                  {option}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export { Quiz };
