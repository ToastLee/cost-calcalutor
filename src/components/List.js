import React, { useState } from 'react';

const List = React.memo(({ id, costName, costValue, setCostData, handleDelete, handleUpdate }) => {
  // 상태 변수를 사용하여 현재 항목이 편집 모드인지 여부를 관리
  const [isEditing, setIsEditing] = useState(false);
  const [editedCostName, setEditedCostName] = useState(costName);
  const [editedCostValue, setEditedCostValue] = useState(costValue);

  // 입력 필드 값이 변경될 때 호출되는 함수
  const handleEditChange = (event) => {
    if (event.target.name === 'costName') {
      setEditedCostName(event.target.value);
    } else if (event.target.name === 'costValue') {
      setEditedCostValue(event.target.value);
    }
  };

  // 수정된 데이터를 저장하고 편집 모드를 종료하는 함수
  const handleSubmit = (event) => {
    event.preventDefault();
    // 수정된 데이터를 상위 컴포넌트로 전달하기 위해 handleUpdate 함수 호출
    handleUpdate(id, editedCostName, editedCostValue);
    setIsEditing(false); // 편집 모드 종료
  };

  return isEditing ? ( // 수정 상태인 경우에 렌더링되는 부분
    <div className="flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded">
      <div className="items-center">
        <form onSubmit={handleSubmit}>
          <input
            name="costName"
            value={editedCostName}
            onChange={handleEditChange}
            className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
          />
          <input
            name="costValue"
            value={editedCostValue}
            onChange={handleEditChange}
            className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
          />
          <button className="px-4 py-2" type="submit">
            저장
          </button>
          <button className="px-4 py-2" onClick={() => setIsEditing(false)}>
            취소
          </button>
        </form>
      </div>
    </div>
  ) : ( // 일반적으로 렌더링되는 부분
    <div
      key={id}
      className="flex items-center justify-between px-4 py-1 my-2 text-gray-600 border rounded"
    >
      <div className="items-center">
        <span>{costName} - {costValue}</span>
      </div>
      <div className="items-center">
        <button className="px-4 py-2 float-right" onClick={() => handleDelete(id)}>
          삭제
        </button>
        <button className="px-4 py-2 float-right" onClick={() => setIsEditing(true)}>
          수정
        </button>
      </div>
    </div>
  );
});

export default List;
