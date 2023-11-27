import React, {useState} from 'react';

const queryListing = [
    {
      place_id: 1,
      name: 'SoFA Market',
      business_type: 'food',
      recommendation_rating: 4.4,
      cash_rating: 2,
      phone_number: '(408) 642-5270',
      distance: '0.7 mi'
    },
    {
      place_id: 2,
      name: "Sammy G's Pizzeria",
      business_type: 'meal_delivery',
      recommendation_rating: 4.4,
      cash_rating: 2,
      phone_number: '(408) 638-7076',
      distance: '0.6 mi'
    },
    {
      place_id: 3,
      name: 'Pizza My Heart',
      business_type: 'meal_takeaway',
      recommendation_rating: 4.3,
      cash_rating: 1,
      phone_number: '(408) 280-0707',
      distance: '0.5 mi'
    },
    {
      place_id: 4,
      name: 'Cali Spartan Mexican Kitchen',
      business_type: 'restaurant',
      recommendation_rating: 4.3,
      cash_rating: 1,
      phone_number: '(408) 899-2755',
      distance: '0.7 mi'
    },
    {
      place_id: 5,
      name: 'Philz Coffee',
      business_type: 'cafe',
      recommendation_rating: 4.6,
      cash_rating: 2,
      phone_number: '(408) 971-4212',
      distance: '0.3 mi'
    },
    {
      place_id: 6,
      name: 'Yogurtland San Jose',
      business_type: 'store',
      recommendation_rating: 4.4,
      cash_rating: 1,
      phone_number: '(408) 753-3170',
      distance: '0.4 mi'
    },
    {
      place_id: 7,
      name: 'San Carlos Italian Pizza',
      business_type: 'restaurant',
      recommendation_rating: 4.2,
      cash_rating: 1,
      phone_number: '(408) 977-0605',
      distance: '0.6 mi'
    },
    {
      place_id: 8,
      name: 'Vietnoms',
      business_type: 'meal_delivery',
      recommendation_rating: 4.4,
      cash_rating: 1,
      phone_number: '(408) 827-5812',
      distance: '0.6 mi'
    },
    {
      place_id: 9,
      name: "Lee's Sandwiches",
      business_type: 'restaurant',
      recommendation_rating: 4.3,
      cash_rating: 1,
      phone_number: '(408) 286-8808',
      distance: '1.3 mi'
    }
  ]

let placeListings = {};
for (let listing of queryListing) {
    placeListings[listing.place_id] = listing;
}

const queryAddress = [
    {
      address_id: 1,
      place_id: 1,
      street_address: '387 S 1st St, San Jose, CA 95113, USA',
      latitude: '37.3302294',
      longitude: '-121.8865453'
    },
    {
      address_id: 2,
      place_id: 2,
      street_address: '330 S 10th St #100, San Jose, CA 95112, USA',
      latitude: '37.3357426',
      longitude: '-121.8770959'
    },
    {
      address_id: 3,
      place_id: 3,
      street_address: '117 E San Carlos St, San Jose, CA 95112, USA',
      latitude: '37.332831',
      longitude: '-121.8847264'
    },
    {
      address_id: 4,
      place_id: 4,
      street_address: '515 S 10th St, San Jose, CA 95112, USA',
      latitude: '37.3326758',
      longitude: '-121.8753175'
    },
    {
      address_id: 5,
      place_id: 5,
      street_address: '118 Paseo de San Antonio, San Jose, CA 95112, USA',
      latitude: '37.333572',
      longitude: '-121.8850492'
    },
    {
      address_id: 6,
      place_id: 6,
      street_address: '125 E San Carlos St, San Jose, CA 95112, USA',
      latitude: '37.3330355',
      longitude: '-121.8842598'
    },
    {
      address_id: 7,
      place_id: 7,
      street_address: '484 E San Carlos St, San Jose, CA 95112, USA',
      latitude: '37.3361433',
      longitude: '-121.876885'
    },
    {
      address_id: 8,
      place_id: 8,
      street_address: '387 S 1st St Ste 121, San Jose, CA 95113, USA',
      latitude: '37.3302142',
      longitude: '-121.8865419'
    },
    {
      address_id: 9,
      place_id: 9,
      street_address: '260 E Santa Clara St, San Jose, CA 95113, USA',
      latitude: '37.3384832',
      longitude: '-121.8848689'
    },
    {
      address_id: 10,
      place_id: 10,
      street_address: 'One S Market St Ste 40, San Jose, CA 95113, USA',
      latitude: '37.3309555',
      longitude: '-121.888268'
    }
  ];

