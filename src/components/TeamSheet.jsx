export default function TeamSheet({ evt, menuItems, branch, onBack, onPrint }) {
  const formatDate = (d) => d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "N/A";
  
  const menuList = Object.entries(menuItems);

  return (
    <div className="teamsheet-preview">
      <div className="no-print" style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
        <button className="btn btn-outline" onClick={onBack}>← Back to Planner</button>
        <button className="btn btn-primary" onClick={onPrint}>Print Team Sheet</button>
      </div>

      <div className="card print-sheet" style={{ padding: "2rem", border: "2px dashed #1A3636" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", borderBottom: "2px solid #eee", paddingBottom: "1rem" }}>
          <div>
            <h2 className="brand-font" style={{ color: "#1A3636" }}>EVENTRA INTERNAL TEAM SHEET</h2>
            <div style={{ fontSize: "0.8rem", color: "#666" }}>Generated on {new Date().toLocaleString()}</div>
          </div>
          <div style={{ background: "#1A3636", color: "white", padding: "0.5rem 1rem", borderRadius: "4px", fontWeight: "700" }}>CONFIDENTIAL</div>
        </div>

        <div className="grid grid-4" style={{ marginBottom: "2rem" }}>
          {[
            ["CLIENT", evt.customerName],
            ["DATE", formatDate(evt.date)],
            ["VENUE", evt.venue],
            ["PAX", evt.guestCount],
            ["SERVICE", evt.counterType],
            ["BRANCH", branch.name],
            ["STATUS", "Pending Setup"],
            ["COORDINATOR", "Admin"],
          ].map(([label, val]) => (
            <div key={label} style={{ background: "#f9f9f9", padding: "0.8rem", borderRadius: "4px" }}>
              <div style={{ fontSize: "0.6rem", fontWeight: "800", color: "#999" }}>{label}</div>
              <div style={{ fontSize: "0.9rem", fontWeight: "700" }}>{val || "—"}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-2">
          <div>
            <h4 style={{ borderLeft: "4px solid #D6BD98", paddingLeft: "0.5rem", marginBottom: "1rem" }}>FOOD PREPARATION LIST</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {menuList.length > 0 ? menuList.map(([item, meta]) => (
                <div key={item} style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem", borderBottom: "1px solid #eee" }}>
                  <span>{item}</span>
                  <span style={{ fontWeight: "700" }}>{meta.qty} {meta.unit}</span>
                </div>
              )) : <div style={{ color: "#999" }}>No menu items selected.</div>}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div>
              <h4 style={{ borderLeft: "4px solid #D6BD98", paddingLeft: "0.5rem", marginBottom: "1rem" }}>STAFF ALLOCATION</h4>
              <div style={{ background: "#f0f4f4", padding: "1rem", borderRadius: "8px" }}>
                {!evt.boysNeeded ? "No specialized staff requested." : (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>Captains: <strong>{evt.captainCount}</strong></div>
                    <div>Supervisors: <strong>{evt.supervisorCount}</strong></div>
                    <div>Waiters: <strong>{evt.boysCount}</strong></div>
                    <div>Total: <strong>{parseInt(evt.captainCount || 0) + parseInt(evt.supervisorCount || 0) + parseInt(evt.boysCount || 0)}</strong></div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 style={{ borderLeft: "4px solid #D6BD98", paddingLeft: "0.5rem", marginBottom: "1rem" }}>EQUIPMENT & SETTINGS</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {evt.settings.map(s => (
                  <span key={s} style={{ fontSize: "0.7rem", border: "1px solid #ccc", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>[ ] {s}</span>
                ))}
              </div>
            </div>

            {evt.specialNote && (
              <div>
                <h4 style={{ borderLeft: "4px solid #D6BD98", paddingLeft: "0.5rem", marginBottom: "0.5rem" }}>SPECIAL INSTRUCTIONS</h4>
                <div style={{ fontSize: "0.85rem", background: "#fffbe6", padding: "0.8rem", border: "1px solid #ffe58f", borderRadius: "4px" }}>
                  {evt.specialNote}
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: "3rem", borderTop: "1px solid #eee", paddingTop: "2rem", display: "flex", justifyContent: "space-between" }}>
          <div style={{ textAlign: "center", width: "150px" }}>
            <div style={{ height: "60px", borderBottom: "1px solid #333" }}></div>
            <div style={{ fontSize: "0.7rem", marginTop: "0.5rem" }}>Kitchen Manager</div>
          </div>
          <div style={{ textAlign: "center", width: "150px" }}>
            <div style={{ height: "60px", borderBottom: "1px solid #333" }}></div>
            <div style={{ fontSize: "0.7rem", marginTop: "0.5rem" }}>Service Captain</div>
          </div>
          <div style={{ textAlign: "center", width: "150px" }}>
            <div style={{ height: "60px", borderBottom: "1px solid #333" }}></div>
            <div style={{ fontSize: "0.7rem", marginTop: "0.5rem" }}>Operations Head</div>
          </div>
        </div>
      </div>
    </div>
  );
}
