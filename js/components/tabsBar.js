import { tabsConfig } from '../config/tabsConfig.js';

export function renderTabsBar(){

  const html = tabsConfig.map(tab => `
    <button data-tab="${tab.id}">
      ${tab.label}
    </button>
  `).join('');

  document.getElementById('tabsBar').innerHTML = html;
}
