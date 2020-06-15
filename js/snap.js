disintegrate.init()

// data-dis-type="simultaneous" data-dis-particle-type="thanosSnap" data-dis-reduction-factor="10"
$(function(){  
  setTimeout(snap_effect,7000);
});

function snap_effect(){
  var items = document.getElementById('homepage').children;
  for(let i = 0; i<items.length;i++){
    let e = items[i];
    console.log(e);
    // e.setAttribute('data-dis-type', "simultaneous");
    // e.setAttribute('data-dis-particle-type', "thanosSnap");
    // e.setAttribute('data-dis-reduction-factor',"20")
    let disObj = disintegrate.getDisObj(e);
    disintegrate.createSimultaneousParticles(disObj);
    e.style.visibility="hidden";
  }
  setTimeout(snap_header,2000);
}

function snap_header(){
  var items = document.getElementById("nav-menu").children;
  for(let i = 1; i<items.length;i+=2){
    let e = items[i];
    let disObj = disintegrate.getDisObj(e)
    disintegrate.createSimultaneousParticles(disObj)
    e.style.visibility="hidden"
  }
  // setTimeout(snap_bg,2000);
}

function snap_bg(){
  var e = document.getElementById("homepage");
    
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