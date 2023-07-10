"use client";
import { useState, useEffect } from "react";
import { RxTrash } from "react-icons/rx";

const page = () => {
  const [note, setNote] = useState("");
  const [newNotes, setnewNotes] = useState([]);

  useEffect(() => {
   let getList = sessionStorage.getItem('notebook');
   if(getList){
    setnewNotes(JSON.parse(getList))
   }
  },[])
  

  useEffect(() => {
    sessionStorage.setItem('notebook', JSON.stringify(newNotes))
  }, [newNotes])
  

  const handleChange = (e) => {
    setNote(e.target.value);
    // console.log(e.target.value);
  };

  const clickHandle = () => {
    if (note.trim() !== "") {
      setnewNotes([...newNotes, note]);
      setNote("");
    }
  };

  const trashNote = (e) => {
    let updateList = [...newNotes];
    updateList.splice(e, 1);
    setnewNotes(updateList)
  };

  return (
    <div className="card">
      <h2>Note Book</h2>
      <textarea
        value={note}
        onChange={handleChange}
        placeholder="Type your notes here..."
        name=""
        id=""
        cols="30"
        rows="10"
      ></textarea>
      <button onClick={clickHandle}>Add Note</button>
      <ul>
        {newNotes.map((element, index) => (
          <li key={index}>
            <p>{element}</p>
            <RxTrash onClick={trashNote} className="trashNote" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;
