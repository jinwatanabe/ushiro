import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FC } from "react";
import { Home } from "./components/pages/Home";
import { Login } from "./components/pages/Login";
import { Register } from "./components/pages/Register";

export const Router: FC = () => {
  return (
    <BrowserRouter data-theme="cupcake">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};
