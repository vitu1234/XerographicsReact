@extends('layouts.app')

@section('content')
<!-- Page content -->
<div class="container-fluid mt--6">
  <div class="row">
    <div class="col">
      <div class="card">

        <div class="table-responsive mt-4" id="show_all_users">

        </div>

      </div>
    </div>
  </div>


  {{-- add new user modal start --}}
  <div class="modal fade" id="adduserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">ADD USER</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form method="POST" id="addUserForm">
           @csrf
           <div class="row">
            <div class=" col-md-6">
              <div class="form-group">
                <label for="urole">User role</label>
                <select class="form-control" name="urole" id="urole" required> 
                  <option disabled selected>-select-</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="shop_user">Assistant</option>
                </select>
              </div>
            </div>

            <div class=" col-md-6">
              <div class="form-group">
                <label for="ubranch">Branch</label>
                <select class="form-control" name="ubranch" id="ubranch" required> 
                  <option selected disabled>-select-</option>
                  @if(count($branches) > 0)
                    @foreach($branches as $branch)
                      <option value="{{ $branch->id }}">{{ $branch->branch_name }}</option>
                    @endforeach
                  @endif
                </select>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="fname">Firstname</label>
                <input type="text" class="form-control" name="fname" id="fname" placeholder="Ex: John" required>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="lname">Lastname</label>
                <input type="text" class="form-control" name="lname" id="lname" placeholder="Ex: Doe" required>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="email">Email address</label>
                <input type="email" class="form-control" name="email" id="email" placeholder="Ex: email@example.com" required>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" name="password" id="password" placeholder="Password" required>
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
{{-- add new user modal end --}}

  {{-- add new user modal start --}}
  <div class="modal fade" id="edituserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">EDIT USER</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" >
         <form  method="POST" id="editFormBody" >
         </form>
      </div>

    </div>
  </div>
</div>
{{-- add new user modal end --}}


<!-- Footer -->
@include('incl.footer')
</div>
@endsection