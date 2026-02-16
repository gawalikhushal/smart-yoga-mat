const asanas = [
  {
    id: "tree",
    name_en: "Tree Pose",
    name_hi: "वृक्षासन",
    img: "/information imges/smaple pose img.jpg"
  },
  {
    id: "warrior",
    name_en: "Warrior II",
    name_hi: "वीरभद्रासन",
    img: "https://i.imgur.com/z0JYB2n.png"
  },
  {
    id: "mountain",
    name_en: "Mountain Pose",
    name_hi: "ताड़ासन",
    img: "https://i.imgur.com/7nQZpGx.png"
  }
];

const grid = document.getElementById("asanaGrid");

asanas.forEach(a => {
  const card = document.createElement("div");
  card.className = "asana-card";
  card.innerHTML = `
    <img src="${a.img}">
    <h3>${a.name_en}</h3>
    <p>${a.name_hi}</p>
  `;
  card.onclick = () => {
    window.location.href = `pose.html?pose=${a.id}`;
  };
  grid.appendChild(card);
});
