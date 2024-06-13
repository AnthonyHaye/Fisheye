export function setupDropdown(mediaObjects, updateMediaCallback) {
    const sortOptions = document.querySelectorAll('.dropdown_content button');
    sortOptions.forEach(button => {
        button.addEventListener('click', (event) => {
            const criterion = event.target.getAttribute('aria-label').split(' ')[2].toLowerCase();
            const sortedMedia = sortMedia(mediaObjects, criterion);
            updateMediaCallback(sortedMedia);
            document.getElementById('current_filter').textContent = event.target.textContent;
            toggleDropdown(false);
        });
    });

    document.querySelector('.btn_drop').addEventListener('click', () => {
        const dropdown = document.querySelector('.dropdown_content');
        const expanded = dropdown.getAttribute('aria-hidden') === 'true' ? 'false' : 'true';
        toggleDropdown(expanded === 'false');
    });
}

function toggleDropdown(expanded) {
    const dropdown = document.querySelector('.dropdown_content');
    dropdown.setAttribute('aria-hidden', !expanded);
    document.querySelector('.btn_drop').setAttribute('aria-expanded', expanded);
}
