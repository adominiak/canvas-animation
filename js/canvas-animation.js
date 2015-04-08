(function(){

  var requestAnimationFrame = RequestAnimationFrame;

  function PhotoCanvas() {
    this.canvas = document.getElementById('CanvasForPhotos');
    this.setup();
  }

  PhotoCanvas.prototype.setup = function(image) {
    if(this.canvas.getContext){
      this.context = this.canvas.getContext('2d');
      this.imagesLoaded = 0;
      this.images = [];
      this.addImage('http://lorempixel.com/400/200/', 50, 50);
      this.addImage('http://lorempixel.com/300/200/', 50, 300);
    }
  }
  PhotoCanvas.prototype.addImage = function(src, x, y) {
    var imageToAdd = {
      image: new Image(),
      x: x,
      y: y
    }
    imageToAdd.image.onload = this.imageLoaded.bind(this);
    imageToAdd.image.src = src;
    this.images.push(imageToAdd);
  }

  PhotoCanvas.prototype.renderImages = function(images) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    images.forEach( this.drawSingleImage, this );
  }

  PhotoCanvas.prototype.drawSingleImage = function(image) {
    this.context.drawImage(image.image, image.x, image.y);
  }

  PhotoCanvas.prototype.imageLoaded =  function() {
    if(this.imagesLoaded == this.images.length-1) {
      this.allImagesLoaded();
    }
    else {
      this.imagesLoaded++;
    }
  }

  PhotoCanvas.prototype.moveImages = function() {
    var callAgain = false;
    this.renderImages(this.images);
    for (var i = this.images.length - 1; i >= 0; i--) {
      if(this.images[i].x+this.images[i].image.width < this.canvas.width) {
        this.images[i].x++;
        callAgain = true;
      }
    };
    if(callAgain) {
      requestAnimationFrame(this.moveImages.bind(this));
    }
  }

  PhotoCanvas.prototype.allImagesLoaded = function() {
    this.renderImages(this.images);
    var button = document.getElementById("BtnMovePhotos");
    button.hidden = "";
    button.addEventListener("click", this.moveImages.bind(this));
  };

  new PhotoCanvas();
  window.PhotoCanvas = window.PhotoCanvas || {};
}());

