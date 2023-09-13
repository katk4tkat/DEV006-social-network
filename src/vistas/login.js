import { signInWithGoogle, SignInEmail } from '../config/firebase.js';

export function login(navigateTo) {
  const LoginSection = document.createElement('section');
  const logoGrande = document.createElement('img');
  const divLogin = document.createElement('div');
  const inputEmail = document.createElement('input');
  const inputPassword = document.createElement('input');
  const loginBtn = document.createElement('button');
  const divBtnGoogle = document.createElement('div');
  const loginGoogleButton = document.createElement('button');
  const logoRegisterGoogle = document.createElement('img');
  const textRegisterGoogle = document.createElement('p');
  const divRegister = document.createElement('div');
  const textRegister = document.createElement('p');
  const linkRegister = document.createElement('p');
  const imgFamiliaHome = document.createElement('img');

  logoGrande.className = 'logoGrande';
  inputEmail.className = 'inputUser';
  inputPassword.className = 'inputPass';
  loginBtn.className = 'btnLogin';
  divBtnGoogle.className = 'divBtnGoogleLogin';
  logoRegisterGoogle.className = 'logoGoogleLogin';
  textRegisterGoogle.className = 'textoGoogleLogin';
  loginGoogleButton.className = 'btnRegGoogleLogin';
  textRegister.className = 'textRegister';
  linkRegister.className = 'linkRegister';
  imgFamiliaHome.className = 'familyImg';
  divLogin.className = 'divLogin';

  logoGrande.src = '/img/logoLKP_final.png';
  inputEmail.placeholder = 'e-mail';
  inputPassword.placeholder = 'Password';
  inputPassword.type = 'password';
  loginBtn.textContent = 'Login';
  logoRegisterGoogle.src = './img/googleBLANCO.png';
  textRegisterGoogle.textContent = 'Continue with Google';
  textRegister.textContent = "Don't have an account?";
  linkRegister.textContent = 'Register';
  imgFamiliaHome.src = './img/comunidad.png';

  divRegister.addEventListener('click', () => {
    navigateTo('/register');
  });

  loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('funciona btn login');
    const promesaLoginEmailAndPassword = SignInEmail(inputEmail.value, inputPassword.value);
    promesaLoginEmailAndPassword.then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      console.log(user.email, user.displayName);
      console.log('inicio exitoso');
      navigateTo('/wall');
    })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  });

  loginGoogleButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('funciona');
    const promesaRegistroGoogle = signInWithGoogle();
    promesaRegistroGoogle.then((result) => {
      console.log(result, 'funciona result promesa');
      navigateTo('/wall');
    }).catch((error) => {
      console.log(error, 'catch de google');
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

  divRegister.append(textRegister, linkRegister);
  divBtnGoogle.append(logoRegisterGoogle, textRegisterGoogle);
  loginGoogleButton.append(divBtnGoogle);
  divLogin.append(inputEmail, inputPassword, loginBtn, loginGoogleButton, divRegister);
  LoginSection.append(logoGrande, divLogin);
  return LoginSection;
}