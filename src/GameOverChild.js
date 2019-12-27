import React from 'react';

function GameOverChild(props){
    return(
        <div id="overlay">Game Over <br/> Thank You For Playing
            <button onClick={props.onClicked}>Play Again</button>
        </div>
        
    )
}

export default GameOverChild;