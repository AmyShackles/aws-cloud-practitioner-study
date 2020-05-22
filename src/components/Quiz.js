import React from "react";

const Quiz = ({
  question,
  options,
  answer,
  setSelected,
  selection,
  wins,
  attempts,
}) => {
  const handleSelection = (event) => {
    setSelected(event.target.value);
  };

  return (
    <div>
      <div className="score">
        Score: {wins}/{attempts} :{" "}
        {wins && attempts && ((wins / attempts) * 100).toFixed(2)}%
      </div>
      <div className="card" tabIndex="0">
        <div className="card-internal">
          <h2>{question}</h2>
          <ul>
            {options.map((option, index) => {
              return (
                <li
                  className={
                    selection &&
                    selection.length > 0 &&
                    selection.includes(option) &&
                    answer.includes(option)
                      ? "correct selection"
                      : selection &&
                        selection.length == answer.length &&
                        answer.includes(option)
                      ? "correct"
                      : selection &&
                        selection.length == answer.length &&
                        selection.includes(option)
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
                      selection.length > 0 &&
                      selection.includes(option) &&
                      answer.includes(option)
                    }
                    onChange={handleSelection}
                    type="checkbox"
                    disabled={selection.length === answer.length}
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
    </div>
  );
};

export { Quiz };
