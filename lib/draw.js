const Deck = require("./deck.js");

const SYMBOL_SIZE = (140 * (130 / 140) * 3) / 14;
const CARD_SIZE = { x: (100 * 130) / 140, y: (140 * 130) / 140 };

class Draw {
  constructor(ctxPattern, background, canvasPattern) {
    this.ctxPattern = ctxPattern;
    this.background = background;
    this.canvasPattern = canvasPattern;
    this.deck = new Deck();
    this.colorSymbols = this.colorSymbols.bind(this);
    this.animateDrawCard = this.animateDrawCard.bind(this);
    this.drawInstructions = this.drawInstructions.bind(this);
  }

  drawInstructions(
    ctx,
    CARD_MARGIN,
    INSTRUCTIONS_POS,
    CLOSE_INSTRUCTIONS_POS,
    CLOSE_INSTRUCTIONS_SIZE,
    INSTRUCTIONS_BUTTON_POS,
    INSTRUCTIONS_SIZE,
    SUBMIT_SIZE
  ) {
    this.drawButton(
      ctx,
      INSTRUCTIONS_BUTTON_POS,
      "Instructions",
      { x: 23, y: 21 },
      "gray",
      SUBMIT_SIZE
    );

    ctx.fillStyle = "gray";
    ctx.globalAlpha = 0.5;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // instructionsShowing = true;

    ctx.globalAlpha = 1;
    ctx.fillStyle = "#BDF3FF";
    ctx.strokeStyle = "#847b7e";
    ctx.fillRect(
      INSTRUCTIONS_POS.x,
      INSTRUCTIONS_POS.y,
      INSTRUCTIONS_SIZE.x,
      INSTRUCTIONS_SIZE.y
    );
    ctx.beginPath();
    ctx.rect(
      INSTRUCTIONS_POS.x,
      INSTRUCTIONS_POS.y,
      INSTRUCTIONS_SIZE.x,
      INSTRUCTIONS_SIZE.y
    );
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = "red";
    ctx.fillRect(
      CLOSE_INSTRUCTIONS_POS.x,
      CLOSE_INSTRUCTIONS_POS.y,
      CLOSE_INSTRUCTIONS_SIZE.x,
      CLOSE_INSTRUCTIONS_SIZE.y
    );
    ctx.fillStyle = "white";
    ctx.font = "19px Georgia";
    ctx.fillText(
      "x",
      CLOSE_INSTRUCTIONS_POS.x + 6,
      CLOSE_INSTRUCTIONS_POS.y + 15
    );

    ctx.fillStyle = "#514e4f";
    ctx.fillText(
      "                                               Instructions:",
      INSTRUCTIONS_POS.x + 10,
      INSTRUCTIONS_POS.y + 50
    );

    ctx.font = "18px Georgia";

    ctx.fillText(
      "   The object of each round of Set is to find a ‘set’ of three cards from the",
      INSTRUCTIONS_POS.x + 10,
      INSTRUCTIONS_POS.y + 90
    );

    ctx.fillText(
      "      available face up cards. Each card has four features (color, symbol,",
      INSTRUCTIONS_POS.x + 10,
      INSTRUCTIONS_POS.y + 115
    );

    ctx.fillText(
      "   number and shading). In a proper ‘set,’ for each feature, all three cards",
      INSTRUCTIONS_POS.x + 10,
      INSTRUCTIONS_POS.y + 140
    );

    ctx.fillText(
      "     have the same variation of the feature, or different variations of the",
      INSTRUCTIONS_POS.x + 10,
      INSTRUCTIONS_POS.y + 165
    );

    ctx.fillText(
      "                feature. The variations of each feature are as follows:",
      INSTRUCTIONS_POS.x + 10,
      INSTRUCTIONS_POS.y + 190
    );

    ctx.fillText(
      "                              1. Color: red, green, or blue.",
      INSTRUCTIONS_POS.x + 10,
      INSTRUCTIONS_POS.y + 215
    );
    ctx.fillText(
      "                              2. Symbol: ovals, rectangles, or diamonds.",
      INSTRUCTIONS_POS.x + 10,
      INSTRUCTIONS_POS.y + 240
    );
    ctx.fillText(
      "                              3. Number: one, two, or three symbols. ",
      INSTRUCTIONS_POS.x + 10,
      INSTRUCTIONS_POS.y + 265
    );
    ctx.fillText(
      "                              4. Shading: solid, open, or striped.",
      INSTRUCTIONS_POS.x + 10,
      INSTRUCTIONS_POS.y + 290
    );
    ctx.fillText(
      " In the set below, the cards have different numbers and symbols, and the",
      INSTRUCTIONS_POS.x + 10,
      INSTRUCTIONS_POS.y + 315
    );
    ctx.fillText(
      "                                   same color and shading.",
      INSTRUCTIONS_POS.x + 10,
      INSTRUCTIONS_POS.y + 340
    );

    let card1 = this.deck.card("#0ef691", "oval", 1, "striped");
    let card2 = this.deck.card("#0ef691", "rectangle", 2, "striped");
    let card3 = this.deck.card("#0ef691", "diamond", 3, "striped");
    let pos1 = { x: INSTRUCTIONS_POS.x + 200, y: INSTRUCTIONS_POS.y + 365 };
    let pos2 = {
      x: INSTRUCTIONS_POS.x + 200 + ((CARD_SIZE.x + CARD_MARGIN.x) * 1) / 2,
      y: INSTRUCTIONS_POS.y + 365
    };
    let pos3 = {
      x:
        INSTRUCTIONS_POS.x +
        200 +
        (((CARD_SIZE.x + CARD_MARGIN.x) * 1) / 2) * 2,
      y: INSTRUCTIONS_POS.y + 365
    };

    this.drawCard(ctx, pos1, 1 / 2, "white", card1);
    this.drawCard(ctx, pos2, 1 / 2, "white", card2);
    this.drawCard(ctx, pos3, 1 / 2, "white", card3);

    ctx.fillStyle = "#514e4f";
    ctx.fillText(
      "    And this next set has different numbers, symbols, colors and shading.",
      INSTRUCTIONS_POS.x + 10,
      INSTRUCTIONS_POS.y + 470
    );

    let card4 = deck.card("#0ef691", "oval", 1, "striped");
    let card5 = deck.card("#fb4c4d", "rectangle", 2, "solid");
    let card6 = deck.card("#62a6e0", "diamond", 3, "open");
    let pos4 = { x: INSTRUCTIONS_POS.x + 200, y: INSTRUCTIONS_POS.y + 495 };
    let pos5 = {
      x: INSTRUCTIONS_POS.x + 200 + ((CARD_SIZE.x + CARD_MARGIN.x) * 1) / 2,
      y: INSTRUCTIONS_POS.y + 495
    };
    let pos6 = {
      x:
        INSTRUCTIONS_POS.x +
        200 +
        (((CARD_SIZE.x + CARD_MARGIN.x) * 1) / 2) * 2,
      y: INSTRUCTIONS_POS.y + 495
    };

    this.drawCard(ctx, pos4, 1 / 2, "white", card4);
    this.drawCard(ctx, pos5, 1 / 2, "white", card5);
    this.drawCard(ctx, pos6, 1 / 2, "white", card6);

    ctx.fillStyle = "#514e4f";
    ctx.fillText(
      "                         The game ends when you find ten sets.",
      INSTRUCTIONS_POS.x + 10,
      INSTRUCTIONS_POS.y + 600
    );
  }

