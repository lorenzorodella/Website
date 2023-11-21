var r = document.querySelector(':root');

const boxWidth = parseInt(getComputedStyle(r).getPropertyValue('--box-width').replace('px', ''));
const boxGap = 3;
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

window.addEventListener("resize", function(event) {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;

  setBoxesCols()
  updateBoxes()
  populateBoxes()
  addTitle()
});

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
  max = parseInt(computeBoxesNum(boxWidth, boxGap, screenWidth, screenHeight)[1]) - (3*min-2);
  rands = generateRandomNumbers(min, max, 4)
  for (let i=0; i<rands.length; i++) {
    fillBox(rands[i], Object.keys(socials)[0], Object.values(socials)[0])
  }
}

function fillBox(boxnum, name, content) {
  let query = '.bg-box:nth-child('+boxnum+')';
  let el = document.querySelector(query);
  el.classList.add("rand-social")
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



document.querySelector('.solution').addEventListener("click", function(event) {
  randNums.forEach(function(num) {
    document.querySelector('.bg-box:nth-child('+num+')').style.background = getComputedStyle(r).getPropertyValue('--highlight-color');
  })
});


/*function addSolution() {
  let queryNum = parseInt(getComputedStyle(r).getPropertyValue('--boxes-cols'));
  let el = document.querySelector('.bg-box:nth-child('+queryNum+')')
  el.classList.add('solution');
  el.innerHTML = '<i class="fa-solid fa-eye"></i>';

  document.querySelector('.solution').addEventListener("click", function(event) {
    randNums.forEach(function(num) {
      document.querySelector('.bg-box:nth-child('+num+')').style.background = getComputedStyle(r).getPropertyValue('--highlight-color');
    })
  });
}*/


const wName= ["l","o","r","e","n","z","o"]
const wSurname= ["r","o","d","e","l","l","a"]

function addTitle() {
  var cols = parseInt(getComputedStyle(r).getPropertyValue('--boxes-cols'));
  if (cols >= 14) {
    for(let i=0; i<wName.length; i++) {
      let num = i+1
      let el = document.querySelector('.bg-box:nth-child('+(num)+')')
      el.classList.add('title')
      el.innerHTML=wName[i];
    }
    for(let i=cols; i>=cols-wSurname.length+1; i--) {
      console.log(i)
      let el = document.querySelector('.bg-box:nth-child('+(i)+')')
      el.classList.add('title')
      el.innerHTML=wSurname[(i-cols+wSurname.length-1)];
    }
  }
}


setBoxesCols()
generateBoxes()
populateBoxes()
//addSolution()
addTitle()

