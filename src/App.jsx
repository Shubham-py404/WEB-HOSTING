import { useState,useEffect } from 'react'

import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [Todo, setTodo] = useState("")

  const [Todos, setTodos] = useState([])
  
  const [Edit, setEdit] = useState()
  
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos= JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
   
  }, [])
  
  const saveTols = ()=>{
    localStorage.setItem("todos",JSON.stringify(Todos))
  }
  
  const handleEdit = (e,id)=>{
    let t =Todos.filter(i=>i.id === id )
    setTodo(t[0].Todo)
    let newTodo = Todos.filter(item=>{
      return item.id!==id;
    });
    setEdit(true)
    setTodos(newTodo)
    saveTols()

  }

  const handleDelete = (id,e)=>{
    let newTodo = Todos.filter(item=>{
      return item.id!==id;
    });
    setTodos(newTodo)
    saveTols()

  }

  const handleAdd = ()=>{
    setTodos([...Todos  ,{id: uuidv4() ,Todo , isCompleted:false}])
    setTodo("")
    saveTols()

    setEdit(false)

  }
 
  const handleChange= (e)=>{
    setTodo(e.target.value)
  }

  const handleCheckbox=(e) => {
    let id = e.target.name;
    let index = Todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...Todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveTols()

  }
  


  return (
    <>
      <Navbar/>
      <div  className="container w-[60vw] mx-auto my-20 rounded-lg p-5  bg-[#282828] min-h-[80vh]    max-sm:w-full max-sm:h-[84vh]">
        <div className=' text-xl font-bold '>Your todo</div>
        
        <div className=' adding todo'>
          <div className='text-xl font-bold'>Add Todo </div>
          <div className='textbox flex justify-between items-center pt-4'>
            <input type="text"  onChange={handleChange} value={Todo} className='text-black h-9 rounded-md w-[74.5vw]  text-center' placeholder='Add Your Task'/>
            <button onClick={handleAdd} className=' bg-[#27a1c9] font-semibold h-9 w-[75px] m-2 cursor-pointer hover:border hover:text-lg rounded-md'>{Edit?"Save":"Add"}</button>
          </div>  
        </div>



        <div className="todoslist ">
          {Todos.length ===0 && <div className='m-5 text-lg font-semibold'>No todos to display </div>}
          {Todos.map(item=>{
          return(

          <div key={item.id} className=' h-14  w-auto max-w-[60wh] flex shadow-md rounded-lg mt-4 '>
            <div className=" w-2  bg-[#27a1c9] rounded-[1px] left-0 top-0"></div>
            <div className="todos  flex justify-between pl-6 w-full  items-center" >
              <div className={item.isCompleted?"line-through max-sm:text-wrap ... ":" max-sm:text-wrap ..."} >{item.Todo}</div>
              <div className="buttons flex h-full items-center ">
                <div className="checkbox"><input name={item.id} onChange={handleCheckbox} type="checkbox" id='' value={item.isCompleted} className=''/></div>
                <button onClick={(e)=>{handleEdit(e,item.id)}}  className=' bg-[#27a1c9] font-semibold h-9 w-14 m-3 cursor-pointer hover:border hover:text-lg rounded-md'>Edit </button>
                <button onClick={(e)=>{handleDelete(item.id,e)}} className=' bg-[#27a1c9] font-semibold h-9 w-16 m-3 cursor-pointer hover:border hover:text-lg rounded-md'>Delete</button>
              </div>
            </div>
          </div>)})}

        </div>

        
           
      
      </div>
    </>
  )
}

export default App
