# Tropical

Tropical is a cross-platform travel-stay discovery app built with Expo and React Native. Its interface uses a calm, tropical visual style to help guests browse stays, save favorites, explore trip details, and message a host.

## Design

- **Figma design file:** [Open Tropical in Figma](https://www.figma.com/design/znOIzNOUWWT0vMNRujhzSv/tropical?node-id=0-1&p=f&t=xo8lQ9EWr1Pq3gpl-0)
- **Figma prototype:** [Open the Tropical prototype](https://www.figma.com/proto/znOIzNOUWWT0vMNRujhzSv/tropical?node-id=0-1)

The Figma file may require access from the owner. If you cannot open it, request view access from the file owner.

## Features

- Explore tropical stays with search and category filters.
- Swipe through multiple photos on each property card.
- Open stay details in a smooth slide-up experience, browse detail photos, and return with the back arrow.
- Save and remove stays from the Wishlist.
- Review upcoming trips and switch between Upcoming, Past, and Saved views.
- Open a host conversation and send messages in the demo inbox.
- Browse a travel profile, preferences, and travel-mode toggle.
- Responsive layouts for Android, iOS, and web, with a desktop grid for wider screens.

## Tech stack

- Expo SDK 58
- React Native 0.88 and React 19
- Expo Router
- TypeScript
- Expo Image and Expo Symbols
- ESLint with the Expo flat configuration

## Requirements

- Node.js compatible with the installed Expo/React Native versions. The workspace dependencies declare Node.js `^22.13.0`, `^24.3.0`, `^26.0.0`, or `>=27.0.0` for Expo SDK 58 and React Native 0.88. Check your installed Node version if Metro reports engine warnings.
- npm (the repository includes `package-lock.json`)
- For a physical Android or iOS device: install a compatible Expo Go version, or use a development build if Expo Go does not support this SDK.

## Getting started

```bash
npm install
npx expo start
```

The Expo CLI shows a QR code and development server URL. To open the app on a physical phone, connect the phone and computer to the same Wi-Fi and scan the QR code with Expo Go. If the network blocks LAN connections, try:

```bash
npx expo start --tunnel
```

Tunnel connections can be slower than LAN. If Expo Go reports that the project requires a newer version, update Expo Go from the device’s app store. If the required Expo Go version is not available for the device, use a development build instead.

### Run on a specific platform

```bash
npm run web
npm run android
npm run ios
```

The Android and iOS commands open the project on a configured emulator/simulator. For a physical device, start the server with `npx expo start` and scan the QR code in Expo Go.

## Quality checks

```bash
npm run lint
npx tsc --noEmit
```

## Project structure

```text
src/
  app/
    _layout.tsx       Root app layout
    app-tabs.tsx      App tab navigation and shared wishlist state
    index.tsx         Explore, stay cards, photo galleries, and detail sheet
    wishlist.tsx      Saved stays
    trips.tsx         Trip overview
    messages.tsx      Inbox and host conversation
    profile.tsx       Travel profile and preferences
  components/         Shared UI components
  constants/          Theme and spacing values
  hooks/              App hooks
assets/               App icons, splash assets, and images
```

## Prototype data and integrations

Stay listings, trip information, and the host conversation are currently sample/demo content. Sending an inbox message updates the local screen state; it does not send a real message. Booking, authentication, host availability, and user-profile changes are not connected to production services yet.

Supabase is included as a project dependency, but this README does not assume that a live Supabase project or credentials are configured.

## License

See [LICENSE](LICENSE).
