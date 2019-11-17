function storemodal(e, t) {
    this.mapobj = null, this.stores = t, this.currentstores = null, this.init = function() {
        var t = this;
        e.length && (googlemaps.initialized ? t.setup() : site.body.on("googlemaps:loaded", function() {
            t.setup()
        }))
    }, this.setup = function() {
        this.mapobj = e.mapInstance(), googlemaps.resize(this.mapobj), this.mapobj && this.populate(this.stores)
    }, this.reset = function() {
        this.populate(this.stores)
    }, this.populate = function(t) {
        this.currentstores = t, googlemaps.clear(this.mapobj);
        var o = this;
        $.each(t, function(t, i) {
            googlemaps.addMarker(o.mapobj, parseFloat(i.coordinate_x), parseFloat(i.coordinate_y), i.branch_name, !1, "store_" + i.id, !1, function() {
                e.trigger("stores:selected", [i.id])
            })
        }), googlemaps.fitCenter(o.mapobj)
    }, this.filter = function(e, t, o) {
        isDefined(o) || (o = !1);
        var i = this.filter_return(e, t, o);
        return this.populate(i), i
    }, this.filter_return = function(e, t, o) {
        var i = this.stores;
        return !0 === t && (i = this.currentstores), isDefined(o) || (o = !1), $.grep(i, function(t, i) {
            var s = !0;
            return $.each(e, function(e, i) {
                if ("object" == $.type(i)) $.each(i, function(i, n) {
                    if (0 == o) t[e][i] != n && (s = !1);
                    else {
                        new RegExp(n, "i").test(t[e][i]) || (s = !1)
                    }
                });
                else if (0 == o) t[e] != i && (s = !1);
                else {
                    var n = new RegExp(i, "i");
                    n.test(t[e]) || (s = !1)
                }
            }), s
        })
    }, this.focus = function(e) {
        1 == this.filter_return({
            id: e
        }, !0).length && googlemaps.focus(this.mapobj, "store_" + e, !0)
    }, this.focusCity = function(e) {
        var t = {
            query: e,
            fields: ["geometry"]
        };
        googlemaps.placesService.findPlaceFromQuery(t, function(e, t) {
            t == google.maps.places.PlacesServiceStatus.OK && googlemaps.focusCity(storesmodal.instance.getMapObj(), e[0].geometry.location)
        })
    }, this.getMapObj = function() {
        return this.mapobj
    }, this.setstores = function(e) {
        this.stores = e
    }, this.finduser = function(t) {
        var o = this;
        googlemaps.getLocation(function(i) {
            if (!1 !== i) {
                if (isDefined(t)) var s = {
                    id: t
                };
                else var s = o.neareststore(i.lat, i.lng);
                var n = o.filter_return({
                    id: s.id
                });
                if (n.length)
                    if (googlemaps.addMarker(o.mapobj, i.lat, i.lng, "Konumunuz", "Konumunuz", "user_currentposition", {
                            path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
                            fillColor: "#FFF",
                            fillOpacity: .8,
                            strokeColor: "#36bc9b",
                            strokeWeight: 4,
                            scale: .9
                        }), googlemaps.fitCenter(o.mapobj, ["user_currentposition", "store_" + n[0].id]), isDefined(t)) {
                        var a = new google.maps.LatLng(i.lat, i.lng),
                            r = o.mapobj.markers["store_" + n[0].id].markerobj.position,
                            l = new google.maps.LatLng(r.lat(), r.lng());
                        googlemaps.wayPoint([a, l])
                    } else googlemaps.showinfo(o.mapobj, "store_" + n[0].id, "<h3>(Size En Yakın Şok Market)</h3><h2>" + n[0].branch_name + "</h2><p>" + n[0].address + "</p><p>" + n[0].phone_number + "</p>"), e.trigger("stores:selected", [n[0].id])
            }
        })
    }, this.neareststore = function(e, t) {
        var o = 99999,
            s = !1;
        for (i = 0; i < this.stores.length; ++i) {
            var n = this.PythagorasEquirectangular(e, t, this.stores[i].coordinate_x, this.stores[i].coordinate_y);
            n < o && (s = this.stores[i], o = n)
        }
        return s
    }, this.Deg2Rad = function(e) {
        return e * Math.PI / 180
    }, this.PythagorasEquirectangular = function(e, t, o, i) {
        e = this.Deg2Rad(e), o = this.Deg2Rad(o), t = this.Deg2Rad(t), i = this.Deg2Rad(i);
        var s = (i - t) * Math.cos((e + o) / 2),
            n = o - e;
        return 6371 * Math.sqrt(s * s + n * n)
    }, this.init()
}

function confirm(e, t, o, i) {
    if (!isDefined(i)) var i = "Onayla";
    modals.dialog(e, t, [{
        text: "Vazgeç",
        classes: "wide darkgray",
        key: !1
    }, {
        text: i,
        classes: "wide green",
        key: !0
    }], function(e) {
        $.isFunction(o) && o(e)
    })
}

function isDefined(e) {
    return void 0 !== e && !1 !== e
}

function currency(e) {
    if (e = parseFloat(e), !isFinite(e) || !e && 0 !== e) return !1;
    var t = Math.abs(e).toFixed(2);
    return t = t.split("."), [t[0], t[1]]
}

function mixin() {
    var e = [];
    for (var t in arguments) e.push(_.get(window, "mixins." + arguments[t], {}));
    return e
}

function printElement(e, t) {
    var o = window.open("", "PRINT");
    return o.document.write("<html><head><title>" + e + "</title>"), o.document.write("</head><body >"), o.document.write(document.getElementById(t).innerHTML), o.document.write("</body></html>"), o.document.close(), o.focus(), o.print(), o.close(), !0
}

function getJsonFromUrl() {
    var e = location.search.substr(1),
        t = {};
    return e.split("&").forEach(function(e) {
        var o = e.split("=");
        t[o[0]] = decodeURIComponent(o[1])
    }), t
}

function checkRegisterModalEnabled() {
    $("#modal_login").hasClass("enabled") && (site.openRegisterModal = !0)
}

