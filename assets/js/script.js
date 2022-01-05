/*
Author       : Ahmed77Samy
Template Name: اكشف اونلاين
Version      : 0.1
*/

(function ($) {
    "use strict";

    // form validation find_help

    function handleSubmit(e) {
        var formData = new FormData(e.target);
        var maincategory = formData.get('maincategory')
        var category = formData.getAll(`${maincategory}category`)
        if(!category || category.length === 0) {
            e.preventDefault()
            $("#form_error").html("من فضلك اختار احد الاعراض !")
        }
    }

    function handleSubmitLocation(e) {
        var formData = new FormData(e.target);
        var location = formData.get('location')
        if(location === "default") {
            e.preventDefault()
            $("#form_location_error").html("من فضلك اختر احد المحافظات!")
        }
    }

    document.querySelector("#find_help")?.addEventListener("submit" , handleSubmit)
    document.querySelector("#find_hospitals")?.addEventListener("submit" , handleSubmitLocation)

    // Stick Sidebar

    if ($(window).width() > 767) {
        if ($(".theiaStickySidebar").length > 0) {
            $(".theiaStickySidebar").theiaStickySidebar({
                // Settings
                additionalMarginTop: 30
            });
        }
    }

    // Sidebar

    if ($(window).width() <= 991) {
        var Sidemenu = function () {
            this.$menuItem = $(".main-nav a");
        };

        function init() {
            var $this = Sidemenu;
            $(".main-nav a").on("click", function (e) {
                if ($(this).parent().hasClass("has-submenu")) {
                    e.preventDefault();
                }
                if (!$(this).hasClass("submenu")) {
                    $("ul", $(this).parents("ul:first")).slideUp(350);
                    $("a", $(this).parents("ul:first")).removeClass("submenu");
                    $(this).next("ul").slideDown(350);
                    $(this).addClass("submenu");
                } else if ($(this).hasClass("submenu")) {
                    $(this).removeClass("submenu");
                    $(this).next("ul").slideUp(350);
                }
            });
        }

        // Sidebar Initiate
        init();
    }

    // Textarea Text Count

    var maxLength = 100;
    $("#review_desc").on("keyup change", function () {
        var length = $(this).val().length;
        length = maxLength - length;
        $("#chars").text(length);
    });

    // add date to elemnts

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;
    $("#report_date").html(today)

    // Select 2

    if ($(".select").length > 0) {
        $(".select").select2({
            minimumResultsForSearch: -1,
            width: "100%"
        });
    }

    // Date Time Picker

    if ($(".datetimepicker").length > 0) {
        $(".datetimepicker").datetimepicker({
            format: "DD/MM/YYYY",
            icons: {
                up: "fas fa-chevron-up",
                down: "fas fa-chevron-down",
                next: "fas fa-chevron-right",
                previous: "fas fa-chevron-left"
            }
        });
    }

    // Floating Label

    if ($(".floating").length > 0) {
        $(".floating")
            .on("focus blur", function (e) {
                $(this)
                    .parents(".form-focus")
                    .toggleClass("focused", e.type === "focus" || this.value.length > 0);
            })
            .trigger("blur");
    }

    // Mobile menu sidebar overlay

    $("body").append('<div class="sidebar-overlay"></div>');
    $(document).on("click", "#mobile_btn", function () {
        $("main-wrapper").toggleClass("slide-nav");
        $(".sidebar-overlay").toggleClass("opened");
        $("html").addClass("menu-opened");
        return false;
    });

    $(document).on("click", ".sidebar-overlay", function () {
        $("html").removeClass("menu-opened");
        $(this).removeClass("opened");
        $("main-wrapper").removeClass("slide-nav");
    });

    $(document).on("click", "#menu_close", function () {
        $("html").removeClass("menu-opened");
        $(".sidebar-overlay").removeClass("opened");
        $("main-wrapper").removeClass("slide-nav");
    });

    // Tooltip

    if ($('[data-bs-toggle="tooltip"]').length > 0) {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Add More Hours

    $(".hours-info").on("click", ".trash", function () {
        $(this).closest(".hours-cont").remove();
        return false;
    });

    $(".add-hours").on("click", function () {
        var hourscontent = '<div class="row form-row hours-cont">' + '<div class="col-12 col-md-10">' + '<div class="row form-row">' + '<div class="col-12 col-md-6">' + '<div class="form-group">' + "<label>Start Time</label>" + '<select class="form-select form-control">' + "<option>-</option>" + "<option>12.00 am</option>" + "<option>12.30 am</option>" + "<option>1.00 am</option>" + "<option>1.30 am</option>" + "</select>" + "</div>" + "</div>" + '<div class="col-12 col-md-6">' + '<div class="form-group">' + "<label>End Time</label>" + '<select class="form-select form-control">' + "<option>-</option>" + "<option>12.00 am</option>" + "<option>12.30 am</option>" + "<option>1.00 am</option>" + "<option>1.30 am</option>" + "</select>" + "</div>" + "</div>" + "</div>" + "</div>" + '<div class="col-12 col-md-2"><label class="d-md-block d-sm-none d-none">&nbsp;</label><a href="#" class="btn btn-danger trash"><i class="far fa-trash-alt"></i></a></div>' + "</div>";

        $(".hours-info").append(hourscontent);
        return false;
    });

    // Content div min height set

    function resizeInnerDiv() {
        var height = $(window).height();
        var header_height = $(".header").height();
        var footer_height = $(".footer").height();
        var setheight = height - header_height;
        var trueheight = setheight - footer_height;
        $(".content").css("min-height", trueheight);
    }

    if ($(".content").length > 0) {
        resizeInnerDiv();
    }

    $(window).resize(function () {
        if ($(".content").length > 0) {
            resizeInnerDiv();
        }
    });

    // category slider
    
    function categorySlider () {
        jQuery("#tg-categoryslider .item").on("click", function () {
            var _this = jQuery(this);
            var dataId = _this.data("id");
            var contentParent = _this.parents(".tg-searchbulder").find(".tg-subcategories");
            contentParent.find(".tg-tabcontent").hide().removeClass("tg-active");
            contentParent.find("#" + dataId).show().addClass("tg-active");
        });
    }
    setTimeout(() => {
        var _this = $('.tg-category input[type="radio"]:checked').closest('.item');
        var dataId = _this.data("id");
        var contentParent = _this.parents(".tg-searchbulder").find(".tg-subcategories");
        contentParent.find("#" + dataId).show().addClass("tg-active");
    });
    categorySlider()

    // Slick Slider

    if ($(".tg-searchbulder #tg-categoryslider").length > 0) {
        $(".tg-searchbulder #tg-categoryslider").slick({
            slidesToShow: 3,
            infinite: false,
            slidesToScroll: 1,
            rtl: true,
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 400,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
        $(".tg-searchbulder #tg-categoryslider").on('setPosition', categorySlider);
    }

    if ($(".specialities-slider").length > 0) {
        $(".specialities-slider").slick({
            dots: true,
            autoplay: false,
            infinite: true,
            variableWidth: true,
            prevArrow: false,
            rtl: true,
            nextArrow: false
        });
    }

    if ($(".testimonial-slider").length > 0) {
        $(".testimonial-slider").slick({
            dots: true,
            autoplay: false,
            infinite: true,
            prevArrow: false,
            nextArrow: false,
            rtl: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 776,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 567,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }

    if ($(".solution-slider").length > 0) {
        $(".solution-slider").slick({
            dots: false,
            autoplay: false,
            infinite: true,
            slidesToShow: 3,
            rtl: true,
            slidesToScroll: 3,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    if ($(".testimonials-slider").length > 0) {
        $(".testimonials-slider").slick({
            dots: true,
            autoplay: false,
            infinite: true,
            prevArrow: false,
            nextArrow: false,
            rtl: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    // Date Range Picker
    if ($(".bookingrange").length > 0) {
        var start = moment().subtract(6, "days");
        var end = moment();

        function booking_range(start, end) {
            $(".bookingrange span").html(start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY"));
        }

        $(".bookingrange").daterangepicker(
            {
                startDate: start,
                endDate: end,
                ranges: {
                    Today: [moment(), moment()],
                    Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
                    "Last 7 Days": [moment().subtract(6, "days"), moment()],
                    "Last 30 Days": [moment().subtract(29, "days"), moment()],
                    "This Month": [moment().startOf("month"), moment().endOf("month")],
                    "Last Month": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")]
                }
            },
            booking_range
        );

        booking_range(start, end);
    }

    // Circle Progress Bar

    function animateElements() {
        $(".circle-bar1").each(function () {
            var elementPos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            var percent = $(this).find(".circle-graph1").attr("data-percent");
            var animate = $(this).data("animate");
            if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
                $(this).data("animate", true);
                $(this)
                    .find(".circle-graph1")
                    .circleProgress({
                        value: percent / 100,
                        size: 400,
                        thickness: 30,
                        fill: {
                            color: "#da3f81"
                        }
                    });
            }
        });
        $(".circle-bar2").each(function () {
            var elementPos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            var percent = $(this).find(".circle-graph2").attr("data-percent");
            var animate = $(this).data("animate");
            if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
                $(this).data("animate", true);
                $(this)
                    .find(".circle-graph2")
                    .circleProgress({
                        value: percent / 100,
                        size: 400,
                        thickness: 30,
                        fill: {
                            color: "#68dda9"
                        }
                    });
            }
        });
        $(".circle-bar3").each(function () {
            var elementPos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            var percent = $(this).find(".circle-graph3").attr("data-percent");
            var animate = $(this).data("animate");
            if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
                $(this).data("animate", true);
                $(this)
                    .find(".circle-graph3")
                    .circleProgress({
                        value: percent / 100,
                        size: 400,
                        thickness: 30,
                        fill: {
                            color: "#1b5a90"
                        }
                    });
            }
        });
    }

    if ($(".circle-bar").length > 0) {
        animateElements();
    }
    $(window).scroll(animateElements);

    // Preloader

    $(window).on("load", function () {
        if ($("#loader").length > 0) {
            $("#loader").delay(350).fadeOut("slow");
            $("body").delay(350).css({ overflow: "visible" });
        }
    });
})(jQuery);
