$(document).ready(() =>{
    // Select the buttons to add a todo in first list and to add a new card
    let addNewCardBtn = $('.add-card-btn');
    let addTodoFirstBtn = $('.add-todo-btn-1');

    // Set Listener
    addNewCardBtn.on('click', () => {
        addNewCard();
    });

    // Verify enter press after the list name is written
    $('.input-list-name-1').on('keypress', (event) =>{
        if(event.which == 13){
            $('.input-list-name-1').prop('disabled', true);
        }
    });

    // Set listener to add todo in first card
    addTodoFirstBtn.click(() =>{
        let todoIndex = $('.todo-list-1').children().length + 1;

        addNewTodo(1, todoIndex);
    });
});

// Function to add a new todos card
function addNewCard(){
    // Get number of cards in the page
    let index = $('.row').children().length + 1;

    // Create new card (Never write innerHTML, XSS is near to us, Fortunatly this code isn't online)
    let newCard = '<article class="col-12 col-sm-12 col-md-3 col-lg-3 px-1 mb-2">' +
                        '<div class="card card-' + index + '">' +
                            '<h5 class="card-header">' + 
                                '<div class="container-header-input container-header-input-' + index + ' input-group form-group">' +
                                    '<input type="text" class="form-control input-list-name input-list-name-' + index + '" placeholder="Nome lista" id="list-name" name="list-name">' +
                                '</div>' + 
                            '</h5>' + 
                            '<div class="card-body">' + 
                                '<div class="todo-list-container mb-3">' + 
                                    '<ul class="todo-list todo-list-' + index + '">' +
                                    '</ul>' +
                                '</div>' + 
                                '<div class="container-todo-input container-todo-input-' + index + ' input-group form-group">' + 
                                    '<input type="text" class="form-control input-todo todo-input-' +  index + '" placeholder="Todo..." id="todo" name="todo">' +
                                '</div>' +
                                '<button type="button" class="btn btn-primary add-todo-btn add-todo-btn-' + index + '">+ Aggiungi nuovo TODO</button>' + 
                            '</div>' + 
                        '</div>' +
                    '</article>';

    // Remove add card button
    let oldNewCardButton = $('.add-card-btn-section').remove();

    // Select row that contains the todos cards
    let cardRow = $('.row');

    // Append new card and re-insert the button to add new cards
    cardRow.append(newCard);
    cardRow.append(oldNewCardButton);

    // Set listener on add card button
    $('.add-card-btn').on('click', () => {
        let cardNumber = $('.row').children().length - 1;

        addNewCard(parseInt(cardNumber));
    });

    // Set listener on header card title input on enter press to save the card title
    $('.input-list-name-' + index).on('keypress', (event) =>{
            if(event.which == 13){
                $('.input-list-name-' + index).prop('disabled', true);

                $('.input-list-name-' + index).css({
                    "border": "none !important"
                });
            }
    });

    // Set listener for todo button
    $('.add-todo-btn-' + index).click(() =>{
        let todoIndex = $('.todo-list-' + index).children().length + 1;

        console.log(todoIndex);

        addNewTodo(index, todoIndex);
    });
}

// Function to add new todos in every list
function addNewTodo(index, indexTodo){
    // Select the specific todos list by index and get todo text from input (Cut start and ending whitespace)
    let todoList = $('.todo-list-' + index);
    let todoText = $('.todo-input-' + index).val().trim();

    // Create new Todo item (Attention, XSS vulnerability is over the thousand %)
    let newTodo = '<li class="todo todo-' + (+index) + "-" + (+indexTodo) + '">' +
                        '<div class="card card-todo card-todo-' + (+index) + "-" + (+indexTodo) +  '">' + 
                            '<div class="card-body card-body-todo card-text card-body-todo-' + (+index) + "-" + (+indexTodo) + '">' +
                                '<i class="fa fa-check-circle checked"' + ' id="checked-' + (+index) + "-" + (+indexTodo) + '" aria-hidden="true"></i>' +
                                '<i class="fa fa-circle-o unchecked"' + ' id="unchecked-' + (+index) + "-" + (+indexTodo) + '" aria-hidden="true"></i>' +                                 
                                '<span id="todo-text-' + (+index) + "-" + (+indexTodo) + '">' + todoText + '</span>' + 
                            '</div>' +
                        '</div>' +
                  '</li>';

    // Append new todo to the unordered list in the page
    todoList.append(newTodo);

    // Set a little bit of CSS to todo card
    $('.card-body-todo-' + (+index) + "-" + (+indexTodo)).css({
        "background-color": "#fff",
        "font-size": "1.5rem !important",
    });

    // Generate string index for a specific todo with notation x-x
    let indexNew = ((+index) + "-" + (+indexTodo)).toString();

    // Set listener on check todo, if todo is checked, the todo item text will have a yellow color
    // and check box will be checked and will have the same color of the text
    $('#unchecked-' + indexNew).click(() =>{
        $('#unchecked-' + (+index) + "-" + (+indexTodo)).css({
            "display": "none"
        });

        $('#todo-text-' + (+index) + "-" + (+indexTodo)).css({
            "color": "#e5be01",
        });

        $('#checked-' + (+index) + "-" + (+indexTodo)).css({
            "display": "inline-block"
        });
    });

    // Set listener if todo item checked is clicked.
    // The text will have a black color and the checkbox too.
    $('#checked-' + indexNew).click(() =>{
        $('#checked-' + (+index) + "-" + (+indexTodo)).css({
            "display": "none"
        });

        $('#todo-text-' + (+index) + "-" + (+indexTodo)).css({
            "color": "#000",
        });

        $('#unchecked-' + (+index) + "-" + (+indexTodo)).css({
            "display": "inline-block"
        });
    });
}