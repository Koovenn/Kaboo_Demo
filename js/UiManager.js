class UI {
  displayTitleScreen() {
    add([sprite("title_screen")])
    add([text("Press Enter to start the game!", { size: 80, font: "m5x7" }), pos(225, 150)]);

    onKeyPress("enter", () => {
      play("confirm")
      go("game");
    });
  }

  displayGameOverScreen() {
    add([sprite("title_screen")])
    add([text("Game Over!", { size: 80, font: "m5x7" }), pos(520, 320), color(200, 0, 50)]);

    onKeyPress("enter", () => {
      play("confirm")
      go("title")
    })
  }

  displayVictoryScreen() {
    add([sprite("title_screen")])
    add([text("You won!", { size: 80, font: "m5x7" }), pos(520, 320), color(0, 200, 50)]);

    onKeyPress("enter", () => {
      play("confirm")
      go("title")
    })
  }
}

export const UiManager = new UI();
