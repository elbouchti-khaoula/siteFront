const PROXY_CONFIG = [
    {
        context: [
            "/api/repositories"
        ],
        // target: "http://localhost:8888",
        target: "http://10.10.1.187:8888",
        // target: "http://10.10.1.245:8888",
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
            "/api/projects"
        ],
        // target: "http://10.10.1.198:9099",
        target: "http://10.10.1.187:9099",
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
            "/api/sav"
        ],
        target: "http://10.10.1.187:8090",
        secure: false,
        logLevel: "debug"
    },
    {
        context: [
            "/api/upload"
        ],
        target: "http://10.10.1.199:8083",
        secure: false,
        logLevel: "debug"
    },
    {
        context: [
            "/api/authentication"
        ],
        target: "http://10.10.1.187:8010",
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