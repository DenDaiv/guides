const content = document.getElementById("content");
const searchInput = document.getElementById("searchInput");

// Загружаем страницу
async function loadPage(page) {
  const res = await fetch(`pages/${page}.html`);
  const html = await res.text();
  content.innerHTML = html;
  filterCards(searchInput.value); // фильтруем после загрузки
}

// Фильтр карточек
function filterCards(query) {
  const cards = content.querySelectorAll('.card');
  const lowerQuery = query.toLowerCase();
  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(lowerQuery) ? 'block' : 'none';
  });
}

// Событие поиска
searchInput.addEventListener('input', e => filterCards(e.target.value));

// Навигация
document.querySelectorAll("button[data-page]").forEach(btn => {
  btn.addEventListener("click", () => {
    searchInput.value = ''; 
    loadPage(btn.dataset.page);
  });
});

// Стартовая страница
loadPage("home");
