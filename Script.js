// NotifyHub (centered) — Admin credentials version
(() => {
  const ADMIN_USER = "KARAN-SHARXA";
  const ADMIN_PASS = "btechkaran2302578";

  const USERS_KEY = "notify_users";
  const NOTICES_KEY = "notify_notices";

  const loginCard = document.getElementById("loginCard");
  const registerCard = document.getElementById("registerCard");
  const adminPanel = document.getElementById("adminPanel");
  const userPanel = document.getElementById("userPanel");

  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const regUsername = document.getElementById("regUsername");
  const regPassword = document.getElementById("regPassword");
  const noticeText = document.getElementById("noticeText");

  let currentUser = null;

  // Helper
  const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
  const load = (k) => JSON.parse(localStorage.getItem(k) || "[]");

  // Toggle register
  window.toggleRegister = () => {
    registerCard.classList.toggle("hidden");
    loginCard.classList.toggle("hidden");
  };

  // Register new user
  window.register = () => {
    const u = regUsername.value.trim();
    const p = regPassword.value.trim();
    if (!u || !p) return alert("Fill all fields!");
    const users = load(USERS_KEY);
    if (users.find((x) => x.username === u)) return alert("User exists!");
    users.push({ username: u, password: p });
    save(USERS_KEY, users);
    alert("Account created!");
    regUsername.value = regPassword.value = "";
    toggleRegister();
  };

  // Login
  window.login = () => {
    const u = username.value.trim();
    const p = password.value.trim();
    if (!u || !p) return alert("Enter credentials!");
    if (u === ADMIN_USER && p === ADMIN_PASS) {
      currentUser = "admin";
      showAdmin();
      return;
    }
    const users = load(USERS_KEY);
    if (users.find((x) => x.username === u && x.password === p)) {
      currentUser = u;
      showUser();
    } else alert("Invalid credentials!");
  };

  // Sign out
  window.signOut = () => {
    currentUser = null;
    adminPanel.classList.add("hidden");
    userPanel.classList.add("hidden");
    loginCard.classList.remove("hidden");
  };

  // Add notice
  window.addNotice = () => {
    const text = noticeText.value.trim();
    if (!text) return alert("Write something!");
    const notices = load(NOTICES_KEY);
    notices.unshift({ id: Date.now(), text, date: new Date().toLocaleString() });
    save(NOTICES_KEY, notices);
    noticeText.value = "";
    renderAdmin();
    renderUser();
  };

  // Clear all
  window.clearAll = () => {
    if (confirm("Clear all updates?")) {
      save(NOTICES_KEY, []);
      renderAdmin();
      renderUser();
    }
  };

  // Render admin
  function renderAdmin() {
    const adminList = document.getElementById("adminList");
    const tpl = document.getElementById("adminItemTpl");
    const data = load(NOTICES_KEY);
    adminList.innerHTML = "";
    data.forEach((n) => {
      const el = tpl.content.cloneNode(true);
      el.querySelector(".title").textContent = n.text;
      el.querySelector(".date").textContent = n.date;
      adminList.appendChild(el);
    });
  }

  // Render user
  function renderUser() {
    const userGrid = document.getElementById("userGrid");
    const tpl = document.getElementById("userCardTpl");
    const data = load(NOTICES_KEY);
    userGrid.innerHTML = "";
    data.forEach((n) => {
      const el = tpl.content.cloneNode(true);
      el.querySelector(".content").textContent = n.text;
      el.querySelector(".date").textContent = n.date;
      userGrid.appendChild(el);
    });
  }

  function showAdmin() {
    loginCard.classList.add("hidden");
    adminPanel.classList.remove("hidden");
    renderAdmin();
  }

  function showUser() {
    loginCard.classList.add("hidden");
    userPanel.classList.remove("hidden");
    renderUser();
  }
})();
