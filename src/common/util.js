/**
 * Created by yaohc on 2017/8/17.
 */

function getUrlParams() {
    let result = {};
    let params = window.location.search.substring(1).split('&');
    let param;

    for (let i = 0, iLen = params.length; i < iLen; i++) {
        param = params[i].split('=');
        if (param.length == 2) {
            result[param[0]] = decodeURIComponent(param[1]);
        }
    }

    return result;
}

let getCookie = function (name) {
    var cookie = "; " + document.cookie;
    var pointer = cookie.indexOf("; " + name + "=");
    var nextPointer = cookie.indexOf(";", pointer + 2);
    if (pointer >= 0) {
        return decodeURIComponent(cookie.substring(pointer + name.length + 3, nextPointer > 0 ? nextPointer : cookie.length))
    }
    return ""
};

let setCookie = function (uid, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = uid + "=" + escape(value) +
    ((expiredays == null) ? "" : "; expires=" + exdate.toGMTString()) + "; path=/"
};

let getPathParams = function () {
    var pathName = window.location.pathname.split('/');
    return pathName;
}

export default {
    getUrlParams: getUrlParams(),
    setCookie : setCookie,
    getCookie : getCookie,
    getPathParams : getPathParams()
}