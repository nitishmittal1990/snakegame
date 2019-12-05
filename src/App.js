import React,{Component} from 'react';
import './App.css';
import SnakeItem from './SnakeItem';

class App extends Component{

  constructor(){
    super()
    this.state = {
      rows: 10,
      cols: 10,
      
    }
  }

  render(){
    const snakegrid = [];
    for (var i=0;i<this.state.rows;i++){
      for (var j=0;j<this.state.cols;j++){
        snakegrid.push(<SnakeItem row={i+1} col={j+1} key={i+'-'+j}/>)
      }
    }
    console.log(snakegrid);
    return (
      <div className = "SnakeApp">
        {snakegrid}
      </div>
    )
  }
  
}

export default App;
