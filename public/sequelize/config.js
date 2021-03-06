module.exports = {
    development: {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_DATABASE,
        define: {
            timestamps: true,
            underscored: true,
        },
    },
};
//# sourceMappingURL=config.js.map