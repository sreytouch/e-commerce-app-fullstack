import React, {useState } from "react";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import Modal from "./Modal";
import { useSelector } from "react-redux";
import { selectCartItem } from "../store/cart";

export default function MainNavigation() {
    const [visible,isVisible]=useState(false)
    const totalItems=useSelector(selectCartItem)

    const calculateCount=()=>{
      let count=0
      totalItems.forEach(item=>{
        count+=item.quantity
      })
      return count
    }

  return (
    <>
    {visible && <Modal onClose={()=>isVisible(false)}/>}
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/" >home</Link>
            </li>
          </ul>
          <div className="icon-cart">
            <IoCartOutline onClick={()=>isVisible(true)}/>
            {totalItems.length > 0 && <div className="count">{calculateCount()}</div>}
          </div>
        </nav>
      </header>
    </>
  );
}
