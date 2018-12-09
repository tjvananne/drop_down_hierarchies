


/* Notes to self

So I've learned that managing state of the DOM is very challenging. In fact,
this is what I read is the main benefit of using front end libraries/frameworks
such as React. I didn't really understand what that pain point was ("managing
state of the DOM") until this project. Now I get it.

I think I could have more cleanly built this app by providing some global
variables to maintain the state of what has been selected so far or not.
Global variables (or at least at the document-level, is that global?) that 
would indicate "ok, the first two dropdowns have selections in them 
currently, so anything the user interacts with should know that."

I'm currently not happy that the edit-list area is alphabetically sorted, but
the select element drop downs are not. I wonder how difficult it would be to
sort the select element drop downs? I have all of POC3 built though and don't
want to let that slow me down so I'll come back to that later.

*/


// poor man's database? kinda yea...
// should properties at the action level be 
// empty quotes ("") or empty object ({})? does it matter?
dropdown = {
    "problem1": {
        "p1failure1": {
            "p1f1cause1": { 
                "p1f1c1action1": "", 
                "p1f1c1action2": "", 
                "p1f1c1action3": ""
            }, // end of cause 1
            "p1f1cause2": {
                "p1f1c2action1": "", 
                "p1f1c2action2": "", 
                "p1f1c2action3": ""
            } // end of cause 2
        },
        "p1failure2": {
            "p1f2cause1": {
                "p1f2c1action1": "", 
                "p1f2c1action2": "", 
                "p1f2c1action3": ""
            },
            "p1f2cause2": {
                "p1f2c2action1": "", 
                "p1f2c2action2": "", 
                "p1f2c2action3": ""
            }
        }
    },
    "problem2": {
        "p2failure1": {
            "p2f1cause1": { 
                "p2f1c1action1": "", 
                "p2f1c1action2": "", 
                "p2f1c1action3": ""
            },
            "p2f1cause2": {
                "p2f1c2action1": "", 
                "p2f1c2action2": "", 
                "p2f1c2action3": ""
            }
        }
    }
}

// given an array and the id of the select element, fill that element with the array
function populate_select(p_array, p_selectid) {

    // takes in a parameter and the id of a select element
    // resets the select element to default 
    // then populates it with option elements containing the array contents

    // reset to default
    var this_select = document.getElementById(p_selectid);
    var default_option = document.createElement('option');
    default_option.selected = true;
    default_option.value = "";
    default_option.innerHTML = "---Select---";
    default_option.hidden = true;
    this_select.add(default_option);

    // take the array passed in and make these the new options
    for(i in p_array) {
        var this_option = document.createElement('option');
        this_option.text = p_array[i];
        // this_option.text = this_option.value = p_array[i]; not sure why I was updating text and value?
        this_select.add(this_option);
    }
}

// reset a select element to it's default and remove all of it's options
function reset_select(p_selectid) {

    // takes in the id of a select element
    // clears all of the option elements inside the select element
    // resets it to the default selection value
    // disables the select and the button associated with this select element

    // reset to default - repetition here, need to break this 
    // out into another function?
    var this_select = document.getElementById(p_selectid);
    var default_option = document.createElement('option');
    default_option.selected = true;
    default_option.value = "";
    default_option.innerHTML = "---Select---";
    default_option.hidden = true;
    this_select.add(default_option);

    // disable this selection once again to complete the reset
    this_select.disabled = true;
    this_edit_btn = document.getElementById(map_dropdown_to_edit_btn(p_selectid));
    this_edit_btn.disabled = true;
}

function map_dropdown_to_edit_btn(p_selectid) {

    // takes in the id of a select element. then maps that id
    // to an id of the corresponding edit button element id

    // this is to make sure buttons are only enabled 
    // when they should be

    if(p_selectid == "select-problem") {
        btn_id = "edit-problem";
    } else if(p_selectid == "select-failure") {
        btn_id = "edit-failure";
    } else if(p_selectid == "select-cause") {
        btn_id = "edit-cause";
    } else if(p_selectid == "select-action") {
        btn_id = "edit-action";
    }

    // this already feels pretty "hacky", but would it have been better
    // or worse to just use string replacement to remove "select" and
    // add in "edit" to the string then return that as the btn id?

    return(btn_id);
}

