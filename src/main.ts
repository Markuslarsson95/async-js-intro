import { MealApiResponse } from "./interfaces";
import "./style.css";
const url = "https://www.themealdb.com/api/json/v1/1/";

const getRandomMeal = async (): Promise<MealApiResponse> => {
  const response = await fetch(url + "random.php");
  const data: MealApiResponse = await response.json();

  return data;
};
let data = await getRandomMeal();
// console.log(data.meals[0].strMeal);
console.log(data);

const title = document.querySelector(".meal-name") as HTMLHeadElement;
const ingredientsList = document.querySelector(
  ".meal-ingredients"
) as HTMLUListElement;
const instructionList = document.querySelector(
  ".meal-instructions"
) as HTMLOListElement;
const randomizeButton = document.querySelector(
  ".randomize-button"
) as HTMLButtonElement;
const image = document.createElement("img") as HTMLImageElement;

randomizeButton.addEventListener("click", async () => {
  data = await getRandomMeal();
  renderMeal();
});

const renderMeal = () => {
  title.innerHTML = "";
  title.innerHTML = data.meals[0].strMeal;

  image.innerHTML = "";
  image.src = data.meals[0].strMealThumb;
  image.alt = data.meals[0].strMeal;
  document.body.appendChild(image);

  const meal = data.meals[0];
  ingredientsList.innerHTML = "";
  for (let i = 1; i < 21; i++) {
    const measure: string | null = meal[`strMeasure${i}`];
    const ingredient: string | null = meal[`strIngredient${i}`];
    if (ingredient && ingredient.trim()) {
      const li = document.createElement("li");
      li.innerHTML = `${measure ? measure + " " : ""}${ingredient}`;
      ingredientsList.appendChild(li);
    }
  }

  instructionList.innerHTML = "";
  const instructions: string = data.meals[0].strInstructions;
  const instructionSteps = instructions.split("\r\n");
  instructionSteps.forEach((step) => {
    if (step.trim()) {
      const li = document.createElement("li");
      li.textContent = step;
      instructionList.appendChild(li);
    }
  });
};

renderMeal();
