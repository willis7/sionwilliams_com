(function () {
    'use strict';

    // Pinned on purpose: update deliberately, never load "latest".
    var SENTRY_VERSION = '10.28.0';
    var SENTRY_BUNDLE = 'https://browser.sentry-cdn.com/' + SENTRY_VERSION + '/bundle.min.js';
    var SENTRY_DSN = 'https://d6f52ece865028a41bbeeab9b090ef1f@o4512372729446401.ingest.de.sentry.io/4512441553059920';

    // A second copy of this file must never initialise Sentry twice.
    if (window.__sentryBlogLoaded) return;
    window.__sentryBlogLoaded = true;

    function environment() {
        var host = window.location.hostname;
        if (host === 'sionwilliams.com' || host === 'www.sionwilliams.com') {
            return 'production';
        }
        if (host.indexOf('staging--') === 0) {
            return 'staging';
        }
        if (host.indexOf('preview--') === 0) {
            return 'preview';
        }
        return host;
    }

    function init() {
        if (!window.Sentry || typeof window.Sentry.init !== 'function') return;
        if (typeof window.Sentry.getClient === 'function' && window.Sentry.getClient()) return;

        try {
            window.Sentry.init({
                dsn: SENTRY_DSN,
                environment: environment(),
                tracesSampleRate: 0.25
            });
        } catch (err) {
            // Monitoring must never break the blog.
        }
    }

    function load() {
        var script = document.createElement('script');
        script.src = SENTRY_BUNDLE;
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.onload = init;
        // A failed CDN request is deliberately silent: the blog keeps working.
        script.onerror = function () {};
        document.head.appendChild(script);
    }

    // Load after the page itself so monitoring never delays the blog.
    if (document.readyState === 'complete') {
        load();
    } else {
        window.addEventListener('load', load);
    }
})();
