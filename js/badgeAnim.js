document.addEventListener('DOMContentLoaded', function() {
    // Select all badges
    const badges = document.querySelectorAll('.profileBadge');
    
    // For each badge, add mouse events
    badges.forEach(badge => {
      // Create a custom tooltip element
      const tooltip = document.createElement('div');
      tooltip.className = 'badge-tooltip';
      
      // Determine tooltip text based on badge class
      let tooltipText = '';
      if (badge.classList.contains('dev')) tooltipText = 'Developer';
      else if (badge.classList.contains('staff')) tooltipText = 'Staff';
      else if (badge.classList.contains('certif')) tooltipText = 'Certified';
      else if (badge.classList.contains('imagehost')) tooltipText = 'Image Host';
      else if (badge.classList.contains('patrick')) tooltipText = 'St. Patrick';
      else if (badge.classList.contains('owner')) tooltipText = 'Owner';
      else if (badge.classList.contains('manager')) tooltipText = 'Manager';
      else if (badge.classList.contains('worldwide')) tooltipText = 'Worldwide Corporation';
      else if (badge.classList.contains('moderator')) tooltipText = 'Moderator';
      else if (badge.classList.contains('affiliate')) tooltipText = 'Affiliate';
      else if (badge.classList.contains('admin')) tooltipText = 'Admin';
      else if (badge.classList.contains('donor')) tooltipText = 'Donor';
      
      tooltip.textContent = tooltipText;
      document.body.appendChild(tooltip);
      
      // Tooltip positioning and animation on mouseover
      badge.addEventListener('mouseenter', function(e) {
        const badgeRect = badge.getBoundingClientRect();
        tooltip.style.visibility = 'visible';
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translate(-50%, 10px) scale(0.8)';
        
        // Position tooltip above badge
        tooltip.style.left = `${badgeRect.left + badgeRect.width/2}px`;
        tooltip.style.top = `${badgeRect.top - 10}px`;
        
        // Apply animation
        requestAnimationFrame(() => {
          tooltip.style.opacity = '0.9';
          tooltip.style.transform = 'translate(-50%, -30px) scale(1)';
        });
      });
      
      // Hide and animate tooltip exit
      badge.addEventListener('mouseleave', function() {
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translate(-50%, 10px) scale(0.8)';
        
        // Completely hide after animation completes
        setTimeout(() => {
          tooltip.style.visibility = 'hidden';
        }, 300);
      });
    });
    
    // Implementation for discordUserBadge with data-tooltip
    const discordBadges = document.querySelectorAll('.discordUserBadge[data-tooltip]');
    
    discordBadges.forEach(badge => {
      // Create a custom tooltip element
      const tooltip = document.createElement('div');
      tooltip.className = 'badge-tooltip discord-tooltip';
      tooltip.textContent = badge.getAttribute('data-tooltip');
      document.body.appendChild(tooltip);
      
      // Tooltip positioning and animation on mouseover
      badge.addEventListener('mouseenter', function(e) {
        const badgeRect = badge.getBoundingClientRect();
        tooltip.style.visibility = 'visible';
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translate(-50%, 10px) scale(0.8)';
        
        // Position tooltip above badge
        tooltip.style.left = `${badgeRect.left + badgeRect.width/2}px`;
        tooltip.style.top = `${badgeRect.top - 7}px`;
        
        // Apply animation
        requestAnimationFrame(() => {
          tooltip.style.opacity = '0.9';
          tooltip.style.transform = 'translate(-50%, -30px) scale(1)';
        });
      });
      
      // Hide and animate tooltip exit
      badge.addEventListener('mouseleave', function() {
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translate(-50%, 10px) scale(0.8)';
        
        // Completely hide after animation completes
        setTimeout(() => {
          tooltip.style.visibility = 'hidden';
        }, 300);
      });
    });
  });