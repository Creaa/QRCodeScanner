# QR Code Scanner Application

This is a **React Native** QR Code Scanner application that allows users to scan QR codes, save them, and display them in a list. The scanned codes are synchronized with a mocked API. If the application does not have internet access, the codes are stored locally using SQLite and wait for reconnection to be synchronized.

## Features

- **Scan QR Codes:** Utilize the device camera to scan QR codes.
- **Save and Display:** Store scanned QR codes and display them in a list.
- **Offline Functionality:** If offline, save QR codes locally using SQLite and synchronize them with the server once the internet connection is restored.

## Technology Stack

- **React Native:** The framework used to build the mobile application.
- **React Vision Camera:** For accessing the device's camera to scan QR codes.
- **React Native Paper:** A UI component library that provides ready-to-use material design components.
- **Jotai:** A state management library used to manage the application's global state.
- **SQLite:** A local database used to store QR codes when the device is offline.

## Getting Started

> **Note**: Ensure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till the "Creating a new application" step, before proceeding.

### Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships with React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start