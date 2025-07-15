import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import HomePage from "./pages/HomePage"
import CoursesPage from "./pages/CoursesPage"

import { CourseProvider } from "./context/CourseContext";

function App() {
  return (
    <CourseProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/favourite" element={<HomePage />}/>
            <Route path="/" element={<CoursesPage />}/>
          </Routes>
        </div>
      </Router>
    </CourseProvider>
    
  );
}

export default App
