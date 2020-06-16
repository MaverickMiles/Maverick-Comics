var snapped = false;

$(document).ready(function(){
  setTimeout(preloader_end,2000);
  setTimeout(function(){load_component('firstName')},2200);
  setTimeout(function(){load_component('lastName')},2200);
  setTimeout(typeWriter,4500); 
});

function preloader_end(){
  document.getElementsByClassName('spinner-wrapper')[0].style.display = 'none'; 
}

function load_component(name){
  setTimeout(function(){
    document.getElementById(name).style.display = 'block'; 
  },1000);
}

function typeWriter() {
  var i = 0;
  var speed = 50;
  // quotes is an object from quotes.js
  let j = Math.floor(Math.random() * quotes.length);
  var  txt = '<br>' + quotes[j].quote + '<br><br>';
  var  name = quotes[j].author;
  var  link = quotes[j].link;
  function start_typing(){
    var quote = document.getElementById("quote");
    $('#author-name').attr('href', link);
    if (i < txt.length-3) {
      if (txt.substring(i,i+4) == '<br>'){
          quote.innerHTML += txt.substring(i,i+4);
          i+=4;
      }
      else{
          quote.innerHTML += txt.charAt(i);
          i++;
      }
      setTimeout(start_typing, speed);
      if( i > txt.length-3){
        $('#author-name').html(name);
        $('#author-name').css('display','block');
      }
    }
  }
  start_typing();
}

// make elements faded on scrolling 
function elementFade(i, e){
  let elementOffset, scrollTop,distance;
  var header = $('.nav-link').get(0).offsetHeight;
  scrollTop     = $(window).scrollTop(),
  elementOffset = $(e).offset().top,
  distance      = (elementOffset - scrollTop);

  if (distance<= header){
    $(e).fadeTo(1,0.1);
  } 
  else {
    $(e).fadeTo(1,1);
  }
}

function activate_snap_elements(){
  var items = document.getElementById('homepage').children;
  var e; var elems = [];
  for(let i = 0; i<items.length;i++){
    e = items[i];
    e.setAttribute('data-dis-type', "simultaneous");
    e.setAttribute('data-dis-particle-type', "thanosSnap");
    e.setAttribute('data-dis-reduction-factor',"20")
    elems.push(e)
  }
  return elems;
}

function load_snap_scripts(){
  // html2canvas.js
  var ss = document.createElement("script");
  ss.src = "js/html2canvas.js";
  ss.type = "text/javascript";
  ss.class = "snap_script";
  document.getElementsByTagName("body")[0].appendChild(ss);

  // disintegrate.js
  ss = document.createElement("script");
  ss.src = "js/disintegrate.js";
  ss.type = "text/javascript";
  ss.class = "snap_script";
  document.getElementsByTagName("body")[0].appendChild(ss);

  // snap.js
  ss = document.createElement("script");
  ss.src = "js/snap.js";
  ss.type = "text/javascript";
  ss.class = "snap_script";
  document.getElementsByTagName("body")[0].appendChild(ss);
}

function delete_snap_scripts(){
  $(".snap_script, canvas").remove();
}

function play_snap_audio(){
  var audio = document.createElement("audio");
  var source = document.createElement("source");
  source.src = "audio/snap_elongated.mp3";
  source.type= "audio/mpeg";
  audio.appendChild(source);
  document.getElementsByTagName("body")[0].appendChild(audio);
  audio.play();
}

function play_unsnap_audio(){
  var audio = document.createElement("audio");
  var source = document.createElement("source");
  source.src = "audio/unsnap.mp3";
  source.type= "audio/mpeg";
  audio.appendChild(source);
  document.getElementsByTagName("body")[0].appendChild(audio);
  audio.play();
}


function snap(){
  var snap_btn = document.getElementById('snap-icon');
  snap_btn.src="css/icons/snapped.png";
  setTimeout(function(){$('#modalSnap').modal('hide');},2000);
  // $("body").fadeOut(2000,function(){
  //   setTimeout(function(){$("body").fadeIn(2500);},2000);
  // });
  // var tar = $('#About').offset().top;
  // $("html, body").animate({scrollTop: tar},1000);
}
function unsnap(){
  var snap_btn = document.getElementById('snap-icon');
   snap_btn.src="css/icons/snap_reverse.png";
  setTimeout(function(){$('#modalSnap').modal('hide');},1000);
  $('[data-dis-type=simultaneous]').css("visibility","visible");

}
function change_icon(){
  var snap_btn = document.getElementById('snap-icon');
  snap_btn.src="css/icons/about_to_snap.png";
  // snap_btn.id = "unsnap-icon";
  // setTimeout(snap,2000);  
}

// snap effect sequence
$("#snap-icon").click(function(){
  // $('body').css('background-color','white');
  // activate_snap_elements();
  // setTimeout(load_snap_scripts,3000); 
  if (!snapped){
    $('.bio, .open-eye').css('animation-name','none');
    let tar = $('#homepage').offset().top;
    $("html, body").animate({scrollTop: tar},1000);
    play_snap_audio();
    setTimeout(snap,1250);
    setTimeout(change_icon,4000);
    setTimeout(snap_effect,4500);
    snapped = true;
  }
  else{
    let tar = $('#homepage').offset().top;
    $("html, body").animate({scrollTop: tar},1000);
    play_unsnap_audio();
    setTimeout(unsnap,1250);
    // $('[data-dis-type=simultaneous]').css({visibility: visible},2000);
    document.getElementById("home-icon").disabled = true;
    delete_snap_scripts();
  }
  
  // $('#home-icon').disabled = true;
  // document.getElementById("home-icon").disabled = true;
  // setTimeout(function(){
  //   $('body').css('background-color','black');
  // },7000);
});

$("#unsnap-icon").click(function(){
  console.log("Here");
  let tar = $('#homepage').offset().top;
  $("html, body").animate({scrollTop: tar},1000);
  play_unsnap_audio();
  setTimeout(unsnap,1250);
  document.getElementById("home-icon").disabled = true;
  delete_snap_scripts();
});


// Animate scrolling
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    var target = $(this.hash);
    if (target.length) {
      $("html, body").animate( {scrollTop: target.offset().top}, 1000);
    }
  });
});

// Mobile nav menu icon
$('.fa-bars').click(function(){
  $('.nav-menu').slideDown(100);
  $('.fa-times').css('display','block');
  $('.fa-bars').css('display','none');
});

// mobile nav menu display
$('.fa-times, .nav-menu li a').click(function(){
  if ($(window).width() <= 768){
    $('.nav-menu').slideUp(100);
    $('.fa-times').css('display','none');
    $('.fa-bars').css('display','block');
  }
});

$(window).resize(function(){
  if ($(window).width() > 768){	
    $(".nav-menu").css('display', 'flex');
  }	
  else{
    $(".nav-menu").css('display', 'none');
  }
});

// make elements opaque on scrolling 
$(function(){ 
  $(document).scroll(function(){
    $('section div *:not(:has(*)):not(img),#quote,.art-text,#art-welcome').each(elementFade);
  });
});