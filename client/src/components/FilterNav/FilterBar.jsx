import React from "react";
import { Dietas } from "./FilterDietas/Dietas";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../Redux/actions";
import { useState, useEffect } from "react";
import s from "./filter.module.css";

export const FilterBar = (props) => {
  const [select, setselect] = useState([]);

  const dispatch = useDispatch();
  const recetas2 = useSelector((state) => state.recipeCopy);

  const handleChange2 = (e) => {
    const name = e.target.value;
    const buscar = select.find((ele) => ele === name);
    if (buscar) {
      setselect(select.filter((dietas) => dietas !== name));
    } else {
      setselect([...select, e.target.value]);
    }
  };

  const filtroDietas = (select, dietas) => {
    for (const id of select) {
      const result = dietas?.find((ele) => ele === id);
      if (!result) return false;
    }
    return true;
  };

  const filtro = recetas2?.filter((ele) => filtroDietas(select, ele.diets));

  useEffect(() => {
    dispatch(actions.filterByDiets(filtro));
    dispatch(actions.change_page(1));
  }, [select]);

  const handleClick = () => {
    window.location.reload();
  };
  return (
    <div className={s.sideBarContainer}>
      <div>
        <h2>Filter By Diets</h2>

        <Dietas handleChange2={handleChange2} />
        <button
          className={s.buttonLimpiar}
          onClick={(event) => handleClick(event)}
        >
          <p>CLEAN</p>
        </button>
      </div>
    </div>
  );
};
