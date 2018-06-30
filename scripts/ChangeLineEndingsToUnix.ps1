Get-ChildItem src/*.ts -recurse | foreach { cd $_.DirectoryName; dos2unix *.ts; dos2unix *.html; dos2unix *.scss; }
dos2unix e2e/*.ts;
dos2unix e2e/*.js;
dos2unix test-config/*.js;
dos2unix test-config/*.ts;

