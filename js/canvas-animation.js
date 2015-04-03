(function(){
  var requestAnimationFrame =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      function(callback) {
        return setTimeout(callback, 1);
      };
  function PhotoCanvas() {
    this.canvas = document.getElementById('CanvasForPhotos');
    this.setup();
  }

  PhotoCanvas.prototype.setup = function(image) {
    if(this.canvas.getContext){
      this.context = this.canvas.getContext('2d');
      this.imagesLoaded = false;
      var imgOne = {
        image: new Image(),
        x: 50,
        y:50
      }
      var imgTwo = {
        image: new Image(),
        x: 50,
        y: 300
      }
      imgOne.image.src = 'http://lorempixel.com/400/200/';
      imgTwo.image.src = 'http://lorempixel.com/300/200/';
      this.images = [
        imgOne,
        imgTwo
      ];
      imgOne.image.onload = this.imageLoadedCallback(imgOne);
      imgTwo.image.onload = this.imageLoadedCallback(imgTwo);
    }
  }

  PhotoCanvas.prototype.renderImages = function(images) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    images.forEach( (function( image ) {
      this.context.drawImage(image.image, image.x, image.y);
    }).bind(this) );
  }


  PhotoCanvas.prototype.imageLoadedCallback = function(image) {
    var self = this;
        return function() {
          if(self.imagesLoaded) {
            self.renderImages(self.images);
            self.bothImagesLoaded();
          }
          else {
            self.imagesLoaded = true;
          }
        }
      }
  PhotoCanvas.prototype.moveImages = function(images) {
    var callAgain = false;
    this.renderImages(images);
    for (var i = images.length - 1; i >= 0; i--) {
      if(images[i].x+images[i].image.width < this.canvas.width) {
        images[i].x++;
        callAgain = true;
      }
    };
    if(callAgain) {
      requestAnimationFrame(this.callbackMoveImage(images).bind(this));
    }
  }
  PhotoCanvas.prototype.callbackMoveImage = function(images) {
    return function() {
      this.moveImages(images);
    }
  }
  PhotoCanvas.prototype.bothImagesLoaded = function() {
    var button = document.getElementById("BtnMovePhotos");
    var activateMove = function() {
      this.moveImages(this.images);
    }
    button.hidden = "";
    button.addEventListener("click", activateMove.bind(this));
  };

  new PhotoCanvas();
  window.PhotoCanvas = window.PhotoCanvas || {};
}());

