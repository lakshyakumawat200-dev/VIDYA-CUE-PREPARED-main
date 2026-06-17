/**
 * HTML Component Loader
 * Loads HTML components dynamically into the page
 */

// Component paths
const components = {
    header: 'components/header.html',
    sidebar: 'components/sidebar.html',
    mainContent: 'components/main-content.html',
    modals: 'components/modals.html'
};

/**
 * Load an HTML component from a file
 * @param {string} url - Path to the HTML file
 * @returns {Promise<string>} - HTML content
 */
async function loadComponent(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to load ${url}: ${response.statusText}`);
        }
        return await response.text();
    } catch (error) {
        console.error(`Error loading component from ${url}:`, error);
        return '';
    }
}

/**
 * Initialize and load all components
 */
async function initializeComponents() {
    try {
        // Load header
        const headerHTML = await loadComponent(components.header);
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder && headerHTML) {
            headerPlaceholder.outerHTML = headerHTML;
        }

        // Load sidebar
        const sidebarHTML = await loadComponent(components.sidebar);
        const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
        if (sidebarPlaceholder && sidebarHTML) {
            sidebarPlaceholder.outerHTML = sidebarHTML;
        }

        // Load main content
        const mainContentHTML = await loadComponent(components.mainContent);
        const mainContentPlaceholder = document.getElementById('main-content-placeholder');
        if (mainContentPlaceholder && mainContentHTML) {
            mainContentPlaceholder.outerHTML = mainContentHTML;
        }

        // Load modals
        const modalsHTML = await loadComponent(components.modals);
        const modalsPlaceholder = document.getElementById('modals-placeholder');
        if (modalsPlaceholder && modalsHTML) {
            modalsPlaceholder.outerHTML = modalsHTML;
        }

        // Initialize Lucide icons after components are loaded
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Initialize the application after components are loaded
        if (typeof initializeApp === 'function') {
            initializeApp();
        }

        console.log('✅ All components loaded successfully');
    } catch (error) {
        console.error('❌ Error initializing components:', error);
    }
}

// Load components when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeComponents);
} else {
    initializeComponents();
}
