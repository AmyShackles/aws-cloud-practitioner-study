import React from "react";

const Card = ({ front, back, cardFlip, side }) => {
  const backFormatted = back.split("\n").map((text, i) => (
    <p className="card-text" key={i}>
      {text}
    </p>
  ));
  const frontFormatted = front.split("\n").map((text, i) => (
    <p className="card-text" key={i}>
      {text}
    </p>
  ));
  const handleKeyPress = (event, validKeys, callback) => {
    if (validKeys.includes(event.key)) {
      callback();
    }
  };

  return (
    <div>
      <div className="score">&nbsp;</div>
      <div
        className="card"
        onClick={cardFlip}
        onKeyDown={(event) => handleKeyPress(event, ["Enter", " "], cardFlip)}
        tabIndex="0"
      >
        <div className="card-internal">
          {side === "back" ? backFormatted : frontFormatted}
        </div>
      </div>
    </div>
  );
};

export { Card };
