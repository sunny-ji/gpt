const calendarEl = document.getElementById('calendar');
const entryEl = document.getElementById('entry');
const entryDateEl = document.getElementById('entry-date');
const entryTextEl = document.getElementById('entry-text');
const saveBtn = document.getElementById('save-btn');

let entries = {};
let currentDate = new Date();

function loadEntries() {
  fetch('/api/entries').then(r => r.json()).then(data => {
    entries = data;
    renderCalendar();
  }).catch(() => {
    calendarEl.innerHTML = '<p>Please <a href="/login">log in</a>.</p>';
  });
}

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  calendarEl.innerHTML = '';
  for (let i = 0; i < firstDay; i++) {
    const div = document.createElement('div');
    calendarEl.appendChild(div);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const div = document.createElement('div');
    div.textContent = d;
    if (entries[dateStr]) div.classList.add('has-entry');
    div.addEventListener('click', () => showEntry(dateStr));
    calendarEl.appendChild(div);
  }
}

function showEntry(dateStr) {
  entryDateEl.textContent = dateStr;
  entryTextEl.value = entries[dateStr] || '';
  entryEl.style.display = 'block';
  saveBtn.onclick = () => saveEntry(dateStr);
}

function saveEntry(dateStr) {
  const text = entryTextEl.value;
  fetch('/api/entries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date: dateStr, text })
  }).then(() => {
    entries[dateStr] = text;
    renderCalendar();
  });
}

loadEntries();
