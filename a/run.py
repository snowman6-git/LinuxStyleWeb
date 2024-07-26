from time import sleep as sl
import os, shutil, zipfile, datetime, psutil, hashlib, uuid, re, json, shutil
from CatGen_v1 import localinfo, localize, userinfo, Database_add, Database_Find, Doctor_Cat, finder, HashCat
from flask import Flask, request, render_template, send_file, redirect, Response, url_for, jsonify, send_from_directory, session, make_response
from time import time as now
from random import choice as rc
import yt_dlp
app = Flask(__name__)
# app.config['MAX_CONTENT_LENGTH'] = 200 * 1024 * 1024 * 1024
app.secret_key = "aa2"

maked_id = []
profile = ["profile", "wallpaper"]
def check(id): return bool(re.match(r"^[^\\\/:*?\"<>|]+$", id))



@app.route('/pre/<send>', methods = ['POST', 'GET'])
def pre(send):
    return send_from_directory("./pre", send)

@app.route('/windows/<file>', methods = ['POST', 'GET'])
def t(file):
    return render_template(file)

@app.route('/', methods = ['POST', 'GET'])
def main():
    print(request.remote_addr)
    aa2 = request.environ.get("HTTP_X_REAL_IP")
    print(f"meet {aa2}")
    return render_template("login.html")
    #else: return "점검중입니다, 이용에 불편을 드려 죄송빔"

# app.route('/register', methods=('GET', 'POST'))
# def register():
#     print(request.method)
#     if request.method == 'POST':
#         id = request.form["id"]
#         pw = request.form["pw"]

#         if re.match(r"[a-zA-Z0-9]+$", id) and not os.path.exists(f"user/{id}") and not os.path.exists(f"user/{id}/info.json"):
#             os.mkdir(f"user/{id}") #\경로로 상위 폴더 생성 가능
#             os.mkdir(f"user/{id}/Files")
#             register = {
#                 "user" : id,
#                 "pw" : pw,
#                 "date" : now(),
#                 "code" : 0
#             }
#             wallpaper = rc(os.listdir("./static/wallpaper"))
#             print(wallpaper)
#             with open(f"user/{id}/info.json", 'w') as file: json.dump(register, file, indent=2)
#             shutil.copyfile("./static/ico/unknown.svg", f"user/{id}/profile.svg")
#             shutil.copyfile(f"./static/wallpaper/{wallpaper}", f"user/{id}/wallpaper.jpg")
#             return "OK"
#         else: return ("Fail")
#     else:
#         return render_template("register.html")

@app.route('/login', methods=('GET', 'POST'))
def login():
    if request.method == 'POST':
        try:
            id = request.form["id"]
            pw = request.form["pw"]
            print(f"login with {id} {pw}")
            if os.path.exists(f"user/{id}"):
                with open(f"user/{id}/info.json", 'r') as file: data = json.load(file)
                if data['pw'] == pw:
                    session['user'] = id
                    return redirect(url_for('storage'))
                else:
                    return ("Fail")
            else: 
                return ("Fail")
        except:
            pass

@app.route('/logout', methods=('GET', 'POST'))
def logout():
    print(request.method)
    if request.method == "GET":
        user = session.get('user')
        print("user hah logout! :" + user)
        try:
            session.clear()
            return "OK"
        except Exception as E:
            print(E)
    else:
        return render_template("no.html")
    
@app.route('/home', methods = ['POST', 'GET'])
def storage():
    user = session.get('user')
    if not user == None:
        print(user + "has join")
        return render_template("home.html", id=user)
    else:
        return render_template("no.html")
    
@app.route("/preview", methods = ['POST', 'GET'])
def preview():
    id = session.get('user')
    if check(id): return send_file(f"user/{id}/Files/{request.form['weneed']}")

@app.route("/profile/<user>", methods = ['POST', 'GET'])
def image(user):
    print(user)
    if request.method == 'POST':
        if check(user):
            send = request.form['weneed'].split(".")[0]
            if user == "my-session":
                user = session.get('user')
            if send in profile:
                print(f"they call: {send}")
                loot = f"user/{user}/"
                dlc = os.listdir(loot)
                filtered_elements = [element for element in dlc if element.split('.')[0] == send][0]
                print(f"so we return {filtered_elements} in {loot}")
                return send_from_directory(loot, filtered_elements)

@app.route("/download/<file>")
def generate(file):
    id = session.get('user')
    if check(id):
        loot = f"user/{id}/Files/{file}"
        def generate():
            with open(f"{loot}", "rb") as f:
                while True:
                    data = f.read(40 * 1024 ** 2)
                    if not data:
                        break
                    yield data
        response = Response(generate(), content_type="application/octet-stream")
        response.headers = {
            "Content-Length": os.path.getsize(loot)
        }
        return response

@app.route('/apps', methods = ['POST', 'GET'])
def apps():
    data = []
    icos = "./static/ico/"
    if request.method == 'POST':
        apps = ["aa2", "YtCat", "Cloud", "Settings", "Lock", "wallpaper"]
        apps_ico = [f"{icos}drive.svg", "./static/ico/Cat_Logo.svg", "https://www.svgrepo.com/download/532033/cloud.svg", "https://www.svgrepo.com/download/471991/tool-01.svg", f"{icos}lock.svg", f"{icos}wallpaper.svg"]
        for i in range(len(apps)):
            Datablock = {
                "appname": apps[i],
                "appicon": apps_ico[i],
            }
            data.append(Datablock)
    return jsonify(data)

