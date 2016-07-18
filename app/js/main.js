$(document).ready(function() {
              $(".main-menu>ul>li").on("click", showMenu);
        })

  function showMenu (el) {
      var link_el = $(this),
          ul_el = $(".main-menu>ul>li>ul");
                if (ul_el.hasClass("active") ) {
                  ul_el.removeClass("active");
                  link_el.removeClass('active-li')

                } else {
                  ul_el.addClass("active");
                  link_el.addClass('active-li')
                }
      return false;
  }