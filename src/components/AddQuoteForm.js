import { useState } from "react";
import Button from "./Button";

export default function AddQuoteForm({ onAddQuote }) {
  const [quote, setQuote] = useState("");
  const [user, setUser] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!quote || !user) return;

    const form = {
      quote,
      user,
    };
    onAddQuote(form);
    setQuote("");
    setUser("");
  }

  return (
    <form className="add-quote-form" onSubmit={handleSubmit}>
      <label className="font-bold">User</label>
      <input
        type="text"
        className="p-2"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />

      <label className="font-bold">Quote</label>
      <textarea
        rows="5"
        value={quote}
        onInput={(e) => setQuote(e.target.value)}
        className="p-2"
      />
      <Button buttonStyle={"button-submit"}>Submit</Button>
    </form>
  );
}