let placeAddress = {}  
for (let address of queryAddress) {
    placeAddress[address.place_id] = address;
}

const placeComments = {
    1414: {
        place_id: 1,
        user_id: "kyle123",
        comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, quasi maxime. Iure asperiores quibusdam laboriosam labore itaque"
    }
}

const queryHours = [
    {
      business_hour_id: 1,
      place_id: 1,
      day_of_week: 'Monday',
      hours_open: '11:00 AM – 9:00 PM'
    },
    {
      business_hour_id: 2,
      place_id: 1,
      day_of_week: 'Tuesday',
      hours_open: '11:00 AM – 9:00 PM'
    },
    {
      business_hour_id: 3,
      place_id: 1,
      day_of_week: 'Wednesday',
      hours_open: '11:00 AM – 9:00 PM'
    },
    {
      business_hour_id: 4,
      place_id: 1,
      day_of_week: 'Thursday',
      hours_open: '11:00 AM – 9:00 PM'
    },
    {
      business_hour_id: 5,
      place_id: 1,
      day_of_week: 'Friday',
      hours_open: '11:00 AM – 9:00 PM'
    },
    {
      business_hour_id: 6,
      place_id: 1,
      day_of_week: 'Saturday',
      hours_open: '11:00 AM – 9:00 PM'
    },
    {
      business_hour_id: 7,
      place_id: 1,
      day_of_week: 'Sunday',
      hours_open: '11:00 AM – 9:00 PM'
    },
    {
      business_hour_id: 8,
      place_id: 2,
      day_of_week: 'Monday',
      hours_open: '11:00 AM – 9:00 PM'
    },
    {
      business_hour_id: 9,
      place_id: 2,
      day_of_week: 'Tuesday',
      hours_open: '11:00 AM – 9:00 PM'
    },
    {
      business_hour_id: 10,
      place_id: 2,
      day_of_week: 'Wednesday',
      hours_open: '11:00 AM – 9:00 PM'
    },
    {
      business_hour_id: 11,
      place_id: 2,
      day_of_week: 'Thursday',
      hours_open: '11:00 AM – 9:00 PM'
    },
    {
      business_hour_id: 12,
      place_id: 2,
      day_of_week: 'Friday',
      hours_open: '11:00 AM – 9:00 PM'
    },
    {
      business_hour_id: 13,
      place_id: 2,
      day_of_week: 'Saturday',
      hours_open: '12:00 – 7:00 PM'
    },
    {
      business_hour_id: 14,
      place_id: 2,
      day_of_week: 'Sunday',
      hours_open: 'Closed'
    },
    {
      business_hour_id: 15,
      place_id: 3,
      day_of_week: 'Monday',
      hours_open: '11:00 AM – 12:00 AM'
    },
    {
      business_hour_id: 16,
      place_id: 3,
      day_of_week: 'Tuesday',
      hours_open: '11:00 AM – 12:00 AM'
    },
    {
      business_hour_id: 17,
      place_id: 3,
      day_of_week: 'Wednesday',
      hours_open: '11:00 AM – 12:00 AM'
    },
    {
      business_hour_id: 18,
      place_id: 3,
      day_of_week: 'Thursday',
      hours_open: '11:00 AM – 12:00 AM'
    },
    {
      business_hour_id: 19,
      place_id: 3,
      day_of_week: 'Friday',
      hours_open: '11:00 AM – 12:00 AM'
    },
    {
      business_hour_id: 20,
      place_id: 3,
      day_of_week: 'Saturday',
      hours_open: '11:00 AM – 12:00 AM'
    },
    {
      business_hour_id: 21,
      place_id: 3,
      day_of_week: 'Sunday',
      hours_open: '11:00 AM – 12:00 AM'
    },
    {
      business_hour_id: 22,
      place_id: 4,
      day_of_week: 'Monday',
      hours_open: '10:00 AM – 10:00 PM'
    },
    {
      business_hour_id: 23,
      place_id: 4,
      day_of_week: 'Tuesday',
      hours_open: '10:00 AM – 10:00 PM'
    },
    {
      business_hour_id: 24,
      place_id: 4,
      day_of_week: 'Wednesday',
      hours_open: '10:00 AM – 10:00 PM'
    },
    {
      business_hour_id: 25,
      place_id: 4,
      day_of_week: 'Thursday',
      hours_open: '10:00 AM – 10:00 PM'
    },
    {
      business_hour_id: 26,
      place_id: 4,
      day_of_week: 'Friday',
      hours_open: '10:00 AM – 10:00 PM'
    },
    {
      business_hour_id: 27,
      place_id: 4,
      day_of_week: 'Saturday',
      hours_open: '10:00 AM – 10:00 PM'
    },
    {
      business_hour_id: 28,
      place_id: 4,
      day_of_week: 'Sunday',
      hours_open: '10:00 AM – 10:00 PM'
    },
    {
      business_hour_id: 29,
      place_id: 5,
      day_of_week: 'Monday',
      hours_open: '6:30 AM – 8:30 PM'
    },
    {
      business_hour_id: 30,
      place_id: 5,
      day_of_week: 'Tuesday',
      hours_open: '6:30 AM – 8:30 PM'
    },
    {
      business_hour_id: 31,
      place_id: 5,
      day_of_week: 'Wednesday',
      hours_open: '6:30 AM – 8:30 PM'
    },
    {
      business_hour_id: 32,
      place_id: 5,
      day_of_week: 'Thursday',
      hours_open: '6:30 AM – 8:30 PM'
    },
    {
      business_hour_id: 33,
      place_id: 5,
      day_of_week: 'Friday',
      hours_open: '6:30 AM – 8:30 PM'
    },
    {
      business_hour_id: 34,
      place_id: 5,
      day_of_week: 'Saturday',
      hours_open: '7:00 AM – 6:00 PM'
    },
    {
      business_hour_id: 35,
      place_id: 5,
      day_of_week: 'Sunday',
      hours_open: '7:00 AM – 6:00 PM'
    },
    {
      business_hour_id: 36,
      place_id: 6,
      day_of_week: 'Monday',
      hours_open: '11:00 AM – 11:00 PM'
    },
    {
      business_hour_id: 37,
      place_id: 6,
      day_of_week: 'Tuesday',
      hours_open: '11:00 AM – 11:00 PM'
    },
    {
      business_hour_id: 38,
      place_id: 6,
      day_of_week: 'Wednesday',
      hours_open: '11:00 AM – 11:00 PM'
    },
    {
      business_hour_id: 39,
      place_id: 6,
      day_of_week: 'Thursday',
      hours_open: '11:00 AM – 11:00 PM'
    },
    {
      business_hour_id: 40,
      place_id: 6,
      day_of_week: 'Friday',
      hours_open: '11:00 AM – 12:00 AM'
    },
    {
      business_hour_id: 41,
      place_id: 6,
      day_of_week: 'Saturday',
      hours_open: '11:00 AM – 12:00 AM'
    },
    {
      business_hour_id: 42,
      place_id: 6,
      day_of_week: 'Sunday',
      hours_open: '11:00 AM – 11:00 PM'
    },
    {
      business_hour_id: 43,
      place_id: 7,
      day_of_week: 'Monday',
      hours_open: '11:00 AM – 10:00 PM'
    },
    {
      business_hour_id: 44,
      place_id: 7,
      day_of_week: 'Tuesday',
      hours_open: '11:00 AM – 10:00 PM'
    },
    {
      business_hour_id: 45,
      place_id: 7,
      day_of_week: 'Wednesday',
      hours_open: '11:00 AM – 10:00 PM'
    },
    {
      business_hour_id: 46,
      place_id: 7,
      day_of_week: 'Thursday',
      hours_open: '11:00 AM – 10:00 PM'
    },
    {
      business_hour_id: 47,
      place_id: 7,
      day_of_week: 'Friday',
      hours_open: '11:00 AM – 10:00 PM'
    },
    {
      business_hour_id: 48,
      place_id: 7,
      day_of_week: 'Saturday',
      hours_open: '11:00 AM – 10:00 PM'
    },
    {
      business_hour_id: 49,
      place_id: 7,
      day_of_week: 'Sunday',
      hours_open: '11:00 AM – 10:00 PM'
    },
    {
      business_hour_id: 50,
      place_id: 8,
      day_of_week: 'Monday',
      hours_open: '11:30 AM – 7:00 PM'
    },
    {
      business_hour_id: 51,
      place_id: 8,
      day_of_week: 'Tuesday',
      hours_open: '11:30 AM – 7:00 PM'
    },
    {
      business_hour_id: 52,
      place_id: 8,
      day_of_week: 'Wednesday',
      hours_open: '11:30 AM – 7:00 PM'
    },
    {
      business_hour_id: 53,
      place_id: 8,
      day_of_week: 'Thursday',
      hours_open: '11:30 AM – 7:00 PM'
    },
    {
      business_hour_id: 54,
      place_id: 8,
      day_of_week: 'Friday',
      hours_open: '11:30 AM – 7:00 PM'
    },
    {
      business_hour_id: 55,
      place_id: 8,
      day_of_week: 'Saturday',
      hours_open: '11:30 AM – 7:00 PM'
    },
    {
      business_hour_id: 56,
      place_id: 8,
      day_of_week: 'Sunday',
      hours_open: '11:30 AM – 7:00 PM'
    },
    {
      business_hour_id: 57,
      place_id: 9,
      day_of_week: 'Monday',
      hours_open: '8:00 AM – 8:00 PM'
    },
    {
      business_hour_id: 58,
      place_id: 9,
      day_of_week: 'Tuesday',
      hours_open: '8:00 AM – 8:00 PM'
    },
    {
      business_hour_id: 59,
      place_id: 9,
      day_of_week: 'Wednesday',
      hours_open: '8:00 AM – 8:00 PM'
    },
    {
      business_hour_id: 60,
      place_id: 9,
      day_of_week: 'Thursday',
      hours_open: '8:00 AM – 8:00 PM'
    },
    {
      business_hour_id: 61,
      place_id: 9,
      day_of_week: 'Friday',
      hours_open: '8:00 AM – 8:00 PM'
    },
    {
      business_hour_id: 62,
      place_id: 9,
      day_of_week: 'Saturday',
      hours_open: '9:00 AM – 8:00 PM'
    },
    {
      business_hour_id: 63,
      place_id: 9,
      day_of_week: 'Sunday',
      hours_open: '9:00 AM – 7:00 PM'
    },
    {
      business_hour_id: 64,
      place_id: 10,
      day_of_week: 'Monday',
      hours_open: '10:45 AM – 10:00 PM'
    },
    {
      business_hour_id: 65,
      place_id: 10,
      day_of_week: 'Tuesday',
      hours_open: '10:45 AM – 10:00 PM'
    },
    {
      business_hour_id: 66,
      place_id: 10,
      day_of_week: 'Wednesday',
      hours_open: '10:45 AM – 10:00 PM'
    },
    {
      business_hour_id: 67,
      place_id: 10,
      day_of_week: 'Thursday',
      hours_open: '10:45 AM – 10:00 PM'
    },
    {
      business_hour_id: 68,
      place_id: 10,
      day_of_week: 'Friday',
      hours_open: '10:45 AM – 10:00 PM'
    },
    {
      business_hour_id: 69,
      place_id: 10,
      day_of_week: 'Saturday',
      hours_open: '10:45 AM – 10:00 PM'
    },
    {
      business_hour_id: 70,
      place_id: 10,
      day_of_week: 'Sunday',
      hours_open: '10:45 AM – 10:00 PM'
    }
  ]

