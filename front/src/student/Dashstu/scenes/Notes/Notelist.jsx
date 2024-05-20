
import Notes from './Note';
import AddNote from './addNote';

const NoteList = ({notes, handleAddNote, handleDeleteNote}) => {

    return <div className="notes-list">
     { notes.map(note => (
        <Notes id={note.id} 
        text={note.text} 
        date={note.date}
        handleDeleteNote = {handleDeleteNote}
         />))}
         <AddNote handleAddNote={handleAddNote}/>
    </div>
    
    
}




export default NoteList;