// node_modules/preact/dist/preact.mjs
var e, t, n, r, i, a, o, s, c, l, u, d, f = Symbol.for("pv"), p = {}, m = [], h = /^m(i|n|o|s|text|space)$/, g = Array.isArray, _ = m.slice, v = Object.assign;
function y(e) {
	e && e.parentNode && e.remove();
}
function b(e, t, n) {
	var r, i, a, o = {}, s = arguments.length;
	for (a in t) a == "key" ? r = t[a] : a == "ref" && typeof e != "function" ? i = t[a] : o[a] = t[a];
	return s > 2 && (o.children = s > 3 ? _.call(arguments, 2) : n), x(e, o, r, i, null);
}
function x(n, r, i, a, o) {
	var s = {
		type: n,
		props: r,
		key: i,
		ref: a,
		__k: null,
		__: null,
		__b: 0,
		__e: null,
		__c: null,
		constructor: f,
		__v: o || ++t,
		__i: -1,
		__u: 0
	};
	return !o && e.vnode && e.vnode(s), s;
}
function S(e) {
	return e.children;
}
function ee(e, t) {
	this.props = e, this.context = t, this.__g = 0;
}
function te(e, t) {
	if (t == null) return e.__ && te(e.__, e.__i + 1);
	for (var n; t < e.__k.length; t++) if ((n = e.__k[t]) && n.__e) return n.__e;
	return typeof e.type != "function" || e.props.__P ? null : te(e);
}
function ne(e) {
	if ((e = e.__) && e.__c && !e.props.__P) return e.__e = null, e.__k.some(function(t) {
		return t && (e.__e = t.__e);
	}), ne(e);
}
function C(t) {
	(8 & t.__g || (t.__g |= 8, r.push(t), a++)) && i == e.debounceRendering || ((i = e.debounceRendering) || queueMicrotask)(w);
}
function w() {
	var t, n, s, c, l, u, d, p, m;
	try {
		for (n = 1; r.length;) r.length > n && r.sort(o), t = r.shift(), n = r.length, 8 & t.__g && (c = void 0, l = void 0, u = (l = (s = t).__v).__e, d = [], p = [], (m = s.__P) && ((c = v({ constructor: f }, l)).__v = l.__v + 1, e.vnode && e.vnode(c), le(m, c, l, s.__n, m.namespaceURI, 32 & l.__u ? [u] : null, d, u || te(l), 32 & l.__u, p), c.__v = l.__v, c.__.__k[c.__i] = c, fe(d, c, p), l.__ = l.__e = null, c.__e != u && ne(c)));
	} finally {
		(a = r.length) && (i || queueMicrotask)(w);
	}
}
function re(e, t, n, r, i, a, o, s, c, l, u) {
	var d, f, h, g, _, v, y = r.__k || m, b = t.length;
	for (c = T(n, t, y, c, b), d = 0; d < b; d++) (h = n.__k[d]) != null && (f = ~h.__i && y[h.__i] || p, h.__i = d, v = le(e, h, f, i, a, o, s, c, l, u), g = h.__e, (f.ref != h.ref || 8 & f.__u) && (f.ref && me(f.ref, null, h, f), h.ref && u.push(h.ref, h.__c || g, h)), _ ||= g, 4 & h.__u ? (c = ie(h, c, e, !f.__v), f.__e && (f.__e = null)) : typeof h.type == "function" && v !== void 0 ? c = v : g && (c = g.nextSibling), h.__u &= -21);
	return n.__e = _, c;
}
function T(e, t, n, r, i) {
	var a, o, s, c, l, u, d, p, m, h = n.length, _ = h, v = 0, y = 0, b = e.__k = Array(i);
	for (a = 0; a < i; a++) (o = t[a]) != null && typeof o != "boolean" && typeof o != "function" ? (typeof o != "object" || o.constructor === String ? o = b[a] = x(null, o) : g(o) ? o = b[a] = x(S, { children: o }) : o.constructor === f && o.__b ? o = b[a] = x(o.type, o.props, o.key, o.ref, o.__v) : b[a] = o, c = a + v, o.__ = e, o.__b = e.__b + 1, s = null, ~(l = o.__i = ae(o, n, c, _)) && (_--, (s = n[l]) && (s.__u |= 2)), s && s.__v ? (o.__u |= 16, l == c - 1 ? v-- : l == c + 1 ? v++ : l != c && (l > c ? v-- : v++, y = 1)) : (~l || (i > h ? v-- : i < h && v++), typeof o.type != "function" && (o.__u |= 4))) : b[a] = null;
	if (y) {
		for (u = [], d = [], a = 0; a < i; a++) if ((o = b[a]) && 16 & o.__u) {
			for (v = 0, p = u.length; v < p;) u[m = v + p >> 1] < o.__i ? v = m + 1 : p = m;
			u[v] = o.__i, d[a] = v + 1;
		}
		for (v = u.length; a--;) d[a] && (d[a] == v ? v-- : b[a].__u |= 4);
	}
	if (_) for (a = 0; a < h; a++) !(s = n[a]) || 2 & s.__u || (s.__e == r && (r = te(s)), he(s, s));
	return r;
}
function ie(e, t, n, r) {
	var i, a, o, s;
	if (typeof e.type == "function") {
		if (e.props.__P) return t;
		if (i = e.__k) for (a = 0; a < i.length; a++) i[a] && (i[a].__ = e, t = ie(i[a], t, n, !1));
		return t;
	}
	for (t && !t.parentNode && (t = te(e)) && !t.parentNode && (t = null), o = e.__e, s = t; s && s.nodeType == 8;) s = s.nextSibling;
	for (o != s && (!r && n.moveBefore && o.parentNode ? n.moveBefore(o, t) : n.insertBefore(o, t || null)), t = o; (t &&= t.nextSibling) && t.nodeType == 8 && !t.data.startsWith("$s"););
	return t;
}
function ae(e, t, n, r) {
	var i, a = e.key, o = e.type, s = t[n], c = s && !(2 & s.__u);
	if (s === null && a == null || c && a == s.key && o == s.type) return n;
	if (r > +!!c) {
		for (i = n - 1; i >= 0; i--) if ((s = t[i]) && !(2 & s.__u) && a == s.key && o == s.type) return i;
		for (i = n + 1; i < t.length; i++) if ((s = t[i]) && !(2 & s.__u) && a == s.key && o == s.type) return i;
	}
	return -1;
}
function oe(e, t, n) {
	n ??= "", t[0] == "-" ? e.setProperty(t, n) : e[t] = n;
}
function se(e, t, n, r, i) {
	var a, o;
	if (t == "style") {
		if (typeof n == "string") e.style.cssText = n;
		else {
			if (typeof r == "string" && (e.style.cssText = r = ""), r) for (t in r) n && t in n || oe(e.style, t);
			if (n) for (t in n) r && n[t] == r[t] || oe(e.style, t, n[t]);
		}
	} else if (t[0] == "o" && t[1] == "n") (e.__e ||= {})[t] = n, n && r || (o = u[t] || (u[t] = ce(t)), (e.__a ||= {})[t] = l, a = t != (t = t.replace(c, "$1")), (t = t.slice(2))[0] < "a" && (t = t.toLowerCase()), n ? e.addEventListener(t, o, a) : e.removeEventListener(t, o, a));
	else {
		if (i == "http://www.w3.org/2000/svg") t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
		else if (t != "width" && t != "height" && t != "href" && t != "list" && t != "form" && t != "tabIndex" && t != "download" && t != "rowSpan" && t != "colSpan" && t != "role" && t != "popover" && t in e) try {
			e[t] = n ?? "";
			return;
		} catch {}
		if (typeof n == "function") return;
		n == null || !1 === n && t[4] != "-" ? e.removeAttribute(t) : e.setAttribute(t, t == "popover" && n == 1 ? "" : n);
	}
}
function ce(t) {
	return function(n) {
		var r = this.__e;
		if (r) {
			if (r = r[t], n[s] == null) n[s] = l++;
			else if (n[s] < this.__a[t]) return;
			return r(e.event ? e.event(n) : n);
		}
	};
}
function le(t, n, r, i, a, o, s, c, l, u) {
	var d, p, h, _, b, x, ne, C, w, T, ie, ae, oe, se, ce, le, fe, me, _e = n.type;
	if (n.constructor !== f) return null;
	128 & r.__u && (l = 32 & r.__u, d = r.__c.__z) && (n.__u |= l, p = o = [], d.nodeType == 8 ? c = ue(d, o) : o.push(d), c = o[0] || c), (d = e.__b) && d(n);
	n: if (typeof _e == "function") {
		h = s.length;
		try {
			if (C = n.props, w = (d = _e.prototype) && d.render, T = (d = _e.contextType) && i[d.__c], ie = d ? T ? T.props.value : d.__ : i, (_ = r.__c) ? (n.__c = _, 2 & _.__g && (_.__g |= 1)) : (w ? n.__c = _ = new _e(C, ie) : (n.__c = _ = new ee(C, ie), _.constructor = _e, _.render = ge), T && T.sub(_), _.state || (_.state = {}), _.__n = i, _.__g |= 8, _.__h = [], _.__k = []), w && (_.__s || (_.__s = _.state), _e.getDerivedStateFromProps && (_.__s == _.state && (_.__s = v({}, _.__s)), v(_.__s, _e.getDerivedStateFromProps(C, _.__s)))), b = _.props, x = _.state, _.__v = n, r.__c) {
				if (C !== b && w && !_e.getDerivedStateFromProps && _.componentWillReceiveProps && _.componentWillReceiveProps(C, ie), n.__v == r.__v && !(8 & _.__g) || !(4 & _.__g) && _.shouldComponentUpdate && !1 === _.shouldComponentUpdate(C, _.__s, ie)) {
					n.__v != r.__v && (_.props = C, _.state = _.__s, _.__g &= -9), n.__e = r.__e, n.__k = r.__k, n.__k.some(function(e) {
						e && (e.__ = n);
					}), m.push.apply(_.__h, _.__k), _.__k = [], _.__h.length && s.push(_), c = te(r);
					break n;
				}
				_.componentWillUpdate && _.componentWillUpdate(C, _.__s, ie), w && _.componentDidUpdate && _.__h.push(function() {
					_.componentDidUpdate(b, x, ne);
				});
			} else w && !_e.getDerivedStateFromProps && _.componentWillMount && _.componentWillMount(), w && _.componentDidMount && _.__h.push(_.componentDidMount);
			if (_.context = ie, _.props = C, _.__P = t, _.__g &= -5, ae = e.__r, oe = 0, w) _.state = _.__s, _.__g &= -9, ae && ae(n), d = _.render(_.props, _.state, _.context), m.push.apply(_.__h, _.__k), _.__k = [];
			else do
				_.__g &= -9, ae && ae(n), d = _.render(_.props, _.state, _.context), _.state = _.__s;
			while (8 & _.__g && ++oe < 25);
			_.state = _.__s, _.getChildContext && (i = v({}, i, _.getChildContext())), w && r.__c && _.getSnapshotBeforeUpdate && (ne = _.getSnapshotBeforeUpdate(b, x)), se = d && d.type === S && d.key == null ? d.props.children : d, C.__P && (d = c, a = (t = C.__P).namespaceURI, l = o = null, r.props && r.props.__P != t && (r.__k.some(function(e) {
				e && he(e, e);
			}), r.__k = null), c = r.__k ? te(r, 0) : null), c = re(t, g(se) ? se : [se], n, r, i, a, o, s, c, l, u), C.__P && (n.__e = null, c = d), n.__u &= -161, p && p.some(y), _.__h.length && s.push(_), 1 & _.__g && (_.__g &= -4);
		} catch (t) {
			if (s.length = h, n.__v = null, l || o) {
				if (t.then) {
					if (ce = 0, n.__u |= 128 | l, o) {
						for (~(fe = o.indexOf(c || void 0)) || (fe = o.length); (me = o[fe - 1]) && me.nodeType == 8;) fe--;
						for (; fe < o.length; fe++) if (me = o[fe]) {
							if (o[fe] = null, me.nodeType == 8) {
								if (me.data.startsWith("$s")) ce++ || (le = me);
								else if (ce && me.data.startsWith("/$s") && !--ce) break;
							} else if (!ce) break;
						}
					}
					if (!le) {
						for (; c && c.nodeType == 8 && c.nextSibling;) c = c.nextSibling;
						le = c;
					}
					(d = ue(le = n.__c.__z || (n.__c.__z = le))) ? (n.__e = le, c = d) : n.__e = c, c &&= c.nextSibling;
				} else o && o.some(y);
			} else n.__e = r.__e;
			n.__k ||= r.__k || [], t.then || de(n), e.__e(t, n, r);
		}
	} else c = n.__e = pe(r.__e, n, r, i, a, o, s, l, u, t);
	return (d = e.diffed) && d(n), c;
}
function ue(e, t) {
	if (e && e.nodeType == 8 && e.data.startsWith("$s")) for (var n = 1; e = e.nextSibling;) {
		if (e.nodeType == 8) {
			if (e.data.startsWith("$s")) n++;
			else if (e.data.startsWith("/$s") && !--n) return e;
		}
		t && t.push(e);
	}
}
function de(e) {
	e && (e.__c && (e.__c.__g |= 4), e.__k && e.__k.some(de));
}
function fe(t, n, r) {
	for (var i = 0; i < r.length;) me(r[i++], r[i++], r[i++]);
	e.__c && e.__c(n, t), t.some(function(n) {
		try {
			t = n.__h, n.__h = [], t.some(function(e) {
				e.call(n);
			});
		} catch (t) {
			e.__e(t, n.__v);
		}
	});
}
function pe(t, n, r, i, a, o, s, c, l, u) {
	var d, f, m, v, b, x, S, ee, ne, C = r.props || p, w = n.props, T = n.type;
	if (T == "svg" ? a = "http://www.w3.org/2000/svg" : T == "math" ? a = "http://www.w3.org/1998/Math/MathML" : a ||= "http://www.w3.org/1999/xhtml", o) {
		for (d = 0; d < o.length; d++) if ((b = o[d]) && (T ? b.localName == T : b.nodeType == 3)) {
			t = b, o[d] = null;
			break;
		}
	}
	if (!t) {
		if (ee = u.ownerDocument || document, !T) return ee.createTextNode(w);
		t = ee.createElementNS(a, T, w.is && w), c &&= (e.__m && e.__m(n, o), !1), o = null;
	}
	if (T) {
		if (u = T == "template" && t.content || t, o = T == "textarea" && w.defaultValue != null ? null : o && _.call(u.childNodes), !c && o) for (C = {}, d = 0; d < t.attributes.length; d++) C[(b = t.attributes[d]).name] = b.value;
		for (d in C) b = C[d], d == "dangerouslySetInnerHTML" ? m = b : d == "children" || d in w || d == "value" && "defaultValue" in w || d == "checked" && "defaultChecked" in w || se(t, d, null, b, a);
		for (d in ne = 1 & r.__u, w) b = w[d], d == "children" ? v = b : d == "dangerouslySetInnerHTML" ? f = b : d == "value" ? x = b : d == "checked" ? S = b : c && typeof b != "function" || !(C[d] !== b || ne && b != null) || se(t, d, b, C[d], a);
		f ? (c || m && (f.__html == m.__html || f.__html == t.innerHTML) || (t.innerHTML = f.__html), n.__k = []) : (m && (t.textContent = ""), (T == "foreignObject" || a == "http://www.w3.org/1998/Math/MathML" && h.test(T)) && (a = "http://www.w3.org/1999/xhtml"), re(u, g(v) ? v : [v], n, r, i, a, o, s, o ? o[0] : r.__k && te(r, 0), c, l), o && o.some(y)), c && T != "textarea" || (d = "value", T == "progress" && x == null ? t.removeAttribute(d) : x == null || x === t[d] && (T != "progress" || x) || se(t, d, x, C[d], a), d = "checked", S != null && S != t[d] && se(t, d, S, C[d], a));
	} else C === w || c && t.data == w || (t.data = w);
	return t;
}
function me(t, n, r, i) {
	try {
		typeof t == "function" ? n ? n.__x = t(n) || 1 : (i &&= i.__c || i.__e) && (n = i.__x) && (i.__x = null, typeof n == "function" ? n() : t(null)) : t.current = n;
	} catch (t) {
		e.__e(t, r);
	}
}
function he(t, n, r) {
	var i, a, o, s;
	if (e.unmount && e.unmount(t), !(i = t.ref) || i.current && i.current != t.__e || me(i, null, n, t), i = t.__c) {
		if (i.componentWillUnmount) try {
			i.componentWillUnmount();
		} catch (t) {
			e.__e(t, n);
		}
		i.__P = i.__n = null;
	}
	if (i = t.__k) for (s = 0; s < i.length; s++) i[s] && he(i[s], n, typeof t.type != "function" || r && !t.props.__P);
	!r && (i = t.__c) && (i = i.__z) && (a = ue(i, o = [])) && (i == t.__e && o.some(y), y(a), y(i)), (i = t.__e) && (r || y(i), i.__e && (i.__e = null)), t.__e = t.__c = t.__ = null;
}
function ge(e, t, n) {
	return this.constructor(e, n);
}
function _e(t, n) {
	var r, i, a, o;
	e.__ && e.__(t, n), n.nodeType == 9 && (n = n.documentElement), i = (r = t && 32 & t.__u) ? null : n.__k, n.__k = x(S, { children: [t] }), a = [], o = [], le(n, n.__k, i || p, p, n.namespaceURI, i ? null : n.firstChild ? _.call(n.childNodes) : null, a, i ? i.__e : n.firstChild, r, o), fe(a, n.__k, o), n.__k.props.children = null;
}
function ve(e) {
	function t(e) {
		var n, r;
		return this.getChildContext || (n = /* @__PURE__ */ new Set(), (r = {})[t.__c] = this, this.getChildContext = function() {
			return r;
		}, this.shouldComponentUpdate = function(e) {
			this.props.value != e.value && n.forEach(function(e) {
				e.__g |= 4, C(e);
			});
		}, this.sub = function(e) {
			n.add(e);
			var t = e.componentWillUnmount;
			e.componentWillUnmount = function() {
				n.delete(e), t && t.call(e);
			};
		}), e.children;
	}
	return t.__c = "__cC" + d++, t.__ = e, t.Provider = (t.Consumer = function(e, t) {
		return e.children(t);
	}).contextType = t, t;
}
e = { __e: function(e, t, n, r) {
	for (var i, o, s; t = t.__;) if ((i = t.__c) && !(1 & i.__g)) {
		i.__g |= 4;
		try {
			if ((s = (o = i.constructor) && o.getDerivedStateFromError) && i.setState(o.getDerivedStateFromError(e)), i.componentDidCatch && (i.componentDidCatch(e, r || {}), s = 1), s && 8 & i.__g) return void (i.__g |= 2);
		} catch (t) {
			e = t;
		}
	}
	throw a = 0, e;
} }, t = 0, n = function(e) {
	return e != null && e.constructor === f;
}, ee.prototype.setState = function(e, t) {
	var n = this.__s;
	n && n != this.state || (n = this.__s = v({}, this.state)), typeof e == "function" && (e = e(v({}, n), this.props)), e && (v(n, e), this.__v && (t && this.__k.push(t), C(this)));
}, ee.prototype.forceUpdate = function(e) {
	this.__v && (this.__g |= 4, e && this.__h.push(e), C(this));
}, ee.prototype.render = S, r = [], a = 0, o = function(e, t) {
	return e.__v.__b - t.__v.__b;
}, s = Symbol(), c = /(PointerCapture)$|Capture$/i, l = 0, u = {}, d = 0;
// src/config.ts
var ye = () => Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4), be = {
	"--text": "#e7ecf6",
	"--muted": "#8b96ad",
	"--card-solid": "#131a2c",
	"--surface": "#151d31",
	"--surface-2": "#0f1526",
	"--card-border": "rgba(120,150,210,.16)",
	"--card-shadow": "none",
	"--icon-bg": "rgba(120,150,210,.1)",
	"--line": "rgba(120,150,210,.2)",
	"--chip": "#131a2c"
}, xe = {
	"--text": "#f4f5f7",
	"--muted": "#9aa0ae",
	"--card-solid": "#1c1e26",
	"--surface": "#1c1e26",
	"--surface-2": "#14161c",
	"--card-border": "rgba(255,255,255,.05)",
	"--card-shadow": "0 1px 2px rgba(0,0,0,.4)",
	"--icon-bg": "rgba(255,255,255,.07)",
	"--line": "rgba(255,255,255,.1)",
	"--chip": "#1c1e26"
}, Se = {
	...xe,
	"--card-solid": "#1e2027",
	"--surface": "#1e2027",
	"--surface-2": "#15171c",
	"--card-border": "rgba(255,255,255,.04)"
}, Ce = [
	{
		id: "midnight",
		name: "Midnight",
		light: "linear-gradient(180deg,#eef0f6,#e3e6ef)",
		dark: "radial-gradient(circle at 20% -10%,#1d2030 0%,#121319 50%,#0c0d11 100%)",
		panel: { dark: xe }
	},
	{
		id: "night",
		name: "Night sky",
		light: "linear-gradient(180deg,#e7ecf6,#dfe5f1)",
		dark: "radial-gradient(ellipse at 50% -20%,#1a2747 0%,#0e1424 55%,#0a0f1c 100%)",
		panel: { dark: be }
	},
	{
		id: "daybreak",
		name: "Daybreak",
		light: "linear-gradient(170deg,#cfe0f5 0%,#e8e4f3 45%,#f8e3d6 100%)",
		dark: "linear-gradient(170deg,#1b2640 0%,#2c2a45 50%,#45303a 100%)",
		panel: { light: {
			"--text": "#1d2433",
			"--muted": "#5f677a",
			"--card": "rgba(255,255,255,.55)",
			"--card-border": "rgba(255,255,255,.7)",
			"--card-shadow": "0 1px 1px rgba(29,36,51,.04), 0 10px 30px -18px rgba(29,36,51,.35)",
			"--icon-bg": "rgba(29,36,51,.06)"
		} }
	},
	{
		id: "paper",
		name: "Paper",
		light: "#eceef2",
		dark: "#17181d",
		panel: {
			light: {
				"--text": "#15171c",
				"--muted": "#5c6170",
				"--card-solid": "#ffffff",
				"--surface": "#ffffff",
				"--surface-2": "#e2e5eb",
				"--card-border": "transparent",
				"--card-shadow": "none",
				"--icon-bg": "#eceef2",
				"--line": "#d9dce3"
			},
			dark: {
				...xe,
				"--card-solid": "#24262d",
				"--surface": "#24262d",
				"--card-border": "transparent",
				"--card-shadow": "none"
			}
		}
	},
	{
		id: "aurora",
		name: "Aurora",
		light: "linear-gradient(135deg,#e0f2fe 0%,#ede9fe 50%,#fce7f3 100%)",
		dark: "linear-gradient(135deg,#0f172a 0%,#1e1b4b 55%,#312e81 100%)"
	},
	{
		id: "northern",
		name: "Northern lights",
		light: "linear-gradient(160deg,#d9f7ee 0%,#dbeafe 50%,#ede4ff 100%)",
		dark: "radial-gradient(ellipse at 20% 0%,rgba(52,211,153,.35),transparent 55%),radial-gradient(ellipse at 80% 10%,rgba(139,92,246,.35),transparent 50%),#0b1220",
		panel: { dark: be }
	},
	{
		id: "dusk",
		name: "Dusk",
		light: "linear-gradient(160deg,#f7d9c9 0%,#d5dcf2 55%,#ece3f6 100%)",
		dark: "linear-gradient(160deg,#1c2541 0%,#3a2d52 55%,#5b3448 100%)"
	},
	{
		id: "sunset",
		name: "Sunset",
		light: "linear-gradient(150deg,#fff7ed 0%,#ffe4e6 50%,#fef3c7 100%)",
		dark: "linear-gradient(150deg,#1c1917 0%,#431407 55%,#4c0519 100%)"
	},
	{
		id: "ember",
		name: "Ember",
		light: "linear-gradient(160deg,#ffedd5,#fee2e2)",
		dark: "radial-gradient(ellipse at 80% 100%,rgba(249,115,22,.35),transparent 55%),#140d0b",
		panel: { dark: Se }
	},
	{
		id: "forest",
		name: "Forest",
		light: "linear-gradient(160deg,#ecfdf5 0%,#d1fae5 45%,#f0fdfa 100%)",
		dark: "linear-gradient(160deg,#052e16 0%,#064e3b 50%,#0f3d3e 100%)"
	},
	{
		id: "meadow",
		name: "Meadow",
		light: "linear-gradient(170deg,#f7fee7 0%,#dcfce7 50%,#e0f2fe 100%)",
		dark: "linear-gradient(170deg,#1a2e05 0%,#14532d 55%,#0c4a6e 100%)"
	},
	{
		id: "ocean",
		name: "Ocean",
		light: "linear-gradient(160deg,#eff6ff 0%,#dbeafe 50%,#e0f2fe 100%)",
		dark: "linear-gradient(160deg,#020617 0%,#0c4a6e 60%,#082f49 100%)"
	},
	{
		id: "lagoon",
		name: "Lagoon",
		light: "linear-gradient(150deg,#ccfbf1,#cffafe 50%,#e0e7ff)",
		dark: "linear-gradient(150deg,#042f2e,#083344 55%,#1e1b4b)"
	},
	{
		id: "candy",
		name: "Candy",
		light: "linear-gradient(135deg,#fce7f3 0%,#ede9fe 50%,#dbeafe 100%)",
		dark: "linear-gradient(135deg,#500724 0%,#3b0764 50%,#172554 100%)"
	},
	{
		id: "mesh",
		name: "Colour mesh",
		light: "radial-gradient(at 0% 0%,#fde68a 0,transparent 50%),radial-gradient(at 100% 0%,#f9a8d4 0,transparent 50%),radial-gradient(at 50% 100%,#93c5fd 0,transparent 55%),#f5f3ff",
		dark: "radial-gradient(at 0% 0%,rgba(234,179,8,.35) 0,transparent 50%),radial-gradient(at 100% 0%,rgba(236,72,153,.35) 0,transparent 50%),radial-gradient(at 50% 100%,rgba(59,130,246,.4) 0,transparent 55%),#0b0b14",
		panel: { dark: xe }
	},
	{
		id: "homey",
		name: "Charcoal",
		light: "linear-gradient(180deg,#f3f4f7 0%,#e6e8ee 100%)",
		dark: "radial-gradient(circle at 15% 0%,#262a33 0%,#14161b 55%,#0d0e12 100%)",
		panel: { dark: Se }
	},
	{
		id: "graphite",
		name: "Graphite",
		light: "linear-gradient(180deg,#f8fafc 0%,#e2e8f0 100%)",
		dark: "linear-gradient(180deg,#09090b 0%,#18181b 100%)"
	},
	{
		id: "slate",
		name: "Slate",
		light: "#e8ecf1",
		dark: "#1e2530",
		panel: { dark: {
			...xe,
			"--card-solid": "#28303d",
			"--surface": "#28303d"
		} }
	},
	{
		id: "plain",
		name: "Plain",
		light: "#f4f4f5",
		dark: "#111113"
	}
], we = [
	{
		id: "vivid",
		name: "Vivid",
		desc: "Dark and colourful: bright gradient tiles that pop when devices are on.",
		theme: {
			style: "vivid",
			font: "sora",
			shape: "tiles",
			color: "gradient",
			icons: "dashforge",
			titles: "normal",
			nav: "auto",
			mode: "dark",
			background: "midnight",
			cardStyle: "solid",
			radius: 22,
			accent: "#6366f1"
		}
	},
	{
		id: "daylight",
		name: "Daylight",
		desc: "Calm and airy over a dawn sky. Big room names, devices in soft rows.",
		theme: {
			style: "daylight",
			font: "manrope",
			shape: "rows",
			color: "soft",
			icons: "dashforge",
			titles: "big",
			nav: "auto",
			mode: "light",
			background: "daybreak",
			cardStyle: "glass",
			radius: 26,
			accent: "#f59e0b"
		}
	},
	{
		id: "blocks",
		name: "Blocks",
		desc: "Flat, saturated colour blocks and bold type. Playful and easy to read.",
		theme: {
			style: "blocks",
			font: "sora",
			shape: "blocks",
			color: "flat",
			icons: "dashforge",
			titles: "bold",
			nav: "auto",
			mode: "light",
			background: "paper",
			cardStyle: "solid",
			radius: 28,
			accent: "#3156ff"
		}
	},
	{
		id: "console",
		name: "Console",
		desc: "A night-blue instrument panel with glowing dials and an app-style dock.",
		theme: {
			style: "console",
			font: "lexend",
			shape: "dials",
			color: "glow",
			icons: "dashforge",
			titles: "light",
			nav: "dock",
			mode: "dark",
			background: "night",
			cardStyle: "solid",
			radius: 22,
			accent: "#3fd8ff"
		}
	},
	{
		id: "dashforge",
		name: "DashForge",
		desc: "Soft gradients and frosted cards with live colour.",
		theme: {
			style: "dashforge",
			font: "manrope",
			shape: "tiles",
			color: "tint",
			icons: "dashforge",
			titles: "normal",
			nav: "auto",
			mode: "auto",
			background: "aurora",
			cardStyle: "glass",
			radius: 20,
			accent: "#3b82f6"
		}
	},
	{
		id: "apple",
		name: "Apple Home style",
		desc: "Compact frosted tiles that turn white when on, over a wallpaper.",
		theme: {
			style: "apple",
			font: "system",
			shape: "pills",
			color: "white",
			icons: "dashforge",
			titles: "big",
			nav: "auto",
			mode: "auto",
			background: "dusk",
			cardStyle: "glass",
			radius: 18,
			accent: "#ff9f0a"
		}
	},
	{
		id: "homey",
		name: "Homey style",
		desc: "Dark, square tiles with colour-coded device icons.",
		theme: {
			style: "homey",
			font: "nunito",
			shape: "squares",
			color: "ring",
			icons: "dashforge",
			titles: "normal",
			nav: "auto",
			mode: "dark",
			background: "homey",
			cardStyle: "solid",
			radius: 22,
			accent: "#3b82f6"
		}
	},
	{
		id: "minimal",
		name: "Minimal",
		desc: "Flat, quiet and high contrast. Lots of space.",
		theme: {
			style: "minimal",
			font: "dmsans",
			shape: "tiles",
			color: "outline",
			icons: "dashforge",
			titles: "normal",
			nav: "auto",
			mode: "light",
			background: "plain",
			cardStyle: "solid",
			radius: 12,
			accent: "#18181b"
		}
	}
], Te = [
	"#3b82f6",
	"#8b5cf6",
	"#ec4899",
	"#f97316",
	"#eab308",
	"#22c55e",
	"#14b8a6",
	"#64748b"
];
function Ee() {
	return {
		schema: 1,
		setupComplete: !1,
		title: "Home",
		userName: "",
		layout: "auto",
		theme: {
			style: "vivid",
			font: "sora",
			shape: "tiles",
			color: "gradient",
			icons: "dashforge",
			titles: "normal",
			nav: "auto",
			mode: "dark",
			accent: "#6366f1",
			background: "midnight",
			cardStyle: "solid",
			radius: 22,
			density: "comfortable"
		},
		header: {
			clock: !0,
			clock24h: !1,
			showDate: !0,
			greeting: !0,
			weatherFallback: !1,
			calendars: [],
			todoLists: [],
			sceneStrip: []
		},
		tablet: {
			screensaver: !1,
			screensaverMinutes: 5,
			screensaverStyle: "clock",
			hideSidebar: !1,
			returnHomeMinutes: 0
		},
		builtinPages: {
			home: !0,
			media: !0,
			security: !0,
			scenes: !0,
			irrigation: !1
		},
		home: {
			summary: !0,
			favorites: !0,
			rooms: !0
		},
		irrigation: {
			zones: [],
			minutes: 10,
			presets: [
				5,
				10,
				15,
				30
			]
		},
		sections: []
	};
}
function De(e) {
	let t = we.find((t) => t.id === e);
	if (!t) return {};
	let { mode: n, background: r, accent: i, radius: a, cardStyle: o, ...s } = t.theme;
	return s;
}
function Oe(e) {
	let t = Ee();
	if (!e || typeof e != "object") return t;
	let n = e;
	return {
		...t,
		...n,
		schema: 1,
		theme: {
			...t.theme,
			...De(n.theme?.style),
			...n.theme ?? {}
		},
		header: {
			...t.header,
			...n.header ?? {}
		},
		tablet: {
			...t.tablet,
			...n.tablet ?? {}
		},
		builtinPages: {
			...t.builtinPages,
			...n.builtinPages ?? {}
		},
		home: {
			...t.home,
			...n.home ?? {}
		},
		irrigation: {
			...t.irrigation,
			...n.irrigation ?? {}
		},
		sections: Array.isArray(n.sections) ? n.sections.map((e) => ({
			...e,
			cards: Array.isArray(e.cards) ? e.cards.filter((e) => e && e.entity) : []
		})) : []
	};
}
var ke = (e) => JSON.parse(JSON.stringify(e));
function Ae(e, t = "sm") {
	return {
		id: ye(),
		entity: e,
		size: t
	};
}
function je(e, t, n, r) {
	return {
		id: ye(),
		kind: e,
		name: t,
		icon: n,
		areaId: r,
		cards: []
	};
}
// src/fonts.ts
var Me = [
	{
		id: "sora",
		name: "Sora",
		file: "sora",
		stack: "\"DF Sora\"",
		note: "Modern and techy"
	},
	{
		id: "manrope",
		name: "Manrope",
		file: "manrope",
		stack: "\"DF Manrope\"",
		note: "Clean and friendly"
	},
	{
		id: "lexend",
		name: "Lexend",
		file: "lexend",
		stack: "\"DF Lexend\"",
		note: "Very easy to read"
	},
	{
		id: "nunito",
		name: "Nunito",
		file: "nunito",
		stack: "\"DF Nunito\"",
		note: "Soft and rounded"
	},
	{
		id: "dmsans",
		name: "DM Sans",
		file: "dm-sans",
		stack: "\"DF DM Sans\"",
		note: "Crisp and compact"
	},
	{
		id: "system",
		name: "Device font",
		stack: "",
		note: "Whatever your device uses"
	}
], Ne = "system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", sans-serif", Pe = "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD", Fe = "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF";
function Ie(e) {
	let t = Me.find((t) => t.id === e) ?? Me[0];
	return t.stack ? `${t.stack}, ${Ne}` : Ne;
}
var Le = !1;
function Re() {
	if (Le || typeof document > "u" || (Le = !0, document.getElementById("dashforge-fonts"))) return;
	let e = import.meta.url.replace(/[?#].*$/, "").replace(/\/[^/]*$/, "") + "/fonts", t = Me.filter((e) => e.file).map((t) => [[Pe, "latin"], [Fe, "latin-ext"]].map(([n, r]) => `@font-face{font-family:${t.stack};font-style:normal;font-display:swap;font-weight:100 900;src:url("${e}/${t.file}-${r}-wght-normal.woff2") format("woff2-variations"),url("${e}/${t.file}-${r}-wght-normal.woff2") format("woff2");unicode-range:${n};}`).join("")).join(""), n = document.createElement("style");
	n.id = "dashforge-fonts", n.textContent = t, document.head.append(n);
}
// node_modules/preact/hooks/dist/hooks.mjs
var ze, E, Be, Ve, He = Object.is, Ue = 0, We = [], Ge = [], D = e, Ke = D.__b, qe = D.__r, Je = D.diffed, Ye = D.__c, Xe = D.unmount, Ze = D.__;
function Qe(e, t) {
	D.__h && D.__h(E, e, Ue || t), Ue = 0;
	var n = E.__H || (E.__H = {
		__: [],
		__h: []
	});
	return e >= n.__.length && n.__.push({}), n.__[e];
}
function O(e) {
	return Ue = 1, $e(ut, e);
}
function $e(e, t, n) {
	var r = Qe(ze++, 2);
	if (r.t = e, !r.__c && (r.__ = [n ? n(t) : ut(void 0, t), function(e) {
		var t = r.__N ? r.__N[0] : r.__[0], n = r.t(t, e);
		He(t, n) || (r.__N = [n, r.__[1]], r.__c.setState({}));
	}], r.__c = E, !E.__f)) {
		E.__f = !0;
		var i = E.shouldComponentUpdate;
		E.shouldComponentUpdate = function(e, t, n) {
			var r = this.__H;
			if (!r) return !0;
			var a = !1, o = this.props != e;
			if (r.__.some(function(e) {
				e.__N && (a = !0, He(e.__[0], e.__N[0]) || (o = !0));
			}), i) {
				var s = i.call(this, e, t, n);
				return a ? s || o : s;
			}
			return !a || o;
		};
	}
	return r.__;
}
function k(e, t) {
	var n = Qe(ze++, 3);
	!D.__s && lt(n.__H, t) && (n.__P = !0, n.__ = e, n.u = t, E.__H.__h.push(n));
}
function et(e) {
	return Ue = 5, tt(function() {
		return { current: e };
	}, []);
}
function tt(e, t) {
	var n = Qe(ze++, 7);
	return lt(n.__H, t) && (n.__ = e(), n.__H = t), n.__;
}
function nt(e) {
	var t = E.context[e.__c], n = Qe(ze++, 9);
	return n.c = e, t ? (n.__ ?? (n.__ = !0, t.sub(E)), t.props.value) : e.__;
}
function rt() {
	var e;
	do {
		for (; e = Ge.shift();) try {
			st(e);
		} catch (t) {
			D.__e(t, { __: (e = e.__P) && e.__v });
		}
		for (; e = We.shift();) {
			var t = e.__H;
			if (e.__P && t) try {
				t.__h.some(st), t.__h.some(ct), t.__h = [];
			} catch (n) {
				t.__h = [], D.__e(n, e.__v);
			}
		}
	} while (Ge.length);
}
D.__b = function(e) {
	E = null, Ke && Ke(e);
}, D.__ = function(e, t) {
	e && t.__k && t.__k.__m && (e.__m = t.__k.__m), Ze && Ze(e, t);
}, D.__r = function(e) {
	qe && qe(e), ze = 0;
	var t = (E = e.__c).__H;
	t && (Be == E ? E.__h = [] : (t.__h.some(st), t.__h.some(ct), ze = 0), t.__h = [], t.__.some(function(e) {
		e.__N && (e.__ = e.__N), e.u = e.__N = void 0;
	})), Be = E;
}, D.diffed = function(e) {
	Je && Je(e);
	var t = e.__c;
	t && t.__H && (t.__H.__h.length && ot(We.push(t)), t.__H.__.some(function(e) {
		e.u && (e.__H = e.u);
	})), Be = E = null;
}, D.__c = function(e, t) {
	t.some(function(e) {
		try {
			e.__h.some(st), e.__h = e.__h.filter(function(e) {
				return !e.__ || ct(e);
			});
		} catch (t) {
			e.__h = [function() {
				throw t;
			}];
		}
	}), Ye && Ye(e, t);
}, D.unmount = function(e) {
	Xe && Xe(e);
	var t, n, r = e.__c;
	r && r.__H && (r.__H.__.some(function(r) {
		try {
			if (r.__P && r.__c) {
				if (n === void 0) {
					for (n = e.__; n && (!n.__c || !n.__c.__P);) n = n.__;
					n &&= n.__c;
				}
				r.__P = n, ot(Ge.push(r));
			} else st(r);
		} catch (e) {
			t = e;
		}
	}), r.__H = void 0, t && D.__e(t, r.__v));
};
var it = typeof requestAnimationFrame == "function";
function at(e) {
	var t, n = function() {
		clearTimeout(r), it && cancelAnimationFrame(t), setTimeout(e);
	}, r = setTimeout(n, 35);
	it && (t = requestAnimationFrame(n));
}
function ot(e) {
	e != 1 && Ve == D.requestAnimationFrame || ((Ve = D.requestAnimationFrame) || at)(rt);
}
function st(e) {
	var t = E, n = e.__c;
	typeof n == "function" && (e.__c = void 0, n()), E = t;
}
function ct(e) {
	var t = E;
	e.__c = e.__(), E = t;
}
function lt(e, t) {
	return !e || e.length != t.length || t.some(function(t, n) {
		return !He(t, e[n]);
	});
}
function ut(e, t) {
	return typeof t == "function" ? t(e) : t;
}
// node_modules/@preact/signals-core/dist/signals-core.module.js
var dt = Symbol.for("preact-signals");
function ft() {
	if (_t > 1) _t--;
	else {
		var e, t = !1;
		for ((function() {
			var e = xt;
			for (xt = void 0; e !== void 0;) {
				var t = e.S;
				if (t.v === e.v) for (var n = t.t; n !== void 0; n = n.x) n.i === e.i && (n.i = t.i);
				e = e.o;
			}
		})(); gt !== void 0;) {
			var n = gt;
			for (gt = void 0, vt++; n !== void 0;) {
				var r = n.u;
				if (n.u = void 0, n.f &= -3, !(8 & n.f) && wt(n)) try {
					n.c();
				} catch (n) {
					t ||= (e = n, !0);
				}
				n = r;
			}
		}
		if (vt = 0, _t--, t) throw e;
	}
}
function pt(e) {
	if (_t > 0) return e();
	bt = ++yt, _t++;
	try {
		return e();
	} finally {
		ft();
	}
}
var mt, A = void 0;
function ht(e) {
	var t = A, n = mt;
	A = void 0, mt = void 0;
	try {
		return e();
	} finally {
		A = t, mt = n;
	}
}
var gt = void 0, _t = 0, vt = 0, yt = 0, bt = 0, xt = void 0, St = 0;
function Ct(e) {
	if (A !== void 0) {
		var t = e.n;
		if (t === void 0 || t.t !== A) return t = {
			i: 0,
			S: e,
			p: A.s,
			n: void 0,
			t: A,
			e: void 0,
			x: void 0,
			r: t
		}, A.s !== void 0 && (A.s.n = t), A.s = t, e.n = t, 32 & A.f && e.S(t), t;
		if (t.i === -1) return t.i = 0, t.n !== void 0 && (t.n.p = t.p, t.p !== void 0 && (t.p.n = t.n), t.p = A.s, t.n = void 0, A.s.n = t, A.s = t), t;
	}
}
function j(e, t) {
	this.v = e, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = t?.watched, this.Z = t?.unwatched, this.name = t?.name;
}
j.prototype.brand = dt, j.prototype.h = function() {
	return !0;
}, j.prototype.S = function(e) {
	var t = this, n = this.t;
	n !== e && e.e === void 0 && (e.x = n, this.t = e, n === void 0 ? ht(function() {
		var e;
		(e = t.W) == null || e.call(t);
	}) : n.e = e);
}, j.prototype.U = function(e) {
	var t = this;
	if (this.t !== void 0) {
		var n = e.e, r = e.x;
		n !== void 0 && (n.x = r, e.e = void 0), r !== void 0 && (r.e = n, e.x = void 0), e === this.t && (this.t = r, r === void 0 && ht(function() {
			var e;
			(e = t.Z) == null || e.call(t);
		}));
	}
}, j.prototype.subscribe = function(e) {
	var t = this;
	return Nt(function() {
		var n = t.value;
		ht(function() {
			return e(n);
		});
	}, { name: "sub" });
}, j.prototype.valueOf = function() {
	return this.value;
}, j.prototype.toString = function() {
	return this.value + "";
}, j.prototype.toJSON = function() {
	return this.value;
}, j.prototype.peek = function() {
	var e = this;
	return ht(function() {
		return e.value;
	});
}, Object.defineProperty(j.prototype, "value", {
	get: function() {
		var e = Ct(this);
		return e !== void 0 && (e.i = this.i), this.v;
	},
	set: function(e) {
		if (e !== this.v) {
			if (vt > 100) throw Error("Cycle detected");
			(function(e) {
				_t !== 0 && vt === 0 && e.l !== bt && (e.l = bt, xt = {
					S: e,
					v: e.v,
					i: e.i,
					o: xt
				});
			})(this), this.v = e, this.i++, St++, _t++;
			try {
				for (var t = this.t; t !== void 0; t = t.x) t.t.N();
			} finally {
				ft();
			}
		}
	}
});
function M(e, t) {
	return new j(e, t);
}
function wt(e) {
	for (var t = e.s; t !== void 0; t = t.n) if (t.S.i !== t.i || !t.S.h() || t.S.i !== t.i) return !0;
	return !1;
}
function Tt(e) {
	for (var t = e.s; t !== void 0; t = t.n) {
		var n = t.S.n;
		if (n !== void 0 && (t.r = n), t.S.n = t, t.i = -1, t.n === void 0) {
			e.s = t;
			break;
		}
	}
}
function Et(e) {
	for (var t = e.s, n = void 0; t !== void 0;) {
		var r = t.p;
		t.i === -1 ? (t.S.U(t), r !== void 0 && (r.n = t.n), t.n !== void 0 && (t.n.p = r)) : n = t, t.S.n = t.r, t.r !== void 0 && (t.r = void 0), t = r;
	}
	e.s = n;
}
function Dt(e, t) {
	j.call(this, void 0, t), this.x = e, this.s = void 0, this.g = St - 1, this.f = 4;
}
Dt.prototype = new j(), Dt.prototype.h = function() {
	if (this.f &= -3, 1 & this.f) return !1;
	if ((36 & this.f) == 32 || (this.f &= -5, this.g === St)) return !0;
	if (this.g = St, this.f |= 1, this.i > 0 && !wt(this)) return this.f &= -2, !0;
	var e = A;
	try {
		Tt(this), A = this;
		var t = this.x();
		(16 & this.f || this.v !== t || this.i === 0) && (this.v = t, this.f &= -17, this.i++);
	} catch (e) {
		this.v = e, this.f |= 16, this.i++;
	}
	return A = e, Et(this), this.f &= -2, !0;
}, Dt.prototype.S = function(e) {
	if (this.t === void 0) {
		this.f |= 36;
		for (var t = this.s; t !== void 0; t = t.n) t.S.S(t);
	}
	j.prototype.S.call(this, e);
}, Dt.prototype.U = function(e) {
	if (this.t !== void 0 && (j.prototype.U.call(this, e), this.t === void 0)) {
		this.f &= -33;
		for (var t = this.s; t !== void 0; t = t.n) t.S.U(t);
	}
}, Dt.prototype.N = function() {
	if (!(2 & this.f)) {
		this.f |= 6;
		for (var e = this.t; e !== void 0; e = e.x) e.t.N();
	}
}, Object.defineProperty(Dt.prototype, "value", { get: function() {
	if (1 & this.f) throw Error("Cycle detected");
	var e = Ct(this);
	if (this.h(), e !== void 0 && (e.i = this.i), 16 & this.f) throw this.v;
	return this.v;
} });
function Ot(e, t) {
	return new Dt(e, t);
}
function kt(e) {
	var t = e.j;
	if (e.j = void 0, typeof t == "function") {
		_t++;
		var n = A;
		A = void 0;
		try {
			t();
		} catch (t) {
			throw e.f &= -2, e.f |= 8, At(e), t;
		} finally {
			A = n, ft();
		}
	}
}
function At(e) {
	for (var t = e.s; t !== void 0; t = t.n) t.S.U(t);
	e.x = void 0, e.s = void 0, kt(e);
}
function jt(e) {
	if (A !== this) throw Error("Out-of-order effect");
	Et(this), A = e, this.f &= -2;
	try {
		8 & this.f && At(this);
	} finally {
		ft();
	}
}
function Mt(e, t) {
	this.x = e, this.j = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = t?.name, mt && mt.push(this);
}
Mt.prototype.c = function() {
	var e = this.S();
	try {
		if (8 & this.f || this.x === void 0) return;
		var t = this.x();
		typeof t == "function" && (this.j = t);
	} finally {
		e();
	}
}, Mt.prototype.S = function() {
	if (1 & this.f) throw Error("Cycle detected");
	this.f |= 1, this.f &= -9, kt(this), Tt(this), _t++;
	var e = A;
	return A = this, jt.bind(this, e);
}, Mt.prototype.N = function() {
	2 & this.f || (this.f |= 2, this.u = gt, gt = this);
}, Mt.prototype.d = function() {
	this.f |= 8, 1 & this.f || At(this);
}, Mt.prototype.dispose = function() {
	this.d();
};
function Nt(e, t) {
	var n = new Mt(e, t);
	try {
		n.c();
	} catch (e) {
		throw n.d(), e;
	}
	var r = n.d.bind(n);
	return r[Symbol.dispose] = r, r;
}
// node_modules/@preact/signals/dist/signals.module.js
var Pt, Ft, It = typeof window < "u" && !!window.__PREACT_SIGNALS_DEVTOOLS__, Lt = [];
Nt(function() {
	Pt = this.N;
})();
function Rt(t, n) {
	e[t] = n.bind(null, e[t] || function() {});
}
function zt(e) {
	if (Ft) {
		var t = Ft;
		Ft = void 0, t();
	}
	Ft = e && e.S();
}
function Bt(e) {
	var t = this, r = e.data, i = Ht(r);
	i.name = "ReactiveDom", i.value = r;
	var a = tt(function() {
		for (var e = t, r = t.__v; r = r.__;) if (r.__c) {
			r.__c.__$f |= 4;
			break;
		}
		var a = Ot(function() {
			var e = i.value.value;
			return e === 0 ? 0 : !0 === e ? "" : e || "";
		}), o = Ot(function() {
			return !Array.isArray(a.value) && !n(a.value);
		}), s = Nt(function() {
			if (this.N = Gt, o.value) {
				var t = a.value;
				e.__v && e.__v.__e && e.__v.__e.nodeType === 3 && (e.__v.__e.data = t);
			}
		}), c = t.__$u.d;
		return t.__$u.d = function() {
			s(), c.call(this);
		}, [o, a];
	}, []), o = a[0], s = a[1];
	return o.value ? s.peek() : s.value;
}
Bt.displayName = "ReactiveTextNode", Object.defineProperties(j.prototype, {
	constructor: {
		configurable: !0,
		value: b(S, null).constructor
	},
	type: {
		configurable: !0,
		value: Bt
	},
	props: {
		configurable: !0,
		get: function() {
			var e = this;
			return { data: { get value() {
				return e.value;
			} } };
		}
	},
	__b: {
		configurable: !0,
		value: 1
	}
}), Rt("__b", function(e, t) {
	if (zt(), typeof t.type == "string") {
		var n, r = t.props;
		for (var i in r) if (i !== "children") {
			var a = r[i];
			a instanceof j && (n || (t.__np = n = {}), n[i] = a, r[i] = a.peek());
		}
	}
	e(t);
}), Rt("__r", function(e, t) {
	if (e(t), t.type !== S) {
		zt();
		var n, r = t.__c;
		r && (r.__$f &= -2, (n = r.__$u) === void 0 && (r.__$u = n = function(e, t) {
			var n;
			return Nt(function() {
				n = this;
			}, { name: t }), n.c = e, n;
		}(function(e) {
			return function() {
				var t;
				It && ((t = this.y) == null || t.call(this)), e.__$f |= 1, e.setState({});
			};
		}(r), typeof t.type == "function" ? t.type.displayName || t.type.name : ""))), zt(n);
	}
}), Rt("__e", function(e, t, n, r) {
	zt(), e(t, n, r);
}), Rt("diffed", function(e, t) {
	zt();
	var n;
	if (typeof t.type == "string" && (n = t.__e)) {
		var r = t.__np, i = t.props, a = n.U;
		if (a) for (var o in a) {
			var s = a[o];
			s === void 0 || r && o in r || (s.d(), a[o] = void 0);
		}
		if (r) for (var c in a || (a = {}, n.U = a), r) {
			var l = a[c], u = r[c];
			l === void 0 ? (l = Vt(n, c, u, i), a[c] = l) : l.o(u, i);
		}
	}
	e(t);
});
function Vt(e, t, n, r) {
	var i = t in e && e.ownerSVGElement === void 0, a = M(n);
	return {
		o: function(e, t) {
			a.value = e, r = t;
		},
		d: Nt(function() {
			this.N = Gt;
			var n = a.value.value;
			r[t] !== n && (r[t] = n, i ? e[t] = n : n != null && (!1 !== n || t[4] === "-") ? e.setAttribute(t, n) : e.removeAttribute(t));
		})
	};
}
Rt("unmount", function(e, t) {
	if (typeof t.type == "string") {
		var n = t.__e;
		if (n) {
			var r = n.U;
			if (r) for (var i in n.U = void 0, r) {
				var a = r[i];
				a && a.d();
			}
		}
		var o = t.__np;
		if (o) {
			var s = t.props;
			for (var c in o) s[c] = o[c];
		}
		t.__np = void 0;
	} else {
		var l = t.__c;
		if (l) {
			l.__$f |= 8;
			var u = l.__$u;
			u && (l.__$u = void 0, u.d());
		}
	}
	e(t);
}), Rt("__h", function(e, t, n, r) {
	r < 3 && (t.__$f |= 2), e(t, n, r);
}), ee.prototype.shouldComponentUpdate = function(e, t) {
	if (this.__R) return !0;
	var n = this.__$u, r = n && n.s !== void 0;
	for (var i in t) return !0;
	if (this.__f || typeof this.u == "boolean" && !0 === this.u) {
		var a = 2 & this.__$f;
		if (!(r || a || 4 & this.__$f) || 1 & this.__$f) return !0;
	} else if (!(r || 4 & this.__$f) || 3 & this.__$f) return !0;
	for (var o in e) if (o !== "__source" && e[o] !== this.props[o]) return !0;
	for (var s in this.props) if (!(s in e)) return !0;
	return !1;
};
function Ht(e, t) {
	return tt(function() {
		return M(e, t);
	}, []);
}
var Ut = function(e) {
	queueMicrotask(function() {
		queueMicrotask(e);
	});
};
function Wt() {
	pt(function() {
		for (var e; e = Lt.shift();) Pt.call(e);
	});
}
function Gt() {
	Lt.push(this) === 1 && (e.requestAnimationFrame || Ut)(Wt);
}
// src/entities.ts
var N = (e) => e.split(".")[0], Kt = /* @__PURE__ */ new Set(/* @__PURE__ */ "light.switch.fan.cover.climate.lock.media_player.input_boolean.vacuum.humidifier.valve.siren.sensor.binary_sensor.camera.scene.script.button.input_button.alarm_control_panel.number.input_number.select.input_select.weather.person.automation.water_heater.lawn_mower.remote.counter.timer.input_text.text.input_datetime.date.time.datetime.update.device_tracker.event.group.image.todo.calendar".split(".")), qt = /* @__PURE__ */ new Set([
	"light",
	"switch",
	"fan",
	"input_boolean",
	"siren",
	"humidifier",
	"automation",
	"remote"
]), Jt = /* @__PURE__ */ new Set([
	...qt,
	"cover",
	"climate",
	"lock",
	"media_player",
	"vacuum",
	"valve",
	"alarm_control_panel",
	"water_heater",
	"lawn_mower"
]), P = (e) => !e || e.state === "unavailable" || e.state === "unknown";
function Yt(e) {
	if (!e || P(e)) return !1;
	switch (N(e.entity_id)) {
		case "cover":
		case "valve": return e.state === "open" || e.state === "opening";
		case "lock": return e.state !== "locked";
		case "climate":
		case "water_heater": return e.state !== "off";
		case "media_player": return e.state === "playing";
		case "vacuum": return e.state === "cleaning";
		case "lawn_mower": return e.state === "mowing";
		case "timer": return e.state === "active";
		case "device_tracker": return e.state === "home";
		case "alarm_control_panel": return e.state.startsWith("armed") || e.state === "triggered";
		case "person": return e.state === "home";
		case "sensor":
		case "camera":
		case "weather":
		case "number":
		case "input_number":
		case "select":
		case "input_select":
		case "counter":
		case "input_text":
		case "text":
		case "input_datetime":
		case "date":
		case "time":
		case "datetime":
		case "event":
		case "image":
		case "todo": return !1;
		default: return e.state === "on";
	}
}
function Xt(e, t) {
	let n = N(e);
	return qt.has(n) || n === "cover" || n === "valve" ? "toggle" : n === "group" ? t && (t.state === "on" || t.state === "off") ? "toggle" : "details" : n === "todo" || n === "calendar" || n === "weather" ? n : n === "scene" || n === "script" ? "activate" : n === "button" || n === "input_button" ? "press" : n === "lock" ? "lock" : n === "media_player" ? "media" : "details";
}
var Zt = {
	light: ["mdi:lightbulb", "mdi:lightbulb-outline"],
	switch: ["mdi:toggle-switch", "mdi:toggle-switch-off-outline"],
	input_boolean: ["mdi:toggle-switch", "mdi:toggle-switch-off-outline"],
	fan: ["mdi:fan", "mdi:fan-off"],
	cover: ["mdi:window-shutter-open", "mdi:window-shutter"],
	valve: ["mdi:valve-open", "mdi:valve-closed"],
	climate: ["mdi:thermostat"],
	water_heater: ["mdi:water-boiler"],
	lock: ["mdi:lock-open-variant", "mdi:lock"],
	media_player: ["mdi:speaker-play", "mdi:speaker"],
	vacuum: ["mdi:robot-vacuum"],
	humidifier: ["mdi:air-humidifier", "mdi:air-humidifier-off"],
	siren: ["mdi:bullhorn"],
	sensor: ["mdi:eye"],
	binary_sensor: ["mdi:checkbox-marked-circle", "mdi:checkbox-blank-circle-outline"],
	camera: ["mdi:cctv"],
	scene: ["mdi:palette"],
	script: ["mdi:script-text-play"],
	button: ["mdi:gesture-tap-button"],
	input_button: ["mdi:gesture-tap-button"],
	alarm_control_panel: ["mdi:shield-lock", "mdi:shield-off"],
	number: ["mdi:ray-vertex"],
	input_number: ["mdi:ray-vertex"],
	select: ["mdi:format-list-bulleted"],
	input_select: ["mdi:format-list-bulleted"],
	weather: ["mdi:weather-partly-cloudy"],
	person: ["mdi:account", "mdi:account-outline"],
	automation: ["mdi:robot", "mdi:robot-off"],
	lawn_mower: ["mdi:robot-mower", "mdi:robot-mower-outline"],
	remote: ["mdi:remote", "mdi:remote-off"],
	counter: ["mdi:counter"],
	timer: ["mdi:timer-outline", "mdi:timer-off-outline"],
	input_text: ["mdi:form-textbox"],
	text: ["mdi:form-textbox"],
	input_datetime: ["mdi:calendar-clock"],
	date: ["mdi:calendar"],
	time: ["mdi:clock-outline"],
	datetime: ["mdi:calendar-clock"],
	update: ["mdi:package-up", "mdi:package"],
	device_tracker: ["mdi:map-marker", "mdi:map-marker-off"],
	event: ["mdi:gesture-tap"],
	group: ["mdi:google-circles-communities"],
	image: ["mdi:image"],
	todo: ["mdi:clipboard-list"],
	calendar: ["mdi:calendar"]
}, Qt = {
	light: "#f5b400",
	power: "#22c55e",
	climate: "#f97316",
	cover: "#14b8a6",
	water: "#3b82f6",
	security: "#ef4444",
	media: "#a855f7",
	robot: "#84cc16",
	sensor: "#64748b",
	scene: "#6366f1",
	info: "#0ea5e9"
}, $t = {
	light: "linear-gradient(135deg,#fbbf24 0%,#f97316 100%)",
	power: "linear-gradient(135deg,#34d399 0%,#06b6d4 100%)",
	climate: "linear-gradient(135deg,#fb923c 0%,#ef4444 100%)",
	cover: "linear-gradient(135deg,#22d3ee 0%,#3b82f6 100%)",
	water: "linear-gradient(135deg,#38bdf8 0%,#6366f1 100%)",
	security: "linear-gradient(135deg,#f43f5e 0%,#c026d3 100%)",
	media: "linear-gradient(135deg,#a855f7 0%,#ec4899 100%)",
	robot: "linear-gradient(135deg,#a3e635 0%,#10b981 100%)",
	sensor: "linear-gradient(135deg,#64748b 0%,#334155 100%)",
	scene: "linear-gradient(135deg,#818cf8 0%,#a855f7 100%)",
	info: "linear-gradient(135deg,#38bdf8 0%,#2563eb 100%)"
};
function en(e, t) {
	switch (N(e)) {
		case "light": return "light";
		case "switch":
		case "input_boolean":
		case "remote":
		case "group":
		case "automation":
		case "siren": return "power";
		case "fan":
		case "climate":
		case "water_heater":
		case "humidifier": return "climate";
		case "cover": return "cover";
		case "valve": return "water";
		case "lock":
		case "alarm_control_panel":
		case "camera": return "security";
		case "binary_sensor": {
			let e = t?.attributes.device_class;
			return [
				"door",
				"window",
				"garage_door",
				"opening",
				"motion",
				"occupancy",
				"smoke",
				"safety",
				"lock",
				"tamper"
			].includes(e) ? "security" : e === "moisture" ? "water" : "sensor";
		}
		case "media_player": return "media";
		case "vacuum":
		case "lawn_mower": return "robot";
		case "scene":
		case "script":
		case "button":
		case "input_button": return "scene";
		case "weather":
		case "calendar":
		case "todo":
		case "person":
		case "device_tracker":
		case "update": return "info";
		case "sensor": {
			let e = t?.attributes.device_class;
			return e === "temperature" ? "climate" : e === "humidity" || e === "moisture" || e === "water" || e === "precipitation" ? "water" : e === "power" || e === "energy" || e === "voltage" || e === "current" || e === "battery" ? "power" : "sensor";
		}
		default: return "sensor";
	}
}
var tn = /zone|sprinkler|irrigat|drip|lawn|garden|hose|station|water(ing)?/i, nn = /* @__PURE__ */ new Set([
	"switch",
	"valve",
	"input_boolean"
]);
function rn(e, t) {
	let n = N(t);
	if (!nn.has(n)) return !1;
	let r = e.states[t];
	if (n === "valve" && r?.attributes.device_class === "water") return !0;
	let i = `${t} ${r?.attributes.friendly_name ?? ""}`;
	return tn.test(i);
}
var an = {
	temperature: "mdi:thermometer",
	humidity: "mdi:water-percent",
	battery: "mdi:battery",
	power: "mdi:flash",
	energy: "mdi:lightning-bolt",
	illuminance: "mdi:brightness-5",
	pressure: "mdi:gauge",
	carbon_dioxide: "mdi:molecule-co2",
	pm25: "mdi:blur",
	moisture: "mdi:water",
	voltage: "mdi:sine-wave",
	current: "mdi:current-ac",
	gas: "mdi:meter-gas",
	water: "mdi:water"
}, on = {
	door: ["mdi:door-open", "mdi:door-closed"],
	garage_door: ["mdi:garage-open", "mdi:garage"],
	window: ["mdi:window-open", "mdi:window-closed"],
	opening: ["mdi:square-outline", "mdi:square"],
	motion: ["mdi:motion-sensor", "mdi:motion-sensor-off"],
	occupancy: ["mdi:home-account", "mdi:home-outline"],
	presence: ["mdi:home-account", "mdi:home-outline"],
	moisture: ["mdi:water-alert", "mdi:water-off"],
	smoke: ["mdi:smoke-detector-alert", "mdi:smoke-detector"],
	battery: ["mdi:battery-alert", "mdi:battery"],
	connectivity: ["mdi:lan-connect", "mdi:lan-disconnect"],
	plug: ["mdi:power-plug", "mdi:power-plug-off"]
}, sn = {
	garage: ["mdi:garage-open", "mdi:garage"],
	door: ["mdi:door-open", "mdi:door-closed"],
	gate: ["mdi:gate-open", "mdi:gate"],
	blind: ["mdi:blinds-open", "mdi:blinds"],
	curtain: ["mdi:curtains", "mdi:curtains-closed"],
	shade: ["mdi:roller-shade", "mdi:roller-shade-closed"],
	shutter: ["mdi:window-shutter-open", "mdi:window-shutter"],
	window: ["mdi:window-open", "mdi:window-closed"],
	awning: ["mdi:awning-outline", "mdi:awning-outline"]
};
function cn(e, t, n) {
	if (n?.icon) return n.icon;
	let r = e.entities?.[t];
	if (r?.icon) return r.icon;
	let i = e.states[t];
	if (i?.attributes.icon) return i.attributes.icon;
	let a = N(t), o = i?.attributes.device_class;
	if (a === "sensor" && o && an[o]) return an[o];
	if (a === "cover" && o && sn[o]) {
		let [e, t] = sn[o];
		return i?.state === "closed" ? t : e;
	}
	if (a === "binary_sensor" && o && on[o]) {
		let [e, t] = on[o];
		return i?.state === "on" ? e : t;
	}
	let s = Zt[a] ?? ["mdi:help-circle-outline"];
	return Yt(i) || !s[1] ? s[0] : s[1];
}
function F(e, t, n, r) {
	if (n?.name) return n.name;
	let i = e.states[t]?.attributes.friendly_name ?? e.entities?.[t]?.name ?? t;
	if (r) {
		let e = r.toLowerCase() + " ";
		i.toLowerCase().startsWith(e) && i.length > e.length + 1 && (i = i.slice(e.length), i = i.charAt(0).toUpperCase() + i.slice(1));
	}
	return i;
}
var ln = {
	door: ["Open", "Closed"],
	garage_door: ["Open", "Closed"],
	window: ["Open", "Closed"],
	opening: ["Open", "Closed"],
	motion: ["Motion", "Clear"],
	occupancy: ["Occupied", "Clear"],
	presence: ["Home", "Away"],
	moisture: ["Wet", "Dry"],
	smoke: ["Smoke!", "Clear"],
	battery: ["Low", "OK"],
	connectivity: ["Connected", "Offline"],
	lock: ["Unlocked", "Locked"],
	plug: ["Plugged in", "Unplugged"]
}, un = (e) => e.replace(/_/g, " ").replace(/\b\w/g, (e) => e.toUpperCase());
function I(e, t) {
	if (!t) return "Not found";
	if (t.state === "unavailable") return "Unavailable";
	if (t.state === "unknown") return "Unknown";
	let n = N(t.entity_id);
	if (n === "binary_sensor") {
		let e = ln[t.attributes.device_class] ?? ["On", "Off"];
		return t.state === "on" ? e[0] : e[1];
	}
	if (n === "light" && t.state === "on" && t.attributes.brightness != null) return `${Math.round(t.attributes.brightness / 255 * 100)}%`;
	if (n === "cover" && t.attributes.current_position != null && t.state === "open") return `Open · ${t.attributes.current_position}%`;
	if (n === "climate") {
		let e = t.attributes, n = un(e.hvac_action ?? t.state);
		return e.temperature == null ? e.target_temp_low != null && e.target_temp_high != null ? `${n} · ${e.target_temp_low}–${e.target_temp_high}°` : e.current_temperature == null ? n : `${n} · ${e.current_temperature}°` : `${n} · ${e.temperature}°`;
	}
	if (n === "media_player" && t.attributes.media_title) return t.attributes.media_artist ? `${t.attributes.media_title} · ${t.attributes.media_artist}` : t.attributes.media_title;
	if (n === "scene" || n === "script" || n === "button" || n === "input_button") return n === "script" && t.state === "on" ? "Running" : "Tap to run";
	if (n === "todo") {
		let e = Number(t.state) || 0;
		return e === 0 ? "All done" : e === 1 ? "1 to do" : `${e} to do`;
	}
	if (n === "calendar") return t.state === "on" ? `Now: ${t.attributes.message ?? "event"}` : t.attributes.message ? `Next: ${t.attributes.message}` : "No events";
	if (n === "weather" && t.attributes.temperature != null) {
		let e = t.state === "partlycloudy" ? "Partly cloudy" : un(t.state.replace(/-/g, " "));
		return `${Math.round(t.attributes.temperature)}° · ${e}`;
	}
	if (n === "update") return t.state === "on" ? `Update to ${t.attributes.latest_version ?? "new version"}` : "Up to date";
	if (e.formatEntityState) try {
		return e.formatEntityState(t);
	} catch {}
	let r = t.attributes.unit_of_measurement, i = Number(t.state);
	return r && !Number.isNaN(i) ? `${Math.abs(i) >= 100 ? Math.round(i) : Math.round(i * 10) / 10} ${r}` : un(t.state);
}
function dn(e, t) {
	let n = e.entities?.[t];
	return n ? n.area_id ? n.area_id : n.device_id ? e.devices?.[n.device_id]?.area_id ?? null : null : null;
}
function fn(e, t) {
	if (!Kt.has(N(t))) return !1;
	let n = e.entities?.[t];
	return !(n?.hidden || n?.entity_category);
}
function pn(e, t) {
	return Object.keys(e.states).filter((n) => fn(e, n) && dn(e, n) === t).sort(yn(e));
}
function mn(e) {
	return Object.keys(e.states).filter((t) => fn(e, t) && !dn(e, t)).sort(yn(e));
}
var hn = /* @__PURE__ */ new Set([
	"temperature",
	"humidity",
	"carbon_dioxide",
	"pm25"
]), gn = /* @__PURE__ */ new Set([
	"door",
	"garage_door",
	"window",
	"opening",
	"motion",
	"occupancy",
	"moisture",
	"smoke"
]);
function _n(e, t) {
	let n = N(t);
	if (Jt.has(n) || n === "camera") return n !== "automation";
	let r = e.states[t]?.attributes.device_class;
	return n === "sensor" ? hn.has(r) : n === "binary_sensor" && gn.has(r);
}
var vn = [
	"light",
	"switch",
	"fan",
	"cover",
	"valve",
	"climate",
	"media_player",
	"lock",
	"camera",
	"vacuum",
	"humidifier",
	"alarm_control_panel",
	"scene",
	"script",
	"button",
	"input_button",
	"input_boolean",
	"sensor",
	"binary_sensor"
];
function yn(e) {
	return (t, n) => {
		let r = vn.indexOf(N(t)), i = vn.indexOf(N(n)), a = r === -1 ? 99 : r, o = i === -1 ? 99 : i;
		return a === o ? F(e, t).localeCompare(F(e, n)) : a - o;
	};
}
function bn(e) {
	let t = N(e);
	return t === "camera" || t === "media_player" ? "wide" : t === "climate" || t === "water_heater" ? "lg" : t === "weather" ? "md" : "sm";
}
var xn = {
	light: "Lights",
	switch: "Switches",
	fan: "Fans",
	cover: "Blinds & covers",
	valve: "Valves",
	climate: "Climate",
	media_player: "Media",
	lock: "Locks",
	camera: "Cameras",
	vacuum: "Vacuums",
	humidifier: "Humidifiers",
	alarm_control_panel: "Alarms",
	scene: "Scenes",
	script: "Scripts",
	button: "Buttons",
	input_button: "Buttons",
	input_boolean: "Toggles",
	sensor: "Sensors",
	binary_sensor: "Binary sensors",
	number: "Numbers",
	input_number: "Numbers",
	select: "Selects",
	input_select: "Selects",
	siren: "Sirens",
	weather: "Weather",
	person: "People",
	automation: "Automations",
	water_heater: "Water heaters",
	lawn_mower: "Lawn mowers",
	remote: "Remotes",
	counter: "Counters",
	timer: "Timers",
	input_text: "Text",
	text: "Text",
	input_datetime: "Date & time",
	date: "Date & time",
	time: "Date & time",
	datetime: "Date & time",
	update: "Updates",
	device_tracker: "Device trackers",
	event: "Events",
	group: "Groups",
	image: "Images",
	todo: "To-do lists",
	calendar: "Calendars"
}, L = M(null), Sn = M(!1), Cn = M(typeof window < "u" ? window.innerWidth : 1200), wn = M(null), R = M(null), Tn = M(0), En = M(null), z = M(null), Dn = Ot(() => z.value !== null), On = Ot(() => z.value ?? R.value), B = M(null);
function kn() {
	try {
		let e = localStorage.getItem("dashforge.sidebar");
		return e === "hidden" || e === "shown" ? e : null;
	} catch {
		return null;
	}
}
var An = M(kn());
function jn(e) {
	let t = e ? "hidden" : "shown";
	An.value = t;
	try {
		localStorage.setItem("dashforge.sidebar", t);
	} catch {}
}
function Mn(e) {
	return An.value ? An.value === "hidden" : e;
}
var Nn = M(!1), Pn = M(!1), Fn = M(null), In;
function V(e, t = "info") {
	Fn.value = {
		text: e,
		kind: t
	}, clearTimeout(In), In = window.setTimeout(() => Fn.value = null, 3500);
}
function Ln() {
	if (!L.value) throw Error("Home Assistant is not connected");
	return L.value;
}
var Rn = null;
async function zn() {
	try {
		let [e, t] = await Promise.all([Ln().callWS({ type: "dashforge/info" }), Ln().callWS({ type: "dashforge/config/get" })]);
		wn.value = e, Tn.value = t.revision, R.value = t.config ? Oe(t.config) : null, En.value = null, Rn ||= await Ln().connection.subscribeMessage((e) => {
			e.revision !== Tn.value && (Tn.value = e.revision, R.value = e.config ? Oe(e.config) : null);
		}, { type: "dashforge/config/subscribe" });
	} catch (e) {
		En.value = e?.message ?? String(e);
	}
}
function Bn() {
	Rn?.().catch(() => void 0), Rn = null;
}
async function Vn(e) {
	try {
		return Tn.value = (await Ln().callWS({
			type: "dashforge/config/save",
			config: e,
			revision: Tn.value
		})).revision, R.value = e ? Oe(e) : null, !0;
	} catch (e) {
		return e?.code === "conflict" ? (V("This dashboard was changed on another device. Reloaded the latest version.", "error"), await zn()) : V(e?.message ?? "Could not save the dashboard", "error"), !1;
	}
}
function Hn() {
	R.value && (z.value = ke(R.value));
}
function Un(e) {
	if (!z.value) return;
	let t = ke(z.value);
	e(t), z.value = t;
}
async function Wn() {
	z.value && await Vn(z.value) && (z.value = null, V("Dashboard saved"));
}
function Gn() {
	z.value = null;
}
function H(e, t, n = {}) {
	return Ln().callService(e, t, n).catch((n) => V(n?.message ?? `${e}.${t} failed`, "error"));
}
function Kn(e) {
	qn?.dispatchEvent(new CustomEvent("hass-more-info", {
		detail: { entityId: e },
		bubbles: !0,
		composed: !0
	}));
}
var qn = null;
function Jn(e) {
	qn = e;
}
// node_modules/lucide/dist/esm/icons/activity.mjs
var Yn = [["path", { d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" }]], Xn = [
	["path", { d: "M18 17.5a2.5 2.5 0 1 1-4 2.03V12" }],
	["path", { d: "M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" }],
	["path", { d: "M6 8h12" }],
	["path", { d: "M6.6 15.572A2 2 0 1 0 10 17v-5" }]
], Zn = [
	["rect", {
		x: "2",
		y: "4",
		width: "20",
		height: "16",
		rx: "2"
	}],
	["path", { d: "M10 4v4" }],
	["path", { d: "M2 8h20" }],
	["path", { d: "M6 4v4" }]
], Qn = [["path", { d: "M12 5v14" }], ["path", { d: "m19 12-7 7-7-7" }]], $n = [["path", { d: "m12 19-7-7 7-7" }], ["path", { d: "M19 12H5" }]], er = [["path", { d: "M5 12h14" }], ["path", { d: "m12 5 7 7-7 7" }]], tr = [["path", { d: "m5 12 7-7 7 7" }], ["path", { d: "M12 19V5" }]], nr = [
	["path", { d: "M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" }],
	["path", { d: "M15 12h.01" }],
	["path", { d: "M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" }],
	["path", { d: "M9 12h.01" }]
], rr = [["path", { d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" }], ["path", { d: "m16 9-5.5 5.5L8 12" }]], ir = [["path", { d: "M 22 14 L 22 10" }], ["rect", {
	x: "2",
	y: "6",
	width: "16",
	height: "12",
	rx: "2"
}]], ar = [
	["path", { d: "M2 4v16" }],
	["path", { d: "M2 8h18a2 2 0 0 1 2 2v10" }],
	["path", { d: "M2 17h20" }],
	["path", { d: "M6 8v9" }]
], or = [
	["path", { d: "M3 3h18" }],
	["path", { d: "M20 7H8" }],
	["path", { d: "M20 11H8" }],
	["path", { d: "M10 19h10" }],
	["path", { d: "M8 15h12" }],
	["path", { d: "M4 3v14" }],
	["circle", {
		cx: "4",
		cy: "19",
		r: "2"
	}]
], sr = [["path", { d: "M12 5v16" }], ["path", { d: "M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z" }]], cr = [
	["path", { d: "M12 8V4H8" }],
	["rect", {
		width: "16",
		height: "12",
		x: "4",
		y: "8",
		rx: "2"
	}],
	["path", { d: "M2 14h2" }],
	["path", { d: "M20 14h2" }],
	["path", { d: "M15 13v2" }],
	["path", { d: "M9 13v2" }]
], lr = [
	["path", { d: "m11 10 3 3" }],
	["path", { d: "M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z" }],
	["path", { d: "M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031" }]
], ur = [
	["path", { d: "M16 14v2.2l1.6 1" }],
	["path", { d: "M16 2v3" }],
	["path", { d: "M21 7.338V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2.338" }],
	["path", { d: "M3 9h5.859" }],
	["path", { d: "M8 2v3" }],
	["circle", {
		cx: "16",
		cy: "16",
		r: "6"
	}]
], dr = [
	["path", { d: "M8 2v3" }],
	["path", { d: "M16 2v3" }],
	["rect", {
		x: "3",
		y: "3",
		width: "18",
		height: "18",
		rx: "2"
	}],
	["path", { d: "M3 9h18" }]
], fr = [
	["path", { d: "M14.564 14.558a3 3 0 1 1-4.122-4.121" }],
	["path", { d: "m2 2 20 20" }],
	["path", { d: "M20 20H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 .819-.175" }],
	["path", { d: "M9.695 4.024A2 2 0 0 1 10.004 4h3.993a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v7.344" }]
], pr = [
	["path", { d: "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" }],
	["circle", {
		cx: "7",
		cy: "17",
		r: "2"
	}],
	["path", { d: "M9 17h6" }],
	["circle", {
		cx: "17",
		cy: "17",
		r: "2"
	}]
], mr = [
	["path", { d: "M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97" }],
	["path", { d: "M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z" }],
	["path", { d: "M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15" }],
	["path", { d: "M2 21v-4" }],
	["path", { d: "M7 9h.01" }]
], hr = [["path", { d: "M20 6 9 17l-5-5" }]], gr = [["path", { d: "m6 9 6 6 6-6" }]], _r = [["path", { d: "m15 18-6-6 6-6" }]], vr = [["path", { d: "m9 18 6-6-6-6" }]], yr = [["path", { d: "m18 15-6-6-6 6" }]], br = [["circle", {
	cx: "12",
	cy: "12",
	r: "10"
}], ["path", { d: "m16 9-5.5 5.5L8 12" }]], xr = [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "8",
		y2: "12"
	}],
	["line", {
		x1: "12",
		x2: "12.01",
		y1: "16",
		y2: "16"
	}]
], Sr = [["path", { d: "M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z" }], ["circle", {
	cx: "12",
	cy: "12",
	r: "10"
}]], Cr = [
	["rect", {
		width: "8",
		height: "4",
		x: "8",
		y: "2",
		rx: "1",
		ry: "1"
	}],
	["path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" }],
	["path", { d: "M12 11h4" }],
	["path", { d: "M12 16h4" }],
	["path", { d: "M8 11h.01" }],
	["path", { d: "M8 16h.01" }]
], wr = [["circle", {
	cx: "12",
	cy: "12",
	r: "10"
}], ["path", { d: "M12 6v6l4 2" }]], Tr = [
	["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }],
	["path", { d: "M16 17H7" }],
	["path", { d: "M17 21H9" }]
], Er = [["path", { d: "M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" }], ["path", { d: "m13 12-3 5h4l-3 5" }]], Dr = [["path", { d: "M13 16a3 3 0 0 1 0 6H7a5 5 0 1 1 4.9-6z" }], ["path", { d: "M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36" }]], Or = [
	["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }],
	["path", { d: "M8 15h.01" }],
	["path", { d: "M8 19h.01" }],
	["path", { d: "M12 17h.01" }],
	["path", { d: "M12 21h.01" }],
	["path", { d: "M16 15h.01" }],
	["path", { d: "M16 19h.01" }]
], kr = [
	["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }],
	["path", { d: "M16 14v6" }],
	["path", { d: "M8 14v6" }],
	["path", { d: "M12 16v6" }]
], Ar = [
	["path", { d: "M12 2v2" }],
	["path", { d: "m4.93 4.93 1.41 1.41" }],
	["path", { d: "M20 12h2" }],
	["path", { d: "m19.07 4.93-1.41 1.41" }],
	["path", { d: "M15.947 12.65a4 4 0 0 0-5.925-4.128" }],
	["path", { d: "M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" }]
], jr = [["path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" }]], Mr = [
	["path", { d: "M10 2v2" }],
	["path", { d: "M14 2v2" }],
	["path", { d: "M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" }],
	["path", { d: "M6 2v2" }]
], Nr = [
	["path", { d: "M2 12h20" }],
	["path", { d: "M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" }],
	["path", { d: "m4 8 16-4" }],
	["path", { d: "m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8" }]
], Pr = [
	["path", { d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" }],
	["path", { d: "M2 21h20" }],
	["path", { d: "M9 12h.01" }]
], Fr = [
	["path", { d: "M10 21H2" }],
	["path", { d: "M10 3H7a2 2 0 00-2 2v16" }],
	["path", { d: "M14 12h.01" }],
	["path", { d: "M19 21V5a2 2 0 00-1.675-1.974l-6.163-1.013A1 1 0 0010 3v18a1 1 0 001.124.992z" }],
	["path", { d: "M22 21h-3" }]
], Ir = [
	["path", { d: "M12 15V3" }],
	["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }],
	["path", { d: "m7 10 5 5 5-5" }]
], Lr = [["path", { d: "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" }]], Rr = [["path", { d: "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" }], ["path", { d: "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" }]], zr = [
	["path", { d: "M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z" }],
	["path", { d: "m2.5 21.5 1.4-1.4" }],
	["path", { d: "m20.1 3.9 1.4-1.4" }],
	["path", { d: "M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z" }],
	["path", { d: "m9.6 14.4 4.8-4.8" }]
], Br = [
	["path", { d: "M21 16V3a1 1 0 0 0-1.28-.96l-10 2.917a1 1 0 0 0-.72.96V19" }],
	["circle", {
		cx: "18",
		cy: "16",
		r: "3"
	}],
	["circle", {
		cx: "6",
		cy: "19",
		r: "3"
	}]
], Vr = [
	["path", { d: "m15 15 6 6" }],
	["path", { d: "m15 9 6-6" }],
	["path", { d: "M21 16v5h-5" }],
	["path", { d: "M21 8V3h-5" }],
	["path", { d: "M3 16v5h5" }],
	["path", { d: "m3 21 6-6" }],
	["path", { d: "M3 8V3h5" }],
	["path", { d: "M9 9 3 3" }]
], Hr = [
	["path", { d: "M15 3h6v6" }],
	["path", { d: "M10 14 21 3" }],
	["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }]
], Ur = [
	["path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" }],
	["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242" }],
	["path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" }],
	["path", { d: "m2 2 20 20" }]
], Wr = [["path", { d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" }], ["circle", {
	cx: "12",
	cy: "12",
	r: "3"
}]], Gr = [["path", { d: "M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z" }], ["path", { d: "M12 12v.01" }]], Kr = [
	["path", { d: "M4 3 2 5v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z" }],
	["path", { d: "M6 8h4" }],
	["path", { d: "M6 18h4" }],
	["path", { d: "m12 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z" }],
	["path", { d: "M14 8h4" }],
	["path", { d: "M14 18h4" }],
	["path", { d: "m20 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z" }]
], qr = [["path", { d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4" }]], Jr = [
	["path", { d: "M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1" }],
	["circle", {
		cx: "12",
		cy: "8",
		r: "2"
	}],
	["path", { d: "M12 10v12" }],
	["path", { d: "M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z" }],
	["path", { d: "M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z" }]
], Yr = [
	["path", { d: "M12 10v6" }],
	["path", { d: "M9 13h6" }],
	["path", { d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" }]
], Xr = [
	["path", { d: "M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z" }],
	["path", { d: "M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z" }],
	["path", { d: "M16 17h4" }],
	["path", { d: "M4 13h4" }]
], Zr = [
	["line", {
		x1: "6",
		x2: "10",
		y1: "11",
		y2: "11"
	}],
	["line", {
		x1: "8",
		x2: "8",
		y1: "9",
		y2: "13"
	}],
	["line", {
		x1: "15",
		x2: "15.01",
		y1: "12",
		y2: "12"
	}],
	["line", {
		x1: "18",
		x2: "18.01",
		y1: "10",
		y2: "10"
	}],
	["path", { d: "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" }]
], Qr = [["path", { d: "m12 14 4-4" }], ["path", { d: "M3.34 19a10 10 0 1 1 17.32 0" }]], $r = [
	["path", { d: "m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9" }],
	["path", { d: "m18 15 4-4" }],
	["path", { d: "m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5" }]
], ei = [
	["path", { d: "M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" }],
	["path", { d: "M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" }],
	["path", { d: "M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" }],
	["path", { d: "M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" }]
], ti = [
	["line", {
		x1: "4",
		x2: "20",
		y1: "9",
		y2: "9"
	}],
	["line", {
		x1: "4",
		x2: "20",
		y1: "15",
		y2: "15"
	}],
	["line", {
		x1: "10",
		x2: "8",
		y1: "3",
		y2: "21"
	}],
	["line", {
		x1: "16",
		x2: "14",
		y1: "3",
		y2: "21"
	}]
], ni = [
	["path", { d: "M11 8c2-3-2-3 0-6" }],
	["path", { d: "M15.5 8c2-3-2-3 0-6" }],
	["path", { d: "M6 10h.01" }],
	["path", { d: "M6 14h.01" }],
	["path", { d: "M10 16v-4" }],
	["path", { d: "M14 16v-4" }],
	["path", { d: "M18 16v-4" }],
	["path", { d: "M20 6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3" }],
	["path", { d: "M5 20v2" }],
	["path", { d: "M19 20v2" }]
], ri = [
	["path", { d: "M5 22h14" }],
	["path", { d: "M5 2h14" }],
	["path", { d: "M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" }],
	["path", { d: "M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" }]
], ii = [["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" }], ["path", { d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }]], ai = [
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		ry: "2"
	}],
	["circle", {
		cx: "9",
		cy: "9",
		r: "2"
	}],
	["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" }]
], oi = [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}],
	["path", { d: "M12 16v-4" }],
	["path", { d: "M12 8h.01" }]
], si = [
	["path", { d: "M10.293 2.293a1 1 0 0 1 1.414 0l2.5 2.5 5.994 1.227a1 1 0 0 1 .506 1.687l-7 7a1 1 0 0 1-1.687-.506l-1.227-5.994-2.5-2.5a1 1 0 0 1 0-1.414z" }],
	["path", { d: "m14.207 4.793-3.414 3.414" }],
	["path", { d: "M3 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" }],
	["path", { d: "m9.086 6.5-4.793 4.793a1 1 0 0 0-.18 1.17L7 18" }]
], ci = [
	["path", { d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" }],
	["path", { d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" }],
	["path", { d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" }]
], li = [
	["rect", {
		width: "7",
		height: "9",
		x: "3",
		y: "3",
		rx: "1"
	}],
	["rect", {
		width: "7",
		height: "5",
		x: "14",
		y: "3",
		rx: "1"
	}],
	["rect", {
		width: "7",
		height: "9",
		x: "14",
		y: "12",
		rx: "1"
	}],
	["rect", {
		width: "7",
		height: "5",
		x: "3",
		y: "16",
		rx: "1"
	}]
], ui = [
	["rect", {
		width: "7",
		height: "7",
		x: "3",
		y: "3",
		rx: "1"
	}],
	["rect", {
		width: "7",
		height: "7",
		x: "14",
		y: "3",
		rx: "1"
	}],
	["rect", {
		width: "7",
		height: "7",
		x: "14",
		y: "14",
		rx: "1"
	}],
	["rect", {
		width: "7",
		height: "7",
		x: "3",
		y: "14",
		rx: "1"
	}]
], di = [
	["rect", {
		width: "18",
		height: "7",
		x: "3",
		y: "3",
		rx: "1"
	}],
	["rect", {
		width: "9",
		height: "7",
		x: "3",
		y: "14",
		rx: "1"
	}],
	["rect", {
		width: "5",
		height: "7",
		x: "16",
		y: "14",
		rx: "1"
	}]
], fi = [["path", { d: "M11 20a10 10 0 0010-10 25.9 25.9 0 00-1.04-7.281 1 1 0 00-1.755-.325C15.833 5.5 13 5.5 9.8 6.1A7 7 0 0011 20" }], ["path", { d: "M2 21a5 5 0 012.911-4.544C7.613 15.212 8.351 15.24 11 13" }]], pi = [
	["path", { d: "m16 6 4 14" }],
	["path", { d: "M12 6v14" }],
	["path", { d: "M8 8v12" }],
	["path", { d: "M4 4v16" }]
], mi = [
	["path", { d: "M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5" }],
	["path", { d: "m2 2 20 20" }],
	["path", { d: "M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5" }],
	["path", { d: "M9 18h6" }],
	["path", { d: "M10 22h4" }]
], hi = [
	["path", { d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" }],
	["path", { d: "M9 18h6" }],
	["path", { d: "M10 22h4" }]
], gi = [
	["path", { d: "M13 5h8" }],
	["path", { d: "M13 12h8" }],
	["path", { d: "M13 19h8" }],
	["path", { d: "m3 17 2 2 4-4" }],
	["path", { d: "m3 7 2 2 4-4" }]
], _i = [
	["path", { d: "M3 5h.01" }],
	["path", { d: "M3 12h.01" }],
	["path", { d: "M3 19h.01" }],
	["path", { d: "M8 5h13" }],
	["path", { d: "M8 12h13" }],
	["path", { d: "M8 19h13" }]
], vi = [["rect", {
	width: "18",
	height: "11",
	x: "3",
	y: "11",
	rx: "2",
	ry: "2"
}], ["path", { d: "M7 11V7a5 5 0 0 1 9.9-1" }]], yi = [["rect", {
	width: "18",
	height: "11",
	x: "3",
	y: "11",
	rx: "2",
	ry: "2"
}], ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4" }]], bi = [["path", { d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" }], ["circle", {
	cx: "12",
	cy: "10",
	r: "3"
}]], xi = [
	["path", { d: "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" }],
	["path", { d: "M15 5.764v15" }],
	["path", { d: "M9 3.236v15" }]
], Si = [
	["path", { d: "M8 3H5a2 2 0 0 0-2 2v3" }],
	["path", { d: "M21 8V5a2 2 0 0 0-2-2h-3" }],
	["path", { d: "M3 16v3a2 2 0 0 0 2 2h3" }],
	["path", { d: "M16 21h3a2 2 0 0 0 2-2v-3" }]
], Ci = [
	["path", { d: "M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" }],
	["path", { d: "M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14" }],
	["path", { d: "M8 6v8" }]
], wi = [
	["path", { d: "M4 5h16" }],
	["path", { d: "M4 12h16" }],
	["path", { d: "M4 19h16" }]
], Ti = [["path", { d: "M5 12h14" }]], Ei = [
	["path", { d: "M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8" }],
	["path", { d: "M10 19v-3.96 3.15" }],
	["path", { d: "M7 19h5" }],
	["rect", {
		width: "6",
		height: "10",
		x: "16",
		y: "12",
		rx: "2"
	}]
], Di = [["path", { d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" }]], Oi = [
	["path", { d: "M12 22V12" }],
	["path", { d: "m16 17 2 2 4-4" }],
	["path", { d: "M21 11.127V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.32-.753" }],
	["path", { d: "M3.29 7 12 12l8.71-5" }],
	["path", { d: "m7.5 4.27 8.997 5.148" }]
], ki = [
	["path", { d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" }],
	["path", { d: "M12 22V12" }],
	["polyline", { points: "3.29 7 12 12 20.71 7" }],
	["path", { d: "m7.5 4.27 9 5.15" }]
], Ai = [
	["path", { d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" }],
	["circle", {
		cx: "13.5",
		cy: "6.5",
		r: ".5",
		fill: "currentColor"
	}],
	["circle", {
		cx: "17.5",
		cy: "10.5",
		r: ".5",
		fill: "currentColor"
	}],
	["circle", {
		cx: "6.5",
		cy: "12.5",
		r: ".5",
		fill: "currentColor"
	}],
	["circle", {
		cx: "8.5",
		cy: "7.5",
		r: ".5",
		fill: "currentColor"
	}]
], ji = [["rect", {
	width: "18",
	height: "18",
	x: "3",
	y: "3",
	rx: "2"
}], ["path", { d: "M9 3v18" }]], Mi = [["rect", {
	x: "14",
	y: "3",
	width: "5",
	height: "18",
	rx: "1"
}], ["rect", {
	x: "5",
	y: "3",
	width: "5",
	height: "18",
	rx: "1"
}]], Ni = [["path", { d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" }], ["path", { d: "m15 5 4 4" }]], Pi = [["path", { d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" }]], Fi = [
	["path", { d: "M12 22v-5" }],
	["path", { d: "M15 8V2" }],
	["path", { d: "M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z" }],
	["path", { d: "M9 8V2" }]
], Ii = [["path", { d: "M5 12h14" }], ["path", { d: "M12 5v14" }]], Li = [
	["path", { d: "M22 14a8 8 0 0 1-8 8" }],
	["path", { d: "M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2" }],
	["path", { d: "M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1" }],
	["path", { d: "M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10" }],
	["path", { d: "M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" }]
], Ri = [["path", { d: "M12 2v10" }], ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04" }]], zi = [
	["path", { d: "M16.247 7.761a6 6 0 0 1 0 8.478" }],
	["path", { d: "M19.075 4.933a10 10 0 0 1 0 14.134" }],
	["path", { d: "M4.925 19.067a10 10 0 0 1 0-14.134" }],
	["path", { d: "M7.753 16.239a6 6 0 0 1 0-8.478" }],
	["circle", {
		cx: "12",
		cy: "12",
		r: "2"
	}]
], Bi = [
	["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }],
	["path", { d: "M21 3v5h-5" }],
	["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }],
	["path", { d: "M8 16H3v5" }]
], Vi = [
	["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }],
	["path", { d: "M3 3v5h5" }],
	["path", { d: "M12 7v5l4 2" }]
], Hi = [
	["path", { d: "M15 12h-5" }],
	["path", { d: "M15 8h-5" }],
	["path", { d: "M19 17V5a2 2 0 0 0-2-2H4" }],
	["path", { d: "M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3" }]
], Ui = [["path", { d: "m21 21-4.34-4.34" }], ["circle", {
	cx: "11",
	cy: "11",
	r: "8"
}]], Wi = [
	["rect", {
		width: "20",
		height: "8",
		x: "2",
		y: "2",
		rx: "2",
		ry: "2"
	}],
	["rect", {
		width: "20",
		height: "8",
		x: "2",
		y: "14",
		rx: "2",
		ry: "2"
	}],
	["line", {
		x1: "6",
		x2: "6.01",
		y1: "6",
		y2: "6"
	}],
	["line", {
		x1: "6",
		x2: "6.01",
		y1: "18",
		y2: "18"
	}]
], Gi = [["path", { d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" }], ["circle", {
	cx: "12",
	cy: "12",
	r: "3"
}]], Ki = [["path", { d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" }], ["path", { d: "m9 12 2 2 4-4" }]], qi = [
	["path", { d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" }],
	["path", { d: "M12 8v4" }],
	["path", { d: "M12 16h.01" }]
], Ji = [
	["path", { d: "m2 2 20 20" }],
	["path", { d: "M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71" }],
	["path", { d: "M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264" }]
], Yi = [
	["path", { d: "m4 4 2.5 2.5" }],
	["path", { d: "M13.5 6.5a4.95 4.95 0 0 0-7 7" }],
	["path", { d: "M15 5 5 15" }],
	["path", { d: "M14 17v.01" }],
	["path", { d: "M10 16v.01" }],
	["path", { d: "M13 13v.01" }],
	["path", { d: "M16 10v.01" }],
	["path", { d: "M11 20v.01" }],
	["path", { d: "M17 14v.01" }],
	["path", { d: "M20 11v.01" }]
], Xi = [["path", { d: "M21 4v16" }], ["path", { d: "M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z" }]], Zi = [["path", { d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z" }], ["path", { d: "M3 20V4" }]], Qi = [
	["path", { d: "M10 5H3" }],
	["path", { d: "M12 19H3" }],
	["path", { d: "M14 3v4" }],
	["path", { d: "M16 17v4" }],
	["path", { d: "M21 12h-9" }],
	["path", { d: "M21 19h-5" }],
	["path", { d: "M21 5h-7" }],
	["path", { d: "M8 10v4" }],
	["path", { d: "M8 12H3" }]
], $i = [
	["path", { d: "m10 20-1.25-2.5L6 18" }],
	["path", { d: "M10 4 8.75 6.5 6 6" }],
	["path", { d: "m14 20 1.25-2.5L18 18" }],
	["path", { d: "m14 4 1.25 2.5L18 6" }],
	["path", { d: "m17 21-3-6h-4" }],
	["path", { d: "m17 3-3 6 1.5 3" }],
	["path", { d: "M2 12h6.5L10 9" }],
	["path", { d: "m20 10-1.5 2 1.5 2" }],
	["path", { d: "M22 12h-6.5L14 15" }],
	["path", { d: "m4 10 1.5 2L4 14" }],
	["path", { d: "m7 21 3-6-1.5-3" }],
	["path", { d: "m7 3 3 6h4" }]
], ea = [
	["path", { d: "M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" }],
	["path", { d: "M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z" }],
	["path", { d: "M4 18v2" }],
	["path", { d: "M20 18v2" }],
	["path", { d: "M12 4v9" }]
], ta = [
	["rect", {
		width: "16",
		height: "20",
		x: "4",
		y: "2",
		rx: "2"
	}],
	["path", { d: "M12 6h.01" }],
	["circle", {
		cx: "12",
		cy: "14",
		r: "4"
	}],
	["path", { d: "M12 14h.01" }]
], na = [
	["path", { d: "M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3" }],
	["path", { d: "M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4" }],
	["path", { d: "M5 21h14" }]
], ra = [["rect", {
	width: "18",
	height: "18",
	x: "3",
	y: "3",
	rx: "2"
}]], ia = [["path", { d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" }]], aa = [
	["circle", {
		cx: "12",
		cy: "12",
		r: "4"
	}],
	["path", { d: "M12 2v2" }],
	["path", { d: "M12 20v2" }],
	["path", { d: "m4.93 4.93 1.41 1.41" }],
	["path", { d: "m17.66 17.66 1.41 1.41" }],
	["path", { d: "M2 12h2" }],
	["path", { d: "M20 12h2" }],
	["path", { d: "m6.34 17.66-1.41 1.41" }],
	["path", { d: "m19.07 4.93-1.41 1.41" }]
], oa = [
	["path", { d: "M12 2v2" }],
	["path", { d: "M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715" }],
	["path", { d: "M16 12a4 4 0 0 0-4-4" }],
	["path", { d: "m19 5-1.256 1.256" }],
	["path", { d: "M20 12h2" }]
], sa = [["rect", {
	width: "16",
	height: "20",
	x: "4",
	y: "2",
	rx: "2",
	ry: "2"
}], ["line", {
	x1: "12",
	x2: "12.01",
	y1: "18",
	y2: "18"
}]], ca = [
	["path", { d: "M12 20h-1a2 2 0 0 1-2-2 2 2 0 0 1-2 2H6" }],
	["path", { d: "M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7" }],
	["path", { d: "M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1" }],
	["path", { d: "M6 4h1a2 2 0 0 1 2 2 2 2 0 0 1 2-2h1" }],
	["path", { d: "M9 6v12" }]
], la = [["path", { d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" }]], ua = [
	["line", {
		x1: "10",
		x2: "14",
		y1: "2",
		y2: "2"
	}],
	["line", {
		x1: "12",
		x2: "15",
		y1: "14",
		y2: "11"
	}],
	["circle", {
		cx: "12",
		cy: "14",
		r: "8"
	}]
], da = [["circle", {
	cx: "9",
	cy: "12",
	r: "3"
}], ["rect", {
	width: "20",
	height: "14",
	x: "2",
	y: "5",
	rx: "7"
}]], fa = [["circle", {
	cx: "15",
	cy: "12",
	r: "3"
}], ["rect", {
	width: "20",
	height: "14",
	x: "2",
	y: "5",
	rx: "7"
}]], pa = [
	["path", { d: "M10 11v6" }],
	["path", { d: "M14 11v6" }],
	["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" }],
	["path", { d: "M3 6h18" }],
	["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }]
], ma = [["path", { d: "m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z" }], ["path", { d: "M12 22v-3" }]], ha = [["path", { d: "m17 2-5 5-5-5" }], ["rect", {
	width: "20",
	height: "15",
	x: "2",
	y: "7",
	rx: "2"
}]], ga = [
	["path", { d: "m19 5 3-3" }],
	["path", { d: "m2 22 3-3" }],
	["path", { d: "M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z" }],
	["path", { d: "M7.5 13.5 10 11" }],
	["path", { d: "M10.5 16.5 13 14" }],
	["path", { d: "m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z" }]
], _a = [
	["path", { d: "M12 3v12" }],
	["path", { d: "m17 8-5-5-5 5" }],
	["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }]
], va = [["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }], ["circle", {
	cx: "12",
	cy: "7",
	r: "4"
}]], ya = [
	["path", { d: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" }],
	["path", { d: "M7 2v20" }],
	["path", { d: "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" }]
], ba = [
	["path", { d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72" }],
	["path", { d: "m14 7 3 3" }],
	["path", { d: "M5 6v4" }],
	["path", { d: "M19 14v4" }],
	["path", { d: "M10 2v2" }],
	["path", { d: "M7 8H3" }],
	["path", { d: "M21 16h-4" }],
	["path", { d: "M11 3H9" }]
], xa = [
	["path", { d: "M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11" }],
	["path", { d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z" }],
	["path", { d: "M6 13h12" }],
	["path", { d: "M6 17h12" }]
], Sa = [
	["path", { d: "M3 6h3" }],
	["path", { d: "M17 6h.01" }],
	["rect", {
		width: "18",
		height: "20",
		x: "3",
		y: "2",
		rx: "2"
	}],
	["circle", {
		cx: "12",
		cy: "13",
		r: "5"
	}],
	["path", { d: "M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5" }]
], Ca = [
	["path", { d: "M2 12q2.5 2 5 0t5 0 5 0 5 0" }],
	["path", { d: "M2 19q2.5 2 5 0t5 0 5 0 5 0" }],
	["path", { d: "M2 5q2.5 2 5 0t5 0 5 0 5 0" }]
], wa = [
	["path", { d: "M12 20h.01" }],
	["path", { d: "M8.5 16.429a5 5 0 0 1 7 0" }],
	["path", { d: "M5 12.859a10 10 0 0 1 5.17-2.69" }],
	["path", { d: "M19 12.859a10 10 0 0 0-2.007-1.523" }],
	["path", { d: "M2 8.82a15 15 0 0 1 4.177-2.643" }],
	["path", { d: "M22 8.82a15 15 0 0 0-11.288-3.764" }],
	["path", { d: "m2 2 20 20" }]
], Ta = [
	["path", { d: "M12 20h.01" }],
	["path", { d: "M2 8.82a15 15 0 0 1 20 0" }],
	["path", { d: "M5 12.859a10 10 0 0 1 14 0" }],
	["path", { d: "M8.5 16.429a5 5 0 0 1 7 0" }]
], Ea = [
	["path", { d: "M12.8 19.6A2 2 0 1 0 14 16H2" }],
	["path", { d: "M17.5 8a2.5 2.5 0 1 1 2 4H2" }],
	["path", { d: "M9.8 4.4A2 2 0 1 1 11 8H2" }]
], Da = [["path", { d: "M18 6 6 18" }], ["path", { d: "m6 6 12 12" }]], Oa = [["path", { d: "M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z" }]], ka = {
	"mdi:lightbulb": hi,
	"mdi:lightbulb-outline": hi,
	"mdi:lightbulb-on": hi,
	"mdi:lightbulb-off": mi,
	"mdi:lightbulb-group": hi,
	"mdi:lightbulb-group-off-outline": mi,
	"mdi:toggle-switch": fa,
	"mdi:toggle-switch-off-outline": da,
	"mdi:power-plug": Fi,
	"mdi:power-plug-off": ga,
	"mdi:power": Ri,
	"mdi:flash": Oa,
	"mdi:lightning-bolt": Oa,
	"mdi:battery": ir,
	"mdi:battery-alert": ir,
	"mdi:sine-wave": Yn,
	"mdi:current-ac": Yn,
	"mdi:fan": Gr,
	"mdi:fan-off": Gr,
	"mdi:thermostat": la,
	"mdi:thermometer": la,
	"mdi:water-boiler": ni,
	"mdi:water-boiler-off": ni,
	"mdi:air-humidifier": Xn,
	"mdi:air-humidifier-off": Xn,
	"mdi:water-percent": Lr,
	"mdi:molecule-co2": Ea,
	"mdi:blur": Ea,
	"mdi:gauge": Qr,
	"mdi:fire": qr,
	"mdi:snowflake": $i,
	"mdi:window-shutter": or,
	"mdi:window-shutter-open": or,
	"mdi:blinds": or,
	"mdi:blinds-open": or,
	"mdi:curtains": or,
	"mdi:curtains-closed": or,
	"mdi:roller-shade": or,
	"mdi:roller-shade-closed": or,
	"mdi:garage": xa,
	"mdi:garage-open": xa,
	"mdi:door-open": Fr,
	"mdi:door-closed": Pr,
	"mdi:door": Pr,
	"mdi:gate": Kr,
	"mdi:gate-open": Kr,
	"mdi:window-open": Zn,
	"mdi:window-closed": Zn,
	"mdi:square-outline": Zn,
	"mdi:square": Zn,
	"mdi:valve-open": Rr,
	"mdi:valve-closed": Rr,
	"mdi:awning-outline": or,
	"mdi:lock": yi,
	"mdi:lock-open-variant": vi,
	"mdi:shield-lock": Ki,
	"mdi:shield-check": Ki,
	"mdi:shield-home": Ki,
	"mdi:shield-alert": qi,
	"mdi:shield-off": Ji,
	"mdi:home-lock": Ki,
	"mdi:cctv": mr,
	"mdi:cctv-off": fr,
	"mdi:motion-sensor": Xr,
	"mdi:motion-sensor-off": Xr,
	"mdi:smoke-detector": br,
	"mdi:smoke-detector-alert": xr,
	"mdi:bullhorn": Ci,
	"mdi:water-alert": Lr,
	"mdi:water-off": Lr,
	"mdi:water": Lr,
	"mdi:speaker": ta,
	"mdi:speaker-play": ta,
	"mdi:television": ha,
	"mdi:remote": zi,
	"mdi:remote-off": zi,
	"mdi:music": Br,
	"mdi:music-box-multiple": pi,
	"mdi:play": Pi,
	"mdi:pause": Mi,
	"mdi:stop": ra,
	"mdi:skip-previous": Zi,
	"mdi:skip-next": Xi,
	"mdi:play-circle": Sr,
	"mdi:palette": Ai,
	"mdi:script-text-play": Hi,
	"mdi:gesture-tap-button": Li,
	"mdi:gesture-tap": Li,
	"mdi:robot": cr,
	"mdi:robot-off": cr,
	"mdi:robot-vacuum": cr,
	"mdi:robot-mower": cr,
	"mdi:robot-mower-outline": cr,
	"mdi:weather-sunny": aa,
	"mdi:weather-night": Di,
	"mdi:weather-cloudy": jr,
	"mdi:weather-partly-cloudy": Ar,
	"mdi:weather-rainy": kr,
	"mdi:weather-pouring": kr,
	"mdi:weather-snowy": Or,
	"mdi:weather-snowy-rainy": Or,
	"mdi:weather-hail": Or,
	"mdi:weather-lightning": Er,
	"mdi:weather-lightning-rainy": Er,
	"mdi:weather-fog": Tr,
	"mdi:weather-windy": Ea,
	"mdi:weather-windy-variant": Ea,
	"mdi:weather-night-partly-cloudy": Dr,
	"mdi:brightness-5": aa,
	"mdi:white-balance-sunny": aa,
	"mdi:theme-light-dark": oa,
	"mdi:calendar": dr,
	"mdi:calendar-clock": ur,
	"mdi:clock-outline": wr,
	"mdi:timer-outline": ua,
	"mdi:timer-off-outline": ua,
	"mdi:counter": ti,
	"mdi:form-textbox": ca,
	"mdi:format-list-bulleted": _i,
	"mdi:format-list-checks": gi,
	"mdi:clipboard-list": Cr,
	"mdi:package-up": Oi,
	"mdi:package": ki,
	"mdi:map-marker": bi,
	"mdi:map-marker-off": bi,
	"mdi:account": va,
	"mdi:account-outline": va,
	"mdi:home-account": va,
	"mdi:image": ai,
	"mdi:eye": Wr,
	"mdi:checkbox-marked-circle": br,
	"mdi:checkbox-blank-circle-outline": br,
	"mdi:ray-vertex": Qi,
	"mdi:lan-connect": Ta,
	"mdi:lan-disconnect": wa,
	"mdi:information-outline": oi,
	"mdi:alert-circle-outline": xr,
	"mdi:sprinkler": Rr,
	"mdi:sprinkler-variant": Rr,
	"mdi:water-off-outline": Lr,
	"mdi:sprout": na,
	"mdi:leaf": fi,
	"mdi:home": ii,
	"mdi:home-variant": ii,
	"mdi:home-outline": ii,
	"mdi:home-plus-outline": ii,
	"mdi:home-floor-0": ci,
	"mdi:home-floor-1": ci,
	"mdi:home-floor-negative-1": ci,
	"mdi:sofa": ea,
	"mdi:bed": ar,
	"mdi:silverware-fork-knife": ya,
	"mdi:stove": Nr,
	"mdi:shower": Yi,
	"mdi:desk": si,
	"mdi:tree": ma,
	"mdi:stairs": ci,
	"mdi:washing-machine": Sa,
	"mdi:baby-carriage": nr,
	"mdi:dumbbell": zr,
	"mdi:flower": Jr,
	"mdi:server": Wi,
	"mdi:car": pr,
	"mdi:star": ia,
	"mdi:star-outline": ia,
	"mdi:gamepad-variant": Zr,
	"mdi:coffee": Mr,
	"mdi:pencil": Ni,
	"mdi:cog": Gi,
	"mdi:plus": Ii,
	"mdi:minus": Ti,
	"mdi:close": Da,
	"mdi:check": hr,
	"mdi:menu": wi,
	"mdi:magnify": Ui,
	"mdi:chevron-left": _r,
	"mdi:chevron-right": vr,
	"mdi:chevron-up": yr,
	"mdi:chevron-down": gr,
	"mdi:arrow-up": tr,
	"mdi:arrow-down": Qn,
	"mdi:arrow-left": $n,
	"mdi:arrow-right": er,
	"mdi:arrow-expand": Vr,
	"mdi:fullscreen": Si,
	"mdi:dock-left": ji,
	"mdi:open-in-new": Hr,
	"mdi:download": Ir,
	"mdi:upload": _a,
	"mdi:delete": pa,
	"mdi:eye-off": Ur,
	"mdi:folder-plus": Yr,
	"mdi:restore": Bi,
	"mdi:home-import-outline": ii,
	"mdi:view-dashboard": li,
	"mdi:view-dashboard-variant": li,
	"mdi:view-grid-plus-outline": ui,
	"mdi:view-quilt": di,
	"mdi:floor-plan": xi,
	"mdi:devices": Ei,
	"mdi:brush": lr,
	"mdi:book-open-page-variant": sr,
	"mdi:tablet": sa,
	"mdi:check-decagram": rr,
	"mdi:check-circle": br,
	"mdi:hand-wave": ei,
	"mdi:anvil": $r,
	"mdi:backup-restore": Vi,
	"mdi:wizard-hat": ba,
	"mdi:auto-fix": ba,
	"mdi:image-outline": ai,
	"mdi:hourglass": ri,
	"mdi:waves": Ca
};
function Aa(e) {
	return ka[e];
}
// node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
var ja = Symbol.for("pv"), Ma = 0;
Array.isArray;
function U(t, n, r, i, a, o) {
	n ||= {};
	var s, c, l = n;
	if ("ref" in l && typeof t != "function") for (c in l = {}, n) c == "ref" ? s = n[c] : l[c] = n[c];
	var u = {
		type: t,
		props: l,
		key: r,
		ref: s,
		__k: null,
		__: null,
		__b: 0,
		__e: null,
		__c: null,
		constructor: ja,
		__v: --Ma,
		__i: -1,
		__u: 0
	};
	return (a || o) && (u.__source = a, u.__self = o), e.vnode && e.vnode(u), u;
}
// src/components/ui.tsx
var Na = ve({
	line: !1,
	stroke: 2
});
function W({ icon: e, size: t = 24, class: n }) {
	let r = nt(Na), i = r.line ? Aa(e) : void 0;
	return i ? /* @__PURE__ */ U("svg", {
		class: `df-icon ${n ?? ""}`,
		width: t,
		height: t,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		"stroke-width": r.stroke,
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"aria-hidden": "true",
		children: i.map(([e, t]) => b(e, t))
	}) : /* @__PURE__ */ U("ha-icon", {
		icon: e,
		class: n,
		style: `--mdc-icon-size:${t}px;width:${t}px;height:${t}px`
	});
}
function G(e) {
	return /* @__PURE__ */ U("button", {
		type: "button",
		class: `icon-btn ${e.active ? "active" : ""} ${e.class ?? ""}`,
		title: e.label,
		"aria-label": e.label,
		disabled: e.disabled,
		onPointerDown: (e) => e.stopPropagation(),
		onClick: (t) => {
			t.stopPropagation(), e.onClick(t);
		},
		children: /* @__PURE__ */ U(W, {
			icon: e.icon,
			size: e.size ?? 22
		})
	});
}
function K(e) {
	return /* @__PURE__ */ U("button", {
		type: "button",
		class: `btn btn-${e.kind ?? "plain"} ${e.class ?? ""}`,
		disabled: e.disabled,
		onPointerDown: (e) => e.stopPropagation(),
		onClick: (t) => {
			t.stopPropagation(), e.onClick();
		},
		children: [e.icon && /* @__PURE__ */ U(W, {
			icon: e.icon,
			size: 18
		}), /* @__PURE__ */ U("span", { children: e.children })]
	});
}
function q({ checked: e, onChange: t, label: n }) {
	return /* @__PURE__ */ U("button", {
		type: "button",
		role: "switch",
		"aria-checked": e,
		"aria-label": n,
		class: `toggle ${e ? "on" : ""}`,
		onPointerDown: (e) => e.stopPropagation(),
		onClick: (n) => {
			n.stopPropagation(), t(!e);
		},
		children: /* @__PURE__ */ U("span", { class: "knob" })
	});
}
function J(e) {
	let t = e.min ?? 0, n = e.max ?? 100, r = e.step ?? 1, [i, a] = O(null), o = et(null), s = i ?? e.value, c = n === t ? 0 : (s - t) / (n - t) * 100, l = (i) => {
		let a = o.current.getBoundingClientRect(), s = e.vertical ? 1 - (i.clientY - a.top) / a.height : (i.clientX - a.left) / a.width, c = t + Math.min(1, Math.max(0, s)) * (n - t);
		return Math.round(c / r) * r;
	};
	return /* @__PURE__ */ U("div", {
		ref: o,
		class: `slider ${e.vertical ? "vertical" : ""} ${i === null ? "" : "dragging"} ${e.class ?? ""}`,
		role: "slider",
		tabIndex: 0,
		"aria-label": e.label,
		"aria-valuemin": t,
		"aria-valuemax": n,
		"aria-valuenow": s,
		style: e.color ? `--slider-color:${e.color}` : void 0,
		onPointerDown: (e) => {
			e.stopPropagation(), e.currentTarget.setPointerCapture(e.pointerId), a(l(e));
		},
		onPointerMove: (e) => {
			i !== null && (e.stopPropagation(), a(l(e)));
		},
		onPointerUp: (t) => {
			if (i === null) return;
			t.stopPropagation();
			let n = l(t);
			a(null), e.onCommit(n);
		},
		onPointerCancel: () => a(null),
		onClick: (e) => e.stopPropagation(),
		onKeyDown: (i) => {
			let a = ["ArrowUp", "ArrowRight"].includes(i.key) ? r : ["ArrowDown", "ArrowLeft"].includes(i.key) ? -r : 0;
			a && (i.preventDefault(), e.onCommit(Math.min(n, Math.max(t, e.value + a * (i.shiftKey ? 10 : 1)))));
		},
		children: [/* @__PURE__ */ U("div", {
			class: "slider-fill",
			style: e.vertical ? `height:${c}%` : `width:${c}%`
		}), e.format && /* @__PURE__ */ U("span", {
			class: "slider-label",
			children: e.format(s)
		})]
	});
}
function Y(e) {
	return k(() => {
		let t = (t) => t.key === "Escape" && e.onClose();
		return window.addEventListener("keydown", t), () => window.removeEventListener("keydown", t);
	}, [e.onClose]), /* @__PURE__ */ U("div", {
		class: "modal-backdrop",
		onClick: e.onClose,
		children: /* @__PURE__ */ U("div", {
			class: `modal ${e.wide ? "wide" : ""}`,
			role: "dialog",
			"aria-modal": "true",
			"aria-label": e.title,
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ U("div", {
					class: "modal-head",
					children: [/* @__PURE__ */ U("h2", { children: e.title }), /* @__PURE__ */ U(G, {
						icon: "mdi:close",
						label: "Close",
						onClick: e.onClose
					})]
				}),
				/* @__PURE__ */ U("div", {
					class: "modal-body",
					children: e.children
				}),
				e.footer && /* @__PURE__ */ U("div", {
					class: "modal-foot",
					children: e.footer
				})
			]
		})
	});
}
function Pa(e) {
	return /* @__PURE__ */ U("div", {
		class: "segmented",
		role: "radiogroup",
		children: e.options.map((t) => /* @__PURE__ */ U("button", {
			type: "button",
			role: "radio",
			"aria-checked": t.value === e.value,
			class: t.value === e.value ? "selected" : "",
			onClick: (n) => {
				n.stopPropagation(), e.onChange(t.value);
			},
			children: [t.icon && /* @__PURE__ */ U(W, {
				icon: t.icon,
				size: 18
			}), t.label]
		}))
	});
}
function X(e) {
	return /* @__PURE__ */ U("label", {
		class: "field",
		children: [
			/* @__PURE__ */ U("span", {
				class: "field-label",
				children: e.label
			}),
			e.children,
			e.hint && /* @__PURE__ */ U("span", {
				class: "field-hint",
				children: e.hint
			})
		]
	});
}
function Z(e) {
	return /* @__PURE__ */ U("input", {
		class: "input",
		type: e.type ?? "text",
		value: e.value,
		placeholder: e.placeholder,
		onInput: (t) => e.onInput(t.target.value)
	});
}
function Q(e) {
	return /* @__PURE__ */ U("div", {
		class: "row",
		children: [/* @__PURE__ */ U("div", {
			class: "row-text",
			children: [/* @__PURE__ */ U("div", {
				class: "row-label",
				children: e.label
			}), e.hint && /* @__PURE__ */ U("div", {
				class: "row-hint",
				children: e.hint
			})]
		}), /* @__PURE__ */ U("div", {
			class: "row-control",
			children: e.children
		})]
	});
}
function Fa({ checked: e, onChange: t }) {
	return /* @__PURE__ */ U("button", {
		type: "button",
		role: "checkbox",
		"aria-checked": e,
		class: `checkbox ${e ? "on" : ""}`,
		onPointerDown: (e) => e.stopPropagation(),
		onClick: (n) => {
			n.stopPropagation(), t(!e);
		},
		children: e && /* @__PURE__ */ U(W, {
			icon: "mdi:check",
			size: 16
		})
	});
}
var Ia = [
	"mdi:sofa",
	"mdi:bed",
	"mdi:silverware-fork-knife",
	"mdi:stove",
	"mdi:shower",
	"mdi:desk",
	"mdi:garage",
	"mdi:tree",
	"mdi:stairs",
	"mdi:television",
	"mdi:washing-machine",
	"mdi:baby-carriage",
	"mdi:dumbbell",
	"mdi:home",
	"mdi:door",
	"mdi:lightbulb-group",
	"mdi:flower",
	"mdi:server",
	"mdi:car",
	"mdi:star",
	"mdi:shield-home",
	"mdi:music",
	"mdi:gamepad-variant",
	"mdi:coffee"
];
function La({ value: e, onChange: t }) {
	return /* @__PURE__ */ U("div", {
		class: "icon-picker",
		children: [/* @__PURE__ */ U("div", {
			class: "icon-grid",
			children: Ia.map((n) => /* @__PURE__ */ U("button", {
				type: "button",
				class: `icon-choice ${e === n ? "selected" : ""}`,
				"aria-label": n,
				onClick: (e) => {
					e.stopPropagation(), t(n);
				},
				children: /* @__PURE__ */ U(W, {
					icon: n,
					size: 22
				})
			}))
		}), /* @__PURE__ */ U(Z, {
			value: e,
			onInput: t,
			placeholder: "mdi:icon-name"
		})]
	});
}
function Ra(e, t, n = 500) {
	let r = et(void 0), i = et(!1), a = et(null);
	return {
		onPointerDown: (t) => {
			i.current = !1, a.current = {
				x: t.clientX,
				y: t.clientY
			}, r.current = window.setTimeout(() => {
				i.current = !0, e();
			}, n);
		},
		onPointerMove: (e) => {
			a.current && (Math.abs(e.clientX - a.current.x) > 8 || Math.abs(e.clientY - a.current.y) > 8) && (clearTimeout(r.current), a.current = null);
		},
		onPointerUp: () => {
			clearTimeout(r.current);
			let e = a.current && !i.current;
			a.current = null, e && t();
		},
		onPointerLeave: () => {
			clearTimeout(r.current), a.current = null;
		},
		onContextMenu: (e) => e.preventDefault()
	};
}
// src/components/edit.tsx
var za = M(null), Ba = M(null), Va = M(null), Ha = M(null);
function Ua(e, t) {
	let n = e.entities?.[t], r = n?.area_id ?? (n?.device_id ? e.devices?.[n.device_id]?.area_id : null);
	return r ? e.areas?.[r]?.name ?? "Other" : "No area";
}
function Wa(e) {
	let t = L.value, [n, r] = O(""), [i, a] = O("all"), o = tt(() => Object.keys(t.states).filter((n) => fn(t, n) && (!e.domains || e.domains.includes(N(n)))).sort((e, n) => F(t, e).localeCompare(F(t, n))), [Object.keys(t.states).length]), s = tt(() => [...new Set(o.map(N))].sort(), [o]), c = n.trim().toLowerCase(), l = o.filter((e) => (i === "all" || N(e) === i) && (!c || e.toLowerCase().includes(c) || F(t, e).toLowerCase().includes(c) || Ua(t, e).toLowerCase().includes(c))), u = /* @__PURE__ */ new Map();
	for (let e of l.slice(0, 400)) {
		let n = Ua(t, e);
		u.set(n, [...u.get(n) ?? [], e]);
	}
	return /* @__PURE__ */ U("div", {
		class: "entity-search",
		children: [
			/* @__PURE__ */ U("div", {
				class: "search-bar",
				children: [/* @__PURE__ */ U(W, {
					icon: "mdi:magnify",
					size: 20
				}), /* @__PURE__ */ U("input", {
					class: "input bare",
					value: n,
					placeholder: "Search by name, room or entity ID",
					autoFocus: e.autofocus,
					onInput: (e) => r(e.target.value)
				})]
			}),
			!e.domains && /* @__PURE__ */ U("div", {
				class: "chips scroll",
				children: [/* @__PURE__ */ U("button", {
					type: "button",
					class: `chip ${i === "all" ? "selected" : ""}`,
					onClick: () => a("all"),
					children: "All"
				}), s.map((e) => /* @__PURE__ */ U("button", {
					type: "button",
					class: `chip ${i === e ? "selected" : ""}`,
					onClick: () => a(e),
					children: xn[e] ?? e
				}))]
			}),
			/* @__PURE__ */ U("div", {
				class: "entity-list",
				children: [
					[...u.entries()].sort(([e], [t]) => e.localeCompare(t)).map(([t, n]) => /* @__PURE__ */ U("div", {
						class: "entity-group",
						children: [/* @__PURE__ */ U("div", {
							class: "labeled-label",
							children: t
						}), n.map((t) => /* @__PURE__ */ U(Ga, {
							id: t,
							selected: e.isSelected(t),
							onToggle: () => e.onToggle(t)
						}))]
					})),
					l.length === 0 && /* @__PURE__ */ U("p", {
						class: "muted",
						children: "No matching devices."
					}),
					l.length > 400 && /* @__PURE__ */ U("p", {
						class: "muted small",
						children: "Showing the first 400. Search to narrow it down."
					})
				]
			})
		]
	});
}
function Ga({ id: e, selected: t, onToggle: n, room: r }) {
	let i = L.value;
	return /* @__PURE__ */ U("button", {
		type: "button",
		class: `entity-row ${t ? "selected" : ""}`,
		onClick: n,
		"aria-pressed": t,
		children: [
			/* @__PURE__ */ U(W, {
				icon: cn(i, e),
				size: 22
			}),
			/* @__PURE__ */ U("span", {
				class: "entity-row-text",
				children: [/* @__PURE__ */ U("span", { children: F(i, e, void 0, r) }), /* @__PURE__ */ U("span", {
					class: "muted small",
					children: [
						I(i, i.states[e]),
						" · ",
						e
					]
				})]
			}),
			/* @__PURE__ */ U("span", {
				class: `checkbox ${t ? "on" : ""}`,
				children: t && /* @__PURE__ */ U(W, {
					icon: "mdi:check",
					size: 16
				})
			})
		]
	});
}
function Ka() {
	let e = z.value;
	if (!e) return null;
	let t = B.value, n = t?.type === "section" ? e.sections.find((e) => e.id === t.id) : e.sections[0], r = n?.cards.filter((e) => e.hidden).length ?? 0;
	return /* @__PURE__ */ U("div", {
		class: "edit-bar",
		role: "toolbar",
		"aria-label": "Edit dashboard",
		children: [/* @__PURE__ */ U("div", {
			class: "edit-bar-group",
			children: [n && /* @__PURE__ */ U(S, { children: [
				/* @__PURE__ */ U(K, {
					icon: "mdi:plus",
					onClick: () => za.value = n.id,
					children: "Add device"
				}),
				/* @__PURE__ */ U(K, {
					icon: "mdi:pencil",
					onClick: () => Va.value = n.id,
					children: ["Edit ", n.kind === "room" ? "room" : "page"]
				}),
				r > 0 && /* @__PURE__ */ U(K, {
					icon: "mdi:eye-off",
					onClick: () => Ha.value = n.id,
					children: [
						"Hidden (",
						r,
						")"
					]
				})
			] }), /* @__PURE__ */ U(K, {
				icon: "mdi:folder-plus",
				onClick: () => Va.value = "new",
				children: "New room or page"
			})]
		}), /* @__PURE__ */ U("div", {
			class: "edit-bar-group",
			children: [/* @__PURE__ */ U(K, {
				kind: "ghost",
				onClick: Gn,
				children: "Cancel"
			}), /* @__PURE__ */ U(K, {
				kind: "primary",
				icon: "mdi:check",
				onClick: Wn,
				children: "Done"
			})]
		})]
	});
}
function qa() {
	let e = za.value, t = z.value?.sections.find((t) => t.id === e);
	return t ? /* @__PURE__ */ U(Y, {
		title: `Add to ${t.name}`,
		onClose: () => za.value = null,
		wide: !0,
		footer: /* @__PURE__ */ U(K, {
			kind: "primary",
			onClick: () => za.value = null,
			children: "Done"
		}),
		children: /* @__PURE__ */ U(Wa, {
			isSelected: (e) => t.cards.some((t) => t.entity === e && !t.hidden),
			onToggle: (e) => Un((n) => {
				let r = n.sections.find((e) => e.id === t.id), i = r.cards.find((t) => t.entity === e);
				i ? i.hidden ? i.hidden = !1 : r.cards = r.cards.filter((t) => t.entity !== e) : r.cards.push(Ae(e, bn(e)));
			}),
			autofocus: !0
		})
	}) : null;
}
var Ja = [
	{
		value: "sm",
		label: "Small"
	},
	{
		value: "md",
		label: "Medium"
	},
	{
		value: "lg",
		label: "Large"
	},
	{
		value: "wide",
		label: "Wide"
	}
];
function Ya() {
	let e = Ba.value, t = z.value, n = L.value, r = t?.sections.find((t) => t.id === e?.sectionId), i = r?.cards.find((t) => t.id === e?.cardId);
	if (!e || !r || !i || !n) return null;
	let a = (e) => Un((t) => {
		let n = t.sections.find((e) => e.id === r.id)?.cards.find((e) => e.id === i.id);
		n && e(n);
	}), o = () => Ba.value = null;
	return /* @__PURE__ */ U(Y, {
		title: "Edit card",
		onClose: o,
		footer: /* @__PURE__ */ U(S, { children: [/* @__PURE__ */ U(K, {
			kind: "danger",
			icon: "mdi:delete",
			onClick: () => {
				Un((e) => {
					let t = e.sections.find((e) => e.id === r.id);
					t.cards = t.cards.filter((e) => e.id !== i.id);
				}), o();
			},
			children: "Remove"
		}), /* @__PURE__ */ U(K, {
			kind: "primary",
			onClick: o,
			children: "Done"
		})] }),
		children: [
			/* @__PURE__ */ U("p", {
				class: "muted small",
				children: i.entity
			}),
			/* @__PURE__ */ U(X, {
				label: "Name",
				hint: "Leave empty to use the name from Home Assistant.",
				children: /* @__PURE__ */ U(Z, {
					value: i.name ?? "",
					placeholder: F(n, i.entity, void 0, r.name),
					onInput: (e) => a((t) => t.name = e || void 0)
				})
			}),
			/* @__PURE__ */ U(X, {
				label: "Size",
				children: /* @__PURE__ */ U(Pa, {
					value: i.size,
					options: Ja,
					onChange: (e) => a((t) => t.size = e)
				})
			}),
			/* @__PURE__ */ U(X, {
				label: "Icon",
				hint: "Leave empty to use the default icon.",
				children: /* @__PURE__ */ U(La, {
					value: i.icon ?? "",
					onChange: (e) => a((t) => t.icon = e || void 0)
				})
			}),
			/* @__PURE__ */ U(X, {
				label: "Colour",
				hint: "Used when the device is on. Automatic picks a colour for the kind of device.",
				children: /* @__PURE__ */ U("div", {
					class: "swatches",
					children: [
						/* @__PURE__ */ U("button", {
							type: "button",
							class: `swatch auto-swatch ${i.color ? "" : "selected"}`,
							"aria-label": "Automatic",
							onClick: () => a((e) => e.color = void 0),
							children: /* @__PURE__ */ U(W, {
								icon: "mdi:auto-fix",
								size: 18
							})
						}),
						[
							...Te,
							"#f43f5e",
							"#06b6d4",
							"#a855f7",
							"#fbbf24"
						].map((e) => /* @__PURE__ */ U("button", {
							type: "button",
							class: `swatch ${i.color === e ? "selected" : ""}`,
							"aria-label": e,
							style: `background:${e}`,
							onClick: () => a((t) => t.color = e)
						})),
						/* @__PURE__ */ U("input", {
							type: "color",
							class: "swatch color-input",
							"aria-label": "Custom colour",
							value: i.color ?? "#6366f1",
							onInput: (e) => a((t) => t.color = e.target.value)
						})
					]
				})
			}),
			/* @__PURE__ */ U(X, {
				label: "When tapped",
				children: /* @__PURE__ */ U("select", {
					class: "input",
					value: i.tap ?? "auto",
					onChange: (e) => a((t) => t.tap = e.target.value ?? "auto"),
					children: [
						/* @__PURE__ */ U("option", {
							value: "auto",
							children: "Do the usual thing (toggle, run, play…)"
						}),
						/* @__PURE__ */ U("option", {
							value: "toggle",
							children: "Toggle on and off"
						}),
						/* @__PURE__ */ U("option", {
							value: "details",
							children: "Open DashForge controls"
						}),
						/* @__PURE__ */ U("option", {
							value: "more-info",
							children: "Open Home Assistant details"
						}),
						/* @__PURE__ */ U("option", {
							value: "none",
							children: "Do nothing"
						})
					]
				})
			}),
			/* @__PURE__ */ U(Q, {
				label: "Show on Home",
				hint: "Pin this card to the Favourites on the Home screen",
				children: /* @__PURE__ */ U(q, {
					checked: !!i.favorite,
					onChange: (e) => a((t) => t.favorite = e || void 0)
				})
			}),
			i.entity.startsWith("camera.") && /* @__PURE__ */ U(Q, {
				label: "Live video",
				hint: "Stream the camera instead of refreshing a picture every 10 seconds",
				children: /* @__PURE__ */ U(q, {
					checked: !!i.live,
					onChange: (e) => a((t) => t.live = e || void 0)
				})
			}),
			/* @__PURE__ */ U(X, {
				label: "Move to",
				children: /* @__PURE__ */ U("select", {
					class: "input",
					value: r.id,
					onChange: (e) => {
						let t = e.target.value;
						t !== r.id && (Un((e) => {
							let n = e.sections.find((e) => e.id === r.id), a = e.sections.find((e) => e.id === t), o = n.cards.find((e) => e.id === i.id);
							n.cards = n.cards.filter((e) => e.id !== i.id), a.cards.push(o);
						}), o());
					},
					children: t.sections.map((e) => /* @__PURE__ */ U("option", {
						value: e.id,
						children: e.name
					}))
				})
			})
		]
	});
}
function Xa() {
	let e = Ha.value, t = z.value?.sections.find((t) => t.id === e), n = L.value;
	if (!t || !n) return null;
	let r = t.cards.filter((e) => e.hidden);
	return /* @__PURE__ */ U(Y, {
		title: "Hidden cards",
		onClose: () => Ha.value = null,
		children: [r.length === 0 && /* @__PURE__ */ U("p", {
			class: "muted",
			children: "No hidden cards."
		}), r.map((e) => /* @__PURE__ */ U("div", {
			class: "row",
			children: [
				/* @__PURE__ */ U(W, { icon: cn(n, e.entity, e) }),
				/* @__PURE__ */ U("div", {
					class: "row-text",
					children: /* @__PURE__ */ U("div", {
						class: "row-label",
						children: F(n, e.entity, e, t.name)
					})
				}),
				/* @__PURE__ */ U(K, {
					icon: "mdi:eye",
					onClick: () => Un((n) => {
						let r = n.sections.find((e) => e.id === t.id)?.cards.find((t) => t.id === e.id);
						r && (r.hidden = !1);
					}),
					children: "Show"
				})
			]
		}))]
	});
}
function Za() {
	let e = Va.value;
	return !e || !z.value || !L.value ? null : /* @__PURE__ */ U(Qa, { ref_: e }, e);
}
function Qa({ ref_: e }) {
	let t = z.value, n = L.value, [r, i] = O(null), a = e === "new" ? null : t.sections.find((t) => t.id === e), o = r ?? (a ? {
		name: a.name,
		icon: a.icon,
		kind: a.kind,
		areaId: a.areaId,
		floorId: a.floorId,
		background: a.background
	} : {
		name: "",
		icon: "mdi:home",
		kind: "room"
	}), s = () => {
		i(null), Va.value = null;
	}, c = a ? t.sections.indexOf(a) : -1, l = () => {
		o.name.trim() && (Un((e) => {
			if (a) {
				let t = e.sections.find((e) => e.id === a.id);
				Object.assign(t, {
					name: o.name.trim(),
					icon: o.icon,
					kind: o.kind,
					areaId: o.areaId,
					floorId: o.floorId,
					background: o.background || void 0
				});
			} else {
				let t = je(o.kind, o.name.trim(), o.icon, o.areaId);
				t.floorId = o.floorId, t.background = o.background || void 0, e.sections.push(t), B.value = {
					type: "section",
					id: t.id
				};
			}
		}), s());
	}, u = (e) => Un((t) => {
		let n = t.sections.findIndex((e) => e.id === a.id), r = n + e;
		r < 0 || r >= t.sections.length || ([t.sections[n], t.sections[r]] = [t.sections[r], t.sections[n]]);
	});
	return /* @__PURE__ */ U(Y, {
		title: a ? `Edit ${a.name}` : "New room or page",
		onClose: s,
		footer: /* @__PURE__ */ U(S, { children: [a && /* @__PURE__ */ U(K, {
			kind: "danger",
			icon: "mdi:delete",
			onClick: () => {
				confirm(`Delete ${a.name} and its cards from the dashboard? Nothing is deleted from Home Assistant.`) && (Un((e) => e.sections = e.sections.filter((e) => e.id !== a.id)), s());
			},
			children: "Delete"
		}), /* @__PURE__ */ U(K, {
			kind: "primary",
			onClick: l,
			disabled: !o.name.trim(),
			children: a ? "Save" : "Create"
		})] }),
		children: [
			/* @__PURE__ */ U(X, {
				label: "Type",
				children: /* @__PURE__ */ U(Pa, {
					value: o.kind,
					options: [{
						value: "room",
						label: "Room",
						icon: "mdi:sofa"
					}, {
						value: "page",
						label: "Custom page",
						icon: "mdi:view-dashboard"
					}],
					onChange: (e) => i({
						...o,
						kind: e
					})
				})
			}),
			/* @__PURE__ */ U(X, {
				label: "Name",
				children: /* @__PURE__ */ U(Z, {
					value: o.name,
					onInput: (e) => i({
						...o,
						name: e
					}),
					placeholder: o.kind === "room" ? "Living room" : "Garden"
				})
			}),
			o.kind === "room" && Object.keys(n.areas ?? {}).length > 0 && /* @__PURE__ */ U(X, {
				label: "Linked Home Assistant area",
				hint: "Used to suggest devices. Optional.",
				children: /* @__PURE__ */ U("select", {
					class: "input",
					value: o.areaId ?? "",
					onChange: (e) => i({
						...o,
						areaId: e.target.value || void 0
					}),
					children: [/* @__PURE__ */ U("option", {
						value: "",
						children: "None"
					}), Object.values(n.areas ?? {}).map((e) => /* @__PURE__ */ U("option", {
						value: e.area_id,
						children: e.name
					}))]
				})
			}),
			o.kind === "room" && Object.keys(n.floors ?? {}).length > 0 && /* @__PURE__ */ U(X, {
				label: "Floor",
				hint: "Rooms are grouped by floor on the Home screen and in the room list.",
				children: /* @__PURE__ */ U("select", {
					class: "input",
					value: o.floorId ?? "",
					onChange: (e) => i({
						...o,
						floorId: e.target.value || void 0
					}),
					children: [/* @__PURE__ */ U("option", {
						value: "",
						children: o.areaId && n.areas?.[o.areaId]?.floor_id ? `Same as the area (${n.floors?.[n.areas[o.areaId].floor_id]?.name})` : "No floor"
					}), Object.values(n.floors ?? {}).sort((e, t) => (e.level ?? 0) - (t.level ?? 0)).map((e) => /* @__PURE__ */ U("option", {
						value: e.floor_id,
						children: e.name
					}))]
				})
			}),
			/* @__PURE__ */ U(X, {
				label: "Icon",
				children: /* @__PURE__ */ U(La, {
					value: o.icon,
					onChange: (e) => i({
						...o,
						icon: e
					})
				})
			}),
			/* @__PURE__ */ U(X, {
				label: "Wallpaper",
				hint: "Optional picture behind this room, e.g. /local/living-room.jpg from your config/www folder.",
				children: /* @__PURE__ */ U(Z, {
					value: o.background ?? "",
					onInput: (e) => i({
						...o,
						background: e
					}),
					placeholder: "/local/room.jpg"
				})
			}),
			a && t.sections.length > 1 && /* @__PURE__ */ U(X, {
				label: "Order",
				children: /* @__PURE__ */ U("div", {
					class: "btn-row",
					children: [/* @__PURE__ */ U(K, {
						icon: "mdi:arrow-left",
						disabled: c === 0,
						onClick: () => u(-1),
						children: "Move earlier"
					}), /* @__PURE__ */ U(K, {
						icon: "mdi:arrow-right",
						disabled: c === t.sections.length - 1,
						onClick: () => u(1),
						children: "Move later"
					})]
				})
			})
		]
	});
}
// src/components/charts.tsx
function $a(e, t, n = 24, r = 5) {
	let [i, a] = O(null);
	return k(() => {
		let i = !0, o = () => {
			let r = /* @__PURE__ */ new Date(), o = /* @__PURE__ */ new Date(r.getTime() - n * 3600 * 1e3);
			e.callWS({
				type: "history/history_during_period",
				start_time: o.toISOString(),
				end_time: r.toISOString(),
				entity_ids: [t],
				minimal_response: !0,
				no_attributes: !0
			}).then((e) => {
				i && a((e[t] ?? []).map((e) => ({
					t: e.lu * 1e3,
					v: Number(e.s)
				})).filter((e) => !Number.isNaN(e.v)));
			}).catch(() => i && a([]));
		};
		o();
		let s = window.setInterval(o, r * 6e4);
		return () => {
			i = !1, clearInterval(s);
		};
	}, [t, n]), i;
}
function eo(e) {
	let t = e.height ?? 120, n = [...e.points], r = Date.now();
	if (e.now != null && !Number.isNaN(e.now) && n.push({
		t: r,
		v: e.now
	}), n.length < 2) return null;
	let i = n[0].t, a = n.map((e) => e.v), o = Math.min(...a), s = Math.max(...a);
	s === o && (s += 1, --o);
	let c = (s - o) * .1;
	o -= c, s += c;
	let l = (e) => (e - i) / (r - i || 1) * 320, u = (e) => t - (e - o) / (s - o) * t, d = `M${l(n[0].t).toFixed(1)},${u(n[0].v).toFixed(1)}`;
	for (let e = 1; e < n.length; e++) d += ` H${l(n[e].t).toFixed(1)} V${u(n[e].v).toFixed(1)}`;
	d += " H320";
	let f = n[n.length - 1];
	return /* @__PURE__ */ U("svg", {
		viewBox: `0 0 320 ${t}`,
		preserveAspectRatio: "none",
		class: `line-chart ${e.class ?? ""}`,
		role: "img",
		"aria-label": e.label ?? "History",
		children: [
			/* @__PURE__ */ U("defs", { children: /* @__PURE__ */ U("linearGradient", {
				id: "lc-fill",
				x1: "0",
				y1: "0",
				x2: "0",
				y2: "1",
				children: [/* @__PURE__ */ U("stop", {
					offset: "0",
					"stop-color": "var(--chart, var(--accent))",
					"stop-opacity": "0.35"
				}), /* @__PURE__ */ U("stop", {
					offset: "1",
					"stop-color": "var(--chart, var(--accent))",
					"stop-opacity": "0"
				})]
			}) }),
			/* @__PURE__ */ U("path", {
				d: `${d} V${t} H${l(n[0].t).toFixed(1)} Z`,
				fill: "url(#lc-fill)"
			}),
			/* @__PURE__ */ U("path", {
				d,
				class: "chart-line"
			}),
			e.showDot && /* @__PURE__ */ U("circle", {
				cx: 318,
				cy: u(f.v),
				r: "4",
				class: "chart-dot"
			})
		]
	});
}
// src/components/cards.tsx
var to = M(null), no = M(null), ro = M(null);
function io(e) {
	if (!e) return;
	let t = N(e.entity_id);
	if (t === "light" && e.state === "on") {
		let t = e.attributes.rgb_color;
		return Array.isArray(t) ? `rgb(${t[0]},${t[1]},${t[2]})` : "#fbbf24";
	}
	if (t === "climate") {
		let t = e.attributes.hvac_action ?? e.state;
		if (t === "heating" || t === "heat") return "#f97316";
		if (t === "cooling" || t === "cool") return "#38bdf8";
	}
	if (t === "lock" && e.state !== "locked") return "#ef4444";
	if (t === "binary_sensor" && e.state === "on") {
		let t = e.attributes.device_class;
		if ([
			"smoke",
			"moisture",
			"gas",
			"problem",
			"safety"
		].includes(t)) return "#ef4444";
	}
}
function ao(e, t, n, r) {
	let i = e.states[t], a = n?.tap ?? "auto";
	if (a === "none") return;
	if (a === "details") {
		to.value = {
			entity: t,
			card: n,
			room: r
		};
		return;
	}
	if (a === "more-info") {
		Kn(t);
		return;
	}
	let o = a === "toggle" ? "toggle" : Xt(t, i);
	if (P(i) && o !== "details") {
		V(`${F(e, t, n)} is unavailable`, "error");
		return;
	}
	let s = N(t);
	switch (o) {
		case "toggle":
			s === "cover" || s === "valve" ? H(s, i.state === "open" || i.state === "opening" ? `close_${s}` : `open_${s}`, { entity_id: t }) : s === "lock" ? i.state === "locked" ? no.value = t : H("lock", "lock", { entity_id: t }) : e.services[s]?.toggle ? H(s, "toggle", { entity_id: t }) : H("homeassistant", "toggle", { entity_id: t });
			return;
		case "weather":
		case "calendar":
		case "todo":
			ro.value = {
				kind: o,
				entity: t
			};
			return;
		case "activate":
			H(s, "turn_on", { entity_id: t }), V(`${F(e, t, n)} activated`);
			return;
		case "press":
			H(s, "press", { entity_id: t });
			return;
		case "lock":
			i.state === "locked" ? no.value = t : H("lock", "lock", { entity_id: t });
			return;
		case "media":
			H("media_player", "media_play_pause", { entity_id: t });
			return;
		default: to.value = {
			entity: t,
			card: n,
			room: r
		};
	}
}
function oo(e) {
	let t = L.value, { card: n } = e, r = t.states[n.entity], i = Yt(r), a = en(n.entity, r), o = n.color ?? io(r), s = n.color ?? Qt[a], c = n.color ? `linear-gradient(135deg,${n.color} 0%,color-mix(in srgb,${n.color} 60%,#000) 100%)` : $t[a], l = F(t, n.entity, n, e.room), u = N(n.entity), d = Ra(() => !e.editing && (to.value = {
		entity: n.entity,
		card: n,
		room: e.room
	}), () => e.editing ? e.onEdit?.() : ao(t, n.entity, n, e.room));
	return /* @__PURE__ */ U("div", {
		class: [
			"tile",
			`size-${n.size}`,
			`d-${u}`,
			`cat-${a}`,
			n.color ? "custom-color" : "",
			i ? "active" : "",
			P(r) ? "unavailable" : "",
			e.editing ? "editing" : "",
			e.dragging ? "dragging" : ""
		].join(" "),
		"data-index": e.index,
		style: `--cat:${s};--grad:${c};${o ? `--tile-active:${o};` : ""}`,
		role: "button",
		tabIndex: 0,
		"aria-label": `${l}, ${I(t, r)}`,
		onKeyDown: (r) => {
			(r.key === "Enter" || r.key === " ") && (r.preventDefault(), e.editing ? e.onEdit?.() : ao(t, n.entity, n, e.room));
		},
		...d,
		children: [e.editing && /* @__PURE__ */ U(S, { children: [/* @__PURE__ */ U("button", {
			type: "button",
			class: "badge badge-remove",
			"aria-label": `Hide ${l}`,
			onPointerDown: (e) => e.stopPropagation(),
			onClick: (t) => {
				t.stopPropagation(), e.onRemove?.();
			},
			children: /* @__PURE__ */ U(W, {
				icon: "mdi:minus",
				size: 16
			})
		}), /* @__PURE__ */ U("button", {
			type: "button",
			class: "badge badge-resize",
			"aria-label": `Resize ${l}`,
			onPointerDown: (e) => e.stopPropagation(),
			onClick: (t) => {
				t.stopPropagation(), e.onResize?.();
			},
			children: /* @__PURE__ */ U(W, {
				icon: "mdi:arrow-expand",
				size: 14
			})
		})] }), n.size !== "sm" && !e.editing ? /* @__PURE__ */ U(lo, {
			h: t,
			card: n,
			s: r,
			name: l
		}) : /* @__PURE__ */ U(co, {
			h: t,
			card: n,
			s: r,
			name: l
		})]
	});
}
function so({ h: e, card: t, s: n, name: r }) {
	return /* @__PURE__ */ U(S, { children: [/* @__PURE__ */ U("div", {
		class: "tile-icon",
		children: /* @__PURE__ */ U(W, {
			icon: cn(e, t.entity, t),
			size: t.size === "sm" ? 24 : 26
		})
	}), /* @__PURE__ */ U("div", {
		class: "tile-text",
		children: [/* @__PURE__ */ U("div", {
			class: "tile-name",
			children: r
		}), /* @__PURE__ */ U("div", {
			class: "tile-state",
			children: I(e, n)
		})]
	})] });
}
function co(e) {
	return N(e.card.entity) === "sensor" && e.s && !P(e.s) && !Number.isNaN(Number(e.s.state)) ? /* @__PURE__ */ U(S, { children: [/* @__PURE__ */ U("div", {
		class: "tile-icon",
		children: /* @__PURE__ */ U(W, {
			icon: cn(e.h, e.card.entity, e.card),
			size: 24
		})
	}), /* @__PURE__ */ U("div", {
		class: "tile-text",
		children: [/* @__PURE__ */ U("div", {
			class: "tile-value",
			children: I(e.h, e.s)
		}), /* @__PURE__ */ U("div", {
			class: "tile-name",
			children: e.name
		})]
	})] }) : /* @__PURE__ */ U(so, { ...e });
}
function lo(e) {
	switch (N(e.card.entity)) {
		case "light": return /* @__PURE__ */ U(uo, { ...e });
		case "fan": return /* @__PURE__ */ U(fo, { ...e });
		case "cover": return /* @__PURE__ */ U(po, { ...e });
		case "climate": return /* @__PURE__ */ U(go, { ...e });
		case "media_player": return /* @__PURE__ */ U(vo, { ...e });
		case "camera": return /* @__PURE__ */ U(bo, { ...e });
		case "sensor": return /* @__PURE__ */ U(xo, { ...e });
		case "water_heater": return /* @__PURE__ */ U(So, { ...e });
		case "weather": return /* @__PURE__ */ U(Co, { ...e });
		default: return /* @__PURE__ */ U("div", {
			class: "big-body",
			children: /* @__PURE__ */ U(so, { ...e })
		});
	}
}
function uo(e) {
	let t = e.s, n = t?.state === "on" && t?.attributes.brightness != null ? Math.round(t.attributes.brightness / 255 * 100) : 0, r = (t?.attributes.supported_color_modes ?? []).some((e) => e !== "onoff");
	return /* @__PURE__ */ U("div", {
		class: "big-body",
		children: [/* @__PURE__ */ U("div", {
			class: "big-top",
			children: /* @__PURE__ */ U(so, { ...e })
		}), r && !P(t) && /* @__PURE__ */ U(J, {
			value: n,
			min: 1,
			max: 100,
			label: `${e.name} brightness`,
			color: io(t),
			format: (e) => `${e}%`,
			onCommit: (t) => H("light", "turn_on", {
				entity_id: e.card.entity,
				brightness_pct: t
			})
		})]
	});
}
function fo(e) {
	let t = e.s, n = t?.state === "on" ? t.attributes.percentage ?? 100 : 0, r = t?.attributes.percentage_step ?? 1;
	return /* @__PURE__ */ U("div", {
		class: "big-body",
		children: [/* @__PURE__ */ U("div", {
			class: "big-top",
			children: /* @__PURE__ */ U(so, { ...e })
		}), t?.attributes.percentage !== void 0 && !P(t) && /* @__PURE__ */ U(J, {
			value: n,
			step: r,
			label: `${e.name} speed`,
			format: (e) => e === 0 ? "Off" : `${Math.round(e)}%`,
			onCommit: (t) => H("fan", "set_percentage", {
				entity_id: e.card.entity,
				percentage: t
			})
		})]
	});
}
function po(e) {
	let t = e.s, n = e.card.entity;
	return /* @__PURE__ */ U("div", {
		class: "big-body cover-big",
		children: [/* @__PURE__ */ U("div", {
			class: "big-top",
			children: /* @__PURE__ */ U(so, { ...e })
		}), /* @__PURE__ */ U("div", {
			class: "cover-row",
			children: [/* @__PURE__ */ U("div", {
				class: "btn-group",
				children: [
					/* @__PURE__ */ U(G, {
						icon: "mdi:arrow-up",
						label: "Open",
						onClick: () => H("cover", "open_cover", { entity_id: n })
					}),
					/* @__PURE__ */ U(G, {
						icon: "mdi:stop",
						label: "Stop",
						onClick: () => H("cover", "stop_cover", { entity_id: n })
					}),
					/* @__PURE__ */ U(G, {
						icon: "mdi:arrow-down",
						label: "Close",
						onClick: () => H("cover", "close_cover", { entity_id: n })
					})
				]
			}), t?.attributes.current_position != null && /* @__PURE__ */ U(J, {
				vertical: !0,
				class: "cover-slider",
				value: t.attributes.current_position,
				label: `${e.name} position`,
				format: (e) => `${e}%`,
				onCommit: (e) => H("cover", "set_cover_position", {
					entity_id: n,
					position: e
				})
			})]
		})]
	});
}
function mo(e, t) {
	let n = e.states[t]?.attributes ?? {}, [r, i] = O(null), a = et(void 0), o = n.target_temp_step ?? (e.config.unit_system.temperature === "°F" ? 1 : .5), s = n.min_temp ?? 7, c = n.max_temp ?? 35, l = n.temperature == null && n.target_temp_low != null && n.target_temp_high != null, u = l ? [n.target_temp_low, n.target_temp_high] : n.temperature == null ? null : [n.temperature, n.temperature], d = r ?? u, f = (e) => Math.min(c, Math.max(s, Math.round(e / o) * o));
	return {
		shown: d,
		label: d ? l ? `${d[0]}–${d[1]}°` : `${d[0]}°` : "—",
		isRange: l,
		nudge: (e) => {
			if (!d) return;
			let n = [f(d[0] + e * o), f(d[1] + e * o)];
			i(n), clearTimeout(a.current), a.current = window.setTimeout(() => {
				H("climate", "set_temperature", l ? {
					entity_id: t,
					target_temp_low: n[0],
					target_temp_high: n[1]
				} : {
					entity_id: t,
					temperature: n[0]
				}).then(() => window.setTimeout(() => i(null), 1500));
			}, 800);
		},
		min: s,
		max: c
	};
}
function ho({ h: e, entityId: t, big: n }) {
	let r = e.states[t], { shown: i, label: a, isRange: o, nudge: s, min: c, max: l } = mo(e, t), u = r?.attributes.current_temperature, d = (e) => Math.min(1, Math.max(0, (e - c) / (l - c))), f = i && o ? d(i[0]) : 0, p = i ? d(i[1]) : 0, m = 2 * Math.PI * 52, h = m * .75, g = io(r) ?? "var(--accent)";
	return /* @__PURE__ */ U("div", {
		class: `climate-ring ${n ? "big" : ""}`,
		children: [
			/* @__PURE__ */ U("svg", {
				viewBox: "0 0 128 128",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ U("circle", {
					cx: "64",
					cy: "64",
					r: 52,
					class: "ring-track",
					"stroke-dasharray": `${h} ${m}`,
					transform: "rotate(135 64 64)"
				}), /* @__PURE__ */ U("circle", {
					cx: "64",
					cy: "64",
					r: 52,
					class: "ring-value",
					style: `stroke:${g}`,
					"stroke-dasharray": `${Math.max(.01, h * (p - f))} ${m}`,
					"stroke-dashoffset": `${-h * f}`,
					transform: "rotate(135 64 64)"
				})]
			}),
			/* @__PURE__ */ U("div", {
				class: "ring-center",
				children: [/* @__PURE__ */ U("div", {
					class: `ring-target ${o ? "range" : ""}`,
					children: a
				}), u != null && /* @__PURE__ */ U("div", {
					class: "ring-current",
					children: [
						"Now ",
						u,
						"°"
					]
				})]
			}),
			i && /* @__PURE__ */ U("div", {
				class: "ring-buttons",
				children: [/* @__PURE__ */ U(G, {
					icon: "mdi:minus",
					label: "Lower temperature",
					onClick: () => s(-1)
				}), /* @__PURE__ */ U(G, {
					icon: "mdi:plus",
					label: "Raise temperature",
					onClick: () => s(1)
				})]
			})
		]
	});
}
function go(e) {
	return /* @__PURE__ */ U("div", {
		class: "big-body climate-big",
		children: [/* @__PURE__ */ U("div", {
			class: "big-top",
			children: /* @__PURE__ */ U(so, { ...e })
		}), !P(e.s) && /* @__PURE__ */ U(ho, {
			h: e.h,
			entityId: e.card.entity
		})]
	});
}
function _o({ h: e, entityId: t, showVolume: n }) {
	let r = e.states[t], i = r?.state === "playing", a = r?.attributes.volume_level;
	return /* @__PURE__ */ U("div", {
		class: "media-controls",
		children: [/* @__PURE__ */ U("div", {
			class: "btn-group",
			children: [
				/* @__PURE__ */ U(G, {
					icon: "mdi:skip-previous",
					label: "Previous",
					onClick: () => H("media_player", "media_previous_track", { entity_id: t })
				}),
				/* @__PURE__ */ U(G, {
					icon: i ? "mdi:pause" : "mdi:play",
					label: i ? "Pause" : "Play",
					class: "play",
					size: 28,
					onClick: () => H("media_player", "media_play_pause", { entity_id: t })
				}),
				/* @__PURE__ */ U(G, {
					icon: "mdi:skip-next",
					label: "Next",
					onClick: () => H("media_player", "media_next_track", { entity_id: t })
				})
			]
		}), n && a != null && /* @__PURE__ */ U(J, {
			value: Math.round(a * 100),
			label: "Volume",
			format: (e) => `${e}%`,
			onCommit: (e) => H("media_player", "volume_set", {
				entity_id: t,
				volume_level: e / 100
			})
		})]
	});
}
function vo(e) {
	let t = e.s, n = t?.attributes.entity_picture ? e.h.hassUrl(t.attributes.entity_picture) : null;
	return /* @__PURE__ */ U("div", {
		class: "big-body media-big",
		children: [
			n && /* @__PURE__ */ U("div", {
				class: "media-art-bg",
				style: `background-image:url("${n}")`
			}),
			/* @__PURE__ */ U("div", {
				class: "big-top",
				children: [/* @__PURE__ */ U("div", {
					class: "tile-icon",
					children: n ? /* @__PURE__ */ U("img", {
						src: n,
						alt: "",
						class: "media-art",
						onError: (e) => e.target.style.visibility = "hidden"
					}) : /* @__PURE__ */ U(W, { icon: cn(e.h, e.card.entity, e.card) })
				}), /* @__PURE__ */ U("div", {
					class: "tile-text",
					children: [/* @__PURE__ */ U("div", {
						class: "tile-name",
						children: t?.attributes.media_title ?? e.name
					}), /* @__PURE__ */ U("div", {
						class: "tile-state",
						children: t?.attributes.media_artist ?? I(e.h, t)
					})]
				})]
			}),
			!P(t) && t?.state !== "off" && /* @__PURE__ */ U(_o, {
				h: e.h,
				entityId: e.card.entity,
				showVolume: e.card.size === "wide"
			})
		]
	});
}
function yo({ h: e, entityId: t, live: n }) {
	let [r, i] = O(0), [a, o] = O(!1);
	k(() => {
		if (n && !a) return;
		let e = window.setInterval(() => document.visibilityState === "visible" && i((e) => e + 1), 1e4);
		return () => clearInterval(e);
	}, [n, a]);
	let s = e.states[t], c = s?.attributes.entity_picture, l = s?.attributes.access_token;
	return n && !a && l ? /* @__PURE__ */ U("img", {
		class: "camera-img",
		src: e.hassUrl(`/api/camera_proxy_stream/${t}?token=${l}`),
		alt: "",
		onError: () => o(!0)
	}) : c ? /* @__PURE__ */ U("img", {
		class: "camera-img",
		src: e.hassUrl(c) + (c.includes("?") ? "&" : "?") + `t=${r}`,
		alt: "",
		loading: "lazy"
	}) : /* @__PURE__ */ U("div", {
		class: "camera-empty",
		children: /* @__PURE__ */ U(W, { icon: "mdi:cctv-off" })
	});
}
function bo(e) {
	return /* @__PURE__ */ U("div", {
		class: "big-body camera-big",
		children: [/* @__PURE__ */ U(yo, {
			h: e.h,
			entityId: e.card.entity,
			live: e.card.live
		}), /* @__PURE__ */ U("div", {
			class: "camera-label",
			children: [e.card.live && /* @__PURE__ */ U("span", { class: "live-dot" }), e.name]
		})]
	});
}
function xo(e) {
	let t = e.s && !Number.isNaN(Number(e.s.state));
	return /* @__PURE__ */ U("div", {
		class: `big-body sensor-big ${t ? "with-chart" : ""}`,
		children: [/* @__PURE__ */ U("div", {
			class: "big-top",
			children: [
				/* @__PURE__ */ U("div", {
					class: "tile-icon",
					children: /* @__PURE__ */ U(W, { icon: cn(e.h, e.card.entity, e.card) })
				}),
				/* @__PURE__ */ U("div", {
					class: "tile-text",
					children: [/* @__PURE__ */ U("div", {
						class: "tile-name",
						children: e.name
					}), /* @__PURE__ */ U("div", {
						class: "tile-state",
						children: "Last 24 hours"
					})]
				}),
				/* @__PURE__ */ U("div", {
					class: "sensor-value",
					children: I(e.h, e.s)
				})
			]
		}), t && /* @__PURE__ */ U(wo, {
			h: e.h,
			entityId: e.card.entity,
			now: Number(e.s.state)
		})]
	});
}
function So(e) {
	let t = e.s?.attributes ?? {};
	return /* @__PURE__ */ U("div", {
		class: "big-body",
		children: [
			/* @__PURE__ */ U("div", {
				class: "big-top",
				children: /* @__PURE__ */ U(so, { ...e })
			}),
			/* @__PURE__ */ U("div", {
				class: "big-number",
				children: [t.current_temperature == null ? t.temperature == null ? "—" : `${t.temperature}°` : `${Math.round(t.current_temperature)}°`, /* @__PURE__ */ U("span", {
					class: "big-number-label",
					children: t.current_temperature == null ? "Target" : "Water now"
				})]
			}),
			t.temperature != null && !P(e.s) && /* @__PURE__ */ U(J, {
				value: t.temperature,
				min: t.min_temp ?? 30,
				max: t.max_temp ?? 70,
				step: t.target_temp_step ?? 1,
				label: "Target temperature",
				format: (e) => `Target ${e}°`,
				onCommit: (t) => H("water_heater", "set_temperature", {
					entity_id: e.card.entity,
					temperature: t
				})
			})
		]
	});
}
function Co(e) {
	let t = e.s?.attributes ?? {};
	return /* @__PURE__ */ U("div", {
		class: "big-body weather-big",
		children: [/* @__PURE__ */ U("div", {
			class: "big-top",
			children: [
				/* @__PURE__ */ U("div", {
					class: "tile-icon",
					children: /* @__PURE__ */ U(W, { icon: cn(e.h, e.card.entity, e.card) })
				}),
				/* @__PURE__ */ U("div", {
					class: "tile-text",
					children: [/* @__PURE__ */ U("div", {
						class: "tile-name",
						children: e.name
					}), /* @__PURE__ */ U("div", {
						class: "tile-state",
						children: I(e.h, e.s).split(" · ")[1] ?? ""
					})]
				}),
				/* @__PURE__ */ U("div", {
					class: "weather-big-temp",
					children: t.temperature == null ? "" : `${Math.round(t.temperature)}°`
				})
			]
		}), /* @__PURE__ */ U("div", {
			class: "weather-big-meta",
			children: [
				t.humidity != null && /* @__PURE__ */ U("span", { children: [
					/* @__PURE__ */ U(W, {
						icon: "mdi:water-percent",
						size: 16
					}),
					" ",
					t.humidity,
					"%"
				] }),
				t.wind_speed != null && /* @__PURE__ */ U("span", { children: [
					/* @__PURE__ */ U(W, {
						icon: "mdi:weather-windy",
						size: 16
					}),
					" ",
					Math.round(t.wind_speed),
					" ",
					t.wind_speed_unit ?? ""
				] }),
				/* @__PURE__ */ U("span", {
					class: "muted-on",
					children: "Tap for forecast"
				})
			]
		})]
	});
}
function wo({ h: e, entityId: t, now: n }) {
	let r = $a(e, t, 24, 5);
	return r ? /* @__PURE__ */ U(eo, {
		points: r,
		now: n,
		class: "tile-chart",
		showDot: !0
	}) : /* @__PURE__ */ U("div", { class: "chart-space" });
}
// src/components/details.tsx
var To = [
	[0, 0],
	[30, 90],
	[50, 90],
	[120, 70],
	[180, 80],
	[220, 90],
	[270, 80],
	[320, 80]
], Eo = (e) => e.replace(/_/g, " ").replace(/\b\w/g, (e) => e.toUpperCase());
function Do(e) {
	let t = (Date.now() - new Date(e).getTime()) / 1e3;
	return t < 60 ? "just now" : t < 3600 ? `${Math.floor(t / 60)} min ago` : t < 86400 ? `${Math.floor(t / 3600)} h ago` : `${Math.floor(t / 86400)} d ago`;
}
function Oo() {
	let e = to.value, t = L.value;
	if (!e || !t) return null;
	let n = t.states[e.entity], r = F(t, e.entity, e.card, e.room), i = () => to.value = null;
	return /* @__PURE__ */ U(Y, {
		title: r,
		onClose: i,
		footer: /* @__PURE__ */ U(S, { children: [/* @__PURE__ */ U("span", {
			class: "muted",
			children: n ? `Changed ${Do(n.last_changed)}` : ""
		}), /* @__PURE__ */ U(K, {
			kind: "ghost",
			icon: "mdi:open-in-new",
			onClick: () => {
				i(), Kn(e.entity);
			},
			children: "Home Assistant details"
		})] }),
		children: [/* @__PURE__ */ U("div", {
			class: "detail-head",
			style: io(n) ? `--tile-active:${io(n)}` : void 0,
			children: [/* @__PURE__ */ U("div", {
				class: `tile-icon big ${Yt(n) ? "active" : ""}`,
				children: /* @__PURE__ */ U(W, {
					icon: cn(t, e.entity, e.card),
					size: 32
				})
			}), /* @__PURE__ */ U("div", {
				class: "detail-state",
				children: I(t, n)
			})]
		}), n && !P(n) ? /* @__PURE__ */ U(ko, {
			h: t,
			s: n
		}) : /* @__PURE__ */ U("p", {
			class: "muted",
			children: "This device is not responding right now."
		})]
	});
}
function ko({ h: e, s: t }) {
	let n = t.entity_id, r = N(n), i = t.attributes;
	switch (r) {
		case "light": {
			let e = i.supported_color_modes ?? [], r = e.some((e) => e !== "onoff"), a = e.includes("color_temp"), o = e.some((e) => [
				"hs",
				"rgb",
				"rgbw",
				"rgbww",
				"xy"
			].includes(e)), s = t.state === "on" && i.brightness != null ? Math.round(i.brightness / 255 * 100) : 0;
			return /* @__PURE__ */ U("div", {
				class: "controls",
				children: [
					/* @__PURE__ */ U(Mo, { s: t }),
					r && /* @__PURE__ */ U(No, {
						label: "Brightness",
						children: /* @__PURE__ */ U(J, {
							value: s,
							min: 1,
							max: 100,
							color: io(t),
							format: (e) => `${e}%`,
							onCommit: (e) => H("light", "turn_on", {
								entity_id: n,
								brightness_pct: e
							})
						})
					}),
					a && /* @__PURE__ */ U(No, {
						label: "Colour temperature",
						children: /* @__PURE__ */ U(J, {
							class: "ct-slider",
							value: i.color_temp_kelvin ?? i.min_color_temp_kelvin ?? 2700,
							min: i.min_color_temp_kelvin ?? 2e3,
							max: i.max_color_temp_kelvin ?? 6500,
							step: 50,
							format: (e) => `${e} K`,
							onCommit: (e) => H("light", "turn_on", {
								entity_id: n,
								color_temp_kelvin: e
							})
						})
					}),
					o && /* @__PURE__ */ U(No, {
						label: "Colour",
						children: /* @__PURE__ */ U("div", {
							class: "swatches",
							children: To.map(([e, t], r) => r === 0 ? /* @__PURE__ */ U("button", {
								type: "button",
								class: "swatch",
								"aria-label": "White",
								style: "background:#fff",
								onClick: () => H("light", "turn_on", {
									entity_id: n,
									hs_color: [0, 0]
								})
							}) : /* @__PURE__ */ U("button", {
								type: "button",
								class: "swatch",
								"aria-label": `Hue ${e}`,
								style: `background:hsl(${e} ${t}% 55%)`,
								onClick: () => H("light", "turn_on", {
									entity_id: n,
									hs_color: [e, t]
								})
							}))
						})
					}),
					i.effect_list?.length > 0 && /* @__PURE__ */ U(Po, {
						label: "Effect",
						value: i.effect,
						options: i.effect_list,
						onPick: (e) => H("light", "turn_on", {
							entity_id: n,
							effect: e
						})
					})
				]
			});
		}
		case "fan": return /* @__PURE__ */ U("div", {
			class: "controls",
			children: [
				/* @__PURE__ */ U(Mo, { s: t }),
				i.percentage !== void 0 && /* @__PURE__ */ U(No, {
					label: "Speed",
					children: /* @__PURE__ */ U(J, {
						value: t.state === "on" ? i.percentage ?? 0 : 0,
						step: i.percentage_step ?? 1,
						format: (e) => `${Math.round(e)}%`,
						onCommit: (e) => H("fan", "set_percentage", {
							entity_id: n,
							percentage: e
						})
					})
				}),
				i.oscillating !== void 0 && /* @__PURE__ */ U("div", {
					class: "control-row",
					children: [/* @__PURE__ */ U("span", { children: "Oscillate" }), /* @__PURE__ */ U(q, {
						checked: !!i.oscillating,
						onChange: (e) => H("fan", "oscillate", {
							entity_id: n,
							oscillating: e
						})
					})]
				}),
				i.preset_modes?.length > 0 && /* @__PURE__ */ U(Po, {
					label: "Mode",
					value: i.preset_mode,
					options: i.preset_modes,
					onPick: (e) => H("fan", "set_preset_mode", {
						entity_id: n,
						preset_mode: e
					})
				})
			]
		});
		case "cover":
		case "valve": return /* @__PURE__ */ U("div", {
			class: "controls",
			children: [
				/* @__PURE__ */ U("div", {
					class: "btn-row",
					children: [
						/* @__PURE__ */ U(K, {
							icon: "mdi:arrow-up",
							onClick: () => H(r, `open_${r}`, { entity_id: n }),
							children: "Open"
						}),
						/* @__PURE__ */ U(K, {
							icon: "mdi:stop",
							onClick: () => H(r, `stop_${r}`, { entity_id: n }),
							children: "Stop"
						}),
						/* @__PURE__ */ U(K, {
							icon: "mdi:arrow-down",
							onClick: () => H(r, `close_${r}`, { entity_id: n }),
							children: "Close"
						})
					]
				}),
				i.current_position != null && /* @__PURE__ */ U(No, {
					label: "Position",
					children: /* @__PURE__ */ U(J, {
						value: i.current_position,
						format: (e) => `${e}%`,
						onCommit: (e) => H(r, `set_${r}_position`, {
							entity_id: n,
							position: e
						})
					})
				}),
				i.current_tilt_position != null && /* @__PURE__ */ U(No, {
					label: "Tilt",
					children: /* @__PURE__ */ U(J, {
						value: i.current_tilt_position,
						format: (e) => `${e}%`,
						onCommit: (e) => H("cover", "set_cover_tilt_position", {
							entity_id: n,
							tilt_position: e
						})
					})
				})
			]
		});
		case "climate": return /* @__PURE__ */ U("div", {
			class: "controls",
			children: [
				/* @__PURE__ */ U(ho, {
					h: e,
					entityId: n,
					big: !0
				}),
				i.hvac_modes?.length > 0 && /* @__PURE__ */ U(Po, {
					label: "Mode",
					value: t.state,
					options: i.hvac_modes,
					onPick: (e) => H("climate", "set_hvac_mode", {
						entity_id: n,
						hvac_mode: e
					})
				}),
				i.preset_modes?.length > 0 && /* @__PURE__ */ U(Po, {
					label: "Preset",
					value: i.preset_mode,
					options: i.preset_modes,
					onPick: (e) => H("climate", "set_preset_mode", {
						entity_id: n,
						preset_mode: e
					})
				}),
				i.fan_modes?.length > 0 && /* @__PURE__ */ U(Po, {
					label: "Fan",
					value: i.fan_mode,
					options: i.fan_modes,
					onPick: (e) => H("climate", "set_fan_mode", {
						entity_id: n,
						fan_mode: e
					})
				}),
				i.current_humidity != null && /* @__PURE__ */ U("p", {
					class: "muted",
					children: [
						"Humidity ",
						i.current_humidity,
						"%"
					]
				})
			]
		});
		case "media_player": {
			let r = i.entity_picture ? e.hassUrl(i.entity_picture) : null;
			return /* @__PURE__ */ U("div", {
				class: "controls",
				children: [
					r && /* @__PURE__ */ U("img", {
						class: "media-art-large",
						src: r,
						alt: ""
					}),
					i.media_title && /* @__PURE__ */ U("div", {
						class: "media-meta",
						children: [/* @__PURE__ */ U("strong", { children: i.media_title }), /* @__PURE__ */ U("span", {
							class: "muted",
							children: [i.media_artist, i.media_album_name].filter(Boolean).join(" · ")
						})]
					}),
					/* @__PURE__ */ U(_o, {
						h: e,
						entityId: n,
						showVolume: !0
					}),
					i.source_list?.length > 0 && /* @__PURE__ */ U(Po, {
						label: "Source",
						value: i.source,
						options: i.source_list,
						onPick: (e) => H("media_player", "select_source", {
							entity_id: n,
							source: e
						})
					}),
					/* @__PURE__ */ U("div", {
						class: "btn-row",
						children: /* @__PURE__ */ U(K, {
							icon: "mdi:power",
							onClick: () => H("media_player", t.state === "off" ? "turn_on" : "turn_off", { entity_id: n }),
							children: t.state === "off" ? "Turn on" : "Turn off"
						})
					})
				]
			});
		}
		case "lock": return /* @__PURE__ */ U("div", {
			class: "controls",
			children: /* @__PURE__ */ U("div", {
				class: "btn-row",
				children: [/* @__PURE__ */ U(K, {
					kind: t.state === "locked" ? "primary" : "plain",
					icon: "mdi:lock",
					onClick: () => H("lock", "lock", { entity_id: n }),
					children: "Lock"
				}), /* @__PURE__ */ U(K, {
					kind: "danger",
					icon: "mdi:lock-open-variant",
					onClick: () => no.value = n,
					children: "Unlock"
				})]
			})
		});
		case "alarm_control_panel": return /* @__PURE__ */ U(Fo, { s: t });
		case "vacuum": return /* @__PURE__ */ U("div", {
			class: "controls",
			children: [/* @__PURE__ */ U("div", {
				class: "btn-row",
				children: [
					/* @__PURE__ */ U(K, {
						icon: "mdi:play",
						onClick: () => H("vacuum", "start", { entity_id: n }),
						children: "Start"
					}),
					/* @__PURE__ */ U(K, {
						icon: "mdi:pause",
						onClick: () => H("vacuum", "pause", { entity_id: n }),
						children: "Pause"
					}),
					/* @__PURE__ */ U(K, {
						icon: "mdi:home-import-outline",
						onClick: () => H("vacuum", "return_to_base", { entity_id: n }),
						children: "Dock"
					}),
					/* @__PURE__ */ U(K, {
						icon: "mdi:map-marker",
						onClick: () => H("vacuum", "locate", { entity_id: n }),
						children: "Find"
					})
				]
			}), i.battery_level != null && /* @__PURE__ */ U("p", {
				class: "muted",
				children: [
					"Battery ",
					i.battery_level,
					"%"
				]
			})]
		});
		case "number":
		case "input_number": return /* @__PURE__ */ U("div", {
			class: "controls",
			children: /* @__PURE__ */ U(J, {
				value: Number(t.state),
				min: i.min ?? 0,
				max: i.max ?? 100,
				step: i.step ?? 1,
				format: (e) => `${e}${i.unit_of_measurement ? " " + i.unit_of_measurement : ""}`,
				onCommit: (e) => H(r, "set_value", {
					entity_id: n,
					value: e
				})
			})
		});
		case "select":
		case "input_select": return /* @__PURE__ */ U("div", {
			class: "controls",
			children: /* @__PURE__ */ U(Po, {
				label: "Option",
				value: t.state,
				options: i.options ?? [],
				onPick: (e) => H(r, "select_option", {
					entity_id: n,
					option: e
				})
			})
		});
		case "camera": return /* @__PURE__ */ U("div", {
			class: "controls",
			children: /* @__PURE__ */ U(yo, {
				h: e,
				entityId: n,
				live: !0
			})
		});
		case "water_heater": return /* @__PURE__ */ U("div", {
			class: "controls",
			children: [
				i.temperature != null && /* @__PURE__ */ U(No, {
					label: "Target temperature",
					children: /* @__PURE__ */ U(J, {
						value: i.temperature,
						min: i.min_temp ?? 30,
						max: i.max_temp ?? 70,
						step: i.target_temp_step ?? 1,
						format: (e) => `${e}°`,
						onCommit: (e) => H("water_heater", "set_temperature", {
							entity_id: n,
							temperature: e
						})
					})
				}),
				i.operation_list?.length > 0 && /* @__PURE__ */ U(Po, {
					label: "Mode",
					value: i.operation_mode ?? t.state,
					options: i.operation_list,
					onPick: (e) => H("water_heater", "set_operation_mode", {
						entity_id: n,
						operation_mode: e
					})
				}),
				i.away_mode !== void 0 && /* @__PURE__ */ U("div", {
					class: "control-row",
					children: [/* @__PURE__ */ U("span", { children: "Away mode" }), /* @__PURE__ */ U(q, {
						checked: i.away_mode === "on",
						onChange: (e) => H("water_heater", "set_away_mode", {
							entity_id: n,
							away_mode: e
						})
					})]
				}),
				i.current_temperature != null && /* @__PURE__ */ U("p", {
					class: "muted",
					children: [
						"Water is ",
						i.current_temperature,
						"°"
					]
				})
			]
		});
		case "humidifier": return /* @__PURE__ */ U("div", {
			class: "controls",
			children: [
				/* @__PURE__ */ U(Mo, { s: t }),
				i.humidity != null && /* @__PURE__ */ U(No, {
					label: "Target humidity",
					children: /* @__PURE__ */ U(J, {
						value: i.humidity,
						min: i.min_humidity ?? 0,
						max: i.max_humidity ?? 100,
						format: (e) => `${e}%`,
						onCommit: (e) => H("humidifier", "set_humidity", {
							entity_id: n,
							humidity: e
						})
					})
				}),
				i.available_modes?.length > 0 && /* @__PURE__ */ U(Po, {
					label: "Mode",
					value: i.mode,
					options: i.available_modes,
					onPick: (e) => H("humidifier", "set_mode", {
						entity_id: n,
						mode: e
					})
				}),
				i.current_humidity != null && /* @__PURE__ */ U("p", {
					class: "muted",
					children: [
						"Now ",
						i.current_humidity,
						"%"
					]
				})
			]
		});
		case "lawn_mower": return /* @__PURE__ */ U("div", {
			class: "controls",
			children: /* @__PURE__ */ U("div", {
				class: "btn-row",
				children: [
					/* @__PURE__ */ U(K, {
						icon: "mdi:play",
						onClick: () => H("lawn_mower", "start_mowing", { entity_id: n }),
						children: "Start"
					}),
					/* @__PURE__ */ U(K, {
						icon: "mdi:pause",
						onClick: () => H("lawn_mower", "pause", { entity_id: n }),
						children: "Pause"
					}),
					/* @__PURE__ */ U(K, {
						icon: "mdi:home-import-outline",
						onClick: () => H("lawn_mower", "dock", { entity_id: n }),
						children: "Dock"
					})
				]
			})
		});
		case "counter": return /* @__PURE__ */ U("div", {
			class: "controls",
			children: [/* @__PURE__ */ U("div", {
				class: "counter-row",
				children: [
					/* @__PURE__ */ U(K, {
						icon: "mdi:minus",
						onClick: () => H("counter", "decrement", { entity_id: n }),
						children: "Down"
					}),
					/* @__PURE__ */ U("span", {
						class: "counter-value",
						children: t.state
					}),
					/* @__PURE__ */ U(K, {
						icon: "mdi:plus",
						onClick: () => H("counter", "increment", { entity_id: n }),
						children: "Up"
					})
				]
			}), /* @__PURE__ */ U(K, {
				kind: "ghost",
				icon: "mdi:restore",
				onClick: () => H("counter", "reset", { entity_id: n }),
				children: "Reset"
			})]
		});
		case "timer": return /* @__PURE__ */ U("div", {
			class: "controls",
			children: [/* @__PURE__ */ U(Ao, { s: t }), /* @__PURE__ */ U("div", {
				class: "btn-row",
				children: [
					t.state === "active" ? /* @__PURE__ */ U(K, {
						icon: "mdi:pause",
						onClick: () => H("timer", "pause", { entity_id: n }),
						children: "Pause"
					}) : /* @__PURE__ */ U(K, {
						kind: "primary",
						icon: "mdi:play",
						onClick: () => H("timer", "start", { entity_id: n }),
						children: "Start"
					}),
					/* @__PURE__ */ U(K, {
						icon: "mdi:stop",
						onClick: () => H("timer", "cancel", { entity_id: n }),
						children: "Cancel"
					}),
					/* @__PURE__ */ U(K, {
						icon: "mdi:check",
						onClick: () => H("timer", "finish", { entity_id: n }),
						children: "Finish"
					})
				]
			})]
		});
		case "input_text":
		case "text": return /* @__PURE__ */ U(jo, { s: t });
		case "update": return /* @__PURE__ */ U("div", {
			class: "controls",
			children: [
				/* @__PURE__ */ U("p", { children: [
					"Installed ",
					/* @__PURE__ */ U("strong", { children: i.installed_version ?? "—" }),
					t.state === "on" && /* @__PURE__ */ U(S, { children: [
						" ",
						"· Available ",
						/* @__PURE__ */ U("strong", { children: i.latest_version })
					] })
				] }),
				i.release_summary && /* @__PURE__ */ U("p", {
					class: "muted small",
					children: i.release_summary
				}),
				t.state === "on" && !!(i.supported_features & 1) && /* @__PURE__ */ U(K, {
					kind: "primary",
					icon: "mdi:download",
					onClick: () => H("update", "install", { entity_id: n }),
					children: i.in_progress ? "Installing…" : "Install update"
				})
			]
		});
		case "image": return i.entity_picture ? /* @__PURE__ */ U("img", {
			class: "media-art-large",
			src: e.hassUrl(i.entity_picture),
			alt: ""
		}) : null;
		case "scene":
		case "script": return /* @__PURE__ */ U("div", {
			class: "controls",
			children: /* @__PURE__ */ U(K, {
				kind: "primary",
				icon: "mdi:play",
				onClick: () => H(r, "turn_on", { entity_id: n }),
				children: "Run"
			})
		});
		case "button":
		case "input_button": return /* @__PURE__ */ U("div", {
			class: "controls",
			children: /* @__PURE__ */ U(K, {
				kind: "primary",
				icon: "mdi:gesture-tap",
				onClick: () => H(r, "press", { entity_id: n }),
				children: "Press"
			})
		});
		case "sensor": return /* @__PURE__ */ U(Io, {
			h: e,
			entityId: n,
			unit: i.unit_of_measurement
		});
		default: return e.services[r]?.toggle ? /* @__PURE__ */ U("div", {
			class: "controls",
			children: /* @__PURE__ */ U(Mo, { s: t })
		}) : null;
	}
}
function Ao({ s: e }) {
	let [, t] = O(0);
	k(() => {
		if (e.state !== "active") return;
		let n = window.setInterval(() => t((e) => e + 1), 1e3);
		return () => clearInterval(n);
	}, [e.state]);
	let n = e.attributes.remaining ?? e.attributes.duration ?? "";
	if (e.state === "active" && e.attributes.finishes_at) {
		let t = Math.max(0, Math.round((new Date(e.attributes.finishes_at).getTime() - Date.now()) / 1e3)), r = Math.floor(t / 3600), i = Math.floor(t % 3600 / 60), a = t % 60;
		n = `${r ? r + ":" : ""}${String(i).padStart(r ? 2 : 1, "0")}:${String(a).padStart(2, "0")}`;
	}
	return /* @__PURE__ */ U("div", {
		class: "counter-value center",
		children: n
	});
}
function jo({ s: e }) {
	let [t, n] = O(e.state), r = N(e.entity_id), i = () => H(r, "set_value", {
		entity_id: e.entity_id,
		value: t
	});
	return /* @__PURE__ */ U("form", {
		class: "controls",
		onSubmit: (e) => {
			e.preventDefault(), i();
		},
		children: [/* @__PURE__ */ U(Z, {
			value: t,
			onInput: n,
			type: e.attributes.mode === "password" ? "password" : "text"
		}), /* @__PURE__ */ U(K, {
			kind: "primary",
			icon: "mdi:check",
			onClick: i,
			children: "Save"
		})]
	});
}
function Mo({ s: e }) {
	let t = N(e.entity_id);
	return /* @__PURE__ */ U("div", {
		class: "control-row",
		children: [/* @__PURE__ */ U("span", { children: e.state === "on" ? "On" : "Off" }), /* @__PURE__ */ U(q, {
			checked: e.state === "on",
			onChange: () => H(t, "toggle", { entity_id: e.entity_id })
		})]
	});
}
function No({ label: e, children: t }) {
	return /* @__PURE__ */ U("div", {
		class: "labeled",
		children: [/* @__PURE__ */ U("div", {
			class: "labeled-label",
			children: e
		}), t]
	});
}
function Po({ label: e, value: t, options: n, onPick: r }) {
	return /* @__PURE__ */ U(No, {
		label: e,
		children: /* @__PURE__ */ U("div", {
			class: "chips",
			children: n.map((e) => /* @__PURE__ */ U("button", {
				type: "button",
				class: `chip ${e === t ? "selected" : ""}`,
				onClick: () => r(e),
				children: Eo(e)
			}))
		})
	});
}
function Fo({ s: e }) {
	let [t, n] = O(""), r = e.entity_id, i = !!e.attributes.code_format, a = e.attributes.supported_features ?? 0, o = (e) => {
		H("alarm_control_panel", e, i ? {
			entity_id: r,
			code: t
		} : { entity_id: r }), n("");
	};
	return /* @__PURE__ */ U("div", {
		class: "controls",
		children: [i && /* @__PURE__ */ U(Z, {
			type: "password",
			value: t,
			onInput: n,
			placeholder: "Code"
		}), /* @__PURE__ */ U("div", {
			class: "btn-row",
			children: e.state === "disarmed" ? [
				[
					1,
					"alarm_arm_home",
					"Home",
					"mdi:home-lock"
				],
				[
					2,
					"alarm_arm_away",
					"Away",
					"mdi:lock"
				],
				[
					4,
					"alarm_arm_night",
					"Night",
					"mdi:weather-night"
				]
			].filter(([e]) => a & e).map(([, e, t, n]) => /* @__PURE__ */ U(K, {
				icon: n,
				onClick: () => o(e),
				children: t
			})) : /* @__PURE__ */ U(K, {
				kind: "danger",
				icon: "mdi:shield-off",
				onClick: () => o("alarm_disarm"),
				children: "Disarm"
			})
		})]
	});
}
function Io({ h: e, entityId: t, unit: n }) {
	let r = $a(e, t, 24, 5);
	if (r === null) return /* @__PURE__ */ U("p", {
		class: "muted",
		children: "Loading history…"
	});
	if (r.length < 2) return /* @__PURE__ */ U("p", {
		class: "muted",
		children: "No numeric history for the last 24 hours."
	});
	let i = r.map((e) => e.v), a = (e) => Math.abs(e) >= 100 ? Math.round(e) : Math.round(e * 10) / 10;
	return /* @__PURE__ */ U("div", {
		class: "history",
		children: [
			/* @__PURE__ */ U("div", {
				class: "labeled-label",
				children: "Last 24 hours"
			}),
			/* @__PURE__ */ U(eo, {
				points: r,
				height: 140,
				class: "history-chart",
				showDot: !0
			}),
			/* @__PURE__ */ U("div", {
				class: "history-range muted",
				children: [/* @__PURE__ */ U("span", { children: [
					"Low ",
					a(Math.min(...i)),
					" ",
					n
				] }), /* @__PURE__ */ U("span", { children: [
					"High ",
					a(Math.max(...i)),
					" ",
					n
				] })]
			})
		]
	});
}
function Lo() {
	let e = no.value, t = L.value;
	if (!e || !t) return null;
	let n = () => no.value = null;
	return /* @__PURE__ */ U(Y, {
		title: "Unlock?",
		onClose: n,
		footer: /* @__PURE__ */ U(S, { children: [/* @__PURE__ */ U(K, {
			kind: "ghost",
			onClick: n,
			children: "Cancel"
		}), /* @__PURE__ */ U(K, {
			kind: "danger",
			icon: "mdi:lock-open-variant",
			onClick: () => {
				H("lock", "unlock", { entity_id: e }), n();
			},
			children: "Unlock"
		})] }),
		children: /* @__PURE__ */ U("p", { children: [
			"Unlock ",
			F(t, e),
			"?"
		] })
	});
}
// src/components/irrigation.tsx
var Ro = M(null);
function zo() {
	let e = L.value;
	return k(() => {
		if (!e) return;
		let t, n = !0;
		return e.connection.subscribeMessage((e) => n && (Ro.value = e), { type: "dashforge/irrigation/subscribe" }).then((e) => {
			n ? t = e : e();
		}).catch(() => void 0), () => {
			n = !1, t?.().catch(() => void 0);
		};
	}, [!!e]), null;
}
async function Bo(e, t) {
	try {
		await L.value.callWS({
			type: "dashforge/irrigation/run",
			entity_ids: e,
			minutes: t
		});
	} catch (e) {
		V(e?.message ?? "Could not start watering", "error");
	}
}
async function Vo(e = !1) {
	try {
		await L.value.callWS({
			type: "dashforge/irrigation/stop",
			skip: e
		});
	} catch (e) {
		V(e?.message ?? "Could not stop watering", "error");
	}
}
function Ho(e) {
	let [, t] = O(0);
	k(() => {
		if (!e) return;
		let n = window.setInterval(() => t((e) => e + 1), 1e3);
		return () => clearInterval(n);
	}, [e]);
}
var Uo = (e) => `${Math.floor(e / 60)}:${String(Math.floor(e % 60)).padStart(2, "0")}`;
function Wo({ cfg: e }) {
	let t = L.value, n = Ro.value, r = n?.active ?? null;
	Ho(!!r);
	let [i, a] = O(e.irrigation.minutes), o = e.irrigation.zones.filter((e) => t.states[e]), s = e.irrigation.presets.length ? e.irrigation.presets : [
		5,
		10,
		15,
		30
	];
	if (!o.length) return /* @__PURE__ */ U("div", {
		class: "empty",
		children: [/* @__PURE__ */ U(W, {
			icon: "mdi:sprinkler-variant",
			size: 40
		}), /* @__PURE__ */ U("p", { children: "No watering zones yet. Choose your zones in Settings → Pages → Irrigation." })]
	});
	let c = 0, l = 0;
	if (r) {
		let e = new Date(r.ends_at).getTime(), t = new Date(r.started_at).getTime();
		c = Math.max(0, (e - Date.now()) / 1e3), l = Math.min(100, Math.max(0, (Date.now() - t) / (e - t) * 100));
	}
	let u = o.filter((e) => Yt(t.states[e]) && e !== r?.entity_id);
	return /* @__PURE__ */ U("div", {
		class: "irrigation",
		children: [
			/* @__PURE__ */ U("div", {
				class: `irr-status ${r ? "running" : ""}`,
				children: [r ? /* @__PURE__ */ U(S, { children: [/* @__PURE__ */ U("div", {
					class: "irr-status-head",
					children: [
						/* @__PURE__ */ U(W, {
							icon: "mdi:sprinkler-variant",
							size: 30
						}),
						/* @__PURE__ */ U("div", {
							class: "irr-status-text",
							children: [/* @__PURE__ */ U("strong", { children: F(t, r.entity_id) }), /* @__PURE__ */ U("span", { children: [
								Uo(c),
								" left",
								n.queue.length > 0 && ` · then ${n.queue.map((e) => F(t, e)).join(", ")}`
							] })]
						}),
						/* @__PURE__ */ U("div", {
							class: "btn-row",
							children: [n.queue.length > 0 && /* @__PURE__ */ U(K, {
								icon: "mdi:skip-next",
								onClick: () => Vo(!0),
								children: "Next zone"
							}), /* @__PURE__ */ U(K, {
								kind: "danger",
								icon: "mdi:stop",
								onClick: () => Vo(),
								children: "Stop"
							})]
						})
					]
				}), /* @__PURE__ */ U("div", {
					class: "irr-progress",
					children: /* @__PURE__ */ U("div", { style: `width:${l}%` })
				})] }) : /* @__PURE__ */ U("div", {
					class: "irr-status-head",
					children: [/* @__PURE__ */ U(W, {
						icon: "mdi:water-off-outline",
						size: 30
					}), /* @__PURE__ */ U("div", {
						class: "irr-status-text",
						children: [/* @__PURE__ */ U("strong", { children: "Not watering" }), /* @__PURE__ */ U("span", { children: "Run every zone in turn, or tap a zone below." })]
					})]
				}), /* @__PURE__ */ U("div", {
					class: "irr-runall",
					children: [
						/* @__PURE__ */ U("span", {
							class: "muted small",
							children: "Each zone for"
						}),
						/* @__PURE__ */ U("div", {
							class: "chips",
							children: s.map((e) => /* @__PURE__ */ U("button", {
								type: "button",
								class: `chip ${i === e ? "selected" : ""}`,
								onClick: () => a(e),
								children: [e, " min"]
							}))
						}),
						/* @__PURE__ */ U(K, {
							kind: "primary",
							icon: "mdi:play",
							onClick: () => Bo(o, i),
							children: [
								"Run all ",
								o.length,
								" zones"
							]
						})
					]
				})]
			}),
			u.length > 0 && /* @__PURE__ */ U("p", {
				class: "muted small",
				children: [
					/* @__PURE__ */ U(W, {
						icon: "mdi:information-outline",
						size: 16
					}),
					" ",
					u.map((e) => F(t, e)).join(", "),
					" ",
					u.length === 1 ? "is" : "are",
					" on outside DashForge, so there's no timer for ",
					u.length === 1 ? "it" : "them",
					"."
				]
			}),
			/* @__PURE__ */ U("div", {
				class: "zone-grid",
				children: o.map((e, i) => {
					let a = t.states[e], o = r?.entity_id === e, l = n?.queue.includes(e), u = Yt(a);
					return /* @__PURE__ */ U("div", {
						class: `zone ${o ? "running" : ""} ${u ? "on" : ""} ${P(a) ? "unavailable" : ""}`,
						children: [
							/* @__PURE__ */ U("div", {
								class: "zone-head",
								children: [
									/* @__PURE__ */ U("span", {
										class: "zone-num",
										children: i + 1
									}),
									/* @__PURE__ */ U(W, {
										icon: cn(t, e),
										size: 22
									}),
									/* @__PURE__ */ U("span", {
										class: "zone-name",
										children: F(t, e)
									})
								]
							}),
							/* @__PURE__ */ U("div", {
								class: "zone-state",
								children: o ? `Watering · ${Uo(c)} left` : l ? "Waiting in line" : u ? "On" : P(a) ? "Unavailable" : "Off"
							}),
							o ? /* @__PURE__ */ U(K, {
								kind: "danger",
								icon: "mdi:stop",
								onClick: () => Vo(),
								children: "Stop"
							}) : /* @__PURE__ */ U("div", {
								class: "chips",
								children: s.map((t) => /* @__PURE__ */ U("button", {
									type: "button",
									class: "chip",
									disabled: P(a),
									onClick: () => Bo([e], t),
									children: [t, " min"]
								}))
							})
						]
					});
				})
			}),
			/* @__PURE__ */ U("p", {
				class: "muted small",
				children: [
					"Timers run inside Home Assistant, so watering stops on time even if this screen sleeps. Automations can use the same programs with the ",
					/* @__PURE__ */ U("code", { children: "dashforge.run_zones" }),
					" action."
				]
			})
		]
	});
}
// src/components/home.tsx
function Go(e, t) {
	return t.floorId ? t.floorId : t.areaId ? e.areas?.[t.areaId]?.floor_id ?? null : null;
}
function Ko(e, t) {
	let n = e.floors ?? {}, r = /* @__PURE__ */ new Map();
	for (let i of t) {
		let t = Go(e, i), a = t && n[t] ? t : null;
		if (!r.has(a)) {
			let e = a ? n[a] : null;
			r.set(a, {
				id: a,
				name: e?.name ?? "Other rooms",
				icon: e?.icon ?? (a ? "mdi:home-floor-1" : "mdi:home-outline"),
				sections: []
			});
		}
		r.get(a).sections.push(i);
	}
	return [...r.values()].sort((e, t) => {
		if (e.id === null) return 1;
		if (t.id === null) return -1;
		let r = (e) => e < 0 ? 1e3 - e : e;
		return r(n[e.id]?.level ?? 0) - r(n[t.id]?.level ?? 0);
	});
}
var qo = (e, t) => Ko(e, t).filter((e) => e.id !== null).length > 0, Jo = (e) => e.cards.filter((e) => !e.hidden);
function Yo(e, t) {
	let n = Jo(t), r = [], i = n.find((t) => N(t.entity) === "sensor" && e.states[t.entity]?.attributes.device_class === "temperature"), a = n.find((t) => N(t.entity) === "climate" && e.states[t.entity]?.attributes.current_temperature != null);
	i ? r.push(I(e, e.states[i.entity])) : a && r.push(`${e.states[a.entity].attributes.current_temperature}°`);
	let o = n.find((t) => N(t.entity) === "sensor" && e.states[t.entity]?.attributes.device_class === "humidity");
	o && r.push(I(e, e.states[o.entity]));
	let s = n.filter((t) => N(t.entity) === "light" && Yt(e.states[t.entity])).length;
	s && r.push(s === 1 ? "1 light on" : `${s} lights on`);
	let c = n.filter((t) => {
		let n = e.states[t.entity];
		return N(t.entity) === "binary_sensor" && n?.state === "on" && [
			"door",
			"window",
			"garage_door",
			"opening"
		].includes(n.attributes.device_class);
	}).length;
	return c && r.push(`${c} open`), r.join(" · ");
}
function Xo(e, t) {
	return Jo(t).map((e) => e.entity).filter((t) => N(t) === "light" && e.states[t]);
}
function Zo(e, t) {
	H("light", t.some((t) => Yt(e.states[t])) ? "turn_off" : "turn_on", { entity_id: t });
}
function Qo({ section: e }) {
	let t = L.value;
	if (e.kind !== "room") return null;
	let n = Xo(t, e), r = Yo(t, e);
	if (!n.length && !r) return null;
	let i = n.some((e) => Yt(t.states[e]));
	return /* @__PURE__ */ U("div", {
		class: "room-controls",
		children: [r && /* @__PURE__ */ U("span", {
			class: "room-status",
			children: r
		}), n.length > 0 && /* @__PURE__ */ U("button", {
			type: "button",
			class: `room-lights ${i ? "on" : ""}`,
			onClick: () => Zo(t, n),
			children: [/* @__PURE__ */ U(W, {
				icon: i ? "mdi:lightbulb-group" : "mdi:lightbulb-group-off-outline",
				size: 18
			}), i ? "Lights off" : "Lights on"]
		})]
	});
}
var $o = M(null);
function es(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of e.sections) for (let e of r.cards) e.hidden || t.has(e.entity) || (t.add(e.entity), n.push(e));
	return n;
}
function ts(e, t) {
	let n = es(t).map((e) => e.entity).filter((t) => e.states[t]), r = (t) => e.states[t], i = [], a = (e) => () => B.value = e, o = n.filter((e) => N(e) === "sensor" && r(e).attributes.device_class === "temperature").map((e) => Number(r(e).state)).filter((e) => !Number.isNaN(e)), s = n.filter((e) => N(e) === "climate");
	if (o.length || s.length) {
		let e = o.length ? o : s.map((e) => Number(r(e).attributes.current_temperature)).filter((e) => !Number.isNaN(e));
		if (e.length) {
			let t = Math.round(Math.min(...e)), n = Math.round(Math.max(...e)), a = s.filter((e) => ["heating", "cooling"].includes(r(e).attributes.hvac_action)).length;
			i.push({
				key: "climate",
				icon: "mdi:thermometer",
				label: "Climate",
				value: (t === n ? `${t}°` : `${t}–${n}°`) + (a ? ` · ${a} running` : "")
			});
		}
	}
	let c = n.filter((e) => N(e) === "light" && Yt(r(e)));
	n.some((e) => N(e) === "light") && i.push({
		key: "lights",
		icon: c.length ? "mdi:lightbulb-group" : "mdi:lightbulb-group-off-outline",
		label: "Lights",
		value: c.length ? `${c.length} on` : "All off",
		tone: c.length ? "on" : void 0,
		onTap: c.length ? () => $o.value = c : void 0
	});
	let l = n.filter((e) => N(e) === "lock" && r(e).state !== "locked"), u = n.find((e) => N(e) === "alarm_control_panel"), d = n.filter((e) => N(e) === "binary_sensor" && r(e).state === "on" && [
		"door",
		"window",
		"garage_door",
		"opening"
	].includes(r(e).attributes.device_class)), f = n.filter((e) => N(e) === "cover" && r(e).attributes.device_class === "garage" && r(e).state !== "closed");
	if (l.length || u || d.length || f.length || n.some((e) => N(e) === "lock")) {
		let n = [];
		l.length && n.push(`${l.length} unlocked`), d.length + f.length && n.push(`${d.length + f.length} open`), n.length || n.push(u ? I(e, r(u)) : "Locked"), i.push({
			key: "security",
			icon: l.length || d.length || f.length ? "mdi:shield-alert" : "mdi:shield-check",
			label: "Security",
			value: n.join(" · "),
			tone: l.length || d.length || f.length ? "warn" : void 0,
			onTap: t.builtinPages.security ? a({ type: "security" }) : void 0
		});
	}
	let p = n.filter((e) => N(e) === "media_player" && r(e).state === "playing");
	p.length && i.push({
		key: "media",
		icon: "mdi:play-circle",
		label: "Playing",
		value: p.length === 1 ? r(p[0]).attributes.media_title ?? F(e, p[0]) : `${p.length} speakers`,
		tone: "on",
		onTap: t.builtinPages.media ? a({ type: "media" }) : void 0
	});
	let m = Ro.value?.active;
	if (m) {
		let t = Math.max(0, Math.ceil((new Date(m.ends_at).getTime() - Date.now()) / 6e4));
		i.push({
			key: "water",
			icon: "mdi:sprinkler-variant",
			label: "Watering",
			value: `${F(e, m.entity_id)} · ${t} min`,
			tone: "on",
			onTap: a({ type: "irrigation" })
		});
	}
	return i;
}
function ns({ cfg: e }) {
	let t = L.value, n = ts(t, e);
	return n.length ? /* @__PURE__ */ U("div", {
		class: "summary",
		children: n.map((e) => /* @__PURE__ */ U("button", {
			type: "button",
			class: `summary-chip ${e.tone ?? ""}`,
			onClick: e.onTap,
			disabled: !e.onTap,
			children: [/* @__PURE__ */ U(W, {
				icon: e.icon,
				size: 22
			}), /* @__PURE__ */ U("span", {
				class: "summary-text",
				children: [/* @__PURE__ */ U("span", {
					class: "summary-label",
					children: e.label
				}), /* @__PURE__ */ U("span", {
					class: "summary-value",
					children: e.value
				})]
			})]
		}))
	}) : null;
}
function rs() {
	let e = $o.value, t = L.value;
	if (!e || !t) return null;
	let n = () => $o.value = null;
	return /* @__PURE__ */ U(Y, {
		title: `Turn off ${e.length} ${e.length === 1 ? "light" : "lights"}?`,
		onClose: n,
		footer: /* @__PURE__ */ U(S, { children: [/* @__PURE__ */ U(K, {
			kind: "ghost",
			onClick: n,
			children: "Cancel"
		}), /* @__PURE__ */ U(K, {
			kind: "primary",
			icon: "mdi:lightbulb-off",
			onClick: () => {
				H("light", "turn_off", { entity_id: e }), n();
			},
			children: "Turn off"
		})] }),
		children: /* @__PURE__ */ U("ul", {
			class: "plain-list",
			children: e.map((e) => /* @__PURE__ */ U("li", { children: F(t, e) }))
		})
	});
}
function is({ s: e }) {
	let t = L.value, n = Xo(t, e), r = n.some((e) => Yt(t.states[e])), i = Yo(t, e), a = e.background ? `background-image:linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.55)),url("${e.background.replace(/["\\]/g, "")}")` : void 0;
	return /* @__PURE__ */ U("div", {
		class: `room-card ${e.background ? "has-bg" : ""} ${r ? "lit" : ""}`,
		style: a,
		role: "button",
		tabIndex: 0,
		onClick: () => B.value = {
			type: "section",
			id: e.id
		},
		onKeyDown: (t) => (t.key === "Enter" || t.key === " ") && (B.value = {
			type: "section",
			id: e.id
		}),
		children: [/* @__PURE__ */ U("div", {
			class: "room-card-top",
			children: [/* @__PURE__ */ U("span", {
				class: "room-card-icon",
				children: /* @__PURE__ */ U(W, {
					icon: e.icon,
					size: 24
				})
			}), n.length > 0 && /* @__PURE__ */ U(G, {
				icon: r ? "mdi:lightbulb-on" : "mdi:lightbulb-outline",
				label: r ? `Turn off ${e.name} lights` : `Turn on ${e.name} lights`,
				active: r,
				onClick: () => Zo(t, n)
			})]
		}), /* @__PURE__ */ U("div", { children: [/* @__PURE__ */ U("div", {
			class: "room-card-name",
			children: e.name
		}), /* @__PURE__ */ U("div", {
			class: "room-card-status",
			children: i || `${Jo(e).length} devices`
		})] })]
	});
}
function as({ cfg: e, renderCards: t }) {
	let n = L.value, r = e.home.favorites ? es(e).filter((e) => e.favorite && n.states[e.entity]) : [], i = e.sections.filter((e) => e.kind === "room"), a = e.sections.filter((e) => e.kind === "page"), o = Ko(n, i), s = o.length > 1 || o[0]?.id !== null;
	return /* @__PURE__ */ U("div", {
		class: "home-view",
		children: [
			e.home.summary && /* @__PURE__ */ U(ns, { cfg: e }),
			r.length > 0 && /* @__PURE__ */ U("section", {
				class: "home-block",
				children: [/* @__PURE__ */ U("h2", {
					class: "section-title",
					children: [/* @__PURE__ */ U(W, {
						icon: "mdi:star",
						size: 20
					}), " Favourites"]
				}), t(r)]
			}),
			e.home.rooms && o.map((e) => /* @__PURE__ */ U("section", {
				class: "home-block",
				children: [s && /* @__PURE__ */ U("h2", {
					class: "section-title floor-title",
					children: [
						/* @__PURE__ */ U(W, {
							icon: e.icon,
							size: 20
						}),
						" ",
						e.name
					]
				}), /* @__PURE__ */ U("div", {
					class: "room-grid",
					children: e.sections.map((e) => /* @__PURE__ */ U(is, { s: e }))
				})]
			})),
			e.home.rooms && a.length > 0 && /* @__PURE__ */ U("section", {
				class: "home-block",
				children: [/* @__PURE__ */ U("h2", {
					class: "section-title",
					children: [/* @__PURE__ */ U(W, {
						icon: "mdi:view-dashboard",
						size: 20
					}), " Pages"]
				}), /* @__PURE__ */ U("div", {
					class: "room-grid",
					children: a.map((e) => /* @__PURE__ */ U(is, { s: e }))
				})]
			}),
			!r.length && e.home.favorites && /* @__PURE__ */ U("p", {
				class: "muted small home-hint",
				children: [/* @__PURE__ */ U(W, {
					icon: "mdi:star-outline",
					size: 16
				}), " Tip: in edit mode, tap a card and turn on “Show on Home” to pin it here."]
			})
		]
	});
}
// src/components/steps.tsx
function os(e, t) {
	return (n) => {
		let r = ke(e());
		n(r), t(r);
	};
}
var ss = [
	[/kitchen/i, "mdi:stove"],
	[/living|lounge|family/i, "mdi:sofa"],
	[/bed|master|guest room/i, "mdi:bed"],
	[/bath|ensuite|toilet|washroom|powder/i, "mdi:shower"],
	[/office|study|den/i, "mdi:desk"],
	[/garage/i, "mdi:garage"],
	[/garden|yard|patio|deck|outdoor|outside|porch/i, "mdi:tree"],
	[/dining/i, "mdi:silverware-fork-knife"],
	[/basement|stairs/i, "mdi:stairs"],
	[/laundry|utility/i, "mdi:washing-machine"],
	[/kid|nursery|baby|child/i, "mdi:baby-carriage"],
	[/gym|workout|fitness/i, "mdi:dumbbell"],
	[/entry|hall|foyer|mudroom/i, "mdi:door"],
	[/media|theat|tv/i, "mdi:television"],
	[/server|network|rack/i, "mdi:server"]
], cs = (e) => ss.find(([t]) => t.test(e))?.[1] ?? "mdi:home";
function ls(e, t, n, r) {
	let i = je("room", n, r || cs(n), t);
	return i.cards = pn(e, t).filter((t) => _n(e, t)).map((e) => Ae(e, bn(e))), i;
}
function us(e, t) {
	if (t.sections.length) return;
	let n = e.floors ?? {}, r = Object.values(e.areas ?? {}).sort((e, t) => (n[e.floor_id ?? ""]?.level ?? 99) - (n[t.floor_id ?? ""]?.level ?? 99) || e.name.localeCompare(t.name));
	for (let n of r) pn(e, n.area_id).length && t.sections.push(ls(e, n.area_id, n.name, n.icon));
	let i = Object.keys(e.states).find((e) => N(e) === "weather");
	i && (t.header.weatherEntity = i);
}
function ds({ cfg: e, set: t }) {
	return /* @__PURE__ */ U("div", {
		class: "step",
		children: [
			/* @__PURE__ */ U("p", {
				class: "lead",
				children: "DashForge builds a dashboard around the way you use your home. Each step asks you one thing; nothing is decided for you, and you can change all of it later in Settings or edit mode."
			}),
			/* @__PURE__ */ U(X, {
				label: "Dashboard name",
				children: /* @__PURE__ */ U(Z, {
					value: e.title,
					onInput: (e) => t((t) => t.title = e),
					placeholder: "Home"
				})
			}),
			/* @__PURE__ */ U(X, {
				label: "Your name",
				hint: "Used for the greeting. Optional.",
				children: /* @__PURE__ */ U(Z, {
					value: e.userName,
					onInput: (e) => t((t) => t.userName = e),
					placeholder: "Alex"
				})
			}),
			/* @__PURE__ */ U(Q, {
				label: "Show a greeting",
				hint: "“Good morning, Alex” instead of the dashboard name",
				children: /* @__PURE__ */ U(q, {
					checked: e.header.greeting,
					onChange: (e) => t((t) => t.header.greeting = e)
				})
			})
		]
	});
}
function fs({ cfg: e, set: t }) {
	let n = L.value, [r, i] = O(null), [a, o] = O(""), s = e.sections.filter((e) => e.kind === "room"), c = new Set(s.map((e) => e.areaId).filter(Boolean)), l = Object.values(n.areas ?? {}).filter((e) => !c.has(e.area_id)).sort((e, t) => e.name.localeCompare(t.name)), u = (e, n) => t((t) => {
		let r = t.sections.findIndex((t) => t.id === e), i = r + n;
		for (; i >= 0 && i < t.sections.length && t.sections[i].kind !== "room";) i += n;
		i < 0 || i >= t.sections.length || ([t.sections[r], t.sections[i]] = [t.sections[i], t.sections[r]]);
	});
	return /* @__PURE__ */ U("div", {
		class: "step",
		children: [
			/* @__PURE__ */ U("p", {
				class: "lead",
				children: "Which rooms should be on your dashboard, and in what order? Areas from Home Assistant that have devices are suggested; remove any you don't want."
			}),
			/* @__PURE__ */ U("div", {
				class: "labeled-label",
				children: [
					"Your rooms (",
					s.length,
					")"
				]
			}),
			s.length === 0 && /* @__PURE__ */ U("p", {
				class: "muted",
				children: "No rooms yet. Add one below."
			}),
			Ko(n, s).map((e) => /* @__PURE__ */ U("div", {
				class: "room-list",
				children: [(e.id !== null || Object.keys(n.floors ?? {}).length > 0) && /* @__PURE__ */ U("div", {
					class: "floor-label",
					children: [
						/* @__PURE__ */ U(W, {
							icon: e.icon,
							size: 18
						}),
						" ",
						e.name
					]
				}), e.sections.map((e) => {
					let a = s.indexOf(e);
					return /* @__PURE__ */ U("div", {
						class: "room-item",
						children: [
							/* @__PURE__ */ U("div", {
								class: "room-row",
								children: [
									/* @__PURE__ */ U("button", {
										type: "button",
										class: "icon-choice",
										"aria-label": "Change icon",
										onClick: () => i(r === e.id ? null : e.id),
										children: /* @__PURE__ */ U(W, { icon: e.icon })
									}),
									/* @__PURE__ */ U("input", {
										class: "input",
										value: e.name,
										"aria-label": "Room name",
										onInput: (n) => {
											let r = n.target.value;
											t((t) => t.sections.find((t) => t.id === e.id).name = r);
										}
									}),
									/* @__PURE__ */ U("span", {
										class: "muted small nowrap",
										children: e.areaId ? n.areas?.[e.areaId]?.name ?? "" : "Custom"
									}),
									/* @__PURE__ */ U(G, {
										icon: "mdi:arrow-up",
										label: "Move up",
										disabled: a === 0,
										onClick: () => u(e.id, -1)
									}),
									/* @__PURE__ */ U(G, {
										icon: "mdi:arrow-down",
										label: "Move down",
										disabled: a === s.length - 1,
										onClick: () => u(e.id, 1)
									}),
									/* @__PURE__ */ U(G, {
										icon: "mdi:close",
										label: `Remove ${e.name}`,
										onClick: () => t((t) => t.sections = t.sections.filter((t) => t.id !== e.id))
									})
								]
							}),
							Object.keys(n.floors ?? {}).length > 0 && /* @__PURE__ */ U("select", {
								class: "input floor-select",
								"aria-label": `Floor for ${e.name}`,
								value: e.floorId ?? "",
								onChange: (n) => {
									let r = n.target.value || void 0;
									t((t) => t.sections.find((t) => t.id === e.id).floorId = r);
								},
								children: [/* @__PURE__ */ U("option", {
									value: "",
									children: e.areaId && n.areas?.[e.areaId]?.floor_id ? "Floor: same as area" : "No floor"
								}), Object.values(n.floors ?? {}).sort((e, t) => (e.level ?? 0) - (t.level ?? 0)).map((e) => /* @__PURE__ */ U("option", {
									value: e.floor_id,
									children: ["Floor: ", e.name]
								}))]
							}),
							r === e.id && /* @__PURE__ */ U(La, {
								value: e.icon,
								onChange: (n) => t((t) => t.sections.find((t) => t.id === e.id).icon = n)
							})
						]
					});
				})]
			})),
			l.length > 0 && /* @__PURE__ */ U(S, { children: [/* @__PURE__ */ U("div", {
				class: "labeled-label",
				children: "Add an area from Home Assistant"
			}), /* @__PURE__ */ U("div", {
				class: "chips",
				children: l.map((e) => /* @__PURE__ */ U("button", {
					type: "button",
					class: "chip",
					onClick: () => t((t) => t.sections.push(ls(n, e.area_id, e.name, e.icon))),
					children: [
						/* @__PURE__ */ U(W, {
							icon: "mdi:plus",
							size: 16
						}),
						" ",
						e.name,
						/* @__PURE__ */ U("span", {
							class: "muted small",
							children: pn(n, e.area_id).length
						})
					]
				}))
			})] }),
			/* @__PURE__ */ U("div", {
				class: "labeled-label",
				children: "Or add a room by name"
			}),
			/* @__PURE__ */ U("form", {
				class: "inline-form",
				onSubmit: (e) => {
					e.preventDefault(), a.trim() && (t((e) => e.sections.push(je("room", a.trim(), cs(a)))), o(""));
				},
				children: [/* @__PURE__ */ U(Z, {
					value: a,
					onInput: o,
					placeholder: "e.g. Back yard"
				}), /* @__PURE__ */ U(K, {
					icon: "mdi:plus",
					disabled: !a.trim(),
					onClick: () => {
						t((e) => e.sections.push(je("room", a.trim(), cs(a)))), o("");
					},
					children: "Add room"
				})]
			})
		]
	});
}
var ps = {
	sm: "Small",
	md: "Medium",
	lg: "Large",
	wide: "Wide"
};
function ms({ cfg: e, set: t }) {
	let n = L.value, r = e.sections.filter((e) => e.kind === "room"), [i, a] = O(r[0]?.id ?? null), [o, s] = O(null), c = mn(n).length, l = (e, n) => t((t) => {
		let r = t.sections.find((t) => t.id === e);
		r.cards.some((e) => e.entity === n) ? r.cards = r.cards.filter((e) => e.entity !== n) : r.cards.push(Ae(n, bn(n)));
	});
	return r.length ? /* @__PURE__ */ U("div", {
		class: "step",
		children: [
			/* @__PURE__ */ U("p", {
				class: "lead",
				children: "Pick the devices for each room. Suggestions are ticked; untick anything you don't want, choose a card size, or add devices from anywhere in your home."
			}),
			c > 0 && /* @__PURE__ */ U("p", {
				class: "muted small",
				children: [
					/* @__PURE__ */ U(W, {
						icon: "mdi:information-outline",
						size: 16
					}),
					" ",
					c,
					" devices aren't in any Home Assistant area. Use “Add other devices” to place them."
				]
			}),
			/* @__PURE__ */ U("div", {
				class: "accordion",
				children: r.map((e) => {
					let r = e.areaId ? pn(n, e.areaId) : [], o = e.cards.map((e) => e.entity).filter((e) => !r.includes(e)), c = [...r, ...o], u = /* @__PURE__ */ new Map();
					for (let e of c) {
						let t = xn[N(e)] ?? N(e);
						u.set(t, [...u.get(t) ?? [], e]);
					}
					let d = i === e.id;
					return /* @__PURE__ */ U("div", {
						class: `acc-item ${d ? "open" : ""}`,
						children: [/* @__PURE__ */ U("button", {
							type: "button",
							class: "acc-head",
							"aria-expanded": d,
							onClick: () => a(d ? null : e.id),
							children: [
								/* @__PURE__ */ U(W, { icon: e.icon }),
								/* @__PURE__ */ U("span", {
									class: "acc-title",
									children: e.name
								}),
								/* @__PURE__ */ U("span", {
									class: "muted small",
									children: [e.cards.length, " selected"]
								}),
								/* @__PURE__ */ U(W, { icon: d ? "mdi:chevron-up" : "mdi:chevron-down" })
							]
						}), d && /* @__PURE__ */ U("div", {
							class: "acc-body",
							children: [
								/* @__PURE__ */ U("div", {
									class: "btn-row",
									children: [
										/* @__PURE__ */ U(K, {
											kind: "ghost",
											onClick: () => t((t) => {
												let n = t.sections.find((t) => t.id === e.id);
												for (let e of c) n.cards.some((t) => t.entity === e) || n.cards.push(Ae(e, bn(e)));
											}),
											children: "Select all"
										}),
										/* @__PURE__ */ U(K, {
											kind: "ghost",
											onClick: () => t((t) => t.sections.find((t) => t.id === e.id).cards = []),
											children: "Clear"
										}),
										/* @__PURE__ */ U(K, {
											icon: "mdi:plus",
											onClick: () => s(e.id),
											children: "Add other devices"
										})
									]
								}),
								c.length === 0 && /* @__PURE__ */ U("p", {
									class: "muted",
									children: "No devices in this area yet. Use “Add other devices”."
								}),
								[...u.entries()].map(([r, i]) => /* @__PURE__ */ U("div", {
									class: "entity-group",
									children: [/* @__PURE__ */ U("div", {
										class: "labeled-label",
										children: r
									}), i.map((r) => {
										let i = e.cards.find((e) => e.entity === r);
										return /* @__PURE__ */ U("div", {
											class: "device-line",
											children: [/* @__PURE__ */ U(Ga, {
												id: r,
												room: e.name,
												selected: !!i,
												onToggle: () => l(e.id, r)
											}), i && /* @__PURE__ */ U("select", {
												class: "input size-select",
												"aria-label": `Card size for ${F(n, r)}`,
												value: i.size,
												onChange: (n) => {
													let i = n.target.value;
													t((t) => t.sections.find((t) => t.id === e.id).cards.find((e) => e.entity === r).size = i);
												},
												children: Object.keys(ps).map((e) => /* @__PURE__ */ U("option", {
													value: e,
													children: ps[e]
												}))
											})]
										});
									})]
								}))
							]
						})]
					});
				})
			}),
			o && /* @__PURE__ */ U(Y, {
				title: `Add to ${r.find((e) => e.id === o)?.name}`,
				onClose: () => s(null),
				wide: !0,
				footer: /* @__PURE__ */ U(K, {
					kind: "primary",
					onClick: () => s(null),
					children: "Done"
				}),
				children: /* @__PURE__ */ U(Wa, {
					autofocus: !0,
					isSelected: (t) => !!e.sections.find((e) => e.id === o)?.cards.some((e) => e.entity === t),
					onToggle: (e) => l(o, e)
				})
			})
		]
	}) : /* @__PURE__ */ U("p", {
		class: "muted",
		children: "Add a room on the previous step first."
	});
}
function hs({ cfg: e, set: t }) {
	let n = L.value, r = Object.keys(n.states).filter((e) => N(e) === "media_player").sort();
	return /* @__PURE__ */ U("div", {
		class: "step",
		children: [
			/* @__PURE__ */ U("p", {
				class: "lead",
				children: "Scenes and scripts you pick here appear as one-tap buttons along the top of the dashboard."
			}),
			/* @__PURE__ */ U("div", {
				class: "labeled-label",
				children: [
					"Quick scenes (",
					e.header.sceneStrip.length,
					")"
				]
			}),
			/* @__PURE__ */ U("div", {
				class: "picker-box",
				children: /* @__PURE__ */ U(Wa, {
					domains: ["scene", "script"],
					isSelected: (t) => e.header.sceneStrip.includes(t),
					onToggle: (e) => t((t) => {
						let n = t.header.sceneStrip;
						t.header.sceneStrip = n.includes(e) ? n.filter((t) => t !== e) : [...n, e];
					})
				})
			}),
			/* @__PURE__ */ U(X, {
				label: "Main media player",
				hint: "Shown in the header while it plays, and first on the Media page. Works with Spotify, Sonos, Cast and any other media player.",
				children: /* @__PURE__ */ U("select", {
					class: "input",
					value: e.header.mediaPlayer ?? "",
					onChange: (e) => t((t) => t.header.mediaPlayer = e.target.value || void 0),
					children: [/* @__PURE__ */ U("option", {
						value: "",
						children: "None"
					}), r.map((e) => /* @__PURE__ */ U("option", {
						value: e,
						children: F(n, e)
					}))]
				})
			})
		]
	});
}
function gs({ domain: e, value: t, onChange: n, empty: r }) {
	let i = L.value, a = Object.keys(i.states).filter((t) => N(t) === e).sort();
	return a.length ? /* @__PURE__ */ U("div", {
		class: "check-list",
		children: a.map((e) => /* @__PURE__ */ U("label", {
			class: "check-item",
			children: [/* @__PURE__ */ U(Fa, {
				checked: t.includes(e),
				onChange: (r) => n(r ? [...t, e] : t.filter((t) => t !== e))
			}), /* @__PURE__ */ U("span", { children: F(i, e) })]
		}))
	}) : /* @__PURE__ */ U("p", {
		class: "muted small",
		children: r
	});
}
function _s({ cfg: e, set: t }) {
	let n = L.value, r = Object.keys(n.states).filter((e) => N(e) === "weather"), i = e.header.weatherEntity ?? (e.header.weatherFallback ? "__open_meteo" : "");
	return /* @__PURE__ */ U("div", {
		class: "step",
		children: [
			/* @__PURE__ */ U("p", {
				class: "lead",
				children: "Choose what the top of your dashboard shows."
			}),
			/* @__PURE__ */ U(Q, {
				label: "Clock",
				children: /* @__PURE__ */ U(q, {
					checked: e.header.clock,
					onChange: (e) => t((t) => t.header.clock = e)
				})
			}),
			e.header.clock && /* @__PURE__ */ U(Q, {
				label: "24-hour time",
				children: /* @__PURE__ */ U(q, {
					checked: e.header.clock24h,
					onChange: (e) => t((t) => t.header.clock24h = e)
				})
			}),
			/* @__PURE__ */ U(Q, {
				label: "Date",
				children: /* @__PURE__ */ U(q, {
					checked: e.header.showDate,
					onChange: (e) => t((t) => t.header.showDate = e)
				})
			}),
			/* @__PURE__ */ U(X, {
				label: "Weather",
				hint: "Tap the weather in the header to see the hourly and 7-day forecast.",
				children: /* @__PURE__ */ U("select", {
					class: "input",
					value: i,
					onChange: (e) => {
						let n = e.target.value;
						t((e) => {
							e.header.weatherEntity = n && n !== "__open_meteo" ? n : void 0, e.header.weatherFallback = n === "__open_meteo";
						});
					},
					children: [
						/* @__PURE__ */ U("option", {
							value: "",
							children: "No weather"
						}),
						r.map((e) => /* @__PURE__ */ U("option", {
							value: e,
							children: F(n, e)
						})),
						/* @__PURE__ */ U("option", {
							value: "__open_meteo",
							children: "Open-Meteo for my home location (internet)"
						})
					]
				})
			}),
			/* @__PURE__ */ U("div", {
				class: "labeled-label",
				children: "Calendars"
			}),
			/* @__PURE__ */ U(gs, {
				domain: "calendar",
				value: e.header.calendars,
				onChange: (e) => t((t) => t.header.calendars = e),
				empty: "No calendars in Home Assistant. Add one (Google, CalDAV, Local calendar…) to show events here."
			}),
			/* @__PURE__ */ U("div", {
				class: "labeled-label",
				children: "Reminders (to-do lists)"
			}),
			/* @__PURE__ */ U(gs, {
				domain: "todo",
				value: e.header.todoLists,
				onChange: (e) => t((t) => t.header.todoLists = e),
				empty: "No to-do lists in Home Assistant. Add the Local to-do or Shopping list integration to use reminders."
			})
		]
	});
}
var vs = [
	{
		id: "auto",
		name: "Auto",
		desc: "Recommended. One dashboard that fits every screen: tabs on phones and tablets, a side list on big screens."
	},
	{
		id: "grid",
		name: "Grid",
		desc: "Rooms as tabs along the top, cards in a grid. Great all-rounder."
	},
	{
		id: "sidebar",
		name: "Sidebar",
		desc: "Rooms in a side list with live status. Best on tablets and desktops."
	},
	{
		id: "list",
		name: "List",
		desc: "Every room on one scrolling page in compact rows. Best on phones."
	},
	{
		id: "focus",
		name: "Focus",
		desc: "One room at a time with big cards. Swipe between rooms. Best on wall tablets."
	}
];
function ys({ id: e }) {
	let t = (e, t, n = 14, r = 12) => /* @__PURE__ */ U("rect", {
		x: e,
		y: t,
		width: n,
		height: r,
		rx: "3",
		class: "pv-tile"
	});
	return /* @__PURE__ */ U("svg", {
		viewBox: "0 0 100 64",
		class: "layout-preview",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ U("rect", {
				x: "0",
				y: "0",
				width: "100",
				height: "64",
				rx: "6",
				class: "pv-bg"
			}),
			e === "auto" && /* @__PURE__ */ U(S, { children: [
				/* @__PURE__ */ U("rect", {
					x: "6",
					y: "10",
					width: "20",
					height: "44",
					rx: "3",
					class: "pv-tile"
				}),
				/* @__PURE__ */ U("rect", {
					x: "9",
					y: "16",
					width: "14",
					height: "6",
					rx: "1.5",
					class: "pv-accent"
				}),
				/* @__PURE__ */ U("rect", {
					x: "9",
					y: "25",
					width: "14",
					height: "6",
					rx: "1.5",
					class: "pv-bg"
				}),
				/* @__PURE__ */ U("rect", {
					x: "32",
					y: "8",
					width: "62",
					height: "48",
					rx: "4",
					class: "pv-tile"
				}),
				/* @__PURE__ */ U("rect", {
					x: "36",
					y: "12",
					width: "14",
					height: "5",
					rx: "2",
					class: "pv-accent"
				}),
				[
					0,
					1,
					2
				].map((e) => /* @__PURE__ */ U("rect", {
					x: 36 + e * 19,
					y: "21",
					width: "16",
					height: "12",
					rx: "2",
					class: "pv-bg"
				})),
				[
					0,
					1,
					2
				].map((e) => /* @__PURE__ */ U("rect", {
					x: 36 + e * 19,
					y: "36",
					width: "16",
					height: "12",
					rx: "2",
					class: "pv-bg"
				}))
			] }),
			e === "grid" && /* @__PURE__ */ U(S, { children: [
				/* @__PURE__ */ U("rect", {
					x: "6",
					y: "6",
					width: "18",
					height: "6",
					rx: "3",
					class: "pv-accent"
				}),
				/* @__PURE__ */ U("rect", {
					x: "27",
					y: "6",
					width: "14",
					height: "6",
					rx: "3",
					class: "pv-tile"
				}),
				/* @__PURE__ */ U("rect", {
					x: "44",
					y: "6",
					width: "14",
					height: "6",
					rx: "3",
					class: "pv-tile"
				}),
				[
					0,
					1,
					2,
					3,
					4
				].map((e) => t(6 + e * 18, 18)),
				[
					0,
					1,
					2,
					3,
					4
				].map((e) => t(6 + e * 18, 34)),
				t(6, 50, 32, 8)
			] }),
			e === "sidebar" && /* @__PURE__ */ U(S, { children: [
				/* @__PURE__ */ U("rect", {
					x: "5",
					y: "5",
					width: "24",
					height: "54",
					rx: "4",
					class: "pv-tile"
				}),
				/* @__PURE__ */ U("rect", {
					x: "8",
					y: "9",
					width: "18",
					height: "5",
					rx: "2",
					class: "pv-accent"
				}),
				/* @__PURE__ */ U("rect", {
					x: "8",
					y: "17",
					width: "18",
					height: "5",
					rx: "2",
					class: "pv-bg"
				}),
				/* @__PURE__ */ U("rect", {
					x: "8",
					y: "25",
					width: "18",
					height: "5",
					rx: "2",
					class: "pv-bg"
				}),
				[
					0,
					1,
					2,
					3
				].map((e) => t(34 + e * 16, 8, 13)),
				[
					0,
					1,
					2,
					3
				].map((e) => t(34 + e * 16, 24, 13)),
				t(34, 40, 29, 18)
			] }),
			e === "list" && [
				0,
				1,
				2,
				3,
				4,
				5
			].map((e) => /* @__PURE__ */ U("rect", {
				x: "6",
				y: 6 + e * 9.5,
				width: e % 3 == 0 ? 40 : 88,
				height: e % 3 == 0 ? 4 : 7,
				rx: "2",
				class: e % 3 == 0 ? "pv-accent" : "pv-tile"
			})),
			e === "focus" && /* @__PURE__ */ U(S, { children: [
				/* @__PURE__ */ U("rect", {
					x: "34",
					y: "5",
					width: "32",
					height: "6",
					rx: "3",
					class: "pv-accent"
				}),
				t(8, 16, 26, 20),
				t(37, 16, 26, 20),
				t(66, 16, 26, 20),
				t(8, 39, 41, 20),
				t(52, 39, 40, 20)
			] })
		]
	});
}
function bs({ cfg: e, set: t }) {
	return /* @__PURE__ */ U("div", {
		class: "step",
		children: [
			/* @__PURE__ */ U("p", {
				class: "lead",
				children: "How should your rooms be arranged? Every screen follows the layout you pick."
			}),
			/* @__PURE__ */ U("div", {
				class: "choice-grid",
				children: vs.map((n) => /* @__PURE__ */ U("button", {
					type: "button",
					class: `choice ${e.layout === n.id ? "selected" : ""}`,
					"aria-pressed": e.layout === n.id,
					onClick: () => t((e) => e.layout = n.id),
					children: [
						/* @__PURE__ */ U(ys, { id: n.id }),
						/* @__PURE__ */ U("strong", { children: n.name }),
						/* @__PURE__ */ U("span", {
							class: "muted small",
							children: n.desc
						})
					]
				}))
			}),
			/* @__PURE__ */ U(X, {
				label: "Navigation",
				hint: "How you move between rooms. Auto uses tabs on phones and tablets and a side list on big screens.",
				children: /* @__PURE__ */ U(Pa, {
					value: e.theme.nav ?? "auto",
					options: [
						{
							value: "auto",
							label: "Auto"
						},
						{
							value: "tabs",
							label: "Tabs on top"
						},
						{
							value: "side",
							label: "Side list"
						},
						{
							value: "dock",
							label: "Bottom dock"
						}
					],
					onChange: (e) => t((t) => t.theme.nav = e)
				})
			}),
			/* @__PURE__ */ U(X, {
				label: "Card spacing",
				children: /* @__PURE__ */ U(Pa, {
					value: e.theme.density,
					options: [{
						value: "comfortable",
						label: "Comfortable"
					}, {
						value: "compact",
						label: "Compact"
					}],
					onChange: (e) => t((t) => t.theme.density = e)
				})
			})
		]
	});
}
function xs({ id: e }) {
	return e === "vivid" ? /* @__PURE__ */ U("svg", {
		viewBox: "0 0 100 64",
		class: "layout-preview",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ U("defs", { children: [
				["#fbbf24", "#f97316"],
				["#22d3ee", "#3b82f6"],
				["#a855f7", "#ec4899"]
			].map(([e, t], n) => /* @__PURE__ */ U("linearGradient", {
				id: `pv-v${n}`,
				x1: "0",
				y1: "0",
				x2: "1",
				y2: "1",
				children: [/* @__PURE__ */ U("stop", {
					offset: "0",
					"stop-color": e
				}), /* @__PURE__ */ U("stop", {
					offset: "1",
					"stop-color": t
				})]
			})) }),
			/* @__PURE__ */ U("rect", {
				width: "100",
				height: "64",
				rx: "6",
				fill: "#121319"
			}),
			/* @__PURE__ */ U("rect", {
				x: "6",
				y: "7",
				width: "27",
				height: "23",
				rx: "5",
				fill: "url(#pv-v0)"
			}),
			/* @__PURE__ */ U("rect", {
				x: "36",
				y: "7",
				width: "27",
				height: "23",
				rx: "5",
				fill: "#1c1e26"
			}),
			/* @__PURE__ */ U("rect", {
				x: "66",
				y: "7",
				width: "28",
				height: "23",
				rx: "5",
				fill: "url(#pv-v1)"
			}),
			/* @__PURE__ */ U("rect", {
				x: "6",
				y: "34",
				width: "57",
				height: "23",
				rx: "5",
				fill: "url(#pv-v2)"
			}),
			/* @__PURE__ */ U("rect", {
				x: "66",
				y: "34",
				width: "28",
				height: "23",
				rx: "5",
				fill: "#1c1e26"
			}),
			/* @__PURE__ */ U("circle", {
				cx: "13",
				cy: "14",
				r: "3.5",
				fill: "rgba(255,255,255,.45)"
			}),
			/* @__PURE__ */ U("circle", {
				cx: "43",
				cy: "14",
				r: "3.5",
				fill: "#22c55e",
				opacity: ".7"
			}),
			/* @__PURE__ */ U("circle", {
				cx: "73",
				cy: "14",
				r: "3.5",
				fill: "rgba(255,255,255,.45)"
			}),
			/* @__PURE__ */ U("path", {
				d: "M69 52 L74 47 L78 50 L83 42 L90 45",
				fill: "none",
				stroke: "#38bdf8",
				"stroke-width": "1.6"
			})
		]
	}) : e === "apple" ? /* @__PURE__ */ U("svg", {
		viewBox: "0 0 100 64",
		class: "layout-preview",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ U("defs", { children: /* @__PURE__ */ U("linearGradient", {
				id: "pv-apple",
				x1: "0",
				y1: "0",
				x2: "1",
				y2: "1",
				children: [/* @__PURE__ */ U("stop", {
					offset: "0",
					"stop-color": "#f7c9b0"
				}), /* @__PURE__ */ U("stop", {
					offset: "1",
					"stop-color": "#b9c6ee"
				})]
			}) }),
			/* @__PURE__ */ U("rect", {
				width: "100",
				height: "64",
				rx: "6",
				fill: "url(#pv-apple)"
			}),
			/* @__PURE__ */ U("rect", {
				x: "6",
				y: "6",
				width: "34",
				height: "5",
				rx: "2",
				fill: "#1c1c1e",
				opacity: ".75"
			}),
			[
				0,
				1,
				2
			].map((e) => [0, 1].map((t) => /* @__PURE__ */ U("g", { children: [
				/* @__PURE__ */ U("rect", {
					x: 6 + t * 45,
					y: 16 + e * 15,
					width: "42",
					height: "12",
					rx: "4",
					fill: e === 0 && t === 0 ? "#fff" : "rgba(255,255,255,.45)"
				}),
				/* @__PURE__ */ U("circle", {
					cx: 12 + t * 45,
					cy: 22 + e * 15,
					r: "3.2",
					fill: e === 0 && t === 0 ? "#ff9f0a" : "rgba(60,60,67,.35)"
				}),
				/* @__PURE__ */ U("rect", {
					x: 18 + t * 45,
					y: 20 + e * 15,
					width: "18",
					height: "2.5",
					rx: "1",
					fill: "#1c1c1e",
					opacity: ".6"
				})
			] })))
		]
	}) : e === "homey" ? /* @__PURE__ */ U("svg", {
		viewBox: "0 0 100 64",
		class: "layout-preview",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ U("rect", {
			width: "100",
			height: "64",
			rx: "6",
			fill: "#121318"
		}), [
			"#f5b400",
			"#22c55e",
			"#f97316",
			"#3b82f6",
			"#a855f7",
			"#ef4444"
		].map((e, t) => /* @__PURE__ */ U("g", { children: [
			/* @__PURE__ */ U("rect", {
				x: 6 + t % 3 * 30,
				y: 7 + Math.floor(t / 3) * 28,
				width: "27",
				height: "24",
				rx: "5",
				fill: "#1e2027"
			}),
			/* @__PURE__ */ U("circle", {
				cx: 19.5 + t % 3 * 30,
				cy: 16 + Math.floor(t / 3) * 28,
				r: "5",
				fill: t < 3 ? e : "none",
				stroke: e,
				"stroke-width": "1.4"
			}),
			/* @__PURE__ */ U("rect", {
				x: 13 + t % 3 * 30,
				y: 24 + Math.floor(t / 3) * 28,
				width: "13",
				height: "2",
				rx: "1",
				fill: "#e5e7eb",
				opacity: ".7"
			})
		] }))]
	}) : e === "minimal" ? /* @__PURE__ */ U("svg", {
		viewBox: "0 0 100 64",
		class: "layout-preview",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ U("rect", {
			width: "100",
			height: "64",
			rx: "6",
			fill: "#fafafa"
		}), [
			0,
			1,
			2,
			3,
			4,
			5
		].map((e) => /* @__PURE__ */ U("rect", {
			x: 6 + e % 3 * 30,
			y: 8 + Math.floor(e / 3) * 27,
			width: "27",
			height: "23",
			rx: "3",
			fill: "#fff",
			stroke: e === 0 ? "#18181b" : "#e4e4e7"
		}))]
	}) : /* @__PURE__ */ U("svg", {
		viewBox: "0 0 100 64",
		class: "layout-preview",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ U("defs", { children: /* @__PURE__ */ U("linearGradient", {
				id: "pv-df",
				x1: "0",
				y1: "0",
				x2: "1",
				y2: "1",
				children: [
					/* @__PURE__ */ U("stop", {
						offset: "0",
						"stop-color": "#dbeafe"
					}),
					/* @__PURE__ */ U("stop", {
						offset: ".5",
						"stop-color": "#ede9fe"
					}),
					/* @__PURE__ */ U("stop", {
						offset: "1",
						"stop-color": "#fce7f3"
					})
				]
			}) }),
			/* @__PURE__ */ U("rect", {
				width: "100",
				height: "64",
				rx: "6",
				fill: "url(#pv-df)"
			}),
			[
				0,
				1,
				2,
				3,
				4,
				5
			].map((e) => /* @__PURE__ */ U("g", { children: [/* @__PURE__ */ U("rect", {
				x: 6 + e % 3 * 30,
				y: 8 + Math.floor(e / 3) * 27,
				width: "27",
				height: "23",
				rx: "5",
				fill: e === 1 ? "#dbe6fe" : "rgba(255,255,255,.75)"
			}), /* @__PURE__ */ U("circle", {
				cx: 13 + e % 3 * 30,
				cy: 15 + Math.floor(e / 3) * 27,
				r: "3.5",
				fill: e === 1 ? "#3b82f6" : "#e2e8f0"
			})] }))
		]
	});
}
function Ss({ id: e }) {
	let t = "#f59e0b", n = "var(--line)", r = (e, t, n, r, i, a = 4) => /* @__PURE__ */ U("rect", {
		x: e,
		y: t,
		width: n,
		height: r,
		rx: a,
		fill: i
	});
	return /* @__PURE__ */ U("svg", {
		viewBox: "0 0 100 60",
		class: "option-preview",
		"aria-hidden": "true",
		children: [
			e === "tiles" && [
				0,
				1,
				2,
				3,
				4,
				5
			].map((e) => /* @__PURE__ */ U("g", { children: [r(6 + e % 3 * 30, 6 + Math.floor(e / 3) * 26, 27, 22, e === 1 ? "color-mix(in srgb,#f59e0b 30%,transparent)" : n, 5), /* @__PURE__ */ U("circle", {
				cx: 13 + e % 3 * 30,
				cy: 13 + Math.floor(e / 3) * 26,
				r: "3.5",
				fill: e === 1 ? t : "var(--muted)"
			})] })),
			e === "rows" && [
				0,
				1,
				2,
				3
			].map((e) => /* @__PURE__ */ U("g", { children: [
				r(6, 6 + e * 13, 88, 10, e === 1 ? "color-mix(in srgb,#f59e0b 30%,transparent)" : n, 5),
				/* @__PURE__ */ U("circle", {
					cx: "13",
					cy: 11 + e * 13,
					r: "3.3",
					fill: e === 1 ? t : "var(--muted)"
				}),
				r(20, 10 + e * 13, 28, 2.4, "var(--muted)", 1)
			] })),
			e === "blocks" && [
				0,
				1,
				2,
				3,
				4,
				5
			].map((e) => /* @__PURE__ */ U("g", { children: [
				r(6 + e % 3 * 30, 6 + Math.floor(e / 3) * 26, 27, 22, e === 1 ? "#ffc21a" : e === 3 ? "#3156ff" : n, 6),
				/* @__PURE__ */ U("circle", {
					cx: 27 + e % 3 * 30,
					cy: 12 + Math.floor(e / 3) * 26,
					r: "3",
					fill: "none",
					stroke: e === 1 || e === 3 ? "#15171c" : "var(--muted)",
					"stroke-width": "1.6"
				}),
				r(9 + e % 3 * 30, 22 + Math.floor(e / 3) * 26, 14, 3, e === 1 || e === 3 ? "#15171c" : "var(--muted)", 1)
			] })),
			e === "dials" && [
				0,
				1,
				2
			].map((e) => /* @__PURE__ */ U("g", { children: [
				r(6, 6 + e * 17, 88, 14, n, 5),
				/* @__PURE__ */ U("circle", {
					cx: "15",
					cy: 13 + e * 17,
					r: "4.6",
					fill: "none",
					stroke: e === 0 ? "#ffb23e" : "var(--muted)",
					"stroke-width": "1.6"
				}),
				r(24, 12 + e * 17, 30, 2.4, "var(--muted)", 1)
			] })),
			e === "pills" && [
				0,
				1,
				2,
				3,
				4,
				5
			].map((e) => /* @__PURE__ */ U("g", { children: [r(6 + e % 2 * 45, 6 + Math.floor(e / 2) * 17, 42, 13, e === 0 ? "#ffffff" : n, 5), /* @__PURE__ */ U("circle", {
				cx: 13 + e % 2 * 45,
				cy: 12.5 + Math.floor(e / 2) * 17,
				r: "3",
				fill: e === 0 ? t : "var(--muted)"
			})] })),
			e === "squares" && [
				0,
				1,
				2,
				3,
				4,
				5
			].map((e) => /* @__PURE__ */ U("g", { children: [r(6 + e % 3 * 30, 6 + Math.floor(e / 3) * 26, 27, 22, n, 5), /* @__PURE__ */ U("circle", {
				cx: 19.5 + e % 3 * 30,
				cy: 15 + Math.floor(e / 3) * 26,
				r: "5",
				fill: e < 2 ? ["#f5b400", "#22c55e"][e] : "none",
				stroke: [
					"#f5b400",
					"#22c55e",
					"#f97316",
					"#3b82f6",
					"#a855f7",
					"#ef4444"
				][e],
				"stroke-width": "1.4"
			})] }))
		]
	});
}
var Cs = {
	gradient: {
		on: "linear-gradient(135deg,#fbbf24,#f97316)",
		off: "#1c1e26"
	},
	flat: {
		on: "#ffc21a",
		off: "#ffffff"
	},
	glow: {
		on: "radial-gradient(circle at 25% 50%,rgba(255,178,62,.35),#131a2c 60%)",
		off: "#131a2c",
		ring: "#ffb23e"
	},
	soft: {
		on: "linear-gradient(90deg,#fde7c2,#ffffff 75%)",
		off: "rgba(255,255,255,.7)"
	},
	white: {
		on: "#ffffff",
		off: "rgba(120,120,128,.35)"
	},
	tint: {
		on: "color-mix(in srgb,#f59e0b 26%,#ffffff)",
		off: "#ffffff"
	},
	ring: {
		on: "#1e2027",
		off: "#1e2027",
		ring: "#f5b400"
	},
	outline: {
		on: "#ffffff",
		off: "#ffffff",
		border: "#18181b"
	}
};
function ws({ id: e }) {
	let t = Cs[e];
	return /* @__PURE__ */ U("span", {
		class: "on-preview",
		children: [/* @__PURE__ */ U("span", {
			class: "on-tile",
			style: `background:${t.off};`
		}), /* @__PURE__ */ U("span", {
			class: "on-tile",
			style: `background:${t.on};${t.ring ? `box-shadow:inset 0 0 0 2px ${t.ring},0 0 14px ${t.ring}55;` : ""}${t.border ? `outline:2px solid ${t.border};outline-offset:-2px;` : ""}`
		})]
	});
}
var Ts = [
	{
		id: "tiles",
		name: "Tiles",
		note: "Classic squares"
	},
	{
		id: "rows",
		name: "Rows",
		note: "Wide, calm rows"
	},
	{
		id: "blocks",
		name: "Blocks",
		note: "Big icon, bold name"
	},
	{
		id: "dials",
		name: "Dials",
		note: "Round glowing dials"
	},
	{
		id: "pills",
		name: "Pills",
		note: "Compact, Apple-like"
	},
	{
		id: "squares",
		name: "Squares",
		note: "Centred icons"
	}
], Es = [
	{
		id: "gradient",
		name: "Bright gradient"
	},
	{
		id: "flat",
		name: "Flat colour"
	},
	{
		id: "glow",
		name: "Glow"
	},
	{
		id: "soft",
		name: "Soft wash"
	},
	{
		id: "white",
		name: "Turns white"
	},
	{
		id: "tint",
		name: "Light tint"
	},
	{
		id: "ring",
		name: "Colour ring"
	},
	{
		id: "outline",
		name: "Outline"
	}
], Ds = [
	{
		id: "normal",
		name: "Regular"
	},
	{
		id: "big",
		name: "Big"
	},
	{
		id: "bold",
		name: "Extra bold"
	},
	{
		id: "light",
		name: "Light"
	}
];
function Os(e) {
	return /* @__PURE__ */ U("div", {
		class: `option-grid ${e.small ? "small" : ""}`,
		children: e.options.map((t) => /* @__PURE__ */ U("button", {
			type: "button",
			class: `option ${e.value === t.id ? "selected" : ""}`,
			"aria-pressed": e.value === t.id,
			onClick: () => e.onPick(t.id),
			children: [
				e.preview(t.id),
				/* @__PURE__ */ U("strong", { children: t.name }),
				t.note && /* @__PURE__ */ U("span", {
					class: "muted small",
					children: t.note
				})
			]
		}))
	});
}
async function ks(e) {
	try {
		let t = await createImageBitmap(e), n = Math.min(1, 2560 / Math.max(t.width, t.height)), r = document.createElement("canvas");
		return r.width = Math.round(t.width * n), r.height = Math.round(t.height * n), r.getContext("2d").drawImage(t, 0, 0, r.width, r.height), await new Promise((e) => r.toBlob(e, "image/jpeg", .86)) ?? e;
	} catch {
		return e;
	}
}
function As({ cfg: e, set: t }) {
	let n = L.value, r = e.theme, [i, a] = O(null), [o, s] = O(!1), [c, l] = O(null), u = () => n.callWS({ type: "dashforge/media/list" }).then((e) => a(e.files)).catch(() => a([]));
	i === null && u();
	let d = async (e) => {
		s(!0), l(null);
		try {
			let r = new FormData();
			r.append("file", await ks(e), "background.jpg");
			let i = n.fetchWithAuth ? await n.fetchWithAuth("/api/dashforge/upload", {
				method: "POST",
				body: r
			}) : await fetch("/api/dashforge/upload", {
				method: "POST",
				body: r,
				headers: { Authorization: `Bearer ${n.auth?.data?.access_token ?? ""}` }
			}), a = await i.json();
			if (!i.ok) throw Error(a.message ?? "Upload failed");
			t((e) => {
				e.theme.background = "image", e.theme.backgroundImage = a.url;
			}), u();
		} catch (e) {
			l(e?.message ?? "Upload failed");
		} finally {
			s(!1);
		}
	}, f = async (e) => {
		confirm("Delete this picture?") && (await n.callWS({
			type: "dashforge/media/delete",
			name: e.name
		}).catch(() => void 0), r.backgroundImage === e.url && t((e) => e.theme.background = "midnight"), u());
	};
	return /* @__PURE__ */ U(S, { children: [
		/* @__PURE__ */ U("div", {
			class: "bg-grid",
			children: Ce.map((e) => /* @__PURE__ */ U("button", {
				type: "button",
				class: `bg-choice ${r.background === e.id ? "selected" : ""}`,
				onClick: () => t((t) => t.theme.background = e.id),
				children: [
					/* @__PURE__ */ U("span", {
						class: "bg-swatch",
						style: `background:${e.light}`
					}),
					/* @__PURE__ */ U("span", {
						class: "bg-swatch",
						style: `background:${e.dark}`
					}),
					/* @__PURE__ */ U("span", {
						class: "small",
						children: e.name
					})
				]
			}))
		}),
		/* @__PURE__ */ U("div", {
			class: "labeled-label",
			children: "Your pictures"
		}),
		/* @__PURE__ */ U("div", {
			class: "photo-grid",
			children: [/* @__PURE__ */ U("label", {
				class: `photo-upload ${o ? "busy" : ""}`,
				children: [
					/* @__PURE__ */ U("input", {
						type: "file",
						accept: "image/jpeg,image/png,image/webp,image/*",
						onChange: (e) => {
							let t = e.target.files?.[0];
							t && d(t), e.target.value = "";
						}
					}),
					/* @__PURE__ */ U(W, {
						icon: o ? "mdi:upload" : "mdi:plus",
						size: 26
					}),
					/* @__PURE__ */ U("span", {
						class: "small",
						children: o ? "Uploading…" : "Upload a picture"
					})
				]
			}), (i ?? []).map((e) => /* @__PURE__ */ U("div", {
				class: `photo ${r.background === "image" && r.backgroundImage === e.url ? "selected" : ""}`,
				children: [/* @__PURE__ */ U("button", {
					type: "button",
					class: "photo-pick",
					"aria-label": "Use this picture",
					style: `background-image:url("${e.url}")`,
					onClick: () => t((t) => {
						t.theme.background = "image", t.theme.backgroundImage = e.url;
					})
				}), /* @__PURE__ */ U(G, {
					icon: "mdi:close",
					label: "Delete picture",
					class: "photo-delete",
					onClick: () => f(e)
				})]
			}))]
		}),
		c && /* @__PURE__ */ U("p", {
			class: "error-text",
			children: c
		}),
		/* @__PURE__ */ U(X, {
			label: "Or use a picture from a web address",
			hint: "For example /local/wallpaper.jpg from your config/www folder, or any https:// address.",
			children: /* @__PURE__ */ U(Z, {
				value: r.background === "image" ? r.backgroundImage ?? "" : "",
				onInput: (e) => t((t) => {
					t.theme.backgroundImage = e, e && (t.theme.background = "image");
				}),
				placeholder: "/local/wallpaper.jpg"
			})
		})
	] });
}
function js({ cfg: e, set: t }) {
	let n = e.theme;
	return /* @__PURE__ */ U("div", {
		class: "step",
		children: [
			/* @__PURE__ */ U("p", {
				class: "lead",
				children: "Mix and match every part of the look. Start from a ready-made style if you like, then change anything. The dashboard behind updates as you choose."
			}),
			/* @__PURE__ */ U(X, {
				label: "Start from a style",
				children: /* @__PURE__ */ U("div", {
					class: "choice-grid",
					children: we.map((e) => /* @__PURE__ */ U("button", {
						type: "button",
						class: `choice ${n.style === e.id ? "selected" : ""}`,
						"aria-pressed": n.style === e.id,
						onClick: () => t((t) => Object.assign(t.theme, e.theme)),
						children: [
							/* @__PURE__ */ U(xs, { id: e.id }),
							/* @__PURE__ */ U("strong", { children: e.name }),
							/* @__PURE__ */ U("span", {
								class: "muted small",
								children: e.desc
							})
						]
					}))
				})
			}),
			/* @__PURE__ */ U(X, {
				label: "Background",
				children: /* @__PURE__ */ U(As, {
					cfg: e,
					set: t
				})
			}),
			/* @__PURE__ */ U(X, {
				label: "Card shape",
				children: /* @__PURE__ */ U(Os, {
					value: n.shape,
					options: Ts,
					onPick: (e) => t((t) => t.theme.shape = e),
					preview: (e) => /* @__PURE__ */ U(Ss, { id: e })
				})
			}),
			/* @__PURE__ */ U(X, {
				label: "How cards look when a device is on",
				children: /* @__PURE__ */ U(Os, {
					value: n.color,
					options: Es,
					small: !0,
					onPick: (e) => t((t) => t.theme.color = e),
					preview: (e) => /* @__PURE__ */ U(ws, { id: e })
				})
			}),
			/* @__PURE__ */ U(X, {
				label: "Icons",
				children: /* @__PURE__ */ U(Pa, {
					value: n.icons,
					options: [{
						value: "dashforge",
						label: "DashForge outline icons"
					}, {
						value: "ha",
						label: "Home Assistant icons"
					}],
					onChange: (e) => t((t) => t.theme.icons = e)
				})
			}),
			/* @__PURE__ */ U(X, {
				label: "Typeface",
				children: /* @__PURE__ */ U("div", {
					class: "font-grid",
					children: Me.map((e) => /* @__PURE__ */ U("button", {
						type: "button",
						class: `font-choice ${n.font === e.id ? "selected" : ""}`,
						"aria-pressed": n.font === e.id,
						style: `font-family:${Ie(e.id).replace(/"/g, "'")}`,
						onClick: () => t((t) => t.theme.font = e.id),
						children: [
							/* @__PURE__ */ U("span", {
								class: "font-sample",
								children: "Aa"
							}),
							/* @__PURE__ */ U("strong", { children: e.name }),
							/* @__PURE__ */ U("span", {
								class: "muted small",
								children: e.note
							})
						]
					}))
				})
			}),
			/* @__PURE__ */ U(X, {
				label: "Titles",
				children: /* @__PURE__ */ U(Os, {
					value: n.titles,
					options: Ds,
					small: !0,
					onPick: (e) => t((t) => t.theme.titles = e),
					preview: (e) => /* @__PURE__ */ U("span", {
						class: `title-preview tp-${e}`,
						children: "Kitchen"
					})
				})
			}),
			/* @__PURE__ */ U(X, {
				label: "Appearance",
				children: /* @__PURE__ */ U(Pa, {
					value: n.mode,
					options: [
						{
							value: "auto",
							label: "Match Home Assistant",
							icon: "mdi:theme-light-dark"
						},
						{
							value: "light",
							label: "Light",
							icon: "mdi:white-balance-sunny"
						},
						{
							value: "dark",
							label: "Dark",
							icon: "mdi:weather-night"
						}
					],
					onChange: (e) => t((t) => t.theme.mode = e)
				})
			}),
			/* @__PURE__ */ U(X, {
				label: "Accent colour",
				children: /* @__PURE__ */ U("div", {
					class: "swatches",
					children: [Te.map((e) => /* @__PURE__ */ U("button", {
						type: "button",
						class: `swatch ${n.accent === e ? "selected" : ""}`,
						"aria-label": e,
						style: `background:${e}`,
						onClick: () => t((t) => t.theme.accent = e)
					})), /* @__PURE__ */ U("input", {
						type: "color",
						class: "swatch color-input",
						"aria-label": "Custom colour",
						value: n.accent,
						onInput: (e) => t((t) => t.theme.accent = e.target.value)
					})]
				})
			}),
			/* @__PURE__ */ U(X, {
				label: "Card surface",
				children: /* @__PURE__ */ U(Pa, {
					value: n.cardStyle,
					options: [{
						value: "glass",
						label: "Frosted glass"
					}, {
						value: "solid",
						label: "Solid"
					}],
					onChange: (e) => t((t) => t.theme.cardStyle = e)
				})
			}),
			/* @__PURE__ */ U(X, {
				label: "Corner roundness",
				children: /* @__PURE__ */ U(J, {
					value: n.radius,
					min: 4,
					max: 32,
					format: (e) => `${e}px`,
					onCommit: (e) => t((t) => t.theme.radius = e)
				})
			})
		]
	});
}
function Ms({ cfg: e, set: t }) {
	let [n, r] = O(""), i = e.sections.filter((e) => e.kind === "page"), a = () => {
		n.trim() && (t((e) => e.sections.push(je("page", n.trim(), cs(n) === "mdi:home" ? "mdi:view-dashboard" : cs(n)))), r(""));
	};
	return /* @__PURE__ */ U("div", {
		class: "step",
		children: [
			/* @__PURE__ */ U("p", {
				class: "lead",
				children: "Besides rooms, DashForge can show pages that gather devices from all over your home."
			}),
			/* @__PURE__ */ U(Q, {
				label: "Home",
				hint: "A start screen with status at a glance, your favourite cards and every room by floor",
				children: /* @__PURE__ */ U(q, {
					checked: e.builtinPages.home,
					onChange: (e) => t((t) => t.builtinPages.home = e)
				})
			}),
			e.builtinPages.home && /* @__PURE__ */ U("div", {
				class: "sub-options",
				children: [
					/* @__PURE__ */ U("label", {
						class: "check-item",
						children: [/* @__PURE__ */ U(Fa, {
							checked: e.home.summary,
							onChange: (e) => t((t) => t.home.summary = e)
						}), /* @__PURE__ */ U("span", { children: "Status chips (climate, lights, security, media, watering)" })]
					}),
					/* @__PURE__ */ U("label", {
						class: "check-item",
						children: [/* @__PURE__ */ U(Fa, {
							checked: e.home.favorites,
							onChange: (e) => t((t) => t.home.favorites = e)
						}), /* @__PURE__ */ U("span", { children: "Favourite cards" })]
					}),
					/* @__PURE__ */ U("label", {
						class: "check-item",
						children: [/* @__PURE__ */ U(Fa, {
							checked: e.home.rooms,
							onChange: (e) => t((t) => t.home.rooms = e)
						}), /* @__PURE__ */ U("span", { children: "Room tiles grouped by floor" })]
					})
				]
			}),
			/* @__PURE__ */ U(Q, {
				label: "Media",
				hint: "Every media player on your dashboard in one place",
				children: /* @__PURE__ */ U(q, {
					checked: e.builtinPages.media,
					onChange: (e) => t((t) => t.builtinPages.media = e)
				})
			}),
			/* @__PURE__ */ U(Q, {
				label: "Security",
				hint: "Locks, alarm, cameras, doors, windows and motion",
				children: /* @__PURE__ */ U(q, {
					checked: e.builtinPages.security,
					onChange: (e) => t((t) => t.builtinPages.security = e)
				})
			}),
			/* @__PURE__ */ U(Q, {
				label: "Scenes",
				hint: "All your scenes and scripts",
				children: /* @__PURE__ */ U(q, {
					checked: e.builtinPages.scenes,
					onChange: (e) => t((t) => t.builtinPages.scenes = e)
				})
			}),
			/* @__PURE__ */ U(Ps, {
				cfg: e,
				set: t
			}),
			/* @__PURE__ */ U("div", {
				class: "labeled-label",
				children: "Your own pages"
			}),
			/* @__PURE__ */ U("p", {
				class: "muted small",
				children: "Make a page for anything: the garden, the garage, energy, a hobby. Add its devices in edit mode afterwards."
			}),
			i.map((e) => /* @__PURE__ */ U("div", {
				class: "room-row",
				children: [
					/* @__PURE__ */ U(W, { icon: e.icon }),
					/* @__PURE__ */ U("input", {
						class: "input",
						value: e.name,
						"aria-label": "Page name",
						onInput: (n) => t((t) => t.sections.find((t) => t.id === e.id).name = n.target.value)
					}),
					/* @__PURE__ */ U(G, {
						icon: "mdi:close",
						label: `Remove ${e.name}`,
						onClick: () => t((t) => t.sections = t.sections.filter((t) => t.id !== e.id))
					})
				]
			})),
			/* @__PURE__ */ U("form", {
				class: "inline-form",
				onSubmit: (e) => {
					e.preventDefault(), a();
				},
				children: [/* @__PURE__ */ U(Z, {
					value: n,
					onInput: r,
					placeholder: "e.g. Energy"
				}), /* @__PURE__ */ U(K, {
					icon: "mdi:plus",
					disabled: !n.trim(),
					onClick: a,
					children: "Add page"
				})]
			})
		]
	});
}
function Ns({ value: e, onCommit: t }) {
	let [n, r] = O(e.join(", ")), i = () => {
		let i = n.split(/[,\s]+/).map((e) => Number(e)).filter((e) => e > 0 && e <= 240);
		if (i.length) {
			let e = [...new Set(i)].slice(0, 6);
			t(e), r(e.join(", "));
		} else r(e.join(", "));
	};
	return /* @__PURE__ */ U("input", {
		class: "input",
		value: n,
		inputMode: "numeric",
		onInput: (e) => r(e.target.value),
		onBlur: i,
		onKeyDown: (e) => e.key === "Enter" && i()
	});
}
function Ps({ cfg: e, set: t }) {
	let n = L.value, r = Object.keys(n.states).filter((e) => rn(n, e)), i = e.irrigation.zones, a = (e) => t((t) => {
		t.irrigation.zones = t.irrigation.zones.includes(e) ? t.irrigation.zones.filter((t) => t !== e) : [...t.irrigation.zones, e];
	});
	return /* @__PURE__ */ U(S, { children: [/* @__PURE__ */ U(Q, {
		label: "Irrigation",
		hint: "Water zones with one tap. Timers run inside Home Assistant, so a sleeping tablet never leaves the water on.",
		children: /* @__PURE__ */ U(q, {
			checked: e.builtinPages.irrigation,
			onChange: (e) => t((t) => {
				t.builtinPages.irrigation = e, e && !t.irrigation.zones.length && (t.irrigation.zones = r);
			})
		})
	}), e.builtinPages.irrigation && /* @__PURE__ */ U("div", {
		class: "sub-options",
		children: [
			/* @__PURE__ */ U("div", {
				class: "labeled-label",
				children: [
					"Watering zones, in the order they run (",
					i.length,
					")"
				]
			}),
			i.map((e, r) => /* @__PURE__ */ U("div", {
				class: "room-row",
				children: [
					/* @__PURE__ */ U("span", {
						class: "zone-num",
						children: r + 1
					}),
					/* @__PURE__ */ U("span", {
						class: "grow",
						children: F(n, e)
					}),
					/* @__PURE__ */ U(G, {
						icon: "mdi:arrow-up",
						label: "Run earlier",
						disabled: r === 0,
						onClick: () => t((e) => [e.irrigation.zones[r - 1], e.irrigation.zones[r]] = [e.irrigation.zones[r], e.irrigation.zones[r - 1]])
					}),
					/* @__PURE__ */ U(G, {
						icon: "mdi:close",
						label: `Remove ${F(n, e)}`,
						onClick: () => a(e)
					})
				]
			})),
			r.length > 0 && i.length === 0 && /* @__PURE__ */ U("p", {
				class: "muted small",
				children: "No zones chosen yet."
			}),
			/* @__PURE__ */ U("div", {
				class: "labeled-label",
				children: "Add zones (switches and valves)"
			}),
			/* @__PURE__ */ U("div", {
				class: "picker-box",
				children: /* @__PURE__ */ U(Wa, {
					domains: [
						"switch",
						"valve",
						"input_boolean"
					],
					isSelected: (e) => i.includes(e),
					onToggle: a
				})
			}),
			/* @__PURE__ */ U(X, {
				label: "Usual run time per zone",
				children: /* @__PURE__ */ U(J, {
					value: e.irrigation.minutes,
					min: 1,
					max: 60,
					format: (e) => `${e} min`,
					onCommit: (e) => t((t) => t.irrigation.minutes = e)
				})
			}),
			/* @__PURE__ */ U(X, {
				label: "Quick buttons (minutes)",
				hint: "Comma separated, e.g. 5, 10, 15, 30",
				children: /* @__PURE__ */ U(Ns, {
					value: e.irrigation.presets,
					onCommit: (e) => t((t) => t.irrigation.presets = e)
				})
			})
		]
	})] });
}
function Fs({ cfg: e, set: t }) {
	let n = e.tablet;
	return /* @__PURE__ */ U("div", {
		class: "step",
		children: [
			/* @__PURE__ */ U("p", {
				class: "lead",
				children: "Settings for a tablet mounted on the wall. Skip these if you only use phones and computers."
			}),
			/* @__PURE__ */ U(Q, {
				label: "Screensaver",
				hint: "Shows a clock after a while with no touches",
				children: /* @__PURE__ */ U(q, {
					checked: n.screensaver,
					onChange: (e) => t((t) => t.tablet.screensaver = e)
				})
			}),
			n.screensaver && /* @__PURE__ */ U(S, { children: [/* @__PURE__ */ U(X, {
				label: "Start after",
				children: /* @__PURE__ */ U(J, {
					value: n.screensaverMinutes,
					min: 1,
					max: 60,
					format: (e) => `${e} min`,
					onCommit: (e) => t((t) => t.tablet.screensaverMinutes = e)
				})
			}), /* @__PURE__ */ U(X, {
				label: "Screensaver style",
				children: /* @__PURE__ */ U(Pa, {
					value: n.screensaverStyle,
					options: [
						{
							value: "clock",
							label: "Clock & weather"
						},
						{
							value: "dim",
							label: "Dim clock"
						},
						{
							value: "black",
							label: "Black screen"
						}
					],
					onChange: (e) => t((t) => t.tablet.screensaverStyle = e)
				})
			})] }),
			/* @__PURE__ */ U(Q, {
				label: "Return to the first room",
				hint: "Go back home after a while with no touches",
				children: /* @__PURE__ */ U(Pa, {
					value: String(n.returnHomeMinutes),
					options: [
						{
							value: "0",
							label: "Never"
						},
						{
							value: "2",
							label: "2 min"
						},
						{
							value: "5",
							label: "5 min"
						},
						{
							value: "15",
							label: "15 min"
						}
					],
					onChange: (e) => t((t) => t.tablet.returnHomeMinutes = Number(e))
				})
			}),
			/* @__PURE__ */ U(Q, {
				label: "Hide the Home Assistant sidebar",
				hint: "The starting choice for every device. Anyone can still hide or show it on their own device with the button at the top of the dashboard.",
				children: /* @__PURE__ */ U(q, {
					checked: n.hideSidebar,
					onChange: (e) => t((t) => t.tablet.hideSidebar = e)
				})
			})
		]
	});
}
function Is({ cfg: e }) {
	let t = e.sections.filter((e) => e.kind === "room"), n = e.sections.filter((e) => e.kind === "page"), r = e.sections.reduce((e, t) => e + t.cards.length, 0), i = [
		["Rooms", t.map((e) => e.name).join(", ") || "None"],
		["Devices", `${r} cards`],
		["Layout", vs.find((t) => t.id === e.layout)?.name ?? e.layout],
		["Style", we.find((t) => t.id === e.theme.style)?.name ?? "Custom"],
		["Pages", [
			e.builtinPages.home && "Home",
			e.builtinPages.irrigation && `Irrigation (${e.irrigation.zones.length} zones)`,
			e.builtinPages.media && "Media",
			e.builtinPages.security && "Security",
			e.builtinPages.scenes && "Scenes",
			...n.map((e) => e.name)
		].filter(Boolean).join(", ") || "None"],
		["Weather", e.header.weatherEntity ? "Home Assistant" : e.header.weatherFallback ? "Open-Meteo" : "Off"],
		["Calendars", String(e.header.calendars.length)],
		["Wall tablet", e.tablet.screensaver ? `Screensaver after ${e.tablet.screensaverMinutes} min` : "Screensaver off"]
	];
	return /* @__PURE__ */ U("div", {
		class: "step",
		children: [/* @__PURE__ */ U("p", {
			class: "lead",
			children: "Here's your dashboard. Finish to start using it. Tap the pencil any time to rearrange cards, and the gear to change these choices."
		}), /* @__PURE__ */ U("dl", {
			class: "review",
			children: i.map(([e, t]) => /* @__PURE__ */ U(S, { children: [/* @__PURE__ */ U("dt", { children: e }), /* @__PURE__ */ U("dd", { children: t })] }))
		})]
	});
}
// src/components/wizard.tsx
var $ = M(null), Ls = [
	{
		id: "welcome",
		title: "Welcome",
		icon: "mdi:hand-wave",
		C: ds
	},
	{
		id: "rooms",
		title: "Rooms",
		icon: "mdi:floor-plan",
		C: fs
	},
	{
		id: "devices",
		title: "Devices",
		icon: "mdi:devices",
		C: ms
	},
	{
		id: "scenes",
		title: "Scenes & media",
		icon: "mdi:palette",
		C: hs
	},
	{
		id: "widgets",
		title: "Header & widgets",
		icon: "mdi:weather-partly-cloudy",
		C: _s
	},
	{
		id: "layout",
		title: "Layout",
		icon: "mdi:view-quilt",
		C: bs
	},
	{
		id: "theme",
		title: "Look & feel",
		icon: "mdi:brush",
		C: js
	},
	{
		id: "pages",
		title: "Pages",
		icon: "mdi:book-open-page-variant",
		C: Ms
	},
	{
		id: "tablet",
		title: "Wall tablet",
		icon: "mdi:tablet",
		C: Fs
	},
	{
		id: "review",
		title: "Review",
		icon: "mdi:check-decagram",
		C: Is
	}
];
function Rs() {
	let e = R.value ? ke(R.value) : Ee();
	R.value || us(L.value, e), $.value = e, Nn.value = !1, Pn.value = !0;
}
function zs() {
	let [e, t] = O(0), [n, r] = O(!1), i = $.value;
	if (!i) return null;
	let a = os(() => $.value, (e) => $.value = e), o = Ls[e], s = e === Ls.length - 1, c = !R.value?.setupComplete;
	return /* @__PURE__ */ U("div", {
		class: "wizard",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "DashForge setup",
		children: [/* @__PURE__ */ U("aside", {
			class: "wizard-steps",
			children: [/* @__PURE__ */ U("div", {
				class: "brand",
				children: [/* @__PURE__ */ U(W, {
					icon: "mdi:anvil",
					size: 28
				}), /* @__PURE__ */ U("span", { children: "DashForge" })]
			}), /* @__PURE__ */ U("ol", { children: Ls.map((n, r) => /* @__PURE__ */ U("li", { children: /* @__PURE__ */ U("button", {
				type: "button",
				class: `wstep ${r === e ? "current" : ""} ${r < e ? "done" : ""}`,
				onClick: () => t(r),
				"aria-current": r === e ? "step" : void 0,
				children: [/* @__PURE__ */ U(W, {
					icon: r < e ? "mdi:check-circle" : n.icon,
					size: 20
				}), /* @__PURE__ */ U("span", { children: n.title })]
			}) })) })]
		}), /* @__PURE__ */ U("section", {
			class: "wizard-main",
			children: [
				/* @__PURE__ */ U("div", {
					class: "wizard-progress",
					"aria-hidden": "true",
					children: /* @__PURE__ */ U("div", { style: `width:${(e + 1) / Ls.length * 100}%` })
				}),
				/* @__PURE__ */ U("div", {
					class: "wizard-head",
					children: [/* @__PURE__ */ U("span", {
						class: "muted small",
						children: [
							"Step ",
							e + 1,
							" of ",
							Ls.length
						]
					}), /* @__PURE__ */ U("h2", { children: o.title })]
				}),
				/* @__PURE__ */ U("div", {
					class: "wizard-body",
					children: /* @__PURE__ */ U(o.C, {
						cfg: i,
						set: a
					})
				}),
				/* @__PURE__ */ U("div", {
					class: "wizard-foot",
					children: [c ? /* @__PURE__ */ U("span", {}) : /* @__PURE__ */ U(K, {
						kind: "ghost",
						onClick: () => {
							Pn.value = !1, $.value = null;
						},
						children: "Cancel"
					}), /* @__PURE__ */ U("div", {
						class: "btn-row",
						children: [e > 0 && /* @__PURE__ */ U(K, {
							kind: "ghost",
							icon: "mdi:arrow-left",
							onClick: () => t(e - 1),
							children: "Back"
						}), s ? /* @__PURE__ */ U(K, {
							kind: "primary",
							icon: "mdi:check",
							disabled: n,
							onClick: async () => {
								r(!0);
								let e = await Vn({
									...i,
									setupComplete: !0
								});
								r(!1), e && (Pn.value = !1, $.value = null, B.value = null, V("Your dashboard is ready"));
							},
							children: c ? "Finish setup" : "Save"
						}) : /* @__PURE__ */ U(K, {
							kind: "primary",
							icon: "mdi:arrow-right",
							onClick: () => t(e + 1),
							children: "Next"
						})]
					})]
				})
			]
		})]
	});
}
var Bs = Ls.filter((e) => e.id !== "review").map((e) => e.id === "welcome" ? {
	...e,
	title: "General",
	icon: "mdi:cog"
} : e);
function Vs() {
	$.value = ke(R.value), Nn.value = !0;
}
function Hs() {
	let [e, t] = O("welcome"), [n, r] = O(!1), i = $.value;
	if (!i) return null;
	let a = os(() => $.value, (e) => $.value = e), o = () => {
		Nn.value = !1, $.value = null;
	}, s = async () => {
		r(!0);
		let e = await Vn(i);
		r(!1), e && (o(), V("Settings saved"));
	}, c = Bs.find((t) => t.id === e);
	return /* @__PURE__ */ U(Y, {
		title: "Settings",
		onClose: o,
		wide: !0,
		footer: /* @__PURE__ */ U(S, { children: [/* @__PURE__ */ U(K, {
			kind: "ghost",
			onClick: o,
			children: "Cancel"
		}), /* @__PURE__ */ U(K, {
			kind: "primary",
			icon: "mdi:check",
			disabled: n,
			onClick: s,
			children: "Save"
		})] }),
		children: /* @__PURE__ */ U("div", {
			class: "settings",
			children: [/* @__PURE__ */ U("nav", {
				class: "settings-tabs",
				children: [Bs.map((n) => /* @__PURE__ */ U("button", {
					type: "button",
					class: `wstep ${e === n.id ? "current" : ""}`,
					onClick: () => t(n.id),
					children: [/* @__PURE__ */ U(W, {
						icon: n.icon,
						size: 20
					}), /* @__PURE__ */ U("span", { children: n.title })]
				})), /* @__PURE__ */ U("button", {
					type: "button",
					class: `wstep ${e === "backup" ? "current" : ""}`,
					onClick: () => t("backup"),
					children: [/* @__PURE__ */ U(W, {
						icon: "mdi:backup-restore",
						size: 20
					}), /* @__PURE__ */ U("span", { children: "Backup & reset" })]
				})]
			}), /* @__PURE__ */ U("div", {
				class: "settings-body",
				children: c ? /* @__PURE__ */ U(c.C, {
					cfg: i,
					set: a
				}) : /* @__PURE__ */ U(Us, {
					cfg: i,
					onReplace: (e) => $.value = e
				})
			})]
		})
	});
}
function Us({ cfg: e, onReplace: t }) {
	let [n, r] = O(""), [i, a] = O(!1), o = () => {
		let t = new Blob([JSON.stringify(e, null, 2)], { type: "application/json" }), n = document.createElement("a");
		n.href = URL.createObjectURL(t), n.download = `dashforge-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`, n.click(), setTimeout(() => URL.revokeObjectURL(n.href), 1e3);
	}, s = (e) => {
		try {
			let n = JSON.parse(e);
			if (!n || !Array.isArray(n.sections)) throw Error("bad");
			t({
				...Oe(n),
				setupComplete: !0
			}), V("Imported. Press Save to keep it."), r("");
		} catch {
			V("That file isn't a DashForge backup", "error");
		}
	};
	return /* @__PURE__ */ U("div", {
		class: "step",
		children: [
			/* @__PURE__ */ U("div", {
				class: "labeled-label",
				children: "Export"
			}),
			/* @__PURE__ */ U("p", {
				class: "muted small",
				children: "Download your whole dashboard as a file, to keep a copy or move it to another Home Assistant."
			}),
			/* @__PURE__ */ U(K, {
				icon: "mdi:download",
				onClick: o,
				children: "Download backup"
			}),
			/* @__PURE__ */ U("div", {
				class: "labeled-label",
				children: "Import"
			}),
			/* @__PURE__ */ U("input", {
				type: "file",
				accept: "application/json,.json",
				class: "input",
				onChange: (e) => {
					(e.target.files?.[0])?.text().then(s);
				}
			}),
			/* @__PURE__ */ U("p", {
				class: "muted small",
				children: "Or paste a backup:"
			}),
			/* @__PURE__ */ U(Z, {
				value: n,
				onInput: r,
				placeholder: "{\"schema\":1,…}"
			}),
			/* @__PURE__ */ U(K, {
				icon: "mdi:upload",
				disabled: !n.trim(),
				onClick: () => s(n),
				children: "Import pasted backup"
			}),
			/* @__PURE__ */ U("div", {
				class: "labeled-label",
				children: "Start over"
			}),
			/* @__PURE__ */ U("div", {
				class: "btn-row",
				children: [/* @__PURE__ */ U(K, {
					icon: "mdi:wizard-hat",
					onClick: Rs,
					children: "Run the setup wizard again"
				}), /* @__PURE__ */ U(K, {
					kind: "danger",
					icon: "mdi:restore",
					onClick: () => a(!0),
					children: "Reset dashboard"
				})]
			}),
			i && /* @__PURE__ */ U(Y, {
				title: "Reset the dashboard?",
				onClose: () => a(!1),
				footer: /* @__PURE__ */ U(S, { children: [/* @__PURE__ */ U(K, {
					kind: "ghost",
					onClick: () => a(!1),
					children: "Cancel"
				}), /* @__PURE__ */ U(K, {
					kind: "danger",
					onClick: async () => {
						await Vn(null) && (a(!1), Nn.value = !1, $.value = null);
					},
					children: "Reset"
				})] }),
				children: /* @__PURE__ */ U("p", { children: "This removes every room, page and setting from DashForge and starts the setup wizard. Nothing in Home Assistant itself is changed. Download a backup first if you might want it back." })
			})
		]
	});
}
// src/components/widgets.tsx
var Ws = M(null);
function Gs(e = 1e3) {
	let [t, n] = O(() => /* @__PURE__ */ new Date());
	return k(() => {
		let t = window.setInterval(() => n(/* @__PURE__ */ new Date()), e);
		return () => clearInterval(t);
	}, [e]), t;
}
function Ks(e, t, n) {
	return e.toLocaleTimeString(n, {
		hour: "numeric",
		minute: "2-digit",
		hour12: !t
	});
}
function qs(e, t) {
	let n = e.getHours(), r = n < 5 ? "Good night" : n < 12 ? "Good morning" : n < 18 ? "Good afternoon" : "Good evening";
	return t ? `${r}, ${t}` : r;
}
var Js = {
	"clear-night": "mdi:weather-night",
	cloudy: "mdi:weather-cloudy",
	exceptional: "mdi:alert-circle-outline",
	fog: "mdi:weather-fog",
	hail: "mdi:weather-hail",
	lightning: "mdi:weather-lightning",
	"lightning-rainy": "mdi:weather-lightning-rainy",
	partlycloudy: "mdi:weather-partly-cloudy",
	pouring: "mdi:weather-pouring",
	rainy: "mdi:weather-rainy",
	snowy: "mdi:weather-snowy",
	"snowy-rainy": "mdi:weather-snowy-rainy",
	sunny: "mdi:weather-sunny",
	windy: "mdi:weather-windy",
	"windy-variant": "mdi:weather-windy-variant"
}, Ys = (e) => Js[e] ?? "mdi:weather-partly-cloudy", Xs = (e) => e === "partlycloudy" ? "Partly cloudy" : e === "clear-night" ? "Clear" : e.replace(/-/g, " ").replace(/^\w/, (e) => e.toUpperCase());
function Zs(e, t = !0) {
	return e === 0 ? t ? "sunny" : "clear-night" : e <= 2 ? "partlycloudy" : e === 3 ? "cloudy" : e === 45 || e === 48 ? "fog" : e >= 51 && e <= 67 ? e >= 65 ? "pouring" : "rainy" : e >= 71 && e <= 77 ? "snowy" : e >= 80 && e <= 82 ? e === 82 ? "pouring" : "rainy" : e === 85 || e === 86 ? "snowy" : e >= 95 ? "lightning-rainy" : "cloudy";
}
function Qs(e, t, n) {
	let [r, i] = O([]);
	return k(() => {
		if (!t || !e.states[t]) return;
		let r, a = !0;
		return e.connection.subscribeMessage((e) => a && i(e.forecast ?? []), {
			type: "weather/subscribe_forecast",
			entity_id: t,
			forecast_type: n
		}).then((e) => {
			a ? r = e : e();
		}).catch(() => i([])), () => {
			a = !1, r?.().catch(() => void 0);
		};
	}, [
		t,
		n,
		!!e.states[t ?? ""]
	]), r;
}
function $s(e, t) {
	let [n, r] = O(null), i = e.config.unit_system.temperature === "°F";
	return k(() => {
		if (!t) return;
		let n = !0, a = () => {
			let t = new URLSearchParams({
				latitude: String(e.config.latitude),
				longitude: String(e.config.longitude),
				current: "temperature_2m,weather_code,is_day",
				hourly: "temperature_2m,weather_code,precipitation_probability,is_day",
				daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
				timezone: "auto",
				forecast_days: "7",
				temperature_unit: i ? "fahrenheit" : "celsius"
			});
			fetch(`https://api.open-meteo.com/v1/forecast?${t}`).then((e) => e.json()).then((e) => {
				if (!n || !e.current) return;
				let t = Math.max(0, e.hourly.time.findIndex((e) => new Date(e) >= /* @__PURE__ */ new Date()) - 1);
				r({
					source: "open-meteo",
					unit: i ? "°F" : "°C",
					condition: Zs(e.current.weather_code, !!e.current.is_day),
					temp: e.current.temperature_2m,
					hourly: e.hourly.time.slice(t, t + 24).map((n, r) => ({
						time: n,
						condition: Zs(e.hourly.weather_code[t + r], !!e.hourly.is_day[t + r]),
						temp: e.hourly.temperature_2m[t + r],
						precip: e.hourly.precipitation_probability?.[t + r]
					})),
					daily: e.daily.time.map((t, n) => ({
						time: t,
						condition: Zs(e.daily.weather_code[n]),
						high: e.daily.temperature_2m_max[n],
						low: e.daily.temperature_2m_min[n],
						precip: e.daily.precipitation_probability_max?.[n]
					}))
				});
			}).catch(() => void 0);
		};
		a();
		let o = window.setInterval(a, 18e5);
		return () => {
			n = !1, clearInterval(o);
		};
	}, [
		t,
		e.config.latitude,
		e.config.longitude,
		i
	]), n;
}
function ec(e, t) {
	return tc(e, t.header.weatherEntity, t.header.weatherFallback);
}
function tc(e, t, n) {
	let r = t ? e.states[t] : void 0, i = Qs(e, t, "daily"), a = Qs(e, t, "hourly"), o = $s(e, !r && n);
	return r ? {
		source: "entity",
		condition: r.state,
		temp: r.attributes.temperature,
		unit: r.attributes.temperature_unit ?? e.config.unit_system.temperature,
		hourly: a.slice(0, 24).map((e) => ({
			time: e.datetime,
			condition: e.condition,
			temp: e.temperature,
			precip: e.precipitation_probability
		})),
		daily: i.slice(0, 7).map((e) => ({
			time: e.datetime,
			condition: e.condition,
			high: e.temperature,
			low: e.templow,
			precip: e.precipitation_probability
		}))
	} : o;
}
function nc({ data: e, lang: t, h24: n, onClose: r }) {
	return /* @__PURE__ */ U(Y, {
		title: "Weather",
		onClose: r ?? (() => Ws.value = null),
		wide: !0,
		children: [
			/* @__PURE__ */ U("div", {
				class: "weather-now",
				children: [/* @__PURE__ */ U(W, {
					icon: Ys(e.condition),
					size: 56
				}), /* @__PURE__ */ U("div", { children: [/* @__PURE__ */ U("div", {
					class: "weather-temp",
					children: e.temp == null ? "—" : `${Math.round(e.temp)}${e.unit}`
				}), /* @__PURE__ */ U("div", {
					class: "muted",
					children: Xs(e.condition)
				})] })]
			}),
			e.hourly.length > 0 && /* @__PURE__ */ U(S, { children: [/* @__PURE__ */ U("div", {
				class: "labeled-label",
				children: "Next hours"
			}), /* @__PURE__ */ U("div", {
				class: "hourly",
				children: e.hourly.map((e) => /* @__PURE__ */ U("div", {
					class: "hour",
					children: [
						/* @__PURE__ */ U("span", {
							class: "muted",
							children: Ks(new Date(e.time), n, t).replace(":00", "")
						}),
						/* @__PURE__ */ U(W, {
							icon: Ys(e.condition),
							size: 26
						}),
						/* @__PURE__ */ U("strong", { children: [Math.round(e.temp), "°"] }),
						e.precip != null && e.precip > 0 && /* @__PURE__ */ U("span", {
							class: "precip",
							children: [e.precip, "%"]
						})
					]
				}))
			})] }),
			e.daily.length > 0 && /* @__PURE__ */ U(S, { children: [/* @__PURE__ */ U("div", {
				class: "labeled-label",
				children: "Next 7 days"
			}), /* @__PURE__ */ U("div", {
				class: "daily",
				children: e.daily.map((e, n) => /* @__PURE__ */ U("div", {
					class: "day",
					children: [
						/* @__PURE__ */ U("span", {
							class: "day-name",
							children: n === 0 ? "Today" : new Date(e.time).toLocaleDateString(t, { weekday: "long" })
						}),
						/* @__PURE__ */ U(W, {
							icon: Ys(e.condition),
							size: 24
						}),
						/* @__PURE__ */ U("span", {
							class: "precip",
							children: e.precip ? `${e.precip}%` : ""
						}),
						/* @__PURE__ */ U("span", {
							class: "day-temps",
							children: [/* @__PURE__ */ U("strong", { children: [Math.round(e.high), "°"] }), e.low != null && /* @__PURE__ */ U("span", {
								class: "muted",
								children: [
									" ",
									Math.round(e.low),
									"°"
								]
							})]
						})
					]
				}))
			})] }),
			e.source === "open-meteo" && /* @__PURE__ */ U("p", {
				class: "muted small",
				children: "Forecast by Open-Meteo for your home location."
			})
		]
	});
}
function rc(e) {
	if (e.dateTime) return [new Date(e.dateTime), !1];
	let [t, n, r] = (e.date ?? "").split("-").map(Number);
	return [new Date(t, n - 1, r), !0];
}
function ic(e, t, n, r, i = 0) {
	let [a, o] = O([]);
	return k(() => {
		if (!t.length) {
			o([]);
			return;
		}
		let i = !0, a = `start=${encodeURIComponent(n.toISOString())}&end=${encodeURIComponent(r.toISOString())}`;
		return Promise.all(t.map((t) => e.callApi("GET", `calendars/${t}?${a}`).then((e) => e.map((e) => {
			let [n, r] = rc(e.start), [i] = rc(e.end);
			return {
				summary: e.summary,
				start: n,
				end: i,
				allDay: r,
				location: e.location,
				calendar: t
			};
		})).catch(() => []))).then((e) => i && o(e.flat().sort((e, t) => e.start.getTime() - t.start.getTime()))), () => {
			i = !1;
		};
	}, [`${t.join(",")}|${n.toISOString()}|${r.toISOString()}|${i}`]), a;
}
function ac(e, t, n) {
	return e.allDay ? "All day" : Ks(e.start, n, t);
}
function oc({ cfg: e, lang: t, calendars: n, onClose: r }) {
	let i = L.value, [a, o] = O(() => {
		let e = /* @__PURE__ */ new Date();
		return new Date(e.getFullYear(), e.getMonth(), 1);
	}), [s, c] = O(() => (/* @__PURE__ */ new Date()).toDateString()), l = tt(() => {
		let e = new Date(a);
		return e.setDate(1 - e.getDay()), e;
	}, [a]), u = tt(() => {
		let e = new Date(l);
		return e.setDate(e.getDate() + 42), e;
	}, [l]), d = ic(i, n ?? e.header.calendars, l, u), f = /* @__PURE__ */ new Map();
	for (let e of d) {
		let t = new Date(e.start);
		t.setHours(0, 0, 0, 0);
		let n = new Date(e.allDay ? e.end.getTime() - 1 : e.end.getTime());
		do {
			let n = t.toDateString();
			f.set(n, [...f.get(n) ?? [], e]), t.setDate(t.getDate() + 1);
		} while (t <= n);
	}
	let p = Array.from({ length: 42 }, (e, t) => {
		let n = new Date(l);
		return n.setDate(n.getDate() + t), n;
	}), m = (/* @__PURE__ */ new Date()).toDateString(), h = f.get(s) ?? [], g = (e) => o(new Date(a.getFullYear(), a.getMonth() + e, 1));
	return /* @__PURE__ */ U(Y, {
		title: "Calendar",
		onClose: r ?? (() => Ws.value = null),
		wide: !0,
		children: [
			/* @__PURE__ */ U("div", {
				class: "cal-head",
				children: [
					/* @__PURE__ */ U(G, {
						icon: "mdi:chevron-left",
						label: "Previous month",
						onClick: () => g(-1)
					}),
					/* @__PURE__ */ U("strong", { children: a.toLocaleDateString(t, {
						month: "long",
						year: "numeric"
					}) }),
					/* @__PURE__ */ U(G, {
						icon: "mdi:chevron-right",
						label: "Next month",
						onClick: () => g(1)
					})
				]
			}),
			/* @__PURE__ */ U("div", {
				class: "cal-grid",
				children: [p.slice(0, 7).map((e) => /* @__PURE__ */ U("div", {
					class: "cal-dow",
					children: e.toLocaleDateString(t, { weekday: "narrow" })
				})), p.map((e) => {
					let t = e.toDateString(), n = f.get(t)?.length ?? 0;
					return /* @__PURE__ */ U("button", {
						type: "button",
						class: `cal-day ${e.getMonth() === a.getMonth() ? "" : "other"} ${t === m ? "today" : ""} ${t === s ? "selected" : ""}`,
						onClick: () => c(t),
						children: [/* @__PURE__ */ U("span", { children: e.getDate() }), n > 0 && /* @__PURE__ */ U("span", {
							class: "cal-dots",
							children: "•".repeat(Math.min(n, 3))
						})]
					});
				})]
			}),
			/* @__PURE__ */ U("div", {
				class: "labeled-label",
				children: new Date(s).toLocaleDateString(t, {
					weekday: "long",
					month: "long",
					day: "numeric"
				})
			}),
			h.length === 0 ? /* @__PURE__ */ U("p", {
				class: "muted",
				children: "Nothing planned."
			}) : /* @__PURE__ */ U("ul", {
				class: "agenda",
				children: h.map((n) => /* @__PURE__ */ U("li", { children: [/* @__PURE__ */ U("span", {
					class: "agenda-time",
					children: ac(n, t, e.header.clock24h)
				}), /* @__PURE__ */ U("span", {
					class: "agenda-text",
					children: [/* @__PURE__ */ U("strong", { children: n.summary }), /* @__PURE__ */ U("span", {
						class: "muted small",
						children: [n.location, F(i, n.calendar)].filter(Boolean).join(" · ")
					})]
				})] }))
			})
		]
	});
}
function sc(e, t) {
	let [n, r] = O([]);
	return k(() => {
		let n = !0, i;
		return e.connection.subscribeMessage((e) => n && r(e.items ?? []), {
			type: "todo/item/subscribe",
			entity_id: t
		}).then((e) => {
			n ? i = e : e();
		}).catch(() => e.callWS({
			type: "todo/item/list",
			entity_id: t
		}).then((e) => n && r(e.items)).catch(() => void 0)), () => {
			n = !1, i?.().catch(() => void 0);
		};
	}, [t]), n;
}
function cc(e, t) {
	return t.reduce((t, n) => t + (Number(e.states[n]?.state) || 0), 0);
}
function lc({ entityId: e }) {
	let t = L.value, n = sc(t, e), [r, i] = O(""), a = n.filter((e) => e.status === "needs_action"), o = n.filter((e) => e.status === "completed").slice(0, 5), s = () => {
		r.trim() && (H("todo", "add_item", {
			entity_id: e,
			item: r.trim()
		}), i(""));
	}, c = (t, n) => H("todo", "update_item", {
		entity_id: e,
		item: t.uid,
		status: n ? "completed" : "needs_action"
	});
	return /* @__PURE__ */ U("div", {
		class: "todo",
		children: [
			/* @__PURE__ */ U("div", {
				class: "labeled-label",
				children: F(t, e)
			}),
			/* @__PURE__ */ U("form", {
				class: "todo-add",
				onSubmit: (e) => {
					e.preventDefault(), s();
				},
				children: [/* @__PURE__ */ U(Z, {
					value: r,
					onInput: i,
					placeholder: "Add a reminder"
				}), /* @__PURE__ */ U(K, {
					icon: "mdi:plus",
					onClick: s,
					children: "Add"
				})]
			}),
			/* @__PURE__ */ U("ul", {
				class: "todo-items",
				children: [
					a.map((e) => /* @__PURE__ */ U("li", { children: [
						/* @__PURE__ */ U(Fa, {
							checked: !1,
							onChange: () => c(e, !0)
						}),
						/* @__PURE__ */ U("span", { children: e.summary }),
						e.due && /* @__PURE__ */ U("span", {
							class: "muted small",
							children: new Date(e.due).toLocaleDateString()
						})
					] })),
					o.map((e) => /* @__PURE__ */ U("li", {
						class: "done",
						children: [/* @__PURE__ */ U(Fa, {
							checked: !0,
							onChange: () => c(e, !1)
						}), /* @__PURE__ */ U("span", { children: e.summary })]
					})),
					n.length === 0 && /* @__PURE__ */ U("li", {
						class: "muted",
						children: "All clear."
					})
				]
			})
		]
	});
}
function uc({ cfg: e, lists: t, onClose: n }) {
	return /* @__PURE__ */ U(Y, {
		title: "Reminders",
		onClose: n ?? (() => Ws.value = null),
		wide: !0,
		children: (t ?? e.header.todoLists).map((e) => /* @__PURE__ */ U(lc, { entityId: e }))
	});
}
// src/components/layout.tsx
function dc(e) {
	let t = L.value, n = [];
	e.builtinPages.home && !Dn.value && n.push({
		key: "home",
		view: { type: "home" },
		name: "Home",
		icon: "mdi:home-variant"
	});
	let r = e.sections.filter((e) => e.kind === "room"), i = e.sections.filter((e) => e.kind === "page"), a = qo(t, r);
	for (let e of Ko(t, r)) for (let t of e.sections) n.push({
		key: t.id,
		view: {
			type: "section",
			id: t.id
		},
		name: t.name,
		icon: t.icon,
		group: a ? e.name : void 0
	});
	for (let e of i) n.push({
		key: e.id,
		view: {
			type: "section",
			id: e.id
		},
		name: e.name,
		icon: e.icon,
		group: a ? "Pages" : void 0
	});
	return Dn.value || (e.builtinPages.irrigation && e.irrigation.zones.length && n.push({
		key: "irrigation",
		view: { type: "irrigation" },
		name: "Irrigation",
		icon: "mdi:sprinkler-variant",
		group: a ? "Pages" : void 0
	}), e.builtinPages.media && mc(e).length && n.push({
		key: "media",
		view: { type: "media" },
		name: "Media",
		icon: "mdi:music-box-multiple",
		group: a ? "Pages" : void 0
	}), e.builtinPages.security && gc(e).length && n.push({
		key: "security",
		view: { type: "security" },
		name: "Security",
		icon: "mdi:shield-home",
		group: a ? "Pages" : void 0
	}), e.builtinPages.scenes && _c(e).length && n.push({
		key: "scenes",
		view: { type: "scenes" },
		name: "Scenes",
		icon: "mdi:palette",
		group: a ? "Pages" : void 0
	})), n;
}
var fc = (e) => e ? e.type === "section" ? e.id : e.type : "";
function pc(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e.sections) for (let e of n.cards) e.hidden || t.add(e.entity);
	return [...t];
}
function mc(e) {
	let t = pc(e).filter((e) => N(e) === "media_player");
	return e.header.mediaPlayer && !t.includes(e.header.mediaPlayer) && t.unshift(e.header.mediaPlayer), t;
}
var hc = /* @__PURE__ */ new Set([
	"door",
	"garage_door",
	"window",
	"opening",
	"motion",
	"occupancy",
	"smoke",
	"moisture"
]);
function gc(e) {
	let t = L.value;
	return pc(e).filter((e) => {
		let n = N(e);
		return n === "lock" || n === "alarm_control_panel" || n === "camera" || n === "binary_sensor" && hc.has(t.states[e]?.attributes.device_class);
	});
}
function _c(e) {
	let t = L.value, n = /* @__PURE__ */ new Set([...e.header.sceneStrip, ...pc(e).filter((e) => ["scene", "script"].includes(N(e)))]);
	for (let e of Object.keys(t.states)) N(e) === "scene" && fn(t, e) && n.add(e);
	return [...n].filter((e) => t.states[e]);
}
function vc({ cfg: e }) {
	let t = L.value, n = t.locale?.language ?? t.language, r = Gs(e.header.clock ? 1e3 : 6e4), i = ec(t, e), a = new Date(r.getFullYear(), r.getMonth(), r.getDate()), o = new Date(a.getTime() + 1728e5), s = ic(t, e.header.calendars, a, o, Math.floor(r.getTime() / 6e5)).find((e) => e.end > r), c = cc(t, e.header.todoLists), l = Mn(e.tablet.hideSidebar), u = Sn.value && !l, d = e.header.mediaPlayer ? t.states[e.header.mediaPlayer] : void 0;
	return /* @__PURE__ */ U("header", {
		class: "header",
		children: [/* @__PURE__ */ U("div", {
			class: "header-left",
			children: [u && /* @__PURE__ */ U(G, {
				icon: "mdi:menu",
				label: "Home Assistant menu",
				onClick: () => qn?.dispatchEvent(new Event("hass-toggle-menu", {
					bubbles: !0,
					composed: !0
				}))
			}), /* @__PURE__ */ U("div", { children: [/* @__PURE__ */ U("h1", {
				class: "title",
				children: e.header.greeting ? qs(r, e.userName) : e.title
			}), e.header.showDate && /* @__PURE__ */ U("div", {
				class: "subtitle",
				children: r.toLocaleDateString(n, {
					weekday: "long",
					month: "long",
					day: "numeric"
				})
			})] })]
		}), /* @__PURE__ */ U("div", {
			class: "header-right",
			children: [e.header.clock && /* @__PURE__ */ U("div", {
				class: "clock",
				children: Ks(r, e.header.clock24h, n)
			}), /* @__PURE__ */ U("div", {
				class: "header-chips",
				children: [
					i && /* @__PURE__ */ U("button", {
						type: "button",
						class: "chip-btn",
						onClick: () => Ws.value = "weather",
						children: [/* @__PURE__ */ U(W, {
							icon: Ys(i.condition),
							size: 22
						}), i.temp != null && /* @__PURE__ */ U("span", { children: [Math.round(i.temp), "°"] })]
					}),
					e.header.calendars.length > 0 && /* @__PURE__ */ U("button", {
						type: "button",
						class: "chip-btn event-chip",
						onClick: () => Ws.value = "calendar",
						children: [/* @__PURE__ */ U(W, {
							icon: "mdi:calendar",
							size: 20
						}), /* @__PURE__ */ U("span", {
							class: "ellipsis",
							children: s ? `${s.start.toDateString() === r.toDateString() || s.start < r ? "" : "Tomorrow · "}${ac(s, n, e.header.clock24h)} ${s.summary}` : "No events"
						})]
					}),
					e.header.todoLists.length > 0 && /* @__PURE__ */ U("button", {
						type: "button",
						class: "chip-btn",
						onClick: () => Ws.value = "todo",
						"aria-label": `${c} reminders`,
						children: [/* @__PURE__ */ U(W, {
							icon: "mdi:format-list-checks",
							size: 20
						}), c > 0 && /* @__PURE__ */ U("span", {
							class: "count",
							children: c
						})]
					}),
					d && d.state === "playing" && /* @__PURE__ */ U("button", {
						type: "button",
						class: "chip-btn player-chip",
						onClick: () => H("media_player", "media_play_pause", { entity_id: d.entity_id }),
						title: "Pause",
						children: [/* @__PURE__ */ U(W, {
							icon: "mdi:pause",
							size: 20
						}), /* @__PURE__ */ U("span", {
							class: "ellipsis",
							children: d.attributes.media_title ?? F(t, d.entity_id)
						})]
					}),
					!Sn.value && /* @__PURE__ */ U(G, {
						icon: l ? "mdi:dock-left" : "mdi:fullscreen",
						label: l ? "Show the Home Assistant menu" : "Hide the Home Assistant menu",
						onClick: () => jn(!l)
					}),
					Sn.value && l && /* @__PURE__ */ U(G, {
						icon: "mdi:dock-left",
						label: "Show the Home Assistant menu",
						onClick: () => jn(!1)
					}),
					wn.value?.can_edit && !Dn.value && /* @__PURE__ */ U(S, { children: [/* @__PURE__ */ U(G, {
						icon: "mdi:pencil",
						label: "Edit dashboard",
						onClick: Hn
					}), /* @__PURE__ */ U(G, {
						icon: "mdi:cog",
						label: "Settings",
						onClick: Vs
					})] })
				]
			})]
		})]
	});
}
function yc({ cfg: e }) {
	let t = L.value, n = e.header.sceneStrip.filter((e) => t.states[e]);
	return n.length ? /* @__PURE__ */ U("div", {
		class: "scene-strip",
		children: n.map((e) => /* @__PURE__ */ U("button", {
			type: "button",
			class: "scene-chip",
			onClick: () => H(N(e), "turn_on", { entity_id: e }),
			children: [/* @__PURE__ */ U(W, {
				icon: cn(t, e),
				size: 18
			}), F(t, e)]
		}))
	}) : null;
}
function bc({ cfg: e, vertical: t, current: n }) {
	let r = dc(e), i = n ?? fc(B.value);
	return /* @__PURE__ */ U("nav", {
		class: t ? "nav-vertical" : "nav-pills",
		"aria-label": "Rooms and pages",
		children: r.map((n, a) => {
			let o = e.sections.find((e) => e.id === n.key), s = o && t ? Yo(L.value, o) : "";
			return /* @__PURE__ */ U(S, { children: [t && n.group && n.group !== r[a - 1]?.group && /* @__PURE__ */ U("div", {
				class: "nav-group",
				children: n.group
			}), /* @__PURE__ */ U("button", {
				type: "button",
				class: `nav-item ${i === n.key ? "selected" : ""}`,
				"aria-current": i === n.key ? "page" : void 0,
				onClick: () => B.value = n.view,
				children: [/* @__PURE__ */ U(W, {
					icon: n.icon,
					size: t ? 22 : 18
				}), /* @__PURE__ */ U("span", {
					class: "nav-text",
					children: [/* @__PURE__ */ U("span", { children: n.name }), s && /* @__PURE__ */ U("span", {
						class: "nav-status",
						children: s
					})]
				})]
			})] });
		})
	});
}
var xc = [
	"sm",
	"md",
	"lg",
	"wide"
];
function Sc({ section: e, cards: t, room: n, list: r }) {
	let i = Dn.value && !!e, [a, o] = O(null), s = et(null), c = i ? t.filter((e) => !e.hidden) : t.filter((e) => !e.hidden && L.value.states[e.entity]), l = (t) => Un((n) => {
		let r = n.sections.find((t) => t.id === e.id);
		r && t(r);
	}), u = (e, t) => {
		i && (s.current = {
			id: t,
			x: e.clientX,
			y: e.clientY,
			active: !1
		});
	}, d = (e) => {
		let t = s.current;
		if (!t) return;
		if (!t.active) {
			if (Math.hypot(e.clientX - t.x, e.clientY - t.y) < 10) return;
			t.active = !0, o(t.id), e.currentTarget.setPointerCapture(e.pointerId);
		}
		let n = (e.currentTarget.getRootNode().elementFromPoint(e.clientX, e.clientY)?.closest?.("[data-card-id]"))?.dataset.cardId;
		n && n !== t.id && l((e) => {
			let r = e.cards.findIndex((e) => e.id === t.id), i = e.cards.findIndex((e) => e.id === n);
			if (r < 0 || i < 0) return;
			let [a] = e.cards.splice(r, 1);
			e.cards.splice(i, 0, a);
		});
	}, f = () => {
		s.current = null, o(null);
	};
	return /* @__PURE__ */ U("div", {
		class: `grid ${r ? "as-list" : ""} ${i ? "is-editing" : ""}`,
		onPointerMove: d,
		onPointerUp: f,
		onPointerCancel: f,
		children: [
			c.map((t, o) => /* @__PURE__ */ U("div", {
				class: `cell size-${r ? "sm" : t.size}`,
				"data-card-id": t.id,
				onPointerDown: (e) => u(e, t.id),
				children: /* @__PURE__ */ U(oo, {
					card: r ? {
						...t,
						size: "sm"
					} : t,
					room: n,
					index: o,
					editing: i,
					dragging: a === t.id,
					onRemove: () => l((e) => {
						let n = e.cards.find((e) => e.id === t.id);
						n && (n.hidden = !0);
					}),
					onResize: () => l((e) => {
						let n = e.cards.find((e) => e.id === t.id);
						n && (n.size = xc[(xc.indexOf(n.size) + 1) % xc.length]);
					}),
					onEdit: () => Ba.value = {
						sectionId: e.id,
						cardId: t.id
					}
				})
			}, t.id)),
			i && /* @__PURE__ */ U("button", {
				type: "button",
				class: "cell size-sm add-tile",
				onClick: () => za.value = e.id,
				children: [/* @__PURE__ */ U(W, {
					icon: "mdi:plus",
					size: 28
				}), /* @__PURE__ */ U("span", { children: "Add device" })]
			}),
			!i && c.length === 0 && /* @__PURE__ */ U("div", {
				class: "empty",
				children: [/* @__PURE__ */ U(W, {
					icon: "mdi:view-grid-plus-outline",
					size: 36
				}), /* @__PURE__ */ U("p", { children: ["Nothing here yet.", wn.value?.can_edit ? " Tap the pencil to add devices." : ""] })]
			})
		]
	});
}
var Cc = (e, t = "sm") => e.map((e) => ({
	id: e,
	entity: e,
	size: t
}));
function wc({ cfg: e, v: t, list: n }) {
	if (t.type === "home") return /* @__PURE__ */ U(as, {
		cfg: n ? {
			...e,
			home: {
				...e.home,
				rooms: !1
			}
		} : e,
		renderCards: (e) => /* @__PURE__ */ U(Sc, {
			cards: e,
			list: n
		})
	});
	if (t.type === "irrigation") return /* @__PURE__ */ U(Wo, { cfg: e });
	if (t.type === "section") {
		let r = e.sections.find((e) => e.id === t.id);
		return r ? /* @__PURE__ */ U(S, { children: [!Dn.value && /* @__PURE__ */ U(Qo, { section: r }), /* @__PURE__ */ U(Sc, {
			section: r,
			cards: r.cards,
			room: r.kind === "room" ? r.name : void 0,
			list: n
		})] }) : null;
	}
	if (t.type === "media") return /* @__PURE__ */ U(Sc, {
		cards: Cc(mc(e), n ? "sm" : "wide"),
		list: n
	});
	if (t.type === "security") {
		let t = gc(e), r = (e) => [
			"alarm_control_panel",
			"lock",
			"binary_sensor",
			"camera"
		].indexOf(N(e));
		return t.sort((e, t) => r(e) - r(t)), /* @__PURE__ */ U(Sc, {
			cards: t.map((e) => ({
				id: e,
				entity: e,
				size: N(e) === "camera" && !n ? "wide" : "sm"
			})),
			list: n
		});
	}
	return /* @__PURE__ */ U(Sc, {
		cards: Cc(_c(e)),
		list: n
	});
}
function Tc(e, t) {
	return t.type === "section" ? e.sections.find((e) => e.id === t.id)?.name ?? "" : t.type === "home" ? e.title || "Home" : t.type === "irrigation" ? "Irrigation" : t.type === "media" ? "Media" : t.type === "security" ? "Security" : "Scenes";
}
function Ec(e) {
	if (e.layout === "list" || e.layout === "focus") return e.layout;
	let t = e.theme.nav ?? "auto";
	return t === "side" ? "sidebar" : t === "tabs" || t === "dock" ? "grid" : e.layout === "auto" ? Cn.value >= 1100 ? "sidebar" : "grid" : e.layout;
}
function Dc(e) {
	let t = Ec(e);
	return t === "list" || t === "focus" ? "none" : e.theme.nav === "dock" ? "dock" : t === "sidebar" && Cn.value >= 720 ? "side" : "tabs";
}
function Oc({ cfg: e }) {
	let t = dc(e), n = B.value && t.some((e) => e.key === fc(B.value)) ? B.value : t[0]?.view;
	if (!n) return /* @__PURE__ */ U("div", {
		class: "empty big-empty",
		children: [
			/* @__PURE__ */ U(W, {
				icon: "mdi:home-plus-outline",
				size: 48
			}),
			/* @__PURE__ */ U("p", { children: "No rooms or pages yet." }),
			wn.value?.can_edit && /* @__PURE__ */ U("p", {
				class: "muted",
				children: "Open edit mode and add a room to get started."
			})
		]
	});
	let r = Ec(e), i = fc(n), a = n.type === "section" ? e.sections.find((e) => e.id === n.id) : void 0, o = r !== "list" && a?.background ? /* @__PURE__ */ U("div", {
		class: "room-wallpaper",
		style: `background-image:url("${a.background.replace(/["\\]/g, "")}")`
	}) : null;
	if (r === "list") return /* @__PURE__ */ U("div", {
		class: "layout-list",
		children: t.map((n, r) => /* @__PURE__ */ U(S, { children: [n.group && n.group !== t[r - 1]?.group && /* @__PURE__ */ U("h2", {
			class: "floor-title list-floor",
			children: n.group
		}), /* @__PURE__ */ U("section", {
			class: "list-section",
			children: [n.key !== "home" && /* @__PURE__ */ U("h2", {
				class: "section-title",
				children: [
					/* @__PURE__ */ U(W, {
						icon: n.icon,
						size: 20
					}),
					" ",
					n.name
				]
			}), /* @__PURE__ */ U(wc, {
				cfg: e,
				v: n.view,
				list: !0
			})]
		}, n.key)] }))
	});
	if (r === "sidebar" && !Sn.value && Cn.value >= 720) return /* @__PURE__ */ U("div", {
		class: "layout-sidebar",
		children: [
			o,
			/* @__PURE__ */ U(bc, {
				cfg: e,
				vertical: !0,
				current: i
			}),
			/* @__PURE__ */ U("main", {
				class: "content",
				children: [/* @__PURE__ */ U("h2", {
					class: "section-title",
					children: Tc(e, n)
				}), /* @__PURE__ */ U(wc, {
					cfg: e,
					v: n
				})]
			})
		]
	});
	if (r === "focus") {
		let r = t.findIndex((e) => e.key === fc(n));
		return /* @__PURE__ */ U(S, { children: [o, /* @__PURE__ */ U(kc, {
			cfg: e,
			v: n,
			idx: r,
			count: t.length,
			go: (e) => B.value = t[(r + e + t.length) % t.length].view,
			items: t
		})] });
	}
	return /* @__PURE__ */ U("div", {
		class: "layout-grid",
		children: [
			o,
			/* @__PURE__ */ U(bc, {
				cfg: e,
				current: i
			}),
			/* @__PURE__ */ U("main", {
				class: "content",
				children: [(e.theme.nav === "dock" || e.theme.titles === "big" || e.theme.titles === "bold") && /* @__PURE__ */ U("h2", {
					class: "section-title page-title",
					children: Tc(e, n)
				}), /* @__PURE__ */ U(wc, {
					cfg: e,
					v: n
				})]
			})
		]
	});
}
function kc(e) {
	let t = et(null);
	return /* @__PURE__ */ U("div", {
		class: "layout-focus",
		onTouchStart: (e) => t.current = e.touches[0].clientX,
		onTouchEnd: (n) => {
			if (t.current === null || Dn.value) return;
			let r = n.changedTouches[0].clientX - t.current;
			t.current = null, Math.abs(r) > 70 && e.go(r < 0 ? 1 : -1);
		},
		children: [
			/* @__PURE__ */ U("div", {
				class: "focus-head",
				children: [
					/* @__PURE__ */ U(G, {
						icon: "mdi:chevron-left",
						label: "Previous room",
						onClick: () => e.go(-1)
					}),
					/* @__PURE__ */ U("h2", {
						class: "focus-title",
						children: Tc(e.cfg, e.v)
					}),
					/* @__PURE__ */ U(G, {
						icon: "mdi:chevron-right",
						label: "Next room",
						onClick: () => e.go(1)
					})
				]
			}),
			/* @__PURE__ */ U("div", {
				class: "focus-dots",
				children: e.items.map((t, n) => /* @__PURE__ */ U("button", {
					type: "button",
					class: `dot ${n === e.idx ? "on" : ""}`,
					"aria-label": t.name,
					onClick: () => B.value = t.view
				}))
			}),
			/* @__PURE__ */ U("main", {
				class: "content",
				children: /* @__PURE__ */ U(wc, {
					cfg: e.cfg,
					v: e.v
				})
			})
		]
	});
}
// src/components/tablet.tsx
function Ac(e, t, n) {
	let r = et(e);
	r.current = e, k(() => {
		if (!n || t <= 0) return;
		let e = () => r.current(), i = window.setTimeout(e, t * 6e4), a = () => {
			clearTimeout(i), i = window.setTimeout(e, t * 6e4);
		}, o = [
			"pointerdown",
			"keydown",
			"wheel",
			"touchstart"
		];
		return o.forEach((e) => window.addEventListener(e, a, { passive: !0 })), () => {
			clearTimeout(i), o.forEach((e) => window.removeEventListener(e, a));
		};
	}, [n, t]);
}
function jc({ cfg: e }) {
	let [t, n] = O(!1);
	return Ac(() => n(!0), e.tablet.screensaverMinutes, e.tablet.screensaver && !t), Ac(() => B.value = null, e.tablet.returnHomeMinutes, e.tablet.returnHomeMinutes > 0), t ? /* @__PURE__ */ U(Mc, {
		cfg: e,
		onWake: () => n(!1)
	}) : null;
}
function Mc({ cfg: e, onWake: t }) {
	let n = L.value, r = n.locale?.language ?? n.language, i = Gs(1e3), a = ec(n, e), o = new Date(i.getFullYear(), i.getMonth(), i.getDate()), s = ic(n, e.header.calendars, o, new Date(o.getTime() + 864e5), Math.floor(i.getTime() / 6e5)).find((e) => e.end > i), c = e.tablet.screensaverStyle, l = [
		[0, 0],
		[3, 2],
		[-3, 4],
		[4, -3],
		[-2, -4],
		[2, 5],
		[-4, 1],
		[1, -2]
	][Math.floor(i.getTime() / 6e4) % 8];
	return /* @__PURE__ */ U("div", {
		class: `screensaver ss-${c}`,
		role: "button",
		tabIndex: 0,
		"aria-label": "Tap to wake",
		onPointerDown: (e) => {
			e.stopPropagation(), e.preventDefault(), t();
		},
		onKeyDown: t,
		children: c !== "black" && /* @__PURE__ */ U("div", {
			class: "ss-content",
			style: `transform:translate(${l[0]}vw,${l[1]}vh)`,
			children: [
				/* @__PURE__ */ U("div", {
					class: "ss-clock",
					children: Ks(i, e.header.clock24h, r)
				}),
				/* @__PURE__ */ U("div", {
					class: "ss-date",
					children: i.toLocaleDateString(r, {
						weekday: "long",
						month: "long",
						day: "numeric"
					})
				}),
				c === "clock" && /* @__PURE__ */ U("div", {
					class: "ss-extra",
					children: [a && /* @__PURE__ */ U("span", { children: [/* @__PURE__ */ U(W, {
						icon: Ys(a.condition),
						size: 32
					}), a.temp != null && `${Math.round(a.temp)}°`] }), s && /* @__PURE__ */ U("span", { children: [
						/* @__PURE__ */ U(W, {
							icon: "mdi:calendar",
							size: 28
						}),
						" ",
						ac(s, r, e.header.clock24h),
						" ",
						s.summary
					] })]
				})
			]
		})
	});
}
function Nc({ cfg: e }) {
	return Pc(Mn(e.tablet.hideSidebar)), null;
}
function Pc(e) {
	k(() => {
		let t = new URLSearchParams(location.search).has("menu"), n = (e) => {
			try {
				let t = document.querySelector("home-assistant")?.shadowRoot?.querySelector("home-assistant-main")?.shadowRoot, n = t?.querySelector("ha-drawer"), r = t?.querySelector("ha-sidebar");
				r && (r.style.display = e ? "none" : ""), n && n.style.setProperty("--mdc-drawer-width", e ? "0px" : "");
				let i = n?.shadowRoot?.querySelector(".mdc-drawer");
				i && (i.style.display = e ? "none" : "");
				let a = n?.shadowRoot?.querySelector(".mdc-drawer-app-content");
				a && (a.style.marginLeft = e ? "0" : "");
			} catch {}
		}, r = e && !t;
		if (n(r), !r) return;
		let i = window.setInterval(() => n(!0), 2e3);
		return () => {
			clearInterval(i), n(!1);
		};
	}, [e]);
}
// src/app.tsx
function Fc(e, t) {
	let n = e.theme, r, i = {};
	if (n.background === "image" && n.backgroundImage) r = `center / cover no-repeat url("${n.backgroundImage.replace(/["\\]/g, "")}")`;
	else {
		let e = Ce.find((e) => e.id === n.background) ?? Ce[0];
		r = t ? e.dark : e.light, i = (t ? e.panel?.dark : e.panel?.light) ?? {};
	}
	return `${Object.entries(i).map(([e, t]) => `${e}:${t};`).join("")}--accent:${n.accent};--radius:${n.radius}px;--page-bg:${r};--font:${Ie(n.font).replace(/"/g, "'")};`;
}
var Ic = {
	blocks: 2.4,
	dials: 1.5,
	squares: 2
};
function Lc({ cfg: e, children: t }) {
	let n = L.value, r = e.theme.mode === "dark" || e.theme.mode === "auto" && !!n.themes?.darkMode, i = e.theme, a = Ic[i.shape] ?? 1.75, o = Dc(e);
	return /* @__PURE__ */ U(Na.Provider, {
		value: {
			line: i.icons !== "ha",
			stroke: a
		},
		children: /* @__PURE__ */ U("div", {
			class: `df-root ${r ? "dark" : "light"} shape-${i.shape} color-${i.color} titles-${i.titles} nav-${o} cards-${i.cardStyle} density-${e.theme.density} ${Dn.value ? "editing" : ""}`,
			style: Fc(e, r),
			children: [t, Fn.value && /* @__PURE__ */ U("div", {
				class: `toast ${Fn.value.kind}`,
				role: "status",
				children: Fn.value.text
			})]
		})
	});
}
function Rc({ children: e }) {
	return /* @__PURE__ */ U("div", {
		class: "centered",
		children: e
	});
}
function zc({ cfg: e, h: t }) {
	let n = ro.value, r = t.locale?.language ?? t.language, i = tc(t, n?.kind === "weather" ? n.entity : void 0, !1);
	if (!n) return null;
	let a = () => ro.value = null;
	return n.kind === "weather" ? i ? /* @__PURE__ */ U(nc, {
		data: i,
		lang: r,
		h24: e.header.clock24h,
		onClose: a
	}) : null : n.kind === "calendar" ? /* @__PURE__ */ U(oc, {
		cfg: e,
		lang: r,
		calendars: [n.entity],
		onClose: a
	}) : /* @__PURE__ */ U(uc, {
		cfg: e,
		lists: [n.entity],
		onClose: a
	});
}
function Bc({ cfg: e, h: t }) {
	let n = ec(t, e), r = t.locale?.language ?? t.language;
	return /* @__PURE__ */ U(S, { children: [
		/* @__PURE__ */ U(zc, {
			cfg: e,
			h: t
		}),
		Ws.value === "weather" && n && /* @__PURE__ */ U(nc, {
			data: n,
			lang: r,
			h24: e.header.clock24h
		}),
		Ws.value === "calendar" && /* @__PURE__ */ U(oc, {
			cfg: e,
			lang: r
		}),
		Ws.value === "todo" && /* @__PURE__ */ U(uc, { cfg: e })
	] });
}
function Vc() {
	let e = L.value;
	if (!e) return null;
	let t = $.value ?? R.value;
	if (En.value) return /* @__PURE__ */ U("div", {
		class: "df-root light",
		children: /* @__PURE__ */ U(Rc, { children: [
			/* @__PURE__ */ U(W, {
				icon: "mdi:alert-circle-outline",
				size: 48
			}),
			/* @__PURE__ */ U("h2", { children: "DashForge couldn't load" }),
			/* @__PURE__ */ U("p", {
				class: "muted",
				children: En.value
			}),
			/* @__PURE__ */ U(K, {
				kind: "primary",
				onClick: zn,
				children: "Try again"
			})
		] })
	});
	if (!wn.value) return /* @__PURE__ */ U("div", {
		class: "df-root light",
		children: /* @__PURE__ */ U(Rc, { children: /* @__PURE__ */ U("div", {
			class: "spinner",
			"aria-label": "Loading"
		}) })
	});
	if (Pn.value && $.value) return /* @__PURE__ */ U(Lc, {
		cfg: $.value,
		children: /* @__PURE__ */ U(zs, {})
	});
	let n = On.value;
	if (!n || !n.setupComplete) return /* @__PURE__ */ U(Lc, {
		cfg: t ?? Ee(),
		children: /* @__PURE__ */ U(Rc, { children: /* @__PURE__ */ U("div", {
			class: "welcome-card",
			children: [
				/* @__PURE__ */ U(W, {
					icon: "mdi:anvil",
					size: 56
				}),
				/* @__PURE__ */ U("h1", { children: "Welcome to DashForge" }),
				wn.value.can_edit ? /* @__PURE__ */ U(S, { children: [/* @__PURE__ */ U("p", { children: "Let's build a dashboard that fits your home. The setup asks you about your rooms, devices, layout and look, one step at a time. It takes about five minutes, and you can change everything afterwards." }), /* @__PURE__ */ U(K, {
					kind: "primary",
					icon: "mdi:arrow-right",
					onClick: Rs,
					children: "Start setup"
				})] }) : /* @__PURE__ */ U("p", { children: "This dashboard hasn't been set up yet. Ask an administrator of this Home Assistant to open DashForge and finish the setup." })
			]
		}) })
	});
	let r = Nn.value && $.value ? $.value : n;
	return /* @__PURE__ */ U(Lc, {
		cfg: r,
		children: [
			/* @__PURE__ */ U("div", {
				class: "dashboard",
				children: [
					/* @__PURE__ */ U(vc, { cfg: r }),
					/* @__PURE__ */ U(yc, { cfg: r }),
					/* @__PURE__ */ U(Oc, { cfg: r })
				]
			}),
			/* @__PURE__ */ U(Ka, {}),
			/* @__PURE__ */ U(Oo, {}),
			/* @__PURE__ */ U(Lo, {}),
			/* @__PURE__ */ U(qa, {}),
			/* @__PURE__ */ U(Ya, {}),
			/* @__PURE__ */ U(Za, {}),
			/* @__PURE__ */ U(Xa, {}),
			/* @__PURE__ */ U(rs, {}),
			/* @__PURE__ */ U(zo, {}),
			/* @__PURE__ */ U(Bc, {
				cfg: r,
				h: e
			}),
			Nn.value && /* @__PURE__ */ U(Hs, {}),
			!Dn.value && /* @__PURE__ */ U(jc, { cfg: r }),
			/* @__PURE__ */ U(Nc, { cfg: r })
		]
	});
}
// src/styles.css?inline
var Hc = ":host{height:100%;display:block}.df-mount,.df-root{height:100%}.df-root{--accent:#3b82f6;--radius:20px;--gap:14px;--tile-h:112px;--tile-min:150px;--text:#0f172a;--muted:#64748b;--card:#ffffffb8;--card-solid:#fff;--card-border:#0f172a0f;--card-shadow:0 1px 2px #0f172a0f, 0 8px 24px #0f172a0f;--chip:#fff9;--surface:#fff;--surface-2:#f1f5f9;--line:#0f172a1a;--icon-bg:#0f172a0f;--tile-active:var(--accent);--danger:#ef4444;--page-bg:#f4f4f5;box-sizing:border-box;min-height:100vh;color:var(--text);background:var(--page-bg);font-family:var(--font,system-ui, -apple-system, \"Segoe UI\", Roboto, sans-serif);-webkit-font-smoothing:antialiased;-webkit-tap-highlight-color:transparent;background-attachment:fixed;font-size:15px;line-height:1.4;position:relative;overflow-y:auto}.df-root.dark{--text:#f1f5f9;--muted:#94a3b8;--card:#1e293b8c;--card-solid:#1e293b;--card-border:#ffffff12;--card-shadow:0 1px 2px #0000004d, 0 8px 24px #00000040;--chip:#1e293b99;--surface:#172033;--surface-2:#0f172a;--line:#ffffff1a;--icon-bg:#ffffff14}.df-root.density-compact{--gap:8px;--tile-h:92px;--tile-min:130px}*,:before,:after{box-sizing:border-box}button{font:inherit;color:inherit;cursor:pointer}button:focus-visible,[tabindex]:focus-visible,.input:focus-visible{outline:2px solid var(--accent);outline-offset:2px}h1,h2,h3{letter-spacing:-.01em;margin:0;font-weight:650}p{margin:0 0 12px}.muted{color:var(--muted)}.small{font-size:.85em}.nowrap{white-space:nowrap}.ellipsis{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}ha-icon{flex:none;display:inline-flex}.btn{border:1px solid var(--line);background:var(--surface);white-space:nowrap;border-radius:999px;align-items:center;gap:6px;min-height:40px;padding:8px 16px;font-weight:550;transition:background .15s,transform .1s;display:inline-flex}.btn:active{transform:scale(.97)}.btn:disabled{opacity:.45;cursor:default}.btn-primary{background:var(--accent);color:#fff;border-color:#0000}.btn-ghost{background:0 0;border-color:#0000}.btn-ghost:hover{background:var(--icon-bg)}.btn-danger{border-color:color-mix(in srgb, var(--danger) 40%, transparent);color:var(--danger);background:0 0}.btn-row{flex-wrap:wrap;align-items:center;gap:8px;display:flex}.icon-btn{background:0 0;border:none;border-radius:50%;justify-content:center;align-items:center;width:44px;height:44px;transition:background .15s;display:inline-flex}.icon-btn:hover{background:var(--icon-bg)}.icon-btn.active,.icon-btn.play{background:var(--accent);color:#fff}.icon-btn:disabled{opacity:.3;cursor:default}.btn-group{align-items:center;gap:4px;display:flex}.toggle{background:var(--line);border:none;border-radius:999px;flex:none;width:52px;height:30px;transition:background .2s;position:relative}.toggle .knob{background:#fff;border-radius:50%;width:24px;height:24px;transition:transform .2s;position:absolute;top:3px;left:3px;box-shadow:0 1px 3px #0000004d}.toggle.on{background:var(--accent)}.toggle.on .knob{transform:translate(22px)}.checkbox{border:2px solid var(--line);color:#fff;background:0 0;border-radius:7px;flex:none;justify-content:center;align-items:center;width:24px;height:24px;display:inline-flex}.checkbox.on{border-color:var(--accent);background:var(--accent)}.slider{--slider-color:var(--accent);background:var(--icon-bg);touch-action:none;cursor:pointer;-webkit-user-select:none;user-select:none;border-radius:12px;height:40px;position:relative;overflow:hidden}.slider-fill{background:var(--slider-color);opacity:.85;height:100%;transition:width .15s,height .15s;position:absolute;bottom:0;left:0}.slider.dragging .slider-fill{transition:none}.slider.vertical .slider-fill{width:100%}.slider-label{pointer-events:none;mix-blend-mode:normal;text-shadow:0 0 6px var(--card-solid);justify-content:center;align-items:center;font-size:.85em;font-weight:600;display:flex;position:absolute;inset:0}.slider.vertical{width:44px;height:100%;min-height:80px}.ct-slider{background:linear-gradient(90deg,#ffb46b,#fff4e5,#cfe3ff)}.ct-slider .slider-fill{border-right:3px solid var(--text);background:0 0}.segmented{background:var(--icon-bg);border-radius:14px;flex-wrap:wrap;gap:4px;padding:4px;display:inline-flex}.segmented button{background:0 0;border:none;border-radius:10px;align-items:center;gap:6px;min-height:36px;padding:6px 14px;font-weight:550;display:inline-flex}.segmented button.selected{background:var(--surface);box-shadow:0 1px 3px #0000001f}.input{border:1px solid var(--line);background:var(--surface);width:100%;min-height:42px;color:var(--text);font:inherit;border-radius:12px;padding:8px 12px}.input.bare{background:0 0;border:none;padding:8px 4px}.field{flex-direction:column;gap:6px;margin-bottom:16px;display:flex}.field-label,.labeled-label{letter-spacing:.04em;text-transform:uppercase;color:var(--muted);font-size:.8em;font-weight:650}.labeled-label{margin:18px 0 8px}.field-hint{color:var(--muted);font-size:.85em}.row{border-bottom:1px solid var(--line);align-items:center;gap:12px;padding:12px 0;display:flex}.row-text{flex:1;min-width:0}.row-label{font-weight:550}.row-hint{color:var(--muted);font-size:.85em}.chips{flex-wrap:wrap;gap:8px;display:flex}.chips.scroll{scrollbar-width:none;flex-wrap:nowrap;padding-bottom:4px;overflow-x:auto}.chip{border:1px solid var(--line);background:var(--surface);white-space:nowrap;border-radius:999px;align-items:center;gap:6px;min-height:36px;padding:6px 14px;display:inline-flex}.chip.selected{border-color:var(--accent);background:color-mix(in srgb, var(--accent) 15%, var(--surface));color:var(--accent);font-weight:600}.swatches{flex-wrap:wrap;gap:10px;display:flex}.swatch{border:2px solid var(--line);border-radius:50%;width:38px;height:38px;padding:0}.swatch.selected{outline:3px solid var(--text);outline-offset:2px}.color-input{background:conic-gradient(red,#ff0,#0f0,#0ff,#00f,#f0f,red);overflow:hidden}.color-input::-webkit-color-swatch-wrapper{opacity:0;padding:0}.icon-picker{flex-direction:column;gap:8px;margin-top:6px;display:flex}.icon-grid{grid-template-columns:repeat(auto-fill,minmax(42px,1fr));gap:6px;display:grid}.icon-choice{border:1px solid var(--line);background:var(--surface);border-radius:12px;justify-content:center;align-items:center;width:42px;height:42px;display:inline-flex}.icon-choice.selected{border-color:var(--accent);color:var(--accent)}.dashboard{max-width:1600px;margin:0 auto;padding:20px 24px 120px}.header{flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px 24px;margin-bottom:16px;display:flex}.header-left{align-items:center;gap:8px;min-width:0;display:flex}.title{font-size:1.75rem}.subtitle{color:var(--muted)}.header-right{flex-wrap:wrap;align-items:center;gap:12px;display:flex}.clock{white-space:nowrap;font-variant-numeric:tabular-nums;letter-spacing:-.02em;flex:none;font-size:2rem;font-weight:300}.header-chips{flex-wrap:wrap;align-items:center;gap:8px;display:flex}.chip-btn{border:1px solid var(--card-border);background:var(--chip);-webkit-backdrop-filter:blur(14px);border-radius:999px;align-items:center;gap:6px;max-width:260px;min-height:44px;padding:8px 14px;font-weight:550;display:inline-flex}.chip-btn .count{background:var(--accent);color:#fff;text-align:center;border-radius:999px;min-width:22px;padding:0 6px;font-size:.8em}.header-chips .icon-btn{background:var(--chip);-webkit-backdrop-filter:blur(14px);border:1px solid var(--card-border)}.scene-strip{scrollbar-width:none;gap:8px;margin-bottom:16px;display:flex;overflow-x:auto}.scene-chip{border:1px solid var(--card-border);background:var(--card);-webkit-backdrop-filter:blur(14px);border-radius:999px;flex:none;align-items:center;gap:8px;min-height:40px;padding:8px 16px;font-weight:550;transition:transform .1s;display:inline-flex}.scene-chip:active{transform:scale(.96)}.nav-pills{scrollbar-width:none;gap:8px;margin-bottom:18px;display:flex;overflow-x:auto}.nav-pills .nav-item{border:1px solid var(--card-border);background:var(--chip);-webkit-backdrop-filter:blur(14px);border-radius:999px;flex:none;align-items:center;gap:8px;min-height:42px;padding:8px 16px;font-weight:550;display:inline-flex}.nav-item.selected{color:#fff;background:var(--accent)!important;border-color:#0000!important}.nav-text{text-align:left;flex-direction:column;align-items:flex-start;display:flex}.nav-status{opacity:.75;font-size:.8em;font-weight:450}.layout-sidebar{grid-template-columns:240px 1fr;align-items:start;gap:24px;display:grid}.nav-vertical{border:1px solid var(--card-border);border-radius:var(--radius);background:var(--card);-webkit-backdrop-filter:blur(18px);flex-direction:column;gap:4px;padding:8px;display:flex;position:sticky;top:16px}.nav-vertical .nav-item{border-radius:calc(var(--radius) * .6);background:0 0;border:1px solid #0000;align-items:center;gap:12px;min-height:52px;padding:8px 12px;font-weight:550;display:flex}.nav-vertical .nav-item:hover{background:var(--icon-bg)}.section-title{align-items:center;gap:8px;margin:4px 0 14px;font-size:1.25rem;display:flex}.list-section{margin-bottom:28px}.layout-focus .focus-head{justify-content:center;align-items:center;gap:16px;display:flex}.focus-title{text-align:center;min-width:200px;font-size:2rem}.focus-dots{justify-content:center;gap:8px;margin:10px 0 22px;display:flex}.dot{background:var(--line);border:none;border-radius:50%;width:10px;height:10px;padding:0}.dot.on{background:var(--accent);border-radius:999px;width:26px}.layout-focus{--tile-h:140px;--tile-min:190px}.grid{grid-template-columns:repeat(auto-fill, minmax(var(--tile-min), 1fr));grid-auto-rows:var(--tile-h);grid-auto-flow:dense;gap:var(--gap);display:grid;container-type:inline-size}.cell{touch-action:manipulation;min-width:0}.cell.size-md{grid-column:span 2}.cell.size-lg{grid-area:span 2/span 2}.cell.size-wide{grid-area:span 2/span 3}@container (width<=520px){.cell.size-wide{grid-column:span 2}}@container (width<=300px){.cell.size-md,.cell.size-lg,.cell.size-wide{grid-column:span 1}}.grid.as-list{grid-template-columns:repeat(auto-fill,minmax(260px,1fr));grid-auto-rows:68px}.grid.as-list .tile{flex-direction:row;justify-content:flex-start;align-items:center;gap:12px;padding:10px 14px}.grid.as-list .tile-icon{width:42px;height:42px}.tile{border:1px solid var(--card-border);border-radius:var(--radius);background:var(--card-solid);height:100%;box-shadow:var(--card-shadow);cursor:pointer;-webkit-user-select:none;user-select:none;flex-direction:column;justify-content:space-between;padding:14px;transition:transform .12s,background .2s,box-shadow .2s;display:flex;position:relative;overflow:hidden}.cards-glass .tile{background:var(--card);-webkit-backdrop-filter:blur(18px)saturate(1.3)}.tile:active{transform:scale(.97)}.tile.active{background:color-mix(in srgb, var(--tile-active) 16%, var(--card-solid))}.cards-glass .tile.active{background:color-mix(in srgb, var(--tile-active) 20%, var(--card))}.tile.unavailable{opacity:.5}.tile-icon{background:var(--icon-bg);border-radius:50%;flex:none;justify-content:center;align-items:center;width:44px;height:44px;transition:background .2s,color .2s;display:inline-flex}.tile.active .tile-icon,.tile-icon.big.active{background:var(--tile-active);color:#fff}.tile-icon.big{width:64px;height:64px}.tile-text{min-width:0}.tile-name{white-space:nowrap;text-overflow:ellipsis;font-weight:600;overflow:hidden}.tile-state{color:var(--muted);white-space:nowrap;text-overflow:ellipsis;font-size:.88em;overflow:hidden}.tile-value{font-size:1.4rem;font-weight:650;line-height:1.1}.big-body{flex-direction:column;justify-content:space-between;gap:10px;height:100%;display:flex}.big-top{align-items:center;gap:12px;min-width:0;display:flex}.cover-row{flex:1;justify-content:space-between;align-items:stretch;gap:10px;min-height:0;display:flex}.cover-row .btn-group{flex-direction:column;justify-content:center}.cover-slider{min-height:0}.climate-ring{flex:1;justify-content:center;align-items:center;min-height:0;display:flex;position:relative}.climate-ring svg{width:auto;height:100%;max-height:170px}.climate-ring.big svg{max-height:240px}.ring-track,.ring-value{fill:none;stroke-width:10px;stroke-linecap:round}.ring-track{stroke:var(--icon-bg)}.ring-value{transition:stroke-dasharray .3s}.ring-center{pointer-events:none;flex-direction:column;justify-content:center;align-items:center;display:flex;position:absolute;inset:0}.ring-target{font-size:1.9rem;font-weight:650}.climate-ring.big .ring-target{font-size:2.6rem}.ring-target.range{font-size:1.4rem}.climate-ring.big .ring-target.range{font-size:2rem}.ring-current{color:var(--muted);font-size:.85em}.ring-buttons{justify-content:space-between;display:flex;position:absolute;bottom:0;left:0;right:0}.ring-buttons .icon-btn{background:var(--icon-bg)}.media-big{position:relative}.media-art-bg{filter:blur(28px)saturate(1.4);opacity:.35;pointer-events:none;background-position:50%;background-size:cover;position:absolute;inset:-20px}.media-big>*{position:relative}.media-art{object-fit:cover;border-radius:50%;width:100%;height:100%}.media-controls{flex-direction:column;gap:8px;display:flex}.media-controls .btn-group{justify-content:center}.camera-big{height:calc(100% + 28px);margin:-14px;position:relative}.camera-img{object-fit:cover;border-radius:inherit;background:#000;width:100%;height:100%;display:block}.controls .camera-img{border-radius:12px;height:auto}.camera-empty{height:100%;color:var(--muted);justify-content:center;align-items:center;display:flex}.camera-label{color:#fff;background:#0000008c;border-radius:999px;padding:4px 10px;font-size:.85em;font-weight:600;position:absolute;bottom:10px;left:12px}.sensor-big{justify-content:center}.sensor-value{font-size:2.4rem;font-weight:650;line-height:1}.empty{color:var(--muted);text-align:center;flex-direction:column;grid-column:1/-1;align-items:center;gap:8px;padding:40px 12px;display:flex}.big-empty{justify-content:center;min-height:50vh}@keyframes wiggle{0%,to{transform:rotate(-.6deg)}50%{transform:rotate(.6deg)}}.tile.editing{cursor:grab;animation:.28s ease-in-out infinite wiggle}.cell:nth-child(2n) .tile.editing{animation-delay:-.14s}@media (prefers-reduced-motion:reduce){.tile.editing{outline:2px dashed var(--line);animation:none}}.tile.dragging{opacity:.6;cursor:grabbing;animation:none;transform:scale(1.04);box-shadow:0 16px 40px #00000040}.is-editing{touch-action:none}.badge{z-index:2;border:none;border-radius:50%;justify-content:center;align-items:center;width:28px;height:28px;display:inline-flex;position:absolute;box-shadow:0 2px 6px #00000040}.badge-remove{background:var(--danger);color:#fff;top:6px;left:6px}.badge-resize{background:var(--surface);bottom:6px;right:6px}.add-tile{border:2px dashed var(--line);border-radius:var(--radius);color:var(--muted);background:0 0;flex-direction:column;justify-content:center;align-items:center;gap:6px;font-weight:600;display:flex}.edit-bar{z-index:20;border:1px solid var(--card-border);background:var(--surface);border-radius:24px;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px;width:min(960px,100% - 24px);padding:10px;display:flex;position:fixed;bottom:18px;left:50%;transform:translate(-50%);box-shadow:0 12px 40px #00000040}.edit-bar-group{flex-wrap:wrap;gap:6px;display:flex}.modal-backdrop{z-index:50;background:#00000073;justify-content:center;align-items:center;padding:16px;animation:.15s ease-out fade;display:flex;position:fixed;inset:0}@keyframes fade{0%{opacity:0}}@keyframes rise{0%{opacity:0;transform:translateY(16px)}}.modal{background:var(--surface);border-radius:24px;flex-direction:column;width:min(480px,100%);max-height:min(88vh,900px);animation:.2s ease-out rise;display:flex;box-shadow:0 24px 64px #00000059}.modal.wide{width:min(820px,100%)}.modal-head{justify-content:space-between;align-items:center;gap:12px;padding:14px 14px 8px 22px;display:flex}.modal-head h2{white-space:nowrap;text-overflow:ellipsis;font-size:1.2rem;overflow:hidden}.modal-body{flex:1;padding:4px 22px 20px;overflow-y:auto}.modal-foot{border-top:1px solid var(--line);flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px;padding:12px 18px;display:flex}.modal-foot>:only-child{margin-left:auto}@media (width<=600px){.modal-backdrop{align-items:flex-end;padding:0}.modal,.modal.wide{border-radius:24px 24px 0 0;width:100%;max-height:92vh}}.detail-head{flex-direction:column;align-items:center;gap:8px;margin:6px 0 18px;display:flex}.detail-state{font-size:1.15rem;font-weight:600}.controls{flex-direction:column;gap:14px;display:flex}.control-row{justify-content:space-between;align-items:center;gap:12px;font-weight:600;display:flex}.labeled .labeled-label{margin-top:0}.media-art-large{aspect-ratio:1;object-fit:cover;border-radius:16px;width:100%;max-width:260px;margin:0 auto}.media-meta{text-align:center;flex-direction:column;display:flex}.history-chart{width:100%;height:auto}.history-line{fill:none;stroke:var(--accent);stroke-width:2px;vector-effect:non-scaling-stroke}.history-area{fill:color-mix(in srgb, var(--accent) 18%, transparent)}.history-range{justify-content:space-between;font-size:.85em;display:flex}.weather-now{align-items:center;gap:16px;display:flex}.weather-temp{font-size:2.6rem;font-weight:300;line-height:1}.hourly{gap:6px;padding-bottom:6px;display:flex;overflow-x:auto}.hour{background:var(--surface-2);border-radius:14px;flex-direction:column;flex:none;align-items:center;gap:4px;width:64px;padding:10px 4px;font-size:.9em;display:flex}.precip{color:#3b82f6;font-size:.8em;font-weight:600}.daily{flex-direction:column;display:flex}.day{border-bottom:1px solid var(--line);grid-template-columns:1fr 32px 48px 90px;align-items:center;gap:8px;padding:10px 0;display:grid}.day-temps{text-align:right}.cal-head{justify-content:space-between;align-items:center;display:flex}.cal-grid{grid-template-columns:repeat(7,1fr);gap:4px;display:grid}.cal-dow{color:var(--muted);text-align:center;padding:4px 0;font-size:.8em;font-weight:600}.cal-day{background:var(--surface-2);border:none;border-radius:12px;flex-direction:column;justify-content:center;align-items:center;height:46px;display:flex}.cal-day.other{opacity:.4}.cal-day.today span:first-child{color:var(--accent);font-weight:700}.cal-day.selected{background:var(--accent);color:#fff}.cal-day.selected span:first-child{color:#fff}.cal-dots{letter-spacing:1px;color:var(--accent);font-size:.7em;line-height:1}.cal-day.selected .cal-dots{color:#fff}.agenda,.todo-items{margin:0;padding:0;list-style:none}.agenda li{border-bottom:1px solid var(--line);gap:14px;padding:10px 0;display:flex}.agenda-time{width:70px;color:var(--muted);flex:none}.agenda-text{flex-direction:column;display:flex}.todo+.todo{margin-top:12px}.todo-add,.inline-form{gap:8px;margin-bottom:8px;display:flex}.todo-items li{border-bottom:1px solid var(--line);align-items:center;gap:12px;padding:10px 0;display:flex}.todo-items li.done span{color:var(--muted);text-decoration:line-through}.search-bar{border:1px solid var(--line);background:var(--surface-2);border-radius:14px;align-items:center;gap:6px;margin-bottom:10px;padding:0 12px;display:flex}.entity-list{margin-top:6px}.entity-row{text-align:left;background:0 0;border:none;border-radius:12px;align-items:center;gap:12px;width:100%;padding:10px 8px;display:flex}.entity-row:hover{background:var(--icon-bg)}.entity-row-text{flex-direction:column;flex:1;min-width:0;display:flex}.entity-row-text>span{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.picker-box{border:1px solid var(--line);border-radius:16px;max-height:340px;margin-bottom:16px;padding:10px;overflow-y:auto}.device-line{align-items:center;gap:8px;display:flex}.device-line .entity-row{flex:1;min-width:0}.size-select{width:auto;min-height:36px;padding:4px 8px}.check-list{flex-direction:column;display:flex}.check-item{align-items:center;gap:12px;padding:8px 0;display:flex}.wizard{z-index:40;background:var(--page-bg);grid-template-columns:260px 1fr;display:grid;position:fixed;inset:0}.wizard-steps{border-right:1px solid var(--card-border);background:var(--card);-webkit-backdrop-filter:blur(18px);padding:22px 14px;overflow-y:auto}.brand{color:var(--accent);align-items:center;gap:10px;margin:0 10px 22px;font-size:1.3rem;font-weight:750;display:flex}.wizard-steps ol{margin:0;padding:0;list-style:none}.wstep{text-align:left;background:0 0;border:none;border-radius:12px;align-items:center;gap:10px;width:100%;min-height:44px;padding:8px 12px;font-weight:550;display:flex}.wstep:hover{background:var(--icon-bg)}.wstep.current{background:var(--accent);color:#fff}.wstep.done{color:var(--muted)}.wizard-main{flex-direction:column;min-width:0;height:100vh;display:flex}.wizard-progress{background:var(--line);height:4px}.wizard-progress div{background:var(--accent);height:100%;transition:width .3s}.wizard-head{padding:22px 32px 8px}.wizard-head h2{font-size:1.8rem}.wizard-body{flex:1;padding:8px 32px 24px;overflow-y:auto}.step{max-width:760px}.lead{color:var(--muted);margin-bottom:18px;font-size:1.05rem}.wizard-foot{border-top:1px solid var(--card-border);background:var(--card);-webkit-backdrop-filter:blur(18px);justify-content:space-between;align-items:center;gap:8px;padding:14px 32px;display:flex}@media (width<=760px){.wizard{grid-template-columns:1fr}.wizard-steps{display:none}.wizard-head,.wizard-body,.wizard-foot{padding-left:16px;padding-right:16px}}.room-list{flex-direction:column;gap:6px;display:flex}.room-item{border:1px solid var(--line);background:var(--surface);border-radius:16px;padding:6px}.room-row{align-items:center;gap:6px;margin-bottom:4px;display:flex}.room-row .input{flex:1;min-width:80px}.room-row>.small{text-overflow:ellipsis;text-align:right;flex:none;width:96px;overflow:hidden}.accordion{flex-direction:column;gap:8px;display:flex}.acc-item{border:1px solid var(--line);background:var(--surface);border-radius:16px;overflow:hidden}.acc-head{text-align:left;background:0 0;border:none;align-items:center;gap:12px;width:100%;padding:14px 16px;display:flex}.acc-title{flex:1;font-weight:600}.acc-body{padding:0 12px 14px}.choice-grid{grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin-bottom:22px;display:grid}.choice{border:2px solid var(--line);background:var(--surface);text-align:left;border-radius:18px;flex-direction:column;gap:6px;padding:12px;display:flex}.choice.selected{border-color:var(--accent);box-shadow:0 0 0 4px color-mix(in srgb, var(--accent) 20%, transparent)}.layout-preview{width:100%;height:auto}.pv-bg{fill:var(--surface-2)}.pv-tile{fill:var(--line)}.pv-accent{fill:var(--accent)}.bg-grid{grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:10px;display:grid}.bg-choice{border:2px solid var(--line);background:var(--surface);border-radius:14px;grid-template-columns:1fr 1fr;gap:4px;padding:6px;display:grid}.bg-choice .small{grid-column:1/-1}.bg-choice.selected{border-color:var(--accent)}.bg-swatch{border-radius:8px;height:40px}.bg-swatch.image{background:var(--surface-2);grid-column:1/-1;justify-content:center;align-items:center;display:flex}.review{grid-template-columns:max-content 1fr;gap:10px 20px;margin:0;display:grid}.review dt{color:var(--muted);font-weight:600}.review dd{margin:0}.settings{grid-template-columns:200px 1fr;gap:18px;display:grid}.settings-tabs{flex-direction:column;gap:2px;display:flex}.settings-body{min-width:0}@media (width<=700px){.settings{grid-template-columns:1fr}.settings-tabs{flex-direction:row;overflow-x:auto}.settings-tabs .wstep{white-space:nowrap;width:auto}}.centered{text-align:center;flex-direction:column;justify-content:center;align-items:center;gap:12px;min-height:100vh;padding:24px;display:flex}.welcome-card{border:1px solid var(--card-border);background:var(--card);-webkit-backdrop-filter:blur(20px);max-width:520px;box-shadow:var(--card-shadow);border-radius:28px;flex-direction:column;align-items:center;gap:14px;padding:36px 28px;display:flex}.welcome-card ha-icon{color:var(--accent)}.welcome-card h1{font-size:1.9rem}.spinner{border:3px solid var(--line);border-top-color:var(--accent);border-radius:50%;width:36px;height:36px;animation:.8s linear infinite spin}@keyframes spin{to{transform:rotate(360deg)}}.toast{z-index:60;color:#fff;background:#0f172a;border-radius:14px;max-width:calc(100% - 32px);padding:12px 18px;animation:.2s ease-out rise;position:fixed;bottom:96px;left:50%;transform:translate(-50%);box-shadow:0 10px 30px #0000004d}.toast.error{background:#b91c1c}.screensaver{z-index:100;color:#fff;cursor:none;background:#000;justify-content:center;align-items:center;display:flex;position:fixed;inset:0}.ss-clock .ss-content,.ss-clock{text-align:center}.ss-content{transition:transform 4s ease-in-out}.ss-clock{font-variant-numeric:tabular-nums;font-size:clamp(4rem,16vw,12rem);font-weight:200;line-height:1}.ss-date{opacity:.8;margin-top:8px;font-size:clamp(1.1rem,3vw,2rem)}.ss-extra{opacity:.85;flex-wrap:wrap;justify-content:center;gap:32px;margin-top:28px;font-size:clamp(1rem,2.4vw,1.6rem);display:flex}.ss-extra span{align-items:center;gap:10px;display:inline-flex}.ss-dim{color:#ffffff59}@media (width<=600px){.dashboard{padding:14px 12px 110px}.title{font-size:1.4rem}.clock{font-size:1.5rem}.df-root{--tile-min:140px;--tile-h:100px}.edit-bar{border-radius:18px;bottom:8px}.header-right{flex-wrap:nowrap;justify-content:space-between;width:100%}.header-chips{scrollbar-width:none;flex-wrap:nowrap;min-width:0;overflow-x:auto}.chip-btn,.header-chips .icon-btn{flex:none}.event-chip{max-width:180px}.room-row>.small{display:none}.room-row .icon-btn{width:36px;height:36px}}.shape-pills{--tile-min:176px;--tile-h:74px;--gap:10px}.shape-pills.density-compact{--tile-h:64px;--tile-min:160px}.shape-pills .tile{box-shadow:none;-webkit-backdrop-filter:blur(24px)saturate(1.6);background:#ffffff6b;border:none;flex-direction:row;justify-content:flex-start;align-items:center;gap:10px;padding:10px 12px}.shape-pills.dark .tile{background:#3a3a408c}.color-white .tile.active,.color-white.dark .tile.active{color:#1c1c1e;background:#fffffff2}.color-white .tile.active .tile-state{color:#6b6b70}.shape-pills .tile-icon{background:#78788033;width:36px;height:36px}.color-white .tile.active .tile-icon{background:color-mix(in srgb, var(--tile-active) 18%, transparent);color:var(--tile-active)}.shape-pills .tile-name{font-size:.92em;font-weight:600}.shape-pills .tile-state{font-size:.82em}.shape-pills .tile-value{font-size:1.05rem}.shape-pills .cell.size-lg .tile,.shape-pills .cell.size-wide .tile,.shape-pills .cell.size-md .tile{flex-direction:column;align-items:stretch}.shape-pills .cell.size-md{grid-row:span 2}.shape-pills .cell.size-lg,.shape-pills .cell.size-wide{grid-row:span 3}.shape-pills .nav-pills .nav-item,.shape-pills .chip-btn,.shape-pills .header-chips .icon-btn,.shape-pills .scene-chip{-webkit-backdrop-filter:blur(24px)saturate(1.6);background:#fff6;border:none}.shape-pills.dark .nav-pills .nav-item,.shape-pills.dark .chip-btn,.shape-pills.dark .header-chips .icon-btn,.shape-pills.dark .scene-chip{background:#3a3a408c}.shape-pills .title{font-size:2rem;font-weight:700}.shape-pills .section-title,.shape-pills .floor-title{font-weight:700}.shape-squares{--tile-min:136px;--tile-h:136px;--gap:12px}.shape-squares.density-compact{--tile-min:116px;--tile-h:116px}.shape-squares .tile{text-align:center;background:var(--card-solid);border:none;justify-content:center;align-items:center;gap:10px}.shape-squares .tile-text{width:100%}.shape-squares .tile-icon{width:56px;height:56px}.color-ring .tile-icon{background:color-mix(in srgb, var(--cat) 16%, transparent);color:var(--cat)}.color-ring .tile.active .tile-icon{background:var(--cat);color:#fff;box-shadow:0 0 0 6px color-mix(in srgb, var(--cat) 22%, transparent), 0 6px 20px color-mix(in srgb, var(--cat) 45%, transparent)}.color-ring .tile.active{background:var(--card-solid)}.shape-squares .tile-name{font-size:.9em}.shape-squares .tile-state{font-size:.8em}.shape-squares .cell.size-md .tile,.shape-squares .cell.size-lg .tile,.shape-squares .cell.size-wide .tile{text-align:left;align-items:stretch}.color-ring .nav-item.selected{color:var(--text);box-shadow:inset 0 0 0 2px var(--accent);background:var(--card-solid)!important}.color-ring .nav-pills .nav-item,.color-ring .chip-btn,.color-ring .header-chips .icon-btn,.color-ring .scene-chip,.color-ring .nav-vertical{background:var(--card-solid);-webkit-backdrop-filter:none;backdrop-filter:none;border:none}.color-outline .tile,.color-outline .nav-vertical,.color-outline .chip-btn,.color-outline .header-chips .icon-btn,.color-outline .nav-pills .nav-item,.color-outline .scene-chip{box-shadow:none;-webkit-backdrop-filter:none;backdrop-filter:none;background:var(--card-solid);border:1px solid var(--line)}.color-outline .tile.active{background:var(--card-solid);border-color:var(--text)}.color-outline .tile-icon{background:0 0;width:32px;height:32px}.color-outline .tile.active .tile-icon{color:var(--tile-active);background:0 0}.color-outline .nav-item.selected{color:var(--card-solid);background:var(--text)!important}.live-dot{background:#ef4444;border-radius:50%;width:8px;height:8px;margin-right:6px;animation:1.6s ease-in-out infinite pulse;display:inline-block}@keyframes pulse{50%{opacity:.35}}.counter-row{justify-content:center;align-items:center;gap:18px;display:flex}.counter-value{font-variant-numeric:tabular-nums;font-size:2.4rem;font-weight:650}.counter-value.center{text-align:center}.line-chart{width:100%;display:block;overflow:visible}.chart-line{fill:none;stroke:var(--chart,var(--accent));stroke-width:2.5px;stroke-linejoin:round;vector-effect:non-scaling-stroke;filter:drop-shadow(0 0 6px color-mix(in srgb, var(--chart,var(--accent)) 60%, transparent))}.chart-dot{fill:var(--chart,var(--accent));stroke:var(--card-solid);stroke-width:2px;vector-effect:non-scaling-stroke}.tile .line-chart,.tile .chart-space{flex:1;height:100%;min-height:0}.tile{--chart:var(--cat);--glow:var(--cat);--block:var(--cat);--on-block:#fff}.sensor-big.with-chart{justify-content:flex-start}.sensor-big .big-top .sensor-value{color:var(--cat);white-space:nowrap;margin-left:auto;font-size:1.6rem}.nav-group{letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin:10px 12px 2px;font-size:.75em;font-weight:700}.nav-group:first-child{margin-top:4px}.floor-title{color:var(--muted);letter-spacing:.02em;font-size:1rem}.list-floor{text-transform:uppercase;letter-spacing:.08em;margin:8px 0 12px;font-size:.85rem}.floor-label{color:var(--muted);align-items:center;gap:6px;margin:8px 4px 2px;font-weight:650;display:flex}.room-list+.room-list{margin-top:10px}.room-item .floor-select{width:auto;min-height:34px;margin:0 0 4px 50px;padding:4px 10px;font-size:.9em}.sub-options{border-left:3px solid var(--line);margin:0 0 8px;padding:4px 0 8px 14px}.grow{flex:1;min-width:0}.plain-list{margin:0;padding-left:18px}.auto-swatch{background:var(--surface-2);justify-content:center;align-items:center;display:inline-flex}.room-controls{flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;margin:-6px 0 14px;display:flex}.room-status{color:var(--muted);font-weight:550}.room-lights{border:1px solid var(--card-border);background:var(--card-solid);border-radius:999px;align-items:center;gap:6px;min-height:38px;padding:6px 14px;font-weight:600;display:inline-flex}.room-lights.on{color:#fff;background:linear-gradient(135deg,#fbbf24,#f97316);border-color:#0000}.room-wallpaper{z-index:0;pointer-events:none;background-position:50%;background-size:cover;position:fixed;inset:0}.room-wallpaper:after{content:\"\";background:linear-gradient(#00000026,#00000073);position:absolute;inset:0}.dashboard{z-index:1;position:relative}.home-block{margin-bottom:22px}.summary{scrollbar-width:none;gap:10px;margin-bottom:22px;padding-bottom:2px;display:flex;overflow-x:auto}.summary-chip{border:1px solid var(--card-border);background:var(--card-solid);text-align:left;border-radius:18px;flex:none;align-items:center;gap:10px;min-height:56px;padding:8px 16px 8px 10px;display:flex}.cards-glass .summary-chip{background:var(--card);-webkit-backdrop-filter:blur(18px)}.summary-chip:disabled{cursor:default;opacity:1}.summary-chip ha-icon{background:var(--icon-bg);border-radius:50%;justify-content:center;align-items:center;display:inline-flex;width:38px!important;height:38px!important}.summary-chip.on ha-icon{color:#fff;background:linear-gradient(135deg,#fbbf24,#f97316)}.summary-chip.warn ha-icon{color:#fff;background:linear-gradient(135deg,#f43f5e,#c026d3)}.summary-text{flex-direction:column;display:flex}.summary-label{color:var(--muted);font-size:.78em;font-weight:650}.summary-value{white-space:nowrap;text-overflow:ellipsis;max-width:220px;font-weight:650;overflow:hidden}.room-grid{gap:var(--gap);grid-template-columns:repeat(auto-fill,minmax(190px,1fr));display:grid}.room-card{border:1px solid var(--card-border);border-radius:var(--radius);background:var(--card-solid);min-height:132px;box-shadow:var(--card-shadow);cursor:pointer;background-position:50%;background-size:cover;flex-direction:column;justify-content:space-between;padding:14px;transition:transform .12s;display:flex;position:relative}.room-card:active{transform:scale(.98)}.cards-glass .room-card:not(.has-bg){background-color:var(--card);-webkit-backdrop-filter:blur(18px)}.room-card.has-bg{color:#fff;border-color:#0000}.room-card-top{justify-content:space-between;align-items:flex-start;display:flex}.room-card-icon{background:var(--icon-bg);border-radius:14px;justify-content:center;align-items:center;width:44px;height:44px;display:inline-flex}.room-card-name{font-size:1.05rem;font-weight:700}.room-card-status{color:var(--muted);white-space:nowrap;text-overflow:ellipsis;font-size:.88em;overflow:hidden}.room-card.has-bg .room-card-status{color:#ffffffd9}.room-card .icon-btn{background:var(--icon-bg)}.room-card .icon-btn.active{background:linear-gradient(135deg,#fbbf24,#f97316)}.home-hint{align-items:center;gap:6px;display:flex}.irrigation{flex-direction:column;gap:16px;display:flex}.irr-status{border:1px solid var(--card-border);border-radius:var(--radius);background:var(--card-solid);box-shadow:var(--card-shadow);flex-direction:column;gap:14px;padding:18px;display:flex}.irr-status.running{color:#fff;background:linear-gradient(135deg,#0ea5e9 0%,#2563eb 60%,#4f46e5 100%);border-color:#0000}.irr-status-head{flex-wrap:wrap;align-items:center;gap:14px;display:flex}.irr-status-text{flex-direction:column;flex:1;min-width:160px;display:flex}.irr-status-text strong{font-size:1.2rem}.irr-status.running .irr-status-text span{color:#ffffffd9}.irr-progress{background:#ffffff40;border-radius:999px;height:8px;overflow:hidden}.irr-progress div{border-radius:inherit;background:#fff;height:100%;transition:width 1s linear}.irr-runall{flex-wrap:wrap;align-items:center;gap:10px;display:flex}.irr-status.running .chip{color:#fff;background:#ffffff2e;border-color:#0000}.irr-status.running .chip.selected{color:#1d4ed8;background:#fff}.irr-status.running .btn:not(.btn-primary){color:#fff;background:#ffffff2e;border-color:#0000}.zone-grid{gap:var(--gap);grid-template-columns:repeat(auto-fill,minmax(220px,1fr));display:grid}.zone{border:1px solid var(--card-border);border-radius:var(--radius);background:var(--card-solid);box-shadow:var(--card-shadow);flex-direction:column;gap:10px;padding:14px;display:flex}.zone.running,.zone.on{color:#fff;background:linear-gradient(135deg,#38bdf8 0%,#6366f1 100%);border-color:#0000}.zone.running .chip,.zone.on .chip{color:#fff;background:#fff3;border-color:#0000}.zone.unavailable{opacity:.5}.zone-head{align-items:center;gap:8px;font-weight:650;display:flex}.zone-num{background:var(--icon-bg);border-radius:50%;flex:none;justify-content:center;align-items:center;width:24px;height:24px;font-size:.8em;font-weight:700;display:inline-flex}.zone.running .zone-num,.zone.on .zone-num{background:#ffffff40}.zone-state{opacity:.85;font-size:.9em}.zone .chips{gap:6px}.zone .chip{min-height:34px;padding:4px 12px}.color-gradient .tile-icon{color:var(--cat);background:color-mix(in srgb, var(--cat) 18%, transparent)!important}.color-gradient .tile.active{background:var(--grad);color:#fff;box-shadow:0 12px 28px -12px var(--cat);border-color:#0000}.color-gradient .tile.active .tile-state,.color-gradient .tile.active .ring-current{color:#ffffffd9}.color-gradient .tile.active .tile-icon{color:#fff;background:#ffffff3d}.color-gradient .tile.active .slider,.color-gradient .tile.active .ring-buttons .icon-btn,.color-gradient .tile.active .icon-btn:not(.play){color:#fff;background:#ffffff38}.color-gradient .tile.active .slider{--slider-color:#ffffffeb}.color-gradient .tile.active .slider-label{color:#111827;text-shadow:0 0 6px #ffffffe6}.color-gradient .tile.active .ring-track{stroke:#ffffff40}.color-gradient .tile.active .ring-value{stroke:#fff!important}.color-gradient .tile.active .icon-btn.play{color:var(--cat);background:#fff}.color-gradient .cell.size-lg .tile:not(.active),.color-gradient .cell.size-wide .tile:not(.active),.color-gradient .cell.size-md .tile:not(.active){background:linear-gradient(160deg, color-mix(in srgb, var(--cat) 16%, var(--card-solid)) 0%, var(--card-solid) 70%)}.color-gradient .tile.d-weather{color:#fff;background:var(--grad)!important}.color-gradient .tile.d-weather .tile-state{color:#ffffffe6}.color-gradient .tile.d-weather .tile-icon{color:#fff;background:#ffffff3d}.color-gradient .nav-item.selected{box-shadow:0 8px 22px -10px var(--accent);background:linear-gradient(135deg, var(--accent) 0%, #ec4899 100%)!important}.color-gradient .nav-pills .nav-item,.color-gradient .chip-btn,.color-gradient .header-chips .icon-btn,.color-gradient .scene-chip,.color-gradient .nav-vertical,.color-gradient .summary-chip{border-color:var(--card-border);background:var(--card-solid);-webkit-backdrop-filter:none;backdrop-filter:none}.color-gradient .scene-chip ha-icon{color:#34d399}.color-gradient .room-card{background:var(--card-solid)}.color-gradient .room-card.lit:not(.has-bg){color:#fff;background:linear-gradient(135deg,#ec4899 0%,#8b5cf6 100%);border-color:#0000;box-shadow:0 14px 30px -14px #ec4899}.color-gradient .room-card.lit .room-card-status{color:#ffffffd9}.color-gradient .room-card.lit .room-card-icon,.color-gradient .room-card.lit .icon-btn{color:#fff;background:#ffffff38}.color-gradient .tile-value,.color-gradient .sensor-value{color:var(--cat)}.color-gradient .tile.active .tile-value{color:#fff}.color-tint .tile.active{background:color-mix(in srgb, var(--tile-active) 24%, var(--card-solid))}.color-tint.cards-glass .tile.active{background:color-mix(in srgb, var(--tile-active) 28%, var(--card))}.big-number{align-items:baseline;gap:8px;font-size:2.6rem;font-weight:650;line-height:1;display:flex}.big-number-label{opacity:.8;font-size:.85rem;font-weight:500}.weather-big-temp{margin-left:auto;font-size:2.2rem;font-weight:300}.weather-big-meta{opacity:.9;flex-wrap:wrap;gap:12px;font-size:.85em;display:flex}.weather-big-meta span{align-items:center;gap:4px;display:inline-flex}.zone.running .btn-danger,.irr-status.running .btn-danger{color:#dc2626;background:#fff;border-color:#0000}.irr-status.running .muted{color:#fffc}.color-outline .slider{--slider-color:color-mix(in srgb, var(--accent) 30%, transparent)}.font-grid{grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px;display:grid}.font-choice{border:2px solid var(--line);background:var(--surface);text-align:left;border-radius:16px;flex-direction:column;gap:2px;padding:12px;display:flex}.font-choice.selected{border-color:var(--accent);box-shadow:0 0 0 4px color-mix(in srgb, var(--accent) 20%, transparent)}.font-sample{font-size:1.9rem;font-weight:650;line-height:1.1}.title,.focus-title,.wizard-head h2,.welcome-card h1{letter-spacing:-.025em;font-weight:750}.clock,.ss-clock,.weather-big-temp,.weather-temp{letter-spacing:-.03em;font-weight:350}.tile-name,.room-card-name,.nav-item,.summary-value{letter-spacing:-.005em}.tile-value,.sensor-value,.ring-target,.big-number,.counter-value{letter-spacing:-.02em}.shape-rows{--tile-min:270px;--tile-h:74px;--gap:10px}.shape-rows .tile{border:1px solid var(--card-border);flex-direction:row;justify-content:flex-start;align-items:center;gap:14px;padding:12px 16px 12px 12px}.color-soft .tile.active{background:linear-gradient(90deg, color-mix(in srgb, var(--cat) 24%, var(--card-solid)) 0%, var(--card-solid) 70%)}.shape-rows .tile-icon{background:var(--icon-bg);width:48px;height:48px;color:var(--muted)}.color-soft .tile.active .tile-icon{background:var(--cat);color:#fff;box-shadow:0 6px 16px -6px var(--cat)}.shape-rows .tile-name{font-size:1.02rem;font-weight:650}.shape-rows .tile-value{font-size:1.15rem}.shape-rows .cell.size-md{grid-row:span 2}.shape-rows .cell.size-md,.shape-rows .cell.size-lg{grid-column:span 1}.shape-rows .cell.size-lg{grid-row:span 4}.shape-rows .cell.size-wide{grid-area:span 4/span 2}.shape-rows .cell.size-md .tile,.shape-rows .cell.size-lg .tile,.shape-rows .cell.size-wide .tile{flex-direction:column;align-items:stretch;padding:16px}.titles-big .section-title,.titles-big .focus-title{letter-spacing:-.03em;font-size:2.4rem;font-weight:750}.color-soft .nav-pills{gap:4px;margin-bottom:22px}.color-soft .nav-pills .nav-item{-webkit-backdrop-filter:none;backdrop-filter:none;min-height:44px;color:var(--muted);background:0 0;border:none;border-radius:14px;padding:6px 14px;font-size:1.08rem;font-weight:650}.color-soft .nav-pills .nav-item.selected{color:var(--text);box-shadow:var(--card-shadow);background:#ffffffbf!important}.color-soft .nav-vertical{-webkit-backdrop-filter:none;backdrop-filter:none;background:0 0;border:none;padding:0}.color-soft .nav-vertical .nav-item{min-height:56px;font-size:1.05rem}.color-soft .nav-vertical .nav-item.selected{color:var(--text);box-shadow:var(--card-shadow);background:#ffffffc7!important}.color-soft .nav-group{letter-spacing:0;text-transform:none;margin-top:16px;font-size:.85rem}.color-soft .chip-btn,.color-soft .header-chips .icon-btn,.color-soft .summary-chip,.color-soft .room-card,.color-soft .scene-chip{border-color:var(--card-border);background:var(--card);-webkit-backdrop-filter:blur(20px)saturate(1.4)}.color-soft .room-card.lit .room-card-icon{color:#fff;background:#f59e0b}.titles-big .title{font-size:1.9rem}.shape-blocks{--tile-min:168px;--tile-h:132px;--gap:12px;--block:#ffc21a;--on-block:#15171c}.color-flat .cat-light{--block:#ffc21a;--on-block:#15171c}.color-flat .cat-power{--block:#19c39c;--on-block:#0d1f1a}.color-flat .cat-climate{--block:#ff7a30;--on-block:#1f1208}.color-flat .cat-cover{--block:#34c3ff;--on-block:#08202b}.color-flat .cat-water{--block:#3156ff;--on-block:#fff}.color-flat .cat-security{--block:#ff4a3d;--on-block:#fff}.color-flat .cat-media{--block:#8b5cf6;--on-block:#fff}.color-flat .cat-robot{--block:#b7e33e;--on-block:#1a2108}.color-flat .cat-scene{--block:#ff4f9a;--on-block:#fff}.color-flat .cat-info{--block:#3156ff;--on-block:#fff}.color-flat .cat-sensor{--block:#d7dae2;--on-block:#15171c}.color-flat .tile.custom-color{--block:var(--cat);--on-block:#fff}.shape-blocks .tile{box-shadow:none;background:var(--card-solid);border:none;justify-content:flex-end;gap:2px;padding:16px}.shape-blocks .tile .tile-icon{width:auto;height:auto;color:var(--block);position:absolute;top:14px;right:14px;box-shadow:none!important;background:0 0!important}.color-flat.light .tile.cat-light:not(.active) .tile-icon,.color-flat.light .tile.cat-sensor:not(.active) .tile-icon,.color-flat.light .tile.cat-robot:not(.active) .tile-icon{color:color-mix(in srgb, var(--block) 70%, #000)}.shape-blocks .tile .tile-icon .df-icon,.shape-blocks .tile .tile-icon ha-icon{--mdc-icon-size:34px;width:34px!important;height:34px!important}.color-flat .tile.active{background:var(--block);color:var(--on-block)}.color-flat .tile.active .tile-icon{color:var(--on-block)}.color-flat .tile.active .tile-state{color:color-mix(in srgb, var(--on-block) 75%, transparent)}.shape-blocks .tile-name{letter-spacing:-.015em;font-size:1.08rem;font-weight:750}.shape-blocks .tile-value{color:var(--text);font-size:1.9rem;font-weight:800}.shape-blocks .cell.size-md .tile,.shape-blocks .cell.size-lg .tile,.shape-blocks .cell.size-wide .tile{justify-content:space-between}.shape-blocks .big-top .tile-icon{position:static}.shape-blocks .big-top{padding-right:0}.color-flat .tile.active .slider,.color-flat .tile.active .icon-btn:not(.play),.color-flat .tile.active .ring-buttons .icon-btn{background:color-mix(in srgb, var(--on-block) 16%, transparent);color:var(--on-block)}.color-flat .tile.active .slider{--slider-color:var(--on-block)}.color-flat .tile.active .slider-label{color:var(--block);text-shadow:none;mix-blend-mode:normal}.color-flat .tile.active .ring-track{stroke:color-mix(in srgb, var(--on-block) 20%, transparent)}.color-flat .tile.active .ring-value{stroke:var(--on-block)!important}.color-flat .tile.active .icon-btn.play{background:var(--on-block);color:var(--block)}.shape-blocks .sensor-value,.shape-blocks .sensor-big .big-top .sensor-value{color:var(--text);font-weight:800}.shape-blocks .tile{--chart:var(--block)}.titles-bold .title{letter-spacing:-.035em;font-size:2.3rem;font-weight:800}.titles-bold .section-title{letter-spacing:-.03em;font-size:1.7rem;font-weight:800}.color-flat .nav-pills .nav-item,.color-flat .chip-btn,.color-flat .header-chips .icon-btn,.color-flat .scene-chip,.color-flat .summary-chip,.color-flat .nav-vertical,.color-flat .room-card,.color-flat .room-lights{background:var(--card-solid);-webkit-backdrop-filter:none;backdrop-filter:none;box-shadow:none;border:none}.color-flat .nav-item{font-weight:700}.color-flat .nav-item.selected{color:var(--card-solid);background:var(--text)!important}.color-flat .summary-chip.on ha-icon,.color-flat .summary-chip.on .df-icon{color:#15171c;background:#ffc21a}.color-flat .summary-chip.warn ha-icon,.color-flat .summary-chip.warn .df-icon{color:#fff;background:#ff4a3d}.color-flat .room-card.lit{color:#15171c;background:#ffc21a}.color-flat .room-card.lit .room-card-status{color:#15171cb3}.color-flat .room-card .icon-btn.active,.color-flat .room-lights.on{color:#ffc21a;background:#15171c}.color-flat .room-card-name{font-size:1.2rem;font-weight:800}.color-flat .irr-status.running,.color-flat .zone.running,.color-flat .zone.on{background:#3156ff}.shape-dials{--tile-min:230px;--tile-h:96px;--gap:12px;--glow:#3fd8ff}.color-glow .cat-power{--glow:#4dffb0}.color-glow .cat-climate{--glow:#ff8a3d}.color-glow .cat-cover{--glow:#3fd8ff}.color-glow .cat-water{--glow:#4d8dff}.color-glow .cat-security{--glow:#ff4f6d}.color-glow .cat-media{--glow:#d36bff}.color-glow .cat-robot{--glow:#b6ff5a}.color-glow .cat-scene{--glow:#8f7bff}.color-glow .cat-info{--glow:#3fd8ff}.color-glow .cat-sensor{--glow:#8b96ad}.color-glow .tile.custom-color{--glow:var(--cat)}.shape-dials .tile{border:1px solid var(--card-border);background:var(--card-solid);--chart:var(--glow);flex-direction:row;justify-content:flex-start;align-items:center;gap:14px;padding:14px}.shape-dials .tile-icon{border:2px solid var(--line);width:58px;height:58px;color:var(--muted);background:0 0}.color-glow .tile.active{border-color:color-mix(in srgb, var(--glow) 45%, transparent);background:radial-gradient(circle at 12% 50%, color-mix(in srgb, var(--glow) 20%, transparent) 0%, transparent 55%), var(--card-solid)}.color-glow .tile.active .tile-icon{border-color:var(--glow);color:var(--glow);background:color-mix(in srgb, var(--glow) 10%, transparent);box-shadow:0 0 0 4px color-mix(in srgb, var(--glow) 12%, transparent), 0 0 22px color-mix(in srgb, var(--glow) 55%, transparent)}.color-glow .tile.active .tile-state{color:var(--glow)}.shape-dials .tile-name{font-size:1rem;font-weight:500}.color-glow .tile-value,.color-glow .sensor-value{font-weight:500;color:var(--glow)!important}.shape-dials .cell.size-md .tile,.shape-dials .cell.size-lg .tile,.shape-dials .cell.size-wide .tile{flex-direction:column;align-items:stretch}.shape-dials .cell.size-md{grid-row:span 2}.color-glow .ring-value{filter:drop-shadow(0 0 6px var(--glow));stroke:var(--glow)!important}.color-glow .slider{--slider-color:var(--glow);border-radius:999px;height:10px;margin:14px 0 4px;overflow:visible}.color-glow .slider-fill{opacity:1;box-shadow:0 0 14px var(--glow);border-radius:999px}.color-glow .slider-label{color:var(--glow);text-shadow:none;justify-content:flex-end;top:-26px;bottom:auto}.color-glow .icon-btn.play{background:var(--glow);color:#0e1424;box-shadow:0 0 18px var(--glow)}.titles-light .title{letter-spacing:-.01em;font-size:1.7rem;font-weight:500}.titles-light .clock{font-size:2.2rem;font-weight:250}.titles-light .section-title{font-size:1.35rem;font-weight:500}.nav-dock .layout-sidebar{display:block}.nav-dock .nav-vertical,.nav-dock .nav-pills{z-index:15;scrollbar-width:none;border:1px solid var(--card-border);-webkit-backdrop-filter:blur(18px);background:#131a2cdb;border-radius:26px;flex-direction:row;gap:4px;max-width:calc(100% - 24px);margin:0;padding:8px;position:fixed;top:auto;bottom:16px;left:50%;overflow-x:auto;transform:translate(-50%);box-shadow:0 18px 40px #00000073}.nav-dock .nav-group{display:none}.nav-dock .nav-vertical .nav-item,.nav-dock .nav-pills .nav-item{-webkit-backdrop-filter:none;backdrop-filter:none;min-width:78px;min-height:58px;color:var(--muted);background:0 0;border:none;border-radius:18px;flex-direction:column;flex:none;gap:4px;padding:8px 10px;font-size:.78rem;font-weight:500}.nav-dock .nav-text{align-items:center}.nav-dock .nav-status{display:none}.nav-dock .nav-item.selected{color:var(--accent);box-shadow:inset 0 0 0 1px color-mix(in srgb, var(--accent) 40%, transparent);background:color-mix(in srgb, var(--accent) 14%, transparent)!important}.nav-dock .dashboard{padding-bottom:130px}.nav-dock.editing .edit-bar{bottom:104px}.color-glow .chip-btn,.color-glow .header-chips .icon-btn,.color-glow .summary-chip,.color-glow .room-card,.color-glow .scene-chip,.color-glow .room-lights{border:1px solid var(--card-border);background:var(--card-solid);-webkit-backdrop-filter:none;backdrop-filter:none}.color-glow .room-card.lit{background:radial-gradient(circle at 0% 0%, #ffb23e33, transparent 60%), var(--card-solid);border-color:#ffb23e73}.color-glow .room-card.lit .room-card-icon{color:#ffb23e;box-shadow:0 0 18px #ffb23e80}.color-glow .room-card .icon-btn.active,.color-glow .room-lights.on{color:#ffb23e;background:#ffb23e26;border-color:#ffb23e66}.color-glow .summary-chip.on ha-icon,.color-glow .summary-chip.on .df-icon{color:#ffb23e;background:#ffb23e26;box-shadow:0 0 14px #ffb23e66}.color-glow .summary-chip.warn ha-icon,.color-glow .summary-chip.warn .df-icon{color:#ff4f6d;background:#ff4f6d26}.color-glow .irr-status.running,.color-glow .zone.running,.color-glow .zone.on{background:radial-gradient(circle at 0% 0%, #4d8dff4d, transparent 60%), var(--card-solid);border:1px solid #4d8dff80}.df-icon{flex:none;display:inline-block}.summary-chip .df-icon{box-sizing:content-box;background:var(--icon-bg);border-radius:50%;padding:8px}.shape-rows .grid,.shape-dials .grid{grid-template-columns:repeat(auto-fill, minmax(min(var(--tile-min), 100%), 1fr))}@container (width<=560px){.shape-rows .cell,.shape-dials .cell{grid-column:1/-1!important}}.option-grid{grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;display:grid}.option-grid.small{grid-template-columns:repeat(auto-fill,minmax(120px,1fr))}.option{border:2px solid var(--line);background:var(--surface);text-align:left;border-radius:16px;flex-direction:column;gap:4px;padding:10px;display:flex}.option.selected{border-color:var(--accent);box-shadow:0 0 0 4px color-mix(in srgb, var(--accent) 20%, transparent)}.option-preview{background:var(--surface-2);border-radius:10px;width:100%;height:auto}.on-preview{background:var(--surface-2);border-radius:10px;gap:6px;padding:8px;display:flex}.on-tile{border-radius:9px;flex:1;height:34px}.title-preview{padding:6px 2px;line-height:1.1;display:block}.tp-normal{font-size:1.15rem;font-weight:600}.tp-big{letter-spacing:-.03em;font-size:1.6rem;font-weight:750}.tp-bold{letter-spacing:-.04em;font-size:1.45rem;font-weight:850}.tp-light{letter-spacing:-.01em;font-size:1.45rem;font-weight:300}.photo-grid{grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:10px;margin-bottom:14px;display:grid}.photo-upload{aspect-ratio:16/10;border:2px dashed var(--line);color:var(--muted);cursor:pointer;text-align:center;border-radius:14px;flex-direction:column;justify-content:center;align-items:center;gap:4px;display:flex;position:relative}.photo-upload input{opacity:0;cursor:pointer;position:absolute;inset:0}.photo-upload.busy{opacity:.6;pointer-events:none}.photo{position:relative}.photo-pick{aspect-ratio:16/10;border:2px solid var(--line);background-position:50%;background-size:cover;border-radius:14px;width:100%;display:block}.photo.selected .photo-pick{border-color:var(--accent);box-shadow:0 0 0 4px color-mix(in srgb, var(--accent) 25%, transparent)}.photo-delete{color:#fff;top:4px;right:4px;background:#0000008c!important;width:30px!important;height:30px!important;position:absolute!important}.error-text{color:var(--danger);font-weight:600}.titles-normal .section-title{font-weight:650}.nav-dock.light .nav-vertical,.nav-dock.light .nav-pills{background:#ffffffd1;box-shadow:0 18px 40px #0f172a2e}.nav-dock.light .nav-vertical .nav-item,.nav-dock.light .nav-pills .nav-item{color:#5f677a}.color-glow .tile.active{box-shadow:0 0 24px -6px color-mix(in srgb, var(--glow) 60%, transparent);border:1px solid color-mix(in srgb, var(--glow) 55%, transparent)!important;background:radial-gradient(circle at 15% 25%, color-mix(in srgb, var(--glow) 32%, transparent) 0%, transparent 65%), var(--card-solid)!important}.color-glow.shape-blocks .tile.active .tile-icon,.color-glow.shape-tiles .tile.active .tile-icon{color:var(--glow);filter:drop-shadow(0 0 8px var(--glow))}.color-soft.shape-tiles .tile.active,.color-soft.shape-squares .tile.active,.color-soft.shape-blocks .tile.active,.color-soft.shape-pills .tile.active{background:linear-gradient(160deg, color-mix(in srgb, var(--cat) 28%, var(--card-solid)) 0%, var(--card-solid) 85%)}.color-glow .cat-light{--glow:#ffb23e}", Uc = class extends HTMLElement {
	mount;
	started = !1;
	resize;
	set hass(e) {
		L.value = e, !this.started && this.isConnected && this.start();
	}
	set narrow(e) {
		Sn.value = e;
	}
	set route(e) {}
	set panel(e) {}
	connectedCallback() {
		if (Re(), !this.shadowRoot) {
			let e = this.attachShadow({ mode: "open" }), t = document.createElement("style");
			t.textContent = Hc, this.mount = document.createElement("div"), this.mount.className = "df-mount", e.append(t, this.mount);
		}
		Jn(this), this.resize = new ResizeObserver((e) => {
			let t = Math.round(e[0].contentRect.width);
			t > 0 && t !== Cn.value && (Cn.value = t);
		}), this.resize.observe(this), _e(/* @__PURE__ */ U(Vc, {}), this.mount), L.value && !this.started && this.start();
	}
	disconnectedCallback() {
		this.mount && _e(null, this.mount), this.resize?.disconnect(), Bn(), this.started = !1;
	}
	start() {
		this.started = !0, zn();
	}
};
customElements.get("dashforge-panel") || customElements.define("dashforge-panel", Uc);
