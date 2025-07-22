// spell-checker: disable

const RESERVED = [
  "www",
  "email",
  "admin",
  "webmaster",
  "zyplos",
  "sonic",
  "kirby",
  "link",
  "example",
  "handle",
  "handles",

  // Technical and Service-Related
  "ftp", // File Transfer Protocol
  "sftp", // Secure File Transfer Protocol
  "ssh", // Secure Shell
  "mail", // Mail server
  "smtp", // Simple Mail Transfer Protocol
  "imap", // Internet Message Access Protocol
  "pop", // Post Office Protocol
  "webmail", // Web-based email client
  "cpanel", // Common web hosting control panel
  "plesk", // Common web hosting control panel
  "whm", // WebHost Manager
  "dns", // Domain Name System management
  "ns1", // Nameserver
  "ns2", // Nameserver
  "sql", // Database services
  "mysql", // MySQL database services
  "db", // Database services
  "api", // Application Programming Interface
  "cdn", // Content Delivery Network
  "assets", // Hosting for static files (images, CSS, JS)
  "static", // Hosting for static files
  "media", // Hosting for media files (images, videos)
  "files", // File storage
  "images", // Image storage
  "uploads", // Directory for user-uploaded content
  "downloads", // Directory for downloadable content
  "backup", // Backup services
  "git", // Git version control
  "svn", // Subversion version control

  // Administrative and Official-Looking
  "administrator", // Administrator access
  "mod", // Moderator access
  "moderator", // Moderator access
  "root", // System administrator
  "support", // Official support channel
  "help", // Help and support resources
  "contact", // Official contact page
  "info", // Official information page
  "status", // Service status page
  "system", // System-related pages
  "internal", // Internal services
  "staff", // For staff members
  "team", // For the official team
  "official", // To claim official status
  "billing", // Billing and payment services
  "payments", // Payment processing

  // Security and Trust
  "secure", // To imply a secure connection
  "ssl", // To imply SSL encryption
  "security", // To impersonate a security page
  "login", // Phishing for login credentials
  "signin", // Phishing for login credentials
  "logout", // Phishing for session information
  "auth", // Authentication services
  "oauth", // OAuth services
  "password", // Phishing for passwords
  "verify", // To create verification scams
  "account", // To impersonate account pages
  "accounts", // To impersonate account pages
  "verification", // To create verification scams
  "checkout", // To create fake checkout pages
  "shop", // To create deceptive e-commerce sites
  "store", // To create deceptive e-commerce sites

  // Generic and Common Terms
  "blog", // Common for blogs
  "docs", // Documentation
  "developer", // Developer resources
  "demo", // For demonstrations
  "test", // For testing purposes
  "staging", // Staging environments
  "dev", // Development environments
  "prod", // Production environments
  "production", // Production environments
  "app", // For applications
  "go", // For redirect links
  "link", // For redirect links
  "news", // For news and updates
  "jobs", // For job listings
  "careers", // For career information
  "about", // For information about the service
  "contact-us", // Official contact page
  "privacy", // Privacy policy
  "terms", // Terms of service
  "legal", // Legal information
  "abuse", // For reporting abuse
  "postmaster", // Standard email-related address
  "webmaster", // Standard website-related address

  // Cloud & Hosting Platforms
  "s3", // Amazon Web Services (AWS) S3 bucket hosting
  "cloudfront", // Amazon Web Services (AWS) CDN service
  "elasticbeanstalk", // Amazon Web Services (AWS) application deployment service
  "ec2", // Amazon Web Services (AWS) compute service
  "rds", // Amazon Web Services (AWS) managed database service
  "azure", // Microsoft Azure cloud platform
  "blob", // Microsoft Azure Blob Storage
  "sites", // Microsoft Azure / Google Sites
  "gcp", // Google Cloud Platform acronym
  "appengine", // Google Cloud Platform application builder
  "firebase", // Google Cloud Platform mobile and web app platform
  "netlify", // Netlify hosting platform
  "vercel", // Vercel hosting and deployment platform
  "heroku", // Heroku Platform as a Service (PaaS)
  "digitalocean", // DigitalOcean cloud infrastructure provider
  "linode", // Linode cloud hosting provider

  // Website Builders & E-commerce Platforms
  "wix", // Wix platform
  "wixsite", // Default structure for free Wix sites
  "squarespace", // Squarespace platform
  "weebly", // Weebly platform
  "godaddy", // GoDaddy domain registrar and hosting provider
  "shopify", // Shopify e-commerce platform
  "myshopify", // Default structure for Shopify stores
  "bigcommerce", // BigCommerce e-commerce platform
  "etsy", // Etsy marketplace

  // Productivity & Collaboration Tools
  "sharepoint", // Microsoft 365 collaboration platform
  "onedrive", // Microsoft 365 cloud storage
  "teams", // Microsoft 365 communication platform
  "jira", // Atlassian project management tool
  "atlassian", // Atlassian, parent company of Jira and Confluence
  "confluence", // Atlassian team collaboration and wiki tool
  "trello", // Atlassian project management tool
  "slack", // Slack team communication platform
  "notion", // Notion all-in-one workspace tool
  "airtable", // Airtable cloud collaboration service
  "docusign", // DocuSign electronic signature service

  // Marketing & Customer Support Tools
  "zendesk", // Zendesk customer service platform
  "intercom", // Intercom customer communications platform
  "hubspot", // HubSpot marketing, sales, and customer service platform
  "hs-sites", // Common structure for sites hosted on HubSpot
  "mailchimp", // Mailchimp email marketing service
  "sendgrid", // SendGrid email delivery service
  "surveymonkey", // SurveyMonkey online survey tool
  "typeform", // Typeform online form and survey creator
  "salesforce", // Salesforce CRM platform
  "my-salesforce", // Common pattern for Salesforce pages

  // URL Structure & Protocols
  "http", // Prevents misleading URLs
  "https", // Prevents creation of deceptive secure links
  "mailto", // Used in hyperlinks to trigger an email client
  "data", // Prevents confusion with data URIs
  "file", // Prevents confusion with local file paths
  "tel", // Used for telephone links
  "sms", // Used for text messaging links
  "localhost", // Common local development hostname

  // Deceptive & High-Risk Keywords
  "free", // Often used for clickbait and scams
  "deals", // Can be used for fraudulent offers
  "sale", // Impersonating official sales pages
  "casino", // Associated with gambling, which may be legally restricted
  "bet", // Gambling-related
  "crypto", // General cryptocurrency scams
  "bitcoin", // Specific cryptocurrency scams
  "ethereum", // Specific cryptocurrency scams
  "nft", // Non-Fungible Token related scams
  "wallet", // Phishing for cryptocurrency wallet keys
  "exchange", // Phishing for credentials to financial exchanges
  "bank", // Impersonating a bank
  "pay", // Deceptive payment pages
  "airdrop", // Common term for crypto giveaways used in scams

  // Generic User & Personal Terms
  "my", // Common prefix for personal user pages (e.g., my.yourdomain.com)
  "me", // Another common prefix for personal pages
  "i", // Short, valuable, and often used for personal branding
  "you", // Generic and could be used in confusing ways
  "user", // For user-specific content or profiles
  "users", // A plural form for user directories
  "profile", // To avoid conflict with future user profile features
  "profiles", // Plural form for profile directories
  "guest", // Could conflict with temporary user account features
  "owner", // Implies ownership of the entire service

  // Top-Level Domains (TLDs & ccTLDs) - Representative Sample
  // It's recommended to block all TLDs and ccTLDs to prevent deception.
  "com", // Example Generic TLD
  "org", // Example Generic TLD
  "net", // Example Generic TLD
  "io", // Example Generic TLD
  "app", // Example Generic TLD
  "dev", // Example Generic TLD
];

export default RESERVED;
