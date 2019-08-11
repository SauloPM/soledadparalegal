$(document).ready(function() {

    // WOW
    new WOW({
        mobile: false
    }).init();

    // Spinner
    hideSpinner();

    // Top Button Revealing
    showTopButton();

    // ────────────── //
    //     NAVBAR     //
    // ────────────── //

    resizeNavbar();
    highlightNavbar();

    // ──────────────── //
    //     TRAINING     //
    // ──────────────── //

    // Timeline
    $(document).on("click", "#training .year", function () {
        
        // We check if another timeline animation is executing previously just to prevent it to stop
        if ($("#training .indicator").is(":animated") || $("#training .year-content").is(":animated"))
            return;

        var targetYear  = $(this).attr("data-year");
        var currentYear = $("#training .year.active").attr("data-year");

        // We do nothing if the user selects the same year
        if ( currentYear == targetYear )
            return;

        // Selected year updated
        $("#training .year.active").removeClass("active");
        $(this).addClass("active");

        // We move the indicator below the selected year
        var position = $(this).position();
        $("#training .indicator").animate({
            left: position.left + 28
        }, { duration: 500, queue: false });

        // We hide the previous year content just to show the one belonging to the selected year
        if ( currentYear < targetYear ) {
            $("#training .year-content.active").animate(
                { opacity: "0", left: "-100px" },
                { duration: 500, queue: false, done: function () {
                    $("#training .year-content.active").css({"position" : "absolute", "left" : ""}).removeClass("active");
                    $("#training .year-content[data-content='" + targetYear + "']").css({"position" : "relative", "right" : "-100px"}).animate(
                        { opacity: "1", right: "0" },
                        { duration: 500, done: function () {
                            $("#training .year-content[data-content='" + targetYear + "']").css({"right" : ""}).addClass("active")
                        }
                    });
                }
            });
        }
        else {
            $("#training .year-content.active").animate(
                { opacity: "0", right: "-100px" },
                { duration: 500, queue: false, done: function () {
                    $("#training .year-content.active").css({"position" : "absolute", "right" : ""}).removeClass("active");
                    $("#training .year-content[data-content='" + targetYear + "']").css({"position" : "relative", "left" : "-100px"}).animate(
                        { opacity: "1", left: "0" },
                        { duration: 500, done: function () {
                            $("#training .year-content[data-content='" + targetYear + "']").css({"left" : ""}).addClass("active")
                        }
                    });
                }
            });
        }
    });

    // ──────────────────── //
    //     TESTIMONIALS     //
    // ──────────────────── //

    // Carousel
    $("#testimonials .navigation").click(function () {

        var pos   = $("#testimonials .testimonial-wrapper.active").attr("data-position");
        var total = $("#testimonials .testimonial-wrapper").length;

        $("#testimonials .testimonial-wrapper.active").css("opacity", "0");
        setTimeout(function () { $("#testimonials .testimonial-wrapper.active").removeClass("active") }, 1000);

        if ( $(this).hasClass("navigation-left") && ( pos == 1 ) )
            setTimeout(function () { $("#testimonials .testimonial-wrapper[data-position='" + total + "']").addClass("active"); }, 1000);
        else if ( $(this).hasClass("navigation-right") && ( pos == total ) )
            setTimeout(function () { $("#testimonials .testimonial-wrapper[data-position='1']").addClass("active"); }, 1000);
        else if ( $(this).hasClass("navigation-right") )
            setTimeout(function () { $("#testimonials .testimonial-wrapper[data-position='" + (++pos) + "']").addClass("active"); }, 1000);
        else
            setTimeout(function () { $("#testimonials .testimonial-wrapper[data-position='" + (--pos) + "']").addClass("active"); }, 1000);

        setTimeout(function () { $("#testimonials .testimonial-wrapper.active").css("opacity", "1"); }, 1500);
    })
});

$(document).scroll(function() {
    parallax();
    resizeNavbar();
    highlightNavbar();
    showTopButton();
});

// ────────────── //
//     NAVBAR     //
// ────────────── //

// Function in charge of highlighting the current navigation bar item
function highlightNavbar() {
    
    // Header
    if ($(this).scrollTop() < $("#bienvenida").position().top) {
        $("nav .item i").css("color", "white");
        $("nav .item a").css("color", "white");
    }

    // Bienvenida
    if ($(this).scrollTop() >= $("#bienvenida").position().top) {
        $("nav .item i").css("color", "white");
        $("nav .item:nth-child(1) i").css("color", "#C18F59");
        $("nav .item a").css("color", "white");
        $("nav .item:nth-child(1) a").css("color", "#C18F59");
    }

    // Experiencia
    if ($(this).scrollTop() >= $("#experiencia").position().top) {
        $("nav .item i").css("color", "white");
        $("nav .item:nth-child(2) i").css("color", "#C18F59");
        $("nav .item a").css("color", "white");
        $("nav .item:nth-child(2) a").css("color", "#C18F59");
    }

    // Training
    if ($(this).scrollTop() >= $("#training").position().top) {
        $("nav .item i").css("color", "white");
        $("nav .item:nth-child(3) i").css("color", "#C18F59");
        $("nav .item a").css("color", "white");
        $("nav .item:nth-child(3) a").css("color", "#C18F59");
    }

    // Contact
    if ($(this).scrollTop() >= $("#contacto").position().top) {
        $("nav .item i").css("color", "white");
        $("nav .item:nth-child(4) i").css("color", "#C18F59");
        $("nav .item a").css("color", "white");
        $("nav .item:nth-child(4) a").css("color", "#C18F59");
    }
}

// Function in charge of resizing the navigation bar according to the scroll position
function resizeNavbar() {
    if ($( document ).width() > 768) {
        if ($(this).scrollTop() > 250)
            $("nav").css({"padding" : "15px 0", "background-color" : "#2D3241"});
        else
            $("nav").css({"padding" : "40px 0", "background-color" : "rgba(45,50,65,.75)"});
    }
    else
        $("nav").css("padding", "20px 0");
}

// ────────────────── //
//     TOP BUTTON     //
// ────────────────── //

// Top Button Revealing
function showTopButton () {
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150)
        $(".top-button").css("opacity", "1");
    else
        $(".top-button").css("opacity", "0");
}

// ─────────────── //
//     SPINNER     //
// ─────────────── //

function hideSpinner () {
    $("#preloader .spinner").fadeOut(500, function () {
        $("#preloader").delay(500).fadeOut(500);
        setTimeout(function () { $("body").css("overflow", "visible"); }, 500);
    });
}

// ──────────────── //
//     PARALLAX     //
// ──────────────── //

// Function in charge of header's background image slowdown on scroll (a half of its normal speed)
function parallax() {
    $("header").css("background-position", "center " + ($(document).scrollTop() * .5) + "px");
}