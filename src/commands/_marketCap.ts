import "dotenv/config";

import axios from "axios";

const SERVICE_MURRAY_SERVICE = process.env.SERVICE_MURRAY_SERVICE;

export const MarketCap = {
  name: "marketcap",
  description: "Bitcoin Market Cap",
  action: async ({ msg, client }: any) => {
    try {
      const result = await axios.get(`${SERVICE_MURRAY_SERVICE}/market/capitalization`);
      const fields = result.data?.data?.fields;

      if (fields) {
        const messageLines = [];

        messageLines.push(`💰 Bitcoin Market Cap`);
        messageLines.push(``);

        if (fields.btcusdt) {
          messageLines.push(`🇺🇸 Price: ${fields.btcusdt.value.price.value}`);
          messageLines.push(`⚡ Sats/USD: ${fields.btcusdt.value.satsPerFiat.value}`);
          messageLines.push(`💰 Market Cap: ${fields.btcusdt.value.marketCap.value}`);
        }

        if (fields.btcusd) {
          messageLines.push(`🇺🇸 Price: ${fields.btcusd.value.price.value}`);
          messageLines.push(`⚡ Sats/USD: ${fields.btcusd.value.satsPerFiat.value}`);
          messageLines.push(`💰 Market Cap: ${fields.btcusd.value.marketCap.value}`);
        }

        messageLines.push(``);
        messageLines.push(`🇧🇷 Price: ${fields.btcbrl.value.price.value}`);
        messageLines.push(`⚡ Sats/BRL: ${fields.btcbrl.value.satsPerFiat.value}`);
        messageLines.push(`💰 Market Cap: ${fields.btcbrl.value.marketCap.value}`);
        messageLines.push(``);
        messageLines.push(`#Bitcoin #MarketCap #price`);

        const message = messageLines.join("\n");

        client.sendMessage(msg.chat.id, message);
      }
    } finally {
      console.log("Market Cap message.");
    }
  },
};
