"use strict";


const CHAT_SCREEN = document.querySelector(".chat-screen");
const CHAT_INPUT_AREA = document.querySelector(".input-field");
const CHAT_SEND_BUTTON = document.querySelector(".input-button");

let CHAT = {
    chatRunning: true,
    specialPhrase: "YELLOW",
    timer: "",
    botGreetings: [
        "Hello, how is going?",
        "Hi, how are you?",
        "Hey there, whats up?",
    ],
    botMessages: [
        "Yes, it's good!", "No, i don't recommend it.", "Nice idea!",
        "Bad idea!", "Wow, that's cool!", "Have a nice day!",
        "Let me think a little...", "Weather is so cold today.",
        "Wow, you are typing so fast!", "Have a nice day!",
        "Are you still there?",
        "What does this mean?", "Sorry, what do you mean?",
        "No thank, you.", "Okay, better ask Google.",
        "Maybe Siri can help you..", "Ha ha ha, thats fun!",
        "You are so right.", "Do you like McDonalds?",
        "Your car is dirty.",
        "Did you hear that noise? What was that?"
    ],
    sendGreetingInitiateStop: function () {
        const random = Math.round(Math.random() * (this.botGreetings
            .length - 1));
        this.randomStop();
        CHAT_SCREEN.innerHTML +=
            `<br>BOT: ${this.botGreetings[random]}`;

    },
    botChooseMessage: function () {
        const random = Math.round(Math.random() * (this.botMessages
            .length - 1));
        const randomPhrase = `<br>BOT: ${this.botMessages[random]}`;
        return randomPhrase;
    },
    randomDelayMS: function () {
        return (Math.round((Math.random() * 7) + 1) * 1000);
    },
    botReply: async function () {
        let delayedReply = new Promise((resolve) => {
            this.timer = setTimeout(() => resolve(this
                    .botChooseMessage()), this
                .randomDelayMS());
        });
        CHAT_SCREEN.innerHTML += await delayedReply;
    },
    stopChat: function () {
        CHAT_SEND_BUTTON.onclick = null;
        CHAT_SEND_BUTTON.className = "inactive-button";
        CHAT = "CHAT STOPPED";
        CHAT_INPUT_AREA.value = "";
        CHAT_INPUT_AREA.setAttribute("disabled", "disabled");
    },
    randomStop: function () {
        const minTimeMS = 10000;
        const maxTimeMS = 200000;
        const random = Math.floor(Math.random() * (maxTimeMS -
                minTimeMS)) +
            minTimeMS;
        const timeInSeconds = (random / 1000)
            .toFixed(0) + " seconds";
        CHAT_SCREEN.innerHTML +=
            `<b>SYSTEM: Chat will be stopped after ${timeInSeconds}</b>`;
        setTimeout(() => {
            if(this.chatRunning) {
                this.stopChat();
                clearTimeout(this.timer);
                CHAT_SCREEN.innerHTML +=
                    "<br><b>SYSTEM: --- Session completed, chat stopped ---</b>";
                return;
            }
        }, random);
    },
    launch: function () {
        clearTimeout(this.timer);
        if(!CHAT_INPUT_AREA.value) return;
        CHAT_SCREEN.innerHTML +=
            `<br>YOU: ${CHAT_INPUT_AREA.value}`;
        if(CHAT_INPUT_AREA.value === this.specialPhrase) {
            this.running = false;
            this.stopChat();
            CHAT_SCREEN.innerHTML +=
                "<br><b>SYSTEM: --- Special phrase detected, chat stopped ---</b>";
            return;
        }
        this.botReply();
        CHAT_INPUT_AREA.value = "";
    }
};

CHAT_SCREEN.onload = CHAT.sendGreetingInitiateStop();
CHAT_SEND_BUTTON.onclick = () => CHAT.launch();
