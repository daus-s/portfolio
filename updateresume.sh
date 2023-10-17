cd ~/Documents
cp Resumes/current/CarmichaelResume.pdf portfolio/public
cp Resumes/current/CarmichaelResumePrint.pdf portfolio/public
cd portfolio
git add public/CarmichaelResume.pdf
git add public/CarmichaelResumePrint.pdf
git commit -m "updating resume via updateresume.sh changes made $1"
git push
