document.addEventListener("DOMContentLoaded", function() {
    const galleryLinks = document.querySelectorAll('a[data-lightbox="gallery"]');
    if (galleryLinks.length === 0) return;

    let currentIndex = 0;
    
    // Create lightbox HTML
    const lightboxHtml = `
        <div id="custom-lightbox" class="custom-lightbox">
            <div class="lightbox-content">
                <span class="lightbox-close"><i class="fas fa-times"></i></span>
                <img id="lightbox-img" src="" alt="Lightbox Image">
                <video id="lightbox-video" controls autoplay></video>
                <iframe id="lightbox-iframe" src="" allow="autoplay" allowfullscreen></iframe>
                <div class="lightbox-prev"><i class="fas fa-chevron-left"></i></div>
                <div class="lightbox-next"><i class="fas fa-chevron-right"></i></div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', lightboxHtml);
    
    const lightbox = document.getElementById('custom-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    const lightboxIframe = document.getElementById('lightbox-iframe');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    // Convert NodeList to Array for easier index tracking
    const linksArray = Array.from(galleryLinks);
    
    linksArray.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            currentIndex = index;
            updateLightboxImage();
            lightbox.style.display = 'flex';
        });
    });
    
    function updateLightboxImage() {
        const src = linksArray[currentIndex].getAttribute('href');
        const isDrive = src.includes('drive.google.com');
        const isVideo = src.toLowerCase().endsWith('.mp4');
        
        lightboxVideo.pause();
        lightboxIframe.src = '';
        
        if (isDrive) {
            lightboxImg.style.display = 'none';
            lightboxVideo.style.display = 'none';
            lightboxIframe.src = src;
            lightboxIframe.style.display = 'block';
        } else if (isVideo) {
            lightboxImg.style.display = 'none';
            lightboxIframe.style.display = 'none';
            lightboxVideo.src = src;
            lightboxVideo.style.display = 'block';
        } else {
            lightboxVideo.style.display = 'none';
            lightboxIframe.style.display = 'none';
            lightboxImg.src = src;
            lightboxImg.style.display = 'block';
        }
    }
    
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        lightboxVideo.pause();
        lightboxIframe.src = '';
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            lightboxVideo.pause();
            lightboxIframe.src = '';
        }
    });
    
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : linksArray.length - 1;
        updateLightboxImage();
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex < linksArray.length - 1) ? currentIndex + 1 : 0;
        updateLightboxImage();
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') {
                lightbox.style.display = 'none';
                lightboxVideo.pause();
                lightboxIframe.src = '';
            }
            if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : linksArray.length - 1;
                updateLightboxImage();
            }
            if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex < linksArray.length - 1) ? currentIndex + 1 : 0;
                updateLightboxImage();
            }
        }
    });
});
