(function(i, h, f) {
    var g = f(i, h);
    i.util = i.util || {};
    i.util.toucher = i.util.toucher || g;
    i.define && define(function(b, c, a) {
        return g
    })
})(this, document, function(n, k) {
    function p(a, b) {
        return a.className.match(new RegExp("(\\s|^)" + b + "(\\s|$)"))
    }
    function r(j, a, b) {
        this._events = this._events || {};
        var f, c;
        if (typeof (a) == "string") {
            f = a.replace(/^\./, "");
            c = b
        } else {
            f = null;
            c = a
        }
        if (typeof (c) == "function" && j && j.length) {
            var i = j.split(/\s+/);
            for (var h = 0, e = i.length; h < e; h++) {
                var g = i[h];
                if (!this._events[g]) {
                    this._events[g] = []
                }
                this._events[g].push({className: f, fn: c})
            }
        }
        return this
    }
    function m(f, e) {
        this._events = this._events || {};
        if (!this._events[f]) {
            return
        }
        var i = this._events[f];
        var c = e.target;
        while (1) {
            if (i.length == 0) {
                return
            }
            if (c == this.dom || !c) {
                for (var g = 0, a = i.length; g < a; g++) {
                    var h = i[g]["className"];
                    var j = i[g]["fn"];
                    if (h == null) {
                        o(f, j, c, e)
                    }
                }
                return
            }
            var b = i;
            i = [];
            for (var g = 0, a = b.length; g < a; g++) {
                var h = b[g]["className"];
                var j = b[g]["fn"];
                if (p(c, h)) {
                    if (o(f, j, c, e) == false) {
                        return
                    }
                } else {
                    i.push(b[g])
                }
            }
            c = c.parentNode
        }
    }
    function o(b, a, f, g) {
        var e = g.touches.length ? g.touches[0] : {};
        var h = {type: b, target: g.target, pageX: e.clientX || 0, pageY: e.clientY || 0};
        if (b == "swipe" && g.startPosition) {
            h.startX = g.startPosition.pageX, h.startY = g.startPosition.pageY, h.moveX = h.pageX - h.startX, h.moveY = h.pageY - h.startY
        }
        var c = a.call(f, h);
        if (c == false) {
            g.preventDefault();
            g.stopPropagation()
        }
        return c
    }
    function l(b, c, e, a) {
        return Math.abs(b - c) >= Math.abs(e - a) ? (b - c > 0 ? "Left" : "Right") : (e - a > 0 ? "Up" : "Down")
    }
    function s(j) {
        var G = this;
        var b = 0;
        var i = 0;
        var g, D, h, F;
        var a;
        var A;
        var B = false;
        var E = null;
        function f(t) {
            B = false;
            clearTimeout(A);
            clearTimeout(a)
        }
        function e(t) {
            E = t;
            g = t.touches[0].pageX;
            D = t.touches[0].pageY;
            h = 0;
            F = 0;
            B = true;
            b = new Date();
            m.call(G, "swipeStart", t);
            clearTimeout(A);
            A = setTimeout(function() {
                f(t);
                m.call(G, "longTap", t)
            }, 500)
        }
        function C(u) {
            m.call(G, "swipeEnd", E);
            if (!B) {
                return
            }
            var t = new Date();
            if (t - i > 260) {
                a = setTimeout(function() {
                    f();
                    m.call(G, "singleTap", E)
                }, 250)
            } else {
                clearTimeout(a);
                f(u);
                m.call(G, "doubleTap", E)
            }
            i = t
        }
        function c(u) {
            E = u;
            u.startPosition = {pageX: g, pageY: D};
            m.call(G, "swipe", u);
            if (!B) {
                return
            }
            h = u.touches[0].pageX;
            F = u.touches[0].pageY;
            if (Math.abs(g - h) > 2 || Math.abs(D - F) > 2) {
                var t = l(g, h, D, F);
                m.call(G, "swipe" + t, u)
            } else {
                f(u);
                m.call(G, "singleTap", u)
            }
            f(u)
        }
        j.addEventListener("touchstart", e);
        j.addEventListener("MSPointerDown", e);
        j.addEventListener("pointerdown", e);
        j.addEventListener("touchend", C);
        j.addEventListener("MSPointerUp", C);
        j.addEventListener("pointerup", C);
        j.addEventListener("touchmove", c);
        j.addEventListener("MSPointerMove", c);
        j.addEventListener("pointermove", c);
        j.addEventListener("touchcancel", f);
        j.addEventListener("MSPointerCancel", f);
        j.addEventListener("pointercancel", f)
    }
    function q(b, a) {
        var a = a || {};
        this.dom = b;
        s.call(this, this.dom)
    }
    q.prototype.on = r;
    return function(a) {
        return new q(a)
    }
});
(function(I, H) {
    var E = H(".banner"), z = E.find(".banner-ctrl li"), v = [], F = [], i = [], C = true, w = false, y = -1, A = -1, K, G, B, x, D, J = false;
    if (E.length == 0) {
        return
    }
    var j = {switchType: 1, _init: function() {
            var a = this, c = 200;
            E.find(".banner-pic ul").each(function(g) {
                v.push([]);
                H(this).find("li").each(function() {
                    v[g].push(H(this))
                })
            });
            z.each(function(h) {
                var g = H(this);
                F.push([]);
                g.find(".ctrl-dot i").each(function() {
                    F[h].push(H(this))
                });
                i.push([]);
                g.find(".title-list p").each(function() {
                    i[h].push(H(this))
                })
            });
            if (z.filter("[data-rec]").size() == 0) {
                var e = Math.floor(Math.random() * v.length), f = Math.floor(Math.random() * v[e].length);
                a.select(e, f, 1)
            } else {
                var b = Math.floor(Math.random() * v[0].length);
                a.select(0, b, 1)
            }
            E.on("click", ".banner-next", function() {
                a.switchType = 0;
                a.next(2)
            });
            E.on("click", ".banner-prev", function() {
                a.switchType = 0;
                a.prev(2)
            });
            E.on("mouseenter", ".banner-ctrl li", function() {
                var g = H(this);
                clearTimeout(x);
                B = setTimeout(function() {
                    a.switchType = 0;
                    z.removeClass("current mouse-hover");
                    g.addClass("current mouse-hover").find(".title-item").slideDown();
                    a.select(g.index(), 0, 3)
                }, c)
            });
            E.on("mouseleave", ".banner-ctrl li", function() {
                clearTimeout(B)
            });
            E.on("mouseleave", ".banner-ctrl", function() {
                var g = H(this);
                clearTimeout(B);
                x = setTimeout(function() {
                    z.removeClass("mouse-hover")
                }, c)
            });
            E.on("mouseenter", ".title-list p", function() {
                var g = H(this);
                K = setTimeout(function() {
                    g.addClass("now").siblings().removeClass("now");
                    a.select(g.parents("li").index(), g.index(), 3)
                }, c)
            });
            E.on("mouseleave", ".title-list p", function() {
                clearTimeout(K)
            });
            E.on("mouseenter mousemove", function() {
                w = true;
                a._pauseAuto()
            });
            E.on("mouseleave", function() {
                w = false;
                if (a.isInScreen()) {
                    a._startAuto()
                }
            });
            if (a.isInScreen()) {
                a._startAuto();
                J = true
            }
            H(window).scroll(function() {
                if (a.isInScreen() && J == false) {
                    J = true;
                    w = false;
                    a._startAuto()
                } else {
                    if (!a.isInScreen() && J == true) {
                        J = false;
                        w = true;
                        a._pauseAuto()
                    }
                }
            });
            H(document).keyup(function(g) {
                if (a.isInScreen()) {
                    if (g.which == 37 || g.which == 75) {
                        a.switchType = 0;
                        a.prev(2)
                    }
                    if (g.which == 39 || g.which == 74) {
                        a.switchType = 0;
                        a.next(2)
                    }
                    if (!w) {
                        a._pauseAuto();
                        a._startAuto()
                    }
                }
            })
        }, _startAuto: function() {
            var a = this;
            G = setInterval(function() {
                a.next(1)
            }, 3000)
        }, _pauseAuto: function() {
            clearInterval(G)
        }, select: function(e, f, b) {
            if (y == e && A == f) {
                return
            }
            if (C) {
                H(".banner").css("background", "none");
                C = false
            }
            if (y >= 0 && A >= 0) {
                v[y][A].stop().fadeOut(500);
                if (y != e) {
                    z.eq(y).removeClass("current mouse-hover")
                }
                F[y][A].removeClass("on");
                i[y][A].removeClass("now")
            }
            v[e][f].fadeIn(500).find("img[data-src]").attr("src", function() {
                return H(this).attr("data-src")
            }).removeAttr("data-src");
            if (y != e) {
                z.eq(e).addClass("current")
            }
            F[e][f].addClass("on");
            i[e][f].addClass("now");
            D = v[e][f].attr("cptId");
            if (D) {
                try {
                    apsAdboardCptPvObj.aps_adboard_loadAdCptPv(D)
                } catch (a) {
                }
            }
            y = e;
            A = f;
            if (window.saExportUtil) {
                var c = v[y][A].children("a").attr("expo");
                switch (b) {
                    case 1:
                        saExportUtil.adverCarousel(c);
                        break;
                    case 2:
                        saExportUtil.adverClick(c);
                        break;
                    case 3:
                        saExportUtil.sendCustomExpoData(c, 2);
                        break
                    }
            }
        }, next: function(b) {
            var a = this, c, e;
            if (v[y][A + 1]) {
                if (a.switchType) {
                    if (z.eq(y).attr("data-rec")) {
                        c = y;
                        e = A + 1
                    } else {
                        c = y == (v.length - 1) ? 0 : (y + 1);
                        e = 0
                    }
                } else {
                    c = y;
                    e = A + 1
                }
            } else {
                c = y == (v.length - 1) ? 0 : (y + 1);
                e = 0
            }
            this.select(c, e, b)
        }, prev: function(b) {
            var a = this, c, e;
            if (v[y][A - 1]) {
                if (a.switchType) {
                    if (z.eq(y).attr("data-rec")) {
                        c = y;
                        e = A - 1
                    } else {
                        c = y == 0 ? (v.length - 1) : (y - 1);
                        e = 0
                    }
                } else {
                    c = y;
                    e = A - 1
                }
            } else {
                c = y == 0 ? (v.length - 1) : (y - 1);
                if (a.switchType && !z.eq(c).attr("data-rec")) {
                    e = 0
                } else {
                    e = v[c].length - 1
                }
            }
            this.select(c, e, b)
        }, isInScreen: function() {
            if (E.length > 0) {
                return(H(I).scrollTop() + H(window).height() - 100 > E.offset().top) && (E.offset().top + E.height() - 100 > H(I).scrollTop())
            }
        }};
    I.Banner = j;
    H(function() {
        I.Banner._init()
    })
})(window, jQuery);
var index = index || {};
index.priceDOM = new Array();
index.getPriceFlag = false;
index.getCity = function(b) {
    SFE.base.getCity(function(a) {
        if (b && $.isFunction(b)) {
            b(a)
        }
    })
};
index.baoguang = function(b) {
    if (b) {
        if (typeof _analyseExpoTags == "function") {
            _analyseExpoTags("a", b)
        } else {
            setTimeout(function() {
                index.baoguang(b)
            }, 2000)
        }
    }
};
index.getPrice = function(c) {
    index.getPriceFlag = true;
    var e = index.priceDOM[0];
    $.ajax({url: "http://" + sn.domain + sn.context + "/priceService_" + c + "_" + e.attr("data-sku") + "_1_priceServiceCallBack_.html", cache: true, dataType: "jsonp", jsonp: false, jsonpCallback: "priceServiceCallBack", timeout: 3000, error: function(g, a, b) {
        }, success: function(h) {
            if (h && h != "" && h.price && h.price.length > 0) {
                var b = h.price[0].promotionPrice.toString();
                if (b.indexOf(".") <= -1) {
                    b += ".00"
                }
                var a = b.split(".")[0];
                var i = b.split(".")[1];
                if (i.length != 2) {
                    i += "0"
                }
                $(e).find(".price").html("<i>¥</i><span><b>" + a + "</b>." + i + "</span>")
            }
            index.priceDOM.shift();
            if (index.priceDOM.length > 0) {
                index.getPrice(c)
            } else {
                index.getPriceFlag = false
            }
        }})
};
index.downShiftFlag = false;
index.baseObj = {id: "", name: "", trickPoint: "", vendorCode: "", partNumber: "", linkType: "1", shopPicUrl: "/b2c/catentries/000000000", floorNum: ""};
index.data = {data: []};
(function() {
    var c = {};
    index.tmpl = function e(a, b) {
        var g = !/\W/.test(a) ? c[a] = c[a] || e(document.getElementById(a).innerHTML) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + a.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
        return b ? g(b) : g
    }
})();
index.getUrl = function(k, n) {
    var i = "";
    if (k.trickPoint && k.trickPoint.length > 0) {
        i = "?srcPoint=" + k.trickPoint
    }
    if (k.linkUrl && k.linkUrl != "") {
        if (k.linkUrl.indexOf("http://") == 0) {
            return k.linkUrl + i
        } else {
            return"http://" + k.linkUrl + i
        }
    } else {
        var o = k.linkType;
        var j = k.vendorCode;
        var m = k.partNumber;
        var l = sn.productDomain;
        if (l.substring(l.length - 1) != "/") {
            l = l + "/"
        }
        if (null != n) {
            if (j && j.length > 0) {
                return l + j + "/" + m + ".html?srcPoint=" + n + "&src=" + n
            } else {
                return l + m + ".html?srcPoint=" + n + "&src=" + n
            }
        } else {
            if (j && j.length > 0) {
                return l + j + "/" + m + ".html" + i
            } else {
                return l + m + ".html" + i
            }
        }
    }
};
index.getPic = function(i, g) {
    var k = sn.imgHost;
    if (k.substring(k.length - 1) != "/") {
        k = k + "/"
    }
    if (i.picUrl && i.picUrl != "") {
        return k + i.picUrl
    } else {
        var j = i.shopPicUrl;
        var h = "1";
        if (!g) {
            g = "120x120"
        }
        if (k) {
            j = j.substring(1)
        }
        return k + j + i.partNumber + "_" + h + "_" + g + ".jpg"
    }
};
index.getSku = function(i) {
    var k = i.partNumber + "|1|";
    var j = "";
    var g = i.linkType;
    var h = i.vendorCode;
    if (g && g != "1") {
        if (g == "2") {
            j = "4|"
        } else {
            if (g == "3") {
                j = "5|"
            } else {
                if (g == "4") {
                    j = "6|"
                } else {
                    if (g == "5") {
                        j = "7|"
                    } else {
                        if (g == "6") {
                            j = "8|"
                        } else {
                            if (g == "7") {
                                j = "9|"
                            }
                        }
                    }
                }
            }
        }
    } else {
        if (h && h != "") {
            if (h == "0000000000") {
                j = "3|"
            } else {
                j = "2|" + i.vendorCode
            }
        } else {
            j = "|"
        }
    }
    return'data-sku="' + k + j + '"'
};
index.getId = function(m, o) {
    var k = "";
    var l = "0000000000";
    var n = m.trickPoint;
    if (n && "" != n) {
        var i = n.indexOf("rec");
        var j = "";
        if (-1 != i) {
            j = n.substring(i)
        }
        if (m.vendorCode && m.vendorCode.length > 0) {
            l = m.vendorCode
        }
        k = "baoguang_" + j + "-" + o + "_" + l + "_" + m.partNumber + "_0"
    }
    return k
};
index.getTrickForPic = function(l, m, j) {
    var i = "";
    var n = l.partnumber;
    if (!n) {
        n = l.partNumber
    }
    if (n && n.length > 9) {
        n = n.substring(9)
    }
    var o = "c";
    if (j) {
        o = "p"
    }
    var k = "0000000000";
    if (l.vendorCode && l.vendorCode.length > 0) {
        k = l.vendorCode
    }
    i = l.trickPoint + "-" + m + "_" + o + "_" + k + "_" + n + "_0";
    return i
};
index.getExpo = function(l, m) {
    var j = "";
    var o = l.partnumber;
    if (!o) {
        o = l.partNumber
    }
    if (o && o.length > 9) {
        o = o.substring(9)
    }
    var k = "0000000000";
    if (l.vendorCode && l.vendorCode.length > 0) {
        k = l.vendorCode
    }
    var n = l.floorNum;
    var i = "";
    if (m > 9) {
        i = m
    } else {
        i = "0" + m
    }
    j = "index_lcsp0" + n + "" + i + ":" + k + "|" + o;
    return j
};
index.getJsonObj = function(s, u, t) {
    var p = index.getTrickForPic(s, u, true);
    var w = index.getUrl(s, p);
    var q = index.getPic(s);
    var o = index.getSku(s);
    var v = index.getId(s, u);
    var r = index.getTrickForPic(s, u, false);
    var m = index.getExpo(s, u);
    var n = {id: v, name: s.name, href: w, trickPoint: s.trickPoint, trickPointT: r, trickPointP: p, pic: q, sku: o, expo: m};
    return n
};
index.load = function() {
    var j = index.data.data;
    var k = index.lazyLoadArr[0];
    var g = "jsModel";
    var i = $(k).attr("jsModelId");
    if (k && i && i.length > 0) {
        g = $(k).attr("jsModelId")
    }
    if (j.length > 0) {
        var h = index.tmpl(g, index.data);
        $(k).html('<script type="text/html">' + h + "<\/script>")
    }
};
index.checkSmart = function() {
    $.ajax({url: sn.smartDomain + "/iss/turingShelf/ajaxIsNormalLevel_index.lazyLoadSmart.html", async: false, cache: false, type: "GET", dataType: "jsonp", jsonp: index.lazyLoadSmart, success: function(b) {
        }})
};
index.lazyLoadSmart = function(s, q) {
    index.downShiftFlag = s;
    var u = index.lazyLoadArr[0];
    var p = "";
    var n = sn.cityId;
    var m = "";
    var l = "";
    var r = $(u).attr("dataCode");
    var t = 10;
    if (s == "h") {
        m = d("custno");
        l = d("_snma");
        if (l && l.length > 0) {
            var o = l.split("_");
            if (o.legnth > 2) {
                l = o[1]
            } else {
                l = ""
            }
        } else {
            l = ""
        }
    } else {
        if (s == "l") {
            return false
        }
    }
    $.ajax({url: sn.smartDomain + "/iss/turingShelf/ajaxGetShelfItem_" + r + "_" + t + "_" + p + "_" + n + "_" + m + "_" + l + "_smartCb.html", cache: true, async: false, type: "GET", jsonp: false, jsonpCallback: "smartCb", dataType: "jsonp", error: function(b, c, a) {
        }, success: function(a) {
        }})
};
var smartCb = function(t) {
    var w = index.lazyLoadArr[0];
    var u = $(w).attr("trickPoint");
    var v = $(w).attr("floorNum");
    if (t && t.success && t.shelfInfo) {
        var q = t.shelfInfo;
        var o = t.vendor;
        if (q.itemList && q.itemList.length > 0) {
            var p = new Array();
            for (var s = 0; s < q.itemList.length; s++) {
                var i = q.itemList[s];
                var n = i.partnumber;
                if (n && n.length > 9) {
                    n = n.substring(9)
                }
                var r = s + 1;
                if (s < 9) {
                    r = "0" + r
                }
                index.baseObj.name = i.itemName;
                index.baseObj.trickPoint = u;
                index.baseObj.vendorCode = o;
                index.baseObj.partNumber = n;
                index.baseObj.floorNum = v;
                p.push(index.getJsonObj(index.baseObj, s + 1, true))
            }
            index.data.data = p
        }
    } else {
        index.data.data = []
    }
    index.lazyLoadCallBack()
};
index.lazyLoadArr = new Array();
index.lazyLoadStatus = false;
index.lazyLoadCallBack = function() {
    index.load();
    index.lazyLoadArr.shift();
    if (index.lazyLoadArr.length > 0) {
        index.lazyLoadData(sn.cityId)
    } else {
        index.lazyLoadStatus = false
    }
};
index.lazyLoadData = function(b) {
    if (index.lazyLoadArr.length > 0) {
        if (index.downShiftFlag) {
            index.lazyLoadSmart(index.downShiftFlag, b)
        } else {
            index.checkSmart()
        }
    }
};
index.lazyLoadInit = function(e, c) {
    index.lazyLoadArr.push(e);
    if (!index.lazyLoadStatus) {
        index.lazyLoadStatus = true;
        index.lazyLoadData(c)
    }
};
index.getFloorNum = function() {
    var g = $(".floor");
    var f = g.length;
    for (var e = 0; e < f; e++) {
        g.eq(e).addClass("J-floor" + (e + 1))
    }
};
index.ieVersion = function(e) {
    var b = document.createElement("b");
    b.innerHTML = "<!--[if IE " + e + "]><i></i><![endif]-->";
    return b.getElementsByTagName("i").length === 1
};
index.isInScreen = function(c) {
    var e = c;
    if (e.length > 0) {
        return($(window).scrollTop() + $(window).height() > e.offset().top) && e.offset().top + e.height() > $(window).scrollTop()
    }
};
index.topActive = function() {
    var k = $("#__TOP_ACTIVE__"), l = k.find(".top-active-wrap"), h = l.find("img"), i = parseInt(l.attr("data-height")), m = k.find(".btn"), j = true;
    k.on("click", ".btn", function() {
        var a = $(this);
        if (!a.hasClass("btn-open")) {
            m.removeClass("btn-close").addClass("btn-open").attr({title: "打开", name: "打开埋点值"});
            if (i > 0) {
                l.stop(true).animate({height: 0}, 200)
            } else {
                l.hide()
            }
        } else {
            m.removeClass("btn-open").addClass("btn-close").attr({title: "关闭", name: "关闭埋点值"});
            if (i > 0) {
                l.stop(true).animate({height: i}, 200)
            } else {
                l.show().css("height", "auto")
            }
        }
        var b = new Date();
        b.setTime(b.getTime() + 12 * 60 * 60 * 1000);
        if (j) {
            j = false;
            document.cookie = "topActiveStatus=true;expires=" + b
        }
    })
};
index.SetCookie = function(i, h, g) {
    var f = new Date;
    f.setTime(f.getTime() + g * 24 * 60 * 60 * 1000);
    document.cookie = i + "=" + escape(h) + ";expires=" + f
};
index.getCookie = function(a) {
    var b;
    return(b = document.cookie.match(new RegExp("(^| )" + a + "=([^;]*)(;|$)"))) ? decodeURIComponent(b[2].replace(/\+/g, "%20")) : null
};
index.ABTest = function() {
    var e, c = Math.floor(Math.random() * 2 + 1);
    e = index.getCookie("version");
    if (!e) {
        index.SetCookie("version", c, 30)
    }
};
index.recmdActive = function() {
    var s = $(".recmd-active"), y = s.find(".btn"), t = s.find(".bg"), w = true, x, u = false, v = false, r = bigscreen ? 1190 : 990;
    if (index.ieVersion(6) || s.length == 0) {
        return
    }
    var p = index.getCookie("recmdActive"), q = bigscreen ? 595 : 495, z;
    function o() {
        x = Math.ceil($(document).width() / 2 - q < 0 ? 0 : $(document).width() / 2 - q)
    }
    o();
    $(window).bind("scroll resize", function() {
        o()
    });
    if (!p) {
        u = true
    }
    function A() {
        if (u) {
            s.show().stop(true).animate({left: x}, 600);
            y.removeClass("btn-open").addClass("btn-close").attr({title: "收起", name: "收起按钮的埋点值"});
            t.fadeOut()
        }
    }
    A();
    $(window).bind("resize", function() {
        if (u && y.hasClass("btn-close")) {
            s.css("left", x)
        }
    });
    s.on("click", ".btn", function() {
        v = true;
        clearTimeout(z);
        var a = $(this);
        if (a.hasClass("btn-open")) {
            t.fadeOut();
            y.removeClass("btn-open").addClass("btn-close").attr({title: "收起", name: "收起按钮的埋点值"});
            s.stop(true).animate({left: x}, 300)
        } else {
            t.fadeIn();
            y.removeClass("btn-close").addClass("btn-open").attr({title: "展开", name: "展开按钮的埋点值"});
            s.stop(true).animate({left: -r}, 300)
        }
    });
    if (w) {
        w = false;
        index.SetCookie("recmdActive", true, 5)
    }
    if (!v && y.hasClass("btn-close")) {
        z = setTimeout(function() {
            t.fadeIn();
            y.removeClass("btn-close").addClass("btn-open").attr({title: "展开", name: "展开按钮的埋点值"});
            s.stop(true).animate({left: -r}, 300)
        }, 7000)
    }
};
index.newUser = function() {
    var e = $(".new-user"), g, f = function() {
        var a = $(".dialog-overlay"), b = e.find(".close"), c = $(document).height();
        a.css("height", c);
        e.show();
        a.show();
        b.click(function() {
            a.hide();
            e.hide()
        });
        index.setData("newUserDialog", new Date().getTime() + 600000)
    };
    if (index.ieVersion(6) || e.length == 0) {
        return
    }
    if (index.getCookie("logonStatus")) {
        return
    }
    if (!index.getCookie("idsLoginUserIdLastTime")) {
        if (window.localStorage) {
            g = parseInt(index.getData("newUserDialog"));
            if (!g || g < new Date().getTime()) {
                f()
            }
        } else {
            f()
        }
    }
};
index.activeDialog = function() {
    if ((index.ieVersion(6) || index.ieVersion(7)) && !index.getCookie("indexCheckBrowser")) {
        index.oldBrowser();
        return
    }
    index.recmdActive();
    var b = index.getCookie("recmdActive");
    if (!b) {
        index.newUser()
    }
};
index.oldBrowser = function() {
    index.SetCookie("indexCheckBrowser", 1, 1);
    var g = '<div class="old-browser-warning"><span class="old-browser-warning-close"></span><a class="old-browser-warning-content" href="http://windows.microsoft.com/zh-cn/internet-explorer/download-ie" target="_blank">IE浏览器最新版</a><div class="old-browser-warning-bg"></div></div><div class="old-browser-dialog-overlay"></div>';
    $("body").append(g);
    var k = $(".old-browser-dialog-overlay"), h = $(".old-browser-warning");
    k.dblclick(function() {
        $(this).unbind().remove();
        h.remove()
    });
    h.find(".old-browser-warning-close").one("click", function() {
        k.unbind().remove();
        h.remove()
    });
    if (index.ieVersion(6)) {
        var i = $(window).height();
        var j = $(window).scrollTop();
        h.css({top: j + i / 2});
        k.css({top: j, height: i});
        $(window).scroll(function() {
            var a = $(this).scrollTop();
            h.css({top: a + i / 2});
            k.css({top: a})
        })
    }
};
index.switchBtn = function(c, e) {
    $(c).hover(function() {
        $(e).stop(true, true).fadeIn("fast")
    }, function() {
        $(e).stop(true, true).fadeOut("fast")
    })
};
index.announce = function() {
    if (bigscreen) {
        return
    }
    var i = $(".show-case"), h = i.find(".up-title"), f = i.find(".box-all"), g = i.find(".btn");
    g.click(function(b) {
        var a = $(this);
        if (a.hasClass("btn-down")) {
            h.hide();
            g.removeClass("btn-down").addClass("btn-up");
            f.show().css("height", 41).stop(true).animate({height: 430}, 300)
        } else {
            g.removeClass("btn-up").addClass("btn-down");
            f.stop(true).animate({height: 41}, 300, function() {
                f.hide();
                h.show()
            })
        }
        b.stopPropagation()
    });
    h.click(function(a) {
        h.hide();
        g.removeClass("btn-down").addClass("btn-up");
        f.show().css("height", 41).stop(true).animate({height: 430}, 300);
        a.stopPropagation()
    });
    i.click(function(a) {
        a.stopPropagation()
    });
    $(document).click(function() {
        g.removeClass("btn-up").addClass("btn-down");
        f.hide();
        h.show()
    })
};
index.floorTab = function() {
    var e = $(".floor"), f = e.find(".tab li"), g = null;
    f.hover(function() {
        var a = $(this), b = a.index();
        g = setTimeout(function() {
            a.addClass("on").siblings().removeClass("on");
            a.parents(".floor").find(".main-col").hide().eq(b).show();
            var c = a.parents(".floor").find(".main-col").hide().eq(b).show();
            lazyelem.detect();
            if (c.children("script").length == 0) {
                cpmRequire(c)
            }
        }, 200)
    }, function() {
        clearTimeout(g)
    })
};
index.picOpacity = function(h, f) {
    var i = $(h), g = f;
    i.on("mouseenter", "a img", function() {
        $(this).css("opacity", g)
    }).on("mouseleave", "a img", function() {
        $(this).css("opacity", 1)
    })
};
index.listloop = function(ak) {
    var ai = {wrap: "", loopBox: "", loopChild: "", triggerLeft: ".switch-prev", triggerRight: ".switch-next", curCount: "", totalCount: "", hasCount: false, isLoop: true, isLazyImg: false, isLazyDom: false, delay: 0, hasLabel: true, hasLabelObj: null, labelObj: null, isRandom: false};
    $.extend(ai, ak);
    var ab = $(ai.wrap), M = ab.find(ai.triggerLeft), al = ab.find(ai.triggerRight), i = ab.find(ai.loopBox), ad = i.find(ai.loopChild), af = ai.step.wide, T = ai.scrollWidth.wide, U = parseInt(ad.length / af), ae = ad.length, aa = ab.find(ai.curCount), Q = ab.find(ai.totalCount), S = $(ai.hasLabelObj), W = 0, L;
    if (!bigscreen) {
        af = ai.step.narrow;
        T = ai.scrollWidth.narrow;
        L = ad.length % af;
        U = parseInt(ad.length / af);
        ae = ad.length - L
    }
    ai.hasCount && Q.html(U);
    M.unbind().click(function() {
        P()
    });
    al.unbind().click(function() {
        O()
    });
    $(document).keyup(function(a) {
        if (index.isInScreen(al)) {
            if (a.which == 37 || a.which == 75) {
                P()
            }
            if (a.which == 39 || a.which == 74) {
                O()
            }
        }
    });
    if (!(!!window.ActiveXObject || "ActiveXObject" in window)) {
        if (ab.length > 0) {
            var K = util.toucher(ab[0]);
            K.on("swipeLeft", function() {
                O(W)
            }).on("swipeRight", function() {
                P(W)
            })
        }
    }
    var V = ak.labelObj, aj = "", ac;
    if (V) {
        if (U <= 1) {
            V.hide()
        }
        V.find(".prev").unbind().click(function() {
            P()
        });
        V.find(".next").unbind().click(function() {
            O()
        });
        for (ac = 0; ac < U; ac++) {
            aj += "<li></li>"
        }
        V.find("ul").html(aj).find("li").click(function() {
            W = $(this).index();
            n(false, W)
        }).first().addClass("current")
    }
    function O() {
        if (U == 1 || i.is(":animated")) {
            return false
        }
        if (!ai.isLoop) {
            W++;
            if (W >= U) {
                W = U - 1
            }
            n(false, W);
            return
        }
        if (W == U - 1) {
            for (var a = 0; a < af; a++) {
                ad.eq(a).css({position: "relative", left: U * T + "px"})
            }
        }
        W++;
        n(function() {
            if (W == U) {
                W = 0;
                ad.removeAttr("style");
                i.css("left", W * T)
            }
        }, W)
    }
    function P() {
        if (U == 1 || i.is(":animated")) {
            return false
        }
        if (!ai.isLoop) {
            W--;
            if (W <= 0) {
                W = 0
            }
            n(false, W);
            return
        }
        if (W == 0) {
            for (var a = 1; a <= af; a++) {
                ad.eq(ae - a).css({position: "relative", left: -U * T + "px"})
            }
        }
        W--;
        n(function() {
            if (W == -1) {
                W = U - 1;
                ad.removeAttr("style");
                i.css("left", -W * T)
            }
        }, W)
    }
    function n(b, a) {
        ah();
        Y();
        if (ai.hasCount) {
            if (a > U - 1) {
                a = 0
            }
            if (a < 0) {
                a = U - 1
            }
            aa.html(a + 1)
        }
        if (!b) {
            b = function() {
            }
        }
        i.stop(true).animate({left: -W * T}, 300, b);
        R(W == U ? 0 : W);
        if (V) {
            V.find("li").removeClass("current").eq(W == U ? 0 : W).addClass("current")
        }
    }
    function ah() {
        if (!ai.isLazyDom) {
            return
        }
        var h = ad.eq(W).find(".lazy-dom"), a = h.text(), j = a.length;
        if (j == 0) {
            return
        }
        var f = /\n+/g, k = /<!--.*?-->/ig, c = /\/\*.*?\*\//ig, m = /[ ]+</ig, g = a.replace(f, ""), e = g.replace(k, ""), l = e.replace(c, ""), b = l.replace(m, "<");
        h.before(b).remove()
    }
    function Y() {
        if (!ai.isLazyImg) {
            return
        }
        for (var b = 0; b < af; b++) {
            var a = ad.eq(W * af + b).find("img[data-src3]");
            a.each(function() {
                var c = $(this);
                c.attr("src", c.attr("data-src3")).removeAttr("data-src3").addClass("err-product")
            })
        }
    }
    function X() {
        var b = [], e, a;
        b.push('<div class="banner-pager"><ul class="pager">');
        for (e = 1; e <= U; e++) {
            b.push("<li" + (e == 1 ? ' class="current"' : "") + "></li>")
        }
        b.push('</ul><i class="pager-radius"></i></div>');
        var c = $(b.join("")).appendTo(S);
        c.find("li").hover(function() {
            var f = $(this).index(), h = f * af, g = (f + 1) * af;
            a = setTimeout(function() {
                i.stop(true).animate({left: -f * T}, 300);
                R(f);
                if (ai.hasCount) {
                    aa.html(f + 1)
                }
                W = f;
                if (ai.isLazyImg) {
                    for (var s = h; s < g; s++) {
                        ad.eq(s).find("img[data-src3]").each(function() {
                            var w = $(this);
                            w.attr("src", w.attr("data-src3")).removeAttr("data-src3").addClass("err-product")
                        })
                    }
                }
                if (ai.isLazyDom) {
                    var o = ad.eq(W).find(".lazy-dom"), u = o.text(), p = u.length;
                    if (p == 0) {
                        return
                    }
                    var l = /\n+/g, q = /<!--.*?-->/ig, j = /\/\*.*?\*\//ig, t = /[ ]+</ig, m = u.replace(l, ""), k = m.replace(q, ""), r = k.replace(j, ""), v = r.replace(t, "<");
                    o.before(v).remove()
                }
            }, 100)
        }, function() {
            clearTimeout(a)
        })
    }
    function R(a) {
        ab.find(".pager li").removeClass("current").eq(a).addClass("current")
    }
    if (ai.hasLabel && U > 1) {
        X()
    }
    if (ai.delay) {
        var ag = setInterval(function() {
            O()
        }, ai.delay);
        ab.hover(function() {
            clearInterval(ag)
        }, function() {
            ag = setInterval(function() {
                O()
            }, ai.delay)
        })
    }
    if (ai.isRandom) {
        var am = Math.floor(Math.random() * U), N = am * af, Z = (am + 1) * af;
        for (var J = N; J < Z; J++) {
            i.find(ai.loopChild).eq(J).find("img[data-src3]").each(function() {
                var a = $(this);
                a.attr("data-src2", a.attr("data-src3")).removeAttr("data-src3").addClass("err-product")
            })
        }
        i.stop(true).animate({left: -am * T}, 300);
        W = am
    }
    index.floatBar = function() {
        var j = {contents: null, align: "right", vertical: "middle", zIndex: 10000, css: null, id: null, ieFixed: true};
        var c = ($.browser.msie) ? parseInt($.browser.version) : false;
        if (arguments.length < 1 || !(arguments[0] instanceof Object)) {
            return $.error("ECode.floatBar: 参数必须为JSON对象")
        }
        $.extend(j, arguments[0]);
        var e = {position: "fixed", top: "-9999em", left: "-9999em"};
        if (c && c <= 6) {
            e.position = "absolute"
        }
        $('<div class="ECode-floatBar"></div>').css(e).appendTo("body");
        var g = $("body").find(".ECode-floatBar:last");
        g.append(j.contents);
        var b = g.width(), f = g.height(), h = {zIndex: j.zIndex};
        if (j.id != null) {
            g.attr("id", j.id)
        }
        switch (j.align) {
            case"right":
                h.left = "auto";
                h.right = 0;
                break;
            case"left":
                h.right = "auto";
                h.left = 0;
                break;
            case"center":
                h.right = "auto";
                h.left = "50%";
                h.marginLeft = -b / 2;
                break
        }
        switch (j.vertical) {
            case"top":
                h.top = 0;
                break;
            case"bottom":
                h.top = "auto";
                h.bottom = 0;
                break;
            case"middle":
                h.top = "50%";
                h.marginTop = -f / 2;
                if (c && c <= 6) {
                    h.marginTop = 0
                }
                break
        }
        g.css($.extend(h, j.css));
        var a = function() {
            var k = $(document).scrollTop(), p = $(window).height(), o = $(document).width();
            switch (j.vertical) {
                case"top":
                    g.stop().animate({top: k});
                    break;
                case"bottom":
                    var l = p + k - f;
                    if (j.css.marginBottom != null) {
                        var m = parseInt(j.css.marginBottom);
                        if (m >= 0) {
                            l -= m
                        }
                    }
                    g.css({marginTop: 0}).stop().animate({top: l});
                    break;
                case"middle":
                    g.stop().animate({top: p / 2 + k - f / 2});
                    break
                }
        };
        if (j.ieFixed && c && c <= 6) {
            a();
            $(window).scroll(function() {
                a()
            });
            $(window).resize(function() {
                a()
            })
        }
    };
    if (screen.width <= 1280) {
        index.floatBar({zIndex: 10000, contents: $(".floor-guide"), align: "center", vertical: "middle", css: {"margin-left": "-629px"}})
    } else {
        index.floatBar({zIndex: 10000, contents: $(".floor-guide"), align: "center", vertical: "middle", css: {"margin-left": "-647px"}})
    }
    index.floatBarEffect = function() {
        var c = $(".ECode-floatBar"), a = index.ieVersion(6), f = $(".recmd-active");
        function e() {
            var h = parseInt($(document).scrollTop()), g = $(".floor:first").offset().top;
            if (h + $(window).height() > g) {
                if (a) {
                    c.show()
                } else {
                    c.stop(true, true).fadeIn(500);
                    if (f.find(".btn").hasClass("btn-open")) {
                        f.hide()
                    }
                }
            } else {
                if (a) {
                    c.hide()
                } else {
                    c.stop(true, true).fadeOut(500);
                    if (f.find(".btn").hasClass("btn-open")) {
                        f.show()
                    }
                }
            }
        }
        function b() {
            var h = parseInt($(document).scrollTop()), g = $(".floor:first").offset().top;
            if (h + $(window).height() > g) {
                if (f.find(".btn").hasClass("btn-open") && !a) {
                    f.hide()
                }
            } else {
                if (f.find(".btn").hasClass("btn-open") && !a) {
                    f.show()
                }
            }
        }
        bigscreen && e() || b();
        $(window).bind("scroll resize", function() {
            bigscreen && e() || b()
        })
    };
    index.floorGuide = function() {
        var b = $(".floor-guide"), f = b.find("li"), h, c, k, g = $("#goTop"), j = true;
        g.click(function() {
            j = false;
            $("html, body").stop(true).animate({scrollTop: 0}, "fast", function() {
                j = true
            })
        });
        if (b.length == 0) {
            return
        }
        f.click(function() {
            j = false;
            var l = "." + $(this).attr("rel");
            if ($(l).length == 0) {
                return
            }
            $(this).addClass("on").siblings().removeClass("on");
            $("html, body").stop(true).animate({scrollTop: $(l).offset().top - 50}, "fast", function() {
                j = true
            })
        });
        f.hover(function() {
            $(this).addClass("hover")
        }, function() {
            $(this).removeClass("hover")
        });
        function a(l) {
            var m = $(".floor").eq(l - 1);
            if (m.length > 0) {
                return m.offset().top - $(document).scrollTop()
            }
        }
        function e() {
            var m = f.length;
            if (a(1) <= 0) {
                for (var l = 2; l <= m; l++) {
                    if (a(l) - 150 > 0) {
                        f.eq(l - 2).addClass("on").siblings().removeClass("on");
                        return
                    }
                }
                f.eq(m - 1).addClass("on").siblings().removeClass("on")
            } else {
                f.removeClass("on").eq(0).addClass("on")
            }
        }
        e();
        $(window).scroll(function() {
            if (j) {
                e()
            }
        })
    };
    index.floorGuide();
    index.minWidth = function(a) {
        var e = bigscreen ? 1190 : 990;
        var b = $(a), c = b.width();
        if (c < e) {
            b.css("width", e)
        } else {
            b.css("width", "100%")
        }
    };
    index.browserZoomTip = function() {
        if (/ipad|iphone|android|mac/ig.test(navigator.userAgent)) {
            return
        }
        if (index.getData("zoomTip")) {
            return
        }
        detectZoom = function() {
            var e = 0, f = 0, f = window.screen, b = navigator.userAgent.toLowerCase(), c = /mac/ig.test(b);
            (window.devicePixelRatio !== void 0 && !c) ? e = window.devicePixelRatio : ~b.indexOf("msie") ? f.deviceXDPI && f.logicalXDPI && (e = f.deviceXDPI / f.logicalXDPI) : window.outerWidth !== void 0 && window.innerWidth !== void 0 && (e = window.outerWidth / window.innerWidth);
            e && (e = Math.round(e * 100));
            window.devicePixelRatio && window.devicePixelRatio === 1 && (f = Math.round(window.outerWidth / window.innerWidth * 100), Math.abs(e - f) > 2 && (e = f));
            return e
        };
        function a() {
//            var b = '<div id="browserZoomTip" class="browser-zoom-tip"><div class="wrapper"><a href="javascript:void(0);" class="close">&times;</a><i></i>您的浏览器目前处于缩放状态哦，会导致页面显示不正常，您可以在键盘上同时按下<b>Ctrl</b>+<b>0</b>键恢复初始状态。<a href="javascript:void(0);" class="noagain">不再提示</a></div></div>', c = detectZoom();
//            if (c != 100 && $("#browserZoomTip").length == 0) {
//                $("body").prepend(b);
//                $("#browserZoomTip").find(".close").click(function() {
//                    $("#browserZoomTip").remove()
//                });
//                $("#browserZoomTip").find(".noagain").click(function() {
//                    index.setData("zoomTip", 1);
//                    $("#browserZoomTip").remove();
//                    $(window).unbind("resize.zoom")
//                })
//            }
//            if (c == 100 && $("#browserZoomTip").length > 0) {
//                $("#browserZoomTip").remove()
//            }
        }
        a();
        $(window).bind("resize.zoom", function() {
            a()
        })
    };
    index.setData = function(a, b) {
        if (window.localStorage) {
            localStorage.setItem(a, b)
        }
    };
    index.getData = function(a) {
        if (window.localStorage) {
            return localStorage.getItem(a)
        }
        return null
    }
};
function cpmRequire(v) {
    var n = v.find("[cpmId]"), m = [];
    n.each(function() {
        m.push($(this).attr("cpmId"))
    });
    var i = "w", s = m.length, t = [], e = Math.ceil(s / 5);
    for (var u = 0; u < e; u++) {
        t[u] = [];
        for (var w = 0; w < 5; w++) {
            var x = u * 5 + w;
            if (x < s) {
                t[u].push(m[x])
            }
        }
    }
    for (var y = 0; y < e; y++) {
        try {
            apsAdboardGroupObj.aps_adboard_loadAdCpmGroup(t[y], i)
        } catch (o) {
            aps_adboard_errors(t[y])
        }
    }
}
function aps_adboard_romancecpmGroup(r, i) {
    if (r == null || i == null) {
        return
    }
    var q;
    try {
        for (var p = 0, e = r.length; p < e; p++) {
            var s = r[p];
            if (s.pid) {
                q = $(".floor").find("[cpmId=" + s.pid + "]");
                q.find("a").attr({href: s.apsClickUrl, title: s.title}).find("img").attr({src: s.adSrc, alt: s.title})
            } else {
                var o = $(".floor").find("[cpmId=" + i[p] + "] a"), n = o.children("img");
                o.attr({title: o.attr("d-title"), href: o.attr("d-href")});
                n.attr({src: n.attr("d-src"), alt: n.attr("d-alt")})
            }
        }
    } catch (m) {
        throw new Error(m)
    }
}
function aps_adboard_outTime(i) {
    for (var k = 0, j = i.length; k < j; k++) {
        var g = $(".floor").find("[cpmId=" + i[k] + "] a"), h = g.children("img");
        g.attr({title: g.attr("d-title"), href: g.attr("d-href")});
        h.attr({src: h.attr("d-src"), alt: h.attr("d-alt")})
    }
}
function aps_adboard_errors(i) {
    for (var k = 0, j = i.length; k < j; k++) {
        var g = $(".floor").find("[cpmId=" + i[k] + "] a"), h = g.children("img");
        g.attr({title: g.attr("d-title"), href: g.attr("d-href")});
        h.attr({src: h.attr("d-src"), alt: h.attr("d-alt")})
    }
}
index.recommendFn = {getHtml: function(s) {
        var A = "", y = s.sugGoods[0]["skus"], v = y.length;
        for (var B = 0; B < v; B++) {
            var x = "";
            switch (y[B]["promotionType"]) {
                case"1":
                    x = '<i class="recommend-promotion">大聚惠</i>';
                    break;
                case"2":
                    x = '<i class="recommend-promotion">抢购</i>';
                    break;
                case"3":
                    x = '<i class="recommend-promotion">团购</i>';
                    break;
                case"7":
                    x = '<i class="recommend-promotion">返券</i>';
                    break;
                case"8":
                    x = '<i class="recommend-promotion">直降</i>';
                    break
            }
            var i = y[B]["sugGoodsId"];
            var t = y[B]["sugGoodsCode"].substring(9), w;
            var E = y[B]["vendorId"];
            var u = y[B]["handwork"];
            var C = "index2_none_recscnxh_1-" + (B + 1) + "_p_" + E + "_" + t + "_0";
            var F = "baoguang_recscnxh_1-" + (B + 1) + "_" + E + "_" + t + "_" + u;
            var G = {picUrl: "", partNumber: t, shopPicUrl: "/b2c/catentries/000000000", vendorCode: E, linkType: "", trickPoint: C, linkUrl: ""};
            var z = y[B]["price"];
            var D = y[B]["sugGoodsName"];
            if (z) {
                if (z.indexOf(".") <= -1) {
                    z = "<i>¥</i><span><b>" + z + "</b>.00</span>"
                } else {
                    z = "<i>¥</i><span><b>" + z.split(".")[0] + "</b>." + z.split(".")[1] + "</span>"
                }
            } else {
                z = ""
            }
            A += '<li class="floor-recommend-item"><div class="recommend-img-box"><a name="' + C + '" href="' + index.getUrl(G, C) + '" target="_blank" title="' + D + '"><img class="recommend-img" src="' + index.getPic(G, "160x160") + '" alt="' + D + '" /></a></div><p class="recommend-name"><a  name="' + C + '" id="' + F + '" href="' + index.getUrl(G, C) + '" target="_blank"  title="' + D + '">' + D + '</a></p><p class="recommend-price price">' + z + "</p>" + x + "</li>"
        }
        $(".floor-recommend").find(".floor-recommend-list").html(A);
        index.baoguangFun("baoguang_recscnxh_1")
    }, getCMSHtml: function() {
        var e = $(".floor-recommend-list");
        var c = e.find("script").html();
        e.html(c);
        index.getCity(function(a) {
            sn.cityId = a;
            lazyelem.listen("li[data-sku]", "fn", function(b) {
                index.priceDOM.push(b);
                if (index.getPriceFlag) {
                    return
                }
                index.getPrice(sn.cityId)
            })
        })
    }};
