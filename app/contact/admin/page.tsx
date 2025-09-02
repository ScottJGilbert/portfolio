import { fetchMessages } from "@/lib/db";
import { MDXRemote } from "next-mdx-remote-client/rsc";

export default async function AdminPage() {
  const messages = await fetchMessages();
  return (
    <div>
      <h1 className="mt-4">Admin Contact Page</h1>
      {messages.map((msg) => (
        <div key={msg.id} className="border p-4 my-2 rounded-lg">
          <p>
            <strong>From:</strong> {msg.first_name + " " + msg.last_name} (
            {msg.email})
          </p>
          <p>
            <strong>Message:</strong> {msg.message}
          </p>
          <p className="text-sm text-gray-500">
            <em>Received on: {new Date(msg.time_sent).toLocaleString()}</em>
          </p>
          <MDXRemote source={msg.message} />
        </div>
      ))}
    </div>
  );
}
