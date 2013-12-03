
var img;
var original;
var shuffled;
var sorted;

var Pic = function(props) {
  this.canvas = props.canvas;
  this.image = props.image;
  this.imageData = props.imageData;
  this.context = props.context || this.canvas.getContext("2d");
  if (this.image || this.imageData) {
    this.canvas.width = (this.image || this.imageData).width;
    this.canvas.height = (this.image || this.imageData).height;
  }
};

Pic.prototype.rawToPixel = function() {
  this.pixelData = [];
  for (var i=0; i<this.imageData.data.length; i+=4) {
    this.pixelData.push({
      i: i/4,
      r: this.imageData.data[i],
      g: this.imageData.data[i+1],
      b: this.imageData.data[i+2],
      a: this.imageData.data[i+3]
    });
  }
};

Pic.prototype.pixelToRaw = function() {
  var self = this;
  for (var i=0; i<this.pixelData.length; i++) {
    self.imageData.data[4*i] = self.pixelData[i]["r"];
    self.imageData.data[4*i+1] = self.pixelData[i]["g"];
    self.imageData.data[4*i+2] = self.pixelData[i]["b"];
    self.imageData.data[4*i+3] = self.pixelData[i]["a"];
  }
};

Pic.prototype.draw = function() {
  if (this.imageData) {
    this.context.putImageData(this.imageData, 0, 0);
  } else {
    this.context.drawImage(this.image, 0, 0);
  }
};

Pic.prototype.getImageData = function() {
  this.imageData = this.context.getImageData(0,0,this.canvas.width, this.canvas.height);
  return this.imageData;
};

Pic.prototype.shuffle = function() {
  if (!this.pixelData || this.pixelData.length === 0) {
    this.rawToPixel();
  }
  shuffle(this.pixelData);
  this.pixelToRaw();
  return this;
};



//
// Fisher-Yates shuffle
// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
//
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}


img = new Image();
img.src = "./oscar.jpg";
img.onload = function() {
  //
  original = new Pic({
    canvas: document.getElementById("original"),
    image: img
  });
  original.draw();
  original.getImageData();
  //
  shuffled = new Pic({
    canvas: document.getElementById("shuffled"),
    imageData: original.imageData
  });
  shuffled.shuffle();
  shuffled.draw();
};



 