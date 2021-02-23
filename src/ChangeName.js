import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';

let nameValue = '';
let oldName = '';
let oldPhone = '';
let phoneValue = '';
let genderValue = '';
let phoneTF = false;
let nameTF = false;
let genderTF = false;
let cirTF = false;

const ChangeName = () => {
    const [nameId, setNameId] = useState('');
    const [phoneId, setPhoneId] = useState('');
    const [genderId, setGenderId] = useState('');
    const [phone, setPhone] = useState('');
    const [users, setUsers] = useState([]);
    const [onDragEnd, setOnDragEnd] = useState('');
    const [user, updateUsers] = useState(users);

    useEffect(() => {
      const fetchData = async () => {
        const result = await axios.get(
          "/list"
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

    const onClickAddBtn = e => {
      cirTF = true;
    }

    const onClicksubmit = e => {
      let name = document.getElementById("inputName").value;
      let phone = document.getElementById("inputPhone").value;
      let gender = document.getElementById("genderSelect").value;


      let params = new URLSearchParams();
      params.append('name', name);
      params.append('phone', phone);
      params.append('gender', gender);
      axios.post("/member", params)
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

      console.log(name);
      console.log(phone);
      console.log(gender);
    }


    function handleOnDragEnd(result) {
      /**
     * 필요한 요소
     *  드래그할 대상의 index
     *  드래그가 끝났을때의 index
     *
     * 할 일
     * 1. 드래그할 대상의 index를 지운다
     * 2. 드래그가 끝난 당시의 index에 현재 드래그 중인 요소를 넣는다
     */
    if(!result.destination) return;
    
    
    const currentTags = [...users];
    const draggingItemIndex = result.source.index + 1;
    const afterDragItemIndex = result.destination.index + 1;
    
    const removeTag = currentTags.splice(draggingItemIndex, 1);
    
      console.log('result?', result);
      console.log(currentTags);
      console.log(draggingItemIndex);
      console.log(afterDragItemIndex);
      console.log(removeTag);


      currentTags.splice(afterDragItemIndex, 0, removeTag[0]);

      updateUsers(currentTags);

      let params = new URLSearchParams();
      params.append('no', draggingItemIndex);
      axios.delete("/delMember", params)
      .then(function (response) {
        if(response.data === 1) {
          window.location.replace("/");
        } else {
          alert("오류");
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });

      // const items = Array.from(users);
      // const [reorderedItem] = items.splice(result.source.index + 1, 1);
      // items.splice(result.destination.index + 1, 0, reorderedItem);

      // updateUsers(items);

      // console.log(items);
      // console.log([reorderedItem]);

    }

    const removeItem = (index) => {
      this.state.items.splice(index, 1);
    }

    return (
    <div className="App">
          <div className="title-area"><h1>ReactJS</h1></div>
          <div className="cont-area">
          <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="user">
            {provided => (
          <div className="tbl-area" {...provided.droppableProps} ref={provided.innerRef}>
              {
                users.map(
                  (user, index) => {
                    return(
                    <Draggable key={user.no} draggableId={`${user.no}`} index={index}>
                      {provided => (
                    <div className="user-area" id={"user" + (index + 1)} key={user.id} {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}><div className="user-no" key={index}><span className="cir">{user.no}</span></div>
                    {/* 내가 누른 이름의 아이디와 리스트의 아이디가 같으면 input 태그로 바꾸기 */}
                    {nameValue === "name" + (index + 1) && nameTF === true ? <div className="user-name" id={nameId}><span className="name-list"><input type="text" id="newName" size="5" className="nameinput" onKeyUp={nameEvent}/></span></div>
                    : <div className="user-name" id={"name" + (index + 1)}><span className="name-list" onClick={onClickName}>{user.name}</span></div>}
                    {/* 내가 누른 폰 번호의 아이디와 리스트의 아이디가 같으면 input 태그로 바꾸기 */}
                    {phoneValue === "phone" + (index + 1) && phoneTF === true ? <div className="user-phone" id={phoneId}><span className="phone-list"><input type="text" id="newPhone" size="5" className="phoneInput" onKeyUp={phoneEvent}/></span></div>
                    : <div className="user-phone" id={"phone" + (index + 1)}><span className="phone-list" onClick={onClickPhone}>{user.phone}</span></div>}
                    {/* 성별 바꾸기 해야함 */}
                    {genderValue === "gender" + (index + 1) && genderTF === true ? <div className="user-gender" id={"gender" + (index + 1)}>{user.gender === 'F' ? <span className="gender-list" onClick={onClickGender}>👩</span> : <span className="gender-list" onClick={onClickGender}>👨</span> }</div> 
                    : <div className="user-gender" id={"gender" + (index + 1)}>{user.gender === 'F' ? <span className="gender-list" onClick={onClickGender}>👩</span> : <span className="gender-list" onClick={onClickGender}>👨</span> }</div>}
                  </div>
                  )}
                  </Draggable>
                  );
                })}
              {provided.placeholder}
          </div>
          )}
          </Droppable>
          </DragDropContext>
          {cirTF === true ? <div className="user-area2"><div className="user-name"><input type="text" size="5" className="nameinput" id="inputName" placeholder="이름"/></div><div className="user-phone"><input type="text" size="5" id="inputPhone" className="phoneInput" placeholder="핸드폰 번호"/></div><div className="user-gender"><select className="selectbox" id="genderSelect"><option value="F">👩</option><option value="M">👨</option></select></div><div className="submit-form"><span className="submit-btn" onClick={onClicksubmit}>전송</span></div></div> : <div className="submit-area"><span className="cir2" onClick={onClickAddBtn}>+</span></div>}
          </div>
         </div>
    );
  };


export default ChangeName;