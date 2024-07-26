let cloned = 0

function wingen(appname){
    const clone = document.querySelector(".window").cloneNode(true);
    clone.setAttribute("id", `window${cloned}`);
    clone.querySelector(".title").textContent = appname
    document.querySelector(".sector").appendChild(clone);
    setTimeout(function() {clone.classList.add("load")}, 10)
    move(clone.querySelector(".tab"))
    cloned += 1
    return clone
}
function window_close(event){
    event.target.parentNode.parentNode.parentNode.style.cssText = "opacity: 0"; 
    setTimeout(function() {event.target.parentNode.parentNode.parentNode.remove()}, 500)
}