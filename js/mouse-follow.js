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
  document.onmousemove = handleMouseMove;
  var canvasOffsetX = canvas.getBoundingClientRect().left;
  var canvasOffsetY = canvas.getBoundingClientRect().top;

  var maxDistance = canvas.width/2;
  var particleSize = 5;
  var mouseX=null;
  var mouseY=null;
  function handleMouseMove(event) {
    mouseX = event.pageX - canvasOffsetX;
    mouseY = event.pageY - canvasOffsetY;
  }
  var particlesAmount = 1;
  var particles = [];
  for (var i = particlesAmount-1; i >= 0; i--) {
    particles.push( {
      x: (Math.random() * canvas.width) ,
      y: (Math.random() * canvas.height),
      colour: "#eeeeff",
      vx:  Math.random()*2,
      vy: Math.random()*2
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
      // console.log(mouseX + "  " + particle.vx);
      if(!mouseX)
      {
        return;
      }
      var distX = mouseX - particle.x;
      var distY = mouseY - particle.y;
      var distance = Math.sqrt( distX * distX + distY * distY);
      var forceDirection = {
        x: distX / distance,
        y: distY / distance,
      };
      var force = 10*(maxDistance - distance) / maxDistance;
      if (force < 0 ) {
        force = 0;
        // if( particle.vy == 0 && particle.vx == 0 ){
        //   particle.vy = Math.random();
        //   particle.vx = Math.random();
        //   force = 1;
        // }
      }
      if ( distance < particleSize ) {
        force = 0;
      }
      particle.vy = forceDirection.y * force ;
      particle.vx = forceDirection.x * force ;
      particle.x += particle.vx;
      particle.y += particle.vy;
      if(particle.x < 0 || particle.x > canvas.width) {
        particle.vx *= -1;
      }
      if(particle.y < 0 || particle.y > canvas.height) {
        particle.vy *= -1;
      }
    } );
  }
  redraw();

}());
