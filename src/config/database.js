require('dotenv/config')

module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: 'github',
    define: {
        underscored: true,
        timestamps: false
    }
}