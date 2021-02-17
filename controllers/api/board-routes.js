const router = require('express').Router();
const { Board, Game } = require('../../model');
const toClient = require('../../sockets/toClient')
const withAuth = require('../../utils/auth')

router.get('/', (req, res) => {
    Board.findAll()
    .then(dbBoardData => res.json(dbBoardData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    });
})

router.get('/:id', (req, res) => {
    Board.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbBoardData => res.json(dbBoardData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    });
})

router.post('/', (req, res) => {
    Board.create({
        upper_left: req.body.upper_left,
        upper_mid: req.body.upper_mid,
        upper_right: req.body.upper_right,
        center_left: req.body.center_left,
        center_mid: req.body.center_mid,
        center_right: req.body.center_right,
        lower_left: req.body.lower_left,
        lower_mid: req.body.lower_mid,
        lower_right: req.body.lower_right,
    })
    .then(dbBoardData => res.json(dbBoardData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    });
})

router.put('/:id', withAuth, async (req, res) => {
    const findGame = await Game.findOne({
        where: {
            id: req.params.id
        }
    })

    if (!findGame) {
        res.status(500).json(err)
        return
    }

    const game = findGame.get({ plain: true })

    let user = null
    if (req.session.user_id === game.owner_id) {
        user = { user_id: req.session.user_id, XorO: 1 }
    } else if (req.session.user_id === game.friend_id) {
        user = { user_id: req.session.user_id, XorO: 2 }
    }
    if (!user) {
        res.status(400).json({ statusText: "You are not authorized to make this move!" })
        return
    }
    console.log('beforemove:' + game.whos_turn_id)
    if (game.whos_turn_id !== req.session.user_id) {
        res.status(400).json({ statusText: "It is not your turn yet!" })
        return
    }

    let turn = null
    if (game.whos_turn_id === game.owner_id) {
        turn = { whos_turn_id: game.friend_id }
    } else {
        turn = { whos_turn_id: game.owner_id }
    }
    console.log('aftermove:' + turn.whos_turn_id)
    const updateGame = await Game.update(turn, {
        where: {
            id: game.id
        }
    })

    if (!updateGame) {
        res.status(500).json(err)
        return
    }

    const cellUpdate = {}
    cellUpdate[req.body.cellClicked] = user.XorO

    const updateBoard = await Board.update(cellUpdate, {
        where: {
            id: game.board_id
        }
    })
    
    if (!updateBoard) {
        res.status(500).json(err)
        return
    }

    const findBoard = await Board.findOne({
        where: {
            id: game.board_id
        }
    })

    if (!findBoard) {
        res.status(500).json(err)
        return
    }

    const board = findBoard.get({ plain: true })

    const to = new toClient()
    to.emitBoardUpdate(req.app, game.id, turn.whos_turn_id, board);
    res.json(board)
})

module.exports = router
