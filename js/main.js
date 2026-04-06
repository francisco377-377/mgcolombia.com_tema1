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

    function makePoly(points, fill, stroke, strokeW = 0.5) {
        const p = document.createElementNS(svgNS, 'polygon');
        p.setAttribute('points', points);
        p.setAttribute('fill', fill);
        if (stroke) {
            p.setAttribute('stroke', stroke);
            p.setAttribute('stroke-width', strokeW);
            p.setAttribute('stroke-linejoin', 'round');
        }
        return p;
    }

    function buildOrbMarker(isHQ) {
        const g = document.createElementNS(svgNS, 'g');
        const coreSize = isHQ ? 16 : 12;
        const colorMain = isHQ ? '#093c8d' : '#0ea5e9';
        
        // 1. PULSING AURA (Subtle breathing effect)
        const aura = document.createElementNS(svgNS, 'circle');
        aura.setAttribute('r', coreSize);
        aura.setAttribute('fill', colorMain);
        aura.setAttribute('opacity', '0.3');
        aura.style.animation = 'orbPulse 3s infinite ease-out';
        g.appendChild(aura);

        // 2. CORE ORB (Gradient & Stroke)
        const core = document.createElementNS(svgNS, 'circle');
        core.setAttribute('r', coreSize);
        core.setAttribute('fill', `url(#orbGrad_${isHQ?'hq':'al'})`);
        core.setAttribute('stroke', '#fff');
        core.setAttribute('stroke-width', '1.5');
        g.appendChild(core);

        // 3. INNER DNA ICON
        const dna = document.createElementNS(svgNS, 'g');
        dna.setAttribute('transform', `scale(${isHQ ? 0.45 : 0.35})`);
        dna.innerHTML = `
            <path d="M-8,-10 C-4,-10 4,-5 8,0 C4,5 -4,10 -8,10" fill="none" stroke="#fff" stroke-width="2.5" />
            <path d="M8,-10 C4,-10 -4,-5 -8,0 C-4,5 4,10 8,10" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2.5" />
            <circle cx="0" cy="0" r="2" fill="#fff"/>
        `;
        g.appendChild(dna);

        return g;
    }

    function makeDoubleHelix(antH, isHQ) {
        const g = document.createElementNS(svgNS, 'g');
        const c1 = isHQ ? '#093c8d' : '#0ea5e9'; // HQ is Deep Blue
        const c2 = isHQ ? '#22d3ee' : '#34d399'; // Contrast
        
        // Glow Filter
        const glowId = `glow_${Math.random().toString(36).substr(2, 5)}`;
        const defs = document.createElementNS(svgNS, 'defs');
        defs.innerHTML = `<filter id="${glowId}"><feGaussianBlur stdDeviation="1.5" result="blur"/><feComposite in="SourceGraphic" in2="blur" operator="over"/></filter>`;
        g.appendChild(defs);

        const createStrand = (offset, color) => {
            const strandG = document.createElementNS(svgNS, 'g');
            strandG.setAttribute('filter', `url(#${glowId})`);
            
            for(let y=0; y<=18; y+=2) {
                let x = Math.sin((y/3) + offset) * 3.5;
                const dot = document.createElementNS(svgNS, 'circle');
                dot.setAttribute('cx', x);
                dot.setAttribute('cy', -antH - 2 - y);
                dot.setAttribute('r', 1.2 - (y/25)); // Tapering
                dot.setAttribute('fill', color);
                strandG.appendChild(dot);
                
                // Connecting bar
                if (offset === 0) {
                    const bar = document.createElementNS(svgNS, 'line');
                    const x2 = Math.sin((y/3) + Math.PI) * 3.5;
                    bar.setAttribute('x1', x); bar.setAttribute('y1', -antH - 2 - y);
                    bar.setAttribute('x2', x2); bar.setAttribute('y2', -antH - 2 - y);
                    bar.setAttribute('stroke', 'rgba(15,23,42,0.1)');
                    bar.setAttribute('stroke-width', '0.3');
                    g.appendChild(bar);
                }
            }
            return strandG;
        };
        g.appendChild(createStrand(0, c1));
        g.appendChild(createStrand(Math.PI, c2));
        return g;
    }

    // Global SVG Defs
    const globalSvg = document.createElementNS(svgNS, 'svg');
    globalSvg.style.cssText = 'position:absolute; width:0; height:0;';
    globalSvg.innerHTML = `
        <defs>
            <radialGradient id="orbGrad_hq" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#0ea5e9"/>
                <stop offset="100%" stop-color="#093c8d"/>
            </radialGradient>
            <radialGradient id="orbGrad_al" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#38bdf8"/>
                <stop offset="100%" stop-color="#0ea5e9"/>
            </radialGradient>
        </defs>
    `;
    wrapper.appendChild(globalSvg);

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
            
            // 1. Map Pin — ANCLA CERO + PIN HTML (zonarespetada)
            const pinDiv = document.createElement('div');
            pinDiv.className = `map-pin ${loc.hq ? 'pin-hq' : ''}`;
            pinDiv.style.left = `${loc.left}%`;
            pinDiv.style.top = `${loc.top}%`;

            // 10 pairs de doble hélice
            const pairs = Array.from({length:10}, (_,i) => `<div class="base-pair" style="--i:${i};"></div>`).join('');

            // Estructura HTML del nuevo pin (crece hacia ARRIBA desde el punto 0,0 del ancla)
            pinDiv.innerHTML = `
                <div class="pin-geometry-container pin-geom-active">
                    <div class="floor-shadow"></div>
                    <div class="radar-ring"></div>
                    <div class="floor-dot"></div>
                    <div class="pin-wrapper">
                        <div class="pin-aura"></div>
                        <div class="pin-visual-gota">
                            <div class="pin-inner-content">
                                <div class="dna-core">${pairs}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="city-floating-label">${loc.name}</div>
            `;

            pinsLayer.appendChild(pinDiv);
            const pinWrapper = pinDiv.querySelector('.pin-wrapper');
            pinMap.set(id, { pin: pinDiv, pinWrapper, loc: loc });

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

            // Pin Events (se capturan en .pin-wrapper que tiene pointer-events:all)
            if (pinWrapper) {
                pinWrapper.onmouseenter = () => highlightCity(id, true);
                pinWrapper.onmouseleave = () => highlightCity(id, false);
            }
        });
    }

    function highlightCity(id, active) {
        const data = pinMap.get(id);
        if(!data) return;
        if(active) {
            if (data.pinWrapper) {
                data.pinWrapper.style.transform = 'scale(1.25) translateY(-18px)';
                data.pinWrapper.style.filter = 'drop-shadow(0 0 12px rgba(9, 60, 141, 0.9))';
            }
            data.listItem.classList.add('active');
            data.listItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            if (data.pinWrapper) {
                data.pinWrapper.style.transform = '';
                data.pinWrapper.style.filter = '';
            }
            data.listItem.classList.remove('active');
        }
    }

    function focusCity(id) {
        const data = pinMap.get(id);
        highlightCity(id, true);
        setTimeout(() => highlightCity(id, false), 2000);
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