function selection_changed(t) {

    // takes in the object that called this (the selection element itself).
    // it maps the id of the selection element that called it to downstream
    // select elements.
    // then it resets and disables any of those downstream select elements.

    // capture some initial info coming from which drop down changed
    var id = t.id;
    var current_selection = document.getElementById(id);
    var new_selection = current_selection.value;

    // I want to isolate the array that will be used to update the next drop down here
    // I'm really not thrilled with "downstream_dropdowns", but not sure how else to do this?

    // I think this if statement here could be a function itself... I have to do something
    // very similar on the button click response
    if(id == "select-problem") {
        var downstream_dropdowns = ["select-failure", "select-cause", "select-action"];
        var next_dropdown_values = Object.keys(dropdown[new_selection])
    } else if(id == "select-failure") {
        var downstream_dropdowns = ["select-cause", "select-action"];
        var selected_problem = document.getElementById("select-problem").value;
        var next_dropdown_values = Object.keys(dropdown[selected_problem][new_selection]);
    } else if(id == "select-cause") {
        var downstream_dropdowns = ["select-action"];
        var selected_problem = document.getElementById("select-problem").value;
        var selected_failure = document.getElementById("select-failure").value;
        var next_dropdown_values = Object.keys(dropdown[selected_problem][selected_failure][new_selection]);
    } else {
        var downstream_dropdowns = [];
        var selected_problem = document.getElementById("select-problem").value;
        var selected_failure = document.getElementById("select-failure").value;
        var selected_cause = document.getElementById("select-cause").value;
        var next_dropdown_values = dropdown[selected_problem][selected_failure][selected_cause];
    }

    // reverse so we can pop items off the array in a while loop
    if(downstream_dropdowns.length > 0) {
        next_dropdown_values.reverse();
    }
    
    while(downstream_dropdowns.length > 0) {

        var next_dropdown_id = downstream_dropdowns.pop();
        var next_dropdown = document.getElementById(next_dropdown_id); 
        next_dropdown.options.length = 1;

        //console.log(next_dropdown_id);

        // if there's one downstream dropdowns left, then
        // populate it with new values and enable it
        if(downstream_dropdowns.length == 0) {
            populate_select(
                // double reverse! flea-flicker is next.
                p_array=next_dropdown_values.reverse(),  
                p_selectid=next_dropdown_id);
                
            // make this one active because it's the "next" dropdown
            console.log("activating drop down and button for: ", next_dropdown_id);
            next_dropdown.disabled = false;    
            next_edit_btn = document.getElementById(map_dropdown_to_edit_btn(next_dropdown_id));
            next_edit_btn.disabled = false;
        } else {
            reset_select(p_selectid=next_dropdown_id);
        }
    }
}

