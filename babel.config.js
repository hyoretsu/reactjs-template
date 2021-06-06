const config = {
 ignore: ['src/__tests__/*', 'src/@types/*'],
 plugins: [
  ['babel-plugin-styled-components', { pure: true }],
 ],
 presets: [
  '@babel/env',
  ['@babel/react', { runtime: 'automatic' }],
  '@babel/typescript',
 ],
};

export default config;
