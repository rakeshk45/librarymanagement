// ================= SIGNUP =================

// ADMIN SIGNUP
function adminSignup() {
  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;

  if (!email || !password) {
    alert("Fill all fields");
    return;
  }

  localStorage.setItem("adminEmail", email);
  localStorage.setItem("adminPassword", password);

  alert("Admin Signup Successful");
  location.href = "adminlogin.html";
}

// USER SIGNUP
function userSignup() {
  const email = document.getElementById("userEmail").value;
  const password = document.getElementById("userPassword").value;

  if (!email || !password) {
    alert("Fill all fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.push({ email, password });

  localStorage.setItem("users", JSON.stringify(users));

  alert("User Signup Successful");
  location.href = "userlogin.html";
}

// ================= LOGIN =================

// ADMIN LOGIN → FULL ACCESS
function adminLogin() {
  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;

  const savedEmail = localStorage.getItem("adminEmail");
  const savedPassword = localStorage.getItem("adminPassword");

  if (email === savedEmail && password === savedPassword) {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("role", "admin");

    alert("Admin Login Successful");
    location.href = "ebook.html";
  } else {
    alert("Invalid Admin Credentials");
  }
}

// USER LOGIN → LIMITED ACCESS
function userLogin() {
  const email = document.getElementById("userEmail").value;
  const password = document.getElementById("userPassword").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const found = users.find(
    u => u.email === email && u.password === password
  );

  if (found) {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("role", "user");

    alert("User Login Successful");
    location.href = "ebook.html";
  } else {
    alert("Invalid User Credentials");
  }
}

// ================= LOGOUT =================
function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("role");
  alert("Logged out");
  location.href = "index.html";
}

// ================= ACCESS CONTROL =================
(function () {
  const loggedIn = localStorage.getItem("loggedIn");
  const role = localStorage.getItem("role");
  const page = location.pathname;

  //  Login / Signup pages always open
  if (page.includes("login") || page.includes("signup")) return;

  //No login → block
  if (!loggedIn) {
    alert("Please login first");
    location.href = "index.html";
    return;
  }

  //USER → block admin pages
  if (
    role === "user" &&
    (page.includes("admin") || page.includes("addBook"))
  ) {
    alert("Admin access only");
    location.href = "index.html";
  }

  // ✅ ADMIN → NO restriction at all
})();
