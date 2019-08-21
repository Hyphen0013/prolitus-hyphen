let express = require('express');
let app = express();



app.get('/', (req, res) => {
    res.send(JSON.stringify({ "Name: " : "Hyphen"}));
});

let PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});




