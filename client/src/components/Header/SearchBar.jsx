import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../Redux/actions";
import s from "./searchBar.module.css";

export const SearchBar = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const regex = /^[a-zA-Z0-9]+$/;
    if (!regex.test(name)) {
      alert(
        "The search field cannot contain special characters or be empty"
      );
      return;
    }
    setError(null);
    dispatch(actions.searchName(name));
  };
  return (
    <div className={s.searchBar}>
      {error && <div>{error}</div>}
      <input
        className={s.inputSearch}
        placeholder="Name Recipe"
        type="text"
        onChange={handleChange}
      />
      <button className={s.buttonSearch} onClick={handleSubmit}>
        Search Recipe
      </button>
    </div>
  );
};
