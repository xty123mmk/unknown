const firstNameInput = document.getElementById('signupInputFirstName');
const lastNameInput = document.getElementById('signupInputLastName');
const emailInput = document.getElementById('signupInputEmail');
const passwordInput = document.getElementById('signupPasswordInput');
const submitButton = document.getElementById('signBtn');

const signupUser = (e) => {
	e.preventDefault()
	const firstName = firstNameInput.value;
	const lastName = lastNameInput.value;
	const email = emailInput.value;
	const password = passwordInput.value;

	const signupUserData = {
		firstName.
		lastName,
		email,
		password
	};

	const fetchData = {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify(signupUserDatai)
	}

	fetch('https://sworte.herokuapp.com/api/v1/users/signup', fetchData).then((res) => res.json()).then((data) => {
		if(data.message === 'Hello ${newUser.firstName}, We have successfully created an account for you') {
			const token = data.token;
			localStorage.setItem('token', JSON.stringify(token))
			window.location.href = 'account/personality.html'
		}
	})
}

submitButton.addEventListener('click', signupUser);