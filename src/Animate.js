export const animateCSS = (element, animationName, callback) => {
    const node = document.querySelector(element)
    node.classList.add(animationName)

    function handleAnimationEnd() {
        node.classList.remove(animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}