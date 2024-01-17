//function Component
import React, {useState} from "react";
import "./App.css";

export default function App() {
  //state로 만들기
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

//JSX 안에서 스타일링
const btnStyle = {
  color: "#fff",
  border: "none",
  padding: "5px, 9px",
  borderRadius: "50%",
    cursor: "pointer",
    float: "right"
  }
// 목록 아래 점선 만들기 
const getStyle = () => {
  return {
    padding: "10px",
    borderBottom: "1px #ccc dotted",
    textDecoration: 'none'
  }
}
// 할일 목록에 줄 긋기 (완료표시)
const listStyle = (completed) => {
  return {
    padding: "10px",
    borderBottom: "1px #ccc dotted",
    //데코가 컴플이면? 줄긋기, 아니면 냅두기
    textDecoration: completed ? "line-through" : "none",
  };
};

//클릭한 id만 제거하고 나머지는 유지
const handleClick = (id) => {
  let newTodoData = todoData.filter(data => data.id !==id)
  //State을 이용해 삭제
  console.log("newTodoData", newTodoData);
  setTodoData(newTodoData);
};

const handleChange = (e) => {
  setValue(e.target.value);
}

const handleSubmit = (e) => {
  //form 안에 input 전송시 페이지 리로드 막기
  e.preventDefault();

  //새로운 할 일 데이터
  let newTodo = {
    id: Date.now(),
    title: value,
    completed: false,
  }

  // 원래 있던 할일에 새로운 할 일 추가하기(전개 연산자로 더해줌), 입력란에 글씨 지워주기
  //전 todo 데이터를 넣어주고 새로 투두 데이터를 추가 
  setTodoData((prev) => [...prev, newTodo]);
  setValue("");
}

//체크 박스 클릭해서 완료상태로 바꾸기
const handleCompleteChange = (id) => {
  let newTodoData = todoData.map((data) => {
    //클릭한 것과 그 state안에 있는 것 중 하나가 같다면 반대 속성으로 토글
    if (data.id === id) {
      data.completed = !data.completed;
    }
    return data;
  });

  setTodoData(newTodoData);
};


    return (
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할 일 목록</h1>
          </div>
          {todoData.map((data) => (
            <div style={listStyle(data.completed)} key={data.id}>
              <p>
                <input 
                type="checkbox"
                //체크박스에 변화가 생기면 data.id를 콜하기
                onChange={() => handleCompleteChange(data.id)} 
                defaultChecked={false} 
                /> {" "}
                {data.title}
                <button 
                  style={btnStyle} 
                  onClick={() => handleClick(data.id)}
                >
                  x
                </button>
              </p>
            </div>
          ))}

          {/* 할일 목록 입력 UI */}
          <form style={{display: 'flex'}} onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="value"
              style={{ flex: '10', padding: '5px'}}
              placeholder="해야 할 일을 입력하세요."
              value={value}
              onChange={handleChange}
            />

            {/*입력 버튼 UI*/}
            <input
              type="submit"
              value="입력"
              className="btn"
              style={{flex: '1'}}
            />
          </form>

        </div>
      </div>
    )
}