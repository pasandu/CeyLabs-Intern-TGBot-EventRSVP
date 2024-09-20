const { getUserState, setUserState, setUserData, getUserData, saveTicket } = require('./database');

function startRegistration(chatId) {
  console.log(`Starting registration for chat ID: ${chatId}`);
  setUserState(chatId, 'awaiting_name');
  return "Please enter your name:";
}

function handleUserInput(chatId, text) {
  try {
    const state = getUserState(chatId);
    console.log(`Handling input for chat ID: ${chatId}, State: ${state}, Input: ${text}`);
    
    switch (state) {
      case 'awaiting_name':
        setUserData(chatId, 'name', text);
        setUserState(chatId, 'awaiting_email');
        return "Great! Now, please enter your email address:";
      
      case 'awaiting_email':
        console.log(`Validating email: ${text}`);
        if (!isValidEmail(text)) {
          console.log('Email invalid');
          return "Invalid email. Please enter a valid email address:";
        }
        console.log('Email valid, setting user data');
        setUserData(chatId, 'email', text);
        console.log('Setting user state to awaiting_tickets');
        setUserState(chatId, 'awaiting_tickets');
        console.log('Returning ticket question');
        return "How many tickets would you like? (Max 2)";
      
      case 'awaiting_tickets':
        const tickets = parseInt(text);
        if (isNaN(tickets) || tickets < 1 || tickets > 2) {
          return "Please enter a valid number of tickets (1 or 2):";
        }
        setUserData(chatId, 'tickets', tickets);
        const userData = getUserData(chatId);
        const ticketId = generateTicketId();
        saveTicket(ticketId, userData);
        setUserState(chatId, 'completed');
        return `Great! Your ticket has been reserved.
Ticket ID: ${ticketId}
Name: ${userData.name}
Email: ${userData.email}
Tickets: ${userData.tickets}`;
      
      default:
        return "I'm sorry, I didn't understand that. Please use /register to request a ticket or /help for assistance.";
    }
  } catch (error) {
    console.error(`Error handling input for chat ID: ${chatId}:`, error);
    return "Sorry, an error occurred. Please try again or contact support.";
  }
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function generateTicketId() {
  return Math.random().toString(36).substr(2, 9).toUpperCase();
}

module.exports = { startRegistration, handleUserInput };