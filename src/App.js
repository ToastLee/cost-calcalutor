import React, { useCallback, useMemo, useState } from 'react';
import Form from "./components/Form";
import Header from "./components/Header";
import Lists from "./components/Lists";
import './App.css';

// 초기 비용 데이터를 로컬 스토리지에서 불러오거나 빈 배열로 초기화
const initialCostData = localStorage.getItem("costData")
  ? JSON.parse(localStorage.getItem("costData"))
  : [];

function App() {
  // 비용 데이터 상태와 항목 수정/삭제 여부를 관리하는 상태 정의
  const [costData, setCostData] = useState(initialCostData);
  const [isItemUpdated, setIsItemUpdated] = useState(false);
  const [isItemDeleted, setIsItemDeleted] = useState(false);

  // 항목을 수정하는 함수
  const handleUpdate = (id, newName, newValue) => {
    // 항목을 수정한 후 상태 업데이트 및 로컬 스토리지에 반영
    const updatedCostData = costData.map(item => {
      if (item.id === id) {
        const { id, costName } = item;
        return { id, costName: newName, costValue: newValue };
      }
      return item;
    });
    setCostData(updatedCostData);
    updateLocalStorage(updatedCostData);
    setIsItemUpdated(true); // 항목이 수정되었음을 표시
    setTimeout(() => setIsItemUpdated(false), 2000); // 2초 후에 표시 제거
  };

  // 항목을 삭제하는 함수
  const handleDelete = (id) => {
    // 항목을 삭제한 후 상태 업데이트 및 로컬 스토리지에 반영
    const updatedCostData = costData.filter(item => item.id !== id);
    setCostData(updatedCostData);
    updateLocalStorage(updatedCostData);
    setIsItemDeleted(true); // 항목이 삭제되었음을 표시
    setTimeout(() => setIsItemDeleted(false), 2000); // 2초 후에 표시 제거
  };

  // 항목을 클릭하여 삭제하는 함수
  const handleClick = useCallback((id) => {
    const newCostData = costData.filter((data) => data.id !== id);
    setCostData(newCostData);
    updateLocalStorage(newCostData);
  }, [costData]);

  // 새로운 비용 항목을 추가하는 함수
  const handleSubmit = (costName, costValue) => {
    const newCost = {
      id: Date.now(),
      costName,
      costValue,
      completed: false,
    };

    setCostData((prev) => [...prev, newCost]);
    updateLocalStorage([...costData, newCost]);
  };

  // 모든 항목을 삭제하는 함수
  const handleRemoveClick = () => {
    setCostData([]);
    updateLocalStorage([]);
  };

  // 로컬 스토리지에 비용 데이터를 업데이트하는 함수
  const updateLocalStorage = (data) => {
    localStorage.setItem('costData', JSON.stringify(data));
  };

  // 총 지출 비용을 계산하는 useMemo 사용
  const totalCost = useMemo(() => {
    return costData.reduce((acc, cost) => acc + parseFloat(cost.costValue), 0).toString();
  }, [costData]);

  // 애플리케이션 컴포넌트 렌더링
  return (
    <div className="flex flex-col h-screen">
      <Header isItemUpdated={isItemUpdated} isItemDeleted={isItemDeleted} />
      <div className="w-screen p-6 m-4 bg-white rounded-shadow">
        <div className="flex justify-between mb-3">
          <Form handleSubmit={handleSubmit} />
        </div>
        <Lists
          costData={costData}
          setCostData={setCostData}
          handleClick={handleClick}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
        <button className="btn-remove" onClick={handleRemoveClick}>목록 지우기</button>
      </div>
      <h1 className="w-full font-bold text-right text-4xl">총 지출: {totalCost}원</h1>
    </div>
  );
}

export default App;
