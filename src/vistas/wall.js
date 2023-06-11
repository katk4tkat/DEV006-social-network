import { colRef, onSnapshot, addDoc } from '../config/firebase.js';

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
  const divPosts = document.createElement('div');
  const post = document.createElement('p');

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
  divPosts.className = 'divPost';

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

  window.addEventListener('DOMContentLoaded', async () => {
    onSnapshot(colRef, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const postData = doc.data();
        const postElement = document.createElement('p');
        const titleElement = document.createElement('h3');
        postElement.className = 'postElement';
        titleElement.className = 'titleElement';
        postElement.innerText = postData.Post;
        titleElement.innerText = postData.Title;
        divPosts.append(titleElement, postElement);
        divMid.insertBefore(divPosts, formPost);
      });
    });
  });
  

  /* window.addEventListener('DOMContentLoaded', async () => {
    const querySnapshot = await getPosts();
    querySnapshot.forEach(doc => {
      console.log(doc.data());
      title.innerText = doc.data().Title;
      post.innerText = doc.data().Post;
      divPosts.append(title, post, textoPosts);
      divMid.insertBefore(divPosts, formPost);
    });
  }); */

  /*  function pintarPost(postData) {
      title.innerText = postData.Title;
      post.innerText = postData.Post;
      divPosts.append(title, post);
      divMid.insertBefore(divPosts, formPost);
    } */

  onSnapshot(colRef, (snapshot) => {
    const instantanea = [];
    snapshot.docs.forEach((doc) => {
      instantanea.push({ ...doc.data(), id: doc.id });
    });
    console.log(instantanea);
  });


  window.addEventListener('DOMContentLoaded', async () => {
    await onSnapshot(colRef, (snapshot) => {
      const instantanea = [];
      snapshot.docs.forEach((doc) => {
        instantanea.push({ ...doc.data(), id: doc.id });
      });
    });
  });

  /*  function pintarPost(post) {
      window.addEventListener('DOMContentLoaded', async () => {
        const obtenerPost = getDoc(colRef);
        const querySnapshot = await obtenerPost();
        querySnapshot.forEach(doc => {
          const createPost = (postData) => {
            const tittle = document.createElement('p');
            const posts = document.createElement('p');
            tittle.innerText = postData.Title;
            posts.innerText = postData.Post;
            divMid.appendChild(createPost);
          };
        });
      }); */

  buttonPostear.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('boton funciona');
    addDoc(colRef, {
      Title: inputTittlePost.value,
      Post: inputPost.value,
    })
      .then(() => {
        formPost.reset();
      });
  });

  /*  buttonDelete.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('delete funciona');
      const docRef = doc(db, 'Posts', inputTittlePost.value);
      deleteDoc(docRef)
        .then(() => {
          formPost.reset();
        });
    }); */

  divUp.append(smallLogo);
  divPosts.append(post);
  divMid.append(inputPost, buttonPostear, formPost, divPosts);
  divDown.append(btnHome, btnPlus, btnUser);
  wallSection.append(divUp, divMid, divDown);
  formPost.append(labelTittlePost, inputTittlePost, inputPost, buttonPostear, buttonDelete);
  return wallSection;
}
