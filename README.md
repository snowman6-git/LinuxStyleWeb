# Linux Style Web
### 여러 유틸리티 웹을 하나의 사이트로!
![image](https://github.com/user-attachments/assets/a467b6d3-48d0-4570-bed0-c777cf6325f5)

해당 레포는 백업용이며 유저관리나 DB가 삭제되어있습니다, 또한 코드가 최적화되어있지않습니다.<br>
단순한 아이디어를 실현했다 정도로 보시면 될거같습니다.

[English]<br>
this repo is for backup, so DB and usermanagement is removed, and code is spagetti<br>
see it as an realized idea

그 외 기타 웹 변천사<br>

## CatCloud 1.2<br>
![image](https://github.com/user-attachments/assets/ef728e6d-25f7-43a4-a0a8-a6b74d86b946)
어디서 주운지도 모르는 기본 제공 css로 만든 CatCloud 1.2<br>

js 없이 순수 HTML + Flask 로 이루어진 캣클라우드. 경로도 절대경로라 다른곳으로 이동시 사용불가.<br>
css 또한 배포용을 사용하여 것으로 보기엔 멀쩡하다. <br>
하지만 저때는 지금은 없는 무려 회원가입과 로그인기능이 존재, 동시에 계정 필터까지 있다.<br>
ytcat이 딸려있는데, 이는 차후 S.Gears 에 초석이 된다.<br>

## SiaCat.NET<br>
![image](https://github.com/user-attachments/assets/a5c3999b-4061-4c34-93e3-033d137add1d)<br>
이런 저런 과정을 생략하고 정상적으로 서비스 가능한 2세대, 처음으로 JS를 도입, 드래그 앤 드롭을 최초로 적용했다.<br>
css 가 적용된게 놀라운 배치, 다운로드가 불가능하다는 어이없는 사이트였다. 사실상 js를 테스트하고 벤치를 돌리는 사이트<br>
그래도 타이머와 파인더로 올리는 프로그램이 뭔지는 알게 되었다.<br>

## CatCloud 2.5(tis)<br>
![image](https://github.com/user-attachments/assets/5501d93a-783e-4689-900d-f86a0650f7a4)
![image](https://github.com/user-attachments/assets/7ad87b1f-2dfb-4943-9e5e-e80730738ea3)
<br>
기타 여러 리퀘스트나 의심스러운 시도로 비밀번호와 새로운 라우팅이 도입된 버전, 업로드가 자동으로 이루어졌으나,<br>
청크단위의 전송을 구현하지 못해 다운로드를 받는다면 백앤드에서 주는 100기가를 무작정 브라우저에서 감당하게하여 터지곤했다<br>
프로그래스바도 도입된 나름 발전한 버젼이다, 여담으로 버젼 표기가 2.0, 3.0 오락가락했다<br>

## CatCloud 2.9<br>
![image](https://github.com/user-attachments/assets/9fc82cd5-f0d1-48e1-99e6-45fafec7d354)<br>
2.5의 문제가 해결된 핫픽스 버전, 단순한 표기가 아니라 js로 요소를 디스플레이하여 여러기능이 추가되었었다.<br>

## CatCloud 3.0<br>
![image](https://github.com/user-attachments/assets/afcf51ad-71c3-4fbf-9483-e4b704ed2686)<br>
스팀과 구글 드라이브에서 영향을 받았던 클라우드, 지금보면 공포의 디자인이지만,<br> 
당시 설계된 여러 js 기능들을 현재까지 보완후 사용하는거 보면 역작이었다.<br>
display: flex; 에 대한 완벽한 이해가 이루어지던 시점.<br>

## Cloud.Cat<br>
![image](https://github.com/user-attachments/assets/afa97cd6-0c56-42b5-a8f7-c958ecd3dbc3)<br>
이유는 잘 모르겠지만 거꾸로하는게 이름이 더 예뻐보였는지 수정한 버전, 최초로 애니메이션 도입, 호버 이펙트, 파일별 메뉴 등등이 있지만 안이뻐서 또 갈아엎었다.<br>
