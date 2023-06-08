import {
  getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc,
} from 'firebase/firestore';

export function wall(navigateTo) {
  const wallSection = document.createElement('section');
  const divUp = document.createElement('div');
  const divMid = document.createElement('div');
  const divDown = document.createElement('div');
  const formPost = document.createElement('form');
  const labelTittlePost = document.createElement('label');
  const inputTittlePost = document.createElement('input');
  const inputPost = document.createElement('input');
  const buttonPostear = document.createElement('button');
  const buttonDelete = document.createElement('button');
  const smallLogo = document.createElement('img');
  const btnHome = document.createElement('img');
  const btnPlus = document.createElement('img');
  const btnUser = document.createElement('img');

  wallSection.className = 'wallSection';
  divUp.className = 'divUp';
  divMid.className = 'divMid';
  divDown.className = 'divDown';
  formPost.className = 'formPost';
  labelTittlePost.className = 'labelTittlePost';
  inputTittlePost.className = 'inputTittlePost';
  inputPost.className = 'inputPost';
  buttonPostear.className = 'buttonPostear';
  buttonDelete.className = 'buttonDelete';
  btnHome.className = 'btnHome';
  btnPlus.className = 'btnPlus';
  btnUser.className = 'btnUser';
  smallLogo.className = 'smallLogo';

  btnHome.src = './img/home.png';
  btnPlus.src = './img/plus.png';
  btnUser.src = './img/user.png';
  smallLogo.src = './img/logoLKPArt_corto.png';
  buttonPostear.textContent = 'Post';
  buttonDelete.textContent = 'Delete';
  labelTittlePost.textContent = 'Tittle';
  inputPost.placeholder = 'Write your post here';
  labelTittlePost.setAttribute('for', 'post');

  // Firestore

  const db = getFirestore();
  const colRef = collection(db, 'Posts');

  onSnapshot(colRef, (snapshot) => {
    const posts = [];
    snapshot.docs.forEach((doc) => {
      posts.push({ ...doc.data(), id: doc.id });
    });
    console.log(posts);
  });

  buttonPostear.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('boton funciona');
    addDoc(colRef, {
      Title: inputTittlePost.value,
      Post: inputPost.value,
    })
      .then(() => {
        formPost.reset();
      })
  });

  buttonDelete.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('delete funciona');
    const docRef = doc(db, 'Posts', inputTittlePost.value);
    deleteDoc(docRef)
      .then(() => {
        formPost.reset();
      });
  });

  const divPosts = document.createElement('div');
  const post = document.createElement('p');

  divPosts.className = 'divPost';
  post.className = 'post';

  post.innerText = inputTittlePost.value; // for each?

  divUp.append(smallLogo);
  divPosts.append(post);
  divMid.append(inputPost, buttonPostear, formPost, divPosts);
  divDown.append(btnHome, btnPlus, btnUser);
  wallSection.append(divUp, divMid, divDown);
  formPost.append(labelTittlePost, inputTittlePost, inputPost, buttonPostear, buttonDelete);
  return wallSection;
}
