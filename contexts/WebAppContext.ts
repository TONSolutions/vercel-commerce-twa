import { createDataConductor } from "lib/createDataConductor";

import type WebApp from "@twa-dev/sdk";

const {
  DataConductorProvider: WebAppDataConductorProvider,
  useDataConductor: useWebAppDataConductor
} = createDataConductor<typeof WebApp>({
  displayName: "WebAppDataConductor"
});

export { WebAppDataConductorProvider, useWebAppDataConductor };
