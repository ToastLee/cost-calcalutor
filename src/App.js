import React, { useCallback, useMemo, useState } from 'react';
import Form from "./components/Form";
import Header from "./components/Header";
import Lists from "./components/Lists";
import './App.css';

const initialCostData = localStorage.getItem("costData")
  ? JSON.parse(localStorage.getItem("costData"))
  : [];

function App() {
  const [costData, setCostData] = useState(initialCostData);
  const [isItemUpdated, setIsItemUpdated] = useState(false);
  const [isItemDeleted, setIsItemDeleted] = useState(false);

  const handleUpdate = (id, newName, newValue) => {
    const updatedCostData = costData.map(item => {
      if (item.id === id) {
        const { id, costName } = item;
        return { id, costName: newName, costValue: newValue };
      }
      return item;
    });
    setCostData(updatedCostData);
    updateLocalStorage(updatedCostData);
    setIsItemUpdated(true);
    setTimeout(() => setIsItemUpdated(false), 2000);
  };

  const handleDelete = (id) => {
    const updatedCostData = costData.filter(item => item.id !== id);
    setCostData(updatedCostData);
    updateLocalStorage(updatedCostData);
    setIsItemDeleted(true);
    setTimeout(() => setIsItemDeleted(false), 2000);
  };

  const handleClick = useCallback((id) => {
    const newCostData = costData.filter((data) => data.id !== id);
    setCostData(newCostData);
    updateLocalStorage(newCostData);
  }, [costData]);

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

  const handleRemoveClick = () => {
    setCostData([]);
    updateLocalStorage([]);
  };

  const updateLocalStorage = (data) => {
    localStorage.setItem('costData', JSON.stringify(data));
  };

  const totalCost = useMemo(() => {
    return costData.reduce((acc, cost) => acc + parseFloat(cost.costValue), 0).toString();
  }, [costData]);

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
