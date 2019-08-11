$(document).ready(function() {

    // WOW
    new WOW({
        mobile: false
    }).init();

    // Smooth Scrolling Links
    $(".smooth-scrolling").click(function (event) {
        event.preventDefault();
        var target = $(this).attr("href");
        $("html, body").stop().animate({ scrollTop: $(target).offset().top }, 1500, 'easeInOutExpo');
    });

    // ─────────────── //
    //     SPINNER     //
    // ─────────────── //

    hideSpinner();

    // Spinner hidding
    function hideSpinner () {
        $("#preloader .spinner").fadeOut(500, function () {
            $("#preloader").delay(500).fadeOut(500);
            setTimeout(function () { $("body").css("overflow", "visible"); }, 500);
        });
    }

    // ────────────────── //
    //     TOP BUTTON     //
    // ────────────────── //

    showTopButton();

    $(document).scroll(function() {
        showTopButton();
    });

    // Top button revealing
    function showTopButton () {
        if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150)
            $(".top-button").css("opacity", "1");
        else
            $(".top-button").css("opacity", "0");
    }

    // ──────────────── //
    //     PARALLAX     //
    // ──────────────── //

    $(document).scroll(function() {
        parallax();
    });

    // Function in charge of header's background image slowdown on scroll (a half of its normal speed)
    function parallax() {
        $("header").css("background-position", "center " + ($(document).scrollTop() * .5) + "px");
    }

    // ────────────── //
    //     NAVBAR     //
    // ────────────── //

    resizeNavbar();
    highlightNavbar();

    $(document).scroll(function() {
        resizeNavbar();
        highlightNavbar();
    });

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
    $("#testimonios .navigation").click(function () {

        var total    = $("#testimonios .testimonio").length;
        var posicion = $("#testimonios .testimonio.activo").attr("data-position");

        // Ajustamos el índice del nuevo testimonio
        if ( $(this).hasClass("navigation-left" ) && ( posicion == 1 ) ) {
            posicion = total;   
        }
        else if ( $(this).hasClass("navigation-right") && ( posicion == total ) ) {
            posicion = 1;
        }
        else if ( $(this).hasClass("navigation-right") ) {
            posicion++;
        }
        else {
            posicion--;
        }

        // Ocultamos el testimonio anterior
        $("#testimonios .testimonio.activo").css("opacity", "0");

        // Activamos el nuevo testimonio
        setTimeout(function () {
            $("#testimonios .testimonio.activo").removeClass("activo");
            $("#testimonios .testimonio[data-position='" + posicion + "']").addClass("activo");
        }, 1000);

        // Mostramos el nuevo testimonio
        setTimeout(function () {
            $("#testimonios .testimonio.activo").css("opacity", "1");
        }, 1500);
    })
});