module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Adjust paths based on your project structure
    "./public/index.html",
  ],
  theme: {
    extend: {
      components: {
        'input-field': {
          padding: '0.5rem',
          border: '1px solid #d1d5db',
          borderRadius: '0.375rem',
          '&:focus': {
            outline: 'none',
            ring: '2',
            ringColor: '#3b82f6',
          }
        }
      },
    },
  },
  plugins: [],
};
