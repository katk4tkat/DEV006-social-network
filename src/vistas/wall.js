import {
  colRef,
  onSnapshot,
  addDoc,
  deletePost,
  FieldValue,
  getPost,
  updatePost,
} from '../config/firebase.js';

export function wall(navigateTo) {
  const wallSection = document.createElement('section');
  const divUp = document.createElement('div');
  const divMid = document.createElement('div');
  const imgFamiliaHome = document.createElement('img');
  const formPost = document.createElement('form');
  const labelTittlePost = document.createElement('label');
  const inputTittlePost = document.createElement('input');
  const inputPost = document.createElement('input');
  const buttonPostear = document.createElement('button');
  const textoNuevasPublicaciones = document.createElement('h3');
  const lineaDivisora = document.createElement('hr');
  const smallLogo = document.createElement('img');
  const divPosts = document.createElement('div');
  const post = document.createElement('p');

  wallSection.className = 'wallSection';
  divUp.className = 'divUp';
  divMid.className = 'divMid';
  imgFamiliaHome.className = 'imgFamiliaHome';
  formPost.className = 'formPost';
  labelTittlePost.className = 'labelTittlePost';
  inputTittlePost.className = 'inputTittlePost';
  inputPost.className = 'inputPost';
  buttonPostear.className = 'buttonPostear';
  textoNuevasPublicaciones.className = 'textoNuevasPublicaciones';
  lineaDivisora.className = 'lineaDivisora';
  smallLogo.className = 'smallLogo';
  divPosts.className = 'divPost';

  imgFamiliaHome.src = './img/comunidad.png';
  smallLogo.src = './img/logoLKPArt_corto.png';
  inputTittlePost.required = true;
  inputPost.required = true;
  buttonPostear.textContent = 'Post';
  labelTittlePost.textContent = 'What are we going to play today?';
  textoNuevasPublicaciones.textContent = 'Recently added post';
  inputTittlePost.placeholder = 'What activity do you want to do?';
  inputPost.placeholder = 'Write your post here';
  labelTittlePost.setAttribute('for', 'post');
  inputTittlePost.setAttribute = ('input', 'textarea');
  inputPost.setAttribute = ('input', 'textarea');
  // Firestore
  let editStatus = false;
  let id = '';
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
        const titleElement = document.createElement('h4');
        const divBtnIconos = document.createElement('div');
        const editBtn = document.createElement('img');
        const deleteBtn = document.createElement('img');

        divBtnIconos.className = 'divBtnIconos';
        deleteBtn.className = 'deleteBtn';
        editBtn.className = 'editBtn';
        postCard.className = 'postCard';
        postElement.className = 'postElement';
        titleElement.className = 'titleElement';

        editBtn.src = './img/pencil.png';
        deleteBtn.src = './img/trashcan.png';
        deleteBtn.innerHTML = 'delete';
        deleteBtn.setAttribute('data-id', doc.id);
        editBtn.setAttribute('data-id', doc.id);
        postElement.innerText = postData.Post;
        titleElement.innerText = postData.Title;

        // funcionalidad boton delete
        deleteBtn.addEventListener('click', (e) => {
          const postId = e.target.getAttribute('data-id');
          deletePost(postId);
        });

        // funcionalidad botón edit
        editBtn.addEventListener('click', async (e) => {
          console.log('editando')
          const postId = e.target.getAttribute('data-id');
          const doc = await getPost(e.target.dataset.id);
          const editPostData = doc.data();
          inputTittlePost.value = editPostData.Title;
          inputPost.value = editPostData.Post;

          editStatus = true;
          id = doc.id;
          buttonPostear.innerText = 'Update';
        });
        divBtnIconos.append(deleteBtn, editBtn);
        postCard.appendChild(titleElement);
        postCard.appendChild(postElement);
        postCard.appendChild(divBtnIconos);
        divPosts.appendChild(postCard);
      });
    });
  });

  buttonPostear.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log('boton funciona');
    try {
      if (!editStatus) {
        await addDoc(colRef, {
          Title: inputTittlePost.value,
          Post: inputPost.value,
        });
      } else {
        await updatePost(id, {
          Title: inputTittlePost.value,
          Post: inputPost.value,
        });
        editStatus = false;
        id = '';
        buttonPostear.innerText = 'Save';
      }
      formPost.reset();
      inputTittlePost.focus();
    } catch (error) {
      console.log(error);
    }
  });

  onSnapshot(colRef, (snapshot) => {
    const instantanea = [];
    snapshot.docs.forEach((doc) => {
      instantanea.push({ ...doc.data(), id: doc.id });
    });
    console.log(instantanea);
  });


  divUp.append(smallLogo);
  divPosts.append(post);
  divMid.append(formPost, divPosts);
  wallSection.append(divUp, divMid, imgFamiliaHome);
  formPost.append(
    labelTittlePost, inputTittlePost, inputPost, buttonPostear, textoNuevasPublicaciones, lineaDivisora);
  return wallSection;
}
