import React from "react";
import { cards } from "../constants/cards.js";
import { Card } from "./Card.js";
import { Layout } from "./Layout.js";

class Prompts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsAvailable: cards.filter((card) => card.front !== ""),
      cardsSeen: [],
      prevCard: null,
      side: "front",
      lastCard: false,
    };
  }
  componentDidMount() {
    if (this.state.cardsAvailable.length > 0) {
      this.setState(
        {
          currentCardId: Math.floor(
            Math.random() * this.state.cardsAvailable.length
          ),
        },
        () => {
          const alreadySeen = this.state.cardsSeen;
          alreadySeen.push(this.state.cardsAvailable[this.state.currentCardId]);
          const cardsAvailable = this.state.cardsAvailable.filter(
            (card) => !alreadySeen.includes(card)
          );
          this.setState({
            currentCard: this.state.cardsAvailable[this.state.currentCardId],
            cardsSeen: alreadySeen,
            cardsAvailable,
          });
        }
      );
    } else {
      return <div>Please add cards to the deck</div>;
    }
  }
  cardFlip = () => {
    if (this.state.side === "front") {
      this.setState({ side: "back" });
    } else if (this.state.side === "back") {
      this.setState({ side: "front" });
    }
  };
  prev = () => {
    this.setState({
      currentCard: this.state.prevCard,
      currentCardId: this.state.prevCardId,
      prevCard: this.state.currentCard,
      prevCardId: this.state.currentCardId,
    });
  };

  next = () => {
    const alreadySeen = this.state.cardsSeen;

    let randomId = Math.floor(Math.random() * this.state.cardsAvailable.length);
    if (this.state.currentCardId && this.state.currentCardId === randomId) {
      while (this.state.currentCardId === randomId) {
        randomId = Math.floor(Math.random() * this.state.cardsAvailable.length);
      }
    }
    const newCard = this.state.cardsAvailable[randomId];
    alreadySeen.push(newCard);
    let cardsAvailable = this.state.cardsAvailable.filter(
      (card) => !alreadySeen.includes(card)
    );
    const prevCardId = this.state.currentCardId;
    const prevCard = this.state.currentCard;
    this.setState({
      currentCardId: randomId,
      currentCard: newCard,
      prevCard,
      prevCardId,
      side: "front",
      cardsSeen: alreadySeen,
      cardsAvailable,
    });
  };
  remove = () => {
    const cardsAfterRemoval = this.state.cardsAvailable.filter(
      (card) => card.front !== this.state.currentCard.front
    );
    this.setState(
      {
        cardsAvailable: cardsAfterRemoval,
        currentCardId: "",
        currentCard: null,
        lastCard: cardsAfterRemoval.length === 1,
      },
      () => {
        if (cardsAfterRemoval.length > 0) {
          this.next();
        }
      }
    );
  };
  resetDeck = () => {
    this.setState({ cardsAvailable: cards, cardsSeen: [] }, () => this.next());
  };
  render() {
    if (cards.length === 0) {
      return <div className="text">Please add cards to the deck</div>;
    }
    if (this.state.currentCard) {
      return (
        <>
          <Layout
            prevCardId={this.state.prevCardId}
            prev={this.prev}
            next={this.next}
            lactCard={this.state.lastCard}
            card={
              <Card
                front={this.state.currentCard.front}
                back={this.state.currentCard.back}
                cardFlip={this.cardFlip}
                side={this.state.side}
              />
            }
          />
          <div className="buttons removeButton">
            <button id="remove-card" className="remove" onClick={this.remove}>
              Remove card from deck
            </button>
          </div>
        </>
      );
    } else {
      return (
        <div className="reset-text">
          <p>There are no more cards in the deck</p>

          <div className="buttons resetButton">
            <button className="reset" onClick={this.resetDeck}>
              Reset deck
            </button>
          </div>
        </div>
      );
    }
  }
}

export { Prompts };
