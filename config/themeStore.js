const DEFAULT_THEME = {
    background: 'bg-gray-100',
    font: 'font-sans'
};

let currentTheme = { ...DEFAULT_THEME };

function getTheme() {
    return currentTheme;
}

function setTheme(theme) {
    currentTheme = {
        ...theme
    };

    return currentTheme;
}

module.exports = {
    DEFAULT_THEME,
    getTheme,
    setTheme
};
