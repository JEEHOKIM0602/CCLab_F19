let x = 0;

function change(){
  x+=10;

  let b =document.getElementById('box');
  console.log(b);
  b.innerHTML="wow"
  b.style.width = "200px";
  b.style.left =x + "px";
  b.style.backgroundColor= "red";
}
