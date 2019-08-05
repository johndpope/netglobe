/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    
    function updateData() {
        
        console.log("TEST");
    }

    $.getJSON("mapData.json", function (mapData) {

        myMapData = mapData;
        
        for(i=0;i<myMapData.length;i++) {
            var Item = myMapData[i]['name'].split(",");
            $("#UITable tbody").append("<tr>"+
                                        "<td>"+myMapData[i]['ip']+"</td>"
                                        +"<td>"+myMapData[i]['port']+"</td>"
                                        +"<td>"+Item[0]+"</td>"
                                        +"<td>"+Item[1]+"</td>"
                                        +"<td>"+Item[2]+"</td>"
                                        +"<td>"+myMapData[i]['value'][0] +","+myMapData[i]['value'][1]+"</td>"
                                        +"</tr>");
            
        }

        $.getJSON("myGeo.json", function (myGeo) {

            myGeoData = myGeo;

            $('#UITable').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copy'
                ]
            });

        });

    });
    
    setInterval(updateData(), 1000);

});