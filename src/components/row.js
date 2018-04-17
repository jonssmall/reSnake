"use strict";
import React from "react";

export default function Row(props) {    
  const rowProps = {    
    className: "row"
  };  
  const cells = props.row.map((c,i) => {
    let backgroundColor;
    if (c.occupant) {
      backgroundColor = c.occupant.food ? 'red' : '#175118';    
    } else {
      backgroundColor = '#cecece';
    }
    const cellProps = {
      style: {        
        display: "inline-block",
        height: "30px",
        width: "30px",
        margin: '1px',
        backgroundColor
      },
      key: i
    };
    
    return <div {...cellProps}></div>;
  });
  return (
    <div {...rowProps} >
      {cells}
    </div>
  );
}