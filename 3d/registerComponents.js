AFRAME.registerComponent("hotspots", {
  init: function () {
    this.el.addEventListener("reloadspots", function (evt) {
      const cam = document.getElementById("cam");
      const newspotgroup = document.getElementById(evt.detail.newspots);
      newspotgroup.setAttribute("scale", "1 1 1");
      cam.setAttribute(
        "animation__reset",
        `startEvents: reset; property: position; to: 0 1.6 0; dur: 1;`
      );
      cam.emit("reset");
    });
  },
});
AFRAME.registerComponent("spot", {
  schema: {
    linkto: { type: "string", default: "" },
    spotgroup: { type: "string", default: "" },
    x: { type: "number", default: 0 },
    y: { type: "number", default: 0 },
  },
  init: function () {
    const data = this.data;
    this.el.setAttribute("src", `##movepoint`);
    // this.el.setAttribute("look-at", "#cam");
    this.el.setAttribute("rotation", "-90 0 0");

    this.el.addEventListener("click", function () {
      const sky = document.getElementById("skybox");
      const cam = document.getElementById("cam");
      if (data.linkto == "#point26") {
        cam.setAttribute("rotation", "-10 0 0");
      }
      cam.setAttribute(
        "animation__move",
        `startEvents: move; property: position; to: ${data.x * 200} 1.6 ${
          data.y * 200
        }; dur: ${calC(Math.abs(data.x * 200), Math.abs(data.y * 200)) / 4};`
      );

      const spotcomp = document.getElementById("spots");
      const currspots = this.parentElement.getAttribute("id");
      const currspotgroup = document.getElementById(currspots);
      currspotgroup.setAttribute("scale", "0 0 0");

      cam.emit("move");

      setTimeout(() => {
        sky.setAttribute("src", data.linkto);
        spotcomp.emit("reloadspots", {
          newspots: data.spotgroup,
          currspots: currspots,
        });
      }, calC(Math.abs(data.x * 200), Math.abs(data.y * 200)) / 4 - 50);
    });
  },
});
AFRAME.registerComponent("detail", {
  schema: {
    src: { type: "string", default: "" },
    pop: { type: "string", default: "" },
    detail: { type: "string", default: "" },
    name: { type: "string", default: "" },
    type: { type: "string", default: "" },
    count: { type: "number", default: 0 },
  },
  init: function () {
    const data = this.data;

    if (data.pop) {
      this.el.setAttribute("gltf-model", "#" + data.src);
      this.el.addEventListener("click", () => {
        popUp(data);
      });
    } else if (data.detail) {
      this.el.setAttribute("gltf-model", "#" + data.src);
      this.el.addEventListener("click", () => {
        window.open(`../sub-page/${data.src}/sub.html`, "_blank");
      });
    }
  },
});
