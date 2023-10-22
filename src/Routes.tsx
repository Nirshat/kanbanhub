import { Route, Routes } from "react-router-dom";
import ProjectsList from "./pages/ProjectsList";
import Project from "./pages/Project";
import PageNotFound from "./components/PageNotFound";


const AppRoutes = () => {
  
  return (
    <Routes>
      <Route path="/">
        <Route index element={<ProjectsList/>} />
        <Route path="/project/:param" element={<Project/>} />
        <Route path="*" element={<PageNotFound/>} />
      </Route>
    </Routes>
  )
}

export default AppRoutes