 export function wall(navigateTo) {
  const wallSection = document.createElement('section');
  const divUp = document.createElement('div');
  const divMid = document.createElement('div');
  const divDown = document.createElement('div');
  const testText = document.createElement('p');
  const smallLogo = document.createElement('img')
  const btnHome = document.createElement('img');
  const btnPlus = document.createElement('img');
  const btnUser = document.createElement('img');

  divUp.className = 'divUp';
  divMid.className = 'divMid';
  divDown.className = 'divDown';
  btnHome.className = 'btnHome';
  btnPlus.className = 'btnPlus';
  btnUser.className = 'btnUser';
  smallLogo.className = 'smallLogo';

  btnHome.src = './img/home.png';
  btnPlus.src = './img/plus.png';
  btnUser.src = './img/user.png';
  smallLogo.src = './img/logoLKPArt_corto.png';
  testText.textContent = 'soy un texto de prueba';

  divUp.append(smallLogo);
  divMid.append(testText)
  divDown.append(btnHome, btnPlus, btnUser);
  wallSection.append(divUp, divMid, divDown);
  return wallSection;
}
