function play(a) {
	var b, c;
	m3u8 = urls[a],
	b = document.getElementById("video"),
	Hls.isSupported() ? (c = new Hls, c.loadSource(m3u8), c.attachMedia(b), c.on(Hls.Events.MANIFEST_PARSED,
	function() {
		b.play()
	})) : b.canPlayType("application/vnd.apple.mpegurl") && (b.src = m3u8, b.addEventListener("loadedmetadata",
	function() {
		b.play()
	}))
}
var _hmt, rthost = window.location.host;
"www.twoeggz.com" != rthost && (top.location.href = "http://www.twoeggz.com"),
!
function(a) {
	var b = /iPhone/i,
	c = /iPod/i,
	d = /iPad/i,
	e = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,
	f = /Android/i,
	g = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
	h = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
	i = /Windows Phone/i,
	j = /(?=.*\bWindows\b)(?=.*\bARM\b)/i,
	k = /BlackBerry/i,
	l = /BB10/i,
	m = /Opera Mini/i,
	n = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
	o = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,
	p = /UCWEB/i,
	q = /spider/i,
	r = /bot/i,
	s = /Windows; U;/i,
	t = new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)", "i"),
	u = function(a, b) {
		return a.test(b)
	},
	v = function(a) {
		var v = a || navigator.userAgent,
		w = v.split("[FBAN");
		return "undefined" != typeof w[1] && (v = w[0]),
		w = v.split("Twitter"),
		"undefined" != typeof w[1] && (v = w[0]),
		this.apple = {
			phone: u(b, v),
			ipod: u(c, v),
			tablet: !u(b, v) && u(d, v),
			device: u(b, v) || u(c, v) || u(d, v)
		},
		this.amazon = {
			phone: u(g, v),
			tablet: !u(g, v) && u(h, v),
			device: u(g, v) || u(h, v)
		},
		this.android = {
			phone: u(g, v) || u(e, v),
			tablet: !u(g, v) && !u(e, v) && (u(h, v) || u(f, v)),
			device: u(g, v) || u(h, v) || u(e, v) || u(f, v)
		},
		this.windows = {
			phone: u(i, v),
			tablet: u(j, v),
			device: u(i, v) || u(j, v)
		},
		this.other = {
			blackberry: u(k, v),
			blackberry10: u(l, v),
			opera: u(m, v),
			firefox: u(o, v),
			chrome: u(n, v),
			ucweb: u(p, v),
			device: u(k, v) || u(l, v) || u(m, v) || u(o, v) || u(n, v) || u(p, v)
		},
		this.spiders = {
			spider: u(q, v),
			bot: u(r, v),
			u: u(s, v),
			device: u(q, v) || u(r, v) || u(s, v)
		},
		this.seven_inch = u(t, v),
		this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch,
		this.phone = this.apple.phone || this.android.phone || this.windows.phone,
		this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet,
		this.spider = this.spiders.device,
		"undefined" == typeof window ? this: void 0
	},
	w = function() {
		var a = new v;
		return a.Class = v,
		a
	};
	"undefined" != typeof module && module.exports && "undefined" == typeof window ? module.exports = v: "undefined" != typeof module && module.exports && "undefined" != typeof window ? module.exports = w() : "function" == typeof define && define.amd ? define("isMobile", [], a.isMobile = w()) : a.isMobile = w()
} (this),
isMobile.any || !
function() {
	function a(a, b, c) {
		return a.getAttribute(b) || c
	}
	function b(a) {
		return document.getElementsByTagName(a)
	}
	function c() {
		var c = b("script"),
		d = c.length,
		e = c[d - 1];
		return {
			l: d,
			z: a(e, "zIndex", -1),
			o: a(e, "opacity", 1),
			c: a(e, "color", "69,182,247"),
			n: a(e, "count", 99)
		}
	}
	function d() {
		f = i.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
		g = i.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
	}
	function e() {
		l.clearRect(0, 0, f, g);
		var a, b, c, d, i, k;
		p.forEach(function(e, m) {
			for (e.x += e.xa, e.y += e.ya, e.xa *= e.x > f || e.x < 0 ? -1 : 1, e.ya *= e.y > g || e.y < 0 ? -1 : 1, l.fillRect(e.x - .5, e.y - .5, 1, 1), b = m + 1; b < h.length; b++) a = h[b],
			null !== a.x && null !== a.y && (d = e.x - a.x, i = e.y - a.y, k = d * d + i * i, k < a.max && (a === o && k >= a.max / 2 && (e.x -= .03 * d, e.y -= .03 * i), c = (a.max - k) / a.max, l.beginPath(), l.lineWidth = c / 2, l.strokeStyle = "rgba(" + j.c + "," + (c + .2) + ")", l.moveTo(e.x, e.y), l.lineTo(a.x, a.y), l.stroke()))
		}),
		m(e)
	}
	var f, g, h, p, q, r, s, t, u, i = document.createElement("canvas"),
	j = c(),
	k = "c_n" + j.l,
	l = i.getContext("2d"),
	m = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(a) {
		window.setTimeout(a, 1e3 / 45)
	},
	n = Math.random,
	o = {
		x: null,
		y: null,
		max: 2e4
	};
	for (i.id = k, i.style.cssText = "position:fixed;top:0;left:0;z-index:" + j.z + ";opacity:" + j.o, b("body")[0].appendChild(i), d(), window.onresize = d, window.onmousemove = function(a) {
		a = a || window.event,
		o.x = a.clientX,
		o.y = a.clientY
	},
	window.onmouseout = function() {
		o.x = null,
		o.y = null
	},
	p = [], q = 0; j.n > q; q++) r = n() * f,
	s = n() * g,
	t = 2 * n() - 1,
	u = 2 * n() - 1,
	p.push({
		x: r,
		y: s,
		xa: t,
		ya: u,
		max: 6e3
	});
	h = p.concat([o]),
	setTimeout(function() {
		e()
	},
	100)
} (),
function(a) {
	function b(a) { (a.attr("title") || "string" != typeof a.attr("original-title")) && a.attr("original-title", a.attr("title") || "").removeAttr("title")
	}
	function c(c, d) {
		this.$element = a(c),
		this.options = d,
		this.enabled = !0,
		b(this.$element)
	}
	c.prototype = {
		show: function() {
			var c, d, e, f, g, h, b = this.getTitle();
			if (b && this.enabled) {
				switch (c = this.tip(), c.find(".tipsy-inner")[this.options.html ? "html": "text"](b), c[0].className = "tipsy", c.remove().css({
					top: 0,
					left: 0,
					visibility: "hidden",
					display: "block"
				}).appendTo(document.body), d = a.extend({},
				this.$element.offset(), {
					width: this.$element[0].offsetWidth,
					height: this.$element[0].offsetHeight
				}), e = c[0].offsetWidth, f = c[0].offsetHeight, g = "function" == typeof this.options.gravity ? this.options.gravity.call(this.$element[0]) : this.options.gravity, g.charAt(0)) {
				case "n":
					h = {
						top: d.top + d.height + this.options.offset,
						left: d.left + d.width / 2 - e / 2
					};
					break;
				case "s":
					h = {
						top: d.top - f - this.options.offset,
						left: d.left + d.width / 2 - e / 2
					};
					break;
				case "e":
					h = {
						top: d.top + d.height / 2 - f / 2,
						left: d.left - e - this.options.offset
					};
					break;
				case "w":
					h = {
						top: d.top + d.height / 2 - f / 2,
						left: d.left + d.width + this.options.offset
					}
				}
				2 == g.length && ("w" == g.charAt(1) ? h.left = d.left + d.width / 2 - 15 : (console.log(d, e), h.left = d.left + d.width - e)),
				c.css(h).addClass("tipsy-" + g),
				this.options.fade ? c.stop().css({
					opacity: 0,
					display: "block",
					visibility: "visible"
				}).animate({
					opacity: this.options.opacity
				}) : c.css({
					visibility: "visible",
					opacity: this.options.opacity
				})
			}
		},
		hide: function() {
			this.options.fade ? this.tip().stop().fadeOut(function() {
				a(this).remove()
			}) : this.tip().remove()
		},
		getTitle: function() {
			var a, c = this.$element,
			d = this.options;
			return b(c),
			d = this.options,
			"string" == typeof d.title ? a = c.attr("title" == d.title ? "original-title": d.title) : "function" == typeof d.title && (a = d.title.call(c[0])),
			a = ("" + a).replace(/(^\s*|\s*$)/, ""),
			a || d.fallback
		},
		tip: function() {
			return this.$tip || (this.$tip = a('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"/></div>')),
			this.$tip
		},
		validate: function() {
			this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
		},
		enable: function() {
			this.enabled = !0
		},
		disable: function() {
			this.enabled = !1
		},
		toggleEnabled: function() {
			this.enabled = !this.enabled
		}
	},
	a.fn.tipsy = function(b) {
		function d(d) {
			var e = a.data(d, "tipsy");
			return e || (e = new c(d, a.fn.tipsy.elementOptions(d, b)), a.data(d, "tipsy", e)),
			e
		}
		function e() {
			var a = d(this);
			a.hoverState = "in",
			0 == b.delayIn ? a.show() : setTimeout(function() {
				"in" == a.hoverState && a.show()
			},
			b.delayIn)
		}
		function f() {
			var a = d(this);
			a.hoverState = "out",
			0 == b.delayOut ? a.hide() : setTimeout(function() {
				"out" == a.hoverState && a.hide()
			},
			b.delayOut)
		}
		if (b === !0) return this.data("tipsy");
		if ("string" == typeof b) return this.data("tipsy")[b]();
		if (b = a.extend({},
		a.fn.tipsy.defaults, b), b.live || this.each(function() {
			d(this)
		}), "manual" != b.trigger) {
			var g = b.live ? "live": "bind",
			h = "hover" == b.trigger ? "mouseenter": "focus",
			i = "hover" == b.trigger ? "mouseleave": "blur";
			this[g](h, e)[g](i, f)
		}
		return this
	},
	a.fn.tipsy.defaults = {
		delayIn: 0,
		delayOut: 0,
		fade: !1,
		fallback: "",
		gravity: "n",
		html: !1,
		live: !1,
		offset: 0,
		opacity: .72,
		title: "title",
		trigger: "hover"
	},
	a.fn.tipsy.elementOptions = function(b, c) {
		return a.metadata ? a.extend({},
		c, a(b).metadata()) : c
	},
	a.fn.tipsy.autoNS = function() {
		return a(this).offset().top > a(document).scrollTop() + a(window).height() / 2 ? "s": "n"
	},
	a.fn.tipsy.autoWE = function() {
		return a(this).offset().left > a(document).scrollLeft() + a(window).width() / 2 ? "e": "w"
	}
} (jQuery),
!
function(a, b) {
	var e = function(a, b) {
		function c() {}
		var d;
		return c.prototype.make = function(b) {
			return d = "undefined" != typeof b ? parseInt(b) : 0,
			this[a.options.type](),
			this
		},
		c.prototype.after = function(b) {
			return setTimeout(function() {
				b()
			},
			a.options.animationDuration + 20)
		},
		c.prototype.slider = function() {
			var c = a[a.size] * (a.current - 1),
			e = b.Clones.shift - a.paddings;
			b.Run.isStart() ? (e = a.options.centered ? Math.abs(e) : 0, b.Arrows.disable("prev")) : b.Run.isEnd() ? (e = a.options.centered ? Math.abs(e) : Math.abs(2 * e), b.Arrows.disable("next")) : (e = Math.abs(e), b.Arrows.enable()),
			a.track.css({
				transition: b.Transition.get("all"),
				transform: b.Translate.set(a.axis, c - e - d)
			})
		},
		c.prototype.carousel = function() {
			var c, e = a[a.size] * a.current;
			c = a.options.centered ? b.Clones.shift - a.paddings: b.Clones.shift,
			b.Run.isOffset("<") && (e = 0, b.Run.flag = !1, this.after(function() {
				a.track.css({
					transition: b.Transition.clear("all"),
					transform: b.Translate.set(a.axis, a[a.size] * a.length + c)
				})
			})),
			b.Run.isOffset(">") && (e = a[a.size] * a.length + a[a.size], b.Run.flag = !1, this.after(function() {
				a.track.css({
					transition: b.Transition.clear("all"),
					transform: b.Translate.set(a.axis, a[a.size] + c)
				})
			})),
			a.track.css({
				transition: b.Transition.get("all"),
				transform: b.Translate.set(a.axis, e + c - d)
			})
		},
		c.prototype.slideshow = function() {
			a.slides.css("transition", b.Transition.get("opacity")).eq(a.current - 1).css("opacity", 1).siblings().css("opacity", 0)
		},
		new c
	},
	f = function(a, b) {
		function c() {}
		return c.prototype.instance = function() {
			return {
				current: function() {
					return a.current
				},
				go: function(a, c) {
					b.Run.pause(),
					b.Run.make(a, c),
					b.Run.play()
				},
				jump: function(a, c) {
					b.Transition.jumping = !0,
					b.Animation.after(function() {
						b.Transition.jumping = !1
					}),
					b.Run.make(a, c)
				},
				move: function(a) {
					b.Transition.jumping = !0,
					b.Animation.make(a),
					b.Transition.jumping = !1
				},
				start: function(c) {
					b.Run.running = !0,
					a.options.autoplay = parseInt(c),
					b.Run.play()
				},
				play: function() {
					return b.Run.play()
				},
				pause: function() {
					return b.Run.pause()
				},
				destroy: function() {
					b.Run.pause(),
					b.Clones.remove(),
					b.Helper.removeStyles([a.track, a.slides]),
					b.Bullets.remove(),
					a.slider.removeData("glide_api"),
					b.Events.unbind(),
					b.Touch.unbind(),
					b.Arrows.unbind(),
					b.Bullets.unbind(),
					delete a.slider,
					delete a.track,
					delete a.slides,
					delete a.width,
					delete a.length
				},
				refresh: function() {
					b.Run.pause(),
					a.collect(),
					a.setup(),
					b.Clones.remove().init(),
					b.Bullets.remove().init(),
					b.Build.init(),
					b.Run.make("=" + parseInt(a.options.startAt), b.Run.play())
				}
			}
		},
		new c
	},
	g = function(b, c) {
		function d() {
			this.build(),
			this.bind()
		}
		return d.prototype.build = function() {
			this.wrapper = b.slider.find("." + b.options.classes.arrows),
			this.items = this.wrapper.children()
		},
		d.prototype.disable = function(a) {
			var d = b.options.classes;
			this.items.filter("." + d["arrow" + c.Helper.capitalise(a)]).unbind("click.glide touchstart.glide").addClass(d.disabled).siblings().bind("click.glide touchstart.glide", this.click).bind("mouseenter.glide", this.hover).bind("mouseleave.glide", this.hover).removeClass(d.disabled)
		},
		d.prototype.enable = function() {
			this.bind(),
			this.items.removeClass(b.options.classes.disabled)
		},
		d.prototype.click = function(b) {
			b.preventDefault(),
			c.Events.disabled || (c.Run.pause(), c.Run.make(a(this).data("glide-dir")), c.Animation.after(function() {
				c.Run.play()
			}))
		},
		d.prototype.hover = function(a) {
			if (!c.Events.disabled) switch (a.type) {
			case "mouseleave":
				c.Run.play();
				break;
			case "mouseenter":
				c.Run.pause()
			}
		},
		d.prototype.bind = function() {
			this.items.on("click.glide touchstart.glide", this.click).on("mouseenter.glide", this.hover).on("mouseleave.glide", this.hover)
		},
		d.prototype.unbind = function() {
			this.items.off("click.glide touchstart.glide").off("mouseenter.glide").off("mouseleave.glide")
		},
		new d
	},
	h = function(a, b) {
		function c() {
			this.init()
		}
		return c.prototype.init = function() {
			this[a.options.type](),
			this.active(),
			b.Height.set()
		},
		c.prototype.isType = function(b) {
			return a.options.type === b
		},
		c.prototype.isMode = function(b) {
			return a.options.mode === b
		},
		c.prototype.slider = function() {
			b.Transition.jumping = !0,
			a.slides[a.size](a[a.size]),
			a.track.css(a.size, a[a.size] * a.length),
			this.isMode("vertical") && b.Height.set(!0),
			b.Animation.make(),
			b.Transition.jumping = !1
		},
		c.prototype.carousel = function() {
			b.Transition.jumping = !0,
			b.Clones.shift = a[a.size] * b.Clones.items.length / 2 - a[a.size],
			a.slides[a.size](a[a.size]),
			a.track.css(a.size, a[a.size] * a.length + b.Clones.getGrowth()),
			this.isMode("vertical") && b.Height.set(!0),
			b.Animation.make(),
			b.Clones.append(),
			b.Transition.jumping = !1
		},
		c.prototype.slideshow = function() {
			b.Transition.jumping = !0,
			b.Animation.make(),
			b.Transition.jumping = !1
		},
		c.prototype.active = function() {
			a.slides.eq(a.current - 1).addClass(a.options.classes.active).siblings().removeClass(a.options.classes.active)
		},
		new c
	},
	i = function(b, c) {
		function d() {
			this.init(),
			this.bind()
		}
		return d.prototype.init = function() {
			return this.build(),
			this.active(),
			this
		},
		d.prototype.build = function() {
			this.wrapper = b.slider.children("." + b.options.classes.bullets);
			for (var c = 1; c <= b.length; c++) a("<button>", {
				"class": b.options.classes.bullet,
				"data-glide-dir": "=" + c
			}).appendTo(this.wrapper);
			this.items = this.wrapper.children()
		},
		d.prototype.active = function() {
			this.items.eq(b.current - 1).addClass("active").siblings().removeClass("active")
		},
		d.prototype.remove = function() {
			return this.items.remove(),
			this
		},
		d.prototype.click = function(b) {
			b.preventDefault(),
			c.Events.disabled || (c.Run.pause(), c.Run.make(a(this).data("glide-dir")), c.Animation.after(function() {
				c.Run.play()
			}))
		},
		d.prototype.hover = function(a) {
			if (!c.Events.disabled) switch (a.type) {
			case "mouseleave":
				c.Run.play();
				break;
			case "mouseenter":
				c.Run.pause()
			}
		},
		d.prototype.bind = function() {
			this.wrapper.on("click.glide touchstart.glide", "button", this.click).on("mouseenter.glide", "button", this.hover).on("mouseleave.glide", "button", this.hover)
		},
		d.prototype.unbind = function() {
			this.wrapper.off("click.glide touchstart.glide", "button").off("mouseenter.glide", "button").off("mouseleave.glide", "button")
		},
		new d
	},
	j = function(a) {
		function c() {
			this.items = [],
			this.shift = 0,
			this.init()
		}
		var d, e = [0, 1];
		return c.prototype.init = function() {
			return this.map(),
			this.collect(),
			this
		},
		c.prototype.map = function() {
			var a;
			for (d = [], a = 0; a < e.length; a++) d.push( - 1 - a, a)
		},
		c.prototype.collect = function() {
			var b, c;
			for (c = 0; c < d.length; c++) b = a.slides.eq(d[c]).clone().addClass(a.options.classes.clone),
			this.items.push(b)
		},
		c.prototype.append = function() {
			var b, c;
			for (b = 0; b < this.items.length; b++) c = this.items[b][a.size](a[a.size]),
			d[b] >= 0 ? c.appendTo(a.track) : c.prependTo(a.track)
		},
		c.prototype.remove = function() {
			var a;
			for (a = 0; a < this.items.length; a++) this.items[a].remove();
			return this
		},
		c.prototype.getGrowth = function() {
			return a.width * this.items.length
		},
		new c
	},
	k = function(a, b) {
		function c() {
			for (var c in b) this[c] = new b[c](a, this)
		}
		return new c
	},
	l = function(c, d) {
		function e() {
			this.disabled = !1,
			this.keyboard(),
			this.hoverpause(),
			this.resize(),
			this.bindTriggers()
		}
		var f = a("[data-glide-trigger]");
		return e.prototype.keyboard = function() {
			c.options.keyboard && a(b).on("keyup.glide",
			function(a) {
				39 === a.keyCode && d.Run.make(">"),
				37 === a.keyCode && d.Run.make("<")
			})
		},
		e.prototype.hoverpause = function() {
			c.options.hoverpause && c.track.on("mouseover.glide",
			function() {
				d.Run.pause(),
				d.Events.trigger("mouseOver")
			}).on("mouseout.glide",
			function() {
				d.Run.play(),
				d.Events.trigger("mouseOut")
			})
		},
		e.prototype.resize = function() {
			a(b).on("resize.glide." + c.uuid, d.Helper.throttle(function() {
				d.Transition.jumping = !0,
				c.setup(),
				d.Build.init(),
				d.Run.make("=" + c.current, !1),
				d.Run.play(),
				d.Transition.jumping = !1
			},
			c.options.throttle))
		},
		e.prototype.bindTriggers = function() {
			f.length && f.off("click.glide touchstart.glide").on("click.glide touchstart.glide", this.handleTrigger)
		},
		e.prototype.handleTrigger = function(b) {
			var c, d, e;
			if (b.preventDefault(), c = a(this).data("glide-trigger").split(" "), !this.disabled) for (d in c) e = a(c[d]).data("glide_api"),
			e.pause(),
			e.go(a(this).data("glide-dir"), this.activeTrigger),
			e.play()
		},
		e.prototype.disable = function() {
			return this.disabled = !0,
			this
		},
		e.prototype.enable = function() {
			return this.disabled = !1,
			this
		},
		e.prototype.detachClicks = function() {
			return c.track.find("a").each(function(b, c) {
				a(c).attr("data-href", a(c).attr("href")).removeAttr("href")
			}),
			this
		},
		e.prototype.attachClicks = function() {
			return c.track.find("a").each(function(b, c) {
				a(c).attr("href", a(c).attr("data-href"))
			}),
			this
		},
		e.prototype.preventClicks = function(a) {
			return "mousemove" === a.type && c.track.one("click", "a",
			function(a) {
				a.preventDefault()
			}),
			this
		},
		e.prototype.call = function(a) {
			return "undefined" !== a && "function" == typeof a && a(this.getParams()),
			this
		},
		e.prototype.trigger = function(a) {
			return c.slider.trigger(a + ".glide", [this.getParams()]),
			this
		},
		e.prototype.getParams = function() {
			return {
				index: c.current,
				length: c.slides.length,
				current: c.slides.eq(c.current - 1),
				slider: c.slider,
				swipe: {
					distance: d.Touch.distance || 0
				}
			}
		},
		e.prototype.unbind = function() {
			c.track.off("keyup.glide").off("mouseover.glide").off("mouseout.glide"),
			f.off("click.glide touchstart.glide"),
			a(b).off("keyup.glide").off("resize.glide." + c._uid)
		},
		new e
	},
	m = function(a, b) {
		function c() {
			a.options.autoheight && a.wrapper.css({
				transition: b.Transition.get("height")
			})
		}
		return c.prototype.get = function() {
			var b = "y" === a.axis ? 2 * a.paddings: 0;
			return a.slides.eq(a.current - 1).height() + b
		},
		c.prototype.set = function(b) {
			return a.options.autoheight || b ? a.wrapper.height(this.get()) : !1
		},
		new c
	},
	n = function(a) {
		function c() {}
		return c.prototype.byAxis = function(b, c) {
			return "y" === a.axis ? c: b
		},
		c.prototype.capitalise = function(a) {
			return a.charAt(0).toUpperCase() + a.slice(1)
		},
		c.prototype.now = Date.now ||
		function() {
			return (new Date).getTime()
		},
		c.prototype.throttle = function(a, b, c) {
			var d, e, f, j, g = this,
			h = null,
			i = 0;
			return c || (c = {}),
			j = function() {
				i = c.leading === !1 ? 0 : g.now(),
				h = null,
				f = a.apply(d, e),
				h || (d = e = null)
			},
			function() {
				var l, k = g.now();
				return i || c.leading !== !1 || (i = k),
				l = b - (k - i),
				d = this,
				e = arguments,
				0 >= l || l > b ? (h && (clearTimeout(h), h = null), i = k, f = a.apply(d, e), h || (d = e = null)) : h || c.trailing === !1 || (h = setTimeout(j, l)),
				f
			}
		},
		c.prototype.removeStyles = function(a) {
			for (var b = 0; b < a.length; b++) a[b].removeAttr("style")
		},
		new c
	},
	o = function(a, b) {
		function c() {
			this.running = !1,
			this.flag = !1,
			this.play()
		}
		return c.prototype.play = function() {
			var b = this;
			return (a.options.autoplay || this.running) && "undefined" == typeof this.interval && (this.interval = setInterval(function() {
				b.pause(),
				b.make(">"),
				b.play()
			},
			this.getInterval())),
			this.interval
		},
		c.prototype.getInterval = function() {
			return parseInt(a.slides.eq(a.current - 1).data("glide-autoplay")) || a.options.autoplay
		},
		c.prototype.pause = function() {
			return (a.options.autoplay || this.running) && this.interval >= 0 && (this.interval = clearInterval(this.interval)),
			this.interval
		},
		c.prototype.isStart = function() {
			return 1 === a.current
		},
		c.prototype.isEnd = function() {
			return a.current === a.length
		},
		c.prototype.isOffset = function(a) {
			return this.flag && this.direction === a
		},
		c.prototype.make = function(c, d) {
			var e = this;
			switch (this.direction = c.substr(0, 1), this.steps = c.substr(1) ? c.substr(1) : 0, a.options.hoverpause || this.pause(), d !== !1 && b.Events.disable().call(a.options.beforeTransition).trigger("beforeTransition"), this.direction) {
			case ">":
				this.isEnd() ? (a.current = 1, this.flag = !0) : a.current = ">" === this.steps ? a.length: a.current + 1;
				break;
			case "<":
				this.isStart() ? (a.current = a.length, this.flag = !0) : a.current = "<" === this.steps ? 1 : a.current - 1;
				break;
			case "=":
				a.current = parseInt(this.steps)
			}
			b.Height.set(),
			b.Bullets.active(),
			b.Animation.make().after(function() {
				b.Build.active(),
				d !== !1 && b.Events.enable().call(d).call(a.options.afterTransition).trigger("afterTransition"),
				a.options.hoverpause || e.play()
			}),
			b.Events.call(a.options.duringTransition).trigger("duringTransition")
		},
		new c
	},
	p = function(b, c) {
		function d() {
			this.dragging = !1,
			b.options.touchDistance && b.track.on({
				"touchstart.glide": a.proxy(this.start, this)
			}),
			b.options.dragDistance && b.track.on({
				"mousedown.glide": a.proxy(this.start, this)
			})
		}
		var e;
		return d.prototype.unbind = function() {
			b.track.off("touchstart.glide mousedown.glide").off("touchmove.glide mousemove.glide").off("touchend.glide touchcancel.glide mouseup.glide mouseleave.glide")
		},
		d.prototype.start = function(d) {
			c.Events.disabled || this.dragging || (e = "mousedown" === d.type ? d.originalEvent: d.originalEvent.touches[0] || d.originalEvent.changedTouches[0], c.Transition.jumping = !0, this.touchStartX = parseInt(e.pageX), this.touchStartY = parseInt(e.pageY), this.touchSin = null, this.dragging = !0, b.track.on({
				"touchmove.glide mousemove.glide": c.Helper.throttle(a.proxy(this.move, this), b.options.throttle),
				"touchend.glide touchcancel.glide mouseup.glide mouseleave.glide": a.proxy(this.end, this)
			}), c.Events.detachClicks().call(b.options.swipeStart).trigger("swipeStart"), c.Run.pause())
		},
		d.prototype.move = function(a) {
			if (!c.Events.disabled && this.dragging) {
				e = "mousemove" === a.type ? a.originalEvent: a.originalEvent.touches[0] || a.originalEvent.changedTouches[0];
				var d = parseInt(e.pageX) - this.touchStartX,
				f = parseInt(e.pageY) - this.touchStartY,
				g = Math.abs(d << 2),
				h = Math.abs(f << 2),
				i = Math.sqrt(g + h),
				j = Math.sqrt(c.Helper.byAxis(h, g));
				if (this.touchSin = Math.asin(j / i), this.distance = c.Helper.byAxis(e.pageX - this.touchStartX, e.pageY - this.touchStartY), 180 * this.touchSin / Math.PI < 45 && c.Animation.make(c.Helper.byAxis(d, f)), c.Events.preventClicks(a).call(b.options.swipeMove).trigger("swipeMove"), c.Build.isMode("vertical")) {
					if (c.Run.isStart() && f > 0) return;
					if (c.Run.isEnd() && 0 > f) return
				}
				if (! (180 * this.touchSin / Math.PI < 45)) return;
				a.stopPropagation(),
				a.preventDefault(),
				b.track.addClass(b.options.classes.dragging)
			}
		},
		d.prototype.end = function(a) {
			var d, f, g; ! c.Events.disabled && this.dragging && (e = "mouseup" === a.type || "mouseleave" === a.type ? a.originalEvent: a.originalEvent.touches[0] || a.originalEvent.changedTouches[0], f = c.Helper.byAxis(e.pageX - this.touchStartX, e.pageY - this.touchStartY), g = 180 * this.touchSin / Math.PI, c.Transition.jumping = !1, c.Build.isType("slider") && (c.Run.isStart() && f > 0 && (f = 0), c.Run.isEnd() && 0 > f && (f = 0)), d = "mouseup" === a.type || "mouseleave" === a.type ? b.options.dragDistance: b.options.touchDistance, f > d && 45 > g ? c.Run.make("<") : -d > f && 45 > g ? c.Run.make(">") : c.Animation.make(), c.Animation.after(function() {
				c.Events.enable(),
				c.Run.play()
			}), this.dragging = !1, c.Events.attachClicks().disable().call(b.options.swipeEnd).trigger("swipeEnd"), b.track.removeClass(b.options.classes.dragging).off("touchmove.glide mousemove.glide").off("touchend.glide touchcancel.glide mouseup.glide mouseleave.glide"))
		},
		new d
	},
	q = function(a) {
		function c() {
			this.jumping = !1
		}
		return c.prototype.get = function(b) {
			return this.jumping ? this.clear("all") : b + " " + a.options.animationDuration + "ms " + a.options.animationTimingFunc
		},
		c.prototype.clear = function(b) {
			return b + " 0ms " + a.options.animationTimingFunc
		},
		new c
	},
	r = function() {
		function c() {}
		var d = {
			x: 0,
			y: 0,
			z: 0
		};
		return c.prototype.set = function(a, b) {
			return d[a] = parseInt(b),
			"translate3d(" + -1 * d.x + "px, " + -1 * d.y + "px, " + -1 * d.z + "px)"
		},
		new c
	},
	s = function(b, c) {
		var s, d = {
			autoplay: 4e3,
			type: "carousel",
			mode: "horizontal",
			startAt: 1,
			hoverpause: !0,
			keyboard: !0,
			touchDistance: 80,
			dragDistance: 120,
			animationDuration: 400,
			animationTimingFunc: "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
			throttle: 16,
			autoheight: !1,
			paddings: 0,
			centered: !0,
			classes: {
				base: "glide",
				wrapper: "glide__wrapper",
				track: "glide__track",
				slide: "glide__slide",
				arrows: "glide__arrows",
				arrow: "glide__arrow",
				arrowNext: "next",
				arrowPrev: "prev",
				bullets: "glide__bullets",
				bullet: "glide__bullet",
				clone: "clone",
				active: "active",
				dragging: "dragging",
				disabled: "disabled"
			},
			beforeInit: function() {},
			afterInit: function() {},
			beforeTransition: function() {},
			duringTransition: function() {},
			afterTransition: function() {},
			swipeStart: function() {},
			swipeEnd: function() {},
			swipeMove: function() {}
		};
		return this.options = a.extend({},
		d, c),
		this.uuid = Math.floor(1e3 * Math.random()),
		this.current = parseInt(this.options.startAt),
		this.element = b,
		this.collect(),
		this.setup(),
		this.options.beforeInit({
			index: this.current,
			length: this.slides.length,
			current: this.slides.eq(this.current - 1),
			slider: this.slider
		}),
		s = new k(this, {
			Helper: n,
			Translate: r,
			Transition: q,
			Run: o,
			Animation: e,
			Clones: j,
			Arrows: g,
			Bullets: i,
			Height: m,
			Build: h,
			Events: l,
			Touch: p,
			Api: f
		}),
		s.Events.call(this.options.afterInit),
		s.Api.instance()
	};
	s.prototype.collect = function() {
		var a = this.options,
		b = a.classes;
		this.slider = this.element.addClass(b.base + "--" + a.type).addClass(b.base + "--" + a.mode),
		this.track = this.slider.find("." + b.track),
		this.wrapper = this.slider.find("." + b.wrapper),
		this.slides = this.track.find("." + b.slide).not("." + b.clone)
	},
	s.prototype.setup = function() {
		var a = {
			horizontal: ["width", "x"],
			vertical: ["height", "y"]
		};
		this.size = a[this.options.mode][0],
		this.axis = a[this.options.mode][1],
		this.length = this.slides.length,
		this.paddings = this.getPaddings(),
		this[this.size] = this.getSize()
	},
	s.prototype.getPaddings = function() {
		var b, c, a = this.options.paddings;
		return "string" == typeof a ? (b = parseInt(a, 10), c = a.indexOf("%") >= 0, c ? parseInt(this.slider[this.size]() * (b / 100)) : b) : a
	},
	s.prototype.getSize = function() {
		return this.slider[this.size]() - 2 * this.paddings
	},
	a.fn.glide = function(b) {
		return this.each(function() {
			a.data(this, "glide_api") || a.data(this, "glide_api", new s(a(this), b))
		})
	}
} (jQuery, window, document),
!
function(a) {
	var b = window.Chicago || {
		utils: {
			now: Date.now ||
			function() {
				return (new Date).getTime()
			},
			uid: function(a) {
				return (a || "id") + b.utils.now() + "RAND" + Math.ceil(1e5 * Math.random())
			},
			is: {
				number: function(a) {
					return ! isNaN(parseFloat(a)) && isFinite(a)
				},
				fn: function(a) {
					return "function" == typeof a
				},
				object: function(a) {
					return "[object Object]" === Object.prototype.toString.call(a)
				}
			},
			debounce: function(a, b, c) {
				var d;
				return function() {
					var e = this,
					f = arguments,
					g = function() {
						d = null,
						c || a.apply(e, f)
					},
					h = c && !d;
					d && clearTimeout(d),
					d = setTimeout(g, b),
					h && a.apply(e, f)
				}
			}
		},
		$: window.jQuery || null
	};
	if ("function" == typeof define && define.amd && define("chicago",
	function() {
		return b.load = function(a, c, d, e) {
			var i, j, f = a.split(","),
			g = [],
			h = (e.config && e.config.chicago && e.config.chicago.base ? e.config.chicago.base: "").replace(/\/+$/g, "");
			if (!h) throw new Error("Please define base path to jQuery resize.end in the requirejs config.");
			for (i = 0; i < f.length;) j = f[i].replace(/\./g, "/"),
			g.push(h + "/" + j),
			i += 1;
			c(g,
			function() {
				d(b)
			})
		},
		b
	}), window && window.jQuery) return a(b, window, window.document);
	if (!window.jQuery) throw new Error("jQuery resize.end requires jQuery")
} (function(a, b, c) {
	a.$win = a.$(b),
	a.$doc = a.$(c),
	a.events || (a.events = {}),
	a.events.resizeend = {
		defaults: {
			delay: 250
		},
		setup: function() {
			var b, e, f, g, h, c = arguments,
			d = {
				delay: a.$.event.special.resizeend.defaults.delay
			};
			return a.utils.is.fn(c[0]) ? b = c[0] : a.utils.is.number(c[0]) ? d.delay = c[0] : a.utils.is.object(c[0]) && (d = a.$.extend({},
			d, c[0])),
			e = a.utils.uid("resizeend"),
			f = a.$.extend({
				delay: a.$.event.special.resizeend.defaults.delay
			},
			d),
			g = f,
			h = function(b) {
				g && clearTimeout(g),
				g = setTimeout(function() {
					return g = null,
					b.type = "resizeend.chicago.dom",
					a.$(b.target).trigger("resizeend", b)
				},
				f.delay)
			},
			a.$(this).data("chicago.event.resizeend.uid", e),
			a.$(this).on("resize", a.utils.debounce(h, 100)).data(e, h)
		},
		teardown: function() {
			var b = a.$(this).data("chicago.event.resizeend.uid");
			return a.$(this).off("resize", a.$(this).data(b)),
			a.$(this).removeData(b),
			a.$(this).removeData("chicago.event.resizeend.uid")
		}
	},
	function() {
		a.$.event.special.resizeend = a.events.resizeend,
		a.$.fn.resizeend = function(b, c) {
			return this.each(function() {
				a.$(this).on("resizeend", b, c)
			})
		}
	} ()
}),
function(a) {
	a.fn.qrcode = function(b) {
		function d(a) {
			this.mode = c,
			this.data = a
		}
		function e(a, b) {
			this.typeNumber = a,
			this.errorCorrectLevel = b,
			this.modules = null,
			this.moduleCount = 0,
			this.dataCache = null,
			this.dataList = []
		}
		function f(a, b) {
			var c, d;
			if (void 0 == a.length) throw Error(a.length + "/" + b);
			for (c = 0; c < a.length && 0 == a[c];) c++;
			for (this.num = Array(a.length - c + b), d = 0; d < a.length - c; d++) this.num[d] = a[d + c]
		}
		function g(a, b) {
			this.totalCount = a,
			this.dataCount = b
		}
		function h() {
			this.buffer = [],
			this.length = 0
		}
		var c, i, j, k;
		for (d.prototype = {
			getLength: function() {
				return this.data.length
			},
			write: function(a) {
				for (var b = 0; b < this.data.length; b++) a.put(this.data.charCodeAt(b), 8)
			}
		},
		e.prototype = {
			addData: function(a) {
				this.dataList.push(new d(a)),
				this.dataCache = null
			},
			isDark: function(a, b) {
				if (0 > a || this.moduleCount <= a || 0 > b || this.moduleCount <= b) throw Error(a + "," + b);
				return this.modules[a][b]
			},
			getModuleCount: function() {
				return this.moduleCount
			},
			make: function() {
				var a, b, c, d, e;
				if (1 > this.typeNumber) {
					for (a = 1, a = 1; 40 > a; a++) {
						for (b = g.getRSBlocks(a, this.errorCorrectLevel), c = new h, d = 0, e = 0; e < b.length; e++) d += b[e].dataCount;
						for (e = 0; e < this.dataList.length; e++) b = this.dataList[e],
						c.put(b.mode, 4),
						c.put(b.getLength(), i.getLengthInBits(b.mode, a)),
						b.write(c);
						if (c.getLengthInBits() <= 8 * d) break
					}
					this.typeNumber = a
				}
				this.makeImpl(!1, this.getBestMaskPattern())
			},
			makeImpl: function(a, b) {
				var c, d;
				for (this.moduleCount = 4 * this.typeNumber + 17, this.modules = Array(this.moduleCount), c = 0; c < this.moduleCount; c++) for (this.modules[c] = Array(this.moduleCount), d = 0; d < this.moduleCount; d++) this.modules[c][d] = null;
				this.setupPositionProbePattern(0, 0),
				this.setupPositionProbePattern(this.moduleCount - 7, 0),
				this.setupPositionProbePattern(0, this.moduleCount - 7),
				this.setupPositionAdjustPattern(),
				this.setupTimingPattern(),
				this.setupTypeInfo(a, b),
				7 <= this.typeNumber && this.setupTypeNumber(a),
				null == this.dataCache && (this.dataCache = e.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)),
				this.mapData(this.dataCache, b)
			},
			setupPositionProbePattern: function(a, b) {
				var c, d;
				for (c = -1; 7 >= c; c++) if (! ( - 1 >= a + c || this.moduleCount <= a + c)) for (d = -1; 7 >= d; d++) - 1 >= b + d || this.moduleCount <= b + d || (this.modules[a + c][b + d] = c >= 0 && 6 >= c && (0 == d || 6 == d) || d >= 0 && 6 >= d && (0 == c || 6 == c) || c >= 2 && 4 >= c && d >= 2 && 4 >= d ? !0 : !1)
			},
			getBestMaskPattern: function() {
				var a, b, c, d;
				for (a = 0, b = 0, c = 0; 8 > c; c++) this.makeImpl(!0, c),
				d = i.getLostPoint(this),
				(0 == c || a > d) && (a = d, b = c);
				return b
			},
			createMovieClip: function(a, b, c) {
				var d, e;
				for (a = a.createEmptyMovieClip(b, c), this.make(), b = 0; b < this.modules.length; b++) for (c = 1 * b, d = 0; d < this.modules[b].length; d++) e = 1 * d,
				this.modules[b][d] && (a.beginFill(0, 100), a.moveTo(e, c), a.lineTo(e + 1, c), a.lineTo(e + 1, c + 1), a.lineTo(e, c + 1), a.endFill());
				return a
			},
			setupTimingPattern: function() {
				for (var a = 8; a < this.moduleCount - 8; a++) null == this.modules[a][6] && (this.modules[a][6] = 0 == a % 2);
				for (a = 8; a < this.moduleCount - 8; a++) null == this.modules[6][a] && (this.modules[6][a] = 0 == a % 2)
			},
			setupPositionAdjustPattern: function() {
				var a, b, c, d, e, f, g;
				for (a = i.getPatternPosition(this.typeNumber), b = 0; b < a.length; b++) for (c = 0; c < a.length; c++) if (d = a[b], e = a[c], null == this.modules[d][e]) for (f = -2; 2 >= f; f++) for (g = -2; 2 >= g; g++) this.modules[d + f][e + g] = -2 == f || 2 == f || -2 == g || 2 == g || 0 == f && 0 == g ? !0 : !1
			},
			setupTypeNumber: function(a) {
				var b, c, d;
				for (b = i.getBCHTypeNumber(this.typeNumber), c = 0; 18 > c; c++) d = !a && 1 == (1 & b >> c),
				this.modules[Math.floor(c / 3)][c % 3 + this.moduleCount - 8 - 3] = d;
				for (c = 0; 18 > c; c++) d = !a && 1 == (1 & b >> c),
				this.modules[c % 3 + this.moduleCount - 8 - 3][Math.floor(c / 3)] = d
			},
			setupTypeInfo: function(a, b) {
				var c, d, e;
				for (c = i.getBCHTypeInfo(this.errorCorrectLevel << 3 | b), d = 0; 15 > d; d++) e = !a && 1 == (1 & c >> d),
				6 > d ? this.modules[d][8] = e: 8 > d ? this.modules[d + 1][8] = e: this.modules[this.moduleCount - 15 + d][8] = e;
				for (d = 0; 15 > d; d++) e = !a && 1 == (1 & c >> d),
				8 > d ? this.modules[8][this.moduleCount - d - 1] = e: 9 > d ? this.modules[8][15 - d - 1 + 1] = e: this.modules[8][15 - d - 1] = e;
				this.modules[this.moduleCount - 8][8] = !a
			},
			mapData: function(a, b) {
				var c, d, e, f, g, h, j;
				for (c = -1, d = this.moduleCount - 1, e = 7, f = 0, g = this.moduleCount - 1; g > 0; g -= 2) for (6 == g && g--;;) {
					for (h = 0; 2 > h; h++) null == this.modules[d][g - h] && (j = !1, f < a.length && (j = 1 == (1 & a[f] >>> e)), i.getMask(b, d, g - h) && (j = !j), this.modules[d][g - h] = j, e--, -1 == e && (f++, e = 7));
					if (d += c, 0 > d || this.moduleCount <= d) {
						d -= c,
						c = -c;
						break
					}
				}
			}
		},
		e.PAD0 = 236, e.PAD1 = 17, e.createData = function(a, b, c) {
			var d, f, j;
			for (b = g.getRSBlocks(a, b), d = new h, f = 0; f < c.length; f++) j = c[f],
			d.put(j.mode, 4),
			d.put(j.getLength(), i.getLengthInBits(j.mode, a)),
			j.write(d);
			for (f = a = 0; f < b.length; f++) a += b[f].dataCount;
			if (d.getLengthInBits() > 8 * a) throw Error("code length overflow. (" + d.getLengthInBits() + ">" + 8 * a + ")");
			for (d.getLengthInBits() + 4 <= 8 * a && d.put(0, 4); 0 != d.getLengthInBits() % 8;) d.putBit(!1);
			for (; ! (d.getLengthInBits() >= 8 * a) && (d.put(e.PAD0, 8), !(d.getLengthInBits() >= 8 * a));) d.put(e.PAD1, 8);
			return e.createBytes(d, b)
		},
		e.createBytes = function(a, b) {
			var c, d, e, g, h, j, k, l, m;
			for (c = 0, d = 0, e = 0, g = Array(b.length), h = Array(b.length), j = 0; j < b.length; j++) {
				for (k = b[j].dataCount, l = b[j].totalCount - k, d = Math.max(d, k), e = Math.max(e, l), g[j] = Array(k), m = 0; m < g[j].length; m++) g[j][m] = 255 & a.buffer[m + c];
				for (c += k, m = i.getErrorCorrectPolynomial(l), k = new f(g[j], m.getLength() - 1).mod(m), h[j] = Array(m.getLength() - 1), m = 0; m < h[j].length; m++) l = m + k.getLength() - h[j].length,
				h[j][m] = l >= 0 ? k.get(l) : 0
			}
			for (m = j = 0; m < b.length; m++) j += b[m].totalCount;
			for (c = Array(j), m = k = 0; d > m; m++) for (j = 0; j < b.length; j++) m < g[j].length && (c[k++] = g[j][m]);
			for (m = 0; e > m; m++) for (j = 0; j < b.length; j++) m < h[j].length && (c[k++] = h[j][m]);
			return c
		},
		c = 4, i = {
			PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
			G15: 1335,
			G18: 7973,
			G15_MASK: 21522,
			getBCHTypeInfo: function(a) {
				for (var b = a << 10; 0 <= i.getBCHDigit(b) - i.getBCHDigit(i.G15);) b ^= i.G15 << i.getBCHDigit(b) - i.getBCHDigit(i.G15);
				return (a << 10 | b) ^ i.G15_MASK
			},
			getBCHTypeNumber: function(a) {
				for (var b = a << 12; 0 <= i.getBCHDigit(b) - i.getBCHDigit(i.G18);) b ^= i.G18 << i.getBCHDigit(b) - i.getBCHDigit(i.G18);
				return a << 12 | b
			},
			getBCHDigit: function(a) {
				for (var b = 0; 0 != a;) b++,
				a >>>= 1;
				return b
			},
			getPatternPosition: function(a) {
				return i.PATTERN_POSITION_TABLE[a - 1]
			},
			getMask: function(a, b, c) {
				switch (a) {
				case 0:
					return 0 == (b + c) % 2;
				case 1:
					return 0 == b % 2;
				case 2:
					return 0 == c % 3;
				case 3:
					return 0 == (b + c) % 3;
				case 4:
					return 0 == (Math.floor(b / 2) + Math.floor(c / 3)) % 2;
				case 5:
					return 0 == b * c % 2 + b * c % 3;
				case 6:
					return 0 == (b * c % 2 + b * c % 3) % 2;
				case 7:
					return 0 == (b * c % 3 + (b + c) % 2) % 2;
				default:
					throw Error("bad maskPattern:" + a)
				}
			},
			getErrorCorrectPolynomial: function(a) {
				for (var b = new f([1], 0), c = 0; a > c; c++) b = b.multiply(new f([1, j.gexp(c)], 0));
				return b
			},
			getLengthInBits: function(a, b) {
				if (b >= 1 && 10 > b) switch (a) {
				case 1:
					return 10;
				case 2:
					return 9;
				case c:
					return 8;
				case 8:
					return 8;
				default:
					throw Error("mode:" + a)
				} else if (27 > b) switch (a) {
				case 1:
					return 12;
				case 2:
					return 11;
				case c:
					return 16;
				case 8:
					return 10;
				default:
					throw Error("mode:" + a)
				} else {
					if (! (41 > b)) throw Error("type:" + b);
					switch (a) {
					case 1:
						return 14;
					case 2:
						return 13;
					case c:
						return 16;
					case 8:
						return 12;
					default:
						throw Error("mode:" + a)
					}
				}
			},
			getLostPoint: function(a) {
				var b, c, d, e, f, g, h, i;
				for (b = a.getModuleCount(), c = 0, d = 0; b > d; d++) for (e = 0; b > e; e++) {
					for (f = 0, g = a.isDark(d, e), h = -1; 1 >= h; h++) if (! (0 > d + h || d + h >= b)) for (i = -1; 1 >= i; i++) 0 > e + i || e + i >= b || 0 == h && 0 == i || g == a.isDark(d + h, e + i) && f++;
					f > 5 && (c += 3 + f - 5)
				}
				for (d = 0; b - 1 > d; d++) for (e = 0; b - 1 > e; e++) f = 0,
				a.isDark(d, e) && f++,
				a.isDark(d + 1, e) && f++,
				a.isDark(d, e + 1) && f++,
				a.isDark(d + 1, e + 1) && f++,
				(0 == f || 4 == f) && (c += 3);
				for (d = 0; b > d; d++) for (e = 0; b - 6 > e; e++) a.isDark(d, e) && !a.isDark(d, e + 1) && a.isDark(d, e + 2) && a.isDark(d, e + 3) && a.isDark(d, e + 4) && !a.isDark(d, e + 5) && a.isDark(d, e + 6) && (c += 40);
				for (e = 0; b > e; e++) for (d = 0; b - 6 > d; d++) a.isDark(d, e) && !a.isDark(d + 1, e) && a.isDark(d + 2, e) && a.isDark(d + 3, e) && a.isDark(d + 4, e) && !a.isDark(d + 5, e) && a.isDark(d + 6, e) && (c += 40);
				for (e = f = 0; b > e; e++) for (d = 0; b > d; d++) a.isDark(d, e) && f++;
				return a = Math.abs(100 * f / b / b - 50) / 5,
				c + 10 * a
			}
		},
		j = {
			glog: function(a) {
				if (1 > a) throw Error("glog(" + a + ")");
				return j.LOG_TABLE[a]
			},
			gexp: function(a) {
				for (; 0 > a;) a += 255;
				for (; a >= 256;) a -= 255;
				return j.EXP_TABLE[a]
			},
			EXP_TABLE: Array(256),
			LOG_TABLE: Array(256)
		},
		k = 0; 8 > k; k++) j.EXP_TABLE[k] = 1 << k;
		for (k = 8; 256 > k; k++) j.EXP_TABLE[k] = j.EXP_TABLE[k - 4] ^ j.EXP_TABLE[k - 5] ^ j.EXP_TABLE[k - 6] ^ j.EXP_TABLE[k - 8];
		for (k = 0; 255 > k; k++) j.LOG_TABLE[j.EXP_TABLE[k]] = k;
		return f.prototype = {
			get: function(a) {
				return this.num[a]
			},
			getLength: function() {
				return this.num.length
			},
			multiply: function(a) {
				var b, c, d;
				for (b = Array(this.getLength() + a.getLength() - 1), c = 0; c < this.getLength(); c++) for (d = 0; d < a.getLength(); d++) b[c + d] ^= j.gexp(j.glog(this.get(c)) + j.glog(a.get(d)));
				return new f(b, 0)
			},
			mod: function(a) {
				if (0 > this.getLength() - a.getLength()) return this;
				for (var b = j.glog(this.get(0)) - j.glog(a.get(0)), c = Array(this.getLength()), d = 0; d < this.getLength(); d++) c[d] = this.get(d);
				for (d = 0; d < a.getLength(); d++) c[d] ^= j.gexp(j.glog(a.get(d)) + b);
				return new f(c, 0).mod(a)
			}
		},
		g.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]],
		g.getRSBlocks = function(a, b) {
			var d, e, f, h, i, j, k, c = g.getRsBlockTable(a, b);
			if (void 0 == c) throw Error("bad rs block @ typeNumber:" + a + "/errorCorrectLevel:" + b);
			for (d = c.length / 3, e = [], f = 0; d > f; f++) for (h = c[3 * f + 0], i = c[3 * f + 1], j = c[3 * f + 2], k = 0; h > k; k++) e.push(new g(i, j));
			return e
		},
		g.getRsBlockTable = function(a, b) {
			switch (b) {
			case 1:
				return g.RS_BLOCK_TABLE[4 * (a - 1) + 0];
			case 0:
				return g.RS_BLOCK_TABLE[4 * (a - 1) + 1];
			case 3:
				return g.RS_BLOCK_TABLE[4 * (a - 1) + 2];
			case 2:
				return g.RS_BLOCK_TABLE[4 * (a - 1) + 3]
			}
		},
		h.prototype = {
			get: function(a) {
				return 1 == (1 & this.buffer[Math.floor(a / 8)] >>> 7 - a % 8)
			},
			put: function(a, b) {
				for (var c = 0; b > c; c++) this.putBit(1 == (1 & a >>> b - c - 1))
			},
			getLengthInBits: function() {
				return this.length
			},
			putBit: function(a) {
				var b = Math.floor(this.length / 8);
				this.buffer.length <= b && this.buffer.push(0),
				a && (this.buffer[b] |= 128 >>> this.length % 8),
				this.length++
			}
		},
		"string" == typeof b && (b = {
			text: b
		}),
		b = a.extend({},
		{
			render: "canvas",
			width: 256,
			height: 256,
			typeNumber: -1,
			correctLevel: 2,
			background: "#ffffff",
			foreground: "#000000"
		},
		b),
		this.each(function() {
			var c, d, f, g, h, i, j, k, l;
			if ("canvas" == b.render) for (c = new e(b.typeNumber, b.correctLevel), c.addData(b.text), c.make(), d = document.createElement("canvas"), d.width = b.width, d.height = b.height, f = d.getContext("2d"), g = b.width / c.getModuleCount(), h = b.height / c.getModuleCount(), i = 0; i < c.getModuleCount(); i++) for (j = 0; j < c.getModuleCount(); j++) f.fillStyle = c.isDark(i, j) ? b.foreground: b.background,
			k = Math.ceil((j + 1) * g) - Math.floor(j * g),
			l = Math.ceil((i + 1) * g) - Math.floor(i * g),
			f.fillRect(Math.round(j * g), Math.round(i * h), k, l);
			else for (c = new e(b.typeNumber, b.correctLevel), c.addData(b.text), c.make(), d = a("<table></table>").css("width", b.width + "px").css("height", b.height + "px").css("border", "0px").css("border-collapse", "collapse").css("background-color", b.background), f = b.width / c.getModuleCount(), g = b.height / c.getModuleCount(), h = 0; h < c.getModuleCount(); h++) for (i = a("<tr></tr>").css("height", g + "px").appendTo(d), j = 0; j < c.getModuleCount(); j++) a("<td></td>").css("width", f + "px").css("background-color", c.isDark(h, j) ? b.foreground: b.background).appendTo(i);
			c = d,
			jQuery(c).appendTo(this)
		})
	}
} (jQuery),
$(document).ready(function() {
	function d(a) {
		return TBUI.bd.hasClass(a) ? !0 : !1
	}
	var b, c;
	window.TBUI = window.TBUI || {},
	TBUI.bd = $("body"),
	TBUI.fullgallery = TBUI.fullgallery ? Number(TBUI.fullgallery) : 1,
	TBUI.fullimage = TBUI.fullimage ? Number(TBUI.fullimage) : 1,
	TBUI.click = "click",
	$(".sitenav-on").on(TBUI.click,
	function() {
		TBUI.bd.toggleClass("sitenav-active")
	}),
	$(".sitenav-mask").on(TBUI.click,
	function() {
		TBUI.bd.removeClass("sitenav-active")
	}),
	$(".searchstart-on").on(TBUI.click,
	function() {
		$(this).hide(),
		$(".searchstart-off").show(),
		TBUI.bd.addClass("searchform-active"),
		$(".sinput").focus()
	}),
	$(".searchstart-off").on(TBUI.click,
	function() {
		$(this).hide(),
		$(".searchstart-on").show(),
		TBUI.bd.removeClass("searchform-active")
	}),
	(TBUI.fullgallery || TBUI.fullimage) && (TBUI.gallerybox_api = null, TBUI.gallerybox_close = function() {
		TBUI.gallerybox_api && TBUI.gallerybox_api.refresh(),
		$(".gallerybox").remove(),
		$(".g___actived").removeClass("g___actived")
	},
	TBUI.gallerybox_init = function(a) {
		TBUI.bd.append('<div class="gallerybox"><div class="glide"><div class="glide__arrows"><button class="glide__arrow prev" data-glide-dir="<"><i class="fa">&#xe610;</i></button><button class="glide__arrow next" data-glide-dir=">"><i class="fa">&#xe603;</i></button></div><div class="glide__wrapper"><ul class="glide__track">' + a + '</ul></div><div class="glide__bullets"></div></div><div class="gallerybox-close" onclick="javascript:TBUI.gallerybox_close();"><i class="fa">&#xe606;</i></div></div>')
	},
	$(".gallery img").addClass("gallery-image"), TBUI.fullgallery && $(".gallery-size-large.gallerylink-file a, .gallery-size-medium.gallerylink-file a, .gallery-size-thumbnail.gallerylink-file a").on(TBUI.click,
	function(a) {
		var b, c, d, e;
		a.preventDefault(),
		b = $(this).parent().parent(),
		c = b.index() + 1,
		d = "",
		b.parent().children().each(function() {
			var a = "";
			$(this).find(".gallery-caption").length && (a = '<div class="gallerybox-itemdesc">' + $(this).find(".gallery-caption").html() + "</div>"),
			d += '<li class="glide__slide"><div class="gallerybox-item"><img src="' + $(this).find("a").attr("href") + '"></div>' + a + "</li>"
		}),
		TBUI.gallerybox_init(d),
		$(".gallerybox-item").height($(window).height()),
		e = $(".gallerybox .glide").glide({
			type: "slider",
			startAt: c,
			touchDistance: 2
		}),
		TBUI.gallerybox_api = e.data("glide_api")
	}), TBUI.fullimage && $(".article-content img:not(.gallery-image)").on(TBUI.click,
	function() {
		var b, c, d;
		"A" !== $(this).parent()[0].tagName && (b = 1, c = "", $(this).addClass("g___actived"), $(".article-content img:not(.gallery-image)").each(function(a) {
			var e, d = $(this);
			d.hasClass("g___actived") && (b = a + 1),
			e = "",
			d.next(".wp-caption-text").length && (e = '<div class="gallerybox-itemdesc">' + d.next(".wp-caption-text").html() + "</div>"),
			c += '<li class="glide__slide"><div class="gallerybox-item"><img src="' + d.attr("src") + '"></div>' + e + "</li>"
		}), TBUI.gallerybox_init(c), $(".gallerybox-item").height($(window).height()), d = $(".gallerybox .glide").glide({
			type: "slider",
			startAt: b,
			touchDistance: 2
		}), TBUI.gallerybox_api = d.data("glide_api"))
	}), $(window).resizeend(function() {
		$(".gallerybox").length && $(".gallerybox-item").height($(window).height())
	}), TBUI.fullgallery && $(".gallery .glide").glide({
		type: "slider",
		startAt: 1,
		autoheight: !0,
		touchDistance: 2
	})),
	isMobile.any || $("[tipsy]").tipsy(),
	TBUI.bd.append('<div class="rollbar">' + (d("comment-open") ? '<div class="rollbar-item" etap="to_comments"><i class="fa">&#xe602;</i></div>': "") + '<div class="rollbar-item" etap="to_top"><i class="fa">&#xe604;</i></div></div>'),
	b = $(".rollbar"),
	$(window).scroll(function() {
		var a = document.documentElement.scrollTop + document.body.scrollTop;
		a > 200 ? b.fadeIn() : b.fadeOut()
	}),
	$('[etap="to_comments"]').on(TBUI.click,
	function() {
		$("html,body").animate({
			scrollTop: $("#SOHUCS").offset().top + 15
		},
		300,
		function() {
			$("#comment").focus()
		})
	}),
	$('[etap="to_top"]').on(TBUI.click,
	function() {
		$("html,body").animate({
			scrollTop: 0
		},
		300)
	}),
	c = {
		url: document.URL,
		pic: $('meta[property="og:image"]').length ? $('meta[property="og:image"]').attr("content") : "",
		title: $('meta[property="og:title"]').length ? $('meta[property="og:title"]').attr("content") : "",
		desc: $('meta[name="description"]').length ? $('meta[name="description"]').attr("content") : ""
	},
	$(".share-weixin").each(function() {
		$(this).find(".share-popover").length || ($(this).append('<span class="share-popover"><span class="share-popover-inner" id="weixin-qrcode"></span></span>'), $("#weixin-qrcode").qrcode({
			width: 80,
			height: 80,
			text: $(this).data("url")
		}))
	}),
	$('[etap="share"]').on(TBUI.click,
	function() {
		var a = $(this),
		b = a.data("share"),
		d = "";
		switch (b) {
		case "qq":
			d = "http://connect.qq.com/widget/shareqq/index.html?url=" + c.url + "&desc=" + c.desc + "&summary=" + c.title + "&site=zeshlife&pics=" + c.pic;
			break;
		case "weibo":
			d = "http://service.weibo.com/share/share.php?title=" + c.title + "&url=" + c.url + "&appkey=448148336&pic=" + c.pic;
			break;
		case "douban":
			d = "http://www.douban.com/share/service?image=" + c.pic + "&href=" + c.url + "&name=" + c.title + "&text=" + c.desc;
			break;
		case "qzone":
			d = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + c.url + "&title=" + c.title + "&desc=" + c.desc;
			break;
		case "tqq":
			d = "http://share.v.t.qq.com/index.php?c=share&a=index&url=" + c.url + "&title=" + c.title;
			break;
		case "renren":
			d = "http://widget.renren.com/dialog/share?srcUrl=" + c.pic + "&resourceUrl=" + c.url + "&title=" + c.title + "&description=" + c.desc;
			break;
		case "facebook":
			d = "https://www.facebook.com/share.php?u=" + c.url + "&t=" + c.title;
			break;
		case "twitter":
			d = "https://twitter.com/intent/tweet?text=" + c.title + c.url;
			break;
		case "linkedin":
			d = "https://www.linkedin.com/shareArticle?mini=true&ro=true&armin=armin&url=" + c.url + "&title=" + c.title + "&summary=" + c.desc
		}
		a.attr("href") || a.attr("target") || a.attr("href", d).attr("target", "_blank")
	})
}),
function() {
	function b(a) {
		for (var e, f, g, b = "",
		d = a.length,
		c = 0; d > c;) switch (e = a.charCodeAt(c++), e >> 4) {
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
			b += a.charAt(c - 1);
			break;
		case 12:
		case 13:
			f = a.charCodeAt(c++),
			b += String.fromCharCode((31 & e) << 6 | 63 & f);
			break;
		case 14:
			f = a.charCodeAt(c++),
			g = a.charCodeAt(c++),
			b += String.fromCharCode((15 & e) << 12 | (63 & f) << 6 | (63 & g) << 0)
		}
		return b
	}
	function c(b) {
		for (var c, d, e, f, h = b.length,
		g = 0,
		i = ""; h > g;) {
			do c = a[255 & b.charCodeAt(g++)];
			while (h > g && -1 == c);
			if ( - 1 == c) break;
			do d = a[255 & b.charCodeAt(g++)];
			while (h > g && -1 == d);
			if ( - 1 == d) break;
			i += String.fromCharCode(c << 2 | (48 & d) >> 4);
			do {
				if (e = 255 & b.charCodeAt(g++), 61 == e) return i;
				e = a[e]
			} while ( h > g && - 1 == e );
			if ( - 1 == e) break;
			i += String.fromCharCode((15 & d) << 4 | (60 & e) >> 2);
			do {
				if (f = 255 & b.charCodeAt(g++), 61 == f) return i;
				f = a[f]
			} while ( h > g && - 1 == f );
			if ( - 1 == f) break;
			i += String.fromCharCode((3 & e) << 6 | f)
		}
		return i
	}
	function d(a) {
		return b(c(a))
	}
	function e(a) {
		var b, c, d;
		if ("undefined" == typeof window.Crc32Table) {
			for (window.Crc32Table = new Array(256), b = 0; 256 > b; b++) {
				for (d = b, c = 0; 8 > c; c++) d = 1 & d ? 3988292384 ^ 2147483647 & d >> 1 : 2147483647 & d >> 1;
				Crc32Table[b] = d
			}
			for ("string" != typeof a && (a = "" + a), d = 4294967295, b = 0; b < a.length; b++) d = 16777215 & d >> 8 ^ Crc32Table[255 & d ^ a.charCodeAt(b)];
			return d ^= 4294967295
		}
	}
	var a = new Array( - 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
	$("body").hasClass("postformat-video") && (path = "/video/urls/v/1/toutiao/mp4/" + $("video").attr("id") + "?r=0000000000000000", s = e(path) >>> 0, url = "http://i.snssdk.com" + path + "&s=" + s + "&callback=?", $.getJSON(url,
	function(a) {
		switch (total = a.total) {
		case 1:
			s = a.data.video_list.video_1.main_url;
			break;
		case 2:
			s = void 0 == a.data.video_list.video_2 ? a.data.video_list.video_1.main_url: a.data.video_list.video_2.main_url;
			break;
		case 3:
			s = void 0 == a.data.video_list.video_3 ? a.data.video_list.video_1.main_url: a.data.video_list.video_3.main_url
		}
		$("video").prop("src", d(s))
	}))
} (),
function() {
	if ($("#video").length > 0) {
		for ($(function() {
			$(".pagination ul li").click(function() {
				$(".pagination ul li").eq($(this).index()).addClass("on").siblings().removeClass("on")
			})
		}), line = links.split("|"), urls = new Array, videolist = "", len = line.length - 1, css = "", i = 0; len > i; i++) url = line[i].split("$"),
		urls[i] = url[1],
		i == len - 1 && (css = " class='on'"),
		videolist += "<li" + css + "><a href='javascript:;' onclick='play(" + i + ");'>" + url[0] + "</a></li>";
		$(".pagination ul").html(videolist),
		play(len - 1)
	}
} (),
function(a, b, c, d, e, f, g) {
	a["GoogleAnalyticsObject"] = e,
	a[e] = a[e] ||
	function() { (a[e].q = a[e].q || []).push(arguments)
	},
	a[e].l = 1 * new Date,
	f = b.createElement(c),
	g = b.getElementsByTagName(c)[0],
	f.async = 1,
	f.src = d,
	g.parentNode.insertBefore(f, g)
} (window, document, "script", "https://www.google-analytics.com/analytics.js", "ga"),
ga("create", "UA-76290221-1", "auto"),
ga("send", "pageview"),
_hmt = _hmt || [],
function() {
	var b, a = document.createElement("script");
	a.src = "https://hm.baidu.com/hm.js?fa9ce8a95499e16f14cf6a814b9a186b",
	b = document.getElementsByTagName("script")[0],
	b.parentNode.insertBefore(a, b)
} (),
function() {
	var b, a = document.createElement("script");
	a.src = "http://push.zhanzhang.baidu.com/push.js",
	b = document.getElementsByTagName("script")[0],
	b.parentNode.insertBefore(a, b)
} (),
function() {
	var a, b;
	document.write(unescape('%3Cdiv id="bdcs"%3E%3C/div%3E')),
	a = document.createElement("script"),
	a.type = "text/javascript",
	a.async = !0,
	a.src = "http://znsv.baidu.com/customer_search/api/js?sid=11272014177716517025&plate_url=" + encodeURIComponent(window.location.href) + "&t=" + Math.ceil(new Date / 36e5),
	b = document.getElementsByTagName("script")[0],
	b.parentNode.insertBefore(a, b)
} ();