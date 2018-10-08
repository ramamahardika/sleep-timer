window.onload = function() {
  window.resizeTo(380, 236);
  document
    .getElementsByTagName("form")[0]
    .addEventListener("submit", function(e) {
      e.preventDefault();
      var numb = this.querySelectorAll("input")[0].value;
      if (isNaN(numb)) {
        document.getElementById("notif").textContent =
          "Check again, must be minutes & number!";
        document.getElementById("notif").style.visibility = "visible";
        return;
      }
      document.getElementById("asd").value = "";
      var input = encodeURIComponent(Number(numb) * 60);
      var XHR = new XMLHttpRequest();
      XHR.open("POST", "http://localhost:5000/api");
      XHR.setRequestHeader("Content-Type", "application/json");
      XHR.send(
        JSON.stringify({
          time: input
        })
      );
      XHR.onreadystatechange = function() {
        if (XHR.readyState === 4) {
          var response = JSON.parse(XHR.responseText);
          if (response.message === "success") {
            document.getElementById("notif").textContent = "PC Shutdown Set";
            document.getElementById("notif").style.visibility = "visible";
          } else if (response.message === "notnumber") {
            document.getElementById("notif").textContent =
              "Check again, must be minutes & number!";
            document.getElementById("notif").style.visibility = "visible";
          } else {
            document.getElementById("notif").textContent = "Failed";
            document.getElementById("notif").style.visibility = "visible";
          }
        }
      };
    });
  document.getElementById("asd").addEventListener("keyup", function(e) {
    document.getElementById("notif").style.visibility = "hidden";
    document.getElementById("notif").textContent = "";
  });
  document.getElementById("notif").addEventListener("click", function(e) {
    this.style.visibility = "hidden";
    this.textContent = "";
    document.getElementById("asd").value = "";
  });
  document.getElementById("cancel").addEventListener("click", function(e) {
    e.preventDefault();
    var XHR = new XMLHttpRequest();
    XHR.open("POST", "http://localhost:5000/cancel");
    XHR.setRequestHeader("Content-Type", "application/json");
    XHR.send(
      JSON.stringify({
        cancel: true
      })
    );
    XHR.onreadystatechange = function() {
      if (XHR.readyState === 4) {
        var response = JSON.parse(XHR.responseText);
        if (response.message === "success") {
          document.getElementById("notif").textContent = "Canceled";
          document.getElementById("notif").style.visibility = "visible";
        } else {
          document.getElementById("notif").textContent = "No upcoming shutdown";
          document.getElementById("notif").style.visibility = "visible";
        }
      }
    };
  });
};
