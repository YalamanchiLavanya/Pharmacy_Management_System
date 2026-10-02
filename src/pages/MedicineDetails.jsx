import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getMedicine } from "../services/api";
import { addToCart } from "../features/cartSlice";

import Loading from "../components/Loading";

function MedicineDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    loadMedicine();
  }, [id]);

  const loadMedicine = async () => {

    try {

      const response = await getMedicine(id);

      setMedicine(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  const handleAddToCart = () => {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {

      alert("Please login to add medicines to cart.");

      navigate("/login");

      return;
    }

    dispatch(addToCart(medicine));

    alert("Medicine added to cart!");
  };

  if (loading) {
    return <Loading />;
  }

  if (!medicine) {

    return (
      <div className="no-results">

        <h2>Medicine not found</h2>

        <Link
          to="/medicines"
          className="btn btn-primary"
        >
          Back to Medicines
        </Link>

      </div>
    );
  }

  return (

    <div className="details-container">

      <div className="details-card">

        {/* Medicine Image */}

        <div className="details-image">

          <img
            src={medicine.image}
            alt={medicine.name}
          />

        </div>

        {/* Medicine Information */}

        <div className="details-content">

          <span className="category">
            {medicine.category}
          </span>

          <h1>
            {medicine.name}
          </h1>

          <p className="description">
            {medicine.description}
          </p>

          {/* Medicine Details */}

          <div className="details-grid">

            <div>
              <span>Generic Name</span>
              <strong>
                {medicine.genericName}
              </strong>
            </div>

            <div>
              <span>Manufacturer</span>
              <strong>
                {medicine.manufacturer}
              </strong>
            </div>

            <div>
              <span>Dosage</span>
              <strong>
                {medicine.dosage}
              </strong>
            </div>

            <div>
              <span>Form</span>
              <strong>
                {medicine.form}
              </strong>
            </div>

            <div>
              <span>Price</span>
              <strong>
                ₹{medicine.price}
              </strong>
            </div>

            <div>
              <span>Stock</span>
              <strong>
                {medicine.stock}
              </strong>
            </div>

            <div>
              <span>Expiry Date</span>
              <strong>
                {medicine.expiryDate}
              </strong>
            </div>

            <div>
              <span>Prescription</span>
              <strong>
                {medicine.prescriptionRequired
                  ? "Required"
                  : "Not Required"}
              </strong>
            </div>

            <div>
              <span>Uses</span>
              <strong>
                {medicine.uses}
              </strong>
            </div>

          </div>

          {/* Buttons */}

          <div className="details-buttons">

            <button
              className="btn btn-primary"
              onClick={handleAddToCart}
              disabled={medicine.stock <= 0}
            >
              🛒 Add to Cart
            </button>

            <Link
              to="/medicines"
              className="btn btn-outline"
            >
              Back to Medicines
            </Link>

          </div>

        </div>

      </div>

    </div>

  );
}

export default MedicineDetails;