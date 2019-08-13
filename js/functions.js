$(window).on("load", function() {

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

        // Legal        
        if ($('body').hasClass('legal')) {
            if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150)
                $(".top-button").css("right", "25px");
            else
                $(".top-button").css("right", "-75px");
        }

        // Página de inicio
        else {
            if ($(this).scrollTop() >= $("#bienvenida").position().top)
                $(".top-button").css("right", "25px");
            else
                $(".top-button").css("right", "-75px");
        }
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
        if ($( document ).width() >= 768) {
            if ($(this).scrollTop() > 250) {
                $("nav").css("background", "#2D3241");
                $("nav .item").css("padding", "25px 40px");
            }
            else {
                $("nav").css("background", "rgba(45,50,65,.75)");
                $("nav .item").css("padding", "40px");
            }
        }
        else {
            if ($(this).scrollTop() >= $("#bienvenida").position().top) {
                $("nav").css("bottom", "0");
            }
            else {
                $("nav").css("bottom", "-75px");
            }
        }
    }

    // Function in charge of highlighting the current navigation bar item
    function highlightNavbar() {

        // Contacto
        if ($(this).scrollTop() >= $("#contacto").position().top) {
            $("nav .item").css("color", "white");
            $("nav .item:nth-child(4)").css("color", "#C18F59");
        }
        
        // Formación
        else if ($(this).scrollTop() >= $("#formacion").position().top) {
            $("nav .item").css("color", "white");
            $("nav .item:nth-child(3)").css("color", "#C18F59");
        }
        
        // Experiencia
        else if ($(this).scrollTop() >= $("#experiencia").position().top) {
            $("nav .item").css("color", "white");
            $("nav .item:nth-child(2)").css("color", "#C18F59");
        }
        
        
        // Bienvenida
        else if ($(this).scrollTop() >= $("#bienvenida").position().top) {
            $("nav .item").css("color", "white");
            $("nav .item:nth-child(1)").css("color", "#C18F59");
        }

        // Header
        else
            $("nav .item").css("color", "white");
    }

    // ───────────────── //
    //     FORMACIÓN     //
    // ───────────────── //
    
    moverCirculo();

    $(window).on('resize', function(){
        moverCirculo();
    });

    function moverCirculo() {

        var posicion     = $("#formacion .year.active").position().left;
        var anchoYear    = $("#formacion .year.active").width();
        var anchoCirculo = $("#formacion .circulo").width();

        anchoCirculo = (anchoCirculo / 2) + 1;

        var coordenadas = (posicion + (anchoYear / 2)) - anchoCirculo;
        
        $("#formacion .circulo").animate({
            left: coordenadas
        }, { duration: 500, queue: false });
    }

    // Timeline
    $(document).on("click", "#formacion .year", function () {
        
        // We check if another timeline animation is executing previously just to prevent it to stop
        if ($("#formacion .circulo").is(":animated") || $("#formacion .year-content").is(":animated"))
            return;

        var targetYear  = $(this).attr("data-year");
        var currentYear = $("#formacion .year.active").attr("data-year");

        // We do nothing if the user selects the same year
        if ( currentYear == targetYear )
            return;

        // Selected year updated
        $("#formacion .year.active").removeClass("active");
        $(this).addClass("active");

        // We move the circle below the selected year
        moverCirculo();

        // We hide the previous year content just to show the one belonging to the selected year
        if ( currentYear < targetYear ) {
            $("#formacion .year-content.active").animate(
                { opacity: "0", left: "-100px" },
                { duration: 500, queue: false, done: function () {
                    $("#formacion .year-content.active").css({"position" : "absolute", "left" : ""}).removeClass("active");
                    $("#formacion .year-content[data-content='" + targetYear + "']").css({"position" : "relative", "right" : "-100px"}).animate(
                        { opacity: "1", right: "0" },
                        { duration: 500, done: function () {
                            $("#formacion .year-content[data-content='" + targetYear + "']").css({"right" : ""}).addClass("active")
                        }
                    });
                }
            });
        }
        else {
            $("#formacion .year-content.active").animate(
                { opacity: "0", right: "-100px" },
                { duration: 500, queue: false, done: function () {
                    $("#formacion .year-content.active").css({"position" : "absolute", "right" : ""}).removeClass("active");
                    $("#formacion .year-content[data-content='" + targetYear + "']").css({"position" : "relative", "left" : "-100px"}).animate(
                        { opacity: "1", left: "0" },
                        { duration: 500, done: function () {
                            $("#formacion .year-content[data-content='" + targetYear + "']").css({"left" : ""}).addClass("active")
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
        if ( $(this).hasClass("navigation-left") ) 
            posicion = posicion == 1 ? total : parseInt(posicion) - 1;
        else
            posicion = posicion == total ? 1 : parseInt(posicion) + 1;

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