import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import CoursesPage from "./pages/CoursesPage"
import FavoritesPage from "./pages/FavoritesPage"
import DetailCoursePage from "./pages/DetailCoursePage"
import { CourseProvider } from "./context/CourseContext"

function App() {
  return (
    <CourseProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/detail-course/:slug" element={<DetailCoursePage />}/>
            <Route path="/favorites" element={<FavoritesPage />}/>
            <Route path="/" element={<CoursesPage />}/>
          </Routes>
        </div>
      </Router>
    </CourseProvider>
    
  );
}

export default App
