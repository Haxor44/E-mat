'use client';
import { ProductGrid } from "@/components/product-grid"
import { useState, useEffect } from 'react';
import { fetchFromBackend } from '@/lib/api';

const products = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 29.99,
    image: "/blue.jpg?height=400&width=300",
    category: "men",
    isNew: true,
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: 59.99,
    image: "/jeans.jpg?height=400&width=300",
    category: "men",
    isNew: false,
  },
  {
    id: 3,
    name: "Summer Floral Dress",
    price: 79.99,
    image: "/dress.jpg?height=400&width=300",
    category: "women",
    isNew: true,
  },
  {
    id: 4,
    name: "Casual Hoodie",
    price: 49.99,
    image: "/hoodie.jpg?height=400&width=300",
    category: "men",
    isNew: false,
  },
  {
    id: 5,
    name: "Denim Jacket",
    price: 89.99,
    image: "/denim.jpg?height=400&width=300",
    category: "men",
    isNew: true,
  },
  {
    id: 6,
    name: "Pleated Skirt",
    price: 45.99,
    image: "/skirt.jpg?height=400&width=300",
    category: "women",
    isNew: false,
  },
  {
    id: 7,
    name: "Knit Sweater",
    price: 65.99,
    image: "/sweater.jpg?height=400&width=300",
    category: "women",
    isNew: true,
  },
  {
    id: 8,
    name: "Cargo Pants",
    price: 55.99,
    image: "/cargo.jpg?height=400&width=300",
    category: "men",
    isNew: false,
  },
]

export default function ProductsPage() {
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const backendUrl = process.env.API_URL;

        //const response = await fetch(`${backendUrl}/products`);
        //if (!response.ok) throw new Error('Network response was not ok');
        const jsonData = await fetchFromBackend("/products");
        setData(jsonData);
      } catch (err) {
        console.log(err)
        //setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  },[]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="flex flex-col items-center text-center space-y-2 mb-12">
        <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
        <p className="text-muted-foreground max-w-[600px]">Browse our complete collection of premium clothing</p>
      </div>
      <ProductGrid products={data} />
    </div>
  )
}
