import React, { useState, useEffect, memo } from "react";

export function Item(props){
  useEffect(() => {
    console.log("Redered - ", props.idx);
  });

  return (<div>Item - {props.idx}</div>);
};

export default function MList(){
  const [state, setState] = useState({
    list: [0, 1, 2, 3, 4],
  });
  console.clear();

  return (
    <div style={{ width: "100vw" }}>
      <div style={{ margin: "auto 10px" }}>
        <button
          style={{ margin: "10px" }}
          onClick={() => {
              setTimeout(()=>{
                setState((prev) => ({
                    list: [state.list.length, ...state.list],
                }));
              }, 1000)
          }}
        >
          Add
        </button>
        <ul>
          {state.list.map((ele) => (
            //   uuid use karle
            <Item key={ele} idx={ele} />
          ))}
        </ul>
      </div>
    </div>
  );
};