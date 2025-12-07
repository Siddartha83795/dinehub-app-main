module.exports = {
    apps: [{
        name: "dinehub",
        script: "npm",
        args: "start",
        instances: 1,
        exec_mode: "fork",
        env_dev: {
            NODE_ENV: "development",
            PORT: 3000
        },
        env_prod: {
            NODE_ENV: "production",
            PORT: 8000
        }
    }]
};
