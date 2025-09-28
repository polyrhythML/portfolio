import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home.jsx";
import Ask from "./pages/Ask.jsx";

function Nav() {
  return (
    <header className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-end">
      <nav className="flex items-center gap-4 text-sm">
        {/* Empty navigation - all social links moved to horizontal bar */}
      </nav>
    </header>
  );
}

function App() {
  return (
    <div className="min-h-screen text-slate-100">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ask" element={<Ask />} />
      </Routes>
      
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);