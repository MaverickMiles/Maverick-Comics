var snapped = false;
var snap_continue =  document.getElementById('snap_continue');

$(document).ready(function(){
  setTimeout(preloader_end,1800);
  setTimeout(function(){load_component('firstName')},2000);
  setTimeout(function(){load_component('lastName')},2200);
  setTimeout(typeWriter,4000); 
});

function preloader_end(){
  document.getElementsByClassName('spinner-wrapper')[0].style.display = 'none'; 
}

function load_component(name){
  setTimeout(function(){
    document.getElementById(name).style.display = 'block'; 
  }, 1000);
}

function typeWriter() {
  var i = 0;
  var speed = 50;
  // quotes is an object from quotes.js
  var txt, name, link;
  $.getJSON("data/quotes.json", function(json) {
    console.log(json.length);
    let j = Math.floor(Math.random() * json.length);
    console.log(j);
    txt = '<br>' + json[j].quote + '<br><br>';
    name = json[j].author;
    link = json[j].link;
  }).done(function() {
    console.log( "success" );
    start_typing();
  })
  
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
  var ss1 = document.createElement("script");
  ss1.src = "js/html2canvas.js";
  // ss1.type = "text/javascript";
  ss1.class = "snap_script";
  document.getElementsByTagName("body")[0].appendChild(ss1);
  ss1.onload = function(){
    console.log("html2canvas.js loaded");
  };
  // disintegrate.js
  var ss2 = document.createElement("script");
  ss2.src = "js/disintegrate.js";
  // ss2.type = "text/javascript";
  ss2.class = "snap_script";
  // document.getElementsByTagName("body")[0].appendChild(ss2);
  ss2.onload = function(){
    console.log("disintegrate.js loaded");
  };

  // snap.js
  var ss3 = document.createElement("script");
  ss3.src = "js/snap.js";
  // ss3.type = "text/javascript";
  ss3.class = "snap_script";
  document.getElementsByTagName("body")[0].appendChild(ss3);
  ss3.onload = function(){
    console.log("snap.js loaded");
  };
}

function delete_snap_scripts(){
  $(".snap_script, canvas").remove();
}

function play_snap_audio(){
  var audio = document.getElementById("snap_effect");
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

// data-dis-type="simultaneous" data-dis-particle-type="thanosSnap" data-dis-reduction-factor="20"
// $(function(){  
//   setTimeout(snap_effect,4000);
// });

function snap_effect(){
  
  snap_continue.play();
  
  var items = document.getElementById('homepage').children;
  for(let i = 0; i<items.length;i+=2){
    let e = items[i];
    console.log(e);
    let disObj = disintegrate.getDisObj(e);
    disintegrate.createSimultaneousParticles(disObj);
    e.style.visibility="hidden";
  }
  setTimeout(function(){
    var tar = $('#About').offset().top;
    $("html, body").animate({scrollTop: tar},1000);} ,
    3000);
  setTimeout(snap_bio,4000);
}

function snap_header(){
  var items = document.getElementById("nav-menu").children;
  for(let i = 1; i<items.length;i+=2){
    let e = items[i];
    let disObj = disintegrate.getDisObj(e)
    disintegrate.createSimultaneousParticles(disObj)
    e.style.visibility="hidden"
  }
  setTimeout(function(){
    var tar = $('#jump-to-art').offset().top;
    $("html, body").animate({scrollTop: tar},500);} ,
    3500);
  setTimeout(snap_art,4500);
}

function snap_bio(){
  var items = document.getElementById('poem').children;
  let e = document.getElementById('bioTitle')
  let disObj = disintegrate.getDisObj(e);
  disintegrate.createSimultaneousParticles(disObj);
  e.style.visibility="hidden";
  for(let i = 1; i<items.length;i+=2){
    e = items[i];
    disObj = disintegrate.getDisObj(e);
    disintegrate.createSimultaneousParticles(disObj);
    e.style.visibility="hidden";
  }
  setTimeout(function(){
    var tar = $('#Projects').offset().top;
    $("html, body").animate({scrollTop: tar},1000);} ,
    4000);
  setTimeout(snap_project,5500);
  
  
}

function snap_project(){
  let e = document.getElementById('project_text');
  let disObj = disintegrate.getDisObj(e);
  disintegrate.createSimultaneousParticles(disObj);
  e.style.visibility="hidden";
  setTimeout(snap_header,4000);
  
}

function snap_art(){
  let e = document.getElementById('art-welcome');
  let disObj = disintegrate.getDisObj(e);
  disintegrate.createSimultaneousParticles(disObj);
  e.style.visibility="hidden";
  e = document.getElementById('art-text');
  disObj = disintegrate.getDisObj(e);
  disintegrate.createSimultaneousParticles(disObj);
  e.style.visibility="hidden";
  e = document.getElementById('art-text-2');
  disObj = disintegrate.getDisObj(e);
  disintegrate.createSimultaneousParticles(disObj);
  e.style.visibility="hidden";
  setTimeout(function(){
    var tar = $('#jump-to-art').offset().top;
    $("html, body").animate({scrollTop: tar},1000); },2000);

}

function initiate_disintegrate(){
  disintegrate.init()
  const thanosSnap = function() {
    this.name = 'ThanosSnap'
    this.animationDuration = 3000
    this.size = 3
    this.speedX = Math.random()
    this.speedY = Math.random() * -1
    this.first = true
    this.draw = (ctx, percentComplete) => {
      if (this.first) {
        this.startX += (Math.random() - 0.5) * 10
        this.startY += (Math.random() - 0.5) * 10
        this.first = false
      }
      ctx.beginPath()
      ctx.fillRect(this.startX - this.size / 2, this.startY - this.size / 2, this.size, this.size)
      const r = this.rgbArray[0]
      const g = this.rgbArray[1]
      const b = this.rgbArray[2]
      const a = 1 - percentComplete
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
      ctx.fill()
      this.speedX *= 1.07
      this.speedY *= 1.07
      this.size *= 0.95
      this.startX += this.speedX
      this.startY += this.speedY
    }
  }
  disintegrate.addParticleType(thanosSnap)
  disintegrate.init()
  console.log("Snap initiated");
}


// snap effect sequence
$("#snap-icon").click(function(){
  // $('body').css('background-color','white');
  // activate_snap_elements();
  // setTimeout(load_snap_scripts,3000); 
  $('.bio, .open-eye').css('animation-name','none');
  if (!snapped){
    scroll_top();
    initiate_disintegrate();
    setTimeout(play_snap_audio,3500);
    setTimeout(snap, 3000);
    setTimeout(function(){$('#modalSnap').modal('hide');},5700);
    setTimeout(snap_effect,8500);
    snapped = true;
  }
  else{
    scroll_top()
    play_unsnap_audio();
    setTimeout(unsnap,1250);
    // $('[data-dis-type=simultaneous]').css({visibility: visible},2000);
    document.getElementById("home-icon").disabled = true;
    delete_snap_scripts();
  }
  function scroll_top(){
    let tar = $('#homepage').offset().top;
    $("html, body").animate({scrollTop: tar},1000);
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
