$['fn']['a1'] = function(b, c, d) {
	var e = this,
	_0xf6d3x5 = b ? $(e)['find'](b) : $(e);
	d = d || 'click';
	_0xf6d3x5['on'](d,
	function(a) {
		c['call'](e, a)
	});
	return e
};
$['fn']['a2'] = function(a, b) {
	$(this)['find'](a)['html'](b);
	return this
};
var T = {
	a: function(d) {
		G['e']();
		var e = {
			type: 'get',
			dataType: 'json',
			url: d['l'],
			timeout: 6e4,
			cache: 1,
			success: function(a) {
				G['e'](0);
				d['s'](a)
			},
			error: function(a, b, c) {
				G['e'](0);
				console['log'](a);
				console['log'](b);
				console['log'](c);
				d['e'] && d['e'](a, b, c)
			}
		};
		if (/^http/ ['test'](d['l'])) {
			e['dataType'] = 'jsonp'
		};
		if (d['p']) {
			e['data'] = d['p']
		};
		$['ajax'](e)
	},
	b: function(a, b, c) {
		var d = $(template($('#t-g-4')['html'](), {
			d: a
		}));
		b = b || 3e3;
		$(document['body'])['append'](d);
		setTimeout(function() {
			d['remove']();
			c && c()
		},
		b)
	},
	c: (function(e) {
		var e = {};
		return function(c, d) {
			if (typeof c == 'object') {
				$['each'](c,
				function(a, b) {
					e[a] = b
				});
				return
			};
			if (T['u'](d)) {
				return T['u'](e[c]) ? null: e[c]
			} else {
				e[c] = d
			}
		}
	})({}),
	d: function(a) {
        debugger;
		return 'd/' + a + '.txt'
	},
	e: function(a, b) {
		b = T['u'](b) ? 1 : b;
		var c = a['split']('/')['pop'](),
		_0xf6d3xf = c['split'](''),
		_0xf6d3x3 = 'about:blank" l="{}',
		_0xf6d3xc = T['c']('b') + [_0xf6d3xf[0], _0xf6d3xf[1], c]['join']('/');
		return b ? _0xf6d3x3['replace'](/{}/, _0xf6d3xc) : _0xf6d3xc
	},
	f: function(a, b, c, d) {
		a['push'](c);
		d = a['length']-b;
		if (d > 0) {
			a['splice'](0, d)
		};
		return a
	},
	g: function(a) {
		var b, _0xf6d3x9 = new RegExp('(^| )' + a + '=([^;]*)(;|$)'),
		_0xf6d3x10 = (b = document['cookie']['match'](_0xf6d3x9)) ? b[2] : null;
		return (_0xf6d3x10 != null) ? unescape(_0xf6d3x10) : null
	},
	h: function(a) {
		var b = new Date(a * ((a + '')['length']-10 ? 1 : 1000));
		return [b['getFullYear']() + '-' + T['i'](b['getMonth']() + 1) + '-' + T['i'](b['getDate']()) + ' ' + T['i'](b['getHours']()) + ':' + T['i'](b['getMinutes']()) + ':' + T['i'](b['getSeconds']())]
	},
	i: function(a) {
		a += '';
		return (a['length']-2 ? '0': '') + a
	},
	j: function(a) {
		return location['hash']['substr'](1)
	},
	k: function(a, b) {
		if (a['length'] <= b) {
			return a
		};
		return a['substr'](0, b-3) + '...'
	},
	l: function(a) {
		return encodeURIComponent(a)
	},
	m: function(a) {
		return decodeURIComponent(a)
	},
	n: function(a, b) {
		b = b || T['j']();
		var c = (b && b['length'] > 0) ? b['split']('&') : null;
		if (!c || c['length'] < 1) {
			return null
		};
		var d = {},
		_0xf6d3x4;
		for (var e in c) {
			if (typeof e[c] == 'undefied') {
				continue
			};
			_0xf6d3x4 = c[e]['split']('=');
			if (_0xf6d3x4['length'] > 0) {
				d[_0xf6d3x4[0]] = T['m'](_0xf6d3x4[1]);
				if (_0xf6d3x4[0] == a) {
					return d[_0xf6d3x4[0]]
				}
			}
		};
		return a ? (typeof d[a] == 'undefied' ? null: d[a]) : d
	},
	o: function(a) {
		var b = [];
		for (var c in a) {
			b['push'](c + '=' + a[c])
		};
		return b['join']('&')
	},
	p: function(a) {
		var b = [];
		for (var c = 0; c < a['length']; c++) {
			if (! (b['indexOf'](a[c]) + 1)) {
				b['push'](a[c])
			}
		};
		return b
	},
	q: function(a) {
		var b = new RegExp('(^|&)' + a + '=([^&]*)(&|$)', 'i'),
		_0xf6d3x10 = window['location']['search']['substr'](1)['match'](b);
		return (_0xf6d3x10 != null) ? unescape(_0xf6d3x10[2]) : null
	},
	r: function(a) {
		a = a || 8;
		var b = ((Math['random']() + '')['substr'](2, a) * 1) + '',
		_0xf6d3x2 = b['length'];
		return (_0xf6d3x2 == a) ? b: b + T['r'](a-_0xf6d3x2)
	},
	s: function(a, b, c) {
		var d = new Date;
		c = c || 'd1';
		d['setTime'](d['getTime']() + 1 * T['a2'](c));
		document['cookie'] = a + '=' + escape(b) + ';path=/;expires=' + d['toGMTString']()
	},
	t: function(a, b, c, d) {
		var e = $('#' + a);
		e['html'](this['z'](b, c)); (typeof d == 'function') && d['call'](e);
		T['y']();
		return
	},
	u: function(a) {
		return a == null
	},
	v: function(d, e) {
		var f = $('<form>');
		f['attr']({
			method: 'post',
			action: e,
			target: '_blank'
		});
		$['each'](d,
		function(a, b) {
			var c = $('<input>');
			c['attr']('name', a);
			c['val'](b);
			f['append'](c)
		});
		this['a3'](f);
		f['submit']()
	},
	w: function(a) {
		return 0.5-Math['random']()
	},
	x: function(a) {
		location['href'] = a
	},
	y: (function(e) {
		var f = $(e)['height']();
		return function() {
			var d = $(window)['scrollTop'](),
			_0xf6d3x2 = f + d + 1200,
			_0xf6d3x3 = 0;
			$('img')['filter']('[l]')['each'](function(a, b) {
				var c = $(this);
				if (c['offset']()['top'] > _0xf6d3x2) {
					return false
				};
				_0xf6d3x3 = 1;
				c['attr']('src', c['attr']('l'))['removeAttr']('l')
			});
			if (!_0xf6d3x3) {
				$('img')['each'](function(a, b) {
					var c = $(this),
					_0xf6d3x1 = c['attr']('l');
					if (_0xf6d3x1) {
						c['attr']('src', _0xf6d3x1)['removeAttr']('l')
					}
				})
			}
		}
	})(document),
	z: function(a, b, c) {
		var d = $('#' + a)['html']();
		d = template(d, b || {});
		return c ? $(d) : d
	},
	rn: function(a, b, c) {
		c = b-a;
		return a + Math['floor'](Math['random']() * c)
	},
	a1: function() {
		return + new Date
	},
	a2: function(a) {
		var b = 1 * a['substr'](1),
		_0xf6d3x13 = a['substr'](0, 1);
		return 's' == _0xf6d3x13 ? 1e3 * b: 'h' == _0xf6d3x13 ? 60 * b * 60 * 1e3: 'd' == _0xf6d3x13 ? 24 * b * 60 * 60 * 1e3: void(0)
	},
	a3: function(a) {
		var b = $(document['body']);
		a && b['append'](a);
		return b
	},
	a4: function() {
		var a = location;
		return a['protocol'] + '//' + a['hostname'] + (a['port'] ? ':' + a['port'] : '') + '/'
	},
	a5: function(a, b) {
		b = b || 0;
		return (a * 1) || b
	},
	a6: function() {
		return location['pathname']['split']('.')[0]['split']('/')[1] || 'index'
	},
	a7: function() {
		return /iphone|ipad|ipod/ ['test'](navigator['userAgent']['toLowerCase']())
	},
	a8: function(b) {
		var c = b['a'] || '',
		_0xf6d3x2 = b['b'] || '',
		_0xf6d3x3 = b['c'] || [['关闭',
		function() {
			$(this)['remove']()
		}]],
		_0xf6d3xc = b['d'] || null,
		_0xf6d3x6 = T['z']('t15', {
			a: c,
			b: _0xf6d3x2,
			c: _0xf6d3x3
		},
		1);
		_0xf6d3x6['find']('a')['on']('click',
		function() {
			var a = $(this),
			_0xf6d3x14 = _0xf6d3x3[a['index']()] || null,
			_0xf6d3x15 = _0xf6d3x14 && _0xf6d3x14[1] || null;
			if (_0xf6d3x15) {
				_0xf6d3x15['call'](_0xf6d3x6)
			}
		});
		T['a3'](_0xf6d3x6);
		if (_0xf6d3xc) {
			_0xf6d3xc['call'](_0xf6d3x6)
		}
	}
};
var B = {
	a: function() {
		G['a'](3);
		B[B['d']()]();
		$(window)['on']('hashchange',
		function() {
			B[B['d']()]()
		})
	},
	b: function() {
		var a = $('#b1 a')['removeClass']('on'),
		_0xf6d3xc = F['c']();
		a['filter'](':first-child')['addClass']('on');
		if (!_0xf6d3xc) {
			$('#b4')['html']('');
			return
		};
		T['t']('b4', 't-b-1', {
			d: _0xf6d3xc
		})
	},
	c: function() {
		var a = $('#b1 a')['removeClass']('on'),
		_0xf6d3xc = H['b']();
		a['filter'](':nth-child(2)')['addClass']('on');
		if (!_0xf6d3xc) {
			$('#b4')['html']('');
			return
		};
		T['t']('b4', 't-b-2', {
			d: _0xf6d3xc
		})
	},
	d: function() {
		var a = T['j']();
		return ['b', 'c']['indexOf'](a) + 1 ? a: 'b'
	}
};
var C = {
	_d: null,
	_e: ['21', '22', '23', '24'],
	A: ['c', 'a', 'c2'],
	B: [2, 5, 6],
	a: function() {
		var b = this,
		_0xf6d3x1 = T['q']('t') * 1 || 0;
		_0xf6d3x1 = !!b['A'][_0xf6d3x1] ? _0xf6d3x1: 0;
		if (0 && !U['k']()) {
			_0xf6d3x1 = 0
		};
		var c = b['A'][_0xf6d3x1],
		_0xf6d3x3 = b['B'][_0xf6d3x1];
		G['a'](_0xf6d3x3);
		T['a']({
			l: T['d'](c),
			s: function(a) {
				C['_d'] = a;
				C['d'](a)
			}
		});
		T['a']({
			l: T['d']('t'),
			s: function(a) {
				C['c'](a);
				C['d'](C._d)
			}
		});
		$(window)['on']('hashchange',
		function() {
			C['d']()
		});
		C['e']()
	},
	b: function(a) {
		if (a && a['length'] > 0) {
			T['t']('c_i-1', 't-c-1', {
				d: a
			})
		} else {
			$('#c_i-1')['html']('<u>没有找到数据 ~</u>')
		}
	},
	c: function(a) {
		T['t']('a1', 't-c-2', {
			d: a
		})
	},
	d: function() {
		var d = T['n']() || {},
		_0xf6d3x2 = [],
		_0xf6d3x3 = [];
		$['each'](d,
		function(a, b) {
			_0xf6d3x2['push'](a['substr'](1))
		});
		if (_0xf6d3x2['indexOf']('2') + 1) {
			$['each'](C._e,
			function(a, b) {
				_0xf6d3x2['push'](b);
				_0xf6d3x3['push']('g' + b)
			})
		} else {
			$['each'](C._e,
			function(a, b) {
				if (_0xf6d3x2['indexOf'](b) + 1) {
					_0xf6d3x2['push']('2');
					_0xf6d3x3['push']('g2');
					return false
				}
			})
		};
		_0xf6d3x2 = T['p'](_0xf6d3x2);
		$['each'](_0xf6d3x3,
		function(a, b) {
			if (!T['u'](d[b])) {
				delete d[b]
			}
		});
		$('#a1 a, #a2 a')['each'](function(a, b) {
			var c = $(b),
			_0xf6d3x18 = $(b)['attr']('g'),
			_0xf6d3x10 = 'g' + _0xf6d3x18;
			if (_0xf6d3x2['indexOf'](_0xf6d3x18) + 1) {
				c['removeClass']('on')
			};
			if (!T['u'](d[_0xf6d3x10]) && d[_0xf6d3x10] == c['attr']('v')) {
				c['addClass']('on')
			}
		});
		C['b'](C['f'](d))
	},
	e: function() {
		$(document)['on']('click', '#a1 a, #a2 a',
		function() {
			var c = $(this)['attr']('g'),
			_0xf6d3x1 = {},
			_0xf6d3x2 = T['n']() || {},
			_0xf6d3x3 = [];
			_0xf6d3x1['g' + c] = T['l']($(this)['attr']('v'));
			$['extend'](_0xf6d3x2, _0xf6d3x1);
			if (c == '2') {
				$['each'](C._e,
				function(a, b) {
					_0xf6d3x3['push']('g' + b)
				})
			} else {
				if (C['_e']['indexOf'](c) + 1) {
					_0xf6d3x3['push']('g2')
				}
			};
			$['each'](_0xf6d3x3,
			function(a, b) {
				if (typeof _0xf6d3x2[b] != 'undefied') {
					delete _0xf6d3x2[b]
				}
			});
			T['x']('#' + T['o'](_0xf6d3x2));
			return false
		})
	},
	f: function(d) {
		var e = [];
		if (d['g1'] && d['g1'] == '0') {
			e['push']('g1')
		};
		if (d['g2'] && d['g2'] == '0') {
			e['push']('g2');
			$['each'](C._e,
			function(a, b) {
				e['push']('g' + b)
			})
		};
		if (e['length'] > 0) {
			$['each'](e,
			function(a, b) {
				if (typeof d[b] != 'undefied') {
					delete d[b]
				}
			})
		};
		if (JSON['stringify'](d) == '{}') {
			return C['_d']
		};
		var f = [];
		if (d['g1'] || d['g21']) {
			$['each'](C._d,
			function(a, b) {
				if (d['g1'] && !(b[3]['indexOf'](d['g1']) + 1)) {
					return
				};
				if (d['g21'] && d['g21']['length'] && b[6] != d['g21']) {
					return
				};
				f['push'](b)
			})
		} else {
			var g = ['g22', 'g23', 'g24'],
			_0xf6d3x1a,
			_0xf6d3x1b = [];
			$['each'](g,
			function(a, b) {
				if (d[b] && d[b]['length'] > 0) {
					for (var c = 0; c < 20; c++) {
						_0xf6d3x1a = T['rn'](0, C['_d']['length']);
						f[_0xf6d3x1a] = C['_d'][_0xf6d3x1a]
					};
					return false
				}
			});
			if (f['length'] > 0) {
				$['each'](f,
				function(a, b) {
					if (b) {
						_0xf6d3x1b['push'](b)
					}
				});
				f = _0xf6d3x1b
			}
		};
		return f
	}
};
var D = {
	A: 'r',
	B: 100,
	a: function() {
		var c = T['q']('id'),
		_0xf6d3x11 = T['d']('d/' + c['substr'](0, 2) + '/' + (c['substr'](-2) * 1) + '/' + c),
		_0xf6d3x4 = this;
		T['a']({
			l: _0xf6d3x11,
			s: function(a) {
                debugger;
				var b = a[1],
				_0xf6d3x2 = a[0],
				_0xf6d3x3 = _0xf6d3x4['h'](_0xf6d3x2);
				P['B']['on']('P1',
				function() {
					_0xf6d3x4['b']([b['pop']()])
				});
				P['B']['on']('P2',
				function() {
					_0xf6d3x4['b'](b)
				});
				P['l'](_0xf6d3x2[0], _0xf6d3x3);
				G['c'](_0xf6d3x2);
				_0xf6d3x4['c'](_0xf6d3x2);
				_0xf6d3x4['d'](c, _0xf6d3x3);
				H['a']([_0xf6d3x2[0], _0xf6d3x2[1], _0xf6d3x2[2], _0xf6d3x2[3], _0xf6d3x2[4]])
			}
		})
	},
	b: function(a) {
		T['t']('d1', 't-d-1', {
			d: a
		});
		$('#d1 img')['a1']('',
		function() {
			$('#d2')['addClass']('d2--1');
			$('#d3')['addClass']('d3--1')
		});
		if (!T['a7']() && !G['k']()) {
			$('#d1')['append'](T['z']('t14'))
		};
		$(window)['on']('scroll',
		function() {
			$('#d2')['removeClass']('d2--1');
			$('#d3')['removeClass']('d3--1')
		})
	},
	c: function(a) {
		T['a3'](T['z']('t-d-2', {
			d: a
		},
		1))
	},
	d: function(b, c) {
		var d = U['h']();
		if (!c || !d) {
			return false
		};
		var e = T['c'](~ ([2, 3, 4]['indexOf'](d)) ? 'i': 'f'),
		_0xf6d3x4 = this,
		_0xf6d3x3 = {
			a: U['c']()[7]
		};
		if (e == T['c']('f')) {
			if (_0xf6d3x4['g'](b) == 1) {
				return
			};
			_0xf6d3x3['b'] = T['c']('c')
		};
		T['a']({
			l: e,
			p: _0xf6d3x3,
			s: function(a) {
				if (!a['s']) {
					return
				};
				_0xf6d3x4['e'](a['d'])
			}
		})
	},
	e: function(a) {
		U['e']({
			3 : a['v'],
			4 : a['e'],
			8 : a['m'],
			10 : a['f'],
			11 : a['g']
		});
		return true
	},
	g: function(a) {
		var b = this,
		_0xf6d3x1 = (DB['g'](b.A) || '')['split'](',');
		if (T['u'](a)) {
			return _0xf6d3x1
		};
		if (~_0xf6d3x1['indexOf'](a + '')) {
			return 1
		};
		T['f'](_0xf6d3x1, b.B, a);
		DB['s'](b.A, _0xf6d3x1['join'](','));
		return-1
	},
	h: function(a) {
		var b;
		return T['a5'](a[5]) ? 0 : ((b = T['a5'](a[10])) ? b + 1 : 1)
	}
};
var DB = (function() {
	var e = function() {
		if (typeof localStorage != 'object') {
			return false
		};
		var a = 'tDB02f7f-23',
		_0xf6d3x2 = localStorage,
		_0xf6d3x3 = '10';
		try {
			_0xf6d3x2['setItem'](a, _0xf6d3x3);
			if (_0xf6d3x2['getItem'](a) != _0xf6d3x3) {
				return false
			};
			_0xf6d3x2['removeItem'](a);
			return true
		} catch(error) {
			return false
		}
	},
	_0xf6d3x5 = (function(c, d) {
		if (e()) {
			d = localStorage;
			c = {
				s: function(a, b) {
					return d['setItem'](a, b)
				},
				g: function(a) {
					return d['getItem'](a)
				},
				d: function(a) {
					return d['removeItem'](a)
				}
			}
		} else {
			c = {
				s: function(a, b) {
					T['s'](a, b, 'd999')
				},
				g: function(a) {
					return T['g'](a)
				},
				d: function(a) {
					T['s'](a, null)
				}
			}
		};
		return c
	})(),
	_0xf6d3x8 = typeof JSON == 'object';
	function _0xf6d3x6(c) {
		if (_0xf6d3x8) {
			return JSON['stringify'](c)
		};
		var d = [];
		$['each'](c,
		function(a, b) {
			d['push'](b['join']('^)'))
		});
		return d['join']('(^')
	}
	function _0xf6d3x1e(c) {
		if (_0xf6d3x8) {
			return JSON['parse'](c)
		};
		var d = [],
		_0xf6d3x2 = c['split']('(^');
		$['each'](_0xf6d3x2,
		function(a, b) {
			d['push'](b['split']('^)'))
		});
		return d
	}
	return {
		s: function(a, b) {
			_0xf6d3x5['s'](a, _0xf6d3x6(b))
		},
		g: function(a) {
			var b = _0xf6d3x5['g'](a);
			return (b != null) && _0xf6d3x1e(b)
		},
		d: function(a) {
			_0xf6d3x5['d'](a)
		},
		e: function(a) {
			_0xf6d3x6(a)
		},
		u: function(a) {
			_0xf6d3x1e(a)
		}
	}
})();
var F = {
	k: 'f',
	b: function(a) {
		var b = F['c']() || [];
		if (a['length'] < 1) {
			return 0
		};
		if (F['f'](a[0], b)) {
			return 0
		};
		b['push'](a);
		DB['s'](F['k'], b)
	},
	c: function() {
		return DB['g'](F['k'])
	},
	f: function(c, d) {
		d = d || F['c']();
		if (!d) {
			return 0
		};
		var e = 0;
		$['each'](d,
		function(a, b) {
			if (b[0] == c) {
				e = 1;
				return false
			}
		});
		return e
	}
};
var G = {
	A: [['首页', 'index', '1'], ['分类', 'c', '2'], ['无删减', 'c.htm?t=1', '5'], ['独家', 'c.htm?t=2', '6'], ['书架', 'b', '3'], ['我的', 'u', '4']],
	B: null,
	C: {
		5 : 'c31',
		6 : 'c32'
	},
	D: {
		6 : 'c66'
	},
	E: {
		1 : {
			0 : [[], {
				0 : 't10'
			}],
			1 : [[], {}],
			2 : [[], {}]
		},
		2 : {
			0 : [[], {
				0 : 't10'
			}],
			1 : [[], {}],
			2 : [[5], {
				1 : 't9'
			}],
			3 : [[5], {}]
		},
		3 : {
			0 : [[], {
				0 : 't10'
			}],
			1 : [[5], {}],
			2 : [[5], {}],
			3 : [[5], {}]
		},
		4 : {
			0 : [[], {
				0 : 't10'
			}],
			1 : [[5], {
				1 : 't8'
			}],
			2 : [[5], {
				1 : 't9'
			}],
			3 : [[5], {}]
		},
		5 : {
			0 : [[5], {
				0 : 't10',
				1 : 't8'
			}],
			1 : [[5], {
				1 : 't8'
			}],
			2 : [[5], {}],
			3 : [[5], {}]
		},
		6 : {
			0 : [[5], {
				0 : 't10',
				1 : 't10'
			}],
			1 : [[5, 6], {
				2 : 't13'
			}],
			2 : [[5, 6], {
				2 : 't13'
			}],
			3 : [[5, 6], {
				2 : 't13'
			}],
			4 : [[5, 6], {}]
		},
		7 : {
			0 : [[5], {
				0 : 't10',
				1 : 't8'
			}],
			1 : [[5, 6], {
				1 : 't8',
				2 : 't16'
			}],
			2 : [[5, 6], {
				2 : 't13'
			}],
			3 : [[5, 6], {
				2 : 't13'
			}],
			4 : [[5, 6], {}]
		}
	},
	F: {
		1 : 5,
		2 : 6
	},
	a: function(a) {
		a = a || 1;
		var b = T['z']('t-g-1', {
			d: this['f']()
		},
		1),
		_0xf6d3x4 = this,
		_0xf6d3x1 = _0xf6d3x4['f']()['length'],
		_0xf6d3x2 = !!_0xf6d3x4['C'][_0xf6d3x1] ? _0xf6d3x4['C'][_0xf6d3x1] : '';
		b['find']('[class=c3-' + a + ']')['addClass']('on');
		if (_0xf6d3x2) {
			b['filter']('p')['addClass'](_0xf6d3x2)
		};
		T['a3'](b)
	},
	b: function() {
		var a = this,
		_0xf6d3x1 = a['f']()['length'],
		_0xf6d3x2 = !!a['D'][_0xf6d3x1] ? a['D'][_0xf6d3x1] : '';
		T['a3']()['prepend'](T['z']('t-g-2', {
			d: a['f']()
		}));
		if (_0xf6d3x2) {
			$('.c6')['addClass']('c66')
		}
	},
	c: function(b) {
		var c = T['z']('t-g-3', {
			d: b
		},
		1),
		_0xf6d3x1 = c['find'](':nth-child(4)');
		if (!F['f'](b[0])) {
			_0xf6d3x1['on']('click',
			function() {
				var a = $(this);
				if (!F['f'](b[0])) {
					F['b']([b[0], b[1], b[2]])
				};
				$(this)['html']('已收藏')
			})
		} else {
			_0xf6d3x1['html']('已收藏')
		};
		T['a3'](c)
	},
	e: function(a) {
		var b = this;
		a = T['u'](a) || (a * 1) ? 1 : 0;
		if (!a) {
			b['B']['remove']();
			return
		};
		if (a && b['B']) {
			return
		};
		b['B'] = T['z']('t-g-6', {},
		1);
		T['a3'](b.B)
	},
	f: function() {
		var e = this,
		_0xf6d3x1 = this['A']['concat'](),
		_0xf6d3x2 = T['c']('p'),
		_0xf6d3x3 = U['h'](),
		_0xf6d3xc = e['E'][_0xf6d3x2][_0xf6d3x3][0],
		_0xf6d3x6 = [];
		$['each'](e.F,
		function(a, b) {
			_0xf6d3x6['push'](b)
		});
		if (_0xf6d3xc['length'] > 0) {
			$['each'](_0xf6d3xc,
			function(a, b) {
				var c = _0xf6d3x6['indexOf'](b);
				if (~c) {
					_0xf6d3x6['splice'](c, 1)
				}
			})
		};
		if (_0xf6d3x6['length']) {
			$['each'](_0xf6d3x6,
			function(c, d) {
				$['each'](_0xf6d3x1,
				function(a, b) {
					if (~b['indexOf']('' + d)) {
						_0xf6d3x1['splice'](a, 1)
					}
				})
			})
		};
		return _0xf6d3x1
	},
	g: function() {
		return T['a5'](T['c']('p'), 1)
	},
	h: function(a) {
		return 'mqqwpa://im/chat?chat_type=wpa&uin=' + a + '&version=1&src_type=web&web_src=oicqzone.com'
	},
	i: function() {
		var a = T['c']('r'),
		_0xf6d3x2 = ~a['indexOf']('.apk') ? a: a + Q['c']() + '.apk';
		$('#e1 a')['attr']('href', _0xf6d3x2)
	},
	j: function() {
		var b = T['c']('s'),
		_0xf6d3x2 = T['q'](b) * 1,
		_0xf6d3x3 = this['k']();
		_0xf6d3x2 && T['s'](b, _0xf6d3x2);
		if (_0xf6d3x3 || !_0xf6d3x2 || !~ [1, 2]['indexOf'](_0xf6d3x2)) {
			return
		};
		T['a']({
			l: T['c']('t'),
			p: {
				a: Q['c'](),
				b: _0xf6d3x2
			},
			s: function(a) {
				if (a['s']) {
					DB['s'](b, _0xf6d3x2)
				}
			}
		})
	},
	k: function() {
		return DB['g'](T['c']('s'))
	},
	l: function() {
		$('head')['append']('<meta name="apple-mobile-web-app-capable" content="yes"><link rel="apple-touch-icon" href="/i/64.png"/>');
		var b = 'i_a_t_d',
		_0xf6d3x1a = T['g'](b),
		_0xf6d3x19 = this['n'](),
		_0xf6d3x21 = T['a7']();
		if (_0xf6d3x21 && !_0xf6d3x19 && !_0xf6d3x1a && !~ ['d', 'e', 'r', 'p']['indexOf'](T['a6']())) {
			var c = T['z']('t12', {},
			1),
			_0xf6d3x2 = T['a3'](c)['addClass']('n1');
			c['a1']('a',
			function(a) {
				if ($('#n3')['length']) {
					return
				};
				a = T['z']('t11', {},
				1);
				T['a3'](a);
				T['s'](b, 1, 'h1');
				L['d']();
				a['on']('click',
				function() {
					a['remove']()
				})
			});
			c['find']('b')['on']('click',
			function() {
				_0xf6d3x2['removeClass']('n1');
				$(this)['parent']()['remove']()
			})
		}
	},
	m: function() {
		$(document)['on']('click', 'a',
		function(a) {
			var b = $(this)['attr']('href');
			if (!b || b['length'] && b['length'] < 1 || ~ ['javascript:;']['indexOf'](b)) {
				return true
			};
			a['preventDefault']();
			T['x'](b)
		});
		L['c']();
		G['q']()
	},
	n: function() {
		return !! (window['navigator']['standalone'])
	},
	o: function() {
		var a = T['c']('u');
		$('title')['html'](a);
		if (T['a6']() == 'u') {
			$('#u4 u')['html'](a)
		};
		if (T['a7']() || G['k']()) {
			G['q']()
		}
	},
	p: function(a) {
		var b = this,
		_0xf6d3x1 = T['c']('p'),
		_0xf6d3x2 = U['h'](),
		_0xf6d3x3 = b['E'],
		_0xf6d3xc = _0xf6d3x3[_0xf6d3x1][_0xf6d3x2],
		_0xf6d3x6 = _0xf6d3xc[1][a],
		_0xf6d3xa = b['F'];
		if (a > 0 && !~_0xf6d3xc[0]['indexOf'](b['F'][a] * 1)) {
			throw 'p1'
		};
		return _0xf6d3x6
	},
	q: function() {
		$('#i2')['hide']();
		$('#u3 a')['eq'](5)['hide']()
	},
	s: function() {
		return T['g'](T['c']('s'))
	}
};
var H = {
	k: 'h',
	a: function(a) {
		var b = H['b']() || [],
		_0xf6d3xd = H['c'](a[0]);
		if (_0xf6d3xd + 1) {
			b[_0xf6d3xd][3] = a[3];
			b[_0xf6d3xd][4] = a[4]
		} else {
			b['push'](a)
		};
		DB['s'](H['k'], b)
	},
	b: function() {
		return DB['g'](H['k'])
	},
	c: function(c, d) {
		d = d || H['b']();
		if (!d) {
			return-1
		};
		var e = -1;
		$['each'](d,
		function(a, b) {
			if (b[0] == c) {
				e = a;
				return false
			}
		});
		return e
	}
};
var I = {
	a: function() {
		G['a'](1);
		T['a']({
			l: T['d']('i'),
			s: function(a) {
				I['b'](a['d1']);
				I['c'](a);
				I['d'](a['d9'])
			}
		});
		T['c']('x') && (!T['a7']()) && G['k']() && T['a8']({
			a: '软件升级',
			b: '您的软件低于最新版本，请及时升级',
			c: [['取消',
			function() {
				$(this)['remove']()
			}], ['确定',
			function() {
				T['x']('e.htm')
			}]]
		});
		try { ! G['k']() && xc90a8(T['c']('w'))
		} catch(e) {}
	},
	b: function(a) {
		T['t']('i_i-1', 't-i-1', {
			d: a
		},
		function() {
			new Swiper('.swiper-container', {
				pagination: '.swiper-pagination',
				paginationClickable: true,
				loop: true,
				autoplay: 3000
			})
		})
	},
	c: function(c) {
		var d = '',
		_0xf6d3x2, _0xf6d3x3, _0xf6d3x4 = $('#t- i-2')['html']();
		$['each']([2, 3, 4, 5, 6, 7, 8],
		function(a, b) {
			_0xf6d3x3 = 'd' + b;
			_0xf6d3x2 = {
				d: c[_0xf6d3x3]
			};
			if (c[_0xf6d3x3][0][1]-1) {
				_0xf6d3x2['c'] = ' c1-1--1'
			};
			d += template(_0xf6d3x4, _0xf6d3x2)
		});
		$('#i_i-2')['after'](d)
	},
	d: function(a) {
		T['t']('i_i-3', 't-i-3', {
			d: a
		})
	}
};
var L = {
	A: '{ _c- A -]',
	a: function() {
		var c = this;
		$('#g3-1')['on']('click',
		function() {
			var a = $('#g1-1'),
			_0xf6d3x2 = $('#g1-2'),
			_0xf6d3x19 = a['val'](),
			_0xf6d3x1a = _0xf6d3x2['val'](),
			_0xf6d3x3 = ['c', a],
			_0xf6d3xc = ['c', _0xf6d3x2],
			_0xf6d3x6 = 0;
			if (_0xf6d3x19['length'] < 1) {
				_0xf6d3x3 = ['b', a, '请输入会员名'];
				_0xf6d3x6 = 1
			};
			if (_0xf6d3x1a['length'] < 1) {
				_0xf6d3xc = ['b', _0xf6d3x2, '请输入密码'];
				_0xf6d3x6 = 1
			};
			UG['d'](_0xf6d3x3);
			UG['d'](_0xf6d3xc);
			if (_0xf6d3x6) {
				return
			};
			var b = {
				a: a,
				b: _0xf6d3x2
			};
			c['b'](_0xf6d3x19, _0xf6d3x1a)
		});
		$('#g3-2')['on']('click',
		function() {
			T['x']('u.htm')
		})
	},
	b: function(f, g, h, i) {
		T['a']({
			l: T['c']('g'),
			p: {
				a: f,
				b: g
			},
			s: h ||
			function(c, d) {
				d = c['d'];
				if (c['s']) {
					U['e']({
						0 : d['n'],
						1 : d['p'],
						2 : d['c'],
						3 : d['v'],
						4 : d['e'],
						5 : '',
						6 : '',
						7 : d['i'],
						8 : d['m'],
						9 : 0,
						10 : d['f'],
						11 : d['g']
					});
					return T['x'](i || 'u.htm')
				};
				var e = {
					a: $('#g1-1'),
					b: $('#g1-2')
				};
				$['each'](c['m'],
				function(a, b) {
					UG['d'](['b', e[a], b])
				})
			}
		})
	},
	c: function() {
		var a = this,
		_0xf6d3x1 = decodeURIComponent(location['hash']),
		_0xf6d3x2 = _0xf6d3x1['match'](/_u=(.[^&]+)/),
		_0xf6d3x3 = _0xf6d3x2 ? (_0xf6d3x2['pop']())['split'](a.A) : null,
		_0xf6d3xc = G['A'][0][1];
		if (_0xf6d3x3) {
			_0xf6d3xc = ~_0xf6d3xc['indexOf']('.htm') ? _0xf6d3xc: _0xf6d3xc + '.htm';
			_0xf6d3x3['push'](null, _0xf6d3xc);
			a['b']['apply'](a, _0xf6d3x3)
		}
	},
	d: function() {
		if (!U['d']()) {
			return
		};
		var a = U['c']();
		T['x']('#_u = ' + [a[0], a[1]]['join'](this.A))
	}
};
var P = {
	A: {},
	B: $({}),
	C: 13,
	D: 'p',
	a: function() {
		var b = this,
		_0xf6d3xc = b['i']();
		G['b']();
		b['k']();
		if (!T['q']('n') && _0xf6d3xc && _0xf6d3xc['type'] == 'ali' && (T['a1']()-_0xf6d3xc['time'] < 6e4)) {
			b['h'](b['i']())
		};
		$('dl')['filter']('.p2')['find']('a')['on']('click',
		function() {
			var a = ($(this)['attr']('d'))['split'](', '),
			_0xf6d3xc = b['A'];
			_0xf6d3xc['pid'] = a[0];
			_0xf6d3xc['fee'] = a[1];
			b['b']()
		})
	},
	b: function() {
		var a = $($('#t-g-7')['html']()),
		_0xf6d3x4 = this,
		_0xf6d3xc = _0xf6d3x4['A'];
		a['find']('img')['on']('click',
		function() {
			a['remove']()
		});
		a['find']('a')['on']('click',
		function() {
			_0xf6d3xc['type'] = $(this)['attr']('d')['toLowerCase']();
			_0xf6d3xc['no'] = _0xf6d3x4['c']();
			_0xf6d3xc['cid'] = Q['c']();
			_0xf6d3xc['id2'] = U['c']()[7];
			_0xf6d3xc['time'] = T['a1']();
			_0xf6d3xc['tid'] = U['c']()[9] || 0;
			_0xf6d3xc['home'] = T['a4']();
			_0xf6d3xc['method'] = G['s']() * 1 ? 2 : 1;
			if (_0xf6d3xc['method'] == 1) {
				try {
					if (typeof(android['wxAPP']) != 'undefined') {
						_0xf6d3xc['method'] = 2
					}
				} catch(e) {}
			};
			if (_0xf6d3x4['p'](_0xf6d3xc)) {
				return false
			};
			T['s'](_0xf6d3x4.D, JSON['stringify'](_0xf6d3xc));
			U['e']({
				5 : _0xf6d3xc['no'],
				6 : _0xf6d3xc['pid']
			});
			if (T['c']('l') * 1 && _0xf6d3xc['type'] == 'wx') {
				a['remove']();
				_0xf6d3x4['g'](_0xf6d3xc)
			} else {
				if (_0xf6d3xc['type'] == 'ali') {
					a['remove']();
					_0xf6d3x4['h'](_0xf6d3xc);
					_0xf6d3x4['n'](_0xf6d3xc)
				} else {
					a['remove']();
					_0xf6d3x4['n'](_0xf6d3xc)
				}
			}
		});
		T['a3'](a)
	},
	c: function() {
		return 'D' + T['r'](this['C']-1)
	},
	d: function(b, c) {
		var d = U['c'](),
		_0xf6d3x4 = this;
		T['a']({
			l: T['c']('d'),
			p: {
				a: d[0],
				b: d[1],
				c: c,
				d: d[7],
				e: G['g']()
			},
			s: function(a) {
				b['call'](_0xf6d3x4, a)
			}
		})
	},
	e: function(a) {
		U['e']({
			0 : a['n'],
			1 : a['p'],
			2 : a['c'],
			3 : 1,
			4 : a['e'],
			5 : '',
			6 : '',
			7 : a['i'],
			8 : a['m'],
			9 : 0,
			10 : a['f'],
			11 : a['g']
		});
		this['B']['trigger']('VIP')
	},
	f: function(c) {
		var d = this;
		if (c) {
			var e = T['q']('n');
			if (T['u'](e) || e['length'] != d['C']) {
				return false
			}
		};
		var f, _0xf6d3x1 = 0,
		_0xf6d3x2 = function() { ! T['u'](f) && clearTimeout(f);
			return
		},
		_0xf6d3xc = T['q']('n') || U['c']()[5],
		_0xf6d3x6 = T['c']('j') * 1e3,
		_0xf6d3x3 = function() {
			d['d'](function(a) {
				if (a['s']) {
					d['e'](a['d'])
				};
				if (_0xf6d3x1 > T['c']('k')) {
					_0xf6d3x2()
				} else {
					_0xf6d3x1++;
					f = setTimeout(_0xf6d3x3, _0xf6d3x6)
				}
			},
			_0xf6d3xc)
		};
		d['B']['on']('VIP',
		function(a, b) {
			d['o']();
			_0xf6d3x2();
			d['j']();
			T['x'](T['c']('e'))
		});
		setTimeout(_0xf6d3x3, _0xf6d3x6)
	},
	g: function(a) {
		var b = this,
		_0xf6d3x5 = T['z']('t-p-1', null, 1);
		T['a3'](_0xf6d3x5);
		_0xf6d3x5['find']('img')['on']('click',
		function() {
			_0xf6d3x5['remove']()
		});
		_0xf6d3x5['find']('i')['on']('click',
		function() {
			_0xf6d3x5['remove']();
			b['n'](a);
			b['f']()
		})
	},
	h: function(b) {
		var c = this,
		_0xf6d3x3 = b['type'] == 'wx' ? '微信': '支付宝',
		_0xf6d3x1 = T['z']('t1', {
			t: _0xf6d3x3,
			f: b['fee']
		},
		1),
		_0xf6d3x2 = _0xf6d3x1['find']('a'),
		_0xf6d3x6 = T['q']('t') ? 't = 1': '';
		_0xf6d3x1['find']('a')['on']('click',
		function(a) {
			a = $(this)['index']() ? 'r': '';
			if (!a) {
				_0xf6d3x1['remove']();
				return
			};
			a += '.htm ? n2 = ' + b['no'] + (_0xf6d3x6 ? ' & ' + _0xf6d3x6: '');
			T['x'](a)
		});
		T['a3'](_0xf6d3x1)
	},
	i: function() {
		return JSON['parse'](T['g'](this.D))
	},
	j: function() {
		T['s'](this.D, null)
	},
	k: function() {
		var a = T['a5'](T['q']('t')),
		_0xf6d3x2 = ['#p1, #p4, #p5', '#p6', '#p1, #p4, #p5', '#p7'],
		_0xf6d3x3 = _0xf6d3x2['join'](', ');
		if (~ [1, 3]['indexOf'](G['g']())) {
			a = 0
		};
		a = (a >= 0 && a < _0xf6d3x2['length']) ? a: 0;
		$(_0xf6d3x3)['hide']();
		$(_0xf6d3x2[a])['show']()
	},
	l: function(a, b, c) {
		var d = this;
		if (! (b = T['a5'](b))) {
			d['B']['trigger']('P2');
			return c ? T['x'](c) : ''
		};
		try {
			var f = G['p'](b-1)
		} catch(e) {
			T['x']('c.htm')
		};
		if (!f) {
			d['B']['trigger']('P2');
			return c ? T['x'](c) : ''
		};
		var g = T['z']('t-g-5', {},
		1);
		g['find']('dd')['html'](T['z'](f));
		g['a1']('.c8-1',
		function() {
			g['remove']()
		});
		if (a) {
			g['a1']('a',
			function() {
				U['e'](9, a)
			})
		};
		T['a3'](g);
		this['B']['trigger']('P1', f)
	},
	m: function() {
		var c = this,
		_0xf6d3x1 = location['pathname']['split']('.')[0]['split'](' / ')[1] || 'u',
		_0xf6d3x2 = ~ ['index', 'u', 'c', 'p']['indexOf'](_0xf6d3x1),
		_0xf6d3x3 = T['q']('n') || U['c']()[5];
		if (!_0xf6d3x2 || !_0xf6d3x3) {
			return
		};
		c['d'](function(a) {
			if (a['s']) {
				c['e'](a['d'])
			}
		},
		_0xf6d3x3);
		c['B']['on']('VIP',
		function(a, b) {
			c['o']();
			c['j']()
		})
	},
	n: function(c) {
		var d = T['c']('a');
		if (c['type'] == 'wx' && c['method'] == 2) {
			T['a']({
				l: d,
				p: c,
				s: function(a) {
					var b = a['d'] || '';
					if (!b) {
						T['a8']({
							b: '支付通道异常，请稍候再试'
						});
						return
					};
					try {
						android['wxAPP'](b['appid'], b['partnerid'], b['prepayid'], b['noncestr'], b['timestamp'], b['package'], b['sign'])
					} catch(e) {}
				}
			})
		} else {
			T['v'](c, d)
		}
	},
	o: function() {
		T['a8']({
			b: '恭喜您已经成为VIP！',
			c: [['确定',
			function() {
				$(this)['remove']()
			}]]
		})
	},
	p: function(d) {
		var e = T['c']('v')[d['type']],
		_0xf6d3x2 = d['method'] == 1 ? 'h5': 'app',
		_0xf6d3x3 = T['a7']() ? 2 : 1,
		_0xf6d3xc = e[_0xf6d3x2 + _0xf6d3x3],
		_0xf6d3x6 = _0xf6d3xc[0] * 1,
		_0xf6d3xa = typeof(_0xf6d3xc[1]) == 'object',
		_0xf6d3xf = function(a, b) {
			var c = {
				b: a,
				c: [['确定',
				function() {
					$(this)['remove']()
				}]]
			};
			if (b) {
				c['c'] = [['确定',
				function() {
					T['x'](b)
				}]];
				c['d'] = function() {
					setTimeout(function() {
						T['x'](b)
					},
					3e3)
				}
			};
			return c
		};
		if (_0xf6d3x6) {
			return false
		};
		T['a8'](_0xf6d3xf[_0xf6d3xa ? 'apply': 'call']({},
		_0xf6d3xc[1]));
		return true
	}
};
var Q = {
	A: 'c',
	b: function(a, b) {
		b = this;
		a = T['q'](b.A);
		if (T['u'](a)) {
			return
		};
		T['s'](b.A, a, 'd' + T['c']('q'))
	},
	c: function() {
		return T['g'](this.A) || T['c']('o')
	}
};
var R = {
	a: function() {
		this['e']();
		this['b']()
	},
	b: function() {
		var b = T['q']('n2') || U['c']()[5];
		T['t']('r2', 't2', {
			d: b
		});
		var c = $('#r2 em'),
		_0xf6d3x2 = 5,
		_0xf6d3x4 = this,
		_0xf6d3x9 = setInterval(function() {
			c['html'](--_0xf6d3x2);
			if (!_0xf6d3x2) {
				clearInterval(_0xf6d3x9);
				P['d'](function(a) {
					_0xf6d3x4[a['s'] ? 'c': 'd'](a)
				},
				b)
			}
		},
		1e3)
	},
	c: function(a) {
		P['e'](a['d']);
		T['t']('r2', 't4');
		this['e']()
	},
	d: function(a) {
		var b = T['q']('n2') || U['c']()[5];
		T['t']('r2', 't3', {
			d: b
		})
	},
	e: function() {
		var a = U['c'](),
		_0xf6d3x1 = ~a[4] != 0 ? '到期日期：' + a[4] : '余额：' + a[8] || 0 + '书币',
		_0xf6d3x2 = $('#r1');
		_0xf6d3x2['find']('b')['html'](a[0]);
		_0xf6d3x2['find']('i')['html'](_0xf6d3x1)
	}
};
var U = {
	A: 'u',
	a: function() {
		G['a'](4);
		var c = this,
		_0xf6d3x1 = $('#u1'),
		_0xf6d3x2 = _0xf6d3x1['find']('i'),
		_0xf6d3x3 = $('#u4'),
		_0xf6d3xc = $('#u2-1'),
		_0xf6d3x6 = c['c'](),
		_0xf6d3xf = ['VIP会员', '', '', '无删减版VIP', '独家包时VIP'],
		_0xf6d3xb = _0xf6d3xf[0],
		_0xf6d3x13 = c['h'](),
		_0xf6d3x8 = T['c']('m'),
		_0xf6d3xd = G['h'](_0xf6d3x8),
		_0xf6d3x11 = $('#u3-5');
		_0xf6d3x1['a2']('s', _0xf6d3x6[0])['a1']('s',
		function() {
			L['b'](_0xf6d3x6[0], _0xf6d3x6[1],
			function(a) {
				var b = a['d'];
				if (a['s']) {
					U['e']({
						0 : b['n'],
						1 : b['p'],
						2 : b['c'],
						3 : b['v'],
						4 : b['e'],
						7 : b['i'],
						8 : b['m'],
						10 : b['f'],
						11 : b['g']
					});
					return T['x']('u.htm')
				}
			})
		});
		_0xf6d3x1['a2']('b', _0xf6d3x6[1]);
		_0xf6d3x3['a2']('i', T['c']('n'));
		_0xf6d3x3['a2']('a', _0xf6d3x8)['find']('a')['attr']('href', _0xf6d3xd);
		_0xf6d3x11['parent']()['attr']('href', _0xf6d3xd);
		_0xf6d3x2[_0xf6d3x13 ? 'show': 'hide']();
		_0xf6d3xc['a2']('p', _0xf6d3x13 ? T['h'](_0xf6d3x6[2]) : '还不是会员？点击申请');
		if (_0xf6d3x13) {
			_0xf6d3xb = _0xf6d3xf[(~ [1, 2]['indexOf'](_0xf6d3x13)) ? 0 : _0xf6d3x13];
			_0xf6d3xc['a2']('b', _0xf6d3xb);
			var d = {
				1 : [8, 1],
				2 : [4, 2],
				3 : [10, 2],
				4 : [11, 2]
			} [_0xf6d3x13];
			T['t']('u2-2', 't-u-' + d[1], {
				d: _0xf6d3x6[d[0]]
			})
		}
	},
	b: function() {
		var a = this['c']();
		if (a['length'] < 10) {
			this['e'](10, '')
		};
		if (a) {
			return
		};
		a = [T['r'](), '123456', T['a1'](), 0, '', '', 0, '', 0, 0, '', ''];
		DB['s'](U.A, a)
	},
	c: function() {
		return DB['g'](this.A)
	},
	d: function(a) {
		a = ((a && (a['length'] > 0)) ? a: this['c']()[3]) * 1;
		return ! (a === 0)
	},
	e: function(c, d) {
		var e = this,
		_0xf6d3x1 = e['c']();
		if (typeof c == 'object') {
			$['each'](c,
			function(a, b) {
				_0xf6d3x1[a] = b
			})
		} else {
			_0xf6d3x1[c] = d
		};
		DB['s'](e.A, _0xf6d3x1)
	},
	f: function() {
		return this['c']()[4]['length'] == 10
	},
	g: function() {
		return this['c']()[10]['length'] == 10
	},
	h: function() {
		var a = this,
		_0xf6d3x10 = 0,
		_0xf6d3x1 = a['c']();
		if (!a['d']()) {
			return _0xf6d3x10
		};
		if (_0xf6d3x1[11]['length'] == 10) {
			_0xf6d3x10 = 4
		} else {
			if (a['g']()) {
				_0xf6d3x10 = 3
			} else {
				if (a['f']()) {
					_0xf6d3x10 = 2
				} else {
					if (a['i']()) {
						_0xf6d3x10 = 1
					}
				}
			}
		};
		return _0xf6d3x10
	},
	i: function() {
		return (this['c']()[8] * 1) > 0
	},
	j: function(a, b) {
		a = a * 1 ? a: 0;
		b = this['h']();
		return a ? b > 2 : b > 0
	},
	k: function() {
		var a = [[], [2, 3], [1, 2, 3], [1, 2, 3], [0, 1, 2, 3]][G['g']()-1];
		return !! ~a['indexOf'](U['h']())
	}
};
var UG = {
	a: function() {
		G['a'](4);
		var c = this,
		_0xf6d3x2 = 'blur';
		$('#g1-1')['val'](U['c']()[0])['on'](_0xf6d3x2,
		function(a) {
			a = $(this);
			c['j'](a, 'e', [a])
		});
		$('#g1-2')['on'](_0xf6d3x2,
		function(a) {
			a = $(this);
			c['j'](a, 'f', [a])
		});
		$('#g1-3')['on'](_0xf6d3x2,
		function(a) {
			a = $(this);
			c['j'](a, 'g', [a])
		});
		$('#g1-4')['on'](_0xf6d3x2,
		function(a, b) {
			a = $(this);
			b = $('#g1-3');
			c['j'](a, 'h', [a, b])
		});
		$('#g3-1')['on']('click',
		function() {
			c['i']()
		});
		$('#g3-2')['on']('click',
		function() {
			T['x']('u.htm')
		})
	},
	b: function(a, b) {
		a['addClass']('g1_1')['siblings']()['remove']();
		a['after'](' < p > ' + b + '</p > ')
	},
	c: function(a) {
		a['removeClass']('g1_1')['siblings']()['remove']()
	},
	d: function(a) {
		this[a['shift']()]['apply'](null, a);
		return a['length'] < 2
	},
	e: function(a) {
		var b = a['val'](),
		_0xf6d3x3 = /^[a-zd]{6,18}$/ ['test'](b) ? ['c', a] : ['b', a, '会员名为6至18个字母或数字混合的字符，请调整会员名称'];
		return this['d'](_0xf6d3x3)
	},
	f: function(a) {
		var b = (a['val']() == U['c']()[1]) ? ['c', a] : ['b', a, '当前密码输入错误，请重新输入当前密码'];
		return this['d'](b)
	},
	g: function(a) {
		var b = (a['val']()['length'] > 1) ? ['c', a] : ['b', a, '请输入密码'];
		return this['d'](b)
	},
	h: function(a, b) {
		var c = (a['val']() == b['val']()) ? ['c', a] : ['b', a, '两次输入的新密码不一致，请重新输入！'];
		return this['d'](c)
	},
	i: function() {
		$('#g1 input')['triggerHandler']('blur');
		if ($('#g1 input[class= g1_1]')['length'] > 0) {
			return false
		};
		var e = {
			g1_1: $('#g1-1'),
			g1_2: $('#g1-2'),
			g1_3: $('#g1-3')
		},
		_0xf6d3x4 = this,
		_0xf6d3x1 = U['c']()[7];
		if (_0xf6d3x1['length'] < 32) {
			U['e']({
				0 : e['g1_1']['val'](),
				1 : e['g1_3']['val']()
			});
			T['b']('帐号及密码修改成功！', null,
			function() {
				T['x']('u.htm')
			});
			return
		};
		T['a']({
			l: T['c']('h'),
			p: {
				a: e['g1_1']['val'](),
				b: e['g1_2']['val'](),
				c: e['g1_3']['val'](),
				d: _0xf6d3x1
			},
			s: function(c) {
				if (!c['s']) {
					$['each'](c['m'],
					function(a, b) {
						_0xf6d3x4['d'](['b', e[a], b])
					});
					return
				};
				var d = c['d'],
				_0xf6d3x1a;
				if (T['u'](d)) {
					_0xf6d3x1a = {
						0 : e['g1_1']['val'](),
						1 : e['g1_3']['val']()
					}
				} else {
					_0xf6d3x1a = {
						0 : d['n'],
						1 : d['p'],
						2 : d['c'],
						3 : d['v'],
						4 : d['e'],
						5 : '',
						6 : 0,
						7 : d['i'],
						8 : d['m'],
						9 : 0,
						10 : d['f'],
						11 : d['g']
					}
				};
				U['e'](_0xf6d3x1a);
				T['b']('帐号及密码修改成功！', null,
				function() {
					T['x']('u.htm')
				})
			}
		})
	},
	j: function(a, b, c) {
		var d = this;
		if (d[b]['apply'](d, c)) {
			return
		};
		var e = 'input';
		a['off'](e)['on'](e,
		function() {
			d[b]['apply'](d, c)
		})
	}
};
var V = {
	a: function() {
		G['b']();
		T['a']({
			l: T['d']('t / ' + T['q']('id')),
			s: function(a) {
				V['b'](a[0]);
				V['c'](a[0]);
				V['d'](a[1]);
				V['h'](a[1][0])
			}
		});
		T['a']({
			l: T['d']('c / ' + T['rn'](1, 21)),
			s: function(a) {
				V['e'](a)
			}
		});
		T['a']({
			l: T['d']('r / ' + T['rn'](1, 101)),
			s: function(a) {
				V['f'](a)
			}
		})
	},
	b: function(a) {
		T['t']('v2', 't-v-1', {
			d: a
		})
	},
	c: function(a) {
		$('#v4 p')['html'](a[4])
	},
	d: function(c) {
		T['t']('v5', 't-v-2', {
			d: c
		});
		$('#v6')['a1']('',
		function() {
			var a = $('#v5 li'),
			_0xf6d3x1 = a['filter']('[class= hide]'),
			_0xf6d3x2 = a['filter']('[class= show]'),
			_0xf6d3x3 = $(this)['find']('b');
			if (_0xf6d3x1['length']) {
				_0xf6d3x1['removeClass']('hide')['addClass']('show');
				_0xf6d3x3['addClass']('up')['html']('收起')
			} else {
				_0xf6d3x2['removeClass']('show')['addClass']('hide');
				_0xf6d3x3['removeClass']('up')['html']('查看更多')
			}
		});
		$('#v5 li[g = m]')['on']('click',
		function(a) {
			var b = $(this),
			_0xf6d3x2 = T['a5'](b['attr']('d')),
			_0xf6d3x3 = b['find']('a');
			a['preventDefault']();
			P['l'](T['q']('id'), _0xf6d3x2, _0xf6d3x3['attr']('href'))
		})
	},
	e: function(a) {
		T['t']('v7-1', 't-v-3', {
			d: a['sort'](T['w'])
		})
	},
	f: function(a) {
		T['t']('v8-1', 't-v-4', {
			d: a
		})
	},
	g: function() {
		var a = $('#v2 dt');
		F['b']([a['attr']('i'), a['attr']('t'), a['attr']('p')]);
		$('#v3 i')['html']('已收藏')['off']('click')
	},
	h: function(b) {
		var c = $('#v3'),
		_0xf6d3x2 = $('#v2'),
		_0xf6d3x3 = _0xf6d3x2['find']('dt')['attr']('i'),
		_0xf6d3xc = F['f'](_0xf6d3x3);
		c['html'](template($('#t-v-5')['html'](), {
			d: b
		}));
		if (F['f'](_0xf6d3x3)) {
			c['find']('i')['html']('已收藏')
		} else {
			c['find']('i')['on']('click', V['g'])
		};
		c['find']('u')['on']('click',
		function() {
			var a = _0xf6d3x2['find']('dd s'),
			_0xf6d3x25 = a['html']() * 1;
			a['html'](++_0xf6d3x25)
		})
	}
};
$(function(c, d, e, f) {
	d = c + d;
	T['c']({
		a: d + 'p' + f,
		b: c + 'mhtp.q9090.com / img / ',
		c: 50,
		d: d + 'a' + f,
		e: 'u.htm',
		f: d + 'c' + f,
		g: d + 'd' + f,
		h: d + 'b' + f,
		i: d + 'e' + f,
		j: 2,
		k: 30,
		l: 0,
		m: '978494234',
		n: 'ggg31.com',
		o: 2060,
		p: 7,
		q: 7,
		r: c + 'xz123.changyuanyuntong.com / app / ',
		s: 'app',
		t: d + 'f' + f,
		u: '天天漫画',
		v: {
			"wx": {
				h51: [0, ['请到APP中支付成为VIP', 'e.htm']],
				h52: [1, '当前支付方式不可用，请选择其它支付方式'],
				app1: [1, '当前支付方式不可用，请选择其它支付方式'],
				app2: [0, '当前支付方式不可用，请选择其它支付方式']
			},
			"ali": {
				h51: [0, ['请到APP中支付成为VIP', 'e.htm']],
				h52: [1, '当前支付方式不可用，请选择其它支付方式'],
				app1: [1, '当前支付方式不可用，请选择其它支付方式'],
				app2: [0, '当前支付方式不可用，请选择其它支付方式']
			}
		},
		w: c + 'ggg31.com',
		x: 0
	});
	U['b']();
	Q['b']();
	P['m']();
	G['i']();
	G['j']();
	G['o']();
	G['n']() && G['m']();
	$['get']('0.htm',
	function(a) {
		var b = T['a3'](),
		_0xf6d3x13 = b['attr']('i');
		b['append'](a);
		_0xf6d3x13 && e[_0xf6d3x13]['a']();
		G['l']()
	});
	$(e)['on']('scroll',
	function() {
		T['y']()
	})
} ('http://', 'hytj.wuliaovip.com/a/', window, '.php'))