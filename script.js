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
  if (opts.attrs) Object.entries(opts.attrs).forEach(([k, v]) => e.setAttribute(k, v));
  if (opts.onclick) e.onclick = opts.onclick;
  return e;
}

function checkbox(dotClass, labelClass, labelText) {
  const wrap = el("div", { className: "questions-checkbox", onclick: function () { toggleCheckbox(this); } });
  wrap.append(
    el("span", { className: "checkbox-dot checkbox-dot--toggle " + dotClass }),
    el("span", { className: "checkbox-label " + labelClass, text: labelText })
  );
  return wrap;
}

function buildHeader() {
  const header = el("header", { className: "header" });
  const headerTop = el("div", { className: "header-top" });

  const logo = el("div", { className: "logo" });
  const logoLink = el("a", { href: "index.html" });
  logoLink.append(el("img", { src: "images/logo.png", alt: "Kids Story" }));
  logo.append(logoLink);

  const burger = el("button", { className: "burger", html: "&#9776;", attrs: { "aria-label": "Меню" }, onclick: toggleMenu });

  const nav = el("nav", { className: "menu", id: "mainMenu" });

  const menuItems = [
    { label: "О нас", sub: [{ text: "О центре", href: "about.html" }, { text: "Родителям", href: "parents.html" }] },
    { label: "Расписание", sub: [{ text: "Расписание основное", href: "#" }, { text: "Дополнительные услуги", href: "services.html" }] },
    { label: "Программа", sub: [{ text: "Группа (2-3 года)", href: "#" }, { text: "Группа (3-5 лет)", href: "#" }, { text: "Группа (5-7 лет)", href: "#" }] }
  ];

  menuItems.forEach(item => {
    const div = el("div", { className: "menu-item has-dropdown" });
    const link = el("a", { href: "#", className: "menu-link" });
    link.innerHTML = item.label + '<span class="arrow-line"></span>';
    const dropdown = el("div", { className: "dropdown" });
    item.sub.forEach(s => dropdown.append(el("a", { href: s.href, className: "dropdown-link", text: s.text })));
    div.append(link, dropdown);
    nav.append(div);
  });

  ["Фото и видео", "Команда", "Контакты"].forEach(t => nav.append(el("a", { href: "#", className: "menu-link", text: t })));

  const headerRight = el("div", { className: "header-right" });

  const addresses = el("div", { className: "header-addresses" });
  const addr1 = el("span", { className: "address", text: "Москва, ул. Муравская д.38, к.1" });
  const addr2 = el("span", { className: "address" });
  addr2.innerHTML = 'ЖК Мир Митино <span class="address-highlight address-highlight--blue">М. Пятницкое шоссе</span>';
  addresses.append(addr1, addr2);

  const contacts = el("div", { className: "header-contacts" });

  const phoneBlock = el("div", { className: "phone-block" });
  phoneBlock.append(
    el("img", { src: "images/phone-icon.png", alt: "", className: "phone-icon-img" }),
    el("span", { className: "phone", text: "+7 495 123 34 25" })
  );

  const socials = el("div", { className: "social-icons" });
  [["images/tg-icon.png", "Telegram"], ["images/vk-icon.png", "VK"]].forEach(([src, alt]) => {
    const a = el("a", { href: "#", className: "social-link" });
    a.append(el("img", { src, alt, className: "social-icon-img" }));
    socials.append(a);
  });

  const signupBtn = el("a", { href: "#", className: "btn-signup", text: "Записаться на экскурсию" });

  contacts.append(phoneBlock, socials, signupBtn);

  const callback = el("div", { className: "callback" });
  callback.append(el("a", { href: "#", className: "callback-link", text: "Заказать быстрый звонок" }));

  headerRight.append(addresses, contacts, callback);
  headerTop.append(logo, burger, nav, headerRight);
  header.append(headerTop);
  return header;
}

function buildSubheader() {
  const sub = el("div", { className: "subheader" });
  const nav = el("nav", { className: "submenu" });
  [
    ["О центре", "about.html"],
    ["Документы", "#"],
    ["Родителям", "parents.html"],
    ["Питание", "#"],
    ["Новости", "#"],
    ["3D тур", "#"],
    ["Отзывы", "#"]
  ].forEach(([text, href]) => nav.append(el("a", { href, className: "submenu-link", text })));
  sub.append(nav);
  return sub;
}

