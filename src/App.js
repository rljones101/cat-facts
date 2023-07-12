import { useState } from "react";
import Button from "./components/Button";
import Board from "./components/Board";
import AddQuoteForm from "./components/AddQuoteForm";

const initialCatFacts = [
  {
    status: "approved",
    _id: "58e008780aac31001185ed05",
    user: "Joe Berlow",
    text: "Owning a cat can reduce the risk of stroke and heart attack by a third.",
    createdAt: "2018-03-29T20:20:03.844Z",
  },
  {
    status: "pending",
    _id: "58e009390aac31001185ed10",
    user: "Jane Crash",
    text: "Most cats are lactose intolerant, and milk can cause painful stomach cramps and diarrhea. It's best to forego the milk and just give your cat the standard: clean, cool drinking water.",
    createdAt: "2018-03-04T21:20:02.979Z",
  },
  {
    status: "created",
    _id: "588e746706ac2b00110e59ff",
    user: "Sally Thomas",
    text: "Domestic cats spend about 70 percent of the day sleeping and 15 percent of the day grooming.",
    createdAt: "2018-01-14T21:20:02.750Z",
  },
  {
    status: "pending",
    _id: "58e008ad0aac31001185ed0c",
    user: "Jim Moore",
    text: "The frequency of a domestic cat's purr is the same at which muscles and bones repair themselves.",
    createdAt: "2018-03-15T20:20:03.281Z",
  },
  {
    status: "created",
    _id: "58e007cc0aac31001185ecf5",
    user: "Danny Cane",
    text: "Cats are the most popular pet in the United States: There are 88 million pet cats and 74 million dogs.",
    createdAt: "2018-03-01T21:20:02.713Z",
  },
];

const columnSort = [
  {
    column: 1,
    direction: "desc",
  },
  {
    column: 2,
    direction: "desc",
  },
  {
    column: 3,
    direction: "desc",
  },
];

function App() {
  const [facts, setFacts] = useState([...initialCatFacts]);
  const [showAddQuoteForm, setShowAddQuoteForm] = useState(false);
  const [sortedColumns, setSortedColumns] = useState(columnSort);

  function updateFactStatus(fact, status) {
    setFacts((cur) =>
      cur.map((f) => (f._id === fact._id ? { ...f, status } : f))
    );
  }

  function removeFact(fact) {
    setFacts((cur) => [...cur].filter((f) => f._id !== fact._id));
  }

  function handleRemoveFact(fact) {
    const confirm = window.confirm(
      "Are you sure you want to remove this quote?"
    );

    if (confirm) removeFact(fact);
  }

  function handleApproveFact(fact) {
    const confirm = window.confirm(
      "Are you sure you want to approve this quote?"
    );

    if (confirm) updateFactStatus(fact, "approved");
  }

  function handleShowAddQuoteForm() {
    setShowAddQuoteForm((show) => !show);
  }

  function handleAddQuote(form) {
    const newQuote = {
      status: "created",
      _id: crypto.randomUUID(),
      user: form.user,
      text: form.quote,
      createdAt: new Date().toISOString(),
    };
    setFacts((cur) => [...cur, newQuote]);
    setShowAddQuoteForm((show) => !show);
  }

  function handleColumnSort(sColumns) {
    setSortedColumns((columns) => sColumns);
  }

  return (
    <div className="app">
      <h1 className="title">😺Cat Quote Approval System😺</h1>
      <div className="actions">
        <Button
          buttonStyle={"text-white bg-green-400 hover:bg-green-600"}
          onClick={handleShowAddQuoteForm}
        >
          {!showAddQuoteForm ? "Add Quote" : "Close"}
        </Button>
        {showAddQuoteForm && <AddQuoteForm onAddQuote={handleAddQuote} />}
      </div>
      <Board
        sortedColumns={sortedColumns}
        facts={[...facts]}
        onUpdateFactStatus={updateFactStatus}
        onApproveFact={handleApproveFact}
        onRemoveFact={handleRemoveFact}
        onColumnSort={handleColumnSort}
      />
    </div>
  );
}

export default App;
