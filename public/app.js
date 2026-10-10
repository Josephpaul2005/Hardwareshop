const categories = ['All', 'Graphics Cards', 'Cooling', 'Cases', 'Memory', 'Storage', 'Motherboards', 'Power Supplies'];
const filters = document.querySelector('#filters');
const productsEl = document.querySelector('#products');
const searchEl = document.querySelector('#search');
const sortEl = document.querySelector('#sort');
const countEl = document.querySelector('#result-count');
const emptyEl = document.querySelector('#empty-state');
let activeCategory = 'All';
let debounce;

const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

function renderFilters() {
  filters.innerHTML = categories.map(category => `<button class="filter-btn ${category === activeCategory ? 'active' : ''}" data-category="${category}">${category}</button>`).join('');
  filters.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
    activeCategory = button.dataset.category;
    renderFilters();
    loadHardware();
  }));
}

function renderProducts(items) {
  productsEl.innerHTML = items.map(item => `
    <article class="product-card">
      <div class="product-image-wrap">
        <img class="product-image" src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=80'">
        ${item.featured ? '<span class="tag">EDITOR PICK</span>' : `<span class="tag">${item.category}</span>`}
        <span class="stock ${item.stock < 8 ? 'low' : ''}">${item.stock < 8 ? 'Low stock' : 'In stock'}</span>
      </div>
      <div class="product-info">
        <span class="category-label">${item.category}</span>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="product-bottom"><span class="price">${money(item.price)}</span><button class="add-button" aria-label="View ${item.name}" title="Product details">↗</button></div>
      </div>
    </article>`).join('');
  countEl.textContent = `${items.length} component${items.length === 1 ? '' : 's'} selected`;
  emptyEl.hidden = items.length > 0;
}

async function loadHardware() {
  countEl.textContent = 'Loading components...';
  const params = new URLSearchParams({ category: activeCategory, search: searchEl.value.trim(), sort: sortEl.value });
  try {
    const response = await fetch(`/api/hardware?${params}`);
    if (!response.ok) throw new Error('Request failed');
    const data = await response.json();
    renderProducts(data.items);
  } catch (_error) {
    productsEl.innerHTML = '<div class="empty-state"><h3>Catalog unavailable</h3><p>Check that the server and MongoDB are running, then refresh.</p></div>';
    countEl.textContent = 'Could not connect to catalog';
  }
}

renderFilters();
searchEl.addEventListener('input', () => {
  clearTimeout(debounce);
  debounce = setTimeout(loadHardware, 220);
});
sortEl.addEventListener('change', loadHardware);
loadHardware();
