const d3 = require("d3");
const lottie = require("lottie-web");

const width = 100;
const height = 100;

const treemap = d3
  .treemap()
  .size([height, width])
  .paddingInner(0)
  .round(false);

// stakeholders
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

const nodes = d3.hierarchy(data).count(d => {
  return d.value ? 1 : 0;
});

treemap(nodes);

const chart = d3.select("#section-right");

const cells = chart
  .selectAll(".node")
  .data(nodes.descendants())
  .enter()
  .append("article")
  .attr("class", d => {
    return "node level-" + d.depth;
  })
  .attr("id", d => {
    return d.data.value;
  });

// list of all json animations
const animations = [
  "song",
  "digital-radio",
  "non-digital-radio",
  "record-label",
  "pro",
  "performer",
  "music-publisher",
  "song-writer"
];

// load animations
animations.forEach(anim => {
  const animation = document.getElementById(anim);
  const animData = {
    container: animation,
    renderer: "svg",
    loop: true,
    autplay: true,
    path: "src/data/" + anim + "_animation.json"
  };
  const animElem = lottie.loadAnimation(animData);
});

// scroll to button
const scrollToButton = document.getElementsByClassName("btn-scroll")[0];
const firstHeading = document
  .getElementById("heading-one")
  .getBoundingClientRect();
function scrollToFirstSection() {
  window.scrollTo({ top: firstHeading.top - 100, behavior: "smooth" });
}

scrollToButton.addEventListener("click", scrollToFirstSection, false);

// expand repertoire section
const repertoireSection = document.getElementsByClassName("section-info");

Object.entries(repertoireSection).map(object => {
  object[1].addEventListener("click", function() {
    this.classList.toggle("expand");
  });
});

// show image on click
const buttons = document.querySelectorAll(".btn-first, .btn-second");
const splitImage = document.querySelector(".image-toggle");

buttons.forEach(function(button, index) {
  button.addEventListener("click", () => {
    if (
      button.classList.contains("btn-second") &&
      button.classList.contains("btn-inactive")
    ) {
      buttons[index].classList.toggle("btn-inactive");
      splitImage.src = "src/img/publisher_split_usa.svg";
      button.previousElementSibling.classList.toggle("btn-inactive");
    } else if (
      button.classList.contains("btn-first") &&
      button.classList.contains("btn-inactive")
    ) {
      buttons[index].classList.toggle("btn-inactive");
      splitImage.src = "src/img/publisher_split_eu.svg";
      button.nextElementSibling.classList.toggle("btn-inactive");
    }
  });
});

// measure point window
const bodyPage = document.getElementsByTagName("body")[0];

let measuringPoint = window.innerHeight / 3;
let positionBody = document.body.getBoundingClientRect();

// position heading of sections
const positionSectionOne = document
  .getElementById("heading-one")
  .getBoundingClientRect();
const sectionOne = positionSectionOne.top - positionBody.top - measuringPoint;

const positionSectionTwo = document
  .getElementById("heading-two")
  .getBoundingClientRect();
const sectionTwo = positionSectionTwo.top - positionBody.top - measuringPoint;

const positionSectionThree = document
  .getElementById("heading-three")
  .getBoundingClientRect();
const sectionThree =
  positionSectionThree.top - positionBody.top - measuringPoint;

const positionSectionFour = document
  .getElementById("heading-four")
  .getBoundingClientRect();
const sectionFour = positionSectionFour.top - positionBody.top - measuringPoint;

const positionSectionFive = document
  .getElementById("heading-five")
  .getBoundingClientRect();
const sectionFive = positionSectionFive.top - positionBody.top - measuringPoint;

const positionSectionSix = document
  .getElementById("heading-six")
  .getBoundingClientRect();
const sectionSix = positionSectionSix.top - positionBody.top - measuringPoint;

const positionSectionSeven = document
  .getElementById("heading-seven")
  .getBoundingClientRect();
const sectionSeven =
  positionSectionSeven.top - positionBody.top - measuringPoint;

// onscroll function to add and remove classes
bodyPage.onscroll = () => {
  if (window.pageYOffset < sectionOne) {
    document.getElementById("chart-intro").classList.remove("hide");
  } else if (
    window.pageYOffset > sectionOne &&
    window.pageYOffset < sectionTwo
  ) {
    document.getElementById("chart-intro").classList.add("hide");
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
  } else if (
    window.pageYOffset > sectionFive &&
    window.pageYOffset < sectionSix
  ) {
    document.getElementById("record-label").classList.remove("hide");
    document.getElementById("pro").classList.remove("hide");
    document.getElementById("performer").classList.remove("hide");
  } else if (
    window.pageYOffset > sectionSix &&
    window.pageYOffset < sectionSeven
  ) {
    document.getElementById("record-label").classList.add("hide");
    document.getElementById("pro").classList.add("hide");
    document.getElementById("performer").classList.add("hide");
    document.getElementById("music-publisher").classList.remove("hide");
  } else if (window.pageYOffset > sectionSeven) {
    document.getElementById("music-publisher").classList.add("hide");
    document.getElementById("song-writer").classList.remove("hide");
  }
};
