const d3 = require("d3");

// general values

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
  name: "Portfolio",
  children: [
    {
      name: "Identity",
      children: [
        {
          name: "Auto Lenart",
          children: [
            { name: "Photo 1", value: "cgi-1.jpg" },
            { name: "Photo 2", value: "cgi-2.jpg" },
            { name: "Photo 3", value: "cgi-3.jpg" }
          ]
        },
        {
          name: "PrintHouse",
          children: [
            { name: "Photo 1", value: "photo-1.jpg" },
            { name: "Photo 2", value: "photo-2.jpg" },
            { name: "Photo 3", value: "photo-3.jpg" },
            { name: "Photo 4", value: "photo-4.jpg" },
            { name: "Photo 5", value: "photo-5.jpg" }
          ]
        },
        {
          name: "Mertz",
          children: [
            { name: "Photo 1", value: "epc-1.jpg" },
            { name: "Photo 2", value: "epc-2.jpg" },
            { name: "Photo 3", value: "epc-3.jpg" }
          ]
        },
        {
          name: "Stanford",
          children: [
            { name: "Photo 1", value: "floorplan-1.jpg" },
            { name: "Photo 3", value: "floorplan-2.jpg" }
          ]
        }
      ]
    },
    {
      name: "Web",
      children: [
        {
          name: "AEG",
          children: [
            { name: "Photo 1", value: "litho-1.jpg" },
            { name: "Photo 2", value: "litho-2.jpg" },
            { name: "Photo 3", value: "litho-3.jpg" },
            { name: "Photo 4", value: "litho-4.jpg" },
            { name: "Photo 5", value: "litho-5.jpg" },
            { name: "Photo 6", value: "litho-6.jpg" }
          ]
        },
        {
          name: "Brent",
          children: [
            { name: "Photo 1", value: "digital-1.jpg" },
            { name: "Photo 2", value: "digital-2.jpg" },
            { name: "Photo 3", value: "digital-3.jpg" },
            { name: "Photo 4", value: "digital-4.jpg" }
          ]
        }
      ]
    },
    {
      name: "Print",
      children: [
        {
          name: "BvD",
          children: [
            { name: "Photo 1", value: "folding-1.jpg" },
            { name: "Photo 2", value: "folding-2.jpg" },
            { name: "Photo 3", value: "folding-3.jpg" }
          ]
        },
        {
          name: "Metalplast",
          children: [
            { name: "Photo 1", value: "stitched-1.jpg" },
            { name: "Photo 2", value: "stitched-2.jpg" },
            { name: "Photo 3", value: "stitched-3.jpg" },
            { name: "Photo 4", value: "stitched-4.jpg" },
            { name: "Photo 5", value: "stitched-5.jpg" }
          ]
        },
        {
          name: "Skylon",
          children: [
            { name: "Photo 1", value: "sewn-1.jpg" },
            { name: "Photo 2", value: "sewn-2.jpg" },
            { name: "Photo 3", value: "sewn-3.jpg" }
          ]
        },
        {
          name: "The O2",
          children: [
            { name: "Photo 1", value: "softback-1.jpg" },
            { name: "Photo 3", value: "softback-2.jpg" }
          ]
        },
        {
          name: "Trendy",
          children: [
            { name: "Photo 1", value: "hardback-1.jpg" },
            { name: "Photo 2", value: "hardback-2.jpg" },
            { name: "Photo 3", value: "hardback-3.jpg" },
            { name: "Photo 4", value: "hardback-4.jpg" }
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

const chart = d3.select("#treemap-chart");

const cells = chart
  .selectAll(".node")
  .data(nodes.descendants())
  .enter()
  .append("section")
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

function zoom(d) {
  currentDepth = d.depth;
  parent.datum(d.parent || nodes);

  x.domain([d.x0, d.x1]);
  y.domain([d.y0, d.y1]);

  let t = d3
    .transition()
    .duration(800)
    .ease(d3.easeCubicOut);

  cells
    .transition(t)
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
}
