/**
 * RODRIGO WILLEN — PURE BLACK PORTFOLIO CORE
 * Arquitetado com o Antigravity Kit (Clean Code & Interatividade de Alta Fidelidade)
 */

document.addEventListener('DOMContentLoaded', () => {
    initClock();
    initInteractiveTerminal();
    initMobileDrawer();
    initSecureContactForm();
    initCurrentYear();
});

/* ==========================================================================
   RELÓGIO DO SISTEMA EM TEMPO REAL (UTC HH:MM:SS)
   ========================================================================== */
function initClock() {
    const timeElement = document.getElementById('system-time');
    if (!timeElement) return;

    function updateTime() {
        const now = new Date();
        const utcHours = String(now.getUTCHours()).padStart(2, '0');
        const utcMinutes = String(now.getUTCMinutes()).padStart(2, '0');
        const utcSeconds = String(now.getUTCSeconds()).padStart(2, '0');
        timeElement.textContent = `UTC ${utcHours}:${utcMinutes}:${utcSeconds}`;
    }

    updateTime();
    setInterval(updateTime, 1000);
}

/* ==========================================================================
   TERMINAL INTERATIVO DA HERO SECTION
   ========================================================================== */
function initInteractiveTerminal() {
    const termBody = document.getElementById('terminal-body');
    const cmdButtons = document.querySelectorAll('.term-btn');
    if (!termBody) return;

    const commandDatabase = {
        whoami: "Rodrigo Willen — Desenvolvedor de Software focado em código limpo, arquitetura e alto desempenho.",
        stack: "JavaScript (ES6+), TypeScript, React, Node.js, Python, REST APIs, Git & Cloud Deploy.",
        projects: "Projetos: [1] Chatbot Inteligente (Vercel), [2] Pure Black Portfolio, [3] Telemetry & Systems Spec.",
        status: "● SISTEMA OPERACIONAL: 100% pronto e aberto para novos projetos e colaborações.",
        clear: "__CLEAR__"
    };

    function executeCommand(cmdName) {
        if (cmdName === 'clear') {
            termBody.innerHTML = `
                <div class="term-line output-line text-muted">Sessão limpa pelo usuário. Digite ou clique em um comando abaixo.</div>
                <div class="term-line input-line">
                    <span class="term-prompt">rodrigo@sys:~$</span>
                    <span class="term-cmd">help</span>
                    <span class="term-cursor">_</span>
                </div>
                <div class="term-line response-line">
                    Comandos disponíveis: <span class="res-highlight">whoami</span>, <span class="res-highlight">stack</span>, <span class="res-highlight">projects</span>, <span class="res-highlight">clear</span>
                </div>
            `;
            return;
        }

        const responseText = commandDatabase[cmdName] || `Comando não reconhecido: ${cmdName}. Use: whoami, stack, projects, clear.`;

        // Criar linha de comando
        const inputDiv = document.createElement('div');
        inputDiv.className = 'term-line input-line';
        inputDiv.innerHTML = `<span class="term-prompt">rodrigo@sys:~$</span> <span class="term-cmd">${cmdName}</span>`;

        // Criar linha de resposta
        const responseDiv = document.createElement('div');
        responseDiv.className = 'term-line response-line';
        responseDiv.innerHTML = `<span class="res-highlight">${responseText}</span>`;

        termBody.appendChild(inputDiv);
        termBody.appendChild(responseDiv);

        // Auto-scroll para a última linha
        termBody.scrollTop = termBody.scrollHeight;
    }

    cmdButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-command');
            if (cmd) {
                executeCommand(cmd);
            }
        });
    });
}

/* ==========================================================================
   MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initMobileDrawer() {
    const toggle = document.getElementById('mobile-toggle');
    const drawer = document.getElementById('mobile-drawer');
    const closeBtn = document.getElementById('drawer-close');
    const drawerLinks = document.querySelectorAll('.drawer-item');

    if (!drawer) return;

    function openDrawer() {
        drawer.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        drawer.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (toggle) toggle.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    drawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });
}

/* ==========================================================================
   FORMULÁRIO DE CONTATO PRIVADO & SEGURO
   ========================================================================== */
function initSecureContactForm() {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('form-submit-btn');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('form-name');
        const emailInput = document.getElementById('form-email');
        const subjectInput = document.getElementById('form-subject');
        const messageInput = document.getElementById('form-message');

        const name = nameInput ? nameInput.value.trim() : 'Visitante';

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Transmitindo...</span>`;
        }

        // Simulação segura de despacho assíncrono com feedback
        setTimeout(() => {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = `<span class="btn-text">Transmitir Mensagem</span> <i class="fa-solid fa-terminal"></i>`;
            }

            if (feedback) {
                feedback.className = 'form-status-alert success';
                feedback.innerHTML = `
                    <i class="fa-solid fa-circle-check"></i>
                    <strong>TRANSMISSÃO CONCLUÍDA:</strong> Mensagem recebida com sucesso, <strong>${name}</strong>. Responderei o mais breve possível.
                `;
            }

            form.reset();

            // Esconder aviso após 8 segundos
            setTimeout(() => {
                if (feedback) {
                    feedback.className = 'form-status-alert';
                    feedback.style.display = 'none';
                }
            }, 8000);
        }, 900);
    });
}

/* ==========================================================================
   ANO ATUAL NO COPYRIGHT
   ========================================================================== */
function initCurrentYear() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}
