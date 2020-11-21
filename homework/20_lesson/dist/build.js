(() => {
    var t = {
            926: t => {
                function e(t, e, r, n, o, i, a) {
                    try {
                        var c = t[i](a),
                            u = c.value
                    } catch (t) {
                        return void r(t)
                    }
                    c.done ? e(u) : Promise.resolve(u)
                        .then(n, o)
                }
                t.exports = function (t) {
                    return function () {
                        var r = this,
                            n = arguments;
                        return new Promise((function (o, i) {
                            var a = t.apply(r, n);

                            function c(t) {
                                e(a, o, i, c, u,
                                    "next", t)
                            }

                            function u(t) {
                                e(a, o, i, c, u,
                                    "throw", t)
                            }
                            c(void 0)
                        }))
                    }
                }
            },
            318: t => {
                t.exports = function (t) {
                    return t && t.__esModule ? t : {
                        default: t
                    }
                }
            },
            757: (t, e, r) => {
                t.exports = r(666)
            },
            666: t => {
                var e = function (t) {
                    "use strict";
                    var e, r = Object.prototype,
                        n = r.hasOwnProperty,
                        o = "function" == typeof Symbol ? Symbol :
                        {},
                        i = o.iterator || "@@iterator",
                        a = o.asyncIterator || "@@asyncIterator",
                        c = o.toStringTag || "@@toStringTag";

                    function u(t, e, r) {
                        return Object.defineProperty(t, e, {
                            value: r,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }), t[e]
                    }
                    try {
                        u({}, "")
                    } catch (t) {
                        u = function (t, e, r) {
                            return t[e] = r
                        }
                    }

                    function s(t, e, r, n) {
                        var o = e && e.prototype instanceof v ? e :
                            v,
                            i = Object.create(o.prototype),
                            a = new _(n || []);
                        return i._invoke = function (t, e, r) {
                            var n = l;
                            return function (o, i) {
                                if(n === p) throw new Error(
                                    "Generator is already running"
                                    );
                                if(n === d) {
                                    if("throw" === o)
                                    throw i;
                                    return G()
                                }
                                for(r.method = o, r.arg =
                                    i;;) {
                                    var a = r.delegate;
                                    if(a) {
                                        var c = S(a, r);
                                        if(c) {
                                            if(c === y)
                                                continue;
                                            return c
                                        }
                                    }
                                    if("next" === r.method)
                                        r.sent = r._sent = r
                                        .arg;
                                    else if("throw" === r
                                        .method) {
                                        if(n === l)
                                        throw n = d, r
                                            .arg;
                                        r.dispatchException(
                                            r.arg)
                                    } else "return" === r
                                        .method && r.abrupt(
                                            "return", r.arg
                                            );
                                    n = p;
                                    var u = h(t, e, r);
                                    if("normal" === u
                                        .type) {
                                        if(n = r.done ? d :
                                            f, u.arg === y)
                                            continue;
                                        return {
                                            value: u.arg,
                                            done: r.done
                                        }
                                    }
                                    "throw" === u.type && (
                                        n = d, r
                                        .method =
                                        "throw", r.arg =
                                        u.arg)
                                }
                            }
                        }(t, r, a), i
                    }

                    function h(t, e, r) {
                        try {
                            return {
                                type: "normal",
                                arg: t.call(e, r)
                            }
                        } catch (t) {
                            return {
                                type: "throw",
                                arg: t
                            }
                        }
                    }
                    t.wrap = s;
                    var l = "suspendedStart",
                        f = "suspendedYield",
                        p = "executing",
                        d = "completed",
                        y = {};

                    function v() {}

                    function g() {}

                    function m() {}
                    var w = {};
                    w[i] = function () {
                        return this
                    };
                    var b = Object.getPrototypeOf,
                        L = b && b(b(k([])));
                    L && L !== r && n.call(L, i) && (w = L);
                    var x = m.prototype = v.prototype = Object
                        .create(w);

                    function M(t) {
                        ["next", "throw", "return"].forEach((
                            function (e) {
                                u(t, e, (function (t) {
                                    return this
                                        ._invoke(
                                            e, t
                                            )
                                }))
                            }))
                    }

                    function E(t, e) {
                        function r(o, i, a, c) {
                            var u = h(t[o], t, i);
                            if("throw" !== u.type) {
                                var s = u.arg,
                                    l = s.value;
                                return l && "object" == typeof l &&
                                    n.call(l, "__await") ? e
                                    .resolve(l.__await)
                                    .then((function (t) {
                                        r("next", t, a, c)
                                    }), (function (t) {
                                        r("throw", t, a, c)
                                    })) : e.resolve(l)
                                    .then((function (t) {
                                        s.value = t, a(s)
                                    }), (function (t) {
                                        return r("throw", t,
                                            a, c)
                                    }))
                            }
                            c(u.arg)
                        }
                        var o;
                        this._invoke = function (t, n) {
                            function i() {
                                return new e((function (e, o) {
                                    r(t, n, e, o)
                                }))
                            }
                            return o = o ? o.then(i, i) : i()
                        }
                    }

                    function S(t, r) {
                        var n = t.iterator[r.method];
                        if(n === e) {
                            if(r.delegate = null, "throw" === r
                                .method) {
                                if(t.iterator.return && (r.method =
                                        "return", r.arg = e, S(t,
                                        r), "throw" === r.method))
                                    return y;
                                r.method = "throw", r.arg =
                                    new TypeError(
                                        "The iterator does not provide a 'throw' method"
                                        )
                            }
                            return y
                        }
                        var o = h(n, t.iterator, r.arg);
                        if("throw" === o.type) return r.method =
                            "throw", r.arg = o.arg, r.delegate =
                            null, y;
                        var i = o.arg;
                        return i ? i.done ? (r[t.resultName] = i
                            .value, r.next = t.nextLoc,
                            "return" !== r.method && (r.method =
                                "next", r.arg = e), r.delegate =
                            null, y) : i : (r.method = "throw",
                            r.arg = new TypeError(
                                "iterator result is not an object"
                                ), r.delegate = null, y)
                    }

                    function T(t) {
                        var e = {
                            tryLoc: t[0]
                        };
                        1 in t && (e.catchLoc = t[1]), 2 in t && (e
                            .finallyLoc = t[2], e.afterLoc = t[
                                3]), this.tryEntries.push(e)
                    }

                    function O(t) {
                        var e = t.completion || {};
                        e.type = "normal", delete e.arg, t
                            .completion = e
                    }

                    function _(t) {
                        this.tryEntries = [{
                            tryLoc: "root"
                        }], t.forEach(T, this), this.reset(!0)
                    }

                    function k(t) {
                        if(t) {
                            var r = t[i];
                            if(r) return r.call(t);
                            if("function" == typeof t.next)
                        return t;
                            if(!isNaN(t.length)) {
                                var o = -1,
                                    a = function r() {
                                        for(; ++o < t.length;)
                                            if(n.call(t, o))
                                            return r.value = t[
                                                    o], r
                                                .done = !1, r;
                                        return r.value = e, r
                                            .done = !0, r
                                    };
                                return a.next = a
                            }
                        }
                        return {
                            next: G
                        }
                    }

                    function G() {
                        return {
                            value: e,
                            done: !0
                        }
                    }
                    return g.prototype = x.constructor = m, m
                        .constructor = g, g.displayName = u(m, c,
                            "GeneratorFunction"), t
                        .isGeneratorFunction = function (t) {
                            var e = "function" == typeof t && t
                                .constructor;
                            return !!e && (e === g ||
                                "GeneratorFunction" === (e
                                    .displayName || e.name))
                        }, t.mark = function (t) {
                            return Object.setPrototypeOf ? Object
                                .setPrototypeOf(t, m) : (t
                                    .__proto__ = m, u(t, c,
                                        "GeneratorFunction")), t
                                .prototype = Object.create(x), t
                        }, t.awrap = function (t) {
                            return {
                                __await: t
                            }
                        }, M(E.prototype), E.prototype[a] =
                        function () {
                            return this
                        }, t.AsyncIterator = E, t.async = function (
                            e, r, n, o, i) {
                            void 0 === i && (i = Promise);
                            var a = new E(s(e, r, n, o), i);
                            return t.isGeneratorFunction(r) ? a : a
                                .next()
                                .then((function (t) {
                                    return t.done ? t
                                        .value : a.next()
                                }))
                        }, M(x), u(x, c, "Generator"), x[i] =
                        function () {
                            return this
                        }, x.toString = function () {
                            return "[object Generator]"
                        }, t.keys = function (t) {
                            var e = [];
                            for(var r in t) e.push(r);
                            return e.reverse(),
                                function r() {
                                    for(; e.length;) {
                                        var n = e.pop();
                                        if(n in t) return r.value =
                                            n, r.done = !1, r
                                    }
                                    return r.done = !0, r
                                }
                        }, t.values = k, _.prototype = {
                            constructor: _,
                            reset: function (t) {
                                if(this.prev = 0, this.next = 0,
                                    this.sent = this._sent = e,
                                    this.done = !1, this
                                    .delegate = null, this
                                    .method = "next", this.arg =
                                    e, this.tryEntries.forEach(
                                        O), !t)
                                    for(var r in this) "t" === r
                                        .charAt(0) && n.call(
                                            this, r) && !isNaN(+
                                            r.slice(1)) && (
                                            this[r] = e)
                            },
                            stop: function () {
                                this.done = !0;
                                var t = this.tryEntries[0]
                                    .completion;
                                if("throw" === t.type) throw t
                                    .arg;
                                return this.rval
                            },
                            dispatchException: function (t) {
                                if(this.done) throw t;
                                var r = this;

                                function o(n, o) {
                                    return c.type = "throw", c
                                        .arg = t, r.next = n,
                                        o && (r.method = "next",
                                            r.arg = e), !!o
                                }
                                for(var i = this.tryEntries
                                        .length - 1; i >= 0; --
                                    i) {
                                    var a = this.tryEntries[i],
                                        c = a.completion;
                                    if("root" === a.tryLoc)
                                        return o("end");
                                    if(a.tryLoc <= this.prev) {
                                        var u = n.call(a,
                                                "catchLoc"),
                                            s = n.call(a,
                                                "finallyLoc");
                                        if(u && s) {
                                            if(this.prev < a
                                                .catchLoc)
                                                return o(a
                                                    .catchLoc,
                                                    !0);
                                            if(this.prev < a
                                                .finallyLoc)
                                                return o(a
                                                    .finallyLoc
                                                    )
                                        } else if(u) {
                                            if(this.prev < a
                                                .catchLoc)
                                                return o(a
                                                    .catchLoc,
                                                    !0)
                                        } else {
                                            if(!s) throw new Error(
                                                "try statement without catch or finally"
                                                );
                                            if(this.prev < a
                                                .finallyLoc)
                                                return o(a
                                                    .finallyLoc
                                                    )
                                        }
                                    }
                                }
                            },
                            abrupt: function (t, e) {
                                for(var r = this.tryEntries
                                        .length - 1; r >= 0; --
                                    r) {
                                    var o = this.tryEntries[r];
                                    if(o.tryLoc <= this.prev &&
                                        n.call(o,
                                        "finallyLoc") && this
                                        .prev < o.finallyLoc) {
                                        var i = o;
                                        break
                                    }
                                }
                                i && ("break" === t ||
                                        "continue" === t) && i
                                    .tryLoc <= e && e <= i
                                    .finallyLoc && (i = null);
                                var a = i ? i.completion : {};
                                return a.type = t, a.arg = e,
                                    i ? (this.method = "next",
                                        this.next = i
                                        .finallyLoc, y) : this
                                    .complete(a)
                            },
                            complete: function (t, e) {
                                if("throw" === t.type) throw t
                                    .arg;
                                return "break" === t.type ||
                                    "continue" === t.type ? this
                                    .next = t.arg : "return" ===
                                    t.type ? (this.rval = this
                                        .arg = t.arg, this
                                        .method = "return", this
                                        .next = "end") :
                                    "normal" === t.type && e &&
                                    (this.next = e), y
                            },
                            finish: function (t) {
                                for(var e = this.tryEntries
                                        .length - 1; e >= 0; --
                                    e) {
                                    var r = this.tryEntries[e];
                                    if(r.finallyLoc === t)
                                        return this.complete(r
                                                .completion, r
                                                .afterLoc), O(
                                            r), y
                                }
                            },
                            catch: function (t) {
                                for(var e = this.tryEntries
                                        .length - 1; e >= 0; --
                                    e) {
                                    var r = this.tryEntries[e];
                                    if(r.tryLoc === t) {
                                        var n = r.completion;
                                        if("throw" === n.type) {
                                            var o = n.arg;
                                            O(r)
                                        }
                                        return o
                                    }
                                }
                                throw new Error(
                                    "illegal catch attempt")
                            },
                            delegateYield: function (t, r, n) {
                                return this.delegate = {
                                        iterator: k(t),
                                        resultName: r,
                                        nextLoc: n
                                    }, "next" === this.method &&
                                    (this.arg = e), y
                            }
                        }, t
                }(t.exports);
                try {
                    regeneratorRuntime = e
                } catch (t) {
                    Function("r", "regeneratorRuntime = r")(e)
                }
            }
        },
        e = {};

    function r(n) {
        if(e[n]) return e[n].exports;
        var o = e[n] = {
            exports: {}
        };
        return t[n](o, o.exports, r), o.exports
    }(() => {
        "use strict";
        var t, e = r(318),
            n = e(r(757)),
            o = e(r(926)),
            i = document.querySelector(".chat-screen"),
            a = document.querySelector(".input-field"),
            c = document.querySelector(".input-button"),
            u = {
                chatRunning: !0,
                specialPhrase: "YELLOW",
                timer: "",
                botGreetings: ["Hello, how is going?",
                    "Hi, how are you?", "Hey there, whats up?"
                ],
                botMessages: ["Yes, it's good!",
                    "No, i don't recommend it.", "Nice idea!",
                    "Bad idea!", "Wow, that's cool!",
                    "Have a nice day!", "Let me think a little...",
                    "Weather is so cold today.",
                    "Wow, you are typing so fast!",
                    "Have a nice day!", "Are you still there?",
                    "What does this mean?",
                    "Sorry, what do you mean?", "No thank, you.",
                    "Okay, better ask Google.",
                    "Maybe Siri can help you..",
                    "Ha ha ha, thats fun!", "You are so right.",
                    "Do you like McDonalds?", "Your car is dirty.",
                    "Did you hear that noise? What was that?"
                ],
                sendGreetingInitiateStop: function () {
                    var t = Math.round(Math.random() * (this
                        .botGreetings.length - 1));
                    this.randomStop(), i.innerHTML += "<br>BOT: "
                        .concat(this.botGreetings[t])
                },
                botChooseMessage: function () {
                    var t = Math.round(Math.random() * (this
                        .botMessages.length - 1));
                    return "<br>BOT: ".concat(this.botMessages[t])
                },
                randomDelayMS: function () {
                    return 1e3 * Math.round(7 * Math.random() + 1)
                },
                botReply: (t = (0, o.default)(n.default.mark((
                    function t() {
                        var e, r = this;
                        return n.default.wrap((
                            function (t) {
                                for(;;) switch (
                                    t.prev =
                                    t.next
                                    ) {
                                case 0:
                                    return e =
                                        new Promise(
                                            (function (
                                                t
                                                ) {
                                                r.timer =
                                                    setTimeout(
                                                        (function () {
                                                            return t(
                                                                r
                                                                .botChooseMessage()
                                                                )
                                                        }),
                                                        r
                                                        .randomDelayMS()
                                                        )
                                            })
                                            ),
                                        t
                                        .t0 =
                                        i
                                        .innerHTML,
                                        t
                                        .next =
                                        4,
                                        e;
                                case 4:
                                    i.innerHTML =
                                        t
                                        .t0 +=
                                        t
                                        .sent;
                                case 5:
                                case "end":
                                    return t
                                        .stop()
                                }
                            }), t)
                    }))), function () {
                    return t.apply(this, arguments)
                }),
                stopChat: function () {
                    c.onclick = null, c.className =
                        "inactive-button", u = "CHAT STOPPED", a
                        .value = "", a.setAttribute("disabled",
                            "disabled")
                },
                randomStop: function () {
                    var t = this,
                        e = Math.floor(19e4 * Math.random()) + 1e4,
                        r = (e / 1e3)
                        .toFixed(0) + " seconds";
                    i.innerHTML +=
                        "<b>SYSTEM: Chat will be stopped after "
                        .concat(r, "</b>"), setTimeout((
                    function () {
                            if(t.chatRunning) return t
                                .stopChat(),
                                clearTimeout(t.timer),
                                void(i.innerHTML +=
                                    "<br><b>SYSTEM: --- Session completed, chat stopped ---</b>"
                                    )
                        }), e)
                },
                launch: function () {
                    if(clearTimeout(this.timer), a.value) {
                        if(i.innerHTML += "<br>YOU: ".concat(a
                                .value), a.value === this
                            .specialPhrase) return this.running = !
                            1, this.stopChat(), void(i
                                .innerHTML +=
                                "<br><b>SYSTEM: --- Special phrase detected, chat stopped ---</b>"
                                );
                        this.botReply(), a.value = ""
                    }
                }
            };
        i.onload = u.sendGreetingInitiateStop(), c.onclick =
    function () {
            return u.launch()
        }
    })()
})();
