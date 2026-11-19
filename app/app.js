// Vice City Trophy Atlas — offline tracker for the 55 GTA VI trophies.
// Loads its data from the inline JSON block in index.html (so it also renders
// from file://), falling back to a same-folder fetch of data/trophies.json.
// Progress lives in localStorage only; nothing here makes a network request.
const STORAGE_KEY = 'gta6-trophy-guide-01-progress-v1';
const PLATINUM_ID = 1;

const searchInput = document.getElementById('search');
const kindChips = document.getElementById('kindChips');
const gradeSelect = document.getElementById('grade');
const spoilerToggle = document.getElementById('spoiler');
const earnedOnlyToggle = document.getElementById('earnedOnly');
const cardsEl = document.getElementById('cards');
const countLine = document.getElementById('countLine');
const emptyState = document.getElementById('emptyState');
const progressText = document.getElementById('progressText');
const gradeText = document.getElementById('gradeText');
const progressFill = document.getElementById('progressFill');
const platinumSection = document.getElementById('platinum');

const params = new URLSearchParams(location.search);
let kindFilter = 'all';
let openId = Number(params.get('trophy') || 0) || null;
let earned = loadEarned();

function loadEarned() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    const ids = Array.isArray(raw) ? raw : (raw.earned ?? []);
    return new Set(ids.filter((n) => Number.isInteger(n) && n >= 1 && n <= 55));
  } catch {
    return new Set();
  }
}

function saveEarned() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...earned].sort((a, b) => a - b)));
}

async function loadTrophies() {
  const inline = document.getElementById('trophy-data');
  if (inline && inline.textContent.trim().length > 10) {
    return JSON.parse(inline.textContent).trophies;
  }
  const res = await fetch('data/trophies.json');
  return (await res.json()).trophies;
}

function gradeLabel(grade) {
  return grade.charAt(0).toUpperCase() + grade.slice(1);
}

function missableLine(trophy) {
  if (trophy.missable) {
    return 'MISSABLE — the Chapter 1 balcony meditation at Jason\u2019s house is gone forever after Chapter 1. Whether it is strictly required for the trophy is still unconfirmed (PowerPyx), so do it anyway.';
  }
  if (trophy.hidden) {
    return 'Not missable — it pops automatically from the story. But there is no mission replay, so keep a manual save at the start of every chapter.';
  }
  return 'Not missable — do it any time, including in free-roam after the story.';
}

function trophyHiddenBySpoiler(trophy) {
  return spoilerToggle.checked && trophy.hidden && !earned.has(trophy.id);
}

function makeText(tag, text, className) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  el.textContent = text;
  return el;
}

function renderSources(trophy) {
  const box = document.createElement('div');
  box.append(makeText('p', '', ''));
  const label = makeText('span', 'Sources: ', 'label');
  box.firstChild.append(label);
  const lines = (trophy.sources || []).map((s) => (s.url ? `${s.name} — ${s.url}` : s.name));
  box.firstChild.append(document.createTextNode(lines.join('  |  ')));
  return box;
}

function renderDetail(trophy) {
  const detail = document.createElement('div');
  detail.className = 'card-detail';
  if (trophyHiddenBySpoiler(trophy)) {
    detail.append(makeText('p', 'Guide hidden until earned — turn the spoiler setting off, or earn this trophy, to read its guide.', 'spoiler-note'));
    return detail;
  }
  const guidePara = document.createElement('p');
  guidePara.append(makeText('span', 'Guide: ', 'label'));
  guidePara.append(document.createTextNode(trophy.guide));
  detail.append(guidePara);
  const missPara = document.createElement('p');
  missPara.append(makeText('span', 'When it can be missed: ', 'label'));
  missPara.append(document.createTextNode(missableLine(trophy)));
  detail.append(missPara);
  detail.append(renderSources(trophy));
  return detail;
}

