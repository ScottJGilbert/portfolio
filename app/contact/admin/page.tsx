import { fetchMessages } from "@/lib/db";
import MDXMessage from "@/app/components/mdx/mdx-message";

export default async function AdminPage() {
  const messages = await fetchMessages();
  return (
    <div>
      <h1 className="mt-4">Admin Contact Page</h1>
      {messages.map((msg) => (
        <MDXMessage key={msg.id} msg={msg} />
      ))}
    </div>
  );
}
