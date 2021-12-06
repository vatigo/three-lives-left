//components
import Home from "./pages/Home";
import GlobalStyles from "./components/GlobalStyles";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import background from "./img/bg_tunnel.jpg";

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <div
        className="background-image"
        style={{ backgroundImage: `url(${background})` }}
      ></div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/game/:id" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
