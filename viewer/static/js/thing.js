$(function () {

  var createDuplicates = function ($panelElement) {
    if ($panelElement.length < 1)
      return;
      
    setTimeout(function() {
      // Copies every chip in the panel so that we can use absolute positioning on
      // the expanded chips without breaking the layout.
      $panelElement.find('.link-item').each(function() {
        var $subject = $(this);
        var $copy = $subject.clone();
        $subject.addClass('link-item-original');
        $copy.addClass('link-item-copy').appendTo($subject.parent());
        $copy.css('top', $subject.position().top).css('left', $subject.position().left);
        if ($subject.width() > 260) {
          $copy.css('min-width', $subject.width());
        }
      });
      
      // Initialize hover functionality
      $panelElement.find('.link-item-copy').hover(function() {
        expand($(this));
      }, function() {
        collapse($(this));
      }).focusin(function() {
        expand($(this));
      }).focusout(function() {
        collapse($(this));
      });
    
    }, 500);
  }
  
  var destroyDuplicates = function($panelElement) {
    $panelElement.find('.link-item-copy').each(function() {
      $(this).remove();
    })
  }

  var expand = function (elem) {
    elem.addClass('to-be-active');
    var resource = elem.attr('resource');
    setTimeout(function() {
      if(elem.hasClass('to-be-active')) {
        elem.addClass('active');
        if(!elem.hasClass('adjusted-top')) {
          // Adjust position so that the chip "grows" around the prefLabel
          var $parent = elem.closest('li');
          if ($parent.length == 0) {
            $parent = elem.closest('dd');
          }
          var $rootHeading = $parent.find('.link-item-original[resource="'+resource+'"] .panel-title');
          var $elemHeading = $parent.find('.link-item-copy[resource="'+resource+'"] .panel-title');
          var diffY = $elemHeading.offset().top - $rootHeading.offset().top;
          elem.css('margin-top', -diffY);
          elem.addClass('adjusted-top');
        }
      }
    }, 500);
    
  };
  var collapse = function (elem) {
    elem.removeClass('to-be-active');
    elem.removeClass('active');
    
    // Removing these so that the chip isn't activated when hovering on the ghost of it...
    elem.css('margin-top', '');
    elem.removeClass('adjusted-top');
    
    elem.css('width', '').css('height', '');
  };
  
  var initHitlistExpands = function() {
    // Hit list expand functionality
    
    $('.hit-item').each(function() {
      $("<div class='expand-button'><i class='fa rotate fa-chevron-right'></i></div>").insertBefore($(this).find('.panel-title').eq(0));
    })
    
    $('.hit-item .expand-button').click(function() {
      $subject = $(this).closest('.hit-item');
      if ($subject.hasClass('expanded')) {
        $subject.find('.panel-body').slideUp(null, destroyDuplicates($subject));
        $(this).find('i').removeClass('rotate-90');
        $subject.removeClass('expanded');
      } else {
        $subject.find('.panel-body').slideDown(null, createDuplicates($subject));
        $(this).find('i').addClass('rotate-90');
        $subject.addClass('expanded');
      }
    });
  };
  
  var getParameters = function () {
    var params = [];
    $('input[type=hidden]').each(function() {
      params.push({ key: $(this).attr('name'), value: $(this).val() });
      $(this).remove();
    });
    return params;
  };
  
  var getParameter = function (name) {
    var parameters = getParameters();
    for (var i = 0; i < parameters.length; i++){
      if (name == parameters[i].key) {
        return parameters[i];
      }
    }
  }
  
  var initTypeButtons = function() {
    var type = getParameter('type');
    if (typeof type !== 'undefined') {
      $('.type-buttons input').each(function() {
        if ($(this).val() == type.value) {
          $(this).closest('label').addClass('active');
          $(this).attr('checked', '');
        }
      });
    } else {
      $('.type-buttons .no-choice').addClass('active');
    }
  }

  $(document).ready(function () {
    
    createDuplicates($('.main-item'));
    initTypeButtons();
    initHitlistExpands();
    
    // Remove empty fields
    $('form').submit(function(e){
        var emptyinputs = $(this).find('input').filter(function(){
            return !$.trim(this.value).length;
        }).prop('disabled',true);
    });
    
  });

});
