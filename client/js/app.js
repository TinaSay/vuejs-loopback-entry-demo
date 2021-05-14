const API = 'http://localhost:3000/api/entries/';

let entryApp = new Vue({
    el: '#entryApp',
    data: {
        entries: [],
        entry: {
            id: '',
            name: '',
            lastName: '',
            age: '',
            gender: ''
        }
    },
    created: function () {
        this.getEntries();
    },
    methods: {
        getEntries: function () {
            fetch(API)
                .then(res => res.json())
                .then(res => this.entries = res);
        },
        storeEntry: function () {
            let method;
            console.log('storeEntry', this.entry);
            // Handle new vs old
            if (this.entry.id === '') {
                delete this.entry.id;
                method = 'POST';
            } else {
                method = 'PUT';
            }
            fetch(API, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: method,
                body: JSON.stringify(this.entry)
            })
                .then(res => res.json())
                .then(res => {
                    this.getEntries();
                    this.reset();
                });
        },
        deleteEntry: function (c) {
            fetch(API + c.id, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(res => {
                    this.getEntries();
                });

            // call reset cuz the entry could be 'active'
            this.reset();
        },
        editEntry: function (c) {
            this.entry.id = c.id;
            this.entry.name = c.name;
            this.entry.lastName = c.lastName;
            this.entry.age = c.age;
            this.entry.gender = c.gender;
        },
        reset: function () {
            this.entry.id = '';
            this.entry.name = '';
            this.entry.lastName = '';
            this.entry.age = '';
            this.entry.gender = '';
        }
    }
});