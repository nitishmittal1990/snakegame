import React,{Component} from 'react';
import './App.css';
import SnakeItem from './SnakeItem';
import GameOverChild from './GameOverChild';

class App extends Component{

  constructor(){
    super()
    this.state = {
      rows: 10,
      cols: 10,
      snakegrid: [],
      snake:[ 
        {x:4,y:4},
        {x:4,y:3},
      ],
      snakehead: 'right',
      gameover:false,
      gamestart: false,
      food:{},
      inputDisable: false,
      score: 0
    }
    this.resetGame=this.resetGame.bind(this)
    this.generateRandomFood = this.generateRandomFood.bind(this)
    this.formGrid = this.formGrid.bind(this)
    this.snakeMove = this.snakeMove.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.isEatFood = this.isEatFood.bind(this)
    this.handleGameStart = this.handleGameStart.bind(this)
    this.formGrid()
    this.gridUpdate = this.gridUpdate.bind(this)
  }

  generateRandomFood(){
    var foodrow = Math.floor(Math.random() * this.state.rows);
    var foodcol = Math.floor(Math.random() * this.state.cols);
    
    var updatedsnakegrid = this.state.snakegrid.map((eachsnake)=>{
      
      if(eachsnake.x===foodrow && eachsnake.y===foodcol){
        return ({
          id:eachsnake.id,
          x:foodrow,
          y:foodcol,
          isFood:true,
          isSnakePresent:false
        })
      } else {
        return ({
          id:eachsnake.id,
          x:eachsnake.x,
          y:eachsnake.y,
          isFood:false,
          isSnakePresent: eachsnake.isSnakePresent
        })
      }
    })
    
    this.setState({
      snakegrid: updatedsnakegrid,
      food: {x:foodrow,y:foodcol}
    })
    
  }

  formGrid(){
    var createid=1;
    for (var i = 0; i < this.state.rows; i++) {
      for (var j = 0; j < this.state.cols; j++) {
        if(i===4 && j===4){
          this.state.snakegrid.push({
            id: createid,
            x:i,
            y:j,
            isFood: false,
            isSnakePresent: true
          })
        } else if(i === 4 && j === 3){
            this.state.snakegrid.push({
              id: createid,
              x: i,
              y: j,
              isFood: false,
              isSnakePresent: true
            })
        } else {
          this.state.snakegrid.push({
            id: createid,
            x: i,
            y: j,
            isFood: false,
            isSnakePresent: false
          })
        }
        createid++;
      }
    }

  }
  
  isEatFood(snakeface) {
    if (snakeface.x === this.state.food.x && snakeface.y === this.state.food.y) {
      this.generateRandomFood();
      return true;
    }
  }

  /* 
    Function Use: Updating Grid On Snake Move 
  */
  gridUpdate(cursnake){

    let updatedsnakegrid = this.state.snakegrid;
    for(let eachgrid in updatedsnakegrid){

      updatedsnakegrid[eachgrid] = {
        id: updatedsnakegrid[eachgrid].id,
        x: updatedsnakegrid[eachgrid].x,
        y: updatedsnakegrid[eachgrid].y,
        isFood: updatedsnakegrid[eachgrid].isFood,
        isSnakePresent: false,
      }
      for(let eachsnake in cursnake){
        if (updatedsnakegrid[eachgrid].x === cursnake[eachsnake].x && updatedsnakegrid[eachgrid].y === cursnake[eachsnake].y) {
          updatedsnakegrid[eachgrid] = {
            id: updatedsnakegrid[eachgrid].id,
            x: updatedsnakegrid[eachgrid].x,
            y: updatedsnakegrid[eachgrid].y,
            isFood: updatedsnakegrid[eachgrid].isFood,
            isSnakePresent: true,
          }
          break;
        }
      }
    }
    return updatedsnakegrid;
  }

