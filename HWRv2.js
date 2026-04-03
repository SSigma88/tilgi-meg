import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';
const mindarThree = new MindARThree({
	container: document.body,
	imageTargetSrc: "hutao.mind"
});
const {renderer, scene, camera} = mindarThree;
const anchor = mindarThree.addAnchor(0);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
var pyramidgeometry=new THREE.CylinderGeometry(0, 0.8, 2, 4);
var pyramidmaterial=new THREE.MeshLambertMaterial({color: 0xF3FFE2});
var pyramidmesh=new THREE.Mesh(pyramidgeometry, pyramidmaterial);
anchor.group.add(cube);
cube.position.x = -2;
anchor.group.add(pyramidmesh);
var lightOne = new THREE.AmbientLight(0xFFFFFF, 1);
anchor.group.add(lightOne);
var lightTwo = new THREE.PointLight(0xFFFFFF, 1.5);
anchor.group.add(lightTwo);

lightTwo.position.y = 1;
lightTwo.position.x = 1.5;

await mindarThree.start();

function animate() {
    requestAnimationFrame(animate);
    pyramidmesh.rotation.y += 0.01;
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});