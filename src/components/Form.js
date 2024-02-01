import React, { useState } from 'react';

function Form({ handleSubmit }) {
  // 입력값을 저장하기 위한 상태 변수 정의
  const [costName, setCostName] = useState("");    // 지출 항목 이름을 저장하는 상태
  const [costValue, setCostValue] = useState("");  // 비용을 저장하는 상태

  // 폼 제출을 처리하는 함수
  const handleFormSubmit = (e) => {
    e.preventDefault();  // 기본 폼 제출 동작을 막음

    // 입력값을 검증하기: 지출 항목 이름이 비어있지 않고, 비용 값이 숫자이며 0 이상인지 확인
    if (!costName.trim() || isNaN(costValue) || costValue <= 0) {
      alert("유효한 지출 항목과 비용을 입력해주세요.");  // 검증 실패 시 알림 표시
      return;  // 실행을 중단하기 위해 조기 리턴
    }

    // 입력값이 유효한 경우, 상위 컴포넌트에서 전달된 handleSubmit 함수 호출
    handleSubmit(costName, costValue);

    // 제출 후에 공백으로 만들어서 다시 입력하기 쉽게 만들기
    setCostName("");
    setCostValue("");
  };

  // 지출항목 비용과 제출 버튼 렌더링
  return (
    <form className='w-full flex flex-col pt-2' onSubmit={handleFormSubmit}>
      <div className='flex flex-row'>
        <div className='w-1/2 pr-2'>
          <h1 className='pb-2'>지출항목</h1>
          <input
            type='text'
            name='costName'
            className='w-full border-b-2 border-gray-300 pb-2'
            placeholder='예) 핸드폰 요금'
            value={costName}
            onChange={(e) => setCostName(e.target.value)} // 입력이 변경될 때 costName 상태 업데이트
          />
        </div>
        <div className='w-1/2 pr-2'>
          <h1 className='pb-2'>비용</h1>
          <input
            type='number'
            name='costValue'
            className='w-full border-b-2 border-gray-300 pb-2'
            placeholder='원 단위'
            value={costValue}
            onChange={(e) => setCostValue(e.target.value)} // 입력이 변경될 때 costValue 상태 업데이트
          />
        </div>
      </div>
      <div className='w-full mt-4 md:mt-0'>
        <input
          type="submit"
          value="제출 버튼"
          className='self-end w-full text-left'
        />
      </div>
    </form>
  );
}

export default Form;
