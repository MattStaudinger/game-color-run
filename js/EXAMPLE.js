[
  {
    "x": [
      0,
      534,
      937,
      1093
    ],
    "y": [
      68,
      68,
      68,
      68
    ],
    "widthBrick": [
      534,
      403,
      156,
      107
    ],
    "height": [
      30,
      30,
      30,
      30
    ],
    "color": [
      "#FAB752",
      "#B64926",
      "#2C8693",
      "#2C8693"
    ]
  },
  {
    "x": [
      0,
      161,
      367,
      798
    ],
    "y": [
      293,
      293,
      293,
      293
    ],
    "widthBrick": [
      161,
      206,
      431,
      402
    ],
    "height": [
      30,
      30,
      30,
      30
    ],
    "color": [
      "#2C8693",
      "#FFF0A5",
      "#2C8693",
      "#468966"
    ]
  },
  {
    "x": [
      0,
      400,
      727,
      966,
      1091
    ],
    "y": [
      647,
      647,
      647,
      647,
      647
    ],
    "widthBrick": [
      400,
      327,
      239,
      125,
      109
    ],
    "height": [
      30,
      30,
      30,
      30,
      30
    ],
    "color": [
      "#FFF0A5",
      "#B64926",
      "#2C8693",
      "#FAB752",
      "#B64926"
    ]
  }
]


color: (4) ["#FAB752", "#B64926", "#2C8693", "#2C8693"]
height: (4) [30, 30, 30, 30]
widthBrick: (4) [534, 403, 156, 107]
x: (4) [0, 534, 937, 1093]
y: (4) [68, 68, 68, 68]
__proto__: Object


obstacles = []
obstacles.push(new Brick(x,y,width,height,color))

class Brick{
  constructor(x,y,width,height,color){}
  draw() {}
  update() {
    this.y -= 5 // speed of all bricks
  }
}