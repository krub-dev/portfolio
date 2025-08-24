/**
 * Portfolio Website JavaScript
 * Main script for interactive functionality including theme toggle, language switching,
 * typing effects, particles background, profile photo interactions, and easter eggs.
 */

// Configuration and constants
const CONFIG = {
	DEBUG: false, // Set to true for debug logging
	TYPING_SPEED: 120,
	PARTICLE_COUNT: 18,
	MOBILE_BREAKPOINT: 768
};

// Translations configuration - easily extensible
const TRANSLATIONS = {
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

// Global state
let currentLanguage = localStorage.getItem("language") || "en";

/**
 * Safe console logging based on DEBUG flag
 * @param {string} message - Message to log
 * @param {...any} args - Additional arguments to log
 */
function debugLog(message, ...args) {
	if (CONFIG.DEBUG) {
		console.log(message, ...args);
	}
}

/**
 * Safe DOM element selection with existence check
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (optional)
 * @returns {Element|null} - Found element or null
 */
function safeQuerySelector(selector, parent = document) {
	try {
		return parent.querySelector(selector);
	} catch (error) {
		debugLog(`Error selecting element: ${selector}`, error);
		return null;
	}
}

/**
 * Safe DOM elements selection with existence check
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (optional)
 * @returns {NodeList} - Found elements
 */
function safeQuerySelectorAll(selector, parent = document) {
	try {
		return parent.querySelectorAll(selector);
	} catch (error) {
		debugLog(`Error selecting elements: ${selector}`, error);
		return [];
	}
}

/**
 * Detect if current viewport is mobile
 * @returns {boolean} - True if mobile viewport
 */
function isMobile() {
	return window.innerWidth <= CONFIG.MOBILE_BREAKPOINT || "ontouchstart" in window;
}

/**
 * Initialize theme toggle functionality
 */
function setupThemeToggle() {
	const themeToggle = safeQuerySelector(".theme-toggle");
	const themeIcon = safeQuerySelector(".theme-icon");

	if (!themeToggle || !themeIcon) {
		debugLog("Theme toggle elements not found");
		return;
	}

	// Add accessibility attributes
	themeToggle.setAttribute("tabindex", "0");
	themeToggle.setAttribute("role", "button");
	themeToggle.setAttribute("aria-pressed", "false");

	// Get saved theme preference
	const savedTheme = localStorage.getItem("theme");
	let currentTheme = savedTheme || "dark";

	// Set initial theme
	if (currentTheme === "light") {
		document.documentElement.setAttribute("data-theme", "light");
		themeIcon.textContent = "☀️";
		themeToggle.setAttribute("aria-pressed", "true");
	} else {
		document.documentElement.removeAttribute("data-theme");
		themeIcon.textContent = "🌙";
		themeToggle.setAttribute("aria-pressed", "false");
	}

	// Theme toggle handler
	function toggleTheme() {
		debugLog("Theme toggle activated");
		const currentTheme = document.documentElement.getAttribute("data-theme");
		const newTheme = currentTheme === "light" ? "dark" : "light";

		if (newTheme === "light") {
			document.documentElement.setAttribute("data-theme", "light");
			themeIcon.textContent = "☀️";
			themeToggle.setAttribute("aria-pressed", "true");
		} else {
			document.documentElement.removeAttribute("data-theme");
			themeIcon.textContent = "🌙";
			themeToggle.setAttribute("aria-pressed", "false");
		}

		localStorage.setItem("theme", newTheme);
		debugLog(`Theme changed to: ${newTheme}`);
	}

	// Add event listeners
	themeToggle.addEventListener("click", toggleTheme);
	
	// Add keyboard support for accessibility
	themeToggle.addEventListener("keydown", function(e) {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			toggleTheme();
		}
	});
}

/**
 * Update language content
 * @param {string} lang - Language code (en/es)
 */
function updateLanguage(lang) {
	if (!TRANSLATIONS[lang]) {
		debugLog(`Language not supported: ${lang}`);
		return;
	}

	currentLanguage = lang;
	const langIcon = safeQuerySelector(".lang-icon");

	// Update language icon (show the language you can switch TO)
	if (langIcon) {
		langIcon.textContent = lang === "en" ? "ES" : "EN";
	}

	// Update all translatable elements
	const elementsToTranslate = safeQuerySelectorAll("[data-lang]");
	elementsToTranslate.forEach((element) => {
		const key = element.getAttribute("data-lang");
		if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
			element.innerHTML = TRANSLATIONS[lang][key];
		}
	});

	// Save preference
	localStorage.setItem("language", lang);
	debugLog(`Language changed to: ${lang}`);
}

