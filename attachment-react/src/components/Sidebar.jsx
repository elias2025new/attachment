import React, { useState } from 'react';

const Sidebar = ({ invoiceInfo, setInvoiceInfo, items, addItem, removeItem, clearItems, totals, setTotals, handlePrint, printHistory, loadInvoice }) => {
    const [newItem, setNewItem] = useState({ particulars: '', qty: '', amount: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInvoiceInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleTotalChange = (e) => {
        const { name, value } = e.target;
        // If value is empty string, set to 0 in state but input will show empty string due to render logic
        // Actually, better to keep it as number in state.
        // If the user clears the input, value is "". parseFloat("") is NaN.
        // We want to allow clearing.
        // Let's store as number, but if input is empty, we set it to 0.
        // AND in render, if it's 0, we show ''.

        // Wait, if I set it to 0 when empty, it will show '' which is good.
        setTotals(prev => ({ ...prev, [name]: value === '' ? 0 : parseFloat(value) }));
    };

    const handleNewItemChange = (e) => {
        const { name, value } = e.target;
        setNewItem(prev => ({ ...prev, [name]: value }));
    };

    const handleAddItem = () => {
        if (newItem.particulars && newItem.qty && newItem.amount) {
            addItem({
                particulars: newItem.particulars,
                qty: parseInt(newItem.qty) || 0,
                amount: parseFloat(newItem.amount) || 0
            });
            setNewItem({ particulars: '', qty: '', amount: '' });
        }
    };

    return (
        <div className="sidebar no-print">
            <h2>Generator Controls</h2>

            <div className="input-group">
                <label>Title</label>
                <input type="text" name="title" value={invoiceInfo.title} onChange={handleInputChange} />
            </div>

            <div className="input-group">
                <label>TIN NO</label>
                <input type="text" name="tin" value={invoiceInfo.tin} onChange={handleInputChange} />
            </div>

            <div className="input-group">
                <label>Name</label>
                <input type="text" name="name" value={invoiceInfo.name} onChange={handleInputChange} />
            </div>

            <div className="input-group">
                <label>Date</label>
                <input type="date" name="date" value={invoiceInfo.date} onChange={handleInputChange} />
            </div>

            <div className="input-group">
                <label>Cashier Name</label>
                <input type="text" name="cashier" value={invoiceInfo.cashier} onChange={handleInputChange} />
            </div>

            <div className="input-group">
                <label>Service Charge Amount</label>
                <input
                    type="number"
                    name="serviceCharge"
                    value={totals.serviceCharge === 0 ? '' : totals.serviceCharge}
                    onChange={handleTotalChange}
                    step="0.01"
                    placeholder="0"
                />
            </div>

            <div className="input-group">
                <label>VAT Amount</label>
                <input
                    type="number"
                    name="vat"
                    value={totals.vat === 0 ? '' : totals.vat}
                    onChange={handleTotalChange}
                    step="0.01"
                    placeholder="0"
                />
            </div>

            <div className="input-group">
                <label>Total Payment</label>
                <input
                    type="number"
                    name="grandTotal"
                    value={totals.grandTotal === 0 ? '' : totals.grandTotal}
                    onChange={handleTotalChange}
                    step="0.01"
                    placeholder="0"
                />
            </div>

            <div className="items-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0 }}>Items</h3>

                    {/* Print History Links */}
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {printHistory && printHistory.map((historyItem, idx) => (
                            <button
                                key={historyItem.id}
                                onClick={() => loadInvoice(historyItem)}
                                className="btn-secondary"
                                style={{
                                    padding: '0.25rem 0.5rem',
                                    fontSize: '0.75rem',
                                    backgroundColor: 'rgba(56, 189, 248, 0.1)',
                                    color: '#38bdf8'
                                }}
                                title={`Restored from ${historyItem.timestamp}`}
                            >
                                Restore {idx + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        className="btn-danger-small"
                        onClick={clearItems}
                        style={{ padding: '0.25rem 0.75rem' }}
                    >
                        Clear
                    </button>
                </div>
                {items.map((item, index) => (
                    <div key={index} className="item-row-display">
                        <span>{item.particulars}</span>
                        <span>x{item.qty}</span>
                        <span>{item.amount}</span>
                        <button className="btn-danger-small" onClick={() => removeItem(index)}>X</button>
                    </div>
                ))}

                <div className="add-item-form">
                    <input
                        placeholder="Particulars"
                        name="particulars"
                        value={newItem.particulars}
                        onChange={handleNewItemChange}
                    />
                    <input
                        type="number"
                        placeholder="Qty"
                        name="qty"
                        value={newItem.qty}
                        onChange={handleNewItemChange}
                        style={{ width: '60px' }}
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        name="amount"
                        value={newItem.amount}
                        onChange={handleNewItemChange}
                        style={{ width: '80px' }}
                    />
                    <button className="btn-secondary" onClick={handleAddItem}>Add</button>
                </div>
            </div>

            <button className="btn-primary main-print-btn" onClick={handlePrint}>
                Print Attachment
            </button>
        </div>
    );
};

export default Sidebar;
