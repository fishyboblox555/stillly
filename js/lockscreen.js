// Function to create the lockscreen
function createLockscreen() {
  // Create lockscreen element
  const lockscreen = document.createElement('div');
  lockscreen.id = 'lockscreen';
  lockscreen.classList.add('lockscreen');
  
  // Apply properties for performance optimization
  lockscreen.style.willChange = 'opacity, transform';
  lockscreen.style.backfaceVisibility = 'hidden';
  lockscreen.style.transform = 'translateZ(0)'; // Force hardware acceleration
  
  // Create internal lockscreen content
  const lockContent = document.createElement('div');
  lockContent.classList.add('lock-content');
  lockContent.style.willChange = 'transform, opacity';
  
  // Text to click with smooth transition
  const clickText = document.createElement('div');
  clickText.classList.add('click-text');
  clickText.innerHTML = '[ click to unlock ]';
  clickText.style.willChange = 'opacity, transform';
  
  // Add pulse animation to text using CSS
  const pulseStyle = document.createElement('style');
  pulseStyle.textContent = `
      @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
      }
      .click-text {
          animation: pulse 1.5s infinite ease-in-out;
      }
  `;
  document.head.appendChild(pulseStyle);
  
  // Build structure
  lockContent.appendChild(clickText);
  lockscreen.appendChild(lockContent);
  
  // Add to body before any other content
  document.body.insertBefore(lockscreen, document.body.firstChild);
  
  // Hide main content
  const container = document.getElementById('container');
  if (container) {
      container.style.opacity = '0';
      container.style.visibility = 'hidden';
      container.style.transition = 'opacity 0.8s cubic-bezier(0.215, 0.610, 0.355, 1.000), visibility 0s linear 0.8s';
      container.style.willChange = 'opacity';
  }
  
  // Ensure elements to animate are initially hidden
  const elementosParaAnimar = document.querySelectorAll('.elemento-para-animar');
  elementosParaAnimar.forEach(elemento => {
      elemento.style.opacity = '0';
      elemento.style.transform = 'translateY(20px)';
      elemento.style.willChange = 'opacity, transform';
      // Ensure there is no automatic animation
      elemento.classList.remove('animate-fade-in');
  });
  
  // Click event to unlock
  let unlocked = false; // Flag to prevent multiple executions
  let unlockAnimation = null;
  
  lockscreen.addEventListener('click', () => {
      if (unlocked) return; // If already unlocked, do nothing
      unlocked = true; // Mark as unlocked
      
      // Stop pulse animation by removing class
      clickText.style.animation = 'none';
      
      // Animate lockscreen exit with CSS Transitions for better performance
      lockscreen.style.transition = 'opacity 500ms cubic-bezier(0.165, 0.84, 0.44, 1), transform 500ms cubic-bezier(0.165, 0.84, 0.44, 1)';
      lockscreen.style.opacity = '0';
      lockscreen.style.transform = 'scale(1.1) translateZ(0)';
      
      // Show main content with fade after transition
      setTimeout(() => {
          if (container) {
              container.style.visibility = 'visible';
              container.style.opacity = '1';
              container.style.transition = 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
          }
          
          // Execute animation of elements after unlock
          setTimeout(() => {
              animateElementsSequentially();
          }, 200);
          
          // Remove lockscreen after completing animation
          setTimeout(() => {
              lockscreen.remove();
          }, 800);
      }, 500);
  });
}

// Animate elements with "elemento-para-animar" class using CSS Transitions
function animateElementsSequentially() {
  const elementos = document.querySelectorAll('.elemento-para-animar');
  
  elementos.forEach((elemento) => {
      // Check if there is a delay class (e.g. .delay-10, .delay-20)
      const delayClass = Array.from(elemento.classList).find(cls => cls.startsWith('delay-'));
      let delay = 0;
      
      if (delayClass) {
          // Extract the number from class (e.g. "delay-20" → 20 → 200ms)
          const delayValue = parseInt(delayClass.replace('delay-', ''), 10);
          delay = delayValue * 100; // Convert to ms (e.g. 20 → 2000ms)
      } else if (elemento.dataset.delay) {
          // If no class, check data-delay attribute (e.g. data-delay="300")
          delay = parseInt(elemento.dataset.delay, 10);
      }
      
      setTimeout(() => {
          // Apply CSS transition instead of frame-by-frame animation
          elemento.style.transition = 'opacity 500ms cubic-bezier(0.4, 0, 0.2, 1), transform 500ms cubic-bezier(0.4, 0, 0.2, 1)';
          elemento.style.opacity = '1';
          elemento.style.transform = 'translateY(0)';
          
          // Remove willChange after transition to free resources
          setTimeout(() => {
              elemento.style.willChange = 'auto';
          }, 500);
      }, delay);
  });
}

// Execute when document is ready
document.addEventListener('DOMContentLoaded', () => {
  createLockscreen();
  
  // Preprocessing to prepare future animations
  const elementosParaAnimar = document.querySelectorAll('.elemento-para-animar');
  if (elementosParaAnimar.length > 0) {
      // Tell browser these elements will be animated soon
      elementosParaAnimar.forEach(elemento => {
          if ('IntersectionObserver' in window) {
              const observer = new IntersectionObserver((entries) => {
                  entries.forEach(entry => {
                      if (entry.isIntersecting) {
                          // Prepare element when close to viewport
                          entry.target.style.willChange = 'opacity, transform';
                          observer.unobserve(entry.target);
                      }
                  });
              });
              observer.observe(elemento);
          }
      });
  }
});
