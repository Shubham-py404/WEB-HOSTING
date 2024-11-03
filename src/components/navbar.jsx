import React from 'react'
import taskimg from '../../src/assets/task.png'

const navbar = () => {
  return (
    <div className='navbar h-5 pt-3 '>
      <div className=' justify-between h-16 flex p-3 max-sm:p-3 pl-11 items-center'>
        <div className='Name flex justify-between items-center *:p-1 gap-2'>
          <img src={taskimg} alt="task mate" className='h-12 max-sm:h-10 ' />
          <div className='text-4xl  font-bold max-sm:text-3xl'>Task Mate</div>
        </div>

        <div className='flex justify-between *:p-3 pr-7  max-sm:pr-2'>
          <div  className='pl-4 max-sm:pl-8 text-lg cursor-pointer hover:font-bold w-28 transition-all  duration-150 '>Home</div>
          <div className='cursor-pointer text-lg hover:font-bold w-28 transition-all duration-150'>Your Tasks</div>
        </div>
      </div>   
        
     </div>
  )
}

export default navbar
