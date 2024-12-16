interface Meal {
  idMeal: string;
  strMeal: string;
  strArea: string;
  strCategory: string;
  strInstructions: string;
  strMealThumb: string;
  strSource: string;
  strTags: string;
  strYoutube: string;
  [key: string]: string | null; // To accommodate other dynamic fields like strIngredient1, strMeasure1, etc.
}

export interface MealApiResponse {
  meals: Meal[];
}
