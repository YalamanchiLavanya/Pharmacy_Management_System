import { useState } from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart
} from "../features/cartSlice";

import {
  createOrder,
  getOrders
} from "../services/api";

function Cart() {

  const dispatch = useDispatch();

  const cart = useSelector(
    (state) => state.cart
  );

  const [showPayment, setShowPayment] =
    useState(false);

  const [paymentMethod, setPaymentMethod] =
    useState("");

  const [placingOrder, setPlacingOrder] =
    useState(false);

  // Calculate total amount
  const totalAmount = cart.reduce(
    (total, item) =>
      total +
      Number(item.price) * item.quantity,
    0
  );

  // Calculate total items
  const totalItems = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  // -------------------------------
  // PLACE ORDER
  // -------------------------------

  const handlePayment = async () => {

    if (!paymentMethod) {

      alert(
        "Please select a payment method"
      );

      return;
    }

    if (cart.length === 0) {

      alert(
        "Your cart is empty."
      );

      return;
    }

    try {

      setPlacingOrder(true);

      // Get logged-in user
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) {

        alert(
          "Please login before placing an order."
        );

        setPlacingOrder(false);

        return;
      }

      // Get existing orders
      const ordersResponse =
        await getOrders();

      const orders =
        ordersResponse.data;

      // Generate next numeric order ID
      const numericIds = orders
        .map((order) => Number(order.id))
        .filter((id) => !isNaN(id));

      const nextId =
        numericIds.length > 0
          ? Math.max(...numericIds) + 1
          : 1;

      // Create order object
      const order = {

        id: nextId,

        userId: user.id,

        customerName: user.name,

        customerEmail: user.email,

        items: cart.map((item) => ({

          medicineId: item.id,

          medicineName: item.name,

          quantity: item.quantity,

          price: Number(item.price)

        })),

        totalItems: totalItems,

        totalAmount: totalAmount,

        paymentMethod: paymentMethod,

        status: "Placed",

        orderDate:
          new Date().toISOString()

      };

      console.log(
        "Order being sent:",
        order
      );

      // Save order to JSON Server
      const response =
        await createOrder(order);

      console.log(
        "Order saved:",
        response.data
      );

      // Clear cart
      dispatch(clearCart());

      // Reset payment section
      setShowPayment(false);

      setPaymentMethod("");

      // Success message
      alert(
        `Order #${response.data.id} placed successfully!`
      );

    } catch (error) {

      console.error(
        "Error placing order:",
        error
      );

      if (error.response) {

        console.error(
          "Server response:",
          error.response.data
        );

        console.error(
          "Status:",
          error.response.status
        );

      }

      alert(
        "Failed to place order. Please check JSON Server."
      );

    } finally {

      setPlacingOrder(false);

    }
  };

  // -------------------------------
  // EMPTY CART
  // -------------------------------

  if (cart.length === 0) {

    return (

      <div className="cart-container">

        <div className="cart-header">

          <h1>
            🛒 Shopping Cart
          </h1>

          <p>
            Your shopping cart is
            currently empty.
          </p>

        </div>

        <div className="empty-cart">

          <div className="empty-cart-icon">
            🛒
          </div>

          <h2>
            Your Cart is Empty
          </h2>

          <p>
            Add some medicines to your
            cart to continue.
          </p>

        </div>

      </div>

    );
  }

  // -------------------------------
  // CART PAGE
  // -------------------------------

  return (

    <div className="cart-container">

      {/* HEADER */}

      <div className="cart-header">

        <h1>
          🛒 Shopping Cart
        </h1>

        <p>

          {totalItems} medicine
          {totalItems !== 1
            ? "s"
            : ""}{" "}

          in your cart

        </p>

      </div>


      {/* CART LAYOUT */}

      <div className="cart-layout">


        {/* CART ITEMS */}

        <div className="cart-items">

          {cart.map((item) => (

            <div
              className="cart-item"
              key={item.id}
            >


              {/* MEDICINE ICON */}

              <div className="cart-medicine-icon">
                💊
              </div>


              {/* MEDICINE INFORMATION */}

              <div className="cart-medicine-info">

                <h2>
                  {item.name}
                </h2>

                <p className="cart-category">
                  {item.category}
                </p>

                <p>

                  <strong>
                    Price:
                  </strong>{" "}

                  ₹{item.price}

                </p>

              </div>


              {/* QUANTITY */}

              <div className="quantity-section">

                <span>
                  Quantity
                </span>

                <div className="quantity-control">

                  <button
                    onClick={() =>
                      dispatch(
                        decreaseQuantity(
                          item.id
                        )
                      )
                    }
                  >
                    −
                  </button>

                  <strong>
                    {item.quantity}
                  </strong>

                  <button
                    onClick={() =>
                      dispatch(
                        increaseQuantity(
                          item.id
                        )
                      )
                    }
                  >
                    +
                  </button>

                </div>

              </div>


              {/* ITEM TOTAL */}

              <div className="item-total">

                <span>
                  Total
                </span>

                <strong>

                  ₹
                  {Number(item.price) *
                    item.quantity}

                </strong>

              </div>


              {/* REMOVE */}

              <button
                className="remove-cart-btn"
                onClick={() =>
                  dispatch(
                    removeFromCart(
                      item.id
                    )
                  )
                }
              >
                🗑️
              </button>

            </div>

          ))}

        </div>


        {/* ORDER SUMMARY */}

        <div className="cart-summary">

          <h2>
            Order Summary
          </h2>


          <div className="summary-row">

            <span>
              Total Items
            </span>

            <strong>
              {totalItems}
            </strong>

          </div>


          <div className="summary-row">

            <span>
              Subtotal
            </span>

            <strong>
              ₹{totalAmount}
            </strong>

          </div>


          <div className="summary-row">

            <span>
              Delivery
            </span>

            <strong className="free">
              FREE
            </strong>

          </div>


          <hr />


          <div className="summary-total">

            <span>
              Total Amount
            </span>

            <strong>
              ₹{totalAmount}
            </strong>

          </div>


          {!showPayment && (

            <button
              className="checkout-btn"
              onClick={() =>
                setShowPayment(true)
              }
            >
              Proceed to Order
            </button>

          )}

        </div>

      </div>


      {/* PAYMENT SECTION */}

      {showPayment && (

        <div className="payment-section">

          <h2>
            💳 Choose Payment Method
          </h2>

          <p className="payment-subtitle">
            Select your preferred
            payment option
          </p>


          <div className="payment-options">


            {/* UPI */}

            <label
              className={
                paymentMethod === "upi"
                  ? "payment-option selected"
                  : "payment-option"
              }
            >

              <input
                type="radio"
                name="payment"
                value="upi"
                checked={
                  paymentMethod === "upi"
                }
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
              />

              <span className="payment-icon">
                📱
              </span>

              <div>

                <strong>
                  UPI
                </strong>

                <p>
                  Google Pay,
                  PhonePe, Paytm
                </p>

              </div>

            </label>


            {/* CARD */}

            <label
              className={
                paymentMethod === "card"
                  ? "payment-option selected"
                  : "payment-option"
              }
            >

              <input
                type="radio"
                name="payment"
                value="card"
                checked={
                  paymentMethod === "card"
                }
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
              />

              <span className="payment-icon">
                💳
              </span>

              <div>

                <strong>
                  Credit / Debit Card
                </strong>

                <p>
                  Visa, Mastercard,
                  RuPay
                </p>

              </div>

            </label>


            {/* NET BANKING */}

            <label
              className={
                paymentMethod === "netbanking"
                  ? "payment-option selected"
                  : "payment-option"
              }
            >

              <input
                type="radio"
                name="payment"
                value="netbanking"
                checked={
                  paymentMethod ===
                  "netbanking"
                }
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
              />

              <span className="payment-icon">
                🏦
              </span>

              <div>

                <strong>
                  Net Banking
                </strong>

                <p>
                  Pay using your
                  bank account
                </p>

              </div>

            </label>


            {/* COD */}

            <label
              className={
                paymentMethod === "cod"
                  ? "payment-option selected"
                  : "payment-option"
              }
            >

              <input
                type="radio"
                name="payment"
                value="cod"
                checked={
                  paymentMethod === "cod"
                }
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
              />

              <span className="payment-icon">
                💵
              </span>

              <div>

                <strong>
                  Cash on Delivery
                </strong>

                <p>
                  Pay when your
                  medicine arrives
                </p>

              </div>

            </label>

          </div>


          {/* PAYMENT BUTTON */}

          <div className="payment-bottom">

            <h3>

              Amount to Pay:

              ₹{totalAmount}

            </h3>

            <button
              className="pay-btn"
              disabled={
                !paymentMethod ||
                placingOrder
              }
              onClick={handlePayment}
            >

              {placingOrder
                ? "Placing Order..."
                : `🔒 Pay ₹${totalAmount}`}

            </button>

          </div>

        </div>

      )}

    </div>

  );
}

export default Cart;