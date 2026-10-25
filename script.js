

const STORAGE_KEY = 'mypath-cours-termines';

function esc(text) {
  const d = document.createElement('div');
  d.textContent = text;
  return d.innerHTML;
}


function getDone() {
  try {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(list)
      ? [...new Set(list)].filter(id => COURSES.some(c => c.id === id)) 
      : [];
  } catch (e) {
    return [];
  }
}
function toggleDone(id) {
  const done = getDone();
  const i = done.indexOf(id);
  if (i === -1) done.push(id); else done.splice(i, 1);
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(done)); } catch (e) { }
}

function updateProgressUI() {
  const done = getDone();
  const total = COURSES.length;
  const pct = total ? Math.round((done.length / total) * 100) : 0; 

  document.querySelectorAll('.progress-bar').forEach(bar => {
    bar.value = pct;
    bar.textContent = pct + ' %';
  });
  document.querySelectorAll('[data-progress-text]').forEach(el => {
    el.textContent = `${done.length} cours terminé${done.length > 1 ? 's' : ''} sur ${total} (${pct} %)`;
  });
  document.querySelectorAll('[data-status]').forEach(el => {
    const ok = done.includes(el.dataset.status);
    el.textContent = ok ? 'Terminé ✓' : 'À faire';
    el.classList.toggle('is-done', ok);
  });
  const btn = document.getElementById('done');
  if (btn) {
    const ok = done.includes(btn.dataset.course);
    btn.textContent = ok ? 'Terminé ✓ (annuler)' : 'Marquer comme terminé';
    btn.classList.toggle('is-done', ok);
  }
}


const burger = document.querySelector('.burger');
const menu = document.getElementById('menu');
function setMenu(open) {
  menu.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
}
burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); burger.focus(); }
});

document.addEventListener('click', e => {
  if (menu.classList.contains('open') && !menu.contains(e.target) && !burger.contains(e.target)) {
    setMenu(false);
  }
  console.log(e.target)
});

menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

const searchInput = document.getElementById('search');
const searchButton = document.querySelector('.search-button');

const grid = document.body.dataset.page === 'accueil' ? document.querySelector('.main') : null;

function filterCards() {
  const q = searchInput.value.trim().toLowerCase();
  let visible = 0;
  grid.querySelectorAll('.card').forEach(card => {
    const show = card.querySelector('.card-title').textContent.toLowerCase().includes(q);
    card.hidden = !show;
    if (show) visible++;
  });
  const empty = document.getElementById('empty');
  empty.textContent = q ? `Aucun cours disponible pour « ${searchInput.value.trim()} ».` : 'Aucun cours disponible.';
  empty.hidden = visible > 0;
}
function goSearch() {
  location.href = 'index.html?q=' + encodeURIComponent(searchInput.value.trim());
}

if (grid) {
  if (COURSES.length === 0) {
    const empty = document.getElementById('empty');
    empty.textContent = 'Aucun cours disponible.';
    empty.hidden = false;
  }else {
  COURSES.forEach(c => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="image-card"><img class="course-img" src="images/${c.img}" alt="Cours ${esc(c.title)}"></div>
      <h2 class="card-title">${esc(c.title)} Course</h2>
      <p class="card-type">${c.type === 'video' ? 'Cours vidéo' : 'Cours écrit'}</p>
      <p class="card-status" data-status="${c.id}">À faire</p>
      <a class="btn-voir" href="course.html?id=${c.id}">View</a>`;
    grid.appendChild(card);
  });}
  searchButton.addEventListener('click', filterCards);
  searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') filterCards(); });
  const q = new URLSearchParams(location.search).get('q');
  if (q) searchInput.value = q;
  filterCards();
} else {
  searchButton.addEventListener('click', goSearch);
  searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') goSearch(); });
}


const lesson = document.getElementById('lesson');
if (lesson) {
  const index = COURSES.findIndex(c => c.id === new URLSearchParams(location.search).get('id'));
  const nav = document.getElementById('course-nav');

  if (index === -1) {
    lesson.innerHTML = '<h1>Cours introuvable</h1><p>Retournez à la liste pour choisir un cours.</p>';
  } else {
    const c = COURSES[index];
    const list = items => items.map(i => `<li>${esc(i)}</li>`).join('');
    document.title = `MyPath – ${c.title}`;

    if (c.type === 'ecrit') {
    
      lesson.innerHTML = `
        <h1>${esc(c.title)}</h1>
        <p class="lead">${esc(c.intro)}</p>
        <figure>
          <img src="images/${c.img}" alt="Illustration du cours ${esc(c.title)}">
        </figure>
        <section><h2>Objectifs pédagogiques</h2><ul>${list(c.goals)}</ul></section>
        ${c.sections.map((s, i) => `
          <section>
            <h2>${i + 1}. ${esc(s.h)}</h2>
            <p>${esc(s.t)}</p>
            ${s.code ? `<pre><code>${esc(s.code)}</code></pre>` : ''}
          </section>`).join('')}
        <section class="summary"><h2>Résumé</h2><ul>${list(c.summary)}</ul></section>`;
    } else {
      
      lesson.innerHTML = `
        <h1>${esc(c.title)}</h1>
        <div class="video-box">
          <iframe src="https://www.youtube-nocookie.com/embed/${c.youtube}"
                  title="Vidéo du cours ${esc(c.title)}" loading="lazy"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          <h2>Description</h2>
          <p>${esc(c.intro)}</p>
        </div>`;
    }

    
    const prev = COURSES[index - 1];
    const next = COURSES[index + 1];
    nav.innerHTML = `
      ${prev ? `<a class="btn-nav" href="course.html?id=${prev.id}">Cours précédent</a>`
             : '<span class="btn-nav is-disabled" aria-disabled="true">Cours précédent</span>'}
      <button class="btn-done" id="done" type="button" data-course="${c.id}">Marquer comme terminé</button>
      ${next ? `<a class="btn-nav" href="course.html?id=${next.id}">Cours suivant</a>`
             : '<span class="btn-nav is-disabled" aria-disabled="true">Cours suivant</span>'}`;
    document.getElementById('done').addEventListener('click', () => {
      toggleDone(c.id);
      updateProgressUI();
    });
  }
}


if (document.body.dataset.page === 'progression') {
  const item = (c, ok) => `
    <li class="course-item">
      <a href="course.html?id=${c.id}">${ok ? '✓ ' : ''}${esc(c.title)}</a>
      <span class="card-type">${c.type === 'video' ? 'Cours vidéo' : 'Cours écrit'}</span>
    </li>`;

  function renderLists() {
    const done = getDone();
    const finished = COURSES.filter(c => done.includes(c.id));
    const remaining = COURSES.filter(c => !done.includes(c.id));
    document.getElementById('done-count').textContent = finished.length;
    document.getElementById('todo-count').textContent = remaining.length;
    document.getElementById('done-list').innerHTML = finished.map(c => item(c, true)).join('');
    document.getElementById('todo-list').innerHTML = remaining.map(c => item(c, false)).join('');
    document.getElementById('done-empty').hidden = finished.length > 0;
    document.getElementById('todo-empty').hidden = remaining.length > 0;
  }

  document.getElementById('reset').addEventListener('click', () => {
    if (!confirm('Effacer toute votre progression ?')) return;
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { }
    renderLists();
    updateProgressUI();
  });

  renderLists();
}

updateProgressUI();
