export enum AppRoutes {
  // Root Level
  AUTH = 'Auth',
  MAIN = 'Main',

  // Main Stack
  TABS = 'Tabs', // New route for TabNavigator
  NON_TAB_SCREEN = 'NonTabScreen',
  MODAL_SCREEN = 'ModalScreen',

  // Auth Stack
  SIGN_UP = 'SignUp',

  // Tab Screens
  HOME = 'Home',
  HOME_DETAIL = 'HomeDetail',
  CAMERA = 'Camera',
  GALLERY = 'Gallery',
  PROFILE = 'Profile',
  PROFILE_EDIT = 'ProfileEdit',
  SETTINGS = 'Settings',
  SETTINGS_DETAIL = 'SettingsDetail',
}

export enum TabRoutes {
  HOME = 'HomeTab',
  PROFILE = 'ProfileTab',
  SETTINGS = 'SettingsTab',
}
