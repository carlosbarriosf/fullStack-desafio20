//classes

class Usuario {
    constructor (id, name, mail, password) {
        this.id = id;
        this.name = name;
        this.mail = mail;
        this.password = password;
    }
}

class Formulario {
    // constructor (name, mail, password) {
    //     this.name = name;
    //     this.mail = mail;
    //     this.password = password;
    // }

    createFormElement() {
        const formElement = document.createElement('form');
        formElement.classList.add('signUp__form')


        const userNameInput = document.createElement('input');
        userNameInput.type = 'text';
        userNameInput.placeholder = 'Nombre'
        const userNameError = document.createElement('p');
        userNameError.innerText = 'El campo debe contener al menos 3 caracteres.';
        userNameError.classList.add('errorMessage')


        const userMailInput = document.createElement('input');
        userMailInput.type = 'text';
        userMailInput.placeholder = 'Correo Electrónico'
        const userMailError = document.createElement('p');
        userMailError.innerText = 'El formato ingresado no es correcto';
        userMailError.classList.add('errorMessage')

        const userPasswordInput = document.createElement('input');
        userPasswordInput.type = 'password';
        userPasswordInput.placeholder = 'Contraseña'
        const userPasswordError = document.createElement('p');
        userPasswordError.innerText = 'El campo debe contener al menos 8 caracteres, una minúscula, una mayúscula y un número.';
        userPasswordError.classList.add('errorMessage')

        const signUpButton = document.createElement('button');
        signUpButton.type = 'button';
        signUpButton.innerText = 'Registrarse';
        signUpButton.classList.add('signUp__btn')
        signUpButton.addEventListener('click', () => {
            handleSignUpButton(userNameInput, userMailInput, userPasswordInput);
            
        })

        formElement.appendChild(userNameInput);
        formElement.appendChild(userNameError);

        formElement.appendChild(userMailInput);
        formElement.appendChild(userMailError);

        formElement.appendChild(userPasswordInput);
        formElement.appendChild(userPasswordError);


        formElement.appendChild(signUpButton)

        const formContainer = document.querySelector('[data-signUp-container]');
        formContainer.appendChild(formElement)
    }

    validateName(nameInput) {
        return nameInput && nameInput.length >= 3;
    }

    validateMail(mailInput) {
        const regex = new RegExp(/^[a-z0-9]{1,20}@[a-z]{1,20}\.[a-z]{1,3}$/)
        return regex.test(mailInput);
    }

    validatePassword(passwordInput) {
        const regex = new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/);
        return regex.test(passwordInput)
    }

    signUpUser(userId, userName, userMail, userPassword) {
        const newUser = new Usuario(userId, userName, userMail, userPassword);
        console.log(newUser)
        //push the new user to an array of users
        saveUserToLocalStorage(newUser)
        localStorage.setItem('idCount', JSON.stringify(idCount))
        // console.log(localStorage.getItem(''))
    }
}

class TablaUsuarios {
    
    renderTable() {
        //create an html table for users in the list
        const users = JSON.parse(localStorage.getItem('users'));
        if(!users) return
        const listContainer = document.querySelector('[data-users-list]');
        listContainer.style.display = 'flex';

        const table = document.createElement('table');
        table.classList.add('userList__table')

        const tableHeader = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const headerId = document.createElement('th');
        headerId.innerText = 'ID';
        
        const headerName = document.createElement('th');
        headerName.innerText = 'Nombre';

        const headerMail = document.createElement('th');
        headerMail.innerText = 'Correo Electrónico';

        const headerPassword = document.createElement('th');
        headerPassword.innerText = 'Contraseña';


        headerRow.appendChild(headerId);
        headerRow.appendChild(headerName);
        headerRow.appendChild(headerMail);
        headerRow.appendChild(headerPassword);

        tableHeader.appendChild(headerRow);

        table.appendChild(tableHeader);

        users.forEach(user => {
            const tableRow = document.createElement('tr');
            
            const id = document.createElement('td');
            id.innerText = user.id;

            const name = document.createElement('td');
            name.innerText = user.name;

            const mail = document.createElement('td');
            mail.innerText = user.mail;

            const password = document.createElement('td');
            password.innerText = user.password;

            tableRow.appendChild(id);
            tableRow.appendChild(name);
            tableRow.appendChild(mail);
            tableRow.appendChild(password);

            table.appendChild(tableRow);
        })

        listContainer.appendChild(table)
    }

}

//create an instance of Formulario to add it to the DOM

const formElement = new Formulario;
formElement.createFormElement();


//user id counter

let idCount = Number(localStorage.getItem('idCount')) || 0;

//event handler

function handleSignUpButton (nameInput, mailInput, passwordInput) {
    const isNameValid = formElement.validateName(nameInput.value);
    const isMailValid = formElement.validateMail(mailInput.value);
    const isPasswordValid = formElement.validatePassword(passwordInput.value)

    console.log(nameInput.nextElementSibling)
    nameInput.nextElementSibling.classList.toggle('showError', !isNameValid)
    mailInput.nextElementSibling.classList.toggle('showError', !isMailValid)
    passwordInput.nextElementSibling.classList.toggle('showError', !isPasswordValid)

    if(isNameValid && isMailValid && isPasswordValid) {
        idCount++
        formElement.signUpUser(idCount, nameInput.value, mailInput.value, passwordInput.value)
        nameInput.value = '';
        mailInput.value = '';
        passwordInput.value = '';
        location.reload();
    }
}

//function to save User to local storage

function saveUserToLocalStorage (user) {
    const usersArray = localStorage.getItem('users');
    if(usersArray) {
        const parsedArray = JSON.parse(usersArray)
        parsedArray.push(user);
        localStorage.setItem('users', JSON.stringify(parsedArray));
    } else {
        localStorage.setItem('users', JSON.stringify([ user ]))
    }
    console.log(localStorage.getItem('users'))
}

//instance of usersTable

const usersTable = new TablaUsuarios();
usersTable.renderTable();