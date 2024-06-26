import { useParams } from "react-router-dom";
import { useFindChatById } from "../../hooks/useFindChatById";
import { IconButton, InputBase, Paper, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useState } from "react";

const Chat = () => {
  const params = useParams();
  if (!params._id) {
    throw new Error("Chat _id is required");
  }
  const chatId = params._id;
  const { data } = useFindChatById({ _id: chatId });
  const [message, setMessage] = useState("");
  const [createMessage] = useCreateMessage();

  return (
    <Stack sx={{ height: "90vh", justifyContent: "space-between", p: "15px" }}>
      <h2>{data?.chat.name}</h2>
      {/* Message Bar */}
      <Paper
        sx={{
          p: "5px 15px",
          display: "flex",
          justifySelf: "flex-end",
          alignItems: "center",
          width: "100%",
        }}
      >
        <InputBase
          sx={{ flex: 1, width: "100%" }}
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <IconButton
          aria-label="send"
          onClick={async () => {
            await createMessage({
              variables: {
                createMessageInput: {
                  chatId,
                  content: message,
                },
              },
            });
            setMessage("");
          }}
        >
          {/* Send Icon */}
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;