function buildHero() {
  const section = el("section", { className: "hero" });

  const bg = el("div", { className: "hero-bg" });
  bg.append(el("img", { src: "images/hero-bg.png", alt: "", className: "hero-bg-img" }));

  const content = el("div", { className: "hero-content" });
  const arrows = el("div", { className: "hero-arrows" });
  arrows.append(
    el("button", { className: "arrow-btn arrow-btn--outline", html: "&#8249;" }),
    el("button", { className: "arrow-btn arrow-btn--filled", html: "&#8250;" })
  );
  content.append(
    el("h1", { className: "hero-title", text: "Kidsstory" }),
    el("p", { className: "hero-subtitle", html: "Английский детский<br>сад и клуб" }),
    el("img", { src: "images/hero-content.png", alt: "", className: "hero-content-img-mobile" }),
    arrows
  );

  const form = el("div", { className: "hero-form" });

  function inputWrap(type, placeholder) {
    const wrap = el("div", { className: "input-wrap" });
    wrap.append(
      el("input", { type, placeholder, className: "hero-input" }),
      el("span", { className: "required-star", text: "*" })
    );
    return wrap;
  }

  const cbHero = el("div", { className: "hero-checkbox", onclick: function () { toggleCheckbox(this); } });
  cbHero.append(
    el("span", { className: "checkbox-dot checkbox-dot--toggle checkbox-dot--white-empty" }),
    el("span", { className: "checkbox-label", text: "Я принимаю условия пользовательского соглашения" })
  );

  form.append(
    el("h2", { className: "hero-form-title", text: "Запишитесь на персональную экскурсию" }),
    el("p", { className: "hero-form-desc", text: "Заполните форму и посмотрите детский сад вживую в удобное для вас время" }),
    inputWrap("text", "Ваше имя"),
    inputWrap("tel", "+ 7 ___ - ___ - __ - __"),
    el("input", { type: "email", className: "hero-input", placeholder: "Ваш e-mail" }),
    cbHero,
    el("button", { className: "hero-form-btn", text: "ЗАПИСАТЬСЯ" })
  );

  section.append(bg, content, form);
  return section;
}

function buildFeatures() {
  const section = el("section", { className: "features" });
  const grid = el("div", { className: "features-grid" });

  const items = [
    ["images/icon-clock.png", "feature-icon--yellow", "Часы работы: с 7:00 до 19:00"],
    ["images/icon-group.png", "feature-icon--pink", "Группы: до 15 человек"],
    ["images/icon-area.png", "feature-icon--purple", "Площадка для прогулок: собственная оборудованная территория для прогулок"],
    ["images/icon-camera.png", "feature-icon--purple", "Видеонаблюдение: онлайн"],
    ["images/icon-english.png", "feature-icon--yellow", "Англоязычная среда: билингвал / экспат"],
    ["images/icon-age.png", "feature-icon--pink", "Возраст детей: с 1,5 до 7 лет"],
    ["images/icon-medical.png", "feature-icon--pink", "Утренний фильтр медработником: ежедневно"],
    ["images/icon-building.png", "feature-icon--purple", "Помещение: 800 кв.м"],
    ["images/icon-food.png", "feature-icon--yellow", "Питание: 5-разовое, с учетом индивидуальных особенностей ребенка"]
  ];

  items.forEach(([src, colorClass, text]) => {
    const item = el("div", { className: "feature-item" });
    const icon = el("div", { className: "feature-icon " + colorClass });
    icon.append(el("img", { src, alt: "" }));
    item.append(icon, el("span", { text }));
    grid.append(item);
  });

  section.append(grid);
  return section;
}

