import { useState } from "react";

export default function Column({ sortBy, onSortDirection, children }) {
  const [sortDirection, setSortDirection] = useState(sortBy);

  function handleSortDirection() {
    const newSortDirection = sortDirection === "desc" ? "asc" : "desc";

    setSortDirection((direction) => newSortDirection);
    onSortDirection(newSortDirection);
  }

  return (
    <div className="header">
      <div className="flex">{children}</div>{" "}
      <div className="flex items-center">
        {sortDirection === "desc" && (
          <button
            className="bg-green-500 pb-2 px-2 rounded"
            onClick={handleSortDirection}
          >
            &#x2304;
          </button>
        )}
        {sortDirection === "asc" && (
          <button
            className="bg-green-500 pt-2 px-2 rounded"
            onClick={handleSortDirection}
          >
            &#x2303;
          </button>
        )}
      </div>
    </div>
  );
}
