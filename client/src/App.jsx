import { Route, Router, Routes } from "react-router-dom";
// Pages
import { CodeBlock, Lobby } from "./pages";
import "./styles/App.css";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Lobby />} />
          <Route path="room/:name" element={<CodeBlock />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
