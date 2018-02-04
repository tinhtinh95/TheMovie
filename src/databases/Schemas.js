import Realm from 'realm';
export const FAVOURITE="Favourite";
export const REMINDER="Reminder";

export const Favourite = {
    name: FAVOURITE,
    primaryKey: 'id',
    properties: {
        id: 'int',    // primary key
        title: { type: 'string', indexed: true },
        vote_average: 'int',
        overview:{ type: 'string', indexed: true },
        release_date:{ type: 'string', indexed: true },
        // vote_count: 'int',
        // video: {type:'bool', default:false},
        // popularity:'float',
        // poster_path:'string',
        // original_language:'string',
        // original_title:'string',
        // genre_ids:{type:'list'},
        // backdrop_path:'string',
        // adult: { type: 'bool', default: false },
        
    }
};
export const Reminder = {
    name: REMINDER,
    primaryKey: 'id',
    properties: {
        id: 'int',    // primary key
        title: { type: 'string', indexed: true },
        year_release: {type:'string', indexed:true},
        vote_average: 'int',
        time_reminder:{type:'date', optional:true},
        poster_path:{type:'string', indexed:true},
        // overview:{ type: 'string', indexed: true },
        // release_date:{ type: 'string', indexed: true },
        // vote_count: 'int',
        // video: {type:'bool', default:false},
        // popularity:'float',
        // poster_path:'string',
        // original_language:'string',
        // original_title:'string',
        // genre_ids:{type:'list'},
        // backdrop_path:'string',
        // adult: { type: 'bool', default: false },
        
    }
};

const databaseOptions = {
    path: 'Favourite.realm',
    schema: [Favourite,Reminder],
    schemaVersion: 0, //optional    

};
//functions for TodoLists
export const insertNewFavourite = newFavourite => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(FAVOURITE, newFavourite);
            resolve(newFavourite);
        });
    }).catch((error) => reject(error));
});
export const getFavouriteList = () => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        let FavouriteList = realm.objects(FAVOURITE);
        resolve(FavouriteList);  
    }).catch((error) => {        
        reject(error);  
    });;
});
export const deleteFavourite = favouriteId => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        realm.write(() => {
            let objDel = realm.objectForPrimaryKey(FAVOURITE, favouriteId);
            realm.delete(objDel);
            resolve();   
        });
    }).catch((error) => reject(error));;
});
export const deleteAllFavourites = () => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        realm.write(() => {
            let allFavourites = realm.objects(FAVOURITE);
            realm.delete(allFavourites);
            resolve();
        });
    }).catch((error) => reject(error));;
});

export const insertNewReminder = newReminder => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(REMINDER, newReminder);
            resolve(newReminder);
        });
    }).catch((error) => reject(error));
});
export const getReminderList = () => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        let ReminderList = realm.objects(REMINDER);
        resolve(ReminderList);  
    }).catch((error) => {        
        reject(error);  
    });;
});
export const deleteReminder = reminderId => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        realm.write(() => {
            let objDel = realm.objectForPrimaryKey(REMINDER, reminderId);
            realm.delete(objDel);
            resolve();   
        });
    }).catch((error) => reject(error));;
});

export default new Realm(databaseOptions);