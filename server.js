import Express from 'express';
import GraphHTTP from 'express-graphql';
import Schema from './backend/schema';
import Db from './backend/db';

import json from 'json-middleware';

var bodyParser = require('body-parser');

const APP_PORT = 3000;

const app = Express();


app.use('/mimer-ai', GraphHTTP({
    schema: Schema,
    pretty: true,
    graphiql: true
}));

// ------------------------------------------------
/*
 * Dessa måste användas för att json skall tolkas rätt i meddelandet.
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*
 * CORS för express
 */
app.use(function(req, res, next) {

  // console.log('Something');
  
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  
  next();
});

app.get('/person/list', function(req, res) {
  var ret = [];
  
  Db.models.person.findAll()
    .then(person => { ret.push(person); })
    .done(() => res.status(200).send(ret));
});

app.get('/session/list', function(req, res) {
  console.log('UserId=' + req.param('userid'));

  var ret = [];
  Db.models.session.findAll({ where: { personId: req.param('userid') }})
    .then(function(session) { ret.push(session)} )
    .done(() => res.status(200).send(ret));
});

app.get('/messages/list', function(req, res) {
  console.log('SessionId=' + req.param('sessionid'));

  var ret = [];
  Db.models.message.findAll({ where: { sessionId: req.param('sessionid') }})
    .then(function(message) { ret.push(message)} )
    .done(() => res.status(200).send(ret));
});


/*
 * Update message databasen
 */
app.post('/send', function(req, res) {
  // Skapa en entry i databasen.
  Db.models.person.findOne({ where: { email: req.body.user } })
    .then(function(person) {
       console.log(JSON.stringify(person));
	
       Db.models.session.findOrCreate({ where: { personId: person.id }, defaults: { title: 'One'} })
         .spread((sess, created) => {
	    // var si = sess.get({plain: true});
	    console.log(JSON.stringify(sess));
	    console.log(created);
	    
	    Db.transaction(function(t) {
	      
	      Db.models.message.create({content: req.body.text, type: req.body.type, sessionId: sess.id } )
		      .then(msg => {
              let cmsg = {
                type: 0,
                content: generate_a_reply(msg.content)
              };

              Db.models.message.create({content: cmsg.content, type: cmsg.type, sessionId: sess.id })
                .then(msg2 => res.status(200).send(msg2));
		      });
		
	    }).then(function(result) { 
	      console.log('Transaction OK');
	    }).catch(function(err) {
	      console.log(JSON.stringify(err));
	    });
	 });
      
    });

});

function generate_a_reply(txt) {
  return message_corpus[Math.floor(Math.random()*message_corpus.length)];
}

var message_corpus = [
  'Godag yxskaft',
  'Jättebra',
  'Och själv?',
  'Hejsan, jag är Mimer och jag är redo att svara på dina frågor.',
  'Fortsätt'
];


// -------------   Lyssnar på porten   ---------------

app.listen(APP_PORT, () => {
    console.log(`App running on port ${APP_PORT}`);
});
