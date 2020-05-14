import React from "react";
import { quizzes } from "../constants/quizzes.js";
import { Quiz } from "./Quiz.js";

class Quizzes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      problemsAvailable: quizzes,
      prevProblem: null,
      lastProblem: false,
      selection: "",
      problemsSeen: [],
      wins: 0,
      attempts: 0,
    };
  }
  componentDidMount() {
    this.setState(
      {
        currentProblemId: Math.floor(
          Math.random() * this.state.problemsAvailable.length
        ),
      },
      () => {
        const alreadySeen = this.state.problemsSeen;
        alreadySeen.push(
          this.state.problemsAvailable[this.state.currentProblemId]
        );
        const problemsAvailable = this.state.problemsAvailable.filter(
          (card) => !alreadySeen.includes(card)
        );
        this.setState({
          currentProblem: this.state.problemsAvailable[
            this.state.currentProblemId
          ],
          problemsAvailable,
        });
      }
    );
  }
  handleProblemChange = () => {
    const alreadySeen = this.state.problemsSeen;
    let randomId = Math.floor(
      Math.random() * this.state.problemsAvailable.length
    );
    if (
      this.state.currentProblemId &&
      this.state.currentProblemId === randomId
    ) {
      while (this.state.currentProblemId === randomId) {
        randomId = Math.floor(
          Math.random() * this.state.problemsAvailable.length
        );
      }
    }
    alreadySeen.push(this.state.problemsAvailable[randomId]);
    let problemsAvailable = this.state.problemsAvailable.filter(
      (problem) => !alreadySeen.includes(problem)
    );
    const prevProblemId = this.state.currentProblemId;
    const prevProblem = this.state.currentProblem;
    this.setState({
      currentProblemId: randomId,
      currentProblem: this.state.problemsAvailable[randomId],
      prevProblem,
      prevProblemId,
      selection: "",
      problemsSeen: alreadySeen,
      problemsAvailable,
    });
  };
  prev = () => {
    this.setState({
      currentProblem: this.state.prevProblem,
      currentProblemId: this.state.prevProblemId,
      prevProblem: this.state.currentProblem,
      prevProblemId: this.state.currentProblemId,
      selection: "",
    });
  };

  next = () => {
    this.handleProblemChange();
  };
  remove = () => {
    const problemsAfterRemoval = this.state.problemsAvailable.filter(
      (problem) => problem.question !== this.state.currentProblem.question
    );
    this.setState(
      {
        problemsAvailable: problemsAfterRemoval,
        currentProblemId: "",
        currentProblem: null,
        lastProblem: problemsAfterRemoval.length === 1,
        selection: "",
      },
      () => {
        if (problemsAfterRemoval.length > 0) {
          this.next();
        }
      }
    );
  };
  resetDeck = () => {
    this.setState(
      { problemsAvailable: quizzes, problemsSeen: [], wins: 0, attempts: 0 },
      () => this.next()
    );
  };
  setSelected = (selection) => {
    const { answer } = this.state.currentProblem;
    let wins = this.state.wins;
    let attempts = this.state.attempts;
    if (selection === answer) {
      this.setState({ wins: ++wins });
    }
    this.setState({ selection, attempts: ++attempts });
  };
  handleKeyPress = (event, validKeys, callback) => {
    if (validKeys.includes(event.key)) {
      callback();
    }
  };
  render() {
    if (this.state.currentProblem) {
      return (
        <>
          <div id="quiz">
            {this.state.prevProblem ? (
              <button
                className="buttons previous"
                onClick={this.prev}
                onKeyDown={(event) =>
                  this.handleKeyPress(event, ["Enter"], this.prev)
                }
              >
                Previous
              </button>
            ) : (
              <div className="buttons" />
            )}

            <Quiz
              question={this.state.currentProblem.question}
              options={this.state.currentProblem.options}
              answer={this.state.currentProblem.answer}
              selection={this.state.selection}
              setSelected={this.setSelected.bind(this)}
              wins={this.state.wins}
              attempts={this.state.attempts}
            />
            {!this.state.lastProblem && (
              <button
                className="buttons next"
                onClick={this.next}
                onKeyDown={(event) =>
                  this.handleKeyPress(event, ["Enter"], this.next)
                }
              >
                Next
              </button>
            )}
          </div>
          <div className="buttons">
            <button
              className="remove"
              onClick={this.remove}
              onKeyDown={(event) =>
                this.handleKeyPress(event, ["Enter"], this.remove)
              }
            >
              Remove question from deck
            </button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div id="quiz">
            <p>There are no more cards in the deck</p>
          </div>
          <div className="buttons">
            <button
              className="reset"
              onClick={this.resetDeck}
              onKeyDown={(event) =>
                this.handleKeyPress(event, ["Enter"], this.resetDeck)
              }
            >
              Reset deck
            </button>
          </div>
        </>
      );
    }
  }
}

export { Quizzes };
