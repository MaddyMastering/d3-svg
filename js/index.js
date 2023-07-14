var noCollarSvg = {
  front: "./images/Front-No-Collar.svg",
  back: "./images/Back-No-Collar.svg",
};

var collarSvg = {
  front: "./images/Front-Collar.svg",
  back: "./images/Back-Collar.svg",
};

var shirtType = "";
var shirtColorElement = document.getElementById("shirt-color");
var sleeveColorElement = document.getElementById("sleeve-color");
var collarColorElement = document.getElementById("collar-color");

function SelectShirt(type) {
  shirtType = type;
  d3.select("#back").selectAll("svg").remove();
  d3.select("#front").selectAll("svg").remove();

  if (type == "COLLAR") {
    d3.xml(collarSvg.back).then((data) => {
      d3.select("#back").node().append(data.documentElement);
    });

    d3.xml(collarSvg.front).then((data) => {
      d3.select("#front").node().append(data.documentElement);
    });
  } else {
    d3.xml(noCollarSvg.back).then((data) => {
      d3.select("#back").node().append(data.documentElement);
    });

    d3.xml(noCollarSvg.front).then((data) => {
      d3.select("#front").node().append(data.documentElement);
    });
  }
}

function SelectShirtColor() {
  var body = d3.selectAll("svg").selectAll("#body");
  body.style("fill", shirtColorElement.value);

  // var logo = d3.selectAll("svg");
  // logo.append("svg:image")
  // .attr("x", "20")
  // .attr("y", "20")
  // .attr("width", "100")
  // .attr("height", "100")
  // .attr("xlink:href", "./images/logo.png");
}

function SelectSleeveColor() {
  var sleeve = d3.selectAll("svg").selectAll("#hand");
  sleeve.style("fill", sleeveColorElement.value);
}

function SelectCollarColor() {
  var collar = d3.selectAll("svg").selectAll("#collar");
  var cuff = d3.selectAll("svg").selectAll("#hand-cuff");
  collar.style("fill", collarColorElement.value);
  cuff.style("fill", collarColorElement.value);
}

function Order() {
  var csv_data = [];
  csv_data.push("type", shirtType, "\n");
  csv_data.push("shirt color", shirtColorElement.value, "\n");
  csv_data.push("sleeve color", sleeveColorElement.value, "\n");
  csv_data.push("collar color", collarColorElement.value, "\n");
  csv_data.push("size color", document.getElementById("sizes").value, "\n");
  csv_data.push("units color", document.getElementById("units").value, "\n");

  var CSVFile = new Blob([csv_data], { type: "text/csv" });
  var temp_link = document.createElement("a");
  temp_link.download = "order.csv";
  var url = window.URL.createObjectURL(CSVFile);
  temp_link.href = url;
  temp_link.style.display = "none";
  document.body.appendChild(temp_link);
  temp_link.click();
  document.body.removeChild(temp_link);
}
