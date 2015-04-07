( function() {

  var requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function(callback) {
      return setTimeout(callback, 1);
    };
  canvas = document.getElementById('CanvarForParticles');
  context = canvas.getContext('2d');
  var canvasOffsetX = canvas.getBoundingClientRect().left;
  var canvasOffsetY = canvas.getBoundingClientRect().top;
  document.onmousemove = handleMouseMove;

  var maxDistance = 20;
  var particleSize = 5;
  var mouseX=null;
  var mouseY=null;
  function handleMouseMove(event) {
    mouseX = event.pageX - canvasOffsetX;
    mouseY = event.pageY - canvasOffsetY;
  }

  var particlesAmount = 50;
  var particles = [];
  for (var i = particlesAmount-1; i >= 0; i--) {
    particles.push( {
      x: (Math.random() * canvas.width) ,
      y: (Math.random() * canvas.height),
      colour: "#eeeeff",
      vx: null,
      vy: null
    });
  };

  var drawParticle = function(element) {
    context.beginPath();
    context.fillStyle = element.colour;
    context.arc(element.x, element.y, particleSize, 0, Math.PI*2, true);
    context.closePath();
    context.fill();
  }
  var redraw = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#000033";
    // context.globalAlpha = 0.1;
    context.fill();
    context.fillRect(0, 0, canvas.width, canvas.height);
    // context.globalAlpha = 1;

    recalculate();
    particles.forEach( drawParticle );

    requestAnimationFrame(redraw);
  }

  var recalculate = function() {
    particles.forEach( function(particle, index) {
      if(index == 0) {
        var distX = mouseX - particle.x;
        var distY = mouseY - particle.y;
        particle.vx = distX;
        particle.vy = distY;
      }
      else {
        var distX = particles[index-1].x - particle.x;
        var distY = particles[index-1].y - particle.y;
        var factor = null;
        var distance = Math.sqrt( distX * distX + distY * distY);
        if(distance > maxDistance ) {
          var forceDirection = {
            x: distX / distance,
            y: distY / distance,
          };
          factor = ( distance - maxDistance )/distance;
        }
        else {
          factor = 0;
        }
        particle.vx = distX * factor;
        particle.vy = distY * factor;
      }
      particle.x += particle.vx;
      particle.y += particle.vy;
    } );
  }
  redraw();

}());
