function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.tabIndex = 1;
    modal.style.display = "block";
    modal.focus();

    const closeButton = document.querySelector("img.close");
    closeButton.addEventListener("click", closeModal);

    document.addEventListener("keyup", (event) => {
        if (event.key === "Escape" || event.key === " " && event.target === closeButton) {
            closeModal();
        }
    });
}

window.displayModal = displayModal


function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    modal.blur();
    form.reset();

    validationTexts.forEach(error => {
        error.style.display = "none";
    })
}


/////////////////////// form ///////////////////////////////////////
const inputColor = document.querySelectorAll("input");
const textareaColor = document.querySelector("textarea");
const validationTexts = document.querySelectorAll(".error-msg");
const inputs = document.querySelectorAll('input[type="text"], input[type="email"]'
);

let inputsValidity = {
    firstname: false,
    email: false,
    message: false
}

const form = document.querySelector("form");
const modalContainer = document.querySelector(".modal");

form.addEventListener("submit", handleForm)

let isAnimating = false;

function handleForm(e) {
    e.preventDefault()

    let keys = Object.keys(inputsValidity)
    let failedInputs = keys.filter(key => !inputsValidity[key])

    if (failedInputs.length && !isAnimating) {
        isAnimating = true;
        modalContainer.classList.add("shake");

        setTimeout(() => {
            modalContainer.classList.remove("shake")
            isAnimating = false;
        }, 100)

        failedInputs.forEach(input => {
            const index = keys.indexOf(input)
            showValidation({index: index, validation: false})
        })
    }

    if (firstname && email && message) {
        const data = {
            firstname,
            email,
            message,
        };

        console.log(data);
        inputs.forEach((input) => (input.value = ""));

        firstname = null;
        email = null;
        message = null;

        inputsValidity = {
            firstname: false,
            email: false,
            message: false
        }

        alert("Inscription validée !");
        form.reset();
        closeModal()

    } else {
        return false
    }
}

function showValidation({index, validation}) {
    if (validation) {
        if (validationTexts[index]) {
            validationTexts[index].style.display = "none";
        }
    } else {
        if (validationTexts[index]) {
            validationTexts[index].style.display = "block";
        }
    }
}

let firstname;
let email;
let message;

const firstnameInput = document.querySelector(".input-group:nth-child(1) input")
firstnameInput.addEventListener("blur", userValidation)
firstnameInput.addEventListener("input", userValidation)

function userValidation() {
    if (firstnameInput.value.length >= 3) {
        inputColor[0].style.color = "black";
        showValidation({index: 0, validation: true})
        inputsValidity.firstname = true;

        firstname = firstnameInput.value
    } else {
        inputColor[0].style.color = "red";
        showValidation({index: 0, validation: false})
        inputsValidity.firstname = false;
    }
}

const mailInput = document.querySelector(".input-group:nth-child(2) input")
mailInput.addEventListener("blur", mailValidation)
mailInput.addEventListener("input", mailValidation)

const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

function mailValidation() {
    if (regexEmail.test(mailInput.value)) {
        inputColor[1].style.color = "black";
        showValidation({index: 1, validation: true})
        inputsValidity.email = true;

        email = mailInput.value
    } else {

        inputColor[1].style.color = "red";
        showValidation({index: 1, validation: false})
        inputsValidity.email = false;
    }
}

const messageInput = document.querySelector(".input-group:nth-child(3) textarea")
messageInput.addEventListener("blur", messageValidation)
messageInput.addEventListener("input", messageValidation)

function messageValidation() {
    if (messageInput.value.length >= 20) {
        textareaColor.style.color = "black";
        showValidation({index: 2, validation: true})
        inputsValidity.message = true;

        message = messageInput.value
    } else {
        textareaColor.style.color = "red";
        showValidation({index: 2, validation: false})
        inputsValidity.message = false;
    }
}