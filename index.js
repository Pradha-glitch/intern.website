
  function openModal(type) {
    const modal = document.getElementById("modal");
    const body = document.getElementById("modalBody");
    modal.style.display = "flex";

    if (type === "login") {
      body.innerHTML = `
        <h3 style="color:#00eaff;">Login</h3>
        <input id="loginUser" type="text" placeholder="Username or Email" required style="width:100%;padding:10px;margin:10px 0;border-radius:6px;border:none;">
        <input id="loginPass" type="password" placeholder="Password" required style="width:100%;padding:10px;margin:10px 0;border-radius:6px;border:none;">
        <button onclick="loginUser()" style="padding:10px 20px;background:#00bcd4;color:white;border:none;border-radius:6px;cursor:pointer;">Login</button>
      `;
    } else {
      body.innerHTML = `
        <h3 style="color:#00eaff;">Signup</h3>
        <input id="signupName" type="text" placeholder="Name" required style="width:100%;padding:10px;margin:10px 0;border-radius:6px;border:none;">
        <input id="signupEmail" type="email" placeholder="Email" required style="width:100%;padding:10px;margin:10px 0;border-radius:6px;border:none;">
        <input id="signupPass" type="password" placeholder="Password" required style="width:100%;padding:10px;margin:10px 0;border-radius:6px;border:none;">
        <button onclick="signupUser()" style="padding:10px 20px;background:#00bcd4;color:white;border:none;border-radius:6px;cursor:pointer;">Signup</button>
      `;
    }
  }

  function closeModal() {
    document.getElementById("modal").style.display = "none";
  }

  function signupUser() {
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const pass = document.getElementById("signupPass").value;

    if (!name || !email || !pass) {
      alert("All fields are required.");
      return;
    }

    const user = { name, email, pass };
    localStorage.setItem("userInfo", JSON.stringify(user));
    alert("Signup successful!");
    closeModal();
  }

  function loginUser() {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const username = document.getElementById("loginUser").value.trim();
    const password = document.getElementById("loginPass").value;

    if (!user) {
      alert("No user signed up yet.");
      return;
    }

    if ((user.email === username || user.name === username) && user.pass === password) {
      alert("Login successful!");
      closeModal();
    } else {
      alert("Invalid credentials!");
    }
  }

  window.addEventListener("click", function (e) {
    const modal = document.getElementById("modal");
    if (e.target === modal) closeModal();
  });



let internships = JSON.parse(localStorage.getItem("internships")) || [];

function renderInternships(data = internships) {
    let container = document.getElementById("cards");
    if (!container) {
        container = document.createElement("div");
        container.className = "cards";
        container.id = "cards";
        document.querySelector(".glass").appendChild(container);
    }

    container.innerHTML = "";

    data.forEach((i, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
      <h3>${i.title}</h3>
      <p><strong>Company:</strong> ${i.company}</p>
      <p><strong>Location:</strong> ${i.location}</p>
      <p><strong>Duration:</strong> ${i.duration}</p>
      <p><strong>Field:</strong> ${i.field}</p>
      <a href="#" class="btn">Apply</a>
      <button class="btn" style="margin-left: 10px; background: red;" onclick="removeInternship(${index})">Remove</button>
    `;
        container.appendChild(card);
    });
}

function removeInternship(index) {
    if (confirm("Are you sure you want to remove this internship?")) {
        internships.splice(index, 1);
        localStorage.setItem("internships", JSON.stringify(internships));
        renderInternships();
    }
}

document.getElementById("uploadForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const newIntern = {
        title: document.getElementById("title").value.trim(),
        company: document.getElementById("company").value.trim(),
        location: document.getElementById("location").value.trim(),
        duration: document.getElementById("duration").value.trim(),
        field: document.getElementById("field").value.trim()
    };

    internships.push(newIntern);
    localStorage.setItem("internships", JSON.stringify(internships));

    alert("Internship uploaded successfully!");
    this.reset();
    renderInternships();
});

document.addEventListener("DOMContentLoaded", () => {
    renderInternships();
});
