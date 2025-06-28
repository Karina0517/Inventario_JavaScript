
let itemsData = {};
let uniqueItems = new Set();
let typesMap = new Map();
let idCounter = 1;

document.addEventListener('DOMContentLoaded', () => {
    setupSystem();
    bindEvents();
    refreshDisplay();
});

function setupSystem() {
    const initialItems = [
        { name: 'Iphone 16', cost: 389.99, type: 'Electrónicos' },
        { name: 'Mac', cost: 200.99, type: 'Electrónicos' },
        { name: 'IPad Air', cost: 99.99, type: 'Electrónicos' }
    ];

    initialItems.forEach(item => {
        addNewItem(item.name, item.cost, item.type, false);
    });

    updateTypeFilter();
}

function addNewItem(name, cost, type, showAlert = true) {
    if (!name || !cost || !type || cost <= 0) {
        if (showAlert) alert('Datos inválidos, debes agregar un nombre, un precio y un tipo válido');
        return false;
    }

    const key = `item${idCounter}`;
    itemsData[key] = {
        id: idCounter,
        name,
        cost: parseFloat(cost)
    };

    uniqueItems.add(name);

    if (!typesMap.has(type)) {
        typesMap.set(type, [name]);
    } else {
        typesMap.get(type).push(name);
    }

    idCounter++;
    return true;
}

function bindEvents() {
    document.getElementById('save__item__btn').addEventListener('click', () => {
        const name = document.getElementById('item__name').value.trim();
        const cost = document.getElementById('item__cost').value;
        const type = document.getElementById('item__type').value;

        if (addNewItem(name, cost, type)) {
            clearForm();
            refreshDisplay();
            updateTypeFilter();
        }
    });

    document.getElementById('item-search').addEventListener('input', refreshDisplay);
    document.getElementById('type-filter').addEventListener('change', refreshDisplay);
}

function clearForm() {
    document.getElementById('item__name').value = '';
    document.getElementById('item__cost').value = '';
    document.getElementById('item__type').value = '';
}

function refreshDisplay() {
    showItems();
    showUniqueItems();
    showTypes();
}

function showItems() {
    const container = document.getElementById('items-container');
    const counter = document.getElementById('items-count');
    const searchText = document.getElementById('item-search').value.toLowerCase();
    const typeFilter = document.getElementById('type-filter').value;

    container.innerHTML = '';
    let visibleCount = 0;

    for (const key in itemsData) {
        const item = itemsData[key];

        if (searchText && !item.name.toLowerCase().includes(searchText)) continue;

        if (typeFilter) {
            let matches = false;
            typesMap.forEach((names, category) => {
                if (category === typeFilter && names.includes(item.name)) {
                    matches = true;
                }
            });
            if (!matches) continue;
        }

        const itemElement = createItemElement(item, '📦');
        container.appendChild(itemElement);
        visibleCount++;
    }

    counter.textContent = `${visibleCount} elementos`;
}

function showUniqueItems() {
    const container = document.getElementById('unique__container');
    const counter = document.getElementById('unique__count');
    const searchText = document.getElementById('item-search').value.toLowerCase();

    container.innerHTML = '';
    let visibleCount = 0;

    uniqueItems.forEach(name => {
        if (searchText && !name.toLowerCase().includes(searchText)) return;

        const itemElement = document.createElement('div');
        itemElement.className = 'item-card item-card--unique';
        itemElement.innerHTML = `
            <div class="item-card__info">
                <div class="item-card__details">
                    <h4>${name}</h4>
                </div>
                <div class="item-card__icon">🔗</div>
            </div>
        `;

        container.appendChild(itemElement);
        visibleCount++;
    });

    counter.textContent = `${visibleCount} únicos`;
}

function showTypes() {
    const container = document.getElementById('types__container');
    const counter = document.getElementById('types__count');
    const typeFilter = document.getElementById('type-filter').value;

    container.innerHTML = '';
    let visibleCount = 0;

    typesMap.forEach((names, category) => {
        if (typeFilter && category !== typeFilter) return;

        const itemElement = document.createElement('div');
        itemElement.className = 'item-card item-card--category';
        itemElement.innerHTML = `
            <div class="item-card__info">
                <div class="item-card__details">
                    <h4>${category}</h4>
                    <p>→ ${names.join(', ')}</p>
                </div>
                <div class="item-card__icon">🗂️</div>
            </div>
        `;

        container.appendChild(itemElement);
        visibleCount++;
    });

    counter.textContent = `${visibleCount} tipos`;
}

function createItemElement(item, icon) {
    const element = document.createElement('div');
    element.className = 'item-card';
    element.innerHTML = `
        <div class="item-card__info">
            <div class="item-card__details">
                <h4>${item.name}</h4>
                <p>Costo: $${item.cost.toFixed(2)}</p>
                <p>ID: ${item.id}</p>
            </div>
            <div class="item-card__icon">${icon}</div>
        </div>
    `;
    return element;
}

function updateTypeFilter() {
    const select = document.getElementById('type-filter');
    const types = new Set([...typesMap.keys()]);

    while (select.children.length > 1) {
        select.removeChild(select.lastChild);
    }

    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        select.appendChild(option);
    });
}
