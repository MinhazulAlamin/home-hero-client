import daisyui from 'daisyui';

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#1E88E5',
          secondary: '#FF7043',
          accent: '#F5F5F5',
          neutral: '#212121',
          'base-100': '#FFFFFF',
          info: '#0288D1',
          success: '#43A047',
          warning: '#FBC02D',
          error: '#E53935',
        },
      },
      {
        dark: {
          primary: '#BB86FC',
          secondary: '#03DAC6',
          accent: '#2C2C2C',
          neutral: '#E0E0E0',
          'base-100': '#121212',
          info: '#81D4FA',
          success: '#66BB6A',
          warning: '#FFD54F',
          error: '#EF5350',
        },
      },
    ],
    darkTheme: 'dark',
  },
};