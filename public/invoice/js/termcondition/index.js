(function ($) {
  $('.new-site').select2();
  $('.update-site').select2();
  $('.add-term').on('click', 'a.panel-close', function () {
    $(this).parents('.add-term').fadeOut();
  });
  $('.update-term').on('click', 'a.panel-close', function () {
    $(this).parents('.update-term').fadeOut();
  });
  $('.new-button').on('click', function(){      
    $('.add-term').fadeIn();
    $('.update-term').fadeOut();
  })
  $('.new-revisedate').datetimepicker({
    format: 'YYYY-MM-DD',
    showClear: true
  });
  $('.update-revisedate').datetimepicker({
    format: 'YYYY-MM-DD',
    showClear: true
  });
  getSiteName = function(id) {
    if(id == 0) {
      return 'Miugodo';
    } else if(id == 1) {
      return 'Envio';
    } else if(id == 2) {
      return 'Magicespejo';
    } else if(id == 3) {
      return 'Otratierra';
    } else {
      return '';
    }
  }
  getSite = function(name) {
    console.log(name);
    if(name == 'Miugodo') {
      return 0;
    } else if(name == 'Envio') {
      return 1;
    } else if(name == 'Magicespejo') {
      return 2;
    } else if(name == 'Otratierra') {
      return 3;
    } else {
      return -1;
    }
  }
  $(document).ready(function() {    
    $('.term-table').DataTable({
      "pageLength": 25,
      "language": {
        "search": "Buscar"
      },
      responsive: true,
      dom: '<"html5buttons"B>lTfgtip',
      buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
      });
      loadAllTerms();
  })

  $('.add-form').submit(function(e) {
    e.preventDefault();
    $('.lds-spinner').fadeIn();
    var formData = new FormData();
    formData.append('file', document.getElementsByClassName('new-pdf')[0].files[0]);
    formData.append('version', $('.new-version').val());
    formData.append('subject', $('.new-subject').val());
    formData.append('site', $('.new-site').val());
    formData.append('revisedate', $('.new-revisedate').val());    
    var request = new XMLHttpRequest();
    request.open('POST', '/termcondition/term_add');        
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        var response = JSON.parse(request.responseText);
        $('.lds-spinner').fadeOut();
        if(response.isSuccess == true){
          loadAllTerms();
        }else{
          alert('Ha fallado.');
        }
      }
    }
    request.send(formData);
  })
  var term_list = [];
  var loadAllTerms = function() {
    $('.lds-spinner').fadeIn();
    $.ajax({
      url: '/termcondition/term_load',
      type: 'POST',
      data: {
      },
      success: function(res) {
        $('.lds-spinner').fadeOut();
        if(res.status) {
          term_list = res.list;
          var tableData = [];
          for(var i = 0; i < res.list.length; i++) {
            tableData.push([
              res.list[i].ver,
              res.list[i].sub,
              res.list[i].revisedate,
              getSiteName(res.list[i].site),
              `<a target="_blank" class="btn btn-success btn-sm" href="/termcondition/download/detail?name=`+res.list[i].filename+`">Download</a>`,
            ]);
          }          
          $('.term-table').dataTable().fnClearTable();
          if(tableData.length == 0) return;
          $('.term-table').dataTable().fnAddData(tableData);
          $('.term-table').dataTable().fnDraw();
          $('.term-table').DataTable()
          .order( [ 2, 'desc' ] )
          .draw();
          refreshEvent();
        } else {
          alert('No se puede cargar el listado. Por favor contacte al soporte técnico.')
        }        
      }
    })
  }
  var refreshEvent = function() {
    if(admin.type == 0) return;
    $('.term-table').off();
    $('.term-table tbody tr').on('dblclick', function() {      
      for(var i = 0; i < term_list.length; i++) {
        if((term_list[i].ver == $($(this).find('td')[0]).html()) && (term_list[i].sub == $($(this).find('td')[1]).html())) {
          $('.add-term').fadeOut();
          $('.update-term').fadeIn();
          $('.update-version').val($($(this).find('td')[0]).html());
          $('.update-subject').val($($(this).find('td')[1]).html());
          $('.update-revisedate').val($($(this).find('td')[2]).html());
          $('.update-site').val(getSite($($(this).find('td')[3]).html())).trigger('change');
          $('.update-pdf').val();
          $('.old-id').val(term_list[i].id);
          break;
        }
      }
    })
  }
  $('.update-form').submit(function(e) {
    e.preventDefault();
    var formData = new FormData();
    formData.append('file', document.getElementsByClassName('update-pdf')[0].files[0]);
    formData.append('version', $('.update-version').val());
    formData.append('subject', $('.update-subject').val());    
    formData.append('revisedate', $('.update-revisedate').val());
    formData.append('site', $('.update-site').val());
    formData.append('oldid', $('.old-id').val());
    var request = new XMLHttpRequest();
    request.open('POST', '/termcondition/term_update');        
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        var response = JSON.parse(request.responseText);
        if(response.isSuccess == true){
          loadAllTerms();
        }else{
          alert('Ha fallado.');
        }
      }
    }
    request.send(formData);
  })
  $('.remove-term').on('click',function() {
    $('.lds-spinner').fadeIn();
    $.ajax({
      url: '/termcondition/term_remove',
      type: 'POST',
      data: {
        oldid: $('.old-id').val()
      },
      success: function(res) {
        $('.lds-spinner').fadeOut();
        $('.update-term').fadeOut();
        if(res.isSuccess) {
          loadAllTerms();
        } else {
          alert('No se puede eliminar la información')
        }
      }
    })    
  })
}(jQuery));