function buildQuestionsBlock(modifier, dotClass, labelClass, btnClass, imgShapes, imgPerson) {
  const section = el("section", { className: "questions " + modifier });
  const inner = el("div", { className: "questions-inner" });

  const left = el("div", { className: "questions-left" });
  const titleClass = modifier === "questions--purple" ? "questions-title questions-title--white" : "questions-title";
  const descClass = modifier === "questions--purple" ? "questions-desc questions-desc--white" : "questions-desc";

  const row = el("div", { className: "questions-row" });
  row.append(checkbox(dotClass, labelClass, "Я принимаю условия пользовательского соглашения"), el("button", { className: "questions-btn " + btnClass, text: "ОТПРАВИТЬ" }));

  const titleText = modifier === "questions--purple"
    ? "Есть вопросы? Получите бесплатную консультацию"
    : "Остались вопросы? Получите бесплатную консультацию";
  const inputClass = modifier === "questions--purple" ? "questions-input" : "questions-input questions-input--yellow";

  left.append(
    el("h2", { className: titleClass, text: titleText }),
    el("p", { className: descClass, text: "Оставьте телефон и мы перезвоним и расскажем все подробности о филиале" }),
    el("input", { type: "tel", className: inputClass, placeholder: "+ 7 ___ - ___ - __ - __" }),
    row
  );

  const right = el("div", { className: "questions-right" });
  right.append(
    el("img", { src: imgShapes, alt: "", className: "questions-shapes" }),
    el("img", { src: imgPerson, alt: "", className: "questions-img" })
  );

  inner.append(left, right);
  section.append(inner);
  return section;
}

function buildServices() {
  const section = el("section", { className: "services" });
  const container = el("div", { className: "container" });
  container.append(el("h2", { className: "section-title", text: "Дополнительные услуги" }));

  const grid = el("div", { className: "services-grid" });
  const services = [
    ["images/svc-yoga.png", "Йога", ""],
    ["images/svc-montessori.png", "Монтессори группа с уникальным древесинным оборудованием", "service-card--wide"],
    ["images/svc-golf.png", "Гольф для малышей", ""],
    ["images/svc-bike.png", "Занятия с беговелами", ""],
    ["images/svc-lego.png", "Легостроение и конструирование", ""],
    ["images/svc-clay.png", "Тестопластика и глинопластика", ""],
    ["images/svc-speech.png", "Риторика и ораторское мастерство", ""],
    ["images/svc-climbing.png", "Занятия по скалолазанию", ""],
    ["images/svc-theater.png", "Театрализация на английском языке", ""],
    ["images/svc-cooking.png", "Кулинария и этикет сервисного стола", ""],
    ["images/svc-sand.png", "Песочная терапия. Работа на интерактивных столах и досках", ""]
  ];

  services.forEach(([src, text, extra]) => {
    const card = el("div", { className: "service-card " + extra });
    const icon = el("div", { className: "service-icon" });
    icon.append(el("img", { src, alt: "" }));
    card.append(icon, el("span", { text }));
    grid.append(card);
  });

  const more = el("div", { className: "services-more" });
  more.append(el("a", { href: "services.html", className: "btn-more", text: "Все дополнительные услуги" }));

  container.append(grid, more);
  section.append(container);
  return section;
}

function buildVideo() {
  const section = el("section", { className: "video-section" });
  const container = el("div", { className: "container" });
  container.append(
    el("h2", { className: "section-title", text: "Видеогалерея нашего сада" }),
    el("p", { className: "section-desc", text: "Вы можете ознакомиться как проходят наши будни" })
  );

  const grid = el("div", { className: "video-grid" });

  const small1 = el("div", { className: "video-thumb video-thumb--small" });
  small1.append(el("img", { src: "images/video2.png", alt: "" }));

  const large = el("div", { className: "video-thumb video-thumb--large" });
  large.append(el("img", { src: "images/video1.png", alt: "" }), el("div", { className: "play-btn", html: "&#9654;" }));

  const small2 = el("div", { className: "video-thumb video-thumb--small" });
  small2.append(el("img", { src: "images/video3.png", alt: "" }));

  grid.append(small1, large, small2);
  container.append(grid, buildDots());
  section.append(container);
  return section;
}

function buildAdvantages() {
  const section = el("section", { className: "advantages" });
  const container = el("div", { className: "container" });
  const inner = el("div", { className: "advantages-inner" });

  inner.append(el("img", { src: "images/haip.png", alt: "", className: "haip-bg" }));
  inner.append(el("h2", { className: "section-title", text: "Преимущества" }));
  inner.append(el("p", { className: "section-desc", text: "Наша авторская программа ведётся на русском и английском языках и состоит из увлекательных мероприятий" }));

  const grid = el("div", { className: "adv-grid" });
  const advItems = [
    ["images/adv-masterclass.png", "adv-icon--yellow", "Мастер-классы"],
    ["images/adv-quest.png", "adv-icon--pink", "Игры-квесты"],
    ["images/adv-conference.png", "adv-icon--purple", "Конференции и проекты"],
    ["images/adv-experiment.png", "adv-icon--blue", "Опыты и эксперименты"],
    ["images/adv-concert.png", "adv-icon--yellow", "Концерты и спектакли"],
    ["images/adv-competition.png", "adv-icon--pink", "Соревнования"]
  ];

  advItems.forEach(([src, colorClass, text]) => {
    const item = el("div", { className: "adv-item" });
    const icon = el("div", { className: "adv-icon " + colorClass });
    icon.append(el("img", { src, alt: "" }));
    item.append(icon, el("span", { text }));
    grid.append(item);
  });

  inner.append(grid);
  container.append(inner);
  section.append(container);
  return section;
}

