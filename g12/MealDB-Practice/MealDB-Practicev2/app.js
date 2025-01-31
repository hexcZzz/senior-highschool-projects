// Function to render the meals for search by first letter
function renderMealResultsByLetter(responses) {
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

// Add event listeners to each anchor tag for first letter search
document.querySelectorAll('.input a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default anchor behavior
    const letter = this.textContent.toLowerCase(); // Get the clicked letter

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
      .then(response => response.json())
      .then(data => {
        if (data.meals) {
          renderMealResultsByLetter(data.meals);
        } else {
          document.getElementById('ingredients-container').innerHTML = '<p>No meals found</p>';
        }
      })
      .catch(() => {
        document.getElementById('ingredients-container').innerHTML = '<p>Error fetching meals</p>';
      });
  });
});