module.exports = {
    apps: [
        {
            name: "dinehub",
            script: "npm",
            args: "start",
            env: {
                NODE_ENV: "production",
                PORT: 3000,
            },
        },
    ],
};
