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
   COBERTURA NACIONAL v2 - Isometric 3D Buildings
   Renders SVG polygon buildings with 3 faces (top/left/right)
   Geographic coordinates: x=(79-lon)*27.87+30, y=(12.5-lat)*29.34+15
   ========================================= */
(function() {
    const svgNS = "http://www.w3.org/2000/svg";
    const container = document.getElementById('city-buildings');
    const tooltip = document.getElementById('mapTooltip2');
    const wrapper = document.querySelector('.coverage-map-wrapper');
    if (!container) return;

    // City data: [name, svgX, svgY, type(1-5), isHQ]
    // type: 1=standard, 2=wide, 3=tall, 4=l-shape, 5=double
    const cities = [
        ['Medellín ★ Sede Principal', 126, 199, 1, true],
        ['Bogotá',                    167, 244, 2, false],
        ['Barranquilla',              147,  60, 3, false],
        ['Cali',                       99, 281, 1, false],
        ['Cartagena',                 127,  77, 4, false],
        ['Cúcuta',                    211, 150, 2, false],
        ['Bucaramanga',               194, 173, 5, false],
        ['Manizales',                 127, 233, 3, false],
        ['Armenia',                   123, 249, 4, false],
        ['Pereira',                   116, 241, 2, false],
        ['Ibagué',                    135, 252, 5, false],
        ['Neiva',                     134, 296, 1, false],
        ['Pasto',                      78, 346, 3, false],
        ['Popayán',                    97, 310, 2, false],
        ['Montería',                  117, 125, 4, false],
        ['Sincelejo',                 130, 109, 5, false],
        ['Valledupar',                190,  74, 1, false],
        ['Villavicencio',             179, 260, 3, false],
        ['Yopal',                     214, 225, 4, false],
        ['Tunja',                     187, 219, 2, false],
        ['Quibdó',                     96, 215, 5, false],
        ['Tumaco',                     35, 328, 1, false],
        ['Ipiales',                    68, 358, 3, false],
        ['Túquerres',                  68, 350, 4, false],
        ['Arauca',                    260, 174, 2, false],
        ['Mocoa',                      96, 348, 5, false],
        ['Pitalito',                  107, 328, 1, false],
        ['Palmira',                   105, 278, 3, false],
        ['Apartadó',                   96, 151, 2, false],
        ['Caucasia',                  136, 147, 4, false],
        ['Cajicá',                    169, 237, 5, false],
        ['Tocancipá',                 172, 236, 1, false],
        ['Granada',                   177, 278, 2, false],
        ['Magangué',                  148, 111, 3, false],
        ['Montelíbano',               130, 148, 4, false],
        ['Monterrey',                 200, 238, 5, false],
        ['Acacías',                   176, 265, 1, false],
        ['San Andrés',                 48, 168, 2, false],
    ];

    // Building type definitions — isometric SVG polygons at origin (0,0)
    // Each type: { top, left, right } as polygon point strings
    // Top face: lightest, Left face: medium, Right face: darkest
    function getBuildingPaths(type) {
        const T = { // top colors
            fill: '#eef5fc', stroke: '#7aafd4'
        };
        const L = { fill: '#c8dff3', stroke: '#7aafd4' };
        const R = { fill: '#a5c8e8', stroke: '#7aafd4' };

        const types = {
            1: { // Standard lab box
                top:   '0,-14  9,-9.5  0,-5  -9,-9.5',
                left:  '-9,-9.5  0,-5  0,3  -9,-1.5',
                right: '9,-9.5  0,-5  0,3  9,-1.5',
                winL:  '-6,-6  -2,-8  -2,-4  -6,-2',
                winR:  '3,-8  7,-10  7,-6  3,-4',
                antH: 14
            },
            2: { // Wide flat
                top:   '0,-10  11,-6  0,-2  -11,-6',
                left:  '-11,-6  0,-2  0,2  -11,-2',
                right: '11,-6  0,-2  0,2  11,-2',
                winL:  '-7,-4  -3,-6  -3,-3  -7,-1',
                winR:  '3,-6  8,-8  8,-5  3,-3',
                antH: 10
            },
            3: { // Tall narrow
                top:   '0,-18  7,-14  0,-10  -7,-14',
                left:  '-7,-14  0,-10  0,3  -7,-1',
                right: '7,-14  0,-10  0,3  7,-1',
                winL:  '-5,-11  -1,-13  -1,-8  -5,-6',
                winR:  '1,-13  5,-15  5,-10  1,-8',
                antH: 18
            },
            4: { // L-shape: main box + left extension
                top:   '0,-13  8,-9  0,-5  -8,-9',
                left:  '-8,-9  0,-5  0,3  -8,-1',
                right: '8,-9  0,-5  0,3  8,-1',
                ext_top:   '-8,-9  -3,-12  -8,-15  -13,-12',
                ext_left:  '-13,-12  -8,-9  -8,-1  -13,-4',
                winL:  '-5,-7  -2,-9  -2,-5  -5,-3',
                winR:  '2,-9  6,-11  6,-7  2,-5',
                antH: 13
            },
            5: { // Double: two connected boxes
                top:   '0,-12  8,-8  0,-4  -8,-8',
                left:  '-8,-8  0,-4  0,2  -8,-2',
                right: '8,-8  0,-4  0,2  8,-2',
                sec_top:   '5,-16  11,-13  5,-10  -1,-13',
                sec_left:  '-1,-13  5,-10  5,2  -1,-1',
                sec_right: '11,-13  5,-10  5,2  11,-1',
                winR:  '2,-8  6,-10  6,-6  2,-4',
                antH: 12
            }
        };
        return types[type] || types[1];
    }

    function makePoly(points, fill, stroke, opacity) {
        const p = document.createElementNS(svgNS, 'polygon');
        p.setAttribute('points', points);
        p.setAttribute('fill', fill);
        p.setAttribute('stroke', stroke || '#7aafd4');
        p.setAttribute('stroke-width', '0.6');
        if (opacity) p.setAttribute('opacity', opacity);
        return p;
    }

    function makeAntenna(antH, isHQ) {
        const g = document.createElementNS(svgNS, 'g');
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1', '0'); line.setAttribute('y1', -antH);
        line.setAttribute('x2', '0'); line.setAttribute('y2', -antH - 8);
        line.setAttribute('stroke', isHQ ? '#f5c842' : '#38bdf8');
        line.setAttribute('stroke-width', isHQ ? '1.2' : '0.9');
        g.appendChild(line);
        // DNA double helix suggestion (two arcs)
        const dna = document.createElementNS(svgNS, 'path');
        const y0 = -antH - 8, y1 = -antH - 5, y2 = -antH - 2;
        dna.setAttribute('d', `M-2,${y0} Q0,${y0-3} 2,${y0} Q0,${y0+3} -2,${y0} M-1.5,${y1} Q0,${y1-2.5} 1.5,${y1}`);
        dna.setAttribute('fill', 'none');
        dna.setAttribute('stroke', isHQ ? '#f5c842' : '#38bdf8');
        dna.setAttribute('stroke-width', isHQ ? '1' : '0.7');
        g.appendChild(dna);
        return g;
    }

    function buildIsometric(type, isHQ) {
        const b = getBuildingPaths(type);
        const g = document.createElementNS(svgNS, 'g');

        // HQ golden halo
        if (isHQ) {
            const h1 = document.createElementNS(svgNS, 'ellipse');
            h1.setAttribute('cx','0'); h1.setAttribute('cy','0');
            h1.setAttribute('rx','16'); h1.setAttribute('ry','8');
            h1.setAttribute('fill','#f5c842'); h1.setAttribute('opacity','0.2');
            h1.setAttribute('class','hq-halo-outer');
            g.appendChild(h1);
        }

        // Extension for L-shape (type 4)
        if (type === 4 && b.ext_top) {
            g.appendChild(makePoly(b.ext_top, '#ddeefa', '#7aafd4'));
            g.appendChild(makePoly(b.ext_left, '#b8d4ed', '#7aafd4'));
        }
        // Second section for double (type 5)
        if (type === 5 && b.sec_top) {
            g.appendChild(makePoly(b.sec_top, '#deeefa', '#7aafd4'));
            g.appendChild(makePoly(b.sec_left, '#b5d2ec', '#7aafd4'));
            g.appendChild(makePoly(b.sec_right, '#9bc2e0', '#7aafd4'));
        }

        // Main building faces
        g.appendChild(makePoly(b.top,   isHQ ? '#fff9e8' : '#eef5fc', '#7aafd4'));
        g.appendChild(makePoly(b.left,  isHQ ? '#f5e5a0' : '#c8dff3', '#7aafd4'));
        g.appendChild(makePoly(b.right, isHQ ? '#e8cc72' : '#a5c8e8', '#7aafd4'));

        // Windows
        if (b.winL) g.appendChild(makePoly(b.winL, '#60a5fa', null, '0.75'));
        if (b.winR) g.appendChild(makePoly(b.winR, '#3b82f6', null, '0.65'));

        // DNA antenna
        g.appendChild(makeAntenna(b.antH, isHQ));

        // City label for HQ
        if (isHQ) {
            const txt = document.createElementNS(svgNS, 'text');
            txt.setAttribute('y', '14');
            txt.setAttribute('text-anchor', 'middle');
            txt.setAttribute('class', 'city-label hq-label');
            txt.textContent = 'Medellín ★';
            g.appendChild(txt);
        }
        return g;
    }

    cities.forEach(([name, cx, cy, type, isHQ]) => {
        const group = document.createElementNS(svgNS, 'g');
        group.setAttribute('class', 'city-pin' + (isHQ ? ' hq-pin' : ''));
        group.setAttribute('transform', `translate(${cx},${cy})`);
        group.setAttribute('data-city', name);

        const building = buildIsometric(type, isHQ);
        group.appendChild(building);

        // Tooltip interactions
        if (tooltip && wrapper) {
            group.addEventListener('mouseenter', () => {
                tooltip.textContent = name;
                tooltip.classList.add('visible');
            });
            group.addEventListener('mousemove', (e) => {
                const rect = wrapper.getBoundingClientRect();
                tooltip.style.left = (e.clientX - rect.left + 14) + 'px';
                tooltip.style.top  = (e.clientY - rect.top  - 35) + 'px';
            });
            group.addEventListener('mouseleave', () => {
                tooltip.classList.remove('visible');
            });
        }

        container.appendChild(group);
    });
})();

(function() {
    const tooltip = document.getElementById('mapTooltip');
    const pins = document.querySelectorAll('.city-pin');
    if (!tooltip || !pins.length) return;

    pins.forEach(pin => {
        const cityName = pin.getAttribute('data-city');
        if (!cityName) return;

        pin.addEventListener('mouseenter', (e) => {
            tooltip.textContent = cityName;
            tooltip.classList.add('visible');
        });

        pin.addEventListener('mousemove', (e) => {
            const wrapper = document.querySelector('.coverage-map-wrapper');
            if (!wrapper) return;
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left + 12;
            const y = e.clientY - rect.top - 30;
            tooltip.style.left = x + 'px';
            tooltip.style.top = y + 'px';
        });

        pin.addEventListener('mouseleave', () => {
            tooltip.classList.remove('visible');
        });
    });
})();
