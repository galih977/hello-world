if ("function" !== typeof Object.create) {
  Object.create = function(variable_0$jscomp$0) {
    function variable_1$jscomp$0() {
    }
    variable_1$jscomp$0.prototype = variable_0$jscomp$0;
    return new variable_1$jscomp$0;
  };
}
(function(variable_0$jscomp$1, variable_1$jscomp$1, variable_2$jscomp$0) {
  var variable_3$jscomp$0 = {
    init : function(variable_4$jscomp$0, variable_5$jscomp$0) {
      this["$elem"] = variable_0$jscomp$1(variable_5$jscomp$0);
      this["options"] = variable_0$jscomp$1.extend({}, variable_0$jscomp$1.fn.owlCarousel.options, this["$elem"].data(), variable_4$jscomp$0);
      this["userOptions"] = variable_4$jscomp$0;
      this["loadContent"]();
    },
    loadContent : function() {
      function variable_4$jscomp$1(variable_4$jscomp$2) {
        var variable_6$jscomp$0;
        var variable_7$jscomp$1 = "";
        if ("function" === typeof variable_5$jscomp$1.options.jsonSuccess) {
          variable_5$jscomp$1.options.jsonSuccess.apply(this, [variable_4$jscomp$2]);
        } else {
          for (variable_6$jscomp$0 in variable_4$jscomp$2.owl) {
            if (variable_4$jscomp$2.owl.hasOwnProperty(variable_6$jscomp$0)) {
              variable_7$jscomp$1 = variable_7$jscomp$1 + variable_4$jscomp$2.owl[variable_6$jscomp$0].item;
            }
          }
          variable_5$jscomp$1["$elem"].html(variable_7$jscomp$1);
        }
        variable_5$jscomp$1.logIn();
      }
      var variable_5$jscomp$1 = this;
      var variable_7$jscomp$0;
      if ("function" === typeof variable_5$jscomp$1.options.beforeInit) {
        variable_5$jscomp$1.options.beforeInit.apply(this, [variable_5$jscomp$1["$elem"]]);
      }
      if ("string" === typeof variable_5$jscomp$1.options.jsonPath) {
        variable_7$jscomp$0 = variable_5$jscomp$1.options.jsonPath;
        variable_0$jscomp$1.getJSON(variable_7$jscomp$0, variable_4$jscomp$1);
      } else {
        variable_5$jscomp$1.logIn();
      }
    },
    logIn : function() {
      this["$elem"].data("owl-originalStyles", this["$elem"].attr("style"));
      this["$elem"].data("owl-originalClasses", this["$elem"].attr("class"));
      this["$elem"].css({
        opacity : 0
      });
      this["orignalItems"] = this["options"].items;
      this["checkBrowser"]();
      this["wrapperWidth"] = 0;
      this["checkVisible"] = null;
      this["setVars"]();
    },
    setVars : function() {
      if (0 === this["$elem"].children()["length"]) {
        return false;
      }
      this["baseClass"]();
      this["eventTypes"]();
      this["$userItems"] = this["$elem"].children();
      this["itemsAmount"] = this["$userItems"].length;
      this["wrapItems"]();
      this["$owlItems"] = this["$elem"].find(".owl-item");
      this["$owlWrapper"] = this["$elem"].find(".owl-wrapper");
      this["playDirection"] = "next";
      this["prevItem"] = 0;
      this["prevArr"] = [0];
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
      if (false !== this["options"].transitionStyle) {
        this["transitionTypes"](this["options"].transitionStyle);
      }
      if (true === this["options"].autoPlay) {
        this["options"].autoPlay = 5E3;
      }
      this["play"]();
      this["$elem"].find(".owl-wrapper")["css"]("display", "block");
      if (this["$elem"].is(":visible")) {
        this["$elem"].css("opacity", 1);
      } else {
        this["watchVisibility"]();
      }
      this["onstartup"] = false;
      this["eachMoveUpdate"]();
      if ("function" === typeof this["options"].afterInit) {
        this["options"].afterInit.apply(this, [this["$elem"]]);
      }
    },
    eachMoveUpdate : function() {
      if (true === this["options"].lazyLoad) {
        this["lazyLoad"]();
      }
      if (true === this["options"].autoHeight) {
        this["autoHeight"]();
      }
      this["onVisibleItems"]();
      if ("function" === typeof this["options"].afterAction) {
        this["options"].afterAction.apply(this, [this["$elem"]]);
      }
    },
    updateVars : function() {
      if ("function" === typeof this["options"].beforeUpdate) {
        this["options"].beforeUpdate.apply(this, [this["$elem"]]);
      }
      this["watchVisibility"]();
      this["updateItems"]();
      this["calculateAll"]();
      this["updatePosition"]();
      this["updateControls"]();
      this["eachMoveUpdate"]();
      if ("function" === typeof this["options"].afterUpdate) {
        this["options"].afterUpdate.apply(this, [this["$elem"]]);
      }
    },
    reload : function() {
      var variable_4$jscomp$3 = this;
      variable_1$jscomp$1.setTimeout(function() {
        variable_4$jscomp$3.updateVars();
      }, 0);
    },
    watchVisibility : function() {
      var variable_4$jscomp$4 = this;
      if (false === variable_4$jscomp$4["$elem"].is(":visible")) {
        variable_4$jscomp$4["$elem"].css({
          opacity : 0
        });
        variable_1$jscomp$1.clearInterval(variable_4$jscomp$4.autoPlayInterval);
        variable_1$jscomp$1.clearInterval(variable_4$jscomp$4.checkVisible);
      } else {
        return false;
      }
      variable_4$jscomp$4.checkVisible = variable_1$jscomp$1.setInterval(function() {
        if (variable_4$jscomp$4["$elem"].is(":visible")) {
          variable_4$jscomp$4.reload();
          variable_4$jscomp$4["$elem"].animate({
            opacity : 1
          }, 200);
          variable_1$jscomp$1.clearInterval(variable_4$jscomp$4.checkVisible);
        }
      }, 500);
    },
    wrapItems : function() {
      this["$userItems"].wrapAll('<div class="owl-wrapper">')["wrap"]('<div class="owl-item"></div>');
      this["$elem"].find(".owl-wrapper")["wrap"]('<div class="owl-wrapper-outer">');
      this["wrapperOuter"] = this["$elem"].find(".owl-wrapper-outer");
      this["$elem"].css("display", "block");
    },
    baseClass : function() {
      var variable_4$jscomp$5 = this["$elem"].hasClass(this["options"].baseClass);
      var variable_5$jscomp$2 = this["$elem"].hasClass(this["options"].theme);
      if (!variable_4$jscomp$5) {
        this["$elem"].addClass(this["options"].baseClass);
      }
      if (!variable_5$jscomp$2) {
        this["$elem"].addClass(this["options"].theme);
      }
    },
    updateItems : function() {
      var variable_4$jscomp$6;
      var variable_5$jscomp$3;
      if (false === this["options"].responsive) {
        return false;
      }
      if (true === this["options"].singleItem) {
        return this["options"].items = this["orignalItems"] = 1, this["options"].itemsCustom = false, this["options"].itemsDesktop = false, this["options"].itemsDesktopSmall = false, this["options"].itemsTablet = false, this["options"].itemsTabletSmall = false, this["options"].itemsMobile = false;
      }
      variable_4$jscomp$6 = variable_0$jscomp$1(this["options"].responsiveBaseWidth)["width"]();
      if (variable_4$jscomp$6 > (this["options"].itemsDesktop[0] || this["orignalItems"])) {
        this["options"].items = this["orignalItems"];
      }
      if (false !== this["options"].itemsCustom) {
        this["options"].itemsCustom.sort(function(variable_4$jscomp$7, variable_5$jscomp$4) {
          return variable_4$jscomp$7[0] - variable_5$jscomp$4[0];
        });
        variable_5$jscomp$3 = 0;
        for (; variable_5$jscomp$3 < this["options"].itemsCustom.length; variable_5$jscomp$3 = variable_5$jscomp$3 + 1) {
          if (this["options"].itemsCustom[variable_5$jscomp$3][0] <= variable_4$jscomp$6) {
            this["options"].items = this["options"].itemsCustom[variable_5$jscomp$3][1];
          }
        }
      } else {
        if (variable_4$jscomp$6 <= this["options"].itemsDesktop[0] && false !== this["options"].itemsDesktop) {
          this["options"].items = this["options"].itemsDesktop[1];
        }
        if (variable_4$jscomp$6 <= this["options"].itemsDesktopSmall[0] && false !== this["options"].itemsDesktopSmall) {
          this["options"].items = this["options"].itemsDesktopSmall[1];
        }
        if (variable_4$jscomp$6 <= this["options"].itemsTablet[0] && false !== this["options"].itemsTablet) {
          this["options"].items = this["options"].itemsTablet[1];
        }
        if (variable_4$jscomp$6 <= this["options"].itemsTabletSmall[0] && false !== this["options"].itemsTabletSmall) {
          this["options"].items = this["options"].itemsTabletSmall[1];
        }
        if (variable_4$jscomp$6 <= this["options"].itemsMobile[0] && false !== this["options"].itemsMobile) {
          this["options"].items = this["options"].itemsMobile[1];
        }
      }
      if (this["options"].items > this["itemsAmount"] && true === this["options"].itemsScaleUp) {
        this["options"].items = this["itemsAmount"];
      }
    },
    response : function() {
      var variable_4$jscomp$8 = this;
      var variable_5$jscomp$5;
      var variable_7$jscomp$2;
      if (true !== variable_4$jscomp$8.options.responsive) {
        return false;
      }
      variable_7$jscomp$2 = variable_0$jscomp$1(variable_1$jscomp$1)["width"]();
      variable_4$jscomp$8.resizer = function() {
        if (variable_0$jscomp$1(variable_1$jscomp$1)["width"]() !== variable_7$jscomp$2) {
          if (false !== variable_4$jscomp$8.options.autoPlay) {
            variable_1$jscomp$1.clearInterval(variable_4$jscomp$8.autoPlayInterval);
          }
          variable_1$jscomp$1.clearTimeout(variable_5$jscomp$5);
          variable_5$jscomp$5 = variable_1$jscomp$1.setTimeout(function() {
            variable_7$jscomp$2 = variable_0$jscomp$1(variable_1$jscomp$1)["width"]();
            variable_4$jscomp$8.updateVars();
          }, variable_4$jscomp$8.options.responsiveRefreshRate);
        }
      };
      variable_0$jscomp$1(variable_1$jscomp$1)["resize"](variable_4$jscomp$8.resizer);
    },
    updatePosition : function() {
      this["jumpTo"](this["currentItem"]);
      if (false !== this["options"].autoPlay) {
        this["checkAp"]();
      }
    },
    appendItemsSizes : function() {
      var variable_4$jscomp$9 = this;
      var variable_5$jscomp$6 = 0;
      var variable_7$jscomp$3 = variable_4$jscomp$9.itemsAmount - variable_4$jscomp$9.options.items;
      variable_4$jscomp$9["$owlItems"].each(function(variable_8$jscomp$0) {
        var variable_6$jscomp$1 = variable_0$jscomp$1(this);
        variable_6$jscomp$1.css({
          width : variable_4$jscomp$9.itemWidth
        })["data"]("owl-item", Number(variable_8$jscomp$0));
        if (0 === variable_8$jscomp$0 % variable_4$jscomp$9.options.items || variable_8$jscomp$0 === variable_7$jscomp$3) {
          if (!(variable_8$jscomp$0 > variable_7$jscomp$3)) {
            variable_5$jscomp$6 = variable_5$jscomp$6 + 1;
          }
        }
        variable_6$jscomp$1.data("owl-roundPages", variable_5$jscomp$6);
      });
    },
    appendWrapperSizes : function() {
      this["$owlWrapper"].css({
        width : this["$owlItems"].length * this["itemWidth"] * 2,
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
      this["itemWidth"] = Math.round(this["$elem"].width() / this["options"].items);
    },
    max : function() {
      var variable_4$jscomp$10 = -1 * (this["itemsAmount"] * this["itemWidth"] - this["options"].items * this["itemWidth"]);
      if (this["options"].items > this["itemsAmount"]) {
        this["maximumPixels"] = variable_4$jscomp$10 = this["maximumItem"] = 0;
      } else {
        this["maximumItem"] = this["itemsAmount"] - this["options"].items;
        this["maximumPixels"] = variable_4$jscomp$10;
      }
      return variable_4$jscomp$10;
    },
    min : function() {
      return 0;
    },
    loops : function() {
      var variable_4$jscomp$11 = 0;
      var variable_5$jscomp$7 = 0;
      var variable_7$jscomp$4;
      var variable_8$jscomp$1;
      this["positionsInArray"] = [0];
      this["pagesInArray"] = [];
      variable_7$jscomp$4 = 0;
      for (; variable_7$jscomp$4 < this["itemsAmount"]; variable_7$jscomp$4 = variable_7$jscomp$4 + 1) {
        variable_5$jscomp$7 = variable_5$jscomp$7 + this["itemWidth"];
        this["positionsInArray"].push(-variable_5$jscomp$7);
        if (true === this["options"].scrollPerPage) {
          variable_8$jscomp$1 = variable_0$jscomp$1(this["$owlItems"][variable_7$jscomp$4]);
          variable_8$jscomp$1 = variable_8$jscomp$1.data("owl-roundPages");
          if (variable_8$jscomp$1 !== variable_4$jscomp$11) {
            this["pagesInArray"][variable_4$jscomp$11] = this["positionsInArray"][variable_7$jscomp$4];
            variable_4$jscomp$11 = variable_8$jscomp$1;
          }
        }
      }
    },
    buildControls : function() {
      if (true === this["options"].navigation || true === this["options"].pagination) {
        this["owlControls"] = variable_0$jscomp$1('<div class="owl-controls"/>')["toggleClass"]("clickable", !this["browser"].isTouch)["appendTo"](this.$elem);
      }
      if (true === this["options"].pagination) {
        this["buildPagination"]();
      }
      if (true === this["options"].navigation) {
        this["buildButtons"]();
      }
    },
    buildButtons : function() {
      var variable_4$jscomp$12 = this;
      var variable_5$jscomp$8 = variable_0$jscomp$1('<div class="owl-buttons"/>');
      variable_4$jscomp$12.owlControls.append(variable_5$jscomp$8);
      variable_4$jscomp$12.buttonPrev = variable_0$jscomp$1("<div/>", {
        "class" : "owl-prev",
        html : variable_4$jscomp$12.options.navigationText[0] || ""
      });
      variable_4$jscomp$12.buttonNext = variable_0$jscomp$1("<div/>", {
        "class" : "owl-next",
        html : variable_4$jscomp$12.options.navigationText[1] || ""
      });
      variable_5$jscomp$8.append(variable_4$jscomp$12.buttonPrev)["append"](variable_4$jscomp$12.buttonNext);
      variable_5$jscomp$8.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function(variable_4$jscomp$13) {
        variable_4$jscomp$13.preventDefault();
      });
      variable_5$jscomp$8.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function(variable_5$jscomp$9) {
        variable_5$jscomp$9.preventDefault();
        if (variable_0$jscomp$1(this)["hasClass"]("owl-next")) {
          variable_4$jscomp$12.next();
        } else {
          variable_4$jscomp$12.prev();
        }
      });
    },
    buildPagination : function() {
      var variable_4$jscomp$14 = this;
      variable_4$jscomp$14.paginationWrapper = variable_0$jscomp$1('<div class="owl-pagination"/>');
      variable_4$jscomp$14.owlControls.append(variable_4$jscomp$14.paginationWrapper);
      variable_4$jscomp$14.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function(variable_5$jscomp$10) {
        variable_5$jscomp$10.preventDefault();
        if (Number(variable_0$jscomp$1(this)["data"]("owl-page")) !== variable_4$jscomp$14.currentItem) {
          variable_4$jscomp$14.goTo(Number(variable_0$jscomp$1(this)["data"]("owl-page")), true);
        }
      });
    },
    updatePagination : function() {
      var variable_4$jscomp$15;
      var variable_5$jscomp$11;
      var variable_7$jscomp$5;
      var variable_8$jscomp$2;
      var variable_6$jscomp$2;
      var variable_1$jscomp$2;
      if (false === this["options"].pagination) {
        return false;
      }
      this["paginationWrapper"].html("");
      variable_4$jscomp$15 = 0;
      variable_5$jscomp$11 = this["itemsAmount"] - this["itemsAmount"] % this["options"].items;
      variable_8$jscomp$2 = 0;
      for (; variable_8$jscomp$2 < this["itemsAmount"]; variable_8$jscomp$2 = variable_8$jscomp$2 + 1) {
        if (0 === variable_8$jscomp$2 % this["options"].items) {
          variable_4$jscomp$15 = variable_4$jscomp$15 + 1;
          if (variable_5$jscomp$11 === variable_8$jscomp$2) {
            variable_7$jscomp$5 = this["itemsAmount"] - this["options"].items;
          }
          variable_6$jscomp$2 = variable_0$jscomp$1("<div/>", {
            "class" : "owl-page"
          });
          variable_1$jscomp$2 = variable_0$jscomp$1("<span></span>", {
            text : true === this["options"].paginationNumbers ? variable_4$jscomp$15 : "",
            "class" : true === this["options"].paginationNumbers ? "owl-numbers" : ""
          });
          variable_6$jscomp$2.append(variable_1$jscomp$2);
          variable_6$jscomp$2.data("owl-page", variable_5$jscomp$11 === variable_8$jscomp$2 ? variable_7$jscomp$5 : variable_8$jscomp$2);
          variable_6$jscomp$2.data("owl-roundPages", variable_4$jscomp$15);
          this["paginationWrapper"].append(variable_6$jscomp$2);
        }
      }
      this["checkPagination"]();
    },
    checkPagination : function() {
      var variable_4$jscomp$16 = this;
      if (false === variable_4$jscomp$16.options.pagination) {
        return false;
      }
      variable_4$jscomp$16.paginationWrapper.find(".owl-page")["each"](function() {
        if (variable_0$jscomp$1(this)["data"]("owl-roundPages") === variable_0$jscomp$1(variable_4$jscomp$16["$owlItems"][variable_4$jscomp$16.currentItem])["data"]("owl-roundPages")) {
          variable_4$jscomp$16.paginationWrapper.find(".owl-page")["removeClass"]("active");
          variable_0$jscomp$1(this)["addClass"]("active");
        }
      });
    },
    checkNavigation : function() {
      if (false === this["options"].navigation) {
        return false;
      }
      if (false === this["options"].rewindNav) {
        if (0 === this["currentItem"] && 0 === this["maximumItem"]) {
          this["buttonPrev"].addClass("disabled");
          this["buttonNext"].addClass("disabled");
        } else {
          if (0 === this["currentItem"] && 0 !== this["maximumItem"]) {
            this["buttonPrev"].addClass("disabled");
            this["buttonNext"].removeClass("disabled");
          } else {
            if (this["currentItem"] === this["maximumItem"]) {
              this["buttonPrev"].removeClass("disabled");
              this["buttonNext"].addClass("disabled");
            } else {
              if (0 !== this["currentItem"] && this["currentItem"] !== this["maximumItem"]) {
                this["buttonPrev"].removeClass("disabled");
                this["buttonNext"].removeClass("disabled");
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
        if (this["options"].items >= this["itemsAmount"]) {
          this["owlControls"].hide();
        } else {
          this["owlControls"].show();
        }
      }
    },
    destroyControls : function() {
      if (this["owlControls"]) {
        this["owlControls"].remove();
      }
    },
    next : function(variable_4$jscomp$17) {
      if (this["isTransition"]) {
        return false;
      }
      this["currentItem"] += true === this["options"].scrollPerPage ? this["options"].items : 1;
      if (this["currentItem"] > this["maximumItem"] + (true === this["options"].scrollPerPage ? this["options"].items - 1 : 0)) {
        if (true === this["options"].rewindNav) {
          this["currentItem"] = 0;
          variable_4$jscomp$17 = "rewind";
        } else {
          return this["currentItem"] = this["maximumItem"], false;
        }
      }
      this["goTo"](this["currentItem"], variable_4$jscomp$17);
    },
    prev : function(variable_4$jscomp$18) {
      if (this["isTransition"]) {
        return false;
      }
      this["currentItem"] = true === this["options"].scrollPerPage && 0 < this["currentItem"] && this["currentItem"] < this["options"].items ? 0 : this["currentItem"] - (true === this["options"].scrollPerPage ? this["options"].items : 1);
      if (0 > this["currentItem"]) {
        if (true === this["options"].rewindNav) {
          this["currentItem"] = this["maximumItem"];
          variable_4$jscomp$18 = "rewind";
        } else {
          return this["currentItem"] = 0, false;
        }
      }
      this["goTo"](this["currentItem"], variable_4$jscomp$18);
    },
    goTo : function(variable_4$jscomp$19, variable_5$jscomp$12, variable_7$jscomp$6) {
      var variable_8$jscomp$3 = this;
      if (variable_8$jscomp$3.isTransition) {
        return false;
      }
      if ("function" === typeof variable_8$jscomp$3.options.beforeMove) {
        variable_8$jscomp$3.options.beforeMove.apply(this, [variable_8$jscomp$3["$elem"]]);
      }
      if (variable_4$jscomp$19 >= variable_8$jscomp$3.maximumItem) {
        variable_4$jscomp$19 = variable_8$jscomp$3.maximumItem;
      } else {
        if (0 >= variable_4$jscomp$19) {
          variable_4$jscomp$19 = 0;
        }
      }
      variable_8$jscomp$3.currentItem = variable_8$jscomp$3.owl.currentItem = variable_4$jscomp$19;
      if (false !== variable_8$jscomp$3.options.transitionStyle && "drag" !== variable_7$jscomp$6 && 1 === variable_8$jscomp$3.options.items && true === variable_8$jscomp$3.browser.support3d) {
        return variable_8$jscomp$3.swapSpeed(0), true === variable_8$jscomp$3.browser.support3d ? variable_8$jscomp$3.transition3d(variable_8$jscomp$3.positionsInArray[variable_4$jscomp$19]) : variable_8$jscomp$3.css2slide(variable_8$jscomp$3.positionsInArray[variable_4$jscomp$19], 1), variable_8$jscomp$3.afterGo(), variable_8$jscomp$3.singleItemTransition(), false;
      }
      variable_4$jscomp$19 = variable_8$jscomp$3.positionsInArray[variable_4$jscomp$19];
      if (true === variable_8$jscomp$3.browser.support3d) {
        variable_8$jscomp$3.isCss3Finish = false;
        if (true === variable_5$jscomp$12) {
          variable_8$jscomp$3.swapSpeed("paginationSpeed");
          variable_1$jscomp$1.setTimeout(function() {
            variable_8$jscomp$3.isCss3Finish = true;
          }, variable_8$jscomp$3.options.paginationSpeed);
        } else {
          if ("rewind" === variable_5$jscomp$12) {
            variable_8$jscomp$3.swapSpeed(variable_8$jscomp$3.options.rewindSpeed);
            variable_1$jscomp$1.setTimeout(function() {
              variable_8$jscomp$3.isCss3Finish = true;
            }, variable_8$jscomp$3.options.rewindSpeed);
          } else {
            variable_8$jscomp$3.swapSpeed("slideSpeed");
            variable_1$jscomp$1.setTimeout(function() {
              variable_8$jscomp$3.isCss3Finish = true;
            }, variable_8$jscomp$3.options.slideSpeed);
          }
        }
        variable_8$jscomp$3.transition3d(variable_4$jscomp$19);
      } else {
        if (true === variable_5$jscomp$12) {
          variable_8$jscomp$3.css2slide(variable_4$jscomp$19, variable_8$jscomp$3.options.paginationSpeed);
        } else {
          if ("rewind" === variable_5$jscomp$12) {
            variable_8$jscomp$3.css2slide(variable_4$jscomp$19, variable_8$jscomp$3.options.rewindSpeed);
          } else {
            variable_8$jscomp$3.css2slide(variable_4$jscomp$19, variable_8$jscomp$3.options.slideSpeed);
          }
        }
      }
      variable_8$jscomp$3.afterGo();
    },
    jumpTo : function(variable_4$jscomp$20) {
      if ("function" === typeof this["options"].beforeMove) {
        this["options"].beforeMove.apply(this, [this["$elem"]]);
      }
      if (variable_4$jscomp$20 >= this["maximumItem"] || -1 === variable_4$jscomp$20) {
        variable_4$jscomp$20 = this["maximumItem"];
      } else {
        if (0 >= variable_4$jscomp$20) {
          variable_4$jscomp$20 = 0;
        }
      }
      this["swapSpeed"](0);
      if (true === this["browser"].support3d) {
        this["transition3d"](this["positionsInArray"][variable_4$jscomp$20]);
      } else {
        this["css2slide"](this["positionsInArray"][variable_4$jscomp$20], 1);
      }
      this["currentItem"] = this["owl"].currentItem = variable_4$jscomp$20;
      this["afterGo"]();
    },
    afterGo : function() {
      this["prevArr"].push(this["currentItem"]);
      this["prevItem"] = this["owl"].prevItem = this["prevArr"][this["prevArr"].length - 2];
      this["prevArr"].shift(0);
      if (this["prevItem"] !== this["currentItem"]) {
        this["checkPagination"]();
        this["checkNavigation"]();
        this["eachMoveUpdate"]();
        if (false !== this["options"].autoPlay) {
          this["checkAp"]();
        }
      }
      if ("function" === typeof this["options"].afterMove && this["prevItem"] !== this["currentItem"]) {
        this["options"].afterMove.apply(this, [this["$elem"]]);
      }
    },
    stop : function() {
      this["apStatus"] = "stop";
      variable_1$jscomp$1.clearInterval(this["autoPlayInterval"]);
    },
    checkAp : function() {
      if ("stop" !== this["apStatus"]) {
        this["play"]();
      }
    },
    play : function() {
      var variable_4$jscomp$21 = this;
      variable_4$jscomp$21.apStatus = "play";
      if (false === variable_4$jscomp$21.options.autoPlay) {
        return false;
      }
      variable_1$jscomp$1.clearInterval(variable_4$jscomp$21.autoPlayInterval);
      variable_4$jscomp$21.autoPlayInterval = variable_1$jscomp$1.setInterval(function() {
        variable_4$jscomp$21.next(true);
      }, variable_4$jscomp$21.options.autoPlay);
    },
    swapSpeed : function(variable_4$jscomp$22) {
      if ("slideSpeed" === variable_4$jscomp$22) {
        this["$owlWrapper"].css(this["addCssSpeed"](this["options"].slideSpeed));
      } else {
        if ("paginationSpeed" === variable_4$jscomp$22) {
          this["$owlWrapper"].css(this["addCssSpeed"](this["options"].paginationSpeed));
        } else {
          if ("string" !== typeof variable_4$jscomp$22) {
            this["$owlWrapper"].css(this["addCssSpeed"](variable_4$jscomp$22));
          }
        }
      }
    },
    addCssSpeed : function(variable_4$jscomp$23) {
      return {
        "-webkit-transition" : "all " + variable_4$jscomp$23 + "ms ease",
        "-moz-transition" : "all " + variable_4$jscomp$23 + "ms ease",
        "-o-transition" : "all " + variable_4$jscomp$23 + "ms ease",
        transition : "all " + variable_4$jscomp$23 + "ms ease"
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
    doTranslate : function(variable_4$jscomp$24) {
      return {
        "-webkit-transform" : "translate3d(" + variable_4$jscomp$24 + "px, 0px, 0px)",
        "-moz-transform" : "translate3d(" + variable_4$jscomp$24 + "px, 0px, 0px)",
        "-o-transform" : "translate3d(" + variable_4$jscomp$24 + "px, 0px, 0px)",
        "-ms-transform" : "translate3d(" + variable_4$jscomp$24 + "px, 0px, 0px)",
        transform : "translate3d(" + variable_4$jscomp$24 + "px, 0px,0px)"
      };
    },
    transition3d : function(variable_4$jscomp$25) {
      this["$owlWrapper"].css(this["doTranslate"](variable_4$jscomp$25));
    },
    css2move : function(variable_4$jscomp$26) {
      this["$owlWrapper"].css({
        left : variable_4$jscomp$26
      });
    },
    css2slide : function(variable_4$jscomp$27, variable_5$jscomp$13) {
      var variable_7$jscomp$7 = this;
      variable_7$jscomp$7.isCssFinish = false;
      variable_7$jscomp$7["$owlWrapper"].stop(true, true)["animate"]({
        left : variable_4$jscomp$27
      }, {
        duration : variable_5$jscomp$13 || variable_7$jscomp$7.options.slideSpeed,
        complete : function() {
          variable_7$jscomp$7.isCssFinish = true;
        }
      });
    },
    checkBrowser : function() {
      var variable_4$jscomp$28 = variable_2$jscomp$0.createElement("div");
      variable_4$jscomp$28.style.cssText = "  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)";
      variable_4$jscomp$28 = variable_4$jscomp$28.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g);
      this["browser"] = {
        support3d : null !== variable_4$jscomp$28 && 1 === variable_4$jscomp$28.length,
        isTouch : "ontouchstart" in variable_1$jscomp$1 || variable_1$jscomp$1.navigator.msMaxTouchPoints
      };
    },
    moveEvents : function() {
      if (false !== this["options"].mouseDrag || false !== this["options"].touchDrag) {
        this["gestures"]();
        this["disabledEvents"]();
      }
    },
    eventTypes : function() {
      var variable_4$jscomp$29 = ["s", "e", "x"];
      this["ev_types"] = {};
      if (true === this["options"].mouseDrag && true === this["options"].touchDrag) {
        variable_4$jscomp$29 = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"];
      } else {
        if (false === this["options"].mouseDrag && true === this["options"].touchDrag) {
          variable_4$jscomp$29 = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"];
        } else {
          if (true === this["options"].mouseDrag && false === this["options"].touchDrag) {
            variable_4$jscomp$29 = ["mousedown.owl", "mousemove.owl", "mouseup.owl"];
          }
        }
      }
      this["ev_types"].start = variable_4$jscomp$29[0];
      this["ev_types"].move = variable_4$jscomp$29[1];
      this["ev_types"].end = variable_4$jscomp$29[2];
    },
    disabledEvents : function() {
      this["$elem"].on("dragstart.owl", function(variable_4$jscomp$30) {
        variable_4$jscomp$30.preventDefault();
      });
      this["$elem"].on("mousedown.disableTextSelect", function(variable_4$jscomp$31) {
        return variable_0$jscomp$1(variable_4$jscomp$31.target)["is"]("input, textarea, select, option");
      });
    },
    gestures : function() {
      function variable_4$jscomp$32(variable_4$jscomp$33) {
        if (void 0 !== variable_4$jscomp$33.touches) {
          return {
            x : variable_4$jscomp$33.touches[0].pageX,
            y : variable_4$jscomp$33.touches[0].pageY
          };
        }
        if (void 0 === variable_4$jscomp$33.touches) {
          if (void 0 !== variable_4$jscomp$33.pageX) {
            return {
              x : variable_4$jscomp$33.pageX,
              y : variable_4$jscomp$33.pageY
            };
          }
          if (void 0 === variable_4$jscomp$33.pageX) {
            return {
              x : variable_4$jscomp$33.clientX,
              y : variable_4$jscomp$33.clientY
            };
          }
        }
      }
      function variable_5$jscomp$14(variable_4$jscomp$34) {
        if ("on" === variable_4$jscomp$34) {
          variable_0$jscomp$1(variable_2$jscomp$0)["on"](variable_6$jscomp$3.ev_types.move, variable_7$jscomp$8);
          variable_0$jscomp$1(variable_2$jscomp$0)["on"](variable_6$jscomp$3.ev_types.end, variable_8$jscomp$4);
        } else {
          if ("off" === variable_4$jscomp$34) {
            variable_0$jscomp$1(variable_2$jscomp$0)["off"](variable_6$jscomp$3.ev_types.move);
            variable_0$jscomp$1(variable_2$jscomp$0)["off"](variable_6$jscomp$3.ev_types.end);
          }
        }
      }
      function variable_7$jscomp$8(variable_5$jscomp$15) {
        variable_5$jscomp$15 = variable_5$jscomp$15.originalEvent || variable_5$jscomp$15 || variable_1$jscomp$1.event;
        variable_6$jscomp$3.newPosX = variable_4$jscomp$32(variable_5$jscomp$15)["x"] - variable_9$jscomp$0.offsetX;
        variable_6$jscomp$3.newPosY = variable_4$jscomp$32(variable_5$jscomp$15)["y"] - variable_9$jscomp$0.offsetY;
        variable_6$jscomp$3.newRelativeX = variable_6$jscomp$3.newPosX - variable_9$jscomp$0.relativePos;
        if ("function" === typeof variable_6$jscomp$3.options.startDragging && true !== variable_9$jscomp$0.dragging && 0 !== variable_6$jscomp$3.newRelativeX) {
          variable_9$jscomp$0.dragging = true;
          variable_6$jscomp$3.options.startDragging.apply(variable_6$jscomp$3, [variable_6$jscomp$3["$elem"]]);
        }
        if ((8 < variable_6$jscomp$3.newRelativeX || -8 > variable_6$jscomp$3.newRelativeX) && true === variable_6$jscomp$3.browser.isTouch) {
          if (void 0 !== variable_5$jscomp$15.preventDefault) {
            variable_5$jscomp$15.preventDefault();
          } else {
            variable_5$jscomp$15.returnValue = false;
          }
          variable_9$jscomp$0.sliding = true;
        }
        if ((10 < variable_6$jscomp$3.newPosY || -10 > variable_6$jscomp$3.newPosY) && false === variable_9$jscomp$0.sliding) {
          variable_0$jscomp$1(variable_2$jscomp$0)["off"]("touchmove.owl");
        }
        variable_6$jscomp$3.newPosX = Math.max(Math.min(variable_6$jscomp$3.newPosX, variable_6$jscomp$3.newRelativeX / 5), variable_6$jscomp$3.maximumPixels + variable_6$jscomp$3.newRelativeX / 5);
        if (true === variable_6$jscomp$3.browser.support3d) {
          variable_6$jscomp$3.transition3d(variable_6$jscomp$3.newPosX);
        } else {
          variable_6$jscomp$3.css2move(variable_6$jscomp$3.newPosX);
        }
      }
      function variable_8$jscomp$4(variable_4$jscomp$35) {
        variable_4$jscomp$35 = variable_4$jscomp$35.originalEvent || variable_4$jscomp$35 || variable_1$jscomp$1.event;
        var variable_8$jscomp$5;
        variable_4$jscomp$35.target = variable_4$jscomp$35.target || variable_4$jscomp$35.srcElement;
        variable_9$jscomp$0.dragging = false;
        if (true !== variable_6$jscomp$3.browser.isTouch) {
          variable_6$jscomp$3["$owlWrapper"].removeClass("grabbing");
        }
        variable_6$jscomp$3.dragDirection = 0 > variable_6$jscomp$3.newRelativeX ? variable_6$jscomp$3.owl.dragDirection = "left" : variable_6$jscomp$3.owl.dragDirection = "right";
        if (0 !== variable_6$jscomp$3.newRelativeX) {
          variable_8$jscomp$5 = variable_6$jscomp$3.getNewPosition();
          variable_6$jscomp$3.goTo(variable_8$jscomp$5, false, "drag");
          if (variable_9$jscomp$0.targetElement === variable_4$jscomp$35.target && true !== variable_6$jscomp$3.browser.isTouch) {
            variable_0$jscomp$1(variable_4$jscomp$35.target)["on"]("click.disable", function(variable_4$jscomp$36) {
              variable_4$jscomp$36.stopImmediatePropagation();
              variable_4$jscomp$36.stopPropagation();
              variable_4$jscomp$36.preventDefault();
              variable_0$jscomp$1(variable_4$jscomp$36.target)["off"]("click.disable");
            });
            variable_4$jscomp$35 = variable_0$jscomp$1._data(variable_4$jscomp$35.target, "events")["click"];
            variable_8$jscomp$5 = variable_4$jscomp$35.pop();
            variable_4$jscomp$35.splice(0, 0, variable_8$jscomp$5);
          }
        }
        variable_5$jscomp$14("off");
      }
      var variable_6$jscomp$3 = this;
      var variable_9$jscomp$0 = {
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
      variable_6$jscomp$3.isCssFinish = true;
      variable_6$jscomp$3["$elem"].on(variable_6$jscomp$3.ev_types.start, ".owl-wrapper", function(variable_8$jscomp$6) {
        variable_8$jscomp$6 = variable_8$jscomp$6.originalEvent || variable_8$jscomp$6 || variable_1$jscomp$1.event;
        var variable_7$jscomp$9;
        if (3 === variable_8$jscomp$6.which) {
          return false;
        }
        if (!(variable_6$jscomp$3.itemsAmount <= variable_6$jscomp$3.options.items)) {
          if (false === variable_6$jscomp$3.isCssFinish && !variable_6$jscomp$3.options.dragBeforeAnimFinish || false === variable_6$jscomp$3.isCss3Finish && !variable_6$jscomp$3.options.dragBeforeAnimFinish) {
            return false;
          }
          if (false !== variable_6$jscomp$3.options.autoPlay) {
            variable_1$jscomp$1.clearInterval(variable_6$jscomp$3.autoPlayInterval);
          }
          if (!(true === variable_6$jscomp$3.browser.isTouch || variable_6$jscomp$3["$owlWrapper"].hasClass("grabbing"))) {
            variable_6$jscomp$3["$owlWrapper"].addClass("grabbing");
          }
          variable_6$jscomp$3.newPosX = 0;
          variable_6$jscomp$3.newRelativeX = 0;
          variable_0$jscomp$1(this)["css"](variable_6$jscomp$3.removeTransition());
          variable_7$jscomp$9 = variable_0$jscomp$1(this)["position"]();
          variable_9$jscomp$0.relativePos = variable_7$jscomp$9.left;
          variable_9$jscomp$0.offsetX = variable_4$jscomp$32(variable_8$jscomp$6)["x"] - variable_7$jscomp$9.left;
          variable_9$jscomp$0.offsetY = variable_4$jscomp$32(variable_8$jscomp$6)["y"] - variable_7$jscomp$9.top;
          variable_5$jscomp$14("on");
          variable_9$jscomp$0.sliding = false;
          variable_9$jscomp$0.targetElement = variable_8$jscomp$6.target || variable_8$jscomp$6.srcElement;
        }
      });
    },
    getNewPosition : function() {
      var variable_4$jscomp$37 = this["closestItem"]();
      if (variable_4$jscomp$37 > this["maximumItem"]) {
        variable_4$jscomp$37 = this["currentItem"] = this["maximumItem"];
      } else {
        if (0 <= this["newPosX"]) {
          this["currentItem"] = variable_4$jscomp$37 = 0;
        }
      }
      return variable_4$jscomp$37;
    },
    closestItem : function() {
      var variable_4$jscomp$38 = this;
      var variable_5$jscomp$16 = true === variable_4$jscomp$38.options.scrollPerPage ? variable_4$jscomp$38.pagesInArray : variable_4$jscomp$38.positionsInArray;
      var variable_7$jscomp$10 = variable_4$jscomp$38.newPosX;
      var variable_8$jscomp$7 = null;
      variable_0$jscomp$1.each(variable_5$jscomp$16, function(variable_6$jscomp$4, variable_1$jscomp$3) {
        if (variable_7$jscomp$10 - variable_4$jscomp$38.itemWidth / 20 > variable_5$jscomp$16[variable_6$jscomp$4 + 1] && variable_7$jscomp$10 - variable_4$jscomp$38.itemWidth / 20 < variable_1$jscomp$3 && "left" === variable_4$jscomp$38.moveDirection()) {
          variable_8$jscomp$7 = variable_1$jscomp$3;
          variable_4$jscomp$38.currentItem = true === variable_4$jscomp$38.options.scrollPerPage ? variable_0$jscomp$1.inArray(variable_8$jscomp$7, variable_4$jscomp$38.positionsInArray) : variable_6$jscomp$4;
        } else {
          if (variable_7$jscomp$10 + variable_4$jscomp$38.itemWidth / 20 < variable_1$jscomp$3 && variable_7$jscomp$10 + variable_4$jscomp$38.itemWidth / 20 > (variable_5$jscomp$16[variable_6$jscomp$4 + 1] || variable_5$jscomp$16[variable_6$jscomp$4] - variable_4$jscomp$38.itemWidth) && "right" === variable_4$jscomp$38.moveDirection()) {
            if (true === variable_4$jscomp$38.options.scrollPerPage) {
              variable_8$jscomp$7 = variable_5$jscomp$16[variable_6$jscomp$4 + 1] || variable_5$jscomp$16[variable_5$jscomp$16.length - 1];
              variable_4$jscomp$38.currentItem = variable_0$jscomp$1.inArray(variable_8$jscomp$7, variable_4$jscomp$38.positionsInArray);
            } else {
              variable_8$jscomp$7 = variable_5$jscomp$16[variable_6$jscomp$4 + 1];
              variable_4$jscomp$38.currentItem = variable_6$jscomp$4 + 1;
            }
          }
        }
      });
      return variable_4$jscomp$38.currentItem;
    },
    moveDirection : function() {
      var variable_4$jscomp$39;
      if (0 > this["newRelativeX"]) {
        variable_4$jscomp$39 = "right";
        this["playDirection"] = "next";
      } else {
        variable_4$jscomp$39 = "left";
        this["playDirection"] = "prev";
      }
      return variable_4$jscomp$39;
    },
    customEvents : function() {
      var variable_4$jscomp$40 = this;
      variable_4$jscomp$40["$elem"].on("owl.next", function() {
        variable_4$jscomp$40.next();
      });
      variable_4$jscomp$40["$elem"].on("owl.prev", function() {
        variable_4$jscomp$40.prev();
      });
      variable_4$jscomp$40["$elem"].on("owl.play", function(variable_5$jscomp$17, variable_7$jscomp$11) {
        variable_4$jscomp$40.options.autoPlay = variable_7$jscomp$11;
        variable_4$jscomp$40.play();
        variable_4$jscomp$40.hoverStatus = "play";
      });
      variable_4$jscomp$40["$elem"].on("owl.stop", function() {
        variable_4$jscomp$40.stop();
        variable_4$jscomp$40.hoverStatus = "stop";
      });
      variable_4$jscomp$40["$elem"].on("owl.goTo", function(variable_5$jscomp$18, variable_7$jscomp$12) {
        variable_4$jscomp$40.goTo(variable_7$jscomp$12);
      });
      variable_4$jscomp$40["$elem"].on("owl.jumpTo", function(variable_5$jscomp$19, variable_7$jscomp$13) {
        variable_4$jscomp$40.jumpTo(variable_7$jscomp$13);
      });
    },
    stopOnHover : function() {
      var variable_4$jscomp$41 = this;
      if (true === variable_4$jscomp$41.options.stopOnHover && true !== variable_4$jscomp$41.browser.isTouch && false !== variable_4$jscomp$41.options.autoPlay) {
        variable_4$jscomp$41["$elem"].on("mouseover", function() {
          variable_4$jscomp$41.stop();
        });
        variable_4$jscomp$41["$elem"].on("mouseout", function() {
          if ("stop" !== variable_4$jscomp$41.hoverStatus) {
            variable_4$jscomp$41.play();
          }
        });
      }
    },
    lazyLoad : function() {
      var variable_4$jscomp$42;
      var variable_5$jscomp$20;
      var variable_7$jscomp$14;
      var variable_8$jscomp$8;
      var variable_6$jscomp$5;
      if (false === this["options"].lazyLoad) {
        return false;
      }
      variable_4$jscomp$42 = 0;
      for (; variable_4$jscomp$42 < this["itemsAmount"]; variable_4$jscomp$42 = variable_4$jscomp$42 + 1) {
        variable_5$jscomp$20 = variable_0$jscomp$1(this["$owlItems"][variable_4$jscomp$42]);
        if ("loaded" !== variable_5$jscomp$20.data("owl-loaded")) {
          variable_7$jscomp$14 = variable_5$jscomp$20.data("owl-item");
          variable_8$jscomp$8 = variable_5$jscomp$20.find(".lazyOwl");
          if ("string" !== typeof variable_8$jscomp$8.data("src")) {
            variable_5$jscomp$20.data("owl-loaded", "loaded");
          } else {
            if (void 0 === variable_5$jscomp$20.data("owl-loaded")) {
              variable_8$jscomp$8.hide();
              variable_5$jscomp$20.addClass("loading")["data"]("owl-loaded", "checked");
            }
            if ((variable_6$jscomp$5 = true === this["options"].lazyFollow ? variable_7$jscomp$14 >= this["currentItem"] : true) && variable_7$jscomp$14 < this["currentItem"] + this["options"].items && variable_8$jscomp$8.length) {
              this["lazyPreload"](variable_5$jscomp$20, variable_8$jscomp$8);
            }
          }
        }
      }
    },
    lazyPreload : function(variable_4$jscomp$43, variable_5$jscomp$21) {
      function variable_7$jscomp$15() {
        variable_4$jscomp$43.data("owl-loaded", "loaded")["removeClass"]("loading");
        variable_5$jscomp$21.removeAttr("data-src");
        if ("fade" === variable_6$jscomp$6.options.lazyEffect) {
          variable_5$jscomp$21.fadeIn(400);
        } else {
          variable_5$jscomp$21.show();
        }
        if ("function" === typeof variable_6$jscomp$6.options.afterLazyLoad) {
          variable_6$jscomp$6.options.afterLazyLoad.apply(this, [variable_6$jscomp$6["$elem"]]);
        }
      }
      function variable_8$jscomp$9() {
        variable_0$jscomp$2 = variable_0$jscomp$2 + 1;
        if (variable_6$jscomp$6.completeImg(variable_5$jscomp$21.get(0)) || true === variable_2$jscomp$1) {
          variable_7$jscomp$15();
        } else {
          if (100 >= variable_0$jscomp$2) {
            variable_1$jscomp$1.setTimeout(variable_8$jscomp$9, 100);
          } else {
            variable_7$jscomp$15();
          }
        }
      }
      var variable_6$jscomp$6 = this;
      var variable_0$jscomp$2 = 0;
      var variable_2$jscomp$1;
      if ("DIV" === variable_5$jscomp$21.prop("tagName")) {
        variable_5$jscomp$21.css("background-image", "url(" + variable_5$jscomp$21.data("src") + ")");
        variable_2$jscomp$1 = true;
      } else {
        variable_5$jscomp$21[0].src = variable_5$jscomp$21.data("src");
      }
      variable_8$jscomp$9();
    },
    autoHeight : function() {
      function variable_4$jscomp$44() {
        var variable_4$jscomp$45 = variable_0$jscomp$1(variable_7$jscomp$16["$owlItems"][variable_7$jscomp$16.currentItem])["height"]();
        variable_7$jscomp$16.wrapperOuter.css("height", variable_4$jscomp$45 + "px");
        if (!variable_7$jscomp$16.wrapperOuter.hasClass("autoHeight")) {
          variable_1$jscomp$1.setTimeout(function() {
            variable_7$jscomp$16.wrapperOuter.addClass("autoHeight");
          }, 0);
        }
      }
      function variable_5$jscomp$22() {
        variable_6$jscomp$7 = variable_6$jscomp$7 + 1;
        if (variable_7$jscomp$16.completeImg(variable_8$jscomp$10.get(0))) {
          variable_4$jscomp$44();
        } else {
          if (100 >= variable_6$jscomp$7) {
            variable_1$jscomp$1.setTimeout(variable_5$jscomp$22, 100);
          } else {
            variable_7$jscomp$16.wrapperOuter.css("height", "");
          }
        }
      }
      var variable_7$jscomp$16 = this;
      var variable_8$jscomp$10 = variable_0$jscomp$1(variable_7$jscomp$16["$owlItems"][variable_7$jscomp$16.currentItem])["find"]("img");
      var variable_6$jscomp$7;
      if (void 0 !== variable_8$jscomp$10.get(0)) {
        variable_6$jscomp$7 = 0;
        variable_5$jscomp$22();
      } else {
        variable_4$jscomp$44();
      }
    },
    completeImg : function(variable_4$jscomp$46) {
      return !variable_4$jscomp$46.complete || "undefined" !== typeof variable_4$jscomp$46.naturalWidth && 0 === variable_4$jscomp$46.naturalWidth ? false : true;
    },
    onVisibleItems : function() {
      var variable_4$jscomp$47;
      if (true === this["options"].addClassActive) {
        this["$owlItems"].removeClass("active");
      }
      this["visibleItems"] = [];
      variable_4$jscomp$47 = this["currentItem"];
      for (; variable_4$jscomp$47 < this["currentItem"] + this["options"].items; variable_4$jscomp$47 = variable_4$jscomp$47 + 1) {
        this["visibleItems"].push(variable_4$jscomp$47);
        if (true === this["options"].addClassActive) {
          variable_0$jscomp$1(this["$owlItems"][variable_4$jscomp$47])["addClass"]("active");
        }
      }
      this["owl"].visibleItems = this["visibleItems"];
    },
    transitionTypes : function(variable_4$jscomp$48) {
      this["outClass"] = "owl-" + variable_4$jscomp$48 + "-out";
      this["inClass"] = "owl-" + variable_4$jscomp$48 + "-in";
    },
    singleItemTransition : function() {
      var variable_4$jscomp$49 = this;
      var variable_5$jscomp$23 = variable_4$jscomp$49.outClass;
      var variable_7$jscomp$17 = variable_4$jscomp$49.inClass;
      var variable_8$jscomp$11 = variable_4$jscomp$49["$owlItems"].eq(variable_4$jscomp$49.currentItem);
      var variable_6$jscomp$8 = variable_4$jscomp$49["$owlItems"].eq(variable_4$jscomp$49.prevItem);
      var variable_0$jscomp$3 = Math.abs(variable_4$jscomp$49.positionsInArray[variable_4$jscomp$49.currentItem]) + variable_4$jscomp$49.positionsInArray[variable_4$jscomp$49.prevItem];
      var variable_1$jscomp$4 = Math.abs(variable_4$jscomp$49.positionsInArray[variable_4$jscomp$49.currentItem]) + variable_4$jscomp$49.itemWidth / 2;
      variable_4$jscomp$49.isTransition = true;
      variable_4$jscomp$49["$owlWrapper"].addClass("owl-origin")["css"]({
        "-webkit-transform-origin" : variable_1$jscomp$4 + "px",
        "-moz-perspective-origin" : variable_1$jscomp$4 + "px",
        "perspective-origin" : variable_1$jscomp$4 + "px"
      });
      variable_6$jscomp$8.css({
        position : "relative",
        left : variable_0$jscomp$3 + "px"
      })["addClass"](variable_5$jscomp$23)["on"]("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function() {
        variable_4$jscomp$49.endPrev = true;
        variable_6$jscomp$8.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");
        variable_4$jscomp$49.clearTransStyle(variable_6$jscomp$8, variable_5$jscomp$23);
      });
      variable_8$jscomp$11.addClass(variable_7$jscomp$17)["on"]("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function() {
        variable_4$jscomp$49.endCurrent = true;
        variable_8$jscomp$11.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");
        variable_4$jscomp$49.clearTransStyle(variable_8$jscomp$11, variable_7$jscomp$17);
      });
    },
    clearTransStyle : function(variable_4$jscomp$50, variable_5$jscomp$24) {
      variable_4$jscomp$50.css({
        position : "",
        left : ""
      })["removeClass"](variable_5$jscomp$24);
      if (this["endPrev"] && this["endCurrent"]) {
        this["$owlWrapper"].removeClass("owl-origin");
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
        isTouch : this["browser"].isTouch,
        browser : this["browser"],
        dragDirection : this["dragDirection"]
      };
    },
    clearEvents : function() {
      this["$elem"].off(".owl owl mousedown.disableTextSelect");
      variable_0$jscomp$1(variable_2$jscomp$0)["off"](".owl owl");
      variable_0$jscomp$1(variable_1$jscomp$1)["off"]("resize", this["resizer"]);
    },
    unWrap : function() {
      if (0 !== this["$elem"].children()["length"]) {
        this["$owlWrapper"].unwrap();
        this["$userItems"].unwrap()["unwrap"]();
        if (this["owlControls"]) {
          this["owlControls"].remove();
        }
      }
      this["clearEvents"]();
      this["$elem"].attr("style", this["$elem"].data("owl-originalStyles") || "")["attr"]("class", this["$elem"].data("owl-originalClasses"));
    },
    destroy : function() {
      this["stop"]();
      variable_1$jscomp$1.clearInterval(this["checkVisible"]);
      this["unWrap"]();
      this["$elem"].removeData();
    },
    reinit : function(variable_4$jscomp$51) {
      variable_4$jscomp$51 = variable_0$jscomp$1.extend({}, this["userOptions"], variable_4$jscomp$51);
      this["unWrap"]();
      this["init"](variable_4$jscomp$51, this.$elem);
    },
    addItem : function(variable_4$jscomp$52, variable_5$jscomp$25) {
      var variable_7$jscomp$18;
      if (!variable_4$jscomp$52) {
        return false;
      }
      if (0 === this["$elem"].children()["length"]) {
        return this["$elem"].append(variable_4$jscomp$52), this["setVars"](), false;
      }
      this["unWrap"]();
      variable_7$jscomp$18 = void 0 === variable_5$jscomp$25 || -1 === variable_5$jscomp$25 ? -1 : variable_5$jscomp$25;
      if (variable_7$jscomp$18 >= this["$userItems"].length || -1 === variable_7$jscomp$18) {
        this["$userItems"].eq(-1)["after"](variable_4$jscomp$52);
      } else {
        this["$userItems"].eq(variable_7$jscomp$18)["before"](variable_4$jscomp$52);
      }
      this["setVars"]();
    },
    removeItem : function(variable_4$jscomp$53) {
      if (0 === this["$elem"].children()["length"]) {
        return false;
      }
      variable_4$jscomp$53 = void 0 === variable_4$jscomp$53 || -1 === variable_4$jscomp$53 ? -1 : variable_4$jscomp$53;
      this["unWrap"]();
      this["$userItems"].eq(variable_4$jscomp$53)["remove"]();
      this["setVars"]();
    }
  };
  variable_0$jscomp$1.fn.owlCarousel = function(variable_4$jscomp$54) {
    return this["each"](function() {
      if (true === variable_0$jscomp$1(this)["data"]("owl-init")) {
        return false;
      }
      variable_0$jscomp$1(this)["data"]("owl-init", true);
      var variable_5$jscomp$26 = Object.create(variable_3$jscomp$0);
      variable_5$jscomp$26.init(variable_4$jscomp$54, this);
      variable_0$jscomp$1.data(this, "owlCarousel", variable_5$jscomp$26);
    });
  };
  variable_0$jscomp$1.fn.owlCarousel.options = {
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
    responsiveBaseWidth : variable_1$jscomp$1,
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
