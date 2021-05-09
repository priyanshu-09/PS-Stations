let results = document.getElementsByClassName("results")[0];
let industry = [];
let selected_industries = [];
let industry_select = document.getElementById("industry-select");
let selected_industries_tag = document.getElementsByClassName(
  "selected-industries"
)[0];

for (var x = 0; x < information.length; x++) {
  if (industry.includes(information[x].industry)) continue;
  else if (information[x].industry == "") {
    console.log(information[x]);
  } else {
    industry.push(information[x].industry);
  }
}
var option_default = document.createElement("option");
option_default.text = "Industry :";
option_default.value = "";
industry_select.add(option_default);

for (var x = 0; x < industry.length; x++) {
  var option = document.createElement("option");
  option.text = industry[x];
  option.value = industry[x];
  industry_select.add(option);
}
function submit() {
  results.innerHTML = "";

  let branch = document.getElementById("branch-input");
  let info = [];
  for (var i = 0; i < information.length; i++) {
    let selected_allow =
      selected_industries.includes(information[i].industry) ||
      selected_industries.length == 0;
    if (information[i].projects && selected_allow) {
      for (var j = 0; j < information[i].projects.length; j++) {
        let any = "any";
        let any_index = information[i].projects[
          j
        ].preferredDisciplines.findIndex(
          (item) => any.toLowerCase() === item.toLowerCase()
        );
        let branch_index = information[i].projects[
          j
        ].preferredDisciplines.findIndex(
          (item) => branch.value.toLowerCase() === item.toLowerCase()
        );
        let matches_branch = branch_index != -1 || any_index != -1;
        if (
          matches_branch ||
          selected_industries.includes(information[i].industry)
        ) {
          info.push(information[i]);
        }
      }
    }
  }
  branch.value = "";
  print(info);
}

function print(info) {
  results.style.marginTop = `${
    document.getElementsByClassName("input")[0].getBoundingClientRect().height +
    40
  }px`;

  for (var i = 0; i < info.length; i++) {
    var div = document.createElement("div");
    div.classList.add("company");
    div.innerHTML = `
        <div class="company-details">
            <div class="name">${info[i].name}</div>
            <div class="station-id">Station ID- ${info[i].stationId}</div>
            <div class="company-id">Industry- ${info[i].industry}</div>
          </div>
    `;

    for (var j = 0; j < info[i].projects.length; j++) {
      div.innerHTML += `
            <div class="project-details">
            <div class="project-name"><b>Project Name -</b>${
              info[i].projects[j].title
            }</div>
            <div class="project-desc"><b>Project Description -</b>${
              info[i].projects[j].description
            }</div>
            <div class="project-required-skill">
              <b>Required Skills -</b>${info[i].projects[j].requiredSkills}
            </div>
            <div class="project-broad-area"><b>Broad Area -</b>${
              info[i].projects[j].broadArea
            }</div>
            <div class="project-branch"><b>Branch -</b>${info[i].projects[
              j
            ].preferredDisciplines.join(" , ")}</div>
          </div>
        `;
    }
    results.appendChild(div);
  }
}

function clear_all() {
  results.innerHTML = "";
  selected_industries = [];
  selected_industries_tag.innerHTML = `Selected Industries -`;
}

function selected_industry() {
  let selected = industry_select.value;
  industry_select.value = "";
  if (selected_industries.includes(selected)) return;
  else {
    selected_industries.push(selected);
    selected_industries_tag.innerHTML = `Selected Industries - ${selected_industries.join(
      " , "
    )} `;
  }
}
