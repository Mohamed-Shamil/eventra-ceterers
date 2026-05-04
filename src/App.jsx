import { useState, useRef } from "react";
import { MENU, C, BRANCHES, COUNTER_TYPES, STAGE_PACKAGES, SETTINGS } from "./constants/MenuData";
import QuotationForm from "./components/QuotationForm";
import CustomerQuotation from "./components/CustomerQuotation";
import TeamSheet from "./components/TeamSheet";
import logo from "./assets/logo.png";

function App() {
  const [step, setStep] = useState(0); // 0=form, 1=customer, 2=team
  const [branch, setBranch] = useState(0);
  const [evt, setEvt] = useState({
    customerName: "",
    venue: "",
    date: "",
    guestCount: "",
    counterType: COUNTER_TYPES[0],
    stage: STAGE_PACKAGES[0],
    boysNeeded: false,
    captainCount: 0,
    supervisorCount: 0,
    boysCount: 0,
    totalRate: "",
    cashAdvance: "",
    extras: "",
    specialNote: "",
    settings: [],
  });
  const [menuItems, setMenuItems] = useState({});

  const handlePrint = () => {
    window.print();
  };

  const resetForm = () => {
    if (window.confirm("Are you sure you want to clear all data?")) {
      setEvt({
        customerName: "", venue: "", date: "", guestCount: "",
        counterType: COUNTER_TYPES[0], stage: STAGE_PACKAGES[0],
        boysNeeded: false, captainCount: 0, supervisorCount: 0, boysCount: 0,
        totalRate: "", cashAdvance: "", extras: "",
        specialNote: "", settings: [],
      });
      setMenuItems({});
      setStep(0);
    }
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="nav no-print">
        <div className="nav-brand">
          <img src={logo} alt="Eventra Logo" className="nav-logo" />
          <span className="nav-title brand-font">EVENTRA EVENTS</span>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button 
            className={`btn ${step === 0 ? "btn-secondary" : "btn-outline"}`} 
            onClick={() => setStep(0)}
            style={{ color: step === 0 ? "var(--primary)" : "white", borderColor: "white" }}
          >
            Planner
          </button>
          <button 
            className={`btn ${step === 1 ? "btn-secondary" : "btn-outline"}`} 
            onClick={() => setStep(1)}
            style={{ color: step === 1 ? "var(--primary)" : "white", borderColor: "white" }}
          >
            Quotation
          </button>
          <button 
            className={`btn ${step === 2 ? "btn-secondary" : "btn-outline"}`} 
            onClick={() => setStep(2)}
            style={{ color: step === 2 ? "var(--primary)" : "white", borderColor: "white" }}
          >
            Team Sheet
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="container">
        {step === 0 && (
          <QuotationForm 
            evt={evt} 
            setEvt={setEvt} 
            menuItems={menuItems} 
            setMenuItems={setMenuItems} 
            branch={branch} 
            setBranch={setBranch}
            onGenerateQuote={() => setStep(1)}
            onGenerateTeam={() => setStep(2)}
            onReset={resetForm}
          />
        )}
        {step === 1 && (
          <CustomerQuotation 
            evt={evt} 
            menuItems={menuItems} 
            branch={BRANCHES[branch]} 
            onBack={() => setStep(0)}
            onPrint={handlePrint}
          />
        )}
        {step === 2 && (
          <TeamSheet 
            evt={evt} 
            menuItems={menuItems} 
            branch={BRANCHES[branch]} 
            onBack={() => setStep(0)}
            onPrint={handlePrint}
          />
        )}
      </main>

      <footer className="no-print" style={{ textAlign: "center", padding: "2rem", color: "var(--muted)", fontSize: "0.9rem" }}>
        &copy; {new Date().getFullYear()} Eventra Events & Catering. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
