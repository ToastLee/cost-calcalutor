import React, {Component} from "react";
import "./App.css";

export default class App extends Component {
  //state로 만들기
  state = {
    value: "",
    
    todoData : [
      {
        id: "1",
        title: "공부하기",
        completed: false
      },
      {
        id: "2",
        title: "청소하기",
        completed: false
      },
    ],
    
  }


//JSX 안에서 스타일링
btnStyle = {
  color: "#fff",
  border: "none",
  padding: "5px, 9px",
  borderRadius: "50%",
    cursor: "pointer",
    float: "right"
  }
// 목록 아래 점선 만들기 
getStyle = () => {
  return {
    padding: "10px",
    borderBottom: "1px #ccc dotted",
    textDecoration: 'none'
  }
}
// 할일 목록에 줄 긋기 (완료표시)
listStyle = (completed) => {
  return {
    padding: "10px",
    borderBottom: "1px #ccc dotted",
    //데코가 컴플이면? 줄긋기, 아니면 냅두기
    textDecoration: completed ? "line-through" : "none",
  };
};

//클릭한 id만 제거하고 나머지는 유지
handleClick = (id) => {
  let newTodoData = this.state.todoData.filter(data => data.id !==id)
  //State을 이용해 삭제
  this.setState({todoData: newTodoData });
};

handleChange = (e) => {
  this.setState({value: e.target.value});
}

handleSubmit = (e) => {
  //form 안에 input 전송시 페이지 리로드 막기
  e.preventDefault();

  //새로운 할 일 데이터
  let newTodo = {
    id: Date.now(),
    title: this.state.value,
    completed: false,
  }

  // 원래 있던 할일에 새로운 할 일 추가하기(전개 연산자로 더해줌), 입력란에 글씨 지워주기
  this.setState({todoData: [...this.state.todoData, newTodo], value: ""});
}

//체크 박스 클릭해서 완료상태로 바꾸기
handleCompleteChange = (id) => {
  let newTodoData = this.state.todoData.map((data) => {
    //클릭한 것과 그 state안에 있는 것 중 하나가 같다면 반대 속성으로 토글
    if (data.id === id) {
      data.completed = !data.completed;
    }
    return data;
  });

  this.setState({todoData: newTodoData});
};

  render() {
    return (
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할 일 목록</h1>
          </div>
          {this.state.todoData.map((data) => (
            <div style={this.listStyle(data.completed)} key={data.id}>
              <p>
                <input 
                type="checkbox"
                //체크박스에 변화가 생기면 data.id를 콜하기
                onChange={() => this.handleCompleteChange(data.id)} 
                defaultChecked={false} 
                /> {" "}
                {data.title}
                <button 
                  style={this.btnStyle} 
                  onClick={() => this.handleClick(data.id)}
                >
                  x
                </button>
              </p>
            </div>
          ))}

          {/* 할일 목록 입력 UI */}
          <form style={{display: 'flex'}} onSubmit={this.handleSubmit}>
            <input 
              type="text" 
              name="value"
              style={{ flex: '10', padding: '5px'}}
              placeholder="해야 할 일을 입력하세요."
              value={this.state.value}
              onChange={this.handleChange}
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
}