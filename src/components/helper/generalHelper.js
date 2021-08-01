/* eslint-disable */
/**
 *
 * generalHelper.js
 */
 export const NAV_BAR_BASE_HEIGHT = 48.0;

 export let readableDateFormatWithTimeUpToSeconds = "DD.MM.YYYY, HH:mm:ss";
 
 export let gasExtensionIdentifier = "'";
 export let regexGasExtensionIdentifier = /'/g;
 export let regexLastInsideSquarebrackets = /^.*\[(.*?)\]$/g;
 
 /**
  * 
  * @param {array} rgb // array of numbers ['255', '0', '0'];
  * returns a hex color in black or white with default black on any error
  */
 export let getHexColorForRGBBackground = (rgb) => {
   //Color text change
 
     let defaultColor = '#000';
 
     if (!Array.isArray(rgb)) return 'black';
     for (let i = 0; i < rgb.length; i++) {
         if (isNaN(rgb[i])) return defaultColor;
         if (Number(rgb[i]) > 255 || Number(rgb[i] < 0)) return defaultColor;
     }
     
     //http://www.w3.org/TR/AERT#color-contrast
     
     let contrast = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) /1000);
     
     if (contrast > 125) { return '#000';}
     else {                return '#fff';}       
 }
 
 export let lightenOrDarkenColor = (color, percent) => {
   
     // lighten == positive percentage values
     // darken == negative percentage values
     let R = parseInt(color.substring(1,3),16);
     let G = parseInt(color.substring(3,5),16);
     let B = parseInt(color.substring(5,7),16);
 
     R = (R<255)?R:255;  
     G = (G<255)?G:255;  
     B = (B<255)?B:255;  
 
     R = parseInt(R * (100 + percent) / 100);
     G = parseInt(G * (100 + percent) / 100);
     B = parseInt(B * (100 + percent) / 100);
 
     R = (R<255)?R:255;  
     G = (G<255)?G:255;  
     B = (B<255)?B:255;  
 
     var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
     var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
     var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));
 
     return "#"+RR+GG+BB; 
 }
 
 export let getShadeForHexColor = (color) => {
     // lighten == positive percentage values
     // darken == negative percentage values
     let percent = 50;
     let R = parseInt(color.substring(1,3),16);
     let G = parseInt(color.substring(3,5),16);
     let B = parseInt(color.substring(5,7),16);
 
     R = (R<255)?R:255;  
     G = (G<255)?G:255;  
     B = (B<255)?B:255;  
 
     let contrast = Math.round(((R * 299) + (G * 587) + (B * 114)) /1000);
 
     if (contrast >= 120) {percent*=-1;} // > 125
 
     R = parseInt(R * (100 + percent) / 100);
     G = parseInt(G * (100 + percent) / 100);
     B = parseInt(B * (100 + percent) / 100);
 
     R = (R<255)?R:255;  
     G = (G<255)?G:255;  
     B = (B<255)?B:255;  
 
     var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
     var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
     var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));
 
     return "#"+RR+GG+BB; 
 }
 
 // EASING with various functions
 export let easing = {
     /**
      * Easing params - formulas from - http://www.gizma.com/easing/
      * @param {*} t current time
      * @param {*} b beginning value
      * @param {*} c change in value
      * @param {*} d duration
      */
     // no easing, no acceleration
     linearTween: function (t, b, c, d) {
         return c*t/d + b;
     },
     // accelerating from zero velocity
     easeInQuad: function (t, b, c, d) {
         t /= d;
         return c*t*t + b;
     },
     // decelerating to zero velocity
     easeOutQuad: function (t, b, c, d) {
         t /= d;
         return -c * t*(t-2) + b;
     },
     // acceleration until halfway, then deceleration
     easeInOutQuad: function(t, b, c, d) {
         t /= d/2;
         if (t < 1) return c/2*t*t + b;
         t--;
         return -c/2 * (t*(t-2) - 1) + b;
     },
     // accelerating from zero velocity
     easeInCubic: function (t, b, c, d) {
         t /= d;
         return c*t*t*t + b;
     },
     // decelerating to zero velocity
     easeOutCubic: function (t, b, c, d) {
         t /= d;
         t--;
         return c*(t*t*t + 1) + b;
     },
     // acceleration until halfway, then deceleration
     easeInOutCubic: function (t, b, c, d) {
         t /= d/2;
         if (t < 1) return c/2*t*t*t + b;
         t -= 2;
         return c/2*(t*t*t + 2) + b;
     },
     // accelerating from zero velocity
     easeInQuart: function (t, b, c, d) {
         t /= d;
         return c*t*t*t*t + b;
     },
     // decelerating to zero velocity
     easeOutQuart: function (t, b, c, d) {
         t /= d;
         t--;
         return -c * (t*t*t*t - 1) + b;
     },
     // acceleration until halfway, then deceleration
     easeInOutQuart: function (t, b, c, d) {
         t /= d/2;
         if (t < 1) return c/2*t*t*t*t + b;
         t -= 2;
         return -c/2 * (t*t*t*t - 2) + b;
     },
     // accelerating from zero velocity
     easeInQuint: function (t, b, c, d) {
         t /= d;
         return c*t*t*t*t*t + b;
     },
     // decelerating to zero velocity
     easeOutQuint: function (t, b, c, d) {
         t /= d;
         t--;
         return c*(t*t*t*t*t + 1) + b;
     },
     // acceleration until halfway, then deceleration
     easeInOutQuint: function (t, b, c, d) {
         t /= d/2;
         if (t < 1) return c/2*t*t*t*t*t + b;
         t -= 2;
         return c/2*(t*t*t*t*t + 2) + b;
     },
     // accelerating from zero velocity
     easeInSine: function (t, b, c, d) {
         return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
     },
     // decelerating to zero velocity
     easeOutSine: function (t, b, c, d) {
         return c * Math.sin(t/d * (Math.PI/2)) + b;
     },
     // accelerating until halfway, then decelerating
     easeInOutSine: function (t, b, c, d) {
         return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
     },
     // accelerating from zero velocity
     easeInExpo: function (t, b, c, d) {
         return c * Math.pow( 2, 10 * (t/d - 1) ) + b;
     },
     // decelerating to zero velocity
     easeOutExpo: function (t, b, c, d) {
         return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
     },
     // accelerating until halfway, then decelerating
     easeInOutExpo: function (t, b, c, d) {
         t /= d/2;
         if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
         t--;
         return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
     },
     // accelerating from zero velocity
     easeInCirc: function (t, b, c, d) {
         t /= d;
         return -c * (Math.sqrt(1 - t*t) - 1) + b;
     },
     // decelerating to zero velocity
     easeOutCirc: function (t, b, c, d) {
         t /= d;
         t--;
         return c * Math.sqrt(1 - t*t) + b;
     },
     // accelerating until halfway, then decelerating
     easeInOutCirc: function (t, b, c, d) {
         t /= d/2;
         if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
         t -= 2;
         return c/2 * (Math.sqrt(1 - t*t) + 1) + b;
     },
     // accelerating elastic from zero velocity
     easeInElastic: function (t, b, c, d) {
     var s=1.70158;var p=0;var a=c;
     if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
     if (a < Math.abs(c)) { a=c; var s=p/4; }
     else var s = p/(2*Math.PI) * Math.asin (c/a);
     return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
     },
     // decelerating elastic to zero velocity
   easeOutElastic: function (t, b, c, d) {
     var s=1.70158;var p=0;var a=c;
     if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
     if (a < Math.abs(c)) { a=c; var s=p/4; }
     else var s = p/(2*Math.PI) * Math.asin (c/a);
     return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
     },
     // accelerating elastic until halfway, then decelerating elastic
   easeInOutElastic: function (t, b, c, d) {
     var s=1.70158;var p=0;var a=c;
     if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
     if (a < Math.abs(c)) { a=c; var s=p/4; }
     else var s = p/(2*Math.PI) * Math.asin (c/a);
     if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
     return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
   },
 };
 
 /**
  * 
  * @param {*} position    // the scroll to position, current scrollPosition is taken from wrapperNode
  * @param {*} wrapperNode // this is the node where the scroll happens
  * @param {*} onComplete  // on completion handler
  * @param {*} options     // e.g. {duration:1, easing:'easeInOutCirc'} -  if you want to change the easing see available options in "easing"
  *                        // please not in addition, if you want to scroll up or down, set the scrollDown option accordingly
  */
 export let handleScrollToPositionForWrapperAndOnCompleteWithOptions = (position = 0, wrapperNode, onComplete, options) =>  {
     if (position > 0 && wrapperNode) {
 
         let currentScrollPos = wrapperNode.scrollTop;// || wrapperNode.pageYOffset;
         let scrollDown = (options && "scrollDown" in options) ? options.scrollDown : true;
         
         let fps = 60;
         let pos = 0;
         let max = (scrollDown) ? (currentScrollPos - NAV_BAR_BASE_HEIGHT + position) : (currentScrollPos - position);
         let time = 0;
         let duration = (options && "duration" in options) ? ((!isNaN(options.duration) && options.duration > 0) ? options.duration : 1) : 1; // duration in seconds
         let __easing = (options && "easing" in options) ? ((options.easing in easing) ? options.easing : 'linearTween') : 'linearTween';
         let start = (scrollDown) ? currentScrollPos : position;
 
         let int = setInterval(() => {
             time += 1 / fps;
             pos = easing[__easing](time,start,max,duration);
 
             // scroll only the y-Axis to pos
             if (scrollDown) { wrapperNode.scrollTo(0,pos); }
             else {            wrapperNode.scrollTo(0,currentScrollPos - Math.abs(pos)); }
             
             // animation is done when we reach max
             if ((scrollDown && pos >= max) || (!scrollDown && pos >= currentScrollPos)) {
                 clearInterval(int);
                 int = null;
 
                 // last scroll to make it pixel perfect
                 if (scrollDown) { wrapperNode.scrollTo(0, max); } 
                 else {            wrapperNode.scrollTo(0, position); }
                 
                 // done with the animation render new data
                 onComplete();
             }
         }, 1000 / fps);
     }
     else {
         
         // done without any animation, render data without animation
         onComplete();
     }
 }
 
 export function getRectForElementId(id) {
     let node = document.getElementById(id); 
     if (node) {
       // get the bounding box of the element in window
       let rect = node.getBoundingClientRect()
       if (rect) {
         return rect;
       }
     }
     return null;
   }
 
 export function isNumeric(n) {
   return !isNaN(parseFloat(n)) && isFinite(n);
 }
 
 export function isNumber(n) { 
     return /^-?[\d.]+(?:e-?\d+)?$/.test(n); 
 } 
 
 export function is_defined(obj) {
   return (typeof obj !== 'undefined');
 }
 
 export function isPropertyInObject(prop,obj) {
     if (Object.keys(obj).length === 0) return false;
     if (!(prop in obj)) return false;
     return true;
 }
 
 // prepend zero to hour
 export function prependZero(hour) {
   return (hour < 10 ? '0' : '') + hour;
 }
 
 // format to a fixed decimal and return string value
 export function format_decimals(conc, decimals = 3) {
   if (conc !== undefined && isNumeric(conc)) {
     return conc.toFixed(decimals);
   }
   else {
     return '';
   }
 }
 
 // get the decimal places in a number
 export function getDecimalPlaces(number) {
   if (isNaN(number)) return {wholePlaces:0, decimalPlaces:0};
   var s = number.toString().split('.');
   var wholePlaces= s[0];          
   var decimalPlaces = '0'; // default 
   if (s.length > 1) // check if the number was splitted and a seperator exists
     decimalPlaces = s[1]; // decimalPlaces
   else 
     return {wholePlaces:0, decimalPlaces:0};
 
   return {wholePlaces:wholePlaces.length, decimalPlaces:decimalPlaces.length};
 }
 
 // get the input number with min 4 digits if possible
 export function getNumberWithMinFourDigits(number) {
   if (isNaN(number)) return number;
 
   let placesInNumber = getDecimalPlaces(number);
   let decimals = 0
 
   switch (placesInNumber.wholePlaces) {
       case 4 : decimals = 0; break;
       case 3 : decimals = 1; break;
       case 2 : decimals = 2; break;
       case 1 : decimals = 3; break;
       case 0 : decimals = 0; break;
   }
   
   return format_decimals(number,decimals);
 }
 
 // check if two arrays are identical
 export function arraysAreIdentical(arr1, arr2){
     if (arr1.length !== arr2.length) return false;
     for (var i = 0, len = arr1.length; i < len; i++){
         if (arr1[i] !== arr2[i]){
             return false;
         }
     }
     return true; 
 }
 
 // format hour from graphId to hourFormat used in moment
 export function formatGraphHourIdToMomentHour(hour) {
   let regexCaseInsensitiveReplaceH = /h/gi;
   return prependZero(hour.replace(regexCaseInsensitiveReplaceH, ""));
 }
 
 export let isMobile = {
     Android: function() {
         return navigator.userAgent.match(/Android/i);
     },
     BlackBerry: function() {
         return navigator.userAgent.match(/BlackBerry/i);
     },
     iOS: function() {
         return navigator.userAgent.match(/iPhone|iPad|iPod/i);
     },
     Opera: function() {
         return navigator.userAgent.match(/Opera Mini/i);
     },
     Windows: function() {
         return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
     },
     any: function() {
         return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
     }
 };
 
 export function getIEVersion(){
     let reg = /MSIE\s?(\d+)(?:\.(\d+))?/i;
     let matches = navigator.userAgent.match(reg);
     if (matches != null) {
         return { major: matches[1], minor: matches[2] };
     }
     return { major: "-1", minor: "-1" };
 }
 
 export let isInternetExplorer = {
     TEN: function() {
         return getIEVersion().major == 10;
     }
 }
 
 export function allowResize() {
     // if (isMobile.any()) {
     //     let _documentWidth = document.documentElement.clientWidth || document.body.clientWidth;
     //     if (_documentWidth && _documentWidth > 0 && window.innerWidth && window.innerWidth > 0) {
     //         if ((_documentWidth/window.innerWidth) > 1) return false; 
     //     }
     // }
     return true;
 }
 
 // run a function every hour with a start delay in milliseconds
 export function functionWithHourlyIntervalAndDelay(func, startDelay = 0) {
     var now = new Date();
     var delay = 60 * 60 * 1000; // 1 hour in msec
     var start = delay - (now.getMinutes() * 60 + now.getSeconds()) * 1000 + now.getMilliseconds() + startDelay;
     // check if the time is after the starting hour and startDelay else a reload is needed earlier
     var delayDelta = (start - delay);
     if (delayDelta > 0) {
        if (delayDelta < startDelay) start-=delay;
     }
 
     // get the last/first time the interval will be fired
     // if     the interval was fired far more in the future than the "lastTimeIntervalFired" + "delay" and a margin of "timeMargin" 
     // than   retry the interval function with a delay of "retryTimeOfTheFuncAfterInterval" seconds
     var lastTimeIntervalFired = (new Date()).getTime();
     let timeMargin = 1 * 60 * 1000 // 1 minute margin 
     let retryTimeOfTheFuncAfterInterval = 30 * 1000 // 30 seconds
     
     setTimeout(function funcWithInterval() {
         // the function that needs an interval
         // func();
 
         // get the current time to calculate if tehe interval was working properly, or the app/browser was in hibernate mode 
         var currentTime = (new Date()).getTime();
 
         // if the currenttime is far more in the future than the lastTime the interval fired plus a margin in time, than try to reload according to retryTimeOfTheFuncAfterInterval
         if (currentTime > (lastTimeIntervalFired + delay + timeMargin)) {
             setTimeout(function () { func() }, retryTimeOfTheFuncAfterInterval);
         } 
         else {
             func();
         }
         // the timeout function interval changed, change the time the interval last fired
         lastTimeIntervalFired = currentTime;
         
     
         // schedule the next tick
         setTimeout(funcWithInterval, delay);
     }, start);
 }
 
 // sort a array of objects by key
 export function smartSort(property, ascending) {
   let _order = 1;
   if(ascending === false) {
       _order = -1;
   }
   return function (a,b) {
       var result = (a[property] < b[property]) ? -1 
                                                : (a[property] > b[property]) ? 1 
                                                                              : 0;
       return result * _order;
   }
 }
 
 // calculate css helper for Percent
 export function calc100PercentTimesValue(n) {
     return n === 0 ?
         "0%" :
         "calc(100% * " + (n) + ")";
 }
 
 export function calc100PercentDevidedBy(n) {
     return n === 0 ?
         "100%" :
         "calc(100% / " + (n) + ")";
 }
 
 export function calc100PercentMinus(n) {
     return n === 0 ?
         "100%" :
         "calc(100% - " + (n + "px") + ")";
 }
 
 // calculate css helper for Viewport Height
 export function calc100ViewportHeightMinus(n) {
     return n === 0 ?
         "100vh" :
         "calc(100vh - " + (n + "px") + ")";
 }
 
 // calculate css helper for Pixels
 export function calcGivenPixelMinus(px,n) {
     return n === 0 || px === 0 ?
         "0px" :
         "calc(" + (px + "px") + " - " + (n + "px") + ")";
 } 
 
 // check if an element has a class
 export function elementHasClass(element, hasClass) {
     if(element.className != null) {
       return element.className.match(new RegExp('(\\s|^)'+hasClass+'(\\s|$)'));
     }
     return false;
 }
 
 // get a hex color to brigthen it with a predefined value
 export function getBrighterHexColor(hexColor) {
     let _colorVal = hexColor.replace(/#/g, '')
     _colorVal = (parseInt(_colorVal , 16) + 0x101010).toString(16)
     return "#"+_colorVal;
 }
 
 /**
  * calculate the String length in px by simulating a canvas in the virtual dom
  * 
  * @param {string} _string // is the string that has to be measured
  * @param {string} font    // describes the font and its size e.g "Arial 15px"
  */
 export function getStringLengthInPx(_string, font) {
     if (typeof _string === "string" && typeof font === "string") {
         var element = document.createElement('canvas');
         element.className = "textDimensionCalculation";
         var context = element.getContext("2d");
         context.style="height:auto; width:auto; white-space:nowrap;";
         context.font = font;
         var lengthInPx = context.measureText(_string).width;
         return lengthInPx;
     }
     return 0;
 }
 
 /**
  * 
  * @param {number} width    // fetch an element from the dom tree an get its clientWidth
  * @param {string} _string  // is the string that has to be measured
  * @param {string} _font    // describes the font and its size e.g "Arial 15px"
  */
 export function getFontSizeForElementWidthAndStringForFont(width, string, font, options = {padding: 0, oversize: false}){
     // get the string length in px for font 
     let _stringLengthInPx = getStringLengthInPx(string, font);
 
     // set the max font to be 100% 
     let _maxFontSize = "90%";
 
     // decrease the font Size according to delta of the element to an max decrease of 50%
     if (_stringLengthInPx > 0 && width > 0) {
         let delta = Number(width) - Number(_stringLengthInPx + (options.padding > 0 ? options.padding*2 : options.padding));
         
         if (options.oversize && delta >= 60.0) {
             _maxFontSize = "200%";
         }
         else if (options.oversize && delta >= 50.0 && delta < 60.0) {
             _maxFontSize = "175%";
         }
         else if (options.oversize && delta >= 40.0 && delta < 50.0) {
             _maxFontSize = "150%";
         }
         else if (options.oversize && delta >= 30.0 && delta < 40.0) {
             _maxFontSize = "140%";
         }
         else if (options.oversize && delta >= 15.0 && delta < 30.0) {
             _maxFontSize = "130%";
         }
         else if (options.oversize && delta >= 10.0 && delta < 15.0) {
             _maxFontSize = "120%";
         }
         else if (options.oversize && delta >= 2.0 && delta < 10.0) {
             _maxFontSize = "110%";
         }
         else if (delta < 2.0/* && delta >= -10.0*/) { 
             // _maxFontSize = "90%";
             _maxFontSize = ((100 + delta) - options.padding) + '%';
         } 
         // else if (delta < -10 && delta >= -12.5) { 
         //     _maxFontSize = "85%";
         // }
         // else if (delta < -12.5 && delta >= -15.0) { 
         //     _maxFontSize = "80%";
         // }
         // else if (delta < -15.0 && delta >= -20) {
         //     _maxFontSize = "75%";
         // }
         // else if (delta < -20.0 && delta >= -25) {
         //     _maxFontSize = "70%";
         // }
         // else if (delta < -25.0 && delta >= -30) {
         //     _maxFontSize = "65%";
         // }
         // else if (delta < -30.0 && delta >= -35) {
         //     _maxFontSize = "60%";
         // }
         // else if (delta < -35.0 && delta >= -60) {
         //     _maxFontSize = "55%";
         // }
         // else if (delta < -60.0) {
         //     _maxFontSize = "50%";
         // }
     }
     return _maxFontSize;
 }
 
 /**
  * 
  * @param {number} value  // expected is a value 0 >= x <= 360 ...as rotation degree
  */
 export function getTransformRotationForAngle(value) {
     if (isNaN(Number(value))) { return {}; }
 
     let _value = Number(value);
     if (_value > 0 && _value < 360) {
         let _rotate = "rotate("+_value+"deg)";
         return {
             transform: _rotate,
             "msTransform": _rotate,
             "WebkitTransform": _rotate,
         };
     }
     else return {};
 
 }
 
 /**
  * @param {number} n // length of the truncated string
  * @param {boolean} useWordBoundary // truncate by word
  */
 export function truncateString(n, useWordBoundary) {
     if (this.length <= n) { return this; }
     var subString = this.substr(0, n-1);
     return (useWordBoundary 
        ? subString.substr(0, subString.lastIndexOf(' ')) 
        : subString) + " ...";
 }
 
 /**
  * @param {array} array // object of special type array
  */
 export function isArrayWithData(array) {
     if (typeof array != "undefined" && array != null && array.length != null && array.length > 0) return true;
     return false;
 } 
 
 /**
  * @param {object} obj // object
  */
 export function isObjectWithData(obj) {
     if (obj != null && typeof obj === "object" && Object.keys(obj).length != null && Object.keys(obj).length > 0) return true;
     return false;
 } 
 
 /**
  * @param {object} obj1 // object to be compared
  * @param {object} obj2 // object to be compared
  */
 export function isEqualObject (obj1, obj2) {
     return Object.keys(obj1).length === Object.keys(obj2).length && Object.keys(obj1).every(key => obj2.hasOwnProperty(key) && obj1[key] === obj2[key]);
 }
 
 /**
  * @param {object} obj   // the object that should have nested values
  * @param {string} level // the first object level to check 
  * @param {string} rest  // comma separated n levels 
  * 
  * return bool
  */
 export function hasNestedValue(obj, level,  ...rest) {
     if (!obj || obj === undefined || !isObjectWithData(obj)) return false
     if (rest.length == 0 && obj.hasOwnProperty(level)) return true
     return hasNestedValue(obj[level], ...rest)
 }
 
 /**
  * @param {object} obj   // the object that should have nested values
  * @param {string} args  // comma separated n levels 
  * 
  * return the value of that level || undefined
  */
 export function getNestedValue(obj, ...args) {
     return args.reduce((obj, level) => obj && obj[level], obj)
 }
 
 export function setCookie(name, value, expire) {
     let d = new Date();
     d.setTime(d.getTime() + (expire));
     let https = (window.location.protocol == 'https:') ? true : false;
     let expires = "expires="+ d.toUTCString();
     document.cookie = name + "=" + value + ";" + (https ? "Secure;" : "") + expires + ";path=/";
 }
 
 export function getCookie(name) {
     let _name = name + "=";
     let decodedCookie = decodeURIComponent(document.cookie);
     let ca = decodedCookie.split(';');
     for(var i = 0; i <ca.length; i++) {
         var c = ca[i];
         while (c.charAt(0) == ' '){
             c = c.substring(1);
         }
  
         if (c.indexOf(_name) == 0) {
             return c.substring(_name.length, c.length);
         }
     }
     return "";
 }
 
 export function deleteCookie( name, path, domain ) {
   if( getCookie( name ) ) {
     document.cookie = name + "=" +
       ((path) ? ";path="+path:"")+
       ((domain)?";domain="+domain:"") +
       ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
   }
 }
 
 /**
  * 
  * @param {array} array 
  */
 export function arrayToObject (array) {
     if (!isArrayWithData(array) || !array[0].id) {
         return array;
     }
     return array.reduce((items, currentItem) => ({ ...items, [currentItem.id]: currentItem }), {});
 };
 
 /**
  * 
  * @param {string} token 
  * @returns object with key value pairs if possible
  */
 export function parseJwt (token) {
     if (!token) return {};
     try {
         let base64Url = token.split('.')[1];
         let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
         let jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
             return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
         }).join(''));
     
         return  JSON.parse(jsonPayload);
     } catch (e) {
         debug.log('generalHelper::parseJWT - error', e);
     }
     return {};
 };

 /* eslint-enable */
