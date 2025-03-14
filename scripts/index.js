function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}
function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos));
}
function displayCategories(categories) {
  const categoryContainer = document.getElementById("category-container");
  for (const cat of categories) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
        <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>

        `;
    categoryContainer.appendChild(categoryDiv);
  }
}
const displayVideos = (videos) => {
  const videoDiv = document.getElementById("video-container");
  videos.forEach((video) => {
    console.log(video);
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
            <div class="card bg-base-100  shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
        `;
    videoDiv.appendChild(videoCard);
  });
};
loadCategories();
loadVideos();
