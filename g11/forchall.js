// function
function printForecast(arr) {
    // loop
    for (let i = 0; i < arr.length; i++) {
        // for each temp
        // store current index
        const temperature = arr[i];
        
        // calculate days +1
        const days = i + 1;
        
        // construct
        const forecastString = `${temperature}°C in ${days} days`;
        
        // Log 
        console.log(forecastString);
    }
}

// Test Data 1
console.log("Test Data 1:");

printForecast([17, 21, 23]);

// Test Data 2
console.log("\nTest Data 2:");

printForecast([12, 5, -5, 0, 4]);