function buildTeam() {
  const section = el("section", { className: "team" });
  const container = el("div", { className: "container" });
  container.append(el("h2", { className: "section-title", text: "Наша команда" }));

  const slider = el("div", { className: "team-slider" });
  slider.append(el("button", { className: "arrow-btn arrow-btn--filled", html: "&#8249;", onclick: function () { teamSlide(-1); } }));

  const trackWrap = el("div", { className: "team-track-wrap" });
  const track = el("div", { className: "team-track", id: "teamTrack" });

  const members = [
    ["images/team1.jpg", "ЖУРАВЛЕВ", "Дмитрий Анатольевич", "Педагог - психолог", "Стаж 11 лет"],
    ["images/team2.jpg", "ПЕТРОВА", "Анна Сергеевна", "Воспитатель", "Стаж 8 лет"],
    ["images/team3.jpg", "СМИРНОВА", "Елена Владимировна", "Логопед", "Стаж 14 лет"],
    ["images/team4.jpg", "КОЗЛОВ", "Игорь Николаевич", "Тренер по физкультуре", "Стаж 6 лет"]
  ];

  members.forEach(([src, name, fullname, role, exp]) => {
    const card = el("div", { className: "team-card" });
    const photo = el("div", { className: "team-photo" });
    photo.append(el("img", { src, alt: "" }));
    card.append(
      photo,
      el("p", { className: "team-name", text: name }),
      el("p", { className: "team-fullname", text: fullname }),
      el("p", { className: "team-role", text: role }),
      el("p", { className: "team-exp", text: exp })
    );
    track.append(card);
  });

  trackWrap.append(track);
  slider.append(trackWrap, el("button", { className: "arrow-btn arrow-btn--outline", html: "&#8250;", onclick: function () { teamSlide(1); } }));

  const mobileNav = el("div", { className: "team-mobile-nav" });
  mobileNav.append(
    el("button", { className: "arrow-btn arrow-btn--purple", html: "&#8249;", onclick: function () { teamSlide(-1); } }),
    el("button", { className: "arrow-btn arrow-btn--outline", html: "&#8250;", onclick: function () { teamSlide(1); } })
  );

  container.append(slider, mobileNav);
  section.append(container);
  return section;
}

function buildAbout() {
  const section = el("section", { className: "about" });
  const container = el("div", { className: "container" });
  container.append(
    el("h2", { className: "section-title", text: "О нашем центре" }),
    el("p", { className: "about-main", text: "Мы создали пространство, в котором каждый ребёнок проявляет и раскрывает себя, развивает индивидуальные особенности и таланты." }),
    el("p", { className: "about-highlight", text: "Наша задача - сделать так, чтобы каждый день в Kids story был счастливым." }),
    el("p", { className: "about-text", text: "Английский детский клуб. Для детей с 2 до 7 лет. Погружение в языковую среду, собственная кухня, охраняемая огороженная территория, медицинский кабинет, соляная пещера. Дополнительные услуги. Для детей с 2 до 18 лет. Развивающие студии, творческие мастерские, спортивные секции. Kids story - ежедневное развитие детей на 360 градусов." })
  );
  section.append(container);
  return section;
}

