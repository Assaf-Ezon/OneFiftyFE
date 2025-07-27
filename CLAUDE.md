# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run web version

### Build Commands
- `eas build --platform android` - Build Android app bundle
- `eas build --platform ios` - Build iOS app
- `eas build --platform all` - Build for both platforms

## Architecture Overview

This is a React Native Expo app for language learning with TypeScript. The app follows a structured component-based architecture with clear separation of concerns.

### Core Navigation Structure
The app uses React Navigation with a multi-stack approach:
- **AuthStack**: Authentication screens (splash, start/login)
- **MainAppStack**: Main application with bottom navigation
- **InactiveStack**: Payment-only stack for inactive users

Stack management is handled by `StackManagerProvider` which controls which stack is active based on user state.

### Key Directory Structure
- `src/screens/` - Main screen components (home, dictionary, learning, etc.)
- `src/components/` - Reusable UI components organized by feature
- `src/context/` - React Context providers for state management
- `src/data_objects/` - TypeScript interfaces, enums, and data structures
- `src/requests/` - API request handlers and error handling
- `src/find_words/` - Word selection and enrichment logic for games
- `src/game_component_logic/` - Game-specific logic and hooks

### State Management
Uses React Context extensively with provider patterns:
- `ProfileProvider` - User profile and authentication state
- `WordsProvider` - Word data and dictionary state
- `StackManagerProvider` - Navigation stack management
- `LearningSettingsProvider` - Learning game settings

### Game Architecture
The app includes multiple language learning games:
- **KDK (Knew/Didn't Know)**: Binary knowledge assessment
- **MC (Multiple Choice)**: Multiple choice questions
- Word selection uses pluggable enrichers and selectors in `src/find_words/`

### Component Organization
Components follow a pattern of paired .tsx/.tsx files for component and styles:
- Each component has its own directory with implementation and styles
- Shared components are in feature-based directories
- Screen-specific components are co-located with their screens

### Data Flow
- API requests handled through centralized request handlers
- Error handling abstracted through request error components
- Word data flows through context providers to game components
- User statistics and progress tracked through dedicated handlers

## Key Technologies
- React Native with Expo SDK 53
- TypeScript for type safety
- React Navigation for navigation
- Expo IAP for in-app purchases
- Axios for API requests
- React Native Reanimated for animations