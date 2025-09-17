import { Button } from "microfrontend";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "../store/createSlice";
import { RootState } from "../store/store"; // adjust path as per your project

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  images: string[];
}

const PdpPage: React.FC = () => {
  const location = useLocation();
  const { productId } = location.state || {};
  const dispatch = useDispatch();

  const [product, setProduct] = useState<Product | null>(null);

  // 🔹 Get cart from Redux
  const cart = useSelector((state: RootState) => state.cart.items);
  const cartItem = cart.find((item) => item.id === productId);

  useEffect(() => {
    if (productId) {
      fetch(`https://dummyjson.com/products/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);

          // 🔹 Dispatch view_product event once product is fetched
          const event = new CustomEvent("view_product", {
            detail: {
              action: "view_product",
              id: data.id,
              name: data.title,
              category: data.category,
              brand: data.brand,
              price: data.price,
              image: data.images?.[0],
            },
          });
          document.dispatchEvent(event);
        });
    }
  }, [productId]);
  if (!product) return <div>Loading product...</div>;

  const handleAddToCart = () => {
    const newCartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    };

    // Redux action
    dispatch(addToCart(newCartItem));

    // 🔹 Dispatch DOM Event for JSP
    const event = new CustomEvent("cartUpdated", {
      detail: { action: "add_to_cart", ...newCartItem },
    });
    document.dispatchEvent(event);
  };

  const handleIncrease = () => {
    dispatch(increaseQuantity(product.id));
    document.dispatchEvent(
      new CustomEvent("cartUpdated", {
        detail: {
          action: "increase_quantity",
          productId: product.id,
          id: product.id,
          name: product.title,
          category: product.category,
          brand: product.brand,
          price: product.price,
        },
      })
    );
  };

  const handleDecrease = () => {
    dispatch(decreaseQuantity(product.id));
    document.dispatchEvent(
      new CustomEvent("cartUpdated", {
        detail: {
          action: "decrease_quantity",
          productId: product.id,
          name: product.title,
          category: product.category,
          brand: product.brand,
          price: product.price,
        },
      })
    );
  };

  return (
    <div className="container mt-4">
      <h2>{product.title}</h2>
      <img
        src={product.images[0]}
        alt={product.title}
        className="img-fluid mb-3"
        style={{ maxHeight: "400px", objectFit: "cover" }}
      />
      <p>{product.description}</p>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      <p>
        <strong>Brand:</strong> {product.brand}
      </p>
      <p>
        <strong>Category:</strong> {product.category}
      </p>

      {/* 🔹 Conditional Rendering */}
      {!cartItem ? (
        <button onClick={handleAddToCart}>Add to Cart</button>
      ) : (
        <div className="d-flex align-items-center gap-2">
          <button onClick={handleDecrease}>-</button>
          <span>{cartItem.quantity}</span>
          <button onClick={handleIncrease}>+</button>
        </div>
      )}
    </div>
  );
};

export default PdpPage;
