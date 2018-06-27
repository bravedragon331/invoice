(function ($) {
  $(document).ready(function(){
    $('.js-example-basic-multiple').select2();
    $('.auth-table').DataTable({
      "pageLength": 25,
      "language": {
        "search": "Buscar"
      },
      responsive: true,
      dom: '<"html5buttons"B>lTfgtip',
      buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
      });

    $('.page-bar').select2();
    $('.status-bar').select2();
    $('.read').select2();
    $('.write').select2();
    $('.delete').select2();

    $('.update-page-bar').select2();
    $('.update-status-bar').select2();
    $('.update-read').select2();
    $('.update-write').select2();
    $('.update-delete').select2();
    
    $('.contractdate').datetimepicker({
      format: 'YYYY-MM-DD',
      showClear: true
    });
  });

  $('.add-auth').on('click','a.panel-close',function () {
    $(this).parents('.add-auth').fadeOut();
  });
  $('.update-auth').on('click','a.panel-close',function () {
    $(this).parents('.update-auth').fadeOut();
  });

  $('.new-button').on('click', function(){      
    $('.add-auth').fadeIn();
    $('.update-auth').fadeOut();
  })
    
  $('.add-form').submit(function(e){
    e.preventDefault();
    let id = $('.id').val();
    let page = $('.page-bar').val();
    let isRead = $('.read').val();
    let isWrite = $('.write').val();
    let isDelete = $('.delete').val();
    let status = $('.status-bar').val();
    $.ajax({
      url: '/users/add_auth',
      type: 'POST',
      data: {
        id: id,
        page: page,
        read: isRead,
        write: isWrite,
        delete: isDelete,
        status: status
      },
      success: function(result){          
        if(result.isSuccess){
          var tableData = [];              
          tableData.push([
            $('.page-bar').select2('data')[0].text,
            isRead=='1'?'Y':'N',
            isWrite=='1'?'Y':'N',
            isDelete=='1'?'Y':'N',
            status?'Active':'InActive',
          ]);
          $('.auth-table').dataTable().fnAddData(tableData);
          $('.auth-table').dataTable().fnDraw();
          $('.add-auth').fadeOut();
        }
        refreshEvent();
      }
    })
  })

  /********** Update Form **************/
  var row;
  
  $('.update-form').submit(function(e){
    e.preventDefault();
    let id = $('.update-id').val();
    let page = $('.update-page-bar').val();
    let isRead = $('.update-read').val();
    let isWrite = $('.update-write').val();
    let isDelete = $('.update-delete').val();
    let status = $('.update-status-bar').val();
    $.ajax({
      url: '/users/update_auth',
      type: 'POST',
      data: {
        id: id,
        page: page,
        read: isRead,
        write: isWrite,
        delete: isDelete,
        status: status
      },
      success: function(result){          
        if(result.isSuccess){
          row.data([$('.update-page-bar').select2('data')[0].text, isRead==1?'Y':'N', isWrite==1?'Y':'N',isDelete==1?'Y':'N', status== 1? 'Active': 'InActive']).draw();
          $('.update-auth').fadeOut();
        }
      }
    })
  })
  var pagename;
  var refreshEvent = function(){
    $('tbody>tr').off();
    $('tbody>tr').on('click', function(){
      row = $(".auth-table").DataTable().row($(this));
      pagename = $($(this).find('td')[0]).html();
      let r = $($(this).find('td')[1]).html();
      let w = $($(this).find('td')[2]).html();
      let d = $($(this).find('td')[3]).html();
      let status = $($(this).find('td')[4]).html();
      for(let i = 0; i < pages.length; i++){          
        if(pages[i].name == pagename){
          $('.update-page-bar').val(pages[i].value).trigger('change');
        }
      }        
      $('.update-read').val(r == 'Y'? 1: 0).trigger('change');
      $('.update-write').val(w == 'Y'? 1: 0).trigger('change');
      $('.update-delete').val(d == 'Y'? 1: 0).trigger('change');

      $('.update-auth').fadeIn();
      $('.add-auth').fadeOut();
    });
  };
  refreshEvent(); 

  $('.remove').on('click', function(){
    var pageindex;
    for(let i = 0; i < pages.length; i++){          
      if(pages[i].name == pagename){
        pageindex = pages[i].value;
      }
    }
    $.ajax({
      url: '/users/remove_auth',
      type: 'POST',
      data: {
        index: pageindex
      },
      success: function(result){
        if(result.isSuccess){
          $('.update-auth').fadeOut();
          row.remove();
          $('.auth-table').dataTable().fnDraw();
        }else{
          alert('No se puede eliminar la información')
        }
      }
    })
  });

  /***************** Update User Form  ***********/
  
  $('.type-bar').select2();
  $('.status-bar').select2();
  $('.update-user').submit(function(e) {
    e.preventDefault();
    $('.lds-spinner').fadeIn();
    $.ajax({
      url: '/users/user_update',
      type: 'POST',
      data: {
        oldemail: $('.oldemail').val(),
        firstname: $('.firstname').val(),
        lastname: $('.lastname').val(),
        email: $('.email').val(),
        contractdate: $('.contractdate').val(),
        type: Number($('.type-bar').val()),
        status: Number($('.status-bar').val())
      },
      success: function(res) {
        $('.lds-spinner').fadeOut();
        if(res.isSuccess) {
          $('.oldemail').val($('.email').val());
          $('.update-user .panel-collapsable').click();
        } else {
          alert('No se puede actualizar la información del usuario. Por favor contacte al soporte técnico');
        }
      }
    })
  })
}(jQuery));