const Customer = require("../models/customer");


const input = document.querySelector('#search-customer');
const suggestions = document.querySelector('.suggestions ul');



input.addEventListener('keyup', async function searchHandler(e) {
    const inputEntered = input.value.toLowerCase();
    const customerList = (await Customer.all()).map(c => c.concatName());
    const results = search(inputEntered, customerList);
    showSuggestions(results, inputEntered);
});


async function search(str, customerList) {
    let results = [];
    results = customerList.filter((keyword) => keyword.toLowerCase().includes(str));
    return results;
}



function showSuggestions(results) {
    const ulElement = document.querySelector('.suggestions ul');
    ulElement.innerHTML = '';  // Clear existing suggestions
    results.forEach((result) => {
        const liElement = document.createElement('li');
        ulElement.appendChild(liElement);
        liElement.textContent = result;
        ulElement.className = 'has-suggestions';

        liElement.addEventListener('click', function() {
            input.value = result;
            ulElement.innerHTML = '';
        });
    });
}

