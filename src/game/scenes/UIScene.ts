import { Scene } from "phaser";

export default class UIScene extends Scene {
  constructor() {
    super({ key: "UIScene" });
  }

  create() {
    console.log("create ui");
  }
}
