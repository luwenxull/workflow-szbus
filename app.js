let request = require('request');

function query(bus) {
    request.get('http://ggoer.com/bus/' + bus, function (err, res, body) {
        // let obj;
        if (body) {
            let json = JSON.parse(body);
            if (json.success === 0) {
                parseDataFromWeb(json.data.data)
            } else {
                console.log(JSON.stringify({
                    items: [{
                        title: '未查询到相关信息'
                    }]
                }));
            }
        }
    })
}

function parseDataFromWeb(data) {
    let items=[];
    data.forEach((bus,index) => {
        if (bus.InTime) {
            items.push({
                title: index+' '+bus.StationCName,
                subtitle: bus.InTime
            })
        }

    })
    console.log(JSON.stringify({
        items
    }));
}
module.exports = query