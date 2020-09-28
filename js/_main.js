$(document).ready(() =>{
    let addNewCardBtn = $('.add-card-btn');
    let listNames = $('.input-list-name');

    addNewCardBtn.on('click', () => {
        let cardNumber = $('.row').children().length;

        console.log(cardNumber);

        addNewCard(parseInt(cardNumber));
    });

    $('.input-list-name-1').on('keypress', (event) =>{
        if(event.which == 13){
            $('.input-list-name-1').prop('disabled', true);
        }
    });
});

function addNewCard(index){
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
}