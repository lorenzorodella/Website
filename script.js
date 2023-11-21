const boxWidth = 80;
const boxGap = 3;
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

window.addEventListener("resize", function(event) {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;

  setBoxesCols()
  updateBoxes()
  populateBoxes()
  addSolution()
});


/*document.addEventListener('mousemove', e => {
  console.clear()
  let el = document.elementFromPoint(e.clientX, e.clientY)
  if (el.classList.contains('bg-box')) {highlightSquare(el);}
}, {passive: true})

var prevHighlight = document.querySelector('.bg-box');

function highlightSquare(el) {
  if (prevHighlight !== el) {
    el.style.background = highlightColor;
    prevHighlight.style.background = squareColor;
  }
  prevHighlight = el;
}*/



var r = document.querySelector(':root');

function setBoxesCols() {
  r.style.setProperty('--boxes-cols', computeBoxesNum(boxWidth, boxGap, screenWidth, screenHeight)[0]);
}



function computeBoxesNum(boxW, BoxG, screenW, screenH) {
  var cols = Math.ceil((screenW-BoxG)/(boxW+BoxG))
  var rows = Math.ceil((screenH-BoxG)/(boxW+BoxG))+1
  return [cols, cols*rows]
}

function multiplyNode(node, count, deep) {
  for (var i = 0, copy; i < count - 1; i++) {
      copy = node.cloneNode(deep);
      node.parentNode.insertBefore(copy, node);
  }
}

function generateBoxes() {
  multiplyNode(document.querySelector('.bg-box'), computeBoxesNum(boxWidth, boxGap, screenWidth, screenHeight)[1], true);
}

function updateBoxes() {
  const elements = document.getElementsByClassName('box');
  while(elements.length-1 > 0){
      elements[0].parentNode.removeChild(elements[0]);
  }
  generateBoxes();
}


const socials = {'GitHub': ['https://github.com/lorenzorodella', '<i class="fa-brands fa-github"></i>']}

function populateBoxes() {
  min = parseInt(getComputedStyle(r).getPropertyValue('--boxes-cols'))+1;
  max = parseInt(computeBoxesNum(boxWidth, boxGap, screenWidth, screenHeight)[1]) - (2*min-2);
  rands = generateRandomNumbers(min, max, 4)
  for (let i=0; i<rands.length; i++) {
    fillBox(rands[i], Object.keys(socials)[0], Object.values(socials)[0])
  }
}

function fillBox(boxnum, name, content) {
  let query = '.bg-box:nth-child('+boxnum+')';
  let el = document.querySelector(query);
  el.innerHTML='<a href="'+content[0]+'" target="_blank" title="'+name+'">'+content[1]+'</a>';
}

var randNums = [];

const generateRandomNumbers = (min, max, times) => {
  const randoms = []
  for (let i = 0; i < times; i++) {
      randoms.push(Math.floor(Math.random() * (max - min) + min))
  }
  randNums = randoms;
  return randoms
}




function addSolution() {
  let queryNum = parseInt(getComputedStyle(r).getPropertyValue('--boxes-cols'));
  let el = document.querySelector('.bg-box:nth-child('+queryNum+')')
  el.classList.add('solution');
  el.innerHTML = '<i class="fa-solid fa-eye"></i>';

  document.querySelector('.solution').addEventListener("click", function(event) {
    randNums.forEach(function(num) {
      document.querySelector('.bg-box:nth-child('+num+')').style.background = getComputedStyle(r).getPropertyValue('--highlight-color');
    })
  });
}


setBoxesCols()
generateBoxes()
populateBoxes()
addSolution()

