import { load } from "./js/loader.js";
import { UiManager } from "./js/UiManager.js";

// Initialize Kaboom context

kaboom({
  width: 1280,
  height: 720,
  canvas: document.getElementById("my-game"),
});

load.assets();
load.fonts();
load.sounds();

// Setup scenes

const scenes = {
  title: () => {
    UiManager.displayTitleScreen();
  },
  game: () => {
    // Adds the background Sprites

    add([sprite("background_0"), fixed(), scale(5)]);

    add([sprite("background_1"), fixed(), scale(5)]);

    add([sprite("background_2"), fixed(), scale(5)]);

    // Design the level using the SpriteSheet blocks created

    const map = addLevel(
      [
        "upllllllllllllllllllllllllllllllllllllllllllllllku",
        "m                                                m",
        "m                                                m",
        "m                                                m",
        "m                                                m",
        "m                                         plllllkm",
        "m                                     u          m",
        "m         <                       u   d          m",
        "m         u   plllk    <   <   <  d              m",
        "m       u d            plllllllk                 m",
        "m       d                                        m",
        "m<   <                                           m",
        "mplllk                                           m",
        "m                                                m",
        "m       u                                        m",
        "m       m  <                                     m",
        "m       m  01112      012                        m",
        "m       d                                        m",
        "m                          <   <                 m",
        "m                          01112                 m",
        "m                                                m",
        "m                   01112                        m",
        "m                                                m",
        "m<<              u                               m",
        "m344445    012   m                               m",
        "m677778          m<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<d",
        "m677773445<<<<<<<m44444444444444444444444444444445",
        "d6777767784444444d77777777777777777777777777777778",
        "pllllllllllllllllllllllllllllllllllllllllllllllllk",
      ],
      {
        // Defines block size
        tileWidth: 16,
        tileHeight: 16,

        // Defines what each symbol means
        tiles: {
          0: () => [
            sprite("platform_wood_left"),
            area(),
            body({ isStatic: true }),
            "passthrough",
          ],
          1: () => [
            sprite("platform_wood_mid"),
            area(),
            body({ isStatic: true }),
            "passthrough",
          ],
          2: () => [
            sprite("platform_wood_right"),
            area(),
            body({ isStatic: true }),
            "passthrough",
          ],
          3: () => [sprite("ground_left"), area(), body({ isStatic: true })],
          4: () => [sprite("ground_mid"), area(), body({ isStatic: true })],
          5: () => [sprite("ground_right"), area(), body({ isStatic: true })],
          6: () => [
            sprite("ground_deep_left"),
            area(),
            body({ isStatic: true }),
          ],
          7: () => [
            sprite("ground_deep_mid"),
            area(),
            body({ isStatic: true }),
          ],
          8: () => [
            sprite("ground_deep_right"),
            area(),
            body({ isStatic: true }),
          ],
          "-": () => [
            rect(16, 16),
            opacity(0),
            area(),
            body({ isStatic: true }),
          ], //invisible wall to create boundaries
          "<": () => [
            sprite("spikes"),
            area({ shape: new Rect(vec2(), 14, 3), offset: vec2(2, 6) }),
            body({ isStatic: true }),
            "spikes",
          ],
          u: () => [sprite("wall_up"), area(), body({ isStatic: true })],
          m: () => [sprite("wall_mid"), area(), body({ isStatic: true })],
          d: () => [sprite("wall_down"), area(), body({ isStatic: true })],
          p: () => [sprite("wood_left"), area(), body({ isStatic: true })],
          l: () => [sprite("wood_mid"), area(), body({ isStatic: true })],
          k: () => [sprite("wood_right"), area(), body({ isStatic: true })],
        },
      }
    );

    setGravity(1800); // Set the gravity value

    map.use(scale(2)); // Scales the map to the full background size

      // Add the player

    const player = add([
      sprite("idle_sprite", { anim: "idle_anim" }),
      scale(1.5),
      area({ shape: new Rect(vec2(), 23, 28), offset: vec2(5, 0) }),
      anchor("botleft"),
      body(),
      pos(100, 600),
      "player",
      {
        direction: "right",
        speed: 300,
      },
    ]);

    function enablePassthrough() {
      player.onBeforePhysicsResolve((collision) => {
        if (collision.target.is("passthrough") && player.isJumping()) {
          collision.preventResolution();
        }
      });
    }

    enablePassthrough();

    // Win Condition

    const cherry = add([
      sprite("cherry_sprite", { anim: "cherry_anim" }),
      scale(1.5),
      area({ shape: new Rect (vec2(), 10, 14)}),
      anchor("center"),
      body(),
      pos(1450, 50),
      "cherry",
    ]);

    player.onCollide("cherry", () => {
      destroy(cherry);
      play("collect");
    });

    onDestroy("cherry", () => {
      wait(1, () => {
        go("victory");
      });
    });

    // Movement Right

    onKeyDown("d", () => {
      if (player.curAnim() != "run_anim" && player.isGrounded()) {
        player.use(sprite("run_sprite"));
        player.play("run_anim");
      }

      if (player.direction !== "right") player.direction = "right";

      if (player.isGrounded()) {
        player.move(player.speed, 0);
      } else {
        player.move(player.speed - 25, 0);
      }
    });

    onKeyRelease("d", () => {
      player.use(sprite("idle_sprite"));
      player.play("idle_anim");
    });

    // Movement Left

    onKeyDown("a", () => {
      if (player.curAnim() != "run_anim" && player.isGrounded()) {
        player.use(sprite("run_sprite"));
        player.play("run_anim");
      }

      if (player.direction !== "left") player.direction = "left";

      if (player.isGrounded()) {
        player.move(-player.speed, 0);
      } else {
        player.move(-player.speed + 25, 0);
      }
    });

    onKeyRelease("a", () => {
      player.use(sprite("idle_sprite"));
      player.play("idle_anim");
    });

    // Jummping

    onKeyPress("space", () => {
      if (player.isGrounded()) {
        player.use(sprite("jump_sprite"));
        player.play("jump_anim");
        player.jump();
        play("jump");
      }
    });

    camScale(2); // To get cam closer to the map

    // Player dies when steps on a trap

    player.onCollide("spikes", () => {
      destroy(player);
      play("hit");
    });

    // Player respawns when a timer runs out after player has been destroyed

    onDestroy("player", () => {
      wait(1, () => {
        go("gameOver");
      });
    });

    // Keeps registering an event every frame, i used it so the camera can follow the player position, flip the X depending on player direction and to fix a bug that after jumping my player would freeze in Jumping Animation until i hit a direction command

    player.onUpdate(() => {
      camPos(player.pos);

      if (player.direction === "left") {
        player.flipX = true;
      } else {
        player.flipX = false;
      }

      if (player.isGrounded() && player.curAnim() === "jump_anim") {
        player.use(sprite("idle_sprite"));
        player.play("idle_anim");
      }
    });
  },

  gameOver: () => {
    UiManager.displayGameOverScreen();
  },

  victory: () => {
    UiManager.displayVictoryScreen();
  },
};

// This is a loop for every scene name inside of scene const to call the scene function for all at once, simplifying code

for (const key in scenes) {
  scene(key, scenes[key]);
}

go("title");
