export default function CardFactHeader({ fact }) {
  function formatDate(fact) {
    return new Date(fact.createdAt).toLocaleDateString();
  }

  let className = "";
  if (fact.status === "created") className = "text-red-500";
  if (fact.status === "pending") className = "text-green-500";
  if (fact.status === "approved") className = "text-purple-500";

  return (
    <p className={className}>
      <span>{fact.status === "pending" && "🕑"}</span>
      <span>{fact.status === "approved" && "✔️"}</span>
      <span>{fact.user}</span> - <span>{formatDate(fact)}</span>
    </p>
  );
}
