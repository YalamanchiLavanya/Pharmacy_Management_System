import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMedicine } from "../services/api";

function AddMedicine() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    genericName: "",
    category: "",
    manufacturer: "",
    price: "",
    stock: "",
    expiryDate: "",
    dosage: "",
    form: "",
    prescriptionRequired: false,
    description: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addMedicine({
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock)
      });

      alert("Medicine added successfully!");

      navigate("/medicines");
    } catch (error) {
      console.error(error);
      alert("Failed to add medicine");
    }
  };

  return (
    <div className="form-container">

      <div className="page-header">
        <div>
          <h1>Add Medicine</h1>
          <p>Add a new medicine to inventory.</p>
        </div>
      </div>

      <form
        className="medicine-form"
        onSubmit={handleSubmit}
      >

        <div className="form-grid">

          <div className="form-group">
            <label>Medicine Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Generic Name</label>
            <input
              name="genericName"
              value={formData.genericName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Manufacturer</label>
            <input
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Dosage</label>
            <input
              name="dosage"
              value={formData.dosage}
              onChange={handleChange}
              placeholder="Example: 500mg"
              required
            />
          </div>

          <div className="form-group">
            <label>Form</label>
            <select
              name="form"
              value={formData.form}
              onChange={handleChange}
              required
            >
              <option value="">Select Form</option>
              <option value="Tablet">Tablet</option>
              <option value="Capsule">Capsule</option>
              <option value="Syrup">Syrup</option>
              <option value="Powder">Powder</option>
              <option value="Injection">Injection</option>
            </select>
          </div>

        </div>

        <div className="form-group">
          <label>Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>

        <label className="checkbox">
          <input
            type="checkbox"
            name="prescriptionRequired"
            checked={formData.prescriptionRequired}
            onChange={handleChange}
          />
          Prescription Required
        </label>

        <div className="form-buttons">

          <button
            type="submit"
            className="btn btn-primary"
          >
            Add Medicine
          </button>

          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate("/medicines")}
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
}

export default AddMedicine;