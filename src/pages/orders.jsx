import { useEffect, useState } from "react";
import { getOrders } from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="orders-container">
        <div className="loading-orders">
          <h2>Loading Orders...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">

      {/* HEADER */}

      <div className="orders-header">
        <h1>📦 My Orders</h1>

        <p>
          View your pharmacy orders and payment details.
        </p>
      </div>

      {/* NO ORDERS */}

      {orders.length === 0 ? (
        <div className="no-orders">

          <div className="no-orders-icon">
            📦
          </div>

          <h2>No Orders Yet</h2>

          <p>
            Your placed orders will appear here.
          </p>

        </div>
      ) : (

        /* ORDERS */

        <div className="orders-list">

          {orders.map((order) => (

            <div
              className="order-card"
              key={order.id}
            >

              {/* ORDER HEADER */}

              <div className="order-top">

                <div>
                  <h2>
                    Order #{order.id}
                  </h2>

                  <p>
                    {order.orderDate}
                  </p>
                </div>

                <span className="order-status">
                  {order.status}
                </span>

              </div>


              {/* ORDER ITEMS */}

              <div className="order-items">

                <h3>
                  Medicines
                </h3>

                {order.items &&
                  order.items.map((item, index) => (

                    <div
                      className="order-item"
                      key={index}
                    >

                      <div className="order-item-info">

                        <strong>
                          💊 {item.medicineName}
                        </strong>

                        <p>
                          Quantity: {item.quantity}
                        </p>

                      </div>

                      <strong>
                        ₹
                        {Number(item.price) *
                          item.quantity}
                      </strong>

                    </div>

                  ))}

              </div>


              {/* ORDER FOOTER */}

              <div className="order-bottom">

                <div className="payment-info">

                  <span>
                    Payment Method
                  </span>

                  <strong>
                    {order.paymentMethod
                      ? order.paymentMethod.toUpperCase()
                      : "N/A"}
                  </strong>

                </div>

                <div className="order-amount">

                  <span>
                    Total Amount
                  </span>

                  <strong>
                    ₹{order.totalAmount}
                  </strong>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Orders;