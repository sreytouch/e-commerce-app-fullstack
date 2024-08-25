import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import RootLayout from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index:true,
        element: <Products />,
        loader: async () => {
          const res = await fetch("https://fakestoreapi.com/products");
          const data = await res.json();
          return data;
        },
      },
      { path: "/products/:id",
       element: <ProductDetails /> ,
       loader:async({params})=>{
        const res=await fetch(`https://fakestoreapi.com/products/${params.id}`)
        const data=await res.json()
        return data
       }
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
