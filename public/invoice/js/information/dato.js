(function ($) {
  var myDropzone = new Dropzone("#frmFileUpload.dropzone", {
    acceptedFiles: ".pdf",
    url: "/information/dato_upload"
  });
  
  myDropzone.on("complete", function(file) {
    loadDato();       
  });  
  var images = [], pdfs = [];
  var loadDato = function() {
    $('.lds-spinner').fadeIn();
    $.ajax({
      url: '/information/dato_load',
      type: 'POST',
      data: {
        id: usr.id
      },
      success: function(result){
        $('.lds-spinner').fadeOut();          
        if(result.isSuccess){
          images = [], pdfs = [];
          for(var i = 0; i < result.list.length; i++) {
            if((result.list[i].name.split('.').pop().toLowerCase() == 'jpg') ||
               (result.list[i].name.split('.').pop().toLowerCase() == 'png') ||
               (result.list[i].name.split('.').pop().toLowerCase() == 'jpeg')) {
              images.push(result.list[i]);
            } else if(result.list[i].name.split('.').pop().toLowerCase() == 'pdf') {
              pdfs.push(result.list[i]);
            }
          }
          var ht = '';
          for(var i = 0; i < images.length; i++) {
            ht += 
            `<div class="col-sm-4 col-xs-4 col-md-2 m-b-30 text-center">
                <a href="/uploads/dato/image/`+images[i].name+`" data-lightbox="gallery" data-title="`+images[i].title+`">
                    <img class="img-responsive" src="/uploads/dato/image/`+images[i].name+`" alt="Lightbox Gallery Image">
                </a>
                <p class="title" data-id="`+images[i].id+`">`+images[i].title+`</p>
                <i class="edit material-icons" data-id="`+images[i].id+`">edit</i>
            </div>`;
          }
          $('.images').html(ht);
          ht = '';
          for(var i = 0; i < pdfs.length; i++) {
            ht +=
            `<div class="col-sm-2 col-xs-4 col-md-1 m-b-30 text-center">
              <a target="_blank" href="/uploads/dato/pdf/`+pdfs[i].name+`">
                <img class="img-responsive" src="/uploads/dato/pdf/pdf.png">
              </a>
              <p class="title">`+pdfs[i].title+`</p>
              <i class="pdf-remove material-icons" data-id="`+pdfs[i].id+`">delete</i>
            </div>`;
          }          
          $('.pdfs').html(ht);
          refreshEvent();
        }else{
          alert('Cannot load datos. Please contact support team.');
        }
      }
    });
  }
  $(document).ready(function() {
    loadDato();
  })
  $('.add-image-form').submit(function(e) {
    e.preventDefault();
    $('.lds-spinner').fadeIn();
    var formData = new FormData();
    formData.append('file', document.getElementsByClassName('new-file')[0].files[0]);
    formData.append('nombre', $('.new-nombre').val());
    formData.append('categoria', $('.new-categoria').val());
    formData.append('descripcion', $('.new-descripcion').val());
    formData.append('precio', $('.new-precio').val());
    formData.append('id', $('.usrid').val());
    var request = new XMLHttpRequest();
    request.open('POST', '/information/dato_upload');        
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        $('.lds-spinner').fadeOut();
        var response = JSON.parse(request.responseText);
        if(response.isSuccess == true){
          loadDato();
        }else{
          alert('Failed.');
        }
      }
    }
    request.send(formData);
  })

  $('.update-image-form').submit(function(e) {
    e.preventDefault();
    $('.lds-spinner').fadeIn();
    $.ajax({
      url: '/information/dato_update',
      type: 'POST',
      data: {
        nombre: $('.update-nombre').val(),
        categoria: $('.update-categoria').val(),
        descripcion: $('.update-descripcion').val(),
        precio: $('.update-precio').val(),
        id: $('.old-img').val()
      },
      success: function(res) {
        $('.lds-spinner').fadeOut();
        if(res.isSuccess){ 
          $('.update-image').fadeOut();
          loadDato();
        } else {
          alert('Failed to update.');
        }
      }
    })    
  })
  $('.remove-img').on('click', function() {
    $('.lds-spinner').fadeIn();
    $.ajax({
      url: '/information/dato_remove',
      type: 'POST',
      data: {        
        id: $('.old-img').val()
      },
      success: function(res) {
        $('.lds-spinner').fadeOut();
        if(res.isSuccess){ 
          $('.update-image').fadeOut();
          loadDato();
        } else {
          alert('Failed to update.');
        }
      }
    })
  })

  var refreshEvent = function() {
    $('.title').on('click', function() {
      var id = $(this).data('id');
      for(var i = 0; i < images.length; i++) {
        if(images[i].id == id) {
          $('.modal-title').html(images[i].title);
          $('.nombre').html(images[i].nombre);          
          $('.categoria').html(images[i].categoria);
          $('.descripcion').html(images[i].descripcion);
          $('.precio').html(images[i].precio);
          $('.modal-trigger').click();
        }
      }
    })
    $('.edit').on('click', function() {
      $('.update-image').fadeIn();
      var id = $(this).data('id');
      for(var i = 0; i < images.length; i++) {
        if(images[i].id == id) {
          $('.update-nombre').val(images[i].nombre);          
          $('.update-categoria').val(images[i].categoria);
          $('.update-descripcion').val(images[i].descripcion);
          $('.update-precio').val(images[i].precio);
          $('.old-img').val(images[i].id);
        }
      }
    })
    $('.pdf-remove').on('click', function() {
      var result = confirm("Are you sure to delete?");
      if(result) {
        $('.lds-spinner').fadeIn();
        $.ajax({
          url: '/information/dato_remove',
          type: 'POST',
          data: {        
            id: $(this).data('id')
          },
          success: function(res) {
            $('.lds-spinner').fadeOut();
            if(res.isSuccess){ 
              loadDato();
            } else {
              alert('Failed to update.');
            }
          }
        })
      }
    })
  }

    
}(jQuery));