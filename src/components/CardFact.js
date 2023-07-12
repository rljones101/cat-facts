import CardFactHeader from "./CardFactHeader";

export default function CardFact({ fact, children }) {
  let classStatus = "";
  if (fact.status === "created") classStatus = "created";
  if (fact.status === "pending") classStatus = "pending";
  if (fact.status === "approved") classStatus = "approved";

  return (
    <div className={`card-fact ${classStatus}`}>
      <div className="container">
        <CardFactHeader fact={fact} />
        {fact.text}
        {children}
      </div>
    </div>
  );
}
