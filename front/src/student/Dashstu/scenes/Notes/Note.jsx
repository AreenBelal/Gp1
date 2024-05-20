import { MdDelete } from "react-icons/md";
import './inde.css'

const Notes = ({id , text, date , handleDeleteNote}) => {
   
    return <div className="note"    > 
        <span style={{color:'black'}}> {text} </span>
        <div className="note-footer">
            <small style={{color:'black'}}>{date}</small>
            <MdDelete className='delete-icon' size = '16' style={{ 
                display: 'flex',
                justifyContent: 'flex-start',
                color:'black'
            }} onClick={ () => handleDeleteNote(id)}/>
        </div>
    </div>

}
 

export default Notes;
