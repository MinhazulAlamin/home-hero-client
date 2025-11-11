import daisyui from 'daisyui';
import themes from 'daisyui/src/colors/themes.js';

export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          ...themes['[data-theme=light]'],
          primary: 'blue',
          secondary: 'teal',
        },
        dark: {
          ...themes['[data-theme=dark]'],
          primary: 'blue',
          secondary: 'teal',
        },
      },
    ],
    darkTheme: 'dark',
  },
};