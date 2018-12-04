


var list = document.getElementById('demo');   // 'demo' is an empty ordered list
var lastid = 0;  // tracking an incrementer to add to each entry's "id" attribute

function changeText2() {
    // text input field - getting the string value of that
    var firstname = document.getElementById('firstname').value;
    
    // 'boldStuff2' is just a <b> tag inside of a <p> that displays what was entered
    document.getElementById('boldStuff2').innerHTML = firstname;

    // creating a list item element to populate our ordered list
    // create a text node from what user entered, append that to this list item
    // finally set the 'id' attribute of this list item to 'item' + our incrementer
    var entry = document.createElement('li');
    entry.appendChild(document.createTextNode(firstname));
    entry.setAttribute('id','item'+lastid);
    
    // creating a button to remove this item
    // create a text node with string literal "remove", append that to the button element
    // set the onclick attribute to the removeName() function, and dynamically craft the
        // argument that will be passed to this function whenever it is called.
    var removeButton = document.createElement('button');
    removeButton.appendChild(document.createTextNode("remove"));
    removeButton.setAttribute('onClick','removeName("'+'item'+lastid+'")');
    entry.appendChild(removeButton);
    lastid+=1;
    list.appendChild(entry);
}


function removeName(itemid){
    var item = document.getElementById(itemid);
    list.removeChild(item);
}

// methods that were new to me in this quick demo:
// appendChild - this is ultra basic and self explanatory
// removeChild - same
// document.createTextNode() - also self explanatory


// this is a perfect, small example of what functionality I need.
// The only difference in my case is that I need to tie the list
// that I create back to the "global" `dropdown` object. For instance,
// when a user deletes an item, I don't want it just deleted from the
// list that I've populated on the page, it should also be deleted
// from the object properties.


