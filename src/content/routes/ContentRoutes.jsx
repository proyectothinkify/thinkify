import { Navigate, Route, Routes } from "react-router-dom"
import { MiPerfil, Notificaciones, ContentPage, MisCursos, MisObjetivos, MisAlumnos, CrearCurso, Otro } from "../pages"
import { EmployeeLayout } from "../../ui/EmployeeLayout"


export const ContentRoutes = () => {
  return (
    <EmployeeLayout>
      <Routes>
        <Route path="/sandbox" element={ <ContentPage /> } />

        <Route path="/*" element={ <Navigate to="/sandbox" /> } />
        
        <Route path="miperfil" element={ <MiPerfil/> } />
        <Route path="notificaciones" element={ <Notificaciones/> } />
        <Route path="miscursos" element={ <MisCursos /> } />
        <Route path="misobjetivos" element={ <MisObjetivos /> } />
        <Route path="crearcurso" element={ <CrearCurso/> } />
        <Route path="misalumnos" element={ <MisAlumnos/> } />
        <Route path="otro" element={ <Otro/> } />
     </Routes>
    </EmployeeLayout>
    
  )
}