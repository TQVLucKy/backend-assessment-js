// .wrangler/tmp/bundle-0Sl3qT/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// node_modules/itty-router/index.mjs
var t = ({ base: e = "", routes: t2 = [], ...r2 } = {}) => ({ __proto__: new Proxy({}, { get: (r3, o2, a2, s) => (r4, ...c) => t2.push([o2.toUpperCase?.(), RegExp(`^${(s = (e + r4).replace(/\/+(\/|$)/g, "$1")).replace(/(\/?\.?):(\w+)\+/g, "($1(?<$2>*))").replace(/(\/?\.?):(\w+)/g, "($1(?<$2>[^$1/]+?))").replace(/\./g, "\\.").replace(/(\/?)\*/g, "($1.*)?")}/*$`), c, s]) && a2 }), routes: t2, ...r2, async fetch(e2, ...o2) {
  let a2, s, c = new URL(e2.url), n = e2.query = { __proto__: null };
  for (let [e3, t3] of c.searchParams) n[e3] = n[e3] ? [].concat(n[e3], t3) : t3;
  e: try {
    for (let t3 of r2.before || []) if (null != (a2 = await t3(e2.proxy ?? e2, ...o2))) break e;
    t: for (let [r3, n2, l, i] of t2) if ((r3 == e2.method || "ALL" == r3) && (s = c.pathname.match(n2))) {
      e2.params = s.groups || {}, e2.route = i;
      for (let t3 of l) if (null != (a2 = await t3(e2.proxy ?? e2, ...o2))) break t;
    }
  } catch (t3) {
    if (!r2.catch) throw t3;
    a2 = await r2.catch(t3, e2.proxy ?? e2, ...o2);
  }
  try {
    for (let t3 of r2.finally || []) a2 = await t3(a2, e2.proxy ?? e2, ...o2) ?? a2;
  } catch (t3) {
    if (!r2.catch) throw t3;
    a2 = await r2.catch(t3, e2.proxy ?? e2, ...o2);
  }
  return a2;
} });
var r = (e = "text/plain; charset=utf-8", t2) => (r2, o2 = {}) => {
  if (void 0 === r2 || r2 instanceof Response) return r2;
  const a2 = new Response(t2?.(r2) ?? r2, o2.url ? void 0 : o2);
  return a2.headers.set("content-type", e), a2;
};
var o = r("application/json; charset=utf-8", JSON.stringify);
var p = r("text/plain; charset=utf-8", String);
var f = r("text/html");
var u = r("image/jpeg");
var h = r("image/png");
var g = r("image/webp");

