import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./Pages/SignUpPage";
import { useState } from "react";
import { UserContext } from "./Context";
import LoginPage from "./Pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "./Pages/HomePage";

function App() {
  
  const [userData, setUserData] = useState();

  return (
    <UserContext.Provider value={{userData, setUserData}}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute> <HomePage/> </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
