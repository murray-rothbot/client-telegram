import "dotenv/config";

import axios from "axios";
import { Utils } from "../utils";

const SERVICE_MURRAY_SERVICE = process.env.SERVICE_MURRAY_SERVICE;

export const Difficulty = {
  name: "difficulty",
  description: "Bitcoin Difficulty Adjustment",
  action: async ({ msg, client }: any) => {
    try {
      const url = `${SERVICE_MURRAY_SERVICE}/blockchain/difficulty`;
      const result = await axios.get(url);
      const fields = result.data?.data?.fields;

      if (fields) {
        const currentProgress = fields.currentProgress.value.toFixed(2);
        const progressMessage = Utils.createProgressMessage({ currentProgress });
        const estimatedDate = Utils.formatDate({ date: new Date(fields.estimatedDate.value) });

        const messageLines = [];

        messageLines.push(`🦾 Bitcoin Difficulty Adjustment`);
        messageLines.push(``);
        messageLines.push(fields.currentProgress.description);
        messageLines.push(``);
        messageLines.push(progressMessage);
        messageLines.push(``);
        messageLines.push(`${fields.estimatedDate.description}: ${estimatedDate}`);
        messageLines.push(``);
        messageLines.push(`Current Change   : ${fields.estimateChange.value}`);
        messageLines.push(`Previous Change : ${fields.previousChange.value}`);
        messageLines.push(``);
        messageLines.push(`#Bitcoin #DifficultyAdjustment #GracePeriod`);

        const message = messageLines.join("\n");

        client.sendMessage(msg.chat.id, message);
      }
    } finally {
      console.log("Difficulty Adjustment message.");
    }
  },
};
