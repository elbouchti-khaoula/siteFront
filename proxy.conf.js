const PROXY_CONFIG = [
    {
        context: [
            "/api/repositories"
        ],
        // target: "http://localhost:8888",
        target: "http://10.10.1.187:8082",
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
        target: "http://localhost:8882",
        // target: "http://10.10.1.187:8085",
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