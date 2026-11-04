// node_modules/preact/dist/preact.mjs
var e, t, n, r, i, a, o, s, c, l, u, d = Symbol.for("pv"), f = {}, p = [], m = /^m(i|n|o|s|text|space)$/, h = Array.isArray, g = p.slice, _ = Object.assign;
function v(e) {
	e && e.parentNode && e.remove();
}
function y(e, t, n) {
	var r, i, a, o = {}, s = arguments.length;
	for (a in t) a == "key" ? r = t[a] : a == "ref" && typeof e != "function" ? i = t[a] : o[a] = t[a];
	return s > 2 && (o.children = s > 3 ? g.call(arguments, 2) : n), b(e, o, r, i, null);
}
function b(n, r, i, a, o) {
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
		constructor: d,
		__v: o || ++t,
		__i: -1,
		__u: 0
	};
	return !o && e.vnode && e.vnode(s), s;
}
function x(e) {
	return e.children;
}
function S(e, t) {
	this.props = e, this.context = t, this.__g = 0;
}
function ee(e, t) {
	if (t == null) return e.__ && ee(e.__, e.__i + 1);
	for (var n; t < e.__k.length; t++) if ((n = e.__k[t]) && n.__e) return n.__e;
	return typeof e.type != "function" || e.props.__P ? null : ee(e);
}
function te(e) {
	if ((e = e.__) && e.__c && !e.props.__P) return e.__e = null, e.__k.some(function(t) {
		return t && (e.__e = t.__e);
	}), te(e);
}
function ne(t) {
	(8 & t.__g || (t.__g |= 8, r.push(t), a++)) && i == e.debounceRendering || ((i = e.debounceRendering) || queueMicrotask)(C);
}
function C() {
	var t, n, s, c, l, u, f, p, m;
	try {
		for (n = 1; r.length;) r.length > n && r.sort(o), t = r.shift(), n = r.length, 8 & t.__g && (c = void 0, l = void 0, u = (l = (s = t).__v).__e, f = [], p = [], (m = s.__P) && ((c = _({ constructor: d }, l)).__v = l.__v + 1, e.vnode && e.vnode(c), ce(m, c, l, s.__n, m.namespaceURI, 32 & l.__u ? [u] : null, f, u || ee(l), 32 & l.__u, p), c.__v = l.__v, c.__.__k[c.__i] = c, de(f, c, p), l.__ = l.__e = null, c.__e != u && te(c)));
	} finally {
		(a = r.length) && (i || queueMicrotask)(C);
	}
}
function re(e, t, n, r, i, a, o, s, c, l, u) {
	var d, m, h, g, _, v, y = r.__k || p, b = t.length;
	for (c = w(n, t, y, c, b), d = 0; d < b; d++) (h = n.__k[d]) != null && (m = ~h.__i && y[h.__i] || f, h.__i = d, v = ce(e, h, m, i, a, o, s, c, l, u), g = h.__e, (m.ref != h.ref || 8 & m.__u) && (m.ref && E(m.ref, null, h, m), h.ref && u.push(h.ref, h.__c || g, h)), _ ||= g, 4 & h.__u ? (c = T(h, c, e, !m.__v), m.__e && (m.__e = null)) : typeof h.type == "function" && v !== void 0 ? c = v : g && (c = g.nextSibling), h.__u &= -21);
	return n.__e = _, c;
}
function w(e, t, n, r, i) {
	var a, o, s, c, l, u, f, p, m, g = n.length, _ = g, v = 0, y = 0, S = e.__k = Array(i);
	for (a = 0; a < i; a++) (o = t[a]) != null && typeof o != "boolean" && typeof o != "function" ? (typeof o != "object" || o.constructor === String ? o = S[a] = b(null, o) : h(o) ? o = S[a] = b(x, { children: o }) : o.constructor === d && o.__b ? o = S[a] = b(o.type, o.props, o.key, o.ref, o.__v) : S[a] = o, c = a + v, o.__ = e, o.__b = e.__b + 1, s = null, ~(l = o.__i = ie(o, n, c, _)) && (_--, (s = n[l]) && (s.__u |= 2)), s && s.__v ? (o.__u |= 16, l == c - 1 ? v-- : l == c + 1 ? v++ : l != c && (l > c ? v-- : v++, y = 1)) : (~l || (i > g ? v-- : i < g && v++), typeof o.type != "function" && (o.__u |= 4))) : S[a] = null;
	if (y) {
		for (u = [], f = [], a = 0; a < i; a++) if ((o = S[a]) && 16 & o.__u) {
			for (v = 0, p = u.length; v < p;) u[m = v + p >> 1] < o.__i ? v = m + 1 : p = m;
			u[v] = o.__i, f[a] = v + 1;
		}
		for (v = u.length; a--;) f[a] && (f[a] == v ? v-- : S[a].__u |= 4);
	}
	if (_) for (a = 0; a < g; a++) !(s = n[a]) || 2 & s.__u || (s.__e == r && (r = ee(s)), pe(s, s));
	return r;
}
function T(e, t, n, r) {
	var i, a, o, s;
	if (typeof e.type == "function") {
		if (e.props.__P) return t;
		if (i = e.__k) for (a = 0; a < i.length; a++) i[a] && (i[a].__ = e, t = T(i[a], t, n, !1));
		return t;
	}
	for (t && !t.parentNode && (t = ee(e)) && !t.parentNode && (t = null), o = e.__e, s = t; s && s.nodeType == 8;) s = s.nextSibling;
	for (o != s && (!r && n.moveBefore && o.parentNode ? n.moveBefore(o, t) : n.insertBefore(o, t || null)), t = o; (t &&= t.nextSibling) && t.nodeType == 8 && !t.data.startsWith("$s"););
	return t;
}
function ie(e, t, n, r) {
	var i, a = e.key, o = e.type, s = t[n], c = s && !(2 & s.__u);
	if (s === null && a == null || c && a == s.key && o == s.type) return n;
	if (r > +!!c) {
		for (i = n - 1; i >= 0; i--) if ((s = t[i]) && !(2 & s.__u) && a == s.key && o == s.type) return i;
		for (i = n + 1; i < t.length; i++) if ((s = t[i]) && !(2 & s.__u) && a == s.key && o == s.type) return i;
	}
	return -1;
}
function ae(e, t, n) {
	n ??= "", t[0] == "-" ? e.setProperty(t, n) : e[t] = n;
}
function oe(e, t, n, r, i) {
	var a, o;
	if (t == "style") {
		if (typeof n == "string") e.style.cssText = n;
		else {
			if (typeof r == "string" && (e.style.cssText = r = ""), r) for (t in r) n && t in n || ae(e.style, t);
			if (n) for (t in n) r && n[t] == r[t] || ae(e.style, t, n[t]);
		}
	} else if (t[0] == "o" && t[1] == "n") (e.__e ||= {})[t] = n, n && r || (o = u[t] || (u[t] = se(t)), (e.__a ||= {})[t] = l, a = t != (t = t.replace(c, "$1")), (t = t.slice(2))[0] < "a" && (t = t.toLowerCase()), n ? e.addEventListener(t, o, a) : e.removeEventListener(t, o, a));
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
function se(t) {
	return function(n) {
		var r = this.__e;
		if (r) {
			if (r = r[t], n[s] == null) n[s] = l++;
			else if (n[s] < this.__a[t]) return;
			return r(e.event ? e.event(n) : n);
		}
	};
}
function ce(t, n, r, i, a, o, s, c, l, u) {
	var f, m, g, y, b, te, ne, C, w, T, ie, ae, oe, se, ce, de, E, he, D = n.type;
	if (n.constructor !== d) return null;
	128 & r.__u && (l = 32 & r.__u, f = r.__c.__z) && (n.__u |= l, m = o = [], f.nodeType == 8 ? c = le(f, o) : o.push(f), c = o[0] || c), (f = e.__b) && f(n);
	n: if (typeof D == "function") {
		g = s.length;
		try {
			if (C = n.props, w = (f = D.prototype) && f.render, T = (f = D.contextType) && i[f.__c], ie = f ? T ? T.props.value : f.__ : i, (y = r.__c) ? (n.__c = y, 2 & y.__g && (y.__g |= 1)) : (w ? n.__c = y = new D(C, ie) : (n.__c = y = new S(C, ie), y.constructor = D, y.render = me), T && T.sub(y), y.state || (y.state = {}), y.__n = i, y.__g |= 8, y.__h = [], y.__k = []), w && (y.__s || (y.__s = y.state), D.getDerivedStateFromProps && (y.__s == y.state && (y.__s = _({}, y.__s)), _(y.__s, D.getDerivedStateFromProps(C, y.__s)))), b = y.props, te = y.state, y.__v = n, r.__c) {
				if (C !== b && w && !D.getDerivedStateFromProps && y.componentWillReceiveProps && y.componentWillReceiveProps(C, ie), n.__v == r.__v && !(8 & y.__g) || !(4 & y.__g) && y.shouldComponentUpdate && !1 === y.shouldComponentUpdate(C, y.__s, ie)) {
					n.__v != r.__v && (y.props = C, y.state = y.__s, y.__g &= -9), n.__e = r.__e, n.__k = r.__k, n.__k.some(function(e) {
						e && (e.__ = n);
					}), p.push.apply(y.__h, y.__k), y.__k = [], y.__h.length && s.push(y), c = ee(r);
					break n;
				}
				y.componentWillUpdate && y.componentWillUpdate(C, y.__s, ie), w && y.componentDidUpdate && y.__h.push(function() {
					y.componentDidUpdate(b, te, ne);
				});
			} else w && !D.getDerivedStateFromProps && y.componentWillMount && y.componentWillMount(), w && y.componentDidMount && y.__h.push(y.componentDidMount);
			if (y.context = ie, y.props = C, y.__P = t, y.__g &= -5, ae = e.__r, oe = 0, w) y.state = y.__s, y.__g &= -9, ae && ae(n), f = y.render(y.props, y.state, y.context), p.push.apply(y.__h, y.__k), y.__k = [];
			else do
				y.__g &= -9, ae && ae(n), f = y.render(y.props, y.state, y.context), y.state = y.__s;
			while (8 & y.__g && ++oe < 25);
			y.state = y.__s, y.getChildContext && (i = _({}, i, y.getChildContext())), w && r.__c && y.getSnapshotBeforeUpdate && (ne = y.getSnapshotBeforeUpdate(b, te)), se = f && f.type === x && f.key == null ? f.props.children : f, C.__P && (f = c, a = (t = C.__P).namespaceURI, l = o = null, r.props && r.props.__P != t && (r.__k.some(function(e) {
				e && pe(e, e);
			}), r.__k = null), c = r.__k ? ee(r, 0) : null), c = re(t, h(se) ? se : [se], n, r, i, a, o, s, c, l, u), C.__P && (n.__e = null, c = f), n.__u &= -161, m && m.some(v), y.__h.length && s.push(y), 1 & y.__g && (y.__g &= -4);
		} catch (t) {
			if (s.length = g, n.__v = null, l || o) {
				if (t.then) {
					if (ce = 0, n.__u |= 128 | l, o) {
						for (~(E = o.indexOf(c || void 0)) || (E = o.length); (he = o[E - 1]) && he.nodeType == 8;) E--;
						for (; E < o.length; E++) if (he = o[E]) {
							if (o[E] = null, he.nodeType == 8) {
								if (he.data.startsWith("$s")) ce++ || (de = he);
								else if (ce && he.data.startsWith("/$s") && !--ce) break;
							} else if (!ce) break;
						}
					}
					if (!de) {
						for (; c && c.nodeType == 8 && c.nextSibling;) c = c.nextSibling;
						de = c;
					}
					(f = le(de = n.__c.__z || (n.__c.__z = de))) ? (n.__e = de, c = f) : n.__e = c, c &&= c.nextSibling;
				} else o && o.some(v);
			} else n.__e = r.__e;
			n.__k ||= r.__k || [], t.then || ue(n), e.__e(t, n, r);
		}
	} else c = n.__e = fe(r.__e, n, r, i, a, o, s, l, u, t);
	return (f = e.diffed) && f(n), c;
}
function le(e, t) {
	if (e && e.nodeType == 8 && e.data.startsWith("$s")) for (var n = 1; e = e.nextSibling;) {
		if (e.nodeType == 8) {
			if (e.data.startsWith("$s")) n++;
			else if (e.data.startsWith("/$s") && !--n) return e;
		}
		t && t.push(e);
	}
}
function ue(e) {
	e && (e.__c && (e.__c.__g |= 4), e.__k && e.__k.some(ue));
}
function de(t, n, r) {
	for (var i = 0; i < r.length;) E(r[i++], r[i++], r[i++]);
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
function fe(t, n, r, i, a, o, s, c, l, u) {
	var d, p, _, y, b, x, S, te, ne, C = r.props || f, w = n.props, T = n.type;
	if (T == "svg" ? a = "http://www.w3.org/2000/svg" : T == "math" ? a = "http://www.w3.org/1998/Math/MathML" : a ||= "http://www.w3.org/1999/xhtml", o) {
		for (d = 0; d < o.length; d++) if ((b = o[d]) && (T ? b.localName == T : b.nodeType == 3)) {
			t = b, o[d] = null;
			break;
		}
	}
	if (!t) {
		if (te = u.ownerDocument || document, !T) return te.createTextNode(w);
		t = te.createElementNS(a, T, w.is && w), c &&= (e.__m && e.__m(n, o), !1), o = null;
	}
	if (T) {
		if (u = T == "template" && t.content || t, o = T == "textarea" && w.defaultValue != null ? null : o && g.call(u.childNodes), !c && o) for (C = {}, d = 0; d < t.attributes.length; d++) C[(b = t.attributes[d]).name] = b.value;
		for (d in C) b = C[d], d == "dangerouslySetInnerHTML" ? _ = b : d == "children" || d in w || d == "value" && "defaultValue" in w || d == "checked" && "defaultChecked" in w || oe(t, d, null, b, a);
		for (d in ne = 1 & r.__u, w) b = w[d], d == "children" ? y = b : d == "dangerouslySetInnerHTML" ? p = b : d == "value" ? x = b : d == "checked" ? S = b : c && typeof b != "function" || !(C[d] !== b || ne && b != null) || oe(t, d, b, C[d], a);
		p ? (c || _ && (p.__html == _.__html || p.__html == t.innerHTML) || (t.innerHTML = p.__html), n.__k = []) : (_ && (t.textContent = ""), (T == "foreignObject" || a == "http://www.w3.org/1998/Math/MathML" && m.test(T)) && (a = "http://www.w3.org/1999/xhtml"), re(u, h(y) ? y : [y], n, r, i, a, o, s, o ? o[0] : r.__k && ee(r, 0), c, l), o && o.some(v)), c && T != "textarea" || (d = "value", T == "progress" && x == null ? t.removeAttribute(d) : x == null || x === t[d] && (T != "progress" || x) || oe(t, d, x, C[d], a), d = "checked", S != null && S != t[d] && oe(t, d, S, C[d], a));
	} else C === w || c && t.data == w || (t.data = w);
	return t;
}
function E(t, n, r, i) {
	try {
		typeof t == "function" ? n ? n.__x = t(n) || 1 : (i &&= i.__c || i.__e) && (n = i.__x) && (i.__x = null, typeof n == "function" ? n() : t(null)) : t.current = n;
	} catch (t) {
		e.__e(t, r);
	}
}
function pe(t, n, r) {
	var i, a, o, s;
	if (e.unmount && e.unmount(t), !(i = t.ref) || i.current && i.current != t.__e || E(i, null, n, t), i = t.__c) {
		if (i.componentWillUnmount) try {
			i.componentWillUnmount();
		} catch (t) {
			e.__e(t, n);
		}
		i.__P = i.__n = null;
	}
	if (i = t.__k) for (s = 0; s < i.length; s++) i[s] && pe(i[s], n, typeof t.type != "function" || r && !t.props.__P);
	!r && (i = t.__c) && (i = i.__z) && (a = le(i, o = [])) && (i == t.__e && o.some(v), v(a), v(i)), (i = t.__e) && (r || v(i), i.__e && (i.__e = null)), t.__e = t.__c = t.__ = null;
}
function me(e, t, n) {
	return this.constructor(e, n);
}
function he(t, n) {
	var r, i, a, o;
	e.__ && e.__(t, n), n.nodeType == 9 && (n = n.documentElement), i = (r = t && 32 & t.__u) ? null : n.__k, n.__k = b(x, { children: [t] }), a = [], o = [], ce(n, n.__k, i || f, f, n.namespaceURI, i ? null : n.firstChild ? g.call(n.childNodes) : null, a, i ? i.__e : n.firstChild, r, o), de(a, n.__k, o), n.__k.props.children = null;
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
	return e != null && e.constructor === d;
}, S.prototype.setState = function(e, t) {
	var n = this.__s;
	n && n != this.state || (n = this.__s = _({}, this.state)), typeof e == "function" && (e = e(_({}, n), this.props)), e && (_(n, e), this.__v && (t && this.__k.push(t), ne(this)));
}, S.prototype.forceUpdate = function(e) {
	this.__v && (this.__g |= 4, e && this.__h.push(e), ne(this));
}, S.prototype.render = x, r = [], a = 0, o = function(e, t) {
	return e.__v.__b - t.__v.__b;
}, s = Symbol(), c = /(PointerCapture)$|Capture$/i, l = 0, u = {};
// src/config.ts
var D = () => Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4), ge = [
	{
		id: "aurora",
		name: "Aurora",
		light: "linear-gradient(135deg,#e0f2fe 0%,#ede9fe 50%,#fce7f3 100%)",
		dark: "linear-gradient(135deg,#0f172a 0%,#1e1b4b 55%,#312e81 100%)"
	},
	{
		id: "forest",
		name: "Forest",
		light: "linear-gradient(160deg,#ecfdf5 0%,#d1fae5 45%,#f0fdfa 100%)",
		dark: "linear-gradient(160deg,#052e16 0%,#064e3b 50%,#0f3d3e 100%)"
	},
	{
		id: "sunset",
		name: "Sunset",
		light: "linear-gradient(150deg,#fff7ed 0%,#ffe4e6 50%,#fef3c7 100%)",
		dark: "linear-gradient(150deg,#1c1917 0%,#431407 55%,#4c0519 100%)"
	},
	{
		id: "ocean",
		name: "Ocean",
		light: "linear-gradient(160deg,#eff6ff 0%,#dbeafe 50%,#e0f2fe 100%)",
		dark: "linear-gradient(160deg,#020617 0%,#0c4a6e 60%,#082f49 100%)"
	},
	{
		id: "graphite",
		name: "Graphite",
		light: "linear-gradient(180deg,#f8fafc 0%,#e2e8f0 100%)",
		dark: "linear-gradient(180deg,#09090b 0%,#18181b 100%)"
	},
	{
		id: "plain",
		name: "Plain",
		light: "#f4f4f5",
		dark: "#111113"
	}
], _e = [
	"#3b82f6",
	"#8b5cf6",
	"#ec4899",
	"#f97316",
	"#eab308",
	"#22c55e",
	"#14b8a6",
	"#64748b"
];
function ve() {
	return {
		schema: 1,
		setupComplete: !1,
		title: "Home",
		userName: "",
		layout: "grid",
		theme: {
			mode: "auto",
			accent: _e[0],
			background: "aurora",
			cardStyle: "glass",
			radius: 20,
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
			media: !0,
			security: !0,
			scenes: !0
		},
		sections: []
	};
}
function ye(e) {
	let t = ve();
	if (!e || typeof e != "object") return t;
	let n = e;
	return {
		...t,
		...n,
		schema: 1,
		theme: {
			...t.theme,
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
		sections: Array.isArray(n.sections) ? n.sections.map((e) => ({
			...e,
			cards: Array.isArray(e.cards) ? e.cards.filter((e) => e && e.entity) : []
		})) : []
	};
}
var be = (e) => JSON.parse(JSON.stringify(e));
function xe(e, t = "sm") {
	return {
		id: D(),
		entity: e,
		size: t
	};
}
function Se(e, t, n, r) {
	return {
		id: D(),
		kind: e,
		name: t,
		icon: n,
		areaId: r,
		cards: []
	};
}
// node_modules/preact/hooks/dist/hooks.mjs
var Ce, O, we, Te, Ee = Object.is, De = 0, Oe = [], ke = [], k = e, Ae = k.__b, je = k.__r, Me = k.diffed, Ne = k.__c, Pe = k.unmount, Fe = k.__;
function Ie(e, t) {
	k.__h && k.__h(O, e, De || t), De = 0;
	var n = O.__H || (O.__H = {
		__: [],
		__h: []
	});
	return e >= n.__.length && n.__.push({}), n.__[e];
}
function A(e) {
	return De = 1, Le(qe, e);
}
function Le(e, t, n) {
	var r = Ie(Ce++, 2);
	if (r.t = e, !r.__c && (r.__ = [n ? n(t) : qe(void 0, t), function(e) {
		var t = r.__N ? r.__N[0] : r.__[0], n = r.t(t, e);
		Ee(t, n) || (r.__N = [n, r.__[1]], r.__c.setState({}));
	}], r.__c = O, !O.__f)) {
		O.__f = !0;
		var i = O.shouldComponentUpdate;
		O.shouldComponentUpdate = function(e, t, n) {
			var r = this.__H;
			if (!r) return !0;
			var a = !1, o = this.props != e;
			if (r.__.some(function(e) {
				e.__N && (a = !0, Ee(e.__[0], e.__N[0]) || (o = !0));
			}), i) {
				var s = i.call(this, e, t, n);
				return a ? s || o : s;
			}
			return !a || o;
		};
	}
	return r.__;
}
function j(e, t) {
	var n = Ie(Ce++, 3);
	!k.__s && Ke(n.__H, t) && (n.__P = !0, n.__ = e, n.u = t, O.__H.__h.push(n));
}
function Re(e) {
	return De = 5, ze(function() {
		return { current: e };
	}, []);
}
function ze(e, t) {
	var n = Ie(Ce++, 7);
	return Ke(n.__H, t) && (n.__ = e(), n.__H = t), n.__;
}
function Be() {
	var e;
	do {
		for (; e = ke.shift();) try {
			We(e);
		} catch (t) {
			k.__e(t, { __: (e = e.__P) && e.__v });
		}
		for (; e = Oe.shift();) {
			var t = e.__H;
			if (e.__P && t) try {
				t.__h.some(We), t.__h.some(Ge), t.__h = [];
			} catch (n) {
				t.__h = [], k.__e(n, e.__v);
			}
		}
	} while (ke.length);
}
k.__b = function(e) {
	O = null, Ae && Ae(e);
}, k.__ = function(e, t) {
	e && t.__k && t.__k.__m && (e.__m = t.__k.__m), Fe && Fe(e, t);
}, k.__r = function(e) {
	je && je(e), Ce = 0;
	var t = (O = e.__c).__H;
	t && (we == O ? O.__h = [] : (t.__h.some(We), t.__h.some(Ge), Ce = 0), t.__h = [], t.__.some(function(e) {
		e.__N && (e.__ = e.__N), e.u = e.__N = void 0;
	})), we = O;
}, k.diffed = function(e) {
	Me && Me(e);
	var t = e.__c;
	t && t.__H && (t.__H.__h.length && Ue(Oe.push(t)), t.__H.__.some(function(e) {
		e.u && (e.__H = e.u);
	})), we = O = null;
}, k.__c = function(e, t) {
	t.some(function(e) {
		try {
			e.__h.some(We), e.__h = e.__h.filter(function(e) {
				return !e.__ || Ge(e);
			});
		} catch (t) {
			e.__h = [function() {
				throw t;
			}];
		}
	}), Ne && Ne(e, t);
}, k.unmount = function(e) {
	Pe && Pe(e);
	var t, n, r = e.__c;
	r && r.__H && (r.__H.__.some(function(r) {
		try {
			if (r.__P && r.__c) {
				if (n === void 0) {
					for (n = e.__; n && (!n.__c || !n.__c.__P);) n = n.__;
					n &&= n.__c;
				}
				r.__P = n, Ue(ke.push(r));
			} else We(r);
		} catch (e) {
			t = e;
		}
	}), r.__H = void 0, t && k.__e(t, r.__v));
};
var Ve = typeof requestAnimationFrame == "function";
function He(e) {
	var t, n = function() {
		clearTimeout(r), Ve && cancelAnimationFrame(t), setTimeout(e);
	}, r = setTimeout(n, 35);
	Ve && (t = requestAnimationFrame(n));
}
function Ue(e) {
	e != 1 && Te == k.requestAnimationFrame || ((Te = k.requestAnimationFrame) || He)(Be);
}
function We(e) {
	var t = O, n = e.__c;
	typeof n == "function" && (e.__c = void 0, n()), O = t;
}
function Ge(e) {
	var t = O;
	e.__c = e.__(), O = t;
}
function Ke(e, t) {
	return !e || e.length != t.length || t.some(function(t, n) {
		return !Ee(t, e[n]);
	});
}
function qe(e, t) {
	return typeof t == "function" ? t(e) : t;
}
// node_modules/@preact/signals-core/dist/signals-core.module.js
var Je = Symbol.for("preact-signals");
function Ye() {
	if (et > 1) et--;
	else {
		var e, t = !1;
		for ((function() {
			var e = it;
			for (it = void 0; e !== void 0;) {
				var t = e.S;
				if (t.v === e.v) for (var n = t.t; n !== void 0; n = n.x) n.i === e.i && (n.i = t.i);
				e = e.o;
			}
		})(); $e !== void 0;) {
			var n = $e;
			for ($e = void 0, tt++; n !== void 0;) {
				var r = n.u;
				if (n.u = void 0, n.f &= -3, !(8 & n.f) && st(n)) try {
					n.c();
				} catch (n) {
					t ||= (e = n, !0);
				}
				n = r;
			}
		}
		if (tt = 0, et--, t) throw e;
	}
}
function Xe(e) {
	if (et > 0) return e();
	rt = ++nt, et++;
	try {
		return e();
	} finally {
		Ye();
	}
}
var Ze, M = void 0;
function Qe(e) {
	var t = M, n = Ze;
	M = void 0, Ze = void 0;
	try {
		return e();
	} finally {
		M = t, Ze = n;
	}
}
var $e = void 0, et = 0, tt = 0, nt = 0, rt = 0, it = void 0, at = 0;
function ot(e) {
	if (M !== void 0) {
		var t = e.n;
		if (t === void 0 || t.t !== M) return t = {
			i: 0,
			S: e,
			p: M.s,
			n: void 0,
			t: M,
			e: void 0,
			x: void 0,
			r: t
		}, M.s !== void 0 && (M.s.n = t), M.s = t, e.n = t, 32 & M.f && e.S(t), t;
		if (t.i === -1) return t.i = 0, t.n !== void 0 && (t.n.p = t.p, t.p !== void 0 && (t.p.n = t.n), t.p = M.s, t.n = void 0, M.s.n = t, M.s = t), t;
	}
}
function N(e, t) {
	this.v = e, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = t?.watched, this.Z = t?.unwatched, this.name = t?.name;
}
N.prototype.brand = Je, N.prototype.h = function() {
	return !0;
}, N.prototype.S = function(e) {
	var t = this, n = this.t;
	n !== e && e.e === void 0 && (e.x = n, this.t = e, n === void 0 ? Qe(function() {
		var e;
		(e = t.W) == null || e.call(t);
	}) : n.e = e);
}, N.prototype.U = function(e) {
	var t = this;
	if (this.t !== void 0) {
		var n = e.e, r = e.x;
		n !== void 0 && (n.x = r, e.e = void 0), r !== void 0 && (r.e = n, e.x = void 0), e === this.t && (this.t = r, r === void 0 && Qe(function() {
			var e;
			(e = t.Z) == null || e.call(t);
		}));
	}
}, N.prototype.subscribe = function(e) {
	var t = this;
	return gt(function() {
		var n = t.value;
		Qe(function() {
			return e(n);
		});
	}, { name: "sub" });
}, N.prototype.valueOf = function() {
	return this.value;
}, N.prototype.toString = function() {
	return this.value + "";
}, N.prototype.toJSON = function() {
	return this.value;
}, N.prototype.peek = function() {
	var e = this;
	return Qe(function() {
		return e.value;
	});
}, Object.defineProperty(N.prototype, "value", {
	get: function() {
		var e = ot(this);
		return e !== void 0 && (e.i = this.i), this.v;
	},
	set: function(e) {
		if (e !== this.v) {
			if (tt > 100) throw Error("Cycle detected");
			(function(e) {
				et !== 0 && tt === 0 && e.l !== rt && (e.l = rt, it = {
					S: e,
					v: e.v,
					i: e.i,
					o: it
				});
			})(this), this.v = e, this.i++, at++, et++;
			try {
				for (var t = this.t; t !== void 0; t = t.x) t.t.N();
			} finally {
				Ye();
			}
		}
	}
});
function P(e, t) {
	return new N(e, t);
}
function st(e) {
	for (var t = e.s; t !== void 0; t = t.n) if (t.S.i !== t.i || !t.S.h() || t.S.i !== t.i) return !0;
	return !1;
}
function ct(e) {
	for (var t = e.s; t !== void 0; t = t.n) {
		var n = t.S.n;
		if (n !== void 0 && (t.r = n), t.S.n = t, t.i = -1, t.n === void 0) {
			e.s = t;
			break;
		}
	}
}
function lt(e) {
	for (var t = e.s, n = void 0; t !== void 0;) {
		var r = t.p;
		t.i === -1 ? (t.S.U(t), r !== void 0 && (r.n = t.n), t.n !== void 0 && (t.n.p = r)) : n = t, t.S.n = t.r, t.r !== void 0 && (t.r = void 0), t = r;
	}
	e.s = n;
}
function ut(e, t) {
	N.call(this, void 0, t), this.x = e, this.s = void 0, this.g = at - 1, this.f = 4;
}
ut.prototype = new N(), ut.prototype.h = function() {
	if (this.f &= -3, 1 & this.f) return !1;
	if ((36 & this.f) == 32 || (this.f &= -5, this.g === at)) return !0;
	if (this.g = at, this.f |= 1, this.i > 0 && !st(this)) return this.f &= -2, !0;
	var e = M;
	try {
		ct(this), M = this;
		var t = this.x();
		(16 & this.f || this.v !== t || this.i === 0) && (this.v = t, this.f &= -17, this.i++);
	} catch (e) {
		this.v = e, this.f |= 16, this.i++;
	}
	return M = e, lt(this), this.f &= -2, !0;
}, ut.prototype.S = function(e) {
	if (this.t === void 0) {
		this.f |= 36;
		for (var t = this.s; t !== void 0; t = t.n) t.S.S(t);
	}
	N.prototype.S.call(this, e);
}, ut.prototype.U = function(e) {
	if (this.t !== void 0 && (N.prototype.U.call(this, e), this.t === void 0)) {
		this.f &= -33;
		for (var t = this.s; t !== void 0; t = t.n) t.S.U(t);
	}
}, ut.prototype.N = function() {
	if (!(2 & this.f)) {
		this.f |= 6;
		for (var e = this.t; e !== void 0; e = e.x) e.t.N();
	}
}, Object.defineProperty(ut.prototype, "value", { get: function() {
	if (1 & this.f) throw Error("Cycle detected");
	var e = ot(this);
	if (this.h(), e !== void 0 && (e.i = this.i), 16 & this.f) throw this.v;
	return this.v;
} });
function dt(e, t) {
	return new ut(e, t);
}
function ft(e) {
	var t = e.j;
	if (e.j = void 0, typeof t == "function") {
		et++;
		var n = M;
		M = void 0;
		try {
			t();
		} catch (t) {
			throw e.f &= -2, e.f |= 8, pt(e), t;
		} finally {
			M = n, Ye();
		}
	}
}
function pt(e) {
	for (var t = e.s; t !== void 0; t = t.n) t.S.U(t);
	e.x = void 0, e.s = void 0, ft(e);
}
function mt(e) {
	if (M !== this) throw Error("Out-of-order effect");
	lt(this), M = e, this.f &= -2;
	try {
		8 & this.f && pt(this);
	} finally {
		Ye();
	}
}
function ht(e, t) {
	this.x = e, this.j = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = t?.name, Ze && Ze.push(this);
}
ht.prototype.c = function() {
	var e = this.S();
	try {
		if (8 & this.f || this.x === void 0) return;
		var t = this.x();
		typeof t == "function" && (this.j = t);
	} finally {
		e();
	}
}, ht.prototype.S = function() {
	if (1 & this.f) throw Error("Cycle detected");
	this.f |= 1, this.f &= -9, ft(this), ct(this), et++;
	var e = M;
	return M = this, mt.bind(this, e);
}, ht.prototype.N = function() {
	2 & this.f || (this.f |= 2, this.u = $e, $e = this);
}, ht.prototype.d = function() {
	this.f |= 8, 1 & this.f || pt(this);
}, ht.prototype.dispose = function() {
	this.d();
};
function gt(e, t) {
	var n = new ht(e, t);
	try {
		n.c();
	} catch (e) {
		throw n.d(), e;
	}
	var r = n.d.bind(n);
	return r[Symbol.dispose] = r, r;
}
// node_modules/@preact/signals/dist/signals.module.js
var _t, vt, yt = typeof window < "u" && !!window.__PREACT_SIGNALS_DEVTOOLS__, bt = [];
gt(function() {
	_t = this.N;
})();
function xt(t, n) {
	e[t] = n.bind(null, e[t] || function() {});
}
function St(e) {
	if (vt) {
		var t = vt;
		vt = void 0, t();
	}
	vt = e && e.S();
}
function Ct(e) {
	var t = this, r = e.data, i = Tt(r);
	i.name = "ReactiveDom", i.value = r;
	var a = ze(function() {
		for (var e = t, r = t.__v; r = r.__;) if (r.__c) {
			r.__c.__$f |= 4;
			break;
		}
		var a = dt(function() {
			var e = i.value.value;
			return e === 0 ? 0 : !0 === e ? "" : e || "";
		}), o = dt(function() {
			return !Array.isArray(a.value) && !n(a.value);
		}), s = gt(function() {
			if (this.N = Ot, o.value) {
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
Ct.displayName = "ReactiveTextNode", Object.defineProperties(N.prototype, {
	constructor: {
		configurable: !0,
		value: y(x, null).constructor
	},
	type: {
		configurable: !0,
		value: Ct
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
}), xt("__b", function(e, t) {
	if (St(), typeof t.type == "string") {
		var n, r = t.props;
		for (var i in r) if (i !== "children") {
			var a = r[i];
			a instanceof N && (n || (t.__np = n = {}), n[i] = a, r[i] = a.peek());
		}
	}
	e(t);
}), xt("__r", function(e, t) {
	if (e(t), t.type !== x) {
		St();
		var n, r = t.__c;
		r && (r.__$f &= -2, (n = r.__$u) === void 0 && (r.__$u = n = function(e, t) {
			var n;
			return gt(function() {
				n = this;
			}, { name: t }), n.c = e, n;
		}(function(e) {
			return function() {
				var t;
				yt && ((t = this.y) == null || t.call(this)), e.__$f |= 1, e.setState({});
			};
		}(r), typeof t.type == "function" ? t.type.displayName || t.type.name : ""))), St(n);
	}
}), xt("__e", function(e, t, n, r) {
	St(), e(t, n, r);
}), xt("diffed", function(e, t) {
	St();
	var n;
	if (typeof t.type == "string" && (n = t.__e)) {
		var r = t.__np, i = t.props, a = n.U;
		if (a) for (var o in a) {
			var s = a[o];
			s === void 0 || r && o in r || (s.d(), a[o] = void 0);
		}
		if (r) for (var c in a || (a = {}, n.U = a), r) {
			var l = a[c], u = r[c];
			l === void 0 ? (l = wt(n, c, u, i), a[c] = l) : l.o(u, i);
		}
	}
	e(t);
});
function wt(e, t, n, r) {
	var i = t in e && e.ownerSVGElement === void 0, a = P(n);
	return {
		o: function(e, t) {
			a.value = e, r = t;
		},
		d: gt(function() {
			this.N = Ot;
			var n = a.value.value;
			r[t] !== n && (r[t] = n, i ? e[t] = n : n != null && (!1 !== n || t[4] === "-") ? e.setAttribute(t, n) : e.removeAttribute(t));
		})
	};
}
xt("unmount", function(e, t) {
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
}), xt("__h", function(e, t, n, r) {
	r < 3 && (t.__$f |= 2), e(t, n, r);
}), S.prototype.shouldComponentUpdate = function(e, t) {
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
function Tt(e, t) {
	return ze(function() {
		return P(e, t);
	}, []);
}
var Et = function(e) {
	queueMicrotask(function() {
		queueMicrotask(e);
	});
};
function Dt() {
	Xe(function() {
		for (var e; e = bt.shift();) _t.call(e);
	});
}
function Ot() {
	bt.push(this) === 1 && (e.requestAnimationFrame || Et)(Dt);
}
// src/entities.ts
var F = (e) => e.split(".")[0], kt = /* @__PURE__ */ new Set(/* @__PURE__ */ "light.switch.fan.cover.climate.lock.media_player.input_boolean.vacuum.humidifier.valve.siren.sensor.binary_sensor.camera.scene.script.button.input_button.alarm_control_panel.number.input_number.select.input_select.weather.person.automation.water_heater".split(".")), At = /* @__PURE__ */ new Set([
	"light",
	"switch",
	"fan",
	"input_boolean",
	"siren",
	"humidifier",
	"automation"
]), jt = /* @__PURE__ */ new Set([
	...At,
	"cover",
	"climate",
	"lock",
	"media_player",
	"vacuum",
	"valve",
	"alarm_control_panel",
	"water_heater"
]), Mt = (e) => !e || e.state === "unavailable" || e.state === "unknown";
function Nt(e) {
	if (!e || Mt(e)) return !1;
	switch (F(e.entity_id)) {
		case "cover":
		case "valve": return e.state === "open" || e.state === "opening";
		case "lock": return e.state !== "locked";
		case "climate":
		case "water_heater": return e.state !== "off";
		case "media_player": return e.state === "playing";
		case "vacuum": return e.state === "cleaning";
		case "alarm_control_panel": return e.state.startsWith("armed") || e.state === "triggered";
		case "person": return e.state === "home";
		case "sensor":
		case "camera":
		case "weather":
		case "number":
		case "input_number":
		case "select":
		case "input_select": return !1;
		default: return e.state === "on";
	}
}
function Pt(e) {
	let t = F(e);
	return At.has(t) || t === "cover" || t === "valve" ? "toggle" : t === "scene" || t === "script" ? "activate" : t === "button" || t === "input_button" ? "press" : t === "lock" ? "lock" : t === "media_player" ? "media" : "details";
}
var Ft = {
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
	automation: ["mdi:robot", "mdi:robot-off"]
}, It = {
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
}, Lt = {
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
};
function Rt(e, t, n) {
	if (n?.icon) return n.icon;
	let r = e.entities?.[t];
	if (r?.icon) return r.icon;
	let i = e.states[t];
	if (i?.attributes.icon) return i.attributes.icon;
	let a = F(t), o = i?.attributes.device_class;
	if (a === "sensor" && o && It[o]) return It[o];
	if (a === "binary_sensor" && o && Lt[o]) {
		let [e, t] = Lt[o];
		return i?.state === "on" ? e : t;
	}
	let s = Ft[a] ?? ["mdi:help-circle-outline"];
	return Nt(i) || !s[1] ? s[0] : s[1];
}
function I(e, t, n, r) {
	if (n?.name) return n.name;
	let i = e.states[t]?.attributes.friendly_name ?? e.entities?.[t]?.name ?? t;
	if (r) {
		let e = r.toLowerCase() + " ";
		i.toLowerCase().startsWith(e) && i.length > e.length + 1 && (i = i.slice(e.length), i = i.charAt(0).toUpperCase() + i.slice(1));
	}
	return i;
}
var zt = {
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
}, Bt = (e) => e.replace(/_/g, " ").replace(/\b\w/g, (e) => e.toUpperCase());
function Vt(e, t) {
	if (!t) return "Not found";
	if (t.state === "unavailable") return "Unavailable";
	if (t.state === "unknown") return "Unknown";
	let n = F(t.entity_id);
	if (n === "binary_sensor") {
		let e = zt[t.attributes.device_class] ?? ["On", "Off"];
		return t.state === "on" ? e[0] : e[1];
	}
	if (n === "light" && t.state === "on" && t.attributes.brightness != null) return `${Math.round(t.attributes.brightness / 255 * 100)}%`;
	if (n === "cover" && t.attributes.current_position != null && t.state === "open") return `Open · ${t.attributes.current_position}%`;
	if (n === "climate") {
		let e = t.attributes, n = Bt(e.hvac_action ?? t.state);
		return e.temperature == null ? e.target_temp_low != null && e.target_temp_high != null ? `${n} · ${e.target_temp_low}–${e.target_temp_high}°` : e.current_temperature == null ? n : `${n} · ${e.current_temperature}°` : `${n} · ${e.temperature}°`;
	}
	if (n === "media_player" && t.attributes.media_title) return t.attributes.media_artist ? `${t.attributes.media_title} · ${t.attributes.media_artist}` : t.attributes.media_title;
	if (n === "scene" || n === "script" || n === "button" || n === "input_button") return n === "script" && t.state === "on" ? "Running" : "Tap to run";
	if (e.formatEntityState) try {
		return e.formatEntityState(t);
	} catch {}
	let r = t.attributes.unit_of_measurement, i = Number(t.state);
	return r && !Number.isNaN(i) ? `${Math.abs(i) >= 100 ? Math.round(i) : Math.round(i * 10) / 10} ${r}` : Bt(t.state);
}
function Ht(e, t) {
	let n = e.entities?.[t];
	return n ? n.area_id ? n.area_id : n.device_id ? e.devices?.[n.device_id]?.area_id ?? null : null : null;
}
function Ut(e, t) {
	if (!kt.has(F(t))) return !1;
	let n = e.entities?.[t];
	return !(n?.hidden || n?.entity_category);
}
function Wt(e, t) {
	return Object.keys(e.states).filter((n) => Ut(e, n) && Ht(e, n) === t).sort(Xt(e));
}
function Gt(e) {
	return Object.keys(e.states).filter((t) => Ut(e, t) && !Ht(e, t)).sort(Xt(e));
}
var Kt = /* @__PURE__ */ new Set([
	"temperature",
	"humidity",
	"carbon_dioxide",
	"pm25"
]), qt = /* @__PURE__ */ new Set([
	"door",
	"garage_door",
	"window",
	"opening",
	"motion",
	"occupancy",
	"moisture",
	"smoke"
]);
function Jt(e, t) {
	let n = F(t);
	if (jt.has(n) || n === "camera") return n !== "automation";
	let r = e.states[t]?.attributes.device_class;
	return n === "sensor" ? Kt.has(r) : n === "binary_sensor" && qt.has(r);
}
var Yt = [
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
function Xt(e) {
	return (t, n) => {
		let r = Yt.indexOf(F(t)), i = Yt.indexOf(F(n)), a = r === -1 ? 99 : r, o = i === -1 ? 99 : i;
		return a === o ? I(e, t).localeCompare(I(e, n)) : a - o;
	};
}
function Zt(e) {
	let t = F(e);
	return t === "camera" || t === "media_player" ? "wide" : t === "climate" ? "lg" : "sm";
}
var Qt = {
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
	water_heater: "Water heaters"
}, L = P(null), $t = P(!1), en = P(null), R = P(null), tn = P(0), nn = P(null), z = P(null), rn = dt(() => z.value !== null), an = dt(() => z.value ?? R.value), B = P(null), on = P(!1), sn = P(!1), cn = P(null), ln;
function V(e, t = "info") {
	cn.value = {
		text: e,
		kind: t
	}, clearTimeout(ln), ln = window.setTimeout(() => cn.value = null, 3500);
}
function un() {
	if (!L.value) throw Error("Home Assistant is not connected");
	return L.value;
}
var dn = null;
async function fn() {
	try {
		let [e, t] = await Promise.all([un().callWS({ type: "dashforge/info" }), un().callWS({ type: "dashforge/config/get" })]);
		en.value = e, tn.value = t.revision, R.value = t.config ? ye(t.config) : null, nn.value = null, dn ||= await un().connection.subscribeMessage((e) => {
			e.revision !== tn.value && (tn.value = e.revision, R.value = e.config ? ye(e.config) : null);
		}, { type: "dashforge/config/subscribe" });
	} catch (e) {
		nn.value = e?.message ?? String(e);
	}
}
function pn() {
	dn?.().catch(() => void 0), dn = null;
}
async function mn(e) {
	try {
		return tn.value = (await un().callWS({
			type: "dashforge/config/save",
			config: e,
			revision: tn.value
		})).revision, R.value = e ? ye(e) : null, !0;
	} catch (e) {
		return e?.code === "conflict" ? (V("This dashboard was changed on another device. Reloaded the latest version.", "error"), await fn()) : V(e?.message ?? "Could not save the dashboard", "error"), !1;
	}
}
function hn() {
	R.value && (z.value = be(R.value));
}
function gn(e) {
	if (!z.value) return;
	let t = be(z.value);
	e(t), z.value = t;
}
async function _n() {
	z.value && await mn(z.value) && (z.value = null, V("Dashboard saved"));
}
function vn() {
	z.value = null;
}
function H(e, t, n = {}) {
	return un().callService(e, t, n).catch((n) => V(n?.message ?? `${e}.${t} failed`, "error"));
}
function yn(e) {
	bn?.dispatchEvent(new CustomEvent("hass-more-info", {
		detail: { entityId: e },
		bubbles: !0,
		composed: !0
	}));
}
var bn = null;
function xn(e) {
	bn = e;
}
// node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
var Sn = Symbol.for("pv"), Cn = 0;
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
		constructor: Sn,
		__v: --Cn,
		__i: -1,
		__u: 0
	};
	return (a || o) && (u.__source = a, u.__self = o), e.vnode && e.vnode(u), u;
}
// src/components/ui.tsx
function W({ icon: e, size: t = 24, class: n }) {
	return /* @__PURE__ */ U("ha-icon", {
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
	let t = e.min ?? 0, n = e.max ?? 100, r = e.step ?? 1, [i, a] = A(null), o = Re(null), s = i ?? e.value, c = n === t ? 0 : (s - t) / (n - t) * 100, l = (i) => {
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
	return j(() => {
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
function wn(e) {
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
function Tn({ checked: e, onChange: t }) {
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
var En = [
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
function Dn({ value: e, onChange: t }) {
	return /* @__PURE__ */ U("div", {
		class: "icon-picker",
		children: [/* @__PURE__ */ U("div", {
			class: "icon-grid",
			children: En.map((n) => /* @__PURE__ */ U("button", {
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
function On(e, t, n = 500) {
	let r = Re(void 0), i = Re(!1), a = Re(null);
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
var kn = P(null), An = P(null), jn = P(null), Mn = P(null);
function Nn(e, t) {
	let n = e.entities?.[t], r = n?.area_id ?? (n?.device_id ? e.devices?.[n.device_id]?.area_id : null);
	return r ? e.areas?.[r]?.name ?? "Other" : "No area";
}
function Pn(e) {
	let t = L.value, [n, r] = A(""), [i, a] = A("all"), o = ze(() => Object.keys(t.states).filter((n) => Ut(t, n) && (!e.domains || e.domains.includes(F(n)))).sort((e, n) => I(t, e).localeCompare(I(t, n))), [Object.keys(t.states).length]), s = ze(() => [...new Set(o.map(F))].sort(), [o]), c = n.trim().toLowerCase(), l = o.filter((e) => (i === "all" || F(e) === i) && (!c || e.toLowerCase().includes(c) || I(t, e).toLowerCase().includes(c) || Nn(t, e).toLowerCase().includes(c))), u = /* @__PURE__ */ new Map();
	for (let e of l.slice(0, 400)) {
		let n = Nn(t, e);
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
					children: Qt[e] ?? e
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
						}), n.map((t) => /* @__PURE__ */ U(Fn, {
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
function Fn({ id: e, selected: t, onToggle: n, room: r }) {
	let i = L.value;
	return /* @__PURE__ */ U("button", {
		type: "button",
		class: `entity-row ${t ? "selected" : ""}`,
		onClick: n,
		"aria-pressed": t,
		children: [
			/* @__PURE__ */ U(W, {
				icon: Rt(i, e),
				size: 22
			}),
			/* @__PURE__ */ U("span", {
				class: "entity-row-text",
				children: [/* @__PURE__ */ U("span", { children: I(i, e, void 0, r) }), /* @__PURE__ */ U("span", {
					class: "muted small",
					children: [
						Vt(i, i.states[e]),
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
function In() {
	let e = z.value;
	if (!e) return null;
	let t = B.value, n = t?.type === "section" ? e.sections.find((e) => e.id === t.id) : e.sections[0], r = n?.cards.filter((e) => e.hidden).length ?? 0;
	return /* @__PURE__ */ U("div", {
		class: "edit-bar",
		role: "toolbar",
		"aria-label": "Edit dashboard",
		children: [/* @__PURE__ */ U("div", {
			class: "edit-bar-group",
			children: [n && /* @__PURE__ */ U(x, { children: [
				/* @__PURE__ */ U(K, {
					icon: "mdi:plus",
					onClick: () => kn.value = n.id,
					children: "Add device"
				}),
				/* @__PURE__ */ U(K, {
					icon: "mdi:pencil",
					onClick: () => jn.value = n.id,
					children: ["Edit ", n.kind === "room" ? "room" : "page"]
				}),
				r > 0 && /* @__PURE__ */ U(K, {
					icon: "mdi:eye-off",
					onClick: () => Mn.value = n.id,
					children: [
						"Hidden (",
						r,
						")"
					]
				})
			] }), /* @__PURE__ */ U(K, {
				icon: "mdi:folder-plus",
				onClick: () => jn.value = "new",
				children: "New room or page"
			})]
		}), /* @__PURE__ */ U("div", {
			class: "edit-bar-group",
			children: [/* @__PURE__ */ U(K, {
				kind: "ghost",
				onClick: vn,
				children: "Cancel"
			}), /* @__PURE__ */ U(K, {
				kind: "primary",
				icon: "mdi:check",
				onClick: _n,
				children: "Done"
			})]
		})]
	});
}
function Ln() {
	let e = kn.value, t = z.value?.sections.find((t) => t.id === e);
	return t ? /* @__PURE__ */ U(Y, {
		title: `Add to ${t.name}`,
		onClose: () => kn.value = null,
		wide: !0,
		footer: /* @__PURE__ */ U(K, {
			kind: "primary",
			onClick: () => kn.value = null,
			children: "Done"
		}),
		children: /* @__PURE__ */ U(Pn, {
			isSelected: (e) => t.cards.some((t) => t.entity === e && !t.hidden),
			onToggle: (e) => gn((n) => {
				let r = n.sections.find((e) => e.id === t.id), i = r.cards.find((t) => t.entity === e);
				i ? i.hidden ? i.hidden = !1 : r.cards = r.cards.filter((t) => t.entity !== e) : r.cards.push(xe(e, Zt(e)));
			}),
			autofocus: !0
		})
	}) : null;
}
var Rn = [
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
function zn() {
	let e = An.value, t = z.value, n = L.value, r = t?.sections.find((t) => t.id === e?.sectionId), i = r?.cards.find((t) => t.id === e?.cardId);
	if (!e || !r || !i || !n) return null;
	let a = (e) => gn((t) => {
		let n = t.sections.find((e) => e.id === r.id)?.cards.find((e) => e.id === i.id);
		n && e(n);
	}), o = () => An.value = null;
	return /* @__PURE__ */ U(Y, {
		title: "Edit card",
		onClose: o,
		footer: /* @__PURE__ */ U(x, { children: [/* @__PURE__ */ U(K, {
			kind: "danger",
			icon: "mdi:delete",
			onClick: () => {
				gn((e) => {
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
					placeholder: I(n, i.entity, void 0, r.name),
					onInput: (e) => a((t) => t.name = e || void 0)
				})
			}),
			/* @__PURE__ */ U(X, {
				label: "Size",
				children: /* @__PURE__ */ U(wn, {
					value: i.size,
					options: Rn,
					onChange: (e) => a((t) => t.size = e)
				})
			}),
			/* @__PURE__ */ U(X, {
				label: "Icon",
				hint: "Leave empty to use the default icon.",
				children: /* @__PURE__ */ U(Dn, {
					value: i.icon ?? "",
					onChange: (e) => a((t) => t.icon = e || void 0)
				})
			}),
			/* @__PURE__ */ U(X, {
				label: "Move to",
				children: /* @__PURE__ */ U("select", {
					class: "input",
					value: r.id,
					onChange: (e) => {
						let t = e.target.value;
						t !== r.id && (gn((e) => {
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
function Bn() {
	let e = Mn.value, t = z.value?.sections.find((t) => t.id === e), n = L.value;
	if (!t || !n) return null;
	let r = t.cards.filter((e) => e.hidden);
	return /* @__PURE__ */ U(Y, {
		title: "Hidden cards",
		onClose: () => Mn.value = null,
		children: [r.length === 0 && /* @__PURE__ */ U("p", {
			class: "muted",
			children: "No hidden cards."
		}), r.map((e) => /* @__PURE__ */ U("div", {
			class: "row",
			children: [
				/* @__PURE__ */ U(W, { icon: Rt(n, e.entity, e) }),
				/* @__PURE__ */ U("div", {
					class: "row-text",
					children: /* @__PURE__ */ U("div", {
						class: "row-label",
						children: I(n, e.entity, e, t.name)
					})
				}),
				/* @__PURE__ */ U(K, {
					icon: "mdi:eye",
					onClick: () => gn((n) => {
						let r = n.sections.find((e) => e.id === t.id)?.cards.find((t) => t.id === e.id);
						r && (r.hidden = !1);
					}),
					children: "Show"
				})
			]
		}))]
	});
}
function Vn() {
	let e = jn.value;
	return !e || !z.value || !L.value ? null : /* @__PURE__ */ U(Hn, { ref_: e }, e);
}
function Hn({ ref_: e }) {
	let t = z.value, n = L.value, [r, i] = A(null), a = e === "new" ? null : t.sections.find((t) => t.id === e), o = r ?? (a ? {
		name: a.name,
		icon: a.icon,
		kind: a.kind,
		areaId: a.areaId
	} : {
		name: "",
		icon: "mdi:home",
		kind: "room"
	}), s = () => {
		i(null), jn.value = null;
	}, c = a ? t.sections.indexOf(a) : -1, l = () => {
		o.name.trim() && (gn((e) => {
			if (a) {
				let t = e.sections.find((e) => e.id === a.id);
				Object.assign(t, {
					name: o.name.trim(),
					icon: o.icon,
					kind: o.kind,
					areaId: o.areaId
				});
			} else {
				let t = Se(o.kind, o.name.trim(), o.icon, o.areaId);
				e.sections.push(t), B.value = {
					type: "section",
					id: t.id
				};
			}
		}), s());
	}, u = (e) => gn((t) => {
		let n = t.sections.findIndex((e) => e.id === a.id), r = n + e;
		r < 0 || r >= t.sections.length || ([t.sections[n], t.sections[r]] = [t.sections[r], t.sections[n]]);
	});
	return /* @__PURE__ */ U(Y, {
		title: a ? `Edit ${a.name}` : "New room or page",
		onClose: s,
		footer: /* @__PURE__ */ U(x, { children: [a && /* @__PURE__ */ U(K, {
			kind: "danger",
			icon: "mdi:delete",
			onClick: () => {
				confirm(`Delete ${a.name} and its cards from the dashboard? Nothing is deleted from Home Assistant.`) && (gn((e) => e.sections = e.sections.filter((e) => e.id !== a.id)), s());
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
				children: /* @__PURE__ */ U(wn, {
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
			/* @__PURE__ */ U(X, {
				label: "Icon",
				children: /* @__PURE__ */ U(Dn, {
					value: o.icon,
					onChange: (e) => i({
						...o,
						icon: e
					})
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
// src/components/cards.tsx
var Un = P(null), Wn = P(null);
function Gn(e) {
	if (!e) return;
	let t = F(e.entity_id);
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
function Kn(e, t, n, r) {
	let i = e.states[t];
	if (Mt(i) && Pt(t) !== "details") {
		V(`${I(e, t, n)} is unavailable`, "error");
		return;
	}
	let a = F(t);
	switch (Pt(t)) {
		case "toggle":
			a === "cover" || a === "valve" ? H(a, i.state === "open" || i.state === "opening" ? `close_${a}` : `open_${a}`, { entity_id: t }) : H(a, "toggle", { entity_id: t });
			return;
		case "activate":
			H(a, "turn_on", { entity_id: t }), V(`${I(e, t, n)} activated`);
			return;
		case "press":
			H(a, "press", { entity_id: t });
			return;
		case "lock":
			i.state === "locked" ? Wn.value = t : H("lock", "lock", { entity_id: t });
			return;
		case "media":
			H("media_player", "media_play_pause", { entity_id: t });
			return;
		default: Un.value = {
			entity: t,
			card: n,
			room: r
		};
	}
}
function qn(e) {
	let t = L.value, { card: n } = e, r = t.states[n.entity], i = Nt(r), a = Gn(r), o = I(t, n.entity, n, e.room), s = F(n.entity), c = On(() => !e.editing && (Un.value = {
		entity: n.entity,
		card: n,
		room: e.room
	}), () => e.editing ? e.onEdit?.() : Kn(t, n.entity, n, e.room));
	return /* @__PURE__ */ U("div", {
		class: [
			"tile",
			`size-${n.size}`,
			`d-${s}`,
			i ? "active" : "",
			Mt(r) ? "unavailable" : "",
			e.editing ? "editing" : "",
			e.dragging ? "dragging" : ""
		].join(" "),
		"data-index": e.index,
		style: a ? `--tile-active:${a}` : void 0,
		role: "button",
		tabIndex: 0,
		"aria-label": `${o}, ${Vt(t, r)}`,
		onKeyDown: (r) => {
			(r.key === "Enter" || r.key === " ") && (r.preventDefault(), e.editing ? e.onEdit?.() : Kn(t, n.entity, n, e.room));
		},
		...c,
		children: [e.editing && /* @__PURE__ */ U(x, { children: [/* @__PURE__ */ U("button", {
			type: "button",
			class: "badge badge-remove",
			"aria-label": `Hide ${o}`,
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
			"aria-label": `Resize ${o}`,
			onPointerDown: (e) => e.stopPropagation(),
			onClick: (t) => {
				t.stopPropagation(), e.onResize?.();
			},
			children: /* @__PURE__ */ U(W, {
				icon: "mdi:arrow-expand",
				size: 14
			})
		})] }), n.size !== "sm" && !e.editing ? /* @__PURE__ */ U(Xn, {
			h: t,
			card: n,
			s: r,
			name: o
		}) : /* @__PURE__ */ U(Yn, {
			h: t,
			card: n,
			s: r,
			name: o
		})]
	});
}
function Jn({ h: e, card: t, s: n, name: r }) {
	return /* @__PURE__ */ U(x, { children: [/* @__PURE__ */ U("div", {
		class: "tile-icon",
		children: /* @__PURE__ */ U(W, {
			icon: Rt(e, t.entity, t),
			size: t.size === "sm" ? 24 : 26
		})
	}), /* @__PURE__ */ U("div", {
		class: "tile-text",
		children: [/* @__PURE__ */ U("div", {
			class: "tile-name",
			children: r
		}), /* @__PURE__ */ U("div", {
			class: "tile-state",
			children: Vt(e, n)
		})]
	})] });
}
function Yn(e) {
	return F(e.card.entity) === "sensor" && e.s && !Mt(e.s) && !Number.isNaN(Number(e.s.state)) ? /* @__PURE__ */ U(x, { children: [/* @__PURE__ */ U("div", {
		class: "tile-icon",
		children: /* @__PURE__ */ U(W, {
			icon: Rt(e.h, e.card.entity, e.card),
			size: 24
		})
	}), /* @__PURE__ */ U("div", {
		class: "tile-text",
		children: [/* @__PURE__ */ U("div", {
			class: "tile-value",
			children: Vt(e.h, e.s)
		}), /* @__PURE__ */ U("div", {
			class: "tile-name",
			children: e.name
		})]
	})] }) : /* @__PURE__ */ U(Jn, { ...e });
}
function Xn(e) {
	switch (F(e.card.entity)) {
		case "light": return /* @__PURE__ */ U(Zn, { ...e });
		case "fan": return /* @__PURE__ */ U(Qn, { ...e });
		case "cover": return /* @__PURE__ */ U($n, { ...e });
		case "climate": return /* @__PURE__ */ U(nr, { ...e });
		case "media_player": return /* @__PURE__ */ U(ir, { ...e });
		case "camera": return /* @__PURE__ */ U(or, { ...e });
		case "sensor": return /* @__PURE__ */ U(sr, { ...e });
		default: return /* @__PURE__ */ U("div", {
			class: "big-body",
			children: /* @__PURE__ */ U(Jn, { ...e })
		});
	}
}
function Zn(e) {
	let t = e.s, n = t?.state === "on" && t?.attributes.brightness != null ? Math.round(t.attributes.brightness / 255 * 100) : 0, r = (t?.attributes.supported_color_modes ?? []).some((e) => e !== "onoff");
	return /* @__PURE__ */ U("div", {
		class: "big-body",
		children: [/* @__PURE__ */ U("div", {
			class: "big-top",
			children: /* @__PURE__ */ U(Jn, { ...e })
		}), r && !Mt(t) && /* @__PURE__ */ U(J, {
			value: n,
			min: 1,
			max: 100,
			label: `${e.name} brightness`,
			color: Gn(t),
			format: (e) => `${e}%`,
			onCommit: (t) => H("light", "turn_on", {
				entity_id: e.card.entity,
				brightness_pct: t
			})
		})]
	});
}
function Qn(e) {
	let t = e.s, n = t?.state === "on" ? t.attributes.percentage ?? 100 : 0, r = t?.attributes.percentage_step ?? 1;
	return /* @__PURE__ */ U("div", {
		class: "big-body",
		children: [/* @__PURE__ */ U("div", {
			class: "big-top",
			children: /* @__PURE__ */ U(Jn, { ...e })
		}), t?.attributes.percentage !== void 0 && !Mt(t) && /* @__PURE__ */ U(J, {
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
function $n(e) {
	let t = e.s, n = e.card.entity;
	return /* @__PURE__ */ U("div", {
		class: "big-body cover-big",
		children: [/* @__PURE__ */ U("div", {
			class: "big-top",
			children: /* @__PURE__ */ U(Jn, { ...e })
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
function er(e, t) {
	let n = e.states[t]?.attributes ?? {}, [r, i] = A(null), a = Re(void 0), o = n.target_temp_step ?? (e.config.unit_system.temperature === "°F" ? 1 : .5), s = n.min_temp ?? 7, c = n.max_temp ?? 35, l = n.temperature == null && n.target_temp_low != null && n.target_temp_high != null, u = l ? [n.target_temp_low, n.target_temp_high] : n.temperature == null ? null : [n.temperature, n.temperature], d = r ?? u, f = (e) => Math.min(c, Math.max(s, Math.round(e / o) * o));
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
function tr({ h: e, entityId: t, big: n }) {
	let r = e.states[t], { shown: i, label: a, isRange: o, nudge: s, min: c, max: l } = er(e, t), u = r?.attributes.current_temperature, d = (e) => Math.min(1, Math.max(0, (e - c) / (l - c))), f = i && o ? d(i[0]) : 0, p = i ? d(i[1]) : 0, m = 2 * Math.PI * 52, h = m * .75, g = Gn(r) ?? "var(--accent)";
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
function nr(e) {
	return /* @__PURE__ */ U("div", {
		class: "big-body climate-big",
		children: [/* @__PURE__ */ U("div", {
			class: "big-top",
			children: /* @__PURE__ */ U(Jn, { ...e })
		}), !Mt(e.s) && /* @__PURE__ */ U(tr, {
			h: e.h,
			entityId: e.card.entity
		})]
	});
}
function rr({ h: e, entityId: t, showVolume: n }) {
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
function ir(e) {
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
					}) : /* @__PURE__ */ U(W, { icon: Rt(e.h, e.card.entity, e.card) })
				}), /* @__PURE__ */ U("div", {
					class: "tile-text",
					children: [/* @__PURE__ */ U("div", {
						class: "tile-name",
						children: t?.attributes.media_title ?? e.name
					}), /* @__PURE__ */ U("div", {
						class: "tile-state",
						children: t?.attributes.media_artist ?? Vt(e.h, t)
					})]
				})]
			}),
			!Mt(t) && t?.state !== "off" && /* @__PURE__ */ U(rr, {
				h: e.h,
				entityId: e.card.entity,
				showVolume: e.card.size === "wide"
			})
		]
	});
}
function ar({ h: e, entityId: t }) {
	let [n, r] = A(0);
	j(() => {
		let e = window.setInterval(() => document.visibilityState === "visible" && r((e) => e + 1), 1e4);
		return () => clearInterval(e);
	}, []);
	let i = e.states[t]?.attributes.entity_picture;
	return i ? /* @__PURE__ */ U("img", {
		class: "camera-img",
		src: e.hassUrl(i) + (i.includes("?") ? "&" : "?") + `t=${n}`,
		alt: "",
		loading: "lazy"
	}) : /* @__PURE__ */ U("div", {
		class: "camera-empty",
		children: /* @__PURE__ */ U(W, { icon: "mdi:cctv-off" })
	});
}
function or(e) {
	return /* @__PURE__ */ U("div", {
		class: "big-body camera-big",
		children: [/* @__PURE__ */ U(ar, {
			h: e.h,
			entityId: e.card.entity
		}), /* @__PURE__ */ U("div", {
			class: "camera-label",
			children: e.name
		})]
	});
}
function sr(e) {
	return /* @__PURE__ */ U("div", {
		class: "big-body sensor-big",
		children: [
			/* @__PURE__ */ U("div", {
				class: "tile-icon",
				children: /* @__PURE__ */ U(W, { icon: Rt(e.h, e.card.entity, e.card) })
			}),
			/* @__PURE__ */ U("div", {
				class: "sensor-value",
				children: Vt(e.h, e.s)
			}),
			/* @__PURE__ */ U("div", {
				class: "tile-name",
				children: e.name
			})
		]
	});
}
// src/components/details.tsx
var cr = [
	[0, 0],
	[30, 90],
	[50, 90],
	[120, 70],
	[180, 80],
	[220, 90],
	[270, 80],
	[320, 80]
], lr = (e) => e.replace(/_/g, " ").replace(/\b\w/g, (e) => e.toUpperCase());
function ur(e) {
	let t = (Date.now() - new Date(e).getTime()) / 1e3;
	return t < 60 ? "just now" : t < 3600 ? `${Math.floor(t / 60)} min ago` : t < 86400 ? `${Math.floor(t / 3600)} h ago` : `${Math.floor(t / 86400)} d ago`;
}
function dr() {
	let e = Un.value, t = L.value;
	if (!e || !t) return null;
	let n = t.states[e.entity], r = I(t, e.entity, e.card, e.room), i = () => Un.value = null;
	return /* @__PURE__ */ U(Y, {
		title: r,
		onClose: i,
		footer: /* @__PURE__ */ U(x, { children: [/* @__PURE__ */ U("span", {
			class: "muted",
			children: n ? `Changed ${ur(n.last_changed)}` : ""
		}), /* @__PURE__ */ U(K, {
			kind: "ghost",
			icon: "mdi:open-in-new",
			onClick: () => {
				i(), yn(e.entity);
			},
			children: "Home Assistant details"
		})] }),
		children: [/* @__PURE__ */ U("div", {
			class: "detail-head",
			style: Gn(n) ? `--tile-active:${Gn(n)}` : void 0,
			children: [/* @__PURE__ */ U("div", {
				class: `tile-icon big ${Nt(n) ? "active" : ""}`,
				children: /* @__PURE__ */ U(W, {
					icon: Rt(t, e.entity, e.card),
					size: 32
				})
			}), /* @__PURE__ */ U("div", {
				class: "detail-state",
				children: Vt(t, n)
			})]
		}), n && !Mt(n) ? /* @__PURE__ */ U(fr, {
			h: t,
			s: n
		}) : /* @__PURE__ */ U("p", {
			class: "muted",
			children: "This device is not responding right now."
		})]
	});
}
function fr({ h: e, s: t }) {
	let n = t.entity_id, r = F(n), i = t.attributes;
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
					/* @__PURE__ */ U(pr, { s: t }),
					r && /* @__PURE__ */ U(mr, {
						label: "Brightness",
						children: /* @__PURE__ */ U(J, {
							value: s,
							min: 1,
							max: 100,
							color: Gn(t),
							format: (e) => `${e}%`,
							onCommit: (e) => H("light", "turn_on", {
								entity_id: n,
								brightness_pct: e
							})
						})
					}),
					a && /* @__PURE__ */ U(mr, {
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
					o && /* @__PURE__ */ U(mr, {
						label: "Colour",
						children: /* @__PURE__ */ U("div", {
							class: "swatches",
							children: cr.map(([e, t], r) => r === 0 ? /* @__PURE__ */ U("button", {
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
					i.effect_list?.length > 0 && /* @__PURE__ */ U(hr, {
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
				/* @__PURE__ */ U(pr, { s: t }),
				i.percentage !== void 0 && /* @__PURE__ */ U(mr, {
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
				i.preset_modes?.length > 0 && /* @__PURE__ */ U(hr, {
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
				i.current_position != null && /* @__PURE__ */ U(mr, {
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
				i.current_tilt_position != null && /* @__PURE__ */ U(mr, {
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
				/* @__PURE__ */ U(tr, {
					h: e,
					entityId: n,
					big: !0
				}),
				i.hvac_modes?.length > 0 && /* @__PURE__ */ U(hr, {
					label: "Mode",
					value: t.state,
					options: i.hvac_modes,
					onPick: (e) => H("climate", "set_hvac_mode", {
						entity_id: n,
						hvac_mode: e
					})
				}),
				i.preset_modes?.length > 0 && /* @__PURE__ */ U(hr, {
					label: "Preset",
					value: i.preset_mode,
					options: i.preset_modes,
					onPick: (e) => H("climate", "set_preset_mode", {
						entity_id: n,
						preset_mode: e
					})
				}),
				i.fan_modes?.length > 0 && /* @__PURE__ */ U(hr, {
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
					/* @__PURE__ */ U(rr, {
						h: e,
						entityId: n,
						showVolume: !0
					}),
					i.source_list?.length > 0 && /* @__PURE__ */ U(hr, {
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
					onClick: () => Wn.value = n,
					children: "Unlock"
				})]
			})
		});
		case "alarm_control_panel": return /* @__PURE__ */ U(gr, { s: t });
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
			children: /* @__PURE__ */ U(hr, {
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
			children: /* @__PURE__ */ U(ar, {
				h: e,
				entityId: n
			})
		});
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
		case "sensor": return /* @__PURE__ */ U(_r, {
			h: e,
			entityId: n,
			unit: i.unit_of_measurement
		});
		default: return e.services[r]?.toggle ? /* @__PURE__ */ U("div", {
			class: "controls",
			children: /* @__PURE__ */ U(pr, { s: t })
		}) : null;
	}
}
function pr({ s: e }) {
	let t = F(e.entity_id);
	return /* @__PURE__ */ U("div", {
		class: "control-row",
		children: [/* @__PURE__ */ U("span", { children: e.state === "on" ? "On" : "Off" }), /* @__PURE__ */ U(q, {
			checked: e.state === "on",
			onChange: () => H(t, "toggle", { entity_id: e.entity_id })
		})]
	});
}
function mr({ label: e, children: t }) {
	return /* @__PURE__ */ U("div", {
		class: "labeled",
		children: [/* @__PURE__ */ U("div", {
			class: "labeled-label",
			children: e
		}), t]
	});
}
function hr({ label: e, value: t, options: n, onPick: r }) {
	return /* @__PURE__ */ U(mr, {
		label: e,
		children: /* @__PURE__ */ U("div", {
			class: "chips",
			children: n.map((e) => /* @__PURE__ */ U("button", {
				type: "button",
				class: `chip ${e === t ? "selected" : ""}`,
				onClick: () => r(e),
				children: lr(e)
			}))
		})
	});
}
function gr({ s: e }) {
	let [t, n] = A(""), r = e.entity_id, i = !!e.attributes.code_format, a = e.attributes.supported_features ?? 0, o = (e) => {
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
function _r({ h: e, entityId: t, unit: n }) {
	let [r, i] = A(null);
	if (j(() => {
		let n = !0, r = /* @__PURE__ */ new Date(), a = /* @__PURE__ */ new Date(r.getTime() - 864e5);
		return e.callWS({
			type: "history/history_during_period",
			start_time: a.toISOString(),
			end_time: r.toISOString(),
			entity_ids: [t],
			minimal_response: !0,
			no_attributes: !0
		}).then((e) => {
			if (!n) return;
			let r = (e[t] ?? []).map((e) => ({
				t: e.lu * 1e3,
				v: Number(e.s)
			})).filter((e) => !Number.isNaN(e.v));
			i(r);
		}).catch(() => n && i([])), () => {
			n = !1;
		};
	}, [t]), r === null) return /* @__PURE__ */ U("p", {
		class: "muted",
		children: "Loading history…"
	});
	if (r.length < 2) return /* @__PURE__ */ U("p", {
		class: "muted",
		children: "No numeric history for the last 24 hours."
	});
	let a = r[0].t, o = Date.now(), s = r.map((e) => e.v), c = Math.min(...s), l = Math.max(...s);
	l === c && (l += 1, --c);
	let u = (e) => (e - a) / (o - a) * 320, d = (e) => 112 - (e - c) / (l - c) * 104, f = `M${u(r[0].t)},${d(r[0].v)}`;
	for (let e = 1; e < r.length; e++) f += ` H${u(r[e].t)} V${d(r[e].v)}`;
	f += " H320";
	let p = (e) => Math.abs(e) >= 100 ? Math.round(e) : Math.round(e * 10) / 10;
	return /* @__PURE__ */ U("div", {
		class: "history",
		children: [
			/* @__PURE__ */ U("div", {
				class: "labeled-label",
				children: "Last 24 hours"
			}),
			/* @__PURE__ */ U("svg", {
				viewBox: "0 0 320 120",
				class: "history-chart",
				role: "img",
				"aria-label": "24 hour history",
				children: [/* @__PURE__ */ U("path", {
					d: `${f} V120 H${u(r[0].t)} Z`,
					class: "history-area"
				}), /* @__PURE__ */ U("path", {
					d: f,
					class: "history-line"
				})]
			}),
			/* @__PURE__ */ U("div", {
				class: "history-range muted",
				children: [/* @__PURE__ */ U("span", { children: [
					"Low ",
					p(c),
					" ",
					n
				] }), /* @__PURE__ */ U("span", { children: [
					"High ",
					p(l),
					" ",
					n
				] })]
			})
		]
	});
}
function vr() {
	let e = Wn.value, t = L.value;
	if (!e || !t) return null;
	let n = () => Wn.value = null;
	return /* @__PURE__ */ U(Y, {
		title: "Unlock?",
		onClose: n,
		footer: /* @__PURE__ */ U(x, { children: [/* @__PURE__ */ U(K, {
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
			I(t, e),
			"?"
		] })
	});
}
// src/components/steps.tsx
function yr(e, t) {
	return (n) => {
		let r = be(e());
		n(r), t(r);
	};
}
var br = [
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
], xr = (e) => br.find(([t]) => t.test(e))?.[1] ?? "mdi:home";
function Sr(e, t, n, r) {
	let i = Se("room", n, r || xr(n), t);
	return i.cards = Wt(e, t).filter((t) => Jt(e, t)).map((e) => xe(e, Zt(e))), i;
}
function Cr(e, t) {
	if (t.sections.length) return;
	let n = e.floors ?? {}, r = Object.values(e.areas ?? {}).sort((e, t) => (n[e.floor_id ?? ""]?.level ?? 99) - (n[t.floor_id ?? ""]?.level ?? 99) || e.name.localeCompare(t.name));
	for (let n of r) Wt(e, n.area_id).length && t.sections.push(Sr(e, n.area_id, n.name, n.icon));
	let i = Object.keys(e.states).find((e) => F(e) === "weather");
	i && (t.header.weatherEntity = i);
}
function wr({ cfg: e, set: t }) {
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
function Tr({ cfg: e, set: t }) {
	let n = L.value, [r, i] = A(null), [a, o] = A(""), s = e.sections.filter((e) => e.kind === "room"), c = new Set(s.map((e) => e.areaId).filter(Boolean)), l = Object.values(n.areas ?? {}).filter((e) => !c.has(e.area_id)).sort((e, t) => e.name.localeCompare(t.name)), u = (e, n) => t((t) => {
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
			/* @__PURE__ */ U("div", {
				class: "room-list",
				children: s.map((e, a) => /* @__PURE__ */ U("div", {
					class: "room-item",
					children: [/* @__PURE__ */ U("div", {
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
					}), r === e.id && /* @__PURE__ */ U(Dn, {
						value: e.icon,
						onChange: (n) => t((t) => t.sections.find((t) => t.id === e.id).icon = n)
					})]
				}))
			}),
			l.length > 0 && /* @__PURE__ */ U(x, { children: [/* @__PURE__ */ U("div", {
				class: "labeled-label",
				children: "Add an area from Home Assistant"
			}), /* @__PURE__ */ U("div", {
				class: "chips",
				children: l.map((e) => /* @__PURE__ */ U("button", {
					type: "button",
					class: "chip",
					onClick: () => t((t) => t.sections.push(Sr(n, e.area_id, e.name, e.icon))),
					children: [
						/* @__PURE__ */ U(W, {
							icon: "mdi:plus",
							size: 16
						}),
						" ",
						e.name,
						/* @__PURE__ */ U("span", {
							class: "muted small",
							children: Wt(n, e.area_id).length
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
					e.preventDefault(), a.trim() && (t((e) => e.sections.push(Se("room", a.trim(), xr(a)))), o(""));
				},
				children: [/* @__PURE__ */ U(Z, {
					value: a,
					onInput: o,
					placeholder: "e.g. Back yard"
				}), /* @__PURE__ */ U(K, {
					icon: "mdi:plus",
					disabled: !a.trim(),
					onClick: () => {
						t((e) => e.sections.push(Se("room", a.trim(), xr(a)))), o("");
					},
					children: "Add room"
				})]
			})
		]
	});
}
var Er = {
	sm: "Small",
	md: "Medium",
	lg: "Large",
	wide: "Wide"
};
function Dr({ cfg: e, set: t }) {
	let n = L.value, r = e.sections.filter((e) => e.kind === "room"), [i, a] = A(r[0]?.id ?? null), [o, s] = A(null), c = Gt(n).length, l = (e, n) => t((t) => {
		let r = t.sections.find((t) => t.id === e);
		r.cards.some((e) => e.entity === n) ? r.cards = r.cards.filter((e) => e.entity !== n) : r.cards.push(xe(n, Zt(n)));
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
					let r = e.areaId ? Wt(n, e.areaId) : [], o = e.cards.map((e) => e.entity).filter((e) => !r.includes(e)), c = [...r, ...o], u = /* @__PURE__ */ new Map();
					for (let e of c) {
						let t = Qt[F(e)] ?? F(e);
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
												for (let e of c) n.cards.some((t) => t.entity === e) || n.cards.push(xe(e, Zt(e)));
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
											children: [/* @__PURE__ */ U(Fn, {
												id: r,
												room: e.name,
												selected: !!i,
												onToggle: () => l(e.id, r)
											}), i && /* @__PURE__ */ U("select", {
												class: "input size-select",
												"aria-label": `Card size for ${I(n, r)}`,
												value: i.size,
												onChange: (n) => {
													let i = n.target.value;
													t((t) => t.sections.find((t) => t.id === e.id).cards.find((e) => e.entity === r).size = i);
												},
												children: Object.keys(Er).map((e) => /* @__PURE__ */ U("option", {
													value: e,
													children: Er[e]
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
				children: /* @__PURE__ */ U(Pn, {
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
function Or({ cfg: e, set: t }) {
	let n = L.value, r = Object.keys(n.states).filter((e) => F(e) === "media_player").sort();
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
				children: /* @__PURE__ */ U(Pn, {
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
						children: I(n, e)
					}))]
				})
			})
		]
	});
}
function kr({ domain: e, value: t, onChange: n, empty: r }) {
	let i = L.value, a = Object.keys(i.states).filter((t) => F(t) === e).sort();
	return a.length ? /* @__PURE__ */ U("div", {
		class: "check-list",
		children: a.map((e) => /* @__PURE__ */ U("label", {
			class: "check-item",
			children: [/* @__PURE__ */ U(Tn, {
				checked: t.includes(e),
				onChange: (r) => n(r ? [...t, e] : t.filter((t) => t !== e))
			}), /* @__PURE__ */ U("span", { children: I(i, e) })]
		}))
	}) : /* @__PURE__ */ U("p", {
		class: "muted small",
		children: r
	});
}
function Ar({ cfg: e, set: t }) {
	let n = L.value, r = Object.keys(n.states).filter((e) => F(e) === "weather"), i = e.header.weatherEntity ?? (e.header.weatherFallback ? "__open_meteo" : "");
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
							children: I(n, e)
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
			/* @__PURE__ */ U(kr, {
				domain: "calendar",
				value: e.header.calendars,
				onChange: (e) => t((t) => t.header.calendars = e),
				empty: "No calendars in Home Assistant. Add one (Google, CalDAV, Local calendar…) to show events here."
			}),
			/* @__PURE__ */ U("div", {
				class: "labeled-label",
				children: "Reminders (to-do lists)"
			}),
			/* @__PURE__ */ U(kr, {
				domain: "todo",
				value: e.header.todoLists,
				onChange: (e) => t((t) => t.header.todoLists = e),
				empty: "No to-do lists in Home Assistant. Add the Local to-do or Shopping list integration to use reminders."
			})
		]
	});
}
var jr = [
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
function Mr({ id: e }) {
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
			e === "grid" && /* @__PURE__ */ U(x, { children: [
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
			e === "sidebar" && /* @__PURE__ */ U(x, { children: [
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
			e === "focus" && /* @__PURE__ */ U(x, { children: [
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
function Nr({ cfg: e, set: t }) {
	return /* @__PURE__ */ U("div", {
		class: "step",
		children: [
			/* @__PURE__ */ U("p", {
				class: "lead",
				children: "How should your rooms be arranged? Every screen follows the layout you pick."
			}),
			/* @__PURE__ */ U("div", {
				class: "choice-grid",
				children: jr.map((n) => /* @__PURE__ */ U("button", {
					type: "button",
					class: `choice ${e.layout === n.id ? "selected" : ""}`,
					"aria-pressed": e.layout === n.id,
					onClick: () => t((e) => e.layout = n.id),
					children: [
						/* @__PURE__ */ U(Mr, { id: n.id }),
						/* @__PURE__ */ U("strong", { children: n.name }),
						/* @__PURE__ */ U("span", {
							class: "muted small",
							children: n.desc
						})
					]
				}))
			}),
			/* @__PURE__ */ U(X, {
				label: "Card spacing",
				children: /* @__PURE__ */ U(wn, {
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
function Pr({ cfg: e, set: t }) {
	let n = e.theme;
	return /* @__PURE__ */ U("div", {
		class: "step",
		children: [
			/* @__PURE__ */ U("p", {
				class: "lead",
				children: "Make it yours. The preview updates as you choose."
			}),
			/* @__PURE__ */ U(X, {
				label: "Appearance",
				children: /* @__PURE__ */ U(wn, {
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
					children: [_e.map((e) => /* @__PURE__ */ U("button", {
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
				label: "Background",
				children: /* @__PURE__ */ U("div", {
					class: "bg-grid",
					children: [ge.map((e) => /* @__PURE__ */ U("button", {
						type: "button",
						class: `bg-choice ${n.background === e.id ? "selected" : ""}`,
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
					})), /* @__PURE__ */ U("button", {
						type: "button",
						class: `bg-choice ${n.background === "image" ? "selected" : ""}`,
						onClick: () => t((e) => e.theme.background = "image"),
						children: [/* @__PURE__ */ U("span", {
							class: "bg-swatch image",
							children: /* @__PURE__ */ U(W, {
								icon: "mdi:image",
								size: 18
							})
						}), /* @__PURE__ */ U("span", {
							class: "small",
							children: "Your image"
						})]
					})]
				})
			}),
			n.background === "image" && /* @__PURE__ */ U(X, {
				label: "Image URL",
				hint: "For example /local/wallpaper.jpg (a file in your config/www folder) or any https:// address.",
				children: /* @__PURE__ */ U(Z, {
					value: n.backgroundImage ?? "",
					onInput: (e) => t((t) => t.theme.backgroundImage = e),
					placeholder: "/local/wallpaper.jpg"
				})
			}),
			/* @__PURE__ */ U(X, {
				label: "Card style",
				children: /* @__PURE__ */ U(wn, {
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
function Fr({ cfg: e, set: t }) {
	let [n, r] = A(""), i = e.sections.filter((e) => e.kind === "page"), a = () => {
		n.trim() && (t((e) => e.sections.push(Se("page", n.trim(), xr(n) === "mdi:home" ? "mdi:view-dashboard" : xr(n)))), r(""));
	};
	return /* @__PURE__ */ U("div", {
		class: "step",
		children: [
			/* @__PURE__ */ U("p", {
				class: "lead",
				children: "Besides rooms, DashForge can show pages that gather devices from all over your home."
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
function Ir({ cfg: e, set: t }) {
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
			n.screensaver && /* @__PURE__ */ U(x, { children: [/* @__PURE__ */ U(X, {
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
				children: /* @__PURE__ */ U(wn, {
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
				children: /* @__PURE__ */ U(wn, {
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
				hint: "Full-screen dashboard. Add ?menu to the address to show it again on one device.",
				children: /* @__PURE__ */ U(q, {
					checked: n.hideSidebar,
					onChange: (e) => t((t) => t.tablet.hideSidebar = e)
				})
			})
		]
	});
}
function Lr({ cfg: e }) {
	let t = e.sections.filter((e) => e.kind === "room"), n = e.sections.filter((e) => e.kind === "page"), r = e.sections.reduce((e, t) => e + t.cards.length, 0), i = [
		["Rooms", t.map((e) => e.name).join(", ") || "None"],
		["Devices", `${r} cards`],
		["Layout", jr.find((t) => t.id === e.layout).name],
		["Pages", [
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
			children: i.map(([e, t]) => /* @__PURE__ */ U(x, { children: [/* @__PURE__ */ U("dt", { children: e }), /* @__PURE__ */ U("dd", { children: t })] }))
		})]
	});
}
// src/components/wizard.tsx
var $ = P(null), Rr = [
	{
		id: "welcome",
		title: "Welcome",
		icon: "mdi:hand-wave",
		C: wr
	},
	{
		id: "rooms",
		title: "Rooms",
		icon: "mdi:floor-plan",
		C: Tr
	},
	{
		id: "devices",
		title: "Devices",
		icon: "mdi:devices",
		C: Dr
	},
	{
		id: "scenes",
		title: "Scenes & media",
		icon: "mdi:palette",
		C: Or
	},
	{
		id: "widgets",
		title: "Header & widgets",
		icon: "mdi:weather-partly-cloudy",
		C: Ar
	},
	{
		id: "layout",
		title: "Layout",
		icon: "mdi:view-quilt",
		C: Nr
	},
	{
		id: "theme",
		title: "Look & feel",
		icon: "mdi:brush",
		C: Pr
	},
	{
		id: "pages",
		title: "Pages",
		icon: "mdi:book-open-page-variant",
		C: Fr
	},
	{
		id: "tablet",
		title: "Wall tablet",
		icon: "mdi:tablet",
		C: Ir
	},
	{
		id: "review",
		title: "Review",
		icon: "mdi:check-decagram",
		C: Lr
	}
];
function zr() {
	let e = R.value ? be(R.value) : ve();
	R.value || Cr(L.value, e), $.value = e, on.value = !1, sn.value = !0;
}
function Br() {
	let [e, t] = A(0), [n, r] = A(!1), i = $.value;
	if (!i) return null;
	let a = yr(() => $.value, (e) => $.value = e), o = Rr[e], s = e === Rr.length - 1, c = !R.value?.setupComplete;
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
			}), /* @__PURE__ */ U("ol", { children: Rr.map((n, r) => /* @__PURE__ */ U("li", { children: /* @__PURE__ */ U("button", {
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
					children: /* @__PURE__ */ U("div", { style: `width:${(e + 1) / Rr.length * 100}%` })
				}),
				/* @__PURE__ */ U("div", {
					class: "wizard-head",
					children: [/* @__PURE__ */ U("span", {
						class: "muted small",
						children: [
							"Step ",
							e + 1,
							" of ",
							Rr.length
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
							sn.value = !1, $.value = null;
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
								let e = await mn({
									...i,
									setupComplete: !0
								});
								r(!1), e && (sn.value = !1, $.value = null, B.value = null, V("Your dashboard is ready"));
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
var Vr = Rr.filter((e) => e.id !== "review").map((e) => e.id === "welcome" ? {
	...e,
	title: "General",
	icon: "mdi:cog"
} : e);
function Hr() {
	$.value = be(R.value), on.value = !0;
}
function Ur() {
	let [e, t] = A("welcome"), [n, r] = A(!1), i = $.value;
	if (!i) return null;
	let a = yr(() => $.value, (e) => $.value = e), o = () => {
		on.value = !1, $.value = null;
	}, s = async () => {
		r(!0);
		let e = await mn(i);
		r(!1), e && (o(), V("Settings saved"));
	}, c = Vr.find((t) => t.id === e);
	return /* @__PURE__ */ U(Y, {
		title: "Settings",
		onClose: o,
		wide: !0,
		footer: /* @__PURE__ */ U(x, { children: [/* @__PURE__ */ U(K, {
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
				children: [Vr.map((n) => /* @__PURE__ */ U("button", {
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
				}) : /* @__PURE__ */ U(Wr, {
					cfg: i,
					onReplace: (e) => $.value = e
				})
			})]
		})
	});
}
function Wr({ cfg: e, onReplace: t }) {
	let [n, r] = A(""), [i, a] = A(!1), o = () => {
		let t = new Blob([JSON.stringify(e, null, 2)], { type: "application/json" }), n = document.createElement("a");
		n.href = URL.createObjectURL(t), n.download = `dashforge-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`, n.click(), setTimeout(() => URL.revokeObjectURL(n.href), 1e3);
	}, s = (e) => {
		try {
			let n = JSON.parse(e);
			if (!n || !Array.isArray(n.sections)) throw Error("bad");
			t({
				...ye(n),
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
					onClick: zr,
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
				footer: /* @__PURE__ */ U(x, { children: [/* @__PURE__ */ U(K, {
					kind: "ghost",
					onClick: () => a(!1),
					children: "Cancel"
				}), /* @__PURE__ */ U(K, {
					kind: "danger",
					onClick: async () => {
						await mn(null) && (a(!1), on.value = !1, $.value = null);
					},
					children: "Reset"
				})] }),
				children: /* @__PURE__ */ U("p", { children: "This removes every room, page and setting from DashForge and starts the setup wizard. Nothing in Home Assistant itself is changed. Download a backup first if you might want it back." })
			})
		]
	});
}
// src/components/widgets.tsx
var Gr = P(null);
function Kr(e = 1e3) {
	let [t, n] = A(() => /* @__PURE__ */ new Date());
	return j(() => {
		let t = window.setInterval(() => n(/* @__PURE__ */ new Date()), e);
		return () => clearInterval(t);
	}, [e]), t;
}
function qr(e, t, n) {
	return e.toLocaleTimeString(n, {
		hour: "numeric",
		minute: "2-digit",
		hour12: !t
	});
}
function Jr(e, t) {
	let n = e.getHours(), r = n < 5 ? "Good night" : n < 12 ? "Good morning" : n < 18 ? "Good afternoon" : "Good evening";
	return t ? `${r}, ${t}` : r;
}
var Yr = {
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
}, Xr = (e) => Yr[e] ?? "mdi:weather-partly-cloudy", Zr = (e) => e === "partlycloudy" ? "Partly cloudy" : e === "clear-night" ? "Clear" : e.replace(/-/g, " ").replace(/^\w/, (e) => e.toUpperCase());
function Qr(e, t = !0) {
	return e === 0 ? t ? "sunny" : "clear-night" : e <= 2 ? "partlycloudy" : e === 3 ? "cloudy" : e === 45 || e === 48 ? "fog" : e >= 51 && e <= 67 ? e >= 65 ? "pouring" : "rainy" : e >= 71 && e <= 77 ? "snowy" : e >= 80 && e <= 82 ? e === 82 ? "pouring" : "rainy" : e === 85 || e === 86 ? "snowy" : e >= 95 ? "lightning-rainy" : "cloudy";
}
function $r(e, t, n) {
	let [r, i] = A([]);
	return j(() => {
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
function ei(e, t) {
	let [n, r] = A(null), i = e.config.unit_system.temperature === "°F";
	return j(() => {
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
					condition: Qr(e.current.weather_code, !!e.current.is_day),
					temp: e.current.temperature_2m,
					hourly: e.hourly.time.slice(t, t + 24).map((n, r) => ({
						time: n,
						condition: Qr(e.hourly.weather_code[t + r], !!e.hourly.is_day[t + r]),
						temp: e.hourly.temperature_2m[t + r],
						precip: e.hourly.precipitation_probability?.[t + r]
					})),
					daily: e.daily.time.map((t, n) => ({
						time: t,
						condition: Qr(e.daily.weather_code[n]),
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
function ti(e, t) {
	let n = t.header.weatherEntity, r = n ? e.states[n] : void 0, i = $r(e, n, "daily"), a = $r(e, n, "hourly"), o = ei(e, !r && t.header.weatherFallback);
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
function ni({ data: e, lang: t, h24: n }) {
	return /* @__PURE__ */ U(Y, {
		title: "Weather",
		onClose: () => Gr.value = null,
		wide: !0,
		children: [
			/* @__PURE__ */ U("div", {
				class: "weather-now",
				children: [/* @__PURE__ */ U(W, {
					icon: Xr(e.condition),
					size: 56
				}), /* @__PURE__ */ U("div", { children: [/* @__PURE__ */ U("div", {
					class: "weather-temp",
					children: e.temp == null ? "—" : `${Math.round(e.temp)}${e.unit}`
				}), /* @__PURE__ */ U("div", {
					class: "muted",
					children: Zr(e.condition)
				})] })]
			}),
			e.hourly.length > 0 && /* @__PURE__ */ U(x, { children: [/* @__PURE__ */ U("div", {
				class: "labeled-label",
				children: "Next hours"
			}), /* @__PURE__ */ U("div", {
				class: "hourly",
				children: e.hourly.map((e) => /* @__PURE__ */ U("div", {
					class: "hour",
					children: [
						/* @__PURE__ */ U("span", {
							class: "muted",
							children: qr(new Date(e.time), n, t).replace(":00", "")
						}),
						/* @__PURE__ */ U(W, {
							icon: Xr(e.condition),
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
			e.daily.length > 0 && /* @__PURE__ */ U(x, { children: [/* @__PURE__ */ U("div", {
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
							icon: Xr(e.condition),
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
function ri(e) {
	if (e.dateTime) return [new Date(e.dateTime), !1];
	let [t, n, r] = (e.date ?? "").split("-").map(Number);
	return [new Date(t, n - 1, r), !0];
}
function ii(e, t, n, r, i = 0) {
	let [a, o] = A([]);
	return j(() => {
		if (!t.length) {
			o([]);
			return;
		}
		let i = !0, a = `start=${encodeURIComponent(n.toISOString())}&end=${encodeURIComponent(r.toISOString())}`;
		return Promise.all(t.map((t) => e.callApi("GET", `calendars/${t}?${a}`).then((e) => e.map((e) => {
			let [n, r] = ri(e.start), [i] = ri(e.end);
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
function ai(e, t, n) {
	return e.allDay ? "All day" : qr(e.start, n, t);
}
function oi({ cfg: e, lang: t }) {
	let n = L.value, [r, i] = A(() => {
		let e = /* @__PURE__ */ new Date();
		return new Date(e.getFullYear(), e.getMonth(), 1);
	}), [a, o] = A(() => (/* @__PURE__ */ new Date()).toDateString()), s = ze(() => {
		let e = new Date(r);
		return e.setDate(1 - e.getDay()), e;
	}, [r]), c = ze(() => {
		let e = new Date(s);
		return e.setDate(e.getDate() + 42), e;
	}, [s]), l = ii(n, e.header.calendars, s, c), u = /* @__PURE__ */ new Map();
	for (let e of l) {
		let t = new Date(e.start);
		t.setHours(0, 0, 0, 0);
		let n = new Date(e.allDay ? e.end.getTime() - 1 : e.end.getTime());
		do {
			let n = t.toDateString();
			u.set(n, [...u.get(n) ?? [], e]), t.setDate(t.getDate() + 1);
		} while (t <= n);
	}
	let d = Array.from({ length: 42 }, (e, t) => {
		let n = new Date(s);
		return n.setDate(n.getDate() + t), n;
	}), f = (/* @__PURE__ */ new Date()).toDateString(), p = u.get(a) ?? [], m = (e) => i(new Date(r.getFullYear(), r.getMonth() + e, 1));
	return /* @__PURE__ */ U(Y, {
		title: "Calendar",
		onClose: () => Gr.value = null,
		wide: !0,
		children: [
			/* @__PURE__ */ U("div", {
				class: "cal-head",
				children: [
					/* @__PURE__ */ U(G, {
						icon: "mdi:chevron-left",
						label: "Previous month",
						onClick: () => m(-1)
					}),
					/* @__PURE__ */ U("strong", { children: r.toLocaleDateString(t, {
						month: "long",
						year: "numeric"
					}) }),
					/* @__PURE__ */ U(G, {
						icon: "mdi:chevron-right",
						label: "Next month",
						onClick: () => m(1)
					})
				]
			}),
			/* @__PURE__ */ U("div", {
				class: "cal-grid",
				children: [d.slice(0, 7).map((e) => /* @__PURE__ */ U("div", {
					class: "cal-dow",
					children: e.toLocaleDateString(t, { weekday: "narrow" })
				})), d.map((e) => {
					let t = e.toDateString(), n = u.get(t)?.length ?? 0;
					return /* @__PURE__ */ U("button", {
						type: "button",
						class: `cal-day ${e.getMonth() === r.getMonth() ? "" : "other"} ${t === f ? "today" : ""} ${t === a ? "selected" : ""}`,
						onClick: () => o(t),
						children: [/* @__PURE__ */ U("span", { children: e.getDate() }), n > 0 && /* @__PURE__ */ U("span", {
							class: "cal-dots",
							children: "•".repeat(Math.min(n, 3))
						})]
					});
				})]
			}),
			/* @__PURE__ */ U("div", {
				class: "labeled-label",
				children: new Date(a).toLocaleDateString(t, {
					weekday: "long",
					month: "long",
					day: "numeric"
				})
			}),
			p.length === 0 ? /* @__PURE__ */ U("p", {
				class: "muted",
				children: "Nothing planned."
			}) : /* @__PURE__ */ U("ul", {
				class: "agenda",
				children: p.map((r) => /* @__PURE__ */ U("li", { children: [/* @__PURE__ */ U("span", {
					class: "agenda-time",
					children: ai(r, t, e.header.clock24h)
				}), /* @__PURE__ */ U("span", {
					class: "agenda-text",
					children: [/* @__PURE__ */ U("strong", { children: r.summary }), /* @__PURE__ */ U("span", {
						class: "muted small",
						children: [r.location, I(n, r.calendar)].filter(Boolean).join(" · ")
					})]
				})] }))
			})
		]
	});
}
function si(e, t) {
	let [n, r] = A([]);
	return j(() => {
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
function ci(e, t) {
	return t.reduce((t, n) => t + (Number(e.states[n]?.state) || 0), 0);
}
function li({ entityId: e }) {
	let t = L.value, n = si(t, e), [r, i] = A(""), a = n.filter((e) => e.status === "needs_action"), o = n.filter((e) => e.status === "completed").slice(0, 5), s = () => {
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
				children: I(t, e)
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
						/* @__PURE__ */ U(Tn, {
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
						children: [/* @__PURE__ */ U(Tn, {
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
function ui({ cfg: e }) {
	return /* @__PURE__ */ U(Y, {
		title: "Reminders",
		onClose: () => Gr.value = null,
		wide: !0,
		children: e.header.todoLists.map((e) => /* @__PURE__ */ U(li, { entityId: e }))
	});
}
// src/components/layout.tsx
function di(e) {
	let t = e.sections.map((e) => ({
		key: e.id,
		view: {
			type: "section",
			id: e.id
		},
		name: e.name,
		icon: e.icon
	}));
	return rn.value || (e.builtinPages.media && mi(e).length && t.push({
		key: "media",
		view: { type: "media" },
		name: "Media",
		icon: "mdi:music-box-multiple"
	}), e.builtinPages.security && gi(e).length && t.push({
		key: "security",
		view: { type: "security" },
		name: "Security",
		icon: "mdi:shield-home"
	}), e.builtinPages.scenes && _i(e).length && t.push({
		key: "scenes",
		view: { type: "scenes" },
		name: "Scenes",
		icon: "mdi:palette"
	})), t;
}
var fi = (e) => e ? e.type === "section" ? e.id : e.type : "";
function pi(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e.sections) for (let e of n.cards) e.hidden || t.add(e.entity);
	return [...t];
}
function mi(e) {
	let t = pi(e).filter((e) => F(e) === "media_player");
	return e.header.mediaPlayer && !t.includes(e.header.mediaPlayer) && t.unshift(e.header.mediaPlayer), t;
}
var hi = /* @__PURE__ */ new Set([
	"door",
	"garage_door",
	"window",
	"opening",
	"motion",
	"occupancy",
	"smoke",
	"moisture"
]);
function gi(e) {
	let t = L.value;
	return pi(e).filter((e) => {
		let n = F(e);
		return n === "lock" || n === "alarm_control_panel" || n === "camera" || n === "binary_sensor" && hi.has(t.states[e]?.attributes.device_class);
	});
}
function _i(e) {
	let t = L.value, n = /* @__PURE__ */ new Set([...e.header.sceneStrip, ...pi(e).filter((e) => ["scene", "script"].includes(F(e)))]);
	for (let e of Object.keys(t.states)) F(e) === "scene" && Ut(t, e) && n.add(e);
	return [...n].filter((e) => t.states[e]);
}
function vi({ cfg: e }) {
	let t = L.value, n = t.locale?.language ?? t.language, r = Kr(e.header.clock ? 1e3 : 6e4), i = ti(t, e), a = new Date(r.getFullYear(), r.getMonth(), r.getDate()), o = new Date(a.getTime() + 1728e5), s = ii(t, e.header.calendars, a, o, Math.floor(r.getTime() / 6e5)).find((e) => e.end > r), c = ci(t, e.header.todoLists), l = $t.value && !e.tablet.hideSidebar, u = e.header.mediaPlayer ? t.states[e.header.mediaPlayer] : void 0;
	return /* @__PURE__ */ U("header", {
		class: "header",
		children: [/* @__PURE__ */ U("div", {
			class: "header-left",
			children: [l && /* @__PURE__ */ U(G, {
				icon: "mdi:menu",
				label: "Home Assistant menu",
				onClick: () => bn?.dispatchEvent(new Event("hass-toggle-menu", {
					bubbles: !0,
					composed: !0
				}))
			}), /* @__PURE__ */ U("div", { children: [/* @__PURE__ */ U("h1", {
				class: "title",
				children: e.header.greeting ? Jr(r, e.userName) : e.title
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
				children: qr(r, e.header.clock24h, n)
			}), /* @__PURE__ */ U("div", {
				class: "header-chips",
				children: [
					i && /* @__PURE__ */ U("button", {
						type: "button",
						class: "chip-btn",
						onClick: () => Gr.value = "weather",
						children: [/* @__PURE__ */ U(W, {
							icon: Xr(i.condition),
							size: 22
						}), i.temp != null && /* @__PURE__ */ U("span", { children: [Math.round(i.temp), "°"] })]
					}),
					e.header.calendars.length > 0 && /* @__PURE__ */ U("button", {
						type: "button",
						class: "chip-btn event-chip",
						onClick: () => Gr.value = "calendar",
						children: [/* @__PURE__ */ U(W, {
							icon: "mdi:calendar",
							size: 20
						}), /* @__PURE__ */ U("span", {
							class: "ellipsis",
							children: s ? `${s.start.toDateString() === r.toDateString() || s.start < r ? "" : "Tomorrow · "}${ai(s, n, e.header.clock24h)} ${s.summary}` : "No events"
						})]
					}),
					e.header.todoLists.length > 0 && /* @__PURE__ */ U("button", {
						type: "button",
						class: "chip-btn",
						onClick: () => Gr.value = "todo",
						"aria-label": `${c} reminders`,
						children: [/* @__PURE__ */ U(W, {
							icon: "mdi:format-list-checks",
							size: 20
						}), c > 0 && /* @__PURE__ */ U("span", {
							class: "count",
							children: c
						})]
					}),
					u && u.state === "playing" && /* @__PURE__ */ U("button", {
						type: "button",
						class: "chip-btn player-chip",
						onClick: () => H("media_player", "media_play_pause", { entity_id: u.entity_id }),
						title: "Pause",
						children: [/* @__PURE__ */ U(W, {
							icon: "mdi:pause",
							size: 20
						}), /* @__PURE__ */ U("span", {
							class: "ellipsis",
							children: u.attributes.media_title ?? I(t, u.entity_id)
						})]
					}),
					en.value?.can_edit && !rn.value && /* @__PURE__ */ U(x, { children: [/* @__PURE__ */ U(G, {
						icon: "mdi:pencil",
						label: "Edit dashboard",
						onClick: hn
					}), /* @__PURE__ */ U(G, {
						icon: "mdi:cog",
						label: "Settings",
						onClick: Hr
					})] })
				]
			})]
		})]
	});
}
function yi({ cfg: e }) {
	let t = L.value, n = e.header.sceneStrip.filter((e) => t.states[e]);
	return n.length ? /* @__PURE__ */ U("div", {
		class: "scene-strip",
		children: n.map((e) => /* @__PURE__ */ U("button", {
			type: "button",
			class: "scene-chip",
			onClick: () => H(F(e), "turn_on", { entity_id: e }),
			children: [/* @__PURE__ */ U(W, {
				icon: Rt(t, e),
				size: 18
			}), I(t, e)]
		}))
	}) : null;
}
function bi(e) {
	let t = L.value, n = e.cards.filter((e) => !e.hidden && [
		"light",
		"switch",
		"fan"
	].includes(F(e.entity)) && Nt(t.states[e.entity])).length, r = e.cards.find((e) => t.states[e.entity]?.attributes.device_class === "temperature" && F(e.entity) === "sensor"), i = [];
	return r && i.push(Vt(t, t.states[r.entity])), n && i.push(`${n} on`), i.join(" · ");
}
function xi({ cfg: e, vertical: t }) {
	let n = di(e), r = fi(B.value);
	return /* @__PURE__ */ U("nav", {
		class: t ? "nav-vertical" : "nav-pills",
		"aria-label": "Rooms and pages",
		children: n.map((n) => {
			let i = e.sections.find((e) => e.id === n.key), a = i && t ? bi(i) : "";
			return /* @__PURE__ */ U("button", {
				type: "button",
				class: `nav-item ${r === n.key ? "selected" : ""}`,
				"aria-current": r === n.key ? "page" : void 0,
				onClick: () => B.value = n.view,
				children: [/* @__PURE__ */ U(W, {
					icon: n.icon,
					size: t ? 22 : 18
				}), /* @__PURE__ */ U("span", {
					class: "nav-text",
					children: [/* @__PURE__ */ U("span", { children: n.name }), a && /* @__PURE__ */ U("span", {
						class: "nav-status",
						children: a
					})]
				})]
			});
		})
	});
}
var Si = [
	"sm",
	"md",
	"lg",
	"wide"
];
function Ci({ section: e, cards: t, room: n, list: r }) {
	let i = rn.value && !!e, [a, o] = A(null), s = Re(null), c = i ? t.filter((e) => !e.hidden) : t.filter((e) => !e.hidden && L.value.states[e.entity]), l = (t) => gn((n) => {
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
				children: /* @__PURE__ */ U(qn, {
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
						n && (n.size = Si[(Si.indexOf(n.size) + 1) % Si.length]);
					}),
					onEdit: () => An.value = {
						sectionId: e.id,
						cardId: t.id
					}
				})
			}, t.id)),
			i && /* @__PURE__ */ U("button", {
				type: "button",
				class: "cell size-sm add-tile",
				onClick: () => kn.value = e.id,
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
				}), /* @__PURE__ */ U("p", { children: ["Nothing here yet.", en.value?.can_edit ? " Tap the pencil to add devices." : ""] })]
			})
		]
	});
}
var wi = (e, t = "sm") => e.map((e) => ({
	id: e,
	entity: e,
	size: t
}));
function Ti({ cfg: e, v: t, list: n }) {
	if (t.type === "section") {
		let r = e.sections.find((e) => e.id === t.id);
		return r ? /* @__PURE__ */ U(Ci, {
			section: r,
			cards: r.cards,
			room: r.kind === "room" ? r.name : void 0,
			list: n
		}) : null;
	}
	if (t.type === "media") return /* @__PURE__ */ U(Ci, {
		cards: wi(mi(e), n ? "sm" : "wide"),
		list: n
	});
	if (t.type === "security") {
		let t = gi(e), r = (e) => [
			"alarm_control_panel",
			"lock",
			"binary_sensor",
			"camera"
		].indexOf(F(e));
		return t.sort((e, t) => r(e) - r(t)), /* @__PURE__ */ U(Ci, {
			cards: t.map((e) => ({
				id: e,
				entity: e,
				size: F(e) === "camera" && !n ? "wide" : "sm"
			})),
			list: n
		});
	}
	return /* @__PURE__ */ U(Ci, {
		cards: wi(_i(e)),
		list: n
	});
}
function Ei(e, t) {
	return t.type === "section" ? e.sections.find((e) => e.id === t.id)?.name ?? "" : t.type === "media" ? "Media" : t.type === "security" ? "Security" : "Scenes";
}
function Di({ cfg: e }) {
	let t = di(e), n = B.value && t.some((e) => e.key === fi(B.value)) ? B.value : t[0]?.view;
	if (!n) return /* @__PURE__ */ U("div", {
		class: "empty big-empty",
		children: [
			/* @__PURE__ */ U(W, {
				icon: "mdi:home-plus-outline",
				size: 48
			}),
			/* @__PURE__ */ U("p", { children: "No rooms or pages yet." }),
			en.value?.can_edit && /* @__PURE__ */ U("p", {
				class: "muted",
				children: "Open edit mode and add a room to get started."
			})
		]
	});
	let r = e.layout;
	if (r === "list") return /* @__PURE__ */ U("div", {
		class: "layout-list",
		children: t.map((t) => /* @__PURE__ */ U("section", {
			class: "list-section",
			children: [/* @__PURE__ */ U("h2", {
				class: "section-title",
				children: [
					/* @__PURE__ */ U(W, {
						icon: t.icon,
						size: 20
					}),
					" ",
					t.name
				]
			}), /* @__PURE__ */ U(Ti, {
				cfg: e,
				v: t.view,
				list: !0
			})]
		}, t.key))
	});
	if (r === "sidebar" && !$t.value) return /* @__PURE__ */ U("div", {
		class: "layout-sidebar",
		children: [/* @__PURE__ */ U(xi, {
			cfg: e,
			vertical: !0
		}), /* @__PURE__ */ U("main", {
			class: "content",
			children: [/* @__PURE__ */ U("h2", {
				class: "section-title",
				children: Ei(e, n)
			}), /* @__PURE__ */ U(Ti, {
				cfg: e,
				v: n
			})]
		})]
	});
	if (r === "focus") {
		let r = t.findIndex((e) => e.key === fi(n));
		return /* @__PURE__ */ U(Oi, {
			cfg: e,
			v: n,
			idx: r,
			count: t.length,
			go: (e) => B.value = t[(r + e + t.length) % t.length].view,
			items: t
		});
	}
	return /* @__PURE__ */ U("div", {
		class: "layout-grid",
		children: [/* @__PURE__ */ U(xi, { cfg: e }), /* @__PURE__ */ U("main", {
			class: "content",
			children: /* @__PURE__ */ U(Ti, {
				cfg: e,
				v: n
			})
		})]
	});
}
function Oi(e) {
	let t = Re(null);
	return /* @__PURE__ */ U("div", {
		class: "layout-focus",
		onTouchStart: (e) => t.current = e.touches[0].clientX,
		onTouchEnd: (n) => {
			if (t.current === null || rn.value) return;
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
						children: Ei(e.cfg, e.v)
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
				children: /* @__PURE__ */ U(Ti, {
					cfg: e.cfg,
					v: e.v
				})
			})
		]
	});
}
// src/components/tablet.tsx
function ki(e, t, n) {
	let r = Re(e);
	r.current = e, j(() => {
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
function Ai({ cfg: e }) {
	let [t, n] = A(!1);
	return ki(() => n(!0), e.tablet.screensaverMinutes, e.tablet.screensaver && !t), ki(() => B.value = null, e.tablet.returnHomeMinutes, e.tablet.returnHomeMinutes > 0), Mi(e.tablet.hideSidebar), t ? /* @__PURE__ */ U(ji, {
		cfg: e,
		onWake: () => n(!1)
	}) : null;
}
function ji({ cfg: e, onWake: t }) {
	let n = L.value, r = n.locale?.language ?? n.language, i = Kr(1e3), a = ti(n, e), o = new Date(i.getFullYear(), i.getMonth(), i.getDate()), s = ii(n, e.header.calendars, o, new Date(o.getTime() + 864e5), Math.floor(i.getTime() / 6e5)).find((e) => e.end > i), c = e.tablet.screensaverStyle, l = [
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
					children: qr(i, e.header.clock24h, r)
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
						icon: Xr(a.condition),
						size: 32
					}), a.temp != null && `${Math.round(a.temp)}°`] }), s && /* @__PURE__ */ U("span", { children: [
						/* @__PURE__ */ U(W, {
							icon: "mdi:calendar",
							size: 28
						}),
						" ",
						ai(s, r, e.header.clock24h),
						" ",
						s.summary
					] })]
				})
			]
		})
	});
}
function Mi(e) {
	j(() => {
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
function Ni(e, t) {
	let n = e.theme, r;
	if (n.background === "image" && n.backgroundImage) r = `center / cover no-repeat url("${n.backgroundImage.replace(/["\\]/g, "")}")`;
	else {
		let e = ge.find((e) => e.id === n.background) ?? ge[0];
		r = t ? e.dark : e.light;
	}
	return `--accent:${n.accent};--radius:${n.radius}px;--page-bg:${r};`;
}
function Pi({ cfg: e, children: t }) {
	let n = L.value, r = e.theme.mode === "dark" || e.theme.mode === "auto" && !!n.themes?.darkMode;
	return /* @__PURE__ */ U("div", {
		class: `df-root ${r ? "dark" : "light"} cards-${e.theme.cardStyle} density-${e.theme.density} ${rn.value ? "editing" : ""}`,
		style: Ni(e, r),
		children: [t, cn.value && /* @__PURE__ */ U("div", {
			class: `toast ${cn.value.kind}`,
			role: "status",
			children: cn.value.text
		})]
	});
}
function Fi({ children: e }) {
	return /* @__PURE__ */ U("div", {
		class: "centered",
		children: e
	});
}
function Ii({ cfg: e, h: t }) {
	let n = ti(t, e), r = t.locale?.language ?? t.language;
	return /* @__PURE__ */ U(x, { children: [
		Gr.value === "weather" && n && /* @__PURE__ */ U(ni, {
			data: n,
			lang: r,
			h24: e.header.clock24h
		}),
		Gr.value === "calendar" && /* @__PURE__ */ U(oi, {
			cfg: e,
			lang: r
		}),
		Gr.value === "todo" && /* @__PURE__ */ U(ui, { cfg: e })
	] });
}
function Li() {
	let e = L.value;
	if (!e) return null;
	let t = $.value ?? R.value;
	if (nn.value) return /* @__PURE__ */ U("div", {
		class: "df-root light",
		children: /* @__PURE__ */ U(Fi, { children: [
			/* @__PURE__ */ U(W, {
				icon: "mdi:alert-circle-outline",
				size: 48
			}),
			/* @__PURE__ */ U("h2", { children: "DashForge couldn't load" }),
			/* @__PURE__ */ U("p", {
				class: "muted",
				children: nn.value
			}),
			/* @__PURE__ */ U(K, {
				kind: "primary",
				onClick: fn,
				children: "Try again"
			})
		] })
	});
	if (!en.value) return /* @__PURE__ */ U("div", {
		class: "df-root light",
		children: /* @__PURE__ */ U(Fi, { children: /* @__PURE__ */ U("div", {
			class: "spinner",
			"aria-label": "Loading"
		}) })
	});
	if (sn.value && $.value) return /* @__PURE__ */ U(Pi, {
		cfg: $.value,
		children: /* @__PURE__ */ U(Br, {})
	});
	let n = an.value;
	if (!n || !n.setupComplete) return /* @__PURE__ */ U(Pi, {
		cfg: t ?? {
			theme: {
				mode: "auto",
				accent: "#3b82f6",
				background: "aurora",
				cardStyle: "glass",
				radius: 20,
				density: "comfortable"
			},
			layout: "grid"
		},
		children: /* @__PURE__ */ U(Fi, { children: /* @__PURE__ */ U("div", {
			class: "welcome-card",
			children: [
				/* @__PURE__ */ U(W, {
					icon: "mdi:anvil",
					size: 56
				}),
				/* @__PURE__ */ U("h1", { children: "Welcome to DashForge" }),
				en.value.can_edit ? /* @__PURE__ */ U(x, { children: [/* @__PURE__ */ U("p", { children: "Let's build a dashboard that fits your home. The setup asks you about your rooms, devices, layout and look, one step at a time. It takes about five minutes, and you can change everything afterwards." }), /* @__PURE__ */ U(K, {
					kind: "primary",
					icon: "mdi:arrow-right",
					onClick: zr,
					children: "Start setup"
				})] }) : /* @__PURE__ */ U("p", { children: "This dashboard hasn't been set up yet. Ask an administrator of this Home Assistant to open DashForge and finish the setup." })
			]
		}) })
	});
	let r = on.value && $.value ? $.value : n;
	return /* @__PURE__ */ U(Pi, {
		cfg: r,
		children: [
			/* @__PURE__ */ U("div", {
				class: "dashboard",
				children: [
					/* @__PURE__ */ U(vi, { cfg: r }),
					/* @__PURE__ */ U(yi, { cfg: r }),
					/* @__PURE__ */ U(Di, { cfg: r })
				]
			}),
			/* @__PURE__ */ U(In, {}),
			/* @__PURE__ */ U(dr, {}),
			/* @__PURE__ */ U(vr, {}),
			/* @__PURE__ */ U(Ln, {}),
			/* @__PURE__ */ U(zn, {}),
			/* @__PURE__ */ U(Vn, {}),
			/* @__PURE__ */ U(Bn, {}),
			/* @__PURE__ */ U(Ii, {
				cfg: r,
				h: e
			}),
			on.value && /* @__PURE__ */ U(Ur, {}),
			!rn.value && /* @__PURE__ */ U(Ai, { cfg: r })
		]
	});
}
// src/styles.css?inline
var Ri = ":host{height:100%;display:block}.df-mount,.df-root{height:100%}.df-root{--accent:#3b82f6;--radius:20px;--gap:14px;--tile-h:112px;--tile-min:150px;--text:#0f172a;--muted:#64748b;--card:#ffffffb8;--card-solid:#fff;--card-border:#0f172a0f;--card-shadow:0 1px 2px #0f172a0f, 0 8px 24px #0f172a0f;--chip:#fff9;--surface:#fff;--surface-2:#f1f5f9;--line:#0f172a1a;--icon-bg:#0f172a0f;--tile-active:var(--accent);--danger:#ef4444;--page-bg:#f4f4f5;box-sizing:border-box;min-height:100vh;color:var(--text);background:var(--page-bg);-webkit-font-smoothing:antialiased;-webkit-tap-highlight-color:transparent;background-attachment:fixed;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,sans-serif;font-size:15px;line-height:1.4;position:relative;overflow-y:auto}.df-root.dark{--text:#f1f5f9;--muted:#94a3b8;--card:#1e293b8c;--card-solid:#1e293b;--card-border:#ffffff12;--card-shadow:0 1px 2px #0000004d, 0 8px 24px #00000040;--chip:#1e293b99;--surface:#172033;--surface-2:#0f172a;--line:#ffffff1a;--icon-bg:#ffffff14}.df-root.density-compact{--gap:8px;--tile-h:92px;--tile-min:130px}*,:before,:after{box-sizing:border-box}button{font:inherit;color:inherit;cursor:pointer}button:focus-visible,[tabindex]:focus-visible,.input:focus-visible{outline:2px solid var(--accent);outline-offset:2px}h1,h2,h3{letter-spacing:-.01em;margin:0;font-weight:650}p{margin:0 0 12px}.muted{color:var(--muted)}.small{font-size:.85em}.nowrap{white-space:nowrap}.ellipsis{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}ha-icon{flex:none;display:inline-flex}.btn{border:1px solid var(--line);background:var(--surface);white-space:nowrap;border-radius:999px;align-items:center;gap:6px;min-height:40px;padding:8px 16px;font-weight:550;transition:background .15s,transform .1s;display:inline-flex}.btn:active{transform:scale(.97)}.btn:disabled{opacity:.45;cursor:default}.btn-primary{background:var(--accent);color:#fff;border-color:#0000}.btn-ghost{background:0 0;border-color:#0000}.btn-ghost:hover{background:var(--icon-bg)}.btn-danger{border-color:color-mix(in srgb, var(--danger) 40%, transparent);color:var(--danger);background:0 0}.btn-row{flex-wrap:wrap;align-items:center;gap:8px;display:flex}.icon-btn{background:0 0;border:none;border-radius:50%;justify-content:center;align-items:center;width:44px;height:44px;transition:background .15s;display:inline-flex}.icon-btn:hover{background:var(--icon-bg)}.icon-btn.active,.icon-btn.play{background:var(--accent);color:#fff}.icon-btn:disabled{opacity:.3;cursor:default}.btn-group{align-items:center;gap:4px;display:flex}.toggle{background:var(--line);border:none;border-radius:999px;flex:none;width:52px;height:30px;transition:background .2s;position:relative}.toggle .knob{background:#fff;border-radius:50%;width:24px;height:24px;transition:transform .2s;position:absolute;top:3px;left:3px;box-shadow:0 1px 3px #0000004d}.toggle.on{background:var(--accent)}.toggle.on .knob{transform:translate(22px)}.checkbox{border:2px solid var(--line);color:#fff;background:0 0;border-radius:7px;flex:none;justify-content:center;align-items:center;width:24px;height:24px;display:inline-flex}.checkbox.on{border-color:var(--accent);background:var(--accent)}.slider{--slider-color:var(--accent);background:var(--icon-bg);touch-action:none;cursor:pointer;-webkit-user-select:none;user-select:none;border-radius:12px;height:40px;position:relative;overflow:hidden}.slider-fill{background:var(--slider-color);opacity:.85;height:100%;transition:width .15s,height .15s;position:absolute;bottom:0;left:0}.slider.dragging .slider-fill{transition:none}.slider.vertical .slider-fill{width:100%}.slider-label{pointer-events:none;mix-blend-mode:normal;text-shadow:0 0 6px var(--card-solid);justify-content:center;align-items:center;font-size:.85em;font-weight:600;display:flex;position:absolute;inset:0}.slider.vertical{width:44px;height:100%;min-height:80px}.ct-slider{background:linear-gradient(90deg,#ffb46b,#fff4e5,#cfe3ff)}.ct-slider .slider-fill{border-right:3px solid var(--text);background:0 0}.segmented{background:var(--icon-bg);border-radius:14px;flex-wrap:wrap;gap:4px;padding:4px;display:inline-flex}.segmented button{background:0 0;border:none;border-radius:10px;align-items:center;gap:6px;min-height:36px;padding:6px 14px;font-weight:550;display:inline-flex}.segmented button.selected{background:var(--surface);box-shadow:0 1px 3px #0000001f}.input{border:1px solid var(--line);background:var(--surface);width:100%;min-height:42px;color:var(--text);font:inherit;border-radius:12px;padding:8px 12px}.input.bare{background:0 0;border:none;padding:8px 4px}.field{flex-direction:column;gap:6px;margin-bottom:16px;display:flex}.field-label,.labeled-label{letter-spacing:.04em;text-transform:uppercase;color:var(--muted);font-size:.8em;font-weight:650}.labeled-label{margin:18px 0 8px}.field-hint{color:var(--muted);font-size:.85em}.row{border-bottom:1px solid var(--line);align-items:center;gap:12px;padding:12px 0;display:flex}.row-text{flex:1;min-width:0}.row-label{font-weight:550}.row-hint{color:var(--muted);font-size:.85em}.chips{flex-wrap:wrap;gap:8px;display:flex}.chips.scroll{scrollbar-width:none;flex-wrap:nowrap;padding-bottom:4px;overflow-x:auto}.chip{border:1px solid var(--line);background:var(--surface);white-space:nowrap;border-radius:999px;align-items:center;gap:6px;min-height:36px;padding:6px 14px;display:inline-flex}.chip.selected{border-color:var(--accent);background:color-mix(in srgb, var(--accent) 15%, var(--surface));color:var(--accent);font-weight:600}.swatches{flex-wrap:wrap;gap:10px;display:flex}.swatch{border:2px solid var(--line);border-radius:50%;width:38px;height:38px;padding:0}.swatch.selected{outline:3px solid var(--text);outline-offset:2px}.color-input{background:conic-gradient(red,#ff0,#0f0,#0ff,#00f,#f0f,red);overflow:hidden}.color-input::-webkit-color-swatch-wrapper{opacity:0;padding:0}.icon-picker{flex-direction:column;gap:8px;margin-top:6px;display:flex}.icon-grid{grid-template-columns:repeat(auto-fill,minmax(42px,1fr));gap:6px;display:grid}.icon-choice{border:1px solid var(--line);background:var(--surface);border-radius:12px;justify-content:center;align-items:center;width:42px;height:42px;display:inline-flex}.icon-choice.selected{border-color:var(--accent);color:var(--accent)}.dashboard{max-width:1600px;margin:0 auto;padding:20px 24px 120px}.header{flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px 24px;margin-bottom:16px;display:flex}.header-left{align-items:center;gap:8px;min-width:0;display:flex}.title{font-size:1.75rem}.subtitle{color:var(--muted)}.header-right{flex-wrap:wrap;align-items:center;gap:12px;display:flex}.clock{white-space:nowrap;font-variant-numeric:tabular-nums;letter-spacing:-.02em;flex:none;font-size:2rem;font-weight:300}.header-chips{flex-wrap:wrap;align-items:center;gap:8px;display:flex}.chip-btn{border:1px solid var(--card-border);background:var(--chip);-webkit-backdrop-filter:blur(14px);border-radius:999px;align-items:center;gap:6px;max-width:260px;min-height:44px;padding:8px 14px;font-weight:550;display:inline-flex}.chip-btn .count{background:var(--accent);color:#fff;text-align:center;border-radius:999px;min-width:22px;padding:0 6px;font-size:.8em}.header-chips .icon-btn{background:var(--chip);-webkit-backdrop-filter:blur(14px);border:1px solid var(--card-border)}.scene-strip{scrollbar-width:none;gap:8px;margin-bottom:16px;display:flex;overflow-x:auto}.scene-chip{border:1px solid var(--card-border);background:var(--card);-webkit-backdrop-filter:blur(14px);border-radius:999px;flex:none;align-items:center;gap:8px;min-height:40px;padding:8px 16px;font-weight:550;transition:transform .1s;display:inline-flex}.scene-chip:active{transform:scale(.96)}.nav-pills{scrollbar-width:none;gap:8px;margin-bottom:18px;display:flex;overflow-x:auto}.nav-pills .nav-item{border:1px solid var(--card-border);background:var(--chip);-webkit-backdrop-filter:blur(14px);border-radius:999px;flex:none;align-items:center;gap:8px;min-height:42px;padding:8px 16px;font-weight:550;display:inline-flex}.nav-item.selected{color:#fff;background:var(--accent)!important;border-color:#0000!important}.nav-text{text-align:left;flex-direction:column;align-items:flex-start;display:flex}.nav-status{opacity:.75;font-size:.8em;font-weight:450}.layout-sidebar{grid-template-columns:240px 1fr;align-items:start;gap:24px;display:grid}.nav-vertical{border:1px solid var(--card-border);border-radius:var(--radius);background:var(--card);-webkit-backdrop-filter:blur(18px);flex-direction:column;gap:4px;padding:8px;display:flex;position:sticky;top:16px}.nav-vertical .nav-item{border-radius:calc(var(--radius) * .6);background:0 0;border:1px solid #0000;align-items:center;gap:12px;min-height:52px;padding:8px 12px;font-weight:550;display:flex}.nav-vertical .nav-item:hover{background:var(--icon-bg)}.section-title{align-items:center;gap:8px;margin:4px 0 14px;font-size:1.25rem;display:flex}.list-section{margin-bottom:28px}.layout-focus .focus-head{justify-content:center;align-items:center;gap:16px;display:flex}.focus-title{text-align:center;min-width:200px;font-size:2rem}.focus-dots{justify-content:center;gap:8px;margin:10px 0 22px;display:flex}.dot{background:var(--line);border:none;border-radius:50%;width:10px;height:10px;padding:0}.dot.on{background:var(--accent);border-radius:999px;width:26px}.layout-focus{--tile-h:140px;--tile-min:190px}.grid{grid-template-columns:repeat(auto-fill, minmax(var(--tile-min), 1fr));grid-auto-rows:var(--tile-h);grid-auto-flow:dense;gap:var(--gap);display:grid;container-type:inline-size}.cell{touch-action:manipulation;min-width:0}.cell.size-md{grid-column:span 2}.cell.size-lg{grid-area:span 2/span 2}.cell.size-wide{grid-area:span 2/span 3}@container (width<=520px){.cell.size-wide{grid-column:span 2}}@container (width<=300px){.cell.size-md,.cell.size-lg,.cell.size-wide{grid-column:span 1}}.grid.as-list{grid-template-columns:repeat(auto-fill,minmax(260px,1fr));grid-auto-rows:68px}.grid.as-list .tile{flex-direction:row;justify-content:flex-start;align-items:center;gap:12px;padding:10px 14px}.grid.as-list .tile-icon{width:42px;height:42px}.tile{border:1px solid var(--card-border);border-radius:var(--radius);background:var(--card-solid);height:100%;box-shadow:var(--card-shadow);cursor:pointer;-webkit-user-select:none;user-select:none;flex-direction:column;justify-content:space-between;padding:14px;transition:transform .12s,background .2s,box-shadow .2s;display:flex;position:relative;overflow:hidden}.cards-glass .tile{background:var(--card);-webkit-backdrop-filter:blur(18px)saturate(1.3)}.tile:active{transform:scale(.97)}.tile.active{background:color-mix(in srgb, var(--tile-active) 16%, var(--card-solid))}.cards-glass .tile.active{background:color-mix(in srgb, var(--tile-active) 20%, var(--card))}.tile.unavailable{opacity:.5}.tile-icon{background:var(--icon-bg);border-radius:50%;flex:none;justify-content:center;align-items:center;width:44px;height:44px;transition:background .2s,color .2s;display:inline-flex}.tile.active .tile-icon,.tile-icon.big.active{background:var(--tile-active);color:#fff}.tile-icon.big{width:64px;height:64px}.tile-text{min-width:0}.tile-name{white-space:nowrap;text-overflow:ellipsis;font-weight:600;overflow:hidden}.tile-state{color:var(--muted);white-space:nowrap;text-overflow:ellipsis;font-size:.88em;overflow:hidden}.tile-value{font-size:1.4rem;font-weight:650;line-height:1.1}.big-body{flex-direction:column;justify-content:space-between;gap:10px;height:100%;display:flex}.big-top{align-items:center;gap:12px;min-width:0;display:flex}.cover-row{flex:1;justify-content:space-between;align-items:stretch;gap:10px;min-height:0;display:flex}.cover-row .btn-group{flex-direction:column;justify-content:center}.cover-slider{min-height:0}.climate-ring{flex:1;justify-content:center;align-items:center;min-height:0;display:flex;position:relative}.climate-ring svg{width:auto;height:100%;max-height:170px}.climate-ring.big svg{max-height:240px}.ring-track,.ring-value{fill:none;stroke-width:10px;stroke-linecap:round}.ring-track{stroke:var(--icon-bg)}.ring-value{transition:stroke-dasharray .3s}.ring-center{pointer-events:none;flex-direction:column;justify-content:center;align-items:center;display:flex;position:absolute;inset:0}.ring-target{font-size:1.9rem;font-weight:650}.climate-ring.big .ring-target{font-size:2.6rem}.ring-target.range{font-size:1.4rem}.climate-ring.big .ring-target.range{font-size:2rem}.ring-current{color:var(--muted);font-size:.85em}.ring-buttons{justify-content:space-between;display:flex;position:absolute;bottom:0;left:0;right:0}.ring-buttons .icon-btn{background:var(--icon-bg)}.media-big{position:relative}.media-art-bg{filter:blur(28px)saturate(1.4);opacity:.35;pointer-events:none;background-position:50%;background-size:cover;position:absolute;inset:-20px}.media-big>*{position:relative}.media-art{object-fit:cover;border-radius:50%;width:100%;height:100%}.media-controls{flex-direction:column;gap:8px;display:flex}.media-controls .btn-group{justify-content:center}.camera-big{height:calc(100% + 28px);margin:-14px;position:relative}.camera-img{object-fit:cover;border-radius:inherit;background:#000;width:100%;height:100%;display:block}.controls .camera-img{border-radius:12px;height:auto}.camera-empty{height:100%;color:var(--muted);justify-content:center;align-items:center;display:flex}.camera-label{color:#fff;background:#0000008c;border-radius:999px;padding:4px 10px;font-size:.85em;font-weight:600;position:absolute;bottom:10px;left:12px}.sensor-big{justify-content:center}.sensor-value{font-size:2.4rem;font-weight:650;line-height:1}.empty{color:var(--muted);text-align:center;flex-direction:column;grid-column:1/-1;align-items:center;gap:8px;padding:40px 12px;display:flex}.big-empty{justify-content:center;min-height:50vh}@keyframes wiggle{0%,to{transform:rotate(-.6deg)}50%{transform:rotate(.6deg)}}.tile.editing{cursor:grab;animation:.28s ease-in-out infinite wiggle}.cell:nth-child(2n) .tile.editing{animation-delay:-.14s}@media (prefers-reduced-motion:reduce){.tile.editing{outline:2px dashed var(--line);animation:none}}.tile.dragging{opacity:.6;cursor:grabbing;animation:none;transform:scale(1.04);box-shadow:0 16px 40px #00000040}.is-editing{touch-action:none}.badge{z-index:2;border:none;border-radius:50%;justify-content:center;align-items:center;width:28px;height:28px;display:inline-flex;position:absolute;box-shadow:0 2px 6px #00000040}.badge-remove{background:var(--danger);color:#fff;top:6px;left:6px}.badge-resize{background:var(--surface);bottom:6px;right:6px}.add-tile{border:2px dashed var(--line);border-radius:var(--radius);color:var(--muted);background:0 0;flex-direction:column;justify-content:center;align-items:center;gap:6px;font-weight:600;display:flex}.edit-bar{z-index:20;border:1px solid var(--card-border);background:var(--surface);border-radius:24px;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px;width:min(960px,100% - 24px);padding:10px;display:flex;position:fixed;bottom:18px;left:50%;transform:translate(-50%);box-shadow:0 12px 40px #00000040}.edit-bar-group{flex-wrap:wrap;gap:6px;display:flex}.modal-backdrop{z-index:50;background:#00000073;justify-content:center;align-items:center;padding:16px;animation:.15s ease-out fade;display:flex;position:fixed;inset:0}@keyframes fade{0%{opacity:0}}@keyframes rise{0%{opacity:0;transform:translateY(16px)}}.modal{background:var(--surface);border-radius:24px;flex-direction:column;width:min(480px,100%);max-height:min(88vh,900px);animation:.2s ease-out rise;display:flex;box-shadow:0 24px 64px #00000059}.modal.wide{width:min(820px,100%)}.modal-head{justify-content:space-between;align-items:center;gap:12px;padding:14px 14px 8px 22px;display:flex}.modal-head h2{white-space:nowrap;text-overflow:ellipsis;font-size:1.2rem;overflow:hidden}.modal-body{flex:1;padding:4px 22px 20px;overflow-y:auto}.modal-foot{border-top:1px solid var(--line);flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px;padding:12px 18px;display:flex}.modal-foot>:only-child{margin-left:auto}@media (width<=600px){.modal-backdrop{align-items:flex-end;padding:0}.modal,.modal.wide{border-radius:24px 24px 0 0;width:100%;max-height:92vh}}.detail-head{flex-direction:column;align-items:center;gap:8px;margin:6px 0 18px;display:flex}.detail-state{font-size:1.15rem;font-weight:600}.controls{flex-direction:column;gap:14px;display:flex}.control-row{justify-content:space-between;align-items:center;gap:12px;font-weight:600;display:flex}.labeled .labeled-label{margin-top:0}.media-art-large{aspect-ratio:1;object-fit:cover;border-radius:16px;width:100%;max-width:260px;margin:0 auto}.media-meta{text-align:center;flex-direction:column;display:flex}.history-chart{width:100%;height:auto}.history-line{fill:none;stroke:var(--accent);stroke-width:2px;vector-effect:non-scaling-stroke}.history-area{fill:color-mix(in srgb, var(--accent) 18%, transparent)}.history-range{justify-content:space-between;font-size:.85em;display:flex}.weather-now{align-items:center;gap:16px;display:flex}.weather-temp{font-size:2.6rem;font-weight:300;line-height:1}.hourly{gap:6px;padding-bottom:6px;display:flex;overflow-x:auto}.hour{background:var(--surface-2);border-radius:14px;flex-direction:column;flex:none;align-items:center;gap:4px;width:64px;padding:10px 4px;font-size:.9em;display:flex}.precip{color:#3b82f6;font-size:.8em;font-weight:600}.daily{flex-direction:column;display:flex}.day{border-bottom:1px solid var(--line);grid-template-columns:1fr 32px 48px 90px;align-items:center;gap:8px;padding:10px 0;display:grid}.day-temps{text-align:right}.cal-head{justify-content:space-between;align-items:center;display:flex}.cal-grid{grid-template-columns:repeat(7,1fr);gap:4px;display:grid}.cal-dow{color:var(--muted);text-align:center;padding:4px 0;font-size:.8em;font-weight:600}.cal-day{background:var(--surface-2);border:none;border-radius:12px;flex-direction:column;justify-content:center;align-items:center;height:46px;display:flex}.cal-day.other{opacity:.4}.cal-day.today span:first-child{color:var(--accent);font-weight:700}.cal-day.selected{background:var(--accent);color:#fff}.cal-day.selected span:first-child{color:#fff}.cal-dots{letter-spacing:1px;color:var(--accent);font-size:.7em;line-height:1}.cal-day.selected .cal-dots{color:#fff}.agenda,.todo-items{margin:0;padding:0;list-style:none}.agenda li{border-bottom:1px solid var(--line);gap:14px;padding:10px 0;display:flex}.agenda-time{width:70px;color:var(--muted);flex:none}.agenda-text{flex-direction:column;display:flex}.todo+.todo{margin-top:12px}.todo-add,.inline-form{gap:8px;margin-bottom:8px;display:flex}.todo-items li{border-bottom:1px solid var(--line);align-items:center;gap:12px;padding:10px 0;display:flex}.todo-items li.done span{color:var(--muted);text-decoration:line-through}.search-bar{border:1px solid var(--line);background:var(--surface-2);border-radius:14px;align-items:center;gap:6px;margin-bottom:10px;padding:0 12px;display:flex}.entity-list{margin-top:6px}.entity-row{text-align:left;background:0 0;border:none;border-radius:12px;align-items:center;gap:12px;width:100%;padding:10px 8px;display:flex}.entity-row:hover{background:var(--icon-bg)}.entity-row-text{flex-direction:column;flex:1;min-width:0;display:flex}.entity-row-text>span{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.picker-box{border:1px solid var(--line);border-radius:16px;max-height:340px;margin-bottom:16px;padding:10px;overflow-y:auto}.device-line{align-items:center;gap:8px;display:flex}.device-line .entity-row{flex:1;min-width:0}.size-select{width:auto;min-height:36px;padding:4px 8px}.check-list{flex-direction:column;display:flex}.check-item{align-items:center;gap:12px;padding:8px 0;display:flex}.wizard{z-index:40;background:var(--page-bg);grid-template-columns:260px 1fr;display:grid;position:fixed;inset:0}.wizard-steps{border-right:1px solid var(--card-border);background:var(--card);-webkit-backdrop-filter:blur(18px);padding:22px 14px;overflow-y:auto}.brand{color:var(--accent);align-items:center;gap:10px;margin:0 10px 22px;font-size:1.3rem;font-weight:750;display:flex}.wizard-steps ol{margin:0;padding:0;list-style:none}.wstep{text-align:left;background:0 0;border:none;border-radius:12px;align-items:center;gap:10px;width:100%;min-height:44px;padding:8px 12px;font-weight:550;display:flex}.wstep:hover{background:var(--icon-bg)}.wstep.current{background:var(--accent);color:#fff}.wstep.done{color:var(--muted)}.wizard-main{flex-direction:column;min-width:0;height:100vh;display:flex}.wizard-progress{background:var(--line);height:4px}.wizard-progress div{background:var(--accent);height:100%;transition:width .3s}.wizard-head{padding:22px 32px 8px}.wizard-head h2{font-size:1.8rem}.wizard-body{flex:1;padding:8px 32px 24px;overflow-y:auto}.step{max-width:760px}.lead{color:var(--muted);margin-bottom:18px;font-size:1.05rem}.wizard-foot{border-top:1px solid var(--card-border);background:var(--card);-webkit-backdrop-filter:blur(18px);justify-content:space-between;align-items:center;gap:8px;padding:14px 32px;display:flex}@media (width<=760px){.wizard{grid-template-columns:1fr}.wizard-steps{display:none}.wizard-head,.wizard-body,.wizard-foot{padding-left:16px;padding-right:16px}}.room-list{flex-direction:column;gap:6px;display:flex}.room-item{border:1px solid var(--line);background:var(--surface);border-radius:16px;padding:6px}.room-row{align-items:center;gap:6px;margin-bottom:4px;display:flex}.room-row .input{flex:1;min-width:80px}.room-row>.small{text-overflow:ellipsis;text-align:right;flex:none;width:96px;overflow:hidden}.accordion{flex-direction:column;gap:8px;display:flex}.acc-item{border:1px solid var(--line);background:var(--surface);border-radius:16px;overflow:hidden}.acc-head{text-align:left;background:0 0;border:none;align-items:center;gap:12px;width:100%;padding:14px 16px;display:flex}.acc-title{flex:1;font-weight:600}.acc-body{padding:0 12px 14px}.choice-grid{grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin-bottom:22px;display:grid}.choice{border:2px solid var(--line);background:var(--surface);text-align:left;border-radius:18px;flex-direction:column;gap:6px;padding:12px;display:flex}.choice.selected{border-color:var(--accent);box-shadow:0 0 0 4px color-mix(in srgb, var(--accent) 20%, transparent)}.layout-preview{width:100%;height:auto}.pv-bg{fill:var(--surface-2)}.pv-tile{fill:var(--line)}.pv-accent{fill:var(--accent)}.bg-grid{grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:10px;display:grid}.bg-choice{border:2px solid var(--line);background:var(--surface);border-radius:14px;grid-template-columns:1fr 1fr;gap:4px;padding:6px;display:grid}.bg-choice .small{grid-column:1/-1}.bg-choice.selected{border-color:var(--accent)}.bg-swatch{border-radius:8px;height:40px}.bg-swatch.image{background:var(--surface-2);grid-column:1/-1;justify-content:center;align-items:center;display:flex}.review{grid-template-columns:max-content 1fr;gap:10px 20px;margin:0;display:grid}.review dt{color:var(--muted);font-weight:600}.review dd{margin:0}.settings{grid-template-columns:200px 1fr;gap:18px;display:grid}.settings-tabs{flex-direction:column;gap:2px;display:flex}.settings-body{min-width:0}@media (width<=700px){.settings{grid-template-columns:1fr}.settings-tabs{flex-direction:row;overflow-x:auto}.settings-tabs .wstep{white-space:nowrap;width:auto}}.centered{text-align:center;flex-direction:column;justify-content:center;align-items:center;gap:12px;min-height:100vh;padding:24px;display:flex}.welcome-card{border:1px solid var(--card-border);background:var(--card);-webkit-backdrop-filter:blur(20px);max-width:520px;box-shadow:var(--card-shadow);border-radius:28px;flex-direction:column;align-items:center;gap:14px;padding:36px 28px;display:flex}.welcome-card ha-icon{color:var(--accent)}.welcome-card h1{font-size:1.9rem}.spinner{border:3px solid var(--line);border-top-color:var(--accent);border-radius:50%;width:36px;height:36px;animation:.8s linear infinite spin}@keyframes spin{to{transform:rotate(360deg)}}.toast{z-index:60;color:#fff;background:#0f172a;border-radius:14px;max-width:calc(100% - 32px);padding:12px 18px;animation:.2s ease-out rise;position:fixed;bottom:96px;left:50%;transform:translate(-50%);box-shadow:0 10px 30px #0000004d}.toast.error{background:#b91c1c}.screensaver{z-index:100;color:#fff;cursor:none;background:#000;justify-content:center;align-items:center;display:flex;position:fixed;inset:0}.ss-clock .ss-content,.ss-clock{text-align:center}.ss-content{transition:transform 4s ease-in-out}.ss-clock{font-variant-numeric:tabular-nums;font-size:clamp(4rem,16vw,12rem);font-weight:200;line-height:1}.ss-date{opacity:.8;margin-top:8px;font-size:clamp(1.1rem,3vw,2rem)}.ss-extra{opacity:.85;flex-wrap:wrap;justify-content:center;gap:32px;margin-top:28px;font-size:clamp(1rem,2.4vw,1.6rem);display:flex}.ss-extra span{align-items:center;gap:10px;display:inline-flex}.ss-dim{color:#ffffff59}@media (width<=600px){.dashboard{padding:14px 12px 110px}.title{font-size:1.4rem}.clock{font-size:1.5rem}.df-root{--tile-min:140px;--tile-h:100px}.edit-bar{border-radius:18px;bottom:8px}.header-right{flex-wrap:nowrap;justify-content:space-between;width:100%}.header-chips{scrollbar-width:none;flex-wrap:nowrap;min-width:0;overflow-x:auto}.chip-btn,.header-chips .icon-btn{flex:none}.event-chip{max-width:180px}.room-row>.small{display:none}.room-row .icon-btn{width:36px;height:36px}}", zi = class extends HTMLElement {
	mount;
	started = !1;
	set hass(e) {
		L.value = e, !this.started && this.isConnected && this.start();
	}
	set narrow(e) {
		$t.value = e;
	}
	set route(e) {}
	set panel(e) {}
	connectedCallback() {
		if (!this.shadowRoot) {
			let e = this.attachShadow({ mode: "open" }), t = document.createElement("style");
			t.textContent = Ri, this.mount = document.createElement("div"), this.mount.className = "df-mount", e.append(t, this.mount);
		}
		xn(this), he(/* @__PURE__ */ U(Li, {}), this.mount), L.value && !this.started && this.start();
	}
	disconnectedCallback() {
		this.mount && he(null, this.mount), pn(), this.started = !1;
	}
	start() {
		this.started = !0, fn();
	}
};
customElements.get("dashforge-panel") || customElements.define("dashforge-panel", zi);
