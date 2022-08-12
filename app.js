$("#_uploadImages").click(function () {
  $("#_imagesInput").click();
});

$("#_imagesInput").on("change", function () {
  handleFileSelect();
});

function handleFileSelect() {
  //Check File API support
  if (window.File && window.FileList && window.FileReader) {
    var files = event.target.files; //FileList object
    var output = document.getElementById("frames");
    var arrFilesCount = [];

    for (var i = 0; i < files.length; i++) {
      arrFilesCount.push(i);
      var file = files[i];

      //Only pics
      if (!file.type.match("image")) continue;

      var picReader = new FileReader();
      picReader.addEventListener("load", function (event) {
        var picFile = event.target;

        console.log(event);

        current_i = arrFilesCount.shift();
        prev_i = current_i - 1;
        next_i = current_i + 1;

        if (prev_i < 0) {
          prev_i = 0;
        }
        //if(arrFilesCount.length < 1) {
        //	next_i = 0
        //}

        output.innerHTML =
          output.innerHTML +
          '<li id="slide-' +
          current_i +
          '" class="slide">' +
          "<img src='" +
          picFile.result +
          "'" +
          "title=''/>" +
          "<nav>" +
          '<a class="prev" href="#slide-' +
          prev_i +
          '">&larr;</a>' +
          '<a class="next" href="#slide-' +
          next_i +
          '">&rarr;</a>' +
          "</nav>" +
          "<li>"; // TODO: Enter Title
      });
      //Read the image
      picReader.readAsDataURL(file);
    }
    output.innerHTML =
      output.innerHTML +
      '<li class="quicknav">' +
      "<ul>" +
      '<li><a href="#slide-0"></a></li>' +
      '<li><a href="#slide-1"></a></li>' +
      '<li><a href="#slide-2"></a></li>' +
      "</ul>" +
      "</li>";
  } else {
    console.log("Your browser does not support File API");
  }
}
