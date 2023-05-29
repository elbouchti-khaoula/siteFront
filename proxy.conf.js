const PROXY_CONFIG = [
    {
        context: [
            "/auth"
        ],
        target: "http://10.10.1.230:8080",
        secure: false,
        logLevel: "debug"
    },
    {
        context: [
            "/api/repositories"
        ],
        // target: "http://localhost:8888",
        // target: "http://10.10.1.187:8082",
        target: "http://10.10.1.245:8888",
        secure: false,
        logLevel: "debug"
    },
    {
        context: [
            "/api/real-estate-projects"
        ],
        // target: "http://localhost:8880",
        target: "http://10.10.1.187:8083",
        secure: false,
        logLevel: "debug"
    },
    {
        context: [
            "/api/reclamations"
        ],
        // target: "http://localhost:8882",
        target: "http://10.10.1.187:8085",
        secure: false,
        logLevel: "debug"
    },
    {
        context: [
            "/api/records-in-progress"
        ],
        target: "http://10.10.1.187:8965",
        secure: false,
        logLevel: "debug"
    },
    {
        context: [
            "/api/projects"
        ],
        target: "http://10.10.1.198:9099",
        secure: false,
        logLevel: "debug"
    },
    {
        context: [
            "/services"
        ],
        target: "https://wafaimmobilier--preprod.sandbox.my.salesforce.com",
        secure: false,
        logLevel: "debug"
    },
    {
        context: [
            "/servlet"
        ],
        target: "https://test.salesforce.com",
        secure: false,
        logLevel: "debug"
    }
]

module.exports = PROXY_CONFIG;