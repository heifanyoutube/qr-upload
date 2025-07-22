const auth = firebase.auth();
const storage = firebase.storage();

const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const uploadSection = document.getElementById('upload-section');
const fileInput = document.getElementById('file-input');
const uploadBtn = document.getElementById('upload-btn');
const statusDiv = document.getElementById('status');

loginBtn.onclick = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
};

logoutBtn.onclick = () => {
  auth.signOut();
};

auth.onAuthStateChanged(user => {
  if (user) {
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
    uploadSection.style.display = 'block';
    statusDiv.innerHTML = `歡迎 ${user.displayName}，請選擇圖片上傳。`;
  } else {
    loginBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
    uploadSection.style.display = 'none';
    statusDiv.innerHTML = '';
  }
});

uploadBtn.onclick = async () => {
  const files = fileInput.files;
  if (!files.length) {
    alert('請先選擇圖片');
    return;
  }
  statusDiv.innerHTML = '開始上傳...';

  for (const file of files) {
    const storageRef = storage.ref('qrcodes/' + file.name);
    try {
      await storageRef.put(file);
      statusDiv.innerHTML += `<br>成功上傳: ${file.name}`;
    } catch (error) {
      statusDiv.innerHTML += `<br>上傳失敗: ${file.name} (${error.message})`;
    }
  }
  statusDiv.innerHTML += '<br>全部上傳完成。';
};
