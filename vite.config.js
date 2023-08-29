import path from 'path';
import fs from 'fs';
// vite.config.js

export default {
    css: {
        preprocessorOptions: {
          scss: {
            // additionalData: `@import "./assets/css/styles.scss";`, // You can include any global SCSS files here
          },
        },
      },
    build: {
        rollupOptions: {
            input: getEntryPoints('assets/scripts'),
            output: {
                entryFileNames: `assets/[name].js`,
                chunkFileNames: `assets/[name].js`,
                assetFileNames: `assets/[name].[ext]`
            }
        }
    }
};


function getEntryPoints(directory) {
    const entryPoints = {};
    const files = fs.readdirSync(directory);

    files.forEach(file => {
        if (file.endsWith('.js')) {
            const name = path.basename(file, '.js');
            entryPoints[name] = path.join(directory, file);
        }
    });

    return entryPoints;
}