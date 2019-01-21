const d3 = require("d3");

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

const treemap = d3
  .treemap()
  .size([height, width])
  .paddingInner(0)
  .round(false);

const data = {
  name: "Song",
  value: "song",
  children: [
    {
      name: "Non Digital Radio",
      value: "non-digital-radio"
    },
    {
      name: "Digital Radio",
      value: "digital-radio",

      children: [
        {
          name: "PRO",
          value: "pro",

          children: [
            {
              name: "Music Publisher",
              value: "music-publisher",

              children: [
                {
                  name: "Song Writer",
                  value: "song-writer"
                }
              ]
            }
          ]
        },
        {
          name: "Record Label",
          value: "record-label",
          children: [
            {
              name: "Performer",
              value: "performer"
            }
          ]
        }
      ]
    }
  ]
};

const nodes = d3.hierarchy(data).count(function(d) {
  return d.value ? 1 : 0;
});

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
  .attr("id", function(d) {
    return d.data.value;
  })
  .attr("title", function(d) {
    return d.data.name ? d.data.name : "null";
  });

// list of all json animations
const aninmationSong = bodymovin.loadAnimation({
  container: document.getElementById("song"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "src/data/song_animation.json"
});

const aninmationNidj = bodymovin.loadAnimation({
  container: document.getElementById("non-digital-radio"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "src/data/nidj_animation.json"
});

const aninmationPerformer = bodymovin.loadAnimation({
  container: document.getElementById("performer"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "src/data/performer_animation.json"
});

const aninmationPro = bodymovin.loadAnimation({
  container: document.getElementById("pro"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "src/data/distribute_animation.json"
});

const aninmationSongwriter = bodymovin.loadAnimation({
  container: document.getElementById("song-writer"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "src/data/publisher_animation.json"
});

//scroll to button
const scrollToButton = document.getElementsByClassName("btn-scroll")[0];
const firstHeading = document
  .getElementById("section-heading-one")
  .getBoundingClientRect();
function scrollToFirstSection() {
  window.scrollTo({ top: firstHeading.top - 100, behavior: "smooth" });
}

scrollToButton.addEventListener("click", scrollToFirstSection, false);

// expand repertoire section
const repertoireSection = document.getElementsByClassName("repertoire-info");
const textSection = document.getElementsByClassName("repertoire-text")[0];

Object.entries(repertoireSection).map(object => {
  object[1].addEventListener("click", function() {
    this.classList.toggle("expand");
  });
});

// show image on click
const buttons = document.querySelectorAll(".europe, .usa");
const splitImage = document.querySelector(".publisher-split");

buttons.forEach(function(button, index) {
  button.addEventListener("click", () => {
    if (
      button.classList.contains("usa") &&
      button.classList.contains("btn-inactive")
    ) {
      buttons[index].classList.toggle("btn-inactive");
      splitImage.src = "src/img/publisher_split_usa.svg";
      button.previousElementSibling.classList.toggle("btn-inactive");
    } else if (
      button.classList.contains("europe") &&
      button.classList.contains("btn-inactive")
    ) {
      buttons[index].classList.toggle("btn-inactive");
      splitImage.src = "src/img/publisher_split_eu.svg";
      button.nextElementSibling.classList.toggle("btn-inactive");
    }
  });
});

// when user scrolls down the page, detect when sections hit the measure point
const bodyPage = document.getElementsByTagName("body")[0];
// bodyPage.classList.add("hide");

bodyPage.onscroll = () => {
  let measuringPoint = window.innerHeight / 3;
  let positionBody = document.body.getBoundingClientRect();

  const positionSectionOne = document
    .getElementById("section-heading-one")
    .getBoundingClientRect();
  const sectionOne = positionSectionOne.top - positionBody.top - measuringPoint;

  const positionSectionTwo = document
    .getElementById("section-heading-two")
    .getBoundingClientRect();
  const sectionTwo = positionSectionTwo.top - positionBody.top - measuringPoint;

  const positionSectionThree = document
    .getElementById("section-heading-three")
    .getBoundingClientRect();
  const sectionThree =
    positionSectionThree.top - positionBody.top - measuringPoint;

  const positionSectionFour = document
    .getElementById("section-heading-four")
    .getBoundingClientRect();
  const sectionFour =
    positionSectionFour.top - positionBody.top - measuringPoint;

  const positionSectionFive = document
    .getElementById("section-heading-five")
    .getBoundingClientRect();
  const sectionFive =
    positionSectionFive.top - positionBody.top - measuringPoint;

  const positionSectionSix = document
    .getElementById("section-heading-six")
    .getBoundingClientRect();
  const sectionSix = positionSectionSix.top - positionBody.top - measuringPoint;

  const positionSectionSeven = document
    .getElementById("section-heading-seven")
    .getBoundingClientRect();
  const sectionSeven =
    positionSectionSeven.top - positionBody.top - measuringPoint;

  if (window.pageYOffset < sectionOne) {
    document.getElementById("chart-intro-section").classList.remove("hide");
  } else if (
    window.pageYOffset > sectionOne &&
    window.pageYOffset < sectionTwo
  ) {
    document.getElementById("chart-intro-section").classList.add("hide");
    document.getElementById("song").classList.remove("hide");
  } else if (
    window.pageYOffset > sectionTwo &&
    window.pageYOffset < sectionThree
  ) {
    document.getElementById("song").classList.add("hide");
    document.getElementById("non-digital-radio").classList.remove("hide");
    document.getElementById("digital-radio").classList.remove("hide");
  } else if (
    window.pageYOffset > sectionThree &&
    window.pageYOffset < sectionFour
  ) {
    document.getElementById("non-digital-radio").classList.add("hide");
    document.getElementById("digital-radio").classList.add("hide");
    document.getElementById("record-label").classList.remove("hide");
    document.getElementById("pro").classList.remove("hide");
  } else if (
    window.pageYOffset > sectionFour &&
    window.pageYOffset < sectionFive
  ) {
    document.getElementById("record-label").classList.add("hide");
    document.getElementById("pro").classList.add("hide");
    document.getElementById("performer").classList.remove("hide");
  } else if (
    window.pageYOffset > sectionFive &&
    window.pageYOffset < sectionSix
  ) {
    document.getElementById("record-label").classList.remove("hide");
    document.getElementById("pro").classList.remove("hide");
    document.getElementById("performer").classList.add("hide");
  } else if (
    window.pageYOffset > sectionSix &&
    window.pageYOffset < sectionSeven
  ) {
    document.getElementById("record-label").classList.add("hide");
    document.getElementById("pro").classList.add("hide");
    document.getElementById("music-publisher").classList.remove("hide");
  } else if (window.pageYOffset > sectionSeven) {
    document.getElementById("music-publisher").classList.add("hide");
    document.getElementById("song-writer").classList.remove("hide");
  }
};
