// import { React, useState, useEffect } from "react";
// import { signin } from "./service/ApiService";
// import Posts from "./Posts";
// import {
//   Button,
//   TextField,
//   Grid,
//   Link,
//   Container,
//   Typography,
// } from "@material-ui/core";
// import { call, signout } from "./service/ApiService.js";
// function Pagination() {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemPerPage] = useState(10);
//   useEffect(() => {
//     // setLoading(true);
//     // let body = { category: "인생뷰티" };
//     call("/todo", "GET", null).then(
//       (response) => setItems(response.data),
//       setLoading(false)
//     );
//   }, []);
//   //   25개있다고 가정
//   //   마지막 item의 index는 1page이고 1page에 10개씩일경우 10
//   const indexOfLastItem = currentPage * itemsPerPage;
//   //   첫번째 item의 index는 10-1-
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   //   0~10까지 자른다
//   const currentItems = (items) => {
//     let currentItems = 0;
//     currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
//     return currentItems;
//   };

//   return (
//     <div className="App">
//       <Posts items={currentItems(items)} loading={loading}></Posts>
//       <Pagination
//         postsPerPage={itemsPerPage}
//         totalPosts={items.length}
//         paginate={setCurrentPage}
//       ></Pagination>
//     </div>
//   );
// }

// export default Pagination;
import React from "react";
import styled from "styled-components";

const PageUl = styled.ul`
  float: left;
  list-style: none;
  text-align: center;
  border-radius: 3px;
  color: white;
  padding: 1px;
  border-top: 3px solid #186ead;
  border-bottom: 3px solid #186ead;
  background-color: rgba(0, 0, 0, 0.4);
`;

const PageLi = styled.li`
  display: inline-block;
  font-size: 17px;
  font-weight: 600;
  padding: 5px;
  border-radius: 5px;
  width: 25px;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #263a6c;
  }
  &:focus::after {
    color: white;
    background-color: #263a6c;
  }
`;

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after {
    border-radius: 100%;
    color: white;
    background-color: #263a6c;
  }
`;

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  // console.log(setState);
  return (
    <div>
      <nav>
        <PageUl className="pagination">
          {pageNumbers.map((number) => (
            <PageLi key={number} className="page-item">
              <PageSpan onClick={() => paginate(number)} className="page-link">
                {number}
              </PageSpan>
            </PageLi>
          ))}
        </PageUl>
      </nav>
    </div>
  );
};

export default Pagination;
