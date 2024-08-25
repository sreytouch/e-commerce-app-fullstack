import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItem, setCartItem } from "../store/cart";
import { IoMdAdd } from 'react-icons/io'
import { IoMdRemove } from 'react-icons/io'
import {motion} from 'framer-motion'

export default function Modal({onClose}) {
  const cartItems=useSelector(selectCartItem)
  const dispatch=useDispatch()

  const addItem=(id)=>{
    dispatch(setCartItem(cartItems.map(item=>item.id===id ? {...item,quantity:item.quantity+1}: item)))
  }

  const removeItem=(id)=>{
    let item=cartItems.find(item=>item.id===id)
    let quantity=item.quantity >1 ? item.quantity-1 :1
    dispatch(setCartItem(cartItems.map(item=>item.id===id ? {...item,quantity}: item)))
  }

  const totalPrice=()=>{
    let total=0
    cartItems.forEach(item=>{
      total+=item.price*item.quantity
    })
    return total.toFixed(2)
  }
  return (
    <>
      <div className="backdrop"></div>
      <motion.dialog 
      initial={{opacity:0,y:30}}
      animate={{opacity:1,y:0}}
      transition={{type:"spring"}}

      className="modal" open>
        <div>
          {cartItems.map((item) => (
            <div className="modal-info">
              <h4 className="title">
                {item.title} (Rs.{item.price})
              </h4>
              <div className="quantity">
                <button className="add-icon" onClick={() => addItem(item.id)}>
                  <IoMdAdd />
                </button>
                <h5>{item.quantity}</h5>
                <button
                  className="remove-icon"
                  onClick={() => removeItem(item.id)}
                >
                  <IoMdRemove />
                </button>
              </div>
            </div>
          ))}
        </div>
        <form className="close" method="dialog">
          <div className="total">Total : Rs.{totalPrice()}</div>
          <button onClick={onClose}>Close</button>
        </form>
      </motion.dialog>
    </>
  );
};
