export const fetchStreamData = (
  prompt: string,
  signal: AbortSignal,
  callback: (msg: string) => void
) => {
  fetch(`http://localhost:8005/api/openai/askStream?prompt=${prompt}`, {
    signal,
  })
    .then((response) => {
      const reader = response.body.getReader();

      const processStream = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            console.log("Stream ended");
            break;
          }
          const chunk = new TextDecoder("utf-8").decode(value);
          const lines = chunk
            .toString()
            .split("\n")
            .filter((line: any) => line.trim() !== "");
          for (const line of lines) {
            const message = line.replace(/^data: /, "");
            if (message === "[DONE]") {
              return;
            }
            try {
              const parsed = JSON.parse(message);
              const work = parsed.choices[0].delta.content;
              callback(work);
            } catch (error) {
              console.error("Error parsing AI response:", error);
            }
          }
        }
      };
      processStream();
    })
    .catch((error) => {
      console.error("Error fetching stream data:", error);
    });
};
