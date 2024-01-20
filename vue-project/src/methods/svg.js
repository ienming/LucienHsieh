export function setDrawSvgLine(paths, animConfig){
    let delay = 0
    const animSpeed = animConfig ? animConfig.speed : 70
    Array.from(paths).forEach(path => {
        let length = path.getTotalLength()
        let duration = length/animSpeed
        path.style['stroke-dasharray'] = length
        path.style['stroke-dashoffset'] = length
        path.style['animation-duration'] = duration+'s'
        path.style['animation-delay'] = delay+'s'
        delay += duration
    })
}