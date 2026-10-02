/* Portfolio interactions: 3D flythrough, isometric desk, skill sphere,
   3D timeline, flip cards, project cube, tilt cards and award carousel. */
(function () {
    "use strict";

    const D = PORTFOLIO;
    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
    const el = (tag, cls, html) => {
        const e = document.createElement(tag);
        if (cls) e.className = cls;
        if (html != null) e.innerHTML = html;
        return e;
    };
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const mouse = { x: 0, y: 0 }; // normalized -1..1

    window.addEventListener("pointermove", (e) => {
        mouse.x = (e.clientX / innerWidth) * 2 - 1;
        mouse.y = (e.clientY / innerHeight) * 2 - 1;
    }, { passive: true });

    $("#year").textContent = new Date().getFullYear();

    /* ---------------- Header, menu, section tracking ---------------- */
    const header = $(".site-header");
    const hamb = $(".hamb");
    const overlay = $(".menu-overlay");

    function setMenu(open) {
        hamb.classList.toggle("open", open);
        overlay.classList.toggle("open", open);
        hamb.setAttribute("aria-expanded", open);
        overlay.setAttribute("aria-hidden", !open);
        $$(".menu-tile").forEach((t, i) => (t.style.transitionDelay = open ? i * 45 + "ms" : "0ms"));
    }
    hamb.addEventListener("click", () => setMenu(!overlay.classList.contains("open")));
    $$(".menu-tile").forEach((t) => t.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

    const sections = $$("main section");
    const navLinks = $$(".nav-list a, .orbit-nav a");
    const orbitFill = $(".orbit-fill");

    function scrollProgress() {
        const max = document.documentElement.scrollHeight - innerHeight;
        return max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
    }

    function onScroll() {
        header.classList.toggle("scrolled", scrollY > 40);
        orbitFill.style.height = scrollProgress() * 100 + "%";
        let current = sections[0].id;
        for (const s of sections) if (s.getBoundingClientRect().top < innerHeight * 0.4) current = s.id;
        navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
    }
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* Cursor glow */
    const glow = $(".cursor-glow");
    if (canHover) {
        addEventListener("pointermove", (e) => {
            glow.style.left = e.clientX + "px";
            glow.style.top = e.clientY + "px";
        }, { passive: true });
    } else glow.remove();

    /* ---------------- Reveal on scroll ---------------- */
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
            if (en.isIntersecting) {
                en.target.classList.add("in");
                revealObs.unobserve(en.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    const observeReveal = (nodes) => nodes.forEach((n) => revealObs.observe(n));

    /* Stat counters */
    const countObs = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
            if (!en.isIntersecting) return;
            const b = en.target, end = +b.dataset.count, t0 = performance.now();
            const step = (t) => {
                const k = Math.min(1, (t - t0) / 1200);
                b.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
                if (k < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            countObs.unobserve(b);
        });
    });
    $$("[data-count]").forEach((b) => countObs.observe(b));

    /* Typed hero line */
    if (window.Typed) {
        new Typed(".input", {
            strings: ["Sudipto Sarkar Joy.", "an AI Researcher.", "a Computer Vision Engineer.", "a Robotics Enthusiast.", "a Founder &amp; Developer."],
            typeSpeed: 70, backSpeed: 40, backDelay: 1600, loop: true
        });
    } else $(".input").textContent = "Sudipto Sarkar Joy.";

    /* ---------------- Three.js scroll flythrough ---------------- */
    function initFlythrough() {
        const canvas = $("#bg-canvas");
        if (!window.THREE) return;
        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        } catch (err) {
            return; // no WebGL: CSS gradients still provide the backdrop
        }
        renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
        renderer.setClearColor(0x07050f, 1);

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x07050f, 0.0011);
        const camera = new THREE.PerspectiveCamera(70, 1, 1, 3500);
        const START = 400, DEPTH = 3200;
        camera.position.z = START;

        // Round sprite for particles
        const sc = document.createElement("canvas");
        sc.width = sc.height = 64;
        const g = sc.getContext("2d");
        const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
        grd.addColorStop(0, "rgba(255,255,255,1)");
        grd.addColorStop(0.4, "rgba(255,255,255,.6)");
        grd.addColorStop(1, "rgba(255,255,255,0)");
        g.fillStyle = grd;
        g.fillRect(0, 0, 64, 64);
        const sprite = new THREE.CanvasTexture(sc);

        // Star tunnel
        const N = innerWidth < 760 ? 1400 : 2800;
        const pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
        const palette = [new THREE.Color(0x8d72e1), new THREE.Color(0xc4b4ff), new THREE.Color(0x6c4ab6), new THREE.Color(0xffffff), new THREE.Color(0xd38cff)];
        for (let i = 0; i < N; i++) {
            const r = 120 + Math.random() * 700, a = Math.random() * Math.PI * 2;
            pos[i * 3] = Math.cos(a) * r;
            pos[i * 3 + 1] = Math.sin(a) * r;
            pos[i * 3 + 2] = START + 200 - Math.random() * (DEPTH + 800);
            const c = palette[(Math.random() * palette.length) | 0];
            col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
        }
        const pg = new THREE.BufferGeometry();
        pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        pg.setAttribute("color", new THREE.BufferAttribute(col, 3));
        const stars = new THREE.Points(pg, new THREE.PointsMaterial({
            size: 6, map: sprite, vertexColors: true, transparent: true, depthWrite: false,
            blending: THREE.AdditiveBlending, opacity: 0.9
        }));
        scene.add(stars);

        // Wireframe sculptures placed along the flight path
        const wire = (color, op) => new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: op });
        const shapes = [
            { geo: new THREE.IcosahedronGeometry(150, 1), x: 330, y: 40, z: -100, c: 0x8d72e1 },
            { geo: new THREE.TorusKnotGeometry(90, 26, 120, 12), x: -360, y: -60, z: -750, c: 0xc4b4ff },
            { geo: new THREE.OctahedronGeometry(140, 0), x: 380, y: -90, z: -1450, c: 0xd38cff },
            { geo: new THREE.DodecahedronGeometry(150, 0), x: -340, y: 80, z: -2150, c: 0x8d72e1 },
            { geo: new THREE.TorusKnotGeometry(110, 8, 160, 8, 3, 5), x: 300, y: 30, z: -2850, c: 0xc4b4ff }
        ].map((s) => {
            const m = new THREE.Mesh(s.geo, wire(s.c, 0.32));
            m.position.set(s.x, s.y, s.z);
            scene.add(m);
            return m;
        });

        // Gates the camera flies through
        const gates = [];
        for (let z = -300; z > -DEPTH; z -= 520) {
            const ring = new THREE.Mesh(new THREE.TorusGeometry(430, 1.3, 6, 140), new THREE.MeshBasicMaterial({ color: 0x8d72e1, transparent: true, opacity: 0.35 }));
            ring.position.z = z;
            scene.add(ring);
            gates.push(ring);
        }

        // Neural-network constellation near the start
        const nodes = [];
        for (let i = 0; i < 46; i++) nodes.push(new THREE.Vector3((Math.random() - 0.5) * 900, (Math.random() - 0.5) * 520, -200 - Math.random() * 500));
        const lp = [];
        nodes.forEach((a, i) => nodes.forEach((b, j) => { if (j > i && a.distanceTo(b) < 190) lp.push(a.x, a.y, a.z, b.x, b.y, b.z); }));
        const lg = new THREE.BufferGeometry();
        lg.setAttribute("position", new THREE.Float32BufferAttribute(lp, 3));
        const net = new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: 0x8d72e1, transparent: true, opacity: 0.22 }));
        scene.add(net);

        function resize() {
            renderer.setSize(innerWidth, innerHeight, false);
            camera.aspect = innerWidth / innerHeight;
            camera.updateProjectionMatrix();
        }
        addEventListener("resize", resize);
        resize();

        let camZ = START, t = 0;
        function frame() {
            requestAnimationFrame(frame);
            if (document.hidden) return;
            t += reduceMotion ? 0 : 0.004;
            const target = START - scrollProgress() * DEPTH;
            camZ += (target - camZ) * (reduceMotion ? 1 : 0.06);
            camera.position.z = camZ;
            camera.position.x += (mouse.x * 50 - camera.position.x) * 0.04;
            camera.position.y += (-mouse.y * 35 - camera.position.y) * 0.04;
            camera.lookAt(0, 0, camZ - 600);
            camera.rotation.z = Math.sin(t * 0.7) * 0.03 + scrollProgress() * 0.6;
            shapes.forEach((m, i) => { m.rotation.x = t * (0.6 + i * 0.1); m.rotation.y = t * (0.8 - i * 0.07); });
            gates.forEach((r, i) => { r.rotation.z = t * (i % 2 ? 1 : -1) * 0.5; r.scale.setScalar(1 + Math.sin(t * 3 + i) * 0.03); });
            net.rotation.y = Math.sin(t) * 0.15;
            stars.rotation.z = t * 0.05;
            renderer.render(scene, camera);
        }
        frame();
    }
    initFlythrough();

    /* ---------------- Isometric workspace ---------------- */
    function initIso() {
        const root = $("#iso-scene");
        // Box with 6 faces; with this camera angle top, front (y = d) and left (x = 0) are visible.
        function box(parent, { x, y, z, w, d, h, top, front, side, cls, screen }) {
            const b = el("div", "box " + (cls || ""));
            b.style.cssText = `width:${w}px;height:${d}px;transform:translate3d(${x}px,${y}px,${z}px)`;
            const faces = [
                [w, d, `translateZ(${h}px)`, top],
                [w, d, "", side],
                [w, h, `translateY(${d}px) rotateX(90deg)`, front],
                [w, h, "rotateX(90deg)", front],
                [h, d, "rotateY(-90deg)", side],
                [h, d, `translateX(${w}px) rotateY(-90deg)`, side]
            ];
            faces.forEach(([fw, fh, tf, color], i) => {
                const f = el("div", "f");
                f.style.cssText = `width:${fw}px;height:${fh}px;transform:${tf};background:${color}`;
                if (screen && i === 2) {
                    f.classList.add("screen-face");
                    for (let k = 0; k < 9; k++) {
                        const line = el("i");
                        line.style.width = 30 + Math.random() * 65 + "%";
                        line.style.animationDelay = -Math.random() * 3 + "s";
                        f.appendChild(line);
                    }
                }
                b.appendChild(f);
            });
            parent.appendChild(b);
            return b;
        }
        const wood = { top: "#4a3590", front: "#33246a", side: "#241a4d" };
        const dark = { top: "#2c2258", front: "#1b1440", side: "#130e2e" };
        const lilac = { top: "#c4b4ff", front: "#8d72e1", side: "#6c4ab6" };

        root.appendChild(el("div", "iso-floor"));
        // desk
        [[40, 100], [300, 100], [40, 230], [300, 230]].forEach(([x, y]) => box(root, { x, y, z: 0, w: 10, d: 10, h: 92, ...dark }));
        box(root, { x: 30, y: 90, z: 92, w: 290, d: 155, h: 10, ...wood });
        // monitor + stand
        box(root, { x: 165, y: 112, z: 102, w: 40, d: 26, h: 4, ...dark });
        box(root, { x: 180, y: 118, z: 106, w: 10, d: 8, h: 36, ...dark });
        box(root, { x: 108, y: 126, z: 128, w: 154, d: 8, h: 96, ...dark, screen: true });
        // keyboard + mouse
        box(root, { x: 130, y: 180, z: 102, w: 100, d: 32, h: 5, top: "#8d72e1", front: "#6c4ab6", side: "#4a3590" });
        box(root, { x: 245, y: 188, z: 102, w: 14, d: 20, h: 6, ...lilac });
        // mug
        box(root, { x: 275, y: 150, z: 102, w: 20, d: 20, h: 24, top: "#f5a3d8", front: "#d17fb6", side: "#a85f91" });
        // book stack
        box(root, { x: 262, y: 102, z: 102, w: 44, d: 32, h: 8, top: "#5ad1b0", front: "#3ea98c", side: "#2c826b" });
        box(root, { x: 265, y: 104, z: 110, w: 40, d: 28, h: 8, ...lilac });
        box(root, { x: 263, y: 103, z: 118, w: 42, d: 30, h: 7, top: "#f0c24b", front: "#c79b2c", side: "#9c781d" });
        // little robot
        box(root, { x: 52, y: 160, z: 102, w: 36, d: 30, h: 30, ...lilac });
        box(root, { x: 58, y: 164, z: 132, w: 24, d: 22, h: 20, top: "#e7e0ff", front: "#c4b4ff", side: "#8d72e1" });
        box(root, { x: 68, y: 173, z: 152, w: 4, d: 4, h: 14, ...dark });
        box(root, { x: 66, y: 171, z: 166, w: 8, d: 8, h: 6, top: "#5ad1b0", front: "#3ea98c", side: "#2c826b" });
        // hovering drone
        const drone = el("div", "drone");
        drone.style.cssText = "position:absolute;left:210px;top:-10px;";
        root.appendChild(drone);
        const beam = el("div", "beam");
        beam.style.transform = "translateZ(-200px)";
        drone.appendChild(beam);
        box(drone, { x: 0, y: 0, z: 0, w: 40, d: 40, h: 9, ...lilac });
        [[-4, -4], [44, -4], [-4, 44], [44, 44]].forEach(([x, y]) => {
            box(drone, { x: x - 2, y: y - 2, z: 4, w: 4, d: 4, h: 8, ...dark });
            const r = el("div", "rotor");
            r.style.cssText = `left:${x}px;top:${y}px;transform:translateZ(13px)`;
            drone.appendChild(r);
        });

        if (!canHover || reduceMotion) return;
        let rz = -45, rx = 60;
        (function loop() {
            requestAnimationFrame(loop);
            rz += (-45 + mouse.x * 14 - rz) * 0.06;
            rx += (60 - mouse.y * 8 - rx) * 0.06;
            root.style.transform = `rotateX(${rx}deg) rotateZ(${rz}deg)`;
        })();
    }
    initIso();

    /* ---------------- About: interests ---------------- */
    $("#interest-chips").innerHTML = D.interests.map((i) => `<span class="chip"><i class="fa-solid ${i.icon}"></i>${i.label}</span>`).join("");

    /* ---------------- Skills: 3D tag sphere ---------------- */
    function initSkills() {
        const catColors = {
            "Languages": "#C4B4FF", "ML & AI": "#D38CFF", "Backend & DevOps": "#5ad1b0",
            "Hardware & Robotics": "#f5a3d8", "Tools": "#9fb4ff"
        };
        const cats = Object.keys(D.skills);
        const sphere = $("#tag-sphere");
        const wrap = $(".sphere-wrap");
        const tags = [];
        cats.forEach((cat) => D.skills[cat].forEach((name) => {
            const s = el("span", "", name);
            s.style.color = catColors[cat];
            s.dataset.cat = cat;
            sphere.appendChild(s);
            tags.push({ el: s, x: 0, y: 0, z: 0 });
        }));
        // Fibonacci sphere distribution
        const n = tags.length;
        tags.forEach((t, i) => {
            const phi = Math.acos(1 - (2 * (i + 0.5)) / n), theta = Math.PI * (1 + Math.sqrt(5)) * i;
            t.x = Math.cos(theta) * Math.sin(phi);
            t.y = Math.sin(theta) * Math.sin(phi);
            t.z = Math.cos(phi);
        });

        let vx = 0.002, vy = 0.004, dragging = false, lx = 0, ly = 0, hover = null;
        wrap.addEventListener("pointerdown", (e) => { dragging = true; lx = e.clientX; ly = e.clientY; wrap.setPointerCapture(e.pointerId); });
        wrap.addEventListener("pointerup", () => (dragging = false));
        wrap.addEventListener("pointercancel", () => (dragging = false));
        wrap.addEventListener("pointermove", (e) => {
            if (dragging) {
                vy = (e.clientX - lx) * 0.0016;
                vx = -(e.clientY - ly) * 0.0016;
                lx = e.clientX; ly = e.clientY;
            } else if (canHover) {
                const r = wrap.getBoundingClientRect();
                hover = { x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 };
            }
        });
        wrap.addEventListener("pointerleave", () => (hover = null));

        let visible = false;
        new IntersectionObserver(([en]) => (visible = en.isIntersecting)).observe(wrap);

        (function loop() {
            requestAnimationFrame(loop);
            if (!visible) return;
            if (hover && !dragging) { vy += (hover.x * 0.02 - vy) * 0.05; vx += (-hover.y * 0.02 - vx) * 0.05; }
            else if (!dragging) { vy += (0.004 - vy) * 0.02; vx += (0.0015 - vx) * 0.02; }
            const speed = reduceMotion ? 0 : 1;
            const cy = Math.cos(vy * speed), sy = Math.sin(vy * speed), cx = Math.cos(vx * speed), sx = Math.sin(vx * speed);
            const R = Math.min(wrap.clientWidth, wrap.clientHeight) * 0.4;
            tags.forEach((t) => {
                let x = t.x * cy + t.z * sy, z = -t.x * sy + t.z * cy;
                const y = t.y * cx - z * sx;
                z = t.y * sx + z * cx;
                t.x = x; t.y = y; t.z = z;
                const s = 600 / (600 - z * R * 0.9);
                t.el.style.transform = `translate(-50%,-50%) translate3d(${x * R * s}px,${y * R * s}px,0) scale(${s})`;
                t.el.style.opacity = 0.25 + 0.75 * ((z + 1) / 2);
                t.el.style.zIndex = Math.round((z + 1) * 100);
            });
        })();

        // Category legend
        const catBox = $("#skill-cats"), list = $("#skill-list");
        function select(cat) {
            $$(".chip", catBox).forEach((c) => c.classList.toggle("active", c.dataset.cat === cat));
            tags.forEach((t) => {
                t.el.classList.toggle("lit", t.el.dataset.cat === cat);
                t.el.classList.toggle("dim", t.el.dataset.cat !== cat);
            });
            list.innerHTML = D.skills[cat].map((s, i) => `<span style="animation-delay:${i * 35}ms;border-color:${catColors[cat]}55">${s}</span>`).join("");
        }
        cats.forEach((cat) => {
            const c = el("button", "chip", `<i class="fa-solid fa-circle" style="color:${catColors[cat]};font-size:8px"></i>${cat}`);
            c.dataset.cat = cat;
            c.addEventListener("click", () => select(cat));
            catBox.appendChild(c);
        });
        select("ML & AI");
        $("#course-chips").innerHTML = D.coursework.map((c) => `<span>${c}</span>`).join("");
    }
    initSkills();

    /* ---------------- 3D timeline ---------------- */
    function renderTimeline(filter) {
        const tl = $("#timeline");
        tl.innerHTML = "";
        D.timeline.filter((it) => filter === "all" || it.type === filter).forEach((it, i) => {
            const item = el("div", "tl-item " + (i % 2 ? "right" : "left"));
            const meta = [it.place, it.note].filter(Boolean).join(" · ");
            item.innerHTML = `
                <div class="tl-node"><i class="fa-solid ${it.icon}"></i></div>
                <div class="tl-card glass">
                    <span class="tl-type">${it.type}</span>
                    <span class="tl-period">${it.period}</span>
                    <h4>${it.title}</h4>
                    <div class="org">${it.org}</div>
                    ${meta || it.link ? `<div class="meta">${meta}${it.link ? ` · <a href="${it.link}" target="_blank" rel="noopener">Visit <i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ""}</div>` : ""}
                </div>`;
            item.style.transitionDelay = (i % 3) * 80 + "ms";
            tl.appendChild(item);
        });
        observeReveal($$(".tl-item", tl));
    }
    $$(".tl-filters .chip").forEach((b) => b.addEventListener("click", () => {
        $$(".tl-filters .chip").forEach((c) => c.classList.toggle("active", c === b));
        renderTimeline(b.dataset.filter);
    }));
    renderTimeline("all");

    /* ---------------- Thesis: animated EEG ---------------- */
    function initEEG() {
        const c = $("#eeg-canvas"), ctx = c.getContext("2d");
        let visible = false, t = 0;
        new IntersectionObserver(([en]) => (visible = en.isIntersecting)).observe(c);
        const colors = ["#C4B4FF", "#8D72E1", "#D38CFF", "#5ad1b0", "#9fb4ff", "#f5a3d8"];
        function draw() {
            requestAnimationFrame(draw);
            if (!visible && t > 0) return;
            const w = c.clientWidth, h = c.clientHeight, dpr = Math.min(devicePixelRatio, 2);
            if (c.width !== w * dpr) { c.width = w * dpr; c.height = h * dpr; }
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, w, h);
            const ch = colors.length, band = h / ch;
            colors.forEach((col, k) => {
                ctx.beginPath();
                ctx.strokeStyle = col;
                ctx.lineWidth = 1.4;
                ctx.globalAlpha = 0.85;
                const mid = band * (k + 0.5);
                for (let x = 0; x <= w; x += 2) {
                    const p = x * 0.05 + t * (1.5 + k * 0.2);
                    const y = mid + Math.sin(p) * band * 0.18 + Math.sin(p * 2.7 + k) * band * 0.12 + Math.sin(p * 7.3 + k * 2) * band * 0.06 + Math.sin(x * 0.012 - t) * band * 0.08;
                    x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
                }
                ctx.stroke();
            });
            ctx.globalAlpha = 1;
            if (!reduceMotion) t += 0.05;
        }
        draw();
    }
    initEEG();

    /* ---------------- Publications: flip cards ---------------- */
    $("#pub-grid").innerHTML = D.publications.map((p) => `
        <div class="flip reveal" tabindex="0" aria-label="${p.title}">
            <div class="flip-inner">
                <div class="flip-face flip-front">
                    <div class="pub-icon"><i class="fa-solid ${p.icon}"></i></div>
                    <span class="status ${p.status.split(" ")[0]}">${p.status} · ${p.kind}</span>
                    <h4>${p.title}</h4>
                    <span class="year">${p.year} · tap to flip</span>
                </div>
                <div class="flip-face flip-back">
                    <h5>Authors</h5>
                    <p>${p.authors.replace(/S\. Sarkar/, "<b>S. Sarkar</b>")}</p>
                    <h5>Venue</h5>
                    <p>${p.venue}</p>
                    ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener">Read paper <i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ""}
                </div>
            </div>
        </div>`).join("");
    $$(".flip").forEach((f) => {
        f.addEventListener("click", (e) => { if (!e.target.closest("a")) f.classList.toggle("flipped"); });
        f.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); f.classList.toggle("flipped"); } });
    });

    /* ---------------- Projects: grid with tilt + exploded layers ---------------- */
    const grid = $("#proj-grid");
    grid.innerHTML = D.projects.map((p, i) => `
        <article class="proj-card tilt reveal" id="project-${i}" data-cats="${p.cats.join(" ")}">
            <div class="glare"></div>
            <div class="proj-top layer l1">
                <div class="proj-icon"><i class="fa-solid ${p.icon}"></i></div>
                <div class="proj-metric"><b>${p.metric.value}</b><span>${p.metric.label}</span></div>
            </div>
            <div class="layer l2"><h3>${p.title}</h3><span class="proj-date">${p.date}</span></div>
            <ul class="layer l3">${p.points.map((x) => `<li>${x}</li>`).join("")}</ul>
            <div class="proj-bottom layer l4">
                <div class="proj-tags">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>
                ${p.link ? `<a class="proj-link" href="${p.link}" target="_blank" rel="noopener" aria-label="GitHub repository"><i class="fa-brands fa-github"></i></a>` : ""}
            </div>
        </article>`).join("");

    $$(".proj-filters .chip").forEach((b) => b.addEventListener("click", () => {
        $$(".proj-filters .chip").forEach((c) => c.classList.toggle("active", c === b));
        $$(".proj-card").forEach((card) => card.classList.toggle("hide", b.dataset.cat !== "all" && !card.dataset.cats.split(" ").includes(b.dataset.cat)));
    }));

    function attachTilt(card, max) {
        if (!canHover || reduceMotion) return;
        card.style.transformStyle = "preserve-3d";
        card.addEventListener("pointermove", (e) => {
            const r = card.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
            card.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg)`;
            card.style.setProperty("--gx", px * 100 + "%");
            card.style.setProperty("--gy", py * 100 + "%");
        });
        card.addEventListener("pointerleave", () => (card.style.transform = ""));
    }
    $$(".proj-card").forEach((c) => attachTilt(c, 14));
    $$("[data-tilt]").forEach((c) => attachTilt(c, 16));

    /* ---------------- Featured project cube ---------------- */
    function initCube() {
        const featured = [0, 2, 3, 1];
        const cube = $("#project-cube");
        const half = 125;
        featured.forEach((pi, i) => {
            const p = D.projects[pi];
            const f = el("div", "cube-face", `
                <i class="fa-solid ${p.icon} big"></i>
                <div><div class="m">${p.metric.value}</div><h4>${p.title}</h4></div>`);
            f.style.transform = `rotateY(${i * 90}deg) translateZ(${half}px)`;
            f.addEventListener("click", () => {
                const card = $("#project-" + pi);
                card.scrollIntoView({ behavior: "smooth", block: "center" });
                card.animate([{ boxShadow: "0 0 0 0 rgba(141,114,225,0)" }, { boxShadow: "0 0 0 6px rgba(141,114,225,.8)" }, { boxShadow: "0 0 0 0 rgba(141,114,225,0)" }], { duration: 1400, delay: 500 });
            });
            f.style.cursor = "pointer";
            cube.appendChild(f);
        });
        ["rotateX(90deg)", "rotateX(-90deg)"].forEach((r) => {
            const cap = el("div", "cube-face cap", "");
            cap.style.transform = `${r} translateZ(${half}px)`;
            cube.appendChild(cap);
        });

        let idx = 0, turn = 0, timer;
        function show(step) {
            idx = (idx + step + featured.length) % featured.length;
            turn += step;
            cube.style.transform = `rotateX(-14deg) rotateY(${-turn * 90}deg)`;
            const p = D.projects[featured[idx]];
            $("#cube-index").textContent = idx + 1;
            $("#cube-title").textContent = p.title;
            $("#cube-desc").textContent = p.points[0] + " " + (p.points[1] || "");
        }
        const restart = () => { clearInterval(timer); if (!reduceMotion) timer = setInterval(() => show(1), 4500); };
        $("#cube-next").addEventListener("click", () => { show(1); restart(); });
        $("#cube-prev").addEventListener("click", () => { show(-1); restart(); });
        const stage = $(".cube-stage");
        stage.addEventListener("pointerenter", () => clearInterval(timer));
        stage.addEventListener("pointerleave", restart);
        let sx = null;
        stage.addEventListener("pointerdown", (e) => (sx = e.clientX));
        stage.addEventListener("pointerup", (e) => {
            if (sx !== null && Math.abs(e.clientX - sx) > 40) { show(e.clientX < sx ? 1 : -1); restart(); }
            sx = null;
        });
        show(0);
        restart();
    }
    initCube();

    /* ---------------- Awards: 3D orbit carousel ---------------- */
    function initCarousel() {
        const car = $("#award-carousel");
        const n = D.awards.length, step = 360 / n;
        const cards = D.awards.map((a) => {
            const c = el("div", "award " + a.rank.split(" ")[0], `
                <div class="trophy"><i class="fa-solid ${a.icon}"></i></div>
                <span class="rank">${a.rank}</span>
                <h4>${a.title}</h4>
                ${a.note ? `<p>${a.note}</p>` : ""}
                <span class="yr">${a.year}</span>`);
            car.appendChild(c);
            return c;
        });
        let radius = 0;
        function layout() {
            const w = car.clientWidth;
            radius = Math.round(w / 2 / Math.tan(Math.PI / n)) + 40;
            cards.forEach((c, i) => (c.style.transform = `rotateY(${i * step}deg) translateZ(${radius}px)`));
        }
        layout();
        addEventListener("resize", layout);

        let rot = 0, target = null, dragging = false, lx = 0, vel = 0;
        const stage = $(".carousel-stage");
        stage.addEventListener("pointerdown", (e) => { dragging = true; lx = e.clientX; target = null; stage.setPointerCapture(e.pointerId); });
        stage.addEventListener("pointermove", (e) => {
            if (!dragging) return;
            vel = (e.clientX - lx) * 0.35;
            rot += vel;
            lx = e.clientX;
        });
        const end = () => { if (dragging) { dragging = false; target = Math.round(rot / step) * step; } };
        stage.addEventListener("pointerup", end);
        stage.addEventListener("pointercancel", end);
        let paused = false;
        stage.addEventListener("pointerenter", () => (paused = true));
        stage.addEventListener("pointerleave", () => (paused = false));
        $("#award-next").addEventListener("click", () => (target = Math.round(rot / step) * step - step));
        $("#award-prev").addEventListener("click", () => (target = Math.round(rot / step) * step + step));

        let visible = false;
        new IntersectionObserver(([en]) => (visible = en.isIntersecting)).observe(stage);
        (function loop() {
            requestAnimationFrame(loop);
            if (!visible) return;
            if (target !== null) {
                rot += (target - rot) * 0.1;
                if (Math.abs(target - rot) < 0.05) { rot = target; if (!paused) target = null; }
            } else if (!dragging && !paused && !reduceMotion) rot -= 0.12;
            car.style.transform = `translateZ(${-radius}px) rotateY(${rot}deg)`;
            cards.forEach((c, i) => {
                const a = ((((i * step + rot) % 360) + 540) % 360) - 180;
                c.classList.toggle("back", Math.abs(a) > 60);
            });
        })();
    }
    initCarousel();

    /* ---------------- Contact (mail() is disabled on the host, so use mailto) ---------------- */
    $("#contact-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const name = $("#name").value.trim(), email = $("#email").value.trim(), msg = $("#message").value.trim();
        const subject = encodeURIComponent(`Portfolio contact from ${name}`);
        const body = encodeURIComponent(`${msg}\n\n${name}\n${email}`);
        location.href = `mailto:sudiptosarkarjoy@gmail.com?subject=${subject}&body=${body}`;
    });

    // Start reveal animations last so dynamically rendered cards are included
    observeReveal($$(".reveal"));
})();
