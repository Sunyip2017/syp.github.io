var sa = sa || {};
function HashMap() {
    this.keys = new Array();
    this.data = new Object();
    this.put = function(a, b) {
        if (this.data[a] == null) {
            this.keys.push(a)
        }
        this.data[a] = b
    };
    this.get = function(a) {
        return this.data[a]
    };
    this.remove = function(a) {
        if (this.get(a) != null) {
            delete this.data[a]
        }
    }
}
function Set() {
    this.isNullAdded = false;
    var a = {};
    this.contains = function(b) {
        if (b === null) {
            return this.isNullAdded
        } else {
            if (b === undefined) {
                return false
            } else {
                return a[b] ? true : false
            }
        }
    };
    this.add = function(b) {
        if (b === null) {
            this.isNullAdded = true
        } else {
            if (b !== undefined) {
                a[b] = true
            }
        }
        return this
    };
    this.addAll = function(c) {
        if (c !== null && c !== undefined && c instanceof Array) {
            for (var b = 0; b < c.length; b++) {
                this.add(c[b])
            }
        }
        return this
    };
    this.remove = function(b) {
        if (b === null) {
            this.isNullAdded = false
        } else {
            if (b !== undefined) {
                delete a[b]
            }
        }
        return this
    };
    this.removeAll = function(c) {
        if (c !== null && c !== undefined && c instanceof Array) {
            for (var b = 0; b < c.length; b++) {
                this.remove(c[b])
            }
        }
        return this
    };
    this.clear = function() {
        this.isNullAdded = false;
        a = {};
        return this
    };
    this.size = function() {
        return this.list().length
    };
    this.isEmpty = function() {
        return this.list().length > 0 ? false : true
    };
    this.list = function() {
        var b = [];
        if (this.isNullAdded) {
            b.push(null)
        }
        for (o in a) {
            if (a.hasOwnProperty(o)) {
                b.push(o)
            }
        }
        return b
    }
}
function Base64() {
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    this.encode = function(c) {
        var a = "";
        var k, h, f, j, g, e, d;
        var b = 0;
        c = _utf8_encode(c);
        while (b < c.length) {
            k = c.charCodeAt(b++);
            h = c.charCodeAt(b++);
            f = c.charCodeAt(b++);
            j = k >> 2;
            g = ((k & 3) << 4) | (h >> 4);
            e = ((h & 15) << 2) | (f >> 6);
            d = f & 63;
            if (isNaN(h)) {
                e = d = 64
            } else {
                if (isNaN(f)) {
                    d = 64
                }
            }
            a = a + _keyStr.charAt(j) + _keyStr.charAt(g) + _keyStr.charAt(e) + _keyStr.charAt(d)
        }
        return a
    };
    this.decode = function(c) {
        var a = "";
        var k, h, f;
        var j, g, e, d;
        var b = 0;
        c = c.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (b < c.length) {
            j = _keyStr.indexOf(c.charAt(b++));
            g = _keyStr.indexOf(c.charAt(b++));
            e = _keyStr.indexOf(c.charAt(b++));
            d = _keyStr.indexOf(c.charAt(b++));
            k = (j << 2) | (g >> 4);
            h = ((g & 15) << 4) | (e >> 2);
            f = ((e & 3) << 6) | d;
            a = a + String.fromCharCode(k);
            if (e != 64) {
                a = a + String.fromCharCode(h)
            }
            if (d != 64) {
                a = a + String.fromCharCode(f)
            }
        }
        a = _utf8_decode(a);
        return a
    };
    _utf8_encode = function(b) {
        b = b.replace(/\r\n/g, "\n");
        var a = "";
        for (var e = 0; e < b.length; e++) {
            var d = b.charCodeAt(e);
            if (d < 128) {
                a += String.fromCharCode(d)
            } else {
                if ((d > 127) && (d < 2048)) {
                    a += String.fromCharCode((d >> 6) | 192);
                    a += String.fromCharCode((d & 63) | 128)
                } else {
                    a += String.fromCharCode((d >> 12) | 224);
                    a += String.fromCharCode(((d >> 6) & 63) | 128);
                    a += String.fromCharCode((d & 63) | 128)
                }
            }
        }
        return a
    };
    _utf8_decode = function(a) {
        var b = "";
        var d = 0;
        var e = c1 = c2 = 0;
        while (d < a.length) {
            e = a.charCodeAt(d);
            if (e < 128) {
                b += String.fromCharCode(e);
                d++
            } else {
                if ((e > 191) && (e < 224)) {
                    c2 = a.charCodeAt(d + 1);
                    b += String.fromCharCode(((e & 31) << 6) | (c2 & 63));
                    d += 2
                } else {
                    c2 = a.charCodeAt(d + 1);
                    c3 = a.charCodeAt(d + 2);
                    b += String.fromCharCode(((e & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    d += 3
                }
            }
        }
        return b
    }
}
function getUrlParamsMap(c) {
    var g = c.substring(c.indexOf("?") + 1, c.length);
    var e = g.split("&");
    var f = new HashMap();
    for (var d = 0; d < e.length; d++) {
        var a = e[d].split("=");
        for (var b = 0; b < a.length; b++) {
            f.put(a[b], a[++b])
        }
    }
    return f
}
function isArray(a) {
    return Object.prototype.toString.call(a).toLowerCase() == "[object array]"
}
function inArray(c, a) {
    for (var b = 0; b < a.length; b++) {
        if (c == a[b]) {
            return true
        }
    }
    return false
}
function getkeyWord(f) {
    var d = f.lastIndexOf("/");
    var c = f.length;
    if (f.indexOf("?") != -1) {
        c = f.indexOf("?")
    }
    var e = f.substring(d, c);
    return e
}
function getJsFilePath(c) {
    var g = "";
    if (ego_prd_reg.test(_hostName) || sa.env == "prd") {
        var b = ("https:" == document.location.protocol) ? "https://imgssl.suning.com" : "http://script.suning.cn";
        g = b
    } else {
        if (ego_pre_v7_reg.test(_hostName) || sa.env == "pre") {
            var a = ("https:" == document.location.protocol) ? "https://preimgssl.suning.com" : "http://prescript.suning.cn";
            g = a
        } else {
            if (ego_sit_v7_reg.test(_hostName)) {
                var e = _hostName.charAt(_hostName.indexOf("sit") + 3);
                var h = "https://sit" + e + "imgssl.suning.com";
                var d = "http://sit" + e + "script.suning.cn";
                var f = ("https:" == document.location.protocol) ? h : d;
                g = f
            } else {
                if (ego_sit1_v7_reg.test(_hostName)) {
                    if (/^\d$/.test(_hostName.charAt(_hostName.indexOf("sit") - 1))) {
                        var e = _hostName.charAt(_hostName.indexOf("sit") - 1);
                        var h = "https://sit" + e + "imgssl.suning.com";
                        var d = "http://sit" + e + "script.suning.cn";
                        var f = ("https:" == document.location.protocol) ? h : d
                    } else {
                        var f = ("https:" == document.location.protocol) ? "https://sit1imgssl.suning.com" : "http://sit1script.suning.cn"
                    }
                    g = f
                } else {
                    if (sa.env == "sit") {
                        var h = "https://sit1imgssl.suning.com";
                        var d = "http://sit1script.suning.cn";
                        var f = ("https" == document.location.protocol) ? h : d;
                        g = f
                    } else {
                        var a = ("https:" == document.location.protocol) ? "https://preimgssl.suning.com" : "http://prescript.suning.cn";
                        g = a
                    }
                }
            }
        }
    }
    g = g + "/javascript/sn_da/" + c;
    return g
}
function _loadJs(f) {
    var b = f;
    var e = document.getElementsByTagName("script");
    for (var c = 0; c < e.length; c++) {
        if (e[c].src == b) {
            return
        }
    }
    var a = document.createElement("script");
    a.type = "text/javascript";
    a.async = true;
    a.src = b;
    var d = e[0];
    d.parentNode.insertBefore(a, d)
}
var ego_prd_reg = /\.suning\.com/;
var ego_pre_v7_reg = /pre\.cnsuning\.com/;
var ego_sit_v7_reg = /sit[1-5]\.cnsuning\.com/;
var ego_sit1_v7_reg = /sit\.cnsuning\.com/;
var _hostName = document.location.hostname;
var _thisUrl = document.location.href;
var _base64 = new Base64();
var sa_userId = document.getElementById("wcsa_userId") || document.getElementById("userId"), sa_userId = sa_userId ? sa_userId.value : "", sa_userType = document.getElementById("wcsa_userType") || document.getElementById("userType"), sa_userType = sa_userType ? sa_userType.value : "", sa_orderId = document.getElementById("orderId") || document.getElementById("wcsa_orderId"), sa_orderId = sa_orderId ? sa_orderId.value : "", sa_isNew = document.getElementById("gaga"), sa_isNew = sa_isNew ? sa_isNew.value : "", sa_quickRegister = document.getElementById("gagaId"), sa_quickRegister = sa_quickRegister ? document.getElementById("gagaId").value : "", sa_resourceType = document.getElementById("resourceType"), _resourceType = sa_resourceType ? sa_resourceType.value : "web", sa_errorCode = document.getElementById("errorCode"), _saErrorCode = sa_errorCode ? sa_errorCode.value : "", urlPattern = document.getElementById("URLPattern") || document.getElementById("CUrlPattern"), urlPattern = urlPattern ? urlPattern.value : "", sa_orderInfo = document.getElementById("orderInfo"), sa_orderInfo = sa_orderInfo ? sa_orderInfo.value : "";
var _dasaMap = _dasaMap || new HashMap();
var _dagaMap = _dagaMap || new HashMap();
function _dapush() {
    _dasaMap.put("_sapush", "");
    _dagaMap.put("_gapush", "")
}
function _dapushbook() {
    _dasaMap.put("_sapushbook", "");
    _dagaMap.put("_gapushbook", "")
}
(function(d, e, j, h, f, c, b) {
    d.GoogleAnalyticsObject = f;
    d[f] = d[f] || function() {
        (d[f].q = d[f].q || []).push(arguments)
    }, d[f].l = 1 * new Date();
    c = e.createElement(j), b = e.getElementsByTagName(j)[0];
    c.async = 1;
    c.src = h;
    b.parentNode.insertBefore(c, b)
})(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");
ga("create", "UA-1730956-18", "auto");
ga("require", "displayfeatures");
if (_hostName.indexOf("product.suning.com") > -1) {
    ga("set", "dimension1", document.getElementById("ga_itemDataBean_itemID") ? document.getElementById("ga_itemDataBean_itemID").value : "");
    ga("set", "dimension2", "product");
    ga("set", "dimension3", (sn && sn.categoryName1 ? sn.categoryName1 : "") + "|" + (sn && sn.categoryName2 ? sn.categoryName2 : "") + "|" + (sn && sn.categoryName3 ? sn.categoryName3 : ""));
    ga("set", "dimension4", sn && sn.brandName ? sn.brandName : "");
    ga("set", "dimension5", sn && sn.promotionPrice ? sn.promotionPrice : "")
}
ga("send", "pageview");
_addAllYesiDiggerCode();
function _addAllYesiDiggerCode() {
    var c = new Array();
    c.push("^http://www\\.suning\\.com/emall/cprd");
    c.push("^http://product\\.suning\\.com");
    c.push("^http://list\\.suning\\.com");
    c.push("^http://search\\.suning\\.com");
    c.push("/epp-paycore/payGateWay/show\\.htm");
    c.push("/payment\\.suning\\.com/epps-ppps");
    c.push("/payment\\.suning\\.com/epps-pppm");
    c.push("/payment\\.suning\\.com/epps-ppms");
    c.push("/paytestpre\\.suning\\.com/epps-ppps");
    c.push("/paytestpre\\.suning\\.com/epps-pppm");
    c.push("/paytestpre\\.suning\\.com/epps-ppms");
    c.push("/paymentsit\\.cnsuning\\.com/epps-ppps");
    c.push("/paymentsit\\.cnsuning\\.com/epps-pppm");
    c.push("/paymentsit\\.cnsuning\\.com/epps-ppms");
    c.push("/SNOrderPaySuccessView");
    c.push("/OrderItemDisplay");
    c.push("/SNCart2ManageCmd");
    c.push("/SNPayBeforeComfirmView");
    c.push("/SNUserRegisterComfirmView");
    c.push("/reg\\.suning\\.com/b2cregsucc");
    c.push("/reg\\.suning\\.com/compregsucc");
    c.push("/reg\\.suning\\.com/b2bcardregsucc");
    c.push("cuxiao\\.suning\\.com");
    c.push("/cuxiao_");
    var b = false;
    for (var a = 0; a < c.length; a++) {
        if ((new RegExp(c[a]).test(_thisUrl))) {
            b = true;
            break
        }
    }
    if (!b) {
        _addIdiggerScript()
    }
}
function _addIdiggerScript() {
    var a = document.createElement("script");
    a.text = 'var _wmmq = _wmmq || [];var _wmmq_param1 = ["db", "ifc"];var _wmmq_param2 = ["sitecode", "T-000130-01"];var _wmmq_param_end = ["_trackPoint"];var _custno = "";var _cookiesArray = document.cookie.split("; ");for (var i = 0; i < _cookiesArray.length; i++) {var _cookieInfo = _cookiesArray[i].split("=");if (_cookieInfo[0] == "custno") {_custno = decodeURIComponent(_cookieInfo[1] ? _cookieInfo[1] : "");break;}}var _wmmq_param3 = ["userid", _custno, "userflag", ""];if (isArray(_wmmq)) {if (_wmmq.length == 0) {_wmmq.push(_wmmq_param1, _wmmq_param2);_wmmq.push(_wmmq_param3);_wmmq.push(_wmmq_param_end);} else {var _wmmq_param_list = new Set();var _wmmq_param;for (x in _wmmq) { _wmmq_param = _wmmq[x]; _wmmq_param_list.add(_wmmq_param.toString());} if (!_wmmq_param_list.contains(_wmmq_param1.toString())) {_wmmq.push(_wmmq_param1);} if (!_wmmq_param_list.contains(_wmmq_param2.toString())) {_wmmq.push(_wmmq_param2);} if (!_wmmq_param_list.contains(_wmmq_param3.toString())) {_wmmq.push(_wmmq_param3);} if (!_wmmq_param_list.contains(_wmmq_param_end.toString())) {_wmmq.push(_wmmq_param_end);}}}';
    a.setAttribute("type", "text/javascript");
    if (document.body) {
        document.body.appendChild(a)
    }
}
(function() {
    var e = ("https:" == document.location.protocol ? "https://2" : "http://1") + ".allyes.com.cn/aywmq.js";
    var c = ("https:" == document.location.protocol ? "https://2" : "http://1") + ".qtmojo.cn/aywmq_qt.js";
    if (!d(e) && !d(c)) {
        var a = document.createElement("script");
        a.type = "text/javascript";
        a.async = true;
        a.src = c;
        var b = document.getElementsByTagName("script")[0];
        b.parentNode.insertBefore(a, b)
    }
    function d(j) {
        if (j == undefined || j == null || j == "") {
            return false
        }
        var f = document.getElementsByTagName("script");
        if (f == undefined || f == null) {
            return false
        }
        var h;
        for (var g = 0; g < f.length; g++) {
            h = f[g];
            if (h.src == null || h.src == "") {
                continue
            }
            if (h.src.indexOf(j) != -1) {
                return true
            }
        }
        return false
    }}
)();
var _samap = _samap || new HashMap();
var sa = sa || {};
if (ego_prd_reg.test(_hostName) || sa.env == "prd") {
    _samap.put("_isPrd", "true")
}
_saAsynLoad();
var _initData = [];
_samap.put("_saPvDatas", _initData);
var fUrl = document.referrer;
if (_thisUrl.indexOf("/SNCart2ManageCmd?") != -1 || _thisUrl.indexOf("/SNPayBeforeComfirmView?") != -1 || _thisUrl.indexOf("/payGateWay/show.htm?") != -1 || _thisUrl.indexOf("/payment.suning.com/epps-ppps") != -1 || _thisUrl.indexOf("/payment.suning.com/epps-pppm") != -1 || _thisUrl.indexOf("/payment.suning.com/epps-ppms") != -1 || _thisUrl.indexOf("/paytestpre.suning.com/epps-ppps") != -1 || _thisUrl.indexOf("/paytestpre.suning.com/epps-pppm") != -1 || _thisUrl.indexOf("/paytestpre.suning.com/epps-ppms") != -1 || _thisUrl.indexOf("/paymentsit.cnsuning.com/epps-ppps") != -1 || _thisUrl.indexOf("/paymentsit.cnsuning.com/epps-pppm") != -1 || _thisUrl.indexOf("/paymentsit.cnsuning.com/epps-ppms") != -1 || _thisUrl.indexOf("/cart2/private/cart2Show.do") != -1 || _thisUrl.indexOf("/cart2/private/cartSplitOrdersView.do") != -1 || _thisUrl.indexOf("/SNOrderPaySuccessView") != -1 || _thisUrl.indexOf("/SNMWPaySubmitView") != -1 || _thisUrl.indexOf("/cartFourOrdersView") != -1 || _thisUrl.indexOf("/project/cart/cart2") != -1 || _thisUrl.indexOf("/project/cart/cartSplitOrders") != -1 || _thisUrl.indexOf("/project/cart/cartFourOrdersView") != -1 || _thisUrl.indexOf("/project/cart/weixinPaySuccess") != -1 || _thisUrl.indexOf("https://wpay.suning.com/epps-pwg/showDefault.htm") != -1 || _thisUrl.indexOf("https://wpaypre.cnsuning.com/epps-pwg/showDefault.htm") != -1 || _thisUrl.indexOf("https://wpaysit.cnsuning.com/epps-pwg/showDefault.htm") != -1) {
    var data1 = sa_orderId;
    var data2 = sa_isNew ? sa_isNew : "";
    var orderDatas = [data1];
    _samap.put("_saOrderDatas", orderDatas);
    if (data2.indexOf("true") != -1) {
        var data3 = sa_quickRegister;
        var registerDatas = [data3];
        _samap.put("_saRegisterDatas", registerDatas)
    }
} else {
    if (_thisUrl.indexOf("/SNUserRegisterComfirmView") != -1 || _thisUrl.indexOf("/SNMobileRegisterConfirmView") != -1 || _thisUrl.indexOf("/SNMWUserRegisterSuccessView") != -1 || _thisUrl.indexOf("/reg.suning.com/b2cregsucc") != -1 || _thisUrl.indexOf("/reg.suning.com/compregsucc") != -1 || _thisUrl.indexOf("/reg.suning.com/b2bcardregsucc") != -1 || _thisUrl.indexOf("/reg.suning.com/wap/succjump") != -1 || _thisUrl.indexOf("/wap/register/getRegisterSuccess") != -1 || _thisUrl.indexOf("/regpre.cnsuning.com/b2cregsucc") != -1 || _thisUrl.indexOf("/regpre.cnsuning.com/compregsucc") != -1 || _thisUrl.indexOf("/regpre.cnsuning.com/b2bcardregsucc") != -1 || _thisUrl.indexOf("/regpre.cnsuning.com/wap/succjump") != -1) {
        var data1 = sa_userId;
        var registerDatas = [data1];
        _samap.put("_saRegisterDatas", registerDatas)
    }
}
var productId;
if (_thisUrl.indexOf("/rps-web/rp/showActivity_") > -1 || _thisUrl.indexOf("/snupgbpv_10052_") > -1 || _thisUrl.indexOf("/snmwsgf_") > -1) {
    var proObject = document.getElementById("ga_itemDataBean_itemID");
    productId = proObject ? proObject.value : ""
}
var supplierID;
var cSupplierIDObject = document.getElementById("CSupplierID");
supplierID = cSupplierIDObject ? cSupplierIDObject.value : "";
function _sapush() {
    var a;
    try {
        var d = document.getElementById("ga_itemDataBean_itemID");
        if (d) {
            a = d.value
        }
        var g = "";
        var c = document.getElementById("mdmCityId");
        if (c) {
            g = c.value
        }
        var h = "";
        var e = document.getElementById("shipOffset");
        if (e) {
            h = e.value
        }
        var f = [a, g, h];
        _samap.put("_saStorageDatas", f)
    } catch (b) {
    }
}
function _sapushbook() {
    var a;
    try {
        var d = document.getElementById("ga_itemDataBean_itemID");
        if (d) {
            a = d.value
        }
        var g = "";
        var c = document.getElementById("mdmCityId");
        if (c) {
            g = c.value
        }
        var h = "";
        var e = document.getElementById("shipOffset");
        if (e) {
            h = e.value
        }
        var f = [a, g, h];
        _samap.put("_saStorageDatas", f)
    } catch (b) {
    }
}
function _searchPush(k) {
    var t = document.location.href;
    var u = t.substring(t.indexOf("?") + 1, t.length);
    var x = u.split("&");
    var y = new HashMap();
    for (var q = 0; q < x.length; q++) {
        var s = x[q].split("=");
        for (var v = 0; v < s.length; v++) {
            y.put(s[v], s[++v])
        }
    }
    var a = y.get("searchKeywords");
    var h = (!a || a == null || a == "undefined") ? "" : a;
    var g = k;
    var f = "0";
    var l = y.get("groupName");
    var e = (!l || l == null || l == "undefined") ? "" : l;
    var j = y.get("groupNameValue");
    var d = (!j || j == null || j == "undefined") ? "" : j;
    var w = y.get("catalogId");
    var c = (!w || w == null || w == "undefined") ? "" : w;
    var b = [h, g, f, e, d, c];
    _samap.put("_saSearchDatas", b)
}
function _saAsynLoad() {
    _dasaMap.put = function(a, b) {
        if (_dasaMap.data[a] == null) {
            _dasaMap.keys.push(a)
        }
        _dasaMap.data[a] = b;
        _saAsynCheck()
    };
    _saAsynCheck()
}
function _saAsynCheck() {
    if (_dasaMap.get("_sapush") != null) {
        _sapush();
        _dasaMap.remove("_sapush")
    }
    if (_dasaMap.get("_sapushbook") != null) {
        _sapushbook();
        _dasaMap.remove("_sapushbook")
    }
    if (_dasaMap.get("_searchPush") != null) {
        _searchPush(_dasaMap.get("_searchPush"));
        _dasaMap.remove("_searchPush")
    }
}
var _saPageViewId = _createPageViewId();
_initSaPvHasSendFlg();
sa.hotClickObj = {count: 0, pointSet: ""};
var _snma = "_snma";
var _snmaKeysArr = ["constant", "visitorid", "firstViewTime", "lastViewTime", "thisViewTime", "totalPvs", "totalVisits"];
var _snmb = "_snmb";
var _snmbKeysArr = ["visitid", "inTime", "outTime", "views"];
var _snmc = "_snmc";
var _snmp = "_snmp";
var _snsr = "_snsr";
var _snsrKeysArr = ["source", "medium", "content", "campaign", "theme"];
var ad_sp;
var _snmz = "_snmz";
var _snmzKeysArr = ["pvid", "clickDots"];
var _snck = "_snck";
var _snms = "_snms";
var _snml = "_snml";
var _snmx = "_snmx";
var _snmk = "_snmk";
var _snsd = "_snsd";
var _snmo = "_snmo";
var _snmt = "_snmt";
var _snmg = "_snmg";
var _snme = "_snme";
var _tag = "|";
var _no_data_tag = "";
var _splited = "*:*";
var expires_ms_2years = 365 * 2 * 24 * 60 * 60 * 1000;
var expires_ms_30mins = 30 * 60 * 1000;
var expires_ms_24hours = 86400000;
var _protocol = location.protocol;
var _snProtocol = (("https:" == document.location.protocol) ? "https://" : "http://");
var _isSaPrd = true;
var _saServer = _getSaServer(_isSaPrd);
var _toTitle = document.title;
var _toUrl = _getToUrl();
var _fromUrl = _getFromUrl();
var _fromTitle = _no_data_tag;
var _searchersArr = new Array(".google.com", ".baidu.com", ".soso.com", ".bing.com", ".yahoo.com", ".sogou.com", ".360.cn", ".so.com", ".youdao.com", ".haosou.com");
var _sourceMediumArr = new Array("direct", "referral", "organic");
var _inTime = _no_data_tag;
var _pvFlag = 0;
var _crossDayFlag = 0;
var memberID = _getCookie("custno") ? _getCookie("custno") : "-";
var loginUserName = _getCookie("idsLoginUserIdLastTime") ? _getCookie("idsLoginUserIdLastTime") : "";
var loginStatus = _getCookie("logonStatus") ? _getCookie("logonStatus") : "";
var idsEppLastLogin = _getCookie("idsEppLastLogin") ? _getCookie("idsEppLastLogin") : "";
var ua = navigator.userAgent, pf = navigator.platform, p = "push", m = "match", i = "indexOf", npo = "unknow but like Phone", npa = "unknow but like Tablet", n = "unknown", r, os = _getOSAndTer(), Bro = _getExplore(), OS, Ter;
os.length == 2 ? (OS = os[0], Ter = os[1]) : !1;
var IE = document.all ? true : false;
var saCustomDataUtil = new SaCustomDataUtil();
var pageSaleCookieUtil = new PageSaleCookieUtil();
var pageViewUtil = new PageViewUtil();
_saStart();
_samap.put = function(a, b) {
    if (_samap.data[a] == null) {
        _samap.keys.push(a)
    }
    _samap.data[a] = b;
    _saStart()
};
var uvId, sessionId, basicIds, trafficSource;
(function() {
    var c = frames.length;
    if (c > 0) {
        for (var a = 0; a < c; a++) {
            try {
                frames[a].document.onclick = _updateSnml
            } catch (b) {
            }
        }
    }
})();
AddListener(document, "click", function(a) {
    _globalClick(a)
});
AddListener(window, "unload", function(a) {
    _sendClickPoint(true)
});
function _globalClick(b) {
    try {
        var a = b || window.event || arguments[0];
        _putMouseXY(a)
    } catch (c) {
    }
}
function _putMouseXY(c) {
    try {
        var g = 0, b = 0;
        var a = c || window.event;
        if (a.pageX) {
            g = a.pageX;
            b = a.pageY
        } else {
            g = a.clientX + document.body.scrollLeft - document.body.clientLeft;
            b = a.clientY + document.body.scrollTop - document.body.clientTop
        }
        g = ((g + "").indexOf(".") != -1) ? g.toFixed(2) : g;
        b = ((b + "").indexOf(".") != -1) ? b.toFixed(2) : b;
        var f = "(" + g + "," + b + ")";
        if (sa.hotClickObj.pointSet == "") {
            sa.hotClickObj.pointSet = f
        } else {
            sa.hotClickObj.pointSet = sa.hotClickObj.pointSet + ";" + f
        }
        sa.hotClickObj.count = sa.hotClickObj.count + 1;
        _sendClickPoint()
    } catch (d) {
    }
}
function _sendClickPoint(h) {
    try {
        if (h == undefined || h == null) {
            h = false
        }
        if (sa.hotClickObj.count == 0) {
            return false
        }
        if (!h && sa.hotClickObj.count < 10) {
            return false
        }
        var g = _getOnlyId();
        var b = _encode(sa.hotClickObj.pointSet);
        var c = _getSense();
        var j = _getPrinColor();
        var d = _getSnmaMapFromCookie();
        var k = d.get("visitorid");
        var a = _snProtocol + _getSaServer(_isSaPrd, true) + "/hotClick.gif";
        a = a + "?oId=" + g + "&pvId=" + _saPageViewId + "&ponits=" + b + "&url=" + _encode(_toUrl) + "&pageType=" + _resourceType + "&bro=" + Bro + "&sense=" + c + "&color=" + j + "&visId=" + k + "&memId=" + memberID + "&hidUrlPattern=" + urlPattern;
        _httpGifSend(a);
        sa.hotClickObj.pointSet = "";
        sa.hotClickObj.count = 0
    } catch (f) {
    }
}
function _saStart() {
    if (_samap.get("_saPvDatas") != null) {
        var j = [loginUserName];
        loginUserName ? j.push("R") : j.push("G");
        _saInit(_arrayToString(j));
        _samap.remove("_saPvDatas")
    }
    if (_samap.get("_saSearchDatas") != null) {
        var d = _samap.get("_saSearchDatas");
        var f = _arrayToString(d);
        _sendSearchDatas(f);
        _samap.remove("_saSearchDatas")
    }
    if (_samap.get("_saOrderDatas") != null) {
        var g = _samap.get("_saOrderDatas");
        var b = _arrayToString(g);
        _sendOrderDatas(b);
        _samap.remove("_saOrderDatas")
    }
    if (_samap.get("_saRegisterDatas") != null) {
        var h = _samap.get("_saRegisterDatas");
        var a = _arrayToString(h);
        _sendRegisterDatas(a);
        _samap.remove("_saRegisterDatas")
    }
    if (_samap.get("_saStorageDatas") != null) {
        var e = _samap.get("_saStorageDatas");
        var c = _arrayToString(e);
        _sendStorageDatas(c);
        _samap.remove("_saStorageDatas")
    }
}
function getHash() {
    var a = location.href.match(/#(.*)$/);
    return a ? a[1] : ""
}
function _getToUrl() {
    var b = "-";
    var a = getHash();
    if (document.location.hash) {
        b = document.location.href.substring(0, location.href.indexOf(a) - 1)
    } else {
        b = document.location.href
    }
    return b
}
function _getFromUrl() {
    var g = document.referrer;
    var h = document.location.href;
    var e = _getCookie(_snml);
    if ((_protocol == "https:" && g != "" && e && e.substring(0, 6) == "https:" && e != g) || (_protocol == "http:" && g == "" && e && e.substring(0, 6) == "https:") || (_protocol == "https:" && g == "" && e && e.substring(0, 6) == "https:") || (g != "" && e && e != g)) {
        g = e
    }
    if (e) {
        _delCookie(_snml)
    }
    if (h != "" && (h.indexOf("sourceUrl4Sa") != -1)) {
        var b = SaPick(h, "sourceUrl4Sa", "&");
        g = decodeURIComponent(b)
    } else {
        if ((!g || g == null || g == "") && h != "" && (h.indexOf("returnUrl") != -1)) {
            var d = h.substring(h.indexOf("?") + 1, h.length);
            var f = d.split("&");
            for (var c = 0; c < f.length; c++) {
                var a = f[c].split("=");
                if (a[0] == "returnUrl") {
                    g = a[1]
                }
            }
        }
    }
    return g
}
function _saPageViewInit() {
    try {
        var a = [loginUserName];
        loginUserName ? a.push("R") : a.push("G");
        sa.pvHasSend = false;
        urlPattern = document.getElementById("URLPattern") || document.getElementById("CUrlPattern"), urlPattern = urlPattern ? urlPattern.value : "";
        _saInit(_arrayToString(a))
    } catch (b) {
    }
}
function _saInit(c) {
    if (sa.pvHasSend && sa.pvHasSend == true) {
        return false
    }
    _putSnmaTimesAndViews();
    _checkSnmc();
    _putSnsr();
    _putSnmb();
    var g = _getCookie(_snma);
    var s = _getSnmbAndParam(c);
    var h = _getSnmx();
    var j = _getCookie(_snsr);
    var a = _getSnmzMapFromCookie();
    var q = _getStrFromKeysArrAndValuesStr(_snmzKeysArr, a);
    var d = _saErrorCode;
    if ((typeof g == "undefined") && (typeof j == "undefined")) {
        var b = new Date();
        var f = _getOnlyId();
        var t = ["1", f, b.getTime(), b.getTime(), b.getTime(), 1, 1];
        g = _arrayToString(t);
        s = s.substring(0, s.lastIndexOf(_tag) + 1) + "1";
        var l = _getSnsrMapFromCookie();
        l = _checkSource(l);
        l = _checkSnsr(l);
        j = _getStrFromKeysArrAndValuesStr(_snsrKeysArr, l)
    }
    try {
        _sendInitData(g, s, h, j, q, d);
        sa.pvHasSend = true
    } catch (k) {
        sa.pvHasSend = false
    }
    _addCookie(_snmp, _saPageViewId, "/", "", "");
    _delCookie(_snmz);
    _delCookie(_snck);
    _refreshSnmbInTime()
}
var GetMainProId = function() {
    var c = "-", b;
    var a = document.getElementById("ga_itemDataBean_itemID") || document.getElementById("justAddPartNumber");
    if (a) {
        b = a.value;
        b = (b.length == 18 ? b.substring(9) : b)
    }
    if (b) {
        c = b
    }
    return c
};
function _analyseExpoTags(k, d) {
    var f = document.getElementsByTagName(k), j = "", b = "baoguang_", a = new RegExp("^" + b), g = 1;
    if (arguments.length == 2) {
        b = d;
        a = new RegExp("^" + b);
        g = 2
    }
    for (var h = 0, e = f.length; h < e; h++) {
        var c = f[h].id;
        a.test(c) ? (c = c.substring(9), j += c + "#@#", j = j.replace(/\|/g, " ")) : !1
    }
    if (j !== "") {
        j = j.substring(0, j.length - 3), _sendExpoDatas(j, g)
    } else {
        _sendExpoDatas("-", g)
    }
}
function SaPick(f, d, e) {
    var b = "-", a;
    if (!IsEmpty(f) && !IsEmpty(d) && !IsEmpty(e)) {
        a = f.indexOf(d);
        if (a > -1) {
            var c = f.indexOf(e, a);
            if (c < 0) {
                c = f.length
            }
            b = f.substring(a + d.length + 1, c)
        }
    }
    return b
}
function IsEmpty(a) {
    return(undefined == a || "" == a || "-" == a)
}
function SaAjax() {
    var a = this;
    a.sendByInnerImage = function(d) {
        if (document.body) {
            var f = document.createElement("iframe");
            f.height = "0";
            f.width = "0";
            f.style.display = "none";
            f.style.visibility = "hidden";
            var b = function() {
                f && f.parentNode && f.parentNode.removeChild(f) && (f = null)
            };
            AddListener(window, "beforeunload", b);
            var c = false;
            var e = function() {
                if (!c) {
                    try {
                        c = true;
                        var j = f.contentWindow.document;
                        var g = j.createElement("img");
                        g.onload = g.onerror = function() {
                            g.onload = g.onerror = null;
                            g = null;
                            b();
                            if (window.removeEventListener) {
                                window.removeEventListener("beforeunload", b, false)
                            } else {
                                window.detachEvent && window.detachEvent("onbeforeunload", b)
                            }
                        };
                        g.src = d
                    } catch (h) {
                    }
                }
            };
            AddListener(f, "load", e);
            document.body.appendChild(f)
        } else {
            setTimeout(function() {
                a.sendByInnerImage(d)
            }, 100)
        }
    };
    a.sendByIframe = function(b) {
        if (document.body) {
            var c = document.getElementById("_iframe_sa_sendByIframe");
            if (c) {
                return false
            }
            c = document.createElement("iframe");
            c.id = "_iframe_sa_sendByIframe";
            c.src = b;
            c.height = "0";
            c.width = "0";
            c.style.display = "none";
            c.style.visibility = "hidden";
            document.body.appendChild(c)
        } else {
            setTimeout(function() {
                a.sendByIframe(b)
            }, 100)
        }
    }
}
function AddListener(b, c, d, a) {
    if (b.addEventListener) {
        b.addEventListener(c, d, !!a)
    } else {
        b.attachEvent && b.attachEvent("on" + c, d)
    }
}
function _getSaServer(a, b) {
    if (b == undefined || b == null) {
        b = false
    }
    if (a) {
        if (b) {
            return"sa.suning.cn"
        } else {
            return"click.suning.cn/sa"
        }
    } else {
        if (b) {
            return"sasit.suning.cn"
        } else {
            return"clicksit.suning.cn/sa"
        }
    }
}
function _getSnmx() {
    var b = _getCookie(_snck);
    if (!b || b == null || b == "") {
        b = _no_data_tag
    }
    var a = OS + _tag + Bro + _tag + _getSense() + _tag + _getPrinColor() + _tag + _getFlash() + _tag + _getJava() + _tag + b;
    return a
}
function _getOSAndTer() {
    try {
        var f = [];
        if (/AppleWebKit.*Mobile/i.test(ua) || (/Android|SymbianOS|Windows Phone|Tablet PC|NOKIA|Nokia|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|SonyEricsson|SIE-|Amoi|ZTE/i.test(ua))) {
            if (r = ua[m](/(iPhone|iPod touch|iPad).*(OS [\d_]+)/i)) {
                f[p](r[2]);
                f[p](r[1])
            } else {
                if (r = ua[m](/(Windows Phone( | OS )[\d\.]+).*; ([^;]+)\)$/i)) {
                    f[p](r[1]);
                    f[p](r[3])
                } else {
                    if (r = ua[m](/; (Windows NT [\d\.]+).*(Tablet PC [\d\.]+).*\)$/i)) {
                        f[p](r[1]);
                        f[p](r[2])
                    } else {
                        if (ua[i]("Windows Phone") > -1) {
                            f[p]("Windows Phone");
                            f[p](npo)
                        } else {
                            if (ua[i]("Windows NT") > -1) {
                                f[p]("windows NT");
                                f[p](npa)
                            } else {
                                if (r = ua[m](/(Android [\d\.]+);[^;]*; ([^\)]*?)\)/i)) {
                                    f[p](r[1]);
                                    f[p](r[2])
                                } else {
                                    if (ua[i]("Android") > -1 && ua[i]("mobile") > -1) {
                                        f[p]("Android");
                                        f[p](npo)
                                    } else {
                                        if (ua[i]("Andriod") > -1) {
                                            f[p]("Android");
                                            f[p](npa)
                                        } else {
                                            f[p](n)[p](n)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else {
            var h = (pf == "Win32") || (pf == "Windows");
            var j = (pf == "Mac68K") || (pf == "MacPPC") || (pf == "Macintosh") || (pf == "MacIntel");
            if (j) {
                f[p]("Mac")
            }
            var c = (pf == "X11") && !h && !j;
            if (c) {
                f[p]("Unix")
            }
            var a = (pf[i]("Linux") > -1);
            if (a) {
                f[p]("Linux")
            }
            if (h) {
                var g = ua[i]("Windows NT 5.0") > -1 || ua[i]("Windows 2000") > -1;
                if (g) {
                    f[p]("Win2000")
                }
                var q = ua[i]("Windows NT 5.1") > -1 || ua[i]("Windows XP") > -1;
                if (q) {
                    f[p]("WinXP")
                }
                var b = ua[i]("Windows NT 5.2") > -1 || ua[i]("Windows 2003") > -1;
                if (b) {
                    f[p]("Win2003")
                }
                var b = ua[i]("Windows NT 6.0") > -1 || ua[i]("Windows Vista") > -1;
                if (b) {
                    f[p]("WinVista")
                }
                var b = ua[i]("Windows NT 6.1") > -1 || ua[i]("Windows 7") > -1;
                if (b) {
                    f[p]("Win7")
                }
                var l = ua[i]("Windows NT 6.2") > -1;
                if (l) {
                    f[p]("Windows 8")
                }
                var d = ua[i]("Windows NT 6.3") > -1;
                if (d) {
                    f[p]("Windows 8.1")
                }
            }
            f[p]("PC")
        }
        f.length > 2 ? f = f.slice(0, 2) : f.length == 1 ? f[p](n) : f.length == 0 ? f[p](n)[p](n) : f;
        return f
    } catch (k) {
    }
    return["unknown", "unknown"]
}
function _getExplore() {
    try {
        var b = {};
        var c;
        (c = ua[m](/ucbrowser\/[\d\.]+/i)) ? b.uc = c[0] : (c = ua[m](/msie ([\d.]+)/i)) ? b.ie = c[1] : (c = ua[m](/firefox\/([\d.]+)/i)) ? b.firefox = c[1] : (c = ua[m](/chrome\/([\d.]+)/i)) ? b.chrome = c[1] : (c = ua[m](/opera.([\d.]+)/i)) ? b.opera = c[1] : (c = ua[m](/version\/([\d.]+).*safari/i)) ? b.safari = c[1] : 0;
        var a = "";
        if (b.uc) {
            a = b.uc
        } else {
            if (b.ie) {
                a = "msie " + b.ie
            } else {
                if (b.firefox) {
                    a = "firefox " + b.firefox
                } else {
                    if (b.chrome) {
                        a = "chrome " + b.chrome
                    } else {
                        if (b.opera) {
                            a = "opera " + b.opera
                        } else {
                            if (b.safari) {
                                a = "safari " + b.safari
                            } else {
                                a = "unknown Browser"
                            }
                        }
                    }
                }
            }
        }
        return a
    } catch (d) {
    }
    return"unknown"
}
function _getSense() {
    return window.screen.width + "x" + window.screen.height
}
function _getPrinColor() {
    return window.screen.colorDepth + "bit"
}
function _getFlash() {
    try {
        var f = "";
        var n = navigator;
        if (n.plugins && n.plugins.length) {
            for (var ii = 0; ii < n.plugins.length; ii++) {
                if (n.plugins[ii].name.indexOf("Shockwave Flash") != -1) {
                    f = n.plugins[ii].description.split("Shockwave Flash ")[1].split(" ")[0];
                    break
                }
            }
        } else {
            if (window.ActiveXObject) {
                for (var ii = 10; ii >= 2; ii--) {
                    try {
                        var fl = eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + ii + "');");
                        if (fl) {
                            f = ii + ".0";
                            break
                        }
                    } catch (e) {
                    }
                }
            }
        }
        if (f != "") {
            return 1
        }
    } catch (e) {
    }
    return 0
}
function _getJava() {
    try {
        if (navigator.javaEnabled()) {
            return 1
        }
    } catch (a) {
    }
    return 0
}
function _putSnmz(c) {
    var a = _getSnmzMapFromCookie();
    a.put("clickDots", a.get("clickDots").replace(_no_data_tag, ""));
    var b = _getStrFromKeysArrAndValuesStr(_snmzKeysArr, a);
    b = b + c;
    _addCookie(_snmz, b, "/", "", "")
}
function _putSnmaTimesAndViews() {
    var b = new Date();
    var a = _getSnmaMapFromCookie();
    a.put("lastViewTime", a.get("thisViewTime"));
    a.put("thisViewTime", b.getTime());
    a.put("totalPvs", Number(a.get("totalPvs")) + 1);
    _setSnmaMapToCookie(a);
    uvId = a.get("visitorid")
}
function _putSnsr() {
    var a = _getSnsrMapFromCookie();
    a = _checkSource(a);
    a = _checkSnsr(a);
    _setSnsrMapToCookie(a);
    trafficSource = _getCookie(_snsr)
}
function _checkSource(g) {
    try {
        var v = new Array("wd", "q", "w", "query", "p", "word");
        var l = 0;
        var h = 0;
        if (_fromUrl != "") {
            for (var b = 0; b < _searchersArr.length; b++) {
                var u = _searchersArr[b];
                if (_fromUrl.indexOf(u) != -1) {
                    g.put("source", u.substring(1, u.length));
                    g.put("medium", _sourceMediumArr[1]);
                    g.put("content", _no_data_tag);
                    g.put("campaign", _no_data_tag);
                    g.put("theme", _no_data_tag);
                    var q = _fromUrl.substring(_fromUrl.indexOf("?") + 1, _fromUrl.length);
                    var c = q.split("&");
                    for (var t = 0; t < c.length; t++) {
                        var f = c[t].split("=");
                        for (var a = 0; a < v.length; a++) {
                            if (v[a] == f[0]) {
                                g.put("medium", _sourceMediumArr[2]);
                                g.put("theme", f[1] + _splited);
                                break
                            }
                        }
                        h = a;
                        if (h < v.length) {
                            break
                        }
                    }
                    break
                }
            }
            l = b;
            if (l == _searchersArr.length || (l < _searchersArr.length && h == v.length)) {
                var k = _getDomainByUrl(location.href);
                var s = _getDomainByUrl(_fromUrl);
                if ((s.indexOf(".suning.com") == -1 && s.indexOf(".suningpay.com") == -1) || s.indexOf("union.suning.com") != -1) {
                    g.put("source", _getDomainByUrl(_fromUrl));
                    g.put("medium", _sourceMediumArr[1]);
                    g.put("content", _no_data_tag);
                    g.put("campaign", _no_data_tag);
                    g.put("theme", _no_data_tag);
                    for (var b = 0; b < _searchersArr.length; b++) {
                        var u = _searchersArr[b];
                        if (_fromUrl.indexOf(u) != -1) {
                            g.put("source", u.substring(1, u.length));
                            break
                        }
                    }
                }
            }
        }
    } catch (d) {
    }
    return g
}
function _checkSnsr(h) {
    try {
        if (_toUrl != "" && (_toUrl.indexOf("utm_source") > 0 || _toUrl.indexOf("utm_medium") > 0 || _toUrl.indexOf("utm_content") > 0 || _toUrl.indexOf("utm_campaign") > 0 || _toUrl.indexOf("utm_term") > 0)) {
            var d = _toUrl.substring(_toUrl.indexOf("?") + 1, _toUrl.length);
            var f = d.split("&");
            for (var b = 0; b < f.length; b++) {
                var a = f[b].split("=");
                if (a[0] == "utm_source") {
                    h.put("source", a[1])
                } else {
                    if (a[0] == "utm_medium") {
                        h.put("medium", a[1])
                    } else {
                        if (a[0] == "utm_content") {
                            h.put("content", a[1])
                        } else {
                            if (a[0] == "utm_campaign") {
                                h.put("campaign", a[1])
                            } else {
                                if (a[0] == "utm_term") {
                                    var c = h.get("theme");
                                    fromUrl_utm_term = c ? cutWord(c, _splited) : (_no_data_tag + _splited);
                                    h.put("theme", fromUrl_utm_term + a[1])
                                }
                            }
                        }
                    }
                }
            }
        }
    } catch (g) {
    }
    return h
}
function cutWord(b, a) {
    return b ? b.substring(0, b.indexOf(a) + a.length) : b
}
function _checkSnmc() {
    var a = _getCookie(_snmc);
    if (!a || a == null || a == "") {
        var b = _getCookie(_snmb);
        if (!b || b == null || b == "") {
            _inTime = _no_data_tag
        } else {
            var c = _getSnmbMapFromCookie();
            _inTime = c.get("inTime");
            _delCookie(_snmb)
        }
    }
    _putSnmc()
}
function _getSnmbAndParam(f) {
    var h = _getSnmbMapFromCookie();
    var b = _getStrFromKeysArrAndValuesStr(_snmbKeysArr, h);
    var e = _cutUrlToShort(_fromUrl);
    var a = _cutUrlToShort(_fromTitle);
    var g = _cutUrlToShort(_toUrl);
    var d = _base64.encode(_cutUrlToShort(_toTitle));
    var c = f + _tag + e + _tag + a + _tag + g + _tag + d + _tag + b;
    return c
}
function _putSnmb() {
    var b = _getSnmbMapFromCookie();
    var a = new Date();
    b.put("outTime", a.getTime());
    b.put("views", Number(b.get("views")) + 1);
    _setSnmbMapToCookie(b);
    sessionId = b.get("visitid")
}
function _refreshSnmbInTime() {
    var a = _getSnmbMapFromCookie();
    a.put("inTime", new Date().getTime());
    _setSnmbMapToCookie(a)
}
function _putSnmc() {
    _addCookie(_snmc, "1", "/", expires_ms_30mins, "")
}
function _updateSnml() {
    var a = _getCookie(_snml);
    if (!a || a != _toUrl) {
        _addCookie(_snml, _toUrl, "/", "", "")
    }
}
function _getSnmaMapFromCookie() {
    var b;
    var d = _getCookie(_snma);
    if (d && d != null && d != "") {
        var e = d.split(_tag);
        b = _getMapFromKeyValueArrs(_snmaKeysArr, e);
        return b
    } else {
        var c = new Date();
        var a = _getOnlyId();
        var e = ["1", a, c.getTime(), c.getTime(), c.getTime(), 0, 0];
        b = _getMapFromKeyValueArrs(_snmaKeysArr, e);
        return b
    }
}
function _setSnmaMapToCookie(b) {
    var a = _getStrFromKeysArrAndValuesStr(_snmaKeysArr, b);
    _addCookie(_snma, a, "/", expires_ms_2years, "")
}
function _getSnmbMapFromCookie() {
    var e;
    var b = _getCookie(_snmb);
    if (b) {
        var d = b.split(_tag);
        e = _getMapFromKeyValueArrs(_snmbKeysArr, d);
        if (_crossDayFlag === 0) {
            var c = e.get("inTime");
            if (c && /\d/.test(c)) {
                var a = new Date(Number(c)).getDate();
                if (new Date().getDate() == a + 1) {
                    _inTime = c;
                    _crossDayFlag++;
                    return newSession()
                }
            }
        }
        return e
    } else {
        return newSession()
    }
}
function newSession() {
    if (_pvFlag === 0) {
        var b = _getSnmaMapFromCookie();
        b.put("totalVisits", Number(b.get("totalVisits")) + 1);
        _setSnmaMapToCookie(b);
        _pvFlag++
    }
    var c = _getOnlyId(), a = [c, _inTime, _no_data_tag, 0], d = _getMapFromKeyValueArrs(_snmbKeysArr, a);
    return d
}
function _setSnmbMapToCookie(b) {
    var a = _getStrFromKeysArrAndValuesStr(_snmbKeysArr, b);
    _addCookie(_snmb, a, "/", "", "")
}
function _getSnmzMapFromCookie() {
    var a;
    var c = _getCookie(_snmz);
    if (c && c != null && c != "") {
        var d = c.split(_tag);
        a = _getMapFromKeyValueArrs(_snmzKeysArr, d)
    } else {
        var b = _saPageViewId;
        var d = [b, _no_data_tag];
        a = _getMapFromKeyValueArrs(_snmzKeysArr, d)
    }
    a.put("pvid", _saPageViewId);
    return a
}
function _setSnmzMapToCookie(b) {
    var a = _getStrFromKeysArrAndValuesStr(_snmzKeysArr, b);
    _addCookie(_snmz, a, "/", "", "")
}
function _getSnsrMapFromCookie() {
    var b;
    var c = _getCookie(_snsr);
    if (c && c != null && c != "") {
        var a = c.split(_tag);
        b = _getMapFromKeyValueArrs(_snsrKeysArr, a);
        return b
    } else {
        var a = [_sourceMediumArr[0], _sourceMediumArr[0], _no_data_tag, _no_data_tag, _no_data_tag];
        b = _getMapFromKeyValueArrs(_snsrKeysArr, a);
        return b
    }
}
function _setSnsrMapToCookie(d) {
    var e = _getSnsrMapFromCookie();
    var a = _getStrFromKeysArrAndValuesStr(_snsrKeysArr, e), c = _getStrFromKeysArrAndValuesStr(_snsrKeysArr, d);
    if (!_getCookie(_snsr) || a != c) {
        var f = _getStrFromKeysArrAndValuesStr(_snsrKeysArr, d);
        _addCookie(_snsr, f, "/", expires_ms_24hours, "");
        var b = _getSnmbMapFromCookie();
        _inTime = b.get("inTime");
        _delCookie(_snmb)
    }
}
function HashMap() {
    this.keys = new Array();
    this.data = new Object();
    this.put = function(a, b) {
        if (this.data[a] == null) {
            this.keys.push(a)
        }
        this.data[a] = b
    };
    this.get = function(a) {
        return this.data[a]
    };
    this.remove = function(a) {
        if (this.get(a) != null) {
            delete this.data[a]
        }
    }
}
function _addCookie(d, f, g, a, e) {
    var h = d + "=" + escape(f);
    if (a != "") {
        var c = new Date();
        c.setTime(c.getTime() + a);
        h += ";expires=" + c.toGMTString()
    }
    if (g != "") {
        h += ";path=" + g
    }
    var b = _getDomain();
    if (b.indexOf(".suning.com") != -1) {
        h += ";domain=.suning.com"
    } else {
        if (b.indexOf(".cnsuning.com") != -1) {
            h += ";domain=.cnsuning.com"
        } else {
            if (b.indexOf(".manzuo.com") != -1) {
                h += ";domain=.manzuo.com"
            } else {
                h += ";domain=" + location.hostname
            }
        }
    }
    document.cookie = h
}
function _getCookie(b) {
    var d = document.cookie.split("; ");
    for (var c = 0; c < d.length; c++) {
        var a = d[c].split("=");
        if (a[0] == b) {
            return decodeURIComponent(a[1] ? a[1] : "-")
        }
    }
}
function _delCookie(a) {
    _addCookie(a, "", "/", -10000, "")
}
function _getDomain() {
    var a = document.location.hostname;
    return a
}
function _getDomainByUrl(a) {
    var b = a.substring(a.indexOf("/", a.indexOf("/") + 1) + 1);
    var c = b.substring(0, b.indexOf("/"));
    return c
}
function _createPageViewId() {
    if (!sa.pvId) {
        sa.pvId = _getOnlyId()
    }
    return sa.pvId
}
function _initSaPvHasSendFlg() {
    if (sa.pvHasSend == undefined || sa.pvHasSend == null) {
        sa.pvHasSend = false
    }
}
function _getOnlyId() {
    var b = new Date();
    var a = Math.round(100000 * Math.random());
    var c = b.getTime().toString().concat(a);
    return c
}
function _getMapFromKeyValueArrs(d, a) {
    var c = new HashMap();
    for (var b = 0; b < d.length; b++) {
        c.put(d[b], a[b])
    }
    return c
}
function _getStrFromKeysArrAndValuesStr(c, b) {
    var d = "";
    for (var a = 0; a < c.length; a++) {
        d = d + b.get(c[a]) + _tag
    }
    return d.substring(0, d.length - 1)
}
function _arrayToString(a) {
    if (!a || a == "") {
        return""
    }
    var c = "";
    for (var b = 0; b < a.length; b++) {
        c = c + a[b] + _tag
    }
    return c.substring(0, c.length - 1)
}
function _cutUrlToShort(a) {
    if (a.length > 301) {
        a = a.substring(0, 300)
    }
    while (a.indexOf(_tag) != -1) {
        a = a.replace(_tag, "--")
    }
    return a
}
function _httpGifSend(c) {
    var b = "log_" + (new Date()).getTime();
    var a = window[b] = new Image();
    a.onload = (a.onerror = function() {
        window[b] = null
    });
    a.src = c + "&iId=" + b;
    a = null
}
function _sendInitData(j, f, e, d, c, b) {
    var h = _snProtocol + _saServer + "/ajaxInit.gif";
    ad_sp = SaPick(_toUrl, "ad_sp", "&");
    var g = _snma + "=" + _encode(j) + "&" + _snmb + "=" + encodeURIComponent(f) + "&" + _snmx + "=" + _encode(e) + "&" + _snsr + "=" + d + "&" + _snmz + "=" + _encode(c) + "&" + _snme + "=" + _encode(b) + "&_type=" + _resourceType + "&ter=" + Ter + "&ad_sp=" + ad_sp + "&ls=" + loginStatus;
    if (productId) {
        g = g + "&productId=" + productId
    }
    if (urlPattern) {
        g = g + "&urlPattern=" + urlPattern
    }
    if (supplierID) {
        g = g + "&sperId=" + supplierID
    }
    g = g + "&mbId=" + memberID;
    var k = document.getElementById("ga_itemDataBean_itemID");
    if (k) {
        g = g + "&itemId=" + k.value
    }
    g = g + "&iel=" + idsEppLastLogin;
    var a = h + "?" + g;
    _httpGifSend(a);
    basicIds = loginUserName + _tag + memberID + _tag + uvId + _tag + sessionId;
    _saSendCookieMapping()
}
function _sendSearchDatas(k) {
    try {
        var h = _snProtocol + _saServer + "/ajaxSearch.gif";
        var b = new Date();
        var a = _cutUrlToShort(_fromUrl);
        var s = _cutUrlToShort(_fromTitle);
        var g = _getOnlyId();
        var u = _saPageViewId;
        _addCookie(_snms, g, "/", "", "");
        var v = "";
        var w = "";
        var l = "";
        var t = "";
        if (k != undefined && k != null) {
            var q = k.split(_tag);
            if (q.length >= 9) {
                v = q[6];
                w = q[7];
                l = q[8];
                t = q[0] + _tag + q[1] + _tag + q[2] + _tag + q[3] + _tag + q[4] + _tag + q[5]
            } else {
                if (q.length >= 7) {
                    v = q[6];
                    t = k.substring(0, k.lastIndexOf(_tag))
                } else {
                    t = k
                }
            }
        }
        var f = g + _tag + u + _tag + a + _tag + s + _tag + b.getTime() + _tag + t;
        var j = _toUrl.match(/cityId=([\d]+)/), x = (j && (j.length > 0) ? j[1] : "-");
        if (!l || l == "" || l == "undefined") {
            var c = document.getElementById("searchCategory");
            if (c) {
                l = c.value
            }
        }
        if (w && w == "kzkeyword undefined") {
            w = ""
        }
        var d = h + "?" + _snsd + "=" + encodeURIComponent(f) + "&_type=" + _resourceType + "&scId=" + x + "&ids=" + basicIds + "&r=" + trafficSource + "&usrWord=" + v + "&ls=" + loginStatus + "&kzWord=" + w + "&sType=" + l;
        _httpGifSend(d)
    } catch (y) {
    }
}
function _sendOrderDatas(a) {
    if (!a || a == "") {
        return false
    }
    var d = _snProtocol + _saServer + "/ajaxOrder.gif";
    var c = new Date();
    var h = _getCookie(_snms);
    var f = _saPageViewId;
    var g = _getOnlyId();
    if (!h && h == null || h == "") {
        h = _no_data_tag
    }
    var e = g + _tag + a + _tag + f + _tag + h + _tag + c.getTime();
    var b = d + "?" + _snmo + "=" + e + "&_type=" + _resourceType + "&ids=" + basicIds + "&r=" + trafficSource + "&t=" + _toUrl + "&oi=" + sa_orderInfo;
    b = b + "&iel=" + idsEppLastLogin;
    _httpGifSend(b)
}
function _sendOrderInfo(f, h) {
    if (!f) {
        return false
    }
    if (!h) {
        h = f
    }
    try {
        var c = _snProtocol + _saServer + "/ajaxOrder.gif";
        var d = new Date();
        var a = _getCookie(_snms);
        var l = _saPageViewId;
        var j = _getOnlyId();
        if (!a && a == null || a == "") {
            a = _no_data_tag
        }
        var g = j + _tag + f + _tag + l + _tag + a + _tag + d.getTime();
        var b = c + "?" + _snmo + "=" + g + "&_type=" + _resourceType + "&ids=" + basicIds + "&r=" + trafficSource + "&t=" + _toUrl + "&oi=" + h;
        b = b + "&iel=" + idsEppLastLogin;
        _httpGifSend(b)
    } catch (k) {
    }
}
function _sendRegisterDatas(e) {
    var f = _snProtocol + _saServer + "/ajaxRegister.gif", d = _getOnlyId(), c = _saPageViewId, b = d + _tag + c + _tag + e, a = f + "?" + _snmg + "=" + b + "&_type=" + _resourceType + "&ids=" + basicIds + "&r=" + trafficSource;
    _httpGifSend(a)
}
function _sendStorageDatas(F) {
    if (!basicIds || basicIds == "") {
        basicIds = loginUserName + _tag + memberID + _tag + "" + _tag + ""
    }
    var x = _snProtocol + _saServer + "/ajaxStorage.gif", q = new Date, e = _getOnlyId(), g = _saPageViewId, u = _toUrl ? _encode(_cutUrlToShort(_toUrl).replace(/\|/g, " ")) : "can not get url", h = document.getElementById("supplierID"), z = h ? h.value.replace(/\|/g, " ") : "can not get supplierId", w = e + _tag + g + _tag + F + _tag + q.getTime() + _tag + u + _tag + z, k = x + "?" + _snmt + "=" + w + "&_type=" + _resourceType + "&ter=" + Ter + "&os=" + OS + "&ids=" + basicIds;
    var G = "";
    var E = "";
    var f = document.getElementById("shop_code");
    var d = document.getElementById("shop_name");
    if (f) {
        G = f.value
    }
    if (d) {
        E = d.value;
        E = _encode(E)
    }
    var s = "", A = "", y = "", l = "", H = "", B = "";
    var v = document.getElementById("mdmProvinceId");
    if (v) {
        s = v.value
    }
    var D = document.getElementById("mdmDistrictId");
    if (D) {
        A = D.value
    }
    var a = document.getElementById("vendorType");
    if (a) {
        y = a.value
    }
    var b = document.getElementById("manageInvFlag");
    if (b) {
        l = b.value
    }
    var c = document.getElementById("productStatus");
    if (c) {
        H = c.value
    }
    var j = document.getElementById("productStatusDesc");
    if (j) {
        B = j.value
    }
    var C = "";
    var t = document.getElementById("suppliernewID");
    if (t) {
        C = t.value
    }
    k = k + "&shcode=" + G + "&shname=" + E + "&provinceId=" + s + "&districtId=" + A + "&vendorType=" + y + "&manageInvFlag=" + l + "&productStatus=" + H + "&productStatusDesc=" + B + "&supplierNewId=" + C;
    _httpGifSend(k)
}
function _sendExpoDatas(c, k) {
    var f = _getSnmaMapFromCookie();
    var d = f.get("visitorid");
    var q = (k === 1 ? GetMainProId() : "-");
    var b = _snProtocol + _saServer + "/ajaxExpoDatas.gif", g = _getOnlyId(), j = _saPageViewId, a = typeof sn == "object" ? sn.cityId : "-", e = (e = document.getElementById("resourceType")) ? e.value : "web", h = g + _tag + j + _tag + c + _tag + a + _tag + e + _tag + d + _tag + q + _tag + loginUserName + _tag + memberID + _tag + sessionId + _tag + trafficSource, b = b + "?_expo=" + encodeURIComponent(h);
    _httpGifSend(b);
    if ("http:" == document.location.protocol) {
        var l = new SaAjax;
        var s = "http://cm.ipinyou.com/cma_suning.html?sid=" + d;
        l.sendByIframe(s)
    }
}
function _saSendCookieMapping() {
    if ("http:" != document.location.protocol) {
        return false
    }
    var l = _getSnmaMapFromCookie();
    var h = l.get("visitorid");
    var q = new Date();
    var u = new SaAjax;
    var j = "http://cms.gtags.net/p?a=20&xid=" + h;
    var t = "http://cm.ipinyou.com/suning/cms.gif?sid=" + h;
    var a = "http://trace.zhiziyun.com/open/suning/cm.gif?tid=146&uid=" + h;
    var x = "http://ckmap.mediav.com/m?tid=613&tck=" + h;
    var w = "http://r.dmp.sina.com.cn/cm/write?cid=19922&platform=pc&sid=" + h;
    var b = "http://cm.pos.baidu.com/dmpcm?userid=3764966&local_cookie=" + h + "&timestamp=" + q.getTime();
    var s = "http://origin.qtmojo.com/snpixel?ptr=sn&data=&uid=" + h;
    var e = "http://dsp.brand.sogou.com/sl?userid=18618367&local_cookie=" + h + "&timestamp=" + q.getTime();
    u.sendByInnerImage(j);
    u.sendByInnerImage(a);
    u.sendByInnerImage(t);
    u.sendByInnerImage(x);
    u.sendByInnerImage(w);
    u.sendByInnerImage(b);
    u.sendByInnerImage(s);
    u.sendByInnerImage(e);
    var v = "pptv";
    var c = "1";
    var g = h;
    var k = _encode(_toUrl);
    var f = _encode(_fromUrl);
    var d = "http://cm.as.pptv.com/cm/1.html?tid=" + v + "&type=" + c + "&uid=" + g + "&loc=" + k + "&ref=" + f;
    u.sendByInnerImage(d)
}
function _encode(a) {
    return null != a ? encodeURIComponent(a) : ""
}
function SaCustomDataUtil() {
    var a = this;
    a.sendData = function(d, v, t) {
        var k = _snProtocol + _saServer + "/ajaxCustom.gif";
        if (d == undefined || d == null || d == "") {
            return false
        }
        if (v == undefined || v == null || v == "") {
            return false
        }
        if (t == undefined || t == null || t == "") {
            return false
        }
        var e = "$@$";
        var w = v.split(",");
        var s = t.split(",");
        if (w.length != s.length) {
            return false
        }
        var f = "";
        var j = "";
        for (var q = 0; q < w.length; q++) {
            j = encodeURIComponent(w[q]);
            if (f == "") {
                f = j
            } else {
                f = f + e + j
            }
        }
        var b = "";
        var g = "";
        for (var q = 0; q < s.length; q++) {
            g = encodeURIComponent(s[q]);
            if (b == "") {
                b = g
            } else {
                b = b + e + g
            }
        }
        var u = d + _tag + f + _tag + b;
        var l = _saPageViewId;
        var h = l + _tag + basicIds;
        var c = k + "?ids=" + h + "&r=" + trafficSource + "&cust=" + u;
        _httpGifSend(c)
    }
}
function PageSaleCookieUtil() {
    var h = this;
    var a = "_saPageSaleInfo";
    var s = 2048;
    var f = 30;
    var c = 1 * 30 * 24 * 60 * 60 * 1000;
    var l = "-";
    var d = "|";
    var b = ":";
    var g = ",";
    var v = ";";
    var u = function() {
        var w = 0;
        var x = new Object();
        this.getThis = function() {
            return x
        };
        this.put = function(y, z) {
            if (!this.containsKey(y)) {
                w++
            }
            x[y] = z
        };
        this.get = function(y) {
            if (this.containsKey(y)) {
                return x[y]
            } else {
                return null
            }
        };
        this.remove = function(y) {
            if (delete x[y]) {
                w--
            }
        };
        this.containsKey = function(y) {
            return(y in x)
        };
        this.containsValue = function(y) {
            for (var z in x) {
                if (x[z] == y) {
                    return true
                }
            }
            return false
        };
        this.values = function() {
            var y = new Array(w);
            for (var z in x) {
                y.push(x[z])
            }
            return y
        };
        this.keys = function() {
            var y = new Array(w);
            for (var z in x) {
                y.push(z)
            }
            return y
        };
        this.size = function() {
            return w
        }
    };
    h.saveCookie = function(B, I) {
        try {
            if (B == undefined || B == null) {
                B = l
            }
            if (I == undefined || I == null) {
                I = l
            }
            var J = _saPageViewId;
            var M = memberID;
            if (loginStatus == undefined || loginStatus == null || loginStatus == "" || loginStatus == l) {
                M = l
            }
            var H = false;
            var L = _getCookie(a);
            if (!L || L == l || L == "") {
                var w = B + d + J + d + I;
                L = M + b + w
            } else {
                var E = new Array();
                var y = L.split(v);
                for (var F = 0; F < y.length; F++) {
                    var C = y[F];
                    if (!C) {
                        continue
                    }
                    var z = C.substring(0, C.indexOf(b));
                    if (z != l) {
                        if (M == z) {
                            H = true
                        }
                    }
                    E.push(z)
                }
                if (!H) {
                    if (M && M != "" && M != l) {
                        E.push(M)
                    }
                }
                var P = j(L);
                var K = k();
                if (K >= f) {
                    var A = P.keys();
                    var O = "";
                    for (var F = 0; F < A.length; F++) {
                        O = A[F];
                        if (O && O != null && O != "") {
                            break
                        }
                    }
                    P.remove(O)
                }
                var G = M + b + B;
                var D = J + d + I;
                P.put(G, D);
                L = t(E, P)
            }
            try {
                if (!L || L == l || L == "") {
                    _delCookie(a)
                } else {
                    _addCookie(a, L, "/", c, "")
                }
            } catch (N) {
            }
        } catch (N) {
        }
    };
    h.deleteCookie = function(w) {
        try {
            if (w == undefined || w == null || w == "" || w == l) {
                return false
            }
            var G = _saPageViewId;
            var C = memberID;
            if (loginStatus == undefined || loginStatus == null || loginStatus == "" || loginStatus == l) {
                C = l
            }
            var y = _getCookie(a);
            if (!y || y == l || y == "") {
                return true
            }
            var L = false;
            var D = new Array();
            var J = y.split(v);
            for (var H = 0; H < J.length; H++) {
                var A = J[H];
                var K = A.substring(0, A.indexOf(b));
                if (K != l) {
                    if (C == K) {
                        L = true
                    }
                }
                D.push(K)
            }
            if (!L) {
                if (C && C != "" && C != l) {
                    D.push(C)
                }
            }
            var B = j(y);
            var I = w.split(d);
            for (var H = 0; H < I.length; H++) {
                var E = I[H];
                if (E == "" || E == l) {
                    continue
                }
                var z = C + b + E;
                B.remove(z)
            }
            y = t(D, B);
            try {
                if (!y || y == l || y == "") {
                    _delCookie(a)
                } else {
                    _addCookie(a, y, "/", c, "")
                }
            } catch (F) {
                return false
            }
        } catch (F) {
            return false
        }
        return true
    };
    h.deleteCustCookie = function() {
        try {
            var y = memberID;
            if (loginStatus == undefined || loginStatus == null || loginStatus == "" || loginStatus == l) {
                y = l
            }
            if (y == l) {
                return false
            }
            var x = _getCookie(a);
            if (!x || x == l || x == "") {
                return false
            }
            var w = e(x);
            if (!w || w == null) {
                return false
            }
            w.remove(y);
            x = q(w);
            try {
                if (!x || x == l || x == "") {
                    _delCookie(a)
                } else {
                    _addCookie(a, x, "/", c, "")
                }
            } catch (z) {
                return false
            }
        } catch (z) {
            return false
        }
        return true
    };
    h.clearCookie = function() {
        try {
            _delCookie(a)
        } catch (w) {
        }
    };
    h.updateCustNo = function() {
        try {
            var z = memberID;
            if (loginStatus == undefined || loginStatus == null || loginStatus == "" || loginStatus == l) {
                z = l
            }
            if (z == l) {
                return false
            }
            var y = _getCookie(a);
            if (!y || y == l || y == "") {
                return false
            }
            var w = e(y);
            if (w == null || w.size() == 0) {
                return false
            }
            var F = new u();
            var C = w.keys();
            for (var D = 0; D < C.length; D++) {
                var E = C[D];
                if (!E) {
                    continue
                }
                if (E == l) {
                    var A = w.get(z);
                    if (A && A != null && A != "") {
                        F.put(z, A + g + w.get(E))
                    } else {
                        F.put(z, w.get(E))
                    }
                } else {
                    var A = F.get(E);
                    if (A && A != null && A != "") {
                        F.put(E, A + g + w.get(E))
                    } else {
                        F.put(E, w.get(E))
                    }
                }
            }
            y = q(F);
            try {
                if (!y || y == l || y == "") {
                    _delCookie(a)
                } else {
                    _addCookie(a, y, "/", c, "")
                }
            } catch (B) {
                return false
            }
        } catch (B) {
            return false
        }
        return true
    };
    h.sendCookie = function(G, N) {
        if (!G || G == null || G == "") {
            return false
        }
        if (!N || N == null || N == "") {
            return false
        }
        try {
            var O = _getCookie(a);
            try {
                var E = "", M = "";
                if (N) {
                    E = encodeURIComponent(N)
                }
                if (O) {
                    M = encodeURIComponent(O)
                }
                var z = _snProtocol + _saServer + "/ajaxPageSale.gif";
                z = z + "?pvId=" + _saPageViewId + "&loginUserName=" + loginUserName + "&memberId=" + memberID + "&loginStatus=" + loginStatus + "&orderId=" + G + "&goodIds=" + E + "&ck=" + M;
                _httpGifSend(z)
            } catch (D) {
            }
            if (memberID == l) {
                return false
            }
            if (!O || O == l || O == "") {
                return false
            }
            var K = e(O);
            if (!K || K == null || K.size() == 0) {
                return false
            }
            var C = K.get(memberID);
            if (C == undefined || C == null || C == l || C == "") {
                return false
            }
            var J = "";
            var F = new Array();
            var w = C.split(g);
            var A = N.split(d);
            for (var I = 0; I < A.length; I++) {
                var B = A[I];
                if (!B || B == "" || B == l) {
                    continue
                }
                for (var H = 0; H < w.length; H++) {
                    var L = w[H];
                    if (!L || L == "" || L == l) {
                        continue
                    }
                    if (L.indexOf(B) == -1) {
                        continue
                    }
                    F.push(L);
                    if (J == "") {
                        J = L
                    } else {
                        J = J + g + L
                    }
                    break
                }
            }
            if (J == "" || J == l) {
                return false
            }
            for (var I = 0; I < F.length; I++) {
                var Q = F[I];
                if (!Q || Q == "") {
                    continue
                }
                if (C.indexOf(Q + g) != -1) {
                    C = C.replace(Q + g, "")
                } else {
                    C = C.replace(Q, "")
                }
            }
            if (C != "" && C != l) {
                if (C.lastIndexOf(g) != -1) {
                    C = C.substring(0, C.length - 1)
                }
            }
            K.put(memberID, C);
            O = q(K);
            try {
                if (!O || O == l || O == "") {
                    _delCookie(a)
                } else {
                    _addCookie(a, O, "/", c, "")
                }
            } catch (P) {
                return false
            }
        } catch (P) {
        }
        return true
    };
    function k() {
        var x = _getCookie(a);
        if (!x || x == l || x == "") {
            return 0
        }
        var D = x.split(v);
        if (D == null || D.length == 0) {
            return 0
        }
        var z = 0;
        var B = "";
        try {
            for (var A = 0; A < D.length; A++) {
                B = D[A];
                if (B == null || B == "") {
                    continue
                }
                var y = B.split(b);
                if (y == null || y.length < 2) {
                    continue
                }
                var w = y[1];
                var C = w.split(g);
                z = z + C.length
            }
        } catch (E) {
        }
        return z
    }
    function e(A) {
        if (!A || A == l || A == "") {
            return null
        }
        var z = new u();
        var B = A.split(v);
        for (var w = 0; w < B.length; w++) {
            var y = B[w];
            if (!y || y == "") {
                continue
            }
            var D = y.substring(0, y.indexOf(b));
            var C = y.substring(y.indexOf(b) + 1);
            z.put(D, C)
        }
        return z
    }
    function q(A) {
        var y = "";
        if (!A || A == null || A.size() == 0) {
            return y
        }
        try {
            if (A.size() == 1) {
                var z = A.keys();
                if (!A.get(z[0]) && !A.get(z[1])) {
                    return y
                }
                if ((A.get(z[0]) == "" || A.get(z[0]) == l) && (A.get(z[1]) == "" || A.get(z[1]) == l)) {
                    return y
                }
            }
        } catch (B) {
        }
        var z = A.keys();
        for (var w = 0; w < z.length; w++) {
            var D = z[w];
            if (!D) {
                continue
            }
            var C = A.get(D);
            if (!C || C == "" || C == l) {
                continue
            }
            if (y == "" || y == l) {
                y = D + b + C
            } else {
                y = y + v + (D + b + C)
            }
        }
        return y
    }
    function j(z) {
        if (!z || z == l || z == "") {
            return new u()
        }
        var C = new u();
        var G = z.split(v);
        for (var F = 0; F < G.length; F++) {
            var A = G[F];
            if (!A || A == "" || A == l) {
                continue
            }
            var I = A.substring(0, A.indexOf(b));
            var B = A.substring(A.indexOf(b) + 1);
            var H = B.split(g);
            for (var E = 0; E < H.length; E++) {
                var K = H[E];
                if (!K || K == "" || K == l) {
                    continue
                }
                var D = K.substring(0, K.indexOf(d));
                var w = I + b + D;
                var J = K.substring(K.indexOf(d) + 1);
                C.put(w, J)
            }
        }
        return C
    }
    function t(E, C) {
        var z = "";
        if (!C || C == null || C.size() == 0) {
            return z
        }
        try {
            if (C.size() == 1) {
                var H = C.keys();
                if (!C.get(H[0]) && !C.get(H[1])) {
                    return z
                }
                if ((C.get(H[0]) == "" || C.get(H[0]) == l) && (C.get(H[1]) == "" || C.get(H[1]) == l)) {
                    return z
                }
            }
        } catch (B) {
        }
        var w = new u();
        for (var J = 0; J < E.length; J++) {
            var K = E[J];
            if (!K) {
                continue
            }
            var H = C.keys();
            for (var I = 0; I < H.length; I++) {
                var G = H[I];
                if (!G) {
                    continue
                }
                var F = C.get(G);
                if (!F || F == null || F == "") {
                    continue
                }
                if (G.substring(0, (K + b).length) == (K + b)) {
                    var D = G.substring(G.indexOf(b) + 1);
                    var A = w.get(K);
                    if (A && A != l && A != "") {
                        A = A + g + (D + d + F)
                    } else {
                        A = D + d + F
                    }
                    w.put(K, A)
                }
            }
        }
        z = q(w);
        return z
    }}
function PageViewUtil() {
    var a = this;
    a.sendData = function(F, G) {
        var e = new Date();
        var q = _saPageViewId;
        var w = _getSnmaMapFromCookie();
        var u = w.get("visitorid");
        var k = sessionId;
        var J = memberID;
        var K = _encode(loginUserName);
        var j = K ? "R" : "G";
        var x = e.getTime();
        var s = _cutUrlToShort(_fromUrl);
        var h = _cutUrlToShort(_fromTitle);
        var C = _cutUrlToShort(_toUrl);
        var c = _base64.encode(_cutUrlToShort(_toTitle));
        var f = _getSnmbMapFromCookie();
        var I = _getStrFromKeysArrAndValuesStr(_snmbKeysArr, f);
        var A = _encode(_saErrorCode);
        var B = _encode(_getSnmx());
        var g = _getSnmzMapFromCookie();
        var d = _getStrFromKeysArrAndValuesStr(_snmzKeysArr, snmzMap);
        d = _encode(d);
        var y = trafficSource;
        var E = _resourceType;
        var l = Ter;
        var D = SaPick(_toUrl, "ad_sp", "&");
        var H = "";
        var z = document.getElementById("ga_itemDataBean_itemID");
        if (z) {
            H = z.value
        }
        var b = loginStatus;
        var v = _snProtocol + _saServer + "/ajaxDialog.gif";
        v = v + "?from=" + F + "&dialog=" + G + "&c1=" + q + "&c2=" + u + "&c3=" + k + "&c4=" + J + "&c5=" + K + "&c6=" + j + "&c7=" + x + "&c8=" + s + "&c9=" + h + "&c10=" + C + "&c11=" + c + "&c12=" + I + "&c13=" + A + "&c14=" + B + "&c15=" + d + "&c16=" + y + "&c17=" + E + "&c18=" + l + "&c19=" + D + "&c20=" + H + "&c21=" + b;
        var t = "";
        if (urlPattern) {
            t = t + "&urlPattern=" + urlPattern
        }
        if (productId) {
            t = t + "&productId=" + productId
        }
        if (urlPattern) {
            t = t + "&urlPattern=" + urlPattern
        }
        if (supplierID) {
            t = t + "&sperId=" + supplierID
        }
        v = v + t;
        _httpGifSend(v)
    }
}