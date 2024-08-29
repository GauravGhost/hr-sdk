# Highrise SDK

A JavaScript library for creating and managing Highrise bots.

## Description

The Highrise SDK provides a comprehensive set of tools and functions to interact with the Highrise game platform. It allows developers to create bots that can perform various actions within the Highrise environment, such as sending messages, managing user interactions, handling in-game economy, and more.

## Installation

To install the Highrise SDK, use npm:

```bash
npm install hr-sdk
```

## Usage

Here's a basic example of how to use the Highrise SDK:

```javascript
import { HR, event } from 'hr-sdk';

const bot = new HR();

bot.on(event.Ready, (data) => {
    console.log("bot is connected to the server", data)
})

bot.on(event.Chat, ({user, message, whisper}) => {
   console.log('Received chat create event: @' + user.username + ": " + message);
});

bot.connect('YOUR_BOT_TOKEN', 'YOUR_ROOM_ID');
```

## Features

The Highrise SDK supports the following functions:

- **Chat and Communication**
  - `message`: Send a chat message
  - `whisper`: Send a private message to a user
  - `emote`: Perform an emote action
  - `reaction`: Send a reaction

- **User Management**
  - `getRoomUsers`: Get a list of users in the current room
  - `getRoomUserByUsername`: Find a user in the room by username
  - `getRoomUserByUserId`: Find a user in the room by user ID
  - `moveUserToRoom`: Move a user to another room

- **Room Interactions**
  - `sit`: Make the bot sit on a specific anchor
  - `walk`: Make the bot walk to a specific position
  - `teleport`: Teleport the bot to a specific position

- **Economy and Transactions**
  - `getWallet`: Get the bot's wallet information
  - `getGold`: Get the bot's gold balance
  - `getBoostToken`: Get the bot's boost token balance
  - `getVoiceToken`: Get the bot's voice token balance
  - `tipUser`: Send a tip to a user
  - `buyVoice`: Purchase voice time
  - `buyBoost`: Purchase a room boost
  - `buyItem`: Purchase an item from the shop

- **Moderation and Privileges**
  - `modAction`: Perform a moderation action
  - `getRoomPrivilege`: Get a user's room privileges
  - `changeRoomPrivilege`: Change a user's room privileges

- **Inventory and Outfits**
  - `getBackpack`: Get a user's backpack contents
  - `getOutfit`: Get a user's current outfit
  - `setOutfit`: Set the bot's outfit
  - `getInventory`: Get the bot's inventory

- **Voice Chat**
  - `inviteSpeaker`: Invite a user to speak
  - `removeSpeaker`: Remove a user from speaking

- **Messaging System**
  - `getConversation`: Get conversation history
  - `sendMessage`: Send a message in a conversation
  - `sendBulkMessage`: Send a message to multiple conversations
  - `getMessage`: Get a specific message
  - `leaveConversation`: Leave a conversation

- **Miscellaneous**
  - `channel`: Perform channel-related actions

## Documentation

For detailed documentation on each function and its parameters, please refer to our [API Documentation](https://highrise.zesp.in/).

## Contributing

We welcome contributions to the Highrise SDK! Please mail [Email](gyanendrak478@gmail.com) for more information on how to get started.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.