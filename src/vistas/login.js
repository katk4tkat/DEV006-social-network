export function login(navigateTo) {
  const LoginSection = document.createElement('section');
  const logoGrande = document.createElement('img');
  const divLogin = document.createElement('div');
  const inputUser = document.createElement('input');
  const inputPassword = document.createElement('input');
  const loginBtn = document.createElement('button');
  const divBtnGoogle = document.createElement('div');
  const registerGoogleBotton = document.createElement('button');
  const logoRegisterGoogle = document.createElement('img');
  const textRegisterGoogle = document.createElement('p');
  const divRegister = document.createElement('div');
  const textRegister = document.createElement('p');
  const linkRegister = document.createElement('p');
  const imgFamiliaHome = document.createElement('img');

  logoGrande.className = 'logoGrande';
  inputUser.className = 'inputUser';
  inputPassword.className = 'inputPass';
  loginBtn.className = 'btnLogin';
  divBtnGoogle.className = 'divBtnGoogle';
  logoRegisterGoogle.className = 'logoGoogle';
  textRegisterGoogle.className = 'textoGoogle';
  registerGoogleBotton.className = 'btnRegGoogle';
  textRegister.className = 'textRegister';
  linkRegister.className = 'linkRegister';
  imgFamiliaHome.className = 'familyImg';
  divLogin.className = 'divLogin';

  logoGrande.src = './img/logoLKP_final.png';
  inputUser.placeholder = 'User';
  inputPassword.placeholder = 'Password';
  loginBtn.textContent = 'Login';
  logoRegisterGoogle.src = './img/googleBLANCO.png';
  textRegisterGoogle.textContent = 'Continue with Google';
  textRegister.textContent = "Don't have an account?";
  linkRegister.textContent = 'Register';
  imgFamiliaHome.src = './img/comunidad.png';
  

  divRegister.addEventListener('click', () => {
    navigateTo('/register');
  });

  divRegister.append(textRegister, linkRegister);
  divLogin.append(inputUser, inputPassword, loginBtn, divRegister);
  divBtnGoogle.append(logoRegisterGoogle, textRegisterGoogle);
  registerGoogleBotton.append(divBtnGoogle);
  LoginSection.append(logoGrande, divLogin, imgFamiliaHome);
  return LoginSection;
}