import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Medicines from "./pages/Medicines";
import MedicineDetails from "./pages/MedicineDetails";
import AddMedicine from "./pages/AddMedicine";
import EditMedicine from "./pages/EditMedicine";
import Cart from "./pages/Cart";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

import ProtectedRoute from "./routes/ProtectedRoute";
import Orders from "./pages/orders";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/medicines"
          element={<Medicines />}
        />

        <Route
          path="/medicines/:id"
          element={<MedicineDetails />}
        />

        <Route
          path="/add-medicine"
          element={
            <ProtectedRoute>
              <AddMedicine />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-medicine/:id"
          element={
            <ProtectedRoute>
              <EditMedicine />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/logout"
          element={<Logout />}
        />
        <Route path="/orders" element={<Orders/>}/>

      </Routes>

      <Footer />
    </>
  );
}

export default App;