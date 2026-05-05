// sidebar.js
document.addEventListener("DOMContentLoaded", function () {
    const sidebarContainer = document.getElementById('sidebar-container');
    
    if (sidebarContainer) {
        const currentPage = window.location.pathname.split("/").pop();

        // The Master Sidebar Template
        const sidebarHTML = `
        <aside style="width: 260px; background-color: #0f172a; height: 100vh; color: white; position: fixed; display: flex; flex-direction: column; box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1); z-index: 100; font-family: 'Inter', sans-serif;">
            
            <div style="padding: 30px 20px; text-align: center; font-size: 22px; font-weight: 800; letter-spacing: 3px; color: #ffffff; border-bottom: 1px solid rgba(255, 255, 255, 0.05); flex-shrink: 0;">SAMS</div>
            
            <ul class="custom-scrollbar" style="list-style: none; padding: 15px 0; margin: 0; flex-grow: 1; overflow-y: auto; overflow-x: hidden;">
                ${generateMenuItem("dashboard.html", "fas fa-chart-line", "Dashboard", currentPage)}
                ${generateMenuItem("StockIn-Out.html", "fas fa-exchange-alt", "Stock In & Out", currentPage)}
                ${generateMenuItem("StockAudit.html", "fas fa-clipboard-check", "Stock Audit", currentPage)}
                ${generateMenuItem("SuzukiAudit.html", "fas fa-car", "Suzuki Audit", currentPage)}
                ${generateMenuItem("TVStockAudit.html", "fas fa-tasks", "True Value Stock Audit", currentPage)}
                ${generateMenuItem("AtherStockAudit.html", "fas fa-motorcycle", "Ather Stock Audit", currentPage)}

                <div style="padding: 10px 30px; font-size: 11px; text-transform: uppercase; color: #475569; font-weight: 700; letter-spacing: 1px; margin-top: 20px;">Administration</div>
                
                ${generateMenuItem("AdminStockAudit.html", "fas fa-user-shield", "Admin Audit", currentPage)}
                ${generateMenuItem("SuzukiAdminAudit.html", "fas fa-car-side", "Suzuki Admin Audit", currentPage)}
                ${generateMenuItem("TVAdminAudit.html", "fas fa-shield-alt", "True Value Admin Audit", currentPage)}
                ${generateMenuItem("AtherAdminAudit.html", "fas fa-motorcycle", "Ather Admin Audit", currentPage)}
                ${generateMenuItem("Barcode.html", "fas fa-barcode", "Barcode Download", currentPage)}
                ${generateMenuItem("UserAccess.html", "fas fa-users-cog", "User Access", currentPage)}
            </ul>
        </aside>

        <style>
            .custom-scrollbar::-webkit-scrollbar {
                width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
                background: #0f172a;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #334155;
                border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #475569;
            }
            /* Firefox support */
            .custom-scrollbar {
                scrollbar-width: thin;
                scrollbar-color: #334155 #0f172a;
            }
        </style>
        `;

        sidebarContainer.innerHTML = sidebarHTML;
    }
});

function generateMenuItem(file, icon, label, currentPage) {
    const isActive = currentPage === file;
    
    const liStyle = isActive 
        ? `margin: 5px 15px; border-radius: 12px; background-color: #2563eb; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);` 
        : `margin: 5px 15px; border-radius: 12px; transition: background 0.2s;`;
    
    const aStyle = isActive 
        ? `text-decoration: none; color: white; padding: 12px 18px; display: flex; align-items: center; font-size: 14px; font-weight: 500;` 
        : `text-decoration: none; color: #94a3b8; padding: 12px 18px; display: flex; align-items: center; font-size: 14px; font-weight: 500;`;

    const iconStyle = `margin-right: 15px; font-size: 18px; width: 25px; text-align: center; ${isActive ? '' : 'opacity: 0.7;'}`;

    return `
        <li style="${liStyle}">
            <a href="${file}" style="${aStyle}">
                <i class="${icon}" style="${iconStyle}"></i> ${label}
            </a>
        </li>
    `;
}