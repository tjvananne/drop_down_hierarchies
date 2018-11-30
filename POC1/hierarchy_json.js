

// mechanical is an object, what should it's value be?
// it's value could be an array of more objects?

// problems and failures need to be objects who's value is an array of objects
// cause is an object who's value is an array of literal strings
// actions are the literal string that goes inside of the cause objects

// once we're comfortable with this, we can go ahead and toss in another 
// problem (problem2) and then see if it is all still working out how
// I thought it would.

/*
// I hate everything about this:
dropdown = {
    "problem1": [
        {"failure1": [
            {"cause1": [
                "action1",
                "action2",
                "action3"
            ]}, // end of cause 1
            {"cause2": [
                "action1",
                "action2",
                "action3"
            ]}
        ]}, // end of failure 1
        {"failure2": [
            {"cause1": [
                "action1",
                "action2",
                "action3"
            ]},
            {"cause2": [
                "action1",
                "action2",
                "action3"
            ]}
        ]} // end of failure 2
    ],  // end of problem1
}
*/


// hmm.. I'm not convinced that this has to be an array of objects...
// I think this is much cleaner...
// these are truly nested objects I believe...
dropdown = {
    "problem1": {
        "p1failure1": {
            "p1f1cause1": [
                "p1f1c1action1", 
                "p1f1c1action2", 
                "p1f1c1action3"
            ], // end of cause 1
            "p1f1cause2": [
                "p1f1c2action1", 
                "p1f1c2action2", 
                "p1f1c2action3"
            ] // end of cause 2
        },
        "p1failure2": {
            "p1f2cause1": [
                "p1f2c1action1", 
                "p1f2c1action2", 
                "p1f2c1action3"
            ],
            "p1f2cause2": [
                "p1f2c2action1", 
                "p1f2c2action2", 
                "p1f2c2action3"
            ]
        }
    },
    "problem2": {
        "p2failure1": {
            "p2f1cause1": [
                "p2f1c1action1", 
                "p2f1c1action2", 
                "p2f1c1action3"
            ],
            "p2f1cause2": [
                "p2f1c2action1", 
                "p2f1c2action2", 
                "p2f1c2action3"
            ]
        }
    }
}

// Object.keys(dropdown);
// > (2) ["problem1", "problem2"]

// Object.keys(dropdown.problem1);
// > (2) ["failure1", "failure2"]

// traversal?
/*
var select_problem = document.getElementById("selectproblem");
for(prop in dropdown) {
    var option = document.createElement('option');
    option.text = option.value = prop;
    select_problem.add(option);
}
*/


// our first abstraction, yay!
function populate_select(p_array, p_selectid) {
    var this_select = document.getElementById(p_selectid);
    for(i in p_array) {
        var this_option = document.createElement('option');
        this_option.text = this_option.value = p_array[i];
        this_select.add(this_option);
    }
}

populate_select(
    p_array=Object.keys(dropdown), 
    p_selectid="select-problem");

populate_select(
    p_array=Object.keys(dropdown.problem1),  // how do we not hardcode this?
    p_selectid="select-failure");

populate_select(
        p_array=Object.keys(dropdown.problem1.p1failure1),  // how do we not hardcode this?
        p_selectid="select-cause");

populate_select(
        p_array=dropdown.problem1.p1failure1.p1f1cause1,  // how do we not hardcode this?
        p_selectid="select-action");


// references:
// https://stackoverflow.com/questions/4366104/traversethroughjavascriptobjectproperties








