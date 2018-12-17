const d3 = require("d3");

// general values

const margin = { top: 20, bottom: 20, right: 120, left: 120 };
const width = 960 - margin.right - margin.left;
const height = 500 - margin.top - margin.bottom;

let i = 0;
let duration = 750;
let root;

const tree = d3.tree().size([height, width]);

const diagonal = d3
  .linkHorizontal()
  .x(function(d) {
    return d.x;
  })
  .y(function(d) {
    return d.y;
  });

const svg = d3
  .select("main")
  .append("svg")
  .attr("width", width + margin.right + margin.left)
  .attr("height", height + margin.top + margin.bottom)
  .append("g");
