import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';

let nameValue = '';
let oldName = '';

const ChangeName = () => {
    const [nameId, setNameId] = useState('');
    const [userName, setUserName] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
        const result = await axios(
          "member"
        );
        setUsers(result.data);
      };
      fetchData();
    });
  
    const onClickName = e => {
      const nameId = e.target.parentNode.id;
      oldName = e.target.innerText;
      console.log("이름: ", oldName);
      console.log("아이디: ", nameId);

      nameValue = nameId;
    };

    const enterEvent = e => {
      let newName = e.target.value;
      console.log(newName);
      if(e.keyCode === 13){
        axios.put(oldName, {
        //oldName: oldName,
        newName: newName
      })
      .then(function (response){
        console.log(response.data);
        if(response.data === 1) {
          alert("성공~");
        } else {
          alert("오류");
        }
      })
      .catch(function(error) {
        console.log("오류");
      });
      }
    };

    return (
    <div className="App">
          <div className="title-area"><h1>ReactJS CRUD</h1></div>
          <div className="cont-area">
          <div className="tbl-area">
             {
              users.map(
                (user, index) => (
                  <div className="user-area"><div className="user-no" key={index}><span className="cir">{user.no}</span></div>
                  {nameValue === "name" + (index + 1) ? <div className="user-name" id={nameId}><span className="name-list"><input type="text" id="newName" size="5" className="nameinput" onKeyUp={enterEvent}/></span></div>
                  : <div className="user-name" id={"name" + (index + 1)}><span className="name-list" onClick={onClickName}>{user.name}</span></div>}
                <div className="user-phone">{user.phone}</div><div className="user-gender">{user.gender === 'F' ? '👩' : '👨' }</div></div>))
             }
          </div>
          <div className="btn-area">
          </div>
          <div className="add-area"></div>
          <div className="submit-area"></div>
          </div>
         </div>
    );
  };


export default ChangeName;