
export const clearListImg = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}