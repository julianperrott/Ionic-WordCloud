cd f:\github\wc\platforms\android\app\build\outputs\apk\release\
del ionic-wordcloud.apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore keystore.ionic-wordcloud.keystore app-release-unsigned.apk ionic-wordcloud
pause
zipalign -v -f 4 app-release-unsigned.apk ionic-wordcloud.apk
pause
del app-release-unsigned.apk
dir
copy /y ionic-wordcloud.apk "E:\Cloud Drives\OneDrive\"
pause
cd f:\github\wc


--keytool -genkey -v -keystore keystore.ionic-wordcloud.keystore -alias ionic-wordcloud -keyalg RSA -keysize 2048 -validity 10000
-- #Q

--ionic cordova build --release android
--pause