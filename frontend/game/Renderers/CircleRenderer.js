import * as THREE from 'three';

import ObjectRendererInterface from '../Interfaces/ObjectRendererInterface';

/**
 * @constructor
 */
function CircleRenderer() {
  let circle = null;
  let mesh = null;

  this.objectRendererInterface = new ObjectRendererInterface(this, {

    initialize: (renderedObject) => {
      circle = renderedObject;
      const circleGeometry = new THREE.CircleBufferGeometry(circle.getRadius(), 32);
      const circleMaterial = new THREE.MeshBasicMaterial({
        color: circle.placeableObjectInterface.getColor(),
        side: THREE.DoubleSide,
      });
      mesh = new THREE.Mesh(circleGeometry, circleMaterial);
    },

    getRootMesh: () => mesh,

    renderUpdate: () => {
      const position = circle.placeableObjectInterface.getPosition();
      mesh.position.x = position.x;
      mesh.position.y = position.y;
      mesh.material.color = circle.placeableObjectInterface.getColor();
    },

  });
}

export default CircleRenderer;
