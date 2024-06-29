import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
  const [orderData, setOrderData] = useState({});

  const fetchMyOrder = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      const response = await fetch(`https://gofood-backend-2.onrender.com/api/auth/myOrderData`, {
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
      setOrderData(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='row'>
          {Array.isArray(orderData.orderData) && orderData.orderData.map((orderGroup, index) => (
            <div key={index} className='m-auto mt-5'>
              {orderGroup.map((order, innerIndex) => (
                Array.isArray(order) ? (
                  <div key={innerIndex}>
                    {order.map((arrayData, arrayIndex) => (
                      <div key={arrayIndex} className='col-12 col-md-6 col-lg-3'>
                        <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                          <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                          <div className="card-body">
                            <h5 className="card-title">{arrayData.name}</h5>
                            <div className='container w-100 p-0' style={{ height: "38px" }}>
                              <span className='m-1'>Qty: {arrayData.qty}</span>
                              <span className='m-1'>Size: {arrayData.size}</span>
                              <span className='m-1'>Date: {new Date(arrayData.Order_date).toDateString()}</span>
                              <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                ₹{arrayData.price}/-
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='m-auto mt-5'>
                    <div>{order}</div>
                    <hr />
                  </div>
                )
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
