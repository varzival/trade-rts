import Phaser from "phaser";
import BootScene from "./scenes/BootScene";
import PlayScene from "./scenes/PlayScene";
import UIScene from "./scenes/UIScene";

function launch(containerId: string) {
  return new Phaser.Game({
    type: Phaser.WEBGL,
    parent: containerId,
    scale: {
      mode: Phaser.Scale.ENVELOP,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      height: 1000,
    },
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 },
        // turn on to show colliders and velocity
        debug: false,
      },
    },
    scene: [BootScene, PlayScene, UIScene],
  });
}

export default launch;
export { launch };
