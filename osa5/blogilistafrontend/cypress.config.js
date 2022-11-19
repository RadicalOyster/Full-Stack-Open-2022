const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'ibfu4p',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
