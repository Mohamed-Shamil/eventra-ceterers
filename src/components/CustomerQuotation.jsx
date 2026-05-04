import logo from "../assets/logo.png";

export default function CustomerQuotation({ evt, menuItems, branch, onBack, onPrint }) {
  const formatDate = (d) => d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" }) : "TBD";
  
  const calculateBalance = () => {
    const total = parseFloat(evt.totalRate) || 0;
    const advance = parseFloat(evt.cashAdvance) || 0;
    const extras = parseFloat(evt.extras) || 0;
    return (total - advance + extras).toLocaleString("en-IN");
  };

  const menuList = Object.entries(menuItems);
  const half = Math.ceil(menuList.length / 2);
  const leftCol = menuList.slice(0, half);
  const rightCol = menuList.slice(half);

  return (
    <div className="quotation-preview">
      <div className="no-print" style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
        <button className="btn btn-outline" onClick={onBack}>← Edit Details</button>
        <button className="btn btn-primary" onClick={onPrint}>Download / Print PDF</button>
      </div>

      <div className="card print-sheet" style={{ padding: "3rem", color: "#1a1a1a", position: "relative", border: "2px solid #1A3636" }}>
        {/* Header Design */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "4px solid #1A3636", paddingBottom: "1.5rem", marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <img src={logo} alt="Logo" style={{ height: "80px", width: "80px" }} />
            <div>
              <h1 className="brand-font" style={{ fontSize: "2.5rem", lineHeight: "1", color: "#1A3636", marginBottom: "0.2rem" }}>EVENTRA</h1>
              <div style={{ letterSpacing: "4px", fontSize: "0.9rem", fontWeight: "600", color: "#D6BD98" }}>EVENTS & CATERING</div>
              <div style={{ fontStyle: "italic", fontSize: "0.8rem", marginTop: "0.4rem" }}>"Elegance in Every Detail"</div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ background: "#1A3636", color: "white", padding: "0.5rem 1.5rem", fontWeight: "700", letterSpacing: "2px", borderRadius: "4px", marginBottom: "1rem" }}>QUOTATION</div>
            <div style={{ fontSize: "0.85rem" }}>
              <div style={{ fontWeight: "700" }}>{branch.name}</div>
              <div>{branch.addr}</div>
              <div>{branch.phone}</div>
            </div>
          </div>
        </header>

        {/* Info Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "#E0E0E0", border: "1px solid #E0E0E0", borderRadius: "8px", overflow: "hidden", marginBottom: "2rem" }}>
          {[
            ["CLIENT", evt.customerName || "Valued Client"],
            ["DATE", formatDate(evt.date)],
            ["VENUE", evt.venue || "To be confirmed"],
            ["GUESTS", evt.guestCount ? `${evt.guestCount} PAX` : "—"],
            ["SERVICE", evt.counterType],
            ["THEME", evt.stage],
          ].map(([label, value]) => (
            <div key={label} style={{ background: "white", padding: "0.8rem 1.2rem", display: "flex", gap: "1rem" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: "700", color: "#757575", width: "70px" }}>{label}</span>
              <span style={{ fontSize: "0.95rem", fontWeight: "600" }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Menu Section */}
        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ background: "#1A3636", color: "white", padding: "0.5rem 1rem", fontSize: "1rem", borderRadius: "4px 4px 0 0" }}>CURATED MENU</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ background: "#f9f9f9", borderBottom: "1px solid #E0E0E0" }}>
                <th style={{ textAlign: "left", padding: "0.6rem 1rem", width: "40px" }}>#</th>
                <th style={{ textAlign: "left", padding: "0.6rem 1rem" }}>Item Description</th>
                <th style={{ textAlign: "left", padding: "0.6rem 1rem", width: "40px" }}>#</th>
                <th style={{ textAlign: "left", padding: "0.6rem 1rem" }}>Item Description</th>
              </tr>
            </thead>
            <tbody>
              {leftCol.length > 0 ? leftCol.map(([item, meta], i) => (
                <tr key={item} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td style={{ padding: "0.5rem 1rem", color: "#999" }}>{i + 1}</td>
                  <td style={{ padding: "0.5rem 1rem" }}>
                    <strong>{item}</strong>
                    {meta.qty && <span style={{ color: "#D6BD98", marginLeft: "0.5rem" }}>({meta.qty} {meta.unit})</span>}
                  </td>
                  <td style={{ padding: "0.5rem 1rem", color: "#999" }}>{rightCol[i] ? half + i + 1 : ""}</td>
                  <td style={{ padding: "0.5rem 1rem" }}>
                    {rightCol[i] && (
                      <>
                        <strong>{rightCol[i][0]}</strong>
                        {rightCol[i][1].qty && <span style={{ color: "#D6BD98", marginLeft: "0.5rem" }}>({rightCol[i][1].qty} {rightCol[i][1].unit})</span>}
                      </>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "2rem", color: "#999" }}>No items selected in the planner.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Totals and Terms */}
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "2rem" }}>
          <div style={{ border: "1px solid #D6BD98", background: "rgba(214, 189, 152, 0.05)", borderRadius: "8px", padding: "1rem" }}>
            <h4 style={{ color: "#1A3636", fontSize: "0.8rem", marginBottom: "0.5rem", borderBottom: "1px solid #D6BD98" }}>INCLUSIONS & SERVICES</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {evt.settings.map(s => <span key={s} style={{ fontSize: "0.75rem", background: "white", padding: "0.2rem 0.5rem", borderRadius: "4px", border: "1px solid #E0E0E0" }}>✓ {s}</span>)}
              {evt.boysNeeded && <span style={{ fontSize: "0.75rem", background: "white", padding: "0.2rem 0.5rem", borderRadius: "4px", border: "1px solid #E0E0E0" }}>✓ Professional Staffing</span>}
            </div>
            {evt.specialNote && (
              <div style={{ marginTop: "1rem", fontSize: "0.75rem", fontStyle: "italic" }}>
                <strong>Note:</strong> {evt.specialNote}
              </div>
            )}
          </div>
          
          <div style={{ background: "#1A3636", color: "white", borderRadius: "8px", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span>Total Contract Value</span>
              <span style={{ fontWeight: "700" }}>₹ {parseFloat(evt.totalRate || 0).toLocaleString("en-IN")}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", color: "#D6BD98" }}>
              <span>Advance Paid</span>
              <span>₹ {parseFloat(evt.cashAdvance || 0).toLocaleString("en-IN")}</span>
            </div>
            {evt.extras > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span>Additional Charges</span>
                <span>₹ {parseFloat(evt.extras).toLocaleString("en-IN")}</span>
              </div>
            )}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", marginTop: "1rem", paddingTop: "1rem", display: "flex", justifyContent: "space-between", fontSize: "1.2rem" }}>
              <span style={{ fontWeight: "700" }}>Balance Due</span>
              <span style={{ fontWeight: "900", color: "#D6BD98" }}>₹ {calculateBalance()}</span>
            </div>
          </div>
        </div>

        {/* Footer Terms */}
        <footer style={{ marginTop: "3rem", borderTop: "1px solid #E0E0E0", paddingTop: "1rem", fontSize: "0.65rem", color: "#666", textAlign: "center", lineHeight: "1.5" }}>
          <p>
            ADVANCE PAYMENT: 25% for confirmation | 50% 10 days before event | Balance on event date.
            <br />
            Waste disposal is host responsibility unless explicitly noted. Electricity and water to be provided by host.
            <br />
            Rates are based on confirmed guest count. Reductions in count may lead to rate revisions.
          </p>
          <div className="brand-font" style={{ marginTop: "1rem", fontSize: "1rem", color: "#1A3636" }}>Thank you for choosing Eventra Events</div>
        </footer>
      </div>
    </div>
  );
}
