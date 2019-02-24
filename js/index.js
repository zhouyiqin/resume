$(function(){
  var sectionIndex = null;
  var sectionsOffsetTop = [];
  var calc = function(){
    sectionsOffsetTop = [];
    $('section:not(:first)').each(function(i, e){
      sectionsOffsetTop.push({
        name: $(e).find('h2').text(),
        data: e.offsetTop
      })
    });
  }
  calc();
  var menu = $('<menu />');
  
  sectionsOffsetTop.forEach(function(e){
    if(stop > e.data) {
      index = index + 1;
    }
    menu.append('<div>' + e.name + '</div>');
  });
  var items = menu.children('div');
  items.on('click', function(){
    var index = $(this).index();

    var targetScrollTop = index === 0 ? 0 : sectionsOffsetTop[index].data;
    
    $('html,body').animate({scrollTop: targetScrollTop}, 300);
  });
  $('.container').append(menu);

  var nav = $('<nav />');
  $('.container').append(nav);
  var scroll = function(navSpeed){
    var stop = document.documentElement.scrollTop;
    let index = 0;
    sectionsOffsetTop.forEach(function(e){
      if(stop > e.data) {
        index = index + 1;
      }
    });
    if(index === sectionIndex) {
      return;
    }
    sectionIndex = index;
    items.eq(index).addClass('active').siblings().removeClass('active');
  }
  $(window).scroll(function(){
    scroll();
  });
  $(window).resize(function(){
    calc();
  })
  scroll(0);
});