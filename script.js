// Script to activate the Rick Roll easter egg

// Function to open the video
document.querySelector(".lemon-icon").addEventListener("click", function () {
	console.log("Lemon clicked!"); // Debug
	const container = document.getElementById("rickroll-video");
	const video = container.querySelector("video");
	const lemon = document.querySelector(".lemon-icon");

	// Hide the lemon and show the video container
	lemon.style.display = "none";
	container.style.display = "block";

	// Enable sound and play
	video.muted = false;
	video.currentTime = 0; // Start from the beginning
	video
		.play()
		.then(() => {
			console.log("Video playing"); // Debug
		})
		.catch((e) => {
			console.log("Error playing video:", e); // Debug
		});

	console.log("Container shown, lemon hidden"); // Debug
});

// Function to close the video
document.querySelector(".close-video").addEventListener("click", function () {
	console.log("Close button clicked"); // Debug
	const container = document.getElementById("rickroll-video");
	const video = container.querySelector("video");
	const lemon = document.querySelector(".lemon-icon");

	// Stop the video and hide container
	video.pause();
	video.currentTime = 0;
	container.style.display = "none";

	// Show the lemon again
	lemon.style.display = "block";

	console.log("Video closed, lemon visible again"); // Debug
});

// Easter egg for Murcia - play sound
document
	.querySelector(".murcia-trigger")
	.addEventListener("click", function () {
		console.log("Murcia clicked!"); // Debug
		const audio = document.getElementById("murcia-sound");

		// Reset audio to beginning and play
		audio.currentTime = 0;
		audio
			.play()
			.then(() => {
				console.log("Murcia sound playing"); // Debug
			})
			.catch((e) => {
				console.log("Error playing Murcia sound:", e); // Debug
			});
	});

// Theme toggle functionality
document.addEventListener("DOMContentLoaded", function () {
	const themeToggle = document.querySelector(".theme-toggle");
	const themeIcon = document.querySelector(".theme-icon");

	// Detect system preference (but always force dark mode)
	const savedTheme = localStorage.getItem("theme");

	// Set initial theme - always dark by default
	let currentTheme = savedTheme || "dark";
	if (currentTheme === "light") {
		document.documentElement.setAttribute("data-theme", "light");
		themeIcon.textContent = "☀️";
	} else {
		document.documentElement.removeAttribute("data-theme");
		themeIcon.textContent = "🌙";
	}

	// Toggle theme
	themeToggle.addEventListener("click", function () {
		console.log("Theme toggle clicked!"); // Debug
		const currentTheme =
			document.documentElement.getAttribute("data-theme");
		const newTheme = currentTheme === "light" ? "dark" : "light";

		if (newTheme === "light") {
			document.documentElement.setAttribute("data-theme", "light");
			themeIcon.textContent = "☀️";
		} else {
			document.documentElement.removeAttribute("data-theme");
			themeIcon.textContent = "🌙";
		}

		// Save preference
		localStorage.setItem("theme", newTheme);
		console.log(`Theme changed to: ${newTheme}`); // Debug
	});
});

// Language toggle functionality
document.addEventListener("DOMContentLoaded", function () {
	const langToggle = document.querySelector(".lang-toggle");
	const langIcon = document.querySelector(".lang-icon");

	const translations = {
		en: {
			greeting: "Hello there!",
			"developer-tag": "Developer",
			"name-attr": "name",
			description: `/* Currently building my personal portfolio — from clean, modern web
                applications to low-level systems programming in C.<br><br>
                I craft creative and readable code while continuously learning new technologies. 
                I also bring a strong background in 3D design and visualization.<br><br>
                Expect polished demos, GitHub projects, and production‑ready web apps soon! */`,
			"location-from": "From",
			"location-based": "based in Barcelona",
			"coming-soon": "Coming Soon...",
			"contact-text": "For inquiries or collaborations, feel free to",
			"contact-me": "contact me",
		},
		es: {
			greeting: "Hola!",
			"developer-tag": "Developer",
			"name-attr": "name",
			description: `/* Construyendo mi portfolio personal — desde aplicaciones web
                modernas y limpias hasta programación de sistemas de bajo nivel en C.<br><br>
                Creo soluciones creativas con código legible y buenas prácticas, siempre aprendiendo nuevas tecnologías.
                También tengo experiencia en diseño 3D en VFX y videojuegos.<br><br>
                ¡Espera demos, proyectos de GitHub y aplicaciones web listas para producción muy pronto! */`,
			"location-from": "Procedente de",
			"location-based": "afincado en Barcelona",
			"coming-soon": "Próximamente...",
			"contact-text": "Para consultas o colaboraciones, no dudes en",
			"contact-me": "contactarme",
		},
	};

	// Get saved language or default to English
	const savedLang = localStorage.getItem("language") || "en";
	let currentLang = savedLang;

	// Function to update language
	function updateLanguage(lang) {
		currentLang = lang;

		// Update language icon (show the language you can switch TO)
		langIcon.textContent = lang === "en" ? "ES" : "EN";

		// Update all translatable elements
		const elementsToTranslate = document.querySelectorAll("[data-lang]");
		elementsToTranslate.forEach((element) => {
			const key = element.getAttribute("data-lang");
			if (translations[lang] && translations[lang][key]) {
				element.innerHTML = translations[lang][key];
			}
		});

		// Save preference
		localStorage.setItem("language", lang);
		console.log(`Language changed to: ${lang}`); // Debug
	}

	// Set initial language
	updateLanguage(currentLang);

	// Toggle language
	langToggle.addEventListener("click", function () {
		console.log("Language toggle clicked!"); // Debug
		const newLang = currentLang === "en" ? "es" : "en";
		updateLanguage(newLang);
	});
});

