const {menus, money, initialGuests} = window.menusBoda;
const form = document.querySelector('form');
const guests = document.querySelector('#invitados');
const total = document.querySelector('#total');
const detail = document.querySelector('#detalle');
const response = document.querySelector('#respuesta');

document.querySelector('#menus').innerHTML = menus.map((menu, index) => `<label class="menu-card">
 <span class="menu-title"><input name="menu" type="radio" value="${menu.id}" required ${index === 0 ? 'checked' : ''}> Menú ${menu.name}</span>
 <span class="price">${money(menu.cents)} <small>/ persona</small></span>
 <span class="dishes">${menu.dishes.map(dish => `<span>${dish}</span>`).join('')}</span>
</label>`).join('');
document.querySelector('#pdfs').innerHTML = menus.map(menu => `<li><a href="menu-boda-${menu.id}.pdf">Menú ${menu.name} (PDF)</a></li>`).join('');
guests.value = initialGuests;

function selectedMenu() {
 return menus.find(menu => menu.id === form.elements.menu.value);
}

function updateTotal() {
 const menu = selectedMenu();
 const valid = guests.validity.valid;
 total.textContent = valid ? money(menu.cents * guests.valueAsNumber) : '—';
 detail.textContent = valid ? `${guests.valueAsNumber} × ${money(menu.cents)}` : 'Indicad entre 1 y 999 invitados.';
 response.textContent = '';
}

form.querySelectorAll('[data-change]').forEach(button => button.addEventListener('click', () => {
 const current = guests.validity.valid ? guests.valueAsNumber : initialGuests;
 guests.value = Math.min(Number(guests.max), Math.max(Number(guests.min), current + Number(button.dataset.change)));
 updateTotal();
}));
form.addEventListener('input', updateTotal);
form.addEventListener('submit', event => {
 event.preventDefault();
 const comment = document.querySelector('#cambio').value.trim();
 response.textContent = ['Solicitud preparada en esta página', `Menú ${selectedMenu().name} · ${guests.valueAsNumber} invitados · ${total.textContent}`, comment].filter(Boolean).join('\n');
});
updateTotal();
