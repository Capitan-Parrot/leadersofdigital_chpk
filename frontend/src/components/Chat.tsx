import { TextField } from "./TextField";
import { MessageList } from "./MessageList";
import { observer } from "mobx-react-lite";
import MessagesStore from "../stores/MessagesStore";

export const Chat = observer(() => {
  const vm = MessagesStore;

  const onSubmit = (message: string | File) => {
    if (typeof message === "string") {
      vm.sendMessage(message);
    } else {
      vm.sendAttachment(message);
    }
  };

  return (
    <section
      className="rounded-t-3xl min-h-full max-w-6xl mx-auto w-full max-h-full overflow-hidden border-primary/10 items-center px-2 md:px-8 pb-6 flex flex-col h-full"
      style={{
        background:
          "linear-gradient(69deg, rgba(5, 65, 240, 0.08) 42.29%, rgba(5, 65, 240, 0.02) 100%, rgba(5, 65, 240, 0.02) 100%)",
        border: "1px solid rgba(5, 65, 240, 0.13)",
      }}
    >
      <div className="w-full max-w-3xl flex-1 flex flex-col h-full">
        <MessageList />
        <TextField onSubmit={onSubmit} disabled={MessagesStore.isLoading} />
      </div>
    </section>
  );
});
