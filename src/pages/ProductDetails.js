import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItem, setCartItem } from "../store/cart";
import {motion} from 'framer-motion'

export default function ProductDetails() {
  const items = useLoaderData();
  const allItems = useSelector(selectCartItem);
  const [isRemove, setIsRemove] = useState(
    allItems.some((item) => item.id === items.id)
  );
  const dispatch = useDispatch();

  const addToCart = () => {
    let itemStore = {
      id: items.id,
      title: items.title,
      price: items.price,
      quantity: 1,
    };
    dispatch(setCartItem([...allItems, itemStore]));
    setIsRemove(true);
  };

  const removeFromCart=()=>{
    dispatch(setCartItem(allItems.filter(item=>item.id !== items.id)))
    setIsRemove(false)
  }
  
  return (
    <>
      <div className="product-details">
        <motion.div 
        whileHover={{rotate:5}}
        transition={{type:"spring"}}
        className="product-image">
          <img src={items.image}></img>
        </motion.div>
        <div className="product-info">
          <h2>{items.title}</h2>
          <h4 className="description">{items.description}</h4>
          <div className="add-to-cart">
            <h4>Price : Rs.{items.price}</h4>
            <h4>Rating : {items.rating.rate}</h4>
            <motion.button 
            whileHover={{scale:1.1}}
            transition={{type:"spring",stiffness:500}}
            onClick={() => isRemove ? removeFromCart(): addToCart()}>
              {isRemove ? "REMOVE FROM CART" : "ADD TO CART"}
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
}
