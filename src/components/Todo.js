import React, { useEffect, useState } from 'react'
import cross from '../assests/images/icon-cross.svg'

function Todo({darkMode}) {
    const [todoData, setTodoData] = useState({
        id: 0,
        task: '',
        isCompleted: false
    })

    const [todos, setTodos] = useState([])

    let [completedTasks, setCompletedTasks] = useState([])
    let [activeTasks, setActiveTasks] = useState([])
    let [display, setDisplay] = useState('all')

    const handleChange = (event) => {
        const {name, value} = event.target
        setTodoData(prevTodoData => {
            return {
                ...prevTodoData,
                [name]: value,
                id: prevTodoData.id++
            }
        })
    }
     

    const handleSubmit = (event) => {
        event.preventDefault()
        if (todoData.task === ''){
            return 
        } else {
            setTodos(prevTodos => {
                return(
                    [...prevTodos, todoData]
                )
            })
            setTodoData(prev => ({
                        ...prev,
                        task: ''
                    }))
        }
       
    }

    const handleIsCompleted = (id) => {
        setTodos(prevTodos => {
            return prevTodos.map(todo => {
                return todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo
            })
        })
    }

    const handleRemoveTask = (id) => {
        setTodos(prevTodos => {
            return prevTodos.filter(todo => {
                return todo.id !== id
            })
        })
    }

    const handleTasksCompleted = () => {
        setDisplay(prev => 'completed')
        setCompletedTasks(prev => {
            return todos.filter(task => {
                return task.isCompleted === true
            })
        })
        return console.log(completedTasks)
    }

    const handleAllTasks = () => {
        setDisplay(prev => 'all')
    }

    const handleTasksActive = () => {
        setDisplay(prev => 'active')
        setActiveTasks(prev => {
            return todos.filter(task => {
                return task.isCompleted === false
            })
        })
        return console.log(activeTasks)
    }

    const handleClearAllCompletedTasks = () => {
        setTodos(prev => {
            return todos.filter(task => task.isCompleted === false)
        })
    }

    let tasksElementCompleted = completedTasks.map(task => {
        return(
            <div className={`todo__tasks--task ${darkMode ? 'dark':''}`} key={task.id} id={task.id} draggable='true'>
                <div className='todo__tasks--wrapper'>
                    <div className={`todo__tasks--radio ${task.isCompleted ? 'checked' : ''}`} onClick={(()=>{handleIsCompleted(task.id)})}></div>
                    <p className={`${task.isCompleted ? "underline": ""}`}>{task.task}</p>
                </div>
                <img className='todo__tasks--image' src={cross} alt='cross' onClick={()=>{handleRemoveTask(task.id)}}/>
            </div>
        )
    })

    let tasksElementActive = activeTasks.map(task => {
        return(
            <div className={`todo__tasks--task ${darkMode ? 'dark':''}`} key={task.id} id={task.id} draggable='true'>
                <div className='todo__tasks--wrapper'>
                    <div className={`todo__tasks--radio ${task.isCompleted ? 'checked' : ''}`} onClick={(()=>{handleIsCompleted(task.id)})}></div>
                    <p className={`${task.isCompleted ? "underline": ""}`}>{task.task}</p>
                </div>
                <img className='todo__tasks--image' src={cross} alt='cross' onClick={()=>{handleRemoveTask(task.id)}}/>
            </div>
        )
    })

    let tasksElement = todos.map(task => {
        return(
            <div className={`todo__tasks--task ${darkMode ? 'dark':''}`} key={task.id} id={task.id} draggable='true'>
                <div className='todo__tasks--wrapper'>
                    <div className={`todo__tasks--radio ${task.isCompleted ? 'checked' : ''}`} onClick={(()=>{handleIsCompleted(task.id)})}></div>
                    <p className={`${task.isCompleted ? "underline": ""}`}>{task.task}</p>
                </div>
                <img className='todo__tasks--image' src={cross} alt='cross' onClick={()=>{handleRemoveTask(task.id)}}/>
            </div>
        )
    })

    useEffect(() => {
    }, [display, todos])

    function returnDisplay(){
        if(display === 'completed'){
            return tasksElementCompleted
        } else if (display === 'active'){
            return tasksElementActive
        } else {
            return tasksElement
        }
    }

    const taskLeft = () =>{
        let length 

        if(display === 'completed'){
            length = completedTasks.length
        } else if (display === 'active'){
            length = activeTasks.length
        } else {
            length = todos.length
        }
        return length
    }

  return (
    <div className={`todo container ${darkMode ? "": ""}`}>
        <form onSubmit={handleSubmit}>
            <input 
                className={`todo__input ${darkMode ? 'dark': ''}`}
                name='task'
                value={todoData.task}
                onChange={handleChange}
                autoComplete='off'
                type="text"
                placeholder='Create a new todo...'
            />
            <div className='todo__tasks--radio'></div>
        </form>

        <div className={`todo__tasks ${darkMode ? 'dark': ""}`}>
            
            {returnDisplay()}
            
            
            <div className='todo__tasks--info'>
                <div>
                    {taskLeft()} items left
                </div>
                <div className='clearTask' onClick={handleClearAllCompletedTasks}>
                    Clear Completed
                </div>
            </div>
        </div>

        <div className={`todo__tasks--display ${darkMode ? "dark" : ''}`}>
            <h5 onClick={handleAllTasks}>All</h5>
            <h5 onClick={handleTasksActive}>Active</h5>
            <h5 onClick={handleTasksCompleted}>Completed</h5>
        </div>

        <div className='todoApp--info'>
            Drag and drop to reorder list
        </div>
    </div>
  )
}

export default Todo