function closeRegisterTerms() {
    site.openRegisterModal ? (modals.show("modal_login"), site.openRegisterModal = !1) : modals.hide()
}
var site = {
        html: null,
        body: null,
        header: null,
        cssTimeout: 30,
        scrollTop: 0,
        scrollTimer: null,
        windowWidth: 0,
        currentOpenModalStore: null,
        openRegisterModal: !1,
        storesurl: "/api/v1/stores/search",
        selectedStore: window.localStorage.getItem("store") ? JSON.parse(window.localStorage.getItem("store")) : null,
        isStoreSelected: !!window.localStorage.getItem("store"),
        init: function() {
            site.html = $("html"), site.body = $("body", site.html), site.header = $("header:first", site.body), site.windowWidth = $(window).width(), compatibility.check(), sliders.init(), listing.init(), topMenu.init(), selectBoxes.init(), numberBox.init(), productDetail.init(), clickShow.init(), scrollBars.init(), accordions.init(), forms.init(), messenger.init(), modals.init(), basketBar.init(), checkout.init(), tooltips.init(), googlemaps.init(), searchArea.init(), productBoxes.init(), expandBanners.init(), mobileMenu.init(), site.body.trigger("initialized"), site.body.hasClass("demo") && (window.CDN_URL = "//cdnd.toyzzshop.com", demo.init()), site.resize()
        },
        resize: function() {
            site.windowWidth = $(window).width(), accordions.calibrate(), listing.filters.hide(), tooltips.hideAll(), sliders.resize(), mobileMenu.resize()
        },
        load: function() {
            accordions.calibrate()
        },
        preScroll: function() {
            null === site.scrollTimer && null !== site.body && (site.scroll(), site.scrollTimer = setTimeout(function() {
                site.scroll(), site.scrollTimer = null
            }, 30))
        },
        scroll: function() {
            site.scrollTop = site.body.scrollTop(), tooltips.hideAll(), messenger.scroll()
        }
    },
    compatibility = {
        check: function() {
            compatibility.imageFit(), compatibility.ieCheck()
        },
        imageFit: function() {
            Modernizr.objectfit || $(".imagefit > img.imagefit-img[src]").each(function() {
                var e = $(this),
                    t = e.attr("src");
                e.after('<div class="' + e.attr("class") + ' fallback" style="background-image:url(' + t + ')"></div>'), e.remove()
            })
        },
        ieCheck: function() {
            (window.navigator.userAgent.indexOf("MSIE ") > 0 || navigator.userAgent.match(/Trident.*rv\:11\./)) && site.body.addClass("browser-ie")
        }
    },
    overflowFix = {
        lastscroll: null,
        scrolltarget: null,
        engage: function(e) {
            if (!site.body.hasClass("blockoverflow")) {
                var t = site.body.scrollTop();
                overflowFix.scrolltarget = site.body, 0 === t && (t = site.html.scrollTop(), overflowFix.scrolltarget = site.html), overflowFix.lastscroll = t, site.body.hasClass("scrolled") && site.body.addClass("scrolled-force"), site.body.addClass("blockoverflow")
            }
            site.body.css("margin-top", -overflowFix.lastscroll)
        },
        disengage: function(e) {
            null != overflowFix.lastscroll && (site.body.css("margin-top", ""), site.body.removeClass("blockoverflow").removeClass("scrolled-force"), overflowFix.scrolltarget.scrollTop(overflowFix.lastscroll), overflowFix.lastscroll = null)
        }
    },
    productBoxes = {
        init: function() {
            site.body.off("click", ".productbox .product-controlbutton.addtocart").on("click", ".productbox .product-controlbutton.addtocart", function() {
                productBoxes.showControls($(this).parent().parent())
            }), site.body.off("click", ".productbox .cartcontrols-close").on("click", ".productbox .cartcontrols-close", function() {
                productBoxes.hideControls($(this).parent().parent())
                
            })
        },
        showControls: function(e) {
            productBoxes.hideControls();
            var t = $(".product-cartcontrols", e);
            t.addClass("active"), setTimeout(function() {
                t.addClass("show")
            }, site.cssTimeout)
        },
        hideControls: function(e) {
            if (isDefined(e)) {
                var t = $(".product-cartcontrols", e);
                t.removeClass("show"), setTimeout(function() {
                    t.removeClass("active")
                }, t.transitionTime())
            } else $(".productbox .product-cartcontrols.active").each(function() {
                productBoxes.hideControls($(this).parent())
            })
        }
    },
    topMenu = {
        initialized: !1,
        container: !1,
        overlay: !1,
        expanded: !1,
        transitionTimer: !1,
        timer: null,
        hoverTimeout: 300,
        init: function() {
            $(".topmenu").length && !topMenu.initialized && (topMenu.container = $(".topmenu:first"), topMenu.overlay = $(".topmenu-overlay:first"), topMenu.initialized = !0, site.body.on("mouseenter", ".topmenu-trigger[data-menu]:not(.click)", function() {
                var e = $(this);
                menuID = e.attr("data-menu"), topMenu.timer = setTimeout(function() {
                    $(".topmenu-trigger", site.body).removeClass("hover"), e.addClass("hover"), topMenu.container.addClass("btnhover"), topMenu.show(menuID)
                }, 500)
            }), site.body.on("mouseleave", ".topmenu-trigger[data-menu]:not(.click)", function() {
                topMenu.container.removeClass("btnhover"), topMenu.hideCheck(), clearTimeout(topMenu.timer)
            }), site.body.on("click", ".topmenu-trigger[data-menu].click", function() {
                var e = $(this);
                $(".topmenu-trigger", site.body).removeClass("hover"), e.addClass("hover"), menuID = e.attr("data-menu"), topMenu.container.hasClass("show") ? topMenu.hide() : topMenu.show(menuID)
            }), topMenu.container.on("mouseenter", function() {
                topMenu.container.addClass("selfhover")
            }), topMenu.container.on("mouseleave", function() {
                topMenu.container.removeClass("selfhover"), topMenu.hideCheck()
            }), topMenu.container.on("click", ".item-button", function() {
                var e = ($(this), $(this).parent());
                e.children(".item-submenu").length && ($(".items-item", topMenu.container).removeClass("active"), e.addClass("active"))
            }), topMenu.container.on("click", ".submenu-button", function() {
                var e = ($(this), $(this).parent());
                e.children(".item-submenu").length && ($(".submenu-item", e.parent()).removeClass("active"), e.addClass("active"))
            }))
        },
        show: function(e) {
            $(".menu-content", topMenu.container).removeClass("active"), $(".items-item", topMenu.container).removeClass("active"), $(".submenu-item", topMenu.container).removeClass("active"), isDefined(e) ? (e = $(".menu-content#" + e, topMenu.container), e.addClass("active"), $(".items-item:first", e).addClass("active")) : ($(".menu-content:first", topMenu.container).addClass("active"), $(".menu-content:first .items-item:first", topMenu.container).addClass("active")), topMenu.container.hasClass("show") || (topMenu.container.addClass("active"), topMenu.overlay.addClass("active"), clearTimeout(topMenu.transitionTimer), topMenu.transitionTimer = setTimeout(function() {
                topMenu.container.addClass("show"), topMenu.overlay.addClass("show")
            }, site.cssTimeout))
        },
        hideCheck: function() {
            setTimeout(function() {
                topMenu.container.hasClass("btnhover") || topMenu.container.hasClass("selfhover") || topMenu.hide()
            }, topMenu.hoverTimeout)
        },
        hide: function() {
            clearTimeout(topMenu.transitionTimer), $(".topmenu-trigger", site.body).removeClass("hover"), topMenu.container.removeClass("show"), topMenu.overlay.removeClass("show"), topMenu.transitionTimer = setTimeout(function() {
                topMenu.container.removeClass("active"), topMenu.overlay.removeClass("active")
            }, topMenu.container.transitionTime())
        }
    },
    mobileMenu = {
        container: null,
        closeButton: null,
        initialized: !1,
        onTransition: !1,
        maxWidth: 640,
        init: function() {
            $("#mobilemenu").length && (mobileMenu.container = $("#mobilemenu:first"), mobileMenu.closeButton = $(".mobilemenu-close", mobileMenu.container), mobileMenu.menu.container = $(".menu-container", mobileMenu.container), $(".list-item", mobileMenu.menu.container).removeClass("has-sub"), $(".list-item:has(.menu-submenu)", mobileMenu.menu.container).addClass("has-sub"), $(".list-button", mobileMenu.menu.container).off("click").on("click", function() {
                mobileMenu.menu.showItem($(this).parent())
            }), $(".submenu-back", mobileMenu.menu.container).off("click").on("click", function() {
                mobileMenu.menu.backLink($(this))
            }), mobileMenu.closeButton.off("click").on("click", function() {
                mobileMenu.hide()
            }), $(".mobilemenu-trigger").off("click").on("click", function() {
                mobileMenu.show()
            }), mobileMenu.initialized = !0)
        },
        show: function() {
            mobileMenu.initialized && !mobileMenu.onTransition && (mobileMenu.onTransition = !0, overflowFix.engage(), setTimeout(function() {
                mobileMenu.container.addClass("active"), setTimeout(function() {
                    mobileMenu.container.addClass("show"), mobileMenu.onTransition = !1
                }, site.cssTimeout)
            }, site.cssTimeout))
        },
        hide: function() {
            mobileMenu.initialized && !mobileMenu.onTransition && (mobileMenu.onTransition = !0, mobileMenu.container.removeClass("show"), setTimeout(function() {
                overflowFix.disengage(), mobileMenu.container.removeClass("active"), mobileMenu.onTransition = !1
            }, mobileMenu.container.transitionTime()))
        },
        resize: function() {
            mobileMenu.initialized && !mobileMenu.onTransition && site.windowWidth > mobileMenu.maxWidth && mobileMenu.hide()
        },
        menu: {
            container: null,
            containerClass: "menu-container",
            showItem: function(e) {
                if (e.children(".menu-submenu").length) {
                    var t = e.closest(".menu-list"),
                        o = mobileMenu.menu.getLevel(e);
                    $(".list-item", t).removeClass("active"), e.addClass("active"), mobileMenu.menu.setLevel(o + 1)
                }
            },
            backLink: function(e) {
                var t = mobileMenu.menu.getLevel(e);
                mobileMenu.menu.setLevel(t)
            },
            getLevel: function(e) {
                return e.parents(".menu-list").length
            },
            setLevel: function(e) {
                mobileMenu.menu.container.attr("class", mobileMenu.menu.containerClass + " level-" + e)
            }
        }
    },
    searchArea = {
        timeout: !1,
        submitDelay: 300,
        input: !1,
        init: function() {
            !searchArea.initialized && $("#searcharea").length && (searchArea.container = $("#searcharea"), searchArea.content = $(".inputwrap", searchArea.container), searchArea.results = $("#search-results", searchArea.container), searchArea.input = $("#search-input", searchArea.content), searchArea.submitbutton = $("#search-submit", searchArea.content), searchArea.input.off("input").on("input", function() {
                searchArea.setData()
            }), searchArea.submitbutton.off("click").on("click", function() {
                searchArea.submit()
            }), searchArea.input.off("keyup").on("keyup", function(e) {
                switch (e.which) {
                    case 13:
                        $(".result.active", searchArea.results).length ? window.location = $(".result.active:first", searchArea.results).attr("href") : searchArea.submit();
                        break;
                    case 27:
                        e.preventDefault(), searchArea.clear();
                        break;
                    case 38:
                        e.preventDefault(), searchArea.changefocus("up");
                        break;
                    case 40:
                        e.preventDefault(), searchArea.changefocus("down");
                        break;
                    default:
                        searchArea.setData()
                }
            }), searcharea.initialized = !0)
        },
        setData: function() {
            clearTimeout(searchArea.timeout), searchArea.timeout = setTimeout(function() {
                if (searchArea.input.val().length) {
                    var e = "/api/v1/products/search?order=rank&page=1&query=" + searchArea.input.val() + "&limit=5";
                    site.selectedStore && _.has(site.selectedStore, "id") && (e += "&store_id=" + site.selectedStore.id), searchArea.input.val().trim().length >= 3 && $.ajax({
                        url: e,
                        data: {
                            query: searchArea.input.val().trim(),
                            "category[]": "all"
                        },
                        dataType: "json",
                        success: function(e) {
                            _.has(e, "payload") && _.has(e.payload, "result") && searchArea.populate(e.payload.result)
                        }
                    })
                } else searchArea.clear()
            }, searchArea.submitDelay)
        },
        populate: function(e) {
            searchArea.results.empty();
            if (_.isArray(e.category) && e.category.length) {
                var t = $('<div class="results-group categories"></div>').appendTo(searchArea.results),
                    o = 0,
                    i = "";
                $.each(e.category, function(e, s) {
                    if (o < 3) {
                        var n = "";
                        isDefined(s.parent) && isDefined(s.parent.name) && "-" != s.parent.name ? (n = " (" + s.parent.name + ")", i = s.parent.slug + "/" + s.slug) : i = s.slug, t.append($('<a class="result category" href="/' + i + '">' + s.name + n + "</a>"))
                    }
                    o++
                })
            }
            if (_.isArray(e.products) && e.products.length) {
                var s = $('<div class="results-group products"></div>').appendTo(searchArea.results);
                $.each(e.products, function(e, t) {
                    var o = "/assets/img/default-250.jpg",
                        i = currency(t.serial_price);
                    o = _.isArray(t.files) && t.files.length ? GlobalConfig.CDN_URL + "/product/" + constants.IMAGE_SIZES.PRODUCT_THUMB + "/" + t.files[0].document_href : constants.DEFAULT_IMAGES.PRODUCT_THUMB, s.append($('<a class="productbox-mini has-add result product" href="/' + t.link_name + '"><div class="product-image-wrap"><div class="product-image imagefit fit"><img class="imagefit-img abs" src="' + o + '"></div></div><div class="product-description"><h3 class="product-title">' + t.name + '</h3></div><div class="product-addtocart"><button class="btn small green block" type="button">İncele</button></div><div class="product-price"><div class="pricebox"><div class="pricebox-content"><span class="currency pricebox-currency"></span><span class="pricebox-main">' + i[0] + '</span><span class="pricebox-decimal">' + i[1] + "</span></div></div></div></a>"))
                })
            }
            _.isArray(e.category) && e.category.length || _.isArray(e.products) && e.products.length ? (searchArea.container.addClass("search-active"), setTimeout(function() {
                searchArea.container.addClass("search-show")
            }, site.cssTimeout)) : searchArea.clear()
        },
        clear: function(e) {
            searchArea.container.removeClass("search-show"), setTimeout(function() {
                searchArea.container.removeClass("search-active"), searchArea.results.empty(), $.isFunction(e) && e()
            }, searchArea.results.transitionTime())
        },
        submit: function() {
            searchArea.input.val().length && (window.location = "/arama/" + encodeURIComponent(searchArea.input.val().trim()), setTimeout(searchArea.clear, 200))
        },
        changefocus: function(e) {
            var t = $(".result", searchArea.results).length,
                o = -1;
            $(".result.active", searchArea.results).length && (o = $(".result", searchArea.results).index($(".result.active:first", searchArea.results))), "up" == e && ("btn" == o ? o = t - 1 : --o < -1 && (o = "btn")), "down" == e && ("btn" == o ? o = -1 : ++o > t - 1 && (o = "btn")), $(".result", searchArea.results).removeClass("active"), "btn" != o && o > -1 && $(".result:eq(" + o + ")", searchArea.results).addClass("active")
        }
    },
    basketBar = {
        initialized: !1,
        container: !1,
        init: function() {
            $("#basket-bar").length && (basketBar.container = $("#basket-bar:first"), basketBar.container.off("click").on("click", function(e) {
                $(e.target).is(basketBar.container) && basketBar.hide()
            }), site.body.off("click", ".basketbar-trigger").on("click", ".basketbar-trigger", basketBar.show), basketBar.initialized = !0)
        },
        show: function() {
            basketBar.initialized && (basketBar.container.addClass("active"), setTimeout(function() {
                overflowFix.engage(), basketBar.container.addClass("show")
            }, site.cssTimeout))
        },
        hide: function() {
            basketBar.initialized && (basketBar.container.removeClass("show"), setTimeout(function() {
                overflowFix.disengage(), basketBar.container.removeClass("active")
            }, basketBar.container.transitionTime()))
        }
    },
    sliders = {
        class: "slider",
        width_macbook: 1440,
        width_larger: 1280,
        width_large: 1024,
        width_medium: 960,
        width_midi: 768,
        width_vga: 640,
        width_mini: 480,
        width_micro: 360,
        conditionalsliders: [],
        init: function() {
            $(".sliderelement").each(function() {
                var e = $(this);
                e.hasClass("slider-inited") || sliders.setup(e, function(t) {
                    e.addClass("slider-inited"), e.hasData("initafter") ? sliders.conditionalsliders.push(e) : (e.addClass("owl-carousel"), e.owlCarousel(t))
                })
            }), sliders.resize()
        },
        setup: function(e, t) {
            var o = "default";
            e.hasAttr("data-type") && (o = e.attr("data-type"), e.addClass("type-" + o));
            var i = jQuery.extend({}, sliders.types[o]);
            if (e.hasAttr("data-dots")) {
                var s = e.attr("data-dots");
                i.dots = "true" == s
            }
            if (i.dots && e.addClass("slider-dots"), e.hasAttr("data-nav")) {
                "true" == e.attr("data-nav") ? (i.nav = !0, e.hasAttr("data-navcontainer") && (i.navContainer = e.attr("data-navcontainer"))) : i.nav = !1
            }
            if (i.nav && e.addClass("slider-hasnav"), e.hasClass("no-loader") || (e.addClass("loading").addClass("loadinit").removeClass("loader"), $("img", e).each(function() {
                    $(this).addClass("owl-lazy"), $(this).attr("data-src", $(this).attr("src")), $(this).removeAttr("src")
                }), i.lazyLoad = !0, i.onLoadedLazy = function() {
                    e.removeClass("loading"), setTimeout(function() {
                        e.removeClass("loadinit")
                    }, 300)
                }), e.hasData("items")) {
                var n = e.data("items");
                $.isNumeric(n) && (i.items = parseInt(n), i.responsive = {
                    0: {
                        items: i.items
                    },
                    360: {
                        items: i.items
                    },
                    480: {
                        items: i.items
                    },
                    640: {
                        items: i.items
                    },
                    768: {
                        items: i.items
                    },
                    960: {
                        items: i.items
                    },
                    1024: {
                        items: i.items
                    },
                    1280: {
                        items: i.items
                    },
                    1440: {
                        items: i.items
                    }
                }, e.addClass("slider-items-" + n))
            }
            if (e.hasData("margin")) {
                var a = e.data("margin");
                $.isNumeric(a) && (i.margin = parseInt(a), $.each(i.responsive, function(e, t) {
                    i.responsive[e].margin = i.margin
                }))
            }
            if (e.hasData("items-macbook") && (i = sliders.setresponsive(i, sliders.width_larger, "items", e.data("items-macbook"))), e.hasData("items-larger") && (i = sliders.setresponsive(i, sliders.width_large, "items", e.data("items-larger"))), e.hasData("items-large") && (i = sliders.setresponsive(i, sliders.width_medium, "items", e.data("items-large"))), e.hasData("items-medium") && (i = sliders.setresponsive(i, sliders.width_midi, "items", e.data("items-medium"))), e.hasData("items-midi") && (i = sliders.setresponsive(i, sliders.width_vga, "items", e.data("items-midi"))), e.hasData("items-vga") && (i = sliders.setresponsive(i, sliders.width_mini, "items", e.data("items-vga"))), e.hasData("items-mini") && (i = sliders.setresponsive(i, sliders.width_micro, "items", e.data("items-mini"))), e.hasData("items-micro") && (i = sliders.setresponsive(i, null, "items", e.data("items-micro"))), e.hasData("margin-macbook") && (i = sliders.setresponsive(i, sliders.width_larger, "margin", e.data("margin-macbook"))), e.hasData("margin-larger") && (i = sliders.setresponsive(i, sliders.width_large, "margin", e.data("margin-larger"))), e.hasData("margin-large") && (i = sliders.setresponsive(i, sliders.width_medium, "margin", e.data("margin-large"))), e.hasData("margin-medium") && (i = sliders.setresponsive(i, sliders.width_midi, "margin", e.data("margin-medium"))), e.hasData("margin-midi") && (i = sliders.setresponsive(i, sliders.width_vga, "margin", e.data("margin-midi"))), e.hasData("margin-vga") && (i = sliders.setresponsive(i, sliders.width_mini, "margin", e.data("margin-vga"))), e.hasData("margin-mini") && (i = sliders.setresponsive(i, sliders.width_micro, "margin", e.data("margin-mini"))), e.hasData("margin-micro") && (i = sliders.setresponsive(i, null, "margin", e.data("margin-micro"))), e.hasData("autoplay")) {
                var r = e.data("autoplay"),
                    l = !1;
                $.isNumeric(r) && ("0" == r || "false" == r ? r = !1 : (r = !0, l = parseInt(r)), i.autoPlay = r, i.autoplayTimeout = l)
            }
            e.on("initialized.owl.carousel resized.owl.carousel", function(e) {
                $(e.target).toggleClass("hide-nav", e.item.count <= e.page.size)
            }), e.on("changed.owl.carousel", function(t) {
                var o = t.page.count,
                    i = t.page.index + 1;
                $(".owl-item", e).removeClass("activeclone"), $(".owl-item:nth-child(" + o + "n+" + i + ")", e).addClass("activeclone")
            }), e.hasAttr("data-loop") && ("true" == e.attr("data-loop") ? i.loop = !0 : i.loop = !1), e.children().length < 2 && (i.loop = !1), t(i)
        },
        types: {
            default: {
                autoplay: !0,
                autoplayTimeout: 4e3,
                autoplayHoverPause: !0,
                smartSpeed: 350,
                loop: !0,
                itemsDesktop: !1,
                itemsDesktopSmall: !1,
                itemsTablet: !1,
                itemsMobile: !1,
                navText: ['<i class="icon-nav-menu-prev></i>', '<i class="icon-nav-menu-next></i>'],
                responsive: {
                    0: {
                        items: 1
                    },
                    480: {
                        items: 1
                    },
                    768: {
                        items: 1
                    },
                    1150: {
                        items: 1
                    }
                }
            },
            banner: {
                autoplay: !0,
                autoplayTimeout: 4e3,
                autoplayHoverPause: !0,
                smartSpeed: 1e3,
                loop: !0,
                nav: !0,
                navText: ['<i class="icon-angle-left"></i>', '<i class="icon-angle-right"></i>'],
                responsive: {
                    0: {
                        items: 1
                    },
                    480: {
                        items: 1
                    },
                    768: {
                        items: 1
                    },
                    1024: {
                        items: 1
                    }
                }
            },
            carousel: {
                autoplay: !1,
                autoplayTimeout: 4e3,
                autoplayHoverPause: !0,
                smartSpeed: 350,
                loop: !0,
                margin: 20,
                navText: ['<i class="icon-nav-menu-prev"></i>', '<i class="icon-nav-menu-next"></i>'],
                dots: !0,
                responsive: {
                    0: {
                        items: 2
                    },
                    480: {
                        items: 2
                    },
                    768: {
                        items: 3
                    },
                    1024: {
                        items: 4
                    }
                }
            }
        },
        resize: function() {
            var e = site.windowWidth;
            $.each(sliders.conditionalsliders, function(t, o) {
                e <= parseInt(o.data("initafter")) ? o.hasClass("owl-carousel") || (o.addClass("owl-carousel"), sliders.setup(o, function(e) {
                    o.owlCarousel(e), o.removeClass("owl-hidden")
                })) : o.hasClass("owl-carousel") && (o.trigger("destroy.owl.carousel"), o.off("initialized.owl.carousel resized.owl.carousel"), o.removeClass("owl-carousel"), o.addClass("owl-hidden"))
            })
        },
        setresponsive: function(e, t, o, i) {
            return $.isNumeric(i) && $.each(e.responsive, function(s, n) {
                if (e.responsive[s][o] = i, s == t) return !1
            }), e
        }
    },
    listing = {
        initialized: !1,
        container: null,
        init: function() {
            $(".listing-container").length && (listing.container = $(".listing-container"), listing.filters.init(), listing.order.init(), listing.initialized = !0)
        },
        filters: {
            container: null,
            filterButton: null,
            closeButton: null,
            orderButton: null,
            init: function() {
                listing.filters.container = $(".listing-filters", listing.container), listing.filters.filterButton = $(".listing-mobiletrigger-filters", listing.container), listing.filters.closeButton = $(".filters-close", listing.container), listing.filters.filterButton.off("click").on("click", function() {
                    listing.filters.show()
                }), listing.filters.closeButton.off("click").on("click", function() {
                    listing.filters.hide()
                })
            },
            show: function() {
                listing.initialized && (overflowFix.engage(), listing.filters.container.addClass("active"), setTimeout(function() {
                    listing.filters.container.addClass("show")
                }, site.cssTimeout))
            },
            hide: function() {
                listing.initialized && (overflowFix.disengage(), listing.filters.container.removeClass("show"), setTimeout(function() {
                    listing.filters.container.removeClass("active")
                }, listing.filters.container.transitionTime()))
            }
        },
        order: {
            container: null,
            button: null,
            init: function() {
                listing.order.container = $(".toprow-order", listing.container), listing.order.button = $(".listing-mobiletrigger-order", listing.container), listing.order.button.off("click").on("click", function() {
                    listing.order.toggle()
                })
            },
            show: function() {
                listing.initialized && (listing.order.container.addClass("active"), listing.order.button.addClass("active"), setTimeout(function() {
                    listing.order.container.addClass("show")
                }, site.cssTimeout))
            },
            hide: function() {
                listing.initialized && (listing.order.container.removeClass("show"), listing.order.button.removeClass("active"), setTimeout(function() {
                    listing.order.container.removeClass("active")
                }, listing.order.container.transitionTime()))
            },
            toggle: function() {
                listing.initialized && (listing.order.container.hasClass("active") ? listing.order.hide() : listing.order.show())
            }
        }
    },
    checkout = {
        initialized: !1,
        init: function() {
            $(".checkout-order").length && (checkout.sumList.init(), checkout.initialized = !0)
        },
        sumList: {
            container: !1,
            initialized: !1,
            limit: 2,
            items: 0,
            collapseButton: !1,
            init: function() {
                $(".checkout-sum .sum-list").length && (checkout.sumList.container = $(".checkout-sum .sum-list"), checkout.sumList.items = $(".list-item", checkout.sumList.container).length, checkout.sumList.items > checkout.sumList.limit && (checkout.sumList.collapseButton = $('<button class="list-seemore"><span class="seemore-collapsed">Tüm ürünleri göster (' + checkout.sumList.items + ' ürün) <i class="icon-angle-down"></i></span><span class="seemore-expanded">Gizle <i class="icon-angle-up"></i></span></button>').off("click").on("click", checkout.sumList.toggle), checkout.sumList.container.append(checkout.sumList.collapseButton).addClass("initialized collapsed"), checkout.sumList.initialized = !0))
            },
            toggle: function() {
                checkout.sumList.initialized && (checkout.sumList.container.hasClass("collapsed") ? checkout.sumList.container.removeClass("collapsed") : checkout.sumList.container.addClass("collapsed"))
            }
        }
    },
    numberBox = {
        initialized: !1,
        init: function() {
            numberBox.initialized ? numberBox.validateAll() : (site.body.off("click", ".numberbox .number-increase").on("click", ".numberbox .number-increase", function() {
                numberBox.increase($(this).parent(".numberbox"))
            }), site.body.off("click", ".numberbox .number-decrease").on("click", ".numberbox .number-decrease", function() {
                numberBox.decrease($(this).parent(".numberbox"))
            }), site.body.off("input", ".numberbox input").on("input", ".numberbox input", function() {
                numberBox.validate($(this).parent(".numberbox"))
            }), numberBox.validateAll())
        },
        increase: function(e) {
            numberBox.validate(e, "increase")
        },
        decrease: function(e) {
            numberBox.validate(e, "decrease")
        },
        validate: function(e, t) {
            var o = $("input", e),
                i = "";
            o.hasAttr("data-after") && (i = o.attr("data-after"));
            var s = numberBox.unformatNumber(o.val()),
                n = !1,
                a = 1,
                r = 1;
            o.hasAttr("max") && (n = parseFloat(o.attr("max"))), o.hasAttr("min") && (a = parseFloat(o.attr("min"))), o.hasAttr("data-step") && (r = parseFloat(o.attr("data-step"))), $.isNumeric(s) ? (isDefined(t) && ("increase" == t ? s += r : "decrease" == t && (s -= r)), n && s > n ? s = n : s < a && (s = a)) : s = a, s == n ? e.addClass("numberbox-max") : e.removeClass("numberbox-max"), s == a ? e.addClass("numberbox-min") : e.removeClass("numberbox-min"), o.val(numberBox.formatNumber(s, i))
        },
        validateAll: function() {
            $(".numberbox").each(function() {
                numberBox.validate($(this))
            })
        },
        formatNumber: function(e, t) {
            if (isDefined(t)) t = " " + t;
            else var t = "";
            return e = Number(e.toFixed(4)).toString().replace(".", ",") + t
        },
        unformatNumber: function(e, t) {
            if (!isDefined(t)) var t = "";
            return parseFloat(e.replace(" " + t, "").replace(",", "."))
        }
    },
    tooltips = {
        initialized: !1,
        init: function() {
            $("*[data-tip]").length && ($("*[data-tip]").each(function() {
                var e = $(this),
                    t = e.attr("data-tip");
                e.tooltipsy({
                    content: t
                })
            }), tooltips.initialized = !0)
        },
        hideAll: function() {
            tooltips.initialized && $("*[data-tip]").each(function() {
                $(this).data("tooltipsy").hide()
            })
        }
    },
    productDetail = {
        container: null,
        initialized: !1,
        init: function() {
            $(".product-detail").length && (productDetail.initialized ? productDetail.destroy(function() {
                productDetail.startup()
            }) : productDetail.startup())
        },
        startup: function() {
            productDetail.container = $(".section.product-detail:first"), productDetail.gallery.init(function() {
                productDetail.zoom.init(), productDetail.initialized = !0
            })
        },
        gallery: {
            initialized: !1,
            instance: null,
            container: null,
            sourcelist: null,
            init: function(e) {
                productDetail.zoom.destroy(), productDetail.gallery.sourcelist = $(".gallery-imagelist", productDetail.container), productDetail.gallery.container = $(".gallery-slider:first", productDetail.container), productDetail.gallery.container.empty(), productDetail.gallery.sourcelist.children().each(function(e, t) {
                    if (t = $(t), t.hasAttr("data-src")) {
                        var o = t.attr("data-src");
                        t.hasAttr("data-src-big") && (o = t.attr("data-src-big")), productDetail.gallery.container.append($('<img class="slider-image" data-nth="' + e + '"src="' + t.attr("data-src") + '"data-img-big="' + o + '" />'))
                    }
                }), productDetail.gallery.container.addClass("owl-carousel").owlCarousel({
                    loop: !0,
                    nav: !1,
                    items: 1
                }), productDetail.gallery.container.on("changed.owl.carousel", function(e) {
                    setTimeout(function() {
                        var t = $(e.target).find(".owl-item.active img").data("nth");
                        productDetail.zoom.set(t)
                    }, site.cssTimeout)
                }), setTimeout(function() {
                    productDetail.gallery.loading(!1, function() {
                        $.isFunction(e) && e(), productDetail.gallery.initialized = !0
                    })
                }, 100)
            },
            destroy: function(e) {
                productDetail.gallery.initialized && (productDetail.gallery.container.off("changed.owl.carousel"), productDetail.gallery.container.trigger("destroy.owl.carousel"), productDetail.gallery.container.off("initialized.owl.carousel resized.owl.carousel"), productDetail.gallery.container.removeClass("owl-carousel"), productDetail.gallery.container.empty(), $.isFunction(e) && e())
            },
            loading: function(e, t) {
                null != productDetail.container && (e ? ($(".detail-gallery", productDetail.container).addClass("loadinit"), setTimeout(function() {
                    $(".detail-gallery", productDetail.container).addClass("loading"), setTimeout(function() {
                        $.isFunction(t) && t()
                    }, 200)
                }, site.cssTimeout)) : ($(".detail-gallery", productDetail.container).removeClass("loading"), setTimeout(function() {
                    $(".detail-gallery", productDetail.container).removeClass("loadinit"), $.isFunction(t) && t()
                }, 200)))
            }
        },
        zoom: {
            initialized: !1,
            button_open: null,
            button_close: null,
            button_zoomin: null,
            button_zoomout: null,
            object: null,
            instance: null,
            items: null,
            init: function() {
                productDetail.zoom.object = $('<section class="tns" id="gallery-zoom"><div class="sliderHolder" data-elem="sliderHolder"><div class="slider" id="gallery-zoom-instancecontainer" data-elem="slider" data-options="" data-show="" data-hide=""><div class="slides" data-elem="slides" data-options=""></div></div></div></section>'), productDetail.zoom.button_close = $('<button class="gallery-zoom-button close icon-close"></button>'), productDetail.zoom.button_zoomin = $('<button class="gallery-zoom-button zoomin icon-plus"></button>'), productDetail.zoom.button_zoomout = $('<button class="gallery-zoom-button zoomout icon-minus"></button>'), productDetail.zoom.items = $('<ul data-elem="items"></ul>'), productDetail.zoom.object.prepend(productDetail.zoom.button_close, productDetail.zoom.button_zoomin, productDetail.zoom.button_zoomout), productDetail.gallery.sourcelist.children().each(function() {
                    var e = $(this).attr("data-src-big");
                    productDetail.zoom.items.append('<li><img src="' + e + '" /></li>')
                }), $(".slides", productDetail.zoom.object).append(productDetail.zoom.items), site.body.append(productDetail.zoom.object), productDetail.gallery.container.off("click", ".slider-image").on("click", ".slider-image", function() {
                    overflowFix.engage(), productDetail.zoom.show()
                }), productDetail.zoom.button_close.off("click").on("click", function() {
                    overflowFix.disengage(), productDetail.zoom.hide()
                }), productDetail.zoom.button_zoomin.off("click").on("click", function() {
                    productDetail.zoom.instance.zoomIn()
                }), productDetail.zoom.button_zoomout.off("click").on("click", function() {
                    productDetail.zoom.instance.zoomOut()
                }), $(TouchNSwipe.init), productDetail.zoom.instance = TouchNSwipe.getSlider("gallery-zoom-instancecontainer"), productDetail.zoom.initialized = !0
            },
            show: function() {
                productDetail.zoom.initialized && productDetail.zoom.object.addClass("active")
            },
            hide: function() {
                productDetail.zoom.initialized && productDetail.zoom.object.removeClass("active")
            },
            set: function(e) {
                productDetail.zoom.initialized && productDetail.zoom.instance.index(e, !1)
            },
            destroy: function() {
                productDetail.zoom.initialized && ($(TouchNSwipe.removeAll()), productDetail.zoom.button_close.off("click"), productDetail.zoom.object.remove(), productDetail.zoom.initialized = !1)
            }
        },
        destroy: function(e) {
            productDetail.gallery.loading(!0, function() {
                productDetail.zoom.destroy(), productDetail.gallery.destroy(), productDetail.initialized = !1, $.isFunction(e) && e()
            })
        }
    },
    clickShow = {
        init: function() {
            $("body").off("click", ".clickshow").on("click", ".clickshow", function() {
                clickShow.toggle($(this))
            })
        },
        toggle: function(e) {
            if (e.hasData("subject")) {
                var t = $("#" + e.data("subject") + ".clickshow-subject");
                t.hasClass("show") ? e.hasClass("notoggle") ? clickShow.show(t) : clickShow.hide(t) : clickShow.show(t)
            } else e.hasClass("expanded") && !e.hasClass("notoggle") ? e.removeClass("expanded") : e.addClass("expanded");
            if (e.hasData("clickshow-group")) {
                var o = e.data("clickshow-group"),
                    i = "",
                    s = "";
                e.hasData("subject") && (s = '[data-subject="' + t.attr("id") + '"]', i = ":not(" + s + ")", $('option.clickshow[data-clickshow-group="' + o + '"]' + s).each(function() {
                    $(this).is(":selected") || ($(this).prop("selected", !0), selectBoxes.check($(this).parent("select")))
                })), $('.clickshow[data-clickshow-group="' + o + '"]' + i).each(function() {
                    $(this).is("option") || ($(this).is(e) || $(this).removeClass("expanded"), $(this).hasData("subject") && $("#" + $(this).data("subject")).length && clickShow.hide($("#" + $(this).data("subject"))))
                })
            }
        },
        toggleByID: function(e) {
            var t = $('.clickshow[data-subject="' + e + '"]:first');
            if (t.length) clickShow.toggle(t);
            else {
                var o = $("#" + e + ".clickshow-subject");
                o.hasClass("enable") ? clickShow.hide(o) : clickShow.show(o)
            }
        },
        show: function(e) {
            site.body.unbind("click", clickShow.outerClick), $(".clickshow-subject.clickshow-outerclick.enable").each(function() {
                clickShow.hide($(this))
            }), e.hasClass("noanim") ? (e.addClass("show").addClass("enable"), $('.clickshow[data-subject="' + e.attr("id") + '"]').addClass("expanded")) : (e.addClass("enable"), setTimeout(function() {
                e.addClass("show"), $('.clickshow[data-subject="' + e.attr("id") + '"]').addClass("expanded")
            }, 5)), e.hasClass("clickshow-outerclick") && setTimeout(function() {
                site.body.bind("click", e, clickShow.outerClick)
            }, 20)
        },
        hide: function(e) {
            e.hasClass("noanim") ? (e.removeClass("show").removeClass("enable"), $('.clickshow[data-subject="' + e.attr("id") + '"]').removeClass("expanded")) : (e.removeClass("show"), $('.clickshow[data-subject="' + e.attr("id") + '"]').removeClass("expanded"), setTimeout(function() {
                e.removeClass("enable")
            }, e.transitionTime()))
        },
        outerClick: function(e) {
            e.target == e.data[0] || e.data[0].contains(e.target) || (site.body.unbind("click", clickShow.outerClick), clickShow.hide(e.data))
        }
    },
    forms = {
        init: function() {
            $(".inputform").each(function(e, t) {
                forms.initform($(t))
            })
        },
        initform: function(e) {
            $("input, textarea", e).each(function() {
                var e = $(this),
                    t = e.parent();
                if (e.is("input")) t.addClass("type-" + e.attr("type"));
                else if (e.is("textarea") && (t.addClass("type-textarea"), e.hasAttr("maxlength")))
                    if ($(".text-counter", t).length) forms.checkcounter(e);
                    else {
                        var o = parseInt(e.attr("maxlength"));
                        t.append($('<label class="text-counter">' + (o - e.val().length) + "</label>"))
                    } e.hasAttr("data-mask") && forms.initmask(e), e.hasClass("input-placeholder") && e.hasAttr("data-placeholder") && (e.next("label.placeholder").length && e.next("label.placeholder").remove(), e.hasAttr("id") || e.attr("id", forms.createid()), e.after($('<label class="placeholder" for="' + e.attr("id") + '">' + e.attr("data-placeholder") + "</label>")), forms.checkinput(e)), t.hasClass("type-password") && (t.children("button.password-peek").length || t.append($('<button type="button" class="password-peek"></button>')))
            }), $("select:not(.native)", e).each(function() {
                selectBoxes.check($(this))
            }), $(".inputwrap > input, .inputwrap > textarea", e).off("change").on("change", function() {
                forms.checkinput($(this))
            }), $(".inputwrap > input, .inputwrap > textarea", e).off("keyup").on("keyup", function() {
                forms.checkinput($(this))
            }), $(".inputwrap > textarea[maxlength]", e).off("keydown").on("keydown", function() {
                forms.checkcounter($(this))
            }), $(".inputwrap > textarea[maxlength]", e).off("keyup").on("keyup", function() {
                forms.checkcounter($(this))
            }), $(".inputwrap > input, .inputwrap > textarea", e).off("focusin").on("focusin", function() {
                $(this).parent().addClass("input-active")
            }), $(".inputwrap > input, .inputwrap > textarea", e).off("focusout").on("focusout", function() {
                var e = $(this);
                setTimeout(function() {
                    e.parent().removeClass("input-active")
                }, 100)
            }), $(".inputwrap.type-password .password-peek").off("click").on("click", function() {
                var e = $(this).parent(".inputwrap"),
                    t = e.children("input:first");
                e.hasClass("input-peek") ? (e.removeClass("input-peek"), t.attr("type", "password")) : (e.addClass("input-peek"), t.attr("type", "text"))
            })
        },
        updateform: function(e) {
            $("input, textarea", e).each(function() {
                forms.checkinput($(this))
            }), $("select:not(.native)").each(function() {
                selectBoxes.check($(this))
            })
        },
        initmask: function(e) {
            var t = {
                placeholder: "",
                translation: {
                    0: {
                        pattern: /\d/
                    },
                    9: {
                        pattern: /\d/,
                        optional: !0
                    },
                    "#": {
                        pattern: /\d/,
                        recursive: !0
                    },
                    A: {
                        pattern: /[a-zA-Z0-9]/
                    },
                    S: {
                        pattern: /[a-zA-Z]/
                    },
                    1: {
                        pattern: /[1,2,3,4,5,6,7,8,9]/
                    }
                }
            };
            e.hasAttr("placeholder") && (t.placeholder = e.attr("placeholder")), e.mask(e.attr("data-mask"), t)
        },
        checkinput: function(e) {
            var t = e.parent();
            e.val().length ? t.addClass("input-full") : t.removeClass("input-full"), forms.checkcounter(e)
        },
        checkcounter: function(e) {
            if (e.is("textarea") && e.hasAttr("maxlength")) {
                var t = e.parent(),
                    o = parseInt(e.attr("maxlength")) - e.val().length;
                $(".text-counter", t).text(o)
            }
        },
        id_prefix: "form_input_",
        createid: function() {
            return $.uid(forms.id_prefix)
        }
    },
    accordions = {
        init: function() {
            $(".accordion-container").length && $(".accordion-container").each(function() {
                var e = $(this);
                accordions.calibrate(), $(".accordion-element.accordion-expanded:not(:first)").removeClass("accordion-expanded"), $(".accordion-element:not(.accordion-expanded)", e).addClass("accordion-collapsed"), setTimeout(function() {
                    e.addClass("accordion-initialized")
                }, 100), $(".accordion-button", e).on("click", function(t) {
                    var o = $(event.target);
                    if (!o.hasClass("accordion-preventtrigger") && !o.parentsUntil(".accordion-button", ".accordion-preventtrigger").length) {
                        var i = $(this),
                            s = i.parent(".accordion-element");
                        accordions.toggle(s, e)
                    }
                })
            })
        },
        toggle: function(e, t) {
            e.hasClass("accordion-collapsed") ? ($(".accordion-element", t).addClass("accordion-collapsed").removeClass("accordion-expanded"), e.removeClass("accordion-collapsed"), e.addClass("accordion-expanded")) : $(".accordion-element", t).addClass("accordion-collapsed").removeClass("accordion-expanded")
        },
        calibrate: function() {
            $(".accordion-container").length && $(".accordion-container").each(function() {
                var e = $(this);
                $(".accordion-element", e).each(function() {
                    $(".accordion-content", $(this)).each(function() {
                        var e = 0;
                        $(this).children().each(function() {
                            e += $(this).innerHeight(!0)
                        }), $(this).css("max-height", e)
                    })
                })
            })
        }
    },
    scrollBars = {
        init: function() {
            $(".scrollbar").each(function() {
                scrollBars.initspecific($(this))
            })
        },
        initspecific: function(e) {
            if (e.hasClass("scrollbar-initialized")) e.mCustomScrollbar("update");
            else {
                var t = {
                    axis: "y",
                    theme: "custom",
                    scrollInertia: 250,
                    autoHideScrollbar: !1
                };
                e.hasClass("horizontal") ? e.hasClass("horizontal") && !e.hasClass("vertical") ? (t.axis = "x", e.mCustomScrollbar(t)) : e.hasClass("horizontal") && e.hasClass("vertical") && (t.axis = "xy", e.mCustomScrollbar(t)) : e.mCustomScrollbar(t), e.addClass("scrollbar-initialized")
            }
        },
        destroyspecific: function(e) {
            e.mCustomScrollbar("destroy")
        },
        resize: function() {
            $(".scrollbar").each(function() {
                $(this).mCustomScrollbar("update")
            })
        }
    },
    selectBoxes = {
        initialized: !1,
        init: function() {
            $("select:not(.native)").each(function() {
                selectBoxes.check($(this))
            })
        },
        initSpecific: function(object) {
            var opts = {
                copyClasses: "container",
                autoWidth: !1,
                showFirstOption: !0,
                showEffect: "none",
                hideEffect: "none",
                dynamicPositioning: !0
            };
            if (object.hasAttr("data-placeholder")) {
                var placeholder_text = object.attr("data-placeholder");
                opts.showFirstOption = !1, object.hasClass("input-placeholder") ? (object.prepend('<option class="option-placeholder"></option>'), object.val($("*:first", object).val()), object.after($('<label class="placeholder" for="' + object.attr("id") + '">' + placeholder_text + "</label>"))) : (object.prepend('<option class="option-placeholder">' + placeholder_text + "</option>"), object.val($("*:first", object).val()))
            }
            object.hasAttr("data-hidefirst") && (opts.showFirstOption = !1), object.hasAttr("data-flex") && "true" == object.attr("data-flex") && (opts.autoWidth = !0), $("option[data-icon]", object).length && object.addClass("has-icons"), object.bind({
                create: function(e, t) {
                    var o = t.dropdown.parent().parent(".inputwrap");
                    o.addClass("type-selectbox"), $("option:selected", t.selectbox).length && !$("option:selected", t.selectbox).hasClass("option-placeholder") && o.addClass("selectbox-optionselected");
                    var i = $('label[for="' + t.selectbox.attr("id") + '"]');
                    i.length && i.off("click").on("click", function() {
                        t.dropdown.click()
                    }), $("option.clickshow", t.selectbox).addClass("notoggle")
                },
                changed: function(ev, obj) {
                    var event = document.createEvent("Event");
                    event.initEvent("sbx-changed", !0, !1), obj.selectbox.get(0).dispatchEvent(event);
                    var selected = $("option:selected", obj.selectbox);
                    if (selected.length)
                        if (selected.hasClass("option-placeholder") || obj.dropdown.parent().parent(".inputwrap").addClass("selectbox-optionselected"), selected.hasClass("clickshow") && selected.hasData("subject") && clickShow.toggle(selected), selected.hasAttr("data-href")) window.location.href = selected.attr("data-href");
                        else if (selected.hasData("onselect")) {
                        var selectFunction = selected.data("onselect");
                        eval("selectFunction = " + selectFunction, selectFunction), "function" == typeof selectFunction && selectFunction()
                    }
                },
                open: function(e, t) {
                    t.dropdown.parent().parent(".inputwrap").addClass("input-focus")
                },
                close: function(e, t) {
                    t.dropdown.parent().parent(".inputwrap").removeClass("input-focus")
                }
            }), object.selectBoxIt(opts)
        },
        check: function(e) {
            e.hasData("selectBox-selectBoxIt") ? e.data("selectBox-selectBoxIt").refresh() : selectBoxes.initSpecific(e), e.removeClass("selectboxit-rendering"), selectBoxes.initialized = !0
        }
    },
    modals = {
        transitionTime: 600,
        initialized: !1,
        init: function() {
            ($(".modalcontent").length || $(".modal").length) && ($(".modalcontent").each(function(e, t) {
                var o = $(t),
                    i = null;
                i = o.hasAttr("id") ? o.attr("id") : "modalcontent_" + e, o.removeAttr("id");
                var s = o.wrap('<div class="modal modal-initialized" id="' + i + '"><div class="modal-element"></div></div>').parent(),
                    n = s.parent(),
                    a = $('<button class="modal-close"><i class="icon-close icon"></i></button>').prependTo(s);
                n.addClass(o.attr("class")).removeClass("modalcontent"), o.removeAttr("class").addClass("modal-content"), n.hasClass("modal-forced") && a.remove()
            }), modals.initialized || (site.body.off("click", ".modaltrigger[data-modal]").on("click", ".modaltrigger[data-modal]", function() {
                modals.show($(this).attr("data-modal"))
            }), site.body.off("click", ".modal .modal-close:not(.no-action), .modal .modal-closetrigger").on("click", ".modal .modal-close:not(.no-action), .modal .modal-closetrigger", modals.hide), site.body.off("click", ".modal").on("click", ".modal", function(e) {
                var t = $(this);
                t.hasClass("modal-forced") || t.hasClass("modal-prevent-bgclick") || $(e.target).is(t) && modals.hide()
            }), $(".modal").off("scroll").on("scroll", function() {
                site.preScroll()
            })), modals.initialized = !0)
        },
        show: function(id, finalFunction, enableOverflow) {
            if ($("#" + id + ".modal", site.body).length) {
                var modal = $("#" + id + ".modal"),
                    element = $(".modal-element", modal),
                    content = $(".modal-content", modal);
                modals.hide(function() {
                    isDefined(enableOverflow) && enableOverflow || overflowFix.engage(), modal.addClass("enabled"), setTimeout(function() {
                        if (modal.trigger("modals:beforeshow"), content.hasData("beforeshow")) {
                            var beforeFunction = content.data("beforeshow");
                            eval("beforeFunction = " + beforeFunction, beforeFunction), "function" == typeof beforeFunction && beforeFunction()
                        }
                        modal.addClass("show"), setTimeout(function() {
                            if ($.isFunction(finalFunction) && finalFunction(), modal.trigger("modals:aftershow"), content.hasData("onshow")) {
                                var showFunction = content.data("onshow");
                                eval("showFunction = " + showFunction, showFunction), "function" == typeof showFunction && showFunction()
                            }
                        }, modals.transitionTime)
                    }, site.cssTimeout)
                }, !0)
            }
        },
        hide: function(e, t) {
            $(".modal.enabled").length ? $(".modal.enabled").each(function() {
                var o = $(this);
                o.trigger("modals:beforehide"), o.removeClass("show"), isDefined(t) && !0 === t || overflowFix.disengage(), setTimeout(function() {
                    o.removeClass("enabled"), o.trigger("modals:afterhide"), jQuery.isFunction(e) && e()
                }, modals.transitionTime)
            }) : jQuery.isFunction(e) && e()
        },
        switch: function(e, t) {
            if ($("#" + e + ".modal").length) {
                var o = $("#" + e + ".modal"),
                    i = $(".modal-element", o),
                    s = $(".modal-content", o);
                o.hasData("heightreference") && (s = $(o.data("heightreference"), o)), o.addClass("notrans"), $(".modal.enabled").removeClass("enabled").removeClass("show"), o.addClass("enabled"), googlemaps.resize(), accordions.calibrate(), $(".scrollbar-modal", o).mCustomScrollbar("update"), $(".selectbox", o).each(function() {
                    $(this).hasData("selectBox-selectBoxIt") && $(this).data("selectBox-selectBoxIt").refresh()
                }), $.isFunction(t) && t(), modals.resize(), o.addClass("show"), i.height(s.outerHeight()), setTimeout(function() {
                    o.removeClass("notrans")
                }, 5)
            }
        },
        dialog: function(e, t, o, i) {
            $("#confirmmodal.modal").remove(), e = isDefined(e) && !1 !== e ? '<h3 class="confirmmodal-title">' + e + "</h3>" : "", t = isDefined(t) && !1 !== t ? '<p class="confirmmodal-subtitle">' + t + "</p>" : "";
            var s = $('<div id="confirmmodal" class="modalcontent modal-forced"><div class="modal-body">' + e + t + '<div class="confirmmodal-opts"></div></div></div>'),
                n = $(".confirmmodal-opts", s);
            $.each(o, function(e, t) {
                var o = $('<button class="btn opt fixed" data-option="' + e + '">' + t.text + "</button>");
                o.addClass(t.classes), n.append(o)
            }), $("body").append(s), modals.init(), $("#confirmmodal .confirmmodal-opts .opt").one("click", function() {
                $.isFunction(i) && i($(this).data("option")), modals.hide()
            }), modals.show("confirmmodal", !1, !0)
        }
    },
    messenger = {
        initialized: !1,
        container: null,
        delay: 4e3,
        queue: [],
        queue_processing: !1,
        init: function(e) {
            !messenger.initialized && $("#messenger-container").length && (messenger.container = $("#messenger-container:first"), messenger.container.off("click", ".message-close").on("click", ".message-close", function() {
                messenger.hidemessage($(this).parent().parent())
            }), messenger.initialized = !0)
        },
        message: function(e, t) {
            messenger.initialized || messenger.init(), isDefined(t) || (t = "success"), $.isArray(e) ? $.each(e, function(e, o) {
                messenger.queue.push({
                    message: o,
                    type: t
                })
            }) : messenger.queue.push({
                message: e,
                type: t
            }), messenger.processqueue()
        },
        processqueue: function() {
            if (!messenger.queue_processing)
                if (messenger.queue_processing = !0, messenger.queue.length) {
                    var e = messenger.queue[0];
                    messenger.queue.splice(0, 1);
                    var t = $('<div class="message ' + e.type + '"><div class="wrapper message-wrap">' + e.message + '<button class="message-close"></button></div></div>');
                    t.prependTo(messenger.container), site.scrollTop >= site.header.outerHeight() || $(".modal").hasClass("enabled") || $("#basket-bar").hasClass("active show") ? messenger.container.addClass("fixed") : messenger.container.removeClass("fixed"), setTimeout(function() {
                        t.css("margin-top", -1 * t.outerHeight()), setTimeout(function() {
                            t.addClass("init"), setTimeout(function() {
                                t.addClass("show"), setTimeout(function() {
                                    messenger.hidemessage(t)
                                }, messenger.delay), setTimeout(function() {
                                    messenger.queue_processing = !1, messenger.processqueue()
                                }, 300)
                            }, site.csstimeout)
                        }, site.csstimeout)
                    }, site.csstimeout)
                } else messenger.queue_processing = !1
        },
        hidemessage: function(e) {
            e.addClass("hide"), e.removeClass("show"), e.css("margin-bottom", -1 * e.outerHeight()), setTimeout(function() {
                e.remove()
            }, e.transitionTime())
        },
        scroll: function() {
            messenger.initialized && (site.scrollTop >= site.header.outerHeight() ? messenger.container.addClass("fixed") : messenger.container.removeClass("fixed"))
        },
        handle: function(e) {
            _.forEach(e, function(e, t) {
                window.messenger.message(e, t)
            })
        }
    },
    expandBanners = {
        container: null,
        collapseButton: null,
        init: function() {
            $(".expandbanner").length && $(".expandbanner").each(function() {
                var e = $(this);
                e.off("click").on("click", ".expandbanner-expand", function() {
                    e.toggleClass("collapse")
                })
            })
        }
    },
    storesmodal = {
        ajaxtries: 0,
        openedStore: null,
        currentStore: null,
        instance: null,
        initialized: !1,
        initializing: !1,
        inputTimeout: !1,
        list: null,
        map: null,
        container: null,
        selectedCity: window.localStorage.getItem("city") ? JSON.parse(window.localStorage.getItem("city")) : null,
        selectedProduct: window.localStorage.getItem("product") ? JSON.parse(window.localStorage.getItem("product")) : null,
        init: function() {
            $("#modal_stores .modal-content").length && (storesmodal.initialized || storesmodal.initializing ? storesmodal.initializing || (storesmodal.setCity("all"), storesmodal.instance.finduser()) : (window.localStorage.setItem(constants.LOCAL_STORAGE.SELECTED_PRODUCT, ""), EventHandler.$emit(constants.EVENTS.STORESMODAL_RESET, !0), storesmodal.container = $("#modal_stores .modal-content"), storesmodal.map = $(".stores-map", storesmodal.container), storesmodal.results_parent = $(".content-results", storesmodal.container), storesmodal.results = $(".mCSB_container", storesmodal.results_parent), storesmodal.search_input = $(".search-input", storesmodal.container), storesmodal.detail = $(".content-storedetail", storesmodal.container), storesmodal.search_nearest = $(".stores-findnearest", storesmodal.container), storesmodal.waypoints = $(".stores-pathfind", storesmodal.detail), $(".select-city select").change(function() {
               console.log("asdasdgeldi")
                var e = $(this),
                    t = {
                        name: $("#city" + e.val()).text(),
                        id: e.val()
                    };
                window.localStorage.setItem(constants.LOCAL_STORAGE.SELECTED_CITY, JSON.stringify(t)), EventHandler.$emit(constants.EVENTS.CITY_CHANGED, t, !0), storesmodal.container.setLoader(!0), storesmodal.initializing = !0, $(".select-city-bg", storesmodal.container).hide(), $(".select-city", storesmodal.container).hide(), $(".content-infomessage", storesmodal.container).remove();
                var o = localStorage.getItem(constants.LOCAL_STORAGE.SELECTED_PRODUCT);
                $.ajax({
                    url: site.storesurl,
                    method: "post",
                    data: {
                        status: 2,
                        productid: o,
                        cityid: e.val()
                    },
                    dataType: "json",
                    success: function(e) {
                        if (e.payload.stores.length) window.localStorage.setItem(constants.LOCAL_STORAGE.SELECTED_PRODUCT, ""), storesmodal.map.on("stores:selected", function(e, t) {
                            storesmodal.setActiveStore(t)
                        }), storesmodal.instance = new storemodal(storesmodal.map, e.payload.stores), storesmodal.instance.focus(e.payload.stores[0].id), storesmodal.setList(e.payload.stores), storesmodal.results.off("click", ".results-store").on("click", ".results-store", function() {
                            var e = $(this).attr("data-storeid");
                            storesmodal.instance.focus(e), storesmodal.setActiveStore(e)
                        }), storesmodal.detail.off("click", ".storedetail-back").on("click", ".storedetail-back", storesmodal.closeDetail), storesmodal.search_nearest.off("click").on("click", storesmodal.closestStore), storesmodal.search_input.off("input").on("input", function() {
                            clearTimeout(storesmodal.inputTimeout), storesmodal.inputTimeout = setTimeout(storesmodal.filterText, 300)
                        }), storesmodal.waypoints.off("click").on("click", function() {
                            storesmodal.findPath(storesmodal.detail.data("active-store"))
                        }), storesmodal.initializing = !1, storesmodal.initialized = !0, setTimeout(function() {
                            storesmodal.container.setLoader(!1)
                        }, 200);
                        else {
                            var t = $('<div class="content-infomessage">Aradığınız ürün için stok bulunduran mağaza bulunamadı.</div>');
                            storesmodal.container.append(t), storesmodal.container.setLoader(!1), storesmodal.reset(), setTimeout(function() {
                                t.addClass("show")
                            }, site.cssTimeout), $("#setQuery").data("selectBox-selectBoxIt").close()
                        }
                    },
                    error: function() {
                        ++storesmodal.ajaxtries < 3 && setTimeout(function() {
                            storesmodal.initializing = !1, storesmodal.init()
                        }, 1500)
                    }
                })
            })))
        },
        selectStore: function() {
            storesmodal.currentStore = storesmodal.openedStore, window.localStorage.setItem(constants.LOCAL_STORAGE.SELECTED_STORE, JSON.stringify(storesmodal.currentStore)), site.selectedStore = storesmodal.currentStore, site.isStoreSelected = !1, _.isEmpty(site.selectedStore) || (site.isStoreSelected = !0), EventHandler.$emit(constants.EVENTS.STORE_CHANGED, site.selectedStore, site.isStoreSelected), modals.hide()
        },
        setCity: function(e) {
            "all" == e ? storesmodal.instance.reset() : storesmodal.instance.filter({
                city: {
                    id: e
                }
            }), storesmodal.setList(storesmodal.instance.currentstores)
        },
        setResults: function(e) {
            "all" == e ? storesmodal.instance.reset() : storesmodal.instance.populate(e), storesmodal.setList(storesmodal.instance.currentstores)
        },
        setList: function(e) {
            storesmodal.results.empty(), e.length > 0 ? $.each(e, function(e, t) {
                $('<button class="results-store" data-storeid="' + t.id + '"><h3 class="store-title">' + t.branch_name + '</h3><p class="store-address">' + t.address + "</p></button>").appendTo(storesmodal.results)
            }) : $('<span class="text-center">Aradığınız Kriterlere uygun market bulunamadı.</span>').appendTo(storesmodal.results)
        },
        setActiveStore: function(e) {
            var t = storesmodal.instance.filter_return({
                id: e
            });
            t.length ? (storesmodal.openedStore = t[0], storesmodal.showDetail(t[0])) : storesmodal.closeDetail()
        },
        showDetail: function(e) {
            site.currentOpenModalStore = e, storesmodal.detail.data("active-store", e.id), $(".info-field.address .field-content", storesmodal.detail).html("<p>" + e.address + "</p>"), $(".storedetail-title", storesmodal.detail).text(e.branch_name), $(".info-field.phone .field-content", storesmodal.detail).html("<p>" + (null == e.phone_number ? " " : e.phone_number) + "</p><p>" + (null == e.phone_number_2 ? " " : e.phone_number_2) + "</p>"), $(".info-field.workinghours .field-content", storesmodal.detail).html("<p>" + (null == e.working_hours ? " " : e.working_hours) + "</p>"), storesmodal.detail.addClass("active"), setTimeout(function() {
                storesmodal.detail.addClass("show")
            }, site.cssTimeout)
        },
        showDeliveryTimes: function() {
            EventHandler.$emit(constants.EVENTS.SHOW_STORE_DETAIL, site.currentOpenModalStore)
        },
        closeDetail: function() {
            storesmodal.detail.removeClass("show"), storesmodal.detail.data("active-store", !1), setTimeout(function() {
                storesmodal.detail.removeClass("active")
            }, storesmodal.detail.transitionTime())
        },
        closestStore: function() {
            storesmodal.instance.finduser()
        },
        findPath: function(e) {
            storesmodal.instance.finduser(e)
        },
        filterText: function() {
            var e = storesmodal.search_input.val(),
                t = storesmodal.instance.filter_return({
                    branch_name: e
                }, !1, !0),
                o = storesmodal.instance.filter_return({
                    address: e
                }, !1, !0),
                i = t.concat(o);
            "" != e ? (i = _.uniq(i), storesmodal.setResults(i)) : (storesmodal.setResults("all"), storesmodal.instance.focus(i[0].id))
        },
        reset: function() {
            $(".select-city-bg").show(), $(".select-city").show(), $("#setQuery").val(""), $("#setQuery").selectBoxIt("destroy"), $("#setQuery").selectBoxIt()
        }
    },
    googlemaps = {
        loading: !1,
        maxzoom: 13,
        apikey: "AIzaSyCQkwwS-EP72wn63FM7eC_Nqcw63QsJTis",
        instances: {},
        initialized: !1,
        defaulticon: {
            path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
            fillColor: "#FFF",
            fillOpacity: .8,
            strokeColor: "#000",
            strokeWeight: 4,
            scale: .9
        },
        userLocation: !1,
        geocoder: !1,
        directionsService: !1,
        directionsDisplay: !1,
        freeinfowindow: null,
        placesService: !1,
        init: function() {
            if ($(".google-map").length && !googlemaps.initialized && !googlemaps.loading) {
                googlemaps.loading = !0;
                var e = "";
                "" !== googlemaps.apikey && (e = "?key=" + googlemaps.apikey), $.getScript("//maps.googleapis.com/maps/api/js" + e + "&libraries=places", function() {
                    setTimeout(function() {
                        googlemaps.setup(), googlemaps.loading = !1
                    }, site.csstimeout)
                })
            }
        },
        setup: function() {
            $(".google-map").each(function(e, t) {
                googlemaps.directionsService = new google.maps.DirectionsService, googlemaps.directionsDisplay = new google.maps.DirectionsRenderer;
                var o = {
                    object: $(t),
                    id: $(t).attr("id"),
                    lat: parseFloat($(t).data("lat")),
                    lng: parseFloat($(t).data("lng")),
                    zoom: parseFloat($(t).data("zoom")),
                    slide: !$(t).hasData("noslide"),
                    marker_lat: parseFloat($(t).data("marker-lat")),
                    marker_lng: parseFloat($(t).data("marker-lng")),
                    marker_title: $(t).data("marker-title"),
                    marker_html: $(t).data("marker-html"),
                    mapobj: null,
                    markers: {},
                    bounds: new google.maps.LatLngBounds,
                    loadlistener: null
                };
                isDefined(o.id) || (o.id = "map_defaultid_" + e, t.setAttribute("id", o.id)), isDefined(o.zoom) && !isNaN(o.zoom) || (o.zoom = 10), isDefined(o.lat) && !isNaN(o.lat) || (o.lat = 41.015137), isDefined(o.lng) && !isNaN(o.lng) || (o.lng = 28.97953), isDefined(o.marker_lat) && !isNaN(o.marker_lat) || (o.marker_lat = !1), isDefined(o.marker_lng) && !isNaN(o.marker_lng) || (o.marker_lng = !1), isDefined(o.marker_title) || (o.marker_title = ""), isDefined(o.marker_html) || (o.marker_html = !1), o.mapobj = new google.maps.Map(o.object.get(0), {
                    center: {
                        lat: o.lat,
                        lng: o.lng
                    },
                    scrollwheel: !0,
                    zoom: o.zoom,
                    rotateControl: !1,
                    draggable: o.slide,
                    mapTypeControl: !1,
                    zoomControl: !0,
                    zoomControlOptions: {
                        position: google.maps.ControlPosition.TOP_RIGHT
                    },
                    streetViewControl: !0,
                    streetViewControlOptions: {
                        position: google.maps.ControlPosition.TOP_RIGHT
                    }
                }), googlemaps.directionsDisplay.setMap(o.mapobj), o.marker_lat && googlemaps.addMarker(o, o.marker_lat, o.marker_lng, o.marker_title, o.marker_html), googlemaps.instances[o.id] = o, googlemaps.fitCenter(o)
            }), googlemaps.initialized = !0, site.body.trigger("googlemaps:loaded")
        },
        addMarker: function(e, t, o, i, s, n, a, r) {
            isDefined(a) && 0 != a || (a = {
                url: "/assets/img/map-pin.png",
                size: new google.maps.Size(40, 40),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(20, 20)
            });
            var l = new google.maps.Marker({
                    map: e.mapobj,
                    position: {
                        lat: t,
                        lng: o
                    },
                    title: i,
                    icon: a
                }),
                c = !1;
            return isDefined(n) || (n = "mapmarker_" + e.id + e.markers.length), isDefined(s) ? (s = '<div class="map-infowindow">' + s + "</div>", c = new google.maps.InfoWindow({
                content: s,
                maxWidth: 300,
                pixelOffset: new google.maps.Size(0, 0)
            })) : s = !1, e.markers[n] = {
                markerobj: l,
                html: s,
                infowindow: c
            }, e.markers[n].markerobj.addListener("click", function() {
                googlemaps.showinfo(e, n), $.isFunction(r) && r()
            }), e.bounds.extend(l.position), !0
        },
        showinfo: function(e, t, o) {
            $.each(e.markers, function(e, t) {
                t.infowindow && t.infowindow.close()
            }), e.mapobj.panTo(e.markers[t].markerobj.getPosition()), isDefined(o) ? (null != googlemaps.freeinfowindow && (googlemaps.freeinfowindow.close(), googlemaps.freeinfowindow.setMap(null)), googlemaps.freeinfowindow = new google.maps.InfoWindow({
                content: '<div class="map-infowindow">' + o + "</div>",
                maxWidth: 300,
                pixelOffset: new google.maps.Size(0, 0)
            }), googlemaps.freeinfowindow.open(e.mapobj, e.markers[t].markerobj)) : e.markers[t].infowindow && (null != googlemaps.freeinfowindow && googlemaps.freeinfowindow.close(), e.markers[t].infowindow.open(e.mapobj, e.markers[t].markerobj))
        },
        clear: function(e) {
            return isDefined(e.markers) && ($.each(e.markers, function(e, t) {
                t.markerobj.setMap(null)
            }), e.markers = {}, e.bounds = new google.maps.LatLngBounds), !0
        },
        clearMarker: function(e, t) {
            return t in e.markers && (e.markers[t].markerobj.setMap(null), delete e.markers[t], e.bounds = new google.maps.LatLngBounds, $.each(e.markers, function(t, o) {
                e.bounds.extend(o.markerobj.position)
            }), !0)
        },
        fitCenter: function(e, t) {
            isDefined(t) && (e.bounds = new google.maps.LatLngBounds, $.each(t, function(t, o) {
                o in e.markers && e.bounds.extend(e.markers[o].markerobj.position)
            })), e.mapobj.fitBounds(e.bounds);
            var o = google.maps.event.addListener(e.mapobj, "idle", function() {
                e.mapobj.getZoom() > googlemaps.maxzoom && e.mapobj.setZoom(googlemaps.maxzoom), google.maps.event.removeListener(o)
            });
            return googlemaps.resize(), !0
        },
        focus: function(e, t, o) {
            t in e.markers && (e.bounds = new google.maps.LatLngBounds, e.bounds.extend(e.markers[t].markerobj.position), googlemaps.fitCenter(e), o && googlemaps.showinfo(e, t))
        },
        focusCity: function(e, t) {
            e.bounds = new google.maps.LatLngBounds, e.bounds.extend(t), googlemaps.fitCenter(e), e.mapobj.fitBounds(e.bounds);
            var o = google.maps.event.addListener(e.mapobj, "idle", function() {
                e.mapobj.getZoom() > googlemaps.maxzoom && e.mapobj.setZoom(9), google.maps.event.removeListener(o)
            });
            googlemaps.resize()
        },
        resize: function(e) {
            return !!googlemaps.initialized && (isDefined(e) ? google.maps.event.trigger(e.mapobj, "resize") : $.each(googlemaps.instances, function(e, t) {
                google.maps.event.trigger(t.mapobj, "resize")
            }), !0)
        },
        lookupArea: function(e, t, o) {
            googlemaps.geocoder.geocode({
                location: {
                    lat: e,
                    lng: t
                }
            }, function(e, t) {
                "OK" == t ? $.isFunction(o) && o(e) : $.isFunction(o) && o(!1)
            })
        },
        getLocation: function(e) {
            return navigator.geolocation && 0 == googlemaps.userLocation ? navigator.geolocation.getCurrentPosition(function(t) {
                googlemaps.userLocation = {
                    lat: t.coords.latitude,
                    lng: t.coords.longitude
                }, e(googlemaps.userLocation)
            }, function() {
                $.isFunction(e) && e(!1)
            }) : $.isFunction(e) && e(googlemaps.userLocation), !0
        },
        wayPoint: function(e) {
            var t = [];
            e.length > 1 && ($.each(e, function(e, o) {
                t.push({
                    location: o,
                    stopover: !0
                })
            }), googlemaps.directionsService.route({
                origin: t[0].location,
                destination: t[t.length - 1].location,
                waypoints: [],
                optimizeWaypoints: !0,
                travelMode: "DRIVING"
            }, function(e, t) {
                "OK" === t && googlemaps.directionsDisplay.setDirections(e)
            }))
        }
    },
    demo = {
        init: function() {
            $(".productbox").length && demo.productBoxes.init(), $(".listing-container").length && demo.listing.init(), $(".product-detail").length && demo.productDetail.init(), $(".modal.password-recovery").length && demo.passwordRecovery.init(), $(".modal.password-recovery").length && demo.rateOrder.init(), $(".section.account").length && demo.account.init(), $("#basket-bar").length && demo.basketBar.init(), $(".checkout-section.cart-items").length && demo.cart.init(), $(".checkout-order").length && demo.checkout.init(), $("header").length && demo.header.init()
        },
        productBoxes: {
            init: function() {
                $(".productbox .product-fav").off("click").on("click", function() {
                    $(this).toggleClass("active")
                })
            }
        },
        listing: {
            init: function() {
                site.body.on("keyup", function(e) {
                    67 == e.keyCode && demo.listing.toggleView()
                }), demo.listing.toggleView()
            },
            toggleView: function() {
                $(".listing-notfound").is(":visible") ? ($(".listing-notfound").hide(), $(".listing-container").show()) : ($(".listing-notfound").show(), $(".listing-container").hide())
            }
        },
        productDetail: {
            init: function() {
                $(".detail-content .controls-like").off("click").on("click", function() {
                    $(this).toggleClass("active")
                }), $(".content-controls:not(:first)").hide(), site.body.on("keyup", function(e) {
                    67 == e.keyCode && demo.productDetail.toggleView()
                })
            },
            toggleView: function() {
                $(".content-controls:not(:first)").is(":visible") ? ($(".content-controls:first").show(), $(".content-controls:not(:first)").hide()) : ($(".content-controls:not(:first)").show(), $(".content-controls:first").hide())
            }
        },
        passwordRecovery: {
            init: function() {
                $(".modal.password-recovery .passwordrecovery-body-form .btn").on("click", function() {
                    $(".modal.password-recovery .inputform").hasClass("validation-error") ? $(".modal.password-recovery").addClass("complete") : ($(".modal.password-recovery .inputform").addClass("validation-error"), $(".modal.password-recovery .inputwrap").addClass("validation-invalid"))
                })
            }
        },
        rateOrder: {
            init: function() {
                $(".modal.rateorder .rateorder-body-form .btn").on("click", function() {
                    $(".modal.rateorder").addClass("complete")
                })
            }
        },
        account: {
            at: -1,
            init: function() {
                site.body.on("keyup", function(e) {
                    67 == e.keyCode && demo.account.toggleView()
                }), demo.account.toggleView(), $(".account-changepassword .inputform .btn").on("click", function() {
                    $(".account-changepassword .inputform").hasClass("validation-error") && messenger.message("Kullanıcı bilgileriniz başarıyla güncellendi."), $(".account-changepassword .inputform").toggleClass("validation-error"), $(".account-changepassword .inputform .inputwrap:eq(2), .account-changepassword .inputform .inputwrap:eq(1)").toggleClass("validation-invalid")
                })
            },
            toggleView: function() {
                demo.account.at++, $(".account-content:eq(" + demo.account.at + ")").length || (demo.account.at = 0), $(".account-content").hide(), $(".account-content:eq(" + demo.account.at + ")").show()
            }
        },
        basketBar: {
            init: function() {
                site.body.on("keyup", function(e) {
                    86 == e.keyCode && demo.basketBar.toggleView()
                })
            },
            toggleView: function() {
                $("#basket-bar").toggleClass("empty")
            }
        },
        cart: {
            init: function() {
                $(".promocode-inputwrap").hide(), $(".promocode-btn").off("click").on("click", function() {
                    $(".promocode-btn").hide(), $(".promocode-inputwrap").show()
                }), $(".promocode-add").off("click").on("click", function() {
                    $(".promocode-btn").show(), $(".promocode-inputwrap").hide()
                })
            }
        },
        checkout: {
            at: 4,
            init: function() {
                site.body.on("keyup", function(e) {
                    67 == e.keyCode && demo.checkout.toggleView()
                }), demo.checkout.toggleView()
            },
            toggleView: function() {
                switch (demo.checkout.at++, demo.checkout.at > 5 && (demo.checkout.at = 0), demo.checkout.at) {
                    case 0:
                        $(".checkout-section").hide(), $(".checkout-section.checkout-deliverytime").show(), $(".checkout-section.checkout-sum:first").show();
                        break;
                    case 1:
                        $(".checkout-section").hide(),
                            $(".checkout-section.checkout-payment:eq(0)").removeClass("form-error").show().removeClass("validation-error").find(".inputwrap").removeClass("validation-invalid"), $(".checkout-section.checkout-terms").show(), $(".checkout-section.checkout-submit").show(), $(".checkout-section.checkout-sum:eq(1)").show();
                        break;
                    case 2:
                        $(".checkout-section").hide(), $(".checkout-section.checkout-payment:eq(0)").show().addClass("validation-error").find(".inputwrap:eq(2)").addClass("validation-invalid"), $(".checkout-section.checkout-terms").show(), $(".checkout-section.checkout-submit").show(), $(".checkout-section.checkout-sum:eq(1)").show();
                        break;
                    case 3:
                        $(".checkout-section").hide(), $(".checkout-section.checkout-payment:eq(0)").show().removeClass("validation-error").addClass("form-error").find(".inputwrap").removeClass("validation-invalid"), $(".checkout-section.checkout-terms").show(), $(".checkout-section.checkout-submit").show(), $(".checkout-section.checkout-sum:eq(1)").show();
                        break;
                    case 4:
                        $(".checkout-section").hide(), $(".checkout-section.checkout-payment:eq(0)").removeClass("form-error").removeClass("validation-error").find(".inputwrap").removeClass("validation-invalid"), $(".checkout-section.checkout-payment:eq(1)").show(), $(".checkout-section.checkout-terms").show(), $(".checkout-section.checkout-submit").show(), $(".checkout-section.checkout-sum:eq(1)").show();
                        break;
                    case 5:
                        $(".checkout-section").hide(), $(".checkout-section.checkout-sum:eq(2)").show(), $(".checkout-section.checkout-complete").show()
                }
            }
        },
        header: {
            at: -1,
            init: function() {
                site.body.on("keyup", function(e) {
                    66 == e.keyCode && demo.header.toggleView()
                }), demo.header.toggleView()
            },
            toggleView: function() {
                switch (demo.header.at++, demo.header.at > 3 && (demo.header.at = 0), demo.header.at) {
                    case 0:
                        $("header .left-button.not-selected").show(), $("header .left-button.selected").hide(), $("header .right-usercontrols.logged").hide(), $("header .right-usercontrols.not-logged").show();
                        break;
                    case 1:
                        $("header .left-button.not-selected").show(), $("header .left-button.selected").hide(), $("header .right-usercontrols.logged").show(), $("header .right-usercontrols.not-logged").hide();
                        break;
                    case 2:
                        $("header .left-button.not-selected").hide(), $("header .left-button.selected").show(), $("header .right-usercontrols.logged").show(), $("header .right-usercontrols.not-logged").hide();
                        break;
                    case 3:
                        $("header .left-button.not-selected").hide(), $("header .left-button.selected").show(), $("header .right-usercontrols.logged").hide(), $("header .right-usercontrols.not-logged").show()
                }
            }
        }
    };
