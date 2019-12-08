import React from 'react';

function SnakeItem(props){
    var class1='';
    var snakepresent = '';
    if(props.food) {
        class1 = 'food'
    }
    if (props.isSnake) {
        snakepresent ='snakepresent'
    }
    return(
        <div className={"Snakesmallgrid " + class1 + snakepresent} id={props.x+'-'+props.y}></div>
    )
}

export default SnakeItem;