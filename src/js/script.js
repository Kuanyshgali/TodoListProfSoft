const ul = document.querySelector('.container__list');
const temp = document.querySelector('#todo-template');
const span = temp.content.querySelector('span');
const form = document.getElementById('form');

function remove() {
    form.querySelectorAll('.todo-li__close').forEach(function (closeButton) {
        closeButton.addEventListener('click', () => {
            let TodoList = JSON.parse(localStorage.getItem('TodoList'));
            ul.removeChild(closeButton.parentNode);
            TodoList.arr.splice(TodoList.arr.indexOf(closeButton.parentNode.firstChild.textContent), 1);
            localStorage.setItem('TodoList', JSON.stringify(TodoList));
        })
    });
}

if (localStorage.getItem('TodoList') === null) {
    let TodoList = {
        arr: []
    };
    localStorage.setItem('TodoList', JSON.stringify(TodoList));
} else {
    let TodoList = JSON.parse(localStorage.getItem('TodoList'));
    for (let i in TodoList.arr) {
        span.textContent = TodoList.arr[i];
        let li = temp.content.cloneNode(true);
        ul.append(li);
    }
   remove();
}

function retrieveFormValue(event) {
    event.preventDefault();

    const node = form.querySelector('[class = "container__insert"]').value;
    form.querySelector('[class = "container__insert"]').value = '';

    let TodoList = JSON.parse(localStorage.getItem('TodoList'));
    TodoList.arr.push(node);
    localStorage.setItem('TodoList', JSON.stringify(TodoList));

    span.textContent = node;
    let li = temp.content.cloneNode(true);
    ul.append(li);

    remove();
}

form.querySelector("#submit").addEventListener('click', retrieveFormValue)

const textarea = document.querySelector('.container__insert');
textarea.addEventListener( 'input', autosize );
function autosize(){
    this.style.height = this.scrollHeight - 0 + "px";
}

const sub = document.querySelector('.container__sub');
sub.addEventListener( 'click', autosizeBack );
function autosizeBack(){
    textarea.style.height = 'auto';
}