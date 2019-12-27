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
        {x:4,y:4},
        {x:4,y:3},
      ],
      snakehead: 'right',
      gameover:false
    }
    this.generateRandomFood = this.generateRandomFood.bind(this)
    this.formGrid = this.formGrid.bind(this)
    this.snakeMove = this.snakeMove.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.formGrid()
  }

  generateRandomFood(){
    var foodrow = Math.floor(Math.random() * this.state.rows) + 1;
    var foodcol = Math.floor(Math.random() * this.state.cols) + 1;
    
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
        return eachsnake
      }
    })
    
    this.setState({
      snakegrid: updatedsnakegrid
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
    // console.log(this.state.snakegrid);  
  }
  
  snakeMove(){
    var updatedsnakegrid;
    if(this.state.snakehead==='right'){
      let cursnake = this.state.snake;
      let snakeface = cursnake[0];
      // console.log('snakeface', snakeface);
      snakeface = {x:snakeface.x, y:snakeface.y+1};
      // snakeface.y = snakeface.y + 1;
      // console.log('snakeface-updated', snakeface);
      
      // console.log(cursnake);
      cursnake.unshift(snakeface);
      cursnake.pop();
      // console.log(cursnake);
      updatedsnakegrid = this.state.snakegrid;
      // console.log(updatedsnakegrid);
      for(let eachgrid in updatedsnakegrid){
        // console.log(updatedsnakegrid[eachgrid], "eachgrid");
        updatedsnakegrid[eachgrid] = {
          id: updatedsnakegrid[eachgrid].id,
          x: updatedsnakegrid[eachgrid].x,
          y: updatedsnakegrid[eachgrid].y,
          isFood: updatedsnakegrid[eachgrid].isFood,
          isSnakePresent: false,
        }
        for(let eachsnake in cursnake){
          // console.log(eachsnake,"eachsnakee");
          if (updatedsnakegrid[eachgrid].x === cursnake[eachsnake].x && updatedsnakegrid[eachgrid].y === cursnake[eachsnake].y) {
            // console.log('entered');
            // var curgrid = eachgrid;
            updatedsnakegrid[eachgrid] = {
              id: updatedsnakegrid[eachgrid].id,
              x: updatedsnakegrid[eachgrid].x,
              y: updatedsnakegrid[eachgrid].y,
              isFood: updatedsnakegrid[eachgrid].isFood,
              isSnakePresent: true,
            }
            break;
            // console.log('####')
            // console.log(updatedsnakegrid[eachgrid]);
          }
        }
      }
      
    } else if(this.state.snakehead==='top') {
      let cursnake = this.state.snake;
      let snakeface = cursnake[0];
      // console.log('snakeface', snakeface);
      snakeface = {
        x: snakeface.x-1,
        y: snakeface.y
      };
      // snakeface.y = snakeface.y + 1;
      // console.log('snakeface-updated', snakeface);

      // console.log(cursnake);
      cursnake.unshift(snakeface);
      cursnake.pop();
      // console.log(cursnake);
      updatedsnakegrid = this.state.snakegrid;
      // console.log(updatedsnakegrid);
      for (let eachgrid in updatedsnakegrid) {
        // console.log(updatedsnakegrid[eachgrid], "eachgrid");
        updatedsnakegrid[eachgrid] = {
          id: updatedsnakegrid[eachgrid].id,
          x: updatedsnakegrid[eachgrid].x,
          y: updatedsnakegrid[eachgrid].y,
          isFood: updatedsnakegrid[eachgrid].isFood,
          isSnakePresent: false,
        }
        for (let eachsnake in cursnake) {
          // console.log(eachsnake,"eachsnakee");
          if (updatedsnakegrid[eachgrid].x === cursnake[eachsnake].x && updatedsnakegrid[eachgrid].y === cursnake[eachsnake].y) {
            // console.log('entered');
            // var curgrid = eachgrid;
            updatedsnakegrid[eachgrid] = {
              id: updatedsnakegrid[eachgrid].id,
              x: updatedsnakegrid[eachgrid].x,
              y: updatedsnakegrid[eachgrid].y,
              isFood: updatedsnakegrid[eachgrid].isFood,
              isSnakePresent: true,
            }
            break;
            // console.log('####')
            // console.log(updatedsnakegrid[eachgrid]);
          }
        }
      }
    } else if(this.state.snakehead==='left') {
      let cursnake = this.state.snake;
      let snakeface = cursnake[0];
      // console.log('snakeface', snakeface);
      snakeface = {
        x: snakeface.x,
        y: snakeface.y-1
      };
      // snakeface.y = snakeface.y + 1;
      // console.log('snakeface-updated', snakeface);

      // console.log(cursnake);
      cursnake.unshift(snakeface);
      cursnake.pop();
      // console.log(cursnake);
      updatedsnakegrid = this.state.snakegrid;
      // console.log(updatedsnakegrid);
      for (let eachgrid in updatedsnakegrid) {
        // console.log(updatedsnakegrid[eachgrid], "eachgrid");
        updatedsnakegrid[eachgrid] = {
          id: updatedsnakegrid[eachgrid].id,
          x: updatedsnakegrid[eachgrid].x,
          y: updatedsnakegrid[eachgrid].y,
          isFood: updatedsnakegrid[eachgrid].isFood,
          isSnakePresent: false,
        }
        for (let eachsnake in cursnake) {
          // console.log(eachsnake,"eachsnakee");
          if (updatedsnakegrid[eachgrid].x === cursnake[eachsnake].x && updatedsnakegrid[eachgrid].y === cursnake[eachsnake].y) {
            // console.log('entered');
            // var curgrid = eachgrid;
            updatedsnakegrid[eachgrid] = {
              id: updatedsnakegrid[eachgrid].id,
              x: updatedsnakegrid[eachgrid].x,
              y: updatedsnakegrid[eachgrid].y,
              isFood: updatedsnakegrid[eachgrid].isFood,
              isSnakePresent: true,
            }
            break;
            // console.log('####')
            // console.log(updatedsnakegrid[eachgrid]);
          }
        }
      }
    } else if(this.state.snakehead==='bottom'){
      let cursnake = this.state.snake;
      let snakeface = cursnake[0];
      // console.log('snakeface', snakeface);
      snakeface = {
        x: snakeface.x+1,
        y: snakeface.y,
      };
      // snakeface.y = snakeface.y + 1;
      // console.log('snakeface-updated', snakeface);

      // console.log(cursnake);
      cursnake.unshift(snakeface);
      cursnake.pop();
      // console.log(cursnake);
      updatedsnakegrid = this.state.snakegrid;
      // console.log(updatedsnakegrid);
      for (let eachgrid in updatedsnakegrid) {
        // console.log(updatedsnakegrid[eachgrid], "eachgrid");
        updatedsnakegrid[eachgrid] = {
          id: updatedsnakegrid[eachgrid].id,
          x: updatedsnakegrid[eachgrid].x,
          y: updatedsnakegrid[eachgrid].y,
          isFood: updatedsnakegrid[eachgrid].isFood,
          isSnakePresent: false,
        }
        for (let eachsnake in cursnake) {
          // console.log(eachsnake,"eachsnakee");
          if (updatedsnakegrid[eachgrid].x === cursnake[eachsnake].x && updatedsnakegrid[eachgrid].y === cursnake[eachsnake].y) {
            // console.log('entered');
            // var curgrid = eachgrid;
            updatedsnakegrid[eachgrid] = {
              id: updatedsnakegrid[eachgrid].id,
              x: updatedsnakegrid[eachgrid].x,
              y: updatedsnakegrid[eachgrid].y,
              isFood: updatedsnakegrid[eachgrid].isFood,
              isSnakePresent: true,
            }
            break;
            // console.log('####')
            // console.log(updatedsnakegrid[eachgrid]);
          }
        }
      }
    } else{

    }
    
    
    
    this.setState({
      snakegrid: updatedsnakegrid,
      // gameover: gamestatus
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
    console.log(movestate,'keypress');
    
    this.setState(function (prevState){
      if (prevState.snakehead === 'right' || prevState.snakehead==='left') {
        // console.log(movestate,'coming inside prev left right')
        if (movestate === 'top' || movestate === 'bottom') {
          // console.log(movestate,'coming inside')
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
    console.log(this.state.snakehead);
  }
  componentDidMount(){
    this.generateRandomFood();
    setInterval(() => {
      this.snakeMove();
    }, 400);
    
  }

  componentDidUpdate(){
    // console.log("hello");
    // this.snakeMove();
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
        
        <div>
          <input type="text" id="one" onKeyDown={this.handleKeyPress} />
        </div>
        
      </div>
    )
  }
  
}

export default App;
