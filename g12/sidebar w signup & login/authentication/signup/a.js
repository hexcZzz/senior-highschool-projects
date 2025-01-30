// Select elements
const slidePage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const nextBtnSec = document.querySelector(".next-1");
const prevBtnThird = document.querySelector(".prev-2");
const nextBtnThird = document.querySelector(".next-2");
const prevBtnFourth = document.querySelector(".prev-3");
const submitBtn = document.querySelector(".submit");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullets = document.querySelectorAll(".step .bullet");
let current = 1; // Start at the first step

// Function to update the progress indicators
function updateProgress(step) {
    bullets[step - 1].classList.add("active");
    progressCheck[step - 1].classList.add("active");
    progressText[step - 1].classList.add("active");
}

// Function to reset the progress indicators
function resetProgress(step) {
    bullets[step - 1]?.classList.remove("active");
    progressCheck[step - 1]?.classList.remove("active");
    progressText[step - 1]?.classList.remove("active");
}

// Function to validate inputs and toggle error icons
function validateInputs() {
    const inputs = document.querySelectorAll(`.page:nth-child(${current}) .field input, .page:nth-child(${current}) .field select`);

    inputs.forEach(input => {
        const errorIcon = input.nextElementSibling;
        const value = input.value.trim();
        const type = input.type;

        if (value === "" || (type === "email" && !value.includes("@")) || (type === "number" && isNaN(value))) {
            if (errorIcon) errorIcon.style.display = "inline"; // Show error icon
        } else {
            if (errorIcon) errorIcon.style.display = "none"; // Hide error icon
        }
    });
}

// Function to handle next step navigation with validation
function goToNextStep() {
    validateInputs(); // Validate before proceeding

    // Check if there are any visible error icons
    const errorIcons = document.querySelectorAll(`.page:nth-child(${current}) .validation-icon`);
    const hasError = Array.from(errorIcons).some(icon => icon.style.display === "inline");

    if (hasError) {
        return; // Stop if there's any error
    }

    if (current < bullets.length) {
        slidePage.style.marginLeft = `-${current * 25}%`;
        updateProgress(current);
        current += 1;
    }
}

// Function to handle previous step navigation
function goToPreviousStep() {
    if (current > 1) {
        slidePage.style.marginLeft = `-${(current - 2) * 25}%`;
        resetProgress(current - 1);
        current -= 1;
        validateInputs(); // Validate when going back
    }
}

// Add event listeners to inputs for live validation
function addInputListeners() {
    document.querySelectorAll('.page .field input, .page .field select').forEach(input => {
        input.addEventListener('input', () => {
            validateInputs(); // Validate on input change
        });
    });
}

// Add event listeners for next buttons
nextBtnFirst.addEventListener("click", (event) => {
    event.preventDefault();
    goToNextStep();
});

nextBtnSec.addEventListener("click", (event) => {
    event.preventDefault();
    goToNextStep();
});

nextBtnThird.addEventListener("click", (event) => {
    event.preventDefault();
    goToNextStep();
});

// Add event listeners for previous buttons
prevBtnSec.addEventListener("click", (event) => {
    event.preventDefault();
    goToPreviousStep();
});

prevBtnThird.addEventListener("click", (event) => {
    event.preventDefault();
    goToPreviousStep();
});

prevBtnFourth.addEventListener("click", (event) => {
    event.preventDefault();
    goToPreviousStep();
});

// Add event listener for submit button
submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    validateInputs(); // Validate on submit

    // Check if there are any visible error icons
    const errorIcons = document.querySelectorAll(`.page:nth-child(${current}) .validation-icon`);
    const hasError = Array.from(errorIcons).some(icon => icon.style.display === "inline");

    if (hasError) {
        return; // Stop if there's any error
    }

    if (current <= bullets.length) {
        updateProgress(current);
        setTimeout(() => {
            window.location.href = "../login/login.html";
        }, 800);
    }
});

// Initialize input listeners
addInputListeners();