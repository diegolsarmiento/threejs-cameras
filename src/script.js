import './style.css';
import * as THREE from 'three';

// Cursor
const cursor = {
    x: 0,
    y: 0
}

// Sizes
const sizes = {
    width: 800,
    height: 600
};

window.addEventListener('mousemove', (event) =>
{
    // This allows moving from -0.5 to 0.5, so is 0 in Center
    cursor.x = event.clientX / sizes.width - 0.5
    // NOTE: This is negative because Y is 0 at the top and POSITIVE at the Buttom
    cursor.y = - (event.clientY / sizes.height - 0.5)
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);

// Camera
// Perspective Camera
// Parameters are POV, Aspect Ratio, NEAR, FAR
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);

// Ortographic Camera
// Parameters are LEFT, RIGHT, TOP, BOTTOM, NEAR, FAR
//const aspectRadio = sizes.width / sizes.height;
//const camera = new THREE.OrthographicCamera(-1 * aspectRadio, 1 * aspectRadio, 1, -1, 0.1, 100);

/*
// Isolated because of code for Custom Controls / Mouse
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 2;
*/
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);

// Animate
const clock = new THREE.Clock();

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime();

    // Update objects
    // Isolated because of code for Custom Controls / Mouse
    /*
    mesh.rotation.y = elapsedTime;
    */

    // Update camera
    camera.position.x = cursor.x * 5
    camera.position.y = cursor.y * 5
    // Look at the camera regardless of the camera position
    camera.lookAt(mesh.position)

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}

tick();