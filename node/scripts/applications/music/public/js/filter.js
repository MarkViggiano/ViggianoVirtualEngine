function filter() {
    let input = document.getElementById("songSearch");
    let inputText = input.value.toLowerCase();
    let ul = document.getElementById("songList");
    let liTags = ul.getElementsByTagName("li");
    for (li of liTags) {
      let h3 = li.getElementsByTagName("h3");
      let txtValue = h3[0].firstChild.nodeValue;
      if (txtValue.toLowerCase().indexOf(inputText) > -1) li.style.display = "";
      else li.style.display = "none";
    }
  }
