import axios from "axios";

const SERVICE_MURRAY_SERVICE = process.env.SERVICE_MURRAY_SERVICE;

export const Fees = {
  name: "fees",
  description: "Get the recommended Bitcoin fees.",
  action: async ({ msg, client }: any) => {
    try {
      const url = `${SERVICE_MURRAY_SERVICE}/blockchain/fees/recommended`;
      const result = await axios.get(url);
      const fields = result.data?.data?.fields;

      if (fields) {
        const messageLines = [];

        messageLines.push(`💸 Bitcoin Fees`);
        messageLines.push(``);
        messageLines.push(`🐇 Fastest  : ${fields.fastestFee.value.replace("vByte", "vB")}`);
        messageLines.push(`🐢 +30 min : ${fields.halfHourFee.value.replace("vByte", "vB")}`);
        messageLines.push(`🐌 +60 min : ${fields.hourFee.value.replace("vByte", "vB")}`);
        messageLines.push(`🦥 +90 min : ${fields.economy.value.replace("vByte", "vB")}`);
        messageLines.push(``);
        messageLines.push(`🔥 Purge Limit : ${fields.minimum.value.replace("vByte", "vB")}`);
        messageLines.push(``);
        messageLines.push(`#Bitcoin #fees`);

        const message = messageLines.join("\n");

        client.sendMessage(msg.chat.id, message);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
