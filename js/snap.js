// disintegrate.init()

// data-dis-type="simultaneous" data-dis-particle-type="thanosSnap" data-dis-reduction-factor="20"
// $(function(){  
//   setTimeout(snap_effect,4000);
// });

function snap_effect(){
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