function generateRandomWord() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = Math.random() < 0.5 ? 6 : 7; // Randomly choose between 6 or 7
    let word = '';
    for (let i = 0; i < length; i++) {
        word += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return word;
}

module.exports = generateRandomWord;