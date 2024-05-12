import "dotenv/config";

import axios from "axios";

const SERVICE_MURRAY_SERVICE = process.env.SERVICE_MURRAY_SERVICE;

export const LightningNetwork = {
  name: "lightningstats",
  description: "Lightning Network Statistics",
  action: async ({ msg, client }: any) => {
    try {
      const result = await axios.get(`${SERVICE_MURRAY_SERVICE}/lightning/statistics`);
      const fields = result.data?.data?.fields;

      if (fields) {
        const messageLines = [];

        messageLines.push(`⚡ Lightning Network`);
        messageLines.push(``);
        messageLines.push(`${fields.totalCapacity.description}: ${fields.totalCapacity.value}`);
        messageLines.push(`${fields.avgCapacity.description}: ${fields.avgCapacity.value}`);
        messageLines.push(``);
        messageLines.push(`${fields.nodes.description}: ${fields.nodes.value}`);
        messageLines.push(`🤵‍♂️ Clearnet: ${fields.clearNet.value}`);
        messageLines.push(`🕵️ Tor: ${fields.tor.value}`);
        messageLines.push(`${fields.channels.description}: ${fields.channels.value}`);
        messageLines.push(``);
        messageLines.push(`${fields.avgFee.description}: ${fields.avgFee.value}`);
        messageLines.push(`${fields.avgBaseFee.description}: ${fields.avgBaseFee.value}`);
        messageLines.push(``);
        messageLines.push(`#Bitcoin #LightningNetwork`);

        const message = messageLines.join("\n");

        client.sendMessage(msg.chat.id, message);
      }
    } finally {
      console.log("Lightning Network message.");
    }
  },
};
