(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    if (!header.classList.contains("header-scrolled")) {
      offset -= 16;
    }

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select("#header");
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop;
    let nextElement = selectHeader.nextElementSibling;
    const headerFixed = () => {
      if (headerOffset - window.scrollY <= 0) {
        selectHeader.classList.add("fixed-top");
        nextElement.classList.add("scrolled-offset");
      } else {
        selectHeader.classList.remove("fixed-top");
        nextElement.classList.remove("scrolled-offset");
      }
    };
    window.addEventListener("load", headerFixed);
    onscroll(document, headerFixed);
  }

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          portfolioIsotope.on("arrangeComplete", function () {
            AOS.refresh();
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // My own JS

  // Dashboard JS Handling Start

  const dashBoards = [
    {
      title: "Sales Analysis 2",
      desktopSrc:
        "https://app.powerbi.com/view?r=eyJrIjoiMTUwZDI0YmItZWQwYS00OGFjLWE3MzYtZDlhMTczODM3MGE3IiwidCI6IjU0YzBhODc3LTRjNzUtNDMxZC1iMzY5LWY1Yzc3NDM5NjIzMSIsImMiOjZ9",
      mobileSrc: "",
    },
    {
      title: "Finance Analysis 2",
      desktopSrc:
        "https://app.powerbi.com/view?r=eyJrIjoiMjc4ODgyMDMtZGFmOC00ZTA1LWExZGYtYzgyMWRlNjRlYjI1IiwidCI6IjU0YzBhODc3LTRjNzUtNDMxZC1iMzY5LWY1Yzc3NDM5NjIzMSIsImMiOjZ9",
      mobileSrc:
        "https://app.powerbi.com/view?r=eyJrIjoiMzI0ZjQ1NTktMDQxOC00MDFjLWIwYzItOGU0MjcyM2NhNmNmIiwidCI6IjU0YzBhODc3LTRjNzUtNDMxZC1iMzY5LWY1Yzc3NDM5NjIzMSIsImMiOjZ9",
    },
    {
      title: "Airline Analysis (Safety) 2",
      desktopSrc:
        "https://app.powerbi.com/view?r=eyJrIjoiYjRkMjJlZTUtYmNjZi00MjY0LWE3ZmMtMWFmMTM2NjJjZTNkIiwidCI6IjU0YzBhODc3LTRjNzUtNDMxZC1iMzY5LWY1Yzc3NDM5NjIzMSIsImMiOjZ9",
      mobileSrc:
        "https://app.powerbi.com/view?r=eyJrIjoiNzFjNTNhZjYtNTA3ZS00OGUwLWI5NGMtZDNjZmE2ZDdkNGZjIiwidCI6IjU0YzBhODc3LTRjNzUtNDMxZC1iMzY5LWY1Yzc3NDM5NjIzMSIsImMiOjZ9",
    },
    {
      title: "Bank Analysis 2",
      desktopSrc:
        "https://app.powerbi.com/view?r=eyJrIjoiNWNmNGQ5ZDYtNzMzNi00YzZmLWIyMjQtYzY1ZDlkZmUxODQwIiwidCI6IjU0YzBhODc3LTRjNzUtNDMxZC1iMzY5LWY1Yzc3NDM5NjIzMSIsImMiOjZ9",
      mobileSrc:
        "https://app.powerbi.com/view?r=eyJrIjoiYTk2MTZiNWMtNTU4Yy00NzFhLTkwN2UtYWE2Y2Q0NWFlMmMyIiwidCI6IjU0YzBhODc3LTRjNzUtNDMxZC1iMzY5LWY1Yzc3NDM5NjIzMSIsImMiOjZ9",
    },
    {
      title: "Healthcare Analysis 2",
      desktopSrc:
        "https://app.powerbi.com/view?r=eyJrIjoiMzU2OWRhMDctMDU3Mi00NzBhLTgxNDAtNzRmNjZkZmNkYWU1IiwidCI6IjU0YzBhODc3LTRjNzUtNDMxZC1iMzY5LWY1Yzc3NDM5NjIzMSIsImMiOjZ9",
      mobileSrc:
        "https://app.powerbi.com/view?r=eyJrIjoiYTkyM2U4ZTktMWM0Ni00MmE0LWE5NjgtYTEzYjRiYTdmNzA3IiwidCI6IjU0YzBhODc3LTRjNzUtNDMxZC1iMzY5LWY1Yzc3NDM5NjIzMSIsImMiOjZ9",
    },
    {
      title: "Airline Analysis",
      desktopSrc:
        "https://app.powerbi.com/view?r=eyJrIjoiMTM2Zjc1MDgtNGI2ZC00YTgwLTg5MDctM2U3ZDE4MjVmMTdjIiwidCI6IjE5YzY3ZWM5LTAyY2YtNDZkNC1hM2VmLWM5NmQ5ZjNjYmU2ZCIsImMiOjl9",
      mobileSrc:
        "https://app.powerbi.com/view?r=eyJrIjoiOTZjMTNhOWQtMTMwNi00YjFkLTgyMWQtNDk1ODQxYzQwMDIzIiwidCI6IjE5YzY3ZWM5LTAyY2YtNDZkNC1hM2VmLWM5NmQ5ZjNjYmU2ZCIsImMiOjl9",
    },
    {
      title: "Bank Report",
      desktopSrc:
        "https://app.powerbi.com/view?r=eyJrIjoiYTVjOTVlZmEtNWMwYy00ZmY3LTk5MGQtZmViNjY4Yzk5NGU4IiwidCI6IjU0YzBhODc3LTRjNzUtNDMxZC1iMzY5LWY1Yzc3NDM5NjIzMSIsImMiOjZ9",
      mobileSrc:
        "https://app.powerbi.com/view?r=eyJrIjoiY2EwMDcwYWQtMjkwNC00N2MwLWI1NWYtZTlmODZmNTAxOTliIiwidCI6IjU0YzBhODc3LTRjNzUtNDMxZC1iMzY5LWY1Yzc3NDM5NjIzMSIsImMiOjZ9",
    },
    {
      title: "Health Care 1 (Hospital)",
      desktopSrc:
        "https://app.powerbi.com/view?r=eyJrIjoiNzhiYmRiM2UtZDI2ZC00YTJhLTlhYTItNDYyOWFlOGIyMTViIiwidCI6IjU0YzBhODc3LTRjNzUtNDMxZC1iMzY5LWY1Yzc3NDM5NjIzMSIsImMiOjZ9",
      mobileSrc:
        "https://app.powerbi.com/view?r=eyJrIjoiMDVmMmE2YWQtYjRjZi00OTEzLTk4MzEtZWM5ZjUzOTlkOTFjIiwidCI6IjU0YzBhODc3LTRjNzUtNDMxZC1iMzY5LWY1Yzc3NDM5NjIzMSIsImMiOjZ9",
    },
    {
      title: "Finance Report",
      desktopSrc:
        "https://app.powerbi.com/view?r=eyJrIjoiZjFiNGUwODItZDFkMC00OTlmLWIyMjktODMyZWMxNzA5NWI4IiwidCI6IjU0YzBhODc3LTRjNzUtNDMxZC1iMzY5LWY1Yzc3NDM5NjIzMSIsImMiOjZ9",
      mobileSrc:
        "https://app.powerbi.com/view?r=eyJrIjoiZTZhYmFhM2ItYWIwNi00ZWM0LWE4OTgtYWE2ODVlYzFjMTVmIiwidCI6IjU0YzBhODc3LTRjNzUtNDMxZC1iMzY5LWY1Yzc3NDM5NjIzMSIsImMiOjZ9",
    },
    {
      title: "Sales Report",
      desktopSrc:
        "https://app.powerbi.com/view?r=eyJrIjoiYzJkOWEzODgtMWUxNy00NjkyLTkxMmYtNzRhM2Y1MzI2MTRkIiwidCI6IjU0YzBhODc3LTRjNzUtNDMxZC1iMzY5LWY1Yzc3NDM5NjIzMSIsImMiOjZ9",
      mobileSrc:
        "https://app.powerbi.com/view?r=eyJrIjoiZmMyMmZhMTAtODcyYi00MDhhLWE3ZjctNWExZTYxMDk4YTE2IiwidCI6IjU0YzBhODc3LTRjNzUtNDMxZC1iMzY5LWY1Yzc3NDM5NjIzMSIsImMiOjZ9",
    },
  ];

  window.addEventListener("load", () => {
    const iframes = document.querySelectorAll(".dashboard-iframe");
    let count = 0;

    // Is mobile width?
    if (window.innerWidth < 991) {
      iframes.forEach((iframe) => {
        if (dashBoards[count].mobileSrc == "") {
          // If mobile view link not provided then skip
          if (count % 2 === 0) {
            iframe.setAttribute("width", "100%");
            iframe.setAttribute("height", iframe.offsetWidth * 0.4825);
          } else {
            iframe.setAttribute("width", "100%");
            iframe.setAttribute("height", iframe.offsetWidth * 0.605);
          }
          count += 1;
        } else {
          if (iframe.getAttribute("src") != dashBoards[count].mobileSrc) {
            iframe.setAttribute("src", dashBoards[count].mobileSrc);
          }
          if (count % 2 === 0) {
            iframe.setAttribute("width", "100%");
            iframe.setAttribute("height", iframe.offsetWidth * 1.125);
          } else {
            iframe.setAttribute("width", iframe.offsetHeight * 0.605);
            iframe.setAttribute("height", "850");
          }
          count += 1;
        }
      });
    } else {
      // else desktop width
      iframes.forEach((iframe) => {
        if (iframe.getAttribute("src") != dashBoards[count].desktopSrc) {
          iframe.setAttribute("src", dashBoards[count].desktopSrc);
        }
        if (count % 2 === 0) {
          iframe.setAttribute("width", "100%");
          iframe.setAttribute("height", iframe.offsetWidth * 0.4825);
        } else {
          iframe.setAttribute("width", "75%");
          iframe.setAttribute("height", iframe.offsetWidth * 0.605);
        }
        count += 1;
      });
    }

    // // Is mobile width?
    // if (window.innerWidth < 991) {
    //   iframes.forEach((iframe) => {
    //     if (dashBoards[count].mobileSrc == "") {
    //       // If mobile view link not provided then skip
    //       iframe.setAttribute("width", "75%");
    //       iframe.setAttribute("height", iframe.offsetWidth * 0.605);
    //       count += 1;
    //     } else {
    //       if (iframe.getAttribute("src") != dashBoards[count].mobileSrc) {
    //         iframe.setAttribute("src", dashBoards[count].mobileSrc);
    //       }
    //       iframe.setAttribute("width", iframe.offsetHeight * 0.605);
    //       iframe.setAttribute("height", "850"); //850
    //       count += 1;
    //     }
    //   });
    // } else {
    //   // else desktop width
    //   iframes.forEach((iframe) => {
    //     if (iframe.getAttribute("src") != dashBoards[count].desktopSrc) {
    //       iframe.setAttribute("src", dashBoards[count].desktopSrc);
    //     }
    //     iframe.setAttribute("width", "75%");
    //     iframe.setAttribute("height", iframe.offsetWidth * 0.605); //775
    //     count += 1;
    //   });
    // }
  });

  window.addEventListener("resize", () => {
    const iframes = document.querySelectorAll(".dashboard-iframe");
    let count = 0;

    // Is mobile width?
    if (window.innerWidth < 991) {
      iframes.forEach((iframe) => {
        if (dashBoards[count].mobileSrc == "") {
          // If mobile view link not provided then skip
          if (count % 2 === 0) {
            iframe.setAttribute("width", "100%");
            iframe.setAttribute("height", iframe.offsetWidth * 0.4825);
          } else {
            iframe.setAttribute("width", "100%");
            iframe.setAttribute("height", iframe.offsetWidth * 0.605);
          }
          count += 1;
        } else {
          if (iframe.getAttribute("src") != dashBoards[count].mobileSrc) {
            iframe.setAttribute("src", dashBoards[count].mobileSrc);
          }
          if (count % 2 === 0) {
            iframe.setAttribute("width", "100%");
            iframe.setAttribute("height", iframe.offsetWidth * 1.125);
          } else {
            iframe.setAttribute("width", iframe.offsetHeight * 0.605);
            iframe.setAttribute("height", "850");
          }
          count += 1;
        }
      });
    } else {
      // else desktop width
      iframes.forEach((iframe) => {
        if (iframe.getAttribute("src") != dashBoards[count].desktopSrc) {
          iframe.setAttribute("src", dashBoards[count].desktopSrc);
        }
        if (count % 2 === 0) {
          iframe.setAttribute("width", "100%");
          iframe.setAttribute("height", iframe.offsetWidth * 0.4825);
        } else {
          iframe.setAttribute("width", "75%");
          iframe.setAttribute("height", iframe.offsetWidth * 0.605);
        }
        count += 1;
      });
    }

    // // Is mobile width?
    // if (window.innerWidth < 991) {
    //   iframes.forEach((iframe) => {
    //     if (dashBoards[count].mobileSrc == "") {
    //       // If mobile view link not provided then skip
    //       iframe.setAttribute("width", "75%");
    //       iframe.setAttribute("height", iframe.offsetWidth * 0.605); //775
    //       count += 1;
    //     } else {
    //       if (iframe.getAttribute("src") != dashBoards[count].mobileSrc) {
    //         iframe.setAttribute("src", dashBoards[count].mobileSrc);
    //       }
    //       iframe.setAttribute("width", iframe.offsetHeight * 0.605); //52.75%
    //       iframe.setAttribute("height", "850"); //850
    //       count += 1;
    //     }
    //   });
    // } else {
    //   // else desktop width
    //   iframes.forEach((iframe) => {
    //     if (iframe.getAttribute("src") != dashBoards[count].desktopSrc) {
    //       iframe.setAttribute("src", dashBoards[count].desktopSrc);
    //     }
    //     iframe.setAttribute("width", "75%");
    //     iframe.setAttribute("height", iframe.offsetWidth * 0.605); //775
    //     count += 1;
    //   });
    // }
  });
  // Dashboard JS Handling End
})();
