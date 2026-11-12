/**
 * Sacred Trails - Devotional Pilgrimage Tour Operator
 * Core Client-Side Interactions & Utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeAndRTL();
  initStickyNavbar();
  initHomeDropdown();
  initMobileDrawer();
  initBackToTop();
  initDatePickers();
  initBookingModals();
  initFormValidations();
  initTourFilters();
  initItineraryAccordions();
  initDeityTabs();
  initHoverVideoPreviews();
  initGalleryLightbox();
  initContactPageParams();
  initBlogPage();
});

/* --------------------------------------------------------------------------
   1. THEME & RTL MANAGEMENT (With LocalStorage Persistence)
   -------------------------------------------------------------------------- */
function initThemeAndRTL() {
  const html = document.documentElement;
  const themeBtns = document.querySelectorAll('.theme-toggle-btn');
  const rtlBtns = document.querySelectorAll('.rtl-toggle-btn');

  // Load Saved Theme: Default is 'light' ("Sattvic Gold")
  const savedTheme = localStorage.getItem('sacred_trails_theme') || 'light';
  applyTheme(savedTheme);

  // Load Saved RTL: Default is 'ltr'
  const savedRTL = localStorage.getItem('sacred_trails_rtl') || 'ltr';
  applyRTL(savedRTL);

  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('sacred_trails_theme', next);
    });
  });

  rtlBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = html.getAttribute('dir') || 'ltr';
      const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      applyRTL(nextDir);
      localStorage.setItem('sacred_trails_rtl', nextDir);
    });
  });

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    const themeName = theme === 'dark' ? 'Kailash Night' : 'Sattvic Gold';
    const iconClass = theme === 'dark' ? 'fa-sun' : 'fa-moon';

    themeBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = `fas ${iconClass}`;
      }
      btn.setAttribute('title', `Toggle Theme (${themeName})`);
      btn.setAttribute('aria-label', `Toggle Theme (${themeName})`);
    });
  }

  function applyRTL(dir) {
    html.setAttribute('dir', dir);
    const label = dir === 'rtl' ? 'Switch to LTR layout' : 'Switch to RTL layout';
    rtlBtns.forEach(btn => {
      const textSpan = btn.querySelector('.rtl-name');
      if (textSpan) {
        textSpan.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      }
      btn.setAttribute('title', label);
      btn.setAttribute('aria-label', label);
    });
  }
}

/* --------------------------------------------------------------------------
   2. STICKY NAVBAR
   -------------------------------------------------------------------------- */
function initStickyNavbar() {
  const header = document.querySelector('.header-sticky');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --------------------------------------------------------------------------
   2B. SINGLE HOME BUTTON DROPDOWN (Click to display both Home buttons)
   -------------------------------------------------------------------------- */
function initHomeDropdown() {
  const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
  const dropdownItem = document.querySelector('.nav-dropdown-item');
  const mobileHomeToggle = document.querySelector('.mobile-dropdown-btn');
  const mobileHomeSub = document.querySelector('.mobile-dropdown-sub');

  if (dropdownToggle && dropdownItem) {
    dropdownToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = dropdownItem.classList.contains('open');
      dropdownItem.classList.toggle('open', !isOpen);
      dropdownToggle.setAttribute('aria-expanded', String(!isOpen));
    });

    document.addEventListener('click', (e) => {
      if (!dropdownItem.contains(e.target)) {
        dropdownItem.classList.remove('open');
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdownItem.classList.remove('open');
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (mobileHomeToggle && mobileHomeSub) {
    mobileHomeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = mobileHomeSub.classList.contains('open');
      mobileHomeSub.classList.toggle('open', !isOpen);
      mobileHomeToggle.classList.toggle('open', !isOpen);
      mobileHomeToggle.setAttribute('aria-expanded', String(!isOpen));
    });
  }
}

/* --------------------------------------------------------------------------
   3. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const hamburger = document.querySelector('.hamburger-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.querySelector('.mobile-nav-backdrop');
  const closeBtn = document.querySelector('.mobile-drawer-close');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link, .mobile-sub-link');

  if (!drawer || !backdrop) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (hamburger) hamburger.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   4. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   5. DATE PICKERS (Min Date = Today)
   -------------------------------------------------------------------------- */
function initDatePickers() {
  const today = new Date().toISOString().split('T')[0];
  const dateInputs = document.querySelectorAll('input[type="date"]');
  dateInputs.forEach(input => {
    input.min = today;
    if (!input.value) {
      // default to 7 days from now
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 14);
      input.value = nextWeek.toISOString().split('T')[0];
    }
  });
}

/* --------------------------------------------------------------------------
   6. BOOKING & ENQUIRY MODALS
   -------------------------------------------------------------------------- */
