import "dotenv/config";

import axios from "axios";

const SERVICE_MURRAY_SERVICE = process.env.SERVICE_MURRAY_SERVICE;

export const Prices = {
  name: "prices",
  description: "Bitcoin Prices",
  action: async ({ msg, client }: any) => {
    try {
      const result = await axios.get(`${SERVICE_MURRAY_SERVICE}/prices`);
      const fields = result.data?.data?.fields;
      const title = result.data?.data?.title;

      if (fields && title) {
        const messageArr = [];

        messageArr.push(title);
        messageArr.push(``);

        Object.keys(fields).forEach((key) => {
          const price = fields[key];
          const values = price.value.split("\n");

          messageArr.push(price.description);
          messageArr.push(values[0]);
          messageArr.push(values[1].trim());
          messageArr.push(``);
        });

        messageArr.push(`#Bitcoin`);

        const message = messageArr.join("\n");

        client.sendMessage(msg.chat.id, message);
      }
    } finally {
      console.log("Prices message.");
    }
  },
};
