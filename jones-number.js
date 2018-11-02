'use strict';
function showpageCount(a$jscomp$0) {
  var e$jscomp$7;
  var s$jscomp$2 = home_page_url;
  var n$jscomp$3 = new Array;
  var t$jscomp$0 = 1;
  var r$jscomp$1 = 1;
  var l$jscomp$0 = 0;
  var p$jscomp$0 = 0;
  var i$jscomp$3 = 0;
  var o$jscomp$0 = "";
  var h$jscomp$6 = "";
  var g$jscomp$0 = "";
  var d$jscomp$0 = 0;
  for (; e$jscomp$7 = a$jscomp$0.feed.entry[d$jscomp$0]; d$jscomp$0++) {
    var m$jscomp$0 = e$jscomp$7.published.$t.substring(0, 19) + e$jscomp$7.published.$t.substring(23, 29);
    timestamp = encodeURIComponent(m$jscomp$0);
    var u$jscomp$0 = e$jscomp$7.title.$t;
    if ("" != u$jscomp$0) {
      if (!(0 != l$jscomp$0 && l$jscomp$0 % pageCount != pageCount - 1)) {
        if (-1 != s$jscomp$2.indexOf(timestamp)) {
          t$jscomp$0 = r$jscomp$1;
        }
        if ("" != u$jscomp$0) {
          r$jscomp$1++;
        }
        n$jscomp$3[n$jscomp$3.length] = "/search?updated-max=" + timestamp + "&max-results=" + pageCount;
      }
    }
    l$jscomp$0++;
  }
  b$jscomp$0 = 0;
  for (; b$jscomp$0 < n$jscomp$3.length; b$jscomp$0++) {
    if (b$jscomp$0 >= t$jscomp$0 - displayPageNum - 1 && b$jscomp$0 < t$jscomp$0 + displayPageNum) {
      if (0 == p$jscomp$0 && b$jscomp$0 == t$jscomp$0 - 2) {
        h$jscomp$6 = 2 == t$jscomp$0 ? '<span class="showpage"><a href="/">' + upPageWord + "</a></span>" : '<span class="showpage"><a href="' + n$jscomp$3[b$jscomp$0] + '">' + upPageWord + "</a></span>";
        p$jscomp$0++;
      }
      o$jscomp$0 = o$jscomp$0 + (b$jscomp$0 == t$jscomp$0 - 1 ? '<span class="showpagePoint">' + t$jscomp$0 + "</span>" : 0 == b$jscomp$0 ? '<span class="showpageNum"><a href="/">1</a></span>' : '<span class="showpageNum"><a href="' + n$jscomp$3[b$jscomp$0] + '">' + (b$jscomp$0 + 1) + "</a></span>");
      if (0 == i$jscomp$3 && b$jscomp$0 == t$jscomp$0) {
        g$jscomp$0 = '<span class="showpage"> <a href="' + n$jscomp$3[b$jscomp$0] + '">' + downPageWord + "</a></span>";
        i$jscomp$3++;
      }
    }
  }
  if (t$jscomp$0 > 1) {
    o$jscomp$0 = h$jscomp$6 + " " + o$jscomp$0 + " ";
  }
  o$jscomp$0 = '<div class="showpageArea"><span style="COLOR: #000;" class="showpageOf"> Pages (' + (r$jscomp$1 - 1) + ")</span>" + o$jscomp$0;
  if (t$jscomp$0 < r$jscomp$1 - 1) {
    o$jscomp$0 = o$jscomp$0 + g$jscomp$0;
  }
  if (1 == r$jscomp$1) {
    r$jscomp$1++;
  }
  o$jscomp$0 = o$jscomp$0 + "</div>";
  var c$jscomp$0 = document.getElementsByName("pageArea");
  var f$jscomp$1 = document.getElementById("blog-pager");
  if (r$jscomp$1 <= 2) {
    o$jscomp$0 = "";
  }
  var b$jscomp$0 = 0;
  for (; b$jscomp$0 < c$jscomp$0.length; b$jscomp$0++) {
    c$jscomp$0[b$jscomp$0].innerHTML = o$jscomp$0;
  }
  if (c$jscomp$0 && c$jscomp$0.length > 0) {
    o$jscomp$0 = "";
  }
  if (f$jscomp$1) {
    f$jscomp$1.innerHTML = o$jscomp$0;
  }
}
function showpageCount2(a$jscomp$1) {
  var e$jscomp$8;
  var s$jscomp$3 = home_page_url;
  var n$jscomp$4 = new Array;
  var t$jscomp$1 = -1 != s$jscomp$3.indexOf("/search/label/") ? s$jscomp$3.substr(s$jscomp$3.indexOf("/search/label/") + 14, s$jscomp$3.length) : "";
  var r$jscomp$2 = 1;
  var l$jscomp$1 = 1;
  var p$jscomp$1 = 0;
  var i$jscomp$4 = 0;
  var o$jscomp$1 = 0;
  var h$jscomp$7 = "";
  var g$jscomp$1 = "";
  var d$jscomp$1 = "";
  var m$jscomp$1 = '<span class="showpageNum"><a href="/search/label/' + (t$jscomp$1 = -1 != t$jscomp$1.indexOf("?") ? t$jscomp$1.substr(0, t$jscomp$1.indexOf("?")) : t$jscomp$1) + "?&max-results=" + pageCount + '">';
  s$jscomp$3 = home_page_url;
  var u$jscomp$1 = 0;
  for (; e$jscomp$8 = a$jscomp$1.feed.entry[u$jscomp$1]; u$jscomp$1++) {
    var c$jscomp$1 = e$jscomp$8.published.$t.substring(0, 19) + e$jscomp$8.published.$t.substring(23, 29);
    timestamp = encodeURIComponent(c$jscomp$1);
    var f$jscomp$2 = e$jscomp$8.title.$t;
    if ("" != f$jscomp$2) {
      if (!(0 != p$jscomp$1 && p$jscomp$1 % pageCount != pageCount - 1)) {
        if (-1 != s$jscomp$3.indexOf(timestamp)) {
          r$jscomp$2 = l$jscomp$1;
        }
        if ("" != f$jscomp$2) {
          l$jscomp$1++;
        }
        n$jscomp$4[n$jscomp$4.length] = "/search/label/" + t$jscomp$1 + "?updated-max=" + timestamp + "&max-results=" + pageCount;
      }
    }
    p$jscomp$1++;
  }
  w$jscomp$7 = 0;
  for (; w$jscomp$7 < n$jscomp$4.length; w$jscomp$7++) {
    if (w$jscomp$7 >= r$jscomp$2 - displayPageNum - 1 && w$jscomp$7 < r$jscomp$2 + displayPageNum) {
      if (0 == i$jscomp$4 && w$jscomp$7 == r$jscomp$2 - 2) {
        g$jscomp$1 = 2 == r$jscomp$2 ? m$jscomp$1 + upPageWord + "</a></span>" : '<span class="showpage"><a href="' + n$jscomp$4[w$jscomp$7] + '">' + upPageWord + "</a></span>";
        i$jscomp$4++;
      }
      if (w$jscomp$7 == r$jscomp$2 - 1) {
        h$jscomp$7 = h$jscomp$7 + ('<span class="showpagePoint">' + r$jscomp$2 + "</span>");
      } else {
        if (0 == w$jscomp$7) {
          h$jscomp$7 = m$jscomp$1 + "1</a></span>";
        } else {
          h$jscomp$7 = h$jscomp$7 + ('<span class="showpageNum"><a href="' + n$jscomp$4[w$jscomp$7] + '">' + (w$jscomp$7 + 1) + "</a></span>");
        }
      }
      if (0 == o$jscomp$1 && w$jscomp$7 == r$jscomp$2) {
        d$jscomp$1 = '<span class="showpage"> <a href="' + n$jscomp$4[w$jscomp$7] + '">' + downPageWord + "</a></span>";
        o$jscomp$1++;
      }
    }
  }
  if (r$jscomp$2 > 1) {
    h$jscomp$7 = g$jscomp$1 + " " + h$jscomp$7 + " ";
  }
  h$jscomp$7 = '<div class="showpageArea"><span class="showpageOf"> Pages (' + (l$jscomp$1 - 1) + ")</span>" + h$jscomp$7;
  if (r$jscomp$2 < l$jscomp$1 - 1) {
    h$jscomp$7 = h$jscomp$7 + d$jscomp$1;
  }
  if (1 == l$jscomp$1) {
    l$jscomp$1++;
  }
  h$jscomp$7 = h$jscomp$7 + "</div>";
  var b$jscomp$1 = document.getElementsByName("pageArea");
  var x$jscomp$74 = document.getElementById("blog-pager");
  if (l$jscomp$1 <= 2) {
    h$jscomp$7 = "";
  }
  var w$jscomp$7 = 0;
  for (; w$jscomp$7 < b$jscomp$1.length; w$jscomp$7++) {
    b$jscomp$1[w$jscomp$7].innerHTML = h$jscomp$7;
  }
  if (b$jscomp$1 && b$jscomp$1.length > 0) {
    h$jscomp$7 = "";
  }
  if (x$jscomp$74) {
    x$jscomp$74.innerHTML = h$jscomp$7;
  }
}
var home_page_url = location.href;
var thisUrl = home_page_url;
if (-1 != thisUrl.indexOf("/search/label/")) {
  if (-1 != thisUrl.indexOf("?updated-max")) {
    var lblname1 = thisUrl.substring(thisUrl.indexOf("/search/label/") + 14, thisUrl.indexOf("?updated-max"));
  } else {
    lblname1 = thisUrl.substring(thisUrl.indexOf("/search/label/") + 14, thisUrl.indexOf("?&max"));
  }
}
var home_page = "/";
-1 == thisUrl.indexOf("?q=") && (-1 == thisUrl.indexOf("/search/label/") ? document.write('<script src="' + home_page + 'feeds/posts/summary?alt=json-in-script&callback=showpageCount&max-results=99999" >\x3c/script>') : document.write('<script src="' + home_page + "feeds/posts/full/-/" + lblname1 + '?alt=json-in-script&callback=showpageCount2&max-results=99999" >\x3c/script>')), $(document).ready(function() {
  var a$jscomp$2 = $(".ism-testimonial");
  $(".testimonials-authors li").hover(function() {
    var e$jscomp$9 = $(this);
    var s$jscomp$4 = "active-testimonial";
    var n$jscomp$5 = e$jscomp$9.index();
    var t$jscomp$2 = e$jscomp$9.siblings("." + s$jscomp$4).index();
    if (!e$jscomp$9.hasClass(s$jscomp$4)) {
      e$jscomp$9.siblings("li").removeClass(s$jscomp$4).end().addClass(s$jscomp$4);
      a$jscomp$2.eq(t$jscomp$2).stop(true, true).animate({
        opacity : 0
      }, 100, function() {
        $(this).hide();
        a$jscomp$2.eq(n$jscomp$5).css({
          display : "block",
          opacity : 0
        }).animate({
          opacity : 1
        }, 100);
      });
    }
  });
});
jQuery(document).ready(function(e$jscomp$10) {
  e$jscomp$10("#owl-demo").owlCarousel({
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
