// Setup the globals
var scene, camera, renderer, controls, gridHelper, width, height, lastFrame, demo;

var DEMOS = [
  DEMO_MAIN
];

// Get HTML Elements
var view = document.querySelector('.view');
var canvas = document.querySelector('.view-canvas');
var stats = document.querySelector('.stats');
var demos = document.querySelector('.demo');

// Create the initial scene, camera and renderer.
scene = new THREE.Scene();
gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

camera = new THREE.PerspectiveCamera(54, 16/9, 0.1, 1000);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
controls = new THREE.OrbitControls(camera, canvas);

renderer = new THREE.WebGLRenderer({ canvas: canvas });
var frame = function() {
  var now = new Date();
  var diff = now.getTime() - (lastFrame||now).getTime();// Difference in ms
  stats.textContent = (1000 / diff).toFixed(2) + ' FPS';

  if(demo) demo.frame(diff / 1000);
  
  renderer.render(scene, camera);
  lastFrame = now;
  requestAnimationFrame(frame);
};

function updateResolution() {
  var rect = view.getBoundingClientRect();
  width = rect.width;
  height = rect.height;

  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio)
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}


// Event Listeners
document.addEventListener('readystatechange', function() {
  updateResolution();
})

window.addEventListener('resize', function() {
  updateResolution();
})

window.addEventListener('orientationchange', function() {
  updateResolution();
})

// Methods
function setDemo(number) {
  if(demo) demo.unstage();
  var newDemo = DEMOS[number];
  demo = newDemo;
  demo.stage();
}

// Begin
for(var i = 0; i < DEMOS.length; i++) {
  var element = document.createElement('a');
  element.setAttribute('href', '#');
  element.setAttribute('data-demo', i);
  
  element.classList.add('demo-link');
  element.textContent = DEMOS[i].name;
  element.addEventListener('click', function(e) {
    var number = e.target.getAttribute('data-demo') * 1;
    setDemo(number);
  });
  demos.appendChild(element);
}
setDemo(0);
updateResolution();
frame();