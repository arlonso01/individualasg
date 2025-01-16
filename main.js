// Import necessary functions and objects
import { loadGLTF } from "/libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

// Function to initialize MindARThree instance
const initializeMindAR = (container, targetSrc) => {
  return new window.MINDAR.IMAGE.MindARThree({
    container: container,
    imageTargetSrc: targetSrc,
  });
};

// Function to set up lighting for the scene
const setupLighting = (scene) => {
  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  scene.add(light);
};

// Function to load and configure a 3D model
const loadAndConfigureModel = async (path, scale, position) => {
  const model = await loadGLTF(path);
  model.scene.scale.set(scale.x, scale.y, scale.z);
  model.scene.position.set(position.x, position.y, position.z);

  // If the model has animations, set up an animation mixer
  if (model.animations && model.animations.length > 0) {
    const mixer = new THREE.AnimationMixer(model.scene);
    const action = mixer.clipAction(model.animations[0]);
    action.play();
    model.mixer = mixer;
  }

  return model;
};

// Function to set up the anchor with the model
const setupAnchor = (mindarThree, anchorIndex, model) => {
  const anchor = mindarThree.addAnchor(anchorIndex);
  anchor.group.add(model.scene);
};

// Function to start rendering loop
const startRenderingLoop = (renderer, scene, camera, models) => {
  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    const delta = clock.getDelta();
    models.forEach((model) => {
      if (model.mixer) {
        model.mixer.update(delta);
      }
    });
    renderer.render(scene, camera);
  });
};

// Main function for AR setup
const startARExperience = async (targetSrc, modelsConfig) => {
  const mindarThree = initializeMindAR(document.body, targetSrc);
  const { renderer, scene, camera } = mindarThree;

  setupLighting(scene);

  const models = await Promise.all(
    modelsConfig.map((config) =>
      loadAndConfigureModel(config.path, config.scale, config.position)
    )
  );

  models.forEach((model, index) => setupAnchor(mindarThree, index, model));

  await mindarThree.start();
  startRenderingLoop(renderer, scene, camera, models);
};

// Event Listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  // Navigation buttons
  const scanMapButton = document.querySelector(".button[href='scan_map/']");
  const scanStorybookButton = document.querySelector(".button[href='scan_storybook/']");

  // Map Button
  if (scanMapButton) {
    scanMapButton.addEventListener("click", async (event) => {
      event.preventDefault();
      await startARExperience("/assets/targets/tuto2.mind", [
        {
          path: "/assets/models/flying_bee/scene.gltf",
          scale: { x: 0.1, y: 0.1, z: 0.1 },
          position: { x: 0, y: -0.4, z: 0 },
        },
      ]);
    });
  }

  // Storybook Button
  if (scanStorybookButton) {
    scanStorybookButton.addEventListener("click", async (event) => {
      event.preventDefault();
      await startARExperience("/assets/targets/tuto2.mind", [
        {
          path: "/assets/models/flying_bee/scene.gltf",
          scale: { x: 0.1, y: 0.1, z: 0.1 },
          position: { x: 0, y: -0.4, z: 0 },
        },
      ]);
    });
  }
});
