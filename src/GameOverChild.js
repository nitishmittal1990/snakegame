import React from 'react';

function GameOverChild(props){
    return(
        <div id="overlay">Game Over <br/> Thank You For Playing
            <button onClick={props.onClicked} id="playBtn">Play Again</button>
            <p>Your Score is {props.score}</p>
        </div>
        
    )
}

export default GameOverChild;