import { asyncHandler } from "./asyncHandler.js";
import mongoose from "mongoose";
import { mail } from "./mail.js";

const healthMonitor = asyncHandler(async () => {
    // List of required environment variables
    const envVar = ["MONGO_URI", "EMAIL", "PASSWORD", "SECRET_KEY_JWT", "CLOUD_NAME", "API_KEY", "API_SECRET"];
    let missingEnvVars = [];

    // Check if all required environment variables are set
    for (let env of envVar) {
        console.log(`Test for ${env} Passed `)
        if (!process.env[env]) {
            missingEnvVars.push(env);
        }
    }

    // If some environment variables are missing
    if (missingEnvVars.length > 0) {
        console.error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
        return {
            status: 'error',
            message: `Missing environment variables: ${missingEnvVars.join(', ')}`
        };
    }

    // Test MongoDB connection
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connection successful");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        return {
            status: 'error',
            message: 'MongoDB connection failed',
            error: error.message
        };
    }

    // Test SMTP email service using Nodemailer
    try {
        await mail({to : process.env.EMAIL , subject : "Health CheckUp"})
        console.log('Email sent Test Passed');
    } catch (error) {
        console.error("SMTP email service is down:", error.message);
        return {
            status: 'error',
            message: 'SMTP email service is down',
            error: error.message
        };
    }

    // Return success if all checks pass
    console.log(
       'Health check passed. All services are running.'
    );
});

export { healthMonitor };
