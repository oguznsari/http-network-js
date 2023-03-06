const message = await applyDamage(25, 50)

console.log(message)

function applyDamage(damage, currentHP) {
    return new Promise((resolve) => {
        const newHP = currentHP - damage
        setTimeout(() => {
            resolve(`The player with ${currentHP} hit points suffers ${damage} damage and has ${newHP} hit points remaining.`)
        })
    })
}