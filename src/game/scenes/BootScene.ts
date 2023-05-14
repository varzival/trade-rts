import { Scene } from "phaser";

export default class BootScene extends Scene {
  preload() {
    this.load.atlasXML(
      "medieval_rts_sprites",
      "sprites/medievalRTS_spritesheet.png",
      "sprites/medievalRTS_spritesheet.xml"
    );

    this.load.image(
      "medieval",
      "tiles/tilesheets/medieval_tilesheet_extruded.png"
    );
    this.load.tilemapTiledJSON("trade-rts-map", "tiles/trade-rts-map.json");
  }

  create() {
    this.scene.start("PlayScene");
  }
}
