const heightInput = document.querySelector(".h");
const weightInput = document.querySelector(".w");
const popup = document.querySelector(".popup-background");
const result = document.querySelector(".bmi-result");

function handleInput(input) {
    // Limit the input length to 5 characters
    if (input.value.length > 5) {
        input.value = input.value.slice(0, 5);
    }

    // Prevent adding non-numeric characters
    if (isNaN(input.value)) {
        input.value = input.value.slice(0, -1);
    }
}

heightInput.addEventListener('input', function() {
    handleInput(this);
});

weightInput.addEventListener('input', function() {
    handleInput(this);
});

function calculate() {
    openPopup();

    if (!heightInput.value || !weightInput.value) {
        result.textContent = "Please provide your height and weight for viewing your results.";
        return;
    }
    
    //bmi function mwehwhhw pu
    let bmi = weightInput.value / ((heightInput.value / 100) * (heightInput.value / 100));
    let bmiRange;
    let color;

    if (bmi < 18.5) {
        bmiRange = "underweight";
        color = "grey";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        bmiRange = "normal";
        color = "grey";
    } else if (bmi >= 25 && bmi <= 29.9) {
        bmiRange = "overweight";
        color = "grey";
    } else if (bmi >= 30 && bmi < 34.9) {
        bmiRange = "obese";
        color = "grey";
    } else {
        bmiRange = "extremely obese";
        color = "grey";
    }

//inputing the output on the html
    result.innerHTML = `Your body mass index <span style="color:lime;"> ${bmi.toFixed(1)}</span> falls within the range considered <span style="color:lime;">${bmiRange}</span>`;
}

//show and hide
function openPopup() {
    popup.style.display = "flex";
    setTimeout(() => {
        popup.style.opacity = "1";
    }, 0);
}

function closePopup() {
    popup.style.opacity = "0";
    setTimeout(() => {
        popup.style.display = "none";
    }, 200);
}
