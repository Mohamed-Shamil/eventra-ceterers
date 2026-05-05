import { useState, useRef, useEffect } from "react";
import { getAppData } from "./constants/DataManager";
import QuotationForm from "./components/QuotationForm";
import CustomerQuotation from "./components/CustomerQuotation";
import TeamSheet from "./components/TeamSheet";
import AdminPanel from "./components/AdminPanel";
import logo from "./assets/logo.png";

function App() {
  const [step, setStep] = useState(0); // 0=form, 1=customer, 2=team, 3=admin
  const [appData, setAppData] = useState(getAppData());
  const [branch, setBranch] = useState(0);
  const [evt, setEvt] = useState({
    customerName: "",
    venue: "",
    date: "",
    guestCount: "",
    counterType: "",
    stage: "",
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

  // Update counterType and stage defaults when appData loads
  useEffect(() => {
    setEvt(p => ({
      ...p,
      counterType: appData.counterTypes?.[0] || "Standard",
      stage: appData.stagePackages?.[0] || "Standard"
    }));
  }, [appData]);

  // Refresh data when entering views
  useEffect(() => {
    if (step !== 3) {
      setAppData(getAppData());
    }
  }, [step]);

  const handlePrint = () => {
    window.print();
  };

  const resetForm = () => {
    if (window.confirm("Are you sure you want to clear all current selection?")) {
      setEvt({
        customerName: "", venue: "", date: "", guestCount: "",
        counterType: appData.counterTypes?.[0] || "Standard", 
        stage: appData.stagePackages?.[0] || "Standard",
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
        <div className="nav-brand" onClick={() => setStep(0)} style={{ cursor: "pointer" }}>
          <img src={logo} alt="Eventra Logo" className="nav-logo" />
          <span className="nav-title brand-font">EVENTRA EVENTS</span>
        </div>
        <div className="nav-actions">
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
          <button 
            className={`btn ${step === 3 ? "btn-secondary" : "btn-outline"}`} 
            onClick={() => setStep(3)}
            style={{ color: step === 3 ? "var(--primary)" : "white", borderColor: "var(--secondary)", borderStyle: "dashed" }}
          >
            Admin
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
            appData={appData}
            onGenerateQuote={() => setStep(1)}
            onGenerateTeam={() => setStep(2)}
            onReset={resetForm}
          />
        )}
        {step === 1 && (
          <CustomerQuotation 
            evt={evt} 
            menuItems={menuItems} 
            branch={appData.branches[branch] || appData.branches[0]} 
            onBack={() => setStep(0)}
            onPrint={handlePrint}
          />
        )}
        {step === 2 && (
          <TeamSheet 
            evt={evt} 
            menuItems={menuItems} 
            branch={appData.branches[branch] || appData.branches[0]} 
            onBack={() => setStep(0)}
            onPrint={handlePrint}
          />
        )}
        {step === 3 && (
          <AdminPanel onBack={() => setStep(0)} />
        )}
      </main>

      <footer className="no-print" style={{ textAlign: "center", padding: "2rem", color: "var(--muted)", fontSize: "0.9rem" }}>
        &copy; {new Date().getFullYear()} Eventra Events & Catering. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
