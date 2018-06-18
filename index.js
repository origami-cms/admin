const express = require('express');
const path = require('path');
const {Route} = require('origami-core-server');



module.exports = (server, options) => {
    server.static(path.resolve(__dirname, './build'), '/admin');
    const r = new Route('/admin/*')
        .position('post-render')
        .use(async (req, res, next) => {
            const body = res.body || res.text || res.data || res.responseCode;
            if (!res.headersSent && !body) res.sendFile(path.resolve(__dirname, 'build/index.html'));
            else next();
        });

    server.useRouter(r);
};
