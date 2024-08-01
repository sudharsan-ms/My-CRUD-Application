
import React,{ useEffect,useState } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [users, setusers] = useState([]);
  const [filterUsers, setfilterUsers]= useState([]);

const getalluser = async () => {
  await axios.get("http://localhost:8000/users").then
  ((res) => {
  setusers(res.data);
  setfilterUsers(res.data)
  console.log(res.data);

 })
 .catch((error)=>{
   console.log(error.response.data);
 })
 
};
useEffect( () => {
    getalluser();
  },[]);
//user search function
const userSearch = (e)=> {
const searchtext = e.target.value.toLowerCase();
console.log(searchtext);
const filtereduser = users.filter((user)=> user.name.toLowerCase().includes(searchtext) || 
user.city.toLowerCase().includes(searchtext))

setfilterUsers(filtereduser);
}

//deleting function
const handleDelete = async(id) =>{
  await axios.delete(`http://localhost:8000/users/${id}`)
  .then((res)=>{
    setusers(res.data);
    setfilterUsers(res.data)
    console.log(res.data);
  })
  .catch ((error)=>{
    console.log(error.response.data);
  })

  console.log(id);

};

return (
    <>
      <div id='container'>
       <h3>CRUD Application with React.js Frontend & Node.js Backend</h3>
       <div className='inputbox'> 
         <input onChange={userSearch} type="search" placeholder='Search Text Here'/>
         <button className='btn'>Add Reacord</button>
         </div>
         <table className='tablecontainer'>
          <thead> 
             <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            </thead>
            <tbody>
              { filterUsers && filterUsers.map((user, index)=>{
                return(
                  <tr key={user.id}>  
                  <td>{index+1}</td>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.city}</td>
                  <td><button className="btn">Edit</button></td>
                  <td><button onClick={()=>{handleDelete(user.id)}} className="btn red">Delete</button></td>
                </tr>
                )
              })} 
               </tbody>
            </table>
       </div>
    </> )
}

export default App
