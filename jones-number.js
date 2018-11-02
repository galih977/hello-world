'use strict';
/**
 * @param {!Object} data
 * @return {undefined}
 */
function showpageCount(data) {
  var row;
  var svc = home_page_url;
  /** @type {!Array} */
  var cols = new Array;
  /** @type {number} */
  var identifier = 1;
  /** @type {number} */
  var token = 1;
  /** @type {number} */
  var index = 0;
  /** @type {number} */
  var p = 0;
  /** @type {number} */
  var textEntryInteraction = 0;
  /** @type {string} */
  var ret = "";
  /** @type {string} */
  var sub = "";
  /** @type {string} */
  var addme = "";
  /** @type {number} */
  var i = 0;
  for (; row = data.feed.entry[i]; i++) {
    var value = row.published.$t.substring(0, 19) + row.published.$t.substring(23, 29);
    /** @type {string} */
    timestamp = encodeURIComponent(value);
    var title = row.title.$t;
    if ("" != title) {
      if (!(0 != index && index % pageCount != pageCount - 1)) {
        if (-1 != svc.indexOf(timestamp)) {
          /** @type {number} */
          identifier = token;
        }
        if ("" != title) {
          token++;
        }
        cols[cols.length] = "/search?updated-max=" + timestamp + "&max-results=" + pageCount;
      }
    }
    index++;
  }
  /** @type {number} */
  colIndex = 0;
  for (; colIndex < cols.length; colIndex++) {
    if (colIndex >= identifier - displayPageNum - 1 && colIndex < identifier + displayPageNum) {
      if (0 == p && colIndex == identifier - 2) {
        /** @type {string} */
        sub = 2 == identifier ? '<span class="showpage"><a href="/">' + upPageWord + "</a></span>" : '<span class="showpage"><a href="' + cols[colIndex] + '">' + upPageWord + "</a></span>";
        p++;
      }
      /** @type {string} */
      ret = ret + (colIndex == identifier - 1 ? '<span class="showpagePoint">' + identifier + "</span>" : 0 == colIndex ? '<span class="showpageNum"><a href="/">1</a></span>' : '<span class="showpageNum"><a href="' + cols[colIndex] + '">' + (colIndex + 1) + "</a></span>");
      if (0 == textEntryInteraction && colIndex == identifier) {
        /** @type {string} */
        addme = '<span class="showpage"> <a href="' + cols[colIndex] + '">' + downPageWord + "</a></span>";
        textEntryInteraction++;
      }
    }
  }
  if (identifier > 1) {
    /** @type {string} */
    ret = sub + " " + ret + " ";
  }
  /** @type {string} */
  ret = '<div class="showpageArea"><span style="COLOR: #000;" class="showpageOf"> Pages (' + (token - 1) + ")</span>" + ret;
  if (identifier < token - 1) {
    /** @type {string} */
    ret = ret + addme;
  }
  if (1 == token) {
    token++;
  }
  /** @type {string} */
  ret = ret + "</div>";
  /** @type {!NodeList<Element>} */
  var tableCols = document.getElementsByName("pageArea");
  /** @type {(Element|null)} */
  var _message = document.getElementById("blog-pager");
  if (token <= 2) {
    /** @type {string} */
    ret = "";
  }
  /** @type {number} */
  var colIndex = 0;
  for (; colIndex < tableCols.length; colIndex++) {
    /** @type {string} */
    tableCols[colIndex].innerHTML = ret;
  }
  if (tableCols && tableCols.length > 0) {
    /** @type {string} */
    ret = "";
  }
  if (_message) {
    /** @type {string} */
    _message.innerHTML = ret;
  }
}
/**
 * @param {!Object} data
 * @return {undefined}
 */
