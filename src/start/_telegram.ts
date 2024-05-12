import "dotenv/config";

import TelegramBot from "node-telegram-bot-api";
import { commands } from "../commands";

const TELEGRAM_TOKEN = `${process.env.TELEGRAM_TOKEN}`;

export const Telegram = async (): Promise<TelegramBot> => {
  const client = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

  const commandsList = Object.keys(commands).map((key) => {
    return {
      command: commands[key as keyof typeof commands].name,
      description: commands[key as keyof typeof commands].description,
    };
  });
  client.setMyCommands(commandsList);

  client.on("message", (msg) => {
    Object.keys(commands).forEach((key) => {
      const commandName = commands[key as keyof typeof commands].name;

      if (msg.text?.startsWith(`/${commandName}`)) {
        commands[key as keyof typeof commands].action({ msg, client });
      }
    });
  });

  return client;
};
