initMap = !1,
function(e) {
    if ("undefined" == typeof jQuery)
        throw "Requires jQuery to be loaded first";
    !function(f) {
        "use strict";
        f("body").addClass("loader-loading");
        var e = function() {
            f("body").removeClass("loader-loading").off(".pageLoader"),
            f(window).trigger("resize").trigger("scroll")
        };
        f(window).on("load.pageLoader", e),
        setTimeout(e, 6e4),
        f("body").pexInit(),
        f(".menu-items .toggle-icon").on("click", function() {
            f(this).closest("li").toggleClass("active")
        }),
        f(".accordion-item .accordion-title").on("click", function() {
            f(this).closest(".accordion-item").toggleClass("active")
        }),
        f("[data-parallax]").each(function(e, t) {
            new Waypoint({
                element: t,
                handler: function() {
                    f(window).trigger("resize").trigger("scroll")
                },
                offset: "100%"
            })
        }),
        f(".flexslider").each(function(e, t) {
            var i = f(t)
              , o = i.find(".flex-custom-navigation a")
              , l = i.find(".flex-custom-controls")
              , a = {
                animation: "slide",
                selector: ".slides > .slide",
                controlsContainer: l,
                customDirectionNav: o,
                controlNav: !!l.length,
                directionNav: !!o.length,
                video: !0
            };
            i.flexslider(a)
        }),
        f(".owl-carousel").each(function(e, t) {
            var i = f(t)
              , o = i.data()
              , l = {
                nav: !!o.owlNav,
                dots: !!o.owlDots,
                margin: o.owlMargin || 0,
                autoplay: !o.hasOwnProperty("autoplay") || o.autoplay,
                autoplayHoverPause: !0,
                center: !!o.owlCenter,
                items: o.owlItems || 3,
                loop: !o.hasOwnProperty("owlLoop") || !!o.owlLoop,
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 2
                    },
                    1200: {
                        items: 3
                    }
                }
            };
            if (o.owlResponsive) {
                for (var a = o.owlResponsive.split(";"), n = {
                    0: 1
                }, s = [0, 768, 992, 1200], r = 0; r < s.length && r < a.length; r++)
                    a[r] && (n[s[r]] = {
                        items: parseInt(a[r], 10)
                    });
                l.responsive = n
            }
            if (o.owlSectionArrows) {
                var c = i.closest("section").find(".owl-custom-navigation");
                c.length ? (l.nav = !0,
                l.navContainer = c[0],
                l.navText = ['<i class="fas fa-angle-left" aria-hidden="true"></i>', '<i class="fas fa-angle-right" aria-hidden="true"></i>']) : l.nav = !1
            }
            i.owlCarousel(l)
        }),
        f("[data-waypoint-counter]").each(function(e, t) {
            f(t).waypoint({
                handler: function() {
                    f(t).prop("CounterValue", 0).animate({
                        CounterValue: f(t).data("waypointCounter")
                    }, {
                        duration: 2e3,
                        step: function(e) {
                            f(this).text(Math.ceil(e))
                        }
                    }),
                    this.destroy()
                },
                offset: "bottom-in-view"
            })
        }),
        f(".stick-menu").each(function(e, a) {
            var n, s = f(a).offset().top + f(a).outerHeight(), r = f(window).scrollTop(), i = 0, c = !1, o = function(e, t) {
                n && (clearTimeout(n),
                n = !1);
                var i = f(a)
                  , o = i.closest(".header")
                  , l = t || e && o.hasClass("sticked-menu");
                o.removeClass("sticked-menu"),
                o.css("height", ""),
                s = i.offset().top + i.outerHeight(),
                c = !!(l && s < r) && (o.height(o.height()).addClass("sticked-menu"),
                s -= i.outerHeight(),
                !0),
                e || f(window).trigger("resize", ["skipCheck"])
            };
            f(window).on("scroll", function() {
                var e = f(window).scrollTop()
                  , t = e - r;
                i = Math[0 < t ? "max" : "min"](i, 0) + t,
                r = e,
                c && (r <= s || 50 <= i) ? o(!1, !1) : !c && i <= -100 && o(!0, !0)
            }),
            f(window).on("resize", function(e, t) {
                r = f(window).scrollTop(),
                "skipCheck" !== t && (n = setTimeout(function() {
                    o(!0)
                }, 50))
            })
        }),
        f(".field-file-control").each(function(e, t) {
            var i = f(t);
            i.on("change.fileField", function() {
                var e = f(this).closest(".field-wrap")
                  , t = e.find(".field-file-old");
                e.find(".field-control").val(!this.value && t.length ? t.attr("data-value") || t.val() : this.value)
            }).triggerHandler("change.fileField");
            var o = i.closest("form");
            o && o.length && o.data("fileFields", (o.data("fileFields") || f([])).add(i)).off(".fileFields").on("reset.fileFields", function() {
                var e = f(this);
                setTimeout(function() {
                    e.data("fileFields").each(function(e, t) {
                        f(t).triggerHandler("change.fileField")
                    })
                })
            }),
            i.closest(".field-wrap").find(".field-control, .field-file-btn").on("click", function(e) {
                e.preventDefault(),
                i.trigger("click")
            });
            var l = !1
              , a = f(t).closest(".field-type-image");
            a.length && "undefined" != typeof FileReader && (a.find(".file-preview-image img") && a.addClass("has-file"),
            a.find(".file-preview").on("click", function(e) {
                e.preventDefault(),
                i.trigger("click")
            }),
            (l = new FileReader).onloadstart = function() {
                a.removeClass("has-file")
            }
            ,
            l.onload = function(e) {
                a.find(".file-preview-image").empty().html('<img src="' + e.target.result + '" alt="" />'),
                a.addClass("has-file")
            }
            ,
            i.on("change.imageField", function() {
                var e = this.files ? this.files : this.currentTarget.files;
                e.length ? l.readAsDataURL(e[0]) : a.removeClass("has-file").find(".file-preview-image").empty()
            }),
            o && o.length && o.data("imageFields", (o.data("imageFields") || f([])).add(i)).off(".imageFields").on("reset.imageFields", function() {
                var e = f(this);
                setTimeout(function() {
                    e.data("imageFields").each(function(e, t) {
                        f(t).find('input[type="file"]').triggerHandler("change.imageField")
                    })
                })
            }))
        }),
        f("[data-inview-showup]").each(function() {
            var t = f(this);
            t.addClass("inview-showup"),
            new Waypoint({
                element: t,
                handler: function() {
                    t.removeClass("inview-showup");
                    var e = t.data("inviewShowup");
                    e && t.addClass(e),
                    this.destroy()
                },
                offset: "100%",
                group: "inview"
            })
        }),
        f(".shuffle-js").each(function(e, t) {
            var o = f(t)
              , i = f(t).find(".shuffle-items")
              , l = new Shuffle(i[0],{
                itemSelector: ".shuffle-item"
            })
              , a = o.find("[data-filter]");
            a.on("click", function(e) {
                e.preventDefault(),
                o.find(".shuffle-empty").css("display", "none");
                var t, i = f(this);
                try {
                    t = JSON.parse(i.data("filter"))
                } catch (e) {
                    t = i.data("filter")
                }
                a.removeClass("active"),
                i.addClass("active"),
                l.filter(t)
            }),
            l.on(Shuffle.EventType.LAYOUT, function() {
                f(window).trigger("resize"),
                o.find(".shuffle-empty").css("display", l.visibleItems ? "none" : "block")
            })
        });
        var c = ["min", "max"]
          , d = function(e, o) {
            e.each(function(e, t) {
                var i = f(t);
                i.is("input, textarea, select") ? i.val(o) : i.html(o)
            })
        };
        f("[data-ui-range-slider]").each(function(e, t) {
            for (var i = f(t), o = i.find(".slider-container"), l = i.find("[data-slider-from]"), a = i.find("[data-slider-to]"), n = i.data(), s = {
                range: !0,
                values: [l.filter("input").first().val() || n.from || n.min || 0, a.filter("input").first().val() || n.to || n.max || 0],
                create: function() {
                    d(l, s.values[0]),
                    d(a, s.values[1])
                },
                slide: function(e, t) {
                    d(l, t.values[0]),
                    d(a, t.values[1])
                }
            }, r = 0; r < c.length; r++)
                n.hasOwnProperty(c[r]) && (s[c[r]] = n[c[r]]);
            o.slider(s)
        }),
        f("[data-preview-image]").each(function(e, t) {
            var i = f(t)
              , o = f([])
              , l = f([])
              , a = i.data("previewImage") || "";
            f('[data-preview-image-source="' + a + '"]').on("mouseenter.previewImage", function() {
                var e = f(this);
                o.is(e) || (l.clearQueue().fadeOut(500, function() {
                    f(this).remove()
                }),
                l = (o = e).clone(!0, !0).removeClass().off(".previewImage").css({
                    display: "none",
                    transition: "none"
                }).appendTo(i).fadeIn(500))
            }).first().triggerHandler("mouseenter")
        });
        var t = function() {
            0 < f(window).scrollTop() ? f(".scroll-top").removeClass("disabled") : f(".scroll-top").addClass("disabled")
        };
        t(),
        f(window).on("scroll resize orientationchange focus", t),
        f(".scroll-top").on("click", function(e) {
            e.preventDefault(),
            f("html, body").animate({
                scrollTop: 0
            }, 1e3)
        }),
        f("ul.categories-list > li .open-sub-link").on("click", function(e) {
            e.preventDefault();
            var t = f(this)
              , i = t.closest("li").toggleClass("active")
              , o = i.hasClass("active") ? i : f([]);
            i.closest("ul").find("> li.active").not(o).removeClass("active")
        }),
        initMap = function() {
            var s = new google.maps.StyledMapType([{
                elementType: "geometry",
                stylers: [{
                    color: "#f5f5f5"
                }]
            }, {
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#616161"
                }]
            }, {
                elementType: "labels.text.stroke",
                stylers: [{
                    color: "#f5f5f5"
                }]
            }, {
                featureType: "administrative.land_parcel",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#bdbdbd"
                }]
            }, {
                featureType: "poi",
                elementType: "geometry",
                stylers: [{
                    color: "#eeeeee"
                }]
            }, {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#757575"
                }]
            }, {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{
                    color: "#e5e5e5"
                }]
            }, {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#9e9e9e"
                }]
            }, {
                featureType: "road",
                elementType: "geometry",
                stylers: [{
                    color: "#ffffff"
                }]
            }, {
                featureType: "road.arterial",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#757575"
                }]
            }, {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{
                    color: "#dadada"
                }]
            }, {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#616161"
                }]
            }, {
                featureType: "road.local",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#9e9e9e"
                }]
            }, {
                featureType: "transit.line",
                elementType: "geometry",
                stylers: [{
                    color: "#e5e5e5"
                }]
            }, {
                featureType: "transit.station",
                elementType: "geometry",
                stylers: [{
                    color: "#eeeeee"
                }]
            }, {
                featureType: "water",
                elementType: "geometry",
                stylers: [{
                    color: "#c9c9c9"
                }]
            }, {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#9e9e9e"
                }]
            }],{
                name: "Styled Map"
            });
            f(".gmap").each(function(e, t) {
                var i = f(t)
                  , o = i.data()
                  , l = {
                    lat: o.lat,
                    lng: o.lng
                }
                  , a = {
                    lat: o.centerLat || l.lat - .002,
                    lng: o.centerLng || l.lng + .003
                }
                  , n = new google.maps.Map(t,{
                    center: a,
                    zoom: o.zoom || 15,
                    scrollwheel: !1,
                    zoomControl: !0,
                    zoomControlOptions: {
                        position: google.maps.ControlPosition.LEFT_CENTER
                    },
                    streetViewControl: !0,
                    streetViewControlOptions: {
                        position: google.maps.ControlPosition.LEFT_BOTTOM
                    },
                    mapTypeControlOptions: {
                        mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain", "styled_map"]
                    }
                });
                new google.maps.Marker({
                    position: l,
                    map: n,
                    icon: o.marker || "./assets/images/parts/map-marker.png"
                }),
                n.mapTypes.set("styled_map", s),
                n.setMapTypeId("styled_map"),
                f(window).on("resize", function() {
                    google.maps.event.trigger(n, "resize"),
                    n.setCenter(a)
                })
            })
        }
        ,
        f(".chosen-field select.field-control").each(function(e, t) {
            var i = f(t);
            i.chosen({
                width: "100%",
                disable_search_threshold: 10
            })
        }),
        f(".user-tickets .user-ticket .item-header").on("click", function(e) {
            e.preventDefault();
            var t = f(this).closest(".user-ticket")
              , i = f(this).closest(".user-tickets").find(".user-ticket").not(t);
            t.toggleClass("active"),
            i.removeClass("active")
        }),
        f(".user-orders .user-order .item-header").on("click", function(e) {
            e.preventDefault();
            var t = f(this).closest(".user-order")
              , i = f(this).closest(".user-orders").find(".user-order").not(t);
            t.toggleClass("active"),
            i.removeClass("active")
        })
    }(jQuery)
}();
