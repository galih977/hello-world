'use strict';
if ("function" !== typeof Object["create"]) {
  /**
   * @param {?} PL$8
   * @return {?}
   */
  Object["create"] = function(PL$8) {
    /**
     * @return {undefined}
     */
    function PL$3() {
    }
    PL$3["prototype"] = PL$8;
    return new PL$3;
  };
}
(function($, window, document) {
  var Carousel = {
    init : function(runway, flightPhase) {
      this["$elem"] = $(flightPhase);
      this["options"] = $["extend"]({}, $["fn"]["owlCarousel"]["options"], this["$elem"]["data"](), runway);
      this["userOptions"] = runway;
      this["loadContent"]();
    },
    loadContent : function() {
      /**
       * @param {!Object} data
       * @return {undefined}
       */
      function getData(data) {
        var i;
        /** @type {string} */
        var html = "";
        if ("function" === typeof $componentList["options"]["jsonSuccess"]) {
          $componentList["options"]["jsonSuccess"]["apply"](this, [data]);
        } else {
          for (i in data["owl"]) {
            if (data["owl"]["hasOwnProperty"](i)) {
              html = html + data["owl"][i]["item"];
            }
          }
          $componentList["$elem"]["html"](html);
        }
        $componentList["logIn"]();
      }
      var $componentList = this;
      var json_file;
      if ("function" === typeof $componentList["options"]["beforeInit"]) {
        $componentList["options"]["beforeInit"]["apply"](this, [$componentList["$elem"]]);
      }
      if ("string" === typeof $componentList["options"]["jsonPath"]) {
        json_file = $componentList["options"]["jsonPath"];
        $["getJSON"](json_file, getData);
      } else {
        $componentList["logIn"]();
      }
    },
    logIn : function() {
      this["$elem"]["data"]("owl-originalStyles", this["$elem"]["attr"]("style"));
      this["$elem"]["data"]("owl-originalClasses", this["$elem"]["attr"]("class"));
      this["$elem"]["css"]({
        opacity : 0
      });
      this["orignalItems"] = this["options"]["items"];
      this["checkBrowser"]();
      /** @type {number} */
      this["wrapperWidth"] = 0;
      /** @type {null} */
      this["checkVisible"] = null;
      this["setVars"]();
    },
    setVars : function() {
      if (0 === this["$elem"]["children"]()["length"]) {
        return false;
      }
      this["baseClass"]();
      this["eventTypes"]();
      this["$userItems"] = this["$elem"]["children"]();
      this["itemsAmount"] = this["$userItems"]["length"];
      this["wrapItems"]();
      this["$owlItems"] = this["$elem"]["find"](".owl-item");
      this["$owlWrapper"] = this["$elem"]["find"](".owl-wrapper");
      /** @type {string} */
      this["playDirection"] = "next";
      /** @type {number} */
      this["prevItem"] = 0;
      /** @type {!Array} */
      this["prevArr"] = [0];
      /** @type {number} */
      this["currentItem"] = 0;
      this["customEvents"]();
      this["onStartup"]();
    },
    onStartup : function() {
      this["updateItems"]();
      this["calculateAll"]();
      this["buildControls"]();
      this["updateControls"]();
      this["response"]();
      this["moveEvents"]();
      this["stopOnHover"]();
      this["owlStatus"]();
      if (false !== this["options"]["transitionStyle"]) {
        this["transitionTypes"](this["options"]["transitionStyle"]);
      }
      if (true === this["options"]["autoPlay"]) {
        /** @type {number} */
        this["options"]["autoPlay"] = 5E3;
      }
      this["play"]();
      this["$elem"]["find"](".owl-wrapper")["css"]("display", "block");
      if (this["$elem"]["is"](":visible")) {
        this["$elem"]["css"]("opacity", 1);
      } else {
        this["watchVisibility"]();
      }
      /** @type {boolean} */
      this["onstartup"] = false;
      this["eachMoveUpdate"]();
      if ("function" === typeof this["options"]["afterInit"]) {
        this["options"]["afterInit"]["apply"](this, [this["$elem"]]);
      }
    },
    eachMoveUpdate : function() {
      if (true === this["options"]["lazyLoad"]) {
        this["lazyLoad"]();
      }
      if (true === this["options"]["autoHeight"]) {
        this["autoHeight"]();
      }
      this["onVisibleItems"]();
      if ("function" === typeof this["options"]["afterAction"]) {
        this["options"]["afterAction"]["apply"](this, [this["$elem"]]);
      }
    },
    updateVars : function() {
      if ("function" === typeof this["options"]["beforeUpdate"]) {
        this["options"]["beforeUpdate"]["apply"](this, [this["$elem"]]);
      }
      this["watchVisibility"]();
      this["updateItems"]();
      this["calculateAll"]();
      this["updatePosition"]();
      this["updateControls"]();
      this["eachMoveUpdate"]();
      if ("function" === typeof this["options"]["afterUpdate"]) {
        this["options"]["afterUpdate"]["apply"](this, [this["$elem"]]);
      }
    },
    reload : function() {
      var variable_4 = this;
      window["setTimeout"](function() {
        variable_4["updateVars"]();
      }, 0);
    },
    watchVisibility : function() {
      var args = this;
      if (false === args["$elem"]["is"](":visible")) {
        args["$elem"]["css"]({
          opacity : 0
        });
        window["clearInterval"](args["autoPlayInterval"]);
        window["clearInterval"](args["checkVisible"]);
      } else {
        return false;
      }
      args["checkVisible"] = window["setInterval"](function() {
        if (args["$elem"]["is"](":visible")) {
          args["reload"]();
          args["$elem"]["animate"]({
            opacity : 1
          }, 200);
          window["clearInterval"](args["checkVisible"]);
        }
      }, 500);
    },
    wrapItems : function() {
      this["$userItems"]["wrapAll"]('<div class="owl-wrapper">')["wrap"]('<div class="owl-item"></div>');
      this["$elem"]["find"](".owl-wrapper")["wrap"]('<div class="owl-wrapper-outer">');
      this["wrapperOuter"] = this["$elem"]["find"](".owl-wrapper-outer");
      this["$elem"]["css"]("display", "block");
    },
    baseClass : function() {
      var variable_4 = this["$elem"]["hasClass"](this["options"]["baseClass"]);
      var variable_5 = this["$elem"]["hasClass"](this["options"]["theme"]);
      if (!variable_4) {
        this["$elem"]["addClass"](this["options"]["baseClass"]);
      }
      if (!variable_5) {
        this["$elem"]["addClass"](this["options"]["theme"]);
      }
    },
    updateItems : function() {
      var variable_4;
      var i;
      if (false === this["options"]["responsive"]) {
        return false;
      }
      if (true === this["options"]["singleItem"]) {
        return this["options"]["items"] = this["orignalItems"] = 1, this["options"]["itemsCustom"] = false, this["options"]["itemsDesktop"] = false, this["options"]["itemsDesktopSmall"] = false, this["options"]["itemsTablet"] = false, this["options"]["itemsTabletSmall"] = false, this["options"]["itemsMobile"] = false;
      }
      variable_4 = $(this["options"]["responsiveBaseWidth"])["width"]();
      if (variable_4 > (this["options"]["itemsDesktop"][0] || this["orignalItems"])) {
        this["options"]["items"] = this["orignalItems"];
      }
      if (false !== this["options"]["itemsCustom"]) {
        this["options"]["itemsCustom"]["sort"](function(subtractor, subtractee) {
          return subtractor[0] - subtractee[0];
        });
        /** @type {number} */
        i = 0;
        for (; i < this["options"]["itemsCustom"]["length"]; i = i + 1) {
          if (this["options"]["itemsCustom"][i][0] <= variable_4) {
            this["options"]["items"] = this["options"]["itemsCustom"][i][1];
          }
        }
      } else {
        if (variable_4 <= this["options"]["itemsDesktop"][0] && false !== this["options"]["itemsDesktop"]) {
          this["options"]["items"] = this["options"]["itemsDesktop"][1];
        }
        if (variable_4 <= this["options"]["itemsDesktopSmall"][0] && false !== this["options"]["itemsDesktopSmall"]) {
          this["options"]["items"] = this["options"]["itemsDesktopSmall"][1];
        }
        if (variable_4 <= this["options"]["itemsTablet"][0] && false !== this["options"]["itemsTablet"]) {
          this["options"]["items"] = this["options"]["itemsTablet"][1];
        }
        if (variable_4 <= this["options"]["itemsTabletSmall"][0] && false !== this["options"]["itemsTabletSmall"]) {
          this["options"]["items"] = this["options"]["itemsTabletSmall"][1];
        }
        if (variable_4 <= this["options"]["itemsMobile"][0] && false !== this["options"]["itemsMobile"]) {
          this["options"]["items"] = this["options"]["itemsMobile"][1];
        }
      }
      if (this["options"]["items"] > this["itemsAmount"] && true === this["options"]["itemsScaleUp"]) {
        this["options"]["items"] = this["itemsAmount"];
      }
    },
    response : function() {
      var self = this;
      var processEvaluatorsCallback;
      var variable_7;
      if (true !== self["options"]["responsive"]) {
        return false;
      }
      variable_7 = $(window)["width"]();
      /**
       * @return {undefined}
       */
      self["resizer"] = function() {
        if ($(window)["width"]() !== variable_7) {
          if (false !== self["options"]["autoPlay"]) {
            window["clearInterval"](self["autoPlayInterval"]);
          }
          window["clearTimeout"](processEvaluatorsCallback);
          processEvaluatorsCallback = window["setTimeout"](function() {
            variable_7 = $(window)["width"]();
            self["updateVars"]();
          }, self["options"]["responsiveRefreshRate"]);
        }
      };
      $(window)["resize"](self["resizer"]);
    },
    updatePosition : function() {
      this["jumpTo"](this["currentItem"]);
      if (false !== this["options"]["autoPlay"]) {
        this["checkAp"]();
      }
    },
    appendItemsSizes : function() {
      var data = this;
      /** @type {number} */
      var status = 0;
      /** @type {number} */
      var largestZIndexThusFar = data["itemsAmount"] - data["options"]["items"];
      data["$owlItems"]["each"](function(analogPinNumber) {
        var messages = $(this);
        messages["css"]({
          width : data["itemWidth"]
        })["data"]("owl-item", Number(analogPinNumber));
        if (0 === analogPinNumber % data["options"]["items"] || analogPinNumber === largestZIndexThusFar) {
          if (!(analogPinNumber > largestZIndexThusFar)) {
            status = status + 1;
          }
        }
        messages["data"]("owl-roundPages", status);
      });
    },
    appendWrapperSizes : function() {
      this["$owlWrapper"]["css"]({
        width : this["$owlItems"]["length"] * this["itemWidth"] * 2,
        left : 0
      });
      this["appendItemsSizes"]();
    },
    calculateAll : function() {
      this["calculateWidth"]();
      this["appendWrapperSizes"]();
      this["loops"]();
      this["max"]();
    },
    calculateWidth : function() {
      this["itemWidth"] = Math["round"](this["$elem"]["width"]() / this["options"]["items"]);
    },
    max : function() {
      /** @type {number} */
      var group = -1 * (this["itemsAmount"] * this["itemWidth"] - this["options"]["items"] * this["itemWidth"]);
      if (this["options"]["items"] > this["itemsAmount"]) {
        /** @type {number} */
        this["maximumPixels"] = group = this["maximumItem"] = 0;
      } else {
        /** @type {number} */
        this["maximumItem"] = this["itemsAmount"] - this["options"]["items"];
        /** @type {number} */
        this["maximumPixels"] = group;
      }
      return group;
    },
    min : function() {
      return 0;
    },
    loops : function() {
      /** @type {number} */
      var version = 0;
      /** @type {number} */
      var variable_5 = 0;
      var i;
      var v;
      /** @type {!Array} */
      this["positionsInArray"] = [0];
      /** @type {!Array} */
      this["pagesInArray"] = [];
      /** @type {number} */
      i = 0;
      for (; i < this["itemsAmount"]; i = i + 1) {
        variable_5 = variable_5 + this["itemWidth"];
        this["positionsInArray"]["push"](-variable_5);
        if (true === this["options"]["scrollPerPage"]) {
          v = $(this["$owlItems"][i]);
          v = v["data"]("owl-roundPages");
          if (v !== version) {
            this["pagesInArray"][version] = this["positionsInArray"][i];
            version = v;
          }
        }
      }
    },
    buildControls : function() {
      if (true === this["options"]["navigation"] || true === this["options"]["pagination"]) {
        this["owlControls"] = $('<div class="owl-controls"/>')["toggleClass"]("clickable", !this["browser"]["isTouch"])["appendTo"](this.$elem);
      }
      if (true === this["options"]["pagination"]) {
        this["buildPagination"]();
      }
      if (true === this["options"]["navigation"]) {
        this["buildButtons"]();
      }
    },
    buildButtons : function() {
      var data = this;
      var target = $('<div class="owl-buttons"/>');
      data["owlControls"]["append"](target);
      data["buttonPrev"] = $("<div/>", {
        "class" : "owl-prev",
        html : data["options"]["navigationText"][0] || ""
      });
      data["buttonNext"] = $("<div/>", {
        "class" : "owl-next",
        html : data["options"]["navigationText"][1] || ""
      });
      target["append"](data["buttonPrev"])["append"](data["buttonNext"]);
      target["on"]("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function(result) {
        result["preventDefault"]();
      });
      target["on"]("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function(result) {
        result["preventDefault"]();
        if ($(this)["hasClass"]("owl-next")) {
          data["next"]();
        } else {
          data["prev"]();
        }
      });
    },
    buildPagination : function() {
      var test = this;
      test["paginationWrapper"] = $('<div class="owl-pagination"/>');
      test["owlControls"]["append"](test["paginationWrapper"]);
      test["paginationWrapper"]["on"]("touchend.owlControls mouseup.owlControls", ".owl-page", function(result) {
        result["preventDefault"]();
        if (Number($(this)["data"]("owl-page")) !== test["currentItem"]) {
          test["goTo"](Number($(this)["data"]("owl-page")), true);
        }
      });
    },
    updatePagination : function() {
      var formula;
      var iterator;
      var inIterator;
      var outIteraror;
      var p;
      var input;
      if (false === this["options"]["pagination"]) {
        return false;
      }
      this["paginationWrapper"]["html"]("");
      /** @type {number} */
      formula = 0;
      /** @type {number} */
      iterator = this["itemsAmount"] - this["itemsAmount"] % this["options"]["items"];
      /** @type {number} */
      outIteraror = 0;
      for (; outIteraror < this["itemsAmount"]; outIteraror = outIteraror + 1) {
        if (0 === outIteraror % this["options"]["items"]) {
          /** @type {number} */
          formula = formula + 1;
          if (iterator === outIteraror) {
            /** @type {number} */
            inIterator = this["itemsAmount"] - this["options"]["items"];
          }
          p = $("<div/>", {
            "class" : "owl-page"
          });
          input = $("<span></span>", {
            text : true === this["options"]["paginationNumbers"] ? formula : "",
            "class" : true === this["options"]["paginationNumbers"] ? "owl-numbers" : ""
          });
          p["append"](input);
          p["data"]("owl-page", iterator === outIteraror ? inIterator : outIteraror);
          p["data"]("owl-roundPages", formula);
          this["paginationWrapper"]["append"](p);
        }
      }
      this["checkPagination"]();
    },
    checkPagination : function() {
      var obj = this;
      if (false === obj["options"]["pagination"]) {
        return false;
      }
      obj["paginationWrapper"]["find"](".owl-page")["each"](function() {
        if ($(this)["data"]("owl-roundPages") === $(obj["$owlItems"][obj["currentItem"]])["data"]("owl-roundPages")) {
          obj["paginationWrapper"]["find"](".owl-page")["removeClass"]("active");
          $(this)["addClass"]("active");
        }
      });
    },
    checkNavigation : function() {
      if (false === this["options"]["navigation"]) {
        return false;
      }
      if (false === this["options"]["rewindNav"]) {
        if (0 === this["currentItem"] && 0 === this["maximumItem"]) {
          this["buttonPrev"]["addClass"]("disabled");
          this["buttonNext"]["addClass"]("disabled");
        } else {
          if (0 === this["currentItem"] && 0 !== this["maximumItem"]) {
            this["buttonPrev"]["addClass"]("disabled");
            this["buttonNext"]["removeClass"]("disabled");
          } else {
            if (this["currentItem"] === this["maximumItem"]) {
              this["buttonPrev"]["removeClass"]("disabled");
              this["buttonNext"]["addClass"]("disabled");
            } else {
              if (0 !== this["currentItem"] && this["currentItem"] !== this["maximumItem"]) {
                this["buttonPrev"]["removeClass"]("disabled");
                this["buttonNext"]["removeClass"]("disabled");
              }
            }
          }
        }
      }
    },
    updateControls : function() {
      this["updatePagination"]();
      this["checkNavigation"]();
      if (this["owlControls"]) {
        if (this["options"]["items"] >= this["itemsAmount"]) {
          this["owlControls"]["hide"]();
        } else {
          this["owlControls"]["show"]();
        }
      }
    },
    destroyControls : function() {
      if (this["owlControls"]) {
        this["owlControls"]["remove"]();
      }
    },
    next : function(speed) {
      if (this["isTransition"]) {
        return false;
      }
      this["currentItem"] += true === this["options"]["scrollPerPage"] ? this["options"]["items"] : 1;
      if (this["currentItem"] > this["maximumItem"] + (true === this["options"]["scrollPerPage"] ? this["options"]["items"] - 1 : 0)) {
        if (true === this["options"]["rewindNav"]) {
          /** @type {number} */
          this["currentItem"] = 0;
          /** @type {string} */
          speed = "rewind";
        } else {
          return this["currentItem"] = this["maximumItem"], false;
        }
      }
      this["goTo"](this["currentItem"], speed);
    },
    prev : function(speed) {
      if (this["isTransition"]) {
        return false;
      }
      /** @type {number} */
      this["currentItem"] = true === this["options"]["scrollPerPage"] && 0 < this["currentItem"] && this["currentItem"] < this["options"]["items"] ? 0 : this["currentItem"] - (true === this["options"]["scrollPerPage"] ? this["options"]["items"] : 1);
      if (0 > this["currentItem"]) {
        if (true === this["options"]["rewindNav"]) {
          this["currentItem"] = this["maximumItem"];
          /** @type {string} */
          speed = "rewind";
        } else {
          return this["currentItem"] = 0, false;
        }
      }
      this["goTo"](this["currentItem"], speed);
    },
    goTo : function(val, event, drag) {
      var data = this;
      if (data["isTransition"]) {
        return false;
      }
      if ("function" === typeof data["options"]["beforeMove"]) {
        data["options"]["beforeMove"]["apply"](this, [data["$elem"]]);
      }
      if (val >= data["maximumItem"]) {
        val = data["maximumItem"];
      } else {
        if (0 >= val) {
          /** @type {number} */
          val = 0;
        }
      }
      data["currentItem"] = data["owl"]["currentItem"] = val;
      if (false !== data["options"]["transitionStyle"] && "drag" !== drag && 1 === data["options"]["items"] && true === data["browser"]["support3d"]) {
        return data["swapSpeed"](0), true === data["browser"]["support3d"] ? data["transition3d"](data["positionsInArray"][val]) : data["css2slide"](data["positionsInArray"][val], 1), data["afterGo"](), data["singleItemTransition"](), false;
      }
      val = data["positionsInArray"][val];
      if (true === data["browser"]["support3d"]) {
        /** @type {boolean} */
        data["isCss3Finish"] = false;
        if (true === event) {
          data["swapSpeed"]("paginationSpeed");
          window["setTimeout"](function() {
            /** @type {boolean} */
            data["isCss3Finish"] = true;
          }, data["options"]["paginationSpeed"]);
        } else {
          if ("rewind" === event) {
            data["swapSpeed"](data["options"]["rewindSpeed"]);
            window["setTimeout"](function() {
              /** @type {boolean} */
              data["isCss3Finish"] = true;
            }, data["options"]["rewindSpeed"]);
          } else {
            data["swapSpeed"]("slideSpeed");
            window["setTimeout"](function() {
              /** @type {boolean} */
              data["isCss3Finish"] = true;
            }, data["options"]["slideSpeed"]);
          }
        }
        data["transition3d"](val);
      } else {
        if (true === event) {
          data["css2slide"](val, data["options"]["paginationSpeed"]);
        } else {
          if ("rewind" === event) {
            data["css2slide"](val, data["options"]["rewindSpeed"]);
          } else {
            data["css2slide"](val, data["options"]["slideSpeed"]);
          }
        }
      }
      data["afterGo"]();
    },
    jumpTo : function(num) {
      if ("function" === typeof this["options"]["beforeMove"]) {
        this["options"]["beforeMove"]["apply"](this, [this["$elem"]]);
      }
      if (num >= this["maximumItem"] || -1 === num) {
        num = this["maximumItem"];
      } else {
        if (0 >= num) {
          /** @type {number} */
          num = 0;
        }
      }
      this["swapSpeed"](0);
      if (true === this["browser"]["support3d"]) {
        this["transition3d"](this["positionsInArray"][num]);
      } else {
        this["css2slide"](this["positionsInArray"][num], 1);
      }
      this["currentItem"] = this["owl"]["currentItem"] = num;
      this["afterGo"]();
    },
    afterGo : function() {
      this["prevArr"]["push"](this["currentItem"]);
      this["prevItem"] = this["owl"]["prevItem"] = this["prevArr"][this["prevArr"]["length"] - 2];
      this["prevArr"]["shift"](0);
      if (this["prevItem"] !== this["currentItem"]) {
        this["checkPagination"]();
        this["checkNavigation"]();
        this["eachMoveUpdate"]();
        if (false !== this["options"]["autoPlay"]) {
          this["checkAp"]();
        }
      }
      if ("function" === typeof this["options"]["afterMove"] && this["prevItem"] !== this["currentItem"]) {
        this["options"]["afterMove"]["apply"](this, [this["$elem"]]);
      }
    },
    stop : function() {
      /** @type {string} */
      this["apStatus"] = "stop";
      window["clearInterval"](this["autoPlayInterval"]);
    },
    checkAp : function() {
      if ("stop" !== this["apStatus"]) {
        this["play"]();
      }
    },
    play : function() {
      var data = this;
      /** @type {string} */
      data["apStatus"] = "play";
      if (false === data["options"]["autoPlay"]) {
        return false;
      }
      window["clearInterval"](data["autoPlayInterval"]);
      data["autoPlayInterval"] = window["setInterval"](function() {
        data["next"](true);
      }, data["options"]["autoPlay"]);
    },
    swapSpeed : function(className) {
      if ("slideSpeed" === className) {
        this["$owlWrapper"]["css"](this["addCssSpeed"](this["options"]["slideSpeed"]));
      } else {
        if ("paginationSpeed" === className) {
          this["$owlWrapper"]["css"](this["addCssSpeed"](this["options"]["paginationSpeed"]));
        } else {
          if ("string" !== typeof className) {
            this["$owlWrapper"]["css"](this["addCssSpeed"](className));
          }
        }
      }
    },
    addCssSpeed : function(speed) {
      return {
        "-webkit-transition" : "all " + speed + "ms ease",
        "-moz-transition" : "all " + speed + "ms ease",
        "-o-transition" : "all " + speed + "ms ease",
        transition : "all " + speed + "ms ease"
      };
    },
    removeTransition : function() {
      return {
        "-webkit-transition" : "",
        "-moz-transition" : "",
        "-o-transition" : "",
        transition : ""
      };
    },
    doTranslate : function(y) {
      return {
        "-webkit-transform" : "translate3d(" + y + "px, 0px, 0px)",
        "-moz-transform" : "translate3d(" + y + "px, 0px, 0px)",
        "-o-transform" : "translate3d(" + y + "px, 0px, 0px)",
        "-ms-transform" : "translate3d(" + y + "px, 0px, 0px)",
        transform : "translate3d(" + y + "px, 0px,0px)"
      };
    },
    transition3d : function(value) {
      this["$owlWrapper"]["css"](this["doTranslate"](value));
    },
    css2move : function(value) {
      this["$owlWrapper"]["css"]({
        left : value
      });
    },
    css2slide : function(value, speed) {
      var timespentArr = this;
      /** @type {boolean} */
      timespentArr["isCssFinish"] = false;
      timespentArr["$owlWrapper"]["stop"](true, true)["animate"]({
        left : value
      }, {
        duration : speed || timespentArr["options"]["slideSpeed"],
        complete : function() {
          /** @type {boolean} */
          timespentArr["isCssFinish"] = true;
        }
      });
    },
    checkBrowser : function() {
      var css = document["createElement"]("div");
      /** @type {string} */
      css["style"]["cssText"] = "  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)";
      css = css["style"]["cssText"]["match"](/translate3d\(0px, 0px, 0px\)/g);
      this["browser"] = {
        support3d : null !== css && 1 === css["length"],
        isTouch : "ontouchstart" in window || window["navigator"]["msMaxTouchPoints"]
      };
    },
    moveEvents : function() {
      if (false !== this["options"]["mouseDrag"] || false !== this["options"]["touchDrag"]) {
        this["gestures"]();
        this["disabledEvents"]();
      }
    },
    eventTypes : function() {
      /** @type {!Array} */
      var types = ["s", "e", "x"];
      this["ev_types"] = {};
      if (true === this["options"]["mouseDrag"] && true === this["options"]["touchDrag"]) {
        /** @type {!Array} */
        types = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"];
      } else {
        if (false === this["options"]["mouseDrag"] && true === this["options"]["touchDrag"]) {
          /** @type {!Array} */
          types = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"];
        } else {
          if (true === this["options"]["mouseDrag"] && false === this["options"]["touchDrag"]) {
            /** @type {!Array} */
            types = ["mousedown.owl", "mousemove.owl", "mouseup.owl"];
          }
        }
      }
      this["ev_types"]["start"] = types[0];
      this["ev_types"]["move"] = types[1];
      this["ev_types"]["end"] = types[2];
    },
    disabledEvents : function() {
      this["$elem"]["on"]("dragstart.owl", function(result) {
        result["preventDefault"]();
      });
      this["$elem"]["on"]("mousedown.disableTextSelect", function(param) {
        return $(param["target"])["is"]("input, textarea, select, option");
      });
    },
    gestures : function() {
      /**
       * @param {!Object} e
       * @return {?}
       */
      function drag(e) {
        if (void 0 !== e["touches"]) {
          return {
            x : e["touches"][0]["pageX"],
            y : e["touches"][0]["pageY"]
          };
        }
        if (void 0 === e["touches"]) {
          if (void 0 !== e["pageX"]) {
            return {
              x : e["pageX"],
              y : e["pageY"]
            };
          }
          if (void 0 === e["pageX"]) {
            return {
              x : e["clientX"],
              y : e["clientY"]
            };
          }
        }
      }
      /**
       * @param {string} type
       * @return {undefined}
       */
      function swapEvents(type) {
        if ("on" === type) {
          $(document)["on"](data["ev_types"]["move"], render);
          $(document)["on"](data["ev_types"]["end"], init);
        } else {
          if ("off" === type) {
            $(document)["off"](data["ev_types"]["move"]);
            $(document)["off"](data["ev_types"]["end"]);
          }
        }
      }
      /**
       * @param {!Object} e
       * @return {undefined}
       */
      function render(e) {
        e = e["originalEvent"] || e || window["event"];
        /** @type {number} */
        data["newPosX"] = drag(e)["x"] - locals["offsetX"];
        /** @type {number} */
        data["newPosY"] = drag(e)["y"] - locals["offsetY"];
        /** @type {number} */
        data["newRelativeX"] = data["newPosX"] - locals["relativePos"];
        if ("function" === typeof data["options"]["startDragging"] && true !== locals["dragging"] && 0 !== data["newRelativeX"]) {
          /** @type {boolean} */
          locals["dragging"] = true;
          data["options"]["startDragging"]["apply"](data, [data["$elem"]]);
        }
        if ((8 < data["newRelativeX"] || -8 > data["newRelativeX"]) && true === data["browser"]["isTouch"]) {
          if (void 0 !== e["preventDefault"]) {
            e["preventDefault"]();
          } else {
            /** @type {boolean} */
            e["returnValue"] = false;
          }
          /** @type {boolean} */
          locals["sliding"] = true;
        }
        if ((10 < data["newPosY"] || -10 > data["newPosY"]) && false === locals["sliding"]) {
          $(document)["off"]("touchmove.owl");
        }
        data["newPosX"] = Math["max"](Math["min"](data["newPosX"], data["newRelativeX"] / 5), data["maximumPixels"] + data["newRelativeX"] / 5);
        if (true === data["browser"]["support3d"]) {
          data["transition3d"](data["newPosX"]);
        } else {
          data["css2move"](data["newPosX"]);
        }
      }
      /**
       * @param {!Object} e
       * @return {undefined}
       */
      function init(e) {
        e = e["originalEvent"] || e || window["event"];
        var i;
        e["target"] = e["target"] || e["srcElement"];
        /** @type {boolean} */
        locals["dragging"] = false;
        if (true !== data["browser"]["isTouch"]) {
          data["$owlWrapper"]["removeClass"]("grabbing");
        }
        /** @type {string} */
        data["dragDirection"] = 0 > data["newRelativeX"] ? data["owl"]["dragDirection"] = "left" : data["owl"]["dragDirection"] = "right";
        if (0 !== data["newRelativeX"]) {
          i = data["getNewPosition"]();
          data["goTo"](i, false, "drag");
          if (locals["targetElement"] === e["target"] && true !== data["browser"]["isTouch"]) {
            $(e["target"])["on"]("click.disable", function(e) {
              e["stopImmediatePropagation"]();
              e["stopPropagation"]();
              e["preventDefault"]();
              $(e["target"])["off"]("click.disable");
            });
            e = $._data(e["target"], "events")["click"];
            i = e["pop"]();
            e["splice"](0, 0, i);
          }
        }
        swapEvents("off");
      }
      var data = this;
      var locals = {
        offsetX : 0,
        offsetY : 0,
        baseElWidth : 0,
        relativePos : 0,
        position : null,
        minSwipe : null,
        maxSwipe : null,
        sliding : null,
        dargging : null,
        targetElement : null
      };
      /** @type {boolean} */
      data["isCssFinish"] = true;
      data["$elem"]["on"](data["ev_types"]["start"], ".owl-wrapper", function(event) {
        event = event["originalEvent"] || event || window["event"];
        var offset;
        if (3 === event["which"]) {
          return false;
        }
        if (!(data["itemsAmount"] <= data["options"]["items"])) {
          if (false === data["isCssFinish"] && !data["options"]["dragBeforeAnimFinish"] || false === data["isCss3Finish"] && !data["options"]["dragBeforeAnimFinish"]) {
            return false;
          }
          if (false !== data["options"]["autoPlay"]) {
            window["clearInterval"](data["autoPlayInterval"]);
          }
          if (!(true === data["browser"]["isTouch"] || data["$owlWrapper"]["hasClass"]("grabbing"))) {
            data["$owlWrapper"]["addClass"]("grabbing");
          }
          /** @type {number} */
          data["newPosX"] = 0;
          /** @type {number} */
          data["newRelativeX"] = 0;
          $(this)["css"](data["removeTransition"]());
          offset = $(this)["position"]();
          locals["relativePos"] = offset["left"];
          /** @type {number} */
          locals["offsetX"] = drag(event)["x"] - offset["left"];
          /** @type {number} */
          locals["offsetY"] = drag(event)["y"] - offset["top"];
          swapEvents("on");
          /** @type {boolean} */
          locals["sliding"] = false;
          locals["targetElement"] = event["target"] || event["srcElement"];
        }
      });
    },
    getNewPosition : function() {
      var newPosition = this["closestItem"]();
      if (newPosition > this["maximumItem"]) {
        newPosition = this["currentItem"] = this["maximumItem"];
      } else {
        if (0 <= this["newPosX"]) {
          /** @type {number} */
          this["currentItem"] = newPosition = 0;
        }
      }
      return newPosition;
    },
    closestItem : function() {
      var obj = this;
      var data = true === obj["options"]["scrollPerPage"] ? obj["pagesInArray"] : obj["positionsInArray"];
      var limitl = obj["newPosX"];
      /** @type {null} */
      var value = null;
      $["each"](data, function(i, angle) {
        if (limitl - obj["itemWidth"] / 20 > data[i + 1] && limitl - obj["itemWidth"] / 20 < angle && "left" === obj["moveDirection"]()) {
          /** @type {number} */
          value = angle;
          obj["currentItem"] = true === obj["options"]["scrollPerPage"] ? $["inArray"](value, obj["positionsInArray"]) : i;
        } else {
          if (limitl + obj["itemWidth"] / 20 < angle && limitl + obj["itemWidth"] / 20 > (data[i + 1] || data[i] - obj["itemWidth"]) && "right" === obj["moveDirection"]()) {
            if (true === obj["options"]["scrollPerPage"]) {
              value = data[i + 1] || data[data["length"] - 1];
              obj["currentItem"] = $["inArray"](value, obj["positionsInArray"]);
            } else {
              value = data[i + 1];
              obj["currentItem"] = i + 1;
            }
          }
        }
      });
      return obj["currentItem"];
    },
    moveDirection : function() {
      var direction;
      if (0 > this["newRelativeX"]) {
        /** @type {string} */
        direction = "right";
        /** @type {string} */
        this["playDirection"] = "next";
      } else {
        /** @type {string} */
        direction = "left";
        /** @type {string} */
        this["playDirection"] = "prev";
      }
      return direction;
    },
    customEvents : function() {
      var options = this;
      options["$elem"]["on"]("owl.next", function() {
        options["next"]();
      });
      options["$elem"]["on"]("owl.prev", function() {
        options["prev"]();
      });
      options["$elem"]["on"]("owl.play", function(isSlidingUp, canCreateDiscussions) {
        options["options"]["autoPlay"] = canCreateDiscussions;
        options["play"]();
        /** @type {string} */
        options["hoverStatus"] = "play";
      });
      options["$elem"]["on"]("owl.stop", function() {
        options["stop"]();
        /** @type {string} */
        options["hoverStatus"] = "stop";
      });
      options["$elem"]["on"]("owl.goTo", function(canCreateDiscussions, addedNodesArray) {
        options["goTo"](addedNodesArray);
      });
      options["$elem"]["on"]("owl.jumpTo", function(canCreateDiscussions, addedNodesArray) {
        options["jumpTo"](addedNodesArray);
      });
    },
    stopOnHover : function() {
      var data = this;
      if (true === data["options"]["stopOnHover"] && true !== data["browser"]["isTouch"] && false !== data["options"]["autoPlay"]) {
        data["$elem"]["on"]("mouseover", function() {
          data["stop"]();
        });
        data["$elem"]["on"]("mouseout", function() {
          if ("stop" !== data["hoverStatus"]) {
            data["play"]();
          }
        });
      }
    },
    lazyLoad : function() {
      var _counter;
      var p;
      var depth;
      var proto;
      var objectPointer;
      if (false === this["options"]["lazyLoad"]) {
        return false;
      }
      /** @type {number} */
      _counter = 0;
      for (; _counter < this["itemsAmount"]; _counter = _counter + 1) {
        p = $(this["$owlItems"][_counter]);
        if ("loaded" !== p["data"]("owl-loaded")) {
          depth = p["data"]("owl-item");
          proto = p["find"](".lazyOwl");
          if ("string" !== typeof proto["data"]("src")) {
            p["data"]("owl-loaded", "loaded");
          } else {
            if (void 0 === p["data"]("owl-loaded")) {
              proto["hide"]();
              p["addClass"]("loading")["data"]("owl-loaded", "checked");
            }
            if ((objectPointer = true === this["options"]["lazyFollow"] ? depth >= this["currentItem"] : true) && depth < this["currentItem"] + this["options"]["items"] && proto["length"]) {
              this["lazyPreload"](p, proto);
            }
          }
        }
      }
    },
    lazyPreload : function(chart, p) {
      /**
       * @return {undefined}
       */
      function init() {
        chart["data"]("owl-loaded", "loaded")["removeClass"]("loading");
        p["removeAttr"]("data-src");
        if ("fade" === someSubscriptionOptions["options"]["lazyEffect"]) {
          p["fadeIn"](400);
        } else {
          p["show"]();
        }
        if ("function" === typeof someSubscriptionOptions["options"]["afterLazyLoad"]) {
          someSubscriptionOptions["options"]["afterLazyLoad"]["apply"](this, [someSubscriptionOptions["$elem"]]);
        }
      }
      /**
       * @return {undefined}
       */
      function handler() {
        variable_0 = variable_0 + 1;
        if (someSubscriptionOptions["completeImg"](p["get"](0)) || true === variable_2) {
          init();
        } else {
          if (100 >= variable_0) {
            window["setTimeout"](handler, 100);
          } else {
            init();
          }
        }
      }
      var someSubscriptionOptions = this;
      /** @type {number} */
      var variable_0 = 0;
      var variable_2;
      if ("DIV" === p["prop"]("tagName")) {
        p["css"]("background-image", "url(" + p["data"]("src") + ")");
        /** @type {boolean} */
        variable_2 = true;
      } else {
        p[0]["src"] = p["data"]("src");
      }
      handler();
    },
    autoHeight : function() {
      /**
       * @return {undefined}
       */
      function addHeight() {
        var bodyContentWidth = $(obj["$owlItems"][obj["currentItem"]])["height"]();
        obj["wrapperOuter"]["css"]("height", bodyContentWidth + "px");
        if (!obj["wrapperOuter"]["hasClass"]("autoHeight")) {
          window["setTimeout"](function() {
            obj["wrapperOuter"]["addClass"]("autoHeight");
          }, 0);
        }
      }
      /**
       * @return {undefined}
       */
      function checkImage() {
        variable_6 = variable_6 + 1;
        if (obj["completeImg"](i["get"](0))) {
          addHeight();
        } else {
          if (100 >= variable_6) {
            window["setTimeout"](checkImage, 100);
          } else {
            obj["wrapperOuter"]["css"]("height", "");
          }
        }
      }
      var obj = this;
      var i = $(obj["$owlItems"][obj["currentItem"]])["find"]("img");
      var variable_6;
      if (void 0 !== i["get"](0)) {
        /** @type {number} */
        variable_6 = 0;
        checkImage();
      } else {
        addHeight();
      }
    },
    completeImg : function(img) {
      return !img["complete"] || "undefined" !== typeof img["naturalWidth"] && 0 === img["naturalWidth"] ? false : true;
    },
    onVisibleItems : function() {
      var value;
      if (true === this["options"]["addClassActive"]) {
        this["$owlItems"]["removeClass"]("active");
      }
      /** @type {!Array} */
      this["visibleItems"] = [];
      value = this["currentItem"];
      for (; value < this["currentItem"] + this["options"]["items"]; value = value + 1) {
        this["visibleItems"]["push"](value);
        if (true === this["options"]["addClassActive"]) {
          $(this["$owlItems"][value])["addClass"]("active");
        }
      }
      this["owl"]["visibleItems"] = this["visibleItems"];
    },
    transitionTypes : function(className) {
      /** @type {string} */
      this["outClass"] = "owl-" + className + "-out";
      /** @type {string} */
      this["inClass"] = "owl-" + className + "-in";
    },
    singleItemTransition : function() {
      var obj = this;
      var args = obj["outClass"];
      var key = obj["inClass"];
      var p = obj["$owlItems"]["eq"](obj["currentItem"]);
      var $item = obj["$owlItems"]["eq"](obj["prevItem"]);
      var ffleft = Math["abs"](obj["positionsInArray"][obj["currentItem"]]) + obj["positionsInArray"][obj["prevItem"]];
      var origin = Math["abs"](obj["positionsInArray"][obj["currentItem"]]) + obj["itemWidth"] / 2;
      /** @type {boolean} */
      obj["isTransition"] = true;
      obj["$owlWrapper"]["addClass"]("owl-origin")["css"]({
        "-webkit-transform-origin" : origin + "px",
        "-moz-perspective-origin" : origin + "px",
        "perspective-origin" : origin + "px"
      });
      $item["css"]({
        position : "relative",
        left : ffleft + "px"
      })["addClass"](args)["on"]("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function() {
        /** @type {boolean} */
        obj["endPrev"] = true;
        $item["off"]("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");
        obj["clearTransStyle"]($item, args);
      });
      p["addClass"](key)["on"]("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function() {
        /** @type {boolean} */
        obj["endCurrent"] = true;
        p["off"]("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");
        obj["clearTransStyle"](p, key);
      });
    },
    clearTransStyle : function($item, args) {
      $item["css"]({
        position : "",
        left : ""
      })["removeClass"](args);
      if (this["endPrev"] && this["endCurrent"]) {
        this["$owlWrapper"]["removeClass"]("owl-origin");
        /** @type {boolean} */
        this["isTransition"] = this["endCurrent"] = this["endPrev"] = false;
      }
    },
    owlStatus : function() {
      this["owl"] = {
        userOptions : this["userOptions"],
        baseElement : this["$elem"],
        userItems : this["$userItems"],
        owlItems : this["$owlItems"],
        currentItem : this["currentItem"],
        prevItem : this["prevItem"],
        visibleItems : this["visibleItems"],
        isTouch : this["browser"]["isTouch"],
        browser : this["browser"],
        dragDirection : this["dragDirection"]
      };
    },
    clearEvents : function() {
      this["$elem"]["off"](".owl owl mousedown.disableTextSelect");
      $(document)["off"](".owl owl");
      $(window)["off"]("resize", this["resizer"]);
    },
    unWrap : function() {
      if (0 !== this["$elem"]["children"]()["length"]) {
        this["$owlWrapper"]["unwrap"]();
        this["$userItems"]["unwrap"]()["unwrap"]();
        if (this["owlControls"]) {
          this["owlControls"]["remove"]();
        }
      }
      this["clearEvents"]();
      this["$elem"]["attr"]("style", this["$elem"]["data"]("owl-originalStyles") || "")["attr"]("class", this["$elem"]["data"]("owl-originalClasses"));
    },
    destroy : function() {
      this["stop"]();
      window["clearInterval"](this["checkVisible"]);
      this["unWrap"]();
      this["$elem"]["removeData"]();
    },
    reinit : function(data) {
      data = $["extend"]({}, this["userOptions"], data);
      this["unWrap"]();
      this["init"](data, this.$elem);
    },
    addItem : function(el, component) {
      var NEG_ONE;
      if (!el) {
        return false;
      }
      if (0 === this["$elem"]["children"]()["length"]) {
        return this["$elem"]["append"](el), this["setVars"](), false;
      }
      this["unWrap"]();
      NEG_ONE = void 0 === component || -1 === component ? -1 : component;
      if (NEG_ONE >= this["$userItems"]["length"] || -1 === NEG_ONE) {
        this["$userItems"]["eq"](-1)["after"](el);
      } else {
        this["$userItems"]["eq"](NEG_ONE)["before"](el);
      }
      this["setVars"]();
    },
    removeItem : function(url) {
      if (0 === this["$elem"]["children"]()["length"]) {
        return false;
      }
      url = void 0 === url || -1 === url ? -1 : url;
      this["unWrap"]();
      this["$userItems"]["eq"](url)["remove"]();
      this["setVars"]();
    }
  };
  /**
   * @param {?} elem
   * @return {?}
   */
  $["fn"]["owlCarousel"] = function(elem) {
    return this["each"](function() {
      if (true === $(this)["data"]("owl-init")) {
        return false;
      }
      $(this)["data"]("owl-init", true);
      var obj = Object["create"](Carousel);
      obj["init"](elem, this);
      $["data"](this, "owlCarousel", obj);
    });
  };
  $["fn"]["owlCarousel"]["options"] = {
    items : 5,
    itemsCustom : false,
    itemsDesktop : [1199, 4],
    itemsDesktopSmall : [979, 3],
    itemsTablet : [768, 2],
    itemsTabletSmall : false,
    itemsMobile : [479, 1],
    singleItem : false,
    itemsScaleUp : false,
    slideSpeed : 200,
    paginationSpeed : 800,
    rewindSpeed : 1E3,
    autoPlay : true,
    stopOnHover : true,
    navigation : false,
    navigationText : ["prev", "next"],
    rewindNav : true,
    scrollPerPage : false,
    pagination : true,
    paginationNumbers : false,
    responsive : true,
    responsiveRefreshRate : 200,
    responsiveBaseWidth : window,
    baseClass : "owl-carousel",
    theme : "owl-theme",
    lazyLoad : false,
    lazyFollow : true,
    lazyEffect : "fade",
    autoHeight : false,
    jsonPath : false,
    jsonSuccess : false,
    dragBeforeAnimFinish : true,
    mouseDrag : true,
    touchDrag : true,
    addClassActive : false,
    transitionStyle : false,
    beforeUpdate : false,
    afterUpdate : false,
    beforeInit : false,
    afterInit : false,
    beforeMove : false,
    afterMove : false,
    afterAction : false,
    startDragging : false,
    afterLazyLoad : false
  };
})(jQuery, window, document);
}
;
