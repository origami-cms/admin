const express = require('express');
const path = require('path');
const router = new express.Router();

module.exports = () => {
    router.use(express.static(path.resolve(__dirname, 'build')));
    router.use('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build/index.html'));
    });

    return router;
};
