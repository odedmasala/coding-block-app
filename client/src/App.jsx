import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
// Pages
import Lobby from "./pages/lobby/Lobby";
import CodeBlock from "./pages/codeBlock/CodeBlock";
import "./styles/App.css"
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Lobby />} />
          <Route path='room/:name' element={<CodeBlock />} />
        </Routes>
      </Router>
    </>
  )
}

export default App