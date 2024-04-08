// ivCalculator.js
function calculateTimeToExpiration() {
    const currentDate = new Date();
    const expirationDate = new Date(document.getElementById('expirationDate').value);

    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const oneYear = 365 * oneDay; // milliseconds in a year

    const differenceInTime = expirationDate - currentDate;
    const timeToExpiration = differenceInTime / oneYear;

    return timeToExpiration;
}


function calculateIV() {
    // Get values from form
    var optionType = document.getElementById('optionType').value;
    var optionPrice = parseFloat(document.getElementById('optionPrice').value);
    
    var strikePrice = parseFloat(document.getElementById('strikePrice').value);
    var underlyingPrice = parseFloat(document.getElementById('underlyingPrice').value);
    const timeToExpiration = calculateTimeToExpiration();
    var riskFreeRate = parseFloat(document.getElementById('riskFreeRate').value);

    // Initialize variables for Newton-Raphson method
    var sigma = 0.5; // Initial guess for IV
    var sigmaPrev = 0;
    var tolerance = 0.0001; // Tolerance for convergence
    var iteration = 0;
    var maxIterations = 100;

    // Newton-Raphson Iteration
    while (Math.abs(sigma - sigmaPrev) > tolerance && iteration < maxIterations) {
        sigmaPrev = sigma;
        var blackScholesPrice = (optionType === "call") 
            ? priceCallBlackScholes(underlyingPrice, strikePrice, riskFreeRate, timeToExpiration, sigma)
            : pricePutBlackScholes(underlyingPrice, strikePrice, riskFreeRate, timeToExpiration, sigma);
        sigma = sigma - (blackScholesPrice - optionPrice) / vega(underlyingPrice, strikePrice, riskFreeRate, timeToExpiration, sigma);
        iteration++;
    }

    // Output the result
    if(iteration < maxIterations) {
        document.getElementById('result').innerHTML = "Implied Volatility: " + sigma.toFixed(4);
    } else {
        document.getElementById('result').innerHTML = "Failed to converge";
    }
}

// Function to calculate the Black-Scholes Call Price
function priceCallBlackScholes(S, K, r, T, sigma) {
    var d1 = (Math.log(S / K) + (r + sigma * sigma / 2) * T) / (sigma * Math.sqrt(T));
    var d2 = d1 - sigma * Math.sqrt(T);

    return S * normCdf(d1) - K * Math.exp(-r * T) * normCdf(d2);
}

function pricePutBlackScholes(S, K, r, T, sigma) {
    var d1 = (Math.log(S / K) + (r + sigma * sigma / 2) * T) / (sigma * Math.sqrt(T));
    var d2 = d1 - sigma * Math.sqrt(T);

    return K * Math.exp(-r * T) * normCdf(-d2) - S * normCdf(-d1);
}

// Function to calculate Vega
function vega(S, K, r, T, sigma) {
    var d1 = (Math.log(S / K) + (r + sigma * sigma / 2) * T) / (sigma * Math.sqrt(T));

    return S * normPdf(d1) * Math.sqrt(T);
}

// Normal Cumulative Distribution Function
function normCdf(x) {
    return (1.0 + erf(x / Math.sqrt(2.0))) / 2.0;
}

// Normal Probability Density Function
function normPdf(x) {
    return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

// Error Function needed for N()
function erf(x) {
    // Abramowitz and Stegun formula for error function approximation
    var sign = (x >= 0) ? 1 : -1;
    x = Math.abs(x);

    var a1 =  0.254829592;
    var a2 = -0.284496736;
    var a3 =  1.421413741;
    var a4 = -1.453152027;
    var a5 =  1.061405429;
    var p  =  0.3275911;

    var t = 1.0 / (1.0 + p * x);
    var y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    
    return sign * y;
}

