import React from 'react';

function SnakeItem(props){
    var id = props.row +'-'+props.col;
    return(
        <div id={id} className="Snakesmallgrid"></div>
    )
}

export default SnakeItem;