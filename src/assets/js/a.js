function BigInteger(t, e, i) {
	null != t && ("number" == typeof t ? this.fromNumber(t, e, i) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
}

function nbi() {
	return new BigInteger(null)
}

function am1(t, e, i, n, r, o) {
	for (; --o >= 0;) {
		var s = e * this[t++] + i[n] + r;
		r = Math.floor(s / 67108864), i[n++] = 67108863 & s
	}
	return r
}

function am2(t, e, i, n, r, o) {
	for (var s = 32767 & e, a = e >> 15; --o >= 0;) {
		var l = 32767 & this[t],
			u = this[t++] >> 15,
			c = a * l + u * s;
		r = ((l = s * l + ((32767 & c) << 15) + i[n] + (1073741823 & r)) >>> 30) + (c >>> 15) + a * u + (r >>> 30), i[n++] = 1073741823 & l
	}
	return r
}

function am3(t, e, i, n, r, o) {
	for (var s = 16383 & e, a = e >> 14; --o >= 0;) {
		var l = 16383 & this[t],
			u = this[t++] >> 14,
			c = a * l + u * s;
		r = ((l = s * l + ((16383 & c) << 14) + i[n] + r) >> 28) + (c >> 14) + a * u, i[n++] = 268435455 & l
	}
	return r
}

function int2char(t) {
	return BI_RM.charAt(t)
}

function intAt(t, e) {
	var i = BI_RC[t.charCodeAt(e)];
	return null == i ? -1 : i
}

function bnpCopyTo(t) {
	for (var e = this.t - 1; e >= 0; --e) t[e] = this[e];
	t.t = this.t, t.s = this.s
}

function bnpFromInt(t) {
	this.t = 1, this.s = 0 > t ? -1 : 0, t > 0 ? this[0] = t : -1 > t ? this[0] = t + this.DV : this.t = 0
}

function nbv(t) {
	var e = nbi();
	return e.fromInt(t), e
}

function bnpFromString(t, e) {
	var i;
	if (16 == e) i = 4;
	else if (8 == e) i = 3;
	else if (256 == e) i = 8;
	else if (2 == e) i = 1;
	else if (32 == e) i = 5;
	else {
		if (4 != e) return void this.fromRadix(t, e);
		i = 2
	}
	this.t = 0, this.s = 0;
	for (var n = t.length, r = !1, o = 0; --n >= 0;) {
		var s = 8 == i ? 255 & t[n] : intAt(t, n);
		0 > s ? "-" == t.charAt(n) && (r = !0) : (r = !1, 0 == o ? this[this.t++] = s : o + i > this.DB ? (this[this.t - 1] |= (s & (1 << this.DB - o) - 1) << o, this[this.t++] = s >> this.DB - o) : this[this.t - 1] |= s << o, (o += i) >= this.DB && (o -= this.DB))
	}
	8 == i && 0 != (128 & t[0]) && (this.s = -1, o > 0 && (this[this.t - 1] |= (1 << this.DB - o) - 1 << o)), this.clamp(), r && BigInteger.ZERO.subTo(this, this)
}

function bnpClamp() {
	for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t;) --this.t
}

function bnToString(t) {
	if (this.s < 0) return "-" + this.negate().toString(t);
	var e;
	if (16 == t) e = 4;
	else if (8 == t) e = 3;
	else if (2 == t) e = 1;
	else if (32 == t) e = 5;
	else {
		if (4 != t) return this.toRadix(t);
		e = 2
	}
	var i, n = (1 << e) - 1,
		r = !1,
		o = "",
		s = this.t,
		a = this.DB - s * this.DB % e;
	if (s-- > 0)
		for (a < this.DB && (i = this[s] >> a) > 0 && (r = !0, o = int2char(i)); s >= 0;) e > a ? (i = (this[s] & (1 << a) - 1) << e - a, i |= this[--s] >> (a += this.DB - e)) : (i = this[s] >> (a -= e) & n, 0 >= a && (a += this.DB, --s)), i > 0 && (r = !0), r && (o += int2char(i));
	return r ? o : "0"
}

function bnNegate() {
	var t = nbi();
	return BigInteger.ZERO.subTo(this, t), t
}

function bnAbs() {
	return this.s < 0 ? this.negate() : this
}

function bnCompareTo(t) {
	var e = this.s - t.s;
	if (0 != e) return e;
	var i = this.t;
	if (0 != (e = i - t.t)) return this.s < 0 ? -e : e;
	for (; --i >= 0;)
		if (0 != (e = this[i] - t[i])) return e;
	return 0
}

function nbits(t) {
	var e, i = 1;
	return 0 != (e = t >>> 16) && (t = e, i += 16), 0 != (e = t >> 8) && (t = e, i += 8), 0 != (e = t >> 4) && (t = e, i += 4), 0 != (e = t >> 2) && (t = e, i += 2), 0 != (e = t >> 1) && (t = e, i += 1), i
}

function bnBitLength() {
	return this.t <= 0 ? 0 : this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM)
}

function bnpDLShiftTo(t, e) {
	var i;
	for (i = this.t - 1; i >= 0; --i) e[i + t] = this[i];
	for (i = t - 1; i >= 0; --i) e[i] = 0;
	e.t = this.t + t, e.s = this.s
}

function bnpDRShiftTo(t, e) {
	for (var i = t; i < this.t; ++i) e[i - t] = this[i];
	e.t = Math.max(this.t - t, 0), e.s = this.s
}

function bnpLShiftTo(t, e) {
	var i, n = t % this.DB,
		r = this.DB - n,
		o = (1 << r) - 1,
		s = Math.floor(t / this.DB),
		a = this.s << n & this.DM;
	for (i = this.t - 1; i >= 0; --i) e[i + s + 1] = this[i] >> r | a, a = (this[i] & o) << n;
	for (i = s - 1; i >= 0; --i) e[i] = 0;
	e[s] = a, e.t = this.t + s + 1, e.s = this.s, e.clamp()
}

function bnpRShiftTo(t, e) {
	e.s = this.s;
	var i = Math.floor(t / this.DB);
	if (i >= this.t) e.t = 0;
	else {
		var n = t % this.DB,
			r = this.DB - n,
			o = (1 << n) - 1;
		e[0] = this[i] >> n;
		for (var s = i + 1; s < this.t; ++s) e[s - i - 1] |= (this[s] & o) << r, e[s - i] = this[s] >> n;
		n > 0 && (e[this.t - i - 1] |= (this.s & o) << r), e.t = this.t - i, e.clamp()
	}
}

function bnpSubTo(t, e) {
	for (var i = 0, n = 0, r = Math.min(t.t, this.t); r > i;) n += this[i] - t[i], e[i++] = n & this.DM, n >>= this.DB;
	if (t.t < this.t) {
		for (n -= t.s; i < this.t;) n += this[i], e[i++] = n & this.DM, n >>= this.DB;
		n += this.s
	} else {
		for (n += this.s; i < t.t;) n -= t[i], e[i++] = n & this.DM, n >>= this.DB;
		n -= t.s
	}
	e.s = 0 > n ? -1 : 0, -1 > n ? e[i++] = this.DV + n : n > 0 && (e[i++] = n), e.t = i, e.clamp()
}

function bnpMultiplyTo(t, e) {
	var i = this.abs(),
		n = t.abs(),
		r = i.t;
	for (e.t = r + n.t; --r >= 0;) e[r] = 0;
	for (r = 0; r < n.t; ++r) e[r + i.t] = i.am(0, n[r], e, r, 0, i.t);
	e.s = 0, e.clamp(), this.s != t.s && BigInteger.ZERO.subTo(e, e)
}

function bnpSquareTo(t) {
	for (var e = this.abs(), i = t.t = 2 * e.t; --i >= 0;) t[i] = 0;
	for (i = 0; i < e.t - 1; ++i) {
		var n = e.am(i, e[i], t, 2 * i, 0, 1);
		(t[i + e.t] += e.am(i + 1, 2 * e[i], t, 2 * i + 1, n, e.t - i - 1)) >= e.DV && (t[i + e.t] -= e.DV, t[i + e.t + 1] = 1)
	}
	t.t > 0 && (t[t.t - 1] += e.am(i, e[i], t, 2 * i, 0, 1)), t.s = 0, t.clamp()
}

function bnpDivRemTo(t, e, i) {
	var n = t.abs();
	if (!(n.t <= 0)) {
		var r = this.abs();
		if (r.t < n.t) return null != e && e.fromInt(0), void(null != i && this.copyTo(i));
		null == i && (i = nbi());
		var o = nbi(),
			s = this.s,
			a = t.s,
			l = this.DB - nbits(n[n.t - 1]);
		l > 0 ? (n.lShiftTo(l, o), r.lShiftTo(l, i)) : (n.copyTo(o), r.copyTo(i));
		var u = o.t,
			c = o[u - 1];
		if (0 != c) {
			var h = c * (1 << this.F1) + (u > 1 ? o[u - 2] >> this.F2 : 0),
				d = this.FV / h,
				p = (1 << this.F1) / h,
				f = 1 << this.F2,
				m = i.t,
				g = m - u,
				v = null == e ? nbi() : e;
			for (o.dlShiftTo(g, v), i.compareTo(v) >= 0 && (i[i.t++] = 1, i.subTo(v, i)), BigInteger.ONE.dlShiftTo(u, v), v.subTo(o, o); o.t < u;) o[o.t++] = 0;
			for (; --g >= 0;) {
				var _ = i[--m] == c ? this.DM : Math.floor(i[m] * d + (i[m - 1] + f) * p);
				if ((i[m] += o.am(0, _, i, g, 0, u)) < _)
					for (o.dlShiftTo(g, v), i.subTo(v, i); i[m] < --_;) i.subTo(v, i)
			}
			null != e && (i.drShiftTo(u, e), s != a && BigInteger.ZERO.subTo(e, e)), i.t = u, i.clamp(), l > 0 && i.rShiftTo(l, i), 0 > s && BigInteger.ZERO.subTo(i, i)
		}
	}
}

function bnMod(t) {
	var e = nbi();
	return this.abs().divRemTo(t, null, e), this.s < 0 && e.compareTo(BigInteger.ZERO) > 0 && t.subTo(e, e), e
}

function Classic(t) {
	this.m = t
}

function cConvert(t) {
	return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
}

function cRevert(t) {
	return t
}

function cReduce(t) {
	t.divRemTo(this.m, null, t)
}

function cMulTo(t, e, i) {
	t.multiplyTo(e, i), this.reduce(i)
}

function cSqrTo(t, e) {
	t.squareTo(e), this.reduce(e)
}

function bnpInvDigit() {
	if (this.t < 1) return 0;
	var t = this[0];
	if (0 == (1 & t)) return 0;
	var e = 3 & t;
	return e = e * (2 - (15 & t) * e) & 15, e = e * (2 - (255 & t) * e) & 255, e = e * (2 - ((65535 & t) * e & 65535)) & 65535, e = e * (2 - t * e % this.DV) % this.DV, e > 0 ? this.DV - e : -e
}

function Montgomery(t) {
	this.m = t, this.mp = t.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << t.DB - 15) - 1, this.mt2 = 2 * t.t
}

function montConvert(t) {
	var e = nbi();
	return t.abs().dlShiftTo(this.m.t, e), e.divRemTo(this.m, null, e), t.s < 0 && e.compareTo(BigInteger.ZERO) > 0 && this.m.subTo(e, e), e
}

function montRevert(t) {
	var e = nbi();
	return t.copyTo(e), this.reduce(e), e
}

function montReduce(t) {
	for (; t.t <= this.mt2;) t[t.t++] = 0;
	for (var e = 0; e < this.m.t; ++e) {
		var i = 32767 & t[e],
			n = i * this.mpl + ((i * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
		for (t[i = e + this.m.t] += this.m.am(0, n, t, e, 0, this.m.t); t[i] >= t.DV;) t[i] -= t.DV, t[++i]++
	}
	t.clamp(), t.drShiftTo(this.m.t, t), t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
}

function montSqrTo(t, e) {
	t.squareTo(e), this.reduce(e)
}

function montMulTo(t, e, i) {
	t.multiplyTo(e, i), this.reduce(i)
}

function bnpIsEven() {
	return 0 == (this.t > 0 ? 1 & this[0] : this.s)
}

function bnpExp(t, e) {
	if (t > 4294967295 || 1 > t) return BigInteger.ONE;
	var i = nbi(),
		n = nbi(),
		r = e.convert(this),
		o = nbits(t) - 1;
	for (r.copyTo(i); --o >= 0;)
		if (e.sqrTo(i, n), (t & 1 << o) > 0) e.mulTo(n, r, i);
		else {
			var s = i;
			i = n, n = s
		}
	return e.revert(i)
}

function bnModPowInt(t, e) {
	var i;
	return i = 256 > t || e.isEven() ? new Classic(e) : new Montgomery(e), this.exp(t, i)
}

function Arcfour() {
	this.i = 0, this.j = 0, this.S = new Array
}

function ARC4init(t) {
	var e, i, n;
	for (e = 0; 256 > e; ++e) this.S[e] = e;
	for (i = 0, e = 0; 256 > e; ++e) i = i + this.S[e] + t[e % t.length] & 255, n = this.S[e], this.S[e] = this.S[i], this.S[i] = n;
	this.i = 0, this.j = 0
}

function ARC4next() {
	var t;
	return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, t = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = t, this.S[t + this.S[this.i] & 255]
}

function prng_newstate() {
	return new Arcfour
}

function rng_seed_int(t) {
	rng_pool[rng_pptr++] ^= 255 & t, rng_pool[rng_pptr++] ^= t >> 8 & 255, rng_pool[rng_pptr++] ^= t >> 16 & 255, rng_pool[rng_pptr++] ^= t >> 24 & 255, rng_pptr >= rng_psize && (rng_pptr -= rng_psize)
}

function rng_seed_time() {
	rng_seed_int((new Date).getTime())
}

function rng_get_byte() {
	if (null == rng_state) {
		for (rng_seed_time(), (rng_state = prng_newstate()).init(rng_pool), rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) rng_pool[rng_pptr] = 0;
		rng_pptr = 0
	}
	return rng_state.next()
}

function rng_get_bytes(t) {
	var e;
	for (e = 0; e < t.length; ++e) t[e] = rng_get_byte()
}

function SecureRandom() {}

function parseBigInt(t, e) {
	return new BigInteger(t, e)
}

function linebrk(t, e) {
	for (var i = "", n = 0; n + e < t.length;) i += t.substring(n, n + e) + "\n", n += e;
	return i + t.substring(n, t.length)
}

function byte2Hex(t) {
	return 16 > t ? "0" + t.toString(16) : t.toString(16)
}

function pkcs1pad2(t, e) {
	if (e < t.length + 11) return alert("Message too long for RSA"), null;
	for (var i = new Array, n = t.length - 1; n >= 0 && e > 0;) {
		var r = t.charCodeAt(n--);
		128 > r ? i[--e] = r : r > 127 && 2048 > r ? (i[--e] = 63 & r | 128, i[--e] = r >> 6 | 192) : (i[--e] = 63 & r | 128, i[--e] = r >> 6 & 63 | 128, i[--e] = r >> 12 | 224)
	}
	i[--e] = 0;
	for (var o = new SecureRandom, s = new Array; e > 2;) {
		for (s[0] = 0; 0 == s[0];) o.nextBytes(s);
		i[--e] = s[0]
	}
	return i[--e] = 2, i[--e] = 0, new BigInteger(i)
}

function RSAKey() {
	this.n = null, this.e = 0, this.d = null, this.p = null, this.q = null, this.dmp1 = null, this.dmq1 = null, this.coeff = null
}

function RSASetPublic(t, e) {
	null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = parseBigInt(t, 16), this.e = parseInt(e, 16)) : alert("Invalid RSA public key")
}

function RSADoPublic(t) {
	return t.modPowInt(this.e, this.n)
}

function RSAEncrypt(t) {
	var e = pkcs1pad2(t, this.n.bitLength() + 7 >> 3);
	if (null == e) return null;
	var i = this.doPublic(e);
	if (null == i) return null;
	var n = i.toString(16);
	return 0 == (1 & n.length) ? n : "0" + n
}

function hex2b64(t) {
	var e, i, n = "";
	for (e = 0; e + 3 <= t.length; e += 3) i = parseInt(t.substring(e, e + 3), 16), n += b64map.charAt(i >> 6) + b64map.charAt(63 & i);
	for (e + 1 == t.length ? (i = parseInt(t.substring(e, e + 1), 16), n += b64map.charAt(i << 2)) : e + 2 == t.length && (i = parseInt(t.substring(e, e + 2), 16), n += b64map.charAt(i >> 2) + b64map.charAt((3 & i) << 4));
		(3 & n.length) > 0;) n += b64padchar;
	return n
}

function b64tohex(t) {
	var e, i, n = "",
		r = 0;
	for (e = 0; e < t.length && t.charAt(e) != b64padchar; ++e) v = b64map.indexOf(t.charAt(e)), v < 0 || (0 == r ? (n += int2char(v >> 2), i = 3 & v, r = 1) : 1 == r ? (n += int2char(i << 2 | v >> 4), i = 15 & v, r = 2) : 2 == r ? (n += int2char(i), n += int2char(v >> 2), i = 3 & v, r = 3) : (n += int2char(i << 2 | v >> 4), n += int2char(15 & v), r = 0));
	return 1 == r && (n += int2char(i << 2)), n
}

function b64toBA(t) {
	var e, i = b64tohex(t),
		n = new Array;
	for (e = 0; 2 * e < i.length; ++e) n[e] = parseInt(i.substring(2 * e, 2 * e + 2), 16);
	return n
}! function (t, e) {
	"object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function (t) {
		if (!t.document) throw new Error("jQuery requires a window with a document");
		return e(t)
	} : e(t)
}("undefined" != typeof window ? window : this, function (t, e) {
	function i(t) {
		var e = !!t && "length" in t && t.length,
			i = ot.type(t);
		return "function" !== i && !ot.isWindow(t) && ("array" === i || 0 === e || "number" == typeof e && e > 0 && e - 1 in t)
	}

	function n(t, e, i) {
		if (ot.isFunction(e)) return ot.grep(t, function (t, n) {
			return !!e.call(t, n, t) !== i
		});
		if (e.nodeType) return ot.grep(t, function (t) {
			return t === e !== i
		});
		if ("string" == typeof e) {
			if (mt.test(e)) return ot.filter(e, t, i);
			e = ot.filter(e, t)
		}
		return ot.grep(t, function (t) {
			return K.call(e, t) > -1 !== i
		})
	}

	function r(t, e) {
		for (;
			(t = t[e]) && 1 !== t.nodeType;);
		return t
	}

	function o(t) {
		var e = {};
		return ot.each(t.match(xt) || [], function (t, i) {
			e[i] = !0
		}), e
	}

	function s() {
		G.removeEventListener("DOMContentLoaded", s), t.removeEventListener("load", s), ot.ready()
	}

	function a() {
		this.expando = ot.expando + a.uid++
	}

	function l(t, e, i) {
		var n;
		if (void 0 === i && 1 === t.nodeType)
			if (n = "data-" + e.replace(kt, "-$&").toLowerCase(), "string" == typeof (i = t.getAttribute(n))) {
				try {
					i = "true" === i || "false" !== i && ("null" === i ? null : +i + "" === i ? +i : Et.test(i) ? ot.parseJSON(i) : i)
				} catch (t) {}
				St.set(t, e, i)
			} else i = void 0;
		return i
	}

	function u(t, e, i, n) {
		var r, o = 1,
			s = 20,
			a = n ? function () {
				return n.cur()
			} : function () {
				return ot.css(t, e, "")
			},
			l = a(),
			u = i && i[3] || (ot.cssNumber[e] ? "" : "px"),
			c = (ot.cssNumber[e] || "px" !== u && +l) && Dt.exec(ot.css(t, e));
		if (c && c[3] !== u) {
			u = u || c[3], i = i || [], c = +l || 1;
			do {
				o = o || ".5", c /= o, ot.style(t, e, c + u)
			} while (o !== (o = a() / l) && 1 !== o && --s)
		}
		return i && (c = +c || +l || 0, r = i[1] ? c + (i[1] + 1) * i[2] : +i[2], n && (n.unit = u, n.start = c, n.end = r)), r
	}

	function c(t, e) {
		var i = void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e || "*") : void 0 !== t.querySelectorAll ? t.querySelectorAll(e || "*") : [];
		return void 0 === e || e && ot.nodeName(t, e) ? ot.merge([t], i) : i
	}

	function h(t, e) {
		for (var i = 0, n = t.length; n > i; i++) Ct.set(t[i], "globalEval", !e || Ct.get(e[i], "globalEval"))
	}

	function d(t, e, i, n, r) {
		for (var o, s, a, l, u, d, p = e.createDocumentFragment(), f = [], m = 0, g = t.length; g > m; m++)
			if ((o = t[m]) || 0 === o)
				if ("object" === ot.type(o)) ot.merge(f, o.nodeType ? [o] : o);
				else if (Bt.test(o)) {
			for (s = s || p.appendChild(e.createElement("div")), a = (It.exec(o) || ["", ""])[1].toLowerCase(), l = Nt[a] || Nt._default, s.innerHTML = l[1] + ot.htmlPrefilter(o) + l[2], d = l[0]; d--;) s = s.lastChild;
			ot.merge(f, s.childNodes), (s = p.firstChild).textContent = ""
		} else f.push(e.createTextNode(o));
		for (p.textContent = "", m = 0; o = f[m++];)
			if (n && ot.inArray(o, n) > -1) r && r.push(o);
			else if (u = ot.contains(o.ownerDocument, o), s = c(p.appendChild(o), "script"), u && h(s), i)
			for (d = 0; o = s[d++];) jt.test(o.type || "") && i.push(o);
		return p
	}

	function p() {
		return !0
	}

	function f() {
		return !1
	}

	function m() {
		try {
			return G.activeElement
		} catch (t) {}
	}

	function g(t, e, i, n, r, o) {
		var s, a;
		if ("object" == typeof e) {
			"string" != typeof i && (n = n || i, i = void 0);
			for (a in e) g(t, a, i, n, e[a], o);
			return t
		}
		if (null == n && null == r ? (r = i, n = i = void 0) : null == r && ("string" == typeof i ? (r = n, n = void 0) : (r = n, n = i, i = void 0)), !1 === r) r = f;
		else if (!r) return t;
		return 1 === o && (s = r, r = function (t) {
			return ot().off(t), s.apply(this, arguments)
		}, r.guid = s.guid || (s.guid = ot.guid++)), t.each(function () {
			ot.event.add(this, e, r, n, i)
		})
	}

	function v(t, e) {
		return ot.nodeName(t, "table") && ot.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
	}

	function _(t) {
		return t.type = (null !== t.getAttribute("type")) + "/" + t.type, t
	}

	function y(t) {
		var e = qt.exec(t.type);
		return e ? t.type = e[1] : t.removeAttribute("type"), t
	}

	function x(t, e) {
		var i, n, r, o, s, a, l, u;
		if (1 === e.nodeType) {
			if (Ct.hasData(t) && (o = Ct.access(t), s = Ct.set(e, o), u = o.events)) {
				delete s.handle, s.events = {};
				for (r in u)
					for (i = 0, n = u[r].length; n > i; i++) ot.event.add(e, r, u[r][i])
			}
			St.hasData(t) && (a = St.access(t), l = ot.extend({}, a), St.set(e, l))
		}
	}

	function b(t, e) {
		var i = e.nodeName.toLowerCase();
		"input" === i && Mt.test(t.type) ? e.checked = t.checked : "input" !== i && "textarea" !== i || (e.defaultValue = t.defaultValue)
	}

	function w(t, e, i, n) {
		e = Q.apply([], e);
		var r, o, s, a, l, u, h = 0,
			p = t.length,
			f = p - 1,
			m = e[0],
			g = ot.isFunction(m);
		if (g || p > 1 && "string" == typeof m && !nt.checkClone && $t.test(m)) return t.each(function (r) {
			var o = t.eq(r);
			g && (e[0] = m.call(this, r, o.html())), w(o, e, i, n)
		});
		if (p && (r = d(e, t[0].ownerDocument, !1, t, n), o = r.firstChild, 1 === r.childNodes.length && (r = o), o || n)) {
			for (a = (s = ot.map(c(r, "script"), _)).length; p > h; h++) l = r, h !== f && (l = ot.clone(l, !0, !0), a && ot.merge(s, c(l, "script"))), i.call(t[h], l, h);
			if (a)
				for (u = s[s.length - 1].ownerDocument, ot.map(s, y), h = 0; a > h; h++) l = s[h], jt.test(l.type || "") && !Ct.access(l, "globalEval") && ot.contains(u, l) && (l.src ? ot._evalUrl && ot._evalUrl(l.src) : ot.globalEval(l.textContent.replace(Ut, "")))
		}
		return t
	}

	function T(t, e, i) {
		for (var n, r = e ? ot.filter(e, t) : t, o = 0; null != (n = r[o]); o++) i || 1 !== n.nodeType || ot.cleanData(c(n)), n.parentNode && (i && ot.contains(n.ownerDocument, n) && h(c(n, "script")), n.parentNode.removeChild(n));
		return t
	}

	function C(t, e) {
		var i = ot(e.createElement(t)).appendTo(e.body),
			n = ot.css(i[0], "display");
		return i.detach(), n
	}

	function S(t) {
		var e = G,
			i = Xt[t];
		return i || ("none" !== (i = C(t, e)) && i || (Wt = (Wt || ot("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement), (e = Wt[0].contentDocument).write(), e.close(), i = C(t, e), Wt.detach()), Xt[t] = i), i
	}

	function E(t, e, i) {
		var n, r, o, s, a = t.style;
		return i = i || Gt(t), "" !== (s = i ? i.getPropertyValue(e) || i[e] : void 0) && void 0 !== s || ot.contains(t.ownerDocument, t) || (s = ot.style(t, e)), i && !nt.pixelMarginRight() && Yt.test(s) && Vt.test(e) && (n = a.width, r = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = i.width, a.width = n, a.minWidth = r, a.maxWidth = o), void 0 !== s ? s + "" : s
	}

	function k(t, e) {
		return {
			get: function () {
				return t() ? void delete this.get : (this.get = e).apply(this, arguments)
			}
		}
	}

	function O(t) {
		if (t in ie) return t;
		for (var e = t[0].toUpperCase() + t.slice(1), i = ee.length; i--;)
			if ((t = ee[i] + e) in ie) return t
	}

	function D(t, e, i) {
		var n = Dt.exec(e);
		return n ? Math.max(0, n[2] - (i || 0)) + (n[3] || "px") : e
	}

	function A(t, e, i, n, r) {
		for (var o = i === (n ? "border" : "content") ? 4 : "width" === e ? 1 : 0, s = 0; 4 > o; o += 2) "margin" === i && (s += ot.css(t, i + At[o], !0, r)), n ? ("content" === i && (s -= ot.css(t, "padding" + At[o], !0, r)), "margin" !== i && (s -= ot.css(t, "border" + At[o] + "Width", !0, r))) : (s += ot.css(t, "padding" + At[o], !0, r), "padding" !== i && (s += ot.css(t, "border" + At[o] + "Width", !0, r)));
		return s
	}

	function P(t, e, i) {
		var n = !0,
			r = "width" === e ? t.offsetWidth : t.offsetHeight,
			o = Gt(t),
			s = "border-box" === ot.css(t, "boxSizing", !1, o);
		if (0 >= r || null == r) {
			if ((0 > (r = E(t, e, o)) || null == r) && (r = t.style[e]), Yt.test(r)) return r;
			n = s && (nt.boxSizingReliable() || r === t.style[e]), r = parseFloat(r) || 0
		}
		return r + A(t, e, i || (s ? "border" : "content"), n, o) + "px"
	}

	function M(t, e) {
		for (var i, n, r, o = [], s = 0, a = t.length; a > s; s++)(n = t[s]).style && (o[s] = Ct.get(n, "olddisplay"), i = n.style.display, e ? (o[s] || "none" !== i || (n.style.display = ""), "" === n.style.display && Pt(n) && (o[s] = Ct.access(n, "olddisplay", S(n.nodeName)))) : (r = Pt(n), "none" === i && r || Ct.set(n, "olddisplay", r ? i : ot.css(n, "display"))));
		for (s = 0; a > s; s++)(n = t[s]).style && (e && "none" !== n.style.display && "" !== n.style.display || (n.style.display = e ? o[s] || "" : "none"));
		return t
	}

	function I(t, e, i, n, r) {
		return new I.prototype.init(t, e, i, n, r)
	}

	function j() {
		return t.setTimeout(function () {
			ne = void 0
		}), ne = ot.now()
	}

	function N(t, e) {
		var i, n = 0,
			r = {
				height: t
			};
		for (e = e ? 1 : 0; 4 > n; n += 2 - e) i = At[n], r["margin" + i] = r["padding" + i] = t;
		return e && (r.opacity = r.width = t), r
	}

	function B(t, e, i) {
		for (var n, r = (F.tweeners[e] || []).concat(F.tweeners["*"]), o = 0, s = r.length; s > o; o++)
			if (n = r[o].call(i, e, t)) return n
	}

	function R(t, e, i) {
		var n, r, o, s, a, l, u, c = this,
			h = {},
			d = t.style,
			p = t.nodeType && Pt(t),
			f = Ct.get(t, "fxshow");
		i.queue || (null == (a = ot._queueHooks(t, "fx")).unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function () {
			a.unqueued || l()
		}), a.unqueued++, c.always(function () {
			c.always(function () {
				a.unqueued--, ot.queue(t, "fx").length || a.empty.fire()
			})
		})), 1 === t.nodeType && ("height" in e || "width" in e) && (i.overflow = [d.overflow, d.overflowX, d.overflowY], u = ot.css(t, "display"), "inline" === ("none" === u ? Ct.get(t, "olddisplay") || S(t.nodeName) : u) && "none" === ot.css(t, "float") && (d.display = "inline-block")), i.overflow && (d.overflow = "hidden", c.always(function () {
			d.overflow = i.overflow[0], d.overflowX = i.overflow[1], d.overflowY = i.overflow[2]
		}));
		for (n in e)
			if (r = e[n], oe.exec(r)) {
				if (delete e[n], o = o || "toggle" === r, r === (p ? "hide" : "show")) {
					if ("show" !== r || !f || void 0 === f[n]) continue;
					p = !0
				}
				h[n] = f && f[n] || ot.style(t, n)
			} else u = void 0;
		if (ot.isEmptyObject(h)) "inline" === ("none" === u ? S(t.nodeName) : u) && (d.display = u);
		else {
			f ? "hidden" in f && (p = f.hidden) : f = Ct.access(t, "fxshow", {}), o && (f.hidden = !p), p ? ot(t).show() : c.done(function () {
				ot(t).hide()
			}), c.done(function () {
				var e;
				Ct.remove(t, "fxshow");
				for (e in h) ot.style(t, e, h[e])
			});
			for (n in h) s = B(p ? f[n] : 0, n, c), n in f || (f[n] = s.start, p && (s.end = s.start, s.start = "width" === n || "height" === n ? 1 : 0))
		}
	}

	function L(t, e) {
		var i, n, r, o, s;
		for (i in t)
			if (n = ot.camelCase(i), r = e[n], o = t[i], ot.isArray(o) && (r = o[1], o = t[i] = o[0]), i !== n && (t[n] = o, delete t[i]), (s = ot.cssHooks[n]) && "expand" in s) {
				o = s.expand(o), delete t[n];
				for (i in o) i in t || (t[i] = o[i], e[i] = r)
			} else e[n] = r
	}

	function F(t, e, i) {
		var n, r, o = 0,
			s = F.prefilters.length,
			a = ot.Deferred().always(function () {
				delete l.elem
			}),
			l = function () {
				if (r) return !1;
				for (var e = ne || j(), i = Math.max(0, u.startTime + u.duration - e), n = 1 - (i / u.duration || 0), o = 0, s = u.tweens.length; s > o; o++) u.tweens[o].run(n);
				return a.notifyWith(t, [u, n, i]), 1 > n && s ? i : (a.resolveWith(t, [u]), !1)
			},
			u = a.promise({
				elem: t,
				props: ot.extend({}, e),
				opts: ot.extend(!0, {
					specialEasing: {},
					easing: ot.easing._default
				}, i),
				originalProperties: e,
				originalOptions: i,
				startTime: ne || j(),
				duration: i.duration,
				tweens: [],
				createTween: function (e, i) {
					var n = ot.Tween(t, u.opts, e, i, u.opts.specialEasing[e] || u.opts.easing);
					return u.tweens.push(n), n
				},
				stop: function (e) {
					var i = 0,
						n = e ? u.tweens.length : 0;
					if (r) return this;
					for (r = !0; n > i; i++) u.tweens[i].run(1);
					return e ? (a.notifyWith(t, [u, 1, 0]), a.resolveWith(t, [u, e])) : a.rejectWith(t, [u, e]), this
				}
			}),
			c = u.props;
		for (L(c, u.opts.specialEasing); s > o; o++)
			if (n = F.prefilters[o].call(u, t, c, u.opts)) return ot.isFunction(n.stop) && (ot._queueHooks(u.elem, u.opts.queue).stop = ot.proxy(n.stop, n)), n;
		return ot.map(c, B, u), ot.isFunction(u.opts.start) && u.opts.start.call(t, u), ot.fx.timer(ot.extend(l, {
			elem: t,
			anim: u,
			queue: u.opts.queue
		})), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
	}

	function z(t) {
		return t.getAttribute && t.getAttribute("class") || ""
	}

	function H(t) {
		return function (e, i) {
			"string" != typeof e && (i = e, e = "*");
			var n, r = 0,
				o = e.toLowerCase().match(xt) || [];
			if (ot.isFunction(i))
				for (; n = o[r++];) "+" === n[0] ? (n = n.slice(1) || "*", (t[n] = t[n] || []).unshift(i)) : (t[n] = t[n] || []).push(i)
		}
	}

	function $(t, e, i, n) {
		function r(a) {
			var l;
			return o[a] = !0, ot.each(t[a] || [], function (t, a) {
				var u = a(e, i, n);
				return "string" != typeof u || s || o[u] ? s ? !(l = u) : void 0 : (e.dataTypes.unshift(u), r(u), !1)
			}), l
		}
		var o = {},
			s = t === Se;
		return r(e.dataTypes[0]) || !o["*"] && r("*")
	}

	function q(t, e) {
		var i, n, r = ot.ajaxSettings.flatOptions || {};
		for (i in e) void 0 !== e[i] && ((r[i] ? t : n || (n = {}))[i] = e[i]);
		return n && ot.extend(!0, t, n), t
	}

	function U(t, e, i) {
		for (var n, r, o, s, a = t.contents, l = t.dataTypes;
			"*" === l[0];) l.shift(), void 0 === n && (n = t.mimeType || e.getResponseHeader("Content-Type"));
		if (n)
			for (r in a)
				if (a[r] && a[r].test(n)) {
					l.unshift(r);
					break
				}
		if (l[0] in i) o = l[0];
		else {
			for (r in i) {
				if (!l[0] || t.converters[r + " " + l[0]]) {
					o = r;
					break
				}
				s || (s = r)
			}
			o = o || s
		}
		return o ? (o !== l[0] && l.unshift(o), i[o]) : void 0
	}

	function W(t, e, i, n) {
		var r, o, s, a, l, u = {},
			c = t.dataTypes.slice();
		if (c[1])
			for (s in t.converters) u[s.toLowerCase()] = t.converters[s];
		for (o = c.shift(); o;)
			if (t.responseFields[o] && (i[t.responseFields[o]] = e), !l && n && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = o, o = c.shift())
				if ("*" === o) o = l;
				else if ("*" !== l && l !== o) {
			if (!(s = u[l + " " + o] || u["* " + o]))
				for (r in u)
					if ((a = r.split(" "))[1] === o && (s = u[l + " " + a[0]] || u["* " + a[0]])) {
						!0 === s ? s = u[r] : !0 !== u[r] && (o = a[0], c.unshift(a[1]));
						break
					}
			if (!0 !== s)
				if (s && t.throws) e = s(e);
				else try {
					e = s(e)
				} catch (t) {
					return {
						state: "parsererror",
						error: s ? t : "No conversion from " + l + " to " + o
					}
				}
		}
		return {
			state: "success",
			data: e
		}
	}

	function X(t, e, i, n) {
		var r;
		if (ot.isArray(e)) ot.each(e, function (e, r) {
			i || De.test(t) ? n(t, r) : X(t + "[" + ("object" == typeof r && null != r ? e : "") + "]", r, i, n)
		});
		else if (i || "object" !== ot.type(e)) n(t, e);
		else
			for (r in e) X(t + "[" + r + "]", e[r], i, n)
	}

	function V(t) {
		return ot.isWindow(t) ? t : 9 === t.nodeType && t.defaultView
	}
	var Y = [],
		G = t.document,
		Z = Y.slice,
		Q = Y.concat,
		J = Y.push,
		K = Y.indexOf,
		tt = {},
		et = tt.toString,
		it = tt.hasOwnProperty,
		nt = {},
		rt = "2.2.4",
		ot = function (t, e) {
			return new ot.fn.init(t, e)
		},
		st = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
		at = /^-ms-/,
		lt = /-([\da-z])/gi,
		ut = function (t, e) {
			return e.toUpperCase()
		};
	ot.fn = ot.prototype = {
		jquery: rt,
		constructor: ot,
		selector: "",
		length: 0,
		toArray: function () {
			return Z.call(this)
		},
		get: function (t) {
			return null != t ? 0 > t ? this[t + this.length] : this[t] : Z.call(this)
		},
		pushStack: function (t) {
			var e = ot.merge(this.constructor(), t);
			return e.prevObject = this, e.context = this.context, e
		},
		each: function (t) {
			return ot.each(this, t)
		},
		map: function (t) {
			return this.pushStack(ot.map(this, function (e, i) {
				return t.call(e, i, e)
			}))
		},
		slice: function () {
			return this.pushStack(Z.apply(this, arguments))
		},
		first: function () {
			return this.eq(0)
		},
		last: function () {
			return this.eq(-1)
		},
		eq: function (t) {
			var e = this.length,
				i = +t + (0 > t ? e : 0);
			return this.pushStack(i >= 0 && e > i ? [this[i]] : [])
		},
		end: function () {
			return this.prevObject || this.constructor()
		},
		push: J,
		sort: Y.sort,
		splice: Y.splice
	}, ot.extend = ot.fn.extend = function () {
		var t, e, i, n, r, o, s = arguments[0] || {},
			a = 1,
			l = arguments.length,
			u = !1;
		for ("boolean" == typeof s && (u = s, s = arguments[a] || {}, a++), "object" == typeof s || ot.isFunction(s) || (s = {}), a === l && (s = this, a--); l > a; a++)
			if (null != (t = arguments[a]))
				for (e in t) i = s[e], n = t[e], s !== n && (u && n && (ot.isPlainObject(n) || (r = ot.isArray(n))) ? (r ? (r = !1, o = i && ot.isArray(i) ? i : []) : o = i && ot.isPlainObject(i) ? i : {}, s[e] = ot.extend(u, o, n)) : void 0 !== n && (s[e] = n));
		return s
	}, ot.extend({
		expando: "jQuery" + (rt + Math.random()).replace(/\D/g, ""),
		isReady: !0,
		error: function (t) {
			throw new Error(t)
		},
		noop: function () {},
		isFunction: function (t) {
			return "function" === ot.type(t)
		},
		isArray: Array.isArray,
		isWindow: function (t) {
			return null != t && t === t.window
		},
		isNumeric: function (t) {
			var e = t && t.toString();
			return !ot.isArray(t) && e - parseFloat(e) + 1 >= 0
		},
		isPlainObject: function (t) {
			var e;
			if ("object" !== ot.type(t) || t.nodeType || ot.isWindow(t)) return !1;
			if (t.constructor && !it.call(t, "constructor") && !it.call(t.constructor.prototype || {}, "isPrototypeOf")) return !1;
			for (e in t);
			return void 0 === e || it.call(t, e)
		},
		isEmptyObject: function (t) {
			var e;
			for (e in t) return !1;
			return !0
		},
		type: function (t) {
			return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? tt[et.call(t)] || "object" : typeof t
		},
		globalEval: function (t) {
			var e, i = eval;
			(t = ot.trim(t)) && (1 === t.indexOf("use strict") ? (e = G.createElement("script"), e.text = t, G.head.appendChild(e).parentNode.removeChild(e)) : i(t))
		},
		camelCase: function (t) {
			return t.replace(at, "ms-").replace(lt, ut)
		},
		nodeName: function (t, e) {
			return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
		},
		each: function (t, e) {
			var n, r = 0;
			if (i(t))
				for (n = t.length; n > r && !1 !== e.call(t[r], r, t[r]); r++);
			else
				for (r in t)
					if (!1 === e.call(t[r], r, t[r])) break;
			return t
		},
		trim: function (t) {
			return null == t ? "" : (t + "").replace(st, "")
		},
		makeArray: function (t, e) {
			var n = e || [];
			return null != t && (i(Object(t)) ? ot.merge(n, "string" == typeof t ? [t] : t) : J.call(n, t)), n
		},
		inArray: function (t, e, i) {
			return null == e ? -1 : K.call(e, t, i)
		},
		merge: function (t, e) {
			for (var i = +e.length, n = 0, r = t.length; i > n; n++) t[r++] = e[n];
			return t.length = r, t
		},
		grep: function (t, e, i) {
			for (var n = [], r = 0, o = t.length, s = !i; o > r; r++) !e(t[r], r) !== s && n.push(t[r]);
			return n
		},
		map: function (t, e, n) {
			var r, o, s = 0,
				a = [];
			if (i(t))
				for (r = t.length; r > s; s++) null != (o = e(t[s], s, n)) && a.push(o);
			else
				for (s in t) null != (o = e(t[s], s, n)) && a.push(o);
			return Q.apply([], a)
		},
		guid: 1,
		proxy: function (t, e) {
			var i, n, r;
			return "string" == typeof e && (i = t[e], e = t, t = i), ot.isFunction(t) ? (n = Z.call(arguments, 2), r = function () {
				return t.apply(e || this, n.concat(Z.call(arguments)))
			}, r.guid = t.guid = t.guid || ot.guid++, r) : void 0
		},
		now: Date.now,
		support: nt
	}), "function" == typeof Symbol && (ot.fn[Symbol.iterator] = Y[Symbol.iterator]), ot.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (t, e) {
		tt["[object " + e + "]"] = e.toLowerCase()
	});
	var ct = function (t) {
		function e(t, e, i, n) {
			var r, o, s, a, u, h, d, p, f = e && e.ownerDocument,
				m = e ? e.nodeType : 9;
			if (i = i || [], "string" != typeof t || !t || 1 !== m && 9 !== m && 11 !== m) return i;
			if (!n && ((e ? e.ownerDocument || e : L) !== A && D(e), e = e || A, M)) {
				if (11 !== m && (h = mt.exec(t)))
					if (r = h[1]) {
						if (9 === m) {
							if (!(s = e.getElementById(r))) return i;
							if (s.id === r) return i.push(s), i
						} else if (f && (s = f.getElementById(r)) && B(e, s) && s.id === r) return i.push(s), i
					} else {
						if (h[2]) return Z.apply(i, e.getElementsByTagName(t)), i;
						if ((r = h[3]) && y.getElementsByClassName && e.getElementsByClassName) return Z.apply(i, e.getElementsByClassName(r)), i
					}
				if (y.qsa && !q[t + " "] && (!I || !I.test(t))) {
					if (1 !== m) f = e, p = t;
					else if ("object" !== e.nodeName.toLowerCase()) {
						for ((a = e.getAttribute("id")) ? a = a.replace(vt, "\\$&") : e.setAttribute("id", a = R), o = (d = T(t)).length, u = ct.test(a) ? "#" + a : "[id='" + a + "']"; o--;) d[o] = u + " " + c(d[o]);
						p = d.join(","), f = gt.test(t) && l(e.parentNode) || e
					}
					if (p) try {
						return Z.apply(i, f.querySelectorAll(p)), i
					} catch (t) {} finally {
						a === R && e.removeAttribute("id")
					}
				}
			}
			return S(t.replace(ot, "$1"), e, i, n)
		}

		function i() {
			function t(i, n) {
				return e.push(i + " ") > x.cacheLength && delete t[e.shift()], t[i + " "] = n
			}
			var e = [];
			return t
		}

		function n(t) {
			return t[R] = !0, t
		}

		function r(t) {
			var e = A.createElement("div");
			try {
				return !!t(e)
			} catch (t) {
				return !1
			} finally {
				e.parentNode && e.parentNode.removeChild(e), e = null
			}
		}

		function o(t, e) {
			for (var i = t.split("|"), n = i.length; n--;) x.attrHandle[i[n]] = e
		}

		function s(t, e) {
			var i = e && t,
				n = i && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || W) - (~t.sourceIndex || W);
			if (n) return n;
			if (i)
				for (; i = i.nextSibling;)
					if (i === e) return -1;
			return t ? 1 : -1
		}

		function a(t) {
			return n(function (e) {
				return e = +e, n(function (i, n) {
					for (var r, o = t([], i.length, e), s = o.length; s--;) i[r = o[s]] && (i[r] = !(n[r] = i[r]))
				})
			})
		}

		function l(t) {
			return t && void 0 !== t.getElementsByTagName && t
		}

		function u() {}

		function c(t) {
			for (var e = 0, i = t.length, n = ""; i > e; e++) n += t[e].value;
			return n
		}

		function h(t, e, i) {
			var n = e.dir,
				r = i && "parentNode" === n,
				o = z++;
			return e.first ? function (e, i, o) {
				for (; e = e[n];)
					if (1 === e.nodeType || r) return t(e, i, o)
			} : function (e, i, s) {
				var a, l, u, c = [F, o];
				if (s) {
					for (; e = e[n];)
						if ((1 === e.nodeType || r) && t(e, i, s)) return !0
				} else
					for (; e = e[n];)
						if (1 === e.nodeType || r) {
							if (u = e[R] || (e[R] = {}), l = u[e.uniqueID] || (u[e.uniqueID] = {}), (a = l[n]) && a[0] === F && a[1] === o) return c[2] = a[2];
							if (l[n] = c, c[2] = t(e, i, s)) return !0
						}
			}
		}

		function d(t) {
			return t.length > 1 ? function (e, i, n) {
				for (var r = t.length; r--;)
					if (!t[r](e, i, n)) return !1;
				return !0
			} : t[0]
		}

		function p(t, i, n) {
			for (var r = 0, o = i.length; o > r; r++) e(t, i[r], n);
			return n
		}

		function f(t, e, i, n, r) {
			for (var o, s = [], a = 0, l = t.length, u = null != e; l > a; a++)(o = t[a]) && (i && !i(o, n, r) || (s.push(o), u && e.push(a)));
			return s
		}

		function m(t, e, i, r, o, s) {
			return r && !r[R] && (r = m(r)), o && !o[R] && (o = m(o, s)), n(function (n, s, a, l) {
				var u, c, h, d = [],
					m = [],
					g = s.length,
					v = n || p(e || "*", a.nodeType ? [a] : a, []),
					_ = !t || !n && e ? v : f(v, d, t, a, l),
					y = i ? o || (n ? t : g || r) ? [] : s : _;
				if (i && i(_, y, a, l), r)
					for (u = f(y, m), r(u, [], a, l), c = u.length; c--;)(h = u[c]) && (y[m[c]] = !(_[m[c]] = h));
				if (n) {
					if (o || t) {
						if (o) {
							for (u = [], c = y.length; c--;)(h = y[c]) && u.push(_[c] = h);
							o(null, y = [], u, l)
						}
						for (c = y.length; c--;)(h = y[c]) && (u = o ? J(n, h) : d[c]) > -1 && (n[u] = !(s[u] = h))
					}
				} else y = f(y === s ? y.splice(g, y.length) : y), o ? o(null, s, y, l) : Z.apply(s, y)
			})
		}

		function g(t) {
			for (var e, i, n, r = t.length, o = x.relative[t[0].type], s = o || x.relative[" "], a = o ? 1 : 0, l = h(function (t) {
					return t === e
				}, s, !0), u = h(function (t) {
					return J(e, t) > -1
				}, s, !0), p = [function (t, i, n) {
					var r = !o && (n || i !== E) || ((e = i).nodeType ? l(t, i, n) : u(t, i, n));
					return e = null, r
				}]; r > a; a++)
				if (i = x.relative[t[a].type]) p = [h(d(p), i)];
				else {
					if ((i = x.filter[t[a].type].apply(null, t[a].matches))[R]) {
						for (n = ++a; r > n && !x.relative[t[n].type]; n++);
						return m(a > 1 && d(p), a > 1 && c(t.slice(0, a - 1).concat({
							value: " " === t[a - 2].type ? "*" : ""
						})).replace(ot, "$1"), i, n > a && g(t.slice(a, n)), r > n && g(t = t.slice(n)), r > n && c(t))
					}
					p.push(i)
				}
			return d(p)
		}

		function v(t, i) {
			var r = i.length > 0,
				o = t.length > 0,
				s = function (n, s, a, l, u) {
					var c, h, d, p = 0,
						m = "0",
						g = n && [],
						v = [],
						_ = E,
						y = n || o && x.find.TAG("*", u),
						b = F += null == _ ? 1 : Math.random() || .1,
						w = y.length;
					for (u && (E = s === A || s || u); m !== w && null != (c = y[m]); m++) {
						if (o && c) {
							for (h = 0, s || c.ownerDocument === A || (D(c), a = !M); d = t[h++];)
								if (d(c, s || A, a)) {
									l.push(c);
									break
								}
							u && (F = b)
						}
						r && ((c = !d && c) && p--, n && g.push(c))
					}
					if (p += m, r && m !== p) {
						for (h = 0; d = i[h++];) d(g, v, s, a);
						if (n) {
							if (p > 0)
								for (; m--;) g[m] || v[m] || (v[m] = Y.call(l));
							v = f(v)
						}
						Z.apply(l, v), u && !n && v.length > 0 && p + i.length > 1 && e.uniqueSort(l)
					}
					return u && (F = b, E = _), g
				};
			return r ? n(s) : s
		}
		var _, y, x, b, w, T, C, S, E, k, O, D, A, P, M, I, j, N, B, R = "sizzle" + 1 * new Date,
			L = t.document,
			F = 0,
			z = 0,
			H = i(),
			$ = i(),
			q = i(),
			U = function (t, e) {
				return t === e && (O = !0), 0
			},
			W = 1 << 31,
			X = {}.hasOwnProperty,
			V = [],
			Y = V.pop,
			G = V.push,
			Z = V.push,
			Q = V.slice,
			J = function (t, e) {
				for (var i = 0, n = t.length; n > i; i++)
					if (t[i] === e) return i;
				return -1
			},
			K = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
			tt = "[\\x20\\t\\r\\n\\f]",
			et = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
			it = "\\[" + tt + "*(" + et + ")(?:" + tt + "*([*^$|!~]?=)" + tt + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + et + "))|)" + tt + "*\\]",
			nt = ":(" + et + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + it + ")*)|.*)\\)|)",
			rt = new RegExp(tt + "+", "g"),
			ot = new RegExp("^" + tt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + tt + "+$", "g"),
			st = new RegExp("^" + tt + "*," + tt + "*"),
			at = new RegExp("^" + tt + "*([>+~]|" + tt + ")" + tt + "*"),
			lt = new RegExp("=" + tt + "*([^\\]'\"]*?)" + tt + "*\\]", "g"),
			ut = new RegExp(nt),
			ct = new RegExp("^" + et + "$"),
			ht = {
				ID: new RegExp("^#(" + et + ")"),
				CLASS: new RegExp("^\\.(" + et + ")"),
				TAG: new RegExp("^(" + et + "|[*])"),
				ATTR: new RegExp("^" + it),
				PSEUDO: new RegExp("^" + nt),
				CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + tt + "*(even|odd|(([+-]|)(\\d*)n|)" + tt + "*(?:([+-]|)" + tt + "*(\\d+)|))" + tt + "*\\)|)", "i"),
				bool: new RegExp("^(?:" + K + ")$", "i"),
				needsContext: new RegExp("^" + tt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + tt + "*((?:-\\d)?\\d*)" + tt + "*\\)|)(?=[^-]|$)", "i")
			},
			dt = /^(?:input|select|textarea|button)$/i,
			pt = /^h\d$/i,
			ft = /^[^{]+\{\s*\[native \w/,
			mt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
			gt = /[+~]/,
			vt = /'|\\/g,
			_t = new RegExp("\\\\([\\da-f]{1,6}" + tt + "?|(" + tt + ")|.)", "ig"),
			yt = function (t, e, i) {
				var n = "0x" + e - 65536;
				return n !== n || i ? e : 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
			},
			xt = function () {
				D()
			};
		try {
			Z.apply(V = Q.call(L.childNodes), L.childNodes), V[L.childNodes.length].nodeType
		} catch (t) {
			Z = {
				apply: V.length ? function (t, e) {
					G.apply(t, Q.call(e))
				} : function (t, e) {
					for (var i = t.length, n = 0; t[i++] = e[n++];);
					t.length = i - 1
				}
			}
		}
		y = e.support = {}, w = e.isXML = function (t) {
			var e = t && (t.ownerDocument || t).documentElement;
			return !!e && "HTML" !== e.nodeName
		}, D = e.setDocument = function (t) {
			var e, i, n = t ? t.ownerDocument || t : L;
			return n !== A && 9 === n.nodeType && n.documentElement ? (A = n, P = A.documentElement, M = !w(A), (i = A.defaultView) && i.top !== i && (i.addEventListener ? i.addEventListener("unload", xt, !1) : i.attachEvent && i.attachEvent("onunload", xt)), y.attributes = r(function (t) {
				return t.className = "i", !t.getAttribute("className")
			}), y.getElementsByTagName = r(function (t) {
				return t.appendChild(A.createComment("")), !t.getElementsByTagName("*").length
			}), y.getElementsByClassName = ft.test(A.getElementsByClassName), y.getById = r(function (t) {
				return P.appendChild(t).id = R, !A.getElementsByName || !A.getElementsByName(R).length
			}), y.getById ? (x.find.ID = function (t, e) {
				if (void 0 !== e.getElementById && M) {
					var i = e.getElementById(t);
					return i ? [i] : []
				}
			}, x.filter.ID = function (t) {
				var e = t.replace(_t, yt);
				return function (t) {
					return t.getAttribute("id") === e
				}
			}) : (delete x.find.ID, x.filter.ID = function (t) {
				var e = t.replace(_t, yt);
				return function (t) {
					var i = void 0 !== t.getAttributeNode && t.getAttributeNode("id");
					return i && i.value === e
				}
			}), x.find.TAG = y.getElementsByTagName ? function (t, e) {
				return void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t) : y.qsa ? e.querySelectorAll(t) : void 0
			} : function (t, e) {
				var i, n = [],
					r = 0,
					o = e.getElementsByTagName(t);
				if ("*" === t) {
					for (; i = o[r++];) 1 === i.nodeType && n.push(i);
					return n
				}
				return o
			}, x.find.CLASS = y.getElementsByClassName && function (t, e) {
				return void 0 !== e.getElementsByClassName && M ? e.getElementsByClassName(t) : void 0
			}, j = [], I = [], (y.qsa = ft.test(A.querySelectorAll)) && (r(function (t) {
				P.appendChild(t).innerHTML = "<a id='" + R + "'></a><select id='" + R + "-\r\\' msallowcapture=''><option selected=''></option></select>", t.querySelectorAll("[msallowcapture^='']").length && I.push("[*^$]=" + tt + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || I.push("\\[" + tt + "*(?:value|" + K + ")"), t.querySelectorAll("[id~=" + R + "-]").length || I.push("~="), t.querySelectorAll(":checked").length || I.push(":checked"), t.querySelectorAll("a#" + R + "+*").length || I.push(".#.+[+~]")
			}), r(function (t) {
				var e = A.createElement("input");
				e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && I.push("name" + tt + "*[*^$|!~]?="), t.querySelectorAll(":enabled").length || I.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), I.push(",.*:")
			})), (y.matchesSelector = ft.test(N = P.matches || P.webkitMatchesSelector || P.mozMatchesSelector || P.oMatchesSelector || P.msMatchesSelector)) && r(function (t) {
				y.disconnectedMatch = N.call(t, "div"), N.call(t, "[s!='']:x"), j.push("!=", nt)
			}), I = I.length && new RegExp(I.join("|")), j = j.length && new RegExp(j.join("|")), e = ft.test(P.compareDocumentPosition), B = e || ft.test(P.contains) ? function (t, e) {
				var i = 9 === t.nodeType ? t.documentElement : t,
					n = e && e.parentNode;
				return t === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(n)))
			} : function (t, e) {
				if (e)
					for (; e = e.parentNode;)
						if (e === t) return !0;
				return !1
			}, U = e ? function (t, e) {
				if (t === e) return O = !0, 0;
				var i = !t.compareDocumentPosition - !e.compareDocumentPosition;
				return i || (i = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1, 1 & i || !y.sortDetached && e.compareDocumentPosition(t) === i ? t === A || t.ownerDocument === L && B(L, t) ? -1 : e === A || e.ownerDocument === L && B(L, e) ? 1 : k ? J(k, t) - J(k, e) : 0 : 4 & i ? -1 : 1)
			} : function (t, e) {
				if (t === e) return O = !0, 0;
				var i, n = 0,
					r = t.parentNode,
					o = e.parentNode,
					a = [t],
					l = [e];
				if (!r || !o) return t === A ? -1 : e === A ? 1 : r ? -1 : o ? 1 : k ? J(k, t) - J(k, e) : 0;
				if (r === o) return s(t, e);
				for (i = t; i = i.parentNode;) a.unshift(i);
				for (i = e; i = i.parentNode;) l.unshift(i);
				for (; a[n] === l[n];) n++;
				return n ? s(a[n], l[n]) : a[n] === L ? -1 : l[n] === L ? 1 : 0
			}, A) : A
		}, e.matches = function (t, i) {
			return e(t, null, null, i)
		}, e.matchesSelector = function (t, i) {
			if ((t.ownerDocument || t) !== A && D(t), i = i.replace(lt, "='$1']"), y.matchesSelector && M && !q[i + " "] && (!j || !j.test(i)) && (!I || !I.test(i))) try {
				var n = N.call(t, i);
				if (n || y.disconnectedMatch || t.document && 11 !== t.document.nodeType) return n
			} catch (t) {}
			return e(i, A, null, [t]).length > 0
		}, e.contains = function (t, e) {
			return (t.ownerDocument || t) !== A && D(t), B(t, e)
		}, e.attr = function (t, e) {
			(t.ownerDocument || t) !== A && D(t);
			var i = x.attrHandle[e.toLowerCase()],
				n = i && X.call(x.attrHandle, e.toLowerCase()) ? i(t, e, !M) : void 0;
			return void 0 !== n ? n : y.attributes || !M ? t.getAttribute(e) : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
		}, e.error = function (t) {
			throw new Error("Syntax error, unrecognized expression: " + t)
		}, e.uniqueSort = function (t) {
			var e, i = [],
				n = 0,
				r = 0;
			if (O = !y.detectDuplicates, k = !y.sortStable && t.slice(0), t.sort(U), O) {
				for (; e = t[r++];) e === t[r] && (n = i.push(r));
				for (; n--;) t.splice(i[n], 1)
			}
			return k = null, t
		}, b = e.getText = function (t) {
			var e, i = "",
				n = 0,
				r = t.nodeType;
			if (r) {
				if (1 === r || 9 === r || 11 === r) {
					if ("string" == typeof t.textContent) return t.textContent;
					for (t = t.firstChild; t; t = t.nextSibling) i += b(t)
				} else if (3 === r || 4 === r) return t.nodeValue
			} else
				for (; e = t[n++];) i += b(e);
			return i
		}, (x = e.selectors = {
			cacheLength: 50,
			createPseudo: n,
			match: ht,
			attrHandle: {},
			find: {},
			relative: {
				">": {
					dir: "parentNode",
					first: !0
				},
				" ": {
					dir: "parentNode"
				},
				"+": {
					dir: "previousSibling",
					first: !0
				},
				"~": {
					dir: "previousSibling"
				}
			},
			preFilter: {
				ATTR: function (t) {
					return t[1] = t[1].replace(_t, yt), t[3] = (t[3] || t[4] || t[5] || "").replace(_t, yt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
				},
				CHILD: function (t) {
					return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && e.error(t[0]), t
				},
				PSEUDO: function (t) {
					var e, i = !t[6] && t[2];
					return ht.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : i && ut.test(i) && (e = T(i, !0)) && (e = i.indexOf(")", i.length - e) - i.length) && (t[0] = t[0].slice(0, e), t[2] = i.slice(0, e)), t.slice(0, 3))
				}
			},
			filter: {
				TAG: function (t) {
					var e = t.replace(_t, yt).toLowerCase();
					return "*" === t ? function () {
						return !0
					} : function (t) {
						return t.nodeName && t.nodeName.toLowerCase() === e
					}
				},
				CLASS: function (t) {
					var e = H[t + " "];
					return e || (e = new RegExp("(^|" + tt + ")" + t + "(" + tt + "|$)")) && H(t, function (t) {
						return e.test("string" == typeof t.className && t.className || void 0 !== t.getAttribute && t.getAttribute("class") || "")
					})
				},
				ATTR: function (t, i, n) {
					return function (r) {
						var o = e.attr(r, t);
						return null == o ? "!=" === i : !i || (o += "", "=" === i ? o === n : "!=" === i ? o !== n : "^=" === i ? n && 0 === o.indexOf(n) : "*=" === i ? n && o.indexOf(n) > -1 : "$=" === i ? n && o.slice(-n.length) === n : "~=" === i ? (" " + o.replace(rt, " ") + " ").indexOf(n) > -1 : "|=" === i && (o === n || o.slice(0, n.length + 1) === n + "-"))
					}
				},
				CHILD: function (t, e, i, n, r) {
					var o = "nth" !== t.slice(0, 3),
						s = "last" !== t.slice(-4),
						a = "of-type" === e;
					return 1 === n && 0 === r ? function (t) {
						return !!t.parentNode
					} : function (e, i, l) {
						var u, c, h, d, p, f, m = o !== s ? "nextSibling" : "previousSibling",
							g = e.parentNode,
							v = a && e.nodeName.toLowerCase(),
							_ = !l && !a,
							y = !1;
						if (g) {
							if (o) {
								for (; m;) {
									for (d = e; d = d[m];)
										if (a ? d.nodeName.toLowerCase() === v : 1 === d.nodeType) return !1;
									f = m = "only" === t && !f && "nextSibling"
								}
								return !0
							}
							if (f = [s ? g.firstChild : g.lastChild], s && _) {
								for (y = (p = (u = (c = (h = (d = g)[R] || (d[R] = {}))[d.uniqueID] || (h[d.uniqueID] = {}))[t] || [])[0] === F && u[1]) && u[2], d = p && g.childNodes[p]; d = ++p && d && d[m] || (y = p = 0) || f.pop();)
									if (1 === d.nodeType && ++y && d === e) {
										c[t] = [F, p, y];
										break
									}
							} else if (_ && (d = e, h = d[R] || (d[R] = {}), c = h[d.uniqueID] || (h[d.uniqueID] = {}), u = c[t] || [], p = u[0] === F && u[1], y = p), !1 === y)
								for (;
									(d = ++p && d && d[m] || (y = p = 0) || f.pop()) && ((a ? d.nodeName.toLowerCase() !== v : 1 !== d.nodeType) || !++y || (_ && (h = d[R] || (d[R] = {}), c = h[d.uniqueID] || (h[d.uniqueID] = {}), c[t] = [F, y]), d !== e)););
							return (y -= r) === n || y % n == 0 && y / n >= 0
						}
					}
				},
				PSEUDO: function (t, i) {
					var r, o = x.pseudos[t] || x.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
					return o[R] ? o(i) : o.length > 1 ? (r = [t, t, "", i], x.setFilters.hasOwnProperty(t.toLowerCase()) ? n(function (t, e) {
						for (var n, r = o(t, i), s = r.length; s--;) n = J(t, r[s]), t[n] = !(e[n] = r[s])
					}) : function (t) {
						return o(t, 0, r)
					}) : o
				}
			},
			pseudos: {
				not: n(function (t) {
					var e = [],
						i = [],
						r = C(t.replace(ot, "$1"));
					return r[R] ? n(function (t, e, i, n) {
						for (var o, s = r(t, null, n, []), a = t.length; a--;)(o = s[a]) && (t[a] = !(e[a] = o))
					}) : function (t, n, o) {
						return e[0] = t, r(e, null, o, i), e[0] = null, !i.pop()
					}
				}),
				has: n(function (t) {
					return function (i) {
						return e(t, i).length > 0
					}
				}),
				contains: n(function (t) {
					return t = t.replace(_t, yt),
						function (e) {
							return (e.textContent || e.innerText || b(e)).indexOf(t) > -1
						}
				}),
				lang: n(function (t) {
					return ct.test(t || "") || e.error("unsupported lang: " + t), t = t.replace(_t, yt).toLowerCase(),
						function (e) {
							var i;
							do {
								if (i = M ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (i = i.toLowerCase()) === t || 0 === i.indexOf(t + "-")
							} while ((e = e.parentNode) && 1 === e.nodeType);
							return !1
						}
				}),
				target: function (e) {
					var i = t.location && t.location.hash;
					return i && i.slice(1) === e.id
				},
				root: function (t) {
					return t === P
				},
				focus: function (t) {
					return t === A.activeElement && (!A.hasFocus || A.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
				},
				enabled: function (t) {
					return !1 === t.disabled
				},
				disabled: function (t) {
					return !0 === t.disabled
				},
				checked: function (t) {
					var e = t.nodeName.toLowerCase();
					return "input" === e && !!t.checked || "option" === e && !!t.selected
				},
				selected: function (t) {
					return t.parentNode && t.parentNode.selectedIndex, !0 === t.selected
				},
				empty: function (t) {
					for (t = t.firstChild; t; t = t.nextSibling)
						if (t.nodeType < 6) return !1;
					return !0
				},
				parent: function (t) {
					return !x.pseudos.empty(t)
				},
				header: function (t) {
					return pt.test(t.nodeName)
				},
				input: function (t) {
					return dt.test(t.nodeName)
				},
				button: function (t) {
					var e = t.nodeName.toLowerCase();
					return "input" === e && "button" === t.type || "button" === e
				},
				text: function (t) {
					var e;
					return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
				},
				first: a(function () {
					return [0]
				}),
				last: a(function (t, e) {
					return [e - 1]
				}),
				eq: a(function (t, e, i) {
					return [0 > i ? i + e : i]
				}),
				even: a(function (t, e) {
					for (var i = 0; e > i; i += 2) t.push(i);
					return t
				}),
				odd: a(function (t, e) {
					for (var i = 1; e > i; i += 2) t.push(i);
					return t
				}),
				lt: a(function (t, e, i) {
					for (var n = 0 > i ? i + e : i; --n >= 0;) t.push(n);
					return t
				}),
				gt: a(function (t, e, i) {
					for (var n = 0 > i ? i + e : i; ++n < e;) t.push(n);
					return t
				})
			}
		}).pseudos.nth = x.pseudos.eq;
		for (_ in {
				radio: !0,
				checkbox: !0,
				file: !0,
				password: !0,
				image: !0
			}) x.pseudos[_] = function (t) {
			return function (e) {
				return "input" === e.nodeName.toLowerCase() && e.type === t
			}
		}(_);
		for (_ in {
				submit: !0,
				reset: !0
			}) x.pseudos[_] = function (t) {
			return function (e) {
				var i = e.nodeName.toLowerCase();
				return ("input" === i || "button" === i) && e.type === t
			}
		}(_);
		return u.prototype = x.filters = x.pseudos, x.setFilters = new u, T = e.tokenize = function (t, i) {
			var n, r, o, s, a, l, u, c = $[t + " "];
			if (c) return i ? 0 : c.slice(0);
			for (a = t, l = [], u = x.preFilter; a;) {
				n && !(r = st.exec(a)) || (r && (a = a.slice(r[0].length) || a), l.push(o = [])), n = !1, (r = at.exec(a)) && (n = r.shift(), o.push({
					value: n,
					type: r[0].replace(ot, " ")
				}), a = a.slice(n.length));
				for (s in x.filter) !(r = ht[s].exec(a)) || u[s] && !(r = u[s](r)) || (n = r.shift(), o.push({
					value: n,
					type: s,
					matches: r
				}), a = a.slice(n.length));
				if (!n) break
			}
			return i ? a.length : a ? e.error(t) : $(t, l).slice(0)
		}, C = e.compile = function (t, e) {
			var i, n = [],
				r = [],
				o = q[t + " "];
			if (!o) {
				for (e || (e = T(t)), i = e.length; i--;) o = g(e[i]), o[R] ? n.push(o) : r.push(o);
				(o = q(t, v(r, n))).selector = t
			}
			return o
		}, S = e.select = function (t, e, i, n) {
			var r, o, s, a, u, h = "function" == typeof t && t,
				d = !n && T(t = h.selector || t);
			if (i = i || [], 1 === d.length) {
				if ((o = d[0] = d[0].slice(0)).length > 2 && "ID" === (s = o[0]).type && y.getById && 9 === e.nodeType && M && x.relative[o[1].type]) {
					if (!(e = (x.find.ID(s.matches[0].replace(_t, yt), e) || [])[0])) return i;
					h && (e = e.parentNode), t = t.slice(o.shift().value.length)
				}
				for (r = ht.needsContext.test(t) ? 0 : o.length; r-- && (s = o[r], !x.relative[a = s.type]);)
					if ((u = x.find[a]) && (n = u(s.matches[0].replace(_t, yt), gt.test(o[0].type) && l(e.parentNode) || e))) {
						if (o.splice(r, 1), !(t = n.length && c(o))) return Z.apply(i, n), i;
						break
					}
			}
			return (h || C(t, d))(n, e, !M, i, !e || gt.test(t) && l(e.parentNode) || e), i
		}, y.sortStable = R.split("").sort(U).join("") === R, y.detectDuplicates = !!O, D(), y.sortDetached = r(function (t) {
			return 1 & t.compareDocumentPosition(A.createElement("div"))
		}), r(function (t) {
			return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
		}) || o("type|href|height|width", function (t, e, i) {
			return i ? void 0 : t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
		}), y.attributes && r(function (t) {
			return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
		}) || o("value", function (t, e, i) {
			return i || "input" !== t.nodeName.toLowerCase() ? void 0 : t.defaultValue
		}), r(function (t) {
			return null == t.getAttribute("disabled")
		}) || o(K, function (t, e, i) {
			var n;
			return i ? void 0 : !0 === t[e] ? e.toLowerCase() : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
		}), e
	}(t);
	ot.find = ct, ot.expr = ct.selectors, ot.expr[":"] = ot.expr.pseudos, ot.uniqueSort = ot.unique = ct.uniqueSort, ot.text = ct.getText, ot.isXMLDoc = ct.isXML, ot.contains = ct.contains;
	var ht = function (t, e, i) {
			for (var n = [], r = void 0 !== i;
				(t = t[e]) && 9 !== t.nodeType;)
				if (1 === t.nodeType) {
					if (r && ot(t).is(i)) break;
					n.push(t)
				}
			return n
		},
		dt = function (t, e) {
			for (var i = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && i.push(t);
			return i
		},
		pt = ot.expr.match.needsContext,
		ft = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
		mt = /^.[^:#\[\.,]*$/;
	ot.filter = function (t, e, i) {
		var n = e[0];
		return i && (t = ":not(" + t + ")"), 1 === e.length && 1 === n.nodeType ? ot.find.matchesSelector(n, t) ? [n] : [] : ot.find.matches(t, ot.grep(e, function (t) {
			return 1 === t.nodeType
		}))
	}, ot.fn.extend({
		find: function (t) {
			var e, i = this.length,
				n = [],
				r = this;
			if ("string" != typeof t) return this.pushStack(ot(t).filter(function () {
				for (e = 0; i > e; e++)
					if (ot.contains(r[e], this)) return !0
			}));
			for (e = 0; i > e; e++) ot.find(t, r[e], n);
			return n = this.pushStack(i > 1 ? ot.unique(n) : n), n.selector = this.selector ? this.selector + " " + t : t, n
		},
		filter: function (t) {
			return this.pushStack(n(this, t || [], !1))
		},
		not: function (t) {
			return this.pushStack(n(this, t || [], !0))
		},
		is: function (t) {
			return !!n(this, "string" == typeof t && pt.test(t) ? ot(t) : t || [], !1).length
		}
	});
	var gt, vt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
	(ot.fn.init = function (t, e, i) {
		var n, r;
		if (!t) return this;
		if (i = i || gt, "string" == typeof t) {
			if (!(n = "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3 ? [null, t, null] : vt.exec(t)) || !n[1] && e) return !e || e.jquery ? (e || i).find(t) : this.constructor(e).find(t);
			if (n[1]) {
				if (e = e instanceof ot ? e[0] : e, ot.merge(this, ot.parseHTML(n[1], e && e.nodeType ? e.ownerDocument || e : G, !0)), ft.test(n[1]) && ot.isPlainObject(e))
					for (n in e) ot.isFunction(this[n]) ? this[n](e[n]) : this.attr(n, e[n]);
				return this
			}
			return (r = G.getElementById(n[2])) && r.parentNode && (this.length = 1, this[0] = r), this.context = G, this.selector = t, this
		}
		return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : ot.isFunction(t) ? void 0 !== i.ready ? i.ready(t) : t(ot) : (void 0 !== t.selector && (this.selector = t.selector, this.context = t.context), ot.makeArray(t, this))
	}).prototype = ot.fn, gt = ot(G);
	var _t = /^(?:parents|prev(?:Until|All))/,
		yt = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
		};
	ot.fn.extend({
		has: function (t) {
			var e = ot(t, this),
				i = e.length;
			return this.filter(function () {
				for (var t = 0; i > t; t++)
					if (ot.contains(this, e[t])) return !0
			})
		},
		closest: function (t, e) {
			for (var i, n = 0, r = this.length, o = [], s = pt.test(t) || "string" != typeof t ? ot(t, e || this.context) : 0; r > n; n++)
				for (i = this[n]; i && i !== e; i = i.parentNode)
					if (i.nodeType < 11 && (s ? s.index(i) > -1 : 1 === i.nodeType && ot.find.matchesSelector(i, t))) {
						o.push(i);
						break
					}
			return this.pushStack(o.length > 1 ? ot.uniqueSort(o) : o)
		},
		index: function (t) {
			return t ? "string" == typeof t ? K.call(ot(t), this[0]) : K.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
		},
		add: function (t, e) {
			return this.pushStack(ot.uniqueSort(ot.merge(this.get(), ot(t, e))))
		},
		addBack: function (t) {
			return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
		}
	}), ot.each({
		parent: function (t) {
			var e = t.parentNode;
			return e && 11 !== e.nodeType ? e : null
		},
		parents: function (t) {
			return ht(t, "parentNode")
		},
		parentsUntil: function (t, e, i) {
			return ht(t, "parentNode", i)
		},
		next: function (t) {
			return r(t, "nextSibling")
		},
		prev: function (t) {
			return r(t, "previousSibling")
		},
		nextAll: function (t) {
			return ht(t, "nextSibling")
		},
		prevAll: function (t) {
			return ht(t, "previousSibling")
		},
		nextUntil: function (t, e, i) {
			return ht(t, "nextSibling", i)
		},
		prevUntil: function (t, e, i) {
			return ht(t, "previousSibling", i)
		},
		siblings: function (t) {
			return dt((t.parentNode || {}).firstChild, t)
		},
		children: function (t) {
			return dt(t.firstChild)
		},
		contents: function (t) {
			return t.contentDocument || ot.merge([], t.childNodes)
		}
	}, function (t, e) {
		ot.fn[t] = function (i, n) {
			var r = ot.map(this, e, i);
			return "Until" !== t.slice(-5) && (n = i), n && "string" == typeof n && (r = ot.filter(n, r)), this.length > 1 && (yt[t] || ot.uniqueSort(r), _t.test(t) && r.reverse()), this.pushStack(r)
		}
	});
	var xt = /\S+/g;
	ot.Callbacks = function (t) {
		t = "string" == typeof t ? o(t) : ot.extend({}, t);
		var e, i, n, r, s = [],
			a = [],
			l = -1,
			u = function () {
				for (r = t.once, n = e = !0; a.length; l = -1)
					for (i = a.shift(); ++l < s.length;) !1 === s[l].apply(i[0], i[1]) && t.stopOnFalse && (l = s.length, i = !1);
				t.memory || (i = !1), e = !1, r && (s = i ? [] : "")
			},
			c = {
				add: function () {
					return s && (i && !e && (l = s.length - 1, a.push(i)), function e(i) {
						ot.each(i, function (i, n) {
							ot.isFunction(n) ? t.unique && c.has(n) || s.push(n) : n && n.length && "string" !== ot.type(n) && e(n)
						})
					}(arguments), i && !e && u()), this
				},
				remove: function () {
					return ot.each(arguments, function (t, e) {
						for (var i;
							(i = ot.inArray(e, s, i)) > -1;) s.splice(i, 1), l >= i && l--
					}), this
				},
				has: function (t) {
					return t ? ot.inArray(t, s) > -1 : s.length > 0
				},
				empty: function () {
					return s && (s = []), this
				},
				disable: function () {
					return r = a = [], s = i = "", this
				},
				disabled: function () {
					return !s
				},
				lock: function () {
					return r = a = [], i || (s = i = ""), this
				},
				locked: function () {
					return !!r
				},
				fireWith: function (t, i) {
					return r || (i = i || [], i = [t, i.slice ? i.slice() : i], a.push(i), e || u()), this
				},
				fire: function () {
					return c.fireWith(this, arguments), this
				},
				fired: function () {
					return !!n
				}
			};
		return c
	}, ot.extend({
		Deferred: function (t) {
			var e = [
					["resolve", "done", ot.Callbacks("once memory"), "resolved"],
					["reject", "fail", ot.Callbacks("once memory"), "rejected"],
					["notify", "progress", ot.Callbacks("memory")]
				],
				i = "pending",
				n = {
					state: function () {
						return i
					},
					always: function () {
						return r.done(arguments).fail(arguments), this
					},
					then: function () {
						var t = arguments;
						return ot.Deferred(function (i) {
							ot.each(e, function (e, o) {
								var s = ot.isFunction(t[e]) && t[e];
								r[o[1]](function () {
									var t = s && s.apply(this, arguments);
									t && ot.isFunction(t.promise) ? t.promise().progress(i.notify).done(i.resolve).fail(i.reject) : i[o[0] + "With"](this === n ? i.promise() : this, s ? [t] : arguments)
								})
							}), t = null
						}).promise()
					},
					promise: function (t) {
						return null != t ? ot.extend(t, n) : n
					}
				},
				r = {};
			return n.pipe = n.then, ot.each(e, function (t, o) {
				var s = o[2],
					a = o[3];
				n[o[1]] = s.add, a && s.add(function () {
					i = a
				}, e[1 ^ t][2].disable, e[2][2].lock), r[o[0]] = function () {
					return r[o[0] + "With"](this === r ? n : this, arguments), this
				}, r[o[0] + "With"] = s.fireWith
			}), n.promise(r), t && t.call(r, r), r
		},
		when: function (t) {
			var e, i, n, r = 0,
				o = Z.call(arguments),
				s = o.length,
				a = 1 !== s || t && ot.isFunction(t.promise) ? s : 0,
				l = 1 === a ? t : ot.Deferred(),
				u = function (t, i, n) {
					return function (r) {
						i[t] = this, n[t] = arguments.length > 1 ? Z.call(arguments) : r, n === e ? l.notifyWith(i, n) : --a || l.resolveWith(i, n)
					}
				};
			if (s > 1)
				for (e = new Array(s), i = new Array(s), n = new Array(s); s > r; r++) o[r] && ot.isFunction(o[r].promise) ? o[r].promise().progress(u(r, i, e)).done(u(r, n, o)).fail(l.reject) : --a;
			return a || l.resolveWith(n, o), l.promise()
		}
	});
	var bt;
	ot.fn.ready = function (t) {
		return ot.ready.promise().done(t), this
	}, ot.extend({
		isReady: !1,
		readyWait: 1,
		holdReady: function (t) {
			t ? ot.readyWait++ : ot.ready(!0)
		},
		ready: function (t) {
			(!0 === t ? --ot.readyWait : ot.isReady) || (ot.isReady = !0, !0 !== t && --ot.readyWait > 0 || (bt.resolveWith(G, [ot]), ot.fn.triggerHandler && (ot(G).triggerHandler("ready"), ot(G).off("ready"))))
		}
	}), ot.ready.promise = function (e) {
		return bt || (bt = ot.Deferred(), "complete" === G.readyState || "loading" !== G.readyState && !G.documentElement.doScroll ? t.setTimeout(ot.ready) : (G.addEventListener("DOMContentLoaded", s), t.addEventListener("load", s))), bt.promise(e)
	}, ot.ready.promise();
	var wt = function (t, e, i, n, r, o, s) {
			var a = 0,
				l = t.length,
				u = null == i;
			if ("object" === ot.type(i)) {
				r = !0;
				for (a in i) wt(t, e, a, i[a], !0, o, s)
			} else if (void 0 !== n && (r = !0, ot.isFunction(n) || (s = !0), u && (s ? (e.call(t, n), e = null) : (u = e, e = function (t, e, i) {
					return u.call(ot(t), i)
				})), e))
				for (; l > a; a++) e(t[a], i, s ? n : n.call(t[a], a, e(t[a], i)));
			return r ? t : u ? e.call(t) : l ? e(t[0], i) : o
		},
		Tt = function (t) {
			return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType
		};
	a.uid = 1, a.prototype = {
		register: function (t, e) {
			var i = e || {};
			return t.nodeType ? t[this.expando] = i : Object.defineProperty(t, this.expando, {
				value: i,
				writable: !0,
				configurable: !0
			}), t[this.expando]
		},
		cache: function (t) {
			if (!Tt(t)) return {};
			var e = t[this.expando];
			return e || (e = {}, Tt(t) && (t.nodeType ? t[this.expando] = e : Object.defineProperty(t, this.expando, {
				value: e,
				configurable: !0
			}))), e
		},
		set: function (t, e, i) {
			var n, r = this.cache(t);
			if ("string" == typeof e) r[e] = i;
			else
				for (n in e) r[n] = e[n];
			return r
		},
		get: function (t, e) {
			return void 0 === e ? this.cache(t) : t[this.expando] && t[this.expando][e]
		},
		access: function (t, e, i) {
			var n;
			return void 0 === e || e && "string" == typeof e && void 0 === i ? (n = this.get(t, e), void 0 !== n ? n : this.get(t, ot.camelCase(e))) : (this.set(t, e, i), void 0 !== i ? i : e)
		},
		remove: function (t, e) {
			var i, n, r, o = t[this.expando];
			if (void 0 !== o) {
				if (void 0 === e) this.register(t);
				else {
					ot.isArray(e) ? n = e.concat(e.map(ot.camelCase)) : (r = ot.camelCase(e), e in o ? n = [e, r] : (n = r, n = n in o ? [n] : n.match(xt) || [])), i = n.length;
					for (; i--;) delete o[n[i]]
				}(void 0 === e || ot.isEmptyObject(o)) && (t.nodeType ? t[this.expando] = void 0 : delete t[this.expando])
			}
		},
		hasData: function (t) {
			var e = t[this.expando];
			return void 0 !== e && !ot.isEmptyObject(e)
		}
	};
	var Ct = new a,
		St = new a,
		Et = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		kt = /[A-Z]/g;
	ot.extend({
		hasData: function (t) {
			return St.hasData(t) || Ct.hasData(t)
		},
		data: function (t, e, i) {
			return St.access(t, e, i)
		},
		removeData: function (t, e) {
			St.remove(t, e)
		},
		_data: function (t, e, i) {
			return Ct.access(t, e, i)
		},
		_removeData: function (t, e) {
			Ct.remove(t, e)
		}
	}), ot.fn.extend({
		data: function (t, e) {
			var i, n, r, o = this[0],
				s = o && o.attributes;
			if (void 0 === t) {
				if (this.length && (r = St.get(o), 1 === o.nodeType && !Ct.get(o, "hasDataAttrs"))) {
					for (i = s.length; i--;) s[i] && 0 === (n = s[i].name).indexOf("data-") && (n = ot.camelCase(n.slice(5)), l(o, n, r[n]));
					Ct.set(o, "hasDataAttrs", !0)
				}
				return r
			}
			return "object" == typeof t ? this.each(function () {
				St.set(this, t)
			}) : wt(this, function (e) {
				var i, n;
				if (o && void 0 === e) {
					if (void 0 !== (i = St.get(o, t) || St.get(o, t.replace(kt, "-$&").toLowerCase()))) return i;
					if (n = ot.camelCase(t), void 0 !== (i = St.get(o, n))) return i;
					if (void 0 !== (i = l(o, n, void 0))) return i
				} else n = ot.camelCase(t), this.each(function () {
					var i = St.get(this, n);
					St.set(this, n, e), t.indexOf("-") > -1 && void 0 !== i && St.set(this, t, e)
				})
			}, null, e, arguments.length > 1, null, !0)
		},
		removeData: function (t) {
			return this.each(function () {
				St.remove(this, t)
			})
		}
	}), ot.extend({
		queue: function (t, e, i) {
			var n;
			return t ? (e = (e || "fx") + "queue", n = Ct.get(t, e), i && (!n || ot.isArray(i) ? n = Ct.access(t, e, ot.makeArray(i)) : n.push(i)), n || []) : void 0
		},
		dequeue: function (t, e) {
			e = e || "fx";
			var i = ot.queue(t, e),
				n = i.length,
				r = i.shift(),
				o = ot._queueHooks(t, e),
				s = function () {
					ot.dequeue(t, e)
				};
			"inprogress" === r && (r = i.shift(), n--), r && ("fx" === e && i.unshift("inprogress"), delete o.stop, r.call(t, s, o)), !n && o && o.empty.fire()
		},
		_queueHooks: function (t, e) {
			var i = e + "queueHooks";
			return Ct.get(t, i) || Ct.access(t, i, {
				empty: ot.Callbacks("once memory").add(function () {
					Ct.remove(t, [e + "queue", i])
				})
			})
		}
	}), ot.fn.extend({
		queue: function (t, e) {
			var i = 2;
			return "string" != typeof t && (e = t, t = "fx", i--), arguments.length < i ? ot.queue(this[0], t) : void 0 === e ? this : this.each(function () {
				var i = ot.queue(this, t, e);
				ot._queueHooks(this, t), "fx" === t && "inprogress" !== i[0] && ot.dequeue(this, t)
			})
		},
		dequeue: function (t) {
			return this.each(function () {
				ot.dequeue(this, t)
			})
		},
		clearQueue: function (t) {
			return this.queue(t || "fx", [])
		},
		promise: function (t, e) {
			var i, n = 1,
				r = ot.Deferred(),
				o = this,
				s = this.length,
				a = function () {
					--n || r.resolveWith(o, [o])
				};
			for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; s--;)(i = Ct.get(o[s], t + "queueHooks")) && i.empty && (n++, i.empty.add(a));
			return a(), r.promise(e)
		}
	});
	var Ot = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
		Dt = new RegExp("^(?:([+-])=|)(" + Ot + ")([a-z%]*)$", "i"),
		At = ["Top", "Right", "Bottom", "Left"],
		Pt = function (t, e) {
			return t = e || t, "none" === ot.css(t, "display") || !ot.contains(t.ownerDocument, t)
		},
		Mt = /^(?:checkbox|radio)$/i,
		It = /<([\w:-]+)/,
		jt = /^$|\/(?:java|ecma)script/i,
		Nt = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			thead: [1, "<table>", "</table>"],
			col: [2, "<table><colgroup>", "</colgroup></table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			_default: [0, "", ""]
		};
	Nt.optgroup = Nt.option, Nt.tbody = Nt.tfoot = Nt.colgroup = Nt.caption = Nt.thead, Nt.th = Nt.td;
	var Bt = /<|&#?\w+;/;
	! function () {
		var t = G.createDocumentFragment().appendChild(G.createElement("div")),
			e = G.createElement("input");
		e.setAttribute("type", "radio"), e.setAttribute("checked", "checked"), e.setAttribute("name", "t"), t.appendChild(e), nt.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", nt.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
	}();
	var Rt = /^key/,
		Lt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		Ft = /^([^.]*)(?:\.(.+)|)/;
	ot.event = {
		global: {},
		add: function (t, e, i, n, r) {
			var o, s, a, l, u, c, h, d, p, f, m, g = Ct.get(t);
			if (g)
				for (i.handler && (o = i, i = o.handler, r = o.selector), i.guid || (i.guid = ot.guid++), (l = g.events) || (l = g.events = {}), (s = g.handle) || (s = g.handle = function (e) {
						return void 0 !== ot && ot.event.triggered !== e.type ? ot.event.dispatch.apply(t, arguments) : void 0
					}), u = (e = (e || "").match(xt) || [""]).length; u--;) a = Ft.exec(e[u]) || [], p = m = a[1], f = (a[2] || "").split(".").sort(), p && (h = ot.event.special[p] || {}, p = (r ? h.delegateType : h.bindType) || p, h = ot.event.special[p] || {}, c = ot.extend({
					type: p,
					origType: m,
					data: n,
					handler: i,
					guid: i.guid,
					selector: r,
					needsContext: r && ot.expr.match.needsContext.test(r),
					namespace: f.join(".")
				}, o), (d = l[p]) || (d = l[p] = [], d.delegateCount = 0, h.setup && !1 !== h.setup.call(t, n, f, s) || t.addEventListener && t.addEventListener(p, s)), h.add && (h.add.call(t, c), c.handler.guid || (c.handler.guid = i.guid)), r ? d.splice(d.delegateCount++, 0, c) : d.push(c), ot.event.global[p] = !0)
		},
		remove: function (t, e, i, n, r) {
			var o, s, a, l, u, c, h, d, p, f, m, g = Ct.hasData(t) && Ct.get(t);
			if (g && (l = g.events)) {
				for (u = (e = (e || "").match(xt) || [""]).length; u--;)
					if (a = Ft.exec(e[u]) || [], p = m = a[1], f = (a[2] || "").split(".").sort(), p) {
						for (h = ot.event.special[p] || {}, d = l[p = (n ? h.delegateType : h.bindType) || p] || [], a = a[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = o = d.length; o--;) c = d[o], !r && m !== c.origType || i && i.guid !== c.guid || a && !a.test(c.namespace) || n && n !== c.selector && ("**" !== n || !c.selector) || (d.splice(o, 1), c.selector && d.delegateCount--, h.remove && h.remove.call(t, c));
						s && !d.length && (h.teardown && !1 !== h.teardown.call(t, f, g.handle) || ot.removeEvent(t, p, g.handle), delete l[p])
					} else
						for (p in l) ot.event.remove(t, p + e[u], i, n, !0);
				ot.isEmptyObject(l) && Ct.remove(t, "handle events")
			}
		},
		dispatch: function (t) {
			t = ot.event.fix(t);
			var e, i, n, r, o, s = [],
				a = Z.call(arguments),
				l = (Ct.get(this, "events") || {})[t.type] || [],
				u = ot.event.special[t.type] || {};
			if (a[0] = t, t.delegateTarget = this, !u.preDispatch || !1 !== u.preDispatch.call(this, t)) {
				for (s = ot.event.handlers.call(this, t, l), e = 0;
					(r = s[e++]) && !t.isPropagationStopped();)
					for (t.currentTarget = r.elem, i = 0;
						(o = r.handlers[i++]) && !t.isImmediatePropagationStopped();) t.rnamespace && !t.rnamespace.test(o.namespace) || (t.handleObj = o, t.data = o.data, void 0 !== (n = ((ot.event.special[o.origType] || {}).handle || o.handler).apply(r.elem, a)) && !1 === (t.result = n) && (t.preventDefault(), t.stopPropagation()));
				return u.postDispatch && u.postDispatch.call(this, t), t.result
			}
		},
		handlers: function (t, e) {
			var i, n, r, o, s = [],
				a = e.delegateCount,
				l = t.target;
			if (a && l.nodeType && ("click" !== t.type || isNaN(t.button) || t.button < 1))
				for (; l !== this; l = l.parentNode || this)
					if (1 === l.nodeType && (!0 !== l.disabled || "click" !== t.type)) {
						for (n = [], i = 0; a > i; i++) o = e[i], r = o.selector + " ", void 0 === n[r] && (n[r] = o.needsContext ? ot(r, this).index(l) > -1 : ot.find(r, this, null, [l]).length), n[r] && n.push(o);
						n.length && s.push({
							elem: l,
							handlers: n
						})
					}
			return a < e.length && s.push({
				elem: this,
				handlers: e.slice(a)
			}), s
		},
		props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
		fixHooks: {},
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function (t, e) {
				return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
			}
		},
		mouseHooks: {
			props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function (t, e) {
				var i, n, r, o = e.button;
				return null == t.pageX && null != e.clientX && (i = t.target.ownerDocument || G, n = i.documentElement, r = i.body, t.pageX = e.clientX + (n && n.scrollLeft || r && r.scrollLeft || 0) - (n && n.clientLeft || r && r.clientLeft || 0), t.pageY = e.clientY + (n && n.scrollTop || r && r.scrollTop || 0) - (n && n.clientTop || r && r.clientTop || 0)), t.which || void 0 === o || (t.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), t
			}
		},
		fix: function (t) {
			if (t[ot.expando]) return t;
			var e, i, n, r = t.type,
				o = t,
				s = this.fixHooks[r];
			for (s || (this.fixHooks[r] = s = Lt.test(r) ? this.mouseHooks : Rt.test(r) ? this.keyHooks : {}), n = s.props ? this.props.concat(s.props) : this.props, t = new ot.Event(o), e = n.length; e--;) i = n[e], t[i] = o[i];
			return t.target || (t.target = G), 3 === t.target.nodeType && (t.target = t.target.parentNode), s.filter ? s.filter(t, o) : t
		},
		special: {
			load: {
				noBubble: !0
			},
			focus: {
				trigger: function () {
					return this !== m() && this.focus ? (this.focus(), !1) : void 0
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function () {
					return this === m() && this.blur ? (this.blur(), !1) : void 0
				},
				delegateType: "focusout"
			},
			click: {
				trigger: function () {
					return "checkbox" === this.type && this.click && ot.nodeName(this, "input") ? (this.click(), !1) : void 0
				},
				_default: function (t) {
					return ot.nodeName(t.target, "a")
				}
			},
			beforeunload: {
				postDispatch: function (t) {
					void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
				}
			}
		}
	}, ot.removeEvent = function (t, e, i) {
		t.removeEventListener && t.removeEventListener(e, i)
	}, ot.Event = function (t, e) {
		return this instanceof ot.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && !1 === t.returnValue ? p : f) : this.type = t, e && ot.extend(this, e), this.timeStamp = t && t.timeStamp || ot.now(), void(this[ot.expando] = !0)) : new ot.Event(t, e)
	}, ot.Event.prototype = {
		constructor: ot.Event,
		isDefaultPrevented: f,
		isPropagationStopped: f,
		isImmediatePropagationStopped: f,
		isSimulated: !1,
		preventDefault: function () {
			var t = this.originalEvent;
			this.isDefaultPrevented = p, t && !this.isSimulated && t.preventDefault()
		},
		stopPropagation: function () {
			var t = this.originalEvent;
			this.isPropagationStopped = p, t && !this.isSimulated && t.stopPropagation()
		},
		stopImmediatePropagation: function () {
			var t = this.originalEvent;
			this.isImmediatePropagationStopped = p, t && !this.isSimulated && t.stopImmediatePropagation(), this.stopPropagation()
		}
	}, ot.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function (t, e) {
		ot.event.special[t] = {
			delegateType: e,
			bindType: e,
			handle: function (t) {
				var i, n = this,
					r = t.relatedTarget,
					o = t.handleObj;
				return r && (r === n || ot.contains(n, r)) || (t.type = o.origType, i = o.handler.apply(this, arguments), t.type = e), i
			}
		}
	}), ot.fn.extend({
		on: function (t, e, i, n) {
			return g(this, t, e, i, n)
		},
		one: function (t, e, i, n) {
			return g(this, t, e, i, n, 1)
		},
		off: function (t, e, i) {
			var n, r;
			if (t && t.preventDefault && t.handleObj) return n = t.handleObj, ot(t.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler), this;
			if ("object" == typeof t) {
				for (r in t) this.off(r, e, t[r]);
				return this
			}
			return !1 !== e && "function" != typeof e || (i = e, e = void 0), !1 === i && (i = f), this.each(function () {
				ot.event.remove(this, t, i, e)
			})
		}
	});
	var zt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
		Ht = /<script|<style|<link/i,
		$t = /checked\s*(?:[^=]|=\s*.checked.)/i,
		qt = /^true\/(.*)/,
		Ut = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
	ot.extend({
		htmlPrefilter: function (t) {
			return t.replace(zt, "<$1></$2>")
		},
		clone: function (t, e, i) {
			var n, r, o, s, a = t.cloneNode(!0),
				l = ot.contains(t.ownerDocument, t);
			if (!(nt.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || ot.isXMLDoc(t)))
				for (s = c(a), o = c(t), n = 0, r = o.length; r > n; n++) b(o[n], s[n]);
			if (e)
				if (i)
					for (o = o || c(t), s = s || c(a), n = 0, r = o.length; r > n; n++) x(o[n], s[n]);
				else x(t, a);
			return (s = c(a, "script")).length > 0 && h(s, !l && c(t, "script")), a
		},
		cleanData: function (t) {
			for (var e, i, n, r = ot.event.special, o = 0; void 0 !== (i = t[o]); o++)
				if (Tt(i)) {
					if (e = i[Ct.expando]) {
						if (e.events)
							for (n in e.events) r[n] ? ot.event.remove(i, n) : ot.removeEvent(i, n, e.handle);
						i[Ct.expando] = void 0
					}
					i[St.expando] && (i[St.expando] = void 0)
				}
		}
	}), ot.fn.extend({
		domManip: w,
		detach: function (t) {
			return T(this, t, !0)
		},
		remove: function (t) {
			return T(this, t)
		},
		text: function (t) {
			return wt(this, function (t) {
				return void 0 === t ? ot.text(this) : this.empty().each(function () {
					1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = t)
				})
			}, null, t, arguments.length)
		},
		append: function () {
			return w(this, arguments, function (t) {
				1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || v(this, t).appendChild(t)
			})
		},
		prepend: function () {
			return w(this, arguments, function (t) {
				if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
					var e = v(this, t);
					e.insertBefore(t, e.firstChild)
				}
			})
		},
		before: function () {
			return w(this, arguments, function (t) {
				this.parentNode && this.parentNode.insertBefore(t, this)
			})
		},
		after: function () {
			return w(this, arguments, function (t) {
				this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
			})
		},
		empty: function () {
			for (var t, e = 0; null != (t = this[e]); e++) 1 === t.nodeType && (ot.cleanData(c(t, !1)), t.textContent = "");
			return this
		},
		clone: function (t, e) {
			return t = null != t && t, e = null == e ? t : e, this.map(function () {
				return ot.clone(this, t, e)
			})
		},
		html: function (t) {
			return wt(this, function (t) {
				var e = this[0] || {},
					i = 0,
					n = this.length;
				if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
				if ("string" == typeof t && !Ht.test(t) && !Nt[(It.exec(t) || ["", ""])[1].toLowerCase()]) {
					t = ot.htmlPrefilter(t);
					try {
						for (; n > i; i++) 1 === (e = this[i] || {}).nodeType && (ot.cleanData(c(e, !1)), e.innerHTML = t);
						e = 0
					} catch (t) {}
				}
				e && this.empty().append(t)
			}, null, t, arguments.length)
		},
		replaceWith: function () {
			var t = [];
			return w(this, arguments, function (e) {
				var i = this.parentNode;
				ot.inArray(this, t) < 0 && (ot.cleanData(c(this)), i && i.replaceChild(e, this))
			}, t)
		}
	}), ot.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function (t, e) {
		ot.fn[t] = function (t) {
			for (var i, n = [], r = ot(t), o = r.length - 1, s = 0; o >= s; s++) i = s === o ? this : this.clone(!0), ot(r[s])[e](i), J.apply(n, i.get());
			return this.pushStack(n)
		}
	});
	var Wt, Xt = {
			HTML: "block",
			BODY: "block"
		},
		Vt = /^margin/,
		Yt = new RegExp("^(" + Ot + ")(?!px)[a-z%]+$", "i"),
		Gt = function (e) {
			var i = e.ownerDocument.defaultView;
			return i && i.opener || (i = t), i.getComputedStyle(e)
		},
		Zt = function (t, e, i, n) {
			var r, o, s = {};
			for (o in e) s[o] = t.style[o], t.style[o] = e[o];
			r = i.apply(t, n || []);
			for (o in e) t.style[o] = s[o];
			return r
		},
		Qt = G.documentElement;
	! function () {
		function e() {
			a.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", a.innerHTML = "", Qt.appendChild(s);
			var e = t.getComputedStyle(a);
			i = "1%" !== e.top, o = "2px" === e.marginLeft, n = "4px" === e.width, a.style.marginRight = "50%", r = "4px" === e.marginRight, Qt.removeChild(s)
		}
		var i, n, r, o, s = G.createElement("div"),
			a = G.createElement("div");
		a.style && (a.style.backgroundClip = "content-box", a.cloneNode(!0).style.backgroundClip = "", nt.clearCloneStyle = "content-box" === a.style.backgroundClip, s.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", s.appendChild(a), ot.extend(nt, {
			pixelPosition: function () {
				return e(), i
			},
			boxSizingReliable: function () {
				return null == n && e(), n
			},
			pixelMarginRight: function () {
				return null == n && e(), r
			},
			reliableMarginLeft: function () {
				return null == n && e(), o
			},
			reliableMarginRight: function () {
				var e, i = a.appendChild(G.createElement("div"));
				return i.style.cssText = a.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", i.style.marginRight = i.style.width = "0", a.style.width = "1px", Qt.appendChild(s), e = !parseFloat(t.getComputedStyle(i).marginRight), Qt.removeChild(s), a.removeChild(i), e
			}
		}))
	}();
	var Jt = /^(none|table(?!-c[ea]).+)/,
		Kt = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		te = {
			letterSpacing: "0",
			fontWeight: "400"
		},
		ee = ["Webkit", "O", "Moz", "ms"],
		ie = G.createElement("div").style;
	ot.extend({
		cssHooks: {
			opacity: {
				get: function (t, e) {
					if (e) {
						var i = E(t, "opacity");
						return "" === i ? "1" : i
					}
				}
			}
		},
		cssNumber: {
			animationIterationCount: !0,
			columnCount: !0,
			fillOpacity: !0,
			flexGrow: !0,
			flexShrink: !0,
			fontWeight: !0,
			lineHeight: !0,
			opacity: !0,
			order: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0
		},
		cssProps: {
			float: "cssFloat"
		},
		style: function (t, e, i, n) {
			if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
				var r, o, s, a = ot.camelCase(e),
					l = t.style;
				return e = ot.cssProps[a] || (ot.cssProps[a] = O(a) || a), s = ot.cssHooks[e] || ot.cssHooks[a], void 0 === i ? s && "get" in s && void 0 !== (r = s.get(t, !1, n)) ? r : l[e] : ("string" === (o = typeof i) && (r = Dt.exec(i)) && r[1] && (i = u(t, e, r), o = "number"), void(null != i && i === i && ("number" === o && (i += r && r[3] || (ot.cssNumber[a] ? "" : "px")), nt.clearCloneStyle || "" !== i || 0 !== e.indexOf("background") || (l[e] = "inherit"), s && "set" in s && void 0 === (i = s.set(t, i, n)) || (l[e] = i))))
			}
		},
		css: function (t, e, i, n) {
			var r, o, s, a = ot.camelCase(e);
			return e = ot.cssProps[a] || (ot.cssProps[a] = O(a) || a), (s = ot.cssHooks[e] || ot.cssHooks[a]) && "get" in s && (r = s.get(t, !0, i)), void 0 === r && (r = E(t, e, n)), "normal" === r && e in te && (r = te[e]), "" === i || i ? (o = parseFloat(r), !0 === i || isFinite(o) ? o || 0 : r) : r
		}
	}), ot.each(["height", "width"], function (t, e) {
		ot.cssHooks[e] = {
			get: function (t, i, n) {
				return i ? Jt.test(ot.css(t, "display")) && 0 === t.offsetWidth ? Zt(t, Kt, function () {
					return P(t, e, n)
				}) : P(t, e, n) : void 0
			},
			set: function (t, i, n) {
				var r, o = n && Gt(t),
					s = n && A(t, e, n, "border-box" === ot.css(t, "boxSizing", !1, o), o);
				return s && (r = Dt.exec(i)) && "px" !== (r[3] || "px") && (t.style[e] = i, i = ot.css(t, e)), D(t, i, s)
			}
		}
	}), ot.cssHooks.marginLeft = k(nt.reliableMarginLeft, function (t, e) {
		return e ? (parseFloat(E(t, "marginLeft")) || t.getBoundingClientRect().left - Zt(t, {
			marginLeft: 0
		}, function () {
			return t.getBoundingClientRect().left
		})) + "px" : void 0
	}), ot.cssHooks.marginRight = k(nt.reliableMarginRight, function (t, e) {
		return e ? Zt(t, {
			display: "inline-block"
		}, E, [t, "marginRight"]) : void 0
	}), ot.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function (t, e) {
		ot.cssHooks[t + e] = {
			expand: function (i) {
				for (var n = 0, r = {}, o = "string" == typeof i ? i.split(" ") : [i]; 4 > n; n++) r[t + At[n] + e] = o[n] || o[n - 2] || o[0];
				return r
			}
		}, Vt.test(t) || (ot.cssHooks[t + e].set = D)
	}), ot.fn.extend({
		css: function (t, e) {
			return wt(this, function (t, e, i) {
				var n, r, o = {},
					s = 0;
				if (ot.isArray(e)) {
					for (n = Gt(t), r = e.length; r > s; s++) o[e[s]] = ot.css(t, e[s], !1, n);
					return o
				}
				return void 0 !== i ? ot.style(t, e, i) : ot.css(t, e)
			}, t, e, arguments.length > 1)
		},
		show: function () {
			return M(this, !0)
		},
		hide: function () {
			return M(this)
		},
		toggle: function (t) {
			return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function () {
				Pt(this) ? ot(this).show() : ot(this).hide()
			})
		}
	}), ot.Tween = I, I.prototype = {
		constructor: I,
		init: function (t, e, i, n, r, o) {
			this.elem = t, this.prop = i, this.easing = r || ot.easing._default, this.options = e, this.start = this.now = this.cur(), this.end = n, this.unit = o || (ot.cssNumber[i] ? "" : "px")
		},
		cur: function () {
			var t = I.propHooks[this.prop];
			return t && t.get ? t.get(this) : I.propHooks._default.get(this)
		},
		run: function (t) {
			var e, i = I.propHooks[this.prop];
			return this.options.duration ? this.pos = e = ot.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : I.propHooks._default.set(this), this
		}
	}, I.prototype.init.prototype = I.prototype, I.propHooks = {
		_default: {
			get: function (t) {
				var e;
				return 1 !== t.elem.nodeType || null != t.elem[t.prop] && null == t.elem.style[t.prop] ? t.elem[t.prop] : (e = ot.css(t.elem, t.prop, ""), e && "auto" !== e ? e : 0)
			},
			set: function (t) {
				ot.fx.step[t.prop] ? ot.fx.step[t.prop](t) : 1 !== t.elem.nodeType || null == t.elem.style[ot.cssProps[t.prop]] && !ot.cssHooks[t.prop] ? t.elem[t.prop] = t.now : ot.style(t.elem, t.prop, t.now + t.unit)
			}
		}
	}, I.propHooks.scrollTop = I.propHooks.scrollLeft = {
		set: function (t) {
			t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
		}
	}, ot.easing = {
		linear: function (t) {
			return t
		},
		swing: function (t) {
			return .5 - Math.cos(t * Math.PI) / 2
		},
		_default: "swing"
	}, ot.fx = I.prototype.init, ot.fx.step = {};
	var ne, re, oe = /^(?:toggle|show|hide)$/,
		se = /queueHooks$/;
	ot.Animation = ot.extend(F, {
			tweeners: {
				"*": [function (t, e) {
					var i = this.createTween(t, e);
					return u(i.elem, t, Dt.exec(e), i), i
				}]
			},
			tweener: function (t, e) {
				ot.isFunction(t) ? (e = t, t = ["*"]) : t = t.match(xt);
				for (var i, n = 0, r = t.length; r > n; n++) i = t[n], F.tweeners[i] = F.tweeners[i] || [], F.tweeners[i].unshift(e)
			},
			prefilters: [R],
			prefilter: function (t, e) {
				e ? F.prefilters.unshift(t) : F.prefilters.push(t)
			}
		}), ot.speed = function (t, e, i) {
			var n = t && "object" == typeof t ? ot.extend({}, t) : {
				complete: i || !i && e || ot.isFunction(t) && t,
				duration: t,
				easing: i && e || e && !ot.isFunction(e) && e
			};
			return n.duration = ot.fx.off ? 0 : "number" == typeof n.duration ? n.duration : n.duration in ot.fx.speeds ? ot.fx.speeds[n.duration] : ot.fx.speeds._default, null != n.queue && !0 !== n.queue || (n.queue = "fx"), n.old = n.complete, n.complete = function () {
				ot.isFunction(n.old) && n.old.call(this), n.queue && ot.dequeue(this, n.queue)
			}, n
		}, ot.fn.extend({
			fadeTo: function (t, e, i, n) {
				return this.filter(Pt).css("opacity", 0).show().end().animate({
					opacity: e
				}, t, i, n)
			},
			animate: function (t, e, i, n) {
				var r = ot.isEmptyObject(t),
					o = ot.speed(e, i, n),
					s = function () {
						var e = F(this, ot.extend({}, t), o);
						(r || Ct.get(this, "finish")) && e.stop(!0)
					};
				return s.finish = s, r || !1 === o.queue ? this.each(s) : this.queue(o.queue, s)
			},
			stop: function (t, e, i) {
				var n = function (t) {
					var e = t.stop;
					delete t.stop, e(i)
				};
				return "string" != typeof t && (i = e, e = t, t = void 0), e && !1 !== t && this.queue(t || "fx", []), this.each(function () {
					var e = !0,
						r = null != t && t + "queueHooks",
						o = ot.timers,
						s = Ct.get(this);
					if (r) s[r] && s[r].stop && n(s[r]);
					else
						for (r in s) s[r] && s[r].stop && se.test(r) && n(s[r]);
					for (r = o.length; r--;) o[r].elem !== this || null != t && o[r].queue !== t || (o[r].anim.stop(i), e = !1, o.splice(r, 1));
					!e && i || ot.dequeue(this, t)
				})
			},
			finish: function (t) {
				return !1 !== t && (t = t || "fx"), this.each(function () {
					var e, i = Ct.get(this),
						n = i[t + "queue"],
						r = i[t + "queueHooks"],
						o = ot.timers,
						s = n ? n.length : 0;
					for (i.finish = !0, ot.queue(this, t, []), r && r.stop && r.stop.call(this, !0), e = o.length; e--;) o[e].elem === this && o[e].queue === t && (o[e].anim.stop(!0), o.splice(e, 1));
					for (e = 0; s > e; e++) n[e] && n[e].finish && n[e].finish.call(this);
					delete i.finish
				})
			}
		}), ot.each(["toggle", "show", "hide"], function (t, e) {
			var i = ot.fn[e];
			ot.fn[e] = function (t, n, r) {
				return null == t || "boolean" == typeof t ? i.apply(this, arguments) : this.animate(N(e, !0), t, n, r)
			}
		}), ot.each({
			slideDown: N("show"),
			slideUp: N("hide"),
			slideToggle: N("toggle"),
			fadeIn: {
				opacity: "show"
			},
			fadeOut: {
				opacity: "hide"
			},
			fadeToggle: {
				opacity: "toggle"
			}
		}, function (t, e) {
			ot.fn[t] = function (t, i, n) {
				return this.animate(e, t, i, n)
			}
		}), ot.timers = [], ot.fx.tick = function () {
			var t, e = 0,
				i = ot.timers;
			for (ne = ot.now(); e < i.length; e++)(t = i[e])() || i[e] !== t || i.splice(e--, 1);
			i.length || ot.fx.stop(), ne = void 0
		}, ot.fx.timer = function (t) {
			ot.timers.push(t), t() ? ot.fx.start() : ot.timers.pop()
		}, ot.fx.interval = 13, ot.fx.start = function () {
			re || (re = t.setInterval(ot.fx.tick, ot.fx.interval))
		}, ot.fx.stop = function () {
			t.clearInterval(re), re = null
		}, ot.fx.speeds = {
			slow: 600,
			fast: 200,
			_default: 400
		}, ot.fn.delay = function (e, i) {
			return e = ot.fx ? ot.fx.speeds[e] || e : e, i = i || "fx", this.queue(i, function (i, n) {
				var r = t.setTimeout(i, e);
				n.stop = function () {
					t.clearTimeout(r)
				}
			})
		},
		function () {
			var t = G.createElement("input"),
				e = G.createElement("select"),
				i = e.appendChild(G.createElement("option"));
			t.type = "checkbox", nt.checkOn = "" !== t.value, nt.optSelected = i.selected, e.disabled = !0, nt.optDisabled = !i.disabled, (t = G.createElement("input")).value = "t", t.type = "radio", nt.radioValue = "t" === t.value
		}();
	var ae, le = ot.expr.attrHandle;
	ot.fn.extend({
		attr: function (t, e) {
			return wt(this, ot.attr, t, e, arguments.length > 1)
		},
		removeAttr: function (t) {
			return this.each(function () {
				ot.removeAttr(this, t)
			})
		}
	}), ot.extend({
		attr: function (t, e, i) {
			var n, r, o = t.nodeType;
			if (3 !== o && 8 !== o && 2 !== o) return void 0 === t.getAttribute ? ot.prop(t, e, i) : (1 === o && ot.isXMLDoc(t) || (e = e.toLowerCase(), r = ot.attrHooks[e] || (ot.expr.match.bool.test(e) ? ae : void 0)), void 0 !== i ? null === i ? void ot.removeAttr(t, e) : r && "set" in r && void 0 !== (n = r.set(t, i, e)) ? n : (t.setAttribute(e, i + ""), i) : r && "get" in r && null !== (n = r.get(t, e)) ? n : (n = ot.find.attr(t, e), null == n ? void 0 : n))
		},
		attrHooks: {
			type: {
				set: function (t, e) {
					if (!nt.radioValue && "radio" === e && ot.nodeName(t, "input")) {
						var i = t.value;
						return t.setAttribute("type", e), i && (t.value = i), e
					}
				}
			}
		},
		removeAttr: function (t, e) {
			var i, n, r = 0,
				o = e && e.match(xt);
			if (o && 1 === t.nodeType)
				for (; i = o[r++];) n = ot.propFix[i] || i, ot.expr.match.bool.test(i) && (t[n] = !1), t.removeAttribute(i)
		}
	}), ae = {
		set: function (t, e, i) {
			return !1 === e ? ot.removeAttr(t, i) : t.setAttribute(i, i), i
		}
	}, ot.each(ot.expr.match.bool.source.match(/\w+/g), function (t, e) {
		var i = le[e] || ot.find.attr;
		le[e] = function (t, e, n) {
			var r, o;
			return n || (o = le[e], le[e] = r, r = null != i(t, e, n) ? e.toLowerCase() : null, le[e] = o), r
		}
	});
	var ue = /^(?:input|select|textarea|button)$/i,
		ce = /^(?:a|area)$/i;
	ot.fn.extend({
		prop: function (t, e) {
			return wt(this, ot.prop, t, e, arguments.length > 1)
		},
		removeProp: function (t) {
			return this.each(function () {
				delete this[ot.propFix[t] || t]
			})
		}
	}), ot.extend({
		prop: function (t, e, i) {
			var n, r, o = t.nodeType;
			if (3 !== o && 8 !== o && 2 !== o) return 1 === o && ot.isXMLDoc(t) || (e = ot.propFix[e] || e, r = ot.propHooks[e]), void 0 !== i ? r && "set" in r && void 0 !== (n = r.set(t, i, e)) ? n : t[e] = i : r && "get" in r && null !== (n = r.get(t, e)) ? n : t[e]
		},
		propHooks: {
			tabIndex: {
				get: function (t) {
					var e = ot.find.attr(t, "tabindex");
					return e ? parseInt(e, 10) : ue.test(t.nodeName) || ce.test(t.nodeName) && t.href ? 0 : -1
				}
			}
		},
		propFix: {
			for: "htmlFor",
			class: "className"
		}
	}), nt.optSelected || (ot.propHooks.selected = {
		get: function (t) {
			var e = t.parentNode;
			return e && e.parentNode && e.parentNode.selectedIndex, null
		},
		set: function (t) {
			var e = t.parentNode;
			e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex)
		}
	}), ot.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
		ot.propFix[this.toLowerCase()] = this
	});
	var he = /[\t\r\n\f]/g;
	ot.fn.extend({
		addClass: function (t) {
			var e, i, n, r, o, s, a, l = 0;
			if (ot.isFunction(t)) return this.each(function (e) {
				ot(this).addClass(t.call(this, e, z(this)))
			});
			if ("string" == typeof t && t)
				for (e = t.match(xt) || []; i = this[l++];)
					if (r = z(i), n = 1 === i.nodeType && (" " + r + " ").replace(he, " ")) {
						for (s = 0; o = e[s++];) n.indexOf(" " + o + " ") < 0 && (n += o + " ");
						r !== (a = ot.trim(n)) && i.setAttribute("class", a)
					}
			return this
		},
		removeClass: function (t) {
			var e, i, n, r, o, s, a, l = 0;
			if (ot.isFunction(t)) return this.each(function (e) {
				ot(this).removeClass(t.call(this, e, z(this)))
			});
			if (!arguments.length) return this.attr("class", "");
			if ("string" == typeof t && t)
				for (e = t.match(xt) || []; i = this[l++];)
					if (r = z(i), n = 1 === i.nodeType && (" " + r + " ").replace(he, " ")) {
						for (s = 0; o = e[s++];)
							for (; n.indexOf(" " + o + " ") > -1;) n = n.replace(" " + o + " ", " ");
						r !== (a = ot.trim(n)) && i.setAttribute("class", a)
					}
			return this
		},
		toggleClass: function (t, e) {
			var i = typeof t;
			return "boolean" == typeof e && "string" === i ? e ? this.addClass(t) : this.removeClass(t) : ot.isFunction(t) ? this.each(function (i) {
				ot(this).toggleClass(t.call(this, i, z(this), e), e)
			}) : this.each(function () {
				var e, n, r, o;
				if ("string" === i)
					for (n = 0, r = ot(this), o = t.match(xt) || []; e = o[n++];) r.hasClass(e) ? r.removeClass(e) : r.addClass(e);
				else void 0 !== t && "boolean" !== i || ((e = z(this)) && Ct.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || !1 === t ? "" : Ct.get(this, "__className__") || ""))
			})
		},
		hasClass: function (t) {
			var e, i, n = 0;
			for (e = " " + t + " "; i = this[n++];)
				if (1 === i.nodeType && (" " + z(i) + " ").replace(he, " ").indexOf(e) > -1) return !0;
			return !1
		}
	});
	var de = /\r/g,
		pe = /[\x20\t\r\n\f]+/g;
	ot.fn.extend({
		val: function (t) {
			var e, i, n, r = this[0];
			return arguments.length ? (n = ot.isFunction(t), this.each(function (i) {
				var r;
				1 === this.nodeType && (r = n ? t.call(this, i, ot(this).val()) : t, null == r ? r = "" : "number" == typeof r ? r += "" : ot.isArray(r) && (r = ot.map(r, function (t) {
					return null == t ? "" : t + ""
				})), (e = ot.valHooks[this.type] || ot.valHooks[this.nodeName.toLowerCase()]) && "set" in e && void 0 !== e.set(this, r, "value") || (this.value = r))
			})) : r ? (e = ot.valHooks[r.type] || ot.valHooks[r.nodeName.toLowerCase()], e && "get" in e && void 0 !== (i = e.get(r, "value")) ? i : (i = r.value, "string" == typeof i ? i.replace(de, "") : null == i ? "" : i)) : void 0
		}
	}), ot.extend({
		valHooks: {
			option: {
				get: function (t) {
					var e = ot.find.attr(t, "value");
					return null != e ? e : ot.trim(ot.text(t)).replace(pe, " ")
				}
			},
			select: {
				get: function (t) {
					for (var e, i, n = t.options, r = t.selectedIndex, o = "select-one" === t.type || 0 > r, s = o ? null : [], a = o ? r + 1 : n.length, l = 0 > r ? a : o ? r : 0; a > l; l++)
						if (((i = n[l]).selected || l === r) && (nt.optDisabled ? !i.disabled : null === i.getAttribute("disabled")) && (!i.parentNode.disabled || !ot.nodeName(i.parentNode, "optgroup"))) {
							if (e = ot(i).val(), o) return e;
							s.push(e)
						}
					return s
				},
				set: function (t, e) {
					for (var i, n, r = t.options, o = ot.makeArray(e), s = r.length; s--;) n = r[s], (n.selected = ot.inArray(ot.valHooks.option.get(n), o) > -1) && (i = !0);
					return i || (t.selectedIndex = -1), o
				}
			}
		}
	}), ot.each(["radio", "checkbox"], function () {
		ot.valHooks[this] = {
			set: function (t, e) {
				return ot.isArray(e) ? t.checked = ot.inArray(ot(t).val(), e) > -1 : void 0
			}
		}, nt.checkOn || (ot.valHooks[this].get = function (t) {
			return null === t.getAttribute("value") ? "on" : t.value
		})
	});
	var fe = /^(?:focusinfocus|focusoutblur)$/;
	ot.extend(ot.event, {
		trigger: function (e, i, n, r) {
			var o, s, a, l, u, c, h, d = [n || G],
				p = it.call(e, "type") ? e.type : e,
				f = it.call(e, "namespace") ? e.namespace.split(".") : [];
			if (s = a = n = n || G, 3 !== n.nodeType && 8 !== n.nodeType && !fe.test(p + ot.event.triggered) && (p.indexOf(".") > -1 && (f = p.split("."), p = f.shift(), f.sort()), u = p.indexOf(":") < 0 && "on" + p, e = e[ot.expando] ? e : new ot.Event(p, "object" == typeof e && e), e.isTrigger = r ? 2 : 3, e.namespace = f.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), i = null == i ? [e] : ot.makeArray(i, [e]), h = ot.event.special[p] || {}, r || !h.trigger || !1 !== h.trigger.apply(n, i))) {
				if (!r && !h.noBubble && !ot.isWindow(n)) {
					for (l = h.delegateType || p, fe.test(l + p) || (s = s.parentNode); s; s = s.parentNode) d.push(s), a = s;
					a === (n.ownerDocument || G) && d.push(a.defaultView || a.parentWindow || t)
				}
				for (o = 0;
					(s = d[o++]) && !e.isPropagationStopped();) e.type = o > 1 ? l : h.bindType || p, (c = (Ct.get(s, "events") || {})[e.type] && Ct.get(s, "handle")) && c.apply(s, i), (c = u && s[u]) && c.apply && Tt(s) && (e.result = c.apply(s, i), !1 === e.result && e.preventDefault());
				return e.type = p, r || e.isDefaultPrevented() || h._default && !1 !== h._default.apply(d.pop(), i) || !Tt(n) || u && ot.isFunction(n[p]) && !ot.isWindow(n) && ((a = n[u]) && (n[u] = null), ot.event.triggered = p, n[p](), ot.event.triggered = void 0, a && (n[u] = a)), e.result
			}
		},
		simulate: function (t, e, i) {
			var n = ot.extend(new ot.Event, i, {
				type: t,
				isSimulated: !0
			});
			ot.event.trigger(n, null, e)
		}
	}), ot.fn.extend({
		trigger: function (t, e) {
			return this.each(function () {
				ot.event.trigger(t, e, this)
			})
		},
		triggerHandler: function (t, e) {
			var i = this[0];
			return i ? ot.event.trigger(t, e, i, !0) : void 0
		}
	}), ot.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (t, e) {
		ot.fn[e] = function (t, i) {
			return arguments.length > 0 ? this.on(e, null, t, i) : this.trigger(e)
		}
	}), ot.fn.extend({
		hover: function (t, e) {
			return this.mouseenter(t).mouseleave(e || t)
		}
	}), nt.focusin = "onfocusin" in t, nt.focusin || ot.each({
		focus: "focusin",
		blur: "focusout"
	}, function (t, e) {
		var i = function (t) {
			ot.event.simulate(e, t.target, ot.event.fix(t))
		};
		ot.event.special[e] = {
			setup: function () {
				var n = this.ownerDocument || this,
					r = Ct.access(n, e);
				r || n.addEventListener(t, i, !0), Ct.access(n, e, (r || 0) + 1)
			},
			teardown: function () {
				var n = this.ownerDocument || this,
					r = Ct.access(n, e) - 1;
				r ? Ct.access(n, e, r) : (n.removeEventListener(t, i, !0), Ct.remove(n, e))
			}
		}
	});
	var me = t.location,
		ge = ot.now(),
		ve = /\?/;
	ot.parseJSON = function (t) {
		return JSON.parse(t + "")
	}, ot.parseXML = function (e) {
		var i;
		if (!e || "string" != typeof e) return null;
		try {
			i = (new t.DOMParser).parseFromString(e, "text/xml")
		} catch (t) {
			i = void 0
		}
		return i && !i.getElementsByTagName("parsererror").length || ot.error("Invalid XML: " + e), i
	};
	var _e = /#.*$/,
		ye = /([?&])_=[^&]*/,
		xe = /^(.*?):[ \t]*([^\r\n]*)$/gm,
		be = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		we = /^(?:GET|HEAD)$/,
		Te = /^\/\//,
		Ce = {},
		Se = {},
		Ee = "*/".concat("*"),
		ke = G.createElement("a");
	ke.href = me.href, ot.extend({
		active: 0,
		lastModified: {},
		etag: {},
		ajaxSettings: {
			url: me.href,
			type: "GET",
			isLocal: be.test(me.protocol),
			global: !0,
			processData: !0,
			async: !0,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			accepts: {
				"*": Ee,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
			converters: {
				"* text": String,
				"text html": !0,
				"text json": ot.parseJSON,
				"text xml": ot.parseXML
			},
			flatOptions: {
				url: !0,
				context: !0
			}
		},
		ajaxSetup: function (t, e) {
			return e ? q(q(t, ot.ajaxSettings), e) : q(ot.ajaxSettings, t)
		},
		ajaxPrefilter: H(Ce),
		ajaxTransport: H(Se),
		ajax: function (e, i) {
			function n(e, i, n, a) {
				var u, h, _, y, b, T = i;
				2 !== x && (x = 2, l && t.clearTimeout(l), r = void 0, s = a || "", w.readyState = e > 0 ? 4 : 0, u = e >= 200 && 300 > e || 304 === e, n && (y = U(d, w, n)), y = W(d, y, w, u), u ? (d.ifModified && ((b = w.getResponseHeader("Last-Modified")) && (ot.lastModified[o] = b), (b = w.getResponseHeader("etag")) && (ot.etag[o] = b)), 204 === e || "HEAD" === d.type ? T = "nocontent" : 304 === e ? T = "notmodified" : (T = y.state, h = y.data, _ = y.error, u = !_)) : (_ = T, !e && T || (T = "error", 0 > e && (e = 0))), w.status = e, w.statusText = (i || T) + "", u ? m.resolveWith(p, [h, T, w]) : m.rejectWith(p, [w, T, _]), w.statusCode(v), v = void 0, c && f.trigger(u ? "ajaxSuccess" : "ajaxError", [w, d, u ? h : _]), g.fireWith(p, [w, T]), c && (f.trigger("ajaxComplete", [w, d]), --ot.active || ot.event.trigger("ajaxStop")))
			}
			"object" == typeof e && (i = e, e = void 0), i = i || {};
			var r, o, s, a, l, u, c, h, d = ot.ajaxSetup({}, i),
				p = d.context || d,
				f = d.context && (p.nodeType || p.jquery) ? ot(p) : ot.event,
				m = ot.Deferred(),
				g = ot.Callbacks("once memory"),
				v = d.statusCode || {},
				_ = {},
				y = {},
				x = 0,
				b = "canceled",
				w = {
					readyState: 0,
					getResponseHeader: function (t) {
						var e;
						if (2 === x) {
							if (!a)
								for (a = {}; e = xe.exec(s);) a[e[1].toLowerCase()] = e[2];
							e = a[t.toLowerCase()]
						}
						return null == e ? null : e
					},
					getAllResponseHeaders: function () {
						return 2 === x ? s : null
					},
					setRequestHeader: function (t, e) {
						var i = t.toLowerCase();
						return x || (t = y[i] = y[i] || t, _[t] = e), this
					},
					overrideMimeType: function (t) {
						return x || (d.mimeType = t), this
					},
					statusCode: function (t) {
						var e;
						if (t)
							if (2 > x)
								for (e in t) v[e] = [v[e], t[e]];
							else w.always(t[w.status]);
						return this
					},
					abort: function (t) {
						var e = t || b;
						return r && r.abort(e), n(0, e), this
					}
				};
			if (m.promise(w).complete = g.add, w.success = w.done, w.error = w.fail, d.url = ((e || d.url || me.href) + "").replace(_e, "").replace(Te, me.protocol + "//"), d.type = i.method || i.type || d.method || d.type, d.dataTypes = ot.trim(d.dataType || "*").toLowerCase().match(xt) || [""], null == d.crossDomain) {
				u = G.createElement("a");
				try {
					u.href = d.url, u.href = u.href, d.crossDomain = ke.protocol + "//" + ke.host != u.protocol + "//" + u.host
				} catch (t) {
					d.crossDomain = !0
				}
			}
			if (d.data && d.processData && "string" != typeof d.data && (d.data = ot.param(d.data, d.traditional)), $(Ce, d, i, w), 2 === x) return w;
			(c = ot.event && d.global) && 0 == ot.active++ && ot.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !we.test(d.type), o = d.url, d.hasContent || (d.data && (o = d.url += (ve.test(o) ? "&" : "?") + d.data, delete d.data), !1 === d.cache && (d.url = ye.test(o) ? o.replace(ye, "$1_=" + ge++) : o + (ve.test(o) ? "&" : "?") + "_=" + ge++)), d.ifModified && (ot.lastModified[o] && w.setRequestHeader("If-Modified-Since", ot.lastModified[o]), ot.etag[o] && w.setRequestHeader("If-None-Match", ot.etag[o])), (d.data && d.hasContent && !1 !== d.contentType || i.contentType) && w.setRequestHeader("Content-Type", d.contentType), w.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + Ee + "; q=0.01" : "") : d.accepts["*"]);
			for (h in d.headers) w.setRequestHeader(h, d.headers[h]);
			if (d.beforeSend && (!1 === d.beforeSend.call(p, w, d) || 2 === x)) return w.abort();
			b = "abort";
			for (h in {
					success: 1,
					error: 1,
					complete: 1
				}) w[h](d[h]);
			if (r = $(Se, d, i, w)) {
				if (w.readyState = 1, c && f.trigger("ajaxSend", [w, d]), 2 === x) return w;
				d.async && d.timeout > 0 && (l = t.setTimeout(function () {
					w.abort("timeout")
				}, d.timeout));
				try {
					x = 1, r.send(_, n)
				} catch (t) {
					if (!(2 > x)) throw t;
					n(-1, t)
				}
			} else n(-1, "No Transport");
			return w
		},
		getJSON: function (t, e, i) {
			return ot.get(t, e, i, "json")
		},
		getScript: function (t, e) {
			return ot.get(t, void 0, e, "script")
		}
	}), ot.each(["get", "post"], function (t, e) {
		ot[e] = function (t, i, n, r) {
			return ot.isFunction(i) && (r = r || n, n = i, i = void 0), ot.ajax(ot.extend({
				url: t,
				type: e,
				dataType: r,
				data: i,
				success: n
			}, ot.isPlainObject(t) && t))
		}
	}), ot._evalUrl = function (t) {
		return ot.ajax({
			url: t,
			type: "GET",
			dataType: "script",
			async: !1,
			global: !1,
			throws: !0
		})
	}, ot.fn.extend({
		wrapAll: function (t) {
			var e;
			return ot.isFunction(t) ? this.each(function (e) {
				ot(this).wrapAll(t.call(this, e))
			}) : (this[0] && (e = ot(t, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map(function () {
				for (var t = this; t.firstElementChild;) t = t.firstElementChild;
				return t
			}).append(this)), this)
		},
		wrapInner: function (t) {
			return ot.isFunction(t) ? this.each(function (e) {
				ot(this).wrapInner(t.call(this, e))
			}) : this.each(function () {
				var e = ot(this),
					i = e.contents();
				i.length ? i.wrapAll(t) : e.append(t)
			})
		},
		wrap: function (t) {
			var e = ot.isFunction(t);
			return this.each(function (i) {
				ot(this).wrapAll(e ? t.call(this, i) : t)
			})
		},
		unwrap: function () {
			return this.parent().each(function () {
				ot.nodeName(this, "body") || ot(this).replaceWith(this.childNodes)
			}).end()
		}
	}), ot.expr.filters.hidden = function (t) {
		return !ot.expr.filters.visible(t)
	}, ot.expr.filters.visible = function (t) {
		return t.offsetWidth > 0 || t.offsetHeight > 0 || t.getClientRects().length > 0
	};
	var Oe = /%20/g,
		De = /\[\]$/,
		Ae = /\r?\n/g,
		Pe = /^(?:submit|button|image|reset|file)$/i,
		Me = /^(?:input|select|textarea|keygen)/i;
	ot.param = function (t, e) {
		var i, n = [],
			r = function (t, e) {
				e = ot.isFunction(e) ? e() : null == e ? "" : e, n[n.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
			};
		if (void 0 === e && (e = ot.ajaxSettings && ot.ajaxSettings.traditional), ot.isArray(t) || t.jquery && !ot.isPlainObject(t)) ot.each(t, function () {
			r(this.name, this.value)
		});
		else
			for (i in t) X(i, t[i], e, r);
		return n.join("&").replace(Oe, "+")
	}, ot.fn.extend({
		serialize: function () {
			return ot.param(this.serializeArray())
		},
		serializeArray: function () {
			return this.map(function () {
				var t = ot.prop(this, "elements");
				return t ? ot.makeArray(t) : this
			}).filter(function () {
				var t = this.type;
				return this.name && !ot(this).is(":disabled") && Me.test(this.nodeName) && !Pe.test(t) && (this.checked || !Mt.test(t))
			}).map(function (t, e) {
				var i = ot(this).val();
				return null == i ? null : ot.isArray(i) ? ot.map(i, function (t) {
					return {
						name: e.name,
						value: t.replace(Ae, "\r\n")
					}
				}) : {
					name: e.name,
					value: i.replace(Ae, "\r\n")
				}
			}).get()
		}
	}), ot.ajaxSettings.xhr = function () {
		try {
			return new t.XMLHttpRequest
		} catch (t) {}
	};
	var Ie = {
			0: 200,
			1223: 204
		},
		je = ot.ajaxSettings.xhr();
	nt.cors = !!je && "withCredentials" in je, nt.ajax = je = !!je, ot.ajaxTransport(function (e) {
		var i, n;
		return nt.cors || je && !e.crossDomain ? {
			send: function (r, o) {
				var s, a = e.xhr();
				if (a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
					for (s in e.xhrFields) a[s] = e.xhrFields[s];
				e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType), e.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
				for (s in r) a.setRequestHeader(s, r[s]);
				i = function (t) {
					return function () {
						i && (i = n = a.onload = a.onerror = a.onabort = a.onreadystatechange = null, "abort" === t ? a.abort() : "error" === t ? "number" != typeof a.status ? o(0, "error") : o(a.status, a.statusText) : o(Ie[a.status] || a.status, a.statusText, "text" !== (a.responseType || "text") || "string" != typeof a.responseText ? {
							binary: a.response
						} : {
							text: a.responseText
						}, a.getAllResponseHeaders()))
					}
				}, a.onload = i(), n = a.onerror = i("error"), void 0 !== a.onabort ? a.onabort = n : a.onreadystatechange = function () {
					4 === a.readyState && t.setTimeout(function () {
						i && n()
					})
				}, i = i("abort");
				try {
					a.send(e.hasContent && e.data || null)
				} catch (t) {
					if (i) throw t
				}
			},
			abort: function () {
				i && i()
			}
		} : void 0
	}), ot.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function (t) {
				return ot.globalEval(t), t
			}
		}
	}), ot.ajaxPrefilter("script", function (t) {
		void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET")
	}), ot.ajaxTransport("script", function (t) {
		if (t.crossDomain) {
			var e, i;
			return {
				send: function (n, r) {
					e = ot("<script>").prop({
						charset: t.scriptCharset,
						src: t.url
					}).on("load error", i = function (t) {
						e.remove(), i = null, t && r("error" === t.type ? 404 : 200, t.type)
					}), G.head.appendChild(e[0])
				},
				abort: function () {
					i && i()
				}
			}
		}
	});
	var Ne = [],
		Be = /(=)\?(?=&|$)|\?\?/;
	ot.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function () {
			var t = Ne.pop() || ot.expando + "_" + ge++;
			return this[t] = !0, t
		}
	}), ot.ajaxPrefilter("json jsonp", function (e, i, n) {
		var r, o, s, a = !1 !== e.jsonp && (Be.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Be.test(e.data) && "data");
		return a || "jsonp" === e.dataTypes[0] ? (r = e.jsonpCallback = ot.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(Be, "$1" + r) : !1 !== e.jsonp && (e.url += (ve.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function () {
			return s || ot.error(r + " was not called"), s[0]
		}, e.dataTypes[0] = "json", o = t[r], t[r] = function () {
			s = arguments
		}, n.always(function () {
			void 0 === o ? ot(t).removeProp(r) : t[r] = o, e[r] && (e.jsonpCallback = i.jsonpCallback, Ne.push(r)), s && ot.isFunction(o) && o(s[0]), s = o = void 0
		}), "script") : void 0
	}), ot.parseHTML = function (t, e, i) {
		if (!t || "string" != typeof t) return null;
		"boolean" == typeof e && (i = e, e = !1), e = e || G;
		var n = ft.exec(t),
			r = !i && [];
		return n ? [e.createElement(n[1])] : (n = d([t], e, r), r && r.length && ot(r).remove(), ot.merge([], n.childNodes))
	};
	var Re = ot.fn.load;
	ot.fn.load = function (t, e, i) {
		if ("string" != typeof t && Re) return Re.apply(this, arguments);
		var n, r, o, s = this,
			a = t.indexOf(" ");
		return a > -1 && (n = ot.trim(t.slice(a)), t = t.slice(0, a)), ot.isFunction(e) ? (i = e, e = void 0) : e && "object" == typeof e && (r = "POST"), s.length > 0 && ot.ajax({
			url: t,
			type: r || "GET",
			dataType: "html",
			data: e
		}).done(function (t) {
			o = arguments, s.html(n ? ot("<div>").append(ot.parseHTML(t)).find(n) : t)
		}).always(i && function (t, e) {
			s.each(function () {
				i.apply(this, o || [t.responseText, e, t])
			})
		}), this
	}, ot.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (t, e) {
		ot.fn[e] = function (t) {
			return this.on(e, t)
		}
	}), ot.expr.filters.animated = function (t) {
		return ot.grep(ot.timers, function (e) {
			return t === e.elem
		}).length
	}, ot.offset = {
		setOffset: function (t, e, i) {
			var n, r, o, s, a, l, u = ot.css(t, "position"),
				c = ot(t),
				h = {};
			"static" === u && (t.style.position = "relative"), a = c.offset(), o = ot.css(t, "top"), l = ot.css(t, "left"), ("absolute" === u || "fixed" === u) && (o + l).indexOf("auto") > -1 ? (n = c.position(), s = n.top, r = n.left) : (s = parseFloat(o) || 0, r = parseFloat(l) || 0), ot.isFunction(e) && (e = e.call(t, i, ot.extend({}, a))), null != e.top && (h.top = e.top - a.top + s), null != e.left && (h.left = e.left - a.left + r), "using" in e ? e.using.call(t, h) : c.css(h)
		}
	}, ot.fn.extend({
		offset: function (t) {
			if (arguments.length) return void 0 === t ? this : this.each(function (e) {
				ot.offset.setOffset(this, t, e)
			});
			var e, i, n = this[0],
				r = {
					top: 0,
					left: 0
				},
				o = n && n.ownerDocument;
			return o ? (e = o.documentElement, ot.contains(e, n) ? (r = n.getBoundingClientRect(), i = V(o), {
				top: r.top + i.pageYOffset - e.clientTop,
				left: r.left + i.pageXOffset - e.clientLeft
			}) : r) : void 0
		},
		position: function () {
			if (this[0]) {
				var t, e, i = this[0],
					n = {
						top: 0,
						left: 0
					};
				return "fixed" === ot.css(i, "position") ? e = i.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), ot.nodeName(t[0], "html") || (n = t.offset()), n.top += ot.css(t[0], "borderTopWidth", !0), n.left += ot.css(t[0], "borderLeftWidth", !0)), {
					top: e.top - n.top - ot.css(i, "marginTop", !0),
					left: e.left - n.left - ot.css(i, "marginLeft", !0)
				}
			}
		},
		offsetParent: function () {
			return this.map(function () {
				for (var t = this.offsetParent; t && "static" === ot.css(t, "position");) t = t.offsetParent;
				return t || Qt
			})
		}
	}), ot.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function (t, e) {
		var i = "pageYOffset" === e;
		ot.fn[t] = function (n) {
			return wt(this, function (t, n, r) {
				var o = V(t);
				return void 0 === r ? o ? o[e] : t[n] : void(o ? o.scrollTo(i ? o.pageXOffset : r, i ? r : o.pageYOffset) : t[n] = r)
			}, t, n, arguments.length)
		}
	}), ot.each(["top", "left"], function (t, e) {
		ot.cssHooks[e] = k(nt.pixelPosition, function (t, i) {
			return i ? (i = E(t, e), Yt.test(i) ? ot(t).position()[e] + "px" : i) : void 0
		})
	}), ot.each({
		Height: "height",
		Width: "width"
	}, function (t, e) {
		ot.each({
			padding: "inner" + t,
			content: e,
			"": "outer" + t
		}, function (i, n) {
			ot.fn[n] = function (n, r) {
				var o = arguments.length && (i || "boolean" != typeof n),
					s = i || (!0 === n || !0 === r ? "margin" : "border");
				return wt(this, function (e, i, n) {
					var r;
					return ot.isWindow(e) ? e.document.documentElement["client" + t] : 9 === e.nodeType ? (r = e.documentElement, Math.max(e.body["scroll" + t], r["scroll" + t], e.body["offset" + t], r["offset" + t], r["client" + t])) : void 0 === n ? ot.css(e, i, s) : ot.style(e, i, n, s)
				}, e, o ? n : void 0, o, null)
			}
		})
	}), ot.fn.extend({
		bind: function (t, e, i) {
			return this.on(t, null, e, i)
		},
		unbind: function (t, e) {
			return this.off(t, null, e)
		},
		delegate: function (t, e, i, n) {
			return this.on(e, t, i, n)
		},
		undelegate: function (t, e, i) {
			return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", i)
		},
		size: function () {
			return this.length
		}
	}), ot.fn.andSelf = ot.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
		return ot
	});
	var Le = t.jQuery,
		Fe = t.$;
	return ot.noConflict = function (e) {
		return t.$ === ot && (t.$ = Fe), e && t.jQuery === ot && (t.jQuery = Le), ot
	}, e || (t.jQuery = t.$ = ot), ot
}),
function (t, e) {
	var i = 0,
		n = Array.prototype.slice,
		r = t.cleanData;
	t.cleanData = function (e) {
		for (var i, n = 0; null != (i = e[n]); n++) try {
			t(i).triggerHandler("remove")
		} catch (t) {}
		r(e)
	}, t.widget = function (i, n, r) {
		var o, s, a, l, u = i.split(".")[0];
		i = i.split(".")[1], o = u + "-" + i, r || (r = n, n = t.Widget), t.expr[":"][o.toLowerCase()] = function (e) {
			return !!t.data(e, o)
		}, t[u] = t[u] || {}, s = t[u][i], a = t[u][i] = function (t, i) {
			return this._createWidget ? (arguments.length && this._createWidget(t, i), e) : new a(t, i)
		}, t.extend(a, s, {
			version: r.version,
			_proto: t.extend({}, r),
			_childConstructors: []
		}), (l = new n).options = t.widget.extend({}, l.options), t.each(r, function (e, i) {
			t.isFunction(i) && (r[e] = function () {
				var t = function () {
						return n.prototype[e].apply(this, arguments)
					},
					r = function (t) {
						return n.prototype[e].apply(this, t)
					};
				return function () {
					var e, n = this._super,
						o = this._superApply;
					return this._super = t, this._superApply = r, e = i.apply(this, arguments), this._super = n, this._superApply = o, e
				}
			}())
		}), a.prototype = t.widget.extend(l, {
			widgetEventPrefix: s ? l.widgetEventPrefix : i
		}, r, {
			constructor: a,
			namespace: u,
			widgetName: i,
			widgetBaseClass: o,
			widgetFullName: o
		}), s ? (t.each(s._childConstructors, function (e, i) {
			var n = i.prototype;
			t.widget(n.namespace + "." + n.widgetName, a, i._proto)
		}), delete s._childConstructors) : n._childConstructors.push(a), t.widget.bridge(i, a)
	}, t.widget.extend = function (i) {
		for (var r, o, s = n.call(arguments, 1), a = 0, l = s.length; l > a; a++)
			for (r in s[a]) o = s[a][r], s[a].hasOwnProperty(r) && o !== e && (i[r] = t.isPlainObject(o) ? t.isPlainObject(i[r]) ? t.widget.extend({}, i[r], o) : t.widget.extend({}, o) : o);
		return i
	}, t.widget.bridge = function (i, r) {
		var o = r.prototype.widgetFullName || i;
		t.fn[i] = function (s) {
			var a = "string" == typeof s,
				l = n.call(arguments, 1),
				u = this;
			return s = !a && l.length ? t.widget.extend.apply(null, [s].concat(l)) : s, a ? this.each(function () {
				var n, r = t.data(this, o);
				return r ? t.isFunction(r[s]) && "_" !== s.charAt(0) ? (n = r[s].apply(r, l), n !== r && n !== e ? (u = n && n.jquery ? u.pushStack(n.get()) : n, !1) : e) : t.error("no such method '" + s + "' for " + i + " widget instance") : t.error("cannot call methods on " + i + " prior to initialization; attempted to call method '" + s + "'")
			}) : this.each(function () {
				var e = t.data(this, o);
				e ? e.option(s || {})._init() : t.data(this, o, new r(s, this))
			}), u
		}
	}, t.Widget = function () {}, t.Widget._childConstructors = [], t.Widget.prototype = {
		widgetName: "widget",
		widgetEventPrefix: "",
		defaultElement: "<div>",
		options: {
			disabled: !1,
			create: null
		},
		_createWidget: function (e, n) {
			n = t(n || this.defaultElement || this)[0], this.element = t(n), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), this.bindings = t(), this.hoverable = t(), this.focusable = t(), n !== this && (t.data(n, this.widgetName, this), t.data(n, this.widgetFullName, this), this._on(!0, this.element, {
				remove: function (t) {
					t.target === n && this.destroy()
				}
			}), this.document = t(n.style ? n.ownerDocument : n.document || n), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
		},
		_getCreateOptions: t.noop,
		_getCreateEventData: t.noop,
		_create: t.noop,
		_init: t.noop,
		destroy: function () {
			this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
		},
		_destroy: t.noop,
		widget: function () {
			return this.element
		},
		option: function (i, n) {
			var r, o, s, a = i;
			if (0 === arguments.length) return t.widget.extend({}, this.options);
			if ("string" == typeof i)
				if (a = {}, r = i.split("."), i = r.shift(), r.length) {
					for (o = a[i] = t.widget.extend({}, this.options[i]), s = 0; r.length - 1 > s; s++) o[r[s]] = o[r[s]] || {}, o = o[r[s]];
					if (i = r.pop(), n === e) return o[i] === e ? null : o[i];
					o[i] = n
				} else {
					if (n === e) return this.options[i] === e ? null : this.options[i];
					a[i] = n
				}
			return this._setOptions(a), this
		},
		_setOptions: function (t) {
			var e;
			for (e in t) this._setOption(e, t[e]);
			return this
		},
		_setOption: function (t, e) {
			return this.options[t] = e, "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!e).attr("aria-disabled", e), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
		},
		enable: function () {
			return this._setOption("disabled", !1)
		},
		disable: function () {
			return this._setOption("disabled", !0)
		},
		_on: function (i, n, r) {
			var o, s = this;
			"boolean" != typeof i && (r = n, n = i, i = !1), r ? (n = o = t(n), this.bindings = this.bindings.add(n)) : (r = n, n = this.element, o = this.widget()), t.each(r, function (r, a) {
				function l() {
					return i || !0 !== s.options.disabled && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof a ? s[a] : a).apply(s, arguments) : e
				}
				"string" != typeof a && (l.guid = a.guid = a.guid || l.guid || t.guid++);
				var u = r.match(/^(\w+)\s*(.*)$/),
					c = u[1] + s.eventNamespace,
					h = u[2];
				h ? o.delegate(h, c, l) : n.bind(c, l)
			})
		},
		_off: function (t, e) {
			e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(e).undelegate(e)
		},
		_delay: function (t, e) {
			function i() {
				return ("string" == typeof t ? n[t] : t).apply(n, arguments)
			}
			var n = this;
			return setTimeout(i, e || 0)
		},
		_hoverable: function (e) {
			this.hoverable = this.hoverable.add(e), this._on(e, {
				mouseenter: function (e) {
					t(e.currentTarget).addClass("ui-state-hover")
				},
				mouseleave: function (e) {
					t(e.currentTarget).removeClass("ui-state-hover")
				}
			})
		},
		_focusable: function (e) {
			this.focusable = this.focusable.add(e), this._on(e, {
				focusin: function (e) {
					t(e.currentTarget).addClass("ui-state-focus")
				},
				focusout: function (e) {
					t(e.currentTarget).removeClass("ui-state-focus")
				}
			})
		},
		_trigger: function (e, i, n) {
			var r, o, s = this.options[e];
			if (n = n || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], o = i.originalEvent)
				for (r in o) r in i || (i[r] = o[r]);
			return this.element.trigger(i, n), !(t.isFunction(s) && !1 === s.apply(this.element[0], [i].concat(n)) || i.isDefaultPrevented())
		}
	}, t.each({
		show: "fadeIn",
		hide: "fadeOut"
	}, function (e, i) {
		t.Widget.prototype["_" + e] = function (n, r, o) {
			"string" == typeof r && (r = {
				effect: r
			});
			var s, a = r ? !0 === r || "number" == typeof r ? i : r.effect || i : e;
			"number" == typeof (r = r || {}) && (r = {
				duration: r
			}), s = !t.isEmptyObject(r), r.complete = o, r.delay && n.delay(r.delay), s && t.effects && (t.effects.effect[a] || !1 !== t.uiBackCompat && t.effects[a]) ? n[e](r) : a !== e && n[a] ? n[a](r.duration, r.easing, o) : n.queue(function (i) {
				t(this)[e](), o && o.call(n[0]), i()
			})
		}
	}), !1 !== t.uiBackCompat && (t.Widget.prototype._getCreateOptions = function () {
		return t.metadata && t.metadata.get(this.element[0])[this.widgetName]
	})
}(jQuery),
function (t, e, i) {
	function n(t, e) {
		return typeof t === e
	}

	function r() {
		return "function" != typeof e.createElement ? e.createElement(arguments[0]) : w ? e.createElementNS.call(e, "http://www.w3.org/2000/svg", arguments[0]) : e.createElement.apply(e, arguments)
	}

	function o(t, e) {
		return !!~("" + t).indexOf(e)
	}

	function s(t) {
		return t.replace(/([a-z])-([a-z])/g, function (t, e, i) {
			return e + i.toUpperCase()
		}).replace(/^-/, "")
	}

	function a() {
		var t = e.body;
		return t || (t = r(w ? "svg" : "body"), t.fake = !0), t
	}

	function l(t, i, n, o) {
		var s, l, u, c, h = "modernizr",
			d = r("div"),
			p = a();
		if (parseInt(n, 10))
			for (; n--;) u = r("div"), u.id = o ? o[n] : h + (n + 1), d.appendChild(u);
		return s = r("style"), s.type = "text/css", s.id = "s" + h, (p.fake ? p : d).appendChild(s), p.appendChild(d), s.styleSheet ? s.styleSheet.cssText = t : s.appendChild(e.createTextNode(t)), d.id = h, p.fake && (p.style.background = "", p.style.overflow = "hidden", c = b.style.overflow, b.style.overflow = "hidden", b.appendChild(p)), l = i(d, t), p.fake ? (p.parentNode.removeChild(p), b.style.overflow = c, b.offsetHeight) : d.parentNode.removeChild(d), !!l
	}

	function u(t, e) {
		return function () {
			return t.apply(e, arguments)
		}
	}

	function c(t, e, i) {
		var r;
		for (var o in t)
			if (t[o] in e) return !1 === i ? t[o] : (r = e[t[o]], n(r, "function") ? u(r, i || e) : r);
		return !1
	}

	function h(t) {
		return t.replace(/([A-Z])/g, function (t, e) {
			return "-" + e.toLowerCase()
		}).replace(/^ms-/, "-ms-")
	}

	function d(e, n) {
		var r = e.length;
		if ("CSS" in t && "supports" in t.CSS) {
			for (; r--;)
				if (t.CSS.supports(h(e[r]), n)) return !0;
			return !1
		}
		if ("CSSSupportsRule" in t) {
			for (var o = []; r--;) o.push("(" + h(e[r]) + ":" + n + ")");
			return o = o.join(" or "), l("@supports (" + o + ") { #modernizr { position: absolute; } }", function (t) {
				return "absolute" == getComputedStyle(t, null).position
			})
		}
		return i
	}

	function p(t, e, a, l) {
		function u() {
			h && (delete P.style, delete P.modElem)
		}
		if (l = !n(l, "undefined") && l, !n(a, "undefined")) {
			var c = d(t, a);
			if (!n(c, "undefined")) return c
		}
		for (var h, p, f, m, g, v = ["modernizr", "tspan", "samp"]; !P.style && v.length;) h = !0, P.modElem = r(v.shift()), P.style = P.modElem.style;
		for (f = t.length, p = 0; f > p; p++)
			if (m = t[p], g = P.style[m], o(m, "-") && (m = s(m)), P.style[m] !== i) {
				if (l || n(a, "undefined")) return u(), "pfx" != e || m;
				try {
					P.style[m] = a
				} catch (t) {}
				if (P.style[m] != g) return u(), "pfx" != e || m
			}
		return u(), !1
	}

	function f(t, e, i, r, o) {
		var s = t.charAt(0).toUpperCase() + t.slice(1),
			a = (t + " " + k.join(s + " ") + s).split(" ");
		return n(e, "string") || n(e, "undefined") ? p(a, e, r, o) : (a = (t + " " + C.join(s + " ") + s).split(" "), c(a, e, i))
	}

	function m(t, e, n) {
		return f(t, i, i, e, n)
	}
	var g = [],
		v = [],
		_ = {
			_version: "3.3.1",
			_config: {
				classPrefix: "feature_",
				enableClasses: !0,
				enableJSClass: !0,
				usePrefixes: !0
			},
			_q: [],
			on: function (t, e) {
				var i = this;
				setTimeout(function () {
					e(i[t])
				}, 0)
			},
			addTest: function (t, e, i) {
				v.push({
					name: t,
					fn: e,
					options: i
				})
			},
			addAsyncTest: function (t) {
				v.push({
					name: null,
					fn: t
				})
			}
		},
		y = function () {};
	y.prototype = _, y = new y;
	var x = _._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
	_._prefixes = x;
	var b = e.documentElement,
		w = "svg" === b.nodeName.toLowerCase();
	w || function (t, e) {
		function i(t, e) {
			var i = t.createElement("p"),
				n = t.getElementsByTagName("head")[0] || t.documentElement;
			return i.innerHTML = "x<style>" + e + "</style>", n.insertBefore(i.lastChild, n.firstChild)
		}

		function n() {
			var t = _.elements;
			return "string" == typeof t ? t.split(" ") : t
		}

		function r(t, e) {
			var i = _.elements;
			"string" != typeof i && (i = i.join(" ")), "string" != typeof t && (t = t.join(" ")), _.elements = i + " " + t, u(e)
		}

		function o(t) {
			var e = v[t[m]];
			return e || (e = {}, g++, t[m] = g, v[g] = e), e
		}

		function s(t, i, n) {
			if (i || (i = e), h) return i.createElement(t);
			n || (n = o(i));
			var r;
			return r = n.cache[t] ? n.cache[t].cloneNode() : f.test(t) ? (n.cache[t] = n.createElem(t)).cloneNode() : n.createElem(t), !r.canHaveChildren || p.test(t) || r.tagUrn ? r : n.frag.appendChild(r)
		}

		function a(t, i) {
			if (t || (t = e), h) return t.createDocumentFragment();
			for (var r = (i = i || o(t)).frag.cloneNode(), s = 0, a = n(), l = a.length; l > s; s++) r.createElement(a[s]);
			return r
		}

		function l(t, e) {
			e.cache || (e.cache = {}, e.createElem = t.createElement, e.createFrag = t.createDocumentFragment, e.frag = e.createFrag()), t.createElement = function (i) {
				return _.shivMethods ? s(i, t, e) : e.createElem(i)
			}, t.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + n().join().replace(/[\w\-:]+/g, function (t) {
				return e.createElem(t), e.frag.createElement(t), 'c("' + t + '")'
			}) + ");return n}")(_, e.frag)
		}

		function u(t) {
			t || (t = e);
			var n = o(t);
			return !_.shivCSS || c || n.hasCSS || (n.hasCSS = !!i(t, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), h || l(t, n), t
		}
		var c, h, d = t.html5 || {},
			p = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
			f = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
			m = "_html5shiv",
			g = 0,
			v = {};
		! function () {
			try {
				var t = e.createElement("a");
				t.innerHTML = "<xyz></xyz>", c = "hidden" in t, h = 1 == t.childNodes.length || function () {
					e.createElement("a");
					var t = e.createDocumentFragment();
					return void 0 === t.cloneNode || void 0 === t.createDocumentFragment || void 0 === t.createElement
				}()
			} catch (t) {
				c = !0, h = !0
			}
		}();
		var _ = {
			elements: d.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",
			version: "3.7.3",
			shivCSS: !1 !== d.shivCSS,
			supportsUnknownElements: h,
			shivMethods: !1 !== d.shivMethods,
			type: "default",
			shivDocument: u,
			createElement: s,
			createDocumentFragment: a,
			addElements: r
		};
		t.html5 = _, u(e), "object" == typeof module && module.exports && (module.exports = _)
	}(void 0 !== t ? t : this, e);
	var T = "Moz O ms Webkit",
		C = _._config.usePrefixes ? T.toLowerCase().split(" ") : [];
	_._domPrefixes = C, y.addTest("rgba", function () {
		var t = r("a").style;
		return t.cssText = "background-color:rgba(150,255,150,.5)", ("" + t.backgroundColor).indexOf("rgba") > -1
	});
	var S = "CSS" in t && "supports" in t.CSS,
		E = "supportsCSS" in t;
	y.addTest("supports", S || E);
	var k = _._config.usePrefixes ? T.split(" ") : [];
	_._cssomPrefixes = k;
	var O = _.testStyles = l;
	y.addTest("touchevents", function () {
		var i;
		if ("ontouchstart" in t || t.DocumentTouch && e instanceof DocumentTouch) i = !0;
		else {
			var n = ["@media (", x.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
			O(n, function (t) {
				i = 9 === t.offsetTop
			})
		}
		return i
	});
	var D = function (e) {
		var n, r = x.length,
			o = t.CSSRule;
		if (void 0 === o) return i;
		if (!e) return !1;
		if (e = e.replace(/^@/, ""), (n = e.replace(/-/g, "_").toUpperCase() + "_RULE") in o) return "@" + e;
		for (var s = 0; r > s; s++) {
			var a = x[s];
			if (a.toUpperCase() + "_" + n in o) return "@-" + a.toLowerCase() + "-" + e
		}
		return !1
	};
	_.atRule = D;
	var A = {
		elem: r("modernizr")
	};
	y._q.push(function () {
		delete A.elem
	});
	var P = {
		style: A.elem.style
	};
	y._q.unshift(function () {
		delete P.style
	}), _.testProp = function (t, e, n) {
		return p([t], i, e, n)
	}, _.testAllProps = f, _.testAllProps = m, y.addTest("csstransforms", function () {
		return -1 === navigator.userAgent.indexOf("Android 2.") && m("transform", "scale(1)", !0)
	}), y.addTest("csstransforms3d", function () {
		var t = !!m("perspective", "1px", !0),
			e = y._config.usePrefixes;
		if (t && (!e || "webkitPerspective" in b.style)) {
			var i;
			y.supports ? i = "@supports (perspective: 1px)" : (i = "@media (transform-3d)", e && (i += ",(-webkit-transform-3d)")), O("#modernizr{width:0;height:0}" + (i += "{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}"), function (e) {
				t = 7 === e.offsetWidth && 18 === e.offsetHeight
			})
		}
		return t
	});
	var M = _.prefixed = function (t, e, i) {
		return 0 === t.indexOf("@") ? D(t) : (-1 != t.indexOf("-") && (t = s(t)), e ? f(t, e, i) : f(t, "pfx"))
	};
	y.addTest("objectfit", !!M("objectFit"), {
			aliases: ["object-fit"]
		}),
		function () {
			var t, e, i, r, o, s, a;
			for (var l in v)
				if (v.hasOwnProperty(l)) {
					if (t = [], (e = v[l]).name && (t.push(e.name.toLowerCase()), e.options && e.options.aliases && e.options.aliases.length))
						for (i = 0; i < e.options.aliases.length; i++) t.push(e.options.aliases[i].toLowerCase());
					for (r = n(e.fn, "function") ? e.fn() : e.fn, o = 0; o < t.length; o++) s = t[o], a = s.split("."), 1 === a.length ? y[a[0]] = r : (!y[a[0]] || y[a[0]] instanceof Boolean || (y[a[0]] = new Boolean(y[a[0]])), y[a[0]][a[1]] = r), g.push((r ? "" : "no-") + a.join("-"))
				}
		}(),
		function (t) {
			var e = b.className,
				i = y._config.classPrefix || "";
			if (w && (e = e.baseVal), y._config.enableJSClass) {
				var n = new RegExp("(^|\\s)" + i + "no-js(\\s|$)");
				e = e.replace(n, "$1" + i + "js$2")
			}
			y._config.enableClasses && (e += " " + i + t.join(" " + i), w ? b.className.baseVal = e : b.className = e)
		}(g), delete _.addTest, delete _.addAsyncTest;
	for (var I = 0; I < y._q.length; I++) y._q[I]();
	t.Modernizr = y
}(window, document),
function (t, e) {
	"use strict";

	function i() {
		if (!n.READY) {
			n.event.determineEventTypes();
			for (var t in n.gestures) n.gestures.hasOwnProperty(t) && n.detection.register(n.gestures[t]);
			n.event.onTouch(n.DOCUMENT, n.EVENT_MOVE, n.detection.detect), n.event.onTouch(n.DOCUMENT, n.EVENT_END, n.detection.detect), n.READY = !0
		}
	}
	var n = function (t, e) {
		return new n.Instance(t, e || {})
	};
	n.defaults = {
		stop_browser_behavior: {
			userSelect: "none",
			touchAction: "none",
			touchCallout: "none",
			contentZooming: "none",
			userDrag: "none",
			tapHighlightColor: "rgba(0,0,0,0)"
		}
	}, n.HAS_POINTEREVENTS = navigator.pointerEnabled || navigator.msPointerEnabled, n.HAS_TOUCHEVENTS = "ontouchstart" in t, n.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i, n.NO_MOUSEEVENTS = n.HAS_TOUCHEVENTS && navigator.userAgent.match(n.MOBILE_REGEX), n.EVENT_TYPES = {}, n.DIRECTION_DOWN = "down", n.DIRECTION_LEFT = "left", n.DIRECTION_UP = "up", n.DIRECTION_RIGHT = "right", n.POINTER_MOUSE = "mouse", n.POINTER_TOUCH = "touch", n.POINTER_PEN = "pen", n.EVENT_START = "start", n.EVENT_MOVE = "move", n.EVENT_END = "end", n.DOCUMENT = document, n.plugins = {}, n.READY = !1, n.Instance = function (t, e) {
		var r = this;
		return i(), this.element = t, this.enabled = !0, this.options = n.utils.extend(n.utils.extend({}, n.defaults), e || {}), this.options.stop_browser_behavior && n.utils.stopDefaultBrowserBehavior(this.element, this.options.stop_browser_behavior), n.event.onTouch(t, n.EVENT_START, function (t) {
			r.enabled && n.detection.startDetect(r, t)
		}), this
	}, n.Instance.prototype = {
		on: function (t, e) {
			for (var i = t.split(" "), n = 0; i.length > n; n++) this.element.addEventListener(i[n], e, !1);
			return this
		},
		off: function (t, e) {
			for (var i = t.split(" "), n = 0; i.length > n; n++) this.element.removeEventListener(i[n], e, !1);
			return this
		},
		trigger: function (t, e) {
			var i = n.DOCUMENT.createEvent("Event");
			i.initEvent(t, !0, !0), i.gesture = e;
			var r = this.element;
			return n.utils.hasParent(e.target, r) && (r = e.target), r.dispatchEvent(i), this
		},
		enable: function (t) {
			return this.enabled = t, this
		}
	};
	var r = null,
		o = !1,
		s = !1;
	n.event = {
		bindDom: function (t, e, i) {
			for (var n = e.split(" "), r = 0; n.length > r; r++) t.addEventListener(n[r], i, !1)
		},
		onTouch: function (t, e, i) {
			var a = this;
			this.bindDom(t, n.EVENT_TYPES[e], function (l) {
				var u = l.type.toLowerCase();
				if (!u.match(/mouse/) || !s) {
					u.match(/touch/) || u.match(/pointerdown/) || u.match(/mouse/) && 1 === l.which ? o = !0 : u.match(/mouse/) && 1 !== l.which && (o = !1), u.match(/touch|pointer/) && (s = !0);
					var c = 0;
					o && (n.HAS_POINTEREVENTS && e != n.EVENT_END ? c = n.PointerEvent.updatePointer(e, l) : u.match(/touch/) ? c = l.touches.length : s || (c = u.match(/up/) ? 0 : 1), c > 0 && e == n.EVENT_END ? e = n.EVENT_MOVE : c || (e = n.EVENT_END), c || null === r ? r = l : l = r, i.call(n.detection, a.collectEventData(t, e, l)), n.HAS_POINTEREVENTS && e == n.EVENT_END && (c = n.PointerEvent.updatePointer(e, l))), c || (r = null, o = !1, s = !1, n.PointerEvent.reset())
				}
			})
		},
		determineEventTypes: function () {
			var t;
			t = n.HAS_POINTEREVENTS ? n.PointerEvent.getEvents() : n.NO_MOUSEEVENTS ? ["touchstart", "touchmove", "touchend touchcancel"] : ["touchstart mousedown", "touchmove mousemove", "touchend touchcancel mouseup"], n.EVENT_TYPES[n.EVENT_START] = t[0], n.EVENT_TYPES[n.EVENT_MOVE] = t[1], n.EVENT_TYPES[n.EVENT_END] = t[2]
		},
		getTouchList: function (t) {
			return n.HAS_POINTEREVENTS ? n.PointerEvent.getTouchList() : t.touches ? t.touches : [{
				identifier: 1,
				pageX: t.pageX,
				pageY: t.pageY,
				target: t.target
			}]
		},
		collectEventData: function (t, e, i) {
			var r = this.getTouchList(i, e),
				o = n.POINTER_TOUCH;
			return (i.type.match(/mouse/) || n.PointerEvent.matchType(n.POINTER_MOUSE, i)) && (o = n.POINTER_MOUSE), {
				center: n.utils.getCenter(r),
				timeStamp: (new Date).getTime(),
				target: i.target,
				touches: r,
				eventType: e,
				pointerType: o,
				srcEvent: i,
				preventDefault: function () {
					this.srcEvent.preventManipulation && this.srcEvent.preventManipulation(), this.srcEvent.preventDefault && this.srcEvent.preventDefault()
				},
				stopPropagation: function () {
					this.srcEvent.stopPropagation()
				},
				stopDetect: function () {
					return n.detection.stopDetect()
				}
			}
		}
	}, n.PointerEvent = {
		pointers: {},
		getTouchList: function () {
			var t = this,
				e = [];
			return Object.keys(t.pointers).sort().forEach(function (i) {
				e.push(t.pointers[i])
			}), e
		},
		updatePointer: function (t, e) {
			return t == n.EVENT_END ? this.pointers = {} : (e.identifier = e.pointerId, this.pointers[e.pointerId] = e), Object.keys(this.pointers).length
		},
		matchType: function (t, e) {
			if (!e.pointerType) return !1;
			var i = {};
			return i[n.POINTER_MOUSE] = e.pointerType == e.MSPOINTER_TYPE_MOUSE || e.pointerType == n.POINTER_MOUSE, i[n.POINTER_TOUCH] = e.pointerType == e.MSPOINTER_TYPE_TOUCH || e.pointerType == n.POINTER_TOUCH, i[n.POINTER_PEN] = e.pointerType == e.MSPOINTER_TYPE_PEN || e.pointerType == n.POINTER_PEN, i[t]
		},
		getEvents: function () {
			return ["pointerdown MSPointerDown", "pointermove MSPointerMove", "pointerup pointercancel MSPointerUp MSPointerCancel"]
		},
		reset: function () {
			this.pointers = {}
		}
	}, n.utils = {
		extend: function (t, i, n) {
			for (var r in i) t[r] !== e && n || (t[r] = i[r]);
			return t
		},
		hasParent: function (t, e) {
			for (; t;) {
				if (t == e) return !0;
				t = t.parentNode
			}
			return !1
		},
		getCenter: function (t) {
			for (var e = [], i = [], n = 0, r = t.length; r > n; n++) e.push(t[n].pageX), i.push(t[n].pageY);
			return {
				pageX: (Math.min.apply(Math, e) + Math.max.apply(Math, e)) / 2,
				pageY: (Math.min.apply(Math, i) + Math.max.apply(Math, i)) / 2
			}
		},
		getVelocity: function (t, e, i) {
			return {
				x: Math.abs(e / t) || 0,
				y: Math.abs(i / t) || 0
			}
		},
		getAngle: function (t, e) {
			var i = e.pageY - t.pageY,
				n = e.pageX - t.pageX;
			return 180 * Math.atan2(i, n) / Math.PI
		},
		getDirection: function (t, e) {
			return Math.abs(t.pageX - e.pageX) >= Math.abs(t.pageY - e.pageY) ? t.pageX - e.pageX > 0 ? n.DIRECTION_LEFT : n.DIRECTION_RIGHT : t.pageY - e.pageY > 0 ? n.DIRECTION_UP : n.DIRECTION_DOWN
		},
		getDistance: function (t, e) {
			var i = e.pageX - t.pageX,
				n = e.pageY - t.pageY;
			return Math.sqrt(i * i + n * n)
		},
		getScale: function (t, e) {
			return t.length >= 2 && e.length >= 2 ? this.getDistance(e[0], e[1]) / this.getDistance(t[0], t[1]) : 1
		},
		getRotation: function (t, e) {
			return t.length >= 2 && e.length >= 2 ? this.getAngle(e[1], e[0]) - this.getAngle(t[1], t[0]) : 0
		},
		isVertical: function (t) {
			return t == n.DIRECTION_UP || t == n.DIRECTION_DOWN
		},
		stopDefaultBrowserBehavior: function (t, e) {
			var i, n = ["webkit", "khtml", "moz", "ms", "o", ""];
			if (e && t.style) {
				for (var r = 0; n.length > r; r++)
					for (var o in e) e.hasOwnProperty(o) && (i = o, n[r] && (i = n[r] + i.substring(0, 1).toUpperCase() + i.substring(1)), t.style[i] = e[o]);
				"none" == e.userSelect && (t.onselectstart = function () {
					return !1
				})
			}
		}
	}, n.detection = {
		gestures: [],
		current: null,
		previous: null,
		stopped: !1,
		startDetect: function (t, e) {
			this.current || (this.stopped = !1, this.current = {
				inst: t,
				startEvent: n.utils.extend({}, e),
				lastEvent: !1,
				name: ""
			}, this.detect(e))
		},
		detect: function (t) {
			if (this.current && !this.stopped) {
				t = this.extendEventData(t);
				for (var e = this.current.inst.options, i = 0, r = this.gestures.length; r > i; i++) {
					var o = this.gestures[i];
					if (!this.stopped && !1 !== e[o.name] && !1 === o.handler.call(o, t, this.current.inst)) {
						this.stopDetect();
						break
					}
				}
				return this.current && (this.current.lastEvent = t), t.eventType == n.EVENT_END && !t.touches.length - 1 && this.stopDetect(), t
			}
		},
		stopDetect: function () {
			this.previous = n.utils.extend({}, this.current), this.current = null, this.stopped = !0
		},
		extendEventData: function (t) {
			var e = this.current.startEvent;
			if (e && (t.touches.length != e.touches.length || t.touches === e.touches)) {
				e.touches = [];
				for (var i = 0, r = t.touches.length; r > i; i++) e.touches.push(n.utils.extend({}, t.touches[i]))
			}
			var o = t.timeStamp - e.timeStamp,
				s = t.center.pageX - e.center.pageX,
				a = t.center.pageY - e.center.pageY,
				l = n.utils.getVelocity(o, s, a);
			return n.utils.extend(t, {
				deltaTime: o,
				deltaX: s,
				deltaY: a,
				velocityX: l.x,
				velocityY: l.y,
				distance: n.utils.getDistance(e.center, t.center),
				angle: n.utils.getAngle(e.center, t.center),
				direction: n.utils.getDirection(e.center, t.center),
				scale: n.utils.getScale(e.touches, t.touches),
				rotation: n.utils.getRotation(e.touches, t.touches),
				startEvent: e
			}), t
		},
		register: function (t) {
			var i = t.defaults || {};
			return i[t.name] === e && (i[t.name] = !0), n.utils.extend(n.defaults, i, !0), t.index = t.index || 1e3, this.gestures.push(t), this.gestures.sort(function (t, e) {
				return t.index < e.index ? -1 : t.index > e.index ? 1 : 0
			}), this.gestures
		}
	}, n.gestures = n.gestures || {}, n.gestures.Hold = {
		name: "hold",
		index: 10,
		defaults: {
			hold_timeout: 500,
			hold_threshold: 1
		},
		timer: null,
		handler: function (t, e) {
			switch (t.eventType) {
				case n.EVENT_START:
					clearTimeout(this.timer), n.detection.current.name = this.name, this.timer = setTimeout(function () {
						"hold" == n.detection.current.name && e.trigger("hold", t)
					}, e.options.hold_timeout);
					break;
				case n.EVENT_MOVE:
					t.distance > e.options.hold_threshold && clearTimeout(this.timer);
					break;
				case n.EVENT_END:
					clearTimeout(this.timer)
			}
		}
	}, n.gestures.Tap = {
		name: "tap",
		index: 100,
		defaults: {
			tap_max_touchtime: 250,
			tap_max_distance: 10,
			tap_always: !0,
			doubletap_distance: 20,
			doubletap_interval: 300
		},
		handler: function (t, e) {
			if (t.eventType == n.EVENT_END) {
				var i = n.detection.previous,
					r = !1;
				if (t.deltaTime > e.options.tap_max_touchtime || t.distance > e.options.tap_max_distance) return;
				i && "tap" == i.name && t.timeStamp - i.lastEvent.timeStamp < e.options.doubletap_interval && t.distance < e.options.doubletap_distance && (e.trigger("doubletap", t), r = !0), (!r || e.options.tap_always) && (n.detection.current.name = "tap", e.trigger(n.detection.current.name, t))
			}
		}
	}, n.gestures.Swipe = {
		name: "swipe",
		index: 40,
		defaults: {
			swipe_max_touches: 1,
			swipe_velocity: .7
		},
		handler: function (t, e) {
			if (t.eventType == n.EVENT_END) {
				if (e.options.swipe_max_touches > 0 && t.touches.length > e.options.swipe_max_touches) return;
				(t.velocityX > e.options.swipe_velocity || t.velocityY > e.options.swipe_velocity) && (e.trigger(this.name, t), e.trigger(this.name + t.direction, t))
			}
		}
	}, n.gestures.Drag = {
		name: "drag",
		index: 50,
		defaults: {
			drag_min_distance: 10,
			drag_max_touches: 1,
			drag_block_horizontal: !1,
			drag_block_vertical: !1,
			drag_lock_to_axis: !1,
			drag_lock_min_distance: 25
		},
		triggered: !1,
		handler: function (t, i) {
			if (n.detection.current.name != this.name && this.triggered) return i.trigger(this.name + "end", t), this.triggered = !1, e;
			if (!(i.options.drag_max_touches > 0 && t.touches.length > i.options.drag_max_touches)) switch (t.eventType) {
				case n.EVENT_START:
					this.triggered = !1;
					break;
				case n.EVENT_MOVE:
					if (t.distance < i.options.drag_min_distance && n.detection.current.name != this.name) return;
					n.detection.current.name = this.name, (n.detection.current.lastEvent.drag_locked_to_axis || i.options.drag_lock_to_axis && i.options.drag_lock_min_distance <= t.distance) && (t.drag_locked_to_axis = !0);
					var r = n.detection.current.lastEvent.direction;
					t.drag_locked_to_axis && r !== t.direction && (t.direction = n.utils.isVertical(r) ? 0 > t.deltaY ? n.DIRECTION_UP : n.DIRECTION_DOWN : 0 > t.deltaX ? n.DIRECTION_LEFT : n.DIRECTION_RIGHT), this.triggered || (i.trigger(this.name + "start", t), this.triggered = !0), i.trigger(this.name, t), i.trigger(this.name + t.direction, t), (i.options.drag_block_vertical && n.utils.isVertical(t.direction) || i.options.drag_block_horizontal && !n.utils.isVertical(t.direction)) && t.preventDefault();
					break;
				case n.EVENT_END:
					this.triggered && i.trigger(this.name + "end", t), this.triggered = !1
			}
		}
	}, n.gestures.Transform = {
		name: "transform",
		index: 45,
		defaults: {
			transform_min_scale: .01,
			transform_min_rotation: 1,
			transform_always_block: !1
		},
		triggered: !1,
		handler: function (t, i) {
			if (n.detection.current.name != this.name && this.triggered) return i.trigger(this.name + "end", t), this.triggered = !1, e;
			if (!(2 > t.touches.length)) switch (i.options.transform_always_block && t.preventDefault(), t.eventType) {
				case n.EVENT_START:
					this.triggered = !1;
					break;
				case n.EVENT_MOVE:
					var r = Math.abs(1 - t.scale),
						o = Math.abs(t.rotation);
					if (i.options.transform_min_scale > r && i.options.transform_min_rotation > o) return;
					n.detection.current.name = this.name, this.triggered || (i.trigger(this.name + "start", t), this.triggered = !0), i.trigger(this.name, t), o > i.options.transform_min_rotation && i.trigger("rotate", t), r > i.options.transform_min_scale && (i.trigger("pinch", t), i.trigger("pinch" + (1 > t.scale ? "in" : "out"), t));
					break;
				case n.EVENT_END:
					this.triggered && i.trigger(this.name + "end", t), this.triggered = !1
			}
		}
	}, n.gestures.Touch = {
		name: "touch",
		index: -1 / 0,
		defaults: {
			prevent_default: !1,
			prevent_mouseevents: !1
		},
		handler: function (t, i) {
			return i.options.prevent_mouseevents && t.pointerType == n.POINTER_MOUSE ? (t.stopDetect(), e) : (i.options.prevent_default && t.preventDefault(), t.eventType == n.EVENT_START && i.trigger(this.name, t), e)
		}
	}, n.gestures.Release = {
		name: "release",
		index: 1 / 0,
		handler: function (t, e) {
			t.eventType == n.EVENT_END && e.trigger(this.name, t)
		}
	}, "object" == typeof module && "object" == typeof module.exports ? module.exports = n : (t.Hammer = n, "function" == typeof t.define && t.define.amd && t.define("hammer", [], function () {
		return n
	}))
}(this),
function (t, e) {
	"use strict";
	t !== e && (Hammer.event.bindDom = function (i, n, r) {
		t(i).on(n, function (t) {
			var i = t.originalEvent || t;
			i.pageX === e && (i.pageX = t.pageX, i.pageY = t.pageY), i.target || (i.target = t.target), i.which === e && (i.which = i.button), i.preventDefault || (i.preventDefault = t.preventDefault), i.stopPropagation || (i.stopPropagation = t.stopPropagation), r.call(this, i)
		})
	}, Hammer.Instance.prototype.on = function (e, i) {
		return t(this.element).on(e, i)
	}, Hammer.Instance.prototype.off = function (e, i) {
		return t(this.element).off(e, i)
	}, Hammer.Instance.prototype.trigger = function (e, i) {
		var n = t(this.element);
		return n.has(i.target).length && (n = t(i.target)), n.trigger({
			type: e,
			gesture: i
		})
	}, t.fn.hammer = function (e) {
		return this.each(function () {
			var i = t(this),
				n = i.data("hammer");
			n ? n && e && Hammer.utils.extend(n.options, e) : i.data("hammer", new Hammer(this, e || {}))
		})
	})
}(window.jQuery || window.Zepto),
function (t) {
	"function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t : t(jQuery)
}(function (t) {
	function e(e) {
		var o = e || window.event,
			s = a.call(arguments, 1),
			l = 0,
			c = 0,
			h = 0,
			d = 0;
		if (e = t.event.fix(o), e.type = "mousewheel", "detail" in o && (h = -1 * o.detail), "wheelDelta" in o && (h = o.wheelDelta), "wheelDeltaY" in o && (h = o.wheelDeltaY), "wheelDeltaX" in o && (c = -1 * o.wheelDeltaX), "axis" in o && o.axis === o.HORIZONTAL_AXIS && (c = -1 * h, h = 0), l = 0 === h ? c : h, "deltaY" in o && (l = h = -1 * o.deltaY), "deltaX" in o && (c = o.deltaX, 0 === h && (l = -1 * c)), 0 !== h || 0 !== c) return 1 === o.deltaMode ? (d = t.data(this, "mousewheel-line-height"), l *= d, h *= d, c *= d) : 2 === o.deltaMode && (d = t.data(this, "mousewheel-page-height"), l *= d, h *= d, c *= d), d = Math.max(Math.abs(h), Math.abs(c)), (!r || d < r) && (r = d, u.settings.adjustOldDeltas && "mousewheel" === o.type && 0 == d % 120 && (r /= 40)), u.settings.adjustOldDeltas && "mousewheel" === o.type && 0 == d % 120 && (l /= 40, c /= 40, h /= 40), l = Math[1 <= l ? "floor" : "ceil"](l / r), c = Math[1 <= c ? "floor" : "ceil"](c / r), h = Math[1 <= h ? "floor" : "ceil"](h / r), e.deltaX = c, e.deltaY = h, e.deltaFactor = r, e.deltaMode = 0, s.unshift(e, l, c, h), n && clearTimeout(n), n = setTimeout(i, 200), (t.event.dispatch || t.event.handle).apply(this, s)
	}

	function i() {
		r = null
	}
	var n, r, o = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
		s = "onwheel" in document || 9 <= document.documentMode ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
		a = Array.prototype.slice;
	if (t.event.fixHooks)
		for (var l = o.length; l;) t.event.fixHooks[o[--l]] = t.event.mouseHooks;
	var u = t.event.special.mousewheel = {
		version: "3.1.9",
		setup: function () {
			if (this.addEventListener)
				for (var i = s.length; i;) this.addEventListener(s[--i], e, !1);
			else this.onmousewheel = e;
			t.data(this, "mousewheel-line-height", u.getLineHeight(this)), t.data(this, "mousewheel-page-height", u.getPageHeight(this))
		},
		teardown: function () {
			if (this.removeEventListener)
				for (var t = s.length; t;) this.removeEventListener(s[--t], e, !1);
			else this.onmousewheel = null
		},
		getLineHeight: function (e) {
			return parseInt(t(e)["offsetParent" in t.fn ? "offsetParent" : "parent"]().css("fontSize"), 10)
		},
		getPageHeight: function (e) {
			return t(e).height()
		},
		settings: {
			adjustOldDeltas: !0
		}
	};
	t.fn.extend({
		mousewheel: function (t) {
			return t ? this.bind("mousewheel", t) : this.trigger("mousewheel")
		},
		unmousewheel: function (t) {
			return this.unbind("mousewheel", t)
		}
	})
}), (window._gsQueue || (window._gsQueue = [])).push(function () {
		"use strict";
		window._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (t, e, i) {
				var n = [].slice,
					r = function (t, e, n) {
						i.call(this, t, e, n), this._cycle = 0, this._yoyo = !0 === this.vars.yoyo, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = r.prototype.render
					},
					o = 1e-10,
					s = i._internals.isSelector,
					a = i._internals.isArray,
					l = r.prototype = i.to({}, .1, {}),
					u = [];
				r.version = "1.11.2", l.constructor = r, l.kill()._gc = !1, r.killTweensOf = r.killDelayedCallsTo = i.killTweensOf, r.getTweensOf = i.getTweensOf, r.ticker = i.ticker, l.invalidate = function () {
					return this._yoyo = !0 === this.vars.yoyo, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), i.prototype.invalidate.call(this)
				}, l.updateTo = function (t, e) {
					var n, r = this.ratio;
					e && this.timeline && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
					for (n in t) this.vars[n] = t[n];
					if (this._initted)
						if (e) this._initted = !1;
						else if (this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
						var o = this._time;
						this.render(0, !0, !1), this._initted = !1, this.render(o, !0, !1)
					} else if (this._time > 0) {
						this._initted = !1, this._init();
						for (var s, a = 1 / (1 - r), l = this._firstPT; l;) s = l.s + l.c, l.c *= a, l.s = s - l.c, l = l._next
					}
					return this
				}, l.render = function (t, e, i) {
					this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
					var n, r, s, a, l, c, h, d, p = this._dirty ? this.totalDuration() : this._totalDuration,
						f = this._time,
						m = this._totalTime,
						g = this._cycle,
						v = this._duration;
					if (t >= p ? (this._totalTime = p, this._cycle = this._repeat, this._yoyo && 0 != (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = v, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (n = !0, r = "onComplete"), 0 === v && (d = this._rawPrevTime, (0 === t || 0 > d || d === o) && d !== t && (i = !0, d > o && (r = "onReverseComplete")), this._rawPrevTime = d = !e || t ? t : o)) : 1e-7 > t ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== m || 0 === v && this._rawPrevTime > o) && (r = "onReverseComplete", n = this._reversed), 0 > t ? (this._active = !1, 0 === v && (this._rawPrevTime >= 0 && (i = !0), this._rawPrevTime = d = !e || t ? t : o)) : this._initted || (i = !0)) : (this._totalTime = this._time = t, 0 !== this._repeat && (a = v + this._repeatDelay, this._cycle = this._totalTime / a >> 0, 0 !== this._cycle && this._cycle === this._totalTime / a && this._cycle--, this._time = this._totalTime - this._cycle * a, this._yoyo && 0 != (1 & this._cycle) && (this._time = v - this._time), this._time > v ? this._time = v : 0 > this._time && (this._time = 0)), this._easeType ? (l = this._time / v, c = this._easeType, h = this._easePower, (1 === c || 3 === c && l >= .5) && (l = 1 - l), 3 === c && (l *= 2), 1 === h ? l *= l : 2 === h ? l *= l * l : 3 === h ? l *= l * l * l : 4 === h && (l *= l * l * l * l), this.ratio = 1 === c ? 1 - l : 2 === c ? l : .5 > this._time / v ? l / 2 : 1 - l / 2) : this.ratio = this._ease.getRatio(this._time / v)), f !== this._time || i || g !== this._cycle) {
						if (!this._initted) {
							if (this._init(), !this._initted || this._gc) return;
							this._time && !n ? this.ratio = this._ease.getRatio(this._time / v) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
						}
						for (this._active || !this._paused && this._time !== f && t >= 0 && (this._active = !0), 0 === m && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === v) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || u))), s = this._firstPT; s;) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s, s = s._next;
						this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, i), e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || u)), this._cycle !== g && (e || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || u)), r && (this._gc || (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this.vars[r].apply(this.vars[r + "Scope"] || this, this.vars[r + "Params"] || u), 0 === v && this._rawPrevTime === o && d !== o && (this._rawPrevTime = 0)))
					} else m !== this._totalTime && this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || u))
				}, r.to = function (t, e, i) {
					return new r(t, e, i)
				}, r.from = function (t, e, i) {
					return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new r(t, e, i)
				}, r.fromTo = function (t, e, i, n) {
					return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new r(t, e, n)
				}, r.staggerTo = r.allTo = function (t, e, o, l, c, h, d) {
					l = l || 0;
					var p, f, m, g, v = o.delay || 0,
						_ = [],
						y = function () {
							o.onComplete && o.onComplete.apply(o.onCompleteScope || this, arguments), c.apply(d || this, h || u)
						};
					for (a(t) || ("string" == typeof t && (t = i.selector(t) || t), s(t) && (t = n.call(t, 0))), p = t.length, m = 0; p > m; m++) {
						f = {};
						for (g in o) f[g] = o[g];
						f.delay = v, m === p - 1 && c && (f.onComplete = y), _[m] = new r(t[m], e, f), v += l
					}
					return _
				}, r.staggerFrom = r.allFrom = function (t, e, i, n, o, s, a) {
					return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, r.staggerTo(t, e, i, n, o, s, a)
				}, r.staggerFromTo = r.allFromTo = function (t, e, i, n, o, s, a, l) {
					return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, r.staggerTo(t, e, n, o, s, a, l)
				}, r.delayedCall = function (t, e, i, n, o) {
					return new r(e, 0, {
						delay: t,
						onComplete: e,
						onCompleteParams: i,
						onCompleteScope: n,
						onReverseComplete: e,
						onReverseCompleteParams: i,
						onReverseCompleteScope: n,
						immediateRender: !1,
						useFrames: o,
						overwrite: 0
					})
				}, r.set = function (t, e) {
					return new r(t, 0, e)
				}, r.isTweening = function (t) {
					return i.getTweensOf(t, !0).length > 0
				};
				var c = function (t, e) {
						for (var n = [], r = 0, o = t._first; o;) o instanceof i ? n[r++] = o : (e && (n[r++] = o), n = n.concat(c(o, e)), r = n.length), o = o._next;
						return n
					},
					h = r.getAllTweens = function (e) {
						return c(t._rootTimeline, e).concat(c(t._rootFramesTimeline, e))
					};
				r.killAll = function (t, i, n, r) {
					null == i && (i = !0), null == n && (n = !0);
					var o, s, a, l = h(0 != r),
						u = l.length,
						c = i && n && r;
					for (a = 0; u > a; a++) s = l[a], (c || s instanceof e || (o = s.target === s.vars.onComplete) && n || i && !o) && (t ? s.totalTime(s.totalDuration()) : s._enabled(!1, !1))
				}, r.killChildTweensOf = function (t, e) {
					if (null != t) {
						var o, l, u, c, h, d = i._tweenLookup;
						if ("string" == typeof t && (t = i.selector(t) || t), s(t) && (t = n(t, 0)), a(t))
							for (c = t.length; --c > -1;) r.killChildTweensOf(t[c], e);
						else {
							o = [];
							for (u in d)
								for (l = d[u].target.parentNode; l;) l === t && (o = o.concat(d[u].tweens)), l = l.parentNode;
							for (h = o.length, c = 0; h > c; c++) e && o[c].totalTime(o[c].totalDuration()), o[c]._enabled(!1, !1)
						}
					}
				};
				var d = function (t, i, n, r) {
					i = !1 !== i, n = !1 !== n;
					for (var o, s, a = h(r = !1 !== r), l = i && n && r, u = a.length; --u > -1;) s = a[u], (l || s instanceof e || (o = s.target === s.vars.onComplete) && n || i && !o) && s.paused(t)
				};
				return r.pauseAll = function (t, e, i) {
					d(!0, t, e, i)
				}, r.resumeAll = function (t, e, i) {
					d(!1, t, e, i)
				}, r.globalTimeScale = function (e) {
					var n = t._rootTimeline,
						r = i.ticker.time;
					return arguments.length ? (e = e || o, n._startTime = r - (r - n._startTime) * n._timeScale / e, n = t._rootFramesTimeline, r = i.ticker.frame, n._startTime = r - (r - n._startTime) * n._timeScale / e, n._timeScale = t._rootTimeline._timeScale = e, e) : n._timeScale
				}, l.progress = function (t) {
					return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
				}, l.totalProgress = function (t) {
					return arguments.length ? this.totalTime(this.totalDuration() * t, !1) : this._totalTime / this.totalDuration()
				}, l.time = function (t, e) {
					return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 != (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
				}, l.duration = function (e) {
					return arguments.length ? t.prototype.duration.call(this, e) : this._duration
				}, l.totalDuration = function (t) {
					return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
				}, l.repeat = function (t) {
					return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
				}, l.repeatDelay = function (t) {
					return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
				}, l.yoyo = function (t) {
					return arguments.length ? (this._yoyo = t, this) : this._yoyo
				}, r
			}, !0), window._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (t, e, i) {
				var n = function (t) {
						e.call(this, t), this._labels = {}, this.autoRemoveChildren = !0 === this.vars.autoRemoveChildren, this.smoothChildTiming = !0 === this.vars.smoothChildTiming, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
						var i, n, r = this.vars;
						for (n in r) i = r[n], s(i) && -1 !== i.join("").indexOf("{self}") && (r[n] = this._swapSelfInParams(i));
						s(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
					},
					r = 1e-10,
					o = i._internals.isSelector,
					s = i._internals.isArray,
					a = [],
					l = function (t) {
						var e, i = {};
						for (e in t) i[e] = t[e];
						return i
					},
					u = function (t, e, i, n) {
						t._timeline.pause(t._startTime), e && e.apply(n || t._timeline, i || a)
					},
					c = a.slice,
					h = n.prototype = new e;
				return n.version = "1.11.0", h.constructor = n, h.kill()._gc = !1, h.to = function (t, e, n, r) {
					return e ? this.add(new i(t, e, n), r) : this.set(t, n, r)
				}, h.from = function (t, e, n, r) {
					return this.add(i.from(t, e, n), r)
				}, h.fromTo = function (t, e, n, r, o) {
					return e ? this.add(i.fromTo(t, e, n, r), o) : this.set(t, r, o)
				}, h.staggerTo = function (t, e, r, s, a, u, h, d) {
					var p, f = new n({
						onComplete: u,
						onCompleteParams: h,
						onCompleteScope: d
					});
					for ("string" == typeof t && (t = i.selector(t) || t), o(t) && (t = c.call(t, 0)), s = s || 0, p = 0; t.length > p; p++) r.startAt && (r.startAt = l(r.startAt)), f.to(t[p], e, l(r), p * s);
					return this.add(f, a)
				}, h.staggerFrom = function (t, e, i, n, r, o, s, a) {
					return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, n, r, o, s, a)
				}, h.staggerFromTo = function (t, e, i, n, r, o, s, a, l) {
					return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, n, r, o, s, a, l)
				}, h.call = function (t, e, n, r) {
					return this.add(i.delayedCall(0, t, e, n), r)
				}, h.set = function (t, e, n) {
					return n = this._parseTimeOrLabel(n, 0, !0), null == e.immediateRender && (e.immediateRender = n === this._time && !this._paused), this.add(new i(t, 0, e), n)
				}, n.exportRoot = function (t, e) {
					null == (t = t || {}).smoothChildTiming && (t.smoothChildTiming = !0);
					var r, o, s = new n(t),
						a = s._timeline;
					for (null == e && (e = !0), a._remove(s, !0), s._startTime = 0, s._rawPrevTime = s._time = s._totalTime = a._time, r = a._first; r;) o = r._next, e && r instanceof i && r.target === r.vars.onComplete || s.add(r, r._startTime - r._delay), r = o;
					return a.add(s, 0), s
				}, h.add = function (r, o, a, l) {
					var u, c, h, d, p, f;
					if ("number" != typeof o && (o = this._parseTimeOrLabel(o, 0, !0, r)), !(r instanceof t)) {
						if (r instanceof Array || r && r.push && s(r)) {
							for (a = a || "normal", l = l || 0, u = o, c = r.length, h = 0; c > h; h++) s(d = r[h]) && (d = new n({
								tweens: d
							})), this.add(d, u), "string" != typeof d && "function" != typeof d && ("sequence" === a ? u = d._startTime + d.totalDuration() / d._timeScale : "start" === a && (d._startTime -= d.delay())), u += l;
							return this._uncache(!0)
						}
						if ("string" == typeof r) return this.addLabel(r, o);
						if ("function" != typeof r) throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
						r = i.delayedCall(0, r)
					}
					if (e.prototype.add.call(this, r, o), this._gc && !this._paused && this._duration < this.duration())
						for (p = this, f = p.rawTime() > r._startTime; p._gc && p._timeline;) p._timeline.smoothChildTiming && f ? p.totalTime(p._totalTime, !0) : p._enabled(!0, !1), p = p._timeline;
					return this
				}, h.remove = function (e) {
					if (e instanceof t) return this._remove(e, !1);
					if (e instanceof Array || e && e.push && s(e)) {
						for (var i = e.length; --i > -1;) this.remove(e[i]);
						return this
					}
					return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
				}, h._remove = function (t, i) {
					e.prototype._remove.call(this, t, i);
					var n = this._last;
					return n ? this._time > n._startTime + n._totalDuration / n._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = 0, this
				}, h.append = function (t, e) {
					return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
				}, h.insert = h.insertMultiple = function (t, e, i, n) {
					return this.add(t, e || 0, i, n)
				}, h.appendMultiple = function (t, e, i, n) {
					return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, n)
				}, h.addLabel = function (t, e) {
					return this._labels[t] = this._parseTimeOrLabel(e), this
				}, h.addPause = function (t, e, i, n) {
					return this.call(u, ["{self}", e, i, n], this, t)
				}, h.removeLabel = function (t) {
					return delete this._labels[t], this
				}, h.getLabelTime = function (t) {
					return null != this._labels[t] ? this._labels[t] : -1
				}, h._parseTimeOrLabel = function (e, i, n, r) {
					var o;
					if (r instanceof t && r.timeline === this) this.remove(r);
					else if (r && (r instanceof Array || r.push && s(r)))
						for (o = r.length; --o > -1;) r[o] instanceof t && r[o].timeline === this && this.remove(r[o]);
					if ("string" == typeof i) return this._parseTimeOrLabel(i, n && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0, n);
					if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e]) null == e && (e = this.duration());
					else {
						if (-1 === (o = e.indexOf("="))) return null == this._labels[e] ? n ? this._labels[e] = this.duration() + i : i : this._labels[e] + i;
						i = parseInt(e.charAt(o - 1) + "1", 10) * Number(e.substr(o + 1)), e = o > 1 ? this._parseTimeOrLabel(e.substr(0, o - 1), 0, n) : this.duration()
					}
					return Number(e) + i
				}, h.seek = function (t, e) {
					return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), !1 !== e)
				}, h.stop = function () {
					return this.paused(!0)
				}, h.gotoAndPlay = function (t, e) {
					return this.play(t, e)
				}, h.gotoAndStop = function (t, e) {
					return this.pause(t, e)
				}, h.render = function (t, e, i) {
					this._gc && this._enabled(!0, !1);
					var n, o, s, l, u, c = this._dirty ? this.totalDuration() : this._totalDuration,
						h = this._time,
						d = this._startTime,
						p = this._timeScale,
						f = this._paused;
					if (t >= c ? (this._totalTime = this._time = c, this._reversed || this._hasPausedChild() || (o = !0, l = "onComplete", 0 === this._duration && (0 === t || 0 > this._rawPrevTime || this._rawPrevTime === r) && this._rawPrevTime !== t && this._first && (u = !0, this._rawPrevTime > r && (l = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t ? t : r, t = c + 1e-6) : 1e-7 > t ? (this._totalTime = this._time = 0, (0 !== h || 0 === this._duration && (this._rawPrevTime > r || 0 > t && this._rawPrevTime >= 0)) && (l = "onReverseComplete", o = this._reversed), 0 > t ? (this._active = !1, 0 === this._duration && this._rawPrevTime >= 0 && this._first && (u = !0), this._rawPrevTime = t) : (this._rawPrevTime = this._duration || !e || t ? t : r, t = 0, this._initted || (u = !0))) : this._totalTime = this._time = this._rawPrevTime = t, this._time !== h && this._first || i || u) {
						if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== h && t > 0 && (this._active = !0), 0 === h && this.vars.onStart && 0 !== this._time && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || a)), this._time >= h)
							for (n = this._first; n && (s = n._next, !this._paused || f);)(n._active || n._startTime <= this._time && !n._paused && !n._gc) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = s;
						else
							for (n = this._last; n && (s = n._prev, !this._paused || f);)(n._active || h >= n._startTime && !n._paused && !n._gc) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = s;
						this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || a)), l && (this._gc || (d === this._startTime || p !== this._timeScale) && (0 === this._time || c >= this.totalDuration()) && (o && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[l] && this.vars[l].apply(this.vars[l + "Scope"] || this, this.vars[l + "Params"] || a)))
					}
				}, h._hasPausedChild = function () {
					for (var t = this._first; t;) {
						if (t._paused || t instanceof n && t._hasPausedChild()) return !0;
						t = t._next
					}
					return !1
				}, h.getChildren = function (t, e, n, r) {
					r = r || -9999999999;
					for (var o = [], s = this._first, a = 0; s;) r > s._startTime || (s instanceof i ? !1 !== e && (o[a++] = s) : (!1 !== n && (o[a++] = s), !1 !== t && (o = o.concat(s.getChildren(!0, e, n)), a = o.length))), s = s._next;
					return o
				}, h.getTweensOf = function (t, e) {
					for (var n = i.getTweensOf(t), r = n.length, o = [], s = 0; --r > -1;)(n[r].timeline === this || e && this._contains(n[r])) && (o[s++] = n[r]);
					return o
				}, h._contains = function (t) {
					for (var e = t.timeline; e;) {
						if (e === this) return !0;
						e = e.timeline
					}
					return !1
				}, h.shiftChildren = function (t, e, i) {
					i = i || 0;
					for (var n, r = this._first, o = this._labels; r;) r._startTime >= i && (r._startTime += t), r = r._next;
					if (e)
						for (n in o) o[n] >= i && (o[n] += t);
					return this._uncache(!0)
				}, h._kill = function (t, e) {
					if (!t && !e) return this._enabled(!1, !1);
					for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), n = i.length, r = !1; --n > -1;) i[n]._kill(t, e) && (r = !0);
					return r
				}, h.clear = function (t) {
					var e = this.getChildren(!1, !0, !0),
						i = e.length;
					for (this._time = this._totalTime = 0; --i > -1;) e[i]._enabled(!1, !1);
					return !1 !== t && (this._labels = {}), this._uncache(!0)
				}, h.invalidate = function () {
					for (var t = this._first; t;) t.invalidate(), t = t._next;
					return this
				}, h._enabled = function (t, i) {
					if (t === this._gc)
						for (var n = this._first; n;) n._enabled(t, !0), n = n._next;
					return e.prototype._enabled.call(this, t, i)
				}, h.duration = function (t) {
					return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
				}, h.totalDuration = function (t) {
					if (!arguments.length) {
						if (this._dirty) {
							for (var e, i, n = 0, r = this._last, o = 999999999999; r;) e = r._prev, r._dirty && r.totalDuration(), r._startTime > o && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : o = r._startTime, 0 > r._startTime && !r._paused && (n -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), o = 0), (i = r._startTime + r._totalDuration / r._timeScale) > n && (n = i), r = e;
							this._duration = this._totalDuration = n, this._dirty = !1
						}
						return this._totalDuration
					}
					return 0 !== this.totalDuration() && 0 !== t && this.timeScale(this._totalDuration / t), this
				}, h.usesFrames = function () {
					for (var e = this._timeline; e._timeline;) e = e._timeline;
					return e === t._rootFramesTimeline
				}, h.rawTime = function () {
					return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
				}, n
			}, !0), window._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function (t, e, i) {
				var n = function (e) {
						t.call(this, e), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = !0 === this.vars.yoyo, this._dirty = !0
					},
					r = 1e-10,
					o = [],
					s = new i(null, null, 1, 0),
					a = n.prototype = new t;
				return a.constructor = n, a.kill()._gc = !1, n.version = "1.11.0", a.invalidate = function () {
					return this._yoyo = !0 === this.vars.yoyo, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), t.prototype.invalidate.call(this)
				}, a.addCallback = function (t, i, n, r) {
					return this.add(e.delayedCall(0, t, n, r), i)
				}, a.removeCallback = function (t, e) {
					if (t)
						if (null == e) this._kill(null, t);
						else
							for (var i = this.getTweensOf(t, !1), n = i.length, r = this._parseTimeOrLabel(e); --n > -1;) i[n]._startTime === r && i[n]._enabled(!1, !1);
					return this
				}, a.tweenTo = function (t, i) {
					i = i || {};
					var n, r, a = {
						ease: s,
						overwrite: 2,
						useFrames: this.usesFrames(),
						immediateRender: !1
					};
					for (n in i) a[n] = i[n];
					return a.time = this._parseTimeOrLabel(t), r = new e(this, Math.abs(Number(a.time) - this._time) / this._timeScale || .001, a), a.onStart = function () {
						r.target.paused(!0), r.vars.time !== r.target.time() && r.duration(Math.abs(r.vars.time - r.target.time()) / r.target._timeScale), i.onStart && i.onStart.apply(i.onStartScope || r, i.onStartParams || o)
					}, r
				}, a.tweenFromTo = function (t, e, i) {
					i = i || {}, t = this._parseTimeOrLabel(t), i.startAt = {
						onComplete: this.seek,
						onCompleteParams: [t],
						onCompleteScope: this
					}, i.immediateRender = !1 !== i.immediateRender;
					var n = this.tweenTo(e, i);
					return n.duration(Math.abs(n.vars.time - t) / this._timeScale || .001)
				}, a.render = function (t, e, i) {
					this._gc && this._enabled(!0, !1);
					var n, s, a, l, u, c, h = this._dirty ? this.totalDuration() : this._totalDuration,
						d = this._duration,
						p = this._time,
						f = this._totalTime,
						m = this._startTime,
						g = this._timeScale,
						v = this._rawPrevTime,
						_ = this._paused,
						y = this._cycle;
					if (t >= h ? (this._locked || (this._totalTime = h, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (s = !0, l = "onComplete", 0 === this._duration && (0 === t || 0 > v || v === r) && v !== t && this._first && (u = !0, v > r && (l = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t ? t : r, this._yoyo && 0 != (1 & this._cycle) ? this._time = t = 0 : (this._time = d, t = d + 1e-6)) : 1e-7 > t ? (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== p || 0 === d && (v > r || 0 > t && v >= 0) && !this._locked) && (l = "onReverseComplete", s = this._reversed), 0 > t ? (this._active = !1, 0 === d && v >= 0 && this._first && (u = !0), this._rawPrevTime = t) : (this._rawPrevTime = d || !e || t ? t : r, t = 0, this._initted || (u = !0))) : (0 === d && 0 > v && (u = !0), this._time = this._rawPrevTime = t, this._locked || (this._totalTime = t, 0 !== this._repeat && (c = d + this._repeatDelay, this._cycle = this._totalTime / c >> 0, 0 !== this._cycle && this._cycle === this._totalTime / c && this._cycle--, this._time = this._totalTime - this._cycle * c, this._yoyo && 0 != (1 & this._cycle) && (this._time = d - this._time), this._time > d ? (this._time = d, t = d + 1e-6) : 0 > this._time ? this._time = t = 0 : t = this._time))), this._cycle !== y && !this._locked) {
						var x = this._yoyo && 0 != (1 & y),
							b = x === (this._yoyo && 0 != (1 & this._cycle)),
							w = this._totalTime,
							T = this._cycle,
							C = this._rawPrevTime,
							S = this._time;
						if (this._totalTime = y * d, y > this._cycle ? x = !x : this._totalTime += d, this._time = p, this._rawPrevTime = 0 === d ? v - 1e-5 : v, this._cycle = y, this._locked = !0, p = x ? 0 : d, this.render(p, e, 0 === d), e || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || o), b && (p = x ? d + 1e-6 : -1e-6, this.render(p, !0, !1)), this._locked = !1, this._paused && !_) return;
						this._time = S, this._totalTime = w, this._cycle = T, this._rawPrevTime = C
					}
					if (this._time !== p && this._first || i || u) {
						if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== f && t > 0 && (this._active = !0), 0 === f && this.vars.onStart && 0 !== this._totalTime && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || o)), this._time >= p)
							for (n = this._first; n && (a = n._next, !this._paused || _);)(n._active || n._startTime <= this._time && !n._paused && !n._gc) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = a;
						else
							for (n = this._last; n && (a = n._prev, !this._paused || _);)(n._active || p >= n._startTime && !n._paused && !n._gc) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = a;
						this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || o)), l && (this._locked || this._gc || (m === this._startTime || g !== this._timeScale) && (0 === this._time || h >= this.totalDuration()) && (s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[l] && this.vars[l].apply(this.vars[l + "Scope"] || this, this.vars[l + "Params"] || o)))
					} else f !== this._totalTime && this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || o))
				}, a.getActive = function (t, e, i) {
					null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
					var n, r, o = [],
						s = this.getChildren(t, e, i),
						a = 0,
						l = s.length;
					for (n = 0; l > n; n++)(r = s[n]).isActive() && (o[a++] = r);
					return o
				}, a.getLabelAfter = function (t) {
					t || 0 !== t && (t = this._time);
					var e, i = this.getLabelsArray(),
						n = i.length;
					for (e = 0; n > e; e++)
						if (i[e].time > t) return i[e].name;
					return null
				}, a.getLabelBefore = function (t) {
					null == t && (t = this._time);
					for (var e = this.getLabelsArray(), i = e.length; --i > -1;)
						if (t > e[i].time) return e[i].name;
					return null
				}, a.getLabelsArray = function () {
					var t, e = [],
						i = 0;
					for (t in this._labels) e[i++] = {
						time: this._labels[t],
						name: t
					};
					return e.sort(function (t, e) {
						return t.time - e.time
					}), e
				}, a.progress = function (t) {
					return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
				}, a.totalProgress = function (t) {
					return arguments.length ? this.totalTime(this.totalDuration() * t, !1) : this._totalTime / this.totalDuration()
				}, a.totalDuration = function (e) {
					return arguments.length ? -1 === this._repeat ? this : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (t.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
				}, a.time = function (t, e) {
					return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 != (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
				}, a.repeat = function (t) {
					return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
				}, a.repeatDelay = function (t) {
					return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
				}, a.yoyo = function (t) {
					return arguments.length ? (this._yoyo = t, this) : this._yoyo
				}, a.currentLabel = function (t) {
					return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8)
				}, n
			}, !0),
			function () {
				var t = 180 / Math.PI,
					e = [],
					i = [],
					n = [],
					r = {},
					o = function (t, e, i, n) {
						this.a = t, this.b = e, this.c = i, this.d = n, this.da = n - t, this.ca = i - t, this.ba = e - t
					},
					s = function (t, e, i, n) {
						var r = {
								a: t
							},
							o = {},
							s = {},
							a = {
								c: n
							},
							l = (t + e) / 2,
							u = (e + i) / 2,
							c = (i + n) / 2,
							h = (l + u) / 2,
							d = (u + c) / 2,
							p = (d - h) / 8;
						return r.b = l + (t - l) / 4, o.b = h + p, r.c = o.a = (r.b + o.b) / 2, o.c = s.a = (h + d) / 2, s.b = d - p, a.b = c + (n - c) / 4, s.c = a.a = (s.b + a.b) / 2, [r, o, s, a]
					},
					a = function (t, r, o, a, l) {
						var u, c, h, d, p, f, m, g, v, _, y, x, b, w = t.length - 1,
							T = 0,
							C = t[0].a;
						for (u = 0; w > u; u++) p = t[T], c = p.a, h = p.d, d = t[T + 1].d, l ? (y = e[u], x = i[u], b = .25 * (x + y) * r / (a ? .5 : n[u] || .5), f = h - (h - c) * (a ? .5 * r : 0 !== y ? b / y : 0), m = h + (d - h) * (a ? .5 * r : 0 !== x ? b / x : 0), g = h - (f + ((m - f) * (3 * y / (y + x) + .5) / 4 || 0))) : (f = h - .5 * (h - c) * r, m = h + .5 * (d - h) * r, g = h - (f + m) / 2), f += g, m += g, p.c = v = f, p.b = 0 !== u ? C : C = p.a + .6 * (p.c - p.a), p.da = h - c, p.ca = v - c, p.ba = C - c, o ? (_ = s(c, C, v, h), t.splice(T, 1, _[0], _[1], _[2], _[3]), T += 4) : T++, C = m;
						(p = t[T]).b = C, p.c = C + .4 * (p.d - C), p.da = p.d - p.a, p.ca = p.c - p.a, p.ba = C - p.a, o && (_ = s(p.a, C, p.c, p.d), t.splice(T, 1, _[0], _[1], _[2], _[3]))
					},
					l = function (t, n, r, s) {
						var a, l, u, c, h, d, p = [];
						if (s)
							for (t = [s].concat(t), l = t.length; --l > -1;) "string" == typeof (d = t[l][n]) && "=" === d.charAt(1) && (t[l][n] = s[n] + Number(d.charAt(0) + d.substr(2)));
						if (0 > (a = t.length - 2)) return p[0] = new o(t[0][n], 0, 0, t[-1 > a ? 0 : 1][n]), p;
						for (l = 0; a > l; l++) u = t[l][n], c = t[l + 1][n], p[l] = new o(u, 0, 0, c), r && (h = t[l + 2][n], e[l] = (e[l] || 0) + (c - u) * (c - u), i[l] = (i[l] || 0) + (h - c) * (h - c));
						return p[l] = new o(t[l][n], 0, 0, t[l + 1][n]), p
					},
					u = function (t, o, s, u, c, h) {
						var d, p, f, m, g, v, _, y, x = {},
							b = [],
							w = h || t[0];
						c = "string" == typeof c ? "," + c + "," : ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,", null == o && (o = 1);
						for (p in t[0]) b.push(p);
						if (t.length > 1) {
							for (y = t[t.length - 1], _ = !0, d = b.length; --d > -1;)
								if (p = b[d], Math.abs(w[p] - y[p]) > .05) {
									_ = !1;
									break
								}
							_ && (t = t.concat(), h && t.unshift(h), t.push(t[1]), h = t[t.length - 3])
						}
						for (e.length = i.length = n.length = 0, d = b.length; --d > -1;) p = b[d], r[p] = -1 !== c.indexOf("," + p + ","), x[p] = l(t, p, r[p], h);
						for (d = e.length; --d > -1;) e[d] = Math.sqrt(e[d]), i[d] = Math.sqrt(i[d]);
						if (!u) {
							for (d = b.length; --d > -1;)
								if (r[p])
									for (f = x[b[d]], v = f.length - 1, m = 0; v > m; m++) g = f[m + 1].da / i[m] + f[m].da / e[m], n[m] = (n[m] || 0) + g * g;
							for (d = n.length; --d > -1;) n[d] = Math.sqrt(n[d])
						}
						for (d = b.length, m = s ? 4 : 1; --d > -1;) p = b[d], f = x[p], a(f, o, s, u, r[p]), _ && (f.splice(0, m), f.splice(f.length - m, m));
						return x
					},
					c = function (t, e, i) {
						var n, r, s, a, l, u, c, h, d, p, f, m = {},
							g = "cubic" === (e = e || "soft") ? 3 : 2,
							v = "soft" === e,
							_ = [];
						if (v && i && (t = [i].concat(t)), null == t || g + 1 > t.length) throw "invalid Bezier data";
						for (d in t[0]) _.push(d);
						for (u = _.length; --u > -1;) {
							for (m[d = _[u]] = l = [], p = 0, h = t.length, c = 0; h > c; c++) n = null == i ? t[c][d] : "string" == typeof (f = t[c][d]) && "=" === f.charAt(1) ? i[d] + Number(f.charAt(0) + f.substr(2)) : Number(f), v && c > 1 && h - 1 > c && (l[p++] = (n + l[p - 2]) / 2), l[p++] = n;
							for (h = p - g + 1, p = 0, c = 0; h > c; c += g) n = l[c], r = l[c + 1], s = l[c + 2], a = 2 === g ? 0 : l[c + 3], l[p++] = f = 3 === g ? new o(n, r, s, a) : new o(n, (2 * r + n) / 3, (2 * r + s) / 3, s);
							l.length = p
						}
						return m
					},
					h = function (t, e, i) {
						for (var n, r, o, s, a, l, u, c, h, d, p, f = 1 / i, m = t.length; --m > -1;)
							for (d = t[m], o = d.a, s = d.d - o, a = d.c - o, l = d.b - o, n = r = 0, c = 1; i >= c; c++) u = f * c, h = 1 - u, n = r - (r = (u * u * s + 3 * h * (u * a + h * l)) * u), p = m * i + c - 1, e[p] = (e[p] || 0) + n * n
					},
					d = function (t, e) {
						var i, n, r, o, s = [],
							a = [],
							l = 0,
							u = 0,
							c = (e = e >> 0 || 6) - 1,
							d = [],
							p = [];
						for (i in t) h(t[i], s, e);
						for (r = s.length, n = 0; r > n; n++) l += Math.sqrt(s[n]), o = n % e, p[o] = l, o === c && (u += l, o = n / e >> 0, d[o] = p, a[o] = u, l = 0, p = []);
						return {
							length: u,
							lengths: a,
							segments: d
						}
					},
					p = window._gsDefine.plugin({
						propName: "bezier",
						priority: -1,
						API: 2,
						global: !0,
						init: function (t, e, i) {
							this._target = t, e instanceof Array && (e = {
								values: e
							}), this._func = {}, this._round = {}, this._props = [], this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
							var n, r, o, s, a, l = e.values || [],
								h = {},
								p = l[0],
								f = e.autoRotate || i.vars.orientToBezier;
							this._autoRotate = f ? f instanceof Array ? f : [
								["x", "y", "rotation", !0 === f ? 0 : Number(f) || 0]
							] : null;
							for (n in p) this._props.push(n);
							for (o = this._props.length; --o > -1;) n = this._props[o], this._overwriteProps.push(n), r = this._func[n] = "function" == typeof t[n], h[n] = r ? t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)]() : parseFloat(t[n]), a || h[n] !== l[0][n] && (a = h);
							if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? u(l, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, a) : c(l, e.type, h), this._segCount = this._beziers[n].length, this._timeRes) {
								var m = d(this._beziers, this._timeRes);
								this._length = m.length, this._lengths = m.lengths, this._segments = m.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
							}
							if (f = this._autoRotate)
								for (f[0] instanceof Array || (this._autoRotate = f = [f]), o = f.length; --o > -1;)
									for (s = 0; 3 > s; s++) n = f[o][s], this._func[n] = "function" == typeof t[n] && t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)];
							return !0
						},
						set: function (e) {
							var i, n, r, o, s, a, l, u, c, h, d = this._segCount,
								p = this._func,
								f = this._target;
							if (this._timeRes) {
								if (c = this._lengths, h = this._curSeg, e *= this._length, r = this._li, e > this._l2 && d - 1 > r) {
									for (u = d - 1; u > r && e >= (this._l2 = c[++r]););
									this._l1 = c[r - 1], this._li = r, this._curSeg = h = this._segments[r], this._s2 = h[this._s1 = this._si = 0]
								} else if (this._l1 > e && r > 0) {
									for (; r > 0 && (this._l1 = c[--r]) >= e;);
									0 === r && this._l1 > e ? this._l1 = 0 : r++, this._l2 = c[r], this._li = r, this._curSeg = h = this._segments[r], this._s1 = h[(this._si = h.length - 1) - 1] || 0, this._s2 = h[this._si]
								}
								if (i = r, e -= this._l1, r = this._si, e > this._s2 && h.length - 1 > r) {
									for (u = h.length - 1; u > r && e >= (this._s2 = h[++r]););
									this._s1 = h[r - 1], this._si = r
								} else if (this._s1 > e && r > 0) {
									for (; r > 0 && (this._s1 = h[--r]) >= e;);
									0 === r && this._s1 > e ? this._s1 = 0 : r++, this._s2 = h[r], this._si = r
								}
								a = (r + (e - this._s1) / (this._s2 - this._s1)) * this._prec
							} else i = 0 > e ? 0 : e >= 1 ? d - 1 : d * e >> 0, a = (e - i * (1 / d)) * d;
							for (n = 1 - a, r = this._props.length; --r > -1;) o = this._props[r], s = this._beziers[o][i], l = (a * a * s.da + 3 * n * (a * s.ca + n * s.ba)) * a + s.a, this._round[o] && (l = l + (l > 0 ? .5 : -.5) >> 0), p[o] ? f[o](l) : f[o] = l;
							if (this._autoRotate) {
								var m, g, v, _, y, x, b, w = this._autoRotate;
								for (r = w.length; --r > -1;) o = w[r][2], x = w[r][3] || 0, b = !0 === w[r][4] ? 1 : t, s = this._beziers[w[r][0]], m = this._beziers[w[r][1]], s && m && (s = s[i], m = m[i], g = s.a + (s.b - s.a) * a, _ = s.b + (s.c - s.b) * a, g += (_ - g) * a, _ += (s.c + (s.d - s.c) * a - _) * a, v = m.a + (m.b - m.a) * a, y = m.b + (m.c - m.b) * a, v += (y - v) * a, y += (m.c + (m.d - m.c) * a - y) * a, l = Math.atan2(y - v, _ - g) * b + x, p[o] ? f[o](l) : f[o] = l)
							}
						}
					}),
					f = p.prototype;
				p.bezierThrough = u, p.cubicToQuadratic = s, p._autoCSS = !0, p.quadraticToCubic = function (t, e, i) {
					return new o(t, (2 * e + t) / 3, (2 * e + i) / 3, i)
				}, p._cssRegister = function () {
					var t = window._gsDefine.globals.CSSPlugin;
					if (t) {
						var e = t._internals,
							i = e._parseToProxy,
							n = e._setPluginRatio,
							r = e.CSSPropTween;
						e._registerComplexSpecialProp("bezier", {
							parser: function (t, e, o, s, a, l) {
								e instanceof Array && (e = {
									values: e
								}), l = new p;
								var u, c, h, d = e.values,
									f = d.length - 1,
									m = [],
									g = {};
								if (0 > f) return a;
								for (u = 0; f >= u; u++) h = i(t, d[u], s, a, l, f !== u), m[u] = h.end;
								for (c in e) g[c] = e[c];
								return g.values = m, a = new r(t, "bezier", 0, 0, h.pt, 2), a.data = h, a.plugin = l, a.setRatio = n, 0 === g.autoRotate && (g.autoRotate = !0), !g.autoRotate || g.autoRotate instanceof Array || (u = !0 === g.autoRotate ? 0 : Number(g.autoRotate), g.autoRotate = null != h.end.left ? [
									["left", "top", "rotation", u, !1]
								] : null != h.end.x && [
									["x", "y", "rotation", u, !1]
								]), g.autoRotate && (s._transform || s._enableTransforms(!1), h.autoRotate = s._target._gsTransform), l._onInitTween(h.proxy, g, s._tween), a
							}
						})
					}
				}, f._roundProps = function (t, e) {
					for (var i = this._overwriteProps, n = i.length; --n > -1;)(t[i[n]] || t.bezier || t.bezierThrough) && (this._round[i[n]] = e)
				}, f._kill = function (t) {
					var e, i, n = this._props;
					for (e in this._beziers)
						if (e in t)
							for (delete this._beziers[e], delete this._func[e], i = n.length; --i > -1;) n[i] === e && n.splice(i, 1);
					return this._super._kill.call(this, t)
				}
			}(), window._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function (t, e) {
				var i, n, r, o, s = function () {
						t.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = s.prototype.setRatio
					},
					a = {},
					l = s.prototype = new t("css");
				l.constructor = s, s.version = "1.11.2", s.API = 2, s.defaultTransformPerspective = 0, l = "px", s.suffixMap = {
					top: l,
					right: l,
					bottom: l,
					left: l,
					width: l,
					height: l,
					fontSize: l,
					padding: l,
					margin: l,
					perspective: l
				};
				var u, c, h, d, p, f, m = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
					g = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
					v = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
					_ = /[^\d\-\.]/g,
					y = /(?:\d|\-|\+|=|#|\.)*/g,
					x = /opacity *= *([^)]*)/,
					b = /opacity:([^;]*)/,
					w = /alpha\(opacity *=.+?\)/i,
					T = /^(rgb|hsl)/,
					C = /([A-Z])/g,
					S = /-([a-z])/gi,
					E = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
					k = function (t, e) {
						return e.toUpperCase()
					},
					O = /(?:Left|Right|Width)/i,
					D = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
					A = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
					P = /,(?=[^\)]*(?:\(|$))/gi,
					M = Math.PI / 180,
					I = 180 / Math.PI,
					j = {},
					N = document,
					B = N.createElement("div"),
					R = N.createElement("img"),
					L = s._internals = {
						_specialProps: a
					},
					F = navigator.userAgent,
					z = function () {
						var t, e = F.indexOf("Android"),
							i = N.createElement("div");
						return h = -1 !== F.indexOf("Safari") && -1 === F.indexOf("Chrome") && (-1 === e || Number(F.substr(e + 8, 1)) > 3), p = h && 6 > Number(F.substr(F.indexOf("Version/") + 8, 1)), d = -1 !== F.indexOf("Firefox"), /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(F) && (f = parseFloat(RegExp.$1)), i.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>", !!(t = i.getElementsByTagName("a")[0]) && /^0.55/.test(t.style.opacity)
					}(),
					H = function (t) {
						return x.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
					},
					$ = function (t) {
						window.console && console.log(t)
					},
					q = "",
					U = "",
					W = function (t, e) {
						var i, n, r = (e = e || B).style;
						if (void 0 !== r[t]) return t;
						for (t = t.charAt(0).toUpperCase() + t.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], n = 5; --n > -1 && void 0 === r[i[n] + t];);
						return n >= 0 ? (U = 3 === n ? "ms" : i[n], q = "-" + U.toLowerCase() + "-", U + t) : null
					},
					X = N.defaultView ? N.defaultView.getComputedStyle : function () {},
					V = s.getStyle = function (t, e, i, n, r) {
						var o;
						return z || "opacity" !== e ? (!n && t.style[e] ? o = t.style[e] : (i = i || X(t, null)) ? (t = i.getPropertyValue(e.replace(C, "-$1").toLowerCase()), o = t || i.length ? t : i[e]) : t.currentStyle && (o = t.currentStyle[e]), null == r || o && "none" !== o && "auto" !== o && "auto auto" !== o ? o : r) : H(t)
					},
					Y = function (t, e, i, n, r) {
						if ("px" === n || !n) return i;
						if ("auto" === n || !i) return 0;
						var o, s = O.test(e),
							a = t,
							l = B.style,
							u = 0 > i;
						return u && (i = -i), "%" === n && -1 !== e.indexOf("border") ? o = i / 100 * (s ? t.clientWidth : t.clientHeight) : (l.cssText = "border:0 solid red;position:" + V(t, "position") + ";line-height:0;", "%" !== n && a.appendChild ? l[s ? "borderLeftWidth" : "borderTopWidth"] = i + n : (a = t.parentNode || N.body, l[s ? "width" : "height"] = i + n), a.appendChild(B), o = parseFloat(B[s ? "offsetWidth" : "offsetHeight"]), a.removeChild(B), 0 !== o || r || (o = Y(t, e, i, n, !0))), u ? -o : o
					},
					G = function (t, e, i) {
						if ("absolute" !== V(t, "position", i)) return 0;
						var n = "left" === e ? "Left" : "Top",
							r = V(t, "margin" + n, i);
						return t["offset" + n] - (Y(t, e, parseFloat(r), r.replace(y, "")) || 0)
					},
					Z = function (t, e) {
						var i, n, r = {};
						if (e = e || X(t, null))
							if (i = e.length)
								for (; --i > -1;) r[e[i].replace(S, k)] = e.getPropertyValue(e[i]);
							else
								for (i in e) r[i] = e[i];
						else if (e = t.currentStyle || t.style)
							for (i in e) "string" == typeof i && void 0 !== r[i] && (r[i.replace(S, k)] = e[i]);
						return z || (r.opacity = H(t)), n = wt(t, e, !1), r.rotation = n.rotation, r.skewX = n.skewX, r.scaleX = n.scaleX, r.scaleY = n.scaleY, r.x = n.x, r.y = n.y, bt && (r.z = n.z, r.rotationX = n.rotationX, r.rotationY = n.rotationY, r.scaleZ = n.scaleZ), r.filters && delete r.filters, r
					},
					Q = function (t, e, i, n, r) {
						var o, s, a, l = {},
							u = t.style;
						for (s in i) "cssText" !== s && "length" !== s && isNaN(s) && (e[s] !== (o = i[s]) || r && r[s]) && -1 === s.indexOf("Origin") && ("number" == typeof o || "string" == typeof o) && (l[s] = "auto" !== o || "left" !== s && "top" !== s ? "" !== o && "auto" !== o && "none" !== o || "string" != typeof e[s] || "" === e[s].replace(_, "") ? o : 0 : G(t, s), void 0 !== u[s] && (a = new ht(u, s, u[s], a)));
						if (n)
							for (s in n) "className" !== s && (l[s] = n[s]);
						return {
							difs: l,
							firstMPT: a
						}
					},
					J = {
						width: ["Left", "Right"],
						height: ["Top", "Bottom"]
					},
					K = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
					tt = function (t, e, i) {
						var n = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
							r = J[e],
							o = r.length;
						for (i = i || X(t, null); --o > -1;) n -= parseFloat(V(t, "padding" + r[o], i, !0)) || 0, n -= parseFloat(V(t, "border" + r[o] + "Width", i, !0)) || 0;
						return n
					},
					et = function (t, e) {
						(null == t || "" === t || "auto" === t || "auto auto" === t) && (t = "0 0");
						var i = t.split(" "),
							n = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : i[0],
							r = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : i[1];
						return null == r ? r = "0" : "center" === r && (r = "50%"), ("center" === n || isNaN(parseFloat(n)) && -1 === (n + "").indexOf("=")) && (n = "50%"), e && (e.oxp = -1 !== n.indexOf("%"), e.oyp = -1 !== r.indexOf("%"), e.oxr = "=" === n.charAt(1), e.oyr = "=" === r.charAt(1), e.ox = parseFloat(n.replace(_, "")), e.oy = parseFloat(r.replace(_, ""))), n + " " + r + (i.length > 2 ? " " + i[2] : "")
					},
					it = function (t, e) {
						return "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e)
					},
					nt = function (t, e) {
						return null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * Number(t.substr(2)) + e : parseFloat(t)
					},
					rt = function (t, e, i, n) {
						var r, o, s, a;
						return null == t ? a = e : "number" == typeof t ? a = t : (r = 360, o = t.split("_"), s = Number(o[0].replace(_, "")) * (-1 === t.indexOf("rad") ? 1 : I) - ("=" === t.charAt(1) ? 0 : e), o.length && (n && (n[i] = e + s), -1 !== t.indexOf("short") && (s %= r) !== s % (r / 2) && (s = 0 > s ? s + r : s - r), -1 !== t.indexOf("_cw") && 0 > s ? s = (s + 9999999999 * r) % r - (0 | s / r) * r : -1 !== t.indexOf("ccw") && s > 0 && (s = (s - 9999999999 * r) % r - (0 | s / r) * r)), a = e + s), 1e-6 > a && a > -1e-6 && (a = 0), a
					},
					ot = {
						aqua: [0, 255, 255],
						lime: [0, 255, 0],
						silver: [192, 192, 192],
						black: [0, 0, 0],
						maroon: [128, 0, 0],
						teal: [0, 128, 128],
						blue: [0, 0, 255],
						navy: [0, 0, 128],
						white: [255, 255, 255],
						fuchsia: [255, 0, 255],
						olive: [128, 128, 0],
						yellow: [255, 255, 0],
						orange: [255, 165, 0],
						gray: [128, 128, 128],
						purple: [128, 0, 128],
						green: [0, 128, 0],
						red: [255, 0, 0],
						pink: [255, 192, 203],
						cyan: [0, 255, 255],
						transparent: [255, 255, 255, 0]
					},
					st = function (t, e, i) {
						return t = 0 > t ? t + 1 : t > 1 ? t - 1 : t, 0 | 255 * (1 > 6 * t ? e + 6 * (i - e) * t : .5 > t ? i : 2 > 3 * t ? e + 6 * (i - e) * (2 / 3 - t) : e) + .5
					},
					at = function (t) {
						var e, i, n, r, o, s;
						return t && "" !== t ? "number" == typeof t ? [t >> 16, 255 & t >> 8, 255 & t] : ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), ot[t] ? ot[t] : "#" === t.charAt(0) ? (4 === t.length && (e = t.charAt(1), i = t.charAt(2), n = t.charAt(3), t = "#" + e + e + i + i + n + n), t = parseInt(t.substr(1), 16), [t >> 16, 255 & t >> 8, 255 & t]) : "hsl" === t.substr(0, 3) ? (t = t.match(m), r = Number(t[0]) % 360 / 360, o = Number(t[1]) / 100, s = Number(t[2]) / 100, i = .5 >= s ? s * (o + 1) : s + o - s * o, e = 2 * s - i, t.length > 3 && (t[3] = Number(t[3])), t[0] = st(r + 1 / 3, e, i), t[1] = st(r, e, i), t[2] = st(r - 1 / 3, e, i), t) : (t = t.match(m) || ot.transparent, t[0] = Number(t[0]), t[1] = Number(t[1]), t[2] = Number(t[2]), t.length > 3 && (t[3] = Number(t[3])), t)) : ot.black
					},
					lt = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
				for (l in ot) lt += "|" + l + "\\b";
				lt = RegExp(lt + ")", "gi");
				var ut = function (t, e, i, n) {
						if (null == t) return function (t) {
							return t
						};
						var r, o = e ? (t.match(lt) || [""])[0] : "",
							s = t.split(o).join("").match(v) || [],
							a = t.substr(0, t.indexOf(s[0])),
							l = ")" === t.charAt(t.length - 1) ? ")" : "",
							u = -1 !== t.indexOf(" ") ? " " : ",",
							c = s.length,
							h = c > 0 ? s[0].replace(m, "") : "";
						return c ? r = e ? function (t) {
							var e, d, p, f;
							if ("number" == typeof t) t += h;
							else if (n && P.test(t)) {
								for (f = t.replace(P, "|").split("|"), p = 0; f.length > p; p++) f[p] = r(f[p]);
								return f.join(",")
							}
							if (e = (t.match(lt) || [o])[0], d = t.split(e).join("").match(v) || [], p = d.length, c > p--)
								for (; c > ++p;) d[p] = i ? d[0 | (p - 1) / 2] : s[p];
							return a + d.join(u) + u + e + l + (-1 !== t.indexOf("inset") ? " inset" : "")
						} : function (t) {
							var e, o, d;
							if ("number" == typeof t) t += h;
							else if (n && P.test(t)) {
								for (o = t.replace(P, "|").split("|"), d = 0; o.length > d; d++) o[d] = r(o[d]);
								return o.join(",")
							}
							if (e = t.match(v) || [], d = e.length, c > d--)
								for (; c > ++d;) e[d] = i ? e[0 | (d - 1) / 2] : s[d];
							return a + e.join(u) + l
						} : function (t) {
							return t
						}
					},
					ct = function (t) {
						return t = t.split(","),
							function (e, i, n, r, o, s, a) {
								var l, u = (i + "").split(" ");
								for (a = {}, l = 0; 4 > l; l++) a[t[l]] = u[l] = u[l] || u[(l - 1) / 2 >> 0];
								return r.parse(e, a, o, s)
							}
					},
					ht = (L._setPluginRatio = function (t) {
						this.plugin.setRatio(t);
						for (var e, i, n, r, o = this.data, s = o.proxy, a = o.firstMPT; a;) e = s[a.v], a.r ? e = e > 0 ? 0 | e + .5 : 0 | e - .5 : 1e-6 > e && e > -1e-6 && (e = 0), a.t[a.p] = e, a = a._next;
						if (o.autoRotate && (o.autoRotate.rotation = s.rotation), 1 === t)
							for (a = o.firstMPT; a;) {
								if ((i = a.t).type) {
									if (1 === i.type) {
										for (r = i.xs0 + i.s + i.xs1, n = 1; i.l > n; n++) r += i["xn" + n] + i["xs" + (n + 1)];
										i.e = r
									}
								} else i.e = i.s + i.xs0;
								a = a._next
							}
					}, function (t, e, i, n, r) {
						this.t = t, this.p = e, this.v = i, this.r = r, n && (n._prev = this, this._next = n)
					}),
					dt = (L._parseToProxy = function (t, e, i, n, r, o) {
						var s, a, l, u, c, h = n,
							d = {},
							p = {},
							f = i._transform,
							m = j;
						for (i._transform = null, j = e, n = c = i.parse(t, e, n, r), j = m, o && (i._transform = f, h && (h._prev = null, h._prev && (h._prev._next = null))); n && n !== h;) {
							if (1 >= n.type && (a = n.p, p[a] = n.s + n.c, d[a] = n.s, o || (u = new ht(n, "s", a, u, n.r), n.c = 0), 1 === n.type))
								for (s = n.l; --s > 0;) l = "xn" + s, a = n.p + "_" + l, p[a] = n.data[l], d[a] = n[l], o || (u = new ht(n, l, a, u, n.rxp[l]));
							n = n._next
						}
						return {
							proxy: d,
							end: p,
							firstMPT: u,
							pt: c
						}
					}, L.CSSPropTween = function (t, e, n, r, s, a, l, u, c, h, d) {
						this.t = t, this.p = e, this.s = n, this.c = r, this.n = l || e, t instanceof dt || o.push(this.n), this.r = u, this.type = a || 0, c && (this.pr = c, i = !0), this.b = void 0 === h ? n : h, this.e = void 0 === d ? n + r : d, s && (this._next = s, s._prev = this)
					}),
					pt = s.parseComplex = function (t, e, i, n, r, o, s, a, l, c) {
						i = i || o || "", s = new dt(t, e, 0, 0, s, c ? 2 : 1, null, !1, a, i, n), n += "";
						var h, d, p, f, v, _, y, x, b, w, C, S, E = i.split(", ").join(",").split(" "),
							k = n.split(", ").join(",").split(" "),
							O = E.length,
							D = !1 !== u;
						for ((-1 !== n.indexOf(",") || -1 !== i.indexOf(",")) && (E = E.join(" ").replace(P, ", ").split(" "), k = k.join(" ").replace(P, ", ").split(" "), O = E.length), O !== k.length && (E = (o || "").split(" "), O = E.length), s.plugin = l, s.setRatio = c, h = 0; O > h; h++)
							if (f = E[h], v = k[h], (x = parseFloat(f)) || 0 === x) s.appendXtra("", x, it(v, x), v.replace(g, ""), D && -1 !== v.indexOf("px"), !0);
							else if (r && ("#" === f.charAt(0) || ot[f] || T.test(f))) S = "," === v.charAt(v.length - 1) ? ")," : ")", f = at(f), v = at(v), b = f.length + v.length > 6, b && !z && 0 === v[3] ? (s["xs" + s.l] += s.l ? " transparent" : "transparent", s.e = s.e.split(k[h]).join("transparent")) : (z || (b = !1), s.appendXtra(b ? "rgba(" : "rgb(", f[0], v[0] - f[0], ",", !0, !0).appendXtra("", f[1], v[1] - f[1], ",", !0).appendXtra("", f[2], v[2] - f[2], b ? "," : S, !0), b && (f = 4 > f.length ? 1 : f[3], s.appendXtra("", f, (4 > v.length ? 1 : v[3]) - f, S, !1)));
						else if (_ = f.match(m)) {
							if (!(y = v.match(g)) || y.length !== _.length) return s;
							for (p = 0, d = 0; _.length > d; d++) C = _[d], w = f.indexOf(C, p), s.appendXtra(f.substr(p, w - p), Number(C), it(y[d], C), "", D && "px" === f.substr(w + C.length, 2), 0 === d), p = w + C.length;
							s["xs" + s.l] += f.substr(p)
						} else s["xs" + s.l] += s.l ? " " + f : f;
						if (-1 !== n.indexOf("=") && s.data) {
							for (S = s.xs0 + s.data.s, h = 1; s.l > h; h++) S += s["xs" + h] + s.data["xn" + h];
							s.e = S + s["xs" + h]
						}
						return s.l || (s.type = -1, s.xs0 = s.e), s.xfirst || s
					},
					ft = 9;
				for ((l = dt.prototype).l = l.pr = 0; --ft > 0;) l["xn" + ft] = 0, l["xs" + ft] = "";
				l.xs0 = "", l._next = l._prev = l.xfirst = l.data = l.plugin = l.setRatio = l.rxp = null, l.appendXtra = function (t, e, i, n, r, o) {
					var s = this,
						a = s.l;
					return s["xs" + a] += o && a ? " " + t : t || "", i || 0 === a || s.plugin ? (s.l++, s.type = s.setRatio ? 2 : 1, s["xs" + s.l] = n || "", a > 0 ? (s.data["xn" + a] = e + i, s.rxp["xn" + a] = r, s["xn" + a] = e, s.plugin || (s.xfirst = new dt(s, "xn" + a, e, i, s.xfirst || s, 0, s.n, r, s.pr), s.xfirst.xs0 = 0), s) : (s.data = {
						s: e + i
					}, s.rxp = {}, s.s = e, s.c = i, s.r = r, s)) : (s["xs" + a] += e + (n || ""), s)
				};
				var mt = function (t, e) {
						e = e || {}, this.p = e.prefix ? W(t) || t : t, a[t] = a[this.p] = this, this.format = e.formatter || ut(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0
					},
					gt = L._registerComplexSpecialProp = function (t, e, i) {
						"object" != typeof e && (e = {
							parser: i
						});
						var n, r = t.split(","),
							o = e.defaultValue;
						for (i = i || [o], n = 0; r.length > n; n++) e.prefix = 0 === n && e.prefix, e.defaultValue = i[n] || o, new mt(r[n], e)
					};
				(l = mt.prototype).parseComplex = function (t, e, i, n, r, o) {
					var s, a, l, u, c, h, d = this.keyword;
					if (this.multi && (P.test(i) || P.test(e) ? (a = e.replace(P, "|").split("|"), l = i.replace(P, "|").split("|")) : d && (a = [e], l = [i])), l) {
						for (u = l.length > a.length ? l.length : a.length, s = 0; u > s; s++) e = a[s] = a[s] || this.dflt, i = l[s] = l[s] || this.dflt, d && (c = e.indexOf(d), h = i.indexOf(d), c !== h && (i = -1 === h ? l : a, i[s] += " " + d));
						e = a.join(", "), i = l.join(", ")
					}
					return pt(t, this.p, e, i, this.clrs, this.dflt, n, this.pr, r, o)
				}, l.parse = function (t, e, i, n, o, s) {
					return this.parseComplex(t.style, this.format(V(t, this.p, r, !1, this.dflt)), this.format(e), o, s)
				}, s.registerSpecialProp = function (t, e, i) {
					gt(t, {
						parser: function (t, n, r, o, s, a) {
							var l = new dt(t, r, 0, 0, s, 2, r, !1, i);
							return l.plugin = a, l.setRatio = e(t, n, o._tween, r), l
						},
						priority: i
					})
				};
				var vt = "scaleX,scaleY,scaleZ,x,y,z,skewX,rotation,rotationX,rotationY,perspective".split(","),
					_t = W("transform"),
					yt = q + "transform",
					xt = W("transformOrigin"),
					bt = null !== W("perspective"),
					wt = function (t, e, i, n) {
						if (t._gsTransform && i && !n) return t._gsTransform;
						var r, o, a, l, u, c, h, d, p, f, m, g, v, _ = i ? t._gsTransform || {
								skewY: 0
							} : {
								skewY: 0
							},
							y = 0 > _.scaleX,
							x = 2e-5,
							b = 1e5,
							w = 179.99,
							T = w * M,
							C = bt ? parseFloat(V(t, xt, e, !1, "0 0 0").split(" ")[2]) || _.zOrigin || 0 : 0;
						for (_t ? r = V(t, yt, e, !0) : t.currentStyle && (r = t.currentStyle.filter.match(D), r = r && 4 === r.length ? [r[0].substr(4), Number(r[2].substr(4)), Number(r[1].substr(4)), r[3].substr(4), _.x || 0, _.y || 0].join(",") : ""), a = (o = (r || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || []).length; --a > -1;) l = Number(o[a]), o[a] = (u = l - (l |= 0)) ? (0 | u * b + (0 > u ? -.5 : .5)) / b + l : l;
						if (16 === o.length) {
							var S = o[8],
								E = o[9],
								k = o[10],
								O = o[12],
								A = o[13],
								P = o[14];
							if (_.zOrigin && (P = -_.zOrigin, O = S * P - o[12], A = E * P - o[13], P = k * P + _.zOrigin - o[14]), !i || n || null == _.rotationX) {
								var j, N, B, R, L, F, z, H = o[0],
									$ = o[1],
									q = o[2],
									U = o[3],
									W = o[4],
									X = o[5],
									Y = o[6],
									G = o[7],
									Z = o[11],
									Q = Math.atan2(Y, k),
									J = -T > Q || Q > T;
								_.rotationX = Q * I, Q && (R = Math.cos(-Q), L = Math.sin(-Q), j = W * R + S * L, N = X * R + E * L, B = Y * R + k * L, S = W * -L + S * R, E = X * -L + E * R, k = Y * -L + k * R, Z = G * -L + Z * R, W = j, X = N, Y = B), Q = Math.atan2(S, H), _.rotationY = Q * I, Q && (F = -T > Q || Q > T, R = Math.cos(-Q), L = Math.sin(-Q), j = H * R - S * L, N = $ * R - E * L, B = q * R - k * L, E = $ * L + E * R, k = q * L + k * R, Z = U * L + Z * R, H = j, $ = N, q = B), Q = Math.atan2($, X), _.rotation = Q * I, Q && (z = -T > Q || Q > T, R = Math.cos(-Q), L = Math.sin(-Q), H = H * R + W * L, N = $ * R + X * L, X = $ * -L + X * R, Y = q * -L + Y * R, $ = N), z && J ? _.rotation = _.rotationX = 0 : z && F ? _.rotation = _.rotationY = 0 : F && J && (_.rotationY = _.rotationX = 0), _.scaleX = (0 | Math.sqrt(H * H + $ * $) * b + .5) / b, _.scaleY = (0 | Math.sqrt(X * X + E * E) * b + .5) / b, _.scaleZ = (0 | Math.sqrt(Y * Y + k * k) * b + .5) / b, _.skewX = 0, _.perspective = Z ? 1 / (0 > Z ? -Z : Z) : 0, _.x = O, _.y = A, _.z = P
							}
						} else if (!(bt && !n && o.length && _.x === o[4] && _.y === o[5] && (_.rotationX || _.rotationY) || void 0 !== _.x && "none" === V(t, "display", e))) {
							var K = o.length >= 6,
								tt = K ? o[0] : 1,
								et = o[1] || 0,
								it = o[2] || 0,
								nt = K ? o[3] : 1;
							_.x = o[4] || 0, _.y = o[5] || 0, c = Math.sqrt(tt * tt + et * et), h = Math.sqrt(nt * nt + it * it), d = tt || et ? Math.atan2(et, tt) * I : _.rotation || 0, p = it || nt ? Math.atan2(it, nt) * I + d : _.skewX || 0, f = c - Math.abs(_.scaleX || 0), m = h - Math.abs(_.scaleY || 0), Math.abs(p) > 90 && 270 > Math.abs(p) && (y ? (c *= -1, p += 0 >= d ? 180 : -180, d += 0 >= d ? 180 : -180) : (h *= -1, p += 0 >= p ? 180 : -180)), g = (d - _.rotation) % 180, v = (p - _.skewX) % 180, (void 0 === _.skewX || f > x || -x > f || m > x || -x > m || g > -w && w > g && !1 | g * b || v > -w && w > v && !1 | v * b) && (_.scaleX = c, _.scaleY = h, _.rotation = d, _.skewX = p), bt && (_.rotationX = _.rotationY = _.z = 0, _.perspective = parseFloat(s.defaultTransformPerspective) || 0, _.scaleZ = 1)
						}
						_.zOrigin = C;
						for (a in _) x > _[a] && _[a] > -x && (_[a] = 0);
						return i && (t._gsTransform = _), _
					},
					Tt = function (t) {
						var e, i, n = this.data,
							r = -n.rotation * M,
							o = r + n.skewX * M,
							s = 1e5,
							a = (0 | Math.cos(r) * n.scaleX * s) / s,
							l = (0 | Math.sin(r) * n.scaleX * s) / s,
							u = (0 | Math.sin(o) * -n.scaleY * s) / s,
							c = (0 | Math.cos(o) * n.scaleY * s) / s,
							h = this.t.style,
							d = this.t.currentStyle;
						if (d) {
							i = l, l = -u, u = -i, e = d.filter, h.filter = "";
							var p, m, g = this.t.offsetWidth,
								v = this.t.offsetHeight,
								_ = "absolute" !== d.position,
								b = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + l + ", M21=" + u + ", M22=" + c,
								w = n.x,
								T = n.y;
							if (null != n.ox && (p = (n.oxp ? .01 * g * n.ox : n.ox) - g / 2, m = (n.oyp ? .01 * v * n.oy : n.oy) - v / 2, w += p - (p * a + m * l), T += m - (p * u + m * c)), _ ? (p = g / 2, m = v / 2, b += ", Dx=" + (p - (p * a + m * l) + w) + ", Dy=" + (m - (p * u + m * c) + T) + ")") : b += ", sizingMethod='auto expand')", h.filter = -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? e.replace(A, b) : b + " " + e, (0 === t || 1 === t) && 1 === a && 0 === l && 0 === u && 1 === c && (_ && -1 === b.indexOf("Dx=0, Dy=0") || x.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf(e.indexOf("Alpha")) && h.removeAttribute("filter")), !_) {
								var C, S, E, k = 8 > f ? 1 : -1;
								for (p = n.ieOffsetX || 0, m = n.ieOffsetY || 0, n.ieOffsetX = Math.round((g - ((0 > a ? -a : a) * g + (0 > l ? -l : l) * v)) / 2 + w), n.ieOffsetY = Math.round((v - ((0 > c ? -c : c) * v + (0 > u ? -u : u) * g)) / 2 + T), ft = 0; 4 > ft; ft++) S = K[ft], C = d[S], i = -1 !== C.indexOf("px") ? parseFloat(C) : Y(this.t, S, parseFloat(C), C.replace(y, "")) || 0, E = i !== n[S] ? 2 > ft ? -n.ieOffsetX : -n.ieOffsetY : 2 > ft ? p - n.ieOffsetX : m - n.ieOffsetY, h[S] = (n[S] = Math.round(i - E * (0 === ft || 2 === ft ? 1 : k))) + "px"
							}
						}
					},
					Ct = function () {
						var t, e, i, n, r, o, s, a, l, u, c, h, p, f, m, g, v, _, y, x, b, w, T, C = this.data,
							S = this.t.style,
							E = C.rotation * M,
							k = C.scaleX,
							O = C.scaleY,
							D = C.scaleZ,
							A = C.perspective;
						if (d) {
							var P = 1e-4;
							P > k && k > -P && (k = D = 2e-5), P > O && O > -P && (O = D = 2e-5), !A || C.z || C.rotationX || C.rotationY || (A = 0)
						}
						if (E || C.skewX) _ = Math.cos(E), y = Math.sin(E), t = _, r = y, C.skewX && (E -= C.skewX * M, _ = Math.cos(E), y = Math.sin(E)), e = -y, o = _;
						else {
							if (!(C.rotationY || C.rotationX || 1 !== D || A)) return void(S[_t] = "translate3d(" + C.x + "px," + C.y + "px," + C.z + "px)" + (1 !== k || 1 !== O ? " scale(" + k + "," + O + ")" : ""));
							t = o = 1, e = r = 0
						}
						c = 1, i = n = s = a = l = u = h = p = f = 0, m = A ? -1 / A : 0, g = C.zOrigin, v = 1e5, (E = C.rotationY * M) && (_ = Math.cos(E), y = Math.sin(E), l = c * -y, p = m * -y, i = t * y, s = r * y, c *= _, m *= _, t *= _, r *= _), (E = C.rotationX * M) && (_ = Math.cos(E), y = Math.sin(E), x = e * _ + i * y, b = o * _ + s * y, w = u * _ + c * y, T = f * _ + m * y, i = e * -y + i * _, s = o * -y + s * _, c = u * -y + c * _, m = f * -y + m * _, e = x, o = b, u = w, f = T), 1 !== D && (i *= D, s *= D, c *= D, m *= D), 1 !== O && (e *= O, o *= O, u *= O, f *= O), 1 !== k && (t *= k, r *= k, l *= k, p *= k), g && (h -= g, n = i * h, a = s * h, h = c * h + g), n = (x = (n += C.x) - (n |= 0)) ? (0 | x * v + (0 > x ? -.5 : .5)) / v + n : n, a = (x = (a += C.y) - (a |= 0)) ? (0 | x * v + (0 > x ? -.5 : .5)) / v + a : a, h = (x = (h += C.z) - (h |= 0)) ? (0 | x * v + (0 > x ? -.5 : .5)) / v + h : h, S[_t] = "matrix3d(" + [(0 | t * v) / v, (0 | r * v) / v, (0 | l * v) / v, (0 | p * v) / v, (0 | e * v) / v, (0 | o * v) / v, (0 | u * v) / v, (0 | f * v) / v, (0 | i * v) / v, (0 | s * v) / v, (0 | c * v) / v, (0 | m * v) / v, n, a, h, A ? 1 + -h / A : 1].join(",") + ")"
					},
					St = function () {
						var t, e, i, n, r, o, s, a, l, u = this.data,
							c = this.t,
							h = c.style;
						d && (t = h.top ? "top" : h.bottom ? "bottom" : parseFloat(V(c, "top", null, !1)) ? "bottom" : "top", e = V(c, t, null, !1), i = parseFloat(e) || 0, n = e.substr((i + "").length) || "px", u._ffFix = !u._ffFix, h[t] = (u._ffFix ? i + .05 : i - .05) + n), u.rotation || u.skewX ? (r = u.rotation * M, o = r - u.skewX * M, s = 1e5, a = u.scaleX * s, l = u.scaleY * s, h[_t] = "matrix(" + (0 | Math.cos(r) * a) / s + "," + (0 | Math.sin(r) * a) / s + "," + (0 | Math.sin(o) * -l) / s + "," + (0 | Math.cos(o) * l) / s + "," + u.x + "," + u.y + ")") : h[_t] = "matrix(" + u.scaleX + ",0,0," + u.scaleY + "," + u.x + "," + u.y + ")"
					};
				gt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D", {
					parser: function (t, e, i, n, o, s, a) {
						if (n._transform) return o;
						var l, u, c, h, d, p, f, m = n._transform = wt(t, r, !0, a.parseTransform),
							g = t.style,
							v = vt.length,
							_ = a,
							y = {};
						if ("string" == typeof _.transform && _t) c = g.cssText, g[_t] = _.transform, g.display = "block", l = wt(t, null, !1), g.cssText = c;
						else if ("object" == typeof _) {
							if (l = {
									scaleX: nt(null != _.scaleX ? _.scaleX : _.scale, m.scaleX),
									scaleY: nt(null != _.scaleY ? _.scaleY : _.scale, m.scaleY),
									scaleZ: nt(null != _.scaleZ ? _.scaleZ : _.scale, m.scaleZ),
									x: nt(_.x, m.x),
									y: nt(_.y, m.y),
									z: nt(_.z, m.z),
									perspective: nt(_.transformPerspective, m.perspective)
								}, null != (f = _.directionalRotation))
								if ("object" == typeof f)
									for (c in f) _[c] = f[c];
								else _.rotation = f;
							l.rotation = rt("rotation" in _ ? _.rotation : "shortRotation" in _ ? _.shortRotation + "_short" : "rotationZ" in _ ? _.rotationZ : m.rotation, m.rotation, "rotation", y), bt && (l.rotationX = rt("rotationX" in _ ? _.rotationX : "shortRotationX" in _ ? _.shortRotationX + "_short" : m.rotationX || 0, m.rotationX, "rotationX", y), l.rotationY = rt("rotationY" in _ ? _.rotationY : "shortRotationY" in _ ? _.shortRotationY + "_short" : m.rotationY || 0, m.rotationY, "rotationY", y)), l.skewX = null == _.skewX ? m.skewX : rt(_.skewX, m.skewX), l.skewY = null == _.skewY ? m.skewY : rt(_.skewY, m.skewY), (u = l.skewY - m.skewY) && (l.skewX += u, l.rotation += u)
						}
						for (null != _.force3D && (m.force3D = _.force3D, p = !0), (d = m.force3D || m.z || m.rotationX || m.rotationY || l.z || l.rotationX || l.rotationY || l.perspective) || null == _.scale || (l.scaleZ = 1); --v > -1;) i = vt[v], ((h = l[i] - m[i]) > 1e-6 || -1e-6 > h || null != j[i]) && (p = !0, o = new dt(m, i, m[i], h, o), i in y && (o.e = y[i]), o.xs0 = 0, o.plugin = s, n._overwriteProps.push(o.n));
						return ((h = _.transformOrigin) || bt && d && m.zOrigin) && (_t ? (p = !0, i = xt, h = (h || V(t, i, r, !1, "50% 50%")) + "", o = new dt(g, i, 0, 0, o, -1, "transformOrigin"), o.b = g[i], o.plugin = s, bt ? (c = m.zOrigin, h = h.split(" "), m.zOrigin = (h.length > 2 && (0 === c || "0px" !== h[2]) ? parseFloat(h[2]) : c) || 0, o.xs0 = o.e = g[i] = h[0] + " " + (h[1] || "50%") + " 0px", o = new dt(m, "zOrigin", 0, 0, o, -1, o.n), o.b = c, o.xs0 = o.e = m.zOrigin) : o.xs0 = o.e = g[i] = h) : et(h + "", m)), p && (n._transformType = d || 3 === this._transformType ? 3 : 2), o
					},
					prefix: !0
				}), gt("boxShadow", {
					defaultValue: "0px 0px 0px 0px #999",
					prefix: !0,
					color: !0,
					multi: !0,
					keyword: "inset"
				}), gt("borderRadius", {
					defaultValue: "0px",
					parser: function (t, e, i, o, s) {
						e = this.format(e);
						var a, l, u, c, h, d, p, f, m, g, v, _, y, x, b, w, T = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
							C = t.style;
						for (m = parseFloat(t.offsetWidth), g = parseFloat(t.offsetHeight), a = e.split(" "), l = 0; T.length > l; l++) this.p.indexOf("border") && (T[l] = W(T[l])), -1 !== (h = c = V(t, T[l], r, !1, "0px")).indexOf(" ") && (c = h.split(" "), h = c[0], c = c[1]), d = u = a[l], p = parseFloat(h), _ = h.substr((p + "").length), y = "=" === d.charAt(1), y ? (f = parseInt(d.charAt(0) + "1", 10), d = d.substr(2), f *= parseFloat(d), v = d.substr((f + "").length - (0 > f ? 1 : 0)) || "") : (f = parseFloat(d), v = d.substr((f + "").length)), "" === v && (v = n[i] || _), v !== _ && (x = Y(t, "borderLeft", p, _), b = Y(t, "borderTop", p, _), "%" === v ? (h = x / m * 100 + "%", c = b / g * 100 + "%") : "em" === v ? (w = Y(t, "borderLeft", 1, "em"), h = x / w + "em", c = b / w + "em") : (h = x + "px", c = b + "px"), y && (d = parseFloat(h) + f + v, u = parseFloat(c) + f + v)), s = pt(C, T[l], h + " " + c, d + " " + u, !1, "0px", s);
						return s
					},
					prefix: !0,
					formatter: ut("0px 0px 0px 0px", !1, !0)
				}), gt("backgroundPosition", {
					defaultValue: "0 0",
					parser: function (t, e, i, n, o, s) {
						var a, l, u, c, h, d, p = "background-position",
							m = r || X(t, null),
							g = this.format((m ? f ? m.getPropertyValue(p + "-x") + " " + m.getPropertyValue(p + "-y") : m.getPropertyValue(p) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
							v = this.format(e);
						if (-1 !== g.indexOf("%") != (-1 !== v.indexOf("%")) && (d = V(t, "backgroundImage").replace(E, "")) && "none" !== d) {
							for (a = g.split(" "), l = v.split(" "), R.setAttribute("src", d), u = 2; --u > -1;) g = a[u], (c = -1 !== g.indexOf("%")) !== (-1 !== l[u].indexOf("%")) && (h = 0 === u ? t.offsetWidth - R.width : t.offsetHeight - R.height, a[u] = c ? parseFloat(g) / 100 * h + "px" : parseFloat(g) / h * 100 + "%");
							g = a.join(" ")
						}
						return this.parseComplex(t.style, g, v, o, s)
					},
					formatter: et
				}), gt("backgroundSize", {
					defaultValue: "0 0",
					formatter: et
				}), gt("perspective", {
					defaultValue: "0px",
					prefix: !0
				}), gt("perspectiveOrigin", {
					defaultValue: "50% 50%",
					prefix: !0
				}), gt("transformStyle", {
					prefix: !0
				}), gt("backfaceVisibility", {
					prefix: !0
				}), gt("userSelect", {
					prefix: !0
				}), gt("margin", {
					parser: ct("marginTop,marginRight,marginBottom,marginLeft")
				}), gt("padding", {
					parser: ct("paddingTop,paddingRight,paddingBottom,paddingLeft")
				}), gt("clip", {
					defaultValue: "rect(0px,0px,0px,0px)",
					parser: function (t, e, i, n, o, s) {
						var a, l, u;
						return 9 > f ? (l = t.currentStyle, u = 8 > f ? " " : ",", a = "rect(" + l.clipTop + u + l.clipRight + u + l.clipBottom + u + l.clipLeft + ")", e = this.format(e).split(",").join(u)) : (a = this.format(V(t, this.p, r, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, a, e, o, s)
					}
				}), gt("textShadow", {
					defaultValue: "0px 0px 0px #999",
					color: !0,
					multi: !0
				}), gt("autoRound,strictUnits", {
					parser: function (t, e, i, n, r) {
						return r
					}
				}), gt("border", {
					defaultValue: "0px solid #000",
					parser: function (t, e, i, n, o, s) {
						return this.parseComplex(t.style, this.format(V(t, "borderTopWidth", r, !1, "0px") + " " + V(t, "borderTopStyle", r, !1, "solid") + " " + V(t, "borderTopColor", r, !1, "#000")), this.format(e), o, s)
					},
					color: !0,
					formatter: function (t) {
						var e = t.split(" ");
						return e[0] + " " + (e[1] || "solid") + " " + (t.match(lt) || ["#000"])[0]
					}
				}), gt("float,cssFloat,styleFloat", {
					parser: function (t, e, i, n, r) {
						var o = t.style,
							s = "cssFloat" in o ? "cssFloat" : "styleFloat";
						return new dt(o, s, 0, 0, r, -1, i, !1, 0, o[s], e)
					}
				});
				var Et = function (t) {
					var e, i = this.t,
						n = i.filter || V(this.data, "filter"),
						r = 0 | this.s + this.c * t;
					100 === r && (-1 === n.indexOf("atrix(") && -1 === n.indexOf("radient(") && -1 === n.indexOf("oader(") ? (i.removeAttribute("filter"), e = !V(this.data, "filter")) : (i.filter = n.replace(w, ""), e = !0)), e || (this.xn1 && (i.filter = n = n || "alpha(opacity=" + r + ")"), -1 === n.indexOf("opacity") ? 0 === r && this.xn1 || (i.filter = n + " alpha(opacity=" + r + ")") : i.filter = n.replace(x, "opacity=" + r))
				};
				gt("opacity,alpha,autoAlpha", {
					defaultValue: "1",
					parser: function (t, e, i, n, o, s) {
						var a = parseFloat(V(t, "opacity", r, !1, "1")),
							l = t.style,
							u = "autoAlpha" === i;
						return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + a), u && 1 === a && "hidden" === V(t, "visibility", r) && 0 !== e && (a = 0), z ? o = new dt(l, "opacity", a, e - a, o) : (o = new dt(l, "opacity", 100 * a, 100 * (e - a), o), o.xn1 = u ? 1 : 0, l.zoom = 1, o.type = 2, o.b = "alpha(opacity=" + o.s + ")", o.e = "alpha(opacity=" + (o.s + o.c) + ")", o.data = t, o.plugin = s, o.setRatio = Et), u && (o = new dt(l, "visibility", 0, 0, o, -1, null, !1, 0, 0 !== a ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit"), o.xs0 = "inherit", n._overwriteProps.push(o.n), n._overwriteProps.push(i)), o
					}
				});
				var kt = function (t, e) {
						e && (t.removeProperty ? t.removeProperty(e.replace(C, "-$1").toLowerCase()) : t.removeAttribute(e))
					},
					Ot = function (t) {
						if (this.t._gsClassPT = this, 1 === t || 0 === t) {
							this.t.className = 0 === t ? this.b : this.e;
							for (var e = this.data, i = this.t.style; e;) e.v ? i[e.p] = e.v : kt(i, e.p), e = e._next;
							1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
						} else this.t.className !== this.e && (this.t.className = this.e)
					};
				gt("className", {
					parser: function (t, e, n, o, s, a, l) {
						var u, c, h, d, p, f = t.className,
							m = t.style.cssText;
						if (s = o._classNamePT = new dt(t, n, 0, 0, s, 2), s.setRatio = Ot, s.pr = -11, i = !0, s.b = f, c = Z(t, r), h = t._gsClassPT) {
							for (d = {}, p = h.data; p;) d[p.p] = 1, p = p._next;
							h.setRatio(1)
						}
						return t._gsClassPT = s, s.e = "=" !== e.charAt(1) ? e : f.replace(RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), o._tween._duration && (t.className = s.e, u = Q(t, c, Z(t), l, d), t.className = f, s.data = u.firstMPT, t.style.cssText = m, s = s.xfirst = o.parse(t, u.difs, s, a)), s
					}
				});
				var Dt = function (t) {
					if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
						var e, i, n, r, o = this.t.style,
							s = a.transform.parse;
						if ("all" === this.e) o.cssText = "", r = !0;
						else
							for (e = this.e.split(","), n = e.length; --n > -1;) i = e[n], a[i] && (a[i].parse === s ? r = !0 : i = "transformOrigin" === i ? xt : a[i].p), kt(o, i);
						r && (kt(o, _t), this.t._gsTransform && delete this.t._gsTransform)
					}
				};
				for (gt("clearProps", {
						parser: function (t, e, n, r, o) {
							return o = new dt(t, n, 0, 0, o, 2), o.setRatio = Dt, o.e = e, o.pr = -10, o.data = r._tween, i = !0, o
						}
					}), l = "bezier,throwProps,physicsProps,physics2D".split(","), ft = l.length; ft--;) ! function (t) {
					if (!a[t]) {
						var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
						gt(t, {
							parser: function (t, i, n, r, o, s, l) {
								var u = (window.GreenSockGlobals || window).com.greensock.plugins[e];
								return u ? (u._cssRegister(), a[n].parse(t, i, n, r, o, s, l)) : ($("Error: " + e + " js file not loaded."), o)
							}
						})
					}
				}(l[ft]);
				(l = s.prototype)._firstPT = null, l._onInitTween = function (t, e, a) {
					if (!t.nodeType) return !1;
					this._target = t, this._tween = a, this._vars = e, u = e.autoRound, i = !1, n = e.suffixMap || s.suffixMap, r = X(t, ""), o = this._overwriteProps;
					var l, d, f, m, g, v, _, y, x, w = t.style;
					if (c && "" === w.zIndex && ("auto" === (l = V(t, "zIndex", r)) || "" === l) && (w.zIndex = 0), "string" == typeof e && (m = w.cssText, l = Z(t, r), w.cssText = m + ";" + e, l = Q(t, l, Z(t)).difs, !z && b.test(e) && (l.opacity = parseFloat(RegExp.$1)), e = l, w.cssText = m), this._firstPT = d = this.parse(t, e, null), this._transformType) {
						for (x = 3 === this._transformType, _t ? h && (c = !0, "" === w.zIndex && ("auto" === (_ = V(t, "zIndex", r)) || "" === _) && (w.zIndex = 0), p && (w.WebkitBackfaceVisibility = this._vars.WebkitBackfaceVisibility || (x ? "visible" : "hidden"))) : w.zoom = 1, f = d; f && f._next;) f = f._next;
						y = new dt(t, "transform", 0, 0, null, 2), this._linkCSSP(y, null, f), y.setRatio = x && bt ? Ct : _t ? St : Tt, y.data = this._transform || wt(t, r, !0), o.pop()
					}
					if (i) {
						for (; d;) {
							for (v = d._next, f = m; f && f.pr > d.pr;) f = f._next;
							(d._prev = f ? f._prev : g) ? d._prev._next = d: m = d, (d._next = f) ? f._prev = d : g = d, d = v
						}
						this._firstPT = m
					}
					return !0
				}, l.parse = function (t, e, i, o) {
					var s, l, c, h, d, p, f, m, g, v, _ = t.style;
					for (s in e) p = e[s], l = a[s], l ? i = l.parse(t, p, s, this, i, o, e) : (d = V(t, s, r) + "", g = "string" == typeof p, "color" === s || "fill" === s || "stroke" === s || -1 !== s.indexOf("Color") || g && T.test(p) ? (g || (p = at(p), p = (p.length > 3 ? "rgba(" : "rgb(") + p.join(",") + ")"), i = pt(_, s, d, p, !0, "transparent", i, 0, o)) : !g || -1 === p.indexOf(" ") && -1 === p.indexOf(",") ? (c = parseFloat(d), f = c || 0 === c ? d.substr((c + "").length) : "", ("" === d || "auto" === d) && ("width" === s || "height" === s ? (c = tt(t, s, r), f = "px") : "left" === s || "top" === s ? (c = G(t, s, r), f = "px") : (c = "opacity" !== s ? 0 : 1, f = "")), v = g && "=" === p.charAt(1), v ? (h = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), h *= parseFloat(p), m = p.replace(y, "")) : (h = parseFloat(p), m = g ? p.substr((h + "").length) || "" : ""), "" === m && (m = n[s] || f), p = h || 0 === h ? (v ? h + c : h) + m : e[s], f !== m && "" !== m && (h || 0 === h) && (c || 0 === c) && (c = Y(t, s, c, f), "%" === m ? ((c /= Y(t, s, 100, "%") / 100) > 100 && (c = 100), !0 !== e.strictUnits && (d = c + "%")) : "em" === m ? c /= Y(t, s, 1, "em") : (h = Y(t, s, h, m), m = "px"), v && (h || 0 === h) && (p = h + c + m)), v && (h += c), !c && 0 !== c || !h && 0 !== h ? void 0 !== _[s] && (p || "NaN" != p + "" && null != p) ? (i = new dt(_, s, h || c || 0, 0, i, -1, s, !1, 0, d, p), i.xs0 = "none" !== p || "display" !== s && -1 === s.indexOf("Style") ? p : d) : $("invalid " + s + " tween value: " + e[s]) : (i = new dt(_, s, c, h - c, i, 0, s, !1 !== u && ("px" === m || "zIndex" === s), 0, d, p), i.xs0 = m)) : i = pt(_, s, d, p, !0, null, i, 0, o)), o && i && !i.plugin && (i.plugin = o);
					return i
				}, l.setRatio = function (t) {
					var e, i, n, r = this._firstPT;
					if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
						if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || -1e-6 === this._tween._rawPrevTime)
							for (; r;) {
								if (e = r.c * t + r.s, r.r ? e = e > 0 ? 0 | e + .5 : 0 | e - .5 : 1e-6 > e && e > -1e-6 && (e = 0), r.type)
									if (1 === r.type)
										if (2 === (n = r.l)) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2;
										else if (3 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
								else if (4 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4;
								else if (5 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5;
								else {
									for (i = r.xs0 + e + r.xs1, n = 1; r.l > n; n++) i += r["xn" + n] + r["xs" + (n + 1)];
									r.t[r.p] = i
								} else -1 === r.type ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(t);
								else r.t[r.p] = e + r.xs0;
								r = r._next
							} else
								for (; r;) 2 !== r.type ? r.t[r.p] = r.b : r.setRatio(t), r = r._next;
						else
							for (; r;) 2 !== r.type ? r.t[r.p] = r.e : r.setRatio(t), r = r._next
				}, l._enableTransforms = function (t) {
					this._transformType = t || 3 === this._transformType ? 3 : 2, this._transform = this._transform || wt(this._target, r, !0)
				}, l._linkCSSP = function (t, e, i, n) {
					return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, n = !0), i ? i._next = t : n || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = i), t
				}, l._kill = function (e) {
					var i, n, r, o = e;
					if (e.autoAlpha || e.alpha) {
						o = {};
						for (n in e) o[n] = e[n];
						o.opacity = 1, o.autoAlpha && (o.visibility = 1)
					}
					return e.className && (i = this._classNamePT) && (r = i.xfirst, r && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, r._prev), this._classNamePT = null), t.prototype._kill.call(this, o)
				};
				var At = function (t, e, i) {
					var n, r, o, s;
					if (t.slice)
						for (r = t.length; --r > -1;) At(t[r], e, i);
					else
						for (n = t.childNodes, r = n.length; --r > -1;) o = n[r], s = o.type, o.style && (e.push(Z(o)), i && i.push(o)), 1 !== s && 9 !== s && 11 !== s || !o.childNodes.length || At(o, e, i)
				};
				return s.cascadeTo = function (t, i, n) {
					var r, o, s, a = e.to(t, i, n),
						l = [a],
						u = [],
						c = [],
						h = [],
						d = e._internals.reservedProps;
					for (t = a._targets || a.target, At(t, u, h), a.render(i, !0), At(t, c), a.render(0, !0), a._enabled(!0), r = h.length; --r > -1;)
						if ((o = Q(h[r], u[r], c[r])).firstMPT) {
							o = o.difs;
							for (s in n) d[s] && (o[s] = n[s]);
							l.push(e.to(h[r], i, o))
						}
					return l
				}, t.activate([s]), s
			}, !0),
			function () {
				var t = window._gsDefine.plugin({
					propName: "roundProps",
					priority: -1,
					API: 2,
					init: function (t, e, i) {
						return this._tween = i, !0
					}
				}).prototype;
				t._onInitAllProps = function () {
					for (var t, e, i, n = this._tween, r = n.vars.roundProps instanceof Array ? n.vars.roundProps : n.vars.roundProps.split(","), o = r.length, s = {}, a = n._propLookup.roundProps; --o > -1;) s[r[o]] = 1;
					for (o = r.length; --o > -1;)
						for (t = r[o], e = n._firstPT; e;) i = e._next, e.pg ? e.t._roundProps(s, !0) : e.n === t && (this._add(e.t, t, e.s, e.c), i && (i._prev = e._prev), e._prev ? e._prev._next = i : n._firstPT === e && (n._firstPT = i), e._next = e._prev = null, n._propLookup[t] = a), e = i;
					return !1
				}, t._add = function (t, e, i, n) {
					this._addTween(t, e, i, i + n, e, !0), this._overwriteProps.push(e)
				}
			}(), window._gsDefine.plugin({
				propName: "attr",
				API: 2,
				init: function (t, e) {
					var i;
					if ("function" != typeof t.setAttribute) return !1;
					this._target = t, this._proxy = {};
					for (i in e) this._addTween(this._proxy, i, parseFloat(t.getAttribute(i)), e[i], i) && this._overwriteProps.push(i);
					return !0
				},
				set: function (t) {
					this._super.setRatio.call(this, t);
					for (var e, i = this._overwriteProps, n = i.length; --n > -1;) e = i[n], this._target.setAttribute(e, this._proxy[e] + "")
				}
			}), window._gsDefine.plugin({
				propName: "directionalRotation",
				API: 2,
				init: function (t, e) {
					"object" != typeof e && (e = {
						rotation: e
					}), this.finals = {};
					var i, n, r, o, s, a, l = !0 === e.useRadians ? 2 * Math.PI : 360;
					for (i in e) "useRadians" !== i && (a = (e[i] + "").split("_"), n = a[0], r = parseFloat("function" != typeof t[i] ? t[i] : t[i.indexOf("set") || "function" != typeof t["get" + i.substr(3)] ? i : "get" + i.substr(3)]()), o = this.finals[i] = "string" == typeof n && "=" === n.charAt(1) ? r + parseInt(n.charAt(0) + "1", 10) * Number(n.substr(2)) : Number(n) || 0, s = o - r, a.length && (-1 !== (n = a.join("_")).indexOf("short") && (s %= l) !== s % (l / 2) && (s = 0 > s ? s + l : s - l), -1 !== n.indexOf("_cw") && 0 > s ? s = (s + 9999999999 * l) % l - (0 | s / l) * l : -1 !== n.indexOf("ccw") && s > 0 && (s = (s - 9999999999 * l) % l - (0 | s / l) * l)), (s > 1e-6 || -1e-6 > s) && (this._addTween(t, i, r, r + s, i), this._overwriteProps.push(i)));
					return !0
				},
				set: function (t) {
					var e;
					if (1 !== t) this._super.setRatio.call(this, t);
					else
						for (e = this._firstPT; e;) e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p], e = e._next
				}
			})._autoCSS = !0, window._gsDefine("easing.Back", ["easing.Ease"], function (t) {
				var e, i, n, r = window.GreenSockGlobals || window,
					o = r.com.greensock,
					s = 2 * Math.PI,
					a = Math.PI / 2,
					l = o._class,
					u = function (e, i) {
						var n = l("easing." + e, function () {}, !0),
							r = n.prototype = new t;
						return r.constructor = n, r.getRatio = i, n
					},
					c = t.register || function () {},
					h = function (t, e, i, n) {
						var r = l("easing." + t, {
							easeOut: new e,
							easeIn: new i,
							easeInOut: new n
						}, !0);
						return c(r, t), r
					},
					d = function (t, e, i) {
						this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t)
					},
					p = function (e, i) {
						var n = l("easing." + e, function (t) {
								this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
							}, !0),
							r = n.prototype = new t;
						return r.constructor = n, r.getRatio = i, r.config = function (t) {
							return new n(t)
						}, n
					},
					f = h("Back", p("BackOut", function (t) {
						return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
					}), p("BackIn", function (t) {
						return t * t * ((this._p1 + 1) * t - this._p1)
					}), p("BackInOut", function (t) {
						return 1 > (t *= 2) ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
					})),
					m = l("easing.SlowMo", function (t, e, i) {
						e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = !0 === i
					}, !0),
					g = m.prototype = new t;
				return g.constructor = m, g.getRatio = function (t) {
					var e = t + (.5 - t) * this._p;
					return this._p1 > t ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
				}, m.ease = new m(.7, .7), g.config = m.config = function (t, e, i) {
					return new m(t, e, i)
				}, e = l("easing.SteppedEase", function (t) {
					t = t || 1, this._p1 = 1 / t, this._p2 = t + 1
				}, !0), g = e.prototype = new t, g.constructor = e, g.getRatio = function (t) {
					return 0 > t ? t = 0 : t >= 1 && (t = .999999999), (this._p2 * t >> 0) * this._p1
				}, g.config = e.config = function (t) {
					return new e(t)
				}, i = l("easing.RoughEase", function (e) {
					for (var i, n, r, o, s, a, l = (e = e || {}).taper || "none", u = [], c = 0, h = 0 | (e.points || 20), p = h, f = !1 !== e.randomize, m = !0 === e.clamp, g = e.template instanceof t ? e.template : null, v = "number" == typeof e.strength ? .4 * e.strength : .4; --p > -1;) i = f ? Math.random() : 1 / h * p, n = g ? g.getRatio(i) : i, "none" === l ? r = v : "out" === l ? (o = 1 - i, r = o * o * v) : "in" === l ? r = i * i * v : .5 > i ? (o = 2 * i, r = .5 * o * o * v) : (o = 2 * (1 - i), r = .5 * o * o * v), f ? n += Math.random() * r - .5 * r : p % 2 ? n += .5 * r : n -= .5 * r, m && (n > 1 ? n = 1 : 0 > n && (n = 0)), u[c++] = {
						x: i,
						y: n
					};
					for (u.sort(function (t, e) {
							return t.x - e.x
						}), a = new d(1, 1, null), p = h; --p > -1;) s = u[p], a = new d(s.x, s.y, a);
					this._prev = new d(0, 0, 0 !== a.t ? a : a.next)
				}, !0), g = i.prototype = new t, g.constructor = i, g.getRatio = function (t) {
					var e = this._prev;
					if (t > e.t) {
						for (; e.next && t >= e.t;) e = e.next;
						e = e.prev
					} else
						for (; e.prev && e.t >= t;) e = e.prev;
					return this._prev = e, e.v + (t - e.t) / e.gap * e.c
				}, g.config = function (t) {
					return new i(t)
				}, i.ease = new i, h("Bounce", u("BounceOut", function (t) {
					return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
				}), u("BounceIn", function (t) {
					return 1 / 2.75 > (t = 1 - t) ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
				}), u("BounceInOut", function (t) {
					var e = .5 > t;
					return t = e ? 1 - 2 * t : 2 * t - 1, t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
				})), h("Circ", u("CircOut", function (t) {
					return Math.sqrt(1 - (t -= 1) * t)
				}), u("CircIn", function (t) {
					return -(Math.sqrt(1 - t * t) - 1)
				}), u("CircInOut", function (t) {
					return 1 > (t *= 2) ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
				})), n = function (e, i, n) {
					var r = l("easing." + e, function (t, e) {
							this._p1 = t || 1, this._p2 = e || n, this._p3 = this._p2 / s * (Math.asin(1 / this._p1) || 0)
						}, !0),
						o = r.prototype = new t;
					return o.constructor = r, o.getRatio = i, o.config = function (t, e) {
						return new r(t, e)
					}, r
				}, h("Elastic", n("ElasticOut", function (t) {
					return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * s / this._p2) + 1
				}, .3), n("ElasticIn", function (t) {
					return -this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * s / this._p2)
				}, .3), n("ElasticInOut", function (t) {
					return 1 > (t *= 2) ? -.5 * this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * s / this._p2) : .5 * this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * s / this._p2) + 1
				}, .45)), h("Expo", u("ExpoOut", function (t) {
					return 1 - Math.pow(2, -10 * t)
				}), u("ExpoIn", function (t) {
					return Math.pow(2, 10 * (t - 1)) - .001
				}), u("ExpoInOut", function (t) {
					return 1 > (t *= 2) ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
				})), h("Sine", u("SineOut", function (t) {
					return Math.sin(t * a)
				}), u("SineIn", function (t) {
					return 1 - Math.cos(t * a)
				}), u("SineInOut", function (t) {
					return -.5 * (Math.cos(Math.PI * t) - 1)
				})), l("easing.EaseLookup", {
					find: function (e) {
						return t.map[e]
					}
				}, !0), c(r.SlowMo, "SlowMo", "ease,"), c(i, "RoughEase", "ease,"), c(e, "SteppedEase", "ease,"), f
			}, !0)
	}),
	function (t) {
		"use strict";
		var e = t.GreenSockGlobals || t;
		if (!e.TweenLite) {
			var i, n, r, o, s, a = function (t) {
					var i, n = t.split("."),
						r = e;
					for (i = 0; n.length > i; i++) r[n[i]] = r = r[n[i]] || {};
					return r
				},
				l = a("com.greensock"),
				u = 1e-10,
				c = [].slice,
				h = function () {},
				d = function () {
					var t = Object.prototype.toString,
						e = t.call([]);
					return function (i) {
						return i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e
					}
				}(),
				p = {},
				f = function (i, n, r, o) {
					this.sc = p[i] ? p[i].sc : [], p[i] = this, this.gsClass = null, this.func = r;
					var s = [];
					this.check = function (l) {
						for (var u, c, h, d, m = n.length, g = m; --m > -1;)(u = p[n[m]] || new f(n[m], [])).gsClass ? (s[m] = u.gsClass, g--) : l && u.sc.push(this);
						if (0 === g && r)
							for (c = ("com.greensock." + i).split("."), h = c.pop(), d = a(c.join("."))[h] = this.gsClass = r.apply(r, s), o && (e[h] = d, "function" == typeof define && define.amd ? define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + i.split(".").join("/"), [], function () {
									return d
								}) : "undefined" != typeof module && module.exports && (module.exports = d)), m = 0; this.sc.length > m; m++) this.sc[m].check()
					}, this.check(!0)
				},
				m = t._gsDefine = function (t, e, i, n) {
					return new f(t, e, i, n)
				},
				g = l._class = function (t, e, i) {
					return e = e || function () {}, m(t, [], function () {
						return e
					}, i), e
				};
			m.globals = e;
			var v = [0, 0, 1, 1],
				_ = [],
				y = g("easing.Ease", function (t, e, i, n) {
					this._func = t, this._type = i || 0, this._power = n || 0, this._params = e ? v.concat(e) : v
				}, !0),
				x = y.map = {},
				b = y.register = function (t, e, i, n) {
					for (var r, o, s, a, u = e.split(","), c = u.length, h = (i || "easeIn,easeOut,easeInOut").split(","); --c > -1;)
						for (o = u[c], r = n ? g("easing." + o, null, !0) : l.easing[o] || {}, s = h.length; --s > -1;) a = h[s], x[o + "." + a] = x[a + o] = r[a] = t.getRatio ? t : t[a] || new t
				};
			for ((r = y.prototype)._calcEnd = !1, r.getRatio = function (t) {
					if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
					var e = this._type,
						i = this._power,
						n = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
					return 1 === i ? n *= n : 2 === i ? n *= n * n : 3 === i ? n *= n * n * n : 4 === i && (n *= n * n * n * n), 1 === e ? 1 - n : 2 === e ? n : .5 > t ? n / 2 : 1 - n / 2
				}, n = (i = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"]).length; --n > -1;) r = i[n] + ",Power" + n, b(new y(null, null, 1, n), r, "easeOut", !0), b(new y(null, null, 2, n), r, "easeIn" + (0 === n ? ",easeNone" : "")), b(new y(null, null, 3, n), r, "easeInOut");
			x.linear = l.easing.Linear.easeIn, x.swing = l.easing.Quad.easeInOut;
			var w = g("events.EventDispatcher", function (t) {
				this._listeners = {}, this._eventTarget = t || this
			});
			(r = w.prototype).addEventListener = function (t, e, i, n, r) {
				r = r || 0;
				var a, l, u = this._listeners[t],
					c = 0;
				for (null == u && (this._listeners[t] = u = []), l = u.length; --l > -1;) a = u[l], a.c === e && a.s === i ? u.splice(l, 1) : 0 === c && r > a.pr && (c = l + 1);
				u.splice(c, 0, {
					c: e,
					s: i,
					up: n,
					pr: r
				}), this !== o || s || o.wake()
			}, r.removeEventListener = function (t, e) {
				var i, n = this._listeners[t];
				if (n)
					for (i = n.length; --i > -1;)
						if (n[i].c === e) return void n.splice(i, 1)
			}, r.dispatchEvent = function (t) {
				var e, i, n, r = this._listeners[t];
				if (r)
					for (e = r.length, i = this._eventTarget; --e > -1;) n = r[e], n.up ? n.c.call(n.s || i, {
						type: t,
						target: i
					}) : n.c.call(n.s || i)
			};
			var T = t.requestAnimationFrame,
				C = t.cancelAnimationFrame,
				S = Date.now || function () {
					return (new Date).getTime()
				},
				E = S();
			for (n = (i = ["ms", "moz", "webkit", "o"]).length; --n > -1 && !T;) T = t[i[n] + "RequestAnimationFrame"], C = t[i[n] + "CancelAnimationFrame"] || t[i[n] + "CancelRequestAnimationFrame"];
			g("Ticker", function (t, e) {
				var i, n, r, a, l, u = this,
					c = S(),
					d = !1 !== e && T,
					p = function (t) {
						E = S(), u.time = (E - c) / 1e3;
						var e, o = u.time - l;
						(!i || o > 0 || !0 === t) && (u.frame++, l += o + (o >= a ? .004 : a - o), e = !0), !0 !== t && (r = n(p)), e && u.dispatchEvent("tick")
					};
				w.call(u), u.time = u.frame = 0, u.tick = function () {
					p(!0)
				}, u.sleep = function () {
					null != r && (d && C ? C(r) : clearTimeout(r), n = h, r = null, u === o && (s = !1))
				}, u.wake = function () {
					null !== r && u.sleep(), n = 0 === i ? h : d && T ? T : function (t) {
						return setTimeout(t, 0 | 1e3 * (l - u.time) + 1)
					}, u === o && (s = !0), p(2)
				}, u.fps = function (t) {
					return arguments.length ? (i = t, a = 1 / (i || 60), l = this.time + a, void u.wake()) : i
				}, u.useRAF = function (t) {
					return arguments.length ? (u.sleep(), d = t, void u.fps(i)) : d
				}, u.fps(t), setTimeout(function () {
					d && (!r || 5 > u.frame) && u.useRAF(!1)
				}, 1500)
			}), (r = l.Ticker.prototype = new l.events.EventDispatcher).constructor = l.Ticker;
			var k = g("core.Animation", function (t, e) {
				if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = !0 === e.immediateRender, this.data = e.data, this._reversed = !0 === e.reversed, z) {
					s || o.wake();
					var i = this.vars.useFrames ? F : z;
					i.add(this, i._time), this.vars.paused && this.paused(!0)
				}
			});
			o = k.ticker = new l.Ticker, (r = k.prototype)._dirty = r._gc = r._initted = r._paused = !1, r._totalTime = r._time = 0, r._rawPrevTime = -1, r._next = r._last = r._onUpdate = r._timeline = r.timeline = null, r._paused = !1;
			var O = function () {
				s && S() - E > 2e3 && o.wake(), setTimeout(O, 2e3)
			};
			O(), r.play = function (t, e) {
				return arguments.length && this.seek(t, e), this.reversed(!1).paused(!1)
			}, r.pause = function (t, e) {
				return arguments.length && this.seek(t, e), this.paused(!0)
			}, r.resume = function (t, e) {
				return arguments.length && this.seek(t, e), this.paused(!1)
			}, r.seek = function (t, e) {
				return this.totalTime(Number(t), !1 !== e)
			}, r.restart = function (t, e) {
				return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, !1 !== e, !0)
			}, r.reverse = function (t, e) {
				return arguments.length && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
			}, r.render = function () {}, r.invalidate = function () {
				return this
			}, r.isActive = function () {
				var t, e = this._timeline,
					i = this._startTime;
				return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime()) >= i && i + this.totalDuration() / this._timeScale > t
			}, r._enabled = function (t, e) {
				return s || o.wake(), this._gc = !t, this._active = this.isActive(), !0 !== e && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
			}, r._kill = function () {
				return this._enabled(!1, !1)
			}, r.kill = function (t, e) {
				return this._kill(t, e), this
			}, r._uncache = function (t) {
				for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline;
				return this
			}, r._swapSelfInParams = function (t) {
				for (var e = t.length, i = t.concat(); --e > -1;) "{self}" === t[e] && (i[e] = this);
				return i
			}, r.eventCallback = function (t, e, i, n) {
				if ("on" === (t || "").substr(0, 2)) {
					var r = this.vars;
					if (1 === arguments.length) return r[t];
					null == e ? delete r[t] : (r[t] = e, r[t + "Params"] = d(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, r[t + "Scope"] = n), "onUpdate" === t && (this._onUpdate = e)
				}
				return this
			}, r.delay = function (t) {
				return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
			}, r.duration = function (t) {
				return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
			}, r.totalDuration = function (t) {
				return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
			}, r.time = function (t, e) {
				return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
			}, r.totalTime = function (t, e, i) {
				if (s || o.wake(), !arguments.length) return this._totalTime;
				if (this._timeline) {
					if (0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
						this._dirty && this.totalDuration();
						var n = this._totalDuration,
							r = this._timeline;
						if (t > n && !i && (t = n), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? n - t : t) / this._timeScale, r._dirty || this._uncache(!1), r._timeline)
							for (; r._timeline;) r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), r = r._timeline
					}
					this._gc && this._enabled(!0, !1), (this._totalTime !== t || 0 === this._duration) && this.render(t, e, !1)
				}
				return this
			}, r.progress = r.totalProgress = function (t, e) {
				return arguments.length ? this.totalTime(this.duration() * t, e) : this._time / this.duration()
			}, r.startTime = function (t) {
				return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
			}, r.timeScale = function (t) {
				if (!arguments.length) return this._timeScale;
				if (t = t || u, this._timeline && this._timeline.smoothChildTiming) {
					var e = this._pauseTime,
						i = e || 0 === e ? e : this._timeline.totalTime();
					this._startTime = i - (i - this._startTime) * this._timeScale / t
				}
				return this._timeScale = t, this._uncache(!1)
			}, r.reversed = function (t) {
				return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._totalTime, !0)), this) : this._reversed
			}, r.paused = function (t) {
				if (!arguments.length) return this._paused;
				if (t != this._paused && this._timeline) {
					s || t || o.wake();
					var e = this._timeline,
						i = e.rawTime(),
						n = i - this._pauseTime;
					!t && e.smoothChildTiming && (this._startTime += n, this._uncache(!1)), this._pauseTime = t ? i : null, this._paused = t, this._active = this.isActive(), !t && 0 !== n && this._initted && this.duration() && this.render(e.smoothChildTiming ? this._totalTime : (i - this._startTime) / this._timeScale, !0, !0)
				}
				return this._gc && !t && this._enabled(!0, !1), this
			};
			var D = g("core.SimpleTimeline", function (t) {
				k.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
			});
			(r = D.prototype = new k).constructor = D, r.kill()._gc = !1, r._first = r._last = null, r._sortChildren = !1, r.add = r.insert = function (t, e) {
				var i, n;
				if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), i = this._last, this._sortChildren)
					for (n = t._startTime; i && i._startTime > n;) i = i._prev;
				return i ? (t._next = i._next, i._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = i, this._timeline && this._uncache(!0), this
			}, r._remove = function (t, e) {
				return t.timeline === this && (e || t._enabled(!1, !0), t.timeline = null, t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), this._timeline && this._uncache(!0)), this
			}, r.render = function (t, e, i) {
				var n, r = this._first;
				for (this._totalTime = this._time = this._rawPrevTime = t; r;) n = r._next, (r._active || t >= r._startTime && !r._paused) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = n
			}, r.rawTime = function () {
				return s || o.wake(), this._totalTime
			};
			var A = g("TweenLite", function (e, i, n) {
					if (k.call(this, i, n), this.render = A.prototype.render, null == e) throw "Cannot tween a null target.";
					this.target = e = "string" != typeof e ? e : A.selector(e) || e;
					var r, o, s, a = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType),
						l = this.vars.overwrite;
					if (this._overwrite = l = null == l ? L[A.defaultOverwrite] : "number" == typeof l ? l >> 0 : L[l], (a || e instanceof Array || e.push && d(e)) && "number" != typeof e[0])
						for (this._targets = s = c.call(e, 0), this._propLookup = [], this._siblings = [], r = 0; s.length > r; r++) o = s[r], o ? "string" != typeof o ? o.length && o !== t && o[0] && (o[0] === t || o[0].nodeType && o[0].style && !o.nodeType) ? (s.splice(r--, 1), this._targets = s = s.concat(c.call(o, 0))) : (this._siblings[r] = H(o, this, !1), 1 === l && this._siblings[r].length > 1 && $(o, this, null, 1, this._siblings[r])) : "string" == typeof (o = s[r--] = A.selector(o)) && s.splice(r + 1, 1) : s.splice(r--, 1);
					else this._propLookup = {}, this._siblings = H(e, this, !1), 1 === l && this._siblings.length > 1 && $(e, this, null, 1, this._siblings);
					(this.vars.immediateRender || 0 === i && 0 === this._delay && !1 !== this.vars.immediateRender) && this.render(-this._delay, !1, !0)
				}, !0),
				P = function (e) {
					return e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
				},
				M = function (t, e) {
					var i, n = {};
					for (i in t) R[i] || i in e && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!j[i] || j[i] && j[i]._autoCSS) || (n[i] = t[i], delete t[i]);
					t.css = n
				};
			(r = A.prototype = new k).constructor = A, r.kill()._gc = !1, r.ratio = 0, r._firstPT = r._targets = r._overwrittenProps = r._startAt = null, r._notifyPluginsOfEnabled = !1, A.version = "1.11.2", A.defaultEase = r._ease = new y(null, null, 1, 1), A.defaultOverwrite = "auto", A.ticker = o, A.autoSleep = !0, A.selector = t.$ || t.jQuery || function (e) {
				return t.$ ? (A.selector = t.$, t.$(e)) : t.document ? t.document.getElementById("#" === e.charAt(0) ? e.substr(1) : e) : e
			};
			var I = A._internals = {
					isArray: d,
					isSelector: P
				},
				j = A._plugins = {},
				N = A._tweenLookup = {},
				B = 0,
				R = I.reservedProps = {
					ease: 1,
					delay: 1,
					overwrite: 1,
					onComplete: 1,
					onCompleteParams: 1,
					onCompleteScope: 1,
					useFrames: 1,
					runBackwards: 1,
					startAt: 1,
					onUpdate: 1,
					onUpdateParams: 1,
					onUpdateScope: 1,
					onStart: 1,
					onStartParams: 1,
					onStartScope: 1,
					onReverseComplete: 1,
					onReverseCompleteParams: 1,
					onReverseCompleteScope: 1,
					onRepeat: 1,
					onRepeatParams: 1,
					onRepeatScope: 1,
					easeParams: 1,
					yoyo: 1,
					immediateRender: 1,
					repeat: 1,
					repeatDelay: 1,
					data: 1,
					paused: 1,
					reversed: 1,
					autoCSS: 1
				},
				L = {
					none: 0,
					all: 1,
					auto: 2,
					concurrent: 3,
					allOnStart: 4,
					preexisting: 5,
					true: 1,
					false: 0
				},
				F = k._rootFramesTimeline = new D,
				z = k._rootTimeline = new D;
			z._startTime = o.time, F._startTime = o.frame, z._active = F._active = !0, k._updateRoot = function () {
				if (z.render((o.time - z._startTime) * z._timeScale, !1, !1), F.render((o.frame - F._startTime) * F._timeScale, !1, !1), !(o.frame % 120)) {
					var t, e, i;
					for (i in N) {
						for (t = (e = N[i].tweens).length; --t > -1;) e[t]._gc && e.splice(t, 1);
						0 === e.length && delete N[i]
					}
					if ((!(i = z._first) || i._paused) && A.autoSleep && !F._first && 1 === o._listeners.tick.length) {
						for (; i && i._paused;) i = i._next;
						i || o.sleep()
					}
				}
			}, o.addEventListener("tick", k._updateRoot);
			var H = function (t, e, i) {
					var n, r, o = t._gsTweenID;
					if (N[o || (t._gsTweenID = o = "t" + B++)] || (N[o] = {
							target: t,
							tweens: []
						}), e && (n = N[o].tweens, n[r = n.length] = e, i))
						for (; --r > -1;) n[r] === e && n.splice(r, 1);
					return N[o].tweens
				},
				$ = function (t, e, i, n, r) {
					var o, s, a, l;
					if (1 === n || n >= 4) {
						for (l = r.length, o = 0; l > o; o++)
							if ((a = r[o]) !== e) a._gc || a._enabled(!1, !1) && (s = !0);
							else if (5 === n) break;
						return s
					}
					var c, h = e._startTime + u,
						d = [],
						p = 0,
						f = 0 === e._duration;
					for (o = r.length; --o > -1;)(a = r[o]) === e || a._gc || a._paused || (a._timeline !== e._timeline ? (c = c || q(e, 0, f), 0 === q(a, c, f) && (d[p++] = a)) : h >= a._startTime && a._startTime + a.totalDuration() / a._timeScale + u > h && ((f || !a._initted) && 2e-10 >= h - a._startTime || (d[p++] = a)));
					for (o = p; --o > -1;) a = d[o], 2 === n && a._kill(i, t) && (s = !0), (2 !== n || !a._firstPT && a._initted) && a._enabled(!1, !1) && (s = !0);
					return s
				},
				q = function (t, e, i) {
					for (var n = t._timeline, r = n._timeScale, o = t._startTime; n._timeline;) {
						if (o += n._startTime, r *= n._timeScale, n._paused) return -100;
						n = n._timeline
					}
					return o /= r, o > e ? o - e : i && o === e || !t._initted && 2 * u > o - e ? u : (o += t.totalDuration() / t._timeScale / r) > e + u ? 0 : o - e - u
				};
			r._init = function () {
				var t, e, i, n, r = this.vars,
					o = this._overwrittenProps,
					s = this._duration,
					a = r.immediateRender,
					l = r.ease;
				if (r.startAt) {
					if (this._startAt && this._startAt.render(-1, !0), r.startAt.overwrite = 0, r.startAt.immediateRender = !0, this._startAt = A.to(this.target, 0, r.startAt), a)
						if (this._time > 0) this._startAt = null;
						else if (0 !== s) return
				} else if (r.runBackwards && 0 !== s)
					if (this._startAt) this._startAt.render(-1, !0), this._startAt = null;
					else {
						i = {};
						for (n in r) R[n] && "autoCSS" !== n || (i[n] = r[n]);
						if (i.overwrite = 0, i.data = "isFromStart", this._startAt = A.to(this.target, 0, i), r.immediateRender) {
							if (0 === this._time) return
						} else this._startAt.render(-1, !0)
					}
				if (this._ease = l ? l instanceof y ? r.easeParams instanceof Array ? l.config.apply(l, r.easeParams) : l : "function" == typeof l ? new y(l, r.easeParams) : x[l] || A.defaultEase : A.defaultEase, this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
					for (t = this._targets.length; --t > -1;) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], o ? o[t] : null) && (e = !0);
				else e = this._initProps(this.target, this._propLookup, this._siblings, o);
				if (e && A._onPluginEvent("_onInitAllProps", this), o && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), r.runBackwards)
					for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
				this._onUpdate = r.onUpdate, this._initted = !0
			}, r._initProps = function (e, i, n, r) {
				var o, s, a, l, u, c;
				if (null == e) return !1;
				this.vars.css || e.style && e !== t && e.nodeType && j.css && !1 !== this.vars.autoCSS && M(this.vars, e);
				for (o in this.vars) {
					if (c = this.vars[o], R[o]) c && (c instanceof Array || c.push && d(c)) && -1 !== c.join("").indexOf("{self}") && (this.vars[o] = c = this._swapSelfInParams(c, this));
					else if (j[o] && (l = new j[o])._onInitTween(e, this.vars[o], this)) {
						for (this._firstPT = u = {
								_next: this._firstPT,
								t: l,
								p: "setRatio",
								s: 0,
								c: 1,
								f: !0,
								n: o,
								pg: !0,
								pr: l._priority
							}, s = l._overwriteProps.length; --s > -1;) i[l._overwriteProps[s]] = this._firstPT;
						(l._priority || l._onInitAllProps) && (a = !0), (l._onDisable || l._onEnable) && (this._notifyPluginsOfEnabled = !0)
					} else this._firstPT = i[o] = u = {
						_next: this._firstPT,
						t: e,
						p: o,
						f: "function" == typeof e[o],
						n: o,
						pg: !1,
						pr: 0
					}, u.s = u.f ? e[o.indexOf("set") || "function" != typeof e["get" + o.substr(3)] ? o : "get" + o.substr(3)]() : parseFloat(e[o]), u.c = "string" == typeof c && "=" === c.charAt(1) ? parseInt(c.charAt(0) + "1", 10) * Number(c.substr(2)) : Number(c) - u.s || 0;
					u && u._next && (u._next._prev = u)
				}
				return r && this._kill(r, e) ? this._initProps(e, i, n, r) : this._overwrite > 1 && this._firstPT && n.length > 1 && $(e, this, i, this._overwrite, n) ? (this._kill(i, e), this._initProps(e, i, n, r)) : a
			}, r.render = function (t, e, i) {
				var n, r, o, s, a = this._time,
					l = this._duration;
				if (t >= l) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (n = !0, r = "onComplete"), 0 === l && (s = this._rawPrevTime, (0 === t || 0 > s || s === u) && s !== t && (i = !0, s > u && (r = "onReverseComplete")), this._rawPrevTime = s = !e || t ? t : u);
				else if (1e-7 > t) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== a || 0 === l && this._rawPrevTime > u) && (r = "onReverseComplete", n = this._reversed), 0 > t ? (this._active = !1, 0 === l && (this._rawPrevTime >= 0 && (i = !0), this._rawPrevTime = s = !e || t ? t : u)) : this._initted || (i = !0);
				else if (this._totalTime = this._time = t, this._easeType) {
					var c = t / l,
						h = this._easeType,
						d = this._easePower;
					(1 === h || 3 === h && c >= .5) && (c = 1 - c), 3 === h && (c *= 2), 1 === d ? c *= c : 2 === d ? c *= c * c : 3 === d ? c *= c * c * c : 4 === d && (c *= c * c * c * c), this.ratio = 1 === h ? 1 - c : 2 === h ? c : .5 > t / l ? c / 2 : 1 - c / 2
				} else this.ratio = this._ease.getRatio(t / l);
				if (this._time !== a || i) {
					if (!this._initted) {
						if (this._init(), !this._initted || this._gc) return;
						this._time && !n ? this.ratio = this._ease.getRatio(this._time / l) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
					}
					for (this._active || !this._paused && this._time !== a && t >= 0 && (this._active = !0), 0 === a && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === l) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _))), o = this._firstPT; o;) o.f ? o.t[o.p](o.c * this.ratio + o.s) : o.t[o.p] = o.c * this.ratio + o.s, o = o._next;
					this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, i), e || i && 0 === this._time && 0 === a || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _)), r && (this._gc || (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this.vars[r].apply(this.vars[r + "Scope"] || this, this.vars[r + "Params"] || _), 0 === l && this._rawPrevTime === u && s !== u && (this._rawPrevTime = 0)))
				}
			}, r._kill = function (t, e) {
				if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._enabled(!1, !1);
				e = "string" != typeof e ? e || this._targets || this.target : A.selector(e) || e;
				var i, n, r, o, s, a, l, u;
				if ((d(e) || P(e)) && "number" != typeof e[0])
					for (i = e.length; --i > -1;) this._kill(t, e[i]) && (a = !0);
				else {
					if (this._targets) {
						for (i = this._targets.length; --i > -1;)
							if (e === this._targets[i]) {
								s = this._propLookup[i] || {}, this._overwrittenProps = this._overwrittenProps || [], n = this._overwrittenProps[i] = t ? this._overwrittenProps[i] || {} : "all";
								break
							}
					} else {
						if (e !== this.target) return !1;
						s = this._propLookup, n = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
					}
					if (s) {
						l = t || s, u = t !== n && "all" !== n && t !== s && ("object" != typeof t || !t._tempKill);
						for (r in l)(o = s[r]) && (o.pg && o.t._kill(l) && (a = !0), o.pg && 0 !== o.t._overwriteProps.length || (o._prev ? o._prev._next = o._next : o === this._firstPT && (this._firstPT = o._next), o._next && (o._next._prev = o._prev), o._next = o._prev = null), delete s[r]), u && (n[r] = 1);
						!this._firstPT && this._initted && this._enabled(!1, !1)
					}
				}
				return a
			}, r.invalidate = function () {
				return this._notifyPluginsOfEnabled && A._onPluginEvent("_onDisable", this), this._firstPT = null, this._overwrittenProps = null, this._onUpdate = null, this._startAt = null, this._initted = this._active = this._notifyPluginsOfEnabled = !1, this._propLookup = this._targets ? {} : [], this
			}, r._enabled = function (t, e) {
				if (s || o.wake(), t && this._gc) {
					var i, n = this._targets;
					if (n)
						for (i = n.length; --i > -1;) this._siblings[i] = H(n[i], this, !0);
					else this._siblings = H(this.target, this, !0)
				}
				return k.prototype._enabled.call(this, t, e), !(!this._notifyPluginsOfEnabled || !this._firstPT) && A._onPluginEvent(t ? "_onEnable" : "_onDisable", this)
			}, A.to = function (t, e, i) {
				return new A(t, e, i)
			}, A.from = function (t, e, i) {
				return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new A(t, e, i)
			}, A.fromTo = function (t, e, i, n) {
				return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new A(t, e, n)
			}, A.delayedCall = function (t, e, i, n, r) {
				return new A(e, 0, {
					delay: t,
					onComplete: e,
					onCompleteParams: i,
					onCompleteScope: n,
					onReverseComplete: e,
					onReverseCompleteParams: i,
					onReverseCompleteScope: n,
					immediateRender: !1,
					useFrames: r,
					overwrite: 0
				})
			}, A.set = function (t, e) {
				return new A(t, 0, e)
			}, A.getTweensOf = function (t, e) {
				if (null == t) return [];
				t = "string" != typeof t ? t : A.selector(t) || t;
				var i, n, r, o;
				if ((d(t) || P(t)) && "number" != typeof t[0]) {
					for (i = t.length, n = []; --i > -1;) n = n.concat(A.getTweensOf(t[i], e));
					for (i = n.length; --i > -1;)
						for (o = n[i], r = i; --r > -1;) o === n[r] && n.splice(i, 1)
				} else
					for (n = H(t).concat(), i = n.length; --i > -1;)(n[i]._gc || e && !n[i].isActive()) && n.splice(i, 1);
				return n
			}, A.killTweensOf = A.killDelayedCallsTo = function (t, e, i) {
				"object" == typeof e && (i = e, e = !1);
				for (var n = A.getTweensOf(t, e), r = n.length; --r > -1;) n[r]._kill(i, t)
			};
			var U = g("plugins.TweenPlugin", function (t, e) {
				this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = U.prototype
			}, !0);
			if (r = U.prototype, U.version = "1.10.1", U.API = 2, r._firstPT = null, r._addTween = function (t, e, i, n, r, o) {
					var s, a;
					return null != n && (s = "number" == typeof n || "=" !== n.charAt(1) ? Number(n) - i : parseInt(n.charAt(0) + "1", 10) * Number(n.substr(2))) ? (this._firstPT = a = {
						_next: this._firstPT,
						t: t,
						p: e,
						s: i,
						c: s,
						f: "function" == typeof t[e],
						n: r || e,
						r: o
					}, a._next && (a._next._prev = a), a) : void 0
				}, r.setRatio = function (t) {
					for (var e, i = this._firstPT; i;) e = i.c * t + i.s, i.r ? e = 0 | e + (e > 0 ? .5 : -.5) : 1e-6 > e && e > -1e-6 && (e = 0), i.f ? i.t[i.p](e) : i.t[i.p] = e, i = i._next
				}, r._kill = function (t) {
					var e, i = this._overwriteProps,
						n = this._firstPT;
					if (null != t[this._propName]) this._overwriteProps = [];
					else
						for (e = i.length; --e > -1;) null != t[i[e]] && i.splice(e, 1);
					for (; n;) null != t[n.n] && (n._next && (n._next._prev = n._prev), n._prev ? (n._prev._next = n._next, n._prev = null) : this._firstPT === n && (this._firstPT = n._next)), n = n._next;
					return !1
				}, r._roundProps = function (t, e) {
					for (var i = this._firstPT; i;)(t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && (i.r = e), i = i._next
				}, A._onPluginEvent = function (t, e) {
					var i, n, r, o, s, a = e._firstPT;
					if ("_onInitAllProps" === t) {
						for (; a;) {
							for (s = a._next, n = r; n && n.pr > a.pr;) n = n._next;
							(a._prev = n ? n._prev : o) ? a._prev._next = a: r = a, (a._next = n) ? n._prev = a : o = a, a = s
						}
						a = e._firstPT = r
					}
					for (; a;) a.pg && "function" == typeof a.t[t] && a.t[t]() && (i = !0), a = a._next;
					return i
				}, U.activate = function (t) {
					for (var e = t.length; --e > -1;) t[e].API === U.API && (j[(new t[e])._propName] = t[e]);
					return !0
				}, m.plugin = function (t) {
					if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";
					var e, i = t.propName,
						n = t.priority || 0,
						r = t.overwriteProps,
						o = {
							init: "_onInitTween",
							set: "setRatio",
							kill: "_kill",
							round: "_roundProps",
							initAll: "_onInitAllProps"
						},
						s = g("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function () {
							U.call(this, i, n), this._overwriteProps = r || []
						}, !0 === t.global),
						a = s.prototype = new U(i);
					a.constructor = s, s.API = t.API;
					for (e in o) "function" == typeof t[e] && (a[o[e]] = t[e]);
					return s.version = t.version, U.activate([s]), s
				}, i = t._gsQueue) {
				for (n = 0; i.length > n; n++) i[n]();
				for (r in p) p[r].func || t.console.log("GSAP encountered missing dependency: com.greensock." + r)
			}
			s = !1
		}
	}(window),
	function (t) {
		function e() {}
		var i = navigator.userAgent;
		e.isFirefox = i.indexOf("firefox") >= 0, e.isAndroid = i.indexOf("Android") >= 0, e.androidVer = e.isAndroid ? parseFloat(i.slice(i.indexOf("Android") + 8)) : null, e.objectToString = function (t) {
			return "{" + function (t) {
				var e, i = [];
				for (var n in t) t.hasOwnProperty(n) && ((e = t[n]) && "object" == typeof e ? i[i.length] = n + ":{ " + arguments.callee(e).join(", ") + "}" : "string" == typeof e ? i[i.length] = [n + ': "' + e.toString() + '"'] : null != e && (i[i.length] = [n + ": " + e.toString()]));
				return i
			}(t).join(", ") + "}"
		}, e.getRealValue = function (t) {
			if (val = t, void 0 !== t)
				if (isNaN(Number(t)))
					if (void 0 === t.toLowerCase || "true" != t.toLowerCase() && "false" != t.toLowerCase()) {
						var i = e.getObj(t);
						null != i && (val = i)
					} else val = "true" == t.toLowerCase();
			else val = Number(t);
			return val
		}, e.getObj = function (e) {
			for (var i = t, n = (e = void 0 === e ? "" : e).split("."), r = n.length, o = 0; o < r; o++) void 0 !== i[n[o]] ? i = i[n[o]] : o = r;
			return i = i !== t ? i : null
		}, e.getObjects = function (t) {
			var i, n = t.split(";"),
				r = [],
				o = n.length;
			for (0 == o && (o = (n = t.split(",")).length), i = 0; i < o; i++) {
				var s = e.hyphenToCamelCase(e.trimSpaces(n[i])),
					a = e.getObj(s);
				if (null != a)
					if ($.isArray(a)) {
						var l, u = a.length;
						for (l = 0; l < u; l++) r.push(a[l])
					} else r.push(a)
			}
			return r
		}, e.getScope = function (e) {
			var i = t,
				n = e.split(".");
			if (n.length > 0)
				for (var r = n.length, o = 1; o < r - 1; o++) void 0 !== i[n[o]] ? i = i[n[o]] : o = r;
			return i
		}, e.getParams = function (t) {
			var i = null;
			if (void 0 !== t) {
				i = [];
				var n, r = t.split(",");
				r.length;
				for (n = 0; n < r.length; n++) i.push(e.getRealValue(e.trimSpaces(r[n])))
			}
			return i
		}, e.trimSpaces = function (t) {
			var e = "";
			if (void 0 !== t) {
				var i, n = (e = t).length,
					r = 0,
					o = n - 1;
				for (i = 0; i < n; i++) " " != e.charAt(i) && (r = i, i = n);
				for (i = n - 1; i >= 0; i--) " " != e.charAt(i) && (o = i, i = -1);
				e = e.substr(r, o - r + 1)
			}
			return e
		}, e.getAttrObjectFromString = function (t, i) {
			t = t || "";
			var n = null == i ? {} : i;
			if ("" != t) {
				var r, o = t.split(";"),
					s = o.length;
				for (0 == s && (s = (o = t.split(",")).length), r = 0; r < s; r++) {
					var a = o[r].split(":"),
						l = e.hyphenToCamelCase(e.trimSpaces(a[0])),
						u = e.getRealValue(e.trimSpaces(a[1]));
					"" != l && (n[l] = u)
				}
			}
			return n
		}, e.getChildAttrObjectFromElem = function (t, e) {
			for (var i = {}, n = t.children(), r = n.length, o = 0; o < r; o++)
				if (n.eq(o).is(e))
					for (var s = n.get(o), a = 0; a < s.attributes.length; a++) {
						var l = s.attributes[a];
						i[l.name] = getRealValue(l.value)
					}
			return i
		}, e.hyphenToCamelCase = function (t) {
			return t.replace(/-([a-z])/gi, function (t, e) {
				return e.toUpperCase()
			})
		}, e.preventDefault = function (t) {
			t.preventDefault ? t.preventDefault() : t.returnValue = !1
		}, e.preventGestureDefault = function (t) {
			t.gesture.preventDefault()
		}, e.shuffleArray = function (t) {
			for (var e, i, n = t.length; 0 !== n;) i = Math.floor(Math.random() * n), e = t[n -= 1], t[n] = t[i], t[i] = e;
			return t
		}, e.isSameArray = function (t, e) {
			var i = !0;
			if ($.isArray(t) && $.isArray(e) && t.length == e.length)
				for (var n = 0; n < t.length; n++) t[n] != e[n] && (i = !1, n = t.length);
			else i = !1;
			return i
		}, t.Utils = e
	}(window),
	function (t) {
		function e(i, n, r) {
			function o(t, i) {
				if (!isNaN(t) && Xt) {
					Xt = !1, i = i || !1, t < 0 ? t = 0 : t > n.length - 1 && (t = n.length - 1);
					var r = {
						transformPerspective: 500,
						ease: rt.ease,
						onComplete: W
					};
					if (Rt != t) {
						if (gt = t, i) {
							var o = 0;
							Rt + 1 == gt || rt.loop && Rt == n.length - 1 && 0 == gt ? (Pt ? r.x = -bt : r.marginLeft = -bt, o = rt.animDuration) : (Rt - 1 == gt || rt.loop && 0 == Rt && gt == n.length - 1) && (Pt ? r.x = bt : r.marginLeft = bt, o = rt.animDuration), TweenMax.to(st, o, r)
						} else W();
						Rt = gt, Q(e.INDEX_CHANGE)
					} else Pt ? r.x = 0 : r.marginLeft = 0, r.onCompleteParams = [!1], TweenMax.to(st, rt.animDuration, r)
				}
				return -1 == te ? gt : gt % te
			}

			function s(t, e) {
				e = e || "", P(), n[t].loaded || (rt.loadIndexOnly && t == gt || !rt.loadIndexOnly) && (n[t].image.remove(), n[t].image = null, n[t].image = $("<img alt='" + n[t].caption + "' style='position:absolute; max-width:none;'>").load({
					index: t
				}, M).error({
					index: t
				}, I), dt.append(n[t].image), TweenMax.set(n[t].image, {
					autoAlpha: 0
				}), t == gt && TweenMax.to(n[t].image, 3, {
					onComplete: s,
					onCompleteParams: [t, "(RELOAD)"]
				}), n[t].image.attr("src", n[t].url))
			}

			function a() {
				var t = null;
				return gt >= 0 && gt < n.length && (t = n[gt].caption), t
			}

			function l() {
				d(!0), null !== Gt && Gt.play(0)
			}

			function u() {
				null == Gt && (Gt = TweenMax.to(this, rt.playDuration, {
					onComplete: l
				}), Zt = !0, Q(e.AUTOPLAY))
			}

			function c() {
				null !== Gt && (Gt.kill(), Gt = null, Zt = !1, Q(e.AUTOPLAY))
			}

			function h(t) {
				return void 0 !== t && (t ? u() : c()), Zt
			}

			function d(t) {
				1 == vt && 0 == jt && Xt && 0 == zt && (gt + 1 < n.length || rt.loop) && (t = void 0 !== t && t, o((gt + 1) % n.length, t))
			}

			function p(t) {
				if (1 == vt && 0 == jt && Xt && 0 == zt && (gt - 1 >= 0 || rt.loop)) {
					t = void 0 !== t && t;
					var e = gt;
					e > 0 ? e-- : e = n.length - 1, o(e, t)
				}
			}

			function f() {
				g(vt + rt.zoomStep)
			}

			function m() {
				g(vt - rt.zoomStep)
			}

			function g(t, e) {
				return void 0 !== t && rt.allowZoom && (e = isNaN(e) ? rt.animDuration : e, Y(.5 * J, .5 * K), vt = t, q(), H(), _t = vt, v(e)), vt
			}

			function v(t) {
				var i = {
					transformPerspective: 500,
					position: "absolute",
					ease: rt.ease
				};
				t = isNaN(t) ? rt.animDuration : t, null !== Utils.androidVer && Utils.androidVer < 3 ? (i.width = it, i.height = nt) : i.scale = vt, Pt ? (i.x = Et, i.y = kt) : (i.marginLeft = Et, i.marginTop = kt), TweenMax.to(n[gt].image, t, i), Q(e.ZOOM)
			}

			function _(t, e, i, n) {
				rt.allowZoom && (Vt = ot.offset().left, Yt = ot.offset().top, Y((t.pageX - tt - Et - Vt) / _t, (t.pageY - et - kt - Yt) / _t), e > 0 ? vt += rt.zoomStep : vt -= rt.zoomStep, q(), H(), _t = vt, v())
			}

			function y(t) {
				ee && ((zt = 1) != Ht && C(), Ht = zt)
			}

			function x(t) {
				ee && ((zt = 0) != Ht && C(), Ht = zt)
			}

			function b(t) {
				var e = t.type;
				void 0 !== e && -1 != e.indexOf("ointer") ? "pointerdown" == e || "MSPointerDown" == e ? zt++ : "pointerup" != e && "MSPointerUp" != e || --zt < 0 && (zt = 0) : (zt = t.originalEvent.touches.length) > 0 ? TweenMax.to(ie, 0, {
					onComplete: T
				}) : TweenMax.to(ie, .5, {
					onComplete: w
				}), zt != Ht && C(), Ht = zt
			}

			function w() {
				ct.on("mousedown", y), ct.on("mouseup mouseleave", x), ee = !0
			}

			function T() {
				ct.off("mousedown", y), ct.off("mouseup mouseleave", x), ee = !1
			}

			function C() {
				var t = ($t = zt > 1 ? 2 : zt) != qt;
				1 == zt ? (!Bt && Xt && (Wt = t, D(), E()), 2 == qt && (_t = vt)) : zt > 1 ? !Bt && Xt && (Ut = t, O(), k()) : (D(), O(), S()), qt = $t
			}

			function S() {
				if (Bt) {
					var t = n.length,
						e = gt;
					(e + 1 < t || rt.loop) && jt < -rt.minDragDistance ? e = rt.loop ? (e + 1) % t : e + 1 : (e - 1 >= 0 || rt.loop) && jt > rt.minDragDistance && --e < 0 && (e = t - 1), o(e, !0), Bt = !1
				} else _t = vt;
				k()
			}

			function E() {
				rt.allowDrag && At.on("drag", U)
			}

			function k() {
				rt.allowZoom && (At.on("transform", z), ct.on("mousewheel", _))
			}

			function O() {
				At.off("drag", U)
			}

			function D() {
				At.off("transform", z), ct.off("mousewheel", _)
			}

			function A(t) {
				Jt = 50, Kt = 30, Qt.remove();
				var e = rt.preloaderUrl;
				pt.attr("src", e), ft.attr("src", e), mt.attr("src", e)
			}

			function P(t) {
				var e = .5 * (bt - Jt) + "px",
					i = .5 * (wt - Kt) + "px";
				TweenMax.set([pt, ft, mt], {
					position: "absolute",
					maxWidth: "none",
					x: e,
					y: i,
					transformPerspective: 500
				})
			}

			function M(t) {
				var e = t.data.index;
				n[e].width = n[e].image.width(), n[e].height = n[e].image.height(), n[e].loaded = !0, TweenMax.to(n[e].image, rt.animDuration, {
					autoAlpha: 1,
					ease: rt.ease
				}), e >= gt - 1 && e <= gt + 1 ? (TweenMax.set(n[e].image, {
					display: "block"
				}), j(e), e == gt ? (B(), ft.detach(), ct.append(n[e].image)) : e == gt - 1 ? (pt.detach(), ut.append(n[e].image)) : (mt.detach(), ht.append(n[e].image))) : rt.loop && (e == n.length - 1 && 0 == gt || 0 == e && gt == n.length - 1) ? (TweenMax.set(n[e].image, {
					display: "block"
				}), j(e), e == n.length - 1 ? (pt.detach(), ut.append(n[e].image)) : (mt.detach(), ht.append(n[e].image))) : TweenMax.set(n[e].image, {
					display: "none"
				})
			}

			function I(t) {
				var e = t.data.index;
				n[e].retry < 3 && (n[e].loaded = !1, n[e].image.attr("src", n[e].url), n[e].retry++)
			}

			function j(t) {
				if (t >= 0 && t < n.length && n[t].loaded) {
					0 != n[t].width && 0 != n[t].height || (n[t].width = n[t].image.width(), n[t].height = n[t].image.height());
					var e = n[t].width,
						i = n[t].height,
						r = bt / e,
						o = wt / i,
						s = r;
					i * r > wt && (s = o), (0 == e || 0 == i || isNaN(s)) && (s = 1), newSlideImageWidth = e * s, newSlideImageHeight = i * s, realImageLeft = .5 * (bt - newSlideImageWidth) >> 0, realImageTop = .5 * (wt - newSlideImageHeight) >> 0, t == gt && (yt = e, xt = i, J = newSlideImageWidth, K = newSlideImageHeight, tt = realImageLeft, et = realImageTop);
					var a = {
						width: newSlideImageWidth,
						height: newSlideImageHeight,
						left: realImageLeft + "px",
						top: realImageTop + "px",
						scale: 1,
						transformOrigin: "0 0"
					};
					Pt ? (a.x = 0, a.y = 0) : (a.marginLeft = 0, a.marginTop = 0), TweenMax.set(n[t].image, a)
				}
			}

			function N() {
				if (bt = st.width() + rt.adjustWidth + 2, wt = st.height() + rt.adjustHeight + 2, Mt != bt || It != wt) {
					TweenMax.set([ut, ct, ht], {
						width: bt + "px",
						height: wt + "px"
					}), TweenMax.set([ut], {
						left: -bt - 1 + "px"
					}), TweenMax.set([ht], {
						left: bt - 1 + "px"
					}), 0 != Jt && P(), R(), jt = 0, Nt = 0, B();
					var t = {
						width: "100%",
						height: "100%",
						position: "absolute"
					};
					Pt ? (t.x = 0, t.y = 0) : (t.marginLeft = 0, t.marginTop = 0), TweenMax.set(st, {
						css: t
					}), zt = 0, $t = 0, qt = -1, Bt = !1, Xt = !0, Mt = bt, It = wt
				}
			}

			function B() {
				_t = 1, vt = 1, Et = 0, kt = 0, Tt = {
					spx: 0,
					spy: 0,
					nspx: 0,
					nspy: 0,
					cx: 0,
					cy: 0
				}, Ct = {
					spx: 0,
					spy: 0,
					nspx: 0,
					nspy: 0,
					cx: 0,
					cy: 0
				}, St = {
					spx: 0,
					spy: 0,
					nspx: 0,
					nspy: 0,
					cx: 0,
					cy: 0
				}, Q(e.ZOOM)
			}

			function R() {
				B(), j(gt), gt - 1 >= 0 ? j(gt - 1) : rt.loop && j(n.length - 1), gt + 1 < n.length ? j(gt + 1) : rt.loop && j(0)
			}

			function L() {
				ct.empty(), ut.empty(), ht.empty();
				t = {
					display: "block"
				};
				TweenMax.set(n[gt].image, t), n[gt].loaded || ct.append(ft), s(gt), ct.append(n[gt].image), gt - 1 >= 0 ? (TweenMax.set(n[gt - 1].image, t), n[gt - 1].loaded || ut.append(pt), s(gt - 1), ut.append(n[gt - 1].image)) : rt.loop && 0 == gt && (TweenMax.set(n[n.length - 1].image, t), n[n.length - 1].loaded || ut.append(pt), s(n.length - 1), ut.append(n[n.length - 1].image)), gt + 1 < n.length ? (TweenMax.set(n[gt + 1].image, t), n[gt + 1].loaded || ht.append(mt), s(gt + 1), ht.append(n[gt + 1].image)) : rt.loop && gt == n.length - 1 && (TweenMax.set(n[0].image, t), n[0].loaded || ht.append(mt), s(0), ht.append(n[0].image)), R();
				var t = {
					width: "100%",
					height: "100%",
					position: "absolute"
				};
				Pt ? (t.x = 0, t.y = 0) : (t.marginLeft = 0, t.marginTop = 0), TweenMax.to(st, 0, {
					css: t
				})
			}

			function F(t) {
				Vt = ot.offset().left, Yt = ot.offset().top, Y((t.gesture.touches[0].pageX - tt - Et - Vt) / _t, (t.gesture.touches[0].pageY - et - kt - Yt) / _t), Ut = !1, vt = 1 == _t ? rt.doubleTapZoom : 1, q(), it = J * vt, nt = K * vt, H(), _t = vt, v()
			}

			function z(t) {
				Ut && (Vt = ot.offset().left, Yt = ot.offset().top, Y((t.gesture.center.pageX - tt - Et - Vt) / _t, (t.gesture.center.pageY - et - kt - Yt) / _t), Ut = !1), vt = _t * t.gesture.scale, q(), it = J * vt, nt = K * vt, H(), v()
			}

			function H() {
				nt = K * vt, (it = J * vt) <= bt ? Et = .5 * (bt - it) - tt : (Et + tt > 0 || Et + it + tt < bt) && (Et + tt > 0 ? Et = -tt : Et + it + tt < bt && (Et = bt - it - tt)), nt <= wt ? kt = .5 * (wt - nt) - et : (kt + et > 0 || kt + nt + et < wt) && (kt + et > 0 ? kt = -et : kt + nt + et < wt && (kt = wt - nt - et)), Et >>= 0, kt >>= 0
			}

			function q() {
				vt > rt.maxZoom ? vt = rt.maxZoom : vt < rt.minZoom && (vt = rt.minZoom), St.spx = Ct.spx, St.spy = Ct.spy, St.nspx = St.spx * vt, St.nspy = St.spy * vt, St.cx = St.spx - St.nspx >> 0, St.cy = St.spy - St.nspy >> 0, Et = Tt.cx + St.cx - Ct.cx, kt = Tt.cy + St.cy - Ct.cy
			}

			function U(t) {
				Wt && (Lt = t.gesture.touches[0].pageX, Ft = t.gesture.touches[0].pageY, Ot = Et, Dt = kt, Wt = !1), Et = Ot + t.gesture.touches[0].pageX - Lt, kt = Dt + t.gesture.touches[0].pageY - Ft, X()
			}

			function W(t) {
				(t = void 0 === t || t) && L(), jt = 0, Nt = 0, Xt = !0
			}

			function X() {
				var t = Et;
				H(), Bt = !1, t != Et ? (V(-(Et - t)), Bt = !0) : V(0);
				var i = {
					transformPerspective: 500,
					ease: rt.ease
				};
				Pt ? (i.x = Et, i.y = kt) : (i.marginLeft = Et, i.marginTop = kt), TweenMax.to(n[gt].image, rt.animDuration, i), Q(e.DRAG)
			}

			function V(t) {
				jt = t;
				var e = {
					transformPerspective: 500,
					immediateRender: !1,
					ease: rt.ease
				};
				Pt ? e.x = jt : e.marginLeft = jt, TweenMax.to(st, 0, e)
			}

			function Y(t, e) {
				Tt.spx = St.spx, Tt.spy = St.spy, Tt.nspx = St.nspx, Tt.nspy = St.nspy, Tt.cx = Et, Tt.cy = kt, Ct.spx = t >> 0, Ct.spy = e >> 0, Ct.nspx = Ct.spx * _t, Ct.nspy = Ct.spy * _t, Ct.cx = Ct.spx - Ct.nspx >> 0, Ct.cy = Ct.spy - Ct.nspy >> 0, vt = _t
			}

			function G(t, i, n) {
				if ($.isFunction(i)) {
					var r = null,
						o = null,
						s = $.inArray(t, e.eventTypes);
					if (n = $.isArray(n) ? n : null, s > -1) {
						o = ne[s];
						r = {
							handler: i,
							handlerParams: n
						};
						!$.inArray(r, o) > -1 && o.push(r)
					}
				}
			}

			function Z(t, i, n) {
				if ($.isFunction(i)) {
					var r = null,
						o = $.inArray(t, e.eventTypes),
						s = !1;
					if (void 0 !== n && (n = $.isArray(n) ? n : null, s = !0), o > -1)
						for (var a = (r = ne[o]).length - 1; a >= 0; a--) r[a].handler != i || s && !Utils.isSameArray(r[a].handlerParams, n) || r.splice(a, 1)
				}
			}

			function Q(t) {
				var i = $.inArray(t, e.eventTypes);
				if (i > -1) {
					var n = ne[i],
						r = 0;
					for (r = 0; r < n.length; r++) n[r].handler.apply(null, n[r].handlerParams)
				}
			}
			TweenLite.defaultOverwrite = "auto";
			var J, K, tt, et, it, nt, rt = $.extend({
					minDragDistance: 100,
					animDuration: .3,
					maxZoom: 5,
					minZoom: 1,
					ease: Power4.easeOut,
					loop: !0,
					allowZoom: !0,
					allowDrag: !0,
					doubleTapZoom: 2,
					zoomStep: .5,
					dragStep: 10,
					adjustWidth: 0,
					adjustHeight: 0,
					playDuration: 5,
					autoPlay: !1,
					loadIndexOnly: !0,
					preloaderUrl: "/assets/img/loadingindicator.gif",
					resizeDuration: -1
				}, r),
				ot = $(i),
				st = $("<div style='width:100%; height:100%; left:0px; top:0px; position:absolute;'></div>"),
				at = "<img style='position:absolute; max-width:none; display:block;'>",
				lt = Modernizr.rgba ? "1px solid rgba(255, 0, 0, 0.0)" : "1px solid transparent",
				ut = $("<div style='width:100%; height:100%; left:-100%; top:-1px; position:absolute; border: " + lt + ";'></div>"),
				ct = $("<div style='width:100%; height:100%; left:-1px; top:-1px; position:absolute; border: " + lt + ";'></div>"),
				ht = $("<div style='width:100%; height:100%; left:100%; top:-1px; position:absolute; border: " + lt + ";'></div>"),
				dt = $("<div style='width:1px; height:1px; left:-1px; top:-1px; position:absolute; overflow:hidden'></div>"),
				pt = $(at).load(P),
				ft = $(at).load(P),
				mt = $(at).load(P),
				gt = 0,
				vt = 1,
				_t = 1,
				yt = 0,
				xt = 0,
				bt = 0,
				wt = 0,
				Tt = {
					spx: 0,
					spy: 0,
					nspx: 0,
					nspy: 0,
					cx: 0,
					cy: 0
				},
				Ct = {
					spx: 0,
					spy: 0,
					nspx: 0,
					nspy: 0,
					cx: 0,
					cy: 0
				},
				St = {
					spx: 0,
					spy: 0,
					nspx: 0,
					nspy: 0,
					cx: 0,
					cy: 0
				},
				Et = 0,
				kt = 0,
				Ot = 0,
				Dt = 0,
				At = null,
				Pt = (Modernizr.csstransforms3d, Modernizr.csstransforms),
				Mt = -1,
				It = -1,
				jt = 0,
				Nt = 0,
				Bt = !1,
				Rt = 0,
				Lt = 0,
				Ft = 0,
				zt = 0,
				Ht = -1,
				$t = 0,
				qt = -1,
				Ut = !1,
				Wt = !1,
				Xt = !0,
				Vt = 0,
				Yt = 0,
				Gt = null,
				Zt = rt.autoPlay,
				Qt = "string" === $.type(rt.preloaderUrl) ? $("<img>").load(A) : null,
				Jt = 0,
				Kt = 0,
				te = -1,
				ee = !0,
				ie = {},
				ne = [
					[],
					[],
					[],
					[]
				];
			ut.append(pt), ct.append(ft), ht.append(mt), $("body").append(dt), st.append(ut), st.append(ht), st.append(ct), null != Qt && (TweenMax.set(Qt, {
					autoAlpha: 0
				}), dt.append(Qt), Qt.attr("src", rt.preloaderUrl)), ot.append(st), TweenMax.set(dt, {
					autoAlpha: 0
				}), ot.on("mousedown", Utils.preventDefault), ot.on("mousemove", Utils.preventDefault), (rt.allowZoom || rt.minZoom != rt.maxZoom) && ot.on("mousewheel", Utils.preventDefault),
				function () {
					if ($.isArray(n)) {
						var e = n.length;
						if (e > 0) {
							for (var i = 0; i < e; i++) {
								var r = n[i];
								if (null !== r.url) {
									r.url;
									var o = void 0 !== rt && "string" === $.type(r.caption) ? r.caption : "";
									n[i].width = 0, n[i].height = 0, n[i].loaded = !1, n[i].retry = 0, n[i].image = $("<img alt='" + o + "' style='position:absolute; max-width:none;'>").load({
										index: i
									}, M).error({
										index: i
									}, I), TweenMax.set(n[i].image, {
										autoAlpha: 0
									})
								}
							}
							if (rt.loop) {
								if (e > 0 && e <= 2) {
									var a, l, u, c, d, p;
									1 == e ? (a = $("<img alt='" + o + "' style='position:absolute'>").load({
										index: e
									}, M).error({
										index: e
									}, I), u = n[0].url, d = n[0].caption, l = $("<img alt='" + o + "' style='position:absolute'>").load({
										index: e + 1
									}, M).error({
										index: e + 1
									}, I), c = n[0].url, p = n[0].caption, te = 1) : 2 == e && (a = $("<img alt='" + o + "' style='position:absolute'>").load({
										index: e
									}, M).error({
										index: e
									}, I), u = n[0].url, d = n[0].caption, l = $("<img alt='" + o + "' style='position:absolute'>").load({
										index: e + 1
									}, M).error({
										index: e + 1
									}, I), c = n[1].url, p = n[1].caption, te = 2), dt.append(a), dt.append(l), n.push({
										image: a,
										url: u,
										caption: d,
										width: 0,
										height: 0,
										loaded: !1,
										retry: 0
									}), n.push({
										image: l,
										url: c,
										caption: p,
										width: 0,
										height: 0,
										loaded: !1,
										retry: 0
									})
								}
								s(n.length - 1)
							} else 1 == e ? (pt.detach(), mt.detach()) : 2 == e && pt.detach();
							e > 1 && s(1), s(0), h(Zt)
						}
					}
					$(t).on("resize", N), (At = st.hammer({
						drag_min_distance: 0,
						swipe: !1,
						drag_max_touches: 4
					})).on("drag", Utils.preventGestureDefault), At.on("transform", Utils.preventGestureDefault);
					var f = "touchstart touchend";
					t.PointerEvent ? f = "pointerdown pointerup" : t.MSPointerEvent ? f = "MSPointerDown MSPointerUp" : w(), At.on(f, b), rt.allowZoom && (ct.on("mousewheel", _), At.on("doubletap", F))
				}(), N(), !isNaN(rt.resizeDuration) && rt.resizeDuration > 0 && TweenMax.to(this, rt.resizeDuration, {
					onRepeat: N,
					repeat: -1
				}), this.index = o, this.next = d, this.prev = p, this.zoom = g, this.zoomIn = f, this.zoomOut = m, this.play = u, this.pause = c, this.autoPlay = h, this.caption = a, this.resize = N, this.on = G, this.off = Z, this.vars = rt, this.slides = n
		}
		e.INDEX_CHANGE = "indexchange", e.ZOOM = "zoom", e.AUTOPLAY = "autoplay", e.DRAG = "drag", e.eventTypes = [e.INDEX_CHANGE, e.ZOOM, e.AUTOPLAY, e.DRAG], t.ImageSlider = e
	}(window),
	function (t) {
		function e(i, n, r) {
			function o(t, i) {
				if ("boolean" === $.type(t)) {
					var n = V;
					V = t, i = void 0 === i || isNaN(i) ? C.animDuration : i;
					var r = V ? Y : G,
						o = new TimelineMax;
					it && V && o.add(TweenMax.to(et, 0, {
						display: "block",
						overwrite: "all"
					})), o.add(TweenMax.to(S, i, r)), it && !V && o.add(TweenMax.to(et, 0, {
						display: "none",
						overwrite: "all",
						immediateRender: !1
					})), V && !Z && o.add(s), V && _(), n != V && T(e.TOGGLE)
				}
				return V
			}

			function s() {
				var t = n.length;
				Z = !0;
				for (var e = 0; e < t; e++) n[e].resized || (n[e].loaded && m(e), n[e].resized || (Z = !1))
			}

			function a(t) {
				E = S.width(), k = S.height(), M < E ? X = !1 : (X = !0, F = t.gesture.touches[0].pageX, z = L, U = W, W = F, h())
			}

			function l(t) {
				if (X) {
					U = W, W = t.gesture.touches[0].pageX, L = z + W - F;
					var e = {
						transformPerspective: 500,
						immediateRender: !1,
						ease: C.ease
					};
					N ? e.x = L : e.marginLeft = L, TweenMax.to(I, 0, e)
				}
			}

			function u(t) {
				X && (q = U - W < 0 ? 1 : -1, H = Math.abs(U - W), TweenLite.ticker.addEventListener("tick", c)), X = !1
			}

			function c() {
				H > 0 ? (L += H * q, M < E ? H = 0 : L > C.overScroll ? (H = 0, L = C.overScroll) : L + M - E < -C.overScroll && (H = 0, L = -C.overScroll - M + E), _(0, !1, !1), H -= C.friction) : (_(C.animDuration), h())
			}

			function h(t) {
				H = 0, TweenLite.ticker.removeEventListener("tick", c)
			}

			function d(t) {
				J = .5 * (C.thumbWidth - Q.width()) + "px", K = .5 * (C.thumbHeight - Q.height()) + "px", Q.remove();
				for (var e = C.preloaderUrl, i = n.length, r = 0; r < i; r++) null != n[r].preloaderImage && n[r].preloaderImage.attr("src", e)
			}

			function p(t) {
				var e = t.data.index;
				n[e].loaded || (TweenMax.set(n[e].preloaderImage, {
					position: "absolute",
					left: J,
					top: K
				}), TweenMax.to(n[e].preloaderImage, C.animDuration, {
					autoAlpha: 1
				}))
			}

			function f(t) {
				var e = t.data.index;
				n[e].loaded = !0, void 0 !== n[e].preloaderImage && null !== n[e].preloaderImage && (n[e].preloaderImage.remove(), n[e].preloaderImage = null), m(e), n[e].div.append(n[e].image), n[e].div.hammer({
					drag_min_distance: 0,
					prevent_default: !0,
					swipe: !1,
					drag_max_touches: 1
				}).on("tap", {
					index: e
				}, g)
			}

			function m(t) {
				if (!n[t].resized) {
					var e = n[t].image.width(),
						i = n[t].image.height();
					if (0 != e && 0 != i) {
						var r = e * (P / i),
							o = i * (A / e),
							s = 0,
							a = 0;
						"proportionalInside" == C.scaleMode ? o <= P ? A / (r = A) : P / (o = P) : "proportionalOutside" == C.scaleMode ? o >= P ? A / (r = A) : P / (o = P) : (r = e, o = i), s = .5 * (A - r), a = .5 * (P - o);
						var l = new TimelineMax;
						l.add(TweenMax.to(n[t].image, 0, {
							width: r + "px",
							height: o + "px",
							x: s,
							y: a,
							position: "absolute"
						})), l.add(TweenMax.to(n[t].image, C.animDuration, {
							autoAlpha: 1,
							display: "block",
							ease: C.ease
						})), n[t].resized = !0
					}
				}
			}

			function g(t) {
				x(t.data.index)
			}

			function v(t) {
				E = S.width(), k = S.height(), O == E && D == k || (_(), O = E, D = k)
			}

			function _(t, e, i) {
				E = S.width(), k = S.height(), t = t || 0, e = void 0 === e || e, i = void 0 !== i && i;
				var r = {
						transformPerspective: 500,
						width: M,
						ease: C.ease
					},
					o = B * (C.thumbWidth + C.space),
					s = !1,
					a = {
						immediateRender: !1
					},
					l = !1;
				if (e && (M < E ? (L = .5 * (E - M), s = !0) : L > 0 ? L = 0 : L + M - E < 0 ? L = -(M - E) : tt && (l = !0)), i && (L + o < 0 ? L = -o : L + o + A > E ? L = E - (o + A) : tt && (l = !0)), N ? (r.x = L, a.x = L - 1) : (r.marginLeft = L, a.marginLeft = L - 1), !Z && e) {
					var u = 0,
						c = 0;
					(c = s ? n.length - 1 : (u = Math.abs(Math.ceil(L / A))) + Math.ceil(E / A)) > n.length - 1 && (c = n.length - 1), r.onComplete = y, r.onCompleteParams = [u, c]
				}
				var h = new TimelineMax;
				tt && l && h.add(TweenMax.to(I, 0, a)), h.add(TweenMax.to(I, t, r))
			}

			function y(t, e) {
				for (var i = t; i <= e; i++) n[i].loaded || n[i].image.attr("src", n[i].url)
			}

			function x(t) {
				return void 0 === t || isNaN(t) || (t < 0 ? t = 0 : t > n.length - 1 && (t = n.length - 1), R != t && (B = t, TweenMax.set(n[R].div, {
					border: C.borderThickness + "px solid " + C.defaultBorderColor
				}), TweenMax.set(n[B].div, {
					border: C.borderThickness + "px solid " + C.borderColor
				}), I.append(n[B].div), R = B, T(e.INDEX_CHANGE)), _(C.animDuration, !0, !0)), B
			}

			function b(t, i, n) {
				if ($.isFunction(i)) {
					var r = null,
						o = null,
						s = $.inArray(t, e.eventTypes);
					if (n = $.isArray(n) ? n : null, s > -1) {
						o = nt[s];
						r = {
							handler: i,
							handlerParams: n
						};
						!$.inArray(r, o) > -1 && o.push(r)
					}
				}
			}

			function w(t, i, n) {
				if ($.isFunction(i)) {
					var r = null,
						o = $.inArray(t, e.eventTypes),
						s = !1;
					if (void 0 !== n && (n = $.isArray(n) ? n : null, s = !0), o > -1)
						for (var a = (r = nt[o]).length - 1; a >= 0; a--) r[a].handler != i || s && !Utils.isSameArray(r[a].handlerParams, n) || r.splice(a, 1)
				}
			}

			function T(t) {
				var i = $.inArray(t, e.eventTypes);
				if (i > -1) {
					var n = nt[i],
						r = 0;
					for (r = 0; r < n.length; r++) n[r].handler.apply(null, n[r].handlerParams)
				}
			}
			TweenLite.defaultOverwrite = "auto";
			var C = $.extend({
					thumbWidth: 75,
					thumbHeight: 75,
					animDuration: .5,
					ease: Power4.easeOut,
					preloaderUrl: "assets/preloader.gif",
					scaleMode: "proportionalOutside",
					borderThickness: 2,
					borderColor: "#1ae9f1",
					defaultBorderColor: "transparent",
					space: 0,
					friction: 1,
					overScroll: 100,
					initShow: !1,
					resizeDuration: -1,
					showCssObj: {
						autoAlpha: 1
					},
					hideCssObj: {
						autoAlpha: 0
					},
					setHolderVisibility: !0
				}, r),
				S = $(i),
				E = S.width(),
				k = S.height(),
				O = 0,
				D = 0,
				A = C.thumbWidth + 2 * C.borderThickness,
				P = C.thumbHeight + 2 * C.borderThickness,
				M = (C.thumbWidth + C.space) * n.length - C.space + 2 * C.borderThickness,
				I = $("<div style='width:" + (M - 1) + "px; height:" + (C.thumbHeight + 2 * C.borderThickness) + "px; left:0px; top:0px; position:absolute;'></div>"),
				j = $("<div style='width:1px; height:1px; left:-1px; top:-1px; position:absolute; overflow:none'></div>"),
				N = Modernizr.csstransforms,
				B = 0,
				R = 0,
				L = 0,
				F = 0,
				z = 0,
				L = 0,
				H = 0,
				q = 1,
				U = 0,
				W = 0,
				X = !1,
				V = C.initShow,
				Y = C.showCssObj,
				G = C.hideCssObj,
				Z = !1,
				Q = "string" === $.type(C.preloaderUrl) ? $("<img>").load(d) : null,
				J = 0,
				K = 0,
				tt = Utils.isFirefox && Utils.isAndroid,
				et = S.parent(),
				it = C.setHolderVisibility && "thumbsHolder" == et.data("elem"),
				nt = [
					[],
					[]
				];
			TweenMax.set(j, {
					autoAlpha: 0
				}), $("body").append(j), null != Q && (TweenMax.set(Q, {
					autoAlpha: 0
				}), j.append(Q), Q.attr("src", C.preloaderUrl)), TweenMax.set(S, {
					overflow: "hidden",
					height: P + "px",
					minHeight: P + "px"
				}), S.append(I),
				function () {
					if ($.isArray(n)) {
						var e = n.length;
						if (e > 0) {
							for (var i = 0; i < e; i++) {
								var r = n[i];
								if (null !== r.url) {
									r.url;
									var s = void 0 !== C && "string" === $.type(r.caption) ? r.caption : "",
										c = B == i ? C.borderColor : C.defaultBorderColor;
									n[i].width = 0, n[i].height = 0, n[i].loaded = !1, n[i].resized = !1, n[i].image = $("<img alt='" + s + "' style='position:absolute; max-width:none;'>").load({
										index: i
									}, f), n[i].div = $("<div style='position:absolute; overflow:hidden; width:" + C.thumbWidth + "px; height:" + C.thumbHeight + "px; left:" + (C.thumbWidth + C.space) * i + "px; border:" + C.borderThickness + "px solid " + c + ";' >"), null !== Q && (n[i].preloaderImage = $("<img style='position:absolute; max-width:none; display:block;'>").load({
										index: i
									}, p), n[i].div.append(n[i].preloaderImage)), j.append(n[i].image), I.append(n[i].div), TweenMax.set(n[i].image, {
										autoAlpha: 0
									})
								}
							}
							e > 0 && I.append(n[0].div), v()
						}
					}
					$(t).on("resize", v), touchHandler = I.hammer({
						drag_min_distance: 0,
						prevent_default: !0,
						swipe: !1,
						drag_max_touches: 4
					}), touchHandler.on("hold", h), touchHandler.on("dragstart", a), touchHandler.on("drag", l), touchHandler.on("dragend", u), o(V, 0)
				}(), S.on("mousedown", Utils.preventDefault), S.on("mousemove", Utils.preventDefault), !isNaN(C.resizeDuration) && C.resizeDuration > 0 && TweenMax.to(this, C.resizeDuration, {
					onRepeat: v,
					repeat: -1
				}), this.thumbs = n, this.index = x, this.show = o, this.vars = C, this.on = b, this.off = w, this.resize = v
		}
		e.INDEX_CHANGE = "indexchange", e.TOGGLE = "toggle", e.eventTypes = [e.INDEX_CHANGE, e.TOGGLE], t.PhysicsScroller = e
	}(window),
	function (t) {
		function e(i, n) {
			function r(t) {
				c()
			}

			function o(t) {
				return d.html(t), c(), d.html()
			}

			function s(t, i) {
				i = isNaN(Math.abs(i)) ? h.animDuration : Math.abs(i);
				var n = new TimelineMax;
				return void 0 !== t && ((p = t) ? (h.setHolderVisibility && n.add(TweenMax.to(d.parent(), 0, {
					display: "block",
					overwrite: "all"
				})), c(), n.add(TweenMax.to(d, i, h.showCssObj))) : (n.add(TweenMax.to(d, i, h.hideCssObj)), h.setHolderVisibility && n.add(TweenMax.to(d.parent(), 0, {
					display: "none",
					overwrite: "all",
					immediateRender: !1
				}))), u(e.TOGGLE)), p
			}

			function a(t, i, n) {
				if ($.isFunction(i)) {
					var r = null,
						o = null,
						s = $.inArray(t, e.eventTypes);
					if (n = $.isArray(n) ? n : null, s > -1) {
						o = m[s];
						r = {
							handler: i,
							handlerParams: n
						};
						!$.inArray(r, o) > -1 && o.push(r)
					}
				}
			}

			function l(t, i, n) {
				if ($.isFunction(i)) {
					var r = null,
						o = $.inArray(t, e.eventTypes),
						s = !1;
					if (void 0 !== n && (n = $.isArray(n) ? n : null, s = !0), o > -1)
						for (var a = (r = m[o]).length - 1; a >= 0; a--) r[a].handler != i || s && !Utils.isSameArray(r[a].handlerParams, n) || r.splice(a, 1)
				}
			}

			function u(t) {
				var i = $.inArray(t, e.eventTypes);
				if (i > -1) {
					var n = m[i],
						r = 0;
					for (r = 0; r < n.length; r++) n[r].handler.apply(null, n[r].handlerParams)
				}
			}

			function c() {
				var t = d.height();
				f != t && (TweenMax.set(d.parent(), {
					css: {
						height: t + "px"
					}
				}), f = t)
			}
			TweenLite.defaultOverwrite = "auto";
			var h = $.extend({
					animDuration: .5,
					ease: Power4.easeOut,
					initShow: !1,
					resizeDuration: -1,
					showCssObj: {
						autoAlpha: 1
					},
					hideCssObj: {
						autoAlpha: 0
					},
					setHolderVisibility: !0
				}, n),
				d = $(i),
				p = h.initShow,
				f = 0,
				m = [
					[]
				];
			this.caption = d, this.vars = h, this.show = s, this.html = o, this.resize = r, this.on = a, this.off = l, !isNaN(h.resizeDuration) && h.resizeDuration > 0 && TweenMax.to(this, h.resizeDuration, {
				onRepeat: r,
				repeat: -1
			}), null !== Utils.androidVer && Utils.androidVer < 4.1 && TweenMax.set([d, d.parent()], {
				transformPerspective: 500
			}), s(h.initShow, 0), $(t).on("resize", r)
		}
		e.TOGGLE = "toggle", e.eventTypes = [e.TOGGLE], t.Caption = e
	}(window),
	function (t) {
		function e() {}

		function i(t) {
			var i = 0;
			if (void 0 !== t && null !== t) {
				var n = e.objs.length;
				if (isNaN(t))
					for (var r = 0; r < n; r++) e.objs[r].sliderHolder.get(0) == $(t).get(0) && (i = r, r = n);
				else t >= 0 && t < n && (i = t)
			}
			return i
		}

		function n(t) {
			var i = t.data.index;
			if (i >= 0 && i < e.linkObjs.length && !e.linkObjs[i].removed) {
				var n = e.linkObjs[i];
				if (!n.removed) {
					var r = n.sliderIndex,
						o = n.index,
						s = n.slider;
					TweenMax.set(e.objs[r].sliderHolder, e.objs[r].sliderHolderShow), e.objs[r].sliderHolderVisibility && TweenMax.set(e.objs[r].sliderHolder.parent(), {
						display: "block"
					}), s.index(o), s.resize(), TweenMax.to({}, .1, {
						onComplete: s.resize
					})
				}
			}
		}

		function r(t) {
			var i = t.data.index;
			e.objs[i].removed || (TweenMax.set(e.objs[i].sliderHolder, e.objs[i].sliderHolderHide), e.objs[i].sliderHolderVisibility && TweenMax.set(e.objs[i].sliderHolder.parent(), {
				display: "none"
			}))
		}

		function o(t) {
			t >= 0 && t < e.objs.length && !e.objs[t].removed && _(t)
		}

		function s(t) {
			var i = t.data.index;
			if (i >= 0 && i < e.objs.length && !e.objs[i].removed) {
				var n = e.objs[i].thumbScroller.show;
				n(!n())
			}
		}

		function a(t) {
			t >= 0 && t < e.objs.length && !e.objs[t].removed && ((0, e.objs[t].thumbScroller.show)() ? TweenMax.set(e.objs[t].thumbsToggleButton, e.objs[t].thumbsToggleOnObj) : TweenMax.set(e.objs[t].thumbsToggleButton, e.objs[t].thumbsToggleOffObj))
		}

		function l(t) {
			var i = t.data.index;
			if (!e.objs[i].removed) {
				var n = e.objs[i].slider.autoPlay;
				n(!n())
			}
		}

		function u(t) {
			e.objs[t].removed || ((0, e.objs[t].slider.autoPlay)() ? TweenMax.set(e.objs[t].autoPlayButton, e.objs[t].autoPlayOnObj) : TweenMax.set(e.objs[t].autoPlayButton, e.objs[t].autoPlayOffObj))
		}

		function c(t) {
			var i = t.data.index;
			e.objs[i].removed || e.objs[i].captionObj.show(!e.objs[i].captionObj.show())
		}

		function h(t) {
			var i = t.data.index;
			e.objs[i].removed || (e.objs[i].slider.zoom(1, 0), e.objs[i].slider.prev(!0))
		}

		function d(t) {
			var i = t.data.index;
			e.objs[i].removed || (e.objs[i].slider.zoom(1, 0), e.objs[i].slider.next(!0))
		}

		function p(t) {
			var i = t.data.index;
			e.objs[i].removed || e.objs[i].slider.zoomIn()
		}

		function f(t) {
			var i = t.data.index;
			e.objs[i].removed || e.objs[i].slider.zoomOut()
		}

		function m(t, i) {
			if (i >= 0 && i < e.objs.length && !e.objs[i].removed) {
				t = t || "slider";
				var n = e.objs[i].slider,
					r = e.objs[i].thumbScroller,
					o = void 0 !== r ? r.index() : -1,
					s = n.index(); - 1 != o && o != s && ("slider" == t ? r.index(s) : n.index(o)), void 0 !== e.objs[i].captionObj && e.objs[i].captionObj.html(n.caption), v(i), g(i)
			}
		}

		function g(t) {
			if (!e.objs[t].removed)
				for (var i = e.objs[t].slider, n = 0; n < e.linkObjs.length; n++)
					if (!e.linkObjs[n].removed) {
						var r = e.linkObjs[n].slider;
						r == i && (e.linkObjs[n].index == r.index() ? TweenMax.set(e.linkObjs[n].imageLink, e.linkObjs[n].onObj) : TweenMax.set(e.linkObjs[n].imageLink, e.linkObjs[n].offObj))
					}
		}

		function v(t) {
			if (t >= 0 && t < e.objs.length && !e.objs[t].removed && !e.objs[t].slider.vars.loop) {
				var i = e.objs[t].slider.index();
				0 == i ? TweenMax.set(e.objs[t].prevButton, e.objs[t].prevOffObj) : TweenMax.set(e.objs[t].prevButton, e.objs[t].prevOnObj), i == e.objs[t].slider.slides.length - 1 ? TweenMax.set(e.objs[t].nextButton, e.objs[t].nextOffObj) : TweenMax.set(e.objs[t].nextButton, e.objs[t].nextOnObj)
			}
		}

		function _(t) {
			if (t >= 0 && t < e.objs.length && !e.objs[t].removed) {
				var i = e.objs[t].slider.zoom();
				i == e.objs[t].slider.vars.minZoom ? TweenMax.set(e.objs[t].zoomOutButton, e.objs[t].zoomOutOffObj) : TweenMax.set(e.objs[t].zoomOutButton, e.objs[t].zoomOutOnObj), i == e.objs[t].slider.vars.maxZoom ? TweenMax.set(e.objs[t].zoomInButton, e.objs[t].zoomInOffObj) : TweenMax.set(e.objs[t].zoomInButton, e.objs[t].zoomInOnObj)
			}
		}
		TweenLite.defaultOverwrite = "auto", e.objs = [], e.linkObjs = [], e.lastSliderIndex = 0, e.lastLinkIndex = 0, e.removeAll = function () {
			for (var t = e.objs.length, i = 0; i < t; i++) {
				var n = e.objs[i];
				n.removed || n.sliderHolder.remove(), e.objs[i] = null
			}
			for (e.objs = null, e.objs = [], t = e.linkObjs.length, i = 0; i < t; i++) linkObj = e.linkObjs[i], linkObj.removed || linkObj.imageLink.remove(), e.linkObjs[i] = null;
			e.linkObjs = null, e.linkObjs = []
		}, e.remove = function (t) {
			var i = -1,
				n = e.objs.length;
			if (isNaN(t))
				for (var r = 0; r < n; r++) e.objs[r].id == t && (i = r, r = n);
			else i = t;
			i >= 0 && i < n && (e.objs[i].sliderHolder.remove(), e.objs[i] = null, e.objs[i] = {
				removed: !0
			})
		}, e.removeLinkObj = function (t) {
			var i = -1,
				n = e.linkObjs.length;
			if (isNaN(t))
				for (var r = 0; r < n; r++) e.linkObjs[r].id == t && (i = r, r = n);
			else i = t;
			i >= 0 && i < n && (e.linkObjs[i].imageLink.remove(), e.linkObjs[i] = null, e.linkObjs[i] = {
				removed: !0
			})
		}, e.getThumbScroller = function (t) {
			return e.getObj(t).thumbScroller
		}, e.getCaption = function (t) {
			return e.getObj(t).captionObj
		}, e.getSlider = function (t) {
			return e.getObj(t).slider
		}, e.getObj = function (t) {
			var i = null;
			if (isNaN(t))
				for (var n = e.objs.length, r = 0; r < n; r++) e.objs[r].id == t && (i = e.objs[r], r = n);
			else t >= 0 && t < e.objs.length && (i = e.objs[t]);
			return i
		}, e.getLinkObj = function (t) {
			var i = null;
			if (isNaN(t))
				for (var n = e.linkObjs.length, r = 0; r < n; r++) e.linkObjs[r].id == t && (i = e.linkObjs[r], r = n);
			else i = e.linkObjs[t];
			return i
		}, e.init = function () {
			var t = $("*[data-elem='slider']"),
				y = t.length,
				x = 0,
				b = 0;
			for (x = 0; x < y; x++) {
				var w = {},
					T = t.eq(x),
					C = T.find("[data-elem='items']").eq(0),
					S = T.find("[data-elem='slides']").eq(0),
					E = T.find("[data-elem='thumbs']").eq(0),
					k = E.length,
					O = e.objs.length;
				w.removed = !1, w.sliderHolder = T, w.id = w.sliderHolder.attr("id") || "sliderHolder" + e.lastSliderIndex, w.sliderHolderVars = $.extend({
					initShow: !0,
					setHolderVisibility: !0
				}, Utils.getAttrObjectFromString(T.data("options"))), w.sliderHolderVisibility = w.sliderHolderVars.setHolderVisibility && "sliderHolder" == w.sliderHolder.parent().data("elem"), w.sliderHolderShow = Utils.getAttrObjectFromString(T.data("show")), w.sliderHolderHide = Utils.getAttrObjectFromString(T.data("hide")), w.caption = T.find("[data-elem='caption']").eq(0), w.autoPlayButton = T.find("[data-elem='autoPlay']").eq(0), w.autoPlayOnObj = Utils.getAttrObjectFromString(w.autoPlayButton.data("on")), w.autoPlayOffObj = Utils.getAttrObjectFromString(w.autoPlayButton.data("off")), w.prevButton = T.find("[data-elem='prev']").eq(0), w.prevOnObj = Utils.getAttrObjectFromString(w.prevButton.data("on")), w.prevOffObj = Utils.getAttrObjectFromString(w.prevButton.data("off")), w.nextButton = T.find("[data-elem='next']").eq(0), w.nextOnObj = Utils.getAttrObjectFromString(w.nextButton.data("on")), w.nextOffObj = Utils.getAttrObjectFromString(w.nextButton.data("off")), w.zoomInButton = T.find("[data-elem='zoomIn']").eq(0), w.zoomInOnObj = Utils.getAttrObjectFromString(w.zoomInButton.data("on")), w.zoomInOffObj = Utils.getAttrObjectFromString(w.zoomInButton.data("off")), w.zoomOutButton = T.find("[data-elem='zoomOut']").eq(0), w.zoomOutOnObj = Utils.getAttrObjectFromString(w.zoomOutButton.data("on")), w.zoomOutOffObj = Utils.getAttrObjectFromString(w.zoomOutButton.data("off"));
				var D = C.find("li"),
					A = D.length,
					P = [],
					M = [];
				for (b = 0; b < A; b++) {
					var I, j, N, B, R = D.eq(b).children("a").eq(0),
						L = D.eq(b).find("[data-elem='imgCaption']").eq(0);
					R.length > 0 ? (I = R.find("img").eq(0), j = R.attr("href"), N = I.attr("src")) : j = N = (I = D.eq(b).find("img").eq(0)).attr("src");
					var F = I.attr("alt");
					B = L.length > 0 ? L.html() : void 0 !== F && null !== F ? F : "", P.push({
						url: j,
						caption: B
					}), 1 == k && (M.push({
						url: N,
						caption: B
					}), null !== Utils.androidVer && Utils.androidVer < 4.1 && TweenMax.set([E, E.parent()], {
						transformPerspective: 500
					}))
				}
				C.remove();
				var z = Utils.getAttrObjectFromString(S.data("options")),
					H = new ImageSlider(S, P, z);
				if (H.on(ImageSlider.INDEX_CHANGE, m, ["slider", O]), H.on(ImageSlider.ZOOM, o, [O]), H.on(ImageSlider.AUTOPLAY, u, [O]), w.slider = H, 1 == k) {
					w.thumbsToggleButton = T.find("[data-elem='thumbsToggle']").eq(0), w.thumbsToggleOnObj = Utils.getAttrObjectFromString(w.thumbsToggleButton.data("on")), w.thumbsToggleOffObj = Utils.getAttrObjectFromString(w.thumbsToggleButton.data("off"));
					var q = Utils.getAttrObjectFromString(E.data("options")),
						U = Utils.getAttrObjectFromString(E.data("show")),
						W = Utils.getAttrObjectFromString(E.data("hide"));
					$.isEmptyObject(U) || $.isEmptyObject(W) || (q.showCssObj = U, q.hideCssObj = W), (E = new PhysicsScroller(E, M, q)).on(PhysicsScroller.INDEX_CHANGE, m, ["thumb", O]), E.on(PhysicsScroller.TOGGLE, a, [O]), w.thumbScroller = E, w.thumbsToggleButton.hammer().on("tap", {
						index: O
					}, s), E.show() ? TweenMax.set(w.thumbsToggleButton, w.thumbsToggleOnObj) : TweenMax.set(w.thumbsToggleButton, w.thumbsToggleOffObj)
				}
				if (e.objs.push(w), e.lastSliderIndex++, v(O), _(O), 1 == w.caption.length) {
					var X = Utils.getAttrObjectFromString(w.caption.data("options"));
					X.showCssObj = Utils.getAttrObjectFromString(w.caption.data("show")), X.hideCssObj = Utils.getAttrObjectFromString(w.caption.data("hide")), w.captionObj = new Caption(w.caption, X), w.captionToggleButton = T.find("[data-elem='captionToggle']").eq(0), w.captionToggleOnObj = Utils.getAttrObjectFromString(w.captionToggleButton.data("on")), w.captionToggleOffObj = Utils.getAttrObjectFromString(w.captionToggleButton.data("off")), w.captionToggleButton.hammer().on("tap", {
						index: O
					}, c), w.captionObj.html(e.objs[O].slider.caption)
				}
				if (w.closeButton = T.find("[data-elem='close']").eq(0), w.autoPlayButton.hammer().on("tap", {
						index: O
					}, l), w.prevButton.hammer().on("tap", {
						index: O
					}, h), w.nextButton.hammer().on("tap", {
						index: O
					}, d), w.zoomInButton.hammer().on("tap", {
						index: O
					}, p), w.zoomOutButton.hammer().on("tap", {
						index: O
					}, f), w.closeButton.hammer().on("tap", {
						index: O
					}, r), null !== Utils.androidVer && Utils.androidVer < 4.1)
					for (var V = [w.autoPlayButton, w.prevButton, w.nextButton, w.zoomInButton, w.zoomOutButton, w.closeButton], Y = 0; Y < V.length; Y++) V[Y].length > 0 && TweenMax.set([V[Y], V[Y].parent()], {
						transformPerspective: 500
					});
				H.autoPlay() ? TweenMax.set(w.autoPlayButton, w.autoPlayOnObj) : TweenMax.set(w.autoPlayButton, w.autoPlayOffObj);
				var G = w.sliderHolderVars.initShow ? w.sliderHolderShow : w.sliderHolderHide;
				TweenMax.set(w.sliderHolder, G), w.sliderHolderVisibility && !w.sliderHolderVars.initShow && TweenMax.set(w.sliderHolder.parent(), {
					display: "none"
				})
			}
			if (y > 0) {
				var Z = $("*[data-link]"),
					Q = Z.length;
				for (x = 0; x < Q; x++) {
					var J = {
							removed: !1
						},
						K = Z.eq(x),
						tt = K.data("link");
					J.onObj = Utils.getAttrObjectFromString(K.data("on")), J.offObj = Utils.getAttrObjectFromString(K.data("off")), J.sliderIndex = 0, J.id = K.attr("id") || "imageLink" + e.lastLinkIndex, isNaN(tt) ? (tt = Utils.getAttrObjectFromString(K.data("link")), J.sliderIndex = i(tt.slider), J.slider = e.objs[J.sliderIndex].slider, J.index = parseInt(tt.index) || 0) : (J.slider = e.objs[0].slider, J.index = tt), K.hammer().on("tap", {
						index: e.lastLinkIndex
					}, n), J.imageLink = K, e.linkObjs.push(J), K.removeAttr("data-link"), e.lastLinkIndex++
				}
				for (x = 0; x < y; x++) g(x)
			}
			t.removeAttr("data-elem")
		}, t.TouchNSwipe = e
	}(window),
	function (t) {
		t.tooltipsy = function (e, i) {
			this.options = i, this.$el = t(e), this.title = this.$el.attr("title") || "", this.$el.attr("title", ""), this.random = parseInt(1e4 * Math.random()), this.ready = !1, this.shown = !1, this.width = 0, this.height = 0, this.delaytimer = null, this.$el.data("tooltipsy", this), this.init()
		}, t.tooltipsy.prototype = {
			init: function () {
				var e, i = this,
					n = i.$el,
					r = n[0];
				i.settings = e = t.extend({}, i.defaults, i.options), e.delay = +e.delay, "function" == typeof e.content && i.readify(), e.showEvent === e.hideEvent && "click" === e.showEvent ? n.toggle(function (t) {
					"click" === e.showEvent && "A" == r.tagName && t.preventDefault(), e.delay > 0 ? i.delaytimer = window.setTimeout(function () {
						i.show(t)
					}, e.delay) : i.show(t)
				}, function (t) {
					"click" === e.showEvent && "A" == r.tagName && t.preventDefault(), window.clearTimeout(i.delaytimer), i.delaytimer = null, i.hide(t)
				}) : n.bind(e.showEvent, function (t) {
					"click" === e.showEvent && "A" == r.tagName && t.preventDefault(), i.delaytimer = window.setTimeout(function () {
						i.show(t)
					}, e.delay || 0)
				}).bind(e.hideEvent, function (t) {
					"click" === e.showEvent && "A" == r.tagName && t.preventDefault(), window.clearTimeout(i.delaytimer), i.delaytimer = null, i.hide(t)
				})
			},
			show: function (e) {
				!1 === this.ready && this.readify();
				var i = this,
					n = i.settings,
					r = i.$tipsy,
					o = i.$el,
					s = o[0],
					a = i.offset(s);
				if (!1 === i.shown && (function (t) {
						var e, i = 0;
						for (e in t) t.hasOwnProperty(e) && i++;
						return i
					}(n.css) > 0 && i.$tip.css(n.css), i.width = r.outerWidth(), i.height = r.outerHeight()), "cursor" === n.alignTo && e)
					if ((l = [e.clientX + n.offset[0], e.clientY + n.offset[1]])[0] + i.width > t(window).width()) l[1], l[0];
					else l[1], l[0];
				else var l = [function () {
					return n.offset[0] < 0 ? a.left - Math.abs(n.offset[0]) - i.width : 0 === n.offset[0] ? a.left - (i.width - o.outerWidth()) / 2 : a.left + o.outerWidth() + n.offset[0]
				}(), function () {
					return n.offset[1] < 0 ? a.top - Math.abs(n.offset[1]) - i.height : 0 === n.offset[1] ? a.top - (i.height - i.$el.outerHeight()) / 2 : a.top + i.$el.outerHeight() + n.offset[1]
				}()];
				r.css({
					top: l[1] + "px",
					left: l[0] + "px"
				}), i.settings.show(e, r.stop(!0, !0))
			},
			hide: function (t) {
				var e = this;
				!1 !== e.ready && (t && t.relatedTarget === e.$tip[0] ? e.$tip.bind("mouseleave", function (t) {
					t.relatedTarget !== e.$el[0] && e.settings.hide(t, e.$tipsy.stop(!0, !0))
				}) : e.settings.hide(t, e.$tipsy.stop(!0, !0)))
			},
			readify: function () {
				this.ready = !0, this.$tipsy = t('<div id="tooltipsy' + this.random + '" style="position:fixed;z-index:2147483647;display:none">').appendTo("body"), this.$tip = t('<div class="' + this.settings.className + '">').appendTo(this.$tipsy), this.$tip.data("rootel", this.$el);
				var e = this.$el,
					i = this.$tip;
				this.$tip.html("" != this.settings.content ? "string" == typeof this.settings.content ? this.settings.content : this.settings.content(e, i) : this.title)
			},
			offset: function (t) {
				return this.$el[0].getBoundingClientRect()
			},
			destroy: function () {
				this.$tipsy && (this.$tipsy.remove(), t.removeData(this.$el, "tooltipsy"))
			},
			defaults: {
				alignTo: "element",
				offset: [0, -1],
				content: "",
				show: function (t, e) {
					e.fadeIn(100)
				},
				hide: function (t, e) {
					e.fadeOut(100)
				},
				css: {},
				className: "tooltipsy",
				delay: 200,
				showEvent: "mouseenter",
				hideEvent: "mouseleave"
			}
		}, t.fn.tooltipsy = function (e) {
			return this.each(function () {
				new t.tooltipsy(this, e)
			})
		}
	}(jQuery),
	function (t) {
		"use strict";
		! function (t, e, i, n) {
			t.widget("selectBox.selectBoxIt", {
				VERSION: "3.8.1",
				options: {
					showEffect: "none",
					showEffectOptions: {},
					showEffectSpeed: "medium",
					hideEffect: "none",
					hideEffectOptions: {},
					hideEffectSpeed: "medium",
					showFirstOption: !0,
					defaultText: "",
					defaultIcon: "",
					downArrowIcon: "",
					theme: "default",
					keydownOpen: !0,
					isMobile: function () {
						var t = navigator.userAgent || navigator.vendor || e.opera;
						return /iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/.test(t)
					},
					native: !1,
					aggressiveChange: !1,
					selectWhenHidden: !0,
					viewport: t(e),
					similarSearch: !1,
					copyAttributes: ["title", "rel"],
					copyClasses: "button",
					nativeMousedown: !1,
					customShowHideEvent: !1,
					autoWidth: !0,
					html: !0,
					populate: "",
					dynamicPositioning: !0,
					hideCurrent: !1
				},
				getThemes: function () {
					var e = t(this.element).attr("data-theme") || "c";
					return {
						bootstrap: {
							focus: "active",
							hover: "",
							enabled: "enabled",
							disabled: "disabled",
							arrow: "caret",
							button: "btn",
							list: "dropdown-menu",
							container: "bootstrap",
							open: "open"
						},
						jqueryui: {
							focus: "ui-state-focus",
							hover: "ui-state-hover",
							enabled: "ui-state-enabled",
							disabled: "ui-state-disabled",
							arrow: "ui-icon ui-icon-triangle-1-s",
							button: "ui-widget ui-state-default",
							list: "ui-widget ui-widget-content",
							container: "jqueryui",
							open: "selectboxit-open"
						},
						jquerymobile: {
							focus: "ui-btn-down-" + e,
							hover: "ui-btn-hover-" + e,
							enabled: "ui-enabled",
							disabled: "ui-disabled",
							arrow: "ui-icon ui-icon-arrow-d ui-icon-shadow",
							button: "ui-btn ui-btn-icon-right ui-btn-corner-all ui-shadow ui-btn-up-" + e,
							list: "ui-btn ui-btn-icon-right ui-btn-corner-all ui-shadow ui-btn-up-" + e,
							container: "jquerymobile",
							open: "selectboxit-open"
						},
						default: {
							focus: "selectboxit-focus",
							hover: "selectboxit-hover",
							enabled: "selectboxit-enabled",
							disabled: "selectboxit-disabled",
							arrow: "selectboxit-default-arrow",
							button: "selectboxit-btn",
							list: "selectboxit-list",
							container: "selectboxit-container",
							open: "selectboxit-open"
						}
					}
				},
				isDeferred: function (e) {
					return t.isPlainObject(e) && e.promise && e.done
				},
				_create: function (e) {
					var n = this,
						r = n.options.populate,
						o = n.options.theme;
					if (n.element.is("select")) return n.widgetProto = t.Widget.prototype, n.originalElem = n.element[0], n.selectBox = n.element, n.options.populate && n.add && !e && n.add(r), n.selectItems = n.element.find("option"), n.firstSelectItem = n.selectItems.slice(0, 1), n.documentHeight = t(i).height(), n.theme = t.isPlainObject(o) ? t.extend({}, n.getThemes().default, o) : n.getThemes()[o] ? n.getThemes()[o] : n.getThemes().default, n.currentFocus = 0, n.blur = !0, n.textArray = [], n.currentIndex = 0, n.currentText = "", n.flipped = !1, e || (n.selectBoxStyles = n.selectBox.attr("style")), n._createDropdownButton()._createUnorderedList()._copyAttributes()._replaceSelectBox()._addClasses(n.theme)._eventHandlers(), n.originalElem.disabled && n.disable && n.disable(), n._ariaAccessibility && n._ariaAccessibility(), n.isMobile = n.options.isMobile(), n._mobile && n._mobile(), n.options.native && this._applyNativeSelect(), n.triggerEvent("create"), n
				},
				_createDropdownButton: function () {
					var e = this,
						i = e.originalElemId = e.originalElem.id || "",
						n = e.originalElemValue = e.originalElem.value || "",
						r = e.originalElemName = e.originalElem.name || "",
						o = e.options.copyClasses,
						s = e.selectBox.attr("class") || "";
					return e.dropdownText = t("<span/>", {
						id: i && i + "SelectBoxItText",
						class: "selectboxit-text",
						unselectable: "on",
						text: e.firstSelectItem.text()
					}).attr("data-val", n), e.dropdownImageContainer = t("<span/>", {
						class: "selectboxit-option-icon-container"
					}), e.dropdownImage = t("<i/>", {
						id: i && i + "SelectBoxItDefaultIcon",
						class: "selectboxit-default-icon",
						unselectable: "on"
					}), e.dropdown = t("<span/>", {
						id: i && i + "SelectBoxIt",
						class: "selectboxit " + ("button" === o ? s : "") + " " + (e.selectBox.prop("disabled") ? e.theme.disabled : e.theme.enabled),
						name: r,
						tabindex: e.selectBox.attr("tabindex") || "0",
						unselectable: "on"
					}).append(e.dropdownImageContainer.append(e.dropdownImage)).append(e.dropdownText), e.dropdownContainer = t("<span/>", {
						id: i && i + "SelectBoxItContainer",
						class: "selectboxit-container " + e.theme.container + " " + ("container" === o ? s : "")
					}).append(e.dropdown), e
				},
				_createUnorderedList: function () {
					var e, i, n, r, o, s, a, l, u, c, h, d, p, f = this,
						m = "",
						g = f.originalElemId || "",
						v = t("<ul/>", {
							id: g && g + "SelectBoxItOptions",
							class: "selectboxit-options",
							tabindex: -1
						});
					if (f.options.showFirstOption || (f.selectItems.first().attr("disabled", "disabled"), f.selectItems = f.selectBox.find("option").slice(1)), f.selectItems.each(function (g) {
							d = t(this), i = "", n = "", e = d.prop("disabled"), r = d.attr("data-icon") || "", o = d.attr("data-iconurl") || "", s = o ? "selectboxit-option-icon-url" : "", a = o ? "style=\"background-image:url('" + o + "');\"" : "", l = d.attr("data-selectedtext"), u = d.attr("data-text"), h = u || d.text(), (p = d.parent()).is("optgroup") && (i = "selectboxit-optgroup-option", 0 === d.index() && (n = '<span class="selectboxit-optgroup-header ' + p.first().attr("class") + '"data-disabled="true">' + p.first().attr("label") + "</span>")), d.attr("value", this.value), m += n + '<li data-id="' + g + '" data-val="' + this.value + '" data-disabled="' + e + '" class="' + i + " selectboxit-option " + (t(this).attr("class") || "") + '"><a class="selectboxit-option-anchor"><span class="selectboxit-option-icon-container"><i class="selectboxit-option-icon ' + r + " " + (s || f.theme.container) + '"' + a + "></i></span>" + (f.options.html ? h : f.htmlEscape(h)) + "</a></li>", c = d.attr("data-search"), f.textArray[g] = e ? "" : c || h, this.selected && (f._setText(f.dropdownText, l || h), f.currentFocus = g)
						}), f.options.defaultText || f.selectBox.attr("data-text")) {
						var _ = f.options.defaultText || f.selectBox.attr("data-text");
						f._setText(f.dropdownText, _), f.options.defaultText = _
					}
					return v.append(m), f.list = v, f.dropdownContainer.append(f.list), f.listItems = f.list.children("li"), f.listAnchors = f.list.find("a"), f.listItems.first().addClass("selectboxit-option-first"), f.listItems.last().addClass("selectboxit-option-last"), f.list.find("li[data-disabled='true']").not(".optgroupHeader").addClass(f.theme.disabled), f.dropdownImage.addClass(f.selectBox.attr("data-icon") || f.options.defaultIcon || f.listItems.eq(f.currentFocus).find("i").attr("class")), f.dropdownImage.attr("style", f.listItems.eq(f.currentFocus).find("i").attr("style")), f
				},
				_replaceSelectBox: function () {
					var e, i, r = this,
						o = r.originalElem.id || "",
						s = r.selectBox.attr("data-size"),
						a = r.listSize = s === n ? "auto" : "0" === s ? "auto" : +s;
					return r.selectBox.css("display", "none").after(r.dropdownContainer), r.dropdownContainer.appendTo("body").addClass("selectboxit-rendering"), r.dropdown.height(), r.downArrow = t("<i/>", {
						id: o && o + "SelectBoxItArrow",
						class: "selectboxit-arrow",
						unselectable: "on"
					}), r.downArrowContainer = t("<span/>", {
						id: o && o + "SelectBoxItArrowContainer",
						class: "selectboxit-arrow-container",
						unselectable: "on"
					}).append(r.downArrow), r.dropdown.append(r.downArrowContainer), r.listItems.removeClass("selectboxit-selected").eq(r.currentFocus).addClass("selectboxit-selected"), e = r.downArrowContainer.outerWidth(!0), i = r.dropdownImage.outerWidth(!0), r.options.autoWidth && (r.dropdown.css({
						width: "auto"
					}).css({
						width: r.list.outerWidth(!0) + e + i
					}), r.list.css({
						"min-width": r.dropdown.width()
					})), r.dropdownText.css({
						"max-width": r.dropdownContainer.outerWidth(!0) - (e + i)
					}), r.selectBox.after(r.dropdownContainer), r.dropdownContainer.removeClass("selectboxit-rendering"), "number" === t.type(a) && (r.maxHeight = r.listAnchors.outerHeight(!0) * a), r
				},
				_scrollToView: function (t) {
					var e = this,
						i = e.listItems.eq(e.currentFocus),
						n = e.list.scrollTop(),
						r = i.height(),
						o = i.position().top,
						s = Math.abs(o),
						a = e.list.height();
					return "search" === t ? a - o < r ? e.list.scrollTop(n + (o - (a - r))) : o < -1 && e.list.scrollTop(o - r) : "up" === t ? o < -1 && e.list.scrollTop(n - s) : "down" === t && a - o < r && e.list.scrollTop(n + (s - a + r)), e
				},
				_callbackSupport: function (e) {
					var i = this;
					return t.isFunction(e) && e.call(i, i.dropdown), i
				},
				_setText: function (t, e) {
					var i = this;
					return i.options.html ? t.html(e) : t.text(e), i
				},
				open: function (t) {
					var e = this,
						i = e.options.showEffect,
						n = e.options.showEffectSpeed,
						r = e.options.showEffectOptions,
						o = e.options.native,
						s = e.isMobile;
					return !e.listItems.length || e.dropdown.hasClass(e.theme.disabled) ? e : (o || s || this.list.is(":visible") || (e.triggerEvent("open"), e._dynamicPositioning && e.options.dynamicPositioning && e._dynamicPositioning(), "none" === i ? e.list.show() : "show" === i || "slideDown" === i || "fadeIn" === i ? e.list[i](n) : e.list.show(i, r, n), e.list.promise().done(function () {
						e._scrollToView("search"), e.triggerEvent("opened")
					})), e._callbackSupport(t), e)
				},
				close: function (t) {
					var e = this,
						i = e.options.hideEffect,
						n = e.options.hideEffectSpeed,
						r = e.options.hideEffectOptions,
						o = e.options.native,
						s = e.isMobile;
					return o || s || !e.list.is(":visible") || (e.triggerEvent("close"), "none" === i ? e.list.hide() : "hide" === i || "slideUp" === i || "fadeOut" === i ? e.list[i](n) : e.list.hide(i, r, n), e.list.promise().done(function () {
						e.triggerEvent("closed")
					})), e._callbackSupport(t), e
				},
				toggle: function () {
					var t = this,
						e = t.list.is(":visible");
					e ? t.close() : e || t.open()
				},
				_keyMappings: {
					38: "up",
					40: "down",
					13: "enter",
					8: "backspace",
					9: "tab",
					32: "space",
					27: "esc"
				},
				_keydownMethods: function () {
					var t = this,
						e = t.list.is(":visible") || !t.options.keydownOpen;
					return {
						down: function () {
							t.moveDown && e && t.moveDown()
						},
						up: function () {
							t.moveUp && e && t.moveUp()
						},
						enter: function () {
							var e = t.listItems.eq(t.currentFocus);
							t._update(e), "true" !== e.attr("data-preventclose") && t.close(), t.triggerEvent("enter")
						},
						tab: function () {
							t.triggerEvent("tab-blur"), t.close()
						},
						backspace: function () {
							t.triggerEvent("backspace")
						},
						esc: function () {
							t.close()
						}
					}
				},
				_eventHandlers: function () {
					var e, i, n = this,
						r = n.options.nativeMousedown,
						o = n.options.customShowHideEvent,
						s = n.focusClass,
						a = n.hoverClass,
						l = n.openClass;
					return this.dropdown.on({
						"click.selectBoxIt": function () {
							n.dropdown.trigger("focus", !0), n.originalElem.disabled || (n.triggerEvent("click"), r || o || n.toggle())
						},
						"mousedown.selectBoxIt": function () {
							t(this).data("mdown", !0), n.triggerEvent("mousedown"), r && !o && n.toggle()
						},
						"mouseup.selectBoxIt": function () {
							n.triggerEvent("mouseup")
						},
						"blur.selectBoxIt": function () {
							n.blur && (n.triggerEvent("blur"), n.close(), t(this).removeClass(s))
						},
						"focus.selectBoxIt": function (e, i) {
							var r = t(this).data("mdown");
							t(this).removeData("mdown"), r || i || setTimeout(function () {
								n.triggerEvent("tab-focus")
							}, 0), i || (t(this).hasClass(n.theme.disabled) || t(this).addClass(s), n.triggerEvent("focus"))
						},
						"keydown.selectBoxIt": function (t) {
							var e = n._keyMappings[t.keyCode],
								i = n._keydownMethods()[e];
							i && (i(), !n.options.keydownOpen || "up" !== e && "down" !== e || n.open()), i && "tab" !== e && t.preventDefault()
						},
						"keypress.selectBoxIt": function (t) {
							var e = t.charCode || t.keyCode,
								i = n._keyMappings[t.charCode || t.keyCode],
								r = String.fromCharCode(e);
							n.search && (!i || i && "space" === i) && n.search(r, !0, !0), "space" === i && t.preventDefault()
						},
						"mouseenter.selectBoxIt": function () {
							n.triggerEvent("mouseenter")
						},
						"mouseleave.selectBoxIt": function () {
							n.triggerEvent("mouseleave")
						}
					}), n.list.on({
						"mouseover.selectBoxIt": function () {
							n.blur = !1
						},
						"mouseout.selectBoxIt": function () {
							n.blur = !0
						},
						"focusin.selectBoxIt": function () {
							n.dropdown.trigger("focus", !0)
						}
					}), n.list.on({
						"mousedown.selectBoxIt": function () {
							n._update(t(this)), n.triggerEvent("option-click"), "false" === t(this).attr("data-disabled") && "true" !== t(this).attr("data-preventclose") && n.close(), setTimeout(function () {
								n.dropdown.trigger("focus", !0)
							}, 0)
						},
						"focusin.selectBoxIt": function () {
							n.listItems.not(t(this)).removeAttr("data-active"), t(this).attr("data-active", "");
							var e = n.list.is(":hidden");
							(n.options.searchWhenHidden && e || n.options.aggressiveChange || e && n.options.selectWhenHidden) && n._update(t(this)), t(this).addClass(s)
						},
						"mouseup.selectBoxIt": function () {
							r && !o && (n._update(t(this)), n.triggerEvent("option-mouseup"), "false" === t(this).attr("data-disabled") && "true" !== t(this).attr("data-preventclose") && n.close())
						},
						"mouseenter.selectBoxIt": function () {
							"false" === t(this).attr("data-disabled") && (n.listItems.removeAttr("data-active"), t(this).addClass(s).attr("data-active", ""), n.listItems.not(t(this)).removeClass(s), t(this).addClass(s), n.currentFocus = +t(this).attr("data-id"))
						},
						"mouseleave.selectBoxIt": function () {
							"false" === t(this).attr("data-disabled") && (n.listItems.not(t(this)).removeClass(s).removeAttr("data-active"), t(this).addClass(s), n.currentFocus = +t(this).attr("data-id"))
						},
						"blur.selectBoxIt": function () {
							t(this).removeClass(s)
						}
					}, ".selectboxit-option"), n.list.on({
						"click.selectBoxIt": function (t) {
							t.preventDefault()
						}
					}, "a"), n.selectBox.on({
						"change.selectBoxIt, internal-change.selectBoxIt": function (t, r) {
							var o, s;
							r || (o = n.list.find('li[data-val="' + n.originalElem.value + '"]')).length && (n.listItems.eq(n.currentFocus).removeClass(n.focusClass), n.currentFocus = +o.attr("data-id")), s = (o = n.listItems.eq(n.currentFocus)).attr("data-selectedtext"), e = o.attr("data-text"), i = e || o.find("a").text(), n._setText(n.dropdownText, s || i), n.dropdownText.attr("data-val", n.originalElem.value), o.find("i").attr("class") && (n.dropdownImage.attr("class", o.find("i").attr("class")).addClass("selectboxit-default-icon"), n.dropdownImage.attr("style", o.find("i").attr("style"))), n.triggerEvent("changed")
						},
						"disable.selectBoxIt": function () {
							n.dropdown.addClass(n.theme.disabled)
						},
						"enable.selectBoxIt": function () {
							n.dropdown.removeClass(n.theme.disabled)
						},
						"open.selectBoxIt": function () {
							var t, e = n.list.find("li[data-val='" + n.dropdownText.attr("data-val") + "']");
							e.length || (e = n.listItems.not("[data-disabled=true]").first()), n.currentFocus = +e.attr("data-id"), t = n.listItems.eq(n.currentFocus), n.dropdown.addClass(l).removeClass(a).addClass(s), n.listItems.removeClass(n.selectedClass).removeAttr("data-active").not(t).removeClass(s), t.addClass(n.selectedClass).addClass(s), n.options.hideCurrent && (n.listItems.show(), t.hide())
						},
						"close.selectBoxIt": function () {
							n.dropdown.removeClass(l)
						},
						"blur.selectBoxIt": function () {
							n.dropdown.removeClass(s)
						},
						"mouseenter.selectBoxIt": function () {
							t(this).hasClass(n.theme.disabled) || n.dropdown.addClass(a)
						},
						"mouseleave.selectBoxIt": function () {
							n.dropdown.removeClass(a)
						},
						destroy: function (t) {
							t.preventDefault(), t.stopPropagation()
						}
					}), n
				},
				_update: function (t) {
					var e = this,
						i = e.options.defaultText || e.selectBox.attr("data-text"),
						n = e.listItems.eq(e.currentFocus);
					"false" === t.attr("data-disabled") && (e.listItems.eq(e.currentFocus).attr("data-selectedtext"), n.attr("data-text") || n.text(), (i && e.options.html ? e.dropdownText.html() === i : e.dropdownText.text() === i) && e.selectBox.val() === t.attr("data-val") ? e.triggerEvent("change") : (e.selectBox.val(t.attr("data-val")), e.currentFocus = +t.attr("data-id"), e.originalElem.value !== e.dropdownText.attr("data-val") && e.triggerEvent("change")))
				},
				_addClasses: function (t) {
					var e = this,
						i = (e.focusClass = t.focus, e.hoverClass = t.hover, t.button),
						n = t.list,
						r = t.arrow,
						o = t.container;
					e.openClass = t.open;
					return e.selectedClass = "selectboxit-selected", e.downArrow.addClass(e.selectBox.attr("data-downarrow") || e.options.downArrowIcon || r), e.dropdownContainer.addClass(o), e.dropdown.addClass(i), e.list.addClass(n), e
				},
				refresh: function (t, e) {
					var i = this;
					return i._destroySelectBoxIt()._create(!0), e || i.triggerEvent("refresh"), i._callbackSupport(t), i
				},
				htmlEscape: function (t) {
					return String(t).replace(/&/g, "&").replace(/'/g, "'").replace(/</g, "<").replace(/>/g, ">")
				},
				triggerEvent: function (t) {
					var e = this,
						i = e.options.showFirstOption ? e.currentFocus : e.currentFocus - 1 >= 0 ? e.currentFocus : 0;
					return e.selectBox.trigger(t, {
						selectbox: e.selectBox,
						selectboxOption: e.selectItems.eq(i),
						dropdown: e.dropdown,
						dropdownOption: e.listItems.eq(e.currentFocus)
					}), e
				},
				_copyAttributes: function () {
					var t = this;
					return t._addSelectBoxAttributes && t._addSelectBoxAttributes(), t
				},
				_realOuterWidth: function (t) {
					if (t.is(":visible")) return t.outerWidth(!0);
					var e, i = t.clone();
					return i.css({
						visibility: "hidden",
						display: "block",
						position: "absolute"
					}).appendTo("body"), e = i.outerWidth(!0), i.remove(), e
				}
			});
			var r = t.selectBox.selectBoxIt.prototype;
			r._ariaAccessibility = function () {
				var e = this,
					i = t("label[for='" + e.originalElem.id + "']");
				return e.dropdownContainer.attr({
					role: "combobox",
					"aria-autocomplete": "list",
					"aria-haspopup": "true",
					"aria-expanded": "false",
					"aria-owns": e.list[0].id
				}), e.dropdownText.attr({
					"aria-live": "polite"
				}), e.dropdown.on({
					"disable.selectBoxIt": function () {
						e.dropdownContainer.attr("aria-disabled", "true")
					},
					"enable.selectBoxIt": function () {
						e.dropdownContainer.attr("aria-disabled", "false")
					}
				}), i.length && e.dropdownContainer.attr("aria-labelledby", i[0].id), e.list.attr({
					role: "listbox",
					"aria-hidden": "true"
				}), e.listItems.attr({
					role: "option"
				}), e.selectBox.on({
					"open.selectBoxIt": function () {
						e.list.attr("aria-hidden", "false"), e.dropdownContainer.attr("aria-expanded", "true")
					},
					"close.selectBoxIt": function () {
						e.list.attr("aria-hidden", "true"), e.dropdownContainer.attr("aria-expanded", "false")
					}
				}), e
			}, r._addSelectBoxAttributes = function () {
				var e = this;
				return e._addAttributes(e.selectBox.prop("attributes"), e.dropdown), e.selectItems.each(function (i) {
					e._addAttributes(t(this).prop("attributes"), e.listItems.eq(i))
				}), e
			}, r._addAttributes = function (e, i) {
				var n = this,
					r = n.options.copyAttributes;
				return e.length && t.each(e, function (e, n) {
					var o = n.name.toLowerCase(),
						s = n.value;
					"null" === s || -1 === t.inArray(o, r) && -1 === o.indexOf("data") || i.attr(o, s)
				}), n
			}, r.destroy = function (t) {
				var e = this;
				return e._destroySelectBoxIt(), e.widgetProto.destroy.call(e), e._callbackSupport(t), e
			}, r._destroySelectBoxIt = function () {
				var e = this;
				return e.dropdown.off(".selectBoxIt"), t.contains(e.dropdownContainer[0], e.originalElem) && e.dropdownContainer.before(e.selectBox), e.dropdownContainer.remove(), e.selectBox.removeAttr("style").attr("style", e.selectBoxStyles), e.triggerEvent("destroy"), e
			}, r.disable = function (t) {
				var e = this;
				return e.options.disabled || (e.close(), e.selectBox.attr("disabled", "disabled"), e.dropdown.removeAttr("tabindex").removeClass(e.theme.enabled).addClass(e.theme.disabled), e.setOption("disabled", !0), e.triggerEvent("disable")), e._callbackSupport(t), e
			}, r.disableOption = function (e, i) {
				var n, r, o, s = this;
				return "number" === t.type(e) && (s.close(), n = s.selectBox.find("option").eq(e), s.triggerEvent("disable-option"), n.attr("disabled", "disabled"), s.listItems.eq(e).attr("data-disabled", "true").addClass(s.theme.disabled), s.currentFocus === e && (r = s.listItems.eq(s.currentFocus).nextAll("li").not("[data-disabled='true']").first().length, o = s.listItems.eq(s.currentFocus).prevAll("li").not("[data-disabled='true']").first().length, r ? s.moveDown() : o ? s.moveUp() : s.disable())), s._callbackSupport(i), s
			}, r._isDisabled = function (t) {
				var e = this;
				return e.originalElem.disabled && e.disable(), e
			}, r._dynamicPositioning = function () {
				var e = this;
				if ("number" === t.type(e.listSize)) e.list.removeClass("position-top").css("max-height", e.maxHeight || "none");
				else {
					var i = e.dropdown.offset().top,
						n = e.list.data("max-height") || e.list.outerHeight(),
						r = e.dropdown.outerHeight(),
						o = e.options.viewport,
						s = o.height(),
						a = t.isWindow(o.get(0)) ? o.scrollTop() : o.offset().top,
						l = !(i + r + n <= s + a);
					if (e.list.data("max-height") || e.list.data("max-height", e.list.outerHeight()), l)
						if (e.dropdown.offset().top - a >= n) e.list.css("max-height", n), e.list.addClass("position-top").css("top", e.dropdown.position().top - e.list.outerHeight());
						else {
							var u = Math.abs(i + r + n - (s + a)),
								c = Math.abs(e.dropdown.offset().top - a - n);
							u < c ? (e.list.css("max-height", n - u - r / 2), e.list.removeClass("position-top").css("top", "auto")) : (e.list.css("max-height", n - c - r / 2), e.list.addClass("position-top").css("top", e.dropdown.position().top - e.list.outerHeight()))
						}
					else e.list.css("max-height", n), e.list.removeClass("position-top").css("top", "auto")
				}
				return e
			}, r.enable = function (t) {
				var e = this;
				return e.options.disabled && (e.triggerEvent("enable"), e.selectBox.removeAttr("disabled"), e.dropdown.attr("tabindex", 0).removeClass(e.theme.disabled).addClass(e.theme.enabled), e.setOption("disabled", !1), e._callbackSupport(t)), e
			}, r.enableOption = function (e, i) {
				var n, r = this;
				return "number" === t.type(e) && (n = r.selectBox.find("option").eq(e), r.triggerEvent("enable-option"), n.removeAttr("disabled"), r.listItems.eq(e).attr("data-disabled", "false").removeClass(r.theme.disabled)), r._callbackSupport(i), r
			}, r.moveDown = function (t) {
				var e = this;
				e.currentFocus += 1;
				var i = "true" === e.listItems.eq(e.currentFocus).attr("data-disabled"),
					n = e.listItems.eq(e.currentFocus).nextAll("li").not("[data-disabled='true']").first().length;
				if (e.currentFocus === e.listItems.length) e.currentFocus -= 1;
				else {
					if (i && n) return e.listItems.eq(e.currentFocus - 1).blur(), void e.moveDown();
					i && !n ? e.currentFocus -= 1 : (e.listItems.eq(e.currentFocus - 1).blur().end().eq(e.currentFocus).focusin(), e._scrollToView("down"), e.triggerEvent("moveDown"))
				}
				return e._callbackSupport(t), e
			}, r.moveUp = function (t) {
				var e = this;
				e.currentFocus -= 1;
				var i = "true" === e.listItems.eq(e.currentFocus).attr("data-disabled"),
					n = e.listItems.eq(e.currentFocus).prevAll("li").not("[data-disabled='true']").first().length;
				if (-1 === e.currentFocus) e.currentFocus += 1;
				else {
					if (i && n) return e.listItems.eq(e.currentFocus + 1).blur(), void e.moveUp();
					i && !n ? e.currentFocus += 1 : (e.listItems.eq(this.currentFocus + 1).blur().end().eq(e.currentFocus).focusin(), e._scrollToView("up"), e.triggerEvent("moveUp"))
				}
				return e._callbackSupport(t), e
			}, r._setCurrentSearchOption = function (t) {
				var e = this;
				return (e.options.aggressiveChange || e.options.selectWhenHidden || e.listItems.eq(t).is(":visible")) && !0 !== e.listItems.eq(t).data("disabled") && (e.listItems.eq(e.currentFocus).blur(), e.currentIndex = t, e.currentFocus = t, e.listItems.eq(e.currentFocus).focusin(), e._scrollToView("search"), e.triggerEvent("search")), e
			}, r._searchAlgorithm = function (t, e) {
				var i, n, r, o, s = this,
					a = !1,
					l = s.textArray,
					u = s.currentText;
				for (i = t, r = l.length; i < r; i += 1) {
					for (o = l[i], n = 0; n < r; n += 1) - 1 !== l[n].search(e) && (a = !0, n = r);
					if (a || (s.currentText = s.currentText.charAt(s.currentText.length - 1).replace(/[|()\[{.+*?$\\]/g, "\\$0"), u = s.currentText), e = new RegExp(u, "gi"), u.length < 3) {
						if (e = new RegExp(u.charAt(0), "gi"), -1 !== o.charAt(0).search(e)) return s._setCurrentSearchOption(i), (o.substring(0, u.length).toLowerCase() !== u.toLowerCase() || s.options.similarSearch) && (s.currentIndex += 1), !1
					} else if (-1 !== o.search(e)) return s._setCurrentSearchOption(i), !1;
					if (o.toLowerCase() === s.currentText.toLowerCase()) return s._setCurrentSearchOption(i), s.currentText = "", !1
				}
				return !0
			}, r.search = function (t, e, i) {
				var n = this;
				return i ? n.currentText += t.replace(/[|()\[{.+*?$\\]/g, "\\$0") : n.currentText = t.replace(/[|()\[{.+*?$\\]/g, "\\$0"), n._searchAlgorithm(n.currentIndex, new RegExp(n.currentText, "gi")) && n._searchAlgorithm(0, n.currentText), n._callbackSupport(e), n
			}, r._updateMobileText = function () {
				var t, e, i = this;
				e = (t = i.selectBox.find("option").filter(":selected")).attr("data-text") || t.text(), i._setText(i.dropdownText, e), i.list.find('li[data-val="' + t.val() + '"]').find("i").attr("class") && i.dropdownImage.attr("class", i.list.find('li[data-val="' + t.val() + '"]').find("i").attr("class")).addClass("selectboxit-default-icon")
			}, r._applyNativeSelect = function () {
				var t = this;
				return t.dropdownContainer.append(t.selectBox), t.dropdown.attr("tabindex", "-1"), t.selectBox.css({
					display: "block",
					visibility: "visible",
					width: t._realOuterWidth(t.dropdown),
					height: t.dropdown.outerHeight(),
					opacity: "0",
					position: "absolute",
					top: "0",
					left: "0",
					cursor: "pointer",
					"z-index": "799",
					margin: t.dropdown.css("margin"),
					padding: "0",
					"-webkit-appearance": "menulist-button"
				}), t.originalElem.disabled && t.triggerEvent("disable"), this
			}, r._mobileEvents = function () {
				var t = this;
				t.selectBox.on({
					"changed.selectBoxIt": function () {
						t.hasChanged = !0, t._updateMobileText(), t.triggerEvent("option-click")
					},
					"mousedown.selectBoxIt": function () {
						t.hasChanged || !t.options.defaultText || t.originalElem.disabled || (t._updateMobileText(), t.triggerEvent("option-click"))
					},
					"enable.selectBoxIt": function () {
						t.selectBox.removeClass("selectboxit-rendering")
					},
					"disable.selectBoxIt": function () {
						t.selectBox.addClass("selectboxit-rendering")
					}
				})
			}, r._mobile = function (t) {
				var e = this;
				return e.isMobile && (e._applyNativeSelect(), e._mobileEvents()), this
			}, r.selectOption = function (e, i) {
				var n = this,
					r = t.type(e);
				return "number" === r ? n.selectBox.val(n.selectItems.eq(e).val()).change() : "string" === r && n.selectBox.val(e).change(), n._callbackSupport(i), n
			}, r.setOption = function (e, i, n) {
				var r = this;
				return "string" === t.type(e) && (r.options[e] = i), r.refresh(function () {
					r._callbackSupport(n)
				}, !0), r
			}, r.setOptions = function (e, i) {
				var n = this;
				return t.isPlainObject(e) && (n.options = t.extend({}, n.options, e)), n.refresh(function () {
					n._callbackSupport(i)
				}, !0), n
			}, r.wait = function (t, e) {
				var i = this;
				return i.widgetProto._delay.call(i, e, t), i
			}, r.add = function (e, i) {
				this._populate(e, function (e) {
					var n, r, o = this,
						s = t.type(e),
						a = 0,
						l = [],
						u = o._isJSON(e),
						c = u && o._parseJSON(e);
					if (e && ("array" === s || u && c.data && "array" === t.type(c.data)) || "object" === s && e.data && "array" === t.type(e.data)) {
						for (o._isJSON(e) && (e = c), e.data && (e = e.data), r = e.length; a <= r - 1; a += 1) n = e[a], t.isPlainObject(n) ? l.push(t("<option/>", n)) : "string" === t.type(n) && l.push(t("<option/>", {
							text: n,
							value: n
						}));
						o.selectBox.append(l)
					} else e && "string" === s && !o._isJSON(e) ? o.selectBox.append(e) : e && "object" === s ? o.selectBox.append(t("<option/>", e)) : e && o._isJSON(e) && t.isPlainObject(o._parseJSON(e)) && o.selectBox.append(t("<option/>", o._parseJSON(e)));
					return o.dropdown ? o.refresh(function () {
						o._callbackSupport(i)
					}, !0) : o._callbackSupport(i), o
				})
			}, r._parseJSON = function (e) {
				return JSON && JSON.parse && JSON.parse(e) || t.parseJSON(e)
			}, r._isJSON = function (t) {
				var e = this;
				try {
					return e._parseJSON(t), !0
				} catch (t) {
					return !1
				}
			}, r._populate = function (e, i) {
				var n = this;
				return e = t.isFunction(e) ? e.call() : e, n.isDeferred(e) ? e.done(function (t) {
					i.call(n, t)
				}) : i.call(n, e), n
			}, r.remove = function (e, i) {
				var n, r, o = this,
					s = t.type(e),
					a = 0,
					l = "";
				if ("array" === s) {
					for (r = e.length; a <= r - 1; a += 1) n = e[a], "number" === t.type(n) && (l.length ? l += ", option:eq(" + n + ")" : l += "option:eq(" + n + ")");
					o.selectBox.find(l).remove()
				} else "number" === s ? o.selectBox.find("option").eq(e).remove() : o.selectBox.find("option").remove();
				return o.dropdown ? o.refresh(function () {
					o._callbackSupport(i)
				}, !0) : o._callbackSupport(i), o
			}
		}(window.jQuery, window, document)
	}(),
	function (t) {
		"function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery || Zepto)
	}(function (t) {
		var e = function (e, i, n) {
			var r = {
				invalid: [],
				getCaret: function () {
					try {
						var t, i = 0,
							n = e.get(0),
							o = document.selection,
							s = n.selectionStart;
						return o && -1 === navigator.appVersion.indexOf("MSIE 10") ? ((t = o.createRange()).moveStart("character", -r.val().length), i = t.text.length) : (s || "0" === s) && (i = s), i
					} catch (t) {}
				},
				setCaret: function (t) {
					try {
						if (e.is(":focus")) {
							var i, n = e.get(0);
							n.setSelectionRange ? (n.focus(), n.setSelectionRange(t, t)) : ((i = n.createTextRange()).collapse(!0), i.moveEnd("character", t), i.moveStart("character", t), i.select())
						}
					} catch (t) {}
				},
				events: function () {
					e.on("keydown.mask", function (t) {
						e.data("mask-keycode", t.keyCode || t.which)
					}).on(t.jMaskGlobals.useInput ? "input.mask" : "keyup.mask", r.behaviour).on("paste.mask drop.mask", function () {
						setTimeout(function () {
							e.keydown().keyup()
						}, 100)
					}).on("change.mask", function () {
						e.data("changed", !0)
					}).on("blur.mask", function () {
						a === r.val() || e.data("changed") || e.trigger("change"), e.data("changed", !1)
					}).on("blur.mask", function () {
						a = r.val()
					}).on("focus.mask", function (e) {
						!0 === n.selectOnFocus && t(e.target).select()
					}).on("focusout.mask", function () {
						n.clearIfNotMatch && !o.test(r.val()) && r.val("")
					})
				},
				getRegexMask: function () {
					for (var t, e, n, r, o = [], a = 0; a < i.length; a++)(t = s.translation[i.charAt(a)]) ? (e = t.pattern.toString().replace(/.{1}$|^.{1}/g, ""), n = t.optional, (t = t.recursive) ? (o.push(i.charAt(a)), r = {
						digit: i.charAt(a),
						pattern: e
					}) : o.push(n || t ? e + "?" : e)) : o.push(i.charAt(a).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
					return o = o.join(""), r && (o = o.replace(new RegExp("(" + r.digit + "(.*" + r.digit + ")?)"), "($1)?").replace(new RegExp(r.digit, "g"), r.pattern)), new RegExp(o)
				},
				destroyEvents: function () {
					e.off("input keydown keyup paste drop blur focusout ".split(" ").join(".mask "))
				},
				val: function (t) {
					var i = e.is("input") ? "val" : "text";
					return 0 < arguments.length ? (e[i]() !== t && e[i](t), i = e) : i = e[i](), i
				},
				getMCharsBeforeCount: function (t, e) {
					for (var n = 0, r = 0, o = i.length; r < o && r < t; r++) s.translation[i.charAt(r)] || (t = e ? t + 1 : t, n++);
					return n
				},
				caretPos: function (t, e, n, o) {
					return s.translation[i.charAt(Math.min(t - 1, i.length - 1))] ? Math.min(t + n - e - o, n) : r.caretPos(t + 1, e, n, o)
				},
				behaviour: function (i) {
					i = i || window.event, r.invalid = [];
					var n = e.data("mask-keycode");
					if (-1 === t.inArray(n, s.byPassKeys)) {
						var o = r.getCaret(),
							a = r.val().length,
							l = r.getMasked(),
							u = l.length,
							c = r.getMCharsBeforeCount(u - 1) - r.getMCharsBeforeCount(a - 1),
							h = o < a;
						return r.val(l), h && (8 !== n && 46 !== n && (o = r.caretPos(o, a, u, c)), r.setCaret(o)), r.callbacks(i)
					}
				},
				getMasked: function (t, e) {
					var o, a, l = [],
						u = void 0 === e ? r.val() : e + "",
						c = 0,
						h = i.length,
						d = 0,
						p = u.length,
						f = 1,
						m = "push",
						g = -1;
					for (n.reverse ? (m = "unshift", f = -1, o = 0, c = h - 1, d = p - 1, a = function () {
							return -1 < c && -1 < d
						}) : (o = h - 1, a = function () {
							return c < h && d < p
						}); a();) {
						var v = i.charAt(c),
							_ = u.charAt(d),
							y = s.translation[v];
						y ? (_.match(y.pattern) ? (l[m](_), y.recursive && (-1 === g ? g = c : c === o && (c = g - f), o === g && (c -= f)), c += f) : y.optional ? (c += f, d -= f) : y.fallback ? (l[m](y.fallback), c += f, d -= f) : r.invalid.push({
							p: d,
							v: _,
							e: y.pattern
						}), d += f) : (t || l[m](v), _ === v && (d += f), c += f)
					}
					return u = i.charAt(o), h !== p + 1 || s.translation[u] || l.push(u), l.join("")
				},
				callbacks: function (t) {
					var o = r.val(),
						s = o !== a,
						l = [o, t, e, n],
						u = function (t, e, i) {
							"function" == typeof n[t] && e && n[t].apply(this, i)
						};
					u("onChange", !0 === s, l), u("onKeyPress", !0 === s, l), u("onComplete", o.length === i.length, l), u("onInvalid", 0 < r.invalid.length, [o, t, e, r.invalid, n])
				}
			};
			e = t(e);
			var o, s = this,
				a = r.val();
			i = "function" == typeof i ? i(r.val(), void 0, e, n) : i, s.mask = i, s.options = n, s.remove = function () {
				var t = r.getCaret();
				return r.destroyEvents(), r.val(s.getCleanVal()), r.setCaret(t - r.getMCharsBeforeCount(t)), e
			}, s.getCleanVal = function () {
				return r.getMasked(!0)
			}, s.getMaskedVal = function (t) {
				return r.getMasked(!1, t)
			}, s.init = function (i) {
				i = i || !1, n = n || {}, s.clearIfNotMatch = t.jMaskGlobals.clearIfNotMatch, s.byPassKeys = t.jMaskGlobals.byPassKeys, s.translation = t.extend({}, t.jMaskGlobals.translation, n.translation), s = t.extend(!0, {}, s, n), o = r.getRegexMask(), !1 === i ? (n.placeholder && e.attr("placeholder", n.placeholder), e.data("mask") && e.attr("autocomplete", "off"), r.destroyEvents(), r.events(), i = r.getCaret(), r.val(r.getMasked()), r.setCaret(i + r.getMCharsBeforeCount(i, !0))) : (r.events(), r.val(r.getMasked()))
			}, s.init(!e.is("input"))
		};
		t.maskWatchers = {};
		var i = function () {
				var i = t(this),
					r = {},
					o = i.attr("data-mask");
				if (i.attr("data-mask-reverse") && (r.reverse = !0), i.attr("data-mask-clearifnotmatch") && (r.clearIfNotMatch = !0), "true" === i.attr("data-mask-selectonfocus") && (r.selectOnFocus = !0), n(i, o, r)) return i.data("mask", new e(this, o, r))
			},
			n = function (e, i, n) {
				n = n || {};
				var r = t(e).data("mask"),
					o = JSON.stringify;
				e = t(e).val() || t(e).text();
				try {
					return "function" == typeof i && (i = i(e)), "object" != typeof r || o(r.options) !== o(n) || r.mask !== i
				} catch (t) {}
			};
		t.fn.mask = function (i, r) {
			r = r || {};
			var o = this.selector,
				s = (a = t.jMaskGlobals).watchInterval,
				a = r.watchInputs || a.watchInputs,
				l = function () {
					if (n(this, i, r)) return t(this).data("mask", new e(this, i, r))
				};
			return t(this).each(l), o && "" !== o && a && (clearInterval(t.maskWatchers[o]), t.maskWatchers[o] = setInterval(function () {
				t(document).find(o).each(l)
			}, s)), this
		}, t.fn.masked = function (t) {
			return this.data("mask").getMaskedVal(t)
		}, t.fn.unmask = function () {
			return clearInterval(t.maskWatchers[this.selector]), delete t.maskWatchers[this.selector], this.each(function () {
				var e = t(this).data("mask");
				e && e.remove().removeData("mask")
			})
		}, t.fn.cleanVal = function () {
			return this.data("mask").getCleanVal()
		}, t.applyDataMask = function (e) {
			((e = e || t.jMaskGlobals.maskElements) instanceof t ? e : t(e)).filter(t.jMaskGlobals.dataMaskAttr).each(i)
		};
		var r = {
			maskElements: "input,td,span,div",
			dataMaskAttr: "*[data-mask]",
			dataMask: !0,
			watchInterval: 300,
			watchInputs: !0,
			useInput: function (t) {
				var e, i = document.createElement("div");
				return t = "on" + t, (e = t in i) || (i.setAttribute(t, "return;"), e = "function" == typeof i[t]), e
			}("input"),
			watchDataMask: !1,
			byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
			translation: {
				0: {
					pattern: /\d/
				},
				9: {
					pattern: /\d/,
					optional: !0
				},
				"#": {
					pattern: /\d/,
					recursive: !0
				},
				A: {
					pattern: /[a-zA-Z0-9]/
				},
				S: {
					pattern: /[a-zA-Z]/
				}
			}
		};
		t.jMaskGlobals = t.jMaskGlobals || {}, (r = t.jMaskGlobals = t.extend(!0, {}, r, t.jMaskGlobals)).dataMask && t.applyDataMask(), setInterval(function () {
			t.jMaskGlobals.watchDataMask && t.applyDataMask()
		}, r.watchInterval)
	}),
	function (t, e, i, n) {
		function r(e, i) {
			this.settings = null, this.options = t.extend({}, r.Defaults, i), this.$element = t(e), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
				time: null,
				target: null,
				pointer: null,
				stage: {
					start: null,
					current: null
				},
				direction: null
			}, this._states = {
				current: {},
				tags: {
					initializing: ["busy"],
					animating: ["busy"],
					dragging: ["interacting"]
				}
			}, t.each(["onResize", "onThrottledResize"], t.proxy(function (e, i) {
				this._handlers[i] = t.proxy(this[i], this)
			}, this)), t.each(r.Plugins, t.proxy(function (t, e) {
				this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this)
			}, this)), t.each(r.Workers, t.proxy(function (e, i) {
				this._pipe.push({
					filter: i.filter,
					run: t.proxy(i.run, this)
				})
			}, this)), this.setup(), this.initialize()
		}
		r.Defaults = {
			items: 3,
			loop: !1,
			center: !1,
			rewind: !1,
			mouseDrag: !0,
			touchDrag: !0,
			pullDrag: !0,
			freeDrag: !1,
			margin: 0,
			stagePadding: 0,
			merge: !1,
			mergeFit: !0,
			autoWidth: !1,
			startPosition: 0,
			rtl: !1,
			smartSpeed: 250,
			fluidSpeed: !1,
			dragEndSpeed: !1,
			responsive: {},
			responsiveRefreshRate: 200,
			responsiveBaseElement: e,
			fallbackEasing: "swing",
			info: !1,
			nestedItemSelector: !1,
			itemElement: "div",
			stageElement: "div",
			refreshClass: "owl-refresh",
			loadedClass: "owl-loaded",
			loadingClass: "owl-loading",
			rtlClass: "owl-rtl",
			responsiveClass: "owl-responsive",
			dragClass: "owl-drag",
			itemClass: "owl-item",
			stageClass: "owl-stage",
			stageOuterClass: "owl-stage-outer",
			grabClass: "owl-grab"
		}, r.Width = {
			Default: "default",
			Inner: "inner",
			Outer: "outer"
		}, r.Type = {
			Event: "event",
			State: "state"
		}, r.Plugins = {}, r.Workers = [{
			filter: ["width", "settings"],
			run: function () {
				this._width = this.$element.width()
			}
		}, {
			filter: ["width", "items", "settings"],
			run: function (t) {
				t.current = this._items && this._items[this.relative(this._current)]
			}
		}, {
			filter: ["items", "settings"],
			run: function () {
				this.$stage.children(".cloned").remove()
			}
		}, {
			filter: ["width", "items", "settings"],
			run: function (t) {
				var e = this.settings.margin || "",
					i = !this.settings.autoWidth,
					n = this.settings.rtl,
					r = {
						width: "auto",
						"margin-left": n ? e : "",
						"margin-right": n ? "" : e
					};
				!i && this.$stage.children().css(r), t.css = r
			}
		}, {
			filter: ["width", "items", "settings"],
			run: function (t) {
				var e = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
					i = null,
					n = this._items.length,
					r = !this.settings.autoWidth,
					o = [];
				for (t.items = {
						merge: !1,
						width: e
					}; n--;) i = this._mergers[n], i = this.settings.mergeFit && Math.min(i, this.settings.items) || i, t.items.merge = i > 1 || t.items.merge, o[n] = r ? e * i : this._items[n].width();
				this._widths = o
			}
		}, {
			filter: ["items", "settings"],
			run: function () {
				var e = [],
					i = this._items,
					n = this.settings,
					r = Math.max(2 * n.items, 4),
					o = 2 * Math.ceil(i.length / 2),
					s = n.loop && i.length ? n.rewind ? r : Math.max(r, o) : 0,
					a = "",
					l = "";
				for (s /= 2; s--;) e.push(this.normalize(e.length / 2, !0)), a += i[e[e.length - 1]][0].outerHTML, e.push(this.normalize(i.length - 1 - (e.length - 1) / 2, !0)), l = i[e[e.length - 1]][0].outerHTML + l;
				this._clones = e, t(a).addClass("cloned").appendTo(this.$stage), t(l).addClass("cloned").prependTo(this.$stage)
			}
		}, {
			filter: ["width", "items", "settings"],
			run: function () {
				for (var t = this.settings.rtl ? 1 : -1, e = this._clones.length + this._items.length, i = -1, n = 0, r = 0, o = []; ++i < e;) n = o[i - 1] || 0, r = this._widths[this.relative(i)] + this.settings.margin, o.push(n + r * t);
				this._coordinates = o
			}
		}, {
			filter: ["width", "items", "settings"],
			run: function () {
				var t = this.settings.stagePadding,
					e = this._coordinates,
					i = {
						width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t,
						"padding-left": t || "",
						"padding-right": t || ""
					};
				this.$stage.css(i)
			}
		}, {
			filter: ["width", "items", "settings"],
			run: function (t) {
				var e = this._coordinates.length,
					i = !this.settings.autoWidth,
					n = this.$stage.children();
				if (i && t.items.merge)
					for (; e--;) t.css.width = this._widths[this.relative(e)], n.eq(e).css(t.css);
				else i && (t.css.width = t.items.width, n.css(t.css))
			}
		}, {
			filter: ["items"],
			run: function () {
				this._coordinates.length < 1 && this.$stage.removeAttr("style")
			}
		}, {
			filter: ["width", "items", "settings"],
			run: function (t) {
				t.current = t.current ? this.$stage.children().index(t.current) : 0, t.current = Math.max(this.minimum(), Math.min(this.maximum(), t.current)), this.reset(t.current)
			}
		}, {
			filter: ["position"],
			run: function () {
				this.animate(this.coordinates(this._current))
			}
		}, {
			filter: ["width", "position", "items", "settings"],
			run: function () {
				var t, e, i, n, r = this.settings.rtl ? 1 : -1,
					o = 2 * this.settings.stagePadding,
					s = this.coordinates(this.current()) + o,
					a = s + this.width() * r,
					l = [];
				for (i = 0, n = this._coordinates.length; n > i; i++) t = this._coordinates[i - 1] || 0, e = Math.abs(this._coordinates[i]) + o * r, (this.op(t, "<=", s) && this.op(t, ">", a) || this.op(e, "<", s) && this.op(e, ">", a)) && l.push(i);
				this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + l.join("), :eq(") + ")").addClass("active"), this.settings.center && (this.$stage.children(".center").removeClass("center"), this.$stage.children().eq(this.current()).addClass("center"))
			}
		}], r.prototype.initialize = function () {
			if (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) {
				var e, i, r;
				e = this.$element.find("img"), i = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : n, r = this.$element.children(i).width(), e.length && 0 >= r && this.preloadAutoWidthImages(e)
			}
			this.$element.addClass(this.options.loadingClass), this.$stage = t("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this.$element.is(":visible") ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
		}, r.prototype.setup = function () {
			var e = this.viewport(),
				i = this.options.responsive,
				n = -1,
				r = null;
			i ? (t.each(i, function (t) {
				e >= t && t > n && (n = Number(t))
			}), "function" == typeof (r = t.extend({}, this.options, i[n])).stagePadding && (r.stagePadding = r.stagePadding()), delete r.responsive, r.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + n))) : r = t.extend({}, this.options), this.trigger("change", {
				property: {
					name: "settings",
					value: r
				}
			}), this._breakpoint = n, this.settings = r, this.invalidate("settings"), this.trigger("changed", {
				property: {
					name: "settings",
					value: this.settings
				}
			})
		}, r.prototype.optionsLogic = function () {
			this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
		}, r.prototype.prepare = function (e) {
			var i = this.trigger("prepare", {
				content: e
			});
			return i.data || (i.data = t("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(e)), this.trigger("prepared", {
				content: i.data
			}), i.data
		}, r.prototype.update = function () {
			for (var e = 0, i = this._pipe.length, n = t.proxy(function (t) {
					return this[t]
				}, this._invalidated), r = {}; i > e;)(this._invalidated.all || t.grep(this._pipe[e].filter, n).length > 0) && this._pipe[e].run(r), e++;
			this._invalidated = {}, !this.is("valid") && this.enter("valid")
		}, r.prototype.width = function (t) {
			switch (t = t || r.Width.Default) {
				case r.Width.Inner:
				case r.Width.Outer:
					return this._width;
				default:
					return this._width - 2 * this.settings.stagePadding + this.settings.margin
			}
		}, r.prototype.refresh = function () {
			this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
		}, r.prototype.onThrottledResize = function () {
			e.clearTimeout(this.resizeTimer), this.resizeTimer = e.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
		}, r.prototype.onResize = function () {
			return !!this._items.length && (this._width !== this.$element.width() && (!!this.$element.is(":visible") && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))))
		}, r.prototype.registerEventHandlers = function () {
			t.support.transition && this.$stage.on(t.support.transition.end + ".owl.core", t.proxy(this.onTransitionEnd, this)), !1 !== this.settings.responsive && this.on(e, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", t.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function () {
				return !1
			})), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", t.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", t.proxy(this.onDragEnd, this)))
		}, r.prototype.onDragStart = function (e) {
			var n = null;
			3 !== e.which && (t.support.transform ? (n = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","), n = {
				x: n[16 === n.length ? 12 : 4],
				y: n[16 === n.length ? 13 : 5]
			}) : (n = this.$stage.position(), n = {
				x: this.settings.rtl ? n.left + this.$stage.width() - this.width() + this.settings.margin : n.left,
				y: n.top
			}), this.is("animating") && (t.support.transform ? this.animate(n.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === e.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = t(e.target), this._drag.stage.start = n, this._drag.stage.current = n, this._drag.pointer = this.pointer(e), t(i).on("mouseup.owl.core touchend.owl.core", t.proxy(this.onDragEnd, this)), t(i).one("mousemove.owl.core touchmove.owl.core", t.proxy(function (e) {
				var n = this.difference(this._drag.pointer, this.pointer(e));
				t(i).on("mousemove.owl.core touchmove.owl.core", t.proxy(this.onDragMove, this)), Math.abs(n.x) < Math.abs(n.y) && this.is("valid") || (e.preventDefault(), this.enter("dragging"), this.trigger("drag"))
			}, this)))
		}, r.prototype.onDragMove = function (t) {
			var e = null,
				i = null,
				n = null,
				r = this.difference(this._drag.pointer, this.pointer(t)),
				o = this.difference(this._drag.stage.start, r);
			this.is("dragging") && (t.preventDefault(), this.settings.loop ? (e = this.coordinates(this.minimum()), i = this.coordinates(this.maximum() + 1) - e, o.x = ((o.x - e) % i + i) % i + e) : (e = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), i = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), n = this.settings.pullDrag ? -1 * r.x / 5 : 0, o.x = Math.max(Math.min(o.x, e + n), i + n)), this._drag.stage.current = o, this.animate(o.x))
		}, r.prototype.onDragEnd = function (e) {
			var n = this.difference(this._drag.pointer, this.pointer(e)),
				r = this._drag.stage.current,
				o = n.x > 0 ^ this.settings.rtl ? "left" : "right";
			t(i).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== n.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(r.x, 0 !== n.x ? o : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = o, (Math.abs(n.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function () {
				return !1
			})), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
		}, r.prototype.closest = function (e, i) {
			var n = -1,
				r = this.width(),
				o = this.coordinates();
			return this.settings.freeDrag || t.each(o, t.proxy(function (t, s) {
				return "left" === i && e > s - 30 && s + 30 > e ? n = t : "right" === i && e > s - r - 30 && s - r + 30 > e ? n = t + 1 : this.op(e, "<", s) && this.op(e, ">", o[t + 1] || s - r) && (n = "left" === i ? t + 1 : t), -1 === n
			}, this)), this.settings.loop || (this.op(e, ">", o[this.minimum()]) ? n = e = this.minimum() : this.op(e, "<", o[this.maximum()]) && (n = e = this.maximum())), n
		}, r.prototype.animate = function (e) {
			var i = this.speed() > 0;
			this.is("animating") && this.onTransitionEnd(), i && (this.enter("animating"), this.trigger("translate")), t.support.transform3d && t.support.transition ? this.$stage.css({
				transform: "translate3d(" + e + "px,0px,0px)",
				transition: this.speed() / 1e3 + "s"
			}) : i ? this.$stage.animate({
				left: e + "px"
			}, this.speed(), this.settings.fallbackEasing, t.proxy(this.onTransitionEnd, this)) : this.$stage.css({
				left: e + "px"
			})
		}, r.prototype.is = function (t) {
			return this._states.current[t] && this._states.current[t] > 0
		}, r.prototype.current = function (t) {
			if (t === n) return this._current;
			if (0 === this._items.length) return n;
			if (t = this.normalize(t), this._current !== t) {
				var e = this.trigger("change", {
					property: {
						name: "position",
						value: t
					}
				});
				e.data !== n && (t = this.normalize(e.data)), this._current = t, this.invalidate("position"), this.trigger("changed", {
					property: {
						name: "position",
						value: this._current
					}
				})
			}
			return this._current
		}, r.prototype.invalidate = function (e) {
			return "string" === t.type(e) && (this._invalidated[e] = !0, this.is("valid") && this.leave("valid")), t.map(this._invalidated, function (t, e) {
				return e
			})
		}, r.prototype.reset = function (t) {
			(t = this.normalize(t)) !== n && (this._speed = 0, this._current = t, this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]))
		}, r.prototype.normalize = function (t, e) {
			var i = this._items.length,
				r = e ? 0 : this._clones.length;
			return !this.isNumeric(t) || 1 > i ? t = n : (0 > t || t >= i + r) && (t = ((t - r / 2) % i + i) % i + r / 2), t
		}, r.prototype.relative = function (t) {
			return t -= this._clones.length / 2, this.normalize(t, !0)
		}, r.prototype.maximum = function (t) {
			var e, i, n, r = this.settings,
				o = this._coordinates.length;
			if (r.loop) o = this._clones.length / 2 + this._items.length - 1;
			else if (r.autoWidth || r.merge) {
				for (e = this._items.length, i = this._items[--e].width(), n = this.$element.width(); e-- && !((i += this._items[e].width() + this.settings.margin) > n););
				o = e + 1
			} else o = r.center ? this._items.length - 1 : this._items.length - r.items;
			return t && (o -= this._clones.length / 2), Math.max(o, 0)
		}, r.prototype.minimum = function (t) {
			return t ? 0 : this._clones.length / 2
		}, r.prototype.items = function (t) {
			return t === n ? this._items.slice() : (t = this.normalize(t, !0), this._items[t])
		}, r.prototype.mergers = function (t) {
			return t === n ? this._mergers.slice() : (t = this.normalize(t, !0), this._mergers[t])
		}, r.prototype.clones = function (e) {
			var i = this._clones.length / 2,
				r = i + this._items.length,
				o = function (t) {
					return t % 2 == 0 ? r + t / 2 : i - (t + 1) / 2
				};
			return e === n ? t.map(this._clones, function (t, e) {
				return o(e)
			}) : t.map(this._clones, function (t, i) {
				return t === e ? o(i) : null
			})
		}, r.prototype.speed = function (t) {
			return t !== n && (this._speed = t), this._speed
		}, r.prototype.coordinates = function (e) {
			var i, r = 1,
				o = e - 1;
			return e === n ? t.map(this._coordinates, t.proxy(function (t, e) {
				return this.coordinates(e)
			}, this)) : (this.settings.center ? (this.settings.rtl && (r = -1, o = e + 1), i = this._coordinates[e], i += (this.width() - i + (this._coordinates[o] || 0)) / 2 * r) : i = this._coordinates[o] || 0, i = Math.ceil(i))
		}, r.prototype.duration = function (t, e, i) {
			return 0 === i ? 0 : Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed)
		}, r.prototype.to = function (t, e) {
			var i = this.current(),
				n = null,
				r = t - this.relative(i),
				o = (r > 0) - (0 > r),
				s = this._items.length,
				a = this.minimum(),
				l = this.maximum();
			this.settings.loop ? (!this.settings.rewind && Math.abs(r) > s / 2 && (r += -1 * o * s), t = i + r, (n = ((t - a) % s + s) % s + a) !== t && l >= n - r && n - r > 0 && (i = n - r, t = n, this.reset(i))) : this.settings.rewind ? (l += 1, t = (t % l + l) % l) : t = Math.max(a, Math.min(l, t)), this.speed(this.duration(i, t, e)), this.current(t), this.$element.is(":visible") && this.update()
		}, r.prototype.next = function (t) {
			t = t || !1, this.to(this.relative(this.current()) + 1, t)
		}, r.prototype.prev = function (t) {
			t = t || !1, this.to(this.relative(this.current()) - 1, t)
		}, r.prototype.onTransitionEnd = function (t) {
			return (t === n || (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) === this.$stage.get(0))) && (this.leave("animating"), void this.trigger("translated"))
		}, r.prototype.viewport = function () {
			var n;
			if (this.options.responsiveBaseElement !== e) n = t(this.options.responsiveBaseElement).width();
			else if (e.innerWidth) n = e.innerWidth;
			else {
				if (!i.documentElement || !i.documentElement.clientWidth) throw "Can not detect viewport width.";
				n = i.documentElement.clientWidth
			}
			return n
		}, r.prototype.replace = function (e) {
			this.$stage.empty(), this._items = [], e && (e = e instanceof jQuery ? e : t(e)), this.settings.nestedItemSelector && (e = e.find("." + this.settings.nestedItemSelector)), e.filter(function () {
				return 1 === this.nodeType
			}).each(t.proxy(function (t, e) {
				e = this.prepare(e), this.$stage.append(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
			}, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
		}, r.prototype.add = function (e, i) {
			var r = this.relative(this._current);
			i = i === n ? this._items.length : this.normalize(i, !0), e = e instanceof jQuery ? e : t(e), this.trigger("add", {
				content: e,
				position: i
			}), e = this.prepare(e), 0 === this._items.length || i === this._items.length ? (0 === this._items.length && this.$stage.append(e), 0 !== this._items.length && this._items[i - 1].after(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[i].before(e), this._items.splice(i, 0, e), this._mergers.splice(i, 0, 1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[r] && this.reset(this._items[r].index()), this.invalidate("items"), this.trigger("added", {
				content: e,
				position: i
			})
		}, r.prototype.remove = function (t) {
			(t = this.normalize(t, !0)) !== n && (this.trigger("remove", {
				content: this._items[t],
				position: t
			}), this._items[t].remove(), this._items.splice(t, 1), this._mergers.splice(t, 1), this.invalidate("items"), this.trigger("removed", {
				content: null,
				position: t
			}))
		}, r.prototype.preloadAutoWidthImages = function (e) {
			e.each(t.proxy(function (e, i) {
				this.enter("pre-loading"), i = t(i), t(new Image).one("load", t.proxy(function (t) {
					i.attr("src", t.target.src), i.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh()
				}, this)).attr("src", i.attr("src") || i.attr("data-src") || i.attr("data-src-retina"))
			}, this))
		}, r.prototype.destroy = function () {
			this.$element.off(".owl.core"), this.$stage.off(".owl.core"), t(i).off(".owl.core"), !1 !== this.settings.responsive && (e.clearTimeout(this.resizeTimer), this.off(e, "resize", this._handlers.onThrottledResize));
			for (var n in this._plugins) this._plugins[n].destroy();
			this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
		}, r.prototype.op = function (t, e, i) {
			var n = this.settings.rtl;
			switch (e) {
				case "<":
					return n ? t > i : i > t;
				case ">":
					return n ? i > t : t > i;
				case ">=":
					return n ? i >= t : t >= i;
				case "<=":
					return n ? t >= i : i >= t
			}
		}, r.prototype.on = function (t, e, i, n) {
			t.addEventListener ? t.addEventListener(e, i, n) : t.attachEvent && t.attachEvent("on" + e, i)
		}, r.prototype.off = function (t, e, i, n) {
			t.removeEventListener ? t.removeEventListener(e, i, n) : t.detachEvent && t.detachEvent("on" + e, i)
		}, r.prototype.trigger = function (e, i, n, o, s) {
			var a = {
					item: {
						count: this._items.length,
						index: this.current()
					}
				},
				l = t.camelCase(t.grep(["on", e, n], function (t) {
					return t
				}).join("-").toLowerCase()),
				u = t.Event([e, "owl", n || "carousel"].join(".").toLowerCase(), t.extend({
					relatedTarget: this
				}, a, i));
			return this._supress[e] || (t.each(this._plugins, function (t, e) {
				e.onTrigger && e.onTrigger(u)
			}), this.register({
				type: r.Type.Event,
				name: e
			}), this.$element.trigger(u), this.settings && "function" == typeof this.settings[l] && this.settings[l].call(this, u)), u
		}, r.prototype.enter = function (e) {
			t.each([e].concat(this._states.tags[e] || []), t.proxy(function (t, e) {
				this._states.current[e] === n && (this._states.current[e] = 0), this._states.current[e]++
			}, this))
		}, r.prototype.leave = function (e) {
			t.each([e].concat(this._states.tags[e] || []), t.proxy(function (t, e) {
				this._states.current[e]--
			}, this))
		}, r.prototype.register = function (e) {
			if (e.type === r.Type.Event) {
				if (t.event.special[e.name] || (t.event.special[e.name] = {}), !t.event.special[e.name].owl) {
					var i = t.event.special[e.name]._default;
					t.event.special[e.name]._default = function (t) {
						return !i || !i.apply || t.namespace && -1 !== t.namespace.indexOf("owl") ? t.namespace && t.namespace.indexOf("owl") > -1 : i.apply(this, arguments)
					}, t.event.special[e.name].owl = !0
				}
			} else e.type === r.Type.State && (this._states.tags[e.name] ? this._states.tags[e.name] = this._states.tags[e.name].concat(e.tags) : this._states.tags[e.name] = e.tags, this._states.tags[e.name] = t.grep(this._states.tags[e.name], t.proxy(function (i, n) {
				return t.inArray(i, this._states.tags[e.name]) === n
			}, this)))
		}, r.prototype.suppress = function (e) {
			t.each(e, t.proxy(function (t, e) {
				this._supress[e] = !0
			}, this))
		}, r.prototype.release = function (e) {
			t.each(e, t.proxy(function (t, e) {
				delete this._supress[e]
			}, this))
		}, r.prototype.pointer = function (t) {
			var i = {
				x: null,
				y: null
			};
			return t = t.originalEvent || t || e.event, t = t.touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t, t.pageX ? (i.x = t.pageX, i.y = t.pageY) : (i.x = t.clientX, i.y = t.clientY), i
		}, r.prototype.isNumeric = function (t) {
			return !isNaN(parseFloat(t))
		}, r.prototype.difference = function (t, e) {
			return {
				x: t.x - e.x,
				y: t.y - e.y
			}
		}, t.fn.owlCarousel = function (e) {
			var i = Array.prototype.slice.call(arguments, 1);
			return this.each(function () {
				var n = t(this),
					o = n.data("owl.carousel");
				o || (o = new r(this, "object" == typeof e && e), n.data("owl.carousel", o), t.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function (e, i) {
					o.register({
						type: r.Type.Event,
						name: i
					}), o.$element.on(i + ".owl.carousel.core", t.proxy(function (t) {
						t.namespace && t.relatedTarget !== this && (this.suppress([i]), o[i].apply(this, [].slice.call(arguments, 1)), this.release([i]))
					}, o))
				})), "string" == typeof e && "_" !== e.charAt(0) && o[e].apply(o, i)
			})
		}, t.fn.owlCarousel.Constructor = r
	}(window.Zepto || window.jQuery, window, document),
	function (t, e, i, n) {
		var r = function (e) {
			this._core = e, this._interval = null, this._visible = null, this._handlers = {
				"initialized.owl.carousel": t.proxy(function (t) {
					t.namespace && this._core.settings.autoRefresh && this.watch()
				}, this)
			}, this._core.options = t.extend({}, r.Defaults, this._core.options), this._core.$element.on(this._handlers)
		};
		r.Defaults = {
			autoRefresh: !0,
			autoRefreshInterval: 500
		}, r.prototype.watch = function () {
			this._interval || (this._visible = this._core.$element.is(":visible"), this._interval = e.setInterval(t.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
		}, r.prototype.refresh = function () {
			this._core.$element.is(":visible") !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
		}, r.prototype.destroy = function () {
			var t, i;
			e.clearInterval(this._interval);
			for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
			for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
		}, t.fn.owlCarousel.Constructor.Plugins.AutoRefresh = r
	}(window.Zepto || window.jQuery, window, document),
	function (t, e, i, n) {
		var r = function (e) {
			this._core = e, this._loaded = [], this._handlers = {
				"initialized.owl.carousel change.owl.carousel resized.owl.carousel": t.proxy(function (e) {
					if (e.namespace && this._core.settings && this._core.settings.lazyLoad && (e.property && "position" == e.property.name || "initialized" == e.type))
						for (var i = this._core.settings, n = i.center && Math.ceil(i.items / 2) || i.items, r = i.center && -1 * n || 0, o = (e.property && void 0 !== e.property.value ? e.property.value : this._core.current()) + r, s = this._core.clones().length, a = t.proxy(function (t, e) {
								this.load(e)
							}, this); r++ < n;) this.load(s / 2 + this._core.relative(o)), s && t.each(this._core.clones(this._core.relative(o)), a), o++
				}, this)
			}, this._core.options = t.extend({}, r.Defaults, this._core.options), this._core.$element.on(this._handlers)
		};
		r.Defaults = {
			lazyLoad: !1
		}, r.prototype.load = function (i) {
			var n = this._core.$stage.children().eq(i),
				r = n && n.find(".owl-lazy");
			!r || t.inArray(n.get(0), this._loaded) > -1 || (r.each(t.proxy(function (i, n) {
				var r, o = t(n),
					s = e.devicePixelRatio > 1 && o.attr("data-src-retina") || o.attr("data-src");
				this._core.trigger("load", {
					element: o,
					url: s
				}, "lazy"), o.is("img") ? o.one("load.owl.lazy", t.proxy(function () {
					o.css("opacity", 1), this._core.trigger("loaded", {
						element: o,
						url: s
					}, "lazy")
				}, this)).attr("src", s) : (r = new Image, r.onload = t.proxy(function () {
					o.css({
						"background-image": "url(" + s + ")",
						opacity: "1"
					}), this._core.trigger("loaded", {
						element: o,
						url: s
					}, "lazy")
				}, this), r.src = s)
			}, this)), this._loaded.push(n.get(0)))
		}, r.prototype.destroy = function () {
			var t, e;
			for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
			for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
		}, t.fn.owlCarousel.Constructor.Plugins.Lazy = r
	}(window.Zepto || window.jQuery, window, document),
	function (t, e, i, n) {
		var r = function (e) {
			this._core = e, this._handlers = {
				"initialized.owl.carousel refreshed.owl.carousel": t.proxy(function (t) {
					t.namespace && this._core.settings.autoHeight && this.update()
				}, this),
				"changed.owl.carousel": t.proxy(function (t) {
					t.namespace && this._core.settings.autoHeight && "position" == t.property.name && this.update()
				}, this),
				"loaded.owl.lazy": t.proxy(function (t) {
					t.namespace && this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
				}, this)
			}, this._core.options = t.extend({}, r.Defaults, this._core.options), this._core.$element.on(this._handlers)
		};
		r.Defaults = {
			autoHeight: !1,
			autoHeightClass: "owl-height"
		}, r.prototype.update = function () {
			var e = this._core._current,
				i = e + this._core.settings.items,
				n = this._core.$stage.children().toArray().slice(e, i),
				r = [],
				o = 0;
			t.each(n, function (e, i) {
				r.push(t(i).height())
			}), o = Math.max.apply(null, r), this._core.$stage.parent().height(o).addClass(this._core.settings.autoHeightClass)
		}, r.prototype.destroy = function () {
			var t, e;
			for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
			for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
		}, t.fn.owlCarousel.Constructor.Plugins.AutoHeight = r
	}(window.Zepto || window.jQuery, window, document),
	function (t, e, i, n) {
		var r = function (e) {
			this._core = e, this._videos = {}, this._playing = null, this._handlers = {
				"initialized.owl.carousel": t.proxy(function (t) {
					t.namespace && this._core.register({
						type: "state",
						name: "playing",
						tags: ["interacting"]
					})
				}, this),
				"resize.owl.carousel": t.proxy(function (t) {
					t.namespace && this._core.settings.video && this.isInFullScreen() && t.preventDefault()
				}, this),
				"refreshed.owl.carousel": t.proxy(function (t) {
					t.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
				}, this),
				"changed.owl.carousel": t.proxy(function (t) {
					t.namespace && "position" === t.property.name && this._playing && this.stop()
				}, this),
				"prepared.owl.carousel": t.proxy(function (e) {
					if (e.namespace) {
						var i = t(e.content).find(".owl-video");
						i.length && (i.css("display", "none"), this.fetch(i, t(e.content)))
					}
				}, this)
			}, this._core.options = t.extend({}, r.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", t.proxy(function (t) {
				this.play(t)
			}, this))
		};
		r.Defaults = {
			video: !1,
			videoHeight: !1,
			videoWidth: !1
		}, r.prototype.fetch = function (t, e) {
			var i = function () {
					return t.attr("data-vimeo-id") ? "vimeo" : t.attr("data-vzaar-id") ? "vzaar" : "youtube"
				}(),
				n = t.attr("data-vimeo-id") || t.attr("data-youtube-id") || t.attr("data-vzaar-id"),
				r = t.attr("data-width") || this._core.settings.videoWidth,
				o = t.attr("data-height") || this._core.settings.videoHeight,
				s = t.attr("href");
			if (!s) throw new Error("Missing video URL.");
			if ((n = s.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/))[3].indexOf("youtu") > -1) i = "youtube";
			else if (n[3].indexOf("vimeo") > -1) i = "vimeo";
			else {
				if (!(n[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
				i = "vzaar"
			}
			n = n[6], this._videos[s] = {
				type: i,
				id: n,
				width: r,
				height: o
			}, e.attr("data-video", s), this.thumbnail(t, this._videos[s])
		}, r.prototype.thumbnail = function (e, i) {
			var n, r, o, s = i.width && i.height ? 'style="width:' + i.width + "px;height:" + i.height + 'px;"' : "",
				a = e.find("img"),
				l = "src",
				u = "",
				c = this._core.settings,
				h = function (t) {
					r = '<div class="owl-video-play-icon"></div>', n = c.lazyLoad ? '<div class="owl-video-tn ' + u + '" ' + l + '="' + t + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + t + ')"></div>', e.after(n), e.after(r)
				};
			return e.wrap('<div class="owl-video-wrapper"' + s + "></div>"), this._core.settings.lazyLoad && (l = "data-src", u = "owl-lazy"), a.length ? (h(a.attr(l)), a.remove(), !1) : void("youtube" === i.type ? (o = "//img.youtube.com/vi/" + i.id + "/hqdefault.jpg", h(o)) : "vimeo" === i.type ? t.ajax({
				type: "GET",
				url: "//vimeo.com/api/v2/video/" + i.id + ".json",
				jsonp: "callback",
				dataType: "jsonp",
				success: function (t) {
					o = t[0].thumbnail_large, h(o)
				}
			}) : "vzaar" === i.type && t.ajax({
				type: "GET",
				url: "//vzaar.com/api/videos/" + i.id + ".json",
				jsonp: "callback",
				dataType: "jsonp",
				success: function (t) {
					o = t.framegrab_url, h(o)
				}
			}))
		}, r.prototype.stop = function () {
			this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
		}, r.prototype.play = function (e) {
			var i, n = t(e.target).closest("." + this._core.settings.itemClass),
				r = this._videos[n.attr("data-video")],
				o = r.width || "100%",
				s = r.height || this._core.$stage.height();
			this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), n = this._core.items(this._core.relative(n.index())), this._core.reset(n.index()), "youtube" === r.type ? i = '<iframe width="' + o + '" height="' + s + '" src="//www.youtube.com/embed/' + r.id + "?autoplay=1&v=" + r.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === r.type ? i = '<iframe src="//player.vimeo.com/video/' + r.id + '?autoplay=1" width="' + o + '" height="' + s + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' : "vzaar" === r.type && (i = '<iframe frameborder="0"height="' + s + '"width="' + o + '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' + r.id + '/player?autoplay=true"></iframe>'), t('<div class="owl-video-frame">' + i + "</div>").insertAfter(n.find(".owl-video")), this._playing = n.addClass("owl-video-playing"))
		}, r.prototype.isInFullScreen = function () {
			var e = i.fullscreenElement || i.mozFullScreenElement || i.webkitFullscreenElement;
			return e && t(e).parent().hasClass("owl-video-frame")
		}, r.prototype.destroy = function () {
			var t, e;
			this._core.$element.off("click.owl.video");
			for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
			for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
		}, t.fn.owlCarousel.Constructor.Plugins.Video = r
	}(window.Zepto || window.jQuery, window, document),
	function (t, e, i, n) {
		var r = function (e) {
			this.core = e, this.core.options = t.extend({}, r.Defaults, this.core.options), this.swapping = !0, this.previous = n, this.next = n, this.handlers = {
				"change.owl.carousel": t.proxy(function (t) {
					t.namespace && "position" == t.property.name && (this.previous = this.core.current(), this.next = t.property.value)
				}, this),
				"drag.owl.carousel dragged.owl.carousel translated.owl.carousel": t.proxy(function (t) {
					t.namespace && (this.swapping = "translated" == t.type)
				}, this),
				"translate.owl.carousel": t.proxy(function (t) {
					t.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
				}, this)
			}, this.core.$element.on(this.handlers)
		};
		r.Defaults = {
			animateOut: !1,
			animateIn: !1
		}, r.prototype.swap = function () {
			if (1 === this.core.settings.items && t.support.animation && t.support.transition) {
				this.core.speed(0);
				var e, i = t.proxy(this.clear, this),
					n = this.core.$stage.children().eq(this.previous),
					r = this.core.$stage.children().eq(this.next),
					o = this.core.settings.animateIn,
					s = this.core.settings.animateOut;
				this.core.current() !== this.previous && (s && (e = this.core.coordinates(this.previous) - this.core.coordinates(this.next), n.one(t.support.animation.end, i).css({
					left: e + "px"
				}).addClass("animated owl-animated-out").addClass(s)), o && r.one(t.support.animation.end, i).addClass("animated owl-animated-in").addClass(o))
			}
		}, r.prototype.clear = function (e) {
			t(e.target).css({
				left: ""
			}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
		}, r.prototype.destroy = function () {
			var t, e;
			for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
			for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
		}, t.fn.owlCarousel.Constructor.Plugins.Animate = r
	}(window.Zepto || window.jQuery, window, document),
	function (t, e, i, n) {
		var r = function (e) {
			this._core = e, this._timeout = null, this._paused = !1, this._handlers = {
				"changed.owl.carousel": t.proxy(function (t) {
					t.namespace && "settings" === t.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : t.namespace && "position" === t.property.name && this._core.settings.autoplay && this._setAutoPlayInterval()
				}, this),
				"initialized.owl.carousel": t.proxy(function (t) {
					t.namespace && this._core.settings.autoplay && this.play()
				}, this),
				"play.owl.autoplay": t.proxy(function (t, e, i) {
					t.namespace && this.play(e, i)
				}, this),
				"stop.owl.autoplay": t.proxy(function (t) {
					t.namespace && this.stop()
				}, this),
				"mouseover.owl.autoplay": t.proxy(function () {
					this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
				}, this),
				"mouseleave.owl.autoplay": t.proxy(function () {
					this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
				}, this),
				"touchstart.owl.core": t.proxy(function () {
					this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
				}, this),
				"touchend.owl.core": t.proxy(function () {
					this._core.settings.autoplayHoverPause && this.play()
				}, this)
			}, this._core.$element.on(this._handlers), this._core.options = t.extend({}, r.Defaults, this._core.options)
		};
		r.Defaults = {
			autoplay: !1,
			autoplayTimeout: 5e3,
			autoplayHoverPause: !1,
			autoplaySpeed: !1
		}, r.prototype.play = function (t, e) {
			this._paused = !1, this._core.is("rotating") || (this._core.enter("rotating"), this._setAutoPlayInterval())
		}, r.prototype._getNextTimeout = function (n, r) {
			return this._timeout && e.clearTimeout(this._timeout), e.setTimeout(t.proxy(function () {
				this._paused || this._core.is("busy") || this._core.is("interacting") || i.hidden || this._core.next(r || this._core.settings.autoplaySpeed)
			}, this), n || this._core.settings.autoplayTimeout)
		}, r.prototype._setAutoPlayInterval = function () {
			this._timeout = this._getNextTimeout()
		}, r.prototype.stop = function () {
			this._core.is("rotating") && (e.clearTimeout(this._timeout), this._core.leave("rotating"))
		}, r.prototype.pause = function () {
			this._core.is("rotating") && (this._paused = !0)
		}, r.prototype.destroy = function () {
			var t, e;
			this.stop();
			for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
			for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
		}, t.fn.owlCarousel.Constructor.Plugins.autoplay = r
	}(window.Zepto || window.jQuery, window, document),
	function (t, e, i, n) {
		"use strict";
		var r = function (e) {
			this._core = e, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
				next: this._core.next,
				prev: this._core.prev,
				to: this._core.to
			}, this._handlers = {
				"prepared.owl.carousel": t.proxy(function (e) {
					e.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + t(e.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
				}, this),
				"added.owl.carousel": t.proxy(function (t) {
					t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 0, this._templates.pop())
				}, this),
				"remove.owl.carousel": t.proxy(function (t) {
					t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 1)
				}, this),
				"changed.owl.carousel": t.proxy(function (t) {
					t.namespace && "position" == t.property.name && this.draw()
				}, this),
				"initialized.owl.carousel": t.proxy(function (t) {
					t.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
				}, this),
				"refreshed.owl.carousel": t.proxy(function (t) {
					t.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
				}, this)
			}, this._core.options = t.extend({}, r.Defaults, this._core.options), this.$element.on(this._handlers)
		};
		r.Defaults = {
			nav: !1,
			navText: ["prev", "next"],
			navSpeed: !1,
			navElement: "div",
			navContainer: !1,
			navContainerClass: "owl-nav",
			navClass: ["owl-prev", "owl-next"],
			slideBy: 1,
			dotClass: "owl-dot",
			dotsClass: "owl-dots",
			dots: !0,
			dotsEach: !1,
			dotsData: !1,
			dotsSpeed: !1,
			dotsContainer: !1
		}, r.prototype.initialize = function () {
			var e, i = this._core.settings;
			this._controls.$relative = (i.navContainer ? t(i.navContainer) : t("<div>").addClass(i.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = t("<" + i.navElement + ">").addClass(i.navClass[0]).html(i.navText[0]).prependTo(this._controls.$relative).on("click", t.proxy(function (t) {
				this.prev(i.navSpeed)
			}, this)), this._controls.$next = t("<" + i.navElement + ">").addClass(i.navClass[1]).html(i.navText[1]).appendTo(this._controls.$relative).on("click", t.proxy(function (t) {
				this.next(i.navSpeed)
			}, this)), i.dotsData || (this._templates = [t("<div>").addClass(i.dotClass).append(t("<span>")).prop("outerHTML")]), this._controls.$absolute = (i.dotsContainer ? t(i.dotsContainer) : t("<div>").addClass(i.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "div", t.proxy(function (e) {
				var n = t(e.target).parent().is(this._controls.$absolute) ? t(e.target).index() : t(e.target).parent().index();
				e.preventDefault(), this.to(n, i.dotsSpeed)
			}, this));
			for (e in this._overrides) this._core[e] = t.proxy(this[e], this)
		}, r.prototype.destroy = function () {
			var t, e, i, n;
			for (t in this._handlers) this.$element.off(t, this._handlers[t]);
			for (e in this._controls) this._controls[e].remove();
			for (n in this.overides) this._core[n] = this._overrides[n];
			for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
		}, r.prototype.update = function () {
			var t, e, i, n = this._core.clones().length / 2,
				r = n + this._core.items().length,
				o = this._core.maximum(!0),
				s = this._core.settings,
				a = s.center || s.autoWidth || s.dotsData ? 1 : s.dotsEach || s.items;
			if ("page" !== s.slideBy && (s.slideBy = Math.min(s.slideBy, s.items)), s.dots || "page" == s.slideBy)
				for (this._pages = [], t = n, e = 0, i = 0; r > t; t++) {
					if (e >= a || 0 === e) {
						if (this._pages.push({
								start: Math.min(o, t - n),
								end: t - n + a - 1
							}), Math.min(o, t - n) === o) break;
						e = 0, ++i
					}
					e += this._core.mergers(this._core.relative(t))
				}
		}, r.prototype.draw = function () {
			var e, i = this._core.settings,
				n = this._core.items().length <= i.items,
				r = this._core.relative(this._core.current()),
				o = i.loop || i.rewind;
			this._controls.$relative.toggleClass("disabled", !i.nav || n), i.nav && (this._controls.$previous.toggleClass("disabled", !o && r <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !o && r >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !i.dots || n), i.dots && (e = this._pages.length - this._controls.$absolute.children().length, i.dotsData && 0 !== e ? this._controls.$absolute.html(this._templates.join("")) : e > 0 ? this._controls.$absolute.append(new Array(e + 1).join(this._templates[0])) : 0 > e && this._controls.$absolute.children().slice(e).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(t.inArray(this.current(), this._pages)).addClass("active"))
		}, r.prototype.onTrigger = function (e) {
			var i = this._core.settings;
			e.page = {
				index: t.inArray(this.current(), this._pages),
				count: this._pages.length,
				size: i && (i.center || i.autoWidth || i.dotsData ? 1 : i.dotsEach || i.items)
			}
		}, r.prototype.current = function () {
			var e = this._core.relative(this._core.current());
			return t.grep(this._pages, t.proxy(function (t, i) {
				return t.start <= e && t.end >= e
			}, this)).pop()
		}, r.prototype.getPosition = function (e) {
			var i, n, r = this._core.settings;
			return "page" == r.slideBy ? (i = t.inArray(this.current(), this._pages), n = this._pages.length, e ? ++i : --i, i = this._pages[(i % n + n) % n].start) : (i = this._core.relative(this._core.current()), n = this._core.items().length, e ? i += r.slideBy : i -= r.slideBy), i
		}, r.prototype.next = function (e) {
			t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e)
		}, r.prototype.prev = function (e) {
			t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e)
		}, r.prototype.to = function (e, i, n) {
			var r;
			!n && this._pages.length ? (r = this._pages.length, t.proxy(this._overrides.to, this._core)(this._pages[(e % r + r) % r].start, i)) : t.proxy(this._overrides.to, this._core)(e, i)
		}, t.fn.owlCarousel.Constructor.Plugins.Navigation = r
	}(window.Zepto || window.jQuery, window, document),
	function (t, e, i, n) {
		"use strict";
		var r = function (i) {
			this._core = i, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
				"initialized.owl.carousel": t.proxy(function (i) {
					i.namespace && "URLHash" === this._core.settings.startPosition && t(e).trigger("hashchange.owl.navigation")
				}, this),
				"prepared.owl.carousel": t.proxy(function (e) {
					if (e.namespace) {
						var i = t(e.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
						if (!i) return;
						this._hashes[i] = e.content
					}
				}, this),
				"changed.owl.carousel": t.proxy(function (i) {
					if (i.namespace && "position" === i.property.name) {
						var n = this._core.items(this._core.relative(this._core.current())),
							r = t.map(this._hashes, function (t, e) {
								return t === n ? e : null
							}).join();
						if (!r || e.location.hash.slice(1) === r) return;
						e.location.hash = r
					}
				}, this)
			}, this._core.options = t.extend({}, r.Defaults, this._core.options), this.$element.on(this._handlers), t(e).on("hashchange.owl.navigation", t.proxy(function (t) {
				var i = e.location.hash.substring(1),
					n = this._core.$stage.children(),
					r = this._hashes[i] && n.index(this._hashes[i]);
				void 0 !== r && r !== this._core.current() && this._core.to(this._core.relative(r), !1, !0)
			}, this))
		};
		r.Defaults = {
			URLhashListener: !1
		}, r.prototype.destroy = function () {
			var i, n;
			t(e).off("hashchange.owl.navigation");
			for (i in this._handlers) this._core.$element.off(i, this._handlers[i]);
			for (n in Object.getOwnPropertyNames(this)) "function" != typeof this[n] && (this[n] = null)
		}, t.fn.owlCarousel.Constructor.Plugins.Hash = r
	}(window.Zepto || window.jQuery, window, document),
	function (t, e, i, n) {
		function r(e, i) {
			var r = !1,
				o = e.charAt(0).toUpperCase() + e.slice(1);
			return t.each((e + " " + a.join(o + " ") + o).split(" "), function (t, e) {
				return s[e] !== n ? (r = !i || e, !1) : void 0
			}), r
		}

		function o(t) {
			return r(t, !0)
		}
		var s = t("<support>").get(0).style,
			a = "Webkit Moz O ms".split(" "),
			l = {
				transition: {
					end: {
						WebkitTransition: "webkitTransitionEnd",
						MozTransition: "transitionend",
						OTransition: "oTransitionEnd",
						transition: "transitionend"
					}
				},
				animation: {
					end: {
						WebkitAnimation: "webkitAnimationEnd",
						MozAnimation: "animationend",
						OAnimation: "oAnimationEnd",
						animation: "animationend"
					}
				}
			},
			u = {
				csstransforms: function () {
					return !!r("transform")
				},
				csstransforms3d: function () {
					return !!r("perspective")
				},
				csstransitions: function () {
					return !!r("transition")
				},
				cssanimations: function () {
					return !!r("animation")
				}
			};
		u.csstransitions() && (t.support.transition = new String(o("transition")), t.support.transition.end = l.transition.end[t.support.transition]), u.cssanimations() && (t.support.animation = new String(o("animation")), t.support.animation.end = l.animation.end[t.support.animation]), u.csstransforms() && (t.support.transform = new String(o("transform")), t.support.transform3d = u.csstransforms3d())
	}(window.Zepto || window.jQuery, window, document),
	function (t) {
		"function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof module && module.exports ? module.exports = t : t(jQuery, window, document)
	}(function (t) {
		! function (e) {
			var i = "function" == typeof define && define.amd,
				n = "undefined" != typeof module && module.exports,
				r = "https:" == document.location.protocol ? "https:" : "http:";
			i || (n ? require("jquery-mousewheel")(t) : t.event.special.mousewheel || t("head").append(decodeURI("%3Cscript src=" + r + "//cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js%3E%3C/script%3E"))),
				function () {
					var e, i = "mCustomScrollbar",
						n = {
							setTop: 0,
							setLeft: 0,
							axis: "y",
							scrollbarPosition: "inside",
							scrollInertia: 950,
							autoDraggerLength: !0,
							alwaysShowScrollbar: 0,
							snapOffset: 0,
							mouseWheel: {
								enable: !0,
								scrollAmount: "auto",
								axis: "y",
								deltaFactor: "auto",
								disableOver: ["select", "option", "keygen", "datalist", "textarea"]
							},
							scrollButtons: {
								scrollType: "stepless",
								scrollAmount: "auto"
							},
							keyboard: {
								enable: !0,
								scrollType: "stepless",
								scrollAmount: "auto"
							},
							contentTouchScroll: 25,
							documentTouchScroll: !0,
							advanced: {
								autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
								updateOnContentResize: !0,
								updateOnImageLoad: "auto",
								autoUpdateTimeout: 60
							},
							theme: "light",
							callbacks: {
								onTotalScrollOffset: 0,
								onTotalScrollBackOffset: 0,
								alwaysTriggerOffsets: !0
							}
						},
						r = 0,
						o = {},
						s = window.attachEvent && !window.addEventListener ? 1 : 0,
						a = !1,
						l = ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag", "mCS_img_loaded", "mCS_disabled", "mCS_destroyed", "mCS_no_scrollbar", "mCS-autoHide", "mCS-dir-rtl", "mCS_no_scrollbar_y", "mCS_no_scrollbar_x", "mCS_y_hidden", "mCS_x_hidden", "mCSB_draggerContainer", "mCSB_buttonUp", "mCSB_buttonDown", "mCSB_buttonLeft", "mCSB_buttonRight"],
						u = {
							init: function (e) {
								var e = t.extend(!0, {}, n, e),
									i = c.call(this);
								if (e.live) {
									var s = e.liveSelector || this.selector || ".mCustomScrollbar",
										a = t(s);
									if ("off" === e.live) return void d(s);
									o[s] = setTimeout(function () {
										a.mCustomScrollbar(e), "once" === e.live && a.length && d(s)
									}, 500)
								} else d(s);
								return e.setWidth = e.set_width ? e.set_width : e.setWidth, e.setHeight = e.set_height ? e.set_height : e.setHeight, e.axis = e.horizontalScroll ? "x" : p(e.axis), e.scrollInertia = e.scrollInertia > 0 && e.scrollInertia < 17 ? 17 : e.scrollInertia, "object" != typeof e.mouseWheel && 1 == e.mouseWheel && (e.mouseWheel = {
									enable: !0,
									scrollAmount: "auto",
									axis: "y",
									preventDefault: !1,
									deltaFactor: "auto",
									normalizeDelta: !1,
									invert: !1
								}), e.mouseWheel.scrollAmount = e.mouseWheelPixels ? e.mouseWheelPixels : e.mouseWheel.scrollAmount, e.mouseWheel.normalizeDelta = e.advanced.normalizeMouseWheelDelta ? e.advanced.normalizeMouseWheelDelta : e.mouseWheel.normalizeDelta, e.scrollButtons.scrollType = f(e.scrollButtons.scrollType), h(e), t(i).each(function () {
									var i = t(this);
									if (!i.data("mCS")) {
										i.data("mCS", {
											idx: ++r,
											opt: e,
											scrollRatio: {
												y: null,
												x: null
											},
											overflowed: null,
											contentReset: {
												y: null,
												x: null
											},
											bindEvents: !1,
											tweenRunning: !1,
											sequential: {},
											langDir: i.css("direction"),
											cbOffsets: null,
											trigger: null,
											poll: {
												size: {
													o: 0,
													n: 0
												},
												img: {
													o: 0,
													n: 0
												},
												change: {
													o: 0,
													n: 0
												}
											}
										});
										var n = i.data("mCS"),
											o = n.opt,
											s = i.data("mcs-axis"),
											a = i.data("mcs-scrollbar-position"),
											c = i.data("mcs-theme");
										s && (o.axis = s), a && (o.scrollbarPosition = a), c && (o.theme = c, h(o)), m.call(this), n && o.callbacks.onCreate && "function" == typeof o.callbacks.onCreate && o.callbacks.onCreate.call(this), t("#mCSB_" + n.idx + "_container img:not(." + l[2] + ")").addClass(l[2]), u.update.call(null, i)
									}
								})
							},
							update: function (e, i) {
								var n = e || c.call(this);
								return t(n).each(function () {
									var e = t(this);
									if (e.data("mCS")) {
										var n = e.data("mCS"),
											r = n.opt,
											o = t("#mCSB_" + n.idx + "_container"),
											s = t("#mCSB_" + n.idx),
											a = [t("#mCSB_" + n.idx + "_dragger_vertical"), t("#mCSB_" + n.idx + "_dragger_horizontal")];
										if (!o.length) return;
										n.tweenRunning && X(e), i && n && r.callbacks.onBeforeUpdate && "function" == typeof r.callbacks.onBeforeUpdate && r.callbacks.onBeforeUpdate.call(this), e.hasClass(l[3]) && e.removeClass(l[3]), e.hasClass(l[4]) && e.removeClass(l[4]), s.css("max-height", "none"), s.height() !== e.height() && s.css("max-height", e.height()), v.call(this), "y" === r.axis || r.advanced.autoExpandHorizontalScroll || o.css("width", g(o)), n.overflowed = w.call(this), E.call(this), r.autoDraggerLength && y.call(this), x.call(this), C.call(this);
										var u = [Math.abs(o[0].offsetTop), Math.abs(o[0].offsetLeft)];
										"x" !== r.axis && (n.overflowed[0] ? a[0].height() > a[0].parent().height() ? T.call(this) : (V(e, u[0].toString(), {
											dir: "y",
											dur: 0,
											overwrite: "none"
										}), n.contentReset.y = null) : (T.call(this), "y" === r.axis ? S.call(this) : "yx" === r.axis && n.overflowed[1] && V(e, u[1].toString(), {
											dir: "x",
											dur: 0,
											overwrite: "none"
										}))), "y" !== r.axis && (n.overflowed[1] ? a[1].width() > a[1].parent().width() ? T.call(this) : (V(e, u[1].toString(), {
											dir: "x",
											dur: 0,
											overwrite: "none"
										}), n.contentReset.x = null) : (T.call(this), "x" === r.axis ? S.call(this) : "yx" === r.axis && n.overflowed[0] && V(e, u[0].toString(), {
											dir: "y",
											dur: 0,
											overwrite: "none"
										}))), i && n && (2 === i && r.callbacks.onImageLoad && "function" == typeof r.callbacks.onImageLoad ? r.callbacks.onImageLoad.call(this) : 3 === i && r.callbacks.onSelectorChange && "function" == typeof r.callbacks.onSelectorChange ? r.callbacks.onSelectorChange.call(this) : r.callbacks.onUpdate && "function" == typeof r.callbacks.onUpdate && r.callbacks.onUpdate.call(this)), U.call(this)
									}
								})
							},
							scrollTo: function (e, i) {
								if (void 0 !== e && null != e) {
									var n = c.call(this);
									return t(n).each(function () {
										var n = t(this);
										if (n.data("mCS")) {
											var r = n.data("mCS"),
												o = r.opt,
												s = {
													trigger: "external",
													scrollInertia: o.scrollInertia,
													scrollEasing: "mcsEaseInOut",
													moveDragger: !1,
													timeout: 60,
													callbacks: !0,
													onStart: !0,
													onUpdate: !0,
													onComplete: !0
												},
												a = t.extend(!0, {}, s, i),
												l = $.call(this, e),
												u = a.scrollInertia > 0 && a.scrollInertia < 17 ? 17 : a.scrollInertia;
											l[0] = q.call(this, l[0], "y"), l[1] = q.call(this, l[1], "x"), a.moveDragger && (l[0] *= r.scrollRatio.y, l[1] *= r.scrollRatio.x), a.dur = it() ? 0 : u, setTimeout(function () {
												null !== l[0] && void 0 !== l[0] && "x" !== o.axis && r.overflowed[0] && (a.dir = "y", a.overwrite = "all", V(n, l[0].toString(), a)), null !== l[1] && void 0 !== l[1] && "y" !== o.axis && r.overflowed[1] && (a.dir = "x", a.overwrite = "none", V(n, l[1].toString(), a))
											}, a.timeout)
										}
									})
								}
							},
							stop: function () {
								var e = c.call(this);
								return t(e).each(function () {
									var e = t(this);
									e.data("mCS") && X(e)
								})
							},
							disable: function (e) {
								var i = c.call(this);
								return t(i).each(function () {
									var i = t(this);
									if (i.data("mCS")) {
										i.data("mCS");
										U.call(this, "remove"), S.call(this), e && T.call(this), E.call(this, !0), i.addClass(l[3])
									}
								})
							},
							destroy: function () {
								var e = c.call(this);
								return t(e).each(function () {
									var n = t(this);
									if (n.data("mCS")) {
										var r = n.data("mCS"),
											o = r.opt,
											s = t("#mCSB_" + r.idx),
											a = t("#mCSB_" + r.idx + "_container"),
											u = t(".mCSB_" + r.idx + "_scrollbar");
										o.live && d(o.liveSelector || t(e).selector), U.call(this, "remove"), S.call(this), T.call(this), n.removeData("mCS"), Q(this, "mcs"), u.remove(), a.find("img." + l[2]).removeClass(l[2]), s.replaceWith(a.contents()), n.removeClass(i + " _mCS_" + r.idx + " " + l[6] + " " + l[7] + " " + l[5] + " " + l[3]).addClass(l[4])
									}
								})
							}
						},
						c = function () {
							return "object" != typeof t(this) || t(this).length < 1 ? ".mCustomScrollbar" : this
						},
						h = function (e) {
							var i = ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"],
								n = ["rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"],
								r = ["minimal", "minimal-dark"],
								o = ["minimal", "minimal-dark"],
								s = ["minimal", "minimal-dark"];
							e.autoDraggerLength = !(t.inArray(e.theme, i) > -1) && e.autoDraggerLength, e.autoExpandScrollbar = !(t.inArray(e.theme, n) > -1) && e.autoExpandScrollbar, e.scrollButtons.enable = !(t.inArray(e.theme, r) > -1) && e.scrollButtons.enable, e.autoHideScrollbar = t.inArray(e.theme, o) > -1 || e.autoHideScrollbar, e.scrollbarPosition = t.inArray(e.theme, s) > -1 ? "outside" : e.scrollbarPosition
						},
						d = function (t) {
							o[t] && (clearTimeout(o[t]), Q(o, t))
						},
						p = function (t) {
							return "yx" === t || "xy" === t || "auto" === t ? "yx" : "x" === t || "horizontal" === t ? "x" : "y"
						},
						f = function (t) {
							return "stepped" === t || "pixels" === t || "step" === t || "click" === t ? "stepped" : "stepless"
						},
						m = function () {
							var e = t(this),
								n = e.data("mCS"),
								r = n.opt,
								o = r.autoExpandScrollbar ? " " + l[1] + "_expand" : "",
								s = ["<div id='mCSB_" + n.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + n.idx + "_scrollbar mCS-" + r.theme + " mCSB_scrollTools_vertical" + o + "'><div class='" + l[12] + "'><div id='mCSB_" + n.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + n.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + n.idx + "_scrollbar mCS-" + r.theme + " mCSB_scrollTools_horizontal" + o + "'><div class='" + l[12] + "'><div id='mCSB_" + n.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
								a = "yx" === r.axis ? "mCSB_vertical_horizontal" : "x" === r.axis ? "mCSB_horizontal" : "mCSB_vertical",
								u = "yx" === r.axis ? s[0] + s[1] : "x" === r.axis ? s[1] : s[0],
								c = "yx" === r.axis ? "<div id='mCSB_" + n.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : "",
								h = r.autoHideScrollbar ? " " + l[6] : "",
								d = "x" !== r.axis && "rtl" === n.langDir ? " " + l[7] : "";
							r.setWidth && e.css("width", r.setWidth), r.setHeight && e.css("height", r.setHeight), r.setLeft = "y" !== r.axis && "rtl" === n.langDir ? "989999px" : r.setLeft, e.addClass(i + " _mCS_" + n.idx + h + d).wrapInner("<div id='mCSB_" + n.idx + "' class='mCustomScrollBox mCS-" + r.theme + " " + a + "'><div id='mCSB_" + n.idx + "_container' class='mCSB_container' style='position:relative; top:" + r.setTop + "; left:" + r.setLeft + ";' dir='" + n.langDir + "' /></div>");
							var p = t("#mCSB_" + n.idx),
								f = t("#mCSB_" + n.idx + "_container");
							"y" === r.axis || r.advanced.autoExpandHorizontalScroll || f.css("width", g(f)), "outside" === r.scrollbarPosition ? ("static" === e.css("position") && e.css("position", "relative"), e.css("overflow", "visible"), p.addClass("mCSB_outside").after(u)) : (p.addClass("mCSB_inside").append(u), f.wrap(c)), _.call(this);
							var m = [t("#mCSB_" + n.idx + "_dragger_vertical"), t("#mCSB_" + n.idx + "_dragger_horizontal")];
							m[0].css("min-height", m[0].height()), m[1].css("min-width", m[1].width())
						},
						g = function (e) {
							var i = [e[0].scrollWidth, Math.max.apply(Math, e.children().map(function () {
									return t(this).outerWidth(!0)
								}).get())],
								n = e.parent().width();
							return i[0] > n ? i[0] : i[1] > n ? i[1] : "100%"
						},
						v = function () {
							var e = t(this).data("mCS"),
								i = e.opt,
								n = t("#mCSB_" + e.idx + "_container");
							if (i.advanced.autoExpandHorizontalScroll && "y" !== i.axis) {
								n.css({
									width: "auto",
									"min-width": 0,
									"overflow-x": "scroll"
								});
								var r = Math.ceil(n[0].scrollWidth);
								3 === i.advanced.autoExpandHorizontalScroll || 2 !== i.advanced.autoExpandHorizontalScroll && r > n.parent().width() ? n.css({
									width: r,
									"min-width": "100%",
									"overflow-x": "inherit"
								}) : n.css({
									"overflow-x": "inherit",
									position: "absolute"
								}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
									width: Math.ceil(n[0].getBoundingClientRect().right + .4) - Math.floor(n[0].getBoundingClientRect().left),
									"min-width": "100%",
									position: "relative"
								}).unwrap()
							}
						},
						_ = function () {
							var e = t(this).data("mCS"),
								i = e.opt,
								n = t(".mCSB_" + e.idx + "_scrollbar:first"),
								r = tt(i.scrollButtons.tabindex) ? "tabindex='" + i.scrollButtons.tabindex + "'" : "",
								o = ["<a href='#' class='" + l[13] + "' " + r + " />", "<a href='#' class='" + l[14] + "' " + r + " />", "<a href='#' class='" + l[15] + "' " + r + " />", "<a href='#' class='" + l[16] + "' " + r + " />"],
								s = ["x" === i.axis ? o[2] : o[0], "x" === i.axis ? o[3] : o[1], o[2], o[3]];
							i.scrollButtons.enable && n.prepend(s[0]).append(s[1]).next(".mCSB_scrollTools").prepend(s[2]).append(s[3])
						},
						y = function () {
							var e = t(this).data("mCS"),
								i = t("#mCSB_" + e.idx),
								n = t("#mCSB_" + e.idx + "_container"),
								r = [t("#mCSB_" + e.idx + "_dragger_vertical"), t("#mCSB_" + e.idx + "_dragger_horizontal")],
								o = [i.height() / n.outerHeight(!1), i.width() / n.outerWidth(!1)],
								a = [parseInt(r[0].css("min-height")), Math.round(o[0] * r[0].parent().height()), parseInt(r[1].css("min-width")), Math.round(o[1] * r[1].parent().width())],
								l = s && a[1] < a[0] ? a[0] : a[1],
								u = s && a[3] < a[2] ? a[2] : a[3];
							r[0].css({
								height: l,
								"max-height": r[0].parent().height() - 10
							}).find(".mCSB_dragger_bar").css({
								"line-height": a[0] + "px"
							}), r[1].css({
								width: u,
								"max-width": r[1].parent().width() - 10
							})
						},
						x = function () {
							var e = t(this).data("mCS"),
								i = t("#mCSB_" + e.idx),
								n = t("#mCSB_" + e.idx + "_container"),
								r = [t("#mCSB_" + e.idx + "_dragger_vertical"), t("#mCSB_" + e.idx + "_dragger_horizontal")],
								o = [n.outerHeight(!1) - i.height(), n.outerWidth(!1) - i.width()],
								s = [o[0] / (r[0].parent().height() - r[0].height()), o[1] / (r[1].parent().width() - r[1].width())];
							e.scrollRatio = {
								y: s[0],
								x: s[1]
							}
						},
						b = function (t, e, i) {
							var n = i ? l[0] + "_expanded" : "",
								r = t.closest(".mCSB_scrollTools");
							"active" === e ? (t.toggleClass(l[0] + " " + n), r.toggleClass(l[1]), t[0]._draggable = t[0]._draggable ? 0 : 1) : t[0]._draggable || ("hide" === e ? (t.removeClass(l[0]), r.removeClass(l[1])) : (t.addClass(l[0]), r.addClass(l[1])))
						},
						w = function () {
							var e = t(this).data("mCS"),
								i = t("#mCSB_" + e.idx),
								n = t("#mCSB_" + e.idx + "_container"),
								r = null == e.overflowed ? n.height() : n.outerHeight(!1),
								o = null == e.overflowed ? n.width() : n.outerWidth(!1),
								s = n[0].scrollHeight,
								a = n[0].scrollWidth;
							return s > r && (r = s), a > o && (o = a), [r > i.height(), o > i.width()]
						},
						T = function () {
							var e = t(this),
								i = e.data("mCS"),
								n = i.opt,
								r = t("#mCSB_" + i.idx),
								o = t("#mCSB_" + i.idx + "_container"),
								s = [t("#mCSB_" + i.idx + "_dragger_vertical"), t("#mCSB_" + i.idx + "_dragger_horizontal")];
							if (X(e), ("x" !== n.axis && !i.overflowed[0] || "y" === n.axis && i.overflowed[0]) && (s[0].add(o).css("top", 0), V(e, "_resetY")), "y" !== n.axis && !i.overflowed[1] || "x" === n.axis && i.overflowed[1]) {
								var a = dx = 0;
								"rtl" === i.langDir && (a = r.width() - o.outerWidth(!1), dx = Math.abs(a / i.scrollRatio.x)), o.css("left", a), s[1].css("left", dx), V(e, "_resetX")
							}
						},
						C = function () {
							function e() {
								o = setTimeout(function () {
									t.event.special.mousewheel ? (clearTimeout(o), P.call(i[0])) : e()
								}, 100)
							}
							var i = t(this),
								n = i.data("mCS"),
								r = n.opt;
							if (!n.bindEvents) {
								if (O.call(this), r.contentTouchScroll && D.call(this), A.call(this), r.mouseWheel.enable) {
									var o;
									e()
								}
								B.call(this), L.call(this), r.advanced.autoScrollOnFocus && R.call(this), r.scrollButtons.enable && F.call(this), r.keyboard.enable && z.call(this), n.bindEvents = !0
							}
						},
						S = function () {
							var e = t(this),
								i = e.data("mCS"),
								n = i.opt,
								r = "mCS_" + i.idx,
								o = ".mCSB_" + i.idx + "_scrollbar",
								s = t("#mCSB_" + i.idx + ",#mCSB_" + i.idx + "_container,#mCSB_" + i.idx + "_container_wrapper," + o + " ." + l[12] + ",#mCSB_" + i.idx + "_dragger_vertical,#mCSB_" + i.idx + "_dragger_horizontal," + o + ">a"),
								a = t("#mCSB_" + i.idx + "_container");
							n.advanced.releaseDraggableSelectors && s.add(t(n.advanced.releaseDraggableSelectors)), n.advanced.extraDraggableSelectors && s.add(t(n.advanced.extraDraggableSelectors)), i.bindEvents && (t(document).add(t(!I() || top.document)).unbind("." + r), s.each(function () {
								t(this).unbind("." + r)
							}), clearTimeout(e[0]._focusTimeout), Q(e[0], "_focusTimeout"), clearTimeout(i.sequential.step), Q(i.sequential, "step"), clearTimeout(a[0].onCompleteTimeout), Q(a[0], "onCompleteTimeout"), i.bindEvents = !1)
						},
						E = function (e) {
							var i = t(this),
								n = i.data("mCS"),
								r = n.opt,
								o = t("#mCSB_" + n.idx + "_container_wrapper"),
								s = o.length ? o : t("#mCSB_" + n.idx + "_container"),
								a = [t("#mCSB_" + n.idx + "_scrollbar_vertical"), t("#mCSB_" + n.idx + "_scrollbar_horizontal")],
								u = [a[0].find(".mCSB_dragger"), a[1].find(".mCSB_dragger")];
							"x" !== r.axis && (n.overflowed[0] && !e ? (a[0].add(u[0]).add(a[0].children("a")).css("display", "block"), s.removeClass(l[8] + " " + l[10])) : (r.alwaysShowScrollbar ? (2 !== r.alwaysShowScrollbar && u[0].css("display", "none"), s.removeClass(l[10])) : (a[0].css("display", "none"), s.addClass(l[10])), s.addClass(l[8]))), "y" !== r.axis && (n.overflowed[1] && !e ? (a[1].add(u[1]).add(a[1].children("a")).css("display", "block"), s.removeClass(l[9] + " " + l[11])) : (r.alwaysShowScrollbar ? (2 !== r.alwaysShowScrollbar && u[1].css("display", "none"), s.removeClass(l[11])) : (a[1].css("display", "none"), s.addClass(l[11])), s.addClass(l[9]))), n.overflowed[0] || n.overflowed[1] ? i.removeClass(l[5]) : i.addClass(l[5])
						},
						k = function (e) {
							var i = e.type,
								n = e.target.ownerDocument !== document && null !== frameElement ? [t(frameElement).offset().top, t(frameElement).offset().left] : null,
								r = I() && e.target.ownerDocument !== top.document && null !== frameElement ? [t(e.view.frameElement).offset().top, t(e.view.frameElement).offset().left] : [0, 0];
							switch (i) {
								case "pointerdown":
								case "MSPointerDown":
								case "pointermove":
								case "MSPointerMove":
								case "pointerup":
								case "MSPointerUp":
									return n ? [e.originalEvent.pageY - n[0] + r[0], e.originalEvent.pageX - n[1] + r[1], !1] : [e.originalEvent.pageY, e.originalEvent.pageX, !1];
								case "touchstart":
								case "touchmove":
								case "touchend":
									var o = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
										s = e.originalEvent.touches.length || e.originalEvent.changedTouches.length;
									return e.target.ownerDocument !== document ? [o.screenY, o.screenX, s > 1] : [o.pageY, o.pageX, s > 1];
								default:
									return n ? [e.pageY - n[0] + r[0], e.pageX - n[1] + r[1], !1] : [e.pageY, e.pageX, !1]
							}
						},
						O = function () {
							function e(t, e, n, r) {
								if (d[0].idleTimer = u.scrollInertia < 233 ? 250 : 0, i.attr("id") === h[1]) var s = "x",
									a = (i[0].offsetLeft - e + r) * l.scrollRatio.x;
								else var s = "y",
									a = (i[0].offsetTop - t + n) * l.scrollRatio.y;
								V(o, a.toString(), {
									dir: s,
									drag: !0
								})
							}
							var i, n, r, o = t(this),
								l = o.data("mCS"),
								u = l.opt,
								c = "mCS_" + l.idx,
								h = ["mCSB_" + l.idx + "_dragger_vertical", "mCSB_" + l.idx + "_dragger_horizontal"],
								d = t("#mCSB_" + l.idx + "_container"),
								p = t("#" + h[0] + ",#" + h[1]),
								f = u.advanced.releaseDraggableSelectors ? p.add(t(u.advanced.releaseDraggableSelectors)) : p,
								m = u.advanced.extraDraggableSelectors ? t(!I() || top.document).add(t(u.advanced.extraDraggableSelectors)) : t(!I() || top.document);
							p.bind("contextmenu." + c, function (t) {
								t.preventDefault()
							}).bind("mousedown." + c + " touchstart." + c + " pointerdown." + c + " MSPointerDown." + c, function (e) {
								if (e.stopImmediatePropagation(), e.preventDefault(), J(e)) {
									a = !0, s && (document.onselectstart = function () {
										return !1
									}), j.call(d, !1), X(o);
									var l = (i = t(this)).offset(),
										c = k(e)[0] - l.top,
										h = k(e)[1] - l.left,
										p = i.height() + l.top,
										f = i.width() + l.left;
									c < p && c > 0 && h < f && h > 0 && (n = c, r = h), b(i, "active", u.autoExpandScrollbar)
								}
							}).bind("touchmove." + c, function (t) {
								t.stopImmediatePropagation(), t.preventDefault();
								var o = i.offset(),
									s = k(t)[0] - o.top,
									a = k(t)[1] - o.left;
								e(n, r, s, a)
							}), t(document).add(m).bind("mousemove." + c + " pointermove." + c + " MSPointerMove." + c, function (t) {
								if (i) {
									var o = i.offset(),
										s = k(t)[0] - o.top,
										a = k(t)[1] - o.left;
									if (n === s && r === a) return;
									e(n, r, s, a)
								}
							}).add(f).bind("mouseup." + c + " touchend." + c + " pointerup." + c + " MSPointerUp." + c, function (t) {
								i && (b(i, "active", u.autoExpandScrollbar), i = null), a = !1, s && (document.onselectstart = null), j.call(d, !0)
							})
						},
						D = function () {
							function i(t) {
								if (!K(t) || a || k(t)[2]) e = 0;
								else {
									e = 1, b = 0, w = 0, u = 1, T.removeClass("mCS_touch_action");
									var i = D.offset();
									c = k(t)[0] - i.top, h = k(t)[1] - i.left, B = [k(t)[0], k(t)[1]]
								}
							}

							function n(t) {
								if (K(t) && !a && !k(t)[2] && (S.documentTouchScroll || t.preventDefault(), t.stopImmediatePropagation(), (!w || b) && u)) {
									m = G();
									var e = O.offset(),
										i = k(t)[0] - e.top,
										n = k(t)[1] - e.left;
									if (P.push(i), M.push(n), B[2] = Math.abs(k(t)[0] - B[0]), B[3] = Math.abs(k(t)[1] - B[1]), C.overflowed[0]) var r = A[0].parent().height() - A[0].height(),
										o = c - i > 0 && i - c > -r * C.scrollRatio.y && (2 * B[3] < B[2] || "yx" === S.axis);
									if (C.overflowed[1]) var s = A[1].parent().width() - A[1].width(),
										d = h - n > 0 && n - h > -s * C.scrollRatio.x && (2 * B[2] < B[3] || "yx" === S.axis);
									o || d ? (F || t.preventDefault(), b = 1) : (w = 1, T.addClass("mCS_touch_action")), F && t.preventDefault(), y = "yx" === S.axis ? [c - i, h - n] : "x" === S.axis ? [null, h - n] : [c - i, null], D[0].idleTimer = 250, C.overflowed[0] && l(y[0], j, "mcsLinearOut", "y", "all", !0), C.overflowed[1] && l(y[1], j, "mcsLinearOut", "x", N, !0)
								}
							}

							function r(t) {
								if (!K(t) || a || k(t)[2]) e = 0;
								else {
									e = 1, t.stopImmediatePropagation(), X(T), f = G();
									var i = O.offset();
									d = k(t)[0] - i.top, p = k(t)[1] - i.left, P = [], M = []
								}
							}

							function o(t) {
								if (K(t) && !a && !k(t)[2]) {
									u = 0, t.stopImmediatePropagation(), b = 0, w = 0, g = G();
									var e = O.offset(),
										i = k(t)[0] - e.top,
										n = k(t)[1] - e.left;
									if (!(g - m > 30)) {
										var r = (_ = 1e3 / (g - f)) < 2.5,
											o = r ? [P[P.length - 2], M[M.length - 2]] : [0, 0];
										v = r ? [i - o[0], n - o[1]] : [i - d, n - p];
										var c = [Math.abs(v[0]), Math.abs(v[1])];
										_ = r ? [Math.abs(v[0] / 4), Math.abs(v[1] / 4)] : [_, _];
										var h = [Math.abs(D[0].offsetTop) - v[0] * s(c[0] / _[0], _[0]), Math.abs(D[0].offsetLeft) - v[1] * s(c[1] / _[1], _[1])];
										y = "yx" === S.axis ? [h[0], h[1]] : "x" === S.axis ? [null, h[1]] : [h[0], null], x = [4 * c[0] + S.scrollInertia, 4 * c[1] + S.scrollInertia];
										var T = parseInt(S.contentTouchScroll) || 0;
										y[0] = c[0] > T ? y[0] : 0, y[1] = c[1] > T ? y[1] : 0, C.overflowed[0] && l(y[0], x[0], "mcsEaseOut", "y", N, !1), C.overflowed[1] && l(y[1], x[1], "mcsEaseOut", "x", N, !1)
									}
								}
							}

							function s(t, e) {
								var i = [1.5 * e, 2 * e, e / 1.5, e / 2];
								return t > 90 ? e > 4 ? i[0] : i[3] : t > 60 ? e > 3 ? i[3] : i[2] : t > 30 ? e > 8 ? i[1] : e > 6 ? i[0] : e > 4 ? e : i[2] : e > 8 ? e : i[3]
							}

							function l(t, e, i, n, r, o) {
								t && V(T, t.toString(), {
									dur: e,
									scrollEasing: i,
									dir: n,
									overwrite: r,
									drag: o
								})
							}
							var u, c, h, d, p, f, m, g, v, _, y, x, b, w, T = t(this),
								C = T.data("mCS"),
								S = C.opt,
								E = "mCS_" + C.idx,
								O = t("#mCSB_" + C.idx),
								D = t("#mCSB_" + C.idx + "_container"),
								A = [t("#mCSB_" + C.idx + "_dragger_vertical"), t("#mCSB_" + C.idx + "_dragger_horizontal")],
								P = [],
								M = [],
								j = 0,
								N = "yx" === S.axis ? "none" : "all",
								B = [],
								R = D.find("iframe"),
								L = ["touchstart." + E + " pointerdown." + E + " MSPointerDown." + E, "touchmove." + E + " pointermove." + E + " MSPointerMove." + E, "touchend." + E + " pointerup." + E + " MSPointerUp." + E],
								F = void 0 !== document.body.style.touchAction && "" !== document.body.style.touchAction;
							D.bind(L[0], function (t) {
								i(t)
							}).bind(L[1], function (t) {
								n(t)
							}), O.bind(L[0], function (t) {
								r(t)
							}).bind(L[2], function (t) {
								o(t)
							}), R.length && R.each(function () {
								t(this).bind("load", function () {
									I(this) && t(this.contentDocument || this.contentWindow.document).bind(L[0], function (t) {
										i(t), r(t)
									}).bind(L[1], function (t) {
										n(t)
									}).bind(L[2], function (t) {
										o(t)
									})
								})
							})
						},
						A = function () {
							function i() {
								return window.getSelection ? window.getSelection().toString() : document.selection && "Control" != document.selection.type ? document.selection.createRange().text : 0
							}

							function n(t, e, i) {
								u.type = i && r ? "stepped" : "stepless", u.scrollAmount = 10, H(o, t, e, "mcsLinearOut", i ? 60 : null)
							}
							var r, o = t(this),
								s = o.data("mCS"),
								l = s.opt,
								u = s.sequential,
								c = "mCS_" + s.idx,
								h = t("#mCSB_" + s.idx + "_container"),
								d = h.parent();
							h.bind("mousedown." + c, function (t) {
								e || r || (r = 1, a = !0)
							}).add(document).bind("mousemove." + c, function (t) {
								if (!e && r && i()) {
									var o = h.offset(),
										a = k(t)[0] - o.top + h[0].offsetTop,
										c = k(t)[1] - o.left + h[0].offsetLeft;
									a > 0 && a < d.height() && c > 0 && c < d.width() ? u.step && n("off", null, "stepped") : ("x" !== l.axis && s.overflowed[0] && (a < 0 ? n("on", 38) : a > d.height() && n("on", 40)), "y" !== l.axis && s.overflowed[1] && (c < 0 ? n("on", 37) : c > d.width() && n("on", 39)))
								}
							}).bind("mouseup." + c + " dragend." + c, function (t) {
								e || (r && (r = 0, n("off", null)), a = !1)
							})
						},
						P = function () {
							function e(e, o) {
								if (X(i), !N(i, e.target)) {
									var u = "auto" !== r.mouseWheel.deltaFactor ? parseInt(r.mouseWheel.deltaFactor) : s && e.deltaFactor < 100 ? 100 : e.deltaFactor || 100,
										c = r.scrollInertia;
									if ("x" === r.axis || "x" === r.mouseWheel.axis) var h = "x",
										d = [Math.round(u * n.scrollRatio.x), parseInt(r.mouseWheel.scrollAmount)],
										p = "auto" !== r.mouseWheel.scrollAmount ? d[1] : d[0] >= a.width() ? .9 * a.width() : d[0],
										f = Math.abs(t("#mCSB_" + n.idx + "_container")[0].offsetLeft),
										m = l[1][0].offsetLeft,
										g = l[1].parent().width() - l[1].width(),
										v = "y" === r.mouseWheel.axis ? e.deltaY || o : e.deltaX;
									else var h = "y",
										d = [Math.round(u * n.scrollRatio.y), parseInt(r.mouseWheel.scrollAmount)],
										p = "auto" !== r.mouseWheel.scrollAmount ? d[1] : d[0] >= a.height() ? .9 * a.height() : d[0],
										f = Math.abs(t("#mCSB_" + n.idx + "_container")[0].offsetTop),
										m = l[0][0].offsetTop,
										g = l[0].parent().height() - l[0].height(),
										v = e.deltaY || o;
									"y" === h && !n.overflowed[0] || "x" === h && !n.overflowed[1] || ((r.mouseWheel.invert || e.webkitDirectionInvertedFromDevice) && (v = -v), r.mouseWheel.normalizeDelta && (v = v < 0 ? -1 : 1), (v > 0 && 0 !== m || v < 0 && m !== g || r.mouseWheel.preventDefault) && (e.stopImmediatePropagation(), e.preventDefault()), e.deltaFactor < 5 && !r.mouseWheel.normalizeDelta && (p = e.deltaFactor, c = 17), V(i, (f - v * p).toString(), {
										dir: h,
										dur: c
									}))
								}
							}
							if (t(this).data("mCS")) {
								var i = t(this),
									n = i.data("mCS"),
									r = n.opt,
									o = "mCS_" + n.idx,
									a = t("#mCSB_" + n.idx),
									l = [t("#mCSB_" + n.idx + "_dragger_vertical"), t("#mCSB_" + n.idx + "_dragger_horizontal")],
									u = t("#mCSB_" + n.idx + "_container").find("iframe");
								u.length && u.each(function () {
									t(this).bind("load", function () {
										I(this) && t(this.contentDocument || this.contentWindow.document).bind("mousewheel." + o, function (t, i) {
											e(t, i)
										})
									})
								}), a.bind("mousewheel." + o, function (t, i) {
									e(t, i)
								})
							}
						},
						M = new Object,
						I = function (e) {
							var i = !1,
								n = !1,
								r = null;
							if (void 0 === e ? n = "#empty" : void 0 !== t(e).attr("id") && (n = t(e).attr("id")), !1 !== n && void 0 !== M[n]) return M[n];
							if (e) {
								try {
									var o = e.contentDocument || e.contentWindow.document;
									r = o.body.innerHTML
								} catch (t) {}
								i = null !== r
							} else {
								try {
									r = (o = top.document).body.innerHTML
								} catch (t) {}
								i = null !== r
							}
							return !1 !== n && (M[n] = i), i
						},
						j = function (t) {
							var e = this.find("iframe");
							if (e.length) {
								var i = t ? "auto" : "none";
								e.css("pointer-events", i)
							}
						},
						N = function (e, i) {
							var n = i.nodeName.toLowerCase(),
								r = e.data("mCS").opt.mouseWheel.disableOver,
								o = ["select", "textarea"];
							return t.inArray(n, r) > -1 && !(t.inArray(n, o) > -1 && !t(i).is(":focus"))
						},
						B = function () {
							var e, i = t(this),
								n = i.data("mCS"),
								r = "mCS_" + n.idx,
								o = t("#mCSB_" + n.idx + "_container"),
								s = o.parent();
							t(".mCSB_" + n.idx + "_scrollbar ." + l[12]).bind("mousedown." + r + " touchstart." + r + " pointerdown." + r + " MSPointerDown." + r, function (i) {
								a = !0, t(i.target).hasClass("mCSB_dragger") || (e = 1)
							}).bind("touchend." + r + " pointerup." + r + " MSPointerUp." + r, function (t) {
								a = !1
							}).bind("click." + r, function (r) {
								if (e && (e = 0, t(r.target).hasClass(l[12]) || t(r.target).hasClass("mCSB_draggerRail"))) {
									X(i);
									var a = t(this),
										u = a.find(".mCSB_dragger");
									if (a.parent(".mCSB_scrollTools_horizontal").length > 0) {
										if (!n.overflowed[1]) return;
										var c = "x",
											h = r.pageX > u.offset().left ? -1 : 1,
											d = Math.abs(o[0].offsetLeft) - h * (.9 * s.width())
									} else {
										if (!n.overflowed[0]) return;
										var c = "y",
											h = r.pageY > u.offset().top ? -1 : 1,
											d = Math.abs(o[0].offsetTop) - h * (.9 * s.height())
									}
									V(i, d.toString(), {
										dir: c,
										scrollEasing: "mcsEaseInOut"
									})
								}
							})
						},
						R = function () {
							var e = t(this),
								i = e.data("mCS"),
								n = i.opt,
								r = "mCS_" + i.idx,
								o = t("#mCSB_" + i.idx + "_container"),
								s = o.parent();
							o.bind("focusin." + r, function (i) {
								var r = t(document.activeElement),
									a = o.find(".mCustomScrollBox").length;
								r.is(n.advanced.autoScrollOnFocus) && (X(e), clearTimeout(e[0]._focusTimeout), e[0]._focusTimer = a ? 17 * a : 0, e[0]._focusTimeout = setTimeout(function () {
									var t = [et(r)[0], et(r)[1]],
										i = [o[0].offsetTop, o[0].offsetLeft],
										a = [i[0] + t[0] >= 0 && i[0] + t[0] < s.height() - r.outerHeight(!1), i[1] + t[1] >= 0 && i[0] + t[1] < s.width() - r.outerWidth(!1)],
										l = "yx" !== n.axis || a[0] || a[1] ? "all" : "none";
									"x" === n.axis || a[0] || V(e, t[0].toString(), {
										dir: "y",
										scrollEasing: "mcsEaseInOut",
										overwrite: l,
										dur: 0
									}), "y" === n.axis || a[1] || V(e, t[1].toString(), {
										dir: "x",
										scrollEasing: "mcsEaseInOut",
										overwrite: l,
										dur: 0
									})
								}, e[0]._focusTimer))
							})
						},
						L = function () {
							var e = t(this).data("mCS"),
								i = "mCS_" + e.idx,
								n = t("#mCSB_" + e.idx + "_container").parent();
							n.bind("scroll." + i, function (i) {
								0 === n.scrollTop() && 0 === n.scrollLeft() || t(".mCSB_" + e.idx + "_scrollbar").css("visibility", "hidden")
							})
						},
						F = function () {
							var e = t(this),
								i = e.data("mCS"),
								n = i.opt,
								r = i.sequential,
								o = "mCS_" + i.idx,
								s = ".mCSB_" + i.idx + "_scrollbar";
							t(s + ">a").bind("contextmenu." + o, function (t) {
								t.preventDefault()
							}).bind("mousedown." + o + " touchstart." + o + " pointerdown." + o + " MSPointerDown." + o + " mouseup." + o + " touchend." + o + " pointerup." + o + " MSPointerUp." + o + " mouseout." + o + " pointerout." + o + " MSPointerOut." + o + " click." + o, function (o) {
								function s(t, i) {
									r.scrollAmount = n.scrollButtons.scrollAmount, H(e, t, i)
								}
								if (o.preventDefault(), J(o)) {
									var l = t(this).attr("class");
									switch (r.type = n.scrollButtons.scrollType, o.type) {
										case "mousedown":
										case "touchstart":
										case "pointerdown":
										case "MSPointerDown":
											if ("stepped" === r.type) return;
											a = !0, i.tweenRunning = !1, s("on", l);
											break;
										case "mouseup":
										case "touchend":
										case "pointerup":
										case "MSPointerUp":
										case "mouseout":
										case "pointerout":
										case "MSPointerOut":
											if ("stepped" === r.type) return;
											a = !1, r.dir && s("off", l);
											break;
										case "click":
											if ("stepped" !== r.type || i.tweenRunning) return;
											s("on", l)
									}
								}
							})
						},
						z = function () {
							function e(e) {
								function s(t, e) {
									o.type = r.keyboard.scrollType, o.scrollAmount = r.keyboard.scrollAmount, "stepped" === o.type && n.tweenRunning || H(i, t, e)
								}
								switch (e.type) {
									case "blur":
										n.tweenRunning && o.dir && s("off", null);
										break;
									case "keydown":
									case "keyup":
										var a = e.keyCode ? e.keyCode : e.which,
											h = "on";
										if ("x" !== r.axis && (38 === a || 40 === a) || "y" !== r.axis && (37 === a || 39 === a)) {
											if ((38 === a || 40 === a) && !n.overflowed[0] || (37 === a || 39 === a) && !n.overflowed[1]) return;
											"keyup" === e.type && (h = "off"), t(document.activeElement).is(c) || (e.preventDefault(), e.stopImmediatePropagation(), s(h, a))
										} else if (33 === a || 34 === a) {
											if ((n.overflowed[0] || n.overflowed[1]) && (e.preventDefault(), e.stopImmediatePropagation()), "keyup" === e.type) {
												X(i);
												var d = 34 === a ? -1 : 1;
												if ("x" === r.axis || "yx" === r.axis && n.overflowed[1] && !n.overflowed[0]) var p = "x",
													f = Math.abs(l[0].offsetLeft) - d * (.9 * u.width());
												else var p = "y",
													f = Math.abs(l[0].offsetTop) - d * (.9 * u.height());
												V(i, f.toString(), {
													dir: p,
													scrollEasing: "mcsEaseInOut"
												})
											}
										} else if ((35 === a || 36 === a) && !t(document.activeElement).is(c) && ((n.overflowed[0] || n.overflowed[1]) && (e.preventDefault(), e.stopImmediatePropagation()), "keyup" === e.type)) {
											if ("x" === r.axis || "yx" === r.axis && n.overflowed[1] && !n.overflowed[0]) var p = "x",
												f = 35 === a ? Math.abs(u.width() - l.outerWidth(!1)) : 0;
											else var p = "y",
												f = 35 === a ? Math.abs(u.height() - l.outerHeight(!1)) : 0;
											V(i, f.toString(), {
												dir: p,
												scrollEasing: "mcsEaseInOut"
											})
										}
								}
							}
							var i = t(this),
								n = i.data("mCS"),
								r = n.opt,
								o = n.sequential,
								s = "mCS_" + n.idx,
								a = t("#mCSB_" + n.idx),
								l = t("#mCSB_" + n.idx + "_container"),
								u = l.parent(),
								c = "input,textarea,select,datalist,keygen,[contenteditable='true']",
								h = l.find("iframe"),
								d = ["blur." + s + " keydown." + s + " keyup." + s];
							h.length && h.each(function () {
								t(this).bind("load", function () {
									I(this) && t(this.contentDocument || this.contentWindow.document).bind(d[0], function (t) {
										e(t)
									})
								})
							}), a.attr("tabindex", "0").bind(d[0], function (t) {
								e(t)
							})
						},
						H = function (e, i, n, r, o) {
							function s(t) {
								u.snapAmount && (c.scrollAmount = u.snapAmount instanceof Array ? "x" === c.dir[0] ? u.snapAmount[1] : u.snapAmount[0] : u.snapAmount);
								var i = "stepped" !== c.type,
									n = o || (t ? i ? p / 1.5 : f : 1e3 / 60),
									l = t ? i ? 7.5 : 40 : 2.5,
									d = [Math.abs(h[0].offsetTop), Math.abs(h[0].offsetLeft)],
									m = [a.scrollRatio.y > 10 ? 10 : a.scrollRatio.y, a.scrollRatio.x > 10 ? 10 : a.scrollRatio.x],
									g = "x" === c.dir[0] ? d[1] + c.dir[1] * (m[1] * l) : d[0] + c.dir[1] * (m[0] * l),
									v = "x" === c.dir[0] ? d[1] + c.dir[1] * parseInt(c.scrollAmount) : d[0] + c.dir[1] * parseInt(c.scrollAmount),
									_ = "auto" !== c.scrollAmount ? v : g,
									y = r || (t ? i ? "mcsLinearOut" : "mcsEaseInOut" : "mcsLinear"),
									x = !!t;
								t && n < 17 && (_ = "x" === c.dir[0] ? d[1] : d[0]), V(e, _.toString(), {
									dir: c.dir[0],
									scrollEasing: y,
									dur: n,
									onComplete: x
								}), t ? c.dir = !1 : (clearTimeout(c.step), c.step = setTimeout(function () {
									s()
								}, n))
							}
							var a = e.data("mCS"),
								u = a.opt,
								c = a.sequential,
								h = t("#mCSB_" + a.idx + "_container"),
								d = "stepped" === c.type,
								p = u.scrollInertia < 26 ? 26 : u.scrollInertia,
								f = u.scrollInertia < 1 ? 17 : u.scrollInertia;
							switch (i) {
								case "on":
									if (c.dir = [n === l[16] || n === l[15] || 39 === n || 37 === n ? "x" : "y", n === l[13] || n === l[15] || 38 === n || 37 === n ? -1 : 1], X(e), tt(n) && "stepped" === c.type) return;
									s(d);
									break;
								case "off":
									! function () {
										clearTimeout(c.step), Q(c, "step"), X(e)
									}(), (d || a.tweenRunning && c.dir) && s(!0)
							}
						},
						$ = function (e) {
							var i = t(this).data("mCS").opt,
								n = [];
							return "function" == typeof e && (e = e()), e instanceof Array ? n = e.length > 1 ? [e[0], e[1]] : "x" === i.axis ? [null, e[0]] : [e[0], null] : (n[0] = e.y ? e.y : e.x || "x" === i.axis ? null : e, n[1] = e.x ? e.x : e.y || "y" === i.axis ? null : e), "function" == typeof n[0] && (n[0] = n[0]()), "function" == typeof n[1] && (n[1] = n[1]()), n
						},
						q = function (e, i) {
							if (null != e && void 0 !== e) {
								var n = t(this),
									r = n.data("mCS"),
									o = r.opt,
									s = t("#mCSB_" + r.idx + "_container"),
									a = s.parent(),
									l = typeof e;
								i || (i = "x" === o.axis ? "x" : "y");
								var c = "x" === i ? s.outerWidth(!1) - a.width() : s.outerHeight(!1) - a.height(),
									h = "x" === i ? s[0].offsetLeft : s[0].offsetTop,
									d = "x" === i ? "left" : "top";
								switch (l) {
									case "function":
										return e();
									case "object":
										if (!(f = e.jquery ? e : t(e)).length) return;
										return "x" === i ? et(f)[1] : et(f)[0];
									case "string":
									case "number":
										if (tt(e)) return Math.abs(e);
										if (-1 !== e.indexOf("%")) return Math.abs(c * parseInt(e) / 100);
										if (-1 !== e.indexOf("-=")) return Math.abs(h - parseInt(e.split("-=")[1]));
										if (-1 !== e.indexOf("+=")) {
											var p = h + parseInt(e.split("+=")[1]);
											return p >= 0 ? 0 : Math.abs(p)
										}
										if (-1 !== e.indexOf("px") && tt(e.split("px")[0])) return Math.abs(e.split("px")[0]);
										if ("top" === e || "left" === e) return 0;
										if ("bottom" === e) return Math.abs(a.height() - s.outerHeight(!1));
										if ("right" === e) return Math.abs(a.width() - s.outerWidth(!1));
										if ("first" === e || "last" === e) {
											var f = s.find(":" + e);
											return "x" === i ? et(f)[1] : et(f)[0]
										}
										return t(e).length ? "x" === i ? et(t(e))[1] : et(t(e))[0] : (s.css(d, e), void u.update.call(null, n[0]))
								}
							}
						},
						U = function (e) {
							function i() {
								clearTimeout(h[0].autoUpdate), 0 !== s.parents("html").length ? h[0].autoUpdate = setTimeout(function () {
									return c.advanced.updateOnSelectorChange && (a.poll.change.n = r(), a.poll.change.n !== a.poll.change.o) ? (a.poll.change.o = a.poll.change.n, void o(3)) : c.advanced.updateOnContentResize && (a.poll.size.n = s[0].scrollHeight + s[0].scrollWidth + h[0].offsetHeight + s[0].offsetHeight + s[0].offsetWidth, a.poll.size.n !== a.poll.size.o) ? (a.poll.size.o = a.poll.size.n, void o(1)) : !c.advanced.updateOnImageLoad || "auto" === c.advanced.updateOnImageLoad && "y" === c.axis || (a.poll.img.n = h.find("img").length, a.poll.img.n === a.poll.img.o) ? void((c.advanced.updateOnSelectorChange || c.advanced.updateOnContentResize || c.advanced.updateOnImageLoad) && i()) : (a.poll.img.o = a.poll.img.n, void h.find("img").each(function () {
										n(this)
									}))
								}, c.advanced.autoUpdateTimeout) : s = null
							}

							function n(e) {
								function i() {
									this.onload = null, t(e).addClass(l[2]), o(2)
								}
								if (t(e).hasClass(l[2])) o();
								else {
									var n = new Image;
									n.onload = function (t, e) {
										return function () {
											return e.apply(t, arguments)
										}
									}(n, i), n.src = e.src
								}
							}

							function r() {
								!0 === c.advanced.updateOnSelectorChange && (c.advanced.updateOnSelectorChange = "*");
								var t = 0,
									e = h.find(c.advanced.updateOnSelectorChange);
								return c.advanced.updateOnSelectorChange && e.length > 0 && e.each(function () {
									t += this.offsetHeight + this.offsetWidth
								}), t
							}

							function o(t) {
								clearTimeout(h[0].autoUpdate), u.update.call(null, s[0], t)
							}
							var s = t(this),
								a = s.data("mCS"),
								c = a.opt,
								h = t("#mCSB_" + a.idx + "_container");
							if (e) return clearTimeout(h[0].autoUpdate), void Q(h[0], "autoUpdate");
							i()
						},
						W = function (t, e, i) {
							return Math.round(t / e) * e - i
						},
						X = function (e) {
							var i = e.data("mCS");
							t("#mCSB_" + i.idx + "_container,#mCSB_" + i.idx + "_container_wrapper,#mCSB_" + i.idx + "_dragger_vertical,#mCSB_" + i.idx + "_dragger_horizontal").each(function () {
								Z.call(this)
							})
						},
						V = function (e, i, n) {
							function r(t) {
								return a && l.callbacks[t] && "function" == typeof l.callbacks[t]
							}

							function o() {
								return [l.callbacks.alwaysTriggerOffsets || y >= x[0] + T, l.callbacks.alwaysTriggerOffsets || y <= -C]
							}

							function s() {
								var t = [d[0].offsetTop, d[0].offsetLeft],
									i = [v[0].offsetTop, v[0].offsetLeft],
									r = [d.outerHeight(!1), d.outerWidth(!1)],
									o = [h.height(), h.width()];
								e[0].mcs = {
									content: d,
									top: t[0],
									left: t[1],
									draggerTop: i[0],
									draggerLeft: i[1],
									topPct: Math.round(100 * Math.abs(t[0]) / (Math.abs(r[0]) - o[0])),
									leftPct: Math.round(100 * Math.abs(t[1]) / (Math.abs(r[1]) - o[1])),
									direction: n.dir
								}
							}
							var a = e.data("mCS"),
								l = a.opt,
								u = {
									trigger: "internal",
									dir: "y",
									scrollEasing: "mcsEaseOut",
									drag: !1,
									dur: l.scrollInertia,
									overwrite: "all",
									callbacks: !0,
									onStart: !0,
									onUpdate: !0,
									onComplete: !0
								},
								c = [(n = t.extend(u, n)).dur, n.drag ? 0 : n.dur],
								h = t("#mCSB_" + a.idx),
								d = t("#mCSB_" + a.idx + "_container"),
								p = d.parent(),
								f = l.callbacks.onTotalScrollOffset ? $.call(e, l.callbacks.onTotalScrollOffset) : [0, 0],
								m = l.callbacks.onTotalScrollBackOffset ? $.call(e, l.callbacks.onTotalScrollBackOffset) : [0, 0];
							if (a.trigger = n.trigger, 0 === p.scrollTop() && 0 === p.scrollLeft() || (t(".mCSB_" + a.idx + "_scrollbar").css("visibility", "visible"), p.scrollTop(0).scrollLeft(0)), "_resetY" !== i || a.contentReset.y || (r("onOverflowYNone") && l.callbacks.onOverflowYNone.call(e[0]), a.contentReset.y = 1), "_resetX" !== i || a.contentReset.x || (r("onOverflowXNone") && l.callbacks.onOverflowXNone.call(e[0]), a.contentReset.x = 1), "_resetY" !== i && "_resetX" !== i) {
								if (!a.contentReset.y && e[0].mcs || !a.overflowed[0] || (r("onOverflowY") && l.callbacks.onOverflowY.call(e[0]), a.contentReset.x = null), !a.contentReset.x && e[0].mcs || !a.overflowed[1] || (r("onOverflowX") && l.callbacks.onOverflowX.call(e[0]), a.contentReset.x = null), l.snapAmount) {
									var g = l.snapAmount instanceof Array ? "x" === n.dir ? l.snapAmount[1] : l.snapAmount[0] : l.snapAmount;
									i = W(i, g, l.snapOffset)
								}
								switch (n.dir) {
									case "x":
										var v = t("#mCSB_" + a.idx + "_dragger_horizontal"),
											_ = "left",
											y = d[0].offsetLeft,
											x = [h.width() - d.outerWidth(!1), v.parent().width() - v.width()],
											w = [i, 0 === i ? 0 : i / a.scrollRatio.x],
											T = f[1],
											C = m[1],
											S = T > 0 ? T / a.scrollRatio.x : 0,
											E = C > 0 ? C / a.scrollRatio.x : 0;
										break;
									case "y":
										var v = t("#mCSB_" + a.idx + "_dragger_vertical"),
											_ = "top",
											y = d[0].offsetTop,
											x = [h.height() - d.outerHeight(!1), v.parent().height() - v.height()],
											w = [i, 0 === i ? 0 : i / a.scrollRatio.y],
											T = f[0],
											C = m[0],
											S = T > 0 ? T / a.scrollRatio.y : 0,
											E = C > 0 ? C / a.scrollRatio.y : 0
								}
								w[1] < 0 || 0 === w[0] && 0 === w[1] ? w = [0, 0] : w[1] >= x[1] ? w = [x[0], x[1]] : w[0] = -w[0], e[0].mcs || (s(), r("onInit") && l.callbacks.onInit.call(e[0])), clearTimeout(d[0].onCompleteTimeout), Y(v[0], _, Math.round(w[1]), c[1], n.scrollEasing), !a.tweenRunning && (0 === y && w[0] >= 0 || y === x[0] && w[0] <= x[0]) || Y(d[0], _, Math.round(w[0]), c[0], n.scrollEasing, n.overwrite, {
									onStart: function () {
										n.callbacks && n.onStart && !a.tweenRunning && (r("onScrollStart") && (s(), l.callbacks.onScrollStart.call(e[0])), a.tweenRunning = !0, b(v), a.cbOffsets = o())
									},
									onUpdate: function () {
										n.callbacks && n.onUpdate && r("whileScrolling") && (s(), l.callbacks.whileScrolling.call(e[0]))
									},
									onComplete: function () {
										if (n.callbacks && n.onComplete) {
											"yx" === l.axis && clearTimeout(d[0].onCompleteTimeout);
											var t = d[0].idleTimer || 0;
											d[0].onCompleteTimeout = setTimeout(function () {
												r("onScroll") && (s(), l.callbacks.onScroll.call(e[0])), r("onTotalScroll") && w[1] >= x[1] - S && a.cbOffsets[0] && (s(), l.callbacks.onTotalScroll.call(e[0])), r("onTotalScrollBack") && w[1] <= E && a.cbOffsets[1] && (s(), l.callbacks.onTotalScrollBack.call(e[0])), a.tweenRunning = !1, d[0].idleTimer = 0, b(v, "hide")
											}, t)
										}
									}
								})
							}
						},
						Y = function (t, e, i, n, r, o, s) {
							function a() {
								y.stop || (g || d.call(), g = G() - m, l(), g >= y.time && (y.time = g > y.time ? g + c - (g - y.time) : g + c - 1, y.time < g + 1 && (y.time = g + 1)), y.time < n ? y.id = h(a) : f.call())
							}

							function l() {
								n > 0 ? (y.currVal = u(y.time, v, x, n, r), _[e] = Math.round(y.currVal) + "px") : _[e] = i + "px", p.call()
							}

							function u(t, e, i, n, r) {
								switch (r) {
									case "linear":
									case "mcsLinear":
										return i * t / n + e;
									case "mcsLinearOut":
										return t /= n, t--, i * Math.sqrt(1 - t * t) + e;
									case "easeInOutSmooth":
										return (t /= n / 2) < 1 ? i / 2 * t * t + e : (t--, -i / 2 * (t * (t - 2) - 1) + e);
									case "easeInOutStrong":
										return (t /= n / 2) < 1 ? i / 2 * Math.pow(2, 10 * (t - 1)) + e : (t--, i / 2 * (2 - Math.pow(2, -10 * t)) + e);
									case "easeInOut":
									case "mcsEaseInOut":
										return (t /= n / 2) < 1 ? i / 2 * t * t * t + e : (t -= 2, i / 2 * (t * t * t + 2) + e);
									case "easeOutSmooth":
										return t /= n, t--, -i * (t * t * t * t - 1) + e;
									case "easeOutStrong":
										return i * (1 - Math.pow(2, -10 * t / n)) + e;
									case "easeOut":
									case "mcsEaseOut":
									default:
										var o = (t /= n) * t,
											s = o * t;
										return e + i * (.499999999999997 * s * o + -2.5 * o * o + 5.5 * s + -6.5 * o + 4 * t)
								}
							}
							t._mTween || (t._mTween = {
								top: {},
								left: {}
							});
							var c, h, d = (s = s || {}).onStart || function () {},
								p = s.onUpdate || function () {},
								f = s.onComplete || function () {},
								m = G(),
								g = 0,
								v = t.offsetTop,
								_ = t.style,
								y = t._mTween[e];
							"left" === e && (v = t.offsetLeft);
							var x = i - v;
							y.stop = 0, "none" !== o && function () {
									null != y.id && (window.requestAnimationFrame ? window.cancelAnimationFrame(y.id) : clearTimeout(y.id), y.id = null)
								}(),
								function () {
									c = 1e3 / 60, y.time = g + c, h = window.requestAnimationFrame ? window.requestAnimationFrame : function (t) {
										return l(), setTimeout(t, .01)
									}, y.id = h(a)
								}()
						},
						G = function () {
							return window.performance && window.performance.now ? window.performance.now() : window.performance && window.performance.webkitNow ? window.performance.webkitNow() : Date.now ? Date.now() : (new Date).getTime()
						},
						Z = function () {
							var t = this;
							t._mTween || (t._mTween = {
								top: {},
								left: {}
							});
							for (var e = ["top", "left"], i = 0; i < e.length; i++) {
								var n = e[i];
								t._mTween[n].id && (window.requestAnimationFrame ? window.cancelAnimationFrame(t._mTween[n].id) : clearTimeout(t._mTween[n].id), t._mTween[n].id = null, t._mTween[n].stop = 1)
							}
						},
						Q = function (t, e) {
							try {
								delete t[e]
							} catch (i) {
								t[e] = null
							}
						},
						J = function (t) {
							return !(t.which && 1 !== t.which)
						},
						K = function (t) {
							var e = t.originalEvent.pointerType;
							return !(e && "touch" !== e && 2 !== e)
						},
						tt = function (t) {
							return !isNaN(parseFloat(t)) && isFinite(t)
						},
						et = function (t) {
							var e = t.parents(".mCSB_container");
							return [t.offset().top - e.offset().top, t.offset().left - e.offset().left]
						},
						it = function () {
							var t = function () {
								var t = ["webkit", "moz", "ms", "o"];
								if ("hidden" in document) return "hidden";
								for (var e = 0; e < t.length; e++)
									if (t[e] + "Hidden" in document) return t[e] + "Hidden";
								return null
							}();
							return !!t && document[t]
						};
					t.fn[i] = function (e) {
						return u[e] ? u[e].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof e && e ? void t.error("Method " + e + " does not exist") : u.init.apply(this, arguments)
					}, t[i] = function (e) {
						return u[e] ? u[e].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof e && e ? void t.error("Method " + e + " does not exist") : u.init.apply(this, arguments)
					}, t[i].defaults = n, window[i] = !0, t(window).bind("load", function () {
						t(".mCustomScrollbar")[i](), t.extend(t.expr[":"], {
							mcsInView: t.expr[":"].mcsInView || function (e) {
								var i, n, r = t(e),
									o = r.parents(".mCSB_container");
								if (o.length) return i = o.parent(), (n = [o[0].offsetTop, o[0].offsetLeft])[0] + et(r)[0] >= 0 && n[0] + et(r)[0] < i.height() - r.outerHeight(!1) && n[1] + et(r)[1] >= 0 && n[1] + et(r)[1] < i.width() - r.outerWidth(!1)
							},
							mcsInSight: t.expr[":"].mcsInSight || function (e, i, n) {
								var r, o, s, a, l = t(e),
									u = l.parents(".mCSB_container"),
									c = "exact" === n[3] ? [
										[1, 0],
										[1, 0]
									] : [
										[.9, .1],
										[.6, .4]
									];
								if (u.length) return r = [l.outerHeight(!1), l.outerWidth(!1)], s = [u[0].offsetTop + et(l)[0], u[0].offsetLeft + et(l)[1]], o = [u.parent()[0].offsetHeight, u.parent()[0].offsetWidth], a = [r[0] < o[0] ? c[0] : c[1], r[1] < o[1] ? c[0] : c[1]], s[0] - o[0] * a[0][0] < 0 && s[0] + r[0] - o[0] * a[0][1] >= 0 && s[1] - o[1] * a[1][0] < 0 && s[1] + r[1] - o[1] * a[1][1] >= 0
							},
							mcsOverflow: t.expr[":"].mcsOverflow || function (e) {
								var i = t(e).data("mCS");
								if (i) return i.overflowed[0] || i.overflowed[1]
							}
						})
					})
				}()
		}()
	});
var superagentLegacyIESupportPlugin = function (t) {
		function e(t) {
			if (t !== Object(t)) return t;
			var e = [];
			for (var i in t) null != t[i] && e.push(encodeURIComponent(i) + "=" + encodeURIComponent(t[i]));
			return e.join("&")
		}
		var i = function (t) {
			var i = this,
				n = this.xhr = new XDomainRequest;
			n.getAllResponseHeaders = function () {
				return ""
			}, n.getResponseHeader = function (t) {
				return "content-type" == t ? "application/json" : void 0
			};
			var r = this._query.join("&"),
				o = this._formData || this._data;
			if (this._callback = t || noop, n.onload = function () {
					n.status = 200, i.emit("end")
				}, n.onerror = function () {
					return n.status = 400, i.aborted ? i.timeoutError() : i.crossDomainError()
				}, n.onprogress = function () {
					i.emit("progress", 50)
				}, n.ontimeout = function () {
					return n.status = 408, i.timeoutError()
				}, r && (r = e(r), this.url += ~this.url.indexOf("?") ? "&" + r : "?" + r), "GET" != this.method && "POST" != this.method) throw "Only Get and Post methods are supported by XDomainRequest object.";
			return n.open(this.method, this.url, !0), "POST" == this.method && "string" != typeof o && (o = e(o)), this.emit("request", this), n.send(o), this
		};
		(function (t) {
			var e = document.createElement("a");
			return e.href = t, {
				hostname: e.hostname,
				protocol: e.protocol,
				pathname: e.pathname,
				queryString: e.search
			}
		})(t.url).hostname != window.location.hostname && "undefined" != typeof XDomainRequest && (t.end = i)
	},
	dbits, canary = 0xdeadbeefcafe,
	j_lm = 15715070 == (16777215 & canary);
j_lm && "Microsoft Internet Explorer" == navigator.appName ? (BigInteger.prototype.am = am2, dbits = 30) : j_lm && "Netscape" != navigator.appName ? (BigInteger.prototype.am = am1, dbits = 26) : (BigInteger.prototype.am = am3, dbits = 28), BigInteger.prototype.DB = dbits, BigInteger.prototype.DM = (1 << dbits) - 1, BigInteger.prototype.DV = 1 << dbits;
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP), BigInteger.prototype.F1 = BI_FP - dbits, BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz",
	BI_RC = new Array,
	rr, vv;
for (rr = "0".charCodeAt(0), vv = 0; 9 >= vv; ++vv) BI_RC[rr++] = vv;
for (rr = "a".charCodeAt(0), vv = 10; 36 > vv; ++vv) BI_RC[rr++] = vv;
for (rr = "A".charCodeAt(0), vv = 10; 36 > vv; ++vv) BI_RC[rr++] = vv;
Classic.prototype.convert = cConvert, Classic.prototype.revert = cRevert, Classic.prototype.reduce = cReduce, Classic.prototype.mulTo = cMulTo, Classic.prototype.sqrTo = cSqrTo, Montgomery.prototype.convert = montConvert, Montgomery.prototype.revert = montRevert, Montgomery.prototype.reduce = montReduce, Montgomery.prototype.mulTo = montMulTo, Montgomery.prototype.sqrTo = montSqrTo, BigInteger.prototype.copyTo = bnpCopyTo, BigInteger.prototype.fromInt = bnpFromInt, BigInteger.prototype.fromString = bnpFromString, BigInteger.prototype.clamp = bnpClamp, BigInteger.prototype.dlShiftTo = bnpDLShiftTo, BigInteger.prototype.drShiftTo = bnpDRShiftTo, BigInteger.prototype.lShiftTo = bnpLShiftTo, BigInteger.prototype.rShiftTo = bnpRShiftTo, BigInteger.prototype.subTo = bnpSubTo, BigInteger.prototype.multiplyTo = bnpMultiplyTo, BigInteger.prototype.squareTo = bnpSquareTo, BigInteger.prototype.divRemTo = bnpDivRemTo, BigInteger.prototype.invDigit = bnpInvDigit, BigInteger.prototype.isEven = bnpIsEven, BigInteger.prototype.exp = bnpExp, BigInteger.prototype.toString = bnToString, BigInteger.prototype.negate = bnNegate, BigInteger.prototype.abs = bnAbs, BigInteger.prototype.compareTo = bnCompareTo, BigInteger.prototype.bitLength = bnBitLength, BigInteger.prototype.mod = bnMod, BigInteger.prototype.modPowInt = bnModPowInt, BigInteger.ZERO = nbv(0), BigInteger.ONE = nbv(1), Arcfour.prototype.init = ARC4init, Arcfour.prototype.next = ARC4next;
var rng_psize = 256,
	rng_state, rng_pool, rng_pptr;
if (null == rng_pool) {
	rng_pool = new Array, rng_pptr = 0;
	var t;
	if (window.crypto && window.crypto.getRandomValues) {
		var ua = new Uint8Array(32);
		for (window.crypto.getRandomValues(ua), t = 0; 32 > t; ++t) rng_pool[rng_pptr++] = ua[t]
	}
	if ("Netscape" == navigator.appName && navigator.appVersion < "5" && window.crypto) {
		var z = window.crypto.random(32);
		for (t = 0; t < z.length; ++t) rng_pool[rng_pptr++] = 255 & z.charCodeAt(t)
	}
	for (; rng_psize > rng_pptr;) t = Math.floor(65536 * Math.random()), rng_pool[rng_pptr++] = t >>> 8, rng_pool[rng_pptr++] = 255 & t;
	rng_pptr = 0, rng_seed_time()
}
SecureRandom.prototype.nextBytes = rng_get_bytes, RSAKey.prototype.doPublic = RSADoPublic, RSAKey.prototype.setPublic = RSASetPublic, RSAKey.prototype.encrypt = RSAEncrypt;
var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
	b64padchar = "=";
! function () {
	function t(e, i, n) {
		var r = t.resolve(e);
		if (null == r) {
			n = n || e, i = i || "root";
			var o = new Error('Failed to require "' + n + '" from "' + i + '"');
			throw o.path = n, o.parent = i, o.require = !0, o
		}
		var s = t.modules[r];
		if (!s._resolving && !s.exports) {
			var a = {};
			a.exports = {}, a.client = a.component = !0, s._resolving = !0, s.call(this, a.exports, t.relative(r), a), delete s._resolving, s.exports = a.exports
		}
		return s.exports
	}
	t.modules = {}, t.aliases = {}, t.resolve = function (e) {
		"/" === e.charAt(0) && (e = e.slice(1));
		for (var i = [e, e + ".js", e + ".json", e + "/index.js", e + "/index.json"], n = 0; n < i.length; n++) {
			var e = i[n];
			if (t.modules.hasOwnProperty(e)) return e;
			if (t.aliases.hasOwnProperty(e)) return t.aliases[e]
		}
	}, t.normalize = function (t, e) {
		var i = [];
		if ("." != e.charAt(0)) return e;
		t = t.split("/"), e = e.split("/");
		for (var n = 0; n < e.length; ++n) ".." == e[n] ? t.pop() : "." != e[n] && "" != e[n] && i.push(e[n]);
		return t.concat(i).join("/")
	}, t.register = function (e, i) {
		t.modules[e] = i
	}, t.alias = function (e, i) {
		if (!t.modules.hasOwnProperty(e)) throw new Error('Failed to alias "' + e + '", it does not exist');
		t.aliases[i] = e
	}, t.relative = function (e) {
		function i(t, e) {
			for (var i = t.length; i--;)
				if (t[i] === e) return i;
			return -1
		}

		function n(i) {
			return t(n.resolve(i), e, i)
		}
		var r = t.normalize(e, "..");
		return n.resolve = function (n) {
			var o = n.charAt(0);
			if ("/" == o) return n.slice(1);
			if ("." == o) return t.normalize(r, n);
			var s = e.split("/"),
				a = i(s, "deps") + 1;
			return a || (a = 0), n = s.slice(0, a + 1).join("/") + "/deps/" + n
		}, n.exists = function (e) {
			return t.modules.hasOwnProperty(n.resolve(e))
		}, n
	}, t.register("component-emitter/index.js", function (t, e, i) {
		function n(t) {
			return t ? r(t) : void 0
		}

		function r(t) {
			for (var e in n.prototype) t[e] = n.prototype[e];
			return t
		}
		i.exports = n, n.prototype.on = n.prototype.addEventListener = function (t, e) {
			return this._callbacks = this._callbacks || {}, (this._callbacks[t] = this._callbacks[t] || []).push(e), this
		}, n.prototype.once = function (t, e) {
			function i() {
				n.off(t, i), e.apply(this, arguments)
			}
			var n = this;
			return this._callbacks = this._callbacks || {}, i.fn = e, this.on(t, i), this
		}, n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function (t, e) {
			if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
			var i = this._callbacks[t];
			if (!i) return this;
			if (1 == arguments.length) return delete this._callbacks[t], this;
			for (var n, r = 0; r < i.length; r++)
				if ((n = i[r]) === e || n.fn === e) {
					i.splice(r, 1);
					break
				}
			return this
		}, n.prototype.emit = function (t) {
			this._callbacks = this._callbacks || {};
			var e = [].slice.call(arguments, 1),
				i = this._callbacks[t];
			if (i)
				for (var n = 0, r = (i = i.slice(0)).length; r > n; ++n) i[n].apply(this, e);
			return this
		}, n.prototype.listeners = function (t) {
			return this._callbacks = this._callbacks || {}, this._callbacks[t] || []
		}, n.prototype.hasListeners = function (t) {
			return !!this.listeners(t).length
		}
	}), t.register("component-reduce/index.js", function (t, e, i) {
		i.exports = function (t, e, i) {
			for (var n = 0, r = t.length, o = 3 == arguments.length ? i : t[n++]; r > n;) o = e.call(null, o, t[n], ++n, t);
			return o
		}
	}), t.register("superagent/lib/client.js", function (t, e, i) {
		function n() {}

		function r(t) {
			switch ({}.toString.call(t)) {
				case "[object File]":
				case "[object Blob]":
				case "[object FormData]":
					return !0;
				default:
					return !1
			}
		}

		function o() {
			if (v.XMLHttpRequest && ("file:" != v.location.protocol || !v.ActiveXObject)) return new XMLHttpRequest;
			try {
				return new ActiveXObject("Microsoft.XMLHTTP")
			} catch (t) {}
			try {
				return new ActiveXObject("Msxml2.XMLHTTP.6.0")
			} catch (t) {}
			try {
				return new ActiveXObject("Msxml2.XMLHTTP.3.0")
			} catch (t) {}
			try {
				return new ActiveXObject("Msxml2.XMLHTTP")
			} catch (t) {}
			return !1
		}

		function s(t) {
			return t === Object(t)
		}

		function a(t) {
			if (!s(t)) return t;
			var e = [];
			for (var i in t) null != t[i] && e.push(encodeURIComponent(i) + "=" + encodeURIComponent(t[i]));
			return e.join("&")
		}

		function l(t) {
			for (var e, i, n = {}, r = t.split("&"), o = 0, s = r.length; s > o; ++o) i = r[o], e = i.split("="), n[decodeURIComponent(e[0])] = decodeURIComponent(e[1]);
			return n
		}

		function u(t) {
			var e, i, n, r, o = t.split(/\r?\n/),
				s = {};
			o.pop();
			for (var a = 0, l = o.length; l > a; ++a) i = o[a], e = i.indexOf(":"), n = i.slice(0, e).toLowerCase(), r = _(i.slice(e + 1)), s[n] = r;
			return s
		}

		function c(t) {
			return t.split(/ *; */).shift()
		}

		function h(t) {
			return g(t.split(/ *; */), function (t, e) {
				var i = e.split(/ *= */),
					n = i.shift(),
					r = i.shift();
				return n && r && (t[n] = r), t
			}, {})
		}

		function d(t, e) {
			e = e || {}, this.req = t, this.xhr = this.req.xhr, this.text = "HEAD" != this.req.method ? this.xhr.responseText : null, this.setStatusProperties(this.xhr.status), this.header = this.headers = u(this.xhr.getAllResponseHeaders()), this.header["content-type"] = this.xhr.getResponseHeader("content-type"), this.setHeaderProperties(this.header), this.body = "HEAD" != this.req.method ? this.parseBody(this.text) : null
		}

		function p(t, e) {
			var i = this;
			m.call(this), this._query = this._query || [], this.method = t, this.url = e, this.header = {}, this._header = {}, this.on("end", function () {
				var t = null,
					e = null;
				try {
					e = new d(i)
				} catch (e) {
					(t = new Error("Parser is unable to parse the response")).parse = !0, t.original = e
				}
				i.callback(t, e)
			})
		}

		function f(t, e) {
			return "function" == typeof e ? new p("GET", t).end(e) : 1 == arguments.length ? new p("GET", t) : new p(t, e)
		}
		var m = e("emitter"),
			g = e("reduce"),
			v = "undefined" == typeof window ? this : window,
			_ = "".trim ? function (t) {
				return t.trim()
			} : function (t) {
				return t.replace(/(^\s*|\s*$)/g, "")
			};
		f.serializeObject = a, f.parseString = l, f.types = {
			html: "text/html",
			json: "application/json",
			xml: "application/xml",
			urlencoded: "application/x-www-form-urlencoded",
			form: "application/x-www-form-urlencoded",
			"form-data": "application/x-www-form-urlencoded"
		}, f.serialize = {
			"application/x-www-form-urlencoded": a,
			"application/json": JSON.stringify
		}, f.parse = {
			"application/x-www-form-urlencoded": l,
			"application/json": JSON.parse
		}, d.prototype.get = function (t) {
			return this.header[t.toLowerCase()]
		}, d.prototype.setHeaderProperties = function () {
			var t = this.header["content-type"] || "";
			this.type = c(t);
			var e = h(t);
			for (var i in e) this[i] = e[i]
		}, d.prototype.parseBody = function (t) {
			var e = f.parse[this.type];
			return e && t && t.length ? e(t) : null
		}, d.prototype.setStatusProperties = function (t) {
			var e = t / 100 | 0;
			this.status = t, this.statusType = e, this.info = 1 == e, this.ok = 2 == e, this.clientError = 4 == e, this.serverError = 5 == e, this.error = (4 == e || 5 == e) && this.toError(), this.accepted = 202 == t, this.noContent = 204 == t || 1223 == t, this.badRequest = 400 == t, this.unauthorized = 401 == t, this.notAcceptable = 406 == t, this.notFound = 404 == t, this.forbidden = 403 == t
		}, d.prototype.toError = function () {
			var t = this.req,
				e = t.method,
				i = t.url,
				n = "cannot " + e + " " + i + " (" + this.status + ")",
				r = new Error(n);
			return r.status = this.status, r.method = e, r.url = i, r
		}, f.Response = d, m(p.prototype), p.prototype.use = function (t) {
			return t(this), this
		}, p.prototype.timeout = function (t) {
			return this._timeout = t, this
		}, p.prototype.clearTimeout = function () {
			return this._timeout = 0, clearTimeout(this._timer), this
		}, p.prototype.abort = function () {
			return this.aborted ? void 0 : (this.aborted = !0, this.xhr.abort(), this.clearTimeout(), this.emit("abort"), this)
		}, p.prototype.set = function (t, e) {
			if (s(t)) {
				for (var i in t) this.set(i, t[i]);
				return this
			}
			return this._header[t.toLowerCase()] = e, this.header[t] = e, this
		}, p.prototype.unset = function (t) {
			return delete this._header[t.toLowerCase()], delete this.header[t], this
		}, p.prototype.getHeader = function (t) {
			return this._header[t.toLowerCase()]
		}, p.prototype.type = function (t) {
			return this.set("Content-Type", f.types[t] || t), this
		}, p.prototype.accept = function (t) {
			return this.set("Accept", f.types[t] || t), this
		}, p.prototype.auth = function (t, e) {
			var i = btoa(t + ":" + e);
			return this.set("Authorization", "Basic " + i), this
		}, p.prototype.query = function (t) {
			return "string" != typeof t && (t = a(t)), t && this._query.push(t), this
		}, p.prototype.field = function (t, e) {
			return this._formData || (this._formData = new FormData), this._formData.append(t, e), this
		}, p.prototype.attach = function (t, e, i) {
			return this._formData || (this._formData = new FormData), this._formData.append(t, e, i), this
		}, p.prototype.send = function (t) {
			var e = s(t),
				i = this.getHeader("Content-Type");
			if (e && s(this._data))
				for (var n in t) this._data[n] = t[n];
			else "string" == typeof t ? (i || this.type("form"), i = this.getHeader("Content-Type"), this._data = "application/x-www-form-urlencoded" == i ? this._data ? this._data + "&" + t : t : (this._data || "") + t) : this._data = t;
			return e ? (i || this.type("json"), this) : this
		}, p.prototype.callback = function (t, e) {
			var i = this._callback;
			return this.clearTimeout(), 2 == i.length ? i(t, e) : t ? this.emit("error", t) : void i(e)
		}, p.prototype.crossDomainError = function () {
			var t = new Error("Origin is not allowed by Access-Control-Allow-Origin");
			t.crossDomain = !0, this.callback(t)
		}, p.prototype.timeoutError = function () {
			var t = this._timeout,
				e = new Error("timeout of " + t + "ms exceeded");
			e.timeout = t, this.callback(e)
		}, p.prototype.withCredentials = function () {
			return this._withCredentials = !0, this
		}, p.prototype.end = function (t) {
			var e = this,
				i = this.xhr = o(),
				s = this._query.join("&"),
				a = this._timeout,
				l = this._formData || this._data;
			if (this._callback = t || n, i.onreadystatechange = function () {
					return 4 == i.readyState ? 0 == i.status ? e.aborted ? e.timeoutError() : e.crossDomainError() : void e.emit("end") : void 0
				}, i.upload && (i.upload.onprogress = function (t) {
					t.percent = t.loaded / t.total * 100, e.emit("progress", t)
				}), a && !this._timer && (this._timer = setTimeout(function () {
					e.abort()
				}, a)), s && (s = f.serializeObject(s), this.url += ~this.url.indexOf("?") ? "&" + s : "?" + s), i.open(this.method, this.url, !0), this._withCredentials && (i.withCredentials = !0), "GET" != this.method && "HEAD" != this.method && "string" != typeof l && !r(l)) {
				var u = f.serialize[this.getHeader("Content-Type")];
				u && (l = u(l))
			}
			for (var c in this.header) null != this.header[c] && i.setRequestHeader(c, this.header[c]);
			return this.emit("request", this), i.send(l), this
		}, f.Request = p, f.get = function (t, e, i) {
			var n = f("GET", t);
			return "function" == typeof e && (i = e, e = null), e && n.query(e), i && n.end(i), n
		}, f.head = function (t, e, i) {
			var n = f("HEAD", t);
			return "function" == typeof e && (i = e, e = null), e && n.send(e), i && n.end(i), n
		}, f.del = function (t, e) {
			var i = f("DELETE", t);
			return e && i.end(e), i
		}, f.patch = function (t, e, i) {
			var n = f("PATCH", t);
			return "function" == typeof e && (i = e, e = null), e && n.send(e), i && n.end(i), n
		}, f.post = function (t, e, i) {
			var n = f("POST", t);
			return "function" == typeof e && (i = e, e = null), e && n.send(e), i && n.end(i), n
		}, f.put = function (t, e, i) {
			var n = f("PUT", t);
			return "function" == typeof e && (i = e, e = null), e && n.send(e), i && n.end(i), n
		}, i.exports = f
	}), t.alias("component-emitter/index.js", "superagent/deps/emitter/index.js"), t.alias("component-emitter/index.js", "emitter/index.js"), t.alias("component-reduce/index.js", "superagent/deps/reduce/index.js"), t.alias("component-reduce/index.js", "reduce/index.js"), t.alias("superagent/lib/client.js", "superagent/index.js"), "object" == typeof exports ? module.exports = t("superagent") : "function" == typeof define && define.amd ? define([], function () {
		return t("superagent")
	}) : this.superagent = t("superagent")
}(),
function () {
	var t = superagent,
		e = superagentLegacyIESupportPlugin,
		i = "http://212.2.222.53:9096",
		n = "",
		r = new RSAKey;
	r.setPublic("F619C53A37BAB059C583DA9AC4E2920FFC9D57E00885E82F7A0863DEAC43CE06374E45A1417DAC907C6CAC0AF1DDF1D7152192FED7A1D9255C97BC27E420E0742B95ED3C53C62995F42CB6EEDB7B1FBDD3E4F4A4AA935650DA81E763CA7074690032F6A6AF72802CC50394C2AFA5C9450A990E6F969A38571C8BC9E381125D2BEEC348AF919D7374FF10DC3E0B4367566CE929AD6EA323A475A677EB41C20B42D44E82E8A53DD52334D927394FCADF09", "03"), this.MFS = function () {
		var o, s, a = {
				registerCard: ["actionType", "clientIp", "delinkReason", "eActionType", "cardTypeFlag", "cpinFlag", "defaultAccount", "mmrpConfig", "identityVerificationFlag", "mno", "mobileAccountConfig", "msisdn", "programOwnerName", "programOwnerNumber", "programParticipantName", "programParticipantNumber", "programSponsorName", "programSponsorNumber", "referenceNo", "sendSms", "sendSmsLanguage", "timeZone", "uiChannelType", "rtaPan", "expiryDate", "accountAliasName", "cvc", "homeAddress", "homeCity", "homeState", "homeCountryCode", "homePostalCode", "firstName", "lastName", "email", "cardHolderName", "token"],
				deleteCard: ["actionType", "clientIp", "delinkReason", "eActionType", "cardTypeFlag", "cpinFlag", "defaultAccount", "mmrpConfig", "identityVerificationFlag", "mno", "mobileAccountConfig", "msisdn", "programOwnerName", "programOwnerNumber", "programParticipantName", "programParticipantNumber", "programSponsorName", "programSponsorNumber", "referenceNo", "sendSms", "sendSmsLanguage", "timeZone", "uiChannelType", "accountAliasName", "token"],
				validateTransaction: ["validationCode", "sendSms", "sendSmsLanguage", "referenceNo", "token"],
				purchase: ["aav", "amount", "clientIp", "encCPin", "encPassword", "listAccountName", "msisdn", "password", "referenceNo", "sendSms", "sendSmsLanguage", "sendSmsMerchant", "userId", "token", "rewardName", "rewardValue", "moneyCardInvoiceAmount", "moneyCardMigrosDiscountAmount", "moneyCardPaymentAmount", "moneyCardExtraDiscountAmount", "moneyCardProductBasedDiscountAmount", "installmentCount", "cvc", "macroMerchantId", "orderNo", "paymentType"],
				forgotPassword: ["msisdn", "encPan", "token", "referenceNo", "sendSms", "sendSmsLanguage", "cvv"],
				checkMasterPass: ["userId", "token", "referenceNo", "sendSms", "sendSmsLanguage"],
				addCardToMasterPass: ["msisdn", "cardAliasName", "token", "referenceNo", "sendSms", "sendSmsLanguage"],
				linkCardToClient: ["msisdn", "cardAliasName", "token", "referenceNo", "sendSms", "sendSmsLanguage"],
				directPurchase: ["token", "msisdn", "sendSmsLanguage", "fP", "amount", "expiryDate", "rtaPan", "cardHolderName", "cvc", "macroMerchantId", "orderNo", "paymentType", "installmentCount", "rewardName", "rewardValue"],
				completeRegistration: ["sendSmsLanguage", "msisdn", "token", "cardAliasName", "fP", "referenceNo", "sendSms"],
				resendOtp: ["token", "validationRefNo", "sendSmsLanguage", "fP", "expiryDate", "referenceNo", "sendSms"],
				updateUser: ["token", "msisdn", "oldValue", "theNewValue", "valueType", "sendSmsLanguage", "fP", "referenceNo", "sendSms"],
				purchaseAndRegister: ["msisdn", "accountAliasName", "token", "referenceNo", "sendSms", "sendSmsLanguage", "fP", "amount", "actionType", "firstName", "lastName", "gender", "expiryDate", "rtaPan", "cardHolderName", "orderNo", "merchantId", "rewardName", "rewardValue", "moneyCardInvoiceAmount", "moneyCardMigrosDiscountAmount", "moneyCardPaymentAmount", "moneyCardExtraDiscountAmount", "moneyCardProductBasedDiscountAmount", "installmentCount", "cvc", "macroMerchantId", "orderNo", "paymentType"]
			},
			l = !1,
			u = function (t, e) {
				for (var i = t.find("input"), n = i.length - 1; n >= 0; n--) {
					var o = i[n].getAttribute("type");
					if (i[n].getAttribute("name") == e) {
						if ("validationCode" == e && l) return r.encrypt(i[n].value);
						if ("rtaPan" == e) return r.encrypt(i[n].value);
						if ("installmentCount" == e && "" !== i[n].value && !isNaN(i[n].value)) return parseFloat(i[n].value);
						if (("checkbox" == o || "radio" == o) && !i[n].checked) continue;
						return i[n].value
					}
				}
				return null
			},
			c = function (t, e, i) {
				for (var r = i.length - 1; r >= 0; r--) {
					var o = i[r];
					e[o] = u(t, o)
				}
				e.version = "33", e.clientType = "1", e.fp = n
			},
			h = function (t) {
				var e = JSON.parse(t.text || {}),
					i = {};
				if (e.hasOwnProperty("Data")) {
					i.referenceNo = e.Data.Body.Fault.Detail.ServiceFaultDetail.RefNo, i.responseCode = e.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode, i.responseDescription = e.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseDesc, i.url3D = e.Data.Body.Fault.Detail.ServiceFaultDetail.Url3D, i.url3DSuccess = e.Data.Body.Fault.Detail.ServiceFaultDetail.Url3DSuccess, i.url3DError = e.Data.Body.Fault.Detail.ServiceFaultDetail.Url3DError, i.newMsisdn = e.Data.Body.Fault.Detail.ServiceFaultDetail.NewMsisdn;
					var n = e.Data.Body.Fault.Detail.ServiceFaultDetail.Token,
						r = "";
					if (e.Data.Body.hasOwnProperty("Response")) {
						r = e.Data.Body.Response.Result.TransactionBody.Token, i.token = r;
						var o = e.Data.Body.Response.Result.TransactionBody.ListItems;
						try {
							o && 0 !== o.ListItem && (i.cards = o.ListItem)
						} catch (t) {}
						i.accountStatus = e.Data.Body.Response.Result.TransactionBody.AccountStatus
					}
					n && 0 !== n.length ? s = n : i.token = r
				}
				return i
			},
			d = function (t, e) {
				var i = {};
				c(t, i, a.purchase), k(i, "/remotePurchaseOther", e)
			},
			p = function (t, e) {
				var i = {};
				c(t, i, a.registerCard), k(i, "/register", e)
			},
			f = function (t, e) {
				var i = {};
				c(t, i, a.deleteCard), k(i, "/deleteCard", e)
			},
			m = function (t, e) {
				var i = {};
				c(t, i, a.updateUser), k(i, "/updateUser", e)
			},
			g = function (t, e) {
				var i = {};
				c(t, i, a.forgotPassword), k(i, "/forgotPassword", e)
			},
			v = function (t, e) {
				var i = {};
				c(t, i, a.checkMasterPass), k(i, "/checkMasterPassEndUser", e)
			},
			_ = function (t, e) {
				var i = {};
				c(t, i, a.addCardToMasterPass), k(i, "/addCardToMasterPass", e)
			},
			y = function (t, e) {
				var i = {};
				c(t, i, a.linkCardToClient), k(i, "/linkCardToClient", e)
			},
			x = function (t) {
				var e = {};
				e.referenceNo = "00000000", e.sendSms = "N", e.sendSmsLanguage = "eng", e.token = t, k(e, "/commitTransaction", function () {})
			},
			b = function (t, e) {
				var i = t.find("input[name^='pinType']")[0];
				l = "mpin" == i.value;
				var n = {};
				n.validationRefNo = s, c(t, n, a.validateTransaction), k(n, "/validateTransaction", e)
			},
			w = function (t, e) {
				var i = {};
				i.validationRefNo = s, c(t, i, a.purchaseAndRegister), k(i, "/purchaseAndRegister", e)
			},
			T = function (t, e, i) {
				var n = {};
				n.token2 = e, c(t, n, a.completeRegistration), k(n, "/completeRegistration", i)
			},
			C = function (t, e, i) {
				var n = {};
				n.msisdn = t, n.token = e, n.referenceNo = "00000000", n.listType = "ACCOUNT", n.sendSms = "Y", n.clientIp = "", n.sendSmsLanguage = "eng", k(n, "/listManagement", i)
			},
			S = function (t, e, i) {
				var n = {};
				n.validationRefNo = t, n.referenceNo = "00000000", n.sendSms = "N", n.sendSmsLanguage = e, k(n, "/resendOtp", i)
			},
			E = function (t, e) {
				var i = {};
				c(t, i, a.directPurchase), k(i, "/directPurchase", e)
			},
			k = function (n, r, s) {
				n.clientId = o;
				var a = (new Date).toJSON();
				a = a.replace(/"/g, ""), n.dateTime = a, t.post(i + r).use(e).send(JSON.stringify(n)).end(function (t) {
					var e = h(t);
					s(t.status, e)
				})
			};
		return {
			setClientId: function (t) {
				o = t
			},
			listCards: C,
			register: p,
			purchase: d,
			commit: x,
			deleteCard: f,
			validateTransaction: b,
			forgotPassword: g,
			setAddress: function (t) {
				i = t
			},
			checkMasterPass: v,
			linkCardToClient: y,
			addCardToMasterPass: _,
			purchaseAndRegister: w,
			directPurchase: E,
			resendOtp: S,
			completeRegistration: T,
			setFingerprint: function (t) {
				n = t
			},
			setToken: function (t) {
				s = t
			},
			getLastToken: function () {
				return s
			},
			updateUser: m
		}
	}()
}.call(this);