const form = document.getElementById("profile-form");

// Inputs
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const instrumentInput = document.getElementById("instrument");
const bioInput = document.getElementById("bio");

// Card
const cardName = document.getElementById("card-name");
const cardEmail = document.getElementById("card-email");
const cardInstrument = document.getElementById("card-instrument");
const cardBio = document.getElementById("card-bio");

// Carregar dados
function loadProfile() {
  const data = JSON.parse(localStorage.getItem("user-profile")) || {};

  nameInput.value = data.name || "";
  emailInput.value = data.email || "";
  instrumentInput.value = data.instrument || "";
  bioInput.value = data.bio || "";

  updateCard(data);
}

// Atualizar card
function updateCard(data) {
  cardName.textContent = data.name || "-";
  cardEmail.textContent = data.email || "-";
  cardInstrument.textContent = data.instrument || "-";
  cardBio.textContent = data.bio || "-";
}

// Salvar
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    name: nameInput.value,
    email: emailInput.value,
    instrument: instrumentInput.value,
    bio: bioInput.value
  };

  localStorage.setItem("user-profile", JSON.stringify(data));

  updateCard(data);

  alert("Perfil salvo com sucesso!");
});

// MENU (igual outras páginas)
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

loadProfile();