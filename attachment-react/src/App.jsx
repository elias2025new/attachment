import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Preview from './components/Preview';
import './index.css';

function App() {
  // Initialize from localStorage or default
  const [invoiceInfo, setInvoiceInfo] = useState(() => {
    const saved = localStorage.getItem('invoiceInfo');
    return saved ? JSON.parse(saved) : {
      title: 'Laundary',
      tin: '0002194454',
      name: 'HAILU TESFAYE',
      date: new Date().toISOString().split('T')[0],
      cashier: 'hANA'
    };
  });

  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('items');
    return saved ? JSON.parse(saved) : [
      { particulars: 'Coat/Normal', qty: 2, amount: 197.62 },
      { particulars: 'Trouser/Nml', qty: 8, amount: 197.62 },
      { particulars: 'Shirt', qty: 14, amount: 118.57 }
    ];
  });

  const [totals, setTotals] = useState(() => {
    const saved = localStorage.getItem('totals');
    return saved ? JSON.parse(saved) : {
      serviceCharge: 0,
      vat: 0,
      grandTotal: 0
    };
  });

  const [printHistory, setPrintHistory] = useState(() => {
    const saved = localStorage.getItem('printHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('invoiceInfo', JSON.stringify(invoiceInfo));
  }, [invoiceInfo]);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('totals', JSON.stringify(totals));
  }, [totals]);

  useEffect(() => {
    localStorage.setItem('printHistory', JSON.stringify(printHistory));
  }, [printHistory]);

  const addItem = (item) => {
    setItems([...items, item]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const clearItems = () => {
    if (window.confirm('Are you sure you want to clear all items?')) {
      setItems([]);
    }
  };

  const handlePrint = () => {
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      invoiceInfo,
      items,
      totals
    };
    setPrintHistory(prev => [newEntry, ...prev].slice(0, 2));
    setTimeout(() => window.print(), 100);
  };

  const loadInvoice = (historyItem) => {
    if (window.confirm(`Load saved invoice from ${historyItem.timestamp}? Current data will be replaced.`)) {
      setInvoiceInfo(historyItem.invoiceInfo);
      setItems(historyItem.items);
      setTotals(historyItem.totals);
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        invoiceInfo={invoiceInfo}
        setInvoiceInfo={setInvoiceInfo}
        items={items}
        addItem={addItem}
        removeItem={removeItem}
        clearItems={clearItems}
        totals={totals}
        setTotals={setTotals}
        handlePrint={handlePrint}
        printHistory={printHistory}
        loadInvoice={loadInvoice}
      />
      <Preview
        invoiceInfo={invoiceInfo}
        items={items}
        totals={totals}
      />
    </div>
  );
}

export default App;
