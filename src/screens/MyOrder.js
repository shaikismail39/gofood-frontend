import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      const response = await fetch(`http://localhost:4000/api/myOrderData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: userEmail })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      // Ensure that order_data is set correctly and sort by date
      const sortedOrderData = data.data[0].order_data.sort((a, b) => new Date(b[0].Order_date) - new Date(a[0].Order_date));
      setOrderData(sortedOrderData);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  const containerStyle = {
    margin: '20px',
  };

  const orderGroupStyle = {
    marginBottom: '30px',
  };

  const orderDateStyle = {
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const orderItemsStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
  };

  const orderCardStyle = {
    flex: '1 1 calc(25% - 15px)', // Flex grow, flex shrink, and flex-basis for responsive sizing
    boxSizing: 'border-box',
    maxWidth: 'calc(25% - 15px)',
    minWidth: '200px',
  };

  const cardStyle = {
    width: '100%',
  };

  const imgStyle = {
    height: '120px',
    objectFit: 'fill',
  };

  return (
    <div>
      <Navbar />
      <div style={containerStyle}>
        {orderData.map((orderGroup, index) => (
          <div key={index} style={orderGroupStyle}>
            <h5 style={orderDateStyle}>Order Date: {new Date(orderGroup[0].Order_date).toDateString()}</h5>
            <div style={orderItemsStyle}>
              {orderGroup.slice(1).map((order, innerIndex) => (
                <div key={innerIndex} style={orderCardStyle}>
                  <div className="card mt-3" style={cardStyle}>
                    <img
                      src={order.img || 'default-image.jpg'}
                      className="card-img-top"
                      alt={order.name}
                      style={imgStyle}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{order.name}</h5>
                      <div className="container w-100 p-0" style={{ height: '38px' }}>
                        <span className="m-1">Qty: {order.qty}</span>
                        <span className="m-1">Size: {order.size}</span>
                        <div className="d-inline ms-2 h-100 w-20 fs-5">
                          ₹{order.price}/-
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
