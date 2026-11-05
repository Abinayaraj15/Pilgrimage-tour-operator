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
    rtlBtns.forEach(btn => {
      const textSpan = btn.querySelector('.rtl-name');
      const icon = btn.querySelector('i');
      if (textSpan) {
        textSpan.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      }
      if (icon) {
        icon.className = dir === 'rtl' ? 'fas fa-align-left' : 'fas fa-align-right';
      }
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