// hierarchy level is "id" in this function
function populate_edit_list(t) {

    // edit list functionality (on edit list button click)
    //debugger;
    var id = t.id;
    var edit_list = document.getElementById("edit-list");

    // https://stackoverflow.com/questions/10750137/remove-all-li-from-ul
    var edit_list_items = edit_list.getElementsByTagName('li');
    var edit_list_lng = edit_list_items.length;
    console.log(edit_list_items.length);

    // this loop is for clearing out anything that might exist in the list
    if(edit_list_items.length > 0) {
        for(var i=0; i < edit_list_lng; i++) {
            
            // interesting, don't want to put 'i' in the index here
            console.log("removing: ", edit_list_items[0]);
            edit_list.removeChild(edit_list_items[0]);
        }    
    } else {
        console.log("length of edit list is zero, moving on");
    }

    // determine which button was clicked in the hierarchy
    if(id == "edit-problem") {
        var this_list = Object.keys(dropdown);
        var helper_edit_msg = "Editing top-level problems:";
    } else if(id == "edit-failure") {
        var selected_problem = document.getElementById("select-problem").value;
        var this_list = Object.keys(dropdown[selected_problem]);
        var helper_edit_msg = "Editing failures associated with " + selected_problem + " problem:";
    } else if(id == "edit-cause") {
        var selected_problem = document.getElementById("select-problem").value;
        var selected_failure = document.getElementById("select-failure").value;
        var this_list = Object.keys(dropdown[selected_problem][selected_failure]);
        var helper_edit_msg = "Editing causes associated with " + selected_problem + 
            " problem and " + selected_failure + " failure:";
    } else {
        var selected_problem = document.getElementById("select-problem").value;
        var selected_failure = document.getElementById("select-failure").value;
        var selected_cause = document.getElementById("select-cause").value;
        var this_list = Object.keys(dropdown[selected_problem][selected_failure][selected_cause]);
        var helper_edit_msg = "Editing actions associated with " + selected_problem +
            " problem and " + selected_failure + " failure and " + selected_cause + " cause:";
    }

    // make sure the array is sorted:
    this_list.sort();

    // isolate and populate the h3 message to indicate to the user what theyre editing
    var helper_header = document.getElementById('helper_msg');
    helper_header.innerHTML = helper_edit_msg;
 
    
    // isolate the list that will hold the editing stuff
    var edit_list = document.getElementById('edit-list'); 

   
    for(i in this_list) {

        // create the list item
        var list_item = document.createElement('li');
        var this_code = document.createTextNode(this_list[i]);
        list_item.appendChild(this_code);
        list_item.setAttribute('id', 'list_item' + i);
        list_item.setAttribute('close_code', this_list[i]); 

        
        var btn_remove = document.createElement('button');
        btn_remove.appendChild(document.createTextNode("remove"));
        btn_remove.setAttribute('id', this_list[i]);
        btn_remove.setAttribute('hierarchy_level', id);
        
        btn_remove.setAttribute('onClick', 'remove_item(this, ' + "list_item" + i + ')');
        list_item.appendChild(btn_remove);

        // at this point, the button has the dropdown object property saved as
        // it's "id" attribute and the hierarchy level to search for that 
        // property in as the "hierarchy_level" attribute

        edit_list.appendChild(list_item);
    }

    // finally, set the "hierarchy_level" attribute of the "Add" button
    // so that it knows which level of the hierarchy to add to.
    var btn_add = document.getElementById('add-item');
    btn_add.setAttribute('hierarchy_level', id);

}

// hierarchy level is "level" in this function... need to conform this
function remove_item(t, list_item_id) {

    
    var level = t.getAttribute('hierarchy_level');         // javascript object hierarchy level
    var object_item_id = t.getAttribute('id');             // specific javascript object property name
    var edit_list = document.getElementById('edit-list');  // edit list ordered list element

    if(level == 'edit-problem') {

        // delete the property from the `dropdown` javascript object
        delete dropdown[object_item_id];     

        // removed from the visible edit list
        edit_list.removeChild(list_item_id); 

        // identify the drop down select element
        var this_selection = document.getElementById('select-problem');

    } else if(level == 'edit-failure') {

        delete dropdown[object_item_id];     
        edit_list.removeChild(list_item_id); 
        var this_selection = document.getElementById('select-failure');

    } else if(level == 'edit-cause') {

        delete dropdown[object_item_id];     
        edit_list.removeChild(list_item_id); 
        var this_selection = document.getElementById('select-cause');

    } else if(level == 'edit-action') {

        delete dropdown[object_item_id];     
        edit_list.removeChild(list_item_id); 
        var this_selection = document.getElementById('select-action');

    } else {
        // something went wrong? error handling?
    }

    // loop through the select element and remove the option that corresponds
    for(i=0; i<this_selection.length; i++) {
        if (this_selection.options[i].value==object_item_id) {
            this_selection.remove(i);
        }
    }
}

function it_already_exists(p_string, p_array) {
    //debugger;
    // catch issues of empty arrays
    if(p_array.length < 1) {
        return(false);
    }

    for(i=0; i < p_array.length; i++) {
        // check if it already exists in the string
        // character case is not enough to differentiate
        if(p_string.toLowerCase() == p_array[i].toLowerCase()) {
            return(true);
        }
    }

    // if we made it this far, then the item is ok to be added
    return(false);
}


