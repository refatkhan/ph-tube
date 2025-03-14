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

const loadCategoriesVideos = (id)=>{
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
  fetch(url)
  .then(res => res.json())
  .then(data => console.log(data))
}
function displayCategories(categories) {
  const categoryContainer = document.getElementById("category-container");
  for (const cat of categories) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
        <button onclick="loadCategoriesVideos(${cat.category_id})"  class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>

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
       <div class="card bg-base-100 space-y-3">
        <figure class="relative">
          <img class="h-[150px] w-full object-cover"
            src="${video.thumbnail}" />
            <span class="absolute bottom-2 right-2 text-white bg-black p-1 ">
              3 hours 56 min ago
            </span>
        </figure>
       
        <div class=" flex gap-3 px-0 pt-2">
          <div class="profile">
            <div class="avatar">
              <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                <img src="${video.authors[0].profile_picture}" />
              </div>
            </div>
          </div>
          <div class="text">
            <h2 class="text-sm font-semibold">${video.title}</h2>
            <p class="text-sm text-gray-400 flex gap-2">${video.authors[0].profile_name}<img class="h-5 w-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt=""></p>
            <p>${video.others.views} views</p>
            
          </div>
        </div>
      </div>
        `;
    videoDiv.appendChild(videoCard);
  });
};
loadCategories();
// loadVideos();
