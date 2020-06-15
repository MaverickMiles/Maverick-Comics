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
  var base = "linear-gradient(rgba(9, 7, 10, 0.85), rgba(9, 7, 10, 0.85)),url('../art/%') no-repeat center center fixed";
  var background = [];
  var imgs = document.getElementsByClassName('art-image');
  for (let i = 0;i<imgs.length;i++){
    src = imgs[i].src.split('/');
    background.push(base.replace("%",src[src.length-1]));
    // console.log(background[i]);
  }
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
  // art.style.background = background[parseInt(color_idx,10)];
  art.style.backgroundColor =colors[parseInt(color_idx,10)]; 
}