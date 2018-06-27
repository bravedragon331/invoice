(function ($) {  
  $('.update-1').on('click', 'a.panel-close', function () {
    $(this).parents('.update-1').fadeOut();
  });
  $('.update-2').on('click', 'a.panel-close', function () {
    $(this).parents('.update-2').fadeOut();
  });
  $('.update-3').on('click', 'a.panel-close', function () {
    $(this).parents('.update-3').fadeOut();
  });
  $('.update-4').on('click', 'a.panel-close', function () {
    $(this).parents('.update-4').fadeOut();
  });
  $('.update-tab-1').on('click', function() {
    $('.update-1').fadeIn();
  })
  $('.update-tab-2').on('click', function() {
    $('.update-2').fadeIn();
  })
  $('.update-tab-3').on('click', function() {
    $('.update-3').fadeIn();
  })
  $('.update-tab-4').on('click', function() {
    $('.update-4').fadeIn();
  })
  $(document).ready(function() {
    loadTab1();
    loadTab2();
    loadTab3();
    loadTab4();    
  })
  var loadTab1 = function() {
    $('.lds-spinner').fadeIn();
    $.ajax({
      url: '/information/solicitud/load_empresa',
      type: 'POST',
      data: {
        id: usr_id
      },
      success: function(res) {
        $('.lds-spinner').fadeOut();
        if(res.isSuccess) {
          var data = res.data;
          if(data == undefined) return;
          $('.table-1 .empresa').html(data.empresa);
          $('.update-1 .empresa').val(data.empresa);
          $('.table-1 .nit').html(data.nit);
          $('.update-1 .nit').val(data.nit);
          $('.table-1 .tipo').html(data.tipo);
          $('.update-1 .tipo').val(data.tipo);
          $('.table-1 .numero').html(data.numero);
          $('.update-1 .numero').val(data.numero);
          $('.table-1 .folio').html(data.folio);
          $('.update-1 .folio').val(data.folio);
          $('.table-1 .libro').html(data.libro);
          $('.update-1 .libro').val(data.libro);
          $('.table-1 .nombre').html(data.nombre);
          $('.update-1 .nombre').val(data.nombre);
          $('.table-1 .ddmmaa').html(data.ddmmaa);
          $('.update-1 .ddmmaa').val(data.ddmmaa);
          $('.table-1 .direccion').html(data.direccion);
          $('.update-1 .direccion').val(data.direccion);
          $('.table-1 .email').html(usr.email);
          $('.table-1 .documento').html(data.documento);
          $('.update-1 .documento').val(data.documento);
        } else {
          alert('Cannot load Empresa Dato.');
        }
      }
    })
  }
  var loadTab2 = function() {
    $.ajax({
      url: '/information/solicitud/load_representante',
      type: 'POST',
      data: {
        id: usr_id
      },
      success: function(res) {
        $('.lds-spinner').fadeOut();
        if(res.isSuccess) {
          var data = res.data;
          if(data == undefined) return;
          $('.table-2 .nombre').html(data.nombre);
          $('.update-2 .nombre').val(data.nombre);
          $('.table-2 .dpi').html(data.dpi);
          $('.update-2 .dpi').val(data.dpi);
          $('.table-2 .tel').html(data.tel);
          $('.update-2 .tel').val(data.tel);          
        } else {
          alert('Cannot load Representate Legal Dato.');
        }
      }
    })
  }
  var loadTab3 = function() {
    $.ajax({
      url: '/information/solicitud/load_transferencia',
      type: 'POST',
      data: {
        id: usr_id
      },
      success: function(res) {
        $('.lds-spinner').fadeOut();
        if(res.isSuccess) {
          var data = res.data;
          if(data == undefined) return;
          $('.table-3 .banco').html(data.banco);
          $('.update-3 .banco').val(data.banco);
          $('.table-3 .cuenta_numero').html(data.cuenta_numero);
          $('.update-3 .cuenta_numero').val(data.cuenta_numero);
          $('.table-3 .cuenta_nombre').html(data.cuenta_nombre);
          $('.update-3 .cuenta_nombre').val(data.cuenta_nombre);
          $('.table-3 .pago').html(data.pago);
          $('.update-3 .pago').val(data.pago);
        } else {
          alert('Cannot load Representate Legal Dato.');
        }
      }
    })
  }
  var loadTab4 = function() {
    $.ajax({
      url: '/information/solicitud/load_publicidad',
      type: 'POST',
      data: {
        id: usr_id
      },
      success: function(res) {
        $('.lds-spinner').fadeOut();
        if(res.isSuccess) {
          var data = res.data;
          if(data == undefined) return;
          $('.table-4 .empresa').html(data.empresa);
          $('.update-4 .empresa').val(data.empresa);
          $('.table-4 .tel').html(data.tel);
          $('.update-4 .tel').val(data.tel);
          $('.table-4 .tipo').html(data.tipo);
          $('.update-4 .tipo').val(data.tipo);
          $('.table-4 .servicio').html(data.servicio);
          $('.update-4 .servicio').val(data.servicio);
          $('.table-4 .descanso').html(data.descanso);
          $('.update-4 .descanso').val(data.descanso);
          $('.table-4 .direccion').html(data.direccion);
          $('.update-4 .direccion').val(data.direccion);
          $('.table-4 .domicilio').html(data.domicilio);
          $('.update-4 .domicilio').val(data.domicilio);
          // $('.table-4 .domicilio').html(data.domicilio);
          // $('.update-4 .domicilio').val(data.domicilio);
          $('.table-4 .presentacion').html(data.presentacion);
          $('.update-4 .presentacion').html(data.presentacion);
          if(data.confirmacion == 'Si') {
            $('#chb_21').prop('checked', true);
            $('#chb_22').prop('checked', false);
          } else {
            $('#chb_22').prop('checked', true);
            $('#chb_21').prop('checked', false);
          }
          $('.table-4 .confirmacion').html(data.confirmacion);
          $('.update-4 .minimo').html(data.minimo);
          $('.table-4 .minimo').html(data.minimo);          
          if(data.tarjeta.indexOf('Credito') != -1) {
            $('#chb_11').prop('checked', true);
          } else {
            $('#chb_11').prop('checked', false);
          }
          if(data.tarjeta.indexOf('Debito') != -1) {
            $('#chb_12').prop('checked', true);
          } else {
            $('#chb_12').prop('checked', false);
          }
          $('.table-4 .tarjeta').html(data.tarjeta);
        } else {
          alert('Cannot load Representate Legal Dato.');
        }
      }
    })
  }
  $('.form-1').submit(function(e) {
    e.preventDefault();
    $('.lds-spinner').fadeIn();
    $.ajax({
      url: '/information/solicitud/save_empresa',
      type: 'POST',
      data: {
        empresa: $('.update-1 .empresa').val(),
        nit: $('.update-1 .nit').val(),
        tipo: $('.update-1 .tipo').val(),
        numero: $('.update-1 .numero').val(),
        folio: $('.update-1 .folio').val(),
        libro: $('.update-1 .libro').val(),
        nombre: $('.update-1 .nombre').val(),
        ddmmaa: $('.update-1 .ddmmaa').val(),
        direccion: $('.update-1 .direccion').val(),
        documento: $('.update-1 .documento').val(),
        usrid: usr_id
      },
      success: function(res) {
        $('.lds-spinner').fadeOut();
        $('.update-1').fadeOut();
        if(res.isSuccess) {
          loadTab1();
        } else {
          alert('Cannot save data. Please contact support team.');
        }
      }
    })
  })
  $('.form-2').submit(function(e) {
    e.preventDefault();
    $('.lds-spinner').fadeIn();
    $.ajax({
      url: '/information/solicitud/save_representante',
      type: 'POST',
      data: {
        nombre: $('.update-2 .nombre').val(),
        dpi: $('.update-2 .dpi').val(),
        tel: $('.update-2 .tel').val(),
        usrid: usr_id
      },
      success: function(res) {
        $('.lds-spinner').fadeOut();
        $('.update-2').fadeOut();
        if(res.isSuccess) {
          loadTab2();
        } else {
          alert('Cannot save data. Please contact support team.');
        }
      }
    })
  })
  $('.form-3').submit(function(e) {
    e.preventDefault();
    $('.lds-spinner').fadeIn();
    $.ajax({
      url: '/information/solicitud/save_transferencia',
      type: 'POST',
      data: {
        banco: $('.update-3 .banco').val(),
        cuenta_numero: $('.update-3 .cuenta_numero').val(),
        cuenta_nombre: $('.update-3 .cuenta_nombre').val(),
        pago: $('.update-3 .pago').val(),
        usrid: usr_id
      },
      success: function(res) {
        $('.lds-spinner').fadeOut();
        $('.update-3').fadeOut();
        if(res.isSuccess) {
          loadTab3();
        } else {
          alert('Cannot save data. Please contact support team.');
        }
      }
    })
  })
  $('.form-4').submit(function(e) {
    e.preventDefault();
    $('.lds-spinner').fadeIn();
    var tarjeta = '';
    if($('#chb_11').is(':checked')) tarjeta += 'Credito ';
    if($('#chb_12').is(':checked')) tarjeta += 'Debito ';
    $.ajax({
      url: '/information/solicitud/save_publicidad',
      type: 'POST',
      data: {        
        empresa: $('.update-4 .empresa').val(),
        tel: $('.update-4 .tel').val(),
        tipo: $('.update-4 .tipo').val(),
        descanso: $('.update-4 .descanso').val(),
        servicio: $('.update-4 .servicio').val(),
        direccion: $('.update-4 .direccion').val(),
        domicilio: $('.update-4 .domicilio').val(),
        presentacion: $('.update-4 .presentacion').val(),
        confirmacion: $('#chb_21').is(':checked')?'Si':'No',
        minimo: $('.update-4 .minimo').val(),
        tarjeta: tarjeta,
        usrid: usr_id
      },
      success: function(res) {
        $('.lds-spinner').fadeOut();
        $('.update-4').fadeOut();
        if(res.isSuccess) {
          loadTab4();
        } else {
          alert('Cannot save data. Please contact support team.');
        }
      }
    })
  })

  $('#chb_31').change(function() {
    if(!$('#chb_31').is(':checked') || !$('#chb_32').is(':checked') || !$('#chb_33').is(':checked')) {      
      $(".accept").prop("disabled",true);
    } else {
      $(".accept").prop("disabled",false);
    }
  })
  $('#chb_32').change(function() {
    if(!$('#chb_31').is(':checked') || !$('#chb_32').is(':checked') || !$('#chb_33').is(':checked')) {      
      $(".accept").prop("disabled",true);
    } else {
      $(".accept").prop("disabled",false);
    }
  })
  $('#chb_33').change(function() {
    if(!$('#chb_31').is(':checked') || !$('#chb_32').is(':checked') || !$('#chb_33').is(':checked')) {      
      $(".accept").prop("disabled",true);
    } else {
      $(".accept").prop("disabled",false);
    }
  })

  $(document).ready(function() {
    if ($(".accept")[0]){
      $(".accept").prop("disabled",true);
    }
  })

  $('.accept').on('click', function() {
    if(!$('#chb_31').is(':checked') || !$('#chb_32').is(':checked') || !$('#chb_33').is(':checked')) {      
      return;
    }
    var result = confirm("Are you sure to accept?");
    if (result) {
      $.ajax({
        url: '/information/accept',
        type: 'POST',
        data: {
          usrid: usr_id
        },
        success: function(res) {
          if(res.isSuccess) {
            $('.accept').hide();
            $('.update-tab-1').hide();
            $('.update-tab-2').hide();
            $('.update-tab-3').hide();
            $('.update-tab-4').hide();
          } else {
            alert('Cannot process request. Please contact support team.');
          }
        }
      })
    }
  })

  $('.publish').on('click', function() {
    var result = confirm("Are you sure to publish?");
    if(result) {
      $.ajax({
        url: '/information/publish',
        type: 'POST',
        data: {
          usrid: usr_id
        },
        success: function(res) {
          if(res.isSuccess) {
            $('.publish').hide();
          } else {
            alert('Cannot process request. Please contact support team.');
          }
        }
      })
    }
  })

  // $('#chb_11').change(function() {
  //   if(this.checked) {
  //     $('#chb_12').prop('checked', false);
  //   } else {
  //     $('#chb_12').prop('checked', true);
  //   }
  // });
  // $('#chb_12').change(function() {
  //   if(this.checked) {
  //     $('#chb_11').prop('checked', false);
  //   } else {
  //     $('#chb_11').prop('checked', true);
  //   }
  // });
  $('#chb_21').change(function() {
    if(this.checked) {
      $('#chb_22').prop('checked', false);
    } else {
      $('#chb_22').prop('checked', true);
    }
  });
  $('#chb_22').change(function() {
    if(this.checked) {
      $('#chb_21').prop('checked', false);
    } else {
      $('#chb_21').prop('checked', true);
    }
  });
}(jQuery))