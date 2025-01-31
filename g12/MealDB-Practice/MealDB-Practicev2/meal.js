// Get the meal ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const mealId = urlParams.get('idMeal');

// Function to render meal details
function renderMealDetails(meal) {
  const container = document.getElementById('meal-details-container');

  // Create HTML structure for the meal details
  const mealHTML = `
    <div class="meal-details">
      <h1>${meal.strMeal}</h1>
      <div class="meal-header">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-image">
        <img src="${getMealFlag(meal.strMeal)}" alt="Flag" class="meal-flag">
      </div>
      <p><strong>Category:</strong> ${meal.strCategory}</p>
      <p><strong>Area:</strong> ${meal.strArea}</p>
      <h2>Ingredients:</h2>
      <ul>
        ${getIngredientsList(meal).map((ingredient, index) => `
          <li>
            ${index + 1}. 
            <img src="${ingredient.imageUrl}" alt="${ingredient.name}" class="ingredient-image">
            ${ingredient.name}
          </li>
        `).join('')}
      </ul>
      <h2>Instructions:</h2>
      <p>${meal.strInstructions}</p>
      <a href="${meal.strYoutube}" target="_blank">Watch on YouTube</a>
    </div>
  `;

  container.innerHTML = mealHTML;
}

// Helper function to get ingredients with image URL
function getIngredientsList(meal) {
  let ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push({
        name: `${measure} ${ingredient}`,
        imageUrl: `https://www.themealdb.com/images/ingredients/${ingredient}.png` // Placeholder image URL
      });
    }
  }
  return ingredients;
}

// Helper function to get the flag image URL for a meal
function getMealFlag(mealName) {
  // Example flags mapping with image URLs
  const flags = {
    "New York Cheesecake": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Flag_of_New_York.svg/1200px-Flag_of_New_York.svg.png",
    "French Toast": "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1280px-Flag_of_France.svg.png",
    "Spaghetti Carbonara": "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/1280px-Flag_of_Italy.svg.png"
    // Add more mappings as necessary
  };
  return flags[mealName] || "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Flag_of_the_United_States.svg/1280px-Flag_of_the_United_States.svg.png"; // Default flag
}

// Fetch meal details by ID
fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
  .then(response => response.json())
  .then(data => {
    if (data.meals) {
      renderMealDetails(data.meals[0]);
    } else {
      document.getElementById('meal-details-container').innerHTML = '<p>Meal not found.</p>';
    }
  })
  .catch(() => {
    document.getElementById('meal-details-container').innerHTML = '<p>Error fetching meal details.</p>';
  });