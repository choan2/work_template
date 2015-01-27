# 넥스브레인 신규 프로젝트 웹퍼블리싱 작업환경 설정

SourceCode/ 에서 작업을 하면 FinishCode/ 으로 산출물이 만들어집니다.

## 폴더구조

```
┌── FinishCode/      (산출물폴더 : 자동생성)
│ ├── /_service
│ │       └─test-html ( html 작업페이지 샘플 )
│ └──/_ui 
│       ├─images ( 컨텐츠 작업 페이지 )
│       ├─ css ( 컨텐츠 작업 페이지 )
│       └─ js ( 컨텐츠 작업 페이지 )
│          ├─ lib (라이브러리 : jquery, jquery mobile, jquery ui 등등 )
│          └─ plugin ( 플러그인 : bootstrap, bxslider 등등등)
│ 
├── SourceCode/    (작업폴더)
│ │
│ ├── grunt (grunt 모듈 생성 파일 )
│ │            
│ ├──html
│ │    ├─ docs ( 컨텐츠 작업 페이지 )
│ │    └─ include ( 문서 내에서 인클루드로 삽입할 페이지)
│ │
│ ├──js (common.js 자동 생성 - 비어있는 상태)
│ │
│ ├──less (css 빌드업 스크립트 / less 파일 ) - style.less
│ │   ├─ common
│ │   ├─ custom
│ │   ├─ tags
│ │   └─ ui
│ └──images (이미지 경로)
│ 
├── bower.json (외부 플러그인 관련 생성)
├── Gruntfile.js (빌드업 환경 작성파일)
├── package.json (프로젝트 설정파일)
└── README.md (참조 문서)

```

## 요구사항 설치
1. 버전관리 : [git설치](http://msysgit.github.io/)
	`설치시 필수 옵션 체크 - Run Git from the Window Command Prompt` 
2. [node.js](http://nodejs.org/)  : [http://nodejs.org/](http://nodejs.org/) 설치파일 다운후 설치
3. [bower](http://bower.io/)    : `윈도우키` ＞ `실행` ＞ `cmd` ＞ `npm install bower -g` (sudo npm install bower -g : Mac )
4. [grunt](http://gruntjs.com/)    : `윈도우키` ＞ `실행` ＞ `cmd` ＞ `npm install grunt-cli -g`
5. nexbrain template    : `윈도우키` ＞ `실행` ＞ `cmd` ＞ `nex_template.sh 생성폴더명`


## 적용하기

c:\project\sample 이라는 프로젝트를 시작할 경우로 설명

1. `윈도우키` ＞ `실행` ＞ `cmd` ＞ 프로젝트 폴더로 이동 `cd c:\project`

2. 해당 폴더에서 `윈도우키` ＞ `실행` ＞ `cmd` ＞ `nex_template.sh sample` 
3. `sample 폴더` : 생성된 Gruntfile.js, bower.json, .package.json 으로 프로젝트 세팅

4. 자동 생성 후 서버의 변화를 계속 감시하는 watch 구문이 실행되어 SourceCode 폴더의 변화가 FinishCode 폴더로 자동 적용된다. 
5. 감시 기능 정지 후 다시 실행은 'grunt serve')
6. `grunt` : 코딩 서버 실행 (종료시 ctrl+C)

본 파일구조 및 셀스크립트 자동화 파일은 대문블로그 님의  http://demun.tistory.com/2443 글을 참조하였습니다.

