const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const searchContainer = document.querySelector(".search-container");
const searchInputBox = document.getElementById("search-input-box");

function AddTask()
{
    /*if input box is empty when attempting to add task*/
    if(inputBox.value === '')
    {
        alert("You must write something!"); /*puts like a browser pop-up*/
    }
    else
    {
        /*storing the HTML li element in the list variable*/
        let li = document.createElement("li");
        
        /*list.innerHTML is the text inside the li*/
        /*adds the text that was in the input box to the li*/
        li.innerHTML = inputBox.value;
        
        /*the li will then be displayed in the unordered list 'list container'*/
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; /*adds the cross icon in the span tag*/
        li.appendChild(span);
        
        /*clear the input box*/
        inputBox.value = "";
        SaveData();
    }
}

/*add event to list container waiting for a click*/
listContainer.addEventListener("click", function(event)
{
    /*if user clicked on a li, toggle checked class*/
    if(event.target.tagName === "LI")
    {
        event.target.classList.toggle("checked");
    }
    /*if user clicked on a span, it will delete the list element it's attached to*/
    else if(event.target.tagName === "SPAN")
    {
            event.target.parentElement.remove();
    }
    
    SaveData();
    
}, false);

inputBox.addEventListener('keydown', function(event)
{
    const key= event.code;
    if (key === 'Enter')
    {
        AddTask();
    }
});

function Search()
{
    const searchText = searchInputBox.value.toLowerCase();
    if(searchText.value === '')
    {
        listContainer.querySelectorAll("li").forEach(li =>
        {
            li.classList.add("hidden");
        });
        return;
    }

    listContainer.querySelectorAll("li").forEach(li =>
    {
        if (li.textContent.toLowerCase().includes(searchText))
        {
            li.classList.remove("hidden");
        }
        else
        {
            li.classList.add("hidden");
        }
    });
}

searchInputBox.addEventListener('input', function(event)
{
    Search();
});


/*save data*/

function SaveData()
{
    /*whatever data is stored in the list container will be stored as 'data'*/
    localStorage.setItem("data",listContainer.innerHTML);
}

function LoadData()
{
    listContainer.innerHTML = localStorage.getItem("data");
}

LoadData();