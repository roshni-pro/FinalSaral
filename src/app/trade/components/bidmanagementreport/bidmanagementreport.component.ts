import { Component, OnInit } from '@angular/core'
import { MessageService } from 'primeng/api'
import { OrderAssignmentsService } from 'app/order-assignments/Services/order-assignments.service'
import * as XLSX from 'xlsx'
import * as FileSaver from 'file-saver'

@Component({
  selector: 'app-bidmanagementreport',
  templateUrl: './bidmanagementreport.component.html',
  styleUrls: ['./bidmanagementreport.component.scss']
})
export class BidmanagementreportComponent implements OnInit {

  uploadList: any[]
  sellerList = []
  CustomerId = null

  constructor(private messageService: MessageService, private dboyService: OrderAssignmentsService) { }

  ngOnInit() {
    this.dboyService.getAllSellers().subscribe(x => {

      this.sellerList = x

      this.sellerList.forEach(element => {

        if (element.CustomerName == "") {

          this.sellerList.splice(this.sellerList.findIndex(seller => seller.CustomerId == element.CustomerId), 1)
        }
      })
      this.sellerList.sort(function (a, b) {
        if (a.CustomerName < b.CustomerName) { return -1 }
        if (a.CustomerName > b.CustomerName) { return 1 }
        return 0
      })
    })
  }


  onUpload(event, uploadCustom) {


    let workBook = null
    let jsonData = null
    const reader = new FileReader()
    const file = event.files[0]
    
    if (file.name.split('.').pop() == 'xlsx') {


      reader.onload = (event) => {
        const data = reader.result
        workBook = XLSX.read(data, { type: 'binary' })
        jsonData = workBook.SheetNames.reduce((initial, name) => {
          const sheet = workBook.Sheets[name]
          initial[name] = XLSX.utils.sheet_to_json(sheet)
          return initial
        }, {})
        var dataFromExcel = jsonData
        const dataString = JSON.stringify(jsonData)
        console.log(dataFromExcel)
        console.log(dataString)
        console.log('dataFromExcel.Sheet1: ', dataFromExcel.Sheet1)
        let excelData = dataFromExcel.Sheet1

        if (excelData.length > 0) {

          this.dboyService.saveBidReport(excelData, this.CustomerId).subscribe(x => {
            

            if (x == true) {
              this.messageService.add({ severity: 'success', summary: 'Saved', detail: '' })
              setTimeout(() => {
                //    location.reload() 
              }, 3000)
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'problem in saving', detail: '' })
            }
          })

        } else {
          //this.messageService.add({ severity: 'error', summary: 'please add any data in your excel sheet!', detail: '' })
        }

      }
      console.log('event is: ', event)
      uploadCustom.files = null
      reader.readAsBinaryString(file)
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'choose excel file', detail: '' })
    }
  }
}
