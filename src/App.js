import React, { useState, useReducer, useRef } from "react";
import "./styles.css";

export default function App() {
  const nameRef = useRef();
  const [items, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "add":
        return [
          ...state,
          {
            id: state.length,
            name: action.name
          }
        ];
      case "remove":
        return state.filter((_, index) => index !== action.index);

      default:
        return state;
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "add",
      name: nameRef.current.value
    });
    nameRef.current.value = "";
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={nameRef} />
      </form>
      <ul>
        {items.map((item, index) => (
          <li>
            {item.name}
            <button onClick={() => dispatch({ type: "remove", index })}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
