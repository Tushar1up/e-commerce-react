import React, { useState, useEffect } from "react";

function Mainpage({ data, searchterm, cart, setcart }) {
  // Local state to manage filtered data
  const [filteredData, setFilteredData] = useState(data);

  // Sync filteredData with the incoming data prop
  useEffect(() => {
    let updatedData = data;

    // Filter by search term
    if (searchterm) {
      updatedData = updatedData.filter((item) =>
        item.title.toLowerCase().includes(searchterm.toLowerCase())
      );
    }

    setFilteredData(updatedData);
  }, [data, searchterm]);

  // Function to filter data based on category
  const filterData = (e) => {
    const category = e.target.value.toLowerCase();
    if (category === "all") {
      setFilteredData(data); // Reset to original data
    } else {
      const newData = data.filter((item) =>
        item.category.toLowerCase().includes(category)
      );
      setFilteredData(newData);
    }
  };

  // Function to filter data based on price
  const filterbyprice = (e) => {
    const priceRange = e.target.value;

    if (priceRange === "all") {
      setFilteredData(data); // Reset to original data
    } else {
      const [min, max] = priceRange.split("-").map(Number);
      const newData = data.filter(
        (item) => item.price >= min && (max ? item.price <= max : true)
      );
      setFilteredData(newData);
    }
  };

  // Function to check if item is in the cart
  const isInCart = (item) => {
    return cart.some((cartItem) => cartItem.id === item.id);
  };

  return (
    <div className="flex w-full">
      {/* Sidebar for category and price filtering */}
      <div className="h-auto w-1/4 bg-blue-500 p-4 text-center text-white">
        <h1 className="mb-4 text-sm font-bold md:text-xl">Category</h1>
        <form className="flex flex-col gap-2 text-sm md:text-xl">
          <label>
            <input
              type="radio"
              name="category"
              value="all"
              onChange={filterData}
            />
            All
          </label>
          <label>
            <input
              type="radio"
              name="category"
              value="beauty"
              onChange={filterData}
            />
            Beauty
          </label>
          <label>
            <input
              type="radio"
              name="category"
              value="fragrances"
              onChange={filterData}
            />
            Fragrances
          </label>
          <label>
            <input
              type="radio"
              name="category"
              value="furniture"
              onChange={filterData}
            />
            Furniture
          </label>
          <label>
            <input
              type="radio"
              name="category"
              value="groceries"
              onChange={filterData}
            />
            Groceries
          </label>
        </form>

        <h1 className="mb-4 mt-6 text-sm font-bold md:text-xl">Prices</h1>
        <form className="flex flex-col gap-1 text-sm md:gap-2 md:text-xl">
          <label>
            <input
              type="radio"
              name="price"
              value="all"
              onChange={filterbyprice}
            />
            All
          </label>
          <label>
            <input
              type="radio"
              name="price"
              value="0-50"
              onChange={filterbyprice}
            />
            $0-$50
          </label>
          <label>
            <input
              type="radio"
              name="price"
              value="50-100"
              onChange={filterbyprice}
            />
            $50-$100
          </label>
          <label>
            <input
              type="radio"
              name="price"
              value="100-150"
              onChange={filterbyprice}
            />
            $100-$150
          </label>
          <label>
            <input
              type="radio"
              name="price"
              value="150-"
              onChange={filterbyprice}
            />
            Over $150
          </label>
        </form>
      </div>

      {/* Main content area for displaying cards */}
      <div className="flex w-3/4 flex-wrap p-4">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <li
              key={index}
              className="w-44 m-2 h-auto cursor-pointer list-none rounded bg-gray-100 shadow"
            >
              <img
                src={item.thumbnail}
                alt={`${item.title} image`}
                className="h-32 w-full rounded-t object-cover"
              />
              <div className="p-2 text-center text-sm text-gray-700">
                <div className="font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.title}
                </div>
                <div>Brand: {item.brand}</div>
                <div>Price: ${item.price}</div>
                <button
                  className={`${
                    isInCart(item)
                      ? "bg-green-500 hover:bg-green-300"
                      : "bg-orange-500 hover:bg-orange-300"
                  } font-bold rounded w-2/4`}
                  onClick={() => {
                    if (!isInCart(item)) {
                      setcart([...cart, { ...item, quantity: 1 }]);
                    }
                  }}
                >
                  {isInCart(item) ? "Added to cart" : "Add to cart"}
                </button>
              </div>
            </li>
          ))
        ) : (
          <div className="w-full text-center text-gray-700">
            No items match the selected category.
          </div>
        )}
      </div>
    </div>
  );
}

export default Mainpage;