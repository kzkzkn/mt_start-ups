document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth scrolling for navigation ---
    document.querySelectorAll('.main-nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Tab functionality ---
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const tabId = link.getAttribute('data-tab');

            tabLinks.forEach(item => item.classList.remove('active'));
            tabContents.forEach(item => item.classList.remove('active'));

            link.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // --- Modal functionality ---
    const modal = document.getElementById('company-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalTag = document.getElementById('modal-tag');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close-btn');
    const dataStore = document.getElementById('company-data');

    // Function to open the modal
    const openModal = (companyId) => {
        const companyDataElement = dataStore.querySelector(`[data-company="${companyId}"]`);
        // Find the element that was clicked, whether it's a card or a chaos map tag
        const clickedElement = document.querySelector(`.company-card[data-company-id="${companyId}"], .company-tag[data-company-id="${companyId}"]`);

        if (companyDataElement && clickedElement) {
            const tagElement = clickedElement.classList.contains('company-card') 
                ? clickedElement.querySelector('.tag') 
                : clickedElement;
            
            // Populate Modal
            modalTitle.textContent = companyDataElement.querySelector('h4').textContent;
            modalTag.textContent = tagElement.textContent;
            // Copy class list for styling (e.g., 'tag-listed')
            modalTag.className = tagElement.className; 
            
            modalBody.innerHTML = companyDataElement.innerHTML;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        }
    };
    
    // Add click event to each company card in the list
    document.querySelectorAll('.company-card').forEach(card => {
        card.addEventListener('click', () => {
            const companyId = card.getAttribute('data-company-id');
            if (companyId) {
                openModal(companyId);
            }
        });
    });

    // Add click event to each company tag in the chaos map
    document.querySelectorAll('.chaos-map-grid .company-tag').forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent any parent click events
            const companyId = tag.getAttribute('data-company-id');
            if (companyId) {
                openModal(companyId);
            }
        });
    });

    // Function to close the modal
    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore background scroll
    };
    
    // Event listeners for closing the modal
    closeBtn.onclick = closeModal;

    window.onclick = (event) => {
        // Close if the dark background (the modal itself) is clicked
        if (event.target == modal) {
            closeModal();
        }
    };
    
    window.addEventListener('keydown', (event) => {
        // Close if the 'Escape' key is pressed
        if (event.key === 'Escape') {
            closeModal();
        }
    });
});
