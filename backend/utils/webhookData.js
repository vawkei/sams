// webhookData.js
let webhookData = {};

const setWebhookData = (data) => {
  webhookData = data;
};

const getWebhookData = () => {
  return webhookData;
};

module.exports = { setWebhookData, getWebhookData };
