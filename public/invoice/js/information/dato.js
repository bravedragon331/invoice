(function ($) {
  var myDropzone = new Dropzone("#frmFileUpload.dropzone", {
    acceptedFiles: ".jpeg,.jpg,.pdf",
    url: "/information/dato_upload"
  });
  
  myDropzone.on("complete", function(file) {
    loadDato();       
  });  
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
          var images = [], pdfs = [];          
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
            `<div class="col-sm-4 col-xs-4 col-md-2 m-b-30">
                <a href="/uploads/dato/image/`+images[i].name+`" data-lightbox="gallery" data-title="`+images[i].title+`">
                    <img class="img-responsive" src="/uploads/dato/image/`+images[i].name+`" alt="Lightbox Gallery Image">
                </a>
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
        }else{
          alert('Cannot load datos. Please contact support team.');
        }
      }
    });
  }
  $(document).ready(function() {
    loadDato();
  })
}(jQuery));