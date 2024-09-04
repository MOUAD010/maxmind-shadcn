import Form from "./components/main/Form";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/main/Login";
import ProtectedRoutes from "./utils/ProtectedRoutes";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<ProtectedRoutes />}>
            <Route element={<Form />} path="/" />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
