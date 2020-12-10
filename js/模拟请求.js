var data = JSON.stringify({"content":"问题","multimedia":[],"questionerId":1350,"score":0,"title":"免费咨询","type":0});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "http://221.10.114.135:8882/healthConsult/ask/question");
xhr.setRequestHeader("access_token", "fd3ec506-db19-4977-9053-8e793c1e921d");
xhr.setRequestHeader("Content-Type", "application/json");

xhr.send(data);