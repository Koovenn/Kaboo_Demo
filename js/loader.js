export const load = {
  fonts: () => {
    loadFont("m5x7", "./assets/Font/m5x7.ttf");
  },

  sounds: () => {
    loadSound("confirm", "./assets/Sounds/Confirm.wav");
    loadSound("collect", "./assets/Sounds/Fruit collect.wav");
    loadSound("hit", "./assets/Sounds/Hit damage.wav");
    loadSound("jump", "./assets/Sounds/Jump.wav");
  },

  assets: () => {
    loadSprite("background_0", "assets/Background/background_0.png");
    loadSprite("background_1", "assets/Background/background_1.png");
    loadSprite("background_2", "assets/Background/background_2.png");
    loadSprite("spikes", "assets/Traps/Spikes/Idle.png");
    loadSprite("title_screen", "assets/Background/Title Screen.png");

    // This function helps loading a SpriteSheet into separate tiles so i can add them to the level design later on
    loadSpriteAtlas("assets/Background/Terrain (16x16).png", {
      platform_wood_left: { x: 272, y: 16, width: 16, height: 5 },
      platform_wood_mid: { x: 288, y: 16, width: 16, height: 5 },
      platform_wood_right: { x: 304, y: 16, width: 16, height: 5 },
      small_tree: { x: 0, y: 80, width: 60, height: 65 },
      big_tree: { x: 170, y: 10, width: 115, height: 200 },
      ground_left: { x: 96, y: 64, width: 16, height: 16 },
      ground_mid: { x: 112, y: 64, width: 16, height: 16 },
      ground_right: { x: 128, y: 64, width: 16, height: 16 },
      ground_deep_left: { x: 96, y: 80, width: 16, height: 16 },
      ground_deep_mid: { x: 112, y: 80, width: 16, height: 16 },
      ground_deep_right: { x: 128, y: 80, width: 16, height: 16 },
      wall_up: { x: 240, y: 128, width: 16, height: 16 },
      wall_mid: { x: 240, y: 144, width: 16, height: 16 },
      wall_down: { x: 240, y: 160, width: 16, height: 16 },
      wood_left: { x: 0, y: 103, width: 16, height: 9 },
      wood_mid: { x: 16, y: 103, width: 16, height: 9 },
      wood_right: { x: 32, y: 103, width: 16, height: 9 },
    });

    // Loads the animation SpriteSheets and loops through the frames

    loadSprite("idle_sprite", "assets/Sprites/Player/Idle (32x32).png", {
      sliceX: 11,
      sliceY: 1,
      anims: { idle_anim: { from: 0, to: 10, loop: true } },
    });

    loadSprite("fall_sprite", "assets/Sprites/Player/Fall (32x32).png");

    loadSprite("jump_sprite", "assets/Sprites/Player/Jump (32x32).png", {
        sliceX: 1,
        sliceY: 1,
        anims: { jump_anim: { from: 0, to: 0, loop: true } },
      });

    loadSprite("run_sprite", "assets/Sprites/Player/Run (32x32).png", {
      sliceX: 12,
      sliceY: 1,
      anims: { run_anim: { from: 0, to: 11, loop: true } },
    });

    loadSprite("cherry_sprite", "assets/Items/Cherries.png", {
      sliceX: 17,
      sliceY: 1,
      anims: { cherry_anim: { from: 0, to: 16, loop: true } },
    });

    loadSprite("hit_sprite", "assets/Sprites/Player/Hit (32x32).png", {
      sliceX: 7,
      sliceY: 1,
      anims: { hit_anim: { from: 0, to: 6, loop: true } },
    });
  },
};
