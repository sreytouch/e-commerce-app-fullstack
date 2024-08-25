import { motion } from "framer-motion";
import React from "react";
import { useLoaderData,useNavigate } from "react-router-dom";

export default function ProductItem() {
  const items = useLoaderData();
  const navigate=useNavigate()

  const  parentVariants={
    initial:{opacity:0,scale:0.5},
    animate:{
      opacity:1,
      scale:1,
      transition:{
        staggerChildren:0.2
      }
    }
  }

  const childVariants={
    initial:{opacity:0,scale:0.5},
    animate:{opacity:1,scale:1}
  }

  return (
    <>
      <motion.div 
      variants={parentVariants}
      animate="animate"
      initial="initial"
      className="card">
        {items.map((item) => (
          <motion.div 
          variants={childVariants}
          className="card-item" onClick={()=>navigate(`/products/${item.id}`)}>
            <img src={item.image} alt="img"></img>
            <div className="card-body">
              <p>Rs.{item.price}</p>
              <div className="rating">
                <p>{item.rating.rate}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
