import { Start } from "./start";

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

init();
