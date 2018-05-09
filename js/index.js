const KEY = 'IUSI0001';
let lists = [];
let detList = [];
const app = {
    URL: '',
    DATA: null,

    init: function () {
        lists = MyMakeupList;
        let str = JSON.stringify(lists);
        localStorage.setItem(KEY, str);


        //fetch the data
        app.getData();
        //add event listeners 
        app.addListeners();
        //fix the current url
        history.replaceState({}, "List", "#list");
        document.title = 'List of Items';
    },
    addListeners: function () {
        //back button on second page
        let backBtn = document.querySelector('#details-page header a');
        backBtn.addEventListener('click', app.backHome);
        //listen for the browser back button
        window.addEventListener('popstate', app.browserBack);
    },
    getData: function () {
        lists = JSON.parse(localStorage.getItem(KEY));
        console.log(lists);
        //        console.log(lists.brand[2]);
        //fetch the JSON data
        //fetch()
        //.then()
        //.then(
        //save the imported JSON into app.DATA
        //pass the data to a function that builds the first page  
        app.showThings(lists);
        //).catch();
    },
    showThings: function (makeups) {
        let container = document.querySelector('#list-page .content');
        let divMakeUp = document.querySelector('#list-page');
        divMakeUp.classList.add('active');
        let df = document.createDocumentFragment();
        container.innerHTML = " ";


        MyMakeupList.MyMakeup.forEach(function (make) {

            let filter = MyMakeupList.MyMakeup[(make.id) - 1];
            console.log(filter);


            //            console.log(make.item_desc);
            let div = document.createElement('div');
            div.classList.add('item-card');
            let p = document.createElement('p');
            p.textContent = filter.item_desc;
            p.classList.add('item-desc');
            let img = document.createElement('img');
            img.setAttribute("src", filter.image);
            img.classList.add('image');
            let h = document.createElement('h2');
            h.classList.add("item-title");

            h.textContent = filter.brand;
            h.setAttribute("data-id", filter.id);
            h.setAttribute("data-brand", filter.brand);
            h.addEventListener('click', app.navDetails);

            div.appendChild(img);
            div.appendChild(h);
            div.appendChild(p);
            df.appendChild(div);

        });
        container.appendChild(df);
        //loop through the array and display the cards
        //add the click listener on each title
        //let titles = document.querySelectorAll('#list-page .item-title');
        //[].forEach.call(titles, (h2) => {

        //});
    },
    navDetails: function (ev) {
        ev.preventDefault();
        window.scrollTo(0, 0);
        let h2 = ev.currentTarget;
        let id = h2.getAttribute('data-id');
        let makeBrand = h2.getAttribute('data-brand');
        //        console.log(makeId);
        //        console.log(makeBrand);
        //        let match = null;
        //        lists.forEach((item, index) => {
        //            if(item.brand == makeBrand){
        //                match = item
        //            }
        //        });
        //        console.log(match);
        //extract the id from the heading

        //change the url and save the id in the history.state
        console.log(`#details/${id}`);
        history.pushState({
            "id": id
        }, "Details", `#details/${id}`);
        document.title = `Details for Item ${id}`;
        //get the info about this item
        let obj = app.getItem(id);
        //        console.log("this is obj:", obj);
        //let brand2 = makeBrand;
        //        console.log("this is brand:", brand2);
        //let objj = obj.match;
        //        console.log("this is objj:", objj);
        //let objjj = objj.brand;
        //        console.log("this is objjj:", lists[0].brand);

        //pass it to a function to display those details
        app.showDetails(obj);
    },
    getItem: function (id) {
        console.log(id);
        let match = null;
        //        lists.forEach((item, index) => {
        //            if (item.brand == makeBrand) {
        //                match = item
        //            }
        //        });
        let filteredArray = MyMakeupList.MyMakeup.filter(item => {
            return item.id == id;
        });
        match = filteredArray[0];
        console.log(match);
        //retrieve an object from our JSON data
        //where the id matches the one passed to this function
        //        app.showDetails(match);
        //dummy data for demonstration purposes
        return match;
    },
    showDetails: function (obj) {
        //navigate to the second page
        document.getElementById('list-page').classList.remove('active');
        document.getElementById('details-page').classList.add('active');
        console.log(obj.brand);
        //set the title of the selected property
        //        let span = document.querySelector('.details-title');
        //        span.textContent = brand.type;
        //loop through the obj properties with a for in loop
        //create some HTML for each property...
        let container = document.querySelector('#details-page .content');
        let divMakeUp = document.querySelector('#details-page');
        divMakeUp.classList.add('active');
        let df = document.createDocumentFragment();
        container.innerHTML = " ";
        //
        //for (stuff in obj) {
        //let make = obj[stuff];
        console.log(obj.id, obj.brand, obj.item_desc, obj.image);


        obj.products.forEach(product => {
            let div = document.createElement('div');
            div.classList.add('item-card');
            console.log(product.type, product.name, product.color, product.info, product.img, product.price );

            let img = document.createElement('img');
            img.setAttribute("src", "./img/" + obj.brand + "/" + product.img);
            img.classList.add('item-image');
            div.appendChild(img);
            df.appendChild(div);

            //                let p = document.createElement('p');
            //                p.textContent = make.info;
            //            p.classList.add('item-desc');
            let p = document.createElement('p');
            p.textContent = product.info;
            p.classList.add('item-info');

            let p1 = document.createElement('p1');
            p1.textContent = product.price;
            p1.classList.add('item-price');

            let p2 = document.createElement('p2');
            p2.textContent = " color : " + product.color
            p2.classList.add('item-color');
            let p3 = document.createElement('p3');
            p3.textContent = product.type
            p3.classList.add('item-type');

            let h = document.createElement('h2');
            h.classList.add("item-name");
            h.textContent = product.name;
            //            h.setAttribute("make_id", make.id);
            //            h.setAttribute("make_brand", make.brand);


            div.appendChild(p3); //type
            div.appendChild(h); //name
            div.appendChild(p2); //color
            div.appendChild(p); //info
            div.appendChild(p1); //price


        })




        //};
        container.appendChild(df);
        //loop through the array and display the cards
        //add the click listener on each title
        //        let titles = document.querySelectorAll('#list-page .item-title');
        //        [].forEach.call(titles, (h2)=>{
        //            h2.addEventListener('click', app.navDetails);
        //        });
    },

    backHome: function (ev) {
        if (ev) {
            ev.preventDefault();
            //only add to the pushState if the user click OUR back button
            //don't do this for the browser back button
            history.pushState({}, "List", `#list`);
            document.title = 'List of Items';
        }
        document.getElementById('list-page').classList.add('active');
        document.getElementById('details-page').classList.remove('active');
    },
    browserBack: function (ev) {
        console.log('user hit the browser back button');
        //the browser will change the location hash.
        //use the updated location.hash to display the proper page
        if (location.hash == '#list') {
            console.log('show the list page');
            //we want to show the list page
            app.backHome();
            //NOT passing the new MouseEvent('click')
        } else {
            //we want to display the details
            console.log('show the details');
            let id = location.hash.replace("#details/", "");
            //use the id number from the hash to fetch the proper data
            let obj = app.getItem(id);
            //pass it to a function to display those details
            app.showDetails(obj);
        }
    }
}

let loadEvent = ('deviceready' in document) ? 'deviceready' : 'DOMContentLoaded';
document.addEventListener(loadEvent, app.init);
