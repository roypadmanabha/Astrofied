export default async (request, context) => {
    const referer = request.headers.get("referer") || "";

    // List of approved domains allowed to load your images
    const allowedDomains = [
        "https://myastrofied.com",
        "https://astrofied.netlify.app",
        "http://localhost:5174" // for local development
    ];

    const isAllowed = allowedDomains.some((domain) => referer.startsWith(domain));

    // If someone tries to open the link directly in a tab or hotlink from another site:
    if (!isAllowed) {
        return new Response("403 Forbidden: Direct access to Astrofied media is blocked.", {
            status: 403,
            headers: { "Content-Type": "text/plain" }
        });
    }

    // Otherwise, load normally on your site
    return context.next();
};

export const config = {
    // Paths to protect (all site assets and newsfied uploads)
    path: ["/assets/*", "/newsfied-images/*"]
};
