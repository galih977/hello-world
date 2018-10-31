$(document)["ready"](function() {
    setInterval(function() {
        if (!$("#mycontent:visible")["length"]) {
            window["location"]["href"] = "http://www.galihdesign.com/"
        }
    }, 3000)
});
window["onload"] = function() {
    var variable_0 = document["getElementById"]("mycontent");
    variable_0["setAttribute"]("href", "http://www.galihdesign.com/");
    variable_0["setAttribute"]("rel", "dofollow");
    variable_0["setAttribute"]("title", "Free Blogger Templates");
    variable_0["setAttribute"]("style", "display: inline-block!important; font-size: inherit!important; color: #0088ff!important; visibility: visible!important;z-index:99!important; opacity: 1!important;");
    variable_0["innerHTML"] = "Galihdesign"
};
$(document)["ready"](function(variable_1) {
    var variable_2 = -1,
        o = "",
        variable_3 = "";
    variable_1("#menu")["find"]("ul")["find"]("li")["each"](function() {
        for (var variable_4 = variable_1(this)["text"](), variable_5 = variable_1(this)["find"]("a")["attr"]("href"), variable_6 = 0, variable_7 = 0; variable_7 < variable_4["length"] && (variable_6 = variable_4["indexOf"]("_", variable_6), -1 != variable_6); variable_7++) {
            variable_6++
        };
        if (level = variable_7, level > variable_2 && (o += "<ul>", variable_3 += "<ul>"), level < variable_2) {
            offset = variable_2 - level;
            for (var variable_7 = 0; variable_7 < offset; variable_7++) {
                o += "</ul></li>", variable_3 += "</ul></li>"
            }
        };
        variable_4 = variable_4["replace"](/_/gi, ""), o += "<li><a href='" + variable_5 + "'>" + variable_4 + "</a>", variable_3 += "<li><a href='" + variable_5 + "'>";
        for (var variable_7 = 0; variable_7 < level; variable_7++) {
            variable_3 += ""
        };
        variable_3 += variable_4 + "</a>", variable_2 = level
    });
    for (var variable_6 = 0; variable_2 >= variable_6; variable_6++) {
        o += "</ul>", variable_3 += "</ul>", 0 != variable_6 && (o += "</li>", variable_3 += "</li>")
    };
    variable_1("#menu .LinkList")["html"](variable_3), variable_1("#menu > .LinkList > ul")["attr"]("id", "nav1"), selectnav("nav1"), variable_1("#menu ul > li > ul")["parent"]("li")["addClass"]("parent"), variable_1("#menu .widget")["attr"]("style", "display:block!important;")
});
$(document)["ready"](function() {
    var variable_8 = $(".search");
    variable_8["click"](function(variable_0) {
        variable_0["preventDefault"]();
        if (variable_8["is"](".active") && $(variable_0["target"])["is"](variable_8)) {
            variable_8["removeClass"]("active")
        } else {
            variable_8["addClass"]("active");
            variable_8["find"]("input")["focus"]()
        }
    });
    $("body")["click"](function(variable_0) {
        if (variable_8["is"](".active") && !$(variable_0["target"])["is"](".search, .search form, .search input")) {
            variable_8["removeClass"]("active")
        }
    });
    selectnav("nav")
});
$(".ticker .HTML .widget-content")["each"](function() {
    var variable_9 = $(this)["find"]("span")["attr"]("data-no") || "",
        variable_10 = $(this)["find"]("span")["attr"]("data-label") || "",
        variable_11 = $(this)["find"]("span")["attr"]("data-type") || "";
    if (variable_11 != undefined && variable_11["match"]("recent")) {
        $["ajax"]({
            url: "/feeds/posts/default?alt=json-in-script&max-results=" + variable_9,
            type: "get",
            dataType: "jsonp",
            success: function(variable_0) {
                var u = "";
                var variable_12 = "<ul>";
                for (var variable_00 = 0; variable_00 < variable_0["feed"]["entry"]["length"]; variable_00++) {
                    for (var variable_01 = 0; variable_01 < variable_0["feed"]["entry"][variable_00]["link"]["length"]; variable_01++) {
                        if (variable_0["feed"]["entry"][variable_00]["link"][variable_01]["rel"] == "alternate") {
                            u = variable_0["feed"]["entry"][variable_00]["link"][variable_01]["href"];
                            break
                        }
                    };
                    var variable_02 = variable_0["feed"]["entry"][variable_00]["title"]["$t"];
                    var s = variable_0["feed"]["entry"][variable_00]["category"][0]["term"];
                    var variable_04 = variable_0["feed"]["entry"][variable_00]["content"]["$t"];
                    var variable_05 = $("<div>")["html"](variable_04);
                    if (variable_04["indexOf"]("//www.youtube.com/embed/") > -1) {
                        var variable_3 = variable_0["feed"]["entry"][variable_00]["media$thumbnail"]["url"]["replace"]("/default.jpg", "/mqdefault.jpg");
                        var variable_2 = variable_3
                    } else {
                        if (variable_04["indexOf"]("<img") > -1) {
                            var variable_06 = variable_05["find"]("img:first")["attr"]("src")["replace"]("s72-c", "s1600");
                            var variable_2 = variable_06
                        } else {
                            var variable_2 = no_image
                        }
                    };
                    variable_12 += "<li><div class=\"tk-thumb\"><a class=\"tk-img\" href=\"" + u + "\" style=\"background:url(" + variable_2 + ") no-repeat center center;background-size: cover\"><span class=\"tyimg-lay\"/></a></div><a href=\"/search/label/" + s + "\" class=\"post-tag icon " + s + "\">" + s + "</a><h3 class=\"tyard-title\"><a href=\"" + u + "\">" + variable_02 + "</a></h3></li>"
                };
                variable_12 += "</ul>";
                $(".ticker .widget-content")["each"](function() {
                    $(this)["html"](variable_12);
                    $(this)["prev"]("h2")["prepend"]("<i class=\"fa fa-fire\"></i>");
                    $(this)["find"]("ul")["webTicker"]()
                })
            }
        })
    } else {
        if (variable_11["match"]("label")) {
            $["ajax"]({
                url: "/feeds/posts/default/-/" + variable_10 + "?alt=json-in-script&max-results=" + variable_9,
                type: "get",
                dataType: "jsonp",
                success: function(variable_0) {
                    var u = "";
                    var variable_12 = "<ul>";
                    for (var variable_00 = 0; variable_00 < variable_0["feed"]["entry"]["length"]; variable_00++) {
                        for (var variable_01 = 0; variable_01 < variable_0["feed"]["entry"][variable_00]["link"]["length"]; variable_01++) {
                            if (variable_0["feed"]["entry"][variable_00]["link"][variable_01]["rel"] == "alternate") {
                                u = variable_0["feed"]["entry"][variable_00]["link"][variable_01]["href"];
                                break
                            }
                        };
                        var variable_02 = variable_0["feed"]["entry"][variable_00]["title"]["$t"];
                        var s = variable_0["feed"]["entry"][variable_00]["category"][0]["term"];
                        var variable_04 = variable_0["feed"]["entry"][variable_00]["content"]["$t"];
                        var variable_05 = $("<div>")["html"](variable_04);
                        if (variable_04["indexOf"]("//www.youtube.com/embed/") > -1) {
                            var variable_3 = variable_0["feed"]["entry"][variable_00]["media$thumbnail"]["url"]["replace"]("/default.jpg", "/mqdefault.jpg");
                            var variable_2 = variable_3
                        } else {
                            if (variable_04["indexOf"]("<img") > -1) {
                                var variable_06 = variable_05["find"]("img:first")["attr"]("src")["replace"]("s72-c", "s1600");
                                var variable_2 = variable_06
                            } else {
                                var variable_2 = no_image
                            }
                        };
                        variable_12 += "<li><div class=\"tk-thumb\"><a class=\"tk-img\" href=\"" + u + "\" style=\"background:url(" + variable_2 + ") no-repeat center center;background-size: cover\"><span class=\"tyimg-lay\"/></a></div><a href=\"/search/label/" + s + "\" class=\"post-tag icon " + s + "\">" + s + "</a><h3 class=\"tyard-title\"><a href=\"" + u + "\">" + variable_02 + "</a></h3></li>"
                    };
                    variable_12 += "</ul>";
                    $(".ticker .HTML .widget-content")["each"](function() {
                        $(this)["html"](variable_12);
                        $(this)["prev"]("h2")["prepend"]("<i class=\"fa fa-fire\"></i>");
                        $(this)["find"]("ul")["webTicker"]()
                    })
                }
            })
        } else {
            $(".news-tick-bar")["remove"]()
        }
    }
});
$(".ty-slide-show .HTML .widget-content")["each"](function() {
    var variable_07 = $(this)["prev"]("h2")["text"](),
        variable_10 = $(this)["find"]("span")["attr"]("data-label"),
        variable_9 = $(this)["find"]("span")["attr"]("data-no"),
        variable_08 = $(this)["parent"]()["attr"]("id"),
        variable_11 = $(this)["find"]("span")["attr"]("data-type");
    if (variable_11 != undefined && variable_11["match"]("ty-latest-slide")) {
        $["ajax"]({
            url: "/feeds/posts/default?alt=json-in-script&max-results=" + variable_9,
            type: "get",
            dataType: "jsonp",
            success: function(variable_0) {
                var u = "";
                var variable_12 = "<div class=\"ty-slide\"><ul class=\"slides owl-carousel\">";
                for (var variable_00 = 0; variable_00 < variable_0["feed"]["entry"]["length"]; variable_00++) {
                    for (var variable_01 = 0; variable_01 < variable_0["feed"]["entry"][variable_00]["link"]["length"]; variable_01++) {
                        if (variable_0["feed"]["entry"][variable_00]["link"][variable_01]["rel"] == "alternate") {
                            u = variable_0["feed"]["entry"][variable_00]["link"][variable_01]["href"];
                            break
                        }
                    };
                    var variable_09;
                    for (var variable_2 = 0; variable_2 < variable_0["feed"]["entry"][variable_00]["link"]["length"]; variable_2++) {
                        if ((variable_0["feed"]["entry"][variable_00]["link"][variable_2]["rel"] === "replies") && (variable_0["feed"]["entry"][variable_00]["link"][variable_2]["type"] === "text/html")) {
                            variable_09 = variable_0["feed"]["entry"][variable_00]["link"][variable_2]["title"];
                            break
                        }
                    };
                    variable_09 = parseInt(variable_09, 10);
                    if ("content" in variable_0["feed"]["entry"][variable_00]) {
                        var variable_0a = variable_0["feed"]["entry"][variable_00]["content"]["$t"]
                    } else {
                        if ("summary" in b_rc) {
                            var variable_0a = variable_0["feed"]["entry"][variable_00]["summary"]["$t"]
                        } else {
                            var variable_0a = ""
                        }
                    };
                    var variable_0b = /<\S[^>]*>/g;
                    variable_0a = variable_0a["replace"](variable_0b, ""), variable_0a["length"] > 120 && (variable_0a = "" + variable_0a["substring"](0, 100) + "...");
                    var variable_02 = variable_0["feed"]["entry"][variable_00]["title"]["$t"];
                    var s = variable_0["feed"]["entry"][variable_00]["category"][0]["term"];
                    var variable_0c = variable_0["feed"]["entry"][variable_00]["author"][0]["name"]["$t"];
                    var variable_0d = variable_0["feed"]["entry"][variable_00]["author"][0]["gd$image"]["src"];
                    var variable_0e = variable_0["feed"]["entry"][variable_00]["published"]["$t"],
                        variable_0f = variable_0e["substring"](0, 4),
                        variable_10 = variable_0e["substring"](5, 7),
                        variable_11 = variable_0e["substring"](8, 10),
                        variable_12 = month_format[parseInt(variable_10, 10)] + " " + variable_11 + ", " + variable_0f;
                    var variable_04 = variable_0["feed"]["entry"][variable_00]["content"]["$t"];
                    var variable_05 = $("<div>")["html"](variable_04);
                    if (variable_04["indexOf"]("//www.youtube.com/embed/") > -1) {
                        var variable_3 = variable_0["feed"]["entry"][variable_00]["media$thumbnail"]["url"];
                        var variable_2 = variable_3
                    } else {
                        if (variable_04["indexOf"]("<img") > -1) {
                            var variable_06 = variable_05["find"]("img:first")["attr"]("src");
                            var variable_2 = variable_06
                        } else {
                            var variable_2 = no_image
                        }
                    };
                    variable_12 += "<li><div class=\"ty-wow\"><a class=\"ty-thumb-bonos\" href=\"" + u + "\"><img alt=\"" + variable_02 + "\" src=\"" + variable_2 + "\"/><span class=\"tyimg-lay\"/></a><div class=\"ty-slide-con\"><div class=\"ty-slide-con\"><div class=\"ty-slide-con-tab\"><h3 class=\"ty-bonos-entry\"><a href=\"" + u + "\">" + variable_02 + "</a></h3><span class=\"recent-date\">" + variable_12 + "</span><p class=\"recent-summary\">" + variable_0a + "</p><a class=\"tyslide-more\" href=\"" + u + "\">Read More</a></div></div></div></div></li>"
                };
                variable_12 += "</ul></div>";
                $(".ty-slide-show .HTML .widget-content")["each"](function() {
                    var variable_4 = $(this)["parent"]()["attr"]("id");
                    if (variable_4 == variable_08) {
                        $(this)["html"](variable_12);
                        $(this)["parent"]()["addClass"]("tslide");
                        $(this)["parent"]()["addClass"]("templatesyard");
                        $(this)["prev"]("h2")["remove"]();
                        $(this)["find"](".yard-img,.ty-img")["each"](function() {
                            $(this)["attr"]("style", function(variable_00, variable_13) {
                                return variable_13["replace"]("/default.jpg", "/mqdefault.jpg")
                            })["attr"]("style", function(variable_00, variable_13) {
                                return variable_13["replace"]("s72-c", "s1600")
                            })
                        })
                    }
                })
            }
        })
    } else {
        if (variable_11 != undefined && variable_11["match"]("ty-tag-slide")) {
            $["ajax"]({
                url: "/feeds/posts/default/-/" + variable_10 + "?alt=json-in-script&max-results=" + variable_9,
                type: "get",
                dataType: "jsonp",
                success: function(variable_0) {
                    var u = "";
                    var variable_12 = "<div class=\"ty-slide\"><ul class=\"slides owl-carousel\">";
                    for (var variable_00 = 0; variable_00 < variable_0["feed"]["entry"]["length"]; variable_00++) {
                        for (var variable_01 = 0; variable_01 < variable_0["feed"]["entry"][variable_00]["link"]["length"]; variable_01++) {
                            if (variable_0["feed"]["entry"][variable_00]["link"][variable_01]["rel"] == "alternate") {
                                u = variable_0["feed"]["entry"][variable_00]["link"][variable_01]["href"];
                                break
                            }
                        };
                        var variable_09;
                        for (var variable_2 = 0; variable_2 < variable_0["feed"]["entry"][variable_00]["link"]["length"]; variable_2++) {
                            if ((variable_0["feed"]["entry"][variable_00]["link"][variable_2]["rel"] === "replies") && (variable_0["feed"]["entry"][variable_00]["link"][variable_2]["type"] === "text/html")) {
                                variable_09 = variable_0["feed"]["entry"][variable_00]["link"][variable_2]["title"];
                                break
                            }
                        };
                        variable_09 = parseInt(variable_09, 10);
                        if ("content" in variable_0["feed"]["entry"][variable_00]) {
                            var variable_0a = variable_0["feed"]["entry"][variable_00]["content"]["$t"]
                        } else {
                            if ("summary" in b_rc) {
                                var variable_0a = variable_0["feed"]["entry"][variable_00]["summary"]["$t"]
                            } else {
                                var variable_0a = ""
                            }
                        };
                        var variable_0b = /<\S[^>]*>/g;
                        variable_0a = variable_0a["replace"](variable_0b, ""), variable_0a["length"] > 120 && (variable_0a = "" + variable_0a["substring"](0, 100) + "...");
                        var variable_02 = variable_0["feed"]["entry"][variable_00]["title"]["$t"];
                        var s = variable_0["feed"]["entry"][variable_00]["category"][0]["term"];
                        var variable_0c = variable_0["feed"]["entry"][variable_00]["author"][0]["name"]["$t"];
                        var variable_0d = variable_0["feed"]["entry"][variable_00]["author"][0]["gd$image"]["src"];
                        var variable_0e = variable_0["feed"]["entry"][variable_00]["published"]["$t"],
                            variable_0f = variable_0e["substring"](0, 4),
                            variable_10 = variable_0e["substring"](5, 7),
                            variable_11 = variable_0e["substring"](8, 10),
                            variable_12 = month_format[parseInt(variable_10, 10)] + " " + variable_11 + ", " + variable_0f;
                        var variable_04 = variable_0["feed"]["entry"][variable_00]["content"]["$t"];
                        var variable_05 = $("<div>")["html"](variable_04);
                        if (variable_04["indexOf"]("//www.youtube.com/embed/") > -1) {
                            var variable_3 = variable_0["feed"]["entry"][variable_00]["media$thumbnail"]["url"];
                            var variable_2 = variable_3
                        } else {
                            if (variable_04["indexOf"]("<img") > -1) {
                                var variable_06 = variable_05["find"]("img:first")["attr"]("src");
                                var variable_2 = variable_06
                            } else {
                                var variable_2 = no_image
                            }
                        };
                        variable_12 += "<li><div class=\"ty-wow\"><a class=\"ty-thumb-bonos\" href=\"" + u + "\"><img alt=\"" + variable_02 + "\" src=\"" + variable_2 + "\"/><span class=\"tyimg-lay\"/></a><div class=\"ty-slide-con\"><div class=\"ty-slide-con\"><div class=\"ty-slide-con-tab\"><h3 class=\"ty-bonos-entry\"><a href=\"" + u + "\">" + variable_02 + "</a></h3><span class=\"recent-date\">" + variable_12 + "</span><p class=\"recent-summary\">" + variable_0a + "</p><a class=\"tyslide-more\" href=\"" + u + "\">\u0625\u0642\u0631\u0623 \u0627\u0644\u0645\u0632\u064A\u062F </a></div></div></div></div></li>"
                    };
                    variable_12 += "</ul></div>";
                    $(".ty-slide-show .HTML .widget-content")["each"](function() {
                        var variable_4 = $(this)["parent"]()["attr"]("id");
                        if (variable_4 == variable_08) {
                            $(this)["html"](variable_12);
                            $(this)["parent"]()["addClass"]("tslide");
                            $(this)["parent"]()["addClass"]("templatesyard");
                            $(this)["prev"]("h2")["remove"]();
                            $(this)["find"](".yard-img,.ty-img")["each"](function() {
                                $(this)["attr"]("style", function(variable_00, variable_13) {
                                    return variable_13["replace"]("/default.jpg", "/mqdefault.jpg")
                                })["attr"]("style", function(variable_00, variable_13) {
                                    return variable_13["replace"]("s72-c", "s1600")
                                })
                            })
                        }
                    })
                }
            })
        } else {
            $(".feat-slider-wrap")["remove"]()
        }
    }
});
$(".featured .HTML .widget-content")["each"](function() {
    var variable_10 = $(this)["find"]("span")["attr"]("data-label"),
        variable_9 = $(this)["find"]("span")["attr"]("data-no"),
        variable_07 = $(this)["prev"]("h2")["text"](),
        variable_14 = $(this)["parent"]()["attr"]("id"),
        variable_11 = $(this)["find"]("span")["attr"]("data-type");
    if (variable_11["match"]("tyard")) {
        $["ajax"]({
            url: "/feeds/posts/default/-/" + variable_10 + "?alt=json-in-script&max-results=3",
            type: "get",
            dataType: "jsonp",
            success: function(variable_0) {
                var u = "";
                var variable_12 = "<div class=\"ty-feat\">";
                for (var variable_00 = 0; variable_00 < variable_0["feed"]["entry"]["length"]; variable_00++) {
                    for (var variable_01 = 0; variable_01 < variable_0["feed"]["entry"][variable_00]["link"]["length"]; variable_01++) {
                        if (variable_0["feed"]["entry"][variable_00]["link"][variable_01]["rel"] == "alternate") {
                            u = variable_0["feed"]["entry"][variable_00]["link"][variable_01]["href"];
                            break
                        }
                    };
                    if ("content" in variable_0["feed"]["entry"][variable_00]) {
                        var variable_0a = variable_0["feed"]["entry"][variable_00]["content"]["$t"]
                    } else {
                        if ("summary" in b_rc) {
                            var variable_0a = variable_0["feed"]["entry"][variable_00]["summary"]["$t"]
                        } else {
                            var variable_0a = ""
                        }
                    };
                    var variable_0b = /<\S[^>]*>/g;
                    variable_0a = variable_0a["replace"](variable_0b, ""), variable_0a["length"] > 120 && (variable_0a = "" + variable_0a["substring"](0, 100) + "...");
                    var variable_02 = variable_0["feed"]["entry"][variable_00]["title"]["$t"];
                    var s = variable_0["feed"]["entry"][variable_00]["category"][0]["term"];
                    var variable_0c = variable_0["feed"]["entry"][variable_00]["author"][0]["name"]["$t"];
                    var variable_0e = variable_0["feed"]["entry"][variable_00]["published"]["$t"],
                        variable_0f = variable_0e["substring"](0, 4),
                        variable_10 = variable_0e["substring"](5, 7),
                        variable_11 = variable_0e["substring"](8, 10),
                        variable_12 = month_format[parseInt(variable_10, 10)] + " " + variable_11 + ", " + variable_0f;
                    var variable_04 = variable_0["feed"]["entry"][variable_00]["content"]["$t"];
                    var variable_05 = $("<div>")["html"](variable_04);
                    if (variable_04["indexOf"]("//www.youtube.com/embed/") > -1) {
                        var variable_3 = variable_0["feed"]["entry"][variable_00]["media$thumbnail"]["url"];
                        var variable_2 = variable_3
                    } else {
                        if (variable_04["indexOf"]("<img") > -1) {
                            var variable_06 = variable_05["find"]("img:first")["attr"]("src");
                            var variable_2 = variable_06
                        } else {
                            var variable_2 = no_image
                        }
                    };
                    if (variable_00 == 0) {
                        variable_12 += "<div class=\"ty-first\"><div class=\"ty-feat-image\"><div class=\"tyard-thumb\"><a class=\"ty-img\" href=\"" + u + "\" style=\"background:url(" + variable_2 + ") no-repeat center center;background-size: cover\"><span class=\"tyimg-lay\"/></a><div class=\"yard-label\"><a class=\"icon " + s + "\" href=\"/search/label/" + s + "\">" + s + "</a></div></div><div class=\"ty-con-yard\"><h3 class=\"tyard-title\"><a href=\"" + u + "\">" + variable_02 + "</a></h3><span class=\"yard-auth-ty\">" + variable_0c + "</span><span class=\"ty-time\">" + variable_12 + "</span></div></div></div>"
                    } else {
                        variable_12 += "<div class=\"ty-rest\"><div class=\"tyard-thumb\"><a class=\"yard-img\" href=\"" + u + "\" style=\"background:url(" + variable_2 + ") no-repeat center center;background-size: cover\"><span class=\"tyimg-lay\"/></a></div><div class=\"yard-tent-ty\"><h3 class=\"tyard-title\"><a href=\"" + u + "\">" + variable_02 + "</a></h3><span class=\"ty-time\">" + variable_12 + "</span></div><div class=\"clear\"/></div>"
                    }
                };
                variable_12 += "</div>";
                $(".featured .HTML .widget-content")["each"](function() {
                    var variable_4 = $(this)["parent"]()["attr"]("id");
                    if (variable_4 == variable_14) {
                        $(this)["html"](variable_12);
                        $(this)["parent"]()["addClass"]("tyard");
                        $(this)["parent"]()["addClass"]("templatesyard");
                        $(".featured")["addClass"]("comload")["removeClass"]("preload");
                        $(this)["find"](".yard-img,.ty-img")["each"](function() {
                            $(this)["attr"]("style", function(variable_00, variable_13) {
                                return variable_13["replace"]("/default.jpg", "/mqdefault.jpg")
                            })["attr"]("style", function(variable_00, variable_13) {
                                return variable_13["replace"]("s72-c", "s1600")
                            })
                        })
                    }
                })
            }
        })
    }
});
$(".post-home-image .post-thumb a")["attr"]("style", function(variable_15, variable_0f) {
    if (variable_0f["match"]("hqdefault.jpg")) {
        return variable_0f["replace"]("/hqdefault.jpg", "/mqdefault.jpg")
    } else {
        if (variable_0f["match"]("default.jpg")) {
            return variable_0f["replace"]("/default.jpg", "/mqdefault.jpg")
        } else {
            if (variable_0f["match"]("s72-c")) {
                return variable_0f["replace"]("/s72-c", "/s1600")
            } else {
                if (variable_0f["match"]("w72-h72-p-nu")) {
                    return variable_0f["replace"]("/w72-h72-p-nu", "/s1600")
                } else {
                    if (variable_0f["match"](/s\B\d{2,4}/)) {
                        return variable_0f["replace"](/s\B\d{2,4}/, "s" + 1600)
                    } else {
                        return variable_0f["replace"]("http://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s1600-r/nth.png", no_image)
                    }
                }
            }
        }
    }
});
$(document)["ready"](function() {
    var variable_07 = $("#sidetabs #tabside1 .widget h2")["text"]();
    $(".menu-tab .item-1 a")["text"](variable_07);
    var u = $("#sidetabs #tabside2 .widget h2")["text"]();
    $(".menu-tab .item-2 a")["text"](u);
    var variable_10 = $("#sidetabs #tabside3 .widget h2")["text"]();
    $(".menu-tab .item-3 a")["text"](variable_10);
    $("#tabside1 .widget h2,#tabside2 .widget h2,#tabside3 .widget h2,#tabside1 .widget-title,#tabside2 .widget-title,#tabside3 .widget-title")["remove"]();
    $(this)["find"](".menu-tab li")["addClass"]("hide-tab");
    $(".sidetabs")["tabslet"]({
        mouseevent: "click",
        attribute: "href",
        animation: true
    });
    if (0 === $(".sidetabs .widget")["length"]) {
        $(".sidetabs")["remove"]()
    }
});
$(document)["ready"](function() {
    $(".cmm-tabs")["simplyTab"]({
        active: 1,
        fx: "fade",
        showSpeed: 400,
        hideSpeed: 400
    });
    $(".blogger-tab")["append"]($("#comments"));
    $(".cmm-tabs.simplyTab .wrap-tab")["wrap"]("<div class='cmm-tabs-header'/>")
});
$(".PopularPosts ul li img")["attr"]("src", function(variable_15, variable_16) {
    if (variable_16["match"]("hqdefault.jpg")) {
        return variable_16["replace"]("/hqdefault.jpg", "/mqdefault.jpg")
    } else {
        if (variable_16["match"]("default.jpg")) {
            return variable_16["replace"]("/default.jpg", "/mqdefault.jpg")
        } else {
            if (variable_16["match"]("s72-c")) {
                return variable_16["replace"]("/s72-c", "/s1600")
            } else {
                if (variable_16["match"]("w72-h72-p-nu")) {
                    return variable_16["replace"]("/w72-h72-p-nu", "/s1600")
                } else {
                    if (t["match"](/s\B\d{2,4}/)) {
                        return t["replace"](/s\B\d{2,4}/, "s" + 1600)
                    } else {
                        return variable_16["replace"]("http://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s1600-r/nth.png", no_image)
                    }
                }
            }
        }
    }
});
$(document)["ready"](function() {
    $("span[name=\"author-social\"]")["before"]($(".post-author-social .widget-content")["html"]());
    $(".post-author-social .widget-content")["html"]("");
    $("span[name=\"author-post\"]")["before"]($(".post-author-widget .widget-content")["html"]());
    $(".post-author-widget .widget-content")["html"]("");
    $("a[name=\"ad-post-top\"]")["before"]($("#adwidegt2 .widget-content")["html"]());
    $("#adwidegt2 .widget-content")["html"]("");
    $("a[name=\"ad-post-bottom\"]")["before"]($("#adwidegt3 .widget-content")["html"]());
    $("#adwidegt3 .widget-content")["html"]("")
});
$(".ty-trigger .HTML .widget-content span.latestcomments")["each"](function() {
    var variable_9 = $(this)["attr"]("data-no");
    $["ajax"]({
        url: "/feeds/comments/default?alt=json-in-script&max-results=" + variable_9,
        type: "get",
        dataType: "jsonp",
        success: function(variable_0) {
            var u = "";
            var variable_12 = "<div class=\"tyard-komet\">";
            for (var variable_00 = 0; variable_00 < variable_0["feed"]["entry"]["length"]; variable_00++) {
                if (variable_00 == variable_0["feed"]["entry"]["length"]) {
                    break
                };
                for (var variable_01 = 0; variable_01 < variable_0["feed"]["entry"][variable_00]["link"]["length"]; variable_01++) {
                    if (variable_0["feed"]["entry"][variable_00]["link"][variable_01]["rel"] == "alternate") {
                        u = variable_0["feed"]["entry"][variable_00]["link"][variable_01]["href"];
                        break
                    }
                };
                if ("content" in variable_0["feed"]["entry"][variable_00]) {
                    var variable_04 = variable_0["feed"]["entry"][variable_00]["content"]["$t"]
                } else {
                    if ("summary" in b_rc) {
                        var variable_04 = variable_0["feed"]["entry"][variable_00]["summary"]["$t"]
                    } else {
                        var variable_04 = ""
                    }
                };
                var variable_17 = /<\S[^>]*>/g;
                variable_04 = variable_04["replace"](variable_17, "");
                if (variable_04["length"] > 70) {
                    variable_04 = "" + variable_04["substring"](0, 50) + "..."
                };
                var variable_0c = variable_0["feed"]["entry"][variable_00]["author"][0]["name"]["$t"];
                var variable_18 = variable_0["feed"]["entry"][variable_00]["author"][0]["gd$image"]["src"];
                if (variable_18["match"]("http://img1.blogblog.com/img/blank.gif")) {
                    var variable_2 = "http://img1.blogblog.com/img/anon36.png"
                } else {
                    if (variable_18["match"]("http://img2.blogblog.com/img/b16-rounded.gif")) {
                        var variable_2 = "http://img1.blogblog.com/img/anon36.png"
                    } else {
                        var variable_2 = variable_18
                    }
                };
                variable_12 += "<div class=\"ty-komet\"><div class=\"ty-komet-tar\"><img class=\"yardimg-komet\" src=\"" + variable_2 + "\"/></div><a href=\"" + u + "\">" + variable_0c + "</a><span>\"" + variable_04 + "\"</span></div>"
            };
            variable_12 += "</div><div class=\"clear\"/>";
            $(".ty-trigger .HTML .widget-content span.latestcomments")["each"](function() {
                var variable_4 = $(this)["attr"]("data-no");
                if (variable_4 == variable_9) {
                    $(this)["parent"]()["html"](variable_12)
                }
            })
        }
    })
});
$(".ty-trigger .HTML .widget-content span.latestposts")["each"](function() {
    var variable_9 = $(this)["attr"]("data-no");
    $["ajax"]({
        url: "/feeds/posts/default?alt=json-in-script&max-results=" + variable_9,
        type: "get",
        dataType: "jsonp",
        success: function(variable_0) {
            var u = "";
            var variable_12 = "<div class=\"ty-bonus\">";
            for (var variable_00 = 0; variable_00 < variable_0["feed"]["entry"]["length"]; variable_00++) {
                for (var variable_01 = 0; variable_01 < variable_0["feed"]["entry"][variable_00]["link"]["length"]; variable_01++) {
                    if (variable_0["feed"]["entry"][variable_00]["link"][variable_01]["rel"] == "alternate") {
                        u = variable_0["feed"]["entry"][variable_00]["link"][variable_01]["href"];
                        break
                    }
                };
                var variable_02 = variable_0["feed"]["entry"][variable_00]["title"]["$t"];
                var s = variable_0["feed"]["entry"][variable_00]["category"][0]["term"];
                var variable_0c = variable_0["feed"]["entry"][variable_00]["author"][0]["name"]["$t"];
                var variable_0e = variable_0["feed"]["entry"][variable_00]["published"]["$t"],
                    variable_0f = variable_0e["substring"](0, 4),
                    variable_10 = variable_0e["substring"](5, 7),
                    variable_11 = variable_0e["substring"](8, 10),
                    variable_12 = month_format[parseInt(variable_10, 10)] + " " + variable_11 + ", " + variable_0f;
                var variable_04 = variable_0["feed"]["entry"][variable_00]["content"]["$t"];
                var variable_05 = $("<div>")["html"](variable_04);
                if (variable_04["indexOf"]("//www.youtube.com/embed/") > -1) {
                    var variable_3 = variable_0["feed"]["entry"][variable_00]["media$thumbnail"]["url"]["replace"]("/default.jpg", "/mqdefault.jpg");
                    var variable_2 = variable_3
                } else {
                    if (variable_04["indexOf"]("<img") > -1) {
                        var variable_06 = variable_05["find"]("img:first")["attr"]("src")["replace"]("s72-c", "s1600");
                        var variable_2 = variable_06
                    } else {
                        var variable_2 = no_image
                    }
                };
                variable_12 += "<div class=\"ty-wow\"><a class=\"ty-thumb-bonos\" href=\"" + u + "\" style=\"background:url(" + variable_2 + ") no-repeat center center;background-size: cover\"><span class=\"tyimg-lay\"/></a><div class=\"ty-bonus-con\"><h3 class=\"ty-bonos-entry\"><a href=\"" + u + "\">" + variable_02 + "</a></h3><span class=\"yard-auth-ty\">" + variable_0c + "</span><span class=\"ty-time\">" + variable_12 + "</span></div></div>"
            };
            variable_12 += "</div>";
            $(".ty-trigger .HTML .widget-content span.latestposts")["each"](function() {
                var variable_4 = $(this)["attr"]("data-no");
                if (variable_4 == variable_9) {
                    $(this)["parent"]()["html"](variable_12)
                }
            })
        }
    })
});
$(".ty-trigger .HTML .widget-content span.tagpost")["each"](function() {
    var variable_10 = $(this)["attr"]("data-label"),
        variable_9 = $(this)["attr"]("data-no");
    $["ajax"]({
        url: "/feeds/posts/default/-/" + variable_10 + "?alt=json-in-script&max-results=" + variable_9,
        type: "get",
        dataType: "jsonp",
        success: function(variable_0) {
            var u = "";
            var variable_12 = "<div class=\"ty-bonus\">";
            for (var variable_00 = 0; variable_00 < variable_0["feed"]["entry"]["length"]; variable_00++) {
                for (var variable_01 = 0; variable_01 < variable_0["feed"]["entry"][variable_00]["link"]["length"]; variable_01++) {
                    if (variable_0["feed"]["entry"][variable_00]["link"][variable_01]["rel"] == "alternate") {
                        u = variable_0["feed"]["entry"][variable_00]["link"][variable_01]["href"];
                        break
                    }
                };
                var variable_02 = variable_0["feed"]["entry"][variable_00]["title"]["$t"];
                var s = variable_0["feed"]["entry"][variable_00]["category"][0]["term"];
                var variable_0c = variable_0["feed"]["entry"][variable_00]["author"][0]["name"]["$t"];
                var variable_0e = variable_0["feed"]["entry"][variable_00]["published"]["$t"],
                    variable_0f = variable_0e["substring"](0, 4),
                    variable_10 = variable_0e["substring"](5, 7),
                    variable_11 = variable_0e["substring"](8, 10),
                    variable_12 = month_format[parseInt(variable_10, 10)] + " " + variable_11 + ", " + variable_0f;
                var variable_04 = variable_0["feed"]["entry"][variable_00]["content"]["$t"];
                var variable_05 = $("<div>")["html"](variable_04);
                if (variable_04["indexOf"]("//www.youtube.com/embed/") > -1) {
                    var variable_3 = variable_0["feed"]["entry"][variable_00]["media$thumbnail"]["url"]["replace"]("/default.jpg", "/mqdefault.jpg");
                    var variable_2 = variable_3
                } else {
                    if (variable_04["indexOf"]("<img") > -1) {
                        var variable_06 = variable_05["find"]("img:first")["attr"]("src")["replace"]("s72-c", "s1600");
                        var variable_2 = variable_06
                    } else {
                        var variable_2 = no_image
                    }
                };
                variable_12 += "<div class=\"ty-wow\"><a class=\"ty-thumb-bonos\" href=\"" + u + "\" style=\"background:url(" + variable_2 + ") no-repeat center center;background-size: cover\"><span class=\"tyimg-lay\"/></a><div class=\"ty-bonus-con\"><h3 class=\"ty-bonos-entry\"><a href=\"" + u + "\">" + variable_02 + "</a></h3><span class=\"yard-auth-ty\">" + variable_0c + "</span><span class=\"ty-time\">" + variable_12 + "</span></div></div>"
            };
            variable_12 += "</div>";
            $(".ty-trigger .HTML .widget-content span.tagpost")["each"](function() {
                var variable_4 = $(this)["attr"]("data-label");
                if (variable_4 == variable_10) {
                    $(this)["parent"]()["html"](variable_12)
                }
            })
        }
    })
});
$(document)["ready"](function() {
    $("span[name=\"author-social\"]")["before"]($(".post-author-social .widget-content")["html"]());
    $(".post-author-social .widget-content")["html"]("");
    $("span[name=\"author-post\"]")["before"]($(".post-author-widget .widget-content")["html"]());
    $(".post-author-widget .widget-content")["html"]("")
});
$(".ty-comment")["click"](function() {
    $("html, body")["animate"]({
        scrollTop: $("#put-your-comment")["offset"]()["top"]
    }, 1000)
});
$(document)["ready"](function() {
    function variable_19(variable_02, variable_0, variable_12) {
        $["ajax"]({
            url: "/feeds/posts/default/-/" + variable_0 + "?alt=json-in-script&max-results=" + variable_12,
            type: "get",
            dataType: "jsonp",
            success: function(variable_0f) {
                for (var u = "", variable_12 = "<div class=\"related\">", variable_6 = 0; variable_6 < variable_0f["feed"]["entry"]["length"]; variable_6++) {
                    for (var variable_7 = 0; variable_7 < variable_0f["feed"]["entry"][variable_6]["link"]["length"]; variable_7++) {
                        if ("alternate" == variable_0f["feed"]["entry"][variable_6]["link"][variable_7]["rel"]) {
                            u = variable_0f["feed"]["entry"][variable_6]["link"][variable_7]["href"];
                            break
                        }
                    };
                    var variable_3 = variable_0f["feed"]["entry"][variable_6]["title"]["$t"];
                    var variable_04 = variable_0f["feed"]["entry"][variable_6]["content"]["$t"];
                    var variable_0c = $("<div>")["html"](variable_04);
                    if (variable_04["indexOf"]("http://www.youtube.com/embed/") > -1 || variable_04["indexOf"]("https://www.youtube.com/embed/") > -1) {
                        var variable_0e = variable_0f["feed"]["entry"][variable_6]["media$thumbnail"]["url"],
                            variable_1a = variable_0e["replace"]("/default.jpg", "/mqdefault.jpg"),
                            variable_2 = variable_1a
                    } else {
                        if (variable_04["indexOf"]("<img") > -1) {
                            var s = variable_0c["find"]("img:first")["attr"]("src"),
                                variable_10 = s["replace"]("s72-c", "s600");
                            var variable_2 = variable_10
                        } else {
                            var variable_2 = "http://1.bp.blogspot.com/-eAeO-DYJDws/Vkqtj4HFBFI/AAAAAAAAB0o/Q5OLsyONXM0/s1600-r/nth.png"
                        }
                    };
                    variable_12 += "<li><div class=\"related-thumb\"><a class=\"related-img\" href=\"" + u + "\" style=\"background:url(" + variable_2 + ") no-repeat center center;background-size: cover\"/></div><h3 class=\"related-title\"><a href=\"" + u + "\">" + variable_3 + "</a></h3></li>"
                };
                variable_12 += "</div>", variable_02["html"](variable_12)
            }
        })
    }
    $("#related-posts")["each"](function() {
        var variable_02 = $(this),
            variable_0 = variable_02["text"](),
            variable_12 = 3;
        variable_19(variable_02, variable_0, variable_12)
    })
});
$(".Label a")["attr"]("href", function(variable_15, variable_1b) {
    return variable_1b["replace"](variable_1b, variable_1b + "?&max-results=" + perPage)
});
$(".item .post-body img")["parent"]("a")["css"]("margin", "0 auto!important");
var s = "[full_width]";
var o = "[left_sidebar]";
var u = "[right_sidebar]";
$(".post *")["replaceText"](s, "<style>@media screen and (min-width: 980px){.item #main-wrapper{width:100% !important;max-width:100%!important;float:none!important;border-right:0!important;border-left:0!important}.item #sidebar-wrapper{display:none;}.item #main-wrapper #main{margin-left:0!important;margin-right:0!important}}</style>");
$(".post-body *")["replaceText"](o, "<style>@media screen and (min-width: 980px){.item #main-wrapper{float:right!important;border-right:0!important;margin-right: 0px !important;}.item #sidebar-wrapper{float:left!important;padding-left:0!important;}}</style>");
$(".post-body *")["replaceText"](u, "<style>@media screen and (min-width: 980px){.item #main-wrapper{float:left!important;border-right:0!important;margin-right: 0px !important;}.item #sidebar-wrapper{float:right!important;padding-left:0!important;}}</style>")