// src/database.ts
async function initProductsTable(client) {
  return client.query(`
        CREATE TABLE IF NOT EXISTS products(
            id BIGINT PRIMARY KEY,
            product_id BIGINT NOT NULL,
            title TEXT NOT NULL,
            tags TEXT[],
            created_at TIMESTAMP NOT NULL,
            updated_at TIMESTAMP NULL,
            sku TEXT NOT NULL)`);
}
async function insertProducts(client, product) {
  const { id, title, tags, variants } = product;
  let count = 0;
  for (const variant of variants) {
    await client.query(
      `INSERT INTO products (id, product_id, title, tags, created_at, updated_at, sku)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (id) DO NOTHING
            `,
      [
        variant.id,
        id,
        `${title} ${variant.title}`,
        Array.isArray(tags) ? tags : tags ? tags.split(",") : [],
        variant.created_at,
        variant.updated_at,
        variant.sku
      ]
    );
    count++;
  }
  return count;
}
async function AllProduct(client) {
  const res = await client.query(`SELECT * FROM products`);
  return res.rows;
}
async function deleteProducts(client, product_id) {
  const res = await client.query(`DELETE FROM products WHERE product_id = $1 RETURNING *`, [product_id]);
  return res.rows;
}
function formatDate(date = /* @__PURE__ */ new Date()) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mi2 = String(date.getMinutes()).padStart(2, "0");
  const ss2 = String(date.getSeconds()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${mi2}:${ss2}`;
}
async function updateProducts(client) {
  const res = await client.query(
    `
        UPDATE products
        SET title = title || ' ' || sku, updated_at = $1
        RETURNING *`,
    [formatDate()]
  );
  return res.rows;
}

// node_modules/@neondatabase/serverless/index.mjs
var io = Object.create;
var Ce = Object.defineProperty;
var so = Object.getOwnPropertyDescriptor;
var oo = Object.getOwnPropertyNames;
var ao = Object.getPrototypeOf;
var uo = Object.prototype.hasOwnProperty;
var co = (r2, e, t2) => e in r2 ? Ce(r2, e, { enumerable: true, configurable: true, writable: true, value: t2 }) : r2[e] = t2;
var a = (r2, e) => Ce(r2, "name", { value: e, configurable: true });
var z = (r2, e) => () => (r2 && (e = r2(r2 = 0)), e);
var I = (r2, e) => () => (e || r2((e = { exports: {} }).exports, e), e.exports);
var se = (r2, e) => {
  for (var t2 in e)
    Ce(r2, t2, { get: e[t2], enumerable: true });
};
var Tn = (r2, e, t2, n) => {
  if (e && typeof e == "object" || typeof e == "function") for (let i of oo(e)) !uo.call(r2, i) && i !== t2 && Ce(r2, i, { get: () => e[i], enumerable: !(n = so(e, i)) || n.enumerable });
  return r2;
};
var Te = (r2, e, t2) => (t2 = r2 != null ? io(ao(r2)) : {}, Tn(e || !r2 || !r2.__esModule ? Ce(t2, "default", {
  value: r2,
  enumerable: true
}) : t2, r2));
var O = (r2) => Tn(Ce({}, "__esModule", { value: true }), r2);
var _ = (r2, e, t2) => co(r2, typeof e != "symbol" ? e + "" : e, t2);
var Bn = I((st) => {
  "use strict";
  p2();
  st.byteLength = lo;
  st.toByteArray = po;
  st.fromByteArray = go;
  var ae = [], re = [], ho = typeof Uint8Array < "u" ? Uint8Array : Array, Rt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (Ee = 0, In = Rt.length; Ee < In; ++Ee)
    ae[Ee] = Rt[Ee], re[Rt.charCodeAt(Ee)] = Ee;
  var Ee, In;
  re[45] = 62;
  re[95] = 63;
  function Pn(r2) {
    var e = r2.length;
    if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    var t2 = r2.indexOf("=");
    t2 === -1 && (t2 = e);
    var n = t2 === e ? 0 : 4 - t2 % 4;
    return [t2, n];
  }
  a(
    Pn,
    "getLens"
  );
  function lo(r2) {
    var e = Pn(r2), t2 = e[0], n = e[1];
    return (t2 + n) * 3 / 4 - n;
  }
  a(lo, "byteLength");
  function fo(r2, e, t2) {
    return (e + t2) * 3 / 4 - t2;
  }
  a(fo, "_byteLength");
  function po(r2) {
    var e, t2 = Pn(r2), n = t2[0], i = t2[1], s = new ho(fo(r2, n, i)), o2 = 0, u2 = i > 0 ? n - 4 : n, c;
    for (c = 0; c < u2; c += 4) e = re[r2.charCodeAt(c)] << 18 | re[r2.charCodeAt(c + 1)] << 12 | re[r2.charCodeAt(c + 2)] << 6 | re[r2.charCodeAt(c + 3)], s[o2++] = e >> 16 & 255, s[o2++] = e >> 8 & 255, s[o2++] = e & 255;
    return i === 2 && (e = re[r2.charCodeAt(c)] << 2 | re[r2.charCodeAt(c + 1)] >> 4, s[o2++] = e & 255), i === 1 && (e = re[r2.charCodeAt(
      c
    )] << 10 | re[r2.charCodeAt(c + 1)] << 4 | re[r2.charCodeAt(c + 2)] >> 2, s[o2++] = e >> 8 & 255, s[o2++] = e & 255), s;
  }
  a(po, "toByteArray");
  function yo(r2) {
    return ae[r2 >> 18 & 63] + ae[r2 >> 12 & 63] + ae[r2 >> 6 & 63] + ae[r2 & 63];
  }
  a(yo, "tripletToBase64");
  function mo(r2, e, t2) {
    for (var n, i = [], s = e; s < t2; s += 3) n = (r2[s] << 16 & 16711680) + (r2[s + 1] << 8 & 65280) + (r2[s + 2] & 255), i.push(yo(n));
    return i.join(
      ""
    );
  }
  a(mo, "encodeChunk");
  function go(r2) {
    for (var e, t2 = r2.length, n = t2 % 3, i = [], s = 16383, o2 = 0, u2 = t2 - n; o2 < u2; o2 += s) i.push(mo(r2, o2, o2 + s > u2 ? u2 : o2 + s));
    return n === 1 ? (e = r2[t2 - 1], i.push(ae[e >> 2] + ae[e << 4 & 63] + "==")) : n === 2 && (e = (r2[t2 - 2] << 8) + r2[t2 - 1], i.push(ae[e >> 10] + ae[e >> 4 & 63] + ae[e << 2 & 63] + "=")), i.join("");
  }
  a(go, "fromByteArray");
});
var Ln = I((Ft) => {
  p2();
  Ft.read = function(r2, e, t2, n, i) {
    var s, o2, u2 = i * 8 - n - 1, c = (1 << u2) - 1, h2 = c >> 1, l = -7, d = t2 ? i - 1 : 0, b = t2 ? -1 : 1, C = r2[e + d];
    for (d += b, s = C & (1 << -l) - 1, C >>= -l, l += u2; l > 0; s = s * 256 + r2[e + d], d += b, l -= 8) ;
    for (o2 = s & (1 << -l) - 1, s >>= -l, l += n; l > 0; o2 = o2 * 256 + r2[e + d], d += b, l -= 8) ;
    if (s === 0) s = 1 - h2;
    else {
      if (s === c) return o2 ? NaN : (C ? -1 : 1) * (1 / 0);
      o2 = o2 + Math.pow(2, n), s = s - h2;
    }
    return (C ? -1 : 1) * o2 * Math.pow(2, s - n);
  };
  Ft.write = function(r2, e, t2, n, i, s) {
    var o2, u2, c, h2 = s * 8 - i - 1, l = (1 << h2) - 1, d = l >> 1, b = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, C = n ? 0 : s - 1, B = n ? 1 : -1, Q = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (u2 = isNaN(e) ? 1 : 0, o2 = l) : (o2 = Math.floor(Math.log(e) / Math.LN2), e * (c = Math.pow(2, -o2)) < 1 && (o2--, c *= 2), o2 + d >= 1 ? e += b / c : e += b * Math.pow(2, 1 - d), e * c >= 2 && (o2++, c /= 2), o2 + d >= l ? (u2 = 0, o2 = l) : o2 + d >= 1 ? (u2 = (e * c - 1) * Math.pow(
      2,
      i
    ), o2 = o2 + d) : (u2 = e * Math.pow(2, d - 1) * Math.pow(2, i), o2 = 0)); i >= 8; r2[t2 + C] = u2 & 255, C += B, u2 /= 256, i -= 8) ;
    for (o2 = o2 << i | u2, h2 += i; h2 > 0; r2[t2 + C] = o2 & 255, C += B, o2 /= 256, h2 -= 8) ;
    r2[t2 + C - B] |= Q * 128;
  };
});
var Kn = I((Le) => {
  "use strict";
  p2();
  var Mt = Bn(), Pe = Ln(), Rn = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  Le.Buffer = f2;
  Le.SlowBuffer = vo;
  Le.INSPECT_MAX_BYTES = 50;
  var ot = 2147483647;
  Le.kMaxLength = ot;
  f2.TYPED_ARRAY_SUPPORT = wo();
  !f2.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  function wo() {
    try {
      let r2 = new Uint8Array(1), e = { foo: a(function() {
        return 42;
      }, "foo") };
      return Object.setPrototypeOf(e, Uint8Array.prototype), Object.setPrototypeOf(
        r2,
        e
      ), r2.foo() === 42;
    } catch {
      return false;
    }
  }
  a(wo, "typedArraySupport");
  Object.defineProperty(
    f2.prototype,
    "parent",
    { enumerable: true, get: a(function() {
      if (f2.isBuffer(this)) return this.buffer;
    }, "get") }
  );
  Object.defineProperty(f2.prototype, "offset", { enumerable: true, get: a(
    function() {
      if (f2.isBuffer(this)) return this.byteOffset;
    },
    "get"
  ) });
  function le(r2) {
    if (r2 > ot) throw new RangeError('The value "' + r2 + '" is invalid for option "size"');
    let e = new Uint8Array(
      r2
    );
    return Object.setPrototypeOf(e, f2.prototype), e;
  }
  a(le, "createBuffer");
  function f2(r2, e, t2) {
    if (typeof r2 == "number") {
      if (typeof e == "string") throw new TypeError('The "string" argument must be of type string. Received type number');
      return Ot(r2);
    }
    return kn(
      r2,
      e,
      t2
    );
  }
  a(f2, "Buffer");
  f2.poolSize = 8192;
  function kn(r2, e, t2) {
    if (typeof r2 == "string") return So(
      r2,
      e
    );
    if (ArrayBuffer.isView(r2)) return xo(r2);
    if (r2 == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof r2);
    if (ue(r2, ArrayBuffer) || r2 && ue(r2.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (ue(r2, SharedArrayBuffer) || r2 && ue(r2.buffer, SharedArrayBuffer)))
      return kt(r2, e, t2);
    if (typeof r2 == "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
    let n = r2.valueOf && r2.valueOf();
    if (n != null && n !== r2) return f2.from(n, e, t2);
    let i = Eo(r2);
    if (i) return i;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof r2[Symbol.toPrimitive] == "function") return f2.from(r2[Symbol.toPrimitive]("string"), e, t2);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof r2);
  }
  a(kn, "from");
  f2.from = function(r2, e, t2) {
    return kn(r2, e, t2);
  };
  Object.setPrototypeOf(f2.prototype, Uint8Array.prototype);
  Object.setPrototypeOf(
    f2,
    Uint8Array
  );
  function Un(r2) {
    if (typeof r2 != "number") throw new TypeError('"size" argument must be of type number');
    if (r2 < 0) throw new RangeError('The value "' + r2 + '" is invalid for option "size"');
  }
  a(Un, "assertSize");
  function bo(r2, e, t2) {
    return Un(r2), r2 <= 0 ? le(r2) : e !== void 0 ? typeof t2 == "string" ? le(r2).fill(e, t2) : le(r2).fill(e) : le(r2);
  }
  a(
    bo,
    "alloc"
  );
  f2.alloc = function(r2, e, t2) {
    return bo(r2, e, t2);
  };
  function Ot(r2) {
    return Un(r2), le(
      r2 < 0 ? 0 : Nt(r2) | 0
    );
  }
  a(Ot, "allocUnsafe");
  f2.allocUnsafe = function(r2) {
    return Ot(r2);
  };
  f2.allocUnsafeSlow = function(r2) {
    return Ot(r2);
  };
  function So(r2, e) {
    if ((typeof e != "string" || e === "") && (e = "utf8"), !f2.isEncoding(e)) throw new TypeError("Unknown encoding: " + e);
    let t2 = On(r2, e) | 0, n = le(t2), i = n.write(r2, e);
    return i !== t2 && (n = n.slice(0, i)), n;
  }
  a(So, "fromString");
  function Dt(r2) {
    let e = r2.length < 0 ? 0 : Nt(r2.length) | 0, t2 = le(e);
    for (let n = 0; n < e; n += 1) t2[n] = r2[n] & 255;
    return t2;
  }
  a(Dt, "fromArrayLike");
  function xo(r2) {
    if (ue(r2, Uint8Array)) {
      let e = new Uint8Array(r2);
      return kt(e.buffer, e.byteOffset, e.byteLength);
    }
    return Dt(r2);
  }
  a(xo, "fromArrayView");
  function kt(r2, e, t2) {
    if (e < 0 || r2.byteLength < e) throw new RangeError('"offset" is outside of buffer bounds');
    if (r2.byteLength < e + (t2 || 0)) throw new RangeError('"length" is outside of buffer bounds');
    let n;
    return e === void 0 && t2 === void 0 ? n = new Uint8Array(
      r2
    ) : t2 === void 0 ? n = new Uint8Array(r2, e) : n = new Uint8Array(r2, e, t2), Object.setPrototypeOf(
      n,
      f2.prototype
    ), n;
  }
  a(kt, "fromArrayBuffer");
  function Eo(r2) {
    if (f2.isBuffer(r2)) {
      let e = Nt(
        r2.length
      ) | 0, t2 = le(e);
      return t2.length === 0 || r2.copy(t2, 0, 0, e), t2;
    }
    if (r2.length !== void 0)
      return typeof r2.length != "number" || Qt(r2.length) ? le(0) : Dt(r2);
    if (r2.type === "Buffer" && Array.isArray(r2.data)) return Dt(r2.data);
  }
  a(Eo, "fromObject");
  function Nt(r2) {
    if (r2 >= ot) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + ot.toString(16) + " bytes");
    return r2 | 0;
  }
  a(Nt, "checked");
  function vo(r2) {
    return +r2 != r2 && (r2 = 0), f2.alloc(+r2);
  }
  a(vo, "SlowBuffer");
  f2.isBuffer = a(function(e) {
    return e != null && e._isBuffer === true && e !== f2.prototype;
  }, "isBuffer");
  f2.compare = a(function(e, t2) {
    if (ue(e, Uint8Array) && (e = f2.from(e, e.offset, e.byteLength)), ue(t2, Uint8Array) && (t2 = f2.from(t2, t2.offset, t2.byteLength)), !f2.isBuffer(e) || !f2.isBuffer(t2)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (e === t2) return 0;
    let n = e.length, i = t2.length;
    for (let s = 0, o2 = Math.min(n, i); s < o2; ++s) if (e[s] !== t2[s]) {
      n = e[s], i = t2[s];
      break;
    }
    return n < i ? -1 : i < n ? 1 : 0;
  }, "compare");
  f2.isEncoding = a(function(e) {
    switch (String(e).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  }, "isEncoding");
  f2.concat = a(function(e, t2) {
    if (!Array.isArray(e)) throw new TypeError('"list" argument must be an Array of Buffers');
    if (e.length === 0) return f2.alloc(0);
    let n;
    if (t2 === void 0) for (t2 = 0, n = 0; n < e.length; ++n) t2 += e[n].length;
    let i = f2.allocUnsafe(t2), s = 0;
    for (n = 0; n < e.length; ++n) {
      let o2 = e[n];
      if (ue(o2, Uint8Array)) s + o2.length > i.length ? (f2.isBuffer(
        o2
      ) || (o2 = f2.from(o2)), o2.copy(i, s)) : Uint8Array.prototype.set.call(i, o2, s);
      else if (f2.isBuffer(
        o2
      )) o2.copy(i, s);
      else throw new TypeError('"list" argument must be an Array of Buffers');
      s += o2.length;
    }
    return i;
  }, "concat");
  function On(r2, e) {
    if (f2.isBuffer(r2)) return r2.length;
    if (ArrayBuffer.isView(r2) || ue(r2, ArrayBuffer)) return r2.byteLength;
    if (typeof r2 != "string") throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof r2);
    let t2 = r2.length, n = arguments.length > 2 && arguments[2] === true;
    if (!n && t2 === 0) return 0;
    let i = false;
    for (; ; ) switch (e) {
      case "ascii":
      case "latin1":
      case "binary":
        return t2;
      case "utf8":
      case "utf-8":
        return Ut(r2).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return t2 * 2;
      case "hex":
        return t2 >>> 1;
      case "base64":
        return Vn(r2).length;
      default:
        if (i) return n ? -1 : Ut(r2).length;
        e = ("" + e).toLowerCase(), i = true;
    }
  }
  a(On, "byteLength");
  f2.byteLength = On;
  function _o(r2, e, t2) {
    let n = false;
    if ((e === void 0 || e < 0) && (e = 0), e > this.length || ((t2 === void 0 || t2 > this.length) && (t2 = this.length), t2 <= 0) || (t2 >>>= 0, e >>>= 0, t2 <= e)) return "";
    for (r2 || (r2 = "utf8"); ; ) switch (r2) {
      case "hex":
        return Mo(
          this,
          e,
          t2
        );
      case "utf8":
      case "utf-8":
        return qn(this, e, t2);
      case "ascii":
        return Ro(
          this,
          e,
          t2
        );
      case "latin1":
      case "binary":
        return Fo(this, e, t2);
      case "base64":
        return Bo(
          this,
          e,
          t2
        );
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return Do(this, e, t2);
      default:
        if (n) throw new TypeError("Unknown encoding: " + r2);
        r2 = (r2 + "").toLowerCase(), n = true;
    }
  }
  a(
    _o,
    "slowToString"
  );
  f2.prototype._isBuffer = true;
  function ve(r2, e, t2) {
    let n = r2[e];
    r2[e] = r2[t2], r2[t2] = n;
  }
  a(ve, "swap");
  f2.prototype.swap16 = a(function() {
    let e = this.length;
    if (e % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let t2 = 0; t2 < e; t2 += 2) ve(this, t2, t2 + 1);
    return this;
  }, "swap16");
  f2.prototype.swap32 = a(function() {
    let e = this.length;
    if (e % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let t2 = 0; t2 < e; t2 += 4) ve(this, t2, t2 + 3), ve(this, t2 + 1, t2 + 2);
    return this;
  }, "swap32");
  f2.prototype.swap64 = a(function() {
    let e = this.length;
    if (e % 8 !== 0) throw new RangeError(
      "Buffer size must be a multiple of 64-bits"
    );
    for (let t2 = 0; t2 < e; t2 += 8) ve(this, t2, t2 + 7), ve(this, t2 + 1, t2 + 6), ve(this, t2 + 2, t2 + 5), ve(this, t2 + 3, t2 + 4);
    return this;
  }, "swap64");
  f2.prototype.toString = a(function() {
    let e = this.length;
    return e === 0 ? "" : arguments.length === 0 ? qn(
      this,
      0,
      e
    ) : _o.apply(this, arguments);
  }, "toString");
  f2.prototype.toLocaleString = f2.prototype.toString;
  f2.prototype.equals = a(function(e) {
    if (!f2.isBuffer(e)) throw new TypeError(
      "Argument must be a Buffer"
    );
    return this === e ? true : f2.compare(this, e) === 0;
  }, "equals");
  f2.prototype.inspect = a(function() {
    let e = "", t2 = Le.INSPECT_MAX_BYTES;
    return e = this.toString(
      "hex",
      0,
      t2
    ).replace(/(.{2})/g, "$1 ").trim(), this.length > t2 && (e += " ... "), "<Buffer " + e + ">";
  }, "inspect");
  Rn && (f2.prototype[Rn] = f2.prototype.inspect);
  f2.prototype.compare = a(function(e, t2, n, i, s) {
    if (ue(e, Uint8Array) && (e = f2.from(e, e.offset, e.byteLength)), !f2.isBuffer(e)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
    if (t2 === void 0 && (t2 = 0), n === void 0 && (n = e ? e.length : 0), i === void 0 && (i = 0), s === void 0 && (s = this.length), t2 < 0 || n > e.length || i < 0 || s > this.length) throw new RangeError("out of range index");
    if (i >= s && t2 >= n) return 0;
    if (i >= s) return -1;
    if (t2 >= n) return 1;
    if (t2 >>>= 0, n >>>= 0, i >>>= 0, s >>>= 0, this === e) return 0;
    let o2 = s - i, u2 = n - t2, c = Math.min(o2, u2), h2 = this.slice(i, s), l = e.slice(t2, n);
    for (let d = 0; d < c; ++d)
      if (h2[d] !== l[d]) {
        o2 = h2[d], u2 = l[d];
        break;
      }
    return o2 < u2 ? -1 : u2 < o2 ? 1 : 0;
  }, "compare");
  function Nn(r2, e, t2, n, i) {
    if (r2.length === 0) return -1;
    if (typeof t2 == "string" ? (n = t2, t2 = 0) : t2 > 2147483647 ? t2 = 2147483647 : t2 < -2147483648 && (t2 = -2147483648), t2 = +t2, Qt(t2) && (t2 = i ? 0 : r2.length - 1), t2 < 0 && (t2 = r2.length + t2), t2 >= r2.length) {
      if (i) return -1;
      t2 = r2.length - 1;
    } else if (t2 < 0) if (i) t2 = 0;
    else return -1;
    if (typeof e == "string" && (e = f2.from(e, n)), f2.isBuffer(e)) return e.length === 0 ? -1 : Fn(r2, e, t2, n, i);
    if (typeof e == "number") return e = e & 255, typeof Uint8Array.prototype.indexOf == "function" ? i ? Uint8Array.prototype.indexOf.call(r2, e, t2) : Uint8Array.prototype.lastIndexOf.call(r2, e, t2) : Fn(
      r2,
      [e],
      t2,
      n,
      i
    );
    throw new TypeError("val must be string, number or Buffer");
  }
  a(Nn, "bidirectionalIndexOf");
  function Fn(r2, e, t2, n, i) {
    let s = 1, o2 = r2.length, u2 = e.length;
    if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
      if (r2.length < 2 || e.length < 2) return -1;
      s = 2, o2 /= 2, u2 /= 2, t2 /= 2;
    }
    function c(l, d) {
      return s === 1 ? l[d] : l.readUInt16BE(d * s);
    }
    a(c, "read");
    let h2;
    if (i) {
      let l = -1;
      for (h2 = t2; h2 < o2; h2++) if (c(r2, h2) === c(e, l === -1 ? 0 : h2 - l)) {
        if (l === -1 && (l = h2), h2 - l + 1 === u2) return l * s;
      } else l !== -1 && (h2 -= h2 - l), l = -1;
    } else for (t2 + u2 > o2 && (t2 = o2 - u2), h2 = t2; h2 >= 0; h2--) {
      let l = true;
      for (let d = 0; d < u2; d++)
        if (c(r2, h2 + d) !== c(e, d)) {
          l = false;
          break;
        }
      if (l) return h2;
    }
    return -1;
  }
  a(Fn, "arrayIndexOf");
  f2.prototype.includes = a(function(e, t2, n) {
    return this.indexOf(e, t2, n) !== -1;
  }, "includes");
  f2.prototype.indexOf = a(function(e, t2, n) {
    return Nn(this, e, t2, n, true);
  }, "indexOf");
  f2.prototype.lastIndexOf = a(function(e, t2, n) {
    return Nn(this, e, t2, n, false);
  }, "lastIndexOf");
  function Ao(r2, e, t2, n) {
    t2 = Number(t2) || 0;
    let i = r2.length - t2;
    n ? (n = Number(n), n > i && (n = i)) : n = i;
    let s = e.length;
    n > s / 2 && (n = s / 2);
    let o2;
    for (o2 = 0; o2 < n; ++o2) {
      let u2 = parseInt(e.substr(o2 * 2, 2), 16);
      if (Qt(u2))
        return o2;
      r2[t2 + o2] = u2;
    }
    return o2;
  }
  a(Ao, "hexWrite");
  function Co(r2, e, t2, n) {
    return at(Ut(
      e,
      r2.length - t2
    ), r2, t2, n);
  }
  a(Co, "utf8Write");
  function To(r2, e, t2, n) {
    return at(No(e), r2, t2, n);
  }
  a(To, "asciiWrite");
  function Io(r2, e, t2, n) {
    return at(Vn(e), r2, t2, n);
  }
  a(Io, "base64Write");
  function Po(r2, e, t2, n) {
    return at(qo(e, r2.length - t2), r2, t2, n);
  }
  a(Po, "ucs2Write");
  f2.prototype.write = a(function(e, t2, n, i) {
    if (t2 === void 0) i = "utf8", n = this.length, t2 = 0;
    else if (n === void 0 && typeof t2 == "string") i = t2, n = this.length, t2 = 0;
    else if (isFinite(t2)) t2 = t2 >>> 0, isFinite(n) ? (n = n >>> 0, i === void 0 && (i = "utf8")) : (i = n, n = void 0);
    else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    let s = this.length - t2;
    if ((n === void 0 || n > s) && (n = s), e.length > 0 && (n < 0 || t2 < 0) || t2 > this.length) throw new RangeError(
      "Attempt to write outside buffer bounds"
    );
    i || (i = "utf8");
    let o2 = false;
    for (; ; ) switch (i) {
      case "hex":
        return Ao(this, e, t2, n);
      case "utf8":
      case "utf-8":
        return Co(this, e, t2, n);
      case "ascii":
      case "latin1":
      case "binary":
        return To(this, e, t2, n);
      case "base64":
        return Io(
          this,
          e,
          t2,
          n
        );
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return Po(this, e, t2, n);
      default:
        if (o2) throw new TypeError("Unknown encoding: " + i);
        i = ("" + i).toLowerCase(), o2 = true;
    }
  }, "write");
  f2.prototype.toJSON = a(function() {
    return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
  }, "toJSON");
  function Bo(r2, e, t2) {
    return e === 0 && t2 === r2.length ? Mt.fromByteArray(r2) : Mt.fromByteArray(r2.slice(e, t2));
  }
  a(Bo, "base64Slice");
  function qn(r2, e, t2) {
    t2 = Math.min(r2.length, t2);
    let n = [], i = e;
    for (; i < t2; ) {
      let s = r2[i], o2 = null, u2 = s > 239 ? 4 : s > 223 ? 3 : s > 191 ? 2 : 1;
      if (i + u2 <= t2) {
        let c, h2, l, d;
        switch (u2) {
          case 1:
            s < 128 && (o2 = s);
            break;
          case 2:
            c = r2[i + 1], (c & 192) === 128 && (d = (s & 31) << 6 | c & 63, d > 127 && (o2 = d));
            break;
          case 3:
            c = r2[i + 1], h2 = r2[i + 2], (c & 192) === 128 && (h2 & 192) === 128 && (d = (s & 15) << 12 | (c & 63) << 6 | h2 & 63, d > 2047 && (d < 55296 || d > 57343) && (o2 = d));
            break;
          case 4:
            c = r2[i + 1], h2 = r2[i + 2], l = r2[i + 3], (c & 192) === 128 && (h2 & 192) === 128 && (l & 192) === 128 && (d = (s & 15) << 18 | (c & 63) << 12 | (h2 & 63) << 6 | l & 63, d > 65535 && d < 1114112 && (o2 = d));
        }
      }
      o2 === null ? (o2 = 65533, u2 = 1) : o2 > 65535 && (o2 -= 65536, n.push(o2 >>> 10 & 1023 | 55296), o2 = 56320 | o2 & 1023), n.push(o2), i += u2;
    }
    return Lo(n);
  }
  a(qn, "utf8Slice");
  var Mn = 4096;
  function Lo(r2) {
    let e = r2.length;
    if (e <= Mn) return String.fromCharCode.apply(String, r2);
    let t2 = "", n = 0;
    for (; n < e; ) t2 += String.fromCharCode.apply(String, r2.slice(n, n += Mn));
    return t2;
  }
  a(Lo, "decodeCodePointsArray");
  function Ro(r2, e, t2) {
    let n = "";
    t2 = Math.min(r2.length, t2);
    for (let i = e; i < t2; ++i) n += String.fromCharCode(r2[i] & 127);
    return n;
  }
  a(Ro, "asciiSlice");
  function Fo(r2, e, t2) {
    let n = "";
    t2 = Math.min(r2.length, t2);
    for (let i = e; i < t2; ++i) n += String.fromCharCode(r2[i]);
    return n;
  }
  a(Fo, "latin1Slice");
  function Mo(r2, e, t2) {
    let n = r2.length;
    (!e || e < 0) && (e = 0), (!t2 || t2 < 0 || t2 > n) && (t2 = n);
    let i = "";
    for (let s = e; s < t2; ++s) i += Qo[r2[s]];
    return i;
  }
  a(Mo, "hexSlice");
  function Do(r2, e, t2) {
    let n = r2.slice(e, t2), i = "";
    for (let s = 0; s < n.length - 1; s += 2) i += String.fromCharCode(n[s] + n[s + 1] * 256);
    return i;
  }
  a(Do, "utf16leSlice");
  f2.prototype.slice = a(function(e, t2) {
    let n = this.length;
    e = ~~e, t2 = t2 === void 0 ? n : ~~t2, e < 0 ? (e += n, e < 0 && (e = 0)) : e > n && (e = n), t2 < 0 ? (t2 += n, t2 < 0 && (t2 = 0)) : t2 > n && (t2 = n), t2 < e && (t2 = e);
    let i = this.subarray(
      e,
      t2
    );
    return Object.setPrototypeOf(i, f2.prototype), i;
  }, "slice");
  function N(r2, e, t2) {
    if (r2 % 1 !== 0 || r2 < 0) throw new RangeError("offset is not uint");
    if (r2 + e > t2) throw new RangeError(
      "Trying to access beyond buffer length"
    );
  }
  a(N, "checkOffset");
  f2.prototype.readUintLE = f2.prototype.readUIntLE = a(function(e, t2, n) {
    e = e >>> 0, t2 = t2 >>> 0, n || N(e, t2, this.length);
    let i = this[e], s = 1, o2 = 0;
    for (; ++o2 < t2 && (s *= 256); ) i += this[e + o2] * s;
    return i;
  }, "readUIntLE");
  f2.prototype.readUintBE = f2.prototype.readUIntBE = a(function(e, t2, n) {
    e = e >>> 0, t2 = t2 >>> 0, n || N(e, t2, this.length);
    let i = this[e + --t2], s = 1;
    for (; t2 > 0 && (s *= 256); ) i += this[e + --t2] * s;
    return i;
  }, "readUIntBE");
  f2.prototype.readUint8 = f2.prototype.readUInt8 = a(function(e, t2) {
    return e = e >>> 0, t2 || N(e, 1, this.length), this[e];
  }, "readUInt8");
  f2.prototype.readUint16LE = f2.prototype.readUInt16LE = a(function(e, t2) {
    return e = e >>> 0, t2 || N(e, 2, this.length), this[e] | this[e + 1] << 8;
  }, "readUInt16LE");
  f2.prototype.readUint16BE = f2.prototype.readUInt16BE = a(function(e, t2) {
    return e = e >>> 0, t2 || N(e, 2, this.length), this[e] << 8 | this[e + 1];
  }, "readUInt16BE");
  f2.prototype.readUint32LE = f2.prototype.readUInt32LE = a(function(e, t2) {
    return e = e >>> 0, t2 || N(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + this[e + 3] * 16777216;
  }, "readUInt32LE");
  f2.prototype.readUint32BE = f2.prototype.readUInt32BE = a(function(e, t2) {
    return e = e >>> 0, t2 || N(e, 4, this.length), this[e] * 16777216 + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
  }, "readUInt32BE");
  f2.prototype.readBigUInt64LE = me(a(function(e) {
    e = e >>> 0, Be(e, "offset");
    let t2 = this[e], n = this[e + 7];
    (t2 === void 0 || n === void 0) && We(e, this.length - 8);
    let i = t2 + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24, s = this[++e] + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + n * 2 ** 24;
    return BigInt(i) + (BigInt(s) << BigInt(32));
  }, "readBigUInt64LE"));
  f2.prototype.readBigUInt64BE = me(a(function(e) {
    e = e >>> 0, Be(e, "offset");
    let t2 = this[e], n = this[e + 7];
    (t2 === void 0 || n === void 0) && We(e, this.length - 8);
    let i = t2 * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e], s = this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n;
    return (BigInt(
      i
    ) << BigInt(32)) + BigInt(s);
  }, "readBigUInt64BE"));
  f2.prototype.readIntLE = a(function(e, t2, n) {
    e = e >>> 0, t2 = t2 >>> 0, n || N(e, t2, this.length);
    let i = this[e], s = 1, o2 = 0;
    for (; ++o2 < t2 && (s *= 256); )
      i += this[e + o2] * s;
    return s *= 128, i >= s && (i -= Math.pow(2, 8 * t2)), i;
  }, "readIntLE");
  f2.prototype.readIntBE = a(function(e, t2, n) {
    e = e >>> 0, t2 = t2 >>> 0, n || N(e, t2, this.length);
    let i = t2, s = 1, o2 = this[e + --i];
    for (; i > 0 && (s *= 256); ) o2 += this[e + --i] * s;
    return s *= 128, o2 >= s && (o2 -= Math.pow(2, 8 * t2)), o2;
  }, "readIntBE");
  f2.prototype.readInt8 = a(function(e, t2) {
    return e = e >>> 0, t2 || N(e, 1, this.length), this[e] & 128 ? (255 - this[e] + 1) * -1 : this[e];
  }, "readInt8");
  f2.prototype.readInt16LE = a(function(e, t2) {
    e = e >>> 0, t2 || N(e, 2, this.length);
    let n = this[e] | this[e + 1] << 8;
    return n & 32768 ? n | 4294901760 : n;
  }, "readInt16LE");
  f2.prototype.readInt16BE = a(
    function(e, t2) {
      e = e >>> 0, t2 || N(e, 2, this.length);
      let n = this[e + 1] | this[e] << 8;
      return n & 32768 ? n | 4294901760 : n;
    },
    "readInt16BE"
  );
  f2.prototype.readInt32LE = a(function(e, t2) {
    return e = e >>> 0, t2 || N(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
  }, "readInt32LE");
  f2.prototype.readInt32BE = a(function(e, t2) {
    return e = e >>> 0, t2 || N(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
  }, "readInt32BE");
  f2.prototype.readBigInt64LE = me(a(function(e) {
    e = e >>> 0, Be(e, "offset");
    let t2 = this[e], n = this[e + 7];
    (t2 === void 0 || n === void 0) && We(
      e,
      this.length - 8
    );
    let i = this[e + 4] + this[e + 5] * 2 ** 8 + this[e + 6] * 2 ** 16 + (n << 24);
    return (BigInt(
      i
    ) << BigInt(32)) + BigInt(t2 + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24);
  }, "readBigInt64LE"));
  f2.prototype.readBigInt64BE = me(a(function(e) {
    e = e >>> 0, Be(e, "offset");
    let t2 = this[e], n = this[e + 7];
    (t2 === void 0 || n === void 0) && We(e, this.length - 8);
    let i = (t2 << 24) + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e];
    return (BigInt(i) << BigInt(32)) + BigInt(
      this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n
    );
  }, "readBigInt64BE"));
  f2.prototype.readFloatLE = a(function(e, t2) {
    return e = e >>> 0, t2 || N(e, 4, this.length), Pe.read(
      this,
      e,
      true,
      23,
      4
    );
  }, "readFloatLE");
  f2.prototype.readFloatBE = a(function(e, t2) {
    return e = e >>> 0, t2 || N(e, 4, this.length), Pe.read(this, e, false, 23, 4);
  }, "readFloatBE");
  f2.prototype.readDoubleLE = a(function(e, t2) {
    return e = e >>> 0, t2 || N(e, 8, this.length), Pe.read(this, e, true, 52, 8);
  }, "readDoubleLE");
  f2.prototype.readDoubleBE = a(function(e, t2) {
    return e = e >>> 0, t2 || N(e, 8, this.length), Pe.read(this, e, false, 52, 8);
  }, "readDoubleBE");
  function Y(r2, e, t2, n, i, s) {
    if (!f2.isBuffer(
      r2
    )) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (e > i || e < s) throw new RangeError('"value" argument is out of bounds');
    if (t2 + n > r2.length) throw new RangeError(
      "Index out of range"
    );
  }
  a(Y, "checkInt");
  f2.prototype.writeUintLE = f2.prototype.writeUIntLE = a(function(e, t2, n, i) {
    if (e = +e, t2 = t2 >>> 0, n = n >>> 0, !i) {
      let u2 = Math.pow(2, 8 * n) - 1;
      Y(
        this,
        e,
        t2,
        n,
        u2,
        0
      );
    }
    let s = 1, o2 = 0;
    for (this[t2] = e & 255; ++o2 < n && (s *= 256); ) this[t2 + o2] = e / s & 255;
    return t2 + n;
  }, "writeUIntLE");
  f2.prototype.writeUintBE = f2.prototype.writeUIntBE = a(function(e, t2, n, i) {
    if (e = +e, t2 = t2 >>> 0, n = n >>> 0, !i) {
      let u2 = Math.pow(2, 8 * n) - 1;
      Y(this, e, t2, n, u2, 0);
    }
    let s = n - 1, o2 = 1;
    for (this[t2 + s] = e & 255; --s >= 0 && (o2 *= 256); ) this[t2 + s] = e / o2 & 255;
    return t2 + n;
  }, "writeUIntBE");
  f2.prototype.writeUint8 = f2.prototype.writeUInt8 = a(function(e, t2, n) {
    return e = +e, t2 = t2 >>> 0, n || Y(this, e, t2, 1, 255, 0), this[t2] = e & 255, t2 + 1;
  }, "writeUInt8");
  f2.prototype.writeUint16LE = f2.prototype.writeUInt16LE = a(function(e, t2, n) {
    return e = +e, t2 = t2 >>> 0, n || Y(
      this,
      e,
      t2,
      2,
      65535,
      0
    ), this[t2] = e & 255, this[t2 + 1] = e >>> 8, t2 + 2;
  }, "writeUInt16LE");
  f2.prototype.writeUint16BE = f2.prototype.writeUInt16BE = a(function(e, t2, n) {
    return e = +e, t2 = t2 >>> 0, n || Y(
      this,
      e,
      t2,
      2,
      65535,
      0
    ), this[t2] = e >>> 8, this[t2 + 1] = e & 255, t2 + 2;
  }, "writeUInt16BE");
  f2.prototype.writeUint32LE = f2.prototype.writeUInt32LE = a(function(e, t2, n) {
    return e = +e, t2 = t2 >>> 0, n || Y(
      this,
      e,
      t2,
      4,
      4294967295,
      0
    ), this[t2 + 3] = e >>> 24, this[t2 + 2] = e >>> 16, this[t2 + 1] = e >>> 8, this[t2] = e & 255, t2 + 4;
  }, "writeUInt32LE");
  f2.prototype.writeUint32BE = f2.prototype.writeUInt32BE = a(function(e, t2, n) {
    return e = +e, t2 = t2 >>> 0, n || Y(this, e, t2, 4, 4294967295, 0), this[t2] = e >>> 24, this[t2 + 1] = e >>> 16, this[t2 + 2] = e >>> 8, this[t2 + 3] = e & 255, t2 + 4;
  }, "writeUInt32BE");
  function Qn(r2, e, t2, n, i) {
    $n(
      e,
      n,
      i,
      r2,
      t2,
      7
    );
    let s = Number(e & BigInt(4294967295));
    r2[t2++] = s, s = s >> 8, r2[t2++] = s, s = s >> 8, r2[t2++] = s, s = s >> 8, r2[t2++] = s;
    let o2 = Number(e >> BigInt(32) & BigInt(4294967295));
    return r2[t2++] = o2, o2 = o2 >> 8, r2[t2++] = o2, o2 = o2 >> 8, r2[t2++] = o2, o2 = o2 >> 8, r2[t2++] = o2, t2;
  }
  a(Qn, "wrtBigUInt64LE");
  function jn(r2, e, t2, n, i) {
    $n(e, n, i, r2, t2, 7);
    let s = Number(e & BigInt(4294967295));
    r2[t2 + 7] = s, s = s >> 8, r2[t2 + 6] = s, s = s >> 8, r2[t2 + 5] = s, s = s >> 8, r2[t2 + 4] = s;
    let o2 = Number(e >> BigInt(32) & BigInt(4294967295));
    return r2[t2 + 3] = o2, o2 = o2 >> 8, r2[t2 + 2] = o2, o2 = o2 >> 8, r2[t2 + 1] = o2, o2 = o2 >> 8, r2[t2] = o2, t2 + 8;
  }
  a(jn, "wrtBigUInt64BE");
  f2.prototype.writeBigUInt64LE = me(a(function(e, t2 = 0) {
    return Qn(this, e, t2, BigInt(0), BigInt(
      "0xffffffffffffffff"
    ));
  }, "writeBigUInt64LE"));
  f2.prototype.writeBigUInt64BE = me(a(function(e, t2 = 0) {
    return jn(this, e, t2, BigInt(0), BigInt("0xffffffffffffffff"));
  }, "writeBigUInt64BE"));
  f2.prototype.writeIntLE = a(function(e, t2, n, i) {
    if (e = +e, t2 = t2 >>> 0, !i) {
      let c = Math.pow(
        2,
        8 * n - 1
      );
      Y(this, e, t2, n, c - 1, -c);
    }
    let s = 0, o2 = 1, u2 = 0;
    for (this[t2] = e & 255; ++s < n && (o2 *= 256); ) e < 0 && u2 === 0 && this[t2 + s - 1] !== 0 && (u2 = 1), this[t2 + s] = (e / o2 >> 0) - u2 & 255;
    return t2 + n;
  }, "writeIntLE");
  f2.prototype.writeIntBE = a(function(e, t2, n, i) {
    if (e = +e, t2 = t2 >>> 0, !i) {
      let c = Math.pow(
        2,
        8 * n - 1
      );
      Y(this, e, t2, n, c - 1, -c);
    }
    let s = n - 1, o2 = 1, u2 = 0;
    for (this[t2 + s] = e & 255; --s >= 0 && (o2 *= 256); ) e < 0 && u2 === 0 && this[t2 + s + 1] !== 0 && (u2 = 1), this[t2 + s] = (e / o2 >> 0) - u2 & 255;
    return t2 + n;
  }, "writeIntBE");
  f2.prototype.writeInt8 = a(function(e, t2, n) {
    return e = +e, t2 = t2 >>> 0, n || Y(
      this,
      e,
      t2,
      1,
      127,
      -128
    ), e < 0 && (e = 255 + e + 1), this[t2] = e & 255, t2 + 1;
  }, "writeInt8");
  f2.prototype.writeInt16LE = a(function(e, t2, n) {
    return e = +e, t2 = t2 >>> 0, n || Y(this, e, t2, 2, 32767, -32768), this[t2] = e & 255, this[t2 + 1] = e >>> 8, t2 + 2;
  }, "writeInt16LE");
  f2.prototype.writeInt16BE = a(function(e, t2, n) {
    return e = +e, t2 = t2 >>> 0, n || Y(this, e, t2, 2, 32767, -32768), this[t2] = e >>> 8, this[t2 + 1] = e & 255, t2 + 2;
  }, "writeInt16BE");
  f2.prototype.writeInt32LE = a(function(e, t2, n) {
    return e = +e, t2 = t2 >>> 0, n || Y(this, e, t2, 4, 2147483647, -2147483648), this[t2] = e & 255, this[t2 + 1] = e >>> 8, this[t2 + 2] = e >>> 16, this[t2 + 3] = e >>> 24, t2 + 4;
  }, "writeInt32LE");
  f2.prototype.writeInt32BE = a(function(e, t2, n) {
    return e = +e, t2 = t2 >>> 0, n || Y(this, e, t2, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), this[t2] = e >>> 24, this[t2 + 1] = e >>> 16, this[t2 + 2] = e >>> 8, this[t2 + 3] = e & 255, t2 + 4;
  }, "writeInt32BE");
  f2.prototype.writeBigInt64LE = me(a(function(e, t2 = 0) {
    return Qn(this, e, t2, -BigInt(
      "0x8000000000000000"
    ), BigInt("0x7fffffffffffffff"));
  }, "writeBigInt64LE"));
  f2.prototype.writeBigInt64BE = me(a(function(e, t2 = 0) {
    return jn(this, e, t2, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }, "writeBigInt64BE"));
  function Wn(r2, e, t2, n, i, s) {
    if (t2 + n > r2.length) throw new RangeError("Index out of range");
    if (t2 < 0) throw new RangeError(
      "Index out of range"
    );
  }
  a(Wn, "checkIEEE754");
  function Hn(r2, e, t2, n, i) {
    return e = +e, t2 = t2 >>> 0, i || Wn(r2, e, t2, 4, 34028234663852886e22, -34028234663852886e22), Pe.write(
      r2,
      e,
      t2,
      n,
      23,
      4
    ), t2 + 4;
  }
  a(Hn, "writeFloat");
  f2.prototype.writeFloatLE = a(function(e, t2, n) {
    return Hn(
      this,
      e,
      t2,
      true,
      n
    );
  }, "writeFloatLE");
  f2.prototype.writeFloatBE = a(function(e, t2, n) {
    return Hn(
      this,
      e,
      t2,
      false,
      n
    );
  }, "writeFloatBE");
  function Gn(r2, e, t2, n, i) {
    return e = +e, t2 = t2 >>> 0, i || Wn(
      r2,
      e,
      t2,
      8,
      17976931348623157e292,
      -17976931348623157e292
    ), Pe.write(r2, e, t2, n, 52, 8), t2 + 8;
  }
  a(Gn, "writeDouble");
  f2.prototype.writeDoubleLE = a(function(e, t2, n) {
    return Gn(
      this,
      e,
      t2,
      true,
      n
    );
  }, "writeDoubleLE");
  f2.prototype.writeDoubleBE = a(function(e, t2, n) {
    return Gn(
      this,
      e,
      t2,
      false,
      n
    );
  }, "writeDoubleBE");
  f2.prototype.copy = a(function(e, t2, n, i) {
    if (!f2.isBuffer(
      e
    )) throw new TypeError("argument should be a Buffer");
    if (n || (n = 0), !i && i !== 0 && (i = this.length), t2 >= e.length && (t2 = e.length), t2 || (t2 = 0), i > 0 && i < n && (i = n), i === n || e.length === 0 || this.length === 0) return 0;
    if (t2 < 0) throw new RangeError("targetStart out of bounds");
    if (n < 0 || n >= this.length) throw new RangeError("Index out of range");
    if (i < 0) throw new RangeError(
      "sourceEnd out of bounds"
    );
    i > this.length && (i = this.length), e.length - t2 < i - n && (i = e.length - t2 + n);
    let s = i - n;
    return this === e && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(t2, n, i) : Uint8Array.prototype.set.call(e, this.subarray(n, i), t2), s;
  }, "copy");
  f2.prototype.fill = a(function(e, t2, n, i) {
    if (typeof e == "string") {
      if (typeof t2 == "string" ? (i = t2, t2 = 0, n = this.length) : typeof n == "string" && (i = n, n = this.length), i !== void 0 && typeof i != "string") throw new TypeError("encoding must be a string");
      if (typeof i == "string" && !f2.isEncoding(i)) throw new TypeError("Unknown encoding: " + i);
      if (e.length === 1) {
        let o2 = e.charCodeAt(0);
        (i === "utf8" && o2 < 128 || i === "latin1") && (e = o2);
      }
    } else typeof e == "number" ? e = e & 255 : typeof e == "boolean" && (e = Number(e));
    if (t2 < 0 || this.length < t2 || this.length < n) throw new RangeError("Out of range index");
    if (n <= t2) return this;
    t2 = t2 >>> 0, n = n === void 0 ? this.length : n >>> 0, e || (e = 0);
    let s;
    if (typeof e == "number") for (s = t2; s < n; ++s)
      this[s] = e;
    else {
      let o2 = f2.isBuffer(e) ? e : f2.from(e, i), u2 = o2.length;
      if (u2 === 0) throw new TypeError(
        'The value "' + e + '" is invalid for argument "value"'
      );
      for (s = 0; s < n - t2; ++s) this[s + t2] = o2[s % u2];
    }
    return this;
  }, "fill");
  var Ie = {};
  function qt(r2, e, t2) {
    var n;
    Ie[r2] = (n = class extends t2 {
      constructor() {
        super(), Object.defineProperty(this, "message", {
          value: e.apply(this, arguments),
          writable: true,
          configurable: true
        }), this.name = `${this.name} [${r2}]`, this.stack, delete this.name;
      }
      get code() {
        return r2;
      }
      set code(s) {
        Object.defineProperty(this, "code", {
          configurable: true,
          enumerable: true,
          value: s,
          writable: true
        });
      }
      toString() {
        return `${this.name} [${r2}]: ${this.message}`;
      }
    }, a(n, "NodeError"), n);
  }
  a(qt, "E");
  qt("ERR_BUFFER_OUT_OF_BOUNDS", function(r2) {
    return r2 ? `${r2} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
  }, RangeError);
  qt("ERR_INVALID_ARG_TYPE", function(r2, e) {
    return `The "${r2}" argument must be of type number. Received type ${typeof e}`;
  }, TypeError);
  qt("ERR_OUT_OF_RANGE", function(r2, e, t2) {
    let n = `The value of "${r2}" is out of range.`, i = t2;
    return Number.isInteger(t2) && Math.abs(t2) > 2 ** 32 ? i = Dn(String(t2)) : typeof t2 == "bigint" && (i = String(t2), (t2 > BigInt(2) ** BigInt(32) || t2 < -(BigInt(2) ** BigInt(32))) && (i = Dn(i)), i += "n"), n += ` It must be ${e}. Received ${i}`, n;
  }, RangeError);
  function Dn(r2) {
    let e = "", t2 = r2.length, n = r2[0] === "-" ? 1 : 0;
    for (; t2 >= n + 4; t2 -= 3) e = `_${r2.slice(t2 - 3, t2)}${e}`;
    return `${r2.slice(
      0,
      t2
    )}${e}`;
  }
  a(Dn, "addNumericalSeparator");
  function ko(r2, e, t2) {
    Be(e, "offset"), (r2[e] === void 0 || r2[e + t2] === void 0) && We(e, r2.length - (t2 + 1));
  }
  a(ko, "checkBounds");
  function $n(r2, e, t2, n, i, s) {
    if (r2 > t2 || r2 < e) {
      let o2 = typeof e == "bigint" ? "n" : "", u2;
      throw s > 3 ? e === 0 || e === BigInt(0) ? u2 = `>= 0${o2} and < 2${o2} ** ${(s + 1) * 8}${o2}` : u2 = `>= -(2${o2} ** ${(s + 1) * 8 - 1}${o2}) and < 2 ** ${(s + 1) * 8 - 1}${o2}` : u2 = `>= ${e}${o2} and <= ${t2}${o2}`, new Ie.ERR_OUT_OF_RANGE(
        "value",
        u2,
        r2
      );
    }
    ko(n, i, s);
  }
  a($n, "checkIntBI");
  function Be(r2, e) {
    if (typeof r2 != "number")
      throw new Ie.ERR_INVALID_ARG_TYPE(e, "number", r2);
  }
  a(Be, "validateNumber");
  function We(r2, e, t2) {
    throw Math.floor(r2) !== r2 ? (Be(r2, t2), new Ie.ERR_OUT_OF_RANGE(
      t2 || "offset",
      "an integer",
      r2
    )) : e < 0 ? new Ie.ERR_BUFFER_OUT_OF_BOUNDS() : new Ie.ERR_OUT_OF_RANGE(t2 || "offset", `>= ${t2 ? 1 : 0} and <= ${e}`, r2);
  }
  a(We, "boundsError");
  var Uo = /[^+/0-9A-Za-z-_]/g;
  function Oo(r2) {
    if (r2 = r2.split("=")[0], r2 = r2.trim().replace(Uo, ""), r2.length < 2) return "";
    for (; r2.length % 4 !== 0; ) r2 = r2 + "=";
    return r2;
  }
  a(Oo, "base64clean");
  function Ut(r2, e) {
    e = e || 1 / 0;
    let t2, n = r2.length, i = null, s = [];
    for (let o2 = 0; o2 < n; ++o2) {
      if (t2 = r2.charCodeAt(o2), t2 > 55295 && t2 < 57344) {
        if (!i) {
          if (t2 > 56319) {
            (e -= 3) > -1 && s.push(239, 191, 189);
            continue;
          } else if (o2 + 1 === n) {
            (e -= 3) > -1 && s.push(239, 191, 189);
            continue;
          }
          i = t2;
          continue;
        }
        if (t2 < 56320) {
          (e -= 3) > -1 && s.push(
            239,
            191,
            189
          ), i = t2;
          continue;
        }
        t2 = (i - 55296 << 10 | t2 - 56320) + 65536;
      } else i && (e -= 3) > -1 && s.push(
        239,
        191,
        189
      );
      if (i = null, t2 < 128) {
        if ((e -= 1) < 0) break;
        s.push(t2);
      } else if (t2 < 2048) {
        if ((e -= 2) < 0) break;
        s.push(t2 >> 6 | 192, t2 & 63 | 128);
      } else if (t2 < 65536) {
        if ((e -= 3) < 0) break;
        s.push(t2 >> 12 | 224, t2 >> 6 & 63 | 128, t2 & 63 | 128);
      } else if (t2 < 1114112) {
        if ((e -= 4) < 0) break;
        s.push(t2 >> 18 | 240, t2 >> 12 & 63 | 128, t2 >> 6 & 63 | 128, t2 & 63 | 128);
      } else throw new Error("Invalid code point");
    }
    return s;
  }
  a(
    Ut,
    "utf8ToBytes"
  );
  function No(r2) {
    let e = [];
    for (let t2 = 0; t2 < r2.length; ++t2) e.push(r2.charCodeAt(
      t2
    ) & 255);
    return e;
  }
  a(No, "asciiToBytes");
  function qo(r2, e) {
    let t2, n, i, s = [];
    for (let o2 = 0; o2 < r2.length && !((e -= 2) < 0); ++o2) t2 = r2.charCodeAt(o2), n = t2 >> 8, i = t2 % 256, s.push(i), s.push(n);
    return s;
  }
  a(qo, "utf16leToBytes");
  function Vn(r2) {
    return Mt.toByteArray(Oo(r2));
  }
  a(Vn, "base64ToBytes");
  function at(r2, e, t2, n) {
    let i;
    for (i = 0; i < n && !(i + t2 >= e.length || i >= r2.length); ++i)
      e[i + t2] = r2[i];
    return i;
  }
  a(at, "blitBuffer");
  function ue(r2, e) {
    return r2 instanceof e || r2 != null && r2.constructor != null && r2.constructor.name != null && r2.constructor.name === e.name;
  }
  a(ue, "isInstance");
  function Qt(r2) {
    return r2 !== r2;
  }
  a(Qt, "numberIsNaN");
  var Qo = (function() {
    let r2 = "0123456789abcdef", e = new Array(256);
    for (let t2 = 0; t2 < 16; ++t2) {
      let n = t2 * 16;
      for (let i = 0; i < 16; ++i) e[n + i] = r2[t2] + r2[i];
    }
    return e;
  })();
  function me(r2) {
    return typeof BigInt > "u" ? jo : r2;
  }
  a(me, "defineBigIntMethod");
  function jo() {
    throw new Error("BigInt not supported");
  }
  a(jo, "BufferBigIntNotDefined");
});
var S;
var x;
var E;
var w;
var y;
var m;
var p2 = z(() => {
  "use strict";
  S = globalThis, x = globalThis.setImmediate ?? ((r2) => setTimeout(
    r2,
    0
  )), E = globalThis.clearImmediate ?? ((r2) => clearTimeout(r2)), w = globalThis.crypto ?? {};
  w.subtle ?? (w.subtle = {});
  y = typeof globalThis.Buffer == "function" && typeof globalThis.Buffer.allocUnsafe == "function" ? globalThis.Buffer : Kn().Buffer, m = globalThis.process ?? {};
  m.env ?? (m.env = {});
  try {
    m.nextTick(() => {
    });
  } catch {
    let e = Promise.resolve();
    m.nextTick = e.then.bind(e);
  }
});
var ge = I((nh, jt) => {
  "use strict";
  p2();
  var Re = typeof Reflect == "object" ? Reflect : null, zn = Re && typeof Re.apply == "function" ? Re.apply : a(function(e, t2, n) {
    return Function.prototype.apply.call(e, t2, n);
  }, "ReflectApply"), ut;
  Re && typeof Re.ownKeys == "function" ? ut = Re.ownKeys : Object.getOwnPropertySymbols ? ut = a(function(e) {
    return Object.getOwnPropertyNames(
      e
    ).concat(Object.getOwnPropertySymbols(e));
  }, "ReflectOwnKeys") : ut = a(function(e) {
    return Object.getOwnPropertyNames(e);
  }, "ReflectOwnKeys");
  function Wo(r2) {
    console && console.warn && console.warn(r2);
  }
  a(Wo, "ProcessEmitWarning");
  var Zn = Number.isNaN || a(function(e) {
    return e !== e;
  }, "NumberIsNaN");
  function L() {
    L.init.call(this);
  }
  a(L, "EventEmitter");
  jt.exports = L;
  jt.exports.once = Vo;
  L.EventEmitter = L;
  L.prototype._events = void 0;
  L.prototype._eventsCount = 0;
  L.prototype._maxListeners = void 0;
  var Yn = 10;
  function ct(r2) {
    if (typeof r2 != "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof r2);
  }
  a(ct, "checkListener");
  Object.defineProperty(L, "defaultMaxListeners", { enumerable: true, get: a(function() {
    return Yn;
  }, "get"), set: a(function(r2) {
    if (typeof r2 != "number" || r2 < 0 || Zn(r2)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + r2 + ".");
    Yn = r2;
  }, "set") });
  L.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  };
  L.prototype.setMaxListeners = a(
    function(e) {
      if (typeof e != "number" || e < 0 || Zn(e)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
      return this._maxListeners = e, this;
    },
    "setMaxListeners"
  );
  function Jn(r2) {
    return r2._maxListeners === void 0 ? L.defaultMaxListeners : r2._maxListeners;
  }
  a(Jn, "_getMaxListeners");
  L.prototype.getMaxListeners = a(function() {
    return Jn(this);
  }, "getMaxListeners");
  L.prototype.emit = a(function(e) {
    for (var t2 = [], n = 1; n < arguments.length; n++) t2.push(arguments[n]);
    var i = e === "error", s = this._events;
    if (s !== void 0) i = i && s.error === void 0;
    else if (!i) return false;
    if (i) {
      var o2;
      if (t2.length > 0 && (o2 = t2[0]), o2 instanceof Error) throw o2;
      var u2 = new Error("Unhandled error." + (o2 ? " (" + o2.message + ")" : ""));
      throw u2.context = o2, u2;
    }
    var c = s[e];
    if (c === void 0) return false;
    if (typeof c == "function") zn(c, this, t2);
    else for (var h2 = c.length, l = ni(c, h2), n = 0; n < h2; ++n) zn(
      l[n],
      this,
      t2
    );
    return true;
  }, "emit");
  function Xn(r2, e, t2, n) {
    var i, s, o2;
    if (ct(t2), s = r2._events, s === void 0 ? (s = r2._events = /* @__PURE__ */ Object.create(null), r2._eventsCount = 0) : (s.newListener !== void 0 && (r2.emit(
      "newListener",
      e,
      t2.listener ? t2.listener : t2
    ), s = r2._events), o2 = s[e]), o2 === void 0) o2 = s[e] = t2, ++r2._eventsCount;
    else if (typeof o2 == "function" ? o2 = s[e] = n ? [t2, o2] : [o2, t2] : n ? o2.unshift(
      t2
    ) : o2.push(t2), i = Jn(r2), i > 0 && o2.length > i && !o2.warned) {
      o2.warned = true;
      var u2 = new Error("Possible EventEmitter memory leak detected. " + o2.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      u2.name = "MaxListenersExceededWarning", u2.emitter = r2, u2.type = e, u2.count = o2.length, Wo(u2);
    }
    return r2;
  }
  a(Xn, "_addListener");
  L.prototype.addListener = a(function(e, t2) {
    return Xn(this, e, t2, false);
  }, "addListener");
  L.prototype.on = L.prototype.addListener;
  L.prototype.prependListener = a(function(e, t2) {
    return Xn(this, e, t2, true);
  }, "prependListener");
  function Ho() {
    if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = true, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  a(
    Ho,
    "onceWrapper"
  );
  function ei(r2, e, t2) {
    var n = {
      fired: false,
      wrapFn: void 0,
      target: r2,
      type: e,
      listener: t2
    }, i = Ho.bind(n);
    return i.listener = t2, n.wrapFn = i, i;
  }
  a(ei, "_onceWrap");
  L.prototype.once = a(function(e, t2) {
    return ct(t2), this.on(e, ei(this, e, t2)), this;
  }, "once");
  L.prototype.prependOnceListener = a(function(e, t2) {
    return ct(t2), this.prependListener(e, ei(
      this,
      e,
      t2
    )), this;
  }, "prependOnceListener");
  L.prototype.removeListener = a(
    function(e, t2) {
      var n, i, s, o2, u2;
      if (ct(t2), i = this._events, i === void 0) return this;
      if (n = i[e], n === void 0) return this;
      if (n === t2 || n.listener === t2) --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete i[e], i.removeListener && this.emit("removeListener", e, n.listener || t2));
      else if (typeof n != "function") {
        for (s = -1, o2 = n.length - 1; o2 >= 0; o2--) if (n[o2] === t2 || n[o2].listener === t2) {
          u2 = n[o2].listener, s = o2;
          break;
        }
        if (s < 0) return this;
        s === 0 ? n.shift() : Go(n, s), n.length === 1 && (i[e] = n[0]), i.removeListener !== void 0 && this.emit("removeListener", e, u2 || t2);
      }
      return this;
    },
    "removeListener"
  );
  L.prototype.off = L.prototype.removeListener;
  L.prototype.removeAllListeners = a(function(e) {
    var t2, n, i;
    if (n = this._events, n === void 0) return this;
    if (n.removeListener === void 0) return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : n[e] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete n[e]), this;
    if (arguments.length === 0) {
      var s = Object.keys(n), o2;
      for (i = 0; i < s.length; ++i) o2 = s[i], o2 !== "removeListener" && this.removeAllListeners(o2);
      return this.removeAllListeners(
        "removeListener"
      ), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (t2 = n[e], typeof t2 == "function") this.removeListener(e, t2);
    else if (t2 !== void 0) for (i = t2.length - 1; i >= 0; i--) this.removeListener(e, t2[i]);
    return this;
  }, "removeAllListeners");
  function ti(r2, e, t2) {
    var n = r2._events;
    if (n === void 0) return [];
    var i = n[e];
    return i === void 0 ? [] : typeof i == "function" ? t2 ? [i.listener || i] : [i] : t2 ? $o(i) : ni(i, i.length);
  }
  a(ti, "_listeners");
  L.prototype.listeners = a(function(e) {
    return ti(this, e, true);
  }, "listeners");
  L.prototype.rawListeners = a(function(e) {
    return ti(this, e, false);
  }, "rawListeners");
  L.listenerCount = function(r2, e) {
    return typeof r2.listenerCount == "function" ? r2.listenerCount(e) : ri.call(r2, e);
  };
  L.prototype.listenerCount = ri;
  function ri(r2) {
    var e = this._events;
    if (e !== void 0) {
      var t2 = e[r2];
      if (typeof t2 == "function") return 1;
      if (t2 !== void 0) return t2.length;
    }
    return 0;
  }
  a(ri, "listenerCount");
  L.prototype.eventNames = a(function() {
    return this._eventsCount > 0 ? ut(this._events) : [];
  }, "eventNames");
  function ni(r2, e) {
    for (var t2 = new Array(e), n = 0; n < e; ++n) t2[n] = r2[n];
    return t2;
  }
  a(ni, "arrayClone");
  function Go(r2, e) {
    for (; e + 1 < r2.length; e++) r2[e] = r2[e + 1];
    r2.pop();
  }
  a(Go, "spliceOne");
  function $o(r2) {
    for (var e = new Array(r2.length), t2 = 0; t2 < e.length; ++t2)
      e[t2] = r2[t2].listener || r2[t2];
    return e;
  }
  a($o, "unwrapListeners");
  function Vo(r2, e) {
    return new Promise(
      function(t2, n) {
        function i(o2) {
          r2.removeListener(e, s), n(o2);
        }
        a(i, "errorListener");
        function s() {
          typeof r2.removeListener == "function" && r2.removeListener("error", i), t2([].slice.call(
            arguments
          ));
        }
        a(s, "resolver"), ii(r2, e, s, { once: true }), e !== "error" && Ko(r2, i, { once: true });
      }
    );
  }
  a(Vo, "once");
  function Ko(r2, e, t2) {
    typeof r2.on == "function" && ii(r2, "error", e, t2);
  }
  a(
    Ko,
    "addErrorHandlerIfEventEmitter"
  );
  function ii(r2, e, t2, n) {
    if (typeof r2.on == "function")
      n.once ? r2.once(e, t2) : r2.on(e, t2);
    else if (typeof r2.addEventListener == "function") r2.addEventListener(
      e,
      a(function i(s) {
        n.once && r2.removeEventListener(e, i), t2(s);
      }, "wrapListener")
    );
    else
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof r2);
  }
  a(ii, "eventTargetAgnosticAddListener");
});
var He = {};
se(He, { default: () => zo });
var zo;
var Ge = z(() => {
  "use strict";
  p2();
  zo = {};
});
function $e(r2) {
  let e = 1779033703, t2 = 3144134277, n = 1013904242, i = 2773480762, s = 1359893119, o2 = 2600822924, u2 = 528734635, c = 1541459225, h2 = 0, l = 0, d = [
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ], b = a(
    (A, g2) => A >>> g2 | A << 32 - g2,
    "rrot"
  ), C = new Uint32Array(64), B = new Uint8Array(64), Q = a(() => {
    for (let R = 0, $ = 0; R < 16; R++, $ += 4) C[R] = B[$] << 24 | B[$ + 1] << 16 | B[$ + 2] << 8 | B[$ + 3];
    for (let R = 16; R < 64; R++) {
      let $ = b(C[R - 15], 7) ^ b(C[R - 15], 18) ^ C[R - 15] >>> 3, ce = b(C[R - 2], 17) ^ b(C[R - 2], 19) ^ C[R - 2] >>> 10;
      C[R] = C[R - 16] + $ + C[R - 7] + ce | 0;
    }
    let A = e, g2 = t2, P = n, K = i, k = s, j = o2, ee = u2, oe = c;
    for (let R = 0; R < 64; R++) {
      let $ = b(
        k,
        6
      ) ^ b(k, 11) ^ b(k, 25), ce = k & j ^ ~k & ee, ye = oe + $ + ce + d[R] + C[R] | 0, Se = b(A, 2) ^ b(A, 13) ^ b(A, 22), je = A & g2 ^ A & P ^ g2 & P, he = Se + je | 0;
      oe = ee, ee = j, j = k, k = K + ye | 0, K = P, P = g2, g2 = A, A = ye + he | 0;
    }
    e = e + A | 0, t2 = t2 + g2 | 0, n = n + P | 0, i = i + K | 0, s = s + k | 0, o2 = o2 + j | 0, u2 = u2 + ee | 0, c = c + oe | 0, l = 0;
  }, "process"), X = a((A) => {
    typeof A == "string" && (A = new TextEncoder().encode(A));
    for (let g2 = 0; g2 < A.length; g2++) B[l++] = A[g2], l === 64 && Q();
    h2 += A.length;
  }, "add"), de = a(() => {
    if (B[l++] = 128, l == 64 && Q(), l + 8 > 64) {
      for (; l < 64; ) B[l++] = 0;
      Q();
    }
    for (; l < 58; ) B[l++] = 0;
    let A = h2 * 8;
    B[l++] = A / 1099511627776 & 255, B[l++] = A / 4294967296 & 255, B[l++] = A >>> 24, B[l++] = A >>> 16 & 255, B[l++] = A >>> 8 & 255, B[l++] = A & 255, Q();
    let g2 = new Uint8Array(32);
    return g2[0] = e >>> 24, g2[1] = e >>> 16 & 255, g2[2] = e >>> 8 & 255, g2[3] = e & 255, g2[4] = t2 >>> 24, g2[5] = t2 >>> 16 & 255, g2[6] = t2 >>> 8 & 255, g2[7] = t2 & 255, g2[8] = n >>> 24, g2[9] = n >>> 16 & 255, g2[10] = n >>> 8 & 255, g2[11] = n & 255, g2[12] = i >>> 24, g2[13] = i >>> 16 & 255, g2[14] = i >>> 8 & 255, g2[15] = i & 255, g2[16] = s >>> 24, g2[17] = s >>> 16 & 255, g2[18] = s >>> 8 & 255, g2[19] = s & 255, g2[20] = o2 >>> 24, g2[21] = o2 >>> 16 & 255, g2[22] = o2 >>> 8 & 255, g2[23] = o2 & 255, g2[24] = u2 >>> 24, g2[25] = u2 >>> 16 & 255, g2[26] = u2 >>> 8 & 255, g2[27] = u2 & 255, g2[28] = c >>> 24, g2[29] = c >>> 16 & 255, g2[30] = c >>> 8 & 255, g2[31] = c & 255, g2;
  }, "digest");
  return r2 === void 0 ? { add: X, digest: de } : (X(r2), de());
}
var si = z(
  () => {
    "use strict";
    p2();
    a($e, "sha256");
  }
);
var U;
var Ve;
var oi = z(() => {
  "use strict";
  p2();
  U = class U2 {
    constructor() {
      _(
        this,
        "_dataLength",
        0
      );
      _(this, "_bufferLength", 0);
      _(this, "_state", new Int32Array(4));
      _(
        this,
        "_buffer",
        new ArrayBuffer(68)
      );
      _(this, "_buffer8");
      _(this, "_buffer32");
      this._buffer8 = new Uint8Array(
        this._buffer,
        0,
        68
      ), this._buffer32 = new Uint32Array(this._buffer, 0, 17), this.start();
    }
    static hashByteArray(e, t2 = false) {
      return this.onePassHasher.start().appendByteArray(e).end(t2);
    }
    static hashStr(e, t2 = false) {
      return this.onePassHasher.start().appendStr(e).end(t2);
    }
    static hashAsciiStr(e, t2 = false) {
      return this.onePassHasher.start().appendAsciiStr(e).end(t2);
    }
    static _hex(e) {
      let t2 = U2.hexChars, n = U2.hexOut, i, s, o2, u2;
      for (u2 = 0; u2 < 4; u2 += 1) for (s = u2 * 8, i = e[u2], o2 = 0; o2 < 8; o2 += 2) n[s + 1 + o2] = t2.charAt(i & 15), i >>>= 4, n[s + 0 + o2] = t2.charAt(i & 15), i >>>= 4;
      return n.join("");
    }
    static _md5cycle(e, t2) {
      let n = e[0], i = e[1], s = e[2], o2 = e[3];
      n += (i & s | ~i & o2) + t2[0] - 680876936 | 0, n = (n << 7 | n >>> 25) + i | 0, o2 += (n & i | ~n & s) + t2[1] - 389564586 | 0, o2 = (o2 << 12 | o2 >>> 20) + n | 0, s += (o2 & n | ~o2 & i) + t2[2] + 606105819 | 0, s = (s << 17 | s >>> 15) + o2 | 0, i += (s & o2 | ~s & n) + t2[3] - 1044525330 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & s | ~i & o2) + t2[4] - 176418897 | 0, n = (n << 7 | n >>> 25) + i | 0, o2 += (n & i | ~n & s) + t2[5] + 1200080426 | 0, o2 = (o2 << 12 | o2 >>> 20) + n | 0, s += (o2 & n | ~o2 & i) + t2[6] - 1473231341 | 0, s = (s << 17 | s >>> 15) + o2 | 0, i += (s & o2 | ~s & n) + t2[7] - 45705983 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & s | ~i & o2) + t2[8] + 1770035416 | 0, n = (n << 7 | n >>> 25) + i | 0, o2 += (n & i | ~n & s) + t2[9] - 1958414417 | 0, o2 = (o2 << 12 | o2 >>> 20) + n | 0, s += (o2 & n | ~o2 & i) + t2[10] - 42063 | 0, s = (s << 17 | s >>> 15) + o2 | 0, i += (s & o2 | ~s & n) + t2[11] - 1990404162 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & s | ~i & o2) + t2[12] + 1804603682 | 0, n = (n << 7 | n >>> 25) + i | 0, o2 += (n & i | ~n & s) + t2[13] - 40341101 | 0, o2 = (o2 << 12 | o2 >>> 20) + n | 0, s += (o2 & n | ~o2 & i) + t2[14] - 1502002290 | 0, s = (s << 17 | s >>> 15) + o2 | 0, i += (s & o2 | ~s & n) + t2[15] + 1236535329 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & o2 | s & ~o2) + t2[1] - 165796510 | 0, n = (n << 5 | n >>> 27) + i | 0, o2 += (n & s | i & ~s) + t2[6] - 1069501632 | 0, o2 = (o2 << 9 | o2 >>> 23) + n | 0, s += (o2 & i | n & ~i) + t2[11] + 643717713 | 0, s = (s << 14 | s >>> 18) + o2 | 0, i += (s & n | o2 & ~n) + t2[0] - 373897302 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i & o2 | s & ~o2) + t2[5] - 701558691 | 0, n = (n << 5 | n >>> 27) + i | 0, o2 += (n & s | i & ~s) + t2[10] + 38016083 | 0, o2 = (o2 << 9 | o2 >>> 23) + n | 0, s += (o2 & i | n & ~i) + t2[15] - 660478335 | 0, s = (s << 14 | s >>> 18) + o2 | 0, i += (s & n | o2 & ~n) + t2[4] - 405537848 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i & o2 | s & ~o2) + t2[9] + 568446438 | 0, n = (n << 5 | n >>> 27) + i | 0, o2 += (n & s | i & ~s) + t2[14] - 1019803690 | 0, o2 = (o2 << 9 | o2 >>> 23) + n | 0, s += (o2 & i | n & ~i) + t2[3] - 187363961 | 0, s = (s << 14 | s >>> 18) + o2 | 0, i += (s & n | o2 & ~n) + t2[8] + 1163531501 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i & o2 | s & ~o2) + t2[13] - 1444681467 | 0, n = (n << 5 | n >>> 27) + i | 0, o2 += (n & s | i & ~s) + t2[2] - 51403784 | 0, o2 = (o2 << 9 | o2 >>> 23) + n | 0, s += (o2 & i | n & ~i) + t2[7] + 1735328473 | 0, s = (s << 14 | s >>> 18) + o2 | 0, i += (s & n | o2 & ~n) + t2[12] - 1926607734 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i ^ s ^ o2) + t2[5] - 378558 | 0, n = (n << 4 | n >>> 28) + i | 0, o2 += (n ^ i ^ s) + t2[8] - 2022574463 | 0, o2 = (o2 << 11 | o2 >>> 21) + n | 0, s += (o2 ^ n ^ i) + t2[11] + 1839030562 | 0, s = (s << 16 | s >>> 16) + o2 | 0, i += (s ^ o2 ^ n) + t2[14] - 35309556 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (i ^ s ^ o2) + t2[1] - 1530992060 | 0, n = (n << 4 | n >>> 28) + i | 0, o2 += (n ^ i ^ s) + t2[4] + 1272893353 | 0, o2 = (o2 << 11 | o2 >>> 21) + n | 0, s += (o2 ^ n ^ i) + t2[7] - 155497632 | 0, s = (s << 16 | s >>> 16) + o2 | 0, i += (s ^ o2 ^ n) + t2[10] - 1094730640 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (i ^ s ^ o2) + t2[13] + 681279174 | 0, n = (n << 4 | n >>> 28) + i | 0, o2 += (n ^ i ^ s) + t2[0] - 358537222 | 0, o2 = (o2 << 11 | o2 >>> 21) + n | 0, s += (o2 ^ n ^ i) + t2[3] - 722521979 | 0, s = (s << 16 | s >>> 16) + o2 | 0, i += (s ^ o2 ^ n) + t2[6] + 76029189 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (i ^ s ^ o2) + t2[9] - 640364487 | 0, n = (n << 4 | n >>> 28) + i | 0, o2 += (n ^ i ^ s) + t2[12] - 421815835 | 0, o2 = (o2 << 11 | o2 >>> 21) + n | 0, s += (o2 ^ n ^ i) + t2[15] + 530742520 | 0, s = (s << 16 | s >>> 16) + o2 | 0, i += (s ^ o2 ^ n) + t2[2] - 995338651 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (s ^ (i | ~o2)) + t2[0] - 198630844 | 0, n = (n << 6 | n >>> 26) + i | 0, o2 += (i ^ (n | ~s)) + t2[7] + 1126891415 | 0, o2 = (o2 << 10 | o2 >>> 22) + n | 0, s += (n ^ (o2 | ~i)) + t2[14] - 1416354905 | 0, s = (s << 15 | s >>> 17) + o2 | 0, i += (o2 ^ (s | ~n)) + t2[5] - 57434055 | 0, i = (i << 21 | i >>> 11) + s | 0, n += (s ^ (i | ~o2)) + t2[12] + 1700485571 | 0, n = (n << 6 | n >>> 26) + i | 0, o2 += (i ^ (n | ~s)) + t2[3] - 1894986606 | 0, o2 = (o2 << 10 | o2 >>> 22) + n | 0, s += (n ^ (o2 | ~i)) + t2[10] - 1051523 | 0, s = (s << 15 | s >>> 17) + o2 | 0, i += (o2 ^ (s | ~n)) + t2[1] - 2054922799 | 0, i = (i << 21 | i >>> 11) + s | 0, n += (s ^ (i | ~o2)) + t2[8] + 1873313359 | 0, n = (n << 6 | n >>> 26) + i | 0, o2 += (i ^ (n | ~s)) + t2[15] - 30611744 | 0, o2 = (o2 << 10 | o2 >>> 22) + n | 0, s += (n ^ (o2 | ~i)) + t2[6] - 1560198380 | 0, s = (s << 15 | s >>> 17) + o2 | 0, i += (o2 ^ (s | ~n)) + t2[13] + 1309151649 | 0, i = (i << 21 | i >>> 11) + s | 0, n += (s ^ (i | ~o2)) + t2[4] - 145523070 | 0, n = (n << 6 | n >>> 26) + i | 0, o2 += (i ^ (n | ~s)) + t2[11] - 1120210379 | 0, o2 = (o2 << 10 | o2 >>> 22) + n | 0, s += (n ^ (o2 | ~i)) + t2[2] + 718787259 | 0, s = (s << 15 | s >>> 17) + o2 | 0, i += (o2 ^ (s | ~n)) + t2[9] - 343485551 | 0, i = (i << 21 | i >>> 11) + s | 0, e[0] = n + e[0] | 0, e[1] = i + e[1] | 0, e[2] = s + e[2] | 0, e[3] = o2 + e[3] | 0;
    }
    start() {
      return this._dataLength = 0, this._bufferLength = 0, this._state.set(U2.stateIdentity), this;
    }
    appendStr(e) {
      let t2 = this._buffer8, n = this._buffer32, i = this._bufferLength, s, o2;
      for (o2 = 0; o2 < e.length; o2 += 1) {
        if (s = e.charCodeAt(o2), s < 128) t2[i++] = s;
        else if (s < 2048) t2[i++] = (s >>> 6) + 192, t2[i++] = s & 63 | 128;
        else if (s < 55296 || s > 56319) t2[i++] = (s >>> 12) + 224, t2[i++] = s >>> 6 & 63 | 128, t2[i++] = s & 63 | 128;
        else {
          if (s = (s - 55296) * 1024 + (e.charCodeAt(++o2) - 56320) + 65536, s > 1114111) throw new Error("Unicode standard supports code points up to U+10FFFF");
          t2[i++] = (s >>> 18) + 240, t2[i++] = s >>> 12 & 63 | 128, t2[i++] = s >>> 6 & 63 | 128, t2[i++] = s & 63 | 128;
        }
        i >= 64 && (this._dataLength += 64, U2._md5cycle(this._state, n), i -= 64, n[0] = n[16]);
      }
      return this._bufferLength = i, this;
    }
    appendAsciiStr(e) {
      let t2 = this._buffer8, n = this._buffer32, i = this._bufferLength, s, o2 = 0;
      for (; ; ) {
        for (s = Math.min(e.length - o2, 64 - i); s--; ) t2[i++] = e.charCodeAt(o2++);
        if (i < 64) break;
        this._dataLength += 64, U2._md5cycle(
          this._state,
          n
        ), i = 0;
      }
      return this._bufferLength = i, this;
    }
    appendByteArray(e) {
      let t2 = this._buffer8, n = this._buffer32, i = this._bufferLength, s, o2 = 0;
      for (; ; ) {
        for (s = Math.min(e.length - o2, 64 - i); s--; ) t2[i++] = e[o2++];
        if (i < 64) break;
        this._dataLength += 64, U2._md5cycle(
          this._state,
          n
        ), i = 0;
      }
      return this._bufferLength = i, this;
    }
    getState() {
      let e = this._state;
      return { buffer: String.fromCharCode.apply(null, Array.from(this._buffer8)), buflen: this._bufferLength, length: this._dataLength, state: [e[0], e[1], e[2], e[3]] };
    }
    setState(e) {
      let t2 = e.buffer, n = e.state, i = this._state, s;
      for (this._dataLength = e.length, this._bufferLength = e.buflen, i[0] = n[0], i[1] = n[1], i[2] = n[2], i[3] = n[3], s = 0; s < t2.length; s += 1) this._buffer8[s] = t2.charCodeAt(s);
    }
    end(e = false) {
      let t2 = this._bufferLength, n = this._buffer8, i = this._buffer32, s = (t2 >> 2) + 1;
      this._dataLength += t2;
      let o2 = this._dataLength * 8;
      if (n[t2] = 128, n[t2 + 1] = n[t2 + 2] = n[t2 + 3] = 0, i.set(U2.buffer32Identity.subarray(s), s), t2 > 55 && (U2._md5cycle(this._state, i), i.set(U2.buffer32Identity)), o2 <= 4294967295)
        i[14] = o2;
      else {
        let u2 = o2.toString(16).match(/(.*?)(.{0,8})$/);
        if (u2 === null) return;
        let c = parseInt(
          u2[2],
          16
        ), h2 = parseInt(u2[1], 16) || 0;
        i[14] = c, i[15] = h2;
      }
      return U2._md5cycle(this._state, i), e ? this._state : U2._hex(this._state);
    }
  };
  a(U, "Md5"), _(U, "stateIdentity", new Int32Array(
    [1732584193, -271733879, -1732584194, 271733878]
  )), _(U, "buffer32Identity", new Int32Array(
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  )), _(U, "hexChars", "0123456789abcdef"), _(U, "hexOut", []), _(U, "onePassHasher", new U());
  Ve = U;
});
var Wt = {};
se(Wt, { createHash: () => Zo, createHmac: () => Jo, randomBytes: () => Yo });
function Yo(r2) {
  return w.getRandomValues(y.alloc(r2));
}
function Zo(r2) {
  if (r2 === "sha256") return { update: a(
    function(e) {
      return { digest: a(function() {
        return y.from($e(e));
      }, "digest") };
    },
    "update"
  ) };
  if (r2 === "md5") return { update: a(function(e) {
    return { digest: a(function() {
      return typeof e == "string" ? Ve.hashStr(e) : Ve.hashByteArray(e);
    }, "digest") };
  }, "update") };
  throw new Error(
    `Hash type '${r2}' not supported`
  );
}
function Jo(r2, e) {
  if (r2 !== "sha256") throw new Error(
    `Only sha256 is supported (requested: '${r2}')`
  );
  return { update: a(function(t2) {
    return {
      digest: a(function() {
        typeof e == "string" && (e = new TextEncoder().encode(e)), typeof t2 == "string" && (t2 = new TextEncoder().encode(t2));
        let n = e.length;
        if (n > 64) e = $e(e);
        else if (n < 64) {
          let c = new Uint8Array(64);
          c.set(e), e = c;
        }
        let i = new Uint8Array(64), s = new Uint8Array(
          64
        );
        for (let c = 0; c < 64; c++) i[c] = 54 ^ e[c], s[c] = 92 ^ e[c];
        let o2 = new Uint8Array(t2.length + 64);
        o2.set(i, 0), o2.set(t2, 64);
        let u2 = new Uint8Array(96);
        return u2.set(s, 0), u2.set(
          $e(o2),
          64
        ), y.from($e(u2));
      }, "digest")
    };
  }, "update") };
}
var Ht = z(() => {
  "use strict";
  p2();
  si();
  oi();
  a(Yo, "randomBytes");
  a(Zo, "createHash");
  a(Jo, "createHmac");
});
var $t = I((ai) => {
  "use strict";
  p2();
  ai.parse = function(r2, e) {
    return new Gt(r2, e).parse();
  };
  var ht = class ht2 {
    constructor(e, t2) {
      this.source = e, this.transform = t2 || Xo, this.position = 0, this.entries = [], this.recorded = [], this.dimension = 0;
    }
    isEof() {
      return this.position >= this.source.length;
    }
    nextCharacter() {
      var e = this.source[this.position++];
      return e === "\\" ? { value: this.source[this.position++], escaped: true } : { value: e, escaped: false };
    }
    record(e) {
      this.recorded.push(e);
    }
    newEntry(e) {
      var t2;
      (this.recorded.length > 0 || e) && (t2 = this.recorded.join(""), t2 === "NULL" && !e && (t2 = null), t2 !== null && (t2 = this.transform(t2)), this.entries.push(
        t2
      ), this.recorded = []);
    }
    consumeDimensions() {
      if (this.source[0] === "[") for (; !this.isEof(); ) {
        var e = this.nextCharacter();
        if (e.value === "=") break;
      }
    }
    parse(e) {
      var t2, n, i;
      for (this.consumeDimensions(); !this.isEof(); ) if (t2 = this.nextCharacter(), t2.value === "{" && !i) this.dimension++, this.dimension > 1 && (n = new ht2(this.source.substr(this.position - 1), this.transform), this.entries.push(
        n.parse(true)
      ), this.position += n.position - 2);
      else if (t2.value === "}" && !i) {
        if (this.dimension--, !this.dimension && (this.newEntry(), e)) return this.entries;
      } else t2.value === '"' && !t2.escaped ? (i && this.newEntry(true), i = !i) : t2.value === "," && !i ? this.newEntry() : this.record(
        t2.value
      );
      if (this.dimension !== 0) throw new Error("array dimension not balanced");
      return this.entries;
    }
  };
  a(ht, "ArrayParser");
  var Gt = ht;
  function Xo(r2) {
    return r2;
  }
  a(Xo, "identity");
});
var Vt = I((Sh, ui) => {
  p2();
  var ea = $t();
  ui.exports = { create: a(function(r2, e) {
    return { parse: a(
      function() {
        return ea.parse(r2, e);
      },
      "parse"
    ) };
  }, "create") };
});
var li = I((vh, hi) => {
  "use strict";
  p2();
  var ta = /(\d{1,})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})(\.\d{1,})?.*?( BC)?$/, ra = /^(\d{1,})-(\d{2})-(\d{2})( BC)?$/, na = /([Z+-])(\d{2})?:?(\d{2})?:?(\d{2})?/, ia = /^-?infinity$/;
  hi.exports = a(function(e) {
    if (ia.test(e)) return Number(e.replace("i", "I"));
    var t2 = ta.exec(e);
    if (!t2) return sa(e) || null;
    var n = !!t2[8], i = parseInt(t2[1], 10);
    n && (i = ci(i));
    var s = parseInt(
      t2[2],
      10
    ) - 1, o2 = t2[3], u2 = parseInt(t2[4], 10), c = parseInt(t2[5], 10), h2 = parseInt(t2[6], 10), l = t2[7];
    l = l ? 1e3 * parseFloat(l) : 0;
    var d, b = oa(e);
    return b != null ? (d = new Date(Date.UTC(
      i,
      s,
      o2,
      u2,
      c,
      h2,
      l
    )), Kt(i) && d.setUTCFullYear(i), b !== 0 && d.setTime(d.getTime() - b)) : (d = new Date(
      i,
      s,
      o2,
      u2,
      c,
      h2,
      l
    ), Kt(i) && d.setFullYear(i)), d;
  }, "parseDate");
  function sa(r2) {
    var e = ra.exec(r2);
    if (e) {
      var t2 = parseInt(e[1], 10), n = !!e[4];
      n && (t2 = ci(t2));
      var i = parseInt(
        e[2],
        10
      ) - 1, s = e[3], o2 = new Date(t2, i, s);
      return Kt(t2) && o2.setFullYear(t2), o2;
    }
  }
  a(sa, "getDate");
  function oa(r2) {
    if (r2.endsWith("+00")) return 0;
    var e = na.exec(r2.split(" ")[1]);
    if (e) {
      var t2 = e[1];
      if (t2 === "Z") return 0;
      var n = t2 === "-" ? -1 : 1, i = parseInt(e[2], 10) * 3600 + parseInt(
        e[3] || 0,
        10
      ) * 60 + parseInt(e[4] || 0, 10);
      return i * n * 1e3;
    }
  }
  a(oa, "timeZoneOffset");
  function ci(r2) {
    return -(r2 - 1);
  }
  a(ci, "bcYearToNegativeYear");
  function Kt(r2) {
    return r2 >= 0 && r2 < 100;
  }
  a(
    Kt,
    "is0To99"
  );
});
var pi = I((Ch, fi) => {
  p2();
  fi.exports = ua;
  var aa = Object.prototype.hasOwnProperty;
  function ua(r2) {
    for (var e = 1; e < arguments.length; e++) {
      var t2 = arguments[e];
      for (var n in t2) aa.call(
        t2,
        n
      ) && (r2[n] = t2[n]);
    }
    return r2;
  }
  a(ua, "extend");
});
var mi = I((Ph, yi) => {
  "use strict";
  p2();
  var ca = pi();
  yi.exports = Fe;
  function Fe(r2) {
    if (!(this instanceof Fe)) return new Fe(r2);
    ca(this, xa(r2));
  }
  a(Fe, "PostgresInterval");
  var ha = ["seconds", "minutes", "hours", "days", "months", "years"];
  Fe.prototype.toPostgres = function() {
    var r2 = ha.filter(this.hasOwnProperty, this);
    return this.milliseconds && r2.indexOf("seconds") < 0 && r2.push("seconds"), r2.length === 0 ? "0" : r2.map(function(e) {
      var t2 = this[e] || 0;
      return e === "seconds" && this.milliseconds && (t2 = (t2 + this.milliseconds / 1e3).toFixed(6).replace(
        /\.?0+$/,
        ""
      )), t2 + " " + e;
    }, this).join(" ");
  };
  var la = { years: "Y", months: "M", days: "D", hours: "H", minutes: "M", seconds: "S" }, fa = ["years", "months", "days"], pa = ["hours", "minutes", "seconds"];
  Fe.prototype.toISOString = Fe.prototype.toISO = function() {
    var r2 = fa.map(t2, this).join(""), e = pa.map(t2, this).join("");
    return "P" + r2 + "T" + e;
    function t2(n) {
      var i = this[n] || 0;
      return n === "seconds" && this.milliseconds && (i = (i + this.milliseconds / 1e3).toFixed(6).replace(
        /0+$/,
        ""
      )), i + la[n];
    }
  };
  var zt = "([+-]?\\d+)", da = zt + "\\s+years?", ya = zt + "\\s+mons?", ma = zt + "\\s+days?", ga = "([+-])?([\\d]*):(\\d\\d):(\\d\\d)\\.?(\\d{1,6})?", wa = new RegExp([
    da,
    ya,
    ma,
    ga
  ].map(function(r2) {
    return "(" + r2 + ")?";
  }).join("\\s*")), di = {
    years: 2,
    months: 4,
    days: 6,
    hours: 9,
    minutes: 10,
    seconds: 11,
    milliseconds: 12
  }, ba = ["hours", "minutes", "seconds", "milliseconds"];
  function Sa(r2) {
    var e = r2 + "000000".slice(r2.length);
    return parseInt(
      e,
      10
    ) / 1e3;
  }
  a(Sa, "parseMilliseconds");
  function xa(r2) {
    if (!r2) return {};
    var e = wa.exec(
      r2
    ), t2 = e[8] === "-";
    return Object.keys(di).reduce(function(n, i) {
      var s = di[i], o2 = e[s];
      return !o2 || (o2 = i === "milliseconds" ? Sa(o2) : parseInt(o2, 10), !o2) || (t2 && ~ba.indexOf(i) && (o2 *= -1), n[i] = o2), n;
    }, {});
  }
  a(xa, "parse");
});
var wi = I((Rh, gi) => {
  "use strict";
  p2();
  gi.exports = a(function(e) {
    if (/^\\x/.test(e)) return new y(
      e.substr(2),
      "hex"
    );
    for (var t2 = "", n = 0; n < e.length; ) if (e[n] !== "\\") t2 += e[n], ++n;
    else if (/[0-7]{3}/.test(e.substr(n + 1, 3))) t2 += String.fromCharCode(parseInt(e.substr(n + 1, 3), 8)), n += 4;
    else {
      for (var i = 1; n + i < e.length && e[n + i] === "\\"; ) i++;
      for (var s = 0; s < Math.floor(i / 2); ++s) t2 += "\\";
      n += Math.floor(i / 2) * 2;
    }
    return new y(t2, "binary");
  }, "parseBytea");
});
var Ai = I((Dh, _i) => {
  p2();
  var Ke = $t(), ze = Vt(), lt = li(), Si = mi(), xi = wi();
  function ft(r2) {
    return a(function(t2) {
      return t2 === null ? t2 : r2(t2);
    }, "nullAllowed");
  }
  a(ft, "allowNull");
  function Ei(r2) {
    return r2 === null ? r2 : r2 === "TRUE" || r2 === "t" || r2 === "true" || r2 === "y" || r2 === "yes" || r2 === "on" || r2 === "1";
  }
  a(Ei, "parseBool");
  function Ea(r2) {
    return r2 ? Ke.parse(r2, Ei) : null;
  }
  a(Ea, "parseBoolArray");
  function va(r2) {
    return parseInt(r2, 10);
  }
  a(va, "parseBaseTenInt");
  function Yt(r2) {
    return r2 ? Ke.parse(r2, ft(va)) : null;
  }
  a(Yt, "parseIntegerArray");
  function _a(r2) {
    return r2 ? Ke.parse(r2, ft(function(e) {
      return vi(e).trim();
    })) : null;
  }
  a(_a, "parseBigIntegerArray");
  var Aa = a(function(r2) {
    if (!r2) return null;
    var e = ze.create(r2, function(t2) {
      return t2 !== null && (t2 = er(t2)), t2;
    });
    return e.parse();
  }, "parsePointArray"), Zt = a(function(r2) {
    if (!r2)
      return null;
    var e = ze.create(r2, function(t2) {
      return t2 !== null && (t2 = parseFloat(t2)), t2;
    });
    return e.parse();
  }, "parseFloatArray"), ne = a(function(r2) {
    if (!r2) return null;
    var e = ze.create(r2);
    return e.parse();
  }, "parseStringArray"), Jt = a(function(r2) {
    if (!r2) return null;
    var e = ze.create(r2, function(t2) {
      return t2 !== null && (t2 = lt(t2)), t2;
    });
    return e.parse();
  }, "parseDateArray"), Ca = a(function(r2) {
    if (!r2) return null;
    var e = ze.create(r2, function(t2) {
      return t2 !== null && (t2 = Si(t2)), t2;
    });
    return e.parse();
  }, "parseIntervalArray"), Ta = a(function(r2) {
    return r2 ? Ke.parse(r2, ft(xi)) : null;
  }, "parseByteAArray"), Xt = a(function(r2) {
    return parseInt(
      r2,
      10
    );
  }, "parseInteger"), vi = a(function(r2) {
    var e = String(r2);
    return /^\d+$/.test(e) ? e : r2;
  }, "parseBigInteger"), bi = a(
    function(r2) {
      return r2 ? Ke.parse(r2, ft(JSON.parse)) : null;
    },
    "parseJsonArray"
  ), er = a(function(r2) {
    return r2[0] !== "(" ? null : (r2 = r2.substring(1, r2.length - 1).split(","), { x: parseFloat(r2[0]), y: parseFloat(r2[1]) });
  }, "parsePoint"), Ia = a(function(r2) {
    if (r2[0] !== "<" && r2[1] !== "(") return null;
    for (var e = "(", t2 = "", n = false, i = 2; i < r2.length - 1; i++) {
      if (n || (e += r2[i]), r2[i] === ")") {
        n = true;
        continue;
      } else if (!n) continue;
      r2[i] !== "," && (t2 += r2[i]);
    }
    var s = er(e);
    return s.radius = parseFloat(t2), s;
  }, "parseCircle"), Pa = a(function(r2) {
    r2(
      20,
      vi
    ), r2(21, Xt), r2(23, Xt), r2(26, Xt), r2(700, parseFloat), r2(701, parseFloat), r2(16, Ei), r2(
      1082,
      lt
    ), r2(1114, lt), r2(1184, lt), r2(600, er), r2(651, ne), r2(718, Ia), r2(1e3, Ea), r2(1001, Ta), r2(
      1005,
      Yt
    ), r2(1007, Yt), r2(1028, Yt), r2(1016, _a), r2(1017, Aa), r2(1021, Zt), r2(1022, Zt), r2(1231, Zt), r2(1014, ne), r2(1015, ne), r2(1008, ne), r2(1009, ne), r2(1040, ne), r2(1041, ne), r2(1115, Jt), r2(
      1182,
      Jt
    ), r2(1185, Jt), r2(1186, Si), r2(1187, Ca), r2(17, xi), r2(114, JSON.parse.bind(JSON)), r2(
      3802,
      JSON.parse.bind(JSON)
    ), r2(199, bi), r2(3807, bi), r2(3907, ne), r2(2951, ne), r2(791, ne), r2(
      1183,
      ne
    ), r2(1270, ne);
  }, "init");
  _i.exports = { init: Pa };
});
var Ti = I((Oh, Ci) => {
  "use strict";
  p2();
  var Z = 1e6;
  function Ba(r2) {
    var e = r2.readInt32BE(
      0
    ), t2 = r2.readUInt32BE(4), n = "";
    e < 0 && (e = ~e + (t2 === 0), t2 = ~t2 + 1 >>> 0, n = "-");
    var i = "", s, o2, u2, c, h2, l;
    {
      if (s = e % Z, e = e / Z >>> 0, o2 = 4294967296 * s + t2, t2 = o2 / Z >>> 0, u2 = "" + (o2 - Z * t2), t2 === 0 && e === 0) return n + u2 + i;
      for (c = "", h2 = 6 - u2.length, l = 0; l < h2; l++) c += "0";
      i = c + u2 + i;
    }
    {
      if (s = e % Z, e = e / Z >>> 0, o2 = 4294967296 * s + t2, t2 = o2 / Z >>> 0, u2 = "" + (o2 - Z * t2), t2 === 0 && e === 0) return n + u2 + i;
      for (c = "", h2 = 6 - u2.length, l = 0; l < h2; l++) c += "0";
      i = c + u2 + i;
    }
    {
      if (s = e % Z, e = e / Z >>> 0, o2 = 4294967296 * s + t2, t2 = o2 / Z >>> 0, u2 = "" + (o2 - Z * t2), t2 === 0 && e === 0) return n + u2 + i;
      for (c = "", h2 = 6 - u2.length, l = 0; l < h2; l++) c += "0";
      i = c + u2 + i;
    }
    return s = e % Z, o2 = 4294967296 * s + t2, u2 = "" + o2 % Z, n + u2 + i;
  }
  a(Ba, "readInt8");
  Ci.exports = Ba;
});
var Ri = I((Qh, Li) => {
  p2();
  var La = Ti(), F = a(function(r2, e, t2, n, i) {
    t2 = t2 || 0, n = n || false, i = i || function(C, B, Q) {
      return C * Math.pow(2, Q) + B;
    };
    var s = t2 >> 3, o2 = a(function(C) {
      return n ? ~C & 255 : C;
    }, "inv"), u2 = 255, c = 8 - t2 % 8;
    e < c && (u2 = 255 << 8 - e & 255, c = e), t2 && (u2 = u2 >> t2 % 8);
    var h2 = 0;
    t2 % 8 + e >= 8 && (h2 = i(0, o2(r2[s]) & u2, c));
    for (var l = e + t2 >> 3, d = s + 1; d < l; d++) h2 = i(h2, o2(r2[d]), 8);
    var b = (e + t2) % 8;
    return b > 0 && (h2 = i(h2, o2(r2[l]) >> 8 - b, b)), h2;
  }, "parseBits"), Bi = a(function(r2, e, t2) {
    var n = Math.pow(2, t2 - 1) - 1, i = F(r2, 1), s = F(r2, t2, 1);
    if (s === 0) return 0;
    var o2 = 1, u2 = a(function(h2, l, d) {
      h2 === 0 && (h2 = 1);
      for (var b = 1; b <= d; b++) o2 /= 2, (l & 1 << d - b) > 0 && (h2 += o2);
      return h2;
    }, "parsePrecisionBits"), c = F(r2, e, t2 + 1, false, u2);
    return s == Math.pow(2, t2 + 1) - 1 ? c === 0 ? i === 0 ? 1 / 0 : -1 / 0 : NaN : (i === 0 ? 1 : -1) * Math.pow(2, s - n) * c;
  }, "parseFloatFromBits"), Ra = a(function(r2) {
    return F(r2, 1) == 1 ? -1 * (F(r2, 15, 1, true) + 1) : F(r2, 15, 1);
  }, "parseInt16"), Ii = a(function(r2) {
    return F(r2, 1) == 1 ? -1 * (F(
      r2,
      31,
      1,
      true
    ) + 1) : F(r2, 31, 1);
  }, "parseInt32"), Fa = a(function(r2) {
    return Bi(r2, 23, 8);
  }, "parseFloat32"), Ma = a(function(r2) {
    return Bi(r2, 52, 11);
  }, "parseFloat64"), Da = a(function(r2) {
    var e = F(r2, 16, 32);
    if (e == 49152) return NaN;
    for (var t2 = Math.pow(1e4, F(r2, 16, 16)), n = 0, i = [], s = F(r2, 16), o2 = 0; o2 < s; o2++) n += F(r2, 16, 64 + 16 * o2) * t2, t2 /= 1e4;
    var u2 = Math.pow(10, F(r2, 16, 48));
    return (e === 0 ? 1 : -1) * Math.round(n * u2) / u2;
  }, "parseNumeric"), Pi = a(function(r2, e) {
    var t2 = F(
      e,
      1
    ), n = F(e, 63, 1), i = new Date((t2 === 0 ? 1 : -1) * n / 1e3 + 9466848e5);
    return r2 || i.setTime(i.getTime() + i.getTimezoneOffset() * 6e4), i.usec = n % 1e3, i.getMicroSeconds = function() {
      return this.usec;
    }, i.setMicroSeconds = function(s) {
      this.usec = s;
    }, i.getUTCMicroSeconds = function() {
      return this.usec;
    }, i;
  }, "parseDate"), Ye = a(function(r2) {
    for (var e = F(r2, 32), t2 = F(r2, 32, 32), n = F(r2, 32, 64), i = 96, s = [], o2 = 0; o2 < e; o2++) s[o2] = F(r2, 32, i), i += 32, i += 32;
    var u2 = a(function(h2) {
      var l = F(r2, 32, i);
      if (i += 32, l == 4294967295) return null;
      var d;
      if (h2 == 23 || h2 == 20) return d = F(r2, l * 8, i), i += l * 8, d;
      if (h2 == 25) return d = r2.toString(this.encoding, i >> 3, (i += l << 3) >> 3), d;
      console.log("ERROR: ElementType not implemented: " + h2);
    }, "parseElement"), c = a(function(h2, l) {
      var d = [], b;
      if (h2.length > 1) {
        var C = h2.shift();
        for (b = 0; b < C; b++) d[b] = c(h2, l);
        h2.unshift(
          C
        );
      } else for (b = 0; b < h2[0]; b++) d[b] = u2(l);
      return d;
    }, "parse");
    return c(s, n);
  }, "parseArray"), ka = a(function(r2) {
    return r2.toString("utf8");
  }, "parseText"), Ua = a(function(r2) {
    return r2 === null ? null : F(r2, 8) > 0;
  }, "parseBool"), Oa = a(function(r2) {
    r2(20, La), r2(21, Ra), r2(23, Ii), r2(
      26,
      Ii
    ), r2(1700, Da), r2(700, Fa), r2(701, Ma), r2(16, Ua), r2(1114, Pi.bind(null, false)), r2(1184, Pi.bind(
      null,
      true
    )), r2(1e3, Ye), r2(1007, Ye), r2(1016, Ye), r2(1008, Ye), r2(1009, Ye), r2(25, ka);
  }, "init");
  Li.exports = { init: Oa };
});
var Mi = I((Hh, Fi) => {
  p2();
  Fi.exports = {
    BOOL: 16,
    BYTEA: 17,
    CHAR: 18,
    INT8: 20,
    INT2: 21,
    INT4: 23,
    REGPROC: 24,
    TEXT: 25,
    OID: 26,
    TID: 27,
    XID: 28,
    CID: 29,
    JSON: 114,
    XML: 142,
    PG_NODE_TREE: 194,
    SMGR: 210,
    PATH: 602,
    POLYGON: 604,
    CIDR: 650,
    FLOAT4: 700,
    FLOAT8: 701,
    ABSTIME: 702,
    RELTIME: 703,
    TINTERVAL: 704,
    CIRCLE: 718,
    MACADDR8: 774,
    MONEY: 790,
    MACADDR: 829,
    INET: 869,
    ACLITEM: 1033,
    BPCHAR: 1042,
    VARCHAR: 1043,
    DATE: 1082,
    TIME: 1083,
    TIMESTAMP: 1114,
    TIMESTAMPTZ: 1184,
    INTERVAL: 1186,
    TIMETZ: 1266,
    BIT: 1560,
    VARBIT: 1562,
    NUMERIC: 1700,
    REFCURSOR: 1790,
    REGPROCEDURE: 2202,
    REGOPER: 2203,
    REGOPERATOR: 2204,
    REGCLASS: 2205,
    REGTYPE: 2206,
    UUID: 2950,
    TXID_SNAPSHOT: 2970,
    PG_LSN: 3220,
    PG_NDISTINCT: 3361,
    PG_DEPENDENCIES: 3402,
    TSVECTOR: 3614,
    TSQUERY: 3615,
    GTSVECTOR: 3642,
    REGCONFIG: 3734,
    REGDICTIONARY: 3769,
    JSONB: 3802,
    REGNAMESPACE: 4089,
    REGROLE: 4096
  };
});
var Xe = I((Je) => {
  p2();
  var Na = Ai(), qa = Ri(), Qa = Vt(), ja = Mi();
  Je.getTypeParser = Wa;
  Je.setTypeParser = Ha;
  Je.arrayParser = Qa;
  Je.builtins = ja;
  var Ze = { text: {}, binary: {} };
  function Di(r2) {
    return String(
      r2
    );
  }
  a(Di, "noParse");
  function Wa(r2, e) {
    return e = e || "text", Ze[e] && Ze[e][r2] || Di;
  }
  a(
    Wa,
    "getTypeParser"
  );
  function Ha(r2, e, t2) {
    typeof e == "function" && (t2 = e, e = "text"), Ze[e][r2] = t2;
  }
  a(Ha, "setTypeParser");
  Na.init(function(r2, e) {
    Ze.text[r2] = e;
  });
  qa.init(function(r2, e) {
    Ze.binary[r2] = e;
  });
});
var et = I((zh, tr) => {
  "use strict";
  p2();
  tr.exports = {
    host: "localhost",
    user: m.platform === "win32" ? m.env.USERNAME : m.env.USER,
    database: void 0,
    password: null,
    connectionString: void 0,
    port: 5432,
    rows: 0,
    binary: false,
    max: 10,
    idleTimeoutMillis: 3e4,
    client_encoding: "",
    ssl: false,
    application_name: void 0,
    fallback_application_name: void 0,
    options: void 0,
    parseInputDatesAsUTC: false,
    statement_timeout: false,
    lock_timeout: false,
    idle_in_transaction_session_timeout: false,
    query_timeout: false,
    connect_timeout: 0,
    keepalives: 1,
    keepalives_idle: 0
  };
  var Me = Xe(), Ga = Me.getTypeParser(
    20,
    "text"
  ), $a = Me.getTypeParser(1016, "text");
  tr.exports.__defineSetter__("parseInt8", function(r2) {
    Me.setTypeParser(20, "text", r2 ? Me.getTypeParser(23, "text") : Ga), Me.setTypeParser(1016, "text", r2 ? Me.getTypeParser(1007, "text") : $a);
  });
});
var tt = I((Zh, Ui) => {
  "use strict";
  p2();
  var Va = (Ht(), O(Wt)), Ka = et();
  function za(r2) {
    var e = r2.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    return '"' + e + '"';
  }
  a(za, "escapeElement");
  function ki(r2) {
    for (var e = "{", t2 = 0; t2 < r2.length; t2++) t2 > 0 && (e = e + ","), r2[t2] === null || typeof r2[t2] > "u" ? e = e + "NULL" : Array.isArray(r2[t2]) ? e = e + ki(r2[t2]) : r2[t2] instanceof y ? e += "\\\\x" + r2[t2].toString("hex") : e += za(pt(r2[t2]));
    return e = e + "}", e;
  }
  a(ki, "arrayString");
  var pt = a(function(r2, e) {
    if (r2 == null) return null;
    if (r2 instanceof y) return r2;
    if (ArrayBuffer.isView(r2)) {
      var t2 = y.from(r2.buffer, r2.byteOffset, r2.byteLength);
      return t2.length === r2.byteLength ? t2 : t2.slice(
        r2.byteOffset,
        r2.byteOffset + r2.byteLength
      );
    }
    return r2 instanceof Date ? Ka.parseInputDatesAsUTC ? Ja(r2) : Za(r2) : Array.isArray(r2) ? ki(r2) : typeof r2 == "object" ? Ya(r2, e) : r2.toString();
  }, "prepareValue");
  function Ya(r2, e) {
    if (r2 && typeof r2.toPostgres == "function") {
      if (e = e || [], e.indexOf(r2) !== -1) throw new Error('circular reference detected while preparing "' + r2 + '" for query');
      return e.push(r2), pt(r2.toPostgres(pt), e);
    }
    return JSON.stringify(r2);
  }
  a(Ya, "prepareObject");
  function G(r2, e) {
    for (r2 = "" + r2; r2.length < e; ) r2 = "0" + r2;
    return r2;
  }
  a(
    G,
    "pad"
  );
  function Za(r2) {
    var e = -r2.getTimezoneOffset(), t2 = r2.getFullYear(), n = t2 < 1;
    n && (t2 = Math.abs(t2) + 1);
    var i = G(t2, 4) + "-" + G(r2.getMonth() + 1, 2) + "-" + G(r2.getDate(), 2) + "T" + G(r2.getHours(), 2) + ":" + G(r2.getMinutes(), 2) + ":" + G(r2.getSeconds(), 2) + "." + G(
      r2.getMilliseconds(),
      3
    );
    return e < 0 ? (i += "-", e *= -1) : i += "+", i += G(Math.floor(e / 60), 2) + ":" + G(e % 60, 2), n && (i += " BC"), i;
  }
  a(Za, "dateToString");
  function Ja(r2) {
    var e = r2.getUTCFullYear(), t2 = e < 1;
    t2 && (e = Math.abs(e) + 1);
    var n = G(e, 4) + "-" + G(r2.getUTCMonth() + 1, 2) + "-" + G(r2.getUTCDate(), 2) + "T" + G(r2.getUTCHours(), 2) + ":" + G(r2.getUTCMinutes(), 2) + ":" + G(r2.getUTCSeconds(), 2) + "." + G(r2.getUTCMilliseconds(), 3);
    return n += "+00:00", t2 && (n += " BC"), n;
  }
  a(Ja, "dateToStringUTC");
  function Xa(r2, e, t2) {
    return r2 = typeof r2 == "string" ? { text: r2 } : r2, e && (typeof e == "function" ? r2.callback = e : r2.values = e), t2 && (r2.callback = t2), r2;
  }
  a(Xa, "normalizeQueryConfig");
  var rr = a(function(r2) {
    return Va.createHash("md5").update(r2, "utf-8").digest("hex");
  }, "md5"), eu = a(function(r2, e, t2) {
    var n = rr(e + r2), i = rr(y.concat([y.from(n), t2]));
    return "md5" + i;
  }, "postgresMd5PasswordHash");
  Ui.exports = { prepareValue: a(function(e) {
    return pt(
      e
    );
  }, "prepareValueWrapper"), normalizeQueryConfig: Xa, postgresMd5PasswordHash: eu, md5: rr };
});
var ji = I((el, Qi) => {
  "use strict";
  p2();
  var nr = (Ht(), O(Wt));
  function tu(r2) {
    if (r2.indexOf(
      "SCRAM-SHA-256"
    ) === -1) throw new Error("SASL: Only mechanism SCRAM-SHA-256 is currently supported");
    let e = nr.randomBytes(18).toString("base64");
    return { mechanism: "SCRAM-SHA-256", clientNonce: e, response: "n,,n=*,r=" + e, message: "SASLInitialResponse" };
  }
  a(tu, "startSession");
  function ru(r2, e, t2) {
    if (r2.message !== "SASLInitialResponse") throw new Error(
      "SASL: Last message was not SASLInitialResponse"
    );
    if (typeof e != "string") throw new Error(
      "SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string"
    );
    if (typeof t2 != "string") throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: serverData must be a string");
    let n = su(t2);
    if (n.nonce.startsWith(r2.clientNonce)) {
      if (n.nonce.length === r2.clientNonce.length) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
    } else throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce");
    var i = y.from(n.salt, "base64"), s = uu(
      e,
      i,
      n.iteration
    ), o2 = De(s, "Client Key"), u2 = au(o2), c = "n=*,r=" + r2.clientNonce, h2 = "r=" + n.nonce + ",s=" + n.salt + ",i=" + n.iteration, l = "c=biws,r=" + n.nonce, d = c + "," + h2 + "," + l, b = De(u2, d), C = qi(
      o2,
      b
    ), B = C.toString("base64"), Q = De(s, "Server Key"), X = De(Q, d);
    r2.message = "SASLResponse", r2.serverSignature = X.toString("base64"), r2.response = l + ",p=" + B;
  }
  a(ru, "continueSession");
  function nu(r2, e) {
    if (r2.message !== "SASLResponse") throw new Error("SASL: Last message was not SASLResponse");
    if (typeof e != "string") throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: serverData must be a string");
    let { serverSignature: t2 } = ou(
      e
    );
    if (t2 !== r2.serverSignature) throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature does not match");
  }
  a(nu, "finalizeSession");
  function iu(r2) {
    if (typeof r2 != "string") throw new TypeError("SASL: text must be a string");
    return r2.split("").map(
      (e, t2) => r2.charCodeAt(t2)
    ).every((e) => e >= 33 && e <= 43 || e >= 45 && e <= 126);
  }
  a(iu, "isPrintableChars");
  function Oi(r2) {
    return /^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(r2);
  }
  a(Oi, "isBase64");
  function Ni(r2) {
    if (typeof r2 != "string") throw new TypeError(
      "SASL: attribute pairs text must be a string"
    );
    return new Map(r2.split(",").map((e) => {
      if (!/^.=/.test(e)) throw new Error("SASL: Invalid attribute pair entry");
      let t2 = e[0], n = e.substring(2);
      return [t2, n];
    }));
  }
  a(Ni, "parseAttributePairs");
  function su(r2) {
    let e = Ni(
      r2
    ), t2 = e.get("r");
    if (t2) {
      if (!iu(t2)) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce must only contain printable characters");
    } else throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing");
    let n = e.get("s");
    if (n) {
      if (!Oi(n)) throw new Error(
        "SASL: SCRAM-SERVER-FIRST-MESSAGE: salt must be base64"
      );
    } else throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing");
    let i = e.get("i");
    if (i) {
      if (!/^[1-9][0-9]*$/.test(i)) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: invalid iteration count");
    } else throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration missing");
    let s = parseInt(i, 10);
    return { nonce: t2, salt: n, iteration: s };
  }
  a(su, "parseServerFirstMessage");
  function ou(r2) {
    let t2 = Ni(r2).get("v");
    if (t2) {
      if (!Oi(t2)) throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature must be base64");
    } else throw new Error(
      "SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature is missing"
    );
    return { serverSignature: t2 };
  }
  a(ou, "parseServerFinalMessage");
  function qi(r2, e) {
    if (!y.isBuffer(r2)) throw new TypeError(
      "first argument must be a Buffer"
    );
    if (!y.isBuffer(e)) throw new TypeError("second argument must be a Buffer");
    if (r2.length !== e.length) throw new Error("Buffer lengths must match");
    if (r2.length === 0) throw new Error("Buffers cannot be empty");
    return y.from(r2.map((t2, n) => r2[n] ^ e[n]));
  }
  a(qi, "xorBuffers");
  function au(r2) {
    return nr.createHash(
      "sha256"
    ).update(r2).digest();
  }
  a(au, "sha256");
  function De(r2, e) {
    return nr.createHmac(
      "sha256",
      r2
    ).update(e).digest();
  }
  a(De, "hmacSha256");
  function uu(r2, e, t2) {
    for (var n = De(
      r2,
      y.concat([e, y.from([0, 0, 0, 1])])
    ), i = n, s = 0; s < t2 - 1; s++) n = De(r2, n), i = qi(i, n);
    return i;
  }
  a(uu, "Hi");
  Qi.exports = { startSession: tu, continueSession: ru, finalizeSession: nu };
});
var ir = {};
se(ir, { join: () => cu });
function cu(...r2) {
  return r2.join("/");
}
var sr = z(() => {
  "use strict";
  p2();
  a(cu, "join");
});
var or = {};
se(or, { stat: () => hu });
function hu(r2, e) {
  e(new Error("No filesystem"));
}
var ar = z(
  () => {
    "use strict";
    p2();
    a(hu, "stat");
  }
);
var ur = {};
se(ur, { default: () => lu });
var lu;
var cr = z(() => {
  "use strict";
  p2();
  lu = {};
});
var Wi = {};
se(Wi, { StringDecoder: () => hr });
var lr;
var hr;
var Hi = z(() => {
  "use strict";
  p2();
  lr = class lr {
    constructor(e) {
      _(this, "td");
      this.td = new TextDecoder(e);
    }
    write(e) {
      return this.td.decode(e, { stream: true });
    }
    end(e) {
      return this.td.decode(e);
    }
  };
  a(lr, "StringDecoder");
  hr = lr;
});
var Ki = I((hl, Vi) => {
  "use strict";
  p2();
  var { Transform: fu } = (cr(), O(ur)), { StringDecoder: pu } = (Hi(), O(Wi)), we = Symbol("last"), dt = Symbol("decoder");
  function du(r2, e, t2) {
    let n;
    if (this.overflow) {
      if (n = this[dt].write(r2).split(this.matcher), n.length === 1) return t2();
      n.shift(), this.overflow = false;
    } else this[we] += this[dt].write(r2), n = this[we].split(this.matcher);
    this[we] = n.pop();
    for (let i = 0; i < n.length; i++) try {
      $i(this, this.mapper(n[i]));
    } catch (s) {
      return t2(
        s
      );
    }
    if (this.overflow = this[we].length > this.maxLength, this.overflow && !this.skipOverflow) {
      t2(new Error("maximum buffer reached"));
      return;
    }
    t2();
  }
  a(du, "transform");
  function yu(r2) {
    if (this[we] += this[dt].end(), this[we]) try {
      $i(this, this.mapper(this[we]));
    } catch (e) {
      return r2(e);
    }
    r2();
  }
  a(yu, "flush");
  function $i(r2, e) {
    e !== void 0 && r2.push(e);
  }
  a($i, "push");
  function Gi(r2) {
    return r2;
  }
  a(Gi, "noop");
  function mu(r2, e, t2) {
    switch (r2 = r2 || /\r?\n/, e = e || Gi, t2 = t2 || {}, arguments.length) {
      case 1:
        typeof r2 == "function" ? (e = r2, r2 = /\r?\n/) : typeof r2 == "object" && !(r2 instanceof RegExp) && !r2[Symbol.split] && (t2 = r2, r2 = /\r?\n/);
        break;
      case 2:
        typeof r2 == "function" ? (t2 = e, e = r2, r2 = /\r?\n/) : typeof e == "object" && (t2 = e, e = Gi);
    }
    t2 = Object.assign({}, t2), t2.autoDestroy = true, t2.transform = du, t2.flush = yu, t2.readableObjectMode = true;
    let n = new fu(t2);
    return n[we] = "", n[dt] = new pu("utf8"), n.matcher = r2, n.mapper = e, n.maxLength = t2.maxLength, n.skipOverflow = t2.skipOverflow || false, n.overflow = false, n._destroy = function(i, s) {
      this._writableState.errorEmitted = false, s(i);
    }, n;
  }
  a(mu, "split");
  Vi.exports = mu;
});
var Zi = I((pl, fe) => {
  "use strict";
  p2();
  var zi = (sr(), O(ir)), gu = (cr(), O(ur)).Stream, wu = Ki(), Yi = (Ge(), O(He)), bu = 5432, yt = m.platform === "win32", rt = m.stderr, Su = 56, xu = 7, Eu = 61440, vu = 32768;
  function _u(r2) {
    return (r2 & Eu) == vu;
  }
  a(_u, "isRegFile");
  var ke = [
    "host",
    "port",
    "database",
    "user",
    "password"
  ], fr = ke.length, Au = ke[fr - 1];
  function pr() {
    var r2 = rt instanceof gu && rt.writable === true;
    if (r2) {
      var e = Array.prototype.slice.call(arguments).concat(`
`);
      rt.write(Yi.format.apply(Yi, e));
    }
  }
  a(pr, "warn");
  Object.defineProperty(
    fe.exports,
    "isWin",
    { get: a(function() {
      return yt;
    }, "get"), set: a(function(r2) {
      yt = r2;
    }, "set") }
  );
  fe.exports.warnTo = function(r2) {
    var e = rt;
    return rt = r2, e;
  };
  fe.exports.getFileName = function(r2) {
    var e = r2 || m.env, t2 = e.PGPASSFILE || (yt ? zi.join(e.APPDATA || "./", "postgresql", "pgpass.conf") : zi.join(e.HOME || "./", ".pgpass"));
    return t2;
  };
  fe.exports.usePgPass = function(r2, e) {
    return Object.prototype.hasOwnProperty.call(m.env, "PGPASSWORD") ? false : yt ? true : (e = e || "<unkn>", _u(r2.mode) ? r2.mode & (Su | xu) ? (pr('WARNING: password file "%s" has group or world access; permissions should be u=rw (0600) or less', e), false) : true : (pr('WARNING: password file "%s" is not a plain file', e), false));
  };
  var Cu = fe.exports.match = function(r2, e) {
    return ke.slice(0, -1).reduce(function(t2, n, i) {
      return i == 1 && Number(r2[n] || bu) === Number(
        e[n]
      ) ? t2 && true : t2 && (e[n] === "*" || e[n] === r2[n]);
    }, true);
  };
  fe.exports.getPassword = function(r2, e, t2) {
    var n, i = e.pipe(wu());
    function s(c) {
      var h2 = Tu(c);
      h2 && Iu(h2) && Cu(r2, h2) && (n = h2[Au], i.end());
    }
    a(s, "onLine");
    var o2 = a(function() {
      e.destroy(), t2(n);
    }, "onEnd"), u2 = a(function(c) {
      e.destroy(), pr("WARNING: error on reading file: %s", c), t2(void 0);
    }, "onErr");
    e.on("error", u2), i.on("data", s).on("end", o2).on("error", u2);
  };
  var Tu = fe.exports.parseLine = function(r2) {
    if (r2.length < 11 || r2.match(/^\s+#/)) return null;
    for (var e = "", t2 = "", n = 0, i = 0, s = 0, o2 = {}, u2 = false, c = a(function(l, d, b) {
      var C = r2.substring(d, b);
      Object.hasOwnProperty.call(
        m.env,
        "PGPASS_NO_DEESCAPE"
      ) || (C = C.replace(/\\([:\\])/g, "$1")), o2[ke[l]] = C;
    }, "addToObj"), h2 = 0; h2 < r2.length - 1; h2 += 1) {
      if (e = r2.charAt(h2 + 1), t2 = r2.charAt(h2), u2 = n == fr - 1, u2) {
        c(n, i);
        break;
      }
      h2 >= 0 && e == ":" && t2 !== "\\" && (c(n, i, h2 + 1), i = h2 + 2, n += 1);
    }
    return o2 = Object.keys(o2).length === fr ? o2 : null, o2;
  }, Iu = fe.exports.isValidEntry = function(r2) {
    for (var e = { 0: function(o2) {
      return o2.length > 0;
    }, 1: function(o2) {
      return o2 === "*" ? true : (o2 = Number(o2), isFinite(o2) && o2 > 0 && o2 < 9007199254740992 && Math.floor(o2) === o2);
    }, 2: function(o2) {
      return o2.length > 0;
    }, 3: function(o2) {
      return o2.length > 0;
    }, 4: function(o2) {
      return o2.length > 0;
    } }, t2 = 0; t2 < ke.length; t2 += 1) {
      var n = e[t2], i = r2[ke[t2]] || "", s = n(i);
      if (!s) return false;
    }
    return true;
  };
});
var Xi = I((gl, dr) => {
  "use strict";
  p2();
  var ml = (sr(), O(ir)), Ji = (ar(), O(or)), mt = Zi();
  dr.exports = function(r2, e) {
    var t2 = mt.getFileName();
    Ji.stat(t2, function(n, i) {
      if (n || !mt.usePgPass(i, t2)) return e(void 0);
      var s = Ji.createReadStream(t2);
      mt.getPassword(
        r2,
        s,
        e
      );
    });
  };
  dr.exports.warnTo = mt.warnTo;
});
var wt = I((bl, es) => {
  "use strict";
  p2();
  var Pu = Xe();
  function gt(r2) {
    this._types = r2 || Pu, this.text = {}, this.binary = {};
  }
  a(gt, "TypeOverrides");
  gt.prototype.getOverrides = function(r2) {
    switch (r2) {
      case "text":
        return this.text;
      case "binary":
        return this.binary;
      default:
        return {};
    }
  };
  gt.prototype.setTypeParser = function(r2, e, t2) {
    typeof e == "function" && (t2 = e, e = "text"), this.getOverrides(e)[r2] = t2;
  };
  gt.prototype.getTypeParser = function(r2, e) {
    return e = e || "text", this.getOverrides(e)[r2] || this._types.getTypeParser(r2, e);
  };
  es.exports = gt;
});
var ts = {};
se(ts, { default: () => Bu });
var Bu;
var rs = z(() => {
  "use strict";
  p2();
  Bu = {};
});
var ns = {};
se(ns, { parse: () => yr });
function yr(r2, e = false) {
  let { protocol: t2 } = new URL(r2), n = "http:" + r2.substring(t2.length), {
    username: i,
    password: s,
    host: o2,
    hostname: u2,
    port: c,
    pathname: h2,
    search: l,
    searchParams: d,
    hash: b
  } = new URL(n);
  s = decodeURIComponent(s), i = decodeURIComponent(
    i
  ), h2 = decodeURIComponent(h2);
  let C = i + ":" + s, B = e ? Object.fromEntries(d.entries()) : l;
  return {
    href: r2,
    protocol: t2,
    auth: C,
    username: i,
    password: s,
    host: o2,
    hostname: u2,
    port: c,
    pathname: h2,
    search: l,
    query: B,
    hash: b
  };
}
var mr = z(() => {
  "use strict";
  p2();
  a(yr, "parse");
});
var ss = I((Al, is) => {
  "use strict";
  p2();
  var Lu = (mr(), O(ns)), gr = (ar(), O(or));
  function wr(r2) {
    if (r2.charAt(0) === "/") {
      var t2 = r2.split(" ");
      return { host: t2[0], database: t2[1] };
    }
    var e = Lu.parse(/ |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(r2) ? encodeURI(r2).replace(
      /\%25(\d\d)/g,
      "%$1"
    ) : r2, true), t2 = e.query;
    for (var n in t2) Array.isArray(t2[n]) && (t2[n] = t2[n][t2[n].length - 1]);
    var i = (e.auth || ":").split(":");
    if (t2.user = i[0], t2.password = i.splice(1).join(":"), t2.port = e.port, e.protocol == "socket:") return t2.host = decodeURI(e.pathname), t2.database = e.query.db, t2.client_encoding = e.query.encoding, t2;
    t2.host || (t2.host = e.hostname);
    var s = e.pathname;
    if (!t2.host && s && /^%2f/i.test(s)) {
      var o2 = s.split("/");
      t2.host = decodeURIComponent(
        o2[0]
      ), s = o2.splice(1).join("/");
    }
    switch (s && s.charAt(0) === "/" && (s = s.slice(1) || null), t2.database = s && decodeURI(s), (t2.ssl === "true" || t2.ssl === "1") && (t2.ssl = true), t2.ssl === "0" && (t2.ssl = false), (t2.sslcert || t2.sslkey || t2.sslrootcert || t2.sslmode) && (t2.ssl = {}), t2.sslcert && (t2.ssl.cert = gr.readFileSync(t2.sslcert).toString()), t2.sslkey && (t2.ssl.key = gr.readFileSync(
      t2.sslkey
    ).toString()), t2.sslrootcert && (t2.ssl.ca = gr.readFileSync(t2.sslrootcert).toString()), t2.sslmode) {
      case "disable": {
        t2.ssl = false;
        break;
      }
      case "prefer":
      case "require":
      case "verify-ca":
      case "verify-full":
        break;
      case "no-verify": {
        t2.ssl.rejectUnauthorized = false;
        break;
      }
    }
    return t2;
  }
  a(wr, "parse");
  is.exports = wr;
  wr.parse = wr;
});
var bt = I((Il, us) => {
  "use strict";
  p2();
  var Ru = (rs(), O(ts)), as = et(), os = ss().parse, V = a(
    function(r2, e, t2) {
      return t2 === void 0 ? t2 = m.env["PG" + r2.toUpperCase()] : t2 === false || (t2 = m.env[t2]), e[r2] || t2 || as[r2];
    },
    "val"
  ), Fu = a(function() {
    switch (m.env.PGSSLMODE) {
      case "disable":
        return false;
      case "prefer":
      case "require":
      case "verify-ca":
      case "verify-full":
        return true;
      case "no-verify":
        return { rejectUnauthorized: false };
    }
    return as.ssl;
  }, "readSSLConfigFromEnvironment"), Ue = a(
    function(r2) {
      return "'" + ("" + r2).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
    },
    "quoteParamValue"
  ), ie = a(function(r2, e, t2) {
    var n = e[t2];
    n != null && r2.push(t2 + "=" + Ue(n));
  }, "add"), Sr = class Sr {
    constructor(e) {
      e = typeof e == "string" ? os(e) : e || {}, e.connectionString && (e = Object.assign({}, e, os(e.connectionString))), this.user = V("user", e), this.database = V("database", e), this.database === void 0 && (this.database = this.user), this.port = parseInt(
        V("port", e),
        10
      ), this.host = V("host", e), Object.defineProperty(this, "password", {
        configurable: true,
        enumerable: false,
        writable: true,
        value: V("password", e)
      }), this.binary = V("binary", e), this.options = V("options", e), this.ssl = typeof e.ssl > "u" ? Fu() : e.ssl, typeof this.ssl == "string" && this.ssl === "true" && (this.ssl = true), this.ssl === "no-verify" && (this.ssl = { rejectUnauthorized: false }), this.ssl && this.ssl.key && Object.defineProperty(this.ssl, "key", { enumerable: false }), this.client_encoding = V("client_encoding", e), this.replication = V("replication", e), this.isDomainSocket = !(this.host || "").indexOf("/"), this.application_name = V("application_name", e, "PGAPPNAME"), this.fallback_application_name = V("fallback_application_name", e, false), this.statement_timeout = V("statement_timeout", e, false), this.lock_timeout = V(
        "lock_timeout",
        e,
        false
      ), this.idle_in_transaction_session_timeout = V("idle_in_transaction_session_timeout", e, false), this.query_timeout = V("query_timeout", e, false), e.connectionTimeoutMillis === void 0 ? this.connect_timeout = m.env.PGCONNECT_TIMEOUT || 0 : this.connect_timeout = Math.floor(e.connectionTimeoutMillis / 1e3), e.keepAlive === false ? this.keepalives = 0 : e.keepAlive === true && (this.keepalives = 1), typeof e.keepAliveInitialDelayMillis == "number" && (this.keepalives_idle = Math.floor(e.keepAliveInitialDelayMillis / 1e3));
    }
    getLibpqConnectionString(e) {
      var t2 = [];
      ie(t2, this, "user"), ie(t2, this, "password"), ie(t2, this, "port"), ie(t2, this, "application_name"), ie(t2, this, "fallback_application_name"), ie(t2, this, "connect_timeout"), ie(
        t2,
        this,
        "options"
      );
      var n = typeof this.ssl == "object" ? this.ssl : this.ssl ? { sslmode: this.ssl } : {};
      if (ie(t2, n, "sslmode"), ie(t2, n, "sslca"), ie(t2, n, "sslkey"), ie(t2, n, "sslcert"), ie(t2, n, "sslrootcert"), this.database && t2.push("dbname=" + Ue(this.database)), this.replication && t2.push("replication=" + Ue(this.replication)), this.host && t2.push("host=" + Ue(this.host)), this.isDomainSocket) return e(null, t2.join(" "));
      this.client_encoding && t2.push("client_encoding=" + Ue(this.client_encoding)), Ru.lookup(this.host, function(i, s) {
        return i ? e(i, null) : (t2.push("hostaddr=" + Ue(s)), e(null, t2.join(" ")));
      });
    }
  };
  a(Sr, "ConnectionParameters");
  var br = Sr;
  us.exports = br;
});
var ls = I((Ll, hs) => {
  "use strict";
  p2();
  var Mu = Xe(), cs = /^([A-Za-z]+)(?: (\d+))?(?: (\d+))?/, Er = class Er {
    constructor(e, t2) {
      this.command = null, this.rowCount = null, this.oid = null, this.rows = [], this.fields = [], this._parsers = void 0, this._types = t2, this.RowCtor = null, this.rowAsArray = e === "array", this.rowAsArray && (this.parseRow = this._parseRowAsArray);
    }
    addCommandComplete(e) {
      var t2;
      e.text ? t2 = cs.exec(e.text) : t2 = cs.exec(e.command), t2 && (this.command = t2[1], t2[3] ? (this.oid = parseInt(t2[2], 10), this.rowCount = parseInt(t2[3], 10)) : t2[2] && (this.rowCount = parseInt(
        t2[2],
        10
      )));
    }
    _parseRowAsArray(e) {
      for (var t2 = new Array(e.length), n = 0, i = e.length; n < i; n++) {
        var s = e[n];
        s !== null ? t2[n] = this._parsers[n](s) : t2[n] = null;
      }
      return t2;
    }
    parseRow(e) {
      for (var t2 = {}, n = 0, i = e.length; n < i; n++) {
        var s = e[n], o2 = this.fields[n].name;
        s !== null ? t2[o2] = this._parsers[n](
          s
        ) : t2[o2] = null;
      }
      return t2;
    }
    addRow(e) {
      this.rows.push(e);
    }
    addFields(e) {
      this.fields = e, this.fields.length && (this._parsers = new Array(e.length));
      for (var t2 = 0; t2 < e.length; t2++) {
        var n = e[t2];
        this._types ? this._parsers[t2] = this._types.getTypeParser(n.dataTypeID, n.format || "text") : this._parsers[t2] = Mu.getTypeParser(n.dataTypeID, n.format || "text");
      }
    }
  };
  a(Er, "Result");
  var xr = Er;
  hs.exports = xr;
});
var ys = I((Ml, ds) => {
  "use strict";
  p2();
  var { EventEmitter: Du } = ge(), fs = ls(), ps = tt(), _r = class _r extends Du {
    constructor(e, t2, n) {
      super(), e = ps.normalizeQueryConfig(e, t2, n), this.text = e.text, this.values = e.values, this.rows = e.rows, this.types = e.types, this.name = e.name, this.binary = e.binary, this.portal = e.portal || "", this.callback = e.callback, this._rowMode = e.rowMode, m.domain && e.callback && (this.callback = m.domain.bind(e.callback)), this._result = new fs(this._rowMode, this.types), this._results = this._result, this.isPreparedStatement = false, this._canceledDueToError = false, this._promise = null;
    }
    requiresPreparation() {
      return this.name || this.rows ? true : !this.text || !this.values ? false : this.values.length > 0;
    }
    _checkForMultirow() {
      this._result.command && (Array.isArray(this._results) || (this._results = [this._result]), this._result = new fs(
        this._rowMode,
        this.types
      ), this._results.push(this._result));
    }
    handleRowDescription(e) {
      this._checkForMultirow(), this._result.addFields(e.fields), this._accumulateRows = this.callback || !this.listeners("row").length;
    }
    handleDataRow(e) {
      let t2;
      if (!this._canceledDueToError) {
        try {
          t2 = this._result.parseRow(e.fields);
        } catch (n) {
          this._canceledDueToError = n;
          return;
        }
        this.emit("row", t2, this._result), this._accumulateRows && this._result.addRow(t2);
      }
    }
    handleCommandComplete(e, t2) {
      this._checkForMultirow(), this._result.addCommandComplete(e), this.rows && t2.sync();
    }
    handleEmptyQuery(e) {
      this.rows && e.sync();
    }
    handleError(e, t2) {
      if (this._canceledDueToError && (e = this._canceledDueToError, this._canceledDueToError = false), this.callback) return this.callback(e);
      this.emit("error", e);
    }
    handleReadyForQuery(e) {
      if (this._canceledDueToError) return this.handleError(
        this._canceledDueToError,
        e
      );
      if (this.callback) try {
        this.callback(null, this._results);
      } catch (t2) {
        m.nextTick(() => {
          throw t2;
        });
      }
      this.emit("end", this._results);
    }
    submit(e) {
      if (typeof this.text != "string" && typeof this.name != "string") return new Error("A query must have either text or a name. Supplying neither is unsupported.");
      let t2 = e.parsedStatements[this.name];
      return this.text && t2 && this.text !== t2 ? new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`) : this.values && !Array.isArray(this.values) ? new Error("Query values must be an array") : (this.requiresPreparation() ? this.prepare(e) : e.query(this.text), null);
    }
    hasBeenParsed(e) {
      return this.name && e.parsedStatements[this.name];
    }
    handlePortalSuspended(e) {
      this._getRows(e, this.rows);
    }
    _getRows(e, t2) {
      e.execute(
        { portal: this.portal, rows: t2 }
      ), t2 ? e.flush() : e.sync();
    }
    prepare(e) {
      this.isPreparedStatement = true, this.hasBeenParsed(e) || e.parse({ text: this.text, name: this.name, types: this.types });
      try {
        e.bind({ portal: this.portal, statement: this.name, values: this.values, binary: this.binary, valueMapper: ps.prepareValue });
      } catch (t2) {
        this.handleError(t2, e);
        return;
      }
      e.describe(
        { type: "P", name: this.portal || "" }
      ), this._getRows(e, this.rows);
    }
    handleCopyInResponse(e) {
      e.sendCopyFail("No source stream defined");
    }
    handleCopyData(e, t2) {
    }
  };
  a(_r, "Query");
  var vr = _r;
  ds.exports = vr;
});
var ws = {};
se(ws, { Socket: () => _e, isIP: () => ku });
function ku(r2) {
  return 0;
}
var gs;
var ms;
var v;
var _e;
var St = z(() => {
  "use strict";
  p2();
  gs = Te(ge(), 1);
  a(ku, "isIP");
  ms = /^[^.]+\./, v = class v2 extends gs.EventEmitter {
    constructor() {
      super(...arguments);
      _(this, "opts", {});
      _(this, "connecting", false);
      _(this, "pending", true);
      _(this, "writable", true);
      _(this, "encrypted", false);
      _(this, "authorized", false);
      _(this, "destroyed", false);
      _(this, "ws", null);
      _(this, "writeBuffer");
      _(this, "tlsState", 0);
      _(
        this,
        "tlsRead"
      );
      _(this, "tlsWrite");
    }
    static get poolQueryViaFetch() {
      return v2.opts.poolQueryViaFetch ?? v2.defaults.poolQueryViaFetch;
    }
    static set poolQueryViaFetch(t2) {
      v2.opts.poolQueryViaFetch = t2;
    }
    static get fetchEndpoint() {
      return v2.opts.fetchEndpoint ?? v2.defaults.fetchEndpoint;
    }
    static set fetchEndpoint(t2) {
      v2.opts.fetchEndpoint = t2;
    }
    static get fetchConnectionCache() {
      return true;
    }
    static set fetchConnectionCache(t2) {
      console.warn("The `fetchConnectionCache` option is deprecated (now always `true`)");
    }
    static get fetchFunction() {
      return v2.opts.fetchFunction ?? v2.defaults.fetchFunction;
    }
    static set fetchFunction(t2) {
      v2.opts.fetchFunction = t2;
    }
    static get webSocketConstructor() {
      return v2.opts.webSocketConstructor ?? v2.defaults.webSocketConstructor;
    }
    static set webSocketConstructor(t2) {
      v2.opts.webSocketConstructor = t2;
    }
    get webSocketConstructor() {
      return this.opts.webSocketConstructor ?? v2.webSocketConstructor;
    }
    set webSocketConstructor(t2) {
      this.opts.webSocketConstructor = t2;
    }
    static get wsProxy() {
      return v2.opts.wsProxy ?? v2.defaults.wsProxy;
    }
    static set wsProxy(t2) {
      v2.opts.wsProxy = t2;
    }
    get wsProxy() {
      return this.opts.wsProxy ?? v2.wsProxy;
    }
    set wsProxy(t2) {
      this.opts.wsProxy = t2;
    }
    static get coalesceWrites() {
      return v2.opts.coalesceWrites ?? v2.defaults.coalesceWrites;
    }
    static set coalesceWrites(t2) {
      v2.opts.coalesceWrites = t2;
    }
    get coalesceWrites() {
      return this.opts.coalesceWrites ?? v2.coalesceWrites;
    }
    set coalesceWrites(t2) {
      this.opts.coalesceWrites = t2;
    }
    static get useSecureWebSocket() {
      return v2.opts.useSecureWebSocket ?? v2.defaults.useSecureWebSocket;
    }
    static set useSecureWebSocket(t2) {
      v2.opts.useSecureWebSocket = t2;
    }
    get useSecureWebSocket() {
      return this.opts.useSecureWebSocket ?? v2.useSecureWebSocket;
    }
    set useSecureWebSocket(t2) {
      this.opts.useSecureWebSocket = t2;
    }
    static get forceDisablePgSSL() {
      return v2.opts.forceDisablePgSSL ?? v2.defaults.forceDisablePgSSL;
    }
    static set forceDisablePgSSL(t2) {
      v2.opts.forceDisablePgSSL = t2;
    }
    get forceDisablePgSSL() {
      return this.opts.forceDisablePgSSL ?? v2.forceDisablePgSSL;
    }
    set forceDisablePgSSL(t2) {
      this.opts.forceDisablePgSSL = t2;
    }
    static get disableSNI() {
      return v2.opts.disableSNI ?? v2.defaults.disableSNI;
    }
    static set disableSNI(t2) {
      v2.opts.disableSNI = t2;
    }
    get disableSNI() {
      return this.opts.disableSNI ?? v2.disableSNI;
    }
    set disableSNI(t2) {
      this.opts.disableSNI = t2;
    }
    static get pipelineConnect() {
      return v2.opts.pipelineConnect ?? v2.defaults.pipelineConnect;
    }
    static set pipelineConnect(t2) {
      v2.opts.pipelineConnect = t2;
    }
    get pipelineConnect() {
      return this.opts.pipelineConnect ?? v2.pipelineConnect;
    }
    set pipelineConnect(t2) {
      this.opts.pipelineConnect = t2;
    }
    static get subtls() {
      return v2.opts.subtls ?? v2.defaults.subtls;
    }
    static set subtls(t2) {
      v2.opts.subtls = t2;
    }
    get subtls() {
      return this.opts.subtls ?? v2.subtls;
    }
    set subtls(t2) {
      this.opts.subtls = t2;
    }
    static get pipelineTLS() {
      return v2.opts.pipelineTLS ?? v2.defaults.pipelineTLS;
    }
    static set pipelineTLS(t2) {
      v2.opts.pipelineTLS = t2;
    }
    get pipelineTLS() {
      return this.opts.pipelineTLS ?? v2.pipelineTLS;
    }
    set pipelineTLS(t2) {
      this.opts.pipelineTLS = t2;
    }
    static get rootCerts() {
      return v2.opts.rootCerts ?? v2.defaults.rootCerts;
    }
    static set rootCerts(t2) {
      v2.opts.rootCerts = t2;
    }
    get rootCerts() {
      return this.opts.rootCerts ?? v2.rootCerts;
    }
    set rootCerts(t2) {
      this.opts.rootCerts = t2;
    }
    wsProxyAddrForHost(t2, n) {
      let i = this.wsProxy;
      if (i === void 0) throw new Error("No WebSocket proxy is configured. Please see https://github.com/neondatabase/serverless/blob/main/CONFIG.md#wsproxy-string--host-string-port-number--string--string");
      return typeof i == "function" ? i(t2, n) : `${i}?address=${t2}:${n}`;
    }
    setNoDelay() {
      return this;
    }
    setKeepAlive() {
      return this;
    }
    ref() {
      return this;
    }
    unref() {
      return this;
    }
    connect(t2, n, i) {
      this.connecting = true, i && this.once("connect", i);
      let s = a(() => {
        this.connecting = false, this.pending = false, this.emit("connect"), this.emit("ready");
      }, "handleWebSocketOpen"), o2 = a((c, h2 = false) => {
        c.binaryType = "arraybuffer", c.addEventListener("error", (l) => {
          this.emit("error", l), this.emit("close");
        }), c.addEventListener("message", (l) => {
          if (this.tlsState === 0) {
            let d = y.from(l.data);
            this.emit(
              "data",
              d
            );
          }
        }), c.addEventListener("close", () => {
          this.emit("close");
        }), h2 ? s() : c.addEventListener(
          "open",
          s
        );
      }, "configureWebSocket"), u2;
      try {
        u2 = this.wsProxyAddrForHost(n, typeof t2 == "string" ? parseInt(t2, 10) : t2);
      } catch (c) {
        this.emit("error", c), this.emit("close");
        return;
      }
      try {
        let h2 = (this.useSecureWebSocket ? "wss:" : "ws:") + "//" + u2;
        if (this.webSocketConstructor !== void 0) this.ws = new this.webSocketConstructor(h2), o2(this.ws);
        else try {
          this.ws = new WebSocket(
            h2
          ), o2(this.ws);
        } catch {
          this.ws = new __unstable_WebSocket(h2), o2(this.ws);
        }
      } catch (c) {
        let l = (this.useSecureWebSocket ? "https:" : "http:") + "//" + u2;
        fetch(l, { headers: { Upgrade: "websocket" } }).then((d) => {
          if (this.ws = d.webSocket, this.ws == null) throw c;
          this.ws.accept(), o2(
            this.ws,
            true
          );
        }).catch((d) => {
          this.emit("error", new Error(`All attempts to open a WebSocket to connect to the database failed. Please refer to https://github.com/neondatabase/serverless/blob/main/CONFIG.md#websocketconstructor-typeof-websocket--undefined. Details: ${d.message}`)), this.emit("close");
        });
      }
    }
    async startTls(t2) {
      if (this.subtls === void 0) throw new Error("For Postgres SSL connections, you must set `neonConfig.subtls` to the subtls library. See https://github.com/neondatabase/serverless/blob/main/CONFIG.md for more information.");
      this.tlsState = 1;
      let n = this.subtls.TrustedCert.fromPEM(this.rootCerts), i = new this.subtls.WebSocketReadQueue(this.ws), s = i.read.bind(
        i
      ), o2 = this.rawWrite.bind(this), [u2, c] = await this.subtls.startTls(t2, n, s, o2, { useSNI: !this.disableSNI, expectPreData: this.pipelineTLS ? new Uint8Array([83]) : void 0 });
      this.tlsRead = u2, this.tlsWrite = c, this.tlsState = 2, this.encrypted = true, this.authorized = true, this.emit(
        "secureConnection",
        this
      ), this.tlsReadLoop();
    }
    async tlsReadLoop() {
      for (; ; ) {
        let t2 = await this.tlsRead();
        if (t2 === void 0) break;
        {
          let n = y.from(t2);
          this.emit("data", n);
        }
      }
    }
    rawWrite(t2) {
      if (!this.coalesceWrites) {
        this.ws.send(t2);
        return;
      }
      if (this.writeBuffer === void 0) this.writeBuffer = t2, setTimeout(
        () => {
          this.ws.send(this.writeBuffer), this.writeBuffer = void 0;
        },
        0
      );
      else {
        let n = new Uint8Array(this.writeBuffer.length + t2.length);
        n.set(this.writeBuffer), n.set(t2, this.writeBuffer.length), this.writeBuffer = n;
      }
    }
    write(t2, n = "utf8", i = (s) => {
    }) {
      return t2.length === 0 ? (i(), true) : (typeof t2 == "string" && (t2 = y.from(t2, n)), this.tlsState === 0 ? (this.rawWrite(t2), i()) : this.tlsState === 1 ? this.once("secureConnection", () => {
        this.write(
          t2,
          n,
          i
        );
      }) : (this.tlsWrite(t2), i()), true);
    }
    end(t2 = y.alloc(0), n = "utf8", i = () => {
    }) {
      return this.write(t2, n, () => {
        this.ws.close(), i();
      }), this;
    }
    destroy() {
      return this.destroyed = true, this.end();
    }
  };
  a(v, "Socket"), _(v, "defaults", {
    poolQueryViaFetch: false,
    fetchEndpoint: a((t2, n, i) => {
      let s;
      return i?.jwtAuth ? s = t2.replace(ms, "apiauth.") : s = t2.replace(ms, "api."), "https://" + s + "/sql";
    }, "fetchEndpoint"),
    fetchConnectionCache: true,
    fetchFunction: void 0,
    webSocketConstructor: void 0,
    wsProxy: a((t2) => t2 + "/v2", "wsProxy"),
    useSecureWebSocket: true,
    forceDisablePgSSL: true,
    coalesceWrites: true,
    pipelineConnect: "password",
    subtls: void 0,
    rootCerts: "",
    pipelineTLS: false,
    disableSNI: false
  }), _(v, "opts", {});
  _e = v;
});
var Xr = I((T) => {
  "use strict";
  p2();
  Object.defineProperty(T, "__esModule", { value: true });
  T.NoticeMessage = T.DataRowMessage = T.CommandCompleteMessage = T.ReadyForQueryMessage = T.NotificationResponseMessage = T.BackendKeyDataMessage = T.AuthenticationMD5Password = T.ParameterStatusMessage = T.ParameterDescriptionMessage = T.RowDescriptionMessage = T.Field = T.CopyResponse = T.CopyDataMessage = T.DatabaseError = T.copyDone = T.emptyQuery = T.replicationStart = T.portalSuspended = T.noData = T.closeComplete = T.bindComplete = T.parseComplete = void 0;
  T.parseComplete = { name: "parseComplete", length: 5 };
  T.bindComplete = { name: "bindComplete", length: 5 };
  T.closeComplete = { name: "closeComplete", length: 5 };
  T.noData = { name: "noData", length: 5 };
  T.portalSuspended = { name: "portalSuspended", length: 5 };
  T.replicationStart = { name: "replicationStart", length: 4 };
  T.emptyQuery = { name: "emptyQuery", length: 4 };
  T.copyDone = { name: "copyDone", length: 4 };
  var Nr = class Nr extends Error {
    constructor(e, t2, n) {
      super(
        e
      ), this.length = t2, this.name = n;
    }
  };
  a(Nr, "DatabaseError");
  var Ar = Nr;
  T.DatabaseError = Ar;
  var qr = class qr {
    constructor(e, t2) {
      this.length = e, this.chunk = t2, this.name = "copyData";
    }
  };
  a(qr, "CopyDataMessage");
  var Cr = qr;
  T.CopyDataMessage = Cr;
  var Qr = class Qr {
    constructor(e, t2, n, i) {
      this.length = e, this.name = t2, this.binary = n, this.columnTypes = new Array(i);
    }
  };
  a(Qr, "CopyResponse");
  var Tr = Qr;
  T.CopyResponse = Tr;
  var jr = class jr {
    constructor(e, t2, n, i, s, o2, u2) {
      this.name = e, this.tableID = t2, this.columnID = n, this.dataTypeID = i, this.dataTypeSize = s, this.dataTypeModifier = o2, this.format = u2;
    }
  };
  a(jr, "Field");
  var Ir = jr;
  T.Field = Ir;
  var Wr = class Wr {
    constructor(e, t2) {
      this.length = e, this.fieldCount = t2, this.name = "rowDescription", this.fields = new Array(
        this.fieldCount
      );
    }
  };
  a(Wr, "RowDescriptionMessage");
  var Pr = Wr;
  T.RowDescriptionMessage = Pr;
  var Hr = class Hr {
    constructor(e, t2) {
      this.length = e, this.parameterCount = t2, this.name = "parameterDescription", this.dataTypeIDs = new Array(this.parameterCount);
    }
  };
  a(Hr, "ParameterDescriptionMessage");
  var Br = Hr;
  T.ParameterDescriptionMessage = Br;
  var Gr = class Gr {
    constructor(e, t2, n) {
      this.length = e, this.parameterName = t2, this.parameterValue = n, this.name = "parameterStatus";
    }
  };
  a(Gr, "ParameterStatusMessage");
  var Lr = Gr;
  T.ParameterStatusMessage = Lr;
  var $r = class $r {
    constructor(e, t2) {
      this.length = e, this.salt = t2, this.name = "authenticationMD5Password";
    }
  };
  a($r, "AuthenticationMD5Password");
  var Rr = $r;
  T.AuthenticationMD5Password = Rr;
  var Vr = class Vr {
    constructor(e, t2, n) {
      this.length = e, this.processID = t2, this.secretKey = n, this.name = "backendKeyData";
    }
  };
  a(
    Vr,
    "BackendKeyDataMessage"
  );
  var Fr = Vr;
  T.BackendKeyDataMessage = Fr;
  var Kr = class Kr {
    constructor(e, t2, n, i) {
      this.length = e, this.processId = t2, this.channel = n, this.payload = i, this.name = "notification";
    }
  };
  a(Kr, "NotificationResponseMessage");
  var Mr = Kr;
  T.NotificationResponseMessage = Mr;
  var zr = class zr {
    constructor(e, t2) {
      this.length = e, this.status = t2, this.name = "readyForQuery";
    }
  };
  a(zr, "ReadyForQueryMessage");
  var Dr = zr;
  T.ReadyForQueryMessage = Dr;
  var Yr = class Yr {
    constructor(e, t2) {
      this.length = e, this.text = t2, this.name = "commandComplete";
    }
  };
  a(Yr, "CommandCompleteMessage");
  var kr = Yr;
  T.CommandCompleteMessage = kr;
  var Zr = class Zr {
    constructor(e, t2) {
      this.length = e, this.fields = t2, this.name = "dataRow", this.fieldCount = t2.length;
    }
  };
  a(Zr, "DataRowMessage");
  var Ur = Zr;
  T.DataRowMessage = Ur;
  var Jr = class Jr {
    constructor(e, t2) {
      this.length = e, this.message = t2, this.name = "notice";
    }
  };
  a(Jr, "NoticeMessage");
  var Or = Jr;
  T.NoticeMessage = Or;
});
var bs = I((xt) => {
  "use strict";
  p2();
  Object.defineProperty(xt, "__esModule", { value: true });
  xt.Writer = void 0;
  var tn = class tn {
    constructor(e = 256) {
      this.size = e, this.offset = 5, this.headerPosition = 0, this.buffer = y.allocUnsafe(e);
    }
    ensure(e) {
      var t2 = this.buffer.length - this.offset;
      if (t2 < e) {
        var n = this.buffer, i = n.length + (n.length >> 1) + e;
        this.buffer = y.allocUnsafe(
          i
        ), n.copy(this.buffer);
      }
    }
    addInt32(e) {
      return this.ensure(4), this.buffer[this.offset++] = e >>> 24 & 255, this.buffer[this.offset++] = e >>> 16 & 255, this.buffer[this.offset++] = e >>> 8 & 255, this.buffer[this.offset++] = e >>> 0 & 255, this;
    }
    addInt16(e) {
      return this.ensure(2), this.buffer[this.offset++] = e >>> 8 & 255, this.buffer[this.offset++] = e >>> 0 & 255, this;
    }
    addCString(e) {
      if (!e) this.ensure(1);
      else {
        var t2 = y.byteLength(e);
        this.ensure(t2 + 1), this.buffer.write(
          e,
          this.offset,
          "utf-8"
        ), this.offset += t2;
      }
      return this.buffer[this.offset++] = 0, this;
    }
    addString(e = "") {
      var t2 = y.byteLength(e);
      return this.ensure(t2), this.buffer.write(e, this.offset), this.offset += t2, this;
    }
    add(e) {
      return this.ensure(e.length), e.copy(this.buffer, this.offset), this.offset += e.length, this;
    }
    join(e) {
      if (e) {
        this.buffer[this.headerPosition] = e;
        let t2 = this.offset - (this.headerPosition + 1);
        this.buffer.writeInt32BE(t2, this.headerPosition + 1);
      }
      return this.buffer.slice(e ? 0 : 5, this.offset);
    }
    flush(e) {
      var t2 = this.join(e);
      return this.offset = 5, this.headerPosition = 0, this.buffer = y.allocUnsafe(this.size), t2;
    }
  };
  a(tn, "Writer");
  var en = tn;
  xt.Writer = en;
});
var xs = I((vt) => {
  "use strict";
  p2();
  Object.defineProperty(vt, "__esModule", { value: true });
  vt.serialize = void 0;
  var rn = bs(), M = new rn.Writer(), Uu = a((r2) => {
    M.addInt16(3).addInt16(
      0
    );
    for (let n of Object.keys(r2)) M.addCString(n).addCString(r2[n]);
    M.addCString("client_encoding").addCString("UTF8");
    var e = M.addCString("").flush(), t2 = e.length + 4;
    return new rn.Writer().addInt32(t2).add(e).flush();
  }, "startup"), Ou = a(() => {
    let r2 = y.allocUnsafe(8);
    return r2.writeInt32BE(8, 0), r2.writeInt32BE(80877103, 4), r2;
  }, "requestSsl"), Nu = a((r2) => M.addCString(r2).flush(112), "password"), qu = a(function(r2, e) {
    return M.addCString(r2).addInt32(
      y.byteLength(e)
    ).addString(e), M.flush(112);
  }, "sendSASLInitialResponseMessage"), Qu = a(
    function(r2) {
      return M.addString(r2).flush(112);
    },
    "sendSCRAMClientFinalMessage"
  ), ju = a(
    (r2) => M.addCString(r2).flush(81),
    "query"
  ), Ss = [], Wu = a((r2) => {
    let e = r2.name || "";
    e.length > 63 && (console.error("Warning! Postgres only supports 63 characters for query names."), console.error("You supplied %s (%s)", e, e.length), console.error("This can cause conflicts and silent errors executing queries"));
    let t2 = r2.types || Ss;
    for (var n = t2.length, i = M.addCString(e).addCString(r2.text).addInt16(n), s = 0; s < n; s++) i.addInt32(t2[s]);
    return M.flush(80);
  }, "parse"), Oe = new rn.Writer(), Hu = a(function(r2, e) {
    for (let t2 = 0; t2 < r2.length; t2++) {
      let n = e ? e(r2[t2], t2) : r2[t2];
      n == null ? (M.addInt16(0), Oe.addInt32(-1)) : n instanceof y ? (M.addInt16(1), Oe.addInt32(n.length), Oe.add(n)) : (M.addInt16(0), Oe.addInt32(y.byteLength(
        n
      )), Oe.addString(n));
    }
  }, "writeValues"), Gu = a((r2 = {}) => {
    let e = r2.portal || "", t2 = r2.statement || "", n = r2.binary || false, i = r2.values || Ss, s = i.length;
    return M.addCString(e).addCString(t2), M.addInt16(s), Hu(i, r2.valueMapper), M.addInt16(s), M.add(Oe.flush()), M.addInt16(n ? 1 : 0), M.flush(66);
  }, "bind"), $u = y.from([69, 0, 0, 0, 9, 0, 0, 0, 0, 0]), Vu = a((r2) => {
    if (!r2 || !r2.portal && !r2.rows) return $u;
    let e = r2.portal || "", t2 = r2.rows || 0, n = y.byteLength(e), i = 4 + n + 1 + 4, s = y.allocUnsafe(1 + i);
    return s[0] = 69, s.writeInt32BE(i, 1), s.write(e, 5, "utf-8"), s[n + 5] = 0, s.writeUInt32BE(t2, s.length - 4), s;
  }, "execute"), Ku = a((r2, e) => {
    let t2 = y.allocUnsafe(16);
    return t2.writeInt32BE(16, 0), t2.writeInt16BE(1234, 4), t2.writeInt16BE(5678, 6), t2.writeInt32BE(
      r2,
      8
    ), t2.writeInt32BE(e, 12), t2;
  }, "cancel"), nn = a(
    (r2, e) => {
      let n = 4 + y.byteLength(e) + 1, i = y.allocUnsafe(1 + n);
      return i[0] = r2, i.writeInt32BE(n, 1), i.write(e, 5, "utf-8"), i[n] = 0, i;
    },
    "cstringMessage"
  ), zu = M.addCString("P").flush(68), Yu = M.addCString("S").flush(68), Zu = a((r2) => r2.name ? nn(68, `${r2.type}${r2.name || ""}`) : r2.type === "P" ? zu : Yu, "describe"), Ju = a(
    (r2) => {
      let e = `${r2.type}${r2.name || ""}`;
      return nn(67, e);
    },
    "close"
  ), Xu = a((r2) => M.add(r2).flush(
    100
  ), "copyData"), ec = a((r2) => nn(102, r2), "copyFail"), Et = a((r2) => y.from([r2, 0, 0, 0, 4]), "codeOnlyBuffer"), tc = Et(72), rc = Et(83), nc = Et(88), ic = Et(99), sc = {
    startup: Uu,
    password: Nu,
    requestSsl: Ou,
    sendSASLInitialResponseMessage: qu,
    sendSCRAMClientFinalMessage: Qu,
    query: ju,
    parse: Wu,
    bind: Gu,
    execute: Vu,
    describe: Zu,
    close: Ju,
    flush: a(() => tc, "flush"),
    sync: a(
      () => rc,
      "sync"
    ),
    end: a(() => nc, "end"),
    copyData: Xu,
    copyDone: a(() => ic, "copyDone"),
    copyFail: ec,
    cancel: Ku
  };
  vt.serialize = sc;
});
var Es = I((_t) => {
  "use strict";
  p2();
  Object.defineProperty(_t, "__esModule", { value: true });
  _t.BufferReader = void 0;
  var oc = y.allocUnsafe(0), on = class on {
    constructor(e = 0) {
      this.offset = e, this.buffer = oc, this.encoding = "utf-8";
    }
    setBuffer(e, t2) {
      this.offset = e, this.buffer = t2;
    }
    int16() {
      let e = this.buffer.readInt16BE(this.offset);
      return this.offset += 2, e;
    }
    byte() {
      let e = this.buffer[this.offset];
      return this.offset++, e;
    }
    int32() {
      let e = this.buffer.readInt32BE(this.offset);
      return this.offset += 4, e;
    }
    string(e) {
      let t2 = this.buffer.toString(this.encoding, this.offset, this.offset + e);
      return this.offset += e, t2;
    }
    cstring() {
      let e = this.offset, t2 = e;
      for (; this.buffer[t2++] !== 0; ) ;
      return this.offset = t2, this.buffer.toString(this.encoding, e, t2 - 1);
    }
    bytes(e) {
      let t2 = this.buffer.slice(this.offset, this.offset + e);
      return this.offset += e, t2;
    }
  };
  a(on, "BufferReader");
  var sn = on;
  _t.BufferReader = sn;
});
var As = I((At) => {
  "use strict";
  p2();
  Object.defineProperty(At, "__esModule", { value: true });
  At.Parser = void 0;
  var D = Xr(), ac = Es(), an = 1, uc = 4, vs = an + uc, _s = y.allocUnsafe(0), cn = class cn {
    constructor(e) {
      if (this.buffer = _s, this.bufferLength = 0, this.bufferOffset = 0, this.reader = new ac.BufferReader(), e?.mode === "binary") throw new Error("Binary mode not supported yet");
      this.mode = e?.mode || "text";
    }
    parse(e, t2) {
      this.mergeBuffer(e);
      let n = this.bufferOffset + this.bufferLength, i = this.bufferOffset;
      for (; i + vs <= n; ) {
        let s = this.buffer[i], o2 = this.buffer.readUInt32BE(
          i + an
        ), u2 = an + o2;
        if (u2 + i <= n) {
          let c = this.handlePacket(i + vs, s, o2, this.buffer);
          t2(c), i += u2;
        } else
          break;
      }
      i === n ? (this.buffer = _s, this.bufferLength = 0, this.bufferOffset = 0) : (this.bufferLength = n - i, this.bufferOffset = i);
    }
    mergeBuffer(e) {
      if (this.bufferLength > 0) {
        let t2 = this.bufferLength + e.byteLength;
        if (t2 + this.bufferOffset > this.buffer.byteLength) {
          let i;
          if (t2 <= this.buffer.byteLength && this.bufferOffset >= this.bufferLength) i = this.buffer;
          else {
            let s = this.buffer.byteLength * 2;
            for (; t2 >= s; ) s *= 2;
            i = y.allocUnsafe(s);
          }
          this.buffer.copy(
            i,
            0,
            this.bufferOffset,
            this.bufferOffset + this.bufferLength
          ), this.buffer = i, this.bufferOffset = 0;
        }
        e.copy(this.buffer, this.bufferOffset + this.bufferLength), this.bufferLength = t2;
      } else this.buffer = e, this.bufferOffset = 0, this.bufferLength = e.byteLength;
    }
    handlePacket(e, t2, n, i) {
      switch (t2) {
        case 50:
          return D.bindComplete;
        case 49:
          return D.parseComplete;
        case 51:
          return D.closeComplete;
        case 110:
          return D.noData;
        case 115:
          return D.portalSuspended;
        case 99:
          return D.copyDone;
        case 87:
          return D.replicationStart;
        case 73:
          return D.emptyQuery;
        case 68:
          return this.parseDataRowMessage(
            e,
            n,
            i
          );
        case 67:
          return this.parseCommandCompleteMessage(e, n, i);
        case 90:
          return this.parseReadyForQueryMessage(e, n, i);
        case 65:
          return this.parseNotificationMessage(
            e,
            n,
            i
          );
        case 82:
          return this.parseAuthenticationResponse(e, n, i);
        case 83:
          return this.parseParameterStatusMessage(e, n, i);
        case 75:
          return this.parseBackendKeyData(e, n, i);
        case 69:
          return this.parseErrorMessage(e, n, i, "error");
        case 78:
          return this.parseErrorMessage(
            e,
            n,
            i,
            "notice"
          );
        case 84:
          return this.parseRowDescriptionMessage(e, n, i);
        case 116:
          return this.parseParameterDescriptionMessage(e, n, i);
        case 71:
          return this.parseCopyInMessage(
            e,
            n,
            i
          );
        case 72:
          return this.parseCopyOutMessage(e, n, i);
        case 100:
          return this.parseCopyData(
            e,
            n,
            i
          );
        default:
          return new D.DatabaseError("received invalid response: " + t2.toString(
            16
          ), n, "error");
      }
    }
    parseReadyForQueryMessage(e, t2, n) {
      this.reader.setBuffer(e, n);
      let i = this.reader.string(1);
      return new D.ReadyForQueryMessage(t2, i);
    }
    parseCommandCompleteMessage(e, t2, n) {
      this.reader.setBuffer(e, n);
      let i = this.reader.cstring();
      return new D.CommandCompleteMessage(
        t2,
        i
      );
    }
    parseCopyData(e, t2, n) {
      let i = n.slice(e, e + (t2 - 4));
      return new D.CopyDataMessage(
        t2,
        i
      );
    }
    parseCopyInMessage(e, t2, n) {
      return this.parseCopyMessage(e, t2, n, "copyInResponse");
    }
    parseCopyOutMessage(e, t2, n) {
      return this.parseCopyMessage(e, t2, n, "copyOutResponse");
    }
    parseCopyMessage(e, t2, n, i) {
      this.reader.setBuffer(e, n);
      let s = this.reader.byte() !== 0, o2 = this.reader.int16(), u2 = new D.CopyResponse(t2, i, s, o2);
      for (let c = 0; c < o2; c++) u2.columnTypes[c] = this.reader.int16();
      return u2;
    }
    parseNotificationMessage(e, t2, n) {
      this.reader.setBuffer(
        e,
        n
      );
      let i = this.reader.int32(), s = this.reader.cstring(), o2 = this.reader.cstring();
      return new D.NotificationResponseMessage(t2, i, s, o2);
    }
    parseRowDescriptionMessage(e, t2, n) {
      this.reader.setBuffer(e, n);
      let i = this.reader.int16(), s = new D.RowDescriptionMessage(t2, i);
      for (let o2 = 0; o2 < i; o2++) s.fields[o2] = this.parseField();
      return s;
    }
    parseField() {
      let e = this.reader.cstring(), t2 = this.reader.int32(), n = this.reader.int16(), i = this.reader.int32(), s = this.reader.int16(), o2 = this.reader.int32(), u2 = this.reader.int16() === 0 ? "text" : "binary";
      return new D.Field(e, t2, n, i, s, o2, u2);
    }
    parseParameterDescriptionMessage(e, t2, n) {
      this.reader.setBuffer(
        e,
        n
      );
      let i = this.reader.int16(), s = new D.ParameterDescriptionMessage(t2, i);
      for (let o2 = 0; o2 < i; o2++) s.dataTypeIDs[o2] = this.reader.int32();
      return s;
    }
    parseDataRowMessage(e, t2, n) {
      this.reader.setBuffer(e, n);
      let i = this.reader.int16(), s = new Array(i);
      for (let o2 = 0; o2 < i; o2++) {
        let u2 = this.reader.int32();
        s[o2] = u2 === -1 ? null : this.reader.string(u2);
      }
      return new D.DataRowMessage(
        t2,
        s
      );
    }
    parseParameterStatusMessage(e, t2, n) {
      this.reader.setBuffer(e, n);
      let i = this.reader.cstring(), s = this.reader.cstring();
      return new D.ParameterStatusMessage(t2, i, s);
    }
    parseBackendKeyData(e, t2, n) {
      this.reader.setBuffer(e, n);
      let i = this.reader.int32(), s = this.reader.int32();
      return new D.BackendKeyDataMessage(t2, i, s);
    }
    parseAuthenticationResponse(e, t2, n) {
      this.reader.setBuffer(
        e,
        n
      );
      let i = this.reader.int32(), s = { name: "authenticationOk", length: t2 };
      switch (i) {
        case 0:
          break;
        case 3:
          s.length === 8 && (s.name = "authenticationCleartextPassword");
          break;
        case 5:
          if (s.length === 12) {
            s.name = "authenticationMD5Password";
            let u2 = this.reader.bytes(4);
            return new D.AuthenticationMD5Password(t2, u2);
          }
          break;
        case 10:
          s.name = "authenticationSASL", s.mechanisms = [];
          let o2;
          do
            o2 = this.reader.cstring(), o2 && s.mechanisms.push(o2);
          while (o2);
          break;
        case 11:
          s.name = "authenticationSASLContinue", s.data = this.reader.string(t2 - 8);
          break;
        case 12:
          s.name = "authenticationSASLFinal", s.data = this.reader.string(t2 - 8);
          break;
        default:
          throw new Error("Unknown authenticationOk message type " + i);
      }
      return s;
    }
    parseErrorMessage(e, t2, n, i) {
      this.reader.setBuffer(e, n);
      let s = {}, o2 = this.reader.string(1);
      for (; o2 !== "\0"; ) s[o2] = this.reader.cstring(), o2 = this.reader.string(1);
      let u2 = s.M, c = i === "notice" ? new D.NoticeMessage(
        t2,
        u2
      ) : new D.DatabaseError(u2, t2, i);
      return c.severity = s.S, c.code = s.C, c.detail = s.D, c.hint = s.H, c.position = s.P, c.internalPosition = s.p, c.internalQuery = s.q, c.where = s.W, c.schema = s.s, c.table = s.t, c.column = s.c, c.dataType = s.d, c.constraint = s.n, c.file = s.F, c.line = s.L, c.routine = s.R, c;
    }
  };
  a(cn, "Parser");
  var un = cn;
  At.Parser = un;
});
var hn = I((be) => {
  "use strict";
  p2();
  Object.defineProperty(be, "__esModule", { value: true });
  be.DatabaseError = be.serialize = be.parse = void 0;
  var cc = Xr();
  Object.defineProperty(
    be,
    "DatabaseError",
    { enumerable: true, get: a(function() {
      return cc.DatabaseError;
    }, "get") }
  );
  var hc = xs();
  Object.defineProperty(be, "serialize", { enumerable: true, get: a(function() {
    return hc.serialize;
  }, "get") });
  var lc = As();
  function fc(r2, e) {
    let t2 = new lc.Parser();
    return r2.on("data", (n) => t2.parse(n, e)), new Promise((n) => r2.on("end", () => n()));
  }
  a(fc, "parse");
  be.parse = fc;
});
var Cs = {};
se(Cs, { connect: () => pc });
function pc({ socket: r2, servername: e }) {
  return r2.startTls(e), r2;
}
var Ts = z(() => {
  "use strict";
  p2();
  a(pc, "connect");
});
var pn = I((of, Bs) => {
  "use strict";
  p2();
  var Is = (St(), O(ws)), dc = ge().EventEmitter, {
    parse: yc,
    serialize: q
  } = hn(), Ps = q.flush(), mc = q.sync(), gc = q.end(), fn = class fn extends dc {
    constructor(e) {
      super(), e = e || {}, this.stream = e.stream || new Is.Socket(), this._keepAlive = e.keepAlive, this._keepAliveInitialDelayMillis = e.keepAliveInitialDelayMillis, this.lastBuffer = false, this.parsedStatements = {}, this.ssl = e.ssl || false, this._ending = false, this._emitMessage = false;
      var t2 = this;
      this.on("newListener", function(n) {
        n === "message" && (t2._emitMessage = true);
      });
    }
    connect(e, t2) {
      var n = this;
      this._connecting = true, this.stream.setNoDelay(true), this.stream.connect(
        e,
        t2
      ), this.stream.once("connect", function() {
        n._keepAlive && n.stream.setKeepAlive(
          true,
          n._keepAliveInitialDelayMillis
        ), n.emit("connect");
      });
      let i = a(function(s) {
        n._ending && (s.code === "ECONNRESET" || s.code === "EPIPE") || n.emit("error", s);
      }, "reportStreamError");
      if (this.stream.on("error", i), this.stream.on("close", function() {
        n.emit("end");
      }), !this.ssl) return this.attachListeners(this.stream);
      this.stream.once("data", function(s) {
        var o2 = s.toString("utf8");
        switch (o2) {
          case "S":
            break;
          case "N":
            return n.stream.end(), n.emit("error", new Error("The server does not support SSL connections"));
          default:
            return n.stream.end(), n.emit("error", new Error("There was an error establishing an SSL connection"));
        }
        var u2 = (Ts(), O(Cs));
        let c = { socket: n.stream };
        n.ssl !== true && (Object.assign(
          c,
          n.ssl
        ), "key" in n.ssl && (c.key = n.ssl.key)), Is.isIP(t2) === 0 && (c.servername = t2);
        try {
          n.stream = u2.connect(c);
        } catch (h2) {
          return n.emit("error", h2);
        }
        n.attachListeners(n.stream), n.stream.on("error", i), n.emit("sslconnect");
      });
    }
    attachListeners(e) {
      e.on("end", () => {
        this.emit("end");
      }), yc(e, (t2) => {
        var n = t2.name === "error" ? "errorMessage" : t2.name;
        this._emitMessage && this.emit("message", t2), this.emit(n, t2);
      });
    }
    requestSsl() {
      this.stream.write(q.requestSsl());
    }
    startup(e) {
      this.stream.write(q.startup(e));
    }
    cancel(e, t2) {
      this._send(q.cancel(e, t2));
    }
    password(e) {
      this._send(q.password(e));
    }
    sendSASLInitialResponseMessage(e, t2) {
      this._send(q.sendSASLInitialResponseMessage(
        e,
        t2
      ));
    }
    sendSCRAMClientFinalMessage(e) {
      this._send(q.sendSCRAMClientFinalMessage(e));
    }
    _send(e) {
      return this.stream.writable ? this.stream.write(e) : false;
    }
    query(e) {
      this._send(q.query(
        e
      ));
    }
    parse(e) {
      this._send(q.parse(e));
    }
    bind(e) {
      this._send(q.bind(e));
    }
    execute(e) {
      this._send(q.execute(e));
    }
    flush() {
      this.stream.writable && this.stream.write(Ps);
    }
    sync() {
      this._ending = true, this._send(Ps), this._send(mc);
    }
    ref() {
      this.stream.ref();
    }
    unref() {
      this.stream.unref();
    }
    end() {
      if (this._ending = true, !this._connecting || !this.stream.writable) {
        this.stream.end();
        return;
      }
      return this.stream.write(gc, () => {
        this.stream.end();
      });
    }
    close(e) {
      this._send(q.close(e));
    }
    describe(e) {
      this._send(q.describe(e));
    }
    sendCopyFromChunk(e) {
      this._send(q.copyData(e));
    }
    endCopyFrom() {
      this._send(q.copyDone());
    }
    sendCopyFail(e) {
      this._send(q.copyFail(e));
    }
  };
  a(fn, "Connection");
  var ln = fn;
  Bs.exports = ln;
});
var Fs = I((hf, Rs) => {
  "use strict";
  p2();
  var wc = ge().EventEmitter, cf = (Ge(), O(He)), bc = tt(), dn = ji(), Sc = Xi(), xc = wt(), Ec = bt(), Ls = ys(), vc = et(), _c = pn(), yn = class yn extends wc {
    constructor(e) {
      super(), this.connectionParameters = new Ec(e), this.user = this.connectionParameters.user, this.database = this.connectionParameters.database, this.port = this.connectionParameters.port, this.host = this.connectionParameters.host, Object.defineProperty(this, "password", { configurable: true, enumerable: false, writable: true, value: this.connectionParameters.password }), this.replication = this.connectionParameters.replication;
      var t2 = e || {};
      this._Promise = t2.Promise || S.Promise, this._types = new xc(t2.types), this._ending = false, this._connecting = false, this._connected = false, this._connectionError = false, this._queryable = true, this.connection = t2.connection || new _c({ stream: t2.stream, ssl: this.connectionParameters.ssl, keepAlive: t2.keepAlive || false, keepAliveInitialDelayMillis: t2.keepAliveInitialDelayMillis || 0, encoding: this.connectionParameters.client_encoding || "utf8" }), this.queryQueue = [], this.binary = t2.binary || vc.binary, this.processID = null, this.secretKey = null, this.ssl = this.connectionParameters.ssl || false, this.ssl && this.ssl.key && Object.defineProperty(this.ssl, "key", { enumerable: false }), this._connectionTimeoutMillis = t2.connectionTimeoutMillis || 0;
    }
    _errorAllQueries(e) {
      let t2 = a(
        (n) => {
          m.nextTick(() => {
            n.handleError(e, this.connection);
          });
        },
        "enqueueError"
      );
      this.activeQuery && (t2(this.activeQuery), this.activeQuery = null), this.queryQueue.forEach(t2), this.queryQueue.length = 0;
    }
    _connect(e) {
      var t2 = this, n = this.connection;
      if (this._connectionCallback = e, this._connecting || this._connected) {
        let i = new Error("Client has already been connected. You cannot reuse a client.");
        m.nextTick(() => {
          e(i);
        });
        return;
      }
      this._connecting = true, this.connectionTimeoutHandle, this._connectionTimeoutMillis > 0 && (this.connectionTimeoutHandle = setTimeout(() => {
        n._ending = true, n.stream.destroy(new Error("timeout expired"));
      }, this._connectionTimeoutMillis)), this.host && this.host.indexOf("/") === 0 ? n.connect(this.host + "/.s.PGSQL." + this.port) : n.connect(this.port, this.host), n.on("connect", function() {
        t2.ssl ? n.requestSsl() : n.startup(t2.getStartupConf());
      }), n.on("sslconnect", function() {
        n.startup(t2.getStartupConf());
      }), this._attachListeners(n), n.once("end", () => {
        let i = this._ending ? new Error("Connection terminated") : new Error("Connection terminated unexpectedly");
        clearTimeout(this.connectionTimeoutHandle), this._errorAllQueries(i), this._ending || (this._connecting && !this._connectionError ? this._connectionCallback ? this._connectionCallback(i) : this._handleErrorEvent(i) : this._connectionError || this._handleErrorEvent(
          i
        )), m.nextTick(() => {
          this.emit("end");
        });
      });
    }
    connect(e) {
      if (e) {
        this._connect(e);
        return;
      }
      return new this._Promise((t2, n) => {
        this._connect((i) => {
          i ? n(i) : t2();
        });
      });
    }
    _attachListeners(e) {
      e.on("authenticationCleartextPassword", this._handleAuthCleartextPassword.bind(this)), e.on("authenticationMD5Password", this._handleAuthMD5Password.bind(this)), e.on("authenticationSASL", this._handleAuthSASL.bind(this)), e.on("authenticationSASLContinue", this._handleAuthSASLContinue.bind(this)), e.on("authenticationSASLFinal", this._handleAuthSASLFinal.bind(this)), e.on("backendKeyData", this._handleBackendKeyData.bind(this)), e.on("error", this._handleErrorEvent.bind(this)), e.on(
        "errorMessage",
        this._handleErrorMessage.bind(this)
      ), e.on("readyForQuery", this._handleReadyForQuery.bind(this)), e.on("notice", this._handleNotice.bind(this)), e.on("rowDescription", this._handleRowDescription.bind(this)), e.on("dataRow", this._handleDataRow.bind(this)), e.on("portalSuspended", this._handlePortalSuspended.bind(this)), e.on(
        "emptyQuery",
        this._handleEmptyQuery.bind(this)
      ), e.on("commandComplete", this._handleCommandComplete.bind(this)), e.on("parseComplete", this._handleParseComplete.bind(this)), e.on("copyInResponse", this._handleCopyInResponse.bind(this)), e.on("copyData", this._handleCopyData.bind(this)), e.on("notification", this._handleNotification.bind(this));
    }
    _checkPgPass(e) {
      let t2 = this.connection;
      typeof this.password == "function" ? this._Promise.resolve().then(
        () => this.password()
      ).then((n) => {
        if (n !== void 0) {
          if (typeof n != "string") {
            t2.emit("error", new TypeError("Password must be a string"));
            return;
          }
          this.connectionParameters.password = this.password = n;
        } else this.connectionParameters.password = this.password = null;
        e();
      }).catch((n) => {
        t2.emit("error", n);
      }) : this.password !== null ? e() : Sc(
        this.connectionParameters,
        (n) => {
          n !== void 0 && (this.connectionParameters.password = this.password = n), e();
        }
      );
    }
    _handleAuthCleartextPassword(e) {
      this._checkPgPass(() => {
        this.connection.password(this.password);
      });
    }
    _handleAuthMD5Password(e) {
      this._checkPgPass(() => {
        let t2 = bc.postgresMd5PasswordHash(
          this.user,
          this.password,
          e.salt
        );
        this.connection.password(t2);
      });
    }
    _handleAuthSASL(e) {
      this._checkPgPass(() => {
        this.saslSession = dn.startSession(e.mechanisms), this.connection.sendSASLInitialResponseMessage(
          this.saslSession.mechanism,
          this.saslSession.response
        );
      });
    }
    _handleAuthSASLContinue(e) {
      dn.continueSession(this.saslSession, this.password, e.data), this.connection.sendSCRAMClientFinalMessage(
        this.saslSession.response
      );
    }
    _handleAuthSASLFinal(e) {
      dn.finalizeSession(
        this.saslSession,
        e.data
      ), this.saslSession = null;
    }
    _handleBackendKeyData(e) {
      this.processID = e.processID, this.secretKey = e.secretKey;
    }
    _handleReadyForQuery(e) {
      this._connecting && (this._connecting = false, this._connected = true, clearTimeout(this.connectionTimeoutHandle), this._connectionCallback && (this._connectionCallback(null, this), this._connectionCallback = null), this.emit("connect"));
      let { activeQuery: t2 } = this;
      this.activeQuery = null, this.readyForQuery = true, t2 && t2.handleReadyForQuery(this.connection), this._pulseQueryQueue();
    }
    _handleErrorWhileConnecting(e) {
      if (!this._connectionError) {
        if (this._connectionError = true, clearTimeout(this.connectionTimeoutHandle), this._connectionCallback) return this._connectionCallback(e);
        this.emit("error", e);
      }
    }
    _handleErrorEvent(e) {
      if (this._connecting) return this._handleErrorWhileConnecting(e);
      this._queryable = false, this._errorAllQueries(e), this.emit("error", e);
    }
    _handleErrorMessage(e) {
      if (this._connecting)
        return this._handleErrorWhileConnecting(e);
      let t2 = this.activeQuery;
      if (!t2) {
        this._handleErrorEvent(
          e
        );
        return;
      }
      this.activeQuery = null, t2.handleError(e, this.connection);
    }
    _handleRowDescription(e) {
      this.activeQuery.handleRowDescription(e);
    }
    _handleDataRow(e) {
      this.activeQuery.handleDataRow(
        e
      );
    }
    _handlePortalSuspended(e) {
      this.activeQuery.handlePortalSuspended(this.connection);
    }
    _handleEmptyQuery(e) {
      this.activeQuery.handleEmptyQuery(this.connection);
    }
    _handleCommandComplete(e) {
      this.activeQuery.handleCommandComplete(e, this.connection);
    }
    _handleParseComplete(e) {
      this.activeQuery.name && (this.connection.parsedStatements[this.activeQuery.name] = this.activeQuery.text);
    }
    _handleCopyInResponse(e) {
      this.activeQuery.handleCopyInResponse(
        this.connection
      );
    }
    _handleCopyData(e) {
      this.activeQuery.handleCopyData(e, this.connection);
    }
    _handleNotification(e) {
      this.emit("notification", e);
    }
    _handleNotice(e) {
      this.emit("notice", e);
    }
    getStartupConf() {
      var e = this.connectionParameters, t2 = { user: e.user, database: e.database }, n = e.application_name || e.fallback_application_name;
      return n && (t2.application_name = n), e.replication && (t2.replication = "" + e.replication), e.statement_timeout && (t2.statement_timeout = String(parseInt(
        e.statement_timeout,
        10
      ))), e.lock_timeout && (t2.lock_timeout = String(parseInt(e.lock_timeout, 10))), e.idle_in_transaction_session_timeout && (t2.idle_in_transaction_session_timeout = String(parseInt(
        e.idle_in_transaction_session_timeout,
        10
      ))), e.options && (t2.options = e.options), t2;
    }
    cancel(e, t2) {
      if (e.activeQuery === t2) {
        var n = this.connection;
        this.host && this.host.indexOf("/") === 0 ? n.connect(this.host + "/.s.PGSQL." + this.port) : n.connect(this.port, this.host), n.on("connect", function() {
          n.cancel(
            e.processID,
            e.secretKey
          );
        });
      } else e.queryQueue.indexOf(t2) !== -1 && e.queryQueue.splice(e.queryQueue.indexOf(t2), 1);
    }
    setTypeParser(e, t2, n) {
      return this._types.setTypeParser(e, t2, n);
    }
    getTypeParser(e, t2) {
      return this._types.getTypeParser(e, t2);
    }
    escapeIdentifier(e) {
      return '"' + e.replace(
        /"/g,
        '""'
      ) + '"';
    }
    escapeLiteral(e) {
      for (var t2 = false, n = "'", i = 0; i < e.length; i++) {
        var s = e[i];
        s === "'" ? n += s + s : s === "\\" ? (n += s + s, t2 = true) : n += s;
      }
      return n += "'", t2 === true && (n = " E" + n), n;
    }
    _pulseQueryQueue() {
      if (this.readyForQuery === true) if (this.activeQuery = this.queryQueue.shift(), this.activeQuery) {
        this.readyForQuery = false, this.hasExecuted = true;
        let e = this.activeQuery.submit(this.connection);
        e && m.nextTick(() => {
          this.activeQuery.handleError(e, this.connection), this.readyForQuery = true, this._pulseQueryQueue();
        });
      } else this.hasExecuted && (this.activeQuery = null, this.emit("drain"));
    }
    query(e, t2, n) {
      var i, s, o2, u2, c;
      if (e == null) throw new TypeError("Client was passed a null or undefined query");
      return typeof e.submit == "function" ? (o2 = e.query_timeout || this.connectionParameters.query_timeout, s = i = e, typeof t2 == "function" && (i.callback = i.callback || t2)) : (o2 = this.connectionParameters.query_timeout, i = new Ls(
        e,
        t2,
        n
      ), i.callback || (s = new this._Promise((h2, l) => {
        i.callback = (d, b) => d ? l(d) : h2(b);
      }))), o2 && (c = i.callback, u2 = setTimeout(() => {
        var h2 = new Error("Query read timeout");
        m.nextTick(
          () => {
            i.handleError(h2, this.connection);
          }
        ), c(h2), i.callback = () => {
        };
        var l = this.queryQueue.indexOf(i);
        l > -1 && this.queryQueue.splice(l, 1), this._pulseQueryQueue();
      }, o2), i.callback = (h2, l) => {
        clearTimeout(u2), c(h2, l);
      }), this.binary && !i.binary && (i.binary = true), i._result && !i._result._types && (i._result._types = this._types), this._queryable ? this._ending ? (m.nextTick(() => {
        i.handleError(
          new Error("Client was closed and is not queryable"),
          this.connection
        );
      }), s) : (this.queryQueue.push(i), this._pulseQueryQueue(), s) : (m.nextTick(
        () => {
          i.handleError(new Error("Client has encountered a connection error and is not queryable"), this.connection);
        }
      ), s);
    }
    ref() {
      this.connection.ref();
    }
    unref() {
      this.connection.unref();
    }
    end(e) {
      if (this._ending = true, !this.connection._connecting) if (e) e();
      else return this._Promise.resolve();
      if (this.activeQuery || !this._queryable ? this.connection.stream.destroy() : this.connection.end(), e) this.connection.once("end", e);
      else return new this._Promise((t2) => {
        this.connection.once("end", t2);
      });
    }
  };
  a(yn, "Client");
  var Ct = yn;
  Ct.Query = Ls;
  Rs.exports = Ct;
});
var Us = I((pf, ks) => {
  "use strict";
  p2();
  var Ac = ge().EventEmitter, Ms = a(function() {
  }, "NOOP"), Ds = a(
    (r2, e) => {
      let t2 = r2.findIndex(e);
      return t2 === -1 ? void 0 : r2.splice(t2, 1)[0];
    },
    "removeWhere"
  ), wn = class wn {
    constructor(e, t2, n) {
      this.client = e, this.idleListener = t2, this.timeoutId = n;
    }
  };
  a(wn, "IdleItem");
  var mn = wn, bn = class bn {
    constructor(e) {
      this.callback = e;
    }
  };
  a(bn, "PendingItem");
  var Ne = bn;
  function Cc() {
    throw new Error("Release called on client which has already been released to the pool.");
  }
  a(Cc, "throwOnDoubleRelease");
  function Tt(r2, e) {
    if (e) return { callback: e, result: void 0 };
    let t2, n, i = a(function(o2, u2) {
      o2 ? t2(o2) : n(u2);
    }, "cb"), s = new r2(function(o2, u2) {
      n = o2, t2 = u2;
    }).catch((o2) => {
      throw Error.captureStackTrace(
        o2
      ), o2;
    });
    return { callback: i, result: s };
  }
  a(Tt, "promisify");
  function Tc(r2, e) {
    return a(
      function t2(n) {
        n.client = e, e.removeListener("error", t2), e.on("error", () => {
          r2.log("additional client error after disconnection due to error", n);
        }), r2._remove(e), r2.emit("error", n, e);
      },
      "idleListener"
    );
  }
  a(Tc, "makeIdleListener");
  var Sn = class Sn extends Ac {
    constructor(e, t2) {
      super(), this.options = Object.assign({}, e), e != null && "password" in e && Object.defineProperty(
        this.options,
        "password",
        { configurable: true, enumerable: false, writable: true, value: e.password }
      ), e != null && e.ssl && e.ssl.key && Object.defineProperty(this.options.ssl, "key", { enumerable: false }), this.options.max = this.options.max || this.options.poolSize || 10, this.options.maxUses = this.options.maxUses || 1 / 0, this.options.allowExitOnIdle = this.options.allowExitOnIdle || false, this.options.maxLifetimeSeconds = this.options.maxLifetimeSeconds || 0, this.log = this.options.log || function() {
      }, this.Client = this.options.Client || t2 || It().Client, this.Promise = this.options.Promise || S.Promise, typeof this.options.idleTimeoutMillis > "u" && (this.options.idleTimeoutMillis = 1e4), this._clients = [], this._idle = [], this._expired = /* @__PURE__ */ new WeakSet(), this._pendingQueue = [], this._endCallback = void 0, this.ending = false, this.ended = false;
    }
    _isFull() {
      return this._clients.length >= this.options.max;
    }
    _pulseQueue() {
      if (this.log("pulse queue"), this.ended) {
        this.log("pulse queue ended");
        return;
      }
      if (this.ending) {
        this.log(
          "pulse queue on ending"
        ), this._idle.length && this._idle.slice().map((t2) => {
          this._remove(
            t2.client
          );
        }), this._clients.length || (this.ended = true, this._endCallback());
        return;
      }
      if (!this._pendingQueue.length) {
        this.log("no queued requests");
        return;
      }
      if (!this._idle.length && this._isFull()) return;
      let e = this._pendingQueue.shift();
      if (this._idle.length) {
        let t2 = this._idle.pop();
        clearTimeout(t2.timeoutId);
        let n = t2.client;
        n.ref && n.ref();
        let i = t2.idleListener;
        return this._acquireClient(n, e, i, false);
      }
      if (!this._isFull()) return this.newClient(e);
      throw new Error("unexpected condition");
    }
    _remove(e) {
      let t2 = Ds(this._idle, (n) => n.client === e);
      t2 !== void 0 && clearTimeout(t2.timeoutId), this._clients = this._clients.filter((n) => n !== e), e.end(), this.emit("remove", e);
    }
    connect(e) {
      if (this.ending) {
        let i = new Error("Cannot use a pool after calling end on the pool");
        return e ? e(i) : this.Promise.reject(
          i
        );
      }
      let t2 = Tt(this.Promise, e), n = t2.result;
      if (this._isFull() || this._idle.length) {
        if (this._idle.length && m.nextTick(() => this._pulseQueue()), !this.options.connectionTimeoutMillis)
          return this._pendingQueue.push(new Ne(t2.callback)), n;
        let i = a((u2, c, h2) => {
          clearTimeout(
            o2
          ), t2.callback(u2, c, h2);
        }, "queueCallback"), s = new Ne(i), o2 = setTimeout(() => {
          Ds(
            this._pendingQueue,
            (u2) => u2.callback === i
          ), s.timedOut = true, t2.callback(new Error("timeout exceeded when trying to connect"));
        }, this.options.connectionTimeoutMillis);
        return this._pendingQueue.push(s), n;
      }
      return this.newClient(new Ne(t2.callback)), n;
    }
    newClient(e) {
      let t2 = new this.Client(this.options);
      this._clients.push(t2);
      let n = Tc(this, t2);
      this.log("checking client timeout");
      let i, s = false;
      this.options.connectionTimeoutMillis && (i = setTimeout(() => {
        this.log("ending client due to timeout"), s = true, t2.connection ? t2.connection.stream.destroy() : t2.end();
      }, this.options.connectionTimeoutMillis)), this.log("connecting new client"), t2.connect((o2) => {
        if (i && clearTimeout(i), t2.on("error", n), o2) this.log("client failed to connect", o2), this._clients = this._clients.filter((u2) => u2 !== t2), s && (o2.message = "Connection terminated due to connection timeout"), this._pulseQueue(), e.timedOut || e.callback(
          o2,
          void 0,
          Ms
        );
        else {
          if (this.log("new client connected"), this.options.maxLifetimeSeconds !== 0) {
            let u2 = setTimeout(() => {
              this.log("ending client due to expired lifetime"), this._expired.add(t2), this._idle.findIndex((h2) => h2.client === t2) !== -1 && this._acquireClient(
                t2,
                new Ne((h2, l, d) => d()),
                n,
                false
              );
            }, this.options.maxLifetimeSeconds * 1e3);
            u2.unref(), t2.once(
              "end",
              () => clearTimeout(u2)
            );
          }
          return this._acquireClient(t2, e, n, true);
        }
      });
    }
    _acquireClient(e, t2, n, i) {
      i && this.emit("connect", e), this.emit("acquire", e), e.release = this._releaseOnce(e, n), e.removeListener("error", n), t2.timedOut ? i && this.options.verify ? this.options.verify(
        e,
        e.release
      ) : e.release() : i && this.options.verify ? this.options.verify(e, (s) => {
        if (s) return e.release(s), t2.callback(s, void 0, Ms);
        t2.callback(void 0, e, e.release);
      }) : t2.callback(
        void 0,
        e,
        e.release
      );
    }
    _releaseOnce(e, t2) {
      let n = false;
      return (i) => {
        n && Cc(), n = true, this._release(
          e,
          t2,
          i
        );
      };
    }
    _release(e, t2, n) {
      if (e.on("error", t2), e._poolUseCount = (e._poolUseCount || 0) + 1, this.emit("release", n, e), n || this.ending || !e._queryable || e._ending || e._poolUseCount >= this.options.maxUses) {
        e._poolUseCount >= this.options.maxUses && this.log("remove expended client"), this._remove(e), this._pulseQueue();
        return;
      }
      if (this._expired.has(e)) {
        this.log("remove expired client"), this._expired.delete(e), this._remove(e), this._pulseQueue();
        return;
      }
      let s;
      this.options.idleTimeoutMillis && (s = setTimeout(() => {
        this.log("remove idle client"), this._remove(e);
      }, this.options.idleTimeoutMillis), this.options.allowExitOnIdle && s.unref()), this.options.allowExitOnIdle && e.unref(), this._idle.push(new mn(e, t2, s)), this._pulseQueue();
    }
    query(e, t2, n) {
      if (typeof e == "function") {
        let s = Tt(this.Promise, e);
        return x(function() {
          return s.callback(new Error("Passing a function as the first parameter to pool.query is not supported"));
        }), s.result;
      }
      typeof t2 == "function" && (n = t2, t2 = void 0);
      let i = Tt(this.Promise, n);
      return n = i.callback, this.connect((s, o2) => {
        if (s)
          return n(s);
        let u2 = false, c = a((h2) => {
          u2 || (u2 = true, o2.release(h2), n(h2));
        }, "onError");
        o2.once("error", c), this.log("dispatching query");
        try {
          o2.query(e, t2, (h2, l) => {
            if (this.log("query dispatched"), o2.removeListener("error", c), !u2) return u2 = true, o2.release(h2), h2 ? n(h2) : n(
              void 0,
              l
            );
          });
        } catch (h2) {
          return o2.release(h2), n(h2);
        }
      }), i.result;
    }
    end(e) {
      if (this.log("ending"), this.ending) {
        let n = new Error("Called end on pool more than once");
        return e ? e(n) : this.Promise.reject(n);
      }
      this.ending = true;
      let t2 = Tt(this.Promise, e);
      return this._endCallback = t2.callback, this._pulseQueue(), t2.result;
    }
    get waitingCount() {
      return this._pendingQueue.length;
    }
    get idleCount() {
      return this._idle.length;
    }
    get expiredCount() {
      return this._clients.reduce((e, t2) => e + (this._expired.has(t2) ? 1 : 0), 0);
    }
    get totalCount() {
      return this._clients.length;
    }
  };
  a(Sn, "Pool");
  var gn = Sn;
  ks.exports = gn;
});
var Os = {};
se(Os, { default: () => Ic });
var Ic;
var Ns = z(() => {
  "use strict";
  p2();
  Ic = {};
});
var qs = I((gf, Pc) => {
  Pc.exports = { name: "pg", version: "8.8.0", description: "PostgreSQL client - pure javascript & libpq with the same API", keywords: [
    "database",
    "libpq",
    "pg",
    "postgre",
    "postgres",
    "postgresql",
    "rdbms"
  ], homepage: "https://github.com/brianc/node-postgres", repository: { type: "git", url: "git://github.com/brianc/node-postgres.git", directory: "packages/pg" }, author: "Brian Carlson <brian.m.carlson@gmail.com>", main: "./lib", dependencies: {
    "buffer-writer": "2.0.0",
    "packet-reader": "1.0.0",
    "pg-connection-string": "^2.5.0",
    "pg-pool": "^3.5.2",
    "pg-protocol": "^1.5.0",
    "pg-types": "^2.1.0",
    pgpass: "1.x"
  }, devDependencies: { async: "2.6.4", bluebird: "3.5.2", co: "4.6.0", "pg-copy-streams": "0.3.0" }, peerDependencies: { "pg-native": ">=3.0.1" }, peerDependenciesMeta: {
    "pg-native": { optional: true }
  }, scripts: { test: "make test-all" }, files: ["lib", "SPONSORS.md"], license: "MIT", engines: { node: ">= 8.0.0" }, gitHead: "c99fb2c127ddf8d712500db2c7b9a5491a178655" };
});
var Ws = I((wf, js) => {
  "use strict";
  p2();
  var Qs = ge().EventEmitter, Bc = (Ge(), O(He)), xn = tt(), qe = js.exports = function(r2, e, t2) {
    Qs.call(this), r2 = xn.normalizeQueryConfig(r2, e, t2), this.text = r2.text, this.values = r2.values, this.name = r2.name, this.callback = r2.callback, this.state = "new", this._arrayMode = r2.rowMode === "array", this._emitRowEvents = false, this.on("newListener", function(n) {
      n === "row" && (this._emitRowEvents = true);
    }.bind(this));
  };
  Bc.inherits(
    qe,
    Qs
  );
  var Lc = { sqlState: "code", statementPosition: "position", messagePrimary: "message", context: "where", schemaName: "schema", tableName: "table", columnName: "column", dataTypeName: "dataType", constraintName: "constraint", sourceFile: "file", sourceLine: "line", sourceFunction: "routine" };
  qe.prototype.handleError = function(r2) {
    var e = this.native.pq.resultErrorFields();
    if (e) for (var t2 in e) {
      var n = Lc[t2] || t2;
      r2[n] = e[t2];
    }
    this.callback ? this.callback(r2) : this.emit("error", r2), this.state = "error";
  };
  qe.prototype.then = function(r2, e) {
    return this._getPromise().then(r2, e);
  };
  qe.prototype.catch = function(r2) {
    return this._getPromise().catch(r2);
  };
  qe.prototype._getPromise = function() {
    return this._promise ? this._promise : (this._promise = new Promise(function(r2, e) {
      this._once("end", r2), this._once(
        "error",
        e
      );
    }.bind(this)), this._promise);
  };
  qe.prototype.submit = function(r2) {
    this.state = "running";
    var e = this;
    this.native = r2.native, r2.native.arrayMode = this._arrayMode;
    var t2 = a(
      function(s, o2, u2) {
        if (r2.native.arrayMode = false, x(function() {
          e.emit("_done");
        }), s) return e.handleError(s);
        e._emitRowEvents && (u2.length > 1 ? o2.forEach((c, h2) => {
          c.forEach((l) => {
            e.emit(
              "row",
              l,
              u2[h2]
            );
          });
        }) : o2.forEach(function(c) {
          e.emit("row", c, u2);
        })), e.state = "end", e.emit(
          "end",
          u2
        ), e.callback && e.callback(null, u2);
      },
      "after"
    );
    if (m.domain && (t2 = m.domain.bind(
      t2
    )), this.name) {
      this.name.length > 63 && (console.error("Warning! Postgres only supports 63 characters for query names."), console.error(
        "You supplied %s (%s)",
        this.name,
        this.name.length
      ), console.error("This can cause conflicts and silent errors executing queries"));
      var n = (this.values || []).map(xn.prepareValue);
      if (r2.namedQueries[this.name]) {
        if (this.text && r2.namedQueries[this.name] !== this.text) {
          let s = new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
          return t2(s);
        }
        return r2.native.execute(this.name, n, t2);
      }
      return r2.native.prepare(
        this.name,
        this.text,
        n.length,
        function(s) {
          return s ? t2(s) : (r2.namedQueries[e.name] = e.text, e.native.execute(e.name, n, t2));
        }
      );
    } else if (this.values) {
      if (!Array.isArray(this.values)) {
        let s = new Error("Query values must be an array");
        return t2(s);
      }
      var i = this.values.map(xn.prepareValue);
      r2.native.query(this.text, i, t2);
    } else r2.native.query(this.text, t2);
  };
});
var Vs = I((Ef, $s) => {
  "use strict";
  p2();
  var Rc = (Ns(), O(Os)), Fc = wt(), xf = qs(), Hs = ge().EventEmitter, Mc = (Ge(), O(He)), Dc = bt(), Gs = Ws(), J = $s.exports = function(r2) {
    Hs.call(this), r2 = r2 || {}, this._Promise = r2.Promise || S.Promise, this._types = new Fc(r2.types), this.native = new Rc({ types: this._types }), this._queryQueue = [], this._ending = false, this._connecting = false, this._connected = false, this._queryable = true;
    var e = this.connectionParameters = new Dc(
      r2
    );
    this.user = e.user, Object.defineProperty(this, "password", {
      configurable: true,
      enumerable: false,
      writable: true,
      value: e.password
    }), this.database = e.database, this.host = e.host, this.port = e.port, this.namedQueries = {};
  };
  J.Query = Gs;
  Mc.inherits(J, Hs);
  J.prototype._errorAllQueries = function(r2) {
    let e = a(
      (t2) => {
        m.nextTick(() => {
          t2.native = this.native, t2.handleError(r2);
        });
      },
      "enqueueError"
    );
    this._hasActiveQuery() && (e(this._activeQuery), this._activeQuery = null), this._queryQueue.forEach(e), this._queryQueue.length = 0;
  };
  J.prototype._connect = function(r2) {
    var e = this;
    if (this._connecting) {
      m.nextTick(() => r2(new Error("Client has already been connected. You cannot reuse a client.")));
      return;
    }
    this._connecting = true, this.connectionParameters.getLibpqConnectionString(function(t2, n) {
      if (t2) return r2(
        t2
      );
      e.native.connect(n, function(i) {
        if (i) return e.native.end(), r2(i);
        e._connected = true, e.native.on("error", function(s) {
          e._queryable = false, e._errorAllQueries(s), e.emit("error", s);
        }), e.native.on("notification", function(s) {
          e.emit("notification", { channel: s.relname, payload: s.extra });
        }), e.emit("connect"), e._pulseQueryQueue(true), r2();
      });
    });
  };
  J.prototype.connect = function(r2) {
    if (r2) {
      this._connect(r2);
      return;
    }
    return new this._Promise(
      (e, t2) => {
        this._connect((n) => {
          n ? t2(n) : e();
        });
      }
    );
  };
  J.prototype.query = function(r2, e, t2) {
    var n, i, s, o2, u2;
    if (r2 == null) throw new TypeError("Client was passed a null or undefined query");
    if (typeof r2.submit == "function") s = r2.query_timeout || this.connectionParameters.query_timeout, i = n = r2, typeof e == "function" && (r2.callback = e);
    else if (s = this.connectionParameters.query_timeout, n = new Gs(r2, e, t2), !n.callback) {
      let c, h2;
      i = new this._Promise((l, d) => {
        c = l, h2 = d;
      }), n.callback = (l, d) => l ? h2(l) : c(d);
    }
    return s && (u2 = n.callback, o2 = setTimeout(() => {
      var c = new Error("Query read timeout");
      m.nextTick(() => {
        n.handleError(c, this.connection);
      }), u2(c), n.callback = () => {
      };
      var h2 = this._queryQueue.indexOf(n);
      h2 > -1 && this._queryQueue.splice(h2, 1), this._pulseQueryQueue();
    }, s), n.callback = (c, h2) => {
      clearTimeout(o2), u2(c, h2);
    }), this._queryable ? this._ending ? (n.native = this.native, m.nextTick(() => {
      n.handleError(
        new Error("Client was closed and is not queryable")
      );
    }), i) : (this._queryQueue.push(
      n
    ), this._pulseQueryQueue(), i) : (n.native = this.native, m.nextTick(() => {
      n.handleError(
        new Error("Client has encountered a connection error and is not queryable")
      );
    }), i);
  };
  J.prototype.end = function(r2) {
    var e = this;
    this._ending = true, this._connected || this.once(
      "connect",
      this.end.bind(this, r2)
    );
    var t2;
    return r2 || (t2 = new this._Promise(function(n, i) {
      r2 = a((s) => s ? i(s) : n(), "cb");
    })), this.native.end(function() {
      e._errorAllQueries(new Error(
        "Connection terminated"
      )), m.nextTick(() => {
        e.emit("end"), r2 && r2();
      });
    }), t2;
  };
  J.prototype._hasActiveQuery = function() {
    return this._activeQuery && this._activeQuery.state !== "error" && this._activeQuery.state !== "end";
  };
  J.prototype._pulseQueryQueue = function(r2) {
    if (this._connected && !this._hasActiveQuery()) {
      var e = this._queryQueue.shift();
      if (!e) {
        r2 || this.emit("drain");
        return;
      }
      this._activeQuery = e, e.submit(this);
      var t2 = this;
      e.once(
        "_done",
        function() {
          t2._pulseQueryQueue();
        }
      );
    }
  };
  J.prototype.cancel = function(r2) {
    this._activeQuery === r2 ? this.native.cancel(function() {
    }) : this._queryQueue.indexOf(r2) !== -1 && this._queryQueue.splice(this._queryQueue.indexOf(r2), 1);
  };
  J.prototype.ref = function() {
  };
  J.prototype.unref = function() {
  };
  J.prototype.setTypeParser = function(r2, e, t2) {
    return this._types.setTypeParser(r2, e, t2);
  };
  J.prototype.getTypeParser = function(r2, e) {
    return this._types.getTypeParser(r2, e);
  };
});
var En = I((Af, Ks) => {
  "use strict";
  p2();
  Ks.exports = Vs();
});
var It = I((Tf, nt) => {
  "use strict";
  p2();
  var kc = Fs(), Uc = et(), Oc = pn(), Nc = Us(), { DatabaseError: qc } = hn(), Qc = a((r2) => {
    var e;
    return e = class extends Nc {
      constructor(n) {
        super(n, r2);
      }
    }, a(e, "BoundPool"), e;
  }, "poolFactory"), vn = a(function(r2) {
    this.defaults = Uc, this.Client = r2, this.Query = this.Client.Query, this.Pool = Qc(this.Client), this._pools = [], this.Connection = Oc, this.types = Xe(), this.DatabaseError = qc;
  }, "PG");
  typeof m.env.NODE_PG_FORCE_NATIVE < "u" ? nt.exports = new vn(En()) : (nt.exports = new vn(kc), Object.defineProperty(nt.exports, "native", { configurable: true, enumerable: false, get() {
    var r2 = null;
    try {
      r2 = new vn(En());
    } catch (e) {
      if (e.code !== "MODULE_NOT_FOUND") throw e;
    }
    return Object.defineProperty(nt.exports, "native", { value: r2 }), r2;
  } }));
});
p2();
var Bt = Te(It());
St();
p2();
St();
mr();
var Zs = Te(tt());
var Js = Te(wt());
function jc(r2) {
  return r2 instanceof y ? "\\x" + r2.toString("hex") : r2;
}
a(jc, "encodeBuffersAsBytea");
var Pt = class Pt2 extends Error {
  constructor(t2) {
    super(t2);
    _(
      this,
      "name",
      "NeonDbError"
    );
    _(this, "severity");
    _(this, "code");
    _(this, "detail");
    _(this, "hint");
    _(this, "position");
    _(this, "internalPosition");
    _(this, "internalQuery");
    _(this, "where");
    _(this, "schema");
    _(this, "table");
    _(this, "column");
    _(this, "dataType");
    _(
      this,
      "constraint"
    );
    _(this, "file");
    _(this, "line");
    _(this, "routine");
    _(this, "sourceError");
    "captureStackTrace" in Error && typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, Pt2);
  }
};
a(Pt, "NeonDbError");
var pe = Pt;
var zs = "transaction() expects an array of queries, or a function returning an array of queries";
var Wc = ["severity", "code", "detail", "hint", "position", "internalPosition", "internalQuery", "where", "schema", "table", "column", "dataType", "constraint", "file", "line", "routine"];
function Xs(r2, {
  arrayMode: e,
  fullResults: t2,
  fetchOptions: n,
  isolationLevel: i,
  readOnly: s,
  deferrable: o2,
  queryCallback: u2,
  resultCallback: c,
  authToken: h2
} = {}) {
  if (!r2) throw new Error("No database connection string was provided to `neon()`. Perhaps an environment variable has not been set?");
  let l;
  try {
    l = yr(r2);
  } catch {
    throw new Error("Database connection string provided to `neon()` is not a valid URL. Connection string: " + String(r2));
  }
  let { protocol: d, username: b, hostname: C, port: B, pathname: Q } = l;
  if (d !== "postgres:" && d !== "postgresql:" || !b || !C || !Q) throw new Error("Database connection string format for `neon()` should be: postgresql://user:password@host.tld/dbname?option=value");
  function X(A, ...g2) {
    let P, K;
    if (typeof A == "string") P = A, K = g2[1], g2 = g2[0] ?? [];
    else {
      P = "";
      for (let j = 0; j < A.length; j++)
        P += A[j], j < g2.length && (P += "$" + (j + 1));
    }
    g2 = g2.map((j) => jc((0, Zs.prepareValue)(j)));
    let k = {
      query: P,
      params: g2
    };
    return u2 && u2(k), Hc(de, k, K);
  }
  a(X, "resolve"), X.transaction = async (A, g2) => {
    if (typeof A == "function" && (A = A(X)), !Array.isArray(A)) throw new Error(zs);
    A.forEach(
      (k) => {
        if (k[Symbol.toStringTag] !== "NeonQueryPromise") throw new Error(zs);
      }
    );
    let P = A.map((k) => k.parameterizedQuery), K = A.map((k) => k.opts ?? {});
    return de(P, K, g2);
  };
  async function de(A, g2, P) {
    let { fetchEndpoint: K, fetchFunction: k } = _e, j = Array.isArray(A) ? { queries: A } : A, ee = n ?? {}, oe = e ?? false, R = t2 ?? false, $ = i, ce = s, ye = o2;
    P !== void 0 && (P.fetchOptions !== void 0 && (ee = {
      ...ee,
      ...P.fetchOptions
    }), P.arrayMode !== void 0 && (oe = P.arrayMode), P.fullResults !== void 0 && (R = P.fullResults), P.isolationLevel !== void 0 && ($ = P.isolationLevel), P.readOnly !== void 0 && (ce = P.readOnly), P.deferrable !== void 0 && (ye = P.deferrable)), g2 !== void 0 && !Array.isArray(
      g2
    ) && g2.fetchOptions !== void 0 && (ee = { ...ee, ...g2.fetchOptions });
    let Se = h2;
    !Array.isArray(
      g2
    ) && g2?.authToken !== void 0 && (Se = g2.authToken);
    let je = typeof K == "function" ? K(C, B, { jwtAuth: Se !== void 0 }) : K, he = { "Neon-Connection-String": r2, "Neon-Raw-Text-Output": "true", "Neon-Array-Mode": "true" }, it = await Gc(Se);
    it && (he.Authorization = `Bearer ${it}`), Array.isArray(
      A
    ) && ($ !== void 0 && (he["Neon-Batch-Isolation-Level"] = $), ce !== void 0 && (he["Neon-Batch-Read-Only"] = String(ce)), ye !== void 0 && (he["Neon-Batch-Deferrable"] = String(ye)));
    let te;
    try {
      te = await (k ?? fetch)(je, {
        method: "POST",
        body: JSON.stringify(j),
        headers: he,
        ...ee
      });
    } catch (W) {
      let H = new pe(`Error connecting to database: ${W.message}`);
      throw H.sourceError = W, H;
    }
    if (te.ok) {
      let W = await te.json();
      if (Array.isArray(A)) {
        let H = W.results;
        if (!Array.isArray(H)) throw new pe("Neon internal error: unexpected result format");
        return H.map((Ae, xe) => {
          let Lt = g2[xe] ?? {}, ro = Lt.arrayMode ?? oe, no = Lt.fullResults ?? R;
          return Ys(Ae, {
            arrayMode: ro,
            fullResults: no,
            parameterizedQuery: A[xe],
            resultCallback: c,
            types: Lt.types
          });
        });
      } else {
        let H = g2 ?? {}, Ae = H.arrayMode ?? oe, xe = H.fullResults ?? R;
        return Ys(
          W,
          { arrayMode: Ae, fullResults: xe, parameterizedQuery: A, resultCallback: c, types: H.types }
        );
      }
    } else {
      let { status: W } = te;
      if (W === 400) {
        let H = await te.json(), Ae = new pe(H.message);
        for (let xe of Wc)
          Ae[xe] = H[xe] ?? void 0;
        throw Ae;
      } else {
        let H = await te.text();
        throw new pe(`Server error (HTTP status ${W}): ${H}`);
      }
    }
  }
  return a(de, "execute"), X;
}
a(Xs, "neon");
function Hc(r2, e, t2) {
  return { [Symbol.toStringTag]: "NeonQueryPromise", parameterizedQuery: e, opts: t2, then: a(
    (n, i) => r2(e, t2).then(n, i),
    "then"
  ), catch: a((n) => r2(e, t2).catch(n), "catch"), finally: a((n) => r2(
    e,
    t2
  ).finally(n), "finally") };
}
a(Hc, "createNeonQueryPromise");
function Ys(r2, {
  arrayMode: e,
  fullResults: t2,
  parameterizedQuery: n,
  resultCallback: i,
  types: s
}) {
  let o2 = new Js.default(
    s
  ), u2 = r2.fields.map((l) => l.name), c = r2.fields.map((l) => o2.getTypeParser(l.dataTypeID)), h2 = e === true ? r2.rows.map((l) => l.map((d, b) => d === null ? null : c[b](d))) : r2.rows.map((l) => Object.fromEntries(
    l.map((d, b) => [u2[b], d === null ? null : c[b](d)])
  ));
  return i && i(n, r2, h2, { arrayMode: e, fullResults: t2 }), t2 ? (r2.viaNeonFetch = true, r2.rowAsArray = e, r2.rows = h2, r2._parsers = c, r2._types = o2, r2) : h2;
}
a(Ys, "processQueryResult");
async function Gc(r2) {
  if (typeof r2 == "string") return r2;
  if (typeof r2 == "function") try {
    return await Promise.resolve(r2());
  } catch (e) {
    let t2 = new pe("Error getting auth token.");
    throw e instanceof Error && (t2 = new pe(`Error getting auth token: ${e.message}`)), t2;
  }
}
a(Gc, "getAuthToken");
var to = Te(bt());
var Qe = Te(It());
var An = class An2 extends Bt.Client {
  constructor(t2) {
    super(t2);
    this.config = t2;
  }
  get neonConfig() {
    return this.connection.stream;
  }
  connect(t2) {
    let { neonConfig: n } = this;
    n.forceDisablePgSSL && (this.ssl = this.connection.ssl = false), this.ssl && n.useSecureWebSocket && console.warn("SSL is enabled for both Postgres (e.g. ?sslmode=require in the connection string + forceDisablePgSSL = false) and the WebSocket tunnel (useSecureWebSocket = true). Double encryption will increase latency and CPU usage. It may be appropriate to disable SSL in the Postgres connection parameters or set forceDisablePgSSL = true.");
    let i = this.config?.host !== void 0 || this.config?.connectionString !== void 0 || m.env.PGHOST !== void 0, s = m.env.USER ?? m.env.USERNAME;
    if (!i && this.host === "localhost" && this.user === s && this.database === s && this.password === null) throw new Error(`No database host or connection string was set, and key parameters have default values (host: localhost, user: ${s}, db: ${s}, password: null). Is an environment variable missing? Alternatively, if you intended to connect with these parameters, please set the host to 'localhost' explicitly.`);
    let o2 = super.connect(t2), u2 = n.pipelineTLS && this.ssl, c = n.pipelineConnect === "password";
    if (!u2 && !n.pipelineConnect) return o2;
    let h2 = this.connection;
    if (u2 && h2.on("connect", () => h2.stream.emit("data", "S")), c) {
      h2.removeAllListeners(
        "authenticationCleartextPassword"
      ), h2.removeAllListeners("readyForQuery"), h2.once(
        "readyForQuery",
        () => h2.on("readyForQuery", this._handleReadyForQuery.bind(this))
      );
      let l = this.ssl ? "sslconnect" : "connect";
      h2.on(l, () => {
        this._handleAuthCleartextPassword(), this._handleReadyForQuery();
      });
    }
    return o2;
  }
  async _handleAuthSASLContinue(t2) {
    let n = this.saslSession, i = this.password, s = t2.data;
    if (n.message !== "SASLInitialResponse" || typeof i != "string" || typeof s != "string") throw new Error("SASL: protocol error");
    let o2 = Object.fromEntries(s.split(",").map((te) => {
      if (!/^.=/.test(te)) throw new Error("SASL: Invalid attribute pair entry");
      let W = te[0], H = te.substring(2);
      return [W, H];
    })), u2 = o2.r, c = o2.s, h2 = o2.i;
    if (!u2 || !/^[!-+--~]+$/.test(u2)) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing/unprintable");
    if (!c || !/^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(c)) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing/not base64");
    if (!h2 || !/^[1-9][0-9]*$/.test(h2)) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: missing/invalid iteration count");
    if (!u2.startsWith(n.clientNonce)) throw new Error(
      "SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce"
    );
    if (u2.length === n.clientNonce.length) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
    let l = parseInt(h2, 10), d = y.from(c, "base64"), b = new TextEncoder(), C = b.encode(i), B = await w.subtle.importKey("raw", C, { name: "HMAC", hash: { name: "SHA-256" } }, false, ["sign"]), Q = new Uint8Array(await w.subtle.sign("HMAC", B, y.concat([d, y.from(
      [0, 0, 0, 1]
    )]))), X = Q;
    for (var de = 0; de < l - 1; de++) Q = new Uint8Array(await w.subtle.sign(
      "HMAC",
      B,
      Q
    )), X = y.from(X.map((te, W) => X[W] ^ Q[W]));
    let A = X, g2 = await w.subtle.importKey(
      "raw",
      A,
      { name: "HMAC", hash: { name: "SHA-256" } },
      false,
      ["sign"]
    ), P = new Uint8Array(await w.subtle.sign("HMAC", g2, b.encode("Client Key"))), K = await w.subtle.digest(
      "SHA-256",
      P
    ), k = "n=*,r=" + n.clientNonce, j = "r=" + u2 + ",s=" + c + ",i=" + l, ee = "c=biws,r=" + u2, oe = k + "," + j + "," + ee, R = await w.subtle.importKey(
      "raw",
      K,
      { name: "HMAC", hash: { name: "SHA-256" } },
      false,
      ["sign"]
    );
    var $ = new Uint8Array(await w.subtle.sign("HMAC", R, b.encode(oe))), ce = y.from(P.map((te, W) => P[W] ^ $[W])), ye = ce.toString("base64");
    let Se = await w.subtle.importKey(
      "raw",
      A,
      { name: "HMAC", hash: { name: "SHA-256" } },
      false,
      ["sign"]
    ), je = await w.subtle.sign(
      "HMAC",
      Se,
      b.encode("Server Key")
    ), he = await w.subtle.importKey("raw", je, { name: "HMAC", hash: { name: "SHA-256" } }, false, ["sign"]);
    var it = y.from(await w.subtle.sign(
      "HMAC",
      he,
      b.encode(oe)
    ));
    n.message = "SASLResponse", n.serverSignature = it.toString("base64"), n.response = ee + ",p=" + ye, this.connection.sendSCRAMClientFinalMessage(this.saslSession.response);
  }
};
a(An, "NeonClient");
var _n = An;
function $c(r2, e) {
  if (e) return {
    callback: e,
    result: void 0
  };
  let t2, n, i = a(function(o2, u2) {
    o2 ? t2(o2) : n(u2);
  }, "cb"), s = new r2(function(o2, u2) {
    n = o2, t2 = u2;
  });
  return { callback: i, result: s };
}
a($c, "promisify");
var Cn = class Cn2 extends Bt.Pool {
  constructor() {
    super(...arguments);
    _(this, "Client", _n);
    _(this, "hasFetchUnsupportedListeners", false);
  }
  on(t2, n) {
    return t2 !== "error" && (this.hasFetchUnsupportedListeners = true), super.on(t2, n);
  }
  query(t2, n, i) {
    if (!_e.poolQueryViaFetch || this.hasFetchUnsupportedListeners || typeof t2 == "function")
      return super.query(t2, n, i);
    typeof n == "function" && (i = n, n = void 0);
    let s = $c(
      this.Promise,
      i
    );
    i = s.callback;
    try {
      let o2 = new to.default(this.options), u2 = encodeURIComponent, c = encodeURI, h2 = `postgresql://${u2(o2.user)}:${u2(o2.password)}@${u2(o2.host)}/${c(o2.database)}`, l = typeof t2 == "string" ? t2 : t2.text, d = n ?? t2.values ?? [];
      Xs(h2, { fullResults: true, arrayMode: t2.rowMode === "array" })(l, d, { types: t2.types ?? this.options?.types }).then((C) => i(void 0, C)).catch((C) => i(
        C
      ));
    } catch (o2) {
      i(o2);
    }
    return s.result;
  }
};
a(Cn, "NeonPool");
var export_ClientBase = Qe.ClientBase;
var export_Connection = Qe.Connection;
var export_DatabaseError = Qe.DatabaseError;
var export_Query = Qe.Query;
var export_defaults = Qe.defaults;
var export_types = Qe.types;

