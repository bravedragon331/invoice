(function ($) {
  // Left Menu
  $('.m-organization').addClass('active');
  $('.m-users').addClass('active');
  $('.contactdate').datetimepicker({
    format: 'YYYY-MM-DD',
    showClear: true
  });

  $(document).ready(function(){
    $('.user-table').DataTable({
      "pageLength": 25,
      responsive: true,
      dom: '<"html5buttons"B>lTfgtip',
      buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
      });

    $('.type-bar').select2();
    $('.status-bar').select2();
    $('.contractdate').datetimepicker({
      format: 'YYYY-MM-DD',
      showClear: true
    });
  });
  $('.add-user').on('click', 'a.panel-close', function () {
    $(this).parents('.add-user').fadeOut();
  });
  $('.new-button').on('click', function(){      
    $('.add-user').fadeIn();
  })

  /***************** Add Form  ***********/    

  $('.add-form').submit(function(e){
    e.preventDefault();
    let firstname = $('.firstname').val();
    let lastname = $('.lastname').val();
    let email = $('.email').val();
    let contractdate = $('.contractdate').val();
    let type = $('.type-bar').val();
    let status = $('.status-bar').val();
    
    $.ajax({
      url: '/users/user_add',
      type: 'POST',
      data: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        contractdate: contractdate,
        type: Number(type),
        status: Number(status)
      },
      success: function(data){
        if(data.isSuccess){
          //Add new Element to Table
          var tableData = [];              
          tableData.push([
            firstname,
            lastname,
            email,
            contractdate,
            $('.type-bar').select2('data')[0].text,
            $('.status-bar').select2('data')[0].text,
          ]);
          $('.user-table').dataTable().fnAddData(tableData);
          $('.user-table').dataTable().fnDraw();
          
          //Init Input Area
          $('.firstname').val('');
          $('.lastname').val('');
          $('.email').val('');          
          refreshEvent();
        }else {
          alert('User email is already used. Try other information.')
        }
        refreshEvent();
      }
    })
  })
  let row;
  var refreshEvent = function(){
    $('.user-table tbody tr').off();
    $('.user-table tbody tr').on('click', function(){
      row = $(".user-table").DataTable().row($(this));
      let email = $($(this).find('td')[2]).html();
      var method = 'POST';
      var form = document.createElement("form");
      form.setAttribute("method", method);
      form.setAttribute("action", '/users/user_auth');
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("email", "hidden");
      hiddenField.setAttribute("name", "email");
      hiddenField.setAttribute("value", email);
      form.appendChild(hiddenField)
      document.body.appendChild(form);
      form.submit();
    });
  };
  refreshEvent();
}(jQuery));