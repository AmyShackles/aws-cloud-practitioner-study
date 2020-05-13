import React from "react";
import "./App.css";
import { cards } from "./constants/cards.js";
import { Card } from "./components/Card.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsAvailable: cards,
      prevCard: null,
      side: "front",
      lastCard: false,
    };
  }
  componentDidMount() {
    this.setState(
      {
        currentCardId: Math.floor(
          Math.random() * this.state.cardsAvailable.length
        ),
      },
      () => {
        this.setState({
          currentCard: this.state.cardsAvailable[this.state.currentCardId],
        });
      }
    );
  }
  cardFlip = () => {
    if (this.state.side === "front") {
      this.setState({ side: "back" });
    } else if (this.state.side === "back") {
      this.setState({ side: "front" });
    }
  };
  handleCardChange = () => {
    let randomId = Math.floor(Math.random() * this.state.cardsAvailable.length);
    if (this.state.currentCardId && this.state.currentCardId === randomId) {
      while (this.state.currentCardId === randomId) {
        randomId = Math.floor(Math.random() * this.state.cardsAvailable.length);
      }
    }
    const prevCardId = this.state.currentCardId;
    const prevCard = this.state.currentCard;
    this.setState({
      currentCardId: randomId,
      currentCard: this.state.cardsAvailable[randomId],
      prevCard,
      prevCardId,
      side: "front",
    });
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
    this.handleCardChange();
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
    this.setState({ cardsAvailable: cards }, () => this.next());
  };
  render() {
    if (this.state.currentCard) {
      return (
        <div className="App">
          <header className="App-header">
            <h2>Studying for AWS Cloud Practitioner Exam</h2>
          </header>
          <>
            <Card
              front={this.state.currentCard.front}
              back={this.state.currentCard.back}
              cardFlip={this.cardFlip}
              side={this.state.side}
            />
            <div className="buttons">
              {this.state.prevCard && (
                <button onClick={this.prev}>Previous card</button>
              )}
              <button onClick={this.remove}>Remove card from deck</button>
              {!this.state.lastCard && (
                <button onClick={this.next}>Random card</button>
              )}
            </div>
          </>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <h2>
              Flashcard Application to study for AWS Cloud Practitioner Exam
            </h2>
          </header>
          <div>
            <p>There are no more cards in the deck</p>

            <div className="buttons">
              <button onClick={this.resetDeck}>Reset deck</button>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
