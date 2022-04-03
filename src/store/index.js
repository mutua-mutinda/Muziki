import { createStore } from 'vuex';
import { auth, usersCollection, } from '/src/includes/firebase';
import { Howl } from 'howler';
import helper from '/src/includes/helper';

export default createStore({
    state:{
        authModalShow:false,
        userLoggedIn:false,
        currentSong: {},
        sound:{},
        theme: {},
        seek:'00:00',
        duration: '00:00',
        playerProgress: '0%',
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
        updatePosition(state) {
            state.seek = helper.formatTime(state.sound.seek());
            state.duration = helper.formatTime(state.sound.duration());
            state.playerProgress = `${(state.sound.seek() / state.sound.duration()) * 100}%`
        }
        
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

        async newSong({commit, state, dispatch}, payload) {
            if (state.sound instanceof Howl) {
                state.sound.unload();
            }
            commit('newSong', payload);
             
             state.sound.play();
             Howler.volume(0.2);

             state.sound.on('play', () => {
                 requestAnimationFrame(() => {
                    dispatch('progress')
                 })
             })
        },
        progress({commit, state, dispatch}) {
            commit('updatePosition');

            if(state.sound.playing()) {
                requestAnimationFrame(() => {
                    dispatch('progress')
                })
            }
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
        updateSeek({state, dispatch}, payload) {
            if(!state.sound.playing) {
                return;
            }

            const {x, width} = payload.currentTarget.getBoundingClientRect();
            const clickX = payload.clientX - x;
            const percentage = clickX / width
            const seconds = state.sound.duration() * percentage

            state.sound.seek(seconds)

            state.sound.once('seek', () => {
                dispatch('progress')
            })
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