@app.route("/action", methods=['POST'])
def action():
    id = session.get('user')
    action = request.form['action']
    filename = request.form['filename']

    print(f"유저: {id} 액션: {action} 파일: {filename}")
    if check(id) and check(filename):
        loot = f"user/{id}/Files/"
        try:
            if action == "del":
                os.remove(loot + filename)
            return "A"
        except: return "ER"

@app.route('/upload', methods=['POST'])
def upload():
    if request.method == 'POST':
        id = session.get('user')
        print(request.form)
        chunk = request.files['chunk']
        file_name = request.form['fileName']
        file_for = request.form['type']
        if check(id) and check(file_name):
            loot = f"user/{id}/Files/"#smyh에 있는 원링크 다이렉트 센더로 교체하기
            if file_for == "profile":
                for dlc in os.listdir(f"user/{id}"):
                    if dlc.split(".")[0] == "profile": os.remove(f"user/{id}/{dlc}")
                file = file_name.split(".")[-1]
                with open(f"user/{id}/profile.{file}", 'ab') as f:
                    chunk.save(f)
                return "OK"
            if file_for == "wallpaper":
                for dlc in os.listdir(f"user/{id}"):
                    if dlc.split(".")[0] == "wallpaper": os.remove(f"user/{id}/{dlc}")
                file = file_name.split(".")[-1]
                with open(f"user/{id}/wallpaper.{file}", 'ab') as f:
                    chunk.save(f)
                return "OK"
            else:
                upload = f"{loot}{file_name}"
                print(upload)
                try:
                    if os.path.exists(upload):
                        for copy in range(99999):
                            if os.path.exists(upload) and str(request.form['size']) == str(os.path.getsize(upload)):
                                upload = f"{loot}{file_name.split('.')[0]} - copy({copy}).{file_name.split('.')[-1]}"
                                print(upload)
                            else: break
                except FileNotFoundError: pass
                except Exception as E: print(E)
                with open(upload, 'ab') as f: chunk.save(f)
                return 'Done'
        else:
            print(f"악의적 접근을 막음: {file_name}")
            return "in your dreams~"

@app.route('/add', methods = ['POST'])
def add():
    if request.method == "POST":
        id = session.get('user')
        loot = f"user/{id}/Files/"
        url = request.form["url"]
        ydl = yt_dlp.YoutubeDL()
        info = (ydl.extract_info(url, download=False))
        songname = re.sub(r"[\\\/:*?\"<>|]", '', str(info['title']))  # 알파벳만 남기기
        print(str(info['title']))
        if not int(info['duration']) > 600:
            ydl_opts = {
                'quiet': True,
                'no_warnings': True,
                # 'writethumbnail': True,
                # 'convert_thumbnails': 'png',
                'format': 'bestaudio/best',
                'postprocessors': [{
                    'key': 'FFmpegExtractAudio',
                    'preferredcodec': 'mp3',
                }],
                'verbose': True,
                # 'outtmpl': './Files/%(title)s.%(ext)s',
                'outtmpl': f"{loot}/{songname}",
            }
            with yt_dlp.YoutubeDL(ydl_opts) as ydl: 
                ydl.download([url])
                return f"{songname}.mp3"


@app.route('/download/<filename>', methods = ['POST', 'GET'])
def download(filename):
    def generate():
        id = session.get('user')
        if check(id) and check(file_name):
            loot = f"user/{id}/Files/"
            with open(loot, "rb") as f:
                while True:
                    data = f.read(40 * 1024 ** 2)
                    if not data:
                        break
                    yield data
            response = Response(generate(), content_type="application/octet-stream")
            response.headers = {
            "Content-Disposition": f"attachment; filename={os.path.basename(loot)}",
            "Content-Length": os.path.getsize(loot)
            }
            return response#, os.remove(loot)

@app.route("/preshared/<name>")
def preshared(name):
    if check(name):
        loot = f"shared/{name}"
        def generate():
            with open(f"{loot}", "rb") as f:
                while True:
                    data = f.read(40 * 1024 ** 2)
                    if not data:
                        break
                    yield data
        response = Response(generate(), content_type="application/octet-stream")
        response.headers = {
            "Content-Length": os.path.getsize(loot)
        }
        return response

@app.route('/tree', methods = ['POST', 'GET'])
def tree():
    data = []
    if request.method == 'POST':
        id = session.get('user')

        if check(id):
            loot = f"user/{id}/Files/"
            file_list = os.listdir(loot)
            for i in range(len(file_list)):
                icon = file_list[i].split(".")[-1]
                path = "./static/ico/Format/"
                if os.path.exists(path + f"{icon}.svg"):icon = path + f"{icon}.svg"
                else: icon = path + "folder.svg"

                target_file = loot + file_list[i]
                Datablock = {
                    "fileIcon" : icon,
                    "fileName": file_list[i],
                    "fileDate": datetime.datetime.fromtimestamp(os.path.getmtime(target_file)).strftime("%Y-%m-%d %p %H:%M"),
                    "fileFormat": file_list[i].split(".")[-1],
                    "fileSize": finder(os.path.getsize(target_file)),
                }
                data.append(Datablock)
            # data.append({"fileTree" : f"{id}"})

        return jsonify(data)
if __name__ == '__main__':
    app.run(host="0.0.0.0", port="3160", debug=True)
