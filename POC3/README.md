

# POC #3

We have the JSON object (poor man's client-side database) hooked up to the drop downs.

We added logic and listeners to the drop downs so user selections handle filtering the proper way (how it will look for end users).

Now we need to set up the functionality to actually add/remove items at each level.

I made the buttons obnoxiously literal for now. I'll work out the design details later (or not).


success criteria:

* user clicks on `edit list` button. this populates all of the items that are currently in that list. There is a "remove" button next to each item in the list. Before this list, there is also an "add new" button to be able to edit the global `dropdown` object as well. After running the `add new` functionality, we should rebuild the list so the user can see the new thing they just added.





## references:

* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
* [this js fiddle is really close to what I need for editing the list](http://jsfiddle.net/Gmyag/127/)
* [this is a very robust version of what I might need](http://archive.oreilly.com/oreillyschool/courses/javascript2/DeletingTodoListItems.html)


## Learnings:

* I'm still getting used to the fact that most things have side-effects. when I call reverse or sort on an array, I don't have to "store" that into another variable to use. It is changed "in-place" which is something I'm not as used to. It is convenient once you're used to it though.
