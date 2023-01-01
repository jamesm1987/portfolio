const collapseButton = document.querySelectorAll('[data-toggle-text-button]')

collapseButton.forEach((button) => {
    
    if( !button.dataset.expandedtext || !button.dataset.collapsedtext) {
        return
    }
    
    button.addEventListener('show.bs.collapse', event => {
        button.textContent = button.dataset.expandedtext
    })

    button.addEventListener('hide.bs.collapse', event => {
        button.textContent = button.dataset.collapsedtext
    })    
})