  drawCard(ctx, pos, scale, color, card) {
    if (scale >= 0) {
      this.clearCard(ctx, pos, scale, CARD_SIZE);
      this.drawRoundedRec(
        ctx,
        pos,
        CARD_SIZE.x * scale,
        CARD_SIZE.y * scale,
        (CARD_SIZE.x * scale) / 10,
        color
      );
      ctx.strokeStyle = "#f8cdbf";
      ctx.stroke();
      if (card) this.drawSymbols(ctx, card, pos, scale);
    }
  }

  clearCard(ctx, pos, scale) {
    this.drawRoundedRec(
      ctx,
      { x: pos.x - 1, y: pos.y - 1 },
      scale * CARD_SIZE.x + 2,
      scale * CARD_SIZE.y + 2,
      (scale * CARD_SIZE.x) / 10,
      "#BDF3FF"
    );
  }

  drawRoundedRec(ctx, pos, width, length, radius, color) {
    ctx.beginPath();
    ctx.moveTo(pos.x + radius, pos.y);
    ctx.lineTo(pos.x + width - radius, pos.y, radius);
    ctx.arcTo(pos.x + width, pos.y, pos.x + width, pos.y + radius, radius);
    ctx.lineTo(pos.x + width, pos.y + length - radius);
    ctx.arcTo(
      pos.x + width,
      pos.y + length,
      pos.x + width - radius,
      pos.y + length,
      radius
    );
    ctx.lineTo(pos.x + radius, pos.y + length);
    ctx.arcTo(pos.x, pos.y + length, pos.x, pos.y + length - radius, radius);
    ctx.lineTo(pos.x, pos.y + radius);
    ctx.arcTo(pos.x, pos.y, pos.x + radius, pos.y, radius);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }

