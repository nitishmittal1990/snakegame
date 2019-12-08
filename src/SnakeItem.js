import React from 'react';

function SnakeItem(props){
    var class1='';
    if(props.food) {
        class1 = 'food'
    }
    return(
        <div className={"Snakesmallgrid " + class1} id={props.x+'-'+props.y}></div>
    )
}

export default SnakeItem;