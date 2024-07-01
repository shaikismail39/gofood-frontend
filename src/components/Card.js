import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedQty, setAddedQty] = useState(0);

  const handleAddToCart = async () => {
    let finalPrice = qty * parseInt(options[size]);

    let food = data.find(item => item.id === props.foodItem._id && item.size === size);

    if (food) {
      await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: food.qty + qty, size: size });
      setAddedQty(food.qty + qty);
    } else {
      await dispatch({ type: "ADD", id: props.foodItem._id, img: props.foodItem.img, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
      setAddedQty(qty);
    }

    setAddedToCart(true); // Set added to cart state
    setTimeout(() => setAddedToCart(false), 2000); // Reset state after 2 seconds
  };

  const handleRemoveFromCart = async () => {
    const itemIndex = data.findIndex(item => item.id === props.foodItem._id && item.size === size);
    if (itemIndex !== -1) {
      await dispatch({ type: 'REMOVE', index: itemIndex });
      setAddedToCart(false);
      setAddedQty(0);
    }
  };

  // const handleDropCart = async () => {
  //   await dispatch({ type: 'DROP' });
  //   setAddedToCart(false);
  //   setAddedQty(0);
  // };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "150px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className='container w-100'>
            <select className='m-2 h-100 bg-success' onChange={(e) => setQty(parseInt(e.target.value))}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <select className='m-2 h-100 bg-success' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {priceOptions.map((data) => (
                <option key={data} value={data}>{data}</option>
              ))}
            </select>
            <div className='d-inline h-100 fs-5'>
              ₹{qty * parseInt(options[size])}/-
            </div>
          </div>
          <hr />
          <button className='btn btn-success justify-center m-2' onClick={handleAddToCart}>
            {addedToCart ? `${addedQty} in Cart Now` : "Add to Cart"}
          </button>
          {addedQty > 0 && (
            <>
              <button className='btn btn-danger justify-center m-2' onClick={handleRemoveFromCart}>
                Remove
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
