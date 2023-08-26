import { Chat } from "./components/Chat";
import { Heading } from "./components/Heading";

function App() {
  return (
    <main className="mx-auto px-12 h-full bg-bg-primary text-text-primary pt-12 overflow-hidden">
      <div
        className="grid h-full gap-8"
        style={{
          gridTemplateRows: "auto 1fr",
        }}
      >
        <Heading />
        <Chat />
      </div>
    </main>
  );
}

export default App;