function enter_new_item(t) {

    //debugger;
    // When one of the "edit" buttons is clicked, I'd like to assign (or re-assign)
    // the "hierarchy_level" attribute of the submit button itself to whichever
    // hierarchy was selected (which edit button).
    // this is similar to how my "remove_item" functionality is working.

    // need to think about:
    // 1) add item to selection dropdown for this hierarchy
    // 2) add item to the edit-list ordered list
    // 3) add item to the javascript object

    var new_item = document.getElementById('new-item');
    var level = t.getAttribute('hierarchy_level');

    // debugging
    console.log(level);
    console.log(new_item.value);


    // in case we get to something is already in the list
    var already_exists_msg = "this item already exists in this list";
    var ok_to_add_new = false; // default this to false, update to true

    // so I've done #3 to all of these, now I need to go back and do #1 and #2
    if(level == 'edit-problem') {
        var existing_list = Object.keys(dropdown);
        if(it_already_exists(new_item.value, existing_list)) {
            console.log(already_exists_msg);
        } else {
            ok_to_add_new = true;  // now it is ok to add item to select dropdown
            // add this item to the object
            dropdown[new_item.value] = {};

            // identify which selection dropdown we'll need to change
            var selection_to_change = document.getElementById('select-problem');
        }
    } else if(level == 'edit-failure') {
        var selected_problem = document.getElementById('select-problem').value;
        var existing_list = Object.keys(dropdown[selected_problem]);
        if(it_already_exists(new_item.value, existing_list)) {
            console.log(already_exists_msg);
        } else {
            ok_to_add_new = true;
            // add this failure to this problem in the object
            console.log("adding new failure...");
            dropdown[selected_problem][new_item.value] = {};
            var selection_to_change = document.getElementById('select-failure');
        }
    } else if(level == 'edit-cause') {
        var selected_problem = document.getElementById('select-problem').value;
        var selected_failure = document.getElementById('select-failure').value;
        var existing_list = Object.keys(dropdown[selected_problem][selected_failure]);
        if(it_already_exists(new_item.value, existing_list)) {
            console.log(already_exists_msg);
        } else {
            ok_to_add_new = true;
            // add this cause to this problem/failure combination
            console.log("adding new cause");
            dropdown[selected_problem][selected_failure][new_item.value] = {};
            var selection_to_change = document.getElementById('select-cause');
        }
    } else if(level == 'edit-action') {
        var selected_problem = document.getElementById('select-problem').value;
        var selected_failure = document.getElementById('select-failure').value;
        var selected_cause = document.getElementById('select-cause').value;
        var existing_list = Object.keys(dropdown[selected_problem][selected_failure][selected_cause]);
        if(it_already_exists(new_item.value, existing_list)) {
            console.log(already_exists_msg);
        } else {
            ok_to_add_new = true;
            // add this action to this problem/failure/cause combination
            console.log("adding new action");
            dropdown[selected_problem][selected_failure][selected_cause][new_item.value] = {};
            var selection_to_change = document.getElementById('select-action');
        }
    }

    // 1) EDIT THE SELECTION ELEMENT FOR THIS LEVEL
    // ok_to_add_new is a state variable that is default set to false, but then
    // updated to true if this new item the user is wanting to add doesn't exist
    // already in the drop down object
    if(ok_to_add_new) {
        var new_option = document.createElement('option');
        new_option.text = new_item.value;
        selection_to_change.add(new_option);

        // my populate_edit_list(t) function expects the edit button
        // that corresponds to the hierarchy level. We'll identify that
        // button here and pass it in to that function to populate
        // the edit-list area. I'm aware this is hacky but I don't really
        // have the maturity yet to know how to fix it.
        var this_edit_btn = document.getElementById(level);
        populate_edit_list(this_edit_btn);

        // ok, querySelector would have been nice to know ~7 hours ago..
        var new_item_textbox = document.querySelector('#new-item');
        new_item_textbox.value = "";

    }
}





// also want to create a "now editing <hierarchy> in <specific higher-level properties>"


// procedural portion of the code begins here -------------------------------------------------

// this makes sure the very first select element is populated with
// our highest level of the hierarchy (problem)
// the other drop downs will not be enabled until problem is selected
populate_select(
    p_array=Object.keys(dropdown), 
    p_selectid="select-problem");




// references:
// https://stackoverflow.com/questions/4366104/traversethroughjavascriptobjectproperties


