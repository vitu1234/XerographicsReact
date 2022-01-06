<!doctype html>
    <html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Xerographics') }}</title>

        <!-- Fonts -->
        <link rel="dns-prefetch" href="//fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
        

        <!-- Styles -->

        <link rel="icon" href="{{ asset('assets/img/brand/favicon.png') }}" type="image/png">
        <!-- Fonts -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700">
        <!-- Icons -->
        <link rel="stylesheet" href="{{ asset('assets/vendor/nucleo/css/nucleo.css') }}" type="text/css">
        <link rel="stylesheet" href="{{ asset('assets/vendor/@fortawesome/fontawesome-free/css/all.min.css') }}" type="text/css">
        <!-- Page plugins -->
        <!-- Argon CSS -->
        <link rel="stylesheet" href="{{ asset('assets/css/argon.css?v=1.2.0') }}" type="text/css">

        <link rel="stylesheet" type="text/css" href="{{ asset('css/datatables.min.css') }}" />
        <link rel="stylesheet" href="{{ asset('css/cart.css') }}" type="text/css">
        <link href="{{ asset('css/select2.min.css') }}"  rel="stylesheet" />
        <link href="{{ asset('css/invoice.css') }}"  rel="stylesheet" />
        <link href="{{ asset('css/sidebarmenucollapse.css') }}"  rel="stylesheet" />
    </head>
    <body>
        <div id="bg-default">


            @include('incl.navbar')




            <div class="main-content" id="panel">


                @auth
                @include('incl.topbar')
                {{-- @include('incl.messages') --}}
                @endauth
                @yield('content')

            </div>
        </div>

        <!-- Argon Scripts -->
        <!-- Core -->
        <script src="{{ asset('assets/vendor/jquery/dist/jquery.min.js') }}"></script>
        <script src="{{ asset('assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js') }}"></script>
        <script src="{{ asset('assets/vendor/js-cookie/js.cookie.js') }}"></script>
        <script src="{{ asset('assets/vendor/jquery.scrollbar/jquery.scrollbar.min.js') }}"></script>
        <script src="{{ asset('assets/vendor/jquery-scroll-lock/dist/jquery-scrollLock.min.js') }}"></script>
        <!-- Optional JS -->
        <script src="{{ asset('assets/vendor/chart.js/dist/Chart.min.js') }}"></script>
        <script src="{{ asset('assets/vendor/chart.js/dist/Chart.extension.js') }}"></script>
        <!-- Argon JS -->
        <script src="{{ asset('assets/js/argon.js?v=1.2.0') }}"></script>
        <script src="{{ asset('js/sweetalert2.js') }}" ></script>
        <script src="{{ asset('js/datatables.min.js') }}" type="text/javascript" ></script>
        {{-- custom js --}}
        <script src="{{ asset('js/jquery.validate.min.js') }}"></script>
        <script src="{{ asset('js/select2.min.js') }}"></script>
        <script src="{{ asset('js/js.cookie.min.js') }}" ></script>
        <script src="{{ asset('js/js.js') }}"></script>
        

        <script type="text/javascript">
            @if(Request::path() === 'users')
            fetchAllUsers();
            @elseif(Request::path() === 'units')
            fetchAllUnits();
            @elseif(Request::path() === 'categories')
            fetchAllCategories();
            @elseif(Request::path() === 'branches')
            fetchAllBranches();
            @elseif(Request::path() === 'products')
            fetchAllProducts();
            @elseif(Request::path() === 'brands')
            fetchAllProductBrands();
            @elseif(Request::path() === 'customers')
            fetchAllCustomers();
            @elseif(Request::path() === 'pos')
            fetchAllPosProducts("category");
            //focus on input field
            $("#search_input").focus()
            $("#total_amount").val(0)
            @elseif(Request::path() === 'sales')
            fetchAllBranchSales();
            @elseif(Request::path() === 'reports/user')
            fetchAllUserReports();
            @endif

            $(document).ready(function() {
                $('.select2').select2();
            });

            'use strict';

            //
            // Sales line chart
            //

            var SalesChart = (function() {

              // Variables

              var $chart = $('#chart-sales-daerk');


              // Methods

              function init($chart) {

                var salesChart = new Chart($chart, {
                  type: 'line',
                  options: {
                    scales: {
                      yAxes: [{
                        gridLines: {
                          lineWidth: 1,
                          color: Charts.colors.gray[900],
                          zeroLineColor: Charts.colors.gray[900]
                        },
                        ticks: {
                          callback: function(value) {
                            if (!(value % 10)) {
                              return '$' + value + 'k';
                            }
                          }
                        }
                      }]
                    },
                    tooltips: {
                      callbacks: {
                        label: function(item, data) {
                          var label = data.datasets[item.datasetIndex].label || '';
                          var yLabel = item.yLabel;
                          var content = '';

                          if (data.datasets.length > 1) {
                            content += '' + label + '';
                          }

                          content += '$' + yLabel + 'k';
                          return content;
                        }
                      }
                    }
                  },
                  data: {
                    labels: ['May', 'Juddn', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                      label: 'Performance',
                      data: [0, 20, 10, 30, 15, 40, 20, 60, 60]
                    }]
                  }
                });

                // Save to jQuery object

                $chart.data('chart', salesChart);

              };


              // Events

              if ($chart.length) {
                init($chart);
              }

            })();


            //
        // sales Bars chart
        //
        var BarsChart = function() {
            var a = $("#chart-bars2");
            a.length && function(a) {
                var t = new Chart(a, {
                    type: "bar",
                    data: {
                        labels: ["Juls", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        datasets: [{
                            label: "Sales",
                            data: [25, 20, 30, 22, 17, 29]
                        }]
                    }
                });
                a.data("chart", t)
            }(a)
        }();

        </script>
    </body>
    </html>
