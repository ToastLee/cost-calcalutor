import React from 'react';
import List from "./List";

//app.js로 부터 속성 받아오기
const Lists = React.memo(({ costData, setCostData, handleClick, handleUpdate, handleDelete }) => {
  return (
    <div>
      {costData.map((data) => (
        <List
        key={data.id}
        id={data.id}
        costName={data.costName}
        costValue={data.costValue}
        handleClick={handleClick}
        costData={costData}
        setCostData={setCostData}
        handleUpdate={handleUpdate}
        handleDelete={() => handleDelete(data.id)}
      />
      ))}
    </div>
  );
});

export default Lists;