/**
 * Initialize language toggle functionality
 */
function setupLanguageToggle() {
	const langToggle = safeQuerySelector(".lang-toggle");
	const langIcon = safeQuerySelector(".lang-icon");

	if (!langToggle || !langIcon) {
		debugLog("Language toggle elements not found");
		return;
	}

	// Add accessibility attributes
	langToggle.setAttribute("tabindex", "0");
	langToggle.setAttribute("role", "button");
	langToggle.setAttribute("aria-label", "Toggle language between English and Spanish");

	// Set initial language
	updateLanguage(currentLanguage);

	// Language toggle handler
	function toggleLanguage() {
		debugLog("Language toggle activated");
		const newLang = currentLanguage === "en" ? "es" : "en";
		updateLanguage(newLang);
	}

	// Add event listeners
	langToggle.addEventListener("click", toggleLanguage);
	
	// Add keyboard support for accessibility
	langToggle.addEventListener("keydown", function(e) {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			toggleLanguage();
		}
	});
}

/**
 * Initialize typing effect for KIKO text
 */
function setupTypingEffect() {
	const typingElement = safeQuerySelector(".typing-text");
	const cursorElement = safeQuerySelector(".typing-cursor");

	if (!typingElement || !cursorElement) {
		debugLog("Typing effect elements not found");
		return;
	}

	const originalText = "KIKO";
	let currentIndex = 0;

	// Start with empty text
	typingElement.textContent = "";

	function typeNextLetter() {
		if (currentIndex < originalText.length) {
			typingElement.textContent += originalText[currentIndex];
			currentIndex++;
			setTimeout(typeNextLetter, CONFIG.TYPING_SPEED);
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

/**
 * Initialize floating particles background
 */
function setupParticles() {
	// Create particles container
	const particlesContainer = document.createElement("div");
	particlesContainer.className = "particles";
	particlesContainer.setAttribute("aria-hidden", "true"); // Decorative element
	document.body.appendChild(particlesContainer);

	// Generate particles
	for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
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

	debugLog(`${CONFIG.PARTICLE_COUNT} particles created`);
}

/**
 * Toggle profile photo visibility
 * @param {Element} profilePhoto - Profile photo element
 */
function toggleProfilePhoto(profilePhoto) {
	if (!profilePhoto) return;

	if (isMobile()) {
		// Mobile: toggle mobile-visible class
		profilePhoto.classList.toggle("mobile-visible");
	} else {
		// Desktop: toggle clicked-visible class
		profilePhoto.classList.toggle("clicked-visible");
	}
}

/**
 * Initialize profile photo interactions
 */
function setupProfilePhoto() {
	const nameHighlight = safeQuerySelector(".name-highlight");
	const profilePhoto = safeQuerySelector(".profile-photo");

	if (!nameHighlight || !profilePhoto) {
		debugLog("Profile photo elements not found");
		return;
	}

	// Add accessibility attributes
	nameHighlight.setAttribute("tabindex", "0");
	nameHighlight.setAttribute("role", "button");
	nameHighlight.setAttribute("aria-label", "Click to toggle profile photo");
	nameHighlight.setAttribute("aria-expanded", "false");

	// Profile photo toggle handler
	function handlePhotoToggle(e) {
		e.preventDefault();
		toggleProfilePhoto(profilePhoto);
		
		// Update aria-expanded
		const isVisible = profilePhoto.classList.contains("mobile-visible") || 
		                 profilePhoto.classList.contains("clicked-visible");
		nameHighlight.setAttribute("aria-expanded", isVisible.toString());
		
		debugLog("Profile photo toggled");
	}

	// Add click event for both mobile and desktop
	nameHighlight.addEventListener("click", handlePhotoToggle);
	
	// Add keyboard support for accessibility
	nameHighlight.addEventListener("keydown", function(e) {
		if (e.key === "Enter" || e.key === " ") {
			handlePhotoToggle(e);
		}
	});

	// Hide photo when clicking elsewhere
	document.addEventListener("click", function (e) {
		if (!nameHighlight.contains(e.target) && !profilePhoto.contains(e.target)) {
			profilePhoto.classList.remove("mobile-visible", "clicked-visible");
			nameHighlight.setAttribute("aria-expanded", "false");
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
			profilePhoto.classList.remove("mobile-visible", "clicked-visible");

			// Add the appropriate class based on current viewport
			if (isMobile()) {
				profilePhoto.classList.add("mobile-visible");
			} else {
				profilePhoto.classList.add("clicked-visible");
			}
			debugLog("Profile photo position updated for viewport change");
		}
	});
}

/**
 * Initialize Rick Roll easter egg
 */
function setupRickRollEasterEgg() {
	const lemonIcon = safeQuerySelector(".lemon-icon");
	const container = safeQuerySelector("#rickroll-video");
	
	if (!lemonIcon || !container) {
		debugLog("Rick roll elements not found");
		return;
	}

	const video = safeQuerySelector("video", container);
	const closeButton = safeQuerySelector(".close-video");

	if (!video || !closeButton) {
		debugLog("Video or close button not found");
		return;
	}

	// Add accessibility attributes
	lemonIcon.setAttribute("tabindex", "0");
	lemonIcon.setAttribute("role", "button");
	lemonIcon.setAttribute("aria-label", "Easter egg - click for surprise");

	// Function to open the video
	function openVideo() {
		debugLog("Lemon clicked!");
		
		// Hide the lemon and show the video container
		lemonIcon.style.display = "none";
		container.style.display = "block";

		// Enable sound and play
		video.muted = false;
		video.currentTime = 0; // Start from the beginning
		video
			.play()
			.then(() => {
				debugLog("Video playing");
			})
			.catch((e) => {
				debugLog("Error playing video:", e);
			});

		debugLog("Container shown, lemon hidden");
	}

	// Function to close the video
	function closeVideo() {
		debugLog("Close button clicked");
		
		// Stop the video and hide container
		video.pause();
		video.currentTime = 0;
		container.style.display = "none";

		// Show the lemon again
		lemonIcon.style.display = "block";

		debugLog("Video closed, lemon visible again");
	}

	// Add event listeners
	lemonIcon.addEventListener("click", openVideo);
	
	// Add keyboard support for accessibility
	lemonIcon.addEventListener("keydown", function(e) {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			openVideo();
		}
	});

	closeButton.addEventListener("click", closeVideo);
}

/**
 * Initialize Murcia sound easter egg
 */
function setupMurciaEasterEgg() {
	const murciaTrigger = safeQuerySelector(".murcia-trigger");
	const audio = safeQuerySelector("#murcia-sound");

	if (!murciaTrigger || !audio) {
		debugLog("Murcia easter egg elements not found");
		return;
	}

	// Add accessibility attributes
	murciaTrigger.setAttribute("tabindex", "0");
	murciaTrigger.setAttribute("role", "button");
	murciaTrigger.setAttribute("aria-label", "Play Murcia sound");

	function playMurciaSound() {
		debugLog("Murcia clicked!");
		
		// Reset audio to beginning and play
		audio.currentTime = 0;
		audio
			.play()
			.then(() => {
				debugLog("Murcia sound playing");
			})
			.catch((e) => {
				debugLog("Error playing Murcia sound:", e);
			});
	}

	// Add event listeners
	murciaTrigger.addEventListener("click", playMurciaSound);
	
	// Add keyboard support for accessibility
	murciaTrigger.addEventListener("keydown", function(e) {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			playMurciaSound();
		}
	});
}

/**
 * Initialize all easter eggs
 */
function setupEasterEggs() {
	setupRickRollEasterEgg();
	setupMurciaEasterEgg();
}

/**
 * Main application initialization
 * Unified entry point for all functionality
 */
function initializeApp() {
	debugLog("Initializing portfolio application...");

	// Initialize all components
	setupThemeToggle();
	setupLanguageToggle();
	setupTypingEffect();
	setupParticles();
	setupProfilePhoto();
	setupEasterEggs();

	debugLog("Portfolio application initialized successfully");
}

// Single DOMContentLoaded event listener - unified initialization
document.addEventListener("DOMContentLoaded", initializeApp);