args=("$@")


# clone repo
git clone https://github.com/choan2/work_template/ ${args[0]}


# 폴더로 이동
cd ${args[0]}


# 필요없는 폴더, 파일 삭제
rm -rf .git
rm -rf README.md


#npm install
npm install

#bower install
bower install

# grunt
grunt serve
