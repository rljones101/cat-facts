import Column from "./Column";

export default function BoardItems({
  columnName,
  count,
  sortBy,
  onHandleSortDirection,
  children,
}) {
  function handleSortDirection(direction) {
    onHandleSortDirection(direction);
  }

  return (
    <div className="column">
      <Column onSortDirection={handleSortDirection} sortBy={sortBy}>
        {columnName} <span className="num-badge">{count}</span>
      </Column>
      <div className="container">{children}</div>
    </div>
  );
}
