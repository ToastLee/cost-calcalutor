import React, { useEffect } from 'react';

function Header({ isItemUpdated, isItemDeleted }) {
  // useEffect로 컴포넌트 이벤트 처리
  useEffect(() => {
    let timer1, timer2;

    // 수정 처리가 되었을 때
    if (isItemUpdated) {
      timer1 = setTimeout(() => {
      }, 2000); // 2초 후에 상태 초기화를 위한 타이머 설정
    }

    // 삭제 처리가 되었을 때
    if (isItemDeleted) {
      timer2 = setTimeout(() => {
      }, 2000); // 2초 후에 상태 초기화를 위한 타이머 설정
    }

    // 컴포넌트가 언마운트되거나 상태가 변경될 때 타이머 클리어
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    }
  }, [isItemUpdated, isItemDeleted]);

  return (
    <div>
      {/* 수정되었다면 초록색을 삭제되었다면 빨간색을 아니라면 공백상태 */}
      <div className={`text-center p-6 m-4 ${isItemUpdated ? 'bg-green-500' : isItemDeleted ? 'bg-red-500' : ''} rounded-shadow`}>
        {isItemUpdated && <div className="alert alert-success">아이템이 수정되었습니다.</div>}
        {isItemDeleted && <div className="alert alert-danger">아이템이 삭제되었습니다.</div>}
      </div>
      <div>
        <h1 className='text-4xl font-bold pl-4'>예산 계산기</h1>
      </div>
    </div>
  );
}

export default Header;