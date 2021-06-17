const https = require('https')
const fs = require('fs')

// -------------------------------------
//       process2
//       process1
//       url
//       const request = 
//       request.end()
// -------------------------------------

function process2() {
    fs.readFile('./data.json', (err, data) => { 
        //
        if (err) { console.error(err); return ; }
        data = JSON.parse(data)
        var articles = [];
        //
        data.forEach((item,i)=>{ 
            articles.push({
                No: i+1,
                title: item.title.rendered,
                link: item.link,
                link_short: ''
            }) 
        });
        //
        fs.writeFile(
            './pureData.json', 
            JSON.stringify(articles, null, 1), 
            err => {
            if (err) { console.error(err); return ; }
        }); // fs.writeFile
    });
}

function process1(res) { 
    let writableStream = fs.createWriteStream('./data.json');
    res.pipe(writableStream);
    res.on('end',() => {  
        console.log('downloaded! --------------');  
        process2(); 
    }) // res.on end 
}

var url = 'https://kaaam.ir/wp-json/wp/v2/posts';

const request = https.get(url, res=> process1(res)) 

request.end();