# Welcome to Bill-Me
*The Open Source Billable Call Manager*
## [A TypeScript React-Native App](https://www.typescriptlang.org/)

<p>
  <!-- Android -->
  <img alt="Supports Android" longdesc="Supports Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
</p>

![bill-me-graphic](https://user-images.githubusercontent.com/20073760/161642146-43aa982e-d43f-4459-9c09-a02e303eab65.png)

## Application Journey
This application was built for a nurse who had to report their phone calls. I literally spent hours trying to find an app that could simply record call information. Couldn't find one, so what's a dev to do? I built one - and - now it's time to share it. It's free, and open-source (obviously, since we're here). BUT, I do accept sponserships as a humble thank-you-so-much-this-saved-me-senseless-hours-of-handwriting-notes (sponsor button up above).

#### Intent
Bill Me is an open-source app designed to help you take notes and keep track of your device's phone call records with your clients. If you need to track your business phone calls on your mobile device for the purpose of billing or exporting a record of those calls later, this app was built for you.

All the application data is stored locally. The app never transmits this information over any networks or share it with the world wide web. However, you may export a client bill (which is simply a collection of client call records). An exported CSV bill may be found in your local downloads folder after you request an export.

Since all application data is stored local to your device, if your device is lost or damaged, your app data cannot be retrieved.

This app does encrypt its application data. However, no encryption implementation is perfect or foolproof. If the data you intend to input must be encrypted, have your software security professional review this app's implementation to ensure it meets your organizational or personal standards.

This app will request permission to access your contacts, but it is not critical to the app's function. It's a convenience feature that will replace phone numbers where they appear with the first and last name of the contact of the same number.

#### Okay, How Do I Get It?

##### Method 1
1. Purchase it on Google Play: 
##### Method 2
1. Download the APK here: https://github.com/staujd02/billable-call-bucket/blob/main/android/app/release/app-release.apk
2. Side-load it
##### Method 3
1. Download the source code
2. Build & Sign it
4. Side-load your own APK

#### Wait a Minute, Aren't you a developer?
I know that it's annoying to manually enter the call log information. If a developer wants to publish an app with those kinds of permission (specifically READ_CALL_LOG), you have to pretty special and important, which I am neither. There is a working verion of the app that reads call logs and automatically imports them into a list for ease of recording. That version should be tagged `best-version`, but I have no intent of backfilling new features, so you'll have to fork, maintain, and build that version youself :/.

#### Limitations
- All information is locally stored (no cloud backups)
- Currently works on Android only
- Waiting for some desperate iOS dev to finish off the fruit machine implementation

#### Screenshots for the Curious
![shot9](https://user-images.githubusercontent.com/20073760/161645992-7da7e278-5c71-46da-bfdf-f935b2c31761.png)
![shot7](https://user-images.githubusercontent.com/20073760/161646127-fd2262d7-e419-4385-aaef-1b960ce04880.png)
![shot1](https://user-images.githubusercontent.com/20073760/161645946-72ae2230-6956-4a22-b612-03163b911610.jpg)
![shot2](https://user-images.githubusercontent.com/20073760/161645965-3359e388-d5ca-4e83-83ac-2c54a14c128f.jpg)




