
    // JavaScript to handle card flipping
    const flipCardInner = document.querySelector('.flip-card-inner');
    const flipToSignUp = document.getElementById('flip-to-signup');
    const flipToLogin = document.getElementById('flip-to-login');

    flipToSignUp.addEventListener('click', function (e) {
        e.preventDefault();
    flipCardInner.classList.add('flipped');
    });

    flipToLogin.addEventListener('click', function (e) {
        e.preventDefault();
    flipCardInner.classList.remove('flipped');
    });
    //Toast
    function showToast(message, title = 'Notification', isError = false) {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toast-title');
    const toastIcon = document.getElementById('toast-icon');
    const toastBody = document.getElementById('toast-body');

    // Set the message and title
    // toastBody.textContent = message;
    // toastTitle.textContent = title;

    // Change background color based on success/error
    if (isError) {
        // toast.classList.add('bg-danger', 'text-white');  // Error styling
        // toast.classList.remove('bg-success');
        // toastIcon.innerHTML = `<i class="fa-solid fa-triangle-exclamation fs-1"></i>`
        Swal.fire({
            position: "center-center",
            icon: "error",
            title: message,
            showConfirmButton: true,
            // timer: 2000,
            backdrop: true,    // Ensures the backdrop covers the full screen
            width: '400px',    // Control modal width
            heightAuto: false, // Disable automatic height changes
            allowOutsideClick: false // Prevent clicking outside to close
        });



    } else {
        // toast.classList.add('bg-success', 'text-white');  // Success styling
        // toast.classList.remove('bg-danger');
        // toastIcon.innerHTML = `<i class="fa-solid fa-circle-check fs-1"></i>`
        Swal.fire({
            position: "center-center",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 2000,
            backdrop: true,    // Ensures the backdrop covers the full screen
            width: '400px',    // Control modal width
            heightAuto: false, // Disable automatic height changes
            allowOutsideClick: false // Prevent clicking outside to close
        });

    }
    // toast.style.display = 'block';
    // const toastElement = new mdb.Toast(toast);
    // toastElement.show();
    //   setTimeout(() => {
        //   toast.style.display = 'none';
        // }, 3000);

    }
    document.getElementById("toggle-password").addEventListener("click", function () {
      const passwordInput = document.getElementById("password-login");
    const passwordType = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", passwordType);

    // Toggle the eye icon
    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");
    });
    // Validation regex patterns
    const emailInput = document.getElementById('email-login');
    const passwordInput = document.getElementById('password-login');

    function validateEmail() {
        const emailValue = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
    if (emailRegex.test(emailValue)) {
        emailInput.classList.remove('is-invalid');
    emailInput.classList.add('is-valid');
    document.getElementById('email-error-message').classList.add('d-none');
    document.getElementById('email-valid-icon').classList.remove('d-none');
    document.getElementById('email-invalid-icon').classList.add('d-none');
        } else {
        emailInput.classList.remove('is-valid');
    emailInput.classList.add('is-invalid');
    document.getElementById('email-error-message').classList.remove('d-none');
    document.getElementById('email-valid-icon').classList.add('d-none');
    document.getElementById('email-invalid-icon').classList.remove('d-none');
        }
    }

    function validatePassword() {
        const passwordValue = passwordInput.value;
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // Password: digits, 8+ chars
    if (passwordRegex.test(passwordValue)) {
        passwordInput.classList.remove('is-invalid');
    passwordInput.classList.add('is-valid');
    document.getElementById('password-error-message').classList.add('d-none');
    document.getElementById('password-valid-icon').classList.remove('d-none');
    document.getElementById('password-invalid-icon').classList.add('d-none');
        } else {
        passwordInput.classList.remove('is-valid');
    passwordInput.classList.add('is-invalid');
    document.getElementById('password-error-message').classList.remove('d-none');
    document.getElementById('password-valid-icon').classList.add('d-none');
    document.getElementById('password-invalid-icon').classList.remove('d-none');
        }
    }

    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
 //login form submission
    document.getElementById("login-form").addEventListener('submit',async(e)=>{
        e.preventDefault() //default submit
      const email=document.getElementById('email-login').value
    const password=document.getElementById('password-login').value
    try{
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin',{
        method:"POST",
    headers:{
        'Content-Type': 'application/json',
          },
    body:JSON.stringify({email, password})
        }
    )
    const data = await response.json();

    if (response.ok) {
        showToast('Login successful!', 'Success');
        // console.log(data)
    (function() {
        // after successful login
        localStorage.setItem("authToken", data.token);
          })()
        // Redirect to loading page after a short delay
          setTimeout(() => {
        window.location.href = "index.html";
          },1000); 
        } else {
        // Reset the form fields
        document.getElementById("login-form").reset();
    showToast(data.message || 'Login failed. Please try again.', 'Error', true);
        }
      }catch(error){
        console.error('Error:', error);
    showToast('An error occurred. Please try again.', 'Error', true);
      }
    })

document.getElementById("toggle-password-signup").addEventListener("click", function () {
  const passwordInputsup = document.getElementById("password-signup");
  const passwordType = passwordInputsup.getAttribute("type") === "password" ? "text" : "password";
  passwordInputsup.setAttribute("type", passwordType);

  // Toggle the eye icon
  this.classList.toggle("fa-eye");
  this.classList.toggle("fa-eye-slash");
});
document.getElementById("toggle-password-signup-confirm").addEventListener("click", function () {
  const confirmPasswordInput = document.getElementById("password-signup-confirm");
  const passwordType = confirmPasswordInput.getAttribute("type") === "password" ? "text" : "password";
  confirmPasswordInput.setAttribute("type", passwordType);

  // Toggle the eye icon
  this.classList.toggle("fa-eye");
  this.classList.toggle("fa-eye-slash");
});
// Select all the relevant input fields
const nameInput = document.getElementById('name-signup');
const emailInputsup = document.getElementById('email-signup');
const passwordInputsup = document.getElementById('password-signup');
const confirmPasswordInput = document.getElementById('password-signup-confirm');
const phoneInput = document.getElementById('phone-signup');

