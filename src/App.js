import React, {useState, useCallback} from "react";
import "./App.css";
import Lists from "./components/Lists";
import Form from "./components/Form";

//로컬데이터에 존재하면 가져오고 없으면 빈 공간으로 가져오기
const initialTodoData = localStorage.getItem("todoData")
  ? JSON.parse(localStorage.getItem("todoData"))
  : [];

function App() {
  //state로 만들기
  const [todoData, setTodoData] = useState(initialTodoData);
  const [value, setValue] = useState("");

  //클릭한 id만 제거하고 나머지는 유지
  //useCallback todoData가 변경시에만 다시 생성하게 만듦
  const handleClick = useCallback((id) => {
    let newTodoData = todoData.filter((data) => data.id !==id)
    //State을 이용해 삭제
    console.log("newTodoData", newTodoData);
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
    },
    [todoData]
  );

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
  localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo]));
  setValue("");
  };

  //할 일 목록 모두 지우기 
  const handleRemoveClick = () => {
    setTodoData([]);
    localStorage.setItem('todoData', JSON.stringify([]));
  }

  return (
    <div className="flex items-center justify-center w-screen bg-blue-100">
      <div  className="w-full p-6 m-4 bg-white rounded-shadow md:w-3/4 md:max-w-lg lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
          <button onClick={handleRemoveClick}>Delete All</button>
        </div>
        <Lists handleClick={handleClick} todoData={todoData} setTodoData={setTodoData}/>
        
        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
        
      </div>
    </div>
  );
}

export default App;