import React from "react";
import { Link } from "react-router-dom";
import s from "./landingPage.module.css" 


export function Landing(props) {
  return (
    <div className={s.landingBackground} >
      <div className={s.landingContainer}>
          <h1 className={s.titleLanding} >THE ART OF COOKING</h1>
          <Link  to="/home">
            <button className={s.buttonLanding} >Join</button>{" "}
        </Link>
        </div>
        </div>
  );
}