let placeBusinessHours = {}  
for (let hours of queryHours) {
    if (!(placeBusinessHours[hours.place_id])){
        placeBusinessHours[hours.place_id] = {
            business_hour_id: hours.business_hour_id,
            place_id: hours.place_id,
            schedule: {
            }
        }
        placeBusinessHours[hours.place_id]["schedule"][hours.day_of_week] = hours.hours_open
    } else {
        placeBusinessHours[hours.place_id]["schedule"][hours.day_of_week] = hours.hours_open
    }
};

function parseSchedule(schedule) {
    let str = JSON.stringify(schedule);
    str = str.replace("{", "").replace("}", "").replace(/['"]+/g, '').replace(/,/g, '\n');
    console.log(str.indexOf('"'));

    return str;
}

const userAccounts = {
    "kyle123": {
        email: "shannonkyle.deleon@gmail.com",
        password: "test"
    }
}

const userReports = {
    1105: {
        place_id: 101013,
        user_id: "kyle123",
        report_description: "test"
    }
}

//TODO finish linking all dummy tables to listing


function findByPlaceID(table, place_id){
    for (const [key, value] of Object.entries(table)){
        if (value["place_id"] == place_id) return table[key];
    }
    return null;
}

let loggedIn = true;

function signUp(){
    console.log('signup request')
}
function login() {
    console.log("login request")
    loggedIn = true;
}

const SignupLogin = (props) => {
    return(
        <div class="sign">
            <div class="sign-col">
                <h4>log in</h4>
                <input type="text" placeholder='user id'/>
                <input type="text" placeholder='pass'/>
                <div class="submit" onClick={(e) => {e.stopPropagation; signUp(); alert("logged in! close/reopen modal to take effect")}}>submit</div>
            </div>
            <div class="sign-col">
                <h4>sign up</h4>
                <input type="text" placeholder='user id'/>
                <input type="email" placeholder='email'/>
                <input type="text" placeholder='pass'/>
                <div class="submit" onClick={(e) => {e.stopPropagation; login(); alert("signed up! refresh to take effect")}}>submit</div>

            </div>
        </div>
    )
}

const SubmitReview = (props) => {
    return(
        <div class={(props.seeReview) ? "review on" : "review off"}>
            review form here
        </div>
    )
}

const Modal = (props) => {
    return(
        <div class={(props.visible) ? "modal on" : "modal off"}>
            <div class="modal-content">
                <h2>{props.place.name}</h2>
                <div class="listing-subrow">
                    <span>💵{props.place.cash_rating} &nbsp;&nbsp; ⭐{props.place.recommendation_rating}</span>
                    <span>{props.place.distance} walk to {props.address.street_address}</span>
                </div>
                <div class="modal-info">
                    <div>
                        <div>
                            <h4>{props.comments.user_id}</h4>
                            <p>{props.comments.comment}</p>
                            <div onClick={(e)=>{e.stopPropagation(); showLogin();}}>
                                <span class={(loggedIn ? "off" : "add-review on")}><SignupLogin/></span>
                                <SubmitReview seeReview={loggedIn}/>
                            </div>
                        </div>
                    </div>
                    <div class="schedule">{parseSchedule(props.hours.schedule)}</div>
                </div>
            </div>
        </div>
    )
}

const Listing = (props) => {
    let place = placeListings[props.place_id];
    let address = findByPlaceID(placeAddress, props.place_id);
    let hours = findByPlaceID(placeBusinessHours, props.place_id);
    let comments = findByPlaceID(placeComments, 1);
    const [visible, setVisible] = useState(false);

    return (
        <div class="listing" onClick={ () => {setVisible(!visible);} }>
            <Modal visible={visible} place={place} address={address} comments={comments} hours={hours}/>
            <h3>{place.name}</h3>
            <div class="listing-subrow">
                <span>💵{place.cash_rating} &nbsp;&nbsp; ⭐{place.recommendation_rating}</span>
                <span>{place.distance} min walk</span>
            </div>
            <p>{comments.comment}</p>
        </div>
    )
}

const Listings = () => {

    return (
        <div id="listings">
            <Listing place_id={1}/>
            <Listing place_id={2}/>
            <Listing place_id={3}/>
            <Listing place_id={4}/>
            <Listing place_id={5}/>
            <Listing place_id={6}/>
            <Listing place_id={7}/>
            <Listing place_id={8}/>
            <Listing place_id={9}/>
        </div>
    );
};

export default Listings;