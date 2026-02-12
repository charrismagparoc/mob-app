// App.jsx — Root component with navigation state management (Task 3 - Interaction)
import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Residents from "./pages/Residents";
import Segments from "./pages/Segments";
import Predictions from "./pages/Predictions";
import "./index.css";

function App() {
  // Navigation state — clicking nav items updates the visible page (Task 3 interaction)
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":   return <Dashboard />;
      case "residents":   return <Residents />;
      case "segments":    return <Segments />;
      case "predictions": return <Predictions />;
      default:            return <Dashboard />;
    }
  };

  return (
    <div className="app-layout">
      <Navbar activePage={activePage} onNavigate={setActivePage} />
      <div className="app-main">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;