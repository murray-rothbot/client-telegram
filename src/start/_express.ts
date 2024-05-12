import express from "express";
import { Routes } from "../routes";
import TelegramBot from "node-telegram-bot-api";

type Props = { client: TelegramBot };

export function Express({ client }: Props): void {
  try {
    const app = express();
    const PORT = process.env.PORT || 4003;

    app.use(express.json());

    Object.keys(Routes).forEach((key) => {
      (
        Routes as {
          [key: string]: Function;
        }
      )[key]({
        app,
        client,
      });
    });

    app.listen(PORT, () => console.log(`Express server is running on http://localhost:${PORT}`));
  } catch (error) {
    console.log(error);
  }
}
