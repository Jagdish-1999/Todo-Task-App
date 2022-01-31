let array = [];
// let array = localStorage.getItem('array') || [];
// getting elements from html mytodo.html file
const left_section = document.querySelector(".left-section");
const taks_list = document.getElementById("task-list");
const addButton = document.getElementById('add-button');
const inputField = document.getElementById('input-field')



// idof is setting different id count for tasks
var idof = 0;

//  function for show data on reload page 
function createLiItems(dataArray) {
    if (!dataArray) {
        return;
    }
    dataArray.forEach((val) => {
        const task_item = document.createElement('li');

        // creating item for a new task dynamically
        const done_button = document.createElement('button');
        const delete_button = document.createElement('button');
        const button_div = document.createElement('div');

        // setting id and inner text for li items  --- i.e. new is new task
        task_item.id = val.id;
        task_item.className = 'my-task';
        task_item.innerText = val.text;

        //  setting class name for done and delete button
        button_div.className = "button-div";
        done_button.className = 'done';
        delete_button.className = 'delete';

        // setting inner text of done and delete button
        done_button.innerText = 'done'
        delete_button.innerText = 'delete'

        // append created items at their  posotion 
        button_div.append(done_button);
        button_div.append(delete_button);
        task_item.append(button_div);
        taks_list.append(task_item);

        // append new item after render saved item in memory
        const getFromLocalStorage = localStorage.getItem('array');
        array = [...JSON.parse(getFromLocalStorage)];

        // adding functionality for done button  --->  to line through of text of li items
        task_item.addEventListener("click", (e) => {
            if (e.target == done_button) {
                console.log(e.target);
                task_item.style.cssText = "text-decoration:line-through;font-style:italic;color:cyan;";
            } else if (e.target == delete_button) {
                removeData(task_item.id);
                console.log(e.target.parentNode.parentNode.id);

                array.forEach((dataId, idx) => {
                    if (dataId.id == e.target.parentNode.parentNode.id) {
                        array.splice(idx, 1);
                        console.log('dataId', dataId);
                        console.log('idx', idx);
                        localStorage.setItem("array", JSON.stringify(array)); // ---------------------------------------------------
                    }
                })

                // localStorage.setItem("array", JSON.stringify(array.filter((todoItem) => todoItem.id !== task_item.id)));

                taks_list.removeChild(task_item);
                forId = task_item.id;
            }
        });
    });
};
console.log(array)
createLiItems(JSON.parse(localStorage.getItem("array")));
console.log('after ', array);

//creating  function for new task to add show data on browser
function createListItem() {
    const task_item = document.createElement('li');
    // creating elements for a new task
    const done_button = document.createElement('button');
    const delete_button = document.createElement('button');
    const button_div = document.createElement('div');
    idof = localStorage.getItem('idof') || 0;
    // setting id and inner text for li items  --- i.e. new is new task
    task_item.id = 'task' + idof;
    idof++;
    task_item.className = 'my-task';
    task_item.innerText = inputField.value;

    //  setting class name for done and delete button
    button_div.className = "button-div";
    done_button.className = 'done';
    delete_button.className = 'delete';

    // setting inner text of done and delete button
    done_button.innerText = 'done'
    delete_button.innerText = 'delete'

    // append created items at their  posotion 
    button_div.append(done_button);
    button_div.append(delete_button);
    task_item.append(button_div);
    taks_list.append(task_item);

    // adding functionality for done button  --->  to line through of text of li items
    task_item.addEventListener("click", (e) => {
        if (e.target == done_button) {
            console.log(e.target);
            task_item.style.cssText = "text-decoration:line-through;font-style:italic;";
        } else if (e.target == delete_button) {
            removeData(task_item.id);
            console.log(e.target);

            array.forEach((dataId, idx) => {
                if (dataId.id == e.target.parentNode.parentNode.id) {
                    array.splice(idx, 1);
                    console.log('dataId', dataId);
                    console.log('idx', idx);
                    localStorage.setItem("array", JSON.stringify(array)); // ---------------------------------------------------
                }
            })

            taks_list.removeChild(task_item);
            forId = task_item.id;


        }
    });
    return task_item;
}

//local storage function for various task
function setData(key, value) {
    localStorage.setItem(key, value);
}

function getData(key) {
    localStorage.getItem(key);
}

function removeData(key) {
    localStorage.removeItem(key);
}

// adding to add task button
addButton.addEventListener('click', () => {
    if (inputField.value) {
        const item = createListItem();
        // slice is used to delete the text of done button and delete button
        const textData = [...item.textContent].slice(0, -10);
        // object for containing id and text data of tasks
        const obj = {
                id: item.id,
                text: textData.join(""),
            }
            // storing id in array to show data on page reload
        array.push(obj);
        localStorage.setItem("array", JSON.stringify(array));
        localStorage.setItem("idof", idof);
    }
});