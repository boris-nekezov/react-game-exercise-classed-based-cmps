// create random number based on min and max
const calculateDamage = (min, max) => {
    return Math.max(Math.floor(Math.random() * max) + 1, min)
}

export default calculateDamage;