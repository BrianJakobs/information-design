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
  name: "Song",
  children: [
    {
      name: "Non Digital Radio",
      value: "non-digital-radio",
      img: "non-digital-radio-image.png"
    },
    {
      name: "Digital Radio",
      value: "digital-radio",
      img: "digital-radio-image.png",
      children: [
        {
          name: "PRO",
          value: "pro-image",
          img: "pro-image.png",
          children: [
            {
              name: "Music Publisher",
              value: "music-publisher",
              img: "music-publisher-image.png",
              children: [
                {
                  name: "Song Writer",
                  value: "song-writer",
                  img: "song-writer-image.png"
                },
                {
                  name: "Componist",
                  value: "componist",
                  img: "componist-image.png"
                }
              ]
            }
          ]
        },
        {
          name: "Record Label",
          value: "record-label",
          img: "record-label-image.png",
          children: [
            {
              name: "Recording Artist",
              value: "record-artist",
              img: "recording-artist-image.png"
            }
          ]
        }
      ]
    }
  ]
};

const nodes = d3
  .hierarchy(data)
  .count(function(d) {
    return d.value ? 1 : 0;
  })
  .sort(function(a, b) {
    return b.value - a.value;
  });

let currentDepth;

treemap(nodes);

const chart = d3.select("#chart-section");

console.log(nodes.descendants());

const cells = chart
  .selectAll(".node")
  .data(nodes.descendants())
  .enter()
  .append("article")
  .attr("class", function(d) {
    return "node level-" + d.depth;
  })
  .attr("id", function(d) {
    return d.data.value;
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
    return d.x1 - d.x0 + "%";
  })
  .style("height", function(d) {
    return y(d.y1) - y(d.y0) + "%";
  })
  .style("background-image", function(d) {
    return d.value ? "url(src/img/" + d.data.img + ")" : "none";
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

console.log(document.getElementById("digital-radio"));

const animationTest = bodymovin.loadAnimation({
  container: document.getElementById("digital-radio"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "src/data.json"
});

const animation = bodymovin.loadAnimation({
  container: document.getElementById("non-digital-radio"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "src/updown.json"
});
