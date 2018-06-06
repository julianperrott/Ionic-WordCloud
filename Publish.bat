--keytool -genkey -v -keystore ionic-wordcloud.keystore -alias ionic-wordcloud -keyalg RSA -keysize 2048 -validity 10000
-- #Q

--ionic cordova build --release android
--pause
cd .\platforms\android\app\build\outputs\apk\release\
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ionic-wordcloud.keystore app-release-unsigned.apk ionic-wordcloud
zipalign -v 4 app-release-unsigned.apk ionic-wordcloud.apk
del app-release-unsigned.apk