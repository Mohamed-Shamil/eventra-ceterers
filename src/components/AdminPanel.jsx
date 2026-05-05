import { useState, useEffect } from "react";
import { getAppData, saveAppData } from "../constants/DataManager";
import Modal from "./Modal";

export default function AdminPanel({ onBack }) {
  const [data, setData] = useState(getAppData());
  const [activeTab, setActiveTab] = useState("menu");
  const [newCat, setNewCat] = useState("");
  const [newBranch, setNewBranch] = useState({ name: "", addr: "", phone: "" });
  const [newOption, setNewOption] = useState("");

  // Modal State
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    value: "",
    placeholder: "",
    onConfirm: null
  });

  useEffect(() => {
    saveAppData(data);
  }, [data]);

  const openModal = (title, initialValue, placeholder, onConfirm) => {
    setModal({
      isOpen: true,
      title,
      value: initialValue,
      placeholder,
      onConfirm: (val) => {
        onConfirm(val);
        closeModal();
      }
    });
  };

  const closeModal = () => {
    setModal(prev => ({ ...prev, isOpen: false, value: "" }));
  };

  // --- Category Actions ---
  const addCategory = () => {
    if (!newCat) return;
    const trimmed = newCat.trim();
    if (data.menu[trimmed]) return alert("Category already exists");
    setData(prev => ({
      ...prev,
      menu: { ...prev.menu, [trimmed]: { "Default": [] } }
    }));
    setNewCat("");
  };

  const renameCategory = (oldName) => {
    openModal("Rename Category", oldName, "Category name", (newName) => {
      const trimmed = newName.trim();
      if (!trimmed || trimmed === oldName) return;
      if (data.menu[trimmed]) return alert("Category name already exists");
      
      setData(prev => {
        const newMenu = { ...prev.menu };
        newMenu[trimmed] = newMenu[oldName];
        delete newMenu[oldName];
        return { ...prev, menu: newMenu };
      });
    });
  };

  const deleteCategory = (cat) => {
    if (!window.confirm(`Delete category "${cat}" and all its contents?`)) return;
    setData(prev => {
      const newMenu = { ...prev.menu };
      delete newMenu[cat];
      return { ...prev, menu: newMenu };
    });
  };

  // --- Subcategory Actions ---
  const addSubcategory = (cat) => {
    openModal("Add Subcategory", "", "e.g. Seafood, Chicken...", (subName) => {
      const trimmed = subName.trim();
      if (!trimmed) return;
      if (data.menu[cat][trimmed]) return alert("Subcategory already exists");
      
      setData(prev => {
        const newMenu = { ...prev.menu };
        newMenu[cat] = { ...newMenu[cat], [trimmed]: [] };
        return { ...prev, menu: newMenu };
      });
    });
  };

  const renameSubcategory = (cat, oldSub) => {
    openModal("Rename Subcategory", oldSub, "Subcategory name", (newSub) => {
      const trimmed = newSub.trim();
      if (!trimmed || trimmed === oldSub) return;
      if (data.menu[cat][trimmed]) return alert("Subcategory already exists");

      setData(prev => {
        const newMenu = { ...prev.menu };
        const catData = { ...newMenu[cat] };
        catData[trimmed] = catData[oldSub];
        delete catData[oldSub];
        newMenu[cat] = catData;
        return { ...prev, menu: newMenu };
      });
    });
  };

  const deleteSubcategory = (cat, sub) => {
    if (!window.confirm(`Delete subcategory "${sub}"?`)) return;
    setData(prev => {
      const newMenu = { ...prev.menu };
      const catData = { ...newMenu[cat] };
      delete catData[sub];
      newMenu[cat] = catData;
      return { ...prev, menu: newMenu };
    });
  };

  // --- Item Actions ---
  const addItem = (cat, sub) => {
    openModal(`Add Item to ${sub}`, "", "Item name...", (itemName) => {
      const trimmed = itemName.trim();
      if (!trimmed) return;
      
      setData(prev => {
        const newMenu = { ...prev.menu };
        const catData = { ...newMenu[cat] };
        const subData = [...(catData[sub] || [])];
        
        if (subData.includes(trimmed)) {
          alert("Item already exists in this section");
          return prev;
        }
        
        catData[sub] = [...subData, trimmed];
        newMenu[cat] = catData;
        return { ...prev, menu: newMenu };
      });
    });
  };

  const editItem = (cat, sub, oldItem) => {
    openModal("Edit Item", oldItem, "Item name...", (newItemName) => {
      const trimmed = newItemName.trim();
      if (!trimmed || trimmed === oldItem) return;

      setData(prev => {
        const newMenu = { ...prev.menu };
        const catData = { ...newMenu[cat] };
        catData[sub] = catData[sub].map(i => i === oldItem ? trimmed : i);
        newMenu[cat] = catData;
        return { ...prev, menu: newMenu };
      });
    });
  };

  const deleteItem = (cat, sub, item) => {
    setData(prev => {
      const newMenu = { ...prev.menu };
      const catData = { ...newMenu[cat] };
      catData[sub] = catData[sub].filter(i => i !== item);
      newMenu[cat] = catData;
      return { ...prev, menu: newMenu };
    });
  };

  // --- Branch Actions ---
  const addBranch = () => {
    if (!newBranch.name) return;
    setData(prev => ({
      ...prev,
      branches: [...prev.branches, newBranch]
    }));
    setNewBranch({ name: "", addr: "", phone: "" });
  };

  const deleteBranch = (index) => {
    setData(prev => ({
      ...prev,
      branches: prev.branches.filter((_, i) => i !== index)
    }));
  };

  // --- Global Options ---
  const addGlobalOption = (key) => {
    if (!newOption) return;
    const trimmed = newOption.trim();
    setData(prev => ({
      ...prev,
      [key]: [...(prev[key] || []), trimmed]
    }));
    setNewOption("");
  };

  const deleteGlobalOption = (key, val) => {
    setData(prev => ({
      ...prev,
      [key]: prev[key].filter(i => i !== val)
    }));
  };

  return (
    <div className="admin-panel">
      <Modal 
        isOpen={modal.isOpen}
        title={modal.title}
        value={modal.value}
        placeholder={modal.placeholder}
        onChange={(val) => setModal(prev => ({ ...prev, value: val }))}
        onConfirm={() => modal.onConfirm(modal.value)}
        onCancel={closeModal}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button className="btn btn-outline" onClick={onBack} style={{ padding: "0.5rem" }}>← Back</button>
          <h1 className="brand-font" style={{ color: "var(--primary)", margin: 0 }}>Admin Dashboard</h1>
        </div>
        <div className="nav-actions">
          <button className={`btn ${activeTab === "menu" ? "btn-primary" : "btn-outline"}`} onClick={() => setActiveTab("menu")}>Menu</button>
          <button className={`btn ${activeTab === "branches" ? "btn-primary" : "btn-outline"}`} onClick={() => setActiveTab("branches")}>Branches</button>
          <button className={`btn ${activeTab === "settings" ? "btn-primary" : "btn-outline"}`} onClick={() => setActiveTab("settings")}>Styles & Options</button>
          <button className="btn" style={{ color: "var(--error)", fontSize: "0.7rem", border: "1px dashed var(--error)" }} onClick={() => {
            if(window.confirm("This will delete ALL custom data and restore defaults. Proceed?")) {
              localStorage.removeItem("eventra_data");
              window.location.reload();
            }
          }}>Reset All</button>
        </div>
      </div>

      {activeTab === "menu" && (
        <div className="grid">
          <div className="card">
            <h3 className="label">Add New Category</h3>
            <div style={{ display: "flex", gap: "1rem" }}>
              <input value={newCat} onChange={e => setNewCat(e.target.value)} placeholder="e.g. Seafood" onKeyPress={e => e.key === 'Enter' && addCategory()} />
              <button className="btn btn-primary" onClick={addCategory}>Add Category</button>
            </div>
          </div>

          <div className="grid">
            {Object.entries(data.menu).map(([cat, subs]) => (
              <div key={cat} className="card" style={{ position: "relative" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "2px solid var(--light)", paddingBottom: "0.8rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <h3 className="brand-font" style={{ color: "var(--primary)", margin: 0 }}>{cat}</h3>
                    <button className="btn btn-outline" style={{ padding: "0.2rem 0.5rem", fontSize: "0.7rem" }} onClick={() => renameCategory(cat)}>Edit Name</button>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button className="btn btn-secondary" style={{ padding: "0.3rem 0.8rem", fontSize: "0.8rem" }} onClick={() => addSubcategory(cat)}>+ Subcategory</button>
                    <button className="btn" style={{ color: "var(--error)", padding: "0.3rem", fontSize: "0.8rem" }} onClick={() => deleteCategory(cat)}>Delete Cat</button>
                  </div>
                </div>
                
                {Object.entries(subs).map(([sub, items]) => (
                  <div key={sub} style={{ marginBottom: "1.5rem", padding: "1rem", background: "#fcfcfc", borderRadius: "8px", border: "1px solid #f0f0f0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                        <span style={{ fontWeight: 800, fontSize: "0.85rem", color: "var(--primary)", textTransform: "uppercase", letterSpacing: "1px" }}>{sub}</span>
                        <button className="btn" style={{ padding: "0.1rem 0.3rem", fontSize: "0.65rem", color: "var(--muted)" }} onClick={() => renameSubcategory(cat, sub)}>Rename</button>
                        <button className="btn" style={{ padding: "0.1rem 0.3rem", fontSize: "0.65rem", color: "var(--error)" }} onClick={() => deleteSubcategory(cat, sub)}>Delete</button>
                      </div>
                      <button className="btn btn-primary" style={{ padding: "0.3rem 1rem", fontSize: "0.75rem" }} onClick={() => addItem(cat, sub)}>+ Add Item</button>
                    </div>
                    
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem" }}>
                      {items.map(item => (
                        <div key={item} className="badge" style={{ 
                          display: "flex", 
                          alignItems: "center", 
                          gap: "0.6rem", 
                          padding: "0.5rem 1rem",
                          background: "white",
                          border: "1px solid var(--border)",
                          borderRadius: "20px"
                        }}>
                          <span style={{ fontWeight: 600, color: "#333" }}>{item}</span>
                          <div style={{ display: "flex", gap: "0.4rem", borderLeft: "1px solid #eee", paddingLeft: "0.5rem" }}>
                            <span title="Edit" style={{ cursor: "pointer", color: "var(--primary)", fontSize: "0.8rem" }} onClick={() => editItem(cat, sub, item)}>✎</span>
                            <span title="Delete" style={{ cursor: "pointer", color: "var(--error)", fontSize: "1.1rem", lineHeight: "1" }} onClick={() => deleteItem(cat, sub, item)}>×</span>
                          </div>
                        </div>
                      ))}
                      {items.length === 0 && <div style={{ fontSize: "0.8rem", color: "#999", fontStyle: "italic" }}>No items in this section</div>}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "branches" && (
        <div className="grid">
          <div className="card">
            <h3 className="label">Add New Branch</h3>
            <div className="grid grid-3">
              <input value={newBranch.name} onChange={e => setNewBranch(p => ({ ...p, name: e.target.value }))} placeholder="Branch Name" />
              <input value={newBranch.addr} onChange={e => setNewBranch(p => ({ ...p, addr: e.target.value }))} placeholder="Address" />
              <input value={newBranch.phone} onChange={e => setNewBranch(p => ({ ...p, phone: e.target.value }))} placeholder="Phone" />
            </div>
            <button className="btn btn-primary" style={{ marginTop: "1rem" }} onClick={addBranch}>Add Branch</button>
          </div>

          <div className="grid grid-2">
            {data.branches.map((b, i) => (
              <div key={i} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700, color: "var(--primary)" }}>{b.name}</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>{b.addr}</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>{b.phone}</div>
                </div>
                <button className="btn" style={{ color: "var(--error)" }} onClick={() => deleteBranch(i)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="grid grid-3">
          {[
            { title: "Service Styles", key: "counterTypes" },
            { title: "Stage Packages", key: "stagePackages" },
            { title: "Additional Settings", key: "settings" }
          ].map(section => (
            <div key={section.key} className="card">
              <h3 className="label">{section.title}</h3>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                <input 
                  value={newOption} 
                  onChange={e => setNewOption(e.target.value)} 
                  placeholder="New option..." 
                  onKeyPress={e => e.key === "Enter" && addGlobalOption(section.key)}
                />
                <button className="btn btn-primary" onClick={() => addGlobalOption(section.key)}>Add</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {(data[section.key] || []).map(opt => (
                  <div key={opt} className="admin-list-item" style={{ fontSize: "0.9rem" }}>
                    {opt}
                    <span style={{ cursor: "pointer", color: "var(--error)" }} onClick={() => deleteGlobalOption(section.key, opt)}>×</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
