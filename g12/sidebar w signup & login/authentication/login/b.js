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
    input.addEventListener("focus", () => {
        const errorIcon = input.nextElementSibling;
        errorIcon.style.display = "none";  // Ensure the error icon is hidden when the field is focused
    });

    input.addEventListener("blur", () => {
        validateInput(input); // Validate input on blur
    });

    input.addEventListener("input", () => validateInput(input)); // Validate input when typing
});

// Handle form submission
submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    inputs.forEach(input => validateInput(input));
});