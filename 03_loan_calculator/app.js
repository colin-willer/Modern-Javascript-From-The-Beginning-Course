// Listen for Submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
	// Hide Results
	document.getElementById('results').style.display = 'none';
	// Show Loading Wheel
	document.getElementById('loading').style.display = 'block';
	// Run Calculate Results Function After 1 Seconds
	setTimeout(calculateResults, 1000);

	e.preventDefault();
});

// Calculate Results
function calculateResults(e) {
	// UI variables
	const amount = document.getElementById('amount');
	const interest = document.getElementById('interest');
	const years = document.getElementById('years');
	const monthlyPayment = document.getElementById('monthly-payment');
	const totalPayment = document.getElementById('total-payment');
	const totalInterest = document.getElementById('total-interest');

	const principal = parseFloat(amount.value);
	const caluculatedInterest = parseFloat(interest.value) / 100 / 12;
	const calculatedPayments = parseFloat(years.value) * 12;

	// Compute Montly payment
	const x = Math.pow(1 + caluculatedInterest, calculatedPayments);
	const montly = principal * x * caluculatedInterest / (x - 1);

	if (isFinite(montly)) {
		monthlyPayment.value = montly.toFixed(2);
		totalPayment.value = (montly * calculatedPayments).toFixed(2);
		totalInterest.value = (montly * calculatedPayments - principal).toFixed(2);
		// Show Results
		document.getElementById('results').style.display = 'block';
		// Hide Loading Wheel
		document.getElementById('loading').style.display = 'none';
	} else {
		showError('Please double check the numbers you provided');
	}
}

// Show Error Message on UI
function showError(error) {
	// Hide Results
	document.getElementById('results').style.display = 'none';
	// Hide Loading Wheel
	document.getElementById('loading').style.display = 'none';

	// Create Div
	const errorDiv = document.createElement('div');
	// Add Bootstrap Classes
	errorDiv.className = 'alert alert-danger';
	// Create Text Node and Append to Div
	errorDiv.appendChild(document.createTextNode(error));
	// Get Elements
	const card = document.querySelector('.card');
	const heading = document.querySelector('.heading');
	// Insert Error Above Heading
	card.insertBefore(errorDiv, heading);

	// Clear Error After 3 Seconds or 3000ms
	setTimeout(clearError, 3000);
}

// Clear Error Function
function clearError() {
	document.querySelector('.alert').remove();
}
