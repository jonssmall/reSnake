"use strict";
import React from "react";

export default function Row(props) {    
  const rowProps = {    
    className: "row"
  };  
  const cells = props.row.map((c,i) => {
    const cellProps = {
      style: {        
        display: "inline-block",
        height: "20px",
        width: "20px",
        margin: '1px',
        backgroundColor: c.occupant ? "#175118" : "#cecece"
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