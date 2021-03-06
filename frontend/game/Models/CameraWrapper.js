import * as THREE from 'three';

/**
 * @constructor
 */
function CameraWrapper() {
  const camera = new THREE.OrthographicCamera();

  /**
   * @returns {OrthographicCamera}
   */
  this.getCamera = () => camera;

  const cameraSize = new THREE.Vector2();
  const positionOffset = new THREE.Vector2();
  const cameraPosition = new THREE.Vector3();

  /**
   * @param {Vector2} topLeftUiSize
   * @param {Vector2} size
   */
  this.updateCameraSize = (topLeftUiSize, size) => {
    positionOffset.x = topLeftUiSize.x;
    positionOffset.y = -topLeftUiSize.y;
    updateCameraPosition();
    if (cameraSize === size) {
      return;
    }
    cameraSize.copy(size);

    const halfWidth = cameraSize.x / 2;
    const halfHeight = cameraSize.y / 2;

    camera.left = -halfWidth;
    camera.right = halfWidth;
    camera.top = halfHeight;
    camera.bottom = -halfHeight;
    camera.near = -2000;
    camera.zoom = 5;

    camera.updateProjectionMatrix();
  };

  /**
   * @param {Vector2} position
   */
  this.setPosition = (position) => {
    cameraPosition.copy(position);
    updateCameraPosition();
    camera.updateMatrixWorld();
  };

  /**
   * @returns {Vector3}
   */
  this.getPosition = () => cameraPosition;

  function updateCameraPosition() {
    camera.position.copy(cameraPosition).add(positionOffset).setZ(0);
  }
}

export default CameraWrapper;
