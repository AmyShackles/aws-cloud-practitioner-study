import React from "react";

const Layout = ({ prevCardId, prev, card, lastCard, next }) => {
  return (
    <div className="quiz">
      {prevCardId ? (
        <button className="buttons previous" onClick={prev}>
          Prev
        </button>
      ) : (
        <div className="buttons" />
      )}
      {card}
      {!lastCard ? (
        <button className="buttons next" onClick={next}>
          Next
        </button>
      ) : (
        <div className="buttons" />
      )}
    </div>
  );
};

export { Layout };
