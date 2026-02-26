if (!window.DISCORD_WIDGET_INITIALIZED) {
    window.DISCORD_WIDGET_INITIALIZED = true;

    (function() {
        function updateDiscordProfile(userId) {
            const targetUserId = userId || '1224512361793327117';

            // Ensure the Discord account link (if present) points to the right user
            const discordLink = document.querySelector('a[data-type="Discord"]') || document.querySelector('a[href*="discord.com/users"]');
            if (discordLink) {
                discordLink.href = `https://discord.com/users/${targetUserId}`;
            }

            fetch(`https://discorduserstatus-2-0.onrender.com/status/${targetUserId}`)
            .then(response => response.json())
            .then(data => {
                const avatarImg = document.querySelector('.avatarImage');
                if (avatarImg && data.avatarUrl) {
                    // Prevent aggressive caching
                    const avatarSrc = data.avatarUrl.includes('?') ? data.avatarUrl + '&t=' + Date.now() : data.avatarUrl + '?t=' + Date.now();
                    avatarImg.src = avatarSrc;
                    console.log(`Avatar for user ${targetUserId} updated:`, avatarSrc);
                }

                const statusImg = document.querySelector('.discordStatus');
                if (statusImg) {
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

                const usernameElement = document.querySelector('.discordUserDiv > span');
                if (usernameElement && data.username) {
                    usernameElement.textContent = data.username;
                }

                const bioElement = document.querySelector('.discordUser h3') || document.querySelector('.profileBio');
                if (bioElement && data.bio) {
                    bioElement.textContent = data.bio;
                }
            })
            .catch(error => {
                console.error('Error fetching status:', error);
                const statusElement = document.querySelector('.status-debugging');
                if (statusElement) {
                    statusElement.textContent = 'Error connecting: ' + error.message;
                    statusElement.style.color = 'red';
                }
            });
        }

        function determineUserPage() {
            // Prefer an explicit data attribute on the presence wrapper if present
            const wrapper = document.querySelector('.presenceWrapper');
            const explicit = wrapper && wrapper.dataset && wrapper.dataset.discordId;
            if (explicit) return explicit;

            const currentPath = window.location.pathname;
            if (currentPath.includes('meuperfil') || currentPath.includes('perfil2')) {
                return '682694935631233203';
            }

            return '1224512361793327117';
        }

        const userId = determineUserPage();
        updateDiscordProfile(userId);

        // Update every 15s to avoid rate issues
        setInterval(() => updateDiscordProfile(userId), 15000);
    })();
}
