function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function celsiusToFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function updateResult() {
    let inputValue = document.getElementById("inpP").value;
    const input = document.getElementById("inpP");
    const dropdownValue = document.getElementById("dropdown").value;
    const resultSpan = document.getElementById("result");
    
    // Limit the input length to 10 characters
    if (inputValue.length > 10) {
        inputValue = inputValue.slice(0, 10);
        input.value = inputValue;
    }

    // Prevent adding numbers
    if (isNaN(inputValue)) {
        input.value = inputValue.slice(0, -1);
    }

    if (dropdownValue === "choice1") {
        const result = fahrenheitToCelsius(parseFloat(inputValue));
        resultSpan.textContent = result.toFixed(2) + "°C";
    } else if (dropdownValue === "choice2") {
        const result = celsiusToFahrenheit(parseFloat(inputValue));
        resultSpan.textContent = result.toFixed(2) + "°F";
    }

    resultSpan.style.color = "white";
}
