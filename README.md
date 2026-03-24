# Low-Cost Colorimeter

> Status: Completed ✅ <br>
> Version: 0.0.1

---

## 📝 Index

* [About the Project](#-about-the-project)
* [🎯 Next Steps](#-next-steps)
* [🛠️ Technologies and Components](#️-technologies-and-components)
* [🚀 Getting Started](#-getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [👥 Authors and Advisors](#-authors-and-advisors)
* [📧 Contact](#-contact)

---

## 📖 About the Project

This project proposes the construction of a low-cost LED-TCS colorimeter for absorption spectrophotometry experiments with educational purposes, aimed at simplified, context-based learning activities.

The system will be integrated with a mobile application responsible for processing the obtained data and performing actions based on it, such as measuring concentrations and investigating possible chemical reactions between the analyzed elements.

The expected outcome is a more affordable device, making it accessible to a wider audience, while facilitating the understanding of spectrophotometry concepts and promoting better education, aligned with the United Nations Sustainable Development Goals.

---

## 🎯 Next Steps

- [ ] Development of the calibration curve.
- [ ] Performing calibration tests.

---

## 🛠️ Technologies and Components

The project will involve the following tools, technologies, and components:

* **Hardware:**
    * Arduino Uno
    * TCS230 color sensor
    * 5 mm white LED
* **Software (Mobile App):**
    * React Native
    * JavaScript
    * `react-native-dotenv` for environment variables
    * Visual Studio Code (Development Environment)
* **Services and Tools:**
    * **Google Firebase** (Authentication and Firestore)
    * **EAS Build** (Expo Application Services)
    * **[Boxes.py](https://boxes.hackerspace-bamberg.de/boxes.py)** for designing the enclosure (housing the circuit)

---

## 🚀 Getting Started

Instructions on how to set up and run the project in a local environment.

### Prerequisites

* **For the Mobile App:**
    * Node.js and yarn
    * Expo CLI
    * Android Studio (for emulation) or an Android device
    * A [Google Firebase](https://firebase.google.com/) account to obtain configuration keys
    * [EAS CLI](https://expo.dev/eas) installed globally and logged in:

        ```sh
        yarn install -g eas-cli
        eas login
        ```

* **For the Hardware:**
    * Arduino IDE

### Installation

Step-by-step guide to configure the environment.

1. **Hardware:**
    * CIRCUIT DESCRIPTION

2. **Software (App):**
    * Clone the repository:

        ```sh
        git clone https://gitlab.com/coegi1/colorimetro-de-baixo-custo.git
        ```

    * Navigate to the app folder:

        ```sh
        cd Colorimetria
        ```

    * Initialize and configure EAS in the project:

        ```sh
        eas project:init
        ```

    * **Configure Firebase:**
        * Open the [Firebase Console](https://console.firebase.google.com/) and create a project.
        * Within the Firebase project, create a new Android app.
        * Follow all the steps indicated on the website to create the app.
        * Download the `google-services.json` file from the Firebase console.
        * Place this file in the `colorimetro-de-baixo-custo/Colorimetria/` folder of the React Native project.
        * **Create the `.env` file:**
            This project uses a `.env` file to securely load Firebase credentials. Copy the example file:

            ```sh
            cp .env.example .env
            ```

            **or**

            ```sh
            copy .env.example .env
            ```

            **IMPORTANT:** The `.env` file must never be pushed to the repository. Make sure it is listed in `.gitignore`.

        * **Fill in Firebase keys:**
            Open the newly created `.env` file and fill it with your Firebase project information.
            
            1. Go to your project in the [Firebase Console](https://console.firebase.google.com/).
            2. Click the gear icon (Project Settings).
            3. In the "General" tab, go to "Your apps".
            4. Choose "SDK Configuration" to view the keys.
            5. Fill in the following variables in your `.env` with the corresponding values:

                ```env
                EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
                EXPO_PUBLIC_FIREBASE_PROJECT_ID="your-project"
                EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.firebasestorage.app"
                EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="1234567890"
                EXPO_PUBLIC_FIREBASE_APP_ID="1:1234567890:android:abcdef123456"
                EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID="A-12345BCDEF"
                EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB="your-web-id.apps.googleusercontent.com"
                EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID="your-android-id.apps.googleusercontent.com"
                ```

        * **Obtain the Google Cloud API key (API_KEY):**
            The `API_KEY` is obtained from the Google Cloud Console.

            1. **Access the [Google Cloud Console](https://console.cloud.google.com/apis/credentials)** and select the corresponding Firebase project.
            2. Navigate to **APIs & Services > Credentials**.
            3. Find the key named **"Android key (auto created by Firebase)"**.
            4. Click the copy icon next to the key to copy it.
            5. Paste the key into your `.env` file:

                ```env
                EXPO_PUBLIC_FIREBASE_API_KEY="your-api-key"
                ```

        * **Obtain the SHA-1 key using EAS Credentials:**

            * Run the following command in the project root:

                ```sh
                eas credentials
                ```

            * Follow the instructions: select **Android**, then the build credential you use.
            * The CLI will display your credential details, including the **"SHA-1 Fingerprint"**. Copy this value.

            * Add the SHA-1 key in Firebase:
                1. Go to your project in the [Firebase Console](https://console.firebase.google.com/).
                2. Click the gear icon (Project Settings).
                3. In the "General" tab, go to "Your apps".
                4. Select your Android app.
                5. Click "Add Fingerprint" and paste the SHA-1 value, then save.

    * Install dependencies:

        ```sh
        yarn install
        ```

    * **Build the app with EAS Build:**

        ```sh
        eas build --profile development --platform android
        ```

        * After the build completes, open [Expo Dev](https://expo.dev/), log in, and open your project.
        * Then, open the initialized project (which will include the Android build) and download the .APK file.

    * Run the app in development mode:

        ```sh
        npx expo start --clear
        ```

---

## 👥 Authors and Advisors

**Developers:**
* André Takeo Miiada Caseiro
* Gabriel Fernandes Matozinhos
* Matheus Tonini dos Santos

**Advisors:**
* Márcio André Miranda (Advisor)
* Thalita Biazzuz Veronese (Co-Advisor)

---

## 📧 Contact

**André Takeo Miiada Caseiro** - [andre.miiada@gmail.com](mailto:andre.miiada@gmail.com)

Project Link: [https://gitlab.com/coegi1/colorimetro-de-baixo-custo](https://gitlab.com/coegi1/colorimetro-de-baixo-custo)