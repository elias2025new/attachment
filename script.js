let items = [
    { particulars: 'Coat/Normal', qty: 2, amount: 197.62 },
    { particulars: 'Trouser/Nml', qty: 8, amount: 197.62 },
    { particulars: 'Shirt', qty: 14, amount: 118.57 }
];

const inputs = {
    title: document.getElementById('input-title'),
    no: document.getElementById('input-no'),
    name: document.getElementById('input-name'),
    date: document.getElementById('input-date'),
    cashier: document.getElementById('input-cashier')
};

const views = {
    title: document.getElementById('view-title'),
    no: document.getElementById('view-no'),
    name: document.getElementById('view-name'),
    date: document.getElementById('view-date'),
    cashier: document.getElementById('view-cashier'),
    itemsBody: document.getElementById('view-items-body'),
    src: document.getElementById('view-src'),
    vat: document.getElementById('view-vat'),
    total: document.getElementById('view-total')
};

// Initialize date to today's date
const today = new Date();
const formattedDate = today.toISOString().split('T')[0];
inputs.date.value = formattedDate;

function updateViews() {
    views.title.textContent = inputs.title.value;
    views.no.textContent = inputs.no.value;
    views.name.textContent = inputs.name.value;
    
    // Format date for view (DD/MM/YYYY)
    if (inputs.date.value) {
        const d = new Date(inputs.date.value);
        views.date.textContent = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    }

    views.cashier.textContent = inputs.cashier.value;

    renderItems();
    calculateTotals();
}

function addItem() {
    items.push({ particulars: '', qty: 1, amount: 0 });
    renderItemInputs();
    updateViews();
}

function removeItem(index) {
    items.splice(index, 1);
    renderItemInputs();
    updateViews();
}

function updateItem(index, field, value) {
    items[index][field] = field === 'particulars' ? value : parseFloat(value) || 0;
    updateViews();
}

function renderItemInputs() {
    const list = document.getElementById('items-list');
    list.innerHTML = '';
    items.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'item-row';
        div.innerHTML = `
            <input type="text" value="${item.particulars}" placeholder="Item" oninput="updateItem(${index}, 'particulars', this.value)">
            <input type="number" value="${item.qty}" placeholder="Qty" oninput="updateItem(${index}, 'qty', this.value)">
            <input type="number" step="0.01" value="${item.amount}" placeholder="Amt" oninput="updateItem(${index}, 'amount', this.value)">
            <button class="btn btn-danger" onclick="removeItem(${index})">&times;</button>
        `;
        list.appendChild(div);
    });
}

function renderItems() {
    views.itemsBody.innerHTML = '';
    items.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.particulars}</td>
            <td style="text-align: center;">${item.qty}</td>
            <td style="text-align: right;">${item.amount.toFixed(2)}</td>
        `;
        views.itemsBody.appendChild(tr);
    });
}

function calculateTotals() {
    let subtotal = items.reduce((sum, item) => sum + (item.qty * item.amount), 0);
    let src = subtotal * 0.10;
    let vatBase = subtotal + src;
    let vat = vatBase * 0.15;
    let total = vatBase + vat;

    views.src.textContent = src.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    views.vat.textContent = vat.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    views.total.textContent = total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Event Listeners
Object.values(inputs).forEach(input => {
    input.addEventListener('input', updateViews);
});

// Initial Render
renderItemInputs();
updateViews();
