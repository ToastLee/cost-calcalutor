import React, {useState} from "react";

const List = React.memo(({
  id, 
  title, 
  completed, 
  todoData, 
  setTodoData, 
  provided, 
  snapshot,
  handleClick,
}) => {
  // 다른 UI제공을 위한 State 생성
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

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
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
  };
  
  const handleEditChange = (event) => {
    setEditedTitle(event.target.value);
  }
  
  const handleSubmit = (event) => {
    //폼이 제출되면 페이지 새로고침 막기
    event.preventDefault();
    
    //새로운 배열로 변경하기
      let newTodoData = todoData.map((data)=> {
        //만약 현재 요소의 id가 어떤 변수 id와 일치할 경우 title 값을 editedTitle로
        if(data.id === id) {
          data.title = editedTitle;
        }
        //바뀐 값을 전달해주고
        return data;
      });
      //바뀐 값을 투두 데이터에 저장하고, 수정상태를 불가로 변경
      setTodoData(newTodoData);
      localStorage.setItem('todoData', JSON.stringify(newTodoData));
      setIsEditing(false);
  }
  
  if(isEditing) {
    return(
      <div className={`flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}>  
        <div className='items-center'>
          <form onSubmit={handleSubmit}>
            <input 
              value={editedTitle}
              onChange={handleEditChange}
              className="w-full px-3 py-2 mr-4 text-gray-500 rounded" 
            />
          </form>
        </div>
          <div className="items-center">
            <button className='px-4 py-2 float-right' 
              onClick={() => setIsEditing(false)}>
                x
            </button>
              {/* 수정하기 버튼 추가와 클릭시 수정 상태로 State 변경 */}
            <button
              onClick={handleSubmit}
              className='px-4 py-2 float-right'
              type="submit"
            >
              save
            </button>
        </div>
      </div>
    );
  } else {
  // 조건에 따른 UI렌더링 
      return (
        <div key={id} 
          {...provided.draggableProps} 
          ref={provided.innerRef} {...provided.dragHandleProps}
          className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"}
          flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
        >  
      <div className='items-center'>
            <input 
              type="checkbox"
              //체크박스에 변화가 생기면 data.id를 콜하기
              onChange={() => handleCompleteChange(id)} 
              defaultChecked={completed} 
            />{" "}
            <span 
            className={completed ? "line-through" : undefined}>
              {title}
            </span>
      </div>
          <div className="items-center">
            <button className='px-4 py-2 float-right' 
                onClick={() => handleClick(id)}>
                x
            </button>
            {/* 수정하기 버튼 추가와 클릭시 수정 상태로 State 변경 */}
            <button className='px-4 py-2 float-right' 
                onClick={() => setIsEditing(true)}>
                edit
            </button>
          </div>
        </div>
      );
    }
  }
);
//Lists로 연결하기
export default List;