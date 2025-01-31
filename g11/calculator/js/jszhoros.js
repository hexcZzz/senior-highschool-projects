fetch('../js/descAndimg.json')
    .then(response => response.json())
    .then(zodiacData => {
        // Add event listener
        document.getElementById('date').addEventListener('change', function() {
            calculateZodiac(zodiacData);
        });
    });

function calculateZodiac(zodiacData) {
    const date = new Date(document.getElementById('date').value);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const resultSpan = document.getElementById('result');
    const zodiacSign = zodiacFinder(month, day);
    resultSpan.textContent = zodiacSign;
resultSpan.style.backgroundImage = 'linear-gradient(to bottom right, #2080AA, #8020AA)';
resultSpan.style.fontWeight = 'normal';
resultSpan.style.fontFamily = 'Almendra, serif';
resultSpan.style.webkitBackgroundClip = 'text';
resultSpan.style.webkitTextFillColor = 'transparent';

    // Display image and description
    displayZodiacInfo(zodiacSign, zodiacData);
}

//computation for zodiacs
const zodiacFinder = function(month, day) {
    if ((month === "March" && day >= 21) || (month === "April" && day <= 19)) {
        return `Aries`;
    } else if ((month === "April" && day >= 20) || (month === "May" && day <= 20)) {
        return `Taurus`;
    } else if ((month === "May" && day >= 21) || (month === "June" && day <= 21)) {
        return `Gemini`;
    } else if ((month === "June" && day >= 22) || (month === "July" && day <= 22)) {
        return `Cancer`;
    } else if ((month === "July" && day >= 23) || (month === "August" && day <= 22)) {
        return `Leo`;
    } else if ((month === "August" && day >= 23) || (month === "September" && day <= 22)) {
        return `Virgo`;
    } else if ((month === "September" && day >= 23) || (month === "October" && day <= 23)) {
        return `Libra`;
    } else if ((month === "October" && day >= 24) || (month === "November" && day <= 21)) {
        return `Scorpio`;
    } else if ((month === "November" && day >= 22) || (month === "December" && day <= 21)) {
        return `Sagittarius`;
    } else if ((month === "December" && day >= 22) || (month === "January" && day <= 19)) {
        return `Capricorn`;
    } else if ((month === "January" && day >= 20) || (month === "February" && day <= 18)) {
        return `Aquarius`;
    } else if ((month === "February" && day >= 19) || (month === "March" && day <= 20)) {
        return `Pisces`;
    } else {
        return `Invalid Birthday`;
    }
}

function displayZodiacInfo(zodiacSign, zodiacData) {
    const zodiacImageDiv = document.getElementById('zodiacImage');
    const zodiacDescription = document.getElementById('zodiacDescription');
    
    // clear last output
    zodiacImageDiv.innerHTML = '';
    zodiacDescription.innerHTML = '';

    // add image output for html
    const signData = zodiacData[zodiacSign.toLowerCase()];
    if (signData) {
        zodiacImageDiv.innerHTML = `<img src="${signData.image}" alt="${zodiacSign}">`;
        zodiacDescription.innerHTML = signData.description; // outputing 
    } else {
        zodiacDescription.textContent = 'invalid zodiac';
    }
}
