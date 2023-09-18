import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Works from "./pages/Works";
import Portraits from "./pages/Portraits";
import Title from "./components/Title";
import AboutMes from "./pages/AboutMes";
import Edit from "./pages/Edit"
import Footer from "./components/Footer";
import { CustomTokenContextProvider } from "./components/Contexts/TokenContext";
import { CustomAlertContextProvider } from "./components/Contexts/AlertContext";
import Drawings from "./pages/Drawings";
import Alert from "./components/Alert";

function App() {
document.title = "Alba Troiteiro";

  return (
    <BrowserRouter>
    <CustomTokenContextProvider>
    <CustomAlertContextProvider>
      <Header></Header>
      <Title></Title>
      <main>
        <Routes>
          <Route path="/" element={<Works />} />
          <Route path="/Portraits" element={<Portraits />} />
          <Route path="/Drawings" element={<Drawings />} />
          <Route path="/AboutMe" element={<AboutMes/>} />
          <Route path="/Edit" element={<Edit />} />
          <Route path="*" element={<Works />} />
        </Routes>
      </main>
      <Alert></Alert>
      <Footer></Footer>
      </CustomAlertContextProvider>
      </CustomTokenContextProvider>
    </BrowserRouter>
  );
}

export default App;
