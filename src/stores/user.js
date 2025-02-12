import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        id:'',
        fname: '',
        lname: '',
        username: '',
        email: '',
        country: '',
        loggedIn:false,
        token:null
    }),
    actions: {
        setId(val){
            this.id = val
        },
        setFname(fname) {
            this.fname = fname;
        },
        setLname(lname) {
            this.lname = lname;
        },
        setUsername(username) {
            this.username = username;
        },
        setEmail(email) {
            this.email = email;
        },
        setCountry(country) {
            this.country = country;
        },
        setLoggedIn(value) {
            this.loggedIn = value;
        },
        setToken(value) {
            this.token = value;
        },
        logout(){
            this.id = ''
            this.fname = ''
            this.lname = ''
            this.username = ''
            this.email = ''
            this.country = ''
            this.loggedIn = false
            this.token = null
            localStorage.setItem('token',null)
            sessionStorage.clear()
        }
    },
    getters: {
        fullName: (state) => `${state.fname} ${state.lname}`,
        userData: (state) => ({
            id: state.id,
            fname: state.fname,
            lname: state.lname,
            username: state.username,
            email: state.email,
            country: state.country,
            loggedIn: state.loggedIn,
            token: state.token
        })
    }
});