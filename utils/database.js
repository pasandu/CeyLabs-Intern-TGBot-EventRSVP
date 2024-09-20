const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'database.json');

function getDatabase() {
  if (!fs.existsSync(dbPath)) {
    return { users: {}, tickets: {} };
  }
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
}

function saveDatabase(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

function setUserState(chatId, state) {
  const data = getDatabase();
  if (!data.users[chatId]) {
    data.users[chatId] = { state: null, data: {} };
  }
  data.users[chatId].state = state;
  saveDatabase(data);
}

function getUserState(chatId) {
  const data = getDatabase();
  return data.users[chatId]?.state || null;
}

function setUserData(chatId, key, value) {
  const data = getDatabase();
  if (!data.users[chatId]) {
    data.users[chatId] = { state: null, data: {} };
  }
  data.users[chatId].data[key] = value;
  saveDatabase(data);
}

function getUserData(chatId) {
  const data = getDatabase();
  return data.users[chatId]?.data || {};
}

function saveTicket(ticketId, userData) {
  const data = getDatabase();
  data.tickets[ticketId] = userData;
  saveDatabase(data);
}

module.exports = {
  getUserState,
  setUserState,
  setUserData,
  getUserData,
  saveTicket
};