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
    initTransparencyStats();
    initTransparencyDNA();
    initTechServices();
});

function initTechServices() {
    const cards = document.querySelectorAll('.service-card-tech');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
            const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });
}

function initTransparencyDNA() {
    const canvas = document.getElementById('transparency-canvas');
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

        // Massive Helix matching Benefits section EXACTLY
        const isMobile = window.innerWidth < 768;
        const amplitude = isMobile ? 120 : 350; 
        const spacing = isMobile ? 40 : 80;     

        const diag = Math.sqrt(width * width + height * height);
        const numPoints = Math.ceil(diag / spacing) + 10;

        ctx.lineWidth = isMobile ? 2 : 4;

        ctx.save();
        ctx.translate(width / 2, height / 2); 

        const tiltAngle = Math.atan2(height, width);
        ctx.rotate(-tiltAngle * 0.7); 

        const startY = -diag / 2 - 200; 

        for (let i = 0; i < numPoints; i++) {
            const y = startY + i * spacing;
            const angle = phase + i * 0.12; 

            const x1 = Math.sin(angle) * amplitude;
            const x2 = Math.sin(angle + Math.PI) * amplitude;

            const z1 = Math.cos(angle);
            const z2 = Math.cos(angle + Math.PI);

            const size1 = (z1 + 1.5) * (isMobile ? 5 : 12); 
            const size2 = (z2 + 1.5) * (isMobile ? 5 : 12);

            const alpha1 = ((z1 + 1.5) / 2.5) * 0.22;
            const alpha2 = ((z2 + 1.5) / 2.5) * 0.22;

            ctx.beginPath();
            ctx.moveTo(x1, y);
            ctx.lineTo(x2, y);
            ctx.strokeStyle = `rgba(9, 60, 141, ${Math.min(alpha1, alpha2) * 0.5})`;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(x1, y, size1, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(9, 60, 141, ${alpha1})`;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(x2, y, size2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(9, 60, 141, ${alpha2})`;
            ctx.fill();
        }
        ctx.restore();
        
        phase += 0.012; // Matching exact speed
        requestAnimationFrame(draw);
    }
    setTimeout(() => { resize(); draw(); }, 150);
}

