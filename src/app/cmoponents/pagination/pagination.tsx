import React from 'react'
import PaginationLink from './PaginationLink';
interface PaginationProps{
  page: number;
  skip: number;
  totalItems: number;
}
const Pagination: React.FC<PaginationProps> = ({ page, totalItems }) => {
  const queryPage = page;                           // searchParams에 전달된 page
  const maxPageItems = 10;                          // pagination의 길이
  const firstPage = 1;                              // pagination 시작 지점
  const nextPage = Math.min(page + 1, totalItems);  // page + 1이 totalItems보다 크다면 totalItems반환
  const prevPage = Math.max(page - 1, firstPage);   // page - 1이 firstPage보다 작다면 firstPage반환
  const arr = new Array(maxPageItems + 2);          // map을 돌리기위한 빈 배열
  const getPageItem = (num: number) => {
    let page: any;                                  // pagination 표현을 위한 번호 및 화실표
    if (num === 0) {
      page = "previous";
    } else if (num === maxPageItems + 1) {
      page = "next";
    } else if (queryPage - Math.ceil(maxPageItems / 2) > 0) {
      // 클릭한 pagination버튼이 항상 중앙에 위치하도록 컨트롤
      page = num + queryPage - Math.ceil(maxPageItems / 2);
    } else {
      // page의 번호를 위한 컨트롤
      page = queryPage > maxPageItems ? queryPage - maxPageItems + num : num;
    }
    const current = page === queryPage ? true : false;  // 클릭한 pagination버튼을 활성화 시키기위한 변수
    const disabled =                                    // 0이나 totalItems를 넘어가지 못하도록 장애를 입히는 변수
      (queryPage - 1 === 0 && page === "previous") ||
      (queryPage + 1 === 500 && page === "next")
        ? true
        : false;
    const result = {
      page,
      disabled,
      current,
    };
    return result;
  };
  return (
    <div className="flex gap-3">
      {[...arr].map((_, i) => {
        const { page, disabled, current } = getPageItem(i);
        if (page === "previous")
          return (
            <PaginationLink key={i} disabled={disabled} page={prevPage}>
              {"<"}
            </PaginationLink>
          );
        if (page === "next")
          return (
            <PaginationLink key={i} disabled={disabled} page={nextPage}>
              {">"}
            </PaginationLink>
          );
        return (
          <PaginationLink key={i} active={current} page={page}>
            {page}
          </PaginationLink>
        );
      })}
    </div>
  );
}

export default Pagination