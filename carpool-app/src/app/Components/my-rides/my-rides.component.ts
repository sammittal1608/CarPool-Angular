import { Component } from '@angular/core';
import { BookedRides } from 'src/app/Models/booked-rides';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { BookRideService } from 'src/app/Services/book-ride.service';
import { OfferRideService } from 'src/app/Services/offer-ride.service';

@Component({
  selector: 'app-my-rides',
  templateUrl: './my-rides.component.html',
  styleUrls: ['./my-rides.component.css']
})
export class MyRidesComponent {
offerRideService!:OfferRideService;
bookRideService!: BookRideService;
bookedRides!:BookedRides[];
offeredRide!:BookedRides[];
customerId!:string;
  constructor(offerRideService:OfferRideService,bookRideService:BookRideService,private authService:AuthenticationService){
    this.offerRideService=offerRideService;
    this.bookRideService=bookRideService;
    this.getBookedRides();
    this.getOfferedRides();
  }
  ngOnInIt(){
    this.getBookedRides();
    this.getOfferedRides();
  }
  getBookedRides() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.bookRideService.getBookedRide(userId).subscribe(
        (bookedRides) => {
          this.bookedRides = bookedRides;
        },
        (error) => {
          console.error('Error fetching booked rides:', error);
        }
      );
    } 
  }
  getOfferedRides(){
    const userId =  this.authService.getUserId();
    if (userId) {
      this.offerRideService.getOfferedRide(userId).subscribe(
        (offeredRide) => {
         this.offeredRide = offeredRide;
        },
        (error) => {
          console.error('Error fetching booked rides:', error);
        }
      );
    } 
  }
}
