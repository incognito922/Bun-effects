namespace bunFX {

    // ---------------------------------------------------------
    // BUN SPRITES (Bakery Style)
    // ---------------------------------------------------------

    export const bunBeige = img`
        . . d d d . .
        . d d d d d .
        d d d d d d d
        d d d d d d d
        . d d d d d .
        . . d d d . .
        . . . d . . .
    `

    export const bunBrown = img`
        . . 4 4 4 . .
        . 4 4 4 4 4 .
        4 4 4 4 4 4 4
        4 4 4 4 4 4 4
        . 4 4 4 4 4 .
        . . 4 4 4 . .
        . . . 4 . . .
    `

    export const bunWhite = img`
        . . f f f . .
        . f f f f f .
        f f f f f f f
        f f f f f f f
        . f f f f f .
        . . f f f . .
        . . . f . . .
    `

    export const bunBurnt = img`
        . . 1 1 1 . .
        . 1 c c c 1 .
        1 c c c c c 1
        1 c c c c c 1
        . 1 c c c 1 .
        . . 1 1 1 . .
        . . . 1 . . .
    `

    // ---------------------------------------------------------
    // BUN WAVE EFFECT
    // ---------------------------------------------------------

    export function bunWave(
        bunImg: Image,
        count: number = 8,
        amplitude: number = 10,
        wavelength: number = 20,
        speed: number = 30
    ) {
        const buns: Sprite[] = []

        for (let i = 0; i < count; i++) {
            const bun = sprites.create(bunImg.clone(), SpriteKind.Food)
            bun.x = (screen.width / count) * i
            bun.y = screen.height / 2
            bun.data = i
            buns.push(bun)
        }

        game.onUpdateInterval(speed, function () {
            for (let bun of buns) {
                const offset = bun.data as number
                const t = game.runtime() / 200

                bun.x += 1
                bun.y = screen.height / 2 + Math.sin((offset + t) * (Math.PI / wavelength)) * amplitude

                if (bun.x > screen.width + 10) bun.x = -10
            }
        })
    }

    // ---------------------------------------------------------
    // BUN WAVE + RANDOM MARCHING AROUND SCREEN
    // ---------------------------------------------------------

    export function bunWaveMarch(
        bunImg: Image,
        count: number = 8,
        amplitude: number = 10,
        wavelength: number = 20,
        speed: number = 30
    ) {
        const buns: Sprite[] = []

        for (let i = 0; i < count; i++) {
            const bun = sprites.create(bunImg.clone(), SpriteKind.Food)
            bun.x = (screen.width / count) * i
            bun.y = screen.height / 2

            bun.data = {
                index: i,
                marching: false,
                marchStep: 0
            }

            buns.push(bun)
        }

        game.onUpdateInterval(speed, function () {
            for (let bun of buns) {
                const data = bun.data as any

                // RANDOM CHANCE to start marching
                if (!data.marching && Math.randomRange(0, 200) === 0) {
                    data.marching = true
                    data.marchStep = 0
                }

                // MARCH MODE
                if (data.marching) {
                    data.marchStep++

                    if (bun.y <= 0 && bun.x < screen.width) bun.x += 2
                    else if (bun.x >= screen.width && bun.y < screen.height) bun.y += 2
                    else if (bun.y >= screen.height && bun.x > 0) bun.x -= 2
                    else if (bun.x <= 0 && bun.y > 0) bun.y -= 2

                    if (data.marchStep > 200) {
                        data.marching = false
                    }

                    continue
                }

                // WAVE MODE
                const t = game.runtime() / 200
                const offset = data.index

                bun.x += 1
                bun.y = screen.height / 2 + Math.sin((offset + t) * (Math.PI / wavelength)) * amplitude

                if (bun.x > screen.width + 10) bun.x = -10
            }
        })
    }
}
