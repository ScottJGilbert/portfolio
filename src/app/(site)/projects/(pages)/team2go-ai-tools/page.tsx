import { getProjectMeta } from "@/lib/projects/content";
import { ProjectShell } from "../../components/project-shell";
import {
  ArchitectureDiagram,
  CaseStudy,
  FlowDiagram,
  Highlights,
} from "../../components/blocks";
import { projectMetadata } from "../../lib/metadata";

export const metadata = projectMetadata("team2go-ai-tools");

export default function Team2GoAiToolsPage() {
  const project = getProjectMeta("team2go-ai-tools")!;

  return (
    <ProjectShell project={project}>
      {/* <p>Work in progress. Check back later!</p> */}
      <p>
        During a remote full-stack/AI internship with Team2Go Inc., a software
        company in South Korea, my intern team was tasked with making key upgrades to the company&apos;s web infrastructure. My key contribution to this project was building a platform for publishing
        AI chatbots: an administrator picks a model, writes the chatbot&apos;s
        instructions, and uploads reference documents of various formats.. Users then chat with it
        in English or Korean and get answers grounded in whatever relevant
        information is available. 
      </p>
      <p>
        We shipped key deliverables two weeks ahead of schedule and reported
        progress regularly to senior executives. I worked on the Docker
        deployment that connects the backend and user interfaces, and on the
        streaming and document-embedding features that connect the app to
        OpenAI’s models.
      </p>

      <Highlights
        items={[
          {
            label: "Grounded answers",
            detail:
              "Chatbots leverage retrieval-augmented generation to fetch relevant information directly from documents.",
          },
          {
            label: "Streaming responses",
            detail:
              "Text appears as the model writes it, not after a long wait.",
          },
          {
            label: "English and Korean",
            detail: "Fully localized interfaces and bilingual chatbot data.",
          },
          {
            label: "Full virtualization",
            detail: "The entire stack runs from Docker Compose and is designed from the ground up for compatability with Amazon Web Services.",
          },
        ]}
      />

      <h2>Architecture</h2>
      <ArchitectureDiagram
        title="AgentX platform (simplified)"
        caption="Each language has its own Next.js app. Both share one database."
        lanes={[
          {
            label: "Users",
            nodes: [
              { name: "Administrators", note: "Create and edit chatbots" },
              { name: "End users", note: "Chat with them" },
            ],
            connector: "HTTPS",
          },
          {
            label: "Edge",
            nodes: [
              {
                name: "NGINX reverse proxy",
                note: "TLS, one subdomain per language",
              },
            ],
            connector: "Routes by language",
          },
          {
            label: "Application",
            nodes: [
              { name: "English Next.js app" },
              { name: "Korean Next.js app" },
            ],
            connector: "SQL + vector search",
          },
          {
            label: "Data",
            nodes: [
              {
                name: "PostgreSQL + pgvector",
                note: "Users, chats, chatbots, document chunks",
              },
              {
                name: "S3-compatible object storage",
                note: "Uploaded documents",
              }
            ],
            connector: "HTTPS",
          },
          {
            label: "AI Models",
            nodes: [
              {
                name: "OpenAI API",
                note: "Embeddings and model responses",
              },
              {
                name: "Self-hosted LLMs",
                note: "On premise deployments exposing the same API as OpenAI",
              }
            ],
          }
        ]}
      />

      <h2>How a document becomes an answer</h2>
      <p>Rather than just regurgitate information, the system is designed to process and analyze documents for relevant context first and transfer that information directly. A key part of the system is the ability to transform documents into actionable information through a series of well-defined steps.</p>
      <div className="flex flex-row items-stretch gap-8">
      <FlowDiagram
        title="Ingestion: when an administrator uploads a file"
        layout="column"
        steps={[
          {
            title: "Extract text",
            detail: "PDF, Word, PowerPoint, HTML, and plain text are supported",
          },
          {
            title: "Split into chunks",
            detail:
              "About 800 tokens each with 100 tokens of overlap, split on paragraph and sentence boundaries first",
          },
          {
            title: "Embed each chunk",
            detail: "Turned into a 1,536-dimension vector",
          },
          {
            title: "Store in PostgreSQL",
            detail: "Vectors live in a pgvector column next to the text",
          },
        ]}
      />
      <FlowDiagram
        title="Answering: when a user sends a message"
        layout="column"
        steps={[
          { title: "Embed the question" },
          {
            title: "Find the closest chunks",
            detail: "Vector search returns the five nearest",
          },
          {
            title: "Build the prompt",
            detail:
              "Chatbot instructions, chat history, and the retrieved chunks as context",
          },
          {
            title: "Stream the response",
            detail: "Sent to the browser as it is generated",
          },
          {
            title: "Save the conversation",
            detail: "The full reply is stored in the chat history",
          },
        ]}
      />
      </div>

      <h2>Engineering details</h2>

      <CaseStudy
        title="Splitting documents so retrieval finds the right passage"
        problem="Reference documents are far longer than a model can use at once, and cutting them at arbitrary points produces snippets that lose their meaning."
        action="We split documents by token count, preferring paragraph boundaries, then sentence boundaries, and only hard-splitting an oversized sentence as a last resort. Each chunk repeats a little of the previous one so ideas aren't cut in half."
        result="Retrieval returns coherent passages that the model can quote from."
      />
      <CaseStudy
        title="Streaming a model's answer through a proxy"
        problem="Model responses take several seconds. Waiting for the whole answer feels broken, and a reverse proxy that buffers responses would hide streaming entirely."
        action="The server route converts the model's event stream into a web stream that reaches the browser chunk by chunk, saves the complete reply to the database once it finishes, and the NGINX proxy is configured not to buffer."
        result="Users see the answer appear immediately, and the conversation is still stored accurately."
      />
      <CaseStudy
        title="Keeping chats private and admin screens restricted"
        problem="The platform stores private conversations and lets administrators change what chatbots say, so access control matters."
        action="Accounts use bcrypt-hashed passwords and session-based sign-in. Admin screens check an administrator flag, and the streaming endpoint checks that the signed-in user owns the chat before doing anything. The proxy and the database are both set up for TLS."
        result="The chat API refuses requests for someone else's conversation, and the admin screens only open for flagged administrators."
      />
      <CaseStudy
        title="Reducing hallucination without making deployment harder"
        problem="Chatbots that invent answers are a liability for a business, but heavy guardrails make a platform harder to deploy and maintain."
        action="Each chatbot stores explicit instructions and boundaries, and answers are grounded in retrieved documents. We also experimented with instruction-writing techniques drawn from psychology to improve accuracy."
        result="More accurate responses without extra setup for administrators."
      />

      <h2>Related deliverable</h2>
      <p>
        I also worked on infrastructure for the company’s bilingual marketing website, built with
        the same Next.js and Docker setup, which covers the company’s services,
        capabilities, and contact pages.
      </p>
    </ProjectShell>
  );
}
