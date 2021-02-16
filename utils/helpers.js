module.exports = {
    getXorO: number => {
        let letter = ''
        if (number === 1) {
            letter = 'close'
        } else if (number === 2) {
            letter ='panorama_fish_eye'
        }
        return letter
    },
    isFinished: string => {
        let bool = false
        if (string === 'finished') {
            bool = true
        }
        return bool
    }
}