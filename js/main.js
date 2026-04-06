document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation (Intersection Observer)
    const reveals = document.querySelectorAll('.reveal');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    // Mobile Navigation Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    
    if (mobileBtn && mainNav) {
        mobileBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
        
        // Close menu when a link is clicked
        document.querySelectorAll('.nav-scroll').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            if (targetId === '#whatsapp') {
                e.preventDefault();
                // Replace with actual WhatsApp logic/redirect
                alert('Redirigiendo a WhatsApp de Mundo Genético...');
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    // Global Canvas Visibility Observer for WPO
    window.canvasVisibility = {};
    const canvasObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.target.id) {
                window.canvasVisibility[entry.target.id] = entry.isIntersecting;
            }
        });
    }, { rootMargin: '100px', threshold: 0 });

    document.querySelectorAll('canvas').forEach(c => canvasObserver.observe(c));

    // Initialize Advanced HUD & DNA Canvas Animation
    initTechHUD();
    initBenefitsDNA();
    initCTADNA();
    initFAQ();
    initFaqDNA();
    initProcessParticles();
});

function initTechHUD() {
    const canvas = document.getElementById('tech-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    function resize() {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    let phase = 0;
    const numPoints = window.innerWidth < 768 ? 35 : 55;
    const spacing = 16;
    const amplitude = window.innerWidth < 768 ? 30 : 60;

    // Mini DNA floating particles
    const miniDnas = Array.from({ length: 25 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 0.2 + Math.random() * 0.8,
        size: 1.8 + Math.random() * 2.0, // Increased size for better visibility
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.02 + Math.random() * 0.04,
        life: Math.random() * 100,
        maxLife: 200 + Math.random() * 300,
        rungs: Math.floor(6 + Math.random() * 6) // Randomize number of rungs between 6 and 11 to look more like chains
    }));

    function draw() {
        if (window.canvasVisibility[canvas.id] === false) {
            setTimeout(() => requestAnimationFrame(draw), 200);
            return;
        }
        ctx.clearRect(0, 0, width, height);

        // --- 1. Draw Mini DNA Particles ---
        miniDnas.forEach(p => {
            p.y -= p.speed;
            p.phase += p.phaseSpeed;
            p.life++;
            if (p.life > p.maxLife || p.y < -50) {
                p.y = height + 50;
                p.x = Math.random() * width;
                p.life = 0;
            }

            // Fade in and out based on life cycle
            let lifeAlpha = Math.sin((p.life / p.maxLife) * Math.PI);
            ctx.globalAlpha = lifeAlpha * 0.7; // Max opacity 0.7
            ctx.lineWidth = 1;

            for (let i = 0; i < p.rungs; i++) { // More rungs per mini-DNA to resemble a chain
                let yPos = p.y + i * (p.size * 3.5); // Adjusted spacing
                let ang = p.phase + i * 0.5;
                let x1 = p.x + Math.sin(ang) * p.size * 3.5; // Adjusted width
                let x2 = p.x + Math.sin(ang + Math.PI) * p.size * 3.5;

                ctx.beginPath();
                ctx.moveTo(x1, yPos);
                ctx.lineTo(x2, yPos);
                ctx.strokeStyle = `rgba(56, 189, 248, ${lifeAlpha * 0.4})`;
                ctx.stroke();

                ctx.fillStyle = `rgba(56, 189, 248, ${lifeAlpha * 0.9})`;
                ctx.beginPath(); ctx.arc(x1, yPos, p.size * 0.8, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(x2, yPos, p.size * 0.8, 0, Math.PI * 2); ctx.fill();
            }
        });

        // --- 2. Draw 3D DNA Helix (Placed on the right side) ---
        ctx.globalAlpha = 1;
        // Move DNA to the right to balance the text on the left
        const centerX = window.innerWidth < 768 ? width / 2 : width * 0.75;
        const centerY = height / 2;
        const startY = centerY - (numPoints * spacing) / 2;

        ctx.lineWidth = 1.8;

        for (let i = 0; i < numPoints; i++) {
            const y = startY + i * spacing;
            const angle = phase + i * 0.2;

            const x1 = centerX + Math.sin(angle) * amplitude;
            const x2 = centerX + Math.sin(angle + Math.PI) * amplitude;

            const z1 = Math.cos(angle);
            const z2 = Math.cos(angle + Math.PI);

            const size1 = (z1 + 1.5) * 1.8;
            const size2 = (z2 + 1.5) * 1.8;

            const alpha1 = (z1 + 1.5) / 2.5;
            const alpha2 = (z2 + 1.5) / 2.5;

            // Connectors (Hydrogen bonds)
            ctx.beginPath();
            ctx.moveTo(x1, y);
            ctx.lineTo(x2, y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${Math.min(alpha1, alpha2) * 0.5})`;
            ctx.stroke();

            // Strand 1 (Cyan)
            ctx.beginPath();
            ctx.arc(x1, y, size1, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(56, 189, 248, ${alpha1})`;
            if (z1 > 0) { ctx.shadowBlur = 15; ctx.shadowColor = '#38bdf8'; } else { ctx.shadowBlur = 0; }
            ctx.fill();

            // Strand 2 (Light Cyan/White)
            ctx.beginPath();
            ctx.arc(x2, y, size2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(224, 242, 254, ${alpha2})`;
            if (z2 > 0) { ctx.shadowBlur = 15; ctx.shadowColor = '#e0f2fe'; } else { ctx.shadowBlur = 0; }
            ctx.fill();
        }
        ctx.shadowBlur = 0;

        // --- 3. Clean DNA rendering (no HUD reticles per user request) ---
        ctx.globalAlpha = 1.0;

        // Removed scanline at user's request

        phase -= 0.02;
        requestAnimationFrame(draw);
    }

    // Slight delay to ensure parent dimensions are ready
    setTimeout(() => { resize(); draw(); }, 150);
}

// FAQ Accordion Interaction (Mobile Fallback)
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const isActive = question.parentElement.classList.contains('active');
            
            // Close all items quietly
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // If it wasn't active initially, toggle it to active
            if (!isActive) {
                question.parentElement.classList.add('active');
            }
        });
    });
}



function initBenefitsDNA() {
    const canvas = document.getElementById('benefits-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    function resize() {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    let phase = 0;

    function draw() {
        if (window.canvasVisibility[canvas.id] === false) {
            setTimeout(() => requestAnimationFrame(draw), 200);
            return;
        }
        ctx.clearRect(0, 0, width, height);

        // Massive Helix to cover the entire background elegantly
        const isMobile = window.innerWidth < 768;
        const amplitude = isMobile ? 120 : 350; // Huge radius to fill space
        const spacing = isMobile ? 40 : 80;     // Wide spacing between nodes

        // Ensure it covers the diagonal screen distance
        const diag = Math.sqrt(width * width + height * height);
        const numPoints = Math.ceil(diag / spacing) + 10;

        ctx.lineWidth = isMobile ? 2 : 4;

        ctx.save();
        ctx.translate(width / 2, height / 2); // Center of the section

        // Tilt the DNA diagonally from top-left to bottom-right
        const tiltAngle = Math.atan2(height, width);
        ctx.rotate(-tiltAngle * 0.7); // Tilted angle so it spans naturally behind the grid

        const startY = -diag / 2 - 200; // Start well off-screen

        ctx.globalAlpha = 1;

        for (let i = 0; i < numPoints; i++) {
            const y = startY + i * spacing;
            const angle = phase + i * 0.12; // Modulates twist rate

            const x1 = Math.sin(angle) * amplitude;
            const x2 = Math.sin(angle + Math.PI) * amplitude;

            const z1 = Math.cos(angle);
            const z2 = Math.cos(angle + Math.PI);

            const size1 = (z1 + 1.5) * (isMobile ? 5 : 12); // Huge spheres
            const size2 = (z2 + 1.5) * (isMobile ? 5 : 12);

            // Adjust opacity. Because it's a massive background element, we keep it subtle
            const alpha1 = ((z1 + 1.5) / 2.5) * 0.22;
            const alpha2 = ((z2 + 1.5) / 2.5) * 0.22;

            // Connectors (rungs)
            ctx.beginPath();
            ctx.moveTo(x1, y);
            ctx.lineTo(x2, y);
            ctx.strokeStyle = `rgba(9, 60, 141, ${Math.min(alpha1, alpha2) * 0.5})`;
            ctx.stroke();

            // Draw depth-sorted spheres
            if (z1 < z2) {
                drawNode(x1, y, size1, alpha1, false);
                drawNode(x2, y, size2, alpha2, true);
            } else {
                drawNode(x2, y, size2, alpha2, false);
                drawNode(x1, y, size1, alpha1, true);
            }
        }

        function drawNode(x, y, size, alpha, isFront) {
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);

            if (isFront) {
                // Soft elegant blue gradient for foreground
                const grad = ctx.createRadialGradient(x - size * 0.2, y - size * 0.2, size * 0.1, x, y, size);
                grad.addColorStop(0, `rgba(224, 242, 254, ${alpha * 1.5})`);
                grad.addColorStop(0.5, `rgba(56, 189, 248, ${alpha})`);
                grad.addColorStop(1, `rgba(9, 60, 141, ${alpha})`);
                ctx.fillStyle = grad;

                ctx.shadowBlur = 20;
                ctx.shadowColor = `rgba(56, 189, 248, ${alpha * 0.4})`;
            } else {
                // Deeper tone for background spheres structure
                ctx.fillStyle = `rgba(9, 60, 141, ${alpha * 0.8})`;
                ctx.shadowBlur = 0;
            }
            ctx.fill();
        }

        ctx.restore();

        ctx.shadowBlur = 0;
        phase -= 0.008; // Very slow majestic rotation
        requestAnimationFrame(draw);
    }

    setTimeout(() => { resize(); draw(); }, 100);
}

// Cinematic 3D Particle DNA (CTA Banner)
function initCTADNA() {
    const canvas = document.getElementById('cta-dna-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // Disabled alpha for faster composite

    // Cap pixel ratio to max 1.5 to prevent massive rendering sweeps on mobile retina
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let width, height;

    function resize() {
        width = canvas.parentElement.offsetWidth;
        height = canvas.parentElement.offsetHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
    }
    window.addEventListener('resize', resize);
    resize();

    let phase = 0;
    const isMobile = window.innerWidth < 768;
    const numPoints = isMobile ? 35 : 55; // Slightly reduced node density
    const spacing = 18;
    const amplitude = isMobile ? 120 : 250;

    const rungsCount = isMobile ? 4 : 7;
    const rungT = [];
    for (let j = 1; j < rungsCount; j++) {
        rungT.push(j / rungsCount);
    }

    function draw() {
        if (window.canvasVisibility[canvas.id] === false) {
            setTimeout(() => requestAnimationFrame(draw), 200);
            return;
        }
        // Ultra-fast hardware clear
        ctx.clearRect(0, 0, width, height);

        const centerY = height / 2;
        const centerX = width / 2;
        const startY = centerY - (numPoints * spacing) / 2;

        const nodes = [];
        const twistFreq = 0.16;

        // Build particle nodes
        for (let i = 0; i < numPoints; i++) {
            const y = startY + i * spacing;
            const angle = phase + i * twistFreq;

            const sinA = Math.sin(angle);
            const cosA = Math.cos(angle);

            const x1 = centerX + sinA * amplitude;
            const x2 = centerX - sinA * amplitude;
            const z1 = cosA;
            const z2 = -cosA;

            nodes.push({ x: x1, y: y, z: z1, isBackbone: true });
            nodes.push({ x: x2, y: y, z: z2, isBackbone: true });

            if (i % 2 === 0) {
                for (let j = 0; j < rungT.length; j++) {
                    const t = rungT[j];
                    const rx = x1 + (x2 - x1) * t;
                    const rz = z1 + (z2 - z1) * t;
                    const sag = Math.sin(t * Math.PI) * 12;
                    nodes.push({ x: rx, y: y + sag, z: rz, isBackbone: false });
                }
            }
        }

        // Z-Depth sorting
        nodes.sort((a, b) => a.z - b.z);

        // Highly optimized draw loop - NO shadowBlur
        for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];
            const perspective = (n.z + 1.2) / 2.2;

            const size = n.isBackbone ? (perspective * 4.5 + 1.5) : (perspective * 2 + 0.8);
            let alpha = n.isBackbone ? perspective * 0.95 : perspective * 0.6;

            ctx.beginPath();
            ctx.arc(n.x, n.y, size, 0, Math.PI * 2);

            // Bright clinical blue colors to match the hero background
            if (n.z > 0.4) {
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`; // Crisp white at the extreme front
            } else if (n.z > -0.4) {
                ctx.fillStyle = `rgba(186, 230, 253, ${alpha})`; // Light sky blue in the middle
            } else {
                ctx.fillStyle = `rgba(56, 189, 248, ${alpha * 0.6})`; // Deeper blue in the back
            }

            ctx.fill();
        }

        phase += 0.015;
        requestAnimationFrame(draw);
    }

    setTimeout(() => { resize(); draw(); }, 150);
}

// Floating Particles for Process Section (4op)
function initProcessParticles() {
    const canvas = document.getElementById('process-particles-4op');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    function resize() {
        width = canvas.parentElement.offsetWidth;
        height = canvas.parentElement.offsetHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
    }
    window.addEventListener('resize', resize);
    resize();

    const particleCount = window.innerWidth < 768 ? 40 : 100;
    const particles = [];
    const colors = [
        '255, 255, 255', // White
        '186, 230, 253', // Light cyan
        '56, 189, 248'   // Light sky blue
    ];
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 0.6,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.5 - 0.2, // Slow upward drift
            alpha: Math.random() * 0.5 + 0.1,
            pulseSpeed: Math.random() * 0.02 + 0.005,
            pulsePhase: Math.random() * Math.PI * 2,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }

    function draw() {
        if (window.canvasVisibility[canvas.id] === false) {
            setTimeout(() => requestAnimationFrame(draw), 200);
            return;
        }
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < -10) p.x = width + 10;
            if (p.x > width + 10) p.x = -10;
            if (p.y < -10) p.y = height + 10;
            if (p.y > height + 10) p.y = -10;

            p.pulsePhase += p.pulseSpeed;
            const currentAlpha = p.alpha + Math.sin(p.pulsePhase) * 0.25;
            const safeAlpha = Math.max(0.05, Math.min(0.8, currentAlpha));

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color}, ${safeAlpha})`;
            
            // Eliminamos el shadowBlur aquí para no impactar el rendimiento en dispositivos móviles
            // El rendimiento y la velocidad de la API Canvas mejora de 20fps a 60fps sin sombras.
            
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }

    setTimeout(() => { resize(); draw(); }, 150);
}

// =========================================================================
// COOKIE BANNER & POLICY MODAL LOGIC
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('cookie-banner');
    const btnAccept = document.getElementById('cookie-accept');
    const btnReject = document.getElementById('cookie-reject');
    const btnCloseX = document.getElementById('cookie-close-x');
    const btnOpenPolicy = document.getElementById('open-cookie-policy');
    
    const popup = document.getElementById('cookie-modal');
    const btnCloseModal = document.getElementById('close-cookie-modal');
    
    if (!banner || !popup) return;

    // Chequear si el usuario ya aceptó (almacenado en localStorage)
    const consent = localStorage.getItem('mg_cookie_consent');
    
    if (!consent) {
        banner.classList.remove('hidden');
        document.body.classList.add('has-cookie-banner');
        setTimeout(() => {
            banner.classList.add('show');
        }, 800);
    }
    
    const hideBanner = (action) => {
        localStorage.setItem('mg_cookie_consent', action);
        banner.classList.remove('show');
        document.body.classList.remove('has-cookie-banner');
        setTimeout(() => {
            banner.classList.add('hidden');
        }, 600);
    };

    if (btnAccept) btnAccept.addEventListener('click', () => hideBanner('accepted'));
    if (btnReject) btnReject.addEventListener('click', () => hideBanner('rejected'));
    if (btnCloseX) btnCloseX.addEventListener('click', () => hideBanner('dismissed'));
    
    // Funciones del Modal (Popup Política)
    const openModal = () => {
        popup.classList.remove('hidden');
        setTimeout(() => popup.classList.add('show'), 10);
        document.body.style.overflow = 'hidden'; // Evita scroll de fondo
    };
    
    const closeModal = () => {
        popup.classList.remove('show');
        setTimeout(() => {
            popup.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    };

    if (btnOpenPolicy) {
        btnOpenPolicy.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }
    
    if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
    
    // Cierra modal al dar click en la parte negra exterior
    popup.addEventListener('click', (e) => {
        if(e.target === popup) closeModal();
    });
});

function initFaqDNA() {
    const canvas = document.getElementById('faq-dna-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = document.querySelector('.faq-section').offsetHeight || 800; // fallback height
    }
    
    window.addEventListener('resize', resize);
    resize();

    // Create DNA strands
    for (let i = 0; i < 200; i++) {
        particles.push({
            y: (i / 200) * height,
            angleOffset: i * 0.12,
            speed: 0.01 + Math.random() * 0.005,
            radius: 2 + Math.random() * 3,
        });
    }

    function draw() {
        if (window.canvasVisibility && window.canvasVisibility['faq-dna-canvas'] === false) {
            requestAnimationFrame(draw);
            return;
        }

        ctx.clearRect(0, 0, width, height);

        const centerX = width > 768 ? width * 0.8 : width * 1.5; // Offset to right

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.angleOffset += p.speed;

            const scaleX = 180;
            const x1 = centerX + Math.sin(p.angleOffset) * scaleX;
            const x2 = centerX + Math.sin(p.angleOffset + Math.PI) * scaleX;
            
            const z1 = Math.cos(p.angleOffset);
            const z2 = Math.cos(p.angleOffset + Math.PI);

            const alpha1 = (z1 + 1) / 2 * 0.6 + 0.1;
            const alpha2 = (z2 + 1) / 2 * 0.6 + 0.1;

            if (i % 5 === 0) {
                ctx.beginPath();
                ctx.moveTo(x1, p.y);
                ctx.lineTo(x2, p.y);
                const grad = ctx.createLinearGradient(x1, p.y, x2, p.y);
                grad.addColorStop(0, `rgba(56, 189, 248, ${alpha1 * 0.3})`);
                grad.addColorStop(1, `rgba(9, 60, 141, ${alpha2 * 0.3})`);
                ctx.strokeStyle = grad;
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }

            ctx.beginPath();
            ctx.arc(x1, p.y, p.radius * (z1 + 1.5), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(56, 189, 248, ${alpha1})`;
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#38bdf8';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(x2, p.y, p.radius * (z2 + 1.5), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(9, 60, 141, ${alpha2})`;
            ctx.shadowBlur = 0;
            ctx.fill();
        }

        ctx.shadowBlur = 0;
        requestAnimationFrame(draw);
    }
    draw();
}

