import React, { Component } from 'react';
import '../style/app.css';
import Display from './display';
import Btn from './btn';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: 0,
      result: null,
      operator: null,
      history: []
    };
  };

  // num1 + num2 = display
  // If button is a number and not 0
      // - concat to current number and update display
  // If button is an operator
    // store number in num1 var
  // If button is number after an operator
    // store number num2 var
  // If button is equals perform calculation and display result

  updateDisplay(value) {
    this.setState({
      display: value
    });
  }

  updateOperator(value) {
    this.setState({
      operator: value
    });
  }

  updateHistory(value) {
    this.setState({
      history: [...this.state.history, value]
    });
  }

  resetHistory(value) {
    this.setState({
      history: [value]
    });
  }

  allClear() {
    this.setState({
      display: 0,
      result: null,
      operator: null,
      history: []
    });
  }

  clearEntry() {
    var history = this.state.history //.slice(0, this.state.history.length);
    var display = this.state.display;
    console.log(history);
    this.setState({
      display: history[history.length - display.length],
      history: history.slice(0, history.length - display.length)
    });
  }

  calculate(arr) {
    let operator = this.state.operator;
    let operatorIdx = arr.indexOf(operator);
    let num1 = parseFloat(arr.slice(0, operatorIdx).join(''));
    let num2 = parseFloat(arr.slice(operatorIdx + 1, arr.length).join(''));

    switch(operator) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "/":
        return num1 / num2;
      case "x":
        return num1 * num2;
      default:
        break;
    }
  }

  onBtnInput(btn) {
    let input = btn.value
    let type = btn.type
    let display = this.state.display;
    let history = this.state.history;

    if(input === "AC") {
      this.allClear();
    }
    else if(input === "CE") {
      this.clearEntry();
    }
    else if((type === "number" &&
            display === 0) ||
            (type === "number" &&
            /[=\+\-x\/]/g.test(history[history.length - 1])))
    {
      this.updateDisplay(input);
      this.updateHistory(input);
    }
    else if(type === "number") {
      this.updateDisplay(display += input);
      this.updateHistory(input);
    }
    else if(type === "operator") {
      this.updateOperator(input);
      this.updateHistory(input);
    }
    else if(input === "=") {
      let result = this.calculate(history);
      this.updateDisplay(result);
      this.resetHistory(result);
    }
  }

  render() {
    console.log(this.state.history);
    return (
      <div className="container">
        <Display display={this.state.display} />

        <div className="row">
          <Btn
            value="AC"
            type="action"
            onBtnInput={(value, type) => this.onBtnInput({value, type})}
            btnClass="btn large"/>

          <Btn
            value="CE"
            type="action"
            onBtnInput={(value, type) => this.onBtnInput({value, type})}/>

          <Btn
            value="/"
            type="operator"
            onBtnInput={(value, type) => this.onBtnInput({value, type})}/>
        </div>

        <div className="row">
          <Btn
            value="7"
            onBtnInput={(value, type) => this.onBtnInput({value, type})}/>

          <Btn
            value="8"
            onBtnInput={(value, type) => this.onBtnInput({value, type})}/>

          <Btn
            value="9"
            onBtnInput={(value, type) => this.onBtnInput({value, type})}/>

          <Btn
            value="x"
            type="operator"
            onBtnInput={(value, type) => this.onBtnInput({value, type})}/>
        </div>

        <div className="row">
          <Btn
            value="4"
            onBtnInput={(value, type) => this.onBtnInput({value, type})}/>

          <Btn
            value="5"
            onBtnInput={(value, type) => this.onBtnInput({value, type})}/>

          <Btn
            value="6"

            onBtnInput={(value, type) => this.onBtnInput({value, type})}/>

          <Btn
            value="-"
            type="operator"
            onBtnInput={(value, type) => this.onBtnInput({value, type})}/>
        </div>

        <div className="row">
          <Btn
            value="1"

            onBtnInput={(value, type) => this.onBtnInput({value, type})}/>

          <Btn
            value="2"

            onBtnInput={(value, type) => this.onBtnInput({value, type})}/>

          <Btn
            value="3"

            onBtnInput={(value, type) => this.onBtnInput({value, type})}/>

          <Btn
            value="+"
            type="operator"
            onBtnInput={(value, type) => this.onBtnInput({value, type})}/>
        </div>

        <div className="row">
          <Btn
            value="0"
            onBtnInput={(value, type) => this.onBtnInput({value, type})}
            btnClass="btn large"/>

          <Btn
            value="."
            onBtnInput={(value, type) => this.onBtnInput({value, type})}/>

          <Btn
            value="="
            type="action"
            onBtnInput={(value, type) => this.onBtnInput({value, type})}/>
        </div>
      </div>
    );
  }
}

export default App;
