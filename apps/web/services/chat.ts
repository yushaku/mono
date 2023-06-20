import { httpClient } from ".";
import { Observable } from "rxjs";

const steamClient = httpClient({
  responseType: "stream",
  contentType: "text/event-stream",
});

export const askGpt = async (prompt: string, signal: AbortSignal) => {
  const res = await steamClient.post(`/openai/stream?prompt=${prompt}`, {
    signal,
  });
  const stream = res.data as Observable<unknown>;
  console.log({ stream });

  // const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();

  // stream.subscribe((val) => {
  //   console.log(val);
  // });

  return stream;
};
