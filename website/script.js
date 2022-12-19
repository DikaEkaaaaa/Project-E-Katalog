let btnExplore = document.getElementById('explore');
btnExplore.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector('#more')
        .scrollIntoView({
            behavior: "smooth"
        })
})

let navLinks = document.querySelectorAll('.nav-link');

for (let i in navLinks) {
    if (navLinks.hasOwnProperty(i)) {
        navLinks[i].addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(navLinks[i].hash)
                .scrollIntoView({
                    behavior: "smooth"
                })
        })
    }
}

let sections = document.querySelectorAll('.section');
let classNav = {
    normal: 'nav-link block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent',
    active: 'nav-link nav-active block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white'
}
window.onscroll = () => {
    let sp = document.documentElement.scrollTop || document.body.scrollTop;
    for (let i in sections) {
        if (sections.hasOwnProperty(i) && sections[i].offsetTop <= sp) {
            let id = sections[i].id;
            let activeNav = document.querySelector('.nav-active');
            let idNav = document.querySelector(`[data-href="${id}"]`);
            activeNav.classList = classNav.normal;
            idNav.classList = classNav.active;
        }
    }
}