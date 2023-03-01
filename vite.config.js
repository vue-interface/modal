import vue from '@vitejs/plugin-vue';
import { pascalCase } from 'change-case';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { dependencies, name, peerDependencies } from './package.json';

const fileName = name.split('/')[1];

const external = [
    ...(dependencies ? Object.keys(dependencies) : []),
    ...(peerDependencies ? Object.keys(peerDependencies) : [])
];

export default defineConfig({
    build: {
        sourcemap: true,
        lib: {
            entry: path.resolve(__dirname, 'index.ts'),
            name: pascalCase(fileName),
            fileName,
        },
        rollupOptions: {
            external,
            output: {
                globals: external.reduce((carry, dep) => {
                    return Object.assign(carry, {
                        [dep]: pascalCase(dep)
                    });
                }, {}),
            }
        },
        watch: !process.env.NODE_ENV && {
            include: [
                './tailwindcss/**/*.js'
            ]
        }
    },
    plugins: [
        vue(),
        dts()
    ],
});
