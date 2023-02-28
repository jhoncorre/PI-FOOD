export const GET_RECIPES = "ADD_RECIPE";
export const SEARCH_NAME = "SEARCH_NAME";
export const GET_DIETS = "GET_DIETS";
export const FILTER_DIETS = "FILTER_DIETS";
export const ORDER_BY_LETTER = "ORDER_BY_LETTER";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const HEALTH_SCORE = "HEALTH_SCORE";
export const RECIPE_ID = "RECIPE_ID";
export const CLEARID = "CLEARID";
export const SET_PAGES = "SET_PAGES";
export const BURGER = "BURGER";
export const FILTER_CREATED = "FILTER_CREATED";

const initialState = {
  recipes: [true],
  searchRecipe: [],
  dietas: [],
  recipeId: [],
  currentPage: 1,
  filterRecipe: [],
  recipeCopy: [],
  hamburguer: false,
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        recipeCopy: action.payload,
        searchRecipe: action.payload,
      };
    case SEARCH_NAME:
      return {
        ...state,
        recipes: action.payload,
        currentPage: 1,
      };
   case GET_DIETS:
      return {
        ...state,
        dietas: action.payload,
      };
   case FILTER_DIETS:
      return {
        ...state,
        recipes: [...action.payload],
      };
   case ORDER_BY_LETTER:
      const allRecipe = [...state.recipes];
      const sortedLetter = allRecipe.sort((a, b) => {
        if (action.payload === "A-Z") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
      return {
        ...state,
        recipes: sortedLetter,
        currentPage: 2,
      };
   case HEALTH_SCORE:
      let allRecipes = [...state.recipes]; 
      let orderByHs; 
      if (action.payload === "max") {
        orderByHs = allRecipes.sort((a, b) => b.healthScore - a.healthScore);
      } else {
        orderByHs = allRecipes.sort((a, b) => a.healthScore - b.healthScore);
      }
      return {
        ...state,
        recipes: orderByHs, 
        currentPage: 2, 
      };
   case CHANGE_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
   case SET_PAGES: {
      return {
        ...state,
        currentPage: action.payload,
      };
    }
   case RECIPE_ID:
      return {
        ...state,
        recipeId: action.payload,
      };
   default:
      return { ...state };
  }
}
export default rootReducer;