//https://stackoverflow.com/questions/57149210/toggle-between-divs-how-to-show-only-one-div-at-a-time
let index = false;
let mobile;

let $currentD2, $currentD1, $currentI;
let tid, hid;
let pShowing = false,
  iShowing = false,
  infShowing = false;
let slideIndex = 1;
let scrollCurrent = 0;
let slides;

window.onresize = function () {
  detectMedia();
};
window.onload = function () {
  detectMedia();
};

function detectMedia() {
  if (window.matchMedia("(max-width: 1000px)").matches) {
    mobile = true;
    return true;
  } else {
    mobile = false;
    return false;
  }
}

/* MOBILE */

/* MOBILE NAVIGATION */

if (detectMedia() === true) {
 // previewSlider();
  $("#sectionInfo").toggle();

  $(".pLink").click(function () {
    $("#sectionIndex").toggle();
    $("#sectionDisplay").toggle();
    $("#sectionInfo").hide();
  });

  $("#iLink").click(function () {
    $("#sectionInfo").toggle();
    $("#sectionDisplay").toggle();

    infShowing = !infShowing;
    if (infShowing) {
      console.log("showing");
      scrollCurrent = $(window).scrollTop();
      window.scrollTo(0, 0);
    } else {
      console.log("not showing");
      window.scrollTo(scrollCurrent, 0);
    }
  });

  /* MOBILE IMAGE SLIDER */

  let slideShowEls = $(".imageContainer");

  let createSlideShow = function createSlideShow(elements) {
    // Now, we need to create the listeners for the
    //   next and prev clicks.
    $(slideShowEls).on("click", function () {
      $(this).find(".imageSlide:visible").hide().next().show();
      $(slideShowEls).not($(this)).children(".imageSlide").first().show();
      if (!$(this).find(".imageSlide").is(":visible")) {
        $(this).children(".imageSlide").first().show();
      }
    });
  };
  createSlideShow(slideShowEls);

  /* MOBILE SCROLL BETWEEN SECTIONS */
  /*
  let ultimoscroll = 0;
  let animacion = false;

  $(window).scroll(function () {
    $(".proj").mouseover(function () {
      console.log($(this).next().offset());

      let st = $(this).scrollTop();
      if (st > ultimoscroll) {
        if (animacion == false) {
          animacion = true;
          //Cuando baja
          $("html, body").animate(
            { scrollTop: $(this).next().offset().top },
            500,
            function () {
              ultimoscroll = $(window).scrollTop();
              animacion = false;
            }
          );
        }
      } else {
        if (animacion == false) {
          animacion = true;
          //Cuando sube
          $("html, body").animate({ scrollTop: 0 }, 500, function () {
            ultimoscroll = $(window).scrollTop();
            animacion = false;
          });
        }
      }
    });
  });*/

  /* DESKTOP */
} else {
  $("#sectionInfo").toggle();
  //previewSlider();

  /*DESKTOP : PROJECT TOGGLE DESKTOP*/

  $(".pLink").click(function () {
    //get the data-div of the trigger link

    $(this).toggleClass("active");
    $(this).parent().siblings().toggleClass("active");

    if (iShowing) {
      $('.imageContainer[data-img="' + hid + '"]').hide();
      iShowing = !iShowing;
    }

    slideIndex = 1;
    tid = $(this).data("div");

    //hide all projects then show only the one's data-img same as the trigger link

    $currentI = $('.imageContainer[data-img="' + tid + '"]').toggle();
    $(".imageContainer").not($currentI).hide();

    $(".pLink").not(this).removeClass("active");
    $(".pLink").not(this).parent().siblings().removeClass("active");
    // set pShowing boolean to use later

    if ($('.imageContainer[data-img="' + tid + '"]').is(":visible")) {
      pShowing = true;
    } else {
      pShowing = false;
    }

    //give current tag to images to show corresponding project images
    $(".imageContainer").not($currentI).children().removeClass("current");
    $('.imageContainer[data-img="' + tid + '"]')
      .children()
      .addClass("current");

    // show images corresponding to project
    showSlides(slideIndex);

    // show the current description + sliding arrows if project is open
    if (pShowing && slides.length > 1) {
      $("#currentDescription").css("display", "block");
      $("#slideArrows").css("visibility", "visible");
    } else if (pShowing && slides.length == 1) {
      $("#currentDescription").css("display", "block");
      $("#slideArrows").css("visibility", "hidden");
    } else {
      $("#currentDescription").css("display", "none");
      $("#slideArrows").css("visibility", "hidden");
    }

    // make sure caption shows project description + image specific caption
    // HIDDEN FOR NOW

    $currentD1 = $("figcaption")
      .filter(`[data-img="${tid}"][data-caption="${slideIndex}"]`)
      .html();

    $("#currentDescription").html($currentD1 /*+ $currentD2*/);
    //previewSlider();
  });

  /*IMAGE SLIDING*/

  function plusSlides(n) {
    showSlides((slideIndex += n));
    $currentD1 = $("figcaption")
      .filter(`[data-img="${tid}"][data-caption="${slideIndex}"]`)
      .html();
    // HIDDEN FOR NOW
    $("#currentDescription").html($currentD1 /*+ $currentD2*/);
  }

  function currentSlide(n) {
    showSlides((slideIndex = n));
  }

  function showSlides(n) {
    let i;
    slides = $(".current");

    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";
  }

  /* INFO + CONTACT TOGGLE */

  $("#iLink").click(function () {
    $("#iLink").toggleClass("active");
    $("#sectionInfo").toggle();
    infShowing = !infShowing;
    if (infShowing) {
      $(".imageContainer").hide();
      $(".pLink").removeClass("active");
      $(".pLink").parent().siblings().removeClass("active");
      $("#slideArrows").css("visibility", "hidden");
      $("#currentDescription").css("display", "none");
      pShowing = false;
    }
    //previewSlider();
  });

  /*IMAGE SHOW ON HOVER*/

  $(".pLink").on("mouseenter", function () {
    hid = $(this).data("div");
    if (!pShowing) {
      $('.imageContainer[data-img="' + hid + '"]').show();
      iShowing = true;
    }
    //previewSlider();
  });

  $(".pLink").on("mouseleave", function () {
    hid = $(this).data("div");
    if (!pShowing) {
      $('.imageContainer[data-img="' + hid + '"]').hide();
      iShowing = false;
    }
    //previewSlider();
  });
}
/*
function previewSlider() {
  //IMAGE CAROUSEL

  if (!pShowing && !iShowing && !infShowing) {
    $("#previewContainer").show();
    $("#previewContainer > fig:gt(0)").hide();


    setInterval(function () {
    
      $("#previewContainer > fig:first")
        .hide()
        .delay()
        .next()
        .show()
        .delay()
        .end()
        .appendTo("#slideshow");
    }, 3000);
  } else {
    $("#previewContainer").hide();
  }
}
*/
