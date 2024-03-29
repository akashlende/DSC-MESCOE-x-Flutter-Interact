function updateTable(e, t) {
	var n = e.releases;
	for (var i in e.current_release) {
		var r = $("#downloads-" + t + "-" + i);
		r.addClass("collapsed").find(".loading").remove(), n.filter(function (e) {
			return e.channel == i
		}).forEach(function (t, n) {
			if (n === releasesToShow) {
				var i = $("<a />").text("Show all...").attr("href", "#").click(function (e) {
					$(this).closest("table").removeClass("collapsed"), $(this).closest("tr").remove(), e.preventDefault()
				});
				$("<tr>").append($('<td colspan="3"></td></tr>').append(i)).appendTo(r)
			}
			var o = n >= releasesToShow ? "overflow" : "",
				s = e.base_url + "/" + t.archive,
				a = $("<tr />").addClass(o).appendTo(r),
				l = $("<span />").text(t.hash.substr(0, 7)).addClass("git-hash"),
				u = $("<a />").attr("href", s).text(t.version),
				c = new Date(Date.parse(t.release_date));
			$("<td />").append(u).appendTo(a), $("<td />").append(l).appendTo(a), $("<td />").addClass("date").text(c.toLocaleDateString()).appendTo(a)
		})
	}
}

function updateTableFailed(e) {
	$("#tab-os-" + e).find(".loading").text("Failed to load releases. Refresh page to try again.")
}

function updateDownloadLink(e, t) {
	var n = "stable",
		i = e.releases.filter(function (e) {
			return e.channel == n
		});
	if (i.length) {
		var r = i[0],
			o = r.archive.split("/"),
			s = o[o.length - 1];
		$(".download-latest-link-" + t).text(s).attr("href", e.base_url + "/" + r.archive), $(".download-latest-link-filename-" + t).text(s), $(".download-latest-link-filename").text(s);
		var a = "flutter_",
			l = $('code:contains("' + a + '")'),
			u = $(l).contents().filter(function () {
				return 3 == this.nodeType && this.textContent.includes(a)
			}),
			c = $(u).text().replace(new RegExp("^(.*?)\\b" + a + "\\w+_v.*"), "$1" + s);
		$(u).replaceWith(c)
	}
}

function updateDownloadLinkFailed(e) {
	$(".download-latest-link-" + e).text("(failed)")
}

