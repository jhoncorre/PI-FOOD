const validate = (input) => {
  const patterns = {
    name: {
      pattern: /^\S[a-zA-Z\s]{1,20}\S$/,
      errorMessage: "Your recipe name should be with letters A to Z",
    },
    healthScore: {
      pattern: /^([1-9][0-9]|100)$/,
      errorMessage: "Nutritional score should be 10 to 100",
    },
    image: {
      pattern:
        /(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?.*(png|jpg|jpeg|gif)$/,
      errorMessage:
        "You must insert an image with a secure link (https) and jpg, jpeg, png or gift format ",
    },
    steps: {
      pattern: /^[a-zA-ZÀ-ÿ0-9\s]{25,500}$/u,
      errorMessage:
        "Your steps can only contain numbers from 1 to 10, minimum letters 25 to 500 characters",
    },
    summary: {
      pattern: /^[a-zA-ZÀ-ÿ0-9\s]{25,500}$/u,
      errorMessage:
        "Your description can only contain numbers from 1 to 10, minimum letters 25 to 500 characters",
    },
    diets: {
      pattern: /^.+$/,
      errorMessage:
        "Oops!, please add what type of diet your recipe adapts to",
    },
  };
  let errorInput = {};

  for (const error in patterns) {
    if (!patterns[error].pattern.test(input[error])) {
      errorInput[error] = patterns[error].errorMessage;
    }
  }

  return errorInput;
};

export default validate;
