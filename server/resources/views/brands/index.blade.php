@extends('layouts.app')

@section('content')
<!-- Page content -->
<div class="container-fluid mt--6">
  <div class="row">
    <div class="col">
      <div class="card">

        <div class="table-responsive mt-4" id="show_all_brands">

        </div>

      </div>
    </div>
  </div>


  {{-- add new brand modal start --}}
  <div class="modal fade" id="addbrandModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">ADD BRAND</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form method="POST" id="addBrandForm">
           @csrf
           <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label for="efname">Brand Name</label>
                <input type="text" class="form-control" name="brand_name" id="brand_name" placeholder="Ex: Samsung" required /> 
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
  <div class="modal fade" id="editbrandModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">EDIT BRANCH</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" >
         <form  method="POST" id="editBrandFormBody" >
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