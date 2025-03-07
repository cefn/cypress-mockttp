import { defineConfig } from 'cypress'

export default defineConfig({
  fixturesFolder: false,
  screenshotsFolder: 'screenshots',
  videosFolder: 'videos',
  e2e: {
    setupNodeEvents(on, config) {},
    specPattern: './**/*.spec.ts',
    supportFile: false,
  },
})
