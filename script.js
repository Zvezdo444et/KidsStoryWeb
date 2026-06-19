function el(tag, opts = {}) {
  const e = document.createElement(tag);

  if (opts.className) e.className = opts.className;
  if (opts.id) e.id = opts.id;
  if (opts.text) e.textContent = opts.text;
  if (opts.html) e.innerHTML = opts.html;
  if (opts.href) e.href = opts.href;
  if (opts.src) e.src = opts.src;
  if (opts.alt !== undefined) e.alt = opts.alt;
  if (opts.type) e.type = opts.type;
  if (opts.placeholder) e.placeholder = opts.placeholder;

  if (opts.attrs) {
    Object.entries(opts.attrs).forEach(([k, v]) => e.setAttribute(k, v));
  }

  if (opts.onclick) e.onclick = opts.onclick;

  return e;
}

function toggleCheckbox(el) {
  const dot = el.querySelector(".checkbox-dot--toggle");
  if (dot) dot.classList.toggle("checkbox-dot--checked");
}

function toggleMenu() {
  document.getElementById("mainMenu").classList.toggle("open");
}

var teamIndex = 0;

function teamSlide(dir) {
  const track = document.getElementById("teamTrack");
  const cards = track.querySelectorAll(".team-card");
  const w = window.innerWidth;
  const visible = w <= 425 ? 1 : w <= 768 ? 2 : w <= 1024 ? 2 : 4;
  const max = cards.length - visible;

  teamIndex = Math.max(0, Math.min(teamIndex + dir, max));

  const cardW = cards[0].offsetWidth + parseInt(getComputedStyle(track).gap);
  track.style.transform = "translateX(-" + teamIndex * cardW + "px)";
}

$(document).ready(function () {
  $("input[type='tel']").inputmask("+7 (999) 999-99-99");

  $("#tour-date").datepicker({
    dateFormat: "dd.mm.yy",
    minDate: 0,
    changeMonth: true
  });

  $(window).on("load", function () {
    $("#page-loader").fadeOut(500);
  });

  setTimeout(function () {
    $("#page-loader").fadeOut(500);
  }, 3000);

  var $banner = $("#animated-banner");
  $banner.hide().slideDown(600);

  setInterval(function () {
    $banner.fadeTo(300, 0.5).fadeTo(300, 1);
  }, 4000);

  $("#banner-close").on("click", function () {
    $banner.slideUp(400);
  });

  function checkScroll() {
    $("section, .feature-item, .service-card, .team-card, .review-card").each(function () {
      if (!$(this).hasClass("scroll-hidden") && !$(this).hasClass("scroll-visible")) {
        $(this).addClass("scroll-hidden");
      }

      var top = $(this).offset().top;
      var bottom = $(window).scrollTop() + $(window).height();

      if (bottom > top + 60) {
        $(this).removeClass("scroll-hidden").addClass("scroll-visible");
      }
    });
  }

  checkScroll();
  $(window).on("scroll", checkScroll);

  function shakeEl($el) {
    var left = parseInt($el.css("marginLeft")) || 0;
    $el.animate({ marginLeft: left + 8 }, 60)
      .animate({ marginLeft: left - 8 }, 60)
      .animate({ marginLeft: left + 6 }, 50)
      .animate({ marginLeft: left - 6 }, 50)
      .animate({ marginLeft: left }, 50);
  }

  $("#cf-submit").on("click", function () {
    var valid = true;
    $(".form-error").text("");
    $(".form-input").css("border-color", "");

    var name = $("#cf-name").val().trim(),
      phone = $("#cf-phone").val().trim(),
      email = $("#cf-email").val().trim(),
      age = $("#cf-age").val().trim();

    if (!name || name.length < 2) {
      $("#cf-name-err").text("Введите имя (минимум 2 символа)");
      $("#cf-name").css("border-color", "#EA5D4A");
      shakeEl($("#cf-name"));
      valid = false;
    }

    if (!phone || phone.replace(/\D/g, "").length < 11) {
      $("#cf-phone-err").text("Введите корректный телефон");
      $("#cf-phone").css("border-color", "#EA5D4A");
      shakeEl($("#cf-phone"));
      valid = false;
    }

    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRe.test(email)) {
      $("#cf-email-err").text("Введите корректный email");
      $("#cf-email").css("border-color", "#EA5D4A");
      shakeEl($("#cf-email"));
      valid = false;
    }

    if (!age || isNaN(age) || age < 1 || age > 18) {
      $("#cf-age-err").text("Введите возраст от 1 до 18");
      $("#cf-age").css("border-color", "#EA5D4A");
      shakeEl($("#cf-age"));
      valid = false;
    }

    if (valid) {
      $("#cf-success").slideDown(400);
      $("#cf-submit").prop("disabled", true).text("ОТПРАВЛЕНО");
    }
  });

  $(".form-input").on("input", function () {
    $(this).css("border-color", "");
    $("#" + this.id + "-err").text("");
  });

  var slideIdx = 0;

  function goSlide(n) {
    var slides = $(".img-slide"),
      thumbs = $(".gallery-thumb");

    slides.removeClass("active");
    thumbs.removeClass("active");

    slideIdx = (n + slides.length) % slides.length;

    slides.eq(slideIdx).addClass("active");
    thumbs.eq(slideIdx).addClass("active");
  }

  $(".img-slider-prev").on("click", function () {
    goSlide(slideIdx - 1);
  });

  $(".img-slider-next").on("click", function () {
    goSlide(slideIdx + 1);
  });

  $(".gallery-thumb").on("click", function () {
    goSlide($(this).index());
  });

  $("#faq-accordion").accordion({
    collapsible: true,
    active: false,
    heightStyle: "content"
  });
});