function initBookingModals() {
  const triggers = document.querySelectorAll('[data-open-modal]');
  const closeBtns = document.querySelectorAll('[data-close-modal]');
  const backdrops = document.querySelectorAll('.modal-backdrop');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-open-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        // Cache original values on first open so we can restore them cleanly
        const titleEl = targetModal.querySelector('h3');
        const descEl = targetModal.querySelector('.modal-dialog > .text-center > p') || targetModal.querySelector('.text-center p');
        const tagEl = targetModal.querySelector('.section-tag');
        const submitBtn = targetModal.querySelector('button[type="submit"]');
        const pujaCheck = targetModal.querySelector('input[name="req_puja"]');
        const pkgSelect = targetModal.querySelector('select[name="package"]');

        if (!targetModal.dataset.defaultTitle && titleEl) {
          targetModal.dataset.defaultTitle = titleEl.innerHTML;
        }
        if (!targetModal.dataset.defaultDesc && descEl) {
          targetModal.dataset.defaultDesc = descEl.innerHTML;
        }
        if (!targetModal.dataset.defaultTag && tagEl) {
          targetModal.dataset.defaultTag = tagEl.innerHTML;
        }
        if (!targetModal.dataset.defaultBtn && submitBtn) {
          targetModal.dataset.defaultBtn = submitBtn.innerHTML;
        }
        if (pujaCheck && targetModal.dataset.defaultPuja === undefined) {
          targetModal.dataset.defaultPuja = pujaCheck.checked ? 'true' : 'false';
        }

        // Read custom attributes from the trigger
        const customTitle = trigger.getAttribute('data-modal-title');
        const customDesc = trigger.getAttribute('data-modal-desc');
        const customTag = trigger.getAttribute('data-modal-tag');
        const customBtn = trigger.getAttribute('data-btn-text');
        const checkPuja = trigger.getAttribute('data-check-puja');
        const pkgName = trigger.getAttribute('data-package');

        // Apply custom values or restore defaults
        if (titleEl) {
          titleEl.innerHTML = customTitle || targetModal.dataset.defaultTitle || titleEl.innerHTML;
        }
        if (descEl) {
          descEl.innerHTML = customDesc || targetModal.dataset.defaultDesc || descEl.innerHTML;
        }
        if (tagEl) {
          tagEl.innerHTML = customTag || targetModal.dataset.defaultTag || tagEl.innerHTML;
        }
        if (submitBtn) {
          if (customBtn) {
            submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> ${customBtn}`;
          } else if (targetModal.dataset.defaultBtn) {
            submitBtn.innerHTML = targetModal.dataset.defaultBtn;
          }
        }
        if (pujaCheck) {
          if (checkPuja === 'true') {
            pujaCheck.checked = true;
          } else if (targetModal.dataset.defaultPuja !== undefined) {
            pujaCheck.checked = (targetModal.dataset.defaultPuja === 'true');
          }
        }

        // Package selection
        if (pkgSelect) {
          if (pkgName) {
            let found = false;
            for (let i = 0; i < pkgSelect.options.length; i++) {
              const optVal = pkgSelect.options[i].value.toLowerCase();
              const optTxt = pkgSelect.options[i].text.toLowerCase();
              const targetLow = pkgName.toLowerCase();
              if (optVal.includes(targetLow) || optTxt.includes(targetLow) || targetLow.includes(optVal)) {
                pkgSelect.selectedIndex = i;
                found = true;
                break;
              }
            }
            if (!found) {
              const newOpt = new Option(pkgName, pkgName, true, true);
              pkgSelect.add(newOpt, 0);
              pkgSelect.selectedIndex = 0;
            }
            targetModal.dataset.lastCustomPkg = 'true';
          } else {
            // If opened without a specific package attribute, restore to the default first package if previously customized
            if (targetModal.dataset.lastCustomPkg) {
              pkgSelect.selectedIndex = 0;
              delete targetModal.dataset.lastCustomPkg;
            }
          }
        }

        openModal(targetModal);
      }
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-backdrop');
      if (modal) closeModal(modal);
    });
  });

  backdrops.forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.open').forEach(m => closeModal(m));
    }
  });
}

function openModal(modal) {
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

/* --------------------------------------------------------------------------
   7. FORM VALIDATION & CONFIRMATION
   -------------------------------------------------------------------------- */
function initFormValidations() {
  const bookingForms = document.querySelectorAll('.yatra-enquiry-form');

  bookingForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateForm(form)) {
        handleFormSuccess(form);
      }
    });
  });

  function validateForm(form) {
    let isValid = true;

    // Name
    const nameField = form.querySelector('input[name="fullname"]');
    if (nameField) {
      if (!nameField.value.trim() || nameField.value.trim().length < 3) {
        setFieldError(nameField, 'Please enter devotee full name (minimum 3 characters).');
        isValid = false;
      } else {
        clearFieldError(nameField);
      }
    }

    // Email
    const emailField = form.querySelector('input[name="email"]');
    if (emailField) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailField.value.trim() || !emailPattern.test(emailField.value.trim())) {
        setFieldError(emailField, 'Please enter a valid email address.');
        isValid = false;
      } else {
        clearFieldError(emailField);
      }
    }

    // Phone (10 digits)
    const phoneField = form.querySelector('input[name="phone"]');
    if (phoneField) {
      const phoneDigits = phoneField.value.replace(/\D/g, '');
      if (phoneDigits.length < 10) {
        setFieldError(phoneField, 'Please enter a valid 10-digit mobile or WhatsApp number.');
        isValid = false;
      } else {
        clearFieldError(phoneField);
      }
    }

    // Travel Date
    const dateField = form.querySelector('input[name="travel_date"]');
    if (dateField) {
      const selected = new Date(dateField.value);
      const today = new Date();
      today.setHours(0,0,0,0);
      if (!dateField.value || selected < today) {
        setFieldError(dateField, 'Please select a valid upcoming travel date.');
        isValid = false;
      } else {
        clearFieldError(dateField);
      }
    }

    // Guests
    const guestsField = form.querySelector('input[name="guests"]');
    if (guestsField) {
      const count = parseInt(guestsField.value, 10);
      if (isNaN(count) || count < 1) {
        setFieldError(guestsField, 'Please enter at least 1 devotee.');
        isValid = false;
      } else {
        clearFieldError(guestsField);
      }
    }

    return isValid;
  }

  function setFieldError(field, message) {
    const group = field.closest('.form-group');
    if (group) {
      group.classList.add('has-error');
      let errorSpan = group.querySelector('.form-error');
      if (!errorSpan) {
        errorSpan = document.createElement('div');
        errorSpan.className = 'form-error';
        group.appendChild(errorSpan);
      }
      errorSpan.textContent = message;
      errorSpan.style.display = 'block';
    }
  }

  function clearFieldError(field) {
    const group = field.closest('.form-group');
    if (group) {
      group.classList.remove('has-error');
      const errorSpan = group.querySelector('.form-error');
      if (errorSpan) errorSpan.style.display = 'none';
    }
  }

  function handleFormSuccess(form) {
    // Generate Sacred Reference Number
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const refCode = `ST-2026-YATRA-${randomNum}`;

    const devoteeName = form.querySelector('input[name="fullname"]')?.value || 'Devotee';
    const pkgSelect = form.querySelector('select[name="package"]');
    const selectedPkg = pkgSelect ? pkgSelect.options[pkgSelect.selectedIndex].text : 'Divine Pilgrimage';
    const isPandit = selectedPkg.toLowerCase().includes('pandit') || selectedPkg.toLowerCase().includes('acharya');

    // Check if within modal
    const parentModal = form.closest('.modal-backdrop');
    if (parentModal) {
      closeModal(parentModal);
    }

    // Open Success Modal
    const successModal = document.getElementById('successModal');
    if (successModal) {
      const refSpan = successModal.querySelector('.booking-ref-number');
      const nameSpan = successModal.querySelector('.success-devotee-name');
      const pkgSpan = successModal.querySelector('.success-package-name');
      const successTitle = successModal.querySelector('h3');

      if (!successModal.dataset.defaultTitle && successTitle) {
        successModal.dataset.defaultTitle = successTitle.innerHTML;
      }
      if (successTitle) {
        if (isPandit) {
          successTitle.innerHTML = 'Pandit Consultation Request Confirmed';
        } else if (successModal.dataset.defaultTitle) {
          successTitle.innerHTML = successModal.dataset.defaultTitle;
        }
      }

      if (refSpan) refSpan.textContent = refCode;
      if (nameSpan) nameSpan.textContent = devoteeName;
      if (pkgSpan) pkgSpan.textContent = selectedPkg;

      openModal(successModal);
    } else {
      alert(`Booking Confirmed!\nThank you, ${devoteeName}!\nYour pilgrimage enquiry for ${selectedPkg} has been received.\nBooking Reference: ${refCode}\nOur Yatra Coordinator will contact you shortly.`);
    }

    form.reset();
  }
}

/* --------------------------------------------------------------------------
   8. TOUR PACKAGE FILTERING & LIVE SEARCH
   -------------------------------------------------------------------------- */
function initTourFilters() {
  const filterSection = document.querySelector('.packages-filter-area');
  if (!filterSection) return;

  const searchInput = filterSection.querySelector('#yatraSearchInput');
  const regionChips = filterSection.querySelectorAll('[data-filter-region]');
  const themeChips = filterSection.querySelectorAll('[data-filter-theme]');
  const durationChips = filterSection.querySelectorAll('[data-filter-duration]');
  const sortSelect = filterSection.querySelector('#yatraSortSelect');
  const resetBtn = filterSection.querySelector('#resetFiltersBtn');
  const counterSpan = filterSection.querySelector('#filteredCount');
  const packageCards = document.querySelectorAll('.package-card');
  const noResultsBox = document.querySelector('#noYatrasFound');

  let activeRegion = 'all';
  let activeTheme = 'all';
  let activeDuration = 'all';
  let searchQuery = '';

  // Process URL Query Parameters (Deep Linking from Home, Destination Cards, etc.)
  const urlParams = new URLSearchParams(window.location.search);
  const destParam = urlParams.get('destination') || urlParams.get('theme') || urlParams.get('circuit');
  const regionParam = urlParams.get('region');
  const searchParam = urlParams.get('search');
  const modeParam = urlParams.get('mode');

  if (destParam && destParam !== 'all') {
    let matchedTheme = false;
    themeChips.forEach(chip => {
      const chipTheme = chip.getAttribute('data-filter-theme');
      if (chipTheme === destParam || destParam.includes(chipTheme) || chipTheme.includes(destParam)) {
        themeChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeTheme = chipTheme;
        matchedTheme = true;
      }
    });

    if (!matchedTheme) {
      searchQuery = destParam.replace(/-/g, ' ');
      if (searchInput) searchInput.value = searchQuery;
    }
  }

  if (regionParam && regionParam !== 'all') {
    regionChips.forEach(chip => {
      if (chip.getAttribute('data-filter-region') === regionParam) {
        regionChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeRegion = regionParam;
      }
    });
  }

  if (modeParam === 'helicopter') {
    themeChips.forEach(chip => {
      if (chip.getAttribute('data-filter-theme') === 'helicopter') {
        themeChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeTheme = 'helicopter';
      }
    });
  }

  if (searchParam) {
    searchQuery = searchParam.toLowerCase().trim();
    if (searchInput) searchInput.value = searchParam;
  }

  // Search Input listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }

  // Region chips
  regionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      regionChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeRegion = chip.getAttribute('data-filter-region');
      applyFilters();
    });
  });

  // Theme chips
  themeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      themeChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeTheme = chip.getAttribute('data-filter-theme');
      applyFilters();
    });
  });

  // Duration chips
  durationChips.forEach(chip => {
    chip.addEventListener('click', () => {
      durationChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeDuration = chip.getAttribute('data-filter-duration');
      applyFilters();
    });
  });

  // Sort select
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      sortPackages(sortSelect.value);
    });
  }

  // Reset Button
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      activeRegion = 'all';
      activeTheme = 'all';
      activeDuration = 'all';

      regionChips.forEach(c => c.classList.toggle('active', c.getAttribute('data-filter-region') === 'all'));
      themeChips.forEach(c => c.classList.toggle('active', c.getAttribute('data-filter-theme') === 'all'));
      durationChips.forEach(c => c.classList.toggle('active', c.getAttribute('data-filter-duration') === 'all'));

      if (sortSelect) sortSelect.selectedIndex = 0;
      applyFilters();
    });
  }

  // Trigger initial filter application (in case URL params were present)
  applyFilters();

  function applyFilters() {
    let visibleCount = 0;

    packageCards.forEach(card => {
      const cardRegion = card.getAttribute('data-region') || '';
      const cardTheme = card.getAttribute('data-theme-type') || '';
      const cardDuration = card.getAttribute('data-duration-type') || '';
      const cardText = card.textContent.toLowerCase();

      const matchesRegion = (activeRegion === 'all' || cardRegion.split(' ').includes(activeRegion));
      const matchesTheme = (activeTheme === 'all' || cardTheme.split(' ').includes(activeTheme));
      const matchesDuration = (activeDuration === 'all' || cardDuration.split(' ').includes(activeDuration));
      const matchesSearch = (!searchQuery || cardText.includes(searchQuery));

      if (matchesRegion && matchesTheme && matchesDuration && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (counterSpan) counterSpan.textContent = visibleCount;
    if (noResultsBox) {
      noResultsBox.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  function sortPackages(criteria) {
    const container = document.querySelector('.packages-grid');
    if (!container) return;

    const cardsArray = Array.from(packageCards);

    cardsArray.sort((a, b) => {
      const priceA = parseInt(a.getAttribute('data-price') || '0', 10);
      const priceB = parseInt(b.getAttribute('data-price') || '0', 10);
      const daysA = parseInt(a.getAttribute('data-days') || '0', 10);
      const daysB = parseInt(b.getAttribute('data-days') || '0', 10);

      if (criteria === 'price-asc') return priceA - priceB;
      if (criteria === 'price-desc') return priceB - priceA;
      if (criteria === 'duration-asc') return daysA - daysB;
      if (criteria === 'duration-desc') return daysB - daysA;
      return 0; // default
    });

    cardsArray.forEach(card => container.appendChild(card));
  }
}

/* --------------------------------------------------------------------------
   9. ITINERARY ACCORDIONS & CIRCUIT SWITCHER (With URL Hash Deep-Linking)
   -------------------------------------------------------------------------- */
function initItineraryAccordions() {
  const circuitPills = document.querySelectorAll('.circuit-pill');
  const itineraryPanels = document.querySelectorAll('.itinerary-panel');

  function activateCircuit(targetId, shouldScroll = false) {
    if (!targetId) return;
    let found = false;
    circuitPills.forEach(p => {
      const match = p.getAttribute('data-circuit') === targetId;
      p.classList.toggle('active', match);
      if (match) found = true;
    });

    if (found) {
      itineraryPanels.forEach(panel => {
        panel.style.display = (panel.id === targetId) ? 'block' : 'none';
      });

      if (shouldScroll) {
        setTimeout(() => {
          const selector = document.querySelector('.itinerary-circuit-selector');
          const panel = document.getElementById(targetId);
          const targetElem = selector || panel;
          if (targetElem) {
            targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 120);
      }
    }
  }

  circuitPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const targetId = pill.getAttribute('data-circuit');
      activateCircuit(targetId, false);
      // Update hash in URL
      if (history.replaceState) {
        history.replaceState(null, null, `#${targetId}`);
      }
    });
  });

  // Listen for hash change (e.g. browser back/forward or footer clicks)
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash ? window.location.hash.substring(1) : null;
    if (hash && hash.startsWith('circuit-')) {
      activateCircuit(hash, true);
    }
  });

  // Intercept clicks on links pointing to #circuit- so on itineraries page it switches and scrolls immediately
  document.querySelectorAll('a[href*="#circuit-"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const hashIndex = href.indexOf('#circuit-');
      if (hashIndex !== -1) {
        const targetCircuit = href.substring(hashIndex + 1);
        const isCurrentPageItineraries = window.location.pathname.endsWith('itineraries.html') || 
                                        document.querySelector('.itinerary-circuit-selector') !== null;
        if (isCurrentPageItineraries) {
          e.preventDefault();
          activateCircuit(targetCircuit, true);
          if (history.pushState) {
            history.pushState(null, null, `#${targetCircuit}`);
          } else {
            window.location.hash = targetCircuit;
          }
        }
      }
    });
  });

  // Auto-activate circuit if URL has #circuit-... or ?circuit=... on initial page load
  const urlParams = new URLSearchParams(window.location.search);
  const targetFromParam = urlParams.get('circuit');
  const targetFromHash = window.location.hash ? window.location.hash.substring(1) : null;
  const initialCircuit = targetFromParam || targetFromHash;

  if (initialCircuit && initialCircuit.startsWith('circuit-')) {
    activateCircuit(initialCircuit, true);
  }

  // Accordion Toggle
  const accordions = document.querySelectorAll('.accordion-header');
  accordions.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      if (!item) return;

      const isActive = item.classList.contains('active');
      
      const siblingItems = item.parentElement.querySelectorAll('.accordion-item');
      siblingItems.forEach(sib => sib.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   10. HOMEPAGE 2 DEITY TABS
   -------------------------------------------------------------------------- */
function initDeityTabs() {
  const deityBtns = document.querySelectorAll('.deity-tab-btn');
  const deityPanels = document.querySelectorAll('.deity-content-panel');

  deityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-deity');
      deityBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      deityPanels.forEach(panel => {
        if (panel.id === `deity-${target}`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   11. MODERN HOVER VIDEO PREVIEWS (TAILWIND / BOOTSTRAP 5 UX)
   -------------------------------------------------------------------------- */
function initHoverVideoPreviews() {
  const videoContainers = document.querySelectorAll('.video-hover-enabled');
  if (!videoContainers.length) return;

  videoContainers.forEach(container => {
    const video = container.querySelector('.package-hover-video');
    const pill = container.querySelector('.video-preview-pill');
    const pillText = pill ? pill.querySelector('.preview-text') : null;
    const soundToggle = container.querySelector('.video-sound-toggle');
    const progressBar = container.querySelector('.video-progress-bar');
    const parentCard = container.closest('.package-card');

    if (!video) return;

    let isPlaying = false;

    const playVideo = () => {
      container.classList.add('is-playing');
      if (pill) {
        pill.classList.add('is-active');
        if (pillText) pillText.textContent = 'Live Preview';
      }
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            isPlaying = true;
          })
          .catch(() => {
            // Autoplay gracefully prevented or aborted on rapid leave
          });
      }
    };

    const pauseVideo = () => {
      container.classList.remove('is-playing');
      if (pill) {
        pill.classList.remove('is-active');
        if (pillText) pillText.textContent = '';
      }
      video.pause();
      video.currentTime = 0;
      if (progressBar) progressBar.style.width = '0%';
      isPlaying = false;
    };

    // Track playback progress
    video.addEventListener('timeupdate', () => {
      if (video.duration && progressBar) {
        const percent = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${percent}%`;
      }
    });

    // Reset when video ends / loops
    video.addEventListener('ended', () => {
      if (progressBar) progressBar.style.width = '0%';
    });

    // Hover triggers on desktop
    const triggerTarget = parentCard || container;
    triggerTarget.addEventListener('mouseenter', () => {
      playVideo();
    });

    triggerTarget.addEventListener('mouseleave', () => {
      pauseVideo();
    });

    // Pill click / tap toggle (for touch/mobile devices or direct clicking)
    if (pill) {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (video.paused) {
          playVideo();
          if (pillText) pillText.textContent = 'Tap to Stop';
        } else {
          pauseVideo();
        }
      });

      // Keyboard accessibility
      pill.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          pill.click();
        }
      });
    }

    // Audio mute / unmute toggle
    if (soundToggle) {
      soundToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (video.muted) {
          video.muted = false;
          soundToggle.classList.add('is-unmuted');
          soundToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
          soundToggle.setAttribute('title', 'Sound Unmuted (Click to Mute)');
        } else {
          video.muted = true;
          soundToggle.classList.remove('is-unmuted');
          soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
          soundToggle.setAttribute('title', 'Sound Muted (Click to Unmute)');
        }
      });
    }
  });
}

/* --------------------------------------------------------------------------
   12. SACRED IMAGE LIGHTBOX (Zero Redirect - View This Image Alone)
   -------------------------------------------------------------------------- */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item[data-lightbox-src]');
  const modal = document.getElementById('darshanLightboxModal');
  if (!modal || !galleryItems.length) return;

  const modalImg = modal.querySelector('#darshanLightboxImg');
  const modalTitle = modal.querySelector('#darshanLightboxTitle');
  const modalLocation = modal.querySelector('#darshanLightboxLocation');
  const closeBtn = modal.querySelector('[data-close-lightbox]');

  const openLightbox = (item) => {
    const src = item.getAttribute('data-lightbox-src') || (item.querySelector('img') ? item.querySelector('img').src : '');
    const title = item.getAttribute('data-lightbox-title') || '';
    const loc = item.getAttribute('data-lightbox-location') || '';

    if (modalImg) {
      modalImg.src = src;
      modalImg.alt = title;
    }
    if (modalTitle) modalTitle.textContent = title;
    if (modalLocation) modalLocation.innerHTML = loc;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(item);
    });
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(item);
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeLightbox();
    }
  });
}

/* --------------------------------------------------------------------------
   14. CONTACT PAGE & URL ENQUIRY PARAMETER HANDLING
   -------------------------------------------------------------------------- */
function initContactPageParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const enquiryParam = urlParams.get('enquiry') || urlParams.get('service') || urlParams.get('package');
  if (!enquiryParam) return;

  const forms = document.querySelectorAll('.yatra-enquiry-form');
  forms.forEach(form => {
    const pkgSelect = form.querySelector('select[name="package"]');
    if (pkgSelect) {
      const target = enquiryParam.toLowerCase();
      for (let i = 0; i < pkgSelect.options.length; i++) {
        if (pkgSelect.options[i].value.toLowerCase().includes(target) ||
            pkgSelect.options[i].text.toLowerCase().includes(target)) {
          pkgSelect.selectedIndex = i;
          break;
        }
      }
    }
    if (enquiryParam.toLowerCase().includes('pandit') || enquiryParam.toLowerCase().includes('consultation')) {
      const pujaCheck = form.querySelector('input[name="req_puja"]');
      if (pujaCheck) pujaCheck.checked = true;
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Pandit Consultation Request';
      }
    }
  });
}

/* --------------------------------------------------------------------------
   15. SACRED TRAILS JOURNAL / BLOG INTERACTIONS
   -------------------------------------------------------------------------- */
function initBlogPage() {
  const grid = document.getElementById('blogArticleGrid');
  if (!grid) return;

  const ARTICLES = {
    'featured-chardham': {
      category: 'Himalayan Yatras',
      title: '2026–2027 Char Dham Yatra Blueprint: Opening Dates, Helicopter Logistics & Acclimatization Science',
      date: 'November 2026',
      readTime: '8 Min Read',
      author: 'Pandit Harishankar Sharma',
      role: 'Chief Yatra Acharya, Haridwar HQ',
      avatar: 'images/advisors/pandit-sharma.jpg',
      image: 'images/gallery/kedarnath-snow.jpg',
      fallbackImage: 'images/destinations/kedarnath.jpg',
      packageTitle: 'Sampurna Char Dham Maha Yatra',
      itineraryHref: 'itineraries.html#circuit-chardham',
      paragraphs: [
        'Every Akshaya Tritiya, the sacred portals of Yamunotri and Gangotri open amid Vedic conch shells and Himalayan snowmelt, followed days later by Kedarnath and Badrinath. For devotees planning the 2026–2027 Chota Char Dham pilgrimage, timing and graded elevation pacing are the difference between an exhausting dash and a deeply serene spiritual communion.',
        'Traditional Shastra prescribes the clockwise Dakshinavarta order: beginning with Yamunotri (3,291 m), bowing at Gangotri (3,100 m), ascending to Lord Shiva at Kedarnath (3,583 m), and completing the circuit with Lord Vishnu at Badrinath (3,300 m). Each shrine carries a distinct elemental energy — from hot thermal Surya Kund springs at Yamunotri to the tranquil Alaknanda confluence beside Neelkanth Peak.',
        'From a medical standpoint, atmospheric oxygen drops nearly 35% above 3,000 meters. Our expedition directors mandate a restorative night halt at Guptkashi or Barkot (1,300 m–1,500 m) before ascending to Kedarnath, paired with warm cardamom-tulsi hydration and morning/evening pulse oximeter tracking so elders travel safely.'
      ],
      takeaways: [
        'Follow the auspicious Yamunotri → Gangotri → Kedarnath → Badrinath clockwise circuit order.',
        'Pre-register mandatory Uttarakhand Yatra Biometric passes at least 45 days ahead of May/June departures.',
        'Combine road comfort with Phata/Sersi helicopter transfers when accompanying senior parents above age 65.'
      ],
      relatedIds: ['elderly-altitude', 'kedarnath-helicopter']
    },
    'jyotirlinga-axis': {
      category: 'Vedic Rituals',
      title: "The Spiritual Geometry of India's 12 Sacred Jyotirlingas: Pillars of Infinite Light",
      date: 'November 2026',
      readTime: '7 Min Read',
      author: 'Acharya Vedprakash Shastri',
      role: 'Senior Kashi Vedic Scholar',
      avatar: 'images/advisors/acharya-shastri.jpg',
      image: 'images/packages/jyotirlinga.jpg',
      fallbackImage: 'images/destinations/varanasi.jpg',
      packageTitle: '12 Jyotirlinga Maha Parikrama',
      itineraryHref: 'itineraries.html#circuit-jyotirlinga',
      paragraphs: [
        'Unlike ordinary Shiva shrines consecrated by human hands, the Dwadasa Jyotirlingas mark twelve sovereign sites across Bharat where Shiva manifested directly as an infinite pillar of radiant light (Jyoti). From Somnath touching the Arabian Sea to Rameswaram facing the Bay of Bengal, they trace a vast spiritual meridian across the subcontinent.',
        'Understanding the distinct regional rituals enriches every darshan. At Mahakaleshwar in Ujjain — the only south-facing Dakshinamurti Jyotirlinga — devotees witness the sacred pre-dawn Bhasma Aarti, whereas at Kashi Vishwanath and Trimbakeshwar, Bilva Patra and Rudrabhishek chantings follow centuries-old Dashanami traditions.',
        'We structure our Parikramas in harmonious geographic clusters (Gujarat Coastal, Central Narmada-Malwa, Maharashtra Sahyadri, and Himalayan-Kashi-Southern legs) so devotees experience unhurried Rudrabhishek pujas rather than hurried highway transit.'
      ],
      takeaways: [
        'Carry pure Gangajal from Haridwar or Varanasi for traditional abhishek at Rameswaram Jyotirlinga.',
        'Reserve Mahakaleshwar Bhasma Aarti and Somnath evening light-and-sound slots 30 days prior.',
        'Observe simple Satvik light meals before early-morning Panchamrit Abhishek rituals.'
      ],
      relatedIds: ['kashi-moksha-triangle', 'muhurta-calendar']
    },
    'arupadai-veedu': {
      category: 'South Temples',
      title: "Arupadai Veedu: Decoding Lord Murugan's Six Ancient Warrior Abodes",
      date: 'October 2026',
      readTime: '6 Min Read',
      author: 'Dr. Meenakshi Swaminathan',
      role: 'Agama Architecture & Heritage Advisor',
      avatar: 'images/advisors/dr-swaminathan.jpg',
      image: 'images/destinations/tiruchendur-murugan.jpg',
      fallbackImage: 'images/packages/murugan-arupadaiveedu.jpg',
      packageTitle: 'Arupadai Veedu - 6 Abodes of Murugan',
      itineraryHref: 'itineraries.html#circuit-south',
      paragraphs: [
        'Sangam Tamil literature celebrates six hallowed battlefields and hill sanctuaries — Arupadai Veedu — where Lord Kartikeya (Murugan) bestowed grace upon his devotees and vanquished inner ignorance. Together, Thirupparankundram, Tiruchendur, Palani, Swamimalai, Thiruthani, and Pazhamudircholai form one of South India’s most spiritually electrifying circuits.',
        'Notice how five of the six shrines crown sacred hills (Kurinji), while Tiruchendur uniquely stands right beside the roaring ocean waves (Neithal), where legend holds the sea itself respectfully withdrew to offer sanctum space. Each temple follows strict Agama Shastra worship timetables.',
        'At Palani Dhandayuthapani, elders can conveniently ascend via winch train or rope car rather than climbing all 659 stone steps, while devotees can partake in sacred Panchamritam prasadam prepared with hill bananas, jaggery, and pure ghee.'
      ],
      takeaways: [
        'Dress in traditional Tamil attire (cotton/silk dhoti with angavastram or saree/salwar) for sanctum entry.',
        'Pre-book Palani Hill winch passes to ensure zero stair fatigue for senior devotees.',
        'Plan dawn visits at Tiruchendur for tranquil sea-shore Naazhi Kinaru sacred bath.'
      ],
      relatedIds: ['tirupati-etiquette', 'satvik-fasting']
    },
    'elderly-altitude': {
      category: 'Senior Care',
      title: 'High-Altitude Yatra Guide for Elderly Parents: SpO2 Monitoring, Palkis & Gentle Pacing',
      date: 'October 2026',
      readTime: '6 Min Read',
      author: 'Capt. Vikramaditya Rawat (Retd.)',
      role: 'Himalayan Logistics & Medical Chief',
      avatar: 'images/advisors/capt-rawat.jpg',
      image: 'images/destinations/badrinath.jpg',
      fallbackImage: 'images/destinations/kedarnath.jpg',
      packageTitle: 'Char Dham Luxury Yatra by Helicopter',
      itineraryHref: 'itineraries.html#circuit-chardham',
      paragraphs: [
        'Fulfilling our parents’ lifelong dream of bowing at Kedarnath and Badrinath is one of life’s greatest acts of filial devotion. Yet taking seniors above 10,000 feet requires genuine mountain medicine, realistic daily driving caps, and respectful logistical planning.',
        'Our clinical protocol centers on three pillars: slow vertical gain (never jumping over 600 meters of sleeping elevation per day), proactive hydration of 3.5 liters of warm fluid daily, and twice-daily pulse oximeter SpO2 checks logged by trained tour managers.',
        'At Yamunotri (6 km climb) and Kedarnath (16 km trail), we pre-arrange certified Pitthu, Palki bearers, or direct helipad transfers — and every vehicle carries medical-grade portable oxygen cylinders and warm woollen blankets.'
      ],
      takeaways: [
        'Complete a basic resting ECG, blood pressure, and physician fitness clearance 3 weeks prior.',
        'Never skip afternoon rest halts during mountain ascent days.',
        'Keep warm thermal socks, windproof gloves, and prescribed daily medications in a handy daypack.'
      ],
      relatedIds: ['featured-chardham', 'kedarnath-helicopter']
    },
    'kashi-moksha-triangle': {
      category: 'Vedic Rituals',
      title: 'Kashi, Prayagraj & Ayodhya: Walking the Sacred Moksha Triangle',
      date: 'October 2026',
      readTime: '5 Min Read',
      author: 'Acharya Vedprakash Shastri',
      role: 'Senior Kashi Vedic Scholar',
      avatar: 'images/advisors/acharya-shastri.jpg',
      image: 'images/gallery/ganga-aarti.jpg',
      fallbackImage: 'images/destinations/varanasi.jpg',
      packageTitle: 'Kashi, Prayagraj & Ayodhya Ram Mandir',
      itineraryHref: 'itineraries.html#circuit-kashi',
      paragraphs: [
        'Few journeys awaken the heart as deeply as the sacred North Indian triangle uniting Prayagraj (Tirtharaj), Varanasi (Kashi), and Ayodhya Dham. Within six harmonious days, devotees bathe at the mystic confluence of Ganga, Yamuna, and Saraswati before offering prayers at Kashi Vishwanath and Shri Ram Janmabhoomi.',
        'In Prayagraj, early morning boat rides reach the quiet mid-stream sandbar of Triveni Sangam for Vedic Sankalp and Pitru Tarpan. Travelling onward to Varanasi reveals the newly expanded Kashi Vishwanath Corridor leading directly from Lalita Ghat to the golden sanctum.',
        'Concluding along the tranquil Saryu banks in Ayodhya lets families witness evening Saryu Aarti followed by peaceful morning darshan of Ram Lalla and Hanuman Garhi.'
      ],
      takeaways: [
        'Experience Dashashwamedh Ganga Aarti from a reserved private wooden Bajra boat for unobstructed views.',
        'Carry soft cotton change wear for the sacred Triveni Sangam dip in Prayagraj.',
        'Schedule Ayodhya Ram Mandir slots early morning when queue movement is calmest.'
      ],
      relatedIds: ['jyotirlinga-axis', 'muhurta-calendar']
    },
    'tirupati-etiquette': {
      category: 'South Temples',
      title: 'Tirupati Balaji Seeghra Darshan & Dress Code: Complete Step-by-Step Devotee Etiquette',
      date: 'September 2026',
      readTime: '5 Min Read',
      author: 'Dr. Meenakshi Swaminathan',
      role: 'Agama Architecture & Heritage Advisor',
      avatar: 'images/advisors/dr-swaminathan.jpg',
      image: 'images/destinations/tirupati.jpg',
      fallbackImage: 'images/packages/tirupati-special.jpg',
      packageTitle: 'Tirupati Balaji VIP Seeghra Darshan',
      itineraryHref: 'itineraries.html#circuit-tirupati',
      paragraphs: [
        'Lord Venkateswara’s seven-hill abode at Tirumala welcomes tens of thousands of pilgrims daily with extraordinary devotion and meticulous queue organization. Preparing in advance ensures your spiritual focus remains solely on Govinda’s darshan rather than administrative surprises.',
        'TTD strictly enforces traditional dress rules for Special Entry (Seeghra Darshan) and Arjitha Seva devotees: men are expected in white Dhoti/Pancha with upper cloth or Kurta-Pyjama, and women in Saree, half-saree, or Salwar Kameez with Dupatta. Denim, shorts, and T-shirts are barred.',
        'Always visit Sri Padmavathi Ammavari Temple in Tiruchanur before ascending Tirumala, carry the exact original Aadhaar/Passport ID used during ticket booking, and deposit mobile phones at designated security counters prior to Vaikuntam Queue Complex entry.'
      ],
      takeaways: [
        'Always carry the original government photo ID matched to your Seeghra Darshan token.',
        'Complete Sri Padmavathi Ammavari darshan in Tiruchanur and Varaha Swamy darshan beside Swami Pushkarini.',
        'Pre-order authentic Tirupati Laddu prasadam vouchers along with your darshan slot.'
      ],
      relatedIds: ['arupadai-veedu', 'satvik-fasting']
    },
    'kedarnath-helicopter': {
      category: 'Himalayan Yatras',
      title: 'Kedarnath & Do Dham Helicopter Yatra: Weather Windows, Bag Weight & Safety Norms',
      date: 'September 2026',
      readTime: '5 Min Read',
      author: 'Capt. Vikramaditya Rawat (Retd.)',
      role: 'Himalayan Logistics & Medical Chief',
      avatar: 'images/advisors/capt-rawat.jpg',
      image: 'images/packages/helicopter-yatra.jpg',
      fallbackImage: 'images/destinations/kedarnath.jpg',
      packageTitle: 'Do Dham Yatra by Helicopter',
      itineraryHref: 'itineraries.html#circuit-dndham',
      paragraphs: [
        'Chartered mountain aviation makes Kedarnath and Badrinath accessible in a serene 2-to-4-day schedule — sparing elders the taxing 16-kilometer Gaurikund trek while opening unforgettable aerial panoramas of Garhwal glaciers.',
        'Because Mandakini Valley wind currents build after midday, shuttle sorties run predominantly between 06:00 AM and 11:30 AM. Building a buffer evening at Dehradun or Guptkashi guarantees calm re-scheduling if high mountain clouds roll in unexpectedly.',
        'DGCA aviation rules restrict passenger cabin baggage on hill choppers strictly to 5 kg soft duffel bags per person (hard trolley suitcases remain safely stored at our Dehradun/Phata base hotel).'
      ],
      takeaways: [
        'Pack a soft 5 kg duffel bag per devotee for helicopter flights; leave heavy suitcases at base hotel.',
        'Report exact passenger body weight at booking time for helicopter load-balance compliance.',
        'Keep a windproof outer shell handy — Kedarnath helipad temperatures sit near 2°C–6°C at dawn.'
      ],
      relatedIds: ['featured-chardham', 'elderly-altitude']
    },
    'muhurta-calendar': {
      category: 'Festivals & Muhurtas',
      title: 'Auspicious Muhurtas 2026–2027: Dev Deepawali, Maha Shivratri & Puri Ratha Yatra',
      date: 'August 2026',
      readTime: '6 Min Read',
      author: 'Pandit Harishankar Sharma',
      role: 'Chief Yatra Acharya, Haridwar HQ',
      avatar: 'images/advisors/pandit-sharma.jpg',
      image: 'images/gallery/diya-floating.jpg',
      fallbackImage: 'images/gallery/ganga-aarti.jpg',
      packageTitle: 'Kashi, Prayagraj & Ayodhya Ram Mandir',
      itineraryHref: 'itineraries.html#circuit-kashi',
      paragraphs: [
        'Pilgrimage during sacred tithis amplifies communal bhakti across every ghat and temple courtyard. On Kartik Purnima (Dev Deepawali), all 84 ghats of Varanasi glow under over a million earthen diyas as celestial chants echo over the Ganga.',
        'Equally revered are Maha Shivratri at Ujjain & Kashi, Akshaya Tritiya opening celebrations across Uttarakhand, Shravan Somwar Monday abhisheks across all Jyotirlingas, and the summer Jagannath Ratha Yatra along Puri’s Grand Road.',
        'Because festival crowds surge months ahead, our Vedic planning desk reserves heritage river-facing rooms, boat charters, and official shrine passes up to 120 days prior to the muhurta.'
      ],
      takeaways: [
        'Reserve Dev Deepawali Varanasi boat views and Ratha Yatra Puri balconies 3–4 months early.',
        'Align Ekadashi & Purnima stays with pure temple-prasad dining windows.',
        'Consult our Acharya desk to match your family Janma Nakshatra with auspicious yatra start dates.'
      ],
      relatedIds: ['kashi-moksha-triangle', 'jyotirlinga-axis']
    },
    'satvik-fasting': {
      category: 'Vedic Rituals',
      title: 'Satvik Temple Cuisine & Fasting Nutrition During Multi-Day Sacred Pilgrimages',
      date: 'August 2026',
      readTime: '4 Min Read',
      author: 'Pandit Harishankar Sharma',
      role: 'Chief Yatra Acharya, Haridwar HQ',
      avatar: 'images/advisors/pandit-sharma.jpg',
      image: 'images/gallery/pilgrims-prayer.jpg',
      fallbackImage: 'images/gallery/golden-temple.jpg',
      packageTitle: 'Grand South India Temple Circuit',
      itineraryHref: 'itineraries.html#circuit-south',
      paragraphs: [
        'Ayurvedic wisdom teaches that food shapes the clarity of the mind during prayer. True Satvik yatra dining avoids onion, garlic, excessive chillies, and stale leftovers, favoring freshly cooked warm moong dal, rock salt, cow ghee, seasonal vegetables, and temple Annadanam.',
        'When traveling across climate zones — from cold Kedarnath valleys to humid Tamil Nadu temple courtyards — steady energy prevents fatigue during long darshan walks. Roasted makhana, soaked almonds, buttermilk in the plains, and hot ginger-tulsi decoctions in the hills keep digestion light.',
        'Our dedicated yatra kitchens also prepare Ekadashi phalahar (kuttu, sabudana, fresh fruits) and strict Jain menus without root vegetables upon prior request.'
      ],
      takeaways: [
        'Favor warm, freshly cooked Satvik meals over heavy fried roadside snacks during transit days.',
        'Inform our Yatra Coordinator during booking for Jain, diabetic-friendly, or Ekadashi fasting meals.',
        'Carry simple roasted dry fruits and warm herbal water between early morning temple darshans.'
      ],
      relatedIds: ['elderly-altitude', 'arupadai-veedu']
    }
  };

  const cards = Array.from(grid.querySelectorAll('.blog-card'));
  const chips = document.querySelectorAll('.blog-chip');
  const searchInput = document.getElementById('blogSearchInput');
  const countBadge = document.getElementById('blogCountBadge');
  const emptyState = document.getElementById('blogEmptyState');
  const resetBtn = document.getElementById('blogResetBtn');
  const tagPills = document.querySelectorAll('.blog-tag-pill');

  let activeCat = 'all';
  let searchQuery = '';

  function filterBlog() {
    let visible = 0;
    const q = searchQuery.trim().toLowerCase();

    cards.forEach(card => {
      const cat = (card.getAttribute('data-category') || '').toLowerCase();
      const tags = (card.getAttribute('data-tags') || '').toLowerCase();
      const text = card.textContent.toLowerCase();

      const catMatch = activeCat === 'all' || cat === activeCat;
      const searchMatch = !q || text.includes(q) || tags.includes(q) || cat.includes(q);

      if (catMatch && searchMatch) {
        card.style.display = 'flex';
        visible++;
      } else {
        card.style.display = 'none';
      }
    });

    if (countBadge) {
      countBadge.textContent = `Showing ${visible} Sacred Article${visible === 1 ? '' : 's'}`;
    }
    if (emptyState) {
      emptyState.style.display = visible === 0 ? 'block' : 'none';
    }
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCat = (chip.getAttribute('data-blog-cat') || 'all').toLowerCase();
      filterBlog();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      filterBlog();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      activeCat = 'all';
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      chips.forEach(c => c.classList.remove('active'));
      const allChip = document.querySelector('.blog-chip[data-blog-cat="all"]');
      if (allChip) allChip.classList.add('active');
      filterBlog();
    });
  }

  tagPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const tagVal = pill.getAttribute('data-tag-search') || pill.textContent.trim();
      if (searchInput) {
        searchInput.value = tagVal;
        searchQuery = tagVal;
      }
      activeCat = 'all';
      chips.forEach(c => c.classList.remove('active'));
      const allChip = document.querySelector('.blog-chip[data-blog-cat="all"]');
      if (allChip) allChip.classList.add('active');
      filterBlog();
      grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Article Reader Modal logic
  const readerModal = document.getElementById('articleReaderModal');
  function openArticleReader(articleId) {
    const art = ARTICLES[articleId];
    if (!art || !readerModal) return;

    const catEl = readerModal.querySelector('#readerCategory');
    const titleEl = readerModal.querySelector('#readerTitle');
    const metaEl = readerModal.querySelector('#readerMeta');
    const imgEl = readerModal.querySelector('#readerHeroImg');
    const authorImg = readerModal.querySelector('#readerAuthorImg');
    const authorName = readerModal.querySelector('#readerAuthorName');
    const authorRole = readerModal.querySelector('#readerAuthorRole');
    const proseEl = readerModal.querySelector('#readerProse');
    const takeawaysEl = readerModal.querySelector('#readerTakeaways');
    const pkgLabel = readerModal.querySelector('#readerRelatedPkg');
    const itinLink = readerModal.querySelector('#readerItineraryLink');
    const bookBtn = readerModal.querySelector('#readerBookBtn');
    const relatedLinksBox = readerModal.querySelector('#readerRelatedArticles');

    if (catEl) catEl.textContent = art.category;
    if (titleEl) titleEl.textContent = art.title;
    if (metaEl) metaEl.innerHTML = `<span><i class="fas fa-calendar-alt"></i> ${art.date}</span> <span><i class="far fa-clock"></i> ${art.readTime}</span>`;
    if (imgEl) {
      imgEl.src = art.image;
      imgEl.alt = art.title;
      imgEl.onerror = () => { imgEl.src = art.fallbackImage; };
    }
    if (authorImg) authorImg.src = art.avatar;
    if (authorName) authorName.textContent = art.author;
    if (authorRole) authorRole.textContent = art.role;
    if (proseEl) {
      proseEl.innerHTML = art.paragraphs.map(p => `<p>${p}</p>`).join('');
    }
    if (takeawaysEl) {
      takeawaysEl.innerHTML = art.takeaways.map(t => `<li><i class="fas fa-check-circle"></i> <span>${t}</span></li>`).join('');
    }
    if (pkgLabel) pkgLabel.textContent = art.packageTitle;
    if (itinLink) itinLink.href = art.itineraryHref;
    if (bookBtn) {
      bookBtn.setAttribute('data-package', art.packageTitle);
    }

    if (relatedLinksBox && art.relatedIds) {
      relatedLinksBox.innerHTML = art.relatedIds.map(rid => {
        const r = ARTICLES[rid];
        if (!r) return '';
        return `<button type="button" class="blog-tag-pill reader-switch-btn" data-article-id="${rid}"><i class="fas fa-book-open" style="color:var(--color-saffron); margin-right:4px;"></i> ${r.title}</button>`;
      }).join('');

      relatedLinksBox.querySelectorAll('.reader-switch-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          openArticleReader(btn.getAttribute('data-article-id'));
          readerModal.querySelector('.modal-dialog')?.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });
    }

    openModal(readerModal);
  }

  document.querySelectorAll('[data-open-article]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const id = trigger.getAttribute('data-open-article');
      openArticleReader(id);
    });
  });

  // Allow Reader "Book This Yatra" button to smoothly transition into Booking Modal
  const readerBookBtn = document.getElementById('readerBookBtn');
  if (readerBookBtn && readerModal) {
    readerBookBtn.addEventListener('click', () => {
      closeModal(readerModal);
    });
  }

  // Newsletter subscription handler
  const newsletterForm = document.getElementById('blogNewsletterForm');
  const newsletterMsg = document.getElementById('blogNewsletterMsg');
  if (newsletterForm && newsletterMsg) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const val = emailInput ? emailInput.value.trim() : '';
      if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        newsletterMsg.style.color = '#FFD8A8';
        newsletterMsg.textContent = 'Please enter a valid email address to receive Yatra Advisories.';
        return;
      }
      newsletterMsg.style.color = '#E7C687';
      newsletterMsg.innerHTML = '<i class="fas fa-check-circle"></i> Dhanyawad! Subscribed for 2026–2027 temple opening dates &amp; muhurta updates.';
      newsletterForm.reset();
    });
  }

  filterBlog();
}

