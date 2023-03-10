import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../Redux/actions";
import { useHistory } from "react-router-dom";
import validate from "./validate";
import { Link } from "react-router-dom";
import s from "./createRecipe.module.css";

export const CreateRecipe = (props) => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const dietas = useSelector((state) => state.dietas);
  const [enable] = useState(false);
  const history = useHistory();

  const [input, setInput] = useState({
    name: "",
    summary: "",
    healthScore: 10,
    image: "",
    diets: [],
    steps: "",
  });
  const [errorInput, setErrorInput] = useState({
    name: "",
    summary: "",
    healthScore: 0,
    image: "",
    diets: [],
    steps: "",
  });

  useEffect(() => {
    dispatch(actions.getDiets());
  }, [dispatch]);
  const handleCheckChange = (e) => {
    if (e.target.checked) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });

      setErrorInput(
        validate({
          ...input,
          diets: [...input.diets, e.target.value],
        })
      );
    } else {
      setInput({
        ...input,
        diets: input.diets.filter((t) => t !== e.target.value),
      });
      setErrorInput(
        validate(
          {
            ...input,
            diets: input.diets.filter((t) => t !== e.target.value),
          },
          [...recipes]
        )
      );
    }
  };
  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
    setErrorInput(
      validate({ ...input, [event.target.name]: event.target.value })
    );
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (recipes.find((ele) => ele.name === input.name)) {
      alert("This recipe already exists");
      return;
    }
    dispatch(actions.postRecipes(input));
    setInput({
      ...input,
      name: "",
      summary: "",
      healthScore: 10,
      image: "",
      diets: [],
      steps: "",
    });
    alert("Recipe created successfully");
    history.push("/home");
  };

  return (
    <div className={s.formContainer}>
      <div className={s.mainForm}>
        <Link to="/home">
          <button className={s.buttonBack}>Back to home</button>
        </Link>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={s.inputs}>
            <label>Name:</label>
            {errorInput.name ? <span>{errorInput.name}</span> : <span></span>}

            <input
              type="text"
              name="name"
              placeholder="Enter the name of your recipe.."
              value={input.name}
              onChange={(e) => handleChange(e)}
            />
            <label>Description:</label>
            {errorInput.summary ? (
              <span>{errorInput.summary}</span>
            ) : (
              <span></span>
            )}

            <textarea
              type="text"
              name="summary"
              placeholder="Description of your recipe"
              value={input.summary}
              onChange={(e) => handleChange(e)}
            />

            <label>HealthScore</label>
            {errorInput.healthScore ? (
              <span>{errorInput.healthScore}</span>
            ) : (
              <span></span>
            )}
            <input
              type="number"
              name="healthScore"
              placeholder="What nutritional score does it have?"
              value={input.healthScore}
              onChange={(e) => handleChange(e)}
            />
            <label>Imagen:</label>
            {errorInput.image ? <span>{errorInput.image}</span> : <span></span>}
            <input
              type="text"
              name="image"
              placeholder="Please a link to your recipe photo"
              value={input.image}
              onChange={(e) => handleChange(e)}
            />

            <label>Pasos de preparacion:</label>
            {errorInput.steps ? <span>{errorInput.steps}</span> : <span></span>}
            <textarea
              type="text"
              name="steps"
              placeholder="Steps to make the recipe"
              value={input.steps}
              onChange={(e) => handleChange(e)}
            />

            <div className={s.diets}>
              <label>Types of Diets:</label>
              {dietas?.map((diet) => {
                return (
                  <div key={diet.name}>
                    <input
                      type="checkbox"
                      id={diet.id}
                      value={diet.name}
                      onChange={handleCheckChange}
                    />
                    <label htmlFor={diet.id}>{diet.name}</label>
                  </div>
                );
              })}
              {errorInput.diets ? (
                <span>{errorInput.diets}</span>
              ) : (
                <span></span>
              )}
            </div>
            
          </div>
          
          {!Object.entries(errorInput).length ? (
              <button type="submit">Create Recipe</button>
            ) : (
              <div className={s.buttonCreate}>
                <button type="submit" disabled={!enable}>
                  Create Recipe
                </button>
                <span> Incomplete required fields</span>
              </div>
            )}
          
          
        </form>
      </div>
    </div>
  );
};
