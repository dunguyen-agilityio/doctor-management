# Practice One - Healthy Food application using React Native

## 1. Overview

- The Healthy Food App is a React Native application that helps users browse and manage their favorite healthy meals. It includes features such as searching, filtering, and favoriting food items.

![Healthy Food App](https://res.cloudinary.com/dn5vw6fjp/image/upload/v1743146355/Cover_jcgiay.png)

## 2. Tech stack

- React
- Framework: React Native
- Expo: Expo SDK
- State Management: Zustand
- Navigation: React Navigation
- Testing: Jest, React Testing Library
- Linting & Formatting: ESLint, Prettier, Husky
- Storybook

## 3. Target

- This practice will build a mobile application using React Native.
- Apply React Navigation for seamless navigation.
- Apply Storybook to test UI components, ensuring a unit test coverage greater than 80%.

## 4. Requirements

- **The application consists of four main screens following to this [design](<https://www.figma.com/file/LLkkEV64nhoR8empRw79Kl/Healthy-Food-App-(Community)?node-id=201%3A144&t=iVpH44LU0tyuYvtG-0>)**

- **Features scope:**

  - Horizontal & vertical food listing infinite scrolling
  - Search & filtering by categories
  - Display Food Detail
  - Favorite management with localstorage (add/remove)

## 5. Prerequisites

**_Before you begin, ensure you have the following installed:_**

- **System Requirements:**

  - Node.js (>= 20.x)
  - npm (>= 10.x)
  - Expo CLI (>= 7.x) → Install globally with:

    > ```
    > npm install -g expo-cli
    > ```

  - Android Studio (for Android Emulator)
  - Expo Go (For Testing on Physical Devices)

- **Install Expo Go on your phone:**
  - Android (Play Store)

## 6. Installation

**Clone repository**:

> ```
> git clone git@gitlab.asoft-python.com:du.nguyen/react-native-training.git
> ```

**Check out the branch**:

> ```
> git checkout practice-one
> ```

> ```
> cd healthy-food
> ```

**Install package dependencies**:

> ```
> npm install
> ```

**Setup Environment Variables**

- Create a .env file and add the following keys:

> ```
> API_ENDPOINT=http://localhost:3000
> ```

**Run application (Expo CLI)**

> ```
> npx expo start
> ```

**_or_**

> ```
> npm run android
> ```

## 7. Project Structure

> ```
> /healthy-food
> │── .husky/ # Git Hooks
> │── assets/ # Images, Icons
> |── .storybook/
> |── android/
> │── src/
> │ │── components/ # Reusable UI Components
> │ │── screens/ # App Screens
> │ │── navigation/ # App Navigation
> │ │── hooks/ # Custom Hooks
> │ │── services/ # API Calls
> │ │── store/ # Zustand
> │ │── utils/ # Helper Functions
> │ │── types/ # TypeScript Types
> │── .gitignore
> │── .prettierrc
> │── .eslint.json
> │── app.config.js # Expo Config
> │── package.json
> │── README.md
> ```

## 8. Running Tests

**To run tests, use**

> ```
> npm run test
> ```

**For Storybook UI Testing**

> ```
> npm run storybook
> ```

## 9. Storybook Guide

**To document UI components, follow these steps:**

- Create a Component.stories.tsx file in src/components/.
- Write stories using the Storybook format.
- Run `npm run storybook` to view your components.

## 10. Development & Debugging

- Expo Debugging Tools
- Use Expo Go app to preview on real devices.
- Debug with React Native Debugger.
- View logs using:

  > ```
  > npx expo start --clear
  > ```

## 11. React Native Performance Monitoring

- **[Flashlight](https://docs.flashlight.dev/)**: Make sure your application is running

![Flashlight](https://framerusercontent.com/images/dIJP6F8IoYtUUpMAGtPcetdQMw.png)

- **[React Native devtools with expo](https://docs.expo.dev/debugging/tools/)**

![React Native devtools with expo](https://docs.expo.dev/static/images/debugging/developer-menu.png)

- **[Profile of Android studio](https://developer.android.com/studio/profile)**

![Profile of Android Studio of Android Studio](https://developer.android.com/static/studio/images/profiler-home.png)

- **[Analyzing Bundles](https://docs.expo.dev/guides/analyzing-bundles/)**

![Analyzing Bundles](https://docs.expo.dev/static/images/atlas/atlas-overview.avif)

## 12. Author

- Du Nguyen (Slack: [du.nguyen](du.nguyen))