function showpageCount2(data) {
  var row;
  var e = home_page_url;
  /** @type {!Array} */
  var distanceOffsetArray = new Array;
  var path = -1 != e.indexOf("/search/label/") ? e.substr(e.indexOf("/search/label/") + 14, e.length) : "";
  /** @type {number} */
  var length = 1;
  /** @type {number} */
  var PROTOCOLS_LENGTH = 1;
  /** @type {number} */
  var index = 0;
  /** @type {number} */
  var BR = 0;
  /** @type {number} */
  var listIndex = 0;
  /** @type {string} */
  var h = "";
  /** @type {string} */
  var html = "";
  /** @type {string} */
  var E = "";
  /** @type {string} */
  var dh = '<span class="showpageNum"><a href="/search/label/' + (path = -1 != path.indexOf("?") ? path.substr(0, path.indexOf("?")) : path) + "?&max-results=" + pageCount + '">';
  e = home_page_url;
  /** @type {number} */
  var i = 0;
  for (; row = data.feed.entry[i]; i++) {
    var value = row.published.$t.substring(0, 19) + row.published.$t.substring(23, 29);
    /** @type {string} */
    timestamp = encodeURIComponent(value);
    var title = row.title.$t;
    if ("" != title) {
      if (!(0 != index && index % pageCount != pageCount - 1)) {
        if (-1 != e.indexOf(timestamp)) {
          /** @type {number} */
          length = PROTOCOLS_LENGTH;
        }
        if ("" != title) {
          PROTOCOLS_LENGTH++;
        }
        distanceOffsetArray[distanceOffsetArray.length] = "/search/label/" + path + "?updated-max=" + timestamp + "&max-results=" + pageCount;
      }
    }
    index++;
  }
  /** @type {number} */
  j = 0;
  for (; j < distanceOffsetArray.length; j++) {
    if (j >= length - displayPageNum - 1 && j < length + displayPageNum) {
      if (0 == BR && j == length - 2) {
        /** @type {string} */
        html = 2 == length ? dh + upPageWord + "</a></span>" : '<span class="showpage"><a href="' + distanceOffsetArray[j] + '">' + upPageWord + "</a></span>";
        BR++;
      }
      if (j == length - 1) {
        /** @type {string} */
        h = h + ('<span class="showpagePoint">' + length + "</span>");
      } else {
        if (0 == j) {
          /** @type {string} */
          h = dh + "1</a></span>";
        } else {
          /** @type {string} */
          h = h + ('<span class="showpageNum"><a href="' + distanceOffsetArray[j] + '">' + (j + 1) + "</a></span>");
        }
      }
      if (0 == listIndex && j == length) {
        /** @type {string} */
        E = '<span class="showpage"> <a href="' + distanceOffsetArray[j] + '">' + downPageWord + "</a></span>";
        listIndex++;
      }
    }
  }
  if (length > 1) {
    /** @type {string} */
    h = html + " " + h + " ";
  }
  /** @type {string} */
  h = '<div class="showpageArea"><span class="showpageOf"> Pages (' + (PROTOCOLS_LENGTH - 1) + ")</span>" + h;
  if (length < PROTOCOLS_LENGTH - 1) {
    /** @type {string} */
    h = h + E;
  }
  if (1 == PROTOCOLS_LENGTH) {
    PROTOCOLS_LENGTH++;
  }
  /** @type {string} */
  h = h + "</div>";
  /** @type {!NodeList<Element>} */
  var htmlElements = document.getElementsByName("pageArea");
  /** @type {(Element|null)} */
  var cont = document.getElementById("blog-pager");
  if (PROTOCOLS_LENGTH <= 2) {
    /** @type {string} */
    h = "";
  }
  /** @type {number} */
  var j = 0;
  for (; j < htmlElements.length; j++) {
    /** @type {string} */
    htmlElements[j].innerHTML = h;
  }
  if (htmlElements && htmlElements.length > 0) {
    /** @type {string} */
    h = "";
  }
  if (cont) {
    /** @type {string} */
    cont.innerHTML = h;
  }
}
/** @type {string} */
var home_page_url = location.href;
/** @type {string} */
var thisUrl = home_page_url;
if (-1 != thisUrl.indexOf("/search/label/")) {
  if (-1 != thisUrl.indexOf("?updated-max")) {
    /** @type {string} */
    var lblname1 = thisUrl.substring(thisUrl.indexOf("/search/label/") + 14, thisUrl.indexOf("?updated-max"));
  } else {
    /** @type {string} */
    lblname1 = thisUrl.substring(thisUrl.indexOf("/search/label/") + 14, thisUrl.indexOf("?&max"));
  }
}
/** @type {string} */
var home_page = "/";
-1 == thisUrl.indexOf("?q=") && (-1 == thisUrl.indexOf("/search/label/") ? document.write('<script src="' + home_page + 'feeds/posts/summary?alt=json-in-script&callback=showpageCount&max-results=99999" >\x3c/script>') : document.write('<script src="' + home_page + "feeds/posts/full/-/" + lblname1 + '?alt=json-in-script&callback=showpageCount2&max-results=99999" >\x3c/script>')), $(document).ready(function() {
  var self = $(".ism-testimonial");
  $(".testimonials-authors li").hover(function() {
    var $this = $(this);
    /** @type {string} */
    var clsName = "active-testimonial";
    var n = $this.index();
    var val = $this.siblings("." + clsName).index();
    if (!$this.hasClass(clsName)) {
      $this.siblings("li").removeClass(clsName).end().addClass(clsName);
      self.eq(val).stop(true, true).animate({
        opacity : 0
      }, 100, function() {
        $(this).hide();
        self.eq(n).css({
          display : "block",
          opacity : 0
        }).animate({
          opacity : 1
        }, 100);
      });
    }
  });
});
jQuery(document).ready(function($) {
  $("#owl-demo").owlCarousel({
    autoPlay : 3000,
    navigation : false,
    autoHeight : true,
    items : 2,
    itemsDesktop : [1199, 3],
    itemsDesktopSmall : [980, 2],
    itemsTablet : [768, 2],
    itemsTabletSmall : [568, 1],
    itemsMobile : [479, 1]
  });
});
/** @type {(MediaQueryList|null)} */
}
;
