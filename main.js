window.addEventListener("load", function () {
    getTrainList();
});

function getTrainList() {
    let url = "https://tetsudo.rti-giken.jp/free/delay.json"; //遅延情報のJSON
    fetch(url)
        .then(function (data) {
            return data.json(); // 読み込むデータをJSONに設定
        })
        .then(function (json) {
            for (let i = 0; i < json.length; i++) {
                const train = json[i].name;
                const company = json[i].company;
                const time = json[i].lastupdate_gmt;
                const utctime = new Date(time * 1000); //送られてくるのはunix time（ミリ秒）なので、1000倍
                const options = { weekday: "short", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }; //▶︎表記例：2022年3月23日(水)
                const localTime = utctime.toLocaleDateString("ja-JP", options);

                drawRowCell(i, train, company, localTime);
            }
        });
}

function drawRowCell(i, train, company, localTime) {
    //表形式で遅延路線を表示する
    const row = document.getElementById("train-list").insertRow(i + 1); // theadに追加されないよう+1する（=2行目〜追加される
    row.insertCell().textContent = company;
    row.insertCell().textContent = train;
    row.insertCell().textContent = localTime;
}
