import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Works from "./pages/Works";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <main>
        <Routes>
          <Route path="/" element={<Works />} />
          <Route path="*" element={<Works />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
