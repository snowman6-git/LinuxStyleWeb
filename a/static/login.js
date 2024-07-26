function cl(text){console.log(text)}
function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}
document.addEventListener("keydown", (event) => {if (event.key === "Enter") {event.preventDefault(); document.querySelector("#go").click()}})
const ment = document.querySelector(".ment")
const lock = document.querySelector("#go");
const id = document.querySelector("#id");
const pw = document.querySelector("#pw");
async function key(now){
  lock.style.opacity = 0;
  setTimeout(function() {
    lock.style.cssText = `background-image: url("./static/ico/${now}.svg")`
    lock.style.opacity = 0.5;
  }, 500)
}
async function relock(){
  ment.textContent = "Fail"
  document.querySelector(".profile_teduri").classList.add("no")
  document.querySelector(".profile_img").classList.remove("change")
  key("lockER")
  await sleep(3000)
  key("go")
  ment.textContent = "Please insert your id"
  document.querySelector(".profile_img").style.cssText = `background-image: url(./static/ico/unknown.svg)`
  document.querySelector(".profile_teduri").classList.remove("load")
  document.querySelector(".profile_teduri").classList.remove("no")
}
async function login() {
  if (pw.value == "" || id.value == ""){
    ment.textContent = "are you serious?"
    key("what"), relock()
    return ""
  }
  key("loading")
  document.querySelector(".profile_teduri").classList.add("load")
  ment.textContent = "Loading..."
  const weneed = new FormData();
  weneed.append('weneed', "profile");
  await fetch(`/profile/${id.value}`, {
    method: 'POST',
    body: weneed,
    credentials: "include"  
  })
  .then(response => response.blob())
  .then(blob => {
    const url = URL.createObjectURL(blob)
    // document.querySelector(".profile_img").style.cssText = `background-image: url(${url});`
  })
  // await sleep(3000)
  const url = '/login';
  const formData = new FormData();
  formData.append('id', id.value)
  formData.append('pw', CryptoJS.SHA256(pw.value).toString(CryptoJS.enc.Hex));
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
    credentials: "include"
  })
  .then((response) => response.text())
  .then((result) => {
    pw.value == ""

    if (result !== "Fail"){
      document.querySelector(".profile_teduri").classList.add("ok")
      window.location.href = "/home"
    }
    else{relock()}
  })
}