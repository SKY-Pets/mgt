import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./screens/Home";

function App() {
  const isLoggedIn = localStorage.getItem("uid");

  
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      
    </Routes>
    
  );
}

export default App;
