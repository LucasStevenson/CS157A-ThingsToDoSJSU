const db = require("./database").createDbConnection(process.env.DB_ENV === "PRODUCTION" ? "production.db" : "test.db");

async function insert_into_db(json) {
    let { title, rating, category, address, phone, open, price_level, travel_times, latitude, longitude } = json;
    // insert into Place_listing
    await db.query("INSERT INTO Place_listing(name, business_type, recommendation_rating, cash_rating, phone_number, distance) VALUES (?, ?, ?, ?, ?, ?)", [title, category[0], rating, price_level, phone, travel_times["distance"]]);

    // insert into Place_businessHours
    let rows = await db.query("SELECT place_id FROM Place_listing WHERE name = ?", [title]);
    let { place_id } = rows["rows"][0]
    for (let day of open.split(",")) {
        let [day_of_week, open_times] = day.split(": ");
        await db.query("INSERT INTO Place_businessHours(place_id, day_of_week, hours_open) VALUES (?, ?, ?)", [place_id, day_of_week, open_times]);
    }

    // insert into Place_address
    await db.query("INSERT INTO Place_address(place_id, street_address, latitude, longitude) VALUES (?, ?, ?, ?)", [place_id, address, latitude, longitude]);
}

let arr = [
    {
        "title": "SoFA Market",
        "rating": 4.4,
        "category": ["food","point_of_interest","establishment"],
        "address": "387 S 1st St, San Jose, CA 95113, USA",
        "phone": "(408) 642-5270",
        "open": "Monday: 11:00 AM – 9:00 PM,Tuesday: 11:00 AM – 9:00 PM,Wednesday: 11:00 AM – 9:00 PM,Thursday: 11:00 AM – 9:00 PM,Friday: 11:00 AM – 9:00 PM,Saturday: 11:00 AM – 9:00 PM,Sunday: 11:00 AM – 9:00 PM",
        "price_level": 2,
        "travel_times": {"distance":"0.7 mi","duration":"16 mins"},
        "latitude": 37.3302294,
        "longitude": -121.8865453,
    },
    {
        "title": "Sammy G's Pizzeria",
        "rating": 4.4,
        "category": ["meal_delivery","meal_takeaway","restaurant","food","point_of_interest","establishment"],
        "address": "330 S 10th St #100, San Jose, CA 95112, USA",
        "phone": "(408) 638-7076",
        "open": "Monday: 11:00 AM – 9:00 PM,Tuesday: 11:00 AM – 9:00 PM,Wednesday: 11:00 AM – 9:00 PM,Thursday: 11:00 AM – 9:00 PM,Friday: 11:00 AM – 9:00 PM,Saturday: 12:00 – 7:00 PM,Sunday: Closed",
        "price_level": 2,
        "travel_times": {"distance":"0.6 mi","duration":"7 mins"},
        "latitude": 37.3357426,
        "longitude": -121.8770959,
    },
    {
        "title": "Pizza My Heart",
        "rating": 4.3,
        "category": ["meal_takeaway","restaurant","point_of_interest","food","establishment"],
        "address": "117 E San Carlos St, San Jose, CA 95112, USA",
        "phone": "(408) 280-0707",
        "open": "Monday: 11:00 AM – 12:00 AM,Tuesday: 11:00 AM – 12:00 AM,Wednesday: 11:00 AM – 12:00 AM,Thursday: 11:00 AM – 12:00 AM,Friday: 11:00 AM – 12:00 AM,Saturday: 11:00 AM – 12:00 AM,Sunday: 11:00 AM – 12:00 AM",
        "price_level": 1,
        "travel_times": {"distance":"0.5 mi","duration":"10 mins"},
        "latitude": 37.332831,
        "longitude": -121.8847264,
    },
    {
        "title": "Cali Spartan Mexican Kitchen",
        "rating": 4.3,
        "category": ["restaurant","food","point_of_interest","establishment"],
        "address": "515 S 10th St, San Jose, CA 95112, USA",
        "phone": "(408) 899-2755",
        "open": "Monday: 10:00 AM – 10:00 PM,Tuesday: 10:00 AM – 10:00 PM,Wednesday: 10:00 AM – 10:00 PM,Thursday: 10:00 AM – 10:00 PM,Friday: 10:00 AM – 10:00 PM,Saturday: 10:00 AM – 10:00 PM,Sunday: 10:00 AM – 10:00 PM",
        "price_level": 1,
        "travel_times": {"distance":"0.7 mi","duration":"15 mins"},
        "latitude": 37.3326758,
        "longitude": -121.8753175
    },
    {
        "title": "Philz Coffee",
        "rating": 4.6,
        "category": ["cafe","food","point_of_interest","store","establishment"],
        "address": "118 Paseo de San Antonio, San Jose, CA 95112, USA",
        "phone": "(408) 971-4212",
        "open": "Monday: 6:30 AM – 8:30 PM,Tuesday: 6:30 AM – 8:30 PM,Wednesday: 6:30 AM – 8:30 PM,Thursday: 6:30 AM – 8:30 PM,Friday: 6:30 AM – 8:30 PM,Saturday: 7:00 AM – 6:00 PM,Sunday: 7:00 AM – 6:00 PM",
        "price_level": 2,
        "travel_times": {"distance": "0.3 mi"},
        "latitude": 37.333572,
        "longitude": -121.8850492
    },
    {
        "title": "Yogurtland San Jose",
        "rating": 4.4,
        "category": ["store","point_of_interest","food","establishment"],
        "address": "125 E San Carlos St, San Jose, CA 95112, USA",
        "phone": "(408) 753-3170",
        "open": "Monday: 11:00 AM – 11:00 PM,Tuesday: 11:00 AM – 11:00 PM,Wednesday: 11:00 AM – 11:00 PM,Thursday: 11:00 AM – 11:00 PM,Friday: 11:00 AM – 12:00 AM,Saturday: 11:00 AM – 12:00 AM,Sunday: 11:00 AM – 11:00 PM",
        "price_level": 1,
        "travel_times": {"distance":"0.4 mi","duration":"9 mins"},
        "latitude": 37.3330355,
        "longitude": -121.8842598
    },
    {
        "title": "San Carlos Italian Pizza",
        "rating": 4.2,
        "category": ["restaurant","point_of_interest","food","establishment"],
        "address": "484 E San Carlos St, San Jose, CA 95112, USA",
        "phone": "(408) 977-0605",
        "open": "Monday: 11:00 AM – 10:00 PM,Tuesday: 11:00 AM – 10:00 PM,Wednesday: 11:00 AM – 10:00 PM,Thursday: 11:00 AM – 10:00 PM,Friday: 11:00 AM – 10:00 PM,Saturday: 11:00 AM – 10:00 PM,Sunday: 11:00 AM – 10:00 PM",
        "price_level": 1,
        "travel_times": {"distance":"0.6 mi","duration":"5 mins"},
        "latitude": 37.3361433,
        "longitude": -121.876885
    },
    {
        "title": "Vietnoms",
        "rating": 4.4,
        "category": ["meal_delivery","meal_takeaway","restaurant","food","point_of_interest","establishment"],
        "address": "387 S 1st St Ste 121, San Jose, CA 95113, USA",
        "phone": "(408) 827-5812",
        "open": "Monday: 11:30 AM – 7:00 PM,Tuesday: 11:30 AM – 7:00 PM,Wednesday: 11:30 AM – 7:00 PM,Thursday: 11:30 AM – 7:00 PM,Friday: 11:30 AM – 7:00 PM,Saturday: 11:30 AM – 7:00 PM,Sunday: 11:30 AM – 7:00 PM",
        "price_level": 1,
        "travel_times": {"distance":"0.6 mi","duration":"5 mins"},
        "latitude": 37.3302142,
        "longitude": -121.8865419
    },
    {
        "title": "Lee's Sandwiches",
        "rating": 4.3,
        "category": ["restaurant","point_of_interest","food","establishment"],
        "address": "260 E Santa Clara St, San Jose, CA 95113, USA",
        "phone": "(408) 286-8808",
        "open": "Monday: 8:00 AM – 8:00 PM,Tuesday: 8:00 AM – 8:00 PM,Wednesday: 8:00 AM – 8:00 PM,Thursday: 8:00 AM – 8:00 PM,Friday: 8:00 AM – 8:00 PM,Saturday: 9:00 AM – 8:00 PM,Sunday: 9:00 AM – 7:00 PM",
        "price_level": 1,
        "travel_times": {"distance":"1.3 mi","duration":"16 mins"},
        "latitude": 37.3384832,
        "longitude": -121.8848689
    },
    {
        "title": "Chipotle Mexican Grill",
        "rating": 4.1,
        "category": ["restaurant","food","point_of_interest","establishment"],
        "address": "One S Market St Ste 40, San Jose, CA 95113, USA",
        "phone": "(408) 938-0919",
        "open": "Monday: 10:45 AM – 10:00 PM,Tuesday: 10:45 AM – 10:00 PM,Wednesday: 10:45 AM – 10:00 PM,Thursday: 10:45 AM – 10:00 PM,Friday: 10:45 AM – 10:00 PM,Saturday: 10:45 AM – 10:00 PM,Sunday: 10:45 AM – 10:00 PM",
        "price_level": 1,
        "travel_times": {"distance":"0.3 mi","duration":"6 mins"},
        "latitude": 37.3309555,
        "longitude": -121.888268
    }
];

(async () => {
    for (let obj of arr) {
        await insert_into_db(obj);
    }
})()
