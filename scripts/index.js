function removeActiveClass() {
  const activeButton = document.getElementsByClassName("active");
  for (let btn of activeButton) {
    btn.classList.remove("active");
  }
  console.log(activeButton);
}
function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}
function loadVideos(searchText = "") {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active");
      displayVideos(data.videos);
    });
}
function displayCategories(categories) {
  const categoryContainer = document.getElementById("category-container");
  for (const cat of categories) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
        <button id='${cat.category_id}' onclick="loadCategoriesVideos(${cat.category_id})"  class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>

        `;
    categoryContainer.appendChild(categoryDiv);
  }
}
const loadCategoriesVideos = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const clickedButton = document.getElementById(`${id}`);
      clickedButton.classList.add("active");
      displayVideos(data.category);
    });
};
const loadVideoDetails = (videoId) => {
  console.log(videoId);
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideoDetail(data));
};
const displayVideoDetail = (video) => {
  console.log(video);
  document.getElementById("my_modal_1").showModal();
  const details = document.getElementById("details-container");
  console.log(details);
  details.innerHTML = `
  <div class="card bg-base-100 image-full  shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
  </div>
</div>
  `;
};
const displayVideos = (videos) => {
  const videoDiv = document.getElementById("video-container");
  videoDiv.innerHTML = ``;
  if (videos.length == 0) {
    videoDiv.innerHTML = ` <div class=" py-20 col-span-full flex flex-col justify-center items-center text-center">
        <img class="w-[120px]" src="./resources/Icon.png" alt="">
        <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content Here </h2>
      </div>`;
    return;
  }
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
            <p class="text-sm text-gray-400 flex gap-2">${video.authors[0].profile_name}
            ${video.authors[0].verified == true ?`<img class="h-5 w-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">`  :` ` }

            </p>
            <p>${video.others.views} views</p>
            
          </div>
        </div>
        <button onclick=loadVideoDetails("${video.video_id}") class="btn btn-block">Show Details</button>
      </div>
        `;
    videoDiv.appendChild(videoCard);
  });
};
document.getElementById('search-input').addEventListener('keyup', (e)=>{
const input = e.target.value;
loadVideos(input)
})
loadCategories();
// loadVideos();
