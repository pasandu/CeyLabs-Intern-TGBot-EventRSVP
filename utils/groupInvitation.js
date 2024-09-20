const TelegramBot = require('node-telegram-bot-api');
const config = require('../config.json');

const bot = new TelegramBot(config.botToken);

function inviteUserToGroup(userId) {
  try {
    const chatInviteLink = bot.exportChatInviteLink(config.groupId);
    bot.inviteChat(config.groupId, userId);
    return chatInviteLink;
  } catch (error) {
    console.error('Error inviting user to group:', error);
    return null;
  }
}

module.exports = { inviteUserToGroup }