import React from 'react'

const ProgressUI = () => {
  return (
    <main className='h-[65px] space-x-3 flex items-center justify-center bg-gray-200 rounded-lg w-full'>

<section className='flex space-x-2 items-center'>
<div className='bg-gray-500 h-10 w-10 rounded-full flex justify-center items-center'>
    <p className='font-bold text-white text-xl'>1</p>
</div>
<div className='flex flex-col justify-center'>
    <h1 className='font-semibold text-sm'>Step 1</h1>
    <p className='text-xs text-gray-700'>General info<br/>& pricing</p>
</div>
</section>
<svg width="150" height="50" className='text-gray-200'>
  <line x1="0" y1="25" x2="100%" y2="25" stroke="gray" strokeWidth="2" />
</svg>
<section className='flex space-x-2 items-center'>
<div className='bg-gray-500 h-10 w-10 rounded-full flex justify-center items-center'>
    <p className='font-bold text-white text-xl'>2</p>
</div>
<div className='flex flex-col justify-center'>
    <h1 className='font-semibold text-sm'>Step 2</h1>
    <p className='text-xs text-gray-700'>Image uplaod<br/>& sizes</p>
</div>
</section>
    </main>
  )
}

export default ProgressUI