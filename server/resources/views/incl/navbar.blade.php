@auth
<!-- Sidenav -->
<nav class="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white" id="sidenav-main">
  <div class="scrollbar-inner">
    <!-- Brand -->
    <div class="sidenav-header  align-items-center">
      <a class="navbar-brand" href="javascript:void(0)">
        <img src="{{ asset('assets/img/brand/logo.png') }}"   class="navbar-brand-img" alt="Logo">
      </a>
    </div>
    <div class="navbar-inner">
      <!-- Collapse -->
      <div class="collapse navbar-collapse" id="sidenav-collapse-main">
        <!-- Nav items -->
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link {{ Request::path() == '/' ? 'active' : '' }}" href="/">
              <i class="ni ni-tv-2 text-primary"></i>
              <span class="nav-link-text">Dashboard</span>
            </a>
          </li>

          @if(Request::path() == 'users' || Request::path() == 'customers')
          <li class="nav-item">
            <a class="nav-link active" href="/users">
              <i class="ni ni-single-02 text-orange"></i>
              <span class="nav-link-text">Users</span>
            </a>
          </li>
          @else
          <li class="nav-item">
            <a class="nav-link " href="/users">
              <i class="ni ni-single-02 text-orange"></i>
              <span class="nav-link-text">Users</span>
            </a>
          </li>
          @endif
          <li class="nav-item">
            <a class="nav-link {{ Request::path() == 'units' ? 'active' : '' }}" href="/units">
              <i class="ni ni-bullet-list-67 text-primary"></i>
              <span class="nav-link-text">Units</span>
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link {{ Request::path() == 'categories' ? 'active' : '' }}" href="/categories">
              <i class="ni ni-box-2 text-primary"></i>
              <span class="nav-link-text">Categories</span>
            </a>
          </li>

          @if(Request::path() == 'products' || Request::path() == 'brands')
          <li class="nav-item">
            <a class="nav-link active" href="/products">
              <i class="ni ni-bag-17 text-primary"></i>
              <span class="nav-link-text">Products</span>
            </a>
          </li>
          @else

          <li class="nav-item">
            <a class="nav-link " href="/products">
              <i class="ni ni-bag-17 text-primary"></i>
              <span class="nav-link-text">Products</span>
            </a>
          </li>

          @endif
          
          
         <li class="nav-item">
          <a class="nav-link {{ Request::path() == 'branches' ? 'active' : '' }}" href="/branches">
            <i class="ni ni-pin-3 text-primary"></i>
            <span class="nav-link-text">Branches</span>
          </a>
        </li>

        @if(Request::path() == 'sales' || Request::route()->getName() == 'sales.show')
        <li class="nav-item">
          <a class="nav-link active" href="/sales">
            <i class="ni ni-support-16 text-orange"></i>
            <span class="nav-link-text">Sales</span>
          </a>
        </li>
        @else
        <li class="nav-item">
          <a class="nav-link " href="/sales">
            <i class="ni ni-support-16 text-orange"></i>
            <span class="nav-link-text">Sales</span>
          </a>
        </li>
        @endif

        <li class="nav-item">
          <a class="nav-link {{ Request::path() == 'pos' ? 'active' : '' }}" href="/pos">
            <i class="ni ni-support-16 text-default"></i>
            <span class="nav-link-text">POS</span>
          </a>
        </li>

        <li class="nav-item">
            <a data-toggle="collapse" data-target="#collapseList" class="nav-link {{ strpos(Request::path(), 'reports') !== false ? 'active' : '' }}" href="#">
              <i class="ni ni-books text-primary"></i>
              <span class="nav-link-text">Reports</span>
            </a>
            <div id="collapseList" class="sidebar-submenu collapse">
              <ul  class="">
             
                <li class="">
                  <a class="nav-link" href="/reports/user">
                    <i class="ni ni ni-single-02 text-orange"></i>
                    <span class="nav-link-text">User Sales</span>
                  </a>
                </li>

               

                <li class="">
                  <a class="nav-link" href="/reports/branch">
                    <i class="ni ni-pin-3 text-success"></i>
                    <span class="nav-link-text">Branch Sales</span>
                  </a>
                </li>

                 <li class="">
                  <a class="nav-link" href="/reports/category">
                    <i class="ni ni-box-2 text-primary"></i>
                    <span class="nav-link-text">Category Sales</span>
                  </a>
                </li>
               
             </ul>
           </div>
         </li>

        <li class="nav-item">
          <a class="nav-link {{ Request::path() == 'profile' ? 'active' : '' }}" href="/profile">
            <i class="ni ni-single-02 text-yellow"></i>
            <span class="nav-link-text">My Profile</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link {{ Request::path() == 'settings' ? 'active' : '' }}" href="/settings">
            <i class="ni ni-settings-gear-65 text-default"></i>
            <span class="nav-link-text">Settings</span>
          </a>
        </li>


        <li class="nav-item">
          <a href="{{ route('logout') }}"
          onclick="event.preventDefault();
          document.getElementById('logout-form').submit();" class="nav-link" >
          <i class="ni ni-button-power text-info"></i>
          <span class="nav-link-text">Logout</span>
        </a>

        <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
          @csrf
        </form>
      </li>

    </ul>



  </div>
</div>
</div>
</nav>
@endauth