function renderCard(trophy) {
  const card = document.createElement('article');
  card.className = 'card' + (earned.has(trophy.id) ? ' earned' : '') + (openId === trophy.id ? ' open' : '');
  card.dataset.trophyId = String(trophy.id);

  const top = document.createElement('div');
  top.className = 'card-top';
  const box = document.createElement('input');
  box.type = 'checkbox';
  box.checked = earned.has(trophy.id);
  box.setAttribute('aria-label', `Mark ${trophy.name} as earned`);
  box.addEventListener('click', (event) => event.stopPropagation());
  box.addEventListener('change', () => {
    if (box.checked) earned.add(trophy.id);
    else earned.delete(trophy.id);
    saveEarned();
    renderAll();
  });
  top.append(box);

  const body = document.createElement('div');
  body.className = 'card-body';
  const hidden = trophyHiddenBySpoiler(trophy);
  body.append(makeText('div', hidden ? 'Hidden story trophy' : trophy.name, 'card-name'));
  body.append(makeText('div', hidden ? 'Hidden story trophy — earn it to reveal its name and description.' : trophy.description, 'card-desc'));
  const meta = document.createElement('div');
  meta.className = 'card-meta';
  meta.append(makeText('span', gradeLabel(trophy.grade), `badge ${trophy.grade}`));
  meta.append(makeText('span', trophy.kind, 'badge kind'));
  if (trophy.missable) meta.append(makeText('span', 'Missable', 'badge missable'));
  if (trophy.count != null) meta.append(makeText('span', `Target: ${trophy.count.toLocaleString('en-US')}`, 'badge count'));
  if (trophy.hidden) meta.append(makeText('span', 'Hidden on PSN', 'badge hidden-tag'));
  body.append(meta);
  top.append(body);
  card.append(top);
  if (openId === trophy.id) card.append(renderDetail(trophy));
  card.addEventListener('click', () => {
    openId = openId === trophy.id ? null : trophy.id;
    renderAll();
  });
  return card;
}

