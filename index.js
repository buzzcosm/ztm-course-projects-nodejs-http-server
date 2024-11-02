const http = require("http");

const PORT = 3000;

const server = http.createServer();

// Data
const friends = [
  {
    id: 0,
    name: "Sir Isaac Newton",
  },
  {
    id: 1,
    name: "Albert Einstein",
  },
  {
    id: 2,
    name: "Marie Curie",
  },
  {
    id: 3,
    name: "Nikola Tesla",
  },
  {
    id: 4,
    name: "Charles Darwin",
  },
  {
    id: 5,
    name: "Galileo Galilei",
  },
  {
    id: 6,
    name: "Stephen Hawking",
  },
  {
    id: 7,
    name: "Ada Lovelace",
  },
  {
    id: 8,
    name: "Charles Babbage",
  },
  {
    id: 9,
    name: "Alan Turing",
  },
];

server.on('request', (req, res) => {
  const items = req.url.split('/');
  // /friends/2 => ['', 'friends', '2']
  if (req.method === 'POST' && items[1] === "friends") {
    req.on('data', (data) => {
      const friend = data.toString();
      /* 
        Example: call from browser console
fetch('http://localhost:3000/friends', {
    method: 'POST',
    body: JSON.stringify({ id: 10, name: 'Ryan Dohl' })
});
      */
      console.log('Request:', friend); // Request: {"id":10,"name":"Ryan Dohl"}
      friends.push(JSON.parse(friend));
    });
    req.pipe(res);
  } else if (req.method === 'GET' && items[1] === "friends") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    if (items.length === 3) {
      // const friendIndex = +items[2];
      const friendIndex = Number.parseInt(items[2]);
      res.end(JSON.stringify(friends[friendIndex]));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (req.method === 'GET' && items[1] === "messages") {
    res.setHeader("Content-Type", "text/html");
    res.write('<html>');
    res.write('<body>');
    res.write('<ul>');
    res.write('<li>Hello Isaac!</li>');
    res.write('<li>What are your thoughts on astronomy?</li>');
    res.write('</ul>');
    res.write('</body>');
    res.write('</html>');
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

// 127.0.0.1 => localhost
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});