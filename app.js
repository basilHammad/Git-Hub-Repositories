const input = document.querySelector(".header input");
const button = document.querySelector(".header span");
const dataDiv = document.querySelector(".data");

button.addEventListener("click", () => {
  if (input.value) {
    dataDiv.innerHTML = "";
    fetch(`https://api.github.com/users/${input.value}/repos`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject("user not found");
        }
      })
      .then((data) => {
        data.forEach((element) => {
          const div = document.createElement("div");
          const divText = document.createTextNode(element.name);
          div.className = "repos";

          const url = document.createElement("a");
          const urlText = document.createTextNode("visit");
          url.appendChild(urlText);
          url.href = `https://github.com/${input.value}/${element.name}`;
          url.setAttribute("target", "_blank");

          const starsSpan = document.createElement("span");
          const starsSpanText = document.createTextNode(
            `stars: ${element.stargazers_count}`
          );
          starsSpan.appendChild(starsSpanText);

          div.appendChild(divText);
          div.appendChild(url);
          div.appendChild(starsSpan);
          dataDiv.appendChild(div);
        });
      })
      .catch((error) => {
        const div = document.createElement("div");
        const divText = document.createTextNode(error);
        div.appendChild(divText);
        div.className = "error";
        dataDiv.appendChild(div);
      });
  } else {
    dataDiv.innerHTML = "Enter a git hub username";
  }
});
