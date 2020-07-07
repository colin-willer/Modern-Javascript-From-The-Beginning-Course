// Form Blur Event Listeners
document.getElementById('name').addEventListener('blur', validateName);
document.getElementById('zip').addEventListener('blur', validateZip);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('phone').addEventListener('blur', validatePhone);

function validateName() {
	const name = document.getElementById('name');
	const re = /^[a-zA-Z]{2,10}$/; // Name must be between 2 and 10 characters

	if (!re.test(name.value)) {
		name.classList.add('is-invalid');
	} else {
		name.classList.remove('is-invalid');
	}
}

function validateZip() {
	const zip = document.getElementById('zip');
	const re = /^[0-9]{5}(-[0-9]{4})?$/; // zipcode must have 5 digits with an optional - and 4 more digits

	if (!re.test(zip.value)) {
		zip.classList.add('is-invalid');
	} else {
		zip.classList.remove('is-invalid');
	}
}

function validateEmail() {
	const email = document.getElementById('email');
	const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/; // Any letter, number, -, or .,   @   Any letter, number, -, or .,   .   something that is between 2-5 characters

	if (!re.test(email.value)) {
		email.classList.add('is-invalid');
	} else {
		email.classList.remove('is-invalid');
	}
}

function validatePhone() {
	const phone = document.getElementById('phone');
	const re = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/; // accepts phone numbers in different types such as (555) 555 5555 or 555-555-5555 or 555.555.5555 or just 5555555555

	if (!re.test(phone.value)) {
		phone.classList.add('is-invalid');
	} else {
		phone.classList.remove('is-invalid');
	}
}
