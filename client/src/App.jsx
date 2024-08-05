
import React,{ useEffect,useState } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [users, setusers] = useState([]);
  const [filterUsers, setfilterUsers]= useState([]);
  const [isModel, setisModel] = useState(false);
  const [userData, setuserData] = useState({name:"",age:"",city:""})

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

//handle model
const handleModel=()=>{
  setisModel(true);
  setuserData({name:"",age:"",city:""});
}

//close model
const closeModel = ()=>{
  setisModel(false);
  getalluser();
}

//handle data
const handleData = (e) =>{
setuserData({...userData,
  [e.target.name]:e.target.value})
  console.log(e.target.value);
  
}

//handle submit
const handleSubmit = async (e) => {
 
  e.preventDefault();
  if(userData.id)
    {await axios.patch(`http://localhost:8000/users/${userData.id}`, userData).then
    ((res)=>{console.log(res);
  });
}

else{
  await axios.post("http://localhost:8000/users",userData).then((res)=>{
console.log(res);
});

closeModel()
setuserData({name:"",age:"",city:""});
}}

 
//handle edit
const handleEdit=(user)=>{
setisModel(true);
setuserData(user)
console.log(user);

}
  


return (
    <>
      <div id='container'>
       <h3>CRUD Application with React.js Frontend & Node.js Backend</h3>
       <div className='inputbox'> 
         <input onChange={userSearch} type="search" placeholder='Search Text Here'/>
         <button className='btn' onClick={handleModel}>Add Record</button>
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
                  <td><button className="btn" onClick={()=>handleEdit(user)}>Edit</button></td>
                  <td><button onClick={()=>{handleDelete(user.id)}} className="btn red">Delete</button></td>
                </tr>
                )
              })} 
               </tbody>
            </table>
            {isModel && 
            <div className='model'>
              <div className='model-content'>
                <span className='close' onClick={closeModel}>&times;</span>
                <h2>{userData.id ? "Edit Record" : "Add Record"}</h2>
                <div className='inputgroup'>
                  <label htmlFor="name">Name</label>
                  <input onChange={handleData} type="text" name='name' id='name' value={userData.name} />
                </div>
                <div className='inputgroup'>
                  <label htmlFor="age">Age</label>
                  <input onChange={handleData} type="number" name='age' id='age' value={userData.age}/>
                </div>
                <div className='inputgroup'>
                  <label htmlFor="city">City</label>
                  <input onChange={handleData} type="text" name='city' id='city' value={userData.city}/>
                </div>
                <div className='inputgroup'><button className='btn green' onClick={handleSubmit}>{userData.id ? "update":"Add"}</button></div>
              </div>
              </div>}
       </div>
    </> )
}



export default App
