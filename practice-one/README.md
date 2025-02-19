# Practice One - Healthy Food application use React Native

## 1. Overview

- Build an Healthy Food application using React Native.
- Design [Link](<https://www.figma.com/file/LLkkEV64nhoR8empRw79Kl/Healthy-Food-App-(Community)?node-id=201%3A144&t=iVpH44LU0tyuYvtG-0>)
- Estimate [Link](https://docs.google.com/document/d/1Jvl29kde7wCuMfnNveRaB5h_X4srX4RId8C_CJ51KsU/edit#)

## 2. Tech stack

- Framework: React Native 0.77
- Expo: Expo SDK
- State Management: Context API
- Navigation: React Navigation
- Backend: Json-server
- Testing: Jest, React Testing Library
- Linting & Formatting: ESLint, Prettier, Husky
- Storybook

## 3. Target

- This practice will build about React Native
- Apply [React Navigation](https://reactnavigation.org/)
- Apply Storybook to test application, Unit test coverage should greater than 80%

## 4. Requirements

## 6. Prerequisites

**_Before you begin, ensure you have the following installed:_**

- **System Requirements:**

  - Node.js (>= 20.x)
  - npm (>= 11.x)
  - Expo CLI (>= 7.x) → Install globally with:

    > ```
    > npm install -g expo-cli
    > ```

  - React (>= 18.x)
  - React Native (0.76.7)
  - expo (47.0.13)
  - Android Studio (for Android Emulator)
  - Expo Go (For Testing on Physical Devices)

- **Install Expo Go on your phone:**
  - Android (Play Store)

## 5. Installation

**Clone repository**:

> ```
> git clone git@gitlab.asoft-python.com:du.nguyen/react-native-training.git
> ```

**Check out the branch**:

> ```
> git checkout practice-one
> ```

> ```
> cd practice-one
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

## 6. Project Structure

> ```
> /practice-one
> │── .husky/ # Git Hooks
> │── assets/ # Images, Icons
> │── src/
> │ │── components/ # Reusable UI Components
> │ │── screens/ # App Screens
> │ │── navigation/ # App Navigation
> │ │── hooks/ # Custom Hooks
> │ │── services/ # API Calls
> │ │── store/ # Zustand / Redux Store
> │ │── utils/ # Helper Functions
> │ │── types/ # TypeScript Types
> │── .gitignore
> │── .prettierrc
> │── .eslint.json
> │── app.json # Expo Config
> │── package.json
> │── README.md
> ```

## 7. Running Tests

**To run tests, use**

> ```
> npm run test
> ```

**For Storybook UI Testing**

> ```
> npm run storybook
> ```

## 8. Storybook Guide

**To document UI components, follow these steps:**

- Create a Component.stories.tsx file in src/components/.
- Write stories using the Storybook format.
- Run `npm run storybook` to view your components.

## 9. Documentation

- All project documentation is stored in Google Drive.
  [📂 Healthy Food App Docs](http://localhost:3000)

## 10. Development & Debugging

- Expo Debugging Tools
- Use Expo Go app to preview on real devices.
- Debug with React Native Debugger.
- View logs using:

  > ```
  > npx expo start --clear
  > ```

## 6. Author

- Du Nguyen
