import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class CalcButton extends Component{

  render(){
    return(
      <div className="col-3">
        <button onClick = {this.props.onClick} className="btn btn-dark btn-lg" id="input-button">{this.props.value}</button>
      </div>
    )
  }
}

class App extends Component{
  constructor(props){
    super(props);

    this.state={
      operator:"",
      display:"0",
      usedEqual:false
    }
  }

  handleCalculate = (e) =>{
    let value = e.target.innerHTML;
    switch (value) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
      case ".":
        if(this.state.display==="0" && value==="."){
          this.setState({display:this.state.display+value})
        }else if (this.state.display==="0" || this.state.usedEqual){
          this.setState({display:value, usedEqual:false});
        }else{
          this.setState({display:this.state.display+value})
        }
        this.setState({operator: ""})
        break;
      case "*":
      case "/":
      case "+":
      case "-":
        this.setState({usedEqual:false})
        if (this.state.display!=="0"){
          if (!this.state.operator.length>0){
            this.setState({display:this.state.display+value});
          }else{
            let v= this.state.display;
            v = v.substr(0,v.length-1)
            this.setState({display:v+value});
          }
        }
        this.setState({operator: value})
        break;
      case "C":
        this.setState({
          operator:"",
          display:"0",
          usedEqual:false
        });
        break;
      case "=":
        if (this.state.display.length>2){
          let v = this.state.display;
          if(this.state.operator.length>0){
            v = v.substr(0,(v.length-1));
          }
          this.setState(
            {display:eval(v),
            operator:"",
            usedEqual:true
          });
        }
        break;
      default:
        break;

    }
  }

  calc = (op1, operator, display) =>{
    if (operator === "+"){
      this.setState({
        display: Number(op1) + Number(display)
      });
    }else if (operator === "-"){
      this.setState({
        display: Number(op1) - Number(display)
      });
    }else if (operator === "*"){
      this.setState({
        display: Number(op1) * Number(display)
      });
    }else if (operator === "/"){
      this.setState({
        display: Number(op1) / Number(display)
      });
    }
  }

  render(){
    const firstRow = [7,8,9,"C"].map((value, key) =>
      <CalcButton key={key} value={value} onClick={this.handleCalculate}/>
    )

    const secondRow = [4, 5, 6,"-"].map((value, key) =>
      <CalcButton key={key} value={value} onClick={this.handleCalculate}/>
    )

    const thirsRow = [1, 2, 3,"+"].map((value, key) =>
      <CalcButton key={key} value={value} onClick={this.handleCalculate}/>
    )

    const forthRow = [".",0,"*","/"].map((value, key) =>
      <CalcButton key={key} value={value} onClick={this.handleCalculate}/>
    )

    return(
      <div className="container">
        <div className="row">
          <input type="text" className="form-control-lg" value={this.state.display} id="results" disabled style={{margin: "15px", marginLeft:"10px", marginTop:"10px"}}/>
        </div>
        {/*First row*/}
        <div className="row">
          {firstRow}
        </div>
        {/* second row */}
        <div className="row">
          {secondRow}
        </div>
        {/* Third row*/}
        <div className="row">
          {thirsRow}
        </div>
        {/*Fourth row*/}
        <div className="row" >
          {forthRow}
        </div>
        {/*fifth row*/}
        <div className="row">
          <div className="col">
            <button onClick={this.handleCalculate} className="btn btn-block btn-dark btn-lg" id="input-button">=</button>
          </div>
        </div>
      </div>
    );
  }
}



export default App;