function setupTabs(e, t, n) {
	function i(e) {
		var t = e.match(/(#|\btab=)(\w+)/);
		return t ? t[2] : ""
	}

	function r(e) {
		e.preventDefault(), $(this).tab("show");
		var n = i($(this).attr("href"));
		t && window.localStorage && window.localStorage.setItem(t, n);
		var r = location,
			o = "?tab=" + n;
		if (n && r.search != o) {
			var s = r.protocol + "//" + r.host + r.pathname + o + r.hash;
			history.replaceState(undefined, undefined, s)
		}
	}

	function o(e) {
		a.filter('[href="#' + e + '"]').click()
	}
	var s, a = $("li a", e);
	a.click(r), (s = i(location.search)) ? o(s) : t && window.localStorage && (s = window.localStorage.getItem(t)) ? o(s) : n && o(n)
}

function setupToolsTabs(e, t, n, i) {
	function r() {
		s.removeClass("current"), a.removeClass("current")
	}

	function o(e) {
		$.escapeSelector(e);
		s.filter("[data-tab='" + t + e + "']").click()
	}
	var s = $(".tabs__top-bar li", e),
		a = $(".tabs__content", e);
	s.click(function () {
		var e = $(this).attr("data-tab"),
			i = $(this).attr("data-tab-href");
		if (i) location.href = i;
		else if ($("#" + e).length) {
			r(), $(this).addClass("current"), $("#" + e).addClass("current");
			var o = e.replace(t, "");
			history.replaceState && history.replaceState(undefined, undefined, "#" + o), n && window.localStorage && window.localStorage.setItem(n, o)
		}
	}), location.hash && location.hash.length > 1 ? o(location.hash.substr(1)) : n && window.localStorage && window.localStorage.getItem(n) ? o(window.localStorage.getItem(n)) : i && o(i)
}

function adjustToc() {
	var e = "#site-toc--side",
		t = $(e);
	$(t).find(".site-toc--button__page-top").click(function () {
		$("html, body").animate({
			scrollTop: 0
		}, "fast")
	}), $("body").scrollspy({
		offset: 100,
		target: e
	})
}

function initFixedColumns() {
	function e() {
		if ("none" != $(t).css("display")) {
			var e = $(r).outerHeight(),
				o = $(n).outerHeight(),
				s = $(n).offset().top - $(window).scrollTop(),
				a = e + Math.max(o - (e - s), 0),
				l = $(i).offset().top - $(window).scrollTop(),
				u = $(window).height() - l,
				c = $(window).height() - a - u;
			$(t).css("max-height", c), $(t).css("top", a)
		}
	}
	var t = "[data-fixed-column]",
		n = ".site-banner",
		i = "footer.site-footer",
		r = ".site-header";
	$(t).length && ($(t).css("position", "fixed"), $(window).scroll(e), e())
}

function getOS() {
	var e = navigator.userAgent;
	return -1 !== e.indexOf("Win") ? "windows" : -1 !== e.indexOf("Mac") ? "macos" : -1 !== e.indexOf("Linux") || -1 !== e.indexOf("X11") ? "linux" : void 0
}

function initVideoModal() {
	var e = $("[data-video-modal]");
	if (e.length) {
		var t = document.createElement("script");
		t.src = "https://www.youtube.com/iframe_api";
		var n = document.getElementsByTagName("script")[0];
		n.parentNode.insertBefore(t, n), window.onYouTubeIframeAPIReady = function () {
			window.videoPlayer = new YT.Player("video-player-iframe")
		}
	}
	e.on("shown.bs.modal", function (e) {
		if (window.videoPlayer) {
			var t = e.relatedTarget.dataset.video;
			window.videoPlayer.loadVideoById(t), window.videoPlayer.playVideo()
		}
	}), e.on("hide.bs.modal", function () {
		window.videoPlayer && window.videoPlayer.stopVideo()
	})
}

function initCarousel() {
	var e = ".carousel-item",
		t = $(".carousel");
	t.on("slide.bs.carousel", function (n) {
		t.find(e).eq(n.from).addClass("transition-out")
	}), t.on("slid.bs.carousel", function (n) {
		t.find(e).eq(n.from).removeClass("transition-out")
	})
}

function initSnackbar() {
	var e = ".snackbar__action";
	$(".snackbar").each(function () {
		var t = $(this);
		t.find(e).click(function () {
			t.fadeOut()
		})
	})
}

function setupClipboardJS() {
	new ClipboardJS(".code-excerpt__copy-btn").on("success", _copiedFeedback)
}

function _copiedFeedback(e) {
	e.clearSelection();
	var t, n = "Copied",
		i = e.trigger,
		r = i.getAttribute("title") || i.getAttribute("data-original-title");
	r !== n && (t = r, setTimeout(function () {
		_changeTooltip(i, t)
	}, 1500), _changeTooltip(i, n))
}

function _changeTooltip(e, t) {
	e.setAttribute("title", t), $(e).tooltip("dispose"), $(e).tooltip("show"), $(e).is(":hover") || $(e).tooltip("hide")
}

function addCopyCodeButtonsEverywhere() {
	var e = $("pre");
	e.wrap(function () {
		return 0 === $(this).parent("div.code-excerpt__code").length ? '<div class="code-excerpt__code"></div>' : ""
	}), e.wrap(function (e) {
		return '<div id="code-excerpt-' + e + '"></div>'
	}), e.parent().parent().prepend(function (e) {
		return '<button class="code-excerpt__copy-btn" type="button"    data-toggle="tooltip" title="Copy code"    data-clipboard-target="#code-excerpt-' + e + '">  <i class="material-icons">content_copy</i></button>'
	})
}! function (e, t) {
	"use strict";
	"object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) {
		if (!e.document) throw new Error("jQuery requires a window with a document");
		return t(e)
	} : t(e)
}("undefined" != typeof window ? window : this, function (e, t) {
	"use strict";

	function n(e, t, n) {
		var i, r = (t = t || se).createElement("script");
		if (r.text = e, n)
			for (i in be) n[i] && (r[i] = n[i]);
		t.head.appendChild(r).parentNode.removeChild(r)
	}

	function i(e) {
		return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? de[he.call(e)] || "object" : typeof e
	}

	function r(e) {
		var t = !!e && "length" in e && e.length,
			n = i(e);
		return !ye(e) && !_e(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
	}

	function o(e, t) {
		return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
	}

	function s(e, t, n) {
		return ye(t) ? Te.grep(e, function (e, i) {
			return !!t.call(e, i, e) !== n
		}) : t.nodeType ? Te.grep(e, function (e) {
			return e === t !== n
		}) : "string" != typeof t ? Te.grep(e, function (e) {
			return fe.call(t, e) > -1 !== n
		}) : Te.filter(t, e, n)
	}

	function a(e, t) {
		for (;
			(e = e[t]) && 1 !== e.nodeType;);
		return e
	}

	function l(e) {
		var t = {};
		return Te.each(e.match(Pe) || [], function (e, n) {
			t[n] = !0
		}), t
	}

	function u(e) {
		return e
	}

	function c(e) {
		throw e
	}

	function f(e, t, n, i) {
		var r;
		try {
			e && ye(r = e.promise) ? r.call(e).done(t).fail(n) : e && ye(r = e.then) ? r.call(e, t, n) : t.apply(undefined, [e].slice(i))
		} catch (e) {
			n.apply(undefined, [e])
		}
	}

	function d() {
		se.removeEventListener("DOMContentLoaded", d), e.removeEventListener("load", d), Te.ready()
	}

	function h(e, t) {
		return t.toUpperCase()
	}

	function p(e) {
		return e.replace(je, "ms-").replace(Me, h)
	}

	function g() {
		this.expando = Te.expando + g.uid++
	}

	function m(e) {
		return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : Ue.test(e) ? JSON.parse(e) : e)
	}

	function v(e, t, n) {
		var i;
		if (n === undefined && 1 === e.nodeType)
			if (i = "data-" + t.replace($e, "-$&").toLowerCase(), "string" == typeof (n = e.getAttribute(i))) {
				try {
					n = m(n)
				} catch (r) {}
				qe.set(e, t, n)
			} else n = undefined;
		return n
	}

	function y(e, t, n, i) {
		var r, o, s = 20,
			a = i ? function () {
				return i.cur()
			} : function () {
				return Te.css(e, t, "")
			},
			l = a(),
			u = n && n[3] || (Te.cssNumber[t] ? "" : "px"),
			c = (Te.cssNumber[t] || "px" !== u && +l) && Ve.exec(Te.css(e, t));
		if (c && c[3] !== u) {
			for (l /= 2, u = u || c[3], c = +l || 1; s--;) Te.style(e, t, c + u), (1 - o) * (1 - (o = a() / l || .5)) <= 0 && (s = 0), c /= o;
			c *= 2, Te.style(e, t, c + u), n = n || []
		}
		return n && (c = +c || +l || 0, r = n[1] ? c + (n[1] + 1) * n[2] : +n[2], i && (i.unit = u, i.start = c, i.end = r)), r
	}

	function _(e) {
		var t, n = e.ownerDocument,
			i = e.nodeName,
			r = Ye[i];
		return r || (t = n.body.appendChild(n.createElement(i)), r = Te.css(t, "display"), t.parentNode.removeChild(t), "none" === r && (r = "block"), Ye[i] = r, r)
	}

	function b(e, t) {
		for (var n, i, r = [], o = 0, s = e.length; o < s; o++)(i = e[o]).style && (n = i.style.display, t ? ("none" === n && (r[o] = Fe.get(i, "display") || null, r[o] || (i.style.display = "")), "" === i.style.display && Ke(i) && (r[o] = _(i))) : "none" !== n && (r[o] = "none", Fe.set(i, "display", n)));
		for (o = 0; o < s; o++) null != r[o] && (e[o].style.display = r[o]);
		return e
	}

	function E(e, t) {
		var n;
		return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [], t === undefined || t && o(e, t) ? Te.merge([e], n) : n
	}

	function T(e, t) {
		for (var n = 0, i = e.length; n < i; n++) Fe.set(e[n], "globalEval", !t || Fe.get(t[n], "globalEval"))
	}

	function w(e, t, n, r, o) {
		for (var s, a, l, u, c, f, d = t.createDocumentFragment(), h = [], p = 0, g = e.length; p < g; p++)
			if ((s = e[p]) || 0 === s)
				if ("object" === i(s)) Te.merge(h, s.nodeType ? [s] : s);
				else if (nt.test(s)) {
			for (a = a || d.appendChild(t.createElement("div")), l = (Xe.exec(s) || ["", ""])[1].toLowerCase(), u = Ze[l] || Ze._default, a.innerHTML = u[1] + Te.htmlPrefilter(s) + u[2], f = u[0]; f--;) a = a.lastChild;
			Te.merge(h, a.childNodes), (a = d.firstChild).textContent = ""
		} else h.push(t.createTextNode(s));
		for (d.textContent = "", p = 0; s = h[p++];)
			if (r && Te.inArray(s, r) > -1) o && o.push(s);
			else if (c = Te.contains(s.ownerDocument, s), a = E(d.appendChild(s), "script"), c && T(a), n)
			for (f = 0; s = a[f++];) Je.test(s.type || "") && n.push(s);
		return d
	}

	function C() {
		return !0
	}

	function S() {
		return !1
	}

	function x() {
		try {
			return se.activeElement
		} catch (e) {}
	}

	function A(e, t, n, i, r, o) {
		var s, a;
		if ("object" == typeof t) {
			for (a in "string" != typeof n && (i = i || n, n = undefined), t) A(e, a, n, i, t[a], o);
			return e
		}
		if (null == i && null == r ? (r = n, i = n = undefined) : null == r && ("string" == typeof n ? (r = i, i = undefined) : (r = i, i = n, n = undefined)), !1 === r) r = S;
		else if (!r) return e;
		return 1 === o && (s = r, (r = function (e) {
			return Te().off(e), s.apply(this, arguments)
		}).guid = s.guid || (s.guid = Te.guid++)), e.each(function () {
			Te.event.add(this, t, r, i, n)
		})
	}

	function D(e, t) {
		return o(e, "table") && o(11 !== t.nodeType ? t : t.firstChild, "tr") && Te(e).children("tbody")[0] || e
	}

	function O(e) {
		return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
	}

	function N(e) {
		return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
	}

	function I(e, t) {
		var n, i, r, o, s, a, l, u;
		if (1 === t.nodeType) {
			if (Fe.hasData(e) && (o = Fe.access(e), s = Fe.set(t, o), u = o.events))
				for (r in delete s.handle, s.events = {}, u)
					for (n = 0, i = u[r].length; n < i; n++) Te.event.add(t, r, u[r][n]);
			qe.hasData(e) && (a = qe.access(e), l = Te.extend({}, a), qe.set(t, l))
		}
	}

	function L(e, t) {
		var n = t.nodeName.toLowerCase();
		"input" === n && Qe.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
	}

	function P(e, t, i, r) {
		t = ue.apply([], t);
		var o, s, a, l, u, c, f = 0,
			d = e.length,
			h = d - 1,
			p = t[0],
			g = ye(p);
		if (g || d > 1 && "string" == typeof p && !ve.checkClone && ut.test(p)) return e.each(function (n) {
			var o = e.eq(n);
			g && (t[0] = p.call(this, n, o.html())), P(o, t, i, r)
		});
		if (d && (s = (o = w(t, e[0].ownerDocument, !1, e, r)).firstChild, 1 === o.childNodes.length && (o = s), s || r)) {
			for (l = (a = Te.map(E(o, "script"), O)).length; f < d; f++) u = o, f !== h && (u = Te.clone(u, !0, !0), l && Te.merge(a, E(u, "script"))), i.call(e[f], u, f);
			if (l)
				for (c = a[a.length - 1].ownerDocument, Te.map(a, N), f = 0; f < l; f++) u = a[f], Je.test(u.type || "") && !Fe.access(u, "globalEval") && Te.contains(c, u) && (u.src && "module" !== (u.type || "").toLowerCase() ? Te._evalUrl && Te._evalUrl(u.src) : n(u.textContent.replace(ct, ""), c, u))
		}
		return e
	}

	function R(e, t, n) {
		for (var i, r = t ? Te.filter(t, e) : e, o = 0; null != (i = r[o]); o++) n || 1 !== i.nodeType || Te.cleanData(E(i)), i.parentNode && (n && Te.contains(i.ownerDocument, i) && T(E(i, "script")), i.parentNode.removeChild(i));
		return e
	}

	function k(e, t, n) {
		var i, r, o, s, a = e.style;
		return (n = n || dt(e)) && ("" !== (s = n.getPropertyValue(t) || n[t]) || Te.contains(e.ownerDocument, e) || (s = Te.style(e, t)), !ve.pixelBoxStyles() && ft.test(s) && ht.test(t) && (i = a.width, r = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = i, a.minWidth = r, a.maxWidth = o)), s !== undefined ? s + "" : s
	}

	function H(e, t) {
		return {
			get: function () {
				if (!e()) return (this.get = t).apply(this, arguments);
				delete this.get
			}
		}
	}

	function j(e) {
		if (e in _t) return e;
		for (var t = e[0].toUpperCase() + e.slice(1), n = yt.length; n--;)
			if ((e = yt[n] + t) in _t) return e
	}

	function M(e) {
		var t = Te.cssProps[e];
		return t || (t = Te.cssProps[e] = j(e) || e), t
	}

	function W(e, t, n) {
		var i = Ve.exec(t);
		return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : t
	}

	function F(e, t, n, i, r, o) {
		var s = "width" === t ? 1 : 0,
			a = 0,
			l = 0;
		if (n === (i ? "border" : "content")) return 0;
		for (; s < 4; s += 2) "margin" === n && (l += Te.css(e, n + Ge[s], !0, r)), i ? ("content" === n && (l -= Te.css(e, "padding" + Ge[s], !0, r)), "margin" !== n && (l -= Te.css(e, "border" + Ge[s] + "Width", !0, r))) : (l += Te.css(e, "padding" + Ge[s], !0, r), "padding" !== n ? l += Te.css(e, "border" + Ge[s] + "Width", !0, r) : a += Te.css(e, "border" + Ge[s] + "Width", !0, r));
		return !i && o >= 0 && (l += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - l - a - .5))), l
	}

	function q(e, t, n) {
		var i = dt(e),
			r = k(e, t, i),
			o = "border-box" === Te.css(e, "boxSizing", !1, i),
			s = o;
		if (ft.test(r)) {
			if (!n) return r;
			r = "auto"
		}
		return s = s && (ve.boxSizingReliable() || r === e.style[t]), ("auto" === r || !parseFloat(r) && "inline" === Te.css(e, "display", !1, i)) && (r = e["offset" + t[0].toUpperCase() + t.slice(1)], s = !0), (r = parseFloat(r) || 0) + F(e, t, n || (o ? "border" : "content"), s, i, r) + "px"
	}

	function U(e, t, n, i, r) {
		return new U.prototype.init(e, t, n, i, r)
	}

	function $() {
		Et && (!1 === se.hidden && e.requestAnimationFrame ? e.requestAnimationFrame($) : e.setTimeout($, Te.fx.interval), Te.fx.tick())
	}

	function B() {
		return e.setTimeout(function () {
			bt = undefined
		}), bt = Date.now()
	}

	function V(e, t) {
		var n, i = 0,
			r = {
				height: e
			};
		for (t = t ? 1 : 0; i < 4; i += 2 - t) r["margin" + (n = Ge[i])] = r["padding" + n] = e;
		return t && (r.opacity = r.width = e), r
	}

	function G(e, t, n) {
		for (var i, r = (Y.tweeners[t] || []).concat(Y.tweeners["*"]), o = 0, s = r.length; o < s; o++)
			if (i = r[o].call(n, t, e)) return i
	}

	function K(e, t, n) {
		var i, r, o, s, a, l, u, c, f = "width" in t || "height" in t,
			d = this,
			h = {},
			p = e.style,
			g = e.nodeType && Ke(e),
			m = Fe.get(e, "fxshow");
		for (i in n.queue || (null == (s = Te._queueHooks(e, "fx")).unqueued && (s.unqueued = 0, a = s.empty.fire, s.empty.fire = function () {
			s.unqueued || a()
		}), s.unqueued++, d.always(function () {
			d.always(function () {
				s.unqueued--, Te.queue(e, "fx").length || s.empty.fire()
			})
		})), t)
			if (r = t[i], Tt.test(r)) {
				if (delete t[i], o = o || "toggle" === r, r === (g ? "hide" : "show")) {
					if ("show" !== r || !m || m[i] === undefined) continue;
					g = !0
				}
				h[i] = m && m[i] || Te.style(e, i)
			}
		if ((l = !Te.isEmptyObject(t)) || !Te.isEmptyObject(h))
			for (i in f && 1 === e.nodeType && (n.overflow = [p.overflow, p.overflowX, p.overflowY], null == (u = m && m.display) && (u = Fe.get(e, "display")), "none" === (c = Te.css(e, "display")) && (u ? c = u : (b([e], !0), u = e.style.display || u, c = Te.css(e, "display"), b([e]))), ("inline" === c || "inline-block" === c && null != u) && "none" === Te.css(e, "float") && (l || (d.done(function () {
				p.display = u
			}), null == u && (c = p.display, u = "none" === c ? "" : c)), p.display = "inline-block")), n.overflow && (p.overflow = "hidden", d.always(function () {
				p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
			})), l = !1, h) l || (m ? "hidden" in m && (g = m.hidden) : m = Fe.access(e, "fxshow", {
				display: u
			}), o && (m.hidden = !g), g && b([e], !0), d.done(function () {
				for (i in g || b([e]), Fe.remove(e, "fxshow"), h) Te.style(e, i, h[i])
			})), l = G(g ? m[i] : 0, i, d), i in m || (m[i] = l.start, g && (l.end = l.start, l.start = 0))
	}

	function z(e, t) {
		var n, i, r, o, s;
		for (n in e)
			if (r = t[i = p(n)], o = e[n], Array.isArray(o) && (r = o[1], o = e[n] = o[0]), n !== i && (e[i] = o, delete e[n]), (s = Te.cssHooks[i]) && "expand" in s)
				for (n in o = s.expand(o), delete e[i], o) n in e || (e[n] = o[n], t[n] = r);
			else t[i] = r
	}

	function Y(e, t, n) {
		var i, r, o = 0,
			s = Y.prefilters.length,
			a = Te.Deferred().always(function () {
				delete l.elem
			}),
			l = function () {
				if (r) return !1;
				for (var t = bt || B(), n = Math.max(0, u.startTime + u.duration - t), i = 1 - (n / u.duration || 0), o = 0, s = u.tweens.length; o < s; o++) u.tweens[o].run(i);
				return a.notifyWith(e, [u, i, n]), i < 1 && s ? n : (s || a.notifyWith(e, [u, 1, 0]), a.resolveWith(e, [u]), !1)
			},
			u = a.promise({
				elem: e,
				props: Te.extend({}, t),
				opts: Te.extend(!0, {
					specialEasing: {},
					easing: Te.easing._default
				}, n),
				originalProperties: t,
				originalOptions: n,
				startTime: bt || B(),
				duration: n.duration,
				tweens: [],
				createTween: function (t, n) {
					var i = Te.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
					return u.tweens.push(i), i
				},
				stop: function (t) {
					var n = 0,
						i = t ? u.tweens.length : 0;
					if (r) return this;
					for (r = !0; n < i; n++) u.tweens[n].run(1);
					return t ? (a.notifyWith(e, [u, 1, 0]), a.resolveWith(e, [u, t])) : a.rejectWith(e, [u, t]), this
				}
			}),
			c = u.props;
		for (z(c, u.opts.specialEasing); o < s; o++)
			if (i = Y.prefilters[o].call(u, e, c, u.opts)) return ye(i.stop) && (Te._queueHooks(u.elem, u.opts.queue).stop = i.stop.bind(i)), i;
		return Te.map(c, G, u), ye(u.opts.start) && u.opts.start.call(e, u), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always), Te.fx.timer(Te.extend(l, {
			elem: e,
			anim: u,
			queue: u.opts.queue
		})), u
	}

	function Q(e) {
		return (e.match(Pe) || []).join(" ")
	}

	function X(e) {
		return e.getAttribute && e.getAttribute("class") || ""
	}

	function J(e) {
		return Array.isArray(e) ? e : "string" == typeof e && e.match(Pe) || []
	}

	function Z(e, t, n, r) {
		var o;
		if (Array.isArray(t)) Te.each(t, function (t, i) {
			n || Rt.test(e) ? r(e, i) : Z(e + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, n, r)
		});
		else if (n || "object" !== i(t)) r(e, t);
		else
			for (o in t) Z(e + "[" + o + "]", t[o], n, r)
	}

	function ee(e) {
		return function (t, n) {
			"string" != typeof t && (n = t, t = "*");
			var i, r = 0,
				o = t.toLowerCase().match(Pe) || [];
			if (ye(n))
				for (; i = o[r++];) "+" === i[0] ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
		}
	}

	function te(e, t, n, i) {
		function r(a) {
			var l;
			return o[a] = !0, Te.each(e[a] || [], function (e, a) {
				var u = a(t, n, i);
				return "string" != typeof u || s || o[u] ? s ? !(l = u) : void 0 : (t.dataTypes.unshift(u), r(u), !1)
			}), l
		}
		var o = {},
			s = e === Gt;
		return r(t.dataTypes[0]) || !o["*"] && r("*")
	}

	function ne(e, t) {
		var n, i, r = Te.ajaxSettings.flatOptions || {};
		for (n in t) t[n] !== undefined && ((r[n] ? e : i || (i = {}))[n] = t[n]);
		return i && Te.extend(!0, e, i), e
	}

	function ie(e, t, n) {
		for (var i, r, o, s, a = e.contents, l = e.dataTypes;
			"*" === l[0];) l.shift(), i === undefined && (i = e.mimeType || t.getResponseHeader("Content-Type"));
		if (i)
			for (r in a)
				if (a[r] && a[r].test(i)) {
					l.unshift(r);
					break
				}
		if (l[0] in n) o = l[0];
		else {
			for (r in n) {
				if (!l[0] || e.converters[r + " " + l[0]]) {
					o = r;
					break
				}
				s || (s = r)
			}
			o = o || s
		} if (o) return o !== l[0] && l.unshift(o), n[o]
	}

	function re(e, t, n, i) {
		var r, o, s, a, l, u = {},
			c = e.dataTypes.slice();
		if (c[1])
			for (s in e.converters) u[s.toLowerCase()] = e.converters[s];
		for (o = c.shift(); o;)
			if (e.responseFields[o] && (n[e.responseFields[o]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = c.shift())
				if ("*" === o) o = l;
				else if ("*" !== l && l !== o) {
			if (!(s = u[l + " " + o] || u["* " + o]))
				for (r in u)
					if ((a = r.split(" "))[1] === o && (s = u[l + " " + a[0]] || u["* " + a[0]])) {
						!0 === s ? s = u[r] : !0 !== u[r] && (o = a[0], c.unshift(a[1]));
						break
					}
			if (!0 !== s)
				if (s && e.throws) t = s(t);
				else try {
					t = s(t)
				} catch (f) {
					return {
						state: "parsererror",
						error: s ? f : "No conversion from " + l + " to " + o
					}
				}
		}
		return {
			state: "success",
			data: t
		}
	}
	var oe = [],
		se = e.document,
		ae = Object.getPrototypeOf,
		le = oe.slice,
		ue = oe.concat,
		ce = oe.push,
		fe = oe.indexOf,
		de = {},
		he = de.toString,
		pe = de.hasOwnProperty,
		ge = pe.toString,
		me = ge.call(Object),
		ve = {},
		ye = function (e) {
			return "function" == typeof e && "number" != typeof e.nodeType
		},
		_e = function (e) {
			return null != e && e === e.window
		},
		be = {
			type: !0,
			src: !0,
			noModule: !0
		},
		Ee = "3.3.1",
		Te = function (e, t) {
			return new Te.fn.init(e, t)
		},
		we = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
	Te.fn = Te.prototype = {
		jquery: Ee,
		constructor: Te,
		length: 0,
		toArray: function () {
			return le.call(this)
		},
		get: function (e) {
			return null == e ? le.call(this) : e < 0 ? this[e + this.length] : this[e]
		},
		pushStack: function (e) {
			var t = Te.merge(this.constructor(), e);
			return t.prevObject = this, t
		},
		each: function (e) {
			return Te.each(this, e)
		},
		map: function (e) {
			return this.pushStack(Te.map(this, function (t, n) {
				return e.call(t, n, t)
			}))
		},
		slice: function () {
			return this.pushStack(le.apply(this, arguments))
		},
		first: function () {
			return this.eq(0)
		},
		last: function () {
			return this.eq(-1)
		},
		eq: function (e) {
			var t = this.length,
				n = +e + (e < 0 ? t : 0);
			return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
		},
		end: function () {
			return this.prevObject || this.constructor()
		},
		push: ce,
		sort: oe.sort,
		splice: oe.splice
	}, Te.extend = Te.fn.extend = function () {
		var e, t, n, i, r, o, s = arguments[0] || {},
			a = 1,
			l = arguments.length,
			u = !1;
		for ("boolean" == typeof s && (u = s, s = arguments[a] || {}, a++), "object" == typeof s || ye(s) || (s = {}), a === l && (s = this, a--); a < l; a++)
			if (null != (e = arguments[a]))
				for (t in e) n = s[t], s !== (i = e[t]) && (u && i && (Te.isPlainObject(i) || (r = Array.isArray(i))) ? (r ? (r = !1, o = n && Array.isArray(n) ? n : []) : o = n && Te.isPlainObject(n) ? n : {}, s[t] = Te.extend(u, o, i)) : i !== undefined && (s[t] = i));
		return s
	}, Te.extend({
		expando: "jQuery" + (Ee + Math.random()).replace(/\D/g, ""),
		isReady: !0,
		error: function (e) {
			throw new Error(e)
		},
		noop: function () {},
		isPlainObject: function (e) {
			var t, n;
			return !(!e || "[object Object]" !== he.call(e)) && (!(t = ae(e)) || "function" == typeof (n = pe.call(t, "constructor") && t.constructor) && ge.call(n) === me)
		},
		isEmptyObject: function (e) {
			var t;
			for (t in e) return !1;
			return !0
		},
		globalEval: function (e) {
			n(e)
		},
		each: function (e, t) {
			var n, i = 0;
			if (r(e))
				for (n = e.length; i < n && !1 !== t.call(e[i], i, e[i]); i++);
			else
				for (i in e)
					if (!1 === t.call(e[i], i, e[i])) break; return e
		},
		trim: function (e) {
			return null == e ? "" : (e + "").replace(we, "")
		},
		makeArray: function (e, t) {
			var n = t || [];
			return null != e && (r(Object(e)) ? Te.merge(n, "string" == typeof e ? [e] : e) : ce.call(n, e)), n
		},
		inArray: function (e, t, n) {
			return null == t ? -1 : fe.call(t, e, n)
		},
		merge: function (e, t) {
			for (var n = +t.length, i = 0, r = e.length; i < n; i++) e[r++] = t[i];
			return e.length = r, e
		},
		grep: function (e, t, n) {
			for (var i = [], r = 0, o = e.length, s = !n; r < o; r++)!t(e[r], r) !== s && i.push(e[r]);
			return i
		},
		map: function (e, t, n) {
			var i, o, s = 0,
				a = [];
			if (r(e))
				for (i = e.length; s < i; s++) null != (o = t(e[s], s, n)) && a.push(o);
			else
				for (s in e) null != (o = t(e[s], s, n)) && a.push(o);
			return ue.apply([], a)
		},
		guid: 1,
		support: ve
	}), "function" == typeof Symbol && (Te.fn[Symbol.iterator] = oe[Symbol.iterator]), Te.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
		de["[object " + t + "]"] = t.toLowerCase()
	});
	var Ce = function (e) {
		function t(e, t, n, i) {
			var r, o, s, a, l, u, c, d = t && t.ownerDocument,
				p = t ? t.nodeType : 9;
			if (n = n || [], "string" != typeof e || !e || 1 !== p && 9 !== p && 11 !== p) return n;
			if (!i && ((t ? t.ownerDocument || t : q) !== P && L(t), t = t || P, k)) {
				if (11 !== p && (l = ve.exec(e)))
					if (r = l[1]) {
						if (9 === p) {
							if (!(s = t.getElementById(r))) return n;
							if (s.id === r) return n.push(s), n
						} else if (d && (s = d.getElementById(r)) && W(t, s) && s.id === r) return n.push(s), n
					} else {
						if (l[2]) return J.apply(n, t.getElementsByTagName(e)), n;
						if ((r = l[3]) && T.getElementsByClassName && t.getElementsByClassName) return J.apply(n, t.getElementsByClassName(r)), n
					}
				if (T.qsa && !G[e + " "] && (!H || !H.test(e))) {
					if (1 !== p) d = t, c = e;
					else if ("object" !== t.nodeName.toLowerCase()) {
						for ((a = t.getAttribute("id")) ? a = a.replace(Ee, Te) : t.setAttribute("id", a = F), o = (u = x(e)).length; o--;) u[o] = "#" + a + " " + h(u[o]);
						c = u.join(","), d = ye.test(e) && f(t.parentNode) || t
					}
					if (c) try {
						return J.apply(n, d.querySelectorAll(c)), n
					} catch (g) {} finally {
						a === F && t.removeAttribute("id")
					}
				}
			}
			return D(e.replace(ae, "$1"), t, n, i)
		}

		function n() {
			function e(n, i) {
				return t.push(n + " ") > w.cacheLength && delete e[t.shift()], e[n + " "] = i
			}
			var t = [];
			return e
		}

		function i(e) {
			return e[F] = !0, e
		}

		function r(e) {
			var t = P.createElement("fieldset");
			try {
				return !!e(t)
			} catch (n) {
				return !1
			} finally {
				t.parentNode && t.parentNode.removeChild(t), t = null
			}
		}

		function o(e, t) {
			for (var n = e.split("|"), i = n.length; i--;) w.attrHandle[n[i]] = t
		}

		function s(e, t) {
			var n = t && e,
				i = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
			if (i) return i;
			if (n)
				for (; n = n.nextSibling;)
					if (n === t) return -1;
			return e ? 1 : -1
		}

		function a(e) {
			return function (t) {
				return "input" === t.nodeName.toLowerCase() && t.type === e
			}
		}

		function l(e) {
			return function (t) {
				var n = t.nodeName.toLowerCase();
				return ("input" === n || "button" === n) && t.type === e
			}
		}

		function u(e) {
			return function (t) {
				return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && Ce(t) === e : t.disabled === e : "label" in t && t.disabled === e
			}
		}

		function c(e) {
			return i(function (t) {
				return t = +t, i(function (n, i) {
					for (var r, o = e([], n.length, t), s = o.length; s--;) n[r = o[s]] && (n[r] = !(i[r] = n[r]))
				})
			})
		}

		function f(e) {
			return e && "undefined" != typeof e.getElementsByTagName && e
		}

		function d() {}

		function h(e) {
			for (var t = 0, n = e.length, i = ""; t < n; t++) i += e[t].value;
			return i
		}

		function p(e, t, n) {
			var i = t.dir,
				r = t.next,
				o = r || i,
				s = n && "parentNode" === o,
				a = $++;
			return t.first ? function (t, n, r) {
				for (; t = t[i];)
					if (1 === t.nodeType || s) return e(t, n, r);
				return !1
			} : function (t, n, l) {
				var u, c, f, d = [U, a];
				if (l) {
					for (; t = t[i];)
						if ((1 === t.nodeType || s) && e(t, n, l)) return !0
				} else
					for (; t = t[i];)
						if (1 === t.nodeType || s)
							if (c = (f = t[F] || (t[F] = {}))[t.uniqueID] || (f[t.uniqueID] = {}), r && r === t.nodeName.toLowerCase()) t = t[i] || t;
							else {
								if ((u = c[o]) && u[0] === U && u[1] === a) return d[2] = u[2];
								if (c[o] = d, d[2] = e(t, n, l)) return !0
							} return !1
			}
		}

		function g(e) {
			return e.length > 1 ? function (t, n, i) {
				for (var r = e.length; r--;)
					if (!e[r](t, n, i)) return !1;
				return !0
			} : e[0]
		}

		function m(e, n, i) {
			for (var r = 0, o = n.length; r < o; r++) t(e, n[r], i);
			return i
		}

		function v(e, t, n, i, r) {
			for (var o, s = [], a = 0, l = e.length, u = null != t; a < l; a++)(o = e[a]) && (n && !n(o, i, r) || (s.push(o), u && t.push(a)));
			return s
		}

		function y(e, t, n, r, o, s) {
			return r && !r[F] && (r = y(r)), o && !o[F] && (o = y(o, s)), i(function (i, s, a, l) {
				var u, c, f, d = [],
					h = [],
					p = s.length,
					g = i || m(t || "*", a.nodeType ? [a] : a, []),
					y = !e || !i && t ? g : v(g, d, e, a, l),
					_ = n ? o || (i ? e : p || r) ? [] : s : y;
				if (n && n(y, _, a, l), r)
					for (u = v(_, h), r(u, [], a, l), c = u.length; c--;)(f = u[c]) && (_[h[c]] = !(y[h[c]] = f));
				if (i) {
					if (o || e) {
						if (o) {
							for (u = [], c = _.length; c--;)(f = _[c]) && u.push(y[c] = f);
							o(null, _ = [], u, l)
						}
						for (c = _.length; c--;)(f = _[c]) && (u = o ? ee(i, f) : d[c]) > -1 && (i[u] = !(s[u] = f))
					}
				} else _ = v(_ === s ? _.splice(p, _.length) : _), o ? o(null, s, _, l) : J.apply(s, _)
			})
		}

		function _(e) {
			for (var t, n, i, r = e.length, o = w.relative[e[0].type], s = o || w.relative[" "], a = o ? 1 : 0, l = p(function (e) {
				return e === t
			}, s, !0), u = p(function (e) {
				return ee(t, e) > -1
			}, s, !0), c = [
				function (e, n, i) {
					var r = !o && (i || n !== O) || ((t = n).nodeType ? l(e, n, i) : u(e, n, i));
					return t = null, r
				}
			]; a < r; a++)
				if (n = w.relative[e[a].type]) c = [p(g(c), n)];
				else {
					if ((n = w.filter[e[a].type].apply(null, e[a].matches))[F]) {
						for (i = ++a; i < r && !w.relative[e[i].type]; i++);
						return y(a > 1 && g(c), a > 1 && h(e.slice(0, a - 1).concat({
							value: " " === e[a - 2].type ? "*" : ""
						})).replace(ae, "$1"), n, a < i && _(e.slice(a, i)), i < r && _(e = e.slice(i)), i < r && h(e))
					}
					c.push(n)
				}
			return g(c)
		}

		function b(e, n) {
			var r = n.length > 0,
				o = e.length > 0,
				s = function (i, s, a, l, u) {
					var c, f, d, h = 0,
						p = "0",
						g = i && [],
						m = [],
						y = O,
						_ = i || o && w.find.TAG("*", u),
						b = U += null == y ? 1 : Math.random() || .1,
						E = _.length;
					for (u && (O = s === P || s || u); p !== E && null != (c = _[p]); p++) {
						if (o && c) {
							for (f = 0, s || c.ownerDocument === P || (L(c), a = !k); d = e[f++];)
								if (d(c, s || P, a)) {
									l.push(c);
									break
								}
							u && (U = b)
						}
						r && ((c = !d && c) && h--, i && g.push(c))
					}
					if (h += p, r && p !== h) {
						for (f = 0; d = n[f++];) d(g, m, s, a);
						if (i) {
							if (h > 0)
								for (; p--;) g[p] || m[p] || (m[p] = Q.call(l));
							m = v(m)
						}
						J.apply(l, m), u && !i && m.length > 0 && h + n.length > 1 && t.uniqueSort(l)
					}
					return u && (U = b, O = y), g
				};
			return r ? i(s) : s
		}
		var E, T, w, C, S, x, A, D, O, N, I, L, P, R, k, H, j, M, W, F = "sizzle" + 1 * new Date,
			q = e.document,
			U = 0,
			$ = 0,
			B = n(),
			V = n(),
			G = n(),
			K = function (e, t) {
				return e === t && (I = !0), 0
			},
			z = {}.hasOwnProperty,
			Y = [],
			Q = Y.pop,
			X = Y.push,
			J = Y.push,
			Z = Y.slice,
			ee = function (e, t) {
				for (var n = 0, i = e.length; n < i; n++)
					if (e[n] === t) return n;
				return -1
			},
			te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
			ne = "[\\x20\\t\\r\\n\\f]",
			ie = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
			re = "\\[" + ne + "*(" + ie + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ie + "))|)" + ne + "*\\]",
			oe = ":(" + ie + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + re + ")*)|.*)\\)|)",
			se = new RegExp(ne + "+", "g"),
			ae = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
			le = new RegExp("^" + ne + "*," + ne + "*"),
			ue = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
			ce = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
			fe = new RegExp(oe),
			de = new RegExp("^" + ie + "$"),
			he = {
				ID: new RegExp("^#(" + ie + ")"),
				CLASS: new RegExp("^\\.(" + ie + ")"),
				TAG: new RegExp("^(" + ie + "|[*])"),
				ATTR: new RegExp("^" + re),
				PSEUDO: new RegExp("^" + oe),
				CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
				bool: new RegExp("^(?:" + te + ")$", "i"),
				needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
			},
			pe = /^(?:input|select|textarea|button)$/i,
			ge = /^h\d$/i,
			me = /^[^{]+\{\s*\[native \w/,
			ve = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
			ye = /[+~]/,
			_e = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
			be = function (e, t, n) {
				var i = "0x" + t - 65536;
				return i != i || n ? t : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
			},
			Ee = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
			Te = function (e, t) {
				return t ? "\0" === e ? "\ufffd" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
			},
			we = function () {
				L()
			},
			Ce = p(function (e) {
				return !0 === e.disabled && ("form" in e || "label" in e)
			}, {
				dir: "parentNode",
				next: "legend"
			});
		try {
			J.apply(Y = Z.call(q.childNodes), q.childNodes), Y[q.childNodes.length].nodeType
		} catch (Se) {
			J = {
				apply: Y.length ? function (e, t) {
					X.apply(e, Z.call(t))
				} : function (e, t) {
					for (var n = e.length, i = 0; e[n++] = t[i++];);
					e.length = n - 1
				}
			}
		}
		for (E in T = t.support = {}, S = t.isXML = function (e) {
			var t = e && (e.ownerDocument || e).documentElement;
			return !!t && "HTML" !== t.nodeName
		}, L = t.setDocument = function (e) {
			var t, n, i = e ? e.ownerDocument || e : q;
			return i !== P && 9 === i.nodeType && i.documentElement ? (R = (P = i).documentElement, k = !S(P), q !== P && (n = P.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", we, !1) : n.attachEvent && n.attachEvent("onunload", we)), T.attributes = r(function (e) {
				return e.className = "i", !e.getAttribute("className")
			}), T.getElementsByTagName = r(function (e) {
				return e.appendChild(P.createComment("")), !e.getElementsByTagName("*").length
			}), T.getElementsByClassName = me.test(P.getElementsByClassName), T.getById = r(function (e) {
				return R.appendChild(e).id = F, !P.getElementsByName || !P.getElementsByName(F).length
			}), T.getById ? (w.filter.ID = function (e) {
				var t = e.replace(_e, be);
				return function (e) {
					return e.getAttribute("id") === t
				}
			}, w.find.ID = function (e, t) {
				if ("undefined" != typeof t.getElementById && k) {
					var n = t.getElementById(e);
					return n ? [n] : []
				}
			}) : (w.filter.ID = function (e) {
				var t = e.replace(_e, be);
				return function (e) {
					var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
					return n && n.value === t
				}
			}, w.find.ID = function (e, t) {
				if ("undefined" != typeof t.getElementById && k) {
					var n, i, r, o = t.getElementById(e);
					if (o) {
						if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
						for (r = t.getElementsByName(e), i = 0; o = r[i++];)
							if ((n = o.getAttributeNode("id")) && n.value === e) return [o]
					}
					return []
				}
			}), w.find.TAG = T.getElementsByTagName ? function (e, t) {
				return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : T.qsa ? t.querySelectorAll(e) : void 0
			} : function (e, t) {
				var n, i = [],
					r = 0,
					o = t.getElementsByTagName(e);
				if ("*" === e) {
					for (; n = o[r++];) 1 === n.nodeType && i.push(n);
					return i
				}
				return o
			}, w.find.CLASS = T.getElementsByClassName && function (e, t) {
				if ("undefined" != typeof t.getElementsByClassName && k) return t.getElementsByClassName(e)
			}, j = [], H = [], (T.qsa = me.test(P.querySelectorAll)) && (r(function (e) {
				R.appendChild(e).innerHTML = "<a id='" + F + "'></a><select id='" + F + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && H.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || H.push("\\[" + ne + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + F + "-]").length || H.push("~="), e.querySelectorAll(":checked").length || H.push(":checked"), e.querySelectorAll("a#" + F + "+*").length || H.push(".#.+[+~]")
			}), r(function (e) {
				e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
				var t = P.createElement("input");
				t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && H.push("name" + ne + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && H.push(":enabled", ":disabled"), R.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && H.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), H.push(",.*:")
			})), (T.matchesSelector = me.test(M = R.matches || R.webkitMatchesSelector || R.mozMatchesSelector || R.oMatchesSelector || R.msMatchesSelector)) && r(function (e) {
				T.disconnectedMatch = M.call(e, "*"), M.call(e, "[s!='']:x"), j.push("!=", oe)
			}), H = H.length && new RegExp(H.join("|")), j = j.length && new RegExp(j.join("|")), t = me.test(R.compareDocumentPosition), W = t || me.test(R.contains) ? function (e, t) {
				var n = 9 === e.nodeType ? e.documentElement : e,
					i = t && t.parentNode;
				return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
			} : function (e, t) {
				if (t)
					for (; t = t.parentNode;)
						if (t === e) return !0;
				return !1
			}, K = t ? function (e, t) {
				if (e === t) return I = !0, 0;
				var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
				return n || (1 & (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !T.sortDetached && t.compareDocumentPosition(e) === n ? e === P || e.ownerDocument === q && W(q, e) ? -1 : t === P || t.ownerDocument === q && W(q, t) ? 1 : N ? ee(N, e) - ee(N, t) : 0 : 4 & n ? -1 : 1)
			} : function (e, t) {
				if (e === t) return I = !0, 0;
				var n, i = 0,
					r = e.parentNode,
					o = t.parentNode,
					a = [e],
					l = [t];
				if (!r || !o) return e === P ? -1 : t === P ? 1 : r ? -1 : o ? 1 : N ? ee(N, e) - ee(N, t) : 0;
				if (r === o) return s(e, t);
				for (n = e; n = n.parentNode;) a.unshift(n);
				for (n = t; n = n.parentNode;) l.unshift(n);
				for (; a[i] === l[i];) i++;
				return i ? s(a[i], l[i]) : a[i] === q ? -1 : l[i] === q ? 1 : 0
			}, P) : P
		}, t.matches = function (e, n) {
			return t(e, null, null, n)
		}, t.matchesSelector = function (e, n) {
			if ((e.ownerDocument || e) !== P && L(e), n = n.replace(ce, "='$1']"), T.matchesSelector && k && !G[n + " "] && (!j || !j.test(n)) && (!H || !H.test(n))) try {
				var i = M.call(e, n);
				if (i || T.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
			} catch (Se) {}
			return t(n, P, null, [e]).length > 0
		}, t.contains = function (e, t) {
			return (e.ownerDocument || e) !== P && L(e), W(e, t)
		}, t.attr = function (e, t) {
			(e.ownerDocument || e) !== P && L(e);
			var n = w.attrHandle[t.toLowerCase()],
				i = n && z.call(w.attrHandle, t.toLowerCase()) ? n(e, t, !k) : undefined;
			return i !== undefined ? i : T.attributes || !k ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
		}, t.escape = function (e) {
			return (e + "").replace(Ee, Te)
		}, t.error = function (e) {
			throw new Error("Syntax error, unrecognized expression: " + e)
		}, t.uniqueSort = function (e) {
			var t, n = [],
				i = 0,
				r = 0;
			if (I = !T.detectDuplicates, N = !T.sortStable && e.slice(0), e.sort(K), I) {
				for (; t = e[r++];) t === e[r] && (i = n.push(r));
				for (; i--;) e.splice(n[i], 1)
			}
			return N = null, e
		}, C = t.getText = function (e) {
			var t, n = "",
				i = 0,
				r = e.nodeType;
			if (r) {
				if (1 === r || 9 === r || 11 === r) {
					if ("string" == typeof e.textContent) return e.textContent;
					for (e = e.firstChild; e; e = e.nextSibling) n += C(e)
				} else if (3 === r || 4 === r) return e.nodeValue
			} else
				for (; t = e[i++];) n += C(t);
			return n
		}, (w = t.selectors = {
			cacheLength: 50,
			createPseudo: i,
			match: he,
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
				ATTR: function (e) {
					return e[1] = e[1].replace(_e, be), e[3] = (e[3] || e[4] || e[5] || "").replace(_e, be), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
				},
				CHILD: function (e) {
					return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
				},
				PSEUDO: function (e) {
					var t, n = !e[6] && e[2];
					return he.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && fe.test(n) && (t = x(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
				}
			},
			filter: {
				TAG: function (e) {
					var t = e.replace(_e, be).toLowerCase();
					return "*" === e ? function () {
						return !0
					} : function (e) {
						return e.nodeName && e.nodeName.toLowerCase() === t
					}
				},
				CLASS: function (e) {
					var t = B[e + " "];
					return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && B(e, function (e) {
						return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
					})
				},
				ATTR: function (e, n, i) {
					return function (r) {
						var o = t.attr(r, e);
						return null == o ? "!=" === n : !n || (o += "", "=" === n ? o === i : "!=" === n ? o !== i : "^=" === n ? i && 0 === o.indexOf(i) : "*=" === n ? i && o.indexOf(i) > -1 : "$=" === n ? i && o.slice(-i.length) === i : "~=" === n ? (" " + o.replace(se, " ") + " ").indexOf(i) > -1 : "|=" === n && (o === i || o.slice(0, i.length + 1) === i + "-"))
					}
				},
				CHILD: function (e, t, n, i, r) {
					var o = "nth" !== e.slice(0, 3),
						s = "last" !== e.slice(-4),
						a = "of-type" === t;
					return 1 === i && 0 === r ? function (e) {
						return !!e.parentNode
					} : function (t, n, l) {
						var u, c, f, d, h, p, g = o !== s ? "nextSibling" : "previousSibling",
							m = t.parentNode,
							v = a && t.nodeName.toLowerCase(),
							y = !l && !a,
							_ = !1;
						if (m) {
							if (o) {
								for (; g;) {
									for (d = t; d = d[g];)
										if (a ? d.nodeName.toLowerCase() === v : 1 === d.nodeType) return !1;
									p = g = "only" === e && !p && "nextSibling"
								}
								return !0
							}
							if (p = [s ? m.firstChild : m.lastChild], s && y) {
								for (_ = (h = (u = (c = (f = (d = m)[F] || (d[F] = {}))[d.uniqueID] || (f[d.uniqueID] = {}))[e] || [])[0] === U && u[1]) && u[2], d = h && m.childNodes[h]; d = ++h && d && d[g] || (_ = h = 0) || p.pop();)
									if (1 === d.nodeType && ++_ && d === t) {
										c[e] = [U, h, _];
										break
									}
							} else if (y && (_ = h = (u = (c = (f = (d = t)[F] || (d[F] = {}))[d.uniqueID] || (f[d.uniqueID] = {}))[e] || [])[0] === U && u[1]), !1 === _)
								for (;
									(d = ++h && d && d[g] || (_ = h = 0) || p.pop()) && ((a ? d.nodeName.toLowerCase() !== v : 1 !== d.nodeType) || !++_ || (y && ((c = (f = d[F] || (d[F] = {}))[d.uniqueID] || (f[d.uniqueID] = {}))[e] = [U, _]), d !== t)););
							return (_ -= r) === i || _ % i == 0 && _ / i >= 0
						}
					}
				},
				PSEUDO: function (e, n) {
					var r, o = w.pseudos[e] || w.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
					return o[F] ? o(n) : o.length > 1 ? (r = [e, e, "", n], w.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function (e, t) {
						for (var i, r = o(e, n), s = r.length; s--;) e[i = ee(e, r[s])] = !(t[i] = r[s])
					}) : function (e) {
						return o(e, 0, r)
					}) : o
				}
			},
			pseudos: {
				not: i(function (e) {
					var t = [],
						n = [],
						r = A(e.replace(ae, "$1"));
					return r[F] ? i(function (e, t, n, i) {
						for (var o, s = r(e, null, i, []), a = e.length; a--;)(o = s[a]) && (e[a] = !(t[a] = o))
					}) : function (e, i, o) {
						return t[0] = e, r(t, null, o, n), t[0] = null, !n.pop()
					}
				}),
				has: i(function (e) {
					return function (n) {
						return t(e, n).length > 0
					}
				}),
				contains: i(function (e) {
					return e = e.replace(_e, be),
						function (t) {
							return (t.textContent || t.innerText || C(t)).indexOf(e) > -1
						}
				}),
				lang: i(function (e) {
					return de.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(_e, be).toLowerCase(),
						function (t) {
							var n;
							do {
								if (n = k ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
							} while ((t = t.parentNode) && 1 === t.nodeType);
							return !1
						}
				}),
				target: function (t) {
					var n = e.location && e.location.hash;
					return n && n.slice(1) === t.id
				},
				root: function (e) {
					return e === R
				},
				focus: function (e) {
					return e === P.activeElement && (!P.hasFocus || P.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
				},
				enabled: u(!1),
				disabled: u(!0),
				checked: function (e) {
					var t = e.nodeName.toLowerCase();
					return "input" === t && !!e.checked || "option" === t && !!e.selected
				},
				selected: function (e) {
					return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
				},
				empty: function (e) {
					for (e = e.firstChild; e; e = e.nextSibling)
						if (e.nodeType < 6) return !1;
					return !0
				},
				parent: function (e) {
					return !w.pseudos.empty(e)
				},
				header: function (e) {
					return ge.test(e.nodeName)
				},
				input: function (e) {
					return pe.test(e.nodeName)
				},
				button: function (e) {
					var t = e.nodeName.toLowerCase();
					return "input" === t && "button" === e.type || "button" === t
				},
				text: function (e) {
					var t;
					return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
				},
				first: c(function () {
					return [0]
				}),
				last: c(function (e, t) {
					return [t - 1]
				}),
				eq: c(function (e, t, n) {
					return [n < 0 ? n + t : n]
				}),
				even: c(function (e, t) {
					for (var n = 0; n < t; n += 2) e.push(n);
					return e
				}),
				odd: c(function (e, t) {
					for (var n = 1; n < t; n += 2) e.push(n);
					return e
				}),
				lt: c(function (e, t, n) {
					for (var i = n < 0 ? n + t : n; --i >= 0;) e.push(i);
					return e
				}),
				gt: c(function (e, t, n) {
					for (var i = n < 0 ? n + t : n; ++i < t;) e.push(i);
					return e
				})
			}
		}).pseudos.nth = w.pseudos.eq, {
			radio: !0,
			checkbox: !0,
			file: !0,
			password: !0,
			image: !0
		}) w.pseudos[E] = a(E);
		for (E in {
			submit: !0,
			reset: !0
		}) w.pseudos[E] = l(E);
		return d.prototype = w.filters = w.pseudos, w.setFilters = new d, x = t.tokenize = function (e, n) {
			var i, r, o, s, a, l, u, c = V[e + " "];
			if (c) return n ? 0 : c.slice(0);
			for (a = e, l = [], u = w.preFilter; a;) {
				for (s in i && !(r = le.exec(a)) || (r && (a = a.slice(r[0].length) || a), l.push(o = [])), i = !1, (r = ue.exec(a)) && (i = r.shift(), o.push({
					value: i,
					type: r[0].replace(ae, " ")
				}), a = a.slice(i.length)), w.filter)!(r = he[s].exec(a)) || u[s] && !(r = u[s](r)) || (i = r.shift(), o.push({
					value: i,
					type: s,
					matches: r
				}), a = a.slice(i.length));
				if (!i) break
			}
			return n ? a.length : a ? t.error(e) : V(e, l).slice(0)
		}, A = t.compile = function (e, t) {
			var n, i = [],
				r = [],
				o = G[e + " "];
			if (!o) {
				for (t || (t = x(e)), n = t.length; n--;)(o = _(t[n]))[F] ? i.push(o) : r.push(o);
				(o = G(e, b(r, i))).selector = e
			}
			return o
		}, D = t.select = function (e, t, n, i) {
			var r, o, s, a, l, u = "function" == typeof e && e,
				c = !i && x(e = u.selector || e);
			if (n = n || [], 1 === c.length) {
				if ((o = c[0] = c[0].slice(0)).length > 2 && "ID" === (s = o[0]).type && 9 === t.nodeType && k && w.relative[o[1].type]) {
					if (!(t = (w.find.ID(s.matches[0].replace(_e, be), t) || [])[0])) return n;
					u && (t = t.parentNode), e = e.slice(o.shift().value.length)
				}
				for (r = he.needsContext.test(e) ? 0 : o.length; r-- && (s = o[r], !w.relative[a = s.type]);)
					if ((l = w.find[a]) && (i = l(s.matches[0].replace(_e, be), ye.test(o[0].type) && f(t.parentNode) || t))) {
						if (o.splice(r, 1), !(e = i.length && h(o))) return J.apply(n, i), n;
						break
					}
			}
			return (u || A(e, c))(i, t, !k, n, !t || ye.test(e) && f(t.parentNode) || t), n
		}, T.sortStable = F.split("").sort(K).join("") === F, T.detectDuplicates = !!I, L(), T.sortDetached = r(function (e) {
			return 1 & e.compareDocumentPosition(P.createElement("fieldset"))
		}), r(function (e) {
			return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
		}) || o("type|href|height|width", function (e, t, n) {
			if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
		}), T.attributes && r(function (e) {
			return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
		}) || o("value", function (e, t, n) {
			if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
		}), r(function (e) {
			return null == e.getAttribute("disabled")
		}) || o(te, function (e, t, n) {
			var i;
			if (!n) return !0 === e[t] ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
		}), t
	}(e);
	Te.find = Ce, Te.expr = Ce.selectors, Te.expr[":"] = Te.expr.pseudos, Te.uniqueSort = Te.unique = Ce.uniqueSort, Te.text = Ce.getText, Te.isXMLDoc = Ce.isXML, Te.contains = Ce.contains, Te.escapeSelector = Ce.escape;
	var Se = function (e, t, n) {
			for (var i = [], r = n !== undefined;
				(e = e[t]) && 9 !== e.nodeType;)
				if (1 === e.nodeType) {
					if (r && Te(e).is(n)) break;
					i.push(e)
				}
			return i
		},
		xe = function (e, t) {
			for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
			return n
		},
		Ae = Te.expr.match.needsContext,
		De = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
	Te.filter = function (e, t, n) {
		var i = t[0];
		return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? Te.find.matchesSelector(i, e) ? [i] : [] : Te.find.matches(e, Te.grep(t, function (e) {
			return 1 === e.nodeType
		}))
	}, Te.fn.extend({
		find: function (e) {
			var t, n, i = this.length,
				r = this;
			if ("string" != typeof e) return this.pushStack(Te(e).filter(function () {
				for (t = 0; t < i; t++)
					if (Te.contains(r[t], this)) return !0
			}));
			for (n = this.pushStack([]), t = 0; t < i; t++) Te.find(e, r[t], n);
			return i > 1 ? Te.uniqueSort(n) : n
		},
		filter: function (e) {
			return this.pushStack(s(this, e || [], !1))
		},
		not: function (e) {
			return this.pushStack(s(this, e || [], !0))
		},
		is: function (e) {
			return !!s(this, "string" == typeof e && Ae.test(e) ? Te(e) : e || [], !1).length
		}
	});
	var Oe, Ne = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
	(Te.fn.init = function (e, t, n) {
		var i, r;
		if (!e) return this;
		if (n = n || Oe, "string" == typeof e) {
			if (!(i = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : Ne.exec(e)) || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
			if (i[1]) {
				if (t = t instanceof Te ? t[0] : t, Te.merge(this, Te.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : se, !0)), De.test(i[1]) && Te.isPlainObject(t))
					for (i in t) ye(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
				return this
			}
			return (r = se.getElementById(i[2])) && (this[0] = r, this.length = 1), this
		}
		return e.nodeType ? (this[0] = e, this.length = 1, this) : ye(e) ? n.ready !== undefined ? n.ready(e) : e(Te) : Te.makeArray(e, this)
	}).prototype = Te.fn, Oe = Te(se);
	var Ie = /^(?:parents|prev(?:Until|All))/,
		Le = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
		};
	Te.fn.extend({
		has: function (e) {
			var t = Te(e, this),
				n = t.length;
			return this.filter(function () {
				for (var e = 0; e < n; e++)
					if (Te.contains(this, t[e])) return !0
			})
		},
		closest: function (e, t) {
			var n, i = 0,
				r = this.length,
				o = [],
				s = "string" != typeof e && Te(e);
			if (!Ae.test(e))
				for (; i < r; i++)
					for (n = this[i]; n && n !== t; n = n.parentNode)
						if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && Te.find.matchesSelector(n, e))) {
							o.push(n);
							break
						}
			return this.pushStack(o.length > 1 ? Te.uniqueSort(o) : o)
		},
		index: function (e) {
			return e ? "string" == typeof e ? fe.call(Te(e), this[0]) : fe.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
		},
		add: function (e, t) {
			return this.pushStack(Te.uniqueSort(Te.merge(this.get(), Te(e, t))))
		},
		addBack: function (e) {
			return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
		}
	}), Te.each({
		parent: function (e) {
			var t = e.parentNode;
			return t && 11 !== t.nodeType ? t : null
		},
		parents: function (e) {
			return Se(e, "parentNode")
		},
		parentsUntil: function (e, t, n) {
			return Se(e, "parentNode", n)
		},
		next: function (e) {
			return a(e, "nextSibling")
		},
		prev: function (e) {
			return a(e, "previousSibling")
		},
		nextAll: function (e) {
			return Se(e, "nextSibling")
		},
		prevAll: function (e) {
			return Se(e, "previousSibling")
		},
		nextUntil: function (e, t, n) {
			return Se(e, "nextSibling", n)
		},
		prevUntil: function (e, t, n) {
			return Se(e, "previousSibling", n)
		},
		siblings: function (e) {
			return xe((e.parentNode || {}).firstChild, e)
		},
		children: function (e) {
			return xe(e.firstChild)
		},
		contents: function (e) {
			return o(e, "iframe") ? e.contentDocument : (o(e, "template") && (e = e.content || e), Te.merge([], e.childNodes))
		}
	}, function (e, t) {
		Te.fn[e] = function (n, i) {
			var r = Te.map(this, t, n);
			return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (r = Te.filter(i, r)), this.length > 1 && (Le[e] || Te.uniqueSort(r), Ie.test(e) && r.reverse()), this.pushStack(r)
		}
	});
	var Pe = /[^\x20\t\r\n\f]+/g;
	Te.Callbacks = function (e) {
		e = "string" == typeof e ? l(e) : Te.extend({}, e);
		var t, n, r, o, s = [],
			a = [],
			u = -1,
			c = function () {
				for (o = o || e.once, r = t = !0; a.length; u = -1)
					for (n = a.shift(); ++u < s.length;)!1 === s[u].apply(n[0], n[1]) && e.stopOnFalse && (u = s.length, n = !1);
				e.memory || (n = !1), t = !1, o && (s = n ? [] : "")
			},
			f = {
				add: function () {
					return s && (n && !t && (u = s.length - 1, a.push(n)), function r(t) {
						Te.each(t, function (t, n) {
							ye(n) ? e.unique && f.has(n) || s.push(n) : n && n.length && "string" !== i(n) && r(n)
						})
					}(arguments), n && !t && c()), this
				},
				remove: function () {
					return Te.each(arguments, function (e, t) {
						for (var n;
							(n = Te.inArray(t, s, n)) > -1;) s.splice(n, 1), n <= u && u--
					}), this
				},
				has: function (e) {
					return e ? Te.inArray(e, s) > -1 : s.length > 0
				},
				empty: function () {
					return s && (s = []), this
				},
				disable: function () {
					return o = a = [], s = n = "", this
				},
				disabled: function () {
					return !s
				},
				lock: function () {
					return o = a = [], n || t || (s = n = ""), this
				},
				locked: function () {
					return !!o
				},
				fireWith: function (e, n) {
					return o || (n = [e, (n = n || []).slice ? n.slice() : n], a.push(n), t || c()), this
				},
				fire: function () {
					return f.fireWith(this, arguments), this
				},
				fired: function () {
					return !!r
				}
			};
		return f
	}, Te.extend({
		Deferred: function (t) {
			var n = [
					["notify", "progress", Te.Callbacks("memory"), Te.Callbacks("memory"), 2],
					["resolve", "done", Te.Callbacks("once memory"), Te.Callbacks("once memory"), 0, "resolved"],
					["reject", "fail", Te.Callbacks("once memory"), Te.Callbacks("once memory"), 1, "rejected"]
				],
				i = "pending",
				r = {
					state: function () {
						return i
					},
					always: function () {
						return o.done(arguments).fail(arguments), this
					},
					"catch": function (e) {
						return r.then(null, e)
					},
					pipe: function () {
						var e = arguments;
						return Te.Deferred(function (t) {
							Te.each(n, function (n, i) {
								var r = ye(e[i[4]]) && e[i[4]];
								o[i[1]](function () {
									var e = r && r.apply(this, arguments);
									e && ye(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[i[0] + "With"](this, r ? [e] : arguments)
								})
							}), e = null
						}).promise()
					},
					then: function (t, i, r) {
						function o(t, n, i, r) {
							return function () {
								var a = this,
									l = arguments,
									f = function () {
										var e, f;
										if (!(t < s)) {
											if ((e = i.apply(a, l)) === n.promise()) throw new TypeError("Thenable self-resolution");
											f = e && ("object" == typeof e || "function" == typeof e) && e.then, ye(f) ? r ? f.call(e, o(s, n, u, r), o(s, n, c, r)) : (s++, f.call(e, o(s, n, u, r), o(s, n, c, r), o(s, n, u, n.notifyWith))) : (i !== u && (a = undefined, l = [e]), (r || n.resolveWith)(a, l))
										}
									},
									d = r ? f : function () {
										try {
											f()
										} catch (e) {
											Te.Deferred.exceptionHook && Te.Deferred.exceptionHook(e, d.stackTrace), t + 1 >= s && (i !== c && (a = undefined, l = [e]), n.rejectWith(a, l))
										}
									};
								t ? d() : (Te.Deferred.getStackHook && (d.stackTrace = Te.Deferred.getStackHook()), e.setTimeout(d))
							}
						}
						var s = 0;
						return Te.Deferred(function (e) {
							n[0][3].add(o(0, e, ye(r) ? r : u, e.notifyWith)), n[1][3].add(o(0, e, ye(t) ? t : u)), n[2][3].add(o(0, e, ye(i) ? i : c))
						}).promise()
					},
					promise: function (e) {
						return null != e ? Te.extend(e, r) : r
					}
				},
				o = {};
			return Te.each(n, function (e, t) {
				var s = t[2],
					a = t[5];
				r[t[1]] = s.add, a && s.add(function () {
					i = a
				}, n[3 - e][2].disable, n[3 - e][3].disable, n[0][2].lock, n[0][3].lock), s.add(t[3].fire), o[t[0]] = function () {
					return o[t[0] + "With"](this === o ? undefined : this, arguments), this
				}, o[t[0] + "With"] = s.fireWith
			}), r.promise(o), t && t.call(o, o), o
		},
		when: function (e) {
			var t = arguments.length,
				n = t,
				i = Array(n),
				r = le.call(arguments),
				o = Te.Deferred(),
				s = function (e) {
					return function (n) {
						i[e] = this, r[e] = arguments.length > 1 ? le.call(arguments) : n, --t || o.resolveWith(i, r)
					}
				};
			if (t <= 1 && (f(e, o.done(s(n)).resolve, o.reject, !t), "pending" === o.state() || ye(r[n] && r[n].then))) return o.then();
			for (; n--;) f(r[n], s(n), o.reject);
			return o.promise()
		}
	});
	var Re = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
	Te.Deferred.exceptionHook = function (t, n) {
		e.console && e.console.warn && t && Re.test(t.name) && e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n)
	}, Te.readyException = function (t) {
		e.setTimeout(function () {
			throw t
		})
	};
	var ke = Te.Deferred();
	Te.fn.ready = function (e) {
		return ke.then(e)["catch"](function (e) {
			Te.readyException(e)
		}), this
	}, Te.extend({
		isReady: !1,
		readyWait: 1,
		ready: function (e) {
			(!0 === e ? --Te.readyWait : Te.isReady) || (Te.isReady = !0, !0 !== e && --Te.readyWait > 0 || ke.resolveWith(se, [Te]))
		}
	}), Te.ready.then = ke.then, "complete" === se.readyState || "loading" !== se.readyState && !se.documentElement.doScroll ? e.setTimeout(Te.ready) : (se.addEventListener("DOMContentLoaded", d), e.addEventListener("load", d));
	var He = function (e, t, n, r, o, s, a) {
			var l = 0,
				u = e.length,
				c = null == n;
			if ("object" === i(n))
				for (l in o = !0, n) He(e, t, l, n[l], !0, s, a);
			else if (r !== undefined && (o = !0, ye(r) || (a = !0), c && (a ? (t.call(e, r), t = null) : (c = t, t = function (e, t, n) {
				return c.call(Te(e), n)
			})), t))
				for (; l < u; l++) t(e[l], n, a ? r : r.call(e[l], l, t(e[l], n)));
			return o ? e : c ? t.call(e) : u ? t(e[0], n) : s
		},
		je = /^-ms-/,
		Me = /-([a-z])/g,
		We = function (e) {
			return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
		};
	g.uid = 1, g.prototype = {
		cache: function (e) {
			var t = e[this.expando];
			return t || (t = {}, We(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
				value: t,
				configurable: !0
			}))), t
		},
		set: function (e, t, n) {
			var i, r = this.cache(e);
			if ("string" == typeof t) r[p(t)] = n;
			else
				for (i in t) r[p(i)] = t[i];
			return r
		},
		get: function (e, t) {
			return t === undefined ? this.cache(e) : e[this.expando] && e[this.expando][p(t)]
		},
		access: function (e, t, n) {
			return t === undefined || t && "string" == typeof t && n === undefined ? this.get(e, t) : (this.set(e, t, n), n !== undefined ? n : t)
		},
		remove: function (e, t) {
			var n, i = e[this.expando];
			if (i !== undefined) {
				if (t !== undefined) {
					n = (t = Array.isArray(t) ? t.map(p) : (t = p(t)) in i ? [t] : t.match(Pe) || []).length;
					for (; n--;) delete i[t[n]]
				}(t === undefined || Te.isEmptyObject(i)) && (e.nodeType ? e[this.expando] = undefined : delete e[this.expando])
			}
		},
		hasData: function (e) {
			var t = e[this.expando];
			return t !== undefined && !Te.isEmptyObject(t)
		}
	};
	var Fe = new g,
		qe = new g,
		Ue = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		$e = /[A-Z]/g;
	Te.extend({
		hasData: function (e) {
			return qe.hasData(e) || Fe.hasData(e)
		},
		data: function (e, t, n) {
			return qe.access(e, t, n)
		},
		removeData: function (e, t) {
			qe.remove(e, t)
		},
		_data: function (e, t, n) {
			return Fe.access(e, t, n)
		},
		_removeData: function (e, t) {
			Fe.remove(e, t)
		}
	}), Te.fn.extend({
		data: function (e, t) {
			var n, i, r, o = this[0],
				s = o && o.attributes;
			if (e === undefined) {
				if (this.length && (r = qe.get(o), 1 === o.nodeType && !Fe.get(o, "hasDataAttrs"))) {
					for (n = s.length; n--;) s[n] && 0 === (i = s[n].name).indexOf("data-") && (i = p(i.slice(5)), v(o, i, r[i]));
					Fe.set(o, "hasDataAttrs", !0)
				}
				return r
			}
			return "object" == typeof e ? this.each(function () {
				qe.set(this, e)
			}) : He(this, function (t) {
				var n;
				if (o && t === undefined) return (n = qe.get(o, e)) !== undefined ? n : (n = v(o, e)) !== undefined ? n : void 0;
				this.each(function () {
					qe.set(this, e, t)
				})
			}, null, t, arguments.length > 1, null, !0)
		},
		removeData: function (e) {
			return this.each(function () {
				qe.remove(this, e)
			})
		}
	}), Te.extend({
		queue: function (e, t, n) {
			var i;
			if (e) return t = (t || "fx") + "queue", i = Fe.get(e, t), n && (!i || Array.isArray(n) ? i = Fe.access(e, t, Te.makeArray(n)) : i.push(n)), i || []
		},
		dequeue: function (e, t) {
			t = t || "fx";
			var n = Te.queue(e, t),
				i = n.length,
				r = n.shift(),
				o = Te._queueHooks(e, t),
				s = function () {
					Te.dequeue(e, t)
				};
			"inprogress" === r && (r = n.shift(), i--), r && ("fx" === t && n.unshift("inprogress"), delete o.stop, r.call(e, s, o)), !i && o && o.empty.fire()
		},
		_queueHooks: function (e, t) {
			var n = t + "queueHooks";
			return Fe.get(e, n) || Fe.access(e, n, {
				empty: Te.Callbacks("once memory").add(function () {
					Fe.remove(e, [t + "queue", n])
				})
			})
		}
	}), Te.fn.extend({
		queue: function (e, t) {
			var n = 2;
			return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? Te.queue(this[0], e) : t === undefined ? this : this.each(function () {
				var n = Te.queue(this, e, t);
				Te._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && Te.dequeue(this, e)
			})
		},
		dequeue: function (e) {
			return this.each(function () {
				Te.dequeue(this, e)
			})
		},
		clearQueue: function (e) {
			return this.queue(e || "fx", [])
		},
		promise: function (e, t) {
			var n, i = 1,
				r = Te.Deferred(),
				o = this,
				s = this.length,
				a = function () {
					--i || r.resolveWith(o, [o])
				};
			for ("string" != typeof e && (t = e, e = undefined), e = e || "fx"; s--;)(n = Fe.get(o[s], e + "queueHooks")) && n.empty && (i++, n.empty.add(a));
			return a(), r.promise(t)
		}
	});
	var Be = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
		Ve = new RegExp("^(?:([+-])=|)(" + Be + ")([a-z%]*)$", "i"),
		Ge = ["Top", "Right", "Bottom", "Left"],
		Ke = function (e, t) {
			return "none" === (e = t || e).style.display || "" === e.style.display && Te.contains(e.ownerDocument, e) && "none" === Te.css(e, "display")
		},
		ze = function (e, t, n, i) {
			var r, o, s = {};
			for (o in t) s[o] = e.style[o], e.style[o] = t[o];
			for (o in r = n.apply(e, i || []), t) e.style[o] = s[o];
			return r
		},
		Ye = {};
	Te.fn.extend({
		show: function () {
			return b(this, !0)
		},
		hide: function () {
			return b(this)
		},
		toggle: function (e) {
			return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
				Ke(this) ? Te(this).show() : Te(this).hide()
			})
		}
	});
	var Qe = /^(?:checkbox|radio)$/i,
		Xe = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
		Je = /^$|^module$|\/(?:java|ecma)script/i,
		Ze = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			thead: [1, "<table>", "</table>"],
			col: [2, "<table><colgroup>", "</colgroup></table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			_default: [0, "", ""]
		};
	Ze.optgroup = Ze.option, Ze.tbody = Ze.tfoot = Ze.colgroup = Ze.caption = Ze.thead, Ze.th = Ze.td;
	var et, tt, nt = /<|&#?\w+;/;
	et = se.createDocumentFragment().appendChild(se.createElement("div")), (tt = se.createElement("input")).setAttribute("type", "radio"), tt.setAttribute("checked", "checked"), tt.setAttribute("name", "t"), et.appendChild(tt), ve.checkClone = et.cloneNode(!0).cloneNode(!0).lastChild.checked, et.innerHTML = "<textarea>x</textarea>", ve.noCloneChecked = !!et.cloneNode(!0).lastChild.defaultValue;
	var it = se.documentElement,
		rt = /^key/,
		ot = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		st = /^([^.]*)(?:\.(.+)|)/;
	Te.event = {
		global: {},
		add: function (e, t, n, i, r) {
			var o, s, a, l, u, c, f, d, h, p, g, m = Fe.get(e);
			if (m)
				for (n.handler && (n = (o = n).handler, r = o.selector), r && Te.find.matchesSelector(it, r), n.guid || (n.guid = Te.guid++), (l = m.events) || (l = m.events = {}), (s = m.handle) || (s = m.handle = function (t) {
					return void 0 !== Te && Te.event.triggered !== t.type ? Te.event.dispatch.apply(e, arguments) : undefined
				}), u = (t = (t || "").match(Pe) || [""]).length; u--;) h = g = (a = st.exec(t[u]) || [])[1], p = (a[2] || "").split(".").sort(), h && (f = Te.event.special[h] || {}, h = (r ? f.delegateType : f.bindType) || h, f = Te.event.special[h] || {}, c = Te.extend({
					type: h,
					origType: g,
					data: i,
					handler: n,
					guid: n.guid,
					selector: r,
					needsContext: r && Te.expr.match.needsContext.test(r),
					namespace: p.join(".")
				}, o), (d = l[h]) || ((d = l[h] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(e, i, p, s) || e.addEventListener && e.addEventListener(h, s)), f.add && (f.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), r ? d.splice(d.delegateCount++, 0, c) : d.push(c), Te.event.global[h] = !0)
		},
		remove: function (e, t, n, i, r) {
			var o, s, a, l, u, c, f, d, h, p, g, m = Fe.hasData(e) && Fe.get(e);
			if (m && (l = m.events)) {
				for (u = (t = (t || "").match(Pe) || [""]).length; u--;)
					if (h = g = (a = st.exec(t[u]) || [])[1], p = (a[2] || "").split(".").sort(), h) {
						for (f = Te.event.special[h] || {}, d = l[h = (i ? f.delegateType : f.bindType) || h] || [], a = a[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = o = d.length; o--;) c = d[o], !r && g !== c.origType || n && n.guid !== c.guid || a && !a.test(c.namespace) || i && i !== c.selector && ("**" !== i || !c.selector) || (d.splice(o, 1), c.selector && d.delegateCount--, f.remove && f.remove.call(e, c));
						s && !d.length && (f.teardown && !1 !== f.teardown.call(e, p, m.handle) || Te.removeEvent(e, h, m.handle), delete l[h])
					} else
						for (h in l) Te.event.remove(e, h + t[u], n, i, !0);
				Te.isEmptyObject(l) && Fe.remove(e, "handle events")
			}
		},
		dispatch: function (e) {
			var t, n, i, r, o, s, a = Te.event.fix(e),
				l = new Array(arguments.length),
				u = (Fe.get(this, "events") || {})[a.type] || [],
				c = Te.event.special[a.type] || {};
			for (l[0] = a, t = 1; t < arguments.length; t++) l[t] = arguments[t];
			if (a.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, a)) {
				for (s = Te.event.handlers.call(this, a, u), t = 0;
					(r = s[t++]) && !a.isPropagationStopped();)
					for (a.currentTarget = r.elem, n = 0;
						(o = r.handlers[n++]) && !a.isImmediatePropagationStopped();) a.rnamespace && !a.rnamespace.test(o.namespace) || (a.handleObj = o, a.data = o.data, (i = ((Te.event.special[o.origType] || {}).handle || o.handler).apply(r.elem, l)) !== undefined && !1 === (a.result = i) && (a.preventDefault(), a.stopPropagation()));
				return c.postDispatch && c.postDispatch.call(this, a), a.result
			}
		},
		handlers: function (e, t) {
			var n, i, r, o, s, a = [],
				l = t.delegateCount,
				u = e.target;
			if (l && u.nodeType && !("click" === e.type && e.button >= 1))
				for (; u !== this; u = u.parentNode || this)
					if (1 === u.nodeType && ("click" !== e.type || !0 !== u.disabled)) {
						for (o = [], s = {}, n = 0; n < l; n++) s[r = (i = t[n]).selector + " "] === undefined && (s[r] = i.needsContext ? Te(r, this).index(u) > -1 : Te.find(r, this, null, [u]).length), s[r] && o.push(i);
						o.length && a.push({
							elem: u,
							handlers: o
						})
					}
			return u = this, l < t.length && a.push({
				elem: u,
				handlers: t.slice(l)
			}), a
		},
		addProp: function (e, t) {
			Object.defineProperty(Te.Event.prototype, e, {
				enumerable: !0,
				configurable: !0,
				get: ye(t) ? function () {
					if (this.originalEvent) return t(this.originalEvent)
				} : function () {
					if (this.originalEvent) return this.originalEvent[e]
				},
				set: function (t) {
					Object.defineProperty(this, e, {
						enumerable: !0,
						configurable: !0,
						writable: !0,
						value: t
					})
				}
			})
		},
		fix: function (e) {
			return e[Te.expando] ? e : new Te.Event(e)
		},
		special: {
			load: {
				noBubble: !0
			},
			focus: {
				trigger: function () {
					if (this !== x() && this.focus) return this.focus(), !1
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function () {
					if (this === x() && this.blur) return this.blur(), !1
				},
				delegateType: "focusout"
			},
			click: {
				trigger: function () {
					if ("checkbox" === this.type && this.click && o(this, "input")) return this.click(), !1
				},
				_default: function (e) {
					return o(e.target, "a")
				}
			},
			beforeunload: {
				postDispatch: function (e) {
					e.result !== undefined && e.originalEvent && (e.originalEvent.returnValue = e.result)
				}
			}
		}
	}, Te.removeEvent = function (e, t, n) {
		e.removeEventListener && e.removeEventListener(t, n)
	}, Te.Event = function (e, t) {
		if (!(this instanceof Te.Event)) return new Te.Event(e, t);
		e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.defaultPrevented === undefined && !1 === e.returnValue ? C : S, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && Te.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[Te.expando] = !0
	}, Te.Event.prototype = {
		constructor: Te.Event,
		isDefaultPrevented: S,
		isPropagationStopped: S,
		isImmediatePropagationStopped: S,
		isSimulated: !1,
		preventDefault: function () {
			var e = this.originalEvent;
			this.isDefaultPrevented = C, e && !this.isSimulated && e.preventDefault()
		},
		stopPropagation: function () {
			var e = this.originalEvent;
			this.isPropagationStopped = C, e && !this.isSimulated && e.stopPropagation()
		},
		stopImmediatePropagation: function () {
			var e = this.originalEvent;
			this.isImmediatePropagationStopped = C, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
		}
	}, Te.each({
		altKey: !0,
		bubbles: !0,
		cancelable: !0,
		changedTouches: !0,
		ctrlKey: !0,
		detail: !0,
		eventPhase: !0,
		metaKey: !0,
		pageX: !0,
		pageY: !0,
		shiftKey: !0,
		view: !0,
		char: !0,
		charCode: !0,
		key: !0,
		keyCode: !0,
		button: !0,
		buttons: !0,
		clientX: !0,
		clientY: !0,
		offsetX: !0,
		offsetY: !0,
		pointerId: !0,
		pointerType: !0,
		screenX: !0,
		screenY: !0,
		targetTouches: !0,
		toElement: !0,
		touches: !0,
		which: function (e) {
			var t = e.button;
			return null == e.which && rt.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && t !== undefined && ot.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
		}
	}, Te.event.addProp), Te.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function (e, t) {
		Te.event.special[e] = {
			delegateType: t,
			bindType: t,
			handle: function (e) {
				var n, i = this,
					r = e.relatedTarget,
					o = e.handleObj;
				return r && (r === i || Te.contains(i, r)) || (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
			}
		}
	}), Te.fn.extend({
		on: function (e, t, n, i) {
			return A(this, e, t, n, i)
		},
		one: function (e, t, n, i) {
			return A(this, e, t, n, i, 1)
		},
		off: function (e, t, n) {
			var i, r;
			if (e && e.preventDefault && e.handleObj) return i = e.handleObj, Te(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
			if ("object" == typeof e) {
				for (r in e) this.off(r, t, e[r]);
				return this
			}
			return !1 !== t && "function" != typeof t || (n = t, t = undefined), !1 === n && (n = S), this.each(function () {
				Te.event.remove(this, e, n, t)
			})
		}
	});
	var at = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
		lt = /<script|<style|<link/i,
		ut = /checked\s*(?:[^=]|=\s*.checked.)/i,
		ct = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
	Te.extend({
		htmlPrefilter: function (e) {
			return e.replace(at, "<$1></$2>")
		},
		clone: function (e, t, n) {
			var i, r, o, s, a = e.cloneNode(!0),
				l = Te.contains(e.ownerDocument, e);
			if (!(ve.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || Te.isXMLDoc(e)))
				for (s = E(a), i = 0, r = (o = E(e)).length; i < r; i++) L(o[i], s[i]);
			if (t)
				if (n)
					for (o = o || E(e), s = s || E(a), i = 0, r = o.length; i < r; i++) I(o[i], s[i]);
				else I(e, a);
			return (s = E(a, "script")).length > 0 && T(s, !l && E(e, "script")), a
		},
		cleanData: function (e) {
			for (var t, n, i, r = Te.event.special, o = 0;
				(n = e[o]) !== undefined; o++)
				if (We(n)) {
					if (t = n[Fe.expando]) {
						if (t.events)
							for (i in t.events) r[i] ? Te.event.remove(n, i) : Te.removeEvent(n, i, t.handle);
						n[Fe.expando] = undefined
					}
					n[qe.expando] && (n[qe.expando] = undefined)
				}
		}
	}), Te.fn.extend({
		detach: function (e) {
			return R(this, e, !0)
		},
		remove: function (e) {
			return R(this, e)
		},
		text: function (e) {
			return He(this, function (e) {
				return e === undefined ? Te.text(this) : this.empty().each(function () {
					1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
				})
			}, null, e, arguments.length)
		},
		append: function () {
			return P(this, arguments, function (e) {
				1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || D(this, e).appendChild(e)
			})
		},
		prepend: function () {
			return P(this, arguments, function (e) {
				if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
					var t = D(this, e);
					t.insertBefore(e, t.firstChild)
				}
			})
		},
		before: function () {
			return P(this, arguments, function (e) {
				this.parentNode && this.parentNode.insertBefore(e, this)
			})
		},
		after: function () {
			return P(this, arguments, function (e) {
				this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
			})
		},
		empty: function () {
			for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (Te.cleanData(E(e, !1)), e.textContent = "");
			return this
		},
		clone: function (e, t) {
			return e = null != e && e, t = null == t ? e : t, this.map(function () {
				return Te.clone(this, e, t)
			})
		},
		html: function (e) {
			return He(this, function (e) {
				var t = this[0] || {},
					n = 0,
					i = this.length;
				if (e === undefined && 1 === t.nodeType) return t.innerHTML;
				if ("string" == typeof e && !lt.test(e) && !Ze[(Xe.exec(e) || ["", ""])[1].toLowerCase()]) {
					e = Te.htmlPrefilter(e);
					try {
						for (; n < i; n++) 1 === (t = this[n] || {}).nodeType && (Te.cleanData(E(t, !1)), t.innerHTML = e);
						t = 0
					} catch (r) {}
				}
				t && this.empty().append(e)
			}, null, e, arguments.length)
		},
		replaceWith: function () {
			var e = [];
			return P(this, arguments, function (t) {
				var n = this.parentNode;
				Te.inArray(this, e) < 0 && (Te.cleanData(E(this)), n && n.replaceChild(t, this))
			}, e)
		}
	}), Te.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function (e, t) {
		Te.fn[e] = function (e) {
			for (var n, i = [], r = Te(e), o = r.length - 1, s = 0; s <= o; s++) n = s === o ? this : this.clone(!0), Te(r[s])[t](n), ce.apply(i, n.get());
			return this.pushStack(i)
		}
	});
	var ft = new RegExp("^(" + Be + ")(?!px)[a-z%]+$", "i"),
		dt = function (t) {
			var n = t.ownerDocument.defaultView;
			return n && n.opener || (n = e), n.getComputedStyle(t)
		},
		ht = new RegExp(Ge.join("|"), "i");
	! function () {
		function t() {
			if (u) {
				l.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", u.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", it.appendChild(l).appendChild(u);
				var t = e.getComputedStyle(u);
				i = "1%" !== t.top, a = 12 === n(t.marginLeft), u.style.right = "60%", s = 36 === n(t.right), r = 36 === n(t.width), u.style.position = "absolute", o = 36 === u.offsetWidth || "absolute", it.removeChild(l), u = null
			}
		}

		function n(e) {
			return Math.round(parseFloat(e))
		}
		var i, r, o, s, a, l = se.createElement("div"),
			u = se.createElement("div");
		u.style && (u.style.backgroundClip = "content-box", u.cloneNode(!0).style.backgroundClip = "", ve.clearCloneStyle = "content-box" === u.style.backgroundClip, Te.extend(ve, {
			boxSizingReliable: function () {
				return t(), r
			},
			pixelBoxStyles: function () {
				return t(), s
			},
			pixelPosition: function () {
				return t(), i
			},
			reliableMarginLeft: function () {
				return t(), a
			},
			scrollboxSize: function () {
				return t(), o
			}
		}))
	}();
	var pt = /^(none|table(?!-c[ea]).+)/,
		gt = /^--/,
		mt = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		vt = {
			letterSpacing: "0",
			fontWeight: "400"
		},
		yt = ["Webkit", "Moz", "ms"],
		_t = se.createElement("div").style;
	Te.extend({
		cssHooks: {
			opacity: {
				get: function (e, t) {
					if (t) {
						var n = k(e, "opacity");
						return "" === n ? "1" : n
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
		cssProps: {},
		style: function (e, t, n, i) {
			if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
				var r, o, s, a = p(t),
					l = gt.test(t),
					u = e.style;
				if (l || (t = M(a)), s = Te.cssHooks[t] || Te.cssHooks[a], n === undefined) return s && "get" in s && (r = s.get(e, !1, i)) !== undefined ? r : u[t];
				"string" === (o = typeof n) && (r = Ve.exec(n)) && r[1] && (n = y(e, t, r), o = "number"), null != n && n == n && ("number" === o && (n += r && r[3] || (Te.cssNumber[a] ? "" : "px")), ve.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), s && "set" in s && (n = s.set(e, n, i)) === undefined || (l ? u.setProperty(t, n) : u[t] = n))
			}
		},
		css: function (e, t, n, i) {
			var r, o, s, a = p(t);
			return gt.test(t) || (t = M(a)), (s = Te.cssHooks[t] || Te.cssHooks[a]) && "get" in s && (r = s.get(e, !0, n)), r === undefined && (r = k(e, t, i)), "normal" === r && t in vt && (r = vt[t]), "" === n || n ? (o = parseFloat(r), !0 === n || isFinite(o) ? o || 0 : r) : r
		}
	}), Te.each(["height", "width"], function (e, t) {
		Te.cssHooks[t] = {
			get: function (e, n, i) {
				if (n) return !pt.test(Te.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? q(e, t, i) : ze(e, mt, function () {
					return q(e, t, i)
				})
			},
			set: function (e, n, i) {
				var r, o = dt(e),
					s = "border-box" === Te.css(e, "boxSizing", !1, o),
					a = i && F(e, t, i, s, o);
				return s && ve.scrollboxSize() === o.position && (a -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(o[t]) - F(e, t, "border", !1, o) - .5)), a && (r = Ve.exec(n)) && "px" !== (r[3] || "px") && (e.style[t] = n, n = Te.css(e, t)), W(e, n, a)
			}
		}
	}), Te.cssHooks.marginLeft = H(ve.reliableMarginLeft, function (e, t) {
		if (t) return (parseFloat(k(e, "marginLeft")) || e.getBoundingClientRect().left - ze(e, {
			marginLeft: 0
		}, function () {
			return e.getBoundingClientRect().left
		})) + "px"
	}), Te.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function (e, t) {
		Te.cssHooks[e + t] = {
			expand: function (n) {
				for (var i = 0, r = {}, o = "string" == typeof n ? n.split(" ") : [n]; i < 4; i++) r[e + Ge[i] + t] = o[i] || o[i - 2] || o[0];
				return r
			}
		}, "margin" !== e && (Te.cssHooks[e + t].set = W)
	}), Te.fn.extend({
		css: function (e, t) {
			return He(this, function (e, t, n) {
				var i, r, o = {},
					s = 0;
				if (Array.isArray(t)) {
					for (i = dt(e), r = t.length; s < r; s++) o[t[s]] = Te.css(e, t[s], !1, i);
					return o
				}
				return n !== undefined ? Te.style(e, t, n) : Te.css(e, t)
			}, e, t, arguments.length > 1)
		}
	}), Te.Tween = U, U.prototype = {
		constructor: U,
		init: function (e, t, n, i, r, o) {
			this.elem = e, this.prop = n, this.easing = r || Te.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = o || (Te.cssNumber[n] ? "" : "px")
		},
		cur: function () {
			var e = U.propHooks[this.prop];
			return e && e.get ? e.get(this) : U.propHooks._default.get(this)
		},
		run: function (e) {
			var t, n = U.propHooks[this.prop];
			return this.options.duration ? this.pos = t = Te.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : U.propHooks._default.set(this), this
		}
	}, U.prototype.init.prototype = U.prototype, U.propHooks = {
		_default: {
			get: function (e) {
				var t;
				return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = Te.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
			},
			set: function (e) {
				Te.fx.step[e.prop] ? Te.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[Te.cssProps[e.prop]] && !Te.cssHooks[e.prop] ? e.elem[e.prop] = e.now : Te.style(e.elem, e.prop, e.now + e.unit)
			}
		}
	}, U.propHooks.scrollTop = U.propHooks.scrollLeft = {
		set: function (e) {
			e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
		}
	}, Te.easing = {
		linear: function (e) {
			return e
		},
		swing: function (e) {
			return .5 - Math.cos(e * Math.PI) / 2
		},
		_default: "swing"
	}, Te.fx = U.prototype.init, Te.fx.step = {};
	var bt, Et, Tt = /^(?:toggle|show|hide)$/,
		wt = /queueHooks$/;
	Te.Animation = Te.extend(Y, {
		tweeners: {
			"*": [
				function (e, t) {
					var n = this.createTween(e, t);
					return y(n.elem, e, Ve.exec(t), n), n
				}
			]
		},
		tweener: function (e, t) {
			ye(e) ? (t = e, e = ["*"]) : e = e.match(Pe);
			for (var n, i = 0, r = e.length; i < r; i++) n = e[i], Y.tweeners[n] = Y.tweeners[n] || [], Y.tweeners[n].unshift(t)
		},
		prefilters: [K],
		prefilter: function (e, t) {
			t ? Y.prefilters.unshift(e) : Y.prefilters.push(e)
		}
	}), Te.speed = function (e, t, n) {
		var i = e && "object" == typeof e ? Te.extend({}, e) : {
			complete: n || !n && t || ye(e) && e,
			duration: e,
			easing: n && t || t && !ye(t) && t
		};
		return Te.fx.off ? i.duration = 0 : "number" != typeof i.duration && (i.duration in Te.fx.speeds ? i.duration = Te.fx.speeds[i.duration] : i.duration = Te.fx.speeds._default), null != i.queue && !0 !== i.queue || (i.queue = "fx"), i.old = i.complete, i.complete = function () {
			ye(i.old) && i.old.call(this), i.queue && Te.dequeue(this, i.queue)
		}, i
	}, Te.fn.extend({
		fadeTo: function (e, t, n, i) {
			return this.filter(Ke).css("opacity", 0).show().end().animate({
				opacity: t
			}, e, n, i)
		},
		animate: function (e, t, n, i) {
			var r = Te.isEmptyObject(e),
				o = Te.speed(t, n, i),
				s = function () {
					var t = Y(this, Te.extend({}, e), o);
					(r || Fe.get(this, "finish")) && t.stop(!0)
				};
			return s.finish = s, r || !1 === o.queue ? this.each(s) : this.queue(o.queue, s)
		},
		stop: function (e, t, n) {
			var i = function (e) {
				var t = e.stop;
				delete e.stop, t(n)
			};
			return "string" != typeof e && (n = t, t = e, e = undefined), t && !1 !== e && this.queue(e || "fx", []), this.each(function () {
				var t = !0,
					r = null != e && e + "queueHooks",
					o = Te.timers,
					s = Fe.get(this);
				if (r) s[r] && s[r].stop && i(s[r]);
				else
					for (r in s) s[r] && s[r].stop && wt.test(r) && i(s[r]);
				for (r = o.length; r--;) o[r].elem !== this || null != e && o[r].queue !== e || (o[r].anim.stop(n), t = !1, o.splice(r, 1));
				!t && n || Te.dequeue(this, e)
			})
		},
		finish: function (e) {
			return !1 !== e && (e = e || "fx"), this.each(function () {
				var t, n = Fe.get(this),
					i = n[e + "queue"],
					r = n[e + "queueHooks"],
					o = Te.timers,
					s = i ? i.length : 0;
				for (n.finish = !0, Te.queue(this, e, []), r && r.stop && r.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
				for (t = 0; t < s; t++) i[t] && i[t].finish && i[t].finish.call(this);
				delete n.finish
			})
		}
	}), Te.each(["toggle", "show", "hide"], function (e, t) {
		var n = Te.fn[t];
		Te.fn[t] = function (e, i, r) {
			return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(V(t, !0), e, i, r)
		}
	}), Te.each({
		slideDown: V("show"),
		slideUp: V("hide"),
		slideToggle: V("toggle"),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	}, function (e, t) {
		Te.fn[e] = function (e, n, i) {
			return this.animate(t, e, n, i)
		}
	}), Te.timers = [], Te.fx.tick = function () {
		var e, t = 0,
			n = Te.timers;
		for (bt = Date.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1);
		n.length || Te.fx.stop(), bt = undefined
	}, Te.fx.timer = function (e) {
		Te.timers.push(e), Te.fx.start()
	}, Te.fx.interval = 13, Te.fx.start = function () {
		Et || (Et = !0, $())
	}, Te.fx.stop = function () {
		Et = null
	}, Te.fx.speeds = {
		slow: 600,
		fast: 200,
		_default: 400
	}, Te.fn.delay = function (t, n) {
		return t = Te.fx && Te.fx.speeds[t] || t, n = n || "fx", this.queue(n, function (n, i) {
			var r = e.setTimeout(n, t);
			i.stop = function () {
				e.clearTimeout(r)
			}
		})
	},
	function () {
		var e = se.createElement("input"),
			t = se.createElement("select").appendChild(se.createElement("option"));
		e.type = "checkbox", ve.checkOn = "" !== e.value, ve.optSelected = t.selected, (e = se.createElement("input")).value = "t", e.type = "radio", ve.radioValue = "t" === e.value
	}();
	var Ct, St = Te.expr.attrHandle;
	Te.fn.extend({
		attr: function (e, t) {
			return He(this, Te.attr, e, t, arguments.length > 1)
		},
		removeAttr: function (e) {
			return this.each(function () {
				Te.removeAttr(this, e)
			})
		}
	}), Te.extend({
		attr: function (e, t, n) {
			var i, r, o = e.nodeType;
			if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof e.getAttribute ? Te.prop(e, t, n) : (1 === o && Te.isXMLDoc(e) || (r = Te.attrHooks[t.toLowerCase()] || (Te.expr.match.bool.test(t) ? Ct : undefined)), n !== undefined ? null === n ? void Te.removeAttr(e, t) : r && "set" in r && (i = r.set(e, n, t)) !== undefined ? i : (e.setAttribute(t, n + ""), n) : r && "get" in r && null !== (i = r.get(e, t)) ? i : null == (i = Te.find.attr(e, t)) ? undefined : i)
		},
		attrHooks: {
			type: {
				set: function (e, t) {
					if (!ve.radioValue && "radio" === t && o(e, "input")) {
						var n = e.value;
						return e.setAttribute("type", t), n && (e.value = n), t
					}
				}
			}
		},
		removeAttr: function (e, t) {
			var n, i = 0,
				r = t && t.match(Pe);
			if (r && 1 === e.nodeType)
				for (; n = r[i++];) e.removeAttribute(n)
		}
	}), Ct = {
		set: function (e, t, n) {
			return !1 === t ? Te.removeAttr(e, n) : e.setAttribute(n, n), n
		}
	}, Te.each(Te.expr.match.bool.source.match(/\w+/g), function (e, t) {
		var n = St[t] || Te.find.attr;
		St[t] = function (e, t, i) {
			var r, o, s = t.toLowerCase();
			return i || (o = St[s], St[s] = r, r = null != n(e, t, i) ? s : null, St[s] = o), r
		}
	});
	var xt = /^(?:input|select|textarea|button)$/i,
		At = /^(?:a|area)$/i;
	Te.fn.extend({
		prop: function (e, t) {
			return He(this, Te.prop, e, t, arguments.length > 1)
		},
		removeProp: function (e) {
			return this.each(function () {
				delete this[Te.propFix[e] || e]
			})
		}
	}), Te.extend({
		prop: function (e, t, n) {
			var i, r, o = e.nodeType;
			if (3 !== o && 8 !== o && 2 !== o) return 1 === o && Te.isXMLDoc(e) || (t = Te.propFix[t] || t, r = Te.propHooks[t]), n !== undefined ? r && "set" in r && (i = r.set(e, n, t)) !== undefined ? i : e[t] = n : r && "get" in r && null !== (i = r.get(e, t)) ? i : e[t]
		},
		propHooks: {
			tabIndex: {
				get: function (e) {
					var t = Te.find.attr(e, "tabindex");
					return t ? parseInt(t, 10) : xt.test(e.nodeName) || At.test(e.nodeName) && e.href ? 0 : -1
				}
			}
		},
		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	}), ve.optSelected || (Te.propHooks.selected = {
		get: function (e) {
			var t = e.parentNode;
			return t && t.parentNode && t.parentNode.selectedIndex, null
		},
		set: function (e) {
			var t = e.parentNode;
			t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
		}
	}), Te.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
		Te.propFix[this.toLowerCase()] = this
	}), Te.fn.extend({
		addClass: function (e) {
			var t, n, i, r, o, s, a, l = 0;
			if (ye(e)) return this.each(function (t) {
				Te(this).addClass(e.call(this, t, X(this)))
			});
			if ((t = J(e)).length)
				for (; n = this[l++];)
					if (r = X(n), i = 1 === n.nodeType && " " + Q(r) + " ") {
						for (s = 0; o = t[s++];) i.indexOf(" " + o + " ") < 0 && (i += o + " ");
						r !== (a = Q(i)) && n.setAttribute("class", a)
					}
			return this
		},
		removeClass: function (e) {
			var t, n, i, r, o, s, a, l = 0;
			if (ye(e)) return this.each(function (t) {
				Te(this).removeClass(e.call(this, t, X(this)))
			});
			if (!arguments.length) return this.attr("class", "");
			if ((t = J(e)).length)
				for (; n = this[l++];)
					if (r = X(n), i = 1 === n.nodeType && " " + Q(r) + " ") {
						for (s = 0; o = t[s++];)
							for (; i.indexOf(" " + o + " ") > -1;) i = i.replace(" " + o + " ", " ");
						r !== (a = Q(i)) && n.setAttribute("class", a)
					}
			return this
		},
		toggleClass: function (e, t) {
			var n = typeof e,
				i = "string" === n || Array.isArray(e);
			return "boolean" == typeof t && i ? t ? this.addClass(e) : this.removeClass(e) : ye(e) ? this.each(function (n) {
				Te(this).toggleClass(e.call(this, n, X(this), t), t)
			}) : this.each(function () {
				var t, r, o, s;
				if (i)
					for (r = 0, o = Te(this), s = J(e); t = s[r++];) o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
				else e !== undefined && "boolean" !== n || ((t = X(this)) && Fe.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : Fe.get(this, "__className__") || ""))
			})
		},
		hasClass: function (e) {
			var t, n, i = 0;
			for (t = " " + e + " "; n = this[i++];)
				if (1 === n.nodeType && (" " + Q(X(n)) + " ").indexOf(t) > -1) return !0;
			return !1
		}
	});
	var Dt = /\r/g;
	Te.fn.extend({
		val: function (e) {
			var t, n, i, r = this[0];
			return arguments.length ? (i = ye(e), this.each(function (n) {
				var r;
				1 === this.nodeType && (null == (r = i ? e.call(this, n, Te(this).val()) : e) ? r = "" : "number" == typeof r ? r += "" : Array.isArray(r) && (r = Te.map(r, function (e) {
					return null == e ? "" : e + ""
				})), (t = Te.valHooks[this.type] || Te.valHooks[this.nodeName.toLowerCase()]) && "set" in t && t.set(this, r, "value") !== undefined || (this.value = r))
			})) : r ? (t = Te.valHooks[r.type] || Te.valHooks[r.nodeName.toLowerCase()]) && "get" in t && (n = t.get(r, "value")) !== undefined ? n : "string" == typeof (n = r.value) ? n.replace(Dt, "") : null == n ? "" : n : void 0
		}
	}), Te.extend({
		valHooks: {
			option: {
				get: function (e) {
					var t = Te.find.attr(e, "value");
					return null != t ? t : Q(Te.text(e))
				}
			},
			select: {
				get: function (e) {
					var t, n, i, r = e.options,
						s = e.selectedIndex,
						a = "select-one" === e.type,
						l = a ? null : [],
						u = a ? s + 1 : r.length;
					for (i = s < 0 ? u : a ? s : 0; i < u; i++)
						if (((n = r[i]).selected || i === s) && !n.disabled && (!n.parentNode.disabled || !o(n.parentNode, "optgroup"))) {
							if (t = Te(n).val(), a) return t;
							l.push(t)
						}
					return l
				},
				set: function (e, t) {
					for (var n, i, r = e.options, o = Te.makeArray(t), s = r.length; s--;)((i = r[s]).selected = Te.inArray(Te.valHooks.option.get(i), o) > -1) && (n = !0);
					return n || (e.selectedIndex = -1), o
				}
			}
		}
	}), Te.each(["radio", "checkbox"], function () {
		Te.valHooks[this] = {
			set: function (e, t) {
				if (Array.isArray(t)) return e.checked = Te.inArray(Te(e).val(), t) > -1
			}
		}, ve.checkOn || (Te.valHooks[this].get = function (e) {
			return null === e.getAttribute("value") ? "on" : e.value
		})
	}), ve.focusin = "onfocusin" in e;
	var Ot = /^(?:focusinfocus|focusoutblur)$/,
		Nt = function (e) {
			e.stopPropagation()
		};
	Te.extend(Te.event, {
		trigger: function (t, n, i, r) {
			var o, s, a, l, u, c, f, d, h = [i || se],
				p = pe.call(t, "type") ? t.type : t,
				g = pe.call(t, "namespace") ? t.namespace.split(".") : [];
			if (s = d = a = i = i || se, 3 !== i.nodeType && 8 !== i.nodeType && !Ot.test(p + Te.event.triggered) && (p.indexOf(".") > -1 && (p = (g = p.split(".")).shift(), g.sort()), u = p.indexOf(":") < 0 && "on" + p, (t = t[Te.expando] ? t : new Te.Event(p, "object" == typeof t && t)).isTrigger = r ? 2 : 3, t.namespace = g.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = undefined, t.target || (t.target = i), n = null == n ? [t] : Te.makeArray(n, [t]), f = Te.event.special[p] || {}, r || !f.trigger || !1 !== f.trigger.apply(i, n))) {
				if (!r && !f.noBubble && !_e(i)) {
					for (l = f.delegateType || p, Ot.test(l + p) || (s = s.parentNode); s; s = s.parentNode) h.push(s), a = s;
					a === (i.ownerDocument || se) && h.push(a.defaultView || a.parentWindow || e)
				}
				for (o = 0;
					(s = h[o++]) && !t.isPropagationStopped();) d = s, t.type = o > 1 ? l : f.bindType || p, (c = (Fe.get(s, "events") || {})[t.type] && Fe.get(s, "handle")) && c.apply(s, n), (c = u && s[u]) && c.apply && We(s) && (t.result = c.apply(s, n), !1 === t.result && t.preventDefault());
				return t.type = p, r || t.isDefaultPrevented() || f._default && !1 !== f._default.apply(h.pop(), n) || !We(i) || u && ye(i[p]) && !_e(i) && ((a = i[u]) && (i[u] = null), Te.event.triggered = p, t.isPropagationStopped() && d.addEventListener(p, Nt), i[p](), t.isPropagationStopped() && d.removeEventListener(p, Nt), Te.event.triggered = undefined, a && (i[u] = a)), t.result
			}
		},
		simulate: function (e, t, n) {
			var i = Te.extend(new Te.Event, n, {
				type: e,
				isSimulated: !0
			});
			Te.event.trigger(i, null, t)
		}
	}), Te.fn.extend({
		trigger: function (e, t) {
			return this.each(function () {
				Te.event.trigger(e, t, this)
			})
		},
		triggerHandler: function (e, t) {
			var n = this[0];
			if (n) return Te.event.trigger(e, t, n, !0)
		}
	}), ve.focusin || Te.each({
		focus: "focusin",
		blur: "focusout"
	}, function (e, t) {
		var n = function (e) {
			Te.event.simulate(t, e.target, Te.event.fix(e))
		};
		Te.event.special[t] = {
			setup: function () {
				var i = this.ownerDocument || this,
					r = Fe.access(i, t);
				r || i.addEventListener(e, n, !0), Fe.access(i, t, (r || 0) + 1)
			},
			teardown: function () {
				var i = this.ownerDocument || this,
					r = Fe.access(i, t) - 1;
				r ? Fe.access(i, t, r) : (i.removeEventListener(e, n, !0), Fe.remove(i, t))
			}
		}
	});
	var It = e.location,
		Lt = Date.now(),
		Pt = /\?/;
	Te.parseXML = function (t) {
		var n;
		if (!t || "string" != typeof t) return null;
		try {
			n = (new e.DOMParser).parseFromString(t, "text/xml")
		} catch (i) {
			n = undefined
		}
		return n && !n.getElementsByTagName("parsererror").length || Te.error("Invalid XML: " + t), n
	};
	var Rt = /\[\]$/,
		kt = /\r?\n/g,
		Ht = /^(?:submit|button|image|reset|file)$/i,
		jt = /^(?:input|select|textarea|keygen)/i;
	Te.param = function (e, t) {
		var n, i = [],
			r = function (e, t) {
				var n = ye(t) ? t() : t;
				i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
			};
		if (Array.isArray(e) || e.jquery && !Te.isPlainObject(e)) Te.each(e, function () {
			r(this.name, this.value)
		});
		else
			for (n in e) Z(n, e[n], t, r);
		return i.join("&")
	}, Te.fn.extend({
		serialize: function () {
			return Te.param(this.serializeArray())
		},
		serializeArray: function () {
			return this.map(function () {
				var e = Te.prop(this, "elements");
				return e ? Te.makeArray(e) : this
			}).filter(function () {
				var e = this.type;
				return this.name && !Te(this).is(":disabled") && jt.test(this.nodeName) && !Ht.test(e) && (this.checked || !Qe.test(e))
			}).map(function (e, t) {
				var n = Te(this).val();
				return null == n ? null : Array.isArray(n) ? Te.map(n, function (e) {
					return {
						name: t.name,
						value: e.replace(kt, "\r\n")
					}
				}) : {
					name: t.name,
					value: n.replace(kt, "\r\n")
				}
			}).get()
		}
	});
	var Mt = /%20/g,
		Wt = /#.*$/,
		Ft = /([?&])_=[^&]*/,
		qt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
		Ut = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		$t = /^(?:GET|HEAD)$/,
		Bt = /^\/\//,
		Vt = {},
		Gt = {},
		Kt = "*/".concat("*"),
		zt = se.createElement("a");
	zt.href = It.href, Te.extend({
		active: 0,
		lastModified: {},
		etag: {},
		ajaxSettings: {
			url: It.href,
			type: "GET",
			isLocal: Ut.test(It.protocol),
			global: !0,
			processData: !0,
			async: !0,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			accepts: {
				"*": Kt,
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
				"text json": JSON.parse,
				"text xml": Te.parseXML
			},
			flatOptions: {
				url: !0,
				context: !0
			}
		},
		ajaxSetup: function (e, t) {
			return t ? ne(ne(e, Te.ajaxSettings), t) : ne(Te.ajaxSettings, e)
		},
		ajaxPrefilter: ee(Vt),
		ajaxTransport: ee(Gt),
		ajax: function (t, n) {
			function i(t, n, i, a) {
				var u, d, h, b, E, T = n;
				c || (c = !0, l && e.clearTimeout(l), r = undefined, s = a || "", w.readyState = t > 0 ? 4 : 0, u = t >= 200 && t < 300 || 304 === t, i && (b = ie(p, w, i)), b = re(p, b, w, u), u ? (p.ifModified && ((E = w.getResponseHeader("Last-Modified")) && (Te.lastModified[o] = E), (E = w.getResponseHeader("etag")) && (Te.etag[o] = E)), 204 === t || "HEAD" === p.type ? T = "nocontent" : 304 === t ? T = "notmodified" : (T = b.state, d = b.data, u = !(h = b.error))) : (h = T, !t && T || (T = "error", t < 0 && (t = 0))), w.status = t, w.statusText = (n || T) + "", u ? v.resolveWith(g, [d, T, w]) : v.rejectWith(g, [w, T, h]), w.statusCode(_), _ = undefined, f && m.trigger(u ? "ajaxSuccess" : "ajaxError", [w, p, u ? d : h]), y.fireWith(g, [w, T]), f && (m.trigger("ajaxComplete", [w, p]), --Te.active || Te.event.trigger("ajaxStop")))
			}
			"object" == typeof t && (n = t, t = undefined), n = n || {};
			var r, o, s, a, l, u, c, f, d, h, p = Te.ajaxSetup({}, n),
				g = p.context || p,
				m = p.context && (g.nodeType || g.jquery) ? Te(g) : Te.event,
				v = Te.Deferred(),
				y = Te.Callbacks("once memory"),
				_ = p.statusCode || {},
				b = {},
				E = {},
				T = "canceled",
				w = {
					readyState: 0,
					getResponseHeader: function (e) {
						var t;
						if (c) {
							if (!a)
								for (a = {}; t = qt.exec(s);) a[t[1].toLowerCase()] = t[2];
							t = a[e.toLowerCase()]
						}
						return null == t ? null : t
					},
					getAllResponseHeaders: function () {
						return c ? s : null
					},
					setRequestHeader: function (e, t) {
						return null == c && (e = E[e.toLowerCase()] = E[e.toLowerCase()] || e, b[e] = t), this
					},
					overrideMimeType: function (e) {
						return null == c && (p.mimeType = e), this
					},
					statusCode: function (e) {
						var t;
						if (e)
							if (c) w.always(e[w.status]);
							else
								for (t in e) _[t] = [_[t], e[t]];
						return this
					},
					abort: function (e) {
						var t = e || T;
						return r && r.abort(t), i(0, t), this
					}
				};
			if (v.promise(w), p.url = ((t || p.url || It.href) + "").replace(Bt, It.protocol + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = (p.dataType || "*").toLowerCase().match(Pe) || [""], null == p.crossDomain) {
				u = se.createElement("a");
				try {
					u.href = p.url, u.href = u.href, p.crossDomain = zt.protocol + "//" + zt.host != u.protocol + "//" + u.host
				} catch (C) {
					p.crossDomain = !0
				}
			}
			if (p.data && p.processData && "string" != typeof p.data && (p.data = Te.param(p.data, p.traditional)), te(Vt, p, n, w), c) return w;
			for (d in (f = Te.event && p.global) && 0 == Te.active++ && Te.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !$t.test(p.type), o = p.url.replace(Wt, ""), p.hasContent ? p.data && p.processData && 0 === (p.contentType || "").indexOf("application/x-www-form-urlencoded") && (p.data = p.data.replace(Mt, "+")) : (h = p.url.slice(o.length), p.data && (p.processData || "string" == typeof p.data) && (o += (Pt.test(o) ? "&" : "?") + p.data, delete p.data), !1 === p.cache && (o = o.replace(Ft, "$1"), h = (Pt.test(o) ? "&" : "?") + "_=" + Lt+++h), p.url = o + h), p.ifModified && (Te.lastModified[o] && w.setRequestHeader("If-Modified-Since", Te.lastModified[o]), Te.etag[o] && w.setRequestHeader("If-None-Match", Te.etag[o])), (p.data && p.hasContent && !1 !== p.contentType || n.contentType) && w.setRequestHeader("Content-Type", p.contentType), w.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Kt + "; q=0.01" : "") : p.accepts["*"]), p.headers) w.setRequestHeader(d, p.headers[d]);
			if (p.beforeSend && (!1 === p.beforeSend.call(g, w, p) || c)) return w.abort();
			if (T = "abort", y.add(p.complete), w.done(p.success), w.fail(p.error), r = te(Gt, p, n, w)) {
				if (w.readyState = 1, f && m.trigger("ajaxSend", [w, p]), c) return w;
				p.async && p.timeout > 0 && (l = e.setTimeout(function () {
					w.abort("timeout")
				}, p.timeout));
				try {
					c = !1, r.send(b, i)
				} catch (C) {
					if (c) throw C;
					i(-1, C)
				}
			} else i(-1, "No Transport");
			return w
		},
		getJSON: function (e, t, n) {
			return Te.get(e, t, n, "json")
		},
		getScript: function (e, t) {
			return Te.get(e, undefined, t, "script")
		}
	}), Te.each(["get", "post"], function (e, t) {
		Te[t] = function (e, n, i, r) {
			return ye(n) && (r = r || i, i = n, n = undefined), Te.ajax(Te.extend({
				url: e,
				type: t,
				dataType: r,
				data: n,
				success: i
			}, Te.isPlainObject(e) && e))
		}
	}), Te._evalUrl = function (e) {
		return Te.ajax({
			url: e,
			type: "GET",
			dataType: "script",
			cache: !0,
			async: !1,
			global: !1,
			throws: !0
		})
	}, Te.fn.extend({
		wrapAll: function (e) {
			var t;
			return this[0] && (ye(e) && (e = e.call(this[0])), t = Te(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
				for (var e = this; e.firstElementChild;) e = e.firstElementChild;
				return e
			}).append(this)), this
		},
		wrapInner: function (e) {
			return ye(e) ? this.each(function (t) {
				Te(this).wrapInner(e.call(this, t))
			}) : this.each(function () {
				var t = Te(this),
					n = t.contents();
				n.length ? n.wrapAll(e) : t.append(e)
			})
		},
		wrap: function (e) {
			var t = ye(e);
			return this.each(function (n) {
				Te(this).wrapAll(t ? e.call(this, n) : e)
			})
		},
		unwrap: function (e) {
			return this.parent(e).not("body").each(function () {
				Te(this).replaceWith(this.childNodes)
			}), this
		}
	}), Te.expr.pseudos.hidden = function (e) {
		return !Te.expr.pseudos.visible(e)
	}, Te.expr.pseudos.visible = function (e) {
		return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
	}, Te.ajaxSettings.xhr = function () {
		try {
			return new e.XMLHttpRequest
		} catch (t) {}
	};
	var Yt = {
			0: 200,
			1223: 204
		},
		Qt = Te.ajaxSettings.xhr();
	ve.cors = !!Qt && "withCredentials" in Qt, ve.ajax = Qt = !!Qt, Te.ajaxTransport(function (t) {
		var n, i;
		if (ve.cors || Qt && !t.crossDomain) return {
			send: function (r, o) {
				var s, a = t.xhr();
				if (a.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
					for (s in t.xhrFields) a[s] = t.xhrFields[s];
				for (s in t.mimeType && a.overrideMimeType && a.overrideMimeType(t.mimeType), t.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest"), r) a.setRequestHeader(s, r[s]);
				n = function (e) {
					return function () {
						n && (n = i = a.onload = a.onerror = a.onabort = a.ontimeout = a.onreadystatechange = null, "abort" === e ? a.abort() : "error" === e ? "number" != typeof a.status ? o(0, "error") : o(a.status, a.statusText) : o(Yt[a.status] || a.status, a.statusText, "text" !== (a.responseType || "text") || "string" != typeof a.responseText ? {
							binary: a.response
						} : {
							text: a.responseText
						}, a.getAllResponseHeaders()))
					}
				}, a.onload = n(), i = a.onerror = a.ontimeout = n("error"), a.onabort !== undefined ? a.onabort = i : a.onreadystatechange = function () {
					4 === a.readyState && e.setTimeout(function () {
						n && i()
					})
				}, n = n("abort");
				try {
					a.send(t.hasContent && t.data || null)
				} catch (l) {
					if (n) throw l
				}
			},
			abort: function () {
				n && n()
			}
		}
	}), Te.ajaxPrefilter(function (e) {
		e.crossDomain && (e.contents.script = !1)
	}), Te.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function (e) {
				return Te.globalEval(e), e
			}
		}
	}), Te.ajaxPrefilter("script", function (e) {
		e.cache === undefined && (e.cache = !1), e.crossDomain && (e.type = "GET")
	}), Te.ajaxTransport("script", function (e) {
		var t, n;
		if (e.crossDomain) return {
			send: function (i, r) {
				t = Te("<script>").prop({
					charset: e.scriptCharset,
					src: e.url
				}).on("load error", n = function (e) {
					t.remove(), n = null, e && r("error" === e.type ? 404 : 200, e.type)
				}), se.head.appendChild(t[0])
			},
			abort: function () {
				n && n()
			}
		}
	});
	var Xt, Jt = [],
		Zt = /(=)\?(?=&|$)|\?\?/;
	Te.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function () {
			var e = Jt.pop() || Te.expando + "_" + Lt++;
			return this[e] = !0, e
		}
	}), Te.ajaxPrefilter("json jsonp", function (t, n, i) {
		var r, o, s, a = !1 !== t.jsonp && (Zt.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Zt.test(t.data) && "data");
		if (a || "jsonp" === t.dataTypes[0]) return r = t.jsonpCallback = ye(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, a ? t[a] = t[a].replace(Zt, "$1" + r) : !1 !== t.jsonp && (t.url += (Pt.test(t.url) ? "&" : "?") + t.jsonp + "=" + r), t.converters["script json"] = function () {
			return s || Te.error(r + " was not called"), s[0]
		}, t.dataTypes[0] = "json", o = e[r], e[r] = function () {
			s = arguments
		}, i.always(function () {
			o === undefined ? Te(e).removeProp(r) : e[r] = o, t[r] && (t.jsonpCallback = n.jsonpCallback, Jt.push(r)), s && ye(o) && o(s[0]), s = o = undefined
		}), "script"
	}), ve.createHTMLDocument = ((Xt = se.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === Xt.childNodes.length), Te.parseHTML = function (e, t, n) {
		return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (ve.createHTMLDocument ? ((i = (t = se.implementation.createHTMLDocument("")).createElement("base")).href = se.location.href, t.head.appendChild(i)) : t = se), o = !n && [], (r = De.exec(e)) ? [t.createElement(r[1])] : (r = w([e], t, o), o && o.length && Te(o).remove(), Te.merge([], r.childNodes)));
		var i, r, o
	}, Te.fn.load = function (e, t, n) {
		var i, r, o, s = this,
			a = e.indexOf(" ");
		return a > -1 && (i = Q(e.slice(a)), e = e.slice(0, a)), ye(t) ? (n = t, t = undefined) : t && "object" == typeof t && (r = "POST"), s.length > 0 && Te.ajax({
			url: e,
			type: r || "GET",
			dataType: "html",
			data: t
		}).done(function (e) {
			o = arguments, s.html(i ? Te("<div>").append(Te.parseHTML(e)).find(i) : e)
		}).always(n && function (e, t) {
			s.each(function () {
				n.apply(this, o || [e.responseText, t, e])
			})
		}), this
	}, Te.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
		Te.fn[t] = function (e) {
			return this.on(t, e)
		}
	}), Te.expr.pseudos.animated = function (e) {
		return Te.grep(Te.timers, function (t) {
			return e === t.elem
		}).length
	}, Te.offset = {
		setOffset: function (e, t, n) {
			var i, r, o, s, a, l, u = Te.css(e, "position"),
				c = Te(e),
				f = {};
			"static" === u && (e.style.position = "relative"), a = c.offset(), o = Te.css(e, "top"), l = Te.css(e, "left"), ("absolute" === u || "fixed" === u) && (o + l).indexOf("auto") > -1 ? (s = (i = c.position()).top, r = i.left) : (s = parseFloat(o) || 0, r = parseFloat(l) || 0), ye(t) && (t = t.call(e, n, Te.extend({}, a))), null != t.top && (f.top = t.top - a.top + s), null != t.left && (f.left = t.left - a.left + r), "using" in t ? t.using.call(e, f) : c.css(f)
		}
	}, Te.fn.extend({
		offset: function (e) {
			if (arguments.length) return e === undefined ? this : this.each(function (t) {
				Te.offset.setOffset(this, e, t)
			});
			var t, n, i = this[0];
			return i ? i.getClientRects().length ? (t = i.getBoundingClientRect(), n = i.ownerDocument.defaultView, {
				top: t.top + n.pageYOffset,
				left: t.left + n.pageXOffset
			}) : {
				top: 0,
				left: 0
			} : void 0
		},
		position: function () {
			if (this[0]) {
				var e, t, n, i = this[0],
					r = {
						top: 0,
						left: 0
					};
				if ("fixed" === Te.css(i, "position")) t = i.getBoundingClientRect();
				else {
					for (t = this.offset(), n = i.ownerDocument, e = i.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === Te.css(e, "position");) e = e.parentNode;
					e && e !== i && 1 === e.nodeType && ((r = Te(e).offset()).top += Te.css(e, "borderTopWidth", !0), r.left += Te.css(e, "borderLeftWidth", !0))
				}
				return {
					top: t.top - r.top - Te.css(i, "marginTop", !0),
					left: t.left - r.left - Te.css(i, "marginLeft", !0)
				}
			}
		},
		offsetParent: function () {
			return this.map(function () {
				for (var e = this.offsetParent; e && "static" === Te.css(e, "position");) e = e.offsetParent;
				return e || it
			})
		}
	}), Te.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function (e, t) {
		var n = "pageYOffset" === t;
		Te.fn[e] = function (i) {
			return He(this, function (e, i, r) {
				var o;
				if (_e(e) ? o = e : 9 === e.nodeType && (o = e.defaultView), r === undefined) return o ? o[t] : e[i];
				o ? o.scrollTo(n ? o.pageXOffset : r, n ? r : o.pageYOffset) : e[i] = r
			}, e, i, arguments.length)
		}
	}), Te.each(["top", "left"], function (e, t) {
		Te.cssHooks[t] = H(ve.pixelPosition, function (e, n) {
			if (n) return n = k(e, t), ft.test(n) ? Te(e).position()[t] + "px" : n
		})
	}), Te.each({
		Height: "height",
		Width: "width"
	}, function (e, t) {
		Te.each({
			padding: "inner" + e,
			content: t,
			"": "outer" + e
		}, function (n, i) {
			Te.fn[i] = function (r, o) {
				var s = arguments.length && (n || "boolean" != typeof r),
					a = n || (!0 === r || !0 === o ? "margin" : "border");
				return He(this, function (t, n, r) {
					var o;
					return _e(t) ? 0 === i.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : r === undefined ? Te.css(t, n, a) : Te.style(t, n, r, a)
				}, t, s ? r : undefined, s)
			}
		})
	}), Te.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (e, t) {
		Te.fn[t] = function (e, n) {
			return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
		}
	}), Te.fn.extend({
		hover: function (e, t) {
			return this.mouseenter(e).mouseleave(t || e)
		}
	}), Te.fn.extend({
		bind: function (e, t, n) {
			return this.on(e, null, t, n)
		},
		unbind: function (e, t) {
			return this.off(e, null, t)
		},
		delegate: function (e, t, n, i) {
			return this.on(t, e, n, i)
		},
		undelegate: function (e, t, n) {
			return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
		}
	}), Te.proxy = function (e, t) {
		var n, i, r;
		return "string" == typeof t && (n = e[t], t = e, e = n), ye(e) ? (i = le.call(arguments, 2), (r = function () {
			return e.apply(t || this, i.concat(le.call(arguments)))
		}).guid = e.guid = e.guid || Te.guid++, r) : undefined
	}, Te.holdReady = function (e) {
		e ? Te.readyWait++ : Te.ready(!0)
	}, Te.isArray = Array.isArray, Te.parseJSON = JSON.parse, Te.nodeName = o, Te.isFunction = ye, Te.isWindow = _e, Te.camelCase = p, Te.type = i, Te.now = Date.now, Te.isNumeric = function (e) {
		var t = Te.type(e);
		return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
	}, "function" == typeof define && define.amd && define("jquery", [], function () {
		return Te
	});
	var en = e.jQuery,
		tn = e.$;
	return Te.noConflict = function (t) {
		return e.$ === Te && (e.$ = tn), t && e.jQuery === Te && (e.jQuery = en), Te
	}, t || (e.jQuery = e.$ = Te), Te
}),
function (e, t) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Popper = t()
}(this, function () {
	"use strict";

	function e(e) {
		var t = !1;
		return function () {
			t || (t = !0, window.Promise.resolve().then(function () {
				t = !1, e()
			}))
		}
	}

	function t(e) {
		var t = !1;
		return function () {
			t || (t = !0, setTimeout(function () {
				t = !1, e()
			}, ue))
		}
	}

	function n(e) {
		return e && "[object Function]" === {}.toString.call(e)
	}

	function i(e, t) {
		if (1 !== e.nodeType) return [];
		var n = e.ownerDocument.defaultView.getComputedStyle(e, null);
		return t ? n[t] : n
	}

	function r(e) {
		return "HTML" === e.nodeName ? e : e.parentNode || e.host
	}

	function o(e) {
		if (!e) return document.body;
		switch (e.nodeName) {
		case "HTML":
		case "BODY":
			return e.ownerDocument.body;
		case "#document":
			return e.body
		}
		var t = i(e),
			n = t.overflow,
			s = t.overflowX,
			a = t.overflowY;
		return /(auto|scroll|overlay)/.test(n + a + s) ? e : o(r(e))
	}

	function s(e) {
		return 11 === e ? de : 10 === e ? he : de || he
	}

	function a(e) {
		if (!e) return document.documentElement;
		for (var t = s(10) ? document.body : null, n = e.offsetParent || null; n === t && e.nextElementSibling;) n = (e = e.nextElementSibling).offsetParent;
		var r = n && n.nodeName;
		return r && "BODY" !== r && "HTML" !== r ? -1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) && "static" === i(n, "position") ? a(n) : n : e ? e.ownerDocument.documentElement : document.documentElement
	}

	function l(e) {
		var t = e.nodeName;
		return "BODY" !== t && ("HTML" === t || a(e.firstElementChild) === e)
	}

	function u(e) {
		return null !== e.parentNode ? u(e.parentNode) : e
	}

	function c(e, t) {
		if (!(e && e.nodeType && t && t.nodeType)) return document.documentElement;
		var n = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
			i = n ? e : t,
			r = n ? t : e,
			o = document.createRange();
		o.setStart(i, 0), o.setEnd(r, 0);
		var s = o.commonAncestorContainer;
		if (e !== s && t !== s || i.contains(r)) return l(s) ? s : a(s);
		var f = u(e);
		return f.host ? c(f.host, t) : c(e, u(t).host)
	}

	function f(e) {
		var t = "top" === (arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "top") ? "scrollTop" : "scrollLeft",
			n = e.nodeName;
		if ("BODY" === n || "HTML" === n) {
			var i = e.ownerDocument.documentElement;
			return (e.ownerDocument.scrollingElement || i)[t]
		}
		return e[t]
	}

	function d(e, t) {
		var n = arguments.length > 2 && arguments[2] !== undefined && arguments[2],
			i = f(t, "top"),
			r = f(t, "left"),
			o = n ? -1 : 1;
		return e.top += i * o, e.bottom += i * o, e.left += r * o, e.right += r * o, e
	}

	function h(e, t) {
		var n = "x" === t ? "Left" : "Top",
			i = "Left" === n ? "Right" : "Bottom";
		return parseFloat(e["border" + n + "Width"], 10) + parseFloat(e["border" + i + "Width"], 10)
	}

	function p(e, t, n, i) {
		return Math.max(t["offset" + e], t["scroll" + e], n["client" + e], n["offset" + e], n["scroll" + e], s(10) ? parseInt(n["offset" + e]) + parseInt(i["margin" + ("Height" === e ? "Top" : "Left")]) + parseInt(i["margin" + ("Height" === e ? "Bottom" : "Right")]) : 0)
	}

	function g(e) {
		var t = e.body,
			n = e.documentElement,
			i = s(10) && getComputedStyle(n);
		return {
			height: p("Height", t, n, i),
			width: p("Width", t, n, i)
		}
	}

	function m(e) {
		return ve({}, e, {
			right: e.left + e.width,
			bottom: e.top + e.height
		})
	}

	function v(e) {
		var t = {};
		try {
			if (s(10)) {
				t = e.getBoundingClientRect();
				var n = f(e, "top"),
					r = f(e, "left");
				t.top += n, t.left += r, t.bottom += n, t.right += r
			} else t = e.getBoundingClientRect()
		} catch (v) {}
		var o = {
				left: t.left,
				top: t.top,
				width: t.right - t.left,
				height: t.bottom - t.top
			},
			a = "HTML" === e.nodeName ? g(e.ownerDocument) : {},
			l = a.width || e.clientWidth || o.right - o.left,
			u = a.height || e.clientHeight || o.bottom - o.top,
			c = e.offsetWidth - l,
			d = e.offsetHeight - u;
		if (c || d) {
			var p = i(e);
			c -= h(p, "x"), d -= h(p, "y"), o.width -= c, o.height -= d
		}
		return m(o)
	}

	function y(e, t) {
		var n = arguments.length > 2 && arguments[2] !== undefined && arguments[2],
			r = s(10),
			a = "HTML" === t.nodeName,
			l = v(e),
			u = v(t),
			c = o(e),
			f = i(t),
			h = parseFloat(f.borderTopWidth, 10),
			p = parseFloat(f.borderLeftWidth, 10);
		n && a && (u.top = Math.max(u.top, 0), u.left = Math.max(u.left, 0));
		var g = m({
			top: l.top - u.top - h,
			left: l.left - u.left - p,
			width: l.width,
			height: l.height
		});
		if (g.marginTop = 0, g.marginLeft = 0, !r && a) {
			var y = parseFloat(f.marginTop, 10),
				_ = parseFloat(f.marginLeft, 10);
			g.top -= h - y, g.bottom -= h - y, g.left -= p - _, g.right -= p - _, g.marginTop = y, g.marginLeft = _
		}
		return (r && !n ? t.contains(c) : t === c && "BODY" !== c.nodeName) && (g = d(g, t)), g
	}

	function _(e) {
		var t = arguments.length > 1 && arguments[1] !== undefined && arguments[1],
			n = e.ownerDocument.documentElement,
			i = y(e, n),
			r = Math.max(n.clientWidth, window.innerWidth || 0),
			o = Math.max(n.clientHeight, window.innerHeight || 0),
			s = t ? 0 : f(n),
			a = t ? 0 : f(n, "left");
		return m({
			top: s - i.top + i.marginTop,
			left: a - i.left + i.marginLeft,
			width: r,
			height: o
		})
	}

	function b(e) {
		var t = e.nodeName;
		return "BODY" !== t && "HTML" !== t && ("fixed" === i(e, "position") || b(r(e)))
	}

	function E(e) {
		if (!e || !e.parentElement || s()) return document.documentElement;
		for (var t = e.parentElement; t && "none" === i(t, "transform");) t = t.parentElement;
		return t || document.documentElement
	}

	function T(e, t, n, i) {
		var s = arguments.length > 4 && arguments[4] !== undefined && arguments[4],
			a = {
				top: 0,
				left: 0
			},
			l = s ? E(e) : c(e, t);
		if ("viewport" === i) a = _(l, s);
		else {
			var u = void 0;
			"scrollParent" === i ? "BODY" === (u = o(r(t))).nodeName && (u = e.ownerDocument.documentElement) : u = "window" === i ? e.ownerDocument.documentElement : i;
			var f = y(u, l, s);
			if ("HTML" !== u.nodeName || b(l)) a = f;
			else {
				var d = g(e.ownerDocument),
					h = d.height,
					p = d.width;
				a.top += f.top - f.marginTop, a.bottom = h + f.top, a.left += f.left - f.marginLeft, a.right = p + f.left
			}
		}
		var m = "number" == typeof (n = n || 0);
		return a.left += m ? n : n.left || 0, a.top += m ? n : n.top || 0, a.right -= m ? n : n.right || 0, a.bottom -= m ? n : n.bottom || 0, a
	}

	function w(e) {
		return e.width * e.height
	}

	function C(e, t, n, i, r) {
		var o = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
		if (-1 === e.indexOf("auto")) return e;
		var s = T(n, i, o, r),
			a = {
				top: {
					width: s.width,
					height: t.top - s.top
				},
				right: {
					width: s.right - t.right,
					height: s.height
				},
				bottom: {
					width: s.width,
					height: s.bottom - t.bottom
				},
				left: {
					width: t.left - s.left,
					height: s.height
				}
			},
			l = Object.keys(a).map(function (e) {
				return ve({
					key: e
				}, a[e], {
					area: w(a[e])
				})
			}).sort(function (e, t) {
				return t.area - e.area
			}),
			u = l.filter(function (e) {
				var t = e.width,
					i = e.height;
				return t >= n.clientWidth && i >= n.clientHeight
			}),
			c = u.length > 0 ? u[0].key : l[0].key,
			f = e.split("-")[1];
		return c + (f ? "-" + f : "")
	}

	function S(e, t, n) {
		var i = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
		return y(n, i ? E(t) : c(t, n), i)
	}

	function x(e) {
		var t = e.ownerDocument.defaultView.getComputedStyle(e),
			n = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
			i = parseFloat(t.marginLeft) + parseFloat(t.marginRight);
		return {
			width: e.offsetWidth + i,
			height: e.offsetHeight + n
		}
	}

	function A(e) {
		var t = {
			left: "right",
			right: "left",
			bottom: "top",
			top: "bottom"
		};
		return e.replace(/left|right|bottom|top/g, function (e) {
			return t[e]
		})
	}

	function D(e, t, n) {
		n = n.split("-")[0];
		var i = x(e),
			r = {
				width: i.width,
				height: i.height
			},
			o = -1 !== ["right", "left"].indexOf(n),
			s = o ? "top" : "left",
			a = o ? "left" : "top",
			l = o ? "height" : "width",
			u = o ? "width" : "height";
		return r[s] = t[s] + t[l] / 2 - i[l] / 2, r[a] = n === a ? t[a] - i[u] : t[A(a)], r
	}

	function O(e, t) {
		return Array.prototype.find ? e.find(t) : e.filter(t)[0]
	}

	function N(e, t, n) {
		if (Array.prototype.findIndex) return e.findIndex(function (e) {
			return e[t] === n
		});
		var i = O(e, function (e) {
			return e[t] === n
		});
		return e.indexOf(i)
	}

	function I(e, t, i) {
		return (i === undefined ? e : e.slice(0, N(e, "name", i))).forEach(function (e) {
			e["function"] && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
			var i = e["function"] || e.fn;
			e.enabled && n(i) && (t.offsets.popper = m(t.offsets.popper), t.offsets.reference = m(t.offsets.reference), t = i(t, e))
		}), t
	}

	function L() {
		if (!this.state.isDestroyed) {
			var e = {
				instance: this,
				styles: {},
				arrowStyles: {},
				attributes: {},
				flipped: !1,
				offsets: {}
			};
			e.offsets.reference = S(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = C(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = D(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", e = I(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e))
		}
	}

	function P(e, t) {
		return e.some(function (e) {
			var n = e.name;
			return e.enabled && n === t
		})
	}

	function R(e) {
		for (var t = [!1, "ms", "Webkit", "Moz", "O"], n = e.charAt(0).toUpperCase() + e.slice(1), i = 0; i < t.length; i++) {
			var r = t[i],
				o = r ? "" + r + n : e;
			if ("undefined" != typeof document.body.style[o]) return o
		}
		return null
	}

	function k() {
		return this.state.isDestroyed = !0, P(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[R("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
	}

	function H(e) {
		var t = e.ownerDocument;
		return t ? t.defaultView : window
	}

	function j(e, t, n, i) {
		var r = "BODY" === e.nodeName,
			s = r ? e.ownerDocument.defaultView : e;
		s.addEventListener(t, n, {
			passive: !0
		}), r || j(o(s.parentNode), t, n, i), i.push(s)
	}

	function M(e, t, n, i) {
		n.updateBound = i, H(e).addEventListener("resize", n.updateBound, {
			passive: !0
		});
		var r = o(e);
		return j(r, "scroll", n.updateBound, n.scrollParents), n.scrollElement = r, n.eventsEnabled = !0, n
	}

	function W() {
		this.state.eventsEnabled || (this.state = M(this.reference, this.options, this.state, this.scheduleUpdate))
	}

	function F(e, t) {
		return H(e).removeEventListener("resize", t.updateBound), t.scrollParents.forEach(function (e) {
			e.removeEventListener("scroll", t.updateBound)
		}), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t
	}

	function q() {
		this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = F(this.reference, this.state))
	}

	function U(e) {
		return "" !== e && !isNaN(parseFloat(e)) && isFinite(e)
	}

	function $(e, t) {
		Object.keys(t).forEach(function (n) {
			var i = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) && U(t[n]) && (i = "px"), e.style[n] = t[n] + i
		})
	}

	function B(e, t) {
		Object.keys(t).forEach(function (n) {
			!1 !== t[n] ? e.setAttribute(n, t[n]) : e.removeAttribute(n)
		})
	}

	function V(e) {
		return $(e.instance.popper, e.styles), B(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && $(e.arrowElement, e.arrowStyles), e
	}

	function G(e, t, n, i, r) {
		var o = S(r, t, e, n.positionFixed),
			s = C(n.placement, o, t, e, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
		return t.setAttribute("x-placement", s), $(t, {
			position: n.positionFixed ? "fixed" : "absolute"
		}), n
	}

	function K(e, t) {
		var n = t.x,
			i = t.y,
			r = e.offsets.popper,
			o = O(e.instance.modifiers, function (e) {
				return "applyStyle" === e.name
			}).gpuAcceleration;
		o !== undefined && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
		var s = o !== undefined ? o : t.gpuAcceleration,
			l = a(e.instance.popper),
			u = v(l),
			c = {
				position: r.position
			},
			f = {
				left: Math.floor(r.left),
				top: Math.round(r.top),
				bottom: Math.round(r.bottom),
				right: Math.floor(r.right)
			},
			d = "bottom" === n ? "top" : "bottom",
			h = "right" === i ? "left" : "right",
			p = R("transform"),
			g = void 0,
			m = void 0;
		if (m = "bottom" === d ? "HTML" === l.nodeName ? -l.clientHeight + f.bottom : -u.height + f.bottom : f.top, g = "right" === h ? "HTML" === l.nodeName ? -l.clientWidth + f.right : -u.width + f.right : f.left, s && p) c[p] = "translate3d(" + g + "px, " + m + "px, 0)", c[d] = 0, c[h] = 0, c.willChange = "transform";
		else {
			var y = "bottom" === d ? -1 : 1,
				_ = "right" === h ? -1 : 1;
			c[d] = m * y, c[h] = g * _, c.willChange = d + ", " + h
		}
		var b = {
			"x-placement": e.placement
		};
		return e.attributes = ve({}, b, e.attributes), e.styles = ve({}, c, e.styles), e.arrowStyles = ve({}, e.offsets.arrow, e.arrowStyles), e
	}

	function z(e, t, n) {
		var i = O(e, function (e) {
				return e.name === t
			}),
			r = !!i && e.some(function (e) {
				return e.name === n && e.enabled && e.order < i.order
			});
		if (!r) {
			var o = "`" + t + "`",
				s = "`" + n + "`";
			console.warn(s + " modifier is required by " + o + " modifier in order to work, be sure to include it before " + o + "!")
		}
		return r
	}

	function Y(e, t) {
		var n;
		if (!z(e.instance.modifiers, "arrow", "keepTogether")) return e;
		var r = t.element;
		if ("string" == typeof r) {
			if (!(r = e.instance.popper.querySelector(r))) return e
		} else if (!e.instance.popper.contains(r)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;
		var o = e.placement.split("-")[0],
			s = e.offsets,
			a = s.popper,
			l = s.reference,
			u = -1 !== ["left", "right"].indexOf(o),
			c = u ? "height" : "width",
			f = u ? "Top" : "Left",
			d = f.toLowerCase(),
			h = u ? "left" : "top",
			p = u ? "bottom" : "right",
			g = x(r)[c];
		l[p] - g < a[d] && (e.offsets.popper[d] -= a[d] - (l[p] - g)), l[d] + g > a[p] && (e.offsets.popper[d] += l[d] + g - a[p]), e.offsets.popper = m(e.offsets.popper);
		var v = l[d] + l[c] / 2 - g / 2,
			y = i(e.instance.popper),
			_ = parseFloat(y["margin" + f], 10),
			b = parseFloat(y["border" + f + "Width"], 10),
			E = v - e.offsets.popper[d] - _ - b;
		return E = Math.max(Math.min(a[c] - g, E), 0), e.arrowElement = r, e.offsets.arrow = (me(n = {}, d, Math.round(E)), me(n, h, ""), n), e
	}

	function Q(e) {
		return "end" === e ? "start" : "start" === e ? "end" : e
	}

	function X(e) {
		var t = arguments.length > 1 && arguments[1] !== undefined && arguments[1],
			n = _e.indexOf(e),
			i = _e.slice(n + 1).concat(_e.slice(0, n));
		return t ? i.reverse() : i
	}

	function J(e, t) {
		if (P(e.instance.modifiers, "inner")) return e;
		if (e.flipped && e.placement === e.originalPlacement) return e;
		var n = T(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed),
			i = e.placement.split("-")[0],
			r = A(i),
			o = e.placement.split("-")[1] || "",
			s = [];
		switch (t.behavior) {
		case be.FLIP:
			s = [i, r];
			break;
		case be.CLOCKWISE:
			s = X(i);
			break;
		case be.COUNTERCLOCKWISE:
			s = X(i, !0);
			break;
		default:
			s = t.behavior
		}
		return s.forEach(function (a, l) {
			if (i !== a || s.length === l + 1) return e;
			i = e.placement.split("-")[0], r = A(i);
			var u = e.offsets.popper,
				c = e.offsets.reference,
				f = Math.floor,
				d = "left" === i && f(u.right) > f(c.left) || "right" === i && f(u.left) < f(c.right) || "top" === i && f(u.bottom) > f(c.top) || "bottom" === i && f(u.top) < f(c.bottom),
				h = f(u.left) < f(n.left),
				p = f(u.right) > f(n.right),
				g = f(u.top) < f(n.top),
				m = f(u.bottom) > f(n.bottom),
				v = "left" === i && h || "right" === i && p || "top" === i && g || "bottom" === i && m,
				y = -1 !== ["top", "bottom"].indexOf(i),
				_ = !!t.flipVariations && (y && "start" === o && h || y && "end" === o && p || !y && "start" === o && g || !y && "end" === o && m);
			(d || v || _) && (e.flipped = !0, (d || v) && (i = s[l + 1]), _ && (o = Q(o)), e.placement = i + (o ? "-" + o : ""), e.offsets.popper = ve({}, e.offsets.popper, D(e.instance.popper, e.offsets.reference, e.placement)), e = I(e.instance.modifiers, e, "flip"))
		}), e
	}

	function Z(e) {
		var t = e.offsets,
			n = t.popper,
			i = t.reference,
			r = e.placement.split("-")[0],
			o = Math.floor,
			s = -1 !== ["top", "bottom"].indexOf(r),
			a = s ? "right" : "bottom",
			l = s ? "left" : "top",
			u = s ? "width" : "height";
		return n[a] < o(i[l]) && (e.offsets.popper[l] = o(i[l]) - n[u]), n[l] > o(i[a]) && (e.offsets.popper[l] = o(i[a])), e
	}

	function ee(e, t, n, i) {
		var r = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
			o = +r[1],
			s = r[2];
		if (!o) return e;
		if (0 === s.indexOf("%")) {
			var a = void 0;
			switch (s) {
			case "%p":
				a = n;
				break;
			case "%":
			case "%r":
			default:
				a = i
			}
			return m(a)[t] / 100 * o
		}
		if ("vh" === s || "vw" === s) {
			return ("vh" === s ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * o
		}
		return o
	}

	function te(e, t, n, i) {
		var r = [0, 0],
			o = -1 !== ["right", "left"].indexOf(i),
			s = e.split(/(\+|\-)/).map(function (e) {
				return e.trim()
			}),
			a = s.indexOf(O(s, function (e) {
				return -1 !== e.search(/,|\s/)
			}));
		s[a] && -1 === s[a].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
		var l = /\s*,\s*|\s+/,
			u = -1 !== a ? [s.slice(0, a).concat([s[a].split(l)[0]]), [s[a].split(l)[1]].concat(s.slice(a + 1))] : [s];
		return (u = u.map(function (e, i) {
			var r = (1 === i ? !o : o) ? "height" : "width",
				s = !1;
			return e.reduce(function (e, t) {
				return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t) ? (e[e.length - 1] = t, s = !0, e) : s ? (e[e.length - 1] += t, s = !1, e) : e.concat(t)
			}, []).map(function (e) {
				return ee(e, r, t, n)
			})
		})).forEach(function (e, t) {
			e.forEach(function (n, i) {
				U(n) && (r[t] += n * ("-" === e[i - 1] ? -1 : 1))
			})
		}), r
	}

	function ne(e, t) {
		var n = t.offset,
			i = e.placement,
			r = e.offsets,
			o = r.popper,
			s = r.reference,
			a = i.split("-")[0],
			l = void 0;
		return l = U(+n) ? [+n, 0] : te(n, o, s, a), "left" === a ? (o.top += l[0], o.left -= l[1]) : "right" === a ? (o.top += l[0], o.left += l[1]) : "top" === a ? (o.left += l[0], o.top -= l[1]) : "bottom" === a && (o.left += l[0], o.top += l[1]), e.popper = o, e
	}

	function ie(e, t) {
		var n = t.boundariesElement || a(e.instance.popper);
		e.instance.reference === n && (n = a(n));
		var i = R("transform"),
			r = e.instance.popper.style,
			o = r.top,
			s = r.left,
			l = r[i];
		r.top = "", r.left = "", r[i] = "";
		var u = T(e.instance.popper, e.instance.reference, t.padding, n, e.positionFixed);
		r.top = o, r.left = s, r[i] = l, t.boundaries = u;
		var c = t.priority,
			f = e.offsets.popper,
			d = {
				primary: function (e) {
					var n = f[e];
					return f[e] < u[e] && !t.escapeWithReference && (n = Math.max(f[e], u[e])), me({}, e, n)
				},
				secondary: function (e) {
					var n = "right" === e ? "left" : "top",
						i = f[n];
					return f[e] > u[e] && !t.escapeWithReference && (i = Math.min(f[n], u[e] - ("right" === e ? f.width : f.height))), me({}, n, i)
				}
			};
		return c.forEach(function (e) {
			var t = -1 !== ["left", "top"].indexOf(e) ? "primary" : "secondary";
			f = ve({}, f, d[t](e))
		}), e.offsets.popper = f, e
	}

	function re(e) {
		var t = e.placement,
			n = t.split("-")[0],
			i = t.split("-")[1];
		if (i) {
			var r = e.offsets,
				o = r.reference,
				s = r.popper,
				a = -1 !== ["bottom", "top"].indexOf(n),
				l = a ? "left" : "top",
				u = a ? "width" : "height",
				c = {
					start: me({}, l, o[l]),
					end: me({}, l, o[l] + o[u] - s[u])
				};
			e.offsets.popper = ve({}, s, c[i])
		}
		return e
	}

	function oe(e) {
		if (!z(e.instance.modifiers, "hide", "preventOverflow")) return e;
		var t = e.offsets.reference,
			n = O(e.instance.modifiers, function (e) {
				return "preventOverflow" === e.name
			}).boundaries;
		if (t.bottom < n.top || t.left > n.right || t.top > n.bottom || t.right < n.left) {
			if (!0 === e.hide) return e;
			e.hide = !0, e.attributes["x-out-of-boundaries"] = ""
		} else {
			if (!1 === e.hide) return e;
			e.hide = !1, e.attributes["x-out-of-boundaries"] = !1
		}
		return e
	}

	function se(e) {
		var t = e.placement,
			n = t.split("-")[0],
			i = e.offsets,
			r = i.popper,
			o = i.reference,
			s = -1 !== ["left", "right"].indexOf(n),
			a = -1 === ["top", "left"].indexOf(n);
		return r[s ? "left" : "top"] = o[n] - (a ? r[s ? "width" : "height"] : 0), e.placement = A(t), e.offsets.popper = m(r), e
	}
	for (var ae = "undefined" != typeof window && "undefined" != typeof document, le = ["Edge", "Trident", "Firefox"], ue = 0, ce = 0; ce < le.length; ce += 1)
		if (ae && navigator.userAgent.indexOf(le[ce]) >= 0) {
			ue = 1;
			break
		}
	var fe = ae && window.Promise ? e : t,
		de = ae && !(!window.MSInputMethodContext || !document.documentMode),
		he = ae && /MSIE 10/.test(navigator.userAgent),
		pe = function (e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		},
		ge = function () {
			function e(e, t) {
				for (var n = 0; n < t.length; n++) {
					var i = t[n];
					i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
				}
			}
			return function (t, n, i) {
				return n && e(t.prototype, n), i && e(t, i), t
			}
		}(),
		me = function (e, t, n) {
			return t in e ? Object.defineProperty(e, t, {
				value: n,
				enumerable: !0,
				configurable: !0,
				writable: !0
			}) : e[t] = n, e
		},
		ve = Object.assign || function (e) {
			for (var t = 1; t < arguments.length; t++) {
				var n = arguments[t];
				for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
			}
			return e
		},
		ye = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
		_e = ye.slice(3),
		be = {
			FLIP: "flip",
			CLOCKWISE: "clockwise",
			COUNTERCLOCKWISE: "counterclockwise"
		},
		Ee = {
			placement: "bottom",
			positionFixed: !1,
			eventsEnabled: !0,
			removeOnDestroy: !1,
			onCreate: function () {},
			onUpdate: function () {},
			modifiers: {
				shift: {
					order: 100,
					enabled: !0,
					fn: re
				},
				offset: {
					order: 200,
					enabled: !0,
					fn: ne,
					offset: 0
				},
				preventOverflow: {
					order: 300,
					enabled: !0,
					fn: ie,
					priority: ["left", "right", "top", "bottom"],
					padding: 5,
					boundariesElement: "scrollParent"
				},
				keepTogether: {
					order: 400,
					enabled: !0,
					fn: Z
				},
				arrow: {
					order: 500,
					enabled: !0,
					fn: Y,
					element: "[x-arrow]"
				},
				flip: {
					order: 600,
					enabled: !0,
					fn: J,
					behavior: "flip",
					padding: 5,
					boundariesElement: "viewport"
				},
				inner: {
					order: 700,
					enabled: !1,
					fn: se
				},
				hide: {
					order: 800,
					enabled: !0,
					fn: oe
				},
				computeStyle: {
					order: 850,
					enabled: !0,
					fn: K,
					gpuAcceleration: !0,
					x: "bottom",
					y: "right"
				},
				applyStyle: {
					order: 900,
					enabled: !0,
					fn: V,
					onLoad: G,
					gpuAcceleration: undefined
				}
			}
		},
		Te = function () {
			function e(t, i) {
				var r = this,
					o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
				pe(this, e), this.scheduleUpdate = function () {
					return requestAnimationFrame(r.update)
				}, this.update = fe(this.update.bind(this)), this.options = ve({}, e.Defaults, o), this.state = {
					isDestroyed: !1,
					isCreated: !1,
					scrollParents: []
				}, this.reference = t && t.jquery ? t[0] : t, this.popper = i && i.jquery ? i[0] : i, this.options.modifiers = {}, Object.keys(ve({}, e.Defaults.modifiers, o.modifiers)).forEach(function (t) {
					r.options.modifiers[t] = ve({}, e.Defaults.modifiers[t] || {}, o.modifiers ? o.modifiers[t] : {})
				}), this.modifiers = Object.keys(this.options.modifiers).map(function (e) {
					return ve({
						name: e
					}, r.options.modifiers[e])
				}).sort(function (e, t) {
					return e.order - t.order
				}), this.modifiers.forEach(function (e) {
					e.enabled && n(e.onLoad) && e.onLoad(r.reference, r.popper, r.options, e, r.state)
				}), this.update();
				var s = this.options.eventsEnabled;
				s && this.enableEventListeners(), this.state.eventsEnabled = s
			}
			return ge(e, [{
				key: "update",
				value: function () {
					return L.call(this)
				}
			}, {
				key: "destroy",
				value: function () {
					return k.call(this)
				}
			}, {
				key: "enableEventListeners",
				value: function () {
					return W.call(this)
				}
			}, {
				key: "disableEventListeners",
				value: function () {
					return q.call(this)
				}
			}]), e
		}();
	return Te.Utils = ("undefined" != typeof window ? window : global).PopperUtils, Te.placements = ye, Te.Defaults = Ee, Te
}),
function (e, t) {
	"object" == typeof exports && "undefined" != typeof module ? t(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], t) : t((e = e || self).bootstrap = {}, e.jQuery, e.Popper)
}(this, function (e, t, n) {
	"use strict";

	function i(e, t) {
		for (var n = 0; n < t.length; n++) {
			var i = t[n];
			i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
		}
	}

	function r(e, t, n) {
		return t && i(e.prototype, t), n && i(e, n), e
	}

	function o(e, t, n) {
		return t in e ? Object.defineProperty(e, t, {
			value: n,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[t] = n, e
	}

	function s(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = null != arguments[t] ? arguments[t] : {},
				i = Object.keys(n);
			"function" == typeof Object.getOwnPropertySymbols && (i = i.concat(Object.getOwnPropertySymbols(n).filter(function (e) {
				return Object.getOwnPropertyDescriptor(n, e).enumerable
			}))), i.forEach(function (t) {
				o(e, t, n[t])
			})
		}
		return e
	}

	function a(e, t) {
		e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t
	}

	function l(e) {
		return {}.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase()
	}

	function u() {
		return {
			bindType: p,
			delegateType: p,
			handle: function (e) {
				return t(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : undefined
			}
		}
	}

	function c(e) {
		var n = this,
			i = !1;
		return t(this).one(v.TRANSITION_END, function () {
			i = !0
		}), setTimeout(function () {
			i || v.triggerTransitionEnd(n)
		}, e), this
	}

	function f() {
		t.fn.emulateTransitionEnd = c, t.event.special[v.TRANSITION_END] = u()
	}

	function d(e, t) {
		var n = e.nodeName.toLowerCase();
		if (-1 !== t.indexOf(n)) return -1 === ze.indexOf(n) || Boolean(e.nodeValue.match(Qe) || e.nodeValue.match(Xe));
		for (var i = t.filter(function (e) {
			return e instanceof RegExp
		}), r = 0, o = i.length; r < o; r++)
			if (n.match(i[r])) return !0;
		return !1
	}

	function h(e, t, n) {
		if (0 === e.length) return e;
		if (n && "function" == typeof n) return n(e);
		for (var i = (new window.DOMParser).parseFromString(e, "text/html"), r = Object.keys(t), o = [].slice.call(i.body.querySelectorAll("*")), s = function (e) {
			var n = o[e],
				i = n.nodeName.toLowerCase();
			if (-1 === r.indexOf(n.nodeName.toLowerCase())) return n.parentNode.removeChild(n), "continue";
			var s = [].slice.call(n.attributes),
				a = [].concat(t["*"] || [], t[i] || []);
			s.forEach(function (e) {
				d(e, a) || n.removeAttribute(e.nodeName)
			})
		}, a = 0, l = o.length; a < l; a++) s(a, l);
		return i.body.innerHTML
	}
	t = t && t.hasOwnProperty("default") ? t["default"] : t, n = n && n.hasOwnProperty("default") ? n["default"] : n;
	var p = "transitionend",
		g = 1e6,
		m = 1e3,
		v = {
			TRANSITION_END: "bsTransitionEnd",
			getUID: function (e) {
				do {
					e += ~~(Math.random() * g)
				} while (document.getElementById(e));
				return e
			},
			getSelectorFromElement: function (e) {
				var t = e.getAttribute("data-target");
				if (!t || "#" === t) {
					var n = e.getAttribute("href");
					t = n && "#" !== n ? n.trim() : ""
				}
				try {
					return document.querySelector(t) ? t : null
				} catch (i) {
					return null
				}
			},
			getTransitionDurationFromElement: function (e) {
				if (!e) return 0;
				var n = t(e).css("transition-duration"),
					i = t(e).css("transition-delay"),
					r = parseFloat(n),
					o = parseFloat(i);
				return r || o ? (n = n.split(",")[0], i = i.split(",")[0], (parseFloat(n) + parseFloat(i)) * m) : 0
			},
			reflow: function (e) {
				return e.offsetHeight
			},
			triggerTransitionEnd: function (e) {
				t(e).trigger(p)
			},
			supportsTransitionEnd: function () {
				return Boolean(p)
			},
			isElement: function (e) {
				return (e[0] || e).nodeType
			},
			typeCheckConfig: function (e, t, n) {
				for (var i in n)
					if (Object.prototype.hasOwnProperty.call(n, i)) {
						var r = n[i],
							o = t[i],
							s = o && v.isElement(o) ? "element" : l(o);
						if (!new RegExp(r).test(s)) throw new Error(e.toUpperCase() + ': Option "' + i + '" provided type "' + s + '" but expected type "' + r + '".')
					}
			},
			findShadowRoot: function (e) {
				if (!document.documentElement.attachShadow) return null;
				if ("function" == typeof e.getRootNode) {
					var t = e.getRootNode();
					return t instanceof ShadowRoot ? t : null
				}
				return e instanceof ShadowRoot ? e : e.parentNode ? v.findShadowRoot(e.parentNode) : null
			}
		};
	f();
	var y = "alert",
		_ = "4.3.1",
		b = "bs.alert",
		E = "." + b,
		T = ".data-api",
		w = t.fn[y],
		C = {
			DISMISS: '[data-dismiss="alert"]'
		},
		S = {
			CLOSE: "close" + E,
			CLOSED: "closed" + E,
			CLICK_DATA_API: "click" + E + T
		},
		x = {
			ALERT: "alert",
			FADE: "fade",
			SHOW: "show"
		},
		A = function () {
			function e(e) {
				this._element = e
			}
			var n = e.prototype;
			return n.close = function (e) {
				var t = this._element;
				e && (t = this._getRootElement(e)), this._triggerCloseEvent(t).isDefaultPrevented() || this._removeElement(t)
			}, n.dispose = function () {
				t.removeData(this._element, b), this._element = null
			}, n._getRootElement = function (e) {
				var n = v.getSelectorFromElement(e),
					i = !1;
				return n && (i = document.querySelector(n)), i || (i = t(e).closest("." + x.ALERT)[0]), i
			}, n._triggerCloseEvent = function (e) {
				var n = t.Event(S.CLOSE);
				return t(e).trigger(n), n
			}, n._removeElement = function (e) {
				var n = this;
				if (t(e).removeClass(x.SHOW), t(e).hasClass(x.FADE)) {
					var i = v.getTransitionDurationFromElement(e);
					t(e).one(v.TRANSITION_END, function (t) {
						return n._destroyElement(e, t)
					}).emulateTransitionEnd(i)
				} else this._destroyElement(e)
			}, n._destroyElement = function (e) {
				t(e).detach().trigger(S.CLOSED).remove()
			}, e._jQueryInterface = function (n) {
				return this.each(function () {
					var i = t(this),
						r = i.data(b);
					r || (r = new e(this), i.data(b, r)), "close" === n && r[n](this)
				})
			}, e._handleDismiss = function (e) {
				return function (t) {
					t && t.preventDefault(), e.close(this)
				}
			}, r(e, null, [{
				key: "VERSION",
				get: function () {
					return _
				}
			}]), e
		}();
	t(document).on(S.CLICK_DATA_API, C.DISMISS, A._handleDismiss(new A)), t.fn[y] = A._jQueryInterface, t.fn[y].Constructor = A, t.fn[y].noConflict = function () {
		return t.fn[y] = w, A._jQueryInterface
	};
	var D = "button",
		O = "4.3.1",
		N = "bs.button",
		I = "." + N,
		L = ".data-api",
		P = t.fn[D],
		R = {
			ACTIVE: "active",
			BUTTON: "btn",
			FOCUS: "focus"
		},
		k = {
			DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
			DATA_TOGGLE: '[data-toggle="buttons"]',
			INPUT: 'input:not([type="hidden"])',
			ACTIVE: ".active",
			BUTTON: ".btn"
		},
		H = {
			CLICK_DATA_API: "click" + I + L,
			FOCUS_BLUR_DATA_API: "focus" + I + L + " blur" + I + L
		},
		j = function () {
			function e(e) {
				this._element = e
			}
			var n = e.prototype;
			return n.toggle = function () {
				var e = !0,
					n = !0,
					i = t(this._element).closest(k.DATA_TOGGLE)[0];
				if (i) {
					var r = this._element.querySelector(k.INPUT);
					if (r) {
						if ("radio" === r.type)
							if (r.checked && this._element.classList.contains(R.ACTIVE)) e = !1;
							else {
								var o = i.querySelector(k.ACTIVE);
								o && t(o).removeClass(R.ACTIVE)
							}
						if (e) {
							if (r.hasAttribute("disabled") || i.hasAttribute("disabled") || r.classList.contains("disabled") || i.classList.contains("disabled")) return;
							r.checked = !this._element.classList.contains(R.ACTIVE), t(r).trigger("change")
						}
						r.focus(), n = !1
					}
				}
				n && this._element.setAttribute("aria-pressed", !this._element.classList.contains(R.ACTIVE)), e && t(this._element).toggleClass(R.ACTIVE)
			}, n.dispose = function () {
				t.removeData(this._element, N), this._element = null
			}, e._jQueryInterface = function (n) {
				return this.each(function () {
					var i = t(this).data(N);
					i || (i = new e(this), t(this).data(N, i)), "toggle" === n && i[n]()
				})
			}, r(e, null, [{
				key: "VERSION",
				get: function () {
					return O
				}
			}]), e
		}();
	t(document).on(H.CLICK_DATA_API, k.DATA_TOGGLE_CARROT, function (e) {
		e.preventDefault();
		var n = e.target;
		t(n).hasClass(R.BUTTON) || (n = t(n).closest(k.BUTTON)), j._jQueryInterface.call(t(n), "toggle")
	}).on(H.FOCUS_BLUR_DATA_API, k.DATA_TOGGLE_CARROT, function (e) {
		var n = t(e.target).closest(k.BUTTON)[0];
		t(n).toggleClass(R.FOCUS, /^focus(in)?$/.test(e.type))
	}), t.fn[D] = j._jQueryInterface, t.fn[D].Constructor = j, t.fn[D].noConflict = function () {
		return t.fn[D] = P, j._jQueryInterface
	};
	var M = "carousel",
		W = "4.3.1",
		F = "bs.carousel",
		q = "." + F,
		U = ".data-api",
		$ = t.fn[M],
		B = 37,
		V = 39,
		G = 500,
		K = 40,
		z = {
			interval: 5e3,
			keyboard: !0,
			slide: !1,
			pause: "hover",
			wrap: !0,
			touch: !0
		},
		Y = {
			interval: "(number|boolean)",
			keyboard: "boolean",
			slide: "(boolean|string)",
			pause: "(string|boolean)",
			wrap: "boolean",
			touch: "boolean"
		},
		Q = {
			NEXT: "next",
			PREV: "prev",
			LEFT: "left",
			RIGHT: "right"
		},
		X = {
			SLIDE: "slide" + q,
			SLID: "slid" + q,
			KEYDOWN: "keydown" + q,
			MOUSEENTER: "mouseenter" + q,
			MOUSELEAVE: "mouseleave" + q,
			TOUCHSTART: "touchstart" + q,
			TOUCHMOVE: "touchmove" + q,
			TOUCHEND: "touchend" + q,
			POINTERDOWN: "pointerdown" + q,
			POINTERUP: "pointerup" + q,
			DRAG_START: "dragstart" + q,
			LOAD_DATA_API: "load" + q + U,
			CLICK_DATA_API: "click" + q + U
		},
		J = {
			CAROUSEL: "carousel",
			ACTIVE: "active",
			SLIDE: "slide",
			RIGHT: "carousel-item-right",
			LEFT: "carousel-item-left",
			NEXT: "carousel-item-next",
			PREV: "carousel-item-prev",
			ITEM: "carousel-item",
			POINTER_EVENT: "pointer-event"
		},
		Z = {
			ACTIVE: ".active",
			ACTIVE_ITEM: ".active.carousel-item",
			ITEM: ".carousel-item",
			ITEM_IMG: ".carousel-item img",
			NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
			INDICATORS: ".carousel-indicators",
			DATA_SLIDE: "[data-slide], [data-slide-to]",
			DATA_RIDE: '[data-ride="carousel"]'
		},
		ee = {
			TOUCH: "touch",
			PEN: "pen"
		},
		te = function () {
			function e(e, t) {
				this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(t), this._element = e, this._indicatorsElement = this._element.querySelector(Z.INDICATORS), this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners()
			}
			var n = e.prototype;
			return n.next = function () {
				this._isSliding || this._slide(Q.NEXT)
			}, n.nextWhenVisible = function () {
				!document.hidden && t(this._element).is(":visible") && "hidden" !== t(this._element).css("visibility") && this.next()
			}, n.prev = function () {
				this._isSliding || this._slide(Q.PREV)
			}, n.pause = function (e) {
				e || (this._isPaused = !0), this._element.querySelector(Z.NEXT_PREV) && (v.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
			}, n.cycle = function (e) {
				e || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
			}, n.to = function (e) {
				var n = this;
				this._activeElement = this._element.querySelector(Z.ACTIVE_ITEM);
				var i = this._getItemIndex(this._activeElement);
				if (!(e > this._items.length - 1 || e < 0))
					if (this._isSliding) t(this._element).one(X.SLID, function () {
						return n.to(e)
					});
					else {
						if (i === e) return this.pause(), void this.cycle();
						var r = e > i ? Q.NEXT : Q.PREV;
						this._slide(r, this._items[e])
					}
			}, n.dispose = function () {
				t(this._element).off(q), t.removeData(this._element, F), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
			}, n._getConfig = function (e) {
				return e = s({}, z, e), v.typeCheckConfig(M, e, Y), e
			}, n._handleSwipe = function () {
				var e = Math.abs(this.touchDeltaX);
				if (!(e <= K)) {
					var t = e / this.touchDeltaX;
					t > 0 && this.prev(), t < 0 && this.next()
				}
			}, n._addEventListeners = function () {
				var e = this;
				this._config.keyboard && t(this._element).on(X.KEYDOWN, function (t) {
					return e._keydown(t)
				}), "hover" === this._config.pause && t(this._element).on(X.MOUSEENTER, function (t) {
					return e.pause(t)
				}).on(X.MOUSELEAVE, function (t) {
					return e.cycle(t)
				}), this._config.touch && this._addTouchEventListeners()
			}, n._addTouchEventListeners = function () {
				var e = this;
				if (this._touchSupported) {
					var n = function (t) {
							e._pointerEvent && ee[t.originalEvent.pointerType.toUpperCase()] ? e.touchStartX = t.originalEvent.clientX : e._pointerEvent || (e.touchStartX = t.originalEvent.touches[0].clientX)
						},
						i = function (t) {
							t.originalEvent.touches && t.originalEvent.touches.length > 1 ? e.touchDeltaX = 0 : e.touchDeltaX = t.originalEvent.touches[0].clientX - e.touchStartX
						},
						r = function (t) {
							e._pointerEvent && ee[t.originalEvent.pointerType.toUpperCase()] && (e.touchDeltaX = t.originalEvent.clientX - e.touchStartX), e._handleSwipe(), "hover" === e._config.pause && (e.pause(), e.touchTimeout && clearTimeout(e.touchTimeout), e.touchTimeout = setTimeout(function (t) {
								return e.cycle(t)
							}, G + e._config.interval))
						};
					t(this._element.querySelectorAll(Z.ITEM_IMG)).on(X.DRAG_START, function (e) {
						return e.preventDefault()
					}), this._pointerEvent ? (t(this._element).on(X.POINTERDOWN, function (e) {
						return n(e)
					}), t(this._element).on(X.POINTERUP, function (e) {
						return r(e)
					}), this._element.classList.add(J.POINTER_EVENT)) : (t(this._element).on(X.TOUCHSTART, function (e) {
						return n(e)
					}), t(this._element).on(X.TOUCHMOVE, function (e) {
						return i(e)
					}), t(this._element).on(X.TOUCHEND, function (e) {
						return r(e)
					}))
				}
			}, n._keydown = function (e) {
				if (!/input|textarea/i.test(e.target.tagName)) switch (e.which) {
				case B:
					e.preventDefault(), this.prev();
					break;
				case V:
					e.preventDefault(), this.next()
				}
			}, n._getItemIndex = function (e) {
				return this._items = e && e.parentNode ? [].slice.call(e.parentNode.querySelectorAll(Z.ITEM)) : [], this._items.indexOf(e)
			}, n._getItemByDirection = function (e, t) {
				var n = e === Q.NEXT,
					i = e === Q.PREV,
					r = this._getItemIndex(t),
					o = this._items.length - 1;
				if ((i && 0 === r || n && r === o) && !this._config.wrap) return t;
				var s = (r + (e === Q.PREV ? -1 : 1)) % this._items.length;
				return -1 === s ? this._items[this._items.length - 1] : this._items[s]
			}, n._triggerSlideEvent = function (e, n) {
				var i = this._getItemIndex(e),
					r = this._getItemIndex(this._element.querySelector(Z.ACTIVE_ITEM)),
					o = t.Event(X.SLIDE, {
						relatedTarget: e,
						direction: n,
						from: r,
						to: i
					});
				return t(this._element).trigger(o), o
			}, n._setActiveIndicatorElement = function (e) {
				if (this._indicatorsElement) {
					var n = [].slice.call(this._indicatorsElement.querySelectorAll(Z.ACTIVE));
					t(n).removeClass(J.ACTIVE);
					var i = this._indicatorsElement.children[this._getItemIndex(e)];
					i && t(i).addClass(J.ACTIVE)
				}
			}, n._slide = function (e, n) {
				var i, r, o, s = this,
					a = this._element.querySelector(Z.ACTIVE_ITEM),
					l = this._getItemIndex(a),
					u = n || a && this._getItemByDirection(e, a),
					c = this._getItemIndex(u),
					f = Boolean(this._interval);
				if (e === Q.NEXT ? (i = J.LEFT, r = J.NEXT, o = Q.LEFT) : (i = J.RIGHT, r = J.PREV, o = Q.RIGHT), u && t(u).hasClass(J.ACTIVE)) this._isSliding = !1;
				else if (!this._triggerSlideEvent(u, o).isDefaultPrevented() && a && u) {
					this._isSliding = !0, f && this.pause(), this._setActiveIndicatorElement(u);
					var d = t.Event(X.SLID, {
						relatedTarget: u,
						direction: o,
						from: l,
						to: c
					});
					if (t(this._element).hasClass(J.SLIDE)) {
						t(u).addClass(r), v.reflow(u), t(a).addClass(i), t(u).addClass(i);
						var h = parseInt(u.getAttribute("data-interval"), 10);
						h ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = h) : this._config.interval = this._config.defaultInterval || this._config.interval;
						var p = v.getTransitionDurationFromElement(a);
						t(a).one(v.TRANSITION_END, function () {
							t(u).removeClass(i + " " + r).addClass(J.ACTIVE), t(a).removeClass(J.ACTIVE + " " + r + " " + i), s._isSliding = !1, setTimeout(function () {
								return t(s._element).trigger(d)
							}, 0)
						}).emulateTransitionEnd(p)
					} else t(a).removeClass(J.ACTIVE), t(u).addClass(J.ACTIVE), this._isSliding = !1, t(this._element).trigger(d);
					f && this.cycle()
				}
			}, e._jQueryInterface = function (n) {
				return this.each(function () {
					var i = t(this).data(F),
						r = s({}, z, t(this).data());
					"object" == typeof n && (r = s({}, r, n));
					var o = "string" == typeof n ? n : r.slide;
					if (i || (i = new e(this, r), t(this).data(F, i)), "number" == typeof n) i.to(n);
					else if ("string" == typeof o) {
						if ("undefined" == typeof i[o]) throw new TypeError('No method named "' + o + '"');
						i[o]()
					} else r.interval && r.ride && (i.pause(), i.cycle())
				})
			}, e._dataApiClickHandler = function (n) {
				var i = v.getSelectorFromElement(this);
				if (i) {
					var r = t(i)[0];
					if (r && t(r).hasClass(J.CAROUSEL)) {
						var o = s({}, t(r).data(), t(this).data()),
							a = this.getAttribute("data-slide-to");
						a && (o.interval = !1), e._jQueryInterface.call(t(r), o), a && t(r).data(F).to(a), n.preventDefault()
					}
				}
			}, r(e, null, [{
				key: "VERSION",
				get: function () {
					return W
				}
			}, {
				key: "Default",
				get: function () {
					return z
				}
			}]), e
		}();
	t(document).on(X.CLICK_DATA_API, Z.DATA_SLIDE, te._dataApiClickHandler), t(window).on(X.LOAD_DATA_API, function () {
		for (var e = [].slice.call(document.querySelectorAll(Z.DATA_RIDE)), n = 0, i = e.length; n < i; n++) {
			var r = t(e[n]);
			te._jQueryInterface.call(r, r.data())
		}
	}), t.fn[M] = te._jQueryInterface, t.fn[M].Constructor = te, t.fn[M].noConflict = function () {
		return t.fn[M] = $, te._jQueryInterface
	};
	var ne = "collapse",
		ie = "4.3.1",
		re = "bs.collapse",
		oe = "." + re,
		se = ".data-api",
		ae = t.fn[ne],
		le = {
			toggle: !0,
			parent: ""
		},
		ue = {
			toggle: "boolean",
			parent: "(string|element)"
		},
		ce = {
			SHOW: "show" + oe,
			SHOWN: "shown" + oe,
			HIDE: "hide" + oe,
			HIDDEN: "hidden" + oe,
			CLICK_DATA_API: "click" + oe + se
		},
		fe = {
			SHOW: "show",
			COLLAPSE: "collapse",
			COLLAPSING: "collapsing",
			COLLAPSED: "collapsed"
		},
		de = {
			WIDTH: "width",
			HEIGHT: "height"
		},
		he = {
			ACTIVES: ".show, .collapsing",
			DATA_TOGGLE: '[data-toggle="collapse"]'
		},
		pe = function () {
			function e(e, t) {
				this._isTransitioning = !1, this._element = e, this._config = this._getConfig(t), this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));
				for (var n = [].slice.call(document.querySelectorAll(he.DATA_TOGGLE)), i = 0, r = n.length; i < r; i++) {
					var o = n[i],
						s = v.getSelectorFromElement(o),
						a = [].slice.call(document.querySelectorAll(s)).filter(function (t) {
							return t === e
						});
					null !== s && a.length > 0 && (this._selector = s, this._triggerArray.push(o))
				}
				this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
			}
			var n = e.prototype;
			return n.toggle = function () {
				t(this._element).hasClass(fe.SHOW) ? this.hide() : this.show()
			}, n.show = function () {
				var n, i, r = this;
				if (!this._isTransitioning && !t(this._element).hasClass(fe.SHOW) && (this._parent && 0 === (n = [].slice.call(this._parent.querySelectorAll(he.ACTIVES)).filter(function (e) {
					return "string" == typeof r._config.parent ? e.getAttribute("data-parent") === r._config.parent : e.classList.contains(fe.COLLAPSE)
				})).length && (n = null), !(n && (i = t(n).not(this._selector).data(re)) && i._isTransitioning))) {
					var o = t.Event(ce.SHOW);
					if (t(this._element).trigger(o), !o.isDefaultPrevented()) {
						n && (e._jQueryInterface.call(t(n).not(this._selector), "hide"), i || t(n).data(re, null));
						var s = this._getDimension();
						t(this._element).removeClass(fe.COLLAPSE).addClass(fe.COLLAPSING), this._element.style[s] = 0,
						this._triggerArray.length && t(this._triggerArray).removeClass(fe.COLLAPSED).attr("aria-expanded", !0), this.setTransitioning(!0);
						var a = function () {
								t(r._element).removeClass(fe.COLLAPSING).addClass(fe.COLLAPSE).addClass(fe.SHOW), r._element.style[s] = "", r.setTransitioning(!1), t(r._element).trigger(ce.SHOWN)
							},
							l = "scroll" + (s[0].toUpperCase() + s.slice(1)),
							u = v.getTransitionDurationFromElement(this._element);
						t(this._element).one(v.TRANSITION_END, a).emulateTransitionEnd(u), this._element.style[s] = this._element[l] + "px"
					}
				}
			}, n.hide = function () {
				var e = this;
				if (!this._isTransitioning && t(this._element).hasClass(fe.SHOW)) {
					var n = t.Event(ce.HIDE);
					if (t(this._element).trigger(n), !n.isDefaultPrevented()) {
						var i = this._getDimension();
						this._element.style[i] = this._element.getBoundingClientRect()[i] + "px", v.reflow(this._element), t(this._element).addClass(fe.COLLAPSING).removeClass(fe.COLLAPSE).removeClass(fe.SHOW);
						var r = this._triggerArray.length;
						if (r > 0)
							for (var o = 0; o < r; o++) {
								var s = this._triggerArray[o],
									a = v.getSelectorFromElement(s);
								if (null !== a) t([].slice.call(document.querySelectorAll(a))).hasClass(fe.SHOW) || t(s).addClass(fe.COLLAPSED).attr("aria-expanded", !1)
							}
						this.setTransitioning(!0);
						var l = function () {
							e.setTransitioning(!1), t(e._element).removeClass(fe.COLLAPSING).addClass(fe.COLLAPSE).trigger(ce.HIDDEN)
						};
						this._element.style[i] = "";
						var u = v.getTransitionDurationFromElement(this._element);
						t(this._element).one(v.TRANSITION_END, l).emulateTransitionEnd(u)
					}
				}
			}, n.setTransitioning = function (e) {
				this._isTransitioning = e
			}, n.dispose = function () {
				t.removeData(this._element, re), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
			}, n._getConfig = function (e) {
				return (e = s({}, le, e)).toggle = Boolean(e.toggle), v.typeCheckConfig(ne, e, ue), e
			}, n._getDimension = function () {
				return t(this._element).hasClass(de.WIDTH) ? de.WIDTH : de.HEIGHT
			}, n._getParent = function () {
				var n, i = this;
				v.isElement(this._config.parent) ? (n = this._config.parent, "undefined" != typeof this._config.parent.jquery && (n = this._config.parent[0])) : n = document.querySelector(this._config.parent);
				var r = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
					o = [].slice.call(n.querySelectorAll(r));
				return t(o).each(function (t, n) {
					i._addAriaAndCollapsedClass(e._getTargetFromElement(n), [n])
				}), n
			}, n._addAriaAndCollapsedClass = function (e, n) {
				var i = t(e).hasClass(fe.SHOW);
				n.length && t(n).toggleClass(fe.COLLAPSED, !i).attr("aria-expanded", i)
			}, e._getTargetFromElement = function (e) {
				var t = v.getSelectorFromElement(e);
				return t ? document.querySelector(t) : null
			}, e._jQueryInterface = function (n) {
				return this.each(function () {
					var i = t(this),
						r = i.data(re),
						o = s({}, le, i.data(), "object" == typeof n && n ? n : {});
					if (!r && o.toggle && /show|hide/.test(n) && (o.toggle = !1), r || (r = new e(this, o), i.data(re, r)), "string" == typeof n) {
						if ("undefined" == typeof r[n]) throw new TypeError('No method named "' + n + '"');
						r[n]()
					}
				})
			}, r(e, null, [{
				key: "VERSION",
				get: function () {
					return ie
				}
			}, {
				key: "Default",
				get: function () {
					return le
				}
			}]), e
		}();
	t(document).on(ce.CLICK_DATA_API, he.DATA_TOGGLE, function (e) {
		"A" === e.currentTarget.tagName && e.preventDefault();
		var n = t(this),
			i = v.getSelectorFromElement(this),
			r = [].slice.call(document.querySelectorAll(i));
		t(r).each(function () {
			var e = t(this),
				i = e.data(re) ? "toggle" : n.data();
			pe._jQueryInterface.call(e, i)
		})
	}), t.fn[ne] = pe._jQueryInterface, t.fn[ne].Constructor = pe, t.fn[ne].noConflict = function () {
		return t.fn[ne] = ae, pe._jQueryInterface
	};
	var ge = "dropdown",
		me = "4.3.1",
		ve = "bs.dropdown",
		ye = "." + ve,
		_e = ".data-api",
		be = t.fn[ge],
		Ee = 27,
		Te = 32,
		we = 9,
		Ce = 38,
		Se = 40,
		xe = 3,
		Ae = new RegExp(Ce + "|" + Se + "|" + Ee),
		De = {
			HIDE: "hide" + ye,
			HIDDEN: "hidden" + ye,
			SHOW: "show" + ye,
			SHOWN: "shown" + ye,
			CLICK: "click" + ye,
			CLICK_DATA_API: "click" + ye + _e,
			KEYDOWN_DATA_API: "keydown" + ye + _e,
			KEYUP_DATA_API: "keyup" + ye + _e
		},
		Oe = {
			DISABLED: "disabled",
			SHOW: "show",
			DROPUP: "dropup",
			DROPRIGHT: "dropright",
			DROPLEFT: "dropleft",
			MENURIGHT: "dropdown-menu-right",
			MENULEFT: "dropdown-menu-left",
			POSITION_STATIC: "position-static"
		},
		Ne = {
			DATA_TOGGLE: '[data-toggle="dropdown"]',
			FORM_CHILD: ".dropdown form",
			MENU: ".dropdown-menu",
			NAVBAR_NAV: ".navbar-nav",
			VISIBLE_ITEMS: ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"
		},
		Ie = {
			TOP: "top-start",
			TOPEND: "top-end",
			BOTTOM: "bottom-start",
			BOTTOMEND: "bottom-end",
			RIGHT: "right-start",
			RIGHTEND: "right-end",
			LEFT: "left-start",
			LEFTEND: "left-end"
		},
		Le = {
			offset: 0,
			flip: !0,
			boundary: "scrollParent",
			reference: "toggle",
			display: "dynamic"
		},
		Pe = {
			offset: "(number|string|function)",
			flip: "boolean",
			boundary: "(string|element)",
			reference: "(string|element)",
			display: "string"
		},
		Re = function () {
			function e(e, t) {
				this._element = e, this._popper = null, this._config = this._getConfig(t), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
			}
			var i = e.prototype;
			return i.toggle = function () {
				if (!this._element.disabled && !t(this._element).hasClass(Oe.DISABLED)) {
					var i = e._getParentFromElement(this._element),
						r = t(this._menu).hasClass(Oe.SHOW);
					if (e._clearMenus(), !r) {
						var o = {
								relatedTarget: this._element
							},
							s = t.Event(De.SHOW, o);
						if (t(i).trigger(s), !s.isDefaultPrevented()) {
							if (!this._inNavbar) {
								if (void 0 === n) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");
								var a = this._element;
								"parent" === this._config.reference ? a = i : v.isElement(this._config.reference) && (a = this._config.reference, "undefined" != typeof this._config.reference.jquery && (a = this._config.reference[0])), "scrollParent" !== this._config.boundary && t(i).addClass(Oe.POSITION_STATIC), this._popper = new n(a, this._menu, this._getPopperConfig())
							}
							"ontouchstart" in document.documentElement && 0 === t(i).closest(Ne.NAVBAR_NAV).length && t(document.body).children().on("mouseover", null, t.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), t(this._menu).toggleClass(Oe.SHOW), t(i).toggleClass(Oe.SHOW).trigger(t.Event(De.SHOWN, o))
						}
					}
				}
			}, i.show = function () {
				if (!(this._element.disabled || t(this._element).hasClass(Oe.DISABLED) || t(this._menu).hasClass(Oe.SHOW))) {
					var n = {
							relatedTarget: this._element
						},
						i = t.Event(De.SHOW, n),
						r = e._getParentFromElement(this._element);
					t(r).trigger(i), i.isDefaultPrevented() || (t(this._menu).toggleClass(Oe.SHOW), t(r).toggleClass(Oe.SHOW).trigger(t.Event(De.SHOWN, n)))
				}
			}, i.hide = function () {
				if (!this._element.disabled && !t(this._element).hasClass(Oe.DISABLED) && t(this._menu).hasClass(Oe.SHOW)) {
					var n = {
							relatedTarget: this._element
						},
						i = t.Event(De.HIDE, n),
						r = e._getParentFromElement(this._element);
					t(r).trigger(i), i.isDefaultPrevented() || (t(this._menu).toggleClass(Oe.SHOW), t(r).toggleClass(Oe.SHOW).trigger(t.Event(De.HIDDEN, n)))
				}
			}, i.dispose = function () {
				t.removeData(this._element, ve), t(this._element).off(ye), this._element = null, this._menu = null, null !== this._popper && (this._popper.destroy(), this._popper = null)
			}, i.update = function () {
				this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
			}, i._addEventListeners = function () {
				var e = this;
				t(this._element).on(De.CLICK, function (t) {
					t.preventDefault(), t.stopPropagation(), e.toggle()
				})
			}, i._getConfig = function (e) {
				return e = s({}, this.constructor.Default, t(this._element).data(), e), v.typeCheckConfig(ge, e, this.constructor.DefaultType), e
			}, i._getMenuElement = function () {
				if (!this._menu) {
					var t = e._getParentFromElement(this._element);
					t && (this._menu = t.querySelector(Ne.MENU))
				}
				return this._menu
			}, i._getPlacement = function () {
				var e = t(this._element.parentNode),
					n = Ie.BOTTOM;
				return e.hasClass(Oe.DROPUP) ? (n = Ie.TOP, t(this._menu).hasClass(Oe.MENURIGHT) && (n = Ie.TOPEND)) : e.hasClass(Oe.DROPRIGHT) ? n = Ie.RIGHT : e.hasClass(Oe.DROPLEFT) ? n = Ie.LEFT : t(this._menu).hasClass(Oe.MENURIGHT) && (n = Ie.BOTTOMEND), n
			}, i._detectNavbar = function () {
				return t(this._element).closest(".navbar").length > 0
			}, i._getOffset = function () {
				var e = this,
					t = {};
				return "function" == typeof this._config.offset ? t.fn = function (t) {
					return t.offsets = s({}, t.offsets, e._config.offset(t.offsets, e._element) || {}), t
				} : t.offset = this._config.offset, t
			}, i._getPopperConfig = function () {
				var e = {
					placement: this._getPlacement(),
					modifiers: {
						offset: this._getOffset(),
						flip: {
							enabled: this._config.flip
						},
						preventOverflow: {
							boundariesElement: this._config.boundary
						}
					}
				};
				return "static" === this._config.display && (e.modifiers.applyStyle = {
					enabled: !1
				}), e
			}, e._jQueryInterface = function (n) {
				return this.each(function () {
					var i = t(this).data(ve);
					if (i || (i = new e(this, "object" == typeof n ? n : null), t(this).data(ve, i)), "string" == typeof n) {
						if ("undefined" == typeof i[n]) throw new TypeError('No method named "' + n + '"');
						i[n]()
					}
				})
			}, e._clearMenus = function (n) {
				if (!n || n.which !== xe && ("keyup" !== n.type || n.which === we))
					for (var i = [].slice.call(document.querySelectorAll(Ne.DATA_TOGGLE)), r = 0, o = i.length; r < o; r++) {
						var s = e._getParentFromElement(i[r]),
							a = t(i[r]).data(ve),
							l = {
								relatedTarget: i[r]
							};
						if (n && "click" === n.type && (l.clickEvent = n), a) {
							var u = a._menu;
							if (t(s).hasClass(Oe.SHOW) && !(n && ("click" === n.type && /input|textarea/i.test(n.target.tagName) || "keyup" === n.type && n.which === we) && t.contains(s, n.target))) {
								var c = t.Event(De.HIDE, l);
								t(s).trigger(c), c.isDefaultPrevented() || ("ontouchstart" in document.documentElement && t(document.body).children().off("mouseover", null, t.noop), i[r].setAttribute("aria-expanded", "false"), t(u).removeClass(Oe.SHOW), t(s).removeClass(Oe.SHOW).trigger(t.Event(De.HIDDEN, l)))
							}
						}
					}
			}, e._getParentFromElement = function (e) {
				var t, n = v.getSelectorFromElement(e);
				return n && (t = document.querySelector(n)), t || e.parentNode
			}, e._dataApiKeydownHandler = function (n) {
				if ((/input|textarea/i.test(n.target.tagName) ? !(n.which === Te || n.which !== Ee && (n.which !== Se && n.which !== Ce || t(n.target).closest(Ne.MENU).length)) : Ae.test(n.which)) && (n.preventDefault(), n.stopPropagation(), !this.disabled && !t(this).hasClass(Oe.DISABLED))) {
					var i = e._getParentFromElement(this),
						r = t(i).hasClass(Oe.SHOW);
					if (r && (!r || n.which !== Ee && n.which !== Te)) {
						var o = [].slice.call(i.querySelectorAll(Ne.VISIBLE_ITEMS));
						if (0 !== o.length) {
							var s = o.indexOf(n.target);
							n.which === Ce && s > 0 && s--, n.which === Se && s < o.length - 1 && s++, s < 0 && (s = 0), o[s].focus()
						}
					} else {
						if (n.which === Ee) {
							var a = i.querySelector(Ne.DATA_TOGGLE);
							t(a).trigger("focus")
						}
						t(this).trigger("click")
					}
				}
			}, r(e, null, [{
				key: "VERSION",
				get: function () {
					return me
				}
			}, {
				key: "Default",
				get: function () {
					return Le
				}
			}, {
				key: "DefaultType",
				get: function () {
					return Pe
				}
			}]), e
		}();
	t(document).on(De.KEYDOWN_DATA_API, Ne.DATA_TOGGLE, Re._dataApiKeydownHandler).on(De.KEYDOWN_DATA_API, Ne.MENU, Re._dataApiKeydownHandler).on(De.CLICK_DATA_API + " " + De.KEYUP_DATA_API, Re._clearMenus).on(De.CLICK_DATA_API, Ne.DATA_TOGGLE, function (e) {
		e.preventDefault(), e.stopPropagation(), Re._jQueryInterface.call(t(this), "toggle")
	}).on(De.CLICK_DATA_API, Ne.FORM_CHILD, function (e) {
		e.stopPropagation()
	}), t.fn[ge] = Re._jQueryInterface, t.fn[ge].Constructor = Re, t.fn[ge].noConflict = function () {
		return t.fn[ge] = be, Re._jQueryInterface
	};
	var ke = "modal",
		He = "4.3.1",
		je = "bs.modal",
		Me = "." + je,
		We = ".data-api",
		Fe = t.fn[ke],
		qe = 27,
		Ue = {
			backdrop: !0,
			keyboard: !0,
			focus: !0,
			show: !0
		},
		$e = {
			backdrop: "(boolean|string)",
			keyboard: "boolean",
			focus: "boolean",
			show: "boolean"
		},
		Be = {
			HIDE: "hide" + Me,
			HIDDEN: "hidden" + Me,
			SHOW: "show" + Me,
			SHOWN: "shown" + Me,
			FOCUSIN: "focusin" + Me,
			RESIZE: "resize" + Me,
			CLICK_DISMISS: "click.dismiss" + Me,
			KEYDOWN_DISMISS: "keydown.dismiss" + Me,
			MOUSEUP_DISMISS: "mouseup.dismiss" + Me,
			MOUSEDOWN_DISMISS: "mousedown.dismiss" + Me,
			CLICK_DATA_API: "click" + Me + We
		},
		Ve = {
			SCROLLABLE: "modal-dialog-scrollable",
			SCROLLBAR_MEASURER: "modal-scrollbar-measure",
			BACKDROP: "modal-backdrop",
			OPEN: "modal-open",
			FADE: "fade",
			SHOW: "show"
		},
		Ge = {
			DIALOG: ".modal-dialog",
			MODAL_BODY: ".modal-body",
			DATA_TOGGLE: '[data-toggle="modal"]',
			DATA_DISMISS: '[data-dismiss="modal"]',
			FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
			STICKY_CONTENT: ".sticky-top"
		},
		Ke = function () {
			function e(e, t) {
				this._config = this._getConfig(t), this._element = e, this._dialog = e.querySelector(Ge.DIALOG), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0
			}
			var n = e.prototype;
			return n.toggle = function (e) {
				return this._isShown ? this.hide() : this.show(e)
			}, n.show = function (e) {
				var n = this;
				if (!this._isShown && !this._isTransitioning) {
					t(this._element).hasClass(Ve.FADE) && (this._isTransitioning = !0);
					var i = t.Event(Be.SHOW, {
						relatedTarget: e
					});
					t(this._element).trigger(i), this._isShown || i.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), t(this._element).on(Be.CLICK_DISMISS, Ge.DATA_DISMISS, function (e) {
						return n.hide(e)
					}), t(this._dialog).on(Be.MOUSEDOWN_DISMISS, function () {
						t(n._element).one(Be.MOUSEUP_DISMISS, function (e) {
							t(e.target).is(n._element) && (n._ignoreBackdropClick = !0)
						})
					}), this._showBackdrop(function () {
						return n._showElement(e)
					}))
				}
			}, n.hide = function (e) {
				var n = this;
				if (e && e.preventDefault(), this._isShown && !this._isTransitioning) {
					var i = t.Event(Be.HIDE);
					if (t(this._element).trigger(i), this._isShown && !i.isDefaultPrevented()) {
						this._isShown = !1;
						var r = t(this._element).hasClass(Ve.FADE);
						if (r && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), t(document).off(Be.FOCUSIN), t(this._element).removeClass(Ve.SHOW), t(this._element).off(Be.CLICK_DISMISS), t(this._dialog).off(Be.MOUSEDOWN_DISMISS), r) {
							var o = v.getTransitionDurationFromElement(this._element);
							t(this._element).one(v.TRANSITION_END, function (e) {
								return n._hideModal(e)
							}).emulateTransitionEnd(o)
						} else this._hideModal()
					}
				}
			}, n.dispose = function () {
				[window, this._element, this._dialog].forEach(function (e) {
					return t(e).off(Me)
				}), t(document).off(Be.FOCUSIN), t.removeData(this._element, je), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null
			}, n.handleUpdate = function () {
				this._adjustDialog()
			}, n._getConfig = function (e) {
				return e = s({}, Ue, e), v.typeCheckConfig(ke, e, $e), e
			}, n._showElement = function (e) {
				var n = this,
					i = t(this._element).hasClass(Ve.FADE);
				this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), t(this._dialog).hasClass(Ve.SCROLLABLE) ? this._dialog.querySelector(Ge.MODAL_BODY).scrollTop = 0 : this._element.scrollTop = 0, i && v.reflow(this._element), t(this._element).addClass(Ve.SHOW), this._config.focus && this._enforceFocus();
				var r = t.Event(Be.SHOWN, {
						relatedTarget: e
					}),
					o = function () {
						n._config.focus && n._element.focus(), n._isTransitioning = !1, t(n._element).trigger(r)
					};
				if (i) {
					var s = v.getTransitionDurationFromElement(this._dialog);
					t(this._dialog).one(v.TRANSITION_END, o).emulateTransitionEnd(s)
				} else o()
			}, n._enforceFocus = function () {
				var e = this;
				t(document).off(Be.FOCUSIN).on(Be.FOCUSIN, function (n) {
					document !== n.target && e._element !== n.target && 0 === t(e._element).has(n.target).length && e._element.focus()
				})
			}, n._setEscapeEvent = function () {
				var e = this;
				this._isShown && this._config.keyboard ? t(this._element).on(Be.KEYDOWN_DISMISS, function (t) {
					t.which === qe && (t.preventDefault(), e.hide())
				}) : this._isShown || t(this._element).off(Be.KEYDOWN_DISMISS)
			}, n._setResizeEvent = function () {
				var e = this;
				this._isShown ? t(window).on(Be.RESIZE, function (t) {
					return e.handleUpdate(t)
				}) : t(window).off(Be.RESIZE)
			}, n._hideModal = function () {
				var e = this;
				this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._isTransitioning = !1, this._showBackdrop(function () {
					t(document.body).removeClass(Ve.OPEN), e._resetAdjustments(), e._resetScrollbar(), t(e._element).trigger(Be.HIDDEN)
				})
			}, n._removeBackdrop = function () {
				this._backdrop && (t(this._backdrop).remove(), this._backdrop = null)
			}, n._showBackdrop = function (e) {
				var n = this,
					i = t(this._element).hasClass(Ve.FADE) ? Ve.FADE : "";
				if (this._isShown && this._config.backdrop) {
					if (this._backdrop = document.createElement("div"), this._backdrop.className = Ve.BACKDROP, i && this._backdrop.classList.add(i), t(this._backdrop).appendTo(document.body), t(this._element).on(Be.CLICK_DISMISS, function (e) {
						n._ignoreBackdropClick ? n._ignoreBackdropClick = !1 : e.target === e.currentTarget && ("static" === n._config.backdrop ? n._element.focus() : n.hide())
					}), i && v.reflow(this._backdrop), t(this._backdrop).addClass(Ve.SHOW), !e) return;
					if (!i) return void e();
					var r = v.getTransitionDurationFromElement(this._backdrop);
					t(this._backdrop).one(v.TRANSITION_END, e).emulateTransitionEnd(r)
				} else if (!this._isShown && this._backdrop) {
					t(this._backdrop).removeClass(Ve.SHOW);
					var o = function () {
						n._removeBackdrop(), e && e()
					};
					if (t(this._element).hasClass(Ve.FADE)) {
						var s = v.getTransitionDurationFromElement(this._backdrop);
						t(this._backdrop).one(v.TRANSITION_END, o).emulateTransitionEnd(s)
					} else o()
				} else e && e()
			}, n._adjustDialog = function () {
				var e = this._element.scrollHeight > document.documentElement.clientHeight;
				!this._isBodyOverflowing && e && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !e && (this._element.style.paddingRight = this._scrollbarWidth + "px")
			}, n._resetAdjustments = function () {
				this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
			}, n._checkScrollbar = function () {
				var e = document.body.getBoundingClientRect();
				this._isBodyOverflowing = e.left + e.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
			}, n._setScrollbar = function () {
				var e = this;
				if (this._isBodyOverflowing) {
					var n = [].slice.call(document.querySelectorAll(Ge.FIXED_CONTENT)),
						i = [].slice.call(document.querySelectorAll(Ge.STICKY_CONTENT));
					t(n).each(function (n, i) {
						var r = i.style.paddingRight,
							o = t(i).css("padding-right");
						t(i).data("padding-right", r).css("padding-right", parseFloat(o) + e._scrollbarWidth + "px")
					}), t(i).each(function (n, i) {
						var r = i.style.marginRight,
							o = t(i).css("margin-right");
						t(i).data("margin-right", r).css("margin-right", parseFloat(o) - e._scrollbarWidth + "px")
					});
					var r = document.body.style.paddingRight,
						o = t(document.body).css("padding-right");
					t(document.body).data("padding-right", r).css("padding-right", parseFloat(o) + this._scrollbarWidth + "px")
				}
				t(document.body).addClass(Ve.OPEN)
			}, n._resetScrollbar = function () {
				var e = [].slice.call(document.querySelectorAll(Ge.FIXED_CONTENT));
				t(e).each(function (e, n) {
					var i = t(n).data("padding-right");
					t(n).removeData("padding-right"), n.style.paddingRight = i || ""
				});
				var n = [].slice.call(document.querySelectorAll("" + Ge.STICKY_CONTENT));
				t(n).each(function (e, n) {
					var i = t(n).data("margin-right");
					void 0 !== i && t(n).css("margin-right", i).removeData("margin-right")
				});
				var i = t(document.body).data("padding-right");
				t(document.body).removeData("padding-right"), document.body.style.paddingRight = i || ""
			}, n._getScrollbarWidth = function () {
				var e = document.createElement("div");
				e.className = Ve.SCROLLBAR_MEASURER, document.body.appendChild(e);
				var t = e.getBoundingClientRect().width - e.clientWidth;
				return document.body.removeChild(e), t
			}, e._jQueryInterface = function (n, i) {
				return this.each(function () {
					var r = t(this).data(je),
						o = s({}, Ue, t(this).data(), "object" == typeof n && n ? n : {});
					if (r || (r = new e(this, o), t(this).data(je, r)), "string" == typeof n) {
						if ("undefined" == typeof r[n]) throw new TypeError('No method named "' + n + '"');
						r[n](i)
					} else o.show && r.show(i)
				})
			}, r(e, null, [{
				key: "VERSION",
				get: function () {
					return He
				}
			}, {
				key: "Default",
				get: function () {
					return Ue
				}
			}]), e
		}();
	t(document).on(Be.CLICK_DATA_API, Ge.DATA_TOGGLE, function (e) {
		var n, i = this,
			r = v.getSelectorFromElement(this);
		r && (n = document.querySelector(r));
		var o = t(n).data(je) ? "toggle" : s({}, t(n).data(), t(this).data());
		"A" !== this.tagName && "AREA" !== this.tagName || e.preventDefault();
		var a = t(n).one(Be.SHOW, function (e) {
			e.isDefaultPrevented() || a.one(Be.HIDDEN, function () {
				t(i).is(":visible") && i.focus()
			})
		});
		Ke._jQueryInterface.call(t(n), o, this)
	}), t.fn[ke] = Ke._jQueryInterface, t.fn[ke].Constructor = Ke, t.fn[ke].noConflict = function () {
		return t.fn[ke] = Fe, Ke._jQueryInterface
	};
	var ze = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
		Ye = {
			"*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
			a: ["target", "href", "title", "rel"],
			area: [],
			b: [],
			br: [],
			col: [],
			code: [],
			div: [],
			em: [],
			hr: [],
			h1: [],
			h2: [],
			h3: [],
			h4: [],
			h5: [],
			h6: [],
			i: [],
			img: ["src", "alt", "title", "width", "height"],
			li: [],
			ol: [],
			p: [],
			pre: [],
			s: [],
			small: [],
			span: [],
			sub: [],
			sup: [],
			strong: [],
			u: [],
			ul: []
		},
		Qe = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
		Xe = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i,
		Je = "tooltip",
		Ze = "4.3.1",
		et = "bs.tooltip",
		tt = "." + et,
		nt = t.fn[Je],
		it = "bs-tooltip",
		rt = new RegExp("(^|\\s)" + it + "\\S+", "g"),
		ot = ["sanitize", "whiteList", "sanitizeFn"],
		st = {
			animation: "boolean",
			template: "string",
			title: "(string|element|function)",
			trigger: "string",
			delay: "(number|object)",
			html: "boolean",
			selector: "(string|boolean)",
			placement: "(string|function)",
			offset: "(number|string|function)",
			container: "(string|element|boolean)",
			fallbackPlacement: "(string|array)",
			boundary: "(string|element)",
			sanitize: "boolean",
			sanitizeFn: "(null|function)",
			whiteList: "object"
		},
		at = {
			AUTO: "auto",
			TOP: "top",
			RIGHT: "right",
			BOTTOM: "bottom",
			LEFT: "left"
		},
		lt = {
			animation: !0,
			template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
			trigger: "hover focus",
			title: "",
			delay: 0,
			html: !1,
			selector: !1,
			placement: "top",
			offset: 0,
			container: !1,
			fallbackPlacement: "flip",
			boundary: "scrollParent",
			sanitize: !0,
			sanitizeFn: null,
			whiteList: Ye
		},
		ut = {
			SHOW: "show",
			OUT: "out"
		},
		ct = {
			HIDE: "hide" + tt,
			HIDDEN: "hidden" + tt,
			SHOW: "show" + tt,
			SHOWN: "shown" + tt,
			INSERTED: "inserted" + tt,
			CLICK: "click" + tt,
			FOCUSIN: "focusin" + tt,
			FOCUSOUT: "focusout" + tt,
			MOUSEENTER: "mouseenter" + tt,
			MOUSELEAVE: "mouseleave" + tt
		},
		ft = {
			FADE: "fade",
			SHOW: "show"
		},
		dt = {
			TOOLTIP: ".tooltip",
			TOOLTIP_INNER: ".tooltip-inner",
			ARROW: ".arrow"
		},
		ht = {
			HOVER: "hover",
			FOCUS: "focus",
			CLICK: "click",
			MANUAL: "manual"
		},
		pt = function () {
			function e(e, t) {
				if (void 0 === n) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
				this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = e, this.config = this._getConfig(t), this.tip = null, this._setListeners()
			}
			var i = e.prototype;
			return i.enable = function () {
				this._isEnabled = !0
			}, i.disable = function () {
				this._isEnabled = !1
			}, i.toggleEnabled = function () {
				this._isEnabled = !this._isEnabled
			}, i.toggle = function (e) {
				if (this._isEnabled)
					if (e) {
						var n = this.constructor.DATA_KEY,
							i = t(e.currentTarget).data(n);
						i || (i = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(n, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i)
					} else {
						if (t(this.getTipElement()).hasClass(ft.SHOW)) return void this._leave(null, this);
						this._enter(null, this)
					}
			}, i.dispose = function () {
				clearTimeout(this._timeout), t.removeData(this.element, this.constructor.DATA_KEY), t(this.element).off(this.constructor.EVENT_KEY), t(this.element).closest(".modal").off("hide.bs.modal"), this.tip && t(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, null !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
			}, i.show = function () {
				var e = this;
				if ("none" === t(this.element).css("display")) throw new Error("Please use show on visible elements");
				var i = t.Event(this.constructor.Event.SHOW);
				if (this.isWithContent() && this._isEnabled) {
					t(this.element).trigger(i);
					var r = v.findShadowRoot(this.element),
						o = t.contains(null !== r ? r : this.element.ownerDocument.documentElement, this.element);
					if (i.isDefaultPrevented() || !o) return;
					var s = this.getTipElement(),
						a = v.getUID(this.constructor.NAME);
					s.setAttribute("id", a), this.element.setAttribute("aria-describedby", a), this.setContent(), this.config.animation && t(s).addClass(ft.FADE);
					var l = "function" == typeof this.config.placement ? this.config.placement.call(this, s, this.element) : this.config.placement,
						u = this._getAttachment(l);
					this.addAttachmentClass(u);
					var c = this._getContainer();
					t(s).data(this.constructor.DATA_KEY, this), t.contains(this.element.ownerDocument.documentElement, this.tip) || t(s).appendTo(c), t(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new n(this.element, s, {
						placement: u,
						modifiers: {
							offset: this._getOffset(),
							flip: {
								behavior: this.config.fallbackPlacement
							},
							arrow: {
								element: dt.ARROW
							},
							preventOverflow: {
								boundariesElement: this.config.boundary
							}
						},
						onCreate: function (t) {
							t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
						},
						onUpdate: function (t) {
							return e._handlePopperPlacementChange(t)
						}
					}), t(s).addClass(ft.SHOW), "ontouchstart" in document.documentElement && t(document.body).children().on("mouseover", null, t.noop);
					var f = function () {
						e.config.animation && e._fixTransition();
						var n = e._hoverState;
						e._hoverState = null, t(e.element).trigger(e.constructor.Event.SHOWN), n === ut.OUT && e._leave(null, e)
					};
					if (t(this.tip).hasClass(ft.FADE)) {
						var d = v.getTransitionDurationFromElement(this.tip);
						t(this.tip).one(v.TRANSITION_END, f).emulateTransitionEnd(d)
					} else f()
				}
			}, i.hide = function (e) {
				var n = this,
					i = this.getTipElement(),
					r = t.Event(this.constructor.Event.HIDE),
					o = function () {
						n._hoverState !== ut.SHOW && i.parentNode && i.parentNode.removeChild(i), n._cleanTipClass(), n.element.removeAttribute("aria-describedby"), t(n.element).trigger(n.constructor.Event.HIDDEN), null !== n._popper && n._popper.destroy(), e && e()
					};
				if (t(this.element).trigger(r), !r.isDefaultPrevented()) {
					if (t(i).removeClass(ft.SHOW), "ontouchstart" in document.documentElement && t(document.body).children().off("mouseover", null, t.noop), this._activeTrigger[ht.CLICK] = !1, this._activeTrigger[ht.FOCUS] = !1, this._activeTrigger[ht.HOVER] = !1, t(this.tip).hasClass(ft.FADE)) {
						var s = v.getTransitionDurationFromElement(i);
						t(i).one(v.TRANSITION_END, o).emulateTransitionEnd(s)
					} else o();
					this._hoverState = ""
				}
			}, i.update = function () {
				null !== this._popper && this._popper.scheduleUpdate()
			}, i.isWithContent = function () {
				return Boolean(this.getTitle())
			}, i.addAttachmentClass = function (e) {
				t(this.getTipElement()).addClass(it + "-" + e)
			}, i.getTipElement = function () {
				return this.tip = this.tip || t(this.config.template)[0], this.tip
			}, i.setContent = function () {
				var e = this.getTipElement();
				this.setElementContent(t(e.querySelectorAll(dt.TOOLTIP_INNER)), this.getTitle()), t(e).removeClass(ft.FADE + " " + ft.SHOW)
			}, i.setElementContent = function (e, n) {
				"object" != typeof n || !n.nodeType && !n.jquery ? this.config.html ? (this.config.sanitize && (n = h(n, this.config.whiteList, this.config.sanitizeFn)), e.html(n)) : e.text(n) : this.config.html ? t(n).parent().is(e) || e.empty().append(n) : e.text(t(n).text())
			}, i.getTitle = function () {
				var e = this.element.getAttribute("data-original-title");
				return e || (e = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), e
			}, i._getOffset = function () {
				var e = this,
					t = {};
				return "function" == typeof this.config.offset ? t.fn = function (t) {
					return t.offsets = s({}, t.offsets, e.config.offset(t.offsets, e.element) || {}), t
				} : t.offset = this.config.offset, t
			}, i._getContainer = function () {
				return !1 === this.config.container ? document.body : v.isElement(this.config.container) ? t(this.config.container) : t(document).find(this.config.container)
			}, i._getAttachment = function (e) {
				return at[e.toUpperCase()]
			}, i._setListeners = function () {
				var e = this;
				this.config.trigger.split(" ").forEach(function (n) {
					if ("click" === n) t(e.element).on(e.constructor.Event.CLICK, e.config.selector, function (t) {
						return e.toggle(t)
					});
					else if (n !== ht.MANUAL) {
						var i = n === ht.HOVER ? e.constructor.Event.MOUSEENTER : e.constructor.Event.FOCUSIN,
							r = n === ht.HOVER ? e.constructor.Event.MOUSELEAVE : e.constructor.Event.FOCUSOUT;
						t(e.element).on(i, e.config.selector, function (t) {
							return e._enter(t)
						}).on(r, e.config.selector, function (t) {
							return e._leave(t)
						})
					}
				}), t(this.element).closest(".modal").on("hide.bs.modal", function () {
					e.element && e.hide()
				}), this.config.selector ? this.config = s({}, this.config, {
					trigger: "manual",
					selector: ""
				}) : this._fixTitle()
			}, i._fixTitle = function () {
				var e = typeof this.element.getAttribute("data-original-title");
				(this.element.getAttribute("title") || "string" !== e) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
			}, i._enter = function (e, n) {
				var i = this.constructor.DATA_KEY;
				(n = n || t(e.currentTarget).data(i)) || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), e && (n._activeTrigger["focusin" === e.type ? ht.FOCUS : ht.HOVER] = !0), t(n.getTipElement()).hasClass(ft.SHOW) || n._hoverState === ut.SHOW ? n._hoverState = ut.SHOW : (clearTimeout(n._timeout), n._hoverState = ut.SHOW, n.config.delay && n.config.delay.show ? n._timeout = setTimeout(function () {
					n._hoverState === ut.SHOW && n.show()
				}, n.config.delay.show) : n.show())
			}, i._leave = function (e, n) {
				var i = this.constructor.DATA_KEY;
				(n = n || t(e.currentTarget).data(i)) || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), e && (n._activeTrigger["focusout" === e.type ? ht.FOCUS : ht.HOVER] = !1), n._isWithActiveTrigger() || (clearTimeout(n._timeout), n._hoverState = ut.OUT, n.config.delay && n.config.delay.hide ? n._timeout = setTimeout(function () {
					n._hoverState === ut.OUT && n.hide()
				}, n.config.delay.hide) : n.hide())
			}, i._isWithActiveTrigger = function () {
				for (var e in this._activeTrigger)
					if (this._activeTrigger[e]) return !0;
				return !1
			}, i._getConfig = function (e) {
				var n = t(this.element).data();
				return Object.keys(n).forEach(function (e) {
					-1 !== ot.indexOf(e) && delete n[e]
				}), "number" == typeof (e = s({}, this.constructor.Default, n, "object" == typeof e && e ? e : {})).delay && (e.delay = {
					show: e.delay,
					hide: e.delay
				}), "number" == typeof e.title && (e.title = e.title.toString()), "number" == typeof e.content && (e.content = e.content.toString()), v.typeCheckConfig(Je, e, this.constructor.DefaultType), e.sanitize && (e.template = h(e.template, e.whiteList, e.sanitizeFn)), e
			}, i._getDelegateConfig = function () {
				var e = {};
				if (this.config)
					for (var t in this.config) this.constructor.Default[t] !== this.config[t] && (e[t] = this.config[t]);
				return e
			}, i._cleanTipClass = function () {
				var e = t(this.getTipElement()),
					n = e.attr("class").match(rt);
				null !== n && n.length && e.removeClass(n.join(""))
			}, i._handlePopperPlacementChange = function (e) {
				var t = e.instance;
				this.tip = t.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(e.placement))
			}, i._fixTransition = function () {
				var e = this.getTipElement(),
					n = this.config.animation;
				null === e.getAttribute("x-placement") && (t(e).removeClass(ft.FADE), this.config.animation = !1, this.hide(), this.show(), this.config.animation = n)
			}, e._jQueryInterface = function (n) {
				return this.each(function () {
					var i = t(this).data(et),
						r = "object" == typeof n && n;
					if ((i || !/dispose|hide/.test(n)) && (i || (i = new e(this, r), t(this).data(et, i)), "string" == typeof n)) {
						if ("undefined" == typeof i[n]) throw new TypeError('No method named "' + n + '"');
						i[n]()
					}
				})
			}, r(e, null, [{
				key: "VERSION",
				get: function () {
					return Ze
				}
			}, {
				key: "Default",
				get: function () {
					return lt
				}
			}, {
				key: "NAME",
				get: function () {
					return Je
				}
			}, {
				key: "DATA_KEY",
				get: function () {
					return et
				}
			}, {
				key: "Event",
				get: function () {
					return ct
				}
			}, {
				key: "EVENT_KEY",
				get: function () {
					return tt
				}
			}, {
				key: "DefaultType",
				get: function () {
					return st
				}
			}]), e
		}();
	t.fn[Je] = pt._jQueryInterface, t.fn[Je].Constructor = pt, t.fn[Je].noConflict = function () {
		return t.fn[Je] = nt, pt._jQueryInterface
	};
	var gt = "popover",
		mt = "4.3.1",
		vt = "bs.popover",
		yt = "." + vt,
		_t = t.fn[gt],
		bt = "bs-popover",
		Et = new RegExp("(^|\\s)" + bt + "\\S+", "g"),
		Tt = s({}, pt.Default, {
			placement: "right",
			trigger: "click",
			content: "",
			template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
		}),
		wt = s({}, pt.DefaultType, {
			content: "(string|element|function)"
		}),
		Ct = {
			FADE: "fade",
			SHOW: "show"
		},
		St = {
			TITLE: ".popover-header",
			CONTENT: ".popover-body"
		},
		xt = {
			HIDE: "hide" + yt,
			HIDDEN: "hidden" + yt,
			SHOW: "show" + yt,
			SHOWN: "shown" + yt,
			INSERTED: "inserted" + yt,
			CLICK: "click" + yt,
			FOCUSIN: "focusin" + yt,
			FOCUSOUT: "focusout" + yt,
			MOUSEENTER: "mouseenter" + yt,
			MOUSELEAVE: "mouseleave" + yt
		},
		At = function (e) {
			function n() {
				return e.apply(this, arguments) || this
			}
			a(n, e);
			var i = n.prototype;
			return i.isWithContent = function () {
				return this.getTitle() || this._getContent()
			}, i.addAttachmentClass = function (e) {
				t(this.getTipElement()).addClass(bt + "-" + e)
			}, i.getTipElement = function () {
				return this.tip = this.tip || t(this.config.template)[0], this.tip
			}, i.setContent = function () {
				var e = t(this.getTipElement());
				this.setElementContent(e.find(St.TITLE), this.getTitle());
				var n = this._getContent();
				"function" == typeof n && (n = n.call(this.element)), this.setElementContent(e.find(St.CONTENT), n), e.removeClass(Ct.FADE + " " + Ct.SHOW)
			}, i._getContent = function () {
				return this.element.getAttribute("data-content") || this.config.content
			}, i._cleanTipClass = function () {
				var e = t(this.getTipElement()),
					n = e.attr("class").match(Et);
				null !== n && n.length > 0 && e.removeClass(n.join(""))
			}, n._jQueryInterface = function (e) {
				return this.each(function () {
					var i = t(this).data(vt),
						r = "object" == typeof e ? e : null;
					if ((i || !/dispose|hide/.test(e)) && (i || (i = new n(this, r), t(this).data(vt, i)), "string" == typeof e)) {
						if ("undefined" == typeof i[e]) throw new TypeError('No method named "' + e + '"');
						i[e]()
					}
				})
			}, r(n, null, [{
				key: "VERSION",
				get: function () {
					return mt
				}
			}, {
				key: "Default",
				get: function () {
					return Tt
				}
			}, {
				key: "NAME",
				get: function () {
					return gt
				}
			}, {
				key: "DATA_KEY",
				get: function () {
					return vt
				}
			}, {
				key: "Event",
				get: function () {
					return xt
				}
			}, {
				key: "EVENT_KEY",
				get: function () {
					return yt
				}
			}, {
				key: "DefaultType",
				get: function () {
					return wt
				}
			}]), n
		}(pt);
	t.fn[gt] = At._jQueryInterface, t.fn[gt].Constructor = At, t.fn[gt].noConflict = function () {
		return t.fn[gt] = _t, At._jQueryInterface
	};
	var Dt = "scrollspy",
		Ot = "4.3.1",
		Nt = "bs.scrollspy",
		It = "." + Nt,
		Lt = ".data-api",
		Pt = t.fn[Dt],
		Rt = {
			offset: 10,
			method: "auto",
			target: ""
		},
		kt = {
			offset: "number",
			method: "string",
			target: "(string|element)"
		},
		Ht = {
			ACTIVATE: "activate" + It,
			SCROLL: "scroll" + It,
			LOAD_DATA_API: "load" + It + Lt
		},
		jt = {
			DROPDOWN_ITEM: "dropdown-item",
			DROPDOWN_MENU: "dropdown-menu",
			ACTIVE: "active"
		},
		Mt = {
			DATA_SPY: '[data-spy="scroll"]',
			ACTIVE: ".active",
			NAV_LIST_GROUP: ".nav, .list-group",
			NAV_LINKS: ".nav-link",
			NAV_ITEMS: ".nav-item",
			LIST_ITEMS: ".list-group-item",
			DROPDOWN: ".dropdown",
			DROPDOWN_ITEMS: ".dropdown-item",
			DROPDOWN_TOGGLE: ".dropdown-toggle"
		},
		Wt = {
			OFFSET: "offset",
			POSITION: "position"
		},
		Ft = function () {
			function e(e, n) {
				var i = this;
				this._element = e, this._scrollElement = "BODY" === e.tagName ? window : e, this._config = this._getConfig(n), this._selector = this._config.target + " " + Mt.NAV_LINKS + "," + this._config.target + " " + Mt.LIST_ITEMS + "," + this._config.target + " " + Mt.DROPDOWN_ITEMS, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, t(this._scrollElement).on(Ht.SCROLL, function (e) {
					return i._process(e)
				}), this.refresh(), this._process()
			}
			var n = e.prototype;
			return n.refresh = function () {
				var e = this,
					n = this._scrollElement === this._scrollElement.window ? Wt.OFFSET : Wt.POSITION,
					i = "auto" === this._config.method ? n : this._config.method,
					r = i === Wt.POSITION ? this._getScrollTop() : 0;
				this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function (e) {
					var n, o = v.getSelectorFromElement(e);
					if (o && (n = document.querySelector(o)), n) {
						var s = n.getBoundingClientRect();
						if (s.width || s.height) return [t(n)[i]().top + r, o]
					}
					return null
				}).filter(function (e) {
					return e
				}).sort(function (e, t) {
					return e[0] - t[0]
				}).forEach(function (t) {
					e._offsets.push(t[0]), e._targets.push(t[1])
				})
			}, n.dispose = function () {
				t.removeData(this._element, Nt), t(this._scrollElement).off(It), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
			}, n._getConfig = function (e) {
				if ("string" != typeof (e = s({}, Rt, "object" == typeof e && e ? e : {})).target) {
					var n = t(e.target).attr("id");
					n || (n = v.getUID(Dt), t(e.target).attr("id", n)), e.target = "#" + n
				}
				return v.typeCheckConfig(Dt, e, kt), e
			}, n._getScrollTop = function () {
				return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
			}, n._getScrollHeight = function () {
				return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
			}, n._getOffsetHeight = function () {
				return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
			}, n._process = function () {
				var e = this._getScrollTop() + this._config.offset,
					t = this._getScrollHeight(),
					n = this._config.offset + t - this._getOffsetHeight();
				if (this._scrollHeight !== t && this.refresh(), e >= n) {
					var i = this._targets[this._targets.length - 1];
					this._activeTarget !== i && this._activate(i)
				} else {
					if (this._activeTarget && e < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();
					for (var r = this._offsets.length; r--;) {
						this._activeTarget !== this._targets[r] && e >= this._offsets[r] && ("undefined" == typeof this._offsets[r + 1] || e < this._offsets[r + 1]) && this._activate(this._targets[r])
					}
				}
			}, n._activate = function (e) {
				this._activeTarget = e, this._clear();
				var n = this._selector.split(",").map(function (t) {
						return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
					}),
					i = t([].slice.call(document.querySelectorAll(n.join(","))));
				i.hasClass(jt.DROPDOWN_ITEM) ? (i.closest(Mt.DROPDOWN).find(Mt.DROPDOWN_TOGGLE).addClass(jt.ACTIVE), i.addClass(jt.ACTIVE)) : (i.addClass(jt.ACTIVE), i.parents(Mt.NAV_LIST_GROUP).prev(Mt.NAV_LINKS + ", " + Mt.LIST_ITEMS).addClass(jt.ACTIVE), i.parents(Mt.NAV_LIST_GROUP).prev(Mt.NAV_ITEMS).children(Mt.NAV_LINKS).addClass(jt.ACTIVE)), t(this._scrollElement).trigger(Ht.ACTIVATE, {
					relatedTarget: e
				})
			}, n._clear = function () {
				[].slice.call(document.querySelectorAll(this._selector)).filter(function (e) {
					return e.classList.contains(jt.ACTIVE)
				}).forEach(function (e) {
					return e.classList.remove(jt.ACTIVE)
				})
			}, e._jQueryInterface = function (n) {
				return this.each(function () {
					var i = t(this).data(Nt);
					if (i || (i = new e(this, "object" == typeof n && n), t(this).data(Nt, i)), "string" == typeof n) {
						if ("undefined" == typeof i[n]) throw new TypeError('No method named "' + n + '"');
						i[n]()
					}
				})
			}, r(e, null, [{
				key: "VERSION",
				get: function () {
					return Ot
				}
			}, {
				key: "Default",
				get: function () {
					return Rt
				}
			}]), e
		}();
	t(window).on(Ht.LOAD_DATA_API, function () {
		for (var e = [].slice.call(document.querySelectorAll(Mt.DATA_SPY)), n = e.length; n--;) {
			var i = t(e[n]);
			Ft._jQueryInterface.call(i, i.data())
		}
	}), t.fn[Dt] = Ft._jQueryInterface, t.fn[Dt].Constructor = Ft, t.fn[Dt].noConflict = function () {
		return t.fn[Dt] = Pt, Ft._jQueryInterface
	};
	var qt = "tab",
		Ut = "4.3.1",
		$t = "bs.tab",
		Bt = "." + $t,
		Vt = ".data-api",
		Gt = t.fn[qt],
		Kt = {
			HIDE: "hide" + Bt,
			HIDDEN: "hidden" + Bt,
			SHOW: "show" + Bt,
			SHOWN: "shown" + Bt,
			CLICK_DATA_API: "click" + Bt + Vt
		},
		zt = {
			DROPDOWN_MENU: "dropdown-menu",
			ACTIVE: "active",
			DISABLED: "disabled",
			FADE: "fade",
			SHOW: "show"
		},
		Yt = {
			DROPDOWN: ".dropdown",
			NAV_LIST_GROUP: ".nav, .list-group",
			ACTIVE: ".active",
			ACTIVE_UL: "> li > .active",
			DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
			DROPDOWN_TOGGLE: ".dropdown-toggle",
			DROPDOWN_ACTIVE_CHILD: "> .dropdown-menu .active"
		},
		Qt = function () {
			function e(e) {
				this._element = e
			}
			var n = e.prototype;
			return n.show = function () {
				var e = this;
				if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && t(this._element).hasClass(zt.ACTIVE) || t(this._element).hasClass(zt.DISABLED))) {
					var n, i, r = t(this._element).closest(Yt.NAV_LIST_GROUP)[0],
						o = v.getSelectorFromElement(this._element);
					if (r) {
						var s = "UL" === r.nodeName || "OL" === r.nodeName ? Yt.ACTIVE_UL : Yt.ACTIVE;
						i = (i = t.makeArray(t(r).find(s)))[i.length - 1]
					}
					var a = t.Event(Kt.HIDE, {
							relatedTarget: this._element
						}),
						l = t.Event(Kt.SHOW, {
							relatedTarget: i
						});
					if (i && t(i).trigger(a), t(this._element).trigger(l), !l.isDefaultPrevented() && !a.isDefaultPrevented()) {
						o && (n = document.querySelector(o)), this._activate(this._element, r);
						var u = function () {
							var n = t.Event(Kt.HIDDEN, {
									relatedTarget: e._element
								}),
								r = t.Event(Kt.SHOWN, {
									relatedTarget: i
								});
							t(i).trigger(n), t(e._element).trigger(r)
						};
						n ? this._activate(n, n.parentNode, u) : u()
					}
				}
			}, n.dispose = function () {
				t.removeData(this._element, $t), this._element = null
			}, n._activate = function (e, n, i) {
				var r = this,
					o = (!n || "UL" !== n.nodeName && "OL" !== n.nodeName ? t(n).children(Yt.ACTIVE) : t(n).find(Yt.ACTIVE_UL))[0],
					s = i && o && t(o).hasClass(zt.FADE),
					a = function () {
						return r._transitionComplete(e, o, i)
					};
				if (o && s) {
					var l = v.getTransitionDurationFromElement(o);
					t(o).removeClass(zt.SHOW).one(v.TRANSITION_END, a).emulateTransitionEnd(l)
				} else a()
			}, n._transitionComplete = function (e, n, i) {
				if (n) {
					t(n).removeClass(zt.ACTIVE);
					var r = t(n.parentNode).find(Yt.DROPDOWN_ACTIVE_CHILD)[0];
					r && t(r).removeClass(zt.ACTIVE), "tab" === n.getAttribute("role") && n.setAttribute("aria-selected", !1)
				}
				if (t(e).addClass(zt.ACTIVE), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !0), v.reflow(e), e.classList.contains(zt.FADE) && e.classList.add(zt.SHOW), e.parentNode && t(e.parentNode).hasClass(zt.DROPDOWN_MENU)) {
					var o = t(e).closest(Yt.DROPDOWN)[0];
					if (o) {
						var s = [].slice.call(o.querySelectorAll(Yt.DROPDOWN_TOGGLE));
						t(s).addClass(zt.ACTIVE)
					}
					e.setAttribute("aria-expanded", !0)
				}
				i && i()
			}, e._jQueryInterface = function (n) {
				return this.each(function () {
					var i = t(this),
						r = i.data($t);
					if (r || (r = new e(this), i.data($t, r)), "string" == typeof n) {
						if ("undefined" == typeof r[n]) throw new TypeError('No method named "' + n + '"');
						r[n]()
					}
				})
			}, r(e, null, [{
				key: "VERSION",
				get: function () {
					return Ut
				}
			}]), e
		}();
	t(document).on(Kt.CLICK_DATA_API, Yt.DATA_TOGGLE, function (e) {
		e.preventDefault(), Qt._jQueryInterface.call(t(this), "show")
	}), t.fn[qt] = Qt._jQueryInterface, t.fn[qt].Constructor = Qt, t.fn[qt].noConflict = function () {
		return t.fn[qt] = Gt, Qt._jQueryInterface
	};
	var Xt = "toast",
		Jt = "4.3.1",
		Zt = "bs.toast",
		en = "." + Zt,
		tn = t.fn[Xt],
		nn = {
			CLICK_DISMISS: "click.dismiss" + en,
			HIDE: "hide" + en,
			HIDDEN: "hidden" + en,
			SHOW: "show" + en,
			SHOWN: "shown" + en
		},
		rn = {
			FADE: "fade",
			HIDE: "hide",
			SHOW: "show",
			SHOWING: "showing"
		},
		on = {
			animation: "boolean",
			autohide: "boolean",
			delay: "number"
		},
		sn = {
			animation: !0,
			autohide: !0,
			delay: 500
		},
		an = {
			DATA_DISMISS: '[data-dismiss="toast"]'
		},
		ln = function () {
			function e(e, t) {
				this._element = e, this._config = this._getConfig(t), this._timeout = null, this._setListeners()
			}
			var n = e.prototype;
			return n.show = function () {
				var e = this;
				t(this._element).trigger(nn.SHOW), this._config.animation && this._element.classList.add(rn.FADE);
				var n = function () {
					e._element.classList.remove(rn.SHOWING), e._element.classList.add(rn.SHOW), t(e._element).trigger(nn.SHOWN), e._config.autohide && e.hide()
				};
				if (this._element.classList.remove(rn.HIDE), this._element.classList.add(rn.SHOWING), this._config.animation) {
					var i = v.getTransitionDurationFromElement(this._element);
					t(this._element).one(v.TRANSITION_END, n).emulateTransitionEnd(i)
				} else n()
			}, n.hide = function (e) {
				var n = this;
				this._element.classList.contains(rn.SHOW) && (t(this._element).trigger(nn.HIDE), e ? this._close() : this._timeout = setTimeout(function () {
					n._close()
				}, this._config.delay))
			}, n.dispose = function () {
				clearTimeout(this._timeout), this._timeout = null, this._element.classList.contains(rn.SHOW) && this._element.classList.remove(rn.SHOW), t(this._element).off(nn.CLICK_DISMISS), t.removeData(this._element, Zt), this._element = null, this._config = null
			}, n._getConfig = function (e) {
				return e = s({}, sn, t(this._element).data(), "object" == typeof e && e ? e : {}), v.typeCheckConfig(Xt, e, this.constructor.DefaultType), e
			}, n._setListeners = function () {
				var e = this;
				t(this._element).on(nn.CLICK_DISMISS, an.DATA_DISMISS, function () {
					return e.hide(!0)
				})
			}, n._close = function () {
				var e = this,
					n = function () {
						e._element.classList.add(rn.HIDE), t(e._element).trigger(nn.HIDDEN)
					};
				if (this._element.classList.remove(rn.SHOW), this._config.animation) {
					var i = v.getTransitionDurationFromElement(this._element);
					t(this._element).one(v.TRANSITION_END, n).emulateTransitionEnd(i)
				} else n()
			}, e._jQueryInterface = function (n) {
				return this.each(function () {
					var i = t(this),
						r = i.data(Zt);
					if (r || (r = new e(this, "object" == typeof n && n), i.data(Zt, r)), "string" == typeof n) {
						if ("undefined" == typeof r[n]) throw new TypeError('No method named "' + n + '"');
						r[n](this)
					}
				})
			}, r(e, null, [{
				key: "VERSION",
				get: function () {
					return Jt
				}
			}, {
				key: "DefaultType",
				get: function () {
					return on
				}
			}, {
				key: "Default",
				get: function () {
					return sn
				}
			}]), e
		}();
	t.fn[Xt] = ln._jQueryInterface, t.fn[Xt].Constructor = ln, t.fn[Xt].noConflict = function () {
		return t.fn[Xt] = tn, ln._jQueryInterface
	},
	function () {
		if (void 0 === t) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
		var e = t.fn.jquery.split(" ")[0].split("."),
			n = 1,
			i = 2,
			r = 9,
			o = 1,
			s = 4;
		if (e[0] < i && e[1] < r || e[0] === n && e[1] === r && e[2] < o || e[0] >= s) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
	}(), e.Util = v, e.Alert = A, e.Button = j, e.Carousel = te, e.Collapse = pe, e.Dropdown = Re, e.Modal = Ke, e.Popover = At, e.Scrollspy = Ft, e.Tab = Qt, e.Toast = ln, e.Tooltip = pt, Object.defineProperty(e, "__esModule", {
		value: !0
	})
});
var DecorationsT, JobT, SourceSpansT, releasesToShow = 99999,
	fetchFlutterReleases = function (e, t, n) {
		var i = "https://storage.googleapis.com/flutter_infra/releases/releases_" + e + ".json";
		$.ajax({
			type: "GET",
			url: i,
			dataType: "json",
			success: function (n) {
				t(n, e)
			},
			error: function () {
				n && n(e)
			}
		})
	};
