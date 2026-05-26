import { renderHeader } from '../components/header.js';
import { renderFiltersBar } from '../components/filtersBar.js';
import { renderTabsBar } from '../components/tabsBar.js';

export function initializeApp(){
  renderHeader();
  renderFiltersBar();
  renderTabsBar();

  console.log('Marketplace Analytics Initialized');
}
