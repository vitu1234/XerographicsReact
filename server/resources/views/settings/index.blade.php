@extends('layouts.app')

@section('content')
<!-- Page content -->
<div class="container-fluid mt--6">
  <div class="row mt--5">
    <div class="col-md-10 ml-auto mr-auto">
      <div class="card card-upgrade">

        <div class="card-body">
          <div class="table-responsive ">
            <table class="table">
              <thead>
                
              </thead>
              <tbody>
                <tr>
                  <td class=""><h3>Only admin delete data from all branches</h3></td>
                  <td class="text-left">
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input" id="customCheck1">
                      <label class="custom-control-label" for="customCheck1"></label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class=""><h3>Only admin view data from all branches</h3></td>
                  <td class="text-left">
                    <div class="custom-control custom-checkbox">
                      <input checked="" type="checkbox" class="custom-control-input" id="customCheck1">
                      <label class="custom-control-label" for="customCheck1"></label>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td class="">
                    <h3>Only admin access reports from all branches</h3>
                  </td>
                  <td class="text-left">
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input" id="customCheck1">
                      <label class="custom-control-label" for="customCheck1"></label>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td class=""><h3>User suspension period (days)</h3></td>
                  <td class="text-left">
                      <input value="5" type="input" style="width:50px;height: 35px;" class="form-control" id="customCheck1">
                      
                  </td>
                </tr>
                <tr>
                    <td class="text-center"></td>
                    
                    <td class="text-center">
                      <a target="_blank" href="https://www.creative-tim.com/product/argon-dashboard-pro?ref=ad-update-pro" class="btn btn-round btn-primary">Save</a>
                    </td>
                  </tr>
                
                
                
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>


  {{-- add new unit modal start --}}
  <div class="modal fade" id="addunitModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">ADD UNIT</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form method="POST" id="addUnitForm">
           @csrf
           <div class="row">


            <div class="col-md-6">
              <div class="form-group">
                <label for="fname">Unit Name</label>
                <input type="text" class="form-control" name="unit_name" id="unit_name" placeholder="Ex: Kilogram" required>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="lname">Unit Symbol</label>
                <input type="text" class="form-control" name="unit_symbol" id="unit_symbol" placeholder="Ex: KG" required>
              </div>
            </div>


          </div>


          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" id="btn_add" class="btn btn-primary">Save</button>
          </div>

        </form>
      </div>

    </div>
  </div>
</div>
{{-- add new unit modal end --}}

{{-- add new unit modal start --}}
<div class="modal fade" id="editunitModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">EDIT UNIT</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" >
       <form  method="POST" id="editUnitFormBody" >
       </form>
     </div>

   </div>
 </div>
</div>
{{-- edit new unit modal end --}}


<!-- Footer -->
@include('incl.footer')
</div>
@endsection