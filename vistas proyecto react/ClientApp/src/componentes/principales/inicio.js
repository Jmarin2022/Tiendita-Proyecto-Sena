//import "bootsrap/dist/css/bootstrap.min.css"
import React from "react";
import '../assets/js/dashboard.init.js'
import '../assets/css/bootstrap.min.css'
import '../assets/css/site.css'

export function inicio(props) {

    return (

    <div class="content">
        <div class="row">
            <div class="col-xl-6">
                <div class="card">
                    <div class="card-body">
                        <h4 class="header-title">Ventas del mes</h4>
                        <div id="sales-overview" class="apex-charts" dir="ltr" data-colors="#45bbe0,#f1556c">
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">


                        <h4 class="header-title">Ventas del año</h4>


                        <div id="order-overview" class="apex-charts" dir="ltr" data-colors="#45bbe0,#f1556c">
                        </div>
                    </div>

                </div>
                <div class="card">
                    <div class="card-body">


                        <h4 class="header-title">Ventas de los años</h4>


                        <div id="wallet-balance" class="apex-charts" dir="ltr" data-colors="#45bbe0,#f1556c">
                        </div>
                    </div>

                </div>
            </div>
            <div class="row">
                <div class="col-xl-8">
                    <div class="card">
                    </div>
                    

                </div> 

            </div> 

        </div>
        <footer class="content footer">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <script>document.write(new Date().getFullYear())</script> &copy; Highdmin theme by
                        <a href="#">Coderthemes</a>
                    </div>
                </div>
            </div>
        </footer>
    </div>






    )
}
//export default inicio;