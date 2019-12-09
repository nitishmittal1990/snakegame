import React,{Component} from 'react';
import './App.css';
import SnakeItem from './SnakeItem';

class App extends Component{

  constructor(){
    super()
    this.state = {
      rows: 10,
      cols: 10,
      snakegrid: [],
      snake:[
        {
          x:5,
          y:5
        },
        {
          x:5,
          y:4
        }
      ],
      snakehead: 'right',
      gameover:false
    }
    this.generateRandomFood = this.generateRandomFood.bind(this)
    this.formGrid = this.formGrid.bind(this)
    this.snakeMove = this.snakeMove.bind(this)
  }

  generateRandomFood(){
    console.log("hello");
    var gotfood = true;
    while (gotfood) {
      console.log("enter");
      var foodrow = Math.floor(Math.random() * this.state.rows) + 1;
      var foodcol = Math.floor(Math.random() * this.state.cols) + 1;
      gotfood = false;
      for (var snobj in this.state.snake) {
        if (this.state.snake[snobj].x === foodrow && this.state.snake[snobj].y === foodcol) {
          gotfood = true;
          continue;
        } 
      }
    }
    
    var updatedsnakegrid = this.state.snakegrid.map((eachsnake)=>{
      // console.log(foodrow,foodcol);
      if(eachsnake.x===foodrow && eachsnake.y===foodcol){
        return ({
          id:eachsnake.id,
          x:foodrow,
          y:foodcol,
          isFood:true,
          isSnakePresent:false
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
    var createid=1;
    for (var i = 0; i < this.state.rows; i++) {
      for (var j = 0; j < this.state.cols; j++) {
        if(i===4&& j===4){
          this.state.snakegrid.push({
            id: createid,
            x: i + 1,
            y: j + 1,
            isFood: false,
            isSnakePresent: true
          })
        } else if(i === 4 && j === 3){
            this.state.snakegrid.push({
              id: createid,
              x: i + 1,
              y: j + 1,
              isFood: false,
              isSnakePresent: true
            })
        } else {
          this.state.snakegrid.push({
            id: createid,
            x: i + 1,
            y: j + 1,
            isFood: false,
            isSnakePresent: false
          })
        }
        createid++;
      }
    }
    // console.log(this.state.snakegrid);  
  }
  
  snakeMove(){
    if (this.state.snakehead==="right"){
      var gamestatus = this.state.gameover;
      var cursnakegrid = [];
      this.state.snakegrid.forEach(function(eachgrid){
        if (eachgrid.isSnakePresent === true) {
          cursnakegrid.push(eachgrid.id+1);
        }
      })
      
      var updatedsnakegrid = this.state.snakegrid.map(function(eachgrid){
        if(cursnakegrid.includes(eachgrid.id)){
          return ({
            id: eachgrid.id,
            x: eachgrid.x,
            y: eachgrid.y,
            isFood: eachgrid.isFood,
            isSnakePresent: true
          })
        } else {
          return({
              id: eachgrid.id,
              x: eachgrid.x,
              y: eachgrid.y,
              isFood: eachgrid.isFood,
              isSnakePresent: false
          })
        }
      })
      console.log(cursnakegrid);
    }
    updatedsnakegrid.forEach(function(eachsnake){
      if(eachsnake.isSnakePresent===true && eachsnake.y===10){
        gamestatus = true;
      }
    })
    this.setState({
      snakegrid:updatedsnakegrid,
      gameover: gamestatus
    })
  }

  UNSAFE_componentWillMount(){
    this.formGrid()
  }
  componentDidMount(){
    this.generateRandomFood();
    setInterval(() => {
      this.snakeMove();
    }, 2000);
    
  }

  render(){
    var snakegridlist = this.state.snakegrid.map((eachsnake)=>{
      return <SnakeItem x={eachsnake.x} y={eachsnake.y} isSnake={eachsnake.isSnakePresent} food={eachsnake.isFood} key={eachsnake.x+'-'+eachsnake.y} id={eachsnake.id} />
    })
    
    return (
      <div className = "SnakeApp">
        {this.state.gameover?alert("game over"):null}
        {this.state.gameover?window.location.reload():null}
        {snakegridlist}
      </div>
    )
  }
  
}

export default App;
