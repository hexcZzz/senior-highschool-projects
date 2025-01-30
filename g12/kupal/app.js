// Function to render meals with image, title, and category
function renderMealResults(responses) {
  const container = document.getElementById("ingredients-container");
  container.classList.add("container");
  container.innerHTML = "";

  responses.forEach((response) => {
    const mealContainer = document.createElement("div");
    mealContainer.classList.add("meal");

    const mealImage = document.createElement("img");
    mealImage.src = response.strMealThumb;
    mealImage.alt = response.strMeal;
    mealImage.classList.add("meal-image");

    const titleElement = document.createElement("a");
    titleElement.textContent = response.strMeal;
    titleElement.classList.add('title');
    titleElement.href = "#"; // Prevent page navigation
    
    // Add click event to fetch meal details and prevent page navigation
    titleElement.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent the default link behavior
      fetchMealDetailsById(response.idMeal); // Fetch and display meal details
      scrollToDetails(); // Smooth scroll to the details container
    });

    const categoryElement = document.createElement("p");
    categoryElement.textContent = response.strCategory || 'Unknown Category';

    mealContainer.appendChild(mealImage);
    mealContainer.appendChild(titleElement);
    mealContainer.appendChild(categoryElement);

    container.appendChild(mealContainer);
  });
}

// Function to fetch meal details including category
function fetchMealDetails(meals) {
  const mealPromises = meals.map(meal =>
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
      .then(response => response.json())
      .then(data => data.meals ? data.meals[0] : null)
  );

  return Promise.all(mealPromises);
}

// Function to reset other dropdowns
function resetOtherDropdowns(except) {
  const dropdowns = ['letterSelect', 'categorySelect', 'areaSelect'];
  dropdowns.forEach(id => {
    if (id !== except) {
      const dropdown = document.getElementById(id);
      dropdown.selectedIndex = 0; // Reset to default
    }
  });
}

// Add event listener for letter dropdown
document.getElementById('letterSelect').addEventListener('change', function () {
  const letter = this.value;
  resetOtherDropdowns('letterSelect');

  if (letter) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
      .then(response => response.json())
      .then(data => {
        if (data.meals) {
          renderMealResults(data.meals);
        } else {
          document.getElementById('ingredients-container').innerHTML = '<p>No meals found</p>';
        }
      })
      .catch(() => {
        document.getElementById('ingredients-container').innerHTML = '<p>Error fetching meals</p>';
      });
  }
});

// Add event listener for category dropdown
document.getElementById('categorySelect').addEventListener('change', function () {
  const category = this.value;
  resetOtherDropdowns('categorySelect');

  if (category) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then(response => response.json())
      .then(data => {
        if (data.meals) {
          fetchMealDetails(data.meals)
            .then(detailedMeals => renderMealResults(detailedMeals));
        } else {
          document.getElementById('ingredients-container').innerHTML = '<p>No meals found in this category</p>';
        }
      })
      .catch(() => {
        document.getElementById('ingredients-container').innerHTML = '<p>Error fetching meals</p>';
      });
  }
});

// Add event listener for area dropdown
document.getElementById('areaSelect').addEventListener('change', function () {
  const area = this.value;
  resetOtherDropdowns('areaSelect');

  if (area) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area.charAt(0).toUpperCase() + area.slice(1)}`)
      .then(response => response.json())
      .then(data => {
        if (data.meals) {
          fetchMealDetails(data.meals)
            .then(detailedMeals => renderMealResults(detailedMeals));
        } else {
          document.getElementById('ingredients-container').innerHTML = '<p>No meals found in this area</p>';
        }
      })
      .catch(() => {
        document.getElementById('ingredients-container').innerHTML = '<p>Error fetching meals</p>';
      });
  }
});

// Function to render the meals for search by name
function renderMealResultsByName(responses) {
  const container = document.getElementById("ingredients-container");
  container.classList.add("container");
  container.innerHTML = "";

  responses.forEach((response) => {
    const mealContainer = document.createElement("div");
    mealContainer.classList.add("meal");

    const mealImage = document.createElement("img");
    mealImage.src = response.strMealThumb;
    mealImage.alt = response.strMeal;
    mealImage.classList.add("meal-image");

    const titleElement = document.createElement("a");
    titleElement.textContent = response.strMeal;
    titleElement.classList.add('title');
    titleElement.href = "#"; // Prevent page navigation
    
    // Add click event to fetch meal details and prevent page navigation
    titleElement.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent the default link behavior
      fetchMealDetailsById(response.idMeal); // Fetch and display meal details
      scrollToDetails(); // Smooth scroll to the details container
    });

    const categoryElement = document.createElement("p");
    categoryElement.textContent = response.strCategory;

    mealContainer.appendChild(mealImage);
    mealContainer.appendChild(titleElement);
    mealContainer.appendChild(categoryElement);

    container.appendChild(mealContainer);
  });
}

// Function to search meals based on input value
function searchMeals() {
  const searchValue = document.getElementById('SearchName').value.trim();
  const container = document.getElementById('ingredients-container');

  if (searchValue) {
    // Check if the input is a number (meal ID)
    if (!isNaN(searchValue)) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${searchValue}`)
        .then(response => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.json();
        })
        .then(data => {
          if (data.meals) {
            renderMealResultsByName(data.meals);
          } else {
            container.innerHTML = '<p>No meals found</p>';
          }
        })
        .catch(error => {
          console.error('Error fetching meals by ID:', error);
          container.innerHTML = '<p>Error fetching meal by ID. Please check the ID and try again.</p>';
        });
    } else {
      // Search by meal name
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
        .then(response => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.json();
        })
        .then(data => {
          if (data.meals) {
            renderMealResultsByName(data.meals);
          } else {
            container.innerHTML = '<p>No meals found</p>';
          }
        })
        .catch(error => {
          console.error('Error fetching meals by name:', error);
          container.innerHTML = '<p>Error fetching meals. Please try again later.</p>';
        });
    }
  } else {
    container.innerHTML = '<p>Please enter a meal name or ID</p>';
  }
}

