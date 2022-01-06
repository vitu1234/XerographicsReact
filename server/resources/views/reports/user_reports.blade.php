@extends('layouts.app')

@section('content')
<!-- Page content -->
<div class="container-fluid mt--6">
  <div class="row">
    <div class="col">
      <div class="card">
        @include('incl.messages')
        <form id="filterUserReportsForm" action="" method="POST">
          @csrf
        <div class="row p-3 m-3">

            <div class="col-md-3 ">

              <div class="form-group">
                <select name="filter_user" id="filter_user" required class="form-control select2">
                  <option value="" selected="">-Select user-</option>
                  @foreach($users as $user)
                    <option value="{{ $user->id }}">{{ $user->firstname }} {{ $user->lastname }}</option>
                  @endforeach
                  
                </select>
              </div>
            </div>

            <div class="col-md-4 ">

              <div class="form-group">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-secondary">Start Date</span>
                  </div>
                  <input  max="{{ $today }}" name="filter_user_start" id="filter_user_start" required type="date" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-secondary">
                </div>
              </div>
            </div>

            <div class="col-md-4 ">

              <div class="form-group">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">End Date</span>
                  </div>
                  <input max="{{ $today }}" name="filter_user_end" id="filter_user_end" required type="date" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                </div>
              </div>
            </div>

            <div class="col-md-1 ">

              <div class="form-group">
                <button type="submit" id="btn_find" class="btn btn-primary">Find</button>
              </div>
            </div>

          </div>
        </form>

        <div class="table-responsive mt-2" id="show_reports">

        </div>

      </div>
    </div>
  </div>

  <!-- Footer -->
  @include('incl.footer')
</div>
@endsection