
import { useState } from 'react';
import './inde.css'

const AddNote = ({handleAddNote} ) => {
	const [noteText, setNoteText] = useState();
	const characterLimit = 200
	const handleChange = (event) => {
		if (characterLimit - event.target.value.length >= 0 ){
			setNoteText(event.target.value);
		}
	}	

	const handleSave = () => {
		if(noteText.trim().length > 0){
			handleAddNote(noteText)
		setNoteText('')
		}
	}

    return (
 		<div className='note new' >
		
			<textarea
				rows='10'
				cols='10'
 				placeholder='اكتب ملاحظتك هُنا'
				value={noteText}
				onChange={handleChange}
			
			>
			
			</textarea>

			<div className='note-footer'>
				 
				<button className='save' onClick={handleSave} >
					حفظ
				</button>
			</div>
		</div>
	);
};

export default AddNote;