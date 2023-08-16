import "./App.css";

import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Login from "./Components/Auth/Login/Login";
import Signup from "./Components/Auth/Signup/Signup";
import Profile from "./Components/Profile/Profile";

import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

import ToastMsg from "./Components/ToastMsg/ToastMsg";
import LoginExpiredModal from "./Components/Modal/LoginExpiredModal";
import { lazy, Suspense } from "react";
import LoadingCard from "./Components/LoadingCard/LoadingCard";

const Home = lazy(() => import("./Components/Home/Home.jsx"));

function App() {
  return (
    <>
      <Header />
      <ToastMsg />
      <LoginExpiredModal />

      <Routes>
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingCard />}>
              <Home />
            </Suspense>
          }
        />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
