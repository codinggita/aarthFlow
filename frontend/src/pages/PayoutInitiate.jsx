import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getInvoiceById, initiatePayout } from "../utils/api";
import PayoutForm from "../components/payout/PayoutForm";
import PayoutSummary from "../components/payout/PayoutSummary";
import "../styles/Payout.css";

const PayoutInitiate = () => {
  const { invoiceId } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [bankData, setBankData] = useState({ bankAccount: "", confirmAccount: "", ifscCode: "", bankName: "", accountType: "Current" });
  const [bankFetched, setBankFetched] = useState(false);
  const [fetchedBankName, setFetchedBankName] = useState("");

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await getInvoiceById(invoiceId);
        setInvoice(res.invoice);
      } catch (err) { setFormError(err.message); }
      finally { setLoading(false); }
    };
    fetchInvoice();
  }, [invoiceId]);

  const handleChange = (e) => {
    setBankData({ ...bankData, [e.target.name]: e.target.value });
    setFormError("");
  };

  const handleFetchBank = () => {
    if (!bankData.ifscCode || bankData.ifscCode.length < 11) return setFormError("Enter valid 11-char IFSC");
    setFetchedBankName("HDFC Bank — Surat Main Branch");
    setBankFetched(true);
    setBankData({ ...bankData, bankName: "HDFC Bank" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { bankAccount, confirmAccount, ifscCode } = bankData;
    if (!bankAccount || !confirmAccount || !ifscCode) return setFormError("All fields required");
    if (bankAccount !== confirmAccount) return setFormError("Accounts do not match");
    
    setSubmitting(true);
    try {
      const res = await initiatePayout({ invoiceId, bankAccount, ifscCode: ifscCode.toUpperCase(), bankName: bankData.bankName });
      navigate("/payouts/success", { state: { payout: res.payout, invoice } });
    } catch (err) { setFormError(err.message); }
    finally { setSubmitting(false); }
  };

  if (loading) return <div className="payout-loading"><div className="spinner"></div><p>Loading invoice...</p></div>;

  return (
    <div className="payout-initiate-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(`/invoices/${invoiceId}`)}>← Back</button>
        <h1>Confirm & Receive Payment</h1>
      </div>
      <div className="payout-layout">
        <PayoutForm 
          bankData={bankData} handleChange={handleChange} handleFetchBank={handleFetchBank}
          bankFetched={bankFetched} fetchedBankName={fetchedBankName} setBankData={setBankData}
          handleSubmit={handleSubmit} submitting={submitting} formError={formError}
        />
        <PayoutSummary invoice={invoice} />
      </div>
    </div>
  );
};

export default PayoutInitiate;