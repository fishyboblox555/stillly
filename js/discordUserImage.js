if (!window.DISCORD_WIDGET_INITIALIZED) {
    window.DISCORD_WIDGET_INITIALIZED = true;

    (function() {
        function atualizarPerfilDiscord(userId) {
            const targetUserId = userId || '1224512361793327117';

            fetch(`https://discorduserstatus-2-0.onrender.com/status/${targetUserId}`)
            .then(response => response.json())
            .then(data => {
                const avatarImg = document.querySelector('.avatarImage');
                if (avatarImg && data.avatarUrl) {
                    const avatarSrc = data.avatarUrl.includes('?') ? data.avatarUrl + '&t=' + Date.now() : data.avatarUrl + '?t=' + Date.now();
                    avatarImg.src = avatarSrc;
                    console.log(`Avatar do usuário ${targetUserId} atualizado:`, avatarSrc);
                }

                const statusImg = document.querySelector('.discordStatus');
                if (statusImg) {
                    switch(data.status) {
                        case 'online': statusImg.src = '/img/online.png'; break;
                        case 'idle': statusImg.src = '/img/idle.png'; break;
                        case 'dnd': statusImg.src = '/img/dnd.png'; break;
                        default: statusImg.src = '/img/offline.png';
                    }
                }

                const usernameElement = document.querySelector('.discordUserDiv > span');
                if (usernameElement && data.username) {
                    usernameElement.textContent = data.username;
                }
            })
            .catch(error => {
                console.error('Erro ao buscar status:', error);
            });
        }

        function determinarUsuarioPagina() {
            const wrapper = document.querySelector('.presenceWrapper');
            const explicit = wrapper && wrapper.dataset && wrapper.dataset.discordId;
            if (explicit) return explicit;

            const currentPath = window.location.pathname;
            if (currentPath.includes('meuperfil') || currentPath.includes('perfil2')) {
                return '682694935631233203';
            }

            return '1224512361793327117';
        }

        document.addEventListener('DOMContentLoaded', function() {
            const avatarImg = document.querySelector('.avatarImage');
            if (avatarImg) {
                // Leave src if present; allow manual refresh
            }

            const userId = determinarUsuarioPagina();
            atualizarPerfilDiscord(userId);
            setInterval(() => atualizarPerfilDiscord(userId), 15000);
        });

        const avatarImg = document.querySelector('.avatarImage');
        if (avatarImg) {
            avatarImg.addEventListener('click', function() {
                console.log('Atualizando avatar manualmente...');
                const userId = determinarUsuarioPagina();
                atualizarPerfilDiscord(userId);
            });
        }
    })();
} else {
    // Widget already initialized by another script. Provide a simple manual refresh handler.
    const avatarImg = document.querySelector('.avatarImage');
    if (avatarImg) {
        avatarImg.addEventListener('click', function() {
            const src = avatarImg.src || '';
            if (src) {
                const newSrc = src.split('?')[0] + '?t=' + Date.now();
                avatarImg.src = newSrc;
                console.log('Avatar manual refresh (guard):', newSrc);
            }
        });
    }
}
