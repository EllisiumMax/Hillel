"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var CHAT_SCREEN = document.querySelector(".chat-screen");
var CHAT_INPUT_AREA = document.querySelector(".input-field");
var CHAT_SEND_BUTTON = document.querySelector(".input-button");
var CHAT = {
  chatRunning: true,
  specialPhrase: "YELLOW",
  timer: "",
  botGreetings: ["Hello, how is going?", "Hi, how are you?", "Hey there, whats up?"],
  botMessages: ["Yes, it's good!", "No, i don't recommend it.", "Nice idea!", "Bad idea!", "Wow, that's cool!", "Have a nice day!", "Let me think a little...", "Weather is so cold today.", "Wow, you are typing so fast!", "Have a nice day!", "Are you still there?", "What does this mean?", "Sorry, what do you mean?", "No thank, you.", "Okay, better ask Google.", "Maybe Siri can help you..", "Ha ha ha, thats fun!", "You are so right.", "Do you like McDonalds?", "Your car is dirty.", "Did you hear that noise? What was that?"],
  sendGreetingInitiateStop: function sendGreetingInitiateStop() {
    var random = Math.round(Math.random() * (this.botGreetings.length - 1));
    this.randomStop();
    CHAT_SCREEN.innerHTML += "<br>BOT: ".concat(this.botGreetings[random]);
  },
  botChooseMessage: function botChooseMessage() {
    var random = Math.round(Math.random() * (this.botMessages.length - 1));
    var randomPhrase = "<br>BOT: ".concat(this.botMessages[random]);
    return randomPhrase;
  },
  randomDelayMS: function randomDelayMS() {
    return Math.round(Math.random() * 7 + 1) * 1000;
  },
  botReply: function () {
    var _botReply = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var _this = this;

      var delayedReply;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              delayedReply = new Promise(function (resolve) {
                _this.timer = setTimeout(function () {
                  return resolve(_this.botChooseMessage());
                }, _this.randomDelayMS());
              });
              _context.t0 = CHAT_SCREEN.innerHTML;
              _context.next = 4;
              return delayedReply;

            case 4:
              CHAT_SCREEN.innerHTML = _context.t0 += _context.sent;

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function botReply() {
      return _botReply.apply(this, arguments);
    }

    return botReply;
  }(),
  stopChat: function stopChat() {
    CHAT_SEND_BUTTON.onclick = null;
    CHAT_SEND_BUTTON.className = "inactive-button";
    CHAT = "CHAT STOPPED";
    CHAT_INPUT_AREA.value = "";
    CHAT_INPUT_AREA.setAttribute("disabled", "disabled");
  },
  randomStop: function randomStop() {
    var _this2 = this;

    var minTimeMS = 10000;
    var maxTimeMS = 200000;
    var random = Math.floor(Math.random() * (maxTimeMS - minTimeMS)) + minTimeMS;
    var timeInSeconds = (random / 1000).toFixed(0) + " seconds";
    CHAT_SCREEN.innerHTML += "<b>SYSTEM: Chat will be stopped after ".concat(timeInSeconds, "</b>");
    setTimeout(function () {
      if (_this2.chatRunning) {
        _this2.stopChat();

        clearTimeout(_this2.timer);
        CHAT_SCREEN.innerHTML += "<br><b>SYSTEM: --- Session completed, chat stopped ---</b>";
        return;
      }
    }, random);
  },
  launch: function launch() {
    clearTimeout(this.timer);
    if (!CHAT_INPUT_AREA.value) return;
    CHAT_SCREEN.innerHTML += "<br>YOU: ".concat(CHAT_INPUT_AREA.value);

    if (CHAT_INPUT_AREA.value === this.specialPhrase) {
      this.running = false;
      this.stopChat();
      CHAT_SCREEN.innerHTML += "<br><b>SYSTEM: --- Special phrase detected, chat stopped ---</b>";
      return;
    }

    this.botReply();
    CHAT_INPUT_AREA.value = "";
  }
};
CHAT_SCREEN.onload = CHAT.sendGreetingInitiateStop();

CHAT_SEND_BUTTON.onclick = function () {
  return CHAT.launch();
};