$.fn.hasData = function(e) {
    return void 0 !== $(this).data(e)
}, $.fn.hasAttr = function(e) {
    return void 0 !== $(this).attr(e)
}, $.fn.transitionTime = function() {
    var e = $(this);
    if (isDefined(e) && e.length) {
        var t = getComputedStyle(e.get(0)),
            o = "0ms",
            i = "0ms";
        return i = t.webkitTransitionDuration, o = t.webkitTransitionDelay, void 0 !== i && !1 !== i || (i = t.transitionDuration, o = t.transitionDelay), i = i.indexOf("ms") > -1 ? parseFloat(i) : 1e3 * parseFloat(i), o = o.indexOf("ms") > -1 ? parseFloat(o) : 1e3 * parseFloat(o), i + o
    }
    return 0
}, $.fn.mapInstance = function() {
    return !(1 !== $(this).length || !$(this).hasAttr("id")) && ($(this).attr("id") in googlemaps.instances && googlemaps.instances[$(this).attr("id")])
}, $.fn.setLoader = function(e, t) {
    var o = $(this);
    if (e) {
        if (!o.hasClass("indicator-container") || !o.hasClass("indicator-loading")) {
            if ($(".indicator-loader", o).remove(), o.removeClass("indicator-loading").addClass("indicator-container").addClass("indicator-abs"), "absolute" == o.css("position") && o.addClass("indicator-abs"), !o.is($("body"))) {
                var i = $('<div class="indicator-loader"></div>');
                o.append(i)
            }
            setTimeout(function() {
                o.addClass("indicator-loading"), $.isFunction(t) && t()
            }, 20)
        }
    } else if (o.hasClass("indicator-container") && o.hasClass("indicator-loading")) {
        var i = $(".indicator-loader", o);
        o.removeClass("indicator-loading"), setTimeout(function() {
            i.remove(), o.removeClass("indicator-container").removeClass("indicator-abs")
        }, 200)
    } else o.removeClass("indicator-loading"), $(".indicator-loader", o).remove(), o.removeClass("indicator-container").removeClass("indicator-abs")
}, $(window).resize(function() {
    clearTimeout(site.resizeTimer), site.resizeTimer = setTimeout(site.resize, 220)
}), $(document).ready(function() {
    window.dispatchEvent(new Event("main:ready")), site.init()
}), $(window).load(function() {
    site.load()
}), $(window).scroll(function() {
    site.preScroll()
}), String.prototype.replaceAll = function(e, t) {
    return this.split(e).join(t)
};

$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.yukarikaydir').fadeIn();
        } else {
            $('.yukarikaydir').fadeOut();
        }
    });
    $('.yukarikaydir').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });
});
