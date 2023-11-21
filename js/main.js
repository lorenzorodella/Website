const portfolio = document.querySelector('#portfolio')
const contact = document.querySelector('#contact')
const portfolioContent = document.querySelector('#portfolio-content')
const contactContent = document.querySelector('#contact-content')

const textColor = getComputedStyle(document.querySelector(':root')).getPropertyValue('--text-color')

portfolio.addEventListener('click', () => {
  const portfolioBox = new WinBox({
    title: 'Portfolio',
    background: '#0e0014',
    // modal: true,
    width: '400px',
    height: '400px',
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
    mount: portfolioContent,
    onfocus: function () {
      this.setBackground(textColor)
    },
    onblur: function () {
      this.setBackground('#806c54')
    },
  })
})

contact.addEventListener('click', () => {
  const contactBox = new WinBox({
    title: 'Contact Me',
    background: '#0e0014',
    width: '400px',
    height: '400px',
    x: 150,
    y: 250,
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
    mount: contactContent,
    onfocus: function () {
      this.setBackground(textColor)
    },
    onblur: function () {
      this.setBackground('#806c54')
    },
  })
})

var i = 0;
const txt = document.querySelector('#title').innerHTML;
var speed = 150;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("title").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  } else {
    showContent()
  }
}

function showContent() {
  document.querySelector(".content-wrap").style.opacity="1";
  document.querySelectorAll("nav ul li")[0].style.opacity="1";
  document.querySelectorAll("nav ul li")[1].style.opacity="1";
}

document.querySelector('#title').innerHTML = "";
setTimeout(() => typeWriter(), 2000);