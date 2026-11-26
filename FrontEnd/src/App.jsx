import React, { useContext } from "react";
// Previously used for the old Lamp-based commented example:
// import { Lamp } from "./components/Lamp";
// import FloatingDockDesktop from "./components/FloatingDockDesktop";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Context, { UserContext } from "./context/Usercontext";
import { Lamp } from "./components/Lamp";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { HoverEffect } from "./components/project-page/projects";
import DocumentationPage from "./components/documentation";
import Editor from "./components/Editor";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { Developers } from "./components/Developers";

const googleClientId = import.meta.env.VITE_CLIENT_ID || "not-configured";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {

  return (
    <GoogleOAuthProvider clientId={googleClientId} >
      
    <Context>
      <Router>
        <Routes>
          <Route path="/" element={<Lamp />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/projects" element={<ProtectedRoute><HoverEffect /></ProtectedRoute>} />
          <Route path="/documentation" element={<DocumentationPage />} />
          <Route path="/editor" element={<ProtectedRoute><Editor /></ProtectedRoute>} />
          {/* <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />  */}
        </Routes>
      </Router>
    </Context>
    
    </GoogleOAuthProvider>

  );
};

export default App;

// Previously used alternative App shell, retained for reference:
// {
//   /* <div>
// <div className="bg-black min-h-screen w-full select-none font-serif">
//   <Lamp />
//   <FloatingDockDesktop className="fixed bottom-20 left-1/2 -translate-x-1/2" />
// </div>
// </div> */
// }
