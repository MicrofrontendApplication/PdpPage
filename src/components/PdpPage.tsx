import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data));
    }
  }, [id]);

  if (!product) return <div>Loading product...</div>;

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
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Brand:</strong> {product.brand}</p>
      <p><strong>Category:</strong> {product.category}</p>
    </div>
  );
};

export default PdpPage;