function initTransparencyStats() {
    const section = document.querySelector('.transparency-section');
    if (!section) return;

    const values = section.querySelectorAll('.stat-value');
    const bars = section.querySelectorAll('.progress-fill');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate numbers
                values.forEach(val => {
                    const target = parseFloat(val.getAttribute('data-target'));
                    let current = 0;
                    const duration = 1500; 
                    const jump = 10; // User requested increments of 10
                    const interval = (duration / (target / jump)); 

                    const timer = setInterval(() => {
                        current += jump;
                        if (current < target) {
                            val.textContent = current.toFixed(target % 1 === 0 ? 0 : 3) + '%';
                        } else {
                            val.textContent = target + '%';
                            clearInterval(timer);
                        }
                    }, interval);
                });

                // Animate bars
                bars.forEach(bar => {
                    bar.style.width = bar.getAttribute('data-width');
                });

                observer.unobserve(section);
            }
        });
    }, { threshold: 0.05 }); // Lower threshold to trigger sooner on mobile devices

    observer.observe(section);
}

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

    // =========================================================================================
    // 🎨 MODELOS ARQUITECTÓNICOS 3D (SVG HIGH-FIDELITY)
    // =========================================================================================

    const SVG_PIN_HQ = `<svg class="pin-building" viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="roofTopHQ" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="#dde7ec"/></linearGradient>
        <linearGradient id="frontWallHQ" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="#dbe5ea"/></linearGradient>
        <linearGradient id="sideWallHQ" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#d5e0e6"/><stop offset="100%" stop-color="#b9c7d0"/></linearGradient>
        <linearGradient id="glassMainHQ" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e8fbff"/><stop offset="100%" stop-color="#8ec4d8"/></linearGradient>
        <radialGradient id="neonBaseHQ" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#d1e0f5" stop-opacity="0.92"/><stop offset="100%" stop-color="#d1e0f5" stop-opacity="0"/></radialGradient>
        <filter id="neonBlurHQ" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="4"/></filter>
      </defs>
      <g class="pin-hq-soft"><ellipse cx="140" cy="210" rx="52" ry="14" fill="url(#neonBaseHQ)" filter="url(#neonBlurHQ)"/></g>
      <path d="M70 176 L145 138 L214 176 L140 214 Z" fill="#f7fcfd"/><path d="M70 176 L70 191 L140 230 L140 214 Z" fill="#c6dbe0"/><path d="M214 176 L214 191 L140 230 L140 214 Z" fill="#b7d0d6"/>
      <g><path d="M150 74 L188 93 L188 164 L150 184 Z" fill="url(#sideWallHQ)"/><path d="M101 93 L150 74 L150 184 L101 164 Z" fill="url(#frontWallHQ)"/><path d="M101 93 L150 74 L188 93 L139 112 Z" fill="url(#roofTopHQ)"/>
      <path d="M113 100 L144 88 L144 172 L113 160 Z" fill="url(#glassMainHQ)"/><path d="M150 88 L180 103 L180 170 L150 185 Z" fill="url(#glassMainHQ)" opacity="0.9"/>
      <path class="pin-hq-edge" d="M113 160 L113 100 L144 88" fill="none" stroke="#d1e0f5" stroke-width="2" filter="url(#neonBlurHQ)"/></g>
    </svg>`;

    const SVG_PIN_1 = `<svg class="pin-building" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="glassBlue1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#dff8ff"/><stop offset="100%" stop-color="#8ec8d9"/></linearGradient>
        <radialGradient id="neonBase1" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#d1e0f5" stop-opacity="0.9"/><stop offset="100%" stop-color="#d1e0f5" stop-opacity="0"/></radialGradient>
        <filter id="neonBlur1" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3"/></filter>
      </defs>
      <g class="pin-1-soft"><ellipse cx="116" cy="168" rx="38" ry="10" fill="url(#neonBase1)" filter="url(#neonBlur1)"/></g>
      <path d="M64 146 L117 121 L168 146 L116 172 Z" fill="#f4fbfc"/><path d="M64 146 L64 158 L116 184 L116 172 Z" fill="#b6d3d7"/><path d="M168 146 L168 158 L116 184 L116 172 Z" fill="#8eb8bc"/>
      <g><path d="M126 82 L154 96 L154 145 L126 159 Z" fill="#d8e3e8"/><path d="M85 96 L126 82 L126 159 L85 145 Z" fill="#ffffff"/><path d="M85 96 L126 82 L154 96 L113 110 Z" fill="#ffffff"/>
      <path d="M95 102 L121 93 L121 149 L95 140 Z" fill="url(#glassBlue1)"/><path d="M126 93 L147 103 L147 146 L126 156 Z" fill="url(#glassBlue1)" opacity="0.9"/>
      <path class="pin-1-edge" d="M95 140 L95 102 L121 93" fill="none" stroke="#d1e0f5" stroke-width="1.5" filter="url(#neonBlur1)"/></g>
    </svg>`;

    const SVG_PIN_2 = `<svg class="pin-building" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="glassMain2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e8fbff"/><stop offset="100%" stop-color="#8cc3d8"/></linearGradient>
        <radialGradient id="neonBase2" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#d1e0f5" stop-opacity="1"/><stop offset="100%" stop-color="#d1e0f5" stop-opacity="0"/></radialGradient>
        <filter id="neonBlur2" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3.5"/></filter>
      </defs>
      <g class="pin-2-outer"><ellipse cx="125" cy="192" rx="50" ry="14" fill="url(#neonBase2)" filter="url(#neonBlur2)"/></g>
      <path d="M63 164 L129 132 L188 164 L124 198 Z" fill="#f7fcfd"/><path d="M63 164 L63 178 L124 212 L124 198 Z" fill="#c4d9de"/><path d="M188 164 L188 178 L124 212 L124 198 Z" fill="#b4ced4"/>
      <g><path d="M135 102 L168 118 L168 165 L135 182 Z" fill="#d3dee4"/><path d="M87 118 L135 102 L135 182 L87 167 Z" fill="#ffffff"/><path d="M87 118 L135 102 L168 118 L120 134 Z" fill="#ffffff"/>
      <path d="M95 122 L129 111 L129 172 L95 161 Z" fill="url(#glassMain2)"/><path d="M135 111 L161 124 L161 171 L135 184 Z" fill="url(#glassMain2)" opacity="0.9"/>
      <path class="pin-2-edge" d="M95 161 L95 122 L129 111" fill="none" stroke="#d1e0f5" stroke-width="1.8" filter="url(#neonBlur2)"/></g>
    </svg>`;

    const SVG_PIN_3 = `<svg class="pin-building" viewBox="0 0 235 235" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="glassMain3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ebfcff"/><stop offset="100%" stop-color="#8fc4d8"/></linearGradient>
        <radialGradient id="neonBase3" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#d1e0f5" stop-opacity="1"/><stop offset="100%" stop-color="#d1e0f5" stop-opacity="0"/></radialGradient>
        <filter id="neonBlur3" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="2.5"/></filter>
      </defs>
      <g class="pin-3-outer"><ellipse cx="118" cy="184" rx="47" ry="13" fill="url(#neonBase3)" filter="url(#neonBlur3)"/></g>
      <path d="M60 158 L122 128 L177 158 L117 190 Z" fill="#f7fcfd"/><path d="M60 158 L60 171 L117 203 L117 190 Z" fill="#c5dade"/><path d="M177 158 L177 171 L117 203 L117 190 Z" fill="#b5cfd5"/>
      <g><path d="M127 92 L156 107 L156 157 L127 173 Z" fill="#d4dfe5"/><path d="M89 107 L127 92 L127 173 L89 160 Z" fill="#ffffff"/><path d="M89 107 L127 92 L156 107 L118 122 Z" fill="#ffffff"/>
      <path d="M97 113 L122 103 L122 164 L97 155 Z" fill="url(#glassMain3)"/><path d="M127 103 L149 114 L149 160 L127 171 Z" fill="url(#glassMain3)" opacity="0.9"/>
      <path class="pin-3-edge" d="M97 155 L97 113 L122 103" fill="none" stroke="#d1e0f5" stroke-width="2.1" filter="url(#neonBlur3)"/></g>
    </svg>`;


    const pinMap = new Map();

    function renderMap() {
        pinsLayer.innerHTML = '';
        cityListContainer.innerHTML = '';



        locations.forEach((loc) => {
            const id = normalize(loc.name);
            
            // Lógica de Selección de Modelo de Edificio
            let pinSvgString = "";
            let scaleClass = "";
            let baseSize = 45;

            // 1. Identificar Clusters (Para usar Pin 3 que es más compacto)
            const clusters = [
                ["bogota", "cajica", "tocancipa"],
                ["pereira", "armenia", "manizales"],
                ["pasto", "ipiales", "tuquerres"],
                ["barranquilla", "cartagena", "soledad"]
            ];
            const isInCluster = clusters.some(c => c.includes(id));

            if (loc.hq) {
                pinSvgString = SVG_PIN_HQ;
                baseSize = 65; // Medellín más grande
            } else if (isInCluster) {
                pinSvgString = SVG_PIN_3;
                baseSize = 35; // Nodos de cluster más pequeños
            } else {
                // Alternancia orgánica entre Tipo 1 y Tipo 2
                pinSvgString = (id.length % 2 === 0) ? SVG_PIN_1 : SVG_PIN_2;
                baseSize = 48;
            }

            // Map Pin — ANCLA CERO + SVG Edificio
            const pinDiv = document.createElement('div');
            pinDiv.className = `map-pin ${loc.hq ? 'pin-hq' : ''}`;
            pinDiv.style.left = `${loc.left}%`;
            pinDiv.style.top = `${loc.top}%`;

            pinDiv.innerHTML = `
                <div class="lab-marker-container" style="width:${baseSize}px; height:${baseSize}px;">
                    ${pinSvgString}
                </div>
                <div class="city-floating-label">${loc.name}</div>
            `;

            pinsLayer.appendChild(pinDiv);
            const pinSvgContainer = pinDiv.querySelector('.lab-marker-container');
            const pinSvg = pinDiv.querySelector('svg.pin-building');
            pinMap.set(id, { pin: pinDiv, pinSvg: pinSvgContainer, loc: loc });

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
            // Limpiar CUALQUIER otra ciudad activa para evitar etiquetas encimadas
            pinMap.forEach((otherData, otherId) => {
                if (otherId !== id) {
                    otherData.pin.classList.remove('active');
                    otherData.listItem.classList.remove('active');
                }
            });

            // Activar la actual
            data.pin.classList.add('active');
            data.listItem.classList.add('active');

            if (scrollList && data.listItem) {
                const container = cityListContainer;
                const item = data.listItem;
                const targetTop = item.offsetTop - (container.clientHeight / 2) + (item.clientHeight / 2);
                container.scrollTo({ top: targetTop, behavior: 'smooth' });
            }
        } else {
            // Desactivar específicamente esta ciudad
            data.pin.classList.remove('active');
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

