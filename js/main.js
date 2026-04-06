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
   COBERTURA NACIONAL v4 - PREMIUM REDESIGN
   ========================================= */
(function() {
    const svgNS = "http://www.w3.org/2000/svg";
    const pinsLayer = document.getElementById('map-pins-layer');
    const cityListContainer = document.getElementById('cityListContainer');
    const searchInput = document.getElementById('citySearchInput');
    const wrapper = document.querySelector('.coverage-map-wrapper');
    if (!pinsLayer || !wrapper || !cityListContainer || !searchInput) return;

    // =========================================================================================
    // 🛑 ZONA DE RESTRICCIÓN PARA IA 🛑
    // Las coordenadas (const locations) están ahora protegidas en js/map-data.js.
    // ¡¡¡NO AÑADIR COORDENADAS AQUÍ, EL ARCHIVO GLOBAL "locations" SE CARGA ANTES MÍO!!!
    // =========================================================================================
    // =========================================================================================
    // 🎨 ZONA EXCLUSIVA PARA EDICIÓN DE PINES (IA: SOLO MODIFICA DESDE AQUÍ) 🎨
    // Si el usuario pide cambiar el diseño, el tamaño, el color o la animación del pin
    // SÓLO debes modificar las siguientes funciones (buildOrbMarker, etc.)
    // El punto de anclaje visual (la coordenada 0,0) está forzado en CSS en `.map-pin`.
    // =========================================================================================


    const normalize = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    // =========================================================================================
    // 🎨 ZONA EXCLUSIVA PARA EDICIÓN DE PINES - EDIFICIO 3D ISOMÉTRICO
    // Para cambiar el diseño visual modifica solo los strings PIN_HQ_SVG y PIN_CITY_SVG.
    // NO tocar renderMap ni highlightCity para no dañar coordenadas.
    // =========================================================================================

    // PIN SEDE PRINCIPAL (HQ) — Edificio grande con torre y antena (azul marca)
    // viewBox recortado en y=175 para que las elipses del suelo queden en la base del SVG (sin flotamiento)
    const PIN_HQ_SVG = `<svg class="pin-building" width="70" height="88" viewBox="0 0 140 175" xmlns="http://www.w3.org/2000/svg" overflow="visible">
      <ellipse cx="70" cy="157" rx="56" ry="14" fill="none" stroke="#007799" stroke-width="0.8" opacity="0.25"/>
      <ellipse cx="70" cy="157" rx="42" ry="10" fill="none" stroke="#0099bb" stroke-width="1" opacity="0.4"/>
      <ellipse cx="70" cy="157" rx="28" ry="7" fill="none" stroke="#00bbdd" stroke-width="1.2" opacity="0.6"/>
      <ellipse cx="70" cy="156" rx="32" ry="6" fill="#003344" opacity="0.35"/>
      <polygon points="100,155 116,143 116,90 100,102" fill="#004060" stroke="#003355" stroke-width="0.5"/>
      <polygon points="36,155 100,155 100,102 36,110" fill="#005f80" stroke="#004466" stroke-width="0.5"/>
      <polygon points="36,110 100,102 116,90 52,98" fill="#0088bb" stroke="#005577" stroke-width="0.5"/>
      <rect x="43" y="114" width="12" height="8" rx="1" fill="rgba(0,200,255,0.2)" stroke="#00bbdd" stroke-width="0.6"/>
      <rect x="60" y="113" width="12" height="8" rx="1" fill="rgba(0,200,255,0.22)" stroke="#00bbdd" stroke-width="0.6"/>
      <rect x="77" y="112" width="12" height="8" rx="1" fill="rgba(0,200,255,0.18)" stroke="#00bbdd" stroke-width="0.6"/>
      <rect x="43" y="127" width="12" height="8" rx="1" fill="rgba(0,180,230,0.15)" stroke="#0099bb" stroke-width="0.5"/>
      <rect x="60" y="127" width="12" height="8" rx="1" fill="rgba(57,255,20,0.15)" stroke="#39ff14" stroke-width="0.5"/>
      <rect x="77" y="126" width="12" height="8" rx="1" fill="rgba(0,180,230,0.15)" stroke="#0099bb" stroke-width="0.5"/>
      <rect x="62" y="139" width="10" height="16" rx="1" fill="rgba(0,50,80,0.8)" stroke="#00bbdd" stroke-width="0.7"/>
      <polygon points="78,98 84,94 84,73 78,77" fill="#004060" stroke="#003355" stroke-width="0.5"/>
      <polygon points="56,103 78,98 78,77 56,82" fill="#006688" stroke="#004466" stroke-width="0.5"/>
      <polygon points="56,82 78,77 84,73 62,78" fill="#0099cc" stroke="#005577" stroke-width="0.5"/>
      <line x1="71" y1="58" x2="71" y2="77" stroke="#00ccee" stroke-width="1.2" opacity="0.9"/>
      <circle cx="71" cy="57" r="3" fill="#00e5ff" opacity="0.95"/>
      <text x="68" y="109.8" text-anchor="middle" font-size="3.2" fill="#00e5ff" font-family="monospace">MG LAB</text>
    </svg>`;

    // PIN CIUDAD ALIADA — Edificio compacto en verde esmeralda
    // viewBox recortado en y=175 para que las elipses queden en la base (sin flotamiento)
    const PIN_CITY_SVG = `<svg class="pin-building" width="44" height="55" viewBox="0 0 140 175" xmlns="http://www.w3.org/2000/svg" overflow="visible">
      <ellipse cx="70" cy="157" rx="42" ry="10" fill="none" stroke="#00cc66" stroke-width="1.2" opacity="0.45"/>
      <ellipse cx="70" cy="156" rx="26" ry="6" fill="#0a3320" opacity="0.35"/>
      <polygon points="100,155 116,145 116,110 100,120" fill="#0a4028" stroke="#062a18" stroke-width="0.5"/>
      <polygon points="36,155 100,155 100,120 36,128" fill="#0f5c3a" stroke="#0a3d25" stroke-width="0.5"/>
      <polygon points="36,128 100,120 116,110 52,116" fill="#1a8a55" stroke="#0f6040" stroke-width="0.5"/>
      <rect x="44" y="132" width="11" height="7" rx="1" fill="rgba(0,255,128,0.18)" stroke="#00dd66" stroke-width="0.6"/>
      <rect x="60" y="131" width="11" height="7" rx="1" fill="rgba(0,255,128,0.22)" stroke="#00dd66" stroke-width="0.6"/>
      <rect x="76" y="130" width="11" height="7" rx="1" fill="rgba(0,220,100,0.15)" stroke="#00bb55" stroke-width="0.5"/>
      <rect x="63" y="143" width="9" height="12" rx="1" fill="rgba(5,30,15,0.85)" stroke="#00cc55" stroke-width="0.7"/>
      <line x1="70" y1="106" x2="70" y2="116" stroke="#00ee77" stroke-width="1" opacity="0.8"/>
      <circle cx="70" cy="105" r="2.5" fill="#00ff88" opacity="0.9"/>
    </svg>`;


    const pinMap = new Map();

    function renderMap() {
        pinsLayer.innerHTML = '';
        cityListContainer.innerHTML = '';

        // Draw Islands (San Andrés & Providencia)
        const drawIsland = (l, t, w, h, d) => {
            const svg = document.createElementNS(svgNS, 'svg');
            svg.setAttribute('viewBox', '0 0 100 100');
            svg.style.cssText = `position:absolute; left:${l}%; top:${t}%; width:${w}px; height:${h}px; transform:translate(-50%,-50%); pointer-events:none; z-index:-1;`;
            const path = document.createElementNS(svgNS, 'path');
            path.setAttribute('d', d);
            path.setAttribute('class', 'island-shape');
            svg.appendChild(path);
            pinsLayer.appendChild(svg);
        };
        // San Andrés silhouette (Relative to calibrated point)
        drawIsland(18.84, 8.18, 45, 45, "M30,20 C50,10 80,30 70,60 C60,90 30,90 20,60 C10,30 30,30 30,20 Z");
        // Providencia silhouette (North-East)
        drawIsland(20.5, 5.2, 25, 25, "M40,30 C60,10 90,40 70,70 C50,90 20,70 30,40 C40,20 40,30 40,30 Z");

        locations.forEach((loc) => {
            const id = normalize(loc.name);
            const fullName = loc.hq ? `${loc.name} ★ Sede Principal` : loc.name;
            
            // 1. Map Pin — ANCLA CERO + SVG Edificio (coordenadas intactas)
            const pinDiv = document.createElement('div');
            pinDiv.className = `map-pin ${loc.hq ? 'pin-hq' : ''}`;
            pinDiv.style.left = `${loc.left}%`;
            pinDiv.style.top = `${loc.top}%`;

            pinDiv.innerHTML = (loc.hq ? PIN_HQ_SVG : PIN_CITY_SVG) +
                `<div class="city-floating-label">${loc.name}</div>`;

            pinsLayer.appendChild(pinDiv);
            const pinSvg = pinDiv.querySelector('svg.pin-building');
            pinMap.set(id, { pin: pinDiv, pinSvg, loc: loc });

            // 2. Sidebar Item
            const cityItem = document.createElement('div');
            cityItem.className = 'city-item';
            cityItem.innerHTML = `
                <div class="city-item-name">
                    <i class="fa-solid ${loc.hq ? 'fa-star text-warning' : 'fa-location-dot text-primary'}"></i>
                    ${loc.name}
                </div>
                <div class="city-item-type">${loc.hq ? 'Principal' : 'Aliado'}</div>
            `;
            cityItem.onclick = () => focusCity(id);
            cityListContainer.appendChild(cityItem);
            pinMap.get(id).listItem = cityItem;

            // Pin Events — el SVG captura los eventos (pointer-events:all)
            if (pinSvg) {
                pinSvg.onmouseenter = () => highlightCity(id, true, false); // Don't scroll list on hover
                pinSvg.onmouseleave = () => highlightCity(id, false);
                pinSvg.onclick = (e) => {
                    e.stopPropagation();
                    focusCity(id, false); // Click on pin shouldn't scroll the list
                };
            }
        });
    }

    function highlightCity(id, active, scrollList = true) {
        const data = pinMap.get(id);
        if(!data) return;
        if(active) {
            if (data.pinSvg) {
                data.pinSvg.style.transform = 'translateX(-50%) scale(1.25) translateY(-6px)';
                data.pinSvg.style.filter = 'drop-shadow(0 4px 16px rgba(0,180,230,0.75))';
            }
            data.listItem.classList.add('active');
            if (scrollList && data.listItem) {
                const container = cityListContainer;
                const item = data.listItem;
                const targetTop = item.offsetTop - (container.clientHeight / 2) + (item.clientHeight / 2);
                container.scrollTo({ top: targetTop, behavior: 'smooth' });
            }
        } else {
            if (data.pinSvg) {
                data.pinSvg.style.transform = 'translateX(-50%)';
                data.pinSvg.style.filter = 'none';
            }
            data.listItem.classList.remove('active');
        }
    }

    function focusCity(id, scrollList = true) {
        const data = pinMap.get(id);
        if(!data) return;
        highlightCity(id, true, scrollList);
        setTimeout(() => highlightCity(id, false), 2500);
    }

    searchInput.addEventListener('input', (e) => {
        const term = normalize(e.target.value);
        locations.forEach(loc => {
            const id = normalize(loc.name);
            const data = pinMap.get(id);
            const match = id.includes(term);
            
            data.listItem.classList.toggle('hidden', !match);
            data.pin.style.opacity = match ? '1' : '0.15';
            data.pin.style.pointerEvents = match ? 'all' : 'none';
            data.pin.style.filter = match ? 'none' : 'grayscale(0.8)';
            data.pin.style.transition = 'all 0.4s ease';
        });
    });

    renderMap();
})();

