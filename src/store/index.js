import { createStore } from 'vuex';
import { auth, usersCollection, } from '/src/includes/firebase';
import { Howl } from 'howler';

export default createStore({
    state:{
        authModalShow:false,
        userLoggedIn:false,
        currentSong: {},
        sound:{},
        theme: {}
    },
    mutations:{
        toggleAuthModal: (state) => {
            state.authModalShow = !state.authModalShow;
        },
        toggleAuth(state) {
            state.userLoggedIn = !state.userLoggedIn
        },
        newSong(state, payload) {
            state.currentSong = payload;
            state.sound = new Howl({
                src: [payload.url],
                html5:true,
            });
        },
        SET_THEME(state, theme) {
            state.theme = theme;
            localStorage.theme = theme;
        },
        
    },
    getters: {
        authModalShow: (state) => {
            // return state.authModalShow
        },
        playing: (state) => {
            if(state.sound.playing) {
                return state.sound.playing();
            }

            return false
        },
        getTheme: (state) => {
            return state.theme;
        }
    },
    actions:{
        
        async register({commit}, payload) {
            const userCred = await auth.createUserWithEmailAndPassword( payload.email, payload.password );

        
            await usersCollection.doc(userCred.user.uid).set({
                name: payload.name,
                email: payload.email,
                age: payload.age
            });

            await userCred.user.updateProfile({
                displayName: payload.name
            })

            commit('toggleAuth')

        },
        async login({ commit }, payload) {
            await auth.signInWithEmailAndPassword(payload.email, payload.password)

            commit('toggleAuth')
        },

        init_login({commit}) {
            const user = auth.currentUser;

            if(user) {
                commit('toggleAuth')
            }
        },

        async signout({commit}) {
            await auth.signOut();

            commit('toggleAuth')
        },

        async newSong({commit, state}, payload) {
            commit('newSong', payload);
             
             state.sound.play();
             Howler.volume(0.2);
        },
        async toggleAudio({state}) {
            if(!state.sound.playing) {
                return;
            }

            if(state.sound.playing()) {
                state.sound.pause();
            } else {
                state.sound.play();
            }
        },
        initTheme({ commit }) {

            const cachedTheme = localStorage.theme ? localStorage.theme : false;
            //  `true` if the user has set theme to `dark` on browser/OS
            const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            if (cachedTheme)
                commit('SET_THEME', cachedTheme)
            else if (userPrefersDark)
                commit('SET_THEME', 'dark')
            else
                commit('SET_THEME', 'light')

        },
        toggleTheme({ commit }) {

            switch (localStorage.theme) {
                case 'light':
                    commit('SET_THEME', 'dark')
                    break;

                default:
                    commit('SET_THEME', 'light')
                    break;
            }
        }
        
    },
    modules:{},
});