function buildReviews() {
  const section = el("section", { className: "reviews" });
  const container = el("div", { className: "container" });
  container.append(el("h2", { className: "section-title", text: "Отзывы о саде" }));

  const sliderDiv = el("div", { className: "reviews-slider" });
  sliderDiv.append(el("button", { className: "arrow-btn arrow-btn--filled arrow-btn--purple", html: "&#8249;" }));

  const grid = el("div", { className: "reviews-grid" });
  [1, 2].forEach(() => {
    const card = el("div", { className: "review-card" });
    const header = el("div", { className: "review-header" });
    const avatar = el("div", { className: "review-avatar" });
    avatar.append(el("img", { src: "images/user.png", alt: "user" }));
    const info = el("div");
    info.append(el("p", { className: "review-name", text: "Дмитрий" }), el("p", { className: "review-city", text: "Москва" }));
    header.append(avatar, info);
    card.append(
      header,
      el("p", { className: "review-text", text: "Водим двоих детей, очень довольны уровнем и качеством образования, если нужен просто детский сад, то вам не сюда. Дети знают английский (произношение, грамматика и пр.)" }),
      el("a", { href: "#", className: "review-link", text: "Прочитать отзыв" })
    );
    grid.append(card);
  });

  sliderDiv.append(grid, el("button", { className: "arrow-btn arrow-btn--outline arrow-btn--purple-outline", html: "&#8250;" }));
  container.append(sliderDiv, buildDots());
  section.append(container);
  return section;
}

function buildMap() {
  const section = el("section", { className: "map-section" });
  const container = el("div", { className: "container" });
  const placeholder = el("div", { className: "map-placeholder" });
  placeholder.append(el("img", { src: "images/map.png", alt: "Карта" }));
  container.append(placeholder);
  section.append(container);
  return section;
}

function buildFooter() {
  const footer = el("footer", { className: "footer" });
  const inner = el("div", { className: "footer-inner" });

  const left = el("div", { className: "footer-left" });
  const fLogo = el("div", { className: "footer-logo" });
  const fLogoLink = el("a", { href: "index.html" });
  fLogoLink.append(el("img", { src: "images/logo.png", alt: "Kids Story" }));
  fLogo.append(fLogoLink);

  const fSocials = el("div", { className: "footer-social" });
  [["images/tg-icon.png", "Telegram"], ["images/vk-icon.png", "VK"]].forEach(([src, alt]) => {
    const a = el("a", { href: "#", className: "social-link" });
    a.append(el("img", { src, alt, className: "social-icon-img" }));
    fSocials.append(a);
  });

  const fPhone = el("div", { className: "footer-phone-block" });
  fPhone.append(
    el("img", { src: "images/phone-icon.png", alt: "", className: "phone-icon-img" }),
    el("span", { className: "footer-phone", text: "+7 495 123 34 25" })
  );

  left.append(fLogo, fSocials, fPhone,
    el("p", { className: "footer-email", text: "dir@kidsstory.life" }),
    el("p", { className: "footer-addr", text: "Москва, ул. Муравская д.38, к.1" }),
    el("p", { className: "footer-addr", text: "ЖК Мир Митино М. Пятницкое шоссе" })
  );

  const nav = el("div", { className: "footer-nav" });
  const cols = [
    ["О нас", [["О центре", "about.html"], ["Документы", "#"], ["Родителям", "parents.html"], ["Питание", "#"], ["Новости", "#"], ["3D тур", "#"], ["Отзывы", "#"]]],
    ["Расписание", [["Расписание основное", "#"], ["Дополнительные услуги", "services.html"]]],
    ["Программа", [["Группа (2-3 года)", "#"], ["Группа (3-5 лет)", "#"], ["Группа (5-7 лет)", "#"]]]
  ];

  cols.forEach(([title, links]) => {
    const col = el("div", { className: "footer-nav-col" });
    col.append(el("p", { className: "footer-nav-title", text: title }));
    links.forEach(([text, href]) => col.append(el("a", { href, text })));
    nav.append(col);
  });

  inner.append(left, nav);

  const bottom = el("div", { className: "footer-bottom" });
  bottom.append(
    el("span", { text: "Copyrights: Kids Story 2021" }),
    el("span", { text: "Дизайн ZHURAVLEV" })
  );

  footer.append(inner, bottom);
  return footer;
}

function buildDots() {
  const dots = el("div", { className: "slider-dots" });
  [false, false, true, false, false, false].forEach(active => {
    dots.append(el("span", { className: "dot" + (active ? " dot--active" : "") }));
  });
  return dots;
}

