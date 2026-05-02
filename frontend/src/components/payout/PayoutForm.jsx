const PayoutForm = ({ bankData, handleChange, handleFetchBank, bankFetched, fetchedBankName, setBankData, handleSubmit, submitting, formError }) => {
  return (
    <div className="payout-form-card">
      <h3>Bank Account Details</h3>
      <p className="payout-subtitle">Where should we send your money?</p>

      {formError && <p className="form-error">{formError}</p>}

      <form onSubmit={handleSubmit} className="payout-form">
        <div className="form-group">
          <label>Account Number</label>
          <input type="number" name="bankAccount" placeholder="Enter account number" value={bankData.bankAccount} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Confirm Account Number</label>
          <input type="number" name="confirmAccount" placeholder="Re-enter account number" value={bankData.confirmAccount} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>IFSC Code</label>
          <div className="ifsc-row">
            <input 
              type="text" 
              name="ifscCode" 
              placeholder="e.g. HDFC0001234" 
              maxLength={11} 
              value={bankData.ifscCode} 
              onChange={(e) => { handleChange(e); }} 
            />
            <button type="button" className="btn-verify" onClick={handleFetchBank}>Fetch</button>
          </div>
          {bankFetched && <p className="bank-fetched">✓ {fetchedBankName}</p>}
        </div>

        <div className="form-group">
          <label>Account Type</label>
          <div className="account-toggle">
            {["Current", "Savings"].map(type => (
              <button 
                key={type}
                type="button" 
                className={bankData.accountType === type ? "toggle active" : "toggle"}
                onClick={() => setBankData({ ...bankData, accountType: type })}
              >
                {type} Account
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="payout-btn-primary full-width" disabled={submitting}>
          {submitting ? "Initiating Payout..." : "Confirm & Receive →"}
        </button>
        <p className="security-text">🔒 256-bit encrypted · RBI Compliant · Funds in 24 hours</p>
      </form>
    </div>
  );
};

export default PayoutForm;
