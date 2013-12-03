
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
  for (var i=0; i<this.rawData.length; i+=4) {
    this.pixelData.push({
      r: this.rawData[i],
      g: this.rawData[i+1],
      b: this.rawData[i+2],
      a: this.rawData[i+3]
    });
  }
};

Pic.prototype.pixelToRaw = function() {
  this.rawData = [];
  var self = this;
  for (var i=0; i<this.pixelData.length; i++) {
    ["r", "g", "b", "a"].forEach(function(attr) {
      self.rawData.push(self.pixelData[i][attr]);
    });
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
  this.rawData = this.imageData.data;
  return this.imageData;
};

Pic.prototype.shuffle = function() {
  if (!this.pixelData || this.pixelData.length === 0) {
    this.rawToPixel();
  }
  shuffle(this.pixelData);
  this.pixelToRaw();
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
    imageData: original.shuffle()
  });
  shuffled.draw();
};



 