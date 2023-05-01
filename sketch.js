document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.querySelector(".start-button");
    const fullPageVideo = document.querySelector(".full-page-video");
    const container = document.querySelector(".container");
    const unmuteButton = document.querySelector("#unmuteButton");
    const unmuteIcon = document.querySelector("#unmuteIcon");
    const backgroundVideo = document.querySelector("#background-video");
    const body = document.querySelector("body");

    startButton.addEventListener("click", function () {
        fullPageVideo.style.display = "none";
        container.style.display = "block";
        backgroundVideo.pause();
        backgroundVideo.removeAttribute("autoplay");
        body.classList.remove("no-scroll");
    });

    videoBackgroundTab.addEventListener("click", function (event) {
        event.preventDefault();
        fullPageVideo.style.display = "block";
        container.style.display = "none";
        backgroundVideo.play();
        body.classList.add("no-scroll");
    });

   
    unmuteButton.addEventListener("click", function () {
        if (backgroundVideo.muted) {
        backgroundVideo.muted = false;
        unmuteIcon.classList.remove("fa-volume-mute");
        unmuteIcon.classList.add("fa-volume-up");
        } else {
        backgroundVideo.muted = true;
        unmuteIcon.classList.remove("fa-volume-up");
        unmuteIcon.classList.add("fa-volume-mute");
        }
    });
  
     // Comment section functionality
     const commentInput = document.getElementById('comment-input');
     const submitComment = document.getElementById('submit-comment');
     const commentsList = document.getElementById('comments-list');
 
     submitComment.addEventListener('click', () => {
        if (commentInput.value.trim() !== '') {
            const newComment = document.createElement('li');
            newComment.classList.add('comment-item');
            newComment.textContent = commentInput.value;
    
            // Create a new span element for the timestamp
            const timestamp = document.createElement('span');
            // Get the current date and time
            const now = new Date();
            // Format the date and time as a string
            const formattedTimestamp = now.toLocaleString();
            // Set the timestamp text content
            timestamp.textContent = ' - Submitted on: ' + formattedTimestamp;
            // Append the timestamp to the comment item
            newComment.appendChild(timestamp);
    
            commentsList.appendChild(newComment);
            commentInput.value = '';
        } else {
            alert('Please write a comment before submitting.');
        }
    });
  
    const likeButton = document.getElementById('like-button');
    const likeCount = document.getElementById('like-count');
    let likeCounter = 0;

    likeButton.addEventListener('click', () => {
        likeCounter++;
        likeCount.textContent = `${likeCounter} like${likeCounter === 1 ? '' : 's'}`;
    });

    // Dropdown menu
    const imageButton = document.getElementById("imageButton");
    const dropdownMenu = document.getElementById("dropdownMenu");

    imageButton.addEventListener("click", function() {
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });

    window.addEventListener("click", function(event) {
        if (!imageButton.contains(event.target)) {
            dropdownMenu.style.display = "none";
        }
    });

    // Video navigation
    const videoWrapper = document.querySelector(".grid");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const videoSlides = document.querySelectorAll(".video-slide");
    let currentSlide = 0;

    function updateButtonVisibility() {
        // Hide prevBtn if on the first slide
        if (currentSlide === 0) {
            prevBtn.style.display = "none";
        } else {
            prevBtn.style.display = "block";
        }
    
        // Hide nextBtn if on the last slide
        if (currentSlide === videoSlides.length - 1) {
            nextBtn.style.display = "none";
        } else {
            nextBtn.style.display = "block";
        }
    }

    
    function updateSlide() {
        const colorOverlay = document.querySelector(".color-overlay");
        colorOverlay.style.opacity = 1;
    
        videoWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    
        setTimeout(() => {
            colorOverlay.style.opacity = 0;
        }, 500);

        updateButtonVisibility();
        updateMarkers();
    }

    prevBtn.addEventListener("click", () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlide();
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentSlide < videoSlides.length - 1) {
          currentSlide++;
          updateSlide();
        } else if (currentSlide === videoSlides.length - 1) {
          document.getElementById("storyboardSection").style.display = "block";
        }
      });

        // Storyboard functionality
    const submitStoryBtn = document.getElementById("submit-story");
    const storyboardInput = document.getElementById("story-input");
    const storyboardList = document.getElementById("storyboardList");

    submitStoryBtn.addEventListener("click", () => {
    if (storyboardInput.value.trim() !== "") {
        const newStory = document.createElement("li");
        newStory.textContent = storyboardInput.value;
        storyboardList.appendChild(newStory);
        storyboardInput.value = "";
    } else {
        alert("Please write your story before submitting.");
    }
    });

    function updateMarkers() {
        const markers = document.querySelectorAll(".marker");
        markers.forEach((marker) => {
            if (parseInt(marker.dataset.slide) === currentSlide) {
                marker.style.backgroundColor = "#007bff";
            } else {
                marker.style.backgroundColor = "#ccc";
            }
        });
    }
    
    const markers = document.querySelectorAll(".marker");
    markers.forEach((marker) => {
        marker.addEventListener("click", () => {
            const targetSlide = parseInt(marker.dataset.slide);
            if (targetSlide !== currentSlide) {
                currentSlide = targetSlide;
                updateSlide();
            }
        });
    });

    
    
    updateMarkers();
    
    updateButtonVisibility();
      
    const players = [];
    videoSlides.forEach((slide, index) => {
        const videoId = `video${index + 1}`;
        players.push(videojs(videoId));
    });

});
