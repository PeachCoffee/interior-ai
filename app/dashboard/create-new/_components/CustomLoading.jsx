import React from 'react'

function CustomLoading() {

  return (

    <div className="flex flex-col items-center justify-center h-[70vh] gap-5">

      <span className="loading loading-spinner loading-lg"></span>


      <h2 className="text-2xl font-bold">
        Redesigning your room...
      </h2>

      <p>Do not refresh</p>

    </div>
  )
}

export default CustomLoading