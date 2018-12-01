


// poor man's database? kinda yea...
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








// our first abstraction, yay!
function populate_select(p_array, p_selectid) {

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
        this_option.text = this_option.value = p_array[i];
        this_select.add(this_option);
    }
}



function reset_select(p_selectid) {

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




// we only need to pre-populate problem
// the other drop downs will not be enabled until problem is selected
populate_select(
    p_array=Object.keys(dropdown), 
    p_selectid="select-problem");


// creating this functiont to map from selectid to button will help to
// make sure buttons are only enabled when they should be
function map_dropdown_to_edit_btn(p_selectid) {
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




// on change functions
function selection_changed(t) {

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






// edit list functionality (on edit list button click)
function edit_list(t) {

    var id = t.id;
    var edit_list = document.getElementById("edit-list");
    console.log("We had an edit-btn click on: ", id);


    if(id == "edit-problem") {
        var this_list = Object.keys(dropdown);
    } else if(id == "edit-failure") {
        var selected_problem = document.getElementById("select-problem").value;
        var this_list = Object.keys(dropdown[selected_problem]);
    } else if(id == "edit-cause") {
        var selected_problem = document.getElementById("select-problem").value;
        var selected_failure = document.getElementById("select-failure").value;
        var this_list = Object.keys(dropdown[selected_problem][selected_failure]);
    } else {
        var selected_problem = document.getElementById("select-problem").value;
        var selected_failure = document.getElementById("select-failure").value;
        var selected_cause = document.getElementById("select-cause").value;
        var this_list = dropdown[selected_problem][selected_failure][selected_cause];
    }

    for(i in this_list) {
        console.log(this_list[i]);

        var 

        edit_list.add(document.createElement(''))
    }

}


function create_edit_list_element()



// references:
// https://stackoverflow.com/questions/4366104/traversethroughjavascriptobjectproperties








