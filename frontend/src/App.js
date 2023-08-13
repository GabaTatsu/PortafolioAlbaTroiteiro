import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Works from "./pages/Works";
import Portraits from "./pages/Portraits";
import Title from "./components/Title";
import AboutMe from "./pages/AboutMe";
import Contact from "./pages/Contact";
import Edit from "./pages/Edit"
import Footer from "./components/Footer";
import { CustomTokenContextProvider } from "./components/Contexts/TokenContext";

function App() {
  return (
    <BrowserRouter>
    <CustomTokenContextProvider>
      <Header></Header>
      <Title></Title>
      <main>
        <Routes>
          <Route path="/" element={<Works />} />
          <Route path="/Portraits" element={<Portraits />} />
          <Route path="/AboutMe" element={<AboutMe/>} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Edit" element={<Edit />} />
          <Route path="*" element={<Works />} />
        </Routes>
      </main>
      <Footer></Footer>
      </CustomTokenContextProvider>
    </BrowserRouter>
  );
}

export default App;