function trophyMatches(trophy) {
  if (gradeSelect.value !== 'all' && trophy.grade !== gradeSelect.value) return false;
  if (kindFilter === 'missable' && !trophy.missable) return false;
  if (kindFilter === 'online') return false;
  if (kindFilter !== 'all' && kindFilter !== 'missable' && trophy.kind !== kindFilter) return false;
  if (earnedOnlyToggle.checked && !earned.has(trophy.id)) return false;
  const q = searchInput.value.trim().toLowerCase();
  if (q) {
    const hay = `${trophy.name} ${trophy.description} ${trophy.guide} ${trophy.kind}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

function renderProgress(trophies) {
  const total = trophies.length;
  const byGrade = { platinum: 0, gold: 0, silver: 0, bronze: 0 };
  for (const t of trophies) if (earned.has(t.id)) byGrade[t.grade] += 1;
  progressText.textContent = `${earned.size} of ${total} earned`;
  gradeText.textContent = `${byGrade.platinum} platinum · ${byGrade.gold} gold · ${byGrade.silver} silver · ${byGrade.bronze} bronze`;
  progressFill.style.width = `${(earned.size / total) * 100}%`;
}

function renderPlatinum(trophies) {
  const plat = trophies.find((t) => t.id === PLATINUM_ID);
  if (!plat) return;
  platinumSection.replaceChildren();
  const hero = document.createElement('div');
  hero.className = 'platinum-hero';
  const medal = document.createElement('div');
  medal.className = 'medal';
  medal.textContent = '★';
  hero.append(medal);
  const body = document.createElement('div');
  body.append(makeText('h3', `${plat.name} — the Platinum`, ''));
  body.append(makeText('p', plat.description, ''));
  const guide = document.createElement('p');
  guide.append(makeText('span', 'Guide: ', 'label'));
  guide.append(document.createTextNode(plat.guide));
  body.append(guide);
  const src = document.createElement('p');
  src.append(makeText('span', 'Sources: ', 'label'));
  src.append(document.createTextNode((plat.sources || []).map((s) => (s.url ? `${s.name} — ${s.url}` : s.name)).join('  |  ')));
  body.append(src);
  const state = document.createElement('p');
  const stateBox = document.createElement('input');
  stateBox.type = 'checkbox';
  stateBox.checked = earned.has(plat.id);
  stateBox.addEventListener('change', () => {
    if (stateBox.checked) earned.add(plat.id);
    else earned.delete(plat.id);
    saveEarned();
    renderAll();
  });
  const stateLabel = document.createElement('label');
  stateLabel.append(stateBox, document.createTextNode(' Mark the platinum as earned'));
  state.append(stateLabel);
  body.append(state);
  hero.append(body);
  platinumSection.append(hero);
}

function renderAll() {
  const trophies = window.__trophies;
  renderProgress(trophies);
  renderPlatinum(trophies);
  const shown = trophies.filter((t) => t.id !== PLATINUM_ID && trophyMatches(t));
  cardsEl.replaceChildren();
  for (const t of shown) cardsEl.append(renderCard(t));
  countLine.textContent = `Showing ${shown.length} of ${trophies.length - 1} trophies below the platinum — ${earned.size} earned in total. Click any card to open its cited guide.`;
  if (kindFilter === 'online') {
    emptyState.hidden = false;
    emptyState.textContent = '0 online trophies — every trophy is single-player/offline. GTA VI has no online trophies at launch, so the Online filter is empty on purpose: nothing here needs a connection or another player.';
  } else if (shown.length === 0) {
    emptyState.hidden = false;
    emptyState.textContent = 'No trophies match these filters. Clear the search or pick another kind or grade.';
  } else {
    emptyState.hidden = true;
  }
}

function exportProgress() {
  const payload = { app: 'gta6-trophy-guide-01', version: 1, earned: [...earned].sort((a, b) => a - b), exportedAt: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'gta6-trophy-progress.json';
  a.click();
  URL.revokeObjectURL(a.href);
}

async function importProgress(file) {
  const raw = JSON.parse(await file.text());
  const ids = Array.isArray(raw) ? raw : (raw.earned ?? []);
  const valid = ids.filter((n) => Number.isInteger(n) && n >= 1 && n <= 55);
  if (valid.length === 0) throw new Error('No trophy ids 1-55 found in that file.');
  earned = new Set(valid);
  saveEarned();
  renderAll();
}

function wireControls() {
  searchInput.addEventListener('input', renderAll);
  gradeSelect.addEventListener('change', renderAll);
  spoilerToggle.addEventListener('change', renderAll);
  earnedOnlyToggle.addEventListener('change', renderAll);
  kindChips.addEventListener('click', (event) => {
    const chip = event.target.closest('[data-kind]');
    if (!chip) return;
    kindFilter = chip.dataset.kind;
    for (const c of kindChips.querySelectorAll('.chip')) c.classList.toggle('on', c === chip);
    renderAll();
  });
  document.getElementById('exportBtn').addEventListener('click', exportProgress);
  document.getElementById('importFile').addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      await importProgress(file);
    } catch (err) {
      alert(`Could not import that file: ${err.message}`);
    }
    event.target.value = '';
  });
  document.getElementById('resetBtn').addEventListener('click', () => {
    if (!confirm('Clear all earned trophies?')) return;
    earned = new Set();
    saveEarned();
    renderAll();
  });
  if (params.get('spoiler') === 'on') spoilerToggle.checked = true;
}

async function bootGuide() {
  window.__trophies = await loadTrophies();
  wireControls();
  renderAll();
  if (openId) {
    const card = cardsEl.querySelector(`[data-trophy-id="${openId}"]`);
    if (card) card.scrollIntoView({ block: 'start' });
  } else if (params.get('shot') === 'roadmap') {
    document.getElementById('roadmap').scrollIntoView({ block: 'start' });
  }
  window.__shotReady = true;
}

bootGuide().catch((err) => {
  countLine.textContent = `Could not load the trophy list: ${err.message}. Serve this folder with a static server (node serve.ts) or open it with the network off from a local server.`;
  window.__shotReady = true;
});
