# Coupon_code_generation


learndost is coupon driven and so are any ideas if we have a third party resuable module like a cloud functions hosted on [rewward.com](http://rewward.com/?reqp=1&reqr=)

one for /create which takes as input  percentOff, expires: once or some date, referredBy, along with that, a hidden applicable on domain which we get automatically from the user HTTP request, an optional string(taken from user, called worksFor)
so it will be ?off=xx&expires=xx&referredBy=xx&worksFor=xx

one for /validate which takes the params userkey(optional) and code returns back %off if valid or return false if it doesnt exist. and if we pass &consume=1 it should be used up in DB

code generation if it generated ganga-kaveri-1234 it would be nice vs some random number as coupon code here is an example of it
https://raw.githubusercontent.com/nguymin4/react-videocall/master/server/lib/haiku.js

**STEPS TO BE FOLLOWED:** 

1. [To understand the difference between Cloud firestore and Real-time-database.](https://medium.com/@beingrahul/firebase-cloud-firestore-v-s-firebase-realtime-database-931d4265d4b0)
2. [How to import data to cloud firestore?](https://hackernoon.com/filling-cloud-firestore-with-data-3f67d26bd66e)
3. [How to retrieve data from firestore by quering?](https://firebase.google.com/docs/firestore/query-data/get-data)
4. [Cloud functions for firestore](https://www.youtube.com/watch?v=DYfP-UIKxH0&list=PLl-K7zZEsYLkPZHe41m4jfAxUi0JjLgSM)
