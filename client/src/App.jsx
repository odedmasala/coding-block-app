import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
// Pages
import Lobby from "./pages/Lobby";
import CodeBlock from "./pages/CodeBlock";
import Template from "./pages/Template"
import "./styles/App.css"
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Lobby />} />
          <Route path='room/:name' element={<Template />} />
        </Routes>
      </Router>
    </>
  )
}

export default App