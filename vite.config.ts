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
     shared: {
        react: { singleton: true, eager: true },
        'react-dom': { singleton: true, eager: true },
        'react-router-dom': { singleton: true, eager: true }
      }as any,
    }),
  ],
   
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit:true,
   
  }
})