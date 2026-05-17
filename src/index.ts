import { Start } from "./start";
import http from "node:http";

const startHealthServer = (): void => {
  const port = Number(process.env.PORT || 4004);
  const server = http.createServer((req, res) => {
    if (req.url === "/health") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true, service: "client-telegram" }));
      return;
    }

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("client-telegram");
  });

  server.listen(port, () => {
    console.log(`Health server listening on :${port}`);
  });
};

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled rejection caught:", reason);
});

const init = async () => {
  try {
    const client = await Start.Telegram();

    client.on("polling_error", (error) => {
      console.error("Polling error:", error.message);
    });
  } catch (error) {
    console.error(`start: ${error}`);
    setTimeout(() => {
      init();
    }, 1000 * 60);
  }
};

startHealthServer();
init();
