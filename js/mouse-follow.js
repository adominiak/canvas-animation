( function() {

  var requestAnimationFrame = RequestAnimationFrame;
  canvas = document.getElementById('CanvarForParticles');
  context = canvas.getContext('2d');
  var canvasOffsetX = canvas.getBoundingClientRect().left + window.scrollX;
  var canvasOffsetY = canvas.getBoundingClientRect().top +window.scrollY;
  document.onmousemove = handleMouseMove;
  document.onmouseup = handleMouseUp;
  document.onmousedown = handleMouseDown;

  var particleSize = 5;
  var mouseX = null;
  var mouseY = null;
  var mouseDown = false;
  function handleMouseMove(event) {
    mouseX = event.pageX - canvasOffsetX;
    mouseY = event.pageY - canvasOffsetY;
  }
  function handleMouseUp(event) {
    mouseDown = false;
  }
  function handleMouseDown(event) {
    if(canvasOffsetY < 0){
      canvasOffsetX = canvas.getBoundingClientRect().left;
      canvasOffsetY = canvas.getBoundingClientRect().top;
    }
    mouseDown = true;
  }
  var particlesAmount = 10;
  var particles = [];
  for (var i = particlesAmount-1; i >= 0; i--) {
    particles.push( {
      x: (Math.random() * canvas.width),
      y: (Math.random() * canvas.height),
      colour: "#eeeeff",
      vx: Math.random()*2,
      vy: Math.random()*2,
      speedFactor: i+1
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
    context.fill();
    context.fillRect(0, 0, canvas.width, canvas.height);

    recalculate();
    particles.forEach( drawParticle );

    requestAnimationFrame(redraw);
  }

  var recalculate = function() {
    particles.forEach( function(particle) {
      if(mouseDown && mouseX) {
        var distX = mouseX - particle.x;
        var distY = mouseY - particle.y;
        var distance = Math.sqrt( distX * distX + distY * distY);
        var forceDirection = {
          x: distX / distance,
          y: distY / distance,
        };
        var factor =  0.1 * particle.speedFactor;
        particle.vx = distX * factor;
        particle.vy = distY * factor;
      }
      particle.x += particle.vx;
      particle.y += particle.vy;

      //bounce of borders
      if(particle.x < 0  && particle.vx < 0) {
        particle.vx *= -1;
      }
      if( particle.x > canvas.width && particle.vx > 0) {
        particle.vx *= -1;
      }
      if(particle.y < 0  && particle.vy < 0) {
        particle.vy *= -1;
      }
      if( particle.y > canvas.height && particle.vy > 0) {
        particle.vy *= -1;
      }
    } );
  }
  redraw();

}());
