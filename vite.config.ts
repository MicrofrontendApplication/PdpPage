import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({

  plugins: [
    react(),
    federation({
      name: 'pdppage',
      filename: 'remoteEntry.js',
      exposes: {
        './PdpPage': './src/App.tsx',
      },
      shared: ['react', 'react-dom', 'react-router-dom','react-redux','@reduxjs/toolkit'],
    }),
  ],
     server:{
    cors:true
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    // cssCodeSplit: true,
  }
})