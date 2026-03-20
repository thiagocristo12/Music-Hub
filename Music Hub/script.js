const courses = [
  {
    id: 1,
    title: "Fundamentos Musicais",
    description: "Notas, escalas e teoria básica da música.",
    lessons: 8
  },
  {
    id: 2,
    title: "Violão para Iniciantes",
    description: "Acordes, ritmos e primeiras músicas no violão.",
    lessons: 12
  },
  {
    id: 3,
    title: "Guitarra Moderna",
    description: "Técnicas de guitarra elétrica, bends e solos.",
    lessons: 10
  },
  {
    id: 4,
    title: "Teclado e Piano",
    description: "Acordes, arpejos e improviso no teclado.",
    lessons: 9
  },
  {
    id: 5,
    title: "Exercícios Práticos",
    description: "Rotinas diárias, ear training e performance.",
    lessons: 15
  }
];

const container = document.getElementById("courses-container");

// MENU
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

// RENDER
function renderCourses() {
  container.innerHTML = "";

  courses.forEach(course => {
    const div = document.createElement("div");
    div.classList.add("course");

    div.innerHTML = `
      <h3>${course.title}</h3>
      <p>${course.description}</p>
      <p><strong>${course.lessons} aulas</strong></p>
      <button onclick="goToCourse(${course.id})">Ver curso</button>
    `;

    container.appendChild(div);
  });
}

function goToCourse(id) {
  window.location.href = `course.html?id=${id}`;
}

renderCourses();

function scrollToCourses() {
  document.getElementById('courses-container').scrollIntoView({ behavior: 'smooth' });
}
