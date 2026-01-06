import app from '../../node-server/src/app.js';
import serverless from 'serverless-http';
import { mongoConnect } from '../../node-server/src/db/mongo/db_connect.js';

let isDbInitialized = false;
let initPromise = null;

async function initDb() {
    if (isDbInitialized) {
        console.log('✅ Using cached DB connection');
        return;
    }

    if (initPromise) {
        console.log('⏳ Waiting for existing DB initialization...');
        return initPromise;
    }

    initPromise = (async () => {
        const startTime = Date.now();

        try {
            console.log('🔄 Starting database initialization...');

            await mongoConnect();

            const duration = Date.now() - startTime;
            console.log(`✅ Database initialized in ${duration}ms`);

            isDbInitialized = true;
        } catch (error) {
            const duration = Date.now() - startTime;
            console.error(`❌ Database initialization failed after ${duration}ms:`, error.message);

            initPromise = null;
            throw error;
        }
    })();

    return initPromise;
}

export default async function handler(req, res) {
    const requestStartTime = Date.now();

    console.log(`📥 Incoming ${req.method} request to ${req.url}`);

    try {
        await initDb();

        const initDuration = Date.now() - requestStartTime;
        console.log(`⏱️  DB initialization took ${initDuration}ms`);

        return serverless(app)(req, res);
    } catch (error) {
        const totalDuration = Date.now() - requestStartTime;
        console.error(`❌ Handler error after ${totalDuration}ms:`, error);

        if (error.message.includes('timeout') || totalDuration > 9000) {
            return res.status(504).json({
                success: false,
                error: 'Gateway Timeout',
                message: 'Request took too long to process',
                duration: totalDuration
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
        });
    }
}