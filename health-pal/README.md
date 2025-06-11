# Practice - Doctor appointment application using React Native with expo

## 1. Overview

- The Doctor Appointment App is a mobile application built using React Native with Expo. It provides users with a convenient way to book, manage, and track their medical appointments. The app allows users to browse available doctors, view their specialties and availability, and schedule appointments based on their needs.

<img src="https://res.cloudinary.com/dn5vw6fjp/image/upload/v1748312919/Cover_y6uug0.png" alt="Doctor Appointment" width="800" />

## 2. Tech stack

- React
- Framework: React Native
- Expo: Expo SDK
- State Management: Zustand
- Navigation: React Navigation
- Testing: Jest, React Testing Library
- Linting & Formatting: ESLint, Prettier, Husky

## 3. Target

- Handle platform differences between Android
- Unit test coverage should be greater than 80%
- Configure the app icon and splash screen to match the Expo app.
- Must have a Login screen
- Must have a Home screen with a list greater than 100 items
- Must have a profile screen, the user can change the avatar using the Camera and Image Picker

## 4. Requirements

- **The application consists of four main screens following to this [design](https://www.figma.com/design/gvET8CMW66RccB7petorrb/Doctor-Appointment-App?node-id=2-3&m=dev)**

- **Features scope:**

  - Authentication
    - Sign In: email and password
    - Sign Up
    - Log Out
  - User Profile
    - Profile setup
    - Edit personal information
  - Home Dashboard
  - Doctor Search & Listing
    - Search by doctor name
    - Filters:
      - Specialization
  - Doctor Profile
  - Appointment Booking
  - My Bookings
    - Upcoming Bookings
    - View appointment details
    - Cancel or reschedule
    - Completed bookings
    - Canceled bookings

## 5. Prerequisites

**_Before you begin, ensure you have the following installed:_**

- **System Requirements:**

  - Node.js (>= 20.x)
  - Expo CLI (>= 7.x) → Install globally with:

    > ```bash
    > npm install -g expo-cli
    > ```

  - Android Studio (for Android Emulator)
  - Expo Go (For Testing on Physical Devices)

- **Install Expo Go on your phone:**
  - Android (Play Store)

## 6. Installation

**Clone repository**:

> ```bash
> git clone git@gitlab.asoft-python.com:du.nguyen/react-native-training.git
> ```

**Check out the branch**:

> ```bash
> git checkout feat/doctor-appointment
> ```

> ```bash
> cd health-pal
> ```

**Install package dependencies**:

> ```bash
> yarn install
> ```

### Setup Environment Variables

- Create a .env file and add the following keys:

> ```bash
> EXPO_PUBLIC_APP_TOKEN=token
> EXPO_PUBLIC_API_ENDPOINT=http://localhost:3000
> ```

### Run application with Expo Go

> ```bash
> npx expo start
> ```

### Run application with Development build

- Prebuild

> ```bash
> yarn prebuild:a
> ```

- Run

> ```bash
> yarn android
> ```

## 7. Project Structure

> ```text
> /health-pal
> │── .husky/ # Git Hooks
> │── assets/ # Images, Icons
> |── .storybook/
> |── android/
> │── src/
> │ │── components/ # Reusable UI Components
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

### To run tests, use

> ```bash
> yarn test
> ```

## 9. Author

- Du Nguyen (Slack: [du.nguyen](du.nguyen))