function buildSliderAndGallery() {
  const section = el("section", { className: "slider-gallery-section" });
  const container = el("div", { className: "container" });

  container.append(el("h2", { className: "section-title", text: "Фотогалерея" }));

  const sliderWrap = el("div", { className: "img-slider-wrap" });
  const slides = el("div", { className: "img-slides" });
  const images = [
    "images/video1.png",
    "images/video2.png",
    "images/video3.png",
    "images/hero-bg.png"
  ];
  images.forEach((src, i) => {
    const slide = el("div", { className: "img-slide" + (i === 0 ? " active" : "") });
    slide.append(el("img", { src, alt: "" }));
    slides.append(slide);
  });

  const prevBtn = el("button", { className: "img-slider-btn img-slider-prev", html: "&#8249;" });
  const nextBtn = el("button", { className: "img-slider-btn img-slider-next", html: "&#8250;" });
  sliderWrap.append(prevBtn, slides, nextBtn);

  const gallery = el("div", { className: "gallery-thumbs" });
  images.forEach((src, i) => {
    const thumb = el("div", { className: "gallery-thumb" + (i === 0 ? " active" : "") });
    thumb.append(el("img", { src, alt: "" }));
    gallery.append(thumb);
  });

  container.append(sliderWrap, gallery);
  section.append(container);
  return section;
}

function buildAccordion() {
  const section = el("section", { className: "accordion-section" });
  const container = el("div", { className: "container" });
  container.append(el("h2", { className: "section-title", text: "Частые вопросы" }));

  const acc = el("div", { id: "faq-accordion" });

  const items = [
    ["С какого возраста принимают детей?", "Мы принимаем детей с 1,5 до 7 лет в детский сад, а дополнительные кружки доступны детям с 2 до 18 лет."],
    ["Какой режим работы?", "Центр работает ежедневно с 7:00 до 19:00, без выходных в рабочие дни."],
    ["Есть ли питание?", "Да, организовано 5-разовое питание с учётом индивидуальных особенностей каждого ребёнка."],
    ["Как записаться?", "Вы можете записаться онлайн через форму на сайте, по телефону или лично посетив наш центр."]
  ];

  items.forEach(([q, a]) => {
    acc.append(
      el("h3", { text: q }),
      el("div", { html: "<p>" + a + "</p>" })
    );
  });

  container.append(acc);
  section.append(container);
  return section;
}

function buildDatepicker() {
  const section = el("section", { className: "datepicker-section" });
  const container = el("div", { className: "container" });
  container.append(el("h2", { className: "section-title", text: "Выберите дату экскурсии" }));

  const wrap = el("div", { className: "datepicker-wrap" });
  const label = el("label", { className: "datepicker-label" });
  label.textContent = "Удобная дата: ";
  const input = el("input", { type: "text", className: "datepicker-input", id: "tour-date", placeholder: "Выберите дату" });
  label.append(input);
  wrap.append(label);
  container.append(wrap);
  section.append(container);
  return section;
}

function buildContactForm() {
  const section = el("section", { className: "contact-form-section" });
  const container = el("div", { className: "container" });
  container.append(el("h2", { className: "section-title", text: "Записаться на приём" }));

  const form = el("div", { className: "contact-form", id: "contact-form" });

  function formRow(labelText, inputId, type, placeholder) {
    const row = el("div", { className: "form-row" });
    const lbl = el("label", { className: "form-label", attrs: { for: inputId } });
    lbl.textContent = labelText;
    const inp = el("input", { type, id: inputId, className: "form-input", placeholder });
    const err = el("span", { className: "form-error", id: inputId + "-err" });
    row.append(lbl, inp, err);
    return row;
  }

  form.append(
    formRow("Ваше имя *", "cf-name", "text", "Введите имя"),
    formRow("Телефон *", "cf-phone", "tel", "+7 (___) ___-__-__"),
    formRow("Email *", "cf-email", "email", "example@mail.ru"),
    formRow("Возраст ребёнка *", "cf-age", "number", "Лет")
  );

  const submitBtn = el("button", { className: "hero-form-btn", id: "cf-submit", text: "ОТПРАВИТЬ ЗАЯВКУ" });
  submitBtn.style.marginTop = "12px";
  const successMsg = el("div", { className: "form-success", id: "cf-success", text: "✓ Заявка отправлена! Мы свяжемся с вами в ближайшее время." });

  form.append(submitBtn, successMsg);
  container.append(form);
  section.append(container);
  return section;
}

function toggleCheckbox(el) {
  const dot = el.querySelector(".checkbox-dot--toggle");
  dot.classList.toggle("checkbox-dot--checked");
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
  track.style.transform = "translateX(-" + (teamIndex * cardW) + "px)";
}

