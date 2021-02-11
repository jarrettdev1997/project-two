const express = require('express');
const path = require('path');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
app.use(session(sess));

const routes = require('./controllers');
app.use(routes);

// const helpers = require('./utils/helpers')
const hbs = exphbs.create({ });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars')

const http = require('http').Server(app)
const io = require('socket.io')(http)

function getSocketIo(){
    return io;
}
module.exports.getSocketIo=getSocketIo

sequelize.sync({ force: false }).then(() => {
    require('./sockets/connectSocket')(io)
    http.listen(PORT, () => console.log(`Now listening on ${PORT}`))
})