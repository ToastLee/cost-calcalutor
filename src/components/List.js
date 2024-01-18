import React from 'react'

export default function List({todoData, setTodoData}) {


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

  //클릭한 id만 제거하고 나머지는 유지
  const handleClick = (id) => {
    let newTodoData = todoData.filter((data) => data.id !==id)
    //State을 이용해 삭제
    console.log("newTodoData", newTodoData);
    setTodoData(newTodoData);
  };

  return (
    <div>
      {todoData.map((data) => (
        <div key={data.id}>
          <div className='flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded'>
            <div>
              <input 
                type="checkbox"
                //체크박스에 변화가 생기면 data.id를 콜하기
                onChange={() => handleCompleteChange(data.id)} 
                defaultChecked={data.completed} 
              />{" "}
              <span className={data.completed ? "line-through" : undefined}>{data.title}</span>
            </div>
            <div className="items-center">
              <button className='px-4 py-2 float-right' onClick={() => handleClick(data.id)}>x</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
