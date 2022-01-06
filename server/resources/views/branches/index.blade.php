@extends('layouts.app')

@section('content')
<!-- Page content -->
<div class="container-fluid mt--6">
  <div class="row">
    <div class="col">
      <div class="card">

        <div class="table-responsive mt-4" id="show_all_branches">

        </div>

      </div>
    </div>
  </div>


  {{-- add new unit modal start --}}
  <div class="modal fade" id="addbranchModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">ADD BRANCH</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form method="POST" id="addBranchForm">
           @csrf
           <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="efname">Branch Name</label>
                <input type="text" class="form-control" name="branch_name" id="branch_name" placeholder="Ex: City center branch" required /> 
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="elname">Branch Phone</label>
                <input type="text" class="form-control" name="branch_phone" id="branch_phone" placeholder="Ex: +265999xxxxx" required>
              </div>
            </div>
      

           <div class="col-md-6">
              <div class="form-group">
                <label for="elname">Branch Email</label>
                <input type="email" class="form-control" name="branch_email" id="branch_email" placeholder="Ex: example@gmail.com" required>
              </div>
            </div>
          

            <div class="col-md-6">
              <div class="form-group">
                <label for="elname">Branch Address</label>
                <textarea class="form-control" name="branch_address" id="branch_address" placeholder="Ex: City center behind banks" required></textarea>
                
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
  <div class="modal fade" id="editbranchModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">EDIT BRANCH</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" >
         <form  method="POST" id="editBranchFormBody" >
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