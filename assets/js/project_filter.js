document.addEventListener("DOMContentLoaded", function () {
  fetch("https://projects.khantzay1.repl.co/api/projects")
    .then((response) => response.json())
    .then((jsonData) => {
      // Extract unique categories from jsonData
      const categories = Array.from(new Set(jsonData.map((project) => project.category)));
      populateProjectsFromJSON(jsonData);
      createFilterButtons(categories, "filter-list");
      createFilterButtons(categories, "selected-list");
      createSelectFilter(categories);
    })
    .catch((error) => console.error("Error fetching data:", error));

  function populateProjectsFromJSON(jsonData) {
    const projectList = document.querySelector(".project-list");

    jsonData.forEach((project) => {
      const projectItem = document.createElement("li");
      projectItem.className = "project-item active";
      projectItem.dataset.filterItem = true;
      projectItem.dataset.category = project.category.toLowerCase();

      const link = document.createElement("a");
      link.href = "#";

      const figure = document.createElement("figure");
      figure.className = "project-img";

      const iconBox = document.createElement("div");
      iconBox.className = "project-item-icon-box";
      const icon = document.createElement("ion-icon");
      icon.name = "eye-outline";
      iconBox.appendChild(icon);

      const projectImg = document.createElement("img");
      projectImg.src = project.image;
      projectImg.alt = project.alt;
      projectImg.loading = "lazy";

      figure.appendChild(iconBox);
      figure.appendChild(projectImg);

      const projectName = document.createElement("h3");
      projectName.className = "project-title";
      projectName.textContent = project.name;

      const projectCategory = document.createElement("p");
      projectCategory.className = "project-category";
      projectCategory.textContent = "Programming Language: " + project.language;

      link.appendChild(figure);
      link.appendChild(projectName);
      link.appendChild(projectCategory);
      projectItem.appendChild(link);

      projectList.appendChild(projectItem);
    });
  }

  function createFilterButtons(categories, containerClass) {
    const container = document.querySelector(`.${containerClass}`);

    categories.forEach((category) => {
      const filterItem = document.createElement("li");
      const filterButton = document.createElement("button");
    });

    const filterButtons = document.querySelectorAll(`.${containerClass} [data-filter-btn]`);

    // Add event listeners to filter buttons
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.textContent.toLowerCase();
        const projectItems = document.querySelectorAll(".project-item");

        projectItems.forEach((item) => {
          if (category === "all" || item.dataset.category === category) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });

        // Remove the "active" class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));

        // Add the "active" class to the clicked button
        button.classList.add("active");
      });
    });
  }

  function createSelectFilter(categories) {
    const selectList = document.querySelector(".select-list");

    categories.forEach((category) => {
      const selectItem = document.createElement("li");
      const selectButton = document.createElement("button");
    });

    const selectButtons = document.querySelectorAll(".select-list [data-select-item]");
    const selectValue = document.querySelector("[data-selecct-value]");

    // Add event listeners to select buttons
    selectButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.textContent.toLowerCase();
        const projectItems = document.querySelectorAll(".project-item");

        projectItems.forEach((item) => {
          if (category === "all" || item.dataset.category === category) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });

        // Update the select box value
        selectValue.textContent = category;

        // Close the select list
        selectList.classList.remove("active");
      });
    });
  }
});
