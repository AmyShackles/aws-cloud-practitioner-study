import React from "react";
import { quizzes } from "../data/quizzes.js";
import { Quiz } from "./Quiz.js";
import { Layout } from "./Layout.js";

class Quizzes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      problemsAvailable: quizzes.filter((quiz) => quiz.question.length > 0),
      prevProblem: null,
      lastProblem: false,
      selection: [],
      problemsSeen: [],
      wins: 0,
      attempts: 0,
    };
    this.setSelected = this.setSelected.bind(this);
  }
  componentDidMount() {
    if (this.state.problemsAvailable.length > 0) {
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
  }
  prev = () => {
    this.setState({
      currentProblem: this.state.prevProblem,
      currentProblemId: this.state.prevProblemId,
      prevProblem: this.state.currentProblem,
      prevProblemId: this.state.currentProblemId,
      selection: [],
    });
  };

  next = () => {
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
      selection: [],
      problemsSeen: alreadySeen,
      problemsAvailable,
    });
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
        selection: [],
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
  setSelected = (ans) => {
    const selection = this.state.selection;
    this.setState({ selection: [...this.state.selection, ans] }, () => {
      if (
        this.state.selection.length === this.state.currentProblem.answer.length
      ) {
        const correct = this.state.selection.filter((ans) =>
          this.state.currentProblem.answer.includes(ans)
        );

        if (correct.length === this.state.currentProblem.answer.length) {
          this.setState({ wins: this.state.wins + 1 });
        }
        this.setState({ attempts: this.state.attempts + 1 });
      }
    });
  };
  render() {
    if (quizzes.length === 0) {
      return <div className="text">Please add cards to the deck</div>;
    }
    if (this.state.currentProblem) {
      return (
        <>
          <Layout
            prevCardId={this.state.prevProblem}
            prev={this.prev}
            next={this.next}
            lastCard={this.lastCard}
            card={
              <Quiz
                question={this.state.currentProblem.question}
                options={this.state.currentProblem.options}
                answer={this.state.currentProblem.answer}
                selection={this.state.selection}
                setSelected={this.setSelected}
                wins={this.state.wins}
                attempts={this.state.attempts}
              />
            }
          />

          <div className="buttons removeButton">
            <button className="remove" onClick={this.remove}>
              Remove question from deck
            </button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="text">
            <p>There are no more cards in the deck</p>
          </div>
          <div className="buttons resetButton">
            <button className="reset" onClick={this.resetDeck}>
              Reset deck
            </button>
          </div>
        </>
      );
    }
  }
}

export { Quizzes };
