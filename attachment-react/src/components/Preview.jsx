import React from 'react';

const Preview = ({ invoiceInfo, items, totals }) => {
    // Format date to DD/MM/YYYY
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Format currency with commas
    const formatCurrency = (amount) => {
        return Number(amount).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    return (
        <div className="preview-area">
            <div className="document-page">
                <div className="watermark">ATTACHMENT</div>

                <div className="doc-content">
                    {/* Header Image - Constrained */}
                    <div className="doc-header-row">
                        <img src="/header_logo.jpeg" alt="Header" className="full-header-img" />
                    </div>

                    <div className="brand-name-centered">SWISS INN NEXUS HOTEL</div>

                    <div className="doc-title-section">
                        <div className="attachment-label">Attachment</div>
                        <h1>{invoiceInfo.title || 'Laundary'}</h1>
                    </div>

                    <div className="doc-info">
                        <p>NO: <span>{invoiceInfo.tin}</span></p>
                        <p>Name: <span>{invoiceInfo.name}</span></p>
                        <p style={{ textAlign: 'right' }}>DATE: <span>{formatDate(invoiceInfo.date)}</span></p>
                    </div>

                    <table className="doc-table">
                        <thead>
                            <tr>
                                <th style={{ width: '30px' }}>Srl#</th>
                                <th>PARTICULARS</th>
                                <th style={{ textAlign: 'center', width: '60px' }}>QTY</th>
                                <th style={{ textAlign: 'right', width: '120px' }}>AMOUNT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}.</td>
                                    <td>{item.particulars}</td>
                                    <td style={{ textAlign: 'center' }}>{item.qty}</td>
                                    <td style={{ textAlign: 'right' }}>{formatCurrency(item.amount)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="4">
                                    <div className="separator-line">========================================================</div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="3" style={{ textAlign: 'right' }}>SRC@ 10%</td>
                                <td style={{ textAlign: 'right' }}>{formatCurrency(totals.serviceCharge)}</td>
                            </tr>
                            <tr>
                                <td colSpan="3" style={{ textAlign: 'right' }}>VAT@ 15%</td>
                                <td style={{ textAlign: 'right' }}>{formatCurrency(totals.vat)}</td>
                            </tr>
                            <tr className="totals-row">
                                <td colSpan="3" style={{ textAlign: 'right' }}>Total Payable</td>
                                <td style={{ textAlign: 'right' }}>{formatCurrency(totals.grandTotal)}</td>
                            </tr>
                        </tfoot>
                    </table>

                    <div className="separator-line">=====================================================================</div>

                    <div style={{ textAlign: 'center', margin: '2rem 0', fontWeight: 'bold' }}>
                        THE ATTACHMENT IS INVALID WITHOUT FISCAL RECEIPT ATTACHED
                    </div>

                    <div className="doc-footer">
                        <div className="footer-item">
                            <p>CASHIER: <span>{invoiceInfo.cashier}</span></p>
                            <p>CASHIER SIGNATURE: --------------</p>
                        </div>
                        <div className="footer-item" style={{ textAlign: 'right' }}>
                            <p>ROOM NUMBER: --------------</p>
                            <p>GUEST NAME: ----------</p>
                            <p>GUEST SIGNATURE: ------------</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Preview;
