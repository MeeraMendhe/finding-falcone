import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Play from "./container/Play/Play";
import Story from "./components/Story/Story";
import Result from "./components/Result/Result";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Story />} />
          <Route path="/play" element={<Play />} />
          <Route path="/result" element={<Result />} />
          <Route path="*" element={<Story />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
