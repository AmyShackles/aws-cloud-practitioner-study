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

  return (
    <div id="card" onClick={cardFlip}>
      <div id="card-internal">
        {side === "back" ? backFormatted : frontFormatted}
      </div>
    </div>
  );
};

export { Card };
