var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var base = "linear-gradient(%, %),url('css/bg-img/joker.JPG') no-repeat center center fixed";
  // var background = [];
  // var imgs = document.getElementsByClassName('art-image');
  // for (let i = 0;i<imgs.length;i++){
  //   src = imgs[i].src.split('/');
  //   background.push(base.replace("%",src[src.length-1]));
  //   // console.log(background[i]);
  // }
  var colors = ["rgb(9, 7, 10)","rgb(190, 117, 117)",
                "rgb(89, 155, 149)",,"rgb(68, 22, 14)"];
  var art = document.getElementsByClassName("artsy")[0];
  var slides = document.getElementsByClassName("art-image");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
  id = slides[slideIndex-1].id;
  color_idx = id.substring(id.length-1,id.length);
  
  // console.log(base.replace('%',colors[parseInt(color_idx,10)]));
  // art.style.background =base.replace(/%/g,colors[parseInt(color_idx,10)]); 
  // art.style.backgroundSize = "cover";
  art.style.background = "none";
  art.style.backgroundColor = colors[parseInt(color_idx,10)];
  $('body').css('background-color', colors[parseInt(color_idx,10)]);
  // to replace all occurence of % in base
}