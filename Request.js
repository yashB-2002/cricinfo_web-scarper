const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
const request = require("request");
const cheerio = require("cheerio");
request(url, call);
// homepage link
function call(err, response, html) {
    if (err) {
        console.log(err);
    }
    else {
        // console.log("hello no error");
        extractor(html);
    }
}
// all match results page link extractor
function extractor(html) {
    let $ = cheerio.load(html);
    let anlink = $("a[data-hover='View All Results']");
    let link = anlink.attr("href");
    let fullLink = "https://www.espncricinfo.com" + link;
    scorecardLink(fullLink);
    // console.log(fullLink);
}
function scorecardLink(link) {
    request(link, function (err, response, html) {
        if (err) {
            console.log(err);
        }
        else {
            extractor2(html);
        }
    })
}
// all match page information link extrator
function extractor2(html) {
    let $ = cheerio.load(html);
    let scorelinks = $("a[data-hover='Scorecard']");
    for (var i = 0; i < scorelinks.length; i++) {
        let eachScoreLink = $(scorelinks[i]).attr("href");
        let fullEachScoreLink = "https://www.espncricinfo.com" + eachScoreLink;
        // console.log(fullEachScoreLink);
    }
}

// single match scorecard extractor
const url2 = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/royal-challengers-bangalore-vs-delhi-capitals-19th-match-1216519/full-scorecard";
request(url2, function (err, response, html) {
    if (err) {
        console.log(err);
    }
    else {
        extractor3(html);
    }
})
function extractor3(html) {
    let $ = cheerio.load(html);
    let desc = $(".match-header-info.match-info-MATCH div.description").text().split(",");
    let result = $(".match-info.match-info-MATCH .status-text").text();
    let date = desc[2].trim();
    let venue = desc[1].trim();
    console.log(date + " : " + venue);
    console.log(result);
    let innings = $(".card.content-block.match-scorecard-table>.Collapsible");
    // let htmlStr = "";
    for (let i = 0; i < innings.length; i++) {
        // htmlStr = $(innings[i]).html();
        let fTeam = $(innings[i]).find("h5").text();
        fTeam = fTeam.split("INNINGS")[0].trim();
        let sTeamIndex = i == 0 ? 1 : 0;
        let sTeam = $(innings[sTeamIndex]).find("h5").text();
        sTeam = sTeam.split("INNINGS")[0].trim();
        let cInning = $(innings[i]);
        let allRows = cInning.find(".table.batsman tbody tr");
        for (let j = 0; j < allRows.length; j++) {
            let allCols = $(allRows[j]).find("td");
            let col = $(allCols[0]).hasClass("batsman-cell");
            if (col == true) {
                let playerName = $(allCols[0]).text().trim();
                let runs = $(allCols[2]).text().trim();
                let balls = $(allCols[3]).text().trim();
                let fours = $(allCols[5]).text().trim();
                let sixes = $(allCols[6]).text().trim();
                let strikerate = $(allCols[7]).text().trim();
                console.log(playerName + ":" + runs + ":" + balls + ":" + fours + ":" + sixes + ":" + strikerate);
            }
        }
    }
    // console.log(htmlStr);

}