/* =========================================
   COBERTURA NACIONAL v3 - Isometric 3D Buildings
   Renders SVG polygon buildings with 3 faces (top/left/right)
   Placing them into pre-calibrated position dots
   ========================================= */
(function() {
    const svgNS = "http://www.w3.org/2000/svg";
    const pinsLayer = document.getElementById('map-pins-layer');
    const tooltip = document.getElementById('mapTooltip3');
    const wrapper = document.querySelector('.coverage-map-wrapper');
    const imgMap = document.getElementById('colombia-img');
    if (!pinsLayer || !wrapper || !tooltip) return;

    // ELIMINAR EL TONO AMARILLENTO DEL MAPA
    if (imgMap) {
        imgMap.style.filter = "saturate(0.85) brightness(1.05) contrast(1.1) hue-rotate(-6deg)";
    }

    // JSON Locations provided by user
    const locations = [
      { "name": "Medellín", "hq": true, "left": 33.12, "top": 40.11 },
      { "name": "Acacías", "hq": false, "left": 45.48, "top": 53.75 },
      { "name": "Apartadó", "hq": false, "left": 27.35, "top": 32.09 },
      { "name": "Arauca", "hq": false, "left": 62.49, "top": 38.51 },
      { "name": "Armenia", "hq": false, "left": 32.96, "top": 50.38 },
      { "name": "Barranquilla", "hq": false, "left": 37.46, "top": 18.45 },
      { "name": "Bogotá", "hq": false, "left": 42.75, "top": 48.13 },
      { "name": "Bucaramanga", "hq": false, "left": 49.97, "top": 36.26 },
      { "name": "Cajicá", "hq": false, "left": 45.8, "top": 49.1 },
      { "name": "Cali", "hq": false, "left": 26.87, "top": 55.03 },
      { "name": "Cartagena", "hq": false, "left": 35.53, "top": 21.66 },
      { "name": "Caucasia", "hq": false, "left": 36.81, "top": 33.69 },
      { "name": "Cúcuta", "hq": false, "left": 53.34, "top": 31.13 },
      { "name": "Granada", "hq": false, "left": 49.81, "top": 55.03 },
      { "name": "Ibagué", "hq": false, "left": 36.01, "top": 52.46 },
      { "name": "Ipiales", "hq": false, "left": 21.41, "top": 68.83 },
      { "name": "Magangué", "hq": false, "left": 42.27, "top": 30.64 },
      { "name": "Manizales", "hq": false, "left": 34.41, "top": 46.85 },
      { "name": "Mocoa", "hq": false, "left": 30.56, "top": 68.35 },
      { "name": "Montelíbano", "hq": false, "left": 32.48, "top": 33.69 },
      { "name": "Montería", "hq": false, "left": 31.2, "top": 28.24 },
      { "name": "Monterrey (Casanare)", "hq": false, "left": 58.15, "top": 47.97 },
      { "name": "Neiva", "hq": false, "left": 34.25, "top": 58.56 },
      { "name": "Palmira", "hq": false, "left": 29.43, "top": 52.95 },
      { "name": "Pasto", "hq": false, "left": 20.93, "top": 66.1 },
      { "name": "Pereira", "hq": false, "left": 31.52, "top": 47.01 },
      { "name": "Pitalito", "hq": false, "left": 31.52, "top": 62.09 },
      { "name": "Popayán", "hq": false, "left": 25.58, "top": 60.17 },
      { "name": "Quibdó", "hq": false, "left": 23.98, "top": 44.12 },
      { "name": "San Andrés", "hq": false, "left": 18.84, "top": 8.18 },
      { "name": "Sincelejo", "hq": false, "left": 35.69, "top": 25.51 },
      { "name": "Tocancipá", "hq": false, "left": 44.36, "top": 46.53 },
      { "name": "Tumaco", "hq": false, "left": 14.03, "top": 63.86 },
      { "name": "Tunja", "hq": false, "left": 51.41, "top": 43.64 },
      { "name": "Túquerres", "hq": false, "left": 17.56, "top": 66.42 },
      { "name": "Valledupar", "hq": false, "left": 47.89, "top": 21.18 },
      { "name": "Villavicencio", "hq": false, "left": 54.46, "top": 52.3 },
      { "name": "Yopal", "hq": false, "left": 61.36, "top": 44.28 }
    ];

    // Map building variety to cities automatically (1-5 styles)
    const getCityType = (name) => {
        let n = 0; 
        for(let i=0; i<name.length; i++) n += name.charCodeAt(i);
        return (n % 4) + 1; 
    };

    function getBuildingPaths(type) {
        const types = {
            1: { // Standard lab box
                top:   '0,-14  9,-9.5  0,-5  -9,-9.5',
                left:  '-9,-9.5  0,-5  0,3  -9,-1.5',
                right: '9,-9.5  0,-5  0,3  9,-1.5',
                antH: 14
            },
            2: { // Wide flat
                top:   '0,-10  11,-6  0,-2  -11,-6',
                left:  '-11,-6  0,-2  0,2  -11,-2',
                right: '11,-6  0,-2  0,2  11,-2',
                antH: 10
            },
            3: { // Tall narrow
                top:   '0,-18  7,-14  0,-10  -7,-14',
                left:  '-7,-14  0,-10  0,3  -7,-1',
                right: '7,-14  0,-10  0,3  7,-1',
                antH: 18
            },
            4: { // L-shape: main box + left extension
                top:   '0,-13  8,-9  0,-5  -8,-9',
                left:  '-8,-9  0,-5  0,3  -8,-1',
                right: '8,-9  0,-5  0,3  8,-1',
                ext_top:   '-8,-9  -3,-12  -8,-15  -13,-12',
                ext_left:  '-13,-12  -8,-9  -8,-1  -13,-4',
                antH: 13
            }
        };
        return types[type] || types[1];
    }

    function makePoly(points, fill, stroke) {
        const p = document.createElementNS(svgNS, 'polygon');
        p.setAttribute('points', points);
        p.setAttribute('fill', fill);
        p.setAttribute('stroke', stroke || 'rgba(0,0,0,0.1)');
        p.setAttribute('stroke-width', '0.4');
        return p;
    }

    // REALISTIC DOUBLE HELIX DNA
    function makeDoubleHelix(antH, isHQ) {
        const g = document.createElementNS(svgNS, 'g');
        const color1 = isHQ ? '#fde047' : '#22d3ee'; // Amarillo/Dorado o Cian
        const color2 = isHQ ? '#ca8a04' : '#0ea5e9'; // Oscuro complementario
        
        // Mast
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1', '0'); line.setAttribute('y1', -antH);
        line.setAttribute('x2', '0'); line.setAttribute('y2', -antH - 25);
        line.setAttribute('stroke', 'rgba(255,255,255,0.2)');
        line.setAttribute('stroke-width', '0.5');
        g.appendChild(line);

        // HELIX 1 & 2
        function createHelixPath(offset, color, blur) {
            const path = document.createElementNS(svgNS, 'path');
            let d = `M${Math.sin(offset)*3},${-antH-2}`;
            for(let y=0; y<=20; y+=2) {
                let x = Math.sin((y/3) + offset) * 3.5;
                d += ` L${x},${-antH - 2 - y}`;
            }
            path.setAttribute('d', d);
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', color);
            path.setAttribute('stroke-width', isHQ ? '1.4' : '1.1');
            path.setAttribute('stroke-linecap', 'round');
            if(blur) path.style.filter = `blur(${blur}px)`;
            return path;
        }

        g.appendChild(createHelixPath(0, color1, 3)); // Glow
        g.appendChild(createHelixPath(0, color1, 0)); // Line
        g.appendChild(createHelixPath(Math.PI, color2, 3)); // Glow 2
        g.appendChild(createHelixPath(Math.PI, isHQ ? '#fffbeb' : '#f0f9ff', 0)); // Line 2

        // Small dots for base pairs
        for(let py=0; py<=18; py+=4) {
            let x1 = Math.sin((py/3)) * 3.5;
            let x2 = Math.sin((py/3) + Math.PI) * 3.5;
            const l = document.createElementNS(svgNS, 'line');
            l.setAttribute('x1', x1); l.setAttribute('y1', -antH - 2 - py);
            l.setAttribute('x2', x2); l.setAttribute('y2', -antH - 2 - py);
            l.setAttribute('stroke', 'rgba(255,255,255,0.4)');
            l.setAttribute('stroke-width', '0.5');
            g.appendChild(l);
        }

        return g;
    }

    function buildIsometric(type, isHQ) {
        const b = getBuildingPaths(type);
        const g = document.createElementNS(svgNS, 'g');

        // Professional Base Shadow
        const shadow = document.createElementNS(svgNS, 'ellipse');
        shadow.setAttribute('cx','0'); shadow.setAttribute('cy','3');
        shadow.setAttribute('rx', isHQ ? '20' : '15'); shadow.setAttribute('ry', isHQ ? '10' : '7');
        shadow.setAttribute('fill','rgba(0,0,0,0.15)');
        shadow.style.filter = 'blur(4px)';
        g.appendChild(shadow);

        if (isHQ) {
            const h1 = document.createElementNS(svgNS, 'ellipse');
            h1.setAttribute('cx','0'); h1.setAttribute('cy','0');
            h1.setAttribute('rx','24'); h1.setAttribute('ry','12');
            h1.setAttribute('fill','url(#hqGlow)'); h1.setAttribute('opacity','0.4');
            g.appendChild(h1);
        }

        // Use gradients for faces
        const topFill = isHQ ? 'url(#topHQ)' : 'url(#topStd)';
        const sideL   = isHQ ? '#fde047' : '#e0f2fe';
        const sideR   = isHQ ? '#eab308' : '#bae6fd';

        if (type === 4 && b.ext_top) {
            g.appendChild(makePoly(b.ext_top, topFill));
            g.appendChild(makePoly(b.ext_left, sideL));
        }

        g.appendChild(makePoly(b.top,   topFill));
        g.appendChild(makePoly(b.left,  sideL));
        g.appendChild(makePoly(b.right, sideR));

        // Window Details (Realistic Grid)
        function makeWindows(points, color) {
            const p = document.createElementNS(svgNS, 'polygon');
            p.setAttribute('points', points);
            p.setAttribute('fill', color);
            p.setAttribute('opacity', '0.7');
            return p;
        }
        // Simplified window grid simulation
        if (type===1) {
            g.appendChild(makeWindows('-7,-7 -2,-9 -2,-6 -7,-4', '#7dd3fc'));
            g.appendChild(makeWindows('2,-9 7,-7 7,-4 2,-6', '#0ea5e9'));
        }

        // DNA
        g.appendChild(makeDoubleHelix(b.antH, isHQ));
        return g;
    }

    // SVG DEFS for Gradients
    const defs = document.createElementNS(svgNS, 'defs');
    defs.innerHTML = `
        <linearGradient id="topStd" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#f0f9ff;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="topHQ" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#fefce8;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#fef9c3;stop-opacity:1" />
        </linearGradient>
        <radialGradient id="hqGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#f59e0b;stop-opacity:0" />
        </radialGradient>
    `;
    
    // Inject defs globally if not exists
    let globalSvg = document.querySelector('.coverage-map-wrapper svg.global-defs');
    if(!globalSvg) {
        globalSvg = document.createElementNS(svgNS, 'svg');
        globalSvg.setAttribute('class', 'global-defs');
        globalSvg.style.position = 'absolute'; globalSvg.style.width = '0'; globalSvg.style.height = '0';
        globalSvg.appendChild(defs);
        wrapper.appendChild(globalSvg);
    }

    pinsLayer.innerHTML = '';

    locations.forEach((loc) => {
        let fullName = loc.hq ? `${loc.name} ★ Sede Principal` : loc.name;
        let type = getCityType(loc.name);
        
        const pinDiv = document.createElement('div');
        pinDiv.className = `map-pin ${loc.hq ? 'pin-hq' : ''}`;
        pinDiv.style.left = `${loc.left}%`;
        pinDiv.style.top = `${loc.top}%`;
        pinDiv.setAttribute('data-city', fullName);
        pinDiv.style.cssText += 'background:none; border:none; box-shadow:none; width:0; height:0; animation:none;';

        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('viewBox', '-40 -60 80 80'); 
        svg.style.width = loc.hq ? '90px' : '65px';
        svg.style.height = loc.hq ? '110px' : '85px';
        svg.style.overflow = 'visible';
        svg.style.position = 'absolute';
        svg.style.left = '50%'; svg.style.top = '50%';
        svg.style.transform = 'translate(-50%, -85%)';
        svg.style.pointerEvents = 'none';
        svg.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        const building = buildIsometric(type, loc.hq);
        svg.appendChild(building);
        pinDiv.appendChild(svg);
        
        pinDiv.addEventListener('mouseenter', () => {
            svg.style.transform = 'translate(-50%, -85%) scale(1.2) translateY(-10px)';
            tooltip.textContent = fullName;
            tooltip.classList.add('visible');
        });
        pinDiv.addEventListener('mousemove', e => {
            const r = wrapper.getBoundingClientRect();
            tooltip.style.left = (e.clientX - r.left + 15) + 'px';
            tooltip.style.top  = (e.clientY - r.top  - 40) + 'px';
        });
        pinDiv.addEventListener('mouseleave', () => {
            svg.style.transform = 'translate(-50%, -85%) scale(1)';
            tooltip.classList.remove('visible');
        });

        pinsLayer.appendChild(pinDiv);
    });
})();

