module.exports = {
    getXorO: number => {
        let letter = ''
        if (number === 1) {
            letter = 'X'
        } else if (number === 2) {
            letter ='O'
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