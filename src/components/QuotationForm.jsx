import { useState } from "react";

export default function QuotationForm({ 
  evt, setEvt, menuItems, setMenuItems, branch, setBranch, appData, onGenerateQuote, onGenerateTeam, onReset 
}) {
  const [openCats, setOpenCats] = useState({});
  const { menu, branches, counterTypes = [], stagePackages = [], settings = [] } = appData;

  const toggleCat = (cat) => setOpenCats(p => ({ ...p, [cat]: !p[cat] }));

  const toggleItem = (item) => {
    setMenuItems(p => {
      const n = { ...p };
      if (n[item]) {
        delete n[item];
      } else {
        n[item] = { qty: "", unit: "nos" };
      }
      return n;
    });
  };

  const updateItemMeta = (item, field, val) => {
    setMenuItems(p => ({
      ...p,
      [item]: { ...p[item], [field]: val }
    }));
  };

  const toggleSetting = (s) => {
    setEvt(p => ({
      ...p,
      settings: p.settings.includes(s) 
        ? p.settings.filter(x => x !== s) 
        : [...p.settings, s]
    }));
  };

  const selectedCount = Object.keys(menuItems).length;

  return (
    <div className="quotation-form">
      <div className="mobile-stack" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", gap: "1rem" }}>
        <h1 className="brand-font" style={{ color: "var(--primary)", margin: 0 }}>Event Planner</h1>
        <button className="btn btn-outline" onClick={onReset} style={{ borderColor: "var(--error)", color: "var(--error)", padding: "0.5rem 1rem", fontSize: "0.8rem" }}>
          Clear Selection
        </button>
      </div>

      {/* Branch Selection */}
      <section className="card">
        <h3 className="label" style={{ marginBottom: "1rem" }}>Select Operating Branch</h3>
        <div className="grid grid-2">
          {branches.map((b, i) => (
            <div 
              key={b.name} 
              className={`branch-option ${branch === i ? "active" : ""}`}
              onClick={() => setBranch(i)}
              style={{
                padding: "1rem",
                borderRadius: "12px",
                border: `2px solid ${branch === i ? "var(--primary)" : "var(--border)"}`,
                background: branch === i ? "rgba(26, 54, 54, 0.05)" : "white",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              <div style={{ fontWeight: 700, color: "var(--primary)" }}>{b.name}</div>
              <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>{b.addr}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Event Details */}
      <section className="card">
        <h3 className="label">Client & Event Information</h3>
        <div className="grid grid-2">
          <div>
            <label className="label">Customer Name</label>
            <input 
              value={evt.customerName} 
              onChange={e => setEvt(p => ({ ...p, customerName: e.target.value }))} 
              placeholder="Full Name"
            />
          </div>
          <div>
            <label className="label">Venue / Location</label>
            <input 
              value={evt.venue} 
              onChange={e => setEvt(p => ({ ...p, venue: e.target.value }))} 
              placeholder="Event Venue"
            />
          </div>
          <div>
            <label className="label">Event Date</label>
            <input 
              type="date" 
              value={evt.date} 
              onChange={e => setEvt(p => ({ ...p, date: e.target.value }))} 
            />
          </div>
          <div>
            <label className="label">Guest Count (Pax)</label>
            <input 
              type="number" 
              value={evt.guestCount} 
              onChange={e => setEvt(p => ({ ...p, guestCount: e.target.value }))} 
              placeholder="Total Guests"
            />
          </div>
          <div>
            <label className="label">Service Style</label>
            <select value={evt.counterType} onChange={e => setEvt(p => ({ ...p, counterType: e.target.value }))}>
              {counterTypes.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Stage & Decor</label>
            <select value={evt.stage} onChange={e => setEvt(p => ({ ...p, stage: e.target.value }))}>
              {stagePackages.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* Menu Selection */}
      <section className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h3 className="label">Menu Selection</h3>
          <span style={{ fontSize: "0.8rem", background: "var(--primary)", color: "white", padding: "0.2rem 0.6rem", borderRadius: "10px" }}>
            {selectedCount} Items Selected
          </span>
        </div>
        
        {Object.entries(menu).map(([cat, subcats]) => (
          <div key={cat} style={{ marginBottom: "1rem" }}>
            <div 
              onClick={() => toggleCat(cat)}
              style={{
                padding: "0.8rem 1rem",
                background: "var(--primary)",
                color: "white",
                borderRadius: "8px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <span style={{ fontWeight: 600 }}>{cat}</span>
              <span>{openCats[cat] ? "−" : "+"}</span>
            </div>
            
            {openCats[cat] && (
              <div style={{ padding: "1rem", border: "1px solid var(--border)", borderTop: "none", borderRadius: "0 0 8px 8px" }}>
                {Object.entries(subcats).map(([subcat, items]) => (
                  <div key={subcat} style={{ marginBottom: "1.5rem" }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--muted)", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.5rem", borderBottom: "1px solid var(--border)" }}>
                      {subcat}
                    </div>
                    <div className="grid grid-3">
                      {items.map(item => (
                        <div key={item} style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.9rem" }}>
                            <input 
                              type="checkbox" 
                              checked={!!menuItems[item]} 
                              onChange={() => toggleItem(item)}
                              style={{ width: "auto" }}
                            />
                            {item}
                          </label>
                          {menuItems[item] && (
                            <div style={{ display: "flex", gap: "0.2rem", marginLeft: "1.5rem" }}>
                              <input 
                                style={{ padding: "0.2rem", fontSize: "0.8rem" }} 
                                placeholder="Qty" 
                                value={menuItems[item].qty}
                                onChange={e => updateItemMeta(item, "qty", e.target.value)}
                              />
                              <select 
                                style={{ padding: "0.2rem", fontSize: "0.8rem" }}
                                value={menuItems[item].unit}
                                onChange={e => updateItemMeta(item, "unit", e.target.value)}
                              >
                                {["nos","kg","ltr","plate","pcs"].map(u => <option key={u}>{u}</option>)}
                              </select>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Services & Staff */}
      <section className="card">
        <h3 className="label">Additional Services & Staff</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", marginBottom: "1.5rem" }}>
          {settings.map(s => (
            <button 
              key={s} 
              className={`btn ${evt.settings.includes(s) ? "btn-primary" : "btn-outline"}`}
              onClick={() => toggleSetting(s)}
              style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}
            >
              {evt.settings.includes(s) ? "✓ " : ""}{s}
            </button>
          ))}
        </div>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1rem" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontWeight: 600, marginBottom: "1rem" }}>
            <input 
              type="checkbox" 
              checked={evt.boysNeeded} 
              onChange={e => setEvt(p => ({ ...p, boysNeeded: e.target.checked }))}
              style={{ width: "auto" }}
            />
            Need Service Staff?
          </label>
          
          {evt.boysNeeded && (
            <div className="grid grid-3">
              <div>
                <label className="label">Captains</label>
                <input type="number" value={evt.captainCount} onChange={e => setEvt(p => ({ ...p, captainCount: e.target.value }))} />
              </div>
              <div>
                <label className="label">Supervisors</label>
                <input type="number" value={evt.supervisorCount} onChange={e => setEvt(p => ({ ...p, supervisorCount: e.target.value }))} />
              </div>
              <div>
                <label className="label">Waiters / Boys</label>
                <input type="number" value={evt.boysCount} onChange={e => setEvt(p => ({ ...p, boysCount: e.target.value }))} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Financials */}
      <section className="card">
        <h3 className="label">Financial Details</h3>
        <div className="grid grid-3">
          <div>
            <label className="label">Total Contract Rate (₹)</label>
            <input type="number" value={evt.totalRate} onChange={e => setEvt(p => ({ ...p, totalRate: e.target.value }))} placeholder="0" />
          </div>
          <div>
            <label className="label">Advance Payment (₹)</label>
            <input type="number" value={evt.cashAdvance} onChange={e => setEvt(p => ({ ...p, cashAdvance: e.target.value }))} placeholder="0" />
          </div>
          <div>
            <label className="label">Other Extras (₹)</label>
            <input type="number" value={evt.extras} onChange={e => setEvt(p => ({ ...p, extras: e.target.value }))} placeholder="0" />
          </div>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label className="label">Special Instructions / Notes</label>
          <textarea 
            rows="3" 
            value={evt.specialNote} 
            onChange={e => setEvt(p => ({ ...p, specialNote: e.target.value }))}
            placeholder="Dietary requirements, timeline notes, etc."
          />
        </div>
      </section>

      {/* Action Buttons */}
      <div className="mobile-stack" style={{ display: "flex", gap: "1rem", justifyContent: "flex-end", marginTop: "2rem" }}>
        <button className="btn btn-outline" onClick={onGenerateTeam}>Preview Team Sheet</button>
        <button className="btn btn-primary" onClick={onGenerateQuote}>Generate Quotation</button>
      </div>
    </div>
  );
}
