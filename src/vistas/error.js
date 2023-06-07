export function error(navigateTo) {
  const sectionError = document.createElement('section');
  const errorText = document.createElement('p');

  errorText.textContent = 'este es un error';

  sectionError.append(errorText);
  return sectionError;
}
