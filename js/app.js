import {
  initializeDashboardPage
} from './dashboard/dashboardPage.js';

async function initializeApp() {

  await initializeDashboardPage();
}

initializeApp();