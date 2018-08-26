const firstName = document.querySelector('#first_name');
const lastName = document.querySelector('#last_name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const signupBtn = document.querySelector('#signBtn');


const signup = ()=>{
console.log(firstName.value);


}

signupBtn.addEventListenner('submit', signup);