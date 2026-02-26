function updateDiscordProfile(userId) {
    // If no userId is specified, use Stillly's ID by default
    const targetUserId = userId || '1224512361793327117';
    
    // Updated URL to point to the specific user endpoint
    fetch(`https://discorduserstatus-2-0.onrender.com/status/${targetUserId}`)
    .then(response => response.json())
    .then(data => {
        // Update profile picture (if available)
        const avatarImg = document.querySelector('.avatarImage');
        if (avatarImg && data.avatarUrl) {
            avatarImg.src = data.avatarUrl;
            console.log(`Avatar for user ${targetUserId} updated:`, data.avatarUrl);
        }
        
        // Update status
        const statusImg = document.querySelector('.discordStatus');
        if (statusImg) {
            // Use the correct image path based on status
            switch(data.status) {
                case 'online': statusImg.src = '/img/online.png'; break;
                case 'idle': statusImg.src = '/img/idle.png'; break;
                case 'dnd': statusImg.src = '/img/dnd.png'; break;
                default: statusImg.src = '/img/offline.png';
            }
            console.log(`User ${targetUserId} status updated to:`, data.status);
        } else {
            console.error('Element .discordStatus not found in DOM');
        }
        
        // If you want to show the username as well
        const usernameElement = document.querySelector('.username');
        if (usernameElement && data.username) {
            usernameElement.textContent = data.username;
        }
    })
    .catch(error => {
        console.error('Error fetching status:', error);
        // Add more visible error handling for debugging
        const statusElement = document.querySelector('.status-debugging');
        if (statusElement) {
            statusElement.textContent = 'Error connecting: ' + error.message;
            statusElement.style.color = 'red';
        }
    });
}

// Determine which user to monitor based on the page
function determineUserPage() {
    // You can use different methods to determine which user to display
    // For example, based on the URL or some element on the page
    
    // Example: check if we're on the specific profile page
    const currentPath = window.location.pathname;
    if (currentPath.includes('meuperfil') || currentPath.includes('perfil2')) {
        // Your user ID
        return '682694935631233203';
    }
    
    // By default, return Stillly's ID
    return '1224512361793327117';
}

// Call the function immediately when loading with the correct ID
const userId = determineUserPage();
updateDiscordProfile(userId);

// Call the function periodically to keep it updated
setInterval(() => updateDiscordProfile(userId), 5000); // 5 seconds
