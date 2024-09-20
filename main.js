const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const { getEventInfo } = require('./utils/eventInfo');
const { startRegistration, handleUserInput } = require('./utils/registration');
const { inviteUserToGroup } = require('./utils/groupInvitation');
const { getUserState, setUserState } = require('./utils/database');
const config = require('./config.json');

const token = config.botToken;

const bot = new TelegramBot(token, { polling: true });

bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});

bot.on('message', (msg) => {
  console.log('Received message:', msg.text);
});

bot.onText(/\/start/, (msg) => {
  console.log('Received /start command');
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, getEventInfo());
});

bot.onText(/\/register/, (msg) => {
  console.log('Received /register command');
  const chatId = msg.chat.id;
  const response = startRegistration(chatId);
  bot.sendMessage(chatId, response);
});

bot.onText(/\/help/, (msg) => {
  console.log('Received /help command');
  const chatId = msg.chat.id;
  const helpText = "Available commands:\n/start - Get event details\n/register - Request a ticket\n/help - Show this help message";
  bot.sendMessage(chatId, helpText);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text && !text.startsWith('/')) {
    console.log('Received non-command message:', text);
    const response = handleUserInput(chatId, text);
    bot.sendMessage(chatId, response);

    const userState = getUserState(chatId);
    if (userState === 'completed') {
      const groupInviteLink = inviteUserToGroup(chatId);
      if (groupInviteLink) {
        bot.sendMessage(chatId, `You've been added to the event group. Join here: ${groupInviteLink}`);
      }
    }
  }
});

console.log('Bot is starting...');