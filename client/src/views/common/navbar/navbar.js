// 로그인 했을 때 / 안했을 때 navbar UI 바뀜
function changeNavbar() {
  const loginHidden = document.querySelectorAll('.login-hidden');
  const logoutHidden = document.querySelectorAll('.logout-hidden');

  if (localStorage.getItem('token')) {
    loginHidden.forEach(el => {el.classList.add('hidden')});
    logoutHidden.forEach(el => {el.classList.remove('hidden')});
  } else {
    loginHidden.forEach(el => {el.classList.remove('hidden')});
    logoutHidden.forEach(el => {el.classList.add('hidden')});
  }
}

// 로그아웃 버튼 클릭 시 토큰 삭제
function handleLogoutBtn() {
  const logoutBtn = document.querySelector('.logout-btn');
  logoutBtn.addEventListener('click', () => {
    // 로컬스토리지에서 토큰 삭제
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    // 기본 페이지로 이동
    window.location.href = '/';
  })
}

export { changeNavbar, handleLogoutBtn };