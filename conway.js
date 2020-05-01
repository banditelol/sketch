const width = 50;
const height = 50;
let mat = [];
let matBuf = [];
const s = 10;
const fr = 24;

function check_seed([x, y], seed) {
  for ([u, v] of seed) {
    if (x === u && y === v) return true;
  }
  return false;
}

function caged(x, y) {
  if (x < 0) return false;
  if (x > width - 1) return false;
  if (y < 0) return false;
  if (y > height - 1) return false;
  return true;
}

function check_neighbor(x, y) {
  let neighbor = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (caged(x + i, y + j) && !(i === 0 && j === 0)) {
        neighbor += mat[x + i][y + j];
      }
    }
  }
  return neighbor;
}


function setup() {
  const cnv = createCanvas(width * s, height * s);
  cnv.parent('sketch-holder');
  frameRate(fr);
  noStroke();
  background(255);
  for (let i = 0; i < width; i++) {
    mat.push([]);
    for (let j = 0; j < height; j++) {
      mat[i].push(i % 4 === 2 || j % 3 === 1);
    }
  }
  matBuf = JSON.parse(JSON.stringify(mat));
}

function draw() {
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      nb = check_neighbor(i, j);
      if (mat[i][j]) {
        fill((red(get(i * s + s / 2, j * s + s / 2)) + 50) * 0.1);
        rect(i * s, j * s, s, s);
        if (nb > 3 || nb < 2) matBuf[i][j] = false;
      } else {
        fill((red(get(i * s + s / 2, j * s + s / 2)) + 1000) * 0.1);
        rect(i * s, j * s, s, s);
        if (nb == 3) matBuf[i][j] = true;
      }
    }
  }
  console.log('update');
  mat = JSON.parse(JSON.stringify(matBuf));
}
