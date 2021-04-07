import React, { useState } from 'react';
import RightNav from './RightNav';

const Burger = () => {
  const [open, setOpen] = useState(false)
  const openClass = (open) ? 'burger--open' : ''
  return (
    <>
      <div className={`burger ${openClass}`} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </div>
      <RightNav open={open} setOpen={setOpen}/>
    </>
  )
}

export default Burger