// Typing effect for KIKO
document.addEventListener("DOMContentLoaded", function () {
	const typingElement = document.querySelector(".typing-text");
	const cursorElement = document.querySelector(".typing-cursor");

	if (typingElement && cursorElement) {
		const originalText = "KIKO";
		const typingSpeed = 120; // 120ms between letters

		// Start with empty text
		typingElement.textContent = "";

		let currentIndex = 0;

		function typeNextLetter() {
			if (currentIndex < originalText.length) {
				typingElement.textContent += originalText[currentIndex];
				currentIndex++;
				setTimeout(typeNextLetter, typingSpeed);
			} else {
				// Hide cursor after typing is complete
				setTimeout(() => {
					cursorElement.classList.add("hide");
				}, 500);
			}
		}

		// Start typing after a small delay
		setTimeout(typeNextLetter, 1000);
	}
});

// Floating particles background
document.addEventListener("DOMContentLoaded", function () {
	const particleCount = 18; // 15-20 particles as requested

	// Create particles container
	const particlesContainer = document.createElement("div");
	particlesContainer.className = "particles";
	document.body.appendChild(particlesContainer);

	// Generate particles
	for (let i = 0; i < particleCount; i++) {
		const particle = document.createElement("div");
		particle.className = "particle";

		// Random horizontal starting position
		const startX = Math.random() * 100;
		particle.style.left = `${startX}%`;

		// Random size variation (2-4px)
		const size = 2 + Math.random() * 2;
		particle.style.width = `${size}px`;
		particle.style.height = `${size}px`;

		// Random horizontal drift during animation
		const driftX = (Math.random() - 0.5) * 200; // -100px to +100px drift
		particle.style.setProperty("--drift-x", `${driftX}px`);

		particlesContainer.appendChild(particle);
	}

	console.log(`${particleCount} particles created`); // Debug
});

// Mobile profile photo toggle
document.addEventListener("DOMContentLoaded", function () {
	const nameHighlight = document.querySelector(".name-highlight");
	const profilePhoto = document.querySelector(".profile-photo");

	// Function to detect mobile devices
	function isMobile() {
		return window.innerWidth <= 768 || "ontouchstart" in window;
	}

	// Toggle photo visibility
	function toggleProfilePhoto() {
		if (isMobile()) {
			// Mobile: toggle mobile-visible class
			if (profilePhoto.classList.contains("mobile-visible")) {
				profilePhoto.classList.remove("mobile-visible");
			} else {
				profilePhoto.classList.add("mobile-visible");
			}
		} else {
			// Desktop: toggle clicked-visible class
			if (profilePhoto.classList.contains("clicked-visible")) {
				profilePhoto.classList.remove("clicked-visible");
			} else {
				profilePhoto.classList.add("clicked-visible");
			}
		}
	}

	// Add click event for both mobile and desktop
	if (nameHighlight && profilePhoto) {
		nameHighlight.addEventListener("click", function (e) {
			e.preventDefault();
			toggleProfilePhoto();
			console.log("Profile photo toggled"); // Debug
		});

		// Hide photo when clicking elsewhere
		document.addEventListener("click", function (e) {
			if (
				!nameHighlight.contains(e.target) &&
				!profilePhoto.contains(e.target)
			) {
				if (isMobile()) {
					profilePhoto.classList.remove("mobile-visible");
				} else {
					profilePhoto.classList.remove("clicked-visible");
				}
			}
		});

		// Handle viewport changes (responsive behavior)
		window.addEventListener("resize", function () {
			// Check if photo is currently visible
			const isPhotoVisible =
				profilePhoto.classList.contains("mobile-visible") ||
				profilePhoto.classList.contains("clicked-visible");

			if (isPhotoVisible) {
				// Remove both classes first
				profilePhoto.classList.remove(
					"mobile-visible",
					"clicked-visible"
				);

				// Add the appropriate class based on current viewport
				if (isMobile()) {
					profilePhoto.classList.add("mobile-visible");
				} else {
					profilePhoto.classList.add("clicked-visible");
				}
				console.log(
					"Profile photo position updated for viewport change"
				); // Debug
			}
		});
	}
});
