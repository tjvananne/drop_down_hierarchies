



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


// we only need to pre-populate problem
// the other drop downs will not be enabled until problem is selected
populate_select(
    p_array=Object.keys(dropdown), 
    p_selectid="select-problem");



// on change functions
function selection_changed(t) {

    // capture some initial info coming from which drop down changed
    var id = t.id;
    var current_selection = document.getElementById(id);
    var new_selection = current_selection.value;

    // I want to isolate the array that will be used to update the next drop down here
    // I'm really not thrilled with "downstream_dropdowns", but not sure how else to do this?
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

        // if there's one downstream dropdowns left, then
        // populate it with new values and enable it
        if(downstream_dropdowns.length == 0) {
            populate_select(
                // double reverse! flea-flicker is next.
                p_array=next_dropdown_values.reverse(),  
                p_selectid=next_dropdown_id);
    
            next_dropdown.disabled=false;    
        }
    }
}




// references:
// https://stackoverflow.com/questions/4366104/traversethroughjavascriptobjectproperties