document.addEventListener("DOMContentLoaded", function () {
  document.documentElement.lang = "ru";
  document.title = "Kids Story";

  const metaViewport = document.querySelector('meta[name="viewport"]') || document.createElement("meta");
  metaViewport.name = "viewport";
  metaViewport.content = "width=device-width, initial-scale=1.0";
  document.head.appendChild(metaViewport);

  const main = el("main");
  main.append(
    buildHero(),
    buildFeatures(),
    buildQuestionsBlock("questions--purple", "checkbox-dot--white-empty", "white", "questions-btn--yellow", "images/shapes1.png", "images/boy.png"),
    buildServices(),
    buildVideo(),
    buildAdvantages(),
    buildTeam(),
    buildQuestionsBlock("questions--yellow", "checkbox-dot--dark-empty", "dark", "questions-btn--red", "images/shapes2.png", "images/boy2.png"),
    buildAbout(),
    buildReviews(),
    buildSliderAndGallery(),
    buildAccordion(),
    buildDatepicker(),
    buildContactForm(),
    buildMap()
  );

  document.body.append(buildHeader(), buildSubheader(), main, buildFooter());

  document.querySelectorAll(".menu-item").forEach(function (item) {
    var timeout;
    item.addEventListener("mouseenter", function () { clearTimeout(timeout); item.classList.add("open"); });
    item.addEventListener("mouseleave", function () { timeout = setTimeout(function () { item.classList.remove("open"); }, 100); });
  });

  $(window).on("load", function () { $("#page-loader").fadeOut(500); });
  setTimeout(function () { $("#page-loader").fadeOut(500); }, 3000);

  $("input[type='tel']").inputmask("+7 (999) 999-99-99");

  /* Задание 1: Слайдер */
  var slideIdx = 0;
  function goSlide(n) {
    var slides = $(".img-slide");
    var thumbs = $(".gallery-thumb");
    slides.removeClass("active");
    thumbs.removeClass("active");
    slideIdx = (n + slides.length) % slides.length;
    slides.eq(slideIdx).addClass("active");
    thumbs.eq(slideIdx).addClass("active");
  }
  $(".img-slider-prev").on("click", function () { goSlide(slideIdx - 1); });
  $(".img-slider-next").on("click", function () { goSlide(slideIdx + 1); });
  $(".gallery-thumb").on("click", function () { goSlide($(this).index()); });

  /* Задание 2:Accordion */
  $("#faq-accordion").accordion({ collapsible: true, active: false, heightStyle: "content" });

  /* Задание 3: Datepicker */
  $("#tour-date").datepicker({ dateFormat: "dd.mm.yy", minDate: 0, changeMonth: true });

  /* Задание 4: Анимации */

  // Анимация 1 — подсветка кнопок при наведении
  $(".hero-form-btn, .questions-btn, .btn-signup").on("mouseenter", function () {
    $(this).stop(true).animate({ opacity: 0.85 }, 150).animate({ opacity: 1 }, 150);
  });

  // Анимация 2 — плавное появление блоков при прокрутке
  function checkScroll() {
    $("section, .feature-item, .svc-card, .team-card, .review-card").each(function () {
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

  // Анимация 3 — эффект тряска
  function shakeEl($el) {
    var left = parseInt($el.css("marginLeft")) || 0;
    $el.animate({ marginLeft: left + 8 }, 60)
      .animate({ marginLeft: left - 8 }, 60)
      .animate({ marginLeft: left + 6 }, 50)
      .animate({ marginLeft: left - 6 }, 50)
      .animate({ marginLeft: left }, 50);
  }

  /* Задание 5: Анимированный баннер */
  var $banner = $("#animated-banner");
  $banner.hide().slideDown(600);
  setInterval(function () {
    $banner.fadeTo(300, 0.5).fadeTo(300, 1);
  }, 4000);
  $("#banner-close").on("click", function () {
    $banner.slideUp(400);
  });

  /* Задание 6: Валидация формы */
  $("#cf-submit").on("click", function () {
    var valid = true;
    $(".form-error").text("");
    $(".form-input").css("border-color", "");

    var name = $("#cf-name").val().trim();
    var phone = $("#cf-phone").val().trim();
    var email = $("#cf-email").val().trim();
    var age = $("#cf-age").val().trim();

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
});
