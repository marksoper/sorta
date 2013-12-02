
var img;
var original = {};
var random = {};
var sorted = {};

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

var randomizeImageData = function(imgData) {
  /*
  for (var i=0; i<imgData.data.length; i++) {
    if (i%4) {
      imgData.data[i] = Math.max(imgData.data[i]-100, 0);
    }
  }
  */
  shuffle(imgData.data);
  return imgData;
};


img = new Image();
img.src = "./oscar.jpg";
img.onload = function() {
  //
  original.canvas = document.getElementById("original");
  original.context = original.canvas.getContext("2d");
  original.canvas.width = img.width;
  original.canvas.height = img.height;
  original.context.drawImage(img, 0, 0);
  original.imageData = original.context.getImageData(0,0,original.canvas.width, original.canvas.height);
  //
  imgRandom = randomizeImageData(original.imageData);
  random.canvas = document.getElementById("random");
  random.context = random.canvas.getContext("2d");
  random.canvas.width = imgRandom.width;
  random.canvas.height = imgRandom.height;
  random.context.putImageData(imgRandom, 0, 0);
  random.imageData = random.context.getImageData(0,0,random.canvas.width, random.canvas.height);
};



 