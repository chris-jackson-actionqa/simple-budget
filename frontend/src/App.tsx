import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BillsPage from "./pages/BillsPage";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="bills" element={<BillsPage />} />
      </Routes>
    </>
  );
}

export default App;
