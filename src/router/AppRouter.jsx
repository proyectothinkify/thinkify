import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { ContentRoutes } from '../content/routes/ContentRoutes';

import { CheckingAuth } from '../ui';

import { useCheckAuth } from '../hooks/useCheckAuth';



export const AppRouter = () => {
  const status = useCheckAuth()
  

  if (status === 'checking') {
    return (<CheckingAuth/>)
  }
  
  return (
    <Routes>
      {status === 'authenticated'
        ? <Route path="/*" element={<ContentRoutes />} />
        : <Route path="auth/*" element={<AuthRoutes />} />
      }
      <Route path='/*' element={<Navigate to='auth/login'/>}/>
        
        

    </Routes>
  )
}
