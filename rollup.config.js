import fs from 'fs';
import path from 'path';
import minify from 'rollup-plugin-babel-minify';
import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-copy';
import filesize from 'rollup-plugin-filesize';
import gzip from 'rollup-plugin-gzip';
import multiEntry from 'rollup-plugin-multi-entry';
import resolve from 'rollup-plugin-node-resolve';
import notify from 'rollup-plugin-notify';
import progress from 'rollup-plugin-progress';
import replace from 'rollup-plugin-replace';
import sass from 'rollup-plugin-sass';
import sourcemaps from 'rollup-plugin-sourcemaps';
import strip from 'rollup-plugin-strip';
import ts from 'rollup-plugin-typescript2';
import typescript from 'typescript';
import uglifycss from 'uglifycss';


const SRC = path.resolve('./src');
const DIST = path.resolve('./dist');
const isProduction = process.env.NODE_ENV === "production";

// ---------------------------------------------------------- Default build base
export default {
    input: [
        path.resolve(SRC, 'app.ts'),
        path.resolve(SRC, 'styles.ts')
    ],
    output: {
        file: path.resolve(DIST, 'app.js'),
        format: 'iife',
        // sourcemap: true
    },
    plugins: [

        resolve(),
        commonjs(),
        notify(),
        multiEntry(),
        ts({
            typescript,
            useTsconfigDeclarationDir: true
        }),
        sourcemaps(),
        progress(),
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        filesize(),


        copy({
            './src/images': './dist/images',
            './src/app.html': './dist/index.html'
        }),

        sass({
            output(css) {
                if (isProduction) css = uglifycss.processString(css);
                fs.writeFileSync(path.resolve(DIST, 'app.css'), css);
            }
        }),

        ...(isProduction ? [
            strip(),
            minify({
                comments: false
            }),
            gzip()
        ]: [])
    ],
}
