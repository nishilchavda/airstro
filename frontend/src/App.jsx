import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Category from "./pages/Category"
import Flight from "./pages/Flight";
import Profile from "./pages/Profile";
import AdminPage from "./pages/Admin";
import Footer from "./components/Footer";
import FlightReview from "./components/Review";


export default function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Public Pages (use main Navbar) */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              
            </>
          }
        />
        <Route 
          path="/login" 
          element={
            <>
              <Navbar/>
              <Login />
              <Footer />
            </>
          } 
        />
        <Route 
          path="/signup" 
          element={
          <>
            <Navbar/>
            <Signup />
            <Footer />
          </>
          } 
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
              <Footer />
            </>
          }
        />
        <Route
          path="/reviews"
          element={
            <>
              <Navbar />
              <FlightReview />
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
              <Footer />
            </>
          }
        />

        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <Dashboard />
              <Footer />
            </>
          }
        />
        <Route
          path="/category"
          element={
            <>
              <Navbar />
              <Category />
              <Footer />
            </>
          }
        />
        <Route
          path="/flight"
          element={
            <>
              <Navbar />
              <Flight />
              <Footer />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Navbar />
              <Profile />
              <Footer />
            </>
          }
        />
        <Route
          path="/admin"
          element={
            <>
              <Navbar />
              <AdminPage />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}
