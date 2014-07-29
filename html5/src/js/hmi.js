//
// Copyright (c) 2014 Oliver Merkel
// All rights reserved.
//
// @author Oliver Merkel, <Merkel(dot)Oliver(at)web(dot)de>
//

function Hmi() {
}

Hmi.prototype.updateCard = function( face ) {
  var titleHeight = 0,
    menuHeight = 0,
    decorationHeight = titleHeight + menuHeight,
    availableHeight = window.innerHeight - decorationHeight,
    availableWidth = window.innerWidth,
    cardAspectRatio = 60.0 / 94.0,
    size = Math.min(availableWidth * 0.90, availableHeight * 0.90 * cardAspectRatio),
    offsetY = 10;
  $(face).css({
    height: size / cardAspectRatio,
    width: size,
    top: menuHeight + size * 0.02,
    left: size * 0.02,
  });
};

Hmi.prototype.update = function() {
  var deckType = $('#deckselect').val();
  var cardValue;
  if ('normal' == deckType) {
    cardValueMain=$( 'input:radio[name=normal]:checked' ).val();;
  } else if ('fibonacci' == deckType) {
    cardValueMain=$( 'input:radio[name=fibonacci]:checked' ).val();;
  } else {
    cardValueMain=$( 'input:radio[name=t-shirt]:checked' ).val();;
  } 
  this.updateCard('#frontface');
  this.updateCard('#backface');
  $('#frontface').css({
    'background-image' : 'url(img/set1/frontface-' + cardValueMain + '.svg)'
  });
};

$( document ).on( "pagecreate", "#cardface", function() {
    $( document ).on( "swipeleft swiperight", "#cardface", function( e ) {
        if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swipeleft" ) {
              var deckType = $('#deckselect').val();
              var targetPage = 'normal' == deckType ? 'faces-normal' :
                'fibonacci' == deckType ? 'faces-fibonacci' :
                'faces-t-shirt';
              $.mobile.changePage( '#' + targetPage,
                { transition: "slide",
                  reverse: false,
                  changeHash: false });
            } else if ( e.type === "swiperight" ) {
                $( "#left-panel" ).panel( "open" );
            }
        }
    });
    var pages = [ 'faces-normal', 'faces-fibonacci', 'faces-t-shirt' ];
    for(var i=0; i<pages.length; ++i) {
      $( document ).on( 'swiperight', '#' + pages[i], function( e ) {
        $.mobile.changePage( "#cardface",
          { transition: "slide",
            reverse: true,
            changeHash: false });
      });
    }
    $( '#frontface' ).on( 'click', function( e ) {
      $( '#frontface' ).css({
        visibility : 'hidden',
      });
      $( '#backface' ).css({
        visibility : 'visible',
      });
    });
    $( '#backface' ).on( 'click', function( e ) {
      $( '#backface' ).css({
        visibility : 'hidden',
      });
      $( '#frontface' ).css({
        visibility : 'visible',
      });
    });
});

$(document).ready( function() {
  hmi = new Hmi();
  var $window = $(window);
  $window.resize( function() {
    hmi.update();
  });
  $window.resize();
  $( 'input' ).change( function() { hmi.update(); }).change();
  $( 'select' ).change( function() { hmi.update(); }).change();
});
