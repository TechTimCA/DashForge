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
	var f, m, g, y, b, te, ne, C, w, T, ie, ae, oe, se, ce, de, E, he, ge = n.type;
	if (n.constructor !== d) return null;
	128 & r.__u && (l = 32 & r.__u, f = r.__c.__z) && (n.__u |= l, m = o = [], f.nodeType == 8 ? c = le(f, o) : o.push(f), c = o[0] || c), (f = e.__b) && f(n);
	n: if (typeof ge == "function") {
		g = s.length;
		try {
			if (C = n.props, w = (f = ge.prototype) && f.render, T = (f = ge.contextType) && i[f.__c], ie = f ? T ? T.props.value : f.__ : i, (y = r.__c) ? (n.__c = y, 2 & y.__g && (y.__g |= 1)) : (w ? n.__c = y = new ge(C, ie) : (n.__c = y = new S(C, ie), y.constructor = ge, y.render = me), T && T.sub(y), y.state || (y.state = {}), y.__n = i, y.__g |= 8, y.__h = [], y.__k = []), w && (y.__s || (y.__s = y.state), ge.getDerivedStateFromProps && (y.__s == y.state && (y.__s = _({}, y.__s)), _(y.__s, ge.getDerivedStateFromProps(C, y.__s)))), b = y.props, te = y.state, y.__v = n, r.__c) {
				if (C !== b && w && !ge.getDerivedStateFromProps && y.componentWillReceiveProps && y.componentWillReceiveProps(C, ie), n.__v == r.__v && !(8 & y.__g) || !(4 & y.__g) && y.shouldComponentUpdate && !1 === y.shouldComponentUpdate(C, y.__s, ie)) {
					n.__v != r.__v && (y.props = C, y.state = y.__s, y.__g &= -9), n.__e = r.__e, n.__k = r.__k, n.__k.some(function(e) {
						e && (e.__ = n);
					}), p.push.apply(y.__h, y.__k), y.__k = [], y.__h.length && s.push(y), c = ee(r);
					break n;
				}
				y.componentWillUpdate && y.componentWillUpdate(C, y.__s, ie), w && y.componentDidUpdate && y.__h.push(function() {
					y.componentDidUpdate(b, te, ne);
				});
			} else w && !ge.getDerivedStateFromProps && y.componentWillMount && y.componentWillMount(), w && y.componentDidMount && y.__h.push(y.componentDidMount);
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
var ge = () => Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4), _e = [
	{
		id: "midnight",
		name: "Midnight",
		light: "linear-gradient(180deg,#eef0f6 0%,#e3e6ef 100%)",
		dark: "radial-gradient(circle at 20% -10%,#1d2030 0%,#121319 50%,#0c0d11 100%)"
	},
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
	},
	{
		id: "dusk",
		name: "Dusk",
		light: "linear-gradient(160deg,#f7d9c9 0%,#d5dcf2 55%,#ece3f6 100%)",
		dark: "linear-gradient(160deg,#1c2541 0%,#3a2d52 55%,#5b3448 100%)"
	},
	{
		id: "homey",
		name: "Charcoal",
		light: "linear-gradient(180deg,#f3f4f7 0%,#e6e8ee 100%)",
		dark: "radial-gradient(circle at 15% 0%,#262a33 0%,#14161b 55%,#0d0e12 100%)"
	}
], ve = [
	{
		id: "vivid",
		name: "Vivid",
		desc: "Dark and colourful: bright gradient tiles that pop when devices are on.",
		theme: {
			style: "vivid",
			font: "sora",
			mode: "dark",
			background: "midnight",
			cardStyle: "solid",
			radius: 22,
			accent: "#6366f1"
		}
	},
	{
		id: "dashforge",
		name: "DashForge",
		desc: "Soft gradients and frosted cards with live colour.",
		theme: {
			style: "dashforge",
			font: "manrope",
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
			background: "plain",
			cardStyle: "solid",
			radius: 12,
			accent: "#18181b"
		}
	}
], ye = [
	"#3b82f6",
	"#8b5cf6",
	"#ec4899",
	"#f97316",
	"#eab308",
	"#22c55e",
	"#14b8a6",
	"#64748b"
];
function be() {
	return {
		schema: 1,
		setupComplete: !1,
		title: "Home",
		userName: "",
		layout: "auto",
		theme: {
			style: "vivid",
			font: "sora",
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
function xe(e) {
	let t = be();
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
var Se = (e) => JSON.parse(JSON.stringify(e));
function Ce(e, t = "sm") {
	return {
		id: ge(),
		entity: e,
		size: t
	};
}
function we(e, t, n, r) {
	return {
		id: ge(),
		kind: e,
		name: t,
		icon: n,
		areaId: r,
		cards: []
	};
}
// src/fonts.ts
var Te = [
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
], Ee = "system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", sans-serif", De = "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD", Oe = "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF";
function ke(e) {
	let t = Te.find((t) => t.id === e) ?? Te[0];
	return t.stack ? `${t.stack}, ${Ee}` : Ee;
}
var Ae = !1;
function je() {
	if (Ae || typeof document > "u" || (Ae = !0, document.getElementById("dashforge-fonts"))) return;
	let e = import.meta.url.replace(/[?#].*$/, "").replace(/\/[^/]*$/, "") + "/fonts", t = Te.filter((e) => e.file).map((t) => [[De, "latin"], [Oe, "latin-ext"]].map(([n, r]) => `@font-face{font-family:${t.stack};font-style:normal;font-display:swap;font-weight:100 900;src:url("${e}/${t.file}-${r}-wght-normal.woff2") format("woff2-variations"),url("${e}/${t.file}-${r}-wght-normal.woff2") format("woff2");unicode-range:${n};}`).join("")).join(""), n = document.createElement("style");
	n.id = "dashforge-fonts", n.textContent = t, document.head.append(n);
}
// node_modules/preact/hooks/dist/hooks.mjs
var Me, D, Ne, Pe, Fe = Object.is, Ie = 0, Le = [], Re = [], O = e, ze = O.__b, Be = O.__r, Ve = O.diffed, He = O.__c, Ue = O.unmount, We = O.__;
function Ge(e, t) {
	O.__h && O.__h(D, e, Ie || t), Ie = 0;
	var n = D.__H || (D.__H = {
		__: [],
		__h: []
	});
	return e >= n.__.length && n.__.push({}), n.__[e];
}
function k(e) {
	return Ie = 1, Ke(nt, e);
}
function Ke(e, t, n) {
	var r = Ge(Me++, 2);
	if (r.t = e, !r.__c && (r.__ = [n ? n(t) : nt(void 0, t), function(e) {
		var t = r.__N ? r.__N[0] : r.__[0], n = r.t(t, e);
		Fe(t, n) || (r.__N = [n, r.__[1]], r.__c.setState({}));
	}], r.__c = D, !D.__f)) {
		D.__f = !0;
		var i = D.shouldComponentUpdate;
		D.shouldComponentUpdate = function(e, t, n) {
			var r = this.__H;
			if (!r) return !0;
			var a = !1, o = this.props != e;
			if (r.__.some(function(e) {
				e.__N && (a = !0, Fe(e.__[0], e.__N[0]) || (o = !0));
			}), i) {
				var s = i.call(this, e, t, n);
				return a ? s || o : s;
			}
			return !a || o;
		};
	}
	return r.__;
}
function A(e, t) {
	var n = Ge(Me++, 3);
	!O.__s && tt(n.__H, t) && (n.__P = !0, n.__ = e, n.u = t, D.__H.__h.push(n));
}
function qe(e) {
	return Ie = 5, Je(function() {
		return { current: e };
	}, []);
}
function Je(e, t) {
	var n = Ge(Me++, 7);
	return tt(n.__H, t) && (n.__ = e(), n.__H = t), n.__;
}
function Ye() {
	var e;
	do {
		for (; e = Re.shift();) try {
			$e(e);
		} catch (t) {
			O.__e(t, { __: (e = e.__P) && e.__v });
		}
		for (; e = Le.shift();) {
			var t = e.__H;
			if (e.__P && t) try {
				t.__h.some($e), t.__h.some(et), t.__h = [];
			} catch (n) {
				t.__h = [], O.__e(n, e.__v);
			}
		}
	} while (Re.length);
}
O.__b = function(e) {
	D = null, ze && ze(e);
}, O.__ = function(e, t) {
	e && t.__k && t.__k.__m && (e.__m = t.__k.__m), We && We(e, t);
}, O.__r = function(e) {
	Be && Be(e), Me = 0;
	var t = (D = e.__c).__H;
	t && (Ne == D ? D.__h = [] : (t.__h.some($e), t.__h.some(et), Me = 0), t.__h = [], t.__.some(function(e) {
		e.__N && (e.__ = e.__N), e.u = e.__N = void 0;
	})), Ne = D;
}, O.diffed = function(e) {
	Ve && Ve(e);
	var t = e.__c;
	t && t.__H && (t.__H.__h.length && Qe(Le.push(t)), t.__H.__.some(function(e) {
		e.u && (e.__H = e.u);
	})), Ne = D = null;
}, O.__c = function(e, t) {
	t.some(function(e) {
		try {
			e.__h.some($e), e.__h = e.__h.filter(function(e) {
				return !e.__ || et(e);
			});
		} catch (t) {
			e.__h = [function() {
				throw t;
			}];
		}
	}), He && He(e, t);
}, O.unmount = function(e) {
	Ue && Ue(e);
	var t, n, r = e.__c;
	r && r.__H && (r.__H.__.some(function(r) {
		try {
			if (r.__P && r.__c) {
				if (n === void 0) {
					for (n = e.__; n && (!n.__c || !n.__c.__P);) n = n.__;
					n &&= n.__c;
				}
				r.__P = n, Qe(Re.push(r));
			} else $e(r);
		} catch (e) {
			t = e;
		}
	}), r.__H = void 0, t && O.__e(t, r.__v));
};
var Xe = typeof requestAnimationFrame == "function";
function Ze(e) {
	var t, n = function() {
		clearTimeout(r), Xe && cancelAnimationFrame(t), setTimeout(e);
	}, r = setTimeout(n, 35);
	Xe && (t = requestAnimationFrame(n));
}
function Qe(e) {
	e != 1 && Pe == O.requestAnimationFrame || ((Pe = O.requestAnimationFrame) || Ze)(Ye);
}
function $e(e) {
	var t = D, n = e.__c;
	typeof n == "function" && (e.__c = void 0, n()), D = t;
}
function et(e) {
	var t = D;
	e.__c = e.__(), D = t;
}
function tt(e, t) {
	return !e || e.length != t.length || t.some(function(t, n) {
		return !Fe(t, e[n]);
	});
}
function nt(e, t) {
	return typeof t == "function" ? t(e) : t;
}
// node_modules/@preact/signals-core/dist/signals-core.module.js
var rt = Symbol.for("preact-signals");
function it() {
	if (lt > 1) lt--;
	else {
		var e, t = !1;
		for ((function() {
			var e = pt;
			for (pt = void 0; e !== void 0;) {
				var t = e.S;
				if (t.v === e.v) for (var n = t.t; n !== void 0; n = n.x) n.i === e.i && (n.i = t.i);
				e = e.o;
			}
		})(); ct !== void 0;) {
			var n = ct;
			for (ct = void 0, ut++; n !== void 0;) {
				var r = n.u;
				if (n.u = void 0, n.f &= -3, !(8 & n.f) && gt(n)) try {
					n.c();
				} catch (n) {
					t ||= (e = n, !0);
				}
				n = r;
			}
		}
		if (ut = 0, lt--, t) throw e;
	}
}
function at(e) {
	if (lt > 0) return e();
	ft = ++dt, lt++;
	try {
		return e();
	} finally {
		it();
	}
}
var ot, j = void 0;
function st(e) {
	var t = j, n = ot;
	j = void 0, ot = void 0;
	try {
		return e();
	} finally {
		j = t, ot = n;
	}
}
var ct = void 0, lt = 0, ut = 0, dt = 0, ft = 0, pt = void 0, mt = 0;
function ht(e) {
	if (j !== void 0) {
		var t = e.n;
		if (t === void 0 || t.t !== j) return t = {
			i: 0,
			S: e,
			p: j.s,
			n: void 0,
			t: j,
			e: void 0,
			x: void 0,
			r: t
		}, j.s !== void 0 && (j.s.n = t), j.s = t, e.n = t, 32 & j.f && e.S(t), t;
		if (t.i === -1) return t.i = 0, t.n !== void 0 && (t.n.p = t.p, t.p !== void 0 && (t.p.n = t.n), t.p = j.s, t.n = void 0, j.s.n = t, j.s = t), t;
	}
}
function M(e, t) {
	this.v = e, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = t?.watched, this.Z = t?.unwatched, this.name = t?.name;
}
M.prototype.brand = rt, M.prototype.h = function() {
	return !0;
}, M.prototype.S = function(e) {
	var t = this, n = this.t;
	n !== e && e.e === void 0 && (e.x = n, this.t = e, n === void 0 ? st(function() {
		var e;
		(e = t.W) == null || e.call(t);
	}) : n.e = e);
}, M.prototype.U = function(e) {
	var t = this;
	if (this.t !== void 0) {
		var n = e.e, r = e.x;
		n !== void 0 && (n.x = r, e.e = void 0), r !== void 0 && (r.e = n, e.x = void 0), e === this.t && (this.t = r, r === void 0 && st(function() {
			var e;
			(e = t.Z) == null || e.call(t);
		}));
	}
}, M.prototype.subscribe = function(e) {
	var t = this;
	return Tt(function() {
		var n = t.value;
		st(function() {
			return e(n);
		});
	}, { name: "sub" });
}, M.prototype.valueOf = function() {
	return this.value;
}, M.prototype.toString = function() {
	return this.value + "";
}, M.prototype.toJSON = function() {
	return this.value;
}, M.prototype.peek = function() {
	var e = this;
	return st(function() {
		return e.value;
	});
}, Object.defineProperty(M.prototype, "value", {
	get: function() {
		var e = ht(this);
		return e !== void 0 && (e.i = this.i), this.v;
	},
	set: function(e) {
		if (e !== this.v) {
			if (ut > 100) throw Error("Cycle detected");
			(function(e) {
				lt !== 0 && ut === 0 && e.l !== ft && (e.l = ft, pt = {
					S: e,
					v: e.v,
					i: e.i,
					o: pt
				});
			})(this), this.v = e, this.i++, mt++, lt++;
			try {
				for (var t = this.t; t !== void 0; t = t.x) t.t.N();
			} finally {
				it();
			}
		}
	}
});
function N(e, t) {
	return new M(e, t);
}
function gt(e) {
	for (var t = e.s; t !== void 0; t = t.n) if (t.S.i !== t.i || !t.S.h() || t.S.i !== t.i) return !0;
	return !1;
}
function _t(e) {
	for (var t = e.s; t !== void 0; t = t.n) {
		var n = t.S.n;
		if (n !== void 0 && (t.r = n), t.S.n = t, t.i = -1, t.n === void 0) {
			e.s = t;
			break;
		}
	}
}
function vt(e) {
	for (var t = e.s, n = void 0; t !== void 0;) {
		var r = t.p;
		t.i === -1 ? (t.S.U(t), r !== void 0 && (r.n = t.n), t.n !== void 0 && (t.n.p = r)) : n = t, t.S.n = t.r, t.r !== void 0 && (t.r = void 0), t = r;
	}
	e.s = n;
}
function yt(e, t) {
	M.call(this, void 0, t), this.x = e, this.s = void 0, this.g = mt - 1, this.f = 4;
}
yt.prototype = new M(), yt.prototype.h = function() {
	if (this.f &= -3, 1 & this.f) return !1;
	if ((36 & this.f) == 32 || (this.f &= -5, this.g === mt)) return !0;
	if (this.g = mt, this.f |= 1, this.i > 0 && !gt(this)) return this.f &= -2, !0;
	var e = j;
	try {
		_t(this), j = this;
		var t = this.x();
		(16 & this.f || this.v !== t || this.i === 0) && (this.v = t, this.f &= -17, this.i++);
	} catch (e) {
		this.v = e, this.f |= 16, this.i++;
	}
	return j = e, vt(this), this.f &= -2, !0;
}, yt.prototype.S = function(e) {
	if (this.t === void 0) {
		this.f |= 36;
		for (var t = this.s; t !== void 0; t = t.n) t.S.S(t);
	}
	M.prototype.S.call(this, e);
}, yt.prototype.U = function(e) {
	if (this.t !== void 0 && (M.prototype.U.call(this, e), this.t === void 0)) {
		this.f &= -33;
		for (var t = this.s; t !== void 0; t = t.n) t.S.U(t);
	}
}, yt.prototype.N = function() {
	if (!(2 & this.f)) {
		this.f |= 6;
		for (var e = this.t; e !== void 0; e = e.x) e.t.N();
	}
}, Object.defineProperty(yt.prototype, "value", { get: function() {
	if (1 & this.f) throw Error("Cycle detected");
	var e = ht(this);
	if (this.h(), e !== void 0 && (e.i = this.i), 16 & this.f) throw this.v;
	return this.v;
} });
function bt(e, t) {
	return new yt(e, t);
}
function xt(e) {
	var t = e.j;
	if (e.j = void 0, typeof t == "function") {
		lt++;
		var n = j;
		j = void 0;
		try {
			t();
		} catch (t) {
			throw e.f &= -2, e.f |= 8, St(e), t;
		} finally {
			j = n, it();
		}
	}
}
function St(e) {
	for (var t = e.s; t !== void 0; t = t.n) t.S.U(t);
	e.x = void 0, e.s = void 0, xt(e);
}
function Ct(e) {
	if (j !== this) throw Error("Out-of-order effect");
	vt(this), j = e, this.f &= -2;
	try {
		8 & this.f && St(this);
	} finally {
		it();
	}
}
function wt(e, t) {
	this.x = e, this.j = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = t?.name, ot && ot.push(this);
}
wt.prototype.c = function() {
	var e = this.S();
	try {
		if (8 & this.f || this.x === void 0) return;
		var t = this.x();
		typeof t == "function" && (this.j = t);
	} finally {
		e();
	}
}, wt.prototype.S = function() {
	if (1 & this.f) throw Error("Cycle detected");
	this.f |= 1, this.f &= -9, xt(this), _t(this), lt++;
	var e = j;
	return j = this, Ct.bind(this, e);
}, wt.prototype.N = function() {
	2 & this.f || (this.f |= 2, this.u = ct, ct = this);
}, wt.prototype.d = function() {
	this.f |= 8, 1 & this.f || St(this);
}, wt.prototype.dispose = function() {
	this.d();
};
function Tt(e, t) {
	var n = new wt(e, t);
	try {
		n.c();
	} catch (e) {
		throw n.d(), e;
	}
	var r = n.d.bind(n);
	return r[Symbol.dispose] = r, r;
}
// node_modules/@preact/signals/dist/signals.module.js
var Et, Dt, Ot = typeof window < "u" && !!window.__PREACT_SIGNALS_DEVTOOLS__, kt = [];
Tt(function() {
	Et = this.N;
})();
function At(t, n) {
	e[t] = n.bind(null, e[t] || function() {});
}
function jt(e) {
	if (Dt) {
		var t = Dt;
		Dt = void 0, t();
	}
	Dt = e && e.S();
}
function Mt(e) {
	var t = this, r = e.data, i = Pt(r);
	i.name = "ReactiveDom", i.value = r;
	var a = Je(function() {
		for (var e = t, r = t.__v; r = r.__;) if (r.__c) {
			r.__c.__$f |= 4;
			break;
		}
		var a = bt(function() {
			var e = i.value.value;
			return e === 0 ? 0 : !0 === e ? "" : e || "";
		}), o = bt(function() {
			return !Array.isArray(a.value) && !n(a.value);
		}), s = Tt(function() {
			if (this.N = Lt, o.value) {
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
Mt.displayName = "ReactiveTextNode", Object.defineProperties(M.prototype, {
	constructor: {
		configurable: !0,
		value: y(x, null).constructor
	},
	type: {
		configurable: !0,
		value: Mt
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
}), At("__b", function(e, t) {
	if (jt(), typeof t.type == "string") {
		var n, r = t.props;
		for (var i in r) if (i !== "children") {
			var a = r[i];
			a instanceof M && (n || (t.__np = n = {}), n[i] = a, r[i] = a.peek());
		}
	}
	e(t);
}), At("__r", function(e, t) {
	if (e(t), t.type !== x) {
		jt();
		var n, r = t.__c;
		r && (r.__$f &= -2, (n = r.__$u) === void 0 && (r.__$u = n = function(e, t) {
			var n;
			return Tt(function() {
				n = this;
			}, { name: t }), n.c = e, n;
		}(function(e) {
			return function() {
				var t;
				Ot && ((t = this.y) == null || t.call(this)), e.__$f |= 1, e.setState({});
			};
		}(r), typeof t.type == "function" ? t.type.displayName || t.type.name : ""))), jt(n);
	}
}), At("__e", function(e, t, n, r) {
	jt(), e(t, n, r);
}), At("diffed", function(e, t) {
	jt();
	var n;
	if (typeof t.type == "string" && (n = t.__e)) {
		var r = t.__np, i = t.props, a = n.U;
		if (a) for (var o in a) {
			var s = a[o];
			s === void 0 || r && o in r || (s.d(), a[o] = void 0);
		}
		if (r) for (var c in a || (a = {}, n.U = a), r) {
			var l = a[c], u = r[c];
			l === void 0 ? (l = Nt(n, c, u, i), a[c] = l) : l.o(u, i);
		}
	}
	e(t);
});
function Nt(e, t, n, r) {
	var i = t in e && e.ownerSVGElement === void 0, a = N(n);
	return {
		o: function(e, t) {
			a.value = e, r = t;
		},
		d: Tt(function() {
			this.N = Lt;
			var n = a.value.value;
			r[t] !== n && (r[t] = n, i ? e[t] = n : n != null && (!1 !== n || t[4] === "-") ? e.setAttribute(t, n) : e.removeAttribute(t));
		})
	};
}
At("unmount", function(e, t) {
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
}), At("__h", function(e, t, n, r) {
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
function Pt(e, t) {
	return Je(function() {
		return N(e, t);
	}, []);
}
var Ft = function(e) {
	queueMicrotask(function() {
		queueMicrotask(e);
	});
};
function It() {
	at(function() {
		for (var e; e = kt.shift();) Et.call(e);
	});
}
function Lt() {
	kt.push(this) === 1 && (e.requestAnimationFrame || Ft)(It);
}
// src/entities.ts
var P = (e) => e.split(".")[0], Rt = /* @__PURE__ */ new Set(/* @__PURE__ */ "light.switch.fan.cover.climate.lock.media_player.input_boolean.vacuum.humidifier.valve.siren.sensor.binary_sensor.camera.scene.script.button.input_button.alarm_control_panel.number.input_number.select.input_select.weather.person.automation.water_heater.lawn_mower.remote.counter.timer.input_text.text.input_datetime.date.time.datetime.update.device_tracker.event.group.image.todo.calendar".split(".")), zt = /* @__PURE__ */ new Set([
	"light",
	"switch",
	"fan",
	"input_boolean",
	"siren",
	"humidifier",
	"automation",
	"remote"
]), Bt = /* @__PURE__ */ new Set([
	...zt,
	"cover",
	"climate",
	"lock",
	"media_player",
	"vacuum",
	"valve",
	"alarm_control_panel",
	"water_heater",
	"lawn_mower"
]), F = (e) => !e || e.state === "unavailable" || e.state === "unknown";
function Vt(e) {
	if (!e || F(e)) return !1;
	switch (P(e.entity_id)) {
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
function Ht(e, t) {
	let n = P(e);
	return zt.has(n) || n === "cover" || n === "valve" ? "toggle" : n === "group" ? t && (t.state === "on" || t.state === "off") ? "toggle" : "details" : n === "todo" || n === "calendar" || n === "weather" ? n : n === "scene" || n === "script" ? "activate" : n === "button" || n === "input_button" ? "press" : n === "lock" ? "lock" : n === "media_player" ? "media" : "details";
}
var Ut = {
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
}, Wt = {
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
}, Gt = {
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
function Kt(e, t) {
	switch (P(e)) {
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
var qt = /zone|sprinkler|irrigat|drip|lawn|garden|hose|station|water(ing)?/i, Jt = /* @__PURE__ */ new Set([
	"switch",
	"valve",
	"input_boolean"
]);
function Yt(e, t) {
	let n = P(t);
	if (!Jt.has(n)) return !1;
	let r = e.states[t];
	if (n === "valve" && r?.attributes.device_class === "water") return !0;
	let i = `${t} ${r?.attributes.friendly_name ?? ""}`;
	return qt.test(i);
}
var Xt = {
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
}, Zt = {
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
}, Qt = {
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
function $t(e, t, n) {
	if (n?.icon) return n.icon;
	let r = e.entities?.[t];
	if (r?.icon) return r.icon;
	let i = e.states[t];
	if (i?.attributes.icon) return i.attributes.icon;
	let a = P(t), o = i?.attributes.device_class;
	if (a === "sensor" && o && Xt[o]) return Xt[o];
	if (a === "cover" && o && Qt[o]) {
		let [e, t] = Qt[o];
		return i?.state === "closed" ? t : e;
	}
	if (a === "binary_sensor" && o && Zt[o]) {
		let [e, t] = Zt[o];
		return i?.state === "on" ? e : t;
	}
	let s = Ut[a] ?? ["mdi:help-circle-outline"];
	return Vt(i) || !s[1] ? s[0] : s[1];
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
var en = {
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
}, tn = (e) => e.replace(/_/g, " ").replace(/\b\w/g, (e) => e.toUpperCase());
function nn(e, t) {
	if (!t) return "Not found";
	if (t.state === "unavailable") return "Unavailable";
	if (t.state === "unknown") return "Unknown";
	let n = P(t.entity_id);
	if (n === "binary_sensor") {
		let e = en[t.attributes.device_class] ?? ["On", "Off"];
		return t.state === "on" ? e[0] : e[1];
	}
	if (n === "light" && t.state === "on" && t.attributes.brightness != null) return `${Math.round(t.attributes.brightness / 255 * 100)}%`;
	if (n === "cover" && t.attributes.current_position != null && t.state === "open") return `Open · ${t.attributes.current_position}%`;
	if (n === "climate") {
		let e = t.attributes, n = tn(e.hvac_action ?? t.state);
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
		let e = t.state === "partlycloudy" ? "Partly cloudy" : tn(t.state.replace(/-/g, " "));
		return `${Math.round(t.attributes.temperature)}° · ${e}`;
	}
	if (n === "update") return t.state === "on" ? `Update to ${t.attributes.latest_version ?? "new version"}` : "Up to date";
	if (e.formatEntityState) try {
		return e.formatEntityState(t);
	} catch {}
	let r = t.attributes.unit_of_measurement, i = Number(t.state);
	return r && !Number.isNaN(i) ? `${Math.abs(i) >= 100 ? Math.round(i) : Math.round(i * 10) / 10} ${r}` : tn(t.state);
}
function rn(e, t) {
	let n = e.entities?.[t];
	return n ? n.area_id ? n.area_id : n.device_id ? e.devices?.[n.device_id]?.area_id ?? null : null : null;
}
function an(e, t) {
	if (!Rt.has(P(t))) return !1;
	let n = e.entities?.[t];
	return !(n?.hidden || n?.entity_category);
}
function on(e, t) {
	return Object.keys(e.states).filter((n) => an(e, n) && rn(e, n) === t).sort(fn(e));
}
function sn(e) {
	return Object.keys(e.states).filter((t) => an(e, t) && !rn(e, t)).sort(fn(e));
}
var cn = /* @__PURE__ */ new Set([
	"temperature",
	"humidity",
	"carbon_dioxide",
	"pm25"
]), ln = /* @__PURE__ */ new Set([
	"door",
	"garage_door",
	"window",
	"opening",
	"motion",
	"occupancy",
	"moisture",
	"smoke"
]);
function un(e, t) {
	let n = P(t);
	if (Bt.has(n) || n === "camera") return n !== "automation";
	let r = e.states[t]?.attributes.device_class;
	return n === "sensor" ? cn.has(r) : n === "binary_sensor" && ln.has(r);
}
var dn = [
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
function fn(e) {
	return (t, n) => {
		let r = dn.indexOf(P(t)), i = dn.indexOf(P(n)), a = r === -1 ? 99 : r, o = i === -1 ? 99 : i;
		return a === o ? I(e, t).localeCompare(I(e, n)) : a - o;
	};
}
function pn(e) {
	let t = P(e);
	return t === "camera" || t === "media_player" ? "wide" : t === "climate" || t === "water_heater" ? "lg" : t === "weather" ? "md" : "sm";
}
var mn = {
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
}, L = N(null), hn = N(!1), gn = N(typeof window < "u" ? window.innerWidth : 1200), _n = N(null), R = N(null), vn = N(0), yn = N(null), z = N(null), bn = bt(() => z.value !== null), xn = bt(() => z.value ?? R.value), B = N(null), Sn = N(!1), Cn = N(!1), wn = N(null), Tn;
function V(e, t = "info") {
	wn.value = {
		text: e,
		kind: t
	}, clearTimeout(Tn), Tn = window.setTimeout(() => wn.value = null, 3500);
}
function En() {
	if (!L.value) throw Error("Home Assistant is not connected");
	return L.value;
}
var Dn = null;
async function On() {
	try {
		let [e, t] = await Promise.all([En().callWS({ type: "dashforge/info" }), En().callWS({ type: "dashforge/config/get" })]);
		_n.value = e, vn.value = t.revision, R.value = t.config ? xe(t.config) : null, yn.value = null, Dn ||= await En().connection.subscribeMessage((e) => {
			e.revision !== vn.value && (vn.value = e.revision, R.value = e.config ? xe(e.config) : null);
		}, { type: "dashforge/config/subscribe" });
	} catch (e) {
		yn.value = e?.message ?? String(e);
	}
}
function kn() {
	Dn?.().catch(() => void 0), Dn = null;
}
async function An(e) {
	try {
		return vn.value = (await En().callWS({
			type: "dashforge/config/save",
			config: e,
			revision: vn.value
		})).revision, R.value = e ? xe(e) : null, !0;
	} catch (e) {
		return e?.code === "conflict" ? (V("This dashboard was changed on another device. Reloaded the latest version.", "error"), await On()) : V(e?.message ?? "Could not save the dashboard", "error"), !1;
	}
}
function jn() {
	R.value && (z.value = Se(R.value));
}
function Mn(e) {
	if (!z.value) return;
	let t = Se(z.value);
	e(t), z.value = t;
}
async function Nn() {
	z.value && await An(z.value) && (z.value = null, V("Dashboard saved"));
}
function Pn() {
	z.value = null;
}
function H(e, t, n = {}) {
	return En().callService(e, t, n).catch((n) => V(n?.message ?? `${e}.${t} failed`, "error"));
}
function Fn(e) {
	In?.dispatchEvent(new CustomEvent("hass-more-info", {
		detail: { entityId: e },
		bubbles: !0,
		composed: !0
	}));
}
var In = null;
function Ln(e) {
	In = e;
}
// node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
var Rn = Symbol.for("pv"), zn = 0;
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
		constructor: Rn,
		__v: --zn,
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
	let t = e.min ?? 0, n = e.max ?? 100, r = e.step ?? 1, [i, a] = k(null), o = qe(null), s = i ?? e.value, c = n === t ? 0 : (s - t) / (n - t) * 100, l = (i) => {
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
	return A(() => {
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
function Bn(e) {
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
function Vn({ checked: e, onChange: t }) {
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
var Hn = [
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
function Un({ value: e, onChange: t }) {
	return /* @__PURE__ */ U("div", {
		class: "icon-picker",
		children: [/* @__PURE__ */ U("div", {
			class: "icon-grid",
			children: Hn.map((n) => /* @__PURE__ */ U("button", {
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
function Wn(e, t, n = 500) {
	let r = qe(void 0), i = qe(!1), a = qe(null);
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
var Gn = N(null), Kn = N(null), qn = N(null), Jn = N(null);
function Yn(e, t) {
	let n = e.entities?.[t], r = n?.area_id ?? (n?.device_id ? e.devices?.[n.device_id]?.area_id : null);
	return r ? e.areas?.[r]?.name ?? "Other" : "No area";
}
function Xn(e) {
	let t = L.value, [n, r] = k(""), [i, a] = k("all"), o = Je(() => Object.keys(t.states).filter((n) => an(t, n) && (!e.domains || e.domains.includes(P(n)))).sort((e, n) => I(t, e).localeCompare(I(t, n))), [Object.keys(t.states).length]), s = Je(() => [...new Set(o.map(P))].sort(), [o]), c = n.trim().toLowerCase(), l = o.filter((e) => (i === "all" || P(e) === i) && (!c || e.toLowerCase().includes(c) || I(t, e).toLowerCase().includes(c) || Yn(t, e).toLowerCase().includes(c))), u = /* @__PURE__ */ new Map();
	for (let e of l.slice(0, 400)) {
		let n = Yn(t, e);
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
					children: mn[e] ?? e
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
						}), n.map((t) => /* @__PURE__ */ U(Zn, {
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
function Zn({ id: e, selected: t, onToggle: n, room: r }) {
	let i = L.value;
	return /* @__PURE__ */ U("button", {
		type: "button",
		class: `entity-row ${t ? "selected" : ""}`,
		onClick: n,
		"aria-pressed": t,
		children: [
			/* @__PURE__ */ U(W, {
				icon: $t(i, e),
				size: 22
			}),
			/* @__PURE__ */ U("span", {
				class: "entity-row-text",
				children: [/* @__PURE__ */ U("span", { children: I(i, e, void 0, r) }), /* @__PURE__ */ U("span", {
					class: "muted small",
					children: [
						nn(i, i.states[e]),
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
function Qn() {
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
					onClick: () => Gn.value = n.id,
					children: "Add device"
				}),
				/* @__PURE__ */ U(K, {
					icon: "mdi:pencil",
					onClick: () => qn.value = n.id,
					children: ["Edit ", n.kind === "room" ? "room" : "page"]
				}),
				r > 0 && /* @__PURE__ */ U(K, {
					icon: "mdi:eye-off",
					onClick: () => Jn.value = n.id,
					children: [
						"Hidden (",
						r,
						")"
					]
				})
			] }), /* @__PURE__ */ U(K, {
				icon: "mdi:folder-plus",
				onClick: () => qn.value = "new",
				children: "New room or page"
			})]
		}), /* @__PURE__ */ U("div", {
			class: "edit-bar-group",
			children: [/* @__PURE__ */ U(K, {
				kind: "ghost",
				onClick: Pn,
				children: "Cancel"
			}), /* @__PURE__ */ U(K, {
				kind: "primary",
				icon: "mdi:check",
				onClick: Nn,
				children: "Done"
			})]
		})]
	});
}
function $n() {
	let e = Gn.value, t = z.value?.sections.find((t) => t.id === e);
	return t ? /* @__PURE__ */ U(Y, {
		title: `Add to ${t.name}`,
		onClose: () => Gn.value = null,
		wide: !0,
		footer: /* @__PURE__ */ U(K, {
			kind: "primary",
			onClick: () => Gn.value = null,
			children: "Done"
		}),
		children: /* @__PURE__ */ U(Xn, {
			isSelected: (e) => t.cards.some((t) => t.entity === e && !t.hidden),
			onToggle: (e) => Mn((n) => {
				let r = n.sections.find((e) => e.id === t.id), i = r.cards.find((t) => t.entity === e);
				i ? i.hidden ? i.hidden = !1 : r.cards = r.cards.filter((t) => t.entity !== e) : r.cards.push(Ce(e, pn(e)));
			}),
			autofocus: !0
		})
	}) : null;
}
var er = [
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
function tr() {
	let e = Kn.value, t = z.value, n = L.value, r = t?.sections.find((t) => t.id === e?.sectionId), i = r?.cards.find((t) => t.id === e?.cardId);
	if (!e || !r || !i || !n) return null;
	let a = (e) => Mn((t) => {
		let n = t.sections.find((e) => e.id === r.id)?.cards.find((e) => e.id === i.id);
		n && e(n);
	}), o = () => Kn.value = null;
	return /* @__PURE__ */ U(Y, {
		title: "Edit card",
		onClose: o,
		footer: /* @__PURE__ */ U(x, { children: [/* @__PURE__ */ U(K, {
			kind: "danger",
			icon: "mdi:delete",
			onClick: () => {
				Mn((e) => {
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
				children: /* @__PURE__ */ U(Bn, {
					value: i.size,
					options: er,
					onChange: (e) => a((t) => t.size = e)
				})
			}),
			/* @__PURE__ */ U(X, {
				label: "Icon",
				hint: "Leave empty to use the default icon.",
				children: /* @__PURE__ */ U(Un, {
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
							...ye,
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
						t !== r.id && (Mn((e) => {
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
function nr() {
	let e = Jn.value, t = z.value?.sections.find((t) => t.id === e), n = L.value;
	if (!t || !n) return null;
	let r = t.cards.filter((e) => e.hidden);
	return /* @__PURE__ */ U(Y, {
		title: "Hidden cards",
		onClose: () => Jn.value = null,
		children: [r.length === 0 && /* @__PURE__ */ U("p", {
			class: "muted",
			children: "No hidden cards."
		}), r.map((e) => /* @__PURE__ */ U("div", {
			class: "row",
			children: [
				/* @__PURE__ */ U(W, { icon: $t(n, e.entity, e) }),
				/* @__PURE__ */ U("div", {
					class: "row-text",
					children: /* @__PURE__ */ U("div", {
						class: "row-label",
						children: I(n, e.entity, e, t.name)
					})
				}),
				/* @__PURE__ */ U(K, {
					icon: "mdi:eye",
					onClick: () => Mn((n) => {
						let r = n.sections.find((e) => e.id === t.id)?.cards.find((t) => t.id === e.id);
						r && (r.hidden = !1);
					}),
					children: "Show"
				})
			]
		}))]
	});
}
function rr() {
	let e = qn.value;
	return !e || !z.value || !L.value ? null : /* @__PURE__ */ U(ir, { ref_: e }, e);
}
function ir({ ref_: e }) {
	let t = z.value, n = L.value, [r, i] = k(null), a = e === "new" ? null : t.sections.find((t) => t.id === e), o = r ?? (a ? {
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
		i(null), qn.value = null;
	}, c = a ? t.sections.indexOf(a) : -1, l = () => {
		o.name.trim() && (Mn((e) => {
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
				let t = we(o.kind, o.name.trim(), o.icon, o.areaId);
				t.floorId = o.floorId, t.background = o.background || void 0, e.sections.push(t), B.value = {
					type: "section",
					id: t.id
				};
			}
		}), s());
	}, u = (e) => Mn((t) => {
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
				confirm(`Delete ${a.name} and its cards from the dashboard? Nothing is deleted from Home Assistant.`) && (Mn((e) => e.sections = e.sections.filter((e) => e.id !== a.id)), s());
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
				children: /* @__PURE__ */ U(Bn, {
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
				children: /* @__PURE__ */ U(Un, {
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
function ar(e, t, n = 24, r = 5) {
	let [i, a] = k(null);
	return A(() => {
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
function or(e) {
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
var sr = N(null), cr = N(null), lr = N(null);
function ur(e) {
	if (!e) return;
	let t = P(e.entity_id);
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
function dr(e, t, n, r) {
	let i = e.states[t], a = n?.tap ?? "auto";
	if (a === "none") return;
	if (a === "details") {
		sr.value = {
			entity: t,
			card: n,
			room: r
		};
		return;
	}
	if (a === "more-info") {
		Fn(t);
		return;
	}
	let o = a === "toggle" ? "toggle" : Ht(t, i);
	if (F(i) && o !== "details") {
		V(`${I(e, t, n)} is unavailable`, "error");
		return;
	}
	let s = P(t);
	switch (o) {
		case "toggle":
			s === "cover" || s === "valve" ? H(s, i.state === "open" || i.state === "opening" ? `close_${s}` : `open_${s}`, { entity_id: t }) : s === "lock" ? i.state === "locked" ? cr.value = t : H("lock", "lock", { entity_id: t }) : e.services[s]?.toggle ? H(s, "toggle", { entity_id: t }) : H("homeassistant", "toggle", { entity_id: t });
			return;
		case "weather":
		case "calendar":
		case "todo":
			lr.value = {
				kind: o,
				entity: t
			};
			return;
		case "activate":
			H(s, "turn_on", { entity_id: t }), V(`${I(e, t, n)} activated`);
			return;
		case "press":
			H(s, "press", { entity_id: t });
			return;
		case "lock":
			i.state === "locked" ? cr.value = t : H("lock", "lock", { entity_id: t });
			return;
		case "media":
			H("media_player", "media_play_pause", { entity_id: t });
			return;
		default: sr.value = {
			entity: t,
			card: n,
			room: r
		};
	}
}
function fr(e) {
	let t = L.value, { card: n } = e, r = t.states[n.entity], i = Vt(r), a = Kt(n.entity, r), o = n.color ?? ur(r), s = n.color ?? Wt[a], c = n.color ? `linear-gradient(135deg,${n.color} 0%,color-mix(in srgb,${n.color} 60%,#000) 100%)` : Gt[a], l = I(t, n.entity, n, e.room), u = P(n.entity), d = Wn(() => !e.editing && (sr.value = {
		entity: n.entity,
		card: n,
		room: e.room
	}), () => e.editing ? e.onEdit?.() : dr(t, n.entity, n, e.room));
	return /* @__PURE__ */ U("div", {
		class: [
			"tile",
			`size-${n.size}`,
			`d-${u}`,
			`cat-${a}`,
			i ? "active" : "",
			F(r) ? "unavailable" : "",
			e.editing ? "editing" : "",
			e.dragging ? "dragging" : ""
		].join(" "),
		"data-index": e.index,
		style: `--cat:${s};--grad:${c};${o ? `--tile-active:${o};` : ""}`,
		role: "button",
		tabIndex: 0,
		"aria-label": `${l}, ${nn(t, r)}`,
		onKeyDown: (r) => {
			(r.key === "Enter" || r.key === " ") && (r.preventDefault(), e.editing ? e.onEdit?.() : dr(t, n.entity, n, e.room));
		},
		...d,
		children: [e.editing && /* @__PURE__ */ U(x, { children: [/* @__PURE__ */ U("button", {
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
		})] }), n.size !== "sm" && !e.editing ? /* @__PURE__ */ U(hr, {
			h: t,
			card: n,
			s: r,
			name: l
		}) : /* @__PURE__ */ U(mr, {
			h: t,
			card: n,
			s: r,
			name: l
		})]
	});
}
function pr({ h: e, card: t, s: n, name: r }) {
	return /* @__PURE__ */ U(x, { children: [/* @__PURE__ */ U("div", {
		class: "tile-icon",
		children: /* @__PURE__ */ U(W, {
			icon: $t(e, t.entity, t),
			size: t.size === "sm" ? 24 : 26
		})
	}), /* @__PURE__ */ U("div", {
		class: "tile-text",
		children: [/* @__PURE__ */ U("div", {
			class: "tile-name",
			children: r
		}), /* @__PURE__ */ U("div", {
			class: "tile-state",
			children: nn(e, n)
		})]
	})] });
}
function mr(e) {
	return P(e.card.entity) === "sensor" && e.s && !F(e.s) && !Number.isNaN(Number(e.s.state)) ? /* @__PURE__ */ U(x, { children: [/* @__PURE__ */ U("div", {
		class: "tile-icon",
		children: /* @__PURE__ */ U(W, {
			icon: $t(e.h, e.card.entity, e.card),
			size: 24
		})
	}), /* @__PURE__ */ U("div", {
		class: "tile-text",
		children: [/* @__PURE__ */ U("div", {
			class: "tile-value",
			children: nn(e.h, e.s)
		}), /* @__PURE__ */ U("div", {
			class: "tile-name",
			children: e.name
		})]
	})] }) : /* @__PURE__ */ U(pr, { ...e });
}
function hr(e) {
	switch (P(e.card.entity)) {
		case "light": return /* @__PURE__ */ U(gr, { ...e });
		case "fan": return /* @__PURE__ */ U(_r, { ...e });
		case "cover": return /* @__PURE__ */ U(vr, { ...e });
		case "climate": return /* @__PURE__ */ U(xr, { ...e });
		case "media_player": return /* @__PURE__ */ U(Cr, { ...e });
		case "camera": return /* @__PURE__ */ U(Tr, { ...e });
		case "sensor": return /* @__PURE__ */ U(Er, { ...e });
		case "water_heater": return /* @__PURE__ */ U(Dr, { ...e });
		case "weather": return /* @__PURE__ */ U(Or, { ...e });
		default: return /* @__PURE__ */ U("div", {
			class: "big-body",
			children: /* @__PURE__ */ U(pr, { ...e })
		});
	}
}
function gr(e) {
	let t = e.s, n = t?.state === "on" && t?.attributes.brightness != null ? Math.round(t.attributes.brightness / 255 * 100) : 0, r = (t?.attributes.supported_color_modes ?? []).some((e) => e !== "onoff");
	return /* @__PURE__ */ U("div", {
		class: "big-body",
		children: [/* @__PURE__ */ U("div", {
			class: "big-top",
			children: /* @__PURE__ */ U(pr, { ...e })
		}), r && !F(t) && /* @__PURE__ */ U(J, {
			value: n,
			min: 1,
			max: 100,
			label: `${e.name} brightness`,
			color: ur(t),
			format: (e) => `${e}%`,
			onCommit: (t) => H("light", "turn_on", {
				entity_id: e.card.entity,
				brightness_pct: t
			})
		})]
	});
}
function _r(e) {
	let t = e.s, n = t?.state === "on" ? t.attributes.percentage ?? 100 : 0, r = t?.attributes.percentage_step ?? 1;
	return /* @__PURE__ */ U("div", {
		class: "big-body",
		children: [/* @__PURE__ */ U("div", {
			class: "big-top",
			children: /* @__PURE__ */ U(pr, { ...e })
		}), t?.attributes.percentage !== void 0 && !F(t) && /* @__PURE__ */ U(J, {
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
function vr(e) {
	let t = e.s, n = e.card.entity;
	return /* @__PURE__ */ U("div", {
		class: "big-body cover-big",
		children: [/* @__PURE__ */ U("div", {
			class: "big-top",
			children: /* @__PURE__ */ U(pr, { ...e })
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
function yr(e, t) {
	let n = e.states[t]?.attributes ?? {}, [r, i] = k(null), a = qe(void 0), o = n.target_temp_step ?? (e.config.unit_system.temperature === "°F" ? 1 : .5), s = n.min_temp ?? 7, c = n.max_temp ?? 35, l = n.temperature == null && n.target_temp_low != null && n.target_temp_high != null, u = l ? [n.target_temp_low, n.target_temp_high] : n.temperature == null ? null : [n.temperature, n.temperature], d = r ?? u, f = (e) => Math.min(c, Math.max(s, Math.round(e / o) * o));
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
function br({ h: e, entityId: t, big: n }) {
	let r = e.states[t], { shown: i, label: a, isRange: o, nudge: s, min: c, max: l } = yr(e, t), u = r?.attributes.current_temperature, d = (e) => Math.min(1, Math.max(0, (e - c) / (l - c))), f = i && o ? d(i[0]) : 0, p = i ? d(i[1]) : 0, m = 2 * Math.PI * 52, h = m * .75, g = ur(r) ?? "var(--accent)";
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
function xr(e) {
	return /* @__PURE__ */ U("div", {
		class: "big-body climate-big",
		children: [/* @__PURE__ */ U("div", {
			class: "big-top",
			children: /* @__PURE__ */ U(pr, { ...e })
		}), !F(e.s) && /* @__PURE__ */ U(br, {
			h: e.h,
			entityId: e.card.entity
		})]
	});
}
function Sr({ h: e, entityId: t, showVolume: n }) {
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
function Cr(e) {
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
					}) : /* @__PURE__ */ U(W, { icon: $t(e.h, e.card.entity, e.card) })
				}), /* @__PURE__ */ U("div", {
					class: "tile-text",
					children: [/* @__PURE__ */ U("div", {
						class: "tile-name",
						children: t?.attributes.media_title ?? e.name
					}), /* @__PURE__ */ U("div", {
						class: "tile-state",
						children: t?.attributes.media_artist ?? nn(e.h, t)
					})]
				})]
			}),
			!F(t) && t?.state !== "off" && /* @__PURE__ */ U(Sr, {
				h: e.h,
				entityId: e.card.entity,
				showVolume: e.card.size === "wide"
			})
		]
	});
}
function wr({ h: e, entityId: t, live: n }) {
	let [r, i] = k(0), [a, o] = k(!1);
	A(() => {
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
function Tr(e) {
	return /* @__PURE__ */ U("div", {
		class: "big-body camera-big",
		children: [/* @__PURE__ */ U(wr, {
			h: e.h,
			entityId: e.card.entity,
			live: e.card.live
		}), /* @__PURE__ */ U("div", {
			class: "camera-label",
			children: [e.card.live && /* @__PURE__ */ U("span", { class: "live-dot" }), e.name]
		})]
	});
}
function Er(e) {
	let t = e.s && !Number.isNaN(Number(e.s.state));
	return /* @__PURE__ */ U("div", {
		class: `big-body sensor-big ${t ? "with-chart" : ""}`,
		children: [/* @__PURE__ */ U("div", {
			class: "big-top",
			children: [
				/* @__PURE__ */ U("div", {
					class: "tile-icon",
					children: /* @__PURE__ */ U(W, { icon: $t(e.h, e.card.entity, e.card) })
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
					children: nn(e.h, e.s)
				})
			]
		}), t && /* @__PURE__ */ U(kr, {
			h: e.h,
			entityId: e.card.entity,
			now: Number(e.s.state)
		})]
	});
}
function Dr(e) {
	let t = e.s?.attributes ?? {};
	return /* @__PURE__ */ U("div", {
		class: "big-body",
		children: [
			/* @__PURE__ */ U("div", {
				class: "big-top",
				children: /* @__PURE__ */ U(pr, { ...e })
			}),
			/* @__PURE__ */ U("div", {
				class: "big-number",
				children: [t.current_temperature == null ? t.temperature == null ? "—" : `${t.temperature}°` : `${Math.round(t.current_temperature)}°`, /* @__PURE__ */ U("span", {
					class: "big-number-label",
					children: t.current_temperature == null ? "Target" : "Water now"
				})]
			}),
			t.temperature != null && !F(e.s) && /* @__PURE__ */ U(J, {
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
function Or(e) {
	let t = e.s?.attributes ?? {};
	return /* @__PURE__ */ U("div", {
		class: "big-body weather-big",
		children: [/* @__PURE__ */ U("div", {
			class: "big-top",
			children: [
				/* @__PURE__ */ U("div", {
					class: "tile-icon",
					children: /* @__PURE__ */ U(W, { icon: $t(e.h, e.card.entity, e.card) })
				}),
				/* @__PURE__ */ U("div", {
					class: "tile-text",
					children: [/* @__PURE__ */ U("div", {
						class: "tile-name",
						children: e.name
					}), /* @__PURE__ */ U("div", {
						class: "tile-state",
						children: nn(e.h, e.s).split(" · ")[1] ?? ""
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
function kr({ h: e, entityId: t, now: n }) {
	let r = ar(e, t, 24, 5);
	return r ? /* @__PURE__ */ U(or, {
		points: r,
		now: n,
		class: "tile-chart",
		showDot: !0
	}) : /* @__PURE__ */ U("div", { class: "chart-space" });
}
// src/components/details.tsx
var Ar = [
	[0, 0],
	[30, 90],
	[50, 90],
	[120, 70],
	[180, 80],
	[220, 90],
	[270, 80],
	[320, 80]
], jr = (e) => e.replace(/_/g, " ").replace(/\b\w/g, (e) => e.toUpperCase());
function Mr(e) {
	let t = (Date.now() - new Date(e).getTime()) / 1e3;
	return t < 60 ? "just now" : t < 3600 ? `${Math.floor(t / 60)} min ago` : t < 86400 ? `${Math.floor(t / 3600)} h ago` : `${Math.floor(t / 86400)} d ago`;
}
function Nr() {
	let e = sr.value, t = L.value;
	if (!e || !t) return null;
	let n = t.states[e.entity], r = I(t, e.entity, e.card, e.room), i = () => sr.value = null;
	return /* @__PURE__ */ U(Y, {
		title: r,
		onClose: i,
		footer: /* @__PURE__ */ U(x, { children: [/* @__PURE__ */ U("span", {
			class: "muted",
			children: n ? `Changed ${Mr(n.last_changed)}` : ""
		}), /* @__PURE__ */ U(K, {
			kind: "ghost",
			icon: "mdi:open-in-new",
			onClick: () => {
				i(), Fn(e.entity);
			},
			children: "Home Assistant details"
		})] }),
		children: [/* @__PURE__ */ U("div", {
			class: "detail-head",
			style: ur(n) ? `--tile-active:${ur(n)}` : void 0,
			children: [/* @__PURE__ */ U("div", {
				class: `tile-icon big ${Vt(n) ? "active" : ""}`,
				children: /* @__PURE__ */ U(W, {
					icon: $t(t, e.entity, e.card),
					size: 32
				})
			}), /* @__PURE__ */ U("div", {
				class: "detail-state",
				children: nn(t, n)
			})]
		}), n && !F(n) ? /* @__PURE__ */ U(Pr, {
			h: t,
			s: n
		}) : /* @__PURE__ */ U("p", {
			class: "muted",
			children: "This device is not responding right now."
		})]
	});
}
function Pr({ h: e, s: t }) {
	let n = t.entity_id, r = P(n), i = t.attributes;
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
					/* @__PURE__ */ U(Lr, { s: t }),
					r && /* @__PURE__ */ U(Rr, {
						label: "Brightness",
						children: /* @__PURE__ */ U(J, {
							value: s,
							min: 1,
							max: 100,
							color: ur(t),
							format: (e) => `${e}%`,
							onCommit: (e) => H("light", "turn_on", {
								entity_id: n,
								brightness_pct: e
							})
						})
					}),
					a && /* @__PURE__ */ U(Rr, {
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
					o && /* @__PURE__ */ U(Rr, {
						label: "Colour",
						children: /* @__PURE__ */ U("div", {
							class: "swatches",
							children: Ar.map(([e, t], r) => r === 0 ? /* @__PURE__ */ U("button", {
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
					i.effect_list?.length > 0 && /* @__PURE__ */ U(zr, {
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
				/* @__PURE__ */ U(Lr, { s: t }),
				i.percentage !== void 0 && /* @__PURE__ */ U(Rr, {
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
				i.preset_modes?.length > 0 && /* @__PURE__ */ U(zr, {
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
				i.current_position != null && /* @__PURE__ */ U(Rr, {
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
				i.current_tilt_position != null && /* @__PURE__ */ U(Rr, {
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
				/* @__PURE__ */ U(br, {
					h: e,
					entityId: n,
					big: !0
				}),
				i.hvac_modes?.length > 0 && /* @__PURE__ */ U(zr, {
					label: "Mode",
					value: t.state,
					options: i.hvac_modes,
					onPick: (e) => H("climate", "set_hvac_mode", {
						entity_id: n,
						hvac_mode: e
					})
				}),
				i.preset_modes?.length > 0 && /* @__PURE__ */ U(zr, {
					label: "Preset",
					value: i.preset_mode,
					options: i.preset_modes,
					onPick: (e) => H("climate", "set_preset_mode", {
						entity_id: n,
						preset_mode: e
					})
				}),
				i.fan_modes?.length > 0 && /* @__PURE__ */ U(zr, {
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
					/* @__PURE__ */ U(Sr, {
						h: e,
						entityId: n,
						showVolume: !0
					}),
					i.source_list?.length > 0 && /* @__PURE__ */ U(zr, {
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
					onClick: () => cr.value = n,
					children: "Unlock"
				})]
			})
		});
		case "alarm_control_panel": return /* @__PURE__ */ U(Br, { s: t });
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
			children: /* @__PURE__ */ U(zr, {
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
			children: /* @__PURE__ */ U(wr, {
				h: e,
				entityId: n,
				live: !0
			})
		});
		case "water_heater": return /* @__PURE__ */ U("div", {
			class: "controls",
			children: [
				i.temperature != null && /* @__PURE__ */ U(Rr, {
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
				i.operation_list?.length > 0 && /* @__PURE__ */ U(zr, {
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
				/* @__PURE__ */ U(Lr, { s: t }),
				i.humidity != null && /* @__PURE__ */ U(Rr, {
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
				i.available_modes?.length > 0 && /* @__PURE__ */ U(zr, {
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
			children: [/* @__PURE__ */ U(Fr, { s: t }), /* @__PURE__ */ U("div", {
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
		case "text": return /* @__PURE__ */ U(Ir, { s: t });
		case "update": return /* @__PURE__ */ U("div", {
			class: "controls",
			children: [
				/* @__PURE__ */ U("p", { children: [
					"Installed ",
					/* @__PURE__ */ U("strong", { children: i.installed_version ?? "—" }),
					t.state === "on" && /* @__PURE__ */ U(x, { children: [
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
		case "sensor": return /* @__PURE__ */ U(Vr, {
			h: e,
			entityId: n,
			unit: i.unit_of_measurement
		});
		default: return e.services[r]?.toggle ? /* @__PURE__ */ U("div", {
			class: "controls",
			children: /* @__PURE__ */ U(Lr, { s: t })
		}) : null;
	}
}
function Fr({ s: e }) {
	let [, t] = k(0);
	A(() => {
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
function Ir({ s: e }) {
	let [t, n] = k(e.state), r = P(e.entity_id), i = () => H(r, "set_value", {
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
function Lr({ s: e }) {
	let t = P(e.entity_id);
	return /* @__PURE__ */ U("div", {
		class: "control-row",
		children: [/* @__PURE__ */ U("span", { children: e.state === "on" ? "On" : "Off" }), /* @__PURE__ */ U(q, {
			checked: e.state === "on",
			onChange: () => H(t, "toggle", { entity_id: e.entity_id })
		})]
	});
}
function Rr({ label: e, children: t }) {
	return /* @__PURE__ */ U("div", {
		class: "labeled",
		children: [/* @__PURE__ */ U("div", {
			class: "labeled-label",
			children: e
		}), t]
	});
}
function zr({ label: e, value: t, options: n, onPick: r }) {
	return /* @__PURE__ */ U(Rr, {
		label: e,
		children: /* @__PURE__ */ U("div", {
			class: "chips",
			children: n.map((e) => /* @__PURE__ */ U("button", {
				type: "button",
				class: `chip ${e === t ? "selected" : ""}`,
				onClick: () => r(e),
				children: jr(e)
			}))
		})
	});
}
function Br({ s: e }) {
	let [t, n] = k(""), r = e.entity_id, i = !!e.attributes.code_format, a = e.attributes.supported_features ?? 0, o = (e) => {
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
function Vr({ h: e, entityId: t, unit: n }) {
	let r = ar(e, t, 24, 5);
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
			/* @__PURE__ */ U(or, {
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
function Hr() {
	let e = cr.value, t = L.value;
	if (!e || !t) return null;
	let n = () => cr.value = null;
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
// src/components/irrigation.tsx
var Ur = N(null);
function Wr() {
	let e = L.value;
	return A(() => {
		if (!e) return;
		let t, n = !0;
		return e.connection.subscribeMessage((e) => n && (Ur.value = e), { type: "dashforge/irrigation/subscribe" }).then((e) => {
			n ? t = e : e();
		}).catch(() => void 0), () => {
			n = !1, t?.().catch(() => void 0);
		};
	}, [!!e]), null;
}
async function Gr(e, t) {
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
async function Kr(e = !1) {
	try {
		await L.value.callWS({
			type: "dashforge/irrigation/stop",
			skip: e
		});
	} catch (e) {
		V(e?.message ?? "Could not stop watering", "error");
	}
}
function qr(e) {
	let [, t] = k(0);
	A(() => {
		if (!e) return;
		let n = window.setInterval(() => t((e) => e + 1), 1e3);
		return () => clearInterval(n);
	}, [e]);
}
var Jr = (e) => `${Math.floor(e / 60)}:${String(Math.floor(e % 60)).padStart(2, "0")}`;
function Yr({ cfg: e }) {
	let t = L.value, n = Ur.value, r = n?.active ?? null;
	qr(!!r);
	let [i, a] = k(e.irrigation.minutes), o = e.irrigation.zones.filter((e) => t.states[e]), s = e.irrigation.presets.length ? e.irrigation.presets : [
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
	let u = o.filter((e) => Vt(t.states[e]) && e !== r?.entity_id);
	return /* @__PURE__ */ U("div", {
		class: "irrigation",
		children: [
			/* @__PURE__ */ U("div", {
				class: `irr-status ${r ? "running" : ""}`,
				children: [r ? /* @__PURE__ */ U(x, { children: [/* @__PURE__ */ U("div", {
					class: "irr-status-head",
					children: [
						/* @__PURE__ */ U(W, {
							icon: "mdi:sprinkler-variant",
							size: 30
						}),
						/* @__PURE__ */ U("div", {
							class: "irr-status-text",
							children: [/* @__PURE__ */ U("strong", { children: I(t, r.entity_id) }), /* @__PURE__ */ U("span", { children: [
								Jr(c),
								" left",
								n.queue.length > 0 && ` · then ${n.queue.map((e) => I(t, e)).join(", ")}`
							] })]
						}),
						/* @__PURE__ */ U("div", {
							class: "btn-row",
							children: [n.queue.length > 0 && /* @__PURE__ */ U(K, {
								icon: "mdi:skip-next",
								onClick: () => Kr(!0),
								children: "Next zone"
							}), /* @__PURE__ */ U(K, {
								kind: "danger",
								icon: "mdi:stop",
								onClick: () => Kr(),
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
							onClick: () => Gr(o, i),
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
					u.map((e) => I(t, e)).join(", "),
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
					let a = t.states[e], o = r?.entity_id === e, l = n?.queue.includes(e), u = Vt(a);
					return /* @__PURE__ */ U("div", {
						class: `zone ${o ? "running" : ""} ${u ? "on" : ""} ${F(a) ? "unavailable" : ""}`,
						children: [
							/* @__PURE__ */ U("div", {
								class: "zone-head",
								children: [
									/* @__PURE__ */ U("span", {
										class: "zone-num",
										children: i + 1
									}),
									/* @__PURE__ */ U(W, {
										icon: $t(t, e),
										size: 22
									}),
									/* @__PURE__ */ U("span", {
										class: "zone-name",
										children: I(t, e)
									})
								]
							}),
							/* @__PURE__ */ U("div", {
								class: "zone-state",
								children: o ? `Watering · ${Jr(c)} left` : l ? "Waiting in line" : u ? "On" : F(a) ? "Unavailable" : "Off"
							}),
							o ? /* @__PURE__ */ U(K, {
								kind: "danger",
								icon: "mdi:stop",
								onClick: () => Kr(),
								children: "Stop"
							}) : /* @__PURE__ */ U("div", {
								class: "chips",
								children: s.map((t) => /* @__PURE__ */ U("button", {
									type: "button",
									class: "chip",
									disabled: F(a),
									onClick: () => Gr([e], t),
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
function Xr(e, t) {
	return t.floorId ? t.floorId : t.areaId ? e.areas?.[t.areaId]?.floor_id ?? null : null;
}
function Zr(e, t) {
	let n = e.floors ?? {}, r = /* @__PURE__ */ new Map();
	for (let i of t) {
		let t = Xr(e, i), a = t && n[t] ? t : null;
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
var Qr = (e, t) => Zr(e, t).filter((e) => e.id !== null).length > 0, $r = (e) => e.cards.filter((e) => !e.hidden);
function ei(e, t) {
	let n = $r(t), r = [], i = n.find((t) => P(t.entity) === "sensor" && e.states[t.entity]?.attributes.device_class === "temperature"), a = n.find((t) => P(t.entity) === "climate" && e.states[t.entity]?.attributes.current_temperature != null);
	i ? r.push(nn(e, e.states[i.entity])) : a && r.push(`${e.states[a.entity].attributes.current_temperature}°`);
	let o = n.find((t) => P(t.entity) === "sensor" && e.states[t.entity]?.attributes.device_class === "humidity");
	o && r.push(nn(e, e.states[o.entity]));
	let s = n.filter((t) => P(t.entity) === "light" && Vt(e.states[t.entity])).length;
	s && r.push(s === 1 ? "1 light on" : `${s} lights on`);
	let c = n.filter((t) => {
		let n = e.states[t.entity];
		return P(t.entity) === "binary_sensor" && n?.state === "on" && [
			"door",
			"window",
			"garage_door",
			"opening"
		].includes(n.attributes.device_class);
	}).length;
	return c && r.push(`${c} open`), r.join(" · ");
}
function ti(e, t) {
	return $r(t).map((e) => e.entity).filter((t) => P(t) === "light" && e.states[t]);
}
function ni(e, t) {
	H("light", t.some((t) => Vt(e.states[t])) ? "turn_off" : "turn_on", { entity_id: t });
}
function ri({ section: e }) {
	let t = L.value;
	if (e.kind !== "room") return null;
	let n = ti(t, e), r = ei(t, e);
	if (!n.length && !r) return null;
	let i = n.some((e) => Vt(t.states[e]));
	return /* @__PURE__ */ U("div", {
		class: "room-controls",
		children: [r && /* @__PURE__ */ U("span", {
			class: "room-status",
			children: r
		}), n.length > 0 && /* @__PURE__ */ U("button", {
			type: "button",
			class: `room-lights ${i ? "on" : ""}`,
			onClick: () => ni(t, n),
			children: [/* @__PURE__ */ U(W, {
				icon: i ? "mdi:lightbulb-group" : "mdi:lightbulb-group-off-outline",
				size: 18
			}), i ? "Lights off" : "Lights on"]
		})]
	});
}
var ii = N(null);
function ai(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of e.sections) for (let e of r.cards) e.hidden || t.has(e.entity) || (t.add(e.entity), n.push(e));
	return n;
}
function oi(e, t) {
	let n = ai(t).map((e) => e.entity).filter((t) => e.states[t]), r = (t) => e.states[t], i = [], a = (e) => () => B.value = e, o = n.filter((e) => P(e) === "sensor" && r(e).attributes.device_class === "temperature").map((e) => Number(r(e).state)).filter((e) => !Number.isNaN(e)), s = n.filter((e) => P(e) === "climate");
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
	let c = n.filter((e) => P(e) === "light" && Vt(r(e)));
	n.some((e) => P(e) === "light") && i.push({
		key: "lights",
		icon: c.length ? "mdi:lightbulb-group" : "mdi:lightbulb-group-off-outline",
		label: "Lights",
		value: c.length ? `${c.length} on` : "All off",
		tone: c.length ? "on" : void 0,
		onTap: c.length ? () => ii.value = c : void 0
	});
	let l = n.filter((e) => P(e) === "lock" && r(e).state !== "locked"), u = n.find((e) => P(e) === "alarm_control_panel"), d = n.filter((e) => P(e) === "binary_sensor" && r(e).state === "on" && [
		"door",
		"window",
		"garage_door",
		"opening"
	].includes(r(e).attributes.device_class)), f = n.filter((e) => P(e) === "cover" && r(e).attributes.device_class === "garage" && r(e).state !== "closed");
	if (l.length || u || d.length || f.length || n.some((e) => P(e) === "lock")) {
		let n = [];
		l.length && n.push(`${l.length} unlocked`), d.length + f.length && n.push(`${d.length + f.length} open`), n.length || n.push(u ? nn(e, r(u)) : "Locked"), i.push({
			key: "security",
			icon: l.length || d.length || f.length ? "mdi:shield-alert" : "mdi:shield-check",
			label: "Security",
			value: n.join(" · "),
			tone: l.length || d.length || f.length ? "warn" : void 0,
			onTap: t.builtinPages.security ? a({ type: "security" }) : void 0
		});
	}
	let p = n.filter((e) => P(e) === "media_player" && r(e).state === "playing");
	p.length && i.push({
		key: "media",
		icon: "mdi:play-circle",
		label: "Playing",
		value: p.length === 1 ? r(p[0]).attributes.media_title ?? I(e, p[0]) : `${p.length} speakers`,
		tone: "on",
		onTap: t.builtinPages.media ? a({ type: "media" }) : void 0
	});
	let m = Ur.value?.active;
	if (m) {
		let t = Math.max(0, Math.ceil((new Date(m.ends_at).getTime() - Date.now()) / 6e4));
		i.push({
			key: "water",
			icon: "mdi:sprinkler-variant",
			label: "Watering",
			value: `${I(e, m.entity_id)} · ${t} min`,
			tone: "on",
			onTap: a({ type: "irrigation" })
		});
	}
	return i;
}
function si({ cfg: e }) {
	let t = L.value, n = oi(t, e);
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
function ci() {
	let e = ii.value, t = L.value;
	if (!e || !t) return null;
	let n = () => ii.value = null;
	return /* @__PURE__ */ U(Y, {
		title: `Turn off ${e.length} ${e.length === 1 ? "light" : "lights"}?`,
		onClose: n,
		footer: /* @__PURE__ */ U(x, { children: [/* @__PURE__ */ U(K, {
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
			children: e.map((e) => /* @__PURE__ */ U("li", { children: I(t, e) }))
		})
	});
}
function li({ s: e }) {
	let t = L.value, n = ti(t, e), r = n.some((e) => Vt(t.states[e])), i = ei(t, e), a = e.background ? `background-image:linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.55)),url("${e.background.replace(/["\\]/g, "")}")` : void 0;
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
				onClick: () => ni(t, n)
			})]
		}), /* @__PURE__ */ U("div", { children: [/* @__PURE__ */ U("div", {
			class: "room-card-name",
			children: e.name
		}), /* @__PURE__ */ U("div", {
			class: "room-card-status",
			children: i || `${$r(e).length} devices`
		})] })]
	});
}
function ui({ cfg: e, renderCards: t }) {
	let n = L.value, r = e.home.favorites ? ai(e).filter((e) => e.favorite && n.states[e.entity]) : [], i = e.sections.filter((e) => e.kind === "room"), a = e.sections.filter((e) => e.kind === "page"), o = Zr(n, i), s = o.length > 1 || o[0]?.id !== null;
	return /* @__PURE__ */ U("div", {
		class: "home-view",
		children: [
			e.home.summary && /* @__PURE__ */ U(si, { cfg: e }),
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
					children: e.sections.map((e) => /* @__PURE__ */ U(li, { s: e }))
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
					children: a.map((e) => /* @__PURE__ */ U(li, { s: e }))
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
function di(e, t) {
	return (n) => {
		let r = Se(e());
		n(r), t(r);
	};
}
var fi = [
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
], pi = (e) => fi.find(([t]) => t.test(e))?.[1] ?? "mdi:home";
function mi(e, t, n, r) {
	let i = we("room", n, r || pi(n), t);
	return i.cards = on(e, t).filter((t) => un(e, t)).map((e) => Ce(e, pn(e))), i;
}
function hi(e, t) {
	if (t.sections.length) return;
	let n = e.floors ?? {}, r = Object.values(e.areas ?? {}).sort((e, t) => (n[e.floor_id ?? ""]?.level ?? 99) - (n[t.floor_id ?? ""]?.level ?? 99) || e.name.localeCompare(t.name));
	for (let n of r) on(e, n.area_id).length && t.sections.push(mi(e, n.area_id, n.name, n.icon));
	let i = Object.keys(e.states).find((e) => P(e) === "weather");
	i && (t.header.weatherEntity = i);
}
function gi({ cfg: e, set: t }) {
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
function _i({ cfg: e, set: t }) {
	let n = L.value, [r, i] = k(null), [a, o] = k(""), s = e.sections.filter((e) => e.kind === "room"), c = new Set(s.map((e) => e.areaId).filter(Boolean)), l = Object.values(n.areas ?? {}).filter((e) => !c.has(e.area_id)).sort((e, t) => e.name.localeCompare(t.name)), u = (e, n) => t((t) => {
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
			Zr(n, s).map((e) => /* @__PURE__ */ U("div", {
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
							r === e.id && /* @__PURE__ */ U(Un, {
								value: e.icon,
								onChange: (n) => t((t) => t.sections.find((t) => t.id === e.id).icon = n)
							})
						]
					});
				})]
			})),
			l.length > 0 && /* @__PURE__ */ U(x, { children: [/* @__PURE__ */ U("div", {
				class: "labeled-label",
				children: "Add an area from Home Assistant"
			}), /* @__PURE__ */ U("div", {
				class: "chips",
				children: l.map((e) => /* @__PURE__ */ U("button", {
					type: "button",
					class: "chip",
					onClick: () => t((t) => t.sections.push(mi(n, e.area_id, e.name, e.icon))),
					children: [
						/* @__PURE__ */ U(W, {
							icon: "mdi:plus",
							size: 16
						}),
						" ",
						e.name,
						/* @__PURE__ */ U("span", {
							class: "muted small",
							children: on(n, e.area_id).length
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
					e.preventDefault(), a.trim() && (t((e) => e.sections.push(we("room", a.trim(), pi(a)))), o(""));
				},
				children: [/* @__PURE__ */ U(Z, {
					value: a,
					onInput: o,
					placeholder: "e.g. Back yard"
				}), /* @__PURE__ */ U(K, {
					icon: "mdi:plus",
					disabled: !a.trim(),
					onClick: () => {
						t((e) => e.sections.push(we("room", a.trim(), pi(a)))), o("");
					},
					children: "Add room"
				})]
			})
		]
	});
}
var vi = {
	sm: "Small",
	md: "Medium",
	lg: "Large",
	wide: "Wide"
};
function yi({ cfg: e, set: t }) {
	let n = L.value, r = e.sections.filter((e) => e.kind === "room"), [i, a] = k(r[0]?.id ?? null), [o, s] = k(null), c = sn(n).length, l = (e, n) => t((t) => {
		let r = t.sections.find((t) => t.id === e);
		r.cards.some((e) => e.entity === n) ? r.cards = r.cards.filter((e) => e.entity !== n) : r.cards.push(Ce(n, pn(n)));
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
					let r = e.areaId ? on(n, e.areaId) : [], o = e.cards.map((e) => e.entity).filter((e) => !r.includes(e)), c = [...r, ...o], u = /* @__PURE__ */ new Map();
					for (let e of c) {
						let t = mn[P(e)] ?? P(e);
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
												for (let e of c) n.cards.some((t) => t.entity === e) || n.cards.push(Ce(e, pn(e)));
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
											children: [/* @__PURE__ */ U(Zn, {
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
												children: Object.keys(vi).map((e) => /* @__PURE__ */ U("option", {
													value: e,
													children: vi[e]
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
				children: /* @__PURE__ */ U(Xn, {
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
function bi({ cfg: e, set: t }) {
	let n = L.value, r = Object.keys(n.states).filter((e) => P(e) === "media_player").sort();
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
				children: /* @__PURE__ */ U(Xn, {
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
function xi({ domain: e, value: t, onChange: n, empty: r }) {
	let i = L.value, a = Object.keys(i.states).filter((t) => P(t) === e).sort();
	return a.length ? /* @__PURE__ */ U("div", {
		class: "check-list",
		children: a.map((e) => /* @__PURE__ */ U("label", {
			class: "check-item",
			children: [/* @__PURE__ */ U(Vn, {
				checked: t.includes(e),
				onChange: (r) => n(r ? [...t, e] : t.filter((t) => t !== e))
			}), /* @__PURE__ */ U("span", { children: I(i, e) })]
		}))
	}) : /* @__PURE__ */ U("p", {
		class: "muted small",
		children: r
	});
}
function Si({ cfg: e, set: t }) {
	let n = L.value, r = Object.keys(n.states).filter((e) => P(e) === "weather"), i = e.header.weatherEntity ?? (e.header.weatherFallback ? "__open_meteo" : "");
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
			/* @__PURE__ */ U(xi, {
				domain: "calendar",
				value: e.header.calendars,
				onChange: (e) => t((t) => t.header.calendars = e),
				empty: "No calendars in Home Assistant. Add one (Google, CalDAV, Local calendar…) to show events here."
			}),
			/* @__PURE__ */ U("div", {
				class: "labeled-label",
				children: "Reminders (to-do lists)"
			}),
			/* @__PURE__ */ U(xi, {
				domain: "todo",
				value: e.header.todoLists,
				onChange: (e) => t((t) => t.header.todoLists = e),
				empty: "No to-do lists in Home Assistant. Add the Local to-do or Shopping list integration to use reminders."
			})
		]
	});
}
var Ci = [
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
function wi({ id: e }) {
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
			e === "auto" && /* @__PURE__ */ U(x, { children: [
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
function Ti({ cfg: e, set: t }) {
	return /* @__PURE__ */ U("div", {
		class: "step",
		children: [
			/* @__PURE__ */ U("p", {
				class: "lead",
				children: "How should your rooms be arranged? Every screen follows the layout you pick."
			}),
			/* @__PURE__ */ U("div", {
				class: "choice-grid",
				children: Ci.map((n) => /* @__PURE__ */ U("button", {
					type: "button",
					class: `choice ${e.layout === n.id ? "selected" : ""}`,
					"aria-pressed": e.layout === n.id,
					onClick: () => t((e) => e.layout = n.id),
					children: [
						/* @__PURE__ */ U(wi, { id: n.id }),
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
				children: /* @__PURE__ */ U(Bn, {
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
function Ei({ id: e }) {
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
function Di({ cfg: e, set: t }) {
	let n = e.theme;
	return /* @__PURE__ */ U("div", {
		class: "step",
		children: [
			/* @__PURE__ */ U("p", {
				class: "lead",
				children: "Make it yours. Start from a style, then change anything you like. The preview updates as you choose."
			}),
			/* @__PURE__ */ U(X, {
				label: "Style",
				children: /* @__PURE__ */ U("div", {
					class: "choice-grid",
					children: ve.map((e) => /* @__PURE__ */ U("button", {
						type: "button",
						class: `choice ${n.style === e.id ? "selected" : ""}`,
						"aria-pressed": n.style === e.id,
						onClick: () => t((t) => Object.assign(t.theme, e.theme)),
						children: [
							/* @__PURE__ */ U(Ei, { id: e.id }),
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
				label: "Typeface",
				children: /* @__PURE__ */ U("div", {
					class: "font-grid",
					children: Te.map((e) => /* @__PURE__ */ U("button", {
						type: "button",
						class: `font-choice ${n.font === e.id ? "selected" : ""}`,
						"aria-pressed": n.font === e.id,
						style: `font-family:${ke(e.id).replace(/"/g, "'")}`,
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
				label: "Appearance",
				children: /* @__PURE__ */ U(Bn, {
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
					children: [ye.map((e) => /* @__PURE__ */ U("button", {
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
					children: [_e.map((e) => /* @__PURE__ */ U("button", {
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
				children: /* @__PURE__ */ U(Bn, {
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
function Oi({ cfg: e, set: t }) {
	let [n, r] = k(""), i = e.sections.filter((e) => e.kind === "page"), a = () => {
		n.trim() && (t((e) => e.sections.push(we("page", n.trim(), pi(n) === "mdi:home" ? "mdi:view-dashboard" : pi(n)))), r(""));
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
						children: [/* @__PURE__ */ U(Vn, {
							checked: e.home.summary,
							onChange: (e) => t((t) => t.home.summary = e)
						}), /* @__PURE__ */ U("span", { children: "Status chips (climate, lights, security, media, watering)" })]
					}),
					/* @__PURE__ */ U("label", {
						class: "check-item",
						children: [/* @__PURE__ */ U(Vn, {
							checked: e.home.favorites,
							onChange: (e) => t((t) => t.home.favorites = e)
						}), /* @__PURE__ */ U("span", { children: "Favourite cards" })]
					}),
					/* @__PURE__ */ U("label", {
						class: "check-item",
						children: [/* @__PURE__ */ U(Vn, {
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
			/* @__PURE__ */ U(Ai, {
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
function ki({ value: e, onCommit: t }) {
	let [n, r] = k(e.join(", ")), i = () => {
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
function Ai({ cfg: e, set: t }) {
	let n = L.value, r = Object.keys(n.states).filter((e) => Yt(n, e)), i = e.irrigation.zones, a = (e) => t((t) => {
		t.irrigation.zones = t.irrigation.zones.includes(e) ? t.irrigation.zones.filter((t) => t !== e) : [...t.irrigation.zones, e];
	});
	return /* @__PURE__ */ U(x, { children: [/* @__PURE__ */ U(Q, {
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
						children: I(n, e)
					}),
					/* @__PURE__ */ U(G, {
						icon: "mdi:arrow-up",
						label: "Run earlier",
						disabled: r === 0,
						onClick: () => t((e) => [e.irrigation.zones[r - 1], e.irrigation.zones[r]] = [e.irrigation.zones[r], e.irrigation.zones[r - 1]])
					}),
					/* @__PURE__ */ U(G, {
						icon: "mdi:close",
						label: `Remove ${I(n, e)}`,
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
				children: /* @__PURE__ */ U(Xn, {
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
				children: /* @__PURE__ */ U(ki, {
					value: e.irrigation.presets,
					onCommit: (e) => t((t) => t.irrigation.presets = e)
				})
			})
		]
	})] });
}
function ji({ cfg: e, set: t }) {
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
				children: /* @__PURE__ */ U(Bn, {
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
				children: /* @__PURE__ */ U(Bn, {
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
function Mi({ cfg: e }) {
	let t = e.sections.filter((e) => e.kind === "room"), n = e.sections.filter((e) => e.kind === "page"), r = e.sections.reduce((e, t) => e + t.cards.length, 0), i = [
		["Rooms", t.map((e) => e.name).join(", ") || "None"],
		["Devices", `${r} cards`],
		["Layout", Ci.find((t) => t.id === e.layout)?.name ?? e.layout],
		["Style", ve.find((t) => t.id === e.theme.style)?.name ?? "Custom"],
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
			children: i.map(([e, t]) => /* @__PURE__ */ U(x, { children: [/* @__PURE__ */ U("dt", { children: e }), /* @__PURE__ */ U("dd", { children: t })] }))
		})]
	});
}
// src/components/wizard.tsx
var $ = N(null), Ni = [
	{
		id: "welcome",
		title: "Welcome",
		icon: "mdi:hand-wave",
		C: gi
	},
	{
		id: "rooms",
		title: "Rooms",
		icon: "mdi:floor-plan",
		C: _i
	},
	{
		id: "devices",
		title: "Devices",
		icon: "mdi:devices",
		C: yi
	},
	{
		id: "scenes",
		title: "Scenes & media",
		icon: "mdi:palette",
		C: bi
	},
	{
		id: "widgets",
		title: "Header & widgets",
		icon: "mdi:weather-partly-cloudy",
		C: Si
	},
	{
		id: "layout",
		title: "Layout",
		icon: "mdi:view-quilt",
		C: Ti
	},
	{
		id: "theme",
		title: "Look & feel",
		icon: "mdi:brush",
		C: Di
	},
	{
		id: "pages",
		title: "Pages",
		icon: "mdi:book-open-page-variant",
		C: Oi
	},
	{
		id: "tablet",
		title: "Wall tablet",
		icon: "mdi:tablet",
		C: ji
	},
	{
		id: "review",
		title: "Review",
		icon: "mdi:check-decagram",
		C: Mi
	}
];
function Pi() {
	let e = R.value ? Se(R.value) : be();
	R.value || hi(L.value, e), $.value = e, Sn.value = !1, Cn.value = !0;
}
function Fi() {
	let [e, t] = k(0), [n, r] = k(!1), i = $.value;
	if (!i) return null;
	let a = di(() => $.value, (e) => $.value = e), o = Ni[e], s = e === Ni.length - 1, c = !R.value?.setupComplete;
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
			}), /* @__PURE__ */ U("ol", { children: Ni.map((n, r) => /* @__PURE__ */ U("li", { children: /* @__PURE__ */ U("button", {
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
					children: /* @__PURE__ */ U("div", { style: `width:${(e + 1) / Ni.length * 100}%` })
				}),
				/* @__PURE__ */ U("div", {
					class: "wizard-head",
					children: [/* @__PURE__ */ U("span", {
						class: "muted small",
						children: [
							"Step ",
							e + 1,
							" of ",
							Ni.length
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
							Cn.value = !1, $.value = null;
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
								let e = await An({
									...i,
									setupComplete: !0
								});
								r(!1), e && (Cn.value = !1, $.value = null, B.value = null, V("Your dashboard is ready"));
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
var Ii = Ni.filter((e) => e.id !== "review").map((e) => e.id === "welcome" ? {
	...e,
	title: "General",
	icon: "mdi:cog"
} : e);
function Li() {
	$.value = Se(R.value), Sn.value = !0;
}
function Ri() {
	let [e, t] = k("welcome"), [n, r] = k(!1), i = $.value;
	if (!i) return null;
	let a = di(() => $.value, (e) => $.value = e), o = () => {
		Sn.value = !1, $.value = null;
	}, s = async () => {
		r(!0);
		let e = await An(i);
		r(!1), e && (o(), V("Settings saved"));
	}, c = Ii.find((t) => t.id === e);
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
				children: [Ii.map((n) => /* @__PURE__ */ U("button", {
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
				}) : /* @__PURE__ */ U(zi, {
					cfg: i,
					onReplace: (e) => $.value = e
				})
			})]
		})
	});
}
function zi({ cfg: e, onReplace: t }) {
	let [n, r] = k(""), [i, a] = k(!1), o = () => {
		let t = new Blob([JSON.stringify(e, null, 2)], { type: "application/json" }), n = document.createElement("a");
		n.href = URL.createObjectURL(t), n.download = `dashforge-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`, n.click(), setTimeout(() => URL.revokeObjectURL(n.href), 1e3);
	}, s = (e) => {
		try {
			let n = JSON.parse(e);
			if (!n || !Array.isArray(n.sections)) throw Error("bad");
			t({
				...xe(n),
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
					onClick: Pi,
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
						await An(null) && (a(!1), Sn.value = !1, $.value = null);
					},
					children: "Reset"
				})] }),
				children: /* @__PURE__ */ U("p", { children: "This removes every room, page and setting from DashForge and starts the setup wizard. Nothing in Home Assistant itself is changed. Download a backup first if you might want it back." })
			})
		]
	});
}
// src/components/widgets.tsx
var Bi = N(null);
function Vi(e = 1e3) {
	let [t, n] = k(() => /* @__PURE__ */ new Date());
	return A(() => {
		let t = window.setInterval(() => n(/* @__PURE__ */ new Date()), e);
		return () => clearInterval(t);
	}, [e]), t;
}
function Hi(e, t, n) {
	return e.toLocaleTimeString(n, {
		hour: "numeric",
		minute: "2-digit",
		hour12: !t
	});
}
function Ui(e, t) {
	let n = e.getHours(), r = n < 5 ? "Good night" : n < 12 ? "Good morning" : n < 18 ? "Good afternoon" : "Good evening";
	return t ? `${r}, ${t}` : r;
}
var Wi = {
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
}, Gi = (e) => Wi[e] ?? "mdi:weather-partly-cloudy", Ki = (e) => e === "partlycloudy" ? "Partly cloudy" : e === "clear-night" ? "Clear" : e.replace(/-/g, " ").replace(/^\w/, (e) => e.toUpperCase());
function qi(e, t = !0) {
	return e === 0 ? t ? "sunny" : "clear-night" : e <= 2 ? "partlycloudy" : e === 3 ? "cloudy" : e === 45 || e === 48 ? "fog" : e >= 51 && e <= 67 ? e >= 65 ? "pouring" : "rainy" : e >= 71 && e <= 77 ? "snowy" : e >= 80 && e <= 82 ? e === 82 ? "pouring" : "rainy" : e === 85 || e === 86 ? "snowy" : e >= 95 ? "lightning-rainy" : "cloudy";
}
function Ji(e, t, n) {
	let [r, i] = k([]);
	return A(() => {
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
function Yi(e, t) {
	let [n, r] = k(null), i = e.config.unit_system.temperature === "°F";
	return A(() => {
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
					condition: qi(e.current.weather_code, !!e.current.is_day),
					temp: e.current.temperature_2m,
					hourly: e.hourly.time.slice(t, t + 24).map((n, r) => ({
						time: n,
						condition: qi(e.hourly.weather_code[t + r], !!e.hourly.is_day[t + r]),
						temp: e.hourly.temperature_2m[t + r],
						precip: e.hourly.precipitation_probability?.[t + r]
					})),
					daily: e.daily.time.map((t, n) => ({
						time: t,
						condition: qi(e.daily.weather_code[n]),
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
function Xi(e, t) {
	return Zi(e, t.header.weatherEntity, t.header.weatherFallback);
}
function Zi(e, t, n) {
	let r = t ? e.states[t] : void 0, i = Ji(e, t, "daily"), a = Ji(e, t, "hourly"), o = Yi(e, !r && n);
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
function Qi({ data: e, lang: t, h24: n, onClose: r }) {
	return /* @__PURE__ */ U(Y, {
		title: "Weather",
		onClose: r ?? (() => Bi.value = null),
		wide: !0,
		children: [
			/* @__PURE__ */ U("div", {
				class: "weather-now",
				children: [/* @__PURE__ */ U(W, {
					icon: Gi(e.condition),
					size: 56
				}), /* @__PURE__ */ U("div", { children: [/* @__PURE__ */ U("div", {
					class: "weather-temp",
					children: e.temp == null ? "—" : `${Math.round(e.temp)}${e.unit}`
				}), /* @__PURE__ */ U("div", {
					class: "muted",
					children: Ki(e.condition)
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
							children: Hi(new Date(e.time), n, t).replace(":00", "")
						}),
						/* @__PURE__ */ U(W, {
							icon: Gi(e.condition),
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
							icon: Gi(e.condition),
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
function $i(e) {
	if (e.dateTime) return [new Date(e.dateTime), !1];
	let [t, n, r] = (e.date ?? "").split("-").map(Number);
	return [new Date(t, n - 1, r), !0];
}
function ea(e, t, n, r, i = 0) {
	let [a, o] = k([]);
	return A(() => {
		if (!t.length) {
			o([]);
			return;
		}
		let i = !0, a = `start=${encodeURIComponent(n.toISOString())}&end=${encodeURIComponent(r.toISOString())}`;
		return Promise.all(t.map((t) => e.callApi("GET", `calendars/${t}?${a}`).then((e) => e.map((e) => {
			let [n, r] = $i(e.start), [i] = $i(e.end);
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
function ta(e, t, n) {
	return e.allDay ? "All day" : Hi(e.start, n, t);
}
function na({ cfg: e, lang: t, calendars: n, onClose: r }) {
	let i = L.value, [a, o] = k(() => {
		let e = /* @__PURE__ */ new Date();
		return new Date(e.getFullYear(), e.getMonth(), 1);
	}), [s, c] = k(() => (/* @__PURE__ */ new Date()).toDateString()), l = Je(() => {
		let e = new Date(a);
		return e.setDate(1 - e.getDay()), e;
	}, [a]), u = Je(() => {
		let e = new Date(l);
		return e.setDate(e.getDate() + 42), e;
	}, [l]), d = ea(i, n ?? e.header.calendars, l, u), f = /* @__PURE__ */ new Map();
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
		onClose: r ?? (() => Bi.value = null),
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
					children: ta(n, t, e.header.clock24h)
				}), /* @__PURE__ */ U("span", {
					class: "agenda-text",
					children: [/* @__PURE__ */ U("strong", { children: n.summary }), /* @__PURE__ */ U("span", {
						class: "muted small",
						children: [n.location, I(i, n.calendar)].filter(Boolean).join(" · ")
					})]
				})] }))
			})
		]
	});
}
function ra(e, t) {
	let [n, r] = k([]);
	return A(() => {
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
function ia(e, t) {
	return t.reduce((t, n) => t + (Number(e.states[n]?.state) || 0), 0);
}
function aa({ entityId: e }) {
	let t = L.value, n = ra(t, e), [r, i] = k(""), a = n.filter((e) => e.status === "needs_action"), o = n.filter((e) => e.status === "completed").slice(0, 5), s = () => {
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
						/* @__PURE__ */ U(Vn, {
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
						children: [/* @__PURE__ */ U(Vn, {
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
function oa({ cfg: e, lists: t, onClose: n }) {
	return /* @__PURE__ */ U(Y, {
		title: "Reminders",
		onClose: n ?? (() => Bi.value = null),
		wide: !0,
		children: (t ?? e.header.todoLists).map((e) => /* @__PURE__ */ U(aa, { entityId: e }))
	});
}
// src/components/layout.tsx
function sa(e) {
	let t = L.value, n = [];
	e.builtinPages.home && !bn.value && n.push({
		key: "home",
		view: { type: "home" },
		name: "Home",
		icon: "mdi:home-variant"
	});
	let r = e.sections.filter((e) => e.kind === "room"), i = e.sections.filter((e) => e.kind === "page"), a = Qr(t, r);
	for (let e of Zr(t, r)) for (let t of e.sections) n.push({
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
	return bn.value || (e.builtinPages.irrigation && e.irrigation.zones.length && n.push({
		key: "irrigation",
		view: { type: "irrigation" },
		name: "Irrigation",
		icon: "mdi:sprinkler-variant",
		group: a ? "Pages" : void 0
	}), e.builtinPages.media && ua(e).length && n.push({
		key: "media",
		view: { type: "media" },
		name: "Media",
		icon: "mdi:music-box-multiple",
		group: a ? "Pages" : void 0
	}), e.builtinPages.security && fa(e).length && n.push({
		key: "security",
		view: { type: "security" },
		name: "Security",
		icon: "mdi:shield-home",
		group: a ? "Pages" : void 0
	}), e.builtinPages.scenes && pa(e).length && n.push({
		key: "scenes",
		view: { type: "scenes" },
		name: "Scenes",
		icon: "mdi:palette",
		group: a ? "Pages" : void 0
	})), n;
}
var ca = (e) => e ? e.type === "section" ? e.id : e.type : "";
function la(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e.sections) for (let e of n.cards) e.hidden || t.add(e.entity);
	return [...t];
}
function ua(e) {
	let t = la(e).filter((e) => P(e) === "media_player");
	return e.header.mediaPlayer && !t.includes(e.header.mediaPlayer) && t.unshift(e.header.mediaPlayer), t;
}
var da = /* @__PURE__ */ new Set([
	"door",
	"garage_door",
	"window",
	"opening",
	"motion",
	"occupancy",
	"smoke",
	"moisture"
]);
function fa(e) {
	let t = L.value;
	return la(e).filter((e) => {
		let n = P(e);
		return n === "lock" || n === "alarm_control_panel" || n === "camera" || n === "binary_sensor" && da.has(t.states[e]?.attributes.device_class);
	});
}
function pa(e) {
	let t = L.value, n = /* @__PURE__ */ new Set([...e.header.sceneStrip, ...la(e).filter((e) => ["scene", "script"].includes(P(e)))]);
	for (let e of Object.keys(t.states)) P(e) === "scene" && an(t, e) && n.add(e);
	return [...n].filter((e) => t.states[e]);
}
function ma({ cfg: e }) {
	let t = L.value, n = t.locale?.language ?? t.language, r = Vi(e.header.clock ? 1e3 : 6e4), i = Xi(t, e), a = new Date(r.getFullYear(), r.getMonth(), r.getDate()), o = new Date(a.getTime() + 1728e5), s = ea(t, e.header.calendars, a, o, Math.floor(r.getTime() / 6e5)).find((e) => e.end > r), c = ia(t, e.header.todoLists), l = hn.value && !e.tablet.hideSidebar, u = e.header.mediaPlayer ? t.states[e.header.mediaPlayer] : void 0;
	return /* @__PURE__ */ U("header", {
		class: "header",
		children: [/* @__PURE__ */ U("div", {
			class: "header-left",
			children: [l && /* @__PURE__ */ U(G, {
				icon: "mdi:menu",
				label: "Home Assistant menu",
				onClick: () => In?.dispatchEvent(new Event("hass-toggle-menu", {
					bubbles: !0,
					composed: !0
				}))
			}), /* @__PURE__ */ U("div", { children: [/* @__PURE__ */ U("h1", {
				class: "title",
				children: e.header.greeting ? Ui(r, e.userName) : e.title
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
				children: Hi(r, e.header.clock24h, n)
			}), /* @__PURE__ */ U("div", {
				class: "header-chips",
				children: [
					i && /* @__PURE__ */ U("button", {
						type: "button",
						class: "chip-btn",
						onClick: () => Bi.value = "weather",
						children: [/* @__PURE__ */ U(W, {
							icon: Gi(i.condition),
							size: 22
						}), i.temp != null && /* @__PURE__ */ U("span", { children: [Math.round(i.temp), "°"] })]
					}),
					e.header.calendars.length > 0 && /* @__PURE__ */ U("button", {
						type: "button",
						class: "chip-btn event-chip",
						onClick: () => Bi.value = "calendar",
						children: [/* @__PURE__ */ U(W, {
							icon: "mdi:calendar",
							size: 20
						}), /* @__PURE__ */ U("span", {
							class: "ellipsis",
							children: s ? `${s.start.toDateString() === r.toDateString() || s.start < r ? "" : "Tomorrow · "}${ta(s, n, e.header.clock24h)} ${s.summary}` : "No events"
						})]
					}),
					e.header.todoLists.length > 0 && /* @__PURE__ */ U("button", {
						type: "button",
						class: "chip-btn",
						onClick: () => Bi.value = "todo",
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
					_n.value?.can_edit && !bn.value && /* @__PURE__ */ U(x, { children: [/* @__PURE__ */ U(G, {
						icon: "mdi:pencil",
						label: "Edit dashboard",
						onClick: jn
					}), /* @__PURE__ */ U(G, {
						icon: "mdi:cog",
						label: "Settings",
						onClick: Li
					})] })
				]
			})]
		})]
	});
}
function ha({ cfg: e }) {
	let t = L.value, n = e.header.sceneStrip.filter((e) => t.states[e]);
	return n.length ? /* @__PURE__ */ U("div", {
		class: "scene-strip",
		children: n.map((e) => /* @__PURE__ */ U("button", {
			type: "button",
			class: "scene-chip",
			onClick: () => H(P(e), "turn_on", { entity_id: e }),
			children: [/* @__PURE__ */ U(W, {
				icon: $t(t, e),
				size: 18
			}), I(t, e)]
		}))
	}) : null;
}
function ga({ cfg: e, vertical: t, current: n }) {
	let r = sa(e), i = n ?? ca(B.value);
	return /* @__PURE__ */ U("nav", {
		class: t ? "nav-vertical" : "nav-pills",
		"aria-label": "Rooms and pages",
		children: r.map((n, a) => {
			let o = e.sections.find((e) => e.id === n.key), s = o && t ? ei(L.value, o) : "";
			return /* @__PURE__ */ U(x, { children: [t && n.group && n.group !== r[a - 1]?.group && /* @__PURE__ */ U("div", {
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
var _a = [
	"sm",
	"md",
	"lg",
	"wide"
];
function va({ section: e, cards: t, room: n, list: r }) {
	let i = bn.value && !!e, [a, o] = k(null), s = qe(null), c = i ? t.filter((e) => !e.hidden) : t.filter((e) => !e.hidden && L.value.states[e.entity]), l = (t) => Mn((n) => {
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
				children: /* @__PURE__ */ U(fr, {
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
						n && (n.size = _a[(_a.indexOf(n.size) + 1) % _a.length]);
					}),
					onEdit: () => Kn.value = {
						sectionId: e.id,
						cardId: t.id
					}
				})
			}, t.id)),
			i && /* @__PURE__ */ U("button", {
				type: "button",
				class: "cell size-sm add-tile",
				onClick: () => Gn.value = e.id,
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
				}), /* @__PURE__ */ U("p", { children: ["Nothing here yet.", _n.value?.can_edit ? " Tap the pencil to add devices." : ""] })]
			})
		]
	});
}
var ya = (e, t = "sm") => e.map((e) => ({
	id: e,
	entity: e,
	size: t
}));
function ba({ cfg: e, v: t, list: n }) {
	if (t.type === "home") return /* @__PURE__ */ U(ui, {
		cfg: n ? {
			...e,
			home: {
				...e.home,
				rooms: !1
			}
		} : e,
		renderCards: (e) => /* @__PURE__ */ U(va, {
			cards: e,
			list: n
		})
	});
	if (t.type === "irrigation") return /* @__PURE__ */ U(Yr, { cfg: e });
	if (t.type === "section") {
		let r = e.sections.find((e) => e.id === t.id);
		return r ? /* @__PURE__ */ U(x, { children: [!bn.value && /* @__PURE__ */ U(ri, { section: r }), /* @__PURE__ */ U(va, {
			section: r,
			cards: r.cards,
			room: r.kind === "room" ? r.name : void 0,
			list: n
		})] }) : null;
	}
	if (t.type === "media") return /* @__PURE__ */ U(va, {
		cards: ya(ua(e), n ? "sm" : "wide"),
		list: n
	});
	if (t.type === "security") {
		let t = fa(e), r = (e) => [
			"alarm_control_panel",
			"lock",
			"binary_sensor",
			"camera"
		].indexOf(P(e));
		return t.sort((e, t) => r(e) - r(t)), /* @__PURE__ */ U(va, {
			cards: t.map((e) => ({
				id: e,
				entity: e,
				size: P(e) === "camera" && !n ? "wide" : "sm"
			})),
			list: n
		});
	}
	return /* @__PURE__ */ U(va, {
		cards: ya(pa(e)),
		list: n
	});
}
function xa(e, t) {
	return t.type === "section" ? e.sections.find((e) => e.id === t.id)?.name ?? "" : t.type === "home" ? e.title || "Home" : t.type === "irrigation" ? "Irrigation" : t.type === "media" ? "Media" : t.type === "security" ? "Security" : "Scenes";
}
function Sa(e) {
	return e.layout === "auto" ? gn.value >= 1100 ? "sidebar" : "grid" : e.layout;
}
function Ca({ cfg: e }) {
	let t = sa(e), n = B.value && t.some((e) => e.key === ca(B.value)) ? B.value : t[0]?.view;
	if (!n) return /* @__PURE__ */ U("div", {
		class: "empty big-empty",
		children: [
			/* @__PURE__ */ U(W, {
				icon: "mdi:home-plus-outline",
				size: 48
			}),
			/* @__PURE__ */ U("p", { children: "No rooms or pages yet." }),
			_n.value?.can_edit && /* @__PURE__ */ U("p", {
				class: "muted",
				children: "Open edit mode and add a room to get started."
			})
		]
	});
	let r = Sa(e), i = ca(n), a = n.type === "section" ? e.sections.find((e) => e.id === n.id) : void 0, o = r !== "list" && a?.background ? /* @__PURE__ */ U("div", {
		class: "room-wallpaper",
		style: `background-image:url("${a.background.replace(/["\\]/g, "")}")`
	}) : null;
	if (r === "list") return /* @__PURE__ */ U("div", {
		class: "layout-list",
		children: t.map((n, r) => /* @__PURE__ */ U(x, { children: [n.group && n.group !== t[r - 1]?.group && /* @__PURE__ */ U("h2", {
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
			}), /* @__PURE__ */ U(ba, {
				cfg: e,
				v: n.view,
				list: !0
			})]
		}, n.key)] }))
	});
	if (r === "sidebar" && !hn.value && gn.value >= 720) return /* @__PURE__ */ U("div", {
		class: "layout-sidebar",
		children: [
			o,
			/* @__PURE__ */ U(ga, {
				cfg: e,
				vertical: !0,
				current: i
			}),
			/* @__PURE__ */ U("main", {
				class: "content",
				children: [/* @__PURE__ */ U("h2", {
					class: "section-title",
					children: xa(e, n)
				}), /* @__PURE__ */ U(ba, {
					cfg: e,
					v: n
				})]
			})
		]
	});
	if (r === "focus") {
		let r = t.findIndex((e) => e.key === ca(n));
		return /* @__PURE__ */ U(x, { children: [o, /* @__PURE__ */ U(wa, {
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
			/* @__PURE__ */ U(ga, {
				cfg: e,
				current: i
			}),
			/* @__PURE__ */ U("main", {
				class: "content",
				children: /* @__PURE__ */ U(ba, {
					cfg: e,
					v: n
				})
			})
		]
	});
}
function wa(e) {
	let t = qe(null);
	return /* @__PURE__ */ U("div", {
		class: "layout-focus",
		onTouchStart: (e) => t.current = e.touches[0].clientX,
		onTouchEnd: (n) => {
			if (t.current === null || bn.value) return;
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
						children: xa(e.cfg, e.v)
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
				children: /* @__PURE__ */ U(ba, {
					cfg: e.cfg,
					v: e.v
				})
			})
		]
	});
}
// src/components/tablet.tsx
function Ta(e, t, n) {
	let r = qe(e);
	r.current = e, A(() => {
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
function Ea({ cfg: e }) {
	let [t, n] = k(!1);
	return Ta(() => n(!0), e.tablet.screensaverMinutes, e.tablet.screensaver && !t), Ta(() => B.value = null, e.tablet.returnHomeMinutes, e.tablet.returnHomeMinutes > 0), Oa(e.tablet.hideSidebar), t ? /* @__PURE__ */ U(Da, {
		cfg: e,
		onWake: () => n(!1)
	}) : null;
}
function Da({ cfg: e, onWake: t }) {
	let n = L.value, r = n.locale?.language ?? n.language, i = Vi(1e3), a = Xi(n, e), o = new Date(i.getFullYear(), i.getMonth(), i.getDate()), s = ea(n, e.header.calendars, o, new Date(o.getTime() + 864e5), Math.floor(i.getTime() / 6e5)).find((e) => e.end > i), c = e.tablet.screensaverStyle, l = [
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
					children: Hi(i, e.header.clock24h, r)
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
						icon: Gi(a.condition),
						size: 32
					}), a.temp != null && `${Math.round(a.temp)}°`] }), s && /* @__PURE__ */ U("span", { children: [
						/* @__PURE__ */ U(W, {
							icon: "mdi:calendar",
							size: 28
						}),
						" ",
						ta(s, r, e.header.clock24h),
						" ",
						s.summary
					] })]
				})
			]
		})
	});
}
function Oa(e) {
	A(() => {
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
function ka(e, t) {
	let n = e.theme, r;
	if (n.background === "image" && n.backgroundImage) r = `center / cover no-repeat url("${n.backgroundImage.replace(/["\\]/g, "")}")`;
	else {
		let e = _e.find((e) => e.id === n.background) ?? _e[0];
		r = t ? e.dark : e.light;
	}
	return `--accent:${n.accent};--radius:${n.radius}px;--page-bg:${r};--font:${ke(n.font).replace(/"/g, "'")};`;
}
function Aa({ cfg: e, children: t }) {
	let n = L.value, r = e.theme.mode === "dark" || e.theme.mode === "auto" && !!n.themes?.darkMode;
	return /* @__PURE__ */ U("div", {
		class: `df-root ${r ? "dark" : "light"} style-${e.theme.style ?? "dashforge"} cards-${e.theme.cardStyle} density-${e.theme.density} ${bn.value ? "editing" : ""}`,
		style: ka(e, r),
		children: [t, wn.value && /* @__PURE__ */ U("div", {
			class: `toast ${wn.value.kind}`,
			role: "status",
			children: wn.value.text
		})]
	});
}
function ja({ children: e }) {
	return /* @__PURE__ */ U("div", {
		class: "centered",
		children: e
	});
}
function Ma({ cfg: e, h: t }) {
	let n = lr.value, r = t.locale?.language ?? t.language, i = Zi(t, n?.kind === "weather" ? n.entity : void 0, !1);
	if (!n) return null;
	let a = () => lr.value = null;
	return n.kind === "weather" ? i ? /* @__PURE__ */ U(Qi, {
		data: i,
		lang: r,
		h24: e.header.clock24h,
		onClose: a
	}) : null : n.kind === "calendar" ? /* @__PURE__ */ U(na, {
		cfg: e,
		lang: r,
		calendars: [n.entity],
		onClose: a
	}) : /* @__PURE__ */ U(oa, {
		cfg: e,
		lists: [n.entity],
		onClose: a
	});
}
function Na({ cfg: e, h: t }) {
	let n = Xi(t, e), r = t.locale?.language ?? t.language;
	return /* @__PURE__ */ U(x, { children: [
		/* @__PURE__ */ U(Ma, {
			cfg: e,
			h: t
		}),
		Bi.value === "weather" && n && /* @__PURE__ */ U(Qi, {
			data: n,
			lang: r,
			h24: e.header.clock24h
		}),
		Bi.value === "calendar" && /* @__PURE__ */ U(na, {
			cfg: e,
			lang: r
		}),
		Bi.value === "todo" && /* @__PURE__ */ U(oa, { cfg: e })
	] });
}
function Pa() {
	let e = L.value;
	if (!e) return null;
	let t = $.value ?? R.value;
	if (yn.value) return /* @__PURE__ */ U("div", {
		class: "df-root light",
		children: /* @__PURE__ */ U(ja, { children: [
			/* @__PURE__ */ U(W, {
				icon: "mdi:alert-circle-outline",
				size: 48
			}),
			/* @__PURE__ */ U("h2", { children: "DashForge couldn't load" }),
			/* @__PURE__ */ U("p", {
				class: "muted",
				children: yn.value
			}),
			/* @__PURE__ */ U(K, {
				kind: "primary",
				onClick: On,
				children: "Try again"
			})
		] })
	});
	if (!_n.value) return /* @__PURE__ */ U("div", {
		class: "df-root light",
		children: /* @__PURE__ */ U(ja, { children: /* @__PURE__ */ U("div", {
			class: "spinner",
			"aria-label": "Loading"
		}) })
	});
	if (Cn.value && $.value) return /* @__PURE__ */ U(Aa, {
		cfg: $.value,
		children: /* @__PURE__ */ U(Fi, {})
	});
	let n = xn.value;
	if (!n || !n.setupComplete) return /* @__PURE__ */ U(Aa, {
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
		children: /* @__PURE__ */ U(ja, { children: /* @__PURE__ */ U("div", {
			class: "welcome-card",
			children: [
				/* @__PURE__ */ U(W, {
					icon: "mdi:anvil",
					size: 56
				}),
				/* @__PURE__ */ U("h1", { children: "Welcome to DashForge" }),
				_n.value.can_edit ? /* @__PURE__ */ U(x, { children: [/* @__PURE__ */ U("p", { children: "Let's build a dashboard that fits your home. The setup asks you about your rooms, devices, layout and look, one step at a time. It takes about five minutes, and you can change everything afterwards." }), /* @__PURE__ */ U(K, {
					kind: "primary",
					icon: "mdi:arrow-right",
					onClick: Pi,
					children: "Start setup"
				})] }) : /* @__PURE__ */ U("p", { children: "This dashboard hasn't been set up yet. Ask an administrator of this Home Assistant to open DashForge and finish the setup." })
			]
		}) })
	});
	let r = Sn.value && $.value ? $.value : n;
	return /* @__PURE__ */ U(Aa, {
		cfg: r,
		children: [
			/* @__PURE__ */ U("div", {
				class: "dashboard",
				children: [
					/* @__PURE__ */ U(ma, { cfg: r }),
					/* @__PURE__ */ U(ha, { cfg: r }),
					/* @__PURE__ */ U(Ca, { cfg: r })
				]
			}),
			/* @__PURE__ */ U(Qn, {}),
			/* @__PURE__ */ U(Nr, {}),
			/* @__PURE__ */ U(Hr, {}),
			/* @__PURE__ */ U($n, {}),
			/* @__PURE__ */ U(tr, {}),
			/* @__PURE__ */ U(rr, {}),
			/* @__PURE__ */ U(nr, {}),
			/* @__PURE__ */ U(ci, {}),
			/* @__PURE__ */ U(Wr, {}),
			/* @__PURE__ */ U(Na, {
				cfg: r,
				h: e
			}),
			Sn.value && /* @__PURE__ */ U(Ri, {}),
			!bn.value && /* @__PURE__ */ U(Ea, { cfg: r })
		]
	});
}
// src/styles.css?inline
var Fa = ":host{height:100%;display:block}.df-mount,.df-root{height:100%}.df-root{--accent:#3b82f6;--radius:20px;--gap:14px;--tile-h:112px;--tile-min:150px;--text:#0f172a;--muted:#64748b;--card:#ffffffb8;--card-solid:#fff;--card-border:#0f172a0f;--card-shadow:0 1px 2px #0f172a0f, 0 8px 24px #0f172a0f;--chip:#fff9;--surface:#fff;--surface-2:#f1f5f9;--line:#0f172a1a;--icon-bg:#0f172a0f;--tile-active:var(--accent);--danger:#ef4444;--page-bg:#f4f4f5;box-sizing:border-box;min-height:100vh;color:var(--text);background:var(--page-bg);font-family:var(--font,system-ui, -apple-system, \"Segoe UI\", Roboto, sans-serif);-webkit-font-smoothing:antialiased;-webkit-tap-highlight-color:transparent;background-attachment:fixed;font-size:15px;line-height:1.4;position:relative;overflow-y:auto}.df-root.dark{--text:#f1f5f9;--muted:#94a3b8;--card:#1e293b8c;--card-solid:#1e293b;--card-border:#ffffff12;--card-shadow:0 1px 2px #0000004d, 0 8px 24px #00000040;--chip:#1e293b99;--surface:#172033;--surface-2:#0f172a;--line:#ffffff1a;--icon-bg:#ffffff14}.df-root.density-compact{--gap:8px;--tile-h:92px;--tile-min:130px}*,:before,:after{box-sizing:border-box}button{font:inherit;color:inherit;cursor:pointer}button:focus-visible,[tabindex]:focus-visible,.input:focus-visible{outline:2px solid var(--accent);outline-offset:2px}h1,h2,h3{letter-spacing:-.01em;margin:0;font-weight:650}p{margin:0 0 12px}.muted{color:var(--muted)}.small{font-size:.85em}.nowrap{white-space:nowrap}.ellipsis{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}ha-icon{flex:none;display:inline-flex}.btn{border:1px solid var(--line);background:var(--surface);white-space:nowrap;border-radius:999px;align-items:center;gap:6px;min-height:40px;padding:8px 16px;font-weight:550;transition:background .15s,transform .1s;display:inline-flex}.btn:active{transform:scale(.97)}.btn:disabled{opacity:.45;cursor:default}.btn-primary{background:var(--accent);color:#fff;border-color:#0000}.btn-ghost{background:0 0;border-color:#0000}.btn-ghost:hover{background:var(--icon-bg)}.btn-danger{border-color:color-mix(in srgb, var(--danger) 40%, transparent);color:var(--danger);background:0 0}.btn-row{flex-wrap:wrap;align-items:center;gap:8px;display:flex}.icon-btn{background:0 0;border:none;border-radius:50%;justify-content:center;align-items:center;width:44px;height:44px;transition:background .15s;display:inline-flex}.icon-btn:hover{background:var(--icon-bg)}.icon-btn.active,.icon-btn.play{background:var(--accent);color:#fff}.icon-btn:disabled{opacity:.3;cursor:default}.btn-group{align-items:center;gap:4px;display:flex}.toggle{background:var(--line);border:none;border-radius:999px;flex:none;width:52px;height:30px;transition:background .2s;position:relative}.toggle .knob{background:#fff;border-radius:50%;width:24px;height:24px;transition:transform .2s;position:absolute;top:3px;left:3px;box-shadow:0 1px 3px #0000004d}.toggle.on{background:var(--accent)}.toggle.on .knob{transform:translate(22px)}.checkbox{border:2px solid var(--line);color:#fff;background:0 0;border-radius:7px;flex:none;justify-content:center;align-items:center;width:24px;height:24px;display:inline-flex}.checkbox.on{border-color:var(--accent);background:var(--accent)}.slider{--slider-color:var(--accent);background:var(--icon-bg);touch-action:none;cursor:pointer;-webkit-user-select:none;user-select:none;border-radius:12px;height:40px;position:relative;overflow:hidden}.slider-fill{background:var(--slider-color);opacity:.85;height:100%;transition:width .15s,height .15s;position:absolute;bottom:0;left:0}.slider.dragging .slider-fill{transition:none}.slider.vertical .slider-fill{width:100%}.slider-label{pointer-events:none;mix-blend-mode:normal;text-shadow:0 0 6px var(--card-solid);justify-content:center;align-items:center;font-size:.85em;font-weight:600;display:flex;position:absolute;inset:0}.slider.vertical{width:44px;height:100%;min-height:80px}.ct-slider{background:linear-gradient(90deg,#ffb46b,#fff4e5,#cfe3ff)}.ct-slider .slider-fill{border-right:3px solid var(--text);background:0 0}.segmented{background:var(--icon-bg);border-radius:14px;flex-wrap:wrap;gap:4px;padding:4px;display:inline-flex}.segmented button{background:0 0;border:none;border-radius:10px;align-items:center;gap:6px;min-height:36px;padding:6px 14px;font-weight:550;display:inline-flex}.segmented button.selected{background:var(--surface);box-shadow:0 1px 3px #0000001f}.input{border:1px solid var(--line);background:var(--surface);width:100%;min-height:42px;color:var(--text);font:inherit;border-radius:12px;padding:8px 12px}.input.bare{background:0 0;border:none;padding:8px 4px}.field{flex-direction:column;gap:6px;margin-bottom:16px;display:flex}.field-label,.labeled-label{letter-spacing:.04em;text-transform:uppercase;color:var(--muted);font-size:.8em;font-weight:650}.labeled-label{margin:18px 0 8px}.field-hint{color:var(--muted);font-size:.85em}.row{border-bottom:1px solid var(--line);align-items:center;gap:12px;padding:12px 0;display:flex}.row-text{flex:1;min-width:0}.row-label{font-weight:550}.row-hint{color:var(--muted);font-size:.85em}.chips{flex-wrap:wrap;gap:8px;display:flex}.chips.scroll{scrollbar-width:none;flex-wrap:nowrap;padding-bottom:4px;overflow-x:auto}.chip{border:1px solid var(--line);background:var(--surface);white-space:nowrap;border-radius:999px;align-items:center;gap:6px;min-height:36px;padding:6px 14px;display:inline-flex}.chip.selected{border-color:var(--accent);background:color-mix(in srgb, var(--accent) 15%, var(--surface));color:var(--accent);font-weight:600}.swatches{flex-wrap:wrap;gap:10px;display:flex}.swatch{border:2px solid var(--line);border-radius:50%;width:38px;height:38px;padding:0}.swatch.selected{outline:3px solid var(--text);outline-offset:2px}.color-input{background:conic-gradient(red,#ff0,#0f0,#0ff,#00f,#f0f,red);overflow:hidden}.color-input::-webkit-color-swatch-wrapper{opacity:0;padding:0}.icon-picker{flex-direction:column;gap:8px;margin-top:6px;display:flex}.icon-grid{grid-template-columns:repeat(auto-fill,minmax(42px,1fr));gap:6px;display:grid}.icon-choice{border:1px solid var(--line);background:var(--surface);border-radius:12px;justify-content:center;align-items:center;width:42px;height:42px;display:inline-flex}.icon-choice.selected{border-color:var(--accent);color:var(--accent)}.dashboard{max-width:1600px;margin:0 auto;padding:20px 24px 120px}.header{flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px 24px;margin-bottom:16px;display:flex}.header-left{align-items:center;gap:8px;min-width:0;display:flex}.title{font-size:1.75rem}.subtitle{color:var(--muted)}.header-right{flex-wrap:wrap;align-items:center;gap:12px;display:flex}.clock{white-space:nowrap;font-variant-numeric:tabular-nums;letter-spacing:-.02em;flex:none;font-size:2rem;font-weight:300}.header-chips{flex-wrap:wrap;align-items:center;gap:8px;display:flex}.chip-btn{border:1px solid var(--card-border);background:var(--chip);-webkit-backdrop-filter:blur(14px);border-radius:999px;align-items:center;gap:6px;max-width:260px;min-height:44px;padding:8px 14px;font-weight:550;display:inline-flex}.chip-btn .count{background:var(--accent);color:#fff;text-align:center;border-radius:999px;min-width:22px;padding:0 6px;font-size:.8em}.header-chips .icon-btn{background:var(--chip);-webkit-backdrop-filter:blur(14px);border:1px solid var(--card-border)}.scene-strip{scrollbar-width:none;gap:8px;margin-bottom:16px;display:flex;overflow-x:auto}.scene-chip{border:1px solid var(--card-border);background:var(--card);-webkit-backdrop-filter:blur(14px);border-radius:999px;flex:none;align-items:center;gap:8px;min-height:40px;padding:8px 16px;font-weight:550;transition:transform .1s;display:inline-flex}.scene-chip:active{transform:scale(.96)}.nav-pills{scrollbar-width:none;gap:8px;margin-bottom:18px;display:flex;overflow-x:auto}.nav-pills .nav-item{border:1px solid var(--card-border);background:var(--chip);-webkit-backdrop-filter:blur(14px);border-radius:999px;flex:none;align-items:center;gap:8px;min-height:42px;padding:8px 16px;font-weight:550;display:inline-flex}.nav-item.selected{color:#fff;background:var(--accent)!important;border-color:#0000!important}.nav-text{text-align:left;flex-direction:column;align-items:flex-start;display:flex}.nav-status{opacity:.75;font-size:.8em;font-weight:450}.layout-sidebar{grid-template-columns:240px 1fr;align-items:start;gap:24px;display:grid}.nav-vertical{border:1px solid var(--card-border);border-radius:var(--radius);background:var(--card);-webkit-backdrop-filter:blur(18px);flex-direction:column;gap:4px;padding:8px;display:flex;position:sticky;top:16px}.nav-vertical .nav-item{border-radius:calc(var(--radius) * .6);background:0 0;border:1px solid #0000;align-items:center;gap:12px;min-height:52px;padding:8px 12px;font-weight:550;display:flex}.nav-vertical .nav-item:hover{background:var(--icon-bg)}.section-title{align-items:center;gap:8px;margin:4px 0 14px;font-size:1.25rem;display:flex}.list-section{margin-bottom:28px}.layout-focus .focus-head{justify-content:center;align-items:center;gap:16px;display:flex}.focus-title{text-align:center;min-width:200px;font-size:2rem}.focus-dots{justify-content:center;gap:8px;margin:10px 0 22px;display:flex}.dot{background:var(--line);border:none;border-radius:50%;width:10px;height:10px;padding:0}.dot.on{background:var(--accent);border-radius:999px;width:26px}.layout-focus{--tile-h:140px;--tile-min:190px}.grid{grid-template-columns:repeat(auto-fill, minmax(var(--tile-min), 1fr));grid-auto-rows:var(--tile-h);grid-auto-flow:dense;gap:var(--gap);display:grid;container-type:inline-size}.cell{touch-action:manipulation;min-width:0}.cell.size-md{grid-column:span 2}.cell.size-lg{grid-area:span 2/span 2}.cell.size-wide{grid-area:span 2/span 3}@container (width<=520px){.cell.size-wide{grid-column:span 2}}@container (width<=300px){.cell.size-md,.cell.size-lg,.cell.size-wide{grid-column:span 1}}.grid.as-list{grid-template-columns:repeat(auto-fill,minmax(260px,1fr));grid-auto-rows:68px}.grid.as-list .tile{flex-direction:row;justify-content:flex-start;align-items:center;gap:12px;padding:10px 14px}.grid.as-list .tile-icon{width:42px;height:42px}.tile{border:1px solid var(--card-border);border-radius:var(--radius);background:var(--card-solid);height:100%;box-shadow:var(--card-shadow);cursor:pointer;-webkit-user-select:none;user-select:none;flex-direction:column;justify-content:space-between;padding:14px;transition:transform .12s,background .2s,box-shadow .2s;display:flex;position:relative;overflow:hidden}.cards-glass .tile{background:var(--card);-webkit-backdrop-filter:blur(18px)saturate(1.3)}.tile:active{transform:scale(.97)}.tile.active{background:color-mix(in srgb, var(--tile-active) 16%, var(--card-solid))}.cards-glass .tile.active{background:color-mix(in srgb, var(--tile-active) 20%, var(--card))}.tile.unavailable{opacity:.5}.tile-icon{background:var(--icon-bg);border-radius:50%;flex:none;justify-content:center;align-items:center;width:44px;height:44px;transition:background .2s,color .2s;display:inline-flex}.tile.active .tile-icon,.tile-icon.big.active{background:var(--tile-active);color:#fff}.tile-icon.big{width:64px;height:64px}.tile-text{min-width:0}.tile-name{white-space:nowrap;text-overflow:ellipsis;font-weight:600;overflow:hidden}.tile-state{color:var(--muted);white-space:nowrap;text-overflow:ellipsis;font-size:.88em;overflow:hidden}.tile-value{font-size:1.4rem;font-weight:650;line-height:1.1}.big-body{flex-direction:column;justify-content:space-between;gap:10px;height:100%;display:flex}.big-top{align-items:center;gap:12px;min-width:0;display:flex}.cover-row{flex:1;justify-content:space-between;align-items:stretch;gap:10px;min-height:0;display:flex}.cover-row .btn-group{flex-direction:column;justify-content:center}.cover-slider{min-height:0}.climate-ring{flex:1;justify-content:center;align-items:center;min-height:0;display:flex;position:relative}.climate-ring svg{width:auto;height:100%;max-height:170px}.climate-ring.big svg{max-height:240px}.ring-track,.ring-value{fill:none;stroke-width:10px;stroke-linecap:round}.ring-track{stroke:var(--icon-bg)}.ring-value{transition:stroke-dasharray .3s}.ring-center{pointer-events:none;flex-direction:column;justify-content:center;align-items:center;display:flex;position:absolute;inset:0}.ring-target{font-size:1.9rem;font-weight:650}.climate-ring.big .ring-target{font-size:2.6rem}.ring-target.range{font-size:1.4rem}.climate-ring.big .ring-target.range{font-size:2rem}.ring-current{color:var(--muted);font-size:.85em}.ring-buttons{justify-content:space-between;display:flex;position:absolute;bottom:0;left:0;right:0}.ring-buttons .icon-btn{background:var(--icon-bg)}.media-big{position:relative}.media-art-bg{filter:blur(28px)saturate(1.4);opacity:.35;pointer-events:none;background-position:50%;background-size:cover;position:absolute;inset:-20px}.media-big>*{position:relative}.media-art{object-fit:cover;border-radius:50%;width:100%;height:100%}.media-controls{flex-direction:column;gap:8px;display:flex}.media-controls .btn-group{justify-content:center}.camera-big{height:calc(100% + 28px);margin:-14px;position:relative}.camera-img{object-fit:cover;border-radius:inherit;background:#000;width:100%;height:100%;display:block}.controls .camera-img{border-radius:12px;height:auto}.camera-empty{height:100%;color:var(--muted);justify-content:center;align-items:center;display:flex}.camera-label{color:#fff;background:#0000008c;border-radius:999px;padding:4px 10px;font-size:.85em;font-weight:600;position:absolute;bottom:10px;left:12px}.sensor-big{justify-content:center}.sensor-value{font-size:2.4rem;font-weight:650;line-height:1}.empty{color:var(--muted);text-align:center;flex-direction:column;grid-column:1/-1;align-items:center;gap:8px;padding:40px 12px;display:flex}.big-empty{justify-content:center;min-height:50vh}@keyframes wiggle{0%,to{transform:rotate(-.6deg)}50%{transform:rotate(.6deg)}}.tile.editing{cursor:grab;animation:.28s ease-in-out infinite wiggle}.cell:nth-child(2n) .tile.editing{animation-delay:-.14s}@media (prefers-reduced-motion:reduce){.tile.editing{outline:2px dashed var(--line);animation:none}}.tile.dragging{opacity:.6;cursor:grabbing;animation:none;transform:scale(1.04);box-shadow:0 16px 40px #00000040}.is-editing{touch-action:none}.badge{z-index:2;border:none;border-radius:50%;justify-content:center;align-items:center;width:28px;height:28px;display:inline-flex;position:absolute;box-shadow:0 2px 6px #00000040}.badge-remove{background:var(--danger);color:#fff;top:6px;left:6px}.badge-resize{background:var(--surface);bottom:6px;right:6px}.add-tile{border:2px dashed var(--line);border-radius:var(--radius);color:var(--muted);background:0 0;flex-direction:column;justify-content:center;align-items:center;gap:6px;font-weight:600;display:flex}.edit-bar{z-index:20;border:1px solid var(--card-border);background:var(--surface);border-radius:24px;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px;width:min(960px,100% - 24px);padding:10px;display:flex;position:fixed;bottom:18px;left:50%;transform:translate(-50%);box-shadow:0 12px 40px #00000040}.edit-bar-group{flex-wrap:wrap;gap:6px;display:flex}.modal-backdrop{z-index:50;background:#00000073;justify-content:center;align-items:center;padding:16px;animation:.15s ease-out fade;display:flex;position:fixed;inset:0}@keyframes fade{0%{opacity:0}}@keyframes rise{0%{opacity:0;transform:translateY(16px)}}.modal{background:var(--surface);border-radius:24px;flex-direction:column;width:min(480px,100%);max-height:min(88vh,900px);animation:.2s ease-out rise;display:flex;box-shadow:0 24px 64px #00000059}.modal.wide{width:min(820px,100%)}.modal-head{justify-content:space-between;align-items:center;gap:12px;padding:14px 14px 8px 22px;display:flex}.modal-head h2{white-space:nowrap;text-overflow:ellipsis;font-size:1.2rem;overflow:hidden}.modal-body{flex:1;padding:4px 22px 20px;overflow-y:auto}.modal-foot{border-top:1px solid var(--line);flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px;padding:12px 18px;display:flex}.modal-foot>:only-child{margin-left:auto}@media (width<=600px){.modal-backdrop{align-items:flex-end;padding:0}.modal,.modal.wide{border-radius:24px 24px 0 0;width:100%;max-height:92vh}}.detail-head{flex-direction:column;align-items:center;gap:8px;margin:6px 0 18px;display:flex}.detail-state{font-size:1.15rem;font-weight:600}.controls{flex-direction:column;gap:14px;display:flex}.control-row{justify-content:space-between;align-items:center;gap:12px;font-weight:600;display:flex}.labeled .labeled-label{margin-top:0}.media-art-large{aspect-ratio:1;object-fit:cover;border-radius:16px;width:100%;max-width:260px;margin:0 auto}.media-meta{text-align:center;flex-direction:column;display:flex}.history-chart{width:100%;height:auto}.history-line{fill:none;stroke:var(--accent);stroke-width:2px;vector-effect:non-scaling-stroke}.history-area{fill:color-mix(in srgb, var(--accent) 18%, transparent)}.history-range{justify-content:space-between;font-size:.85em;display:flex}.weather-now{align-items:center;gap:16px;display:flex}.weather-temp{font-size:2.6rem;font-weight:300;line-height:1}.hourly{gap:6px;padding-bottom:6px;display:flex;overflow-x:auto}.hour{background:var(--surface-2);border-radius:14px;flex-direction:column;flex:none;align-items:center;gap:4px;width:64px;padding:10px 4px;font-size:.9em;display:flex}.precip{color:#3b82f6;font-size:.8em;font-weight:600}.daily{flex-direction:column;display:flex}.day{border-bottom:1px solid var(--line);grid-template-columns:1fr 32px 48px 90px;align-items:center;gap:8px;padding:10px 0;display:grid}.day-temps{text-align:right}.cal-head{justify-content:space-between;align-items:center;display:flex}.cal-grid{grid-template-columns:repeat(7,1fr);gap:4px;display:grid}.cal-dow{color:var(--muted);text-align:center;padding:4px 0;font-size:.8em;font-weight:600}.cal-day{background:var(--surface-2);border:none;border-radius:12px;flex-direction:column;justify-content:center;align-items:center;height:46px;display:flex}.cal-day.other{opacity:.4}.cal-day.today span:first-child{color:var(--accent);font-weight:700}.cal-day.selected{background:var(--accent);color:#fff}.cal-day.selected span:first-child{color:#fff}.cal-dots{letter-spacing:1px;color:var(--accent);font-size:.7em;line-height:1}.cal-day.selected .cal-dots{color:#fff}.agenda,.todo-items{margin:0;padding:0;list-style:none}.agenda li{border-bottom:1px solid var(--line);gap:14px;padding:10px 0;display:flex}.agenda-time{width:70px;color:var(--muted);flex:none}.agenda-text{flex-direction:column;display:flex}.todo+.todo{margin-top:12px}.todo-add,.inline-form{gap:8px;margin-bottom:8px;display:flex}.todo-items li{border-bottom:1px solid var(--line);align-items:center;gap:12px;padding:10px 0;display:flex}.todo-items li.done span{color:var(--muted);text-decoration:line-through}.search-bar{border:1px solid var(--line);background:var(--surface-2);border-radius:14px;align-items:center;gap:6px;margin-bottom:10px;padding:0 12px;display:flex}.entity-list{margin-top:6px}.entity-row{text-align:left;background:0 0;border:none;border-radius:12px;align-items:center;gap:12px;width:100%;padding:10px 8px;display:flex}.entity-row:hover{background:var(--icon-bg)}.entity-row-text{flex-direction:column;flex:1;min-width:0;display:flex}.entity-row-text>span{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.picker-box{border:1px solid var(--line);border-radius:16px;max-height:340px;margin-bottom:16px;padding:10px;overflow-y:auto}.device-line{align-items:center;gap:8px;display:flex}.device-line .entity-row{flex:1;min-width:0}.size-select{width:auto;min-height:36px;padding:4px 8px}.check-list{flex-direction:column;display:flex}.check-item{align-items:center;gap:12px;padding:8px 0;display:flex}.wizard{z-index:40;background:var(--page-bg);grid-template-columns:260px 1fr;display:grid;position:fixed;inset:0}.wizard-steps{border-right:1px solid var(--card-border);background:var(--card);-webkit-backdrop-filter:blur(18px);padding:22px 14px;overflow-y:auto}.brand{color:var(--accent);align-items:center;gap:10px;margin:0 10px 22px;font-size:1.3rem;font-weight:750;display:flex}.wizard-steps ol{margin:0;padding:0;list-style:none}.wstep{text-align:left;background:0 0;border:none;border-radius:12px;align-items:center;gap:10px;width:100%;min-height:44px;padding:8px 12px;font-weight:550;display:flex}.wstep:hover{background:var(--icon-bg)}.wstep.current{background:var(--accent);color:#fff}.wstep.done{color:var(--muted)}.wizard-main{flex-direction:column;min-width:0;height:100vh;display:flex}.wizard-progress{background:var(--line);height:4px}.wizard-progress div{background:var(--accent);height:100%;transition:width .3s}.wizard-head{padding:22px 32px 8px}.wizard-head h2{font-size:1.8rem}.wizard-body{flex:1;padding:8px 32px 24px;overflow-y:auto}.step{max-width:760px}.lead{color:var(--muted);margin-bottom:18px;font-size:1.05rem}.wizard-foot{border-top:1px solid var(--card-border);background:var(--card);-webkit-backdrop-filter:blur(18px);justify-content:space-between;align-items:center;gap:8px;padding:14px 32px;display:flex}@media (width<=760px){.wizard{grid-template-columns:1fr}.wizard-steps{display:none}.wizard-head,.wizard-body,.wizard-foot{padding-left:16px;padding-right:16px}}.room-list{flex-direction:column;gap:6px;display:flex}.room-item{border:1px solid var(--line);background:var(--surface);border-radius:16px;padding:6px}.room-row{align-items:center;gap:6px;margin-bottom:4px;display:flex}.room-row .input{flex:1;min-width:80px}.room-row>.small{text-overflow:ellipsis;text-align:right;flex:none;width:96px;overflow:hidden}.accordion{flex-direction:column;gap:8px;display:flex}.acc-item{border:1px solid var(--line);background:var(--surface);border-radius:16px;overflow:hidden}.acc-head{text-align:left;background:0 0;border:none;align-items:center;gap:12px;width:100%;padding:14px 16px;display:flex}.acc-title{flex:1;font-weight:600}.acc-body{padding:0 12px 14px}.choice-grid{grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin-bottom:22px;display:grid}.choice{border:2px solid var(--line);background:var(--surface);text-align:left;border-radius:18px;flex-direction:column;gap:6px;padding:12px;display:flex}.choice.selected{border-color:var(--accent);box-shadow:0 0 0 4px color-mix(in srgb, var(--accent) 20%, transparent)}.layout-preview{width:100%;height:auto}.pv-bg{fill:var(--surface-2)}.pv-tile{fill:var(--line)}.pv-accent{fill:var(--accent)}.bg-grid{grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:10px;display:grid}.bg-choice{border:2px solid var(--line);background:var(--surface);border-radius:14px;grid-template-columns:1fr 1fr;gap:4px;padding:6px;display:grid}.bg-choice .small{grid-column:1/-1}.bg-choice.selected{border-color:var(--accent)}.bg-swatch{border-radius:8px;height:40px}.bg-swatch.image{background:var(--surface-2);grid-column:1/-1;justify-content:center;align-items:center;display:flex}.review{grid-template-columns:max-content 1fr;gap:10px 20px;margin:0;display:grid}.review dt{color:var(--muted);font-weight:600}.review dd{margin:0}.settings{grid-template-columns:200px 1fr;gap:18px;display:grid}.settings-tabs{flex-direction:column;gap:2px;display:flex}.settings-body{min-width:0}@media (width<=700px){.settings{grid-template-columns:1fr}.settings-tabs{flex-direction:row;overflow-x:auto}.settings-tabs .wstep{white-space:nowrap;width:auto}}.centered{text-align:center;flex-direction:column;justify-content:center;align-items:center;gap:12px;min-height:100vh;padding:24px;display:flex}.welcome-card{border:1px solid var(--card-border);background:var(--card);-webkit-backdrop-filter:blur(20px);max-width:520px;box-shadow:var(--card-shadow);border-radius:28px;flex-direction:column;align-items:center;gap:14px;padding:36px 28px;display:flex}.welcome-card ha-icon{color:var(--accent)}.welcome-card h1{font-size:1.9rem}.spinner{border:3px solid var(--line);border-top-color:var(--accent);border-radius:50%;width:36px;height:36px;animation:.8s linear infinite spin}@keyframes spin{to{transform:rotate(360deg)}}.toast{z-index:60;color:#fff;background:#0f172a;border-radius:14px;max-width:calc(100% - 32px);padding:12px 18px;animation:.2s ease-out rise;position:fixed;bottom:96px;left:50%;transform:translate(-50%);box-shadow:0 10px 30px #0000004d}.toast.error{background:#b91c1c}.screensaver{z-index:100;color:#fff;cursor:none;background:#000;justify-content:center;align-items:center;display:flex;position:fixed;inset:0}.ss-clock .ss-content,.ss-clock{text-align:center}.ss-content{transition:transform 4s ease-in-out}.ss-clock{font-variant-numeric:tabular-nums;font-size:clamp(4rem,16vw,12rem);font-weight:200;line-height:1}.ss-date{opacity:.8;margin-top:8px;font-size:clamp(1.1rem,3vw,2rem)}.ss-extra{opacity:.85;flex-wrap:wrap;justify-content:center;gap:32px;margin-top:28px;font-size:clamp(1rem,2.4vw,1.6rem);display:flex}.ss-extra span{align-items:center;gap:10px;display:inline-flex}.ss-dim{color:#ffffff59}@media (width<=600px){.dashboard{padding:14px 12px 110px}.title{font-size:1.4rem}.clock{font-size:1.5rem}.df-root{--tile-min:140px;--tile-h:100px}.edit-bar{border-radius:18px;bottom:8px}.header-right{flex-wrap:nowrap;justify-content:space-between;width:100%}.header-chips{scrollbar-width:none;flex-wrap:nowrap;min-width:0;overflow-x:auto}.chip-btn,.header-chips .icon-btn{flex:none}.event-chip{max-width:180px}.room-row>.small{display:none}.room-row .icon-btn{width:36px;height:36px}}.style-apple{--tile-min:176px;--tile-h:74px;--gap:10px}.style-apple.density-compact{--tile-h:64px;--tile-min:160px}.style-apple .tile{box-shadow:none;-webkit-backdrop-filter:blur(24px)saturate(1.6);background:#ffffff6b;border:none;flex-direction:row;justify-content:flex-start;align-items:center;gap:10px;padding:10px 12px}.style-apple.dark .tile{background:#3a3a408c}.style-apple .tile.active,.style-apple.dark .tile.active{color:#1c1c1e;background:#fffffff2}.style-apple .tile.active .tile-state{color:#6b6b70}.style-apple .tile-icon{background:#78788033;width:36px;height:36px}.style-apple .tile.active .tile-icon{background:color-mix(in srgb, var(--tile-active) 18%, transparent);color:var(--tile-active)}.style-apple .tile-name{font-size:.92em;font-weight:600}.style-apple .tile-state{font-size:.82em}.style-apple .tile-value{font-size:1.05rem}.style-apple .cell.size-lg .tile,.style-apple .cell.size-wide .tile,.style-apple .cell.size-md .tile{flex-direction:column;align-items:stretch}.style-apple .cell.size-md{grid-row:span 2}.style-apple .cell.size-lg,.style-apple .cell.size-wide{grid-row:span 3}.style-apple .nav-pills .nav-item,.style-apple .chip-btn,.style-apple .header-chips .icon-btn,.style-apple .scene-chip{-webkit-backdrop-filter:blur(24px)saturate(1.6);background:#fff6;border:none}.style-apple.dark .nav-pills .nav-item,.style-apple.dark .chip-btn,.style-apple.dark .header-chips .icon-btn,.style-apple.dark .scene-chip{background:#3a3a408c}.style-apple .title{font-size:2rem;font-weight:700}.style-apple .section-title,.style-apple .floor-title{font-weight:700}.style-homey{--tile-min:136px;--tile-h:136px;--gap:12px}.style-homey.density-compact{--tile-min:116px;--tile-h:116px}.style-homey .tile{text-align:center;background:var(--card-solid);border:none;justify-content:center;align-items:center;gap:10px}.style-homey.dark{--card-solid:#1e2027;--surface:#1e2027;--surface-2:#15171c;--card-border:#ffffff0a}.style-homey .tile-text{width:100%}.style-homey .tile-icon{background:color-mix(in srgb, var(--cat) 16%, transparent);width:56px;height:56px;color:var(--cat)}.style-homey .tile.active .tile-icon{background:var(--cat);color:#fff;box-shadow:0 0 0 6px color-mix(in srgb, var(--cat) 22%, transparent), 0 6px 20px color-mix(in srgb, var(--cat) 45%, transparent)}.style-homey .tile.active{background:var(--card-solid)}.style-homey .tile-name{font-size:.9em}.style-homey .tile-state{font-size:.8em}.style-homey .cell.size-md .tile,.style-homey .cell.size-lg .tile,.style-homey .cell.size-wide .tile{text-align:left;align-items:stretch}.style-homey .nav-item.selected{color:var(--text);box-shadow:inset 0 0 0 2px var(--accent);background:var(--card-solid)!important}.style-homey .nav-pills .nav-item,.style-homey .chip-btn,.style-homey .header-chips .icon-btn,.style-homey .scene-chip,.style-homey .nav-vertical{background:var(--card-solid);-webkit-backdrop-filter:none;backdrop-filter:none;border:none}.style-minimal .tile,.style-minimal .nav-vertical,.style-minimal .chip-btn,.style-minimal .header-chips .icon-btn,.style-minimal .nav-pills .nav-item,.style-minimal .scene-chip{box-shadow:none;-webkit-backdrop-filter:none;backdrop-filter:none;background:var(--card-solid);border:1px solid var(--line)}.style-minimal .tile.active{background:var(--card-solid);border-color:var(--text)}.style-minimal .tile-icon{background:0 0;width:32px;height:32px}.style-minimal .tile.active .tile-icon{color:var(--tile-active);background:0 0}.style-minimal .nav-item.selected{color:var(--card-solid);background:var(--text)!important}.live-dot{background:#ef4444;border-radius:50%;width:8px;height:8px;margin-right:6px;animation:1.6s ease-in-out infinite pulse;display:inline-block}@keyframes pulse{50%{opacity:.35}}.counter-row{justify-content:center;align-items:center;gap:18px;display:flex}.counter-value{font-variant-numeric:tabular-nums;font-size:2.4rem;font-weight:650}.counter-value.center{text-align:center}.line-chart{width:100%;display:block;overflow:visible}.chart-line{fill:none;stroke:var(--chart,var(--accent));stroke-width:2.5px;stroke-linejoin:round;vector-effect:non-scaling-stroke;filter:drop-shadow(0 0 6px color-mix(in srgb, var(--chart,var(--accent)) 60%, transparent))}.chart-dot{fill:var(--chart,var(--accent));stroke:var(--card-solid);stroke-width:2px;vector-effect:non-scaling-stroke}.tile .line-chart,.tile .chart-space{flex:1;height:100%;min-height:0}.tile{--chart:var(--cat)}.sensor-big.with-chart{justify-content:flex-start}.sensor-big .big-top .sensor-value{color:var(--cat);white-space:nowrap;margin-left:auto;font-size:1.6rem}.nav-group{letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin:10px 12px 2px;font-size:.75em;font-weight:700}.nav-group:first-child{margin-top:4px}.floor-title{color:var(--muted);letter-spacing:.02em;font-size:1rem}.list-floor{text-transform:uppercase;letter-spacing:.08em;margin:8px 0 12px;font-size:.85rem}.floor-label{color:var(--muted);align-items:center;gap:6px;margin:8px 4px 2px;font-weight:650;display:flex}.room-list+.room-list{margin-top:10px}.room-item .floor-select{width:auto;min-height:34px;margin:0 0 4px 50px;padding:4px 10px;font-size:.9em}.sub-options{border-left:3px solid var(--line);margin:0 0 8px;padding:4px 0 8px 14px}.grow{flex:1;min-width:0}.plain-list{margin:0;padding-left:18px}.auto-swatch{background:var(--surface-2);justify-content:center;align-items:center;display:inline-flex}.room-controls{flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;margin:-6px 0 14px;display:flex}.room-status{color:var(--muted);font-weight:550}.room-lights{border:1px solid var(--card-border);background:var(--card-solid);border-radius:999px;align-items:center;gap:6px;min-height:38px;padding:6px 14px;font-weight:600;display:inline-flex}.room-lights.on{color:#fff;background:linear-gradient(135deg,#fbbf24,#f97316);border-color:#0000}.room-wallpaper{z-index:0;pointer-events:none;background-position:50%;background-size:cover;position:fixed;inset:0}.room-wallpaper:after{content:\"\";background:linear-gradient(#00000026,#00000073);position:absolute;inset:0}.dashboard{z-index:1;position:relative}.home-block{margin-bottom:22px}.summary{scrollbar-width:none;gap:10px;margin-bottom:22px;padding-bottom:2px;display:flex;overflow-x:auto}.summary-chip{border:1px solid var(--card-border);background:var(--card-solid);text-align:left;border-radius:18px;flex:none;align-items:center;gap:10px;min-height:56px;padding:8px 16px 8px 10px;display:flex}.cards-glass .summary-chip{background:var(--card);-webkit-backdrop-filter:blur(18px)}.summary-chip:disabled{cursor:default;opacity:1}.summary-chip ha-icon{background:var(--icon-bg);border-radius:50%;justify-content:center;align-items:center;display:inline-flex;width:38px!important;height:38px!important}.summary-chip.on ha-icon{color:#fff;background:linear-gradient(135deg,#fbbf24,#f97316)}.summary-chip.warn ha-icon{color:#fff;background:linear-gradient(135deg,#f43f5e,#c026d3)}.summary-text{flex-direction:column;display:flex}.summary-label{color:var(--muted);font-size:.78em;font-weight:650}.summary-value{white-space:nowrap;text-overflow:ellipsis;max-width:220px;font-weight:650;overflow:hidden}.room-grid{gap:var(--gap);grid-template-columns:repeat(auto-fill,minmax(190px,1fr));display:grid}.room-card{border:1px solid var(--card-border);border-radius:var(--radius);background:var(--card-solid);min-height:132px;box-shadow:var(--card-shadow);cursor:pointer;background-position:50%;background-size:cover;flex-direction:column;justify-content:space-between;padding:14px;transition:transform .12s;display:flex;position:relative}.room-card:active{transform:scale(.98)}.cards-glass .room-card:not(.has-bg){background-color:var(--card);-webkit-backdrop-filter:blur(18px)}.room-card.has-bg{color:#fff;border-color:#0000}.room-card-top{justify-content:space-between;align-items:flex-start;display:flex}.room-card-icon{background:var(--icon-bg);border-radius:14px;justify-content:center;align-items:center;width:44px;height:44px;display:inline-flex}.room-card-name{font-size:1.05rem;font-weight:700}.room-card-status{color:var(--muted);white-space:nowrap;text-overflow:ellipsis;font-size:.88em;overflow:hidden}.room-card.has-bg .room-card-status{color:#ffffffd9}.room-card .icon-btn{background:var(--icon-bg)}.room-card .icon-btn.active{background:linear-gradient(135deg,#fbbf24,#f97316)}.home-hint{align-items:center;gap:6px;display:flex}.irrigation{flex-direction:column;gap:16px;display:flex}.irr-status{border:1px solid var(--card-border);border-radius:var(--radius);background:var(--card-solid);box-shadow:var(--card-shadow);flex-direction:column;gap:14px;padding:18px;display:flex}.irr-status.running{color:#fff;background:linear-gradient(135deg,#0ea5e9 0%,#2563eb 60%,#4f46e5 100%);border-color:#0000}.irr-status-head{flex-wrap:wrap;align-items:center;gap:14px;display:flex}.irr-status-text{flex-direction:column;flex:1;min-width:160px;display:flex}.irr-status-text strong{font-size:1.2rem}.irr-status.running .irr-status-text span{color:#ffffffd9}.irr-progress{background:#ffffff40;border-radius:999px;height:8px;overflow:hidden}.irr-progress div{border-radius:inherit;background:#fff;height:100%;transition:width 1s linear}.irr-runall{flex-wrap:wrap;align-items:center;gap:10px;display:flex}.irr-status.running .chip{color:#fff;background:#ffffff2e;border-color:#0000}.irr-status.running .chip.selected{color:#1d4ed8;background:#fff}.irr-status.running .btn:not(.btn-primary){color:#fff;background:#ffffff2e;border-color:#0000}.zone-grid{gap:var(--gap);grid-template-columns:repeat(auto-fill,minmax(220px,1fr));display:grid}.zone{border:1px solid var(--card-border);border-radius:var(--radius);background:var(--card-solid);box-shadow:var(--card-shadow);flex-direction:column;gap:10px;padding:14px;display:flex}.zone.running,.zone.on{color:#fff;background:linear-gradient(135deg,#38bdf8 0%,#6366f1 100%);border-color:#0000}.zone.running .chip,.zone.on .chip{color:#fff;background:#fff3;border-color:#0000}.zone.unavailable{opacity:.5}.zone-head{align-items:center;gap:8px;font-weight:650;display:flex}.zone-num{background:var(--icon-bg);border-radius:50%;flex:none;justify-content:center;align-items:center;width:24px;height:24px;font-size:.8em;font-weight:700;display:inline-flex}.zone.running .zone-num,.zone.on .zone-num{background:#ffffff40}.zone-state{opacity:.85;font-size:.9em}.zone .chips{gap:6px}.zone .chip{min-height:34px;padding:4px 12px}.style-vivid{--tile-min:150px;--tile-h:116px;--gap:12px}.style-vivid.dark{--text:#f4f5f7;--muted:#9aa0ae;--card-solid:#1c1e26;--surface:#1c1e26;--surface-2:#14161c;--card-border:#ffffff0d;--card-shadow:0 1px 2px #0006;--icon-bg:#ffffff12;--line:#ffffff1a;--chip:#1c1e26}.style-vivid .tile{background:var(--card-solid);-webkit-backdrop-filter:none;backdrop-filter:none}.style-vivid .tile-icon{background:color-mix(in srgb, var(--cat) 18%, transparent);color:var(--cat)}.style-vivid .tile.active{background:var(--grad);color:#fff;box-shadow:0 12px 28px -12px var(--cat);border-color:#0000}.style-vivid .tile.active .tile-state,.style-vivid .tile.active .ring-current{color:#ffffffd9}.style-vivid .tile.active .tile-icon{color:#fff;background:#ffffff3d}.style-vivid .tile.active .slider,.style-vivid .tile.active .ring-buttons .icon-btn,.style-vivid .tile.active .icon-btn:not(.play){color:#fff;background:#ffffff38}.style-vivid .tile.active .slider{--slider-color:#ffffffeb}.style-vivid .tile.active .slider-label{color:#111827;text-shadow:0 0 6px #ffffffe6}.style-vivid .tile.active .ring-track{stroke:#ffffff40}.style-vivid .tile.active .ring-value{stroke:#fff!important}.style-vivid .tile.active .icon-btn.play{color:var(--cat);background:#fff}.style-vivid .cell.size-lg .tile:not(.active),.style-vivid .cell.size-wide .tile:not(.active),.style-vivid .cell.size-md .tile:not(.active){background:linear-gradient(160deg, color-mix(in srgb, var(--cat) 16%, var(--card-solid)) 0%, var(--card-solid) 70%)}.style-vivid .tile.d-weather{color:#fff;background:var(--grad)!important}.style-vivid .tile.d-weather .tile-state{color:#ffffffe6}.style-vivid .tile.d-weather .tile-icon{color:#fff;background:#ffffff3d}.style-vivid .nav-item.selected{box-shadow:0 8px 22px -10px var(--accent);background:linear-gradient(135deg, var(--accent) 0%, #ec4899 100%)!important}.style-vivid .nav-pills .nav-item,.style-vivid .chip-btn,.style-vivid .header-chips .icon-btn,.style-vivid .scene-chip,.style-vivid .nav-vertical,.style-vivid .summary-chip{border-color:var(--card-border);background:var(--card-solid);-webkit-backdrop-filter:none;backdrop-filter:none}.style-vivid .scene-chip ha-icon{color:#34d399}.style-vivid .room-card{background:var(--card-solid)}.style-vivid .room-card.lit:not(.has-bg){color:#fff;background:linear-gradient(135deg,#ec4899 0%,#8b5cf6 100%);border-color:#0000;box-shadow:0 14px 30px -14px #ec4899}.style-vivid .room-card.lit .room-card-status{color:#ffffffd9}.style-vivid .room-card.lit .room-card-icon,.style-vivid .room-card.lit .icon-btn{color:#fff;background:#ffffff38}.style-vivid .tile-value,.style-vivid .sensor-value{color:var(--cat)}.style-vivid .tile.active .tile-value{color:#fff}.style-dashforge .tile.active{background:color-mix(in srgb, var(--tile-active) 24%, var(--card-solid))}.style-dashforge.cards-glass .tile.active{background:color-mix(in srgb, var(--tile-active) 28%, var(--card))}.big-number{align-items:baseline;gap:8px;font-size:2.6rem;font-weight:650;line-height:1;display:flex}.big-number-label{opacity:.8;font-size:.85rem;font-weight:500}.weather-big-temp{margin-left:auto;font-size:2.2rem;font-weight:300}.weather-big-meta{opacity:.9;flex-wrap:wrap;gap:12px;font-size:.85em;display:flex}.weather-big-meta span{align-items:center;gap:4px;display:inline-flex}.zone.running .btn-danger,.irr-status.running .btn-danger{color:#dc2626;background:#fff;border-color:#0000}.irr-status.running .muted{color:#fffc}.style-minimal .slider{--slider-color:color-mix(in srgb, var(--accent) 30%, transparent)}.font-grid{grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px;display:grid}.font-choice{border:2px solid var(--line);background:var(--surface);text-align:left;border-radius:16px;flex-direction:column;gap:2px;padding:12px;display:flex}.font-choice.selected{border-color:var(--accent);box-shadow:0 0 0 4px color-mix(in srgb, var(--accent) 20%, transparent)}.font-sample{font-size:1.9rem;font-weight:650;line-height:1.1}.title,.focus-title,.wizard-head h2,.welcome-card h1{letter-spacing:-.025em;font-weight:750}.clock,.ss-clock,.weather-big-temp,.weather-temp{letter-spacing:-.03em;font-weight:350}.tile-name,.room-card-name,.nav-item,.summary-value{letter-spacing:-.005em}.tile-value,.sensor-value,.ring-target,.big-number,.counter-value{letter-spacing:-.02em}", Ia = class extends HTMLElement {
	mount;
	started = !1;
	resize;
	set hass(e) {
		L.value = e, !this.started && this.isConnected && this.start();
	}
	set narrow(e) {
		hn.value = e;
	}
	set route(e) {}
	set panel(e) {}
	connectedCallback() {
		if (je(), !this.shadowRoot) {
			let e = this.attachShadow({ mode: "open" }), t = document.createElement("style");
			t.textContent = Fa, this.mount = document.createElement("div"), this.mount.className = "df-mount", e.append(t, this.mount);
		}
		Ln(this), this.resize = new ResizeObserver((e) => {
			let t = Math.round(e[0].contentRect.width);
			t > 0 && t !== gn.value && (gn.value = t);
		}), this.resize.observe(this), he(/* @__PURE__ */ U(Pa, {}), this.mount), L.value && !this.started && this.start();
	}
	disconnectedCallback() {
		this.mount && he(null, this.mount), this.resize?.disconnect(), kn(), this.started = !1;
	}
	start() {
		this.started = !0, On();
	}
};
customElements.get("dashforge-panel") || customElements.define("dashforge-panel", Ia);
