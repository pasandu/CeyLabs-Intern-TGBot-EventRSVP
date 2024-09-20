Install the required dependencies:
npm install

To start the bot,run:  node main.js

The bot will start polling for updates and respond to user commands and messages.
Available Commands

/start: Get event details
/register: Start the ticket registration process
/help: Display available commands

 "botToken": "7887887365:AAHbLby6N60JSfYQsBQzdwdqG2QF2UNKWXk",
 "groupId": "1753349634"

Project Structure

main.js: The main bot file that handles incoming messages and commands
registration.js: Contains the registration logic and user input handling
database.js: Handles user state and data storage (implementation not provided in this example)
utils/: Directory containing utility functions

eventInfo.js: Provides event information
groupInvitation.js: Handles inviting users to the event group
