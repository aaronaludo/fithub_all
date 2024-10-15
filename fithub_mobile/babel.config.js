module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',  // This is necessary for Expo projects
      '@babel/preset-react' // Add this line for React support
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            config: './src/config', // Optional: Add aliases as needed
          },
        },
      ],
    ],
  };
};