// Event listener for input in the search box
document.getElementById('SearchName').addEventListener('input', searchMeals);


// Function to render meal results with click event to load details
function renderMealResults(responses) {
  const container = document.getElementById("ingredients-container");
  container.classList.add("container");
  container.innerHTML = "";

  responses.forEach((response) => {
    const mealContainer = document.createElement("div");
    mealContainer.classList.add("meal");

    const mealImage = document.createElement("img");
    mealImage.src = response.strMealThumb;
    mealImage.alt = response.strMeal;
    mealImage.classList.add("meal-image");

    const titleElement = document.createElement("a");
    titleElement.textContent = response.strMeal;
    titleElement.classList.add('title');
    titleElement.href = "#"; // Prevent page navigation
    titleElement.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent the default link behavior
      fetchMealDetailsById(response.idMeal); // Load meal details on click
      scrollToDetails(); // Scroll to details container
    });

    const categoryElement = document.createElement("p");
    categoryElement.textContent = response.strCategory || 'Unknown Category';

    mealContainer.appendChild(mealImage);
    mealContainer.appendChild(titleElement);
    mealContainer.appendChild(categoryElement);

    container.appendChild(mealContainer);
  });
}

// Function to scroll smoothly to the details container
function scrollToDetails() {
  const detailsContainer = document.getElementById('meal-details-container');
  detailsContainer.scrollIntoView({ behavior: 'smooth' }); // Smooth
  detailsContainer.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the details container
}

// Function to fetch and render meal details
function fetchMealDetailsById(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(response => response.json())
    .then(data => {
      if (data.meals) {
        renderMealDetails(data.meals[0]); // Render meal details
      } else {
        document.getElementById('meal-details-container').innerHTML = '<p>Meal not found.</p>';
      }
    })
    .catch(() => {
      document.getElementById('meal-details-container').innerHTML = '<p>Error fetching meal details.</p>';
    });
}

// Function to render meal details in the container
function renderMealDetails(meal) {
  const container = document.getElementById('meal-details-container');

  // Create HTML structure for the meal details
  const mealHTML = `
    <div class="meal-details">
        <hr id="hr">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-image">
    <p id="b"><strong>Category:</strong> ${meal.strCategory}</p>
      <p id="b"><strong>Area:</strong> ${meal.strArea}</p>
      <p id="b"><strong>Meal ID:</strong> ${meal.idMeal}</p> <!-- Display Meal ID here -->
      <h2>Ingredients:</h2>
      <div id="meal-d">
      <ul>
        ${getIngredientsList(meal).map((ingredient, index) => `
          <li>
            ${index + 1}. 
            <img src="${ingredient.imageUrl}" alt="${ingredient.name}" class="ingredient-image" id="a">
            ${ingredient.name}
          </li>
        `).join('')}
      </ul>
      </div>
      <h2>Instructions:</h2>
      <p id="pr">${meal.strInstructions}</p>
      ${meal.strYoutube ? ` <a href="${meal.strYoutube}" target="_blank">
        <img src="https://i.ibb.co/9sk9y0x/watch-on-youtube.png" id="yt">
      </a> ` : ''}
    </div>
  `;

  container.innerHTML = mealHTML; // Display the meal details
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
        imageUrl: `https://www.themealdb.com/images/ingredients/${ingredient}.png`
      });
    }
  }
  return ingredients;
}

