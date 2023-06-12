import { colRef, onSnapshot, addDoc, deletePost, FieldValue} from '../config/firebase.js';
import { doc } from 'firebase/firestore';

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
  const smallLogo = document.createElement('img');
  const btnHome = document.createElement('img');
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
  btnHome.className = 'btnHome';
  btnUser.className = 'btnUser';
  smallLogo.className = 'smallLogo';
  divPosts.className = 'divPost';

  btnHome.src = './img/home.png';
  btnUser.src = './img/user.png';
  smallLogo.src = './img/logoLKPArt_corto.png';
  inputTittlePost.required = true;
  inputPost.required = true;
  buttonPostear.textContent = 'Post';
  labelTittlePost.textContent = 'Tittle';
  inputPost.placeholder = 'Write your post here';
  labelTittlePost.setAttribute('for', 'post');

  // Firestore

  window.addEventListener('DOMContentLoaded', async () => {
    onSnapshot(colRef, (querySnapshot) => {
      // Borra los post antiguos
      while (divPosts.firstChild) {
        divPosts.removeChild(divPosts.firstChild);
      }
      querySnapshot.forEach((doc) => {
        const postData = doc.data();
        const postCard = document.createElement('div');
        const postElement = document.createElement('p');
        const titleElement = document.createElement('h3');
        const likeBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');
  
        deleteBtn.className = 'deleteBtn';
        likeBtn.className = 'likeBtn';
        postCard.className = 'postCard';
        postElement.className = 'postElement';
        titleElement.className = 'titleElement';
  
        deleteBtn.innerHTML = 'delete';
        deleteBtn.setAttribute('data-id', doc.id);
        likeBtn.innerText = 'like';
        postElement.innerText = postData.Post;
        titleElement.innerText = postData.Title;
  
        // funcionalidad boton delete
        deleteBtn.addEventListener('click', (e) => {
          const postId = e.target.getAttribute('data-id');
          deletePost(postId);
        });
  
        // funcionalidad boton like
        likeBtn.setAttribute('data-post-id', doc.id); // Almacena el ID de la publicación como atributo
        likeBtn.addEventListener('click', (e) => {
          e.preventDefault();
          console.log('like funciona');
          const postId = e.target.getAttribute('data-post-id'); // Obtiene el ID de la publicación desde el atributo
          // Actualiza el contador de “Me gusta” en la base de datos
          const docRef = doc(colRef, postId);
          const increment = firebase.firestore.FieldValue.increment(1);
          docRef.update({ likes: increment })
            .then(() => {
              console.log('Me gusta agregado');
            })
            .catch((error) => {
              console.error('Error al agregar el Me gusta:', error);
            });
        });
  
        postCard.appendChild(titleElement);
        postCard.appendChild(postElement);
        postCard.appendChild(likeBtn);
        postCard.appendChild(deleteBtn);
        divPosts.appendChild(postCard);
      });
    });
  });

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

  divUp.append(smallLogo);
  divPosts.append(post);
  divMid.append(inputPost, buttonPostear, formPost, divPosts);
  divDown.append(btnHome, btnUser);
  wallSection.append(divUp, divMid, divDown);
  formPost.append(labelTittlePost, inputTittlePost, inputPost, buttonPostear);
  return wallSection;
}