  /* 
    Function Use: Snake Move Login with Snake Direction
  */
  snakeMove(){
    var curScore = this.state.score;
    var updatedsnakegrid;
    var gamestatus=this.state.gameover;
    if(this.state.snakehead==='right'){
      let cursnake = this.state.snake;
      let snakeface = cursnake[0];
      snakeface = {x:snakeface.x, y:snakeface.y+1};
      if (snakeface.y>9){
        gamestatus = true;
      }
      if(this.isEatFood(snakeface)){
        cursnake.unshift(snakeface);
        curScore = curScore + 10;
      } else {
        cursnake.unshift(snakeface);
        cursnake.pop();
      }
      
      for (let y=1;y<cursnake.length;y++) {
        if (snakeface.x === cursnake[y].x && snakeface.y === cursnake[y].y) {
          gamestatus = true;
        }
      }

      updatedsnakegrid = this.gridUpdate(cursnake);
      
      
      
    } else if(this.state.snakehead==='top') {
      let cursnake = this.state.snake;
      let snakeface = cursnake[0];
      snakeface = {
        x: snakeface.x-1,
        y: snakeface.y
      };
      if (snakeface.x < 0) {
        gamestatus = true;
      }
      if (this.isEatFood(snakeface)) {
        cursnake.unshift(snakeface);
        curScore = curScore + 10;
      } else {
        cursnake.unshift(snakeface);
        cursnake.pop();
      }
      for (let y=1;y<cursnake.length;y++) {
        if (snakeface.x === cursnake[y].x && snakeface.y === cursnake[y].y) {
          gamestatus = true;
        }
      }

      updatedsnakegrid = this.gridUpdate(cursnake);

      
    } else if(this.state.snakehead==='left') {
      let cursnake = this.state.snake;
      let snakeface = cursnake[0];
      snakeface = {
        x: snakeface.x,
        y: snakeface.y-1
      };
      if (snakeface.y < 0) {
        gamestatus = true;
      }
      if (this.isEatFood(snakeface)) {
        cursnake.unshift(snakeface);
        curScore = curScore + 10;
      } else {
        cursnake.unshift(snakeface);
        cursnake.pop();
      }
      for (let y=1;y<cursnake.length;y++) {
        if (snakeface.x === cursnake[y].x && snakeface.y === cursnake[y].y) {
          gamestatus = true;
        }
      }


      updatedsnakegrid = this.gridUpdate(cursnake);
      
    } else if(this.state.snakehead==='bottom'){
      let cursnake = this.state.snake;
      let snakeface = cursnake[0];

      snakeface = {
        x: snakeface.x+1,
        y: snakeface.y,
      };
      if (snakeface.x > 9) {
        gamestatus = true;
      }
      if (this.isEatFood(snakeface)) {
        cursnake.unshift(snakeface);
        curScore = curScore + 10;
      } else {
        cursnake.unshift(snakeface);
        cursnake.pop();
      }
      for (let y=1;y<cursnake.length;y++) {
        if (snakeface.x === cursnake[y].x && snakeface.y === cursnake[y].y) {
          gamestatus = true;
        }
      }


      updatedsnakegrid = this.gridUpdate(cursnake);
      
      
    } else{

    }

    
    this.setState({
      snakegrid: updatedsnakegrid,
      gameover: gamestatus,
      score: curScore
    })
  }

  handleKeyPress(event){
    var movestate;
    if (event.keyCode === 37) {
      movestate='left'; 
    } else if (event.keyCode === 38) {
      movestate='top'
    } else if (event.keyCode === 39) {
      movestate = 'right'
    } else if (event.keyCode === 40) {
      movestate='bottom'
    } else {
      
    }

    this.setState(function (prevState){
      if (prevState.snakehead === 'right' || prevState.snakehead==='left') {

        if (movestate === 'top' || movestate === 'bottom') {

          return {
            snakehead: movestate
          }
        } else {
          return{
            snakehead: prevState.snakehead
          }
        }
      } else if (prevState.snakehead === 'top' || prevState.snakehead === 'bottom') {
        if (movestate === 'left' || movestate==='right') {
          return {
            snakehead: movestate
          }
        } else {
          return {
            snakehead: prevState.snakehead
          }
        }
      }
    })

  }

  
  handleGameStart(){
    this.setState({
      gamestart: true
    })
    setInterval(() => {
      this.snakeMove();
    }, 400);
  }

  componentDidMount(){
    this.generateRandomFood();
    if(this.state.gamestart) {
      
    }
    document.addEventListener("keydown", this.handleKeyPress);
  }

  
  resetGame(){
    window.location.reload();
  }
  

  render(){
    if(this.state.gamestart){
      var snakegridlist = this.state.snakegrid.map((eachsnake)=>{
        return <SnakeItem x={eachsnake.x} y={eachsnake.y} isSnake={eachsnake.isSnakePresent} food={eachsnake.isFood} key={eachsnake.x+'-'+eachsnake.y} id={eachsnake.id} />
      })
    } else {
      var startBtn = <button onClick={this.handleGameStart} id="gStart">Start Game</button>;
    }
    
    
    return (
      <div className="snakegame">
        <h1> Snake World </h1>
        <p className="scoredisplay">Your Score: {this.state.score} </p>
        {startBtn}
        <div className = "SnakeApp">
          {this.state.gameover?(<GameOverChild onClicked={this.resetGame} score={this.state.score} />):null}
          
          {snakegridlist}
        </div>
      </div>
    )
  }
  
}

export default App;
