import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import CoursesPage from "./pages/CoursesPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CoursesPage />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App
