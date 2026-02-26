document.addEventListener('DOMContentLoaded', () => {
    // Elements to be animated
    const container = document.querySelector('.container');
    const musicContainer = document.querySelector('.music-container');

    // Array of elements for 3D animation
    const animatedElements = [container, musicContainer];

    // Definir os keyframes no JavaScript
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes moveUp {
            from {
                transform: translateY(0);
            }
            to {
                transform: translateY(-60px);
            }
        }
    `;
    document.head.appendChild(styleSheet);

    // Initial settings for each element
    animatedElements.forEach(element => {
        if (element) {
            element.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            element.style.zIndex = '1';
            element.style.position = 'relative';
            element.style.willChange = 'transform';
            element.style.backfaceVisibility = 'hidden';
            element.style.transformStyle = 'preserve-3d';
            element.style.opacity = '0'; // Initially invisible
        }
    });

    // Variables for 3D animation
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let rafId = null;
    
    // Variables to control animation state
    let containerYOffset = 0;
    let targetYOffset = 0;
    let currentYOffset = 0;

    function animateTransform() {
        // Smooth interpolation between current and target position
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;
        currentYOffset += (targetYOffset - currentYOffset) * 0.05; // Smooth vertical movement
        
        // Apply transformation based on current state
        if (container) {
            // Combine vertical offset animation with 3D rotation
            container.style.transform = `perspective(1000px) translateY(${currentYOffset}px) rotateX(${currentY}deg) rotateY(${currentX}deg)`;
        }
        
        // For music container, apply only 3D rotation
        if (musicContainer && musicContainer.style.opacity === '1') {
            musicContainer.style.transform = `perspective(1000px) rotateX(${currentY}deg) rotateY(${currentX}deg)`;
        }
        
        // Continue animation always
        rafId = requestAnimationFrame(animateTransform);
    }

    // Start animation immediately
    rafId = requestAnimationFrame(animateTransform);

    // Function to add mouse movement event to an element
    function addMouseMoveEvent(element) {
        if (element) {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const offsetX = (x - centerX) / centerX;
                const offsetY = (y - centerY) / centerY;
                const intensity = 9;
                
                // Update target values
                targetX = offsetX * intensity;
                targetY = offsetY * intensity;
                
                // Prevent event propagation
                e.stopPropagation();
            });
        }
    }

    // Add movement events for each element
    animatedElements.forEach(addMouseMoveEvent);

    // Function to add mouse leave event
    function addMouseLeaveEvent(element) {
        if (element) {
            element.addEventListener('mouseleave', () => {
                // Return to initial rotation
                targetX = 0;
                targetY = 0;
            });
        }
    }

    // Add mouse leave events for each element
    animatedElements.forEach(addMouseLeaveEvent);

    // Add mouse enter events to prevent propagation
    animatedElements.forEach(element => {
        if (element) {
            element.addEventListener('mouseenter', (e) => {
                e.stopPropagation();
            });
        }
    });

    // Start animation sequence on click
    document.body.addEventListener('click', () => {
        // Fade in of main container
        if (container) {
            container.style.animation = 'fadeIn 0.8s forwards';
            
            // When fadeIn animation finishes
            container.addEventListener('animationend', (e) => {
                if (e.animationName === 'fadeIn') {
                    // Remove animation to not interfere with 3D transformation
                    container.style.animation = '';
                    container.style.opacity = '1';
                }
            }, { once: true });
        }

        // Add delay for music player fadeIn and container moveUp
        setTimeout(() => {
            // Fade in of music container
            if (musicContainer) {
                musicContainer.style.animation = 'fadeIn 0.8s forwards';
                
                // When fadeIn animation finishes
                musicContainer.addEventListener('animationend', (e) => {
                    if (e.animationName === 'fadeIn') {
                        // Remove animation to not interfere with 3D transformation
                        musicContainer.style.animation = '';
                        musicContainer.style.opacity = '1';
                    }
                }, { once: true });
            }
            
            // Move up of main container - now using our targetYOffset variable
            if (container) {
                // Set target offset to -60px
                targetYOffset = -60;
                
                // We no longer need CSS animation for moveUp,
                // as we now control movement through JS animation
            }
        }, 2480);
    }, { once: true });
});