  drawButton(ctx, pos, text, textPos, color, SUBMIT_SIZE) {
    this.drawRoundedRec(
      ctx,
      pos,
      SUBMIT_SIZE.x,
      SUBMIT_SIZE.y,
      SUBMIT_SIZE.x / 10,
      color
    );
    ctx.fillStyle = "white";
    ctx.font = "19px Georgia";
    ctx.fillText(text, pos.x + textPos.x, pos.y + textPos.y);
  }

  drawDiamond(ctx, card, pos, scale) {
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y + (SYMBOL_SIZE * scale) / 2);
    ctx.lineTo(pos.x + SYMBOL_SIZE * scale, pos.y);
    ctx.lineTo(
      pos.x + 2 * SYMBOL_SIZE * scale,
      pos.y + (SYMBOL_SIZE * scale) / 2
    );
    ctx.lineTo(pos.x + SYMBOL_SIZE * scale, pos.y + SYMBOL_SIZE * scale);
    ctx.lineTo(pos.x, pos.y + (SYMBOL_SIZE * scale) / 2);
    ctx.closePath();
    this.colorSymbols(ctx, card);
  }

  drawOval(ctx, card, pos, scale) {
    ctx.beginPath();
    ctx.ellipse(
      pos.x + SYMBOL_SIZE * scale,
      pos.y + (SYMBOL_SIZE * scale) / 2,
      SYMBOL_SIZE * scale,
      (SYMBOL_SIZE * scale) / 2,
      0,
      0,
      2 * Math.PI
    );
    ctx.closePath();
    this.colorSymbols(ctx, card);
  }

  drawRectangle(ctx, card, pos, scale) {
    ctx.beginPath();
    ctx.rect(pos.x, pos.y, 2 * SYMBOL_SIZE * scale, SYMBOL_SIZE * scale);
    ctx.closePath();
    this.colorSymbols(ctx, card);
  }

  colorSymbols(ctx, card) {
    ctx.fillStyle = card.color;
    ctx.strokeStyle = card.color;
    if (card.shading === "open") ctx.stroke();
    if (card.shading === "solid") ctx.fill();
    if (card.shading === "striped") {
      this.ctxPattern.strokeStyle = card.color;
      this.ctxPattern.stroke();
      ctx.fillStyle = ctx.createPattern(this.canvasPattern, "repeat");
      ctx.stroke();
      ctx.fill();
    }
  }

  drawSymbols(ctx, card, pos, scale) {
    if (card.symbol === undefined) {
      ctx.globalAlpha = 0.5;
      this.drawCard(
        ctx,
        pos,
        scale,
        ctx.createPattern(this.background, "repeat")
      );
      ctx.globalAlpha = 1;
    }
    if (card.symbol === "rectangle") this.drawRectangles(ctx, card, pos, scale);
    if (card.symbol === "diamond") this.drawDiamonds(ctx, card, pos, scale);
    if (card.symbol === "oval") this.drawOvals(ctx, card, pos, scale);
  }

  drawRectangles(ctx, card, pos, scale) {
    if (card.number === 1) {
      this.drawRectangle(
        ctx,
        card,
        {
          x: pos.x + (SYMBOL_SIZE * scale * 2) / 3,
          y: pos.y + (SYMBOL_SIZE * scale * 11) / 6
        },
        scale
      );
    } else if (card.number === 2) {
      this.drawRectangle(
        ctx,
        card,
        {
          x: pos.x + (SYMBOL_SIZE * scale * 2) / 3,
          y: pos.y + (SYMBOL_SIZE * scale * 7) / 6
        },
        scale
      );
      this.drawRectangle(
        ctx,
        card,
        {
          x: pos.x + (SYMBOL_SIZE * scale * 2) / 3,
          y: pos.y + (SYMBOL_SIZE * scale * 15) / 6
        },
        scale
      );
    } else {
      this.drawRectangle(
        ctx,
        card,
        {
          x: pos.x + (SYMBOL_SIZE * scale * 2) / 3,
          y: pos.y + (SYMBOL_SIZE * scale) / 2
        },
        scale
      );
      this.drawRectangle(
        ctx,
        card,
        {
          x: pos.x + (SYMBOL_SIZE * scale * 2) / 3,
          y: pos.y + (SYMBOL_SIZE * scale * 11) / 6
        },
        scale
      );
      this.drawRectangle(
        ctx,
        card,
        {
          x: pos.x + (SYMBOL_SIZE * scale * 2) / 3,
          y: pos.y + (SYMBOL_SIZE * scale * 19) / 6
        },
        scale
      );
    }
  }

  drawOvals(ctx, card, pos, scale) {
    if (card.number === 1) {
      this.drawOval(
        ctx,
        card,
        {
          x: pos.x + (SYMBOL_SIZE * scale * 2) / 3,
          y: pos.y + (SYMBOL_SIZE * scale * 11) / 6
        },
        scale
      );
    } else if (card.number === 2) {
      this.drawOval(
        ctx,
        card,
        {
          x: pos.x + (SYMBOL_SIZE * scale * 2) / 3,
          y: pos.y + (SYMBOL_SIZE * scale * 7) / 6
        },
        scale
      );
      this.drawOval(
        ctx,
        card,
        {
          x: pos.x + (SYMBOL_SIZE * scale * 2) / 3,
          y: pos.y + (SYMBOL_SIZE * scale * 15) / 6
        },
        scale
      );
    } else {
      this.drawOval(
        ctx,
        card,
        {
          x: pos.x + (SYMBOL_SIZE * scale * 2) / 3,
          y: pos.y + (SYMBOL_SIZE * scale) / 2
        },
        scale
      );
      this.drawOval(
        ctx,
        card,
        {
          x: pos.x + (SYMBOL_SIZE * scale * 2) / 3,
          y: pos.y + (SYMBOL_SIZE * scale * 11) / 6
        },
        scale
      );
      this.drawOval(
        ctx,
        card,
        {
          x: pos.x + (SYMBOL_SIZE * scale * 2) / 3,
          y: pos.y + (SYMBOL_SIZE * scale * 19) / 6
        },
        scale
      );
    }
  }

  drawDiamonds(ctx, card, pos, scale) {
    if (card.number === 1) {
      this.drawDiamond(
        ctx,
        card,
        {
          x: pos.x + (SYMBOL_SIZE * scale * 2) / 3,
          y: pos.y + (SYMBOL_SIZE * scale * 11) / 6
        },
        scale
      );
    } else if (card.number === 2) {
      this.drawDiamond(
        ctx,
        card,
        {
          x: pos.x + (SYMBOL_SIZE * scale * 2) / 3,
          y: pos.y + (SYMBOL_SIZE * scale * 7) / 6
        },
        scale
      );
      this.drawDiamond(
        ctx,
        card,
        {
          x: pos.x + (SYMBOL_SIZE * scale * 2) / 3,
          y: pos.y + (SYMBOL_SIZE * scale * 15) / 6
        },
        scale
      );
    } else {
      this.drawDiamond(
        ctx,
        card,
        {
          x: pos.x + (SYMBOL_SIZE * scale * 2) / 3,
          y: pos.y + (SYMBOL_SIZE * scale) / 2
        },
        scale
      );
      this.drawDiamond(
        ctx,
        card,
        {
          x: pos.x + (SYMBOL_SIZE * scale * 2) / 3,
          y: pos.y + (SYMBOL_SIZE * scale * 11) / 6
        },
        scale
      );
      this.drawDiamond(
        ctx,
        card,
        {
          x: pos.x + (SYMBOL_SIZE * scale * 2) / 3,
          y: pos.y + (SYMBOL_SIZE * scale * 19) / 6
        },
        scale
      );
    }
  }

  animateDrawCard(ctx, pos, startScale, endScale, color, card, direction) {
    that = this;
    if (startScale !== endScale) {
      this.drawCard(ctx, pos, startScale, color, card);
      direction === "increase" ? (startScale += 0.5) : (startScale -= 0.5);
      requestAnimationFrame(function() {
        that.animateDrawCard(
          ctx,
          pos,
          startScale,
          endScale,
          color,
          card,
          direction
        );
      });
    }
  }
}

module.exports = Draw;
