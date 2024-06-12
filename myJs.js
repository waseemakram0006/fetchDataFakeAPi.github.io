document.addEventListener("DOMContentLoaded", function () {
    const btn = document.querySelector('.fetch-data');
    const loading = document.querySelector('.loading');
    let pera = document.querySelector('.no-data');
    const dispData = document.querySelector('.stories'); 


    btn.addEventListener('click', () => {
        loading.style.display = "block";
        fetchData();
    });

    function fetchData() {
        const apiURL = 'https://hn.algolia.com/api/v1/search?';

        fetch(apiURL)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network Response was not Ok!");
                }
                return response.json();
            })
            .then(data => {
                displayData(data.hits);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    function displayData(stories) {
        dispData.innerHTML = "";
        loading.style.display = "none";
        pera.style.display = "none";
        btn.style.display = "none";
        dispData.style.display = "block";

        stories.forEach(story => {
            const item = document.createElement('div'); 
            item.classList.add('item'); 

            const title = document.createElement('h2');
            title.textContent =`Title: ${story.title}`;
            item.appendChild(title);

            const points = document.createElement('p');
            points.textContent = `Points: ${story.points}`;
            item.appendChild(points);

            const author = document.createElement('p');
            author.textContent = `Author: ${story.author}`;
            item.appendChild(author);

            dispData.appendChild(item); 
        });
    }
});
