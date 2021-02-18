var DEMO_SPRITE = (function() {
  var sprites = [];
  var spriteForward, spriteLeft, spriteBack, spriteRight;
  
  return {
    name: 'Example Sprite Demo',
    description: '<p>Sprites courtesy of https://franuka.itch.io/rpg-townsfolk-pack</p>',
    
    stage: function() {
      spriteForward = textureLoader.load('assets/forward.png');
      spriteLeft = textureLoader.load('assets/left.png');
      spriteBack = textureLoader.load('assets/backward.png');
      spriteRight = textureLoader.load('assets/right.png');

      var makeSprite = function(x, y, z) {
        var material = new THREE.SpriteMaterial({ map: spriteForward });
        sprite = new THREE.Sprite(material);
        sprite.position.set(x, y + 0.5, z);
        scene.add(sprite);
        return { sprite, material };
      }

      sprites.push(makeSprite(0,0,0));
      sprites.push(makeSprite(3,0,0));
      sprites.push(makeSprite(3,0,3));
      sprites.push(makeSprite(0,0,3));
      sprites.push(makeSprite(0,0,5));
      sprites.push(makeSprite(5,0,0));
    },

    frame: function(d) {
      var map;

      for(var i = 0; i < sprites.length; i++) {
        var sprite = sprites[i].sprite;
        var material = sprites[i].material;
        var diff = sprite.position.clone().sub(camera.position);
        var angle = THREE.Math.radToDeg(Math.atan2(diff.x,diff.z));

        if(angle >= -135 && angle < -45) {
          map = spriteRight;
        } else if(angle >= -45 && angle < 45) {
          map = spriteForward;
        } else if(angle >= 45 && angle < 135) {
          map = spriteLeft;
        } else {
          map = spriteBack;
        }

        map.minFilter = THREE.NearestFilter;
        map.magFilter = THREE.NearestFilter;

        material.map = map;
      }
    },

    unstage: function() {
      for(var i = 0; i < sprites.length; i++) {
        var sprite = sprites[i].sprite;
        var material = sprites[i].material;
        scene.remove(sprite);
        material.dispose();
      }

      spriteForward.dispose();
      spriteLeft.dispose();
      spriteBack.dispose();
      spriteRight.dispose();
    }
  }
})();