function cl(text){console.log(text)}
function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}
document.addEventListener("keydown", (event) => {if (event.key === "Enter") {event.preventDefault(); document.querySelector("#go").click()}})
const ment = document.querySelector(".ment")
const lock = document.querySelector("#go");
const id = document.querySelector("#id");
const pw = document.querySelector("#pw");

let anime_load = 1

async function time(){
  while (true){
    let today = new Date();
    document.querySelector(".datetime").textContent = today.toLocaleString()
    await sleep(100)
  }
}
time()

lock.style.cssText = `background-image: url("./static/ico/ok.svg")`

async function refresh(load=["profile", "wallpaper"]){
  load.forEach(async function(call) {
  const formData = new FormData();
  formData.append('weneed', call);
  const response = await fetch("/profile/my-session", {
    method: 'POST',
    body: formData,
    credentials: "include"  
})
.then(response => response.blob())
.then(blob => {
  const url = URL.createObjectURL(blob)
  if (call == "profile"){
    document.querySelector(".profile_img").style.cssText = `background-image: url(${url});`
    document.querySelector(".profile_app").style.cssText = `background-image: url(${url});`
    document.querySelector(".profile_img").classList.add("load")
  }
  if (call == "wallpaper"){
    setTimeout(function() {document.body.style.backgroundImage = `url(${url})`}, 100)
  }
})})}
refresh()
async function wopen(){
  document.querySelector(".cover").classList.add("open")
}
async function wlock(){
  document.querySelector(".cover").classList.remove("open")
}
// wopen()
setTimeout(function() {wopen()}, anime_load)
setTimeout(function() {
  document.querySelector(".bar").classList.add("load")
  document.querySelector(".head").classList.add("load")
  apps()

}, anime_load)

async function apps(){
  const url = "/apps";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify("call"),
  };
  fetch(url, options)
  .then((response) => response.text())
  .then((result) => {
  const apps_info = JSON.parse(result)
  for (let i = 0; i < apps_info.length; i++) {
    const appname = apps_info[i].appname;
    const appico = (apps_info[i].appicon)
    const apps = document.createElement("div");
    const name = document.createElement("div");
    apps.style.cssText = `background-image: url(${appico})`
    name.textContent = appname
    apps.appendChild(name)
    name.classList.add('app_name')
    apps.classList.add('app')
    apps.onclick = () =>  {window_open(appname)}
    document.querySelector(".apps").appendChild(apps)
  }}
)}
function window_open(appname){
  //fetch("/logout"); window.location.href = "/"
  if (appname == "Lock"){wlock()}
  if (appname == "Setting"){



  }
  if (appname == "YtCat"){
    let window = wingen(appname)
    let page = window.querySelector(".page")
    page.style.cssText = "overflow:hidden"
    const iframe = document.createElement('iframe');
    iframe.classList.add("apphtml")
    iframe.src = "./static/windows/ytcat.html"
    page.appendChild(iframe);


  }


  if (appname == "Cloud"){
    let window = wingen(appname)
    
    const status_upload = window.querySelector(".status_upload");
    status_upload.onmouseover = status_open
    status_upload.onmouseleave = status_close

    function status_open(){window.querySelector(".status").classList.add("load")}
    function status_close(){window.querySelector(".status").classList.remove("load")}

    let page = window.querySelector(".page")

    page.addEventListener('drop', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const files = e.dataTransfer.files
      for (let i = 0; i < files.length; i++) {
        upload(files[i], window) //여기에 await를 넣으면 동시전송이 막히고 한개 끝날때까지 존버탐 ㅇㅇ.
        
        // await tree()
      }
    })
    page.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
    tree(window)
    
  }
}
function tree(window){
  let page = window.querySelector(".page")
  
  const url = "/tree";
    const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Add dropzone line to include credentials
    body: JSON.stringify("call"),
  };
  fetch(url, options)
  .then((response) => response.text())
  .then((result) => {

  page.innerHTML = ""

  const files = JSON.parse(result);

  
  for (let i = 0; i < files.length; i++) {
  const fileIcon = (files[i].fileIcon)
  const fileName = files[i].fileName;
  const fileDate = (files[i].fileDate)
  const fileFormat = files[i].fileFormat;
  const fileSize = files[i].fileSize;

  const apps = document.createElement("div");
  const ico = document.createElement("img");
  const name = document.createElement("div")

  const info = document.createElement("div")

  const date = document.createElement("div");
  const format = document.createElement("div");
  const size = document.createElement("div")

  
  apps.addEventListener("contextmenu", function(e) {    
    e.preventDefault(); // 원래 있던 오른쪽 마우스 이벤트를 무효화한다.    
    // document.querySelector("#omenu_name").innerHTML = fileName
    // var x = e.pageX + 'px'; // 현재 마우스의 X좌표    
    // var y = e.pageY + 'px'; // 현재 마우스의 Y좌표    
    // cl(`${x} ${y} ${fileName}`)

    // const oomenu = document.querySelector('.oowclick'); // 팝업창을 담아옴
    // oomenu.style.position = 'fixed'; 
    // oomenu.style.left = x;
    // oomenu.style.top = y;
    // oomenu.style.display = 'block';
  })

  name.classList.add("text");
  ico.classList.add("files_ico");

  ico.onclick = async function() {location.href = "/download/" + fileName}

  var final_name = fileName
  if (final_name.length > 31) {
    final_name = final_name.slice(0, 31) + "..."
  }
  name.textContent = `${final_name}`
  date.textContent = `${fileDate}`
  format.textContent = `${fileFormat}`
  size.textContent = `${fileSize}`
  apps.classList.add("files");

  ico.src = fileIcon

  apps.appendChild(ico)
  apps.appendChild(name)
  info.appendChild(date)
  info.appendChild(format)
  info.appendChild(size)
  info.classList.add("info");
  apps.appendChild(info)
  page.appendChild(apps)
  }})
}

