import React, { useState } from "react";

function Cart({ cart, setcart }) {
  // Function to handle quantity increase
  const handleIncreaseQuantity = (index) => {
    const updatedCart = cart.map((item, idx) =>
      idx === index ? { ...item, quantity: item.quantity + 1 } : item,
    );
    setcart(updatedCart);
  };

  // Function to handle quantity decrease
  const handleDecreaseQuantity = (index) => {
    const updatedCart = cart.map((item, idx) =>
      idx === index && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    );
    setcart(updatedCart);
  };

  // Remove handler function
  const removehandler = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setcart(updatedCart);
  };

  // Calculate total price
  const totalPrice = cart
    .map((item) => item.price * item.quantity)
    .reduce((total, value) => total + value, 0);

  return (
    <div className="flex w-full flex-col p-4 md:flex-row">
      {/* Cart Items (3/4) */}
      <div className="flex w-full flex-wrap p-4 md:w-3/4">
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <li
              key={index}
              className="m-2 h-auto w-28 list-none rounded bg-gray-100 shadow sm:w-1/2 md:w-44"
            >
              <img
                src={item.thumbnail}
                alt={`${item.title} image`}
                className="h-32 w-full rounded-t object-cover"
              />
              <div className="p-2 text-center text-sm text-gray-700">
                <div className="font-bold">{item.title}</div>
                <div>Brand: {item.brand}</div>
                <div>Price: ${item.price}</div>
                <div className="text-1xl flex justify-center gap-3 font-bold">
                  <button
                    className="border border-black px-2"
                    onClick={() => handleDecreaseQuantity(index)}
                  >
                    -
                  </button>
                  <div className="border border-black px-2">
                    {item.quantity}
                  </div>
                  <button
                    className="border border-black px-2"
                    onClick={() => handleIncreaseQuantity(index)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="mt-2 border border-solid border-black bg-red-600 text-white hover:bg-red-400"
                  onClick={() => removehandler(index)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))
        ) : (
          <div className="w-full text-center text-gray-700">
            No items added to cart.
          </div>
        )}
      </div>

      {/* Total Price Section (1/4) */}
      <div className="flex w-full flex-col items-center justify-center border-t border-gray-300 p-4 md:w-1/4 md:border-l md:border-t-0">
        <h2 className="text-xl font-bold text-gray-700">Order Summary</h2>
        <p className="text-lg font-semibold text-gray-600">
          Total Price: ${totalPrice.toFixed(2)}
        </p>
        <button className="mt-4 w-1/2 rounded-xl bg-blue-700 text-lg font-bold text-white hover:bg-blue-500">
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
