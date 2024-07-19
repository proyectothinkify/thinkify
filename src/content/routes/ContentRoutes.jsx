import { Navigate, Route, Routes } from "react-router-dom"
import { ContentPage} from "../pages/ContentPage"


export const ContentRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ <ContentPage /> } />

        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  )
}