import { Navigate, Route, Routes } from 'react-router-dom';

import SignIn from '../pages/SignIn';

const AuthRoutes = () => (
  <Routes>
    <Route path="/" element={<SignIn />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AuthRoutes;