// Function to validate name
function validateSignupName() {
  const name = nameInput.value;
  if (name.length < 3) {
    document.getElementById('name-error-message').classList.remove('d-none');
    document.getElementById('name-invalid-icon').classList.remove('d-none');
    document.getElementById('name-valid-icon').classList.add('d-none');
  } else {
    document.getElementById('name-error-message').classList.add('d-none');
    document.getElementById('name-invalid-icon').classList.add('d-none');
    document.getElementById('name-valid-icon').classList.remove('d-none');
  }
}

// Function to validate email
function validateSignupEmail() {
  const email = emailInputsup.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById('email-error-message-signup').classList.remove('d-none');
    document.getElementById('email-invalid-icon-signup').classList.remove('d-none');
    document.getElementById('email-valid-icon-signup').classList.add('d-none');
  } else {
    document.getElementById('email-error-message-signup').classList.add('d-none');
    document.getElementById('email-invalid-icon-signup').classList.add('d-none');
    document.getElementById('email-valid-icon-signup').classList.remove('d-none');
  }
}

// Function to validate password
function validateSignupPassword() {
  const password = passwordInputsup.value;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    document.getElementById('password-error-message-signup').classList.remove('d-none');
    document.getElementById('password-invalid-icon-signup').classList.remove('d-none');
    document.getElementById('password-valid-icon-signup').classList.add('d-none');
  } else {
    document.getElementById('password-error-message-signup').classList.add('d-none');
    document.getElementById('password-invalid-icon-signup').classList.add('d-none');
    document.getElementById('password-valid-icon-signup').classList.remove('d-none');
  }
}

// Function to validate confirm password
function validateSignupConfirmPassword() {
  const password = passwordInputsup.value;
  const confirmPassword = confirmPasswordInput.value;
  if (password !== confirmPassword) {
    document.getElementById('confirm-password-error-message').classList.remove('d-none');
    document.getElementById('confirm-password-invalid-icon').classList.remove('d-none');
    document.getElementById('confirm-password-valid-icon').classList.add('d-none');
  } else {
    document.getElementById('confirm-password-error-message').classList.add('d-none');
    document.getElementById('confirm-password-invalid-icon').classList.add('d-none');
    document.getElementById('confirm-password-valid-icon').classList.remove('d-none');
  }
}

// Function to validate phone
function validateSignupPhone() {
  const phone = phoneInput.value;
  const phoneRegex = /^01[0125][0-9]{8}$/;
  if (!phoneRegex.test(phone)) {
    document.getElementById('phone-error-message').classList.remove('d-none');
    document.getElementById('phone-invalid-icon').classList.remove('d-none');
    document.getElementById('phone-valid-icon').classList.add('d-none');
  } else {
    document.getElementById('phone-error-message').classList.add('d-none');
    document.getElementById('phone-invalid-icon').classList.add('d-none');
    document.getElementById('phone-valid-icon').classList.remove('d-none');
  }
}

// Attach input event listeners to each field for real-time validation
nameInput.addEventListener('input', validateSignupName);
emailInputsup.addEventListener('input', validateSignupEmail);
passwordInputsup.addEventListener('input', validateSignupPassword);
confirmPasswordInput.addEventListener('input', validateSignupConfirmPassword);
phoneInput.addEventListener('input', validateSignupPhone);

// Handle form submission
document.getElementById("signup-form").addEventListener('submit', function (e) {
  e.preventDefault();

  // Final validation check before submission (optional)
  validateSignupName();
  validateSignupEmail();
  validateSignupPassword();
  validateSignupConfirmPassword();
  validateSignupPhone();

  // Check if all validations passed
  if (
    nameInput.value.length >= 3 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInputsup.value) &&
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(passwordInputsup.value) &&
    passwordInputsup.value === confirmPasswordInput.value &&
    /^01[0125][0-9]{8}$/.test(phoneInput.value)
  ) {
    console.log("Form submitted successfully!");
    // You can also proceed with form submission or additional logic here
  }
});






    //signup submission
    document.getElementById("signup-form").addEventListener('submit',async(e)=>{
        e.preventDefault()
      const name=document.getElementById('name-signup').value
    const email=document.getElementById('email-signup').value
    const password=document.getElementById('password-signup').value
    const passwordConfirm=document.getElementById('password-signup-confirm').value
    const phone = document.getElementById('phone-signup').value
    if (password !== passwordConfirm) {
        showToast('Passwords do not match. Please try again.', 'Error', true);
    return;
      }
    const signupData = {
        name: name,
    email: email,
    password: password,
    rePassword: passwordConfirm,
    phone: phone
      };
    try{
        const response =await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup",{
        method:"POST",
    headers :{
        'Content-Type':'application/json'
          },
    body:JSON.stringify(signupData)
        })
    const data =await response.json()
    if (response.ok) {
        showToast('Signup successful! Please log in.', 'Success');
    // Reset the form fields
    document.getElementById("signup-form").reset();
          setTimeout(()=>{
        flipCardInner.classList.remove('flipped');
          },1000) // Go back to login
        } else {
        // Reset the form fields
        document.getElementById("signup-form").reset();
    showToast(data.message || 'Signup failed. Please try again.', 'Error', true);
        }
      }catch(error){
        console.error('Error:', error);
    showToast('An error occurred. Please try again.', 'Error', true);
      }
    })
