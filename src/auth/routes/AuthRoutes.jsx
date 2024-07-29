import { Navigate, Route, Routes } from 'react-router-dom';
import { EnterNewPasswordPage, GetNewPasswordPage, LoginPage, RegisterPage } from '../pages';


export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path="login" element={ <LoginPage /> } />
        <Route path="register" element={ <RegisterPage /> } />
        <Route path="restorepasswordverification" element={ <GetNewPasswordPage/> } />
        <Route path="restorepassword" element={ <EnterNewPasswordPage /> } />

        <Route path='/*' element={ <Navigate to="/auth/login" /> } />
    </Routes>
  )
}