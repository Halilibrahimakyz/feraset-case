# Feraset Case Study - Mobile Application

This is a mobile application developed for Feraset case study using React Native Expo. The application simulates an AI Logo & Art Generator with two main screens: Input and Output.

## Demo Video

[![Demo Video](https://github.com/Halilibrahimakyz/feraset-case/blob/main/Simulator%20Screen%20Recording%20-%20iPhone%2016%20Pro%20Max%20-%202025-04-15%20at%2019.37.42.mp4)](https://github.com/Halilibrahimakyz/feraset-case/blob/main/Simulator%20Screen%20Recording%20-%20iPhone%2016%20Pro%20Max%20-%202025-04-15%20at%2019.37.42.mp4) 

## Features

- Input Screen (/app/(stack)/index.tsx): User can enter required information
- Output Screen (/app/(stack)/logo/[id].tsx): Displays generated (mock) results
- Status Indicator (Chip) showing processing state
- Random processing duration between 30-60 seconds

## Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd feraset-case
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npx expo start
```

4. Run on your preferred platform:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your physical device

## Project Structure

- `/app` - Main application screens and navigation
  - `/(stack)` - Contains main application pages
- `/components` - Reusable UI components
- `/constants` - App-wide constants and configurations
- `/hooks` - Custom React hooks
- `/src` - Additional source files
- `/assets` - Images and other static assets
