import functions = require("firebase-functions");
import admin = require("firebase-admin");
admin.initializeApp();

const adjs = [
    'autumn', 'hidden', 'bitter', 'misty', 'silent', 'empty', 'dry', 'dark',
    'summer', 'icy', 'delicate', 'quiet', 'white', 'cool', 'spring', 'winter',
    'patient', 'twilight', 'dawn', 'crimson', 'wispy', 'weathered', 'blue',
    'billowing', 'broken', 'cold', 'damp', 'falling', 'frosty', 'green',
    'long', 'late', 'lingering', 'bold', 'little', 'morning', 'muddy', 'old',
    'red', 'rough', 'still', 'small', 'sparkling', 'throbbing', 'shy',
    'wandering', 'withered', 'wild', 'black', 'young', 'holy', 'solitary',
    'fragrant', 'aged', 'snowy', 'proud', 'floral', 'restless', 'divine',
    'polished', 'ancient', 'purple', 'lively', 'nameless'
];
const nouns = [
    'waterfall', 'river', 'breeze', 'moon', 'rain', 'wind', 'sea', 'morning',
    'snow', 'lake', 'sunset', 'pine', 'shadow', 'leaf', 'dawn', 'glitter',
    'forest', 'hill', 'cloud', 'meadow', 'sun', 'glade', 'bird', 'brook',
    'butterfly', 'bush', 'dew', 'dust', 'field', 'fire', 'flower', 'firefly',
    'feather', 'grass', 'haze', 'mountain', 'night', 'pond', 'darkness',
    'snowflake', 'silence', 'sound', 'sky', 'shape', 'surf', 'thunder',
    'violet', 'water', 'wildflower', 'wave', 'water', 'resonance', 'sun',
    'wood', 'dream', 'cherry', 'tree', 'fog', 'frost', 'voice', 'paper',
    'frog', 'smoke', 'star'
];
const getCouponCode = () => {
    const adj = adjs[Math.floor(Math.random() * adjs.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const MIN = 1000;
    const MAX = 9999;
    const num = Math.floor(Math.random() * ((MAX + 1) - MIN)) + MIN;
    return `${adj}-${noun}-${num}`;
};

exports.generatePromoCode = functions.https.onRequest(async (req: { query: { percentoff: any; 
    fromDate: any;toDate:any;referredBy: any; worksFor: any; }; },
     res: { status: { (arg0: number): { send: (arg0: any) => void; };
      (arg0: number): void; }; }) => {
        const uniqueCode = await getUniqueCode();
        
 admin.firestore().collection("createPromoCode").doc().set({
    percentoff: req.query.percentoff,
    fromDate : req.query.fromDate,
    toDate: req.query.toDate,
    referredBy: req.query.referredBy,
    worksFor: req.query.worksFor,
    couponCode : uniqueCode
})
    .then(function () {
       
        res.status(200).send({uniqueCode});
})
.catch(function (error : any) {
    
    res.status(500);
});
});
function getUniqueCode() : any {
    return new Promise((response)=>{
        const code = getCouponCode();
        const promise = admin.firestore().collection("createPromoCode").where('couponCode', '==', code).get();
        promise.then(async function (docs: any ) 
            {
                
                if (docs.length > 0)
                {   
                    response(await getUniqueCode());
                }
                else
                {
                    response(code);
                }

            })
            .catch(function (error) {
                console.log("error reading document: ", error);
            });
    });
}

exports.validatePromoCode = functions.https.onRequest((req, res) => {
    const currentDate = new Date();
    const coupon = req.query.coupon;
    const promise =  admin.firestore().collection("createPromoCode").where("couponCode", "==", coupon).get();
    promise.then(snapshot => {
        
    const docs = snapshot.docs;

        
        if(docs.length===0)
    {
        res.send('Coupon code does not exist.');
        return;
    }
    const docData = docs[0].data();
    const fromDate = new Date(docData.fromDate);
    const toDate = new Date(docData.toDate);
    
    if ( currentDate >= fromDate && currentDate <= toDate) 
    {
    res.send("The percent off is " + docData.percentoff);

    }
    else if(currentDate<=toDate)
    {
        res.send("The percent off is " + docData.percentoff);
    }
    else 
    {
        res.send("CouponCode Expired!")
    }
})
.catch(function (error : any)
    { 
        console.log("error",error);
    
    })
});
    
    