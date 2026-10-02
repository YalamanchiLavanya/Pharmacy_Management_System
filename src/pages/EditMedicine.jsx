import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getMedicine,
  updateMedicine
} from "../services/api";

function EditMedicine() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    loadMedicine();
  }, [id]);

  const loadMedicine = async () => {
    try {
      const response = await getMedicine(id);
      setFormData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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
      await updateMedicine(id, {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock)
      });

      alert("Medicine updated successfully!");

      navigate("/medicines");
    } catch (error) {
      console.error(error);
      alert("Failed to update medicine");
    }
  };

  if (!formData) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="form-container">

      <h1>Edit Medicine</h1>

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
              required
            />
          </div>

          <div className="form-group">
            <label>Form</label>
            <select
              name="form"
              value={formData.form}
              onChange={handleChange}
            >
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
            Update Medicine
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

export default EditMedicine;