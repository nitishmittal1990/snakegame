import React,{Component} from 'react';
import './App.css';
import SnakeItem from './SnakeItem';
import { throwStatement } from '@babel/types';

class App extends Component{

  constructor(){
    super()
    this.state = {
      rows: 10,
      cols: 10,
      snakegrid: [],
    }
    this.generateRandomFood = this.generateRandomFood.bind(this)
    this.formGrid = this.formGrid.bind(this)
  }

  generateRandomFood(){
    console.log("hello")
    var foodrow = Math.floor(Math.random() * this.state.rows);
    var foodcol = Math.floor(Math.random() * this.state.cols);
    var updatedsnakegrid = this.state.snakegrid.map((eachsnake)=>{
      console.log(foodrow,foodcol);
      if(eachsnake.x===foodrow && eachsnake.y===foodcol){
        return ({
          x:foodrow,
          y:foodcol,
          isFood:true
        })
      } else {
        return eachsnake
      }
    })
    // console.log(updatedsnakegrid)
    this.setState({
      snakegrid: updatedsnakegrid
    })
    // prevState.snakegrid[i].key === key
    
    
  }
  formGrid(){
    for (var i = 0; i < this.state.rows; i++) {
      for (var j = 0; j < this.state.cols; j++) {
        this.state.snakegrid.push({
          x: i + 1,
          y: j + 1,
          isFood: false
        })
      }
    }
    
  }
  UNSAFE_componentWillMount(){
    this.formGrid()
  }
  componentDidMount(){
    this.generateRandomFood();
  }

  render(){
    var snakegridlist = this.state.snakegrid.map((eachsnake)=>{
      return <SnakeItem x={eachsnake.x} y={eachsnake.y} food={eachsnake.isFood} key={eachsnake.x+'-'+eachsnake.y}/>
    })
    return (
      <div className = "SnakeApp">
        {snakegridlist}
      </div>
    )
  }
  
}

export default App;
