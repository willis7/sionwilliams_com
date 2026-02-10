(function() {
    'use strict';

    // Create overlay element once
    let overlay = null;

    function createOverlay() {
        if (overlay) return overlay;

        overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
                <img src="" alt="">
                <div class="lightbox-caption"></div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Close on backdrop click
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeLightbox();
            }
        });

        // Close on close button click
        overlay.querySelector('.lightbox-close').addEventListener('click', closeLightbox);

        return overlay;
    }

    function openLightbox(src, alt, caption) {
        const lightbox = createOverlay();
        const img = lightbox.querySelector('img');
        const captionEl = lightbox.querySelector('.lightbox-caption');

        img.src = src;
        img.alt = alt || '';
        captionEl.textContent = caption || '';

        lightbox.classList.add('active');
        document.body.classList.add('lightbox-open');
    }

    function closeLightbox() {
        if (overlay) {
            overlay.classList.remove('active');
            document.body.classList.remove('lightbox-open');
        }
    }

    // Initialize lightbox triggers
    function init() {
        document.addEventListener('click', function(e) {
            const trigger = e.target.closest('.lightbox-trigger');
            if (trigger) {
                e.preventDefault();
                const src = trigger.dataset.lightbox;
                const alt = trigger.dataset.alt;
                const caption = trigger.dataset.caption;
                openLightbox(src, alt, caption);
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
