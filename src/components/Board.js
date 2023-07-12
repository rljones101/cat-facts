import CardFact from "./CardFact";
import Button from "./Button";
import BoardItems from "./BoardItems";

export default function Board({
  sortedColumns,
  facts,
  onUpdateFactStatus,
  onApproveFact,
  onRemoveFact,
  onColumnSort,
}) {
  const createdFacts = filterFacts("created");
  const pendingFacts = filterFacts("pending");
  const approvedFacts = filterFacts("approved");

  sortList(createdFacts, 1);
  sortList(pendingFacts, 2);
  sortList(approvedFacts, 3);

  function sortList(list, columnNum) {
    const direction = sortedColumns.find(
      (col) => col.column === columnNum
    )?.direction;

    if (direction && direction === "desc") {
      list = list.sort((a, b) => {
        const date1 = new Date(a.createdAt).getTime();
        const date2 = new Date(b.createdAt).getTime();
        return date2 - date1;
      });
    }

    if (direction && direction === "asc") {
      list = list.sort((a, b) => {
        const date1 = new Date(a.createdAt).getTime();
        const date2 = new Date(b.createdAt).getTime();
        return date1 - date2;
      });
    }
  }

  function filterFacts(status) {
    return facts.filter((fact) => fact.status === status);
  }

  function handleRequestApproval(fact) {
    onUpdateFactStatus(fact, "pending");
  }

  function handleAprove(fact) {
    onApproveFact(fact, "approved");
  }

  function handleDeny(fact) {
    onUpdateFactStatus(fact, "created");
  }

  function handlColumnSort(direction, columnNum) {
    const column = {
      column: columnNum,
      direction,
    };
    if (sortedColumns) {
      onColumnSort(
        sortedColumns.map((col) =>
          col.column === column.column ? { ...column } : col
        )
      );
    }
  }

  return (
    <div className="board">
      <BoardItems
        columnName={"Created"}
        sortBy={sortedColumns[0].direction}
        count={createdFacts.length}
        onHandleSortDirection={(direction) => handlColumnSort(direction, 1)}
      >
        {createdFacts.map((fact) => (
          <CardFact type="created" key={fact._id} fact={fact}>
            <div className="button-actions">
              <Button
                buttonStyle={"button-remove"}
                onClick={() => onRemoveFact(fact)}
              >
                💥Remove
              </Button>
              <Button
                buttonStyle={"button-request-approval"}
                onClick={() => handleRequestApproval(fact)}
              >
                📝Request Aproval
              </Button>
            </div>
          </CardFact>
        ))}
      </BoardItems>
      <BoardItems
        columnName={"Pending"}
        sortBy={sortedColumns[1].direction}
        count={pendingFacts.length}
        onHandleSortDirection={(direction) => handlColumnSort(direction, 2)}
      >
        {pendingFacts.map((fact) => (
          <CardFact type="approved" key={fact._id} fact={fact}>
            <div className="button-actions">
              <Button
                buttonStyle={"button-deny"}
                onClick={() => handleDeny(fact)}
              >
                Deny👎
              </Button>
              <Button
                buttonStyle={"button-approve"}
                onClick={() => handleAprove(fact)}
              >
                👍Approve
              </Button>
            </div>
          </CardFact>
        ))}
      </BoardItems>
      <BoardItems
        columnName={"Approved"}
        sortBy={sortedColumns[2].direction}
        count={approvedFacts.length}
        onHandleSortDirection={(direction) => handlColumnSort(direction, 3)}
      >
        {approvedFacts.map((fact) => (
          <CardFact key={fact._id} fact={fact}></CardFact>
        ))}
      </BoardItems>
    </div>
  );
}
