import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

function init() {
    Sentry.init({
        dsn: "https://6413f014910f4978b4a288f158784ae7@o1336458.ingest.sentry.io/6612653",
        integrations: [new BrowserTracing()],
        tracesSampleRate: 1.0,
    });
}

function log(error) {
    Sentry.captureException(error);
}

export default {
    init,
    log,
};
