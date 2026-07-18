export const STARS = Array.from({ length: 18 }, () => ({
    x: 10 + Math.random() * 80,
    y: 5 + Math.random() * 90,
    size: 2 + Math.random() * 3,
    opacity: 0.3 + Math.random() * 0.4,
    duration: 2 + Math.random() * 2,
    delay: Math.random() * 3,
}));