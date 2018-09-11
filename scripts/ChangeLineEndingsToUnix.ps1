Get-ChildItem src/*.ts -recurse | Select-Object -Unique | foreach { cd $_.DirectoryName; dos2unix *.ts; dos2unix *.html; dos2unix *.scss; }
