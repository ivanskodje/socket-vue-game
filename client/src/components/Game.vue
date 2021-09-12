<template>
  <div>
    <canvas ref="game" style="border: 2px solid #000000;"> </canvas>
  </div>
</template>

<script>
import socketIO from "socket.io-client";
import * as Pixi from "pixi.js";

export default {
  name: "Game",
  data() {
    return {
      game: null,
      socket: {},
      position: {
        x: 0,
        y: 0,
      },
      context: {},
    };
  },

  created() {
    this.socket = socketIO("http://localhost:3000");
  },

  mounted() {
    this.game = new Pixi.Application({
      width: 600,
      height: 600,
      antialias: true,
      backgroundAlpha: 1,
      view: this.$refs.game,
      backgroundColor: 0xdfdfdf,
      autoDensity: true,
    });

    this.context.player = new Pixi.Graphics();

    this.socket.on("position", (data) => {
      this.position = data;
      this.draw();
    });

    window.addEventListener("keydown", this.keysDown);
    window.addEventListener("keyup", this.keysUp);
  },

  methods: {
    keysDown(e) {
      if (e.keyCode == 38) {
        // up
        this.socket.emit("move", "up");
      }

      if (e.keyCode == 40) {
        this.socket.emit("move", "down");
      }

      if (e.keyCode == 37) {
        this.socket.emit("move", "left");
      }

      if (e.keyCode == 39) {
        this.socket.emit("move", "right");
      }
    },

    // keysUp(e) {},

    draw() {
      this.context.player.clear();
      this.context.player
        .beginFill(0x000000)
        .drawRect(this.position.x, this.position.y, 25, 25)
        .endFill();

      this.game.stage.addChild(this.context.player);
    },
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
</style>
