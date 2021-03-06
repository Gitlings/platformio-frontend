/* eslint-disable no-mixed-operators,no-bitwise */
import * as THREE from 'three';
import SerializableInterface from 'common/Interfaces/SerializableInterface';

THREE.Vector2.serializableInterface = new SerializableInterface(THREE.Vector2, {
  serialize: object => ({
    x: () => object.x,
    y: () => object.y,
  }),

  deserialize: object => new THREE.Vector2(object.x, object.y),
});

THREE.Color.serializableInterface = new SerializableInterface(THREE.Color, {
  serialize: object => ({
    value: () => colorToArray(object),
  }),

  deserialize: object => new THREE.Color(arrayToColor(object.value)),
});

/**
 * @param color
 */
function colorToArray(color) {
  const rgbArray = new Uint8Array(3);
  const colorHex = color.getHex();
  rgbArray[0] = colorHex >> 16 & 255;
  rgbArray[1] = colorHex >> 8 & 255;
  rgbArray[2] = colorHex & 255;
  return rgbArray;
}

function arrayToColor(rgbArray) {
  return rgbArray[0] << 16 ^ rgbArray[1] << 8 ^ rgbArray[2] << 0;
}
