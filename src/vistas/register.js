import { registerEmail, signInWithGoogle } from '../config/firebase.js';

export function register(navigateTo) {
  const registerSection = document.createElement('section');
  const logoPeque = document.createElement('img');
  const divRegister = document.createElement('div');
  const signUpForm = document.createElement('form');
  const inputMail = document.createElement('input');
  const errorText = document.createElement('p');
  const inputPasswordRegister = document.createElement('input');
  const registerBtn = document.createElement('button');
  const divBtnGoogle = document.createElement('div');
  const registerGoogleBotton = document.createElement('button');
  const logoRegisterGoogle = document.createElement('img');
  const textRegisterGoogle = document.createElement('p');
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
  divBtnGoogle.className = 'divBtnGoogle';
  logoRegisterGoogle.className = 'logoGoogle';
  textRegisterGoogle.className = 'textoGoogle';
  registerGoogleBotton.className = 'btnRegGoogle';
  returnDiv.className = 'returnDiv';
  returnImg.className = 'returnImg';
  returnLink.className = 'returnLink';
  imgFamiliaHome.className = 'familyImg';

  logoPeque.src = './img/logoLKP_final.png';
  inputMail.placeholder = 'E-mail';
  inputPasswordRegister.placeholder = 'Password';
  registerBtn.textContent = 'Register';
  registerBtn.type = 'submit';
  logoRegisterGoogle.src = './img/googleBLANCO.png';
  textRegisterGoogle.textContent = 'Continue with Google';
  returnImg.src = './img/left-arrowOrange.png';
  returnLink.textContent = 'Return';
  imgFamiliaHome.src = './img/comunidad.png';

  returnDiv.addEventListener('click', () => {
    navigateTo('/');
  });

  registerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('funciona');
    const promesaRegistro = registerEmail(inputMail.value, inputPasswordRegister.value);
    promesaRegistro.then((userCredential) => {
      // Signed in
      console.log(userCredential);
      const user = userCredential.user;
      console.log('registroExitoso');
      console.log(user);
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

  registerGoogleBotton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('funciona');
    const promesaRegistroGoogle = signInWithGoogle();
    promesaRegistroGoogle.then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      console.log(token, user, credential);
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log(errorCode, errorMessage, email, credential);
    });
  });

  divRegister.appendChild(errorText);
  signUpForm.append(inputMail, inputPasswordRegister, registerBtn, registerGoogleBotton);
  divBtnGoogle.append(logoRegisterGoogle, textRegisterGoogle);
  registerGoogleBotton.append(divBtnGoogle);
  returnDiv.append(returnImg, returnLink);
  divRegister.append(signUpForm, returnDiv);
  registerSection.append(logoPeque, divRegister, imgFamiliaHome);
  return registerSection;
}
