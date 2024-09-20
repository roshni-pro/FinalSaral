import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { tap, mapTo, map } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import { environment } from 'environments/environment';
declare var AES256;
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    mediaBaseUrl: string = '';
    constructor(private router: Router, private loaderService: LoaderService) {
        this.mediaBaseUrl = environment.mediaURL;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // debugger;

        // Check if the request URL contains the excluded string
        // if (req.url.includes(this.mediaBaseUrl)) {
        //     // If the URL contains the string, pass the request through without intercepting
        //     return next.handle(req);
        // } else {

        if (req.headers.get('No-Auth') == "True")
            return next.handle(req.clone()).pipe(
                tap(event => {
                    //this.loaderService.isLoading.next(true);
                }, error => {
                    //this.loaderService.isLoading.next(false);
                })
                , map(event => {
                    //this.loaderService.isLoading.next(false);
                    if (event instanceof HttpResponse && event.status !== 201) {
                        if (event.url.indexOf("/api") > -1) {

                            var today = new Date();
                            var n = (today.getMonth() + 1).toString();
                            var width = 2;
                            var z = '0';


                            var month = n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;

                            var day = today.getDate().toString();

                            if (day.length == 1) {
                                day = '0' + day;
                            }
                            var passphras = "201907221201";
                            passphras = today.getFullYear() + "" + month + "" + day + "1201";
                            var data = JSON.parse(AES256.decrypt(event.body.Data, passphras));
                            event.body.Data = data;
                            event = event.clone({ body: event.body.Data });
                            //this.loaderService.isLoading.next(false);
                        }

                    }
                    return event;
                }, error => {
                    //this.loaderService.isLoading.next(false);
                    console.log('error: ', error);
                    // http response status code
                    if (error.status == 401) {
                        localStorage.removeItem('userToken');
                        //this.loaderService.isLoading.next(false);
                        this.router.navigateByUrl('/login');
                    }


                })
            );

        if (localStorage.getItem('userToken') != null) {

            let customerId = req.headers.get('CustomerId');

            let clonedreq = null;
            let userName = null;
            let PeopleId = null;
            if (req.url.toLowerCase().indexOf(environment.tradeapiURL.toLowerCase()) > -1) {
                userName = localStorage.getItem('userName');
                PeopleId = localStorage.getItem('userid');  //tejas
            }

            if (userName && !customerId) {
                clonedreq = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`,

                        username: userName,
                        peopleid: PeopleId
                    }
                });
            } else if (userName && customerId) {
                clonedreq = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                        CustomerId: customerId,
                        username: userName,
                        peopleid: PeopleId
                    }
                });
            } else if (customerId) {
                clonedreq = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                        CustomerId: customerId
                    }
                });
            } else {
                clonedreq = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`
                    }
                });
            }

            return next.handle(clonedreq).pipe(
                tap(event => {
                    //this.loaderService.isLoading.next(true);
                }, error => {
                    //this.loaderService.isLoading.next(false);
                    console.log('error: ', error);
                    // http response status code
                    if (error.status == 401) {
                        localStorage.removeItem('userToken');
                        //this.loaderService.isLoading.next(false);
                        this.router.navigateByUrl('/login');
                    }


                })
                , map(event => {
                    //this.loaderService.isLoading.next(false);
                    if (event instanceof HttpResponse && event.status !== 201) {
                        if (event.url.indexOf("/api") > -1) {

                            var today = new Date();
                            var n = (today.getMonth() + 1).toString();
                            var width = 2;
                            var z = '0';


                            var month = n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;

                            var day = today.getDate().toString();

                            if (day.length == 1) {
                                day = '0' + day;
                            }
                            var passphras = "201907221201";
                            passphras = today.getFullYear() + "" + month + "" + day + "1201";
                            var data = JSON.parse(AES256.decrypt(event.body.Data, passphras));
                            event.body.Data = data;
                            event = event.clone({ body: event.body.Data });
                            //this.loaderService.isLoading.next(false);
                        }

                    }
                    return event;
                }, error => {
                    //this.loaderService.isLoading.next(false);
                    console.log('error: ', error);
                    // http response status code
                    if (error.status == 401) {
                        localStorage.removeItem('userToken');
                        //this.loaderService.isLoading.next(false);
                        this.router.navigateByUrl('/login');

                    }


                })
            );
        }
        else {
            //this.loaderService.isLoading.next(false);
            this.router.navigateByUrl('/login');

        }
        // }


    }



}