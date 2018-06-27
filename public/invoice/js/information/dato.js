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
              <p>`+pdfs[i].title+`</p>
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
  }
}(jQuery));