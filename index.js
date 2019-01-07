const d3 = require("d3");

// https://codepen.io/znak/pen/qapRkQ
const width = 100;
const height = 100;

const x = d3
  .scaleLinear()
  .domain([0, width])
  .range([0, width]);

const y = d3
  .scaleLinear()
  .domain([0, height])
  .range([0, height]);

const color = d3.scaleOrdinal().range(
  d3.schemeDark2.map(function(c) {
    c = d3.rgb(c);
    return c;
  })
);

const treemap = d3
  .treemap()
  .size([height, width])
  .paddingInner(0)
  .round(false);

const data = {
  name: "Repertoire",
  children: [
    {
      name: "Streaming",
      children: [
        {
          name: "Recording",
          children: [
            { name: "Sony UK", value: "cgi-1.jpg" },
            { name: "Megaphonic", value: "cgi-2.jpg" },
            { name: "Imogen Heap", value: "cgi-3.jpg" }
          ]
        },
        {
          name: "Publishing",
          children: [
            { name: "PRS", value: "photo-1.jpg" },
            { name: "DSP", value: "photo-2.jpg" },
            { name: "MCPS", value: "photo-3.jpg" },
            { name: "Imagen", value: "photo-4.jpg" },
            { name: "Imogen", value: "photo-5.jpg" }
          ]
        }
      ]
    }
  ]
};

const nodes = d3.hierarchy(data).sum(function(d) {
  return d.value ? 1 : 0;
});

let currentDepth;

treemap(nodes);

const chart = d3.select("#chart-section");

const cells = chart
  .selectAll(".node")
  .data(nodes.descendants())
  .enter()
  .append("article")
  .attr("class", function(d) {
    return "node level-" + d.depth;
  })
  .attr("title", function(d) {
    return d.data.name ? d.data.name : "null";
  });

cells
  .style("left", function(d) {
    return x(d.x0) + "%";
  })
  .style("top", function(d) {
    return y(d.y0) + "%";
  })
  .style("width", function(d) {
    return x(d.x1) - x(d.x0) + "%";
  })
  .style("height", function(d) {
    return y(d.y1) - y(d.y0) + "%";
  })
  .style("background-color", function(d) {
    while (d.depth > 2) d = d.parent;
    return color(d.data.name);
  })
  .on("click", zoom)
  .append("p")
  .attr("class", "label")
  .text(function(d) {
    return d.data.name ? d.data.name : "---";
  });

const parent = d3
  .select(".up")
  .datum(nodes)
  .on("click", zoom);

// wanneer er geklikt wordt, gaat deze functie in werking
function zoom(d) {
  currentDepth = d.depth;
  parent.datum(d.parent || nodes);

  x.domain([d.x0, d.x1]);
  y.domain([d.y0, d.y1]);

  const transition = d3
    .transition()
    .duration(800)
    .ease(d3.easeCubicOut);

  cells
    .transition(transition)
    .style("left", function(d) {
      return x(d.x0) + "%";
    })
    .style("top", function(d) {
      return y(d.y0) + "%";
    })
    .style("width", function(d) {
      return x(d.x1) - x(d.x0) + "%";
    })
    .style("height", function(d) {
      return y(d.y1) - y(d.y0) + "%";
    });

  cells
    .filter(function(d) {
      return d.ancestors();
    })
    .classed("hide", function(d) {
      return d.children ? true : false;
    });

  cells
    .filter(function(d) {
      return d.depth > currentDepth;
    })
    .classed("hide", false);
  console.log(currentDepth);
}
