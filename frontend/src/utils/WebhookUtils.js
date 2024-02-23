let webhookData = [];

const setWebhookData = (data) => {
  webhookData.push(data);
};

const getWebhookData = () => {
  return webhookData;
};

module.exports = {
  setWebhookData,
  getWebhookData,
};