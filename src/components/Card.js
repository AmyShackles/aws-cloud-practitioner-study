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
    <div
      id="card"
      onClick={cardFlip}
      onKeyDown={(event) => handleKeyPress(event, ["Enter"], cardFlip)}
      tabIndex="0"
    >
      <div id="card-internal">
        {side === "back" ? backFormatted : frontFormatted}
      </div>
    </div>
  );
};

export { Card };