$(function () {
	$("#sdk-archives").length && (fetchFlutterReleases("windows", updateTable, updateTableFailed), fetchFlutterReleases("macos", updateTable, updateTableFailed), fetchFlutterReleases("linux", updateTable, updateTableFailed)), $(".download-latest-link-windows").length && fetchFlutterReleases("windows", updateDownloadLink, updateDownloadLinkFailed), $(".download-latest-link-macos").length && fetchFlutterReleases("macos", updateDownloadLink, updateDownloadLinkFailed), $(".download-latest-link-linux").length && fetchFlutterReleases("linux", updateDownloadLink, updateDownloadLinkFailed)
});
var PR, prettyPrintOne, prettyPrint, IN_GLOBAL_SCOPE = !0,
	PR_SHOULD_USE_CONTINUATION = !0;
"undefined" != typeof window && (window.PR_SHOULD_USE_CONTINUATION = PR_SHOULD_USE_CONTINUATION),
function () {
	function e(e) {
		function t(e) {
			var t = e.charCodeAt(0);
			if (92 !== t) return t;
			var n = e.charAt(1);
			return (t = c[n]) || ("0" <= n && n <= "7" ? parseInt(e.substring(1), 8) : "u" === n || "x" === n ? parseInt(e.substring(2), 16) : e.charCodeAt(1))
		}

		function n(e) {
			if (e < 32) return (e < 16 ? "\\x0" : "\\x") + e.toString(16);
			var t = String.fromCharCode(e);
			return "\\" === t || "-" === t || "]" === t || "^" === t ? "\\" + t : t
		}

		function i(e) {
			var i = e.substring(1, e.length - 1).match(new RegExp("\\\\u[0-9A-Fa-f]{4}|\\\\x[0-9A-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\s\\S]|-|[^-\\\\]", "g")),
				r = [],
				o = "^" === i[0],
				s = ["["];
			o && s.push("^");
			for (var a = o ? 1 : 0, l = i.length; a < l; ++a) {
				var u = i[a];
				if (/\\[bdsw]/i.test(u)) s.push(u);
				else {
					var c, f = t(u);
					a + 2 < l && "-" === i[a + 1] ? (c = t(i[a + 2]), a += 2) : c = f, r.push([f, c]), c < 65 || f > 122 || (c < 65 || f > 90 || r.push([32 | Math.max(65, f), 32 | Math.min(c, 90)]), c < 97 || f > 122 || r.push([-33 & Math.max(97, f), -33 & Math.min(c, 122)]))
				}
			}
			r.sort(function (e, t) {
				return e[0] - t[0] || t[1] - e[1]
			});
			var d = [],
				h = [];
			for (a = 0; a < r.length; ++a) {
				(p = r[a])[0] <= h[1] + 1 ? h[1] = Math.max(h[1], p[1]) : d.push(h = p)
			}
			for (a = 0; a < d.length; ++a) {
				var p = d[a];
				s.push(n(p[0])), p[1] > p[0] && (p[1] + 1 > p[0] && s.push("-"), s.push(n(p[1])))
			}
			return s.push("]"), s.join("")
		}

		function r(e) {
			for (var t = e.source.match(new RegExp("(?:\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]|\\\\u[A-Fa-f0-9]{4}|\\\\x[A-Fa-f0-9]{2}|\\\\[0-9]+|\\\\[^ux0-9]|\\(\\?[:!=]|[\\(\\)\\^]|[^\\x5B\\x5C\\(\\)\\^]+)", "g")), r = t.length, a = [], l = 0, u = 0; l < r; ++l) {
				if ("(" === (f = t[l]))++u;
				else if ("\\" === f.charAt(0)) {
					(c = +f.substring(1)) && (c <= u ? a[c] = -1 : t[l] = n(c))
				}
			}
			for (l = 1; l < a.length; ++l) - 1 === a[l] && (a[l] = ++o);
			for (l = 0, u = 0; l < r; ++l) {
				if ("(" === (f = t[l])) a[++u] || (t[l] = "(?:");
				else if ("\\" === f.charAt(0)) {
					var c;
					(c = +f.substring(1)) && c <= u && (t[l] = "\\" + a[c])
				}
			}
			for (l = 0; l < r; ++l) "^" === t[l] && "^" !== t[l + 1] && (t[l] = "");
			if (e.ignoreCase && s)
				for (l = 0; l < r; ++l) {
					var f, d = (f = t[l]).charAt(0);
					f.length >= 2 && "[" === d ? t[l] = i(f) : "\\" !== d && (t[l] = f.replace(/[a-zA-Z]/g, function (e) {
						var t = e.charCodeAt(0);
						return "[" + String.fromCharCode(-33 & t, 32 | t) + "]"
					}))
				}
			return t.join("")
		}
		for (var o = 0, s = !1, a = !1, l = 0, u = e.length; l < u; ++l) {
			if ((d = e[l]).ignoreCase) a = !0;
			else if (/[a-z]/i.test(d.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi, ""))) {
				s = !0, a = !1;
				break
			}
		}
		var c = {
				b: 8,
				t: 9,
				n: 10,
				v: 11,
				f: 12,
				r: 13
			},
			f = [];
		for (l = 0, u = e.length; l < u; ++l) {
			var d;
			if ((d = e[l]).global || d.multiline) throw new Error("" + d);
			f.push("(?:" + r(d) + ")")
		}
		return new RegExp(f.join("|"), a ? "gi" : "g")
	}

	function t(e, t) {
		function n(e) {
			var l = e.nodeType;
			if (1 == l) {
				if (i.test(e.className)) return;
				for (var u = e.firstChild; u; u = u.nextSibling) n(u);
				var c = e.nodeName.toLowerCase();
				"br" !== c && "li" !== c || (r[a] = "\n", s[a << 1] = o++, s[a++ << 1 | 1] = e)
			} else if (3 == l || 4 == l) {
				var f = e.nodeValue;
				f.length && (f = t ? f.replace(/\r\n?/g, "\n") : f.replace(/[ \t\r\n]+/g, " "), r[a] = f, s[a << 1] = o, o += f.length, s[a++ << 1 | 1] = e)
			}
		}
		var i = /(?:^|\s)nocode(?:\s|$)/,
			r = [],
			o = 0,
			s = [],
			a = 0;
		return n(e), {
			sourceCode: r.join("").replace(/\n$/, ""),
			spans: s
		}
	}

	function n(e, t, n, i, r) {
		if (n) {
			var o = {
				sourceNode: e,
				pre: 1,
				langExtension: null,
				numberLines: null,
				sourceCode: n,
				spans: null,
				basePos: t,
				decorations: null
			};
			i(o), r.push.apply(r, o.decorations)
		}
	}

	function i(e) {
		for (var t = undefined, n = e.firstChild; n; n = n.nextSibling) {
			var i = n.nodeType;
			t = 1 === i ? t ? e : n : 3 === i && F.test(n.nodeValue) ? e : t
		}
		return t === e ? undefined : t
	}

	function r(t, i) {
		var r, o = {};
		! function () {
			for (var n = t.concat(i), s = [], a = {}, l = 0, u = n.length; l < u; ++l) {
				var c = n[l],
					f = c[3];
				if (f)
					for (var d = f.length; --d >= 0;) o[f.charAt(d)] = c;
				var h = c[1],
					p = "" + h;
				a.hasOwnProperty(p) || (s.push(h), a[p] = null)
			}
			s.push(/[\0-\uffff]/), r = e(s)
		}();
		var s = i.length,
			a = function (e) {
				for (var t = e.sourceCode, l = e.basePos, c = e.sourceNode, f = [l, L], d = 0, h = t.match(r) || [], p = {}, g = 0, m = h.length; g < m; ++g) {
					var v, y = h[g],
						_ = p[y],
						b = void 0;
					if ("string" == typeof _) v = !1;
					else {
						var E = o[y.charAt(0)];
						if (E) b = y.match(E[1]), _ = E[0];
						else {
							for (var T = 0; T < s; ++T)
								if (E = i[T], b = y.match(E[1])) {
									_ = E[0];
									break
								}
							b || (_ = L)
						}!(v = _.length >= 5 && "lang-" === _.substring(0, 5)) || b && "string" == typeof b[1] || (v = !1, _ = k), v || (p[y] = _)
					}
					var w = d;
					if (d += y.length, v) {
						var C = b[1],
							S = y.indexOf(C),
							x = S + C.length;
						b[2] && (S = (x = y.length - b[2].length) - C.length);
						var A = _.substring(5);
						n(c, l + w, y.substring(0, S), a, f), n(c, l + w + S, C, u(A, C), f), n(c, l + w + x, y.substring(x), a, f)
					} else f.push(l + w, _)
				}
				e.decorations = f
			};
		return a
	}

	function o(e) {
		var t = [],
			n = [];
		e.tripleQuotedStrings ? t.push([x, /^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/, null, "'\""]) : e.multiLineStrings ? t.push([x, /^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/, null, "'\"`"]) : t.push([x, /^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/, null, "\"'"]), e.verbatimStrings && n.push([x, /^@\"(?:[^\"]|\"\")*(?:\"|$)/, null]);
		var i = e.hashComments;
		i && (e.cStyleComments ? (i > 1 ? t.push([D, /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, null, "#"]) : t.push([D, /^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\r\n]*)/, null, "#"]), n.push([x, /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/, null])) : t.push([D, /^#[^\r\n]*/, null, "#"])), e.cStyleComments && (n.push([D, /^\/\/[^\r\n]*/, null]), n.push([D, /^\/\*[\s\S]*?(?:\*\/|$)/, null]));
		var o = e.regexLiterals;
		if (o) {
			var s = o > 1 ? "" : "\n\r",
				a = s ? "." : "[\\S\\s]",
				l = "/(?=[^/*" + s + "])(?:[^/\\x5B\\x5C" + s + "]|\\x5C" + a + "|\\x5B(?:[^\\x5C\\x5D" + s + "]|\\x5C" + a + ")*(?:\\x5D|$))+/";
			n.push(["lang-regex", RegExp("^" + W + "(" + l + ")")])
		}
		var u = e.types;
		u && n.push([O, u]);
		var c = ("" + e.keywords).replace(/^ | $/g, "");
		c.length && n.push([A, new RegExp("^(?:" + c.replace(/[\s,]+/g, "|") + ")\\b"), null]), t.push([L, /^\s+/, null, " \r\n\t\xa0"]);
		var f = "^.[^\\s\\w.$@'\"`/\\\\]*";
		return e.regexLiterals && (f += "(?!s*/)"), n.push([N, /^@[a-z_$][a-z_$@0-9]*/i, null], [O, /^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/, null], [L, /^[a-z_$][a-z_$@0-9]*/i, null], [N, new RegExp("^(?:0x[a-f0-9]+|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)(?:e[+\\-]?\\d+)?)[a-z]*", "i"), null, "0123456789"], [L, /^\\[\s\S]?/, null], [I, new RegExp(f), null]), r(t, n)
	}

	function s(e, t, n) {
		function i(e) {
			var t = e.nodeType;
			if (1 != t || o.test(e.className)) {
				if ((3 == t || 4 == t) && n) {
					var l = e.nodeValue,
						u = l.match(s);
					if (u) {
						var c = l.substring(0, u.index);
						e.nodeValue = c;
						var f = l.substring(u.index + u[0].length);
						if (f) e.parentNode.insertBefore(a.createTextNode(f), e.nextSibling);
						r(e), c || e.parentNode.removeChild(e)
					}
				}
			} else if ("br" === e.nodeName.toLowerCase()) r(e), e.parentNode && e.parentNode.removeChild(e);
			else
				for (var d = e.firstChild; d; d = d.nextSibling) i(d)
		}

		function r(e) {
			function t(e, n) {
				var i = n ? e.cloneNode(!1) : e,
					r = e.parentNode;
				if (r) {
					var o = t(r, 1),
						s = e.nextSibling;
					o.appendChild(i);
					for (var a = s; a; a = s) s = a.nextSibling, o.appendChild(a)
				}
				return i
			}
			for (; !e.nextSibling;)
				if (!(e = e.parentNode)) return;
			for (var n, i = t(e.nextSibling, 0);
				(n = i.parentNode) && 1 === n.nodeType;) i = n;
			u.push(i)
		}
		for (var o = /(?:^|\s)nocode(?:\s|$)/, s = /\r\n?|\n/, a = e.ownerDocument, l = a.createElement("li"); e.firstChild;) l.appendChild(e.firstChild);
		for (var u = [l], c = 0; c < u.length; ++c) i(u[c]);
		t === (0 | t) && u[0].setAttribute("value", t);
		var f = a.createElement("ol");
		f.className = "linenums";
		for (var d = Math.max(0, t - 1 | 0) || 0, h = (c = 0, u.length); c < h; ++c)(l = u[c]).className = "L" + (c + d) % 10, l.firstChild || l.appendChild(a.createTextNode("\xa0")), f.appendChild(l);
		e.appendChild(f)
	}

	function a(e) {
		var t = /\bMSIE\s(\d+)/.exec(navigator.userAgent);
		t = t && +t[1] <= 8;
		var n, i, r = /\n/g,
			o = e.sourceCode,
			s = o.length,
			a = 0,
			l = e.spans,
			u = l.length,
			c = 0,
			f = e.decorations,
			d = f.length,
			h = 0;
		for (f[d] = s, i = n = 0; i < d;) f[i] !== f[i + 2] ? (f[n++] = f[i++], f[n++] = f[i++]) : i += 2;
		for (d = n, i = n = 0; i < d;) {
			for (var p = f[i], g = f[i + 1], m = i + 2; m + 2 <= d && f[m + 1] === g;) m += 2;
			f[n++] = p, f[n++] = g, i = m
		}
		d = f.length = n;
		var v = e.sourceNode,
			y = "";
		v && (y = v.style.display, v.style.display = "none");
		try {
			for (; c < u;) {
				l[c];
				var _, b = l[c + 2] || s,
					E = f[h + 2] || s,
					T = (m = Math.min(b, E), l[c + 1]);
				if (1 !== T.nodeType && (_ = o.substring(a, m))) {
					t && (_ = _.replace(r, "\r")), T.nodeValue = _;
					var w = T.ownerDocument,
						C = w.createElement("span");
					C.className = f[h + 1];
					var S = T.parentNode;
					S.replaceChild(C, T), C.appendChild(T), a < b && (l[c + 1] = T = w.createTextNode(o.substring(m, b)), S.insertBefore(T, C.nextSibling))
				}(a = m) >= b && (c += 2), a >= E && (h += 2)
			}
		} finally {
			v && (v.style.display = y)
		}
	}

	function l(e, t) {
		for (var n = t.length; --n >= 0;) {
			var i = t[n];
			U.hasOwnProperty(i) ? h.console && console.warn("cannot override language handler %s", i) : U[i] = e
		}
	}

	function u(e, t) {
		return e && U.hasOwnProperty(e) || (e = /^\s*</.test(t) ? "default-markup" : "default-code"), U[e]
	}

	function c(e) {
		var n = e.langExtension;
		try {
			var i = t(e.sourceNode, e.pre),
				r = i.sourceCode;
			e.sourceCode = r, e.spans = i.spans, e.basePos = 0, u(n, r)(e), a(e)
		} catch (o) {
			h.console && console.log(o && o.stack || o)
		}
	}

	function f(e, t, n) {
		var i = n || !1,
			r = t || null,
			o = document.createElement("div");
		return o.innerHTML = "<pre>" + e + "</pre>", o = o.firstChild, i && s(o, i, !0), c({
			langExtension: r,
			numberLines: i,
			sourceNode: o,
			pre: 1,
			sourceCode: null,
			basePos: null,
			spans: null,
			decorations: null
		}), o.innerHTML
	}

	function d(e, t) {
		function n(e) {
			return o.getElementsByTagName(e)
		}

		function r() {
			for (var t = h.PR_SHOULD_USE_CONTINUATION ? g.now() + 250 : Infinity; m < u.length && g.now() < t; m++) {
				for (var n = u[m], o = w, l = n; l = l.previousSibling;) {
					var f = l.nodeType,
						d = (7 === f || 8 === f) && l.nodeValue;
					if (d ? !/^\??prettify\b/.test(d) : 3 !== f || /\S/.test(l.nodeValue)) break;
					if (d) {
						o = {}, d.replace(/\b(\w+)=([\w:.%+-]+)/g, function (e, t, n) {
							o[t] = n
						});
						break
					}
				}
				var p = n.className;
				if ((o !== w || y.test(p)) && !_.test(p)) {
					for (var C = !1, S = n.parentNode; S; S = S.parentNode) {
						var x = S.tagName;
						if (T.test(x) && S.className && y.test(S.className)) {
							C = !0;
							break
						}
					}
					if (!C) {
						n.className += " prettyprinted";
						var A, D, O = o.lang;
						if (!O)!(O = p.match(v)) && (A = i(n)) && E.test(A.tagName) && (O = A.className.match(v)), O && (O = O[1]);
						if (b.test(n.tagName)) D = 1;
						else {
							var N = n.currentStyle,
								I = a.defaultView,
								L = N ? N.whiteSpace : I && I.getComputedStyle ? I.getComputedStyle(n, null).getPropertyValue("white-space") : 0;
							D = L && "pre" === L.substring(0, 3)
						}
						var P = o.linenums;
						(P = "true" === P || +P) || (P = !!(P = p.match(/\blinenums\b(?::(\d+))?/)) && (!P[1] || !P[1].length || +P[1])), P && s(n, P, D), c({
							langExtension: O,
							sourceNode: n,
							numberLines: P,
							pre: D,
							sourceCode: null,
							basePos: null,
							spans: null,
							decorations: null
						})
					}
				}
			}
			m < u.length ? h.setTimeout(r, 250) : "function" == typeof e && e()
		}
		for (var o = t || document.body, a = o.ownerDocument || document, l = [n("pre"), n("code"), n("xmp")], u = [], f = 0; f < l.length; ++f)
			for (var d = 0, p = l[f].length; d < p; ++d) u.push(l[f][d]);
		l = null;
		var g = Date;
		g.now || (g = {
			now: function () {
				return +new Date
			}
		});
		var m = 0,
			v = /\blang(?:uage)?-([\w.]+)(?!\S)/,
			y = /\bprettyprint\b/,
			_ = /\bprettyprinted\b/,
			b = /pre|xmp/i,
			E = /^code$/i,
			T = /^(?:pre|code|xmp)$/i,
			w = {};
		r()
	}
	var h = "undefined" != typeof window ? window : {},
		p = ["break,continue,do,else,for,if,return,while"],
		g = [
			[p, "auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,restrict,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"], "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"
		],
		m = [g, "alignas,alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,noexcept,noreturn,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],
		v = [g, "abstract,assert,boolean,byte,extends,finally,final,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient"],
		y = [g, "abstract,add,alias,as,ascending,async,await,base,bool,by,byte,checked,decimal,delegate,descending,dynamic,event,finally,fixed,foreach,from,get,global,group,implicit,in,interface,internal,into,is,join,let,lock,null,object,out,override,orderby,params,partial,readonly,ref,remove,sbyte,sealed,select,set,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,value,var,virtual,where,yield"],
		_ = "all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes",
		b = [g, "abstract,async,await,constructor,debugger,enum,eval,export,from,function,get,import,implements,instanceof,interface,let,null,of,set,undefined,var,with,yield,Infinity,NaN"],
		E = "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",
		T = [p, "and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],
		w = [p, "alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],
		C = [p, "case,done,elif,esac,eval,fi,function,in,local,set,then,until"],
		S = /^(DIR|FILE|array|vector|(de|priority_)?queue|(forward_)?list|stack|(const_)?(reverse_)?iterator|(unordered_)?(multi)?(set|map)|bitset|u?(int|float)\d*)\b/,
		x = "str",
		A = "kwd",
		D = "com",
		O = "typ",
		N = "lit",
		I = "pun",
		L = "pln",
		P = "tag",
		R = "dec",
		k = "src",
		H = "atn",
		j = "atv",
		M = "nocode",
		W = "(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*",
		F = /\S/,
		q = o({
			keywords: [m, y, v, b, E, T, w, C],
			hashComments: !0,
			cStyleComments: !0,
			multiLineStrings: !0,
			regexLiterals: !0
		}),
		U = {};
	l(q, ["default-code"]), l(r([], [
		[L, /^[^<?]+/],
		[R, /^<!\w[^>]*(?:>|$)/],
		[D, /^<\!--[\s\S]*?(?:-\->|$)/],
		["lang-", /^<\?([\s\S]+?)(?:\?>|$)/],
		["lang-", /^<%([\s\S]+?)(?:%>|$)/],
		[I, /^(?:<[%?]|[%?]>)/],
		["lang-", /^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],
		["lang-js", /^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],
		["lang-css", /^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],
		["lang-in.tag", /^(<\/?[a-z][^<>]*>)/i]
	]), ["default-markup", "htm", "html", "mxml", "xhtml", "xml", "xsl"]), l(r([
		[L, /^[\s]+/, null, " \t\r\n"],
		[j, /^(?:\"[^\"]*\"?|\'[^\']*\'?)/, null, "\"'"]
	], [
		[P, /^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i],
		[H, /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],
		["lang-uq.val", /^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/],
		[I, /^[=<>\/]+/],
		["lang-js", /^on\w+\s*=\s*\"([^\"]+)\"/i],
		["lang-js", /^on\w+\s*=\s*\'([^\']+)\'/i],
		["lang-js", /^on\w+\s*=\s*([^\"\'>\s]+)/i],
		["lang-css", /^style\s*=\s*\"([^\"]+)\"/i],
		["lang-css", /^style\s*=\s*\'([^\']+)\'/i],
		["lang-css", /^style\s*=\s*([^\"\'>\s]+)/i]
	]), ["in.tag"]), l(r([], [
		[j, /^[\s\S]+/]
	]), ["uq.val"]), l(o({
		keywords: m,
		hashComments: !0,
		cStyleComments: !0,
		types: S
	}), ["c", "cc", "cpp", "cxx", "cyc", "m"]), l(o({
		keywords: "null,true,false"
	}), ["json"]), l(o({
		keywords: y,
		hashComments: !0,
		cStyleComments: !0,
		verbatimStrings: !0,
		types: S
	}), ["cs"]), l(o({
		keywords: v,
		cStyleComments: !0
	}), ["java"]), l(o({
		keywords: C,
		hashComments: !0,
		multiLineStrings: !0
	}), ["bash", "bsh", "csh", "sh"]), l(o({
		keywords: T,
		hashComments: !0,
		multiLineStrings: !0,
		tripleQuotedStrings: !0
	}), ["cv", "py", "python"]), l(o({
		keywords: E,
		hashComments: !0,
		multiLineStrings: !0,
		regexLiterals: 2
	}), ["perl", "pl", "pm"]), l(o({
		keywords: w,
		hashComments: !0,
		multiLineStrings: !0,
		regexLiterals: !0
	}), ["rb", "ruby"]), l(o({
		keywords: b,
		cStyleComments: !0,
		regexLiterals: !0
	}), ["javascript", "js", "ts", "typescript"]), l(o({
		keywords: _,
		hashComments: 3,
		cStyleComments: !0,
		multilineStrings: !0,
		tripleQuotedStrings: !0,
		regexLiterals: !0
	}), ["coffee"]), l(r([], [
		[x, /^[\s\S]+/]
	]), ["regex"]);
	var $ = h.PR = {
			createSimpleLexer: r,
			registerLangHandler: l,
			sourceDecorator: o,
			PR_ATTRIB_NAME: H,
			PR_ATTRIB_VALUE: j,
			PR_COMMENT: D,
			PR_DECLARATION: R,
			PR_KEYWORD: A,
			PR_LITERAL: N,
			PR_NOCODE: M,
			PR_PLAIN: L,
			PR_PUNCTUATION: I,
			PR_SOURCE: k,
			PR_STRING: x,
			PR_TAG: P,
			PR_TYPE: O,
			prettyPrintOne: IN_GLOBAL_SCOPE ? h.prettyPrintOne = f : prettyPrintOne = f,
			prettyPrint: IN_GLOBAL_SCOPE ? h.prettyPrint = d : prettyPrint = d
		},
		B = h.define;
	"function" == typeof B && B.amd && B("google-code-prettify", [], function () {
		return $
	})
}(), PR.registerLangHandler(PR.createSimpleLexer([
	[PR.PR_PLAIN, /^[ \t\r\n\f]+/, null, " \t\r\n\f"]
], [
	[PR.PR_STRING, /^\"(?:[^\n\r\f\\\"]|\\(?:\r\n?|\n|\f)|\\[\s\S])*\"/, null],
	[PR.PR_STRING, /^\'(?:[^\n\r\f\\\']|\\(?:\r\n?|\n|\f)|\\[\s\S])*\'/, null],
	["lang-css-str", /^url\(([^\)\"\']+)\)/i],
	[PR.PR_KEYWORD, /^(?:url|rgb|\!important|@import|@page|@media|@charset|inherit)(?=[^\-\w]|$)/i, null],
	["lang-css-kw", /^(-?(?:[_a-z]|(?:\\[0-9a-f]+ ?))(?:[_a-z0-9\-]|\\(?:\\[0-9a-f]+ ?))*)\s*:/i],
	[PR.PR_COMMENT, /^\/\*[^*]*\*+(?:[^\/*][^*]*\*+)*\//],
	[PR.PR_COMMENT, /^(?:<!--|-->)/],
	[PR.PR_LITERAL, /^(?:\d+|\d*\.\d+)(?:%|[a-z]+)?/i],
	[PR.PR_LITERAL, /^#(?:[0-9a-f]{3}){1,2}\b/i],
	[PR.PR_PLAIN, /^-?(?:[_a-z]|(?:\\[\da-f]+ ?))(?:[_a-z\d\-]|\\(?:\\[\da-f]+ ?))*/i],
	[PR.PR_PUNCTUATION, /^[^\s\w\'\"]+/]
]), ["css"]), PR.registerLangHandler(PR.createSimpleLexer([], [
	[PR.PR_KEYWORD, /^-?(?:[_a-z]|(?:\\[\da-f]+ ?))(?:[_a-z\d\-]|\\(?:\\[\da-f]+ ?))*/i]
]), ["css-kw"]), PR.registerLangHandler(PR.createSimpleLexer([], [
	[PR.PR_STRING, /^[^\)\"\']+/]
]), ["css-str"]), PR.registerLangHandler(PR.createSimpleLexer([
	[PR.PR_PLAIN, /^[\t\n\r \xA0]+/, null, "\t\n\r \xa0"]
], [
	[PR.PR_COMMENT, /^#!(?:.*)/],
	[PR.PR_KEYWORD, /^\b(?:import|library|part of|part|as|show|hide)\b/i],
	[PR.PR_COMMENT, /^\/\/(?:.*)/],
	[PR.PR_COMMENT, /^\/\*[^*]*\*+(?:[^\/*][^*]*\*+)*\//],
	[PR.PR_KEYWORD, /^\b(?:class|interface)\b/i],
	[PR.PR_KEYWORD, /^\b(?:assert|async|await|break|case|catch|continue|default|do|else|finally|for|if|in|is|new|return|super|switch|sync|this|throw|try|while)\b/i],
	[PR.PR_KEYWORD, /^\b(?:abstract|const|extends|factory|final|get|implements|native|operator|set|static|typedef|var)\b/i],
	[PR.PR_TYPE, /^\b(?:bool|double|Dynamic|int|num|Object|String|void)\b/i],
	[PR.PR_KEYWORD, /^\b(?:false|null|true)\b/i],
	[PR.PR_STRING, /^r?[\']{3}[\s|\S]*?[^\\][\']{3}/],
	[PR.PR_STRING, /^r?[\"]{3}[\s|\S]*?[^\\][\"]{3}/],
	[PR.PR_STRING, /^r?\'(\'|(?:[^\n\r\f])*?[^\\]\')/],
	[PR.PR_STRING, /^r?\"(\"|(?:[^\n\r\f])*?[^\\]\")/],
	[PR.PR_TYPE, /^[A-Z]\w*/],
	[PR.PR_PLAIN, /^[a-z_$][a-z0-9_]*/i],
	[PR.PR_PUNCTUATION, /^[~!%^&*+=|?:<>/-]/],
	[PR.PR_LITERAL, /^\b0x[0-9a-f]+/i],
	[PR.PR_LITERAL, /^\b\d+(?:\.\d*)?(?:e[+-]?\d+)?/i],
	[PR.PR_LITERAL, /^\b\.\d+(?:e[+-]?\d+)?/i],
	[PR.PR_PUNCTUATION, /^[(){}\[\],.;]/]
]), ["dart"]), PR.registerLangHandler(PR.createSimpleLexer([
	[PR.PR_PUNCTUATION, /^[:|>?]+/, null, ":|>?"],
	[PR.PR_DECLARATION, /^%(?:YAML|TAG)[^#\r\n]+/, null, "%"],
	[PR.PR_TYPE, /^[&]\S+/, null, "&"],
	[PR.PR_TYPE, /^!\S*/, null, "!"],
	[PR.PR_STRING, /^"(?:[^\\"]|\\.)*(?:"|$)/, null, '"'],
	[PR.PR_STRING, /^'(?:[^']|'')*(?:'|$)/, null, "'"],
	[PR.PR_COMMENT, /^#[^\r\n]*/, null, "#"],
	[PR.PR_PLAIN, /^\s+/, null, " \t\r\n"]
], [
	[PR.PR_DECLARATION, /^(?:---|\.\.\.)(?:[\r\n]|$)/],
	[PR.PR_PUNCTUATION, /^-/],
	[PR.PR_KEYWORD, /^[\w-]+:[ \r\n]/],
	[PR.PR_PLAIN, /^\w+/]
]), ["yaml", "yml"]), $(function () {
	adjustToc(), initFixedColumns(), initVideoModal(), initCarousel(), initSnackbar(), addCopyCodeButtonsEverywhere(), $('[data-toggle="tooltip"]').tooltip(), setupClipboardJS(), setupTabs($("#editor-setup"), "io.flutter.tool-id"), setupToolsTabs($("#tab-set-install"), "tab-install-", "io.flutter.tool-id"), setupToolsTabs($("#tab-set-os"), "tab-os-", null, getOS()), prettyPrint()
});
//# sourceMappingURL=/assets/source-maps/main.js.map