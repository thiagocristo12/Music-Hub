const courses = [
  {
    id: 1,
    title: "Fundamentos Musicais",
    description: "Teoria básica: notas, escalas maiores/menores, intervalos.",
    lessons: [
      "🎵 1. O que é música? Elementos fundamentais",
      "🎵 2. Notas musicais e staff (pentagrama)",
      "🎵 3. Escalas maiores e menores",
      "🎵 4. Intervalos e construção de acordes",
      "🎵 5. Ritmo básico (colcheias, semicolcheias)",
      "🎵 6. Compassos simples (4/4, 3/4)",
      "🎵 7. Tons e semitons",
      "🎵 8. Quiz teórico"
    ]
  },
  {
    id: 2,
    title: "Violão para Iniciantes",
    description: "Primeiros acordes, ritmos e músicas completas.",
    lessons: [
      "🎸 1. Partes do violão e afinação",
      "🎸 2. Acordes abertos: C, G, Am, F, Em, D",
      "🎸 3. Mudanças de acordes suaves",
      "🎸 4. Batidas básicas (↓↓↑↑↓↑)",
      "🎸 5. Primeira música: 'Cavaleiro da Triste Figura'",
      "🎸 6. Dedilhado simples",
      "🎸 7. Acordes com pestana (B, F#m)",
      "🎸 8. Música intermediária: 'Wish You Were Here'",
      "🎸 9. Strumming patterns avançados",
      "🎸 10. Capotraste",
      "🎸 11. Hammer-on e pull-off",
      "🎸 12. Exercício prático completo"
    ]
  },
  {
    id: 3,
    title: "Guitarra Moderna",
    description: "Técnicas elétricas, solos e riffs.",
    lessons: [
      "⚡ 1. Configuração da guitarra (action, intonation)",
      "⚡ 2. Acordes power e barre chords",
      "⚡ 3. Palm muting e downpicking",
      "⚡ 4. Pentatônica menor (box positions)",
      "⚡ 5. Bends e vibrato",
      "⚡ 6. Riff do Smoke on the Water",
      "⚡ 7. Escala pentatônica maior",
      "⚡ 8. Solos simples (Sweet Child O' Mine intro)",
      "⚡ 9. Alternate picking",
      "⚡ 10. Efeitos básicos (overdrive, delay)"
    ]
  },
  {
    id: 4,
    title: "Teclado e Piano",
    description: "Do básico ao improviso harmônico.",
    lessons: [
      "🎹 1. Posição das mãos e postura",
      "🎹 2. Escalas maiores nos dois braços",
      "🎹 3. Acordes triades (maior, menor, diminuto)",
      "🎹 4. Inversões de acordes",
      "🎹 5. Arpejos",
      "🎹 6. Progressões comuns (I-IV-V-I)",
      "🎹 7. Walking bass",
      "🎹 8. Improviso blues",
      "🎹 9. Música clássica simples (Für Elise)",
      "🎹 9. Padrões de acompanhamento pop"
    ]
  },
  {
    id: 5,
    title: "Exercícios Práticos",
    description: "Rotinas diárias para evolução constante.",
    lessons: [
      "🥁 1. Warm-up diário (5 min)",
      "🥁 2. Ear training - reconhecer intervalos",
      "🥁 3. Transcrição de melodias simples",
      "🥁 4. Metronomo - aumentar BPM",
      "🥁 5. Gravar e autoavaliação",
      "🥁 6. Duetos virtuais (play-along)",
      "🥁 7. Improviso sobre 12 bar blues",
      "🥁 8. Memorização de repertório",
      "🥁 9. Performance sem instrumento",
      "🥁 10. Rotina semanal completa",
      "🥁 11. Análise de músicas favoritas",
      "🥁 12. Open mic preparation",
      "🥁 13. Finger independence",
      "🥁 14. Speed building",
      "🥁 15. Certificate 🎸"
    ]
  }
];

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

const course = courses.find(c => c.id === id);

// Menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.getElementById("course-menu");
menuToggle.addEventListener("click", () => {
  menu.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

// Elements
const titleEl = document.getElementById("course-title");
const detailEl = document.getElementById("course-detail");
const lessonsListEl = document.getElementById("lessons-list");
const breadcrumbEl = document.getElementById("breadcrumb");
const progressFillEl = document.getElementById("progress-fill");
const progressTextEl = document.getElementById("progress-text");
const nextLessonBtn = document.getElementById("next-lesson");

// Title & desc
titleEl.textContent = course.title;
detailEl.innerHTML = `<p>${course.description}</p><h3>🎵 Conteúdo:</h3>`;

breadcrumbEl.innerHTML = `<a href="index.html">Início</a> > ${course.title}`;

// Progress
function getProgress() {
  return JSON.parse(localStorage.getItem(`js-trilha-${id}`) || "[]");
}
function saveProgress(progress) {
  localStorage.setItem(`js-trilha-${id}`, JSON.stringify(progress));
}
function updateProgress() {
  const progress = getProgress();
  const percent = Math.round((progress.length / course.lessons.length) * 100);
  progressFillEl.style.width = percent + "%";
  progressTextEl.textContent = percent + "% (" + progress.length + "/" + course.lessons.length + ")";
  nextLessonBtn.style.display = percent < 100 ? "block" : "none";
}

// Lessons sidebar
function renderLessons() {
  const progress = getProgress();
  lessonsListEl.innerHTML = course.lessons.map((lesson, i) => {
    const checked = progress.includes(i);
    return `<div class="lesson-item ${checked ? 'checked' : ''}" onclick="toggleLesson(${i})">
      <input type="checkbox" ${checked ? 'checked' : ''} onchange="toggleLesson(${i})">
      ${lesson}
    </div>`;
  }).join("");
  updateProgress();
}
window.toggleLesson = i => {
  let p = getProgress();
  const idx = p.indexOf(i);
  if (idx > -1) p.splice(idx, 1); else p.push(i);
  saveProgress(p);
  renderLessons();
};
window.nextLesson = () => {
  const p = getProgress();
  for (let i = 0; i < course.lessons.length; i++) {
    if (!p.includes(i)) { toggleLesson(i); break; }
  }
};
nextLessonBtn.onclick = nextLesson;

renderLessons();
window.scrollTo({ top: 0, behavior: 'smooth' });
