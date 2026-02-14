# scrapapp

npx react-native start
npx react-native start --reset-cache
npx react-native run-android



Build:
cd android 
> gradlew clean  
.\gradlew assembleRelease


# from project root
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force android\.gradle
Remove-Item -Recurse -Force android\app\build

npm install

cd android
./gradlew clean
cd ..

npx react-native run-android
