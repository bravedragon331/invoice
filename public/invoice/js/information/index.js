(function ($) {
  $(document).ready(function() {    
    $('.information-table').DataTable({
      "pageLength": 50,
      "language": {
        "search": "Buscar"
      },
      responsive: true,
      dom: '<"html5buttons"B>lTfgtip',
      buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
      });
      loadAllClients();
  })

  var loadAllClients = function() {
    $.ajax({
      url: '/information/load_client',
      type: 'POST',
      data: {},
      success: function(res) {
        console.log(res);
        if(res.isSuccess) {
          var tabledata = [];          
          for(var i = 0; i < res.list.length; i++) {
            tabledata.push([
              i+1, res.list[i].empresa, res.list[i].nit, res.list[i].nombre, res.list[i].email,
              res.list[i].contractdate, res.list[i].acceptdate,
              res.list[i].status?'<span style="color:blue">Activado</span>':'<span style="color:red">Desactivado</span>',
              ((usr.type == 1) || (res.list[i].p_id != null))?
              `<p style="margin-bottom: 0px;">
                <a target="_blank" class="btn btn-success btn-sm mt-5" href="/information/solicitud?id=`+res.list[i].id+`">SOLICITUD</a>
                <a target="_blank" class="btn btn-success btn-sm mt-5" href="/information/invoice?id=`+res.list[i].id+`">INVOICE</a>
                <a target="_blank" class="btn btn-success btn-sm mt-5" href="/information/datos?id=`+res.list[i].id+`">DATOS</a>
              </p>`:
              `<p style="margin-bottom: 0px">
                <a target="_blank" class="btn btn-success btn-sm mt-5" href="/information/invoice?id=`+res.list[i].id+`">INVOICE</a>
                <a target="_blank" class="btn btn-success btn-sm mt-5" href="/information/datos?id=`+res.list[i].id+`">DATOS</a>
              </p>`
            ])
          }          
          $('.information-table').dataTable().fnClearTable();
          if(tabledata.length == 0) return;
          $('.information-table').dataTable().fnAddData(tabledata);
          $('.information-table').dataTable().fnDraw();
        } else {
          alert('No se puede cargar la información del cliente');
        }
      }
    })
  }
}(jQuery))