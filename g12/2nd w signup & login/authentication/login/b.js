// Select elements for validation
const submitBtn = document.querySelector(".submit");
const inputs = document.querySelectorAll(".page input");

// Function to show or hide error icons based on input validity
function validateInput(input) {
    const errorIcon = input.nextElementSibling;

    if (input.value.trim() === "") {
        input.classList.add("error-visible");
        errorIcon.style.display = "inline";  // Show the error icon
    } else {
        input.classList.remove("error-visible");
        errorIcon.style.display = "none";  // Hide the error icon
    }
}

// Add event listeners for validation on all inputs
inputs.forEach(input => {
    input.addEventListener("blur", () => validateInput(input));
    input.addEventListener("input", () => validateInput(input));
});

// Handle form navigation
document.querySelectorAll(".next").forEach(btn => {
    btn.addEventListener("click", (event) => {
        const currentPage = event.target.closest(".page");
        const nextPage = currentPage.nextElementSibling;
        if (nextPage) {
            currentPage.style.display = "none";
            nextPage.style.display = "block";
        }
    });
});

document.querySelectorAll(".prev").forEach(btn => {
    btn.addEventListener("click", (event) => {
        const currentPage = event.target.closest(".page");
        const prevPage = currentPage.previousElementSibling;
        if (prevPage) {
            currentPage.style.display = "none";
            prevPage.style.display = "block";
        }
    });
});

// Handle form submission
submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    inputs.forEach(input => validateInput(input));
});