import React from 'react'
import NotFound404Img from '../../../assets/image/notfound.png'

const Error = () => {
  return (
    <div className="Panel Center-Objects">
      <div className="Center-Objects">
        <img className='NotFound No-Select' src={NotFound404Img} />
      </div>
    </div>
  )
}

export default Error