// src/index.ts
var router = t();
router.get("/createproducts", async (req, env, ctx) => {
  const client = new _n({ connectionString: env.DATABASE_URL });
  await client.connect();
  try {
    await initProductsTable(client);
    ctx.waitUntil(client.end());
    return Response.json({
      success: true,
      message: `Table 'products' created successfully.`
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
});
router.get("/api/products", async (req, env, ctx) => {
  const client = new _n({ connectionString: env.DATABASE_URL });
  await client.connect();
  try {
    await initProductsTable(client);
    const res = await fetch("https://02557f4d-8f03-405d-a4e7-7a6483d26a04.mock.pstmn.io/get");
    const data = await res.json();
    if (!data || !data.products || data.products.length === 0) {
      return Response.json(
        { success: false, message: "No products found from API" },
        { status: 404 }
      );
    }
    let total = 0;
    for (const product of data.products) {
      total += await insertProducts(client, product);
    }
    ctx.waitUntil(client.end());
    return Response.json({
      success: true,
      message: `Inserted ${total} products successfully.`
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
});
router.post("/api/products", async (req, env, ctx) => {
  const client = new _n({ connectionString: env.DATABASE_URL });
  await client.connect();
  try {
    const res = await fetch("https://02557f4d-8f03-405d-a4e7-7a6483d26a04.mock.pstmn.io/getProducts");
    const data = await res.json();
    if (!data || !data.products || data.products.length === 0) {
      return Response.json(
        { success: false, inserted: 0, message: "No products found from API" },
        { status: 404 }
      );
    }
    let total = 0;
    for (const product of data.products) {
      total += await insertProducts(client, product);
    }
    const insertedProducts = [];
    const allProduct = await AllProduct(client);
    for (const product of allProduct) {
      insertedProducts.push({
        ProductID: product.id,
        Title: product.title,
        Tags: product.tags,
        CreatedAt: product.created_at,
        UpdatedAt: product.updated_at,
        ProductCode: product.sku
      });
    }
    ctx.waitUntil(client.end());
    return Response.json({
      success: true,
      inserted: total,
      message: `Inserted ${total} products successfully.`,
      products: insertedProducts
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
});
router.delete("/api/products/:product_id", async (req, env, ctx) => {
  const client = new _n({ connectionString: env.DATABASE_URL });
  await client.connect();
  try {
    const url = new URL(req.url);
    const product_id = url.pathname.split("/").pop();
    if (!product_id) {
      return Response.json({ success: false, message: "Missing ProductId" }, { status: 404 });
    }
    const deleted = await deleteProducts(client, Number(product_id));
    ctx.waitUntil(client.end());
    if (deleted.length === 0) {
      return Response.json({
        success: false,
        message: "Product not found"
      }, { status: 404 });
    }
    return Response.json({
      success: true,
      message: `Deleted product ${product_id} successfully.`
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
});
router.put("/api/products", async (req, env, ctx) => {
  const client = new _n({ connectionString: env.DATABASE_URL });
  await client.connect();
  try {
    const updated = await updateProducts(client);
    ctx.waitUntil(client.end());
    if (updated.length === 0) {
      return Response.json({
        success: false,
        message: "No products found to update"
      }, { status: 404 });
    }
    return Response.json({
      success: true,
      message: `Updated ${updated.length} products successfully.`,
      products: updated
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
});
var src_default = {
  async fetch(req, env, ctx) {
    const res = await router.fetch(req, env, ctx);
    return res || new Response("Not Found", { status: 404 });
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
};
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
var jsonError = async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
};
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-0Sl3qT/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}

// .wrangler/tmp/bundle-0Sl3qT/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  };
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      };
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
/*! Bundled license information:

@neondatabase/serverless/index.mjs:
  (*! Bundled license information:
  
  ieee754/index.js:
    (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)
  
  buffer/index.js:
    (*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     *)
  *)
*/
//# sourceMappingURL=index.js.map
