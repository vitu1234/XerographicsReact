@extends('layouts.app')

@section('content')

  <!-- Main content -->
  <div class="">
    <!-- Header -->
    <div class="header bg-gradient-success py-6 py-lg-7 pt-lg-8">
      <div class="container">
        <div class="header-body text-center mb-5">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
              <h1 class="text-white">Welcome!</h1>
              <p class="text-lead text-white">Login here to access your account</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    <!-- Page content -->
    <div class="container mt--8 pb-5">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
          <div class="card bg-secondary border-0 mb-0">
        
            <div class="card-body px-lg-5 py-lg-5">
              @if (session('message'))
                <div class="alert alert-danger">{{ session('message') }}</div>
            @endif
              <form role="form" method="POST" action="{{ route('login') }}">
                @csrf

                <div class="form-group mb-3">
                  <div class="input-group input-group-merge input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                    </div>
                    <input class="form-control @error('email') is-invalid @enderror" value="{{ old('email') }}" placeholder="Email" id="email" name="email" type="email" required autocomplete="email" autofocus>
                    @error('email')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group input-group-merge input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                    </div>
                    <input id="password" name="password" type="password" class="form-control @error('password') is-invalid @enderror" placeholder="Password" type="password" required autocomplete="current-password">

                    @error('password')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                  </div>
                </div>
                <div class="custom-control custom-control-alternative custom-checkbox">
                  <input class="custom-control-input" id=" customCheckLogin" type="checkbox">
                  <label class="custom-control-label" for=" customCheckLogin">
                    <span class="text-muted">Remember me</span>
                  </label>
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-primary my-2">Sign in</button>
                </div>
              </form>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-6">
                 @if (Route::has('password.request'))
                    <a class="" href="{{ route('password.request') }}">
                        <small>{{ __('Forgot Your Password?') }}</small>
                    </a>
                @endif
            </div>
          
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Footer -->

  @endsection
