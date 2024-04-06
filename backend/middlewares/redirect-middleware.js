const redirectMiddleware = (req, res, next) => {
    const { protocol, hostname, originalUrl } = req;

    // Define the preferred URL
    const preferredUrl = "https://samsapp.onrender.com";

    // Check if the requested URL matches any variation that needs redirection
    if (
        (protocol === "http" && hostname === "samsapp.onrender.com") ||
        hostname === "www.samsapp.onrender.com"
        //
    ) {
        // If it's a variation that needs redirection, redirect to the preferred URL with HTTPS protocol
        return res.redirect(301, preferredUrl + originalUrl);
    }

    // Check if the protocol is already HTTPS and continue to other routes
    if (protocol === "https" && hostname === "samsapp.onrender.com") {
        return next();
    }

    // Redirect all other variations to the preferred URL with HTTPS protocol
    res.redirect(301, preferredUrl);
}

module.exports = redirectMiddleware;


//explanation:
// http://samsapp.onrender.com 
//and www subdomain http://www.samsapp.onrender.com 
//and https://www.samsapp.onrender.com).

// If the requested URL matches any of these variations, the middleware redirects to the preferred URL with HTTPS protocol.

// Otherwise, if the requested URL is already using the preferred protocol and hostname combination, it continues to other routes.
// All other variations are redirected to the preferred URL with HTTPS protocol.