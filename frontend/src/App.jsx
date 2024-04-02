import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./Pages/SignUpPage";
import { useState } from "react";
import { UserContext } from "./Context";
import LoginPage from "./Pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import FriendRequestPage from "./Pages/FriendRequestPage";
import { SocketContext } from "./Context";

function App() {
  
  const [userData, setUserData] = useState();
  const [socket,setSocket] = useState();

  return (
    <UserContext.Provider value={{userData, setUserData}}>
      <SocketContext.Provider value={{socket,setSocket}}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute> <HomePage/> </ProtectedRoute>} />
          <Route path="/user/:id" element={<ProtectedRoute> <ProfilePage/> </ProtectedRoute>} />
          <Route path="/friendrequests" element={<ProtectedRoute> <FriendRequestPage/> </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
      </SocketContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
