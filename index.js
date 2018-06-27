const express = require('express');
const path = require('path');
const {Route} = require('origami-core-lib');

const URI_PREFIX = '/admin'

module.exports = async (server, options) => {
    server.static(path.resolve(__dirname, './build'), URI_PREFIX);
    const r = new Route('/admin/*')
        .position('post-render')
        .use(async (req, res, next) => {
            const body = res.body || res.text || res.data || res.responseCode;
            if (!res.headersSent && !body) res.sendFile(path.resolve(__dirname, 'build/index.html'));
            else next();
        });

    server.useRouter(r);


    const controllers = new Route('*')
    await controllers.include(path.resolve(__dirname, './controllers'));

    server.useRouter(controllers);
};

module.exports.URI_PREFIX = URI_PREFIX;
