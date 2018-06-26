(function ($) {
  $(document).ready(function() {    
    $('.information-table').DataTable({
      "pageLength": 25,
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
              res.list[i].status?'<span style="color:blue">Activated</span>':'<span style="color:red">Deactivated</span>',
              ((usr.type == 1) || (res.list[i].p_id != null))?
              `<p style="margin-bottom: 0px">
                <a target="_blank" class="btn btn-success btn-sm" href="/information/solicitud?id=`+res.list[i].id+`">SOLICITUD</a>
                <a target="_blank" class="btn btn-success btn-sm" href="/information/invoice?name=`+res.list[i].id+`">INVOICE</a>
                <a target="_blank" class="btn btn-success btn-sm" href="/information/datos?name=`+res.list[i].id+`">DATOS</a>
              </p>`:
              `<p style="margin-bottom: 0px">
                <a target="_blank" class="btn btn-success btn-sm" href="/information/invoice?name=`+res.list[i].id+`">INVOICE</a>
                <a target="_blank" class="btn btn-success btn-sm" href="/information/datos?name=`+res.list[i].id+`">DATOS</a>
              </p>`
            ])
          }
          $('.information-table').dataTable().fnClearTable();
          $('.information-table').dataTable().fnAddData(tabledata);
          $('.information-table').dataTable().fnDraw();
        } else {
          alert('Cannot load client information');
        }
      }
    })
  }
}(jQuery))