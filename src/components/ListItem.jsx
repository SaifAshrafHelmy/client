import TickIcon from './TickIcon'
import ProgressBar from './ProgressBar'
import { useState } from 'react';
import Modal from './Modal';


const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false)


  const deleteTodo = async ()=>{
    // console.log("deleting..");
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${task.id}`, {
        method: "DELETE",
      })

      if(response.status == 200){
        // console.log("deleted successfully (from react)")
        getData()
      }
    } catch (error) {
      console.error(error)
      }
  }

  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon/>
        <p className="task-title">{task.title}</p>
        <ProgressBar/>
      </div>
      <div className="button-container">
        <button className='edit' onClick={()=> setShowModal(true)} >Edit</button>
        <button className='delete' onClick={deleteTodo}>Delete</button>
      </div>
      {showModal && <Modal mode={'edit'} setShowModal={setShowModal} task={task} getData={getData}/>}

    </li>
  );
};

export default ListItem;
