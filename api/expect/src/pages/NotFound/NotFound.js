import React from 'react'
import {Link} from 'react-router-dom';

import './notFound.scss';

export default function NotFound() {
  return (
    <div className='NotFound-Container'>
        <h1 className='NotFoundTitle'>404 NOT FOUND</h1>
        <img className='NotFoundImg' src="https://cdn-icons-png.flaticon.com/512/119/119571.png" alt="" srcset="" />
        <Link to= '/home'> Back To Home Page </Link>
    </div>
  )
}
