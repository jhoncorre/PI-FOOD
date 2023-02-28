import React from "react";
// Función que recarga la página
const handleClick = () => {
  window.location.reload();
};
// Componente que muestra un mensaje y un botón
export const Empty = () => {
  return (
    <div>
      <h2>No recipes found</h2>
      <button onClick={(event) => handleClick(event)}>
        <p>Reset</p>
      </button>
    </div>
  );
};
