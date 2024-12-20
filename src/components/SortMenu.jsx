import { useState, useEffect } from "react";

const SortMenu = ({
  onSortChange,
  onOrderChange,
  refresh,
  sortBy,
  sortOrder,
}) => {
  const handleSort = (event) => {
    const newSort = event.target.value;
    onSortChange(newSort);
    refresh(true);
  };

  const handleOrder = (event) => {
    const newOrder = event.target.value;
    onOrderChange(newOrder);
    refresh(true);
  };

  return (
    <div className="sort-menu">
      <label id="sort-select">Sort by:</label>
      <select id="sort-select" value={sortBy} onChange={handleSort}>
        <option value="created_at">Date Created</option>
        <option value="votes">All Time Bangers!</option>
        <option value="author">Author</option>
      </select>
      <label id="sort-order"></label>
      <select id="sort-order" value={sortOrder} onChange={handleOrder}>
        <option value="asc">Ascending Order</option>
        <option value="desc">Descending Order</option>
      </select>
    </div>
  );
};

export default SortMenu;
