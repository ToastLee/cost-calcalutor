import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import List from "./List";

const Lists = React.memo(({todoData, setTodoData, handleClick}) => {
  const handleEnd = (result) => {
    // result 매개 변수에 source 항목 및 대상 위치와 같은 드래그 이벤트 정보 포함
    console.log('result',result);

    // 드래그가 취소하면 종료하기 
    if(!result.destination) return;

    //리액트 불변성 만들어주기 (리액트의 효율적인 상태 업데이트를 위함)
    const newTodoData = todoData;
    
    //1.변경시키는 아이템을 배열에서 지우기
    //2.return 값으로 지워진 아이템을 가져옴
    const [reorderItem] = newTodoData.splice(result.source.index, 1);

    //원하는 자리에 reorderItem을 insert 해준다.
    newTodoData.splice(result.destination.index, 0, reorderItem);
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <List 
                      handleClick={handleClick}
                      key={data.id}
                      id={data.id}
                      title={data.title}
                      completed={data.completed}
                      todoData={todoData}
                      setTodoData={setTodoData}
                      provided={provided}
                      snapshot={snapshot}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
});

export default Lists