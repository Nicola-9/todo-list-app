$(document).ready(() =>{
    let addNewCardBtn = $('.add-card-btn');
    let addTodoFirstBtn = $('.add-todo-btn-1');

    addNewCardBtn.on('click', () => {
        addNewCard();
    });

    $('.input-list-name-1').on('keypress', (event) =>{
        if(event.which == 13){
            $('.input-list-name-1').prop('disabled', true);
        }
    });

    addTodoFirstBtn.click(() =>{
        let todoIndex = $('.todo-list-1').children().length + 1;

        console.log(todoIndex);

        addNewTodo(1, todoIndex);
    });
});

function addNewCard(){
    let index = $('.row').children().length + 1;

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

    let oldNewCardButton = $('.add-card-btn-section').remove();

    let cardRow = $('.row');

    cardRow.append(newCard);
    cardRow.append(oldNewCardButton);

    $('.add-card-btn').on('click', () => {
        let cardNumber = $('.row').children().length - 1;

        console.log(cardNumber);

        addNewCard(parseInt(cardNumber));
    });

    $('.input-list-name-' + index).on('keypress', (event) =>{
            if(event.which == 13){
                $('.input-list-name-' + index).prop('disabled', true);

                $('.input-list-name-' + index).css({
                    "border": "none !important"
                });
            }
    });

    $('.add-todo-btn-' + index).click(() =>{
        let todoIndex = $('.todo-list-' + index).children().length + 1;

        console.log(todoIndex);

        addNewTodo(index, todoIndex);
    });
}

function addNewTodo(index, indexTodo){
    let todoList = $('.todo-list-' + index);
    let todoText = $('.todo-input-' + index).val().trim();

    let newTodo = '<li class="todo todo-' + (+index) + "-" + (+indexTodo) + '">' +
                        '<div class="card card-todo card-todo-' + (+index) + "-" + (+indexTodo) +  '">' + 
                            '<div class="card-body card-body-todo card-text card-body-todo-' + (+index) + "-" + (+indexTodo) + '">' +
                                '<i class="fa fa-check-circle checked"' + ' id="checked-' + (+index) + "-" + (+indexTodo) + '" aria-hidden="true"></i>' +
                                '<i class="fa fa-circle-o unchecked"' + ' id="unchecked-' + (+index) + "-" + (+indexTodo) + '" aria-hidden="true"></i>' +                                 
                                '<span id="todo-text-' + (+index) + "-" + (+indexTodo) + '">' + todoText + '</span>' + 
                            '</div>' +
                        '</div>' +
                  '</li>';

    todoList.append(newTodo);

    $('.card-body-todo-' + (+index) + "-" + (+indexTodo)).css({
        "background-color": "#fff",
        "font-size": "1.5rem !important",
    });

    let indexNew = ((+index) + "-" + (+indexTodo)).toString();

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