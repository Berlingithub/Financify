// process.removeAllListeners('warning');
// const express = require('express');
// const app = express();
// const morgan = require('morgan');
// const dotenv = require('dotenv').config();
// const mongoose = require('mongoose');
// const basicRoutes = require('./Routes/Basic');
// const passport = require('passport');
// const LocalStrategy = require('passport-local');
// const session = require('express-session');
// const User = require('./Models/User');
// const MongoStore = require('connect-mongo');
// const authRoutes = require('./Routes/authRoutes');
// const { urlencoded } = require('express');
// const transactions = require('./Routes/transactions');
// const goals = require('./Routes/goals');
// const profile = require('./Routes/profile');
// const overview = require('./Routes/overview');
// const incomeSource = require('./Routes/incomeSources');
// const recurring = require('./Routes/recurringPayments');
// var cors = require('cors');



// console.log(process.env.DATABASE_KEY);


// const { isLoggedIn } = require('./middlewares');
// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true

// }));
// app.use(morgan('tiny'));
// const db = mongoose.connection;
// const mongoURI = 'mongodb+srv://GarryHost:Arron2012@cluster0.zjyx1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// // mongoose.connect(process.env.DATABASE_KEY, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//   console.log("Database Connected!")
// });

// const secret = process.env.secret || 'randomsecret';

// const store = new MongoStore({
//   mongoUrl: process.env.DATABASE_KEY, secret, touchAfter: 24 * 3600
// })

// store.on("error", function (e) {
//   console.log("Session store error!", e);
// })

// const sessionConfig = {
//   store,
//   name: 'session',
//   secret,
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     httpOnly: true,
//     /*secure:'true',*/
//     expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
//     maxAge: 1000 * 60 * 60 * 24 * 7
//   }
// }

// app.use(urlencoded({ extended: true }))
// app.use(express.json())
// app.use(session(sessionConfig));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.use(new LocalStrategy({
//   usernameField: 'email'
// }, User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


// // ALL ROUTES

// app.use('/', basicRoutes);
// app.use('/auth', authRoutes);
// app.use('/transaction', isLoggedIn, transactions);
// app.use('/goals', isLoggedIn, goals);
// app.use('/income', isLoggedIn, incomeSource);
// app.use('/recurring', isLoggedIn, recurring);
// app.use('/overview', isLoggedIn, overview);
// app.use('/profile', isLoggedIn, profile);


// const PORT = process.env.PORT || 3001;
// app.listen(PORT, (req, res) => {
//   console.log(`Listening on port ${PORT}`);
// })




// 1️⃣  Load environment variables first
require('dotenv').config();               // reads .env in Server/
console.log('DATABASE_KEY =>', process.env.DATABASE_KEY);
// 2️⃣  Core & third‑party modules
const express       = require('express');
const morgan        = require('morgan');
const mongoose      = require('mongoose');
const session       = require('express-session');
const MongoStore    = require('connect-mongo');
const passport      = require('passport');
const LocalStrategy = require('passport-local');
const cors          = require('cors');

// 3️⃣  Local files
const User          = require('./Models/User');
const basicRoutes   = require('./Routes/Basic');
const authRoutes    = require('./Routes/authRoutes');
const transactions  = require('./Routes/transactions');
const goals         = require('./Routes/goals');
const profile       = require('./Routes/profile');
const overview      = require('./Routes/overview');
const incomeSource  = require('./Routes/incomeSources');
const recurring     = require('./Routes/recurringPayments');
const { isLoggedIn } = require('./middlewares');

// 4️⃣  Environment‑driven constants
const PORT           = process.env.PORT || 3001;
const DATABASE_KEY   = process.env.DATABASE_KEY;          // your Atlas URI
const SESSION_SECRET = process.env.SESSION_SECRET || 'super‑secret‑fallback';

// 5️⃣  Connect to MongoDB
mongoose.connect(DATABASE_KEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
  .on('error', err => console.error('❌ MongoDB error:', err))
  .once('open', () => console.log('✅ MongoDB connected'));

// 6️⃣  App instance & global middleware
const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 7️⃣  Session store (connect‑mongo v4+ API)
const store = MongoStore.create({
  // mongoUrl: DATABASE_KEY,
  mongoUrl: process.env.DATABASE_KEY,
  collectionName: 'sessions',
  touchAfter: 24 * 3600,                // only update once per day
  // crypto: { secret: SESSION_SECRET },
  crypto: { secret: process.env.SESSION_SECRET },
});
store.on('error', e => console.log('Session store error', e));

app.use(
  session({
    store,
    name: 'session',
    // secret: SESSION_SECRET,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      // secure: true,                   // enable in production HTTPS
      maxAge: 1000 * 60 * 60 * 24 * 7,  // 1 week
    },
  })
);

// 8️⃣  Passport
passport.use(new LocalStrategy(User.authenticate()));
// If you prefer email login, switch to:
// passport.use(new LocalStrategy({ usernameField: 'email' }, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());

// 9️⃣  Routes
app.use('/',            basicRoutes);
app.use('/auth',        authRoutes);
app.use('/transaction', isLoggedIn, transactions);
app.use('/goals',       isLoggedIn, goals);
app.use('/income',      isLoggedIn, incomeSource);
app.use('/recurring',   isLoggedIn, recurring);
app.use('/overview',    isLoggedIn, overview);
app.use('/profile',     isLoggedIn, profile);

// 🔟  Start server
app.listen(PORT, () => console.log(`🚀  Server running on port ${PORT}`));