async function upload(file, window) {
  let status_upload = window.querySelector(".status_upload");
  let status = window.querySelector(".status")
  status_upload.classList.add("start")

  const url = '/upload';
  let offset = 0;
  const chunkSize = 5 * 1024 * 1024; // 50 MB chunks
  
  const fileblock = document.createElement("div");
  const name = document.createElement("div")

  const ico = document.createElement("img");
  ico.classList.add("files_ico");
  ico.src = "./static/ico/what.svg"
  fileblock.appendChild(ico)

  name.classList.add("text");
  fileblock.classList.add("files");
  fileblock.appendChild(name)
  status.appendChild(fileblock)
 let fname = file.name
  if (fname.length > 10) {
    fname = fname.slice(0, 10) + "..."
  }
  name.textContent = `${fname}: wating...`
  cl("업로드 파일이 가상화됌")
  
  while (offset < file.size) {
    const start = new Date();
    const chunk = file.slice(offset, offset + chunkSize);
    const formData = new FormData();

    formData.append('chunk', chunk);
    formData.append('size', file.size);
    formData.append('fileName', file.name);
    formData.append('type', "file");
    const response = await fetch(url, { //이건 await 제거하면 좆됌.
      method: 'POST',
      body: formData,
      credentials: "include"
    });
    if (!response.ok) {
      // console.error(`Error uploading chunk: ${await response.text()}`);
      break;
    }
    const elapsedTime = (new Date() - start) / 1000;
    const progress = (offset / file.size) * 100;
    // document.title =  (`Progress: ${progress.toFixed(2)}%, Time: ${elapsedTime.toFixed(2)}s`);
    fileblock.style.cssText = `background-image: linear-gradient(to left, transparent ${100 - progress}%, rgba(0, 0, 0, 1) 0%);`
     // background: linear-gradient(to left, transparent ${100 - progress + 1}%, rgba(255, 255, 255, 0.5) 0%);
      // background-clip: text;
      // -webkit-background-clip: text;
    name.textContent = `${fname}: ${progress.toFixed(2)}%`
    offset += chunkSize;
  }
  fileblock.remove()
  tree(window)
  if (status.children.length === 0){
    status_upload.classList.remove("start")
  }
}

// async function upload(file, page) {
//   let offset = 0;
//   // const chunkSize = 1000//5 * (1024 ** 2);
//   const chunkSize = 32 * 1024 * 1024; // 50 MB chunks
//   const apps = document.createElement("div");
//   const name = document.createElement("div")
//   const ico = document.createElement("img");

//   name.classList.add("text");
//   ico.classList.add("files_ico");
//   apps.classList.add("files");
//   ico.src = "./static/ico/wait.svg"
//   apps.appendChild(ico)
//   apps.appendChild(name)

//   page.appendChild(apps)
//   cl("업로드 파일이 가상화됌")

//   while (offset < file.size) {
//     cl("start")
//     const start = new Date();
//     const chunk = file.slice(offset, offset + chunkSize);
//     cl(chunk, offset)
//     const formData = new FormData();
//     formData.append('chunk', chunk);
//     // formData.append('type', type);
//     formData.append('offset', offset);
//     formData.append('size', file.size);
//     formData.append('fileName', file.name);
//     formData.append('fileDate', file); //out of while when you free
//     cl("setup")
//     const upload = await fetch("/upload", {
//       method: 'POST',
//       body: formData,
//       credentials: "include"
//     })
//     if (!upload.ok) {
//       // console.error(`Error uploading chunk: ${await response.text()}`);
//       break;
//     }
//     else{
//       cl("upload")
//       const elapsedTime = (new Date() - start) / 1000;
//       const progress = (offset / file.size) * 100;
//       name.textContent = `${file.name} ${progress.toFixed(2)}%`
//       document.title =  (`Progress: ${progress.toFixed(2)}%, Time: ${elapsedTime.toFixed(2)}s`);
//       offset += chunkSize;
//     }
//   }
// } 