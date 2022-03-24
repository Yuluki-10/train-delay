window.addEventListener('load', function() {
    getTrainList();
  });
  
  function getTrainList() {
    let url = 'https://tetsudo.rti-giken.jp/free/delay.json'; //遅延情報のJSON
    fetch(url)
    .then(function (data) {
      return data.json(); // 読み込むデータをJSONに設定
    })
    .then(function (json) {
      for (let i = 0; i < json.length; i++) {
        let train = json[i].name;
        let company = json[i].company;
        let time = json[i].lastupdate_gmt;
        let utctime = new Date(time * 1000); //送られてくるのはunix time（ミリ秒）なので、1000倍
        let options = { weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }; //▶︎表記例：2022年3月23日(水)
        let localTime = utctime.toLocaleDateString('ja-JP', options);
  
        //表形式で遅延路線を表示する
        let row = document.getElementById('train-list').insertRow(i+1);// theadに追加されないよう+1する（=2行目〜追加される
        row.insertCell().textContent = company;
        row.insertCell().textContent = train;
        row.insertCell().textContent = localTime;
      }
    });
  }