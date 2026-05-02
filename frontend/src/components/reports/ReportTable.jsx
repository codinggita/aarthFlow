const ReportTable = () => {
  const reports = [
    { name: "Monthly_Portfolio_Audit_Jan2024", sub: "System generated recurring report", date: "Feb 01, 2024 • 09:00 AM", format: "PDF", type: "pdf" },
    { name: "Q4_Revenue_Breakdown_Detailed", sub: "Requested by Alex Rivera", date: "Jan 15, 2024 • 02:45 PM", format: "EXCEL", type: "xls" },
    { name: "Risk_Exposure_Analysis_Apex_Ventures", sub: "Counterparty concentration deep-dive", date: "Jan 12, 2024 • 11:30 AM", format: "PDF", type: "pdf" },
  ];

  return (
    <div className="generated-reports-section">
      <div className="section-header-v2">
        <h3>Generated Reports</h3>
        <button className="text-link">Generate New Report ↗</button>
      </div>
      <table className="reports-table-v2">
        <thead>
          <tr>
            <th>REPORT NAME</th>
            <th>GENERATED ON</th>
            <th>FORMAT</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r, i) => (
            <tr key={i}>
              <td>
                <div className="report-name-cell">
                  <span className={`doc-icon ${r.type}`}>📄</span>
                  <div>
                    <strong>{r.name}</strong>
                    <span>{r.sub}</span>
                  </div>
                </div>
              </td>
              <td>{r.date}</td>
              <td><span className={`format-tag ${r.type}`}>{r.format}</span></td>
              <td><button className="btn-download">📥</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
