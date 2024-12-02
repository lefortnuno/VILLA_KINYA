cd D:\ALL\VILLA_KINYA

git add .gitignore
git add *

set /p commitMessage="Titre du commit : "

git commit -m "%commitMessage%"
git push origin main
@REM pause