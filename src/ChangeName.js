import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import { Droppable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';

let nameValue = '';
let oldName = '';
let oldPhone = '';
let phoneValue = '';
let genderValue = '';
let phoneTF = false;
let nameTF = false;
let genderTF = false;

const ChangeName = () => {
    const [nameId, setNameId] = useState('');
    const [phoneId, setPhoneId] = useState('');
    const [genderId, setGenderId] = useState('');
    const [userName, setUserName] = useState('');
    const [users, setUsers] = useState([]);
    const [onDragEnd, setOnDragEnd] = useState('');

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

      //이름을 누르면 번호 input을 사라지게 하기 위해 true/false 설정
      nameTF = true;
      phoneTF = false;
    };

    const nameEvent = e => {
      let newName = e.target.value;
      let params = new URLSearchParams();
      params.append('oldName', oldName);
      params.append('newName', newName);
      //const url = "http://localhost:8080/name";
      if(e.keyCode === 13){
        axios.put("/name", params)
      .then(function (response){
        if(response.data === 1) {
          window.location.replace("/");
        } else {
          alert("오류");
        }
      })
      .catch(function(error) {
        console.log("오류");
      });
      }
    };

    const phoneEvent = e => {
      let newPhone = e.target.value;
      console.log(newPhone);
      let params = new URLSearchParams();
      params.append('oldPhone', oldPhone);
      params.append('newPhone', newPhone);
      //const url = "http://localhost:8080/name";
      if(e.keyCode === 13){
        console.log(oldPhone);
        axios.put("/phone", params)
      .then(function (response){
        if(response.data === 1) {
          window.location.replace("/");
        } else {
          alert("오류");
        }
      })
      .catch(function(error) {
        console.log("오류");
      });
      }
    }

    const onClickPhone = e => {
      const phoneId = e.target.parentNode.id;
      oldPhone = e.target.innerText;

      phoneValue = phoneId;

      console.log("폰번호", oldPhone);

      //번호를 누르면 이름은 input 이 사라지게 하기 위해 true/false 지정
      nameTF = false;
      phoneTF = true;
    }

    const onClickGender = e => {
      const genderId = e.target.parentNode.id;
      let oldGender = e.target.innerText;

      genderValue = genderId;
      console.log("genderId", genderId);
    }

    return (
    <div className="App">
          <div className="title-area"><h1>ReactJS CRUD</h1></div>
          <div className="cont-area">
          <div className="tbl-area">
              {
                users.map(
                  (user, index) => (
                    <div className="user-area"><div className="user-no" key={index}><span className="cir">{user.no}</span></div>
                    {/* 내가 누른 이름의 아이디와 리스트의 아이디가 같으면 input 태그로 바꾸기 */}
                    {nameValue === "name" + (index + 1) && nameTF === true ? <div className="user-name" id={nameId}><span className="name-list"><input type="text" id="newName" size="5" className="nameinput" onKeyUp={nameEvent}/></span></div>
                    : <div className="user-name" id={"name" + (index + 1)}><span className="name-list" onClick={onClickName}>{user.name}</span></div>}
                    {/* 내가 누른 폰 번호의 아이디와 리스트의 아이디가 같으면 input 태그로 바꾸기 */}
                    {phoneValue === "phone" + (index + 1) && phoneTF === true ? <div className="user-phone" id={phoneId}><span className="phone-list"><input type="text" id="newPhone" size="5" className="phoneInput" onKeyUp={phoneEvent}/></span></div>
                    : <div className="user-phone" id={"phone" + (index + 1)}><span className="phone-list" onClick={onClickPhone}>{user.phone}</span></div>}
                    {genderValue === "gender" + (index + 1) && genderTF === true ? <div className="user-gender" id={"gender" + (index + 1)}>{user.gender === 'F' ? <span className="gender-list">👩</span> : <span className="gender-list">👨</span> }</div> : <div className="user-gender" id={"gender" + (index + 1)}>{user.gender === 'F' ? <span className="gender-list" onClick={onClickGender}>👩</span> : <span className="gender-list">👨</span> }</div>}
                  </div>
                  
                  ))
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