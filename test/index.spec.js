// importamos la funcion que vamos a testear
import { registerEmail } from '../src/config/firebase.js';

describe('registerEmail', () => {
  it('debería ser una función', () => {
    expect(typeof registerEmail).toBe('function');
  });
});
