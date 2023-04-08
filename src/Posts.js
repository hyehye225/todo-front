import React from "react";

const Posts = ({ items, loading }) => {
  return (
    <>
      {loading && <div> loading... </div>}
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </>
  );
};
export default Posts;
