// ----spiner function ---- 
const spiner = (control) => {
    const spiner = document.getElementById('spiner');
    spiner.style.display = control;
}

// ----- all clear fuction ------ 
const allClear = () => {
    const result = document.getElementById('result-found');
    result.textContent = '';
    const books = document.getElementById('books');
    books.textContent = '';
}
spiner('none');

// ----- main part search btn ----- 
const searchBtn = () => {
    allClear();
    spiner('block');
    const search = document.getElementById('search-text');
    const searchText = search.value;
    search.value = '';

    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
        .then(res => res.json())
        .then(data => loadData(data))
        .catch(err => console.log(err))
}

const loadData = (data) => {
    const result = document.getElementById('result-found');
    result.textContent = '';
    const resultDiv = document.createElement('div');
    // ------ condition of book that dose't exist ----- 
    if (data.num_found === 0) {
        spiner('none');
        alert('please type a valid name')
        resultDiv.innerHTML = `
        <h2>No Results Found</h2>
        `
    }
    else {
        // ------ set result if found -----
        resultDiv.innerHTML = `
        <h2> ${data.num_found} Results Found</h2>
        `
    }
    result.appendChild(resultDiv);


    // ------ set book list ------ 
    const allData = data.docs;
    const books = document.getElementById('books');
    books.textContent = '';
    allData.forEach(data => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
        <img class="w-75 mx-auto" src="https://covers.openlibrary.org/b/id/${data.cover_i ? data.cover_i : 10909258}-M.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h3 class="card-title">${data.title}</h3>
            <h6><span>Author:</span> ${data.author_name ? data.author_name : 'Not Found Author'}</h6>
            <h6><span>Publisher:</span> ${data.publisher ? data.publisher : 'Not Found Publisher'}</h6>
            <h6><span>First Publish:</span> ${data.first_publish_year ? data.first_publish_year : 'Not Found Date'}</h6>
        </div>
        </div>
        `
        books.appendChild(div);
        spiner('none');
    })
}