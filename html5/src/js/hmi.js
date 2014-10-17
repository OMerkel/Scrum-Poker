//
// Copyright (c) 2014 Oliver Merkel
// All rights reserved.
//
// @author Oliver Merkel, <Merkel(dot)Oliver(at)web(dot)de>
//

function Hmi() {
  this.showFront = true;
}

Hmi.prototype.updateCard = function() {
  var titleHeight = 0,
    menuHeight = 0,
    decorationHeight = titleHeight + menuHeight,
    availableHeight = window.innerHeight - decorationHeight,
    availableWidth = window.innerWidth,
    cardAspectRatio = 60.0 / 94.0,
    size = Math.min(availableWidth * 0.90, availableHeight * 0.90 * cardAspectRatio),
    offsetY = 10;
  $('#face').css({
    height: size / cardAspectRatio,
    width: size,
    top: menuHeight + size * 0.02,
    left: size * 0.02,
  });
};

Hmi.prototype.update = function() {
  var deckType = $('#deckselect').val();
  var cardUrl =
    this.showFront ? 'url(img/set1/frontface-' + (
      'normal' == deckType ? $( 'input:radio[name=normal]:checked' ).val() :
      'fibonacci' == deckType ? $( 'input:radio[name=fibonacci]:checked' ).val() :
      $( 'input:radio[name=t-shirt]:checked' ).val() ) + '.svg)' :
    'url(img/set1/backface.svg)';
  this.updateCard();
  $('#face').css({ 'background-image' : cardUrl });
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
    $( '#face' ).on( 'click', function( e ) {
      hmi.showFront = ! hmi.showFront;
      hmi.update();
    });
});

function update() {
  hmi.update();
}

$(document).ready( function() {
  hmi = new Hmi();
  var $window = $(window);
  $window.resize( update );
  $window.resize();
  $( 'input' ).change( update ).change();
  $( 'select' ).change( update ).change();
});
