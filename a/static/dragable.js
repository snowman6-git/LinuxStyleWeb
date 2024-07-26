const move = (div) => {
  cl("활성화")
  let isPress = false,
  prevPosX = 0,
  prevPosY = 0;

  div.onmousedown = start;
  div.onmouseup = end;
  document.onmousemove = move; //요소 아이디의 타게팅 떄문에 어쩔수없이 헤드의 부모요소로 지정. 다만 이는 부드럽지 못하니 대책 찾기
  function start(e) {
    div.parentNode.style.transition = "0s";
    prevPosX = e.clientX;
    prevPosY = e.clientY;
    isPress = true;
    div.parentNode.classList.add("now")
    cl(`요소를 지정 대상: ${div.parentNode.id}`)
    document.onmousemove = move
  }
  function move(e) {
    if (!isPress) {return};
    cl(`요소를 움직임 대상: ${div.parentNode.id}`)
    const posX = prevPosX - e.clientX; 
    const posY = prevPosY - e.clientY; 
    prevPosX = e.clientX;
    prevPosY = e.clientY;
    div.parentNode.style.left = (div.parentNode.offsetLeft - posX) + "px";
    div.parentNode.style.top = (div.parentNode.offsetTop - posY) + "px";
  }
  function end() {
    div.parentNode.style.transition = "0.5s";
    isPress = false;
    div.parentNode.classList.remove("now")
    cl(`요소를 놓침 대상: ${div.parentNode.id}`)
    cl(isPress)
  }
}