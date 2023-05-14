import Phaser, { Scene, Tilemaps, Cameras } from "phaser";

const MAX_ZOOM = 2;
const MIN_ZOOM = 0.4;

export default class PlayScene extends Scene {
  private cameraControl: Cameras.Controls.FixedKeyControl | null = null;

  private dragStartPositionCamera: Phaser.Math.Vector2 | null = null;
  private dragStartPositionPointer: Phaser.Math.Vector2 | null = null;

  constructor() {
    super({ key: "PlayScene" });
  }

  create() {
    const map = this.make.tilemap({ key: "trade-rts-map" });
    const tileset = map.addTilesetImage(
      "medieval",
      "medieval",
      64,
      64,
      33,
      34
    ) as Tilemaps.Tileset;
    map.createLayer("Ground", tileset);
    map.createLayer("Things", tileset);

    const cursors = this.input.keyboard?.createCursorKeys();
    if (cursors) {
      const controlConfig = {
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        speed: 0.5,
      };
      this.cameraControl = new Cameras.Controls.FixedKeyControl(controlConfig);
    }

    this.cameras.main.setBounds(0, 0, 64 * 40, 64 * 40);

    this.input.on(
      "wheel",
      (
        pointer: any,
        gameObjects: any,
        deltaX: any,
        deltaY: any,
        deltaZ: any
      ) => {
        if (deltaY > 0) this.cameras.main.setZoom(this.cameras.main.zoom - 0.1);
        else if (deltaY < 0)
          this.cameras.main.setZoom(this.cameras.main.zoom + 0.1);

        if (this.cameras.main.zoom > MAX_ZOOM)
          this.cameras.main.setZoom(MAX_ZOOM);
        else if (this.cameras.main.zoom < MIN_ZOOM)
          this.cameras.main.setZoom(MIN_ZOOM);
      }
    );
  }

  update(time: number, delta: number): void {
    console.log("deltay", this.input.activePointer.deltaY);
    if (this.input.activePointer?.isDown) {
      if (!this.dragStartPositionCamera || !this.dragStartPositionPointer) {
        this.dragStartPositionCamera = new Phaser.Math.Vector2(
          this.cameras.main.scrollX,
          this.cameras.main.scrollY
        );
        this.dragStartPositionPointer = new Phaser.Math.Vector2(
          this.input.activePointer.x,
          this.input.activePointer.y
        );
      }

      const deltaPos = new Phaser.Math.Vector2(
        this.input.activePointer.x,
        this.input.activePointer.y
      ).subtract(this.dragStartPositionPointer);
      this.cameras.main.setScroll(
        this.dragStartPositionCamera.x - deltaPos.x,
        this.dragStartPositionCamera.y - deltaPos.y
      );
    } else {
      this.dragStartPositionCamera = null;
      this.dragStartPositionPointer = null;
    }

    this.cameraControl?.update(delta);
  }
}
