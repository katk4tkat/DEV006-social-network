import { registerEmail } from '../config/firebase.js'
export function register(navigateTo) {
  const registerSection = document.createElement('section');
  const logoPeque = document.createElement('img');
  const divRegister = document.createElement('div');
  const signUpForm = document.createElement('form');
  const inputMail = document.createElement('input');
  const errorText = document.createElement('p');
  const inputPasswordRegister = document.createElement('input');
  const registerBtn = document.createElement('button');
  const registerGoogle = document.createElement('button');
  const returnDiv = document.createElement('div');
  const returnImg = document.createElement('img');
  const returnLink = document.createElement('p');
  const imgFamiliaHome = document.createElement('img');

  logoPeque.className = 'logoPeque';
  divRegister.className = 'divRegister';
  inputMail.className = 'inputMail';
  errorText.className = 'errorText';
  inputPasswordRegister.className = 'inputPassRegister';
  inputPasswordRegister.type = 'password';
  registerBtn.className = 'btnRegister';
  registerGoogle.className = 'btnRegGoogle';
  returnDiv.className = 'returnDiv';
  returnImg.className = 'returnImg';
  returnLink.className = 'returnLink';
  imgFamiliaHome.className = 'familyImg';

  logoPeque.src = './img/logoLKP_final.png';
  inputMail.placeholder = 'E-mail';
  inputPasswordRegister.placeholder = 'Password';
  registerBtn.textContent = 'Register';
  registerBtn.type = 'submit';
  registerGoogle.textContent = 'Google';
  returnImg.src = './img/left-arrowOrange.png';
  returnLink.textContent = 'Return';
  imgFamiliaHome.src = './img/comunidad.png';

  returnDiv.addEventListener('click', () => {
    navigateTo('/');
  });

  registerBtn.addEventListener('click', (e) => {
    e.preventDefault()
    console.log("funciona")
    const promesaRegistro = registerEmail(inputMail.value, inputPasswordRegister.value)
    promesaRegistro.then((userCredential) => {
      // Signed in
      console.log(userCredential)
      const user = userCredential.user;
      console.log('registroExitoso');
      // ...
    })
      .catch((error) => {
        let errorMessage = '';

        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'Invalid e-mail adress';
            break;
          case 'auth/weak-password':
            errorMessage = 'Weak password. Must be at least 6 characters.';
            break;
          case 'auth/email-already-in-use':
            errorMessage = 'E-mail already in use';
            break;
          // Otros códigos de error que desees manejar
          // case 'auth/another-error-code':
          //   errorMessage = 'Mensaje de error personalizado.';
          //   break;
          default:
            errorMessage = "Couldn't register your account. Please verify e-mail and password.";
            break;
        }

        errorText.textContent = errorMessage;
      });
  });

  divRegister.appendChild(errorText);
  signUpForm.append(inputMail, inputPasswordRegister, registerBtn, registerGoogle);
  returnDiv.append(returnImg, returnLink);
  divRegister.append(signUpForm, returnDiv);
  registerSection.append(logoPeque, divRegister, imgFamiliaHome);
  return registerSection;
};