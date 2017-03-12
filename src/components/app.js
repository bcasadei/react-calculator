import React, { Component } from 'react';
import '../style/app.css';
import Display from './display';
import Btn from './btn';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: 0,
      memory: 0,
      operator: null,
      history: [],
      clearBtn: "AC"
    };
  };

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
      history: value
    });
  }

  resetHistory(value) {
    this.setState({
      history: value
    });
  }

  allClear() {
    this.setState({
      display: 0,
      memory: 0,
      operator: null,
      history: [],
      clearBtn: "AC"
    });
  }

  updateMemory(value) {
    this.setState({
      memory: value
    });
  }

  toggleClearBtn(input) {
    input === "C" ?
    this.setState({clearBtn: "AC"}) :
    this.setState({clearBtn: "C"})
  }

  calculate(arr) {
    let operator = this.state.operator;
    let num1 = parseFloat(this.state.memory);
    let num2 = parseFloat(this.state.display);
    console.log(num1 + operator + num2);
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
    else if(input === "C") {
      this.updateDisplay(0);
      this.toggleClearBtn(input);
      history.pop();
      this.updateHistory(history);
    }
    else if((type === "number" &&
            display === 0) ||
            (type === "number" &&
            /[=\+\-x\/]/g.test(history[history.length - 1])))
    {
      this.updateDisplay(input);
      this.toggleClearBtn(input);
      this.updateHistory([...history, input]);
    }
    else if(type === "number") {
      this.updateDisplay(display += input);
      this.toggleClearBtn(input);
      this.updateHistory([display]);
    }
    else if(type === "operator" &&
            /[=\+\-x\/]/g.test(history) &&
            /[\d]/g.test(history[history.length - 1]))
      {
      let memory = this.calculate();
      this.updateOperator(input);
      this.updateMemory(memory);
      this.updateDisplay(memory);
      this.resetHistory([memory, input]);
    }
    else if(type === "operator") {
      this.updateOperator(input);
      this.updateMemory(display);
      this.updateHistory([...history, input]);
    }
    else if(input === "=") {
      let memory = this.calculate();
      this.updateDisplay(memory);
      this.resetHistory([memory]);
    }
  }

  render() {
    console.log(this.state.history);
    return (
      <div className="container">
        <Display display={this.state.display} />

        <div className="row">
          <Btn
            value={this.state.clearBtn}
            type="action"
            onBtnInput={(value, type) => this.onBtnInput({value, type})}
            btnClass="btn large"/>

          <Btn
            value="+/-"
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
