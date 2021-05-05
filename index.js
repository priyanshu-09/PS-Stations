let results = document.getElementsByClassName("results")[0];

function submit() {
  let branch = document.getElementById("branch-input");
  let info = [];
  console.log(information);
  for (var i = 0; i < information.length; i++) {
    console.log(information[i]);
    if (information[i].projects)
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

        if (branch_index != -1 || any_index != -1) {
          info.push(information[i]);
        }
      }
  }
  branch.value = "";
  print(info);
}

function print(info) {
  results.innerHTML = "";
  for (var i = 0; i < info.length; i++) {
    var div = document.createElement("div");
    div.classList.add("company");
    div.innerHTML = `
        <div class="company-details">
            <div class="name">${info[i].name}</div>
            <div class="station-id">Station ID- ${info[i].stationId}</div>
            <div class="company-id">Company ID- ${info[i].companyId}</div>
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
