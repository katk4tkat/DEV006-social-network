import {
  colRef,
  onSnapshot,
  addDoc,
  deletePost,
  FieldValue,
  getPost,
  updatePost,
  savePost
} from '../config/firebase.js';


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
        const titleElement = document.createElement('h3');
        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');

        deleteBtn.className = 'deleteBtn';
        editBtn.className = 'editBtn';
        postCard.className = 'postCard';
        postElement.className = 'postElement';
        titleElement.className = 'titleElement';

        deleteBtn.innerHTML = 'delete';
        deleteBtn.setAttribute('data-id', doc.id);
        editBtn.innerText = 'edit';
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

        postCard.appendChild(titleElement);
        postCard.appendChild(postElement);
        postCard.appendChild(editBtn);
        postCard.appendChild(deleteBtn);
        divPosts.appendChild(postCard);
      });
    });
  });

  formPost.addEventListener('submit', async (e) => {
    e.preventDefault();
    const Title = formPost.querySelector('.inputTittlePost').value;
    const Post = formPost.querySelector('.inputPost').value;
    try {
      if (!editStatus) {
        await savePost(Title, Post);
      } else {
        await updatePost(id, {
          Title: Title,
          Post: Post,
        });
        editStatus = false;
        id = '';
        buttonPostear.innerText = 'Save';
      }
      formPost.reset();
      title.focus();
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
  divMid.append(formPost, divPosts);
  divDown.append(btnHome, btnUser);
  wallSection.append(divUp, divMid, divDown);
  formPost.append(labelTittlePost, inputTittlePost, inputPost, buttonPostear);
  return wallSection;
}
