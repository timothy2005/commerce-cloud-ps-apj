/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const _ = require('lodash');
const http = require('http');
const connect = require('connect');
const open = require('open');

const serveStatic = require('serve-static');
const serveIndex = require('serve-index');

const hostname = '127.0.0.1';

export interface TestServerOptions {
    base?: string;
    port: number;
    keepalive?: boolean;
    debug?: boolean;
    open?: boolean;
    middleware?: (connect: any, options: TestServerOptions, middleware: any[]) => any[];
}

const defaultOptions: TestServerOptions = {
    base: '.',
    port: 9000,
    keepalive: false,
    debug: false,
    open: false
};

const getOptions = (serverOptions: TestServerOptions): TestServerOptions => {
    return _.defaultsDeep({}, serverOptions, defaultOptions);
};

const getMiddleware = (serverOptions: TestServerOptions) => {
    let middleware = [
        // Middleware to serve static files
        serveStatic(serverOptions.base, {}),

        // Middleware to make directory browsable
        serveIndex(serverOptions.base, {})
    ];

    if (serverOptions.middleware) {
        middleware = serverOptions.middleware(connect, serverOptions, middleware);
    }

    return middleware;
};

export const connectToServer = async (serverOptions: TestServerOptions) => {
    // Validation
    const options = getOptions(serverOptions);
    const middleware = getMiddleware(serverOptions);

    const app = connect();

    middleware.forEach((middlewareFn: any) => {
        app.use(middlewareFn);
    });

    const server = http.createServer(app);

    if (options.keepalive) {
        console.log(
            'Test server is configured with keep alive. Once it is connected it will stay connected.'
        );
    }

    try {
        await server.listen(options.port, hostname).on('listening', () => {
            if (options.open) {
                const target = `http://${hostname}:${options.port}`;
                open(target);
            }

            if (!options.keepalive) {
                // Probably do server.close()
            }
        });
    } catch (err) {
        if (err.code === 'EADDRINUSE') {
            throw new Error(`Port ${options.port} is already in use by another application.`);
        } else {
            throw new Error(err);
        }
    }
};
