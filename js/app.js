const searchBtn = () => {
    const search = document.getElementById('search-text');
    const searchText = search.value;
    search.value = '';

    fetch(`http://openlibrary.org/search.json?q=${searchText}`)
        .then(res => res.json())
        .then(data => loadData(data))
}

const loadData = (data) => {
    const result = document.getElementById('result-found');
    result.textContent = '';
    const resultDiv = document.createElement('div');
    resultDiv.innerHTML = `
    <h2> ${data.num_found} Results Found</h2>
    `
    result.appendChild(resultDiv);

    const allData = data.docs;
    const books = document.getElementById('books');
    books.textContent = '';
    allData.forEach(data => {
        console.log(data)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
        <img class="w-75 mx-auto" src="https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.title}</h5>
            <h6><span>Author:</span> ${data?.author_name?.toString()}</h6>
            <h6><span>Publisher:</span> ${data?.publisher?.toString()}</h6>
            <h6><span>First Publish:</span> ${data.first_publish_year}</h6>
        </div>
        </div>

        `
        books.appendChild(div);
    })
}