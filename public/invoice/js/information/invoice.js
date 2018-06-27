(function ($) {
  $('.add-invoice').on('click', 'a.panel-close', function () {
    $(this).parents('.add-invoice').fadeOut();
  });

  $('.update-invoice').on('click', 'a.panel-close', function () {
    $(this).parents('.update-invoice').fadeOut();
  });

  $('.new-button').on('click', function(){      
    $('.add-invoice').fadeIn();
    $('.update-invoice').fadeOut();
  })

  $('.new-invoicedate').datetimepicker({
    format: 'YYYY-MM-DD',
    showClear: true
  });
  $('.update-invoicedate').datetimepicker({
    format: 'YYYY-MM-DD',
    showClear: true
  });

  $(document).ready(function() {    
    $('.invoice-table').DataTable({
      "pageLength": 25,
      responsive: true,
      dom: '<"html5buttons"B>lTfgtip',
      buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
      });
      loadAllInvoices();
  })

  $('.add-form').submit(function(e) {
    e.preventDefault();
    $('.lds-spinner').fadeIn();
    var formData = new FormData();
    formData.append('file', document.getElementsByClassName('new-pdf')[0].files[0]);
    formData.append('payment', $('.new-payment').val());
    formData.append('amount', $('.new-amount').val());
    formData.append('transfer', $('.new-transfer').val());
    formData.append('receipt', $('.new-receipt').val());
    formData.append('invoice', $('.new-invoice').val());
    formData.append('invoicedate', $('.new-invoicedate').val());
    formData.append('total', $('.new-total').val());
    formData.append('usrid', usr.id);
    var request = new XMLHttpRequest();
    request.open('POST', '/information/invoice_add');        
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        $('.lds-spinner').fadeOut();
        var response = JSON.parse(request.responseText);
        if(response.isSuccess == true){
          loadAllInvoices();
        }else{
          alert('Failed.');
        }
      }
    }
    request.send(formData);
  })

  var invoice_list = [];
  var loadAllInvoices = function() {
    $('.lds-spinner').fadeIn();
    $.ajax({
      url: '/information/invoice_load',
      type: 'POST',
      data: {
        usrid: usr.id
      },
      success: function(res) {
        $('.lds-spinner').fadeOut();
        if(res.status) {
          invoice_list = res.list;
          invoice_list.sort(function(a, b){
            return (a.invoicedate > b.invoicedate) ? -1 : ((b.invoicedate > a.invoicedate) ? 1 : 0);
          })
          var tableData = [];
          if(invoice_list.length == 0) return;
          for(var i = 0; i < invoice_list.length; i++) {
            tableData.push([
              invoice_list[i].payment, invoice_list[i].amount, invoice_list[i].transfer, invoice_list[i].receipt, invoice_list[i].invoice, invoice_list[i].invoicedate, invoice_list[i].total,
              `<a target="_blank" class="btn btn-success btn-sm" href="/information/invoice/download/detail?name=`+invoice_list[i].filename+`">Download</a>`,
            ]);
          }
          $('.invoice-table').dataTable().fnClearTable();
          $('.invoice-table').dataTable().fnAddData(tableData);
          $('.invoice-table').dataTable().fnDraw();
          $('.invoice-table').DataTable()
          .order( [ 5, 'desc' ] )
          .draw();
          refreshEvent();
        } else {
          alert('Cannot load list. Please contact support team.')
        }        
      }
    })
  }

  var refreshEvent = function() {
    if(admin.type == 0) return;
    $('.invoice-table').off();
    $('.invoice-table tbody tr').on('dblclick', function() {
      for(var i = 0; i < invoice_list.length; i++) {
        if(
          (invoice_list[i].payment == $($(this).find('td')[0]).html()) &&
          (invoice_list[i].amount == $($(this).find('td')[1]).html()) &&
          (invoice_list[i].transfer == $($(this).find('td')[2]).html()) &&
          (invoice_list[i].receipt == $($(this).find('td')[3]).html()) &&
          (invoice_list[i].invoice == $($(this).find('td')[4]).html()) &&
          (invoice_list[i].invoicedate == $($(this).find('td')[5]).html()) &&
          (invoice_list[i].total == $($(this).find('td')[6]).html())
        ) {
          $('.add-invoice').fadeOut();
          $('.update-invoice').fadeIn();
          $('.update-payment').val($($(this).find('td')[0]).html());
          $('.update-amount').val($($(this).find('td')[1]).html());
          $('.update-transfer').val($($(this).find('td')[2]).html());
          $('.update-receipt').val($($(this).find('td')[3]).html());
          $('.update-invoice').val($($(this).find('td')[4]).html());
          $('.update-invoicedate').val($($(this).find('td')[5]).html());
          $('.update-total').val($($(this).find('td')[6]).html());
          $('.update-pdf').val();
          $('.old-id').val(invoice_list[i].id);
          break;
        }
      }
    })
  }

  $('.update-form').submit(function(e) {
    e.preventDefault();
    $('.lds-spinner').fadeIn();
    var formData = new FormData();
    formData.append('file', document.getElementsByClassName('update-pdf')[0].files[0]);
    formData.append('payment', $('.update-payment').val());
    formData.append('amount', $('.update-amount').val());
    formData.append('transfer', $('.update-transfer').val());
    formData.append('receipt', $('.update-receipt').val());
    formData.append('invoice', $('.update-invoice').val());
    formData.append('invoicedate', $('.update-invoicedate').val());
    formData.append('total', $('.update-total').val());
    formData.append('oldid', $('.old-id').val());
    var request = new XMLHttpRequest();
    request.open('POST', '/information/invoice_update');
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        $('.lds-spinner').fadeOut();
        var response = JSON.parse(request.responseText);
        if(response.isSuccess == true){
          $('.update-invoice').fadeOut();
          loadAllInvoices();          
        }else{
          alert('Failed.');              
        }
      }
    }
    request.send(formData);
  })
  $('.remove-invoice').on('click',function() {
    $.ajax({
      url: '/information/invoice_remove',
      type: 'POST',
      data: {
        oldid: $('.oldid').val()
      },
      success: function(res) {
        if(res.isSuccess) {
          loadAllInvoices();
        } else {
          alert('Cannot remove invoice. Please contact support team.');
        }
      }
    })
  })
}(jQuery));