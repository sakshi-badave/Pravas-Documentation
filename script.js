// Toggle dropdown menus on mobile
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Mobile dropdown toggle
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const content = this.nextElementSibling;
                
                if (content.style.display === 'block') {
                    content.style.display = 'none';
                } else {
                    content.style.display = 'block';
                }
            }
        });
    });

    // Highlight current page in navigation
    highlightCurrentPage();
});

// Function to highlight the current page in navigation
function highlightCurrentPage() {
    // Get current page path
    const currentPath = window.location.pathname;
    
    // Remove trailing index.html if present
    const normalizedPath = currentPath.replace(/\/index\.html$/, '/');
    
    // Find all navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    // Check each link
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Convert relative paths to absolute for comparison
        let absoluteLinkPath = linkPath;
        if (!linkPath.startsWith('http') && !linkPath.startsWith('/')) {
            // Handle relative paths based on current directory level
            const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
            absoluteLinkPath = new URL(linkPath, window.location.origin + currentDir).pathname;
        }
        
        // Compare paths and add active class if they match
        if (normalizedPath === absoluteLinkPath || currentPath === absoluteLinkPath) {
            link.classList.add('active');
            
            // If this is a dropdown item, also expand its parent dropdown
            const parentDropdown = link.closest('.dropdown-content');
            if (parentDropdown) {
                // Add active class to parent dropdown link
                const parentDropdownLink = parentDropdown.previousElementSibling;
                if (parentDropdownLink) {
                    parentDropdownLink.classList.add('active');
                }
                
                // Show dropdown content on desktop
                if (window.innerWidth > 768) {
                    parentDropdown.style.display = 'block';
                }
            }
        }
    });
}