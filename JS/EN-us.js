/* -- Glow effect -- */

const blob = document.getElementById("blob");

window.onpointermove = event => { 
  const { clientX, clientY } = event;
  
  blob.animate({
    left: `${clientX}px`,
    top: `${clientY}px`
  }, { duration: 3000, fill: "forwards" });
}

/* -- Text effect -- */

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

let interval = null;

document.querySelector("h1").onmouseover = event => {  
  let iteration = 0;
  
  clearInterval(interval);
  
  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return event.target.dataset.value[index];
        }
      
        return letters[Math.floor(Math.random() * 26)]
      })
      .join("");
    
    if(iteration >= event.target.dataset.value.length){ 
      clearInterval(interval);
    }
    
    iteration += 1 / 3;
  }, 60);
}

/* -- Typing effect -- */

const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Developer", "Designer", "Gamer", "Curious",  "Autistic", "Fun", "Trans", "Smart", "Pretty"];
const typingDelay = 100;
const erasingDelay = 100;
const newTextDelay = 1000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
  	setTimeout(erase, newTextDelay);
  }
}

function erase() {
	if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex>=textArray.length) textArrayIndex=0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});

/* -- Sidebar -- */
function openNav() {
  document.getElementById("mySidebar").style.right = "0px";
  document.getElementById("main").style.marginRight = "300px";
  document.getElementById( "toggle" ).setAttribute( "onClick", "javascript: closeNav();" );
}

function closeNav() {
  document.getElementById("mySidebar").style.right = "-300px";
  document.getElementById("main").style.marginRight = "0px";
  document.getElementById( "toggle" ).setAttribute( "onClick", "javascript: openNav();" );
}

/* -- Cards effect -- */
document.getElementById("boxs").onmousemove = e => {
  for(const card of document.getElementsByClassName("box")) {
    const rect = card.getBoundingClientRect(),
    x = e.clientX - rect.left,
    y = e.clientY - rect.top;
    
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };
}

/* -- Nice People -- */
function getLinearFunction(x1, y1, x2, y2) {
  var slope = (y2 - y1) / (x2 - x1);
  return function(x) {
    return slope * (x - x1) + y1;
  }
}

const gallery = document.getElementById('gallery');
const thumbnail = document.querySelector('.thumbnail');
const thumbnailWrapper = document.getElementById('thumbnail-wrapper');

thumbnailWrapper.addEventListener('mousemove', handleMouseMove);
// document.addEventListener('key')

function handleMouseMove(e) {
  const noOfPics = Array.from(thumbnailWrapper.childNodes).length
  const clientX = e.clientX;
  const clientY = e.clientY;
  const width = thumbnailWrapper.clientWidth;
  const height = thumbnailWrapper.clientHeight;
  const wrapperWidth = thumbnail.clientWidth * noOfPics;
  const wrapperHeight = thumbnailWrapper.clientHeight;
  const percentX = clientX / width * 100;
  const percentY = clientY / height * 100;
  const scrollLeft = thumbnailWrapper.scrollLeft
  var maxScrollLeft = thumbnailWrapper.scrollWidth - thumbnailWrapper.clientWidth;
  var foo = getLinearFunction(0 + 400, 0, width - 100, maxScrollLeft);

  // output.innerHTML = JSON.stringify({
  //   clientX,
  //   clientY,
  //   width,
  //   height,
  //   wrapperWidth,
  //   wrapperHeight,
  //   scrollLeft,
  //   maxScrollLeft
  // }, null, 4)

  thumbnailWrapper.scroll(foo(clientX), 0)
}

// //initialize
// var winHeight = window.innerHeight,
// 		pages = document.getElementsByClassName('page'),
//     navLinks = document.querySelectorAll('#menu-nav a'),
// 		currentPage = 0;

//     console.log(winHeight);
// window.addEventListener('mousewheel', function(e){
//   scrollPages(e.wheelDelta);
// });
// window.addEventListener('DOMMouseScroll', function(e){
//   scrollPages(-1 * e.detail);
// });

// function scrollPages(delta){
// 	var direction = (delta > 0) ? 'up' : 'down',
//     currentPageOffset = currentPage * winHeight;
  
//   if(direction == 'down' && currentPage <= pages.length - 2){
//   	window.scrollTo(0, currentPageOffset + winHeight);
//     currentPage++;
//   } else if(direction == 'up' && currentPage > 0) {
//   	window.scrollTo(0, currentPageOffset - winHeight);
//     currentPage--;
//   }
// }

// for(var i = 0; i < navLinks.length; i++){
// 	navLinks[i].addEventListener('click', updateNav(i));
// }

// function updateNav(i){
// 	return function(){
//     for(var j=0 ; j < navLinks.length; j++) {
//     	navLinks[j].parentNode.classList.remove('current');
//     }
//     navLinks[i].parentNode.classList.add('current');
//     currentPage = i;
//  }
// }