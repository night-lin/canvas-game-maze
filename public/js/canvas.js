var canvas
var context
var x = 0,
    y = 0,
    dx = 0,
    dy = 0,
    startingX = 232,
    startingY = 5
    mazeSrc = 'images/maze2.png'
    mazeAnsSrc = 'images/maze2-ans.png'
    isAnsModel = false //答案模式
    // isFirst = true
window.onload = function () {
  init()
}

//初始化
function init() {
  dx = 0,
  dy = 0,
  canvas = document.getElementById("canvas1")
  context = canvas.getContext("2d")
  drawMaze(mazeSrc, startingX, startingY)
  window.onkeydown = processKey
  setTimeout(drawFrame, 20)
}

function getTips(){
  isAnsModel = true
  drawMaze(mazeAnsSrc, x, y)
}

function reset(){
  window.location.reload()
}
//绘制迷宫背景
function drawMaze(mazeFile, startingX, startingY) {
  var imgMaze = new Image()
  imgMaze.onload = function () {
    // 画布大小调整
    canvas.width = imgMaze.width
    canvas.height = imgMaze.height

    // 绘制笑脸
    var imgFace = document.getElementById("face")
    context.drawImage(imgMaze, 0, 0)

    x = startingX
    y = startingY
    context.drawImage(imgFace, x, y)
    context.stroke()
  }
  imgMaze.src = mazeFile
}

// 移动函数
function processKey(e) {
  dx = 0
  dy = 0
  // 上下左右方向键检测
  if (e.keyCode === 38) {
    dy = -1
  }
  if (e.keyCode === 40) {
    dy = 1
  }
  if (e.keyCode === 37) {
    dx = -1
  }
  if (e.keyCode === 39) {
    dx = 1
  }
}

// 绘制帧
function drawFrame() {
  if (dx != 0 || dy != 0) {
    // context.clearRect(x,y,canvas.width,canvas.height)
    // 绘制移动轨迹
    context.beginPath();
    context.fillStyle = "rgb(254,244,207)"
    if(isAnsModel){
      
    }
    context.rect(x, y, 15, 15)
    context.fill()
    x += dx
    y += dy
    if (checkForCollision()) {
      x -= dx
      y -= dy
      dx = 0
      dy = 0
    }

    var imgFace = document.getElementById('face')
    context.drawImage(imgFace, x, y)

    if (canvas.height - y < 17) {
      // isFirst = false
      alert('恭喜你通关 游戏结束')
      return false
    }
    //重置的话变成非自动移动
    // dx = 0
    // dy = 0
  }
  setTimeout(drawFrame, 20)
}

function checkForCollision() {
  var imageData = context.getImageData(x - 1, y - 1, 15 + 2, 15 + 2)
  var pixels = imageData.data

  for (var i = 0, len = pixels.length; i < len; i++) {
    var red = pixels[i],
      green = pixels[i + 1]
    blue = pixels[i + 2]
    alpha = pixels[i + 3]

    // 检测是否碰到黑色的墙
    if (red === 0 && green === 0 && blue === 0) {
      return true
    }
  }
  return false
}
