let searchInput = document.getElementById('search-input');
let searchButton = document.getElementById('search-button');
let searchResults = document.getElementById('search-results');

searchInput.addEventListener('keydown', (key) => {
    if (key.key === "Enter")
        searchButton.click();
})

searchButton.addEventListener('click', () => {
    let query = searchInput.value;
    if (query) {
        let url = `https://api.github.com/search/repositories?q=${query}&per_page=15`;
        fetch(url).then(response => response.json()).then(data => {
                if (data.items.length < 1) {
                    let nothing = document.createElement('h2');
                    nothing.innerText = 'Ничего не найдено';
                    searchResults.append(nothing);
                }
                else {
                    searchResults.innerHTML = '';
                    data.items.forEach(item => {
                        let links = document.createElement('div');
                        links.classList.add('links');
                        searchResults.append(links);
                        let repositoryLink = document.createElement('a');
                        repositoryLink.style.color = 'white';
                        repositoryLink.href = item.git_url;
                        repositoryLink.target = '_blank';
                        repositoryLink.textContent = item.full_name;
                        let info = document.createElement('p');
                        info.style.color = 'white';
                        let createDate = strEdit(item.created_at);
                        let pushDate = strEdit(item.pushed_at);
                        info.innerHTML = 'Owner: ' + '<a href="' + item.owner.html_url +
                            '" target="_blank" style="color: ' + "white" + '">' + item.owner.login + '</a>' + ', Created: '
                            + createDate + ', ' + "Last update: " + pushDate;
                        links.append(repositoryLink);
                        links.append(info);
                    });
                }
            })
            .catch(error => console.error(error));
    }
});

function strEdit(str) {
    str = str.replace('T', ', ');
    str = str.replace('Z', '');
    return str;
}
