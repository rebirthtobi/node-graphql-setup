module.exports = {
    up: queryInterface => queryInterface.bulkInsert("users", [
        {
            first_name:   "Test",
            last_name:    "Test",
            phone_number: "079033833333",
            created_at:   new Date(),
            updated_at:   new Date(),
        },
    ]),

    down: queryInterface => queryInterface.bulkDelete("users", null, {}),
};
