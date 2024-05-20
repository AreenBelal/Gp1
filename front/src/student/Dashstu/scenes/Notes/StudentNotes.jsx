import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'
import NoteList from './Notelist';
import Search from './Search'
import Header from './Header'
import './StudentNotes.css'


const StudentNotes = () => {
  const [notes, setNotes] = useState([
    {
        id: nanoid(),
        text: 'First Name 1',
        date: '1/1/2024',
      },
      {
       id: nanoid(),
       text: 'First Name 2',
       date: '6/2/2024',
     },
     {
       id: nanoid(),
       text: 'First Name 3',
       date: '3/3/2024',
     }
     ]);

  const [searchText, setSearchText] = useState('')
  const [darkMode , setDarkMode] = useState(false)
  const deleteNote = (id) => {
    const  newNotes = notes.filter((note) => note.id  !== id);
    setNotes(newNotes);

  }

  useEffect(() => {
    const saveNotes = 
    JSON.parse(localStorage.getItem('react-note'))
    if(saveNotes) {
      setNotes(saveNotes);
    }
  },[])

  useEffect(() => {
    localStorage.setItem('react-note',
    JSON.stringify(notes));
  }, [notes])

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    }
    const newNotes = [...notes, newNote]
    setNotes(newNotes);
  } 

  

  return <div className={`${darkMode && 'dark-mode'}`}>
  <div style={{width:'90%'}} className="container">
      <Header handleToggleMode = {setDarkMode} />
      <Search handleSearch={setSearchText}/>
      <NoteList notes = {notes.filter((note) => note.text.toLowerCase().includes(searchText))} 
       handleAddNote = {addNote}
       handleDeleteNote = {deleteNote}/>
    </div>
    </div>
}



export default StudentNotes ; 