index.priceDOMBaogunag = new Array();
index.getBaogunagFlag = false;
index.baoguangFun = function(b) {
    if (typeof _analyseExpoTags == "function") {
        _analyseExpoTags("a", b)
    } else {
        setTimeout(function() {
            index.baoguangFun(b)
        }, 2000)
    }
};
$(function() {
    index.topActive();
    if (!(!!window.ActiveXObject || "ActiveXObject" in window)) {
        var e = $(".first-screen .banner");
        if (e.length > 0) {
            var c = util.toucher(e[0]);
            c.on("swipeLeft", function() {
                Banner._pauseAuto();
                Banner._startAuto();
                Banner.switchType = 0;
                Banner.next()
            }).on("swipeRight", function() {
                Banner._pauseAuto();
                Banner._startAuto();
                Banner.switchType = 0;
                Banner.prev()
            })
        }
    }
    index.switchBtn(".first-screen .banner", ".first-screen .banner-btn");
    index.switchBtn(".floor-zone", ".floor-zone-main .switch-btn");
    index.announce();
    index.floorTab();
    index.picOpacity(".second-screen", "0.8");
    index.picOpacity(".floor-financial", "0.8");
    index.picOpacity(".main-col", "0.8");
    index.listloop({wrap: ".floor-zone-main", loopBox: ".hots-and-share-main", loopChild: ".hots-and-share-item", hasLabelObj: ".hots-and-share", step: {wide: 1, narrow: 1}, scrollWidth: {wide: 1000, narrow: 800}, isLazyDom: true});
    index.floatBarEffect();
    if (index.ieVersion(6)) {
        index.minWidth("body, html");
        $(window).resize(function() {
            index.minWidth("body, html")
        })
    }
    lazyelem.listen(".floor", "dom", function(b) {
        var a = $(b).find("div[jsModelId]");
        if (a && a.length > 0) {
            index.getCity(function(g) {
                sn.cityId = g;
                index.lazyLoadInit(a, g)
            })
        }
    });
    lazyelem.listen(".J-domLazy", "dom", function(a) {
        cpmRequire(a);
        var h = "";
        var b = $(a).attr("trickPoint");
        if (b) {
            var i = b.indexOf("rec");
            if (-1 != i) {
                h = "baoguang_" + b.substring(i)
            }
        }
        index.getCity(function(f) {
            sn.cityId = f;
            lazyelem.listen("li[data-sku]", "fn", function(g) {
                index.priceDOM.push(g);
                if (index.getPriceFlag) {
                    return
                }
                index.getPrice(f);
                index.baoguang(h)
            })
        });
        if (window.saExportUtil) {
            lazyelem.listen(a.find("a[expo] img"), "bat", function(s) {
                var t = [], f = [], q;
                for (q = 0; q < s.length; q++) {
                    var g = s[q].parent(), r = g.attr("expo"), p = parseInt(g.attr("expotype"));
                    if (p == 1) {
                        t.push(r)
                    }
                    if (p == 2) {
                        f.push(r)
                    }
                }
                saExportUtil.sendCustomExpoData(t.join(","), 1);
                saExportUtil.sendCustomExpoData(f.join(","), 2)
            })
        }
    });
    index.getFloorNum();
    lazyelem.listen(".floor-recommend", "fn", function(a) {
        index.getCity(function(b) {
            sn.cityId = b;
            var m = "", j = "", l = "", k = "";
            k = index.getCookie("custno");
            if (typeof k != "undefined" && k) {
                j = k
            }
            l = index.getCookie("_snma");
            if (typeof l != "undefined" && l) {
                m = l.split("|")[1]
            }
            $.ajax({url: tuijianDomain + "/recommend-portal/recommendv2/biz.jsonp?&u=" + j + "&c=" + m + "&cityId=" + sn.cityId + "&sceneIds=12-14&count=6", type: "GET", dataType: "jsonp", error: function(h, f, g) {
                    index.recommendFn.getCMSHtml()
                }, success: function(f) {
                    if (f.sugGoods[0]["resCode"] == "01" || f.sugGoods[0]["resCode"] == "03") {
                        if (f.sugGoods[0]["skus"].length < 6) {
                            index.recommendFn.getCMSHtml()
                        } else {
                            index.recommendFn.getHtml(f)
                        }
                    } else {
                        index.recommendFn.getCMSHtml()
                    }
                }})
        })
    });
    lazyelem.listen();
    index.activeDialog();
    index.browserZoomTip()
});