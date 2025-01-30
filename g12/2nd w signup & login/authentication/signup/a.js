// Select elements
const slidePage = document.querySelector(".slide-page");
const nextBtns = document.querySelectorAll(".next");
const prevBtns = document.querySelectorAll(".prev");
const submitBtn = document.querySelector(".submit");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullets = document.querySelectorAll(".step .bullet");
const fields = document.querySelectorAll(".page .field input, .page .field select");

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

// Function to handle next step navigation with validation
function goToNextStep() {
  const inputs = document.querySelectorAll(`.page:nth-child(${current}) .field input, .page:nth-child(${current}) .field select`);

  for (let input of inputs) {
    if (input.type === "text" || input.type === "number") {
      if (input.value.trim() === "") {
        alert("Please fill in all fields.");
        return;
      }
    }
    if (input.type === "email" && !input.value.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    if (input.type === "number" && isNaN(input.value)) {
      alert("Please enter a valid phone number.");
      return;
    }
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
  }
}

// Add event listeners for next buttons
nextBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    goToNextStep();
  });
});

// Add event listeners for previous buttons
prevBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    goToPreviousStep();
  });
});

// Add event listener for submit button
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const inputs = document.querySelectorAll(`.page:nth-child(${current}) .field input, .page:nth-child(${current}) .field select`);

  for (let input of inputs) {
    if (input.type === "text" || input.type === "number") {
      if (input.value.trim() === "") {
        alert("Please fill in all fields.");
        return;
      }
    }
    if (input.type === "email" && !input.value.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    if (input.type === "number" && isNaN(input.value)) {
      alert("Please enter a valid phone number.");
      return;
    }
  }

  if (current <= bullets.length) {
    updateProgress(current);
    setTimeout(() => {
      alert("Your Form Successfully Signed up");
      location.reload(); // Optionally redirect or clear form
    }, 800);
  }
});
