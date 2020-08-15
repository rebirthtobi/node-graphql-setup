require("dotenv").config();

const {
    DEV_DATABASE_NAME, DEV_DATABASE_USER, DEV_DATABASE_PASSWORD,
    DEV_DATABASE_HOST, TEST_DATABASE_NAME, TEST_DATABASE_USER, TEST_DATABASE_PASSWORD,
    TEST_DATABASE_HOST, PROD_DATABASE_NAME, PROD_DATABASE_USER, PROD_DATABASE_PASSWORD,
    PROD_DATABASE_HOST,
} = process.env;

module.exports = {
    development: {
        username: DEV_DATABASE_USER,
        password: DEV_DATABASE_PASSWORD,
        database: DEV_DATABASE_NAME,
        host:     DEV_DATABASE_HOST,
        dialect:  "postgres",
    },
    production: {
        username: PROD_DATABASE_USER,
        password: PROD_DATABASE_PASSWORD,
        database: PROD_DATABASE_NAME,
        host:     PROD_DATABASE_HOST,
        dialect:  "postgres",
    },
    test: {
        username: TEST_DATABASE_USER,
        password: TEST_DATABASE_PASSWORD,
        database: TEST_DATABASE_NAME,
        host:     TEST_DATABASE_HOST,
        dialect:  "postgres",
    },
};
