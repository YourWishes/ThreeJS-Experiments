var DEMO_MAIN = (function() {
  var geometry, material, mesh;
  
  return {
    name: 'Example Main Demo',

    stage: function() {
      geometry = new THREE.BoxGeometry(1, 1, 1);
      material = new THREE.MeshNormalMaterial();
      mesh = new THREE.Mesh( geometry, material );
      scene.add(mesh);
    },

    frame: function(d) {
      mesh.rotation.x += 1 * d; 
      mesh.rotation.y += 2 * d; 
      mesh.rotation.z += 3 * d; 
    },

    unstage: function() {
      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
    }
  }
})();