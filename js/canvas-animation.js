(function(){
  var canvas = document.getElementById('CanvasForPhotos');
  if(canvas.getContext){

    var context = canvas.getContext('2d');
    var imgOne = {
      image: new Image(),
      x: 50,
      y:50
    }
    var imgTwo = {
      image: new Image(),
      x: 50,
      y:300
    }
    var renderImages = function(images) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      images.forEach( function( image ) {
        context.drawImage(image.image, image.x, image.y);
      } );
    }
    var requestAnimationFrame =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      function(callback) {
        return setTimeout(callback, 1);
      };

    imgOne.image.src = 'http://lorempixel.com/400/200/';
    imgTwo.image.src = 'http://lorempixel.com/300/200/';
    var imagesLoaded = false;
    var imageLoadedCallback = function(image) {
      return function() {
        if(imagesLoaded) {
          renderImages(images);
          bothImagesLoaded();
        }
        else {
          imagesLoaded = true;
        }
      }
    }
    var images = [
      imgOne,
      imgTwo
    ];
    imgOne.image.onload = imageLoadedCallback(imgOne);
    imgTwo.image.onload = imageLoadedCallback(imgTwo);

    var bothImagesLoaded = function() {
      var button = document.getElementById("BtnMovePhotos");
      var callbackMoveImage = function(images) {
        return function() {
          moveImages(images);
        }
      }
      var moveImages = function(images) {
        var callAgain = false;
        renderImages(images);
        for (var i = images.length - 1; i >= 0; i--) {
          if(images[i].x+images[i].image.width < canvas.width) {
            images[i].x++;
            callAgain = true;
          }
        };
        if(callAgain) {
          requestAnimationFrame(callbackMoveImage(images));
        }
      }
      var activateMove = function() {
        moveImages(images);
      }
      button.hidden="";
      button.addEventListener("click", activateMove);
    };
  }
}());
