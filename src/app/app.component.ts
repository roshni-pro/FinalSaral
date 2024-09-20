import { Component, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { EntityHistoryService } from './shared/services/entity-history.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    myInnerHeight = window.innerHeight - 20;
    constructor(private router: Router, private entityHistoryService: EntityHistoryService) {
    }

    ngOnInit() {
        this.subscription = this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe(eve => {
                window.scrollTo(0, 0);
                console.log('this.location.href: ', eve['url']);
                let tokenDataString = localStorage.getItem('tokenData');
                let userTokenString = localStorage.getItem('userToken');
                if(tokenDataString  && userTokenString){
                    let tokenObj = JSON.parse(tokenDataString);
                    if(tokenObj){
                        // debugger;
                        this.entityHistoryService.insertPageVisits({Route: eve['url'], UserName: tokenObj.userName }).subscribe(x => {
                            if(x==false)
                            {
                                localStorage.removeItem('tokenData')
                                localStorage.removeItem('userToken')
                                localStorage.removeItem('userid')
                                localStorage.removeItem('userName')
                                localStorage.removeItem('Warehouseid')
                                localStorage.removeItem('role')
                            }
                            // else{
                            //     this.entityHistoryService.RolePageVisits({Route: eve['url'], UserName: tokenObj.userName }).subscribe((res)=>
                            //     {
                            //         // debugger;
                            //         // localStorage.setItem('PageName',res);
                            //         // var PageName = localStorage.getItem('PageName');
                            //         debugger;
                            //         var getRoleData = (localStorage.getItem('role')).split(',');
                            //           this.entityHistoryService.CheckPagePermission(res).subscribe((data)=>
                            //           {
                            //             console.log(data);
                            //             console.log(getRoleData);
                            //           debugger;
                            //             data.forEach(x=>
                            //             {
                                        
                            //               var res=getRoleData.find(y=>y==x)
                            //               if(res)
                            //               {
                            //                 // this.Permission=true
                            //                 this.router.navigateByUrl('layout/admin/people')
                                          
                            //               }
                            //             })
                                
                            //             // if(this.Permission==false)
                            //             //   {
                            //             //     this.router.navigateByUrl('layout')
                            //             //   }
                                        
                            //           })
                            //     });
                            // }    
                        });
                    }
                }
                
            });
    }


    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }



}