function csvReportDownloder(gridHeader,gridHeaderValue,filename=''){
            var finalData = reportHeaderDataMaker(gridHeader)+"\r\n";
            finalData = finalData+reportValueDataMaker(gridHeader,gridHeaderValue);
            var dataType = 'application/vnd.ms-excel';
            filename = filename?filename+'.csv':'excel_data.csv';
            downloadLink = document.createElement("a");
            document.body.appendChild(downloadLink);
            if(navigator.msSaveOrOpenBlob){
                var blob = new Blob(['\ufeff', finalData], {
                    type: dataType
                });
                navigator.msSaveOrOpenBlob( blob, filename);
            }else{
                downloadLink.href = 'data:' + dataType + ', ' + finalData;
                downloadLink.download = filename;
                downloadLink.click();
            }
        }
        
        function reportHeaderDataMaker(gridHeader){
            var headerLable = "";            
               for (var key in gridHeader) {
                  if (gridHeader.hasOwnProperty(key)) {
                    var val = gridHeader[key];
                      headerLable =headerLable+val+",";
                  }
               }
                headerLable = headerLable.replace(/.$/,"")
            return headerLable;
        }
        function reportValueDataMaker(gridHeader,gridHeaderValue){  
           var finalData = "";
            for (var x = 0; x<gridHeaderValue.length;x++){
                var finalSingalRow = "";
                for (var key in gridHeader) {
                  if (gridHeader.hasOwnProperty(key)) {
                      try{
                          if(gridHeaderValue[x][key] != null && gridHeaderValue[x][key] != 'undefined'){
                              finalSingalRow = finalSingalRow+gridHeaderValue[x][key]+","
                          }else{
                              finalSingalRow = finalSingalRow+",";
                          }
                        
                      }catch{
                           console.log("Error In DataProcessing >> " +x);
                        }
                  }
               }
                finalSingalRow = finalSingalRow.replace(/.$/,"");
                finalSingalRow =finalSingalRow+"\r\n";
                finalData = finalData+finalSingalRow;
            }
            return finalData;
        }