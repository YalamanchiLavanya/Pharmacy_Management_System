import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      {/* HERO SECTION */}

      <section className="hero">

        <div className="hero-content">

          <span className="hero-tag">
            YOUR HEALTH, OUR PRIORITY
          </span>

          <h1>
            Welcome to
            <br />
            <span>MediCare Pharmacy</span>
          </h1>

          <p>
            Manage medicines and orders easily
            with our simple pharmacy management
            system.
          </p>

          <div className="hero-buttons">

            <Link
              to="/medicines"
              className="btn btn-primary hero-btn"
            >
              Browse Medicines
            </Link>

          </div>

        </div>

        <div className="hero-image">
          💊
        </div>

      </section>


      {/* OUR FEATURES */}

      <section className="features">

        <h2>
          Our Features
        </h2>

        <p className="features-subtitle">
          Everything you need to manage and order
          medicines easily and securely.
        </p>


        <div className="feature-grid">

          {/* MEDICINE MANAGEMENT */}

          <div className="feature-card">

            <div className="feature-icon">
              💊
            </div>

            <h3>
              Medicine Management
            </h3>

            <p>
              Add, edit, delete and manage
              medicine information easily.
            </p>

          </div>


          {/* ADD TO CART */}

          <div className="feature-card">

            <div className="feature-icon cart-icon">
              🛒
            </div>

            <h3>
              Add to Cart
            </h3>

            <p>
              Select your required medicines
              and add them to your shopping cart.
            </p>

          </div>


          {/* PAYMENT OPTIONS */}

          <div className="feature-card">

            <div className="feature-icon payment-icon">
              💳
            </div>

            <h3>
              Multiple Payment Options
            </h3>

            <p>
              Choose from UPI, Credit/Debit Card,
              Net Banking or Cash on Delivery.
            </p>

          </div>


          {/* ORDER MANAGEMENT */}

          <div className="feature-card">

            <div className="feature-icon order-icon">
              📦
            </div>

            <h3>
              Order Management
            </h3>

            <p>
              Your order details are securely
              saved in the pharmacy database.
            </p>

          </div>


          {/* SECURE ORDERING */}

          <div className="feature-card">

            <div className="feature-icon secure-icon">
              🔐
            </div>

            <h3>
              Secure Ordering
            </h3>

            <p>
              Login to your account before
              adding medicines and placing orders.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;