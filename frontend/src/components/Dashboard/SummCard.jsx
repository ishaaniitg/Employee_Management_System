import React from 'react'

function SummCard(props) {
  return (
    <div className='rounded  flex bg-white'>
      <div className={`text-3xl flex ${props.color} justify-center items-center  text-white px-4`}>
        {props.icon}
      </div>

      <div className='pl-4 py-1'>
        <p className='text-lg font-semibold'>{props.text}</p>
        <p className='text-xl font-bold'>{props.number}</p>
      </div>

    </div>
  )
}

export default SummCard
