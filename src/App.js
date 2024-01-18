import React, {useState} from "react";
import "./App.css";
import List from "./components/List";
import Form from "./components/Form";

export default function App() {
  //state로 만들기
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    //form 안에 input 전송시 페이지 리로드 막기
    e.preventDefault();

  //새로운 할 일 데이터
  let newTodo = {
    id: Date.now(),
    title: value,
    completed: false,
  };

  // 원래 있던 할일에 새로운 할 일 추가하기(전개 연산자로 더해줌), 입력란에 글씨 지워주기
  //전 todo 데이터를 넣어주고 새로 투두 데이터를 추가 
  setTodoData((prev) => [...prev, newTodo]);
  setValue("");
  };

  return (
    <div className="flex items-center justify-center w-screen bg-blue-100">
      <div  className="w-full p-6 m-4 bg-white rounded-shadow md:w-3/4 md:max-w-lg lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
        </div>
        <List todoData={todoData} setTodoData={setTodoData}/>
        
        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
        
      </div>
    </div>
  );
}