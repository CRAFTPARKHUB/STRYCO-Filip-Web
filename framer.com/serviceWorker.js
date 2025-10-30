"use strict";
(() => {
    var We = Object.create;
    var ue = Object.defineProperty;
    var Ce = Object.getOwnPropertyDescriptor;
    var Ue = Object.getOwnPropertyNames;
    var $e = Object.getPrototypeOf,
        ze = Object.prototype.hasOwnProperty;
    var Ve = (r, e) => () => (e || r((e = {
        exports: {}
    }).exports, e), e.exports);
    var Ke = (r, e, t, n) => {
        if (e && typeof e == "object" || typeof e == "function")
            for (let o of Ue(e)) !ze.call(r, o) && o !== t && ue(r, o, {
                get: () => e[o],
                enumerable: !(n = Ce(e, o)) || n.enumerable
            });
        return r
    };
    var He = (r, e, t) => (t = r != null ? We($e(r)) : {}, Ke(e || !r || !r.__esModule ? ue(t, "default", {
        value: r,
        enumerable: !0
    }) : t, r));
    var pe = Ve((q, G) => {
        (function(r, e) {
            typeof q == "object" && typeof G < "u" ? G.exports = e() : typeof define == "function" && define.amd ? define(e) : (r = r || self)["tiny-lru"] = e()
        })(q, function() {
            "use strict";
            class r {
                constructor(t = 0, n = 0) {
                    this.first = null, this.items = Object.create(null), this.last = null, this.max = t, this.size = 0, this.ttl = n
                }
                has(t) {
                    return t in this.items
                }
                clear() {
                    return this.first = null, this.items = Object.create(null), this.last = null, this.size = 0, this
                }
                delete(t) {
                    if (this.has(t)) {
                        let n = this.items[t];
                        delete this.items[t], this.size--, n.prev !== null && (n.prev.next = n.next), n.next !== null && (n.next.prev = n.prev), this.first === n && (this.first = n.next), this.last === n && (this.last = n.prev)
                    }
                    return this
                }
                evict() {
                    let t = this.first;
                    return delete this.items[t.key], this.first = t.next, this.first.prev = null, this.size--, this
                }
                get(t) {
                    let n;
                    if (this.has(t)) {
                        let o = this.items[t];
                        this.ttl > 0 && o.expiry <= new Date().getTime() ? this.delete(t) : (n = o.value, this.set(t, n, !0))
                    }
                    return n
                }
                keys() {
                    return Object.keys(this.items)
                }
                set(t, n, o = !1) {
                    let i;
                    if (o || this.has(t)) {
                        if (i = this.items[t], i.value = n, o === !1 && (i.expiry = this.ttl > 0 ? new Date().getTime() + this.ttl : this.ttl), this.last !== i) {
                            let s = this.last,
                                u = i.next,
                                h = i.prev;
                            this.first === i && (this.first = i.next), i.next = null, i.prev = this.last, s.next = i, h !== null && (h.next = u), u !== null && (u.prev = h)
                        }
                    } else this.max > 0 && this.size === this.max && this.evict(), i = this.items[t] = {
                        expiry: this.ttl > 0 ? new Date().getTime() + this.ttl : this.ttl,
                        key: t,
                        prev: this.last,
                        next: null,
                        value: n
                    }, ++this.size == 1 ? this.first = i : this.last.next = i;
                    return this.last = i, this
                }
            }
            return function(e = 1e3, t = 0) {
                if (isNaN(e) || e < 0) throw new TypeError("Invalid max value");
                if (isNaN(t) || t < 0) throw new TypeError("Invalid ttl value");
                return new r(e, t)
            }
        })
    });

    function fe() {
        return ["/web/v2/dashboard/metadata"]
    }
    var Be = He(pe());

    function g(r, e) {
        r.waitUntil(e)
    }

    function w(r, ...e) {
        if (r) return;
        let t = Error("Assertion Error" + (e.length > 0 ? ": " + e.join(" ") : ""));
        if (t.stack) try {
            let n = t.stack.split(`
`);
            n[1] ? .includes("assert") ? (n.splice(1, 1), t.stack = n.join(`
`)) : n[0] ? .includes("assert") && (n.splice(0, 1), t.stack = n.join(`
`))
        } catch {}
        throw t
    }
    var qt = Symbol("missing");
    var Jt = Object.freeze([]);
    var he;

    function ge({
        error: r,
        tags: e,
        extras: t,
        critical: n,
        caller: o
    }) {
        w(he, "Set up an error callback with setErrorReporter, or configure Sentry with initializeEnvironment");
        let i = Y(r, o);
        return he({
            error: i,
            tags: { ...i.tags,
                ...e
            },
            extras: { ...i.extras,
                ...t
            },
            critical: !!n
        }), i
    }

    function Y(r, e = Y) {
        return r instanceof Error ? r : new J(r, e)
    }
    var J = class extends Error {
        constructor(e, t) {
            let n = e ? JSON.stringify(e) : "No error message provided";
            if (super(n), this.message = n, t && Error.captureStackTrace) Error.captureStackTrace(this, t);
            else try {
                throw new Error
            } catch (o) {
                this.stack = o.stack
            }
        }
    };
    var S = typeof window < "u" ? window.location.hostname : void 0,
        me = !!(S && ["web.framerlocal.com", "localhost", "127.0.0.1", "[::1]"].includes(S)),
        Q = (() => {
            if (!S) return;
            if (me) return {
                main: S,
                previewLink: void 0
            };
            let r = /^(([^.]+\.)?beta\.)?((?:development\.)?framer\.com)$/u,
                e = S.match(r);
            if (!(!e || !e[3])) return {
                previewLink: e[2] && e[0],
                main: e[3]
            }
        })(),
        xe = {
            hosts: Q,
            isDevelopment: Q ? .main === "development.framer.com",
            isProduction: Q ? .main === "framer.com",
            isLocal: me
        };
    var N;

    function B() {
        return typeof window > "u" ? {} : N || (N = Je(), N)
    }

    function Je() {
        let r = window.location,
            e = window ? .bootstrap ? .services;
        if (e) return e;
        let t;
        try {
            if (t = window.top.location.origin, e = window.top ? .bootstrap ? .services, e) return e
        } catch {}
        if (t && t !== r.origin) throw Error(`Unexpectedly embedded by ${t} (expected ${r.origin})`);
        if (r.origin.endsWith("framer.com") || r.origin.endsWith("framer.dev")) throw Error("ServiceMap data was not provided in document");
        try {
            let n = new URLSearchParams(r.search).get("services") || new URLSearchParams(r.hash.substring(1)).get("services");
            n && (e = JSON.parse(n))
        } catch {}
        if (e && typeof e == "object" && e.api) return e;
        throw Error("ServiceMap requested but not available")
    }

    function L(r, e = 0, t = new Set) {
        if (r === null) return r;
        if (typeof r == "function") return `[Function: ${r.name??"unknown"}]`;
        if (typeof r != "object") return r;
        if (r instanceof Error) return `[${r.toString()}]`;
        if (t.has(r)) return "[Circular]";
        if (e > 2) return "...";
        t.add(r);
        try {
            if ("toJSON" in r && typeof r.toJSON == "function") return L(r.toJSON(), e + 1, t);
            if (Array.isArray(r)) return r.map(n => L(n, e + 1, t));
            if (Object.getPrototypeOf(r) !== Object.prototype) return `[Object: ${"__class"in r&&r.__class||r.constructor?.name}]`; {
                let n = {};
                for (let [o, i] of Object.entries(r)) n[o] = L(i, e + 1, t);
                return n
            }
        } catch (n) {
            return `[Throws: ${n instanceof Error?n.message:n}]`
        } finally {
            t.delete(r)
        }
    }
    var Ye = ["trace", "debug", "info", "warn", "error"],
        Qe = [":trace", ":debug", ":info", ":warn", ":error"];

    function we(r, e) {
        let t = [];
        for (let n of r.split(/[ ,]/u)) {
            let o = n.trim();
            if (o.length === 0) continue;
            let i = 1,
                s = !1;
            o.startsWith("-") && (o = o.slice(1), i = 3, s = !0);
            for (let x = 0; x <= 4; x++) {
                let D = Qe[x];
                if (D && o.endsWith(D)) {
                    i = x, s && (i += 1), o = o.slice(0, o.length - D.length), o.length === 0 && (o = "*");
                    break
                }
            }
            let u = new RegExp("^" + nt(o).replace(/\\\*/gu, ".*") + "$"),
                h = 0;
            for (let x of e) x.id.match(u) && (x.level = i, ++h);
            h === 0 && t.push(n)
        }
        return t
    }
    var R = class r {
            constructor(e, t, n) {
                this.logger = e;
                this.level = t;
                this.parts = n;
                this.id = r.nextId++, this.time = Date.now()
            }
            static nextId = 0;
            id;
            time;
            stringPrefix;
            toMessage() {
                if (this.stringPrefix) return this.parts;
                let e = [new Date(this.time).toISOString().substr(-14, 14), Ye[this.level] + ": [" + this.logger.id + "]"],
                    t = 0;
                for (; t < this.parts.length; t++) {
                    let n = this.parts[t];
                    if (typeof n == "string") {
                        e.push(n);
                        continue
                    }
                    break
                }
                return this.stringPrefix = e.join(" "), this.parts.splice(0, t, this.stringPrefix), this.parts
            }
            toString() {
                return this.toMessage().map(e => {
                    let t = typeof e;
                    if (t === "string") return e;
                    if (t === "function") return `[Function: ${e.name??"unknown"}]`;
                    if (e instanceof Error) return e.stack ? ? e.toString();
                    let n = JSON.stringify(L(e));
                    return n ? .length > 253 ? n.slice(0, 250) + "..." : n
                }).join(" ")
            }
        },
        m = "*:app:info,app:info",
        Ee = typeof process < "u" && !!process.kill,
        Ze = Ee && !!process.env.CI;
    Ze ? m = "-:warn" : Ee && (m = "");
    try {
        typeof window < "u" && window.localStorage && (m = window.localStorage.logLevel || m)
    } catch {}
    try {
        typeof process < "u" && (m = process.env.DEBUG || m)
    } catch {}
    try {
        typeof window < "u" && Object.assign(window, {
            setLogLevel: be
        })
    } catch {}
    try {
        typeof window < "u" && window.postMessage && window.top === window && window.addEventListener("message", r => {
            if (!r.data || typeof r.data != "object") return;
            let {
                loggerId: e,
                level: t,
                parts: n,
                printed: o
            } = r.data;
            if (typeof e != "string" || !Array.isArray(n) || n.length < 1 || typeof t != "number") return;
            let i = I(e);
            if (t < 0 || t > 5) return;
            n[0] = n[0].replace("[", "*[");
            let s = new R(i, t, n);
            s.stringPrefix = n[0], y.push(s), !o && (i.level > t || console ? .log(...s.toMessage()))
        })
    } catch {}
    var X;
    try {
        typeof window < "u" && window.postMessage && window.parent !== window && !window.location.pathname.startsWith("/edit") && (X = r => {
            try {
                let e = r.toMessage().map(s => L(s)),
                    t = r.logger,
                    n = r.level,
                    o = t.level <= r.level,
                    i = {
                        loggerId: t.id,
                        level: n,
                        parts: e,
                        printed: o
                    };
                window.parent ? .postMessage(i, B().app)
            } catch {}
        })
    } catch {}
    var Z = {},
        y = [],
        Ie = 1e3;

    function E(r, e, t) {
        let n = new R(r, e, t);
        for (y.push(n), X ? .(n); y.length > Ie;) y.shift();
        return n
    }

    function Me(r) {
        return typeof r == "number" && (Ie = r), y
    }
    var Xe = /\/(?<filename>[^/.]+)(?=\.(?:debug\.)?html$)/u,
        ye;

    function et() {
        if (!(typeof window > "u" || !window.location)) return ye ? ? = Xe.exec(window.location.pathname) ? .groups ? .filename, ye
    }

    function I(r) {
        let e = et();
        r = (e ? e + ":" : "") + r;
        let t = Z[r];
        if (t) return t;
        let n = new _(r);
        return Z[r] = n, we(m, [n]), X ? .(new R(n, -1, [])), n
    }

    function be(r, e = !0) {
        try {
            typeof window < "u" && window.localStorage && (window.localStorage.logLevel = r)
        } catch {}
        let t = m;
        m = r;
        let n = Object.values(Z);
        for (let i of n) i.level = 3;
        let o = we(r, n);
        if (o.length > 0 && console ? .warn("Some log level specs matched no loggers:", o), e && y.length > 0) {
            console ? .log("--- LOG REPLAY ---");
            for (let i of y) i.logger.level > i.level || (i.level >= 3 ? console ? .warn(...i.toMessage()) : console ? .log(...i.toMessage()));
            console ? .log("--- END OF LOG REPLAY ---")
        }
        return t
    }
    var tt = r => {
            let e = { ...r,
                logs: Me().slice(-50).map(t => t.toString().slice(0, 600)).join(`
`)
            };
            return r.logs && console ? .warn("extras.logs is reserved for log replay buffer, use another key"), e
        },
        _ = class {
            constructor(e, t) {
                this.id = e;
                this.errorIsCritical = t ? ? (e === "fatal" || e.endsWith(":fatal"))
            }
            level = 3;
            didLog = {};
            errorIsCritical;
            extend(e) {
                let t = this.id + ":" + e;
                return I(t)
            }
            getBufferedMessages() {
                return y.filter(e => e.logger === this)
            }
            setLevel(e) {
                let t = this.level;
                return this.level = e, t
            }
            isLoggingTraceMessages() {
                return this.level >= 0
            }
            trace = (...e) => {
                if (this.level > 0) return;
                let t = E(this, 0, e);
                console ? .log(...t.toMessage())
            };
            debug = (...e) => {
                let t = E(this, 1, e);
                this.level > 1 || console ? .log(...t.toMessage())
            };
            info = (...e) => {
                let t = E(this, 2, e);
                this.level > 2 || console ? .info(...t.toMessage())
            };
            warn = (...e) => {
                let t = E(this, 3, e);
                this.level > 3 || console ? .warn(...t.toMessage())
            };
            warnOncePerMinute = (e, ...t) => {
                let n = this.didLog[e];
                if (n && n > Date.now()) return;
                this.didLog[e] = Date.now() + 1e3 * 60, t.unshift(e);
                let o = E(this, 3, t);
                this.level > 3 || console ? .warn(...o.toMessage())
            };
            error = (...e) => {
                let t = E(this, 4, e);
                this.level > 4 || console ? .error(...t.toMessage())
            };
            errorOncePerMinute = (e, ...t) => {
                let n = this.didLog[e];
                if (n && n > Date.now()) return;
                this.didLog[e] = Date.now() + 1e3 * 60, t.unshift(e);
                let o = E(this, 4, t);
                this.level > 4 || console ? .error(...o.toMessage())
            };
            reportWithoutLogging = (e, t, n, o) => {
                let i = tt(t ? ? {}),
                    s = ge({
                        caller: this.reportWithoutLogging,
                        error: e,
                        tags: { ...n,
                            handler: "logger",
                            where: this.id
                        },
                        extras: t,
                        critical: o ? ? this.errorIsCritical
                    });
                return [i, s]
            };
            reportError = (e, t, n, o) => {
                let [i, s] = this.reportWithoutLogging(e, t, n, o);
                i ? this.error(s, i) : this.error(s)
            };
            reportErrorOncePerMinute = (e, t) => {
                if (!rt(e)) return;
                let n = this.didLog[e.message];
                n && n > Date.now() || (this.didLog[e.message] = Date.now() + 1e3 * 60, this.reportError(e, t))
            };
            reportCriticalError = (e, t, n) => this.reportError(e, t, n, !0)
        };

    function rt(r) {
        return Object.prototype.hasOwnProperty.call(r, "message")
    }

    function nt(r) {
        return r.replace(/[/\-\\^$*+?.()|[\]{}]/gu, "\\$&")
    }
    var it = Symbol("Mixed");
    var ke = "dependencies",
        ve = "config",
        ee = `${ve}/${ke}`,
        st = "importMap.json",
        at = "dependencies.json",
        lt = `${ee}/${st}`,
        ct = `${ee}/${at}`;
    var Te;
    (Ot => {
        function r(l, ...a) {
            return l.concat(a)
        }
        Ot.push = r;

        function e(l) {
            return l.slice(0, -1)
        }
        Ot.pop = e;

        function t(l, ...a) {
            return a.concat(l)
        }
        Ot.unshift = t;

        function n(l, a, ...c) {
            let p = l.length;
            if (a < 0 || a > p) throw Error("index out of range: " + a);
            let d = l.slice();
            return d.splice(a, 0, ...c), d
        }
        Ot.insert = n;

        function o(l, a, c) {
            let p = l.length;
            if (a < 0 || a >= p) throw Error("index out of range: " + a);
            let d = Array.isArray(c) ? c : [c],
                T = l.slice();
            return T.splice(a, 1, ...d), T
        }
        Ot.replace = o;

        function i(l, a) {
            let c = l.length;
            if (a < 0 || a >= c) throw Error("index out of range: " + a);
            let p = l.slice();
            return p.splice(a, 1), p
        }
        Ot.remove = i;

        function s(l, a, c) {
            let p = l.length;
            if (a < 0 || a >= p) throw Error("from index out of range: " + a);
            if (c < 0 || c >= p) throw Error("to index out of range: " + c);
            let d = l.slice();
            if (c === a) return d;
            let T = d[a];
            return a < c ? (d.splice(c + 1, 0, T), d.splice(a, 1)) : (d.splice(a, 1), d.splice(c, 0, T)), d
        }
        Ot.move = s;

        function u(l, a) {
            let c = [],
                p = Math.min(l.length, a.length);
            for (let d = 0; d < p; d++) c.push([l[d], a[d]]);
            return c
        }
        Ot.zip = u;

        function h(l, a, c) {
            let p = l.slice(),
                d = p[a];
            return d === void 0 || (p[a] = c(d)), p
        }
        Ot.update = h;

        function x(l) {
            return Array.from(new Set(l))
        }
        Ot.unique = x;

        function D(l, ...a) {
            return Array.from(new Set([...l, ...a.flat()]))
        }
        Ot.union = D;

        function At(l, a) {
            return l.filter(a)
        }
        Ot.filter = At
    })(Te || = {});
    var dt = Object.prototype.hasOwnProperty;

    function ut(r, e) {
        return dt.call(r, e)
    }
    var Se;
    (n => {
        function r(o, i) {
            for (let s of Object.keys(o)) ut(i, s) || delete o[s];
            for (let s of Object.keys(i)) o[s] === void 0 && (o[s] = i[s]);
            return Object.setPrototypeOf(o, Object.getPrototypeOf(i)), o
        }
        n.morphUsingTemplate = r;

        function e(o, i) {
            i && Object.assign(o, i)
        }
        n.writeOnce = e;

        function t(o, i) {
            return Object.assign(Object.create(Object.getPrototypeOf(o)), o, i)
        }
        n.update = t
    })(Se || = {});
    var Le;
    (o => {
        function r(i, ...s) {
            return new Set([...i, ...s])
        }
        o.add = r;

        function e(i, ...s) {
            let u = new Set(i);
            for (let h of s) u.delete(h);
            return u
        }
        o.remove = e;

        function t(...i) {
            let s = new Set;
            for (let u of i)
                for (let h of u) s.add(h);
            return s
        }
        o.union = t;

        function n(i, s) {
            return i.has(s) ? o.remove(i, s) : o.add(i, s)
        }
        o.toggle = n
    })(Le || = {});
    var Re;
    (t => {
        function r(n, o, i) {
            let s = new Map(n);
            return s.set(o, i), s
        }
        t.set = r;

        function e(n, o) {
            let i = new Map(n);
            return i.delete(o), i
        }
        t.remove = e
    })(Re || = {});
    var F = class extends Promise {
        _state = "initial";
        resolve;
        reject;
        get state() {
            return this._state
        }
        pending() {
            return this._state = "pending", this
        }
        isResolved() {
            return this._state === "fulfilled" || this._state === "rejected"
        }
        constructor() {
            let e, t;
            super((n, o) => {
                e = n, t = o
            }), this.resolve = n => {
                this._state = "fulfilled", e(n)
            }, this.reject = n => {
                this._state = "rejected", t(n)
            }
        }
    };
    F.prototype.constructor = Promise;
    var ft = !1,
        pt = !1,
        ht = !1;
    typeof window < "u" && window.scheduler && (ft = "yield" in window.scheduler, pt = "postTask" in window.scheduler, ht = "isInputPending" in window.scheduler);
    var Lr = I("task-queue");

    function gt() {
        var r = !navigator.userAgentData && /Safari\//.test(navigator.userAgent) && !/Chrom(e|ium)\//.test(navigator.userAgent);
        if (!r || !indexedDB.databases) return Promise.resolve();
        var e;
        return new Promise(function(t) {
            var n = function() {
                return indexedDB.databases().finally(t)
            };
            e = setInterval(n, 100), n()
        }).finally(function() {
            return clearInterval(e)
        })
    }
    var Pe = gt;

    function j(r) {
        return new Promise((e, t) => {
            r.oncomplete = r.onsuccess = () => e(r.result), r.onabort = r.onerror = () => t(r.error)
        })
    }

    function Ae(r, e, t) {
        let n = indexedDB.open(r, t);
        return n.onupgradeneeded = () => n.result.createObjectStore(e), j(n)
    }

    function mt(r, e) {
        let t = Pe().then(() => Ae(r, e)).then(n => n.objectStoreNames.contains(e) ? n : (n.close(), Ae(r, e, n.version + 1)));
        return (n, o) => t.then(i => o(i.transaction(e, n).objectStore(e)))
    }
    var te;

    function re() {
        return te || (te = mt("keyval-store", "keyval")), te
    }

    function W(r, e = re()) {
        return e("readonly", t => j(t.get(r)))
    }

    function C(r, e, t = re()) {
        return t("readwrite", n => (n.put(e, r), j(n.transaction)))
    }

    function U(r, e = re()) {
        return e("readwrite", t => (t.delete(r), j(t.transaction)))
    }
    var M = class extends Error {};
    M.prototype.name = "InvalidTokenError";

    function xt(r) {
        return decodeURIComponent(atob(r).replace(/(.)/g, (e, t) => {
            let n = t.charCodeAt(0).toString(16).toUpperCase();
            return n.length < 2 && (n = "0" + n), "%" + n
        }))
    }

    function yt(r) {
        let e = r.replace(/-/g, "+").replace(/_/g, "/");
        switch (e.length % 4) {
            case 0:
                break;
            case 2:
                e += "==";
                break;
            case 3:
                e += "=";
                break;
            default:
                throw new Error("base64 string is not of the correct length")
        }
        try {
            return xt(e)
        } catch {
            return atob(e)
        }
    }

    function De(r, e) {
        if (typeof r != "string") throw new M("Invalid token specified: must be a string");
        e || (e = {});
        let t = e.header === !0 ? 0 : 1,
            n = r.split(".")[t];
        if (typeof n != "string") throw new M(`Invalid token specified: missing part #${t+1}`);
        let o;
        try {
            o = yt(n)
        } catch (i) {
            throw new M(`Invalid token specified: invalid base64 for part #${t+1} (${i.message})`)
        }
        try {
            return JSON.parse(o)
        } catch (i) {
            throw new M(`Invalid token specified: invalid json for part #${t+1} (${i.message})`)
        }
    }
    var P = class r {
        scopes;
        constructor(e) {
            if (this.scopes = BigInt(0), typeof e == "string") {
                this.scopes = BigInt(e).valueOf();
                return
            }
            if (typeof e == "bigint") {
                this.scopes = e;
                return
            }
            if (typeof e == "number") {
                this.addScope(e);
                return
            }
            if (Array.isArray(e)) {
                this.addScope(...e);
                return
            }
        }
        addScope(...e) {
            for (let t of e) {
                if (t < 0) throw new Error("Scope must be 0 or bigger.");
                this.scopes = this.scopes | BigInt(1 << t).valueOf()
            }
        }
        hasScope(e) {
            if (e < 0) throw new Error("Scope must be 0 or bigger.");
            return !!(this.scopes >> BigInt(e) & BigInt(1))
        }
        intersection(e) {
            return new r(this.scopes & e.valueOf())
        }
        matches(e) {
            return this.intersection(e).valueOf() === this.scopes
        }
        valueOf() {
            return this.scopes
        }
        toString() {
            return this.scopes.toString()
        }
    };
    var ne = new P([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
    var z = class r extends Error {
            message;
            code;
            data;
            isTemporary;
            ref;
            status;
            skipSentry;
            constructor({
                message: e,
                code: t,
                data: n = {},
                isTemporary: o,
                ref: i,
                status: s,
                skipSentry: u,
                cause: h
            }) {
                super(), Error.captureStackTrace && Error.captureStackTrace(this, r), this.message = e, this.code = t, this.data = n, this.isTemporary = !0, this.ref = i, this.status = s, this.skipSentry = !!u, this.cause = h, o !== void 0 ? this.isTemporary = o : s && (this.isTemporary = s !== $.BadRequest)
            }
            toString() {
                return this.message
            }
            isUnauthorized() {
                return this.status === $.Unauthorized
            }
            isNotFound() {
                return this.status === $.NotFound
            }
            isForbidden() {
                return this.status === $.Forbidden
            }
            isClientError() {
                return this.status && this.status >= 400 && this.status < 500
            }
            isServerError() {
                return this.status && this.status >= 500
            }
        },
        $ = {
            Ok: 200,
            BadRequest: 400,
            Unauthorized: 401,
            PaymentDeclined: 402,
            Forbidden: 403,
            NotFound: 404,
            Conflict: 409
        };
    var f = I("accessTokenRefresher"),
        wt = 401,
        ie = "access_token",
        oe = "access_token.edit",
        Et = 90 * 1e3,
        It = 30 * 1e3,
        V = class {
            constructor(e, t) {
                this.options = t;
                this.url = `${e}/auth/web/access-token`;
                try {
                    typeof window < "u" && window.top ? .location.href
                } catch {
                    this.isEmbeddedCrossOrigin = !0
                }
            }
            _accessToken;
            _accessTokenExpiry;
            _accessTokenStorageKey;
            timer = null;
            url;
            accessTokenWaitList = [];
            retryAttempt = 0;
            MaxRetryDelay = 60 * 1e3;
            BaseRetryDelay = 1e3;
            isUnauthorized = !1;
            hasStarted = !1;
            isEmbeddedCrossOrigin = !1;
            async start() {
                w(!this.hasStarted, "Attempt to start AccessTokenRefresher more than once."), this.hasStarted = !0;
                let e = await this.loadAccessTokenFromStorage();
                if (e) {
                    let {
                        accessToken: t,
                        expiry: n,
                        storageKey: o
                    } = e;
                    this.setToken(t, n, o), this.scheduleRefreshAt(se(n))
                } else await this.refreshAccessTokenAndScheduleNextRefresh()
            }
            registerForNewToken(e) {
                f.debug("Adding waiter for new token"), this.accessTokenWaitList.push(e)
            }
            flushWaitList() {
                let e = this.accessTokenWaitList;
                this.accessTokenWaitList = [], f.debug("Flushing waitlist, contains", e.length, "waiters");
                for (let t of e) t(this._accessToken)
            }
            isUnauthorizedResponse(e) {
                return e.status === wt
            }
            handleServerError = e => {
                if (!this.isUnauthorizedResponse(e)) throw f.debug("Error response status:", e.status, "with text:", e.statusText), this.retryWithBackoff(), new z({
                    status: e.status,
                    message: e.statusText
                })
            };
            async refreshAccessTokenAndScheduleNextRefresh() {
                f.debug("Renewing access token"), this.hasStarted || (this.hasStarted = !0);
                let e;
                try {
                    e = await fetch(this.url, {
                        credentials: "include"
                    })
                } catch {
                    f.error("Connection error, retrying\u2026"), this.retryWithBackoff();
                    return
                }
                if (!e.ok) {
                    this.handleServerError(e), this.isUnauthorizedResponse(e) && (f.debug("Turning on unauthorized mode"), this.isUnauthorized = !0, this.flushWaitList());
                    return
                }
                f.debug("Received access token"), this.retryAttempt = 0;
                let t = await e.json(),
                    {
                        accessToken: n
                    } = t,
                    o = De(n),
                    i = new P(o.scopes);
                if (!this.isEmbeddedCrossOrigin && !ne.matches(i)) {
                    await this.discardAccessToken(), f.reportError(`Received access token has insufficient scopes. Wanted: ${ne.valueOf()}, got: ${i.valueOf()}`, void 0, void 0, !0), this.options ? .onInsufficientScopes ? .(this), this.retryWithBackoff();
                    return
                }
                let s;
                if (t.expiresInSeconds ? (s = Date.now() + t.expiresInSeconds * 1e3, f.debug("Received expiry seconds:", t.expiresInSeconds)) : s = t.expiresAt, !n) {
                    f.error("Unable to authenticate client"), this.retryWithBackoff();
                    return
                }
                let u = new Date(s);
                if (Number.isNaN(u.getTime())) {
                    f.error("Access Token expiry date is invalid"), this.retryWithBackoff();
                    return
                }
                this.setToken(n, u, this.isEmbeddedCrossOrigin ? oe : ie), this.scheduleRefreshAt(se(u))
            }
            setToken(e, t, n) {
                f.debug("Setting acccess token"), this._accessToken = e, this._accessTokenExpiry = t, this._accessTokenStorageKey = n, this.flushWaitList(), this.saveAccessTokenInStorage(n, {
                    accessToken: e,
                    expiresAt: t.toISOString()
                })
            }
            clearRefreshTimer() {
                this.timer && (f.debug("Clearing refresh timer"), clearTimeout(this.timer), this.timer = null)
            }
            retryWithBackoff() {
                this.clearRefreshTimer(), this.retryAttempt += 1;
                let e = Math.floor(Math.random() * Math.min(this.MaxRetryDelay, this.BaseRetryDelay * 2 ** this.retryAttempt));
                f.debug("Retrying after", e), this.scheduleRefreshAfter(e)
            }
            scheduleRefreshAfter(e) {
                this.clearRefreshTimer(), this.timer = setTimeout(() => this.refreshAccessTokenAndScheduleNextRefresh(), e)
            }
            scheduleRefreshAt(e) {
                let t = e.getTime() - new Date().getTime();
                if (t <= 0) throw new Error("Refresh time is not valid");
                this.scheduleRefreshAfter(t)
            }
            async saveAccessTokenInStorage(e, t) {
                try {
                    await C(e, t)
                } catch (n) {
                    f.debug("Error in storing access token", n)
                }
            }
            async loadAccessTokenFromStorage() {
                let e = this.isEmbeddedCrossOrigin ? oe : ie;
                try {
                    let t = await W(e);
                    if (!t) return null;
                    let {
                        accessToken: n,
                        expiresAt: o
                    } = t, i = new Date(o);
                    return new Date >= se(i) ? null : {
                        accessToken: n,
                        expiry: i,
                        storageKey: e
                    }
                } catch (t) {
                    return f.warn("Warning: failed to read the access token from IndexedDB (via idb-keyval):", t), null
                }
            }
            hasAccessTokenExpired() {
                return this._accessTokenExpiry ? new Date().getTime() >= this._accessTokenExpiry.getTime() - It : !1
            }
            isAccessTokenValid() {
                return this._accessToken && !this.isUnauthorized && !this.hasAccessTokenExpired()
            }
            async getAccessToken() {
                if (this.isUnauthorized) return Promise.resolve(void 0);
                if (this.isAccessTokenValid()) return Promise.resolve(this._accessToken);
                let e = new Promise(t => this.registerForNewToken(t));
                return this.hasAccessTokenExpired() && await this.discardAccessToken(!0), this.hasStarted || await this.start(), e
            }
            async getAuthorizationHeaderValue() {
                let e = await this.getAccessToken();
                if (e) return `Bearer ${e}`
            }
            async stopAuthentication() {
                try {
                    await this.discardAccessToken(!1), this.hasStarted = !1, await U(ie), await U(oe)
                } catch {}
            }
            async discardAccessToken(e = !1) {
                try {
                    f.debug("Discarding access token with renewal", e), this.clearRefreshTimer(), this._accessToken = void 0, this._accessTokenExpiry = void 0, this._accessTokenStorageKey && await U(this._accessTokenStorageKey), this._accessTokenStorageKey = void 0, e && !this.isUnauthorized && this.scheduleRefreshAfter(0)
                } catch {}
            }
            async withAuthorizationHeader(e) {
                let t = await this.getAuthorizationHeaderValue();
                return t && (e.headers = new Headers(e.headers), e.headers.set("authorization", t)), e
            }
        };

    function se(r) {
        return new Date(r.getTime() - Et)
    }
    var K;
    b();
    async function b() {
        if (!K) try {
            K = await W("apiBaseURL")
        } catch (r) {
            console.log("Unable to get apiBaseURL from IndexedDB", r)
        }
        return K
    }
    async function Ne(r) {
        K = r, await C("apiBaseURL", r)
    }
    var k;
    ae();
    async function ae() {
        let r = await b();
        r && (k = new V(r))
    }
    var Mt = 100,
        bt = 2 * 60 * 1e3,
        le = (0, Be.default)(Mt, bt);
    async function kt(r, e) {
        try {
            return await r.responsePromise
        } catch (t) {
            return console.error(`The prefetch request failed for some reason. Maybe the prefetching implementation got outdated, and we\u2019re sending incorrect requests?

`, t), fetch(e)
        }
    }
    async function vt() {
        if (!k) return;
        let r = await b();
        if (!r) throw new Error("The service worker has the access token but doesn\u2019t have the API server. This isn\u2019t supposed to happen because accessTokenRefresher also depends on the API server.");
        let e = await k.withAuthorizationHeader({
                mode: "cors",
                credentials: "include",
                redirect: "error"
            }),
            t = Tt(r, ...fe());
        return {
            dashboard: {
                url: t,
                responsePromise: fetch(t, e)
            }
        }
    }

    function Tt(r, e, t) {
        let n = new URL(e, r);
        return t && (n.search = `?${new URLSearchParams(t)}`), n.href
    }

    function St(r) {
        let e = new URL(r).pathname;
        return e === "/projects" || e === "/projects/" || e.startsWith("/projects/folder") || e.startsWith("/domains")
    }
    var A = {
        fetch(r) {
            let e = r.clientId || r.resultingClientId;
            if (!e) return;
            if (r.request.mode === "navigate" && St(r.request.url)) {
                g(r, vt().then(n => {
                    n && le.set(e, n.dashboard)
                }));
                return
            }
            let t = le.get(e);
            if (t && r.request.url === t.url) {
                r.respondWith(kt(t, r.request)), le.delete(e);
                return
            }
        },
        message(r) {
            let e = r.data;
            if (e.type === "refreshApiServer") {
                let t = e.payload.api;
                r.waitUntil(b().then(n => {
                    if (n !== t) return Ne(t).then(() => ae())
                }))
            }
            e.type === "signOut" && k && r.waitUntil(k.stopAuthentication())
        }
    };
    var ce = "/s/offline-COW44ZFL.html";
    var H = "service-worker",
        je = ["https://app.framerstatic.com/service-worker-assets/Inter-Regular.a3742754.woff2?src=offline", "https://app.framerstatic.com/service-worker-assets/Inter-Bold.ba58d2af.woff2?src=offline"],
        de = [ce, ...je];

    function _e(r, e) {
        return e.findIndex(t => r.endsWith(t)) !== -1
    }
    async function Fe({
        force: r
    } = {}) {
        let e = await caches.open(H);
        if (r) return e.addAll(de);
        let t = async n => {
            if (!await e.match(n)) return e.add(n)
        };
        await Promise.all(de.map(n => t(n)))
    }
    async function Rt(r) {
        try {
            return await fetch(r.request, {
                referrer: r.request.referrer
            })
        } catch (e) {
            console.error(`Unable to load ${r.request.url}`, e);
            let t = e instanceof TypeError,
                n = e instanceof DOMException && e.name === "NetworkError";
            if (!(t || n)) throw e;
            return await (await caches.open(H)).match(ce)
        }
    }

    function Pt(r) {
        let t = new URL(r).pathname;
        return t.startsWith("/projects") || t.startsWith("/share")
    }
    var O = {
        install(r) {
            g(r, Fe({
                force: !0
            }))
        },
        activate(r) {
            g(r, (async () => {
                let t = await caches.open(H),
                    n = await t.keys();
                await Promise.all(n.map(o => {
                    if (!_e(o.url, de)) return t.delete(o)
                }))
            })())
        },
        fetch(r) {
            if (r.request.mode === "navigate" && Pt(r.request.url)) r.respondWith(Rt(r)), g(r, Fe().catch(e => {
                console.warn("Unable to re-cache the offline page", e)
            }));
            else if (_e(r.request.url, je)) {
                let e = caches.open(H).then(t => t.match(r.request));
                r.respondWith(e)
            }
        }
    };
    var v = self;
    v.addEventListener("install", function(r) {
        O.install ? .(r), A.install ? .(r), g(r, v.skipWaiting())
    });
    v.addEventListener("activate", function(r) {
        O.activate ? .(r), A.activate ? .(r), g(r, v.registration.navigationPreload ? .disable() ? ? Promise.resolve())
    });
    v.addEventListener("fetch", function(r) {
        O.fetch ? .(r), A.fetch ? .(r)
    });
    v.addEventListener("message", function(r) {
        O.message ? .(r), A.message ? .(r)
    });
})();