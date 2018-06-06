Get-ChildItem src/*.ts -recurse | foreach { cd $_.DirectoryName; dos2unix *.ts; dos2unix *.html; dos2unix *.scss; cd ..; cd ..; }
