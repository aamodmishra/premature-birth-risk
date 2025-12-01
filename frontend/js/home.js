// Check session from backend
fetch("/session")
  .then(res => res.json())
  .then(data => {
    const nav = document.getElementById("navMenu");

    if (data.loggedIn) {
      nav.innerHTML = `
        <span style="margin-right:20px; color:#2b468b;">
          Logged in as <b>${data.email}</b>
        </span>
        <a href="#" id="logoutBtn">Logout</a>
      `;

      // Logout functionality
      document.getElementById("logoutBtn").addEventListener("click", () => {
        fetch("/logout").then(() => {
          window.location.reload();
        });
      });

    } else {
      nav.innerHTML = `
        <a href="login.html">Login</a>
        <a href="signup.html">Sign Up</a>
      `;
    }
  })
  .catch(err => console.log("Session check failed:", err));
// Frontend animations and interactions
// Create animated particles
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 3 + 's';
      particlesContainer.appendChild(particle);
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Parallax effect on mouse move
    document.addEventListener('mousemove', (e) => {
      const orbs = document.querySelectorAll('.orb');
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
      });
    });

    // Animate numbers counting up
    const animateValue = (element, start, end, duration) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString() + (element.dataset.suffix || '');
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    // Trigger number animation when visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumbers = document.querySelectorAll('.stat-number');
          statNumbers.forEach((stat, index) => {
            setTimeout(() => {
              const text = stat.textContent;
              if (text.includes('K')) {
                stat.dataset.suffix = 'K+';
                animateValue(stat, 0, 10, 2000);
              }
            }, index * 200);
          });
          observer.disconnect();
        }
      });
    });

    const stats = document.querySelector('.stats');
    if (stats) observer.observe(stats);