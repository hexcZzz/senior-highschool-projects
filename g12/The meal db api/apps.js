// Function to render the meals for search by name
function renderMealResultsByName(responses) {
  const container = document.getElementById("ingredients-container");
  container.classList.add("container");

  container.innerHTML = "";

  responses.forEach((response) => {
    const mealContainer = document.createElement("div");
    mealContainer.classList.add("meal");

    const linkUrl = document.createElement("a");
    linkUrl.classList.add("btn");
    linkUrl.textContent = "Watch Youtube";
    linkUrl.href = response.strYoutube;
    linkUrl.target = "_blank";

    const titleElement = document.createElement("a");
    titleElement.textContent = response.strMeal;
    titleElement.classList.add('title');
    titleElement.href = `meal.html?idMeal=${response.idMeal}`;  // Links to meal.html with meal ID
    titleElement.target = "_self";

    const categoryElement = document.createElement("p");
    categoryElement.textContent = response.strCategory;

    mealContainer.appendChild(titleElement);
    mealContainer.appendChild(categoryElement);
    mealContainer.appendChild(linkUrl);

    container.appendChild(mealContainer);
  });
}

// Event listener for search button click
document.getElementById('btnSearch').addEventListener('click', function () {
  const searchValue = document.getElementById('SearchName').value.trim();

  if (searchValue) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
      .then(response => response.json())
      .then(data => {
        if (data.meals) {
          renderMealResultsByName(data.meals);
        } else {
          document.getElementById('ingredients-container').innerHTML = '<p>No meals found</p>';
        }
      })
      .catch(() => {
        document.getElementById('ingredients-container').innerHTML = '<p>Error fetching meals</p>';
      });
  } else {
    document.getElementById('ingredients-container').innerHTML = '<p>Please enter a meal name</p>';
  }
});