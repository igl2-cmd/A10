// --- Utility Function to get a specific cookie value ---
function getCookie(name) {
    const nameEQ = name + "=";
    // document.cookie contains all cookies as a single string, separated by '; '
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        // Trim leading spaces
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }
        // Check if this is the cookie we are looking for
        if (c.indexOf(nameEQ) === 0) {
            // Extract and return the value
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

// --- Function to set a cookie ---
function setCookie(name, value, minutes) {
    let expires = "";
    if (minutes) {
        const date = new Date();
        // Set the expiration time to 'minutes' from now
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    // Set the cookie string. 'path=/' makes it available across the entire site.
    document.cookie = name + "=" + (value || "")  + expires + "; path=/; SameSite=Lax";
}

// --- Main Logic on Page Load ---
window.onload = function() {
    const cookieName = "reload_test_cookie";
    const statusDiv = document.getElementById("cookie-status");
    const existingValue = getCookie(cookieName);

    if (existingValue) {
        // CASE 2: Cookie exists (Page has been reloaded)
        statusDiv.innerHTML = `
            ✅ **Cookie Found!**<br><br>
            **Name:** ${cookieName}<br>
            **Value:** <span style="font-weight: bold; color: #dc3545;">${existingValue}</span>
        `;
        statusDiv.style.borderColor = '#28a745';
    } else {
        // CASE 1: Cookie does not exist (First load)
        const now = new Date().toLocaleTimeString();
        const newValue = `Set at ${now}`;
        const minutesToExpire = 1;

        setCookie(cookieName, newValue, minutesToExpire);

        statusDiv.innerHTML = `
            ➡️ **Cookie Set Successfully!**<br><br>
            **Name:** ${cookieName}<br>
            **Value:** ${newValue}<br>
            **Expires in:** ${minutesToExpire} minute(s)
        `;
        statusDiv.style.borderColor = '#007bff';
    }
};