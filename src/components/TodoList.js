import { useState, useEffect } from 'react';
import {v4 as uuidv4} from 'uuid';
import group from '../img/group.png';
import { ToastContainer, toast } from 'react-toastify'


const getLocalItems=()=>{
    let list = localStorage.getItem('lists');
    if(list){
        return JSON.parse(localStorage.getItem('lists'));
    }else{
        return [];
    }
}

const TodoList = () => {

    const [lists, setLists] = useState(getLocalItems());
    const [text, setText] = useState('');

    const changeHandle=(e)=>{
        setText(e.target.value);
    }

    const addTodo=(e)=>{
        e.preventDefault();
        if(text.length>0){
             setLists([ {id: uuidv4(), text: text, complete: false}, ...lists])
             setText('');
             toast.success('New task added !', {
                  position: toast.POSITION.TOP_RIGHT
             });
            }else{
                toast.error('Please, enter a task in the input !', {
                    position: toast.POSITION.TOP_RIGHT
               });
            }
    }

    const deleteAll=()=>{
        setLists([]);
        toast.success('All tasks are deleted !', {
            position: toast.POSITION.TOP_RIGHT
       });
    }

    const deleteOne=(id)=>{
        setLists(lists.filter(list=>
            list.id !==id
            ))
            toast.success('Task deleted !', {
                position: toast.POSITION.TOP_RIGHT
           });
    }
    
    const onComplete=(list)=>{
        setLists(lists.map((item) =>item.id === list.id ? { ...item, complete: !item.complete } : item))
    }

    useEffect(()=>{
        localStorage.setItem('lists', JSON.stringify(lists))
    },[lists])

  return (
        <div>
            <div className='head'></div>
            <div className="todo">
                <div className='total'>
                    <h2>TODO</h2>
                    <form>
                        <input type="text" 
                               value={text} 
                               onChange={changeHandle} 
                               placeholder="Tapşırığı daxil edin"
                        />
                        <button onClick={addTodo}>+</button>
                    </form> 

                    <div className="list">
                        {lists.length>0 ?
                            <ul>
                                {lists.map((list)=>(
                                    <li key={list.id}>
                                        <div>
                                            <button onClick={()=>onComplete(list)} 
                                                    className={list.complete ? 'compl' : '' }>
                                                    {list.complete ? <i className="fa-solid fa-check"></i> : ''}
                                            </button>
                                            <p className={list.complete ? 'completed' : ''} >   
                                                {list.text}
                                            </p>
                                        </div>

                                        <i className="fa-solid fa-trash-can delete" 
                                           title='Delete' 
                                           onClick={()=>deleteOne(list.id)}>
                                        </i>
                                    </li>
                                ))}
                            </ul>
            
                        : 

                            <div className='nolist'>
                                <img src={group} alt="err"/>
                                <p>Heç bir tapşırıq yoxdur.</p>
                            </div>
                        }
            
                        <div className="end">
                            <div className="text">
                                <p>Ümumi: {lists.length} tapşırıq</p>
                                <p>Hazır: {  lists.filter(list=>(list.complete === true)).length} tapşırıq</p>
                            </div>
         
                            <p className="alldelete" onClick={deleteAll}>Hamısını sil</p>
                        </div>
           
                    </div>
                </div>
         </div>
         <ToastContainer />
    </div>
  )
}

export default TodoList